---
name: link
description: "Use when one atom references another in prose — every wikilink must resolve to a real atom, no dead wires; coverage = resolving / total over the live corpus map."
atomPath: "convention/link"
coordinate: "convention/link · 2/share · 713af905"
contentUuid: "6611825d-7323-5b98-8eaa-5cf6776ebff8"
diamondUuid: "1aed363c-d43b-8a50-9a48-15f7fecea35a"
uuid: "713af905-6025-809d-be67-7ac048ece059"
horo: 2
typography:
  partition: convention
  bondDegree: 161
standards:
  - "CommonMark / Obsidian `[[wikilink]]` syntax — resolved by normalized leaf word"
  - "CommonMark / Obsidian double-bracket wikilink syntax — resolved by normalized leaf word against the shared corpus map"
  - "UBL-2.1"
bindings: []
signatures:
  computationUuid: "280c6bf3-e779-85a2-ab0f-869a92427ae1"
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
      stageUuid: "ba5e6bc1-46de-81bd-8896-be37da9e403a"
    - stage: seal
      stageUuid: "7cf09e63-2371-8497-97e1-66a2be400971"
    - stage: uuid
      stageUuid: "157fece4-f427-8bc3-9a5b-1dbc738a0087"
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
