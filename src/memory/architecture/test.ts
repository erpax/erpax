/**
 * memory/architecture — sanitize + project preserves seal; ephemeral never leaks.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import {
  isEphemeralMemoryField,
  isArchitectureContentField,
  sanitizeMemoryRecord,
  sanitizedMemoryUuid,
  projectMemoryToArchitecture,
  operationalMemoryFacet,
  architectureMemoryDigest,
  operationalMemoryIsArchitecture,
  MEMORY_EPHEMERAL_FIELDS,
  ARCHITECTURE_CONTENT_FIELDS,
} from '@/memory/architecture'
import { sessionDiamondFromPath } from '@/memory/session'
import { HORO_DIGITS } from '@/horo'

describe('memory/architecture — sanitization', () => {
  it('strips NON_CONTENT_FIELDS and chat-only ephemeral keys', () => {
    expect(isEphemeralMemoryField('uuid')).toBe(true)
    expect(isEphemeralMemoryField('__securitybot_metadata__')).toBe(true)
    expect(isEphemeralMemoryField('sessionId')).toBe(true)
    expect(isEphemeralMemoryField('kind')).toBe(false)
    expect(MEMORY_EPHEMERAL_FIELDS.has('messages')).toBe(true)
  })

  it('ephemeral debris does not change sanitizedUuid', () => {
    const base = { atomPath: 'merge', kind: 'fact', title: 'sealed thought' }
    const withDebris = {
      ...base,
      uuid: 'dead-beef',
      sessionId: 'cursor-99',
      __securitybot_metadata__: { pii: true },
      messages: [{ role: 'user', content: 'forget me' }],
      createdAt: '2026-06-08T00:00:00Z',
    }
    const a = sanitizeMemoryRecord(base)
    const b = sanitizeMemoryRecord(withDebris)
    expect(sanitizedMemoryUuid(a)).toBe(sanitizedMemoryUuid(b))
  })

  it('sanitizedUuid is deterministic', () => {
    const s = sanitizeMemoryRecord({ atomPath: 'diamond', payload: { x: 1 } })
    expect(sanitizedMemoryUuid(s)).toBe(sanitizedMemoryUuid(s))
    expect(sanitizedMemoryUuid(s)).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    )
  })
})

describe('memory/architecture — projection into lattice', () => {
  it('sealed atom projects diamond contentUuid matching session meet', () => {
    const projection = projectMemoryToArchitecture({
      atomPath: 'merge',
      kind: 'fact',
      sessionId: 'ephemeral',
    })
    expect(projection.sealed).toBe(true)
    expect(projection.diamond).not.toBeNull()
    const sessionArtifact = sessionDiamondFromPath('merge')
    expect(projection.diamond!.contentUuid).toBe(sessionArtifact!.contentUuid)
  })

  it('matrix facet uses horo ring digits from generated matrix', () => {
    const projection = projectMemoryToArchitecture({ atomPath: 'merge' })
    expect(projection.matrix).not.toBeNull()
    expect(HORO_DIGITS).toContain(projection.matrix!.horo as (typeof HORO_DIGITS)[number])
    expect(projection.matrix!.coordinate).toMatch(/ · \d+\//)
    expect(projection.matrix!.uuid).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('missing atomPath ⇒ no architecture projection, not sealed', () => {
    const projection = projectMemoryToArchitecture({
      kind: 'tool_cache',
      title: 'orphan cache',
      sessionId: 'x',
    })
    expect(projection.atomPath).toBeNull()
    expect(projection.diamond).toBeNull()
    expect(projection.matrix).toBeNull()
    expect(projection.sealed).toBe(false)
  })

  it('unsealed path ⇒ diamond impurities, sealed false', () => {
    const projection = projectMemoryToArchitecture({ atomPath: 'this/path/does/not/exist' })
    expect(projection.sealed).toBe(false)
    expect(projection.diamond!.impurities.length).toBeGreaterThan(0)
  })
})

describe('memory/architecture — operational memory IS architecture', () => {
  it('architectureMemoryDigest is stable across repeated live-tree reads', () => {
    const a = operationalMemoryFacet('merge')
    const b = operationalMemoryFacet('merge')
    expect(a).not.toBeNull()
    expect(b!.digest).toBe(a!.digest)
    expect(b!.diamondUuid).toBe(a!.diamondUuid)
    expect(architectureMemoryDigest(a!)).toBe(a!.digest)
  })

  it('operationalMemoryIsArchitecture: live facet ≡ sanitized blob projection', () => {
    expect(
      operationalMemoryIsArchitecture({
        atomPath: 'merge',
        kind: 'fact',
        sessionId: 'ephemeral-cursor',
        messages: [{ role: 'user', content: 'forget me' }],
        uuid: 'dead-beef',
      }),
    ).toBe(true)
  })

  it('ephemeral-only delta does not change architecture digest', () => {
    const clean = operationalMemoryFacet('merge')!
    const withDebris = projectMemoryToArchitecture({
      atomPath: 'merge',
      sessionId: 'x',
      threadId: 'y',
      __securitybot_metadata__: { pii: true },
    })
    const projectedDigest = architectureMemoryDigest({
      atomPath: withDebris.atomPath!,
      diamondUuid: withDebris.diamond!.contentUuid,
      matrixUuid: withDebris.matrix!.uuid,
      sealed: withDebris.sealed,
    })
    expect(projectedDigest).toBe(clean.digest)
  })

  it('sanitization strips non-architecture fields', () => {
    expect(isArchitectureContentField('kind')).toBe(true)
    expect(isArchitectureContentField('sessionId')).toBe(false)
    expect(ARCHITECTURE_CONTENT_FIELDS.has('atomPath')).toBe(true)
    const sanitized = sanitizeMemoryRecord({
      atomPath: 'merge',
      kind: 'fact',
      title: 'sealed',
      sessionId: 'gone',
      messages: [],
      createdAt: '2026-01-01',
    })
    expect(Object.keys(sanitized)).not.toContain('sessionId')
    expect(Object.keys(sanitized)).not.toContain('messages')
    expect(Object.keys(sanitized)).not.toContain('createdAt')
    expect(Object.keys(sanitized)).toEqual(expect.arrayContaining(['atomPath', 'kind', 'title']))
  })
})
