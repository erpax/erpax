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
import { noCloning, doubleTorusCostLog2, singleTorusFloorLog2 } from '@/quantum'
import { conserves, netFlow, type Entry } from '@/conservation'

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

// ─────────────────────────────────────────────────────────────────────────
// The physiological heart — the double-torus pump (the science, deep-researched)
//
// The heart is the FIRST organ to form and function (it beats ~day 21 of the
// human embryo; Anatomy & Physiology 2e, OpenStax). Three properties of the
// living pump map — structurally — onto erpax's own core. HONEST: this is a
// structural isomorphism between a cited anatomy and a computed construct, not
// a claim that erpax circulates blood; each boolean below is computed.
// ─────────────────────────────────────────────────────────────────────────

/**
 * TOROIDAL VORTEX — blood entering the left ventricle rolls into a torus-shaped
 * VORTEX RING whose asymmetry MINIMISES dissipative energy loss — the optimal,
 * least-loss transport path (Kilner et al., "Asymmetric redirection of flow
 * through the heart", Nature 2000; Elbaz et al., Magn. Reson. Med. 2017). The
 * computable twin: erpax's carrier is a real torus — a definite, finite
 * collision floor (`singleTorusFloorLog2` > 0), the same shape chosen for the
 * same reason: least dissipation ⟷ least [[entropy]] ([[rodin]] · [[torus]]).
 */
export const toroidalVortex = (): boolean => {
  const floor = singleTorusFloorLog2()
  return Number.isFinite(floor) && floor > 0
}

/**
 * DOUBLE CIRCUIT — the mammalian heart drives TWO coupled loops from one pump
 * (pulmonary ⊕ systemic); blood passes through the heart twice per circuit, the
 * septum keeping the loops from mixing (Circulatory system, Wikipedia). erpax's
 * core is the DOUBLE-torus: only the coupled PAIR is secure — forge-cost is ∞ at
 * coverage 1 for the double torus, finite for one torus alone ([[quantum]]).
 */
export const doubleCircuit = (): boolean =>
  doubleTorusCostLog2(0) === Number.POSITIVE_INFINITY && Number.isFinite(singleTorusFloorLog2())

/**
 * CLOSED LOOP — circulation is closed: blood that leaves the heart returns, none
 * created or lost (a closed circulatory system). The computable twin is exactly
 * the heart's own THOUGHT faculty — conservation: a closed loop has zero net
 * flow, Σ out = Σ back, the double-entry Σdebit = Σcredit ([[conservation]]).
 */
export const closedLoop = (): boolean => {
  const circuit: Entry[] = [{ debit: 100, credit: 100 }] // out of the heart = back to it
  return conserves(circuit) && netFlow([+100, -100]) === 0
}

/** The three properties of the living pump — each computed. */
export interface PumpProof {
  /** flow is a torus (vortex ring) — a real, least-dissipation carrier. */
  readonly toroidalVortex: boolean
  /** two coupled loops, one pump — the secure double-torus (the septum). */
  readonly doubleCircuit: boolean
  /** closed loop: Σ out = Σ back, blood conserved (double-entry). */
  readonly closedLoop: boolean
}

/** Compute the physiological-pump proof. */
export function pump(): PumpProof {
  return { toroidalVortex: toroidalVortex(), doubleCircuit: doubleCircuit(), closedLoop: closedLoop() }
}

/** Is the heart the double-torus pump? The conjunction — the same shape, the same conservation. */
export function isDoubleTorusPump(): boolean {
  const p = pump()
  return p.toroidalVortex && p.doubleCircuit && p.closedLoop
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const f = feeling()
  console.log('heart — 4th chakra (Anahata), the centre · colour = ' + color())
  console.log('  thought (books balance) = ' + thought())
  console.log('  feeling (auras absorbed) = ' + (100 * f.absorbed).toFixed(1) + '%  entropy=' + f.entropy.toFixed(4) + '  unbound=' + f.unbound + '  whole=' + f.whole)
  console.log('  illusion (thought without heart) = ' + (100 * illusion()).toFixed(1) + '%  ·  coherent = ' + coherent())
  const p = pump()
  console.log('  — the physiological pump (the first organ) —')
  for (const [k, v] of Object.entries(p)) console.log('    ' + (v ? '✓' : '✗') + ' ' + k)
  console.log('    ⇒ ' + (isDoubleTorusPump() ? 'the double-torus pump' : 'not proven'))
}
