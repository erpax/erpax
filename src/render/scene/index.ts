import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import * as THREE from 'three'
import { divisorsOf, mirrorReport } from '@/duality/mirror'
import { chainLeaf } from '@/merge'
import { boostT, causalCharacter, reversingFrame, sealable } from '@/quantum/interval'

/**
 * render/scene — the fourth projection: a theorem, as geometry.
 *
 * [[render]] already projects one content-uuid to colour, sound and vibration. This adds the
 * geometric face, and it obeys the same law: the scene is DERIVED from the very function the
 * kernel checked, never drawn beside it. A figure a human draws can disagree with its theorem;
 * a figure computed from `causalCharacter` cannot, because it has no other source.
 *
 * @see ./SKILL.md
 */

export interface Vec3 {
  readonly x: number
  readonly y: number
  readonly z: number
}

export interface ScenePoint {
  readonly id: string
  readonly at: Vec3
  /** Hex colour. Carried as data so the scene is renderable by anything, not only three. */
  readonly colour: string
  readonly label?: string
}

export interface SceneEdge {
  readonly from: Vec3
  readonly to: Vec3
  readonly colour: string
  readonly kind: 'cone' | 'pair' | 'axis' | 'worldline'
}

export interface Scene {
  readonly name: string
  /** The Lean theorem this figure is derived from — checked to exist by [[quantum]]/interval. */
  readonly theorem: string
  readonly points: readonly ScenePoint[]
  readonly edges: readonly SceneEdge[]
  /** What the picture does NOT establish. Carried IN the scene so a figure cannot shed it. */
  readonly caption: string
}

/** Timelike · null · spacelike, as three colours. Order is the only thing a colour means here. */
const CONE_COLOUR = { timelike: '#3ddc84', null: '#ffd23f', spacelike: '#ff5c5c' } as const

const FIGURE_BOUNDARY =
  'a figure is an ILLUSTRATION, never a proof — it is computed from the same function the kernel ' +
  'checked, so it cannot disagree with the theorem, but nothing is established by looking at it'

/**
 * The light cone, plotted from `causalCharacter` itself.
 *
 * x horizontal, t vertical, z carries a second spatial axis so the cone is a cone rather than a
 * pair of lines. Every point's colour is the function's own answer for that point.
 */
export function lightcone(n = 8): Scene {
  const points: ScenePoint[] = []
  for (let t = -n; t <= n; t++) {
    for (let x = -n; x <= n; x++) {
      const c = causalCharacter(t, x)
      points.push({ id: `${t}:${x}`, at: { x, y: t, z: 0 }, colour: CONE_COLOUR[c], label: c })
    }
  }
  // the cone's own generators are the null separations — read off, not drawn in
  const edges: SceneEdge[] = []
  for (const s of [1, -1]) {
    edges.push({ from: { x: 0, y: 0, z: 0 }, to: { x: s * n, y: n, z: 0 }, colour: CONE_COLOUR.null, kind: 'cone' })
    edges.push({ from: { x: 0, y: 0, z: 0 }, to: { x: s * n, y: -n, z: 0 }, colour: CONE_COLOUR.null, kind: 'cone' })
    edges.push({ from: { x: 0, y: 0, z: 0 }, to: { x: 0, y: n, z: s * n }, colour: CONE_COLOUR.null, kind: 'cone' })
    edges.push({ from: { x: 0, y: 0, z: 0 }, to: { x: 0, y: -n, z: s * n }, colour: CONE_COLOUR.null, kind: 'cone' })
  }
  edges.push({ from: { x: 0, y: -n, z: 0 }, to: { x: 0, y: n, z: 0 }, colour: '#8899aa', kind: 'axis' })
  return {
    name: 'light cone',
    theorem: 'timelike_invariant',
    points,
    edges,
    caption: `green is sealable (causal order absolute), red is not. ${FIGURE_BOUNDARY}`,
  }
}

/**
 * The order reversal, drawn as two worldlines — the one figure that shows WHY a ledger may not
 * seal on a spacelike pair. Both segments are the boost's own output.
 */
