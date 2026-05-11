/**
 * Signed evidence-attestation generator — produces a PDF cover sheet
 * for each completed e2e walk-through declaring "this evidence was
 * captured by run X at time T against tenant Y", PDF/A + PDF/UA
 * profiled, optionally PAdES-signed for audit-pack delivery.
 *
 * Wires together:
 *
 *   - `iso-19005` for the PDF/A archival metadata
 *   - `iso-14289` for the PDF/UA accessibility declaration
 *   - `etsi-en-319-142` for the PAdES signature dictionary
 *   - `bg-pades-signer` (or another country signer) for the qualified
 *     seal that closes the document
 *
 * The PDF body itself is produced by an HTML-to-PDF generator (the
 * deployment supplies it — typically `PDFExporter` from
 * `src/plugins/export/pdf.ts`); this module only assembles the
 * attestation HTML + the metadata + the signature wiring around it.
 *
 * @standard ISO-32000-2:2020 pdf
 * @standard ISO-19005-2:2011 pdf-a-2
 * @standard ISO-14289-1:2014 pdf-ua-1
 * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
 * @standard ISO-8601-1:2019 date-time
 * @audit ISO-19011:2018 audit-trail visual-evidence sox-evidence-pack
 * @compliance SOX §404 internal-controls process-walk-through
 * @compliance EU 910/2014 eidas qualified-electronic-signature
 * @see ../standards/iso-19005
 * @see ../standards/iso-14289
 * @see ../standards/etsi-en-319-142
 * @see ./country-clients/bg-pades-signer.ts
 */

import { buildPdfAXmp, PDF_A_DEFAULT } from '@/standards/iso-19005'
import { PDF_UA_DEFAULT } from '@/standards/iso-14289'
import {
  prepareBgPadesSignature,
  signBgPadesPdf,
  type BgPadesSignerConfig,
  type SignedPadesPdf,
} from './country-clients/bg-pades-signer'

export interface EvidenceAttestationInput {
  /** Workflow slug (e.g. `'order-to-cash'`, `'procure-to-pay'`). */
  readonly workflow: string
  /** Tenant id the walk-through ran against. */
  readonly tenantId: string | number
  /** Display name of the tenant (shown in the attestation body). */
  readonly tenantName: string
  /** ISO-3166-1 alpha-2 country code (drives signer selection). */
  readonly country: string
  /** ISO-8601 timestamp the walk-through completed. */
  readonly capturedAt: string
  /** Per-step results captured during the walk-through. */
  readonly steps: ReadonlyArray<{
    readonly slug: string
    readonly description: string
    readonly status: 'ok' | 'gap' | 'blocker'
    readonly screenshotPath?: string
  }>
  /** Optional list of UX gaps recorded during the walk-through. */
  readonly gaps?: ReadonlyArray<{
    readonly severity: 'info' | 'minor' | 'major' | 'blocker'
    readonly step: string
    readonly description: string
  }>
}

export interface EvidenceAttestationArtifact {
  /** Suggested filename for the artifact (under `public/evidence/attestations/`). */
  readonly fileName: string
  /** XMP packet to inject into `/Metadata` (PDF/A-2b + PDF/UA-1). */
  readonly xmpMetadata: string
  /** HTML body the deployment's PDF generator renders into a PDF. */
  readonly attestationHtml: string
  /** Title used on the document chrome + signature reason. */
  readonly title: string
  /** ISO-8601 timestamp pinned in the attestation. */
  readonly capturedAt: string
}

/**
 * Build the attestation artifact (HTML + metadata) for an e2e
 * walk-through. The deployment renders the HTML to PDF via Puppeteer +
 * `PDFExporter`, then optionally wraps with `signEvidenceAttestation`
 * to add the PAdES qualified seal.
 */
export function buildEvidenceAttestation(
  input: EvidenceAttestationInput,
): EvidenceAttestationArtifact {
  const dateOnly = input.capturedAt.slice(0, 10)
  const fileName = `${dateOnly}-${slugify(input.workflow)}-tenant-${input.tenantId}.pdf`
  const title = `Audit attestation — ${input.workflow} — ${dateOnly}`

  const xmpMetadata = buildPdfAXmp({
    title,
    description: `Walk-through evidence for ${input.workflow} captured against tenant ${input.tenantName} (${input.country}) at ${input.capturedAt}.`,
    createdAt: input.capturedAt,
    profile: PDF_A_DEFAULT,
    accessibility: PDF_UA_DEFAULT,
  })

  return {
    fileName,
    xmpMetadata,
    attestationHtml: renderAttestationHtml(input, title),
    title,
    capturedAt: input.capturedAt,
  }
}

