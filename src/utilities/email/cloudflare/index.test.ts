import { describe, expect, it } from 'vitest'

import { addressOf, addressesOf, cloudflareEmailAdapter, toCloudflareEmail } from '@/utilities/email/cloudflare'

const defaults = { address: 'noreply@tenant.example', name: 'Tenant' }

describe('cloudflare email — Payload mail over the send_email binding', () => {
  it('reads every address form nodemailer allows, and refuses what is not an address', () => {
    expect(addressOf('a@x.example')).toEqual({ email: 'a@x.example' })
    expect(addressOf('Ann <a@x.example>')).toEqual({ email: 'a@x.example', name: 'Ann' })
    expect(addressOf('"Ann, B" <a@x.example>')).toEqual({ email: 'a@x.example', name: 'Ann, B' })
    expect(addressOf({ name: 'Ann', address: 'a@x.example' })).toEqual({ email: 'a@x.example', name: 'Ann' })
    expect(addressOf('"erpax" <>')).toBeUndefined()
    expect(addressesOf('a@x.example, "B, C" <b@x.example>')).toEqual([{ email: 'a@x.example' }, { email: 'b@x.example', name: 'B, C' }])
  })

  it('a password reset stamped with the platform From goes out from the tenant address', () => {
    const mail = toCloudflareEmail({ from: '"erpax" <noreply@platform.example>', to: 'user@x.example', subject: 'Reset your password', html: '<a href="/reset">reset</a>' }, defaults, 'noreply@platform.example')
    expect(mail).toEqual({ from: { email: 'noreply@tenant.example', name: 'Tenant' }, to: [{ email: 'user@x.example' }], subject: 'Reset your password', html: '<a href="/reset">reset</a>' })
  })

  it('keeps an explicit From, and maps cc, bcc, reply-to and attachments', () => {
    const mail = toCloudflareEmail(
      { from: 'billing@tenant.example', to: ['a@x.example'], cc: 'c@x.example', bcc: ['d@x.example'], replyTo: 'r@x.example', subject: 'Invoice', text: 'attached', attachments: [{ filename: 'i.pdf', content: 'JVBERi0=', contentType: 'application/pdf' }] },
      defaults,
      'noreply@platform.example',
    )
    expect(mail.from).toEqual({ email: 'billing@tenant.example' })
    expect(mail).toMatchObject({ cc: [{ email: 'c@x.example' }], bcc: [{ email: 'd@x.example' }], replyTo: { email: 'r@x.example' }, text: 'attached' })
    expect(mail.attachments).toEqual([{ content: 'JVBERi0=', filename: 'i.pdf', type: 'application/pdf', disposition: 'attachment' }])
  })

  it('says what to configure when there is no From address at all', () => {
    expect(() => toCloudflareEmail({ to: 'a@x.example', subject: 's' }, { address: '', name: '' }, '')).toThrow(/EMAIL_DEFAULT_FROM_ADDRESS/)
  })

  it('sends through the binding, and refuses without one', async () => {
    const sent: unknown[] = []
    const payload = { find: async () => ({ docs: [] }) } as never
    const adapter = cloudflareEmailAdapter(async () => ({ send: async (m) => (sent.push(m), { messageId: 'm-1' }) }))({ payload })
    expect(adapter.name).toBe('cloudflare')
    await expect(adapter.sendEmail({ from: 'a@platform.example', to: 'u@x.example', subject: 'Hi', text: 'hello' })).resolves.toEqual({ messageId: 'm-1' })
    expect(sent).toHaveLength(1)
    const unbound = cloudflareEmailAdapter(async () => undefined)({ payload })
    await expect(unbound.sendEmail({ from: 'a@platform.example', to: 'u@x.example', subject: 'Hi' })).rejects.toThrow(/EMAIL binding/)
  })
})
