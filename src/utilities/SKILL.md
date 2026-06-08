---
name: utilities
description: "Use when you need a pure helper, a Payload/Next/tenant glue function, or an admin React hook and it does NOT implement a standard's algorithm — the non-standards helper layer that may cite standards but never implements them."
atomPath: utilities
coordinate: utilities · 8/crest · 0a22b9b9
contentUuid: "b222698c-12c9-5907-8822-c828b1d5b895"
diamondUuid: "ca63afb2-f53d-8930-a9f9-33ae15d1dfea"
uuid: "0a22b9b9-d564-88a5-afd9-eff40bf6f1f8"
horo: 8
bonds:
  in:
    - all
    - collapse
    - config
    - identity
    - matter
    - proof
    - society
    - standard
  out:
    - all
    - collapse
    - config
    - identity
    - matter
    - proof
    - society
    - standard
typography:
  partition: utilities
  bondDegree: 24
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - all
    - collapse
    - config
    - identity
    - matter
    - proof
    - society
    - standard
  matrix:
    - all
    - collapse
    - config
    - identity
    - matter
    - proof
    - society
    - standard
  backlinks:
    - all
    - collapse
    - config
    - identity
    - matter
    - proof
    - society
    - standard
signatures:
  computationUuid: "b182292a-f772-8073-a191-6917ad1eaf66"
  stages:
    - stage: path
      stageUuid: "85499cae-a3de-8d06-b5da-dd72ad73e566"
    - stage: trinity
      stageUuid: "d263db6c-08d7-8c49-93c2-40bacb15be62"
    - stage: boundary
      stageUuid: "784b457f-3c4a-807e-86f4-c6c265d5897c"
    - stage: links
      stageUuid: "e2a07171-8001-84f1-aae8-08ac2468999e"
    - stage: horo
      stageUuid: "7dae4a51-6d2f-86b8-923f-c082a17bea60"
    - stage: seal
      stageUuid: "0a3a531c-cdc9-87ca-acd0-478defe44a16"
    - stage: uuid
      stageUuid: "837dc796-9e2a-8aaa-9c0f-a9c9c50062bd"
version: 2
---
# utilities — the non-standards helper layer (domain glue, not vendor-spec)

Utilities is the society's **glue drawer** — pure functions over project shapes (`extractID`, `deepMerge`, `toKebabCase`, `formatAuthors`), Payload/Next/tenant glue (`getMeUser`, `getTenantFromRequest`, `getCollectionIDType`, `siteTenantWhere`, `payloadSdk`), and admin/site React hooks (`useClickableCard`, `useDebounce`, `canUseDOM`). It is a genuine grab-bag by construction — there is no single algorithm here, only the assembly the rest of the society leans on.

Its **one law is a boundary, not a behaviour**: a file here may *cite* a standard (`@standard`/`@rfc`/`@security` JSDoc — `errors` → RFC 7807, `scopes` → ISO-27001 tenant-isolation, `getPreviewSecret` → NIST SP 800-108) but must **never implement** one. The difference is intent — this folder *uses* standards; [[standard]] (`src/standards/<id>/`) *implements* them. The moment a helper grows a code-table, validator, or message schema it leaves this drawer and [[collapse]]s into `src/standards/`, leaving at most a `@deprecated` re-export shim. That boundary is what keeps the layer honest; see `README.md` for the belongs/does-not-belong list.

Matter-twin: each helper is its own `<name>/index.ts` (35+ leaves — `errors/`, `scopes/`, `safely/`, `tenant-context/`, `seeding/`, `billing/`), no root barrel — import the leaf directly. Composes [[standard]] · [[config]] · [[identity]] · [[society]] · [[proof]] · [[all]] · [[matter]].
