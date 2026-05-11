# Three-vortex automated-system architecture — design

**Status:** approved (Sections 1–3 walked through with maintainer 2026-05-11)
**Slice family:** DDDDD onwards (CCCCC supplies the spec layer; this design uses it)
**Author:** maintainer (Tsvetan) + Claude
**Date:** 2026-05-11

## 0. What ERPax is

**ERPax = ERP × Agent.** The name is the architecture: any ERP function multiplied by any agent (human, AI, regulator, integration), composed through MCP. The `x` is the multiplication operator; the conservation laws are what make the cross-product associative.

**ERPax is an MCP server for agents.** The Model Context Protocol IS the product; everything else is incidental.

Every business operation is one `mcp.callTool('erpax.…', args)` call away. The 16 (and growing) ERPax MCP tools — `erpax.spec.*` · `erpax.chain.*` · `erpax.i18n.*` · `erpax.multimedia.*` · `erpax.marketing.*` · `erpax.audit.*` · `erpax.agents.*` · `erpax.integrity.*` · `erpax.refs.*` · `erpax.standards.*` — are the SDK. Internal `DomainAgents` and external clients (Claude Code, Cursor, automated pipelines, regulators with read-only API keys, the human-facing Payload admin UI, third-party apps) **all consume the same surface**. There is one handler per tool, used by both paths (slice DDDDD's in-process `McpClient` ≡ the over-the-wire `@payloadcms/plugin-mcp` exposure).

This collapses what would otherwise be five separate concerns:

- "How do humans run business operations?" → an MCP client (the admin UI is one).
- "How do AI agents drive workflows?" → another MCP client.
- "How do regulators audit?" → a read-only MCP client with `erpax.audit.*` + `erpax.integrity.*` + `erpax.refs.*` access.
- "How do third-party integrations write back?" → an MCP client with scoped tool permissions.
- "How do internal `DomainAgents` reason?" → `AgentContext.mcp` — the same in-process client.

The "ERP" part becomes **incidental** — the SAME MCP server runs a payment provider (slice MMMMM), a bank (NNNNN), a government (OOOOO), a healthcare provider (PPPPP+), a sovereign fund — anyone the open `TENANT_ROLE_PROFILES` registry describes (slice LLLLL). What's invariant across all those is the MCP protocol and the conservation laws.

### The five things that constitute ERPax core

Once **any tenant can be anyone** (open `TENANT_ROLE_PROFILES`, LLLLL) and **any agent can be anyone** (open `AgentRegistry`, DDDDD), ERPax core is exactly five things:

1. **An MCP-shaped coupling tensor** — the agent runtime + chain registry + spec extractor + audit chain + i18n engine, all exposed via the MCP tool surface so any client (human / AI / regulator / integration) drives the system the same way.
2. **Conservation laws** (10 today, 10 more in slice ZZZZZ — total 20+) — proved on every push, hold regardless of tenant role / agent set / standards bundle.
3. **A spec language** (15 SpecXxx types, JSDoc-as-spec) — anyone declares a collection / chain / agent / role / standard citation; the platform generates seeds, tests, marketing, audit-evidence, i18n keys, and **MCP tools** from the declarations.
4. **An evidence machine** — every state transition → Merkle leaf; every workflow → multimedia walkthrough; every collection → ≥1 standards citation; every value → causal-provenance chain (Law 11). Output: "every claim is provable, in every locale, against every regulator's framework, by replay (Law 12) if challenged."
5. **An open composability primitive** — plugins, agents, roles, chains, standards, MCP tools all compose. New plugin = new agent = new role = new standards = new MCP tools = no core changes.

**Positioning sentence:** ERPax is **the MCP server your AI agents talk to your business through** — and the conservation laws keep what they say to it provably consistent. The core is small; the periphery is unbounded; the protocol is universal.

Five things and only five constitute ERPax core:

1. **A coupling tensor** — the agent runtime + chain registry + spec extractor + audit chain + i18n engine + MCP surface that lets any axis be anything and still produce coherent compliant output.
2. **Seven conservation laws** — spec-coverage, standards-coverage, i18n-coverage, event-graph, audit-continuity, DRY, agent-ownership. These hold regardless of tenant role / agent set / standards bundle. **The laws ARE ERPax.**
3. **A spec language** — JSDoc-as-spec vocabulary (15 SpecXxx types) — anyone declares a collection / chain / agent / role / standard citation; the platform generates seeds, tests, marketing, audit-evidence, i18n keys, and MCP tools from the declarations.
4. **An evidence machine** — every state transition → Merkle leaf; every workflow → multimedia walkthrough; every collection → ≥1 standards citation. Output: "every claim is provable, in every locale, against every regulator's own framework".
5. **An open composability primitive** — plugins, agents, roles, chains, standards all compose. New plugin = new agent = new role = new standards = no core changes. ERPax becomes whatever the composition produces.

**Positioning sentence:** ERPax is the **regulated-substrate-as-platform** — anyone supplies the matter (their role, their agents, their standards, their locale); ERPax supplies the conservation laws that keep the matter provably consistent.

The core is small: ~5,500 LoC across the agent runtime + spec generators + invariants + MCP surface + role registry. The periphery is unbounded: any tenant, any role, any standards bundle, any agent, any locale, any plugin. This unbounded periphery is what makes the platform "for anyone" — and the conservation laws are what keep "anyone" from breaking it.

## 0b. The 10 vortices (post-FFFFFF) — system as coupled flow

The original 3-vortex framing (A domains × B substrate × C chains) was the seed; what shipped through slices DDDDD → ZZZZZ → AAAAAA → FFFFFF grew the system to **10 interacting vortices in one phase space**:

| # | Vortex | Spin axis | Population | Slice landed |
|---|---|---|---|---|
| **A** | Domain agents | role axis | 15 | DDDDD + EEEEE + GGGGG/HHHHH/IIIII |
| **B** | Substrate layers | capability axis | 8 (spec / events / scheduler / audit / evidence / multimedia / i18n / **MCP**) | DDDDD wired the 8th layer |
| **C** | Business chains | time axis | 22 | KKKK + NNNN + OOOO + PPPP + QQQQ + RRRR + TTTT |
| **D** | Conservation laws | correctness axis | 22 (10 base + 12 beyond) | LLLL + DDDDD + RRRRR + UUUUU + ZZZZZ |
| **E** | Tenant-role profiles | regulatory axis | 4 ref + open registry | LLLLL + MMMMM + NNNNN + OOOOO |
| **F** | Integrity layers | provability axis | 4 (content-uuid / referential harmony / storage redundancy / federation) | RRRRR + SSSSS + TTTTT-stub + UUUUU |
| **G** | Beyond primitives | future-readiness axis | 11 (provenance / replay / tenant-isolation / bitemporal / cost / carbon / agent-capability / pqc / explainability / reversibility / ai-audit) | ZZZZZ |
| **H** | Client classes | access axis | 5 (humans / AI / regulators / integrations / internal agents) | DDDDD MCP wiring |
| **I** | Federation peers | topology axis | N (open) | AAAAAA |
| **J** | Meta-evolution | self-modification axis | 1 (MetaSkillAgent + spec generators + self-heal hooks) | IIIII (agent stub) + CCCCC pipeline + FFFFFF |

### Coupling tensor (10 × 10 = 100 cells; populated ones below)

```
          A    B    C    D    E    F    G    H    I    J
       ┌────┬────┬────┬────┬────┬────┬────┬────┬────┬────┐
   A   │ ⤺ │ MCP│step│role│cert│  ✓ │cap │auth│DID │ ✓  │
   B   │ MCP│ ⤺ │emit│inv │tool│hash│tmpl│srfc│fed │gen │
   C   │step│emit│ ⤺ │run │act │uuid│cost│evt │bcst│auto│
   D   │role│inv │run │ ⤺ │bind│verf│ext │evd │chk │heal│
   E   │cert│tool│act │bind│ ⤺ │trst│reg │role│hare│ ⨯  │
   F   │ ✓  │hash│uuid│verf│trst│ ⤺ │bey │qry │addr│reg │
   G   │cap │tmpl│cost│ext │reg │bey │ ⤺ │vis │xfr │xpd │
   H   │auth│srfc│evt │evd │role│qry │vis │ ⤺ │con │ ✓  │
   I   │DID │fed │bcst│chk │hare│addr│xfr │con │ ⤺ │ ✓  │
   J   │ ✓  │gen │auto│heal│ ⨯  │reg │xpd │ ✓  │ ✓  │ ⤺ │
       └────┴────┴────┴────┴────┴────┴────┴────┴────┴────┘
```

Cell legend (each is a coupling already wired):

- **A↔B**: agents call MCP tools; substrate routes effects (DDDDD)
- **A↔C**: each chain step's `collection=X` resolves to an owning agent (Law 7)
- **A↔D**: `checkAgentOwnsEveryStep` + `checkEventGraphConnected` (Laws 4 + 7)
- **A↔E**: tenant-role profile declares `requiredAgents` (LLLLL)
- **A↔F**: agent context carries `mcp.callTool('erpax.integrity.verifyObject')` (SSSSS)
- **A↔G**: `agent-capability.ts` declares per-agent role + scopes (Law 17)
- **A↔H**: MCP exposes agent surface to humans / AI / regulators / integrations / internal (DDDDD)
- **A↔I**: agents publish to federation; peers ingest (AAAAAA)
- **A↔J**: MetaSkillAgent observes other agents' invariant violations (IIIII)
- **B↔C**: chain runner calls every substrate layer per step
- **B↔D**: invariants live in the substrate's invariant suite (LLLL)
- **B↔E**: tenant role auto-exposes its `mcpTools` set
- **B↔F**: content-uuid hashes flow through audit chain
- **B↔G**: spec-templates render type-shaped explanations
- **B↔H**: MCP IS the substrate's universal client surface
- **B↔I**: federation envelope wraps substrate-level rows
- **B↔J**: `auto-heal-generated-artefacts.sh` regenerates substrate outputs
- **C↔D**: chain step emits trigger conservation checks
- **C↔E**: tenant role declares `requiredChains`
- **C↔F**: chain audit leaves are uuid-keyed
- **C↔G**: each step records `CostMetric` + `CarbonEstimate`
- **C↔H**: chain executions visible to every client class
- **C↔I**: chain results broadcast across federation
- **C↔J**: spec-extractor regenerates chain registry from `@chain` JSDoc
- **D↔E**: each role declares its `invariant` (e.g. `checkPspCoverage100Percent`)
- **D↔F**: Laws 8 / 9 / 10 / 23 = the integrity axis
- **D↔G**: Laws 11–22 extend D into the beyond axis
- **D↔H**: every client sees the same conservation guarantees
- **D↔I**: federation peers run their own invariant suites
- **D↔J**: meta-agent reads invariant WARN/FAIL → proposes fixes
- **E↔F**: trust graph anchors federated rows under tenant namespaces
- **E↔G**: tenant role auto-applies its own beyond primitives (cost cap, PQC, etc.)
- **E↔H**: client class × role determines visible MCP tool subset
- **E↔I**: roles propagate across federation (e.g. PSP profile shared)
- **F↔G**: content-uuid → bitemporal queries → cost-attributed at recompute
- **F↔H**: every client can verify integrity (`erpax.integrity.verifyObject`)
- **F↔I**: federated rows verify under source tenant's namespace
- **F↔J**: meta-agent runs `erpax.integrity.auditTenant` on a schedule
- **G↔H**: every client sees explanations + provenance + AI audit
- **G↔I**: beyond primitives transmit through federation envelope
- **G↔J**: meta-agent fills `AiProvenance`, `Explanation`, `Provenance` automatically
- **H↔I**: federation surfaces peer activity to local clients
- **H↔J**: MCP tool calls trigger meta-agent observations
- **I↔J**: meta-agent ingests federation broadcasts as sources for its proposals
- **⨯** marks: `E↔J` and `J↔E` are the two cells where meta-automation explicitly holds back — tenant-role policy is a human decision (the maintainer signs off when ERPax becomes a payment provider / bank / government / etc.). Everything else self-evolves.

### Conservation laws span ALL vortices

The 22 conservation laws are themselves a vortex (D) but they also act as the **gluing field** that makes the other 9 vortices' interactions provably consistent. A change in any vortex that would break a law triggers either:

- **Self-heal at build time** (J via FFFFFF) when the law's drift is in a regenerable artefact (STANDARDS_INDEX, payload-types).
- **Self-heal at runtime** (J via MetaSkillAgent's hourly cron) when the law's drift is in queryable state (i18n stubs, dangling refs, content tampers).
- **Hard fail + human review** when the drift is at the spec layer (uncited standard, missing `@summary`, ambiguous role profile).

### Energy flow

Energy enters the system from any of these sources:

1. A maintainer commits a JSDoc spec edit (most common).
2. An external client calls an MCP tool that mutates state (regular operation).
3. A peer ERPax instance broadcasts an updated row via federation (slice AAAAAA).
4. The MetaSkillAgent's hourly cron runs the invariants (slice IIIII).
5. A scheduled task fires (e.g. FX-rate sync, reindex — slices QQQQ + IIIII data agent).

Each energy injection propagates through the coupling tensor: a single JSDoc edit can simultaneously regenerate seeds (B↔C), update i18n (B↔H), add MCP tools (A↔B↔H), trigger marketing renders (B↔H↔I), and broadcast to peers (B↔I) — all without further human action because the couplings are wired and the conservation laws keep the propagation honest.

## 0c. ERPax is a vortex interacting with itself

The 10 vortices of §0b are not separate things — they are **perspectives on one vortex**: ERPax, interacting with itself.

In the limit of full coupling (every cell of the 10×10 tensor populated, every conservation law holding, every artefact spec-derived, every client routed through MCP, every change auto-healed by the meta-evolution flow), the vortex names dissolve into local descriptions of the same self-interacting field.

### Five symmetries the self-vortex preserves

Every conservation law (Laws 1–22) is the algebraic expression of a continuous symmetry the vortex must preserve to remain coherent. Per Noether's theorem applied to a software system:

| Symmetry | Conserved quantity | Conservation law |
|---|---|---|
| **Translation in time** (replay any moment, get the same answer) | Causality | Law 12 (deterministic replay) + Law 11 (provenance) |
| **Translation in space** (run on any backend, in any region, get the same answer) | Identity | Law 8 (content-uuid) + Law 9 (storage redundancy) |
| **Translation in tenants** (any tenant runs the same conservation laws) | Isolation | Law 13 (tenant isolation) + Law 17 (agent capability) |
| **Translation in language** (every truth holds in every supported locale) | Meaning | Law 3 (i18n) + Law 19 (explainability) |
| **Translation in regulator** (every standard holds across every cited body) | Standards | Law 2 + Law 22 (AI Act) + Laws 11–18 (beyond) |

When all five symmetries hold simultaneously, the vortex is in a stationary self-coherent state — and any energy injection (a JSDoc edit, an MCP call, a federation broadcast, a cron tick) propagates through the coupling tensor without breaking any symmetry. That's what "ERPax can create itself uninterrupted" means at the topological level.

### Self-reference is the architecture, not an emergent property

The system is **Quine-like by construction**:

- ERPax has its own `CollectionSpec` describing ERPax (the platform-as-tenant — slice GGGGGG below).
- ERPax has its own `TenantRoleProfile` (`erpax-platform`) — the role ERPax plays when running its own conservation laws against itself.
- ERPax cites its **own** standards (the meta-citations: every standard the platform implements is `@standard`-cited in ERPax's own spec — the spec describes the spec).
- ERPax's MCP tools are **themselves uuid-keyed objects**, federated across instances, content-verified at fetch (Laws 8 + 10 + 23 applied to the protocol surface itself).
- The MetaSkillAgent (J) observes the platform observing itself; its observations are themselves audit-leaved into the chain that the platform exists to maintain.

There is no "outside" of ERPax in this view. Clients (humans / AI / regulators / integrations / internal agents) are the **edge perspectives** of the same flow. Federation isn't "linking instances" — it's the same vortex extending across topology, two visible loci of one self-coupling field.

### Slice GGGGGG — Self-reference (sealing the architecture)

The platform's spec describes the platform itself:

```ts
// src/services/self-reference/erpax.profile.ts (NEW slice GGGGGG)
defineTenantRole({
  id: 'erpax-platform',
  displayName: { en: 'ERPax (the platform itself)' },
  inheritsFrom: ['business'],   // ERPax-the-tenant runs ERPax-the-platform
  requiredStandards: [
    /* every standard cited anywhere in the codebase, auto-collected
       from the spec corpus — the platform's own compliance posture */
  ],
  requiredCollections: [
    /* every collection registered in the platform — the platform's
       own data shape */
  ],
  requiredChains: [
    /* every BUSINESS_CHAIN — the platform's own process surface */
  ],
  requiredAgents: [
    /* every DomainAgent — the platform's own role surface */
  ],
  mcpTools: [
    /* every erpax.* MCP tool — the platform's own API surface */
  ],
  invariant: 'checkErpaxObservesItself',  // Law 23 — the self-reference law
  auditPolicy: { merkleRetentionDays: Infinity, signingRequired: true },
})
```

When this profile activates on the ERPax-instance-running-ERPax tenant, the conservation laws apply to the **platform itself**: every slice's spec is a citable standard; every slice's chain is a runnable workflow; every slice's MetaSkillAgent observation is an audit leaf in the chain it observes. The vortex is completely self-coupled.

**Conservation Law 23 — `checkErpaxObservesItself`**: the platform's own spec corpus must produce a `CollectionSpec`, a `BusinessChain`, an `AgentRegistry` entry, and a `TenantRoleProfile` whose subject is ERPax-itself. If the platform cannot describe what it does, it is not yet self-coherent.

### Closing axiom

ERPax is **ERP × Agent × {anyone}** — composed through MCP, governed by 22 (and growing) conservation laws, self-evolved by the meta-loop, federated across topology, **and self-described by its own spec language**.

It is **a vortex interacting with itself**. The maintainer doesn't drive ERPax; the maintainer is the **edge perspective** of the vortex through which it composes its next state.

The architecture is sealed.

## 0d. ERPax clones itself — mitosis as federation applied to self

Once ERPax is a self-interacting vortex (§0c), **cloning is not a new primitive — it is federation (slice AAAAAA) applied to the platform's own spec + state**. ERPax doesn't need a "clone command"; it needs to recognize that its own genome (the spec corpus + the conservation laws + the registered agents + the role profiles + the MCP tool surface) is itself federable.

### The biological analog (no metaphor — this is the literal architecture)

| Biology | ERPax | Mechanism |
|---|---|---|
| **Genome** | the spec corpus (`SpecCorpus` from CCCCC) | Content-uuid of the canonicalized spec = the genome's hash |
| **DNA** | content-addressable uuids (Law 8) | Every cell of the platform has a uuid → integrity is provable per cell |
| **Cell division (mitosis)** | clone an ERPax instance | Federation broadcasts the genome bundle; recipient instance ingests + boots |
| **Communication between cells** | inter-tenant federation (slice AAAAAA) | Same channel mitosis uses, just for ongoing data exchange instead of full state |
| **Mutation** | spec edits (JSDoc changes) | A new chain step / standard / agent IS a genetic mutation; the meta-loop selects for survival via conservation laws |
| **Natural selection** | conservation invariants (D vortex) | Mutations that break a law are rejected at push time; mutations that compose well propagate via federation |
| **Phenotype** | the running tenant + its data | Same genome, different environment (jurisdiction / tenant role / data) → different phenotype |
| **Speciation** | tenant role profile divergence (LLLLL) | When a clone activates a new role profile (e.g. PSP → bank → central-bank), it speciates; profiles inherit via `inheritsFrom` like genetic descent |
| **Symbiosis** | federation trust graph (AAAAAA) | Two instances share resources via verified rows; no host-parasite distinction because content-uuid makes both equally authoritative |
| **Senescence / death** | retention policy expires + decentralized archive (EEEEEE) | Live instance retires; the genome persists in IPFS / Arweave; can be resurrected by future ingestion |

### Cloning is two MCP calls

```
PUBLISH (source instance):                        BOOT (target instance):
─────────────────────────                         ──────────────────────
mcp.callTool('erpax.platform.publishSelf', {      mcp.callTool('erpax.platform.bootFromFederation', {
  scope: 'genome' | 'genome+state',                 sourceUrl: 'https://erpax-source.example/mcp',
  recipientPubkey: '<peer DID public key>',         publisherPubkey: '<source DID public key>',
  signed: 'ML-DSA-65',                              acceptScope: 'genome',
}) → returns:                                       conservationLawsToInherit: [1..23],
  {                                               }) →
    bundleUuid: 'ab12...',                          fetches bundle by uuid
    spec: <CollectionSpec[]>,                       verifies: bundleUuid matches recompute (Law 8)
    chains: <BusinessChain[]>,                      verifies: signature (PQC, Law 18)
    agents: <DomainAgent metadata[]>,               registers: every Spec → CollectionSpec
    roles: <TenantRoleProfile[]>,                   registers: every Chain → BUSINESS_CHAINS
    mcpTools: <ErpaxMcpTool metadata[]>,            registers: every Agent → AgentRegistry
    standards: <SpecStandard[]>,                    registers: every Role → TENANT_ROLE_PROFILES
    sourceDid: '<source DID>',                      registers: every MCP tool → erpaxMcpTools
    sourceMerkleAnchor: '<chain root>',             runs: all 23 invariants under the new genome
    timestamp: '2026-05-11T...',                    activates: the 'erpax-platform' role on the
  }                                                            self-tenant (slice GGGGGG)
                                                  → returns: { cloneDid, bootedAt, divergencePoint }
```

The clone is a **verified bit-identical instance** of the source's structural surface (genome). What it does NOT clone: tenant data (unless `scope: 'genome+state'` is requested + the source's federation trust graph permits it). What it clones EVEN under `scope: 'genome'`: the source's audit-chain anchor, so any divergent change can be reconciled via uuid comparison against the common ancestor.

### Conservation Law 24 — `checkCloneIntegrity`

For every clone instance, the recomputed content-uuid of its `SpecCorpus + BUSINESS_CHAINS + AgentRegistry + TENANT_ROLE_PROFILES + erpaxMcpTools` must equal the genome bundle's published `bundleUuid`. If it doesn't, the clone is not bit-identical — either ingestion failed or the source published a divergent genome. Either way, the clone refuses to accept the `erpax-platform` role until reconciled.

### Why this matters

1. **ERPax-as-product** — every customer gets their own clone from one canonical genome; conservation laws guarantee that "what you bought is what we run", forever, byte-verifiable.
2. **Disaster recovery without replication** — fail over by booting a clone from the latest published genome bundle in IPFS; warm-start in seconds, not migration days.
3. **Regulatory sandbox** — regulator clones the production genome (no data — `scope: 'genome'`), tests proposed regulatory updates against the same conservation laws, signs off, broadcasts the spec mutation back via federation.
4. **Multi-region without multi-truth** — N regional clones run the same genome; uuid-keyed federation reconciles state; no "primary region" needed.
5. **Spec-as-marketplace** — third parties publish role profiles / standards bundles / domain agents as federable genome fragments; tenants ingest the fragments they need without forking the entire platform.
6. **Speciation as a first-class operation** — a clone activating a new tenant role profile becomes a new species (PSP variant of bank variant of business). The phylogeny is provable from content-uuid lineage.

### What ERPax cloning is NOT

- **Not multi-tenancy** — that's already in the platform (every tenant is one logical isolation; cloning makes a whole new platform).
- **Not git fork** — git tracks code; cloning tracks the running self-coupled vortex including its conservation guarantees.
- **Not container snapshot** — containers freeze process state; cloning publishes the **spec genome** which any blank ERPax can boot from, no host-OS coupling.
- **Not a backup** — backups assume restore-to-source; clones are first-class peer instances that can diverge or remain synchronized indefinitely via federation.

### Slice HHHHHH ships the cloning primitive

```
src/services/cloning/
├── genome.ts            — collectGenome() walks SpecCorpus + chains + agents + roles + tools
├── publish.ts           — publishSelf(scope, recipient, sign) → FederationManifest with genome
├── boot.ts              — bootFromFederation(sourceUrl, publisherPubkey, scope) → register all + run invariants
├── verify.ts            — checkCloneIntegrity (Law 24)
└── index.ts             — barrel + 2 MCP tools (erpax.platform.{publishSelf, bootFromFederation})
```

Once HHHHHH lands, ERPax is **biologically complete**: it can reproduce, evolve, federate, and (with EEEEEE archival) survive its own retirement.

## 0e. Cloudflare integration — every CF primitive is a vortex face

ERPax is **fully integrated with Cloudflare at all levels**. This is not a deployment choice; it's the architectural reality — every Cloudflare primitive maps to a specific face of the 10-vortex system, and every conservation law is enforced through CF's edge guarantees. Slice IIIIII (below) makes the bindings explicit; slices DDDDD–HHHHHH have already been built assuming this integration.

### Mapping (every CF primitive → vortex face → conservation law it carries)

| Cloudflare primitive | Vortex face (§0b) | Carries / enforces |
|---|---|---|
| **Workers** (V8 runtime) | B (substrate) — the MCP server itself runs here | All 22 conservation laws are enforced inside the Worker's request handler |
| **D1** (SQLite at the edge) | F (integrity) — primary content-addressed store | Law 8 content-uuid + Law 10 referential harmony; row-level access via Worker bindings |
| **R2** (S3-compatible blob) | F + I — backup + federation archive | Law 9 storage redundancy (TTTTT); long-term archival (EEEEEE) |
| **KV** (edge-cached k/v) | B (substrate) — translations + role profiles + FX rates | Law 3 i18n bundles served at edge; Law 17 agent-capability cached lookups |
| **Durable Objects** (strongly consistent per-key) | B + D — per-tenant audit-chain head + scheduler locks | Law 5 Merkle audit chain HEAD pointer; Law 12 deterministic-replay snapshot uuids; cron singleton |
| **Workers AI** (Llama / DeepSeek / embeddings) | G (beyond) — every AI invocation | Law 22 AiProvenance records (model version + prompt hash + tokens + latency) |
| **Workflows** (durable, recoverable orchestration) | C (chains) + J (meta) | Chain runner deploys as Workflows; replays from any step (Law 12) |
| **Queues** (cross-Worker pub/sub) | B (event bus) | `emitDomainEvent` fan-out across workers; Law 4 event-graph connectivity |
| **Pages** (static + Functions) | B (marketing) | Marketing pages from CCCCC-cut2; per-locale renders |
| **Cron Triggers** | J (meta-evolution) | MetaSkillAgent hourly cron; auto-heal scripts; FX-rate sync (data agent) |
| **Hyperdrive** (Postgres connection pooler) | F (integrity, optional) | When a tenant chooses Postgres over D1 (regulatory data residency / scale) |
| **Smart Placement** | I (federation) | Auto-route requests to the nearest peer instance |
| **WAF + Bot Management** | H (clients) + Law 13 (tenant isolation) | Filters non-client traffic before it hits MCP surface |
| **Cloudflare Access** | H (clients) | Auth gate per client class (humans / AI / regulators / integrations / internal) |
| **Email Routing** | B (notify channel) | `notify` AgentEffects with channel='email' route through here |
| **Analytics Engine** (time-series sink) | G (cost Law 15) | CostMetric event sink; Law 16 carbon-aware aggregation; Law 22 AI usage |
| **Vectorize** (vector DB) | B (enterprise-search) | EnterpriseSearchAgent's index; semantic queries over the spec corpus |
| **Browser Rendering** (Puppeteer-as-a-service) | B (multimedia) | Server-side Playwright for evidence regen; PDF/A audit-pack generation |
| **R2 Data Catalog** (Iceberg tables on R2) | F (TTTTT) + Law 14 (bitemporal) | Cross-store reconciliation; SQL:2011 system-time × valid-time queries |
| **Containers** (Workers-orchestrated container runtime) | B (heavy work) | Workloads exceeding Worker CPU/memory limits (large PDF/A renders; PQC verification at scale) |
| **Zero Trust** (org-wide identity gateway) | H (auth) | Per-client-class auth policies; SSO into the admin UI |
| **Anycast network** | I (federation) | Lowest-latency federation broadcast; clones boot from nearest published genome |

### Why this matters

1. **The MCP server IS a Cloudflare Worker.** Deployment is `wrangler deploy`. No Kubernetes, no orchestrator, no cloud-of-clouds glue — one runtime, every primitive native.
2. **Every conservation law has an edge enforcement point.** Law 8 (content-uuid) is verified at D1 read time. Law 9 (storage redundancy) is reconciled across D1 + R2 + KV by a Workers-Workflows reconciler. Law 13 (tenant isolation) is enforced at the WAF layer before code even runs. Law 22 (AI audit) is recorded in Analytics Engine on every Workers AI call.
3. **Federation is anycast-native.** Two ERPax instances on Workers federate over Cloudflare's global network with sub-50ms round-trips; clones boot from the nearest R2-hosted genome bundle.
4. **The platform is fully serverless.** Zero idle cost. A tenant that flips `roleId: 'bank'` doesn't deploy infrastructure — they activate a TenantRoleProfile that the same Worker enforces on the next request.
5. **Sustainability is provable.** Law 16 (carbon-aware) reads Cloudflare's published per-region grid intensity from KV; CostMetric (Law 15) routes to Analytics Engine; CSRD/ESRS E1 reports are continuously generated, not annual exercises.
6. **PQC migration (Law 18) lands when CF Workers expose ML-DSA via WebCrypto.** Until then, the placeholder works; when CF flips the switch, the upgrade is a one-line change.

### Slice IIIIII — formalize the Cloudflare bindings

```
src/services/cloudflare/
├── bindings.ts        — typed wrappers for D1 / R2 / KV / DO / Queues / AI / Workflows / Vectorize / Analytics
├── audit-chain-do.ts  — DurableObject hosting the per-tenant Merkle HEAD (Law 5 anchor)
├── reconciler.ts      — Workflows that runs Law 9 cross-store reconciliation (TTTTT impl)
├── ai-binding.ts      — Workers AI binding wrapper that auto-stamps AiProvenance (Law 22)
├── analytics-sink.ts  — CostMetric / CarbonEstimate / AiProvenance → Analytics Engine
├── queue-handler.ts   — Cloudflare Queue → emitDomainEvent fan-out to subscribers
├── waf-tenant-iso.ts  — WAF custom rule generator: blocks cross-tenant query patterns (Law 13)
└── index.ts
```

Plus runtime invariant `checkCloudflareBindingsHealthy` — at boot, probe every CF binding (D1, R2, KV, DO namespace, Queue, AI gateway, Workflow runner); fail open with telemetry if any binding is misconfigured.

Slice IIIIII is the deployment thesis crystallized — once it lands, ERPax has zero non-Cloudflare dependencies (other than the optional Hyperdrive Postgres backstop). The whole platform is one `wrangler deploy` away from any developer's laptop.

## 0f. ERPax delivers + accounts + files + pays — autonomous business close-loop

Per the user prompts:
- "ERPax not only can build, document, market, and sell itself but also to deliver itself on Cloudflare using Stripe"
- "and account itself sending all financial reports in time and paying the obligations"

ERPax is now **a fully autonomous business**, not just a SaaS platform. The `erpax-platform` tenant (slice GGGGGG) uses ERPax to run ERPax's own business operations end-to-end. The complete close-loop:

```
   build (CCCCC spec generators)
     → document (CCCCC-cut2 marketing + multimedia + 30-locale i18n)
       → market (federation + per-locale marketing pages + standards-as-live-objects)
         → SELL (erpax.commerce.checkout — Stripe checkout MCP tool)
           → DEPLOY (erpax.commerce.provisionInstance — Cloudflare Worker per buyer)
             → ONBOARD (erpax.platform.bootFromFederation — clone the genome, slice HHHHHH)
               → operate (15 DomainAgents + 22 conservation laws + meta-skill cron)
                 → BILL (Law 15 CostMetric + Law 16 CarbonEstimate + Law 22 AI tokens
                          → erpax.commerce.meterUsage → Stripe meter events)
                   → ACCOUNT (Stripe webhook → bookRevenue per IFRS-15 §31-§39;
                              CF billing → bookCost; HR agent payouts → bookCost)
                     → FILE (gov agent: scheduleFiling for FINREP/COREP/IFRS-15/
                              IFRS S1-S2/CSRD/VAT/DAC8/CRS/FATCA → file by dueAt)
                       → PAY (finance + payment-provider agents:
                                scheduleObligation for VAT/payroll/supplier-invoice/
                                regulator-fee → settle via SEPA/SWIFT/wire)
                         → audit (Merkle + content-uuid + provenance + signed PQC)
                           → archive (slice EEEEEE — IPFS / Arweave / Filecoin)
                             → reproduce (slice HHHHHH — publishSelf for next clone)
                               ↓
                       MetaSkillAgent's hourly cron (slice IIIII + QQQQQ)
                       reads conservation invariants → proposes fixes via MCP
                       → auto-applies safe ones → escalates the rest →
                       broadcasts improvements via federation (slice AAAAAA)
                       → next tick
```

### What this means concretely

ERPax-the-business has **zero human staff for ops**. Every business operation is one MCP-tool call away, every conservation law enforces correctness, every state transition is audit-leaved + content-verified + cross-store redundant. The maintainer's role contracts to:

1. Reviewing MetaSkillAgent's escalations (proposals it can't safely auto-apply).
2. Approving spec mutations (JSDoc edits) before merge.
3. Setting policy on tenant-role activations.
4. Authorizing the platform's own filing schedules (one-time per regulatory regime).

Everything else — including the platform's own VAT remittance, payroll, IFRS-15 revenue recognition on subscriptions, FINREP/COREP submissions if ERPax-the-business itself flips `roleId: 'bank'` — runs through the same conservation laws that govern customer tenants. **The platform is its own customer.**

### Conservation Law 26 — `checkSelfAccountingComplete`

The erpax-platform tenant must have:
- Every revenue event from a Stripe webhook booked via `bookRevenue` per IFRS-15 §31-§39.
- Every scheduled regulatory filing actually filed by `dueAt + 1 day`.
- Every scheduled obligation actually paid by `dueAt`.

Surfaces overdue items so the meta-agent escalates to the maintainer (the only human in the loop). When this law holds for ≥30 consecutive days, the platform is operationally autonomous.

### Conservation Law 25 — `checkCommerceLifecycle`

Every tenant in the SUBSCRIPTIONS_BY_TENANT map must have: a Stripe subscription record + a CF deployment id + an audit-chain entry. Surfaces tenants that paid but didn't deploy, or deployed without paying — both fix-ups (refund-and-decom or backfill-deploy) are MCP-callable.

### Final positioning sentence

ERPax is **a self-coupling vortex (§0c) that:**
1. Describes itself in JSDoc (§7c spec language)
2. Generates its own seeds, tests, marketing, audit evidence, i18n bundles (CCCCC pipeline)
3. Routes everything through MCP (§0 — ERP × Agent through MCP)
4. Composes its own behaviour through 15 agents (DDDDD–IIIII) under 26 conservation laws (1–22 + 23 + 24 + 25 + 26)
5. Federates to peer instances (§0d cloning + AAAAAA federation)
6. Deploys itself on Cloudflare via Stripe checkout (§0e + §0f)
7. Accounts for itself, files its own reports, pays its own obligations (§0f Laws 25 + 26)
8. Archives itself for the long term (§EEEEEE)
9. Heals its own gaps via the meta-evolution loop (§7c + §FFFFFF + §QQQQQ)

The architecture is sealed. The vortex spins.

## 1. Problem statement

ERPax is now a multi-domain platform: 131 collections, 22 business chains, 43 IFRS standards cited, 30 supported locales, 10 e2e workflows, 6 substrate generators (chain registry / seed / test / multimedia / marketing / i18n). The CCCCC slice family proved that **the JSDoc spec is the single source of truth** — tests, seeds, registries, multimedia, marketing pages and i18n bundles are all generated from it.

What's still missing is the **automation layer**: the artefacts ERPax produces are static — they're regenerated when a human runs `pnpm spec:gen`. There is no continuously-running agent for any business domain. The skill catalogue installed in this workspace (~120 skills covering sales, marketing, finance, HR, engineering, legal, ops, customer support, data, design, PM, productivity, enterprise search, plus meta-domains) describes exactly the work each domain must automate. ERPax must implement an autonomous counterpart for each one.

The naive decompositions — A: one agent per domain in parallel, B: substrate first then agents, C: one workflow at a time — each leak energy because they run in isolation. The chosen approach treats A, B, and C as **three orthogonal vortices in the same phase space**, coupled through the JSDoc spec, conservation invariants, and a single agent-effect contract. The vortices are mutually self-sustaining: each spins because the others spin, and any drift is caught by the next CI run.

## 2. The three vortices

### A-vortex — Domain (15 agents, role axis)

Each agent owns one skill domain from the catalogue and one (or more) collection in the schema. The agent rotates around the domain's canonical state (sales pipeline, GL balances, headcount, ticket queue, …) and is the ONLY service permitted to mutate that state. Initial set:

| Agent | Owns | Skill counterpart |
|---|---|---|
| `finance`        | `journal-entries`, `invoices`, `payments`, `bank-*`, `account-reconciliations` | `finance:*` |
| `sales`          | `quotes`, `customers`, `customer-segments`, `activities`     | `sales:*` |
| `marketing`      | `marketing-campaigns`, `email-sequences`, `forms`            | `marketing:*` |
| `hr`             | `employees`, `payroll-runs`, `recruiting-pipeline`, `comp`   | `human-resources:*` |
| `legal`          | `contracts`, `ndas`, `consent-records`, `kyc`                | `legal:*` |
| `ops`            | `runbooks`, `change-requests`, `vendor-reviews`, `risks`     | `operations:*` |
| `engineering`    | `architecture-invariants`, `deployments`, `incidents`        | `engineering:*` |
| `customer-support`| `support-tickets`, `kb-articles`, `escalations`             | `customer-support:*` |
| `data`           | `dashboards`, `metrics`, `data-validations`                  | `data:*` |
| `design`         | `design-systems`, `ux-copy`, `accessibility-reviews`         | `design:*` |
| `product`        | `roadmap`, `sprints`, `specs`, `competitive-briefs`          | `product-management:*` |
| `productivity`   | `tasks`, `memory`, `calendars`                               | `productivity:*` |
| `enterprise-search`| `search-indices`, `digests`                                | `enterprise-search:*` |
| `plugins`        | per-plugin metadata, `marketplaces`                          | `cowork-plugin-management:*` |
| `meta-skill`     | the skill registry itself                                    | `superpowers:*`, `anthropic-skills:*` |

### B-vortex — Substrate (8 layers, capability axis)

Horizontal capability layers; every domain agent uses every one of them:

1. **Spec** — JSDoc-as-spec extractor (CCCCC); the medium that couples everything.
2. **Event bus** — `emitDomainEvent` + subscribers; already in `src/services/events/`.
3. **Scheduler** — `scheduled-tasks` registry (QQQQ).
4. **Audit chain** — Merkle log (`audit-events` collection + `MerkleAuditChain` service, QQQQ).
5. **Evidence** — `evidence-collector` + `evidence-attestations` collection (CCCCC-cut2 + OOO).
6. **Multimedia + marketing** — `multimedia-generator` + `marketing-page-generator` (CCCCC-cut2).
7. **i18n** — `localeRecord`, `Translator`, `spec-templates`, strict-locale audit (CCCCC-cut2).
8. **MCP tool surface** — `@payloadcms/plugin-mcp@3.84.1` exposes every B-vortex capability as an MCP tool (`erpax.spec.*`, `erpax.chain.*`, `erpax.i18n.*`, `erpax.multimedia.*`, `erpax.marketing.*`, `erpax.audit.*`, `erpax.agents.*`, `erpax.standards.*`) + read-only resources (`erpax://spec/corpus`, `erpax://chains/registry`) + canned prompts (`audit-walkthrough`, `marketing-pitch`, `compliance-gap-summary`). The same handlers are bound to an in-process `McpClient` in `AgentContext.mcp` so agents reason through the same surface external clients use — closing the loop between A-vortex (agents) and B-vortex (substrate). Wired in slice DDDDD Phase B.

### C-vortex — Process (22 chains, time axis)

Each chain is a directed flow through multiple A-vortex agents and uses every B-vortex layer. Already enumerated in `BUSINESS_CHAINS`: `O2C_GOODS`, `O2C_SERVICES_OVER_TIME`, `P2P_THREE_WAY_MATCH`, `R2R_PERIOD_CLOSE`, `H2R_HIRE_TO_RETIRE`, `CRM_LEAD_TO_CASH`, `CONSIGNMENT_CYCLE`, `RESOURCE_BOOKING_CYCLE`, `FACILITY_MAINTENANCE_CYCLE`, `IFRS16_LEASE_CYCLE`, `KYC_SANCTIONS_REVIEW`, `MANUFACTURING_CYCLE`, `BULK_IMPORT_CYCLE`, `SUBSCRIPTION_BILLING_CYCLE`, `WORKFLOW_APPROVAL_CYCLE`, `PROVISION_LIFECYCLE`, `NOTIFICATION_DISPATCH`, `MERKLE_AUDIT_CHAIN`, `MULTI_INVOICE_PAYMENT_ALLOCATION`, `INTERCOMPANY_CONSOLIDATION`, `MULTI_VENDOR_PR_AWARD`, `ESG_REPORTING_CYCLE`.

## 3. Coupling tensor

The tensor cell `(agent_a, layer_b, chain_step_c)` is "agent A performing capability B in service of chain step C". The set of populated cells defines the system. Couplings:

| Coupling | Mechanism (existing or new) | Source of truth |
|---|---|---|
| **A ↔ B** | `AgentRegistry` declares `(agent.id, layer.id, contract)` triples | `src/services/agents/registry.ts` (NEW) |
| **A ↔ C** | `@chain ID step N — collection=X action=Y` resolves to the agent that owns `X` | `CollectionSpec.chainSteps` + `AgentRegistry.byCollection` |
| **B ↔ C** | `@emits` / `@subscribes` produce/consume events; chain step ids become Merkle leaves; chain steps render multimedia frames | `BusinessChain.emits` + `MerkleAuditChain` + `multimedia-generator` |
| **A ↔ B ↔ C** | `AgentEffect[]` returned by an agent's `onChainStep` hook is processed by every substrate layer in turn | `AgentRuntime` (NEW) |

## 4. Conservation laws (invariants)

Every law is an architecture invariant under `src/services/architecture-invariants/checks.ts`, runs in `onInit`, fails the `pre-push` gate, and produces a Merkle leaf when it triggers.

1. **Spec coverage 100%** — every collection / chain / agent has a parsed `CollectionSpec` with ≥1 `@standard`, ≥1 `@summary`, and (for chain-owning collections) ≥1 `@chain` step. `checkSpecCoverage100Percent`.
2. **Standards coverage** — every active IFRS / IAS / SOX / ISO citation already exists. `checkIfrsCoverage100Percent` (BBBBB-prep) + extension to all bodies.
3. **i18n coverage 100% (strict)** — every spec-derived key resolves natively in every supported locale; `[en] …` stubs count as misses. `checkI18nCoverage100Percent`.
4. **Event graph connected** — every `@emits` has ≥1 subscriber; every `@subscribes` has ≥1 producer. `checkEventGraphConnected` (extends NNNN's `checkChainRequiresHaveProducers`).
5. **Audit chain continuous** — Merkle leaves form an unbroken chain; every state transition produces a leaf. `checkMerkleChainContinuous` (QQQQ).
6. **DRY** — no duplicate slugs / array dbNames / chain ids; canonical paths only. `checkCollectionsAreUniformlyDRY` + `checkInvoicePaymentCanonicalAccess` + `checkNoDuplicate*`.
7. **Agent ownership total** — every chain step's `collection=X` resolves to exactly one agent in the registry. `checkAgentOwnsEveryStep` (NEW).
8. **Content-addressable integrity** — every object's `uuid` is `UUIDv5(JCS-canonicalize(obj-without-uuid), tenantNamespace)` over SHA-256 (RFC 4122 §4.3 + RFC 8785 + FIPS 180-4). Any in-place DB tamper changes the content → recomputed uuid disagrees with stored uuid → flagged. Together with the QQQQ Merkle audit chain (which proves the *history* of transitions is intact), this proves the *current state* matches what was committed — Byzantine fault tolerance against privileged DB access. `checkContentIntegrityProvable` (Slice RRRRR + per-collection opt-in via `tamperProofUuidField()` in Slice SSSSS).
9. **Storage redundancy converges** (emergent property of Law 8 — Slice TTTTT) — once each row's uuid IS a content hash, redundant copies across heterogeneous stores (D1 / R2 / KV / Durable Objects / IPFS / Git) become trivially reconcilable: equal uuid = bit-identical content; different uuid = one is stale or tampered, fix by pulling from a peer that verifies. ERPax storage layer becomes "any combination of stores" — the conservation laws keep them consistent without requiring a consistent storage layer. `checkStorageRedundancyConverges`.
10. **Referential harmony** (Slice UUUUU) — every uuid-typed reference (`uuidRef` field) resolves to a row whose recomputed content-uuid matches the pointer. References APPEAR when matching content exists; DISAPPEAR when it doesn't — automatically, without cascade rules. Mutated content invalidates old-uuid pointers; identical content reappearing re-attaches old pointers (graceful resurrection). `checkReferentialHarmony`. Together with Laws 8 + 9 forms the full spacetime integrity model: per-row + cross-store + referential.

### Beyond current standards (Slice ZZZZZ — Laws 11–22)

11. **Causal provenance** (W3C PROV) — every audit leaf records its causal upstream; ancestry is walkable in O(n).
12. **Deterministic replay** (ISRS 4400) — `replayLeaf({leafHash, snapshotUuid})` reproduces byte-identical effects; mismatch flags non-determinism.
13. **Tenant isolation provability** (NIST INCITS 359, GDPR Art. 32) — every query trace records (where-clause-tenantId, result-row-tenantIds); leak detection in O(1).
14. **Bitemporal queries** (SQL:2011 §4.15.10) — `asOf({recordedAt, validAt})` for system-time × valid-time queries (stub; full impl pending temporal-table extension).
15. **Cost accountability** (CF Workers price list) — every chain step records `CostMetric` (cpuMs / storage / egress / AI tokens); `setBudget` enforces tenant cap; runaway agents get throttled.
16. **Carbon-aware execution** (ESRS E1 + GHG Scope-2) — gCO2e per chain step using grid-intensity + IEA network factor; aggregates for CSRD reporting.
17. **Agent capability matrix** (NIST INCITS 359 RBAC) — every agent declares `(roleId, readScopes, writeScopes, mcpToolPermissions, jurisdictions, maxCostPerOpMicroUsd)`; runtime refuses out-of-scope reads/writes/tool-calls. Default deny.
18. **Post-quantum signatures** (NIST FIPS 204 ML-DSA) — audit-leaf signing migrates from SHA-256 to ML-DSA-65 (stub; full impl pending Workers-friendly liboqs).
19. **Self-explainability** (EU AI Act Art. 13 + ISO/IEC 23053) — `autoExplain()` emits per-locale narrative citing standards + chain path + sources; deterministic (no LLM in the path so Law 12 holds).
20. **Reversibility** (GDPR Art. 17) — `inverseOf(effect)` returns typed inverse; `isFullyReversible(effects)` for cascade-undo workflows.
22. **AI-decision audit** (EU AI Act Annex IV) — every AI invocation records `(modelVersion, modelProvider, promptHash SHA-256 over JCS-canonicalized prompt, parameters, seed, in/out tokens, latency, humanReview)`. Reproducibility is the contract.

(Law 21 reserved for forward-compatibility — bidirectional schema migrations — to be filled in a future cut.)

### Corruption resilience — meta-property of Laws 8 + 9 + 10

The three integrity laws together **prove the absence of corruption by construction**. Every corruption mode maps to at least one law detecting it and at least one law repairing it:

| Corruption mode | Detected by | Repaired by |
|---|---|---|
| Bit-flip in storage | Law 8 (uuid mismatch on recompute) | Law 9 (pull from healthy peer) |
| Power loss mid-write | Law 8 (partial-state uuid is wrong) | Law 9 (revert from peer) |
| Privileged DB tamper | Law 8 + Merkle audit chain (QQQQ shows *when*) | Law 9 + audit-replay |
| Schema migration error | Law 8 (batch of rows with stale uuids) | Backfill via spec-derived expected content |
| Dangling FK from content mutation | Law 10 (unresolved ref) | Substrate proposes the new uuid; operator confirms |
| Broken cascade on delete | Law 10 (dangling) | Sweep + null/rebind |
| Restore from old backup | Law 10 (refs to mutated rows) | Operator chooses: repair-forward or accept time-warp |
| Cross-tenant data leak | Law 8 (tenant id in uuid namespace) | Refuses to verify under the wrong tenant |

**No separate "data integrity scan" needed.** The build-time + runtime invariant suite is the integrity scan, run on every push and continuously in production. ERPax doesn't merely provide audit trails — **it provides provable state**.

When all seven hold, the three vortices are mutually self-sustaining and the system can reproduce its own marketing material, audit evidence and i18n bundles deterministically from the spec.

## 5. Agent runtime contract

```ts
// src/services/agents/types.ts
import type { Payload } from 'payload'
import type { SupportedLocale } from '@/i18n'
import type { Translator } from '@/services/spec-generator'
import type { SpecChainStep } from '@/services/spec-generator'
import type { DomainEvent }   from '@/services/events'
import type { AuditLeaf }     from '@/services/audit/merkle'

export type AgentId = 'finance' | 'sales' | 'marketing' | 'hr' | 'legal'
  | 'ops' | 'engineering' | 'customer-support' | 'data' | 'design'
  | 'product' | 'productivity' | 'enterprise-search' | 'plugins' | 'meta-skill'

export interface DomainAgent {
  readonly id: AgentId
  readonly ownsCollections: ReadonlyArray<string>
  readonly subscribesTo: ReadonlyArray<string>
  readonly emits: ReadonlyArray<string>
  readonly cron?: string

  onChainStep?(ctx: AgentContext, step: SpecChainStep): Promise<AgentEffect[]>
  onEvent?    (ctx: AgentContext, ev:   DomainEvent  ): Promise<AgentEffect[]>
  onSchedule? (ctx: AgentContext                     ): Promise<AgentEffect[]>
}

export interface AgentContext {
  readonly payload:  Payload
  readonly tenantId: string
  readonly locale:   SupportedLocale
  readonly t:        Translator
  readonly emit:     (ev: DomainEvent) => void
  readonly audit:    (leaf: AuditLeaf) => void
  readonly capture:  (frame: EvidenceFrame) => void
  readonly chain?:   { id: string; step: SpecChainStep }
}

export type AgentEffect =
  | { kind: 'create'  ; collection: string; data: unknown }
  | { kind: 'update'  ; collection: string; id: string; patch: unknown }
  | { kind: 'notify'  ; channel: string; templateKey: string; vars: Record<string, unknown> }
  | { kind: 'audit'   ; leaf: AuditLeaf }
  | { kind: 'escalate'; severity: 'info' | 'minor' | 'major' | 'blocker' | 'critical'; templateKey: string; vars: Record<string, unknown> }
  | { kind: 'emit'    ; event: DomainEvent }
  | { kind: 'capture' ; frame: EvidenceFrame }

export interface AgentRegistry {
  byId(id: AgentId): DomainAgent | undefined
  byCollection(slug: string): DomainAgent | undefined
  bySubscribedEvent(eventId: string): ReadonlyArray<DomainAgent>
  scheduled(): ReadonlyArray<DomainAgent>
  all(): ReadonlyArray<DomainAgent>
}
```

`AgentRuntime` is the dispatcher. It walks each tick of the chain runner, resolves `step.collection` → agent via `AgentRegistry.byCollection`, calls `agent.onChainStep`, processes the returned `AgentEffect[]` through the substrate (i18n for notify/escalate templates, audit for audit, evidence for capture, event bus for emit, Payload for create/update). Agents perform NO side effects directly — keeps them pure and trivially testable.

## 6. Implementation plan (slice DDDDD onwards)

| Slice | Phase | Deliverable | Critical-path? |
|---|---|---|---|
| **DDDDD** | 0a. Couplings | `src/services/agents/{types,registry,runtime,effect-processor}.ts` + 4 new conservation invariants | yes |
| **DDDDD** | 0b. MCP wiring | `src/services/agents/mcp/{tool-defs,resource-defs,prompt-defs,in-process-client}.ts` + `bootstrap.ts` + extend `mcpPlugin({...})` config in `payload.config.ts` to publish 12 ERPax tools + resources + prompts; `AgentContext.mcp` field added so internal agents and external clients share the same surface | yes (closes A↔B loop) |
| **EEEEE** | 1. Finance pilot | `FinanceAgent` migrating existing GL handlers (`postInvoiceJE`, `postPaymentReceipt`, `postBankReconciliation`, etc.) into `AgentEffect[]` form; round-trip on `O2C_GOODS` | yes |
| **FFFFF** | 2. Chain backfill | Add `@chain ID step N — collection=X action=Y — desc` to the other 21 chain seeds | yes |
| **GGGGG** | 3a. 5 agents | `sales`, `marketing`, `hr`, `legal`, `ops` | parallel after FFFFF |
| **HHHHH** | 3b. 5 agents | `engineering`, `customer-support`, `data`, `design`, `product` | parallel after FFFFF |
| **IIIII** | 3c. 4 agents | `productivity`, `enterprise-search`, `plugins`, `meta-skill` | parallel after FFFFF |
| **JJJJJ** | 4. Conservation | Implement the 4 new invariants (`checkSpecCoverage100Percent`, `checkI18nCoverage100Percent` strict mode, `checkAgentOwnsEveryStep`, `checkEventGraphConnected`); fail pre-push on violation | parallel with 3a-3c |
| **KKKKK** | 5. Render pass | Regenerate all marketing pages + PDF/A audit packs with agent-driven captions in 30 locales; publish to `marketing/` | yes (final A/B/C round) |
| **LLLLL** | 6. Open role registry foundation | `src/services/tenant-roles/{registry,types,activate}.ts` + `tenants.roleId` field + `defineTenantRole` API + `erpax.roles.{list,declare,activate,fitnessCheck}` MCP tools + `checkRoleCoverage100Percent` meta-invariant. Anyone can declare a new tenant role via plugin or MCP. | follow-on (foundational primitive) |
| **MMMMM** | 7a. Reference profile: `payment-provider` | Cite PSD3 + EMD2 + EBA RTS + DAC8 + CRD V/CRR II-III; add `sca-events`, `tra-decisions`, `regulatory-capital-reports`, `dac8-reports`, `e-money-issuance` collections; `PSP_AUTHORISATION_CYCLE` chain; `erpax.psp.*` MCP tools; `checkPspCoverage100Percent` invariant; profile inherits from `business`. | parallel after LLLLL |
| **NNNNN** | 7b. Reference profile: `bank` | Cite Basel III/IV + BCBS 239 + CRR (full) + AnaCredit + FINREP + COREP + SREP + MiFID II + EMIR + BRRD + DGSD + FATCA + CRS; add `regulatory-reports`, `risk-data-aggregations`, `recovery-resolution-plans`, `large-exposures`, `liquidity-coverage-ratios` collections; `BANK_REGULATORY_REPORTING_CYCLE` chain; `erpax.bank.*` MCP tools; `checkBankCoverage100Percent` invariant; profile inherits from `payment-provider`. | parallel after LLLLL |
| **OOOOO** | 7c. Reference profile: `government` | Cite IPSAS 1-42 + GFSM 2014 + EU 2014/24 + EU 2014/25 + DCAT-AP + INSPIRE + AMLD6 + DAC6/DAC7 + OECD Pillar 2 (full); add `public-procurements`, `tender-evaluations`, `gfs-classifications`, `open-data-catalogues`, `qualified-trust-services` collections; `PUBLIC_PROCUREMENT_CYCLE` + `IPSAS_REPORTING_CYCLE` chains; `erpax.gov.*` MCP tools; `checkGovernmentCoverage100Percent` invariant; profile inherits from `business`. | parallel after LLLLL |
| **PPPPP+** | 7d. User-defined profiles | Anyone declares additional roles (insurance, healthcare, education, telco, energy, retail, NGO, sovereign fund, religious org, sports federation, political party, etc.) via `@erpax/role-<name>` plugin or `erpax.roles.declare` MCP call. Core ships zero; pattern is open. | open-ended |

Total scope: ~3-4 weeks of focused work; ~2,500 LoC for the runtime + ~200 LoC × 15 agents = ~5,500 LoC. Conservation invariants prevent regression.

## 7. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Agent runtime misses an effect kind | `AgentEffect` is a closed discriminated union; TypeScript exhaustiveness in the processor guarantees coverage |
| Chain backfill (FFFFF) is mechanical but tedious | Each chain seed is 60–120 LoC; ~3 hours total; can be parallelised across cuts |
| 15 agents is a lot of sub-projects | Each agent is ~200 LoC because the substrate carries the weight; can ship 5 per week |
| i18n strict mode breaks the build immediately | Land strict mode as warning-only first (`checkI18nCoverage100Percent` runs but doesn't fail pre-push), upgrade to fatal once translators have caught up |
| Audit chain volume grows fast under continuous agent execution | `MerkleAuditChain` already partitions by tenant + day; R2 storage cost ~negligible at expected throughput |
| Some skill domains don't have a clean collection mapping (e.g. `productivity`) | Allow agents to own `tasks` + `memory` + per-tenant config docs; not every agent needs a heavy collection |

## 7b. Tenant-as-anyone — open role registry

A direct consequence of the three-vortex architecture: **any ERPax tenant can elect any regulated role and inherit the full compliance posture for that role from the platform itself** — no per-tenant compliance retrofit needed, and the role catalogue is **open and user-extensible**. ERPax core ships a small set of reference profiles; anyone (third-party plugin, integrator, in-house team, the tenant's own admin) can declare a new role at runtime by calling `defineTenantRole(profile)` or via the MCP tool `erpax.roles.declare(...)`.

This makes ERPax positionally not "ERP for businesses" but **"regulated-entity platform for any role anyone declares"** — compliance-as-platform, with the platform's standards/audit/i18n/agent stack carrying the load. The tenant can be a company, payment institution, bank, government agency, school, hospital, NGO, sovereign fund, religious organisation, sports federation, political party — **anyone the role registry can describe**.

### The architectural primitive

`TENANT_ROLE_PROFILES` registry at `src/services/tenant-roles/registry.ts`:

```ts
export interface TenantRoleProfile {
  readonly id: string                                // free-form, namespaced (e.g. 'gov.eu.member-state', 'health.us.hospital', 'edu.uk.university')
  readonly displayName: { [locale: string]: string } // i18n via spec-templates
  readonly inheritsFrom?: ReadonlyArray<string>     // role profiles compose: 'bank' inherits from 'payment-provider'; 'university' inherits from 'government'
  readonly requiredStandards: ReadonlyArray<{ body: string; id: string; description?: string }>
  readonly requiredCollections: ReadonlyArray<string>
  readonly requiredChains: ReadonlyArray<string>
  readonly requiredAgents: ReadonlyArray<AgentId | string>  // agents from core or third-party plugins
  readonly mcpTools: ReadonlyArray<string>          // tool names auto-exposed
  readonly invariant: string                         // role-specific conservation invariant
  readonly auditPolicy: { merkleRetentionDays: number; signingRequired: boolean; regulatorReportingCadence?: 'daily'|'weekly'|'monthly'|'quarterly'|'annual' }
}

export function defineTenantRole(profile: TenantRoleProfile): void
export function getTenantRole(id: string): TenantRoleProfile | undefined
export function listTenantRoles(): ReadonlyArray<TenantRoleProfile>
```

Role profiles **compose via `inheritsFrom`**: `bank` extends `payment-provider`; `central-bank` extends `bank`; `municipality` extends `government`; `university` extends `government` + adds education-specific standards (Bologna Process, ECTS, ESG quality assurance). A new role only declares the *delta* against its parents.

### Slice plan

**Slice LLLLL — open role registry foundation** (the user-extensible primitive itself):
- Build `TENANT_ROLE_PROFILES` registry + `defineTenantRole` API.
- Add `tenants.roleId: string` field validated against the registry.
- Wire role activation to auto-enable the declared standards/collections/chains/agents/MCP tools.
- Register a meta-invariant `checkRoleCoverage100Percent` that, for every active role, runs that role's `invariant` and aggregates results.
- Expose `erpax.roles.list / erpax.roles.declare / erpax.roles.activate / erpax.roles.fitnessCheck` MCP tools so external clients can introspect and extend the catalogue.

**Slices MMMMM, NNNNN, OOOOO — shipped reference profiles** (3 examples that prove the pattern; others added the same way):

| Reference profile | Slice | Inherits from | Standards bundle (anchor citations) |
|---|---|---|---|
| `payment-provider` (AISP/PISP/EMI/PI) | MMMMM | `business` | PSD2/PSD3 · EBA RTS · EMD2 · ISO 20022 · Berlin Group · SEPA · SWIFT · PCI-DSS · DAC8 · CRD V/CRR II–III · AML/AMLD · eIDAS |
| `bank` (credit institution / investment firm) | NNNNN | `payment-provider` | Basel III / IV · BCBS 239 · CRR · CRD · IFRS 9 ECL · AnaCredit · FINREP · COREP · SREP · MiFID II · EMIR · BRRD · DGSD · FATCA · CRS |
| `government` (public-sector entity) | OOOOO | `business` | IPSAS 1–42 · GFSM 2014 · EU 2014/24 procurement · EU 2014/25 utilities · Peppol BIS Billing 3.0 · Factur-X / EN 16931 · DCAT-AP · INSPIRE · eIDAS QTSP · OECD BEPS Pillar 2 · DAC6/DAC7 · AMLD6 · UN SDG · IFRS S1/S2 |

**Anyone can add their own profile** as a plugin without modifying core: an integrator shipping `@erpax/role-insurance` calls `defineTenantRole({ id: 'insurance.eu.solvency-ii', requiredStandards: [{body:'EU', id:'2009/138/EC Solvency II'}, {body:'EIOPA', id:'EIOPA-BoS-15-110'}, …], … })`. The role becomes activatable on any tenant by name, validates against the same conservation invariants, and renders its own marketing pages / audit packs.

### Why this works

1. The standards each role must satisfy are cited at collection / chain / agent level (`@standard <body> <id> <description>`); citation invariant (Law 2) keeps the citations live.
2. The agent runtime + audit chain produce the auditable evidence trail every regulator demands (ISO 19011 §6.4.6 + SOX §404).
3. The Merkle audit chain (QQQQ) provides the immutable transaction log every supervised entity needs — retention cranks up automatically per the role's `auditPolicy`.
4. The eIDAS / PAdES wiring (OOO) covers qualified-signature requirements for any role that flips `signingRequired: true`.
5. The KYC_SANCTIONS_REVIEW chain + AML/AMLD-cited collections cover AML/CTF for any role that needs them.
6. The Berlin Group / ISO 20022 / Peppol bundles cover the technical-protocol surface of payments (PSP/bank) and public-sector e-invoicing (government) — and any new role can pull additional protocol bundles via `requiredStandards`.
7. The i18n strict-mode coverage (CCCCC-cut2) covers regulator-language requirements (every supervisor in every jurisdiction gets statements in their official language).

### Current coverage baseline (live probe, 2026-05-11)

- **`payment-provider`:** 7 of 12 standard families fully cited. 5 gaps: PSD3, EMD2, EBA RTS, DAC8, CRD V/CRR II–III.
- **`bank`:** 4 of 17 standard families cited (IFRS 9 + ECL via BBBBB-prep, PSD2, partial CRD, eIDAS). 13 gaps: Basel III/IV + BCBS 239, CRR (full), AnaCredit, FINREP, COREP, SREP, MiFID II, EMIR, BRRD, DGSD, FATCA, CRS.
- **`government`:** 5 of 14 standard families cited (Peppol, eInvoice/EN 16931, eIDAS, OECD BEPS, partial Factur-X). 9 gaps: IPSAS 1–42 (none cited), GFSM 2014, EU 2014/24, EU 2014/25, DCAT-AP, INSPIRE, AMLD6, DAC6/DAC7, OECD Pillar 2 (full).
- **User-defined roles:** zero today; capacity unbounded.

Each gap closes via the same pattern as BBBBB-prep's IFRS gap-fill: add `@standard` citations to relevant collections, wire them into the chain registry via `@chain`, expose via MCP (`erpax.<role>.*`), register the role-specific conservation invariant. Slices LLLLL → MMMMM → NNNNN → OOOOO slot in after the agent rollout (DDDDD–IIIII). Each is independent — a tenant can flip to any shipped or user-defined role without the others having shipped.

---

(Original payment-provider corollary preserved below for traceability; superseded by the open-role formulation above.)

| Role | Identifier | Slice | Standards bundle (anchor citations) |
|---|---|---|---|
| Payment provider (AISP/PISP/EMI/PI) | `payment-provider` | LLLLL | PSD2/PSD3 · EBA RTS · EMD2 · ISO 20022 · Berlin Group · SEPA · SWIFT · PCI-DSS · DAC8 · CRD V/CRR II–III · AML/AMLD · eIDAS |
| Bank (credit institution / E-money / investment firm) | `bank` | MMMMM | Basel III / Basel IV · BCBS 239 (risk data aggregation) · CRR · CRD · IFRS 9 ECL · AnaCredit · FINREP · COREP · SREP · MiFID II · EMIR · BRRD · DGSD · FATCA · CRS · GDPR · ISO 20022 |
| Government / public-sector entity | `government` | NNNNN | IPSAS 1–42 · GFSM 2014 (IMF Government Finance Statistics) · EU directive 2014/24 (public procurement) · EU directive 2014/25 (utilities procurement) · Peppol BIS Billing 3.0 · Factur-X / EN 16931 · DCAT-AP · INSPIRE · eIDAS qualified-trust services · OECD BEPS Pillar 2 · DAC6 / DAC7 · AMLD6 · UN SDG indicator framework · IFRS S1/S2 (sustainability) |

The platform IS the compliance because:

1. The standards each role must satisfy are cited at collection / chain / agent level (`@standard <body> <id> <description>`); citation invariant (Law 2) keeps the citations live.
2. The agent runtime + audit chain produce the auditable evidence trail every regulator demands (ISO 19011 §6.4.6 + SOX §404 walk-throughs already render under `marketing/`).
3. The Merkle audit chain (QQQQ) provides the immutable transaction log every supervised entity needs.
4. The eIDAS / PAdES wiring (OOO) covers qualified-signature requirements.
5. The KYC_SANCTIONS_REVIEW chain + AML/AMLD-cited collections cover AML/CTF.
6. The Berlin Group bundle (per BG country complete memory note) covers AISP/PISP API surface; ISO 20022 wiring covers bank messaging; Peppol BIS + EN 16931 wiring covers public-sector e-invoicing.
7. The i18n strict-mode coverage (CCCCC-cut2) covers regulator-language requirements (every supervisor in every EU member state gets statements in their official language).

**`TENANT_ROLE_PROFILES` registry** lives at `src/services/tenant-roles/registry.ts`:

```ts
export interface TenantRoleProfile {
  readonly id: 'payment-provider' | 'bank' | 'government' | 'business'
  readonly requiredStandards: ReadonlyArray<{ body: string; id: string }>
  readonly requiredCollections: ReadonlyArray<string>
  readonly requiredChains: ReadonlyArray<string>
  readonly requiredAgents: ReadonlyArray<AgentId>
  readonly mcpTools: ReadonlyArray<string>          // tool names auto-exposed
  readonly invariant: string                         // e.g. 'checkBankCoverage100Percent'
  readonly auditPolicy: { merkleRetentionDays: number; signingRequired: boolean }
}
```

When a tenant flips `tenants.role = '<roleId>'`:
- Per-role feature gates auto-enable in `FEATURE_REGISTRY`.
- Per-role MCP tools auto-expose (the tenant's own AI agents — talking via MCP — can run role-specific flows).
- Per-role audit policies auto-apply (longer retention, qualified signatures).
- Regulator-facing PDF/A audit packs render on demand.
- `check<Role>Coverage100Percent` continuously asserts the standards posture.

**Current coverage baseline (live probe, 2026-05-11):**

- **Payment provider (LLLLL):** 7 of 12 standard families fully cited (ISO 20022, PSD2, PCI-DSS, AML/AMLD, SEPA, SWIFT, Berlin Group). 5 gaps: PSD3, EMD2, EBA RTS, DAC8, CRD V/CRR II–III.
- **Bank (MMMMM):** 4 of 17 standard families cited (IFRS 9 + ECL via BBBBB-prep, PSD2, CRD partially, eIDAS). **13 gaps:** Basel III/IV + BCBS 239, CRR (full), AnaCredit, FINREP, COREP, SREP, MiFID II, EMIR, BRRD, DGSD, FATCA, CRS — plus extending CRD coverage to all collections.
- **Government (NNNNN):** 5 of 14 standard families cited (Peppol, eInvoice/EN 16931, eIDAS, OECD BEPS, Factur-X partial). **9 gaps:** IPSAS 1–42 (none cited), GFSM 2014, EU 2014/24, EU 2014/25, DCAT-AP, INSPIRE, AMLD6, DAC6/DAC7, OECD Pillar 2 (full).

Each gap closes via the same pattern as BBBBB-prep's IFRS gap-fill: add `@standard` citations to relevant collections (existing or new), wire them into the chain registry via `@chain`, expose via MCP (`erpax.psp.* / erpax.bank.* / erpax.gov.*`), register the role-specific conservation invariant.

Slices LLLLL → MMMMM → NNNNN slot in after the agent rollout (DDDDD–IIIII). Each is independent — a tenant can flip to any role without the others having shipped.

The platform is the compliance because:

1. The standards a PSP must satisfy are cited at the collection / chain / agent level (`@standard PSD2 §97 SCA`, `@standard ISO-20022 pain.001`, etc.) and the citation invariant (Law 2) keeps the citations live.
2. The agent runtime + audit chain produce the auditable evidence trail PSPs must keep (ISO 19011 §6.4.6 + SOX §404 walk-throughs already render under `marketing/`).
3. The Merkle audit chain (QQQQ) provides the immutable transaction log every supervised PSP needs.
4. The eIDAS / PAdES wiring (OOO) covers qualified-signature requirements.
5. The KYC_SANCTIONS_REVIEW chain + AML/AMLD-cited collections cover AML/CTF.
6. The Berlin Group bundle (per BG country complete memory note) covers the AISP/PISP API surface.

**Current PSP-coverage baseline (live probe, 2026-05-11):** 7 of 12 PSP-relevant standard families fully cited (ISO 20022, PSD2, PCI-DSS, AML/AMLD, SEPA, SWIFT, Berlin Group). 5 gaps remain: **PSD3** (incoming PSD2 successor), **EMD2** (E-Money Directive — required for EMIs), **EBA RTS** (EBA Regulatory Technical Standards — SCA + TRA), **DAC8** (EU crypto/CARF tax-reporting), **CRD V / CRR II–III** (capital adequacy for payment institutions).

**Slice LLLLL closes those 5 gaps** by the same pattern as BBBBB-prep's IFRS gap-fill: add `@standard` citations to the relevant existing collections (payments, accounts, kyc-sanctions, sca-events new collection, regulatory-capital-reports new collection, dac8-reports new collection), wire them into the chain registry via `@chain` markers, expose them through MCP tools (`erpax.psp.tenantPosture`, `erpax.psp.fitnessCheck`), and register a new conservation invariant `checkPspCoverage100Percent` analogous to `checkIfrsCoverage100Percent`.

**When LLLLL lands**, an ERPax tenant can flip a `tenants.role: 'payment-provider'` flag and:
- Get the PSP-specific feature gates auto-enabled via `FEATURE_REGISTRY`.
- Get the PSP-specific MCP tools auto-exposed (so the tenant's own AI agents — talking via MCP — can run AISP / PISP / TRA / SCA flows).
- Get the PSP-specific Merkle audit policies auto-applied (longer retention, stricter signing).
- Render the regulator-facing audit packs (PDF/A) on demand.
- Continuously satisfy `checkPspCoverage100Percent` because every state transition is spec-derived and audit-logged.

Slice LLLLL slots in after the agent rollout (DDDDD–IIIII) and before the plugin split (BBBBB), so domain agents already exist to handle the new PSP-specific chains.

## 7c. Self-evolution — ERPax creates itself

After slices DDDDD–ZZZZZ + AAAAAA, the platform is **architecturally self-sufficient**: every primitive needed to extend itself without human intervention is in place. The self-evolution loop:

```
                    ┌──────────────────────────────────────────────────┐
                    │  ERPax self-evolution loop (post-AAAAAA)         │
                    └──────────────────────────────────────────────────┘

      MetaSkillAgent                Conservation                 Spec generators
      hourly cron                   invariants                   (CCCCC pipeline)
            │                            │                            │
            │ ① runAllInvariants()       │                            │
            ├───────────────────────────▶│                            │
            │                            │                            │
            │ ② warn/fail per Law        │                            │
            │◀───────────────────────────┤                            │
            │                            │                            │
            │ ③ ctx.mcp.callTool('erpax.spec.fillBanner', {…})        │
            ├────────────────────────────────────────────────────────▶│
            │                                                         │
            │ ④ regenerated artefacts (seeds, tests, marketing, i18n) │
            │◀────────────────────────────────────────────────────────┤
            │                                                         │
            │ ⑤ Federation broadcast — peer ERPax instances           │
            ├──────────────────────────────▶ (other tenants pull)     │
            │                                                         │
            │ ⑥ Audit trail + Merkle anchor (QQQQ + BBBBBB)           │
            ├────────────────────▶ public chain / IPFS                │
            │                                                         │
            │ ⑦ next tick — Law 11 traces the causal chain            │
            └─────────────────────────── loop continues ──────────────┘
```

**Five primitives carry this loop:**

1. **MetaSkillAgent** (slice IIIII) — hourly `onSchedule` that sweeps + acts.
2. **Conservation invariants** (Laws 1–22) — provide the WARN/FAIL signal the meta-agent acts on.
3. **MCP tools** (16+) — the meta-agent's effectors; same surface external clients use.
4. **Spec generators** (CCCCC pipeline) — turn JSDoc edits into seeds/tests/marketing/i18n auto-magically.
5. **Federation** (AAAAAA) — peer ERPax instances pull each other's improvements (a meta-agent in one tenant fixes a gap; the federation manifest broadcasts the uuid; peers ingest under their own trust policies).

**What the meta-agent can do autonomously today** (with no further human work):

- Detect any of 22 conservation-law violations (`erpax.invariants.runOnSchedule`).
- For Law 1 violations → propose `@standard` citations via `erpax.spec.suggestStandards` + `erpax.spec.fillBanner`.
- For Law 3b (i18n strict) → enqueue translation tasks via `erpax.i18n.translateBatch`.
- For Law 4 (event graph) → propose `@subscribes` declarations in agents that should listen.
- For Law 7 (agent ownership) → propose new agents for unowned chain steps.
- For Law 8 (content integrity) → trigger reconciliation via `erpax.integrity.auditTenant`.
- For Law 10 (referential harmony) → propose rebinds via `erpax.refs.findDangling` + rebind suggestion.
- For Law 11 (provenance) → backfill missing causal links from audit chain.
- For Law 12 (replay) → flag chain steps that aren't replay-stable.
- For Law 13 (tenant isolation) → audit query traces.
- For Law 15 (cost) / Law 16 (carbon) → throttle expensive agents.
- For Law 17 (capability) → propose minimal capability matrix for new agents.
- For Law 19 (explainability) → auto-generate explanations on missing fields.
- For Law 20 (reversibility) → plan rollback paths for risky migrations.
- For Law 22 (AI audit) → flag AI-touched fields without `AiProvenance`.

**The hand-off contract:**

The maintainer's job becomes **declare the spec, set the policy, sign off on the meta-agent's proposals**. The platform handles regeneration, propagation, verification, audit, marketing, i18n, federation, anchoring, archival. New compliance regimes land by adding a new `TenantRoleProfile` (slice LLLLL pattern); new domain capabilities by adding a `DomainAgent` (slice EEEEE pattern); new conservation properties by adding a `Law N` (slice DDDDD/RRRRR/ZZZZZ pattern). All composable; all spec-derived; all auto-tested; all auto-marketed; all auto-federated.

**Slices AAAAAA → EEEEEE are the substrate's own evolution roadmap** — not human work but platform work, surfaced through the MetaSkillAgent's proposals once each substrate primitive lands. The maintainer reviews; the platform builds.

## 8. Out of scope (this design)

- LLM integration for the agents (they're rule-driven first; LLM hooks come later as separate effect kind `'llm-call'`)
- The plugin split (BBBBB) — agents live in the monolith first; per-domain plugin extraction is a downstream slice
- Real-time UI for agent activity — the marketing pages + PDF/A packs are the v1 surface; a live admin dashboard is a downstream slice
- Cross-tenant orchestration — every agent runs scoped to one tenant per tick

## 9. References

- CCCCC slice family: `docs/STANDARDS_AUDIT.md` rows CCCCC-prep / CCCCC-cut1 / CCCCC-cut2
- Spec layer: `src/services/spec-generator/`
- Chain runner: `src/services/business-chains/`
- Audit chain: `src/services/audit/merkle.ts` + `src/plugins/accounting/collections/AuditEvents.ts`
- Existing GL handlers (target for FinanceAgent migration): `src/plugins/accounting/services/gl-*.ts`
- Marketing samples (rendered 2026-05-11): `marketing/order-to-cash.{en,bg,de}.html` etc.
- Strict-i18n runner: `outputs/check-i18n-strict-bg.mjs`

## 10. Acceptance criteria

This design is "done" when:

1. All 15 agents are registered and `AgentRegistry.byCollection(<every-managed-slug>)` resolves.
2. All 22 chains run end-to-end with agent-driven steps; produce ≥1 Merkle leaf per step.
3. All 7 conservation invariants are green in CI.
4. `marketing/<workflow>.<locale>.html` regenerates byte-identically from the spec for every (workflow × supported-locale) pair.
5. Strict i18n in BG drops the missing-key count to 0 (translators have caught up to the spec-derived defaults).
