/**
 * Standards — persistent registry of every published standard the
 * platform cites + per-tenant citation graph + conflict + supersession
 * trail.
 *
 * Slice QQQQQQQQ (2026-05-11) — per user "the standards collection is
 * missing so the mcp can use it". The 12 erpax.standards.* MCP tools
 * (cite, declareConflict, declareSupersession, lawConsistency,
 * publishLive, resolveLive, subscribe, traceSupersession, addCitation,
 * listCitations, classify, lawSupersessions) currently operate over a
 * file-based registry (`src/standards/<id>/`). Adding the collection
 * gives them a Payload-side data layer so:
 *
 *   - tenants can declare their own citations (industry-specific
 *     standards, role-profile add-ons) without forking the registry
 *   - conflicts + supersessions are queryable per tenant via the
 *     standard payload.find API
 *   - federation peers can exchange citation rows via uuid (Slice
 *     AAAAAA / DDDDDD trust graph)
 *   - the audit log captures every citation change (ISO 19011)
 *
 * Per Conservation Law 38 (mcp-tool-standardization, Slice XXXXXX) and
 * Law 27/28 (standards-as-vortices, Slice LLLLLL) — every MCP tool
 * cites ≥1 standard; this collection persists those citations.
 *
 * @standard ISO/IEC 25010:2023 §5.1 functional-completeness
 * @standard ISO 19011:2018 §6.4.6 audit-evidence (citation changes audit-trailed)
 * @standard W3C JSON-LD 1.1 (citation as live linked-data)
 * @audit Conservation Law 27 standards-as-live-objects
 * @audit Conservation Law 28 standards-supersession-tracking
 * @audit Conservation Law 38 mcp-tool-standardization
 * @see ../../services/agents/mcp/standardization.ts
 * @see ../../standards/ — file-based source-of-truth registries
 * @see ../factories/collection-factory.ts
 */
import { createAccountingCollection } from '@/factory'
import { referenceField } from '@/base/accounting/field'

