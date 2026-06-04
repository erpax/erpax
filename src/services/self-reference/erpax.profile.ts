/**
 * Slice GGGGGG — `erpax-platform` self-tenant role.
 *
 * Per spec §0c. The TenantRoleProfile whose subject IS ERPax itself.
 * When activated on the ERPax-instance-running-ERPax tenant, the
 * conservation laws apply to the platform: every slice's spec is a
 * citable standard; every slice's chain is a runnable workflow;
 * every MetaSkillAgent observation is an audit leaf in the chain
 * it observes. The vortex is fully self-coupled.
 *
 * @standard ISO/IEC 25010:2023 §5.1 functional-completeness (self-coherence)
 * @audit ISO 19011:2018 §6.4.6 (platform observes itself)
 */

import { defineTenantRole } from '@/services/tenant-roles/registry'

defineTenantRole({
  id: 'erpax-platform',
  displayName: { en: 'ERPax (the platform itself)', bg: '[en] ERPax (the platform itself)' },
  inheritsFrom: ['business'],
  // The auto-derived sets below MUST be computed from collectGenome() at boot;
  // declared here as MARKERS that will be widened by GenomeBundle ingestion.
  requiredStandards: [
    { body: 'ISO',   id: '25010:2023',  description: 'self-coherence requires functional-completeness' },
    { body: 'ISO',   id: '12207',       description: 'single-source-of-truth (the spec describes itself)' },
    { body: 'ISO',   id: '19011:2018',  description: 'audit-trail (every observation is itself audited)' },
    { body: 'IETF',  id: 'RFC-4122',    description: 'content-uuid (the platform is content-addressable)' },
    { body: 'IETF',  id: 'RFC-8785',    description: 'JSON canonicalization (deterministic genome)' },
    { body: 'NIST',  id: 'FIPS-180-4',  description: 'SHA-256 (the platform hashes itself)' },
  ],
  requiredCollections: [],   // populated by genome ingestion at boot
  requiredChains: [],        // populated by genome ingestion at boot
  requiredAgents: [
    'meta-skill',            // MUST be present — observes the platform observing itself
    'engineering',           // MUST be present — owns conservation invariants
  ],
  mcpTools: [
    'erpax.platform.publishSelf',     // platform must be able to publish its own genome
    'erpax.platform.bootFromFederation',  // and ingest a peer genome
    'erpax.spec.getCollection',           // and inspect its own spec
    'erpax.spec.getChainRegistry',        // and its own chains
    'erpax.agents.list',                  // and its own agents
    'erpax.standards.cite',               // and its own standards
    'erpax.audit.getEvidence',            // and its own audit history
    'erpax.integrity.auditTenant',        // and its own integrity (Law 8)
    'erpax.refs.findDangling',            // and its own refs (Law 10)
  ],
  invariant: 'checkErpaxObservesItself',
  auditPolicy: { merkleRetentionDays: 36500 /* 100y */, signingRequired: true, regulatorReportingCadence: 'annual' },
})
