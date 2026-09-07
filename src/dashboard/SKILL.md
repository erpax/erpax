---
name: dashboard
description: "Use when each model needs a computed Payload admin view — its related links partitioned into the collections (plural) and models (singular) it composes, rendered via reusable component-atoms. Computed from the link graph, not hardcoded; each atom is Open Graph + schema.org compatible in all dimensions."
atomPath: dashboard
coordinate: "dashboard · 5/round · a85f51d5"
contentUuid: "d322ba59-6238-51e7-a543-6f045e2854e9"
diamondUuid: "ebc712f3-00b0-86a6-9bd7-31f3d3461d11"
uuid: "a85f51d5-7c3d-88dd-b839-c0faa6b3b1b3"
horo: 5
typography:
  partition: dashboard
  bondDegree: 46
standards:
  - "ECMA-262"
  - "ECMA-262 ECMAScript-2024 baseline"
  - "EU-CSDDD-2024/1760"
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "ISO-27002"
  - "ISO-4217:2015 currency-codes monetary-display"
  - "ISO/IEC-27002:2022"
  - MCP
  - "NIST INCITS-359 role-based-access-control"
  - "NIST-INCITS-359-2012"
bindings: []
signatures:
  computationUuid: "8b417d3e-2316-8b44-b3e2-91ce9d325fd6"
  stages:
    - stage: path
      stageUuid: "deb8c079-da08-8019-9459-9f3a08003bb9"
    - stage: trinity
      stageUuid: "c3701f30-0dda-85bb-8852-6387a594db13"
    - stage: boundary
      stageUuid: "776f5dee-ff2e-8403-915c-10ea22985932"
    - stage: links
      stageUuid: "857c3683-4dab-8201-b18b-5b0df077442b"
    - stage: horo
      stageUuid: "eb8f0130-a183-8c5d-aaee-ccdcf2790fd7"
    - stage: seal
      stageUuid: "6a638cb4-aab4-8b1d-a1a8-f30d233345fa"
    - stage: uuid
      stageUuid: "a126b476-ee7e-86b8-8f04-85cf77e6070c"
version: 2
---
# dashboard — each model's computed admin view (under [[before]])

FORM: **each [[model]] IS a Payload dashboard wired with all its related [[links]] and [[collections]].** A model's outbound [[links]] (computed by [[aura]] from its SKILL.md) are partitioned by the singular/plural matrix ([[translate]]): a link that is a registered [[collection]] slug (plural) is a related COLLECTION — paired with its model = `singularOf(slug)` — and every other link is a related [[model]]/atom. The view renders through REUSABLE components, and **each component is itself an [[atom]]** (single-word folder, the [[trinity]]). Computed, not hardcoded — a new [[link]] adds a card at zero cost.

**All computational; every atom is Open Graph + schema.org compatible in all dimensions.** Each card is a [[website]] seo-vortex face — `renderJsonLd` (schema.org JSON-LD) + `renderOgMeta` (Open Graph) — so the same atom is the VitePress page, the Payload row, the search doc, AND the OG/LD object, all computed from its content-[[identity]] (`contentUuid` + `name` + `description`), never duplicated per surface.

Matter-twin: `src/dashboard/index.tsx` — the admin `Dashboard` component + `formatCurrency`, plus `modelDashboard` (partition links → related collections + models). Pure; the links + slugs come from [[aura]] + the collections registry. Rendered by component-atoms hosted in [[before]]/dashboard.
Composes: [[before]] · [[model]] · [[collection]] · [[collections]] · [[links]] · [[aura]] · [[translate]] · [[website]] · [[components]] · [[atom]] · [[trinity]] · [[identity]].

## Standards
- WAI-ARIA 1.2 (the rendered panel) · schema.org + Open Graph (every atom, via seo-vortex) · the singular/plural matrix ([[translate]])

## Common mistakes
- Hardcoding a model's related collections — they are COMPUTED from its [[links]] ∩ the registered collection slugs.
- A component that is not an atom — every reusable component is a single-word [[atom]] (folder + [[trinity]]).

**Law — [[gate]]** Each model's dashboard is its computed neighbourhood — every related link resolves, partitioned into collection (plural) or model (singular), rendered by component-atoms, each atom Open-Graph + schema.org compatible — or the view is hand-wired (entropy > 0).
