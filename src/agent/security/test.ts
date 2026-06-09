import { describe, it, expect, beforeEach } from 'vitest'
import { parseWithSecurity, resetSecurityMonitorForTests, isAllowlistedSource } from './index'
describe('agent/security', () => {
  beforeEach(() => resetSecurityMonitorForTests())
  it('blocks', () => expect(parseWithSecurity('{}', 'web:x', JSON.parse).allowed).toBe(false))
  it('allows', () => expect(parseWithSecurity('{}', 'corpus:local', JSON.parse).allowed).toBe(true))
  it('prefix', () => expect(isAllowlistedSource('corpus:local:x')).toBe(true))
})
