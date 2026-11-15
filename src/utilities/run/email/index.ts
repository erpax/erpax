import { deriveSecretFrom, internalSecretPurpose } from '@/utilities/nist/sp/800/108'

/**
 * THE EMAIL HANDLER — Cloudflare Email Routing calls the Worker's `email()` export for every message a
 * routing rule sends to it. This hands the raw message to Payload (`POST /api/messages/inbound`, see
 * src/utilities/email/inbound) over the Worker's own service binding, authenticated by a token derived
 * from PAYLOAD_SECRET — the same construction as the cron's, for its own purpose.
 *
 * A message to no mailbox is rejected (`setReject`, a permanent SMTP failure the sender sees as a
 * bounce). Any other failure throws, so Email Routing reports it instead of dropping the mail silently.
 *
 * @invariant an unset PAYLOAD_SECRET refuses rather than calling the endpoint unauthenticated
 * @invariant an unbound WORKER_SELF_REFERENCE refuses rather than reaching the public internet
 * @see https://developers.cloudflare.com/email-service/api/route-emails/email-handler/
 */

export interface EmailEnv {
  readonly PAYLOAD_SECRET?: string
  readonly WORKER_SELF_REFERENCE?: { fetch(input: string, init?: RequestInit): Promise<Response> }
}

/** The part of Cloudflare's ForwardableEmailMessage this uses. */
export interface InboundEmailLike {
  readonly from: string
  readonly to: string
  readonly raw: ReadableStream
  setReject(reason: string): void
}

export const INBOUND_URL = 'https://erpax.internal/api/messages/inbound'

export async function deliverInboundEmail(message: InboundEmailLike, env: EmailEnv): Promise<number> {
  const secret = deriveSecretFrom(env.PAYLOAD_SECRET, internalSecretPurpose.inboundEmail)
  if (!secret) throw new Error('[email] PAYLOAD_SECRET is unset — refusing to deliver unauthenticated')
  if (!env.WORKER_SELF_REFERENCE) throw new Error('[email] WORKER_SELF_REFERENCE is not bound — the message cannot be delivered')
  const res = await env.WORKER_SELF_REFERENCE.fetch(INBOUND_URL, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${secret}`,
      'content-type': 'message/rfc822',
      'x-envelope-from': message.from,
      'x-envelope-to': message.to,
    },
    body: await new Response(message.raw).arrayBuffer(),
  })
  const body = await res.text().catch(() => '')
  if (res.status === 404) {
    message.setReject(`No mailbox ${message.to}`)
    return res.status
  }
  if (!res.ok) throw new Error(`[email] messages/inbound responded ${res.status} ${body.slice(0, 200)}`)
  return res.status
}
