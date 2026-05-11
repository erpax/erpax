/**
 * O2C services over-time — canonical seed (Slice PPPP, Slice XXXX rewrite).
 *
 * Opportunity → Contract → PerformanceObligation → Project → ProjectTask
 *  → TimeEntry → WipSnapshot (cost-to-cost) → Milestone achieved
 *  → MilestoneInvoice → Payment.
 *
 * Exercises the IFRS-15 §35 over-time pattern with cost-to-cost
 * progress (§B14-B19) and milestone billing (§126). The WIP snapshot
 * + milestone-achieved emits trigger the GL handlers shipped in NNNN.
 *
 * XXXX (2026-05-10): rewritten against the REAL collection schemas:
 *   - Contracts: customer→addresses (NOT customers); requires `title` +
 *     `effectiveFrom` + `totalValue` (not `effectiveDate`/`totalAmount`).
 *   - PerformanceObligations: requires `kind` + `recognitionTiming` +
 *     `standaloneSellingPrice`; uses `allocatedAmount` (NOT
 *     `transactionPriceAllocated`); status options pending/in_progress/
 *     satisfied/cancelled (NOT `identified`).
 *   - TimeEntries: employee→employees (NOT users); needs `entryId` +
 *     `kind`; `workDate`/`minutes`/`description` (NOT
 *     `entryDate`/`hours`/`taskDescription`); `project`/`task` are
 *     TEXT fields, not FKs.
 *
 * @standard IFRS-15 §35 over-time-recognition
 * @standard IFRS-15 §B14 §B18 cost-to-cost
 * @standard IFRS-15 §126 milestone-billing
 * @standard IFRS-15 §107 §108 contract-asset-contract-liability
 */

import type { ChainImpls, ChainStepImpl } from '@/services/business-chains/run-chain'

const ts = () => Date.now().toString(36)

const CONTRACT_VALUE_CENTS  = 120_000_00 // €120k contract
const TOTAL_BUDGETED_COST   = 80_000_00  // €80k EAC
const COST_TO_DATE          = 20_000_00  // €20k incurred → 25% complete
const PERCENT_COMPLETE      = 25
const RECOGNISED_TO_DATE    = (CONTRACT_VALUE_CENTS * PERCENT_COMPLETE) / 100  // €30k
const MILESTONE_AMOUNT      = 30_000_00  // €30k first milestone

