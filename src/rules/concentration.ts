/**
 * rules/concentration — detect logic concentrated in hub index.ts vs child atoms.
 *
 * Hub law: parent `index.ts` re-exports only; matter lives in one-word child atoms.
 * Concentration = uncrossed deployment/partition axis (finishedIdeaCrossed).
 *
 * @see ./index.ts — ../navigation/distribute — ../seal/cross-concept
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { TRINITY_FORM } from '@/diamond/membership'
import ts from 'typescript'
import { importSpecifiersOf, moduleShape } from '@/syntax'

const SRC = 'src'

export const CONCENTRATION_LINE_THRESHOLD = 500
export const CONCENTRATION_EXPORT_THRESHOLD = 25
export const CONCENTRATION_REEXPORT_RATIO_MIN = 0.65
export const CONCENTRATION_SCORE_THRESHOLD = 1.0

export interface ConcentrationMetrics {
  readonly lineCount: number
  readonly exportCount: number
  readonly reExportCount: number
  readonly inlineExportCount: number
  readonly functionCount: number
  readonly classCount: number
  readonly childAtomCount: number
  readonly domainImportCount: number
  /** child atoms the index actually delegates to — re-exported OR imported and composed */
  readonly wiredChildCount: number
  readonly reExportRatio: number
  readonly concentrationScore: number
}

export interface ConcentrationViolation {
  readonly atomPath: string
  readonly file: string
  readonly law: 'logic-concentration'
  readonly reason: string
  readonly metrics: ConcentrationMetrics
  readonly fixSuggestion: string
  readonly childAtoms: readonly string[]
}

export interface ConcentrationRank {
  readonly atomPath: string
  readonly file: string
  readonly metrics: ConcentrationMetrics
}

const isDir = (p: string): boolean => {
  try {
    return statSync(p).isDirectory()
  } catch {
    return false
  }
}

export function childAtomDirs(atomPath: string, cwd: string = process.cwd()): readonly string[] {
  const dir = join(cwd, SRC, atomPath)
  let entries: string[]
  try {
    entries = readdirSync(dir)
  } catch {
    return []
  }
  const out: string[] = []
  for (const e of entries) {
    if (e.startsWith('.') || e === 'node_modules') continue
    const p = join(dir, e)
    if (!isDir(p)) continue
    if (existsSync(join(p, TRINITY_FORM))) out.push(e)
  }
  return out.sort()
}

export function analyzeIndexConcentration(
  content: string,
  childAtomCount: number,
  childAtoms: readonly string[] = [],
  atomPath = '',
): ConcentrationMetrics {
  const lines = content.split('\n')
  const lineCount = lines.filter((l) => l.trim().length > 0 && !l.trim().startsWith('//')).length

  // PARSED, not pattern-matched: the export/declaration/import counts come from the AST (@/syntax moduleShape),
  // so a commented `export`, an `export` inside a string, or a multi-line `export {…}` cannot skew the metric —
  // the logic-concentration gate passes computationally (the parser IS the language definition), not by regex guess.
  const shape = moduleShape('index.ts', content)
  const exportCount = shape.exports
  const reExportCount = shape.reExports
  const inlineExportCount = shape.inlineExports
  const functionCount = shape.functions
  const classCount = shape.classes
  const domainImportCount = shape.localImportRoots

  const reExportRatio = exportCount > 0 ? reExportCount / exportCount : 1

  // A child the parent IMPORTS and composes is distributed matter just as much as one it
  // re-exports. Counting only re-exports made the lawful shape unreachable: a Payload
  // collection holds its hooks and access in children, imports them, and assembles one
  // config — correct by this atom's own law, and permanently red, because composition
  // never raises the ratio. The only way past was `export *` on children nothing should
  // import, which is gaming the gate rather than obeying it.
  const specifiers = importSpecifiersOf('index.ts', content)
  const wiredChildCount = childAtoms.filter((child) =>
    specifiers.some(
      (spec) =>
        spec === `./${child}` ||
        spec.startsWith(`./${child}/`) ||
        (atomPath !== '' && (spec === `@/${atomPath}/${child}` || spec.startsWith(`@/${atomPath}/${child}/`))),
    ),
  ).length
  const delegatesToEveryChild = childAtomCount > 0 && wiredChildCount >= childAtomCount

  const lineFactor = lineCount / CONCENTRATION_LINE_THRESHOLD
  const inlineFactor = inlineExportCount / CONCENTRATION_EXPORT_THRESHOLD
  const hubDebt =
    childAtomCount > 0 && lineCount > 150 && reExportRatio < CONCENTRATION_REEXPORT_RATIO_MIN && !delegatesToEveryChild
      ? 0.25
      : 0
  const matterFactor =
    childAtomCount > 0 && functionCount + classCount >= 8 ? 0.15 : 0
  const domainFactor = domainImportCount >= 5 && lineCount >= 300 ? 0.2 : 0

  const concentrationScore =
    lineFactor * 0.4 +
    inlineFactor * 0.3 +
    (1 - reExportRatio) * 0.2 +
    hubDebt +
    matterFactor +
    domainFactor

  return {
    lineCount,
    exportCount,
    reExportCount,
    inlineExportCount,
    functionCount,
    classCount,
    childAtomCount,
    domainImportCount,
    wiredChildCount,
    reExportRatio,
    concentrationScore,
  }
}


