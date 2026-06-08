/**
 * agent — the one accountable object, barrel of all its facets.
 */
export * from './service'
export { createAgentContext } from './context'

export type {
  AgentId, DomainAgent, AgentContext, AgentEffect, AgentLawState,
  AgentRegistry, AgentRuntime,
  DomainEvent, AuditLeaf, EvidenceFrame, GapSeverity,
} from './types'

export {
  StrictApplyViolation,
  AGENT_RUNTIME_GRANT,
  defaultAgentLawState,
  createPathSession,
  agentLawWithPathSession,
  dispatchPathsFrom,
  recordPathVisits,
  strictApplyDispatch,
  strictApplyEffect,
  strictApplyMcpCall,
  assertStrictDispatch,
  assertStrictEffect,
  assertStrictMcpCall,
  type PathSession,
} from './strict-apply'

export { agentCostPolicy, type AgentCostPolicy, type AgentCostPolicyOpts } from './cost-policy'
export {
  cheapAgentDispatch,
  fullSkillIndexContextBytes,
  type CheapAgentDispatchOpts,
  type CheapAgentDispatchContext,
} from './cheap-dispatch'

export {
  MAX_AGENT_SKILL_CONTEXT_BYTES,
  AGENT_SKILL_CONTEXT_CACHE_TTL_MS,
  realiseSkillsForPath,
  skillsForImport,
  agentSkillContextForDispatch,
  atomPathFromInput,
  skillBearingAtomPath,
  domainHubFor,
  bondedNeighborPaths,
  clearAgentSkillContextCache,
  getAgentSkillContextCache,
  skillContextCacheKey,
  loadSealedSkill,
  resolveSkillLoadOpts,
  isProseSkillFace,
  compactRulesSnapshot,
  type AgentSkillContext,
  type RealisedSkillEntry,
  type RealiseSkillsOpts,
  type CompactQuantumSnapshot,
  type CompactRulesSnapshot,
  type SkillBundleRole,
} from './skill-context'

export {
  createWaveSession,
  completeWaveHop,
  waveSessionVerdict,
  isWaveSessionReady,
  selfBalancingWaveLoad,
  waveDispatchCost,
  tamperCostForWave,
  scheduleCorpusPathsInWaves,
  corpusPathWaveBatches,
  pathComparableUnits,
  type WaveSession,
  type WaveBatch,
  type SelfBalancingWavePlan,
} from '@/wave'

export { createAgentRegistry } from './registry'
export { processEffect, processEffects } from './effect-processor'
export { createAgentRuntime } from './runtime'
export { conveneAgentSociety, disbandAgentSociety } from './coil'

export type { McpClient, McpToolDescriptor } from '@/agents/mcp'
export { createInProcessMcpClient } from '@/agents/mcp'
export type { ErpaxMcpTool } from '@/agents/mcp'
export { buildErpaxMcpTools } from '@/agents/mcp'
export type { ErpaxMcpResource } from '@/agents/mcp'
export { ERPAX_MCP_RESOURCES } from '@/agents/mcp'
export type { ErpaxMcpPrompt } from '@/agents/mcp'
export { ERPAX_MCP_PROMPTS } from '@/agents/mcp'

export {
  taskInventory,
  inventoryReport,
  formatDoctorInventorySection,
  inventoryGateWarnings,
  INVENTORY_STALE_AFTER_SEC,
  INVENTORY_MAX_ACTIVE,
  INVENTORY_JSON_REL,
  type InventoryRow,
  type InventoryStatus,
  type TaskInventoryResult,
} from './inventory'
export { emitInventorySnapshot, buildInventorySnapshot } from './inventory/emit'

export { agentRegistry, agentRuntime } from './bootstrap'
export { erpaxMcpTools, erpaxMcpResources, erpaxMcpPrompts } from './mcp-surface'
export { manifestOf, buildBlockCatalog, composeBlocks, validateComposition, chainBlocks, checkRegistryCoupling, chainsAsBlockCompositions } from './blocks'
export type { AgentBlockManifest } from './blocks'
