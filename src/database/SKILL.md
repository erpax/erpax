---
name: database
description: "Use when configuring the Payload database adapter or working with migrations/schema — choosing sqlite/d1/postgres/mongo, running migrate / migrate:create / migrate:down, dev push, transactions, indexes, defaultIDType, or fixing schema/enum/table-name errors."
atomPath: database
coordinate: database · 2/share · ecd5de20
contentUuid: "55441f23-b116-51b7-b855-14a42ca0eb9a"
diamondUuid: "3baa7da1-5488-816e-9148-32867ea87b73"
uuid: "ecd5de20-2da9-8b71-a117-1ea0764562b1"
horo: 2
bonds:
  in:
    - backup
    - bindings
    - cardinality
    - chat
    - config
    - consistency
    - constraint
    - deploy
    - dev
    - fields
    - id
    - identity
    - law
    - merge
    - nullability
    - partition
    - payload
    - port
    - recover
    - replication
    - schema
    - skills
    - society
    - tag
    - torus
    - weave
  out:
    - backup
    - bindings
    - cardinality
    - chat
    - config
    - consistency
    - constraint
    - deploy
    - dev
    - fields
    - id
    - identity
    - law
    - merge
    - nullability
    - partition
    - payload
    - port
    - recover
    - replication
    - schema
    - skills
    - society
    - tag
    - torus
    - weave
typography:
  partition: database
  bondDegree: 0
  neighbors: []
standards: []
bindings:
  - d1_databases/D1
neighbors:
  wikilink:
    - deploy
    - fields
    - identity
    - law
    - recover
  matrix:
    - backup
    - bindings
    - cardinality
    - chat
    - config
    - consistency
    - constraint
    - deploy
    - dev
    - fields
    - id
    - identity
    - law
    - merge
    - nullability
    - partition
    - payload
    - port
    - recover
    - replication
    - schema
    - skills
    - society
    - tag
    - torus
    - weave
  backlinks:
    - backup
    - bindings
    - cardinality
    - chat
    - config
    - consistency
    - constraint
    - deploy
    - dev
    - fields
    - id
    - identity
    - law
    - merge
    - nullability
    - partition
    - payload
    - port
    - recover
    - replication
    - schema
    - skills
    - society
    - tag
    - torus
    - weave
signatures:
  computationUuid: "64cae152-3b4c-808f-96b3-bda0030b3bdb"
  stages:
    - stage: path
      stageUuid: "f6ce6480-b1e7-8e00-be61-231c4403ed58"
    - stage: trinity
      stageUuid: "e89757f9-aeae-8e0d-96f9-a4d1dff27f4f"
    - stage: boundary
      stageUuid: "30a0af2e-3349-88dc-92a1-4d120eba6bb6"
    - stage: links
      stageUuid: "dd142287-73b2-80bb-a1f1-e1c9f67d9be0"
    - stage: horo
      stageUuid: "8edca529-c06c-88c9-ad60-915dd9ac61fe"
    - stage: seal
      stageUuid: "94d3bc0a-3a57-8f93-8a8b-34eef701f737"
    - stage: uuid
      stageUuid: "b3ffaba2-245d-81e7-9415-a9ec0635f31d"
version: 2
---
# database — adapter, migrations, schema (position 4 of the material cycle)

Set via `config.db` with an adapter. erpax uses `@payloadcms/db-d1-sqlite` (Cloudflare D1).

## Adapters
`sqliteD1Adapter` / `sqliteAdapter` · `postgresAdapter` · `mongooseAdapter`. Each takes the connection + options (`migrationDir`, `transactionOptions`, `idType`, etc.).

## Migrations (SQL adapters)
| Command | Does |
|---|---|
| `payload migrate:create` | Generate a migration from the current config vs DB. |
| `payload migrate` | Run pending migrations (use in production — see [[deploy]]). |
| `payload migrate:down` / `:refresh` / `:status` | Roll back / redo / list. |
| dev **push** | Auto-syncs schema in dev (no migration files). Set `PAYLOAD_MIGRATING`/`NODE_ENV` to disable; prod uses committed migrations. |

Migrations are Payload-generated — no hand-written DB backward-compat. Clean slate: drop the local DB + `src/migrations/*`, finish schema changes, then `migrate:create`.

## Schema knobs
- **uuid ids (position 0).** erpax sets the d1-sqlite adapter arg **`idType: 'uuid'`** so every doc id is a generated **uuid** (`id: string`), not an auto-increment integer. GOTCHA: the adapter maps `idType: 'uuid'|'uuidv7'` → payload `defaultIDType: 'text'`; `idType: 'text'`/`'integer'`/`'numeric'` all map to `'number'` (integer id) — so **use `'uuid'`, not `'text'`**, to get string/uuid ids. This is what makes ids content/oid-addressed → collision-free merge + federation + the etrima `oidUuid` migration (see [[identity]]). Do not revert. Per-collection override via `customIDType`.
- `index: true` on fields; `dbName` on fields/groups/collections to control column/table/enum names.

## Common mistakes
- **63-char enum/table name** (SQLite/Drizzle limit): deeply-nested group+select paths overflow → add a short `dbName` to the group or field (see [[recover]],[[fields]]).
- Running interactive `payload migrate` in non-interactive contexts (CI/tests) — it can hang on a prompt. Use `PAYLOAD_TEST_SKIP_MIGRATE=1` in tests or pre-create migrations.
- Relying on dev push in production instead of `migrate` (see [[deploy]]).

**Law — [[law]]: the schema is generated from config, never hand-authored — migrations are derived artefacts (drop and regenerate, no backward-compat), and every id is a content-addressed uuid so rows merge collision-free.**
