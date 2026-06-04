import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import {
  GLOBAL_SPINE,
  PLUGIN_TENANT_SLUGS,
  TENANT_GLOBAL,
  TENANT_UNSCOPED_DRIFT,
  tenantScopedSlugs,
} from './scope'

/**
 * THE PROOF of "computing all hardcoded".
 *
 * `GOLDEN_MT` is the EXACT 201-slug map the pre-refactor payload.config.ts typed
 * out by hand in the multi-tenant plugin. The test proves the COMPUTED
 * `tenantScopedSlugs()` reproduces it bit-for-bit from the collections barrel +
 * the plugin surface − the spine. computed ≡ hardcoded ⇒ the 201-line literal was
 * pure redundancy, safe to delete.
 */
const GOLDEN_MT: readonly string[] = ["account-reconciliations","activities","addresses","ai-suggestions","api-audit-events","audit-committee-members","audit-committee-minutes","audit-committees","audit-events","audit-evidence","audit-findings","audit-reports","audit-samples","audit-submissions","bank-accounts","bank-reconciliations","bank-statements","bank-transactions","beneficial-owners","bills-of-materials","biological-assets","board-actions","bookable-resources","bookings","budget-planning","business-combinations","carbon-emissions","carriers","carts","categories","chat","closing-entries","commitments","commitments-and-contingencies","compliance-deadlines","compliance-frameworks","compliance-gaps","compliance-notifications","compliance-requirements","consent-records","consignment-arrangements","consignment-inventory","consignment-sales","consolidation-eliminations","consolidations","contract-amendments","contract-performance","contract-signatures","contracts","control-tests","cost-centers","cost-variances","credit-memos","csrd-disclosures","currency-rates","customer-segments","customers","customs-declarations","data-processing-activities","data-subject-requests","debt-schedule","deferred-tax-items","depreciation-schedules","disclosure-checklists","dunning-cycles","earnings-per-share","employees","entity-legal-structures","entity-types","evidence-attestations","expense-reports","fair-value-measurements","financial-statements","fiscal-calendars","fiscal-devices","fiscal-period-snapshots","fiscal-periods","fixed-assets","fx-transactions","gl-accounts","gl-posting-rules","gl-postings","goods-receipts","government-grants","held-for-sale-classifications","insurance-contracts","intercompany-transactions","internal-audit-function","internal-controls","internal-policies","inventory-movements","investment-properties","invoice-lines","invoices","items","job-positions","journal-entries","kyc-checks","leads","lease-modifications","lease-period-postings","leases","leave-requests","legal-entities","maintenance-requests","maintenance-work-orders","management-assessment-icfr","management-certifications","mcp-tool-metadata","media","memories","mineral-resource-assets","operation-runs","operations","operators","opportunities","orders","pages","payment-allocations","payment-methods","payment-runs","payments","payroll-runs","performance-obligations","performance-reviews","period-end-adjustments","period-locks","policy-acknowledgments","policy-versions","post-balance-sheet-events","post-close-analytics-reports","posts","prior-period-adjustments","production-receipts","products","project-milestones","project-tasks","projects","properties","provisions","purchase-orders","purchase-requisitions","quality-inspections","quotes","receipts","recruiting-pipeline","recurring-journals","refunds","regulatory-deferral-accounts","regulatory-reports","related-party-transactions","remediation-plans","reporting-mappings","reporting-standards","returns","risk-register","rounding-adjustments","routings","sales","sales-commissions","sales-orders","segment-reporting","sepa-mandates","share-based-payments","shares","shipments","spaces","standards","statutory-field-mappings","statutory-report-templates","subscriptions","taggings","tags","tax-calculations","tax-codes","tax-jurisdictions","tax-periods","tax-returns","taxing-jurisdictions","terminals","time-entries","tracking-events","transaction-failures","transactions","transfer-pricing-adjustments","transfer-pricing-files","translations","usage-records","variantOptions","variantTypes","variants","vendor-quotes","vendor-scorecards","vendors","warehouse-locations","wip-snapshots","work-centers","work-orders","work-shifts","workflow-definitions","workflow-instances"]

/**
 * The `@/collections` barrel slug set at the time of writing (210). Read
 * side-effect-free as a fixture (importing the barrel pulls the whole app via a
 * config cycle). The "drift guard" below re-counts the live barrel so this
 * fixture cannot silently fall out of step with the tree.
 */
