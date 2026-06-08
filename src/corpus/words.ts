/**
 * corpus/words — literary-word audit report (top offenders + use-case scores).
 *
 *   pnpm erpax corpus words
 *   pnpm erpax corpus words --json
 *
 * @see ../rules/word-without-logic
 */
import {
  wordWithoutLogicViolations,
  wordWithoutLogicFixSuggestion,
  type WordWithoutLogicViolation,
} from '@/rules/word-without-logic'

export interface CorpusWordsReport {
  readonly totalAtoms: number
  readonly literaryCount: number
  readonly withUseCase: number
  readonly withUseCasePct: number
  readonly top50: readonly WordWithoutLogicViolation[]
}

export function corpusWordsReport(cwd: string = process.cwd()): CorpusWordsReport {
  const audit = wordWithoutLogicViolations(cwd)
  return {
    totalAtoms: audit.totalAtoms,
    literaryCount: audit.literaryCount,
    withUseCase: audit.withUseCase,
    withUseCasePct: audit.withUseCasePct,
    top50: audit.top50,
  }
}

export function formatCorpusWordsReport(report: CorpusWordsReport): string {
  const lines = [
    'corpus words — literary audit',
    `  atoms: ${report.totalAtoms}`,
    `  literary: ${report.literaryCount} (${((report.literaryCount / Math.max(report.totalAtoms, 1)) * 100).toFixed(1)}% prose-only / orphan)`,
    `  with use case: ${report.withUseCase} (${report.withUseCasePct}%)`,
    '',
    'top 50 literary offenders (readme words · loc · importers · kind):',
  ]
  for (const v of report.top50) {
    const uc = v.useCase ? ` · use: ${v.useCase}` : ''
    lines.push(
      `  ${v.atomPath.padEnd(28)} ${String(v.readmeWords).padStart(5)}w · ${String(v.linesOfCode).padStart(3)}loc · ${String(v.importerCount).padStart(3)}imp · ${v.kind}${uc}`,
    )
    lines.push(`    fix: ${wordWithoutLogicFixSuggestion(v)}`)
  }
  lines.push('')
  lines.push('gate: pnpm erpax rules check  (axis word-without-logic)')
  return lines.join('\n')
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const json = process.argv.includes('--json')
  const report = corpusWordsReport()
  if (json) {
    console.log(JSON.stringify(report, null, 2))
  } else {
    console.log(formatCorpusWordsReport(report))
  }
}
