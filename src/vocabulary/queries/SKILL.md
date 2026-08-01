---
name: queries
description: "Use when building or debugging Payload queries — where filters/operators, sort, pagination, depth, select, populating relationships, joins, or query presets across Local/REST/GraphQL."
atomPath: "vocabulary/queries"
coordinate: "vocabulary/queries · 5/round · e24dcda9"
contentUuid: "3bac3bde-a2ec-5d9f-a60c-99e4003496f5"
diamondUuid: "bb2e4011-903b-86eb-8166-81253036d0e3"
uuid: "e24dcda9-3415-8408-bd9a-6a6c6da099a4"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 64
standards: []
bindings: []
signatures:
  computationUuid: "579ffb4b-641c-8533-bf49-ea15d39591cb"
  stages:
    - stage: path
      stageUuid: "5e3ee5fa-b2af-8e4c-bc87-826d1374b1fd"
    - stage: trinity
      stageUuid: "044eabc5-859c-8ec3-b3d8-ea7c39c92d79"
    - stage: boundary
      stageUuid: "802ab1a3-c4fa-8c93-99ed-e070c178e573"
    - stage: links
      stageUuid: "642823ff-db32-8c46-b560-38b220e69117"
    - stage: horo
      stageUuid: "ff29cb95-c7aa-805f-a17e-fed9f41a8816"
    - stage: seal
      stageUuid: "781033ba-4405-8833-80ed-965d337097a5"
    - stage: uuid
      stageUuid: "79f66717-116e-8ca9-b1c3-5aac085577ef"
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
