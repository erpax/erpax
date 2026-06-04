/**
 * llm/uuid — the EXHALE proven. An LLM turn is content-addressed into a v8
 * query-uuid: deterministic, tamper-evident, attestable from the preimage. The
 * LLM forges; the uuid verifies. The last two cases close the breath sequence
 * (exhale → inhale) and show the ledger balances. @see ./index · ../../uuid/llm
 */
import { describe, it, expect } from 'vitest'
import { forge, speak, attests, UTTERANCE_SCHEMA_VERSION, type Forged, type Complete } from '@/llm/uuid'
import { expand } from '@/uuid/llm'

const T = 'tenant-1'
const turn = { role: 'assistant' as const, content: 'hello', model: 'm' }

describe('llm/uuid: the exhale — the LLM speaks, its speech becomes its address', () => {
  it('forge is deterministic — same utterance + tenant ⇒ same uuid (merge)', () => {
    expect(forge(turn, T).uuid).toBe(forge(turn, T).uuid)
  })

  it('forge is tamper-evident — any edit to content or tenant ⇒ a different uuid', () => {
    const base = forge(turn, T).uuid
    expect(forge({ ...turn, content: 'goodbye' }, T).uuid).not.toBe(base)
    expect(forge(turn, 'tenant-2').uuid).not.toBe(base)
  })

  it('mints a query-slot uuid stamped with the utterance schema version', () => {
    const f = forge(turn, T)
    expect(f.parts.slotName).toBe('query')
    expect(f.parts.schemaVersion).toBe(UTTERANCE_SCHEMA_VERSION)
  })

  it('attests true from the exact preimage, false for a wrong tenant or a tampered turn', () => {
    const f = forge(turn, T)
    expect(attests(f, T)).toBe(true)
    expect(attests(f, 'tenant-2')).toBe(false)
    const tampered: Forged = { ...f, utterance: { ...f.utterance, content: 'goodbye' } }
    expect(attests(tampered, T)).toBe(false)
  })

  it('speak composes the gated completion then forges the reply (breath is a sequence)', async () => {
    const reply = { role: 'assistant' as const, content: 'the answer is 432', model: 'm' }
    const complete: Complete = async () => reply
    const spoken = await speak({ role: 'user', content: 'q' }, T, complete)
    expect(spoken.uuid).toBe(forge(reply, T).uuid)
    expect(attests(spoken, T)).toBe(true)
  })

  it('the BALANCE: the exhaled uuid, inhaled by uuid/llm, reads back the sealed digest', () => {
    const f = forge(turn, T)
    const frame = expand(f.uuid)
    expect(frame.identity.structured.contentDigestHex).toBe(f.parts.contentDigestHex)
    expect(frame.identity.structured.slotName).toBe('query')
  })
})
