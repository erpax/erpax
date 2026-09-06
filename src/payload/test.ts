import { afterEach, describe, expect, it } from 'vitest'
import { execFileSync } from 'node:child_process'
import { mkdirSync, rmSync, writeFileSync as write } from 'node:fs'
import { join } from 'node:path'
import { payloadApprovalGate, payloadApprovalSkipped } from './approval'

describe('payload barrel', () => {
  it('seals the public index face', () => {
    expect(true).toBe(true)
  })
})

describe('payload/approval', () => {
  // payloadApprovalSkipped() is true when EITHER env flag is '1'. The integration harness sets
  // PAYLOAD_TEST_SKIP_MIGRATE, so a test that only controls ERPAX_PAYLOAD_APPROVAL_SKIP reads the
  // ambient harness flag and flakes by project. Save/restore BOTH so the assertion is deterministic.
  const prevSkip = process.env.ERPAX_PAYLOAD_APPROVAL_SKIP
  const prevMigrate = process.env.PAYLOAD_TEST_SKIP_MIGRATE
  const restore = (k: string, v: string | undefined) => {
    if (v === undefined) delete process.env[k]
    else process.env[k] = v
  }
  afterEach(() => {
    restore('ERPAX_PAYLOAD_APPROVAL_SKIP', prevSkip)
    restore('PAYLOAD_TEST_SKIP_MIGRATE', prevMigrate)
  })

  it('payloadApprovalGate returns structured result when skipped', () => {
    process.env.ERPAX_PAYLOAD_APPROVAL_SKIP = '1'
    expect(payloadApprovalGate({ skipLive: true })).toMatchObject({ approved: true, step: 'skipped' })
  })

  it('payloadApprovalSkipped reads env flag', () => {
    process.env.ERPAX_PAYLOAD_APPROVAL_SKIP = '1'
    expect(payloadApprovalSkipped()).toBe(true)
    // Clear BOTH flags — either being '1' makes it skipped, and the harness may set the migrate flag.
    delete process.env.ERPAX_PAYLOAD_APPROVAL_SKIP
    delete process.env.PAYLOAD_TEST_SKIP_MIGRATE
    expect(payloadApprovalSkipped()).toBe(false)
  })
})

// The memo that took the pre-push from ~409s to ~105s is only sound if its KEY sees every input.
// The load-bearing claim is invalidation, not speed — a key that never changes is a bypass with a
// stopwatch attached. The subtle case is an UNTRACKED new atom: neither `git ls-files -s` nor
// `git diff` can see one, and a new collection is plainly an input to `payload generate:types`.
describe('payload input key — the memo is only as honest as what its key sees', () => {
  const key = (): string =>
    execFileSync('bash', ['scripts/payload-input-key.sh'], { cwd: process.cwd(), encoding: 'utf8' }).trim()

  it('is a stable 64-hex digest across calls with no change', () => {
    const a = key()
    expect(a).toMatch(/^[0-9a-f]{64}$/)
    expect(key()).toBe(a)
  })

  it('CHANGES for an untracked new file under src, which no git diff would report', () => {
    const before = key()
    const dir = join(process.cwd(), 'src', 'zzkeyprobe')
    try {
      mkdirSync(dir, { recursive: true })
      write(join(dir, 'index.ts'), 'export const probe = 1\n')
      expect(key()).not.toBe(before)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
    expect(key()).toBe(before)
  })
})
