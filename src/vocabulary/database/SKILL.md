---
name: database
description: "Use when configuring the Payload database adapter or working with migrations/schema — choosing sqlite/d1/postgres/mongo, running migrate / migrate:create / migrate:down, dev push, transactions, indexes, defaultIDType, or fixing schema/enum/table-name errors."
atomPath: "vocabulary/database"
coordinate: "vocabulary/database · 5/round · 6768ceca"
contentUuid: "439e507c-b4b6-5b5d-9037-deec6e878fb5"
diamondUuid: "732624a8-aa73-81af-82f3-8c4b961e21ec"
uuid: "6768ceca-1954-8ba5-93c5-e2caccbdd1c3"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 85
standards: []
bindings: []
signatures:
  computationUuid: "57087322-0ade-8bbf-9eca-3c38c5025299"
  stages:
    - stage: path
      stageUuid: "3b97cf25-ecaf-8580-99e3-0b887f2f8aaa"
    - stage: trinity
      stageUuid: "e331f430-0f9e-8992-b77d-0f347255324d"
    - stage: boundary
      stageUuid: "c8b5b5e6-17fb-84a1-812d-b30d2def69ed"
    - stage: links
      stageUuid: "dc314301-ff93-83fb-98b2-86194e05f42b"
    - stage: horo
      stageUuid: "bf35e6c4-347f-80ac-bd62-2710ca0cd718"
    - stage: seal
      stageUuid: "e12a6f2a-fa13-8117-ab28-ac858dc362db"
    - stage: uuid
      stageUuid: "c732d8f7-11bd-8335-839b-98a0fedc2500"
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
