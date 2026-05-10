/**
 * Agent runtime — barrel.
 *
 * Slice DDDDD (2026-05-11). The A-vortex coupling layer of the
 * three-vortex automated-system architecture (see
 * docs/superpowers/specs/2026-05-11-automated-system-three-vortex-architecture-design.md).
 *
 * @standard ISO/IEC 25010:2023 §5.4 modularity
 */

export type {
  AgentId, DomainAgent, AgentContext, AgentEffect,
  AgentRegistry, AgentRuntime,
  DomainEvent, AuditLeaf, EvidenceFrame, GapSeverity,
} from './types'

export { createAgentRegistry } from './registry'
export { processEffect, processEffects } from './effect-processor'
export { createAgentRuntime } from './runtime'
