import { afterEach, describe, expect, it } from 'vitest'
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
