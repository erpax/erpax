import { describe, it, expect } from 'vitest'
import { MODALITIES, reachVia, equivalent, trustNative } from '@/agent/access'

describe('agent/access — the agent does everything via MCP and via fs', () => {
  it('the modalities are mcp and fs', () => {
    expect([...MODALITIES]).toEqual(['mcp', 'fs'])
  })
  it('MCP ≡ fs — same content reaches the same content-uuid (the modality is the path, not the identity)', () => {
    expect(reachVia('x', 'mcp')).toBe(reachVia('x', 'fs'))
    expect(equivalent('any content')).toBe(true)
    expect(reachVia('x', 'mcp')).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })
  it('different content reaches different uuids — genuinely content-addressed', () => {
    expect(reachVia('a', 'mcp')).not.toBe(reachVia('b', 'mcp'))
  })
  it('MCP is trust-native; fs is direct', () => {
    expect(trustNative('mcp')).toBe(true)
    expect(trustNative('fs')).toBe(false)
  })
})
