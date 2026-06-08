---
name: queries
description: "Use when building or debugging Payload queries — where filters/operators, sort, pagination, depth, select, populating relationships, joins, or query presets across Local/REST/GraphQL."
atomPath: queries
coordinate: queries · 2/share · 46b115ae
contentUuid: "53e2fd8a-31f6-5f6e-a693-6f40b62b1bb4"
diamondUuid: "ed7fe2da-5161-85ea-977c-2d62bff7a206"
uuid: "46b115ae-fb6e-8766-87d9-c2b982aff38e"
horo: 2
bonds:
  in:
    - accounting
    - aggregation
    - api
    - cache
    - cardinality
    - commerce
    - crest
    - dimension
    - fields
    - flow
    - localize
    - manufacturing
    - metadata
    - nullability
    - optimize
    - pages
    - port
    - reconcile
    - redirects
    - search
    - tag
    - transaction
  out:
    - accounting
    - aggregation
    - api
    - cache
    - cardinality
    - commerce
    - crest
    - dimension
    - fields
    - flow
    - localize
    - manufacturing
    - metadata
    - nullability
    - optimize
    - pages
    - port
    - reconcile
    - redirects
    - search
    - tag
    - transaction
typography:
  partition: queries
  bondDegree: 68
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - api
    - fields
    - optimize
  matrix:
    - accounting
    - aggregation
    - api
    - cache
    - cardinality
    - commerce
    - crest
    - dimension
    - fields
    - flow
    - localize
    - manufacturing
    - metadata
    - nullability
    - optimize
    - pages
    - port
    - reconcile
    - redirects
    - search
    - tag
    - transaction
  backlinks:
    - accounting
    - aggregation
    - api
    - cache
    - cardinality
    - commerce
    - crest
    - dimension
    - fields
    - flow
    - localize
    - manufacturing
    - metadata
    - nullability
    - optimize
    - pages
    - port
    - reconcile
    - redirects
    - search
    - tag
    - transaction
signatures:
  computationUuid: "61ef2742-e166-891d-a197-aed8b88455ac"
  stages:
    - stage: path
      stageUuid: "fb5cb446-9fbc-8dd9-a1ad-9f3a1eb660bc"
    - stage: trinity
      stageUuid: "795c1432-64f7-8abb-a2d4-89cdda8373e7"
    - stage: boundary
      stageUuid: "c65c5286-8f9d-8292-a1f5-2e9bc33855c1"
    - stage: links
      stageUuid: "4c0df52d-2761-8aa6-a0e1-43cb99f987f4"
    - stage: horo
      stageUuid: "c5255473-a184-87b5-aebf-46073b5b428c"
    - stage: seal
      stageUuid: "e7759264-2ad0-893d-9cb5-3b8f76b76eb2"
    - stage: uuid
      stageUuid: "17b9d902-9053-8854-b863-464594b20984"
version: 2
---
# queries — Payload query syntax (position 8 of the material cycle)

One `where` syntax shared across Local API, REST, and GraphQL (see [[api]]).

## where operators
| Group | Operators |
|---|---|
| equality | `equals`, `not_equals` |
| sets | `in`, `not_in`, `all` |
| comparison | `greater_than`, `greater_than_equal`, `less_than`, `less_than_equal` |
| text | `like`, `contains` |
| presence | `exists` |
| geo (point) | `near`, `within`, `intersects` |
Combine with `and` / `or` arrays of where-clauses.

```ts
where: { and: [ { status: { equals: 'published' } }, { tenant: { equals: id } } ] }
```

## Query options
| Option | Purpose |
|---|---|
| `sort` | Field name; prefix `-` for descending; array for multi-sort. |
| `limit` / `page` | Pagination. |
| `depth` | How many relationship levels to populate (0 = IDs only). Capped by `maxDepth`. |
| `select` | Return only listed fields (smaller responses — see [[optimize]]). |
| `populate` | Per-relationship field selection when populated. |
| `joins` | Control `join`-field pagination/sort/limit. |
| `locale` / `fallbackLocale` | Localized reads. |

## Query Presets
Save reusable where+columns+sort per collection (`config.queryPresets`); selectable in the admin list view.

## Common mistakes
- Filtering/sorting on un-indexed fields (slow — `index: true`, see [[fields]],[[optimize]]).
- High `depth` pulling huge relationship trees — use `depth: 0` + `select`/`populate`.
- Expecting `like` to be case-insensitive everywhere (adapter-dependent).
