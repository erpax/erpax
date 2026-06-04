/**
 * uuid/llm — the INHALE proven. A uuid expands into its whole LLM prompt frame
 * (identity + color+sound + corpus neighbourhood), self-decoding, no payload.
 * The last case closes the breath sequence: what `src/llm/uuid` exhales, this
 * inhales — the contentDigest the forge sealed is the one this frame reads.
 * @see ./index · ../../llm/uuid
 */
import { describe, it, expect } from 'vitest'
import { expand, horoStepOf } from './index'
import { forge } from '@/llm/uuid'
import { isHoroStep, HORO_DIGITS } from '@/services/horo'
import { UUID_MATRIX_NODES } from '@/services/uuid-matrix'

const T = 'tenant-1'
const NON_V8 = '11111111-1111-4111-8111-111111111111' // version nibble = 4

describe('uuid/llm: the inhale — a uuid IS the prompt, self-decoding', () => {
  it('horoStepOf is always an on-ring measure position (no 3/6 escape) and deterministic', () => {
    const u = forge({ role: 'user', content: 'where on the ring?' }, T).uuid
    const step = horoStepOf(u)
    expect(isHoroStep(step)).toBe(true)
    expect(HORO_DIGITS).toContain(step)
    expect(horoStepOf(u)).toBe(step)
  })

  it('wires the color+sound channel the signal twin documents — every uuid sounds', () => {
    const f = expand(forge({ role: 'user', content: 'sound me' }, T).uuid)
    expect(f.signal.hz).toBeGreaterThan(0)
    expect(f.signal.note).toMatch(/^[A-G]$/)
    expect(['C', 'M', 'Y', 'K']).toContain(f.signal.channel)
  })

  it('decodes every identification level out of the 128 bits alone (no side-table)', () => {
    const f = expand(forge({ role: 'assistant', content: 'hi', model: 'm' }, T).uuid)
    expect(f.identity.oid.startsWith('2.25.')).toBe(true)
    expect(['C', 'M', 'Y', 'K']).toContain(f.identity.cmyk)
    expect(f.identity.structured.slotName).toBe('query')
    expect(f.prompt).toContain(f.uuid)
    expect(f.prompt).toContain(f.signal.note)
  })

  it('a corpus uuid resolves its atom + dimension (the matrix neighbourhood)', () => {
    const node = UUID_MATRIX_NODES[0]! // live node — drift-proof vs matrix regen
    const f = expand(node.uuid)
    expect(f.atom).toBe(node.atom)
    expect(f.dim).toBe(node.dim)
  })

  it('a novel uuid still fully decodes but has no neighbourhood (pointer, not decompressor)', () => {
    const f = expand(forge({ role: 'user', content: 'never seen before 42' }, T).uuid)
    expect(f.atom).toBeNull()
    expect(f.neighbors).toHaveLength(0)
    expect(f.backlinks).toHaveLength(0)
    expect(f.identity.oid.startsWith('2.25.')).toBe(true) // identity still complete
  })

  it('refuses a non-uuidv8 (the bridge is for erpax content-uuids)', () => {
    expect(() => expand(NON_V8)).toThrow()
  })

  it('the BALANCE: what llm/uuid exhales, uuid/llm inhales — digests reconcile', () => {
    const utterance = { role: 'assistant' as const, content: 'the answer is 432', model: 'm' }
    const forged = forge(utterance, T)
    const frame = expand(forged.uuid)
    expect(frame.identity.structured.slotName).toBe('query')
    expect(frame.identity.structured.contentDigestHex).toBe(forged.parts.contentDigestHex)
  })
})
