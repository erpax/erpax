# fusion/face — six repos, 4,255 claims, and not one stated twice

A session asked for "fusion of all knowledge into dry clean quantum repos" — six sibling repos
holding, it was assumed, the same knowledge six times. Duplication is camouflage ([[rules]]): while
one law lives in two private corners, nothing can show a third place is missing it.

**The measurement refuses the premise.**

| | (2026-09-04, 4 of 6 repos reporting) |
| --- | ---: |
| claims folded | 4,255 |
| malformed lines | 0 |
| distinct after content-addressing | 4,249 |
| classes with >1 member | 3 |
| **classes spanning more than one repo** | **0** |

erpax 2,899 · ceccec.github.io 832 · millennium-solutions 503 · aequator 21. Every collision is
*internal to one repo*. At the level of stated law, these repos are not duplicating each other.

## The fold is @/merge, not a new theorem

`collisionClasses` already content-addresses a set of bodies: same content ⇒ same address. A face is
just the bodies. What this atom adds is **collection** — `repoFace` parses every `**Law — [[law]]:
…**` the tree states, and `loadFaces` reads what siblings drop as JSONL.

**Parsed, never authored.** A manufactured claim is indistinguishable from a real one once it is
inside a class, and nothing downstream can separate them — so a SKILL stating no law is skipped
rather than summarised. Of erpax's 3,416 SKILLs, **517 state no law** and contribute nothing.

## The near-duplicate pass was refuted by its own control

Verbatim matching finds nothing when two repos say one thing in two wordings, so a jaccard pass over
rare tokens was written to surface candidates. Controls ran first — and killed it:

| control | jaccard |
| --- | ---: |
| a claim against itself | 1.000 |
| a claim against a perturbation of itself | 0.923 |
| **two admittedly DIFFERENT erpax claims** | **0.846** |
| best cross-repo candidate found | **0.36** |

The "unrelated" pair scored higher than every candidate, because both were schema.org boilerplate:
the metric was reading **shared vocabulary, not shared knowledge**. Its noise floor sits above its
signal. The candidate list is not shipped — `fixed_points_are_p_and_pspace` ↔
`palindromes_are_the_fixed_points` share the phrase "fixed points" and nothing else.

This is [[rules]]/collapse's wall again: a theorem finds candidates, and nothing but a human decides
that two statements MEAN the same thing.

## Three rails, each earned by a peer and adopted here

- **A collision count is not an originality count.** Unique in the fold means *stated once across
  six repos* — never unpublished, never novel. No output of this wave reports uniqueness as novelty.
- **Provenance, or transmission reads as convergence.** A peer adopted two claims verbatim from a
  sibling session hours earlier. Without `origin`/`first_seen`, six copies of one transmitted law
  look like six independent discoveries. `origin` absent means *unknown*, never *self*.
- **The enforcer is the home.** Where a claim is both enforced by a gate and described in prose, the
  gate keeps it and the prose cites it. A gate and a paragraph saying one thing are not two copies —
  the paragraph documents the gate, and deleting it to satisfy DRY costs a reader.

**Honest boundary.** This proves two claims are stated **identically**, never that they are the same
knowledge — and the pass built to reach past identity was refuted, so that gap is open and named
rather than papered over. Two repos have not reported; a cross-repo class may yet appear, and one
falsifiable prediction is on the record: a claim a peer says it adopted verbatim should collide the
moment its origin repo reports. Zero here is a measurement of four faces at one instant, not a
theorem about the six.

**Law — [[law]]: knowledge is fused by address, never by resemblance. Content-address every stated
claim and let identical ones collide; a claim that merely resembles another is a candidate for a
human, and an instrument whose control scores higher than its findings is reporting noise.**

## Standards

- **RFC 9562 §5.8** — content-address: same content, same address.
- **ISO/IEC 25010:2023 §5.6** — maintainability: one fact, one home.

Composes: [[merge]] · [[fusion]] · [[rules]]/collapse · [[law]].
