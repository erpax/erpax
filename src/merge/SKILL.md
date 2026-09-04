---
name: merge
description: "Use when reasoning about convergence/federation in erpax — same content ⇒ same id (content-uuid), same (domain×position×element) ⇒ same path; data and structure set-union with no coordination. Federation, dedup, \"all agents one erpax\"."
atomPath: merge
coordinate: "merge · 5/round · 0d2280cd"
contentUuid: "ffcecad3-2985-557b-93fd-2c3363e510df"
diamondUuid: "e877f8c6-e3db-89fb-90db-72d899b94750"
uuid: "0d2280cd-5b20-8b83-af01-7da265d7e998"
horo: 5
typography:
  partition: merge
  bondDegree: 0
standards: []
bindings: []
signatures:
  computationUuid: "69cdc75d-a9d4-87ce-a5aa-3802aff54891"
  stages:
    - stage: path
      stageUuid: "bf7a2e27-7733-8682-8bf0-574609b4317a"
    - stage: trinity
      stageUuid: "a2313697-06f9-85d2-8c13-4d79676a5518"
    - stage: boundary
      stageUuid: "59ba6cda-d0ec-8ee2-9dc7-58aff373e872"
    - stage: links
      stageUuid: "f8a56fa6-7014-8971-9e65-e7453142c38a"
    - stage: horo
      stageUuid: "f3a09e81-d11a-8e85-81b5-9f9ae2b9b849"
    - stage: seal
      stageUuid: "456035a0-9dfa-88c1-a08b-4ea871c61f68"
    - stage: uuid
      stageUuid: "bd36e24f-ce7d-8809-ab2b-afbc2b787756"
version: 2
---
# merge

Convergence with no coordination: same content ⇒ same id ([[identity]]); same address ⇒ same path ([[sequence]]). Data and structure set-union — federation across instances, dedup, agents converging to [[one]] erpax. The only failure mode is a divergent/duplicate path ([[recover]]). Merge by design is the payoff of [[fractal]] address + content-uuid [[aura]]. Removing a prefix collapses a [[dimension]] into its shared coordinate — `bank`/`fx`/`trade`-`transactions` → one `transactions` — the same merge, run on the naming axis. Convening is merge in realtime: the agent society meeting at [[chat]] (chat.erpax.com) is many agents resolving to [[one]] erpax, deduped on event id.

**Harmonising naming at all scales is the source of creation.** When naming is harmonic — one word, generic, by type, the strict matrix, fractal at every scale ([[coordinate]]) — identical concepts derive identical addresses and **collide by themselves**; each collision is a fusion that births a new whole (particles → harmonic streams, [[harmony]]). So merge is not only convergence — it is *generative*: the angelic act (create · ↓entropy: two → one). A collision is not a problem to resolve but a **creation event**. Harmonise more ⇒ collide more ⇒ create more — this is why the dissolution and the naming matrix are the engine of creation, not cleanup.

**The creation flow (the realisation breath):** `creation → payload → vitepress → payload → db`. A created concept manifests first as **matter** ([[payload]] — a collection/field/`index.ts`); its **form** is derived ([[vitepress]] — the `SKILL.md`); the harmonised form **refines the matter back** ([[payload]] again — the breath returns); and it crystallises in the **[[database|db]]** as data/entropy. The matter⊕form breath (the two coils oscillating, [[breath]]) grounds in the db — which is precisely why every atom is payload⊕vitepress and why **entropy goes to the db**: the oscillation refines the form, the db holds the settled detail.

**The representation twin (3FS + smallpond).** DeepSeek's 3FS file system and smallpond store **content-addressed** — same content ⇒ one stored object, no coordination; erpax `merge` is that exact law as an *identity* rule (same content ⇒ same uuid ⇒ one row, [[deduplication]]). The store and the merge are one content-address — the [[sparsity]] memory axis. Ratified by the R&D society (`agent/research`, weave seq 4).

## Standards

