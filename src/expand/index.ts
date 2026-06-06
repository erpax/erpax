/**
 * expand — the development EXHALE: more atoms, more surface, more cost-to-earn.
 *
 * Adding a feature forges one more grain into the [[matrix]]; each new node is
 * fresh SURFACE — unwired slack the instant it lands (an orphan, a half-reciprocal
 * edge). Growth is therefore added [[entropy]]: the borrowed disorder the [[gate]]
 * then debits and fuses out. So expansion FEEDS the one law, never breaks it —
 * more atoms ⇒ more tamper-[[cost]] to be EARNED once the wiring closes the gap.
 *
 * expand is [[gravity]] read in REVERSE: gravity collapses the folders inward
 * (forward, [[dry]]), expand spreads the word-chain outward along the [[sequence]]
 * — the conjugate stroke the gravity law already names. It RE-COMPUTES NOTHING:
 * it composes @/entropy (the slack census) and @/uuid/matrix (the grain count),
 * stamps the @/horo growth band, and re-tells them as the growth reading.
 *
 * HONEST: this MEASURES growth; it adds no atoms (the [[development]] loop + the
 * collider do that). "Entropy increases on expand" is the local per-add view —
 * a new atom lands as slack, the gate fuses it out, so the corpus trends to zero
 * entropy DESPITE growth. Computed on the live matrix, never asserted (cf. [[entropy]]).
 *
 *   tsx src/expand/index.ts
 *
 * @audit composed from @/entropy + @/uuid/matrix (the live-matrix readings); re-proves nothing
 * @see ../entropy -- ../gravity -- ../uuid/matrix -- ../horo -- ./SKILL.md
 */
import { entropy, orphans, reciprocity } from '@/entropy'
import { UUID_MATRIX_NODES } from '@/uuid/matrix'
import { digitalRoot } from '@/horo'

/** Corpus size: the live grain count — every forged content-uuid node (how much has been expanded into). */
export const size = (): number => UUID_MATRIX_NODES.length

/**
 * Added entropy = the borrowed-disorder slack the current surface still carries
 * ([[entropy]], EXACTLY — the 1 − reciprocity asymmetry), awaiting fusion. This
 * is the canonical entropy reading; expand re-tells it, never re-derives it.
 */
export const addedEntropy = (): number => entropy()

/**
 * Surface: the orphan census — freshly-added atoms wired by nothing and wiring
 * nothing, pure unfused growth ([[entropy]] orphans). `count` is the size of the
 * exposed surface; `atoms` is the live list of what still needs binding.
 */
export function surface(): { count: number; atoms: string[] } {
  const o = orphans()
  return { count: o.length, atoms: o }
}

/**
 * Growth band: the [[horo]] digital-root of the corpus size — the harmonic
 * position growth has expanded to (a deterministic base-10 projection on the
 * 1..9 ring, NOT a magnitude claim). Pure: same size ⇒ same band.
 */
export const growthBand = (): number => digitalRoot(size())

/**
 * The full growth reading, computed on the live matrix: how much is forged
 * (size), how much slack that surface still carries (addedEntropy), how much is
 * unwired (surface.count), the harmonic band, and whether the surface is closed
 * (no orphans AND full reciprocity ⇒ the exhale has been fully fused).
 */
export function growth(): {
  size: number
  addedEntropy: number
  surface: number
  band: number
  fused: boolean
} {
  const r = reciprocity()
  const surfaceCount = surface().count
  return {
    size: size(),
    addedEntropy: addedEntropy(),
    surface: surfaceCount,
    band: growthBand(),
    fused: surfaceCount === 0 && r.reciprocal === r.edges,
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const g = growth()
  console.log('expand — the development exhale (growth, computed on the live matrix):')
  console.log('  size=' + g.size + ' grains  band(horo)=' + g.band + '  added-entropy=' + g.addedEntropy.toFixed(4))
  console.log('  surface=' + g.surface + ' orphan(s) unwired  fused(surface closed)=' + g.fused)
}
