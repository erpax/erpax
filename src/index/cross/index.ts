/**
 * index/cross — path double-wire seal: every subfolder is A/B ↔ B/A; stray matter → index.ts crosses.
 *
 *   tsx src/index/cross/index.ts              # audit one-way paths + stray siblings
 *   tsx src/index/cross/index.ts --migrate agent
 *   tsx src/index/cross/index.ts --migrate agent --apply
 *
 * @see ../../cross/index — ../../law/folder — ../../tamper/import
 */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs'
import { join } from 'node:path'

export const atomPath = 'index/cross' as const
const SRC = 'src'
const SKIP_TREES = new Set(['app', 'migrations'])
const COLOCATED = new Set(['translations.ts', 'seed.ts'])
const GENERATED = /\.generated\.ts$/i

export interface PathWireViolation {
  readonly atomPath: string
  readonly kind: 'one-way-path' | 'depth-exceeds-wire'
  readonly detail: string
  readonly reciprocal?: string
}

export interface StraySibling {
  readonly parentAtom: string
  readonly file: string
  readonly stem: string
  readonly childWord: string
  readonly primaryPath: string
  readonly reciprocalPath: string
}

export interface MigrateResult {
  readonly dryRun: boolean
  readonly moved: readonly string[]
  readonly reciprocalCreated: readonly string[]
  readonly skipped: readonly string[]
  readonly errors: readonly string[]
}

const isDir = (p: string): boolean => {
  try {
    return statSync(p).isDirectory()
  } catch {
    return false
  }
}

const isAtomDir = (dir: string): boolean => {
  if (!isDir(dir)) return false
  const entries = readdirSync(dir)
  return entries.includes('SKILL.md') || entries.includes('index.ts') || entries.includes('index.tsx')
}

export function listAtomPaths(cwd = process.cwd()): string[] {
  const root = join(cwd, SRC)
  const out: string[] = []
  const walk = (dir: string, rel: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir)
    } catch {
      return
    }
    if (isAtomDir(dir)) out.push(rel || '.')
    for (const e of entries) {
      if (e.startsWith('.') || e === 'node_modules') continue
      const p = join(dir, e)
      if (!isDir(p)) continue
      const seg = rel ? `${rel}/${e}` : e
      if (!rel && SKIP_TREES.has(seg)) continue
      walk(p, seg)
    }
  }
  walk(root, '')
  return out.sort()
}

export function pathWireViolations(cwd = process.cwd()): PathWireViolation[] {
  const atoms = new Set(listAtomPaths(cwd).filter((p) => p !== '.'))
  const out: PathWireViolation[] = []
  for (const p of atoms) {
    const parts = p.split('/').filter(Boolean)
    if (parts.length <= 1) continue
    if (parts.length > 2) {
      out.push({
        atomPath: p,
        kind: 'depth-exceeds-wire',
        detail: `depth ${parts.length} — only A/B ↔ B/A permitted`,
      })
      continue
    }
    const rev = `${parts[1]}/${parts[0]}`
    if (!atoms.has(rev)) {
      out.push({
        atomPath: p,
        kind: 'one-way-path',
        detail: `missing reciprocal ${rev}`,
        reciprocal: rev,
      })
    }
  }
  return out
}

/** One-word child from stray basename — last segment wins (strict-apply → apply). */
export function childWordFromBasename(basename: string): string | null {
  if (!basename.endsWith('.ts')) return null
  let stem = basename.slice(0, -3)
  if (stem.endsWith('.test')) stem = stem.slice(0, -5)
  const segments = stem.split(/[-.]/)
  const word = segments[segments.length - 1]!
  if (!/^[a-z][a-z0-9]*$/.test(word)) return null
  return word
}

export function straySiblings(parentAtom: string, cwd = process.cwd()): StraySibling[] {
  const dir = join(cwd, SRC, parentAtom)
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return []
  }
  const out: StraySibling[] = []
  for (const e of entries) {
    if (!e.endsWith('.ts')) continue
    if (e === 'index.ts' || e === 'test.ts') continue
    if (COLOCATED.has(e) || GENERATED.test(e)) continue
    const word = childWordFromBasename(e)
    if (!word) continue
    const primaryPath = `${parentAtom}/${word}`
    const reciprocalPath = `${word}/${parentAtom}`
    out.push({ parentAtom, file: e, stem: e.replace(/\.ts$/, ''), childWord: word, primaryPath, reciprocalPath })
  }
  return out
}

const stubSkill = (p: string, pair: string): string =>
  `---\nname: ${p.split('/').pop()}\natomPath: ${p}\n---\n\n# ${p}\n\nDouble-wire cross of \`${pair}\`.\n`

const stubReciprocalIndex = (p: string, pair: string): string =>
  `import { recordOnPath } from '@/path'\nexport const atomPath = '${p}' as const\nexport * from '@/${pair}'\nrecordOnPath(atomPath, { kind: 'path-double-wire', pair: '${pair}' })\n`

