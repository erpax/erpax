# ERPax DRY-Proof Standards — Deep Reference

Slice DDDDDDD + slice OOOOOOOO + slice VVVVVVVV (2026-05-11). The proof layer at `src/services/proof/dry-proof.ts` turns ERPax's claims about itself into a **continuously-fresh, cryptographically-verifiable public artefact**. The meta-skill agent's hourly cron (slice OOOOOOOO) auto-publishes the bundle so Law 44 stays current. Conservation Law 44 governs publication; Trinity collapse (slice JJJJJJJJ) places it at **Law III (Closure)** — the platform's claims about itself stay in-system and verifiable.

> **Cross-reference**: top-level index at [README.md](./README.md); MCP layer at [mcp.md](./mcp.md); UUID foundation at [integrity.md](./integrity.md); SEO coupling at [seo.md](./seo.md).

---

## 1. The closing move (per spec §0w)

> "Now when all is DRY clean in theory, tests need to prove it and present it to the world."

Every prior slice was a claim about how the platform works. This slice turns those claims into a **continuously-verifiable public artefact**. A regulator, customer, AI agent, or peer ERPax instance can hit `/proof/` and see, with cryptographic certainty:

- Which of the 52 conservation laws pass / warn / fail RIGHT NOW
- Which of the ~210 MCP tools pass smoke / are skipped / fail RIGHT NOW
- That the bundle is fresh (≤24h old per `MAX_PROOF_AGE_HOURS`)
- That the bundle is uuid-tamper-proof
- That the bundle is reachable via Schema.org / Open Graph / federation envelope

**The platform's claims about itself are now empirically verifiable — by anyone, at any time, without trust in ERPax.**

## 2. Bundle shape

```ts
interface DryProofBundle {
  '@context': 'https://schema.org'
  '@type': 'Dataset'
  name: 'ERPax DRY Conformance Proof'
  version: 'slice-DDDDDDD (2026-05-11)'
  generatedAt: string                 // ISO 8601
  contentUuid: string                 // Law 8 — recompute to verify
  summary: {
    conservationLawsTotal/Passed/Warned/Failed: number
    mcpToolsTotal/Passed/Skipped/Failed: number
  }
  invariants: Array<{ axis, check, severity, reason? }>      // every law's verdict
  mcpSelfTest: Array<{ tool, verdict, reason? }>             // every tool's smoke verdict
  publicUrl: string                   // /proof/ on this origin
  federable: true
}
```

## 3. Three integrity properties

| Property | Mechanism |
|---|---|
| **Tamper-proof** | `bundle.contentUuid = computeContentUuid(body, 'erpax-public-proof')`. Anyone with the bundle bytes can recompute the uuid and verify it matches. |
| **Fresh** | `generatedAt` checked against `MAX_PROOF_AGE_HOURS = 24h`. Older bundles stale; QQQQQ scheduled task republishes on cadence (slice OOOOOOOO). |
| **Federable** | `asFederationEnvelope(bundle, originDid)` wraps in slice-AAAAAA envelope (`kind: 'erpax/dry-proof', version: 1`). Peer ERPax instances ingest + verify (uuid recomputes locally) without trusting our chain. |

## 4. W3C / Schema.org stack

| Standard | What it specifies | ERPax module |
|---|---|---|
| **W3C JSON-LD 1.1** | Typed Schema.org carrier | `proof/dry-proof.ts` |
| **Schema.org Dataset** | Bundle type — search-engine friendly | `proof/dry-proof.ts` (buildDryProofBundle) |
| **W3C VC Data Model 2.0** | Proof-as-verifiable-claim semantics | `proof/dry-proof.ts` (federation envelope) |
| **Open Graph protocol** | Social-share preview of `/proof/` | `agents/mcp/presentation.ts` |

## 5. UUID / hash-chain stack

| Standard | What it specifies | ERPax module |
|---|---|---|
| **RFC 4122 §4.3 — UUIDv5** | bundle.contentUuid derived from body | `proof/dry-proof.ts` via `content-uuid.ts` |
| **RFC 8785 — JCS** | Canonical body bytes | indirect |
| **FIPS 180-4 — SHA-256** | Hash function | indirect |

## 6. ISO quality + audit stack

| Standard | What it specifies | ERPax module |
|---|---|---|
| **ISO/IEC 25010:2023 §5.5 testability** | Self-test smoke probe on every MCP tool feeds the bundle | `agents/mcp/self-test.ts` |
| **ISO/IEC 25010:2023 §5.7 modularity** | Per-axis + per-law verdicts retained | `architecture-invariants/index.ts` |
| **ISO 19011:2018 §6.4.6** | Audit-evidence + traceability — every uuid in the bundle traces back to a checked invariant | every relevant slice |
| **ISO/IEC 27001 §A.18.2** | Independent review of conformance — the proof bundle is the verifiable artefact regulators consume | `proof/dry-proof.ts` |