export function reversal(t = 3, x = 7): Scene {
  const r = reversingFrame(t, x)
  const edges: SceneEdge[] = [
    { from: { x: 0, y: 0, z: 0 }, to: { x, y: t, z: 0 }, colour: CONE_COLOUR.spacelike, kind: 'worldline' },
  ]
  const points: ScenePoint[] = [
    { id: 'A', at: { x: 0, y: 0, z: 0 }, colour: '#ffffff', label: 'A' },
    { id: 'B', at: { x, y: t, z: 0 }, colour: '#ffffff', label: `B (Δt=${t} here)` },
  ]
  if (r !== null) {
    // the same pair as the boosted frame sees it: B is now BEFORE A
    points.push({ id: "B'", at: { x, y: r.boosted, z: 0 }, colour: CONE_COLOUR.spacelike, label: `B' (Δt=${r.boosted} at β=${r.p}/${r.q})` })
    edges.push({ from: { x: 0, y: 0, z: 0 }, to: { x, y: r.boosted, z: 0 }, colour: '#ff9f43', kind: 'worldline' })
  }
  return {
    name: 'order reversal',
    theorem: 'spacelike_order_reverses',
    points,
    edges,
    caption: `sealable=${sealable(t, x)}; a subluminal observer sees B before A. ${FIGURE_BOUNDARY}`,
  }
}

/**
 * The involution as the hyperbola `d` at `(d, n/d)`, where the mirror is the line y = x.
 *
 * This was first a ring laid out with host trig, and [[algebra]]/host refused it — theorems are
 * algebra, and host trig is a rounding wearing a coordinate. The refusal produced the better
 * figure: on the hyperbola the involution IS reflection across the diagonal, exact in integers,
 * and the harmonic element is exactly where the curve meets the mirror line. The picture stopped
 * illustrating the theorem and became it.
 */
export function mirror(n = 432): Scene {
  const ds = divisorsOf(n)
  // computed FROM n. This first called `anchorMirror()`, which is hardcoded to 432 — so the
  // parameter was accepted and ignored, and `mirror(36)` silently drew 432. A signature that
  // takes an argument it does not use is a lie the type system cannot see; a test caught it.
  const r = mirrorReport(ds, (d) => n / d)
  const at = (d: number): Vec3 => ({ x: d, y: n / d, z: 0 })
  const fixed = new Set(r.fixed)
  const span = ds[ds.length - 1] ?? 1
  return {
    name: 'divisor mirror',
    theorem: 'Duality.Mirror.fixed_or_paired',
    points: ds.map((d) => ({ id: String(d), at: at(d), colour: fixed.has(d) ? '#ffd23f' : '#3ddc84', label: String(d) })),
    edges: [
      // the mirror itself: y = x. A point ON it is its own reflection — that is the whole theorem
      { from: { x: 0, y: 0, z: 0 }, to: { x: span, y: span, z: 0 }, colour: '#8899aa', kind: 'axis' as const },
      ...r.pairs.map(([x, y]) => ({ from: at(x), to: at(y), colour: '#5b8def', kind: 'pair' as const })),
    ],
    caption: `${r.pairs.length} transpositions reflected across y = x, ${r.fixed.length} harmonic (ON the line). ${FIGURE_BOUNDARY}`,
  }
}

/** Every figure this corpus can render, each naming the theorem it is derived from. */
export const figures = (): Scene[] => [lightcone(), reversal(), mirror()]

/**
 * Every theorem name the kernel files actually state, bare and namespace-qualified.
 *
 * Written because the first `mirror()` here cited `Mirror.involution_partitions` — a theorem
 * that does not exist, invented minutes after building the gate for exactly that defect in
 * prose ([[rules]]/prose). A caption is a citation, and a citation is checked or it is fiction.
 */
export function statedTheorems(cwd: string = process.cwd()): Set<string> {
  const names = new Set<string>()
  const dir = join(cwd, 'src/verify/lean')
  let files: string[] = []
  try {
    files = readdirSync(dir).filter((f) => f.endsWith('.lean'))
  } catch {
    return names
  }
  for (const f of files) {
    const text = readFileSync(join(dir, f), 'utf8')
    const ns = /^namespace\s+([A-Za-z_][\w.]*)/m.exec(text)?.[1]
    for (const m of text.matchAll(/^(?:theorem|lemma)\s+([A-Za-z_]\w*)/gm)) {
      names.add(m[1]!)
      if (ns) names.add(`${ns}.${m[1]!}`)
    }
  }
  return names
}

/** Figures citing a theorem no kernel file states. Zero is a theorem, not a ratchet. */
export function unbackedFigures(cwd: string = process.cwd()): Scene[] {
  const stated = statedTheorems(cwd)
  return figures().filter((f) => !stated.has(f.theorem))
}

/** Fails closed: a picture captioned with a theorem nobody proved is the worst kind of figure. */
export function assertFiguresBacked(cwd: string = process.cwd()): void {
  const bad = unbackedFigures(cwd)
  if (bad.length === 0) return
  throw new Error(
    `✖ render/scene — ${bad.length} figure(s) cite a theorem no .lean file states:\n` +
      bad.map((f) => `  ${f.name} → ${f.theorem}`).join('\n'),
  )
}

