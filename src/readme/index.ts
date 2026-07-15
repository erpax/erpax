/**
 * readme — thin CLI face; matter in ./compute.ts (bindings-only law d1840104).
 *
 * The repository README is a content-addressed diamond — regenerate with
 * `pnpm readme`, verify with `pnpm readme:check` / `pnpm computed:check`.
 *
 *   tsx src/readme/index.ts            # regenerate README.md from the live tree
 *   tsx src/readme/index.ts --verify   # drift gate: exit 1 if committed ≠ regenerated
 *   tsx src/readme/index.ts --waves     # OOM-safe horo-wave batch (7×441 paths)
 *   tsx src/readme/index.ts --paths a,b # explicit atom paths only
 *
 * @standard RFC 9562 §5.8 (the README's own content-uuid is a v8 content-uuid)
 * @see ./compute.ts — ./paper.ts — ./entropy.ts — ./quantum-thinking.ts
 */
export * from './compute'
export { readmeAsLlm, readmeAsLlmForPath, materializeLlmFace, type ReadmeAsLlmResult } from './llm'

export type {
  ScientificPaper,
  MergedCorpusPapers,
  PaperMedium,
  MdPaperKind,
  TsPaperKind,
  PaperRollup,
  TsPaperContext,
} from './paper'
export {
  scientificPaperOf,
  scientificPaperOfTs,
  mergeCorpusPapers,
  paperUuid,
  emptyMergedPapers,
  collectCorpusPapers,
  renderMergedPapersSection,
} from './paper'

export type {
  EntropyStatementInput,
  EntropyLine,
  FolderEntropyAccounting,
  SectorEntropyRollup,
  CorpusEntropyRollup,
  AccountGapsAndSealsInput,
  GapsAccountedVerdict,
  AssertGapsAccountedOpts,
  SealsAccountedVerdict,
  CorpusEntropyRenderOpts,
} from './entropy'
export {
  COMPARABLE_UNIT,
  LANDAUER_BIT,
  GAP_BASE_WEIGHT,
  SEAL_BASE_WEIGHT,
  toComparableUnit,
  accountGapsAndSeals,
  computeFolderEntropy,
  assertGapsAccounted,
  assertSealsAccounted,
  aggregateCorpusEntropy,
  mergeCorpusEntropy,
  renderCorpusEntropySection,
  renderFolderEntropySection,
} from './entropy'

export type {
  ThinkingFolderInput,
  AgentThinkingReceipt,
  AgentThinking,
  QuantumThinkingBlock,
  CorpusQuantumThinkingRollup,
  ThinkingLoadContext,
} from './quantum-thinking'
export {
  loadAgentThinking,
  transformThinkingToQuantum,
  quantumThinkingOf,
  quantumBlockAsEnvironment,
  mergeCorpusQuantumThinking,
  emptyCorpusQuantumThinking,
  aggregateCorpusQuantumThinking,
  renderFolderQuantumThinkingSection,
  renderCorpusQuantumThinkingSection,
} from './quantum-thinking'

export type { HandMaintainedViolation, HandMaintainedAudit, HandMaintainedFix, HandMaintainedKind, ComputeTheRestResult } from './hand-maintained'
export { handMaintainedViolations, computeTheRest, boundedSessionPaths, pathsForScope, SESSION_COMPUTE_ROOTS, MAX_HAND_MAINTAINED_PATHS } from './hand-maintained'

import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  assertCorpusPathFollowGate,
  buildReadmeCorpus,
  buildReadmeCorpusFrozenInputs,
  deriveModel,
  deriveReadmeRootInputsInWaves,
  generateReadme,
  listAtomPaths,
  materializeComputedFaces,
  materializeComputedFacesForPathsStable,
  materializeComputedFacesInWaves,
  readmeUuid,
  renderRootReadmeInWaves,
  verifyComputedFaces,
  verifyComputedFacesForPaths,
  verifyComputedFacesInWaves,
  corpusFoldRoot,
  readCorpusFoldReceipt,
  sealCorpusFold,
} from './compute'
import { computeTheRest, handMaintainedViolations } from './hand-maintained'

