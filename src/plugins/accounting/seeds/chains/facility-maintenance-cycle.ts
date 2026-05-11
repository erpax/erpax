/**
 * Facility maintenance cycle — canonical seed (Slice ZZZZ).
 *
 * Property → Space → MaintenanceRequest → triaged → MaintenanceWorkOrder
 * → parts issued (inventory-movements) + labour booked (time-entries) →
 * completed → quality-inspected → cost-posted (capex or opex per
 * IAS-16 §12 vs §13).
 *
 * @standard ISO-41001:2018 §8.1 facility-management-operational-control
 * @standard ISO-55000:2014 asset-management
 * @standard ISO-14224:2016 reliability-and-maintenance-data
 * @standard EN-13306:2017 maintenance-terminology
 * @standard IAS-16 §12 §13 capex-vs-opex-classification
 */

import type { ChainImpls, ChainStepImpl } from '@/services/business-chains/run-chain'

const ts = () => Date.now().toString(36)
const PARTS_QTY = 2
const PART_UNIT_COST = 25_00      // €25/unit
const LABOUR_HOURS = 4
const LABOUR_RATE = 35_00         // €35/hr
const PARTS_COST = PARTS_QTY * PART_UNIT_COST
const LABOUR_COST = LABOUR_HOURS * LABOUR_RATE
const TOTAL_COST = PARTS_COST + LABOUR_COST

