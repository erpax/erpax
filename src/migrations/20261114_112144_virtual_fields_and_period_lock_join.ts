import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`period_locks_rels\`;`)
  await db.run(sql`DROP TABLE \`_period_locks_v_rels\`;`)
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`period_locks_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`closing_entries_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`period_locks\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`closing_entries_id\`) REFERENCES \`closing_entries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`period_locks_rels_order_idx\` ON \`period_locks_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`period_locks_rels_parent_idx\` ON \`period_locks_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`period_locks_rels_path_idx\` ON \`period_locks_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`period_locks_rels_closing_entries_id_idx\` ON \`period_locks_rels\` (\`closing_entries_id\`);`)
  await db.run(sql`CREATE TABLE \`_period_locks_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`closing_entries_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_period_locks_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`closing_entries_id\`) REFERENCES \`closing_entries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_period_locks_v_rels_order_idx\` ON \`_period_locks_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_period_locks_v_rels_parent_idx\` ON \`_period_locks_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_period_locks_v_rels_path_idx\` ON \`_period_locks_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_period_locks_v_rels_closing_entries_id_idx\` ON \`_period_locks_v_rels\` (\`closing_entries_id\`);`)
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
}