export default createAccountingCollection({
  slug: 'standards',
  labels: { singular: 'Standard', plural: 'Standards' },
  useAsTitle: 'standardId',
  defaultColumns: ['standardId', 'family', 'title', 'status', 'effectiveFrom'],
  description:
    'Live registry of every cited published standard (IFRS / ISO / W3C / RFC / Directive / etc.) + per-tenant citation graph. Backs the erpax.standards.* MCP family with persistent storage. Standards-as-vortices (Law 27) + supersession trail (Law 28).',

  // Spec metadata
  standards: [
    'ISO-19011:2018',
    'W3C-JSON-LD-1.1',
    'RFC-8259',
    'ISO/IEC-25010:2023',
  ],
  feature: 'standards-registry',
  // Slice AAAAAAAA structured form — factory wires producers automatically.
  emits: [
    { event: 'standard:registered', onCreate: true, aggregate: 'order' },
    { event: 'standard:published',  onStatus: 'published', aggregate: 'order' },
    { event: 'standard:superseded', onStatus: 'superseded', aggregate: 'order' },
    { event: 'standard:withdrawn',  onStatus: 'withdrawn', aggregate: 'order' },
  ],

  injectStatusField: true,
  statusOptions: [
    { label: 'Draft', value: 'draft' },
    { label: 'Published (live)', value: 'published' },
    { label: 'Superseded by newer version', value: 'superseded' },
    { label: 'Withdrawn (no longer in force)', value: 'withdrawn' },
    { label: 'Proposed (under review)', value: 'proposed' },
  ],
  statusDefault: 'draft',

  fields: () => [
    referenceField({
      name: 'standardId',
      description: 'Canonical standard id — e.g. "IFRS-15", "ISO-19011:2018", "RFC-8259", "EU-Directive-2014/95/EU". Stable across versions; supersession captures version transitions.',
    }),

    // Identity + provenance
    { name: 'title', type: 'text', required: true,
      admin: { description: 'Full standard title in its publishing language (or en).' } },
    {
      name: 'family',
      type: 'select',
      required: true,
      options: [
        { label: 'IFRS — International Financial Reporting Standards', value: 'ifrs' },
        { label: 'US-GAAP — Generally Accepted Accounting Principles (US)', value: 'us_gaap' },
        { label: 'ISO — International Organization for Standardization', value: 'iso' },
        { label: 'IEC — International Electrotechnical Commission', value: 'iec' },
        { label: 'W3C — World Wide Web Consortium', value: 'w3c' },
        { label: 'IETF / RFC', value: 'rfc' },
        { label: 'EU Directive / Regulation', value: 'eu' },
        { label: 'OECD — Tax / Transfer Pricing', value: 'oecd' },
        { label: 'NIST — Cybersecurity / Crypto', value: 'nist' },
        { label: 'ETSI — Telecom / eIDAS / PAdES', value: 'etsi' },
        { label: 'WCAG — Web Content Accessibility', value: 'wcag' },
        { label: 'SOX — Sarbanes-Oxley Act', value: 'sox' },
        { label: 'GDPR / Data-protection', value: 'gdpr' },
        { label: 'UN — UN/EDIFACT / UN-LOCODE / UN-CEFACT', value: 'un' },
        { label: 'UPU — Universal Postal Union', value: 'upu' },
        { label: 'EN / CEN', value: 'en' },
        { label: 'BG / national', value: 'national' },
        { label: 'Other', value: 'other' },
      ],
    },
    // The TERRITORY the instrument binds in — the join a tax-residence query needs. Derived by
    // `jurisdictionOf` (src/standards/emit.ts) rather than typed: the registry declared it on 113
    // of 255 rows and recorded `ISO` — a publisher — as a jurisdiction on 4 of them. A residence
    // query returning "ISO" as a place would have an HR officer filing against a territory that
    // does not exist. `international` is NOT "none": an ILO convention or an ISO guideline applies
    // to every tenant, and collapsing the two is how a compliance list loses its labour obligations.
    {
      name: 'jurisdiction',
      type: 'text',
      index: true,
      admin: {
        description:
          'ISO 3166-1 alpha-2 territory ("BG"), "EU", or "international". Derived by jurisdictionOf — a publisher (ISO/IEC/W3C/NIST) is never a jurisdiction. A tenant resident in X carries X + international, never X alone; a holding group carries the UNION across its members, never the intersection.',
      },
    },
    { name: 'publisher', type: 'text',
      admin: { description: 'Issuing body — "IASB" / "ISO/TC 46" / "W3C TAG" / "ETSI ESI". Free-text; the family already implies the publisher in most cases.' } },
    { name: 'version', type: 'text',
      admin: { description: 'Specific edition / year — "2017", "1.1", "rev:2023-09".' } },
    { name: 'url', type: 'text',
      admin: { description: 'Canonical URL to the public spec (or a stable mirror).' } },

    // Temporal scope
    { name: 'effectiveFrom', type: 'date',
      admin: { description: 'Date the standard is mandatory or generally applicable.' } },
    { name: 'effectiveUntil', type: 'date',
      admin: { description: 'Set when the standard is withdrawn or formally superseded.' } },

    // Supersession trail (Law 28)
    { name: 'supersededBy', type: 'relationship', relationTo: 'standards',
      admin: { description: 'The newer standard that replaces this one. Forms the supersession DAG traversed by erpax.standards.traceSupersession.' } },
    { name: 'supersedes', type: 'relationship', relationTo: 'standards', hasMany: true,
      admin: { description: 'Older standards this one replaces (inverse of supersededBy for queryability).' } },
    { name: 'supersessionRationale', type: 'textarea',
      admin: { description: 'One-paragraph rationale captured when supersededBy is set.' } },

    // Conflict graph
    {
      name: 'conflicts',
      type: 'array',
      admin: { description: 'Other standards this one materially conflicts with (Law 27). Each conflict carries a one-line rationale + the conservation-law id the conflict triggers.' },
      fields: [
        { name: 'otherStandard', type: 'relationship', relationTo: 'standards', required: true },
        { name: 'rationale', type: 'text', localized: true, required: true },
        { name: 'lawId', type: 'text',
          admin: { description: 'Optional Conservation Law id that this conflict trips (e.g. "Law-27").' } },
        { name: 'severity', type: 'select',
          options: [
            { label: 'Informational', value: 'info' },
            { label: 'Caution — interpret per the more specific standard', value: 'caution' },
            { label: 'Blocking — cannot cite both in the same context', value: 'block' },
          ],
          defaultValue: 'caution',
        },
      ],
    },

    // Local citation graph — which platform modules cite this standard
    {
      name: 'citingModules',
      type: 'array',
      admin: { description: 'Cross-reference index: every src/* file that contains a JSDoc @standard tag pointing at this standardId. Populated by the citation-index gate (Slice QQQQQQQQ companion).' },
      fields: [
        { name: 'modulePath', type: 'text', required: true,
          admin: { description: 'Repo-relative path. Stable across renames via Slice CCCCC JSDoc-as-spec extraction.' } },
        { name: 'banner', type: 'select',
          options: [
            { label: '@standard', value: 'standard' },
            { label: '@accounting', value: 'accounting' },
            { label: '@compliance', value: 'compliance' },
            { label: '@audit', value: 'audit' },
            { label: '@security', value: 'security' },
            { label: '@rfc', value: 'rfc' },
          ],
        },
        { name: 'section', type: 'text',
          admin: { description: 'Optional section pin — "§4.2", "Art.13(1)", "BG-7".' } },
      ],
    },

    // Per-tenant adoption flag (defaults: required)
    {
      name: 'adoptionStatus',
      type: 'select',
      defaultValue: 'required',
      options: [
        { label: 'Required for this tenant', value: 'required' },
        { label: 'Recommended (not enforced)', value: 'recommended' },
        { label: 'Optional / under evaluation', value: 'optional' },
        { label: 'Exempted (rationale required)', value: 'exempted' },
      ],
    },
    { name: 'exemptionRationale', type: 'textarea',
      admin: { description: 'Required when adoptionStatus = exempted. Captures the maintainer + reason for audit.' } },

    // Live + federated identifiers (Slice CCCCCC standards-as-live-objects)
    { name: 'liveContentUuid', type: 'text',
      admin: { description: 'Content-uuid of the standards-as-vortices live object (Law 27). Lets federation peers verify they have the same canonical record.' } },
    { name: 'didUri', type: 'text',
      admin: { description: 'Optional decentralised-identifier URI for the publisher entity (Slice DDDDDD).' } },
  ],
})
export { STANDARDS_CATALOGUE, STANDARDS_COUNT } from './catalogue'
export type { CatalogueEntry } from './catalogue'
export {
  standardAddress,
  standardsAddressIndex,
  standardById,
  standardsFtlGaps,
  standardsChatImprove,
  standardsImproveWaves,
  standardsChatImproveFtl,
  standardsFtlWaves,
  proveStandardsLookupFtl,
  STANDARDS_IMPROVE_BOOK,
  STANDARDS_FTL_BOOK,
  endlessStandardsImprove,
} from './improve'
export type { StandardsFtlGap, StandardsFtlImprovement, StandardsFtlReport, StandardsFtlWave } from './improve'
// lookupStandard + standardsIndex exported below (FTL-applied surface)