/**
 * Sign an attestation PDF with the country's qualified seal. Returns the
 * signed bytes plus the eIDAS Art.28 audit envelope (CMS blob, cert chain,
 * signing time, SHA-256 digest) — Slice OOO threaded the envelope through
 * so callers persisting the EvidenceAttestation row can populate every
 * `signature*` field in one shot. Currently routes BG attestations
 * through `bg-pades-signer`; future country signers (DE / IT / PL via
 * their qualified-seal CAs) plug into the same dispatch.
 */
export async function signEvidenceAttestation(
  pdfBytes: Uint8Array,
  artifact: EvidenceAttestationArtifact,
  country: string,
  signerConfig: BgPadesSignerConfig,
): Promise<
  | { ok: true; data: SignedPadesPdf }
  | { ok: false; error: string }
> {
  if (country !== 'BG') {
    return {
      ok: false,
      error: `signEvidenceAttestation: no qualified-seal signer registered for country ${country}`,
    }
  }
  const dict = prepareBgPadesSignature({
    reason: artifact.title,
    location: 'Sofia, Bulgaria',
    contactInfo: 'erpax (BG qualified seal)',
    signedAt: artifact.capturedAt,
  })
  const signed = await signBgPadesPdf(pdfBytes, dict, signerConfig)
  if (!signed.ok || !signed.data) {
    return { ok: false, error: signed.error ?? 'signer returned no data' }
  }
  return { ok: true, data: signed.data }
}

// ─── HTML body generator ─────────────────────────────────────────────────

function renderAttestationHtml(input: EvidenceAttestationInput, title: string): string {
  const stepRows = input.steps
    .map(
      (step) => `
    <tr>
      <td>${escapeHtml(step.slug)}</td>
      <td>${escapeHtml(step.description)}</td>
      <td class="status status-${step.status}">${step.status.toUpperCase()}</td>
    </tr>`,
    )
    .join('')

  const gapRows = (input.gaps ?? [])
    .map(
      (gap) => `
    <tr>
      <td class="severity-${gap.severity}">${gap.severity.toUpperCase()}</td>
      <td>${escapeHtml(gap.step)}</td>
      <td>${escapeHtml(gap.description)}</td>
    </tr>`,
    )
    .join('')

  return `<!doctype html>
<html lang="bg-BG">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)}</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 40px; color: #111; }
    h1 { margin: 0 0 16px; font-size: 22px; }
    .meta { font-size: 12px; color: #555; margin-bottom: 32px; }
    .meta dt { float: left; clear: left; width: 140px; font-weight: 600; }
    .meta dd { margin: 0 0 4px 150px; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 12px; }
    th, td { border: 1px solid #ccc; padding: 6px 8px; text-align: left; vertical-align: top; }
    th { background: #f4f4f4; }
    .status-ok { color: #15803d; font-weight: 600; }
    .status-gap { color: #b45309; font-weight: 600; }
    .status-blocker { color: #b91c1c; font-weight: 600; }
    .severity-info { background: #eff6ff; }
    .severity-minor { background: #fefce8; }
    .severity-major { background: #fff7ed; }
    .severity-blocker { background: #fef2f2; }
    h2 { font-size: 14px; margin-top: 32px; }
    footer { margin-top: 48px; font-size: 10px; color: #777; border-top: 1px solid #ddd; padding-top: 8px; }
  </style>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <dl class="meta">
    <dt>Workflow</dt><dd>${escapeHtml(input.workflow)}</dd>
    <dt>Tenant</dt><dd>${escapeHtml(input.tenantName)} (id ${escapeHtml(String(input.tenantId))})</dd>
    <dt>Country</dt><dd>${escapeHtml(input.country)}</dd>
    <dt>Captured at</dt><dd>${escapeHtml(input.capturedAt)}</dd>
  </dl>
  <h2>Steps</h2>
  <table>
    <thead><tr><th>Step</th><th>Description</th><th>Status</th></tr></thead>
    <tbody>${stepRows}</tbody>
  </table>
  ${
    gapRows
      ? `<h2>UX gaps recorded</h2>
  <table>
    <thead><tr><th>Severity</th><th>Step</th><th>Description</th></tr></thead>
    <tbody>${gapRows}</tbody>
  </table>`
      : ''
  }
  <footer>
    Produced by erpax. Conforms to ISO 19005-2 (PDF/A-2b) + ISO 14289-1 (PDF/UA-1).
    Optionally signed per ETSI EN 319 142-1 (PAdES B-LT) for eIDAS qualified-seal evidence.
  </footer>
</body>
</html>`
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    || 'unnamed'
}
