---
name: metadata
description: "Use when an entity needs open/extensible attributes beyond its schema — JSON-backed virtual attributes, per-row settings, tenant toggles. The MetadataAttributeConcern pattern; prefer a real field or a tag before reaching for an open json bag."
atomPath: "vocabulary/metadata"
coordinate: "vocabulary/metadata · 5/round · f49f9cb3"
contentUuid: "6f27154e-d797-568b-9b0e-58c5b6ce624e"
diamondUuid: "23e7e6ba-5a95-81d0-8471-6454b4d20621"
uuid: "f49f9cb3-b35e-81ea-9a8d-4b20f154495d"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 19
standards: []
bindings: []
signatures:
  computationUuid: "dbc1a7ff-d94f-8ef0-8ca1-fe518d86796b"
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
      stageUuid: "288dd2fd-368a-8910-9acf-5e9a7167bb2a"
    - stage: seal
      stageUuid: "01043b60-fb51-8128-85c6-e4eeaf9be713"
    - stage: uuid
      stageUuid: "6b40ac7c-6950-87d7-ae30-779d3a5b9862"
version: 2
---
# metadata — open attributes (the escape hatch, used last)

`metadata` is the open-attribute atom (Rails `MetadataAttributeConcern` + the `Domain#metadata` settings bag). A `json` field ([[field]], position **1**) holds extensible key/values with json-operator queries ([[queries]]). **Order of preference:** a typed field → a `(context, tag)` ([[tags]]) → metadata json *last* — an open bag is unschematized and unindexed, so reach for it only for genuinely free-form or per-tenant-toggle data (e.g. `Domain.metadata["accounting"].period_lock_date`). On D1/SQLite query via json operators; normalize at write so a content-`uuid` stays stable ([[identity]]).

Composes: [[field]] (json), [[tags]] (prefer for categorization), [[queries]] (json operators), [[config]] (tenant settings).

## Common mistakes
- Using metadata where a typed field or a tag belongs (loses schema, index, types).
- Letting metadata perturb the content-`uuid` — treat volatile keys as non-content.