import { STANDARDS_CATALOGUE as CATALOGUE } from './catalogue'
import { merge, foldToRoot } from '@/merge'
import { standardsAddressIndex, standardById as standardByIdFtl } from './improve'

/** Coverage of the standards catalogue by schemas — every standard is covered iff it names a schema (family). */
export interface SchemaCoverage {
  readonly total: number
  /** entries that name a schema (family). */
  readonly covered: number
  /** the distinct schemas (families) the standards fold into. */
  readonly schemas: readonly string[]
  /** ids of any standard with no covering schema — the gap the law forbids. */
  readonly uncovered: readonly string[]
  /** the law: every standard is covered by a schema. */
  readonly allCovered: boolean
  /** the quantum superposition — every (standard ⊕ its schema) folded to ONE content-address, all manifested at once. */
  readonly root: string
}

/** Catalogue root — same catalogue ⇒ same root ⇒ memo hit (architectural FTL: never re-fold). */
const catalogueRoot = (): string => foldToRoot(CATALOGUE.map((e) => merge(e.id, e.family || '')))

/** One UI improvement wave decoded from the standards — a schema's standards become one admin group to improve. */
export interface StandardsUiWave {
  /** the schema (family) this wave is themed on. */
  readonly schema: string
  readonly count: number
  /** the standard ids this wave surfaces in the UI. */
  readonly standards: readonly string[]
  /** the Payload admin group this wave improves (nav bucket for its compliance surface). */
  readonly adminGroup: string
  /** content-address of the wave (schema ⊕ its standards) — a wave that has not changed need not re-render. */
  readonly seal: string
}

