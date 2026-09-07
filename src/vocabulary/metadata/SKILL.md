---
name: metadata
description: "Use when an entity needs open/extensible attributes beyond its schema — JSON-backed virtual attributes, per-row settings, tenant toggles. The MetadataAttributeConcern pattern; prefer a real field or a tag before reaching for an open json bag."
atomPath: "vocabulary/metadata"
coordinate: "vocabulary/metadata · 1/base · 62d27f9c"
contentUuid: "da0568b8-3643-5dbd-b51f-4c55798b2721"
diamondUuid: "e8ade662-f559-85e2-a12e-251a45d77cba"
uuid: "62d27f9c-9b94-824e-bf82-1cc9a1cf3422"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 20
standards: []
bindings: []
signatures:
  computationUuid: "d37b6303-e820-8542-a98f-f6cf2cc6b8c7"
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
      stageUuid: "a742e0d6-924a-83ff-9a1b-b82cdffc856d"
    - stage: seal
      stageUuid: "01043b60-fb51-8128-85c6-e4eeaf9be713"
    - stage: uuid
      stageUuid: "627a0e5d-ea58-81e1-a0c5-0fab232773a7"
version: 2
---
# metadata — open attributes (the escape hatch, used last)

`metadata` is the open-attribute atom (Rails `MetadataAttributeConcern` + the `Domain#metadata` settings bag). A `json` field ([[field]], position **1**) holds extensible key/values with json-operator queries ([[queries]]). **Order of preference:** a typed field → a `(context, tag)` ([[tags]]) → metadata json *last* — an open bag is unschematized and unindexed, so reach for it only for genuinely free-form or per-tenant-toggle data (e.g. `Domain.metadata["accounting"].period_lock_date`). On D1/SQLite query via json operators; normalize at write so a content-`uuid` stays stable ([[identity]]).

Composes: [[field]] (json), [[tags]] (prefer for categorization), [[queries]] (json operators), [[config]] (tenant settings).

## Common mistakes
- Using metadata where a typed field or a tag belongs (loses schema, index, types).
- Letting metadata perturb the content-`uuid` — treat volatile keys as non-content.
