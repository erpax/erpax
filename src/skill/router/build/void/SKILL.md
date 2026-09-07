---
name: void
description: "Use when CI or a deploy needs skills.index to exist without the 80MB corpus emit — the void: an empty pool, 265 bytes, written by a module that imports only node:fs and node:path."
atomPath: "skill/router/build/void"
coordinate: "skill/router/build/void · 5/round · 2c4df219"
contentUuid: "aee609c4-2ffc-530c-87a6-77fa17995a18"
diamondUuid: "16529683-241e-8217-86c5-44b3044ecbdb"
uuid: "2c4df219-e637-8384-840c-f8f563a0b433"
horo: 5
typography:
  partition: skill
  bondDegree: 96
standards: []
bindings: []
signatures:
  computationUuid: "0bd133a7-4f91-8b19-a343-f472803e4fd1"
  stages:
    - stage: path
      stageUuid: "f31247e6-e696-8ff0-a852-511e31ba01b2"
    - stage: trinity
      stageUuid: "ede02579-9638-884d-9c75-f3bc8a05246d"
    - stage: boundary
      stageUuid: "eeaf6929-596f-8cf8-9e13-0dbee194b5e3"
    - stage: links
      stageUuid: "c66d423f-cd16-84c8-aff3-87a0f01b8b76"
    - stage: horo
      stageUuid: "6a437ef5-1e30-8775-a5d1-99fafab115c8"
    - stage: seal
      stageUuid: "d79c19a4-1c51-80a7-ac4a-0fe1680ae3ba"
    - stage: uuid
      stageUuid: "7d901226-5814-8fc2-afdc-625557b44599"
version: 2
---
# skill/router/build/void — 265 bytes should not cost six seconds

The full skill index walks every `SKILL.md` and produces ~80MB, which no Cloudflare Worker can hold (3MB script limit). CI and deploy write an **empty pool** instead, so the static import resolves and nothing is baked in.

That stub is 265 fixed bytes. Emitting it cost **6.3s on a CI runner, in every job** — not because writing is slow, but because the emitter it lived in imports [[aura]], [[navigation]] and the skill upgrade seal at module top level. ESM evaluates those whether the stub path needs them or not, and it needs none of them.

| | |
| --- | ---: |
| `corpus skill-stub` via the full emitter | 2.9s local · **6.3s CI** |
| the same 265 bytes from here | **0.53s** |

**The shape is spelled once.** `skillIndexSource` is the only place the generated file's format exists, and the full emitter writes through it — an extraction that left the format in two places would trade six seconds for a drift nobody would notice until a Worker refused the bundle.

The name is the corpus's own word. `stub` is not in the shared vocabulary — nearest is `sub`, edit distance 1 — and the vocabulary axis is a DOWN-ONLY ratchet at zero, so an ungrounded atom name reddens it. What this writes IS the void: an index with no members.

**Honest boundary.** This makes the STUB cheap; the full emit is unchanged and still belongs to local skill-router research, where its cost is paid once and knowingly. The banner still names `build/index.ts` because that is the emitter a reader should go to — the generated header is a pointer, not an attribution.

Composes: [[skill]]/router · [[cloudflare]]/capacity.
