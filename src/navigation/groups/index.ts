/**
 * navigation/groups — hub taxonomy for root atom grouping.
 *
 * Nav · admin.group · sidebar all derive from the atom path prefix tree. Root
 * vocabulary (2432+ flat schema.org words) nests under one-word hub parents so
 * the trie is browsable — never hand-listed menus.
 *
 *   body/abdomen  → group `body`, nav [`body`], route `/body/abdomen/SKILL`
 *   heart         → ROOT_PIVOT (code @/ imports) + body/heart nav barrel
 *
 * @see ./index.ts — ../body — ../medical — ../apply
 */

const normalizeKey = (atomPath: string): string =>
  atomPath
    .replace(/\\/g, '/')
    .replace(/^src\//, '')
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean)
    .join('/')

/** One-word hub parents — exist as atoms with trinity or vocabulary face. */
export const NAV_HUBS = [
  'accounting',
  'admin',
  'agent',
  'agents',
  'ai',
  'body',
  'commerce',
  'computer',
  'config',
  'corpus',
  'education',
  'energy',
  'finance',
  'food',
  'government',
  'health',
  'hotel',
  'law',
  'legal',
  'medical',
  'quantum',
  'retail',
  'science',
  'security',
  'social',
  'tech',
  'travel',
  'vehicle',
] as const

export type NavHub = (typeof NAV_HUBS)[number]

const NAV_HUB_SET = new Set<string>(NAV_HUBS)

/**
 * Infrastructure + code pivots — stay at `src/{name}` because `@/` imports and
 * organ proofs depend on the flat address. Nav shows `hub/name` when a barrel exists.
 */
export const ROOT_PIVOTS = new Set([
  'access',
  'accounting',
  'agent',
  'agents',
  'ai',
  'akashic',
  'atom',
  'auth',
  'body',
  'collapse',
  'config',
  'corpus',
  'diamond',
  'entropy',
  'factory',
  'fields',
  'gate',
  'generate',
  'github',
  'hooks',
  'horo',
  'identity',
  'law',
  'matrix',
  'mcp',
  'merge',
  'navigation',
  'payload',
  'path',
  'quantum',
  'readme',
  'seal',
  'sequence',
  'skill',
  'skills',
  'uuid',
  'vitepress',
  // body organs — canonical code faces (@/heart …)
  'artery',
  'blood',
  'brain',
  'heart',
  'lung',
  'nerve',
  'skin',
  'vein',
])

/** Wave 1 — medical vocabulary folded under medical/ (schema.org Medical* terms). */
export const MEDICAL_WAVE_1 = [
  'allergies',
  'clinic',
  'condition',
  'contraindication',
  'diagnosis',
  'disease',
  'drug',
  'guideline',
  'hospital',
  'indication',
  'patient',
  'physician',
  'prescription',
  'procedure',
  'specialty',
  'symptom',
  'surgery',
  'technique',
  'therapy',
  'treatment',
  'trial',
] as const

/** Wave 1 — computer vocabulary folded under computer/ (schema.org Computer* terms). */
export const COMPUTER_WAVE_1 = [
  'component',
  'hardware',
  'language',
  'memory',
  'network',
  'processor',
  'screen',
  'software',
  'storage',
  'store',
] as const

/** Wave 1 — root vocabulary dupes folded into body/ (hub child becomes canonical). */
export const BODY_FOLD_ROOT = [
  'abdomen',
  'anatomy',
  'arm',
  'foot',
  'hand',
  'head',
  'leg',
] as const

/** True when the first segment is a registered nav hub. */
export function isNavHub(segment: string): segment is NavHub {
  return NAV_HUB_SET.has(segment)
}

/**
 * Drop bare root `leaf` from nav when `hub/leaf` is already in the path set —
 * avoids duplicate sidebar entries for pivot + canonical pairs.
 */
export function navPathsForGrouping(atomPaths: readonly string[]): readonly string[] {
  const all = new Set(atomPaths.map(normalizeKey).filter(Boolean))
  const out: string[] = []
  for (const raw of atomPaths) {
    const key = normalizeKey(raw)
    if (!key) continue
    const segs = key.split('/')
    if (segs.length === 1) {
      const leaf = segs[0]!
      if (ROOT_PIVOTS.has(leaf)) {
        out.push(key)
        continue
      }
      const nested = [...NAV_HUBS].some((hub) => all.has(`${hub}/${leaf}`))
      if (nested) continue
    }
    out.push(key)
  }
  return out
}