/**
 * Does this atom fail ONLY because it has children it never wires? That alone
 * is adjacency, not concentration — the normal shape of a nested atom. See
 * SKILL.md for the `entropy` case that showed it.
 */
export function isAdjacencyOnly(metrics: ConcentrationMetrics): boolean {
  const unwired =
    metrics.childAtomCount > 0 &&
    metrics.lineCount >= 200 &&
    metrics.reExportRatio < CONCENTRATION_REEXPORT_RATIO_MIN &&
    metrics.wiredChildCount < metrics.childAtomCount
  if (!unwired) return false
  return (
    metrics.concentrationScore < CONCENTRATION_SCORE_THRESHOLD &&
    metrics.lineCount < CONCENTRATION_LINE_THRESHOLD &&
    !(metrics.childAtomCount >= 2 && metrics.inlineExportCount >= CONCENTRATION_EXPORT_THRESHOLD) &&
    metrics.functionCount + metrics.classCount < 15 &&
    !(metrics.domainImportCount >= 5 && metrics.lineCount >= 300)
  )
}

export function isConcentrationViolation(metrics: ConcentrationMetrics): boolean {
  if (metrics.concentrationScore >= CONCENTRATION_SCORE_THRESHOLD) return true
  if (metrics.lineCount >= CONCENTRATION_LINE_THRESHOLD) return true
  if (
    metrics.childAtomCount > 0 &&
    metrics.lineCount >= 200 &&
    metrics.reExportRatio < CONCENTRATION_REEXPORT_RATIO_MIN &&
    metrics.wiredChildCount < metrics.childAtomCount
  ) {
    return true
  }
  if (metrics.childAtomCount >= 2 && metrics.inlineExportCount >= CONCENTRATION_EXPORT_THRESHOLD) {
    return true
  }
  if (metrics.childAtomCount > 0 && metrics.functionCount + metrics.classCount >= 15) return true
  if (metrics.domainImportCount >= 5 && metrics.lineCount >= 300) return true
  return false
}

export function concentrationFixSuggestion(v: Pick<ConcentrationViolation, 'atomPath' | 'metrics' | 'childAtoms'>): string {
  const facets = v.childAtoms.length > 0 ? v.childAtoms.slice(0, 3).join(', ') : '<facet>'
  const inline = v.metrics.inlineExportCount + v.metrics.functionCount + v.metrics.classCount
  return (
    `split ${inline} inline export(s)/logic block(s) to child atom(s) under ${v.atomPath}/` +
    `{${facets},…}; parent index.ts re-exports only; ` +
    `wave distribute via tsx src/navigation/distribute.ts --inventory`
  )
}

const violationReason = (metrics: ConcentrationMetrics): string => {
  const parts: string[] = []
  if (metrics.lineCount >= CONCENTRATION_LINE_THRESHOLD) {
    parts.push(`${metrics.lineCount} lines (≥${CONCENTRATION_LINE_THRESHOLD})`)
  }
  if (metrics.childAtomCount > 0 && metrics.reExportRatio < CONCENTRATION_REEXPORT_RATIO_MIN) {
    parts.push(`re-export ratio ${(metrics.reExportRatio * 100).toFixed(0)}% (${metrics.childAtomCount} child atoms)`)
  }
  if (metrics.inlineExportCount >= 10) parts.push(`${metrics.inlineExportCount} inline exports`)
  if (metrics.functionCount + metrics.classCount >= 8) {
    parts.push(`${metrics.functionCount + metrics.classCount} fn/class definitions`)
  }
  if (metrics.domainImportCount >= 5) parts.push(`${metrics.domainImportCount} domain imports`)
  parts.push(`score ${metrics.concentrationScore.toFixed(2)}`)
  return parts.join(' · ')
}

