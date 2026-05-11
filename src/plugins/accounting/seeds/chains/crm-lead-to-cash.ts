/**
 * CRM lead-to-cash — canonical seed (Slice NNNN cut-3, Slice XXXX rewrite).
 *
 * Lead → Activity → MQL → SQL → Opportunity → CloseWon → Customer →
 * Contract → SalesCommission booked.
 *
 * XXXX (2026-05-10): Contracts.customer FK relates to **addresses**
 * (NOT `customers`); requires `title` + `effectiveFrom` + `totalValue`.
 *
 * @standard IFRS-15 §9 contract-existence + §91-94 incremental-costs
 * @compliance GDPR Art.5 + Art.6(1)(f) legitimate-interest (B2B)
 */

import type { ChainImpls, ChainStepImpl } from '@/services/business-chains/run-chain'

const ts = () => Date.now().toString(36)
const DEAL_CENTS = 36_000_00 // €36k ARR
const COMMISSION_PERCENT = 8
const COMMISSION_CENTS = (DEAL_CENTS * COMMISSION_PERCENT) / 100

const createLead: ChainStepImpl = async (payload, ctx, state) => {
  const lead = await payload.create({
    collection: 'leads',
    data: {
      tenant: ctx.tenantId,
      fullName: `Chain CRM ${ts()}`,
      companyName: `Chain CRM Co ${ts()}`,
      email: `crm-${ts()}@chain.test`,
      leadSource: 'partner',
      status: 'new',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.leadId = lead.id
  return 'lead:created'
}

const logActivity: ChainStepImpl = async (payload, ctx, state) => {
  await payload.create({
    collection: 'activities',
    data: {
      tenant: ctx.tenantId,
      subject: 'Discovery call',
      activityType: 'call',
      direction: 'outbound',
      activityDate: new Date().toISOString(),
      assignedTo: ctx.userId,
      relatedTo: 'lead',
      lead: state.leadId,
      outcome: 'positive',
      status: 'completed',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'activity:logged'
}

const qualifyMql: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'leads',
    id: state.leadId as string,
    data: { status: 'mql' } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'lead:mql'
}

const qualifySql: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'leads',
    id: state.leadId as string,
    data: { status: 'sql' } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'lead:sql'
}

const createOpp: ChainStepImpl = async (payload, ctx, state) => {
  const opp = await payload.create({
    collection: 'opportunities',
    data: {
      tenant: ctx.tenantId,
      name: `Chain CRM Deal ${ts()}`,
      lead: state.leadId,
      customer: ctx.customerId,
      opportunityOwner: ctx.userId,
      stage: 'qualification',
      probability: 25,
      currency: 'EUR',
      amount: DEAL_CENTS,
      weightedAmount: DEAL_CENTS * 0.25,
      expectedCloseDate: new Date().toISOString(),
      status: 'open',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.opportunityId = opp.id
  return 'opp:created'
}

const closeWon: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'opportunities',
    id: state.opportunityId as string,
    data: {
      stage: 'closed_won',
      probability: 100,
      weightedAmount: DEAL_CENTS,
      actualCloseDate: new Date().toISOString(),
      status: 'won',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'opp:won'
}

const createCustomer: ChainStepImpl = async (payload, ctx, state) => {
  // The shared chain context already has a customer — no new write needed,
  // but emit-for-symmetry so downstream chain consumers see customer:created.
  state.customerCreatedFromOpp = ctx.customerId
  return 'customer:created'
}

const signContract: ChainStepImpl = async (payload, ctx, state) => {
  // Contracts.customer relates to ecommerce-plugin `addresses` collection
  // (NOT `customers`). Seed an inline address fixture for the FK.
  const addr = await payload.create({
    collection: 'addresses',
    data: {
      tenant: ctx.tenantId,
      addressLine1: '1 Chain CRM Street',
      city: 'Sofia',
      postalCode: '1000',
      country: 'BG',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.addressId = addr.id
  const ctr = await payload.create({
    collection: 'contracts',
    data: {
      tenant: ctx.tenantId,
      contractNumber: `CRM-CTR-${ts()}`,
      customer: addr.id,
      title: 'Chain CRM annual contract',
      effectiveFrom: new Date().toISOString(),
      currency: 'EUR',
      totalValue: DEAL_CENTS,
      transactionPriceFixed: DEAL_CENTS,
      status: 'active',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.contractId = ctr.id
  return 'contract:signed'
}

const bookCommission: ChainStepImpl = async (payload, ctx, state) => {
  await payload.create({
    collection: 'sales-commissions',
    data: {
      tenant: ctx.tenantId,
      reference: `COMM-${ts()}`,
      salesperson: ctx.userId,
      opportunity: state.opportunityId,
      contract: state.contractId,
      customer: ctx.customerId,
      closedWonDate: new Date().toISOString(),
      currency: 'EUR',
      commissionRule: { planName: 'Default 8%', ratePercent: COMMISSION_PERCENT },
      contractValue: DEAL_CENTS,
      commissionAmount: COMMISSION_CENTS,
      // 12-month contract → IFRS-15 §94 practical expedient: expense immediately.
      recognitionTreatment: 'expense_immediately',
      paymentStatus: 'pending',
      status: 'approved',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'commission:booked'
}

export const crmLeadToCashImpls: ChainImpls = [
  createLead, logActivity, qualifyMql, qualifySql, createOpp,
  closeWon, createCustomer, signContract, bookCommission,
]
