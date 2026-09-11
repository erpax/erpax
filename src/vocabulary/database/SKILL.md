---
name: database
description: "Use when configuring the Payload database adapter or working with migrations/schema — choosing sqlite/d1/postgres/mongo, running migrate / migrate:create / migrate:down, dev push, transactions, indexes, defaultIDType, or fixing schema/enum/table-name errors."
atomPath: "vocabulary/database"
coordinate: "vocabulary/database · 2/share · 1ed6d67a"
contentUuid: "f95e1a29-c296-5cb7-b69e-27161f2378fd"
diamondUuid: "f3987f8f-acd1-8728-8131-6980a1639fe5"
uuid: "1ed6d67a-4a81-809f-9ab3-2dfde745a18f"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 85
standards: []
bindings: []
signatures:
  computationUuid: "dd5943dc-cb9d-8e40-ac61-3b124583a223"
  stages:
    - stage: path
      stageUuid: "3b97cf25-ecaf-8580-99e3-0b887f2f8aaa"
    - stage: trinity
      stageUuid: "e331f430-0f9e-8992-b77d-0f347255324d"
    - stage: boundary
      stageUuid: "b8d53055-5189-8e42-88ca-366fc592a25c"
    - stage: links
      stageUuid: "2650e1fc-dad0-8ca1-acb1-981f42e62da8"
    - stage: horo
      stageUuid: "0ffe1308-9cf1-8f07-b0e2-d17777eae3bf"
    - stage: seal
      stageUuid: "a5ca82de-686e-80d7-a253-0a2c3f0b490b"
    - stage: uuid
      stageUuid: "90df0467-73e5-8cec-a1a7-03c6c80acbe9"
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
- **63-char enum/table name** (SQLite/Drizzle limit): deeply-nested group+select paths overflow → add a short `dbName` to the group or field (see [[recover]],[[field]]).
- Running interactive `payload migrate` in non-interactive contexts (CI/tests) — it can hang on a prompt. Use `PAYLOAD_TEST_SKIP_MIGRATE=1` in tests or pre-create migrations.
- Relying on dev push in production instead of `migrate` (see [[deploy]]).

**Law — [[law]]: the schema is generated from config, never hand-authored — migrations are derived artefacts (drop and regenerate, no backward-compat), and every id is a content-addressed uuid so rows merge collision-free.**
