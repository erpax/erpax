/**
 * navigation/distribute — nest vocabulary atoms under hub parents in horo waves.
 *
 * Creates pivot trinity folders (`{hub}/{leaf}/`) like body/anatomy · computer/hardware
 * — ONE node, zero duplication; canonical vocabulary stays at `@/{leaf}` when code pivots
 * exist, otherwise the nested path IS the nav address.
 *
 *   tsx src/navigation/distribute.ts --inventory
 *   tsx src/navigation/distribute.ts --apply medical
 *   tsx src/navigation/distribute.ts --apply body
 *
 * @see ./groups — ../wave/load — ../seal — ../readme
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { selfBalancingWaveLoad, pathComparableUnits } from '@/wave/load'
import { finishedIdeaCrossed } from '@/seal'
import { deriveDiamond } from '@/diamond'
import {
  deriveFolderModel,
  buildReadmeCorpusContext,
  buildReadmeTypographyGraph,
  listAtomPaths,
} from '@/readme'
import { hasWordFolderTrinity } from '@/law/folder/word'
import { BODY_FOLD_ROOT, MEDICAL_WAVE_1, COMPUTER_WAVE_1, type NavHub } from './groups'

const SRC = 'src'

export interface PivotSpec {
  readonly hub: NavHub
  readonly leaf: string
  readonly facet: string
}

export interface DistributeWavePlan {
  readonly hub: NavHub
  readonly waves: readonly { readonly ordinal: number; readonly items: readonly PivotSpec[] }[]
  readonly pending: readonly PivotSpec[]
  readonly existing: readonly PivotSpec[]
}

export interface HubSealSnapshot {
  readonly hub: string
  readonly total: number
  readonly trinity: number
  readonly sealed: number
  readonly crossed: number
  readonly pctSealed: number
  readonly pctCrossed: number
  readonly unsealed: readonly string[]
}

const pivotPath = (hub: string, leaf: string): string => `${hub}/${leaf}`

/** Hub pivot complete — index.ts + test.ts + SKILL.md (not form-only vocabulary). */
const hasTrinity = (dir: string): boolean => hasWordFolderTrinity(dir)

/** Build pivot specs for leaves listed under one hub wave list. */
export function pivotSpecsForHub(hub: NavHub, leaves: readonly string[]): DistributeWavePlan {
  const pending: PivotSpec[] = []
  const existing: PivotSpec[] = []
  for (const leaf of leaves) {
    const spec: PivotSpec = {
      hub,
      leaf,
      facet: hub === 'body' ? 'anatomical part' : hub === 'medical' ? 'medical facet' : 'part',
    }
    const dir = join(process.cwd(), SRC, hub, leaf)
    if (existsSync(dir) && hasTrinity(dir)) existing.push(spec)
    else pending.push(spec)
  }
  const plan = selfBalancingWaveLoad(pending, { weightOf: (s) => pathComparableUnits(pivotPath(s.hub, s.leaf)) })
  return {
    hub,
    pending,
    existing,
    waves: plan.waves.map((w) => ({
      ordinal: w.ordinal,
      items: w.items,
    })),
  }
}

export const pivotIndexTs = (hub: string, leaf: string): string => `/**
 * ${hub}/${leaf} — ${hub} facet; vocabulary pivot to @/${leaf}.
 */
export const PART = '${leaf}' as const
export const CANONICAL = '${leaf}' as const
export const PARENT = '${hub}' as const
export const atomPath = '${hub}/${leaf}' as const
`

export const pivotTestTs = (hub: string, leaf: string): string => {
  const importFrom = '@/' + hub + '/' + leaf
  return `import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '${importFrom}'

describe('${hub}/${leaf} — vocabulary pivot', () => {
  it('names the ${hub} facet and its canonical atom', () => {
    expect(PART).toBe('${leaf}')
    expect(CANONICAL).toBe('${leaf}')
    expect(PARENT).toBe('${hub}')
    expect(atomPath).toBe('${hub}/${leaf}')
  })
})
`
}

export const pivotSkillMd = (hub: string, leaf: string, facet: string): string => `---
name: ${leaf}
atomPath: ${hub}/${leaf}
description: "Use when reasoning about ${leaf} as a ${facet} of [[${hub}]] — vocabulary pivot to @/${leaf}; nested not duplicated."
---

# ${hub}/${leaf} — ${facet}

The [[${leaf}]] read from the [[${hub}]] structure — pivot to the top-level \`@/${leaf}\` vocabulary atom ([[merge]] at path scale).

**Law — [[law]]: ${hub}/${leaf} names ${leaf} under ${hub} — one word, content-addressed, nested not duplicated.**

@standard schema.org — the type vocabulary, collided to single words
`