## 7. Conservation law

| Law # | Title | Verifies | Trinity |
|---|---|---|---|
| **44** | dry proof published | Bundle exists; `generatedAt` within 24h; `contentUuid` recomputes; public face registered at `/proof/` with schemaType Dataset | **III** (Closure) |

## 8. Auto-publish cadence (slice OOOOOOOO)

The meta-skill agent's hourly cron in `src/services/agents/registered/meta-skill.agent.ts` runs the full invariants suite **once per hour** and reuses the result to:

1. Drive the conservation gap proposer (existing QQQQQ behaviour).
2. **Call `publishDryProofBundle({invariantCtx, tools, origin})`** — emits `meta:dry-proof:tick` with the new contentUuid + publicUrl + summary.
3. Emit `meta:trinity:tick` with the 3-card rollup over the same suite (no second invariants run).

**Single sweep, multiple downstream consumers.** `PLATFORM_ORIGIN` env var (CF-wrangler-friendly + Node-friendly via the guarded access) overrides the default `https://erpax.local`.

After ~1h of uptime, Law 44 turns from `warn` (no proof current) → `pass`.

## 9. MCP tools

| Tool | Purpose |
|---|---|
| `erpax.platform.dryProofBuild` | Build bundle without publishing (preview) |
| `erpax.platform.dryProofPublish` | Build + register the public SeoVortexFace at `/proof/` |
| `erpax.platform.dryProofGet` | Return the most recent published bundle |
| `erpax.platform.dryProofFederate` | Wrap as federation envelope for peer ingestion |
| `erpax.platform.checkDryProofPublished` | Conservation Law 44 verdict |

## 10. Coupling with other slices

- **Slice RRRRR (Law 8)** — bundle.contentUuid is the load-bearing primitive.
- **Slice AAAAAAA (Law 41 self-testable)** — every MCP tool's smoke verdict feeds the bundle.
- **Every conservation law** — every law's verdict feeds the bundle's `invariants[]` array.
- **Slice NNNNNN (Law 29 SEO vortex)** — the bundle registers as an `SeoVortexFace` at `/proof/` with schemaType `Dataset`; outbound edges to `/mcp/` (isPartOf) + `/spec/` (derivedFrom).
- **Slice AAAAAA (federation)** — `asFederationEnvelope(bundle, originDid)` lets peers verify locally.
- **Slice JJJJJJJJ (Trinity)** — `meta:trinity:tick` carries the 3-card rollup synthesised from the same suite.
- **Slice QQQQQ (meta-skill)** — owns the hourly publication cadence.

## 11. What this enables

| Stakeholder | What they can do |
|---|---|
| **Regulator** | Hit `/proof/` → verify all 52 conservation laws + sample MCP tools; reference the contentUuid in compliance findings |
| **Customer** | Hit `/proof/` → see tamper-proof statement of conformance before signing the MSA |
| **AI agent** (ClaudeBot / GPTBot / Google-Extended) | Crawl `/proof/` → ingest the typed Dataset envelope into training |
| **Peer ERPax instance** | Pull the federation envelope; ingest; cross-reference with own peer's bundle |
| **CI / pre-push** | `erpax.platform.checkDryProofPublished` returns the verdict; gate ship on it |

The transparency property of slice MMMMMM ("transparency without security compromise") is finally **operationally complete**: ERPax doesn't just *claim* transparency; the proof bundle is the live, cryptographically-verifiable artefact.

## 12. Standards anchoring

@standard W3C JSON-LD 1.1 + Schema.org Dataset
@standard W3C VC Data Model 2.0 — proof-as-verifiable-claim
@standard Open Graph protocol — social preview of /proof/
@standard RFC 4122 §4.3 + RFC 8785 + FIPS 180-4 — uuid composition
@standard ISO/IEC 25010:2023 §5.5 testability + §5.7 modularity
@standard ISO 19011:2018 §6.4.6 — audit-evidence + traceability
@standard ISO/IEC 27001 §A.18.2 — independent review of conformance

## 13. Cross-reference — alphabetized

FIPS 180-4, ISO 19011:2018 §6.4.6, ISO/IEC 25010:2023 §5.5 + §5.7, ISO/IEC 27001 §A.18.2, Open Graph protocol, RFC 4122 §4.3, RFC 8259, RFC 8785, Schema.org Dataset, W3C JSON-LD 1.1, W3C VC Data Model 2.0.
