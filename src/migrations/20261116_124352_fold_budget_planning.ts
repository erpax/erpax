import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_document_details_budget_budget_l_e3addcee\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`gl_account_id\` text,
  	\`account_number\` text,
  	\`account_name\` text,
  	\`account_type\` text,
  	\`budget_amount\` numeric,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_budget\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_budget_budget_l_e3addcee_order_idx\` ON \`pages_document_details_budget_budget_l_e3addcee\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_budget_budget_l_e3addcee_parent_id_idx\` ON \`pages_document_details_budget_budget_l_e3addcee\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_budget_budget_l_e3addcee_gl_accou_idx\` ON \`pages_document_details_budget_budget_l_e3addcee\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_document_details_budget_budget_l_e3addcee_locales\` (
  	\`notes\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_document_details_budget_budget_l_e3addcee\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_document_details_budget_budget_l_e3addcee_locales_pare\` ON \`pages_document_details_budget_budget_l_e3addcee_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_budget\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`project_id\` text(36),
  	\`fiscal_year\` numeric,
  	\`department\` text,
  	\`budget_period\` text DEFAULT 'monthly',
  	\`total_budget\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'draft',
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_budget_order_idx\` ON \`pages_blocks_budget\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_budget_parent_id_idx\` ON \`pages_blocks_budget\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_budget_path_idx\` ON \`pages_blocks_budget\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_budget_project_idx\` ON \`pages_blocks_budget\` (\`project_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_budget_approved_by_idx\` ON \`pages_blocks_budget\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_budget_budget_l_e3addcee_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`gl_account_id\` text,
  	\`account_number\` text,
  	\`account_name\` text,
  	\`account_type\` text,
  	\`budget_amount\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_budget\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_budget_budget_l_e3addcee_v_order_idx\` ON \`_pages_document_details_budget_budget_l_e3addcee_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_budget_budget_l_e3addcee_v_parent_id_idx\` ON \`_pages_document_details_budget_budget_l_e3addcee_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_budget_budget_l_e3addcee_v_gl_ac_idx\` ON \`_pages_document_details_budget_budget_l_e3addcee_v\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_budget_budget_l_e3addcee_v_locales\` (
  	\`notes\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_document_details_budget_budget_l_e3addcee_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_document_details_budget_budget_l_e3addcee_v_locales_p\` ON \`_pages_document_details_budget_budget_l_e3addcee_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_budget\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`project_id\` text(36),
  	\`fiscal_year\` numeric,
  	\`department\` text,
  	\`budget_period\` text DEFAULT 'monthly',
  	\`total_budget\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'draft',
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_budget_order_idx\` ON \`_pages_v_blocks_budget\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_budget_parent_id_idx\` ON \`_pages_v_blocks_budget\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_budget_path_idx\` ON \`_pages_v_blocks_budget\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_budget_project_idx\` ON \`_pages_v_blocks_budget\` (\`project_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_budget_approved_by_idx\` ON \`_pages_v_blocks_budget\` (\`approved_by_id\`);`)
  await db.run(sql`DROP TABLE \`budget_planning_budget_line_items\`;`)
  await db.run(sql`DROP TABLE \`budget_planning_budget_line_items_locales\`;`)
  await db.run(sql`DROP TABLE \`budget_planning\`;`)
  await db.run(sql`DROP TABLE \`budget_planning_rels\`;`)
  await db.run(sql`DROP TABLE \`_budget_planning_v_version_budget_line_items\`;`)
  await db.run(sql`DROP TABLE \`_budget_planning_v_version_budget_line_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_budget_planning_v\`;`)
  await db.run(sql`DROP TABLE \`_budget_planning_v_rels\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`budget_planning_budget_line_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`gl_account_id\` text NOT NULL,
  	\`account_number\` text,
  	\`account_name\` text,
  	\`account_type\` text,
  	\`budget_amount\` numeric NOT NULL,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`budget_planning\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`budget_planning_budget_line_items_order_idx\` ON \`budget_planning_budget_line_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_budget_line_items_parent_id_idx\` ON \`budget_planning_budget_line_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_budget_line_items_gl_account_idx\` ON \`budget_planning_budget_line_items\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`budget_planning_budget_line_items_locales\` (
  	\`notes\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`budget_planning_budget_line_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`budget_planning_budget_line_items_locales_parent_id_locale_u\` ON \`budget_planning_budget_line_items_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`budget_planning\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`project_id\` text(36),
  	\`budget_id\` text NOT NULL,
  	\`fiscal_year\` numeric NOT NULL,
  	\`department\` text NOT NULL,
  	\`budget_period\` text DEFAULT 'monthly',
  	\`total_budget\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'draft',
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`budget_planning_uuid_idx\` ON \`budget_planning\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_tenant_idx\` ON \`budget_planning\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_project_idx\` ON \`budget_planning\` (\`project_id\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_approved_by_idx\` ON \`budget_planning\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_updated_at_idx\` ON \`budget_planning\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_created_at_idx\` ON \`budget_planning\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_budgetId_idx\` ON \`budget_planning\` (\`tenant_id\`,\`budget_id\`);`)
  await db.run(sql`CREATE TABLE \`budget_planning_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`budget_planning\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`budget_planning_rels_order_idx\` ON \`budget_planning_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_rels_parent_idx\` ON \`budget_planning_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_rels_path_idx\` ON \`budget_planning_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_rels_users_id_idx\` ON \`budget_planning_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_budget_planning_v_version_budget_line_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`gl_account_id\` text NOT NULL,
  	\`account_number\` text,
  	\`account_name\` text,
  	\`account_type\` text,
  	\`budget_amount\` numeric NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_budget_planning_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_budget_planning_v_version_budget_line_items_order_idx\` ON \`_budget_planning_v_version_budget_line_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_budget_planning_v_version_budget_line_items_parent_id_idx\` ON \`_budget_planning_v_version_budget_line_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_budget_planning_v_version_budget_line_items_gl_account_idx\` ON \`_budget_planning_v_version_budget_line_items\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`_budget_planning_v_version_budget_line_items_locales\` (
  	\`notes\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_budget_planning_v_version_budget_line_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_budget_planning_v_version_budget_line_items_locales_parent_\` ON \`_budget_planning_v_version_budget_line_items_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_budget_planning_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_project_id\` text(36),
  	\`version_budget_id\` text NOT NULL,
  	\`version_fiscal_year\` numeric NOT NULL,
  	\`version_department\` text NOT NULL,
  	\`version_budget_period\` text DEFAULT 'monthly',
  	\`version_total_budget\` numeric DEFAULT 0,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_status\` text DEFAULT 'draft',
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`budget_planning\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_budget_planning_v_parent_idx\` ON \`_budget_planning_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_budget_planning_v_version_version_uuid_idx\` ON \`_budget_planning_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_budget_planning_v_version_version_tenant_idx\` ON \`_budget_planning_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_budget_planning_v_version_version_project_idx\` ON \`_budget_planning_v\` (\`version_project_id\`);`)
  await db.run(sql`CREATE INDEX \`_budget_planning_v_version_version_approved_by_idx\` ON \`_budget_planning_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_budget_planning_v_version_version_updated_at_idx\` ON \`_budget_planning_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_budget_planning_v_version_version_created_at_idx\` ON \`_budget_planning_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_budget_planning_v_created_at_idx\` ON \`_budget_planning_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_budget_planning_v_updated_at_idx\` ON \`_budget_planning_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_budgetId_idx\` ON \`_budget_planning_v\` (\`version_tenant_id\`,\`version_budget_id\`);`)
  await db.run(sql`CREATE TABLE \`_budget_planning_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_budget_planning_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_budget_planning_v_rels_order_idx\` ON \`_budget_planning_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_budget_planning_v_rels_parent_idx\` ON \`_budget_planning_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_budget_planning_v_rels_path_idx\` ON \`_budget_planning_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_budget_planning_v_rels_users_id_idx\` ON \`_budget_planning_v_rels\` (\`users_id\`);`)
  await db.run(sql`DROP TABLE \`pages_document_details_budget_budget_l_e3addcee\`;`)
  await db.run(sql`DROP TABLE \`pages_document_details_budget_budget_l_e3addcee_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_budget\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_budget_budget_l_e3addcee_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_budget_budget_l_e3addcee_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_budget\`;`)
}
