/**
 * heart — the centre: the 4th [[chakra]] (Anahata), the seat of coherence and love ([[angel]]
 * love·create·↓entropy). Its colour is GREEN ([[color]]) — the A432-anchored colour of a whole
 * aura, the colour a passing [[test]] returns. Composes [[chakra]] · [[color]] · [[coherence]].
 *
 * Two faculties (computed live): THOUGHT — the trial balance (the [[quantum]] accounting: every
 * grain unique, every link reciprocal), coherent yet blind to omission; and FEELING — absorbing
 * ALL auras in zero entropy ([[coverage]]→1 over the bound field). Thought is illusion without
 * the heart: a balanced ledger over an un-wired world is maya. Coherent only as thought ⊕ heart.
 *
 *   tsx src/heart/index.ts
 *
 * @standard A432 tuning; Anahata = the 4th chakra (green)
 * @see ../chakra -- ../color -- ../coherence -- ../entropy -- ../coverage -- ../love -- ./SKILL.md
 */
import { colorOf } from '@/color'
import { entropy, reciprocity, orphans } from '@/entropy'
import { noCloning } from '@/quantum'

/** The heart is the 4th chakra (Anahata) — the centre of the 7-position ring. */
export const HEART_POSITION = 4

/** The heart's colour — green (the centre of the spectrum, A432-anchored). */
export const color = (): string => colorOf(HEART_POSITION)

// ── thought ⊕ heart: feeling is absorbing all auras in zero entropy ──

/**
 * THOUGHT — the trial balance: is every RECORDED entry coherent? Each grain unique (no-cloning)
 * AND each link reciprocal (the quantum accounting, Σdebit = Σcredit). True ⇒ the books close —
 * but thought is blind to OMISSION: a coordinate never posted leaves no residual to catch.
 */
export const thought = (): boolean => noCloning().holds && reciprocity().fraction === 1

/**
 * FEELING — the heart's faculty: absorbing ALL auras in zero entropy. The aura is the bound,
 * reciprocal field over every grain; to feel is to take the WHOLE field in — coverage of the
 * corpus (1 − the omitted fraction), no grain left unbound, at zero entropy (full reciprocity).
 * Where thought audits the recorded, feeling covers the omitted. `whole` ⇔ all auras absorbed.
 */
export function feeling(): { absorbed: number; entropy: number; unbound: number; whole: boolean } {
  const total = noCloning().total
  const unbound = orphans().length
  const absorbed = total === 0 ? 1 : (total - unbound) / total
  const e = entropy()
  return { absorbed, entropy: e, unbound, whole: unbound === 0 && e === 0 }
}

/**
 * ILLUSION — thought WITHOUT the heart: the un-felt fraction a balanced ledger cannot see (1 −
 * feeling = the unbound grains over the whole). The books can close — every entry balanced, zero
 * entropy — while grains sit unabsorbed, and call that whole. That residual is maya. 0 ⇔ no orphan.
 */
export const illusion = (): number => 1 - feeling().absorbed

/** Coherent only as thought ⊕ heart: the books balance AND the whole aura is felt — true zero entropy. */
export const coherent = (): boolean => thought() && feeling().whole

if (import.meta.url === 'file://' + process.argv[1]) {
  const f = feeling()
  console.log('heart — 4th chakra (Anahata), the centre · colour = ' + color())
  console.log('  thought (books balance) = ' + thought())
  console.log('  feeling (auras absorbed) = ' + (100 * f.absorbed).toFixed(1) + '%  entropy=' + f.entropy.toFixed(4) + '  unbound=' + f.unbound + '  whole=' + f.whole)
  console.log('  illusion (thought without heart) = ' + (100 * illusion()).toFixed(1) + '%  ·  coherent = ' + coherent())
}
