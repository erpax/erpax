/**
 * IFRS-16 lease cycle — canonical seed (Slice XXXX rewrite).
 *
 * XXXX (2026-05-10): rewritten against the REAL Leases /
 * LeasePeriodPostings schemas:
 *   - Leases: `lessor` is a FK to `addresses` (NOT a free text string).
 *     `description` (NOT `assetDescription`). `leaseTermMonths` (NOT
 *     `termMonths`).
 *   - LeasePeriodPostings: requires `postingId` + `periodStart` +
 *     `periodEnd`; uses `interest`/`cashPayment` (NOT
 *     `interestExpense`/`paymentMade`); has NO `period`/`periodIndex`
 *     FK fields.
 *
 * @standard IFRS-16 §22 commencement + §44-46 modifications
 * @standard ASC 842
 */

import type { ChainImpls, ChainStepImpl } from '@/services/business-chains/run-chain'

const ts = () => Date.now().toString(36)
const FIXED_PAYMENT_CENTS = 1_000_00 // €1000/mo
const TERM_MONTHS = 36
const DISCOUNT_RATE = 0.045

const commence: ChainStepImpl = async (payload, ctx, state) => {
  // Lessor FK → ecommerce-plugin `addresses`. Seed inline.
  const lessorAddr = await payload.create({
    collection: 'addresses',
    data: {
      tenant: ctx.tenantId,
      addressLine1: '1 Chain Lessor Plaza',
      city: 'Sofia',
      postalCode: '1000',
      country: 'BG',
      company: 'Chain Test Lessor',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.lessorAddressId = lessorAddr.id
  const lease = await payload.create({
    collection: 'leases',
    data: {
      tenant: ctx.tenantId,
      leaseNumber: `LEASE-CHAIN-${ts()}`,
      lessor: lessorAddr.id,
      description: 'Office space — chain test',
      classification: 'finance',
      underlyingAssetCategory: 'real_estate',
      commencementDate: new Date('2026-01-01').toISOString(),
      leaseTermMonths: TERM_MONTHS,
      fixedPayment: FIXED_PAYMENT_CENTS,
      paymentFrequency: 'monthly',
      paymentTiming: 'in_arrears',
      discountRateBasis: 'incremental_borrowing_rate',
      discountRatePercent: DISCOUNT_RATE * 100,
      currency: 'EUR',
      status: 'active',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.leaseId = lease.id
  return 'lease:commenced'
}

const postPeriod: ChainStepImpl = async (payload, ctx, state) => {
  await payload.create({
    collection: 'lease-period-postings',
    data: {
      tenant: ctx.tenantId,
      postingId: `LPP-CHAIN-${ts()}-04`,
      lease: state.leaseId,
      periodStart: new Date('2026-04-01').toISOString(),
      periodEnd: new Date('2026-04-30').toISOString(),
      interest: 3_750,                                          // monthly interest
      principalRepayment: FIXED_PAYMENT_CENTS - 3_750,
      cashPayment: FIXED_PAYMENT_CENTS,
      rouAmortisation: FIXED_PAYMENT_CENTS - 3_750,
      currency: 'EUR',
      status: 'posted',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'lpp:posted'
}

const remeasure: ChainStepImpl = async (payload, ctx, state) => {
  const mod = await payload.create({
    collection: 'lease-modifications',
    data: {
      tenant: ctx.tenantId,
      reference: `LMOD-CHAIN-${ts()}`,
      lease: state.leaseId,
      modificationDate: new Date('2026-04-15').toISOString(),
      modificationKind: 'payment_change',
      classification: 'not_separate_other',
      currency: 'EUR',
      preModification: {
        remainingTermMonths: 32,
        discountRate: DISCOUNT_RATE,
        fixedPayment: FIXED_PAYMENT_CENTS,
        liabilityCarryingAmount: 30_000_00,
        rouCarryingAmount: 30_000_00,
      },
      postModification: {
        newTermMonths: 32,
        newDiscountRate: 0.05,
        newFixedPayment: FIXED_PAYMENT_CENTS + 50_00,
        newPaymentFrequency: 'monthly',
      },
      liabilityRemeasurement: 1_000_00,
      rouAdjustment: 1_000_00,
      gainLossOnModification: 0,
      status: 'posted',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.modificationId = mod.id
  return 'lease:remeasured'
}

const postPeriodAfterMod: ChainStepImpl = async (payload, ctx, state) => {
  await payload.create({
    collection: 'lease-period-postings',
    data: {
      tenant: ctx.tenantId,
      postingId: `LPP-CHAIN-${ts()}-05`,
      lease: state.leaseId,
      periodStart: new Date('2026-05-01').toISOString(),
      periodEnd: new Date('2026-05-31').toISOString(),
      interest: 4_000,
      principalRepayment: (FIXED_PAYMENT_CENTS + 50_00) - 4_000,
      cashPayment: FIXED_PAYMENT_CENTS + 50_00,
      rouAmortisation: (FIXED_PAYMENT_CENTS + 50_00) - 4_000,
      currency: 'EUR',
      status: 'posted',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'lpp:posted'
}

const terminate: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'leases',
    id: state.leaseId as string,
    data: { status: 'terminated', terminationDate: new Date().toISOString() } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'lease:terminated'
}

export const ifrs16LeaseCycleImpls: ChainImpls = [
  commence, postPeriod, remeasure, postPeriodAfterMod, terminate,
]
