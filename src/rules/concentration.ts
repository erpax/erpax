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
): ConcentrationMetrics {
  const lines = content.split('\n')
  const lineCount = lines.filter((l) => l.trim().length > 0 && !l.trim().startsWith('//')).length

  const exportMatches = content.match(/^export\s+/gm) ?? []
  const exportCount = exportMatches.length

  const reExportMatches =
    content.match(/^export\s+(?:type\s+)?(?:\{[^}]+\}|\*\s+as\s+\w+|\w+)\s+from\s+['"]/gm) ?? []
  const reExportCount = reExportMatches.length
  const inlineExportCount = Math.max(0, exportCount - reExportCount)

  const functionCount = (content.match(/\bfunction\s+\w+/g) ?? []).length
  const classCount = (content.match(/\bclass\s+\w+/g) ?? []).length

  const relativeImports = new Set<string>()
  for (const m of content.matchAll(/from\s+['"]\.\/([^'"]+)['"]/g)) {
    const seg = m[1]!.split('/')[0]!
    if (seg && !seg.startsWith('.')) relativeImports.add(seg)
  }
  const domainImportCount = relativeImports.size

  const reExportRatio = exportCount > 0 ? reExportCount / exportCount : 1

  const lineFactor = lineCount / CONCENTRATION_LINE_THRESHOLD
  const inlineFactor = inlineExportCount / CONCENTRATION_EXPORT_THRESHOLD
  const hubDebt =
    childAtomCount > 0 && lineCount > 150 && reExportRatio < CONCENTRATION_REEXPORT_RATIO_MIN ? 0.25 : 0
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
    reExportRatio,
    concentrationScore,
  }
}

export function isConcentrationViolation(metrics: ConcentrationMetrics): boolean {
  if (metrics.concentrationScore >= CONCENTRATION_SCORE_THRESHOLD) return true
  if (metrics.lineCount >= CONCENTRATION_LINE_THRESHOLD) return true
  if (
    metrics.childAtomCount > 0 &&
    metrics.lineCount >= 200 &&
    metrics.reExportRatio < CONCENTRATION_REEXPORT_RATIO_MIN
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
      const metrics = analyzeIndexConcentration(content, childAtoms.length)
      if (isConcentrationViolation(metrics)) {
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
      const metrics = analyzeIndexConcentration(content, childAtoms.length)
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
