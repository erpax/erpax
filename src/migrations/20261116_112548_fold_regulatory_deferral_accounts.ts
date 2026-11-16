import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_document_details_regulatory_defe_3db52d94\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`kind\` text,
  	\`regulator\` text,
  	\`status\` text DEFAULT 'active',
  	\`balance\` numeric,
  	\`movement_in_period\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`discount_rate\` numeric,
  	\`recovery_period_end\` text,
  	\`notes\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_regulatory_defe_3db52d94_order_idx\` ON \`pages_document_details_regulatory_defe_3db52d94\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_regulatory_defe_3db52d94_parent_id_idx\` ON \`pages_document_details_regulatory_defe_3db52d94\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_regulatory_defe_3db52d94_path_idx\` ON \`pages_document_details_regulatory_defe_3db52d94\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_regulatory_defe_3db52d94_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`kind\` text,
  	\`regulator\` text,
  	\`status\` text DEFAULT 'active',
  	\`balance\` numeric,
  	\`movement_in_period\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`discount_rate\` numeric,
  	\`recovery_period_end\` text,
  	\`notes\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_regulatory_defe_3db52d94_v_order_idx\` ON \`_pages_document_details_regulatory_defe_3db52d94_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_regulatory_defe_3db52d94_v_parent_id_idx\` ON \`_pages_document_details_regulatory_defe_3db52d94_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_regulatory_defe_3db52d94_v_path_idx\` ON \`_pages_document_details_regulatory_defe_3db52d94_v\` (\`_path\`);`)
  await db.run(sql`DROP TABLE \`regulatory_deferral_accounts\`;`)
  await db.run(sql`DROP TABLE \`regulatory_deferral_accounts_rels\`;`)
  await db.run(sql`DROP TABLE \`_regulatory_deferral_accounts_v\`;`)
  await db.run(sql`DROP TABLE \`_regulatory_deferral_accounts_v_rels\`;`)
  await db.run(sql`DROP INDEX \`tenant_reference_35_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_34_idx\` ON \`rounding_adjustments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_35_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_34_idx\` ON \`_rounding_adjustments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_36_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_35_idx\` ON \`transaction_failures\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_36_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_35_idx\` ON \`_transaction_failures_v\` (\`version_tenant_id\`,\`version_reference\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`regulatory_deferral_accounts\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`kind\` text NOT NULL,
  	\`regulator\` text NOT NULL,
  	\`balance\` numeric NOT NULL,
  	\`discount_rate\` numeric,
  	\`recovery_period_end\` text,
  	\`movement_in_period\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'active',
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`regulatory_deferral_accounts_uuid_idx\` ON \`regulatory_deferral_accounts\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_deferral_accounts_tenant_idx\` ON \`regulatory_deferral_accounts\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_deferral_accounts_approved_by_idx\` ON \`regulatory_deferral_accounts\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_deferral_accounts_updated_at_idx\` ON \`regulatory_deferral_accounts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_deferral_accounts_created_at_idx\` ON \`regulatory_deferral_accounts\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_34_idx\` ON \`regulatory_deferral_accounts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`CREATE TABLE \`regulatory_deferral_accounts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`regulatory_deferral_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`regulatory_deferral_accounts_rels_order_idx\` ON \`regulatory_deferral_accounts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_deferral_accounts_rels_parent_idx\` ON \`regulatory_deferral_accounts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_deferral_accounts_rels_path_idx\` ON \`regulatory_deferral_accounts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_deferral_accounts_rels_users_id_idx\` ON \`regulatory_deferral_accounts_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_regulatory_deferral_accounts_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_reference\` text NOT NULL,
  	\`version_kind\` text NOT NULL,
  	\`version_regulator\` text NOT NULL,
  	\`version_balance\` numeric NOT NULL,
  	\`version_discount_rate\` numeric,
  	\`version_recovery_period_end\` text,
  	\`version_movement_in_period\` numeric DEFAULT 0,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_status\` text DEFAULT 'active',
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`regulatory_deferral_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_regulatory_deferral_accounts_v_parent_idx\` ON \`_regulatory_deferral_accounts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_deferral_accounts_v_version_version_uuid_idx\` ON \`_regulatory_deferral_accounts_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_deferral_accounts_v_version_version_tenant_idx\` ON \`_regulatory_deferral_accounts_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_deferral_accounts_v_version_version_approved_idx\` ON \`_regulatory_deferral_accounts_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_deferral_accounts_v_version_version_updated__idx\` ON \`_regulatory_deferral_accounts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_deferral_accounts_v_version_version_created__idx\` ON \`_regulatory_deferral_accounts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_deferral_accounts_v_created_at_idx\` ON \`_regulatory_deferral_accounts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_deferral_accounts_v_updated_at_idx\` ON \`_regulatory_deferral_accounts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_34_idx\` ON \`_regulatory_deferral_accounts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`CREATE TABLE \`_regulatory_deferral_accounts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_regulatory_deferral_accounts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_regulatory_deferral_accounts_v_rels_order_idx\` ON \`_regulatory_deferral_accounts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_deferral_accounts_v_rels_parent_idx\` ON \`_regulatory_deferral_accounts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_deferral_accounts_v_rels_path_idx\` ON \`_regulatory_deferral_accounts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_deferral_accounts_v_rels_users_id_idx\` ON \`_regulatory_deferral_accounts_v_rels\` (\`users_id\`);`)
  await db.run(sql`DROP TABLE \`pages_document_details_regulatory_defe_3db52d94\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_regulatory_defe_3db52d94_v\`;`)
  await db.run(sql`DROP INDEX \`tenant_reference_34_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_35_idx\` ON \`rounding_adjustments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_34_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_35_idx\` ON \`_rounding_adjustments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_35_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_36_idx\` ON \`transaction_failures\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_35_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_36_idx\` ON \`_transaction_failures_v\` (\`version_tenant_id\`,\`version_reference\`);`)
}
