/**
 * memory/architecture — operational memory IS the architecture lattice.
 *
 * Operational memory is NOT a side store (Memories rows, chat history, agent
 * context). It IS the walkable lattice: diamond graph, uuid/matrix bindings,
 * typography partitions, folder SKILL statements, architecture-invariants, sealed
 * git tree. Session blobs are sanitized until only architecture content remains,
 * then verified against the live-tree facet — same digest ⇒ same memory.
 *
 * Law: operationalMemoryIsArchitecture(); save(thought) ⇐ isDiamond on the facet.
 *
 *   tsx src/memory/architecture/index.ts merge
 *
 * @audit pure projection; horo/measure from matrix, never hand decimals
 * @see ./SKILL.md · ../session · ../../diamond · ../../integrity · ../../uuid/matrix
 */
import {
  jcsCanonicalize,
  stripNonContentFields,
  uuid,
  NON_CONTENT_FIELDS,
} from '@/integrity'
import { deriveDiamond, verifyDiamond, diamondUuid } from '@/diamond'
import { toAtomPath } from '@/path'
import { coordinateAddress, nodeOf } from '@/uuid/matrix'
import { HORO_DIGITS, HORO_MEASURE } from '@/horo'

/** Ephemeral session/chat fields — never content, never architecture. */
export const MEMORY_EPHEMERAL_FIELDS: ReadonlySet<string> = new Set([
  ...NON_CONTENT_FIELDS,
  '__securitybot_metadata__',
  'sessionId',
  'turnId',
  'messageIndex',
  'threadId',
  'conversationId',
  'cursorSessionId',
  'chatContext',
  'messages',
  'transcript',
  'workingSet',
  'promptTokens',
  'completionTokens',
  'modelId',
  'cacheKey',
  'cachedAt',
  'traceId',
  'spanId',
  'tenantId',
  'ownerId',
  'ownerType',
])

const ATOM_PATH_KEYS = ['atomPath', 'atom', 'path'] as const

const measureOf = (digit: number): string => {
  const i = HORO_DIGITS.indexOf(digit as (typeof HORO_DIGITS)[number])
  return i >= 0 ? HORO_MEASURE[i]! : String(digit)
}

/** True when a key is storage-managed or chat-only — excluded from sanitized memory. */
export function isEphemeralMemoryField(key: string): boolean {
  return MEMORY_EPHEMERAL_FIELDS.has(key)
}

/**
 * Recursively strip non-content + ephemeral fields.
 * Only JCS-canonical content survives (integrity stripNonContentFields extended).
 */
export function sanitizeMemoryContent(value: unknown): unknown {
  if (value === null || typeof value !== 'object') return value
  if (Array.isArray(value)) return value.map(sanitizeMemoryContent)
  const obj = value as Record<string, unknown>
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (isEphemeralMemoryField(k)) continue
    out[k] = sanitizeMemoryContent(v)
  }
  return out
}

/** Top-level record sanitize — delegates to stripNonContentFields then deep pass. */
export function sanitizeMemoryRecord<T extends Record<string, unknown>>(record: T): Record<string, unknown> {
  return sanitizeMemoryContent(stripNonContentFields(record)) as Record<string, unknown>
}

/** Content-uuid of sanitized memory — same content ⇒ same id (merge key). */
export function sanitizedMemoryUuid(sanitized: unknown): string {
  return uuid(jcsCanonicalize(sanitized))
}

/** Matrix facet — horo digit + measure computed from generated matrix, not input decimals. */
export interface MemoryMatrixFacet {
  readonly uuid: string
  readonly horo: number
  readonly measure: string
  readonly dim: string
  readonly coordinate: string
  readonly folded: boolean
}

/** Diamond facet — live derive + seal verdict. */
export interface MemoryDiamondFacet {
  readonly atomPath: string
  readonly contentUuid: string
  readonly sealed: boolean
  readonly impurities: readonly string[]
}

/** Sanitized memory projected into architecture form — the lattice vertex candidate. */
export interface MemoryArchitectureProjection {
  readonly sanitized: Record<string, unknown>
  readonly sanitizedUuid: string
  readonly atomPath: string | null
  readonly diamond: MemoryDiamondFacet | null
  readonly matrix: MemoryMatrixFacet | null
  /** save(thought) ⇐ isDiamond — true only when diamond projection seals. */
  readonly sealed: boolean
}

/** Operational memory — the live architecture lattice vertex (walk IS remember). */
export interface OperationalMemoryFacet {
  readonly atomPath: string
  readonly diamondUuid: string
  readonly matrixUuid: string
  readonly coordinate: string
  readonly horo: number
  readonly measure: string
  readonly sealed: boolean
  /** JCS content-address of architecture facets — stable digest ⇒ stable memory. */
  readonly digest: string
}

/** Keys that belong to architecture content — everything else is stripped on sanitize. */
export const ARCHITECTURE_CONTENT_FIELDS: ReadonlySet<string> = new Set([
  'atomPath',
  'atom',
  'path',
  'kind',
  'title',
  'payload',
  'body',
  'content',
  'links',
  'standards',
  'emits',
  'subscribesTo',
  'description',
])

/** True when a sanitized key is architecture content (not ephemeral). */
export function isArchitectureContentField(key: string): boolean {
  return ARCHITECTURE_CONTENT_FIELDS.has(key) || (!isEphemeralMemoryField(key) && !key.startsWith('_'))
}

