/**
 * law/folder/user-word — user phrases saved without diamond proof.
 */
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { execSync } from 'node:child_process'
import { trinityFlagsOf, sealedFromReadme } from '@/pivot/horo-table'
import { recordOnPath } from '@/path'
import { listAtomPaths } from '@/rules/tightened-scans'

const SRC = 'src'
const SKIP_TREES = new Set(['app', 'migrations'])
const GENERATED_README = /^<!--\s*GENERATED\b/m
const PHRASE_SEGMENT = /^[a-z]+(?:-[a-z]+)+$/

export const AGENT_MINTED_PHRASES = new Set(['linear-logic', 'linear-gap', 'phrase-without-diamond'])
export type UserWordUnprovenKind = 'phrase-folder' | 'phrase-title' | 'form-only' | 'partial-trinity' | 'unsealed-readme'
export type TrinityLeg = 'form' | 'code' | 'proof' | 'seal'
export interface UserWordUnprovenViolation {
  readonly atomPath: string
  readonly law: 'phrase-without-diamond'
  readonly kind: UserWordUnprovenKind
  readonly phrase: string | null
  readonly missingLegs: readonly TrinityLeg[]
  readonly proofActions: readonly string[]
}
export interface UserWordUnprovenAudit {
  readonly totalAtoms: number
  readonly violations: readonly UserWordUnprovenViolation[]
  readonly violationCount: number
  readonly top50: readonly UserWordUnprovenViolation[]
}
export interface PhraseWithoutDiamondGateViolation {
  readonly atomPath: string
  readonly law: 'phrase-without-diamond'
  readonly reason: string
  readonly missingInChangeset: readonly ('index.ts' | 'test.ts')[]
}
export type ProveDiamondAction = 'proved' | 'reverted' | 'skipped'
export interface ProveDiamondResult { readonly action: ProveDiamondAction; readonly path: string; readonly reason?: string }

