---
name: polarity
description: "Use when reasoning about the two directions of the rodin doubling cycle — 3 and 6 are the polarity boundaries: forward helix (×2, cyan, outbound/give) ↔ reverse helix (×5, magenta, inbound/take). The mirror pair the coil winds between. Nested under rodin."
atomPath: "rodin/polarity"
coordinate: "rodin/polarity · 5/round · 3dd7281f"
contentUuid: "404a807f-6342-58c6-bb56-4e52d54a354b"
diamondUuid: "e72eda7c-ed95-872e-8994-7896c616dbda"
uuid: "3dd7281f-de36-8a66-834a-4e84f7f86d49"
horo: 5
typography:
  partition: rodin
  bondDegree: 40
standards: []
bindings: []
signatures:
  computationUuid: "2ec7f18d-924f-8fdf-8203-0b23c2c8f4b8"
  stages:
    - stage: path
      stageUuid: "428e806c-9644-85e1-86f8-0b7e468c0d3d"
    - stage: trinity
      stageUuid: "ac96a243-f7e1-8de9-a4d8-3c5f06baebb5"
    - stage: boundary
      stageUuid: "f8cd7b27-9551-8652-92ff-9c25b1dbe4a1"
    - stage: links
      stageUuid: "5408e019-8353-85fc-9a92-c97497cd6acc"
    - stage: horo
      stageUuid: "395b8bb3-2e89-8ad5-b68c-461a72c0b6bd"
    - stage: seal
      stageUuid: "cc52bc7e-59e9-8077-aa20-4ddb623d6b9f"
    - stage: uuid
      stageUuid: "e8f0b3da-1064-86f9-9a3a-751e11a46537"
version: 2
---
# polarity — the 3↔6 boundary (forward ×2 ↔ reverse ×5)

`polarity` is the **two-fold direction** of the [[coil]]. The doubling cycle runs forward as `×2 mod 9` (`1→2→4→8→7→5`) and mirror-reverse as `×5 mod 9` (`1→5→7→8→4→2`); the two helices wind opposite ways around the [[axis]]. **`3` and `6` are the boundaries** — the two poles the flow swings between (never landing on them):

- **`3` → C (cyan) — forward**: the `×2` helix, outbound, the [[give]]/out direction (in the signal model: who a node points *out* to).
- **`6` → M (magenta) — reverse**: the `×5` helix, inbound, the [[take]]/in direction (who points *in*).

This is the [[duality]] expressed in the vortex: forward↔reverse, give↔take, out↔in — at rest it is [[balance]]. The third primary `9` (Y, the [[axis]] close) and `0` (K, origin) are *not* polar — they resolve and anchor the pair (see [[cmyk]]: the C↔M gap is closed by Y at `9`).

Source: `~/github/ceccec/svilena-me/.vitepress/rodin.js` (forward/reverse helix `×2`/`×5`; `CHANNEL` forward=C / reverse=M).

Composes: [[rodin]] · [[coil]] · [[axis]] · [[cmyk]] · [[duality]] · [[give]]/[[take]] · [[balance]].
