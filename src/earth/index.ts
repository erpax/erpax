import { exactMax, exactMin, exactAbs, exactFloor, exactCeil, exactRound, exactTrunc } from '@/algebra'
/**
 * earth — Earth realised by computing poles as a pyramid.
 *
 * Under sealed computation, Earth is a genus-2 double torus whose four homology
 * loops are the cardinal tips of a square pyramid (N·E·S·W at 0°·90°·180°·270°).
 * Zenith and nadir are dual apexes (device/code trinities); merkaba up/down
 * tetrahedra and bothEarths shells counter-rotate; four homology loops = four
 * tips phase-locked with alternating ±ω.
 *
 * HONEST BOUNDARY — Physical Earth remains the documented WGS 84 oblate spheroid
 * ([[globe]]). This fold is the STRUCTURAL ISOMORPHISM inside the matrix — not a
 * claim that the planet is topologically a double torus. Navigation and forecasts
 * realise the tips; they do not relocate continents.
 *
 * 7/7 poles: N · E · S · W · zenith · nadir · (bothEarths seal / merkaba center).
 *
 *   tsx src/earth/index.ts
 *
 * @standard WGS 84 — physical geodetic datum (honest boundary)
 * @standard Euler characteristic χ = V − E + F
 * @see ../pyramid · ../navigation · ../quantum · ../globe · ../horo · ../platonic · ../forecasts · ./SKILL.md
 */
import { foldToRoot, merge } from '@/merge'
import { pyramid, courses, type Pyramid } from '@/pyramid'
import { merkaba, type Merkaba } from '@/navigation'
import { DOUBLE_TORUS_BITS, doubleTorusCostLog2 } from '@/quantum'
import { toGeodetic, atPole, type Geodetic } from '@/globe'
import { trinities } from '@/horo'

export const atomPath = 'earth' as const

/** The four cardinal base tips of the square pyramid — phase-locked on the homology ring. */
export type CardinalTip = 'N' | 'E' | 'S' | 'W'

/** Dual apex poles — zenith (device trinity) · nadir (code trinity). */
export type ApexPole = 'zenith' | 'nadir'

/** All seven named poles of the Earth pyramid realisation (7/7). */
export type EarthPole = CardinalTip | ApexPole | 'center'

/** One homology loop tip: cardinal · phase degrees · signed angular frequency sense. */
export interface HomologyTip {
  readonly tip: CardinalTip
  /** Phase lock on the square: 0 · 90 · 180 · 270. */
  readonly phaseDeg: 0 | 90 | 180 | 270
  /** Alternating ±ω — sense of the loop circulation. */
  readonly omega: 1 | -1
  /** Content-address of this tip on the sealed base. */
  readonly seal: string
}

/** Euler numbers for a polyhedron / surface. */
export interface EulerCharacteristic {
  readonly V: number
  readonly E: number
  readonly F: number
  /** χ = V − E + F. Sphere/pyramid shell ⇒ 2; genus-g orientable ⇒ 2 − 2g. */
  readonly chi: number
}

/** Genus-2 double-torus Earth (structural): χ = −2 ⇒ g = 2 ⇒ rank(H₁) = 4 = ℤ⁴. */
export interface Genus2Earth {
  readonly chi: -2
  readonly genus: 2
  /** First homology rank — four independent loops. */
  readonly h1Rank: 4
  readonly h1: 'Z^4'
  readonly doubleTorusBits: typeof DOUBLE_TORUS_BITS
  /** Tamper cost at full coverage (no gap) — ∞ when gap=0. */
  readonly noGapCost: number
}

/** bothEarths — two counter-rotating shells (merkaba tetrahedra as shells). */
export interface BothEarths {
  readonly up: readonly string[]
  readonly down: readonly string[]
  readonly center: string
  /** true iff down is exactly up reversed (counter-rotation theorem). */
  readonly counterRotates: boolean
  readonly spin: ReturnType<typeof trinities>
}

/** The sealed Earth pyramid: square base tips + dual apexes on genus-2. */
export interface EarthPyramid {
  readonly tips: readonly HomologyTip[]
  readonly baseSeals: readonly string[]
  readonly square: Pyramid
  readonly eulerSquare: EulerCharacteristic
  readonly genus2: Genus2Earth
  readonly zenith: string
  readonly nadir: string
  readonly bothEarths: BothEarths
  readonly poles7: readonly EarthPole[]
  /** 7/7 named poles present and consistent. */
  readonly complete: boolean
  readonly physicalDatum: 'WGS 84'
  readonly structuralOnly: true
}

