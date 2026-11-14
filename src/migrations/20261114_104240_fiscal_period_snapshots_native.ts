import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`fiscal_period_snapshots\`;`)
  await db.run(sql`DROP TABLE \`_fiscal_period_snapshots_v\`;`)
  await db.run(sql`ALTER TABLE \`fiscal_periods\` ADD \`change_reason\` text;`)
  await db.run(sql`ALTER TABLE \`_fiscal_periods_v\` ADD \`version_change_reason\` text;`)
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`fiscal_period_snapshots\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`fiscal_periods_id\` text(36) NOT NULL,
  	\`snapshot_label\` text NOT NULL,
  	\`event_type\` text NOT NULL,
  	\`snapshot_data\` text NOT NULL,
  	\`prior_snapshot_id\` text(36),
  	\`changes\` text,
  	\`triggered_by_id\` text(36) NOT NULL,
  	\`triggered_at\` text NOT NULL,
  	\`reason\` text,
  	\`signed_uuid\` text,
  	\`audit_trail\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fiscal_periods_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`prior_snapshot_id\`) REFERENCES \`fiscal_period_snapshots\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`triggered_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`fiscal_period_snapshots_uuid_idx\` ON \`fiscal_period_snapshots\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_period_snapshots_tenant_idx\` ON \`fiscal_period_snapshots\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_period_snapshots_fiscal_periods_idx\` ON \`fiscal_period_snapshots\` (\`fiscal_periods_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_period_snapshots_prior_snapshot_idx\` ON \`fiscal_period_snapshots\` (\`prior_snapshot_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_period_snapshots_triggered_by_idx\` ON \`fiscal_period_snapshots\` (\`triggered_by_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_period_snapshots_updated_at_idx\` ON \`fiscal_period_snapshots\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_period_snapshots_created_at_idx\` ON \`fiscal_period_snapshots\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_fiscal_period_snapshots_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_fiscal_periods_id\` text(36) NOT NULL,
  	\`version_snapshot_label\` text NOT NULL,
  	\`version_event_type\` text NOT NULL,
  	\`version_snapshot_data\` text NOT NULL,
  	\`version_prior_snapshot_id\` text(36),
  	\`version_changes\` text,
  	\`version_triggered_by_id\` text(36) NOT NULL,
  	\`version_triggered_at\` text NOT NULL,
  	\`version_reason\` text,
  	\`version_signed_uuid\` text,
  	\`version_audit_trail\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`fiscal_period_snapshots\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_fiscal_periods_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_prior_snapshot_id\`) REFERENCES \`fiscal_period_snapshots\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_triggered_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_fiscal_period_snapshots_v_parent_idx\` ON \`_fiscal_period_snapshots_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_fiscal_period_snapshots_v_version_version_uuid_idx\` ON \`_fiscal_period_snapshots_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_fiscal_period_snapshots_v_version_version_tenant_idx\` ON \`_fiscal_period_snapshots_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_fiscal_period_snapshots_v_version_version_fiscal_period_idx\` ON \`_fiscal_period_snapshots_v\` (\`version_fiscal_periods_id\`);`)
  await db.run(sql`CREATE INDEX \`_fiscal_period_snapshots_v_version_version_prior_snapsho_idx\` ON \`_fiscal_period_snapshots_v\` (\`version_prior_snapshot_id\`);`)
  await db.run(sql`CREATE INDEX \`_fiscal_period_snapshots_v_version_version_triggered_by_idx\` ON \`_fiscal_period_snapshots_v\` (\`version_triggered_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_fiscal_period_snapshots_v_version_version_updated_at_idx\` ON \`_fiscal_period_snapshots_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_fiscal_period_snapshots_v_version_version_created_at_idx\` ON \`_fiscal_period_snapshots_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_fiscal_period_snapshots_v_created_at_idx\` ON \`_fiscal_period_snapshots_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_fiscal_period_snapshots_v_updated_at_idx\` ON \`_fiscal_period_snapshots_v\` (\`updated_at\`);`)
  await db.run(sql`ALTER TABLE \`fiscal_periods\` DROP COLUMN \`change_reason\`;`)
  await db.run(sql`ALTER TABLE \`_fiscal_periods_v\` DROP COLUMN \`version_change_reason\`;`)
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
}
