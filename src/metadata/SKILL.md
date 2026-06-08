---
name: metadata
description: "Use when an entity needs open/extensible attributes beyond its schema — JSON-backed virtual attributes, per-row settings, tenant toggles. The MetadataAttributeConcern pattern; prefer a real field or a tag before reaching for an open json bag."
atomPath: metadata
coordinate: metadata · 2/share · f8fc927c
contentUuid: "c95d9058-d7f6-5eb6-abfc-faf0670cedb6"
diamondUuid: "e9846c41-16a9-89ef-8aa3-2f45ceac4b93"
uuid: "f8fc927c-7705-8bd3-9d43-9871a7e19c4e"
horo: 2
bonds:
  in:
    - config
    - fields
    - identity
    - queries
    - tags
  out:
    - config
    - fields
    - identity
    - queries
    - tags
typography:
  partition: metadata
  bondDegree: 20
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - config
    - fields
    - identity
    - queries
    - tags
  matrix:
    - config
    - fields
    - identity
    - queries
    - tags
  backlinks:
    - config
    - fields
    - identity
    - queries
    - tags
signatures:
  computationUuid: "d60ea051-94da-8fb2-ade5-56cf414bf01f"
  stages:
    - stage: path
      stageUuid: "5c70dad7-c774-8f38-ad99-9b36b6c0e552"
    - stage: trinity
      stageUuid: "5092d00c-6c2f-85f6-a484-b188e4997631"
    - stage: boundary
      stageUuid: "de2b7398-91f3-8518-8bea-3e74c8160f51"
    - stage: links
      stageUuid: "1e6ba72a-0bd7-82ba-a166-5700f38eb35a"
    - stage: horo
      stageUuid: "d47a4e2e-6fe6-809f-87b9-5e2a3a041dcc"
    - stage: seal
      stageUuid: "d79ed7ae-95d4-8564-bb61-5d0bd8cb3946"
    - stage: uuid
      stageUuid: "8673fe3e-8676-8933-810a-63a60245eb58"
version: 2
---
# metadata — open attributes (the escape hatch, used last)

`metadata` is the open-attribute atom (Rails `MetadataAttributeConcern` + the `Domain#metadata` settings bag). A `json` field ([[fields]], position **1**) holds extensible key/values with json-operator queries ([[queries]]). **Order of preference:** a typed field → a `(context, tag)` ([[tags]]) → metadata json *last* — an open bag is unschematized and unindexed, so reach for it only for genuinely free-form or per-tenant-toggle data (e.g. `Domain.metadata["accounting"].period_lock_date`). On D1/SQLite query via json operators; normalize at write so a content-`uuid` stays stable ([[identity]]).

Composes: [[fields]] (json), [[tags]] (prefer for categorization), [[queries]] (json operators), [[config]] (tenant settings).

## Common mistakes
- Using metadata where a typed field or a tag belongs (loses schema, index, types).
- Letting metadata perturb the content-`uuid` — treat volatile keys as non-content.