/** Materialize one pivot folder (trinity only — readme faces regen via pnpm readme). */
export function writePivot(spec: PivotSpec, cwd: string = process.cwd()): boolean {
  const dir = join(cwd, SRC, spec.hub, spec.leaf)
  if (existsSync(dir) && hasTrinity(dir)) return false
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.ts'), pivotIndexTs(spec.hub, spec.leaf))
  writeFileSync(join(dir, 'test.ts'), pivotTestTs(spec.hub, spec.leaf))
  writeFileSync(join(dir, 'SKILL.md'), pivotSkillMd(spec.hub, spec.leaf, spec.facet))
  return true
}

/** Apply all pending pivots for one hub (all waves). */
export function applyHubDistribution(hub: NavHub, leaves: readonly string[], cwd: string = process.cwd()): number {
  const plan = pivotSpecsForHub(hub, leaves)
  let written = 0
  for (const wave of plan.waves) {
    for (const spec of wave.items) {
      if (writePivot(spec, cwd)) written++
    }
  }
  return written
}

/** Seal snapshot for one hub and its direct children. */
export function hubSealSnapshot(hub: string, cwd: string = process.cwd()): HubSealSnapshot {
  const graph = buildReadmeTypographyGraph(cwd)
  const ctx = buildReadmeCorpusContext(cwd)
  const paths = listAtomPaths(cwd).filter((p) => p === hub || p.startsWith(`${hub}/`))
  let trinity = 0
  let sealed = 0
  let crossed = 0
  const unsealed: string[] = []
  for (const atomPath of paths) {
    const folder = deriveFolderModel(atomPath, cwd, ctx, graph)
    if (folder.form && folder.code && folder.proof) trinity++
    if (folder.sealed) sealed++
    const model = deriveDiamond(atomPath)
    const cross = finishedIdeaCrossed({
      ...model,
      trinity: { form: folder.form, code: folder.code, proof: folder.proof },
      sealed: folder.sealed,
    })
    if (cross.crossed) crossed++
    else unsealed.push(atomPath)
  }
  const total = paths.length
  return {
    hub,
    total,
    trinity,
    sealed,
    crossed,
    pctSealed: total ? Math.round((sealed / total) * 1000) / 10 : 100,
    pctCrossed: total ? Math.round((crossed / total) * 1000) / 10 : 100,
    unsealed,
  }
}

/** Hub wave registry — wave batches per group (0896eab2: 7 horo waves). */
export const HUB_WAVE_REGISTRY: Readonly<Record<string, readonly string[]>> = {
  body: BODY_FOLD_ROOT,
  medical: MEDICAL_WAVE_1,
  computer: COMPUTER_WAVE_1,
}

export function inventoryReport(cwd: string = process.cwd()): readonly HubSealSnapshot[] {
  return (['body', 'medical', 'computer'] as const).map((hub) => hubSealSnapshot(hub, cwd))
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const applyHub = process.argv.includes('--apply') ? process.argv[process.argv.indexOf('--apply') + 1] : null
  if (applyHub && HUB_WAVE_REGISTRY[applyHub]) {
    const n = applyHubDistribution(applyHub as NavHub, HUB_WAVE_REGISTRY[applyHub]!)
    console.log(`navigation/distribute — wrote ${n} pivot(s) under ${applyHub}/`)
    console.log('  next: pnpm readme && pnpm matrix:generate && pnpm exec vitest run src/navigation')
  } else {
    console.log('navigation/distribute — hub seal inventory:')
    for (const row of inventoryReport()) {
      console.log(
        `  ${row.hub.padEnd(10)} paths=${row.total} trinity=${row.trinity} sealed=${row.sealed} (${row.pctSealed}%) crossed=${row.crossed} (${row.pctCrossed}%)`,
      )
      if (row.unsealed.length && row.unsealed.length <= 8) {
        console.log(`    unsealed: ${row.unsealed.join(', ')}`)
      } else if (row.unsealed.length) {
        console.log(`    unsealed: ${row.unsealed.length} paths`)
      }
    }
    for (const [hub, leaves] of Object.entries(HUB_WAVE_REGISTRY)) {
      const plan = pivotSpecsForHub(hub as NavHub, leaves)
      console.log(`\n  ${hub}: ${plan.existing.length} existing · ${plan.pending.length} pending · ${plan.waves.length} waves`)
    }
  }
}
