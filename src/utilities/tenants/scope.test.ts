import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import {
  GLOBAL_SPINE,
  PLUGIN_TENANT_SLUGS,
  TENANT_GLOBAL,
  TENANT_PARTY_SCOPED,
  tenantScopedSlugs,
} from '@/utilities/tenants/scope'

/**
 * THE PROOF of "computing all hardcoded", now also the record of the drift FIX.
 *
 * `GOLDEN_MT` is the EXACT 201-slug map the original payload.config.ts typed out
 * by hand. `NEWLY_SCOPED` is the 9 per-tenant collections that had silently
 * fallen out of that hand-list (the drift the computation surfaced) and are now
 * scoped by the rule. The computed `tenantScopedSlugs()` must equal their union
 * (210): it reproduces the original hand-map AND fixes the 9 omissions — the
 * whole point of computing instead of hand-listing.
 *
 * `mcp-tool-metadata` was removed (tool descriptions are nested pages like any other document),
 * so both fixtures are one shorter than the original hand-map; `customers` and `vendors` were then
 * merged into `parties`, one shorter again; `quotes` then became an earlier stage of `sales-orders`, and `maintenance-requests` of `maintenance-work-orders`: 206; `compliance-notifications`, `statutory-field-mappings` and `reporting-mappings` became arrays on their parent documents; `operations`, `routings` and `operation-runs` merged into `work-phases`, `lot-work-phases` and `work-orders` (the same three things modelled twice); `taxing-jurisdictions` merged into `tax-jurisdictions`; `sales-orders` folded into the e-commerce plugin `orders`, `payments` into its `transactions` and `items` into its `products`; `policy-versions` and `fiscal-period-snapshots` became the native version history of `internal-policies` and `fiscal-periods`; `user-roles` became `users.roleAssignments`; `audit-committee-members` became the committee's `members` array and `gl-posting-rules` fields on `gl-accounts`; `payment-methods` was removed — the e-commerce plugin's Stripe adapter holds payment methods at Stripe, and nothing read or wrote the collection; `refunds` became lines on `credit-memos` and `commitments-and-contingencies` the disclosed stage of `provisions`: 204.
 */
const GOLDEN_MT: readonly string[] = ["account-reconciliations","activities","addresses","ai-suggestions","api-audit-events","audit-committee-minutes","audit-committees","audit-events","audit-evidence","audit-findings","audit-reports","audit-samples","audit-submissions","bank-accounts","bank-reconciliations","bank-statements","bank-transactions","beneficial-owners","bills-of-materials","biological-assets","board-actions","bookable-resources","bookings","budget-planning","business-combinations","carbon-emissions","carriers","carts","categories","chat","closing-entries","commitments","compliance-deadlines","compliance-frameworks","compliance-gaps","compliance-requirements","consent-records","consignment-arrangements","consignment-inventory","consignment-sales","consolidation-eliminations","consolidations","contract-amendments","contract-performance","contract-signatures","contracts","control-tests","cost-centers","cost-variances","credit-memos","csrd-disclosures","currency-rates","customer-segments","parties","customs-declarations","data-processing-activities","data-subject-requests","debt-schedule","deferred-tax-items","depreciation-schedules","disclosure-checklists","dunning-cycles","earnings-per-share","employees","entity-legal-structures","entity-types","evidence-attestations","expense-reports","fair-value-measurements","financial-statements","fiscal-calendars","fiscal-devices","fiscal-periods","fixed-assets","fx-transactions","gl-accounts","gl-postings","goods-receipts","government-grants","held-for-sale-classifications","insurance-contracts","intercompany-transactions","internal-audit-function","internal-controls","internal-policies","inventory-movements","investment-properties","invoice-lines","invoices","job-positions","journal-entries","kyc-checks","leads","lease-modifications","lease-period-postings","leases","leave-requests","legal-entities","maintenance-work-orders","management-assessment-icfr","management-certifications","media","memories","mineral-resource-assets","operators","opportunities","orders","pages","payment-allocations","payment-runs","payroll-runs","performance-obligations","performance-reviews","period-end-adjustments","period-locks","policy-acknowledgments","post-balance-sheet-events","post-close-analytics-reports","posts","prior-period-adjustments","production-receipts","products","project-milestones","project-tasks","projects","properties","provisions","purchase-orders","purchase-requisitions","quality-inspections","receipts","recruiting-pipeline","recurring-journals","regulatory-deferral-accounts","regulatory-reports","related-party-transactions","remediation-plans","reporting-standards","returns","risk-register","rounding-adjustments","sales","sales-commissions","segment-reporting","sepa-mandates","share-based-payments","shares","shipments","spaces","standards","statutory-report-templates","subscriptions","taggings","tags","tax-calculations","tax-codes","tax-jurisdictions","tax-periods","tax-returns","terminals","time-entries","tracking-events","transaction-failures","transactions","transfer-pricing-adjustments","transfer-pricing-files","translations","usage-records","variantOptions","variantTypes","variants","vendor-quotes","vendor-scorecards","warehouse-locations","wip-snapshots","work-centers","work-orders","work-shifts","workflow-definitions","workflow-instances"]

/** The 9 per-tenant collections that drifted out of the old hand-list — now scoped. */
const NEWLY_SCOPED: readonly string[] = ["batches","lots","lot-variants","lot-work-phases","work-phases","packs","pack-items","packages","messages"]

