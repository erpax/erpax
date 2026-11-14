import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`ea24bc9013544855da0f5f782d0971ded\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`area\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e613ebfd330e58c40b7e710e3a1566a25\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ea24bc9013544855da0f5f782d0971ded_order_idx\` ON \`ea24bc9013544855da0f5f782d0971ded\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ea24bc9013544855da0f5f782d0971ded_parent_id_idx\` ON \`ea24bc9013544855da0f5f782d0971ded\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e613ebfd330e58c40b7e710e3a1566a25\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`member_name\` text NOT NULL,
  	\`title\` text,
  	\`affiliation\` text NOT NULL,
  	\`appointed_date\` text NOT NULL,
  	\`term_end_date\` text,
  	\`role\` text,
  	\`status\` text DEFAULT 'active',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_committees\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e613ebfd330e58c40b7e710e3a1566a25_order_idx\` ON \`e613ebfd330e58c40b7e710e3a1566a25\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e613ebfd330e58c40b7e710e3a1566a25_parent_id_idx\` ON \`e613ebfd330e58c40b7e710e3a1566a25\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ea24bc9013544855da0f5f782d0971ded_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`area\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e613ebfd330e58c40b7e710e3a1566a25_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ea24bc9013544855da0f5f782d0971ded_v_order_idx\` ON \`_ea24bc9013544855da0f5f782d0971ded_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ea24bc9013544855da0f5f782d0971ded_v_parent_id_idx\` ON \`_ea24bc9013544855da0f5f782d0971ded_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e613ebfd330e58c40b7e710e3a1566a25_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`member_name\` text NOT NULL,
  	\`title\` text,
  	\`affiliation\` text NOT NULL,
  	\`appointed_date\` text NOT NULL,
  	\`term_end_date\` text,
  	\`role\` text,
  	\`status\` text DEFAULT 'active',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_committees_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e613ebfd330e58c40b7e710e3a1566a25_v_order_idx\` ON \`_e613ebfd330e58c40b7e710e3a1566a25_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e613ebfd330e58c40b7e710e3a1566a25_v_parent_id_idx\` ON \`_e613ebfd330e58c40b7e710e3a1566a25_v\` (\`_parent_id\`);`)
  await db.run(sql`DROP TABLE \`ecc9fd5637b9c8429b03a8b23abb12a0a\`;`)
  await db.run(sql`DROP TABLE \`audit_committee_members\`;`)
  await db.run(sql`DROP TABLE \`_ecc9fd5637b9c8429b03a8b23abb12a0a_v\`;`)
  await db.run(sql`DROP TABLE \`_audit_committee_members_v\`;`)
  await db.run(sql`DROP TABLE \`audit_committees_rels\`;`)
  await db.run(sql`DROP TABLE \`_audit_committees_v_rels\`;`)
  await db.run(sql`DROP TABLE \`gl_posting_rules\`;`)
  await db.run(sql`DROP TABLE \`gl_posting_rules_rels\`;`)
  await db.run(sql`DROP TABLE \`_gl_posting_rules_v\`;`)
  await db.run(sql`DROP TABLE \`_gl_posting_rules_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`gl_accounts\` ADD \`requires_reconciliation\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`gl_accounts\` ADD \`reconciliation_frequency\` text;`)
  await db.run(sql`ALTER TABLE \`gl_accounts\` ADD \`is_cash_flow_relevant\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`gl_accounts\` ADD \`closes_at_period_end\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_gl_accounts_v\` ADD \`version_requires_reconciliation\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_gl_accounts_v\` ADD \`version_reconciliation_frequency\` text;`)
  await db.run(sql`ALTER TABLE \`_gl_accounts_v\` ADD \`version_is_cash_flow_relevant\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_gl_accounts_v\` ADD \`version_closes_at_period_end\` integer DEFAULT false;`)
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`ecc9fd5637b9c8429b03a8b23abb12a0a\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`area\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_committee_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ecc9fd5637b9c8429b03a8b23abb12a0a_order_idx\` ON \`ecc9fd5637b9c8429b03a8b23abb12a0a\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ecc9fd5637b9c8429b03a8b23abb12a0a_parent_id_idx\` ON \`ecc9fd5637b9c8429b03a8b23abb12a0a\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`audit_committee_members\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`committee_id\` text(36) NOT NULL,
  	\`member_name\` text NOT NULL,
  	\`title\` text,
  	\`affiliation\` text NOT NULL,
  	\`appointed_date\` text NOT NULL,
  	\`term_end_date\` text,
  	\`role\` text,
  	\`status\` text DEFAULT 'active',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`committee_id\`) REFERENCES \`audit_committees\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`audit_committee_members_uuid_idx\` ON \`audit_committee_members\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`audit_committee_members_tenant_idx\` ON \`audit_committee_members\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_committee_members_committee_idx\` ON \`audit_committee_members\` (\`committee_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_committee_members_updated_at_idx\` ON \`audit_committee_members\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`audit_committee_members_created_at_idx\` ON \`audit_committee_members\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_ecc9fd5637b9c8429b03a8b23abb12a0a_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`area\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_committee_members_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ecc9fd5637b9c8429b03a8b23abb12a0a_v_order_idx\` ON \`_ecc9fd5637b9c8429b03a8b23abb12a0a_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ecc9fd5637b9c8429b03a8b23abb12a0a_v_parent_id_idx\` ON \`_ecc9fd5637b9c8429b03a8b23abb12a0a_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_audit_committee_members_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_committee_id\` text(36) NOT NULL,
  	\`version_member_name\` text NOT NULL,
  	\`version_title\` text,
  	\`version_affiliation\` text NOT NULL,
  	\`version_appointed_date\` text NOT NULL,
  	\`version_term_end_date\` text,
  	\`version_role\` text,
  	\`version_status\` text DEFAULT 'active',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`audit_committee_members\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_committee_id\`) REFERENCES \`audit_committees\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_audit_committee_members_v_parent_idx\` ON \`_audit_committee_members_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_audit_committee_members_v_version_version_uuid_idx\` ON \`_audit_committee_members_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_audit_committee_members_v_version_version_tenant_idx\` ON \`_audit_committee_members_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_audit_committee_members_v_version_version_committee_idx\` ON \`_audit_committee_members_v\` (\`version_committee_id\`);`)
  await db.run(sql`CREATE INDEX \`_audit_committee_members_v_version_version_updated_at_idx\` ON \`_audit_committee_members_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_audit_committee_members_v_version_version_created_at_idx\` ON \`_audit_committee_members_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_audit_committee_members_v_created_at_idx\` ON \`_audit_committee_members_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_audit_committee_members_v_updated_at_idx\` ON \`_audit_committee_members_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`audit_committees_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_committee_members_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`audit_committees\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_committee_members_id\`) REFERENCES \`audit_committee_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`audit_committees_rels_order_idx\` ON \`audit_committees_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`audit_committees_rels_parent_idx\` ON \`audit_committees_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_committees_rels_path_idx\` ON \`audit_committees_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`audit_committees_rels_audit_committee_members_id_idx\` ON \`audit_committees_rels\` (\`audit_committee_members_id\`);`)
  await db.run(sql`CREATE TABLE \`_audit_committees_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_committee_members_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_audit_committees_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_committee_members_id\`) REFERENCES \`audit_committee_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_audit_committees_v_rels_order_idx\` ON \`_audit_committees_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_audit_committees_v_rels_parent_idx\` ON \`_audit_committees_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_audit_committees_v_rels_path_idx\` ON \`_audit_committees_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_audit_committees_v_rels_audit_committee_members_id_idx\` ON \`_audit_committees_v_rels\` (\`audit_committee_members_id\`);`)
  await db.run(sql`CREATE TABLE \`gl_posting_rules\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`account_type\` text NOT NULL,
  	\`normal_polarity\` text NOT NULL,
  	\`balance_sheet_category\` text NOT NULL,
  	\`requires_reconciliation\` integer DEFAULT false,
  	\`reconciliation_frequency\` text,
  	\`is_cash_flow_relevant\` integer DEFAULT false,
  	\`closes_at_period_end\` integer DEFAULT false,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`gl_posting_rules_uuid_idx\` ON \`gl_posting_rules\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`gl_posting_rules_tenant_idx\` ON \`gl_posting_rules\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`gl_posting_rules_updated_at_idx\` ON \`gl_posting_rules\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`gl_posting_rules_created_at_idx\` ON \`gl_posting_rules\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`gl_posting_rules_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`gl_accounts_id\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`gl_posting_rules\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`gl_accounts_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`gl_posting_rules_rels_order_idx\` ON \`gl_posting_rules_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`gl_posting_rules_rels_parent_idx\` ON \`gl_posting_rules_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`gl_posting_rules_rels_path_idx\` ON \`gl_posting_rules_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`gl_posting_rules_rels_gl_accounts_id_idx\` ON \`gl_posting_rules_rels\` (\`gl_accounts_id\`);`)
  await db.run(sql`CREATE TABLE \`_gl_posting_rules_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_account_type\` text NOT NULL,
  	\`version_normal_polarity\` text NOT NULL,
  	\`version_balance_sheet_category\` text NOT NULL,
  	\`version_requires_reconciliation\` integer DEFAULT false,
  	\`version_reconciliation_frequency\` text,
  	\`version_is_cash_flow_relevant\` integer DEFAULT false,
  	\`version_closes_at_period_end\` integer DEFAULT false,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`gl_posting_rules\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_gl_posting_rules_v_parent_idx\` ON \`_gl_posting_rules_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_gl_posting_rules_v_version_version_uuid_idx\` ON \`_gl_posting_rules_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_gl_posting_rules_v_version_version_tenant_idx\` ON \`_gl_posting_rules_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_gl_posting_rules_v_version_version_updated_at_idx\` ON \`_gl_posting_rules_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_gl_posting_rules_v_version_version_created_at_idx\` ON \`_gl_posting_rules_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_gl_posting_rules_v_created_at_idx\` ON \`_gl_posting_rules_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_gl_posting_rules_v_updated_at_idx\` ON \`_gl_posting_rules_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_gl_posting_rules_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`gl_accounts_id\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_gl_posting_rules_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`gl_accounts_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_gl_posting_rules_v_rels_order_idx\` ON \`_gl_posting_rules_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_gl_posting_rules_v_rels_parent_idx\` ON \`_gl_posting_rules_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_gl_posting_rules_v_rels_path_idx\` ON \`_gl_posting_rules_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_gl_posting_rules_v_rels_gl_accounts_id_idx\` ON \`_gl_posting_rules_v_rels\` (\`gl_accounts_id\`);`)
  await db.run(sql`DROP TABLE \`ea24bc9013544855da0f5f782d0971ded\`;`)
  await db.run(sql`DROP TABLE \`e613ebfd330e58c40b7e710e3a1566a25\`;`)
  await db.run(sql`DROP TABLE \`_ea24bc9013544855da0f5f782d0971ded_v\`;`)
  await db.run(sql`DROP TABLE \`_e613ebfd330e58c40b7e710e3a1566a25_v\`;`)
  await db.run(sql`ALTER TABLE \`gl_accounts\` DROP COLUMN \`requires_reconciliation\`;`)
  await db.run(sql`ALTER TABLE \`gl_accounts\` DROP COLUMN \`reconciliation_frequency\`;`)
  await db.run(sql`ALTER TABLE \`gl_accounts\` DROP COLUMN \`is_cash_flow_relevant\`;`)
  await db.run(sql`ALTER TABLE \`gl_accounts\` DROP COLUMN \`closes_at_period_end\`;`)
  await db.run(sql`ALTER TABLE \`_gl_accounts_v\` DROP COLUMN \`version_requires_reconciliation\`;`)
  await db.run(sql`ALTER TABLE \`_gl_accounts_v\` DROP COLUMN \`version_reconciliation_frequency\`;`)
  await db.run(sql`ALTER TABLE \`_gl_accounts_v\` DROP COLUMN \`version_is_cash_flow_relevant\`;`)
  await db.run(sql`ALTER TABLE \`_gl_accounts_v\` DROP COLUMN \`version_closes_at_period_end\`;`)
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
}