const winOpp: ChainStepImpl = async (payload, ctx, state) => {
  const opp = await payload.create({
    collection: 'opportunities',
    data: {
      tenant: ctx.tenantId,
      name: `Chain Services Deal ${ts()}`,
      customer: ctx.customerId,
      opportunityOwner: ctx.userId,
      stage: 'closed_won',
      probability: 100,
      currency: 'EUR',
      amount: CONTRACT_VALUE_CENTS,
      weightedAmount: CONTRACT_VALUE_CENTS,
      expectedCloseDate: new Date().toISOString(),
      status: 'won',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.opportunityId = opp.id
  return 'opp:won'
}

/** Inline ecommerce-plugin Address fixture (Contracts FK). */
const ensureAddress = async (
  payload: Parameters<ChainStepImpl>[0],
  ctx: Parameters<ChainStepImpl>[1],
  state: Parameters<ChainStepImpl>[2],
): Promise<string> => {
  if (state.addressId) return state.addressId as string
  const addr = await payload.create({
    collection: 'addresses',
    data: {
      tenant: ctx.tenantId,
      addressLine1: '1 Chain Test Street',
      city: 'Sofia',
      postalCode: '1000',
      country: 'BG',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.addressId = addr.id
  return addr.id
}

/** Inline Employee fixture (TimeEntries FK). */
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
      employeeNumber: `EMP-SVC-${ts()}`,
      displayName: 'Chain Services Engineer',
      identity: { givenName: 'Chain', familyName: 'Engineer' },
      contact: { workEmail: `svc-${ts()}@chain.test` },
      jobTitle: 'Senior Consultant',
      employmentType: 'full_time_indefinite',
      hireDate: new Date().toISOString(),
      currency: 'EUR',
      compensation: { baseSalaryAnnual: 100_000_00, fteRatio: 1, paySchedule: 'monthly' },
      status: 'active',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.employeeId = emp.id
  return emp.id
}

const signContract: ChainStepImpl = async (payload, ctx, state) => {
  const addressId = await ensureAddress(payload, ctx, state)
  const c = await payload.create({
    collection: 'contracts',
    data: {
      tenant: ctx.tenantId,
      contractNumber: `CTR-SVC-${ts()}`,
      customer: addressId,
      title: 'Chain test services contract — over-time',
      effectiveFrom: new Date().toISOString(),
      currency: 'EUR',
      totalValue: CONTRACT_VALUE_CENTS,
      transactionPriceFixed: CONTRACT_VALUE_CENTS,
      status: 'active',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.contractId = c.id
  return 'contract:signed'
}

const identifyObligation: ChainStepImpl = async (payload, ctx, state) => {
  const po = await payload.create({
    collection: 'performance-obligations',
    data: {
      tenant: ctx.tenantId,
      contract: state.contractId,
      description: 'Custom build — over-time recognition',
      kind: 'distinct',
      recognitionTiming: 'over_time',
      overTimeMeasurement: 'input_method',
      measurementKind: 'cost_to_cost',
      standaloneSellingPrice: CONTRACT_VALUE_CENTS,
      allocatedAmount: CONTRACT_VALUE_CENTS,
      currency: 'EUR',
      status: 'in_progress',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.obligationId = po.id
  return 'po-obl:identified'
}

const createProject: ChainStepImpl = async (payload, ctx, state) => {
  const p = await payload.create({
    collection: 'projects',
    data: {
      tenant: ctx.tenantId,
      projectCode: `PRJ-${ts()}`,
      name: 'Chain Services Project',
      customer: ctx.customerId,
      contract: state.contractId,
      projectManager: ctx.userId,
      projectType: 'fixed_price',
      recognitionMethod: 'cost_to_cost',
      currency: 'EUR',
      contractedAmount: CONTRACT_VALUE_CENTS,
      budgetedCost: TOTAL_BUDGETED_COST,
      plannedStartDate: new Date().toISOString(),
      plannedEndDate: new Date(Date.now() + 180 * 86_400_000).toISOString(),
      status: 'in_progress',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.projectId = p.id
  return 'project:created'
}

const planTask: ChainStepImpl = async (payload, ctx, state) => {
  const t = await payload.create({
    collection: 'project-tasks',
    data: {
      tenant: ctx.tenantId,
      project: state.projectId,
      taskCode: `T-${ts()}`,
      name: 'Implementation phase 1',
      assignee: ctx.userId,
      taskType: 'work',
      budgetedHours: 400,
      budgetedCost: TOTAL_BUDGETED_COST,
      isBillable: true,
      status: 'in_progress',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.taskId = t.id
  return 'task:planned'
}

const postTime: ChainStepImpl = async (payload, ctx, state) => {
  const employeeId = await ensureEmployee(payload, ctx, state)
  await payload.create({
    collection: 'time-entries',
    data: {
      tenant: ctx.tenantId,
      entryId: `TE-SVC-${ts()}`,
      employee: employeeId,
      workDate: new Date().toISOString(),
      kind: 'regular',
      minutes: 100 * 60,                            // 100 hours
      project: state.projectId as string,           // text field — use project id as ref
      task: state.taskId as string,                 // text field — use task id as ref
      billable: true,
      description: 'Implementation work',
      status: 'approved',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'time:posted'
}

const snapshotWip: ChainStepImpl = async (payload, ctx, state) => {
  const snap = await payload.create({
    collection: 'wip-snapshots',
    data: {
      tenant: ctx.tenantId,
      snapshotRef: `WIP-${ts()}`,
      project: state.projectId,
      period: ctx.fiscalPeriodId,
      snapshotDate: new Date().toISOString(),
      recognitionMethod: 'cost_to_cost',
      currency: 'EUR',
      contractedAmount: CONTRACT_VALUE_CENTS,
      estimatedTotalCost: TOTAL_BUDGETED_COST,
      costToDate: COST_TO_DATE,
      percentComplete: PERCENT_COMPLETE,
      recognisedRevenue: RECOGNISED_TO_DATE,
      invoicedToDate: 0,
      unbilledOrDeferred: RECOGNISED_TO_DATE, // positive = contract asset (unbilled)
      status: 'posted',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.snapshotId = snap.id
  return 'wip:snapshot:posted'
}

const achieveMilestone: ChainStepImpl = async (payload, ctx, state) => {
  const m = await payload.create({
    collection: 'project-milestones',
    data: {
      tenant: ctx.tenantId,
      project: state.projectId,
      milestoneNumber: 1,
      name: 'Phase 1 acceptance',
      milestoneType: 'billing',
      currency: 'EUR',
      amount: MILESTONE_AMOUNT,
      plannedDate: new Date().toISOString(),
      achievedDate: new Date().toISOString(),
      achievedBy: ctx.userId,
      status: 'achieved',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.milestoneId = m.id
  return 'milestone:achieved'
}

const milestoneInvoice: ChainStepImpl = async (payload, ctx, state) => {
  const addressId = await ensureAddress(payload, ctx, state)
  const inv = await payload.create({
    collection: 'invoices',
    data: {
      tenant: ctx.tenantId,
      number: `MS-INV-${ts()}`,
      typeStatus: { invoiceType: 'invoice', invoiceTypeCode: '380', confirmed: true },
      status: 'active',
      parties: { seller: addressId, buyer: addressId },
      dates: {
        date: new Date().toISOString(),
        issuedAt: new Date().toISOString(),
        dueAt: new Date(Date.now() + 30 * 86_400_000).toISOString(),
      },
      amounts: {
        itemTotal: MILESTONE_AMOUNT,
        netTotal: MILESTONE_AMOUNT,
        taxTotal: 0,
        totalAmount: MILESTONE_AMOUNT,
        totalDue: MILESTONE_AMOUNT,
      },
      billingTax: { currencyCode: 'EUR' },
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.invoiceId = inv.id
  return 'invoice:activated'
}

const receivePayment: ChainStepImpl = async (payload, ctx, state) => {
  const addressId = await ensureAddress(payload, ctx, state)
  await payload.create({
    collection: 'payments',
    data: {
      tenant: ctx.tenantId,
      transactionNumber: `MS-PMT-${ts()}`,
      paymentKind: 'received',
      status: 'received',
      invoice: state.invoiceId,
      parties: { sender: addressId, receiver: addressId },
      amounts: { amount: MILESTONE_AMOUNT, currencyCode: 'EUR' },
      dates: { receivedAt: new Date().toISOString() },
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'payment:received'
}

export const o2cServicesOverTimeImpls: ChainImpls = [
  winOpp, signContract, identifyObligation, createProject, planTask,
  postTime, snapshotWip, achieveMilestone, milestoneInvoice, receivePayment,
]