export function concentrationViolations(cwd: string = process.cwd()): ConcentrationViolation[] {
  const out: ConcentrationViolation[] = []
  const root = join(cwd, SRC)
  const walk = (dir: string, rel: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir)
    } catch {
      return
    }
    const indexPath = join(dir, 'index.ts')
    if (existsSync(indexPath) && entries.includes(TRINITY_FORM)) {
      const atomPath = rel || '.'
      const childAtoms = childAtomDirs(atomPath === '.' ? '' : atomPath, cwd)
      const normalizedPath = atomPath === '.' ? '' : atomPath
      const content = readFileSync(indexPath, 'utf8')
      const metrics = analyzeIndexConcentration(content, childAtoms.length, childAtoms, atomPath)
      // A rule must be able to name the fix it demands. When the ONLY failing
      // condition is unwired children, the suggestion says "split N inline
      // exports to child atoms under {children}" — so if nothing the parent
      // exports depends on any child, that sentence names a destination the
      // matter does not belong to, and there is no lawful edit that clears it.
      // Evidence first: no attribution, no demand.
      const adjacencyOnly =
        isAdjacencyOnly(metrics) &&
        attributableExports(normalizedPath || '', cwd).length === 0
      if (isConcentrationViolation(metrics) && !adjacencyOnly) {
        const file = normalizedPath ? `${normalizedPath}/index.ts` : 'index.ts'
        const row: ConcentrationViolation = {
          atomPath: normalizedPath || 'src',
          file,
          law: 'logic-concentration',
          reason: violationReason(metrics),
          metrics,
          childAtoms,
          fixSuggestion: concentrationFixSuggestion({
            atomPath: normalizedPath || 'src',
            metrics,
            childAtoms,
          }),
        }
        out.push(row)
      }
    }
    for (const e of entries) {
      if (e.startsWith('.') || e === 'node_modules') continue
      const p = join(dir, e)
      if (!isDir(p)) continue
      walk(p, rel ? `${rel}/${e}` : e)
    }
  }
  walk(root, '')
  return out.sort(
    (a, b) => b.metrics.concentrationScore - a.metrics.concentrationScore || b.metrics.lineCount - a.metrics.lineCount,
  )
}

export function topConcentrations(cwd: string = process.cwd(), limit = 10): readonly ConcentrationRank[] {
  const ranked: ConcentrationRank[] = []
  const root = join(cwd, SRC)
  const walk = (dir: string, rel: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir)
    } catch {
      return
    }
    const indexPath = join(dir, 'index.ts')
    if (existsSync(indexPath)) {
      const atomPath = rel || '.'
      const normalizedPath = atomPath === '.' ? 'src' : atomPath
      const childAtoms = childAtomDirs(atomPath === '.' ? '' : atomPath, cwd)
      const content = readFileSync(indexPath, 'utf8')
      const metrics = analyzeIndexConcentration(content, childAtoms.length, childAtoms, atomPath)
      ranked.push({ atomPath: normalizedPath, file: `${normalizedPath}/index.ts`, metrics })
    }
    for (const e of entries) {
      if (e.startsWith('.') || e === 'node_modules') continue
      const p = join(dir, e)
      if (!isDir(p)) continue
      walk(p, rel ? `${rel}/${e}` : e)
    }
  }
  walk(root, '')
  return ranked
    .sort(
      (a, b) =>
        b.metrics.concentrationScore - a.metrics.concentrationScore ||
        b.metrics.lineCount - a.metrics.lineCount,
    )
    .slice(0, limit)
}

/** One inline export the hub could move, and the child atom its own dependencies name. */
export interface AttributableExport {
  readonly name: string
  /** the child atom whose exports this declaration uses — the only one */
  readonly child: string
  /** the symbols it borrows from that child — the evidence for the attribution */
  readonly via: readonly string[]
  /**
   * parent-local declarations the move would DRAG with it — types, helpers and
   * constants with no home below. A destination is not a cut size: these travel
   * too, or the move leaves a dangling reference.
   */
  readonly carries: readonly string[]
}

/**
 * Exported NAMES of a module — parsed.
 *
 * `moduleShape` returns counts, not names, which is why the first version of this
 * attributed nothing: every child's symbol set was empty and every hit list was
 * therefore empty too. A zero from an instrument is a claim like any other.
 */
const exportedNames = (file: string, text: string): Set<string> => {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true)
  const names = new Set<string>()
  for (const st of sf.statements) {
    const exported = ts.canHaveModifiers(st) && ts.getModifiers(st)?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    if (!exported) continue
    if ((ts.isFunctionDeclaration(st) || ts.isClassDeclaration(st) || ts.isInterfaceDeclaration(st) || ts.isTypeAliasDeclaration(st)) && st.name) {
      names.add(st.name.text)
    } else if (ts.isVariableStatement(st)) {
      for (const d of st.declarationList.declarations) if (ts.isIdentifier(d.name)) names.add(d.name.text)
    }
  }
  return names
}

const childExportNames = (atomPath: string, child: string, cwd: string): Set<string> => {
  const p = join(cwd, SRC, atomPath, child, 'index.ts')
  if (!existsSync(p)) return new Set()
  try {
    return exportedNames('index.ts', readFileSync(p, 'utf8'))
  } catch {
    return new Set()
  }
}

