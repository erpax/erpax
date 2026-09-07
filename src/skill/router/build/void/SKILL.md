---
name: void
description: "Use when CI or a deploy needs skills.index to exist without the 80MB corpus emit — the void: an empty pool, 265 bytes, written by a module that imports only node:fs and node:path."
atomPath: "skill/router/build/void"
coordinate: "skill/router/build/void · 5/round · c57b2793"
contentUuid: "2eaf354b-1614-5d39-ae13-6e5d579af8b5"
diamondUuid: "c04d46ff-3a9f-8a4d-8ab6-86f22feff632"
uuid: "c57b2793-a340-8c1c-a67f-a1e759f4eaf0"
horo: 5
typography:
  partition: skill
  bondDegree: 96
standards: []
bindings: []
signatures:
  computationUuid: "9e8718e6-20f9-81be-abeb-4a85dcc3aa83"
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
      stageUuid: "695c1e96-3ba5-889a-b30e-728a3f50cb8b"
    - stage: seal
      stageUuid: "d79c19a4-1c51-80a7-ac4a-0fe1680ae3ba"
    - stage: uuid
      stageUuid: "aa2f94cd-e6ba-8233-bb8b-6121236eae81"
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
