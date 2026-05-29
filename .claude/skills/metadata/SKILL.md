---
name: metadata
description: Use when an entity needs open/extensible attributes beyond its schema — JSON-backed virtual attributes, per-row settings, tenant toggles. The MetadataAttributeConcern pattern; prefer a real field or a tag before reaching for an open json bag.
---

# metadata — open attributes (the escape hatch, used last)

`metadata` is the open-attribute atom (Rails `MetadataAttributeConcern` + the `Domain#metadata` settings bag). A `json` field ([[fields]], position **1**) holds extensible key/values with json-operator queries ([[queries]]). **Order of preference:** a typed field → a `(context, tag)` ([[tags]]) → metadata json *last* — an open bag is unschematized and unindexed, so reach for it only for genuinely free-form or per-tenant-toggle data (e.g. `Domain.metadata["accounting"].period_lock_date`). On D1/SQLite query via json operators; normalize at write so a content-`uuid` stays stable ([[identity]]).

Composes: [[fields]] (json), [[tags]] (prefer for categorization), [[queries]] (json operators), [[config]] (tenant settings).

## Common mistakes
- Using metadata where a typed field or a tag belongs (loses schema, index, types).
- Letting metadata perturb the content-`uuid` — treat volatile keys as non-content.
