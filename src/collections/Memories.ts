/**
 * Memories — generic persistence layer for state that MCP tools and
 * DomainAgents currently keep in-memory.
 *
 * Slice RRRRRRRR (2026-05-11) — per user "memories collection also is
 * missing. anything mcp needs need a collection".
 *
 * Today's in-memory state that gets lost on restart:
 *   - meta-automation `PROPOSALS_LOG` — every fix proposal the
 *     ConsistencyAgent's hourly cron produces
 *   - dry-clean.ts strategy decisions per cycle — uuid-keyed strategy
 *     choices that should be queryable later
 *   - drift-cycle snapshots (entropy, ceiling, gate) over time — the
 *     trend that proves convergence
 *   - agent observations (e.g. ConsistencyAgent's per-sweep summaries)
 *   - emerging gaps (Slice PPPPPPPP-cont CREATE_GAP candidates)
 *
 * The schema is intentionally generic:
 *
 *   (ownerType, ownerId, kind, key) → payload
 *
 * Per Conservation Law 8 (content-uuid) the row carries a
 * `contentUuid` derived from the canonical payload, so federation
 * peers + replication can verify they have the same memory.
 *
 * Per Conservation Law 10 (referential harmony) memories can declare
 * `relatedTo` edges back to the rows they reference, forming a
 * navigable memory graph.
 *
 * @standard ISO/IEC 25010:2023 §5.7 modifiability — persistent memory layer
 * @standard ISO 19011:2018 §6.4.6 audit-evidence (memory history audit-trailed)
 * @audit Conservation Law 8 content-uuid (per-memory contentUuid)
 * @audit Conservation Law 10 referential-harmony (relatedTo graph)
 * @see ../../services/meta-automation/index.ts PROPOSALS_LOG
 * @see ../../services/agents/mcp/dry-clean.ts strategyDecisions
 * @see ../factories/collection-factory.ts
 */
import { createAccountingCollection } from '../services/accounting/factories/collection-factory'
import { referenceField } from '../fields/base-accounting-fields'

