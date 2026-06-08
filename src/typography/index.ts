/**
 * typography — the [[form]] facet of every atom, made computational.
 *
 * Two organs, one law. (1) COVERAGE: the [[vitepress]] typographic feature-set a
 * SKILL.md renders with (headings, bold, code, links, lists, tables, blockquotes,
 * containers, math) and the fraction a page uses. (2) The TYPOGRAPHY GUARDIAN +
 * the self-computing navigational/search INDEX: typography is a [[gate]] and a
 * [[guardian]] at every scale ([[fractal]]) — the typographic FORM of every
 * SKILL.md (frontmatter valid · heading lattice present · [[links]] resolve) is a
 * single fail-closed axis, ratcheted like [[law]]/folder so it can never get worse
 * yet never retroactively breaks the in-flight corpus; and that same typographic
 * structure IS a content-addressed ([[uuid]]) index over the corpus — derived
 * deterministically from content, regenerable, split by folder for minimum memory
 * (load only the facet you need) and maximum tamper-[[cost]] (the index root folds
 * in every atom's content-uuid across all folders, so no single folder is a
 * forgeable point; see [[purity]] · [[analytics]] max-tamper-cost · [[blockchain]]).
 *
 *   tsx src/typography/index.ts            # print the guardian verdict + index root
 *
 * @standard CommonMark + the vitepress markdown extensions
 * @standard ISO/IEC 25010:2023 §5.5 testability — the guardian decision is a pure fn
 * @see ../vitepress -- ../search -- ../guardian -- ../seal -- ../uuid/matrix -- ./SKILL.md
 */
import { guardian } from '@/guardian'
import { seal, type SealVerdict } from '@/seal'
import { toUuid, merge } from '@/uuid/matrix'

// ───────────────────────── coverage (the rendered feature-set) ─────────────────────────

export const FEATURES = [
  'heading',
  'bold',
  'italic',
  'code',
  'codeblock',
  'link',
  'list',
  'table',
  'blockquote',
  'container',
  'math',
] as const

export type Feature = (typeof FEATURES)[number]

const DETECT: Record<Feature, RegExp> = {
  heading: /^#{1,6}\s/m,
  bold: /\*\*[^*]+\*\*/,
  italic: /(?:^|[^*])\*[^*\s][^*]*\*/m,
  code: /`[^`]+`/,
  codeblock: /```/,
  link: /\[[^\]]+\]\([^)]+\)/,
  list: /^\s*[-*+]\s/m,
  table: /^\|.*\|/m,
  blockquote: /^>\s/m,
  container: /^:::/m,
  math: /\$[^$]+\$/,
}

/** Which typographic features the markdown actually uses. */
export const featuresUsed = (md: string): Feature[] => FEATURES.filter((f) => DETECT[f].test(md))

/** Typographic coverage: fraction of the feature-set used (0..1). */
export const coverage = (md: string): number => featuresUsed(md).length / FEATURES.length

// ───────────────────────── the typographic form of one page ─────────────────────────

/** A SKILL.md page as the guardian/index see it: its path (folder, rel to src) + raw bytes. */
export interface SkillPage {
  readonly path: string
  readonly text: string
}

const FRONTMATTER = /^---\n([\s\S]*?)\n---/
// Fresh (per-call) global regexes — a module-level global regex would leak its
// lastIndex between .test() and .matchAll() (a stateful-regex bug). Stateless here.
const headingRe = (): RegExp => /^(#{1,6})\s+(.+?)\s*$/gm
const wikilinkRe = (): RegExp => /\[\[([^\]]+)\]\]/g

/** Canonical link/leaf key — identical to aura/scan.mjs `norm` so resolution agrees across gates. */
export const norm = (s: string): string => s.toLowerCase().replace(/[-_]/g, '')

/** The H1 (`# title`) text of a page, or '' when none. */
export const titleOf = (text: string): string => {
  for (const m of text.matchAll(headingRe())) if (m[1]!.length === 1) return m[2]!.trim()
  return ''
}

/** Every heading's text, in document order — the page's navigational lattice. */
export const headingsOf = (text: string): string[] => [...text.matchAll(headingRe())].map((m) => m[2]!.trim())

/** Strip the frontmatter block, then fenced + inline code — so links/terms read prose only. */
const prose = (text: string): string =>
  text.replace(FRONTMATTER, ' ').replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ')

