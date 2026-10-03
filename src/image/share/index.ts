/**
 * image/share — the image a page shows when it is shared, and the image a formula shows of itself.
 *
 * Two pure SVGs, both animated with SMIL and nothing else — no JavaScript, no upload, no Media row,
 * no request to Payload:
 *
 * - `shareImage` is the Open Graph image of a document: its SEO-plugin title and description over
 *   the deterministic identity animation of its content-uuid ([[image]]). The plugin's meta is what the
 *   page already stored, so the share image costs the tenant nothing — no R2 object, no Media
 *   document — and the same uuid always draws the same picture.
 * - `coilImage` is the RESULT OF THE FORMULA drawn: the rosetta coiled ([[quantum]]/coil), every
 *   trinity a ring of coins turning once one way, every parent ring turning the other way, so the
 *   inner turn rides the outer — the cross animations interact because the rotations compose. The
 *   crosses are the measured faces: width by shared files, opacity by the forward face, dashed where
 *   the cross holds at zero.
 *
 * @standard OGP open-graph-protocol-1.0 (og:image 1200×630)
 * @standard SVG 1.1 / SMIL animation
 * @see ./SKILL.md · src/app/(frontend)/next/share/route.ts
 */
import { PI, algebraCos, algebraLog2, algebraSin, exactMin } from '@/algebra'
import { colorOf } from '@/color'
import { uuidAnimation } from '@/image'
import { coil, coins, type Coil, type CoilLevel } from '@/quantum/coil'
import { escapeXml } from '@/xml/escape'

// OGP's recommended og:image frame. Module-private: an exported literal is seal-debt ([[matrix]]/crack).
const SHARE_WIDTH = 1200
const SHARE_HEIGHT = 630

/** The share frame, as a function so callers read it rather than restate it. */
export const shareFrame = (): { readonly width: number; readonly height: number } => ({ width: SHARE_WIDTH, height: SHARE_HEIGHT })

export interface ShareArgs {
  readonly title: string
  readonly description?: string
  /** A content-uuid — the picture is a pure function of it. */
  readonly uuid: string
  readonly site?: string
}

const clip = (s: string, n: number): string => (s.length > n ? `${s.slice(0, n - 1)}…` : s)

/** Break a line into at most `lines` lines of about `width` characters, on spaces. */
function wrap(text: string, width: number, lines: number): string[] {
  const words = text.split(/\s+/).filter(Boolean)
  const out: string[] = []
  let cur = ''
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > width && cur) {
      out.push(cur)
      cur = w
    } else cur = (cur + ' ' + w).trim()
    if (out.length === lines) break
  }
  if (out.length < lines && cur) out.push(cur)
  if (out.length === lines && words.join(' ').length > out.join(' ').length) {
    // words were dropped: the last line says so, whether or not it is already at the width
    const last = out[lines - 1] as string
    out[lines - 1] = last.length >= width ? clip(last, width) : `${last}…`
  }
  return out.slice(0, lines)
}

/** The inner markup of the identity animation, lifted out of its own <svg> so it can sit inside another. */
function sigil(uuid: string, size: number): string {
  const svg = uuidAnimation(uuid, size)
  return svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')
}

/** The Open Graph image of a document — 1200×630, pure SMIL, same uuid ⇒ same picture. */
export function shareImage(a: ShareArgs): string {
  const title = wrap(clip(a.title, 140), 28, 3)
  const desc = a.description ? wrap(clip(a.description, 220), 60, 2) : []
  const size = 520
  const x = SHARE_WIDTH - size - 40
  const y = (SHARE_HEIGHT - size) / 2
  const titleLines = title.map((l, i) => `<text x="72" y="${200 + i * 72}" font-size="60" font-weight="700" fill="#111">${escapeXml(l)}</text>`).join('')
  const descLines = desc.map((l, i) => `<text x="72" y="${420 + i * 38}" font-size="28" fill="#444">${escapeXml(l)}</text>`).join('')
  const site = a.site ? `<text x="72" y="560" font-size="22" fill="#777" letter-spacing="2">${escapeXml(a.site.toUpperCase())}</text>` : ''
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${SHARE_WIDTH}" height="${SHARE_HEIGHT}" viewBox="0 0 ${SHARE_WIDTH} ${SHARE_HEIGHT}" font-family="system-ui, -apple-system, Segoe UI, Roboto, sans-serif">` +
    `<rect width="100%" height="100%" fill="#fafaf7"/>` +
    `<g transform="translate(${x} ${y})">${sigil(a.uuid, size)}</g>` +
    titleLines +
    descLines +
    site +
    `<text x="${SHARE_WIDTH - 40}" y="${SHARE_HEIGHT - 24}" font-size="14" fill="#999" text-anchor="end">${escapeXml(a.uuid)}</text>` +
    `</svg>`
  )
}

