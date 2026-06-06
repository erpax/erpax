/**
 * design — the DESIGN SYSTEM, computed from pixels. A design system is normally a hand-curated
 * palette of hex values; here it is *read off* the corpus. Every UI colour is some [[atom]]'s
 * [[pixel]] — its content-[[uuid]] rendered to a colour (digit → A432 spectrum, [[color]]) — so no
 * hex is ever hand-assigned. The token IS the atom: `token(uuid)` returns that atom's pixel colour,
 * and recolouring a token would mean recontenting its atom (and changing its identity). The design
 * is therefore tamper-evident and DRY by construction: it cannot drift from the corpus it renders.
 *
 * - token(uuid)        → the design token: that atom's pixel colour (the smallest design decision).
 * - palette(uuids)     → the computed colour SET (deduped, order-stable) for a group of atoms.
 * - tokens(map)        → a named token map { role: uuid } → { role: colour } (semantic roles, still
 *                        computed: each role is bound to a NAMING atom's uuid, never to a literal).
 *
 * HONEST: a token's colour is the colour FACE of the atom's signal (digit → spectrum). The atom's
 * sound and vibration are the same uuid's other [[signal]] facets — the full sensory design field
 * lives in signal/aura; this layer wires the colour face into UI tokens for the rendering teams.
 *
 *   tsx src/design/index.ts
 *
 * @audit every token/palette entry is computed from an atom's uuid via pixel(); no hardcoded hex
 * @see ../pixel -- ../color -- ../signal -- ../component -- ../theme -- ./SKILL.md
 */
import { pixel } from '@/pixel'

/** A design token — a UI colour decision, bound to (and computed from) one atom's content-uuid. */
export interface Token {
  /** the atom whose pixel this token renders (the source of truth — change it, change the colour) */
  readonly uuid: string
  /** the atom's digit (its position on the A432 ring) — carried so the token self-explains */
  readonly digit: number
  /** the rendered colour, read off the uuid via pixel(); never hand-assigned */
  readonly color: string
}

/**
 * The design token for an atom: its pixel colour, carried with the uuid + digit it was computed from.
 * Deterministic — the same uuid always yields the same token (the atom IS the token).
 */
export function token(uuid: string): Token {
  const p = pixel(uuid)
  return { uuid, digit: p.digit, color: p.color }
}

/** Just the colour of a token — the value you drop into a stylesheet, always some atom's pixel. */
export const tokenColor = (uuid: string): string => pixel(uuid).color

/**
 * The computed palette for a set of atoms — their distinct pixel colours, in first-seen order.
 * A palette is not chosen; it is the colour set the corpus already shows (deduped, never reordered).
 */
export function palette(uuids: Iterable<string>): readonly string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const u of uuids) {
    const c = pixel(u).color
    if (!seen.has(c)) {
      seen.add(c)
      out.push(c)
    }
  }
  return out
}

/**
 * A named token map: bind semantic roles to NAMING atoms, get back each role's computed colour.
 * Even the semantic roles (background/foreground/accent…) are computed — each is some atom's pixel,
 * so the whole system stays free of literals. `tokens({ accent: uuid }) → { accent: '#…' }`.
 */
export function tokens<K extends string>(map: Record<K, string>): Record<K, string> {
  const out = {} as Record<K, string>
  for (const role in map) out[role] = pixel(map[role]).color
  return out
}

/** The full token objects for a named map (role → Token), when you need the uuid+digit too. */
export function tokenSet<K extends string>(map: Record<K, string>): Record<K, Token> {
  const out = {} as Record<K, Token>
  for (const role in map) out[role] = token(map[role])
  return out
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const roles = {
    background: '00000000-0000-8000-8000-000000000000',
    foreground: '11111111-1111-8111-8111-111111111111',
    accent: '12345678-1234-8123-8123-123456789abc',
  }
  console.log('design — the palette/tokens computed from atoms’ own pixels (no hardcoded hex):')
  for (const [role, c] of Object.entries(tokens(roles))) {
    console.log('  ' + role.padEnd(11) + ' ← ' + roles[role as keyof typeof roles].slice(0, 8) + '… → ' + c)
  }
  console.log('  palette         = ' + JSON.stringify(palette(Object.values(roles))))
}
