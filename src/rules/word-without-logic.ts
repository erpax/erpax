/**
 * rules/word-without-logic — literary atoms: prose without executable matter or use case.
 *
 * Every word must earn its folder with code logic OR explicit human-gate vocabulary
 * exception (`vocabularyException: true` in SKILL frontmatter).
 *
 * @see ./word-matter — ../law/folder/word — ../corpus/words
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { listAtomPaths } from './tightened-scans'

const SRC = 'src'
const SKIP_TREES = new Set(['app', 'migrations'])
const TS_EXT = /\.tsx?$/i
const SKIP_FILE = /\.(generated|d\.ts)$/i

export const PROSE_HEAVY_README_WORDS = 120
export const BEHAVIOR_PROSE_RE =
  /\b(implement|compute|derive|assert|export function|handles|returns|gates?|scans?|violations?)\b/i

export type WordWithoutLogicKind = 'form-only' | 'orphan-export' | 'prose-heavy' | 'no-importers'

export interface WordWithoutLogicViolation {
  readonly atomPath: string
  readonly law: 'word-without-logic'
  readonly kind: WordWithoutLogicKind
  readonly reason: string
  readonly readmeWords: number
  readonly linesOfCode: number
  readonly importerCount: number
  readonly hasTests: boolean
  readonly useCase: string | null
}

export interface UseCaseVerdict {
  readonly hasLogic: boolean
  readonly hasTests: boolean
  readonly importerCount: number
  readonly useCase: string | null
  readonly linesOfCode: number
  readonly readmeWords: number
  readonly isLiterary: boolean
  readonly vocabularyException: boolean
}

export interface WordWithoutLogicAudit {
  readonly totalAtoms: number
  readonly literaryCount: number
  readonly withUseCase: number
  readonly withUseCasePct: number
  readonly violations: readonly WordWithoutLogicViolation[]
  readonly violationCount: number
  readonly top50: readonly WordWithoutLogicViolation[]
}

const isDir = (p: string): boolean => {
  try {
    return statSync(p).isDirectory()
  } catch {
    return false
  }
}

const atomDir = (atomPath: string, cwd: string): string => join(cwd, SRC, atomPath)

const countReadmeWords = (dir: string): number => {
  const readme = join(dir, 'README.md')
  if (!existsSync(readme)) return 0
  return readFileSync(readme, 'utf8').split(/\s+/).filter(Boolean).length
}

const countLinesOfCode = (filePath: string): number => {
  if (!existsSync(filePath)) return 0
  const lines = readFileSync(filePath, 'utf8').split('\n')
  let n = 0
  let block = false
  for (const raw of lines) {
    const line = raw.trim()
    if (!line) continue
    if (block) {
      if (line.includes('*/')) block = false
      continue
    }
    if (line.startsWith('/*')) {
      if (!line.includes('*/')) block = true
      continue
    }
    if (line.startsWith('//') || line.startsWith('*')) continue
    n++
  }
  return n
}

