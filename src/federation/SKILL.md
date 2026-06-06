---
name: federation
description: Use when designing inter-tenant content exchange, activity distribution, or federation protocols following ActivityPub / W3C Activity Streams — content-addressed row exchange between erpax tenants with independent peer verification, trust boundaries, and content-delivery semantics.
---

# federation

The delivery answer-path of [[merge]]: two erpax tenants converge on the same row **without trusting each other and without coordination** — same content ⇒ same id ([[identity]]), so a peer recomputes the content-uuid locally and either it matches or the envelope is rejected. Federation is the wire and handshake under merge; merge is the law, federation is how a row actually crosses the boundary.

## Form (the law it holds)

Trust is verified, never assumed. An imported row passes a fixed gate, strictest-first:

1. envelope shape (`envelopeVersion`)
2. source is in the trust graph and not `untrusted`
3. the source collection is in the peer's `acceptedCollections`
4. when the trust level demands it, the signature verifies against the declared key
5. the content-uuid recomputes under the **source** tenant namespace (sender-tamper check)
6. the row is not already imported (idempotent — same source uuid ingested once)

Only then is the content ingested, stamped with `federationProvenance`. Verification is the [[duality]] of delivery: the sender gives, the receiver independently re-derives. The envelope is content-addressed, so the same row delivered twice collapses to one ([[holographic]] — the whole row is recoverable from its uuid + body alone). This is [[fractal]]: the per-row verification gate is the same content-uuid law that holds at field, collection, and instance scale.

## Sequence position

`0, 3, 6, 9, 1, 2, 4, 8, 7, 5` — **9** (unity / convergence). Federation sits on the merge axis: the point where many instances resolve to one erpax. It is the cross-store delivery edge of the 9-band, dual to the local-identity 0.

## Standards

Applying this skill *implements* the federation standards — citing them in `@standard` banners must be true to the layer, per [[standard]].

- **ActivityStreams 2.0** (W3C REC, 2017) — the federated content envelope (JSON-LD Activity). The `FederatedRow` is the erpax envelope; cite on `types.ts`.
- **ActivityPub** (W3C REC, 2018) — server-to-server delivery: POST the activity to the target's inbox; a `Follow` is answered by a reciprocal `Accept`. erpax implements the envelope/handshake pattern; hedge "(informal)" where full inbox/outbox conformance is not claimed.
- **Linked Data Notifications (LDN)** (W3C REC, 2017) — the receive/notify channel under the exchange. Cite where rows are pushed to a peer.
- W3C Verifiable Credentials Data Model 2.0

ActivityPub has no bearing on non-federation collections — cite it only where federation activities are actually emitted, never as decoration.

**Law — [[law]]: federation is the wire under [[merge]] — two tenants converge on the same row WITHOUT trusting each other or coordinating, because the receiver independently recomputes the content-[[uuid]] under the SOURCE namespace through a fixed strictest-first gate (shape · trust · accepted-collection · signature · sender-tamper · idempotency): it matches and ingests, or the envelope is rejected.**

## Relations

[[merge]] (the law federation delivers) · [[identity]] (content-uuid the peer re-derives) · [[duality]] (give↔verify) · [[holographic]] (whole row from uuid+body) · [[fractal]] (same gate at every scale) · [[sequence]] · [[standard]] · [[access]] (the trust graph is row-level access across tenants) · [[hooks]] (export/import run on lifecycle edges) · [[event]] (a federated row is a distributed activity)