/** JCS digest of architecture facets — stable across substrates when the tree is sealed. */
export function architectureMemoryDigest(input: {
  readonly atomPath: string
  readonly diamondUuid: string
  readonly matrixUuid: string
  readonly sealed: boolean
}): string {
  return uuid(
    jcsCanonicalize({
      atomPath: input.atomPath,
      diamondUuid: input.diamondUuid,
      matrixUuid: input.matrixUuid,
      sealed: input.sealed,
    }),
  )
}

/**
 * Operational memory from the live sealed tree — no blob, no side store.
 * The structure you walk IS what the system remembers.
 */
export function operationalMemoryFacet(
  atomPath: string,
  cwd: string = process.cwd(),
): OperationalMemoryFacet | null {
  const normalized = toAtomPath(atomPath, 'fs') || atomPath.replace(/^src\//, '').replace(/^\//, '')
  if (!normalized) return null
  const diamond = diamondFacet(normalized, cwd)
  const matrix = matrixFacet(normalized)
  if (!matrix) return null
  const digest = architectureMemoryDigest({
    atomPath: normalized,
    diamondUuid: diamond.contentUuid,
    matrixUuid: matrix.uuid,
    sealed: diamond.sealed,
  })
  return {
    atomPath: normalized,
    diamondUuid: diamond.contentUuid,
    matrixUuid: matrix.uuid,
    coordinate: matrix.coordinate,
    horo: matrix.horo,
    measure: matrix.measure,
    sealed: diamond.sealed,
    digest,
  }
}

/**
 * Law: operational memory IS architecture — blob projection matches live-tree facet.
 * Ephemeral debris in the input must not change the identity.
 */
export function operationalMemoryIsArchitecture(
  input: Record<string, unknown>,
  cwd: string = process.cwd(),
): boolean {
  const projection = projectMemoryToArchitecture(input, cwd)
  if (!projection.atomPath || !projection.diamond || !projection.matrix) return false
  const live = operationalMemoryFacet(projection.atomPath, cwd)
  if (!live) return false
  const projectedDigest = architectureMemoryDigest({
    atomPath: projection.atomPath,
    diamondUuid: projection.diamond.contentUuid,
    matrixUuid: projection.matrix.uuid,
    sealed: projection.sealed,
  })
  return (
    live.digest === projectedDigest &&
    live.diamondUuid === projection.diamond.contentUuid &&
    live.matrixUuid === projection.matrix.uuid &&
    live.sealed === projection.sealed
  )
}

function resolveAtomPath(sanitized: Record<string, unknown>): string | null {
  for (const k of ATOM_PATH_KEYS) {
    const v = sanitized[k]
    if (typeof v !== 'string' || v.length === 0) continue
    const normalized = toAtomPath(v, 'fs') || v.replace(/^src\//, '').replace(/^\//, '')
    if (normalized.length > 0) return normalized
  }
  return null
}

function matrixFacet(atomPath: string): MemoryMatrixFacet | null {
  const n = nodeOf(atomPath)
  if (!n) return null
  return {
    uuid: n.uuid,
    horo: n.horo,
    measure: measureOf(n.horo),
    dim: n.dim,
    coordinate: coordinateAddress(atomPath),
    folded: true,
  }
}

function diamondFacet(atomPath: string, cwd: string): MemoryDiamondFacet {
  const model = deriveDiamond(atomPath, cwd)
  const verdict = verifyDiamond(model)
  return {
    atomPath: model.atomPath,
    contentUuid: diamondUuid(model),
    sealed: verdict.sealed,
    impurities: verdict.impurities,
  }
}

/**
 * Sanitize session/corpus input and project into architecture form.
 * Ephemeral fields never affect sanitizedUuid; horo/measure come from matrix.
 */
export function projectMemoryToArchitecture(
  input: Record<string, unknown>,
  cwd: string = process.cwd(),
): MemoryArchitectureProjection {
  const sanitized = sanitizeMemoryRecord(input)
  const sanitizedUuid = sanitizedMemoryUuid(sanitized)
  const atomPath = resolveAtomPath(sanitized)

  if (!atomPath) {
    return {
      sanitized,
      sanitizedUuid,
      atomPath: null,
      diamond: null,
      matrix: null,
      sealed: false,
    }
  }

  const diamond = diamondFacet(atomPath, cwd)
  const matrix = matrixFacet(atomPath)
  return {
    sanitized,
    sanitizedUuid,
    atomPath,
    diamond,
    matrix,
    sealed: diamond.sealed,
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const rawPath = process.argv[2] ?? 'merge'
  const live = operationalMemoryFacet(rawPath)
  const projection = projectMemoryToArchitecture({ atomPath: rawPath })
  const identity = operationalMemoryIsArchitecture({ atomPath: rawPath })
  console.log(`memory/architecture — ${projection.atomPath ?? '(no path)'}`)
  console.log(`  operationalMemoryIsArchitecture: ${identity}`)
  if (live) {
    console.log(`  digest: ${live.digest}`)
    console.log(`  coordinate: ${live.coordinate}`)
  }
  console.log(`  sanitizedUuid: ${projection.sanitizedUuid}`)
  if (projection.diamond) {
    console.log(`  diamond: ${projection.diamond.contentUuid} sealed=${projection.diamond.sealed}`)
  }
  console.log(`  save ⇐ isDiamond: ${projection.sealed}`)
  process.exit(projection.sealed && identity ? 0 : 1)
}
