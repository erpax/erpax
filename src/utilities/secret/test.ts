import fsExtra from 'node:fs'
import { describe, it, expect } from 'vitest'

import { dotenvValue, resolvePayloadSecret } from '@/utilities/secret'

describe('secret — PAYLOAD_SECRET, the one root secret', () => {
  it('reads PAYLOAD_SECRET from .env, ignoring comments and blank lines', () => {
    const tmp = `${process.env.TMPDIR ?? '/tmp'}/erpax-dotenv-${process.pid}.env`
    fsExtra.writeFileSync(tmp, '# a comment\n\nOTHER=x\nPAYLOAD_SECRET="from-the-file"\n')
    try {
      expect(dotenvValue('PAYLOAD_SECRET', tmp)).toBe('from-the-file')
      expect(dotenvValue('OTHER', tmp)).toBe('x')
      expect(dotenvValue('ABSENT', tmp)).toBeUndefined()
    } finally {
      fsExtra.unlinkSync(tmp)
    }
  })

  it('a missing file or an empty value is undefined, never a throw', () => {
    expect(dotenvValue('PAYLOAD_SECRET', '/no/such/file/.env')).toBeUndefined()
    const tmp = `${process.env.TMPDIR ?? '/tmp'}/erpax-dotenv-empty-${process.pid}.env`
    fsExtra.writeFileSync(tmp, 'PAYLOAD_SECRET=\n')
    try {
      expect(dotenvValue('PAYLOAD_SECRET', tmp)).toBeUndefined()
    } finally {
      fsExtra.unlinkSync(tmp)
    }
  })

  it('the real environment variable wins over the file', () => {
    const saved = process.env.PAYLOAD_SECRET
    process.env.PAYLOAD_SECRET = 'from-the-environment'
    try {
      expect(resolvePayloadSecret()).toBe('from-the-environment')
    } finally {
      if (saved === undefined) Reflect.deleteProperty(process.env, 'PAYLOAD_SECRET')
      else process.env.PAYLOAD_SECRET = saved
    }
  })
})
