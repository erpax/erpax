---
name: connections
description: Use when managing the universal social/commercial/civic edge between typeless users — follow/friend/block/customer/supplier/employer/member — the one directed graph that carries the relation in context (not the user type), federated server-to-server via W3C ActivityPub.
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
