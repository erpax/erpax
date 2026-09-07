---
name: code
description: "Use when master-data needs a unique short code — accounts, products, machines, teams, categories. The CodeConcern field-factory; code derived from name when absent; code is the human key, content-uuid the machine key."
atomPath: "vocabulary/code"
coordinate: "vocabulary/code · 1/base · 9fad0bca"
contentUuid: "531602ec-e8e5-54fe-9156-0127f5df8dd3"
diamondUuid: "ceeeb839-b238-815e-a130-9f757d12e167"
uuid: "9fad0bca-97a4-86b8-9cde-a7f7f846e680"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 103
standards: []
bindings: []
signatures:
  computationUuid: "f55c22b9-5d30-8a77-b41d-a631b4b06b42"
  stages:
    - stage: path
      stageUuid: "81c8167f-d6a5-868d-8ffe-a7fd07876781"
    - stage: trinity
      stageUuid: "49297401-3320-8517-ab60-b0e329140829"
    - stage: boundary
      stageUuid: "7d1b4ecc-a0cb-874e-a5ef-d72d4bc9b80f"
    - stage: links
      stageUuid: "3ab44cfc-3d39-8ace-b669-427a3fe5a812"
    - stage: horo
      stageUuid: "db45fc18-85ad-86bf-a107-a51f7ca2d354"
    - stage: seal
      stageUuid: "3c3767c7-d51e-8947-b8d0-6f61be3f7832"
    - stage: uuid
      stageUuid: "e0720b8b-48c2-8934-b837-4394fb8bb46b"
version: 2
---
# code — the master-data human key

`code` is the coded-master-data atom (Rails `CodeConcern`: `set_code`, `find_or_create_by_code`): a [[field]] field (position **1**) + a beforeChange [[hooks]]. Law: master-data carries a **unique `code`** scoped per tenant, derived from `name` when absent (initials/slug) in a beforeChange. The `code` is the human key; the content-`uuid` ([[identity]]) is the machine key — relate by uuid, display by code. Hierarchical codes (GL accounts' `/`-split tree) make the code itself the parent-address (see [[accounting]]).

Composes: [[field]], [[hooks]], [[identity]], [[accounting]] (account-code tree).

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
