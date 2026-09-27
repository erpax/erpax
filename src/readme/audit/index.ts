/**
 * readme/audit — the README is generated, so its redundancy is a bug in the generator.
 *
 * Two shapes are decidable with no noise floor at all, and both were live in the root README:
 * a line printing one clause twice, and a ranked list naming one item twice. See ./SKILL.md.
 *
 * @standard ISO/IEC 25010:2023 §5.6 — maintainability: a copied answer is a second source of truth
 * @standard ISO 19011:2018 §6.4 — audit evidence: a restated figure must agree with its source
 */
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { deriveSeoMeta, auditSeo, type SeoAudit } from '@/website/marketing'

export type RedundancyKind = 'item' | 'echo'

export interface ReadmeRedundancy {
  /** 1-indexed line in the rendered markdown. */
  readonly line: number
  readonly kind: RedundancyKind
  /** The value printed more than once. */
  readonly value: string
  readonly excerpt: string
}

/** Markdown table cells, or the whole line when it is not a table row. */
const pipeCells = (line: string): string[] =>
  /^\s*\|/.test(line)
    ? line.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|')
    : [line]

/** Every `` `code span` `` in a fragment — the only items this gate compares. */
const codeSpans = (s: string): string[] => [...s.matchAll(/`([^`]+)`/g)].map((m) => m[1]!.trim()).filter((x) => x !== '')

/** A table's alignment row — every "cell" is dashes, so it repeats by construction. */
const isSeparator = (line: string): boolean => /^\s*\|[\s:|-]+\|\s*$/.test(line)

/** The declared floor for a fragment every item of a list shares. Below it, coincidence swamps it. */
const MIN_SHARED = 12

/** The longest prefix common to every string, '' when they share none. */
const commonPrefix = (xs: readonly string[]): string => {
  const [first = ''] = xs
  let n = first.length
  for (const x of xs) {
    let i = 0
    while (i < n && i < x.length && x[i] === first[i]) i++
    n = i
  }
  return first.slice(0, n)
}

/** The longest suffix common to every string, '' when they share none. */
const commonSuffix = (xs: readonly string[]): string => {
  const rev = (s: string): string => [...s].reverse().join('')
  return rev(commonPrefix(xs.map(rev)))
}

/**
 * Redundancy in one rendered markdown document — pure, so the generator is testable without fs.
 *
 * Two shapes, both scoped to a STRUCTURED list — a `·`-joined run of code spans, which is what a
 * generator's `.map().join(' · ')` emits. That scope is the whole reason the number is honest:
 *
 * - **`item`** — the same code span named twice in one list. The live README's horo ring read
 *   ``| 9 | unity | 17 | `identity` · `whole` · … · `whole` |`` because the ranking keyed on the
 *   leaf word and two distinct atoms share one; a real facet lost the slot.
 * - **`echo`** — every item in a list sharing a long prefix or suffix, so the list states that
 *   fragment N times to say it once. `## payload` printed `4.0.0-internal.38b7f1d` twenty times.
 *
 * Three refusals keep this at zero noise, and the first two are false positives this gate produced
 * against the live README before it was narrowed:
 *
 * - **A `·` INSIDE a table cell is not a list.** The digit table reads
 *   ``| 0 | `1` | 0° | `8` | 9 | `1` | C (Do) · 256 Hz | C `#00aeef` |`` — the digit and its own
 *   reverse coincide, and they must. Splitting the line on `·` read two cells as one list and
 *   reported a lawful table as duplication. Cells are split on the pipe FIRST.
 * - **FREE PROSE IS NOT JUDGED.** A first pass hunted the longest fragment repeated anywhere in a
 *   line and returned six findings, all lawful: `VERIFIABLE in polynomial time` beside
 *   `SOLVABLE in polynomial time` IS the statement of P vs NP, `opennextjs-cloudflare build &&
 *   opennextjs-cloudflare preview` is two commands, and `[`url`](url)` is a self-link. Separating
 *   those from a generator printing one clause twice needs a list of exemptions, and four
 *   instruments in this corpus have already been retired for a noise floor above their signal.
 * - **A two-item list cannot echo.** Two entries sharing a suffix is a rhyme, not a restatement;
 *   `echo` needs three, so the finding is about a LIST rather than a pair.
 *
 * @invariant a document with no repeated list item and no shared-fragment list returns []
 * @invariant findings carry a 1-indexed line, so a reader can go straight to it
 */
