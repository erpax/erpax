---
name: metadata
description: "Use when an entity needs open/extensible attributes beyond its schema — JSON-backed virtual attributes, per-row settings, tenant toggles. The MetadataAttributeConcern pattern; prefer a real field or a tag before reaching for an open json bag."
atomPath: "vocabulary/metadata"
coordinate: "vocabulary/metadata · 1/base · 58aba42e"
contentUuid: "37d30a06-e6a2-5805-9eea-a28c81287fc3"
diamondUuid: "5475c7da-3491-8abb-bde7-b22a98718e62"
uuid: "58aba42e-2db4-8dfd-b940-e31d2593e3cc"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 20
standards: []
bindings: []
signatures:
  computationUuid: "8d0149ea-4d5f-897a-8e56-74f4e222de63"
  stages:
    - stage: path
      stageUuid: "9e2a40ce-7996-8b4f-8ce0-bb10bad86e8f"
    - stage: trinity
      stageUuid: "c7c3b4cb-3297-802b-8549-315df8cbadf8"
    - stage: boundary
      stageUuid: "7b1f4c37-b314-81bd-b107-89d973256c1c"
    - stage: links
      stageUuid: "81298d20-631e-8ec5-bf6b-65ba5b506a94"
    - stage: horo
      stageUuid: "5c3c4f1a-ca0c-81a4-a532-8feb95fc919a"
    - stage: seal
      stageUuid: "552294a7-b442-8de0-a006-ce603af59105"
    - stage: uuid
      stageUuid: "98e3d149-5246-8156-b31f-7bdce9bd4c18"
version: 2
---
# metadata — open attributes (the escape hatch, used last)

`metadata` is the open-attribute atom (Rails `MetadataAttributeConcern` + the `Domain#metadata` settings bag). A `json` field ([[field]], position **1**) holds extensible key/values with json-operator queries ([[queries]]). **Order of preference:** a typed field → a `(context, tag)` ([[tags]]) → metadata json *last* — an open bag is unschematized and unindexed, so reach for it only for genuinely free-form or per-tenant-toggle data (e.g. `Domain.metadata["accounting"].period_lock_date`). On D1/SQLite query via json operators; normalize at write so a content-`uuid` stays stable ([[identity]]).

Composes: [[field]] (json), [[tags]] (prefer for categorization), [[queries]] (json operators), [[config]] (tenant settings).

## Common mistakes
- Using metadata where a typed field or a tag belongs (loses schema, index, types).
- Letting metadata perturb the content-`uuid` — treat volatile keys as non-content.
