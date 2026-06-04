/**
 * MCP self-standardization — Slice XXXXXX (2026-05-11).
 *
 * Per user 'let mcp standardize itself'. After WWWWWW (let MCP build
 * itself), the MCP layer normalizes itself: enforces a per-area
 * naming convention, validates that every hand-curated tool cites
 * at least one standard (auto-generated tools are exempt), groups
 * tools by spec axis, and detects tool drift (a hand-curated tool
 * with no standards reference is non-conformant).
 *
 * **Conservation Law 38** — `checkMcpToolStandardization`:
 *   1. Every tool name matches `^erpax\.[a-z][a-z0-9-]*\.[a-zA-Z]+$`
 *      (`erpax.<area>.<verb>` — kebab-case area, camelCase verb).
 *   2. Every hand-curated tool description cites ≥1 standard
 *      (matched by the standards lexicon: IFRS / IAS / ISO / IEC /
 *      RFC / W3C / EU / GDPR / PSD / etc.) OR is tagged `[generated]`.
 *   3. Area is one of the declared canonical areas; new areas must
 *      be added to `CANONICAL_AREAS` explicitly (forces conscious
 *      taxonomy decisions).
 *
 * The mental model: just as ERPax enforces standards on every
 * collection (slice JJJ + Law 1 — spec coverage), now ERPax enforces
 * standards on its OWN tooling. The MCP surface is itself a domain
 * subject to the conservation framework.
 *
 * @standard MCP 0.6 — tools/list naming convention
 * @standard ISO/IEC 25010:2023 §5.4 reusability + §5.5 testability
 * @standard W3C JSON-LD 1.1 — typed tool manifests
 * @audit ISO 19011:2018 §6.4.6 (every tool standards-traceable)
 */

import type { ErpaxMcpTool } from '@/agents/mcp/tool-defs'

/**
 * Canonical MCP areas — every tool's `<area>` segment must be one of
 * these. Adding a new area requires editing this list, which forces
 * conscious taxonomy decisions and prevents naming sprawl.
 */
export const CANONICAL_AREAS: ReadonlyArray<string> = [
  // Core spec
  'spec', 'standards', 'i18n', 'multimedia',
  // Agents + composition
  'agents', 'blocks', 'chain', 'streams', 'proposals',
  // Domain
  'commerce', 'accounting', 'marketing', 'website', 'voting',
  // Integrity + storage
  'integrity', 'storage', 'archival', 'anchoring', 'refs',
  // Federation + identity
  'federation', 'platform', 'cloning',
  // Beyond / DID
  'beyond', 'did',
  // PWA (slice NNNNNNNN)
  'pwa',
  // Auto-generated (slice WWWWWW)
  'auto',
  // Executable actions — the upstream ActiveAdmin member/batch/reify surface
  // ported as MCP tools so MCP-only agents can drive it through the erpax API:
  //   batch    — bulk state-transition (erpax.batch.transition)
  //   versions — version restore / reify (erpax.versions.restore)
  // Added explicitly per the Law 38 conscious-taxonomy gate.
  'batch', 'versions',
] as const

/**
 * Slice QQQQQQQQ — runtime counterpart of `docs/standards/mcp.md`.
 * Every standard the MCP layer cites, mapped to (a) the standards
 * family per §0g (slice LLLLLL); (b) one or two ERPax modules that
 * implement / cite it. Exposed via `erpax.platform.standardsIndex`
 * so external clients can ask "what does ERPax claim to implement
 * inside its MCP surface?" and get a typed answer.
 */
export interface McpStandardEntry {
  readonly id: string                // canonical citation token
  readonly family: 'mcp' | 'rfc-ietf' | 'w3c' | 'iso' | 'schema-org' | 'topology' | 'open-graph' | 'other'
  readonly title: string
  readonly modules: ReadonlyArray<string>     // file paths under src/
  readonly conservationLaws?: ReadonlyArray<number>
}

