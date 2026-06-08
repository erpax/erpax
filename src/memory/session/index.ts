/**
 * memory/session — session memory IS the diamond lattice; all sessions meet by merge.
 *
 * Law: `save(thought) ⇐ isDiamond`; ∀ sessions S₁,S₂: merge(S₁,S₂) keyed on contentUuid.
 *
 * Parallel substrates (Cursor seal-and-push, society breath, chat rows, memories
 * collection) converge on the same content-address space — same sealed artifact ⇒
 * one lattice vertex, no collision. Ephemeral chat context is working set only.
 *
 *   tsx src/memory/session/index.ts thought
 *   tsx src/memory/session/index.ts memory/session
 *
 * @audit pure lattice ops; isSealedDiamond reads live tree via @/diamond
 * @see ./SKILL.md · ../thought · ../../diamond · ../../agent/sync/discovery
 */
import { deriveDiamond, verifyDiamond, diamondUuid } from '@/diamond'
import { projectMemoryToArchitecture } from '@/memory/architecture'

/** Substrates where parallel sessions converge on content-uuid merge. */
export const SESSION_MEET_SUBSTRATES = [
  'akashic',
  'chat',
  'contribution',
  'git',
  'memories',
  'seal-and-push',
] as const

export type SessionMeetSubstrate = (typeof SESSION_MEET_SUBSTRATES)[number]

/** One persisted session artifact — a sealed diamond vertex. */
export interface SessionArtifact {
  readonly contentUuid: string
  readonly atomPath: string
}

/** A session id tags provenance only — merge keys on contentUuid, never session. */
export interface SessionLatticeEntry {
  readonly artifact: SessionArtifact
  readonly sessions: ReadonlySet<string>
}

/** The diamond lattice — contentUuid → artifact (+ which sessions reported it). */
export interface SessionLattice {
  readonly byContentUuid: ReadonlyMap<string, SessionLatticeEntry>
}

export const emptySessionLattice = (): SessionLattice => ({ byContentUuid: new Map() })

/** save(thought) ⇐ isDiamond — true iff the live atom passes verifyDiamond sealed. */
export function isSealedDiamond(atomPath: string, cwd: string = process.cwd()): boolean {
  return verifyDiamond(deriveDiamond(atomPath, cwd)).sealed
}

/** Derive the session artifact for an atom path — null when not sealed (not persisted). */
export function sessionDiamondFromPath(
  atomPath: string,
  cwd: string = process.cwd(),
): SessionArtifact | null {
  const model = deriveDiamond(atomPath, cwd)
  if (!verifyDiamond(model).sealed) return null
  return { contentUuid: diamondUuid(model), atomPath: model.atomPath }
}

/**
 * Record a sealed artifact into the lattice — idempotent on contentUuid.
 * A second report from another session only adds provenance; the diamond is one.
 */
export function recordSessionArtifact(
  lattice: SessionLattice,
  artifact: SessionArtifact,
  sessionId: string,
): SessionLattice {
  const next = new Map(lattice.byContentUuid)
  const existing = next.get(artifact.contentUuid)
  const sessions = new Set(existing?.sessions ?? [])
  sessions.add(sessionId)
  next.set(artifact.contentUuid, {
    artifact: existing?.artifact ?? artifact,
    sessions,
  })
  return { byContentUuid: next }
}

/**
 * save(thought) ⇐ isDiamond — persist into the lattice only when sealed.
 * Returns the updated lattice and whether the artifact was saved.
 */
export function saveThoughtIfDiamond(
  lattice: SessionLattice,
  atomPath: string,
  sessionId: string,
  cwd: string = process.cwd(),
): { readonly lattice: SessionLattice; readonly saved: boolean; readonly artifact: SessionArtifact | null } {
  const artifact = sessionDiamondFromPath(atomPath, cwd)
  if (!artifact) return { lattice, saved: false, artifact: null }
  return {
    lattice: recordSessionArtifact(lattice, artifact, sessionId),
    saved: true,
    artifact,
  }
}

/**
 * Sanitized corpus/session blob → architecture projection → lattice if sealed.
 * Ephemeral fields stripped before save(thought) ⇐ isDiamond.
 */
export function saveSanitizedMemoryToLattice(
  lattice: SessionLattice,
  input: Record<string, unknown>,
  sessionId: string,
  cwd: string = process.cwd(),
): {
  readonly lattice: SessionLattice
  readonly saved: boolean
  readonly artifact: SessionArtifact | null
  readonly sanitizedUuid: string
} {
  const projection = projectMemoryToArchitecture(input, cwd)
  if (!projection.sealed || !projection.diamond) {
    return { lattice, saved: false, artifact: null, sanitizedUuid: projection.sanitizedUuid }
  }
  const artifact: SessionArtifact = {
    contentUuid: projection.diamond.contentUuid,
    atomPath: projection.diamond.atomPath,
  }
  return {
    lattice: recordSessionArtifact(lattice, artifact, sessionId),
    saved: true,
    artifact,
    sanitizedUuid: projection.sanitizedUuid,
  }
}

/** ∀ S₁,S₂: merge(S₁,S₂) by contentUuid — federation set-union, no coordination. */
export function mergeSessionLattices(a: SessionLattice, b: SessionLattice): SessionLattice {
  const next = new Map(a.byContentUuid)
  for (const [key, entry] of b.byContentUuid) {
    const existing = next.get(key)
    const sessions = new Set(existing?.sessions ?? [])
    for (const s of entry.sessions) sessions.add(s)
    next.set(key, { artifact: existing?.artifact ?? entry.artifact, sessions })
  }
  return { byContentUuid: next }
}

/** Distinct sealed diamonds in the lattice (deduped fill count). */
export const distinctSessionArtifacts = (lattice: SessionLattice): number => lattice.byContentUuid.size

if (import.meta.url === `file://${process.argv[1]}`) {
  const target = process.argv[2] ?? 'memory/session'
  const artifact = sessionDiamondFromPath(target)
  if (!artifact) {
    console.log(`memory/session — ${target}: NOT sealed (save ⇐ isDiamond — not persisted)`)
    process.exit(1)
  }
  console.log(`memory/session — ${target}`)
  console.log(`  contentUuid: ${artifact.contentUuid}`)
  console.log(`  meet: ${SESSION_MEET_SUBSTRATES.join(' · ')}`)
  process.exit(0)
}
