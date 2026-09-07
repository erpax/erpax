---
name: utilities
description: "Use when you need a pure helper, a Payload/Next/tenant glue function, or an admin React hook and it does NOT implement a standard's algorithm — the non-standards helper layer that may cite standards but never implements them."
atomPath: utilities
coordinate: "utilities · 5/round · 048442a9"
contentUuid: "69d7607a-9693-513e-b86a-9dca4c71990a"
diamondUuid: "b9488c34-77d7-8aa8-992f-c12f58bbbd36"
uuid: "048442a9-ef95-80a0-92c8-02617aa3c31f"
horo: 5
typography:
  partition: utilities
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "daadb69a-3153-824a-9ecb-e21202878f53"
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
      stageUuid: "0c826a2e-fa59-8066-af62-878e718816f6"
    - stage: seal
      stageUuid: "8494d340-b08e-88ac-82ae-be3460d548d4"
    - stage: uuid
      stageUuid: "f52d328e-b3c2-8086-b5e5-987d5f861047"
version: 2
---
# utilities — the non-standards helper layer (domain glue, not vendor-spec)

Utilities is the society's **glue drawer** — pure functions over project shapes (`extractID`, `deepMerge`, `toKebabCase`, `formatAuthors`), Payload/Next/tenant glue (`getMeUser`, `getTenantFromRequest`, `getCollectionIDType`, `siteTenantWhere`, `payloadSdk`), and admin/site React hooks (`useClickableCard`, `useDebounce`, `canUseDOM`). It is a genuine grab-bag by construction — there is no single algorithm here, only the assembly the rest of the society leans on.

Its **one law is a boundary, not a behaviour**: a file here may *cite* a standard (`@standard`/`@rfc`/`@security` JSDoc — `errors` → RFC 7807, `scopes` → ISO-27001 tenant-isolation, `getPreviewSecret` → NIST SP 800-108) but must **never implement** one. The difference is intent — this folder *uses* standards; [[standard]] (`src/standards/<id>/`) *implements* them. The moment a helper grows a code-table, validator, or message schema it leaves this drawer and [[collapse]]s into `src/standards/`, leaving at most a `@deprecated` re-export shim. That boundary is what keeps the layer honest; see `README.md` for the belongs/does-not-belong list.

Matter-twin: each helper is its own `<name>/index.ts` (35+ leaves — `errors/`, `scopes/`, `safely/`, `tenant-context/`, `seeding/`, `billing/`), no root barrel — import the leaf directly. Composes [[standard]] · [[config]] · [[identity]] · [[society]] · [[proof]] · [[all]] · [[matter]].
