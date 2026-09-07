---
name: image
description: "Use when a content-uuid needs a visual — its deterministic identity sigil (and animation). One more projection of the self-decoding uuid, beside color (the wave), signal (colour+sound), translation (meaning). uuidImage renders a mandala whose colours, radii and angles ARE the uuid's bytes; uuidAnimation adds byte-seeded SMIL rotation. Same uuid ⇒ same image — the visual IS the address. Honest: this renders the address, not the meaning; semantic text-to-image is a generative model (the seed)."
atomPath: image
coordinate: "image · 2/share · c4a9e95a"
contentUuid: "b9a80e6f-bd17-5ccd-a607-b8db64be5605"
diamondUuid: "8419f8c1-9f6b-8d02-9ff5-eab99d5a1330"
uuid: "c4a9e95a-7d79-8782-aa74-415081d1c649"
horo: 2
typography:
  partition: image
  bondDegree: 46
standards:
  - "SVG 1.1 / SMIL animation · deterministic hash-to-art (identicon family)"
bindings: []
signatures:
  computationUuid: "8756dc26-1f39-8e2b-9c48-9750755e549d"
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
      stageUuid: "2f203aa9-aa72-86b6-b9ae-d97bc309fb4d"
    - stage: seal
      stageUuid: "5d3f5ccd-0da5-85bb-b929-39b6ef310289"
    - stage: uuid
      stageUuid: "e9bd0848-3a0c-8619-a12d-abcf45163828"
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
