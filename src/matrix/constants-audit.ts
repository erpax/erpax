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
import ts from 'typescript'

/** Matrix constants-audit coordinate — lawful vs crack categorization anchor. */
export const CONSTANTS_AUDIT_COORDINATE = '82bdf99d' as const

export type ConstantCategory =
  | 'lawful-physical'
  | 'lawful-binding'
  | 'lawful-code'
  | 'seal-debt'
  | 'crack'

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

/** Physical ratios and ring digits — lawful numeric literals. */
// Measured constants of nature and NIST enthalpies. The audit's own rule already
// names "physical ratios" as lawful: these are not statics a theorem could fold —
// they are what the theorems are computed FROM.
const LAWFUL_PHYSICAL = new Set([
  'HORO_DIGITS', 'HORO_MEASURE', 'LANDAUER_BIT', 'COMPARABLE_UNIT',
  'FARADAY_C_PER_MOL', 'BOLTZMANN_J_PER_K', 'AVOGADRO_PER_MOL',
  'SPLIT_KJ_PER_MOL', 'HHV_KJ_PER_MOL', 'LHV_KJ_PER_MOL', 'SPLIT_GIBBS_KJ_PER_MOL', 'MOL_PER_LITRE',
  // CODATA/IUPAC molar masses and molar volume — measured, not derivable from any seal
  'WATER_G_PER_MOL', 'HYDROGEN_G_PER_MOL', 'OXYGEN_G_PER_MOL', 'MOLAR_VOLUME_L_PER_MOL',
  // oxidation enthalpy per gram COD, and the measured energy an aeration basin spends
  'COD_KJ_PER_G', 'AERATION_KWH_PER_LITRE',
])

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

/**
 * Not corpus matter, so not a crack.
 *
 * A crack is a HAND-WRITTEN static a theorem could have folded. Two kinds of file
 * can never be that, and both were being counted:
 *
 *  · GENERATED faces — `skills.index.ts`, `catalogue.ts`, `uuid/matrix/generated.ts`.
 *    Telling a generated file to "compute from sealed state" is vacuous: it IS the
 *    computed state. The old pattern required a dot before "generated", so a bare
 *    `generated.ts` slipped through. Generated bundles are not evidence — the same
 *    law rules/unfolded, rules/canonical and rules/collapse all apply.
 *  · the Next App Router tree — `export const dynamic|revalidate|metadata|maxDuration`
 *    are names the FRAMEWORK reserves and reads by exact spelling. They are not
 *    erpax's to derive, exactly as rules/echo excludes `app/` from the echo law and
 *    rules/compatibility states that the framework's namespace is not in this
 *    corpus's model.
 */
const SKIP_FILES = /\.(test|generated)\.tsx?$|^(generated|catalogue|skills\.index|payload-types)\.tsx?$/
/** Next.js owns this tree; its route-segment exports are the framework's, not ours. */
const SKIP_DIRS = new Set(['app'])

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
    // Only at the src root: a nested `app` folder is ordinary corpus matter.
    if (SKIP_DIRS.has(e) && relative(cwd, dir) === SRC) continue
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

/** Unwrap `as const` / `satisfies` / parens / type-assertion to the real expression. */
const unwrap = (n: ts.Expression): ts.Expression => {
  let e = n
  while (
    ts.isAsExpression(e) ||
    ts.isSatisfiesExpression(e) ||
    ts.isParenthesizedExpression(e) ||
    ts.isTypeAssertionExpression(e)
  ) {
    e = e.expression
  }
  return e
}

/**
 * Is this initializer a DATA LITERAL — a hardcoded value — or CODE?
 *
 * The axis's law: "export const is seal-debt; compute from sealed state instead."
 * That indicts a hardcoded VALUE, never a function or a computed expression. A
 * regex over `export const X =` cannot tell `export const RATE = 0.2` (a static
 * datum — the real crack) from `export const exactMax = (a, b) => …` (a pure
 * function — CODE, not seal-debt). It counted both, so 57% of the "cracks" were
 * arrow functions. The grammar is the theorem: a const bound to a function or a
 * call/expression is code that already computes; only a bare data literal is a
 * static a theorem could fold. Unwrap `as const` / `satisfies` / parentheses to
 * reach the real initializer.
 */
