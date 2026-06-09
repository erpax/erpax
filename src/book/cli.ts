/**
 * book/cli — `pnpm erpax corpus book [path]` terminal interactive spread.
 * `pnpm erpax corpus book --index` — book-of-books index harmony report.
 */
import { execSync } from 'node:child_process'
import { harmonyOfBookIndex, normalizePath } from './index'

export function formatBookIndexReport(cwd: string = process.cwd()): string {
  const h = harmonyOfBookIndex(cwd)
  const L: string[] = [
    'book of books index',
    '',
    `volumes ${h.metrics.volumeCount} · top-level dirs ${h.metrics.topLevelDirs} · vocabulary nested ${h.metrics.vocabularyNested}`,
    `harmony score ${h.score} · harmonic ${h.harmonic ? 'yes' : 'no'}`,
    '',
    'metrics',
    `- horo evenness \`${h.metrics.horoEvenness}\` · off-ring \`${h.metrics.offRing}\``,
    `- sealed \`${Math.round(h.metrics.sealedPct * 1000) / 10}%\` · trinity \`${Math.round(h.metrics.trinityPct * 1000) / 10}%\``,
    `- literary ratio \`${h.metrics.literaryRatio}\` · reciprocity \`${h.metrics.reciprocity}\``,
    `- seq/alpha concordance \`${h.metrics.seqVsAlpha}\``,
    '',
    'top 10 hubs by bond',
  ]
  for (const row of h.topHubs.slice(0, 10)) {
    L.push(`- \`${row.path}\` · bond \`${row.bond}\``)
  }
  L.push('', `vocabulary fold candidates (deferred wave): \`${h.foldCandidates}\``)
  if (h.impurities.length > 0) {
    L.push('', 'impurities')
    for (const imp of h.impurities) L.push(`- ${imp}`)
  }
  return L.join('\n')
}

function parseArgs(argv: readonly string[]): { path: string; open: boolean; index: boolean } {
  const index = argv.includes('--index') || argv.includes('index')
  const open = argv.includes('--open')
  const positional = argv.filter((a) => !a.startsWith('-') && a !== 'index')
  return { path: normalizePath(positional[0] ?? 'medical/clinic'), open, index }
}

export async function runBookCli(argv: readonly string[] = process.argv.slice(2)): Promise<number> {
  const { path, open, index } = parseArgs(argv)
  if (index) {
    console.log(formatBookIndexReport())
    return 0
  }
  const { formatBookTerminal, bookOf } = await import('./matter')
  console.log(formatBookTerminal(path))
  const hub = path.includes('/') ? path.split('/')[0]! : path
  const summary = bookOf(hub)
  console.log('')
  console.log(`TOC · ${summary.book} · ${summary.pageCount} pages · sealed ${summary.sealedPercent}%`)
  if (open) {
    try {
      execSync(`open "src/${path}/README.md"`, { stdio: 'ignore', cwd: process.cwd() })
    } catch {
      console.error(`(open failed — src/${path}/README.md)`)
    }
  }
  return 0
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runBookCli().then((code) => process.exit(code))
}
