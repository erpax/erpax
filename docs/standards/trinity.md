# ERPax Trinity Standards — Deep Reference (the 3 generators)

Slice JJJJJJJJ + slice UUUUUUUU (2026-05-11). The Trinity layer at `src/services/architecture-invariants/trinity.ts` collapses the 52 derived conservation laws into **three foundational generators**: Identity, Causality, Closure. From these three, every prior law derives. Per the user's directive — *"the more laws less powerful they are. remember the trinity brought then dimensions. what are their laws?"*

> **Cross-reference**: top-level index at [README.md](./README.md); UUID foundation at [integrity.md](./integrity.md); MCP layer at [mcp.md](./mcp.md); topology at [topology.md](./topology.md).

---

## 1. The three generators

```
┌──────────────────────────────────────────────────────────────────┐
│   LAW I  — IDENTITY                                              │
│     Every thing has a uuid derived from its content.             │
│     ↳ dimension: WHAT IS                                         │
│     ↳ vortex:    A (Domain)                                      │
│                                                                  │
│   LAW II — CAUSALITY                                             │
│     Every state change is a uuid-chained event in causal order.  │
│     ↳ dimension: HOW IT BECOMES                                  │
│     ↳ vortex:    B (Substrate)                                   │
│                                                                  │
│   LAW III — CLOSURE                                              │
│     Every action stays in-system or federates with provenance,   │
│     within a bounded resource envelope.                          │
│     ↳ dimension: WHERE IT LIVES                                  │
│     ↳ vortex:    C (Process)                                     │
└──────────────────────────────────────────────────────────────────┘
```

## 2. Law I — IDENTITY (vortex A — Domain)

**Statement**: Every thing — object, type, ballot, page, standard, clone, federation envelope, proof, DID, MCP tool catalog snapshot, platform genome — has a uuid derived from its content. Two byte-equal things have equal uuids; any mutation shifts the uuid.

**Computation**: `uuidv5(content, tenant-namespace)` over JCS-canonical bytes (RFC 8785) + SHA-256 (FIPS 180-4).

**Obligations**:
1. Compute uuid as `uuidv5(content, tenant-namespace)` over JCS-canonical bytes.
2. Strip storage-managed fields (`uuid`, `id`, `createdAt`, `updatedAt`) from the content used for hashing.
3. Verify by recompute on every read at the trust boundary (federation, cross-backend, regulator audit).
4. Surface short uuids in UI (Law 46); reserve full uuids for verification + federation.

**Subsumes prior Laws**: 8, 10, 30, 31, 35, 36, 39, 46, 47.

**Standards**: RFC 4122 §4.3, RFC 8785 (JCS), FIPS 180-4 (SHA-256), W3C VC Data Model 2.0, ISO/IEC 25010:2023 §5.6 security.

## 3. Law II — CAUSALITY (vortex B — Substrate)

**Statement**: Every state change is an event in a uuid-chained causal order.

**Computation**: Stream events carry a Lamport clock + a hash-chain (`streamUuid = uuidv5({event, lamport, prev})`); chain steps preserve event-graph closure; type evolutions are uuid transitions; aggregate uuids derive from sorted leaf uuids. Out-of-order observations are detectable; tampering breaks the chain at the corruption point.

**Obligations**:
1. Assign a Lamport clock at event push; stream observers must see monotonic non-decreasing order within a window.
2. Anchor every leaf into a Merkle audit chain (Law 4 + 12); high-stakes streams add public-chain anchor (Law 19).
3. Type evolutions register old-uuid → new-uuid transition; clones carry the transition history.
4. Block compositions must share an event type at every boundary (Law 32 — A.emits.events ∩ B.subscribes ≠ ∅).

**Subsumes prior Laws**: 4, 11, 12, 19, 27, 28, 32, 33, 34.

**Standards**: Lamport 1978 (causal ordering), W3C PROV-DM, RFC 4122 §4.3, W3C Streams API, ISO/IEC 25010:2023 §5.2 performance.

## 4. Law III — CLOSURE (vortex C — Process)

**Statement**: Every action stays in-system or federates with provenance; nothing escapes into untraced space.

**Mechanism**: The system surface is a closed torus (11 vertices, 14 edges, 9-hop main loop); every emitted event has a registered consumer or a federation envelope; resource consumption stays inside a bounded envelope (cost / carbon / memory / CPU / queue / chain-step circumference).

**Obligations**:
1. Every emit has a consumer in the catalog OR a federation envelope (no orphan emits).
2. Resource usage stays within envelope: cost ≤ Law 15 cap; carbon ≤ Law 16 cap; memory + CPU + queue ≤ CF Worker / Queue limits; chain-step depth ≤ 42 (CCCCCCC).
3. Spec primitives → MCP tools auto-derived (WWWWWW); MCP tools self-test (AAAAAAA); proof published (DDDDDDD).
4. Clones rebuild self-coherently from genome (HHHHHH); platform observes itself (GGGGGG); torus topology closes (CCCCCCC).

**Subsumes prior Laws**: 1, 7, 13, 15, 16, 17, 22, 23, 24, 25, 26, 29, 37, 38, 40, 41, 43, 44, 45, 48.

