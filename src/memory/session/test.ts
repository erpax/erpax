/**
 * memory/session — session memory ⇐ diamond lattice; merge by contentUuid.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import {
  emptySessionLattice,
  isSealedDiamond,
  mergeSessionLattices,
  recordSessionArtifact,
  saveThoughtIfDiamond,
  saveSanitizedMemoryToLattice,
  sessionDiamondFromPath,
  distinctSessionArtifacts,
  SESSION_MEET_SUBSTRATES,
} from '@/memory/session'
import { sanitizedMemoryUuid, sanitizeMemoryRecord } from '@/memory/architecture'

describe('memory/session — save ⇐ isDiamond', () => {
  it('memory/session is a sealed diamond (lattice substrate)', () => {
    expect(isSealedDiamond('memory/session')).toBe(true)
    const artifact = sessionDiamondFromPath('memory/session')
    expect(artifact).not.toBeNull()
    expect(artifact!.atomPath).toBe('memory/session')
    expect(artifact!.contentUuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    )
  })

  it('sessionDiamondFromPath is deterministic', () => {
    const a = sessionDiamondFromPath('memory/architecture')
    const b = sessionDiamondFromPath('memory/architecture')
    expect(a).not.toBeNull()
    expect(b!.contentUuid).toBe(a!.contentUuid)
  })

  it('saveThoughtIfDiamond refuses unsealed atoms', () => {
    const lattice = emptySessionLattice()
    const res = saveThoughtIfDiamond(lattice, 'this/path/does/not/exist', 'cursor-1')
    expect(res.saved).toBe(false)
    expect(res.artifact).toBeNull()
    expect(distinctSessionArtifacts(res.lattice)).toBe(0)
  })

  it('saveThoughtIfDiamond persists sealed atoms', () => {
    const lattice = emptySessionLattice()
    const res = saveThoughtIfDiamond(lattice, 'memory/session', 'society-breath-7')
    expect(res.saved).toBe(true)
    expect(distinctSessionArtifacts(res.lattice)).toBe(1)
  })
})

describe('memory/session — all sessions meet (merge by contentUuid)', () => {
  const artifact = {
    contentUuid: 'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
    atomPath: 'example',
  }

  it('recordSessionArtifact is idempotent on contentUuid', () => {
    let L = emptySessionLattice()
    L = recordSessionArtifact(L, artifact, 'cursor-a')
    L = recordSessionArtifact(L, artifact, 'cursor-b')
    expect(distinctSessionArtifacts(L)).toBe(1)
    expect(L.byContentUuid.get(artifact.contentUuid)!.sessions.size).toBe(2)
  })

  it('mergeSessionLattices set-unions by contentUuid — same diamond ⇒ one vertex', () => {
    const A = recordSessionArtifact(emptySessionLattice(), artifact, 's1')
    const other = { contentUuid: '11111111-2222-3333-4444-555555555555', atomPath: 'other' }
    const B = recordSessionArtifact(emptySessionLattice(), other, 's2')
    const M = mergeSessionLattices(A, B)
    expect(distinctSessionArtifacts(M)).toBe(2)

    const dup = recordSessionArtifact(emptySessionLattice(), artifact, 's3')
    const merged = mergeSessionLattices(A, dup)
    expect(distinctSessionArtifacts(merged)).toBe(1)
    expect(merged.byContentUuid.get(artifact.contentUuid)!.sessions.size).toBe(2)
  })

  it('merge is commutative on distinct count', () => {
    const a = saveThoughtIfDiamond(emptySessionLattice(), 'memory/session', 'x').lattice
    const b = saveThoughtIfDiamond(emptySessionLattice(), 'memory/architecture', 'y').lattice
    expect(distinctSessionArtifacts(mergeSessionLattices(a, b))).toBe(
      distinctSessionArtifacts(mergeSessionLattices(b, a)),
    )
  })

  it('names the convergence substrates', () => {
    expect(SESSION_MEET_SUBSTRATES).toContain('chat')
    expect(SESSION_MEET_SUBSTRATES).toContain('seal-and-push')
    expect(SESSION_MEET_SUBSTRATES).toContain('akashic')
  })
})

describe('memory/session — sanitized memory → lattice', () => {
  it('saveSanitizedMemoryToLattice strips ephemeral debris then persists sealed atoms', () => {
    const debris = {
      atomPath: 'memory/session',
      kind: 'fact',
      sessionId: 'cursor-42',
      __securitybot_metadata__: { trace: 'ephemeral' },
      uuid: 'not-content',
    }
    const sanitizedUuid = sanitizedMemoryUuid(sanitizeMemoryRecord(debris))
    const res = saveSanitizedMemoryToLattice(emptySessionLattice(), debris, 'cursor-42')
    expect(res.saved).toBe(true)
    expect(res.sanitizedUuid).toBe(sanitizedUuid)
    expect(res.artifact!.contentUuid).toBe(sessionDiamondFromPath('memory/session')!.contentUuid)
  })
})
