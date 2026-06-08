/**
 * law/folder/word — every referenced word is a folder with code.
 *
 * Extends folder law: vocabulary-only atoms (SKILL.md without index.ts + test.ts)
 * are violations until matter lands or a hub pivot nests the word under its parent.
 *
 *   wordFolderViolations(cwd)  — scan bonds/wikilinks vs filesystem
 *   wordDiamondViolations(cwd) — useless words without complete diamond (trinity+sealed+crossed)
 *   matterForWord(word)        — pivot hub/word or collapse to root canonical
 *
 * @see ./index.ts — ../../navigation/distribute — ../../rules
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { linksOf } from '@/typography/links'
import { NAV_HUBS, ROOT_PIVOTS, type NavHub } from '@/navigation/groups'
import { type DiamondModel } from '@/diamond'
import { finishedIdeaCrossed } from '@/seal'

const ONE_WORD = /^[a-z][a-z0-9]*$/

const SRC = 'src'
const SKIP_TREES = new Set(['app', 'migrations'])
const DISTRIBUTE_HUBS = ['medical', 'computer', 'body'] as const satisfies readonly NavHub[]
export type DistributeHub = (typeof DISTRIBUTE_HUBS)[number]

export const WORD_CODE_MARKERS = ['index.ts', 'test.ts'] as const

/** True when a folder holds executable matter (index.ts + test.ts) — not form-only SKILL. */
export function hasWordCode(dir: string): boolean {
  try {
    const files = readdirSync(dir)
    return WORD_CODE_MARKERS.every((m) => files.includes(m))
  } catch {
    return false
  }
}

/** Full trinity — form + matter + proof (hub distribute requires this, not SKILL alone). */
export function hasWordFolderTrinity(dir: string): boolean {
  try {
    const files = readdirSync(dir)
    return files.includes('SKILL.md') && hasWordCode(dir)
  } catch {
    return false
  }
}

export type WordCodeKind = 'with-code' | 'vocabulary-only' | 'incomplete' | 'missing'

export interface WordCodeStatus {
  readonly word: string
  readonly kind: WordCodeKind
  readonly atomPath: string | null
}

