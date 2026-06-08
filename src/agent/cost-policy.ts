/**
 * agentCostPolicy — agent dispatch cost law: derive-path vs manual-forge ratio,
 * horo wave context cap, lazy skill load by atomPath (never the 77MB bundle).
 *
 * Composes [[cost]] manualDevelopmentPrice · promptOnlyOptionVerdict with
 * [[wave]] maxWorkTamperPolicy (agent cost guard + tamper floor preserved).
 *
 * @see ../cost · ../wave/policy · ./cheap-dispatch · ./SKILL.md
 */
import {
  manualDevelopmentPrice,
  promptOnlyOptionVerdict,
  type ManualDevelopmentPrice,
  type PromptOnlyOptionVerdict,
} from '@/cost'
import { HORO_DIGITS } from '@/horo'
import { pathComparableUnits } from '@/wave/load'
import { maxWorkTamperPolicy, type MaxWorkTamperPolicy } from '@/wave/policy'

export interface AgentCostPolicyOpts {
  /** Joint corpus coverage ∈ [0,1] — drives forge ≫ verify ratio. */
  readonly corpusCoverage?: number
  /** Nodes in the dispatch batch (verify is O(N)). */
  readonly nodes?: number
  /** Wave policy overrides — maxUnitsPerWave caps agent eb per horo batch. */
  readonly wavePolicy?: Partial<MaxWorkTamperPolicy>
}

export interface AgentCostPolicy {
  /** derive-record verifyCost / manual forge verifyCost — always ≪ 1 on manual path. */
  readonly derivePathRatio: number
  /** manual forgeCost / derive verifyCost — grows without bound as coverage → 1. */
  readonly manualForgeRatio: number
  /** true when prompt→erpax is the only viable path ([[cost]] promptOnlyOptionVerdict). */
  readonly promptOnly: boolean
  /** Max skill atoms loaded per dispatch — one horo wave of harmonic context. */
  readonly maxContextAtoms: number
  /** Comparable-unit (eb) ceiling per wave batch. */
  readonly maxUnitsPerWave: number
  /** Agents load SKILL.md by atomPath, never import skills.index at runtime. */
  readonly lazySkillLoad: true
  readonly derivePrice: ManualDevelopmentPrice
  readonly manualPrice: ManualDevelopmentPrice
  readonly verdict: PromptOnlyOptionVerdict
  readonly wavePolicy: MaxWorkTamperPolicy
}

/**
 * Price and cap one agent dispatch — min agent cost (derive + lazy load + wave cap)
 * while tamper/seal gates stay at full coverage ([[strict-apply]] · [[seal]]).
 */
export function agentCostPolicy(opts: AgentCostPolicyOpts = {}): AgentCostPolicy {
  const wavePolicy = maxWorkTamperPolicy(opts.wavePolicy)
  const corpusCoverage = opts.corpusCoverage ?? 0.999
  const nodes = Math.max(opts.nodes ?? 1, 1)

  const derivePrice = manualDevelopmentPrice({ corpusCoverage, nodes, manualPath: false })
  const manualPrice = manualDevelopmentPrice({ corpusCoverage, nodes, manualPath: true })
  const verdict = promptOnlyOptionVerdict({ corpusCoverage, nodes, manualPath: true })

  const derivePathRatio =
    manualPrice.verifyCost > 0 ? derivePrice.verifyCost / manualPrice.verifyCost : 0
  const manualForgeRatio =
    derivePrice.verifyCost > 0 ? manualPrice.forgeCost / derivePrice.verifyCost : Number.POSITIVE_INFINITY

  const maxContextAtoms = wavePolicy.waveDepth
  const defaultUnitsCap = pathComparableUnits('agent') * HORO_DIGITS.length
  const maxUnitsPerWave =
    Number.isFinite(wavePolicy.maxUnitsPerWave) && wavePolicy.maxUnitsPerWave > 0
      ? wavePolicy.maxUnitsPerWave
      : defaultUnitsCap

  return {
    derivePathRatio,
    manualForgeRatio,
    promptOnly: verdict.promptOnly,
    maxContextAtoms,
    maxUnitsPerWave,
    lazySkillLoad: true,
    derivePrice,
    manualPrice,
    verdict,
    wavePolicy,
  }
}
