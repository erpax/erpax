---
name: widget
description: "Use when reasoning about widget — Every widget here is over an analytics view-model. The tile receives what it draws and computes nothing about where it came from — the fetch belongs to dashboard/spec, which owns…"
atomPath: widget
coordinate: "widget · 5/round · 1568b6bd"
contentUuid: "15b92f15-b815-53d3-8091-e6e8999487f9"
diamondUuid: "e503ff5d-f485-8509-ab09-758bff9c5f14"
uuid: "1568b6bd-1c89-890d-941a-15234fc3a5a3"
horo: 5
typography:
  partition: widget
  bondDegree: 23
standards:
  - "ECMA-262"
bindings: []
signatures:
  computationUuid: "0e76bf00-fa45-8b1a-aa87-d36434d259ff"
  stages:
    - stage: path
      stageUuid: "2fcfed58-b1bb-8df2-82e4-63cb4df5adac"
    - stage: trinity
      stageUuid: "07927967-6556-8928-8d41-1c6fac2b926c"
    - stage: boundary
      stageUuid: "bd14271a-6cb4-85ca-ac03-38551eca8c04"
    - stage: links
      stageUuid: "2abb72de-d16d-8e23-858f-043a95f273ec"
    - stage: horo
      stageUuid: "6655cd13-187b-8895-9531-7225323f7547"
    - stage: seal
      stageUuid: "bbcef7e4-3507-8546-a311-fdf6425eaa06"
    - stage: uuid
      stageUuid: "2b09d38e-ce13-84b2-bddb-ebc6bcf18d08"
version: 2
---
# widget — a dashboard tile renders a view-model; it never fetches one

Every widget here is `React.FC<{ data: VM | null }>` over an [[analytics]] view-model. The tile
receives what it draws and computes nothing about where it came from — the fetch belongs to
[[dashboard]]/spec, which owns the DataSource and hands the answer down.

That split is what makes a statement tile testable at all: a balance sheet is a pure function of its
view-model, so a fixture is a whole test and no boot is needed. It is also why the null case is a
render rather than a throw — `data: null` is *not loaded yet*, a state the tile must draw.

## The barrel is the address

`@/widget`, never `@/widget/TrialBalanceWidget` ([[convention]]/import). The deep path is an
internal spelling; the index is the contract, and the panels that are not re-exported here are not
part of it.

**Honest boundary.** These tiles are proven against view-models, never against the ledger — a
balance sheet that renders a wrong-but-well-formed VM passes. The arithmetic is [[analytics]]'s to
prove, and the posting behind it is [[accounting]]'s.

**Law — [[law]]: a tile draws its argument. The moment a widget fetches, its proof needs a
database, and the tile stops being a function.**

## Standards

- **WCAG 2.2 §1.3.1** — info and relationships: a section heading names the rows it owns.
- **ISO/IEC 25010:2023 §5.5** — testability: a pure render is provable from a fixture.

Composes: [[widget]]/section · [[analytics]] · [[dashboard]] · [[convention]]/import · [[law]].