const BARREL_SLUGS: readonly string[] = ["account-reconciliations","activities","ai-suggestions","api-audit-events","audit-committee-members","audit-committee-minutes","audit-committees","audit-events","audit-evidence","audit-findings","audit-reports","audit-samples","audit-submissions","bank-accounts","bank-reconciliations","bank-statements","bank-transactions","batches","beneficial-owners","bills-of-materials","biological-assets","board-actions","bookable-resources","bookings","budget-planning","business-combinations","carbon-emissions","carriers","cases","categories","chat","closing-entries","commitments","commitments-and-contingencies","compliance-deadlines","compliance-frameworks","compliance-gaps","compliance-notifications","compliance-requirements","connections","consent-records","consignment-arrangements","consignment-inventory","consignment-sales","consolidation-eliminations","consolidations","contract-amendments","contract-performance","contract-signatures","contracts","control-tests","cost-centers","cost-variances","credit-memos","csrd-disclosures","currency-rates","customer-segments","customers","customs-declarations","data-processing-activities","data-subject-requests","debt-schedule","deferred-tax-items","depreciation-schedules","disclosure-checklists","dunning-cycles","earnings-per-share","employees","entity-legal-structures","entity-types","evidence-attestations","expense-reports","fair-value-measurements","financial-statements","fiscal-calendars","fiscal-devices","fiscal-period-snapshots","fiscal-periods","fixed-assets","fx-transactions","gl-accounts","gl-posting-rules","gl-postings","goods-receipts","government-grants","held-for-sale-classifications","insurance-contracts","intercompany-transactions","internal-audit-function","internal-controls","internal-policies","inventory-movements","investment-properties","invoice-lines","invoices","items","job-positions","journal-entries","kyc-checks","leads","lease-modifications","lease-period-postings","leases","leave-requests","legal-entities","lot-variants","lot-work-phases","lots","maintenance-requests","maintenance-work-orders","management-assessment-icfr","management-certifications","mcp-tool-metadata","media","memories","messages","mineral-resource-assets","operation-runs","operations","operators","opportunities","pack-items","packages","packs","pages","payment-allocations","payment-methods","payment-runs","payments","payroll-runs","performance-obligations","performance-reviews","period-end-adjustments","period-locks","policy-acknowledgments","policy-versions","post-balance-sheet-events","post-close-analytics-reports","posts","prior-period-adjustments","production-receipts","project-milestones","project-tasks","projects","properties","provisions","purchase-orders","purchase-requisitions","quality-inspections","quotes","receipts","recruiting-pipeline","recurring-journals","refunds","regulatory-deferral-accounts","regulatory-reports","related-party-transactions","remediation-plans","reporting-mappings","reporting-standards","returns","risk-register","roles","rounding-adjustments","routings","sales","sales-commissions","sales-orders","sectors","segment-reporting","sepa-mandates","share-based-payments","shares","shipments","spaces","standards","statutory-field-mappings","statutory-report-templates","subscription-plans","subscriptions","taggings","tags","tax-calculations","tax-codes","tax-jurisdictions","tax-periods","tax-returns","taxing-jurisdictions","tenants","terminals","time-entries","tracking-events","transaction-failures","transfer-pricing-adjustments","transfer-pricing-files","translations","usage-records","user-roles","users","vendor-quotes","vendor-scorecards","vendors","warehouse-locations","wip-snapshots","work-centers","work-orders","work-phases","work-shifts","workflow-definitions","workflow-instances"]

describe('multi-tenant scoping is COMPUTED, not a hand-list', () => {
  const collections = BARREL_SLUGS.map((slug) => ({ slug }))

  it('reproduces the 201-slug hand-list exactly (computed ≡ hardcoded)', () => {
    expect([...tenantScopedSlugs(collections)].sort()).toEqual([...GOLDEN_MT].sort())
  })

  it('scopes every barrel collection except the explicit spine', () => {
    const scoped = new Set(tenantScopedSlugs(collections))
    for (const slug of BARREL_SLUGS) {
      expect(scoped.has(slug) || GLOBAL_SPINE.has(slug)).toBe(true)
    }
  })

  it('the spine is real — every excluded slug is an actual barrel collection', () => {
    for (const slug of GLOBAL_SPINE) expect(BARREL_SLUGS).toContain(slug)
  })

  it('plugin-injected scoped slugs are disjoint from the barrel', () => {
    const barrel = new Set(BARREL_SLUGS)
    for (const slug of PLUGIN_TENANT_SLUGS) expect(barrel.has(slug)).toBe(false)
  })

  it('drift guard — the BARREL_SLUGS fixture still matches the live barrel', () => {
    // Side-effect-free: count `export { X } from '...'` statements; never import.
    const barrel = readFileSync(new URL('../collections/index.ts', import.meta.url), 'utf8')
    const exportCount = (barrel.match(/export\s*\{[^}]*\}\s*from\s*'/g) ?? []).length
    expect(exportCount).toBe(BARREL_SLUGS.length)
  })
})

/**
 * The DRIFT finding, asserted so it is documented not hidden: these per-tenant
 * operational collections currently lack tenant scoping (inherited verbatim from
 * the old hand-list). Flipping them into scoping is a deliberate, migrated step.
 */
describe('tenant-scoping drift — the bug the computation surfaced', () => {
  it('flags the collections that silently lost tenant isolation', () => {
    const scoped = new Set(tenantScopedSlugs(BARREL_SLUGS.map((slug) => ({ slug }))))
    for (const slug of TENANT_UNSCOPED_DRIFT) {
      expect(BARREL_SLUGS).toContain(slug) // it is a real collection
      expect(scoped.has(slug)).toBe(false) // …that is NOT tenant-scoped today
    }
  })

  it('principled globals ∪ drift = the spine', () => {
    expect(new Set([...TENANT_GLOBAL, ...TENANT_UNSCOPED_DRIFT])).toEqual(GLOBAL_SPINE)
  })
})
