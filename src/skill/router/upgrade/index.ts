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
import { connectCorpus, materializeSkillFrontmatter, renderCorpus, verifySkillFrontmatter } from './connect'

export type { ConnectedFrontmatter, FrontmatterSignatures, FrontmatterStageSignature } from './seal'
export {
  contentUuidOf,
  renderFrontmatter,
  upgradeSkillText,
  parseSignaturesFromText,
  signaturesFromStages,
} from './seal'
export { deriveDescription, signaturesMatch, frontmatterEdges, buildFrontmatterGraph, graphConnectivity, type GraphConnectivity } from './graph'
export type { RenderedAtom, UpgradeContext } from './connect'
export {
  buildUpgradeContext,
  connectFrontmatter,
  connectCorpus,
  renderCorpus,
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

/**
 * Bound on the frontmatter fixpoint iteration. DECLARED, not derived: the fold's convergence
 * depth is a property of the corpus graph, and a loop with no bound is how a gate hangs.
 */
const SYNC_MAX_PASSES = 8

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
    // A SINGLE PASS DOES NOT CONVERGE. `bondDegree` and the bond/backlink sets are graph-derived,
    // and the graph is read from the SKILL.md files this very pass rewrites — so writing atom A
    // moves the frontmatter atom B will compute next time. Measured 2026-09-07 after the cycle
    // cuts: 91 patches, then 369, then 49. One pass leaves the tree mid-cascade and reports the
    // same success it reports when the tree is settled.
    //
    // So iterate to the fixpoint and REFUSE if there isn't one. A pass that writes nothing ends
    // the loop, which is why a settled tree still costs exactly one pass.
    //
    // Each pass folds the corpus once and reuses it — the connectivity report below used to call
    // connectCorpus a second time purely to print one line.
    let rendered = renderCorpus(cwd, scope)
    let wrote = materializeSkillFrontmatter(cwd, scope, rendered)
    let passes = 1
    let total = wrote
    while (wrote > 0 && passes < SYNC_MAX_PASSES) {
      rendered = renderCorpus(cwd, scope)
      wrote = materializeSkillFrontmatter(cwd, scope, rendered)
      total += wrote
      passes++
    }
    console.log(
      `skill:upgrade — materialized ${total} SKILL.md frontmatter patch(es) over ${passes} pass(es)`,
    )
    if (wrote > 0) {
      console.error(
        `skill:upgrade REFUSED — still writing ${wrote} patch(es) after ${SYNC_MAX_PASSES} passes; the frontmatter fold has no fixpoint here, so no pass may be reported as settled.`,
      )
      process.exit(1)
    }
    if (!scope) {
      const patches = new Map([...rendered].map(([k, r]) => [k, r.frontmatter]))
      const g = buildFrontmatterGraph(patches)
      const conn = graphConnectivity(g, new Set([...patches.keys()].map((p) => p.split('/').pop()!)))
      console.log(
        `  graph: ${conn.connected ? 'connected' : 'DISCONNECTED'} · components ${conn.components} · orphans ${conn.orphans.length}`,
      )
    }
    process.exit(0)
  }
  if (verify) {
    const rendered = renderCorpus(cwd, scope)
    const { ok, drift } = verifySkillFrontmatter(cwd, scope, rendered)
    if (!ok) {
      console.error(`skill:upgrade verify FAIL — ${drift.length} drift(s)`)
      for (const d of drift.slice(0, 20)) console.error(`  ${d}`)
      process.exit(1)
    }
    const patches = new Map([...rendered].map(([k, r]) => [k, r.frontmatter]))
    const g = buildFrontmatterGraph(patches)
    const conn = graphConnectivity(g, new Set([...patches.keys()].map((p) => p.split('/').pop()!)))
    console.log(`skill:upgrade verify OK — ${patches.size} atoms · graph connected=${conn.connected}`)
    process.exit(0)
  }
  const patches = connectCorpus(cwd)
  console.log(`skill:upgrade — ${patches.size} atoms (dry-run; use --sync to materialize)`)
}

/** @index-cross.foldback child=skill/router/upgrade parent=skill/router — this cross folds back into its parent. */
