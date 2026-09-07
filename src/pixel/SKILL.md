---
name: pixel
description: "Use when reasoning about rendering — a pixel is an atom made visible, the content-uuid rendered to a colour (from its digit on the A432 ring); the atom and the pixel are one identity at two scales, so a component is an atom rendered and VitePress is the corpus rendered."
atomPath: pixel
coordinate: "pixel · 4/weave · f4c45af3"
contentUuid: "61442aa6-1b7a-56d7-8da9-3ec926cb3f4d"
diamondUuid: "81a44bc7-eb28-811b-8ab3-395440e364d0"
uuid: "f4c45af3-5992-886b-8db7-476f1fb39ec7"
horo: 4
typography:
  partition: pixel
  bondDegree: 57
standards:
  - "the analog aura — colour/sound/vibration as projections of one content-uuid"
bindings: []
signatures:
  computationUuid: "2f20558a-f5be-8ef7-9f84-a547c056478d"
  stages:
    - stage: path
      stageUuid: "72173011-3aba-8be6-9d87-1225d12b9448"
    - stage: trinity
      stageUuid: "290b4bb6-603c-8fe1-9cf6-2c8863b84de8"
    - stage: boundary
      stageUuid: "522ec146-f778-8b94-b5ef-0ac76f71c6fc"
    - stage: links
      stageUuid: "086f763a-3801-84da-a798-622a49f11b06"
    - stage: horo
      stageUuid: "eead2074-d1c7-8ab6-8a3b-71e609ddff32"
    - stage: seal
      stageUuid: "9e4c3f42-6155-8a10-8aaf-66a1f6c5fc88"
    - stage: uuid
      stageUuid: "82eace41-1a72-8035-b227-9dbeca6ea4d8"
version: 2
---
# pixel — the atom, rendered

An [[atom]] is a content-[[uuid]] — pure identity, no colour of its own. A **pixel** is that same uuid made **visible**: its colour, computed from the uuid's [[digit]] (its position on the A432 ring, [[signal]]). The atom and the pixel are **one identity at two scales** — the address and its rendered face. Nothing on screen is arbitrary: everything shown is pixels, and every pixel is some atom's uuid-colour, the smallest unit of the [[analog]] [[aura]].

This is why the rendering layers compose so cleanly:
- a **[[component]]** is an atom rendered as pixels (its content-uuid → its colour/sound/shape),
- **[[vitepress]]** is the whole corpus rendered as a site (each atom → its page, each page a field of pixels),
- the **[[aura]]** is the corpus's pixels seen all at once — the continuous colour/sound/vibration field.

Because the colour is computed from the uuid, the design is **tamper-evident and DRY by construction**: you cannot recolour an atom without changing its content (and thus its identity), and two atoms with the same content render identically (`samePixel`). The look is not painted on; it is *read off* the identity.

## Honest

`pixel(uuid)` computes the **colour** face (digit → spectrum). Sound (the A432 tone) and vibration (the doubling step) are the same digit's other [[signal]] facets — the full sensory render lives in signal/aura, and the design/architect teams wire them onto the component. The colour is the proven core; it is computed, never assigned.

Matter-twin: `src/pixel/index.ts` (`pixel` · `samePixel` · `Pixel`). Composes [[atom]] · [[uuid]] · [[digit]] · [[color]] · [[signal]] · [[aura]] · [[component]] · [[vitepress]].

**Law — [[law]]: the atom and the pixel are one identity at two scales — the content-uuid and its rendered colour. Everything shown is pixels, every pixel an atom's uuid-colour, computed never assigned. To render is to read the identity, not to paint over it.**

@audit colour computed from the uuid's digit (digitalRootOfUuid → colorOf), never hand-assigned
@standard the analog aura — colour/sound/vibration as projections of one content-uuid