/** The outgoing [[wikilink]] targets of a page, normalized to their resolvable leaf. */
export const linksOf = (text: string): string[] => {
  const out = new Set<string>()
  for (const m of prose(text).matchAll(wikilinkRe())) {
    const leaf = m[1]!.split('|')[0]!.split('/').pop()
    if (leaf) out.add(norm(leaf))
  }
  return [...out].sort()
}

/** The search terms of a page: unique, sorted prose tokens (≥3 letters) — the search facet. */
export const termsOf = (text: string): string[] => {
  const out = new Set<string>()
  for (const w of prose(text).toLowerCase().match(/[a-z][a-z]{2,}/g) ?? []) out.add(w)
  return [...out].sort()
}

export interface PageForm {
  readonly frontmatter: boolean
  readonly named: boolean
  readonly described: boolean
  readonly heading: boolean
}

/** The four typographic-form facts of a page (frontmatter present · name · description · a heading). */
export const pageForm = (text: string): PageForm => {
  const m = text.match(FRONTMATTER)
  const fm = m ? m[1]! : ''
  return {
    frontmatter: !!m,
    named: /^name:\s*\S/m.test(fm),
    described: /^description:\s*\S/m.test(fm),
    heading: /^#{1,6}\s/m.test(text),
  }
}

// ───────────────────────── the GUARDIAN (a baseline ratchet) ─────────────────────────

export interface TypographyViolation {
  readonly path: string
  readonly reasons: readonly string[]
}

/**
 * Every page whose typographic FORM is impure: missing frontmatter / name /
 * description / heading, or carrying a [[link]] that does not resolve. `resolves`
 * is the corpus leaf-set predicate (same rule as aura) — pure: pages-in → list-out,
 * so the decision is regression-locked and identical wherever the leaf-set is.
 */
export function formViolations(pages: readonly SkillPage[], resolves: (leaf: string) => boolean): TypographyViolation[] {
  const out: TypographyViolation[] = []
  for (const p of pages) {
    const reasons: string[] = []
    const f = pageForm(p.text)
    if (!f.frontmatter) reasons.push('no-frontmatter')
    else {
      if (!f.named) reasons.push('missing-name')
      if (!f.described) reasons.push('missing-description')
    }
    if (!f.heading) reasons.push('no-heading')
    for (const leaf of linksOf(p.text)) if (!resolves(leaf)) reasons.push('dead-link:' + leaf)
    if (reasons.length) out.push({ path: p.path, reasons })
  }
  return out.sort((a, b) => a.path.localeCompare(b.path))
}

/**
 * THE COMMITTED CEILING — the live count of typographic-form violations, derived
 * from the tree (run `tsx src/typography/index.ts`), NOT hand-guessed. Mirrors
 * [[law]]/folder's NAME_BASELINE: a ratchet, never a hard purity===0. The corpus
 * carries an in-flight backlog (atoms being authored right now by parallel
 * workers); freezing the baseline at the live count means the typography axis
 * CANNOT GET WORSE — every NEW malformed SKILL.md reddens the guardian — while no
 * existing atom is retroactively broken. Lower this literal in the same commit
 * that fixes pages, so it only ever ratchets DOWN. Zero ⇒ tamper-[[cost]] → ∞.
 */
export const TYPOGRAPHY_BASELINE = 0

/**
 * The typography GUARDIAN sealed: one fail-closed axis (the typographic form of
 * every SKILL.md) crossed into a [[seal]]. Reuses @/guardian + @/seal (no bespoke
 * ratchet logic) — sealed iff the live violation count holds at/below the baseline.
 */
export function typographyGuardian(
  violations: number,
  baseline: number = TYPOGRAPHY_BASELINE,
): SealVerdict {
  return seal([guardian({ axis: 'typography', violations, baseline })])
}

// ───────────────────────── the self-computing INDEX (content-addressed) ─────────────────────────

export interface TypographyEntry {
  readonly atom: string
  readonly path: string
  /** content-[[uuid]] of the SKILL.md bytes — same content ⇒ same id (self-computing). */
  readonly uuid: string
  readonly title: string
  readonly headings: readonly string[]
  readonly links: readonly string[]
  readonly terms: readonly string[]
}

export interface TypographyIndex {
  readonly entries: readonly TypographyEntry[]
  /** the whole index's single content-address: the fold of every entry uuid (the matrix root). */
  readonly root: string
  readonly atoms: number
}

const leafOf = (path: string): string => norm(path.split('/').pop() ?? path)

