/**
 * baseline-debt — ALCAP `*_BASELINE` exports are eventual seal violations.
 *
 * Hand-maintained SCREAMING_SNAKE baseline constants are ratchet debt — they must
 * migrate to `computedBaseline(axis)` from law/folder/ratchet.generated. This scan
 * flags every surviving export in rules/ · law/folder/ · seal/.
 *
 * @see ../law/folder/baseline — ./cross-concept
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { BASELINE_CONST_TO_AXIS } from '@/law/folder/baseline'

const SCAN_ROOTS = ['src/rules', 'src/law/folder', 'src/seal'] as const

/** Migrated axes — ceiling lives only in ratchet.generated emit. */
const MIGRATED_CONSTS = new Set([
  'ACCOUNTING_STRUCTURE_BASELINE',
  'FORBIDDEN_INTERMEDIATE_BASELINE',
  'STRAY_TS_BASELINE',
  'MULTI_SEGMENT_BASELINE',
  'DIAMOND_FILES_BASELINE',
  'NAME_BASELINE',
  'TRINITY_BASELINE',
  'FOLDER_LAW_BASELINE',
  'ALPHANUMERIC_NAME_BASELINE',
  'IMPORT_PURITY_BASELINE',
  'CONCENTRATION_BASELINE',
  'WORD_MATTER_BASELINE',
  'WORD_WITHOUT_CODE_BASELINE',
])

const EXPORT_BASELINE_RE = /export\s+const\s+([A-Z][A-Z0-9_]*_BASELINE)\s*=/g

export interface AlcapsBaselineViolation {
  readonly file: string
  readonly constName: string
  readonly axis: string | null
  readonly law: 'seal-debt'
  readonly reason: string
}

const isFile = (p: string): boolean => {
  try {
    return statSync(p).isFile()
  } catch {
    return false
  }
}

const walkTs = (dir: string, cwd: string, out: string[]): void => {
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return
  }
  for (const e of entries) {
    if (e.startsWith('.')) continue
    const p = join(dir, e)
    if (!isFile(p)) {
      if (statSync(p).isDirectory()) walkTs(p, cwd, out)
      continue
    }
    if (/\.tsx?$/.test(e) && !e.endsWith('.test.ts')) out.push(relative(cwd, p))
  }
}

/** Scan rules/ · law/folder/ · seal/ for exported ALL_CAPS baseline consts. */
export function alcapsBaselineViolations(cwd: string = process.cwd()): readonly AlcapsBaselineViolation[] {
  const files: string[] = []
  for (const root of SCAN_ROOTS) {
    walkTs(join(cwd, root), cwd, files)
  }

  const out: AlcapsBaselineViolation[] = []
  const seen = new Set<string>()

  for (const rel of files.sort()) {
    const content = readFileSync(join(cwd, rel), 'utf8')
    for (const match of content.matchAll(EXPORT_BASELINE_RE)) {
      const constName = match[1]!
      if (MIGRATED_CONSTS.has(constName)) continue
      const key = `${rel}:${constName}`
      if (seen.has(key)) continue
      seen.add(key)
      const axis = BASELINE_CONST_TO_AXIS[constName] ?? null
      out.push({
        file: rel,
        constName,
        axis,
        law: 'seal-debt',
        reason: axis
          ? `ALCAP ${constName} — migrate to computedBaseline('${axis}') from law/folder/ratchet.generated`
          : `ALCAP ${constName} — hand baseline is seal-debt; run pnpm rules:ratchet for axis ${axis ?? '?'}`,
      })
    }
  }

  return out
}