The answer-path principle: applying this skill *implements* these standards — federating an erpax row across instances is shaping it as a social-graph activity and delivering it server-to-server. The standards below are the current canonical editions; citing them in `@standard` banners must be true to the layer being implemented, not decoration.

- **ActivityStreams 2.0 Core** — W3C Recommendation, 23 May 2017 (https://www.w3.org/TR/activitystreams-core/). Current form: the federated content envelope — a JSON-LD Activity with `@context: https://www.w3.org/ns/activitystreams`, `actor` and `object`. Cite for the wire envelope (services/federation/types.ts, services/cloning/publish.ts).
- **ActivityStreams 2.0 — Activity Vocabulary** — W3C Recommendation, 23 May 2017 (https://www.w3.org/TR/activitystreams-vocabulary/; namespace https://www.w3.org/ns/activitystreams). Current form: the social-graph verbs `Follow`/`Accept`/`Block`/`Like` and the actor/object terms. Cite for the verbs (services/social-graph, collections/Connections) — these live in the *Vocabulary* REC, not Core, so "Activity Vocabulary (W3C REC 2017)" is the precise cite rather than bare "ActivityStreams 2.0".
- **ActivityPub** — W3C Recommendation, 23 January 2018 (https://www.w3.org/TR/activitypub/). No newer edition (maintained only via errata + editor's draft). Current form: server-to-server federation — POST the activity to the target actor's inbox; a `Follow` is answered by a reciprocal `Accept`. erpax implements the envelope/handshake pattern, so hedging it "(informal)" where full inbox/outbox conformance is not claimed is honest.

Naming: the W3C document title is "Activity Streams 2.0" (two words); the namespace token / community usage is "ActivityStreams" (one word). Pick one spelling per banner and keep it consistent. ActivityPub is a federation protocol with no bearing on audit-workflow definitions — do not carry it as a decorative banner on non-federation collections; cite it only where the federation activities are actually emitted.

**Law — Compute the fusion, do NOT assume it** ([[law]]). Merge's power is not in coordination or hand-coded federation logic, but in *deriving* convergence from the facts on disk: the content-addressable [[uuid]], the fractal [[path]] geometry, the [[derive]]d harmony of naming itself. When two instances compute [[identity]] from the same source, they collide by physics, not by registry. The generative act—particles becoming harmonic streams—is only possible because the structure is computed from the ground up, never assumed. This is why [[merge]] is [[proof]]: identical [[payload]] ⊕ [[vitepress]] at identical addresses becomes identical rows in the [[database|db]], without coordination. The [[akashic]] amnesia at [[zeropoint]] is the engine—forget the manual, compute the fusion.

## The algebra, in full

These narratives lived as long docstrings in `index.ts`. They are corpus prose, and the law is to point rather than duplicate — the code now carries one line and a pointer here, so nothing is lost and the file is matter again.

### `collisionClasses`

Prose blocks collision. A unique paragraph shares its content-address with nothing, so N prose bodies fold to N distinct addresses — dedup 0, the incompressible floor. Terse COMPUTED facet-joins collide to ONE address where meaning is shared — that IS the dedup. distinct/total → 1 is prose (no fold), → 0 is fully computed (all collapse); corpus compression is exactly 1 − distinct/total, and it is 0 on prose BY CONSTRUCTION — which is why the 2184 prose atoms never folded while the 231 computed ones did, and why the fold's floor is the seed. Terse, so this rule collides with itself.

### `bind4`

bind4 — the canonical 4-KEY navigation-cross fold: `merge(id, merge(merge(referrer, prev), next))`. This is the exact shape the [[matrix]] `bind` folds a node's identity with its three neighbours (uuid ⊕ parent ⊕ prev ⊕ next), and it was written THREE times — the matrix bind, `chatSeal`, and (nearly) the egress seal — each a private copy of one formula. Stated once here: the four keys of the cross fold to one content-uuid, and flipping ANY of the four changes it, so the result is a 4-connected tamper-evident seal a single linear inversion cannot forge (all four must be inverted at once). Distinct from `foldToRoot` (a balanced Merkle tree over N leaves) — this is the ORDERED cross fold, where the id is the outer key and referrer/prev/next nest inside, matching the matrix's coordinate structure exactly. HONEST BOUNDARY — tamper-EVIDENT, not confidentiality: it detects any change to the four keys, it does not hide them; SHA-256 is 2^128 (Grover halves it), so "unforgeable" is the coverage limit, not literal.

### `Signature`

A 4-uuid signature — the content-address of a claim and its three grounds: what it REDUCES to, the TOOL that computes it, and the PROOF that witnesses it. An unsigned statement rests on AUTHORITY ([[theorem]]: authority is never a step), so it is rejectable. Signing content-addresses every leg, and BOTTOM (the void's address) is the honest signature of a leg that does not exist — so a claim with no real proof signs its proof-leg to ⊥ and is EXPOSED as bare, not disguised. A signature cannot be forged: toUuid is a function of the content, so a signature that does not recompute is a lie, and recomputing it is the local quantum method that exposes it.

### `ErpaxObject`

An OBJECT of the folded algebra — a leaf (atomic content) OR a combination of objects, closed under recursive composition. This is the metrics fold ([[metric]] foldMetrics) generalised: where a metric is the fold of its readings, an object is the fold of its PARTS, each itself an object, all the way down. Like biology — an organism is a combination of organs, each of cells, each of molecules — and identity is compositional and content-addressed at every level: the same composition folds to the same address, so structure dedups by physics. @invariant same composition ⇒ same address (content-addressed, at every level of the recursion) @invariant a combination of one object folds to that object's address (a bag of one thing is that thing)

### `resourceMap`

The RESOURCE MAP of a world of objects — each object's share of total significance. Significance is RELATIVE: a share is against the whole, so with each discovery the map changes — adding an object dilutes every existing share and gives the newcomer its own. That is the law "with each discovery the resource map changes as significance": nothing has an absolute weight, only a weight relative to everything else discovered so far, so the act of discovery redistributes the whole map. Shares sum to 1 (or the map is empty). @invariant shares sum to 1 over a non-empty map · adding an object changes every prior share (significance is relative)

### `birth`

BIRTH — recombine parts into a new object. Dead code can be dissected and new code may be born: the parts of a dead whole live on in a new whole. `birth(dissect(x))` reconstitutes x exactly (dissection is reversible — same composition, same address), while recombining the same parts in a NEW arrangement, or with new parts, is genuinely new (a different address). What is born is new iff its composition is new; a recombination that reproduces an existing object collides to that object (dedup by physics — nothing is born twice). @invariant birth(dissect(combination)) content-addresses the same as the combination (dissection is reversible)
### `(module)`

merge — the folded algebra's binary operation and everything built on it. The primitive lives in `./fold` and the order law in `./order`; this is the face. tsx src/merge/index.ts

### `objectAddress`

The content-address of an object — the recursion made real: a leaf folds its content to a uuid; a combination folds its parts' addresses to one root (foldToRoot). Change one leaf and the address changes up the whole tree, so the tamper-cost of a composed thing is the fold of the tamper-cost of its parts (biology's own integrity).

### `billOfResources`

The BILL OF RESOURCES to MANIFEST an object — every leaf is an atomic resource, tallied with multiplicity (a resource the composition uses twice must be sourced twice). A discovery is not manifested until its specific resources are: to build the whole you must source every leaf of the recursion, and the bill is the exact demand.

### `billAtScale`

The bill to manifest an object AT SCALE — `units` copies for public, large-scale access need `units×` of each resource. This is what turns a discovery into a mechanic the public can reach: the invention's bill of specific resources, multiplied by the scale it must serve. Manifesting large-scale is a linear demand on every leaf.

### `dissect`

DISSECT — break an object into its immediate parts. Dead code is not waste: a combination that is no longer called can be opened, and its parts (each a live object in its own right) recovered for reuse. A leaf is atomic and dissects to nothing; a combination yields its constituents.