/**
 * A scene's content-uuid, so a figure in a paper is ADDRESSABLE and cannot be swapped silently.
 *
 * The caption is inside the address on purpose: a figure whose boundary sentence is edited is a
 * different figure, and a citation must not survive that edit.
 */
export const sceneSeal = (s: Scene): string =>
  chainLeaf({ name: s.name, theorem: s.theorem, points: s.points, edges: s.edges, caption: s.caption }, '')

/**
 * Bind a scene to three.js. Pure construction — no renderer, no canvas, no GPU — so the binding
 * is testable headlessly and a build never needs a display.
 */
export function toThree(s: Scene): THREE.Group {
  const g = new THREE.Group()
  g.name = s.name
  const geom = new THREE.SphereGeometry(0.12, 8, 8)
  for (const p of s.points) {
    const m = new THREE.Mesh(geom, new THREE.MeshBasicMaterial({ color: p.colour }))
    m.position.set(p.at.x, p.at.y, p.at.z)
    m.name = p.id
    g.add(m)
  }
  for (const e of s.edges) {
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(e.from.x, e.from.y, e.from.z),
        new THREE.Vector3(e.to.x, e.to.y, e.to.z),
      ]),
      new THREE.LineBasicMaterial({ color: e.colour }),
    )
    line.name = e.kind
    g.add(line)
  }
  g.userData = { theorem: s.theorem, caption: s.caption, seal: sceneSeal(s) }
  return g
}

/**
 * The same scene as static SVG — no JS, no GPU, no canvas.
 *
 * `toThree` and this are TWO PROJECTIONS OF ONE SCENE, which is [[render]]'s existing law (one
 * content-uuid, N views, derived never stored) applied to geometry. The interactive figure and
 * the one a crawler indexes cannot disagree, because neither holds any geometry of its own.
 *
 * The audit that produced this: the hero surfaces carry ZERO animation primitives — no
 * `<animate>`, no keyframes, no rAF, no framer, no gsap — so there was nothing to make
 * three-compliant. A shared scene is the thing worth having instead.
 */
export function toSvg(s: Scene, size = 640): string {
  const xs = s.points.map((p) => p.at.x)
  const ys = s.points.map((p) => p.at.y)
  // no host Math: [[algebra]]/host refuses it here, and every one of these is a fold or a
  // truncation that the carrier already gives
  const least = (ns: readonly number[], seed: number): number => ns.reduce((a, b) => (b < a ? b : a), seed)
  const most = (ns: readonly number[], seed: number): number => ns.reduce((a, b) => (b > a ? b : a), seed)
  const cent = (v: number): number => ((v * 100 + (v < 0 ? -0.5 : 0.5)) | 0) / 100
  const lo = { x: least(xs, 0), y: least(ys, 0) }
  const hi = { x: most(xs, 1), y: most(ys, 1) }
  const wide = hi.x - lo.x
  const tall = hi.y - lo.y
  const span = (wide > tall ? wide : tall) || 1
  // y is flipped: SVG counts downward, and t counts up
  const px = (v: number): number => cent(((v - lo.x) / span) * size)
  const py = (v: number): number => cent((1 - (v - lo.y) / span) * size)
  const esc = (t: string): string => t.replace(/[<>&"]/g, (c) => `&#${c.charCodeAt(0)};`)
  const body = [
    ...s.edges.map((e) => `<line x1="${px(e.from.x)}" y1="${py(e.from.y)}" x2="${px(e.to.x)}" y2="${py(e.to.y)}" stroke="${e.colour}" stroke-width="1.5" data-kind="${e.kind}"/>`),
    ...s.points.map((p) => `<circle cx="${px(p.at.x)}" cy="${py(p.at.y)}" r="3" fill="${p.colour}"><title>${esc(p.label ?? p.id)}</title></circle>`),
  ].join('')
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" role="img" ` +
    `aria-label="${esc(s.name)}" data-theorem="${esc(s.theorem)}" data-seal="${sceneSeal(s)}">` +
    `<title>${esc(s.name)}</title><desc>${esc(s.caption)}</desc>${body}</svg>`
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  for (const s of figures()) {
    const g = toThree(s)
    console.log(`${s.name.padEnd(16)} theorem=${s.theorem.padEnd(30)} points=${s.points.length} edges=${s.edges.length} objects=${g.children.length}`)
    console.log(`  seal ${sceneSeal(s)}`)
  }
  console.log(`\nfigures citing an unstated theorem: ${unbackedFigures().length} (zero is a theorem)`)
  console.log(`boost check — β=3/8 on (t=5,x=2): Δt' = ${boostT(3, 8, 5, 2)}`)
}