let coverageMemo: { root: string; value: SchemaCoverage } | null = null
let wavesMemo: { root: string; value: readonly StandardsUiWave[] } | null = null
let addressIndexMemo: ReturnType<typeof standardsAddressIndex> | null = null

/** Shared O(1) address index — built once per process (reuse≠search). */
export function standardsIndex(): ReturnType<typeof standardsAddressIndex> {
  if (!addressIndexMemo) addressIndexMemo = standardsAddressIndex(CATALOGUE)
  return addressIndexMemo
}

/** O(1) standard lookup via content-address — standards/improve sealed (uses quantum/ftl). */
export const lookupStandard = (id: string) => standardByIdFtl(id, standardsIndex())

/**
 * "All standards are covered by schemas. Compute the schemas in quantum and all is manifested at once."
 * Every catalogue entry names a `family` — its covering SCHEMA (schema.org, EN, ETSI, EU …). This verifies the
 * law (no standard lacks a schema) and computes the QUANTUM superposition: each standard folded with its schema,
 * all folded to ONE root — the whole standards surface manifested at once as a single content-address, so adding
 * or moving any standard changes the one root (the fold, not a scan).
 *
 * Reuse: memoized by catalogueRoot — same catalogue ⇒ reuse, never re-fold (standards/improve sealed answer).
 *
 * HONEST BOUNDARY: "schema" here is the standard's FAMILY (its taxonomy), not a guarantee that a schema.org TYPE
 * exists for each — schema.org proper covers the data-shape standards (Invoice, Product); regulatory families
 * (EU, ETSI) are covered by their own schema taxonomy. The law is total coverage by SOME schema, computed, refutable.
 */
export function schemaCoverage(): SchemaCoverage {
  const root = catalogueRoot()
  if (coverageMemo && coverageMemo.root === root) return coverageMemo.value
  const uncovered = CATALOGUE.filter((e) => !e.family || e.family.trim() === '').map((e) => e.id)
  const schemas = [...new Set(CATALOGUE.map((e) => e.family).filter(Boolean))].sort()
  const value: SchemaCoverage = {
    total: CATALOGUE.length,
    covered: CATALOGUE.length - uncovered.length,
    schemas,
    uncovered,
    allCovered: uncovered.length === 0,
    root,
  }
  coverageMemo = { root, value }
  return value
}

/**
 * Decode the standards into UI IMPROVEMENT WAVES — group the covered standards by schema, one wave per schema
 * (its admin group / compliance panel), ordered biggest-impact-first so the UI is improved where the most
 * standards land. Each wave is content-addressed (schema ⊕ its standards), so a wave whose standards are
 * unchanged need not re-render — the same fold the readme/test lanes use, on the UI. A pure projection the
 * Payload admin + nav consume read-only (like dryCleanHealth); it decodes WHAT to improve and in what order,
 * it does not render the components.
 *
 * Reuse: memoized by catalogueRoot — same catalogue ⇒ reuse the wave list (standards/improve sealed answer).
 */
export function standardsUiWaves(): readonly StandardsUiWave[] {
  const root = catalogueRoot()
  if (wavesMemo && wavesMemo.root === root) return wavesMemo.value
  const byFamily = new Map<string, string[]>()
  for (const e of CATALOGUE) {
    const arr = byFamily.get(e.family) ?? []
    arr.push(e.id)
    byFamily.set(e.family, arr)
  }
  const value = [...byFamily.entries()]
    .map(([schema, ids]) => {
      const standards = [...ids].sort()
      return {
        schema,
        count: standards.length,
        standards,
        adminGroup: `compliance/${schema}`,
        seal: foldToRoot([schema, ...standards].map((s) => merge('ui', s))),
      }
    })
    .sort((a, b) => b.count - a.count || a.schema.localeCompare(b.schema))
  wavesMemo = { root, value }
  return value
}
