---
name: regeneration
description: "Use when reasoning about erpax as a living, self-repairing system — the computed proof that it regrows from seed and heals its own wounds. The content-uuid is the genome: every observable (uuid, aura, coordinate, the README proof) is derived from content and never stored, so any derived artefact regenerates byte-identically from the surviving seed. A gap (dead link, untested atom) is a wound; the gate is the immune system; healing is monotone, so the loop converges to gap 0 — wholeness, zero entropy, max tamper-cost."
atomPath: regeneration
coordinate: "regeneration · 2/share · 758d366c"
contentUuid: "cf97a190-d477-5e1a-ad74-e35a0d1b622d"
diamondUuid: "860cee33-a3fb-8b54-b8e3-520ba1017176"
uuid: "758d366c-61bb-8348-8823-2174abd3d7cd"
horo: 2
typography:
  partition: regeneration
  bondDegree: 43
standards:
  - "RFC 9562 §5.8 content-uuid (the genome) · DRY (no stored derivation)"
  - "RFC 9562 §5.8 content-uuid (the genome) · DRY (no stored derivation)`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "ffac38b6-92fa-8e92-b6b0-008215f7cb52"
  stages:
    - stage: path
      stageUuid: "9663116d-30b9-855f-9152-e9e7a1576c7d"
    - stage: trinity
      stageUuid: "87638e3d-f8f5-8395-9500-bd5e545f863b"
    - stage: boundary
      stageUuid: "14d34a35-8df1-8394-b0bf-36ea463b4117"
    - stage: links
      stageUuid: "fa3c65a7-8f30-85a4-a1f7-cd99ed1859a9"
    - stage: horo
      stageUuid: "11aebfda-6ffb-86fd-a30c-490015192ebb"
    - stage: seal
      stageUuid: "d02d9452-f116-8f2f-9333-5f8977fb0156"
    - stage: uuid
      stageUuid: "b4057104-ac87-8c1f-b48f-ef2235b5207d"
version: 2
---
# regeneration — erpax regrows from seed and heals its own wounds

The biology of a content-addressed organism, computed (`tsx src/regeneration/index.ts`):

## 1. Regeneration — regrow from the genome
Every observable erpax shows — a uuid, an [[aura]] colour, a matrix [[coordinate]], the README proof — is *derived* from content, **never stored** ([[aura]]: "paid once, harvested always"). So the content-uuid (`toUuid`, RFC 9562 §5.8) is the **genome** and regeneration is a pure function: destroy any derived artefact and recompute it **byte-identically** from the surviving content. The seed determines the organism — one perturbed bit ⇒ a different genome ([[uuid]] · [[akashic]]). This is the README's "Recompute it", proven: nothing derived can be lost, because nothing derived is kept.

## 2. Self-healing — the gate is the immune system
A gap — a dead [[link]], an untested code-atom, an un-wired reference — is a **wound**: borrowed entropy a forger can exploit ([[aura]]). erpax **detects** it (the aura scan), **proposes** the suture ([[propose]] / weave), and the [[gate]] **refuses** any change that opens one. Healing is **monotone**: each suture strictly reduces the gap and never opens a new one, so the immune loop converges to **gap = 0** — wholeness, zero entropy, max [[tamper]]-cost.

Composes: [[aura]] · [[uuid]] · [[akashic]] · [[coordinate]] · [[link]] · [[propose]] · [[gate]] · [[tamper]] · organic · permaculture · [[proof]] · [[whole]] · [[one]].

**Law — [[law]]: a content-addressed organism cannot lose what it never stores (regenerates from seed) and cannot keep a wound the gate can detect (heals to gap 0) — so it is alive: it regrows ⊕ heals.**

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard RFC 9562 §5.8 content-uuid (the genome) · DRY (no stored derivation)`
