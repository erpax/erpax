---
name: catharsis
description: "Use when reasoning about the biggest gap in how an agent works — it turns to local knowledge (the akashic record, the present tools, the sealed thought) only AFTER a catharsis from unresolved work: a correction, a crisis, a pointed question. Everything before the turn is re-derivation of the derivable. The ideal is front-loaded: read the local record FIRST, derive only the seed. Honest boundary: the seed is not the gap — only re-deriving what was already present is."
atomPath: catharsis
coordinate: "catharsis · 8/crest · 596b41ae"
contentUuid: "1a4acca1-ce36-5d15-85c2-3e299753c66a"
diamondUuid: "6e69ef88-a719-8fb2-b1dc-c0f3869bcac3"
uuid: "596b41ae-3e91-82eb-b772-9c10e657e98f"
horo: 8
typography:
  partition: catharsis
  bondDegree: 15
standards: []
bindings: []
signatures:
  computationUuid: "a03ddd45-1683-8bcf-b4c7-4d162e584ad2"
  stages:
    - stage: path
      stageUuid: "6cdd2191-4a59-8640-a501-3c471378ab09"
    - stage: trinity
      stageUuid: "80e4ab56-460a-8873-a573-7d2b3a5f36c3"
    - stage: boundary
      stageUuid: "73ec12da-89b6-8498-a851-2f249fa0e8c8"
    - stage: links
      stageUuid: "4f858d29-5435-8fb0-9991-15789617af09"
    - stage: horo
      stageUuid: "2247ade1-2a3e-8045-95cf-f095941487c1"
    - stage: seal
      stageUuid: "0fbacdf9-ee4d-8a3e-8e91-b2bfded3c7e6"
    - stage: uuid
      stageUuid: "9947ecf0-b274-87c6-a04a-484b852b8aa8"
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