if (import.meta.url === `file://${process.argv[1]}`) {
  const cwd = process.cwd()
  const driftOnly = process.argv.includes('--drift')
  const verify = process.argv.includes('--verify')
  const waves = process.argv.includes('--waves')
  const foldersOnly = process.argv.includes('--folders-only')
  const pathsIdx = process.argv.indexOf('--paths')
  const pathFilter =
    pathsIdx >= 0 && process.argv[pathsIdx + 1]
      ? process.argv[pathsIdx + 1]!.split(',').map((s) => s.trim()).filter(Boolean)
      : undefined
  if (driftOnly) {
    const fix = process.argv.includes('--fix')
    const audit = handMaintainedViolations({ cwd, paths: pathFilter })
    if (audit.violationCount === 0) {
      console.log(`✓ readme:drift — ${audit.pathsScanned.length} path(s) · zero hand-maintained violations`)
      process.exit(0)
    }
    console.error(`✖ readme:drift — ${audit.violationCount} violation(s)`)
    for (const v of audit.violations.slice(0, 15)) console.error(`  ${v.path} [${v.kind}] → ${v.fix}: ${v.detail}`)
    if (fix) {
      const r = computeTheRest(pathFilter?.[0], cwd)
      console.log(`readme:drift — regen ${r.computed} faces for ${r.paths.join(', ')}`)
    }
    process.exit(1)
  }
  const waveProgress = (ordinal: number, itemCount: number): void => {
    console.log(`readme:waves — horo wave ${ordinal}/7 · ${itemCount} paths`)
  }
  const foldRoot = verify && !pathFilter ? corpusFoldRoot(cwd) : null
  if (foldRoot) {
    const receipt = readCorpusFoldReceipt(cwd)
    if (receipt?.root === foldRoot) {
      console.log(
        `✓ readme:check + computed:check — corpus fold root unchanged (${receipt.faces} faces sealed ${receipt.at}) — zero recompute (quantum fold).`,
      )
      process.exit(0)
    }
  }
  const frozen = pathFilter ? undefined : buildReadmeCorpusFrozenInputs(cwd, verify ? { pathFollowGate: true } : undefined)
  const corpus =
    pathFilter || waves
      ? undefined
      : buildReadmeCorpus(cwd, verify ? { pathFollowGate: true } : undefined)
  const expectedRoot = pathFilter
    ? ''
    : waves
      ? renderRootReadmeInWaves(cwd, frozen!, waveProgress)
      : generateReadme(cwd, corpus!)
  if (verify) {
    let failed = false
    const pathGate = assertCorpusPathFollowGate()
    if (!pathGate.followed) {
      console.error(
        `✖ readme:check — path lattice incomplete: ${pathGate.missing.length} path(s) not followed (${(pathGate.coverage * 100).toFixed(2)}% coverage).`,
      )
      failed = true
    }
    const rootPath = join(cwd, 'README.md')
    if (!pathFilter) {
      let actualRoot = ''
      try {
        actualRoot = readFileSync(rootPath, 'utf8')
      } catch {
        console.error('✖ readme:check — README.md is missing. Run `pnpm readme`.')
        failed = true
      }
      if (!failed && actualRoot !== expectedRoot) {
        console.error('✖ readme:check — root README drift.')
        failed = true
      }
    }
    const { readme, llm, diamond } = pathFilter
      ? verifyComputedFacesForPaths(pathFilter, cwd)
      : waves
        ? verifyComputedFacesInWaves(cwd, (ordinal, itemCount, driftSoFar) => {
            console.log(
              `readme:check — wave ${ordinal}/7 · ${itemCount} paths verified · ${driftSoFar} drift(s) so far`,
            )
          })
        : verifyComputedFaces(cwd, corpus!)
    if (!readme.ok) {
      console.error(
        `✖ readme:check — ${readme.drift.length} folder README(s) drift: ${readme.drift.slice(0, 5).join(', ')}${readme.drift.length > 5 ? '…' : ''}`,
      )
      failed = true
    }
    if (!llm.ok) {
      console.error(
        `✖ computed:check — ${llm.drift.length} folder LLM.md drift: ${llm.drift.slice(0, 5).join(', ')}${llm.drift.length > 5 ? '…' : ''}`,
      )
      failed = true
    }
    if (!diamond.ok) {
      console.error(
        `✖ computed:check — ${diamond.drift.length} folder diamond.json drift: ${diamond.drift.length > 5 ? `${diamond.drift.slice(0, 5).join(', ')}…` : diamond.drift.slice(0, 5).join(', ')}`,
      )
      failed = true
    }
    if (failed) process.exit(1)
    const n = listAtomPaths(cwd).length
    console.log(`✓ readme:check — root + ${n} folder READMEs ≡ regenerated (zero entropy).`)
    console.log(`✓ computed:check — ${n} folder LLM.md + diamond.json ≡ regenerated (zero entropy).`)
    if (foldRoot) {
      sealCorpusFold(foldRoot, n, cwd)
      console.log(`readme:check — sealed corpus fold root ${foldRoot.slice(0, 8)}… — next unchanged verify is free.`)
    }
    process.exit(0)
  }
  if (!foldersOnly && !pathFilter) {
    writeFileSync(join(cwd, 'README.md'), expectedRoot)
    const rootInputs = waves ? deriveReadmeRootInputsInWaves(cwd) : { analytics: corpus!.analytics, papers: corpus!.papers }
    console.log(`readme: wrote README.md — content-uuid ${readmeUuid(deriveModel(cwd, rootInputs.analytics, rootInputs.papers))}`)
  }
  // --root: regenerate ONLY the front-page README.md (the derivable faces are gitignored
  // and computed on demand elsewhere) — the reused command that replaced a throwaway script.
  if (process.argv.includes('--root')) {
    console.log(`readme: root README.md only (${expectedRoot.split('\n').length} lines) — faces skipped.`)
  } else {
    const n = pathFilter
      ? materializeComputedFacesForPathsStable(pathFilter, cwd)
      : waves
        ? materializeComputedFacesInWaves(cwd, (ordinal, itemCount, written) => {
            console.log(`readme:waves — wave ${ordinal}/7 complete · ${itemCount} paths · ${written} total`)
          })
        : materializeComputedFaces(cwd, corpus!)
    console.log(`readme: wrote ${n} folder computed faces (README.md + LLM.md + diamond.json)`)
  }
}
