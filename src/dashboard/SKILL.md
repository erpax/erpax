---
name: dashboard
description: "Use when each model needs a computed Payload admin view — its related links partitioned into the collections (plural) and models (singular) it composes, rendered via reusable component-atoms. Computed from the link graph, not hardcoded; each atom is Open Graph + schema.org compatible in all dimensions."
atomPath: dashboard
coordinate: dashboard · 1/base · 9695f373
contentUuid: "a53fa286-c652-595a-8dd9-88899305483d"
diamondUuid: "dd5f5398-4ab3-8624-9b15-f3d346a14e16"
uuid: "9695f373-5242-85d2-9d66-3f2fb6f64b9e"
horo: 1
bonds:
  in:
    - atom
    - aura
    - before
    - collection
    - collections
    - components
    - gate
    - identity
    - link
    - links
    - model
    - translate
    - trinity
    - website
  out:
    - atom
    - aura
    - before
    - collection
    - collections
    - components
    - gate
    - identity
    - link
    - links
    - model
    - translate
    - trinity
    - website
typography:
  partition: dashboard
  bondDegree: 0
  neighbors: []
standards:
  - "ECMA-262"
  - "EU-2024/1183"
  - "EU-2024/1620"
  - "EU-2024/1624"
  - "EU-CSDDD-2024/1760"
  - "ISO-27002"
  - "ISO/IEC-27002:2022"
  - MCP
  - "NIST-INCITS-359-2012"
bindings: []
neighbors:
  wikilink:
    - atom
    - aura
    - before
    - collection
    - collections
    - components
    - gate
    - identity
    - link
    - links
    - model
    - translate
    - trinity
    - website
  matrix:
    - atom
    - aura
    - before
    - collection
    - collections
    - components
    - gate
    - identity
    - link
    - links
    - model
    - translate
    - trinity
    - website
  backlinks:
    - atom
    - aura
    - before
    - collection
    - collections
    - components
    - gate
    - identity
    - link
    - links
    - model
    - translate
    - trinity
    - website
signatures:
  computationUuid: "b4a036ea-a7b0-8aa6-8c36-1f310ee943b3"
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
      stageUuid: "fb6362eb-a099-8a4c-bf04-30efc7bda72d"
    - stage: seal
      stageUuid: "526a7d4b-25e6-8ac2-a63f-9a3a81a7470c"
    - stage: uuid
      stageUuid: "f7d7378f-58f5-820c-9e7f-eb1b87cb23b2"
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
