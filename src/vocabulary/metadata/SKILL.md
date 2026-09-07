---
name: metadata
description: "Use when an entity needs open/extensible attributes beyond its schema — JSON-backed virtual attributes, per-row settings, tenant toggles. The MetadataAttributeConcern pattern; prefer a real field or a tag before reaching for an open json bag."
atomPath: "vocabulary/metadata"
coordinate: "vocabulary/metadata · 7/descent · 0abe90ba"
contentUuid: "b08ba9f4-20ef-5063-b4d2-1efad9ed1bcc"
diamondUuid: "a598dc99-94ff-8731-9b66-c3f701f5e242"
uuid: "0abe90ba-d8cf-8357-9912-13a4e906b317"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 20
standards: []
bindings: []
signatures:
  computationUuid: "dffbd78c-fc41-8244-bd49-987306eb7102"
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
      stageUuid: "01696550-90a2-8743-ac45-ff1ed0bdd9d4"
    - stage: seal
      stageUuid: "01043b60-fb51-8128-85c6-e4eeaf9be713"
    - stage: uuid
      stageUuid: "cfa79567-89ca-8228-be8b-dfd7b3924834"
version: 2
---
# metadata — open attributes (the escape hatch, used last)

`metadata` is the open-attribute atom (Rails `MetadataAttributeConcern` + the `Domain#metadata` settings bag). A `json` field ([[field]], position **1**) holds extensible key/values with json-operator queries ([[queries]]). **Order of preference:** a typed field → a `(context, tag)` ([[tags]]) → metadata json *last* — an open bag is unschematized and unindexed, so reach for it only for genuinely free-form or per-tenant-toggle data (e.g. `Domain.metadata["accounting"].period_lock_date`). On D1/SQLite query via json operators; normalize at write so a content-`uuid` stays stable ([[identity]]).

Composes: [[field]] (json), [[tags]] (prefer for categorization), [[queries]] (json operators), [[config]] (tenant settings).

## Common mistakes
- Using metadata where a typed field or a tag belongs (loses schema, index, types).
- Letting metadata perturb the content-`uuid` — treat volatile keys as non-content.
