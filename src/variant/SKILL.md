---
name: variant
description: "Use when modeling product options, SKU expansion, or feature flags — sizes, colors, configurations, market-specific variants without a fixed grid. The unbounded product dimension."
atomPath: variant
coordinate: "variant · 2/share · 9591e2e6"
contentUuid: "19bf4b26-38a8-5a7a-9e06-14d1e68eda50"
diamondUuid: "4676830a-cc0b-82df-a50f-b79ac4f88961"
uuid: "9591e2e6-2346-8ac1-bffc-74e01d4a1ad5"
horo: 2
typography:
  partition: variant
  bondDegree: 63
standards:
  - "Commerce/product taxonomy — the open variant dimension (no cultivar/option enum)"
bindings: []
signatures:
  computationUuid: "7933cb13-fffa-8bbd-a3ec-63734454340e"
  stages:
    - stage: path
      stageUuid: "8e4f7495-cd46-8efa-916a-3671849f13d2"
    - stage: trinity
      stageUuid: "0188df51-5cd1-81bb-b8f4-d041f2705e15"
    - stage: boundary
      stageUuid: "b2af01c7-3a5c-8c03-8a8c-c1442abe5d62"
    - stage: links
      stageUuid: "fae8f567-9197-8009-89eb-263d247026aa"
    - stage: horo
      stageUuid: "0b3640b7-bef6-8e30-9299-810124d28093"
    - stage: seal
      stageUuid: "2a91f0bd-8ec8-8a12-b806-ff5ee2db1b49"
    - stage: uuid
      stageUuid: "0e87b2f4-c182-8429-b12f-8277a8953f3c"
version: 2
---
# variant

Use when modeling product options, SKU expansion, or feature flags — sizes, colors, configurations, market-specific variants without a fixed grid. The unbounded product dimension.

**A crop cultivar is the agricultural variant.** A [[crop]] species expands into named varieties the same unbounded way a garment expands into sizes/colors — **open-pollinated** (breeds true, seed-saveable), **F1 hybrid** (vigorous, doesn't breed true), **heirloom** (old stable OP), **landrace** (locally-adapted, diverse). Each is a variant of the species on the [[taxonomy]] ladder (family → genus → species → *cultivar*), carrying its own [[maturity]] (days-to-maturity), [[hardiness]], disease resistance, and [[yield]] — selected in the [[cropplan]] and ordered as [[seed]]. Same no-fixed-grid law: never a cultivar enum, an open dimension.

Composes: [[Items]] · [[commerce]] · [[tags]] · [[crop]] · [[taxonomy]] · [[seed]] · [[maturity]] · [[hardiness]] · [[cropplan]] · [[yield]] · [[agriculture]].

## The matter — the generator, not the rows

Matter-twin: `src/variant/index.ts` — `expandVariants` · `expansionFactor` · `variantUuid`. erpax stores the **generator**, never the denormalised output: give it composable dimensions and the variant space falls out, so adding a colour grows the space with **no schema change**. Identity is the fold ([[merge]]): a variant IS `fold(product ⊗ sorted dimension values)`, so the same composition declared in any order is one uuid and duplicates merge instead of multiplying — the dedup that makes an unbounded space safe.

**Data-truth (etrima `product_variants`, N=42 979 over 3 513 products — 20 years of real garment production):**

- **~12.2 variants per product** mean expansion, distribution 1..N with **no cap** — unbounded in fact, not only in principle.
- The dimension is **free text, never an enum**: `PAOLA 80/20 3090 RUBINO NEW MILL STOCK` composes base ⊗ colour-code ⊗ colour ⊗ mill-qualifier. Two decades produced **no closed vocabulary** — the law below is empirically confirmed, not asserted.
- `status` and `metadata` are **100% NULL** — dead columns, not ported; lifecycle lives on the parent.
- `name` present on 70%, `description` on 41% — both optional, so a variant is identified by its **composition**, not its prose.

This is why the etrima table is *not* copied: those 42 979 rows are the **output** of this generator ([[port]] — the one anti-pattern never ported literally).

**Law — [[law]]: a variant is the unbounded product dimension — sizes, colors, configurations, or a crop cultivar — never a fixed grid or enum; the species expands into named variants the same open way a garment expands into options.**

## Standards
- Commerce/product taxonomy
