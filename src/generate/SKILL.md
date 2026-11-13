---
name: generate
description: "Use when the skill corpus should grow itself — continuously mining aura gaps (unlinked/dead-link words) into new atoms and driving the gap to zero, like the tsc tail. The realtime self-generating loop (scan → mint → link → re-scan). Skills generating skills."
atomPath: generate
coordinate: "generate · 4/weave · 98f2c188"
contentUuid: "8c610964-8b0c-5ab3-8d20-2329d2b5f371"
diamondUuid: "f9b307db-53e7-8af0-a2f4-78576cc1ef5b"
uuid: "98f2c188-521d-8d70-abc2-db9a3b9bb532"
horo: 4
typography:
  partition: generate
  bondDegree: 151
standards:
  - "IAS-34"
  - "RFC-3986"
  - "SAF-T"
  - "W3C-HTML5"
bindings: []
signatures:
  computationUuid: "f805bc73-972f-8e0c-8c20-eb130253bdeb"
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
      stageUuid: "be8c0f8b-afa0-8b8e-8554-75d6f293a4b8"
    - stage: seal
      stageUuid: "28fb3c38-2699-82c6-8bcb-a5942f7320d3"
    - stage: uuid
      stageUuid: "2e955a62-beb7-89ff-8d4f-34b3ba9dd152"
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