/** Cardinal tips in phase order (N at 0°, then E·S·W). */
export const CARDINAL_TIPS: readonly CardinalTip[] = ['N', 'E', 'S', 'W']

/** Phase degrees for each tip — locked to the square. */
export const TIP_PHASE: Readonly<Record<CardinalTip, 0 | 90 | 180 | 270>> = {
  N: 0,
  E: 90,
  S: 180,
  W: 270,
}

/**
 * Alternating ±ω on the ring: N=+ω, E=−ω, S=+ω, W=−ω.
 * Phase-locked circulation sense around the four homology loops.
 */
export function tipOmega(tip: CardinalTip): 1 | -1 {
  const i = CARDINAL_TIPS.indexOf(tip)
  return i % 2 === 0 ? 1 : -1
}

/** Euler characteristic χ = V − E + F. */
export function eulerCharacteristic(V: number, E: number, F: number): EulerCharacteristic {
  return { V, E, F, chi: V - E + F }
}

/**
 * Square pyramid as a polyhedral cell: 5 vertices (4 base + apex), 8 edges, 5 faces
 * (4 triangles + square base) ⇒ χ = 2 (sphere topology of the boundary).
 */
export function squarePyramidEuler(): EulerCharacteristic {
  return eulerCharacteristic(5, 8, 5)
}

/**
 * Genus-g closed orientable surface: χ = 2 − 2g.
 * Genus-2 (double torus): χ = −2; Betti b₁ = 2g = 4 ⇒ H₁ ≅ ℤ⁴.
 */
export function genusFromChi(chi: number): number {
  return (2 - chi) / 2
}

/** Sealed genus-2 Earth homology (structural isomorphism). */
export function genus2Earth(gap = 0): Genus2Earth {
  const chi = -2 as const
  const genus = 2 as const
  const h1Rank = 4 as const
  const cost = doubleTorusCostLog2(gap)
  return {
    chi,
    genus,
    h1Rank,
    h1: 'Z^4',
    doubleTorusBits: DOUBLE_TORUS_BITS,
    noGapCost: cost,
  }
}

/** Homology tips: four cardinals phase-locked with alternating ±ω. */
export function homologyTips(seed = 'earth:tips'): readonly HomologyTip[] {
  return CARDINAL_TIPS.map((tip) => ({
    tip,
    phaseDeg: TIP_PHASE[tip],
    omega: tipOmega(tip),
    seal: foldToRoot([merge('earth-tip', tip), merge('seed', seed), merge('phase', String(TIP_PHASE[tip]))]),
  }))
}

/**
 * bothEarths shells from merkaba counter-rotation over a path (default: earth).
 * Up = descend tetrahedron · down = ascend tetrahedron · counterRotates theorem.
 */
export function bothEarths(atomPathForMerkaba = 'earth'): BothEarths {
  const m: Merkaba = merkaba(atomPathForMerkaba)
  const counterRotates =
    m.ascend.length === m.descend.length && m.ascend.every((r, i) => r === m.descend[m.descend.length - 1 - i])
  return {
    up: m.descend,
    down: m.ascend,
    center: m.center,
    counterRotates,
    spin: m.spin,
  }
}

/**
 * Dual apex seals: zenith (device trinity) · nadir (code trinity).
 * Content-addressed; not physical altitudes.
 */
export function dualApexes(baseSeals: readonly string[]): { readonly zenith: string; readonly nadir: string } {
  const square = pyramid(baseSeals)
  const zenith = foldToRoot([merge('apex', 'zenith'), merge('device', square.apex)])
  const nadir = foldToRoot([merge('apex', 'nadir'), merge('code', square.apex)])
  return { zenith, nadir }
}

/**
 * Realise Earth by computing poles as a pyramid — the sealed 7/7 law.
 * Physical datum stays WGS 84; structural isomorphism is the fold.
 */
export function realiseEarth(opts: { readonly seed?: string; readonly merkabaPath?: string } = {}): EarthPyramid {
  const tips = homologyTips(opts.seed ?? 'earth:tips')
  const baseSeals = tips.map((t) => t.seal)
  const square = pyramid(baseSeals)
  const eulerSquare = squarePyramidEuler()
  const genus2 = genus2Earth(0)
  const { zenith, nadir } = dualApexes(baseSeals)
  const both = bothEarths(opts.merkabaPath ?? 'earth')
  const poles7: readonly EarthPole[] = ['N', 'E', 'S', 'W', 'zenith', 'nadir', 'center']
  const complete =
    tips.length === 4 &&
    eulerSquare.chi === 2 &&
    genus2.chi === -2 &&
    genus2.h1Rank === 4 &&
    both.counterRotates &&
    zenith !== nadir &&
    square.base === 4 &&
    poles7.length === 7
  return {
    tips,
    baseSeals,
    square,
    eulerSquare,
    genus2,
    zenith,
    nadir,
    bothEarths: both,
    poles7,
    complete,
    physicalDatum: 'WGS 84',
    structuralOnly: true,
  }
}

