import { execSync } from 'node:child_process'
import { harmonyOfBookIndex, normalizePath } from './index'
import { computeBookIndex, renderBookIndexMarkdown, renderBookIndexDocument } from './compute'

export function formatBookIndexReport(cwd = process.cwd()): string {
  const h = harmonyOfBookIndex(cwd)
  const L = [
    'book of books index',
    '',
    `volumes ${h.metrics.volumeCount} · harmony score ${h.score} · harmonic ${h.harmonic ? 'yes' : 'no'}`,
    '',
    'top 10 hubs by bond',
  ]
  for (const row of h.topHubs.slice(0, 10)) L.push(`- \`${row.path}\` · bond \`${row.bond}\``)
  L.push('', `vocabulary fold candidates (deferred wave): \`${h.foldCandidates}\``)
  return L.join('\n')
}

export async function runBookCli(argv: string[] = process.argv.slice(2)): Promise<number> {
  const path = normalizePath(argv.filter((a) => !a.startsWith('-') && !['index', 'document', 'md', 'report'].includes(a))[0] ?? 'medical/clinic')
  if (argv.includes('--document')) {
    console.log(renderBookIndexDocument(computeBookIndex()))
    return 0
  }
  if (argv.includes('--md')) {
    console.log(renderBookIndexMarkdown(computeBookIndex()))
    return 0
  }
  if (argv.includes('--index') || argv.includes('index')) {
    console.log(JSON.stringify(computeBookIndex(), null, 2))
    return 0
  }
  if (argv.includes('--report')) {
    console.log(formatBookIndexReport())
    return 0
  }
  const { formatBookTerminal, bookOf } = await import('./matter')
  console.log(formatBookTerminal(path))
  console.log(`TOC · ${bookOf(path.includes('/') ? path.split('/')[0]! : path).pageCount} pages`)
  if (argv.includes('--open')) try { execSync(`open "src/${path}/README.md"`, { stdio: 'ignore' }) } catch {}
  return 0
}

if (import.meta.url === `file://${process.argv[1]}`) runBookCli().then((c) => process.exit(c))
