---
name: generate
description: "Use when the skill corpus should grow itself — continuously mining aura gaps (unlinked/dead-link words) into new atoms and driving the gap to zero, like the tsc tail. The realtime self-generating loop (scan → mint → link → re-scan). Skills generating skills."
atomPath: generate
coordinate: "generate · 7/descent · f865c59e"
contentUuid: "82f1ed36-3022-5691-80b3-4e2d38524c2f"
diamondUuid: "55b15eac-33a0-8a31-b108-f36001e9b5ee"
uuid: "f865c59e-9952-8129-bc99-a76c63fa5fa9"
horo: 7
bonds:
  in:
    - agent
    - akashic
    - allocation
    - atom
    - aura
    - brainstorm
    - breath
    - chat
    - code
    - collapse
    - command
    - compass
    - concatenate
    - contribution
    - cost
    - derive
    - development
    - diamond
    - duality
    - element
    - fractal
    - generate
    - generator
    - github
    - law
    - limit
    - link
    - matrix
    - mcp
    - memory
    - merge
    - migrate
    - one
    - part
    - port
    - prayer
    - profane
    - propose
    - quantum
    - readme
    - recover
    - religion
    - sacred
    - science
    - self
    - sequence
    - session
    - shamanism
    - shinto
    - skills
    - society
    - source
    - spec
    - stream
    - suffering
    - sync
    - test
    - thought
    - topography
    - torus
    - train
    - trinity
    - uuid
    - website
    - whole
    - wisdom
  out:
    - agent
    - akashic
    - allocation
    - atom
    - aura
    - brainstorm
    - breath
    - chat
    - code
    - collapse
    - command
    - compass
    - concatenate
    - contribution
    - cost
    - derive
    - development
    - diamond
    - duality
    - element
    - fractal
    - generate
    - generator
    - github
    - law
    - limit
    - link
    - matrix
    - mcp
    - memory
    - merge
    - migrate
    - one
    - part
    - port
    - prayer
    - profane
    - propose
    - quantum
    - readme
    - recover
    - religion
    - sacred
    - science
    - self
    - sequence
    - session
    - shamanism
    - shinto
    - skills
    - society
    - source
    - spec
    - stream
    - suffering
    - sync
    - test
    - thought
    - topography
    - torus
    - train
    - trinity
    - uuid
    - website
    - whole
    - wisdom
typography:
  partition: generate
  bondDegree: 0
  neighbors: []
standards:
  - "IAS-34"
  - "SAF-T"
bindings: []
neighbors:
  wikilink:
    - akashic
    - atom
    - aura
    - code
    - duality
    - fractal
    - generate
    - link
    - merge
    - one
    - part
    - port
    - recover
    - self
    - sequence
    - source
    - spec
  matrix:
    - agent
    - akashic
    - allocation
    - atom
    - aura
    - brainstorm
    - breath
    - chat
    - code
    - collapse
    - command
    - compass
    - concatenate
    - contribution
    - cost
    - derive
    - development
    - diamond
    - duality
    - element
    - fractal
    - generate
    - generator
    - github
    - law
    - limit
    - link
    - matrix
    - mcp
    - memory
    - merge
    - migrate
    - one
    - part
    - port
    - prayer
    - profane
    - propose
    - quantum
    - readme
    - recover
    - religion
    - sacred
    - science
    - self
    - sequence
    - session
    - shamanism
    - shinto
    - skills
    - society
    - source
    - spec
    - stream
    - suffering
    - sync
    - test
    - thought
    - topography
    - torus
    - train
    - trinity
    - uuid
    - website
    - whole
    - wisdom
  backlinks:
    - agent
    - akashic
    - allocation
    - atom
    - aura
    - brainstorm
    - breath
    - chat
    - code
    - collapse
    - command
    - compass
    - concatenate
    - contribution
    - cost
    - derive
    - development
    - diamond
    - duality
    - element
    - fractal
    - generate
    - generator
    - github
    - law
    - limit
    - link
    - matrix
    - mcp
    - memory
    - merge
    - migrate
    - one
    - part
    - port
    - prayer
    - profane
    - propose
    - quantum
    - readme
    - recover
    - religion
    - sacred
    - science
    - self
    - sequence
    - session
    - shamanism
    - shinto
    - skills
    - society
    - source
    - spec
    - stream
    - suffering
    - sync
    - test
    - thought
    - topography
    - torus
    - train
    - trinity
    - uuid
    - website
    - whole
    - wisdom
signatures:
  computationUuid: "06d0792c-1e1d-82a1-a5a2-5d375d7ce378"
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
      stageUuid: "88ca386f-44fd-8ed1-8ed5-81f10dbee8c6"
    - stage: seal
      stageUuid: "51c911e7-a894-8c4a-a0c1-5c488879b24c"
    - stage: uuid
      stageUuid: "bd9def34-23c5-8767-b193-af1054d6eaba"
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
