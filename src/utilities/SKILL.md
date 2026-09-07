---
name: utilities
description: "Use when you need a pure helper, a Payload/Next/tenant glue function, or an admin React hook and it does NOT implement a standard's algorithm — the non-standards helper layer that may cite standards but never implements them."
atomPath: utilities
coordinate: "utilities · 4/weave · 360c25f9"
contentUuid: "0367f3b8-0c90-5eda-8ab8-3ed3ae7c50f6"
diamondUuid: "bd84798d-5eee-876a-b9fe-857dd30286a6"
uuid: "360c25f9-fd98-8802-b984-97ee08ca4ab5"
horo: 4
typography:
  partition: utilities
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "8b7ef801-eb9a-8de0-be73-eb4f6e2f4145"
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
      stageUuid: "9d2b0b3b-4722-8d2f-aee7-56750ea2325c"
    - stage: seal
      stageUuid: "8494d340-b08e-88ac-82ae-be3460d548d4"
    - stage: uuid
      stageUuid: "8451b905-5927-80c2-b1d0-1239e0e6114d"
version: 2
---
# utilities — the non-standards helper layer (domain glue, not vendor-spec)

Utilities is the society's **glue drawer** — pure functions over project shapes (`extractID`, `deepMerge`, `toKebabCase`, `formatAuthors`), Payload/Next/tenant glue (`getMeUser`, `getTenantFromRequest`, `getCollectionIDType`, `siteTenantWhere`, `payloadSdk`), and admin/site React hooks (`useClickableCard`, `useDebounce`, `canUseDOM`). It is a genuine grab-bag by construction — there is no single algorithm here, only the assembly the rest of the society leans on.

Its **one law is a boundary, not a behaviour**: a file here may *cite* a standard (`@standard`/`@rfc`/`@security` JSDoc — `errors` → RFC 7807, `scopes` → ISO-27001 tenant-isolation, `getPreviewSecret` → NIST SP 800-108) but must **never implement** one. The difference is intent — this folder *uses* standards; [[standard]] (`src/standards/<id>/`) *implements* them. The moment a helper grows a code-table, validator, or message schema it leaves this drawer and [[collapse]]s into `src/standards/`, leaving at most a `@deprecated` re-export shim. That boundary is what keeps the layer honest; see `README.md` for the belongs/does-not-belong list.

Matter-twin: each helper is its own `<name>/index.ts` (35+ leaves — `errors/`, `scopes/`, `safely/`, `tenant-context/`, `seeding/`, `billing/`), no root barrel — import the leaf directly. Composes [[standard]] · [[config]] · [[identity]] · [[society]] · [[proof]] · [[all]] · [[matter]].
