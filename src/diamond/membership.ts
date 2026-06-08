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
      if (!isChildAtomDir(dir, e)) violations.push({ atomPath, file: e + '/', reason: 'stray-dir' })
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
