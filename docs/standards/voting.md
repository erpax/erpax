# ERPax Voting + Rating Standards — Deep Reference

Slice OOOOOO + slice SSSSSSSS (2026-05-11). The voting/rating layer at `src/services/voting/index.ts` solves seven classes of violation via uuid coupling. Two new conservation laws (30 + 31) govern it. The Trinity collapse (slice JJJJJJJJ) places it at **Law I (Identity)**.

> **Cross-reference**: top-level index at [README.md](./README.md); MCP layer at [mcp.md](./mcp.md); integrity foundation at [integrity.md](./integrity.md).

---

## 1. The seven violation classes (per spec §0j)

| # | Violation | UUID mechanism | Conservation Law |
|---|---|---|---|
| 1 | Double-voting | Vote uuid = uuidv5({voterPseudoDid, subjectUuid, periodUuid, value}) → 2nd cast collides at uuid creation | Law 31 |
| 2 | Vote tampering | Vote uuid recomputable from value; mutation breaks uuid | Law 8 echo |
| 3 | Vote stuffing | Each vote requires voter's DID signature; stuffed votes lack signature | Law 8 + W3C DID Core |
| 4 | Rating drift | Rating series append-only by uuid; bitemporal trail | Law 11 |
| 5 | Aggregate fudging | Aggregate uuid derived from sorted leaf uuids; recomputable by anyone | **Law 30** |
| 6 | Anonymity collisions | voterDid hashed with periodUuid (HKDF) → per-period pseudo-DID; cross-period correlation requires breaking SHA-256 | `derivePseudoDid` (FIPS 180-4) |
| 7 | Cross-tenant pollution | tenantId in vote-uuid content; cross-tenant votes have different uuids by construction | Law 9 |

## 2. RFC-IETF stack

| Standard | What it specifies | ERPax module | MCP tool |
|---|---|---|---|
| **RFC 4122 §4.3** | Name-based UUIDs for vote / aggregate identity | `src/services/voting/index.ts` (createBallot, castVote, computeAggregate) | `erpax.voting.{createBallot, castVote, computeAggregate}` |
| **RFC 8259** | JSON ballot/vote/aggregate envelopes | `voting/index.ts` (exportBallotBundle) | `erpax.voting.exportBallotBundle` |
| **RFC 8785** | JCS canonicalization → stable aggregate uuid | `voting/index.ts` (jcsCanonicalize wrap) | indirect |
| **FIPS 180-4** | SHA-256 for HKDF-style per-period pseudo-DID + content uuid | `voting/index.ts` (derivePseudoDid via Node crypto) | `erpax.voting.derivePseudoDid` |

## 3. W3C identity + provenance stack

| Standard | What it specifies | ERPax module | MCP tool |
|---|---|---|---|
| **W3C DID Core 1.0** | Voter identity — master DID hashed with ballotPeriodUuid → pseudo-DID per period | `voting/index.ts` (derivePseudoDid) + `did/index.ts` | `erpax.voting.derivePseudoDid` |
| **W3C VC Data Model 2.0** | Each ballot bundle ({ballot, votes, aggregate}) is a federable verifiable claim envelope | `voting/index.ts` (exportBallotBundle) + `proof/dry-proof.ts` | `erpax.voting.exportBallotBundle` |
| **W3C JSON-LD 1.1** | Typed bundles + Schema.org Action carriers | `voting/index.ts` (output shapes) | `erpax.voting.exportBallotBundle` |

## 4. ISO quality + audit stack

| Standard | What it specifies | ERPax module | MCP tool |
|---|---|---|---|
| **ISO/IEC 25010:2023 §5.6 security — non-repudiation** | Vote DID signatures + content-uuid integrity | `voting/index.ts` (castVote requires signature) | `erpax.voting.castVote` |
| **ISO/IEC 25010:2023 §5.4 reusability** | 6 ballot kinds (binary / choice-one / rank / rating-1to5 / rating-1to10 / sentiment-pos-neg) reusable across every voting surface | `voting/index.ts` (BallotKind type) | `erpax.voting.createBallot` |
| **ISO 19011:2018 §6.4.6** | Every vote + aggregate audit-trailed | `voting/index.ts` + `architecture-invariants/checks.ts` | implicit |

## 5. Conservation laws

| Law # | Title | Verifies | Trinity |
|---|---|---|---|
| **30** | vote aggregate authenticity | Aggregate uuid = recomputed uuid from constituent leaves; platform cannot fudge an average | **I** (Identity) |
| **31** | no double voting | No two votes share (ballotUuid, voterPseudoDid, subjectUuid) — uuid collision is the duplicate detector | **I** (Identity) |

