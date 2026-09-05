/**
 * diamond/membership — stray-file membership audit (no readme dependency).
 *
 * Shared by @/diamond/files (guardian scan) and @/readme/deriveFolderModel (seal).
 * A folder with stray matter is incomplete and cannot seal.
 */
import { existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const SRC = 'src'

/** Must match @/readme COMPUTED_FACES — inlined to avoid circular init. */
const COMPUTED_FACES = ['README.md', 'LLM.md', 'diamond.json'] as const

export type DiamondAtomKind = 'vocabulary' | 'code'

export const TRINITY_FORM = 'SKILL.md' as const
export const TRINITY_CODE = ['index.ts', 'test.ts'] as const
export const CODE_MARKERS = ['index.ts', 'index.tsx', 'test.ts', 'test.tsx'] as const

const TSX_EXT = /\.tsx$/i
const COLOCATED_TEST = /\.test\.(ts|tsx)$/i
const FORBIDDEN_NAME = /\.(bak|backup)$/i
/** Lawful generated emit — never hand-edited gate inputs (coordinate b2f75a6f). */
const GENERATED_FACE = /\.generated\.(ts|json)$/i
/** CLI entry scripts at atom roots (package.json scripts · COLOCATED siblings). */
const CLI_SCRIPT = /\.mjs$/i
const MODULE_SCRIPT = /\.mts$/i
/** Framework asset extensions — seed images · admin styles (aligned with quaternary ASSET_EXT). */
const ASSET_EXT = /\.(scss|webp|mdc)$/i

/**
 * A `fixtures/` directory holds CAPTURED EVIDENCE — real responses frozen so a gate
 * can check erpax's parsers without reaching the network ([[outward]]/gate).
 *
 * The corpus had no home for it: a data directory is not a child atom (no SKILL.md),
 * so it read as `stray-dir`, and giving it a SKILL.md only traded one stray-dir for N
 * stray-files, because captured data is not a permitted atom file. Evidence is the
 * one thing a contract gate cannot inline without destroying what makes it evidence —
 * a byte-real capture you can diff and re-take.
 *
 * So the allowance is NARROW and content-checked, never name-only: the directory must
 * be named `fixtures`, be non-empty, contain NO subdirectories, and hold ONLY data.
 * A `fixtures/` with a single `.ts` in it is still a stray dir — code cannot hide here.
 */
export const FIXTURE_DIR = 'fixtures' as const
const FIXTURE_DATA_EXT = /\.(json|jsonl|ndjson|xml|wsdl|csv|tsv|txt|ya?ml)$/i

export const COLOCATED = [
  'index.tsx',
  'index.test.ts',
  'index.test.tsx',
  'test.tsx',
  'translations.ts',
  'seed.ts',
  'load-hook.mjs',
  'etrima-import.mjs',
  'hooks.registry.mjs',
] as const

const vocabularyCore = (): ReadonlySet<string> =>
  new Set([TRINITY_FORM, ...COLOCATED, ...COMPUTED_FACES])

const codeCore = (): ReadonlySet<string> =>
  new Set([TRINITY_FORM, ...TRINITY_CODE, ...COLOCATED, ...COMPUTED_FACES])

export const ALLOWED_DIAMOND_FILES: Readonly<Record<DiamondAtomKind, ReadonlySet<string>>> = {
  vocabulary: vocabularyCore(),
  code: codeCore(),
}

export interface DiamondMembershipViolation {
  readonly atomPath: string
  readonly file: string
  readonly reason: string
}

const isDir = (p: string): boolean => {
  try {
    return statSync(p).isDirectory()
  } catch {
    return false
  }
}

const basenames = (dir: string): string[] => {
  try {
    return readdirSync(dir)
  } catch {
    return []
  }
}

export function diamondAtomKind(files: Iterable<string>): DiamondAtomKind {
  const set = new Set(files)
  return CODE_MARKERS.some((m) => set.has(m)) ? 'code' : 'vocabulary'
}

export function isChildAtomDir(parentDir: string, name: string): boolean {
  return existsSync(join(parentDir, name, TRINITY_FORM))
}

/**
 * A PATH SEGMENT — a directory that holds only directories, on the way to a real atom.
 *
 * `api/audit` contains nothing but `events`; `auto/populate` nothing but `created` and `tenant`.
 * These exist so a nested atom has an address. They hold no code, no prose and nothing to seal,
 * so charging them as stray asks them to become atoms — and an atom with nothing in it is
 * exactly what [[rules]]/prose forbids. Measured: 176 of 248 stray-dirs were this.
 *
 * The allowance is NARROW and content-checked, like the `fixtures` one above and for the same
 * reason. The directory must contain NO FILES at all, at least one subdirectory, and must lead
 * to a real atom: a folder of folders with no SKILL anywhere beneath it is still stray, because
 * then it is on the way to nothing.
 */
export function isPathSegmentDir(parentDir: string, name: string): boolean {
  const dir = join(parentDir, name)
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return false
  }
  if (entries.length === 0) return false
  if (entries.some((e) => !isDir(join(dir, e)))) return false // any file ⇒ it carries matter
  return leadsToAtom(dir, 6)
}