const stubTest = (p: string): string =>
  `import { describe, it, expect } from 'vitest'\nimport { atomPath } from './index'\ndescribe('${p}', () => { it('path', () => { expect(atomPath).toBe('${p}') }) })\n`

const ensureTrinity = (atom: string, pair: string, cwd: string): void => {
  const dir = join(cwd, SRC, atom)
  mkdirSync(dir, { recursive: true })
  const skill = join(dir, 'SKILL.md')
  const index = join(dir, 'index.ts')
  const test = join(dir, 'test.ts')
  if (!existsSync(skill)) writeFileSync(skill, stubSkill(atom, pair))
  if (!existsSync(index)) writeFileSync(index, stubReciprocalIndex(atom, pair))
  if (!existsSync(test)) writeFileSync(test, stubTest(atom))
}

/** Move stray siblings into child index.ts crosses + materialise reciprocal path. */
export function migrateAtomStrays(
  parentAtom: string,
  cwd = process.cwd(),
  opts: { readonly dryRun?: boolean; readonly max?: number } = {},
): MigrateResult {
  const dryRun = opts.dryRun !== false
  const max = opts.max ?? 40
  const moved: string[] = []
  const reciprocalCreated: string[] = []
  const skipped: string[] = []
  const errors: string[] = []

  for (const s of straySiblings(parentAtom, cwd).slice(0, max)) {
    const srcFile = join(cwd, SRC, parentAtom, s.file)
    const primaryDir = join(cwd, SRC, s.primaryPath)
    const primaryIndex = join(primaryDir, 'index.ts')
    const isTest = s.file.includes('.test.')
    const primaryTest = join(primaryDir, 'test.ts')

    if (existsSync(primaryIndex) && !isTest) {
      skipped.push(`${s.file} → ${s.primaryPath}/index.ts exists`)
      continue
    }

    if (dryRun) {
      moved.push(`${s.file} → ${s.primaryPath}/${isTest ? 'test.ts' : 'index.ts'}`)
      reciprocalCreated.push(s.reciprocalPath)
      continue
    }

    try {
      mkdirSync(primaryDir, { recursive: true })
      const content = readFileSync(srcFile, 'utf8')
      if (isTest) {
        const existing = existsSync(primaryTest) ? readFileSync(primaryTest, 'utf8') + '\n' : ''
        writeFileSync(primaryTest, existing + content)
      } else {
        writeFileSync(primaryIndex, content)
        ensureTrinity(s.primaryPath, s.reciprocalPath, cwd)
      }
      if (!existsSync(join(cwd, SRC, s.reciprocalPath, 'index.ts'))) {
        ensureTrinity(s.reciprocalPath, s.primaryPath, cwd)
        reciprocalCreated.push(s.reciprocalPath)
      }
      renameSync(srcFile, join(primaryDir, `.migrated-${s.file}`))
      unlinkSafe(join(primaryDir, `.migrated-${s.file}`))
      moved.push(`${s.file} → ${s.primaryPath}`)
    } catch (e) {
      errors.push(`${s.file}: ${e instanceof Error ? e.message : String(e)}`)
    }
  }
  return { dryRun, moved, reciprocalCreated, skipped, errors }
}

const unlinkSafe = (p: string): void => {
  try {
    if (existsSync(p)) {
      unlinkSync(p)
    }
  } catch {
    /* best effort */
  }
}

export function formatCrossReport(cwd = process.cwd()): string {
  const wires = pathWireViolations(cwd)
  const oneWay = wires.filter((w) => w.kind === 'one-way-path').length
  const deep = wires.filter((w) => w.kind === 'depth-exceeds-wire').length
  const lines = [
    'erpax index/cross — path double-wire seal\n',
    `  one-way paths    ${oneWay}`,
    `  depth > 2        ${deep}`,
  ]
  for (const w of wires.slice(0, 12)) {
    lines.push(`    ${w.kind} · ${w.atomPath} — ${w.detail}`)
  }
  lines.push('\nMigrate: tsx src/index/cross/index.ts --migrate <atom> --apply')
  return lines.join('\n')
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const apply = process.argv.includes('--apply')
  const migrateIdx = process.argv.indexOf('--migrate')
  if (migrateIdx >= 0) {
    const atom = process.argv[migrateIdx + 1]
    if (!atom) {
      console.error('usage: --migrate <atomPath> [--apply]')
      process.exit(1)
    }
    const r = migrateAtomStrays(atom, process.cwd(), { dryRun: !apply })
    console.log(JSON.stringify(r, null, 2))
    process.exit(r.errors.length ? 1 : 0)
  }
  console.log(formatCrossReport())
  process.exit(pathWireViolations().length > 0 ? 1 : 0)
}
