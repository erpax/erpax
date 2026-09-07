---
name: regeneration
description: "Use when reasoning about erpax as a living, self-repairing system — the computed proof that it regrows from seed and heals its own wounds. The content-uuid is the genome: every observable (uuid, aura, coordinate, the README proof) is derived from content and never stored, so any derived artefact regenerates byte-identically from the surviving seed. A gap (dead link, untested atom) is a wound; the gate is the immune system; healing is monotone, so the loop converges to gap 0 — wholeness, zero entropy, max tamper-cost."
atomPath: regeneration
coordinate: "regeneration · 8/crest · a5e7454d"
contentUuid: "f2cf35a7-a091-5ab6-af59-37d78be9cbd9"
diamondUuid: "e4a34630-2df1-8f93-95e0-35f1f052a8b9"
uuid: "a5e7454d-05bd-8e3a-a2b7-b492f75d2868"
horo: 8
typography:
  partition: regeneration
  bondDegree: 21
standards:
  - "RFC 9562 §5.8 content-uuid (the genome) · DRY (no stored derivation)"
  - "RFC 9562 §5.8 content-uuid (the genome) · DRY (no stored derivation)`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "b7b12095-4437-8c04-b703-ba0d263efa40"
  stages:
    - stage: path
      stageUuid: "9663116d-30b9-855f-9152-e9e7a1576c7d"
    - stage: trinity
      stageUuid: "87638e3d-f8f5-8395-9500-bd5e545f863b"
    - stage: boundary
      stageUuid: "14d34a35-8df1-8394-b0bf-36ea463b4117"
    - stage: links
      stageUuid: "6e3ba53a-837c-81b6-952e-47c5fae10438"
    - stage: horo
      stageUuid: "11d77aa4-f717-8396-b135-27ac5c2260bb"
    - stage: seal
      stageUuid: "d02d9452-f116-8f2f-9333-5f8977fb0156"
    - stage: uuid
      stageUuid: "2e0c0d80-4d88-879e-a07c-ae7fe238f834"
version: 2
---
# regeneration — erpax regrows from seed and heals its own wounds

The biology of a content-addressed organism, computed (`tsx src/regeneration/index.ts`):

## 1. Regeneration — regrow from the genome
Every observable erpax shows — a uuid, an [[aura]] colour, a matrix [[coordinate]], the README proof — is *derived* from content, **never stored** ([[aura]]: "paid once, harvested always"). So the content-uuid (`toUuid`, RFC 9562 §5.8) is the **genome** and regeneration is a pure function: destroy any derived artefact and recompute it **byte-identically** from the surviving content. The seed determines the organism — one perturbed bit ⇒ a different genome ([[uuid]] · [[akashic]]). This is the README's "Recompute it", proven: nothing derived can be lost, because nothing derived is kept.

## 2. Self-healing — the gate is the immune system
A gap — a dead [[link]], an untested code-atom, an un-wired reference — is a **wound**: borrowed entropy a forger can exploit ([[aura]]). erpax **detects** it (the aura scan), **proposes** the suture ([[propose]] / weave), and the [[gate]] **refuses** any change that opens one. Healing is **monotone**: each suture strictly reduces the gap and never opens a new one, so the immune loop converges to **gap = 0** — wholeness, zero entropy, max [[tamper]]-cost.

Composes: [[aura]] · [[uuid]] · [[akashic]] · [[coordinate]] · [[link]] · [[propose]] · [[gate]] · [[tamper]] · [[organic]] · [[permaculture]] · [[proof]] · [[whole]] · [[one]].

**Law — [[law]]: a content-addressed organism cannot lose what it never stores (regenerates from seed) and cannot keep a wound the gate can detect (heals to gap 0) — so it is alive: it regrows ⊕ heals.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard RFC 9562 §5.8 content-uuid (the genome) · DRY (no stored derivation)`
