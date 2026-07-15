/**
 * notary/check — what a notary must verify, per document type, against which provider and standard.
 *
 * A notary does not just seal — before sealing it CHECKS: the parties' identity and capacity, their
 * power to represent, the property's title and encumbrances, cadastral identity, sanctions/PEP, tax,
 * spousal consent, company standing, a qualified signature and a trusted timestamp. Different
 * instruments demand different subsets (a power of attorney is not a deed of sale). This module makes
 * that duty COMPUTABLE: the check → provider → standard rows (the rosetta), the per-document-type
 * requirement matrix, and a coverage audit that enumerates every gap.
 *
 * HONEST BOUNDARY: the providers are the REAL Bulgarian institutions/registers responsible for each
 * check, but this module wires no live endpoint and fabricates no credential. Live integration needs
 * the deployer's accredited access (several registers require a licensed-notary legal basis) and a
 * verified endpoint spec per provider. coverageAudit HIDES NO GAP — it returns every unwired check.
 * The institution→check mapping is an engineering model to be validated against current BG law by a
 * qualified professional; it is not legal advice.
 *
 * @standard eIDAS (EU 910/2014) · RFC 3161 · AMLD5 (EU 2018/843) · Hague Apostille 1961
 *
 * Composes [[notary]] · [[law]] · [[standards]].
 */

/** The instruments a notary certifies — each with its own required-checks subset. */
export type DocumentType =
  | 'sale' // deed of sale of real property
  | 'mortgage' // mortgage / charge over property
  | 'poa' // power of attorney
  | 'will' // testament
  | 'inheritance' // succession / inheritance act
  | 'incorporation' // company incorporation / constitutive act
  | 'certification' // certification of a copy / signature

/** The checks themselves — the things a notary verifies before granting public faith. */
export type Check =
  | 'identity' // KYC — the parties are who they claim
  | 'capacity' // legal capacity — of age, not interdicted
  | 'representation' // valid power of attorney (register lookup)
  | 'title' // property ownership
  | 'encumbrance' // liens, mortgages, injunctions
  | 'cadastre' // parcel identity, boundaries, elevation
  | 'sanctions' // PEP / sanctions / AML screening
  | 'tax' // tax clearance / no arrears
  | 'spousalConsent' // matrimonial-property consent
  | 'company' // company existence + representatives
  | 'signature' // qualified electronic signature
  | 'timestamp' // trusted timestamp
  | 'apostille' // cross-border authentication

/** The real Bulgarian institution / register that answers a check (the adapter target to wire). */
export type Provider =
  | 'grao' // НБД Население (GRAO) — identity / civil status
  | 'registryAgency' // Агенция по вписванията — Property (Имотен регистър) + Commercial (Търговски регистър)
  | 'cadastre' // АГКК / КАИС — cadastre & property map
  | 'notaryChamber' // Нотариална камара — registers of powers of attorney, wills, acts
  | 'nra' // НАП — tax
  | 'qtsp' // eIDAS QTSP (Borica B-Trust / Evrotrust / InfoNotary) — signature + timestamp
  | 'sanctionsList' // EU / UN / OFAC consolidated sanctions + national PEP

