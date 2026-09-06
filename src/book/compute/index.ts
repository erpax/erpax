/**
 * book/compute — self-documenting book-of-books index (JSON · markdown · document).
 */
import { nodeOf, neighborsOf, backlinksOf, architectureBond, bondRankOf } from '@/uuid/matrix'
import { wordTokenUuid } from '@/word'
import { DOUBLING } from '@/rodin'
import { trinityFlagsOf, sealedFromReadme } from '@/pivot/horo-table'
import { horoChapterOf as chapterOf } from '@/horo'
import { harmonyOfBookIndex, indexVolumes, type BookIndexHarmony } from '../harmony-index'
import { digitalRootOfUuid } from '@/digit'



export interface PathExplain {
  readonly path: string
  readonly slug: string
  readonly bondLine: string
  readonly openingLine: string
}

export interface BookIndexQuantumRow {
  readonly wordFold: string
  readonly digitFold: string
  readonly digitAddress: string | null
  readonly interact64: string
  readonly combined128: string
  readonly architectureBond: string
}

export interface BookVolumeRow {
  readonly path: string
  readonly horo: number | null
  readonly measure: string | null
  readonly trinity: { readonly form: 0 | 1; readonly code: 0 | 1; readonly proof: 0 | 1 }
  readonly sealed: boolean
  readonly bond: number
  readonly bondLine: string
  readonly matterLink: string
  readonly explain: PathExplain
  readonly quantum: BookIndexQuantumRow
}

export type BookIndexModel = {
  readonly harmony: BookIndexHarmony
  readonly rows: readonly BookVolumeRow[]
}

const architectureBits = (): number => 1 << DOUBLING.length
const architectureMask = (): bigint => (1n << BigInt(architectureBits())) - 1n
const hexOf = (uuid: string): string => uuid.replace(/[^0-9a-fA-F]/g, '')
const uuidFold64 = (uuid: string): bigint => {
  const h = hexOf(uuid).slice(0, 16)
  return h.length > 0 ? BigInt(`0x${h}`) : 0n
}
const wordFold64 = (path: string): bigint => {
  const leaf = path.split('/').pop() ?? path
  return uuidFold64(wordTokenUuid(leaf)) & architectureMask()
}
const digitFold64 = (path: string): bigint => {
  const leaf = path.split('/').pop() ?? path
  const n = nodeOf(path) ?? nodeOf(leaf)
  return n?.uuid ? uuidFold64(n.uuid) & architectureMask() : 0n
}
const interact64 = (a: bigint, b: bigint): bigint => (a & b) & architectureMask()
const combineArchitectures = (wordHalf: bigint, digitHalf: bigint): bigint => {
  const bits = architectureBits()
  const mask = architectureMask()
  return ((wordHalf & mask) << BigInt(bits)) | (digitHalf & mask)
}
const digitAddressOf = (path: string): string | null => {
  const leaf = path.split('/').pop() ?? path
  const n = nodeOf(path) ?? nodeOf(leaf)
  return n ? `${n.horo}/${digitalRootOfUuid(n.uuid)}` : null
}
const foldHex = (n: bigint): string => {
  const v = n & architectureMask()
  return v === 0n ? '0' : v.toString(16)
}

const bondWordsOf = (atomPath: string, limit = 4): readonly string[] => {
  const leaf = atomPath.split('/').pop() ?? atomPath
  const seen = new Set<string>()
  const words: string[] = []
  for (const n of [...neighborsOf(leaf), ...backlinksOf(leaf)]) {
    if (seen.has(n.atom)) continue
    seen.add(n.atom)
    words.push(n.atom)
    if (words.length >= limit) break
  }
  return words
}

export function pathExplain(path: string): PathExplain {
  const slug = path.split('/').pop() ?? path
  const words = bondWordsOf(path, 4)
  const bondPart = words.length > 0 ? words.map((w) => `[[${w}]]`).join(' · ') : '—'
  const bondLine = `bond ${bondRankOf(path)} · ${bondPart}`
  const openingLine = `\`src/${path}\` · ${bondLine}`
  return { path, slug, bondLine, openingLine }
}

const quantumRowOf = (path: string): BookIndexQuantumRow => {
  const wordHalf = wordFold64(path)
  const digitHalf = digitFold64(path)
  return {
    wordFold: foldHex(wordHalf),
    digitFold: foldHex(digitHalf),
    digitAddress: digitAddressOf(path),
    interact64: foldHex(interact64(wordHalf, digitHalf)),
    combined128: combineArchitectures(wordHalf, digitHalf).toString(16),
    architectureBond: architectureBond(),
  }
}

