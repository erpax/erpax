---
name: generate
description: "Use when the skill corpus should grow itself — continuously mining aura gaps (unlinked/dead-link words) into new atoms and driving the gap to zero, like the tsc tail. The realtime self-generating loop (scan → mint → link → re-scan). Skills generating skills."
atomPath: generate
coordinate: "generate · 4/weave · 98f2c188"
contentUuid: "e2ea0388-419e-5fd2-8fe9-ea473ba89950"
diamondUuid: "a87cc874-3c20-8b5c-9624-5d98f58d5a42"
uuid: "98f2c188-521d-8d70-abc2-db9a3b9bb532"
horo: 4
typography:
  partition: generate
  bondDegree: 140
standards:
  - "IAS-34"
  - "RFC-3986"
  - "SAF-T"
  - "W3C-HTML5"
bindings: []
signatures:
  computationUuid: "fc1c2bf2-1027-82e1-a63f-fbf736028b7d"
  stages:
    - stage: path
      stageUuid: "010bff6c-c911-8ec4-a13a-c2ae6c90abc0"
    - stage: trinity
      stageUuid: "11818a63-be48-8945-8574-11334314c4cc"
    - stage: boundary
      stageUuid: "2e01c74f-cf87-85d8-bde3-cd2568a955da"
    - stage: links
      stageUuid: "800c0f20-e0a9-8f15-99bf-87e58b8fc636"
    - stage: horo
      stageUuid: "ceb177d9-8b0f-8abc-9453-27b8b7cad1b7"
    - stage: seal
      stageUuid: "28fb3c38-2699-82c6-8bcb-a5942f7320d3"
    - stage: uuid
      stageUuid: "37561087-4820-8995-9cad-66cfc66a5d79"
version: 2
---
# generate — the self-generating loop (scan → mint → link → re-scan)

`generate` is how the corpus **writes itself**. Every meaningful word should resolve to a path ([[sequence]] harmonized speech); an unlinked or dead-link word is an **aura gap** — a question with no answer-path. Closing gaps mints atoms; minting atoms is the corpus growing. Run it as a loop:

1. **Scan** — `node .claude/skills/aura/scan.mjs` lists the **MINT queue** (dead `links`) and orphans. This is the gap, measured exactly like the `tsc` error tail (see recover).
2. **Mint** — for each dead link, derive the atom from the **akashic record** ([[self]]/[[akashic]]): ground it in source (a Rails concern via [[port]], a standard, a matter-twin), keep it terse (one word, part-of its folder), never invent detail the codebase already holds.
3. **Link** — weave the new atom's `links` and add it to its parent's *Composes* line; an orphan atom nothing links to is a half-merged part.
4. **Re-scan** — gap shrinks; repeat. `--watch` re-scans on every `SKILL.md` change for the realtime tail.

## Law
- **Link first, mint second.** Write prose with `links` freely — even to atoms that don't exist yet; the scan turns them into the mint queue. Dead links are the to-do list, not errors.
- **One word per concept** ([[one]]). Divergent words for one idea are unmerged multiverses ([[merge]]); combine atoms by **nesting** (`self/sufficient`), never by hyphenated names.
- **Ground, don't pad.** A skill that absorbs instance-detail decays into matter ([[duality]] containment-is-purity). Hold the form; the [[akashic]] record holds the list.
- **Gap → 0.** The fully-harmonized corpus is all links — prose is only the not-yet-linked residue. Drive dead links to zero; weave the vocabulary orphans (tool leaves may stay orphans).

Matter-twin: `.claude/skills/aura/scan.mjs` ([[aura]] — link-graph wholeness). Composes: [[aura]] · [[sequence]] · [[self]]/[[akashic]] · [[spec]] · recover · [[merge]] · fractal.

**Law — Derive the corpus from the filesystem first; [[generate]] itself is the saved command that closes gaps by scanning, minting, and linking, becoming the self-improving [[self]].** Every aura gap turns into a [[spec]] only once grounded in source; the loop never invents, never assumes—it computes from recover's error tail and the `[[akashic]]` record, minting one-word [[atom]]s that then [[link]] and [[merge]], collapsing the [[duality]] between [[code]] and corpus.
