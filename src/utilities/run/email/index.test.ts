import { describe, expect, it } from 'vitest'

import { deliverInboundEmail, INBOUND_URL } from '@/utilities/run/email'

const message = (rejected: string[]) => ({
  from: 'ann@customer.example',
  to: 'ceci@erpax.example',
  raw: new Response('Subject: hi\r\n\r\nhello').body!,
  setReject: (reason: string) => void rejected.push(reason),
})

describe('the Worker email() handler hands mail to Payload', () => {
  it('posts the raw message with its envelope and the derived token over the self binding', async () => {
    const calls: { url: string; init?: RequestInit }[] = []
    const env = { PAYLOAD_SECRET: 'master', WORKER_SELF_REFERENCE: { fetch: async (url: string, init?: RequestInit) => (calls.push({ url, init }), new Response('{}', { status: 201 })) } }
    await expect(deliverInboundEmail(message([]), env)).resolves.toBe(201)
    const headers = calls[0]!.init!.headers as Record<string, string>
    expect(calls[0]!.url).toBe(INBOUND_URL)
    expect(headers['x-envelope-to']).toBe('ceci@erpax.example')
    expect(headers.authorization).toMatch(/^Bearer [0-9a-f]{64}$/)
    expect(new TextDecoder().decode(calls[0]!.init!.body as ArrayBuffer)).toContain('hello')
  })

  it('rejects mail to no mailbox, and throws on any other failure', async () => {
    const rejected: string[] = []
    const answer = (status: number) => ({ PAYLOAD_SECRET: 'master', WORKER_SELF_REFERENCE: { fetch: async () => new Response('{}', { status }) } })
    await deliverInboundEmail(message(rejected), answer(404))
    expect(rejected).toEqual(['No mailbox ceci@erpax.example'])
    await expect(deliverInboundEmail(message([]), answer(500))).rejects.toThrow(/responded 500/)
  })

  it('refuses without a secret or without the self binding', async () => {
    await expect(deliverInboundEmail(message([]), {})).rejects.toThrow(/PAYLOAD_SECRET/)
    await expect(deliverInboundEmail(message([]), { PAYLOAD_SECRET: 'master' })).rejects.toThrow(/WORKER_SELF_REFERENCE/)
  })
})
