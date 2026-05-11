# ERPax Federation + Cloning Standards — Deep Reference

Slice AAAAAA + BBBBBB + CCCCCC + DDDDDD + EEEEEE + FFFFFF + GGGGGG + HHHHHH + slice VVVVVVVV (2026-05-11). The federation + cloning layer covers slices AAAAAA through HHHHHH — inter-tenant federation, blockchain anchoring, standards-as-live-objects, decentralized identity, long-term archival, self-healing pre-push, self-reference, and cloning-as-mitosis. Conservation Laws 19 (anchoring), 23 (self-reference), 24 (clone integrity) govern the layer. Trinity collapse (slice JJJJJJJJ) maps Laws 23+24 to **Law III (Closure)** and Law 19 to **Law II (Causality)**.

> **Cross-reference**: top-level index at [README.md](./README.md); UUID foundation at [integrity.md](./integrity.md); storage replication at [storage.md](./storage.md); proof at [proof.md](./proof.md).

---

## 1. The seven primitives + their roles

| Slice | Primitive | Role |
|---|---|---|
| **AAAAAA** | inter-tenant federation | Exchange rows by uuid + trust graph |
| **BBBBBB** | blockchain anchoring | Write audit-leaf uuids to public chain (Law 19) |
| **CCCCCC** | standards-as-live-objects | IFRS / ISO / EU directives as content-addressed registry |
| **DDDDDD** | decentralized identity (DID) | Tenants + agents portable across instances |
| **EEEEEE** | long-term archival | IPFS / Arweave / Filecoin pinning |
| **FFFFFF** | self-healing pre-push | Regen + auto-commit regenerable artefacts |
| **GGGGGG** | ERPax-as-self-interacting-vortex | Platform describes platform (Law 23) |
| **HHHHHH** | ERPax cloning | Mitosis as federation applied to self (Law 24) |

## 2. The mental model

> "ERPax cloning is not a new primitive — it is federation (AAAAAA) applied to the platform's own spec + state."

A clone is: publish self → boot from federation envelope → verify integrity by uuid recompute. The same uuid arrives unchanged at the clone; the clone's spec corpus + collections + agents + roles + MCP tools rebuild deterministically (Law 24 — `checkGenomeDeterministic`).

## 3. Federation envelope shape (AAAAAA)

```ts
interface FederationEnvelope {
  kind: 'erpax/<payload-type>'        // 'erpax/dry-proof', 'erpax/genome', 'erpax/ballot-bundle', etc.
  version: number
  originDid: string                   // sovereign DID of the publishing instance
  bundleUuid: string                  // content uuid of the inner payload
  bundle: unknown                     // typed inner payload (Dataset / Genome / etc.)
  emittedAt: string                   // ISO 8601
}
```

Every envelope is uuid-verifiable: receiver recomputes `bundleUuid` from `bundle` bytes; mismatch = rejection.

## 4. Trust graph

`erpax.refs.resolve` consults a per-tenant trust graph: which peer DIDs are trusted for which standard families. A receiver can choose to ingest only envelopes from peers it explicitly trusts; untrusted envelopes still validate cryptographically but require manual elevation.

## 5. Blockchain anchoring (slice BBBBBB)

For high-stakes streams (audit chains, vote aggregates, treaty signings), the audit-chain head uuid is anchored to a public chain via a notary signature stub (default) or a real blockchain backend (configurable). The anchor proves: at time T, the platform's uuid was X — third parties verify by reading the chain.

`erpax.anchoring.anchorRoot({tenantId, merkleRoot})` writes; `erpax.anchoring.list({tenantId})` reads back the receipts.

## 6. Standards-as-live-objects (slice CCCCCC)

Every cited standard (IFRS-15, ISO 27001, RFC 4122, etc.) is itself a content-addressed object in the standards registry. Citations form a graph (`addCitation`, `listCitations`); conflicts (`declareConflict`) and supersessions (`declareSupersession`) track regulatory evolution.

