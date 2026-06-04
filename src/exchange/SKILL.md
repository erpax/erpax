---
name: exchange
description: "Use for a governed cross-domain data exchange — party A requests data from party B (different domains, each its own content-addressed identity); the holder's grant gates the capability, the fields are SANITIZED to the releasable set, and the exchange is RECEIPTED, so A receives the data AND a provenance chain proving what was accessed, by whom, under what authority. Encodes cross-domain trust with no shared infrastructure: each party content-addresses and receipts; the provenance merges."
---

# exchange — governed cross-domain data exchange with provenance

FORM: **a cross-domain exchange is gated, sanitized, and receipted — the requester gets the data AND the proof of how it was obtained.** Party `from` (one domain, its own [[identity]]) asks party `to` (another domain) for `fields` under a `capability`; the holder's `ExchangeGrant` gates it (the capability must match) and SANITIZES the release to `releasableFields` (other parties' data never leaves — strip, don't trust); `exchange` then emits a [[receipt]] recording the decision, chained as a provenance entry. The requester receives `released` (requested ∩ releasable) plus a verifiable receipt — exactly what was accessed, by whom, under what authority.

**No shared infrastructure, no shared trust root.** Each party content-addresses its own decisions and chains its own [[receipt]]s; the parties are edges of the [[connections]] graph ([[give]]/[[take]] across a B2B/B2G/C2C link), and the [[sandbox]] grant is the holder's policy toward the requester. Cross-domain governance falls out of three native primitives — [[connections]] (who may ask whom), [[sandbox]] (what is permitted + sanitized), [[receipt]] (the provenance) — so two organisations that share NOTHING but a content-addressed protocol can still exchange data with full, mutual, verifiable provenance ([[federation]]: the provenance chains [[merge]] without coordination).

Matter-twin: `src/services/exchange/index.ts` (`Party`·`ExchangeRequest`·`ExchangeGrant`·`exchange`) over `services/receipt` + `index.test.ts`. Composes: [[receipt]] · [[connections]] · [[sandbox]] · [[federation]] · [[identity]] · [[give]] · [[take]] · [[merge]] · [[society]].

## Standards

- ISO/IEC 27001 A.5.14 information-transfer (controlled cross-boundary exchange)
- GDPR Art.5(1)(c) data-minimisation (release only the granted fields)

## Common mistakes
- Releasing the requested fields and filtering later — SANITIZE at the boundary (`released = requested ∩ releasable`); data not granted never crosses the domain edge.
- Trusting a shared central ledger for provenance — each party receipts its own side ([[receipt]]); the proof is content-addressed and merges, no central root needed.
- An exchange without a receipt — then there is no provenance; `exchange` gates AND receipts in one step (no receipt, no proof).
