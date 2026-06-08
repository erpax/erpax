---
name: code
description: "Use when master-data needs a unique short code — accounts, products, machines, teams, categories. The CodeConcern field-factory; code derived from name when absent; code is the human key, content-uuid the machine key."
atomPath: code
coordinate: code · 7/descent · 6f079482
contentUuid: "a347085a-8cfc-5525-996f-85e81d7b3186"
diamondUuid: "7e8ab448-a216-88ef-b896-8bbb9c3b9dc1"
uuid: "6f079482-c2ca-8812-9c87-9c73736192ee"
horo: 7
bonds:
  in:
    - account
    - accounting
    - acriss
    - branch
    - category
    - cheat
    - collapse
    - course
    - derive
    - error
    - fields
    - generate
    - has
    - hooks
    - iata
    - icao
    - identity
    - iso
    - isrc
    - iswc
    - law
    - lei
    - medical
    - postal
    - prefix
    - range
    - repository
    - sample
    - seed
    - set
    - software
    - specification
    - term
    - unit
  out:
    - account
    - accounting
    - acriss
    - branch
    - category
    - cheat
    - collapse
    - course
    - derive
    - error
    - fields
    - generate
    - has
    - hooks
    - iata
    - icao
    - identity
    - iso
    - isrc
    - iswc
    - law
    - lei
    - medical
    - postal
    - prefix
    - range
    - repository
    - sample
    - seed
    - set
    - software
    - specification
    - term
    - unit
typography:
  partition: code
  bondDegree: 103
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accounting
    - fields
    - hooks
    - identity
    - law
  matrix:
    - account
    - accounting
    - acriss
    - branch
    - category
    - cheat
    - collapse
    - course
    - derive
    - error
    - fields
    - generate
    - has
    - hooks
    - iata
    - icao
    - identity
    - iso
    - isrc
    - iswc
    - law
    - lei
    - medical
    - postal
    - prefix
    - range
    - repository
    - sample
    - seed
    - set
    - software
    - specification
    - term
    - unit
  backlinks:
    - account
    - accounting
    - acriss
    - branch
    - category
    - cheat
    - collapse
    - course
    - derive
    - error
    - fields
    - generate
    - has
    - hooks
    - iata
    - icao
    - identity
    - iso
    - isrc
    - iswc
    - law
    - lei
    - medical
    - postal
    - prefix
    - range
    - repository
    - sample
    - seed
    - set
    - software
    - specification
    - term
    - unit
signatures:
  computationUuid: "01358ec6-c6a5-8d88-ac2e-4024e82e4e13"
  stages:
    - stage: path
      stageUuid: "2beda239-8dbb-81a3-b69d-ff391ebafdad"
    - stage: trinity
      stageUuid: "2905c147-2ad0-8c46-89c8-ed4239420647"
    - stage: boundary
      stageUuid: "a4f813e6-7390-8b7e-95e7-7b21e2ba1d5e"
    - stage: links
      stageUuid: "781a20d7-801a-8089-a360-116b68c56899"
    - stage: horo
      stageUuid: "d0c83865-1456-8bd1-9d89-2c8a590d3c3f"
    - stage: seal
      stageUuid: "045581e7-71ef-89f2-ac1d-bc61b57786e0"
    - stage: uuid
      stageUuid: "159e9d4d-9a33-8196-b929-d4dd29c508c4"
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
