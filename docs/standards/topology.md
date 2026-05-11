# ERPax Topology Standards — Deep Reference

Slice CCCCCCC + slice IIIIIIIII + slice UUUUUUUU (2026-05-11). The topology layer at `src/services/topology/torus.ts` formalises ERPax + MCP as a **finite-but-unbounded closed system** — an 11-vertex torus with 14 directed edges and a bounded resource envelope. Conservation Law 43 governs closure + bounds; Conservation Law 48 governs the infinite-within-finite property. Trinity collapse (slice JJJJJJJJ) places Law 43 at **Law III (Closure)** and Law 48 at the same generator.

> **Cross-reference**: top-level index at [README.md](./README.md); UUID foundation at [integrity.md](./integrity.md); storage replication at [storage.md](./storage.md).

---

## 1. The closing statement (per spec §0v)

> "ERPax and MCP are interacting to infinity within the limitations of a torus."

Two topological properties:

1. **Closed surface** — every action emitted by ERPax stays within the system or federates (AAAAAA) to a peer torus with full provenance. Nothing escapes into untraced space. Platform-level analog of the closed event graph (Law 4) and content-uuid coupling (Law 8).

2. **Bounded resource envelope** — every long-running process can iterate "to infinity" along the torus surface (the loop has no end), but at every instant it stays inside a bounded envelope. Platform-level analog of cost (Law 15) + carbon (Law 16) caps + CF Worker CPU/memory/queue limits (slice IIIIII).

## 2. The 11 vertices

| Vertex | Slice origin | What lives there |
|---|---|---|
| `spec-corpus` | CCCCC | JSDoc-as-spec extractor — the WHAT |
| `mcp-tools` | VVVVVV..AAAAAAA | 8 self-properties — the discovery surface |
| `agent-blocks` | PPPPPP | Typed agent blocks — the WHO |
| `chain-of-blocks` | QQQQQQ | BUSINESS_CHAIN compositions — the HOW |
| `event-streams` | RRRRRR | Quantum streams + Lamport — the FLOW |
| `audit-trail` | QQQQ + RRRRR + SSSSSS | Merkle + uuid hash-chain — the TRUTH |
| `archival` | EEEEEE | IPFS / Arweave / Filecoin — the LONG TERM |
| `federation` | AAAAAA | Inter-tenant uuid exchange — the MANY |
| `cloning` | HHHHHH | Genome publish + boot — the MIRROR |
| `standards-corpus` | LLLLLL + CCCCCC | 7 families as live objects — the LAW |
| `website` | MMMMMM + NNNNNN + YYYYYY | SEO vortex — the OUTSIDE |

## 3. The 14 directed edges

```
spec-corpus     → mcp-tools            (WWWWWW auto-generation + ZZZZZZ rebuild)
mcp-tools       → agent-blocks         (PPPPPP block manifests via mcp.invoke)
agent-blocks    → chain-of-blocks      (QQQQQQ chainsAsBlockCompositions)
chain-of-blocks → event-streams        (RRRRRR streamFromBus + Lamport clock)
event-streams   → audit-trail          (QQQQ Merkle + SSSSSS streamUuid)
audit-trail     → archival             (EEEEEE IPFS / Arweave / Filecoin pinning)
archival        → federation           (AAAAAA envelope broadcast — uuid + provenance)
federation      → cloning              (HHHHHH bootFromFederation — genome bundle)
cloning         → spec-corpus          (GGGGGG self-reference — clone reads own spec)
spec-corpus     → standards-corpus     (CCCCCC publish + LLLLLL classify)
standards-corpus → mcp-tools           (XXXXXX standardization lexicon)
mcp-tools       → website              (YYYYYY presentation + NNNNNN crossLink)
website         → federation           (NNNNNN faces broadcast + MMMMMM media bundle)
website         → spec-corpus          (MMMMMM seedFromSpec round-trip)
```

The graph is **closed** — every vertex has both incoming and outgoing edges. Tracing any vertex returns to it within ≤9 hops along the main loop.

## 4. Bounded resource envelope (`TORUS_DEFAULT_ENVELOPE`)

| Dimension | Default cap | Anchor |
|---|---|---|
| `maxCostUsdMicrosPerMin` | 100 000 (0.10 USD/min/tenant) | Law 15 + slice JJJJJJ |
| `maxCarbonGCO2ePerMin` | 5 gCO2e/min/tenant | Law 16 |
| `maxMemoryBytes` | 128 MiB | CF Worker |
| `maxCpuMs` | 30 000 | CF Worker paid plan |
| `maxQueueDepth` | 10 000 | CF Queues (slice IIIIII) |
| `maxChainStepsPerWorkflow` | **42** | Soft circumference cap; longer = QQQQQ refactor proposal |