/**
 * The COMPUTED half of a hub split: inline exports whose own dependencies name
 * exactly one existing child atom.
 *
 * `fixSuggestion` says "split 87 inline exports to child atoms" and stops — which is
 * where the tool needed updating, not where the human takes over. A declaration that
 * borrows symbols from exactly ONE child already belongs there: the move is mechanical
 * and invents no name, exactly as a rename is mechanical when the path already says
 * the word ([[rules]]/hyphen).
 *
 * What it deliberately does NOT compute: a declaration using two children (a genuine
 * seam, and a judgement), or one using none (a new child atom, which needs a name and
 * a SKILL — the wall this corpus refuses to sweep past).
 */
export function attributableExports(atomPath: string, cwd: string = process.cwd()): AttributableExport[] {
  const indexPath = join(cwd, SRC, atomPath, 'index.ts')
  if (!existsSync(indexPath)) return []
  const children = childAtomDirs(atomPath, cwd)
  if (children.length === 0) return []

  const byChild = new Map(children.map((c) => [c, childExportNames(atomPath, c, cwd)]))
  const text = readFileSync(indexPath, 'utf8')
  const sf = ts.createSourceFile(indexPath, text, ts.ScriptTarget.Latest, true)
  const out: AttributableExport[] = []

  // every name this index declares at top level — the matter a move might drag
  const moduleLocals = new Set<string>()
  for (const st of sf.statements) {
    if ((ts.isFunctionDeclaration(st) || ts.isClassDeclaration(st) || ts.isInterfaceDeclaration(st) ||
      ts.isTypeAliasDeclaration(st) || ts.isEnumDeclaration(st)) && st.name && ts.isIdentifier(st.name))
      moduleLocals.add(st.name.text)
    else if (ts.isVariableStatement(st))
      for (const d of st.declarationList.declarations) if (ts.isIdentifier(d.name)) moduleLocals.add(d.name.text)
  }

  for (const st of sf.statements) {
    const exported = ts.canHaveModifiers(st) && ts.getModifiers(st)?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
    if (!exported) continue
    const name = ts.isFunctionDeclaration(st) || ts.isClassDeclaration(st)
      ? st.name?.text
      : ts.isVariableStatement(st)
        ? st.declarationList.declarations[0] && ts.isIdentifier(st.declarationList.declarations[0].name)
          ? st.declarationList.declarations[0].name.text
          : undefined
        : undefined
    if (!name) continue

    const used = new Set<string>()
    const visit = (n: ts.Node): void => {
      if (ts.isIdentifier(n)) used.add(n.text)
      ts.forEachChild(n, visit)
    }
    ts.forEachChild(st, visit)

    const hits = [...byChild].map(([child, names]) => ({ child, via: [...used].filter((u) => names.has(u)) }))
      .filter((h) => h.via.length > 0)
    // EXACTLY one child, or it is a seam rather than a misplacement.
    if (hits.length !== 1) continue

    // Naming a destination is not the same as knowing the size of the cut. A function
    // may borrow one symbol from a child and still lean on a dozen declarations that
    // live HERE — types, helpers, constants with no home below. Those travel with it or
    // the move leaves a dangling reference, so the manifest reports them.
    const bound = new Set<string>()
    const bind = (n: ts.Node): void => {
      if (ts.isParameter(n) && ts.isIdentifier(n.name)) bound.add(n.name.text)
      else if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name)) bound.add(n.name.text)
      else if (ts.isBindingElement(n) && ts.isIdentifier(n.name)) bound.add(n.name.text)
      else if (ts.isTypeParameterDeclaration(n)) bound.add(n.name.text)
      ts.forEachChild(n, bind)
    }
    ts.forEachChild(st, bind)
    const carries = [...used]
      .filter((u) => u !== name && !bound.has(u) && moduleLocals.has(u) && !byChild.get(hits[0]!.child)?.has(u))
      .sort()

    out.push({ name, child: hits[0]!.child, via: hits[0]!.via.sort(), carries })
  }
  return out
}

/** Every hub's computed split, largest first — the campaign as a manifest, not a suggestion. */
export function concentrationManifest(cwd: string = process.cwd()): ReadonlyArray<{
  readonly atomPath: string
  readonly movable: readonly AttributableExport[]
  readonly inlineExports: number
}> {
  return concentrationViolations(cwd)
    .map((v) => ({ atomPath: v.atomPath, movable: attributableExports(v.atomPath, cwd), inlineExports: v.metrics.inlineExportCount }))
    .filter((r) => r.movable.length > 0)
    .sort((a, b) => b.movable.length - a.movable.length)
}
