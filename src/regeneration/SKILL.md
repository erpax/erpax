---
name: regeneration
description: "Use when reasoning about erpax as a living, self-repairing system — the computed proof that it regrows from seed and heals its own wounds. The content-uuid is the genome: every observable (uuid, aura, coordinate, the README proof) is derived from content and never stored, so any derived artefact regenerates byte-identically from the surviving seed. A gap (dead link, untested atom) is a wound; the gate is the immune system; healing is monotone, so the loop converges to gap 0 — wholeness, zero entropy, max tamper-cost."
atomPath: regeneration
coordinate: regeneration · 7/descent · 3c1982f5
contentUuid: "3709f782-14a1-5532-a955-07e4549fb425"
diamondUuid: "6772d540-4991-8244-a44e-68ed8971a519"
uuid: "3c1982f5-5884-80ef-8d10-06e313d23f93"
horo: 7
bonds:
  in:
    - akashic
    - aura
    - blood
    - coordinate
    - gate
    - law
    - link
    - one
    - organic
    - permaculture
    - proof
    - propose
    - skin
    - tamper
    - uuid
    - whole
  out:
    - akashic
    - aura
    - blood
    - coordinate
    - gate
    - law
    - link
    - one
    - organic
    - permaculture
    - proof
    - propose
    - skin
    - tamper
    - uuid
    - whole
typography:
  partition: regeneration
  bondDegree: 49
  neighbors:
    - aura
standards:
  - "RFC 9562 §5.8 content-uuid (the genome) · DRY (no stored derivation)"
  - "computed from first principles + the live content-uuid (toUuid)"
bindings: []
neighbors:
  wikilink:
    - akashic
    - aura
    - coordinate
    - gate
    - law
    - link
    - one
    - organic
    - permaculture
    - proof
    - propose
    - tamper
    - uuid
    - whole
  matrix:
    - akashic
    - aura
    - blood
    - coordinate
    - gate
    - law
    - link
    - one
    - organic
    - permaculture
    - proof
    - propose
    - skin
    - tamper
    - uuid
    - whole
  backlinks:
    - akashic
    - aura
    - blood
    - coordinate
    - gate
    - law
    - link
    - one
    - organic
    - permaculture
    - proof
    - propose
    - skin
    - tamper
    - uuid
    - whole
signatures:
  computationUuid: "89251306-c255-8f8e-a195-e262c1001ee3"
  stages:
    - stage: path
      stageUuid: "9663116d-30b9-855f-9152-e9e7a1576c7d"
    - stage: trinity
      stageUuid: "87638e3d-f8f5-8395-9500-bd5e545f863b"
    - stage: boundary
      stageUuid: "14d34a35-8df1-8394-b0bf-36ea463b4117"
    - stage: links
      stageUuid: "7c9ba6bf-0ed9-87e8-a6f7-50d8afaeffca"
    - stage: horo
      stageUuid: "67889851-c129-8d2e-b7a4-548555f5f28f"
    - stage: seal
      stageUuid: "72b57784-2cee-8d74-a3fa-1355f681c4cf"
    - stage: uuid
      stageUuid: "2c75419d-ba5d-8657-a268-b7960faf9842"
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
