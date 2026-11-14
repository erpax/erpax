import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`policy_versions\`;`)
  await db.run(sql`DROP TABLE \`_policy_versions_v\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_policy_acknowledgments\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`policy_id\` text(36) NOT NULL,
  	\`policy_version_number\` text,
  	\`employee_name\` text NOT NULL,
  	\`employee_id\` text,
  	\`acknowledged_date\` text NOT NULL,
  	\`acknowledged_by\` text,
  	\`signed_document_id\` text(36),
  	\`status\` text DEFAULT 'pending',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`policy_id\`) REFERENCES \`internal_policies\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`signed_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_policy_acknowledgments\`("id", "uuid", "tenant_id", "policy_id", "policy_version_number", "employee_name", "employee_id", "acknowledged_date", "acknowledged_by", "signed_document_id", "status", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "policy_id", "policy_version_number", "employee_name", "employee_id", "acknowledged_date", "acknowledged_by", "signed_document_id", "status", "updated_at", "created_at" FROM \`policy_acknowledgments\`;`)
  await db.run(sql`DROP TABLE \`policy_acknowledgments\`;`)
  await db.run(sql`ALTER TABLE \`__new_policy_acknowledgments\` RENAME TO \`policy_acknowledgments\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`policy_acknowledgments_uuid_idx\` ON \`policy_acknowledgments\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_tenant_idx\` ON \`policy_acknowledgments\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_policy_idx\` ON \`policy_acknowledgments\` (\`policy_id\`);`)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_policy_version_number_idx\` ON \`policy_acknowledgments\` (\`policy_version_number\`);`)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_signed_document_idx\` ON \`policy_acknowledgments\` (\`signed_document_id\`);`)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_updated_at_idx\` ON \`policy_acknowledgments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_created_at_idx\` ON \`policy_acknowledgments\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__policy_acknowledgments_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_policy_id\` text(36) NOT NULL,
  	\`version_policy_version_number\` text,
  	\`version_employee_name\` text NOT NULL,
  	\`version_employee_id\` text,
  	\`version_acknowledged_date\` text NOT NULL,
  	\`version_acknowledged_by\` text,
  	\`version_signed_document_id\` text(36),
  	\`version_status\` text DEFAULT 'pending',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`policy_acknowledgments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_policy_id\`) REFERENCES \`internal_policies\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_signed_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__policy_acknowledgments_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_policy_id", "version_policy_version_number", "version_employee_name", "version_employee_id", "version_acknowledged_date", "version_acknowledged_by", "version_signed_document_id", "version_status", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_policy_id", "version_policy_version_number", "version_employee_name", "version_employee_id", "version_acknowledged_date", "version_acknowledged_by", "version_signed_document_id", "version_status", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_policy_acknowledgments_v\`;`)
  await db.run(sql`DROP TABLE \`_policy_acknowledgments_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__policy_acknowledgments_v\` RENAME TO \`_policy_acknowledgments_v\`;`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_parent_idx\` ON \`_policy_acknowledgments_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_version_version_uuid_idx\` ON \`_policy_acknowledgments_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_version_version_tenant_idx\` ON \`_policy_acknowledgments_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_version_version_policy_idx\` ON \`_policy_acknowledgments_v\` (\`version_policy_id\`);`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_version_version_policy_version_idx\` ON \`_policy_acknowledgments_v\` (\`version_policy_version_number\`);`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_version_version_signed_documen_idx\` ON \`_policy_acknowledgments_v\` (\`version_signed_document_id\`);`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_version_version_updated_at_idx\` ON \`_policy_acknowledgments_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_version_version_created_at_idx\` ON \`_policy_acknowledgments_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_created_at_idx\` ON \`_policy_acknowledgments_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_updated_at_idx\` ON \`_policy_acknowledgments_v\` (\`updated_at\`);`)
  await db.run(sql`ALTER TABLE \`internal_policies\` ADD \`version_number\` text;`)
  await db.run(sql`ALTER TABLE \`internal_policies\` ADD \`version_name\` text;`)
  await db.run(sql`ALTER TABLE \`internal_policies\` ADD \`release_date\` text;`)
  await db.run(sql`ALTER TABLE \`internal_policies\` ADD \`changes\` text;`)
  await db.run(sql`ALTER TABLE \`_internal_policies_v\` ADD \`version_version_number\` text;`)
  await db.run(sql`ALTER TABLE \`_internal_policies_v\` ADD \`version_version_name\` text;`)
  await db.run(sql`ALTER TABLE \`_internal_policies_v\` ADD \`version_release_date\` text;`)
  await db.run(sql`ALTER TABLE \`_internal_policies_v\` ADD \`version_changes\` text;`)
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`policy_versions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`policy_id\` text(36) NOT NULL,
  	\`version_number\` text NOT NULL,
  	\`version_name\` text NOT NULL,
  	\`release_date\` text NOT NULL,
  	\`changes\` text,
  	\`document_url_id\` text(36),
  	\`status\` text DEFAULT 'draft',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`policy_id\`) REFERENCES \`internal_policies\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`document_url_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`policy_versions_uuid_idx\` ON \`policy_versions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`policy_versions_tenant_idx\` ON \`policy_versions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`policy_versions_policy_idx\` ON \`policy_versions\` (\`policy_id\`);`)
  await db.run(sql`CREATE INDEX \`policy_versions_document_url_idx\` ON \`policy_versions\` (\`document_url_id\`);`)
  await db.run(sql`CREATE INDEX \`policy_versions_updated_at_idx\` ON \`policy_versions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`policy_versions_created_at_idx\` ON \`policy_versions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_policy_versions_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_policy_id\` text(36) NOT NULL,
  	\`version_version_number\` text NOT NULL,
  	\`version_version_name\` text NOT NULL,
  	\`version_release_date\` text NOT NULL,
  	\`version_changes\` text,
  	\`version_document_url_id\` text(36),
  	\`version_status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`policy_versions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_policy_id\`) REFERENCES \`internal_policies\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_document_url_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_policy_versions_v_parent_idx\` ON \`_policy_versions_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_policy_versions_v_version_version_uuid_idx\` ON \`_policy_versions_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_policy_versions_v_version_version_tenant_idx\` ON \`_policy_versions_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_policy_versions_v_version_version_policy_idx\` ON \`_policy_versions_v\` (\`version_policy_id\`);`)
  await db.run(sql`CREATE INDEX \`_policy_versions_v_version_version_document_url_idx\` ON \`_policy_versions_v\` (\`version_document_url_id\`);`)
  await db.run(sql`CREATE INDEX \`_policy_versions_v_version_version_updated_at_idx\` ON \`_policy_versions_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_policy_versions_v_version_version_created_at_idx\` ON \`_policy_versions_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_policy_versions_v_created_at_idx\` ON \`_policy_versions_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_policy_versions_v_updated_at_idx\` ON \`_policy_versions_v\` (\`updated_at\`);`)
  await db.run(sql`DROP INDEX \`policy_acknowledgments_policy_version_number_idx\`;`)
  await db.run(sql`ALTER TABLE \`policy_acknowledgments\` ADD \`policy_version_id\` text(36) REFERENCES policy_versions(id);`)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_policy_version_idx\` ON \`policy_acknowledgments\` (\`policy_version_id\`);`)
  await db.run(sql`ALTER TABLE \`policy_acknowledgments\` DROP COLUMN \`policy_version_number\`;`)
  await db.run(sql`DROP INDEX \`_policy_acknowledgments_v_version_version_policy_version_idx\`;`)
  await db.run(sql`ALTER TABLE \`_policy_acknowledgments_v\` ADD \`version_policy_version_id\` text(36) REFERENCES policy_versions(id);`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_version_version_policy_version_idx\` ON \`_policy_acknowledgments_v\` (\`version_policy_version_id\`);`)
  await db.run(sql`ALTER TABLE \`_policy_acknowledgments_v\` DROP COLUMN \`version_policy_version_number\`;`)
  await db.run(sql`ALTER TABLE \`internal_policies\` DROP COLUMN \`version_number\`;`)
  await db.run(sql`ALTER TABLE \`internal_policies\` DROP COLUMN \`version_name\`;`)
  await db.run(sql`ALTER TABLE \`internal_policies\` DROP COLUMN \`release_date\`;`)
  await db.run(sql`ALTER TABLE \`internal_policies\` DROP COLUMN \`changes\`;`)
  await db.run(sql`ALTER TABLE \`_internal_policies_v\` DROP COLUMN \`version_version_number\`;`)
  await db.run(sql`ALTER TABLE \`_internal_policies_v\` DROP COLUMN \`version_version_name\`;`)
  await db.run(sql`ALTER TABLE \`_internal_policies_v\` DROP COLUMN \`version_release_date\`;`)
  await db.run(sql`ALTER TABLE \`_internal_policies_v\` DROP COLUMN \`version_changes\`;`)
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
}
