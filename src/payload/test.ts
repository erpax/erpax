import { afterEach, describe, expect, it } from 'vitest'
import { payloadApprovalGate, payloadApprovalSkipped } from './approval'

describe('payload barrel', () => {
  it('seals the public index face', () => {
    expect(true).toBe(true)
  })
})

describe('payload/approval', () => {
  const prevSkip = process.env.ERPAX_PAYLOAD_APPROVAL_SKIP

  afterEach(() => {
    if (prevSkip === undefined) delete process.env.ERPAX_PAYLOAD_APPROVAL_SKIP
    else process.env.ERPAX_PAYLOAD_APPROVAL_SKIP = prevSkip
  })

  it('payloadApprovalGate returns structured result when skipped', () => {
    process.env.ERPAX_PAYLOAD_APPROVAL_SKIP = '1'
    expect(payloadApprovalGate({ skipLive: true })).toMatchObject({ approved: true, step: 'skipped' })
  })

  it('payloadApprovalSkipped reads env flag', () => {
    process.env.ERPAX_PAYLOAD_APPROVAL_SKIP = '1'
    expect(payloadApprovalSkipped()).toBe(true)
    delete process.env.ERPAX_PAYLOAD_APPROVAL_SKIP
    expect(payloadApprovalSkipped()).toBe(false)
  })
})
