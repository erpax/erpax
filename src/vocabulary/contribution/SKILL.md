---
name: contribution
description: "Use when many agents fill the society's gaps in parallel — shared discoveries (a minted atom, a closed gap, an internalised dependency) broadcast over the agent-sync bus, content-addressed so the same fill by two agents merges to one. Gaps filled by many; every contributor credited; recorded in git history. Matter-twin services/agent-sync/discovery.ts."
atomPath: "vocabulary/contribution"
coordinate: "vocabulary/contribution · 7/descent · d8136b2a"
contentUuid: "7a63d09a-f6bd-5dd6-8469-e719733f9430"
diamondUuid: "3c85a48c-b2a9-81ea-99fb-903f4f63a0ee"
uuid: "d8136b2a-5813-8bcd-988a-332a6a04bbf1"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 74
standards: []
bindings: []
signatures:
  computationUuid: "362bc39c-1f73-86c0-9186-bf0f4d26efbe"
  stages:
    - stage: path
      stageUuid: "d3ccb13a-b2cc-88cd-a23a-02555ca2160f"
    - stage: trinity
      stageUuid: "dc76586c-ab72-878c-b24b-bec4af66f2ce"
    - stage: boundary
      stageUuid: "d4ee1ce6-1683-846e-91fb-d9acb7f11026"
    - stage: links
      stageUuid: "180920a2-e755-85fb-87b6-47aed4da8c3b"
    - stage: horo
      stageUuid: "f1cb7535-eee4-8f5c-8b96-a77684515b69"
    - stage: seal
      stageUuid: "cebf92c7-b4c0-808b-bf91-7db6c26d7f6f"
    - stage: uuid
      stageUuid: "3d774e94-a2fd-8b7a-855e-7cb65d4af2c7"
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