interface Placed {
  readonly node: Coil<string>
  readonly cx: number
  readonly cy: number
}

const key = (labels: readonly string[]): string => labels.join('\u0000')

/**
 * The coil drawn and turning. Each internal node is a <g> that rotates about its own centre — forward
 * at even depth, backward at odd — so a trinity inside a trinity turns against the turn that carries
 * it: the two rotations compose, which is the interaction of the cross animations. Coins are the laws,
 * coloured on the seven-colour spectrum by rosetta position; crosses are the measured edges of the
 * level they belong to.
 */
export function coilImage(rosetta: readonly string[], levels: readonly CoilLevel[], size = 630): string {
  const tree = coil(rosetta)
  const position = new Map(rosetta.map((l, i) => [l, i + 1]))
  const byChildren = new Map(levels.map((l) => [key(l.children.map((c) => c.join('|'))), l]))
  let out = ''
  const render = (node: Coil<string>, cx: number, cy: number, radius: number, depth: number): void => {
    if (node.kind === 'coin') {
      const r = radius * 0.42
      out += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${colorOf(position.get(node.value) ?? 1)}" opacity="0.9"/>`
      out += `<text x="${cx.toFixed(1)}" y="${(cy + r + 16).toFixed(1)}" font-size="${(radius * 0.22).toFixed(0)}" text-anchor="middle" fill="#333">${escapeXml(node.value)}</text>`
      return
    }
    const k = node.children.length
    const placed: Placed[] = node.children.map((c, i) => {
      const ang = -PI / 2 + (2 * PI * i) / k
      return { node: c, cx: cx + radius * algebraCos(ang), cy: cy + radius * algebraSin(ang) }
    })
    const level = byChildren.get(key(node.children.map((c) => coins(c).join('|'))))
    let edges = ''
    if (level) {
      for (const x of level.forward) {
        const a = placed.find((p) => coins(p.node).join('|') === x.a.join('|'))
        const b = placed.find((p) => coins(p.node).join('|') === x.b.join('|'))
        if (!a || !b) continue
        const width = 1 + exactMin(8, algebraLog2(1 + x.shared))
        edges += `<line x1="${a.cx.toFixed(1)}" y1="${a.cy.toFixed(1)}" x2="${b.cx.toFixed(1)}" y2="${b.cy.toFixed(1)}" stroke="#222" stroke-width="${width.toFixed(1)}" opacity="${(0.15 + 0.85 * x.forward).toFixed(2)}"${x.theorem ? ' stroke-dasharray="6 6"' : ''}/>`
      }
    }
    const dur = 18 + depth * 8
    const [from, to] = depth % 2 === 0 ? ['0', '360'] : ['360', '0']
    out += `<g><animateTransform attributeName="transform" type="rotate" from="${from} ${cx.toFixed(1)} ${cy.toFixed(1)}" to="${to} ${cx.toFixed(1)} ${cy.toFixed(1)}" dur="${dur}s" repeatCount="indefinite"/>${edges}`
    // coins first, then the turning sub-coils over them — so a nested group closes against its parent's
    for (const p of placed.filter((q) => q.node.kind === 'coin')) render(p.node, p.cx, p.cy, radius * (k === 2 ? 0.5 : 0.38), depth + 1)
    for (const p of placed.filter((q) => q.node.kind !== 'coin')) render(p.node, p.cx, p.cy, radius * (k === 2 ? 0.5 : 0.38), depth + 1)
    out += '</g>'
  }
  render(tree, size / 2, size / 2, size * 0.34, 0)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" font-family="system-ui, sans-serif"><rect width="100%" height="100%" fill="#fafaf7"/>${out}</svg>`
}