const ensureAddress = async (
  payload: Parameters<ChainStepImpl>[0],
  ctx: Parameters<ChainStepImpl>[1],
  state: Parameters<ChainStepImpl>[2],
): Promise<string> => {
  if (state.addressId) return state.addressId as string
  const a = await payload.create({
    collection: 'addresses',
    data: { tenant: ctx.tenantId, addressLine1: '1 HQ Plaza', city: 'Sofia', postalCode: '1000', country: 'BG' } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.addressId = a.id
  return a.id
}

const ensureEmployee = async (
  payload: Parameters<ChainStepImpl>[0],
  ctx: Parameters<ChainStepImpl>[1],
  state: Parameters<ChainStepImpl>[2],
): Promise<string> => {
  if (state.employeeId) return state.employeeId as string
  const emp = await payload.create({
    collection: 'employees',
    data: {
      tenant: ctx.tenantId,
      employeeNumber: `EMP-FM-${ts()}`,
      displayName: 'Chain FM Tech',
      identity: { givenName: 'Chain', familyName: 'Tech' },
      contact: { workEmail: `fm-${ts()}@chain.test` },
      jobTitle: 'Maintenance Technician',
      employmentType: 'full_time_indefinite',
      hireDate: new Date().toISOString(),
      currency: 'EUR',
      compensation: { baseSalaryAnnual: 50_000_00, fteRatio: 1, paySchedule: 'monthly' },
      status: 'active',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.employeeId = emp.id
  return emp.id
}

const registerProperty: ChainStepImpl = async (payload, ctx, state) => {
  const addressId = await ensureAddress(payload, ctx, state)
  const p = await payload.create({
    collection: 'properties',
    data: {
      tenant: ctx.tenantId,
      code: `PROP-${ts()}`,
      name: 'Chain Test HQ',
      kind: 'office',
      tenure: 'leased',
      address: addressId,
      country: 'BG',
      measurements: { grossInternalArea: 1200, netInternalArea: 1000, numberOfFloors: 3 },
      occupancy: { designedCapacity: 80, currentHeadcount: 65 },
      lifecycle: { acquiredAt: new Date('2024-01-01').toISOString(), commissionedAt: new Date('2024-03-01').toISOString() },
      currency: 'EUR',
      energyCertificate: { epcRating: 'B', kwhPerSqmYear: 95 },
      status: 'active',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.propertyId = p.id
  return 'property:registered'
}

const registerSpace: ChainStepImpl = async (payload, ctx, state) => {
  const s = await payload.create({
    collection: 'spaces',
    data: {
      tenant: ctx.tenantId,
      code: `SPACE-${ts()}`,
      name: 'Conference Room A',
      property: state.propertyId,
      kind: 'room',
      usageCategory: 'meeting',
      floor: '2',
      area: 28,
      capacity: 12,
      currentOccupancy: 0,
      isBookable: false,
      safety: { fireZone: 'F2-A', maxOccupancy: 14, isAccessible: true },
      status: 'active',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.spaceId = s.id
  return 'space:registered'
}

const raiseRequest: ChainStepImpl = async (payload, ctx, state) => {
  const r = await payload.create({
    collection: 'maintenance-requests',
    data: {
      tenant: ctx.tenantId,
      reference: `MR-${ts()}`,
      subject: 'HVAC noisy in Conference Room A',
      description: 'AC unit emits loud rattle when active. Affects meetings.',
      requestType: 'corrective',
      priority: 'p3',
      property: state.propertyId,
      space: state.spaceId,
      reportedBy: ctx.userId,
      reportedAt: new Date().toISOString(),
      status: 'new',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.requestId = r.id
  return 'mr:raised'
}

const triageRequest: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'maintenance-requests',
    id: state.requestId as string,
    data: { status: 'triaged', triagedBy: ctx.userId } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'mr:triaged'
}

const issueWorkOrder: ChainStepImpl = async (payload, ctx, state) => {
  const employeeId = await ensureEmployee(payload, ctx, state)
  const wo = await payload.create({
    collection: 'maintenance-work-orders',
    data: {
      tenant: ctx.tenantId,
      reference: `WO-${ts()}`,
      request: state.requestId,
      subject: 'HVAC repair — Conference Room A',
      description: 'Replace fan bearing, re-balance fan',
      workType: 'corrective',
      priority: 'p3',
      capitalisationTreatment: 'expense', // routine repair per IAS-16 §12
      property: state.propertyId,
      space: state.spaceId,
      assignedTo: employeeId,
      scheduledStartAt: new Date(Date.now() + 86_400_000).toISOString(),
      scheduledEndAt: new Date(Date.now() + 2 * 86_400_000).toISOString(),
      currency: 'EUR',
      safety: { requiresPermitToWork: false, requiresLOTO: true, isHotWork: false },
      status: 'scheduled',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.workOrderId = wo.id
  // Link the request → work order.
  await payload.update({
    collection: 'maintenance-requests',
    id: state.requestId as string,
    data: { status: 'assigned', workOrder: wo.id } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'wo:issued'
}

const issueParts: ChainStepImpl = async (payload, ctx, state) => {
  await payload.create({
    collection: 'inventory-movements',
    data: {
      tenant: ctx.tenantId,
      movementId: `IM-WO-${ts()}`,
      kind: 'issue',
      sourceDocumentType: 'maintenance-work-orders',
      sourceDocumentId: state.workOrderId,
      quantity: PARTS_QTY,
      unitCost: PART_UNIT_COST,
      extendedCost: PARTS_COST,
      currency: 'EUR',
      movementAt: new Date().toISOString(),
      valuationMethod: 'fifo',
      status: 'posted',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'inventory:issued'
}

const bookLabour: ChainStepImpl = async (payload, ctx, state) => {
  const employeeId = await ensureEmployee(payload, ctx, state)
  await payload.create({
    collection: 'time-entries',
    data: {
      tenant: ctx.tenantId,
      entryId: `TE-WO-${ts()}`,
      employee: employeeId,
      workDate: new Date().toISOString(),
      kind: 'regular',
      minutes: LABOUR_HOURS * 60,
      description: 'Maintenance work — HVAC repair',
      billable: false,
      status: 'approved',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'time:posted'
}

const completeWorkOrder: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'maintenance-work-orders',
    id: state.workOrderId as string,
    data: {
      status: 'completed',
      partsCost: PARTS_COST,
      labourCost: LABOUR_COST,
      totalCost: TOTAL_COST,
      failureCode: 'B.1.2', // ISO 14224 example bearing-failure code
      rootCause: 'Worn fan bearing; bearing replaced + fan re-balanced',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'wo:completed'
}

const inspect: ChainStepImpl = async (payload, ctx, state) => {
  await payload.create({
    collection: 'quality-inspections',
    data: {
      tenant: ctx.tenantId,
      reference: `QC-WO-${ts()}`,
      inspectionType: 'in_process',
      inspectionDate: new Date().toISOString(),
      inspector: ctx.userId,
      sampleSize: 1,
      inspectedQuantity: 1,
      failedQuantity: 0,
      outcome: 'pass',
      status: 'completed',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'qc:complete'
}

const closeAndPost: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'maintenance-work-orders',
    id: state.workOrderId as string,
    data: { status: 'closed', actualEndAt: new Date().toISOString() } as Record<string, unknown>,
    overrideAccess: true,
  })
  // Link request closure.
  await payload.update({
    collection: 'maintenance-requests',
    id: state.requestId as string,
    data: { status: 'resolved', closureNote: 'HVAC repaired + tested.' } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'wo:closed'
}

export const facilityMaintenanceCycleImpls: ChainImpls = [
  registerProperty, registerSpace, raiseRequest, triageRequest,
  issueWorkOrder, issueParts, bookLabour, completeWorkOrder,
  inspect, closeAndPost,
]