/**
 * The `@/collections` barrel slug set at the time of writing (210). Read
 * side-effect-free as a fixture (importing the barrel pulls the whole app via a
 * config cycle). The "drift guard" below re-counts the live barrel so this
 * fixture cannot silently fall out of step with the tree.
 */
const BARREL_SLUGS: readonly string[] = ["account-reconciliations","activities","ai-suggestions","api-audit-events","audit-committee-minutes","audit-committees","audit-events","audit-evidence","audit-findings","audit-reports","audit-samples","audit-submissions","bank-accounts","bank-reconciliations","bank-statements","bank-transactions","batches","beneficial-owners","bills-of-materials","biological-assets","board-actions","bookable-resources","bookings","budget-planning","business-combinations","carbon-emissions","carriers","cases","categories","chat","closing-entries","commitments","compliance-deadlines","compliance-frameworks","compliance-gaps","compliance-requirements","connections","consent-records","consignment-arrangements","consignment-inventory","consignment-sales","consolidation-eliminations","consolidations","contract-amendments","contract-performance","contract-signatures","contracts","control-tests","cost-centers","cost-variances","credit-memos","csrd-disclosures","currency-rates","customer-segments","parties","customs-declarations","data-processing-activities","data-subject-requests","debt-schedule","deferred-tax-items","depreciation-schedules","disclosure-checklists","dunning-cycles","earnings-per-share","employees","entity-legal-structures","entity-types","evidence-attestations","expense-reports","fair-value-measurements","financial-statements","fiscal-calendars","fiscal-devices","fiscal-periods","fixed-assets","fx-transactions","gl-accounts","gl-postings","goods-receipts","government-grants","held-for-sale-classifications","insurance-contracts","intercompany-transactions","internal-audit-function","internal-controls","internal-policies","inventory-movements","investment-properties","invoice-lines","invoices","job-positions","journal-entries","kyc-checks","leads","lease-modifications","lease-period-postings","leases","leave-requests","legal-entities","lot-variants","lot-work-phases","lots","maintenance-work-orders","management-assessment-icfr","management-certifications","media","memories","messages","mineral-resource-assets","operators","opportunities","pack-items","packages","packs","pages","payment-allocations","payment-runs","payroll-runs","performance-obligations","performance-reviews","period-end-adjustments","period-locks","policy-acknowledgments","post-balance-sheet-events","post-close-analytics-reports","posts","prior-period-adjustments","production-receipts","project-milestones","project-tasks","projects","properties","provisions","purchase-orders","purchase-requisitions","quality-inspections","receipts","recruiting-pipeline","recurring-journals","regulatory-deferral-accounts","regulatory-reports","related-party-transactions","remediation-plans","reporting-standards","returns","risk-register","roles","rounding-adjustments","sales","sales-commissions","sectors","segment-reporting","sepa-mandates","share-based-payments","shares","shipments","spaces","standards","statutory-report-templates","subscription-plans","subscriptions","taggings","tags","tax-calculations","tax-codes","tax-jurisdictions","tax-periods","tax-returns","tenants","terminals","time-entries","tracking-events","transaction-failures","transfer-pricing-adjustments","transfer-pricing-files","translations","usage-records","users","vendor-quotes","vendor-scorecards","warehouse-locations","wip-snapshots","work-centers","work-orders","work-phases","work-shifts","workflow-definitions","workflow-instances"]

describe('multi-tenant scoping is COMPUTED, not a hand-list', () => {
  const collections = BARREL_SLUGS.map((slug) => ({ slug }))

  it('= the original 201 hand-list ∪ the 9 drift-fixes, less the removed and the merged collection (189 scoped, computed)', () => {
    const scoped = tenantScopedSlugs(collections)
    expect([...scoped].sort()).toEqual([...GOLDEN_MT, ...NEWLY_SCOPED].sort())
    expect(scoped.length).toBe(189)
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
    const barrel = readFileSync(new URL('../../collections/index.ts', import.meta.url), 'utf8')
    const exportCount = (barrel.match(/export\s*\{[^}]*\}\s*from\s*'/g) ?? []).length
    expect(exportCount).toBe(BARREL_SLUGS.length)
  })
})

/**
 * The drift is now FIXED — the 9 per-tenant operational collections are scoped,
 * and `cases` stays out for a principled, documented reason (party-role access is
 * its tenant-isolation twin). Asserted so the decision is recorded, not implicit.
 */
describe('the tenant-scoping drift is fixed', () => {
  const scoped = new Set(tenantScopedSlugs(BARREL_SLUGS.map((slug) => ({ slug }))))

  it('the 9 drifted collections are now tenant-scoped', () => {
    for (const slug of NEWLY_SCOPED) {
      expect(BARREL_SLUGS).toContain(slug) // a real collection…
      expect(scoped.has(slug)).toBe(true) // …now scoped
    }
  })

  it('cases stays party-scoped (cross-tenant justice), not tenant-scoped', () => {
    expect(TENANT_PARTY_SCOPED).toEqual(['cases'])
    expect(scoped.has('cases')).toBe(false)
  })

  it('principled globals ∪ party-scoped = the spine', () => {
    expect(new Set([...TENANT_GLOBAL, ...TENANT_PARTY_SCOPED])).toEqual(GLOBAL_SPINE)
  })
})
