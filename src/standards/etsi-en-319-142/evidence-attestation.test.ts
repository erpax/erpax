/**
 * Evidence-attestation generator tests — pin the artifact shape +
 * signing dispatch.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-19005-2:2011 pdf-a-2
 * @standard ISO-14289-1:2014 pdf-ua-1
 * @standard ETSI-EN-319-142-1 v1.1.1 pades-baseline-profile
 * @audit ISO-19011:2018 audit-trail visual-evidence sox-evidence-pack
 * @compliance SOX §404 internal-controls process-walk-through
 * @compliance EU 910/2014 eidas qualified-electronic-signature
 * @see src/services/evidence-attestation.ts
 */

import { describe, expect, it } from 'vitest'
import {
  buildEvidenceAttestation,
  signEvidenceAttestation,
} from '@/services/evidence-attestation'

const SAMPLE_INPUT = {
  workflow: 'order-to-cash',
  tenantId: 42,
  tenantName: 'Acme EOOD',
  country: 'BG',
  capturedAt: '2026-05-09T14:30:00Z',
  steps: [
    { slug: '01-customer', description: 'Customer create form', status: 'ok' as const },
    { slug: '03-quote', description: 'Quotes list', status: 'gap' as const },
  ],
  gaps: [
    {
      severity: 'major' as const,
      step: '03-quote',
      description: 'No "Convert to Invoice" CTA visible',
    },
  ],
} as const

describe('buildEvidenceAttestation — artifact shape', () => {
  it('emits a date-prefixed filename anchored to the workflow + tenant', () => {
    const artifact = buildEvidenceAttestation(SAMPLE_INPUT)
    expect(artifact.fileName).toBe('2026-05-09-order-to-cash-tenant-42.pdf')
  })

  it('declares PDF/A-2b + PDF/UA-1 in the XMP packet (B2G dual baseline)', () => {
    const artifact = buildEvidenceAttestation(SAMPLE_INPUT)
    expect(artifact.xmpMetadata).toContain('<pdfaid:part>2</pdfaid:part>')
    expect(artifact.xmpMetadata).toContain('<pdfaid:conformance>B</pdfaid:conformance>')
    expect(artifact.xmpMetadata).toContain('<pdfuaid:part>1</pdfuaid:part>')
  })

  it('includes the tenant + capture timestamp in the rendered HTML body', () => {
    const artifact = buildEvidenceAttestation(SAMPLE_INPUT)
    expect(artifact.attestationHtml).toContain('Acme EOOD')
    expect(artifact.attestationHtml).toContain('id 42')
    expect(artifact.attestationHtml).toContain('2026-05-09T14:30:00Z')
  })

  it('renders one row per step with the step status', () => {
    const artifact = buildEvidenceAttestation(SAMPLE_INPUT)
    expect(artifact.attestationHtml).toContain('01-customer')
    expect(artifact.attestationHtml).toContain('03-quote')
    expect(artifact.attestationHtml).toContain('class="status status-gap"')
  })

  it('renders gap rows when present, omits the gap section when empty', () => {
    const withGaps = buildEvidenceAttestation(SAMPLE_INPUT)
    expect(withGaps.attestationHtml).toContain('UX gaps recorded')
    expect(withGaps.attestationHtml).toContain('No &quot;Convert to Invoice&quot; CTA visible')

    const noGaps = buildEvidenceAttestation({ ...SAMPLE_INPUT, gaps: [] })
    expect(noGaps.attestationHtml).not.toContain('UX gaps recorded')
  })
})

describe('signEvidenceAttestation — dispatch', () => {
  it('refuses non-BG country (no signer registered yet)', async () => {
    const artifact = buildEvidenceAttestation(SAMPLE_INPUT)
    const result = await signEvidenceAttestation(
      new Uint8Array(),
      artifact,
      'DE',
      { certPem: 'C', keyPem: 'K', signCms: async () => new Uint8Array() },
    )
    expect(result.ok).toBe(false)
    expect((result as { ok: false; error: string }).error).toMatch(
      /no qualified-seal signer registered/,
    )
  })

  it('refuses BG signing when cert/key missing (per-tenant config required)', async () => {
    const artifact = buildEvidenceAttestation(SAMPLE_INPUT)
    const result = await signEvidenceAttestation(
      new Uint8Array(),
      artifact,
      'BG',
      { certPem: '', keyPem: '', signCms: async () => new Uint8Array() },
    )
    expect(result.ok).toBe(false)
  })
})