/** One page → one content-addressed index entry (nav lattice + search terms + content-uuid). */
export const indexEntry = (page: SkillPage): TypographyEntry => ({
  atom: leafOf(page.path),
  path: page.path,
  uuid: toUuid(Buffer.from(page.text, 'utf8')),
  title: titleOf(page.text),
  headings: headingsOf(page.text),
  links: linksOf(page.text),
  terms: termsOf(page.text),
})

/**
 * Fold a set of content-uuids to ONE 128-bit address (the Merkle root, the same
 * `merge` the matrix uses). Sorted ⇒ order-independent ⇒ deterministic. Empty ⇒ ''.
 */
export const indexRoot = (uuids: readonly string[]): string => {
  const s = [...uuids].sort()
  if (s.length === 0) return ''
  return s.reduce((acc, u) => merge(acc, u))
}

/**
 * Build the self-computing navigational + search index over the corpus. Pure:
 * pages-in → index-out, entries sorted by path, the root a content-fold of every
 * entry uuid — so re-running on the same content yields a byte-identical index
 * (deterministic), and the root changes iff any atom's content changes
 * (tamper-evident). Fractal: the same builder run on any sub-tree is itself a
 * complete index of that sub-tree.
 */
export function buildIndex(pages: readonly SkillPage[]): TypographyIndex {
  const entries = pages.map(indexEntry).sort((a, b) => a.path.localeCompare(b.path))
  return { entries, root: indexRoot(entries.map((e) => e.uuid)), atoms: entries.length }
}

/**
 * Split the index by folder for MINIMUM MEMORY + MAXIMUM TAMPER-COST. The key is
 * the top `depth` path segments; a consumer loads only the partition (facet) it
 * needs (lazy, content-addressed dedup) instead of the whole corpus. Each folder
 * also carries its own `partitionRoot`; the whole-index `root` folds in every
 * atom's uuid, so the index has no single forgeable point — tampering any one
 * folder flips its sub-root AND the whole root ([[purity]] · max-tamper-[[cost]]).
 */
export function partitionByFolder(index: TypographyIndex, depth = 1): Record<string, TypographyEntry[]> {
  const out: Record<string, TypographyEntry[]> = {}
  for (const e of index.entries) {
    const key = e.path.split('/').slice(0, depth).join('/')
    ;(out[key] ??= []).push(e)
  }
  return out
}

/** The content-address (sub-root) of one folder partition — fold of its entry uuids. */
export const partitionRoot = (entries: readonly TypographyEntry[]): string => indexRoot(entries.map((e) => e.uuid))

// ───────────────────────── thin CLI (the live tree → verdict + root) ─────────────────────────

if (import.meta.url === 'file://' + process.argv[1]) {
  void (async () => {
    const { readdirSync, readFileSync, statSync } = await import('node:fs')
    const { join, relative } = await import('node:path')
    const SRC = join(process.cwd(), 'src')
    const pages: SkillPage[] = []
    const leaves = new Set<string>()
    const walk = (dir: string): void => {
      for (const e of readdirSync(dir)) {
        if (e.startsWith('.') || e === 'node_modules') continue
        const p = join(dir, e)
        let st
        try {
          st = statSync(p)
        } catch {
          continue
        }
        if (st.isDirectory()) walk(p)
        else if (e === 'SKILL.md') {
          const folder = relative(SRC, dir)
          pages.push({ path: folder, text: readFileSync(p, 'utf8') })
          leaves.add(leafOf(folder))
        }
      }
    }
    walk(SRC)
    const resolves = (leaf: string): boolean => leaves.has(leaf)
    const v = formViolations(pages, resolves)
    const verdict = typographyGuardian(v.length)
    const idx = buildIndex(pages)
    const parts = partitionByFolder(idx)
    console.log(`typography — ${pages.length} SKILL.md scanned`)
    console.log(`  guardian: ${v.length} form violation(s) · baseline ${TYPOGRAPHY_BASELINE} — ` + verdict.guardians[0]!.reason)
    console.log('  ' + (verdict.sealed ? '✓ typography sealed' : '✗ typography UNSEALED'))
    console.log(`  index: ${idx.atoms} atoms · root ${idx.root} · ${Object.keys(parts).length} folder partitions (min-memory / max-tamper)`)
    if (v.length) for (const x of v.slice(0, 20)) console.log('    ✗ ' + x.path + ' → ' + x.reasons.join(', '))
    process.exit(verdict.sealed ? 0 : 1)
  })()
}
