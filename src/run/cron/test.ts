import { describe, expect, it, vi } from 'vitest'

import { deriveSecretFrom, internalSecretPurpose } from '@/nist/sp/800/108'

import { type CronEnv, JOBS_RUN_URL, runScheduledJobs } from './index'

const MASTER = 'a-test-master-secret'
const ok = (status = 200) => ({ ok: status < 400, status, statusText: 'x' }) as Response
const binding = (res: Response) => ({ fetch: vi.fn().mockResolvedValue(res) })

describe('run/cron — the sweep that had no handler', () => {
  it('POSTs with the SAME token the endpoint derives — not a second construction', async () => {
    const self = binding(ok())
    const out = await runScheduledJobs({ PAYLOAD_SECRET: MASTER, WORKER_SELF_REFERENCE: self } as CronEnv)
    expect(out).toEqual({ ran: true, status: 200, ok: true })
    const [url, init] = self.fetch.mock.calls[0]!
    expect(url).toBe(JOBS_RUN_URL)
    expect(init.method).toBe('POST')
    // jobs.access.run compares against exactly this — if the two derivations ever diverged, the
    // cron would 401 on a schedule and nobody would be watching
    expect(init.headers.authorization).toBe(`Bearer ${deriveSecretFrom(MASTER, internalSecretPurpose.cron)}`)
  })

  it('REFUSES rather than calling unauthenticated when the secret is unset', async () => {
    const self = binding(ok())
    const log = vi.fn()
    const out = await runScheduledJobs({ WORKER_SELF_REFERENCE: self } as CronEnv, log)
    expect(out).toEqual({ ran: false, reason: 'no-secret' })
    expect(self.fetch).not.toHaveBeenCalled() // the important half: no request went out
    expect(log).toHaveBeenCalled()
  })

  it('REFUSES rather than reaching the public internet when the binding is missing', async () => {
    const log = vi.fn()
    const out = await runScheduledJobs({ PAYLOAD_SECRET: MASTER } as CronEnv, log)
    expect(out).toEqual({ ran: false, reason: 'no-binding' })
    expect(log).toHaveBeenCalled()
  })

  it('a non-2xx is REPORTED — a cron that fails quietly is the defect being closed', async () => {
    const log = vi.fn()
    const out = await runScheduledJobs(
      { PAYLOAD_SECRET: MASTER, WORKER_SELF_REFERENCE: binding(ok(500)) } as CronEnv,
      log,
    )
    expect(out).toEqual({ ran: true, status: 500, ok: false })
    expect(log).toHaveBeenCalledWith(expect.stringContaining('500'))
  })

  it('a 2xx is silent — only failures speak', async () => {
    const log = vi.fn()
    await runScheduledJobs({ PAYLOAD_SECRET: MASTER, WORKER_SELF_REFERENCE: binding(ok(202)) } as CronEnv, log)
    expect(log).not.toHaveBeenCalled()
  })
})

describe('run/cron — the wiring is real, not described', () => {
  it('worker.ts exports a scheduled handler that calls this atom', async () => {
    const { readFileSync } = await import('node:fs')
    const src = readFileSync(new URL('../../../worker.ts', import.meta.url), 'utf8')
    // the whole defect was a comment claiming a handler that did not exist, so the test reads the
    // wiring rather than the prose about it
    expect(src).toMatch(/async scheduled\(/)
    expect(src).toMatch(/runScheduledJobs\(env\)/)
    expect(src).toMatch(/from '@\/run\/cron'/)
  })
})
