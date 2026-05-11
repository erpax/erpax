/**
 * Manufacturing cycle — canonical seed.
 *
 * BOM → WO → MaterialIssue → ProductionReceipt → CostVariance →
 * QualityInspection. Slice XXXX (2026-05-10) — rewritten against the
 * real BillsOfMaterials / WorkOrders / InventoryMovements / ProductionReceipts
 * / CostVariances / QualityInspections schemas surfaced by the
 * `checkChainSeedFieldsExistOnCollections` invariant.
 *
 * @standard IAS-2 §10-14 cost-of-conversion
 * @standard IAS-2 §21 standard-vs-actual variances
 * @standard ISA-95:2013 §B.5 production-order
 * @standard ISO 9001:2015 §8.7 nonconforming-output
 */

import type { ChainImpls, ChainStepImpl } from '@/services/business-chains/run-chain'

const STD_QTY = 100
const STD_UNIT_COST = 5_00          // €5/unit standard
const ACTUAL_QTY = 100
const ACTUAL_UNIT_COST = 5_25       // €5.25/unit actual
const STD_TOTAL = STD_QTY * STD_UNIT_COST          // 50_000 cents
const ACTUAL_TOTAL = ACTUAL_QTY * ACTUAL_UNIT_COST // 52_500 cents
const VARIANCE = ACTUAL_TOTAL - STD_TOTAL          // 2_500 cents unfavourable price variance
const ts = () => Date.now().toString(36)

const releaseBOM: ChainStepImpl = async (payload, ctx, state) => {
  const bom = await payload.create({
    collection: 'bills-of-materials',
    data: {
      tenant: ctx.tenantId,
      reference: `BOM-CHAIN-${ts()}`,
      finishedGood: ctx.itemId ?? undefined,  // optional FK to items collection
      version: 'v1',
      effectiveFrom: new Date().toISOString(),
      producedQuantity: 1,                    // base BOM yields 1 unit
      unitOfMeasure: 'EA',
      components: [
        { sequence: 10, quantity: 2, unitOfMeasure: 'EA', isOptional: false, wasteAllowance: 0 },
        { sequence: 20, quantity: 3, unitOfMeasure: 'EA', isOptional: false, wasteAllowance: 0 },
      ],
      operations: [
        { sequence: 10, standardLabourMinutes: 5, standardMachineMinutes: 2 },
      ],
      status: 'released',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.bomId = bom.id
  return 'bom:released'
}

const releaseWO: ChainStepImpl = async (payload, ctx, state) => {
  const wo = await payload.create({
    collection: 'work-orders',
    data: {
      tenant: ctx.tenantId,
      reference: `WO-CHAIN-${ts()}`,
      bom: state.bomId,
      plannedQuantity: STD_QTY,
      releaseDate: new Date().toISOString(),
      dueDate: new Date(Date.now() + 7 * 86_400_000).toISOString(),
      standardCosts: {
        materialCost: STD_TOTAL * 0.6,
        labourCost: STD_TOTAL * 0.3,
        overheadCost: STD_TOTAL * 0.1,
      },
      standardMaterialCost: STD_TOTAL * 0.6,
      standardLabourCost: STD_TOTAL * 0.3,
      standardOverheadCost: STD_TOTAL * 0.1,
      standardTotalCost: STD_TOTAL,
      status: 'released',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.workOrderId = wo.id
  return 'wo:released'
}

const issueMaterials: ChainStepImpl = async (payload, ctx, state) => {
  await payload.create({
    collection: 'inventory-movements',
    data: {
      tenant: ctx.tenantId,
      movementId: `IM-CHAIN-${ts()}`,
      kind: 'issue',
      sourceDocumentType: 'work-orders',
      sourceDocumentId: state.workOrderId,
      quantity: STD_QTY * 2,                  // 2 units PART-X per output
      unitCost: 1_00,
      extendedCost: STD_QTY * 2 * 1_00,
      currency: 'EUR',
      movementAt: new Date().toISOString(),
      valuationMethod: 'fifo',
      status: 'posted',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'inventory:issued'
}

const postProductionReceipt: ChainStepImpl = async (payload, ctx, state) => {
  const pr = await payload.create({
    collection: 'production-receipts',
    data: {
      tenant: ctx.tenantId,
      reference: `PRECPT-CHAIN-${ts()}`,
      workOrder: state.workOrderId,
      receivedQuantity: ACTUAL_QTY,
      unitCost: ACTUAL_UNIT_COST,
      cost: ACTUAL_TOTAL,
      absorbedCost: ACTUAL_TOTAL,
      materialCost: ACTUAL_TOTAL * 0.6,
      labourCost: ACTUAL_TOTAL * 0.3,
      overheadCost: ACTUAL_TOTAL * 0.1,
      currency: 'EUR',
      receiptDate: new Date().toISOString(),
      status: 'posted',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.productionReceiptId = pr.id
  return 'prod:completed'
}

const computeVariance: ChainStepImpl = async (payload, ctx, state) => {
  // Real CostVariances schema decomposes by variance TYPE (per IAS-2 §21):
  // material price/quantity, labour rate/efficiency, overhead spending/volume.
  // The ACTUAL - STANDARD difference here is purely a material-price unfavourable
  // variance (we received the same quantity at a higher unit cost).
  await payload.create({
    collection: 'cost-variances',
    data: {
      tenant: ctx.tenantId,
      reference: `VAR-CHAIN-${ts()}`,
      workOrder: state.workOrderId,
      varianceDate: new Date().toISOString(),
      materialPriceVariance: VARIANCE,        // unfavourable (positive)
      materialQuantityVariance: 0,
      labourRateVariance: 0,
      labourEfficiencyVariance: 0,
      overheadSpendingVariance: 0,
      overheadVolumeVariance: 0,
      totalVariance: VARIANCE,
      currency: 'EUR',
      disposition: 'expense_immediately',     // IAS-2 §21 — abnormal variances expensed
      status: 'posted',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'variance:computed'
}

const inspect: ChainStepImpl = async (payload, ctx, state) => {
  await payload.create({
    collection: 'quality-inspections',
    data: {
      tenant: ctx.tenantId,
      reference: `QC-CHAIN-${ts()}`,
      workOrder: state.workOrderId,
      inspectionType: 'in_process',
      inspectionDate: new Date().toISOString(),
      inspector: ctx.userId,
      sampleSize: 10,
      inspectedQuantity: 10,
      failedQuantity: 0,
      outcome: 'pass',
      status: 'completed',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'qc:complete'
}

export const manufacturingCycleImpls: ChainImpls = [
  releaseBOM, releaseWO, issueMaterials, postProductionReceipt, computeVariance, inspect,
]
