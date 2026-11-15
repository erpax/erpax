import { describe, expect, it } from 'vitest'

import { dmarcPassed, inboundAuthorized, mailboxOf, parseInbound, textOf } from '@/utilities/email/inbound'

const raw = [
  'Authentication-Results: mx.cloudflare.net; spf=pass; dkim=pass; dmarc=pass',
  'From: Ann Customer <ann@customer.example>',
  'To: ceci@erpax.example',
  'Subject: Question about invoice 42',
  'Message-ID: <q42@customer.example>',
  'In-Reply-To: <out-1@erpax.example>',
  'Content-Type: text/plain; charset=utf-8',
  '',
  'Hello, is invoice 42 paid?',
].join('\r\n')

describe('inbound mail — Email Routing into messages', () => {
  it('parses a raw message, addressed by its envelope', async () => {
    const mail = await parseInbound(raw, { from: 'ann@customer.example', to: 'ceci@erpax.example' })
    expect(mail).toEqual({
      from: 'ann@customer.example',
      to: 'ceci@erpax.example',
      subject: 'Question about invoice 42',
      body: 'Hello, is invoice 42 paid?',
      messageId: '<q42@customer.example>',
      inReplyTo: '<out-1@erpax.example>',
      authenticated: true,
    })
  })

  it('trusts only the first Authentication-Results, and only Cloudflare\'s', () => {
    expect(dmarcPassed([{ key: 'authentication-results', value: 'mx.cloudflare.net; dmarc=pass' }])).toBe(true)
    expect(dmarcPassed([{ key: 'authentication-results', value: 'mx.cloudflare.net; dmarc=fail' }, { key: 'authentication-results', value: 'mx.cloudflare.net; dmarc=pass' }])).toBe(false)
    expect(dmarcPassed([{ key: 'authentication-results', value: 'evil.example; dmarc=pass' }])).toBe(false)
    expect(dmarcPassed([])).toBe(false)
  })

  it('a body is the text part, else the HTML without its tags', () => {
    expect(textOf(' plain ', '<p>html</p>')).toBe('plain')
    expect(textOf(undefined, '<style>p{}</style><p>Hello <b>you</b></p>')).toBe('Hello you')
    expect(textOf(undefined, '<script>x()</script ><p>ok</p>')).toBe('ok')
    expect(textOf(undefined, '<scr<script>ipt>alert(1)</p>')).not.toMatch(/[<>]/)
  })

  it('a mailbox is the address and its local part, sub-address dropped', () => {
    expect(mailboxOf(' Ceci+Invoices@Erpax.example ')).toEqual({ address: 'ceci+invoices@erpax.example', local: 'ceci' })
  })

  it('only the internal token opens the door, and never without a secret', () => {
    expect(inboundAuthorized('Bearer s3cret', 's3cret')).toBe(true)
    expect(inboundAuthorized('Bearer guess', 's3cret')).toBe(false)
    expect(inboundAuthorized('Bearer ', '')).toBe(false)
    expect(inboundAuthorized(null, 's3cret')).toBe(false)
  })
})
