---
name: image
description: "Use when a content-uuid needs a visual — its deterministic identity sigil (and animation). One more projection of the self-decoding uuid, beside color (the wave), signal (colour+sound), translation (meaning). uuidImage renders a mandala whose colours, radii and angles ARE the uuid's bytes; uuidAnimation adds byte-seeded SMIL rotation. Same uuid ⇒ same image — the visual IS the address. Honest: this renders the address, not the meaning; semantic text-to-image is a generative model (the seed)."
atomPath: image
coordinate: "image · 4/weave · 541ace71"
contentUuid: "cd88b32e-ade0-5344-8e3d-379f3793a7ca"
diamondUuid: "edc32f32-7570-8013-97ce-3f2adb99c935"
uuid: "541ace71-c434-8e59-874a-c884a330cf8b"
horo: 4
typography:
  partition: image
  bondDegree: 46
standards:
  - "SVG 1.1 / SMIL animation · deterministic hash-to-art (identicon family)"
bindings: []
signatures:
  computationUuid: "10e7450a-46d5-8fba-8ae5-26ab519db5c0"
  stages:
    - stage: path
      stageUuid: "21846f15-7792-891d-8152-f563f2f030a6"
    - stage: trinity
      stageUuid: "1438abfa-d6b7-8084-96a2-658f5300d09c"
    - stage: boundary
      stageUuid: "656c8b45-b6b6-8b6b-bb98-1bba56d31521"
    - stage: links
      stageUuid: "f94e479d-8b44-8911-a6d3-a1402c3c5bb2"
    - stage: horo
      stageUuid: "a546be7d-9c71-8139-8b1c-d2aa5a6e4da8"
    - stage: seal
      stageUuid: "5d3f5ccd-0da5-85bb-b929-39b6ef310289"
    - stage: uuid
      stageUuid: "2fba7609-2631-85eb-acd7-f5c4a249f74b"
version: 2
---
# image — the visual face of the uuid

One more face of the self-decoding content-uuid. Everything the corpus already projects from a uuid — [[color]] (the continuous wave), [[signal]] (colour + sound + CMYK), [[translation]] (the meaning) — is one projection; the **image** and its **animation** are two more.

- **`uuidImage(uuid)`** — a mandala on the [[angle]] hexagon (six petals at the 60° fold step + a core) whose colours, radii and angles ARE the uuid's own bytes. Same uuid ⇒ same SVG: the **visual is the address**, tamper-evident and zero-cost.
- **`uuidAnimation(uuid)`** — the same sigil with a byte-seeded rotation, **pure SMIL, no JS** (a computed field, like the ceccec background). The animation is the image plus deterministic motion.

This is the computable **"text → image / animation"**: the identity sigil of an address, improving all the related faces by unifying them under one rule — *the uuid decodes to every modality*.

**Honest boundary.** This renders the **address**, not the **meaning**. Semantic text-to-image / text-to-animation — a photorealistic scene *of the concept* — is a generative model (diffusion, the seed/oracle bit), NOT computable from a hash. The identity face is real and free; the semantic face is the model, wired honestly, never faked.

**Law — [[law]]: the uuid decodes to every modality — colour, sound, meaning, image, animation — by projection, and each identity face is deterministic (same uuid ⇒ same output, the face IS the address). Semantic generation of the meaning is the model, not the fold; render the address for free, and call the model the model.**

## Standards

- **SVG 1.1 / SMIL** — the deterministic vector image + animation.
- **Deterministic hash-to-art** — the identicon family (the visual as a function of the address).

Composes: [[color]] · [[signal]] · [[angle]] · [[law]].
