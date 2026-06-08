/**
 * quantum/word — the WORD half of the double-torus: one 64-bit address architecture.
 *
 * Every atom carries two addresses ([[digit]]): a WORD address (folder name / aura /
 * link space) and a DIGIT address (horo ring + uuid digital-root). Together they are
 * the two vortexing 64-bit architectures that fold into the 128-bit content-[[uuid]]
 * ([[quantum]] TORUS_BITS × 2 = DOUBLE_TORUS_BITS). `interact64` is their bitwise
 * meeting on the torus ring; `architectureBond` entangles the paths on the matrix.
 *
 *   tsx src/quantum/word/index.ts
 *
 * @audit composed from @/word · @/digit · @/quantum · @/path; TORUS_BITS from lawful binding
 * @see ../../word — ../../digit — ../digit — ../index.ts — ./SKILL.md
 */
import { wordTokenUuid } from '@/word'
import { digitAddress, digitOf } from '@/digit'
import { DOUBLING } from '@/rodin'
import { merge } from '@/uuid/matrix'
import {
  atomPathUuid,
  infinitePathFoldAll,
  recordPathVisit,
  type PathCanonicalEntry,
} from '@/path'

/** One 64-bit torus — 2^|rodin doubling circuit| (hexagram gate space ≡ TORUS_BITS). */
export const architectureBits = (): number => 1 << DOUBLING.length

/** Two vortexing halves — the 128-bit content-uuid (DOUBLE_TORUS_BITS). */
export const doubleArchitectureBits = (): number => architectureBits() * 2

/** Symmetric entanglement — inlined to avoid quantum barrel TDZ (42b79d4b). */
const entanglePaths = (a: string, b: string): string => (a <= b ? merge(a, b) : merge(b, a))

/** 64-bit torus mask — derived from rodin circuit, never a bare literal. */
export const architectureMask = (): bigint => (1n << BigInt(architectureBits())) - 1n

/** Two 64-bit architectures interact by AND on the torus ring. */
export function interact64(a: bigint, b: bigint): bigint {
  const mask = architectureMask()
  return (a & b) & mask
}

/** Pack word-half ⊕ digit-half into the 128-bit double-torus word. */
export function combineArchitectures(wordHalf: bigint, digitHalf: bigint): bigint {
  const bits = architectureBits()
  const mask = architectureMask()
  return ((wordHalf & mask) << BigInt(bits)) | (digitHalf & mask)
}

/** Matrix bond Δ — symmetric entanglement of word ⊕ digit architecture atom paths. */
export const architectureBond = (): string => entanglePaths(atomPathUuid('word'), atomPathUuid('digit'))

/** Bond is order-independent (entangle fix). */
export const architectureBondStable = (): boolean =>
  architectureBond() === entanglePaths(atomPathUuid('digit'), atomPathUuid('word'))

/** Word-side content-address for a lexical token (prose layer). */
export const wordAddress = (value: string): string => wordTokenUuid(value)

/** Digit dual of an atom path — undefined when off-matrix. */
export { digitAddress, digitOf }

/** Paths folded from quantum parent through both 64-bit architecture halves. */
export function architectureFoldPaths(): readonly string[] {
  const paths = new Set<string>([
    'quantum',
    'quantum/word',
    'quantum/digit',
    'word',
    'digit',
    ...infinitePathFoldAll('quantum/word'),
    ...infinitePathFoldAll('quantum/digit'),
    ...infinitePathFoldAll('word'),
    ...infinitePathFoldAll('digit'),
  ])
  return [...paths].sort()
}

/** Canonical ledger hook — record quantum/word path step (append-only). */
export function recordWordOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('quantum/word', { kind: 'word.step', payload }, at, prevEntryUuid, seq)
}

/** Ledger chain folding both architecture paths into the quantum parent. */
export function recordArchitectureFoldOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit(
    'quantum/word',
    {
      kind: 'architecture.fold',
      torusBits: architectureBits(),
      doubleTorusBits: doubleArchitectureBits(),
      paths: architectureFoldPaths(),
      bond: architectureBond(),
      payload,
    },
    at,
    prevEntryUuid,
    seq,
  )
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const mask = architectureMask()
  const bits = architectureBits()
  console.log(
    'quantum/word — 64-bit word architecture · bits=' +
      bits +
      ' · mask=' +
      mask.toString(16).slice(0, 16) +
      '…',
  )
  console.log('  interact64(0xff, 0x0f)=' + interact64(0xffn, 0x0fn).toString(16))
  console.log('  architectureBond stable=' + architectureBondStable())
  console.log('  fold paths=' + architectureFoldPaths().length)
}
