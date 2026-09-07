---
name: void
description: "Use when CI or a deploy needs skills.index to exist without the 80MB corpus emit — the void: an empty pool, 265 bytes, written by a module that imports only node:fs and node:path."
atomPath: "skill/router/build/void"
coordinate: "skill/router/build/void · 1/base · 27f16882"
contentUuid: "051c8798-dcef-530d-bae1-daa61c1b33c2"
diamondUuid: "02b3e509-f35f-80a5-b3aa-af97c5dd9926"
uuid: "27f16882-2961-8922-9f68-d1c4f6290a06"
horo: 1
typography:
  partition: skill
  bondDegree: 96
standards: []
bindings: []
signatures:
  computationUuid: "56348ebc-fd3d-84a8-9823-d52e765a0fbf"
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
      stageUuid: "0d701640-0b05-8393-9f19-300a6af5dbb9"
    - stage: seal
      stageUuid: "d79c19a4-1c51-80a7-ac4a-0fe1680ae3ba"
    - stage: uuid
      stageUuid: "c76949a0-b943-85f8-b149-fa93df30aea9"
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
