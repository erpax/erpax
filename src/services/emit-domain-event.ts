/**
 * `emitDomainEvent` — DRY wrapper around `eventEmitter.emit(event)` that
 * collapses the try/catch + logger boilerplate every accounting hook had
 * to repeat (5 hooks today: invoice / bill / payment / inventory-movement
 * / depreciation, plus all the new bridge hooks added in Slice LLL).
 *
 * Pattern, learnt from the canonical `invoice.hook.ts`:
 *   1. Build a typed event object (per-hook, only the hook knows the
 *      payload shape).
 *   2. `await emitDomainEvent(req, event, label)` to send it; the helper
 *      does the try/catch + structured success/error logging.
 *
 * Standards backing inherited from the events themselves:
 * @rfc 9562 uuid event-id
 * @standard ISO-8601-1:2019 date-time event-timestamp
 * @audit ISO-19011:2018 audit-trail event-log
 * @compliance SOC-2 CC4.1 monitoring-and-evaluation
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §4.2
 */

import type { PayloadRequest } from 'payload'
import { eventEmitter } from './event-emitter.service'
import type { DomainEvent } from '@/types/events'

/**
 * Emit a domain event with structured success / error logging.
 *
 * @param req     Payload request — used for logger + tenant context.
 * @param event   Typed `DomainEvent` (any concrete sub-interface).
 * @param subject Short label for the log line — defaults to the event's
 *                aggregate id (e.g. invoice number, order id).
 */
export async function emitDomainEvent(
  req: Pick<PayloadRequest, 'payload'>,
  event: DomainEvent,
  subject?: string,
): Promise<void> {
  const label = subject ?? event.aggregateId
  try {
    await eventEmitter.emit(event)
    req.payload.logger.info(`✓ ${event.eventType} emitted for ${event.aggregateType} ${label}`)
  } catch (error) {
    req.payload.logger.error(
      { err: error },
      `✗ Error emitting ${event.eventType} for ${event.aggregateType} ${label}:`,
    )
  }
}
