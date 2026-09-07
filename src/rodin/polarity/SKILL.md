---
name: polarity
description: "Use when reasoning about the two directions of the rodin doubling cycle — 3 and 6 are the polarity boundaries: forward helix (×2, cyan, outbound/give) ↔ reverse helix (×5, magenta, inbound/take). The mirror pair the coil winds between. Nested under rodin."
atomPath: "rodin/polarity"
coordinate: "rodin/polarity · 5/round · 8ab2534d"
contentUuid: "005098bd-aba1-56eb-b1ae-6cef72fe426a"
diamondUuid: "8474de53-67e8-8c3f-941d-773f54826eba"
uuid: "8ab2534d-8790-873d-8995-78e3acccebf6"
horo: 5
typography:
  partition: rodin
  bondDegree: 40
standards: []
bindings: []
signatures:
  computationUuid: "778b1658-f4d6-8e6d-bbb6-f2f8af4ed798"
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
      stageUuid: "a0ca1899-42d2-8a2d-823e-84321dabc655"
    - stage: seal
      stageUuid: "cc52bc7e-59e9-8077-aa20-4ddb623d6b9f"
    - stage: uuid
      stageUuid: "64d8946a-c908-82bc-a2c4-03ef049cb058"
version: 2
---
# polarity — the 3↔6 boundary (forward ×2 ↔ reverse ×5)

`polarity` is the **two-fold direction** of the [[coil]]. The doubling cycle runs forward as `×2 mod 9` (`1→2→4→8→7→5`) and mirror-reverse as `×5 mod 9` (`1→5→7→8→4→2`); the two helices wind opposite ways around the [[axis]]. **`3` and `6` are the boundaries** — the two poles the flow swings between (never landing on them):

- **`3` → C (cyan) — forward**: the `×2` helix, outbound, the [[give]]/out direction (in the signal model: who a node points *out* to).
- **`6` → M (magenta) — reverse**: the `×5` helix, inbound, the [[take]]/in direction (who points *in*).

This is the [[duality]] expressed in the vortex: forward↔reverse, give↔take, out↔in — at rest it is [[balance]]. The third primary `9` (Y, the [[axis]] close) and `0` (K, origin) are *not* polar — they resolve and anchor the pair (see [[cmyk]]: the C↔M gap is closed by Y at `9`).

Source: `~/github/ceccec/svilena-me/.vitepress/rodin.js` (forward/reverse helix `×2`/`×5`; `CHANNEL` forward=C / reverse=M).

Composes: [[rodin]] · [[coil]] · [[axis]] · [[cmyk]] · [[duality]] · [[give]]/[[take]] · [[balance]].
