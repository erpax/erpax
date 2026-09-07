---
name: dashboard
description: "Use when each model needs a computed Payload admin view — its related links partitioned into the collections (plural) and models (singular) it composes, rendered via reusable component-atoms. Computed from the link graph, not hardcoded; each atom is Open Graph + schema.org compatible in all dimensions."
atomPath: dashboard
coordinate: "dashboard · 1/base · a16fc130"
contentUuid: "c6c26df8-31e1-5ac4-9e18-4d2f95136b8e"
diamondUuid: "9d688e7f-2a57-8d92-8796-2ecac4f9639e"
uuid: "a16fc130-bc10-82b6-a2ba-40249e7f0953"
horo: 1
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
  computationUuid: "bf2b434f-b6fd-848e-94ce-b4d5c1277884"
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
      stageUuid: "a73ecd9b-2f5f-88af-a4f2-9957b38b3dfb"
    - stage: seal
      stageUuid: "6a638cb4-aab4-8b1d-a1a8-f30d233345fa"
    - stage: uuid
      stageUuid: "360db5f6-4efb-8fa3-9791-a007feeb7cdb"
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
