import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Breadcrumbs are derived: the nested-docs plugin rewrites them on the next save of each document. The
  // old rows carry no locale, and a NOT NULL column cannot be added to a table that has rows, so they go.
  for (const table of ['categories_breadcrumbs', '_categories_v_version_breadcrumbs', 'pages_breadcrumbs', '_pages_v_version_breadcrumbs'])
    await db.run(sql.raw(`DELETE FROM \`${table}\`;`))
  await db.run(sql`ALTER TABLE \`categories_breadcrumbs\` ADD \`_locale\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`categories_breadcrumbs\` ADD \`label\` text;`)
  await db.run(sql`CREATE INDEX \`categories_breadcrumbs_locale_idx\` ON \`categories_breadcrumbs\` (\`_locale\`);`)
  await db.run(sql`ALTER TABLE \`categories_breadcrumbs\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`_categories_v_version_breadcrumbs\` ADD \`_locale\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`_categories_v_version_breadcrumbs\` ADD \`label\` text;`)
  await db.run(sql`CREATE INDEX \`_categories_v_version_breadcrumbs_locale_idx\` ON \`_categories_v_version_breadcrumbs\` (\`_locale\`);`)
  await db.run(sql`ALTER TABLE \`_categories_v_version_breadcrumbs\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`pages_breadcrumbs\` ADD \`_locale\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`pages_breadcrumbs\` ADD \`label\` text;`)
  await db.run(sql`CREATE INDEX \`pages_breadcrumbs_locale_idx\` ON \`pages_breadcrumbs\` (\`_locale\`);`)
  await db.run(sql`ALTER TABLE \`pages_breadcrumbs\` DROP COLUMN \`title\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_version_breadcrumbs\` ADD \`_locale\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`_pages_v_version_breadcrumbs\` ADD \`label\` text;`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_breadcrumbs_locale_idx\` ON \`_pages_v_version_breadcrumbs\` (\`_locale\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_version_breadcrumbs\` DROP COLUMN \`title\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`categories_breadcrumbs_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`categories_breadcrumbs\` ADD \`title\` text;`)
  await db.run(sql`ALTER TABLE \`categories_breadcrumbs\` DROP COLUMN \`_locale\`;`)
  await db.run(sql`ALTER TABLE \`categories_breadcrumbs\` DROP COLUMN \`label\`;`)
  await db.run(sql`DROP INDEX \`_categories_v_version_breadcrumbs_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`_categories_v_version_breadcrumbs\` ADD \`title\` text;`)
  await db.run(sql`ALTER TABLE \`_categories_v_version_breadcrumbs\` DROP COLUMN \`_locale\`;`)
  await db.run(sql`ALTER TABLE \`_categories_v_version_breadcrumbs\` DROP COLUMN \`label\`;`)
  await db.run(sql`DROP INDEX \`pages_breadcrumbs_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`pages_breadcrumbs\` ADD \`title\` text;`)
  await db.run(sql`ALTER TABLE \`pages_breadcrumbs\` DROP COLUMN \`_locale\`;`)
  await db.run(sql`ALTER TABLE \`pages_breadcrumbs\` DROP COLUMN \`label\`;`)
  await db.run(sql`DROP INDEX \`_pages_v_version_breadcrumbs_locale_idx\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_version_breadcrumbs\` ADD \`title\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v_version_breadcrumbs\` DROP COLUMN \`_locale\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_version_breadcrumbs\` DROP COLUMN \`label\`;`)
}