The number 42 is not coincidence — it's the upper bound on chain-of-blocks composition per business workflow. Any chain longer than 42 steps is suspicious and triggers a refactor proposal via the meta-skill agent (slice QQQQQ).

## 5. Topology stack

| Standard | What it specifies | ERPax module | MCP tool |
|---|---|---|---|
| **Topology — torus / closed manifold (Hatcher 2002)** | 11 vertices + 14 edges form a closed surface; finite-but-unbounded loop | `topology/torus.ts` | `erpax.platform.{torusTopology, torusTrace}` |
| **Hilbert-space replicas** | Each uuid lives in N × M × K logical locations simultaneously; physical footprint bounded | `integrity/uuid-stream.ts` (slice IIIIIIIII) | `erpax.integrity.infiniteFinitenessReport` |
| **CAP theorem + PACELC theorem** | UUID-consensus reads choose CP under partition; L under no partition | `storage-independence/index.ts` | `erpax.storage.consensusRead` |

## 6. ISO quality + audit stack

| Standard | What it specifies | ERPax module | MCP tool |
|---|---|---|---|
| **ISO/IEC 25010:2023 §5.2 performance — resource envelope** | The 6 envelope dimensions tracked + capped | `topology/torus.ts` | `erpax.platform.checkTorusBounded` |
| **ISO/IEC 30134 — KPIs for resource efficiency** | Cost + carbon attribution per uuid'd op | `beyond/cost.ts`, `beyond/carbon.ts`, `topology/torus.ts` | `erpax.platform.checkTorusBounded` |
| **ISO 19011:2018 §6.4.6** | Every torus traversal audit-trailed | `architecture-invariants/checks.ts` (Law 43 probe) | implicit |

## 7. Conservation laws

| Law # | Title | Verifies | Trinity |
|---|---|---|---|
| **43** | torus bounded | Every vertex has incoming + outgoing edges (topology); current resource usage at or below envelope | **III** (Closure) |
| **48** | infinite within finite | physical_bytes ≤ envelope; logical_extent unbounded; every uuid has a known source | **III** (Closure) |

## 8. Round-trip semantics

`traceTorusRoundTrip(start, maxHops = 32)` walks the FIRST outgoing edge from each vertex; returns when the start vertex is revisited (confirming closure) or after `maxHops` (suggesting an open path, which would violate Law 43).

Main loop closes in **9 hops** (`spec-corpus → mcp-tools → agent-blocks → chain-of-blocks → event-streams → audit-trail → archival → federation → cloning → spec-corpus`). 5 cross-loop shortcuts (standards-corpus, website) provide alternate paths.

## 9. The closing reframe (per spec §0aa)

| Statement | Captures | Slice |
|---|---|---|
| "ERPax is chains of blocks" | Composition | §0k (QQQQQQ) |
| "ERPax + MCP interact to infinity within a torus" | Topology + bounds | §0v (CCCCCCC) |
| "Tests prove DRY and present it to the world" | Empirical conformance | §0w (DDDDDDD) |
| "ERPax is infinite within finite spacetime" | Replication × federation × bitemporal | §0aa (IIIIIIIII) |
| "The Trinity brings dimensions" | 3 generators replace 52 derived laws | §0ab (JJJJJJJJ) |

## 10. MCP tools

| Tool | Purpose |
|---|---|
| `erpax.platform.torusTopology` | Return the 11 vertices + 14 edges + envelope |
| `erpax.platform.torusTrace` | Trace a round-trip from any vertex; verify closure |
| `erpax.platform.checkTorusBounded` | Conservation Law 43 verdict |
| `erpax.integrity.infiniteFinitenessReport` | Quantified replication × federation × bitemporal |
| `erpax.integrity.checkInfiniteFiniteness` | Conservation Law 48 verdict |

## 11. Standards anchoring

@standard Topology — torus / closed manifold (Hatcher 2002)
@standard CAP theorem + PACELC theorem — consistency / latency under partition
@standard ISO/IEC 25010:2023 §5.2 performance — resource envelope
@standard ISO/IEC 30134 — KPIs for resource efficiency
@standard ISO 19011:2018 §6.4.6 — every torus traversal audit-trailed

## 12. Cross-reference — alphabetized

CAP theorem, Hilbert-space replicas (informal), Hatcher 2002 — Topology, ISO 19011:2018 §6.4.6, ISO/IEC 25010:2023 §5.2, ISO/IEC 30134, PACELC theorem.
