---
name: utilities
description: "Use when you need a pure helper, a Payload/Next/tenant glue function, or an admin React hook and it does NOT implement a standard's algorithm — the non-standards helper layer that may cite standards but never implements them."
atomPath: utilities
coordinate: "utilities · 8/crest · e89375d8"
contentUuid: "0518af64-231a-5603-8254-7672fd7a063d"
diamondUuid: "212635a8-ea7c-8807-b622-d0cafc602e2b"
uuid: "e89375d8-9c46-8de1-9321-542439e2b9df"
horo: 8
typography:
  partition: utilities
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "3a733ac5-1583-8474-9810-ba9cef08f3d1"
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
      stageUuid: "de7dfb8e-f0c1-84d5-ba32-656270034ddd"
    - stage: seal
      stageUuid: "8494d340-b08e-88ac-82ae-be3460d548d4"
    - stage: uuid
      stageUuid: "73206f20-974d-823c-9840-187a956fdd7c"
version: 2
---
# utilities — the non-standards helper layer (domain glue, not vendor-spec)

Utilities is the society's **glue drawer** — pure functions over project shapes (`extractID`, `deepMerge`, `toKebabCase`, `formatAuthors`), Payload/Next/tenant glue (`getMeUser`, `getTenantFromRequest`, `getCollectionIDType`, `siteTenantWhere`, `payloadSdk`), and admin/site React hooks (`useClickableCard`, `useDebounce`, `canUseDOM`). It is a genuine grab-bag by construction — there is no single algorithm here, only the assembly the rest of the society leans on.

Its **one law is a boundary, not a behaviour**: a file here may *cite* a standard (`@standard`/`@rfc`/`@security` JSDoc — `errors` → RFC 7807, `scopes` → ISO-27001 tenant-isolation, `getPreviewSecret` → NIST SP 800-108) but must **never implement** one. The difference is intent — this folder *uses* standards; [[standard]] (`src/standards/<id>/`) *implements* them. The moment a helper grows a code-table, validator, or message schema it leaves this drawer and [[collapse]]s into `src/standards/`, leaving at most a `@deprecated` re-export shim. That boundary is what keeps the layer honest; see `README.md` for the belongs/does-not-belong list.

Matter-twin: each helper is its own `<name>/index.ts` (35+ leaves — `errors/`, `scopes/`, `safely/`, `tenant-context/`, `seeding/`, `billing/`), no root barrel — import the leaf directly. Composes [[standard]] · [[config]] · [[identity]] · [[society]] · [[proof]] · [[all]] · [[matter]].
