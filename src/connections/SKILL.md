---
name: connections
description: "Use when managing the universal social/commercial/civic edge between typeless users — follow/friend/block/customer/supplier/employer/member — the one directed graph that carries the relation in context (not the user type), federated server-to-server via W3C ActivityPub."
atomPath: connections
coordinate: connections · 4/weave · 9ab5856a
contentUuid: "9675ada4-f3e2-5027-a8b0-3d8cfa326eff"
diamondUuid: "90141d14-7852-88e0-bf20-9092dad2ab4a"
uuid: "9ab5856a-9ee7-8bc1-8add-a4ac6cfefdd3"
horo: 4
bonds:
  in:
    - access
    - accounting
    - api
    - collections
    - connection
    - duality
    - event
    - exchange
    - fields
    - fractal
    - hooks
    - identity
    - law
    - merge
    - mycelium
    - network
    - perspective
    - standard
    - trading
    - workspace
  out:
    - access
    - accounting
    - api
    - collections
    - connection
    - duality
    - event
    - exchange
    - fields
    - fractal
    - hooks
    - identity
    - law
    - merge
    - mycelium
    - network
    - perspective
    - standard
    - trading
    - workspace
typography:
  partition: connections
  bondDegree: 60
  neighbors: []
standards:
  - "EU-2002/58"
  - "GDPR Art 17 right-to-erasure Art 21 right-to-object (mute/block)"
  - "ISO 20022 financial-business-party-relationships"
  - "ISO-19011:2018 audit-trail transparent-relationship-ledger"
  - "ISO-20022"
  - "OASIS UBL 2.1 business-relationship (B2B trade edges)"
  - "Peppol BIS billing-and-procurement (B2B / B2G interoperability)"
  - "Peppol-BIS-3.0"
  - "RFC-4122"
  - "RFC-4122 §4.3 content-uuid edge-identity"
  - "UBL-2.1"
  - "W3C ActivityPub server-to-server federation (the cross-platform sync)"
  - "W3C ActivityStreams 2.0 social-graph-vocabulary (Follow/Block/Like)"
  - "W3C-ActivityPub"
bindings: []
neighbors:
  wikilink:
    - access
    - accounting
    - collections
    - duality
    - event
    - fields
    - fractal
    - hooks
    - identity
    - merge
    - standard
  matrix:
    - access
    - accounting
    - api
    - collections
    - connection
    - duality
    - event
    - exchange
    - fields
    - fractal
    - hooks
    - identity
    - law
    - merge
    - mycelium
    - network
    - perspective
    - standard
    - trading
    - workspace
  backlinks:
    - access
    - accounting
    - api
    - collections
    - connection
    - duality
    - event
    - exchange
    - fields
    - fractal
    - hooks
    - identity
    - law
    - merge
    - mycelium
    - network
    - perspective
    - standard
    - trading
    - workspace
signatures:
  computationUuid: "2d3eb2d9-9a82-8d26-b880-120c31601d42"
  stages:
    - stage: path
      stageUuid: "365eb881-b33e-8c12-89d2-bdf9ef21f8a5"
    - stage: trinity
      stageUuid: "7f8f99db-d99d-81ee-9766-534161c17f60"
    - stage: boundary
      stageUuid: "99ca302b-77f4-826e-8ea7-f269350b7de0"
    - stage: links
      stageUuid: "75cd1b4a-71c5-8b8d-9e73-880ea620c9e7"
    - stage: horo
      stageUuid: "8c36a5ec-b5d9-87ca-871e-5c884304b651"
    - stage: seal
      stageUuid: "c36bdd97-9d07-8396-b405-63d5705b748c"
    - stage: uuid
      stageUuid: "21251aa4-c7b9-882e-b589-1ec9647b5e92"
version: 2
---
# connections

**FORM: the one directed edge.** A connection is a single `from → to` party edge whose `context` *is* the relation. The user has no type (the `all`/`one` actor), so there is no business-vs-consumer-vs-government model — **B2B, C2B, C2C, B2G, C2G are directions on this one edge, never separate collections**. The edge — never the user — carries social (follow/friend/block/mute), commercial (customer/supplier/agent/carrier), employment (employer/colleague/contractor) and civic (member/represents/governs/regulated_by) relation. Every "platform" collapses onto this one graph: a per-platform prefix becomes a `context` value (the dimension law, the same move [[merge]] runs on the naming axis).

The edge is the relational atom — `from` is the [[duality]] give-pole (ActivityStreams `actor`), `to` the take-pole (`object`); a matching reverse edge resolves the pair to mutuality (`reciprocal`: two follows ⇒ friend). Each edge is polymorphically [[accounting|accountable]] and federates **in sync**: every change emits a content-uuid [[event]] consumed in-process AND by peers, so same content ⇒ same id ([[identity]]) ⇒ graphs set-union with no coordination ([[merge]]). This is what lets communities self-manage directly at every level, government included.

This is a [[collections|collection]] node ([[fields]] `from`/`to`/`context`/`status`, [[hooks]] for the federation event, [[access]] for visibility); the same edge form recurs at every scale ([[fractal]]) — a field relates to a collection as a user relates to a user.

## Sequence position

**2** (share) on the ring 0·3·6·9·**1·2·4·8·7·5** — the relational doubling-helix step where one identity ([[identity]], 1) opens into a shared edge between two. The flow it carries (the document/value chain) runs the rest of the helix; the federation handshake closes back through [[merge]] (9).

## Standards

Applying this skill *implements* the federated social-graph standards — shaping an edge as an ActivityStreams activity and delivering it server-to-server is the skill, so the `@standard` banners on `index.ts` must be true to the layer emitting the activity, not decoration ([[standard]]).

- **ActivityStreams 2.0 — Activity Vocabulary** — W3C Recommendation, 23 May 2017. The social-graph verbs `Follow`/`Accept`/`Block`/`Like` and the `actor`/`object` terms the `from`/`to`/`context` fields carry.
- **ActivityPub** — W3C Recommendation, 23 January 2018. Server-to-server federation: POST the edge activity to the target actor's inbox; a `Follow` is answered by a reciprocal `Accept`. erpax emits the envelope/handshake; cite only where the federation activity is actually emitted.
- OASIS UBL 2.1 business-relationship (B2B trade edges)
- Peppol BIS billing-and-procurement (B2B / B2G interoperability)
- ISO 20022 financial-business-party-relationships
- RFC-4122 §4.3 content-uuid edge-identity
- GDPR Art 17 right-to-erasure Art 21 right-to-object (mute/block)
- ISO-19011:2018 audit-trail transparent-relationship-ledger
- ISO-27001 A.5.23 cloud-service-tenant-isolation
