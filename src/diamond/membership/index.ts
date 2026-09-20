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

/**
 * Folder names that may hold flat, single-extension data beside an atom. DECLARED, never
 * inferred — see isDataDir for why this is name-scoped.
 */
export const DATA_DIRS: ReadonlySet<string> = new Set(['lean', 'messages'])

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

/**
 * Does corpus MATTER live anywhere beneath? Bounded, so a deep tree cannot walk forever.
 *
 * The predicate was once "is there a SKILL beneath", and that charged an ancestor for its
 * descendant's missing FORM leg: `bank/reconciliation` holds nothing but `service/`, which carries
 * `index.ts` and owes a SKILL — so the leaf was reported once as a stray dir and every folder above
 * it was reported again for the same absence. 45 of 117 were that cascade.
 *
 * A directory of directories that leads to real TypeScript is a path segment doing its job. The
 * leaf still owes its SKILL and is still charged for it; the ancestors owe nothing.
 */
function leadsToAtom(dir: string, depth: number): boolean {
  if (depth <= 0) return false
  if (existsSync(join(dir, TRINITY_FORM))) return true
  let own: string[]
  try {
    own = readdirSync(dir)
  } catch {
    return false
  }
  if (own.some((e) => /\.tsx?$/.test(e) && !isDir(join(dir, e)))) return true
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

/**
 * A DATA directory: flat, non-empty, one non-TypeScript extension, and no code at all.
 *
 * `verify/lean` holds 17 `.lean` sources a kernel compiles; `i18n/messages` holds one JSON
 * bundle per supported locale. Neither is an atom and neither should become one: making them
 * atoms charges EVERY data file inside as stray matter, which is 52 charges to silence 2 — the
 * same cascade [[diamond]]/membership already corrected for path segments and fixtures.
 *
 * It is NAME-scoped, exactly like the fixtures allowance and for the reason that one is: data
 * under an arbitrary name must stay stray, or the gate becomes a place to hide things. DATA_DIRS
 * is DECLARED in the open so it can be argued with — no theorem derives which folder names a
 * corpus keeps its data under.
 *
 * The content checks are the narrowest shape that admits them. Fails CLOSED: a subdirectory, a mixed
 * extension, an empty dir, or a single `.ts` file makes it a stray dir again, so this cannot
 * become a pocket where code accumulates out of the corpus's sight. One generated face is
 * tolerated beside the data because the emitter writes it there ([[rules]]/drift: the arbiter
 * lives with what it measures).
 */
export function isDataDir(parentDir: string, name: string): boolean {
  if (!DATA_DIRS.has(name)) return false
  const dir = join(parentDir, name)
  const entries = basenames(dir)
  if (entries.length === 0) return false
  if (entries.some((e) => isDir(join(dir, e)))) return false
  if (existsSync(join(dir, TRINITY_FORM))) return false
  const data = entries.filter((e) => e !== '.gitkeep' && !GENERATED_FACE.test(e) && !/\.generated\.[a-z]+$/i.test(e))
  if (data.length === 0) return false
  if (data.some((e) => TSX_EXT.test(e) || /\.tsx?$/i.test(e))) return false
  const ext = (f: string): string => (f.includes('.') ? f.slice(f.lastIndexOf('.')).toLowerCase() : '')
  const first = ext(data[0] as string)
  if (!first) return false
  return data.every((e) => ext(e) === first)
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
      const lawful = isChildAtomDir(dir, e) ||
        isCapturedFixturesDir(dir, e) ||
        isPathSegmentDir(dir, e) ||
        isDataDir(dir, e)
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
