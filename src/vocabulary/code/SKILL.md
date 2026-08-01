---
name: code
description: "Use when master-data needs a unique short code — accounts, products, machines, teams, categories. The CodeConcern field-factory; code derived from name when absent; code is the human key, content-uuid the machine key."
atomPath: "vocabulary/code"
coordinate: "vocabulary/code · 7/descent · 60dc572f"
contentUuid: "dc90363b-498b-55a4-b96f-0eaf47e37fd7"
diamondUuid: "6ee3309d-e6da-8713-84fa-3ccd6d4a5686"
uuid: "60dc572f-8a75-86bc-8345-c86a18d0ab42"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 104
standards: []
bindings: []
signatures:
  computationUuid: "5a93f855-ffda-8100-9604-50f1d19d13c7"
  stages:
    - stage: path
      stageUuid: "81c8167f-d6a5-868d-8ffe-a7fd07876781"
    - stage: trinity
      stageUuid: "49297401-3320-8517-ab60-b0e329140829"
    - stage: boundary
      stageUuid: "197e0931-fb4d-8976-9168-e53b67f490b1"
    - stage: links
      stageUuid: "da6be5aa-2f5b-8bd6-8515-ae88f91cd8f5"
    - stage: horo
      stageUuid: "df13cfb2-512e-8100-9d2c-557ecce463ca"
    - stage: seal
      stageUuid: "ca31ea5d-c602-8427-b8da-e5f164794c74"
    - stage: uuid
      stageUuid: "a625291f-968a-8238-a7df-9815a404ef03"
version: 2
---
# code — the master-data human key

`code` is the coded-master-data atom (Rails `CodeConcern`: `set_code`, `find_or_create_by_code`): a [[fields]] field (position **1**) + a beforeChange [[hooks]]. Law: master-data carries a **unique `code`** scoped per tenant, derived from `name` when absent (initials/slug) in a beforeChange. The `code` is the human key; the content-`uuid` ([[identity]]) is the machine key — relate by uuid, display by code. Hierarchical codes (GL accounts' `/`-split tree) make the code itself the parent-address (see [[accounting]]).

Composes: [[fields]], [[hooks]], [[identity]], [[accounting]] (account-code tree).

A code can name a competency node too. When the master-data being coded is a competency/occupation, the code is its slot in a single mono-hierarchical skills taxonomy, and the standards below fix that taxonomy's current form.

## Common mistakes
- Relating by `code` instead of uuid (codes are editable/human; uuids federate).
- A global-unique code where it should be tenant-scoped.

## Standards

Applying this skill — coding a competency/occupation node — *is* implementing these standards (the answer-path: a correctly-coded node already satisfies the form).

- **ESCO v1.2.1** (patch, last update 10 Dec 2025; v1.2 was the May-2024 major release) — a competency is one node of a single mono-hierarchical skills taxonomy: one parent per concept, four sub-classifications, transversal-vs-occupation-specific reusability tiers.
- **SFIA 9** (published 30 Oct 2024; current edition on SFIA's ~3-year cycle, no SFIA 10 announced) — proficiency is one shared responsibility scale of levels 1–7, used identically for the level an actor *holds* and the level a job *requires*, so `gap = required − held` is a well-defined integer on that single scale.
- **ISCO-08** (still the in-force ILO edition; successor ISCO-28 is a 2026 draft to be finalized at ICLS-2028 for the 2030 census round — do **not** pre-cite it) — the occupation backbone (unit groups) onto which the skills taxonomy rolls up 1:1.

Form (the compliance rule this skill holds): a competency node rolls up 1:1 onto the ISCO-08 occupation backbone, proficiency is measured on the one shared SFIA 1–7 responsibility scale for both held and required, and `gap = required − held` is a well-defined integer on that scale.

Citation drift to repair: `SFIA 8` / `SFIA-8` is superseded — update to `SFIA 9` in `src/collections/Competencies/index.ts:15`, `src/fields/competency/index.ts:10`, `src/services/competency-gap/index.ts:9`, and the docstrings in `src/payload-types.ts`. The level model (7 levels, held-vs-required, `gap = required − held`) is unchanged in SFIA 9 — only the edition citation is wrong. `ESCO v1.2` may optionally bump to `v1.2.1` for precision (not an error of form). `ISCO-08` is correct as cited.

**Law — [[law]]: master-data carries a unique tenant-scoped `code` (derived from name when absent) as the human key, while the content-[[identity]] uuid is the machine key — relate by uuid, display by code.**
