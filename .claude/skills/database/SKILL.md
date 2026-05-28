---
name: database
description: Use when configuring the Payload database adapter or working with migrations/schema — choosing sqlite/d1/postgres/mongo, running migrate / migrate:create / migrate:down, dev push, transactions, indexes, defaultIDType, or fixing schema/enum/table-name errors.
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
