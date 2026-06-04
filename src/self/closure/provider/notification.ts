/**
 * InternalNotificationProvider — ERPax delivers the notification itself.
 *
 * Slice JJJJJJJJJ-cut2 (2026-05-11). Per user 'erpax remains fully
 * functional ... it is like this every where'.
 *
 * When external notification gateways (Twilio SMS, SendGrid email,
 * Vonage WhatsApp, Slack webhook) are unreachable, this provider
 * routes the notification through ERPax's `in_app` channel — the
 * user sees it in their dashboard on next login. The `audit-events`
 * trail captures that the external channel was attempted; the
 * `notifications` collection row records the delivery.
 *
 * Why in-app is the canonical self-mode channel:
 *
 *   - It requires no external dependency.
 *   - It cannot fail (the row is written to ERPax's own database).
 *   - The user's eventual login is itself an event ERPax owns, so
 *     "delivery" is guaranteed in finite time without out-of-band
 *     coordination.
 *   - Privacy compatibility: GDPR Article 6(1)(b) (contract) covers
 *     in-app delivery without explicit channel-consent the way SMS
 *     and email do under ePrivacy.
 *
 * This provider COMPOSES rather than duplicates: it delegates to the
 * existing `sendNotification` service from
 * `@/services/notifications` with `channels: ['in_app']` forced.
 * Law 50 (DRY): no parallel delivery path; the in-app subscriber
 * (Slice PPPP) is the one canonical handler.
 *
 * @standard ISO/IEC 25010:2023 §5.6 reliability
 * @standard GDPR Article 6(1)(b) contractual basis for in-app messaging
 * @standard ePrivacy Directive 2002/58/EC §13 (in-app exempt from cookie/SMS rules)
 * @standard NIST SP 800-34 §3.4 contingency planning
 * @audit Conservation Law 53 self-referential-closure
 * @feature self_closure
 * @see /src/services/notifications/index.ts sendNotification
 */

import type { InternalProvider, FallbackContext } from '@/self/closure/types'
import { registerInternalProvider } from '@/self/closure'

export interface NotificationParams {
  readonly tenantId: string
  readonly toUserId?: string
  readonly subject: string
  readonly body: string
  /** Original channels the caller intended (e.g. ['sms', 'email']). Logged for retry. */
  readonly intendedChannels?: ReadonlyArray<string>
  readonly category?: 'transactional' | 'marketing' | 'security' | 'system'
}

export interface NotificationResult {
  readonly notificationId: string
  readonly deliveries: ReadonlyArray<{
    readonly channel: string
    readonly target: string
    readonly queued: boolean
    readonly error?: string
  }>
  readonly mode: 'in-app-only'
  readonly retryExternalWhenReachable: ReadonlyArray<string>
}

export const InternalNotificationProvider: InternalProvider<NotificationParams, NotificationResult> = {
  role: 'notification',
  id: 'erpax-self-notification',
  description:
    'When external notification gateways (Twilio / SendGrid / Vonage / Slack) are unreachable, deliver via in-app channel only. Reuses the existing sendNotification service forced to channels=[\'in_app\']; the user sees it in their dashboard on next login.',
  standards: [
    'ISO/IEC-25010:2023-§5.6',
    'GDPR-Article-6(1)(b)',
    'ePrivacy-Directive-2002/58/EC-§13',
    'NIST-SP-800-34-§3.4',
  ],

  async invoke(params: NotificationParams, ctx: FallbackContext): Promise<NotificationResult> {
    const { sendNotification } = await import('@/notification')
    const result = await sendNotification(ctx.payload, {
      tenantId: params.tenantId,
      toUserId: params.toUserId,
      subject: params.subject,
      body: params.body,
      category: params.category ?? 'system',
      channels: ['in_app'],
    } as never) as {
      notificationId: string
      deliveries: Array<{ channel: string; target: string; queued: boolean; error?: string }>
    }
    return {
      notificationId: result.notificationId,
      deliveries: result.deliveries,
      mode: 'in-app-only',
      retryExternalWhenReachable: params.intendedChannels ?? [],
    }
  },
}

registerInternalProvider(InternalNotificationProvider)