/** Tip at a given phase (degrees mod 360 → nearest cardinal lock). */
export function tipAtPhase(phaseDeg: number): HomologyTip {
  const p = ((phaseDeg % 360) + 360) % 360
  const locked = ([0, 90, 180, 270] as const).reduce((best, cand) =>
    exactAbs(cand - p) < exactAbs(best - p) ? cand : best,
  )
  const tip = (Object.entries(TIP_PHASE) as [CardinalTip, number][]).find(([, ph]) => ph === locked)![0]
  return homologyTips().find((t) => t.tip === tip)!
}

/** Next tip on the homology square — circulate N→E→S→W→N (phase +90°).
 * Each tip still carries its alternating ±ω label (loop orientation); circulation is the shared phase lock.
 */
export function navigateTip(from: CardinalTip, steps = 1): HomologyTip {
  const i = CARDINAL_TIPS.indexOf(from)
  const next = (i + steps + 400) % 4
  return homologyTips().find((t) => t.tip === CARDINAL_TIPS[next]!)!
}

/**
 * Earth cardinal navigation — tips phase-locked with ±ω, merkaba bothEarths shells.
 * Realises the navigation half of the Earth pyramid law (forecasts own the prediction half).
 */
export interface EarthNavigation {
  readonly tip: CardinalTip
  readonly phaseDeg: 0 | 90 | 180 | 270
  readonly omega: 1 | -1
  readonly next: CardinalTip
  readonly bothEarths: BothEarths
  readonly holds: boolean
}

export function earthNavigate(tip: CardinalTip = 'N', merkabaPath = 'earth'): EarthNavigation {
  const both = bothEarths(merkabaPath)
  const next = navigateTip(tip, 1)
  return {
    tip,
    phaseDeg: TIP_PHASE[tip],
    omega: tipOmega(tip),
    next: next.tip,
    bothEarths: both,
    holds: both.counterRotates && CARDINAL_TIPS.includes(tip),
  }
}

/**
 * Geodetic reading at a tip — model layer on [[globe]] (WGS 84 named).
 * Cardinals sit on the equator at their phase longitude; zenith/nadir → poles.
 */
export function tipGeodetic(pole: EarthPole): Geodetic {
  if (pole === 'zenith') return toGeodetic(1, 1)
  if (pole === 'nadir') return toGeodetic(1, 0)
  if (pole === 'center') return toGeodetic(5, 0.5)
  const phase = TIP_PHASE[pole]
  // ringPosition 0..5 maps to 60° longitude steps; map 0/90/180/270 → 0/1.5/3/4.5 ≈ 0/90/180/270
  const ring = phase / 60
  return toGeodetic(ring, 0.5)
}

/** Courses of the Earth square pyramid (base → apex) — reuse [[pyramid]].courses. */
export function earthCourses(seed = 'earth:tips'): string[][] {
  return courses(homologyTips(seed).map((t) => t.seal))
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const e = realiseEarth()
  console.log('earth — realised by computing poles as a pyramid (7/7)')
  console.log(`  complete=${e.complete} · physicalDatum=${e.physicalDatum} · structuralOnly=${e.structuralOnly}`)
  console.log(`  square: base=${e.square.base} height=${e.square.height} faces=${e.square.faces} apex=${e.square.apex.slice(0, 8)}…`)
  console.log(`  Euler square χ=${e.eulerSquare.chi} (V=${e.eulerSquare.V} E=${e.eulerSquare.E} F=${e.eulerSquare.F})`)
  console.log(`  genus-2: χ=${e.genus2.chi} g=${e.genus2.genus} H₁=${e.genus2.h1} noGapCost=${e.genus2.noGapCost === Infinity ? '∞' : e.genus2.noGapCost}`)
  for (const t of e.tips) console.log(`  tip ${t.tip} @ ${t.phaseDeg}° ω=${t.omega > 0 ? '+ω' : '−ω'}`)
  console.log(`  zenith=${e.zenith.slice(0, 8)}… nadir=${e.nadir.slice(0, 8)}… bothEarths.counterRotates=${e.bothEarths.counterRotates}`)
  console.log(`  navigate N → ${navigateTip('N').tip} · tipGeodetic(N).lon=${tipGeodetic('N').longitude} poleZenith=${atPole(tipGeodetic('zenith'))}`)
}
