import { describe, it, expect } from 'vitest'
import {
  identifyAny,
  UUID_V8_RE, JWS_RE, DID_RE, SHORT_UUID_RE,
} from '@/identification'
import type { IdentifyContext } from '@/identification'

// One input → one resolver. The exported regexes are the public identifier
// grammar; callers reuse them for client-side hints, so they must be exact.
describe('identification — identifier grammar (the typed case of multi-search)', () => {
  it('UUID_V8_RE matches a 36-char RFC 9562 §5.8 uuid only', () => {
    expect(UUID_V8_RE.test('0192a7b3-4c5d-8e6f-9a0b-1c2d3e4f5a6b')).toBe(true)
    // version nibble must be 8
    expect(UUID_V8_RE.test('0192a7b3-4c5d-4e6f-9a0b-1c2d3e4f5a6b')).toBe(false)
    expect(UUID_V8_RE.test('not-a-uuid')).toBe(false)
  })

  it('JWS_RE matches exactly 3 base64url segments', () => {
    expect(JWS_RE.test('aGVhZGVy.cGF5bG9hZA.c2ln')).toBe(true)
    expect(JWS_RE.test('only.two')).toBe(false)
    expect(JWS_RE.test('a.b.c.d')).toBe(false)
  })

  it('DID_RE matches the did:erpax: prefix', () => {
    expect(DID_RE.test('did:erpax:t1:0192a7b3-4c5d-8e6f-9a0b-1c2d3e4f5a6b')).toBe(true)
    expect(DID_RE.test('did:web:example.com')).toBe(false)
  })

  it('SHORT_UUID_RE matches a 3-char prefix + hex body', () => {
    expect(SHORT_UUID_RE.test('aud_a1b2c3d4')).toBe(true)
    expect(SHORT_UUID_RE.test('audit_a1b2')).toBe(false) // prefix must be 3 chars
    expect(SHORT_UUID_RE.test('aud_xyz')).toBe(false)    // body must be hex
  })
})

// resolveAny is deterministic at the boundaries: empty + unmatched queries
// resolve to 'unknown' with no db access (escalate to multi-search).
describe('identification — identifyAny boundary rules', () => {
  const ctx = { payload: {} as never, tenantId: 't1' } as IdentifyContext

  it('an empty / whitespace query is unknown with no row', async () => {
    const res = await identifyAny('   ', ctx)
    expect(res.kind).toBe('unknown')
    expect(res.row).toBeNull()
    expect(res.matchedRule).toBe('empty-query')
  })

  it('a free-text query with no collection hint matches no rule (escalate)', async () => {
    const res = await identifyAny('just some free text', ctx)
    expect(res.kind).toBe('unknown')
    expect(res.row).toBeNull()
    expect(res.matchedRule).toBe('no-rule-matched')
  })
})
