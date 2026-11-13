---
name: variant
description: "Use when modeling product options, SKU expansion, or feature flags — sizes, colors, configurations, market-specific variants without a fixed grid. The unbounded product dimension."
atomPath: variant
coordinate: "variant · 4/weave · fc3d64bc"
contentUuid: "8d8fa3e4-b2fe-5509-b768-dca56ee8bfe1"
diamondUuid: "393173eb-167d-8c8e-8917-c7abad9bfc8f"
uuid: "fc3d64bc-c61a-8283-b72e-eb531fbc2abe"
horo: 4
typography:
  partition: variant
  bondDegree: 29
standards:
  - "Commerce/product taxonomy — the open variant dimension (no cultivar/option enum)"
bindings: []
signatures:
  computationUuid: "317bc4ba-c24d-8ecb-a090-34dfb9b84390"
  stages:
    - stage: path
      stageUuid: "8e4f7495-cd46-8efa-916a-3671849f13d2"
    - stage: trinity
      stageUuid: "0188df51-5cd1-81bb-b8f4-d041f2705e15"
    - stage: boundary
      stageUuid: "b2af01c7-3a5c-8c03-8a8c-c1442abe5d62"
    - stage: links
      stageUuid: "09829c71-e16c-8bdc-924a-7fbd165ebaee"
    - stage: horo
      stageUuid: "d25c8f8f-cb58-877c-be52-915623adf92b"
    - stage: seal
      stageUuid: "2a91f0bd-8ec8-8a12-b806-ff5ee2db1b49"
    - stage: uuid
      stageUuid: "e61325f0-0067-86d3-951a-6d7406103b51"
version: 2
---
# variant

Use when modeling product options, SKU expansion, or feature flags — sizes, colors, configurations, market-specific variants without a fixed grid. The unbounded product dimension.

**A crop cultivar is the agricultural variant.** A crop species expands into named varieties the same unbounded way a garment expands into sizes/colors — **open-pollinated** (breeds true, seed-saveable), **F1 hybrid** (vigorous, doesn't breed true), **heirloom** (old stable OP), **landrace** (locally-adapted, diverse). Each is a variant of the species on the taxonomy ladder (family → genus → species → *cultivar*), carrying its own maturity (days-to-maturity), hardiness, disease resistance, and yield — selected in the cropplan and ordered as [[seed]]. Same no-fixed-grid law: never a cultivar enum, an open dimension.

Composes: [[Items]] · [[commerce]] · [[tags]] · crop · taxonomy · [[seed]] · maturity · hardiness · cropplan · yield · [[agriculture]].

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