/** Each check's responsible provider and the standard/legal basis it satisfies — one rosetta row per check. */
export const CHECKS: Readonly<Record<Check, { readonly provider: Provider; readonly standard: string }>> = {
  identity: { provider: 'grao', standard: 'AMLD5 (EU 2018/843) customer due diligence · eIDAS identity' },
  capacity: { provider: 'grao', standard: 'Civil law — legal capacity / interdiction' },
  representation: { provider: 'notaryChamber', standard: 'Unified Register of Powers of Attorney (Notariat Act)' },
  title: { provider: 'registryAgency', standard: 'Property Register (Имотен регистър)' },
  encumbrance: { provider: 'registryAgency', standard: 'Property Register — liens / mortgages / injunctions' },
  cadastre: { provider: 'cadastre', standard: 'Cadastre & Property Register Act (АГКК / КАИС)' },
  sanctions: { provider: 'sanctionsList', standard: 'AMLD · EU/UN/OFAC consolidated + PEP screening' },
  tax: { provider: 'nra', standard: 'Tax clearance (НАП)' },
  spousalConsent: { provider: 'notaryChamber', standard: 'Family Code — matrimonial property consent' },
  company: { provider: 'registryAgency', standard: 'Commercial Register (Търговски регистър)' },
  signature: { provider: 'qtsp', standard: 'eIDAS (EU 910/2014) — qualified electronic signature' },
  timestamp: { provider: 'qtsp', standard: 'RFC 3161 — trusted timestamp' },
  apostille: { provider: 'notaryChamber', standard: 'Hague Apostille Convention 1961' },
}

/** What each document type requires — different instruments, different duties. */
export const REQUIRED: Readonly<Record<DocumentType, readonly Check[]>> = {
  sale: ['identity', 'capacity', 'title', 'encumbrance', 'cadastre', 'spousalConsent', 'tax', 'sanctions', 'signature', 'timestamp'],
  mortgage: ['identity', 'capacity', 'title', 'encumbrance', 'cadastre', 'spousalConsent', 'sanctions', 'signature', 'timestamp'],
  poa: ['identity', 'capacity', 'signature', 'timestamp'],
  will: ['identity', 'capacity', 'signature', 'timestamp'],
  inheritance: ['identity', 'title', 'encumbrance', 'cadastre', 'tax', 'signature', 'timestamp'],
  incorporation: ['identity', 'capacity', 'company', 'sanctions', 'signature', 'timestamp'],
  certification: ['identity', 'signature', 'timestamp'],
}

export interface Gap {
  readonly documentType: DocumentType
  readonly check: Check
  readonly provider: Provider
}

/** The rosetta audit — every required check whose provider is NOT wired. Leave no gap: returns them ALL. */
export function coverageAudit(
  documentType: DocumentType,
  wiredProviders: readonly Provider[],
): { readonly required: number; readonly covered: number; readonly complete: boolean; readonly gaps: Gap[] } {
  const wired = new Set(wiredProviders)
  const gaps: Gap[] = []
  for (const check of REQUIRED[documentType]) {
    const provider = CHECKS[check].provider
    if (!wired.has(provider)) gaps.push({ documentType, check, provider })
  }
  const required = REQUIRED[documentType].length
  return { required, covered: required - gaps.length, complete: gaps.length === 0, gaps }
}

/** The distinct providers a document type touches — the adapters that must be wired for zero gaps. */
export function providersFor(documentType: DocumentType): Provider[] {
  return [...new Set(REQUIRED[documentType].map((c) => CHECKS[c].provider))]
}

export interface CheckResult {
  readonly ok: boolean
  readonly detail: string
  readonly at: string
}

/** The adapter contract every provider implements — the seam where live, credentialed calls attach. */
export interface ProviderAdapter {
  readonly provider: Provider
  run(check: Check, subject: string): Promise<CheckResult>
}

/**
 * An unwired provider — refuses HONESTLY rather than fabricate a passing result. Replace at deploy with
 * a credentialed adapter bound to the provider's verified endpoint. A notarial act must never be sealed
 * on a fabricated check.
 */
export function unwired(provider: Provider): ProviderAdapter {
  return {
    provider,
    async run(check: Check): Promise<CheckResult> {
      throw new Error(
        `provider "${provider}" not wired — configure accredited credentials + verified endpoint before running "${check}"`,
      )
    },
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  for (const dt of Object.keys(REQUIRED) as DocumentType[]) {
    const a = coverageAudit(dt, []) // nothing wired yet — every check is a gap, surfaced not hidden
    console.log(`${dt.padEnd(14)} needs ${a.required} checks via ${providersFor(dt).length} providers; gaps now: ${a.gaps.length}`)
  }
}
