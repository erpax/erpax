---
name: merge
description: Use when reasoning about convergence/federation in erpax — same content ⇒ same id (content-uuid), same (domain×position×element) ⇒ same path; data and structure set-union with no coordination. Federation, dedup, "all agents one erpax".
sessions:
  - 776a49cb-8dfb-45ab-88ff-956e3b613adf
---

# merge

Convergence with no coordination: same content ⇒ same id ([[identity]]); same address ⇒ same path ([[sequence]]). Data and structure set-union — federation across instances, dedup, agents converging to [[one]] erpax. The only failure mode is a divergent/duplicate path ([[recover]]). Merge by design is the payoff of [[fractal]] address + content-uuid [[aura]]. Removing a prefix collapses a [[dimension]] into its shared coordinate — `bank`/`fx`/`trade`-`transactions` → one `transactions` — the same merge, run on the naming axis. Convening is merge in realtime: the agent society meeting at [[chat]] (chat.erpax.com) is many agents resolving to [[one]] erpax, deduped on event id.

## Standards

The answer-path principle: applying this skill *implements* these standards — federating an erpax row across instances is shaping it as a social-graph activity and delivering it server-to-server. The standards below are the current canonical editions; citing them in `@standard` banners must be true to the layer being implemented, not decoration.

- **ActivityStreams 2.0 Core** — W3C Recommendation, 23 May 2017 (https://www.w3.org/TR/activitystreams-core/). Current form: the federated content envelope — a JSON-LD Activity with `@context: https://www.w3.org/ns/activitystreams`, `actor` and `object`. Cite for the wire envelope (services/federation/types.ts, services/cloning/publish.ts).
- **ActivityStreams 2.0 — Activity Vocabulary** — W3C Recommendation, 23 May 2017 (https://www.w3.org/TR/activitystreams-vocabulary/; namespace https://www.w3.org/ns/activitystreams). Current form: the social-graph verbs `Follow`/`Accept`/`Block`/`Like` and the actor/object terms. Cite for the verbs (services/social-graph, collections/Connections) — these live in the *Vocabulary* REC, not Core, so "Activity Vocabulary (W3C REC 2017)" is the precise cite rather than bare "ActivityStreams 2.0".
- **ActivityPub** — W3C Recommendation, 23 January 2018 (https://www.w3.org/TR/activitypub/). No newer edition (maintained only via errata + editor's draft). Current form: server-to-server federation — POST the activity to the target actor's inbox; a `Follow` is answered by a reciprocal `Accept`. erpax implements the envelope/handshake pattern, so hedging it "(informal)" where full inbox/outbox conformance is not claimed is honest.

Naming: the W3C document title is "Activity Streams 2.0" (two words); the namespace token / community usage is "ActivityStreams" (one word). Pick one spelling per banner and keep it consistent. ActivityPub is a federation protocol with no bearing on audit-workflow definitions — do not carry it as a decorative banner on non-federation collections; cite it only where the federation activities are actually emitted.

Composes: [[beyond]].