export const MCP_STANDARDS_INDEX: ReadonlyArray<McpStandardEntry> = [
  // §1 — Core MCP protocol
  { id: 'MCP 0.6 — tools/list + tools/call', family: 'mcp', title: 'Model Context Protocol — core methods',
    modules: ['agents/mcp/tool-defs.ts', 'agents/mcp/in-process-client.ts'], conservationLaws: [1, 37] },
  { id: 'MCP 0.6 — tools/list naming convention', family: 'mcp', title: 'erpax.<area>.<verb> taxonomy',
    modules: ['agents/mcp/standardization.ts'], conservationLaws: [38] },
  { id: 'MCP 0.6 — tools/call result shape', family: 'mcp', title: '{content:[{type,text}]} envelope',
    modules: ['agents/mcp/tool-defs.ts'] },
  // §2 — JSON / serialization
  { id: 'RFC 8259', family: 'rfc-ietf', title: 'JSON data interchange',
    modules: ['agents/mcp/tool-defs.ts'] },
  { id: 'RFC 8785', family: 'rfc-ietf', title: 'JCS — JSON Canonicalization Scheme',
    modules: ['integrity/content-uuid.ts', 'voting/index.ts'], conservationLaws: [8, 30] },
  { id: 'W3C JSON-LD 1.1', family: 'w3c', title: 'JSON for Linked Data',
    modules: ['agents/mcp/presentation.ts', 'agents/mcp/standardization.ts', 'proof/dry-proof.ts'], conservationLaws: [39, 44] },
  { id: 'W3C JSON Schema (draft 2020-12)', family: 'w3c', title: 'Structural type descriptors',
    modules: ['integrity/type-uuid.ts'], conservationLaws: [47] },
  // §3 — Identity / content addressing
  { id: 'RFC 9562 §5.8', family: 'rfc-ietf', title: 'UUIDv8 (name-based, custom layout)',
    modules: ['integrity/content-uuid.ts', 'integrity/type-uuid.ts', 'integrity/uuid-stream.ts', 'integrity/uuid-short.ts'],
    conservationLaws: [8, 10, 30, 31, 35, 36, 39, 46, 47] },
  { id: 'FIPS 180-4', family: 'other', title: 'SHA-256',
    modules: ['integrity/content-uuid.ts', 'streams/index.ts'], conservationLaws: [8, 34] },
  { id: 'NIST SP 800-208', family: 'other', title: 'Stateful hash-based signatures (PQC future)',
    modules: ['beyond/pqc.ts'], conservationLaws: [18] },
  { id: 'W3C VC Data Model 2.0', family: 'w3c', title: 'Verifiable claims',
    modules: ['agents/mcp/presentation.ts', 'proof/dry-proof.ts'], conservationLaws: [44] },
  // §4 — Open Graph / Schema.org / SEO
  { id: 'Schema.org Action', family: 'schema-org', title: 'Action vocabulary (every tool is an Action)',
    modules: ['agents/mcp/presentation.ts'], conservationLaws: [39] },
  { id: 'Schema.org Dataset', family: 'schema-org', title: 'Dataset vocabulary (proofs + bundles)',
    modules: ['proof/dry-proof.ts', 'agents/mcp/standardization.ts'], conservationLaws: [44] },
  { id: 'Schema.org SoftwareApplication', family: 'schema-org', title: '/mcp/ root face',
    modules: ['agents/mcp/presentation.ts'] },
  { id: 'Schema.org CollectionPage', family: 'schema-org', title: 'Per-area MCP page',
    modules: ['agents/mcp/presentation.ts'] },
  { id: 'W3C Microdata 1.1', family: 'w3c', title: 'Inline microdata format',
    modules: ['agents/mcp/presentation.ts', 'website/seo-vortex.ts'], conservationLaws: [29, 39] },
  { id: 'Open Graph protocol', family: 'open-graph', title: 'Social-share preview meta',
    modules: ['agents/mcp/presentation.ts'], conservationLaws: [39] },
  { id: 'Twitter Cards', family: 'open-graph', title: 'Twitter analog of Open Graph',
    modules: ['agents/mcp/presentation.ts'] },
  { id: 'Sitemap.xml protocol 0.9', family: 'w3c', title: 'sitemap.xml emission',
    modules: ['website/seo-vortex.ts'], conservationLaws: [29] },
  { id: 'RFC 9694', family: 'rfc-ietf', title: 'robots.txt + REP — opt-in for ClaudeBot/GPTBot/Google-Extended',
    modules: ['website/seo-vortex.ts'] },
  { id: 'BCP-47', family: 'w3c', title: 'Language tags (hreflang)',
    modules: ['website/seo-vortex.ts', 'agents/mcp/presentation.ts'], conservationLaws: [3] },
  // §5 — Quality / audit
  { id: 'ISO/IEC 25010:2023 §5.2 performance', family: 'iso', title: 'Resource envelope',
    modules: ['topology/torus.ts', 'streams/index.ts'], conservationLaws: [15, 16, 43] },
  { id: 'ISO/IEC 25010:2023 §5.3 usability — discoverability', family: 'iso', title: 'Readiness manifest',
    modules: ['platform-readiness/index.ts'] },
  { id: 'ISO/IEC 25010:2023 §5.4 reusability', family: 'iso', title: 'DRY by detection + Trinity',
    modules: ['agents/mcp/dry-clean.ts', 'architecture-invariants/trinity.ts'], conservationLaws: [50] },
  { id: 'ISO/IEC 25010:2023 §5.5 testability', family: 'iso', title: 'Self-test smoke probe',
    modules: ['agents/mcp/self-test.ts'], conservationLaws: [41] },
  { id: 'ISO/IEC 25010:2023 §5.6 security — non-repudiation', family: 'iso', title: 'Signed ballots + content uuids',
    modules: ['voting/index.ts', 'integrity/content-uuid.ts'], conservationLaws: [8, 30, 31] },
  { id: 'ISO/IEC 25010:2023 §5.7 modularity', family: 'iso', title: '10 dimensional plugins + per-area MCP',
    modules: ['plugins/dimensions.ts', 'agents/mcp/standardization.ts'], conservationLaws: [49, 51] },
  { id: 'ISO/IEC/IEEE 29119-2', family: 'iso', title: 'Software testing process',
    modules: ['agents/mcp/self-test.ts'], conservationLaws: [41] },
  { id: 'ISO 19011:2018 §6.4.6', family: 'iso', title: 'Audit-evidence + traceability',
    modules: ['architecture-invariants/checks.ts'], conservationLaws: [38, 44] },
  { id: 'ISO/IEC 27001 §A.9.4.5', family: 'iso', title: 'Information access restriction (short uuids in UI)',
    modules: ['integrity/uuid-short.ts'], conservationLaws: [46] },
  { id: 'ISO/IEC 27040:2024', family: 'iso', title: 'Storage security',
    modules: ['storage-independence/index.ts'], conservationLaws: [35, 36] },
  { id: 'ISO/IEC 30134', family: 'iso', title: 'KPIs for resource efficiency (cost/carbon)',
    modules: ['topology/torus.ts', 'beyond/cost.ts', 'beyond/carbon.ts'], conservationLaws: [15, 16, 43] },
  // §6 — Streams / time / order
  { id: 'Lamport 1978', family: 'other', title: 'Distributed-system causal ordering',
    modules: ['streams/index.ts'], conservationLaws: [33, 34] },
  { id: 'W3C Streams API + ReactiveX', family: 'w3c', title: 'AsyncIterable surface',
    modules: ['streams/index.ts'] },
  { id: 'W3C PROV-DM', family: 'w3c', title: 'Per-event provenance',
    modules: ['beyond/provenance.ts'], conservationLaws: [12] },
  // §7 — PWA
  { id: 'W3C Service Workers', family: 'w3c', title: 'PWA cache + sync + push entry',
    modules: ['pwa/index.ts'], conservationLaws: [52] },
  { id: 'W3C Web App Manifest', family: 'w3c', title: 'PWA identity + display mode',
    modules: ['pwa/index.ts'], conservationLaws: [52] },
  { id: 'W3C Push API + Notifications API', family: 'w3c', title: 'UUID-dedup push',
    modules: ['pwa/index.ts'], conservationLaws: [52] },
  { id: 'W3C Cache API', family: 'w3c', title: 'UUID-keyed asset cache',
    modules: ['pwa/index.ts'], conservationLaws: [52] },
  { id: 'W3C IndexedDB 3.0 + W3C OPFS', family: 'w3c', title: 'Browser storage backends',
    modules: ['pwa/index.ts'], conservationLaws: [52] },
  // §8 — Topology
  { id: 'Topology — torus / closed manifold (Hatcher 2002)', family: 'topology', title: 'Closed surface',
    modules: ['topology/torus.ts'], conservationLaws: [43] },
  { id: 'CAP theorem', family: 'topology', title: 'CP via uuid-consensus',
    modules: ['storage-independence/index.ts'], conservationLaws: [36] },
]

