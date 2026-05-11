/**
 * Notification subscriber — Slice PPPP (2026-05-10).
 *
 * Closes the gap between the domain-event bus (`eventEmitter`) and the
 * notification fan-out (`sendNotification`). Each subscribed event maps
 * to one `NotificationInput` template; the template renders subject +
 * body + CTA per event payload, and the channel set is derived from
 * the event's category.
 *
 * Subscriptions are declarative — to add a new event-driven
 * notification, append a row to `EVENT_NOTIFICATIONS` (no new code).
 *
 * @standard rfc-5321 simple-mail-transfer-protocol
 * @standard rfc-5322 internet-message-format
 * @compliance GDPR Art.7 transactional-consent
 * @audit ISO-19011:2018 §6.4.6 audit-evidence-notification
 */

import type { Payload, PayloadRequest } from 'payload'
import type { DomainEvent } from '@/types/events'
import { eventEmitter, type EventEmitterService } from '@/services/event-emitter.service'
import { sendNotification, type NotificationCategory, type NotificationChannel } from './index'

interface NotificationTemplate {
  /** Domain event id (e.g. `invoice:activated`). */
  readonly eventType: string
  /** Notification category — drives consent + retention. */
  readonly category: NotificationCategory
  /** Default channels (per-tenant prefs override at fan-out). */
  readonly channels: ReadonlyArray<NotificationChannel>
  /** Subject template — `{{...}}` interpolation against event.payload. */
  readonly subject: (e: DomainEvent) => string
  /** Body template — same. */
  readonly body: (e: DomainEvent) => string
  /** Optional CTA URL builder. */
  readonly ctaUrl?: (e: DomainEvent) => string | undefined
  readonly ctaLabel?: string
}

/** Declarative subscription map — append entries to add new event-driven notifications. */
export const EVENT_NOTIFICATIONS: ReadonlyArray<NotificationTemplate> = [
  {
    eventType: 'invoice:activated',
    category: 'transactional',
    channels: ['email', 'in_app'],
    subject: (e) => `Invoice ${(e.payload as { invoiceId?: string }).invoiceId ?? ''} issued`,
    body:    (e) => `Invoice ${(e.payload as { invoiceId?: string }).invoiceId ?? ''} has been issued.`,
  },
  {
    eventType: 'invoice:completed',
    category: 'transactional',
    channels: ['email', 'in_app'],
    subject: (e) => `Payment received for invoice ${(e.payload as { invoiceId?: string }).invoiceId ?? ''}`,
    body:    (e) => `We've received payment for invoice ${(e.payload as { invoiceId?: string }).invoiceId ?? ''}. Thank you.`,
  },
  {
    eventType: 'bill:activated',
    category: 'transactional',
    channels: ['in_app'],
    subject: (e) => `Bill received: ${(e.payload as { billId?: string }).billId ?? ''}`,
    body:    (e) => `A new vendor bill has been received and requires approval.`,
  },
  {
    eventType: 'bill:paid',
    category: 'transactional',
    channels: ['email', 'in_app'],
    subject: (e) => `Bill paid: ${(e.payload as { billId?: string }).billId ?? ''}`,
    body:    (e) => `Vendor bill payment has been sent.`,
  },
  {
    eventType: 'subscription:invoiced',
    category: 'transactional',
    channels: ['email'],
    subject: ()  => `Your subscription invoice is ready`,
    body:    ()  => `Your subscription invoice for the current period is now available.`,
  },
  {
    eventType: 'subscription:refunded',
    category: 'transactional',
    channels: ['email', 'in_app'],
    subject: ()  => `Refund processed`,
    body:    ()  => `A refund has been processed against your subscription.`,
  },
  {
    eventType: 'milestone:achieved',
    category: 'transactional',
    channels: ['email', 'in_app'],
    subject: (e) => `Project milestone achieved`,
    body:    (e) => `Milestone for project ${(e.payload as { projectId?: string }).projectId ?? ''} has been achieved.`,
  },
  {
    eventType: 'lease:remeasured',
    category: 'audit',
    channels: ['in_app'],
    subject: ()  => `Lease modification posted`,
    body:    ()  => `A lease modification has been posted; finance review recommended.`,
  },
  {
    eventType: 'sanctions:screened',
    category: 'compliance',
    channels: ['in_app'],
    subject: ()  => `Sanctions screening complete`,
    body:    ()  => `KYC sanctions screening has completed; results require human review.`,
  },
  {
    eventType: 'workflow:finalised',
    category: 'transactional',
    channels: ['email', 'in_app'],
    subject: ()  => `Workflow approval completed`,
    body:    ()  => `A workflow you submitted has reached its final outcome.`,
  },
]

/**
 * Wire the notification subscriber to the global event emitter. Idempotent
 * — calling twice does not double-subscribe (uses an internal flag).
 */
let wired = false
export function wireNotificationSubscriber(
  payload: Payload,
  emitter: EventEmitterService = eventEmitter,
  req?: PayloadRequest,
): void {
  if (wired) return
  wired = true
  for (const tpl of EVENT_NOTIFICATIONS) {
    emitter.subscribe(tpl.eventType, async (event) => {
      try {
        await sendNotification(
          payload,
          {
            tenantId: event.tenantId,
            category: tpl.category,
            channels: tpl.channels,
            subject: tpl.subject(event),
            body: tpl.body(event),
            ctaUrl: tpl.ctaUrl?.(event),
            ctaLabel: tpl.ctaLabel,
            metadata: { sourceEvent: event.eventType, sourceId: event.aggregateId },
          },
          req,
        )
      } catch {
        // best-effort — never let notification failure cascade to GL posting
      }
    })
  }
}

/** Reset for tests. */
export function _resetNotificationSubscriber(): void {
  wired = false
}
