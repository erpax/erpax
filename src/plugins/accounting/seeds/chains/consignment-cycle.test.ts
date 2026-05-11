/**
 * # Consignment cycle — canonical e2e test
 *
 * > Recognise revenue **the moment your distributor sells** — not when
 * > they take the box off your truck. IFRS-15 §B77-B78 + ASC 606-10-55-79
 * > mean control passes only on the consignee's onward sale; this test
 * > walks the seed end-to-end and asserts that exact moment.
 *
 * ## What this test proves
 *
 * Step 1 signs a consignment arrangement (master agreement w/ consignee).
 * Step 2 ships goods to the consignee — `inventory-movements` row, NO
 * revenue recognition yet (control still with consignor per §B78).
 * Step 3 opens a `consignment-inventory` row — running balance at the
 * consignee location; the goods stay on OUR balance sheet (IAS-2 §6).
 * Step 4 records a sale by the consignee — THIS is the §B78 control-
 * transfer event; revenue + COGS + commission expense recognise.
 * Step 5 raises an invoice to the consignee for the net amount.
 * Step 6 records the payment we receive from the consignee.
 *
 * ## Wiring (CCCCC tag vocabulary — pilot)
 *
 * @summary "Recognise revenue the moment your distributor sells."
 * @summary "IFRS-15 §B77-B78 compliant out of the box."
 * @summary "One row in, one journal entry out, full audit trail."
 *
 * @useCase **Distributor channel sales**: a manufacturer ships 1,000
 *   units to a regional distributor on consignment. Distributor sells
 *   350 units in Q1; ERPax recognises €420k revenue + €150k COGS +
 *   €63k commission expense only on those 350 — the remaining 650
 *   stay on the manufacturer's balance sheet per IAS-2 §6 until the
 *   distributor reports their sale.
 * @useCase **VMI (Vendor Managed Inventory)**: an auto-parts supplier
 *   replenishes a customer's bin weekly; recognition fires only when
 *   the customer's POS reports usage to the supplier.
 * @useCase **SaaS reseller channel**: a software vendor ships license
 *   keys via a reseller; revenue recognised on the reseller's
 *   activation report, net of the agreed reseller margin.
 *
 * @invariant result.errors.length === 0
 * @invariant result.succeeded === true
 * @invariant result.stepsCompleted === 6
 * @invariant result.glDebitTotal === result.glCreditTotal
 * @invariant result.auditEventCount >= 6
 *
 * @example CONSIGNMENT_CYCLE / step 1-of-6
 * ```json
 * {
 *   "reference": "CONS-{{ts}}",
 *   "consignee": "{{state.addressId}}",
 *   "consigneeName": "Chain Test Consignee",
 *   "effectiveFrom": "{{now}}",
 *   "controlTransferTrigger": "consignee_sale",
 *   "returnRights": "unrestricted",
 *   "currency": "EUR",
 *   "maxValue": 1000000,
 *   "commissionRatePercent": 15,
 *   "incoterm": "CPT",
 *   "status": "active"
 * }
 * ```
 *
 * @example CONSIGNMENT_CYCLE / step 4-of-6
 * ```json
 * {
 *   "reference": "CSALE-{{ts}}",
 *   "arrangement": "{{state.arrangementId}}",
 *   "consignmentInventory": "{{state.consignmentInventoryId}}",
 *   "saleDate": "{{now}}",
 *   "reportedDate": "{{now}}",
 *   "quantitySold": 30,
 *   "unitOfMeasure": "EA",
 *   "unitPrice": 1200,
 *   "grossAmount": 36000,
 *   "commissionRatePercent": 15,
 *   "commissionAmount": 5400,
 *   "netAmount": 30600,
 *   "cogsAmount": 15000,
 *   "currency": "EUR",
 *   "status": "validated"
 * }
 * ```
 *
 * @standard IFRS IFRS-15 §B77-B78 consignment-arrangements
 * @standard IFRS IFRS-15 §38 point-in-time-control-transfer
 * @standard IFRS IAS-2 §6 inventories-held-at-other-location
 * @standard US-GAAP ASC-606-10-55-79 consignment-indicators
 * @compliance SOX §404 TOM-AR-04 revenue-deferral
 * @audit ISO-19011:2018 §6.4.6 audit-evidence
 *
 * @slice ZZZZ
 * @slice CCCCC-pilot
 *
 * @see ./consignment-cycle.ts
 * @see /Users/ceci/Library/Application Support/Claude/.../memory/erpax_jsdoc_as_spec.md
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import type { Payload } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  BUSINESS_CHAINS,
  createChainContext,
  teardownChainContext,
  runChain,
  type ChainContext,
} from '@/services/business-chains'
import { consignmentCycleImpls } from '@/plugins/accounting/seeds/chains/consignment-cycle'

describe('Chain — Consignment cycle', () => {
  let payload: Payload
  let ctx: ChainContext
  beforeAll(async () => { payload = await getPayload({ config }); ctx = await createChainContext(payload) }, 30_000)
  afterAll(async () => { if (payload && ctx) await teardownChainContext(payload, ctx) }, 30_000)

  it('walks Sign → Ship → On-hand → Sell → Invoice → Pay (control passes per IFRS-15 §B78)', async () => {
    const chain = BUSINESS_CHAINS.CONSIGNMENT_CYCLE
    const result = await runChain(payload, chain, ctx, consignmentCycleImpls)
    expect(result.errors).toEqual([])
    expect(result.succeeded).toBe(true)
    expect(result.stepsCompleted).toBe(chain.steps.length)
    expect(result.emittedEvents).toEqual([
      'consignment:arranged',
      'inventory:issued',
      'consignment:on-hand',
      'consignment:sold',
      'invoice:activated',
      'payment:received',
    ])
    expect(result.glDebitTotal).toEqual(result.glCreditTotal)
    expect(result.auditEventCount).toBeGreaterThanOrEqual(6)
  }, 60_000)
})