/** Tool to enumerate the runtime standards index. */
export function listMcpStandards(): ReadonlyArray<McpStandardEntry> { return MCP_STANDARDS_INDEX }

/** Filter the index by standards family (the 8 high-level categories). */
export function mcpStandardsByFamily(family: McpStandardEntry['family']): ReadonlyArray<McpStandardEntry> {
  return MCP_STANDARDS_INDEX.filter((e) => e.family === family)
}

/** Reverse-lookup — which standards govern a given Conservation Law N? */
export function standardsForLaw(num: number): ReadonlyArray<McpStandardEntry> {
  return MCP_STANDARDS_INDEX.filter((e) => e.conservationLaws?.includes(num))
}

/**
 * Standards lexicon — token patterns that indicate a tool's
 * description cites at least one standard. The grammar is loose
 * (we can't parse arbitrary prose for citations), but the patterns
 * cover the 7 standard families from §0g.
 */
const STANDARDS_PATTERNS: ReadonlyArray<RegExp> = [
  /\b(IFRS|IAS|IFRS S1|IFRS S2)\b/,
  /\bISO\/?IEC?\b|\bISO \d/,
  /\b(GDPR|PSD2|PSD3|EBA RTS|EMD2|MiFID|EMIR|BRRD|DGSD|DAC|AMLD|eIDAS|CSRD|CRR|CRD|AnaCredit|FINREP|COREP)\b/,
  /\b(SOX|COSO|FATCA|NIST|FIPS|SP 800|BCBS|Basel|PCI-DSS)\b/,
  /\b(W3C|RFC|IETF|DID|VC Data Model|PROV|JSON-LD|JCS)\b/,
  /\b(MCP \d|MCP 0\.6)\b/,
  /\b(IPSAS|GFS|Peppol|UN\/CEFACT|OECD|HS|UN SDG|Berlin Group)\b/,
  /\bConservation Law \d+\b/,           // self-citation
  /\bSchema\.org|Open Graph\b/,
  /\bLamport \d{4}\b/,
]

