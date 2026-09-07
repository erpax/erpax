---
name: queries
description: "Use when building or debugging Payload queries — where filters/operators, sort, pagination, depth, select, populating relationships, joins, or query presets across Local/REST/GraphQL."
atomPath: "vocabulary/queries"
coordinate: "vocabulary/queries · 4/weave · 47680679"
contentUuid: "2205ffea-1925-5bfb-b55e-3096938369f8"
diamondUuid: "5d5aa454-e61f-8c2b-8166-ccb5f53f15fd"
uuid: "47680679-c783-8f08-bbd7-7f3c93f1d94d"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 68
standards: []
bindings: []
signatures:
  computationUuid: "c6ecaeb9-4f16-8927-80e6-6277cbd690ea"
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
      stageUuid: "4efd2f44-3b19-8038-b60d-8bd675a46dbc"
    - stage: seal
      stageUuid: "6c8df813-bc61-8f50-97b1-76e0212ce70f"
    - stage: uuid
      stageUuid: "00374ced-b606-813e-a39a-9d14e144fb25"
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
