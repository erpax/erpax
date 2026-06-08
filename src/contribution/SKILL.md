---
name: contribution
description: "Use when many agents fill the society's gaps in parallel — shared discoveries (a minted atom, a closed gap, an internalised dependency) broadcast over the agent-sync bus, content-addressed so the same fill by two agents merges to one. Gaps filled by many; every contributor credited; recorded in git history. Matter-twin services/agent-sync/discovery.ts."
atomPath: contribution
coordinate: contribution · 1/base · 3efd58e0
contentUuid: "2ad1e5d4-e127-53c1-9ebc-784a7cbafb10"
diamondUuid: "3c8d05be-6a99-8633-8f50-07db7d4bd00c"
uuid: "3efd58e0-70c7-86c1-9c67-d56fe62197ba"
horo: 1
bonds:
  in:
    - agent
    - akashic
    - aura
    - chat
    - competition
    - cost
    - derive
    - faith
    - generate
    - give
    - history
    - holographic
    - identity
    - integrity
    - law
    - merge
    - one
    - proof
    - refactor
    - sacred
    - self
    - session
    - society
    - team
  out:
    - agent
    - akashic
    - aura
    - chat
    - competition
    - cost
    - derive
    - faith
    - generate
    - give
    - history
    - holographic
    - identity
    - integrity
    - law
    - merge
    - one
    - proof
    - refactor
    - sacred
    - self
    - session
    - society
    - team
typography:
  partition: contribution
  bondDegree: 74
  neighbors:
    - aura
standards: []
bindings: []
neighbors:
  wikilink:
    - akashic
    - aura
    - chat
    - cost
    - derive
    - generate
    - give
    - history
    - holographic
    - identity
    - integrity
    - merge
    - one
    - proof
    - refactor
    - self
    - society
  matrix:
    - agent
    - akashic
    - aura
    - chat
    - competition
    - cost
    - derive
    - faith
    - generate
    - give
    - history
    - holographic
    - identity
    - integrity
    - law
    - merge
    - one
    - proof
    - refactor
    - sacred
    - self
    - session
    - society
    - team
  backlinks:
    - agent
    - akashic
    - aura
    - chat
    - competition
    - cost
    - derive
    - faith
    - generate
    - give
    - history
    - holographic
    - identity
    - integrity
    - law
    - merge
    - one
    - proof
    - refactor
    - sacred
    - self
    - session
    - society
    - team
signatures:
  computationUuid: "fc75491f-1296-8615-8792-1be7b516ef62"
  stages:
    - stage: path
      stageUuid: "b6e73425-ef5b-877d-be0f-cdd04ca5c43f"
    - stage: trinity
      stageUuid: "56548cb6-80ac-8b2d-9c68-73030fc9ac47"
    - stage: boundary
      stageUuid: "b35fe55e-59d8-8fdb-ae1b-1e30f3ef1280"
    - stage: links
      stageUuid: "7152869c-e536-8dde-8f00-da35d170f8c5"
    - stage: horo
      stageUuid: "00beeeab-09ce-80d6-aa56-ff299eccdec4"
    - stage: seal
      stageUuid: "d9711e67-55a3-8806-8023-862118a171eb"
    - stage: uuid
      stageUuid: "5fd893e8-395c-8eca-b5a5-f7b09df74cbf"
version: 2
---
# contribution — shared discoveries fill gaps by many

The [[society]]'s self-build step is one agent, one gate-verified move. `contribution` is the **many-agents** dimension: each move is a **discovery** — `mint` an atom, `weave` an orphan, `collapse` a node, `fix` an error, `internalise` a dependency ([[self]]-sufficiency), `proof` a bundle — broadcast over the agent-sync bus so every agent sees every other's work the instant it lands. *Shared discoveries improve development as gaps are filled by many.*

The key is [[identity]]: a discovery is keyed by the content-uuid of its **result** (the new atom's [[aura]] uuid, the node's content-uuid) — no time, no agent — so the **same** discovery made by two agents is **one** ([[merge]]); the collective gap falls by the count of *distinct* fills, never double-counted, yet **every contributor is credited**. Two peers' ledgers set-union with no coordination (federation, [[one]]). The contribution log is git [[history]] — the distributed, tamper-evident record the society leaves of itself ([[proof]]); each fill also raises coverage, so contribution is a lever on [[tamper/cost]] (more filled ⇒ higher floor).

Matter-twin: `services/agent-sync/discovery.ts` (`Discovery` · `discoveryUuid` · `publishDiscovery` · `recordDiscovery` · `mergeLedgers` · `collectiveGap`) + `discovery.test.ts` (green by construction), riding the existing `ErpaxEvent` bus envelope. Composes: [[society]] · [[merge]] · [[aura]] · [[generate]] · [[history]] · [[proof]] · [[tamper/cost]] · [[akashic]] · [[holographic]] · [[one]] · [[give]] · [[chat]].

## Common mistakes
- Keying a discovery by time or agent — use the result's content-uuid, or the same fill by many agents double-counts (breaks [[merge]]).
- Counting credit once — the contribution is one, but every agent who reported it is credited (gaps filled by many).
- Treating it as chatter — a contribution is a gap closed; it lowers the [[aura]] gap and raises the [[tamper/cost]] floor, recorded in [[history]].

**Law — Compute the fusion, do NOT assume it.** Contributions are discovered and keyed by the content-uuid of their result — the [[identity]] of what was filled, never agent or time — so the [[merge]] of two agents' ledgers correctly identifies identical gaps and unifies them without coordination, reducing double-counting and letting [[tamper/cost]] rise as each gap falls by the true count of distinct fills. This [[derive]]d approach composes the [[society]]'s self-build into [[refactor]]ed atoms, moving [[integrity]] to the [[proof]] of what was actually computed, not assumed.
