/**
 * port — Rails/ActiveAdmin → Payload/Next Rosetta diamond.
 *
 * A port facet is content-addressed by `{ sourceLang, targetLang, atomPath }` so
 * re-porting unchanged mappings merges (no duplicate) and changed mappings get a
 * new identity. Composes with [[quantum/port]] `portUuid` for upstream sources.
 *
 *   tsx src/port/index.ts rails payload invoices
 *
 * @see ./SKILL.md — ../diamond/projection — ../quantum/port
 */
import { uuid, jcsCanonicalize } from '@/integrity'
import {
  stageUuid,
  computationUuid,
  type DiamondComputationStage,
} from '@/diamond'

export interface PortDiamondResult {
  readonly sourceLang: string
  readonly targetLang: string
  readonly atomPath: string
  readonly mappingUuid: string
  readonly stages: readonly DiamondComputationStage[]
  readonly computationUuid: string
}

function pushStage(
  stages: DiamondComputationStage[],
  stage: string,
  input: unknown,
  output: unknown,
): void {
  stages.push({ stage, input, output, stageUuid: stageUuid(stage, input, output) })
}

/** Content-uuid of one Rosetta mapping — stable across recomputation. */
export function portMappingUuid(sourceLang: string, targetLang: string, atomPath: string): string {
  return uuid(jcsCanonicalize({ sourceLang, targetLang, atomPath }))
}

/**
 * Canonical port diamond — map → seal → uuid fold.
 * Used by @/diamond `kind: 'port'` pipeline.
 */
export function portDiamond(
  sourceLang: string,
  targetLang: string,
  atomPath: string,
): PortDiamondResult {
  const mappingUuid = portMappingUuid(sourceLang, targetLang, atomPath)
  const stages: DiamondComputationStage[] = []

  pushStage(
    stages,
    'map',
    { sourceLang, targetLang, atomPath },
    { rosetta: `${sourceLang}→${targetLang}`, atomPath, mappingUuid },
  )
  pushStage(stages, 'seal', { atomPath }, { sealed: true, impurities: [] as string[] })
  pushStage(stages, 'uuid', { mappingUuid }, { mappingUuid })

  return {
    sourceLang,
    targetLang,
    atomPath,
    mappingUuid,
    stages,
    computationUuid: computationUuid(stages),
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [source = 'rails', target = 'payload', atom = 'invoices'] = process.argv.slice(2)
  const result = portDiamond(source, target, atom)
  console.log(`port — ${result.sourceLang}→${result.targetLang} @ ${result.atomPath}`)
  console.log(`  mappingUuid: ${result.mappingUuid}`)
  console.log(`  computation: ${result.computationUuid} (${result.stages.length} stages)`)
}
