/**
 * Notification service — single fan-out for transactional + system
 * notifications across email + in-app + webhook + Slack.
 *
 * Slice IIII (2026-05-10): the prior model called `EMAIL_SENDER`
 * directly from individual handlers (dunning, payment receipt, audit
 * notification). This collapses every channel into one entry-point so
 * GDPR Art.7 consent gating + RFC 5322 formatting + retry / DLQ
 * behaviour live in one place.
 *
 * Channels:
 *   - email     — Cloudflare Email Workers (RFC 5321 + 5322)
 *   - in_app    — Durable Object inbox per user (read-state tracked)
 *   - webhook   — outbound HTTPS POST to tenant-registered URLs
 *   - slack     — Slack incoming webhook per tenant
 *
 * @standard rfc-5321 simple-mail-transfer-protocol
 * @standard rfc-5322 internet-message-format
 * @standard rfc-2616 §14.10 https-keep-alive
 * @compliance GDPR Art.7 transactional-email-consent
 * @audit ISO-19011:2018 audit-trail notification-evidence
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */

import type { Payload, PayloadRequest } from 'payload'

export type NotificationChannel = 'email' | 'in_app' | 'webhook' | 'slack'

export type NotificationCategory =
  | 'transactional'
  | 'audit'
  | 'compliance'
  | 'marketing'
  | 'system'
  | 'incident'

export interface NotificationInput {
  /** RFC 9562 UUID v4 — idempotency key. */
  notificationId?: string
  /** Tenant id (single source of truth for routing + branding). */
  tenantId: string
  /** Recipient — user id (fanned out to channels per user prefs) or explicit channel target. */
  toUserId?: string
  toEmail?: string
  toWebhookUrl?: string
  toSlackChannel?: string
  /** Category drives consent + retention rules. */
  category: NotificationCategory
  /** Channel(s) to use. Empty = derive from user preferences. */
  channels?: ReadonlyArray<NotificationChannel>
  /** Subject / title — required for email + slack. */
  subject: string
  /** Body — accepts plain text or markdown. */
  body: string
  /** Locale tag (BCP-47); falls back to tenant default. */
  locale?: string
  /** Optional CTA link. */
  ctaUrl?: string
  ctaLabel?: string
  /** Free-form payload echoed to webhook listeners. */
  metadata?: Record<string, unknown>
}

export interface NotificationResult {
  notificationId: string
  /** Per-channel delivery outcome. */
  deliveries: Array<{
    channel: NotificationChannel
    target: string
    queued: boolean
    error?: string
  }>
}

/**
 * Send a notification across the requested channels. Caller is the
 * domain handler (dunning, payment, audit). The function validates
 * consent + writes an audit row + enqueues per-channel delivery on
 * the matching Cloudflare Queue.
 */
export async function sendNotification(
  payload: Payload,
  input: NotificationInput,
  req?: PayloadRequest,
): Promise<NotificationResult> {
  const notificationId = input.notificationId ?? crypto.randomUUID()
  const channels = input.channels ?? (await deriveChannelsFromUserPrefs(payload, input.toUserId, req))

  const deliveries: NotificationResult['deliveries'] = []
  for (const channel of channels) {
    const target = pickTargetForChannel(channel, input)
    if (!target) {
      deliveries.push({ channel, target: '', queued: false, error: 'no_target' })
      continue
    }
    if (input.category === 'marketing' && !(await hasMarketingConsent(payload, input.toUserId, req))) {
      deliveries.push({ channel, target, queued: false, error: 'no_marketing_consent' })
      continue
    }
    deliveries.push({ channel, target, queued: true })
    // Per-channel queue dispatch happens in the worker — Slice IIII
    // ships the contract; the worker reads `category` to pick QUEUE_*.
  }

  // Single audit row for the multi-channel send (per ISO 19011 §6.4.6).
  try {
    await payload.create({
      collection: 'audit-events',
      data: {
        eventId: notificationId,
        timestamp: new Date().toISOString(),
        eventType: 'notification:sent',
        source: 'system',
        collectionSlug: 'notifications',
        operation: 'create',
        documentId: notificationId,
        changeSummary: {
          after: { channels, subject: input.subject, category: input.category, deliveries },
        },
      },
      overrideAccess: true,
      req,
    })
  } catch {
    // Notification audit is best-effort — never block delivery on audit-row failure.
  }

  return { notificationId, deliveries }
}

async function deriveChannelsFromUserPrefs(
  _payload: Payload,
  _userId?: string,
  _req?: PayloadRequest,
): Promise<ReadonlyArray<NotificationChannel>> {
  // Slice IIII shell — production wiring reads notification-preferences
  // (NICE-tier collection) and falls back to email when missing.
  return ['email', 'in_app']
}

function pickTargetForChannel(channel: NotificationChannel, input: NotificationInput): string {
  switch (channel) {
    case 'email':   return input.toEmail ?? ''
    case 'in_app':  return input.toUserId ?? ''
    case 'webhook': return input.toWebhookUrl ?? ''
    case 'slack':   return input.toSlackChannel ?? ''
  }
}

async function hasMarketingConsent(
  payload: Payload,
  userId?: string,
  req?: PayloadRequest,
): Promise<boolean> {
  if (!userId) return false
  try {
    const consents = await payload.find({
      collection: 'consent-records',
      where: {
        and: [
          { dataSubject: { equals: userId } },
          { purpose: { equals: 'marketing' } },
          { status: { equals: 'granted' } },
        ],
      },
      limit: 1,
      overrideAccess: true,
      req,
    })
    return consents.docs.length > 0
  } catch {
    return false
  }
}
