---
name: federation
description: "Use when designing inter-tenant content exchange, activity distribution, or federation protocols following ActivityPub / W3C Activity Streams — content-addressed row exchange between erpax tenants with independent peer verification, trust boundaries, and content-delivery semantics."
atomPath: federation
coordinate: "federation · 1/base · 28f33688"
contentUuid: "79e8c77e-3f3a-5ac5-b0dc-efacece84df0"
diamondUuid: "74776eff-3972-8129-a189-19bdd3ba2e09"
uuid: "28f33688-3c77-8c2f-afae-7c5b89925fa9"
horo: 1
bonds:
  in:
    - access
    - decentralization
    - duality
    - ecosystem
    - event
    - exchange
    - fractal
    - holographic
    - hooks
    - identity
    - ingest
    - law
    - lineage
    - merge
    - replication
    - sequence
    - standard
    - uuid
    - workspace
  out:
    - access
    - decentralization
    - duality
    - ecosystem
    - event
    - exchange
    - fractal
    - holographic
    - hooks
    - identity
    - ingest
    - law
    - lineage
    - merge
    - replication
    - sequence
    - standard
    - uuid
    - workspace
typography:
  partition: federation
  bondDegree: 57
  neighbors: []
standards:
  - W3C Activity Streams 2.0 + ActivityPub + LDN
  - "W3C Activity Streams 2.0 + ActivityPub + LDN`"
  - W3C Verifiable Credentials Data Model 2.0
  - "W3C Verifiable Credentials Data Model 2.0`"
  - "W3C-ActivityPub"
  - "W3C-VC-2.0"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - access
    - duality
    - event
    - fractal
    - holographic
    - hooks
    - identity
    - law
    - merge
    - sequence
    - standard
    - uuid
  matrix:
    - access
    - decentralization
    - duality
    - ecosystem
    - event
    - exchange
    - fractal
    - holographic
    - hooks
    - identity
    - ingest
    - law
    - lineage
    - merge
    - replication
    - sequence
    - standard
    - uuid
    - workspace
  backlinks:
    - access
    - decentralization
    - duality
    - ecosystem
    - event
    - exchange
    - fractal
    - holographic
    - hooks
    - identity
    - ingest
    - law
    - lineage
    - merge
    - replication
    - sequence
    - standard
    - uuid
    - workspace
signatures:
  computationUuid: "2a937a94-d6a1-8b67-b6ac-047943e4205c"
  stages:
    - stage: path
      stageUuid: "7f9947bd-55cd-81c7-b4fe-3a1431596330"
    - stage: trinity
      stageUuid: "0baa64b3-8ce0-804d-b728-b64a480632e8"
    - stage: boundary
      stageUuid: "4375a09a-e0f8-8f28-949f-06c2b599bb8b"
    - stage: links
      stageUuid: "73c3b056-6c5d-856b-be2e-f199cb01267b"
    - stage: horo
      stageUuid: "96f895f5-5a5c-8a8d-9447-5df74163356a"
    - stage: seal
      stageUuid: "2fe15827-bba1-882c-be1c-7cd6235582fe"
    - stage: uuid
      stageUuid: "fd31b549-33bb-8743-b7ce-5ce777dfbceb"
version: 2
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

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard W3C Activity Streams 2.0 + ActivityPub + LDN`
- `@standard W3C Verifiable Credentials Data Model 2.0`


Applying this skill *implements* the federation standards — citing them in `@standard` banners must be true to the layer, per [[standard]].

- **ActivityStreams 2.0** (W3C REC, 2017) — the federated content envelope (JSON-LD Activity). The `FederatedRow` is the erpax envelope; cite on `types.ts`.
- **ActivityPub** (W3C REC, 2018) — server-to-server delivery: POST the activity to the target's inbox; a `Follow` is answered by a reciprocal `Accept`. erpax implements the envelope/handshake pattern; hedge "(informal)" where full inbox/outbox conformance is not claimed.
- **Linked Data Notifications (LDN)** (W3C REC, 2017) — the receive/notify channel under the exchange. Cite where rows are pushed to a peer.
- W3C Verifiable Credentials Data Model 2.0

ActivityPub has no bearing on non-federation collections — cite it only where federation activities are actually emitted, never as decoration.

**Law — [[law]]: federation is the wire under [[merge]] — two tenants converge on the same row WITHOUT trusting each other or coordinating, because the receiver independently recomputes the content-[[uuid]] under the SOURCE namespace through a fixed strictest-first gate (shape · trust · accepted-collection · signature · sender-tamper · idempotency): it matches and ingests, or the envelope is rejected.**

## Relations

[[merge]] (the law federation delivers) · [[identity]] (content-uuid the peer re-derives) · [[duality]] (give↔verify) · [[holographic]] (whole row from uuid+body) · [[fractal]] (same gate at every scale) · [[sequence]] · [[standard]] · [[access]] (the trust graph is row-level access across tenants) · [[hooks]] (export/import run on lifecycle edges) · [[event]] (a federated row is a distributed activity)
