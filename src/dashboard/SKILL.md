---
name: dashboard
description: "Use when each model needs a computed Payload admin view — its related links partitioned into the collections (plural) and models (singular) it composes, rendered via reusable component-atoms. Computed from the link graph, not hardcoded; each atom is Open Graph + schema.org compatible in all dimensions."
atomPath: dashboard
coordinate: "dashboard · 1/base · eba8351b"
contentUuid: "8c73652c-eab5-500a-8983-cb3e4689689e"
diamondUuid: "3d581970-839c-8c1d-a107-b0b183967059"
uuid: "eba8351b-29f2-83e0-8713-cf1adb47b5df"
horo: 1
typography:
  partition: dashboard
  bondDegree: 0
standards:
  - "ECMA-262"
  - "EU-CSDDD-2024/1760"
  - "ISO-27002"
  - "ISO/IEC-27002:2022"
  - MCP
  - "NIST-INCITS-359-2012"
bindings: []
signatures:
  computationUuid: "e2384b5c-07d2-8df0-afb2-ad1492db642f"
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
      stageUuid: "59e28f93-6931-85e5-8b81-c8aff68950fe"
    - stage: seal
      stageUuid: "526a7d4b-25e6-8ac2-a63f-9a3a81a7470c"
    - stage: uuid
      stageUuid: "7855260b-a8a7-8256-85e8-b6a39dab7bdf"
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
