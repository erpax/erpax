---
name: link
description: "Use when one atom references another in prose — every wikilink must resolve to a real atom, no dead wires; coverage = resolving / total over the live corpus map."
atomPath: convention/link
coordinate: convention/link · 2/share · f9f30763
contentUuid: "3bba74a0-a081-5505-a79a-b2ab3fc38c44"
diamondUuid: "1b433223-1ac2-8733-a268-2fafd742935f"
uuid: "f9f30763-26c7-8226-9c63-c0fc17bed200"
horo: 2
bonds:
  in:
    - analog
    - aura
    - collapse
    - convention
    - dashboard
    - digital
    - fear
    - forge
    - fusion
    - generate
    - graph
    - gravity
    - gs
    - has
    - heart
    - interference
    - law
    - link
    - love
    - media
    - merchant
    - merge
    - original
    - product
    - purity
    - reciprocal
    - regeneration
    - related
    - relationship
    - religion
    - return
    - reveal
    - role
    - self
    - settings
    - shipping
    - significant
    - sti
    - superdense
    - triggered
    - typography
  out:
    - analog
    - aura
    - collapse
    - convention
    - dashboard
    - digital
    - fear
    - forge
    - fusion
    - generate
    - graph
    - gravity
    - gs
    - has
    - heart
    - interference
    - law
    - link
    - love
    - media
    - merchant
    - merge
    - original
    - product
    - purity
    - reciprocal
    - regeneration
    - related
    - relationship
    - religion
    - return
    - reveal
    - role
    - self
    - settings
    - shipping
    - significant
    - sti
    - superdense
    - triggered
    - typography
typography:
  partition: convention
  bondDegree: 154
  neighbors:
    - aura
standards:
  - "CommonMark / Obsidian `[[wikilink]]` syntax — resolved by normalized leaf word"
  - "CommonMark / Obsidian double-bracket wikilink syntax — resolved by normalized leaf word against the shared corpus map"
  - "UBL-2.1"
  - "coverage read LIVE from the corpus wikiMap (`walk(SKILLS_DIR)`); never asserted, never defaulted — total > 0 by architecture"
bindings: []
neighbors:
  wikilink:
    - aura
    - balance
    - entropy
    - fractal
    - harmony
    - law
    - link
    - search
    - tamper
    - uuid
  matrix:
    - analog
    - aura
    - collapse
    - convention
    - dashboard
    - digital
    - fear
    - forge
    - fusion
    - generate
    - graph
    - gravity
    - gs
    - has
    - heart
    - interference
    - law
    - link
    - love
    - media
    - merchant
    - merge
    - original
    - product
    - purity
    - reciprocal
    - regeneration
    - related
    - relationship
    - religion
    - return
    - reveal
    - role
    - self
    - settings
    - shipping
    - significant
    - sti
    - superdense
    - triggered
    - typography
  backlinks:
    - analog
    - aura
    - collapse
    - convention
    - dashboard
    - digital
    - fear
    - forge
    - fusion
    - generate
    - graph
    - gravity
    - gs
    - has
    - heart
    - interference
    - law
    - link
    - love
    - media
    - merchant
    - merge
    - original
    - product
    - purity
    - reciprocal
    - regeneration
    - related
    - relationship
    - religion
    - return
    - reveal
    - role
    - self
    - settings
    - shipping
    - significant
    - sti
    - superdense
    - triggered
    - typography
signatures:
  computationUuid: "27b88f96-29ff-8f3a-9521-e1204433bf9b"
  stages:
    - stage: path
      stageUuid: "4f12721d-341e-8779-9d0a-cf8212509727"
    - stage: trinity
      stageUuid: "c07b720c-8d59-819a-9136-295f8ff5df04"
    - stage: boundary
      stageUuid: "0dc59aa0-747f-86c4-ac83-1f724c6ef5a8"
    - stage: links
      stageUuid: "c4664dd3-6406-81a3-8588-f559e923e520"
    - stage: horo
      stageUuid: "ae5eb3a6-1bbe-818b-8470-7f2e1a26b357"
    - stage: seal
      stageUuid: "c8e5ed7c-0ba8-8978-b2e4-77dd74f203d7"
    - stage: uuid
      stageUuid: "3cdaf292-79a6-8e62-b6ed-c79c59c0fc59"
version: 2
---
# convention/link — every [[link]] resolves

A wikilink (a `[[name]]` in prose) is a **wire** between two atoms — the prose face of the same edge the [[uuid]] draws in the matrix. A *dead* [[link]] (a `[[name]]` no atom is named) is a **broken wire**: a gap in the [[aura]], [[entropy]] that raises no [[tamper]]-cost. So the convention is simple and absolute — **every wikilink resolves**.

The check **composes the one resolver**, never a parallel one: it calls `walk(SKILLS_DIR)` from the corpus module to populate the shared `wikiMap` (normalized-leaf → route — the SAME map the VitePress docs build and the Payload [[search]] ingest resolve against, keyed by the SAME `norm` the [[aura]] speech gate uses), then reads every `SKILL.md`, extracts its links (outside code spans), and counts how many keys land in `wikiMap`. **coverage = resolving / total** ∈ [0,1]. coverage = 1 ⟺ no dead links ⟺ [[aura]]-gap-0 on the link axis ⟺ zero directed-wiring [[entropy]] ([[balance]] holds in every direction).

This is the link-axis sibling of [[aura]] (which reports the dead-link *count* — the mint queue) and [[harmony]] (the field/enum naming *ratio*); the three measure one [[fractal]] vocabulary on three axes, and all share the corpus `norm` so none can go green while another is red.

Matter-twin: `src/convention/link/index.ts` (`coverage` · `linkTally`). Composes the corpus map · [[aura]] · [[harmony]] · [[uuid]] · [[entropy]] · [[tamper]] · [[law]].

**Law — [[law]]: every wikilink resolves to a real atom — no dead wires. A link is a uuid-edge in prose; a dead link is broken wiring, a gap in the aura that buys zero tamper-cost. Drive resolving/total to 1 and the corpus is wired whole on the link axis: zero dead-wire entropy ⇒ infinite tamper-cost.**

@audit coverage read LIVE from the corpus wikiMap (`walk(SKILLS_DIR)`); never asserted, never defaulted — total > 0 by architecture
@standard CommonMark / Obsidian double-bracket wikilink syntax — resolved by normalized leaf word against the shared corpus map