Law 27 (`checkStandardCitationsConsistent`) + Law 28 (`checkStandardSupersessionsResolved`) govern the graph — see [integrity.md](./integrity.md) §5 and the standards-as-vortices spec section §0g.

## 7. Decentralized identity (slice DDDDDD)

| Standard | What it specifies | ERPax module | MCP tool |
|---|---|---|---|
| **W3C DID Core 1.0** | Decentralized identifier format | `did/index.ts` (createDid, resolveDid, listDids) | `erpax.did.{create, resolve, list}` |
| **W3C VC Data Model 2.0** | Verifiable credentials issued by tenants | `did/index.ts`, `proof/dry-proof.ts` | indirect |
| **W3C DID Resolution 1.0** | Resolution semantics | `did/index.ts` (resolveDid) | `erpax.did.resolve` |

Every tenant + agent has a DID. DIDs are uuid-keyed identity portable across ERPax instances. Federation envelopes are signed by the originDid. Sovereign DIDs sign treaties (slice KKKKKKKK country profile).

## 8. Long-term archival (slice EEEEEE)

| Backend | Use case |
|---|---|
| **IPFS** | Hot content addressing (CID = uuid) |
| **Arweave** | Permanent storage with one-time payment |
| **Filecoin** | Long-term durability with proofs of replication |
| **Peer ERPax instance** | Federation-as-archival via AAAAAA envelopes |

All four backends register via `BackendRecomputer` (slice TTTTTT — see [storage.md](./storage.md)). Content is verifiable by uuid recompute on any of them.

## 9. Self-reference (slice GGGGGG, Law 23)

`erpax.platform.publishSelf` emits the platform's own genome (spec corpus + conservation laws + agents + roles + MCP tools) as a federation envelope. `checkErpaxObservesSelf` verifies the platform can describe itself end-to-end without external inputs.

This is the closure condition: **ERPax is a vortex that interacts with itself**. The publishSelf primitive is what cloning consumes.

## 10. Cloning as mitosis (slice HHHHHH, Law 24)

`erpax.platform.bootFromFederation({genomeEnvelope})`:

1. Verify envelope's `bundleUuid` recomputes from `bundle` bytes (RFC 4122 §4.3).
2. Compare against the genome bundle structure expected by the local clone scaffold.
3. Boot the cloned instance with the same spec corpus + collections + agents + roles.

`checkGenomeDeterministic` (Law 24) probe: collect the genome twice in the same run; hash both; assert identical. If hashing is non-deterministic, cloning would silently break.

## 11. Self-healing pre-push (slice FFFFFF)

`scripts/auto-heal-generated-artefacts.sh` runs in `.husky/pre-push` before push. Auto-regens:

- `STANDARDS_INDEX.md` (the comprehensive standards citation index)
- `i18n` bundles (per-locale translation files)
- Spec-derived chain registry + seeds
- MCP tool catalog snapshot

If any artefact is stale, the script regens + auto-commits before allowing the push. This is **the platform self-healing its regenerable state at the trust boundary** (git push).

## 12. Conservation laws

| Law # | Title | Slice | Trinity |
|---|---|---|---|
| **19** | blockchain anchor | BBBBBB | II (Causality — anchored audit trail across time) |
| **23** | platform observes itself | GGGGGG | III (Closure — self-reference is closure) |
| **24** | clone integrity / genome self-coherence | HHHHHH | III (Closure — clones rebuild self-coherently) |

## 13. RFC / W3C / chain stack

