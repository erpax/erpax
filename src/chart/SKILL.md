---
name: chart
description: Use when specifying a chart as pure data — a numeric series with its range and a deterministic normalizer to [0,1]; rendering is the quantum facet (colour per value via the analog aura).
---

# chart — a chart as pure data

A pure chart spec: a numeric [[series]] with its range and a deterministic **normalizer** to [0,1] (the [[scale]]). No rendering — just the spec as [[data]], so it is testable and content-addressable. The [[quantum]]/chart facet renders it through the analog aura (a colour per value from the [[color]] spectrum). Composes [[series]] · [[data]] · [[scale]].

Matter-twin: `src/chart/index.ts` (`Chart` · `chart` · `normalize`). Composes [[series]] · [[data]] · [[scale]] · [[quantum]].
