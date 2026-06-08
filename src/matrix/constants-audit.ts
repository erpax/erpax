/**
 * constants-audit — categorize exported const cracks vs lawful bindings.
 *
 * Lawful保留: HORO_DIGITS · physical ratios (LANDAUER_BIT) · binding TYPE_LINKS
 * and wire points (PART/CANONICAL/PARENT · collection slugs · coordinates).
 * Everything else is a crack — computed from sealed state instead.
 *
 * Coordinate 82bdf99d — matrix crack audit anchor.
 *
 * @see ./index.ts — ../law/folder/baseline — ../seal/baseline-debt
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

/** Matrix constants-audit coordinate — lawful vs crack categorization anchor. */
export const CONSTANTS_AUDIT_COORDINATE = '82bdf99d' as const

export type ConstantCategory = 'lawful-physical' | 'lawful-binding' | 'seal-debt' | 'crack'

export interface ConstantAuditEntry {
  readonly file: string
  readonly atomPath: string
  readonly constName: string
  readonly category: ConstantCategory
}

export interface ConstantAuditReport {
  readonly coordinate: typeof CONSTANTS_AUDIT_COORDINATE
  readonly entries: readonly ConstantAuditEntry[]
  readonly byCategory: Readonly<Record<ConstantCategory, number>>
  readonly cracksByAtom: Readonly<Record<string, number>>
  readonly crackTotal: number
  readonly lawfulNames: readonly string[]
}

export interface MatrixCrackViolation {
  readonly atomPath: string
  readonly file: string
  readonly constName: string
  readonly law: 'matrix-crack'
  readonly reason: string
}

const SRC = 'src'

const EXPORT_CONST_RE = /export\s+const\s+([A-Za-z_][A-Za-z0-9_]*)\s*=/g

/** Physical ratios and ring digits — lawful numeric literals. */
const LAWFUL_PHYSICAL = new Set(['HORO_DIGITS', 'HORO_MEASURE', 'LANDAUER_BIT', 'COMPARABLE_UNIT'])

/** Explicit binding tables — wrangler TYPE_LINKS and kin. */
const LAWFUL_BINDING_NAMES = new Set([
  'TYPE_LINKS',
  'CLOUDFLARE_BINDING_TYPES',
  'BASELINE_CONST_TO_AXIS',
  'COMPUTED_AT_ALL_SCALES_COORDINATE',
  'CONSTANTS_AUDIT_COORDINATE',
])

/** Atom wire triplets · collection slugs · matrix coordinates · trinity bindings. */
const LAWFUL_BINDING_RE =
  /^(PART|CANONICAL|PARENT|atomPath|reexportFrom|TRINITY|TRINITY_FORM|TRINITY_CODE|ONE_WORD|ALPHANUMERIC_NAME|ROOT_TS_ALLOWED|ACCOUNTING_NEST_MAP|FORBIDDEN_INTERMEDIATE_SEGMENTS)$|_COORDINATE$|_COLLECTION$|_FIELD$|_CONTRA_PATH$|_PREFIX$|_REL$|^NIL_/

const BASELINE_RE = /^[A-Z][A-Z0-9_]*_BASELINE$/

const SKIP_FILES = /\.(test|generated)\.tsx?$/

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
    if (e.startsWith('.') || e === 'node_modules') continue
    const p = join(dir, e)
    if (!isFile(p)) {
      try {
        if (statSync(p).isDirectory()) walkTs(p, cwd, out)
      } catch {
        /* skip */
      }
      continue
    }
    if (/\.tsx?$/.test(e) && !SKIP_FILES.test(e)) out.push(relative(cwd, p))
  }
}

const atomPathOf = (relFile: string): string => {
  const underSrc = relFile.replace(/^src\//, '')
  const i = underSrc.lastIndexOf('/')
  return i > 0 ? underSrc.slice(0, i) : underSrc.replace(/\.[^.]+$/, '')
}

const categorize = (constName: string): ConstantCategory => {
  if (LAWFUL_PHYSICAL.has(constName)) return 'lawful-physical'
  if (LAWFUL_BINDING_NAMES.has(constName) || LAWFUL_BINDING_RE.test(constName)) return 'lawful-binding'
  if (BASELINE_RE.test(constName)) return 'seal-debt'
  return 'crack'
}

/** Scan all src TypeScript for exported const — categorize lawful vs crack. */
export function auditConstants(cwd: string = process.cwd()): ConstantAuditReport {
  const files: string[] = []
  walkTs(join(cwd, SRC), cwd, files)

  const entries: ConstantAuditEntry[] = []
  const byCategory: Record<ConstantCategory, number> = {
    'lawful-physical': 0,
    'lawful-binding': 0,
    'seal-debt': 0,
    crack: 0,
  }
  const cracksByAtom: Record<string, number> = {}
  const lawfulNames = new Set<string>()

  for (const rel of files.sort()) {
    const content = readFileSync(join(cwd, rel), 'utf8')
    const atomPath = atomPathOf(rel)
    for (const match of content.matchAll(EXPORT_CONST_RE)) {
      const constName = match[1]!
      const category = categorize(constName)
      entries.push({ file: rel, atomPath, constName, category })
      byCategory[category]++
      if (category === 'lawful-physical' || category === 'lawful-binding') {
        lawfulNames.add(constName)
      }
      if (category === 'crack') {
        cracksByAtom[atomPath] = (cracksByAtom[atomPath] ?? 0) + 1
      }
    }
  }

  return {
    coordinate: CONSTANTS_AUDIT_COORDINATE,
    entries,
    byCategory,
    cracksByAtom,
    crackTotal: byCategory.crack,
    lawfulNames: [...lawfulNames].sort(),
  }
}

/** Every exported crack const — one violation per unlawful export. */
export function matrixCrackViolations(cwd: string = process.cwd()): readonly MatrixCrackViolation[] {
  const audit = auditConstants(cwd)
  return audit.entries
    .filter((e) => e.category === 'crack')
    .map((e) => ({
      atomPath: e.atomPath,
      file: e.file,
      constName: e.constName,
      law: 'matrix-crack' as const,
      reason: `matrix crack ${e.constName} — export const is seal-debt; compute from sealed state`,
    }))
}