/** Does a real atom live anywhere beneath? Bounded, so a deep tree cannot walk forever. */
function leadsToAtom(dir: string, depth: number): boolean {
  if (depth <= 0) return false
  if (existsSync(join(dir, TRINITY_FORM))) return true
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return false
  }
  return entries.some((e) => isDir(join(dir, e)) && leadsToAtom(join(dir, e), depth - 1))
}

/**
 * A captured-evidence directory: named `fixtures`, non-empty, flat, data only.
 *
 * Fails CLOSED — an empty dir, a nested dir, or any non-data file makes it a stray
 * dir again, so this cannot become a pocket where code or clutter accumulates.
 */
export function isCapturedFixturesDir(parentDir: string, name: string): boolean {
  if (name !== FIXTURE_DIR) return false
  const dir = join(parentDir, name)
  const entries = basenames(dir)
  if (entries.length === 0) return false
  return entries.every(
    (e) => !isDir(join(dir, e)) && (e === '.gitkeep' || FIXTURE_DATA_EXT.test(e)),
  )
}

const isAllowedFile = (name: string, kind: DiamondAtomKind): boolean => {
  if (FORBIDDEN_NAME.test(name)) return false
  if (name.startsWith('.') && name !== '.gitkeep') return false
  if (GENERATED_FACE.test(name)) return true
  if (CLI_SCRIPT.test(name) || MODULE_SCRIPT.test(name)) return true
  if (ASSET_EXT.test(name)) return true
  const allowed = ALLOWED_DIAMOND_FILES[kind]
  if (allowed.has(name)) return true
  if (TSX_EXT.test(name)) return true
  if (kind === 'code') {
    if (COLOCATED_TEST.test(name)) return true
    // Barrel siblings — index.ts re-exports; not stray matter (integrity · typography · …).
    if (/\.ts$/i.test(name) && name !== TRINITY_CODE[0] && name !== TRINITY_CODE[1]) return true
  }
  return false
}

/** Membership-only audit — stray files/dirs/dotfiles (no computed-face drift). */
export function diamondMembershipViolations(
  atomPath: string,
  cwd: string = process.cwd(),
): DiamondMembershipViolation[] {
  const dir = join(cwd, SRC, atomPath)
  const entries = basenames(dir)
  const fileNames = entries.filter((e) => !isDir(join(dir, e)))
  const kind = diamondAtomKind(fileNames)
  const violations: DiamondMembershipViolation[] = []
  const computed = new Set<string>(COMPUTED_FACES)

  for (const e of entries) {
    const p = join(dir, e)
    if (isDir(p)) {
      const lawful = isChildAtomDir(dir, e) || isCapturedFixturesDir(dir, e) || isPathSegmentDir(dir, e)
      if (!lawful) violations.push({ atomPath, file: e + '/', reason: 'stray-dir' })
      continue
    }
    if (FORBIDDEN_NAME.test(e)) {
      violations.push({ atomPath, file: e, reason: 'forbidden-backup' })
      continue
    }
    if (e.startsWith('.')) {
      violations.push({ atomPath, file: e, reason: 'stray-dotfile' })
      continue
    }
    if (e.endsWith('.md') && e !== TRINITY_FORM && !computed.has(e)) {
      violations.push({ atomPath, file: e, reason: 'stray-markdown' })
      continue
    }
    if (!isAllowedFile(e, kind)) violations.push({ atomPath, file: e, reason: 'stray-file' })
  }
  return violations
}

export function diamondMembershipOk(atomPath: string, cwd: string = process.cwd()): boolean {
  return diamondMembershipViolations(atomPath, cwd).length === 0
}

/** @index-cross.foldback child=diamond/membership parent=diamond — this cross folds back into its parent. */