export function computeVolumeRow(path: string, cwd: string = process.cwd()): BookVolumeRow {
  const trinity = trinityFlagsOf(path, cwd)
  const sealed = sealedFromReadme(cwd, path)
  const node = nodeOf(path)
  const horo = node?.horo ?? null
  const explain = pathExplain(path)
  return {
    path,
    horo,
    measure: chapterOf(horo),
    trinity,
    sealed,
    bond: bondRankOf(path),
    bondLine: explain.bondLine,
    matterLink: `src/${path}/index.ts`,
    explain,
    quantum: quantumRowOf(path),
  }
}

export function computeBookIndex(cwd: string = process.cwd()): BookIndexModel {
  return {
    harmony: harmonyOfBookIndex(cwd),
    rows: indexVolumes(cwd).map((p) => computeVolumeRow(p, cwd)),
  }
}

export function bookIndexQuantumRows(cwd: string = process.cwd()): readonly BookIndexQuantumRow[] {
  return computeBookIndex(cwd).rows.map((r) => r.quantum)
}

export interface RenderBookIndexOpts {
  readonly maxRows?: number
}

export function renderBookIndexMarkdown(
  model: BookIndexModel = computeBookIndex(),
  opts: RenderBookIndexOpts = {},
): string {
  const h = model.harmony
  const max = opts.maxRows ?? model.rows.length
  const L: string[] = [
    '# book of books index',
    '',
    `volumes **${h.metrics.volumeCount}** · harmony score **${h.score}** · harmonic **${h.harmonic ? 'yes' : 'no'}**`,
    '',
    '> the list of folders in `src/` is the document itself.',
    '',
    '| volume | horo | bond | trinity | sealed | word⊗digit | bond line |',
    '| ------ | ---: | ---: | ------- | ------ | ---------- | --------- |',
  ]
  for (const row of model.rows.slice(0, max)) {
    const tri = `${row.trinity.form}·${row.trinity.code}·${row.trinity.proof}`
    const fold = `${row.quantum.wordFold}⊗${row.quantum.digitFold}`
    L.push(
      `| \`${row.path}\` | ${row.horo ?? '—'} | ${row.bond} | ${tri} | ${row.sealed ? '✓' : '—'} | ${fold} | ${row.bondLine} |`,
    )
  }
  if (model.rows.length > max) {
    L.push('', `> … and ${model.rows.length - max} more volumes`, '')
  }
  if (h.impurities.length) {
    L.push('', '## impurities', '')
    for (const imp of h.impurities) L.push(`- ${imp}`)
  }
  L.push('', '> `pnpm erpax corpus book --index` · `--document` · `--md`', '')
  return L.join('\n')
}

export function renderBookIndexDocument(model: BookIndexModel = computeBookIndex()): string {
  const h = model.harmony
  const table = renderBookIndexMarkdown(model)
  const json = JSON.stringify(
    {
      harmony: h,
      volumeCount: model.rows.length,
      rows: model.rows.map((r) => ({
        path: r.path,
        horo: r.horo,
        measure: r.measure,
        trinity: r.trinity,
        sealed: r.sealed,
        bond: r.bond,
        matterLink: r.matterLink,
        explain: r.explain.openingLine,
        quantum: r.quantum,
      })),
    },
    null,
    2,
  )
  const pages: string[] = []
  for (const row of model.rows) {
    pages.push(
      `### \`${row.path}\``,
      '',
      `- ${row.explain.openingLine}`,
      `- horo \`${row.horo ?? '—'}\` · measure \`${row.measure ?? '—'}\``,
      `- trinity \`${row.trinity.form}·${row.trinity.code}·${row.trinity.proof}\` · sealed \`${row.sealed ? 1 : 0}\``,
      `- matter [\`${row.matterLink}\`](${row.matterLink})`,
      `- word⊗digit \`${row.quantum.wordFold}⊗${row.quantum.digitFold}\` · interact64 \`${row.quantum.interact64}\``,
      '',
    )
  }
  return [
    '<!-- book index document — computed; do not edit -->',
    '',
    '# book of books',
    '',
    '**Law:** the list of folders in `src/` is the document itself.',
    '',
    table,
    '',
    '## volume pages',
    '',
    ...pages,
    '## index json',
    '',
    '```json',
    json,
    '```',
    '',
  ].join('\n')
}

/** @index-cross.foldback child=book/compute parent=book — this cross folds back into its parent. */
