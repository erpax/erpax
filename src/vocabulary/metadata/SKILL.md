---
name: metadata
description: "Use when an entity needs open/extensible attributes beyond its schema — JSON-backed virtual attributes, per-row settings, tenant toggles. The MetadataAttributeConcern pattern; prefer a real field or a tag before reaching for an open json bag."
atomPath: "vocabulary/metadata"
coordinate: "vocabulary/metadata · 5/round · f49f9cb3"
contentUuid: "6ce4b966-c10d-589c-9fc9-cd2349565a51"
diamondUuid: "66d50f60-0ce7-8102-abf2-ace3d00d4d77"
uuid: "f49f9cb3-b35e-81ea-9a8d-4b20f154495d"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 20
standards: []
bindings: []
signatures:
  computationUuid: "79bb37e4-e594-816f-b1dc-3890292fee1d"
  stages:
    - stage: path
      stageUuid: "9e2a40ce-7996-8b4f-8ce0-bb10bad86e8f"
    - stage: trinity
      stageUuid: "c7c3b4cb-3297-802b-8549-315df8cbadf8"
    - stage: boundary
      stageUuid: "7154a5fd-4235-853b-8d9f-4e89c508e357"
    - stage: links
      stageUuid: "ce8af7ea-804b-8071-bc1f-74ca8104d8da"
    - stage: horo
      stageUuid: "ef3f3b44-9bd3-8a5d-902a-93c9664945f7"
    - stage: seal
      stageUuid: "01043b60-fb51-8128-85c6-e4eeaf9be713"
    - stage: uuid
      stageUuid: "5143d4f8-ddc6-8527-85dd-bdf793da6798"
version: 2
---
# metadata — open attributes (the escape hatch, used last)

`metadata` is the open-attribute atom (Rails `MetadataAttributeConcern` + the `Domain#metadata` settings bag). A `json` field ([[field]], position **1**) holds extensible key/values with json-operator queries ([[queries]]). **Order of preference:** a typed field → a `(context, tag)` ([[tags]]) → metadata json *last* — an open bag is unschematized and unindexed, so reach for it only for genuinely free-form or per-tenant-toggle data (e.g. `Domain.metadata["accounting"].period_lock_date`). On D1/SQLite query via json operators; normalize at write so a content-`uuid` stays stable ([[identity]]).

Composes: [[field]] (json), [[tags]] (prefer for categorization), [[queries]] (json operators), [[config]] (tenant settings).

## Common mistakes
- Using metadata where a typed field or a tag belongs (loses schema, index, types).
- Letting metadata perturb the content-`uuid` — treat volatile keys as non-content.
