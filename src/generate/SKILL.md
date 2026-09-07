---
name: generate
description: "Use when the skill corpus should grow itself — continuously mining aura gaps (unlinked/dead-link words) into new atoms and driving the gap to zero, like the tsc tail. The realtime self-generating loop (scan → mint → link → re-scan). Skills generating skills."
atomPath: generate
coordinate: "generate · 1/base · 88e7ddc2"
contentUuid: "ad949529-d6ef-5027-b858-70a1d90a93f2"
diamondUuid: "84183145-c10b-8bcd-8d80-b49923a6e2a8"
uuid: "88e7ddc2-f58e-8b10-8499-f1f830408a8e"
horo: 1
typography:
  partition: generate
  bondDegree: 227
standards:
  - "IAS-34"
  - "RFC-3986"
  - "SAF-T"
  - "W3C-HTML5"
bindings: []
signatures:
  computationUuid: "2b7fab54-9e3a-85f4-9b5d-3a705d97382b"
  stages:
    - stage: path
      stageUuid: "010bff6c-c911-8ec4-a13a-c2ae6c90abc0"
    - stage: trinity
      stageUuid: "11818a63-be48-8945-8574-11334314c4cc"
    - stage: boundary
      stageUuid: "2e01c74f-cf87-85d8-bde3-cd2568a955da"
    - stage: links
      stageUuid: "b07e2af1-fb80-8e57-b8f5-f0adc4a4165c"
    - stage: horo
      stageUuid: "72aaf86d-b283-8cf9-81ec-2274e68f9557"
    - stage: seal
      stageUuid: "28fb3c38-2699-82c6-8bcb-a5942f7320d3"
    - stage: uuid
      stageUuid: "8a02c65f-9c7e-8c1b-81a3-6b254abb0047"
version: 2
---
# generate — the self-generating loop (scan → mint → link → re-scan)

`generate` is how the corpus **writes itself**. Every meaningful word should resolve to a path ([[sequence]] harmonized speech); an unlinked or dead-link word is an **aura gap** — a question with no answer-path. Closing gaps mints atoms; minting atoms is the corpus growing. Run it as a loop:

1. **Scan** — `node .claude/skills/aura/scan.mjs` lists the **MINT queue** (dead `[[links]]`) and orphans. This is the gap, measured exactly like the `tsc` error tail (see [[recover]]).
2. **Mint** — for each dead link, derive the atom from the **akashic record** ([[self]]/[[akashic]]): ground it in source (a Rails concern via [[port]], a standard, a matter-twin), keep it terse (one word, [[part]]-of its folder), never invent detail the codebase already holds.
3. **Link** — weave the new atom's `[[links]]` and add it to its parent's *Composes* line; an orphan atom nothing links to is a half-merged [[part]].
4. **Re-scan** — gap shrinks; repeat. `--watch` re-scans on every `SKILL.md` change for the realtime tail.

## Law
- **Link first, mint second.** Write prose with `[[links]]` freely — even to atoms that don't exist yet; the scan turns them into the mint queue. Dead links are the to-do list, not errors.
- **One word per concept** ([[one]]). Divergent words for one idea are unmerged multiverses ([[merge]]); combine atoms by **nesting** (`self/sufficient`), never by hyphenated names.
- **Ground, don't pad.** A skill that absorbs instance-detail decays into matter ([[duality]] containment-is-purity). Hold the form; the [[akashic]] record holds the list.
- **Gap → 0.** The fully-harmonized corpus is all links — prose is only the not-yet-linked residue. Drive dead links to zero; weave the vocabulary orphans (tool leaves may stay orphans).

Matter-twin: `.claude/skills/aura/scan.mjs` ([[aura]] — link-graph wholeness). Composes: [[aura]] · [[sequence]] · [[self]]/[[akashic]] · [[spec]] · [[recover]] · [[merge]] · [[fractal]].

**Law — Derive the corpus from the filesystem first; [[generate]] itself is the saved command that closes gaps by scanning, minting, and linking, becoming the self-improving [[self]].** Every aura gap turns into a [[spec]] only once grounded in [[source]]; the loop never invents, never assumes—it computes from [[recover]]'s error tail and the `[[akashic]]` record, minting one-word [[atom]]s that then [[link]] and [[merge]], collapsing the [[duality]] between [[code]] and corpus.