**Standards**: Topology — torus (Hatcher 2002), ISO/IEC 25010:2023 §5.2 performance, ISO/IEC 30134 KPIs, W3C JSON-LD 1.1, ISO 19011:2018 §6.4.6.

## 5. Why three is more powerful than fifty-two

| 52 derived laws | 3 generators |
|---|---|
| Can only be CONSULTED | Can be REASONED ABOUT |
| Require an index to navigate | Composable in the head |
| Hidden derivation chains | Pure axioms — orthogonal |
| Adding a domain → new law | Adding a domain → check the 3 |
| Contributors lose track | Contributors recall instantly |
| Boot reports 52 verdicts | Boot reports 3-card rollup |

The shift parallels going from Newtonian forces (many) to Lagrangian principles (few): same physics, vastly fewer primitives. For ERPax: contributors stop asking "which of the 52 do I check?" and start asking "is my change about WHAT IS, HOW IT BECOMES, or WHERE IT LIVES?" — the answer points to one of three laws + their existing obligations.

## 6. The 52 prior laws are theorems

They remain useful as documentation + per-domain checklists, but the boot suite reports verdicts at three levels:

1. **Trinity verdict** (3 cards) — the headline.
2. **5-axis verdict** (standards / expansion / compression / fallback / entropy) — the original taxonomy.
3. **Per-law verdict** (52 entries) — the empirical detail.

`rollUpToTrinity(passedPriorLawNums)` synthesises the 3-card view. The conservation-dashboard surface (slice MMMMMM-shadcn) renders all three levels.

## 7. The dimensions correspond exactly to the §0b vortices

| Trinity Law | Dimension | §0b Vortex |
|---|---|---|
| I — Identity | WHAT IS | A — Domain |
| II — Causality | HOW IT BECOMES | B — Substrate |
| III — Closure | WHERE IT LIVES | C — Process |

The other 7 vortices (D Conservation, E Tenant Role, F Integrity, G Beyond, H Clients, I Federation, J Meta-evolution) are now seen as **specialisations** of these three: particular ways the three laws apply to particular subjects.

## 8. MCP tools

| Tool | Purpose |
|---|---|
| `erpax.platform.trinity` | Return the 3 generators with full descriptors (statement + obligations + subsumed laws + standards) |
| `erpax.platform.trinityGrouping` | Concise: each law → prior law numbers subsumed |
| `erpax.platform.trinityForLaw` | Reverse map: prior Law N → which Trinity law |
| `erpax.platform.trinityRollup` | Roll a passed-law-num list → 3-card per-Trinity verdict |

## 9. Coupling with other slices

The Trinity is the **lens** through which every other slice's contribution is interpreted:

- **uuid family** (RRRRR..UUUUU + FFFFFFF + GGGGGGG) → all Law I.
- **MCP family** (DDDDD + VVVVVV..AAAAAAA + BBBBBBB) → mostly Law III (closure), with Law II (auto-generation = causality between source and tools).
- **Streams + audit** (RRRRRR + SSSSSS + QQQQ) → all Law II.
- **Topology + envelope** (CCCCCCC + IIIIIIIII) → all Law III.
- **Voting** (OOOOOO) → all Law I (vote uuids + aggregate uuids).
- **PWA** (NNNNNNNN) → Law III (cache + queue stay in-system) + Law II (queue is a chain).
- **Country tenant** (KKKKKKKK) → Law III (sovereignty = enforcement of closure at the sovereign scale).

Every new architectural primitive will collapse to one (or more) of these three. The Trinity is the structural prediction: **any future law N is either I-flavoured (identity), II-flavoured (causality), or III-flavoured (closure)**.

## 10. The 5-axis decomposition is tactical; the Trinity is strategic

The 5-axis (slice LLLL) was tactical — it groups laws by *failure mode*. The Trinity is **strategic** — it groups laws by *generative axis*. Both views co-exist:

- **For boot suite consumers** (CI, pre-push gate, auditor): the 5-axis is fastest to read since it surfaces failure-clustered groups.
- **For contributors** (new code, new domain): the Trinity is fastest since it answers "which generator does my change touch?"

The shadcn conservation-dashboard surface renders both side by side.

## 11. Standards anchoring

@standard ISO/IEC 25010:2023 §5.4 reusability — generator sets
@standard W3C JSON-LD 1.1 — typed law manifests
@standard ISO 19011:2018 §6.4.6 — Trinity verdict at every audit
@standard RFC 4122 §4.3 + RFC 8785 — Law I (Identity)
@standard Lamport 1978 — Law II (Causality)
@standard Topology — torus / closed manifold (Hatcher 2002) — Law III (Closure)

## 12. Cross-reference — alphabetized

FIPS 180-4, Hatcher 2002 — Topology, ISO 19011:2018 §6.4.6, ISO/IEC 25010:2023 §5.2 + §5.4 + §5.6, ISO/IEC 30134, Lamport 1978, RFC 4122 §4.3, RFC 8259, RFC 8785, W3C JSON-LD 1.1, W3C PROV-DM, W3C Streams API, W3C VC Data Model 2.0.