const atomDir = (p: string, cwd: string) => join(cwd, SRC, p)
const isDir = (p: string) => { try { return statSync(p).isDirectory() } catch { return false } }
const isHyphenatedPhrase = (t: string) => PHRASE_SEGMENT.test(t) && t.includes('-')
const phraseInPath = (atomPath: string) => {
  for (const seg of atomPath.split('/')) if (AGENT_MINTED_PHRASES.has(seg) || isHyphenatedPhrase(seg)) return seg
  return null
}
const skillTitleOf = (atomPath: string, cwd: string) => {
  const skill = join(atomDir(atomPath, cwd), 'SKILL.md')
  if (!existsSync(skill)) return null
  const m = (readFileSync(skill, 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '').match(/^name:\s*(.+)$/m)
  return m ? m[1]!.replace(/^["']|["']$/g, '').trim() : null
}
const readmeAgentTouched = (atomPath: string, cwd: string) => {
  const readme = join(atomDir(atomPath, cwd), 'README.md')
  return existsSync(readme) && !GENERATED_README.test(readFileSync(readme, 'utf8'))
}
const missingLegsOf = (flags: ReturnType<typeof trinityFlagsOf>, sealed: boolean): TrinityLeg[] => {
  const m: TrinityLeg[] = []
  if (!flags.form) m.push('form')
  if (!flags.code) m.push('code')
  if (!flags.proof) m.push('proof')
  if (!sealed) m.push('seal')
  return m
}
const proofActionsFor = (kind: UserWordUnprovenKind, atomPath: string) =>
  kind === 'phrase-folder'
    ? (['delete illegal hyphenated path', 'recordOnPath revert receipt'] as const)
    : ([`author index.ts + test.ts`, `pnpm exec vitest run src/${atomPath}/test.ts`, `pnpm erpax readme paths ${atomPath}`, 'recordOnPath prove receipt'] as const)

const classifyAtom = (atomPath: string, cwd: string): UserWordUnprovenViolation | null => {
  if (atomPath === '.' || SKIP_TREES.has(atomPath.split('/')[0] ?? '')) return null
  if (!isDir(atomDir(atomPath, cwd))) return null
  const flags = trinityFlagsOf(atomPath, cwd)
  if (!flags.form) return null
  const pathPhrase = phraseInPath(atomPath)
  const title = skillTitleOf(atomPath, cwd)
  const titlePhrase = title && (isHyphenatedPhrase(title) || AGENT_MINTED_PHRASES.has(title)) ? title : null
  const sealed = sealedFromReadme(cwd, atomPath)
  const agentReadme = readmeAgentTouched(atomPath, cwd)
  const phraseSignal = Boolean(pathPhrase || titlePhrase)
  let kind: UserWordUnprovenKind | null = null
  let phrase: string | null = pathPhrase ?? titlePhrase
  if (pathPhrase && (isHyphenatedPhrase(pathPhrase) || AGENT_MINTED_PHRASES.has(pathPhrase))) { kind = 'phrase-folder'; phrase = pathPhrase }
  else if (titlePhrase && !pathPhrase) { kind = 'phrase-title'; phrase = titlePhrase }
  else if (flags.form && !flags.code && !flags.proof && (phraseSignal || agentReadme)) kind = 'form-only'
  else if (flags.form && flags.code && !flags.proof && phraseSignal) kind = 'partial-trinity'
  else if (!sealed && agentReadme && phraseSignal) kind = 'unsealed-readme'
  if (!kind) return null
  const legs = missingLegsOf(flags, sealed)
  if (!legs.length) return null
  return { atomPath, law: 'phrase-without-diamond', kind, phrase, missingLegs: legs, proofActions: proofActionsFor(kind, atomPath) }
}

export function userWordUnprovenViolations(cwd = process.cwd()): UserWordUnprovenAudit {
  const atoms = listAtomPaths(cwd).filter((p) => p !== '.')
  const violations = atoms
    .map((p) => classifyAtom(p, cwd))
    .filter((v): v is UserWordUnprovenViolation => v !== null)
    .sort((a, b) => (b.kind === 'phrase-folder' ? 1 : 0) - (a.kind === 'phrase-folder' ? 1 : 0) || a.atomPath.localeCompare(b.atomPath))
  return { totalAtoms: atoms.length, violations, violationCount: violations.length, top50: violations.slice(0, 50) }
}

const authorIndexStub = (p: string) => `export const atomPath = '${p}' as const\n`
const authorTestStub = (p: string) => `import { describe, it, expect } from 'vitest'\nimport { atomPath } from './index'\ndescribe('${p}', () => { it('names path', () => { expect(atomPath).toBe('${p}') }) })\n`
const strictPhraseViolation = (v: UserWordUnprovenViolation) =>
  v.kind === 'phrase-folder' || (v.phrase !== null && AGENT_MINTED_PHRASES.has(v.phrase))

export function proveDiamondOrRevert(atomPath: string, cwd = process.cwd(), opts?: { readonly dryRun?: boolean }): ProveDiamondResult {
  const normalized = atomPath.replace(/^src\//, '').replace(/\/+$/, '')
  const v = userWordUnprovenViolations(cwd).violations.find((r) => r.atomPath === normalized)
  if (!v) return { action: 'skipped', path: normalized, reason: 'no violation' }
  const dir = atomDir(normalized, cwd)
  const dry = opts?.dryRun === true
  if (strictPhraseViolation(v)) {
    if (!dry && isDir(dir)) rmSync(dir, { recursive: true, force: true })
    if (!dry) recordOnPath(normalized, { kind: 'revert', law: 'phrase-without-diamond' }, new Date().toISOString())
    return { action: 'reverted', path: normalized }
  }
  if (!dry) {
    mkdirSync(dir, { recursive: true })
    if (!existsSync(join(dir, 'index.ts'))) writeFileSync(join(dir, 'index.ts'), authorIndexStub(normalized))
    if (!existsSync(join(dir, 'test.ts'))) writeFileSync(join(dir, 'test.ts'), authorTestStub(normalized))
    try { execSync(`pnpm exec vitest run src/${normalized}/test.ts`, { cwd, stdio: 'pipe' }) } catch (e) {
      return { action: 'skipped', path: normalized, reason: (e as Error).message?.split('\n')[0] }
    }
    recordOnPath(normalized, { kind: 'prove', law: 'phrase-without-diamond' }, new Date().toISOString())
  }
  return classifyAtom(normalized, cwd) && !dry ? { action: 'skipped', path: normalized, reason: 'still unproven' } : { action: 'proved', path: normalized }
}

export function proveDiamondOrRevertBatch(cwd = process.cwd(), limit = 20, opts?: { readonly dryRun?: boolean }) {
  const results = userWordUnprovenViolations(cwd).violations.slice(0, limit).map((v) => proveDiamondOrRevert(v.atomPath, cwd, opts))
  return {
    proved: results.filter((r) => r.action === 'proved').length,
    reverted: results.filter((r) => r.action === 'reverted').length,
    skipped: results.filter((r) => r.action === 'skipped').length,
    results,
  }
}

export function phraseWithoutDiamondChangesetGate(files: readonly string[], cwd = process.cwd()) {
  const relSet = new Set(files.map((f) => relative(cwd, f.startsWith('/') ? f : join(cwd, f)).replace(/\\/g, '/')))
  const out: PhraseWithoutDiamondGateViolation[] = []
  for (const rel of relSet) {
    if (!rel.endsWith('SKILL.md')) continue
    const atomPath = rel.startsWith('src/') ? rel.slice(4, -'/SKILL.md'.length) : rel.slice(0, -'/SKILL.md'.length)
    // In the changeset OR already on disk. The changeset-only form was UNSATISFIABLE at the write:
    // the confirm hook scopes to the single edited file, so a SKILL.md edit could never carry its
    // siblings and every such write was refused — including edits to atoms whose trinity was
    // complete and committed. The law is "no prose without matter", not "rewrite the trinity to
    // touch a sentence"; an existing sibling satisfies it either way.
    const has = (leaf: 'index.ts' | 'test.ts'): boolean =>
      relSet.has(`src/${atomPath}/${leaf}`) || existsSync(join(cwd, 'src', atomPath, leaf))
    const missing: ('index.ts' | 'test.ts')[] = []
    if (!has('index.ts')) missing.push('index.ts')
    if (!has('test.ts')) missing.push('test.ts')
    if (missing.length) {
      out.push({ atomPath, law: 'phrase-without-diamond', reason: `SKILL.md without ${missing.join(' + ')} — no sibling on disk either, so add it in this changeset`, missingInChangeset: missing })
    }
  }
  return out
}