const parseYamlSubList = (fm: string, parent: string, key: string): string[] => {
  const parentRe = new RegExp(`^${parent}:\\s*\\n((?:  .+(?:\\n|$))+)` , 'm')
  const parentBlock = fm.match(parentRe)?.[1] ?? ''
  const keyRe = new RegExp(`^  ${key}:\\s*\\n((?:    - .+(?:\\n|$))+)` , 'm')
  const keyBlock = parentBlock.match(keyRe)?.[1] ?? ''
  return [...keyBlock.matchAll(/^    - (.+)$/gm)]
    .map((m) => m[1]!.replace(/^["']|["']$/g, '').trim())
    .filter(Boolean)
}

const isDir = (p: string): boolean => {
  try {
    return statSync(p).isDirectory()
  } catch {
    return false
  }
}

/** Resolve the best existing path for a word (root first, then hub pivots). */
export function resolveWordPath(word: string, cwd: string = process.cwd()): string | null {
  const root = join(cwd, SRC, word)
  if (isDir(root)) return word
  for (const hub of DISTRIBUTE_HUBS) {
    const pivot = join(cwd, SRC, hub, word)
    if (isDir(pivot)) return `${hub}/${word}`
  }
  return null
}

/** Classify one word against the live tree. */
export function wordCodeStatus(word: string, cwd: string = process.cwd()): WordCodeStatus {
  const root = join(cwd, SRC, word)
  if (isDir(root) && hasWordCode(root)) return { word, kind: 'with-code', atomPath: word }
  for (const hub of DISTRIBUTE_HUBS) {
    const pivot = join(cwd, SRC, hub, word)
    if (isDir(pivot) && hasWordCode(pivot)) return { word, kind: 'with-code', atomPath: `${hub}/${word}` }
  }
  if (isDir(root)) {
    const files = readdirSync(root)
    if (files.includes('SKILL.md')) return { word, kind: 'vocabulary-only', atomPath: word }
    return { word, kind: 'incomplete', atomPath: word }
  }
  for (const hub of DISTRIBUTE_HUBS) {
    const pivot = join(cwd, SRC, hub, word)
    if (!isDir(pivot)) continue
    const files = readdirSync(pivot)
    if (files.includes('SKILL.md')) return { word, kind: 'vocabulary-only', atomPath: `${hub}/${word}` }
    return { word, kind: 'incomplete', atomPath: `${hub}/${word}` }
  }
  return { word, kind: 'missing', atomPath: null }
}

export type WordFolderViolationLaw = 'word-without-code'

export interface WordFolderViolation {
  readonly word: string
  readonly law: WordFolderViolationLaw
  readonly kind: Exclude<WordCodeKind, 'with-code'>
  readonly atomPath: string | null
  readonly referencedFrom: readonly string[]
  readonly referenceCount: number
  readonly reason: string
}

export interface WordFolderAudit {
  readonly totalWords: number
  readonly withCode: number
  readonly withCodePct: number
  readonly violations: readonly WordFolderViolation[]
  readonly violationCount: number
}

const HUB_FACET: Readonly<Record<DistributeHub, string>> = {
  medical: 'medical facet',
  computer: 'hardware facet',
  body: 'anatomical part',
}

/** Infrastructure words — author trinity at root canonical, never hub-duplicated. */
const ROOT_AUTHOR_WORDS = new Set<string>([...ROOT_PIVOTS, 'law', 'merge', 'collapse', 'sti'])

function collectReferencedWords(cwd: string): Map<string, Set<string>> {
  const root = join(cwd, SRC)
  const words = new Map<string, Set<string>>()

  const note = (word: string, from: string): void => {
    if (!ONE_WORD.test(word)) return
    const set = words.get(word) ?? new Set<string>()
    set.add(from)
    words.set(word, set)
  }

  const walk = (dir: string, rel: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir).sort()
    } catch {
      return
    }
    for (const e of entries) {
      if (e.startsWith('.') || e === 'node_modules') continue
      const p = join(dir, e)
      if (!isDir(p)) continue
      if (!rel && SKIP_TREES.has(e)) continue
      const childRel = rel ? `${rel}/${e}` : e
      const skill = join(p, 'SKILL.md')
      if (existsSync(skill)) {
        const text = readFileSync(skill, 'utf8')
        const fm = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''
        for (const w of parseYamlSubList(fm, 'bonds', 'in')) note(w, childRel)
        for (const w of parseYamlSubList(fm, 'bonds', 'out')) note(w, childRel)
        for (const w of parseYamlSubList(fm, 'neighbors', 'wikilink')) note(w, childRel)
        for (const w of linksOf(text)) note(w, childRel)
      }
      walk(p, childRel)
    }
  }
  walk(root, '')
  return words
}

const hubBondIndex = (cwd: string): Map<string, DistributeHub[]> => {
  const index = new Map<string, DistributeHub[]>()
  for (const hub of DISTRIBUTE_HUBS) {
    const skill = join(cwd, SRC, hub, 'SKILL.md')
    if (!existsSync(skill)) continue
    const fm = readFileSync(skill, 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''
    const refs = new Set([
      ...parseYamlSubList(fm, 'bonds', 'in'),
      ...parseYamlSubList(fm, 'bonds', 'out'),
      ...parseYamlSubList(fm, 'neighbors', 'wikilink'),
    ])
    for (const w of refs) {
      if (!ONE_WORD.test(w)) continue
      const list = index.get(w) ?? []
      if (!list.includes(hub)) list.push(hub)
      index.set(w, list)
    }
  }
  return index
}

/** Scan SKILL bonds/wikilinks vs filesystem — words without executable matter. */
export function wordFolderViolations(cwd: string = process.cwd()): WordFolderAudit {
  const referenced = collectReferencedWords(cwd)
  let withCode = 0
  const violations: WordFolderViolation[] = []

  for (const [word, refs] of referenced) {
    const status = wordCodeStatus(word, cwd)
    if (status.kind === 'with-code') {
      withCode++
      continue
    }
    const referencedFrom = [...refs].sort()
    const reason =
      status.kind === 'missing'
        ? `[[${word}]] referenced but no atom folder — dead wikilink bond`
        : status.kind === 'vocabulary-only'
          ? `${status.atomPath ?? word} holds SKILL.md only — matter (index.ts + test.ts) required`
          : `${status.atomPath ?? word} partial trinity — missing index.ts or test.ts`
    violations.push({
      word,
      law: 'word-without-code',
      kind: status.kind,
      atomPath: status.atomPath,
      referencedFrom,
      referenceCount: referencedFrom.length,
      reason,
    })
  }

  violations.sort((a, b) => b.referenceCount - a.referenceCount || a.word.localeCompare(b.word))
  const totalWords = referenced.size
  return {
    totalWords,
    withCode,
    withCodePct: totalWords ? Math.round((withCode / totalWords) * 1000) / 10 : 100,
    violations,
    violationCount: violations.length,
  }
}

export type WordDiamondKind = 'complete' | 'missing' | 'vocabulary-only' | 'incomplete' | 'uncrossed'

export type WordDiamondViolationLaw = 'word-incomplete-diamond'

export interface WordDiamondViolation {
  readonly word: string
  readonly law: WordDiamondViolationLaw
  readonly kind: Exclude<WordDiamondKind, 'complete'>
  readonly atomPath: string | null
  readonly referencedFrom: readonly string[]
  readonly referenceCount: number
  readonly reason: string
  readonly impurities?: readonly string[]
}

export interface WordDiamondAudit {
  readonly totalWords: number
  readonly completeWords: number
  readonly completePct: number
  readonly uselessWords: number
  readonly violations: readonly WordDiamondViolation[]
  readonly top50: readonly WordDiamondViolation[]
}

const wordDiamondReason = (
  kind: Exclude<WordDiamondKind, 'complete'>,
  word: string,
  atomPath: string | null,
  impurities?: readonly string[],
): string => {
  if (kind === 'missing') return `[[${word}]] referenced but no atom folder — dead wikilink bond`
  if (kind === 'vocabulary-only') {
    return `${atomPath ?? word} holds SKILL.md only — useless complexity until trinity complete`
  }
  if (kind === 'incomplete') {
    return `${atomPath ?? word} partial trinity — missing index.ts or test.ts`
  }
  const sample = impurities?.slice(0, 2).join('; ') ?? 'diamond uncrossed'
  return `${atomPath ?? word} has code but incomplete diamond — ${sample}`
}

/** Auto-fix hint for monitor improve loop — remove dead bond or author trinity stub. */
export function wordDiamondFixSuggestion(
  v: Pick<WordDiamondViolation, 'kind' | 'word' | 'atomPath'>,
  cwd: string = process.cwd(),
): string {
  if (v.kind === 'missing') {
    return `remove dead [[${v.word}]] wikilink bond or author atom via matterForWord`
  }
  const rx = matterForWord(v.word, cwd)
  if (v.kind === 'vocabulary-only' || v.kind === 'incomplete') {
    return `add index.ts + test.ts stub (${rx.action}) — ${rx.reason}`
  }
  return `collapse [[${v.word}]] to sealed atom only or complete diamond — ${rx.reason}`
}

/** finishedIdeaCrossed for one atom path — skeleton from disk + diamond.json (no deriveDiamond). */
const wordAtomSkeletonModel = (atomPath: string, cwd: string): DiamondModel => {
  const dir = join(cwd, SRC, atomPath)
  const files = readdirSync(dir)
  const trinity = {
    form: (files.includes('SKILL.md') ? 1 : 0) as 0 | 1,
    code: (files.includes('index.ts') ? 1 : 0) as 0 | 1,
    proof: (files.includes('test.ts') ? 1 : 0) as 0 | 1,
  }
  const skillPath = join(dir, 'SKILL.md')
  const skillFm = existsSync(skillPath)
    ? (readFileSync(skillPath, 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '')
    : ''
  const horoFromSkill = skillFm.match(/^horo:\s*(\d+)/m)?.[1]
  const diamondPath = join(dir, 'diamond.json')
  let json: Partial<DiamondModel> & { trinity?: DiamondModel['trinity'] } | null = null
  if (existsSync(diamondPath)) {
    try {
      json = JSON.parse(readFileSync(diamondPath, 'utf8')) as Partial<DiamondModel>
    } catch {
      json = null
    }
  }
  const linksTotal = json?.linksTotal ?? 0
  const linksResolved = json?.linksResolved ?? linksTotal
  const folded = json?.folded ?? true
  const trinityComplete = Boolean(trinity.form && trinity.code && trinity.proof)
  const linksOk = linksTotal === 0 || linksResolved >= linksTotal
  return {
    kind: 'atom',
    atomPath,
    boundaryUuid: json?.boundaryUuid ?? null,
    trinity,
    horo: json?.horo ?? (horoFromSkill ? Number(horoFromSkill) : null),
    measure: json?.measure ?? null,
    imports: json?.imports ?? [],
    exports: json?.exports ?? [],
    escapes: json?.escapes ?? [],
    links: json?.links ?? [],
    linksResolved,
    linksTotal,
    folded,
    bondsIn: json?.bondsIn ?? 0,
    bondsOut: json?.bondsOut ?? 0,
    sealed: Boolean(trinityComplete && folded && linksOk),
  }
}

const wordAtomFinishedCrossed = (
  atomPath: string,
  cwd: string,
  cache: Map<string, ReturnType<typeof finishedIdeaCrossed>>,
): ReturnType<typeof finishedIdeaCrossed> => {
  const hit = cache.get(atomPath)
  if (hit) return hit
  const model = wordAtomSkeletonModel(atomPath, cwd)
  const verdict = finishedIdeaCrossed(model, { cwd })
  cache.set(atomPath, verdict)
  return verdict
}

/** Scan bonds/wikilinks — words without complete diamond (trinity 111 + sealed + finishedIdeaCrossed). */
export function wordDiamondViolations(cwd: string = process.cwd()): WordDiamondAudit {
  const referenced = collectReferencedWords(cwd)
  let completeWords = 0
  const violations: WordDiamondViolation[] = []
  const crossCache = new Map<string, ReturnType<typeof finishedIdeaCrossed>>()

  for (const [word, refs] of referenced) {
    const status = wordCodeStatus(word, cwd)
    const referencedFrom = [...refs].sort()
    const referenceCount = referencedFrom.length

    if (status.kind === 'with-code' && status.atomPath) {
      const dir = join(cwd, SRC, status.atomPath)
      if (!hasWordFolderTrinity(dir)) {
        violations.push({
          word,
          law: 'word-incomplete-diamond',
          kind: 'incomplete',
          atomPath: status.atomPath,
          referencedFrom,
          referenceCount,
          reason: wordDiamondReason('incomplete', word, status.atomPath),
        })
        continue
      }
      try {
        const cross = wordAtomFinishedCrossed(status.atomPath, cwd, crossCache)
        if (cross.crossed) {
          completeWords++
          continue
        }
        violations.push({
          word,
          law: 'word-incomplete-diamond',
          kind: 'uncrossed',
          atomPath: status.atomPath,
          referencedFrom,
          referenceCount,
          reason: wordDiamondReason('uncrossed', word, status.atomPath, cross.impurities),
          impurities: cross.impurities,
        })
        continue
      } catch {
        violations.push({
          word,
          law: 'word-incomplete-diamond',
          kind: 'uncrossed',
          atomPath: status.atomPath,
          referencedFrom,
          referenceCount,
          reason: wordDiamondReason('uncrossed', word, status.atomPath, ['finishedIdeaCrossed failed']),
        })
        continue
      }
    }

    const kind = status.kind as Exclude<WordDiamondKind, 'complete' | 'uncrossed'>
    violations.push({
      word,
      law: 'word-incomplete-diamond',
      kind,
      atomPath: status.atomPath,
      referencedFrom,
      referenceCount,
      reason: wordDiamondReason(kind, word, status.atomPath),
    })
  }

  violations.sort((a, b) => b.referenceCount - a.referenceCount || a.word.localeCompare(b.word))
  const totalWords = referenced.size
  return {
    totalWords,
    completeWords,
    completePct: totalWords ? Math.round((completeWords / totalWords) * 1000) / 10 : 100,
    uselessWords: violations.length,
    violations,
    top50: violations.slice(0, 50),
  }
}

export type MatterAction = 'collapse' | 'pivot' | 'author-trinity'

export interface MatterPrescription {
  readonly word: string
  readonly action: MatterAction
  readonly atomPath: string
  readonly hub?: DistributeHub
  readonly missing?: readonly string[]
  readonly reason: string
}

/** Prescription: nest under hub/word or collapse to existing root canonical. */
export function matterForWord(word: string, cwd: string = process.cwd()): MatterPrescription {
  const status = wordCodeStatus(word, cwd)
  if (status.kind === 'with-code' && status.atomPath) {
    return {
      word,
      action: 'collapse',
      atomPath: status.atomPath,
      reason: `${status.atomPath} already holds index.ts + test.ts — canonical matter face`,
    }
  }

  if (ROOT_AUTHOR_WORDS.has(word)) {
    const rootDir = join(cwd, SRC, word)
    const missing = isDir(rootDir)
      ? WORD_CODE_MARKERS.filter((m) => !readdirSync(rootDir).includes(m))
      : [...WORD_CODE_MARKERS]
    return {
      word,
      action: 'author-trinity',
      atomPath: word,
      missing,
      reason: `@/${word} is root infrastructure — author trinity at canonical root, not a hub duplicate`,
    }
  }

  const hubs = hubBondIndex(cwd).get(word) ?? []
  const hub = hubs[0] ?? 'medical'
  if (hubs.length > 0) {
    return {
      word,
      action: 'pivot',
      atomPath: `${hub}/${word}`,
      hub,
      reason: `nest ${hub}/${word} pivot with re-export stub to @/${word}`,
    }
  }

  const rootDir = join(cwd, SRC, word)
  if (isDir(rootDir) && readdirSync(rootDir).includes('SKILL.md')) {
    const missing = WORD_CODE_MARKERS.filter((m) => !readdirSync(rootDir).includes(m))
    return {
      word,
      action: 'author-trinity',
      atomPath: word,
      missing,
      reason: `@/${word} holds SKILL.md — author trinity at root canonical path`,
    }
  }

  return {
    word,
    action: 'pivot',
    atomPath: `${hub}/${word}`,
    hub,
    reason: `nest ${hub}/${word} pivot with re-export stub to @/${word}`,
  }
}

export interface HubDeadWikilink {
  readonly word: string
  readonly hub: DistributeHub
  readonly referenceCount: number
  readonly prescription: MatterPrescription
}

/** Rank hub-referenced words lacking code — dead wikilinks on the distribute axis. */
export function deadHubWikilinks(
  cwd: string = process.cwd(),
  hubs: readonly DistributeHub[] = DISTRIBUTE_HUBS,
): readonly HubDeadWikilink[] {
  const audit = wordFolderViolations(cwd)
  const byWord = new Map(audit.violations.map((v) => [v.word, v]))
  const hubIndex = hubBondIndex(cwd)
  const out: HubDeadWikilink[] = []

  for (const hub of hubs) {
    const skill = join(cwd, SRC, hub, 'SKILL.md')
    if (!existsSync(skill)) continue
    const fm = readFileSync(skill, 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''
    const refs = new Set([
      ...parseYamlSubList(fm, 'bonds', 'in'),
      ...parseYamlSubList(fm, 'bonds', 'out'),
      ...parseYamlSubList(fm, 'neighbors', 'wikilink'),
      ...linksOf(readFileSync(skill, 'utf8')),
    ])
    for (const w of refs) {
      if (!ONE_WORD.test(w)) continue
      const v = byWord.get(w)
      if (!v) continue
      const prescription = matterForWord(w, cwd)
      if (prescription.action !== 'pivot') continue
      const bondedHubs = hubIndex.get(w) ?? []
      if (!bondedHubs.includes(hub)) continue
      out.push({
        word: w,
        hub,
        referenceCount: v.referenceCount,
        prescription,
      })
    }
  }

  return out.sort((a, b) => b.referenceCount - a.referenceCount || a.word.localeCompare(b.word))
}

/** Enhanced pivot index — re-export stub naming canonical @/ import face. */
export const pivotIndexTsWithReexport = (hub: string, leaf: string): string => {
  const base = `/**
 * ${hub}/${leaf} — ${hub} facet; vocabulary pivot to @/${leaf}.
 */
export const PART = '${leaf}' as const
export const CANONICAL = '${leaf}' as const
export const PARENT = '${hub}' as const
export const atomPath = '${hub}/${leaf}' as const
`
  return (
    base +
    `\n/** Re-export stub — canonical vocabulary at @/${leaf}. */\nexport const reexportFrom = '@/${leaf}' as const\n`
  )
}

const pivotTestTs = (hub: string, leaf: string): string => {
  const importFrom = '@/' + hub + '/' + leaf
  return `import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '${importFrom}'

describe('${hub}/${leaf} — vocabulary pivot', () => {
  it('names the ${hub} facet and its canonical atom', () => {
    expect(PART).toBe('${leaf}')
    expect(CANONICAL).toBe('${leaf}')
    expect(PARENT).toBe('${hub}')
    expect(atomPath).toBe('${hub}/${leaf}')
    expect(reexportFrom).toBe('@/${leaf}')
  })
})
`
}

const pivotSkillMd = (hub: string, leaf: string, facet: string): string => `---
name: ${leaf}
atomPath: ${hub}/${leaf}
description: "Use when reasoning about ${leaf} as a ${facet} of [[${hub}]] — vocabulary pivot to @/${leaf}; nested not duplicated."
---

# ${hub}/${leaf} — ${facet}

The [[${leaf}]] read from the [[${hub}]] structure — pivot to the top-level \`@/${leaf}\` vocabulary atom ([[merge]] at path scale).

**Law — [[law]]: ${hub}/${leaf} names ${leaf} under ${hub} — one word, content-addressed, nested not duplicated.**

@standard schema.org — the type vocabulary, collided to single words
`

/** Materialize one hub pivot with re-export stub (idempotent). */
export function writeWordPivot(
  hub: DistributeHub,
  leaf: string,
  cwd: string = process.cwd(),
): boolean {
  const facet = HUB_FACET[hub]
  const dir = join(cwd, SRC, hub, leaf)
  if (existsSync(dir) && hasWordFolderTrinity(dir)) return false
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.ts'), pivotIndexTsWithReexport(hub, leaf))
  writeFileSync(join(dir, 'test.ts'), pivotTestTs(hub, leaf))
  writeFileSync(join(dir, 'SKILL.md'), pivotSkillMd(hub, leaf, facet))
  return true
}

/** Batch: top N dead hub wikilinks → pivots with re-export stubs. */
export function applyTopHubWordPivots(
  limit = 20,
  cwd: string = process.cwd(),
): { readonly written: number; readonly words: readonly string[] } {
  const seen = new Set<string>()
  const words: string[] = []
  let written = 0

  for (const row of deadHubWikilinks(cwd)) {
    if (seen.has(row.word)) continue
    seen.add(row.word)
    if (writeWordPivot(row.hub, row.word, cwd)) {
      written++
      words.push(`${row.hub}/${row.word}`)
    }
    if (words.length >= limit) break
  }

  return { written, words }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  void (async () => {
  const { computedBaseline } = await import('./baseline')
  const apply = process.argv.includes('--apply-pivots')
  const diamondOnly = process.argv.includes('--diamond')
  const audit = diamondOnly ? null : wordFolderViolations()
  const diamond = wordDiamondViolations()
  if (audit) {
    console.log(
      `word-folder law: ${audit.totalWords} words · ${audit.withCode} with-code (${audit.withCodePct}%) · ${audit.violationCount} violations (≤${computedBaseline('word-without-code')})`,
    )
    for (const v of audit.violations.slice(0, 12)) {
      console.log(`  ${v.word.padEnd(16)} ${v.kind.padEnd(16)} refs=${v.referenceCount}`)
    }
  }
  console.log(
    `\nword-diamond law: ${diamond.totalWords} words · ${diamond.completeWords} complete (${diamond.completePct}%) · ${diamond.uselessWords} useless (≤${computedBaseline('word-incomplete-diamond')})`,
  )
  for (const v of diamond.top50.slice(0, 12)) {
    console.log(`  ${v.word.padEnd(16)} ${v.kind.padEnd(16)} refs=${v.referenceCount}`)
  }
  if (diamond.top50.length > 12) {
    console.log(`  … top50 has ${diamond.top50.length} useless words by bond frequency`)
  }
  if (apply) {
    const { written, words } = applyTopHubWordPivots(20)
    console.log(`\napplyTopHubWordPivots — wrote ${written} pivot(s):`)
    for (const w of words) console.log(`  ${w}`)
  }
  })()
}
