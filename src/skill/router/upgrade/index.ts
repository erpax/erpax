/**
 * skill/router/upgrade — computational frontmatter self-upgrade + connection fabric.
 *
 * SKILL.md frontmatter (the form facet) is DERIVED from live corpus state — never
 * hand-pinned. `connectFrontmatter` folds atomPath · diamondUuid · matrix coordinate ·
 * typography partition/bonds · standards · bindings · wikilink/matrix/backlink neighbors
 * into one YAML block so the whole corpus frontmatter graph is connected (no orphans).
 *
 *   pnpm exec tsx src/skill/router/upgrade/index.ts --sync    # materialize drift
 *   pnpm exec tsx src/skill/router/upgrade/index.ts --verify  # fail-closed drift gate
 *
 * @see ../build — ../../../readme — ../../../typography — ../../../diamond — ../../../uuid/matrix
 */
import { buildFrontmatterGraph, graphConnectivity } from './graph'
import { connectCorpus, materializeSkillFrontmatter, verifySkillFrontmatter } from './connect'

export type { ConnectedFrontmatter, FrontmatterSignatures, FrontmatterStageSignature } from './seal'
export {
  contentUuidOf,
  renderFrontmatter,
  upgradeSkillText,
  parseSignaturesFromText,
  signaturesFromStages,
} from './seal'
export { deriveDescription, signaturesMatch, frontmatterEdges, buildFrontmatterGraph, graphConnectivity, type GraphConnectivity } from './graph'
export type { UpgradeContext } from './connect'
export {
  buildUpgradeContext,
  connectFrontmatter,
  connectCorpus,
  materializeSkillFrontmatter,
  verifySignatures,
  verifySkillFrontmatter,
} from './connect'
export {
  parseQuantumSkill,
  generateQuantumSkill,
  upgradeQuantumSkillText,
  inferQuantumEnvironment,
  entangledFieldsOf,
  mergeEntangledFields,
  collapseTriggersOf,
  isQuantumSkillPath,
  injectQuantumBlock,
  renderQuantumBlock,
  renderContentUuidFooter,
  type QuantumSkillParsed,
  type QuantumSkillModel,
  type QuantumEnvironment,
  type EntangledField,
} from './quantum'

const atomScope = (): readonly string[] | undefined => {
  const i = process.argv.indexOf('--atom')
  if (i < 0 || !process.argv[i + 1]) return undefined
  return process.argv[i + 1]!.split(',').map((s) => s.trim()).filter(Boolean)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const cwd = process.cwd()
  const verify = process.argv.includes('--verify')
  const sync = process.argv.includes('--sync')
  const scope = atomScope()
  if (sync) {
    const n = materializeSkillFrontmatter(cwd, scope)
    console.log(`skill:upgrade — materialized ${n} SKILL.md frontmatter patch(es)`)
    if (!scope) {
      const patches = connectCorpus(cwd)
      const g = buildFrontmatterGraph(patches)
      const conn = graphConnectivity(g, new Set([...patches.keys()].map((p) => p.split('/').pop()!)))
      console.log(
        `  graph: ${conn.connected ? 'connected' : 'DISCONNECTED'} · components ${conn.components} · orphans ${conn.orphans.length}`,
      )
    }
    process.exit(0)
  }
  if (verify) {
    const { ok, drift } = verifySkillFrontmatter(cwd, scope)
    if (!ok) {
      console.error(`skill:upgrade verify FAIL — ${drift.length} drift(s)`)
      for (const d of drift.slice(0, 20)) console.error(`  ${d}`)
      process.exit(1)
    }
    const patches = connectCorpus(cwd)
    const g = buildFrontmatterGraph(patches)
    const conn = graphConnectivity(g, new Set([...patches.keys()].map((p) => p.split('/').pop()!)))
    console.log(`skill:upgrade verify OK — ${patches.size} atoms · graph connected=${conn.connected}`)
    process.exit(0)
  }
  const patches = connectCorpus(cwd)
  console.log(`skill:upgrade — ${patches.size} atoms (dry-run; use --sync to materialize)`)
}

/** @index-cross.foldback child=skill/router/upgrade parent=skill/router — this cross folds back into its parent. */