const isDataLiteral = (node: ts.Expression): boolean => {
  const n = unwrap(node)
  // A prefixed numeric literal (e.g. -1) is still a hardcoded datum.
  if (ts.isPrefixUnaryExpression(n)) return ts.isNumericLiteral(n.operand)
  return (
    ts.isNumericLiteral(n) ||
    ts.isBigIntLiteral(n) ||
    ts.isStringLiteral(n) ||
    ts.isNoSubstitutionTemplateLiteral(n) ||
    ts.isArrayLiteralExpression(n) ||
    ts.isObjectLiteralExpression(n) ||
    n.kind === ts.SyntaxKind.TrueKeyword ||
    n.kind === ts.SyntaxKind.FalseKeyword
  )
}

/**
 * An IDENTITY SEED is a string const whose value is its own name or its atom's
 * leaf — `export const abdomen = 'abdomen'`. The axis's own test calls these
 * "correctly axioms, s > 0": the assumed base a theorem is proven FROM, not a
 * derivable static. Irreducible, so lawful.
 */
const isIdentitySeed = (name: string, init: ts.Expression, atomLeaf: string): boolean => {
  const e = unwrap(init)
  return ts.isStringLiteral(e) && (e.text === name || e.text === atomLeaf)
}

const categorize = (
  constName: string,
  initializer: ts.Expression | undefined,
  atomLeaf: string,
): ConstantCategory => {
  if (LAWFUL_PHYSICAL.has(constName)) return 'lawful-physical'
  if (LAWFUL_BINDING_NAMES.has(constName) || LAWFUL_BINDING_RE.test(constName)) return 'lawful-binding'
  if (BASELINE_RE.test(constName)) return 'seal-debt'
  // Per-atom i18n data (`export const translations = {…}`) is irreducible source
  // content, not a derivable static — one per atom, lawful like the identity seed.
  if (constName === 'translations') return 'lawful-binding'
  if (initializer && isIdentitySeed(constName, initializer, atomLeaf)) return 'lawful-binding'
  // No initializer (declare const) or a function/computed expression is CODE — it
  // already computes; it is not a static value a theorem could fold.
  if (!initializer || !isDataLiteral(initializer)) return 'lawful-code'
  return 'crack'
}

/** The atom leaf for a repo-relative file — the folder name that owns it. */
const atomLeafOf = (relFile: string): string => {
  const parts = relFile.replace(/^src\//, '').split('/')
  return parts.length > 1 ? parts[parts.length - 2]! : parts[0]!.replace(/\.[^.]+$/, '')
}

/** Every exported `const` name + its initializer, read from the grammar (not a regex). */
function exportedConsts(file: string, text: string): ReadonlyArray<{ name: string; init: ts.Expression | undefined }> {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true)
  const out: { name: string; init: ts.Expression | undefined }[] = []
  const visit = (node: ts.Node): void => {
    if (
      ts.isVariableStatement(node) &&
      node.declarationList.flags & ts.NodeFlags.Const &&
      node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      for (const decl of node.declarationList.declarations) {
        if (ts.isIdentifier(decl.name)) out.push({ name: decl.name.text, init: decl.initializer })
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return out
}

/** Scan all src TypeScript for exported const — categorize lawful vs crack. */
export function auditConstants(cwd: string = process.cwd()): ConstantAuditReport {
  const files: string[] = []
  walkTs(join(cwd, SRC), cwd, files)

  const entries: ConstantAuditEntry[] = []
  const byCategory: Record<ConstantCategory, number> = {
    'lawful-physical': 0,
    'lawful-binding': 0,
    'lawful-code': 0,
    'seal-debt': 0,
    crack: 0,
  }
  const cracksByAtom: Record<string, number> = {}
  const lawfulNames = new Set<string>()

  for (const rel of files.sort()) {
    const content = readFileSync(join(cwd, rel), 'utf8')
    const atomPath = atomPathOf(rel)
    const atomLeaf = atomLeafOf(rel)
    for (const { name: constName, init } of exportedConsts(rel, content)) {
      const category = categorize(constName, init, atomLeaf)
      entries.push({ file: rel, atomPath, constName, category })
      byCategory[category]++
      if (category !== 'crack' && category !== 'seal-debt') {
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
