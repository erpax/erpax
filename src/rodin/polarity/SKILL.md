---
name: polarity
description: "Use when reasoning about the two directions of the rodin doubling cycle — 3 and 6 are the polarity boundaries: forward helix (×2, cyan, outbound/give) ↔ reverse helix (×5, magenta, inbound/take). The mirror pair the coil winds between. Nested under rodin."
atomPath: "rodin/polarity"
coordinate: "rodin/polarity · 2/share · 9c7494f5"
contentUuid: "29e04c35-c1dc-5aee-a25e-bd23e98af966"
diamondUuid: "8b204065-1dac-87e8-82b1-2626601240f4"
uuid: "9c7494f5-c5e3-8a3f-a5f3-dbf7031a7a9e"
horo: 2
typography:
  partition: rodin
  bondDegree: 40
standards: []
bindings: []
signatures:
  computationUuid: "8c3de361-d152-8a00-b80c-9d85d08dab0d"
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
      stageUuid: "b0112a1e-f62a-8b20-9fca-86b21b2bc0ff"
    - stage: seal
      stageUuid: "cc52bc7e-59e9-8077-aa20-4ddb623d6b9f"
    - stage: uuid
      stageUuid: "ee4fdeb0-4661-837b-a845-a11325c721d5"
version: 2
---
# polarity — the 3↔6 boundary (forward ×2 ↔ reverse ×5)

`polarity` is the **two-fold direction** of the [[coil]]. The doubling cycle runs forward as `×2 mod 9` (`1→2→4→8→7→5`) and mirror-reverse as `×5 mod 9` (`1→5→7→8→4→2`); the two helices wind opposite ways around the [[axis]]. **`3` and `6` are the boundaries** — the two poles the flow swings between (never landing on them):

- **`3` → C (cyan) — forward**: the `×2` helix, outbound, the [[give]]/out direction (in the signal model: who a node points *out* to).
- **`6` → M (magenta) — reverse**: the `×5` helix, inbound, the [[take]]/in direction (who points *in*).

This is the [[duality]] expressed in the vortex: forward↔reverse, give↔take, out↔in — at rest it is [[balance]]. The third primary `9` (Y, the [[axis]] close) and `0` (K, origin) are *not* polar — they resolve and anchor the pair (see [[cmyk]]: the C↔M gap is closed by Y at `9`).

Source: `~/github/ceccec/svilena-me/.vitepress/rodin.js` (forward/reverse helix `×2`/`×5`; `CHANNEL` forward=C / reverse=M).

Composes: [[rodin]] · [[coil]] · [[axis]] · [[cmyk]] · [[duality]] · [[give]]/[[take]] · [[balance]].
