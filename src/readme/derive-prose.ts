/**
 * readme/derive-prose — plain-language faces derived from sealed coordinates only.
 */
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { HORO_DIGITS } from '@/horo'
import { neighborsOf, backlinksOf } from '@/uuid/matrix'
import { wireFromRepoUrl, ERPAX_CANONICAL_REPO } from '@/skill/wire'
import type { HoroPivotTable, TrinityCorpusRollup } from '@/pivot'

const SRC = 'src'
const META_MAX = 160
const clipSentence = (text: string, max = META_MAX): string =>
  text.length <= max ? text : text.slice(0, max - 1).trimEnd() + '…'

export interface PlainLanguageRootModel {
  readonly atoms: number
  readonly bonds: number
  readonly corpusRoot: string
  readonly analytics: {
    readonly sealed: number
    readonly folderCount: number
    readonly balanced: number
    readonly meanBondDegree: number
    readonly withBindings: number
    readonly distinctStandards: number
  }
}

export interface PlainLanguageFolderModel {
  readonly atomPath: string
  readonly sealed: boolean
  readonly statement: { readonly balanced: boolean }
  readonly typography: {
    readonly bondDegree: number
    readonly analysisNeighbors: readonly string[]
  }
}

export type PlainLanguageSection = 'orient' | 'diamond' | 'pivot' | 'analytics' | 'folder'

export interface PlainLanguageInput {
  readonly section: PlainLanguageSection
  readonly model?: PlainLanguageRootModel
  readonly folder?: PlainLanguageFolderModel
  readonly horo?: HoroPivotTable
  readonly trinity?: TrinityCorpusRollup
  readonly excerpt?: string
  readonly surfaces?: readonly string[]
  readonly bonds?: readonly string[]
}

const frontmatterDescription = (atomPath: string, cwd: string): string | null => {
  const p = join(cwd, SRC, atomPath, 'SKILL.md')
  if (!existsSync(p)) return null
  try {
    const m = readFileSync(p, 'utf8').match(/^description:\s*(.+)$/m)
    if (!m) return null
    return m[1]!.trim().replace(/^["']/, '').replace(/["']$/, '')
  } catch {
    return null
  }
}

export function bondWordsOf(atomPath: string, limit = 6): readonly string[] {
  const leaf = atomPath.split('/').pop() ?? atomPath
  const out = neighborsOf(leaf).map((n) => n.atom)
  const inn = backlinksOf(leaf).map((n) => n.atom)
  const seen = new Set<string>()
  const words: string[] = []
  for (const w of [...out, ...inn]) {
    if (seen.has(w)) continue
    seen.add(w)
    words.push(w)
    if (words.length >= limit) break
  }
  return words
}

export function skillDescriptionOf(atomPath: string, cwd: string = process.cwd()): string | null {
  return frontmatterDescription(atomPath, cwd)
}

export function plainLanguageOf(input: PlainLanguageInput): string {
  switch (input.section) {
    case 'orient': {
      const n = input.surfaces?.filter((s) => s !== 'README.md').length ?? 0
      const excerpt = input.excerpt ? clipSentence(input.excerpt.replace(/\s+/g, ' '), 100) : '—'
      return `${n} surfaces point to one skill entry. ${excerpt}`
    }
    case 'diamond': {
      const m = input.model
      if (!m) return '—'
      const bonds = input.bonds?.length ? input.bonds.map((b) => `[[${b}]]`).join(' · ') : '—'
      return (
        `**${m.atoms}** atoms · **${m.bonds}** bonds at \`${m.corpusRoot}\` — principal bonds ${bonds}. ` +
        'Every count is re-derived from the sealed matrix and live tree scan.'
      )
    }
    case 'pivot': {
      const ring = input.horo?.ring.length ?? HORO_DIGITS.length
      const atoms = input.trinity?.atoms ?? input.model?.atoms ?? 0
      const trinity = input.trinity
      const trinityLine = trinity
        ? `form **${trinity.skills}** · code **${trinity.index}** · proof **${trinity.tests}**`
        : 'trinity —'
      return `${ring} horo facets · ${atoms} atoms · ${trinityLine}`
    }
    case 'analytics': {
      const m = input.model
      if (!m) return '—'
      return (
        `**${m.analytics.sealed}** / **${m.analytics.folderCount}** sealed · **${m.analytics.balanced}** balanced; ` +
        `mean bond degree \`${m.analytics.meanBondDegree}\` · **${m.analytics.withBindings}** [[cloudflare]] bindings · **${m.analytics.distinctStandards}** [[standards]].`
      )
    }
    case 'folder': {
      const f = input.folder
      if (!f) return '—'
      const neighbors =
        f.typography.analysisNeighbors.length > 0
          ? f.typography.analysisNeighbors.map((n) => `[[${n}]]`).join(' · ')
          : '—'
      return (
        `atom \`${f.atomPath}\` · bond degree \`${f.typography.bondDegree}\` · neighbors ${neighbors}. ` +
        `[[seal]] \`${f.sealed ? 1 : 0}\` · [[balance]] \`${f.statement.balanced ? 1 : 0}\`.`
      )
    }
    default:
      return '—'
  }
}

export function deriveOrientSection(cwd: string = process.cwd()): readonly string[] {
  const wire = wireFromRepoUrl(ERPAX_CANONICAL_REPO)
  if (!wire.ok) return ['## Orient to erpax', '', '—', '']
  return [
    '## Orient to erpax',
    '',
    `**[\`${wire.repoUrl}\`](${wire.repoUrl})** → [\`${wire.entryPoint}\`](${wire.entryPoint}). Then \`pnpm install\` · \`pnpm erpax doctor\`.`,
    '',
    'No separate agent setup — the URL and the repo are the same orientation.',
    '',
  ]
}
