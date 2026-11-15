import type { EmailAdapter, SendEmailOptions } from 'payload'

import { resolveEmailDefaultsForMessage } from '@/utilities/tenant/remote/secret'

/**
 * Cloudflare Email Service — Payload's email adapter over the Worker's `send_email` binding (`EMAIL`).
 *
 * Every mail Payload sends goes through it: the password reset (`forgot-password`), and anything a hook
 * sends with `payload.sendEmail`. The From address is the recipient's tenant's (`emailDefaultFromAddress`),
 * else `EMAIL_DEFAULT_FROM_ADDRESS`; either must be on a domain onboarded to Email Sending in the Cloudflare
 * dashboard (Compute → Email Service → Email Sending), or Cloudflare refuses it (`E_SENDER_NOT_VERIFIED`).
 * Under `wrangler dev` the binding is simulated: the mail is logged and saved, never sent.
 *
 * @rfc 5321 smtp envelope
 * @rfc 5322 internet-message-format
 * @rfc 6376 dkim (signed by Cloudflare)
 * @see https://developers.cloudflare.com/email-service/api/send-emails/workers-api/
 */

export interface EmailAddress {
  email: string
  name?: string
}

export interface CloudflareEmail {
  from: EmailAddress
  to: EmailAddress[]
  cc?: EmailAddress[]
  bcc?: EmailAddress[]
  replyTo?: EmailAddress
  subject: string
  html?: string
  text?: string
  headers?: Record<string, string>
  attachments?: { content: string | ArrayBufferView; filename: string; type: string; disposition: 'attachment' | 'inline'; contentId?: string }[]
}

/** The `send_email` binding (Cloudflare Email Service). */
export interface SendEmailBinding {
  send(message: CloudflareEmail): Promise<{ messageId: string }>
}

type Address = string | { name?: string; address?: string } | undefined | null

/** One address, from `addr`, `Name <addr>`, `"Name" <addr>` or nodemailer's `{ name, address }`. */
export const addressOf = (value: Address): EmailAddress | undefined => {
  if (!value) return undefined
  if (typeof value === 'object') return value.address?.includes('@') ? { email: value.address.trim(), ...(value.name ? { name: value.name } : {}) } : undefined
  const angled = value.match(/^\s*(?:"?([^"<]*?)"?\s*)?<([^>]*)>\s*$/)
  const email = (angled ? angled[2]! : value).trim()
  if (!email.includes('@')) return undefined
  return { email, ...(angled?.[1]?.trim() ? { name: angled[1].trim() } : {}) }
}

/** Every address in a nodemailer field: one address, a list, or a comma-separated string (commas inside quotes kept). */
export const addressesOf = (value: Address | Address[]): EmailAddress[] => {
  const items = Array.isArray(value) ? value : typeof value === 'string' ? value.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/) : [value]
  return items.map((item) => addressOf(item)).filter((a): a is EmailAddress => Boolean(a))
}

const bodyOf = (value: unknown): string | undefined => (value == null || value === '' ? undefined : typeof value === 'string' ? value : String(value))

/**
 * Payload's (nodemailer-shaped) message as the binding takes it. Payload stamps its own default From on
 * the mail it sends (the password reset), so a From equal to the platform default gives way to the
 * recipient tenant's address (`defaults`); any other From is kept.
 */
export const toCloudflareEmail = (
  message: SendEmailOptions,
  defaults: { address: string; name: string },
  platformFrom = process.env.EMAIL_DEFAULT_FROM_ADDRESS?.trim() || '',
): CloudflareEmail => {
  const given = addressOf(message.from as Address)
  const fallback = defaults.address.includes('@') ? { email: defaults.address, ...(defaults.name ? { name: defaults.name } : {}) } : undefined
  const from = given && given.email !== platformFrom ? given : (fallback ?? given)
  if (!from) throw new Error('No From address: set the tenant\'s email address or EMAIL_DEFAULT_FROM_ADDRESS, on a domain onboarded to Cloudflare Email Sending.')
  const list = (value: unknown) => {
    const addresses = addressesOf(value as Address | Address[])
    return addresses.length ? addresses : undefined
  }
  const replyTo = addressOf(message.replyTo as Address)
  type Attachment = { filename?: unknown; content?: unknown; contentType?: unknown; cid?: unknown }
  const attachments = ((Array.isArray(message.attachments) ? message.attachments : []) as Attachment[]).map((a) => ({
    content: (a.content ?? '') as string | ArrayBufferView,
    filename: String(a.filename ?? 'attachment'),
    type: String(a.contentType ?? 'application/octet-stream'),
    disposition: (a.cid ? 'inline' : 'attachment') as 'attachment' | 'inline',
    ...(a.cid ? { contentId: String(a.cid) } : {}),
  }))
  return {
    from,
    to: addressesOf(message.to as Address | Address[]),
    ...(list(message.cc) ? { cc: list(message.cc) } : {}),
    ...(list(message.bcc) ? { bcc: list(message.bcc) } : {}),
    ...(replyTo ? { replyTo } : {}),
    subject: String(message.subject ?? ''),
    ...(bodyOf(message.html) ? { html: bodyOf(message.html) } : {}),
    ...(bodyOf(message.text) ? { text: bodyOf(message.text) } : {}),
    ...(attachments.length ? { attachments } : {}),
  }
}

/** Payload's email adapter over the Worker's `EMAIL` binding, read when a mail is sent. */
export const cloudflareEmailAdapter =
  (binding: () => Promise<SendEmailBinding | undefined>): EmailAdapter =>
  ({ payload }) => ({
    name: 'cloudflare',
    defaultFromAddress: process.env.EMAIL_DEFAULT_FROM_ADDRESS?.trim() || '',
    defaultFromName: process.env.EMAIL_DEFAULT_FROM_NAME?.trim() || 'erpax',
    sendEmail: async (message) => {
      const email = await binding()
      if (!email) throw new Error('The Worker has no EMAIL binding (send_email in wrangler.jsonc).')
      const defaults = await resolveEmailDefaultsForMessage(payload, message)
      return email.send(toCloudflareEmail(message, defaults))
    },
  })
