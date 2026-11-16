import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_document_details_processing_acti_77e68264\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text,
  	\`special\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_document_details_processing_acti_d3c7a075\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_processing_acti_77e68264_order_idx\` ON \`pages_document_details_processing_acti_77e68264\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_processing_acti_77e68264_parent_id_idx\` ON \`pages_document_details_processing_acti_77e68264\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_document_details_processing_acti_b40806fe\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_document_details_processing_acti_d3c7a075\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_processing_acti_b40806fe_order_idx\` ON \`pages_document_details_processing_acti_b40806fe\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_processing_acti_b40806fe_parent_id_idx\` ON \`pages_document_details_processing_acti_b40806fe\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_document_details_processing_acti_741fe9e1\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_document_details_processing_acti_d3c7a075\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_processing_acti_741fe9e1_order_idx\` ON \`pages_document_details_processing_acti_741fe9e1\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_processing_acti_741fe9e1_parent_id_idx\` ON \`pages_document_details_processing_acti_741fe9e1\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_document_details_processing_acti_741fe9e1_locales\` (
  	\`recipient\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_document_details_processing_acti_741fe9e1\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_document_details_processing_acti_741fe9e1_locales_pare\` ON \`pages_document_details_processing_acti_741fe9e1_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`pages_document_details_processing_acti_35286bbe\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`country\` text,
  	\`safeguard\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_document_details_processing_acti_d3c7a075\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_processing_acti_35286bbe_order_idx\` ON \`pages_document_details_processing_acti_35286bbe\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_processing_acti_35286bbe_parent_id_idx\` ON \`pages_document_details_processing_acti_35286bbe\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_document_details_processing_acti_d3c7a075\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`controller_or_processor\` text,
  	\`lawful_basis\` text,
  	\`status\` text DEFAULT 'active',
  	\`retention_period\` text,
  	\`review_due_at\` text,
  	\`dpo_id\` text(36),
  	\`security_measures\` text,
  	\`notes\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`dpo_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_processing_acti_d3c7a075_order_idx\` ON \`pages_document_details_processing_acti_d3c7a075\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_processing_acti_d3c7a075_parent_id_idx\` ON \`pages_document_details_processing_acti_d3c7a075\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_processing_acti_d3c7a075_path_idx\` ON \`pages_document_details_processing_acti_d3c7a075\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_processing_acti_d3c7a075_dpo_idx\` ON \`pages_document_details_processing_acti_d3c7a075\` (\`dpo_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_processing_acti_77e68264_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`category\` text,
  	\`special\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_document_details_processing_acti_d3c7a075_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_processing_acti_77e68264_v_order_idx\` ON \`_pages_document_details_processing_acti_77e68264_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_processing_acti_77e68264_v_parent_id_idx\` ON \`_pages_document_details_processing_acti_77e68264_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_processing_acti_b40806fe_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`category\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_document_details_processing_acti_d3c7a075_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_processing_acti_b40806fe_v_order_idx\` ON \`_pages_document_details_processing_acti_b40806fe_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_processing_acti_b40806fe_v_parent_id_idx\` ON \`_pages_document_details_processing_acti_b40806fe_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_processing_acti_741fe9e1_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_document_details_processing_acti_d3c7a075_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_processing_acti_741fe9e1_v_order_idx\` ON \`_pages_document_details_processing_acti_741fe9e1_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_processing_acti_741fe9e1_v_parent_id_idx\` ON \`_pages_document_details_processing_acti_741fe9e1_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_processing_acti_741fe9e1_v_locales\` (
  	\`recipient\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_document_details_processing_acti_741fe9e1_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_document_details_processing_acti_741fe9e1_v_locales_p\` ON \`_pages_document_details_processing_acti_741fe9e1_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_processing_acti_35286bbe_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`country\` text,
  	\`safeguard\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_document_details_processing_acti_d3c7a075_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_processing_acti_35286bbe_v_order_idx\` ON \`_pages_document_details_processing_acti_35286bbe_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_processing_acti_35286bbe_v_parent_id_idx\` ON \`_pages_document_details_processing_acti_35286bbe_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_processing_acti_d3c7a075_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`controller_or_processor\` text,
  	\`lawful_basis\` text,
  	\`status\` text DEFAULT 'active',
  	\`retention_period\` text,
  	\`review_due_at\` text,
  	\`dpo_id\` text(36),
  	\`security_measures\` text,
  	\`notes\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`dpo_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_processing_acti_d3c7a075_v_order_idx\` ON \`_pages_document_details_processing_acti_d3c7a075_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_processing_acti_d3c7a075_v_parent_id_idx\` ON \`_pages_document_details_processing_acti_d3c7a075_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_processing_acti_d3c7a075_v_path_idx\` ON \`_pages_document_details_processing_acti_d3c7a075_v\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_processing_acti_d3c7a075_v_dpo_idx\` ON \`_pages_document_details_processing_acti_d3c7a075_v\` (\`dpo_id\`);`)
  await db.run(sql`DROP TABLE \`data_processing_activities_data_catego_89747974\`;`)
  await db.run(sql`DROP TABLE \`data_processing_activities_data_subjec_4b2d0cf9\`;`)
  await db.run(sql`DROP TABLE \`data_processing_activities_recipient_c_d5b0fb68\`;`)
  await db.run(sql`DROP TABLE \`data_processing_activities_recipient_c_d5b0fb68_locales\`;`)
  await db.run(sql`DROP TABLE \`transfers\`;`)
  await db.run(sql`DROP TABLE \`data_processing_activities\`;`)
  await db.run(sql`DROP TABLE \`data_processing_activities_rels\`;`)
  await db.run(sql`DROP TABLE \`_data_processing_activities_data_catego_89747974_v\`;`)
  await db.run(sql`DROP TABLE \`_data_processing_activities_data_subjec_4b2d0cf9_v\`;`)
  await db.run(sql`DROP TABLE \`_data_processing_activities_recipient_c_d5b0fb68_v\`;`)
  await db.run(sql`DROP TABLE \`_data_processing_activities_recipient_c_d5b0fb68_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_transfers_v\`;`)
  await db.run(sql`DROP TABLE \`_data_processing_activities_v\`;`)
  await db.run(sql`DROP TABLE \`_data_processing_activities_v_rels\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`data_processing_activities_data_catego_89747974\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`special\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`data_processing_activities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`data_processing_activities_data_catego_89747974_order_idx\` ON \`data_processing_activities_data_catego_89747974\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_data_catego_89747974_parent_id_idx\` ON \`data_processing_activities_data_catego_89747974\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`data_processing_activities_data_subjec_4b2d0cf9\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`data_processing_activities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`data_processing_activities_data_subjec_4b2d0cf9_order_idx\` ON \`data_processing_activities_data_subjec_4b2d0cf9\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_data_subjec_4b2d0cf9_parent_id_idx\` ON \`data_processing_activities_data_subjec_4b2d0cf9\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`data_processing_activities_recipient_c_d5b0fb68\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`data_processing_activities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`data_processing_activities_recipient_c_d5b0fb68_order_idx\` ON \`data_processing_activities_recipient_c_d5b0fb68\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_recipient_c_d5b0fb68_parent_id_idx\` ON \`data_processing_activities_recipient_c_d5b0fb68\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`data_processing_activities_recipient_c_d5b0fb68_locales\` (
  	\`recipient\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`data_processing_activities_recipient_c_d5b0fb68\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`data_processing_activities_recipient_c_d5b0fb68_locales_pare\` ON \`data_processing_activities_recipient_c_d5b0fb68_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`transfers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`country\` text NOT NULL,
  	\`safeguard\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`data_processing_activities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`transfers_order_idx\` ON \`transfers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`transfers_parent_id_idx\` ON \`transfers\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`data_processing_activities\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`activity_name\` text NOT NULL,
  	\`purpose\` text NOT NULL,
  	\`controller_or_processor\` text NOT NULL,
  	\`lawful_basis\` text NOT NULL,
  	\`retention_period\` text NOT NULL,
  	\`security_measures\` text,
  	\`status\` text DEFAULT 'active',
  	\`review_due_at\` text NOT NULL,
  	\`dpo_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`dpo_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`data_processing_activities_uuid_idx\` ON \`data_processing_activities\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_tenant_idx\` ON \`data_processing_activities\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_dpo_idx\` ON \`data_processing_activities\` (\`dpo_id\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_approved_by_idx\` ON \`data_processing_activities\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_updated_at_idx\` ON \`data_processing_activities\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_created_at_idx\` ON \`data_processing_activities\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_activityName_idx\` ON \`data_processing_activities\` (\`tenant_id\`,\`activity_name\`);`)
  await db.run(sql`CREATE TABLE \`data_processing_activities_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`data_processing_activities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`data_processing_activities_rels_order_idx\` ON \`data_processing_activities_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_rels_parent_idx\` ON \`data_processing_activities_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_rels_path_idx\` ON \`data_processing_activities_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_rels_users_id_idx\` ON \`data_processing_activities_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_data_processing_activities_data_catego_89747974_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`special\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_data_processing_activities_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_data_processing_activities_data_catego_89747974_v_order_idx\` ON \`_data_processing_activities_data_catego_89747974_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_data_processing_activities_data_catego_89747974_v_parent_id_idx\` ON \`_data_processing_activities_data_catego_89747974_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_data_processing_activities_data_subjec_4b2d0cf9_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_data_processing_activities_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_data_processing_activities_data_subjec_4b2d0cf9_v_order_idx\` ON \`_data_processing_activities_data_subjec_4b2d0cf9_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_data_processing_activities_data_subjec_4b2d0cf9_v_parent_id_idx\` ON \`_data_processing_activities_data_subjec_4b2d0cf9_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_data_processing_activities_recipient_c_d5b0fb68_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_data_processing_activities_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_data_processing_activities_recipient_c_d5b0fb68_v_order_idx\` ON \`_data_processing_activities_recipient_c_d5b0fb68_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_data_processing_activities_recipient_c_d5b0fb68_v_parent_id_idx\` ON \`_data_processing_activities_recipient_c_d5b0fb68_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_data_processing_activities_recipient_c_d5b0fb68_v_locales\` (
  	\`recipient\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_data_processing_activities_recipient_c_d5b0fb68_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_data_processing_activities_recipient_c_d5b0fb68_v_locales_p\` ON \`_data_processing_activities_recipient_c_d5b0fb68_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_transfers_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`country\` text NOT NULL,
  	\`safeguard\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_data_processing_activities_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_transfers_v_order_idx\` ON \`_transfers_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_transfers_v_parent_id_idx\` ON \`_transfers_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_data_processing_activities_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_activity_name\` text NOT NULL,
  	\`version_purpose\` text NOT NULL,
  	\`version_controller_or_processor\` text NOT NULL,
  	\`version_lawful_basis\` text NOT NULL,
  	\`version_retention_period\` text NOT NULL,
  	\`version_security_measures\` text,
  	\`version_status\` text DEFAULT 'active',
  	\`version_review_due_at\` text NOT NULL,
  	\`version_dpo_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`data_processing_activities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_dpo_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_data_processing_activities_v_parent_idx\` ON \`_data_processing_activities_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_data_processing_activities_v_version_version_uuid_idx\` ON \`_data_processing_activities_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_data_processing_activities_v_version_version_tenant_idx\` ON \`_data_processing_activities_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_data_processing_activities_v_version_version_dpo_idx\` ON \`_data_processing_activities_v\` (\`version_dpo_id\`);`)
  await db.run(sql`CREATE INDEX \`_data_processing_activities_v_version_version_approved_b_idx\` ON \`_data_processing_activities_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_data_processing_activities_v_version_version_updated_at_idx\` ON \`_data_processing_activities_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_data_processing_activities_v_version_version_created_at_idx\` ON \`_data_processing_activities_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_data_processing_activities_v_created_at_idx\` ON \`_data_processing_activities_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_data_processing_activities_v_updated_at_idx\` ON \`_data_processing_activities_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_activityName_idx\` ON \`_data_processing_activities_v\` (\`version_tenant_id\`,\`version_activity_name\`);`)
  await db.run(sql`CREATE TABLE \`_data_processing_activities_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_data_processing_activities_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_data_processing_activities_v_rels_order_idx\` ON \`_data_processing_activities_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_data_processing_activities_v_rels_parent_idx\` ON \`_data_processing_activities_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_data_processing_activities_v_rels_path_idx\` ON \`_data_processing_activities_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_data_processing_activities_v_rels_users_id_idx\` ON \`_data_processing_activities_v_rels\` (\`users_id\`);`)
  await db.run(sql`DROP TABLE \`pages_document_details_processing_acti_77e68264\`;`)
  await db.run(sql`DROP TABLE \`pages_document_details_processing_acti_b40806fe\`;`)
  await db.run(sql`DROP TABLE \`pages_document_details_processing_acti_741fe9e1\`;`)
  await db.run(sql`DROP TABLE \`pages_document_details_processing_acti_741fe9e1_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_document_details_processing_acti_35286bbe\`;`)
  await db.run(sql`DROP TABLE \`pages_document_details_processing_acti_d3c7a075\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_processing_acti_77e68264_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_processing_acti_b40806fe_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_processing_acti_741fe9e1_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_processing_acti_741fe9e1_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_processing_acti_35286bbe_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_processing_acti_d3c7a075_v\`;`)
}