## 6. The 6 ballot kinds

```ts
type BallotKind =
  | 'binary'              // yes / no / abstain
  | 'choice-one'          // first-past-the-post
  | 'rank'                // ordered preference list (Borda / IRV / etc. computed downstream)
  | 'rating-1to5'         // Likert 5-point
  | 'rating-1to10'        // NPS-style 10-point
  | 'sentiment-pos-neg'   // pos / neg / neu
```

Each kind has typed `VoteValue` variants matching the kind. Type narrows at `castVote()` via discriminated union — wrong kind returns `{ok: false, reason: 'kind-mismatch'}`.

## 7. Use cases across ERPax domains

The voting/rating uuid coupling surfaces in many ERPax domains; the existence of a uniform module replaces N domain-specific aggregators:

- **Operations** — change-request approvals (binary / choice-one)
- **Governance** — board votes (binary / rank)
- **Procurement** — supplier ratings (rating-1to5)
- **CRM** — customer satisfaction NPS (rating-1to10 + sentiment)
- **Workflow** — approval gates (binary)
- **Engineering** — feature-flag rollout consensus (binary / sentiment)
- **Meta-skill (QQQQQ)** — proposal-prioritisation ranking (rank)

## 8. The pseudo-DID HKDF derivation

`derivePseudoDid(voterMasterDid, ballotPeriodUuid)` returns `did:erpax:vote:<hex-32>`:

```
hash = SHA-256(voterMasterDid + ' ' + ballotPeriodUuid)
pseudoDid = 'did:erpax:vote:' + first 32 hex chars of hash
```

**Two votes by the same master DID in two different periods are statistically unlinkable without the master DID.** Cross-period correlation requires breaking SHA-256.

The pseudo-DID flows into every vote's content uuid, so changing periods produces uncorrelated vote uuids even for the same voter on the same subject.

## 9. MCP tools

| Tool | Purpose |
|---|---|
| `erpax.voting.createBallot` | Open a ballot — kind / subjectUuid / periodUuid / opensAt / closesAt |
| `erpax.voting.castVote` | Cast a vote — uuid collision rejects duplicates (Law 31) |
| `erpax.voting.computeAggregate` | Compute + persist the aggregate (uuid from sorted leaves) |
| `erpax.voting.verifyAggregate` | Conservation Law 30 — recompute aggregate uuid from leaves |
| `erpax.voting.listBallots` | Per-tenant ballot list |
| `erpax.voting.listVotes` | Per-ballot vote list (each verifiable via Law 8) |
| `erpax.voting.exportBallotBundle` | JCS-canonical {ballot, votes, aggregate} for federation broadcast |
| `erpax.voting.derivePseudoDid` | HKDF-style per-period pseudo-DID |
| `erpax.voting.checkNoDoubleVoting` | Conservation Law 31 verdict |

## 10. Coupling with other domains

- **Slice DDDDDD (DID)** — voter master DID resolved through `erpax.did.resolve` before derivePseudoDid.
- **Slice AAAAAA (federation)** — ballot bundles cross instances as federation envelopes; peer verifies aggregate uuid locally.
- **Slice BBBBBB (anchoring)** — high-stakes ballots (board votes, credit-rating polls) anchor their aggregate uuid to a public chain.
- **Slice NNNNNN (SEO vortex)** — public ballots register as SeoVortexFaces; cross-link to the subject's page.
- **Slice DDDDDDD (DRY-proof bundle)** — every vote-aggregate uuid appears in the proof's `invariants[]` array under Law 30.

## 11. Standards anchoring

@standard RFC 4122 §4.3 + RFC 8785 + FIPS 180-4 — content uuid + pseudo-DID
@standard W3C DID Core 1.0 + W3C VC Data Model 2.0 — voter identity + verifiable bundle
@standard ISO/IEC 25010:2023 §5.6 security — non-repudiation
@standard ISO 19011:2018 §6.4.6 — audit-evidence per vote

## 12. Cross-reference — alphabetized

FIPS 180-4, ISO 19011:2018 §6.4.6, ISO/IEC 25010:2023 §5.4 + §5.6, RFC 4122 §4.3, RFC 8259, RFC 8785, W3C DID Core 1.0, W3C JSON-LD 1.1, W3C VC Data Model 2.0.