const NAME_PATTERN = /^erpax\.([a-z][a-z0-9-]*)\.([a-zA-Z][a-zA-Z0-9-]*)$/

export type ToolViolationKind = 'bad-name' | 'unknown-area' | 'missing-standards-citation'

export interface ToolViolation {
  readonly tool: string
  readonly kind: ToolViolationKind
  readonly detail: string
}

export interface StandardizationResult {
  readonly ok: boolean
  readonly toolsChecked: number
  readonly handCuratedCount: number
  readonly autoGeneratedCount: number
  readonly violations: ReadonlyArray<ToolViolation>
  readonly perAreaCounts: Record<string, number>
}

/** Conservation Law 38 — full audit of an MCP tool list. */
export function checkMcpToolStandardization(tools: ReadonlyArray<ErpaxMcpTool>): StandardizationResult {
  const violations: ToolViolation[] = []
  const perAreaCounts: Record<string, number> = {}
  const knownAreas = new Set(CANONICAL_AREAS)
  let handCurated = 0
  let autoGenerated = 0

  for (const tool of tools) {
    const isGenerated = tool.description.startsWith('[generated]')
    if (isGenerated) autoGenerated++; else handCurated++

    const m = tool.name.match(NAME_PATTERN)
    if (!m) {
      violations.push({ tool: tool.name, kind: 'bad-name', detail: 'name must match erpax.<area>.<verb>' })
      continue
    }
    const area = m[1]!
    perAreaCounts[area] = (perAreaCounts[area] ?? 0) + 1

    if (!knownAreas.has(area)) {
      violations.push({
        tool: tool.name, kind: 'unknown-area',
        detail: `area '${area}' not in CANONICAL_AREAS — add explicitly`,
      })
    }

    if (!isGenerated) {
      const cited = STANDARDS_PATTERNS.some((rx) => rx.test(tool.description))
      if (!cited) {
        violations.push({
          tool: tool.name, kind: 'missing-standards-citation',
          detail: 'hand-curated tool description must cite ≥1 standard (IFRS/ISO/RFC/W3C/EU/PSD/W3C/Conservation Law N/etc.)',
        })
      }
    }
  }

  return {
    ok: violations.length === 0,
    toolsChecked: tools.length,
    handCuratedCount: handCurated,
    autoGeneratedCount: autoGenerated,
    violations,
    perAreaCounts,
  }
}

/**
 * Generate a JSON-LD bundle describing the MCP layer's own
 * standards conformance — what areas exist, which tools cite which
 * standards families, drift count. The bundle itself is content-uuid'd
 * (Law 8) so it can ride federation envelopes.
 */
export interface McpStandardsBundle {
  readonly '@context': 'https://schema.org'
  readonly '@type': 'Dataset'
  readonly name: 'ERPax MCP Standardization Bundle'
  readonly version: 'slice-XXXXXX (2026-05-11)'
  readonly conformance: StandardizationResult
  readonly canonicalAreas: ReadonlyArray<string>
  readonly standardsFamilies: ReadonlyArray<string>
}

export function buildMcpStandardsBundle(tools: ReadonlyArray<ErpaxMcpTool>): McpStandardsBundle {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'ERPax MCP Standardization Bundle',
    version: 'slice-XXXXXX (2026-05-11)',
    conformance: checkMcpToolStandardization(tools),
    canonicalAreas: CANONICAL_AREAS,
    standardsFamilies: ['ifrs-ias', 'iso', 'eu-directive', 'us-fed', 'w3c-ietf', 'cloudflare', 'un-oecd-wco'],
  }
}