export default createAccountingCollection({
  slug: 'memories',
  labels: { singular: 'Memory', plural: 'Memories' },
  useAsTitle: 'title',
  defaultColumns: ['kind', 'ownerType', 'ownerId', 'title', 'createdAt'],
  description:
    'Generic persistence layer for MCP tools + DomainAgent in-memory state: fix proposals, strategy decisions, drift-cycle snapshots, agent observations, emerging gaps. Every row is content-uuid\'d (Law 8) and can declare relatedTo edges (Law 10).',

  standards: [
    'ISO/IEC-25010:2023',
    'ISO-19011:2018',
    'W3C-JSON-LD-1.1',
    'RFC-4122',
  ],
  feature: 'agent-memory',
  emits: [
    { event: 'memory:recorded',  onCreate: true,                aggregate: 'order' },
    { event: 'memory:archived',  onStatus: 'archived',          aggregate: 'order' },
    { event: 'memory:superseded', onStatus: 'superseded',       aggregate: 'order' },
  ],

  injectStatusField: true,
  statusOptions: [
    { label: 'Active (current)', value: 'active' },
    { label: 'Archived (kept for audit, not used)', value: 'archived' },
    { label: 'Superseded by a newer memory', value: 'superseded' },
    { label: 'Expired (TTL elapsed)', value: 'expired' },
  ],
  statusDefault: 'active',

  fields: () => [
    referenceField({
      name: 'memoryRef',
      description: 'Stable tenant-unique memory id (e.g. MEM-2026-05-001). Cross-cycle navigation key.',
    }),

    // Identity
    { name: 'title', type: 'text', required: true,
      admin: { description: 'One-line human-readable label.' } },

    // The session / memory AS A DOCUMENT — Lexical rich text. Reference any
    // erpax entity inline via internal links (the attention edges, in prose):
    // "store sessions in forms of documents; using lexical you may reference
    // everything from there". Uses the config default editor (LinkFeature).
    // Structured edges also live in `relatedTo` below.
    { name: 'body', type: 'richText',
      admin: { description: 'The memory/session as a rich document; reference everything inline (Lexical internal links).' } },

    // Owner: who/what holds this memory
    {
      name: 'ownerType',
      type: 'select',
      required: true,
      options: [
        { label: 'Agent (DomainAgent observation / proposal)', value: 'agent' },
        { label: 'Tool (MCP tool result cache)', value: 'tool' },
        { label: 'Tenant (per-tenant operational state)', value: 'tenant' },
        { label: 'Platform (cross-tenant platform-level memory)', value: 'platform' },
        { label: 'Cycle (one harmonic-cycle snapshot)', value: 'cycle' },
      ],
    },
    { name: 'ownerId', type: 'text', required: true,
      admin: { description: 'Stable id of the owner — agent.id, tool name, tenant id, cycleUuid, etc.' } },

    // Kind: what KIND of memory
    {
      name: 'kind',
      type: 'select',
      required: true,
      options: [
        { label: 'Fix proposal (meta-automation PROPOSALS_LOG row)', value: 'fix_proposal' },
        { label: 'Strategy decision (drift-cycle uuid-keyed choice)', value: 'strategy_decision' },
        { label: 'Drift snapshot (entropy / ceiling / gate at a cycle)', value: 'drift_snapshot' },
        { label: 'Emerging gap (CREATE_GAP candidate)', value: 'emerging_gap' },
        { label: 'Agent observation (one onEvent / onSchedule result)', value: 'agent_observation' },
        { label: 'Tool result cache (cacheable computation)', value: 'tool_cache' },
        { label: 'Feedback (user → agent guidance)', value: 'feedback' },
        { label: 'Fact (learned fact about the codebase / world)', value: 'fact' },
        { label: 'Reference (pointer to external system)', value: 'reference' },
      ],
    },

    // The memory payload itself
    { name: 'key', type: 'text', required: true, index: true,
      admin: { description: 'Sluggable key within (ownerType, ownerId, kind). Reusing the same key with a new payload triggers supersession.' } },
    { name: 'payload', type: 'json',
      admin: { description: 'Structured memory data — exact shape depends on kind. JSON-LD-friendly when the kind defines a @context.' } },
    { name: 'rationale', type: 'textarea',
      admin: { description: 'Why this memory exists — for human review + supersession diff context.' } },

    // Temporal
    { name: 'recordedAt', type: 'date', required: true,
      admin: { description: 'ISO 8601-1:2019 timestamp the memory was first written.' } },
    { name: 'expiresAt', type: 'date',
      admin: { description: 'Optional TTL — when set, scheduled job transitions status → expired.' } },

    // Conservation Law 8 — content-uuid
    { name: 'contentUuid', type: 'text', index: true,
      admin: { description: 'Sha-256 of the canonical (ownerType|ownerId|kind|key|payload) — federation peers verify match.' } },

    // Conservation Law 10 — referential harmony
    {
      name: 'relatedTo',
      type: 'array',
      admin: { description: 'Edges to other rows this memory references. Forms the navigable memory graph.' },
      fields: [
        { name: 'collection', type: 'text', required: true,
          admin: { description: 'Target collection slug — "audit-events", "memories", "standards", etc.' } },
        { name: 'docId', type: 'text', required: true,
          admin: { description: 'Target document id.' } },
        { name: 'edgeKind', type: 'select',
          options: [
            { label: 'About (this memory describes the target)', value: 'about' },
            { label: 'Caused-by (the target produced this memory)', value: 'caused_by' },
            { label: 'Supersedes (this memory replaces the target)', value: 'supersedes' },
            { label: 'Refers (informational pointer)', value: 'refers' },
          ],
          defaultValue: 'about',
        },
      ],
    },

    // Origin trail
    { name: 'cycleUuid', type: 'text', index: true,
      admin: { description: 'The harmonic-cycle uuid (Slice PPPPPPPP) this memory was produced in. Lets observers join all memories from the same sweep.' } },
    { name: 'emittedFromEvent', type: 'text',
      admin: { description: 'Event id that caused this memory (when applicable) — e.g. "consistency:scan:complete".' } },
  ],
})
