import PostalMime from 'postal-mime'
import type { Payload, PayloadRequest } from 'payload'

import { deriveSecretFromPayloadSecret, internalSecretPurpose } from '@/utilities/nist/sp/800/108'

/**
 * Inbound mail — Cloudflare Email Routing delivers a message to the Worker's `email()` handler, which
 * hands the raw message to `POST /api/messages/inbound` (worker.ts → src/utilities/run/email). This turns
 * it into a `messages` document for the user it is addressed to: `<username>@<domain>` or the user's own
 * address. A message to nobody is rejected at the door (the sender gets a bounce), so no mail is stored
 * without an owner; a message already stored (same Message-ID) is not stored twice; a reply joins its
 * thread through `In-Reply-To`.
 *
 * @rfc 5322 internet-message-format (Message-ID, In-Reply-To)
 * @rfc 8601 authentication-results
 * @see https://developers.cloudflare.com/email-service/api/route-emails/email-handler/
 */

export interface Envelope {
  from: string
  to: string
}

export interface InboundMail {
  from: string
  to: string
  subject: string
  body: string
  messageId?: string
  inReplyTo?: string
  /** Cloudflare's MX checked DMARC and it passed (its own Authentication-Results header, the first one). */
  authenticated: boolean
}

/**
 * DMARC passed at Cloudflare's MX. Only the FIRST Authentication-Results header is Cloudflare's (it
 * prepends it, authserv-id `mx.cloudflare.net`); later ones were supplied by the sender and prove nothing.
 */
export const dmarcPassed = (headers: readonly { key: string; value: string }[]): boolean => {
  const first = headers.find((h) => h.key.toLowerCase() === 'authentication-results')?.value ?? ''
  return /^\s*mx\.cloudflare\.net\s*;/i.test(first) && /\bdmarc=pass\b/i.test(first)
}

/**
 * A text body: the plain part, else the HTML reduced to text — style and script content dropped (end tags
 * matched with any whitespace), tags dropped, then every remaining angle bracket removed, so what is
 * left is text and can never be read as markup.
 */
export const textOf = (text: string | undefined, html: string | undefined): string =>
  text?.trim() ||
  (html ?? '')
    .replace(/<(style|script)\b[\s\S]*?<\/\1\s*>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

/** Parse a raw RFC 5322 message, addressed by its SMTP envelope. */
export const parseInbound = async (raw: string | ArrayBuffer, envelope: Envelope): Promise<InboundMail> => {
  const email = await PostalMime.parse(raw)
  return {
    from: envelope.from,
    to: envelope.to,
    subject: email.subject?.trim() || '(no subject)',
    body: textOf(email.text, email.html) || '(empty message)',
    ...(email.messageId ? { messageId: email.messageId } : {}),
    ...(email.inReplyTo ? { inReplyTo: email.inReplyTo } : {}),
    authenticated: dmarcPassed(email.headers),
  }
}

/** The recipient's mailbox: the full address and its local part (sub-addressing `+tag` dropped). */
export const mailboxOf = (to: string): { address: string; local: string } => {
  const address = to.trim().toLowerCase()
  return { address, local: (address.split('@')[0] ?? '').split('+')[0] ?? '' }
}

/** The internal token the email handler sends: derived from PAYLOAD_SECRET, like the cron's. */
export const inboundAuthorized = (authorization: string | null, secret = deriveSecretFromPayloadSecret(internalSecretPurpose.inboundEmail)): boolean =>
  Boolean(secret) && authorization === `Bearer ${secret}`

interface UserDoc {
  id: string
  tenants?: { tenant?: string | { id: string } | null }[] | null
}

const findUser = async (payload: Payload, to: string, req: PayloadRequest): Promise<UserDoc | undefined> => {
  const { address, local } = mailboxOf(to)
  const { docs } = await payload.find({
    collection: 'users',
    where: { or: [{ email: { equals: address } }, ...(local ? [{ username: { equals: local } }] : [])] },
    depth: 0,
    limit: 1,
    overrideAccess: true,
    req,
  })
  return docs[0] as UserDoc | undefined
}

const tenantOf = (user: UserDoc): string | undefined => {
  const tenant = user.tenants?.[0]?.tenant
  return typeof tenant === 'object' && tenant ? tenant.id : (tenant ?? undefined)
}

const messageWith = async (payload: Payload, messageId: string, req: PayloadRequest): Promise<string | undefined> => {
  const { docs } = await payload.find({ collection: 'messages', where: { 'email.messageId': { equals: messageId } }, depth: 0, limit: 1, overrideAccess: true, req })
  return (docs[0] as { id?: string } | undefined)?.id
}

/** `POST /api/messages/inbound` — the email handler's door into Payload. */
export const receiveInbound = async (req: PayloadRequest): Promise<Response> => {
  if (!inboundAuthorized(req.headers.get('authorization'))) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const envelope = { from: req.headers.get('x-envelope-from') ?? '', to: req.headers.get('x-envelope-to') ?? '' }
  const raw = (await req.text?.()) ?? ''
  if (!envelope.to || !raw) return Response.json({ error: 'An inbound message needs its envelope and its body.' }, { status: 400 })
  const mail = await parseInbound(raw, envelope)
  const user = await findUser(req.payload, envelope.to, req)
  if (!user) return Response.json({ error: `No mailbox ${envelope.to}` }, { status: 404 })
  if (mail.messageId) {
    const stored = await messageWith(req.payload, mail.messageId, req)
    if (stored) return Response.json({ id: stored, duplicate: true }, { status: 200 })
  }
  const parentMessage = mail.inReplyTo ? await messageWith(req.payload, mail.inReplyTo, req) : undefined
  const tenant = tenantOf(user)
  // a Local API call of its own (no `req`): the system files the mail, not the endpoint's anonymous
  // caller, so the multi-tenant plugin accepts the recipient's tenant
  const doc = await req.payload.create({
    collection: 'messages',
    overrideAccess: true,
    data: {
      ...(tenant ? { tenant } : {}),
      subject: mail.subject,
      body: mail.body,
      recipients: [user.id],
      ...(parentMessage ? { parentMessage } : {}),
      email: { from: mail.from, to: mail.to, messageId: mail.messageId, inReplyTo: mail.inReplyTo, authenticated: mail.authenticated },
    } as never,
  })
  return Response.json({ id: doc.id }, { status: 201 })
}
