---
name: variant
description: "Use when modeling product options, SKU expansion, or feature flags — sizes, colors, configurations, market-specific variants without a fixed grid. The unbounded product dimension."
atomPath: variant
coordinate: variant · 2/share · 1fbf462e
contentUuid: "7ee18a1f-cfbb-5309-951f-c5bd2bcfb930"
diamondUuid: "e9f1dd69-491f-8429-80ac-6cb155f82b93"
uuid: "1fbf462e-20f1-8352-a269-0785b237e275"
horo: 2
bonds:
  in:
    - agriculture
    - bundle
    - commerce
    - cover
    - crop
    - cropplan
    - family
    - hardiness
    - items
    - law
    - manufacturing
    - maturity
    - scion
    - seed
    - tags
    - taxonomy
    - yield
  out:
    - agriculture
    - bundle
    - commerce
    - cover
    - crop
    - cropplan
    - family
    - hardiness
    - items
    - law
    - manufacturing
    - maturity
    - scion
    - seed
    - tags
    - taxonomy
    - yield
typography:
  partition: variant
  bondDegree: 53
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - agriculture
    - commerce
    - crop
    - cropplan
    - hardiness
    - items
    - law
    - maturity
    - seed
    - tags
    - taxonomy
    - yield
  matrix:
    - agriculture
    - bundle
    - commerce
    - cover
    - crop
    - cropplan
    - family
    - hardiness
    - items
    - law
    - manufacturing
    - maturity
    - scion
    - seed
    - tags
    - taxonomy
    - yield
  backlinks:
    - agriculture
    - bundle
    - commerce
    - cover
    - crop
    - cropplan
    - family
    - hardiness
    - items
    - law
    - manufacturing
    - maturity
    - scion
    - seed
    - tags
    - taxonomy
    - yield
signatures:
  computationUuid: "ee7321ad-57ff-8e3e-9b3d-fdda05de6e70"
  stages:
    - stage: path
      stageUuid: "8e4f7495-cd46-8efa-916a-3671849f13d2"
    - stage: trinity
      stageUuid: "e53fa135-9aae-844c-b776-e2143b76eb34"
    - stage: boundary
      stageUuid: "493f2fd8-0acb-88f3-b12c-12d346418597"
    - stage: links
      stageUuid: "e27be61c-f59a-8c84-a8e8-144e7bb1abea"
    - stage: horo
      stageUuid: "58c9794d-a047-8ca4-baf6-df891c874f5d"
    - stage: seal
      stageUuid: "25417aff-bd8f-8480-a0d8-0e9e556ea146"
    - stage: uuid
      stageUuid: "7e205e0a-a79e-8f93-987f-621ead08ed3f"
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
