---
name: queries
description: "Use when building or debugging Payload queries — where filters/operators, sort, pagination, depth, select, populating relationships, joins, or query presets across Local/REST/GraphQL."
atomPath: "vocabulary/queries"
coordinate: "vocabulary/queries · 8/crest · d2f37a88"
contentUuid: "b3353004-c320-5024-88ad-c1527b7136a4"
diamondUuid: "49d20b8e-799a-8691-89f0-2c79539a4667"
uuid: "d2f37a88-1c54-8f04-97e6-e6adf19bf5ec"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 68
standards: []
bindings: []
signatures:
  computationUuid: "dfb5f195-5b36-8239-af77-81a22af13a5f"
  stages:
    - stage: path
      stageUuid: "5e3ee5fa-b2af-8e4c-bc87-826d1374b1fd"
    - stage: trinity
      stageUuid: "044eabc5-859c-8ec3-b3d8-ea7c39c92d79"
    - stage: boundary
      stageUuid: "6bc664a1-6286-8e23-ae2e-34a43c8c06d7"
    - stage: links
      stageUuid: "5be9681d-3328-89e2-93cb-f0d412b36002"
    - stage: horo
      stageUuid: "4f2b694d-2789-886e-8bb8-720896b6d410"
    - stage: seal
      stageUuid: "6c8df813-bc61-8f50-97b1-76e0212ce70f"
    - stage: uuid
      stageUuid: "4f6a23a4-c249-803b-b370-50af6a805ffa"
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
- Filtering/sorting on un-indexed fields (slow — `index: true`, see [[field]],[[optimize]]).
- High `depth` pulling huge relationship trees — use `depth: 0` + `select`/`populate`.
- Expecting `like` to be case-insensitive everywhere (adapter-dependent).
