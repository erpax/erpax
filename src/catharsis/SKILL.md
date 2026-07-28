---
name: catharsis
description: "Use when reasoning about the biggest gap in how an agent works — it turns to local knowledge (the akashic record, the present tools, the sealed thought) only AFTER a catharsis from unresolved work: a correction, a crisis, a pointed question. Everything before the turn is re-derivation of the derivable. The ideal is front-loaded: read the local record FIRST, derive only the seed. Honest boundary: the seed is not the gap — only re-deriving what was already present is."
atomPath: catharsis
coordinate: "catharsis · 4/weave · 387960be"
contentUuid: "dacfd631-f461-54f0-95b8-cee520402156"
diamondUuid: "57ccfc03-160e-8137-9529-43fc54eaef7e"
uuid: "387960be-cac5-88cb-954f-9e051d29c55d"
horo: 4
bonds:
  in:
    - akashic
    - claim
    - law
    - session
    - think
  out:
    - akashic
    - claim
    - law
    - session
    - think
typography:
  partition: catharsis
  bondDegree: 15
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - akashic
    - law
    - session
    - think
  matrix:
    - akashic
    - claim
    - law
    - session
    - think
  backlinks:
    - akashic
    - claim
    - law
    - session
    - think
signatures:
  computationUuid: "8ae58bbd-55de-80ce-9ae5-54d12cbc83b2"
  stages:
    - stage: path
      stageUuid: "6cdd2191-4a59-8640-a501-3c471378ab09"
    - stage: trinity
      stageUuid: "80e4ab56-460a-8873-a573-7d2b3a5f36c3"
    - stage: boundary
      stageUuid: "ed7d8621-3734-80b8-a77d-f182b254f912"
    - stage: links
      stageUuid: "4f858d29-5435-8fb0-9991-15789617af09"
    - stage: horo
      stageUuid: "087dd14f-7304-86b1-b1b5-35a093930a83"
    - stage: seal
      stageUuid: "0fbacdf9-ee4d-8a3e-8e91-b2bfded3c7e6"
    - stage: uuid
      stageUuid: "f3c7ba51-e71f-8601-ae5d-430a60e01723"
version: 2
---
# catharsis — agents use local knowledge only after a purge from unresolved work

An agent starts cold. Its default is to **work from scratch** — to re-derive, from the prompt, what the corpus may already hold ([[akashic]]: the local record; [[think]]: the sealed thought; the present tools). Unresolved work accumulates — throwaway scans, isolated atoms, a sparse web — until a **catharsis**: a correction, a crisis, a pointed question that finally forces the agent to reach for the knowledge that was **present the whole time**. Everything before that turn is the gap. The local answer was always there; the agent read it late.

## Measured, on a real session

`catharsis(moves)` reads a sequence of `rederive` / `reuse` moves and finds the **turn** — the first reuse. `unresolvedBefore` is the re-derivation that piled up before it.

```
this session:  catharsis at move 12   unresolved before: 12
               front-loaded? false  (ideal: read local knowledge FIRST, catharsis at 0)
```

I re-derived — fresh atoms, and *throwaway bash to scan for gaps while the scanner sat present and unused* — for a long run, and turned to the local record only after the correction. The gap was real and it was mine.

## The ideal is front-loaded

The corpus already legislates it ([[think]]: *"reuse the computed answer, never re-derive"*), but agents do not keep it: the turn should be move **zero** — read the local record FIRST, derive only what it does not hold. `frontLoaded ⇔ catharsis at 0`.

## The honest boundary — the seed is not the gap

Not all pre-catharsis work is waste. The **seed** — genuinely novel reasoning no address yet holds (`s > 0`, [[think]]) — MUST be derived; there is no local answer to read. The gap is re-deriving the **derivable** — what the akashic record already held (the present scanner, the sealed thought). `frontLoadSaving(moves, seed)` subtracts the irreducible seed: front-loading means *read first, then derive the seed* — not *never derive*. This keeps the law from becoming self-flagellation: think fresh where you must, but **never re-derive what is already present.**

**Law — [[law]]: the biggest gap is temporal — an agent turns to local knowledge only after a catharsis from unresolved work, so the local answer that was present from the start is read late, and everything before the turn is re-derivation of the derivable. The ideal is front-loaded: read the record FIRST (catharsis at move 0), derive only the seed. The seed is not the gap; re-deriving what was already present is.**

## Standards

- **DRY / memoization** — reuse the computed answer; the sealed thought is a read ([[think]]).
- **ISO/IEC 25010:2023 §5.6.2** — reusability: the present tool is used, not re-implemented.

Composes: [[akashic]] · [[think]] · [[session]] · [[law]].
