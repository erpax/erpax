---
name: metadata
description: "Use when an entity needs open/extensible attributes beyond its schema — JSON-backed virtual attributes, per-row settings, tenant toggles. The MetadataAttributeConcern pattern; prefer a real field or a tag before reaching for an open json bag."
atomPath: "vocabulary/metadata"
coordinate: "vocabulary/metadata · 7/descent · cf8f4418"
contentUuid: "a201b1aa-1db3-54e4-8dd9-e4fc2037c9a6"
diamondUuid: "9b0dbe74-4603-8594-af9b-f087fa536b89"
uuid: "cf8f4418-bbb4-869a-9cfa-35056f865e1e"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 20
standards: []
bindings: []
signatures:
  computationUuid: "9acf9640-b422-8c2b-a3bc-aa45f35014e7"
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
      stageUuid: "0d2e11bb-c0d1-82c3-af4f-f441e7c7b55c"
    - stage: seal
      stageUuid: "01043b60-fb51-8128-85c6-e4eeaf9be713"
    - stage: uuid
      stageUuid: "3082da9d-2ae3-8197-8b26-e1fd7352d779"
version: 2
---
# metadata — open attributes (the escape hatch, used last)

`metadata` is the open-attribute atom (Rails `MetadataAttributeConcern` + the `Domain#metadata` settings bag). A `json` field ([[field]], position **1**) holds extensible key/values with json-operator queries ([[queries]]). **Order of preference:** a typed field → a `(context, tag)` ([[tags]]) → metadata json *last* — an open bag is unschematized and unindexed, so reach for it only for genuinely free-form or per-tenant-toggle data (e.g. `Domain.metadata["accounting"].period_lock_date`). On D1/SQLite query via json operators; normalize at write so a content-`uuid` stays stable ([[identity]]).

Composes: [[field]] (json), [[tags]] (prefer for categorization), [[queries]] (json operators), [[config]] (tenant settings).

## Common mistakes
- Using metadata where a typed field or a tag belongs (loses schema, index, types).
- Letting metadata perturb the content-`uuid` — treat volatile keys as non-content.
