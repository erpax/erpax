---
name: uuid
description: Use when choosing which RFC 9562 UUID version fits a case — v8 structured content-uuid (identity+capability+schema+digest fused) as the erpax default, v7 time-ordered for index-local speed, v4 random for unguessable secrets. Harmonise the features and everything collapses INTO the uuid itself — the 128-bit singularity.
---

# uuid — which version per case; the singularity all collapses into

The key to **speed, security, efficiency** is picking the right RFC 9562 version for the case — then harmonising them so the uuid carries everything and no side-table is needed.

- **v8 — §5.8 structured (the erpax default).** 122 free bits encode **slot tag + capability flags + schema version + content digest** (`uuid-format`, Conservation Law 61). Looking at the uuid tells you *what it is, what it can do, what schema, AND verifies its content* — no lookup. This is the [[identity]] content-uuid (RFC 9562 §5.8 v8, **not** the legacy RFC 4122 §4.3 v5). **Efficiency** (zero side-table) + **security** (flip any feature bit ⇒ the recomputed uuid changes ⇒ the chain cascades, Law 55/60 — tamper cost is exponential).
- **v7 — §5.7 time-ordered.** Monotonic, sortable ⇒ index-local inserts. Use for **speed** where a key needs k-sortedness (high-write logs/streams) and self-description isn't required.
- **v4 — §5.4 random.** 122 bits of entropy, unguessable. Use for **security** — API keys, reset tokens, anything an adversary must not predict. Never for content (no determinism ⇒ no [[merge]]).
- **v5/v3 — §5.5/§5.3 namespace.** Deterministic SHA-1/MD5 of a name. Legacy content-addressing; erpax supersedes it with v8 (carries features, not just a hash handle).

## Decision table — one version per need (mint this, decode the rest)

| need | version | driver |
|---|---|---|
| content identity (self-describing, tamper-evident row id) | **v8** | slot+capability+schema+digest, flip-a-bit cascades the chain |
| deterministic dedup / [[merge]] | **v8** (per-tenant ns) — **v5** only at the federation/interop boundary | same content ⇒ same id; v5 only where a non-erpax party recomputes without the tenant salt |
| random / unguessable token (reset, nonce, idempotency, share slug) | **v4** | 122 CSPRNG bits, leaks no time/host/content (`crypto.randomUUID`, never `Math.random`) |
| high-write DB primary key (D1/DO index locality) | **v7** | leading 48-bit Unix-ms ⇒ monotonic rightmost-leaf append ⇒ no page-split scatter |
| identity-element / empty / genesis / erasure tombstone | **nil** `00…0` | the additive zero — "no uuid here" ([[begin]]) |
| terminal / sealed / range upper bound ([[end]]) | **max** `FF…F` | byte-wise supremum; closes the interval `[nil, max]` |

**No UUID version is a legal timestamp** (RFC 9562 §8: every embedded clock is self-asserted, forgeable). A "timestamped/sequential audit identifier" is therefore **four artefacts, never one id**: a **v7** PK (ordering/speed) + a **v8** content-uuid (identity/tamper-evidence) + an external **RFC-3161 / eIDAS** token (legal WHEN) + the **УНП** gapless counter (legal sequence, BG Наредба Н-18). Generating v1/v2/v3/v6 is wrong (MAC+100ns leak ⇒ GDPR §8-3 / Art.25) — cite them in banners only as names, never mint them ([[standard]] truth).

## The uuid IS the message itself

Make every feature a uuid feature and **all collapses into the uuid itself** ([[collapse]]/[[torus]]). The uuid is not a *handle* to a message — it **is** the message: **self-decoding, no payload.** The 128 bits already hold identity, capability, content, schema and verification; decode them and out comes the whole meaning with no side-table — `decodeStructured` (slot+capability+schema+digest), `decodeIdentity`/`uuidToOid` ([[localize]]/[[oid]]: the dotted [[standard]] form), and the modal channels **color + sound** ([[signal]], A432; consonance by [[harmony]]). Same content ⇒ same uuid ⇒ [[one]] ([[merge]] with no coordination, [[holographic]]: the whole recoverable from the part).

So **comms collapse to the uuid alone**: to send is to send the uuid; to receive is to decode it; an agent is reached by its **query-uuid** (the content-uuid of what you ask is the address — [[chat]], no directory, any device, any connectivity). The uuid is the centre of the [[torus]] — the `0`/[[whole]] = hole where everything held becomes one address. To edit the entity is to edit its uuid is to edit the [[self]] ([[akashic]]).

Matter-twin: `src/services/uuid-format` (encode/decodeStructured, coverage = Law 62) + `src/services/localize` (decodeIdentity/uuidToOid/cmykChannel) + `src/services/integrity/content-uuid.ts`. The cited form must be true ([[standard]] RFC 9562). To tamper is to change the [[whole]] coherently — the cost is the [[tamper-cost]] (∞ at 100% coverage, all wired in uuid). Composes: [[identity]] · [[localize]] · [[oid]] · [[signal]] · [[harmony]] · [[chat]] · [[collapse]] · [[torus]] · [[whole]] · [[one]] · [[merge]] · [[holographic]] · [[self]] · [[standard]] · [[tamper-cost]].