export function redundantLines(md: string): ReadmeRedundancy[] {
  const out: ReadmeRedundancy[] = []
  md.split('\n').forEach((line, i) => {
    if (isSeparator(line)) return
    const at = i + 1
    const excerpt = line.trim().slice(0, 120)
    for (const cell of pipeCells(line)) {
      if (!cell.includes('·')) continue
      const items = codeSpans(cell)
      const seen = new Set<string>()
      for (const it of items) {
        if (seen.has(it)) out.push({ line: at, kind: 'item', value: it, excerpt })
        seen.add(it)
      }
      if (items.length < 3) continue
      for (const shared of [commonPrefix(items), commonSuffix(items)]) {
        if (shared.trim().length >= MIN_SHARED) {
          out.push({ line: at, kind: 'echo', value: shared.trim(), excerpt })
        }
      }
    }
  })
  return out
}

/** The root README's redundancy. Impure: reads the generated face from disk. */
export function readmeRedundancy(cwd: string = process.cwd()): ReadmeRedundancy[] {
  const p = join(cwd, 'README.md')
  return existsSync(p) ? redundantLines(readFileSync(p, 'utf8')) : []
}

/**
 * Fails closed. The ceiling is **0 and it is a theorem**, not a ratchet toward one: a generated
 * document has no reason to print one clause twice, and a list ranked by a measure has no reason
 * to name one thing twice — the second entry is a slot a distinct item should have had.
 */
export function assertReadmeFolded(cwd: string = process.cwd(), ceiling = 0): void {
  const found = readmeRedundancy(cwd)
  if (found.length <= ceiling) return
  const lines = found.map((f) => `  README.md:${f.line} ${f.kind} repeats \`${f.value}\` — ${f.excerpt}`)
  throw new Error(
    `readme/audit — ${found.length} redundancy(ies), ceiling ${ceiling}:\n${lines.join('\n')}\n` +
      'The README is GENERATED: fix src/readme/compute.ts (or the model it reads), never the file.',
  )
}

/**
 * The README's SEO, audited by the SITE's own functions — one derivation, two faces.
 *
 * "The more SEO-optimised the code, the more SEO-optimised the README and the site" is only true
 * when both faces pass through the SAME derivation. `deriveSeoMeta` and `auditSeo` are what every
 * generated site page already uses ([[website]]/marketing), so improving them moves the README and
 * the site together and neither can drift from the other. A second SEO derivation written for the
 * README would be [[rules]]/copy's camouflage: one truth at two addresses, with nobody able to say
 * which of them is maintained.
 *
 * The body is the RENDERED file, so keyword density is measured against what a crawler actually
 * reads — the check the receipt leg cannot make, because the receipt is part of that body.
 */
export function readmeSeo(cwd: string = process.cwd()): SeoAudit {
  const p = join(cwd, 'README.md')
  const body = existsSync(p) ? readFileSync(p, 'utf8') : ''
  const pkgPath = join(cwd, 'package.json')
  const pkg = existsSync(pkgPath)
    ? (JSON.parse(readFileSync(pkgPath, 'utf8')) as { name?: string; description?: string })
    : {}
  const meta = deriveSeoMeta({ title: pkg.name ?? 'erpax', description: pkg.description ?? '', axis: 'standard' })
  return auditSeo(meta, body)
}

/**
 * Fails closed on a MAJOR SEO issue only.
 *
 * `minor` is deliberately not gated: `auditSeo` calls a description under 70 characters and a title
 * over 60 minor because they cost click-through rather than indexing, and a gate that blocks a push
 * over a truncated SERP title is one that gets bypassed. A `major` issue — no keywords derived at
 * all — means the page is not addressable by a crawler, which is the same defect as an atom with no
 * lawful path ([[rules]]/invisible).
 */
export function assertReadmeSeo(cwd: string = process.cwd()): void {
  const a = readmeSeo(cwd)
  const major = a.issues.filter((i) => i.severity === 'major')
  if (major.length === 0) return
  throw new Error(
    `readme/audit — ${major.length} major SEO issue(s):\n` +
      major.map((i) => `  ${i.check} — ${i.detail}`).join('\n') +
      '\nThe README is GENERATED and its metadata comes from `package.json` via `deriveSeoMeta`.',
  )
}
