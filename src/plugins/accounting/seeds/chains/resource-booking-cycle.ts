/**
 * Resource booking cycle — canonical seed (Slice ZZZZ).
 *
 * Bookable-resource catalogued → booking requested → confirmed →
 * checked-in → checked-out → invoice raised → payment received.
 *
 * Generic booking primitive — same chain serves hospitality, equipment
 * rental, meeting-room reservation, fleet, healthcare beds. The
 * `bookable-resources.kind` discriminator routes the domain semantics.
 *
 * @standard ISO-18513:2021 tourism-services-vocabulary
 * @standard IFRS-15 §35 over-time-recognition
 * @standard IFRS-15 §38 point-in-time-recognition
 * @standard rfc-5545 icalendar-rrule
 */

import type { ChainImpls, ChainStepImpl } from '@/services/business-chains/run-chain'

const ts = () => Date.now().toString(36)
const NIGHTS = 3
const RATE_PER_NIGHT_CENTS = 120_00
const SUBTOTAL = NIGHTS * RATE_PER_NIGHT_CENTS
const TAX = Math.round(SUBTOTAL * 0.20)            // 20% VAT
const TOTAL = SUBTOTAL + TAX

const ensureAddress = async (
  payload: Parameters<ChainStepImpl>[0],
  ctx: Parameters<ChainStepImpl>[1],
  state: Parameters<ChainStepImpl>[2],
): Promise<string> => {
  if (state.addressId) return state.addressId as string
  const a = await payload.create({
    collection: 'addresses',
    data: { tenant: ctx.tenantId, addressLine1: '1 Hotel Plaza', city: 'Sofia', postalCode: '1000', country: 'BG' } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.addressId = a.id
  return a.id
}

const catalogueResource: ChainStepImpl = async (payload, ctx, state) => {
  const r = await payload.create({
    collection: 'bookable-resources',
    data: {
      tenant: ctx.tenantId,
      code: `ROOM-${ts()}`,
      name: 'Chain Test Suite 201',
      kind: 'hotel_room',
      category: 'executive_suite',
      capacity: 2,
      unitOfCapacity: 'persons',
      rateBasis: 'per_night',
      currency: 'EUR',
      baseRate: RATE_PER_NIGHT_CENTS,
      country: 'BG',
      status: 'active',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.resourceId = r.id
  return 'resource:catalogued'
}

const requestBooking: ChainStepImpl = async (payload, ctx, state) => {
  const start = new Date(Date.now() + 7 * 86_400_000).toISOString()
  const end = new Date(Date.now() + (7 + NIGHTS) * 86_400_000).toISOString()
  const b = await payload.create({
    collection: 'bookings',
    data: {
      tenant: ctx.tenantId,
      reference: `BK-${ts()}`,
      resource: state.resourceId,
      guestType: 'customer',
      customer: ctx.customerId,
      guestName: 'Chain Test Guest',
      guestEmail: 'guest@chain.test',
      partySize: 2,
      startAt: start,
      endAt: end,
      channel: 'direct',
      rateApplied: RATE_PER_NIGHT_CENTS,
      unitsBilled: NIGHTS,
      subtotalAmount: SUBTOTAL,
      taxAmount: TAX,
      totalAmount: TOTAL,
      currency: 'EUR',
      cancellationPolicy: 'flex',
      status: 'requested',
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.bookingId = b.id
  return 'booking:requested'
}

const confirmBooking: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'bookings',
    id: state.bookingId as string,
    data: { status: 'confirmed' } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'booking:confirmed'
}

const checkIn: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'bookings',
    id: state.bookingId as string,
    data: { status: 'checked_in' } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'booking:checked_in'
}

const checkOut: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'bookings',
    id: state.bookingId as string,
    data: { status: 'checked_out' } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'booking:checked_out'
}

const invoiceBooking: ChainStepImpl = async (payload, ctx, state) => {
  const addressId = await ensureAddress(payload, ctx, state)
  const inv = await payload.create({
    collection: 'invoices',
    data: {
      tenant: ctx.tenantId,
      number: `INV-BK-${ts()}`,
      typeStatus: { invoiceType: 'invoice', invoiceTypeCode: '380', confirmed: true },
      status: 'active',
      parties: { seller: addressId, buyer: addressId },
      dates: {
        date: new Date().toISOString(),
        issuedAt: new Date().toISOString(),
        dueAt: new Date(Date.now() + 14 * 86_400_000).toISOString(),
      },
      amounts: {
        itemTotal: SUBTOTAL,
        netTotal: SUBTOTAL,
        taxTotal: TAX,
        totalAmount: TOTAL,
        totalDue: TOTAL,
      },
      billingTax: { currencyCode: 'EUR' },
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.invoiceId = inv.id
  return 'invoice:activated'
}

const payBooking: ChainStepImpl = async (payload, ctx, state) => {
  const addressId = await ensureAddress(payload, ctx, state)
  await payload.create({
    collection: 'payments',
    data: {
      tenant: ctx.tenantId,
      transactionNumber: `PMT-BK-${ts()}`,
      paymentKind: 'received',
      status: 'received',
      invoice: state.invoiceId,
      parties: { sender: addressId, receiver: addressId },
      amounts: { amount: TOTAL, currencyCode: 'EUR' },
      dates: { receivedAt: new Date().toISOString() },
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'payment:received'
}

export const resourceBookingCycleImpls: ChainImpls = [
  catalogueResource, requestBooking, confirmBooking, checkIn, checkOut,
  invoiceBooking, payBooking,
]