| Standard | What it specifies | ERPax module |
|---|---|---|
| **RFC 4122 §4.3** | UUIDv5 for every primitive | every slice in this layer |
| **RFC 8785 — JCS** | Canonical envelope bytes | `cloning/genome.ts`, `federation/exchange.ts` |
| **W3C DID Core 1.0 + W3C DID Resolution 1.0** | DID issuance + resolution | `did/index.ts` |
| **W3C VC Data Model 2.0** | Verifiable credentials | `did/index.ts`, `proof/dry-proof.ts` |
| **W3C ActivityPub (informal)** | Pattern for federation envelopes | `federation/exchange.ts` |
| **Bitcoin / Ethereum block-hash semantics (informal)** | Anchor receipts as on-chain proofs | `anchoring/index.ts` |
| **IPFS CID + Arweave + Filecoin** | Archival backends | `archival/index.ts` |

## 14. ISO quality + audit stack

| Standard | What it specifies | ERPax module |
|---|---|---|
| **ISO/IEC 25010:2023 §5.5 testability** | Clone integrity provable at build time (Law 24 probe) | `cloning/genome.ts` |
| **ISO/IEC 27040:2024 — storage security** | Archival backend integrity | `storage-independence/index.ts` |
| **ISO 19011:2018 §6.4.6** | Every federation envelope + clone boot audit-trailed | `architecture-invariants/checks.ts` |

## 15. MCP tools

| Tool | Purpose |
|---|---|
| `erpax.platform.publishSelf` | Emit the platform's genome as a federation envelope |
| `erpax.platform.bootFromFederation` | Boot a clone from a received envelope; uuid-verify on arrival |
| `erpax.refs.resolve` | Trust-graph + uuid resolution |
| `erpax.refs.findDangling` | Conservation Law 10 verdict — referential harmony |
| `erpax.anchoring.anchorRoot` | Anchor audit-chain head to public chain |
| `erpax.anchoring.list` | List anchor receipts for a tenant |
| `erpax.standards.{publish, classify, addCitation, listCitations, declareConflict, declareSupersession, traceSupersession}` | Standards-as-live-objects (slice CCCCCC) |
| `erpax.did.{create, resolve, list}` | DID surface |
| `erpax.archival.list` | List archived uuids per tenant per backend |

## 16. Coupling with other slices

- **Slice RRRRR..UUUUU (uuid family)** — the load-bearing primitives of every federation envelope.
- **Slice TTTTTT..UUUUUU (storage)** — peer ERPax instance is one of N backends; consensus reads aggregate across peers.
- **Slice DDDDDDD (DRY proof)** — bundles published via `asFederationEnvelope` reach peer instances; peers verify locally.
- **Slice KKKKKKKK (country tenant)** — bilateral treaties = federation envelopes signed by sovereign DID; multilateral = N-of-K consensus envelopes.
- **Slice IIIIII (Cloudflare integration)** — federation transport: CF Queues (async fan-out) + CF Workers (envelope verification at the edge).

## 17. Standards anchoring

@standard RFC 4122 §4.3 + RFC 8785 + FIPS 180-4 — uuid composition
@standard W3C DID Core 1.0 + W3C DID Resolution 1.0 — decentralized identity
@standard W3C VC Data Model 2.0 — verifiable credentials
@standard W3C ActivityPub (informal) — federation pattern
@standard Bitcoin / Ethereum block-hash semantics (informal) — anchoring
@standard IPFS CID + Arweave + Filecoin — archival
@standard ISO/IEC 25010:2023 §5.5 testability — clone integrity provable
@standard ISO/IEC 27040:2024 — archival security
@standard ISO 19011:2018 §6.4.6 — every envelope + boot audit-trailed

## 18. Cross-reference — alphabetized

Arweave, Bitcoin / Ethereum block-hash semantics (informal), Filecoin, FIPS 180-4, IPFS CID, ISO 19011:2018 §6.4.6, ISO/IEC 25010:2023 §5.5, ISO/IEC 27040:2024, RFC 4122 §4.3, RFC 8259, RFC 8785, W3C ActivityPub (informal), W3C DID Core 1.0, W3C DID Resolution 1.0, W3C VC Data Model 2.0.
