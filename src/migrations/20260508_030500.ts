import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-d1-sqlite'

function rowsFromRun<T>(result: unknown): T[] {
  if (result && typeof result === 'object') {
    const r = result as { rows?: T[]; results?: T[] }
    return r.rows ?? r.results ?? []
  }
  return []
}

async function tenantsHasLocalesColumn(db: MigrateUpArgs['db']): Promise<boolean> {
  const result = await db.run(sql`PRAGMA table_info(tenants)`)
  const rows = rowsFromRun<{ name?: string }>(result)
  return rows.some((row) => row.name === 'locales')
}

async function tableExists(db: MigrateUpArgs['db'], name: string): Promise<boolean> {
  const result = await db.run(
    sql`SELECT name FROM sqlite_master WHERE type = 'table' AND name = ${name}`,
  )
  return rowsFromRun(result).length > 0
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
  const hasJunction = await tableExists(db, 'tenants_locales')

  if (!(await tenantsHasLocalesColumn(db))) {
    await db.run(sql`ALTER TABLE \`tenants\` ADD COLUMN \`locales\` text`)
  }

  if (hasJunction) {
    const selectResult = await db.run(
      sql`SELECT \`parent_id\`, \`value\`, \`order\` FROM \`tenants_locales\` ORDER BY \`parent_id\`, \`order\``,
    )
    const localeRows = rowsFromRun<{ parent_id: number; value: string | null }>(selectResult)

    const byParent = new Map<number, string[]>()
    for (const row of localeRows) {
      if (row.value == null || row.value === '') continue
      const list = byParent.get(row.parent_id) ?? []
      list.push(row.value)
      byParent.set(row.parent_id, list)
    }

    for (const [parentId, codes] of byParent) {
      const json = JSON.stringify(codes)
      await db.run(
        sql`UPDATE \`tenants\` SET \`locales\` = ${json} WHERE \`id\` = ${parentId}`,
      )
    }

    await db.run(sql`DROP INDEX IF EXISTS \`tenants_locales_order_idx\``)
    await db.run(sql`DROP INDEX IF EXISTS \`tenants_locales_parent_idx\``)
    await db.run(sql`DROP TABLE IF EXISTS \`tenants_locales\``)
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`tenants_locales\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`tenants_locales_order_idx\` ON \`tenants_locales\` (\`order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`tenants_locales_parent_idx\` ON \`tenants_locales\` (\`parent_id\`);`)

  if (await tenantsHasLocalesColumn(db)) {
    const tenantsResult = await db.run(sql`SELECT \`id\`, \`locales\` FROM \`tenants\``)
    const tenantRows = rowsFromRun<{ id: number; locales: string | null }>(tenantsResult)

    let nextLocaleRowId = 1
    for (const row of tenantRows) {
      if (row.locales == null || row.locales === '') continue
      let codes: unknown
      try {
        codes = JSON.parse(row.locales)
      } catch {
        continue
      }
      if (!Array.isArray(codes)) continue

      let ord = 0
      for (const code of codes) {
        if (typeof code !== 'string' || code === '') continue
        await db.run(sql`
          INSERT INTO \`tenants_locales\` (\`order\`, \`parent_id\`, \`value\`, \`id\`)
          VALUES (${ord}, ${row.id}, ${code}, ${nextLocaleRowId})
        `)
        ord += 1
        nextLocaleRowId += 1
      }
    }

    await db.run(sql`ALTER TABLE \`tenants\` DROP COLUMN \`locales\``)
  }
}