const LOCAL_LOGIC_RE =
  /(?:^|\n)\s*(?:export\s+)?(?:async\s+)?(?:function|class)\s+\w+|(?:^|\n)\s*(?:export\s+)?const\s+\w+\s*=\s*(?:async\s*)?\(|(?:^|\n)\s*(?:export\s+)?(?:interface|type|enum)\s+\w+/m

const countLinesOfCodeFromContent = (content: string): number => {
  let n = 0
  for (const raw of content.split('\n')) {
    const line = raw.trim()
    if (!line || line.startsWith('//') || line.startsWith('*')) continue
    n++
  }
  return n
}

const TRIVIAL_STUB_RE =
  /(?:^|\n)\s*export\s+const\s+\w+\s*=\s*(?:['"`][^'"`]*['"`]|atomPath|\w+\s+as\s+const)/m

const hasChildCodeAtoms = (dir: string): boolean => {
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return false
  }
  for (const e of entries) {
    if (e.startsWith('.') || e === 'node_modules') continue
    const p = join(dir, e)
    if (!isDir(p)) continue
    if (existsSync(join(p, 'index.ts'))) return true
  }
  return false
}

const isTrivialVocabularyStub = (content: string): boolean => {
  const stripped = content
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .trim()
  if (!stripped || LOCAL_LOGIC_RE.test(stripped)) return false
  return TRIVIAL_STUB_RE.test(stripped) || countLinesOfCodeFromContent(stripped) <= 6
}

/** True when index.ts is empty re-exports only — no local executable matter. */
export function isOrphanReexportOnly(content: string, opts?: { readonly hasChildCode?: boolean }): boolean {
  if (opts?.hasChildCode) return false
  const stripped = content
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .trim()
  if (!stripped) return true
  if (LOCAL_LOGIC_RE.test(stripped)) return false
  if (countLinesOfCodeFromContent(stripped) >= 20) return false
  return /^export\s/m.test(stripped)
}

export function hasVocabularyException(dir: string): boolean {
  const skill = join(dir, 'SKILL.md')
  if (!existsSync(skill)) return false
  const fm = readFileSync(skill, 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''
  return /vocabularyException:\s*true/i.test(fm) || /humanGate:\s*vocabulary/i.test(fm)
}

const skillReferencesBehavior = (dir: string): boolean => {
  const skill = join(dir, 'SKILL.md')
  if (!existsSync(skill)) return false
  const body = readFileSync(skill, 'utf8').replace(/^---[\s\S]*?---\n?/, '')
  return BEHAVIOR_PROSE_RE.test(body)
}

const parseTestUseCases = (dir: string): string[] => {
  const test = join(dir, 'test.ts')
  if (!existsSync(test)) return []
  const content = readFileSync(test, 'utf8')
  return [...content.matchAll(/(?:it|test)\(\s*['"`]([^'"`]+)['"`]/g)]
    .map((m) => m[1]!.trim())
    .filter(Boolean)
}

const mcpUseHint = (atomPath: string, cwd: string): string | null => {
  const catalogue = join(cwd, SRC, 'agents/mcp/atom-catalogue.generated.ts')
  if (!existsSync(catalogue)) return null
  const content = readFileSync(catalogue, 'utf8')
  const word = atomPath.split('/').pop() ?? atomPath
  if (content.includes(`"atomPath":"${atomPath}"`) || content.includes(`"${word}"`)) {
    return `MCP atom catalogue references ${atomPath}`
  }
  return null
}

/** Map @/ import target to owning atom path (longest prefix with SKILL.md). */
export function importTargetToAtomPath(importTarget: string, atomPaths: ReadonlySet<string>): string | null {
  const norm = importTarget.replace(/\\/g, '/').replace(/\.(tsx?|mts)$/, '')
  if (atomPaths.has(norm)) return norm
  let best: string | null = null
  for (const atom of atomPaths) {
    if (norm === atom || norm.startsWith(`${atom}/`)) {
      if (!best || atom.length > best.length) best = atom
    }
  }
  return best
}

/** Scan src for @/ imports — one pass index for useCaseOf. */
export function buildImportIndex(cwd: string = process.cwd()): Map<string, number> {
  const atoms = new Set(listAtomPaths(cwd).filter((p) => p !== '.'))
  const counts = new Map<string, number>()
  const bump = (atomPath: string): void => {
    if (!atoms.has(atomPath)) return
    counts.set(atomPath, (counts.get(atomPath) ?? 0) + 1)
  }

  const walk = (dir: string, rel: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir)
    } catch {
      return
    }
    for (const e of entries) {
      if (e.startsWith('.') || e === 'node_modules') continue
      const p = join(dir, e)
      const childRel = rel ? `${rel}/${e}` : e
      if (isDir(p)) {
        if (!rel && SKIP_TREES.has(e)) continue
        walk(p, childRel)
        continue
      }
      if (!TS_EXT.test(e) || SKIP_FILE.test(e)) continue
      let content: string
      try {
        content = readFileSync(p, 'utf8')
      } catch {
        continue
      }
      for (const m of content.matchAll(/from\s+['"]@\/([^'"]+)['"]/g)) {
        const atom = importTargetToAtomPath(m[1]!, atoms)
        if (atom) bump(atom)
      }
    }
  }
  walk(join(cwd, SRC), '')
  return counts
}

/** Derive use-case evidence: tests · importers · MCP · SKILL behavior prose. */
export function useCaseOf(
  atomPath: string,
  cwd: string = process.cwd(),
  importIndex?: ReadonlyMap<string, number>,
): UseCaseVerdict {
  const dir = atomDir(atomPath, cwd)
  const indexPath = join(dir, 'index.ts')
  const hasIndex = existsSync(indexPath)
  const childCode = hasChildCodeAtoms(dir)
  const loc = hasIndex ? countLinesOfCode(indexPath) : 0
  const readmeWords = countReadmeWords(dir)
  const hasTests = existsSync(join(dir, 'test.ts'))
  const vocabularyException = hasVocabularyException(dir)

  let hasLogic = false
  let trivialStub = false
  if (hasIndex) {
    try {
      const content = readFileSync(indexPath, 'utf8')
      trivialStub = isTrivialVocabularyStub(content)
      hasLogic =
        childCode ||
        (loc >= 20 && !isOrphanReexportOnly(content, { hasChildCode: childCode })) ||
        (LOCAL_LOGIC_RE.test(content) && !trivialStub)
    } catch {
      hasLogic = childCode
    }
  } else {
    hasLogic = childCode
  }

  const importers = importIndex ?? buildImportIndex(cwd)
  const importerCount = importers.get(atomPath) ?? 0

  const cases = parseTestUseCases(dir)
  const mcp = mcpUseHint(atomPath, cwd)
  let useCase: string | null = null
  if (cases.length > 0) useCase = `test: ${cases[0]}`
  else if (importerCount > 0) useCase = `${importerCount} importer(s) via @/${atomPath}`
  else if (hasLogic && hasTests) useCase = 'trinity with executable matter'
  else if (hasLogic) useCase = 'index.ts exports local logic'
  else if (mcp && childCode) useCase = mcp

  const proseHeavy = readmeWords >= PROSE_HEAVY_README_WORDS && loc === 0 && !childCode
  const behaviorProse = skillReferencesBehavior(dir)
  const orphanExport =
    hasIndex && !hasLogic && !childCode && importerCount === 0 && !hasTests
  const formOnly =
    !hasIndex && !childCode && (existsSync(join(dir, 'README.md')) || existsSync(join(dir, 'diamond.json')))
  const noImporters =
    (trivialStub || behaviorProse) && importerCount === 0 && !hasTests && !childCode

  const isLiterary =
    !vocabularyException &&
    !childCode &&
    (formOnly || orphanExport || proseHeavy || (noImporters && !hasLogic))

  return {
    hasLogic,
    hasTests,
    importerCount,
    useCase,
    linesOfCode: loc,
    readmeWords,
    isLiterary,
    vocabularyException,
  }
}

const classifyKind = (uc: UseCaseVerdict, dir: string): WordWithoutLogicKind | null => {
  if (uc.vocabularyException || !uc.isLiterary) return null
  if (hasChildCodeAtoms(dir)) return null
  const hasIndex = existsSync(join(dir, 'index.ts'))
  if (!hasIndex && (uc.readmeWords > 0 || existsSync(join(dir, 'diamond.json')))) return 'form-only'
  if (hasIndex && !uc.hasLogic && uc.importerCount === 0) return 'orphan-export'
  if (uc.readmeWords >= PROSE_HEAVY_README_WORDS && uc.linesOfCode === 0) return 'prose-heavy'
  if (skillReferencesBehavior(dir) && uc.importerCount === 0 && !uc.hasTests) return 'no-importers'
  if (!uc.hasLogic && uc.importerCount === 0 && !uc.hasTests) return 'form-only'
  return 'no-importers'
}

const violationReason = (kind: WordWithoutLogicKind, uc: UseCaseVerdict): string => {
  switch (kind) {
    case 'form-only':
      return `form-only — README/diamond without index.ts matter (${uc.readmeWords} readme words · ${uc.linesOfCode} loc)`
    case 'orphan-export':
      return `orphan-export — index.ts re-exports only, no local logic (${uc.importerCount} importers)`
    case 'prose-heavy':
      return `prose-heavy — ${uc.readmeWords} readme words · zero lines of code`
    case 'no-importers':
      return `no-importers — behavior prose or exports with zero test.ts and no @/ importers`
    default:
      return 'literary-word: no code logic'
  }
}

/** Scan all atoms — literary offenders ranked by prose mass then importer deficit. */
export function wordWithoutLogicViolations(cwd: string = process.cwd()): WordWithoutLogicAudit {
  const importIndex = buildImportIndex(cwd)
  const atoms = listAtomPaths(cwd).filter((p) => p !== '.')
  const violations: WordWithoutLogicViolation[] = []

  for (const atomPath of atoms) {
    const uc = useCaseOf(atomPath, cwd, importIndex)
    const kind = classifyKind(uc, atomDir(atomPath, cwd))
    if (!kind) continue
    violations.push({
      atomPath,
      law: 'word-without-logic',
      kind,
      reason: violationReason(kind, uc),
      readmeWords: uc.readmeWords,
      linesOfCode: uc.linesOfCode,
      importerCount: uc.importerCount,
      hasTests: uc.hasTests,
      useCase: uc.useCase,
    })
  }

  violations.sort(
    (a, b) =>
      b.readmeWords - a.readmeWords ||
      a.importerCount - b.importerCount ||
      b.linesOfCode - a.linesOfCode ||
      a.atomPath.localeCompare(b.atomPath),
  )

  const withUseCase = atoms.filter((p) => {
    const uc = useCaseOf(p, cwd, importIndex)
    return !uc.isLiterary && (uc.useCase !== null || uc.hasLogic)
  }).length

  const totalAtoms = atoms.length
  const literaryCount = violations.length

  return {
    totalAtoms,
    literaryCount,
    withUseCase,
    withUseCasePct: totalAtoms ? Math.round((withUseCase / totalAtoms) * 1000) / 10 : 100,
    violations,
    violationCount: violations.length,
    top50: violations.slice(0, 50),
  }
}

/** Monitor / improve fix line — add matter, fold, or human-gate delete. */
export function wordWithoutLogicFixSuggestion(v: WordWithoutLogicViolation): string {
  if (v.importerCount > 0) {
    return `add index.ts matter + test.ts at ${v.atomPath} (imported ${v.importerCount}×) OR fold into parent atom`
  }
  if (v.kind === 'prose-heavy' || v.kind === 'form-only') {
    return `add index.ts matter OR fold prose into parent OR human-gate delete (vocabularyException: true)`
  }
  if (v.kind === 'orphan-export') {
    return `replace re-export barrel with local logic OR fold into exporting parent`
  }
  return `add index.ts matter OR fold into parent OR human-gate delete`
}
