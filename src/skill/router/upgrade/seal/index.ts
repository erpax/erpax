/**
 * skill/router/upgrade/seal — frontmatter render · content-uuid seal (shared by upgrade + quantum).
 */
import { createHash } from 'node:crypto'
import { computationUuid, type DiamondComputationStage } from '@/diamond'

export const FRONTMATTER = /^---\n([\s\S]*?)\n---\n?/

/** One diamond pipeline stage seal — content-uuid of { stage, input, output }. */
export interface FrontmatterStageSignature {
  readonly stage: string
  readonly stageUuid: string
}

/** Folded stage chain — verifiable in frontmatter without re-walking fs. */
export interface FrontmatterSignatures {
  readonly computationUuid: string
  readonly stages: readonly FrontmatterStageSignature[]
}

export interface ConnectedFrontmatter {
  readonly name: string
  readonly description: string
  readonly atomPath: string
  readonly coordinate: string
  readonly contentUuid: string
  readonly diamondUuid: string
  readonly uuid: string | null
  readonly horo: number | null
  readonly bonds: { readonly in: readonly string[]; readonly out: readonly string[] }
  readonly typography: {
    readonly partition: string
    readonly bondDegree: number
    readonly neighbors: readonly string[]
  }
  readonly standards: readonly string[]
  readonly bindings: readonly string[]
  readonly neighbors: {
    readonly wikilink: readonly string[]
    readonly matrix: readonly string[]
    readonly backlinks: readonly string[]
  }
  readonly signatures: FrontmatterSignatures
  readonly version: number
}

const yamlQuote = (s: string): string => {
  if (!s.length || /[:#\n"'&*!?|>@[`\-{}\[\],/]/.test(s) || s.startsWith(' ') || /^\d/.test(s)) {
    return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
  }
  return s
}

export const stripFrontmatter = (text: string): string => text.replace(FRONTMATTER, '')

/** Deterministic v5-style uuid from bytes (matches build-index contentUuid). */
export function contentUuidOf(bytes: string): string {
  const h = createHash('sha256').update(bytes).digest('hex')
  const y = ((parseInt(h[16]!, 16) & 0x3) | 0x8).toString(16)
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-5${h.slice(13, 16)}-${y}${h.slice(17, 20)}-${h.slice(20, 32)}`
}

const renderYamlList = (key: string, items: readonly string[], indent: string): string[] => {
  if (items.length === 0) return [`${indent}${key}: []`]
  return [`${indent}${key}:`, ...items.map((i) => `${indent}  - ${yamlQuote(i)}`)]
}

const unquoteYaml = (v: string): string => v.trim().replace(/^["']|["']$/g, '')

/** Diamond stages → frontmatter signature block (stage names + stageUuid chain). */
export function signaturesFromStages(stages: readonly DiamondComputationStage[]): FrontmatterSignatures {
  const chain = stages.map((s) => ({ stage: s.stage, stageUuid: s.stageUuid }))
  return { computationUuid: computationUuid(stages), stages: chain }
}

/** Parse the `signatures:` block from SKILL.md frontmatter YAML. */
export function parseSignaturesFromText(text: string): FrontmatterSignatures | null {
  const fm = text.match(FRONTMATTER)?.[1] ?? ''
  const i = fm.indexOf('signatures:')
  if (i < 0) return null
  const tail = fm.slice(i)
  const computationUuid = unquoteYaml(tail.match(/computationUuid:\s*(.+)/)?.[1] ?? '')
  if (!computationUuid) return null
  const stages: FrontmatterStageSignature[] = []
  for (const m of tail.matchAll(/-\s+stage:\s*(\S+)\s*\n\s+stageUuid:\s*(.+)/g)) {
    stages.push({ stage: unquoteYaml(m[1]!), stageUuid: unquoteYaml(m[2]!) })
  }
  return { computationUuid, stages }
}

const renderSignatures = (sig: FrontmatterSignatures): string[] => {
  const L = ['signatures:', `  computationUuid: ${yamlQuote(sig.computationUuid)}`, '  stages:']
  for (const s of sig.stages) {
    L.push(`    - stage: ${yamlQuote(s.stage)}`, `      stageUuid: ${yamlQuote(s.stageUuid)}`)
  }
  return L
}

/** Render connected frontmatter as deterministic YAML (js-yaml compatible). */
export function renderFrontmatter(fm: ConnectedFrontmatter): string {
  const L: string[] = ['---']
  L.push(`name: ${yamlQuote(fm.name)}`)
  L.push(`description: ${yamlQuote(fm.description)}`)
  L.push(`atomPath: ${yamlQuote(fm.atomPath)}`)
  L.push(`coordinate: ${yamlQuote(fm.coordinate)}`)
  L.push(`contentUuid: ${yamlQuote(fm.contentUuid)}`)
  L.push(`diamondUuid: ${yamlQuote(fm.diamondUuid)}`)
  if (fm.uuid) L.push(`uuid: ${yamlQuote(fm.uuid)}`)
  if (fm.horo !== null) L.push(`horo: ${fm.horo}`)
  // The GRAPH is not stored. `bonds`, `neighbors.{wikilink,matrix,backlinks}` and
  // `typography.neighbors` were 255,405 of 349,792 frontmatter lines — 73% — and they are
  // WRITE-ONLY: computed from `uuid/matrix` by connectCorpus, written here, and never read back
  // except by the drift check that compares them against themselves. VitePress does not use them
  // either; its own comment says the page subgraph is injected by `transformPageData` "without any
  // of it being stored in the file's frontmatter".
  //
  // Storing a derivation is what the one law forbids, and the corpus was paying three ways:
  //   STALE   462 of 3,072 atoms carried a copy the matrix no longer agreed with
  //   MEMORY  `skill:upgrade --verify` was KILLED at 14GB reading them — read-only, no writes
  //   TRAVEL  353k lines moved to answer what one address answers (ftl: foldOps 1 vs 3,105 search)
  //
  // The scalars stay: `typography.partition` and `bondDegree` are single values, not a duplicated
  // edge list, and nothing here established they are unread — dropping them would be a guess.
  L.push('typography:')
  L.push(`  partition: ${yamlQuote(fm.typography.partition)}`)
  L.push(`  bondDegree: ${fm.typography.bondDegree}`)
  L.push(...renderYamlList('standards', fm.standards, ''))
  L.push(...renderYamlList('bindings', fm.bindings, ''))
  L.push(...renderSignatures(fm.signatures))
  L.push(`version: ${fm.version}`)
  L.push('---', '')
  return L.join('\n')
}

/** Splice computed frontmatter onto the SKILL body (prose preserved). */
export function upgradeSkillText(text: string, fm: ConnectedFrontmatter): string {
  const body = stripFrontmatter(text).trimStart()
  const bodySuffix = body ? (body.endsWith('\n') ? body : `${body}\n`) : ''
  const withoutUuid = renderFrontmatter({ ...fm, contentUuid: '' }).replace(/^contentUuid:.*\n/m, '')
  const uuid = contentUuidOf(withoutUuid + bodySuffix)
  return renderFrontmatter({ ...fm, contentUuid: uuid }) + bodySuffix
}

export { yamlQuote }
