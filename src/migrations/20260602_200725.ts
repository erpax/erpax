import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`tenants\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`name\` text NOT NULL,
  	\`domain\` text,
  	\`slug\` text NOT NULL,
  	\`locales\` text DEFAULT '[]',
  	\`config_identity_country\` text,
  	\`config_identity_legal_name\` text,
  	\`config_identity_tax_registration\` text,
  	\`config_localization_default_locale\` text,
  	\`config_localization_fallback_locale\` text,
  	\`config_currency_reporting_currency\` text,
  	\`config_accounting_standard\` text,
  	\`config_accounting_fiscal_year_start_month\` numeric DEFAULT 1,
  	\`allow_public_read\` integer DEFAULT false,
  	\`public_site_url\` text,
  	\`stripe_publishable_key\` text,
  	\`stripe_secret_key\` text,
  	\`stripe_webhook_secret\` text,
  	\`integration_settings\` text,
  	\`resend_api_key\` text,
  	\`email_default_from_address\` text,
  	\`email_default_from_name\` text,
  	\`mcp_api_key\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tenants_uuid_idx\` ON \`tenants\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`tenants_domain_idx\` ON \`tenants\` (\`domain\`);`)
  await db.run(sql`CREATE INDEX \`tenants_slug_idx\` ON \`tenants\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`tenants_allow_public_read_idx\` ON \`tenants\` (\`allow_public_read\`);`)
  await db.run(sql`CREATE INDEX \`tenants_updated_at_idx\` ON \`tenants\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tenants_created_at_idx\` ON \`tenants\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`eb6619ccc69668dd8a8e13e6b854fec14\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`competency\` text NOT NULL,
  	\`proficiency\` numeric,
  	\`assessed_at\` text,
  	\`evidence\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eb6619ccc69668dd8a8e13e6b854fec14_order_idx\` ON \`eb6619ccc69668dd8a8e13e6b854fec14\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eb6619ccc69668dd8a8e13e6b854fec14_parent_id_idx\` ON \`eb6619ccc69668dd8a8e13e6b854fec14\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`eb6619ccc69668dd8a8e13e6b854fec14_competency_idx\` ON \`eb6619ccc69668dd8a8e13e6b854fec14\` (\`competency\`);`)
  await db.run(sql`CREATE TABLE \`e1bbe6311f13282339e495c8800870cc5\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e1bbe6311f13282339e495c8800870cc5_order_idx\` ON \`e1bbe6311f13282339e495c8800870cc5\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`e1bbe6311f13282339e495c8800870cc5_parent_idx\` ON \`e1bbe6311f13282339e495c8800870cc5\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ef1d2a1529c6a89c49a42b4994043f30d\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`e2a4022d9ee878058b14896fdca6954e1\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ef1d2a1529c6a89c49a42b4994043f30d_order_idx\` ON \`ef1d2a1529c6a89c49a42b4994043f30d\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`ef1d2a1529c6a89c49a42b4994043f30d_parent_idx\` ON \`ef1d2a1529c6a89c49a42b4994043f30d\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e2a4022d9ee878058b14896fdca6954e1\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tenant_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e2a4022d9ee878058b14896fdca6954e1_order_idx\` ON \`e2a4022d9ee878058b14896fdca6954e1\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e2a4022d9ee878058b14896fdca6954e1_parent_id_idx\` ON \`e2a4022d9ee878058b14896fdca6954e1\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e2a4022d9ee878058b14896fdca6954e1_tenant_idx\` ON \`e2a4022d9ee878058b14896fdca6954e1\` (\`tenant_id\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`password\` text,
  	\`name\` text,
  	\`username\` text,
  	\`config_localization_default_locale\` text,
  	\`config_localization_display_currency\` text,
  	\`config_localization_date_format\` text DEFAULT 'locale',
  	\`config_features\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`users_uuid_idx\` ON \`users\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`users_username_idx\` ON \`users\` (\`username\`);`)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`roles\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`name\` text NOT NULL,
  	\`binding\` text DEFAULT 'global' NOT NULL,
  	\`scoped_collection\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`roles_uuid_idx\` ON \`roles\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`roles_name_idx\` ON \`roles\` (\`name\`);`)
  await db.run(sql`CREATE INDEX \`roles_updated_at_idx\` ON \`roles\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`roles_created_at_idx\` ON \`roles\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`roles_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`tenants_id\` text(36),
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	\`media_id\` text(36),
  	\`categories_id\` text(36),
  	\`products_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`roles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tenants_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`roles_rels_order_idx\` ON \`roles_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_parent_idx\` ON \`roles_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_path_idx\` ON \`roles_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_tenants_id_idx\` ON \`roles_rels\` (\`tenants_id\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_pages_id_idx\` ON \`roles_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_posts_id_idx\` ON \`roles_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_media_id_idx\` ON \`roles_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_categories_id_idx\` ON \`roles_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_products_id_idx\` ON \`roles_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE TABLE \`user_roles\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`user_id\` text(36) NOT NULL,
  	\`role_id\` text(36) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`user_roles_uuid_idx\` ON \`user_roles\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`user_roles_user_idx\` ON \`user_roles\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`user_roles_role_idx\` ON \`user_roles\` (\`role_id\`);`)
  await db.run(sql`CREATE INDEX \`user_roles_updated_at_idx\` ON \`user_roles\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`user_roles_created_at_idx\` ON \`user_roles\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e0dc067124d478cdba631b9fa5d670eec\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e0dc067124d478cdba631b9fa5d670eec_order_idx\` ON \`e0dc067124d478cdba631b9fa5d670eec\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e0dc067124d478cdba631b9fa5d670eec_parent_id_idx\` ON \`e0dc067124d478cdba631b9fa5d670eec\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e0dc067124d478cdba631b9fa5d670eec_locale_idx\` ON \`e0dc067124d478cdba631b9fa5d670eec\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`e0b6622b1c93180c98294697a29240a6f\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e36c778a2ac5684d1bbce502ea4931500\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e0b6622b1c93180c98294697a29240a6f_order_idx\` ON \`e0b6622b1c93180c98294697a29240a6f\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e0b6622b1c93180c98294697a29240a6f_parent_id_idx\` ON \`e0b6622b1c93180c98294697a29240a6f\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e0b6622b1c93180c98294697a29240a6f_locale_idx\` ON \`e0b6622b1c93180c98294697a29240a6f\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`e36c778a2ac5684d1bbce502ea4931500\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e36c778a2ac5684d1bbce502ea4931500_order_idx\` ON \`e36c778a2ac5684d1bbce502ea4931500\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e36c778a2ac5684d1bbce502ea4931500_parent_id_idx\` ON \`e36c778a2ac5684d1bbce502ea4931500\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e36c778a2ac5684d1bbce502ea4931500_path_idx\` ON \`e36c778a2ac5684d1bbce502ea4931500\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`e36c778a2ac5684d1bbce502ea4931500_locale_idx\` ON \`e36c778a2ac5684d1bbce502ea4931500\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`ee3949e56baa28c1b867172a5dee40d6a\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'oneThird',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ef7c8a03cb2628f4da06a88c4f30d47c7\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ee3949e56baa28c1b867172a5dee40d6a_order_idx\` ON \`ee3949e56baa28c1b867172a5dee40d6a\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ee3949e56baa28c1b867172a5dee40d6a_parent_id_idx\` ON \`ee3949e56baa28c1b867172a5dee40d6a\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ee3949e56baa28c1b867172a5dee40d6a_locale_idx\` ON \`ee3949e56baa28c1b867172a5dee40d6a\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`ef7c8a03cb2628f4da06a88c4f30d47c7\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ef7c8a03cb2628f4da06a88c4f30d47c7_order_idx\` ON \`ef7c8a03cb2628f4da06a88c4f30d47c7\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ef7c8a03cb2628f4da06a88c4f30d47c7_parent_id_idx\` ON \`ef7c8a03cb2628f4da06a88c4f30d47c7\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ef7c8a03cb2628f4da06a88c4f30d47c7_path_idx\` ON \`ef7c8a03cb2628f4da06a88c4f30d47c7\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`ef7c8a03cb2628f4da06a88c4f30d47c7_locale_idx\` ON \`ef7c8a03cb2628f4da06a88c4f30d47c7\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`e81cc20c70fe78dbeaf3103630ebc6fbc\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` text(36),
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e81cc20c70fe78dbeaf3103630ebc6fbc_order_idx\` ON \`e81cc20c70fe78dbeaf3103630ebc6fbc\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e81cc20c70fe78dbeaf3103630ebc6fbc_parent_id_idx\` ON \`e81cc20c70fe78dbeaf3103630ebc6fbc\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e81cc20c70fe78dbeaf3103630ebc6fbc_path_idx\` ON \`e81cc20c70fe78dbeaf3103630ebc6fbc\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`e81cc20c70fe78dbeaf3103630ebc6fbc_locale_idx\` ON \`e81cc20c70fe78dbeaf3103630ebc6fbc\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`e81cc20c70fe78dbeaf3103630ebc6fbc_media_idx\` ON \`e81cc20c70fe78dbeaf3103630ebc6fbc\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`e9cafee9f0fed8430a34bf14bb8d7771b\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro_content\` text,
  	\`populate_by\` text DEFAULT 'collection',
  	\`relation_to\` text DEFAULT 'posts',
  	\`limit\` numeric DEFAULT 10,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e9cafee9f0fed8430a34bf14bb8d7771b_order_idx\` ON \`e9cafee9f0fed8430a34bf14bb8d7771b\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e9cafee9f0fed8430a34bf14bb8d7771b_parent_id_idx\` ON \`e9cafee9f0fed8430a34bf14bb8d7771b\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e9cafee9f0fed8430a34bf14bb8d7771b_path_idx\` ON \`e9cafee9f0fed8430a34bf14bb8d7771b\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`e9cafee9f0fed8430a34bf14bb8d7771b_locale_idx\` ON \`e9cafee9f0fed8430a34bf14bb8d7771b\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`e87f1621ae35f869b9a226c9e15aa2c0c\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_id\` text(36),
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e87f1621ae35f869b9a226c9e15aa2c0c_order_idx\` ON \`e87f1621ae35f869b9a226c9e15aa2c0c\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e87f1621ae35f869b9a226c9e15aa2c0c_parent_id_idx\` ON \`e87f1621ae35f869b9a226c9e15aa2c0c\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e87f1621ae35f869b9a226c9e15aa2c0c_path_idx\` ON \`e87f1621ae35f869b9a226c9e15aa2c0c\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`e87f1621ae35f869b9a226c9e15aa2c0c_locale_idx\` ON \`e87f1621ae35f869b9a226c9e15aa2c0c\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`e87f1621ae35f869b9a226c9e15aa2c0c_form_idx\` ON \`e87f1621ae35f869b9a226c9e15aa2c0c\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`e9e1fb928a8a084e1aa55074c6bfe43c8\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`title\` text,
  	\`url\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e9e1fb928a8a084e1aa55074c6bfe43c8_order_idx\` ON \`e9e1fb928a8a084e1aa55074c6bfe43c8\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e9e1fb928a8a084e1aa55074c6bfe43c8_parent_id_idx\` ON \`e9e1fb928a8a084e1aa55074c6bfe43c8\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e9e1fb928a8a084e1aa55074c6bfe43c8_doc_idx\` ON \`e9e1fb928a8a084e1aa55074c6bfe43c8\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`published_at\` text,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text,
  	\`parent_id\` text(36),
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_uuid_idx\` ON \`pages\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`pages_tenant_idx\` ON \`pages\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_published_at_idx\` ON \`pages\` (\`published_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_parent_idx\` ON \`pages\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`pages_locales\` (
  	\`title\` text,
  	\`hero_type\` text DEFAULT 'lowImpact',
  	\`hero_rich_text\` text,
  	\`hero_media_id\` text(36),
  	\`meta_title\` text,
  	\`meta_image_id\` text(36),
  	\`meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_media_idx\` ON \`pages_locales\` (\`hero_media_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_locales_locale_parent_id_unique\` ON \`pages_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`locale\` text,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	\`categories_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_locale_idx\` ON \`pages_rels\` (\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_pages_id_idx\` ON \`pages_rels\` (\`pages_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_posts_id_idx\` ON \`pages_rels\` (\`posts_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_categories_id_idx\` ON \`pages_rels\` (\`categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE TABLE \`_e0dc067124d478cdba631b9fa5d670eec_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e0dc067124d478cdba631b9fa5d670eec_v_order_idx\` ON \`_e0dc067124d478cdba631b9fa5d670eec_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e0dc067124d478cdba631b9fa5d670eec_v_parent_id_idx\` ON \`_e0dc067124d478cdba631b9fa5d670eec_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e0dc067124d478cdba631b9fa5d670eec_v_locale_idx\` ON \`_e0dc067124d478cdba631b9fa5d670eec_v\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_e0b6622b1c93180c98294697a29240a6f_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e36c778a2ac5684d1bbce502ea4931500_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e0b6622b1c93180c98294697a29240a6f_v_order_idx\` ON \`_e0b6622b1c93180c98294697a29240a6f_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e0b6622b1c93180c98294697a29240a6f_v_parent_id_idx\` ON \`_e0b6622b1c93180c98294697a29240a6f_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e0b6622b1c93180c98294697a29240a6f_v_locale_idx\` ON \`_e0b6622b1c93180c98294697a29240a6f_v\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_e36c778a2ac5684d1bbce502ea4931500_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e36c778a2ac5684d1bbce502ea4931500_v_order_idx\` ON \`_e36c778a2ac5684d1bbce502ea4931500_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e36c778a2ac5684d1bbce502ea4931500_v_parent_id_idx\` ON \`_e36c778a2ac5684d1bbce502ea4931500_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e36c778a2ac5684d1bbce502ea4931500_v_path_idx\` ON \`_e36c778a2ac5684d1bbce502ea4931500_v\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_e36c778a2ac5684d1bbce502ea4931500_v_locale_idx\` ON \`_e36c778a2ac5684d1bbce502ea4931500_v\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_ee3949e56baa28c1b867172a5dee40d6a_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'oneThird',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_ef7c8a03cb2628f4da06a88c4f30d47c7_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ee3949e56baa28c1b867172a5dee40d6a_v_order_idx\` ON \`_ee3949e56baa28c1b867172a5dee40d6a_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ee3949e56baa28c1b867172a5dee40d6a_v_parent_id_idx\` ON \`_ee3949e56baa28c1b867172a5dee40d6a_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ee3949e56baa28c1b867172a5dee40d6a_v_locale_idx\` ON \`_ee3949e56baa28c1b867172a5dee40d6a_v\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_ef7c8a03cb2628f4da06a88c4f30d47c7_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ef7c8a03cb2628f4da06a88c4f30d47c7_v_order_idx\` ON \`_ef7c8a03cb2628f4da06a88c4f30d47c7_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ef7c8a03cb2628f4da06a88c4f30d47c7_v_parent_id_idx\` ON \`_ef7c8a03cb2628f4da06a88c4f30d47c7_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ef7c8a03cb2628f4da06a88c4f30d47c7_v_path_idx\` ON \`_ef7c8a03cb2628f4da06a88c4f30d47c7_v\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_ef7c8a03cb2628f4da06a88c4f30d47c7_v_locale_idx\` ON \`_ef7c8a03cb2628f4da06a88c4f30d47c7_v\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`media_id\` text(36),
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v_order_idx\` ON \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v_parent_id_idx\` ON \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v_path_idx\` ON \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v_locale_idx\` ON \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v_media_idx\` ON \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_e9cafee9f0fed8430a34bf14bb8d7771b_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`intro_content\` text,
  	\`populate_by\` text DEFAULT 'collection',
  	\`relation_to\` text DEFAULT 'posts',
  	\`limit\` numeric DEFAULT 10,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e9cafee9f0fed8430a34bf14bb8d7771b_v_order_idx\` ON \`_e9cafee9f0fed8430a34bf14bb8d7771b_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e9cafee9f0fed8430a34bf14bb8d7771b_v_parent_id_idx\` ON \`_e9cafee9f0fed8430a34bf14bb8d7771b_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e9cafee9f0fed8430a34bf14bb8d7771b_v_path_idx\` ON \`_e9cafee9f0fed8430a34bf14bb8d7771b_v\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_e9cafee9f0fed8430a34bf14bb8d7771b_v_locale_idx\` ON \`_e9cafee9f0fed8430a34bf14bb8d7771b_v\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_e87f1621ae35f869b9a226c9e15aa2c0c_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`form_id\` text(36),
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e87f1621ae35f869b9a226c9e15aa2c0c_v_order_idx\` ON \`_e87f1621ae35f869b9a226c9e15aa2c0c_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e87f1621ae35f869b9a226c9e15aa2c0c_v_parent_id_idx\` ON \`_e87f1621ae35f869b9a226c9e15aa2c0c_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e87f1621ae35f869b9a226c9e15aa2c0c_v_path_idx\` ON \`_e87f1621ae35f869b9a226c9e15aa2c0c_v\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_e87f1621ae35f869b9a226c9e15aa2c0c_v_locale_idx\` ON \`_e87f1621ae35f869b9a226c9e15aa2c0c_v\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`_e87f1621ae35f869b9a226c9e15aa2c0c_v_form_idx\` ON \`_e87f1621ae35f869b9a226c9e15aa2c0c_v\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`_e9e1fb928a8a084e1aa55074c6bfe43c8_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`title\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e9e1fb928a8a084e1aa55074c6bfe43c8_v_order_idx\` ON \`_e9e1fb928a8a084e1aa55074c6bfe43c8_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e9e1fb928a8a084e1aa55074c6bfe43c8_v_parent_id_idx\` ON \`_e9e1fb928a8a084e1aa55074c6bfe43c8_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e9e1fb928a8a084e1aa55074c6bfe43c8_v_doc_idx\` ON \`_e9e1fb928a8a084e1aa55074c6bfe43c8_v\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_published_at\` text,
  	\`version_generate_slug\` integer DEFAULT true,
  	\`version_slug\` text,
  	\`version_parent_id\` text(36),
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_uuid_idx\` ON \`_pages_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_tenant_idx\` ON \`_pages_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_published_at_idx\` ON \`_pages_v\` (\`version_published_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_parent_idx\` ON \`_pages_v\` (\`version_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_snapshot_idx\` ON \`_pages_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_published_locale_idx\` ON \`_pages_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_locales\` (
  	\`version_title\` text,
  	\`version_hero_type\` text DEFAULT 'lowImpact',
  	\`version_hero_rich_text\` text,
  	\`version_hero_media_id\` text(36),
  	\`version_meta_title\` text,
  	\`version_meta_image_id\` text(36),
  	\`version_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`version_hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_version_hero_media_idx\` ON \`_pages_v_locales\` (\`version_hero_media_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_meta_version_meta_image_idx\` ON \`_pages_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_locales_locale_parent_id_unique\` ON \`_pages_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`locale\` text,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	\`categories_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_order_idx\` ON \`_pages_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_parent_idx\` ON \`_pages_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_path_idx\` ON \`_pages_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_locale_idx\` ON \`_pages_v_rels\` (\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_pages_id_idx\` ON \`_pages_v_rels\` (\`pages_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_posts_id_idx\` ON \`_pages_v_rels\` (\`posts_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_categories_id_idx\` ON \`_pages_v_rels\` (\`categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE TABLE \`e4cefc0562d378871ba0511ef359b5126\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e4cefc0562d378871ba0511ef359b5126_order_idx\` ON \`e4cefc0562d378871ba0511ef359b5126\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e4cefc0562d378871ba0511ef359b5126_parent_id_idx\` ON \`e4cefc0562d378871ba0511ef359b5126\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`hero_image_id\` text(36),
  	\`published_at\` text,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_uuid_idx\` ON \`posts\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`posts_tenant_idx\` ON \`posts\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_hero_image_idx\` ON \`posts\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_published_at_idx\` ON \`posts\` (\`published_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`posts_locales\` (
  	\`title\` text,
  	\`content\` text,
  	\`meta_title\` text,
  	\`meta_image_id\` text(36),
  	\`meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_meta_meta_image_idx\` ON \`posts_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_locales_locale_parent_id_unique\` ON \`posts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` text(36),
  	\`categories_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_rels_order_idx\` ON \`posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_parent_idx\` ON \`posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_path_idx\` ON \`posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_posts_id_idx\` ON \`posts_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_categories_id_idx\` ON \`posts_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_users_id_idx\` ON \`posts_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_e4cefc0562d378871ba0511ef359b5126_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e4cefc0562d378871ba0511ef359b5126_v_order_idx\` ON \`_e4cefc0562d378871ba0511ef359b5126_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e4cefc0562d378871ba0511ef359b5126_v_parent_id_idx\` ON \`_e4cefc0562d378871ba0511ef359b5126_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_hero_image_id\` text(36),
  	\`version_published_at\` text,
  	\`version_generate_slug\` integer DEFAULT true,
  	\`version_slug\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_uuid_idx\` ON \`_posts_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_tenant_idx\` ON \`_posts_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_hero_image_idx\` ON \`_posts_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_published_at_idx\` ON \`_posts_v\` (\`version_published_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_snapshot_idx\` ON \`_posts_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_published_locale_idx\` ON \`_posts_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_autosave_idx\` ON \`_posts_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_locales\` (
  	\`version_title\` text,
  	\`version_content\` text,
  	\`version_meta_title\` text,
  	\`version_meta_image_id\` text(36),
  	\`version_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_version_meta_version_meta_image_idx\` ON \`_posts_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_locales_locale_parent_id_unique\` ON \`_posts_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` text(36),
  	\`categories_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_order_idx\` ON \`_posts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_parent_idx\` ON \`_posts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_path_idx\` ON \`_posts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_posts_id_idx\` ON \`_posts_v_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_categories_id_idx\` ON \`_posts_v_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_users_id_idx\` ON \`_posts_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`alt\` text,
  	\`caption\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_square_url\` text,
  	\`sizes_square_width\` numeric,
  	\`sizes_square_height\` numeric,
  	\`sizes_square_mime_type\` text,
  	\`sizes_square_filesize\` numeric,
  	\`sizes_square_filename\` text,
  	\`sizes_small_url\` text,
  	\`sizes_small_width\` numeric,
  	\`sizes_small_height\` numeric,
  	\`sizes_small_mime_type\` text,
  	\`sizes_small_filesize\` numeric,
  	\`sizes_small_filename\` text,
  	\`sizes_medium_url\` text,
  	\`sizes_medium_width\` numeric,
  	\`sizes_medium_height\` numeric,
  	\`sizes_medium_mime_type\` text,
  	\`sizes_medium_filesize\` numeric,
  	\`sizes_medium_filename\` text,
  	\`sizes_large_url\` text,
  	\`sizes_large_width\` numeric,
  	\`sizes_large_height\` numeric,
  	\`sizes_large_mime_type\` text,
  	\`sizes_large_filesize\` numeric,
  	\`sizes_large_filename\` text,
  	\`sizes_xlarge_url\` text,
  	\`sizes_xlarge_width\` numeric,
  	\`sizes_xlarge_height\` numeric,
  	\`sizes_xlarge_mime_type\` text,
  	\`sizes_xlarge_filesize\` numeric,
  	\`sizes_xlarge_filename\` text,
  	\`sizes_og_url\` text,
  	\`sizes_og_width\` numeric,
  	\`sizes_og_height\` numeric,
  	\`sizes_og_mime_type\` text,
  	\`sizes_og_filesize\` numeric,
  	\`sizes_og_filename\` text,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`media_uuid_idx\` ON \`media\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`media_tenant_idx\` ON \`media\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_square_sizes_square_filename_idx\` ON \`media\` (\`sizes_square_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_small_sizes_small_filename_idx\` ON \`media\` (\`sizes_small_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_medium_sizes_medium_filename_idx\` ON \`media\` (\`sizes_medium_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_large_sizes_large_filename_idx\` ON \`media\` (\`sizes_large_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_xlarge_sizes_xlarge_filename_idx\` ON \`media\` (\`sizes_xlarge_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_og_sizes_og_filename_idx\` ON \`media\` (\`sizes_og_filename\`);`)
  await db.run(sql`CREATE TABLE \`eb9ba47f0935d85bf9626dd6756872a56\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`title\` text,
  	\`url\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eb9ba47f0935d85bf9626dd6756872a56_order_idx\` ON \`eb9ba47f0935d85bf9626dd6756872a56\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eb9ba47f0935d85bf9626dd6756872a56_parent_id_idx\` ON \`eb9ba47f0935d85bf9626dd6756872a56\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`eb9ba47f0935d85bf9626dd6756872a56_doc_idx\` ON \`eb9ba47f0935d85bf9626dd6756872a56\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`categories\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`title\` text NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`parent_id\` text(36),
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_uuid_idx\` ON \`categories\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`categories_tenant_idx\` ON \`categories\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`categories_parent_idx\` ON \`categories\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e0f3c4597ea4d815698b6463649de69e2\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category_code\` text NOT NULL,
  	\`rate\` numeric,
  	\`taxable_amount\` numeric NOT NULL,
  	\`tax_amount\` numeric NOT NULL,
  	\`exemption_reason_code\` text,
  	\`exemption_reason\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e0f3c4597ea4d815698b6463649de69e2_order_idx\` ON \`e0f3c4597ea4d815698b6463649de69e2\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e0f3c4597ea4d815698b6463649de69e2_parent_id_idx\` ON \`e0f3c4597ea4d815698b6463649de69e2\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`invoices\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`type_status_invoice_type\` text NOT NULL,
  	\`type_status_invoice_type_code\` text,
  	\`type_status_confirmed\` integer DEFAULT false,
  	\`status\` text DEFAULT 'draft',
  	\`number\` text,
  	\`protocol_number\` text,
  	\`purchase_order\` text,
  	\`sales_order\` text,
  	\`parties_seller_id\` text(36) NOT NULL,
  	\`parties_seller_agent_id\` text(36),
  	\`parties_buyer_id\` text(36) NOT NULL,
  	\`parties_buyer_agent_id\` text(36),
  	\`parties_supplier_id\` text(36),
  	\`parties_consignee_id\` text(36),
  	\`dates_date\` text,
  	\`dates_issued_at\` text,
  	\`dates_order_date\` text,
  	\`dates_proforma_date\` text,
  	\`dates_protocol_date\` text,
  	\`dates_payment_date\` text,
  	\`dates_paid_at\` text,
  	\`dates_delivered_at\` text,
  	\`dates_cancelled_at\` text,
  	\`dates_due_at\` text,
  	\`dates_past_due_since_at\` text,
  	\`dates_grace_period_ends_at\` text,
  	\`dates_suspension_scheduled_for\` text,
  	\`amounts_item_total\` numeric DEFAULT 0 NOT NULL,
  	\`amounts_discount_total\` numeric DEFAULT 0,
  	\`amounts_allowances_total\` numeric DEFAULT 0,
  	\`amounts_charges_total\` numeric DEFAULT 0,
  	\`amounts_net_total\` numeric DEFAULT 0,
  	\`amounts_tax_total\` numeric DEFAULT 0,
  	\`amounts_total_amount\` numeric DEFAULT 0 NOT NULL,
  	\`amounts_prepaid_amount\` numeric DEFAULT 0,
  	\`amounts_rounding_amount\` numeric DEFAULT 0,
  	\`amounts_total_paid\` numeric DEFAULT 0,
  	\`amounts_total_due\` numeric DEFAULT 0,
  	\`billing_tax_currency_code\` text DEFAULT 'EUR' NOT NULL,
  	\`billing_tax_exchange_rate\` numeric,
  	\`billing_tax_tax_type\` text,
  	\`billing_tax_taxes_included\` integer DEFAULT false,
  	\`billing_tax_tax_note\` text,
  	\`recurring_billing_period\` text,
  	\`recurring_next_billing_date\` text,
  	\`recurring_period_start\` text,
  	\`recurring_period_end\` text,
  	\`recurring_subscription_id\` text(36),
  	\`recurring_stripe_invoice_id\` text,
  	\`recurring_stripe_payment_intent_id\` text,
  	\`recurring_attempt_count\` numeric DEFAULT 0,
  	\`recurring_last_attempt_at\` text,
  	\`recurring_last_attempt_error\` text,
  	\`ledger_debit_account_id\` text(36),
  	\`ledger_credit_account_id\` text(36),
  	\`notes_note\` text,
  	\`notes_invoice_note\` text,
  	\`notes_delivery_note\` text,
  	\`notes_delivery_terms\` text,
  	\`notes_payment_terms\` text,
  	\`notes_payment_methods\` text,
  	\`relationships_parent_id\` text(36),
  	\`relationships_order_id\` text(36),
  	\`relationships_domain_id\` text(36),
  	\`fiscal_unp\` text,
  	\`fiscal_unp_sequence\` numeric,
  	\`fiscal_fiscal_device_id\` text(36),
  	\`fiscal_fiscal_device_number\` text,
  	\`fiscal_operator_code\` text DEFAULT '0000',
  	\`fiscal_terminal_id\` text(36),
  	\`fiscal_receipt_number\` text,
  	\`fiscal_receipt_id\` text(36),
  	\`fiscal_qr_data\` text,
  	\`fiscal_status\` text DEFAULT 'open',
  	\`fiscal_reversal_of_id\` text(36),
  	\`fiscal_reversed_by_id\` text(36),
  	\`test\` integer DEFAULT false,
  	\`metadata\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parties_seller_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parties_seller_agent_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parties_buyer_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parties_buyer_agent_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parties_supplier_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parties_consignee_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`recurring_subscription_id\`) REFERENCES \`subscriptions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`relationships_parent_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`relationships_order_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`relationships_domain_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fiscal_fiscal_device_id\`) REFERENCES \`fiscal_devices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fiscal_terminal_id\`) REFERENCES \`terminals\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fiscal_receipt_id\`) REFERENCES \`receipts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fiscal_reversal_of_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fiscal_reversed_by_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`invoices_uuid_idx\` ON \`invoices\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`invoices_tenant_idx\` ON \`invoices\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_type_status_type_status_invoice_type_idx\` ON \`invoices\` (\`type_status_invoice_type\`);`)
  await db.run(sql`CREATE INDEX \`invoices_status_idx\` ON \`invoices\` (\`status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`invoices_number_idx\` ON \`invoices\` (\`number\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`invoices_protocol_number_idx\` ON \`invoices\` (\`protocol_number\`);`)
  await db.run(sql`CREATE INDEX \`invoices_parties_parties_seller_idx\` ON \`invoices\` (\`parties_seller_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_parties_parties_seller_agent_idx\` ON \`invoices\` (\`parties_seller_agent_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_parties_parties_buyer_idx\` ON \`invoices\` (\`parties_buyer_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_parties_parties_buyer_agent_idx\` ON \`invoices\` (\`parties_buyer_agent_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_parties_parties_supplier_idx\` ON \`invoices\` (\`parties_supplier_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_parties_parties_consignee_idx\` ON \`invoices\` (\`parties_consignee_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_dates_dates_date_idx\` ON \`invoices\` (\`dates_date\`);`)
  await db.run(sql`CREATE INDEX \`invoices_dates_dates_due_at_idx\` ON \`invoices\` (\`dates_due_at\`);`)
  await db.run(sql`CREATE INDEX \`invoices_dates_dates_past_due_since_at_idx\` ON \`invoices\` (\`dates_past_due_since_at\`);`)
  await db.run(sql`CREATE INDEX \`invoices_recurring_recurring_next_billing_date_idx\` ON \`invoices\` (\`recurring_next_billing_date\`);`)
  await db.run(sql`CREATE INDEX \`invoices_recurring_recurring_subscription_idx\` ON \`invoices\` (\`recurring_subscription_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_recurring_recurring_stripe_invoice_id_idx\` ON \`invoices\` (\`recurring_stripe_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_ledger_ledger_debit_account_idx\` ON \`invoices\` (\`ledger_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_ledger_ledger_credit_account_idx\` ON \`invoices\` (\`ledger_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_relationships_relationships_parent_idx\` ON \`invoices\` (\`relationships_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_relationships_relationships_order_idx\` ON \`invoices\` (\`relationships_order_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_relationships_relationships_domain_idx\` ON \`invoices\` (\`relationships_domain_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`invoices_fiscal_fiscal_unp_idx\` ON \`invoices\` (\`fiscal_unp\`);`)
  await db.run(sql`CREATE INDEX \`invoices_fiscal_fiscal_fiscal_device_idx\` ON \`invoices\` (\`fiscal_fiscal_device_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_fiscal_fiscal_fiscal_device_number_idx\` ON \`invoices\` (\`fiscal_fiscal_device_number\`);`)
  await db.run(sql`CREATE INDEX \`invoices_fiscal_fiscal_terminal_idx\` ON \`invoices\` (\`fiscal_terminal_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_fiscal_fiscal_receipt_idx\` ON \`invoices\` (\`fiscal_receipt_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_fiscal_fiscal_reversal_of_idx\` ON \`invoices\` (\`fiscal_reversal_of_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_fiscal_fiscal_reversed_by_idx\` ON \`invoices\` (\`fiscal_reversed_by_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_updated_at_idx\` ON \`invoices\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`invoices_created_at_idx\` ON \`invoices\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`invoice_lines\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`invoice_id\` text(36) NOT NULL,
  	\`code\` text,
  	\`description\` text NOT NULL,
  	\`line_note\` text,
  	\`object_identifier\` text,
  	\`status\` text,
  	\`items_buyer_item_id\` text(36),
  	\`items_seller_item_id\` text(36),
  	\`items_source_id\` text(36),
  	\`items_destination_id\` text(36),
  	\`quantity_quantity\` numeric DEFAULT 1 NOT NULL,
  	\`quantity_unit\` text,
  	\`quantity_grams\` numeric,
  	\`pricing_unit_price\` numeric DEFAULT 0 NOT NULL,
  	\`pricing_item_total\` numeric DEFAULT 0 NOT NULL,
  	\`pricing_exchange_rate\` numeric,
  	\`discounting_discount_rate\` numeric,
  	\`discounting_discount_total\` numeric DEFAULT 0,
  	\`taxation_taxable\` integer DEFAULT true,
  	\`taxation_vat_category_code\` text DEFAULT 'S' NOT NULL,
  	\`taxation_tax_rate\` numeric,
  	\`taxation_vat_exemption_reason_code\` text,
  	\`taxation_vat_exemption_reason\` text,
  	\`taxation_price_includes_tax\` integer DEFAULT false,
  	\`taxation_net_total\` numeric DEFAULT 0,
  	\`taxation_tax_total\` numeric DEFAULT 0,
  	\`totals_total_amount\` numeric DEFAULT 0 NOT NULL,
  	\`totals_total_paid\` numeric DEFAULT 0,
  	\`totals_total_due\` numeric DEFAULT 0,
  	\`ledger_debit_account_id\` text(36),
  	\`ledger_credit_account_id\` text(36),
  	\`ledger_tax_debit_account_id\` text(36),
  	\`ledger_tax_credit_account_id\` text(36),
  	\`dates_contract_start\` text,
  	\`dates_contract_end\` text,
  	\`dates_period_start\` text,
  	\`dates_period_end\` text,
  	\`dates_delivered_at\` text,
  	\`dates_returned_at\` text,
  	\`details_currency_code\` text,
  	\`details_sku\` text,
  	\`details_hs_code\` text,
  	\`details_serial_number\` text,
  	\`details_lot\` text,
  	\`details_variant\` text,
  	\`details_variation\` text,
  	\`details_option\` text,
  	\`details_period\` text,
  	\`details_gift_card\` integer DEFAULT false,
  	\`metadata\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`items_buyer_item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`items_seller_item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`items_source_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`items_destination_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_tax_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_tax_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`invoice_lines_uuid_idx\` ON \`invoice_lines\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_tenant_idx\` ON \`invoice_lines\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_invoice_idx\` ON \`invoice_lines\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_code_idx\` ON \`invoice_lines\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_items_items_buyer_item_idx\` ON \`invoice_lines\` (\`items_buyer_item_id\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_items_items_seller_item_idx\` ON \`invoice_lines\` (\`items_seller_item_id\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_items_items_source_idx\` ON \`invoice_lines\` (\`items_source_id\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_items_items_destination_idx\` ON \`invoice_lines\` (\`items_destination_id\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_ledger_ledger_debit_account_idx\` ON \`invoice_lines\` (\`ledger_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_ledger_ledger_credit_account_idx\` ON \`invoice_lines\` (\`ledger_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_ledger_ledger_tax_debit_account_idx\` ON \`invoice_lines\` (\`ledger_tax_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_ledger_ledger_tax_credit_account_idx\` ON \`invoice_lines\` (\`ledger_tax_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_updated_at_idx\` ON \`invoice_lines\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_created_at_idx\` ON \`invoice_lines\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payment_methods\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`stripe_payment_method_id\` text NOT NULL,
  	\`type\` text NOT NULL,
  	\`card_brand\` text,
  	\`card_last4\` text,
  	\`card_exp_month\` numeric,
  	\`card_exp_year\` numeric,
  	\`bank_name\` text,
  	\`bank_last4\` text,
  	\`is_default\` integer DEFAULT false,
  	\`is_active\` integer DEFAULT true,
  	\`created_via_stripe\` integer DEFAULT false,
  	\`next_retry_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payment_methods_uuid_idx\` ON \`payment_methods\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`payment_methods_tenant_idx\` ON \`payment_methods\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`payment_methods_stripe_payment_method_id_idx\` ON \`payment_methods\` (\`stripe_payment_method_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_methods_updated_at_idx\` ON \`payment_methods\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payment_methods_created_at_idx\` ON \`payment_methods\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payments\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`transaction_number\` text,
  	\`payment_kind\` text DEFAULT 'received' NOT NULL,
  	\`status\` text DEFAULT 'recorded',
  	\`invoice_id\` text(36) NOT NULL,
  	\`parties_sender_id\` text(36) NOT NULL,
  	\`parties_receiver_id\` text(36) NOT NULL,
  	\`amounts_amount\` numeric DEFAULT 0 NOT NULL,
  	\`amounts_invoice_amount\` numeric,
  	\`amounts_currency_code\` text DEFAULT 'EUR' NOT NULL,
  	\`amounts_exchange_rate\` numeric,
  	\`dates_sent_at\` text,
  	\`dates_received_at\` text,
  	\`dates_authorized_at\` text,
  	\`authorization_authorized_by_id\` text(36),
  	\`payment_payment_method\` text,
  	\`payment_note\` text,
  	\`metadata\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parties_sender_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parties_receiver_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`authorization_authorized_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payments_uuid_idx\` ON \`payments\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`payments_tenant_idx\` ON \`payments\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`payments_transaction_number_idx\` ON \`payments\` (\`transaction_number\`);`)
  await db.run(sql`CREATE INDEX \`payments_payment_kind_idx\` ON \`payments\` (\`payment_kind\`);`)
  await db.run(sql`CREATE INDEX \`payments_status_idx\` ON \`payments\` (\`status\`);`)
  await db.run(sql`CREATE INDEX \`payments_invoice_idx\` ON \`payments\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`payments_parties_parties_sender_idx\` ON \`payments\` (\`parties_sender_id\`);`)
  await db.run(sql`CREATE INDEX \`payments_parties_parties_receiver_idx\` ON \`payments\` (\`parties_receiver_id\`);`)
  await db.run(sql`CREATE INDEX \`payments_authorization_authorization_authorized_by_idx\` ON \`payments\` (\`authorization_authorized_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payments_updated_at_idx\` ON \`payments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payments_created_at_idx\` ON \`payments\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`subscription_plans\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`stripe_product_id\` text,
  	\`stripe_price_id\` text,
  	\`monthly_price\` numeric DEFAULT 0 NOT NULL,
  	\`yearly_price\` numeric,
  	\`currency\` text DEFAULT 'USD',
  	\`billing_cycle\` text DEFAULT 'monthly' NOT NULL,
  	\`limits\` text DEFAULT '{"apiCallsPerMonth":null,"storageGB":null,"seats":null,"customDomains":false,"advancedAnalytics":false,"prioritySupport":false,"apiAccess":false,"webhooks":false}' NOT NULL,
  	\`is_active\` integer DEFAULT true,
  	\`description\` text,
  	\`sort_order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`subscription_plans_uuid_idx\` ON \`subscription_plans\` (\`uuid\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`subscription_plans_name_idx\` ON \`subscription_plans\` (\`name\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`subscription_plans_slug_idx\` ON \`subscription_plans\` (\`slug\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`subscription_plans_stripe_product_id_idx\` ON \`subscription_plans\` (\`stripe_product_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`subscription_plans_stripe_price_id_idx\` ON \`subscription_plans\` (\`stripe_price_id\`);`)
  await db.run(sql`CREATE INDEX \`subscription_plans_updated_at_idx\` ON \`subscription_plans\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`subscription_plans_created_at_idx\` ON \`subscription_plans\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`subscriptions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`plan_id\` text(36) NOT NULL,
  	\`status\` text DEFAULT 'trial' NOT NULL,
  	\`trial_started_at\` text,
  	\`trial_ends_at\` text,
  	\`current_period_start\` text,
  	\`current_period_end\` text,
  	\`stripe_subscription_id\` text,
  	\`stripe_customer_id\` text,
  	\`cancelled_at\` text,
  	\`cancellation_reason\` text,
  	\`paused_at\` text,
  	\`resume_at\` text,
  	\`last_status_change\` text,
  	\`last_status_change_reason\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`plan_id\`) REFERENCES \`subscription_plans\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`subscriptions_uuid_idx\` ON \`subscriptions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`subscriptions_tenant_idx\` ON \`subscriptions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`subscriptions_plan_idx\` ON \`subscriptions\` (\`plan_id\`);`)
  await db.run(sql`CREATE INDEX \`subscriptions_status_idx\` ON \`subscriptions\` (\`status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`subscriptions_stripe_subscription_id_idx\` ON \`subscriptions\` (\`stripe_subscription_id\`);`)
  await db.run(sql`CREATE INDEX \`subscriptions_stripe_customer_id_idx\` ON \`subscriptions\` (\`stripe_customer_id\`);`)
  await db.run(sql`CREATE INDEX \`subscriptions_updated_at_idx\` ON \`subscriptions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`subscriptions_created_at_idx\` ON \`subscriptions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`items\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`code\` text NOT NULL,
  	\`sku\` text,
  	\`barcode\` text,
  	\`address_id\` text(36) NOT NULL,
  	\`pricing_price\` numeric DEFAULT 0,
  	\`pricing_cost\` numeric,
  	\`pricing_compare_at_price\` numeric,
  	\`pricing_vendor_price\` numeric,
  	\`pricing_min_price\` numeric,
  	\`pricing_currency_code\` text DEFAULT 'EUR' NOT NULL,
  	\`pricing_price_includes_tax\` integer DEFAULT false,
  	\`taxation_taxable\` integer DEFAULT true,
  	\`taxation_tax_rate\` numeric,
  	\`taxation_tax_debit_account_id\` text(36),
  	\`taxation_tax_credit_account_id\` text(36),
  	\`ledger_debit_account_id\` text(36),
  	\`ledger_credit_account_id\` text(36),
  	\`inventory_inventory_quantity\` numeric DEFAULT 0 NOT NULL,
  	\`inventory_inventory_management\` text,
  	\`inventory_inventory_policy\` text,
  	\`physical_weight\` numeric,
  	\`physical_weight_unit\` text,
  	\`physical_grams\` numeric,
  	\`physical_hs_code\` text,
  	\`physical_requires_shipping\` integer DEFAULT true,
  	\`discounts_max_discount_rate\` numeric,
  	\`discounts_min_profit_rate\` numeric,
  	\`discounts_max_profit_rate\` numeric,
  	\`fulfillment_fulfillment_service\` text,
  	\`fulfillment_period\` text,
  	\`visibility_visibility\` text,
  	\`metadata\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`taxation_tax_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`taxation_tax_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`items_uuid_idx\` ON \`items\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`items_tenant_idx\` ON \`items\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`items_code_idx\` ON \`items\` (\`code\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`items_sku_idx\` ON \`items\` (\`sku\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`items_barcode_idx\` ON \`items\` (\`barcode\`);`)
  await db.run(sql`CREATE INDEX \`items_address_idx\` ON \`items\` (\`address_id\`);`)
  await db.run(sql`CREATE INDEX \`items_taxation_taxation_tax_debit_account_idx\` ON \`items\` (\`taxation_tax_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`items_taxation_taxation_tax_credit_account_idx\` ON \`items\` (\`taxation_tax_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`items_ledger_ledger_debit_account_idx\` ON \`items\` (\`ledger_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`items_ledger_ledger_credit_account_idx\` ON \`items\` (\`ledger_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`items_updated_at_idx\` ON \`items\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`items_created_at_idx\` ON \`items\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e056c1b5d14948e2cbc1c72ae143dec2a\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e056c1b5d14948e2cbc1c72ae143dec2a_order_idx\` ON \`e056c1b5d14948e2cbc1c72ae143dec2a\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e056c1b5d14948e2cbc1c72ae143dec2a_parent_id_idx\` ON \`e056c1b5d14948e2cbc1c72ae143dec2a\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`gl_accounts\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`account_number\` text NOT NULL,
  	\`account_name\` text NOT NULL,
  	\`account_type\` text NOT NULL,
  	\`role\` text,
  	\`parent_account_id\` text(36),
  	\`normal_balance\` text NOT NULL,
  	\`balance\` numeric DEFAULT 0,
  	\`balance_in_base_currency\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'active',
  	\`is_tax_account\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`gl_accounts_uuid_idx\` ON \`gl_accounts\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`gl_accounts_tenant_idx\` ON \`gl_accounts\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`gl_accounts_account_number_idx\` ON \`gl_accounts\` (\`account_number\`);`)
  await db.run(sql`CREATE INDEX \`gl_accounts_parent_account_idx\` ON \`gl_accounts\` (\`parent_account_id\`);`)
  await db.run(sql`CREATE INDEX \`gl_accounts_updated_at_idx\` ON \`gl_accounts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`gl_accounts_created_at_idx\` ON \`gl_accounts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`gl_accounts_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`gl_accounts_locales_locale_parent_id_unique\` ON \`gl_accounts_locales\` (\`_locale\`,\`_parent_id\`);`)
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
  	\`gl_accounts_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`gl_posting_rules\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`gl_accounts_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`gl_posting_rules_rels_order_idx\` ON \`gl_posting_rules_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`gl_posting_rules_rels_parent_idx\` ON \`gl_posting_rules_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`gl_posting_rules_rels_path_idx\` ON \`gl_posting_rules_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`gl_posting_rules_rels_gl_accounts_id_idx\` ON \`gl_posting_rules_rels\` (\`gl_accounts_id\`);`)
  await db.run(sql`CREATE TABLE \`e1bde3ecd157d8e63be74306ae19685b5\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`line_number\` numeric DEFAULT 1,
  	\`gl_account_id\` text(36) NOT NULL,
  	\`account_number\` text,
  	\`account_name\` text,
  	\`debit\` numeric DEFAULT 0,
  	\`credit\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`exchange_rate\` numeric DEFAULT 1,
  	\`cost_center_id\` text,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e1bde3ecd157d8e63be74306ae19685b5_order_idx\` ON \`e1bde3ecd157d8e63be74306ae19685b5\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e1bde3ecd157d8e63be74306ae19685b5_parent_id_idx\` ON \`e1bde3ecd157d8e63be74306ae19685b5\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e1bde3ecd157d8e63be74306ae19685b5_gl_account_idx\` ON \`e1bde3ecd157d8e63be74306ae19685b5\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`e1bde3ecd157d8e63be74306ae19685b5_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e1bde3ecd157d8e63be74306ae19685b5\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e1bde3ecd157d8e63be74306ae19685b5_locales_locale_parent_id_u\` ON \`e1bde3ecd157d8e63be74306ae19685b5_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`journal_entries\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`entry_number\` text NOT NULL,
  	\`entry_date\` text NOT NULL,
  	\`posted_date\` text,
  	\`status\` text DEFAULT 'draft',
  	\`debit_total\` numeric DEFAULT 0,
  	\`credit_total\` numeric DEFAULT 0,
  	\`is_balanced\` integer,
  	\`source_type\` text NOT NULL,
  	\`source_id\` text,
  	\`source_event\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`journal_entries_uuid_idx\` ON \`journal_entries\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`journal_entries_tenant_idx\` ON \`journal_entries\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`journal_entries_entry_number_idx\` ON \`journal_entries\` (\`entry_number\`);`)
  await db.run(sql`CREATE INDEX \`journal_entries_created_by_idx\` ON \`journal_entries\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`journal_entries_approved_by_idx\` ON \`journal_entries\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`journal_entries_updated_at_idx\` ON \`journal_entries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`journal_entries_created_at_idx\` ON \`journal_entries\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`journal_entries_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`journal_entries_locales_locale_parent_id_unique\` ON \`journal_entries_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ea6ce72f9bf098ac48a6c7dc3362a4b9d\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`gl_account_id\` text(36) NOT NULL,
  	\`account_number\` text,
  	\`account_name\` text,
  	\`debit_amount\` numeric DEFAULT 0,
  	\`credit_amount\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`gl_postings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ea6ce72f9bf098ac48a6c7dc3362a4b9d_order_idx\` ON \`ea6ce72f9bf098ac48a6c7dc3362a4b9d\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ea6ce72f9bf098ac48a6c7dc3362a4b9d_parent_id_idx\` ON \`ea6ce72f9bf098ac48a6c7dc3362a4b9d\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ea6ce72f9bf098ac48a6c7dc3362a4b9d_gl_account_idx\` ON \`ea6ce72f9bf098ac48a6c7dc3362a4b9d\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`gl_postings\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`posting_id\` text NOT NULL,
  	\`source_type\` text NOT NULL,
  	\`source_id\` text NOT NULL,
  	\`source_date\` text NOT NULL,
  	\`journal_entry_id\` text(36) NOT NULL,
  	\`status\` text DEFAULT 'pending',
  	\`posted_date\` text,
  	\`total_debits\` numeric DEFAULT 0,
  	\`total_credits\` numeric DEFAULT 0,
  	\`error_message\` text,
  	\`reversal_posting_id\` text,
  	\`metadata\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`gl_postings_uuid_idx\` ON \`gl_postings\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`gl_postings_tenant_idx\` ON \`gl_postings\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`gl_postings_posting_id_idx\` ON \`gl_postings\` (\`posting_id\`);`)
  await db.run(sql`CREATE INDEX \`gl_postings_journal_entry_idx\` ON \`gl_postings\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`gl_postings_created_by_idx\` ON \`gl_postings\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`gl_postings_approved_by_idx\` ON \`gl_postings\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`gl_postings_updated_at_idx\` ON \`gl_postings\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`gl_postings_created_at_idx\` ON \`gl_postings\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`period_locks\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`period_label\` text NOT NULL,
  	\`fiscal_year\` numeric NOT NULL,
  	\`fiscal_period\` numeric NOT NULL,
  	\`period_type\` text DEFAULT 'monthly' NOT NULL,
  	\`period_start_date\` text NOT NULL,
  	\`period_end_date\` text NOT NULL,
  	\`lock_status\` text DEFAULT 'open' NOT NULL,
  	\`closed_by_id\` text(36),
  	\`closed_date\` text,
  	\`close_reason\` text,
  	\`allow_reversals\` integer DEFAULT true,
  	\`allow_prior_period_adjustments\` integer DEFAULT true,
  	\`requires_admin_override\` integer DEFAULT true,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`closed_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`period_locks_uuid_idx\` ON \`period_locks\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`period_locks_tenant_idx\` ON \`period_locks\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`period_locks_period_label_idx\` ON \`period_locks\` (\`period_label\`);`)
  await db.run(sql`CREATE INDEX \`period_locks_closed_by_idx\` ON \`period_locks\` (\`closed_by_id\`);`)
  await db.run(sql`CREATE INDEX \`period_locks_updated_at_idx\` ON \`period_locks\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`period_locks_created_at_idx\` ON \`period_locks\` (\`created_at\`);`)
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
  await db.run(sql`CREATE TABLE \`e331d8adbec1389829f03d1a10e5ec41d\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence_number\` numeric NOT NULL,
  	\`journal_entry_id_id\` text(36) NOT NULL,
  	\`entry_description\` text NOT NULL,
  	\`accounts_closed\` text,
  	\`net_amount\` numeric NOT NULL,
  	\`retained_earnings_impact\` numeric,
  	\`posted\` integer DEFAULT false,
  	\`posted_date\` text,
  	\`reversing_entry_id_id\` text(36),
  	\`notes\` text,
  	FOREIGN KEY (\`journal_entry_id_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reversing_entry_id_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`closing_entries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e331d8adbec1389829f03d1a10e5ec41d_order_idx\` ON \`e331d8adbec1389829f03d1a10e5ec41d\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e331d8adbec1389829f03d1a10e5ec41d_parent_id_idx\` ON \`e331d8adbec1389829f03d1a10e5ec41d\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e331d8adbec1389829f03d1a10e5ec41d_journal_entry_id_idx\` ON \`e331d8adbec1389829f03d1a10e5ec41d\` (\`journal_entry_id_id\`);`)
  await db.run(sql`CREATE INDEX \`e331d8adbec1389829f03d1a10e5ec41d_reversing_entry_id_idx\` ON \`e331d8adbec1389829f03d1a10e5ec41d\` (\`reversing_entry_id_id\`);`)
  await db.run(sql`CREATE TABLE \`closing_entries\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`entity_id\` text(36) NOT NULL,
  	\`closing_entry_number\` text NOT NULL,
  	\`period_lock_id\` text(36) NOT NULL,
  	\`fiscal_period_id\` text(36) NOT NULL,
  	\`fiscal_year\` numeric NOT NULL,
  	\`fiscal_period_number\` numeric NOT NULL,
  	\`period_label\` text,
  	\`regulatory_code\` text,
  	\`closing_date\` text NOT NULL,
  	\`closing_type\` text NOT NULL,
  	\`closed_by_id\` text(36) NOT NULL,
  	\`approved_by_id\` text(36),
  	\`total_revenues_closed\` numeric,
  	\`total_expenses_closed\` numeric,
  	\`net_income\` numeric,
  	\`closing_status\` text DEFAULT 'in-progress' NOT NULL,
  	\`reversal_entries_generated\` integer DEFAULT false,
  	\`reversal_generated_date\` text,
  	\`governance_scope\` text,
  	\`chain_leaf_uuid\` text,
  	\`multi_currency_reconciliation\` text,
  	\`audit_trail\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`period_lock_id\`) REFERENCES \`period_locks\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fiscal_period_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`closed_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`closing_entries_uuid_idx\` ON \`closing_entries\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`closing_entries_tenant_idx\` ON \`closing_entries\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`closing_entries_entity_idx\` ON \`closing_entries\` (\`entity_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`closing_entries_closing_entry_number_idx\` ON \`closing_entries\` (\`closing_entry_number\`);`)
  await db.run(sql`CREATE INDEX \`closing_entries_period_lock_idx\` ON \`closing_entries\` (\`period_lock_id\`);`)
  await db.run(sql`CREATE INDEX \`closing_entries_fiscal_period_idx\` ON \`closing_entries\` (\`fiscal_period_id\`);`)
  await db.run(sql`CREATE INDEX \`closing_entries_closed_by_idx\` ON \`closing_entries\` (\`closed_by_id\`);`)
  await db.run(sql`CREATE INDEX \`closing_entries_approved_by_idx\` ON \`closing_entries\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`closing_entries_updated_at_idx\` ON \`closing_entries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`closing_entries_created_at_idx\` ON \`closing_entries\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e054a9f104e2283d399aaa493f7a613d3\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`transaction_date\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`reference\` text,
  	\`balance_after\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bank_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e054a9f104e2283d399aaa493f7a613d3_order_idx\` ON \`e054a9f104e2283d399aaa493f7a613d3\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e054a9f104e2283d399aaa493f7a613d3_parent_id_idx\` ON \`e054a9f104e2283d399aaa493f7a613d3\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e054a9f104e2283d399aaa493f7a613d3_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e054a9f104e2283d399aaa493f7a613d3\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e054a9f104e2283d399aaa493f7a613d3_locales_locale_parent_id_u\` ON \`e054a9f104e2283d399aaa493f7a613d3_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e03d4a88bb21985cf9204ac7e7b91dd7b\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`bank_statement_line_index\` numeric NOT NULL,
  	\`journal_entry_id\` text(36) NOT NULL,
  	\`match_type\` text NOT NULL,
  	\`match_score\` numeric,
  	\`variance_amount\` numeric,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bank_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e03d4a88bb21985cf9204ac7e7b91dd7b_order_idx\` ON \`e03d4a88bb21985cf9204ac7e7b91dd7b\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e03d4a88bb21985cf9204ac7e7b91dd7b_parent_id_idx\` ON \`e03d4a88bb21985cf9204ac7e7b91dd7b\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e03d4a88bb21985cf9204ac7e7b91dd7b_journal_entry_idx\` ON \`e03d4a88bb21985cf9204ac7e7b91dd7b\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`bank_statements\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`statement_id\` text NOT NULL,
  	\`bank_account_id\` text(36) NOT NULL,
  	\`statement_date\` text NOT NULL,
  	\`statement_period_start\` text NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`opening_balance\` numeric NOT NULL,
  	\`closing_balance\` numeric NOT NULL,
  	\`reconciliation_status\` text DEFAULT 'unreconciled',
  	\`total_matched\` numeric DEFAULT 0,
  	\`total_unmatched\` numeric DEFAULT 0,
  	\`variance\` numeric DEFAULT 0,
  	\`reconciliation_notes\` text,
  	\`reconciliation_date\` text,
  	\`reconcilied_by_id\` text(36),
  	\`import_source\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`bank_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reconcilied_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`bank_statements_uuid_idx\` ON \`bank_statements\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`bank_statements_tenant_idx\` ON \`bank_statements\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`bank_statements_statement_id_idx\` ON \`bank_statements\` (\`statement_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_statements_bank_account_idx\` ON \`bank_statements\` (\`bank_account_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_statements_reconcilied_by_idx\` ON \`bank_statements\` (\`reconcilied_by_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_statements_updated_at_idx\` ON \`bank_statements\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`bank_statements_created_at_idx\` ON \`bank_statements\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e31afc32d6c1b8e8fbbde1ae7a7c1b65e\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`journal_entry_id\` text(36) NOT NULL,
  	\`matched_amount\` numeric NOT NULL,
  	\`match_score\` numeric,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bank_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e31afc32d6c1b8e8fbbde1ae7a7c1b65e_order_idx\` ON \`e31afc32d6c1b8e8fbbde1ae7a7c1b65e\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e31afc32d6c1b8e8fbbde1ae7a7c1b65e_parent_id_idx\` ON \`e31afc32d6c1b8e8fbbde1ae7a7c1b65e\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e31afc32d6c1b8e8fbbde1ae7a7c1b65e_journal_entry_idx\` ON \`e31afc32d6c1b8e8fbbde1ae7a7c1b65e\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`bank_transactions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`external_id\` text NOT NULL,
  	\`account_servicer_reference\` text,
  	\`end_to_end_id\` text,
  	\`bank_account_id\` text(36) NOT NULL,
  	\`statement_id\` text(36),
  	\`value_date\` text NOT NULL,
  	\`booking_date\` text,
  	\`amount\` numeric NOT NULL,
  	\`credit_debit_indicator\` text,
  	\`booking_status\` text DEFAULT 'BOOK',
  	\`currency\` text DEFAULT 'EUR',
  	\`description\` text,
  	\`counterparty_name\` text,
  	\`counterparty_iban\` text,
  	\`counterparty_bic\` text,
  	\`reference\` text,
  	\`bank_transaction_domain\` text,
  	\`bank_transaction_family\` text,
  	\`bank_transaction_sub_family\` text,
  	\`transaction_code\` text,
  	\`charge_bearer\` text,
  	\`match_status\` text DEFAULT 'unmatched',
  	\`matched_at\` text,
  	\`matched_by_id\` text(36),
  	\`status\` text DEFAULT 'imported',
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`bank_account_id\`) REFERENCES \`bank_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`statement_id\`) REFERENCES \`bank_statements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`matched_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`bank_transactions_uuid_idx\` ON \`bank_transactions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`bank_transactions_tenant_idx\` ON \`bank_transactions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`bank_transactions_external_id_idx\` ON \`bank_transactions\` (\`external_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_transactions_bank_account_idx\` ON \`bank_transactions\` (\`bank_account_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_transactions_statement_idx\` ON \`bank_transactions\` (\`statement_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_transactions_value_date_idx\` ON \`bank_transactions\` (\`value_date\`);`)
  await db.run(sql`CREATE INDEX \`bank_transactions_matched_by_idx\` ON \`bank_transactions\` (\`matched_by_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_transactions_updated_at_idx\` ON \`bank_transactions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`bank_transactions_created_at_idx\` ON \`bank_transactions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`bank_accounts\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`account_name\` text NOT NULL,
  	\`iban\` text,
  	\`bic\` text,
  	\`account_number\` text,
  	\`routing_number\` text,
  	\`institution\` text,
  	\`country\` text,
  	\`currency\` text DEFAULT 'EUR',
  	\`gl_account_id\` text(36),
  	\`purpose\` text,
  	\`status\` text DEFAULT 'active',
  	\`opened_at\` text,
  	\`closed_at\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`bank_accounts_uuid_idx\` ON \`bank_accounts\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`bank_accounts_tenant_idx\` ON \`bank_accounts\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_accounts_iban_idx\` ON \`bank_accounts\` (\`iban\`);`)
  await db.run(sql`CREATE INDEX \`bank_accounts_country_idx\` ON \`bank_accounts\` (\`country\`);`)
  await db.run(sql`CREATE INDEX \`bank_accounts_gl_account_idx\` ON \`bank_accounts\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_accounts_created_by_idx\` ON \`bank_accounts\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_accounts_approved_by_idx\` ON \`bank_accounts\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_accounts_updated_at_idx\` ON \`bank_accounts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`bank_accounts_created_at_idx\` ON \`bank_accounts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e79d3f9d1d5268d09bc229598ff88c147\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`originated_at\` text NOT NULL,
  	\`aging_bucket\` text,
  	\`bank_transaction_id\` text(36),
  	\`journal_entry_id\` text(36),
  	FOREIGN KEY (\`bank_transaction_id\`) REFERENCES \`bank_transactions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`account_reconciliations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e79d3f9d1d5268d09bc229598ff88c147_order_idx\` ON \`e79d3f9d1d5268d09bc229598ff88c147\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e79d3f9d1d5268d09bc229598ff88c147_parent_id_idx\` ON \`e79d3f9d1d5268d09bc229598ff88c147\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e79d3f9d1d5268d09bc229598ff88c147_bank_transaction_idx\` ON \`e79d3f9d1d5268d09bc229598ff88c147\` (\`bank_transaction_id\`);`)
  await db.run(sql`CREATE INDEX \`e79d3f9d1d5268d09bc229598ff88c147_journal_entry_idx\` ON \`e79d3f9d1d5268d09bc229598ff88c147\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`e79d3f9d1d5268d09bc229598ff88c147_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e79d3f9d1d5268d09bc229598ff88c147\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e79d3f9d1d5268d09bc229598ff88c147_locales_locale_parent_id_u\` ON \`e79d3f9d1d5268d09bc229598ff88c147_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`eea91a2735c5d81fab00e29e7205a1913\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`originated_at\` text NOT NULL,
  	\`aging_bucket\` text,
  	\`journal_entry_id\` text(36),
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`account_reconciliations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eea91a2735c5d81fab00e29e7205a1913_order_idx\` ON \`eea91a2735c5d81fab00e29e7205a1913\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eea91a2735c5d81fab00e29e7205a1913_parent_id_idx\` ON \`eea91a2735c5d81fab00e29e7205a1913\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`eea91a2735c5d81fab00e29e7205a1913_journal_entry_idx\` ON \`eea91a2735c5d81fab00e29e7205a1913\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`eea91a2735c5d81fab00e29e7205a1913_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`eea91a2735c5d81fab00e29e7205a1913\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`eea91a2735c5d81fab00e29e7205a1913_locales_locale_parent_id_u\` ON \`eea91a2735c5d81fab00e29e7205a1913_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`account_reconciliations\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reconciliation_id\` text NOT NULL,
  	\`kind\` text DEFAULT 'bank' NOT NULL,
  	\`gl_account_id\` text(36) NOT NULL,
  	\`bank_account_id\` text(36),
  	\`as_of_date\` text NOT NULL,
  	\`period_start\` text,
  	\`period_end\` text,
  	\`currency\` text DEFAULT 'EUR',
  	\`balance_per_external\` numeric NOT NULL,
  	\`balance_per_g_l\` numeric NOT NULL,
  	\`adjusted_external_balance\` numeric,
  	\`adjusted_g_l_balance\` numeric,
  	\`difference\` numeric,
  	\`prepared_by_id\` text(36),
  	\`prepared_at\` text,
  	\`reviewed_by_id\` text(36),
  	\`reviewed_at\` text,
  	\`status\` text DEFAULT 'draft',
  	\`source_statement_id\` text(36),
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`bank_account_id\`) REFERENCES \`bank_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`prepared_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reviewed_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`source_statement_id\`) REFERENCES \`bank_statements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`account_reconciliations_uuid_idx\` ON \`account_reconciliations\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_tenant_idx\` ON \`account_reconciliations\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`account_reconciliations_reconciliation_id_idx\` ON \`account_reconciliations\` (\`reconciliation_id\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_gl_account_idx\` ON \`account_reconciliations\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_bank_account_idx\` ON \`account_reconciliations\` (\`bank_account_id\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_as_of_date_idx\` ON \`account_reconciliations\` (\`as_of_date\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_prepared_by_idx\` ON \`account_reconciliations\` (\`prepared_by_id\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_reviewed_by_idx\` ON \`account_reconciliations\` (\`reviewed_by_id\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_source_statement_idx\` ON \`account_reconciliations\` (\`source_statement_id\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_created_by_idx\` ON \`account_reconciliations\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_approved_by_idx\` ON \`account_reconciliations\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_updated_at_idx\` ON \`account_reconciliations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_created_at_idx\` ON \`account_reconciliations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`account_reconciliations_locales\` (
  	\`rejection_reason\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`account_reconciliations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`account_reconciliations_locales_locale_parent_id_unique\` ON \`account_reconciliations_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e90e89d5dfa078b99bb64c75493531070\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`kind\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`reference\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bank_reconciliations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e90e89d5dfa078b99bb64c75493531070_order_idx\` ON \`e90e89d5dfa078b99bb64c75493531070\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e90e89d5dfa078b99bb64c75493531070_parent_id_idx\` ON \`e90e89d5dfa078b99bb64c75493531070\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e90e89d5dfa078b99bb64c75493531070_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e90e89d5dfa078b99bb64c75493531070\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e90e89d5dfa078b99bb64c75493531070_locales_locale_parent_id_u\` ON \`e90e89d5dfa078b99bb64c75493531070_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`bank_reconciliations\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`bank_account_id\` text(36) NOT NULL,
  	\`reconciliation_date\` text NOT NULL,
  	\`period_start\` text,
  	\`period_end\` text,
  	\`bank_statement_id\` text(36),
  	\`currency\` text DEFAULT 'EUR',
  	\`bank_statement_balance\` numeric NOT NULL,
  	\`book_balance\` numeric NOT NULL,
  	\`difference\` numeric DEFAULT 0,
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`bank_account_id\`) REFERENCES \`bank_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`bank_statement_id\`) REFERENCES \`bank_statements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`bank_reconciliations_uuid_idx\` ON \`bank_reconciliations\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`bank_reconciliations_tenant_idx\` ON \`bank_reconciliations\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`bank_reconciliations_reference_idx\` ON \`bank_reconciliations\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`bank_reconciliations_bank_account_idx\` ON \`bank_reconciliations\` (\`bank_account_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_reconciliations_reconciliation_date_idx\` ON \`bank_reconciliations\` (\`reconciliation_date\`);`)
  await db.run(sql`CREATE INDEX \`bank_reconciliations_bank_statement_idx\` ON \`bank_reconciliations\` (\`bank_statement_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_reconciliations_created_by_idx\` ON \`bank_reconciliations\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_reconciliations_approved_by_idx\` ON \`bank_reconciliations\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_reconciliations_updated_at_idx\` ON \`bank_reconciliations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`bank_reconciliations_created_at_idx\` ON \`bank_reconciliations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e6ebcc7c621e687b59dbfd3dbfb40df80\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`ratio_name\` text NOT NULL,
  	\`ratio_value\` numeric NOT NULL,
  	\`category\` text NOT NULL,
  	\`interpretation\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`financial_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e6ebcc7c621e687b59dbfd3dbfb40df80_order_idx\` ON \`e6ebcc7c621e687b59dbfd3dbfb40df80\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e6ebcc7c621e687b59dbfd3dbfb40df80_parent_id_idx\` ON \`e6ebcc7c621e687b59dbfd3dbfb40df80\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`eb29a4918c12889c69eaee1b51e5e94dc\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`format\` text NOT NULL,
  	\`file_url\` text,
  	\`generated_at\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`financial_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eb29a4918c12889c69eaee1b51e5e94dc_order_idx\` ON \`eb29a4918c12889c69eaee1b51e5e94dc\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eb29a4918c12889c69eaee1b51e5e94dc_parent_id_idx\` ON \`eb29a4918c12889c69eaee1b51e5e94dc\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`financial_statements\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`statement_id\` text NOT NULL,
  	\`statement_type\` text NOT NULL,
  	\`language\` text DEFAULT 'en',
  	\`fiscal_period_start\` text NOT NULL,
  	\`fiscal_period_end\` text NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`statement_content\` text NOT NULL,
  	\`comparative_period\` text,
  	\`comparative_data\` text,
  	\`notes\` text,
  	\`status\` text DEFAULT 'draft',
  	\`generated_at\` text NOT NULL,
  	\`generated_by_id\` text(36),
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`generated_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`financial_statements_uuid_idx\` ON \`financial_statements\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`financial_statements_tenant_idx\` ON \`financial_statements\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`financial_statements_statement_id_idx\` ON \`financial_statements\` (\`statement_id\`);`)
  await db.run(sql`CREATE INDEX \`financial_statements_generated_by_idx\` ON \`financial_statements\` (\`generated_by_id\`);`)
  await db.run(sql`CREATE INDEX \`financial_statements_updated_at_idx\` ON \`financial_statements\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`financial_statements_created_at_idx\` ON \`financial_statements\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`period_end_adjustments\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`adjustment_id\` text NOT NULL,
  	\`adjustment_type\` text NOT NULL,
  	\`period\` text NOT NULL,
  	\`adjustment_amount\` numeric NOT NULL,
  	\`debit_account_id\` text(36) NOT NULL,
  	\`credit_account_id\` text(36) NOT NULL,
  	\`journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'draft',
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`period_end_adjustments_uuid_idx\` ON \`period_end_adjustments\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`period_end_adjustments_tenant_idx\` ON \`period_end_adjustments\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`period_end_adjustments_adjustment_id_idx\` ON \`period_end_adjustments\` (\`adjustment_id\`);`)
  await db.run(sql`CREATE INDEX \`period_end_adjustments_debit_account_idx\` ON \`period_end_adjustments\` (\`debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`period_end_adjustments_credit_account_idx\` ON \`period_end_adjustments\` (\`credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`period_end_adjustments_journal_entry_idx\` ON \`period_end_adjustments\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`period_end_adjustments_updated_at_idx\` ON \`period_end_adjustments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`period_end_adjustments_created_at_idx\` ON \`period_end_adjustments\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`period_end_adjustments_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`period_end_adjustments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`period_end_adjustments_locales_locale_parent_id_unique\` ON \`period_end_adjustments_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`recur_je_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`gl_account_id\` text(36) NOT NULL,
  	\`side\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`cost_center_id\` text(36),
  	\`project_id\` text(36),
  	\`memo\` text,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`recurring_journals\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`recur_je_lines_order_idx\` ON \`recur_je_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`recur_je_lines_parent_id_idx\` ON \`recur_je_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`recur_je_lines_gl_account_idx\` ON \`recur_je_lines\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE INDEX \`recur_je_lines_cost_center_idx\` ON \`recur_je_lines\` (\`cost_center_id\`);`)
  await db.run(sql`CREATE INDEX \`recur_je_lines_project_idx\` ON \`recur_je_lines\` (\`project_id\`);`)
  await db.run(sql`CREATE TABLE \`recurring_journals\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`recurrence_kind\` text DEFAULT 'rent_expense',
  	\`frequency\` text DEFAULT 'monthly' NOT NULL,
  	\`rrule\` text,
  	\`start_date\` text NOT NULL,
  	\`end_date\` text,
  	\`next_run_date\` text NOT NULL,
  	\`last_run_date\` text,
  	\`last_run_journal_entry_id\` text(36),
  	\`remaining_runs\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`amount\` numeric NOT NULL,
  	\`amount_formula\` text,
  	\`auto_post\` integer DEFAULT false,
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`last_run_journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`recurring_journals_uuid_idx\` ON \`recurring_journals\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`recurring_journals_tenant_idx\` ON \`recurring_journals\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`recurring_journals_next_run_date_idx\` ON \`recurring_journals\` (\`next_run_date\`);`)
  await db.run(sql`CREATE INDEX \`recurring_journals_last_run_journal_entry_idx\` ON \`recurring_journals\` (\`last_run_journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`recurring_journals_created_by_idx\` ON \`recurring_journals\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`recurring_journals_approved_by_idx\` ON \`recurring_journals\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`recurring_journals_updated_at_idx\` ON \`recurring_journals\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`recurring_journals_created_at_idx\` ON \`recurring_journals\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`recurring_journals_locales\` (
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`recurring_journals\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`recurring_journals_name_idx\` ON \`recurring_journals_locales\` (\`name\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`recurring_journals_locales_locale_parent_id_unique\` ON \`recurring_journals_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`prior_period_adjustments\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`adjustment_date\` text NOT NULL,
  	\`post_date\` text NOT NULL,
  	\`prior_period_id\` text(36),
  	\`reason\` text NOT NULL,
  	\`error_category\` text DEFAULT 'mathematical',
  	\`currency\` text DEFAULT 'EUR',
  	\`amount\` numeric NOT NULL,
  	\`restatement_journal_entry_id\` text(36),
  	\`disclosure_text\` text,
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`prior_period_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`restatement_journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`prior_period_adjustments_uuid_idx\` ON \`prior_period_adjustments\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`prior_period_adjustments_tenant_idx\` ON \`prior_period_adjustments\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`prior_period_adjustments_reference_idx\` ON \`prior_period_adjustments\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`prior_period_adjustments_adjustment_date_idx\` ON \`prior_period_adjustments\` (\`adjustment_date\`);`)
  await db.run(sql`CREATE INDEX \`prior_period_adjustments_post_date_idx\` ON \`prior_period_adjustments\` (\`post_date\`);`)
  await db.run(sql`CREATE INDEX \`prior_period_adjustments_prior_period_idx\` ON \`prior_period_adjustments\` (\`prior_period_id\`);`)
  await db.run(sql`CREATE INDEX \`prior_period_adjustments_restatement_journal_entry_idx\` ON \`prior_period_adjustments\` (\`restatement_journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`prior_period_adjustments_created_by_idx\` ON \`prior_period_adjustments\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`prior_period_adjustments_approved_by_idx\` ON \`prior_period_adjustments\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`prior_period_adjustments_updated_at_idx\` ON \`prior_period_adjustments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`prior_period_adjustments_created_at_idx\` ON \`prior_period_adjustments\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`rounding_adjustments\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`adjustment_date\` text NOT NULL,
  	\`from_currency\` text NOT NULL,
  	\`to_currency\` text NOT NULL,
  	\`rounding_amount\` numeric NOT NULL,
  	\`rounding_rounding_type\` text DEFAULT 'presentation',
  	\`rounding_precision_unit\` text DEFAULT 'cents',
  	\`reason\` text NOT NULL,
  	\`journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`rounding_adjustments_uuid_idx\` ON \`rounding_adjustments\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`rounding_adjustments_tenant_idx\` ON \`rounding_adjustments\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`rounding_adjustments_reference_idx\` ON \`rounding_adjustments\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`rounding_adjustments_adjustment_date_idx\` ON \`rounding_adjustments\` (\`adjustment_date\`);`)
  await db.run(sql`CREATE INDEX \`rounding_adjustments_journal_entry_idx\` ON \`rounding_adjustments\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`rounding_adjustments_created_by_idx\` ON \`rounding_adjustments\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`rounding_adjustments_approved_by_idx\` ON \`rounding_adjustments\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`rounding_adjustments_updated_at_idx\` ON \`rounding_adjustments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`rounding_adjustments_created_at_idx\` ON \`rounding_adjustments\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tax_calculations\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`calculation_id\` text NOT NULL,
  	\`tax_type\` text NOT NULL,
  	\`jurisdiction\` text NOT NULL,
  	\`period\` text NOT NULL,
  	\`tax_rate\` numeric NOT NULL,
  	\`gross_amount\` numeric NOT NULL,
  	\`taxable_amount\` numeric NOT NULL,
  	\`tax_amount\` numeric NOT NULL,
  	\`net_amount\` numeric NOT NULL,
  	\`tax_payable_account_id\` text(36) NOT NULL,
  	\`tax_expense_account_id\` text(36),
  	\`journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'calculated',
  	\`filing_deadline\` text,
  	\`payment_deadline\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tax_payable_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tax_expense_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tax_calculations_uuid_idx\` ON \`tax_calculations\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`tax_calculations_tenant_idx\` ON \`tax_calculations\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tax_calculations_calculation_id_idx\` ON \`tax_calculations\` (\`calculation_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_calculations_tax_payable_account_idx\` ON \`tax_calculations\` (\`tax_payable_account_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_calculations_tax_expense_account_idx\` ON \`tax_calculations\` (\`tax_expense_account_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_calculations_journal_entry_idx\` ON \`tax_calculations\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_calculations_updated_at_idx\` ON \`tax_calculations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tax_calculations_created_at_idx\` ON \`tax_calculations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tax_codes\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`code\` text NOT NULL,
  	\`label\` text NOT NULL,
  	\`identity_description\` text,
  	\`classification_tax_type\` text NOT NULL,
  	\`classification_category_code\` text DEFAULT 'S',
  	\`classification_jurisdiction_id\` text(36) NOT NULL,
  	\`rate_rate_percent\` numeric NOT NULL,
  	\`rate_reverse_charge_eligible\` integer DEFAULT false,
  	\`rate_recoverable\` integer DEFAULT true,
  	\`validity_effective_from\` text NOT NULL,
  	\`validity_effective_to\` text,
  	\`validity_is_active\` integer DEFAULT true,
  	\`ledger_default_collection_account_id\` text(36),
  	\`ledger_default_remittance_account_id\` text(36),
  	\`ledger_default_expense_account_id\` text(36),
  	\`metadata\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`classification_jurisdiction_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_default_collection_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_default_remittance_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_default_expense_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tax_codes_uuid_idx\` ON \`tax_codes\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_tenant_idx\` ON \`tax_codes\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tax_codes_code_idx\` ON \`tax_codes\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_classification_classification_tax_type_idx\` ON \`tax_codes\` (\`classification_tax_type\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_classification_classification_jurisdiction_idx\` ON \`tax_codes\` (\`classification_jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_validity_validity_effective_from_idx\` ON \`tax_codes\` (\`validity_effective_from\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_validity_validity_effective_to_idx\` ON \`tax_codes\` (\`validity_effective_to\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_validity_validity_is_active_idx\` ON \`tax_codes\` (\`validity_is_active\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_ledger_ledger_default_collection_account_idx\` ON \`tax_codes\` (\`ledger_default_collection_account_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_ledger_ledger_default_remittance_account_idx\` ON \`tax_codes\` (\`ledger_default_remittance_account_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_ledger_ledger_default_expense_account_idx\` ON \`tax_codes\` (\`ledger_default_expense_account_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_updated_at_idx\` ON \`tax_codes\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_created_at_idx\` ON \`tax_codes\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tax_codes_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`tax_codes_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tax_codes_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tax_codes_rels_order_idx\` ON \`tax_codes_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_rels_parent_idx\` ON \`tax_codes_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_rels_path_idx\` ON \`tax_codes_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_rels_tax_codes_id_idx\` ON \`tax_codes_rels\` (\`tax_codes_id\`);`)
  await db.run(sql`CREATE TABLE \`tax_jurisdictions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`code\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`authority_name\` text,
  	\`geography_country\` text NOT NULL,
  	\`geography_region\` text,
  	\`geography_level\` text DEFAULT 'national' NOT NULL,
  	\`registration_registration_number\` text,
  	\`registration_registration_date\` text,
  	\`registration_deregistration_date\` text,
  	\`filing_filing_frequency\` text DEFAULT 'monthly',
  	\`filing_filing_due_day_of_month\` numeric,
  	\`filing_currency\` text DEFAULT 'EUR' NOT NULL,
  	\`notes_note\` text,
  	\`metadata\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tax_jurisdictions_uuid_idx\` ON \`tax_jurisdictions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_tenant_idx\` ON \`tax_jurisdictions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tax_jurisdictions_code_idx\` ON \`tax_jurisdictions\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_geography_geography_country_idx\` ON \`tax_jurisdictions\` (\`geography_country\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_geography_geography_region_idx\` ON \`tax_jurisdictions\` (\`geography_region\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_geography_geography_level_idx\` ON \`tax_jurisdictions\` (\`geography_level\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_registration_registration_registration_idx\` ON \`tax_jurisdictions\` (\`registration_registration_number\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_filing_filing_filing_frequency_idx\` ON \`tax_jurisdictions\` (\`filing_filing_frequency\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_updated_at_idx\` ON \`tax_jurisdictions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_created_at_idx\` ON \`tax_jurisdictions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`eb42b6ce7a98b8069add2b649d5ebebf1\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` text(36),
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tax_returns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eb42b6ce7a98b8069add2b649d5ebebf1_order_idx\` ON \`eb42b6ce7a98b8069add2b649d5ebebf1\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eb42b6ce7a98b8069add2b649d5ebebf1_parent_id_idx\` ON \`eb42b6ce7a98b8069add2b649d5ebebf1\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`eb42b6ce7a98b8069add2b649d5ebebf1_media_idx\` ON \`eb42b6ce7a98b8069add2b649d5ebebf1\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`tax_returns\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`return_id\` text NOT NULL,
  	\`return_type\` text NOT NULL,
  	\`jurisdiction_id\` text(36) NOT NULL,
  	\`period_start\` text NOT NULL,
  	\`period_end\` text NOT NULL,
  	\`taxable_sales\` numeric DEFAULT 0,
  	\`taxable_acquisitions\` numeric DEFAULT 0,
  	\`output_tax\` numeric DEFAULT 0,
  	\`input_tax\` numeric DEFAULT 0,
  	\`net_liability\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'draft',
  	\`filed_at\` text,
  	\`filed_by_id\` text(36),
  	\`authority_reference\` text,
  	\`paid_at\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`jurisdiction_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`filed_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tax_returns_uuid_idx\` ON \`tax_returns\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_tenant_idx\` ON \`tax_returns\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tax_returns_return_id_idx\` ON \`tax_returns\` (\`return_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_jurisdiction_idx\` ON \`tax_returns\` (\`jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_period_end_idx\` ON \`tax_returns\` (\`period_end\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_filed_by_idx\` ON \`tax_returns\` (\`filed_by_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_created_by_idx\` ON \`tax_returns\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_approved_by_idx\` ON \`tax_returns\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_updated_at_idx\` ON \`tax_returns\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_created_at_idx\` ON \`tax_returns\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tax_returns_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`tax_calculations_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tax_returns\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tax_calculations_id\`) REFERENCES \`tax_calculations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tax_returns_rels_order_idx\` ON \`tax_returns_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_rels_parent_idx\` ON \`tax_returns_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_rels_path_idx\` ON \`tax_returns_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_rels_tax_calculations_id_idx\` ON \`tax_returns_rels\` (\`tax_calculations_id\`);`)
  await db.run(sql`CREATE TABLE \`currency_rates\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`rate_id\` text NOT NULL,
  	\`from_currency\` text DEFAULT 'EUR' NOT NULL,
  	\`to_currency\` text DEFAULT 'EUR' NOT NULL,
  	\`rate\` numeric NOT NULL,
  	\`rate_date\` text NOT NULL,
  	\`source\` text NOT NULL,
  	\`inverse\` numeric,
  	\`mid_market_rate\` numeric,
  	\`bid_rate\` numeric,
  	\`ask_rate\` numeric,
  	\`is_active\` integer DEFAULT true,
  	\`used_in_transactions\` numeric DEFAULT 0,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`currency_rates_uuid_idx\` ON \`currency_rates\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`currency_rates_tenant_idx\` ON \`currency_rates\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`currency_rates_rate_id_idx\` ON \`currency_rates\` (\`rate_id\`);`)
  await db.run(sql`CREATE INDEX \`currency_rates_updated_at_idx\` ON \`currency_rates\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`currency_rates_created_at_idx\` ON \`currency_rates\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`fiscal_periods\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`label\` text,
  	\`identity_fiscal_year\` numeric NOT NULL,
  	\`identity_period_number\` numeric NOT NULL,
  	\`identity_period_type\` text DEFAULT 'monthly' NOT NULL,
  	\`dates_start_date\` text NOT NULL,
  	\`dates_end_date\` text NOT NULL,
  	\`lifecycle_status\` text DEFAULT 'open' NOT NULL,
  	\`lifecycle_closed_at\` text,
  	\`lifecycle_closed_by_id\` text(36),
  	\`lifecycle_locked_at\` text,
  	\`lifecycle_locked_by_id\` text(36),
  	\`lifecycle_reopened_at\` text,
  	\`lifecycle_reopened_by_id\` text(36),
  	\`configuration_fiscal_year_start_month\` numeric,
  	\`configuration_fiscal_year_start_day\` numeric,
  	\`configuration_country_code\` text,
  	\`configuration_currency_code\` text,
  	\`configuration_locale_code\` text,
  	\`configuration_regulatory_framework\` text,
  	\`configuration_allows_non_gregorian\` integer DEFAULT false,
  	\`configuration_leap_year_adjustment\` integer DEFAULT false,
  	\`configuration_custom_period_boundaries\` text,
  	\`governance_entity_id\` text(36),
  	\`governance_supercedes_id\` text(36),
  	\`governance_effective_date\` text,
  	\`notes_note\` text,
  	\`metadata\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`lifecycle_closed_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`lifecycle_locked_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`lifecycle_reopened_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`governance_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`governance_supercedes_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`fiscal_periods_uuid_idx\` ON \`fiscal_periods\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_tenant_idx\` ON \`fiscal_periods\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`fiscal_periods_label_idx\` ON \`fiscal_periods\` (\`label\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_identity_identity_fiscal_year_idx\` ON \`fiscal_periods\` (\`identity_fiscal_year\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_identity_identity_period_number_idx\` ON \`fiscal_periods\` (\`identity_period_number\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_dates_dates_start_date_idx\` ON \`fiscal_periods\` (\`dates_start_date\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_dates_dates_end_date_idx\` ON \`fiscal_periods\` (\`dates_end_date\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_lifecycle_lifecycle_status_idx\` ON \`fiscal_periods\` (\`lifecycle_status\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_lifecycle_lifecycle_closed_by_idx\` ON \`fiscal_periods\` (\`lifecycle_closed_by_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_lifecycle_lifecycle_locked_by_idx\` ON \`fiscal_periods\` (\`lifecycle_locked_by_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_lifecycle_lifecycle_reopened_by_idx\` ON \`fiscal_periods\` (\`lifecycle_reopened_by_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_configuration_configuration_country_code_idx\` ON \`fiscal_periods\` (\`configuration_country_code\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_governance_governance_entity_idx\` ON \`fiscal_periods\` (\`governance_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_governance_governance_supercedes_idx\` ON \`fiscal_periods\` (\`governance_supercedes_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_updated_at_idx\` ON \`fiscal_periods\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_created_at_idx\` ON \`fiscal_periods\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`fiscal_calendars\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`entity_id\` text(36) NOT NULL,
  	\`calendar_date\` text NOT NULL,
  	\`fiscal_year\` numeric NOT NULL,
  	\`fiscal_period\` numeric NOT NULL,
  	\`period_start_date\` text NOT NULL,
  	\`period_end_date\` text NOT NULL,
  	\`period_label\` text NOT NULL,
  	\`week_number\` numeric,
  	\`quarter_number\` numeric,
  	\`month_number\` numeric,
  	\`day_of_week\` text,
  	\`is_leap_adjusted\` integer DEFAULT false,
  	\`regulatory_code\` text NOT NULL,
  	\`generated_from_id\` text(36) NOT NULL,
  	\`chain_leaf_uuid\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`generated_from_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`fiscal_calendars_uuid_idx\` ON \`fiscal_calendars\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_calendars_tenant_idx\` ON \`fiscal_calendars\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_calendars_entity_idx\` ON \`fiscal_calendars\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_calendars_calendar_date_idx\` ON \`fiscal_calendars\` (\`calendar_date\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_calendars_generated_from_idx\` ON \`fiscal_calendars\` (\`generated_from_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_calendars_updated_at_idx\` ON \`fiscal_calendars\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_calendars_created_at_idx\` ON \`fiscal_calendars\` (\`created_at\`);`)
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
  await db.run(sql`CREATE TABLE \`fixed_assets\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`tenant_id\` text(36),
  	\`uuid\` text NOT NULL,
  	\`asset_number\` text NOT NULL,
  	\`asset_category\` text NOT NULL,
  	\`acquisition_date\` text NOT NULL,
  	\`asset_cost\` numeric NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`supplier_id\` text(36),
  	\`purchase_order\` text,
  	\`location\` text,
  	\`serial_number\` text,
  	\`barcode\` text,
  	\`depreciation_method\` text DEFAULT 'straight_line',
  	\`useful_life_years\` numeric NOT NULL,
  	\`residual_value\` numeric DEFAULT 0,
  	\`depreciable_base\` numeric,
  	\`annual_depreciation_amount\` numeric DEFAULT 0,
  	\`accumulated_depreciation\` numeric DEFAULT 0,
  	\`book_value\` numeric DEFAULT 0,
  	\`depreciation_start_date\` text,
  	\`last_depreciation_date\` text,
  	\`total_units_expected\` numeric,
  	\`units_produced_to_date\` numeric DEFAULT 0,
  	\`asset_account_id\` text(36) NOT NULL,
  	\`accumulated_depreciation_account_id\` text(36) NOT NULL,
  	\`depreciation_expense_account_id\` text(36) NOT NULL,
  	\`status\` text DEFAULT 'active',
  	\`disposal_date\` text,
  	\`disposal_proceeds\` numeric,
  	\`gain_on_disposal\` numeric,
  	\`last_maintenance_date\` text,
  	\`next_maintenance_date\` text,
  	\`maintenance_notes\` text,
  	\`notes\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`supplier_id\`) REFERENCES \`vendors\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`asset_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`accumulated_depreciation_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`depreciation_expense_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`fixed_assets_tenant_idx\` ON \`fixed_assets\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`fixed_assets_uuid_idx\` ON \`fixed_assets\` (\`uuid\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`fixed_assets_asset_number_idx\` ON \`fixed_assets\` (\`asset_number\`);`)
  await db.run(sql`CREATE INDEX \`fixed_assets_supplier_idx\` ON \`fixed_assets\` (\`supplier_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`fixed_assets_serial_number_idx\` ON \`fixed_assets\` (\`serial_number\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`fixed_assets_barcode_idx\` ON \`fixed_assets\` (\`barcode\`);`)
  await db.run(sql`CREATE INDEX \`fixed_assets_asset_account_idx\` ON \`fixed_assets\` (\`asset_account_id\`);`)
  await db.run(sql`CREATE INDEX \`fixed_assets_accumulated_depreciation_account_idx\` ON \`fixed_assets\` (\`accumulated_depreciation_account_id\`);`)
  await db.run(sql`CREATE INDEX \`fixed_assets_depreciation_expense_account_idx\` ON \`fixed_assets\` (\`depreciation_expense_account_id\`);`)
  await db.run(sql`CREATE INDEX \`fixed_assets_created_by_idx\` ON \`fixed_assets\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`fixed_assets_approved_by_idx\` ON \`fixed_assets\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`fixed_assets_updated_at_idx\` ON \`fixed_assets\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`fixed_assets_created_at_idx\` ON \`fixed_assets\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`fixed_assets_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`fixed_assets_locales_locale_parent_id_unique\` ON \`fixed_assets_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`depreciation_schedules\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`schedule_id\` text NOT NULL,
  	\`fixed_asset_id\` text(36) NOT NULL,
  	\`period_end\` text NOT NULL,
  	\`period_start\` text NOT NULL,
  	\`depreciation_amount\` numeric NOT NULL,
  	\`accumulated_after\` numeric,
  	\`book_value_after\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`method\` text,
  	\`status\` text DEFAULT 'calculated',
  	\`posted_at\` text,
  	\`journal_entry_id\` text(36),
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fixed_asset_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`depreciation_schedules_uuid_idx\` ON \`depreciation_schedules\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`depreciation_schedules_tenant_idx\` ON \`depreciation_schedules\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`depreciation_schedules_schedule_id_idx\` ON \`depreciation_schedules\` (\`schedule_id\`);`)
  await db.run(sql`CREATE INDEX \`depreciation_schedules_fixed_asset_idx\` ON \`depreciation_schedules\` (\`fixed_asset_id\`);`)
  await db.run(sql`CREATE INDEX \`depreciation_schedules_period_end_idx\` ON \`depreciation_schedules\` (\`period_end\`);`)
  await db.run(sql`CREATE INDEX \`depreciation_schedules_journal_entry_idx\` ON \`depreciation_schedules\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`depreciation_schedules_created_by_idx\` ON \`depreciation_schedules\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`depreciation_schedules_approved_by_idx\` ON \`depreciation_schedules\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`depreciation_schedules_updated_at_idx\` ON \`depreciation_schedules\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`depreciation_schedules_created_at_idx\` ON \`depreciation_schedules\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`customers\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`code\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`country\` text,
  	\`identity_legal_name\` text,
  	\`identity_customer_type\` text DEFAULT 'company' NOT NULL,
  	\`identity_status\` text DEFAULT 'active' NOT NULL,
  	\`contact_email\` text,
  	\`contact_phone\` text,
  	\`contact_website\` text,
  	\`addresses_billing_address_id\` text(36),
  	\`addresses_shipping_address_id\` text(36),
  	\`tax_vat_number\` text,
  	\`tax_vat_number_type\` text,
  	\`tax_tax_exempt\` integer DEFAULT false,
  	\`tax_tax_exemption_certificate\` text,
  	\`tax_default_tax_code_id\` text(36),
  	\`commercial_payment_terms\` text DEFAULT 'net_30',
  	\`commercial_payment_terms_days\` numeric,
  	\`commercial_credit_limit\` numeric DEFAULT 0,
  	\`commercial_credit_currency\` text DEFAULT 'EUR',
  	\`commercial_default_currency\` text DEFAULT 'EUR' NOT NULL,
  	\`commercial_default_locale\` text DEFAULT 'en',
  	\`commercial_price_list\` text,
  	\`ledger_default_receivable_account_id\` text(36),
  	\`ledger_default_revenue_account_id\` text(36),
  	\`ledger_default_discount_account_id\` text(36),
  	\`notes_note\` text,
  	\`metadata\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`addresses_billing_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`addresses_shipping_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tax_default_tax_code_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_default_receivable_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_default_revenue_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_default_discount_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`customers_uuid_idx\` ON \`customers\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`customers_tenant_idx\` ON \`customers\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`customers_code_idx\` ON \`customers\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`customers_name_idx\` ON \`customers\` (\`name\`);`)
  await db.run(sql`CREATE INDEX \`customers_country_idx\` ON \`customers\` (\`country\`);`)
  await db.run(sql`CREATE INDEX \`customers_identity_identity_customer_type_idx\` ON \`customers\` (\`identity_customer_type\`);`)
  await db.run(sql`CREATE INDEX \`customers_identity_identity_status_idx\` ON \`customers\` (\`identity_status\`);`)
  await db.run(sql`CREATE INDEX \`customers_contact_contact_email_idx\` ON \`customers\` (\`contact_email\`);`)
  await db.run(sql`CREATE INDEX \`customers_addresses_addresses_billing_address_idx\` ON \`customers\` (\`addresses_billing_address_id\`);`)
  await db.run(sql`CREATE INDEX \`customers_addresses_addresses_shipping_address_idx\` ON \`customers\` (\`addresses_shipping_address_id\`);`)
  await db.run(sql`CREATE INDEX \`customers_tax_tax_vat_number_idx\` ON \`customers\` (\`tax_vat_number\`);`)
  await db.run(sql`CREATE INDEX \`customers_tax_tax_default_tax_code_idx\` ON \`customers\` (\`tax_default_tax_code_id\`);`)
  await db.run(sql`CREATE INDEX \`customers_ledger_ledger_default_receivable_account_idx\` ON \`customers\` (\`ledger_default_receivable_account_id\`);`)
  await db.run(sql`CREATE INDEX \`customers_ledger_ledger_default_revenue_account_idx\` ON \`customers\` (\`ledger_default_revenue_account_id\`);`)
  await db.run(sql`CREATE INDEX \`customers_ledger_ledger_default_discount_account_idx\` ON \`customers\` (\`ledger_default_discount_account_id\`);`)
  await db.run(sql`CREATE INDEX \`customers_updated_at_idx\` ON \`customers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`customers_created_at_idx\` ON \`customers\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`customers_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`addresses_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`customers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`addresses_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`customers_rels_order_idx\` ON \`customers_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`customers_rels_parent_idx\` ON \`customers_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`customers_rels_path_idx\` ON \`customers_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`customers_rels_addresses_id_idx\` ON \`customers_rels\` (\`addresses_id\`);`)
  await db.run(sql`CREATE TABLE \`leads\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`full_name\` text NOT NULL,
  	\`first_name\` text,
  	\`last_name\` text,
  	\`job_title\` text,
  	\`company_name\` text NOT NULL,
  	\`email\` text,
  	\`phone\` text,
  	\`website\` text,
  	\`industry\` text,
  	\`company_size\` text,
  	\`country_code\` text,
  	\`preferred_language\` text,
  	\`lead_source\` text,
  	\`campaign\` text,
  	\`lead_score\` numeric DEFAULT 0,
  	\`estimated_value\` numeric,
  	\`estimated_close_date\` text,
  	\`assigned_to_id\` text(36),
  	\`converted_opportunity_id\` text(36),
  	\`converted_customer_id\` text(36),
  	\`converted_at\` text,
  	\`consent_record_id\` text(36),
  	\`status\` text DEFAULT 'new',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`assigned_to_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`converted_opportunity_id\`) REFERENCES \`opportunities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`converted_customer_id\`) REFERENCES \`customers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`consent_record_id\`) REFERENCES \`consent_records\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`leads_uuid_idx\` ON \`leads\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`leads_tenant_idx\` ON \`leads\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`leads_full_name_idx\` ON \`leads\` (\`full_name\`);`)
  await db.run(sql`CREATE INDEX \`leads_company_name_idx\` ON \`leads\` (\`company_name\`);`)
  await db.run(sql`CREATE INDEX \`leads_email_idx\` ON \`leads\` (\`email\`);`)
  await db.run(sql`CREATE INDEX \`leads_country_code_idx\` ON \`leads\` (\`country_code\`);`)
  await db.run(sql`CREATE INDEX \`leads_assigned_to_idx\` ON \`leads\` (\`assigned_to_id\`);`)
  await db.run(sql`CREATE INDEX \`leads_converted_opportunity_idx\` ON \`leads\` (\`converted_opportunity_id\`);`)
  await db.run(sql`CREATE INDEX \`leads_converted_customer_idx\` ON \`leads\` (\`converted_customer_id\`);`)
  await db.run(sql`CREATE INDEX \`leads_consent_record_idx\` ON \`leads\` (\`consent_record_id\`);`)
  await db.run(sql`CREATE INDEX \`leads_created_by_idx\` ON \`leads\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`leads_approved_by_idx\` ON \`leads\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`leads_updated_at_idx\` ON \`leads\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`leads_created_at_idx\` ON \`leads\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`opportunities\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`lead_id\` text(36),
  	\`customer_id\` text(36),
  	\`opportunity_owner_id\` text(36) NOT NULL,
  	\`stage\` text DEFAULT 'qualification' NOT NULL,
  	\`probability\` numeric DEFAULT 10,
  	\`currency\` text DEFAULT 'EUR',
  	\`amount\` numeric NOT NULL,
  	\`weighted_amount\` numeric,
  	\`expected_close_date\` text NOT NULL,
  	\`actual_close_date\` text,
  	\`close_reason\` text,
  	\`competitor\` text,
  	\`forecast_category\` text,
  	\`segment_id\` text(36),
  	\`campaign\` text,
  	\`contract_created_id\` text(36),
  	\`status\` text DEFAULT 'open',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`lead_id\`) REFERENCES \`leads\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`opportunity_owner_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`segment_id\`) REFERENCES \`customer_segments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`contract_created_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`opportunities_uuid_idx\` ON \`opportunities\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`opportunities_tenant_idx\` ON \`opportunities\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`opportunities_lead_idx\` ON \`opportunities\` (\`lead_id\`);`)
  await db.run(sql`CREATE INDEX \`opportunities_customer_idx\` ON \`opportunities\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`opportunities_opportunity_owner_idx\` ON \`opportunities\` (\`opportunity_owner_id\`);`)
  await db.run(sql`CREATE INDEX \`opportunities_expected_close_date_idx\` ON \`opportunities\` (\`expected_close_date\`);`)
  await db.run(sql`CREATE INDEX \`opportunities_segment_idx\` ON \`opportunities\` (\`segment_id\`);`)
  await db.run(sql`CREATE INDEX \`opportunities_contract_created_idx\` ON \`opportunities\` (\`contract_created_id\`);`)
  await db.run(sql`CREATE INDEX \`opportunities_created_by_idx\` ON \`opportunities\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`opportunities_approved_by_idx\` ON \`opportunities\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`opportunities_updated_at_idx\` ON \`opportunities\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`opportunities_created_at_idx\` ON \`opportunities\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`opportunities_locales\` (
  	\`name\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`opportunities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`opportunities_name_idx\` ON \`opportunities_locales\` (\`name\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`opportunities_locales_locale_parent_id_unique\` ON \`opportunities_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`customer_segments\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`segment_type\` text DEFAULT 'commercial' NOT NULL,
  	\`criteria\` text,
  	\`priority_rank\` numeric,
  	\`discount_percent\` numeric DEFAULT 0,
  	\`payment_term_days\` numeric DEFAULT 30,
  	\`credit_limit\` numeric,
  	\`pricing_tier\` text,
  	\`is_portfolio_for_ifrs15\` integer DEFAULT false,
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`customer_segments_uuid_idx\` ON \`customer_segments\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`customer_segments_tenant_idx\` ON \`customer_segments\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`customer_segments_created_by_idx\` ON \`customer_segments\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`customer_segments_approved_by_idx\` ON \`customer_segments\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`customer_segments_updated_at_idx\` ON \`customer_segments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`customer_segments_created_at_idx\` ON \`customer_segments\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`customer_segments_locales\` (
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`customer_segments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`customer_segments_name_idx\` ON \`customer_segments_locales\` (\`name\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`customer_segments_locales_locale_parent_id_unique\` ON \`customer_segments_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e601f23df2ed88bbc9842a7d6b5f41838\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`unit_price\` numeric NOT NULL,
  	\`line_total\` numeric DEFAULT 0,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`quotes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e601f23df2ed88bbc9842a7d6b5f41838_order_idx\` ON \`e601f23df2ed88bbc9842a7d6b5f41838\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e601f23df2ed88bbc9842a7d6b5f41838_parent_id_idx\` ON \`e601f23df2ed88bbc9842a7d6b5f41838\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e601f23df2ed88bbc9842a7d6b5f41838_item_idx\` ON \`e601f23df2ed88bbc9842a7d6b5f41838\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`e601f23df2ed88bbc9842a7d6b5f41838_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e601f23df2ed88bbc9842a7d6b5f41838\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e601f23df2ed88bbc9842a7d6b5f41838_locales_locale_parent_id_u\` ON \`e601f23df2ed88bbc9842a7d6b5f41838_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`quotes\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`quote_number\` text NOT NULL,
  	\`customer_id\` text(36) NOT NULL,
  	\`issued_at\` text,
  	\`expires_at\` text,
  	\`subtotal\` numeric DEFAULT 0,
  	\`tax_amount\` numeric DEFAULT 0,
  	\`total_amount\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'draft',
  	\`sent_at\` text,
  	\`accepted_at\` text,
  	\`converted_to_order_id\` text(36),
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`converted_to_order_id\`) REFERENCES \`sales_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`quotes_uuid_idx\` ON \`quotes\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`quotes_tenant_idx\` ON \`quotes\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`quotes_quote_number_idx\` ON \`quotes\` (\`quote_number\`);`)
  await db.run(sql`CREATE INDEX \`quotes_customer_idx\` ON \`quotes\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`quotes_converted_to_order_idx\` ON \`quotes\` (\`converted_to_order_id\`);`)
  await db.run(sql`CREATE INDEX \`quotes_created_by_idx\` ON \`quotes\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`quotes_approved_by_idx\` ON \`quotes\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`quotes_updated_at_idx\` ON \`quotes\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`quotes_created_at_idx\` ON \`quotes\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`ea1127d16d0118cc6b920e6820a2d4f19\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`line_number\` numeric NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`unit_price\` numeric NOT NULL,
  	\`line_net\` numeric DEFAULT 0,
  	\`tax_category_id\` text(36),
  	\`discount\` numeric DEFAULT 0,
  	\`requested_delivery_date\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tax_category_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sales_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ea1127d16d0118cc6b920e6820a2d4f19_order_idx\` ON \`ea1127d16d0118cc6b920e6820a2d4f19\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ea1127d16d0118cc6b920e6820a2d4f19_parent_id_idx\` ON \`ea1127d16d0118cc6b920e6820a2d4f19\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ea1127d16d0118cc6b920e6820a2d4f19_item_idx\` ON \`ea1127d16d0118cc6b920e6820a2d4f19\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`ea1127d16d0118cc6b920e6820a2d4f19_tax_category_idx\` ON \`ea1127d16d0118cc6b920e6820a2d4f19\` (\`tax_category_id\`);`)
  await db.run(sql`CREATE TABLE \`ea1127d16d0118cc6b920e6820a2d4f19_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ea1127d16d0118cc6b920e6820a2d4f19\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`ea1127d16d0118cc6b920e6820a2d4f19_locales_locale_parent_id_u\` ON \`ea1127d16d0118cc6b920e6820a2d4f19_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sales_orders\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`tenant_id\` text(36),
  	\`uuid\` text NOT NULL,
  	\`order_number\` text NOT NULL,
  	\`customer_id\` text(36) NOT NULL,
  	\`customer_order_reference\` text,
  	\`quote_id\` text(36),
  	\`contract_id\` text(36),
  	\`order_date\` text NOT NULL,
  	\`requested_delivery_date\` text,
  	\`promised_delivery_date\` text,
  	\`shipping_address_id\` text(36),
  	\`billing_address_id\` text(36),
  	\`currency\` text DEFAULT 'EUR' NOT NULL,
  	\`sub_total_amount\` numeric DEFAULT 0,
  	\`tax_amount\` numeric DEFAULT 0,
  	\`total_amount\` numeric DEFAULT 0,
  	\`fulfilled_quantity\` numeric DEFAULT 0,
  	\`invoiced_amount\` numeric DEFAULT 0,
  	\`cancellation_date\` text,
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`quote_id\`) REFERENCES \`quotes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`shipping_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`billing_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`sales_orders_tenant_idx\` ON \`sales_orders\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`sales_orders_uuid_idx\` ON \`sales_orders\` (\`uuid\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`sales_orders_order_number_idx\` ON \`sales_orders\` (\`order_number\`);`)
  await db.run(sql`CREATE INDEX \`sales_orders_customer_idx\` ON \`sales_orders\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_orders_quote_idx\` ON \`sales_orders\` (\`quote_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_orders_contract_idx\` ON \`sales_orders\` (\`contract_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_orders_shipping_address_idx\` ON \`sales_orders\` (\`shipping_address_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_orders_billing_address_idx\` ON \`sales_orders\` (\`billing_address_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_orders_created_by_idx\` ON \`sales_orders\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_orders_approved_by_idx\` ON \`sales_orders\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_orders_updated_at_idx\` ON \`sales_orders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`sales_orders_created_at_idx\` ON \`sales_orders\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`sales_orders_locales\` (
  	\`cancellation_reason\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sales_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sales_orders_locales_locale_parent_id_unique\` ON \`sales_orders_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sales_commissions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`salesperson_id\` text(36) NOT NULL,
  	\`employee_id\` text(36),
  	\`opportunity_id\` text(36) NOT NULL,
  	\`contract_id\` text(36),
  	\`customer_id\` text(36),
  	\`closed_won_date\` text NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`commission_rule_plan_name\` text,
  	\`commission_rule_rate_percent\` numeric,
  	\`commission_rule_tiered_override\` text,
  	\`contract_value\` numeric NOT NULL,
  	\`commission_amount\` numeric NOT NULL,
  	\`recognition_treatment\` text DEFAULT 'expense_immediately' NOT NULL,
  	\`amortisation_period_months\` numeric,
  	\`amortised_to_date\` numeric DEFAULT 0,
  	\`capitalised_asset_balance\` numeric DEFAULT 0,
  	\`payment_status\` text DEFAULT 'pending',
  	\`payment_date\` text,
  	\`paid_via_payroll_run_id\` text(36),
  	\`clawback_provision_id\` text(36),
  	\`journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`salesperson_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`employee_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`opportunity_id\`) REFERENCES \`opportunities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`paid_via_payroll_run_id\`) REFERENCES \`payroll_runs\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`clawback_provision_id\`) REFERENCES \`provisions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sales_commissions_uuid_idx\` ON \`sales_commissions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`sales_commissions_tenant_idx\` ON \`sales_commissions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`sales_commissions_reference_idx\` ON \`sales_commissions\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`sales_commissions_salesperson_idx\` ON \`sales_commissions\` (\`salesperson_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_commissions_employee_idx\` ON \`sales_commissions\` (\`employee_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_commissions_opportunity_idx\` ON \`sales_commissions\` (\`opportunity_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_commissions_contract_idx\` ON \`sales_commissions\` (\`contract_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_commissions_customer_idx\` ON \`sales_commissions\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_commissions_paid_via_payroll_run_idx\` ON \`sales_commissions\` (\`paid_via_payroll_run_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_commissions_clawback_provision_idx\` ON \`sales_commissions\` (\`clawback_provision_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_commissions_journal_entry_idx\` ON \`sales_commissions\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_commissions_created_by_idx\` ON \`sales_commissions\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_commissions_approved_by_idx\` ON \`sales_commissions\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_commissions_updated_at_idx\` ON \`sales_commissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`sales_commissions_created_at_idx\` ON \`sales_commissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`credit_memos\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`memo_number\` text NOT NULL,
  	\`customer_id\` text(36),
  	\`invoice_id\` text(36),
  	\`reason\` text NOT NULL,
  	\`reason_detail\` text,
  	\`amount\` numeric NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'draft',
  	\`issued_at\` text,
  	\`applied_at\` text,
  	\`settled_at\` text,
  	\`journal_entry_id\` text(36),
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`credit_memos_uuid_idx\` ON \`credit_memos\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_tenant_idx\` ON \`credit_memos\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`credit_memos_memo_number_idx\` ON \`credit_memos\` (\`memo_number\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_customer_idx\` ON \`credit_memos\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_invoice_idx\` ON \`credit_memos\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_journal_entry_idx\` ON \`credit_memos\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_created_by_idx\` ON \`credit_memos\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_approved_by_idx\` ON \`credit_memos\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_updated_at_idx\` ON \`credit_memos\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_created_at_idx\` ON \`credit_memos\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e70806190d4048502b85ef401011f5819\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity_returned\` numeric NOT NULL,
  	\`restock\` integer DEFAULT true,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`returns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e70806190d4048502b85ef401011f5819_order_idx\` ON \`e70806190d4048502b85ef401011f5819\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e70806190d4048502b85ef401011f5819_parent_id_idx\` ON \`e70806190d4048502b85ef401011f5819\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e70806190d4048502b85ef401011f5819_item_idx\` ON \`e70806190d4048502b85ef401011f5819\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`returns\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`rma_number\` text NOT NULL,
  	\`order_id\` text(36) NOT NULL,
  	\`customer_id\` text(36),
  	\`reason\` text NOT NULL,
  	\`status\` text DEFAULT 'requested',
  	\`authorised_at\` text,
  	\`received_at\` text,
  	\`restocked_at\` text,
  	\`credit_memo_id\` text(36),
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`order_id\`) REFERENCES \`sales_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`credit_memo_id\`) REFERENCES \`credit_memos\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`returns_uuid_idx\` ON \`returns\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`returns_tenant_idx\` ON \`returns\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`returns_rma_number_idx\` ON \`returns\` (\`rma_number\`);`)
  await db.run(sql`CREATE INDEX \`returns_order_idx\` ON \`returns\` (\`order_id\`);`)
  await db.run(sql`CREATE INDEX \`returns_customer_idx\` ON \`returns\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`returns_credit_memo_idx\` ON \`returns\` (\`credit_memo_id\`);`)
  await db.run(sql`CREATE INDEX \`returns_created_by_idx\` ON \`returns\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`returns_approved_by_idx\` ON \`returns\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`returns_updated_at_idx\` ON \`returns\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`returns_created_at_idx\` ON \`returns\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e934f7628401582b094b784c3c47361f6\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`shipments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e934f7628401582b094b784c3c47361f6_order_idx\` ON \`e934f7628401582b094b784c3c47361f6\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e934f7628401582b094b784c3c47361f6_parent_id_idx\` ON \`e934f7628401582b094b784c3c47361f6\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e934f7628401582b094b784c3c47361f6_item_idx\` ON \`e934f7628401582b094b784c3c47361f6\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`shipments\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`shipment_number\` text NOT NULL,
  	\`order_id\` text(36) NOT NULL,
  	\`ship_from_address_id\` text(36),
  	\`ship_to_address_id\` text(36) NOT NULL,
  	\`carrier\` text,
  	\`tracking_number\` text,
  	\`tracking_url\` text,
  	\`shipping_cost\` numeric DEFAULT 0,
  	\`status\` text DEFAULT 'pending',
  	\`shipped_at\` text,
  	\`delivered_at\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`order_id\`) REFERENCES \`sales_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ship_from_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ship_to_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`shipments_uuid_idx\` ON \`shipments\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`shipments_tenant_idx\` ON \`shipments\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`shipments_shipment_number_idx\` ON \`shipments\` (\`shipment_number\`);`)
  await db.run(sql`CREATE INDEX \`shipments_order_idx\` ON \`shipments\` (\`order_id\`);`)
  await db.run(sql`CREATE INDEX \`shipments_ship_from_address_idx\` ON \`shipments\` (\`ship_from_address_id\`);`)
  await db.run(sql`CREATE INDEX \`shipments_ship_to_address_idx\` ON \`shipments\` (\`ship_to_address_id\`);`)
  await db.run(sql`CREATE INDEX \`shipments_tracking_number_idx\` ON \`shipments\` (\`tracking_number\`);`)
  await db.run(sql`CREATE INDEX \`shipments_created_by_idx\` ON \`shipments\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`shipments_approved_by_idx\` ON \`shipments\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`shipments_updated_at_idx\` ON \`shipments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`shipments_created_at_idx\` ON \`shipments\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`refunds\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`refund_number\` text NOT NULL,
  	\`credit_memo_id\` text(36) NOT NULL,
  	\`invoice_id\` text(36),
  	\`order_id\` text(36),
  	\`amount\` numeric NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`method\` text NOT NULL,
  	\`stripe_refund_id\` text,
  	\`status\` text DEFAULT 'draft',
  	\`refunded_at\` text,
  	\`settled_at\` text,
  	\`failure_reason\` text,
  	\`journal_entry_id\` text(36),
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`credit_memo_id\`) REFERENCES \`credit_memos\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`order_id\`) REFERENCES \`sales_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`refunds_uuid_idx\` ON \`refunds\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`refunds_tenant_idx\` ON \`refunds\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`refunds_refund_number_idx\` ON \`refunds\` (\`refund_number\`);`)
  await db.run(sql`CREATE INDEX \`refunds_credit_memo_idx\` ON \`refunds\` (\`credit_memo_id\`);`)
  await db.run(sql`CREATE INDEX \`refunds_invoice_idx\` ON \`refunds\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`refunds_order_idx\` ON \`refunds\` (\`order_id\`);`)
  await db.run(sql`CREATE INDEX \`refunds_journal_entry_idx\` ON \`refunds\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`refunds_created_by_idx\` ON \`refunds\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`refunds_approved_by_idx\` ON \`refunds\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`refunds_updated_at_idx\` ON \`refunds\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`refunds_created_at_idx\` ON \`refunds\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payment_allocations\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text,
  	\`payment_id\` text(36) NOT NULL,
  	\`target_type\` text DEFAULT 'invoice' NOT NULL,
  	\`invoice_id\` text(36),
  	\`allocation_date\` text NOT NULL,
  	\`allocated_amount\` numeric NOT NULL,
  	\`allocated_fx\` numeric,
  	\`is_fully_settling\` integer DEFAULT false,
  	\`allocated_by_id\` text(36),
  	\`allocation_kind\` text DEFAULT 'manual',
  	\`reverse_of_id\` text(36),
  	\`status\` text DEFAULT 'posted',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`payment_id\`) REFERENCES \`payments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`allocated_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reverse_of_id\`) REFERENCES \`payment_allocations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payment_allocations_uuid_idx\` ON \`payment_allocations\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_tenant_idx\` ON \`payment_allocations\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_reference_idx\` ON \`payment_allocations\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_payment_idx\` ON \`payment_allocations\` (\`payment_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_invoice_idx\` ON \`payment_allocations\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_allocation_date_idx\` ON \`payment_allocations\` (\`allocation_date\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_allocated_by_idx\` ON \`payment_allocations\` (\`allocated_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_reverse_of_idx\` ON \`payment_allocations\` (\`reverse_of_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_created_by_idx\` ON \`payment_allocations\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_approved_by_idx\` ON \`payment_allocations\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_updated_at_idx\` ON \`payment_allocations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_created_at_idx\` ON \`payment_allocations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`eceaf268e207982e58512501eaf1eb056\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`stage\` text NOT NULL,
  	\`entered_at\` text NOT NULL,
  	\`amount_overdue_at_entry\` numeric,
  	\`communication_sent\` text,
  	\`communication_reference\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`dunning_cycles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eceaf268e207982e58512501eaf1eb056_order_idx\` ON \`eceaf268e207982e58512501eaf1eb056\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eceaf268e207982e58512501eaf1eb056_parent_id_idx\` ON \`eceaf268e207982e58512501eaf1eb056\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`eceaf268e207982e58512501eaf1eb056_locales\` (
  	\`notes\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`eceaf268e207982e58512501eaf1eb056\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`eceaf268e207982e58512501eaf1eb056_locales_locale_parent_id_u\` ON \`eceaf268e207982e58512501eaf1eb056_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`dunning_cycles\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`cycle_id\` text NOT NULL,
  	\`invoice_id\` text(36) NOT NULL,
  	\`customer_id\` text(36),
  	\`currency\` text DEFAULT 'EUR',
  	\`amount_overdue\` numeric NOT NULL,
  	\`invoice_due_date\` text NOT NULL,
  	\`days_past_due\` numeric,
  	\`current_stage\` text DEFAULT 'reminder' NOT NULL,
  	\`current_stage_entered_at\` text,
  	\`next_action_date\` text,
  	\`paused\` integer DEFAULT false,
  	\`pause_reason\` text,
  	\`payment_plan_ref\` text,
  	\`ecl_provision\` numeric,
  	\`write_off_journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'active',
  	\`resolved_at\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`write_off_journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`dunning_cycles_uuid_idx\` ON \`dunning_cycles\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_tenant_idx\` ON \`dunning_cycles\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`dunning_cycles_cycle_id_idx\` ON \`dunning_cycles\` (\`cycle_id\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_invoice_idx\` ON \`dunning_cycles\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_customer_idx\` ON \`dunning_cycles\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_write_off_journal_entry_idx\` ON \`dunning_cycles\` (\`write_off_journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_created_by_idx\` ON \`dunning_cycles\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_approved_by_idx\` ON \`dunning_cycles\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_updated_at_idx\` ON \`dunning_cycles\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_created_at_idx\` ON \`dunning_cycles\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`vendors\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`code\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`country\` text,
  	\`identity_legal_name\` text,
  	\`identity_vendor_type\` text DEFAULT 'company' NOT NULL,
  	\`identity_status\` text DEFAULT 'active' NOT NULL,
  	\`contact_email\` text,
  	\`contact_phone\` text,
  	\`contact_website\` text,
  	\`addresses_remit_to_address_id\` text(36),
  	\`tax_vat_number\` text,
  	\`tax_vat_number_type\` text,
  	\`tax_tax_exempt\` integer DEFAULT false,
  	\`tax_default_tax_code_id\` text(36),
  	\`tax_vendor1099_eligible\` integer DEFAULT false,
  	\`tax_tax1099_form_type\` text,
  	\`tax_tax_id_type\` text,
  	\`tax_withholding_rate\` numeric,
  	\`commercial_payment_terms\` text DEFAULT 'net_30',
  	\`commercial_payment_terms_days\` numeric,
  	\`commercial_preferred_payment_method\` text DEFAULT 'ach',
  	\`commercial_default_currency\` text DEFAULT 'EUR' NOT NULL,
  	\`commercial_default_locale\` text DEFAULT 'en',
  	\`bank_bank_account_name\` text,
  	\`bank_bank_name\` text,
  	\`bank_bank_routing_number\` text,
  	\`bank_bank_account_number\` text,
  	\`bank_bank_iban\` text,
  	\`bank_bank_swift_bic\` text,
  	\`bank_bank_country_code\` text,
  	\`ledger_default_payable_account_id\` text(36),
  	\`ledger_default_expense_account_id\` text(36),
  	\`ledger_default_withholding_account_id\` text(36),
  	\`notes_note\` text,
  	\`metadata\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`addresses_remit_to_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tax_default_tax_code_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_default_payable_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_default_expense_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_default_withholding_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`vendors_uuid_idx\` ON \`vendors\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`vendors_tenant_idx\` ON \`vendors\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`vendors_code_idx\` ON \`vendors\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`vendors_name_idx\` ON \`vendors\` (\`name\`);`)
  await db.run(sql`CREATE INDEX \`vendors_country_idx\` ON \`vendors\` (\`country\`);`)
  await db.run(sql`CREATE INDEX \`vendors_identity_identity_vendor_type_idx\` ON \`vendors\` (\`identity_vendor_type\`);`)
  await db.run(sql`CREATE INDEX \`vendors_identity_identity_status_idx\` ON \`vendors\` (\`identity_status\`);`)
  await db.run(sql`CREATE INDEX \`vendors_contact_contact_email_idx\` ON \`vendors\` (\`contact_email\`);`)
  await db.run(sql`CREATE INDEX \`vendors_addresses_addresses_remit_to_address_idx\` ON \`vendors\` (\`addresses_remit_to_address_id\`);`)
  await db.run(sql`CREATE INDEX \`vendors_tax_tax_vat_number_idx\` ON \`vendors\` (\`tax_vat_number\`);`)
  await db.run(sql`CREATE INDEX \`vendors_tax_tax_default_tax_code_idx\` ON \`vendors\` (\`tax_default_tax_code_id\`);`)
  await db.run(sql`CREATE INDEX \`vendors_tax_tax_vendor1099_eligible_idx\` ON \`vendors\` (\`tax_vendor1099_eligible\`);`)
  await db.run(sql`CREATE INDEX \`vendors_ledger_ledger_default_payable_account_idx\` ON \`vendors\` (\`ledger_default_payable_account_id\`);`)
  await db.run(sql`CREATE INDEX \`vendors_ledger_ledger_default_expense_account_idx\` ON \`vendors\` (\`ledger_default_expense_account_id\`);`)
  await db.run(sql`CREATE INDEX \`vendors_ledger_ledger_default_withholding_account_idx\` ON \`vendors\` (\`ledger_default_withholding_account_id\`);`)
  await db.run(sql`CREATE INDEX \`vendors_updated_at_idx\` ON \`vendors\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`vendors_created_at_idx\` ON \`vendors\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`vendors_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`addresses_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`vendors\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`addresses_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`vendors_rels_order_idx\` ON \`vendors_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`vendors_rels_parent_idx\` ON \`vendors_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`vendors_rels_path_idx\` ON \`vendors_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`vendors_rels_addresses_id_idx\` ON \`vendors_rels\` (\`addresses_id\`);`)
  await db.run(sql`CREATE TABLE \`vq_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`uom\` text DEFAULT 'EA',
  	\`unit_price\` numeric NOT NULL,
  	\`line_total\` numeric NOT NULL,
  	\`lead_time_days\` numeric,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`vendor_quotes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`vq_lines_order_idx\` ON \`vq_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`vq_lines_parent_id_idx\` ON \`vq_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`vq_lines_item_idx\` ON \`vq_lines\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`vq_lines_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`vq_lines\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`vq_lines_locales_locale_parent_id_unique\` ON \`vq_lines_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`vendor_quotes\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`quote_number\` text NOT NULL,
  	\`vendor_id\` text(36) NOT NULL,
  	\`requisition_id\` text(36),
  	\`rfq_issued_date\` text,
  	\`quote_received_date\` text NOT NULL,
  	\`valid_until\` text,
  	\`currency\` text DEFAULT 'EUR',
  	\`subtotal\` numeric,
  	\`tax_amount\` numeric,
  	\`shipping_amount\` numeric,
  	\`discount_amount\` numeric,
  	\`total_amount\` numeric NOT NULL,
  	\`payment_terms\` text,
  	\`incoterms\` text,
  	\`delivery_date\` text,
  	\`is_awarded\` integer DEFAULT false,
  	\`awarded_date\` text,
  	\`awarded_by_id\` text(36),
  	\`award_rationale\` text,
  	\`created_purchase_order_id\` text(36),
  	\`quality_assessment\` text,
  	\`status\` text DEFAULT 'received',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`vendor_id\`) REFERENCES \`vendors\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`requisition_id\`) REFERENCES \`purchase_requisitions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`awarded_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_purchase_order_id\`) REFERENCES \`purchase_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`vendor_quotes_uuid_idx\` ON \`vendor_quotes\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`vendor_quotes_tenant_idx\` ON \`vendor_quotes\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`vendor_quotes_quote_number_idx\` ON \`vendor_quotes\` (\`quote_number\`);`)
  await db.run(sql`CREATE INDEX \`vendor_quotes_vendor_idx\` ON \`vendor_quotes\` (\`vendor_id\`);`)
  await db.run(sql`CREATE INDEX \`vendor_quotes_requisition_idx\` ON \`vendor_quotes\` (\`requisition_id\`);`)
  await db.run(sql`CREATE INDEX \`vendor_quotes_is_awarded_idx\` ON \`vendor_quotes\` (\`is_awarded\`);`)
  await db.run(sql`CREATE INDEX \`vendor_quotes_awarded_by_idx\` ON \`vendor_quotes\` (\`awarded_by_id\`);`)
  await db.run(sql`CREATE INDEX \`vendor_quotes_created_purchase_order_idx\` ON \`vendor_quotes\` (\`created_purchase_order_id\`);`)
  await db.run(sql`CREATE INDEX \`vendor_quotes_created_by_idx\` ON \`vendor_quotes\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`vendor_quotes_approved_by_idx\` ON \`vendor_quotes\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`vendor_quotes_updated_at_idx\` ON \`vendor_quotes\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`vendor_quotes_created_at_idx\` ON \`vendor_quotes\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`vendor_scorecards\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`vendor_id\` text(36) NOT NULL,
  	\`period_label\` text NOT NULL,
  	\`period_start_date\` text NOT NULL,
  	\`period_end_date\` text NOT NULL,
  	\`evaluator_id\` text(36) NOT NULL,
  	\`metrics_on_time_delivery_percent\` numeric,
  	\`metrics_quality_acceptance_rate\` numeric,
  	\`metrics_price_accuracy_percent\` numeric,
  	\`metrics_response_time_avg_hours\` numeric,
  	\`metrics_return_rate_percent\` numeric,
  	\`metrics_sustainability_score\` numeric,
  	\`metrics_cybersecurity_score\` numeric,
  	\`volumes_total_spend\` numeric DEFAULT 0,
  	\`volumes_number_of_purchase_orders\` numeric DEFAULT 0,
  	\`volumes_number_of_receipts\` numeric DEFAULT 0,
  	\`volumes_number_of_nonconformances\` numeric DEFAULT 0,
  	\`volumes_number_of_returns\` numeric DEFAULT 0,
  	\`overall_score\` numeric,
  	\`recommendation\` text NOT NULL,
  	\`improvement_plan\` text,
  	\`reviewed_with_vendor\` integer DEFAULT false,
  	\`review_meeting_date\` text,
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`vendor_id\`) REFERENCES \`vendors\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`evaluator_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`vendor_scorecards_uuid_idx\` ON \`vendor_scorecards\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`vendor_scorecards_tenant_idx\` ON \`vendor_scorecards\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`vendor_scorecards_reference_idx\` ON \`vendor_scorecards\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`vendor_scorecards_vendor_idx\` ON \`vendor_scorecards\` (\`vendor_id\`);`)
  await db.run(sql`CREATE INDEX \`vendor_scorecards_evaluator_idx\` ON \`vendor_scorecards\` (\`evaluator_id\`);`)
  await db.run(sql`CREATE INDEX \`vendor_scorecards_created_by_idx\` ON \`vendor_scorecards\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`vendor_scorecards_approved_by_idx\` ON \`vendor_scorecards\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`vendor_scorecards_updated_at_idx\` ON \`vendor_scorecards\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`vendor_scorecards_created_at_idx\` ON \`vendor_scorecards\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`eced028e288018042b97287d40f1c01dd\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`line_number\` numeric DEFAULT 1,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`unit_price\` numeric NOT NULL,
  	\`line_total\` numeric DEFAULT 0,
  	\`gl_account_id\` text(36),
  	\`quantity_received\` numeric DEFAULT 0,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`purchase_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eced028e288018042b97287d40f1c01dd_order_idx\` ON \`eced028e288018042b97287d40f1c01dd\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eced028e288018042b97287d40f1c01dd_parent_id_idx\` ON \`eced028e288018042b97287d40f1c01dd\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`eced028e288018042b97287d40f1c01dd_item_idx\` ON \`eced028e288018042b97287d40f1c01dd\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`eced028e288018042b97287d40f1c01dd_gl_account_idx\` ON \`eced028e288018042b97287d40f1c01dd\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`eced028e288018042b97287d40f1c01dd_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`eced028e288018042b97287d40f1c01dd\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`eced028e288018042b97287d40f1c01dd_locales_locale_parent_id_u\` ON \`eced028e288018042b97287d40f1c01dd_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`purchase_orders\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`po_number\` text NOT NULL,
  	\`vendor_id\` text(36) NOT NULL,
  	\`order_date\` text NOT NULL,
  	\`expected_delivery_date\` text,
  	\`delivery_terms\` text,
  	\`incoterms_location\` text,
  	\`subtotal\` numeric DEFAULT 0,
  	\`tax_amount\` numeric DEFAULT 0,
  	\`total_amount\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'draft',
  	\`submitted_at\` text,
  	\`sent_at\` text,
  	\`closed_at\` text,
  	\`invoice_id\` text(36),
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`vendor_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`purchase_orders_uuid_idx\` ON \`purchase_orders\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_tenant_idx\` ON \`purchase_orders\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`purchase_orders_po_number_idx\` ON \`purchase_orders\` (\`po_number\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_vendor_idx\` ON \`purchase_orders\` (\`vendor_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_invoice_idx\` ON \`purchase_orders\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_created_by_idx\` ON \`purchase_orders\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_approved_by_idx\` ON \`purchase_orders\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_updated_at_idx\` ON \`purchase_orders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_created_at_idx\` ON \`purchase_orders\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pr_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`uom\` text DEFAULT 'EA',
  	\`estimated_unit_price\` numeric NOT NULL,
  	\`estimated_amount\` numeric NOT NULL,
  	\`gl_account_id\` text(36),
  	\`preferred_vendor_id\` text(36),
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`preferred_vendor_id\`) REFERENCES \`vendors\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`purchase_requisitions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pr_lines_order_idx\` ON \`pr_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pr_lines_parent_id_idx\` ON \`pr_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pr_lines_item_idx\` ON \`pr_lines\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`pr_lines_gl_account_idx\` ON \`pr_lines\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE INDEX \`pr_lines_preferred_vendor_idx\` ON \`pr_lines\` (\`preferred_vendor_id\`);`)
  await db.run(sql`CREATE TABLE \`pr_lines_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pr_lines\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pr_lines_locales_locale_parent_id_unique\` ON \`pr_lines_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pr_approval\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`step\` numeric NOT NULL,
  	\`approver_id\` text(36) NOT NULL,
  	\`role\` text,
  	\`decision\` text DEFAULT 'pending',
  	\`decided_at\` text,
  	FOREIGN KEY (\`approver_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`purchase_requisitions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pr_approval_order_idx\` ON \`pr_approval\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pr_approval_parent_id_idx\` ON \`pr_approval\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pr_approval_approver_idx\` ON \`pr_approval\` (\`approver_id\`);`)
  await db.run(sql`CREATE TABLE \`pr_approval_locales\` (
  	\`comment\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pr_approval\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pr_approval_locales_locale_parent_id_unique\` ON \`pr_approval_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`purchase_requisitions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`requisition_number\` text NOT NULL,
  	\`requisitioner_id\` text(36) NOT NULL,
  	\`department\` text,
  	\`cost_center_id\` text(36),
  	\`project_id\` text(36),
  	\`requested_date\` text NOT NULL,
  	\`required_by_date\` text,
  	\`business_justification\` text NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`estimated_total\` numeric NOT NULL,
  	\`priority\` text DEFAULT 'normal',
  	\`requires_quotes\` integer DEFAULT false,
  	\`minimum_quotes_required\` numeric DEFAULT 0,
  	\`created_purchase_order_id\` text(36),
  	\`awarded_quote_id\` text(36),
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`requisitioner_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_purchase_order_id\`) REFERENCES \`purchase_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`awarded_quote_id\`) REFERENCES \`vendor_quotes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`purchase_requisitions_uuid_idx\` ON \`purchase_requisitions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`purchase_requisitions_tenant_idx\` ON \`purchase_requisitions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`purchase_requisitions_requisition_number_idx\` ON \`purchase_requisitions\` (\`requisition_number\`);`)
  await db.run(sql`CREATE INDEX \`purchase_requisitions_requisitioner_idx\` ON \`purchase_requisitions\` (\`requisitioner_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_requisitions_cost_center_idx\` ON \`purchase_requisitions\` (\`cost_center_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_requisitions_project_idx\` ON \`purchase_requisitions\` (\`project_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_requisitions_created_purchase_order_idx\` ON \`purchase_requisitions\` (\`created_purchase_order_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_requisitions_awarded_quote_idx\` ON \`purchase_requisitions\` (\`awarded_quote_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_requisitions_created_by_idx\` ON \`purchase_requisitions\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_requisitions_approved_by_idx\` ON \`purchase_requisitions\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_requisitions_updated_at_idx\` ON \`purchase_requisitions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`purchase_requisitions_created_at_idx\` ON \`purchase_requisitions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`eeacdeee24bab86b0a04db17f2c688224\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity_received\` numeric NOT NULL,
  	\`quantity_damaged\` numeric DEFAULT 0,
  	\`condition\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`goods_receipts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eeacdeee24bab86b0a04db17f2c688224_order_idx\` ON \`eeacdeee24bab86b0a04db17f2c688224\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eeacdeee24bab86b0a04db17f2c688224_parent_id_idx\` ON \`eeacdeee24bab86b0a04db17f2c688224\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`eeacdeee24bab86b0a04db17f2c688224_item_idx\` ON \`eeacdeee24bab86b0a04db17f2c688224\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`eeacdeee24bab86b0a04db17f2c688224_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`eeacdeee24bab86b0a04db17f2c688224\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`eeacdeee24bab86b0a04db17f2c688224_locales_locale_parent_id_u\` ON \`eeacdeee24bab86b0a04db17f2c688224_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`goods_receipts\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`receipt_number\` text NOT NULL,
  	\`purchase_order_id\` text(36) NOT NULL,
  	\`received_date\` text NOT NULL,
  	\`status\` text DEFAULT 'pending',
  	\`inspected_at\` text,
  	\`inspected_by_id\` text(36),
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`purchase_order_id\`) REFERENCES \`purchase_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`inspected_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`goods_receipts_uuid_idx\` ON \`goods_receipts\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_tenant_idx\` ON \`goods_receipts\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`goods_receipts_receipt_number_idx\` ON \`goods_receipts\` (\`receipt_number\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_purchase_order_idx\` ON \`goods_receipts\` (\`purchase_order_id\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_inspected_by_idx\` ON \`goods_receipts\` (\`inspected_by_id\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_created_by_idx\` ON \`goods_receipts\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_approved_by_idx\` ON \`goods_receipts\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_updated_at_idx\` ON \`goods_receipts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_created_at_idx\` ON \`goods_receipts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`inventory_movements\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`movement_id\` text NOT NULL,
  	\`kind\` text NOT NULL,
  	\`item_id\` text(36) NOT NULL,
  	\`lot_or_serial\` text,
  	\`quantity\` numeric NOT NULL,
  	\`unit_cost\` numeric DEFAULT 0,
  	\`extended_cost\` numeric DEFAULT 0,
  	\`valuation_method\` text DEFAULT 'weighted_average' NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`from_location_id\` text(36),
  	\`to_location_id\` text(36),
  	\`movement_at\` text NOT NULL,
  	\`source_document_type\` text,
  	\`source_document_id\` text,
  	\`journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'draft',
  	\`posted_at\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`from_location_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`to_location_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`inventory_movements_uuid_idx\` ON \`inventory_movements\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`inventory_movements_tenant_idx\` ON \`inventory_movements\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`inventory_movements_movement_id_idx\` ON \`inventory_movements\` (\`movement_id\`);`)
  await db.run(sql`CREATE INDEX \`inventory_movements_item_idx\` ON \`inventory_movements\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`inventory_movements_from_location_idx\` ON \`inventory_movements\` (\`from_location_id\`);`)
  await db.run(sql`CREATE INDEX \`inventory_movements_to_location_idx\` ON \`inventory_movements\` (\`to_location_id\`);`)
  await db.run(sql`CREATE INDEX \`inventory_movements_movement_at_idx\` ON \`inventory_movements\` (\`movement_at\`);`)
  await db.run(sql`CREATE INDEX \`inventory_movements_journal_entry_idx\` ON \`inventory_movements\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`inventory_movements_created_by_idx\` ON \`inventory_movements\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`inventory_movements_approved_by_idx\` ON \`inventory_movements\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`inventory_movements_updated_at_idx\` ON \`inventory_movements\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`inventory_movements_created_at_idx\` ON \`inventory_movements\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`ebc746b7cb78f8bacb518c6e721f7b188\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`bin_code\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ebc746b7cb78f8bacb518c6e721f7b188_order_idx\` ON \`ebc746b7cb78f8bacb518c6e721f7b188\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ebc746b7cb78f8bacb518c6e721f7b188_parent_id_idx\` ON \`ebc746b7cb78f8bacb518c6e721f7b188\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ebc746b7cb78f8bacb518c6e721f7b188_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ebc746b7cb78f8bacb518c6e721f7b188\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`ebc746b7cb78f8bacb518c6e721f7b188_locales_locale_parent_id_u\` ON \`ebc746b7cb78f8bacb518c6e721f7b188_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`warehouse_locations\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`code\` text NOT NULL,
  	\`type\` text DEFAULT 'warehouse' NOT NULL,
  	\`address_id\` text(36),
  	\`country\` text,
  	\`region\` text,
  	\`gl_account_id\` text(36),
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`warehouse_locations_uuid_idx\` ON \`warehouse_locations\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`warehouse_locations_tenant_idx\` ON \`warehouse_locations\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`warehouse_locations_code_idx\` ON \`warehouse_locations\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`warehouse_locations_address_idx\` ON \`warehouse_locations\` (\`address_id\`);`)
  await db.run(sql`CREATE INDEX \`warehouse_locations_gl_account_idx\` ON \`warehouse_locations\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE INDEX \`warehouse_locations_created_by_idx\` ON \`warehouse_locations\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`warehouse_locations_approved_by_idx\` ON \`warehouse_locations\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`warehouse_locations_updated_at_idx\` ON \`warehouse_locations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`warehouse_locations_created_at_idx\` ON \`warehouse_locations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`warehouse_locations_locales\` (
  	\`name\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`warehouse_locations_locales_locale_parent_id_unique\` ON \`warehouse_locations_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ea97c27c5b39a86618794e02c9a375e5b\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`target_cost_center_id\` text(36),
  	\`basis\` text,
  	\`percentage\` numeric,
  	FOREIGN KEY (\`target_cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ea97c27c5b39a86618794e02c9a375e5b_order_idx\` ON \`ea97c27c5b39a86618794e02c9a375e5b\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ea97c27c5b39a86618794e02c9a375e5b_parent_id_idx\` ON \`ea97c27c5b39a86618794e02c9a375e5b\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ea97c27c5b39a86618794e02c9a375e5b_target_cost_center_idx\` ON \`ea97c27c5b39a86618794e02c9a375e5b\` (\`target_cost_center_id\`);`)
  await db.run(sql`CREATE TABLE \`cost_centers\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`cost_center_code\` text NOT NULL,
  	\`kind\` text DEFAULT 'department' NOT NULL,
  	\`parent_id\` text(36),
  	\`country\` text,
  	\`manager_id\` text(36),
  	\`reportable_segment\` integer DEFAULT false,
  	\`allows_revenue\` integer DEFAULT true,
  	\`allows_expense\` integer DEFAULT true,
  	\`allows_capex\` integer DEFAULT false,
  	\`effective_from\` text NOT NULL,
  	\`effective_to\` text,
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`manager_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`cost_centers_uuid_idx\` ON \`cost_centers\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`cost_centers_tenant_idx\` ON \`cost_centers\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`cost_centers_cost_center_code_idx\` ON \`cost_centers\` (\`cost_center_code\`);`)
  await db.run(sql`CREATE INDEX \`cost_centers_parent_idx\` ON \`cost_centers\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`cost_centers_manager_idx\` ON \`cost_centers\` (\`manager_id\`);`)
  await db.run(sql`CREATE INDEX \`cost_centers_created_by_idx\` ON \`cost_centers\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`cost_centers_approved_by_idx\` ON \`cost_centers\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`cost_centers_updated_at_idx\` ON \`cost_centers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`cost_centers_created_at_idx\` ON \`cost_centers\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`cost_centers_locales\` (
  	\`name\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`cost_centers_locales_locale_parent_id_unique\` ON \`cost_centers_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e595e236aadea8384bc3bfd7c2ccb6542\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`gl_account_id\` text(36) NOT NULL,
  	\`account_number\` text,
  	\`account_name\` text,
  	\`account_type\` text,
  	\`budget_amount\` numeric NOT NULL,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`budget_planning\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e595e236aadea8384bc3bfd7c2ccb6542_order_idx\` ON \`e595e236aadea8384bc3bfd7c2ccb6542\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e595e236aadea8384bc3bfd7c2ccb6542_parent_id_idx\` ON \`e595e236aadea8384bc3bfd7c2ccb6542\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e595e236aadea8384bc3bfd7c2ccb6542_gl_account_idx\` ON \`e595e236aadea8384bc3bfd7c2ccb6542\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`e595e236aadea8384bc3bfd7c2ccb6542_locales\` (
  	\`notes\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e595e236aadea8384bc3bfd7c2ccb6542\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e595e236aadea8384bc3bfd7c2ccb6542_locales_locale_parent_id_u\` ON \`e595e236aadea8384bc3bfd7c2ccb6542_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`budget_planning\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`budget_id\` text NOT NULL,
  	\`fiscal_year\` numeric NOT NULL,
  	\`department\` text NOT NULL,
  	\`budget_period\` text DEFAULT 'monthly',
  	\`total_budget\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`budget_planning_uuid_idx\` ON \`budget_planning\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_tenant_idx\` ON \`budget_planning\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`budget_planning_budget_id_idx\` ON \`budget_planning\` (\`budget_id\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_created_by_idx\` ON \`budget_planning\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_approved_by_idx\` ON \`budget_planning\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_updated_at_idx\` ON \`budget_planning\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_created_at_idx\` ON \`budget_planning\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`cost_variances\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`work_order_id\` text(36) NOT NULL,
  	\`variance_date\` text NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`variances_material_price_variance\` numeric DEFAULT 0,
  	\`variances_material_quantity_variance\` numeric DEFAULT 0,
  	\`variances_labour_rate_variance\` numeric DEFAULT 0,
  	\`variances_labour_efficiency_variance\` numeric DEFAULT 0,
  	\`variances_overhead_spending_variance\` numeric DEFAULT 0,
  	\`variances_overhead_volume_variance\` numeric DEFAULT 0,
  	\`total_variance\` numeric DEFAULT 0,
  	\`disposition\` text DEFAULT 'cogs',
  	\`journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`work_order_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`cost_variances_uuid_idx\` ON \`cost_variances\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`cost_variances_tenant_idx\` ON \`cost_variances\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`cost_variances_reference_idx\` ON \`cost_variances\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`cost_variances_work_order_idx\` ON \`cost_variances\` (\`work_order_id\`);`)
  await db.run(sql`CREATE INDEX \`cost_variances_variance_date_idx\` ON \`cost_variances\` (\`variance_date\`);`)
  await db.run(sql`CREATE INDEX \`cost_variances_journal_entry_idx\` ON \`cost_variances\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`cost_variances_created_by_idx\` ON \`cost_variances\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`cost_variances_approved_by_idx\` ON \`cost_variances\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`cost_variances_updated_at_idx\` ON \`cost_variances\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`cost_variances_created_at_idx\` ON \`cost_variances\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`intercompany_transactions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`from_tenant_id\` text(36) NOT NULL,
  	\`to_tenant_id\` text(36) NOT NULL,
  	\`from_legal_entity_id\` text(36),
  	\`to_legal_entity_id\` text(36),
  	\`transaction_date\` text NOT NULL,
  	\`pair_kind\` text DEFAULT 'transfer',
  	\`currency\` text DEFAULT 'EUR',
  	\`debit_amount\` numeric NOT NULL,
  	\`credit_amount\` numeric NOT NULL,
  	\`from_journal_entry_id\` text(36),
  	\`to_journal_entry_id\` text(36),
  	\`transfer_pricing_doc\` text,
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`from_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`to_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`from_legal_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`to_legal_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`from_journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`to_journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`intercompany_transactions_uuid_idx\` ON \`intercompany_transactions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`intercompany_transactions_tenant_idx\` ON \`intercompany_transactions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`intercompany_transactions_reference_idx\` ON \`intercompany_transactions\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`intercompany_transactions_from_tenant_idx\` ON \`intercompany_transactions\` (\`from_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`intercompany_transactions_to_tenant_idx\` ON \`intercompany_transactions\` (\`to_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`intercompany_transactions_from_legal_entity_idx\` ON \`intercompany_transactions\` (\`from_legal_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`intercompany_transactions_to_legal_entity_idx\` ON \`intercompany_transactions\` (\`to_legal_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`intercompany_transactions_transaction_date_idx\` ON \`intercompany_transactions\` (\`transaction_date\`);`)
  await db.run(sql`CREATE INDEX \`intercompany_transactions_from_journal_entry_idx\` ON \`intercompany_transactions\` (\`from_journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`intercompany_transactions_to_journal_entry_idx\` ON \`intercompany_transactions\` (\`to_journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`intercompany_transactions_created_by_idx\` ON \`intercompany_transactions\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`intercompany_transactions_approved_by_idx\` ON \`intercompany_transactions\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`intercompany_transactions_updated_at_idx\` ON \`intercompany_transactions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`intercompany_transactions_created_at_idx\` ON \`intercompany_transactions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e739a79cfffa08b4faa0baba3495bf9be\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`role\` text DEFAULT 'subsidiary',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`consolidation_eliminations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e739a79cfffa08b4faa0baba3495bf9be_order_idx\` ON \`e739a79cfffa08b4faa0baba3495bf9be\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e739a79cfffa08b4faa0baba3495bf9be_parent_id_idx\` ON \`e739a79cfffa08b4faa0baba3495bf9be\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`consolidation_eliminations\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`consolidation_date\` text NOT NULL,
  	\`elimination_type\` text NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`debit_amount\` numeric NOT NULL,
  	\`credit_amount\` numeric NOT NULL,
  	\`source_journal_entry_id\` text(36),
  	\`source_intercompany_id\` text(36),
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`source_journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`source_intercompany_id\`) REFERENCES \`intercompany_transactions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`consolidation_eliminations_uuid_idx\` ON \`consolidation_eliminations\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`consolidation_eliminations_tenant_idx\` ON \`consolidation_eliminations\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`consolidation_eliminations_reference_idx\` ON \`consolidation_eliminations\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`consolidation_eliminations_consolidation_date_idx\` ON \`consolidation_eliminations\` (\`consolidation_date\`);`)
  await db.run(sql`CREATE INDEX \`consolidation_eliminations_source_journal_entry_idx\` ON \`consolidation_eliminations\` (\`source_journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`consolidation_eliminations_source_intercompany_idx\` ON \`consolidation_eliminations\` (\`source_intercompany_id\`);`)
  await db.run(sql`CREATE INDEX \`consolidation_eliminations_created_by_idx\` ON \`consolidation_eliminations\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`consolidation_eliminations_approved_by_idx\` ON \`consolidation_eliminations\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`consolidation_eliminations_updated_at_idx\` ON \`consolidation_eliminations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`consolidation_eliminations_created_at_idx\` ON \`consolidation_eliminations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`fx_transactions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text,
  	\`transaction_date\` text NOT NULL,
  	\`transaction_kind\` text DEFAULT 'spot_conversion' NOT NULL,
  	\`from_currency\` text NOT NULL,
  	\`to_currency\` text NOT NULL,
  	\`from_amount\` numeric NOT NULL,
  	\`exchange_rate\` numeric NOT NULL,
  	\`to_amount\` numeric NOT NULL,
  	\`fx_gain_loss\` numeric DEFAULT 0,
  	\`currency_rate_id\` text(36),
  	\`journal_entry_id\` text(36),
  	\`source_collection\` text,
  	\`source_id\` text,
  	\`description\` text,
  	\`status\` text DEFAULT 'recorded',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`currency_rate_id\`) REFERENCES \`currency_rates\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`fx_transactions_uuid_idx\` ON \`fx_transactions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`fx_transactions_tenant_idx\` ON \`fx_transactions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`fx_transactions_reference_idx\` ON \`fx_transactions\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`fx_transactions_transaction_date_idx\` ON \`fx_transactions\` (\`transaction_date\`);`)
  await db.run(sql`CREATE INDEX \`fx_transactions_currency_rate_idx\` ON \`fx_transactions\` (\`currency_rate_id\`);`)
  await db.run(sql`CREATE INDEX \`fx_transactions_journal_entry_idx\` ON \`fx_transactions\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`fx_transactions_created_by_idx\` ON \`fx_transactions\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`fx_transactions_approved_by_idx\` ON \`fx_transactions\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`fx_transactions_updated_at_idx\` ON \`fx_transactions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`fx_transactions_created_at_idx\` ON \`fx_transactions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e476334f99a5080e1b8620daf7fabba26\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`modified_at\` text NOT NULL,
  	\`price_impact\` numeric,
  	\`modified_by_id\` text(36),
  	FOREIGN KEY (\`modified_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e476334f99a5080e1b8620daf7fabba26_order_idx\` ON \`e476334f99a5080e1b8620daf7fabba26\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e476334f99a5080e1b8620daf7fabba26_parent_id_idx\` ON \`e476334f99a5080e1b8620daf7fabba26\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e476334f99a5080e1b8620daf7fabba26_modified_by_idx\` ON \`e476334f99a5080e1b8620daf7fabba26\` (\`modified_by_id\`);`)
  await db.run(sql`CREATE TABLE \`e476334f99a5080e1b8620daf7fabba26_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e476334f99a5080e1b8620daf7fabba26\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e476334f99a5080e1b8620daf7fabba26_locales_locale_parent_id_u\` ON \`e476334f99a5080e1b8620daf7fabba26_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`contracts\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`contract_number\` text NOT NULL,
  	\`customer_id\` text(36) NOT NULL,
  	\`effective_from\` text NOT NULL,
  	\`effective_to\` text,
  	\`total_value\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`transaction_price_fixed\` numeric DEFAULT 0,
  	\`transaction_price_variable\` numeric DEFAULT 0,
  	\`variable_consideration_method\` text,
  	\`financing_component\` numeric DEFAULT 0,
  	\`payment_terms\` text,
  	\`status\` text DEFAULT 'draft',
  	\`activated_at\` text,
  	\`terminated_at\` text,
  	\`subscription_id\` text(36),
  	\`zkod_zkod_contract_number\` text,
  	\`zkod_zkod_notarized\` integer DEFAULT false,
  	\`zkod_mandatory_arbitration_clause\` integer DEFAULT false,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`subscription_id\`) REFERENCES \`subscriptions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`contracts_uuid_idx\` ON \`contracts\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`contracts_tenant_idx\` ON \`contracts\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`contracts_contract_number_idx\` ON \`contracts\` (\`contract_number\`);`)
  await db.run(sql`CREATE INDEX \`contracts_customer_idx\` ON \`contracts\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`contracts_subscription_idx\` ON \`contracts\` (\`subscription_id\`);`)
  await db.run(sql`CREATE INDEX \`contracts_zkod_zkod_zkod_contract_number_idx\` ON \`contracts\` (\`zkod_zkod_contract_number\`);`)
  await db.run(sql`CREATE INDEX \`contracts_created_by_idx\` ON \`contracts\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`contracts_approved_by_idx\` ON \`contracts\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`contracts_updated_at_idx\` ON \`contracts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`contracts_created_at_idx\` ON \`contracts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`contracts_locales\` (
  	\`title\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`contracts_locales_locale_parent_id_unique\` ON \`contracts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`contracts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`contracts_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`contracts_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contracts_rels_order_idx\` ON \`contracts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`contracts_rels_parent_idx\` ON \`contracts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contracts_rels_path_idx\` ON \`contracts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`contracts_rels_contracts_id_idx\` ON \`contracts_rels\` (\`contracts_id\`);`)
  await db.run(sql`CREATE TABLE \`performance_obligations\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`contract_id\` text(36) NOT NULL,
  	\`kind\` text DEFAULT 'distinct' NOT NULL,
  	\`recognition_timing\` text DEFAULT 'point_in_time' NOT NULL,
  	\`over_time_measurement\` text,
  	\`measurement_kind\` text,
  	\`recognition_method\` text,
  	\`standalone_selling_price\` numeric NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`allocated_amount\` numeric DEFAULT 0,
  	\`recognised_to_date\` numeric DEFAULT 0,
  	\`percent_complete\` numeric DEFAULT 0,
  	\`status\` text DEFAULT 'pending',
  	\`satisfied_at\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`performance_obligations_uuid_idx\` ON \`performance_obligations\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`performance_obligations_tenant_idx\` ON \`performance_obligations\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`performance_obligations_contract_idx\` ON \`performance_obligations\` (\`contract_id\`);`)
  await db.run(sql`CREATE INDEX \`performance_obligations_created_by_idx\` ON \`performance_obligations\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`performance_obligations_approved_by_idx\` ON \`performance_obligations\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`performance_obligations_updated_at_idx\` ON \`performance_obligations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`performance_obligations_created_at_idx\` ON \`performance_obligations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`performance_obligations_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`performance_obligations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`performance_obligations_locales_locale_parent_id_unique\` ON \`performance_obligations_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`commitments_and_contingencies\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`kind\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`legal_entity_id\` text(36),
  	\`counterparty\` text,
  	\`inception_date\` text NOT NULL,
  	\`expected_resolution_date\` text,
  	\`likelihood\` text DEFAULT 'possible',
  	\`currency\` text DEFAULT 'EUR',
  	\`maximum_exposure\` numeric NOT NULL,
  	\`expected_outflow\` numeric,
  	\`reimbursement_expected\` numeric DEFAULT 0,
  	\`is_onerous_contract_related\` integer DEFAULT false,
  	\`recognised_as_provision_id\` text(36),
  	\`note_text\` text,
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`legal_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`recognised_as_provision_id\`) REFERENCES \`provisions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`commitments_and_contingencies_uuid_idx\` ON \`commitments_and_contingencies\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`commitments_and_contingencies_tenant_idx\` ON \`commitments_and_contingencies\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`commitments_and_contingencies_reference_idx\` ON \`commitments_and_contingencies\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`commitments_and_contingencies_legal_entity_idx\` ON \`commitments_and_contingencies\` (\`legal_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`commitments_and_contingencies_recognised_as_provision_idx\` ON \`commitments_and_contingencies\` (\`recognised_as_provision_id\`);`)
  await db.run(sql`CREATE INDEX \`commitments_and_contingencies_created_by_idx\` ON \`commitments_and_contingencies\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`commitments_and_contingencies_approved_by_idx\` ON \`commitments_and_contingencies\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`commitments_and_contingencies_updated_at_idx\` ON \`commitments_and_contingencies\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`commitments_and_contingencies_created_at_idx\` ON \`commitments_and_contingencies\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`commitments_and_contingencies_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`commitments_and_contingencies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`commitments_and_contingencies_locales_locale_parent_id_uniqu\` ON \`commitments_and_contingencies_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e5496afa044df8c088b22ddbda34aa6ab\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`effective_date\` text NOT NULL,
  	\`kind\` text NOT NULL,
  	\`new_discount_rate_percent\` numeric,
  	\`new_fixed_payment\` numeric,
  	\`new_end_date\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`leases\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e5496afa044df8c088b22ddbda34aa6ab_order_idx\` ON \`e5496afa044df8c088b22ddbda34aa6ab\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e5496afa044df8c088b22ddbda34aa6ab_parent_id_idx\` ON \`e5496afa044df8c088b22ddbda34aa6ab\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e5496afa044df8c088b22ddbda34aa6ab_locales\` (
  	\`notes\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e5496afa044df8c088b22ddbda34aa6ab\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e5496afa044df8c088b22ddbda34aa6ab_locales_locale_parent_id_u\` ON \`e5496afa044df8c088b22ddbda34aa6ab_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`leases\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`lease_number\` text NOT NULL,
  	\`description\` text,
  	\`lessor_id\` text(36),
  	\`classification\` text DEFAULT 'finance' NOT NULL,
  	\`underlying_asset_category\` text,
  	\`commencement_date\` text NOT NULL,
  	\`end_date\` text NOT NULL,
  	\`lease_term_months\` numeric,
  	\`fixed_payment\` numeric NOT NULL,
  	\`payment_frequency\` text DEFAULT 'monthly',
  	\`payment_timing\` text DEFAULT 'in_advance',
  	\`variable_payment_notes\` text,
  	\`residual_value_guarantee\` numeric DEFAULT 0,
  	\`termination_penalty\` numeric DEFAULT 0,
  	\`discount_rate_basis\` text DEFAULT 'incremental_borrowing',
  	\`discount_rate_percent\` numeric NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`initial_lease_liability\` numeric,
  	\`initial_direct_costs\` numeric DEFAULT 0,
  	\`lease_incentives_received\` numeric DEFAULT 0,
  	\`prepaid_rent\` numeric DEFAULT 0,
  	\`initial_rou_asset\` numeric,
  	\`rou_asset_carrying\` numeric,
  	\`liability_carrying\` numeric,
  	\`last_posting_date\` text,
  	\`impairment_reserve\` numeric DEFAULT 0,
  	\`status\` text DEFAULT 'draft',
  	\`termination_date\` text,
  	\`rou_asset_account_id\` text(36),
  	\`lease_liability_account_id\` text(36),
  	\`rou_amortization_account_id\` text(36),
  	\`interest_expense_account_id\` text(36),
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`lessor_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`rou_asset_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`lease_liability_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`rou_amortization_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`interest_expense_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`leases_uuid_idx\` ON \`leases\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`leases_tenant_idx\` ON \`leases\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`leases_lease_number_idx\` ON \`leases\` (\`lease_number\`);`)
  await db.run(sql`CREATE INDEX \`leases_lessor_idx\` ON \`leases\` (\`lessor_id\`);`)
  await db.run(sql`CREATE INDEX \`leases_rou_asset_account_idx\` ON \`leases\` (\`rou_asset_account_id\`);`)
  await db.run(sql`CREATE INDEX \`leases_lease_liability_account_idx\` ON \`leases\` (\`lease_liability_account_id\`);`)
  await db.run(sql`CREATE INDEX \`leases_rou_amortization_account_idx\` ON \`leases\` (\`rou_amortization_account_id\`);`)
  await db.run(sql`CREATE INDEX \`leases_interest_expense_account_idx\` ON \`leases\` (\`interest_expense_account_id\`);`)
  await db.run(sql`CREATE INDEX \`leases_created_by_idx\` ON \`leases\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`leases_approved_by_idx\` ON \`leases\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`leases_updated_at_idx\` ON \`leases\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`leases_created_at_idx\` ON \`leases\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`lease_modifications\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`lease_id\` text(36) NOT NULL,
  	\`modification_date\` text NOT NULL,
  	\`agreement_signed_date\` text,
  	\`period_id\` text(36),
  	\`modification_kind\` text NOT NULL,
  	\`classification\` text NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`pre_modification_remaining_term_months\` numeric DEFAULT 0,
  	\`pre_modification_discount_rate\` numeric,
  	\`pre_modification_liability_carrying_amount\` numeric DEFAULT 0,
  	\`pre_modification_rou_carrying_amount\` numeric DEFAULT 0,
  	\`pre_modification_fixed_payment\` numeric DEFAULT 0,
  	\`post_modification_new_term_months\` numeric DEFAULT 0,
  	\`post_modification_new_discount_rate\` numeric,
  	\`post_modification_new_fixed_payment\` numeric DEFAULT 0,
  	\`post_modification_new_payment_frequency\` text,
  	\`post_modification_consideration_paid\` numeric DEFAULT 0,
  	\`liability_remeasurement\` numeric,
  	\`rou_adjustment\` numeric,
  	\`gain_loss_on_modification\` numeric,
  	\`journal_entry_id\` text(36),
  	\`agreement_document_ref\` text,
  	\`evidence_attestation_id\` text(36),
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`lease_id\`) REFERENCES \`leases\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`period_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`evidence_attestation_id\`) REFERENCES \`evidence_attestations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`lease_modifications_uuid_idx\` ON \`lease_modifications\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`lease_modifications_tenant_idx\` ON \`lease_modifications\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`lease_modifications_reference_idx\` ON \`lease_modifications\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`lease_modifications_lease_idx\` ON \`lease_modifications\` (\`lease_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_modifications_period_idx\` ON \`lease_modifications\` (\`period_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_modifications_journal_entry_idx\` ON \`lease_modifications\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_modifications_evidence_attestation_idx\` ON \`lease_modifications\` (\`evidence_attestation_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_modifications_created_by_idx\` ON \`lease_modifications\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_modifications_approved_by_idx\` ON \`lease_modifications\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_modifications_updated_at_idx\` ON \`lease_modifications\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`lease_modifications_created_at_idx\` ON \`lease_modifications\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`lease_period_postings\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`posting_id\` text NOT NULL,
  	\`lease_id\` text(36) NOT NULL,
  	\`period_start\` text NOT NULL,
  	\`period_end\` text NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`opening_liability_carrying\` numeric NOT NULL,
  	\`opening_rou_carrying\` numeric NOT NULL,
  	\`interest\` numeric NOT NULL,
  	\`principal_repayment\` numeric NOT NULL,
  	\`cash_payment\` numeric NOT NULL,
  	\`rou_amortisation\` numeric NOT NULL,
  	\`closing_liability_carrying\` numeric,
  	\`closing_rou_carrying\` numeric,
  	\`interest_expense_account_id\` text(36),
  	\`lease_liability_account_id\` text(36),
  	\`rou_amortisation_account_id\` text(36),
  	\`accumulated_rou_amortisation_account_id\` text(36),
  	\`cash_account_id\` text(36),
  	\`cost_center_id\` text(36),
  	\`status\` text DEFAULT 'calculated',
  	\`posted_at\` text,
  	\`journal_entry_id\` text(36),
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`lease_id\`) REFERENCES \`leases\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`interest_expense_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`lease_liability_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`rou_amortisation_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`accumulated_rou_amortisation_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cash_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`lease_period_postings_uuid_idx\` ON \`lease_period_postings\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_tenant_idx\` ON \`lease_period_postings\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`lease_period_postings_posting_id_idx\` ON \`lease_period_postings\` (\`posting_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_lease_idx\` ON \`lease_period_postings\` (\`lease_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_period_end_idx\` ON \`lease_period_postings\` (\`period_end\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_interest_expense_account_idx\` ON \`lease_period_postings\` (\`interest_expense_account_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_lease_liability_account_idx\` ON \`lease_period_postings\` (\`lease_liability_account_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_rou_amortisation_account_idx\` ON \`lease_period_postings\` (\`rou_amortisation_account_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_accumulated_rou_amortisation_accou_idx\` ON \`lease_period_postings\` (\`accumulated_rou_amortisation_account_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_cash_account_idx\` ON \`lease_period_postings\` (\`cash_account_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_cost_center_idx\` ON \`lease_period_postings\` (\`cost_center_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_journal_entry_idx\` ON \`lease_period_postings\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_created_by_idx\` ON \`lease_period_postings\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_approved_by_idx\` ON \`lease_period_postings\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_updated_at_idx\` ON \`lease_period_postings\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_created_at_idx\` ON \`lease_period_postings\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`ecf42f6f7e9ab844998d1601a14e54745\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`end_to_end_id\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`counterparty_name\` text NOT NULL,
  	\`counterparty_iban\` text NOT NULL,
  	\`counterparty_bic\` text,
  	\`remittance_reference\` text,
  	\`mandate_id\` text,
  	\`source_bill_id\` text(36),
  	\`payment_record_id\` text(36),
  	FOREIGN KEY (\`source_bill_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`payment_record_id\`) REFERENCES \`payments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`payment_runs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ecf42f6f7e9ab844998d1601a14e54745_order_idx\` ON \`ecf42f6f7e9ab844998d1601a14e54745\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ecf42f6f7e9ab844998d1601a14e54745_parent_id_idx\` ON \`ecf42f6f7e9ab844998d1601a14e54745\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ecf42f6f7e9ab844998d1601a14e54745_source_bill_idx\` ON \`ecf42f6f7e9ab844998d1601a14e54745\` (\`source_bill_id\`);`)
  await db.run(sql`CREATE INDEX \`ecf42f6f7e9ab844998d1601a14e54745_payment_record_idx\` ON \`ecf42f6f7e9ab844998d1601a14e54745\` (\`payment_record_id\`);`)
  await db.run(sql`CREATE TABLE \`payment_runs\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`run_id\` text NOT NULL,
  	\`message_type\` text NOT NULL,
  	\`sequence_type\` text,
  	\`local_instrument\` text,
  	\`source_bank_account_id\` text(36) NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`requested_execution_date\` text NOT NULL,
  	\`number_of_transactions\` numeric,
  	\`control_sum\` numeric,
  	\`prepared_by_id\` text(36),
  	\`prepared_at\` text,
  	\`authorised_by_id\` text(36),
  	\`authorised_at\` text,
  	\`export_filename\` text,
  	\`exported_at\` text,
  	\`submitted_at\` text,
  	\`settled_at\` text,
  	\`bank_response_status\` text,
  	\`bank_response_reason_code\` text,
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`source_bank_account_id\`) REFERENCES \`bank_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`prepared_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`authorised_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payment_runs_uuid_idx\` ON \`payment_runs\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`payment_runs_tenant_idx\` ON \`payment_runs\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`payment_runs_run_id_idx\` ON \`payment_runs\` (\`run_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_runs_source_bank_account_idx\` ON \`payment_runs\` (\`source_bank_account_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_runs_prepared_by_idx\` ON \`payment_runs\` (\`prepared_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_runs_authorised_by_idx\` ON \`payment_runs\` (\`authorised_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_runs_created_by_idx\` ON \`payment_runs\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_runs_approved_by_idx\` ON \`payment_runs\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_runs_updated_at_idx\` ON \`payment_runs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payment_runs_created_at_idx\` ON \`payment_runs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`sepa_mandates\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`mandate_id\` text NOT NULL,
  	\`local_instrument\` text DEFAULT 'CORE' NOT NULL,
  	\`debtor_name\` text NOT NULL,
  	\`debtor_iban\` text NOT NULL,
  	\`debtor_bic\` text,
  	\`debtor_id\` text(36),
  	\`creditor_identifier\` text NOT NULL,
  	\`signature_date\` text NOT NULL,
  	\`mandate_document_id\` text(36),
  	\`signature_method\` text DEFAULT 'wet_ink',
  	\`sequence_state\` text DEFAULT 'pending_first',
  	\`last_collection_at\` text,
  	\`expiry_date\` text,
  	\`revoked_at\` text,
  	\`revocation_reason\` text,
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`debtor_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`mandate_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sepa_mandates_uuid_idx\` ON \`sepa_mandates\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_tenant_idx\` ON \`sepa_mandates\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`sepa_mandates_mandate_id_idx\` ON \`sepa_mandates\` (\`mandate_id\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_debtor_idx\` ON \`sepa_mandates\` (\`debtor_id\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_mandate_document_idx\` ON \`sepa_mandates\` (\`mandate_document_id\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_created_by_idx\` ON \`sepa_mandates\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_approved_by_idx\` ON \`sepa_mandates\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_updated_at_idx\` ON \`sepa_mandates\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_created_at_idx\` ON \`sepa_mandates\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e30a95432eb9e8c50a8468c48698c4e69\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`employee_id\` text(36) NOT NULL,
  	\`regular_minutes\` numeric DEFAULT 0,
  	\`overtime15_minutes\` numeric DEFAULT 0,
  	\`overtime2_minutes\` numeric DEFAULT 0,
  	\`night_shift_minutes\` numeric DEFAULT 0,
  	\`holiday_work_minutes\` numeric DEFAULT 0,
  	\`pto_minutes\` numeric DEFAULT 0,
  	\`sick_minutes\` numeric DEFAULT 0,
  	\`base_gross\` numeric NOT NULL,
  	\`overtime_gross\` numeric DEFAULT 0,
  	\`bonus_gross\` numeric DEFAULT 0,
  	\`total_gross\` numeric NOT NULL,
  	\`income_tax_withheld\` numeric DEFAULT 0,
  	\`social_security_employee\` numeric DEFAULT 0,
  	\`pension_employee\` numeric DEFAULT 0,
  	\`other_deductions\` numeric DEFAULT 0,
  	\`net_pay\` numeric NOT NULL,
  	\`social_security_employer\` numeric DEFAULT 0,
  	\`pension_employer\` numeric DEFAULT 0,
  	\`payroll_taxes_employer\` numeric DEFAULT 0,
  	\`cost_center_id\` text(36),
  	\`pay_slip_document_id\` text(36),
  	FOREIGN KEY (\`employee_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`pay_slip_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`payroll_runs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e30a95432eb9e8c50a8468c48698c4e69_order_idx\` ON \`e30a95432eb9e8c50a8468c48698c4e69\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e30a95432eb9e8c50a8468c48698c4e69_parent_id_idx\` ON \`e30a95432eb9e8c50a8468c48698c4e69\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e30a95432eb9e8c50a8468c48698c4e69_employee_idx\` ON \`e30a95432eb9e8c50a8468c48698c4e69\` (\`employee_id\`);`)
  await db.run(sql`CREATE INDEX \`e30a95432eb9e8c50a8468c48698c4e69_cost_center_idx\` ON \`e30a95432eb9e8c50a8468c48698c4e69\` (\`cost_center_id\`);`)
  await db.run(sql`CREATE INDEX \`e30a95432eb9e8c50a8468c48698c4e69_pay_slip_document_idx\` ON \`e30a95432eb9e8c50a8468c48698c4e69\` (\`pay_slip_document_id\`);`)
  await db.run(sql`CREATE TABLE \`payroll_runs\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`run_id\` text NOT NULL,
  	\`pay_schedule\` text NOT NULL,
  	\`period_start\` text NOT NULL,
  	\`period_end\` text NOT NULL,
  	\`payment_date\` text NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`source_bank_account_id\` text(36) NOT NULL,
  	\`employee_count\` numeric,
  	\`total_gross\` numeric,
  	\`total_deductions\` numeric,
  	\`total_net\` numeric,
  	\`total_employer_side_accruals\` numeric,
  	\`prepared_by_id\` text(36),
  	\`prepared_at\` text,
  	\`authorised_by_id\` text(36),
  	\`authorised_at\` text,
  	\`status\` text DEFAULT 'draft',
  	\`journal_entry_id\` text(36),
  	\`payment_run_id\` text(36),
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`source_bank_account_id\`) REFERENCES \`bank_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`prepared_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`authorised_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`payment_run_id\`) REFERENCES \`payment_runs\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payroll_runs_uuid_idx\` ON \`payroll_runs\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_tenant_idx\` ON \`payroll_runs\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`payroll_runs_run_id_idx\` ON \`payroll_runs\` (\`run_id\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_period_start_idx\` ON \`payroll_runs\` (\`period_start\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_period_end_idx\` ON \`payroll_runs\` (\`period_end\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_source_bank_account_idx\` ON \`payroll_runs\` (\`source_bank_account_id\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_prepared_by_idx\` ON \`payroll_runs\` (\`prepared_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_authorised_by_idx\` ON \`payroll_runs\` (\`authorised_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_journal_entry_idx\` ON \`payroll_runs\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_payment_run_idx\` ON \`payroll_runs\` (\`payment_run_id\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_created_by_idx\` ON \`payroll_runs\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_approved_by_idx\` ON \`payroll_runs\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_updated_at_idx\` ON \`payroll_runs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_created_at_idx\` ON \`payroll_runs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e6ad64a821b7689ad8f40c0ee61ef44c7\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`competency\` text NOT NULL,
  	\`proficiency\` numeric,
  	\`assessed_at\` text,
  	\`evidence\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e6ad64a821b7689ad8f40c0ee61ef44c7_order_idx\` ON \`e6ad64a821b7689ad8f40c0ee61ef44c7\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e6ad64a821b7689ad8f40c0ee61ef44c7_parent_id_idx\` ON \`e6ad64a821b7689ad8f40c0ee61ef44c7\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e6ad64a821b7689ad8f40c0ee61ef44c7_competency_idx\` ON \`e6ad64a821b7689ad8f40c0ee61ef44c7\` (\`competency\`);`)
  await db.run(sql`CREATE TABLE \`employees\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`employee_number\` text NOT NULL,
  	\`display_name\` text NOT NULL,
  	\`identity_given_name\` text NOT NULL,
  	\`identity_family_name\` text NOT NULL,
  	\`identity_date_of_birth\` text,
  	\`identity_national_id_ref\` text,
  	\`identity_citizenship_country\` text,
  	\`contact_work_email\` text,
  	\`contact_personal_email\` text,
  	\`contact_phone\` text,
  	\`job_title\` text NOT NULL,
  	\`employment_type\` text DEFAULT 'full_time_indefinite' NOT NULL,
  	\`department_id\` text(36),
  	\`manager_id\` text(36),
  	\`user_id\` text(36),
  	\`work_country\` text,
  	\`hire_date\` text NOT NULL,
  	\`probation_end_date\` text,
  	\`contract_end_date\` text,
  	\`termination_date\` text,
  	\`termination_reason\` text,
  	\`currency\` text DEFAULT 'EUR',
  	\`compensation_base_salary_annual\` numeric,
  	\`compensation_fte_ratio\` numeric DEFAULT 1,
  	\`compensation_pay_schedule\` text DEFAULT 'monthly',
  	\`compensation_target_bonus_percent\` numeric,
  	\`compensation_target_bonus_basis\` text,
  	\`benefits_pension_plan\` text,
  	\`benefits_pension_employer_contribution_percent\` numeric,
  	\`benefits_health_insurance\` integer DEFAULT false,
  	\`benefits_life_insurance\` integer DEFAULT false,
  	\`benefits_paid_time_off_days_per_year\` numeric,
  	\`benefits_paid_time_off_balance\` numeric DEFAULT 0,
  	\`payroll_bank_account_iban\` text,
  	\`payroll_bank_account_bic\` text,
  	\`payroll_bank_account_account_holder\` text,
  	\`tax_tax_id_ref\` text,
  	\`tax_social_security_id_ref\` text,
  	\`tax_tax_residence_country\` text,
  	\`status\` text DEFAULT 'pre_hire',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`department_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`manager_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`employees_uuid_idx\` ON \`employees\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`employees_tenant_idx\` ON \`employees\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`employees_employee_number_idx\` ON \`employees\` (\`employee_number\`);`)
  await db.run(sql`CREATE INDEX \`employees_department_idx\` ON \`employees\` (\`department_id\`);`)
  await db.run(sql`CREATE INDEX \`employees_manager_idx\` ON \`employees\` (\`manager_id\`);`)
  await db.run(sql`CREATE INDEX \`employees_user_idx\` ON \`employees\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`employees_created_by_idx\` ON \`employees\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`employees_approved_by_idx\` ON \`employees\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`employees_updated_at_idx\` ON \`employees\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`employees_created_at_idx\` ON \`employees\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`connections\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`from_id\` text(36) NOT NULL,
  	\`to_id\` text(36) NOT NULL,
  	\`context\` text DEFAULT 'follow' NOT NULL,
  	\`reciprocal\` integer DEFAULT false,
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`from_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`to_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`connections_uuid_idx\` ON \`connections\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`connections_from_idx\` ON \`connections\` (\`from_id\`);`)
  await db.run(sql`CREATE INDEX \`connections_to_idx\` ON \`connections\` (\`to_id\`);`)
  await db.run(sql`CREATE INDEX \`connections_created_by_idx\` ON \`connections\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`connections_approved_by_idx\` ON \`connections\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`connections_updated_at_idx\` ON \`connections\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`connections_created_at_idx\` ON \`connections\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`sectors\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`reference\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`parent_id\` text(36),
  	\`institutional_sector\` text,
  	\`isic_code\` text,
  	\`nace_code\` text,
  	\`cofog_division\` text,
  	\`icnpo_group\` text,
  	\`sdg_goal\` numeric,
  	\`country_code\` text,
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`sectors\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sectors_uuid_idx\` ON \`sectors\` (\`uuid\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`sectors_reference_idx\` ON \`sectors\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`sectors_name_idx\` ON \`sectors\` (\`name\`);`)
  await db.run(sql`CREATE INDEX \`sectors_parent_idx\` ON \`sectors\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sectors_isic_code_idx\` ON \`sectors\` (\`isic_code\`);`)
  await db.run(sql`CREATE INDEX \`sectors_country_code_idx\` ON \`sectors\` (\`country_code\`);`)
  await db.run(sql`CREATE INDEX \`sectors_created_by_idx\` ON \`sectors\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`sectors_approved_by_idx\` ON \`sectors\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`sectors_updated_at_idx\` ON \`sectors\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`sectors_created_at_idx\` ON \`sectors\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e89951a9dc19789428d4d937cfad80caf\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`competency\` text NOT NULL,
  	\`min_proficiency\` numeric,
  	\`mandatory\` integer DEFAULT true,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_positions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e89951a9dc19789428d4d937cfad80caf_order_idx\` ON \`e89951a9dc19789428d4d937cfad80caf\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e89951a9dc19789428d4d937cfad80caf_parent_id_idx\` ON \`e89951a9dc19789428d4d937cfad80caf\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e89951a9dc19789428d4d937cfad80caf_competency_idx\` ON \`e89951a9dc19789428d4d937cfad80caf\` (\`competency\`);`)
  await db.run(sql`CREATE TABLE \`job_positions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`position_code\` text NOT NULL,
  	\`position_title\` text NOT NULL,
  	\`esco_occupation\` text,
  	\`isco_unit_group\` text,
  	\`department\` text,
  	\`cost_center_id\` text(36),
  	\`legal_entity_id\` text(36),
  	\`reports_to_id\` text(36),
  	\`level\` text,
  	\`employment_type\` text DEFAULT 'full_time',
  	\`fte\` numeric DEFAULT 1,
  	\`job_description\` text,
  	\`requirements\` text,
  	\`work_location\` text,
  	\`work_arrangement\` text,
  	\`currency\` text DEFAULT 'EUR',
  	\`salary_range_min\` numeric,
  	\`salary_range_mid\` numeric,
  	\`salary_range_max\` numeric,
  	\`budgeted_annual_cost\` numeric,
  	\`current_employee_id\` text(36),
  	\`effective_start_date\` text NOT NULL,
  	\`effective_end_date\` text,
  	\`is_approved_headcount\` integer DEFAULT false,
  	\`status\` text DEFAULT 'planned',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`legal_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reports_to_id\`) REFERENCES \`job_positions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`current_employee_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`job_positions_uuid_idx\` ON \`job_positions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`job_positions_tenant_idx\` ON \`job_positions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`job_positions_position_code_idx\` ON \`job_positions\` (\`position_code\`);`)
  await db.run(sql`CREATE INDEX \`job_positions_position_title_idx\` ON \`job_positions\` (\`position_title\`);`)
  await db.run(sql`CREATE INDEX \`job_positions_esco_occupation_idx\` ON \`job_positions\` (\`esco_occupation\`);`)
  await db.run(sql`CREATE INDEX \`job_positions_isco_unit_group_idx\` ON \`job_positions\` (\`isco_unit_group\`);`)
  await db.run(sql`CREATE INDEX \`job_positions_department_idx\` ON \`job_positions\` (\`department\`);`)
  await db.run(sql`CREATE INDEX \`job_positions_cost_center_idx\` ON \`job_positions\` (\`cost_center_id\`);`)
  await db.run(sql`CREATE INDEX \`job_positions_legal_entity_idx\` ON \`job_positions\` (\`legal_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`job_positions_reports_to_idx\` ON \`job_positions\` (\`reports_to_id\`);`)
  await db.run(sql`CREATE INDEX \`job_positions_current_employee_idx\` ON \`job_positions\` (\`current_employee_id\`);`)
  await db.run(sql`CREATE INDEX \`job_positions_created_by_idx\` ON \`job_positions\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`job_positions_approved_by_idx\` ON \`job_positions\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`job_positions_updated_at_idx\` ON \`job_positions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`job_positions_created_at_idx\` ON \`job_positions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`time_entries\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`entry_id\` text NOT NULL,
  	\`employee_id\` text(36) NOT NULL,
  	\`work_date\` text NOT NULL,
  	\`minutes\` numeric NOT NULL,
  	\`kind\` text DEFAULT 'regular' NOT NULL,
  	\`cost_center_id\` text(36),
  	\`project\` text,
  	\`task\` text,
  	\`description\` text,
  	\`billable\` integer DEFAULT false,
  	\`billable_rate\` numeric,
  	\`status\` text DEFAULT 'draft',
  	\`submitted_at\` text,
  	\`rejection_reason\` text,
  	\`payroll_run_id\` text(36),
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`employee_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`payroll_run_id\`) REFERENCES \`payroll_runs\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`time_entries_uuid_idx\` ON \`time_entries\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`time_entries_tenant_idx\` ON \`time_entries\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`time_entries_entry_id_idx\` ON \`time_entries\` (\`entry_id\`);`)
  await db.run(sql`CREATE INDEX \`time_entries_employee_idx\` ON \`time_entries\` (\`employee_id\`);`)
  await db.run(sql`CREATE INDEX \`time_entries_work_date_idx\` ON \`time_entries\` (\`work_date\`);`)
  await db.run(sql`CREATE INDEX \`time_entries_cost_center_idx\` ON \`time_entries\` (\`cost_center_id\`);`)
  await db.run(sql`CREATE INDEX \`time_entries_payroll_run_idx\` ON \`time_entries\` (\`payroll_run_id\`);`)
  await db.run(sql`CREATE INDEX \`time_entries_created_by_idx\` ON \`time_entries\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`time_entries_approved_by_idx\` ON \`time_entries\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`time_entries_updated_at_idx\` ON \`time_entries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`time_entries_created_at_idx\` ON \`time_entries\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`leave_requests\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`tenant_id\` text(36),
  	\`uuid\` text NOT NULL,
  	\`reference\` text NOT NULL,
  	\`employee_id\` text(36) NOT NULL,
  	\`leave_type\` text NOT NULL,
  	\`is_paid\` integer DEFAULT true,
  	\`submitted_date\` text NOT NULL,
  	\`start_date\` text NOT NULL,
  	\`end_date\` text NOT NULL,
  	\`working_days\` numeric NOT NULL,
  	\`working_hours\` numeric,
  	\`partial_day\` text,
  	\`reason\` text,
  	\`medical_certificate_ref\` text,
  	\`balance_impact_entitlement_type\` text,
  	\`balance_impact_before_balance\` numeric,
  	\`balance_impact_after_balance\` numeric,
  	\`balance_impact_carry_over_applied\` numeric,
  	\`approver_id\` text(36),
  	\`replaced_by_employee_id\` text(36),
  	\`is_handover_complete\` integer DEFAULT false,
  	\`cancelled_date\` text,
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`employee_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approver_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`replaced_by_employee_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`leave_requests_tenant_idx\` ON \`leave_requests\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`leave_requests_uuid_idx\` ON \`leave_requests\` (\`uuid\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`leave_requests_reference_idx\` ON \`leave_requests\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`leave_requests_employee_idx\` ON \`leave_requests\` (\`employee_id\`);`)
  await db.run(sql`CREATE INDEX \`leave_requests_approver_idx\` ON \`leave_requests\` (\`approver_id\`);`)
  await db.run(sql`CREATE INDEX \`leave_requests_replaced_by_employee_idx\` ON \`leave_requests\` (\`replaced_by_employee_id\`);`)
  await db.run(sql`CREATE INDEX \`leave_requests_created_by_idx\` ON \`leave_requests\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`leave_requests_approved_by_idx\` ON \`leave_requests\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`leave_requests_updated_at_idx\` ON \`leave_requests\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`leave_requests_created_at_idx\` ON \`leave_requests\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`leave_requests_locales\` (
  	\`rejection_reason\` text,
  	\`cancel_reason\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`leave_requests\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`leave_requests_locales_locale_parent_id_unique\` ON \`leave_requests_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pr_comp_rating\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`competency\` text NOT NULL,
  	\`rating\` numeric NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`performance_reviews\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pr_comp_rating_order_idx\` ON \`pr_comp_rating\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pr_comp_rating_parent_id_idx\` ON \`pr_comp_rating\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pr_comp_rating_locales\` (
  	\`comment\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pr_comp_rating\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pr_comp_rating_locales_locale_parent_id_unique\` ON \`pr_comp_rating_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pr_next_goals\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`goal\` text NOT NULL,
  	\`measurable_outcome\` text,
  	\`target_date\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`performance_reviews\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pr_next_goals_order_idx\` ON \`pr_next_goals\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pr_next_goals_parent_id_idx\` ON \`pr_next_goals\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`performance_reviews\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`employee_id\` text(36) NOT NULL,
  	\`reviewer_id\` text(36) NOT NULL,
  	\`review_type\` text DEFAULT 'annual' NOT NULL,
  	\`review_period\` text NOT NULL,
  	\`review_date\` text NOT NULL,
  	\`period_start_date\` text,
  	\`period_end_date\` text,
  	\`self_assessment_submitted_at\` text,
  	\`self_assessment_achievements\` text,
  	\`self_assessment_challenges\` text,
  	\`self_assessment_development_areas\` text,
  	\`self_assessment_career_goals\` text,
  	\`self_assessment_self_rating\` text,
  	\`manager_review_submitted_at\` text,
  	\`manager_review_strengths\` text,
  	\`manager_review_areas_for_improvement\` text,
  	\`manager_review_goal_achievement\` text,
  	\`manager_review_development_plan\` text,
  	\`overall_rating\` text,
  	\`numeric_score\` numeric,
  	\`outcome_recommends_promotion\` integer DEFAULT false,
  	\`outcome_new_job_position_id\` text(36),
  	\`outcome_recommends_merit_increase\` integer DEFAULT false,
  	\`outcome_currency\` text DEFAULT 'EUR',
  	\`outcome_merit_increase_percent\` numeric,
  	\`outcome_merit_increase_amount\` numeric,
  	\`outcome_recommends_bonus\` integer DEFAULT false,
  	\`outcome_bonus_amount\` numeric,
  	\`outcome_requires_pip\` integer DEFAULT false,
  	\`employee_acknowledged\` integer DEFAULT false,
  	\`employee_acknowledged_at\` text,
  	\`employee_comments\` text,
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`employee_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reviewer_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`outcome_new_job_position_id\`) REFERENCES \`job_positions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`performance_reviews_uuid_idx\` ON \`performance_reviews\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`performance_reviews_tenant_idx\` ON \`performance_reviews\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`performance_reviews_reference_idx\` ON \`performance_reviews\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`performance_reviews_employee_idx\` ON \`performance_reviews\` (\`employee_id\`);`)
  await db.run(sql`CREATE INDEX \`performance_reviews_reviewer_idx\` ON \`performance_reviews\` (\`reviewer_id\`);`)
  await db.run(sql`CREATE INDEX \`performance_reviews_outcome_outcome_new_job_position_idx\` ON \`performance_reviews\` (\`outcome_new_job_position_id\`);`)
  await db.run(sql`CREATE INDEX \`performance_reviews_created_by_idx\` ON \`performance_reviews\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`performance_reviews_approved_by_idx\` ON \`performance_reviews\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`performance_reviews_updated_at_idx\` ON \`performance_reviews\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`performance_reviews_created_at_idx\` ON \`performance_reviews\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`er_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`expense_date\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`merchant\` text,
  	\`currency\` text DEFAULT 'EUR',
  	\`amount\` numeric NOT NULL,
  	\`fx_rate\` numeric,
  	\`reimbursement_amount\` numeric,
  	\`gl_account_id\` text(36),
  	\`tax_code_id\` text(36),
  	\`is_billable_to_customer\` integer DEFAULT false,
  	\`mileage_distance\` numeric,
  	\`mileage_rate\` numeric,
  	\`receipt_attached\` integer DEFAULT false,
  	\`receipt_media_id\` text(36),
  	\`is_policy_compliant\` integer DEFAULT true,
  	\`policy_exception_reason\` text,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tax_code_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`receipt_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`expense_reports\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`er_lines_order_idx\` ON \`er_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`er_lines_parent_id_idx\` ON \`er_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`er_lines_gl_account_idx\` ON \`er_lines\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE INDEX \`er_lines_tax_code_idx\` ON \`er_lines\` (\`tax_code_id\`);`)
  await db.run(sql`CREATE INDEX \`er_lines_receipt_media_idx\` ON \`er_lines\` (\`receipt_media_id\`);`)
  await db.run(sql`CREATE TABLE \`er_lines_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`er_lines\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`er_lines_locales_locale_parent_id_unique\` ON \`er_lines_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`er_approval\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`step\` numeric NOT NULL,
  	\`approver_id\` text(36) NOT NULL,
  	\`role\` text,
  	\`decision\` text DEFAULT 'pending',
  	\`decided_at\` text,
  	FOREIGN KEY (\`approver_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`expense_reports\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`er_approval_order_idx\` ON \`er_approval\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`er_approval_parent_id_idx\` ON \`er_approval\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`er_approval_approver_idx\` ON \`er_approval\` (\`approver_id\`);`)
  await db.run(sql`CREATE TABLE \`er_approval_locales\` (
  	\`comment\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`er_approval\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`er_approval_locales_locale_parent_id_unique\` ON \`er_approval_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`expense_reports\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`report_number\` text NOT NULL,
  	\`employee_id\` text(36) NOT NULL,
  	\`submission_date\` text NOT NULL,
  	\`period_start_date\` text,
  	\`period_end_date\` text,
  	\`project_id\` text(36),
  	\`cost_center_id\` text(36),
  	\`business_purpose\` text NOT NULL,
  	\`reimbursement_currency\` text DEFAULT 'EUR',
  	\`total_amount\` numeric NOT NULL,
  	\`total_reimbursable\` numeric,
  	\`total_non_reimbursable\` numeric DEFAULT 0,
  	\`reimbursement_method\` text DEFAULT 'payroll',
  	\`reimbursement_date\` text,
  	\`reimbursed_via_payroll_run_id\` text(36),
  	\`reimbursed_via_payment_id\` text(36),
  	\`journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`employee_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reimbursed_via_payroll_run_id\`) REFERENCES \`payroll_runs\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reimbursed_via_payment_id\`) REFERENCES \`payments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`expense_reports_uuid_idx\` ON \`expense_reports\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_tenant_idx\` ON \`expense_reports\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`expense_reports_report_number_idx\` ON \`expense_reports\` (\`report_number\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_employee_idx\` ON \`expense_reports\` (\`employee_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_project_idx\` ON \`expense_reports\` (\`project_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_cost_center_idx\` ON \`expense_reports\` (\`cost_center_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_reimbursed_via_payroll_run_idx\` ON \`expense_reports\` (\`reimbursed_via_payroll_run_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_reimbursed_via_payment_idx\` ON \`expense_reports\` (\`reimbursed_via_payment_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_journal_entry_idx\` ON \`expense_reports\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_created_by_idx\` ON \`expense_reports\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_approved_by_idx\` ON \`expense_reports\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_updated_at_idx\` ON \`expense_reports\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_created_at_idx\` ON \`expense_reports\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`rp_intvw\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`round\` text,
  	\`scheduled_date\` text,
  	\`feedback\` text,
  	\`feedback_notes\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`recruiting_pipeline\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`rp_intvw_order_idx\` ON \`rp_intvw\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`rp_intvw_parent_id_idx\` ON \`rp_intvw\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`recruiting_pipeline\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`candidate_name\` text NOT NULL,
  	\`first_name\` text,
  	\`last_name\` text,
  	\`email\` text NOT NULL,
  	\`phone\` text,
  	\`linkedin_url\` text,
  	\`position_id\` text(36) NOT NULL,
  	\`recruiter_id\` text(36),
  	\`hiring_manager_id\` text(36),
  	\`application_date\` text NOT NULL,
  	\`source\` text,
  	\`referrer_id\` text(36),
  	\`stage\` text DEFAULT 'applied' NOT NULL,
  	\`offer_details_currency\` text DEFAULT 'EUR',
  	\`offer_details_base_salary\` numeric,
  	\`offer_details_sign_on_bonus\` numeric,
  	\`offer_details_equity_grant\` text,
  	\`offer_details_target_start_date\` text,
  	\`offer_details_offer_extended_date\` text,
  	\`offer_details_offer_expiry_date\` text,
  	\`rejection_reason\` text,
  	\`consent_record_id\` text(36),
  	\`pii_retention_until\` text,
  	\`created_employee_id\` text(36),
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`position_id\`) REFERENCES \`job_positions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`recruiter_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hiring_manager_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`referrer_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`consent_record_id\`) REFERENCES \`consent_records\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_employee_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`recruiting_pipeline_uuid_idx\` ON \`recruiting_pipeline\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`recruiting_pipeline_tenant_idx\` ON \`recruiting_pipeline\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`recruiting_pipeline_candidate_name_idx\` ON \`recruiting_pipeline\` (\`candidate_name\`);`)
  await db.run(sql`CREATE INDEX \`recruiting_pipeline_email_idx\` ON \`recruiting_pipeline\` (\`email\`);`)
  await db.run(sql`CREATE INDEX \`recruiting_pipeline_position_idx\` ON \`recruiting_pipeline\` (\`position_id\`);`)
  await db.run(sql`CREATE INDEX \`recruiting_pipeline_recruiter_idx\` ON \`recruiting_pipeline\` (\`recruiter_id\`);`)
  await db.run(sql`CREATE INDEX \`recruiting_pipeline_hiring_manager_idx\` ON \`recruiting_pipeline\` (\`hiring_manager_id\`);`)
  await db.run(sql`CREATE INDEX \`recruiting_pipeline_application_date_idx\` ON \`recruiting_pipeline\` (\`application_date\`);`)
  await db.run(sql`CREATE INDEX \`recruiting_pipeline_referrer_idx\` ON \`recruiting_pipeline\` (\`referrer_id\`);`)
  await db.run(sql`CREATE INDEX \`recruiting_pipeline_consent_record_idx\` ON \`recruiting_pipeline\` (\`consent_record_id\`);`)
  await db.run(sql`CREATE INDEX \`recruiting_pipeline_created_employee_idx\` ON \`recruiting_pipeline\` (\`created_employee_id\`);`)
  await db.run(sql`CREATE INDEX \`recruiting_pipeline_created_by_idx\` ON \`recruiting_pipeline\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`recruiting_pipeline_approved_by_idx\` ON \`recruiting_pipeline\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`recruiting_pipeline_updated_at_idx\` ON \`recruiting_pipeline\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`recruiting_pipeline_created_at_idx\` ON \`recruiting_pipeline\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`recruiting_pipeline_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`recruiting_pipeline\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`recruiting_pipeline_rels_order_idx\` ON \`recruiting_pipeline_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`recruiting_pipeline_rels_parent_idx\` ON \`recruiting_pipeline_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`recruiting_pipeline_rels_path_idx\` ON \`recruiting_pipeline_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`recruiting_pipeline_rels_users_id_idx\` ON \`recruiting_pipeline_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`activities\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`activity_type\` text NOT NULL,
  	\`direction\` text,
  	\`activity_date\` text NOT NULL,
  	\`duration_minutes\` numeric,
  	\`assigned_to_id\` text(36) NOT NULL,
  	\`related_to\` text NOT NULL,
  	\`lead_id\` text(36),
  	\`opportunity_id\` text(36),
  	\`customer_id\` text(36),
  	\`vendor_id\` text(36),
  	\`project_id\` text(36),
  	\`outcome\` text,
  	\`next_step\` text,
  	\`next_step_date\` text,
  	\`status\` text DEFAULT 'planned',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`assigned_to_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`lead_id\`) REFERENCES \`leads\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`opportunity_id\`) REFERENCES \`opportunities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`vendor_id\`) REFERENCES \`vendors\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`activities_uuid_idx\` ON \`activities\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`activities_tenant_idx\` ON \`activities\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`activities_activity_date_idx\` ON \`activities\` (\`activity_date\`);`)
  await db.run(sql`CREATE INDEX \`activities_assigned_to_idx\` ON \`activities\` (\`assigned_to_id\`);`)
  await db.run(sql`CREATE INDEX \`activities_lead_idx\` ON \`activities\` (\`lead_id\`);`)
  await db.run(sql`CREATE INDEX \`activities_opportunity_idx\` ON \`activities\` (\`opportunity_id\`);`)
  await db.run(sql`CREATE INDEX \`activities_customer_idx\` ON \`activities\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`activities_vendor_idx\` ON \`activities\` (\`vendor_id\`);`)
  await db.run(sql`CREATE INDEX \`activities_project_idx\` ON \`activities\` (\`project_id\`);`)
  await db.run(sql`CREATE INDEX \`activities_created_by_idx\` ON \`activities\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`activities_approved_by_idx\` ON \`activities\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`activities_updated_at_idx\` ON \`activities\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`activities_created_at_idx\` ON \`activities\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`activities_locales\` (
  	\`subject\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`activities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`activities_locales_locale_parent_id_unique\` ON \`activities_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`project_code\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`customer_id\` text(36) NOT NULL,
  	\`contract_id\` text(36),
  	\`legal_entity_id\` text(36),
  	\`project_manager_id\` text(36),
  	\`project_type\` text DEFAULT 'fixed_price',
  	\`recognition_method\` text DEFAULT 'cost_to_cost',
  	\`currency\` text DEFAULT 'EUR',
  	\`contracted_amount\` numeric,
  	\`budgeted_cost\` numeric,
  	\`budgeted_hours\` numeric,
  	\`budgeted_margin\` numeric,
  	\`actual_cost_to_date\` numeric DEFAULT 0,
  	\`recognised_revenue_to_date\` numeric DEFAULT 0,
  	\`percent_complete\` numeric,
  	\`planned_start_date\` text,
  	\`planned_end_date\` text,
  	\`actual_start_date\` text,
  	\`actual_end_date\` text,
  	\`is_onerous\` integer DEFAULT false,
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`legal_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`project_manager_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_uuid_idx\` ON \`projects\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`projects_tenant_idx\` ON \`projects\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_project_code_idx\` ON \`projects\` (\`project_code\`);`)
  await db.run(sql`CREATE INDEX \`projects_customer_idx\` ON \`projects\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_contract_idx\` ON \`projects\` (\`contract_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_legal_entity_idx\` ON \`projects\` (\`legal_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_project_manager_idx\` ON \`projects\` (\`project_manager_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_created_by_idx\` ON \`projects\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_approved_by_idx\` ON \`projects\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_updated_at_idx\` ON \`projects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`projects_created_at_idx\` ON \`projects\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`projects_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_locales_locale_parent_id_unique\` ON \`projects_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`project_tasks\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`project_id\` text(36) NOT NULL,
  	\`parent_task_id\` text(36),
  	\`task_code\` text NOT NULL,
  	\`assignee_id\` text(36),
  	\`task_type\` text DEFAULT 'work',
  	\`budgeted_hours\` numeric DEFAULT 0,
  	\`actual_hours\` numeric DEFAULT 0,
  	\`budgeted_cost\` numeric DEFAULT 0,
  	\`actual_cost\` numeric DEFAULT 0,
  	\`percent_complete\` numeric DEFAULT 0,
  	\`planned_start_date\` text,
  	\`planned_end_date\` text,
  	\`actual_start_date\` text,
  	\`actual_end_date\` text,
  	\`is_billable\` integer DEFAULT true,
  	\`status\` text DEFAULT 'not_started',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_task_id\`) REFERENCES \`project_tasks\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`assignee_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`project_tasks_uuid_idx\` ON \`project_tasks\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`project_tasks_tenant_idx\` ON \`project_tasks\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`project_tasks_project_idx\` ON \`project_tasks\` (\`project_id\`);`)
  await db.run(sql`CREATE INDEX \`project_tasks_parent_task_idx\` ON \`project_tasks\` (\`parent_task_id\`);`)
  await db.run(sql`CREATE INDEX \`project_tasks_task_code_idx\` ON \`project_tasks\` (\`task_code\`);`)
  await db.run(sql`CREATE INDEX \`project_tasks_assignee_idx\` ON \`project_tasks\` (\`assignee_id\`);`)
  await db.run(sql`CREATE INDEX \`project_tasks_created_by_idx\` ON \`project_tasks\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`project_tasks_approved_by_idx\` ON \`project_tasks\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`project_tasks_updated_at_idx\` ON \`project_tasks\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`project_tasks_created_at_idx\` ON \`project_tasks\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`project_tasks_locales\` (
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`project_tasks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`project_tasks_locales_locale_parent_id_unique\` ON \`project_tasks_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`project_tasks_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`project_tasks_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`project_tasks\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`project_tasks_id\`) REFERENCES \`project_tasks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`project_tasks_rels_order_idx\` ON \`project_tasks_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`project_tasks_rels_parent_idx\` ON \`project_tasks_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`project_tasks_rels_path_idx\` ON \`project_tasks_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`project_tasks_rels_project_tasks_id_idx\` ON \`project_tasks_rels\` (\`project_tasks_id\`);`)
  await db.run(sql`CREATE TABLE \`project_milestones\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`project_id\` text(36) NOT NULL,
  	\`milestone_number\` numeric NOT NULL,
  	\`milestone_type\` text DEFAULT 'billing',
  	\`currency\` text DEFAULT 'EUR',
  	\`amount\` numeric NOT NULL,
  	\`percent_of_contract\` numeric,
  	\`planned_date\` text NOT NULL,
  	\`achieved_date\` text,
  	\`achieved_by_id\` text(36),
  	\`invoice_id\` text(36),
  	\`acceptance_document_ref\` text,
  	\`status\` text DEFAULT 'planned',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`achieved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`project_milestones_uuid_idx\` ON \`project_milestones\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`project_milestones_tenant_idx\` ON \`project_milestones\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`project_milestones_project_idx\` ON \`project_milestones\` (\`project_id\`);`)
  await db.run(sql`CREATE INDEX \`project_milestones_achieved_by_idx\` ON \`project_milestones\` (\`achieved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`project_milestones_invoice_idx\` ON \`project_milestones\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`project_milestones_created_by_idx\` ON \`project_milestones\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`project_milestones_approved_by_idx\` ON \`project_milestones\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`project_milestones_updated_at_idx\` ON \`project_milestones\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`project_milestones_created_at_idx\` ON \`project_milestones\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`project_milestones_locales\` (
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`project_milestones\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`project_milestones_locales_locale_parent_id_unique\` ON \`project_milestones_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`work_orders\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`bom_id\` text(36) NOT NULL,
  	\`finished_good_id\` text(36) NOT NULL,
  	\`planned_quantity\` numeric NOT NULL,
  	\`completed_quantity\` numeric DEFAULT 0,
  	\`scrapped_quantity\` numeric DEFAULT 0,
  	\`release_date\` text NOT NULL,
  	\`due_date\` text,
  	\`completed_at\` text,
  	\`demand_source\` text,
  	\`demand_reference\` text,
  	\`target_warehouse_id\` text(36),
  	\`standard_costs_standard_material_cost\` numeric DEFAULT 0,
  	\`standard_costs_standard_labour_cost\` numeric DEFAULT 0,
  	\`standard_costs_standard_overhead_cost\` numeric DEFAULT 0,
  	\`standard_costs_standard_total_cost\` numeric DEFAULT 0,
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`bom_id\`) REFERENCES \`bills_of_materials\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`finished_good_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`target_warehouse_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`work_orders_uuid_idx\` ON \`work_orders\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_tenant_idx\` ON \`work_orders\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`work_orders_reference_idx\` ON \`work_orders\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_bom_idx\` ON \`work_orders\` (\`bom_id\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_finished_good_idx\` ON \`work_orders\` (\`finished_good_id\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_release_date_idx\` ON \`work_orders\` (\`release_date\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_due_date_idx\` ON \`work_orders\` (\`due_date\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_target_warehouse_idx\` ON \`work_orders\` (\`target_warehouse_id\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_created_by_idx\` ON \`work_orders\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_approved_by_idx\` ON \`work_orders\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_updated_at_idx\` ON \`work_orders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_created_at_idx\` ON \`work_orders\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`wf_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`order\` numeric NOT NULL,
  	\`kind\` text DEFAULT 'approval' NOT NULL,
  	\`assignee_mode\` text,
  	\`assignee_user_id\` text(36),
  	\`assignee_role\` text,
  	\`amount_threshold\` numeric,
  	\`sla_hours\` numeric,
  	\`escalate_to_id\` text(36),
  	\`allow_delegation\` integer DEFAULT true,
  	\`condition\` text,
  	\`service_handler\` text,
  	FOREIGN KEY (\`assignee_user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`escalate_to_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workflow_definitions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`wf_steps_order_idx\` ON \`wf_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`wf_steps_parent_id_idx\` ON \`wf_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`wf_steps_assignee_user_idx\` ON \`wf_steps\` (\`assignee_user_id\`);`)
  await db.run(sql`CREATE INDEX \`wf_steps_escalate_to_idx\` ON \`wf_steps\` (\`escalate_to_id\`);`)
  await db.run(sql`CREATE TABLE \`wf_steps_locales\` (
  	\`name\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`wf_steps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`wf_steps_locales_locale_parent_id_unique\` ON \`wf_steps_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`workflow_definitions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`version\` numeric DEFAULT 1 NOT NULL,
  	\`target_collection\` text NOT NULL,
  	\`trigger_event\` text DEFAULT 'beforeCreate' NOT NULL,
  	\`trigger_condition\` text,
  	\`state_machine\` text,
  	\`is_active\` integer DEFAULT true,
  	\`effective_from\` text,
  	\`effective_to\` text,
  	\`superseded_by_id\` text(36),
  	\`on_timeout_behavior\` text DEFAULT 'escalate',
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`superseded_by_id\`) REFERENCES \`workflow_definitions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`workflow_definitions_uuid_idx\` ON \`workflow_definitions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`workflow_definitions_tenant_idx\` ON \`workflow_definitions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`workflow_definitions_target_collection_idx\` ON \`workflow_definitions\` (\`target_collection\`);`)
  await db.run(sql`CREATE INDEX \`workflow_definitions_is_active_idx\` ON \`workflow_definitions\` (\`is_active\`);`)
  await db.run(sql`CREATE INDEX \`workflow_definitions_superseded_by_idx\` ON \`workflow_definitions\` (\`superseded_by_id\`);`)
  await db.run(sql`CREATE INDEX \`workflow_definitions_created_by_idx\` ON \`workflow_definitions\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`workflow_definitions_approved_by_idx\` ON \`workflow_definitions\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`workflow_definitions_updated_at_idx\` ON \`workflow_definitions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`workflow_definitions_created_at_idx\` ON \`workflow_definitions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`workflow_definitions_locales\` (
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workflow_definitions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`workflow_definitions_name_idx\` ON \`workflow_definitions_locales\` (\`name\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`workflow_definitions_locales_locale_parent_id_unique\` ON \`workflow_definitions_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`wfi_history\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`step_index\` numeric NOT NULL,
  	\`step_name\` text NOT NULL,
  	\`assignee_id\` text(36),
  	\`decision\` text NOT NULL,
  	\`decided_at\` text NOT NULL,
  	\`delegated_to_id\` text(36),
  	\`audit_event_id\` text,
  	FOREIGN KEY (\`assignee_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`delegated_to_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workflow_instances\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`wfi_history_order_idx\` ON \`wfi_history\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`wfi_history_parent_id_idx\` ON \`wfi_history\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`wfi_history_assignee_idx\` ON \`wfi_history\` (\`assignee_id\`);`)
  await db.run(sql`CREATE INDEX \`wfi_history_delegated_to_idx\` ON \`wfi_history\` (\`delegated_to_id\`);`)
  await db.run(sql`CREATE TABLE \`wfi_history_locales\` (
  	\`comment\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`wfi_history\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`wfi_history_locales_locale_parent_id_unique\` ON \`wfi_history_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`workflow_instances\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`instance_id\` text NOT NULL,
  	\`definition_id\` text(36) NOT NULL,
  	\`definition_version\` numeric NOT NULL,
  	\`target_collection\` text NOT NULL,
  	\`target_id\` text NOT NULL,
  	\`submitted_by_id\` text(36) NOT NULL,
  	\`submitted_at\` text NOT NULL,
  	\`current_step\` numeric DEFAULT 0,
  	\`current_assignee_id\` text(36),
  	\`current_assignee_role\` text,
  	\`current_step_due_at\` text,
  	\`final_outcome\` text,
  	\`completed_at\` text,
  	\`error_message\` text,
  	\`status\` text DEFAULT 'pending_start',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`definition_id\`) REFERENCES \`workflow_definitions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`submitted_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`current_assignee_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`workflow_instances_uuid_idx\` ON \`workflow_instances\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`workflow_instances_tenant_idx\` ON \`workflow_instances\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`workflow_instances_instance_id_idx\` ON \`workflow_instances\` (\`instance_id\`);`)
  await db.run(sql`CREATE INDEX \`workflow_instances_definition_idx\` ON \`workflow_instances\` (\`definition_id\`);`)
  await db.run(sql`CREATE INDEX \`workflow_instances_target_collection_idx\` ON \`workflow_instances\` (\`target_collection\`);`)
  await db.run(sql`CREATE INDEX \`workflow_instances_target_id_idx\` ON \`workflow_instances\` (\`target_id\`);`)
  await db.run(sql`CREATE INDEX \`workflow_instances_submitted_by_idx\` ON \`workflow_instances\` (\`submitted_by_id\`);`)
  await db.run(sql`CREATE INDEX \`workflow_instances_current_assignee_idx\` ON \`workflow_instances\` (\`current_assignee_id\`);`)
  await db.run(sql`CREATE INDEX \`workflow_instances_created_by_idx\` ON \`workflow_instances\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`workflow_instances_approved_by_idx\` ON \`workflow_instances\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`workflow_instances_updated_at_idx\` ON \`workflow_instances\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`workflow_instances_created_at_idx\` ON \`workflow_instances\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`ee29d67e947fd80f68f80f3b1111ed7a7\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36) NOT NULL,
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`waste_allowance\` numeric DEFAULT 0,
  	\`is_optional\` integer DEFAULT false,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bills_of_materials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ee29d67e947fd80f68f80f3b1111ed7a7_order_idx\` ON \`ee29d67e947fd80f68f80f3b1111ed7a7\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ee29d67e947fd80f68f80f3b1111ed7a7_parent_id_idx\` ON \`ee29d67e947fd80f68f80f3b1111ed7a7\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ee29d67e947fd80f68f80f3b1111ed7a7_item_idx\` ON \`ee29d67e947fd80f68f80f3b1111ed7a7\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`e2e7264e544c08b9fada634cb598433cb\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`work_center_id\` text(36),
  	\`standard_labour_minutes\` numeric DEFAULT 0,
  	\`standard_machine_minutes\` numeric DEFAULT 0,
  	FOREIGN KEY (\`work_center_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bills_of_materials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e2e7264e544c08b9fada634cb598433cb_order_idx\` ON \`e2e7264e544c08b9fada634cb598433cb\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e2e7264e544c08b9fada634cb598433cb_parent_id_idx\` ON \`e2e7264e544c08b9fada634cb598433cb\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e2e7264e544c08b9fada634cb598433cb_work_center_idx\` ON \`e2e7264e544c08b9fada634cb598433cb\` (\`work_center_id\`);`)
  await db.run(sql`CREATE TABLE \`e2e7264e544c08b9fada634cb598433cb_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e2e7264e544c08b9fada634cb598433cb\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e2e7264e544c08b9fada634cb598433cb_locales_locale_parent_id_u\` ON \`e2e7264e544c08b9fada634cb598433cb_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`bills_of_materials\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`finished_good_id\` text(36) NOT NULL,
  	\`version\` text NOT NULL,
  	\`effective_from\` text NOT NULL,
  	\`effective_to\` text,
  	\`produced_quantity\` numeric DEFAULT 1,
  	\`engineering_change_order\` text,
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`finished_good_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`bills_of_materials_uuid_idx\` ON \`bills_of_materials\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`bills_of_materials_tenant_idx\` ON \`bills_of_materials\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`bills_of_materials_reference_idx\` ON \`bills_of_materials\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`bills_of_materials_finished_good_idx\` ON \`bills_of_materials\` (\`finished_good_id\`);`)
  await db.run(sql`CREATE INDEX \`bills_of_materials_created_by_idx\` ON \`bills_of_materials\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`bills_of_materials_approved_by_idx\` ON \`bills_of_materials\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`bills_of_materials_updated_at_idx\` ON \`bills_of_materials\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`bills_of_materials_created_at_idx\` ON \`bills_of_materials\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`batches\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`reference\` text NOT NULL,
  	\`item_id\` text(36) NOT NULL,
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`remaining_quantity\` numeric DEFAULT 0,
  	\`status\` text DEFAULT 'quarantine',
  	\`manufacture_date\` text,
  	\`expiry_date\` text,
  	\`received_date\` text,
  	\`country_of_origin\` text,
  	\`origin\` text DEFAULT 'produced',
  	\`work_order_id\` text(36),
  	\`goods_receipt_id\` text(36),
  	\`supplier_id\` text(36),
  	\`supplier_batch_ref\` text,
  	\`warehouse_location_id\` text(36),
  	\`quality_inspection_id\` text(36),
  	\`currency\` text DEFAULT 'EUR',
  	\`unit_cost\` numeric DEFAULT 0,
  	\`recall_recalled\` integer DEFAULT false,
  	\`recall_recall_reference\` text,
  	\`recall_recall_date\` text,
  	\`recall_recall_reason\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`work_order_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`goods_receipt_id\`) REFERENCES \`goods_receipts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`supplier_id\`) REFERENCES \`vendors\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`warehouse_location_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`quality_inspection_id\`) REFERENCES \`quality_inspections\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`batches_uuid_idx\` ON \`batches\` (\`uuid\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`batches_reference_idx\` ON \`batches\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`batches_item_idx\` ON \`batches\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`batches_manufacture_date_idx\` ON \`batches\` (\`manufacture_date\`);`)
  await db.run(sql`CREATE INDEX \`batches_expiry_date_idx\` ON \`batches\` (\`expiry_date\`);`)
  await db.run(sql`CREATE INDEX \`batches_country_of_origin_idx\` ON \`batches\` (\`country_of_origin\`);`)
  await db.run(sql`CREATE INDEX \`batches_work_order_idx\` ON \`batches\` (\`work_order_id\`);`)
  await db.run(sql`CREATE INDEX \`batches_goods_receipt_idx\` ON \`batches\` (\`goods_receipt_id\`);`)
  await db.run(sql`CREATE INDEX \`batches_supplier_idx\` ON \`batches\` (\`supplier_id\`);`)
  await db.run(sql`CREATE INDEX \`batches_warehouse_location_idx\` ON \`batches\` (\`warehouse_location_id\`);`)
  await db.run(sql`CREATE INDEX \`batches_quality_inspection_idx\` ON \`batches\` (\`quality_inspection_id\`);`)
  await db.run(sql`CREATE INDEX \`batches_created_by_idx\` ON \`batches\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`batches_approved_by_idx\` ON \`batches\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`batches_updated_at_idx\` ON \`batches\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`batches_created_at_idx\` ON \`batches\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`batches_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`batches_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`batches\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`batches_id\`) REFERENCES \`batches\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`batches_rels_order_idx\` ON \`batches_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`batches_rels_parent_idx\` ON \`batches_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`batches_rels_path_idx\` ON \`batches_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`batches_rels_batches_id_idx\` ON \`batches_rels\` (\`batches_id\`);`)
  await db.run(sql`CREATE TABLE \`work_centers\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`type\` text DEFAULT 'machine' NOT NULL,
  	\`parent_id\` text(36),
  	\`capacity_per_hour\` numeric,
  	\`capacity_unit_of_measure\` text DEFAULT 'pcs',
  	\`parallelism\` numeric DEFAULT 1,
  	\`cost_per_minute\` numeric,
  	\`pay_per_hour\` numeric,
  	\`rate_currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`work_centers_uuid_idx\` ON \`work_centers\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`work_centers_tenant_idx\` ON \`work_centers\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`work_centers_reference_idx\` ON \`work_centers\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`work_centers_parent_idx\` ON \`work_centers\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`work_centers_created_by_idx\` ON \`work_centers\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`work_centers_approved_by_idx\` ON \`work_centers\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`work_centers_updated_at_idx\` ON \`work_centers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`work_centers_created_at_idx\` ON \`work_centers\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`work_shifts\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`worker_id\` text(36) NOT NULL,
  	\`work_center_id\` text(36) NOT NULL,
  	\`work_order_id\` text(36),
  	\`shift_start\` text NOT NULL,
  	\`shift_end\` text,
  	\`run_time_minutes\` numeric DEFAULT 0,
  	\`qty_produced\` numeric DEFAULT 0,
  	\`qty_scrap\` numeric DEFAULT 0,
  	\`rate\` numeric,
  	\`parallelism\` numeric DEFAULT 1,
  	\`wage\` numeric,
  	\`wage_currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'open',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`worker_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`work_center_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`work_order_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`work_shifts_uuid_idx\` ON \`work_shifts\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`work_shifts_tenant_idx\` ON \`work_shifts\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`work_shifts_reference_idx\` ON \`work_shifts\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`work_shifts_worker_idx\` ON \`work_shifts\` (\`worker_id\`);`)
  await db.run(sql`CREATE INDEX \`work_shifts_work_center_idx\` ON \`work_shifts\` (\`work_center_id\`);`)
  await db.run(sql`CREATE INDEX \`work_shifts_work_order_idx\` ON \`work_shifts\` (\`work_order_id\`);`)
  await db.run(sql`CREATE INDEX \`work_shifts_shift_start_idx\` ON \`work_shifts\` (\`shift_start\`);`)
  await db.run(sql`CREATE INDEX \`work_shifts_created_by_idx\` ON \`work_shifts\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`work_shifts_approved_by_idx\` ON \`work_shifts\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`work_shifts_updated_at_idx\` ON \`work_shifts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`work_shifts_created_at_idx\` ON \`work_shifts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`operations\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`default_work_center_id\` text(36),
  	\`parent_id\` text(36),
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`default_work_center_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`operations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`operations_uuid_idx\` ON \`operations\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`operations_tenant_idx\` ON \`operations\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`operations_reference_idx\` ON \`operations\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`operations_default_work_center_idx\` ON \`operations\` (\`default_work_center_id\`);`)
  await db.run(sql`CREATE INDEX \`operations_parent_idx\` ON \`operations\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`operations_created_by_idx\` ON \`operations\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`operations_approved_by_idx\` ON \`operations\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`operations_updated_at_idx\` ON \`operations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`operations_created_at_idx\` ON \`operations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`routings\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`work_order_id\` text(36) NOT NULL,
  	\`operation_id\` text(36) NOT NULL,
  	\`work_center_id\` text(36),
  	\`seq\` numeric DEFAULT 0 NOT NULL,
  	\`setup_time_minutes\` numeric DEFAULT 0,
  	\`run_time_seconds_per_unit\` numeric,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`work_order_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`operation_id\`) REFERENCES \`operations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`work_center_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`routings_uuid_idx\` ON \`routings\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`routings_tenant_idx\` ON \`routings\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`routings_reference_idx\` ON \`routings\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`routings_work_order_idx\` ON \`routings\` (\`work_order_id\`);`)
  await db.run(sql`CREATE INDEX \`routings_operation_idx\` ON \`routings\` (\`operation_id\`);`)
  await db.run(sql`CREATE INDEX \`routings_work_center_idx\` ON \`routings\` (\`work_center_id\`);`)
  await db.run(sql`CREATE INDEX \`routings_seq_idx\` ON \`routings\` (\`seq\`);`)
  await db.run(sql`CREATE INDEX \`routings_created_by_idx\` ON \`routings\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`routings_approved_by_idx\` ON \`routings\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`routings_updated_at_idx\` ON \`routings\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`routings_created_at_idx\` ON \`routings\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e2c337a3fd6218b33858630a71f1fe155\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`attributes\` text,
  	\`qty_ordered\` numeric DEFAULT 0,
  	\`qty_produced\` numeric DEFAULT 0,
  	\`qty_backordered\` numeric DEFAULT 0,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`operation_runs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e2c337a3fd6218b33858630a71f1fe155_order_idx\` ON \`e2c337a3fd6218b33858630a71f1fe155\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e2c337a3fd6218b33858630a71f1fe155_parent_id_idx\` ON \`e2c337a3fd6218b33858630a71f1fe155\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`operation_runs\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`work_order_id\` text(36) NOT NULL,
  	\`routing_id\` text(36),
  	\`operation_id\` text(36),
  	\`work_center_id\` text(36),
  	\`work_shift_id\` text(36),
  	\`qty_ordered\` numeric DEFAULT 0,
  	\`qty_produced\` numeric DEFAULT 0,
  	\`qty_scrap\` numeric DEFAULT 0,
  	\`qty_backordered\` numeric DEFAULT 0,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`started_at\` text,
  	\`completed_at\` text,
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`work_order_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`routing_id\`) REFERENCES \`routings\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`operation_id\`) REFERENCES \`operations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`work_center_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`work_shift_id\`) REFERENCES \`work_shifts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`operation_runs_uuid_idx\` ON \`operation_runs\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`operation_runs_tenant_idx\` ON \`operation_runs\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`operation_runs_reference_idx\` ON \`operation_runs\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`operation_runs_work_order_idx\` ON \`operation_runs\` (\`work_order_id\`);`)
  await db.run(sql`CREATE INDEX \`operation_runs_routing_idx\` ON \`operation_runs\` (\`routing_id\`);`)
  await db.run(sql`CREATE INDEX \`operation_runs_operation_idx\` ON \`operation_runs\` (\`operation_id\`);`)
  await db.run(sql`CREATE INDEX \`operation_runs_work_center_idx\` ON \`operation_runs\` (\`work_center_id\`);`)
  await db.run(sql`CREATE INDEX \`operation_runs_work_shift_idx\` ON \`operation_runs\` (\`work_shift_id\`);`)
  await db.run(sql`CREATE INDEX \`operation_runs_created_by_idx\` ON \`operation_runs\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`operation_runs_approved_by_idx\` ON \`operation_runs\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`operation_runs_updated_at_idx\` ON \`operation_runs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`operation_runs_created_at_idx\` ON \`operation_runs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`production_receipts\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`work_order_id\` text(36) NOT NULL,
  	\`finished_good_id\` text(36) NOT NULL,
  	\`received_quantity\` numeric NOT NULL,
  	\`target_warehouse_id\` text(36) NOT NULL,
  	\`lot_number\` text,
  	\`serial_numbers\` text,
  	\`receipt_date\` text NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`cost_material_cost\` numeric DEFAULT 0,
  	\`cost_labour_cost\` numeric DEFAULT 0,
  	\`cost_overhead_cost\` numeric DEFAULT 0,
  	\`cost_absorbed_cost\` numeric DEFAULT 0,
  	\`cost_unit_cost\` numeric DEFAULT 0,
  	\`inventory_movement_id\` text(36),
  	\`journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`work_order_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`finished_good_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`target_warehouse_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`inventory_movement_id\`) REFERENCES \`inventory_movements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`production_receipts_uuid_idx\` ON \`production_receipts\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`production_receipts_tenant_idx\` ON \`production_receipts\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`production_receipts_reference_idx\` ON \`production_receipts\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`production_receipts_work_order_idx\` ON \`production_receipts\` (\`work_order_id\`);`)
  await db.run(sql`CREATE INDEX \`production_receipts_finished_good_idx\` ON \`production_receipts\` (\`finished_good_id\`);`)
  await db.run(sql`CREATE INDEX \`production_receipts_target_warehouse_idx\` ON \`production_receipts\` (\`target_warehouse_id\`);`)
  await db.run(sql`CREATE INDEX \`production_receipts_receipt_date_idx\` ON \`production_receipts\` (\`receipt_date\`);`)
  await db.run(sql`CREATE INDEX \`production_receipts_inventory_movement_idx\` ON \`production_receipts\` (\`inventory_movement_id\`);`)
  await db.run(sql`CREATE INDEX \`production_receipts_journal_entry_idx\` ON \`production_receipts\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`production_receipts_created_by_idx\` ON \`production_receipts\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`production_receipts_approved_by_idx\` ON \`production_receipts\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`production_receipts_updated_at_idx\` ON \`production_receipts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`production_receipts_created_at_idx\` ON \`production_receipts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`quality_inspections\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`inspection_type\` text NOT NULL,
  	\`item_id\` text(36) NOT NULL,
  	\`inspected_quantity\` numeric NOT NULL,
  	\`sample_size\` numeric,
  	\`failed_quantity\` numeric DEFAULT 0,
  	\`work_order_id\` text(36),
  	\`goods_receipt_id\` text(36),
  	\`shipment_id\` text(36),
  	\`inspection_date\` text NOT NULL,
  	\`inspector_id\` text(36),
  	\`outcome\` text DEFAULT 'pending' NOT NULL,
  	\`failure_reason\` text,
  	\`capa_reference\` text,
  	\`inventory_movement_id\` text(36),
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`work_order_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`goods_receipt_id\`) REFERENCES \`goods_receipts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`shipment_id\`) REFERENCES \`shipments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`inspector_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`inventory_movement_id\`) REFERENCES \`inventory_movements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`quality_inspections_uuid_idx\` ON \`quality_inspections\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`quality_inspections_tenant_idx\` ON \`quality_inspections\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`quality_inspections_reference_idx\` ON \`quality_inspections\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`quality_inspections_item_idx\` ON \`quality_inspections\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`quality_inspections_work_order_idx\` ON \`quality_inspections\` (\`work_order_id\`);`)
  await db.run(sql`CREATE INDEX \`quality_inspections_goods_receipt_idx\` ON \`quality_inspections\` (\`goods_receipt_id\`);`)
  await db.run(sql`CREATE INDEX \`quality_inspections_shipment_idx\` ON \`quality_inspections\` (\`shipment_id\`);`)
  await db.run(sql`CREATE INDEX \`quality_inspections_inspection_date_idx\` ON \`quality_inspections\` (\`inspection_date\`);`)
  await db.run(sql`CREATE INDEX \`quality_inspections_inspector_idx\` ON \`quality_inspections\` (\`inspector_id\`);`)
  await db.run(sql`CREATE INDEX \`quality_inspections_inventory_movement_idx\` ON \`quality_inspections\` (\`inventory_movement_id\`);`)
  await db.run(sql`CREATE INDEX \`quality_inspections_created_by_idx\` ON \`quality_inspections\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`quality_inspections_approved_by_idx\` ON \`quality_inspections\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`quality_inspections_updated_at_idx\` ON \`quality_inspections\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`quality_inspections_created_at_idx\` ON \`quality_inspections\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`wip_snapshots\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`snapshot_ref\` text NOT NULL,
  	\`project_id\` text(36) NOT NULL,
  	\`period_id\` text(36) NOT NULL,
  	\`snapshot_date\` text NOT NULL,
  	\`recognition_method\` text DEFAULT 'cost_to_cost',
  	\`currency\` text DEFAULT 'EUR',
  	\`contracted_amount\` numeric NOT NULL,
  	\`estimated_total_cost\` numeric NOT NULL,
  	\`cost_to_date\` numeric NOT NULL,
  	\`percent_complete\` numeric NOT NULL,
  	\`recognised_revenue\` numeric NOT NULL,
  	\`invoiced_to_date\` numeric NOT NULL,
  	\`unbilled_or_deferred\` numeric,
  	\`estimated_loss_provision\` numeric DEFAULT 0,
  	\`period_end_adjustment_id\` text(36),
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`period_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`period_end_adjustment_id\`) REFERENCES \`period_end_adjustments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`wip_snapshots_uuid_idx\` ON \`wip_snapshots\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`wip_snapshots_tenant_idx\` ON \`wip_snapshots\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`wip_snapshots_snapshot_ref_idx\` ON \`wip_snapshots\` (\`snapshot_ref\`);`)
  await db.run(sql`CREATE INDEX \`wip_snapshots_project_idx\` ON \`wip_snapshots\` (\`project_id\`);`)
  await db.run(sql`CREATE INDEX \`wip_snapshots_period_idx\` ON \`wip_snapshots\` (\`period_id\`);`)
  await db.run(sql`CREATE INDEX \`wip_snapshots_period_end_adjustment_idx\` ON \`wip_snapshots\` (\`period_end_adjustment_id\`);`)
  await db.run(sql`CREATE INDEX \`wip_snapshots_created_by_idx\` ON \`wip_snapshots\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`wip_snapshots_approved_by_idx\` ON \`wip_snapshots\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`wip_snapshots_updated_at_idx\` ON \`wip_snapshots\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`wip_snapshots_created_at_idx\` ON \`wip_snapshots\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tags\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`name\` text NOT NULL,
  	\`taggings_count\` numeric DEFAULT 0,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tags_uuid_idx\` ON \`tags\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`tags_tenant_idx\` ON \`tags\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`tags_name_idx\` ON \`tags\` (\`name\`);`)
  await db.run(sql`CREATE INDEX \`tags_taggings_count_idx\` ON \`tags\` (\`taggings_count\`);`)
  await db.run(sql`CREATE INDEX \`tags_created_by_idx\` ON \`tags\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`tags_approved_by_idx\` ON \`tags\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`tags_updated_at_idx\` ON \`tags\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tags_created_at_idx\` ON \`tags\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`taggings\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`tag_id\` text(36) NOT NULL,
  	\`context\` text DEFAULT 'tags' NOT NULL,
  	\`tagger_id\` text(36),
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`taggable\` text NOT NULL,
  	\`taggable_type\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tag_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tagger_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`taggings_uuid_idx\` ON \`taggings\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`taggings_tenant_idx\` ON \`taggings\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`taggings_tag_idx\` ON \`taggings\` (\`tag_id\`);`)
  await db.run(sql`CREATE INDEX \`taggings_context_idx\` ON \`taggings\` (\`context\`);`)
  await db.run(sql`CREATE INDEX \`taggings_tagger_idx\` ON \`taggings\` (\`tagger_id\`);`)
  await db.run(sql`CREATE INDEX \`taggings_created_by_idx\` ON \`taggings\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`taggings_approved_by_idx\` ON \`taggings\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`taggings_taggable_idx\` ON \`taggings\` (\`taggable\`);`)
  await db.run(sql`CREATE INDEX \`taggings_taggable_type_idx\` ON \`taggings\` (\`taggable_type\`);`)
  await db.run(sql`CREATE INDEX \`taggings_updated_at_idx\` ON \`taggings\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`taggings_created_at_idx\` ON \`taggings\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`properties\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`code\` text NOT NULL,
  	\`kind\` text DEFAULT 'office' NOT NULL,
  	\`tenure\` text DEFAULT 'owned' NOT NULL,
  	\`address_id\` text(36) NOT NULL,
  	\`country\` text NOT NULL,
  	\`region\` text,
  	\`measurements_gross_internal_area\` numeric,
  	\`measurements_net_internal_area\` numeric,
  	\`measurements_site_area\` numeric,
  	\`measurements_number_of_floors\` numeric,
  	\`measurements_number_of_units\` numeric,
  	\`occupancy_designed_capacity\` numeric,
  	\`occupancy_current_headcount\` numeric,
  	\`occupancy_nace_code\` text,
  	\`lifecycle_acquired_at\` text,
  	\`lifecycle_commissioned_at\` text,
  	\`lifecycle_planned_disposal_at\` text,
  	\`lifecycle_disposed_at\` text,
  	\`currency\` text DEFAULT 'EUR',
  	\`book_value\` numeric,
  	\`fixed_asset_id\` text(36),
  	\`lease_id\` text(36),
  	\`energy_certificate_epc_rating\` text,
  	\`energy_certificate_epc_expires_at\` text,
  	\`energy_certificate_kwh_per_sqm_year\` numeric,
  	\`bim_reference\` text,
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fixed_asset_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`lease_id\`) REFERENCES \`leases\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`properties_uuid_idx\` ON \`properties\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`properties_tenant_idx\` ON \`properties\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`properties_code_idx\` ON \`properties\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`properties_address_idx\` ON \`properties\` (\`address_id\`);`)
  await db.run(sql`CREATE INDEX \`properties_fixed_asset_idx\` ON \`properties\` (\`fixed_asset_id\`);`)
  await db.run(sql`CREATE INDEX \`properties_lease_idx\` ON \`properties\` (\`lease_id\`);`)
  await db.run(sql`CREATE INDEX \`properties_created_by_idx\` ON \`properties\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`properties_approved_by_idx\` ON \`properties\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`properties_updated_at_idx\` ON \`properties\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`properties_created_at_idx\` ON \`properties\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`properties_locales\` (
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`properties\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`properties_locales_locale_parent_id_unique\` ON \`properties_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e8210b2bdad518d079d5f7f311f47e82e\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`spaces\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e8210b2bdad518d079d5f7f311f47e82e_order_idx\` ON \`e8210b2bdad518d079d5f7f311f47e82e\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e8210b2bdad518d079d5f7f311f47e82e_parent_id_idx\` ON \`e8210b2bdad518d079d5f7f311f47e82e\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`spaces\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`code\` text NOT NULL,
  	\`property_id\` text(36) NOT NULL,
  	\`parent_space_id\` text(36),
  	\`kind\` text DEFAULT 'room' NOT NULL,
  	\`usage_category\` text DEFAULT 'office',
  	\`floor\` text,
  	\`area\` numeric,
  	\`capacity\` numeric,
  	\`current_occupancy\` numeric,
  	\`is_bookable\` integer DEFAULT false,
  	\`safety_fire_zone\` text,
  	\`safety_max_occupancy\` numeric,
  	\`safety_is_accessible\` integer DEFAULT false,
  	\`bim_element_id\` text,
  	\`gl_account_id\` text(36),
  	\`cost_center_id\` text(36),
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`property_id\`) REFERENCES \`properties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_space_id\`) REFERENCES \`spaces\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`spaces_uuid_idx\` ON \`spaces\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`spaces_tenant_idx\` ON \`spaces\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`spaces_code_idx\` ON \`spaces\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`spaces_property_idx\` ON \`spaces\` (\`property_id\`);`)
  await db.run(sql`CREATE INDEX \`spaces_parent_space_idx\` ON \`spaces\` (\`parent_space_id\`);`)
  await db.run(sql`CREATE INDEX \`spaces_gl_account_idx\` ON \`spaces\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE INDEX \`spaces_cost_center_idx\` ON \`spaces\` (\`cost_center_id\`);`)
  await db.run(sql`CREATE INDEX \`spaces_created_by_idx\` ON \`spaces\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`spaces_approved_by_idx\` ON \`spaces\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`spaces_updated_at_idx\` ON \`spaces\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`spaces_created_at_idx\` ON \`spaces\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`spaces_locales\` (
  	\`name\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`spaces\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`spaces_locales_locale_parent_id_unique\` ON \`spaces_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ee3241873f3c38beca1cf0af901e38fb9\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`maintenance_requests\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ee3241873f3c38beca1cf0af901e38fb9_order_idx\` ON \`ee3241873f3c38beca1cf0af901e38fb9\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ee3241873f3c38beca1cf0af901e38fb9_parent_id_idx\` ON \`ee3241873f3c38beca1cf0af901e38fb9\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ee3241873f3c38beca1cf0af901e38fb9_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ee3241873f3c38beca1cf0af901e38fb9\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`ee3241873f3c38beca1cf0af901e38fb9_locales_locale_parent_id_u\` ON \`ee3241873f3c38beca1cf0af901e38fb9_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`maintenance_requests\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`subject\` text NOT NULL,
  	\`request_type\` text DEFAULT 'corrective' NOT NULL,
  	\`priority\` text DEFAULT 'p3' NOT NULL,
  	\`property_id\` text(36),
  	\`space_id\` text(36),
  	\`fixed_asset_id\` text(36),
  	\`bookable_resource_id\` text(36),
  	\`reported_by_id\` text(36),
  	\`reported_by_name\` text,
  	\`reported_by_email\` text,
  	\`reported_at\` text NOT NULL,
  	\`target_resolution_at\` text,
  	\`work_order_id\` text(36),
  	\`triaged_by_id\` text(36),
  	\`triaged_at\` text,
  	\`closed_at\` text,
  	\`closure_note\` text,
  	\`status\` text DEFAULT 'new',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`property_id\`) REFERENCES \`properties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`space_id\`) REFERENCES \`spaces\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fixed_asset_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`bookable_resource_id\`) REFERENCES \`bookable_resources\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reported_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`work_order_id\`) REFERENCES \`maintenance_work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`triaged_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`maintenance_requests_uuid_idx\` ON \`maintenance_requests\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_requests_tenant_idx\` ON \`maintenance_requests\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`maintenance_requests_reference_idx\` ON \`maintenance_requests\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_requests_property_idx\` ON \`maintenance_requests\` (\`property_id\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_requests_space_idx\` ON \`maintenance_requests\` (\`space_id\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_requests_fixed_asset_idx\` ON \`maintenance_requests\` (\`fixed_asset_id\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_requests_bookable_resource_idx\` ON \`maintenance_requests\` (\`bookable_resource_id\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_requests_reported_by_idx\` ON \`maintenance_requests\` (\`reported_by_id\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_requests_reported_at_idx\` ON \`maintenance_requests\` (\`reported_at\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_requests_work_order_idx\` ON \`maintenance_requests\` (\`work_order_id\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_requests_triaged_by_idx\` ON \`maintenance_requests\` (\`triaged_by_id\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_requests_created_by_idx\` ON \`maintenance_requests\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_requests_approved_by_idx\` ON \`maintenance_requests\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_requests_updated_at_idx\` ON \`maintenance_requests\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_requests_created_at_idx\` ON \`maintenance_requests\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`maintenance_requests_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`maintenance_requests\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`maintenance_requests_locales_locale_parent_id_unique\` ON \`maintenance_requests_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`mwo_parts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_sku\` text NOT NULL,
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`unit_cost\` numeric DEFAULT 0,
  	\`line_cost\` numeric DEFAULT 0,
  	\`inventory_movement_id\` text(36),
  	FOREIGN KEY (\`inventory_movement_id\`) REFERENCES \`inventory_movements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`maintenance_work_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`mwo_parts_order_idx\` ON \`mwo_parts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`mwo_parts_parent_id_idx\` ON \`mwo_parts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`mwo_parts_inventory_movement_idx\` ON \`mwo_parts\` (\`inventory_movement_id\`);`)
  await db.run(sql`CREATE TABLE \`mwo_parts_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`mwo_parts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`mwo_parts_locales_locale_parent_id_unique\` ON \`mwo_parts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`mwo_labour\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`employee_id\` text(36),
  	\`hours\` numeric NOT NULL,
  	\`hourly_cost\` numeric DEFAULT 0,
  	\`line_cost\` numeric DEFAULT 0,
  	\`time_entry_id\` text(36),
  	FOREIGN KEY (\`employee_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`time_entry_id\`) REFERENCES \`time_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`maintenance_work_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`mwo_labour_order_idx\` ON \`mwo_labour\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`mwo_labour_parent_id_idx\` ON \`mwo_labour\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`mwo_labour_employee_idx\` ON \`mwo_labour\` (\`employee_id\`);`)
  await db.run(sql`CREATE INDEX \`mwo_labour_time_entry_idx\` ON \`mwo_labour\` (\`time_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`maintenance_work_orders\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`request_id\` text(36),
  	\`work_type\` text DEFAULT 'corrective' NOT NULL,
  	\`priority\` text DEFAULT 'p3' NOT NULL,
  	\`capitalisation_treatment\` text DEFAULT 'expense' NOT NULL,
  	\`property_id\` text(36),
  	\`space_id\` text(36),
  	\`fixed_asset_id\` text(36),
  	\`bookable_resource_id\` text(36),
  	\`assigned_to_id\` text(36),
  	\`vendor_id\` text(36),
  	\`scheduled_start_at\` text,
  	\`scheduled_end_at\` text,
  	\`actual_start_at\` text,
  	\`actual_end_at\` text,
  	\`parts_cost\` numeric DEFAULT 0,
  	\`labour_cost\` numeric DEFAULT 0,
  	\`external_cost\` numeric DEFAULT 0,
  	\`total_cost\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`safety_requires_permit_to_work\` integer DEFAULT false,
  	\`safety_permit_reference\` text,
  	\`safety_requires_l_o_t_o\` integer DEFAULT false,
  	\`safety_is_hot_work\` integer DEFAULT false,
  	\`failure_code\` text,
  	\`root_cause\` text,
  	\`quality_inspection_id\` text(36),
  	\`journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'planned',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`request_id\`) REFERENCES \`maintenance_requests\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`property_id\`) REFERENCES \`properties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`space_id\`) REFERENCES \`spaces\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fixed_asset_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`bookable_resource_id\`) REFERENCES \`bookable_resources\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`assigned_to_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`vendor_id\`) REFERENCES \`vendors\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`quality_inspection_id\`) REFERENCES \`quality_inspections\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`maintenance_work_orders_uuid_idx\` ON \`maintenance_work_orders\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_work_orders_tenant_idx\` ON \`maintenance_work_orders\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`maintenance_work_orders_reference_idx\` ON \`maintenance_work_orders\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_work_orders_request_idx\` ON \`maintenance_work_orders\` (\`request_id\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_work_orders_property_idx\` ON \`maintenance_work_orders\` (\`property_id\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_work_orders_space_idx\` ON \`maintenance_work_orders\` (\`space_id\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_work_orders_fixed_asset_idx\` ON \`maintenance_work_orders\` (\`fixed_asset_id\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_work_orders_bookable_resource_idx\` ON \`maintenance_work_orders\` (\`bookable_resource_id\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_work_orders_assigned_to_idx\` ON \`maintenance_work_orders\` (\`assigned_to_id\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_work_orders_vendor_idx\` ON \`maintenance_work_orders\` (\`vendor_id\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_work_orders_quality_inspection_idx\` ON \`maintenance_work_orders\` (\`quality_inspection_id\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_work_orders_journal_entry_idx\` ON \`maintenance_work_orders\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_work_orders_created_by_idx\` ON \`maintenance_work_orders\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_work_orders_approved_by_idx\` ON \`maintenance_work_orders\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_work_orders_updated_at_idx\` ON \`maintenance_work_orders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_work_orders_created_at_idx\` ON \`maintenance_work_orders\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`maintenance_work_orders_locales\` (
  	\`subject\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`maintenance_work_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`maintenance_work_orders_locales_locale_parent_id_unique\` ON \`maintenance_work_orders_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e3c6dbd1f63738f9a85006b63c3c94908\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tier_name\` text NOT NULL,
  	\`rate\` numeric NOT NULL,
  	\`effective_from\` text,
  	\`effective_to\` text,
  	\`min_stay_days\` numeric,
  	\`is_active\` integer DEFAULT true,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bookable_resources\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e3c6dbd1f63738f9a85006b63c3c94908_order_idx\` ON \`e3c6dbd1f63738f9a85006b63c3c94908\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e3c6dbd1f63738f9a85006b63c3c94908_parent_id_idx\` ON \`e3c6dbd1f63738f9a85006b63c3c94908\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e67933bc56ed48ddc92a51e05dd2e16ec\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bookable_resources\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e67933bc56ed48ddc92a51e05dd2e16ec_order_idx\` ON \`e67933bc56ed48ddc92a51e05dd2e16ec\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e67933bc56ed48ddc92a51e05dd2e16ec_parent_id_idx\` ON \`e67933bc56ed48ddc92a51e05dd2e16ec\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`bookable_resources\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`code\` text NOT NULL,
  	\`kind\` text DEFAULT 'meeting_room' NOT NULL,
  	\`category\` text,
  	\`space_id\` text(36),
  	\`fixed_asset_id\` text(36),
  	\`capacity\` numeric DEFAULT 1,
  	\`unit_of_capacity\` text DEFAULT 'persons',
  	\`rate_basis\` text DEFAULT 'per_night',
  	\`currency\` text DEFAULT 'EUR',
  	\`base_rate\` numeric DEFAULT 0,
  	\`availability_min_booking_minutes\` numeric DEFAULT 60,
  	\`availability_max_booking_days\` numeric DEFAULT 365,
  	\`availability_notice_minutes\` numeric DEFAULT 0,
  	\`availability_buffer_before_minutes\` numeric DEFAULT 0,
  	\`availability_buffer_after_minutes\` numeric DEFAULT 0,
  	\`gl_account_id\` text(36),
  	\`tax_code_id\` text(36),
  	\`country\` text,
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`space_id\`) REFERENCES \`spaces\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fixed_asset_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tax_code_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`bookable_resources_uuid_idx\` ON \`bookable_resources\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`bookable_resources_tenant_idx\` ON \`bookable_resources\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`bookable_resources_code_idx\` ON \`bookable_resources\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`bookable_resources_space_idx\` ON \`bookable_resources\` (\`space_id\`);`)
  await db.run(sql`CREATE INDEX \`bookable_resources_fixed_asset_idx\` ON \`bookable_resources\` (\`fixed_asset_id\`);`)
  await db.run(sql`CREATE INDEX \`bookable_resources_gl_account_idx\` ON \`bookable_resources\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE INDEX \`bookable_resources_tax_code_idx\` ON \`bookable_resources\` (\`tax_code_id\`);`)
  await db.run(sql`CREATE INDEX \`bookable_resources_created_by_idx\` ON \`bookable_resources\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`bookable_resources_approved_by_idx\` ON \`bookable_resources\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`bookable_resources_updated_at_idx\` ON \`bookable_resources\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`bookable_resources_created_at_idx\` ON \`bookable_resources\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`bookable_resources_locales\` (
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bookable_resources\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`bookable_resources_locales_locale_parent_id_unique\` ON \`bookable_resources_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`bookings\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`resource_id\` text(36) NOT NULL,
  	\`guest_type\` text DEFAULT 'customer' NOT NULL,
  	\`customer_id\` text(36),
  	\`employee_id\` text(36),
  	\`address_id\` text(36),
  	\`guest_name\` text,
  	\`guest_email\` text,
  	\`party_size\` numeric DEFAULT 1,
  	\`start_at\` text NOT NULL,
  	\`end_at\` text NOT NULL,
  	\`rrule\` text,
  	\`channel\` text DEFAULT 'direct',
  	\`channel_reference\` text,
  	\`rate_applied\` numeric DEFAULT 0,
  	\`units_billed\` numeric DEFAULT 1,
  	\`subtotal_amount\` numeric DEFAULT 0,
  	\`tax_amount\` numeric DEFAULT 0,
  	\`total_amount\` numeric DEFAULT 0,
  	\`deposit_amount\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`cancellation_policy\` text DEFAULT 'flex',
  	\`invoice_id\` text(36),
  	\`journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'requested',
  	\`confirmed_at\` text,
  	\`checked_in_at\` text,
  	\`checked_out_at\` text,
  	\`cancelled_at\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`resource_id\`) REFERENCES \`bookable_resources\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`employee_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`bookings_uuid_idx\` ON \`bookings\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`bookings_tenant_idx\` ON \`bookings\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`bookings_reference_idx\` ON \`bookings\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`bookings_resource_idx\` ON \`bookings\` (\`resource_id\`);`)
  await db.run(sql`CREATE INDEX \`bookings_customer_idx\` ON \`bookings\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`bookings_employee_idx\` ON \`bookings\` (\`employee_id\`);`)
  await db.run(sql`CREATE INDEX \`bookings_address_idx\` ON \`bookings\` (\`address_id\`);`)
  await db.run(sql`CREATE INDEX \`bookings_start_at_idx\` ON \`bookings\` (\`start_at\`);`)
  await db.run(sql`CREATE INDEX \`bookings_end_at_idx\` ON \`bookings\` (\`end_at\`);`)
  await db.run(sql`CREATE INDEX \`bookings_channel_reference_idx\` ON \`bookings\` (\`channel_reference\`);`)
  await db.run(sql`CREATE INDEX \`bookings_invoice_idx\` ON \`bookings\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`bookings_journal_entry_idx\` ON \`bookings\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`bookings_created_by_idx\` ON \`bookings\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`bookings_approved_by_idx\` ON \`bookings\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`bookings_updated_at_idx\` ON \`bookings\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`bookings_created_at_idx\` ON \`bookings\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`bookings_locales\` (
  	\`cancel_reason\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bookings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`bookings_locales_locale_parent_id_unique\` ON \`bookings_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e294e318ae4b38416b0854e7571907375\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`incoterm\` text,
  	\`transit_days\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`carriers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e294e318ae4b38416b0854e7571907375_order_idx\` ON \`e294e318ae4b38416b0854e7571907375\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e294e318ae4b38416b0854e7571907375_parent_id_idx\` ON \`e294e318ae4b38416b0854e7571907375\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e294e318ae4b38416b0854e7571907375_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e294e318ae4b38416b0854e7571907375\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e294e318ae4b38416b0854e7571907375_locales_locale_parent_id_u\` ON \`e294e318ae4b38416b0854e7571907375_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`carriers\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`code\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`scope\` text DEFAULT 'international' NOT NULL,
  	\`account_number\` text,
  	\`api_base_url\` text,
  	\`api_credentials_id\` text,
  	\`supports_hazmat\` integer DEFAULT false,
  	\`effective_from\` text,
  	\`effective_to\` text,
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`carriers_uuid_idx\` ON \`carriers\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`carriers_tenant_idx\` ON \`carriers\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`carriers_code_idx\` ON \`carriers\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`carriers_created_by_idx\` ON \`carriers\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`carriers_approved_by_idx\` ON \`carriers\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`carriers_updated_at_idx\` ON \`carriers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`carriers_created_at_idx\` ON \`carriers\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tracking_events\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`shipment_id\` text(36) NOT NULL,
  	\`carrier_id\` text(36),
  	\`tracking_number\` text,
  	\`event_code\` text NOT NULL,
  	\`event_time\` text NOT NULL,
  	\`location\` text,
  	\`location_country\` text,
  	\`description\` text,
  	\`signed_by\` text,
  	\`source_payload\` text,
  	\`event_source\` text DEFAULT 'webhook',
  	\`triggered_revenue_recognition\` integer DEFAULT false,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`shipment_id\`) REFERENCES \`shipments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`carrier_id\`) REFERENCES \`carriers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tracking_events_uuid_idx\` ON \`tracking_events\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`tracking_events_tenant_idx\` ON \`tracking_events\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`tracking_events_shipment_idx\` ON \`tracking_events\` (\`shipment_id\`);`)
  await db.run(sql`CREATE INDEX \`tracking_events_carrier_idx\` ON \`tracking_events\` (\`carrier_id\`);`)
  await db.run(sql`CREATE INDEX \`tracking_events_tracking_number_idx\` ON \`tracking_events\` (\`tracking_number\`);`)
  await db.run(sql`CREATE INDEX \`tracking_events_event_time_idx\` ON \`tracking_events\` (\`event_time\`);`)
  await db.run(sql`CREATE INDEX \`tracking_events_created_by_idx\` ON \`tracking_events\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`tracking_events_approved_by_idx\` ON \`tracking_events\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`tracking_events_updated_at_idx\` ON \`tracking_events\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tracking_events_created_at_idx\` ON \`tracking_events\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`ebcc4e7fa5c5b870285d8619d67acbe3e\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`description\` text NOT NULL,
  	\`hs_code\` text NOT NULL,
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`net_weight\` numeric,
  	\`gross_weight\` numeric,
  	\`declared_value\` numeric NOT NULL,
  	\`preferential_origin\` integer DEFAULT false,
  	\`tariff_preference_code\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`customs_declarations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ebcc4e7fa5c5b870285d8619d67acbe3e_order_idx\` ON \`ebcc4e7fa5c5b870285d8619d67acbe3e\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ebcc4e7fa5c5b870285d8619d67acbe3e_parent_id_idx\` ON \`ebcc4e7fa5c5b870285d8619d67acbe3e\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ebcc4e7fa5c5b870285d8619d67acbe3e_item_idx\` ON \`ebcc4e7fa5c5b870285d8619d67acbe3e\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`customs_declarations\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`mrn\` text,
  	\`declaration_type\` text NOT NULL,
  	\`shipment_id\` text(36) NOT NULL,
  	\`declaration_date\` text NOT NULL,
  	\`country_of_dispatch\` text,
  	\`country_of_destination\` text NOT NULL,
  	\`country_of_origin\` text,
  	\`currency\` text DEFAULT 'EUR',
  	\`total_value\` numeric NOT NULL,
  	\`total_duty\` numeric DEFAULT 0,
  	\`total_import_vat\` numeric DEFAULT 0,
  	\`incoterm\` text,
  	\`submitted_at\` text,
  	\`accepted_at\` text,
  	\`released_at\` text,
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`shipment_id\`) REFERENCES \`shipments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`customs_declarations_uuid_idx\` ON \`customs_declarations\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`customs_declarations_tenant_idx\` ON \`customs_declarations\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`customs_declarations_mrn_idx\` ON \`customs_declarations\` (\`mrn\`);`)
  await db.run(sql`CREATE INDEX \`customs_declarations_shipment_idx\` ON \`customs_declarations\` (\`shipment_id\`);`)
  await db.run(sql`CREATE INDEX \`customs_declarations_declaration_date_idx\` ON \`customs_declarations\` (\`declaration_date\`);`)
  await db.run(sql`CREATE INDEX \`customs_declarations_created_by_idx\` ON \`customs_declarations\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`customs_declarations_approved_by_idx\` ON \`customs_declarations\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`customs_declarations_updated_at_idx\` ON \`customs_declarations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`customs_declarations_created_at_idx\` ON \`customs_declarations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`consignment_arrangements\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`consignee_id\` text(36) NOT NULL,
  	\`consignee_name\` text,
  	\`consignee_warehouse_location_id\` text(36),
  	\`effective_from\` text NOT NULL,
  	\`effective_to\` text,
  	\`control_transfer_trigger\` text DEFAULT 'consignee_sale' NOT NULL,
  	\`time_out_days\` numeric,
  	\`return_rights\` text DEFAULT 'unrestricted' NOT NULL,
  	\`return_window_days\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`max_value\` numeric,
  	\`commission_rate_percent\` numeric,
  	\`incoterm\` text,
  	\`contract_id\` text(36),
  	\`evidence_attestation_id\` text(36),
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`consignee_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`consignee_warehouse_location_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`evidence_attestation_id\`) REFERENCES \`evidence_attestations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`consignment_arrangements_uuid_idx\` ON \`consignment_arrangements\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`consignment_arrangements_tenant_idx\` ON \`consignment_arrangements\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`consignment_arrangements_reference_idx\` ON \`consignment_arrangements\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`consignment_arrangements_consignee_idx\` ON \`consignment_arrangements\` (\`consignee_id\`);`)
  await db.run(sql`CREATE INDEX \`consignment_arrangements_consignee_warehouse_location_idx\` ON \`consignment_arrangements\` (\`consignee_warehouse_location_id\`);`)
  await db.run(sql`CREATE INDEX \`consignment_arrangements_effective_from_idx\` ON \`consignment_arrangements\` (\`effective_from\`);`)
  await db.run(sql`CREATE INDEX \`consignment_arrangements_contract_idx\` ON \`consignment_arrangements\` (\`contract_id\`);`)
  await db.run(sql`CREATE INDEX \`consignment_arrangements_evidence_attestation_idx\` ON \`consignment_arrangements\` (\`evidence_attestation_id\`);`)
  await db.run(sql`CREATE INDEX \`consignment_arrangements_created_by_idx\` ON \`consignment_arrangements\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`consignment_arrangements_approved_by_idx\` ON \`consignment_arrangements\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`consignment_arrangements_updated_at_idx\` ON \`consignment_arrangements\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`consignment_arrangements_created_at_idx\` ON \`consignment_arrangements\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`consignment_inventory\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`line_id\` text NOT NULL,
  	\`arrangement_id\` text(36) NOT NULL,
  	\`consignee_warehouse_location_id\` text(36),
  	\`item_sku\` text NOT NULL,
  	\`item_description\` text,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`quantity_on_hand\` numeric DEFAULT 0 NOT NULL,
  	\`unit_cost\` numeric DEFAULT 0,
  	\`value_on_hand\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`as_of_date\` text NOT NULL,
  	\`last_shipment_date\` text,
  	\`last_sale_date\` text,
  	\`valuation_method\` text DEFAULT 'fifo',
  	\`gl_account_id\` text(36),
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`arrangement_id\`) REFERENCES \`consignment_arrangements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`consignee_warehouse_location_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`consignment_inventory_uuid_idx\` ON \`consignment_inventory\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`consignment_inventory_tenant_idx\` ON \`consignment_inventory\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`consignment_inventory_line_id_idx\` ON \`consignment_inventory\` (\`line_id\`);`)
  await db.run(sql`CREATE INDEX \`consignment_inventory_arrangement_idx\` ON \`consignment_inventory\` (\`arrangement_id\`);`)
  await db.run(sql`CREATE INDEX \`consignment_inventory_consignee_warehouse_location_idx\` ON \`consignment_inventory\` (\`consignee_warehouse_location_id\`);`)
  await db.run(sql`CREATE INDEX \`consignment_inventory_item_sku_idx\` ON \`consignment_inventory\` (\`item_sku\`);`)
  await db.run(sql`CREATE INDEX \`consignment_inventory_as_of_date_idx\` ON \`consignment_inventory\` (\`as_of_date\`);`)
  await db.run(sql`CREATE INDEX \`consignment_inventory_gl_account_idx\` ON \`consignment_inventory\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE INDEX \`consignment_inventory_created_by_idx\` ON \`consignment_inventory\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`consignment_inventory_approved_by_idx\` ON \`consignment_inventory\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`consignment_inventory_updated_at_idx\` ON \`consignment_inventory\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`consignment_inventory_created_at_idx\` ON \`consignment_inventory\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`consignment_sales\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`arrangement_id\` text(36) NOT NULL,
  	\`consignment_inventory_id\` text(36) NOT NULL,
  	\`sale_date\` text NOT NULL,
  	\`reported_date\` text,
  	\`end_customer_ref\` text,
  	\`quantity_sold\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`unit_price\` numeric NOT NULL,
  	\`gross_amount\` numeric NOT NULL,
  	\`commission_rate_percent\` numeric DEFAULT 0,
  	\`commission_amount\` numeric DEFAULT 0,
  	\`net_amount\` numeric DEFAULT 0,
  	\`cogs_amount\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`invoice_id\` text(36),
  	\`journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'reported',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`arrangement_id\`) REFERENCES \`consignment_arrangements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`consignment_inventory_id\`) REFERENCES \`consignment_inventory\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`consignment_sales_uuid_idx\` ON \`consignment_sales\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`consignment_sales_tenant_idx\` ON \`consignment_sales\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`consignment_sales_reference_idx\` ON \`consignment_sales\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`consignment_sales_arrangement_idx\` ON \`consignment_sales\` (\`arrangement_id\`);`)
  await db.run(sql`CREATE INDEX \`consignment_sales_consignment_inventory_idx\` ON \`consignment_sales\` (\`consignment_inventory_id\`);`)
  await db.run(sql`CREATE INDEX \`consignment_sales_sale_date_idx\` ON \`consignment_sales\` (\`sale_date\`);`)
  await db.run(sql`CREATE INDEX \`consignment_sales_invoice_idx\` ON \`consignment_sales\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`consignment_sales_journal_entry_idx\` ON \`consignment_sales\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`consignment_sales_created_by_idx\` ON \`consignment_sales\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`consignment_sales_approved_by_idx\` ON \`consignment_sales\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`consignment_sales_updated_at_idx\` ON \`consignment_sales\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`consignment_sales_created_at_idx\` ON \`consignment_sales\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e074d1a41a9e282648fbfbec1c6fb43ea\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`previous_value\` text,
  	\`next_value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e074d1a41a9e282648fbfbec1c6fb43ea_order_idx\` ON \`e074d1a41a9e282648fbfbec1c6fb43ea\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e074d1a41a9e282648fbfbec1c6fb43ea_parent_id_idx\` ON \`e074d1a41a9e282648fbfbec1c6fb43ea\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`audit_events\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`event_id\` text NOT NULL,
  	\`timestamp\` text NOT NULL,
  	\`event_type\` text NOT NULL,
  	\`source\` text,
  	\`collection_slug\` text NOT NULL,
  	\`operation\` text NOT NULL,
  	\`document_id\` text NOT NULL,
  	\`user_id\` text(36),
  	\`previous_status\` text,
  	\`next_status\` text,
  	\`change_summary\` text,
  	\`sources\` text,
  	\`request_id\` text,
  	\`severity\` text DEFAULT 'info',
  	\`previous_hash\` text,
  	\`row_hash\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`audit_events_uuid_idx\` ON \`audit_events\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`audit_events_tenant_idx\` ON \`audit_events\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`audit_events_event_id_idx\` ON \`audit_events\` (\`event_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_events_timestamp_idx\` ON \`audit_events\` (\`timestamp\`);`)
  await db.run(sql`CREATE INDEX \`audit_events_event_type_idx\` ON \`audit_events\` (\`event_type\`);`)
  await db.run(sql`CREATE INDEX \`audit_events_collection_slug_idx\` ON \`audit_events\` (\`collection_slug\`);`)
  await db.run(sql`CREATE INDEX \`audit_events_document_id_idx\` ON \`audit_events\` (\`document_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_events_user_idx\` ON \`audit_events\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_events_request_id_idx\` ON \`audit_events\` (\`request_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_events_previous_hash_idx\` ON \`audit_events\` (\`previous_hash\`);`)
  await db.run(sql`CREATE INDEX \`audit_events_row_hash_idx\` ON \`audit_events\` (\`row_hash\`);`)
  await db.run(sql`CREATE INDEX \`audit_events_updated_at_idx\` ON \`audit_events\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`audit_events_created_at_idx\` ON \`audit_events\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`api_audit_events\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`event_id\` text NOT NULL,
  	\`kind\` text NOT NULL,
  	\`country\` text NOT NULL,
  	\`source\` text NOT NULL,
  	\`result_ok\` integer DEFAULT false NOT NULL,
  	\`error_message\` text,
  	\`payload_in\` text,
  	\`payload_out\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`api_audit_events_uuid_idx\` ON \`api_audit_events\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`api_audit_events_tenant_idx\` ON \`api_audit_events\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`api_audit_events_event_id_idx\` ON \`api_audit_events\` (\`event_id\`);`)
  await db.run(sql`CREATE INDEX \`api_audit_events_country_idx\` ON \`api_audit_events\` (\`country\`);`)
  await db.run(sql`CREATE INDEX \`api_audit_events_result_ok_idx\` ON \`api_audit_events\` (\`result_ok\`);`)
  await db.run(sql`CREATE INDEX \`api_audit_events_created_by_idx\` ON \`api_audit_events\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`api_audit_events_approved_by_idx\` ON \`api_audit_events\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`api_audit_events_updated_at_idx\` ON \`api_audit_events\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`api_audit_events_created_at_idx\` ON \`api_audit_events\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`evidence_attestations\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`attestation_id\` text NOT NULL,
  	\`workflow\` text NOT NULL,
  	\`country\` text NOT NULL,
  	\`captured_at\` text NOT NULL,
  	\`pdf_a\` text DEFAULT '2b' NOT NULL,
  	\`pdf_ua\` text DEFAULT '1',
  	\`signed\` integer DEFAULT false,
  	\`pades_level\` text,
  	\`pdf_file_id\` text(36),
  	\`signature_value\` text,
  	\`signed_at\` text,
  	\`signing_certificate\` text,
  	\`signed_by\` text,
  	\`signature_digest\` text,
  	\`steps_count\` numeric DEFAULT 0,
  	\`gaps_count\` numeric DEFAULT 0,
  	\`status\` text DEFAULT 'generated',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`pdf_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`evidence_attestations_uuid_idx\` ON \`evidence_attestations\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`evidence_attestations_tenant_idx\` ON \`evidence_attestations\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`evidence_attestations_attestation_id_idx\` ON \`evidence_attestations\` (\`attestation_id\`);`)
  await db.run(sql`CREATE INDEX \`evidence_attestations_workflow_idx\` ON \`evidence_attestations\` (\`workflow\`);`)
  await db.run(sql`CREATE INDEX \`evidence_attestations_captured_at_idx\` ON \`evidence_attestations\` (\`captured_at\`);`)
  await db.run(sql`CREATE INDEX \`evidence_attestations_pdf_file_idx\` ON \`evidence_attestations\` (\`pdf_file_id\`);`)
  await db.run(sql`CREATE INDEX \`evidence_attestations_signed_at_idx\` ON \`evidence_attestations\` (\`signed_at\`);`)
  await db.run(sql`CREATE INDEX \`evidence_attestations_created_by_idx\` ON \`evidence_attestations\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`evidence_attestations_approved_by_idx\` ON \`evidence_attestations\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`evidence_attestations_updated_at_idx\` ON \`evidence_attestations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`evidence_attestations_created_at_idx\` ON \`evidence_attestations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`shares\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`share_uuid\` text NOT NULL,
  	\`grantee_uuid\` text NOT NULL,
  	\`target_uuid\` text NOT NULL,
  	\`access_role\` text NOT NULL,
  	\`granted_at\` text,
  	\`chain_leaf_uuid\` text,
  	\`sealed\` integer DEFAULT false,
  	\`revoked\` integer DEFAULT false,
  	\`revoked_at\` text,
  	\`revoke_chain_leaf_uuid\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`shares_uuid_idx\` ON \`shares\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`shares_tenant_idx\` ON \`shares\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`shares_share_uuid_idx\` ON \`shares\` (\`share_uuid\`);`)
  await db.run(sql`CREATE INDEX \`shares_grantee_uuid_idx\` ON \`shares\` (\`grantee_uuid\`);`)
  await db.run(sql`CREATE INDEX \`shares_target_uuid_idx\` ON \`shares\` (\`target_uuid\`);`)
  await db.run(sql`CREATE INDEX \`shares_chain_leaf_uuid_idx\` ON \`shares\` (\`chain_leaf_uuid\`);`)
  await db.run(sql`CREATE INDEX \`shares_revoked_idx\` ON \`shares\` (\`revoked\`);`)
  await db.run(sql`CREATE INDEX \`shares_updated_at_idx\` ON \`shares\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`shares_created_at_idx\` ON \`shares\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`ef34fbcd44ea281498af77442ff84199a\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`jurisdiction\` text NOT NULL,
  	\`applicable_in_jurisdiction\` integer DEFAULT true,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`entity_types\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ef34fbcd44ea281498af77442ff84199a_order_idx\` ON \`ef34fbcd44ea281498af77442ff84199a\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ef34fbcd44ea281498af77442ff84199a_parent_id_idx\` ON \`ef34fbcd44ea281498af77442ff84199a\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`entity_types\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`code\` text NOT NULL,
  	\`label\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`description\` text,
  	\`characteristics\` text,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`entity_types_uuid_idx\` ON \`entity_types\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`entity_types_tenant_idx\` ON \`entity_types\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`entity_types_code_idx\` ON \`entity_types\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`entity_types_updated_at_idx\` ON \`entity_types\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`entity_types_created_at_idx\` ON \`entity_types\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`entity_types_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`compliance_frameworks_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`entity_types\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_frameworks_id\`) REFERENCES \`compliance_frameworks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`entity_types_rels_order_idx\` ON \`entity_types_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`entity_types_rels_parent_idx\` ON \`entity_types_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`entity_types_rels_path_idx\` ON \`entity_types_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`entity_types_rels_compliance_frameworks_id_idx\` ON \`entity_types_rels\` (\`compliance_frameworks_id\`);`)
  await db.run(sql`CREATE TABLE \`e6b390099a5c88994b32617396728b9d1\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`language_code\` text NOT NULL,
  	\`language_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e6b390099a5c88994b32617396728b9d1_order_idx\` ON \`e6b390099a5c88994b32617396728b9d1\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e6b390099a5c88994b32617396728b9d1_parent_id_idx\` ON \`e6b390099a5c88994b32617396728b9d1\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e6eb48eceb528889a8621e1cf37bbe038\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`filing_type\` text NOT NULL,
  	\`deadline\` text NOT NULL,
  	\`frequency\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e6eb48eceb528889a8621e1cf37bbe038_order_idx\` ON \`e6eb48eceb528889a8621e1cf37bbe038\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e6eb48eceb528889a8621e1cf37bbe038_parent_id_idx\` ON \`e6eb48eceb528889a8621e1cf37bbe038\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`taxing_jurisdictions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`code\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`type\` text NOT NULL,
  	\`parent_jurisdiction_id\` text(36),
  	\`iso2_code\` text,
  	\`iso3_code\` text,
  	\`primary_currency\` text,
  	\`regulatory_characteristics\` text,
  	\`banking_requirements\` text,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_jurisdiction_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`taxing_jurisdictions_uuid_idx\` ON \`taxing_jurisdictions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`taxing_jurisdictions_tenant_idx\` ON \`taxing_jurisdictions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`taxing_jurisdictions_code_idx\` ON \`taxing_jurisdictions\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`taxing_jurisdictions_parent_jurisdiction_idx\` ON \`taxing_jurisdictions\` (\`parent_jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`taxing_jurisdictions_updated_at_idx\` ON \`taxing_jurisdictions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`taxing_jurisdictions_created_at_idx\` ON \`taxing_jurisdictions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`taxing_jurisdictions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`compliance_frameworks_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_frameworks_id\`) REFERENCES \`compliance_frameworks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`taxing_jurisdictions_rels_order_idx\` ON \`taxing_jurisdictions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`taxing_jurisdictions_rels_parent_idx\` ON \`taxing_jurisdictions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`taxing_jurisdictions_rels_path_idx\` ON \`taxing_jurisdictions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`taxing_jurisdictions_rels_compliance_frameworks_id_idx\` ON \`taxing_jurisdictions_rels\` (\`compliance_frameworks_id\`);`)
  await db.run(sql`CREATE TABLE \`entity_legal_structures\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`jurisdiction_id\` text(36) NOT NULL,
  	\`entity_type_id\` text(36) NOT NULL,
  	\`local_name\` text NOT NULL,
  	\`abbreviation\` text,
  	\`description\` text,
  	\`regulatory_characteristics\` text,
  	\`governance_structure\` text,
  	\`tax_treatment\` text,
  	\`audit_requirement\` text,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`jurisdiction_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_type_id\`) REFERENCES \`entity_types\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`entity_legal_structures_uuid_idx\` ON \`entity_legal_structures\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`entity_legal_structures_tenant_idx\` ON \`entity_legal_structures\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`entity_legal_structures_jurisdiction_idx\` ON \`entity_legal_structures\` (\`jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`entity_legal_structures_entity_type_idx\` ON \`entity_legal_structures\` (\`entity_type_id\`);`)
  await db.run(sql`CREATE INDEX \`entity_legal_structures_updated_at_idx\` ON \`entity_legal_structures\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`entity_legal_structures_created_at_idx\` ON \`entity_legal_structures\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`compliance_frameworks\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`code\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`description\` text,
  	\`issuing_body\` text,
  	\`official_resource_url\` text,
  	\`effective_date\` text,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`compliance_frameworks_uuid_idx\` ON \`compliance_frameworks\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`compliance_frameworks_tenant_idx\` ON \`compliance_frameworks\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`compliance_frameworks_code_idx\` ON \`compliance_frameworks\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`compliance_frameworks_updated_at_idx\` ON \`compliance_frameworks\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`compliance_frameworks_created_at_idx\` ON \`compliance_frameworks\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`compliance_requirements\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`code\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`framework_id\` text(36) NOT NULL,
  	\`section\` text,
  	\`severity\` text,
  	\`resource_url\` text,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`framework_id\`) REFERENCES \`compliance_frameworks\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`compliance_requirements_uuid_idx\` ON \`compliance_requirements\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`compliance_requirements_tenant_idx\` ON \`compliance_requirements\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`compliance_requirements_code_idx\` ON \`compliance_requirements\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`compliance_requirements_framework_idx\` ON \`compliance_requirements\` (\`framework_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_requirements_updated_at_idx\` ON \`compliance_requirements\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`compliance_requirements_created_at_idx\` ON \`compliance_requirements\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`internal_controls\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`control_type\` text NOT NULL,
  	\`control_category\` text NOT NULL,
  	\`coso_component\` text,
  	\`frequency\` text,
  	\`owner_id\` text(36),
  	\`risk_mitigated\` text,
  	\`is_manual_control\` integer,
  	\`last_review_date\` text,
  	\`next_review_date\` text,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`owner_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`internal_controls_uuid_idx\` ON \`internal_controls\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`internal_controls_tenant_idx\` ON \`internal_controls\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_controls_title_idx\` ON \`internal_controls\` (\`title\`);`)
  await db.run(sql`CREATE INDEX \`internal_controls_owner_idx\` ON \`internal_controls\` (\`owner_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_controls_updated_at_idx\` ON \`internal_controls\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`internal_controls_created_at_idx\` ON \`internal_controls\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`control_tests\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`title\` text NOT NULL,
  	\`test_design\` text NOT NULL,
  	\`control_id\` text(36) NOT NULL,
  	\`sampling_methodology\` text,
  	\`planned_sample_size\` numeric,
  	\`actual_sample_size\` numeric,
  	\`tolerance_level\` numeric,
  	\`assertion\` text,
  	\`test_status\` text NOT NULL,
  	\`tested_date\` text,
  	\`result\` text,
  	\`deviation_count\` numeric,
  	\`deviation_rate\` numeric,
  	\`deviations_summary\` text,
  	\`conclusion_on_effectiveness\` text,
  	\`review_date\` text,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`control_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`control_tests_uuid_idx\` ON \`control_tests\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`control_tests_tenant_idx\` ON \`control_tests\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`control_tests_title_idx\` ON \`control_tests\` (\`title\`);`)
  await db.run(sql`CREATE INDEX \`control_tests_control_idx\` ON \`control_tests\` (\`control_id\`);`)
  await db.run(sql`CREATE INDEX \`control_tests_updated_at_idx\` ON \`control_tests\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`control_tests_created_at_idx\` ON \`control_tests\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`audit_samples\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`sample_id\` text NOT NULL,
  	\`control_test_id\` text(36) NOT NULL,
  	\`sampling_sequence\` numeric,
  	\`sample_item_type\` text NOT NULL,
  	\`sample_item_id\` text NOT NULL,
  	\`sample_item_date\` text,
  	\`sample_item_amount\` numeric,
  	\`test_result\` text,
  	\`exception_description\` text,
  	\`exception_category\` text,
  	\`tested_by_id\` text(36),
  	\`tested_date\` text,
  	\`notes\` text,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`control_test_id\`) REFERENCES \`control_tests\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tested_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`audit_samples_uuid_idx\` ON \`audit_samples\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`audit_samples_tenant_idx\` ON \`audit_samples\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`audit_samples_sample_id_idx\` ON \`audit_samples\` (\`sample_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_samples_control_test_idx\` ON \`audit_samples\` (\`control_test_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_samples_tested_by_idx\` ON \`audit_samples\` (\`tested_by_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_samples_updated_at_idx\` ON \`audit_samples\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`audit_samples_created_at_idx\` ON \`audit_samples\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`compliance_gaps\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`requirement_id\` text(36) NOT NULL,
  	\`gap_type\` text NOT NULL,
  	\`severity\` text NOT NULL,
  	\`status\` text DEFAULT 'identified' NOT NULL,
  	\`current_state\` text,
  	\`required_state\` text,
  	\`root_cause\` text,
  	\`identified_date\` text NOT NULL,
  	\`identified_by_id\` text(36) NOT NULL,
  	\`target_closure_date\` text,
  	\`actual_closure_date\` text,
  	\`risk_exposure\` text,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`requirement_id\`) REFERENCES \`compliance_requirements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`identified_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`compliance_gaps_uuid_idx\` ON \`compliance_gaps\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`compliance_gaps_tenant_idx\` ON \`compliance_gaps\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_gaps_title_idx\` ON \`compliance_gaps\` (\`title\`);`)
  await db.run(sql`CREATE INDEX \`compliance_gaps_requirement_idx\` ON \`compliance_gaps\` (\`requirement_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_gaps_identified_by_idx\` ON \`compliance_gaps\` (\`identified_by_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_gaps_updated_at_idx\` ON \`compliance_gaps\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`compliance_gaps_created_at_idx\` ON \`compliance_gaps\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e77fca21a191f8082bc2a98b0bfd457e8\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`actor\` text NOT NULL,
  	\`action\` text NOT NULL,
  	\`action_date\` text,
  	\`notes\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_evidence\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e77fca21a191f8082bc2a98b0bfd457e8_order_idx\` ON \`e77fca21a191f8082bc2a98b0bfd457e8\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e77fca21a191f8082bc2a98b0bfd457e8_parent_id_idx\` ON \`e77fca21a191f8082bc2a98b0bfd457e8\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e6c77d0f4b1888ce9bfd5c79a01b9bf36\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_evidence\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e6c77d0f4b1888ce9bfd5c79a01b9bf36_order_idx\` ON \`e6c77d0f4b1888ce9bfd5c79a01b9bf36\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e6c77d0f4b1888ce9bfd5c79a01b9bf36_parent_id_idx\` ON \`e6c77d0f4b1888ce9bfd5c79a01b9bf36\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`audit_evidence\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`title\` text NOT NULL,
  	\`description\` text,
  	\`document_type\` text NOT NULL,
  	\`document_file_id\` text(36) NOT NULL,
  	\`source_system\` text,
  	\`document_date\` text,
  	\`uploaded_date\` text NOT NULL,
  	\`uploaded_by_id\` text(36) NOT NULL,
  	\`related_control_id\` text(36),
  	\`related_control_test_id\` text(36),
  	\`related_audit_sample_id\` text(36),
  	\`related_finding_id\` text(36),
  	\`confidentiality\` text DEFAULT 'restricted',
  	\`retention_period\` text DEFAULT '7-years',
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`document_file_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`uploaded_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`related_control_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`related_control_test_id\`) REFERENCES \`control_tests\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`related_audit_sample_id\`) REFERENCES \`audit_samples\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`related_finding_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`audit_evidence_uuid_idx\` ON \`audit_evidence\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`audit_evidence_tenant_idx\` ON \`audit_evidence\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_evidence_title_idx\` ON \`audit_evidence\` (\`title\`);`)
  await db.run(sql`CREATE INDEX \`audit_evidence_document_file_idx\` ON \`audit_evidence\` (\`document_file_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_evidence_uploaded_by_idx\` ON \`audit_evidence\` (\`uploaded_by_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_evidence_related_control_idx\` ON \`audit_evidence\` (\`related_control_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_evidence_related_control_test_idx\` ON \`audit_evidence\` (\`related_control_test_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_evidence_related_audit_sample_idx\` ON \`audit_evidence\` (\`related_audit_sample_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_evidence_related_finding_idx\` ON \`audit_evidence\` (\`related_finding_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_evidence_updated_at_idx\` ON \`audit_evidence\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`audit_evidence_created_at_idx\` ON \`audit_evidence\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`ebdf6c5cf64618eb3a6cbab343da6bac0\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`recipient\` text NOT NULL,
  	\`communication_date\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ebdf6c5cf64618eb3a6cbab343da6bac0_order_idx\` ON \`ebdf6c5cf64618eb3a6cbab343da6bac0\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ebdf6c5cf64618eb3a6cbab343da6bac0_parent_id_idx\` ON \`ebdf6c5cf64618eb3a6cbab343da6bac0\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`audit_findings\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`finding_type\` text NOT NULL,
  	\`severity\` text NOT NULL,
  	\`related_control_id\` text(36),
  	\`related_control_test_id\` text(36),
  	\`frequency_of_occurrence\` text,
  	\`potential_impact\` text,
  	\`identified_date\` text NOT NULL,
  	\`identified_by_id\` text(36) NOT NULL,
  	\`root_cause\` text,
  	\`risk_category\` text,
  	\`status\` text DEFAULT 'open' NOT NULL,
  	\`management_response\` text,
  	\`management_response_date\` text,
  	\`prior_year_reference\` text,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`related_control_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`related_control_test_id\`) REFERENCES \`control_tests\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`identified_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`audit_findings_uuid_idx\` ON \`audit_findings\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_tenant_idx\` ON \`audit_findings\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_title_idx\` ON \`audit_findings\` (\`title\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_related_control_idx\` ON \`audit_findings\` (\`related_control_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_related_control_test_idx\` ON \`audit_findings\` (\`related_control_test_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_identified_by_idx\` ON \`audit_findings\` (\`identified_by_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_updated_at_idx\` ON \`audit_findings\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_created_at_idx\` ON \`audit_findings\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`audit_trail_events\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`operation\` text NOT NULL,
  	\`collection_name\` text NOT NULL,
  	\`document_id\` text NOT NULL,
  	\`changed_by_id\` text(36) NOT NULL,
  	\`changed_at\` text NOT NULL,
  	\`changes_summary\` text,
  	\`change_details\` text,
  	\`approved_by_id\` text(36),
  	\`approval_status\` text,
  	\`change_reason\` text,
  	\`system_details\` text,
  	\`is_delete\` integer DEFAULT false,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`changed_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`audit_trail_events_uuid_idx\` ON \`audit_trail_events\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`audit_trail_events_tenant_idx\` ON \`audit_trail_events\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_trail_events_operation_idx\` ON \`audit_trail_events\` (\`operation\`);`)
  await db.run(sql`CREATE INDEX \`audit_trail_events_collection_name_idx\` ON \`audit_trail_events\` (\`collection_name\`);`)
  await db.run(sql`CREATE INDEX \`audit_trail_events_document_id_idx\` ON \`audit_trail_events\` (\`document_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_trail_events_changed_by_idx\` ON \`audit_trail_events\` (\`changed_by_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_trail_events_changed_at_idx\` ON \`audit_trail_events\` (\`changed_at\`);`)
  await db.run(sql`CREATE INDEX \`audit_trail_events_approved_by_idx\` ON \`audit_trail_events\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE TABLE \`eed4d3e0dc8168b24a00ca2f6a516bc58\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`description\` text NOT NULL,
  	\`owner\` text,
  	\`target_date\` text,
  	\`status\` text DEFAULT 'not-started',
  	\`completed_date\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`remediation_plans\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eed4d3e0dc8168b24a00ca2f6a516bc58_order_idx\` ON \`eed4d3e0dc8168b24a00ca2f6a516bc58\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eed4d3e0dc8168b24a00ca2f6a516bc58_parent_id_idx\` ON \`eed4d3e0dc8168b24a00ca2f6a516bc58\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`remediation_plans\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`related_finding_id\` text(36),
  	\`related_gap_id\` text(36),
  	\`remediation_type\` text NOT NULL,
  	\`priority\` text NOT NULL,
  	\`owner_id\` text(36) NOT NULL,
  	\`target_date\` text NOT NULL,
  	\`completion_date\` text,
  	\`status\` text DEFAULT 'planned' NOT NULL,
  	\`required_resources\` text,
  	\`budget\` numeric,
  	\`risk_of_delay\` text,
  	\`approved_by_id\` text(36),
  	\`approval_date\` text,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`related_finding_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`related_gap_id\`) REFERENCES \`compliance_gaps\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`owner_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`remediation_plans_uuid_idx\` ON \`remediation_plans\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`remediation_plans_tenant_idx\` ON \`remediation_plans\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`remediation_plans_title_idx\` ON \`remediation_plans\` (\`title\`);`)
  await db.run(sql`CREATE INDEX \`remediation_plans_related_finding_idx\` ON \`remediation_plans\` (\`related_finding_id\`);`)
  await db.run(sql`CREATE INDEX \`remediation_plans_related_gap_idx\` ON \`remediation_plans\` (\`related_gap_id\`);`)
  await db.run(sql`CREATE INDEX \`remediation_plans_owner_idx\` ON \`remediation_plans\` (\`owner_id\`);`)
  await db.run(sql`CREATE INDEX \`remediation_plans_approved_by_idx\` ON \`remediation_plans\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`remediation_plans_updated_at_idx\` ON \`remediation_plans\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`remediation_plans_created_at_idx\` ON \`remediation_plans\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`audit_committees\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`name\` text NOT NULL,
  	\`entity_id\` text(36) NOT NULL,
  	\`charter_id\` text(36),
  	\`established_date\` text NOT NULL,
  	\`meeting_frequency\` text NOT NULL,
  	\`status\` text DEFAULT 'active',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`charter_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`audit_committees_uuid_idx\` ON \`audit_committees\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`audit_committees_tenant_idx\` ON \`audit_committees\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_committees_entity_idx\` ON \`audit_committees\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_committees_charter_idx\` ON \`audit_committees\` (\`charter_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_committees_updated_at_idx\` ON \`audit_committees\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`audit_committees_created_at_idx\` ON \`audit_committees\` (\`created_at\`);`)
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
  await db.run(sql`CREATE TABLE \`board_actions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`entity_id\` text(36) NOT NULL,
  	\`action_title\` text NOT NULL,
  	\`description\` text,
  	\`action_type\` text NOT NULL,
  	\`meeting_date\` text NOT NULL,
  	\`action_date\` text,
  	\`status\` text NOT NULL,
  	\`vote_tally_votes_for\` numeric,
  	\`vote_tally_votes_against\` numeric,
  	\`vote_tally_abstentions\` numeric,
  	\`minutes_id\` text(36),
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`minutes_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`board_actions_uuid_idx\` ON \`board_actions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`board_actions_tenant_idx\` ON \`board_actions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`board_actions_entity_idx\` ON \`board_actions\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`board_actions_minutes_idx\` ON \`board_actions\` (\`minutes_id\`);`)
  await db.run(sql`CREATE INDEX \`board_actions_updated_at_idx\` ON \`board_actions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`board_actions_created_at_idx\` ON \`board_actions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`board_actions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`internal_controls_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`board_actions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`board_actions_rels_order_idx\` ON \`board_actions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`board_actions_rels_parent_idx\` ON \`board_actions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`board_actions_rels_path_idx\` ON \`board_actions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`board_actions_rels_internal_controls_id_idx\` ON \`board_actions_rels\` (\`internal_controls_id\`);`)
  await db.run(sql`CREATE TABLE \`e2fd3794b06848c5791b307f9f023909c\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`assertion\` text,
  	\`certification_level\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`management_certifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e2fd3794b06848c5791b307f9f023909c_order_idx\` ON \`e2fd3794b06848c5791b307f9f023909c\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e2fd3794b06848c5791b307f9f023909c_parent_id_idx\` ON \`e2fd3794b06848c5791b307f9f023909c\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`management_certifications\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`entity_id\` text(36) NOT NULL,
  	\`certification_name\` text NOT NULL,
  	\`certifying_officer\` text NOT NULL,
  	\`certification_date\` text NOT NULL,
  	\`certification_type\` text NOT NULL,
  	\`scope\` text,
  	\`signed_document_id\` text(36),
  	\`status\` text DEFAULT 'current',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`signed_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`management_certifications_uuid_idx\` ON \`management_certifications\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`management_certifications_tenant_idx\` ON \`management_certifications\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`management_certifications_entity_idx\` ON \`management_certifications\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`management_certifications_signed_document_idx\` ON \`management_certifications\` (\`signed_document_id\`);`)
  await db.run(sql`CREATE INDEX \`management_certifications_updated_at_idx\` ON \`management_certifications\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`management_certifications_created_at_idx\` ON \`management_certifications\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`management_certifications_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_findings_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`management_certifications\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`management_certifications_rels_order_idx\` ON \`management_certifications_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`management_certifications_rels_parent_idx\` ON \`management_certifications_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`management_certifications_rels_path_idx\` ON \`management_certifications_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`management_certifications_rels_audit_findings_id_idx\` ON \`management_certifications_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE TABLE \`regulatory_reports\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`entity_id\` text(36) NOT NULL,
  	\`report_name\` text NOT NULL,
  	\`reporting_standard_id\` text(36),
  	\`jurisdiction_id\` text(36) NOT NULL,
  	\`report_type\` text NOT NULL,
  	\`fiscal_period_start\` text NOT NULL,
  	\`fiscal_period_end\` text NOT NULL,
  	\`due_date\` text NOT NULL,
  	\`submission_date\` text,
  	\`status\` text NOT NULL,
  	\`report_document_id\` text(36),
  	\`regulatory_feedback\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reporting_standard_id\`) REFERENCES \`compliance_frameworks\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`jurisdiction_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`report_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`regulatory_reports_uuid_idx\` ON \`regulatory_reports\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_tenant_idx\` ON \`regulatory_reports\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_entity_idx\` ON \`regulatory_reports\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_reporting_standard_idx\` ON \`regulatory_reports\` (\`reporting_standard_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_jurisdiction_idx\` ON \`regulatory_reports\` (\`jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_report_document_idx\` ON \`regulatory_reports\` (\`report_document_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_updated_at_idx\` ON \`regulatory_reports\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_created_at_idx\` ON \`regulatory_reports\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`regulatory_reports_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_findings_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`regulatory_reports\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`regulatory_reports_rels_order_idx\` ON \`regulatory_reports_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_rels_parent_idx\` ON \`regulatory_reports_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_rels_path_idx\` ON \`regulatory_reports_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_rels_audit_findings_id_idx\` ON \`regulatory_reports_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE TABLE \`internal_policies\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`policy_name\` text NOT NULL,
  	\`policy_number\` text NOT NULL,
  	\`description\` text,
  	\`policy_type\` text NOT NULL,
  	\`owner\` text,
  	\`effective_date\` text NOT NULL,
  	\`last_review_date\` text,
  	\`next_review_date\` text,
  	\`status\` text DEFAULT 'active',
  	\`policy_document_id\` text(36),
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`policy_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`internal_policies_uuid_idx\` ON \`internal_policies\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`internal_policies_tenant_idx\` ON \`internal_policies\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_policies_policy_document_idx\` ON \`internal_policies\` (\`policy_document_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_policies_updated_at_idx\` ON \`internal_policies\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`internal_policies_created_at_idx\` ON \`internal_policies\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`internal_policies_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`internal_controls_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`internal_policies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`internal_policies_rels_order_idx\` ON \`internal_policies_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`internal_policies_rels_parent_idx\` ON \`internal_policies_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_policies_rels_path_idx\` ON \`internal_policies_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`internal_policies_rels_internal_controls_id_idx\` ON \`internal_policies_rels\` (\`internal_controls_id\`);`)
  await db.run(sql`CREATE TABLE \`e86a4abedd768812d9092751010ab81e5\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_name\` text,
  	\`sequence\` numeric,
  	\`mandatory\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`statutory_report_templates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e86a4abedd768812d9092751010ab81e5_order_idx\` ON \`e86a4abedd768812d9092751010ab81e5\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e86a4abedd768812d9092751010ab81e5_parent_id_idx\` ON \`e86a4abedd768812d9092751010ab81e5\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`statutory_report_templates\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`template_name\` text NOT NULL,
  	\`jurisdiction_id\` text(36) NOT NULL,
  	\`report_type\` text NOT NULL,
  	\`entity_type_id\` text(36),
  	\`template_document_id\` text(36),
  	\`effective_from\` text NOT NULL,
  	\`effective_to\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`jurisdiction_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_type_id\`) REFERENCES \`entity_types\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`template_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`statutory_report_templates_uuid_idx\` ON \`statutory_report_templates\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_tenant_idx\` ON \`statutory_report_templates\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_jurisdiction_idx\` ON \`statutory_report_templates\` (\`jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_entity_type_idx\` ON \`statutory_report_templates\` (\`entity_type_id\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_template_document_idx\` ON \`statutory_report_templates\` (\`template_document_id\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_updated_at_idx\` ON \`statutory_report_templates\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_created_at_idx\` ON \`statutory_report_templates\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`statutory_field_mappings\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`mapping_name\` text NOT NULL,
  	\`report_template_id\` text(36) NOT NULL,
  	\`field_name\` text NOT NULL,
  	\`field_type\` text,
  	\`source_collection\` text,
  	\`source_field\` text,
  	\`transformation\` text,
  	\`mandatory\` integer DEFAULT true,
  	\`validation_rules\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`report_template_id\`) REFERENCES \`statutory_report_templates\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`statutory_field_mappings_uuid_idx\` ON \`statutory_field_mappings\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`statutory_field_mappings_tenant_idx\` ON \`statutory_field_mappings\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`statutory_field_mappings_report_template_idx\` ON \`statutory_field_mappings\` (\`report_template_id\`);`)
  await db.run(sql`CREATE INDEX \`statutory_field_mappings_updated_at_idx\` ON \`statutory_field_mappings\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`statutory_field_mappings_created_at_idx\` ON \`statutory_field_mappings\` (\`created_at\`);`)
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
  await db.run(sql`CREATE TABLE \`policy_acknowledgments\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`policy_id\` text(36) NOT NULL,
  	\`policy_version_id\` text(36),
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
  	FOREIGN KEY (\`policy_version_id\`) REFERENCES \`policy_versions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`signed_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`policy_acknowledgments_uuid_idx\` ON \`policy_acknowledgments\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_tenant_idx\` ON \`policy_acknowledgments\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_policy_idx\` ON \`policy_acknowledgments\` (\`policy_id\`);`)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_policy_version_idx\` ON \`policy_acknowledgments\` (\`policy_version_id\`);`)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_signed_document_idx\` ON \`policy_acknowledgments\` (\`signed_document_id\`);`)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_updated_at_idx\` ON \`policy_acknowledgments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_created_at_idx\` ON \`policy_acknowledgments\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`compliance_deadlines\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`entity_id\` text(36) NOT NULL,
  	\`deadline_name\` text NOT NULL,
  	\`deadline_type\` text NOT NULL,
  	\`jurisdiction_id\` text(36),
  	\`requirement_id\` text(36),
  	\`due_date\` text NOT NULL,
  	\`submission_date\` text,
  	\`status\` text DEFAULT 'on-track',
  	\`priority\` text,
  	\`penalty\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`jurisdiction_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`requirement_id\`) REFERENCES \`compliance_requirements\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`compliance_deadlines_uuid_idx\` ON \`compliance_deadlines\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_tenant_idx\` ON \`compliance_deadlines\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_entity_idx\` ON \`compliance_deadlines\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_jurisdiction_idx\` ON \`compliance_deadlines\` (\`jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_requirement_idx\` ON \`compliance_deadlines\` (\`requirement_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_updated_at_idx\` ON \`compliance_deadlines\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_created_at_idx\` ON \`compliance_deadlines\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e63374315133189659a5f11c2d82e4d14\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`compliance_notifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e63374315133189659a5f11c2d82e4d14_order_idx\` ON \`e63374315133189659a5f11c2d82e4d14\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`e63374315133189659a5f11c2d82e4d14_parent_idx\` ON \`e63374315133189659a5f11c2d82e4d14\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e98d28b906a8a84fc83665a4bee6d69f1\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`recipient_email\` text,
  	\`recipient_role\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`compliance_notifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e98d28b906a8a84fc83665a4bee6d69f1_order_idx\` ON \`e98d28b906a8a84fc83665a4bee6d69f1\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e98d28b906a8a84fc83665a4bee6d69f1_parent_id_idx\` ON \`e98d28b906a8a84fc83665a4bee6d69f1\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`compliance_notifications\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`deadline_id\` text(36) NOT NULL,
  	\`notification_title\` text NOT NULL,
  	\`notification_content\` text,
  	\`days_before_due\` numeric NOT NULL,
  	\`sent_date\` text,
  	\`status\` text DEFAULT 'scheduled',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`deadline_id\`) REFERENCES \`compliance_deadlines\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`compliance_notifications_uuid_idx\` ON \`compliance_notifications\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`compliance_notifications_tenant_idx\` ON \`compliance_notifications\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_notifications_deadline_idx\` ON \`compliance_notifications\` (\`deadline_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_notifications_updated_at_idx\` ON \`compliance_notifications\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`compliance_notifications_created_at_idx\` ON \`compliance_notifications\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`reporting_standards\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`standard_name\` text NOT NULL,
  	\`standard_code\` text NOT NULL,
  	\`standard_type\` text NOT NULL,
  	\`jurisdiction_id\` text(36),
  	\`description\` text,
  	\`version\` text,
  	\`effective_date\` text NOT NULL,
  	\`reference_material_id\` text(36),
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`jurisdiction_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reference_material_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`reporting_standards_uuid_idx\` ON \`reporting_standards\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_tenant_idx\` ON \`reporting_standards\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_jurisdiction_idx\` ON \`reporting_standards\` (\`jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_reference_material_idx\` ON \`reporting_standards\` (\`reference_material_id\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_updated_at_idx\` ON \`reporting_standards\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_created_at_idx\` ON \`reporting_standards\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`ed4bb747bf248847fbb37044680471a81\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`source_element\` text,
  	\`target_element\` text,
  	\`transformation\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`reporting_mappings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ed4bb747bf248847fbb37044680471a81_order_idx\` ON \`ed4bb747bf248847fbb37044680471a81\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ed4bb747bf248847fbb37044680471a81_parent_id_idx\` ON \`ed4bb747bf248847fbb37044680471a81\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`reporting_mappings\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`mapping_name\` text NOT NULL,
  	\`from_standard_id\` text(36) NOT NULL,
  	\`to_standard_id\` text(36) NOT NULL,
  	\`mapping_type\` text NOT NULL,
  	\`status\` text DEFAULT 'pending-review',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`from_standard_id\`) REFERENCES \`reporting_standards\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`to_standard_id\`) REFERENCES \`reporting_standards\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`reporting_mappings_uuid_idx\` ON \`reporting_mappings\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`reporting_mappings_tenant_idx\` ON \`reporting_mappings\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`reporting_mappings_from_standard_idx\` ON \`reporting_mappings\` (\`from_standard_id\`);`)
  await db.run(sql`CREATE INDEX \`reporting_mappings_to_standard_idx\` ON \`reporting_mappings\` (\`to_standard_id\`);`)
  await db.run(sql`CREATE INDEX \`reporting_mappings_updated_at_idx\` ON \`reporting_mappings\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`reporting_mappings_created_at_idx\` ON \`reporting_mappings\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`related_party_transactions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`entity_id\` text(36) NOT NULL,
  	\`related_party_name\` text NOT NULL,
  	\`related_party_type\` text NOT NULL,
  	\`relationship\` text NOT NULL,
  	\`transaction_date\` text NOT NULL,
  	\`transaction_description\` text NOT NULL,
  	\`transaction_type\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`currency\` text NOT NULL,
  	\`terms\` text,
  	\`arm_length_basis\` text,
  	\`approval_status\` text DEFAULT 'pending',
  	\`approver_name\` text,
  	\`approval_date\` text,
  	\`disclosure_required\` integer DEFAULT true,
  	\`disclosed_in_financial_statements\` integer DEFAULT false,
  	\`disclosure_reference\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`related_party_transactions_uuid_idx\` ON \`related_party_transactions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_tenant_idx\` ON \`related_party_transactions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_entity_idx\` ON \`related_party_transactions\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_related_party_name_idx\` ON \`related_party_transactions\` (\`related_party_name\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_updated_at_idx\` ON \`related_party_transactions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_created_at_idx\` ON \`related_party_transactions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`related_party_transactions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`internal_controls_id\` text(36),
  	\`audit_evidence_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`related_party_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_evidence_id\`) REFERENCES \`audit_evidence\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`related_party_transactions_rels_order_idx\` ON \`related_party_transactions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_rels_parent_idx\` ON \`related_party_transactions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_rels_path_idx\` ON \`related_party_transactions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_rels_internal_controls_id_idx\` ON \`related_party_transactions_rels\` (\`internal_controls_id\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_rels_audit_evidence_id_idx\` ON \`related_party_transactions_rels\` (\`audit_evidence_id\`);`)
  await db.run(sql`CREATE TABLE \`e7b6d5ba25f4f809caff6535d1804c987\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`signature_date\` text NOT NULL,
  	\`signature_document_id\` text(36),
  	FOREIGN KEY (\`signature_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`management_assessment_icfr\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e7b6d5ba25f4f809caff6535d1804c987_order_idx\` ON \`e7b6d5ba25f4f809caff6535d1804c987\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e7b6d5ba25f4f809caff6535d1804c987_parent_id_idx\` ON \`e7b6d5ba25f4f809caff6535d1804c987\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e7b6d5ba25f4f809caff6535d1804c987_signature_document_idx\` ON \`e7b6d5ba25f4f809caff6535d1804c987\` (\`signature_document_id\`);`)
  await db.run(sql`CREATE TABLE \`management_assessment_icfr\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`entity_id\` text(36) NOT NULL,
  	\`assessment_period\` text NOT NULL,
  	\`assessment_date\` text NOT NULL,
  	\`scope\` text NOT NULL,
  	\`control_framework\` text NOT NULL,
  	\`control_environment_assessment\` text NOT NULL,
  	\`risk_assessment_assessment\` text NOT NULL,
  	\`control_activities_assessment\` text NOT NULL,
  	\`information_communication_assessment\` text NOT NULL,
  	\`monitoring_assessment\` text NOT NULL,
  	\`significant_deficiencies_identified\` integer DEFAULT false,
  	\`material_weaknesses_identified\` integer DEFAULT false,
  	\`deficiency_details\` text,
  	\`remediation_actions\` text,
  	\`conclusion_statement\` text NOT NULL,
  	\`management_acknowledgment\` text NOT NULL,
  	\`attestation_document_id\` text(36),
  	\`status\` text DEFAULT 'draft' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`attestation_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`management_assessment_icfr_uuid_idx\` ON \`management_assessment_icfr\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_tenant_idx\` ON \`management_assessment_icfr\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_entity_idx\` ON \`management_assessment_icfr\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_attestation_document_idx\` ON \`management_assessment_icfr\` (\`attestation_document_id\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_updated_at_idx\` ON \`management_assessment_icfr\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_created_at_idx\` ON \`management_assessment_icfr\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`management_assessment_icfr_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_findings_id\` text(36),
  	\`control_tests_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`management_assessment_icfr\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`control_tests_id\`) REFERENCES \`control_tests\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_rels_order_idx\` ON \`management_assessment_icfr_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_rels_parent_idx\` ON \`management_assessment_icfr_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_rels_path_idx\` ON \`management_assessment_icfr_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_rels_audit_findings_id_idx\` ON \`management_assessment_icfr_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_rels_control_tests_id_idx\` ON \`management_assessment_icfr_rels\` (\`control_tests_id\`);`)
  await db.run(sql`CREATE TABLE \`e2cf7ebcb20e98c53ac2931d630d1a794\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`disclosure_title\` text NOT NULL,
  	\`disclosure_requirement\` text NOT NULL,
  	\`applicability\` text NOT NULL,
  	\`applicability_condition\` text,
  	\`completion_status\` text DEFAULT 'not-started' NOT NULL,
  	\`assigned_to\` text,
  	\`target_date\` text,
  	\`completion_date\` text,
  	\`notes\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`disclosure_checklists\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e2cf7ebcb20e98c53ac2931d630d1a794_order_idx\` ON \`e2cf7ebcb20e98c53ac2931d630d1a794\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e2cf7ebcb20e98c53ac2931d630d1a794_parent_id_idx\` ON \`e2cf7ebcb20e98c53ac2931d630d1a794\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`disclosure_checklists\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`entity_id\` text(36) NOT NULL,
  	\`checklist_name\` text NOT NULL,
  	\`standard_id\` text(36) NOT NULL,
  	\`standard_section\` text,
  	\`fiscal_period\` text NOT NULL,
  	\`overall_completion_percentage\` numeric,
  	\`reviewed_by\` text,
  	\`review_date\` text,
  	\`checklist_status\` text DEFAULT 'in-preparation' NOT NULL,
  	\`checklist_document_id\` text(36),
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`standard_id\`) REFERENCES \`compliance_frameworks\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`checklist_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`disclosure_checklists_uuid_idx\` ON \`disclosure_checklists\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`disclosure_checklists_tenant_idx\` ON \`disclosure_checklists\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`disclosure_checklists_entity_idx\` ON \`disclosure_checklists\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`disclosure_checklists_standard_idx\` ON \`disclosure_checklists\` (\`standard_id\`);`)
  await db.run(sql`CREATE INDEX \`disclosure_checklists_checklist_document_idx\` ON \`disclosure_checklists\` (\`checklist_document_id\`);`)
  await db.run(sql`CREATE INDEX \`disclosure_checklists_updated_at_idx\` ON \`disclosure_checklists\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`disclosure_checklists_created_at_idx\` ON \`disclosure_checklists\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`disclosure_checklists_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_evidence_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`disclosure_checklists\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_evidence_id\`) REFERENCES \`audit_evidence\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`disclosure_checklists_rels_order_idx\` ON \`disclosure_checklists_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`disclosure_checklists_rels_parent_idx\` ON \`disclosure_checklists_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`disclosure_checklists_rels_path_idx\` ON \`disclosure_checklists_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`disclosure_checklists_rels_audit_evidence_id_idx\` ON \`disclosure_checklists_rels\` (\`audit_evidence_id\`);`)
  await db.run(sql`CREATE TABLE \`e096b0d817dc2803fbde647fc45fdd1d2\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`title\` text,
  	\`affiliation\` text,
  	\`status\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e096b0d817dc2803fbde647fc45fdd1d2_order_idx\` ON \`e096b0d817dc2803fbde647fc45fdd1d2\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e096b0d817dc2803fbde647fc45fdd1d2_parent_id_idx\` ON \`e096b0d817dc2803fbde647fc45fdd1d2\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`eb97d9b37aa2f8c0cba9177cb912664fa\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`topic\` text NOT NULL,
  	\`presenter\` text,
  	\`time_allocated\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eb97d9b37aa2f8c0cba9177cb912664fa_order_idx\` ON \`eb97d9b37aa2f8c0cba9177cb912664fa\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eb97d9b37aa2f8c0cba9177cb912664fa_parent_id_idx\` ON \`eb97d9b37aa2f8c0cba9177cb912664fa\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e847fc1809b2f8f1dbee08a0fff515091\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`decision\` text NOT NULL,
  	\`rationale\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e847fc1809b2f8f1dbee08a0fff515091_order_idx\` ON \`e847fc1809b2f8f1dbee08a0fff515091\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e847fc1809b2f8f1dbee08a0fff515091_parent_id_idx\` ON \`e847fc1809b2f8f1dbee08a0fff515091\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e1465d8f360ca8f11a355cbdf4650ac30\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`action_description\` text NOT NULL,
  	\`assigned_to\` text NOT NULL,
  	\`due_date\` text NOT NULL,
  	\`status\` text DEFAULT 'open',
  	\`completion_date\` text,
  	\`completion_notes\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e1465d8f360ca8f11a355cbdf4650ac30_order_idx\` ON \`e1465d8f360ca8f11a355cbdf4650ac30\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e1465d8f360ca8f11a355cbdf4650ac30_parent_id_idx\` ON \`e1465d8f360ca8f11a355cbdf4650ac30\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`audit_committee_minutes\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`audit_committee_id\` text(36) NOT NULL,
  	\`entity_id\` text(36) NOT NULL,
  	\`meeting_title\` text NOT NULL,
  	\`meeting_date\` text NOT NULL,
  	\`meeting_time\` text,
  	\`meeting_location\` text,
  	\`chair_person\` text,
  	\`discussion_summary\` text NOT NULL,
  	\`risks_identified\` text,
  	\`auditor_observations\` text,
  	\`compliance_matters\` text,
  	\`minutes_status\` text DEFAULT 'draft' NOT NULL,
  	\`approved_by\` text,
  	\`approval_date\` text,
  	\`minutes_document_id\` text(36),
  	\`confidentiality\` text DEFAULT 'confidential',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`audit_committee_id\`) REFERENCES \`audit_committees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`minutes_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`audit_committee_minutes_uuid_idx\` ON \`audit_committee_minutes\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`audit_committee_minutes_tenant_idx\` ON \`audit_committee_minutes\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_committee_minutes_audit_committee_idx\` ON \`audit_committee_minutes\` (\`audit_committee_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_committee_minutes_entity_idx\` ON \`audit_committee_minutes\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_committee_minutes_minutes_document_idx\` ON \`audit_committee_minutes\` (\`minutes_document_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_committee_minutes_updated_at_idx\` ON \`audit_committee_minutes\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`audit_committee_minutes_created_at_idx\` ON \`audit_committee_minutes\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`audit_committee_minutes_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`board_actions_id\` text(36),
  	\`audit_findings_id\` text(36),
  	\`compliance_gaps_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`board_actions_id\`) REFERENCES \`board_actions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_gaps_id\`) REFERENCES \`compliance_gaps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`audit_committee_minutes_rels_order_idx\` ON \`audit_committee_minutes_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`audit_committee_minutes_rels_parent_idx\` ON \`audit_committee_minutes_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_committee_minutes_rels_path_idx\` ON \`audit_committee_minutes_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`audit_committee_minutes_rels_board_actions_id_idx\` ON \`audit_committee_minutes_rels\` (\`board_actions_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_committee_minutes_rels_audit_findings_id_idx\` ON \`audit_committee_minutes_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_committee_minutes_rels_compliance_gaps_id_idx\` ON \`audit_committee_minutes_rels\` (\`compliance_gaps_id\`);`)
  await db.run(sql`CREATE TABLE \`risk_register\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`entity_id\` text(36) NOT NULL,
  	\`risk_id\` text NOT NULL,
  	\`risk_title\` text NOT NULL,
  	\`risk_description\` text NOT NULL,
  	\`risk_category\` text NOT NULL,
  	\`coso_component\` text,
  	\`risk_owner\` text NOT NULL,
  	\`risk_owner_contact\` text,
  	\`inherent_risk_likelihood\` text NOT NULL,
  	\`inherent_risk_impact\` text NOT NULL,
  	\`inherent_risk_score\` numeric,
  	\`residual_risk_likelihood\` text NOT NULL,
  	\`residual_risk_impact\` text NOT NULL,
  	\`residual_risk_score\` numeric,
  	\`risk_appetite\` text NOT NULL,
  	\`acceptability_assessment\` text NOT NULL,
  	\`further_mitigation_required\` integer DEFAULT false,
  	\`additional_mitigation_plan\` text,
  	\`last_assessment_date\` text NOT NULL,
  	\`next_assessment_date\` text NOT NULL,
  	\`risk_status\` text DEFAULT 'active' NOT NULL,
  	\`risk_register_document_id\` text(36),
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`risk_register_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`risk_register_uuid_idx\` ON \`risk_register\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`risk_register_tenant_idx\` ON \`risk_register\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`risk_register_entity_idx\` ON \`risk_register\` (\`entity_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`risk_register_risk_id_idx\` ON \`risk_register\` (\`risk_id\`);`)
  await db.run(sql`CREATE INDEX \`risk_register_risk_register_document_idx\` ON \`risk_register\` (\`risk_register_document_id\`);`)
  await db.run(sql`CREATE INDEX \`risk_register_updated_at_idx\` ON \`risk_register\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`risk_register_created_at_idx\` ON \`risk_register\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`risk_register_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`internal_controls_id\` text(36),
  	\`compliance_requirements_id\` text(36),
  	\`audit_findings_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`risk_register\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_requirements_id\`) REFERENCES \`compliance_requirements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`risk_register_rels_order_idx\` ON \`risk_register_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`risk_register_rels_parent_idx\` ON \`risk_register_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`risk_register_rels_path_idx\` ON \`risk_register_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`risk_register_rels_internal_controls_id_idx\` ON \`risk_register_rels\` (\`internal_controls_id\`);`)
  await db.run(sql`CREATE INDEX \`risk_register_rels_compliance_requirements_id_idx\` ON \`risk_register_rels\` (\`compliance_requirements_id\`);`)
  await db.run(sql`CREATE INDEX \`risk_register_rels_audit_findings_id_idx\` ON \`risk_register_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE TABLE \`e1a216420daff8b30ba8bab31bff7f178\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`payment_date\` text NOT NULL,
  	\`principal_payment\` numeric NOT NULL,
  	\`interest_payment\` numeric,
  	\`total_payment\` numeric,
  	\`payment_status\` text DEFAULT 'scheduled',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`debt_schedule\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e1a216420daff8b30ba8bab31bff7f178_order_idx\` ON \`e1a216420daff8b30ba8bab31bff7f178\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e1a216420daff8b30ba8bab31bff7f178_parent_id_idx\` ON \`e1a216420daff8b30ba8bab31bff7f178\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e55475e7a36b48103a9792367bb20bd76\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`covenant_name\` text NOT NULL,
  	\`covenant_definition\` text,
  	\`tested_frequency\` text,
  	\`threshold\` text NOT NULL,
  	\`current_performance\` text,
  	\`compliance_status\` text DEFAULT 'compliant',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`debt_schedule\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e55475e7a36b48103a9792367bb20bd76_order_idx\` ON \`e55475e7a36b48103a9792367bb20bd76\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e55475e7a36b48103a9792367bb20bd76_parent_id_idx\` ON \`e55475e7a36b48103a9792367bb20bd76\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`debt_schedule\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`entity_id\` text(36) NOT NULL,
  	\`debt_instrument_name\` text NOT NULL,
  	\`debt_instrument_id\` text NOT NULL,
  	\`debt_type\` text NOT NULL,
  	\`lender_name\` text NOT NULL,
  	\`lender_contact\` text,
  	\`principal_amount\` numeric NOT NULL,
  	\`currency\` text NOT NULL,
  	\`issuance_date\` text NOT NULL,
  	\`maturity_date\` text NOT NULL,
  	\`interest_rate\` text,
  	\`interest_payment_frequency\` text,
  	\`outstanding_balance\` numeric NOT NULL,
  	\`security_type\` text,
  	\`security_details\` text,
  	\`operational_covenants\` text,
  	\`restrictive_covenants\` text,
  	\`prepayment_terms\` text,
  	\`default_provisions\` text,
  	\`lastcovenant_compliancetest\` text,
  	\`next_covenant_test\` text,
  	\`risk_assessment\` text,
  	\`debt_status\` text DEFAULT 'active' NOT NULL,
  	\`debt_agreement_id\` text(36),
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`debt_agreement_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`debt_schedule_uuid_idx\` ON \`debt_schedule\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_tenant_idx\` ON \`debt_schedule\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_entity_idx\` ON \`debt_schedule\` (\`entity_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`debt_schedule_debt_instrument_id_idx\` ON \`debt_schedule\` (\`debt_instrument_id\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_debt_agreement_idx\` ON \`debt_schedule\` (\`debt_agreement_id\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_updated_at_idx\` ON \`debt_schedule\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_created_at_idx\` ON \`debt_schedule\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`debt_schedule_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`legal_entities_id\` text(36),
  	\`fx_transactions_id\` text(36),
  	\`internal_controls_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`debt_schedule\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`legal_entities_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fx_transactions_id\`) REFERENCES \`fx_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`debt_schedule_rels_order_idx\` ON \`debt_schedule_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_rels_parent_idx\` ON \`debt_schedule_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_rels_path_idx\` ON \`debt_schedule_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_rels_legal_entities_id_idx\` ON \`debt_schedule_rels\` (\`legal_entities_id\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_rels_fx_transactions_id_idx\` ON \`debt_schedule_rels\` (\`fx_transactions_id\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_rels_internal_controls_id_idx\` ON \`debt_schedule_rels\` (\`internal_controls_id\`);`)
  await db.run(sql`CREATE TABLE \`e2ed3319156f98328b9f2124e3154b2b0\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`engagement_name\` text NOT NULL,
  	\`engagement_type\` text NOT NULL,
  	\`objective_scope\` text,
  	\`start_date\` text NOT NULL,
  	\`completion_date\` text,
  	\`status\` text DEFAULT 'planned',
  	\`report_issued\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`internal_audit_function\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e2ed3319156f98328b9f2124e3154b2b0_order_idx\` ON \`e2ed3319156f98328b9f2124e3154b2b0\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e2ed3319156f98328b9f2124e3154b2b0_parent_id_idx\` ON \`e2ed3319156f98328b9f2124e3154b2b0\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ea2509c33f75c8e20a0407280749b7f16\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`finding_reference\` text NOT NULL,
  	\`management_action\` text NOT NULL,
  	\`target_implementation_date\` text NOT NULL,
  	\`implementation_date\` text,
  	\`follow_up_status\` text DEFAULT 'not-started',
  	\`notes\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`internal_audit_function\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ea2509c33f75c8e20a0407280749b7f16_order_idx\` ON \`ea2509c33f75c8e20a0407280749b7f16\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ea2509c33f75c8e20a0407280749b7f16_parent_id_idx\` ON \`ea2509c33f75c8e20a0407280749b7f16\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`internal_audit_function\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`entity_id\` text(36) NOT NULL,
  	\`function_name\` text NOT NULL,
  	\`audit_charter\` text NOT NULL,
  	\`charter_id\` text,
  	\`charter_approved_date\` text NOT NULL,
  	\`reporting_line\` text NOT NULL,
  	\`chief_audit_executive\` text NOT NULL,
  	\`chief_audit_executive_contact\` text,
  	\`audit_committee_id\` text(36),
  	\`audit_staff_count\` numeric,
  	\`audit_budget\` numeric,
  	\`audit_plan\` text,
  	\`audit_plan_year\` text,
  	\`audit_plan_approved_date\` text,
  	\`audit_plan_document_id\` text(36),
  	\`performance_metrics\` text,
  	\`quality_assurance\` text,
  	\`last_quality_review\` text,
  	\`next_quality_review\` text,
  	\`professional_standards\` text,
  	\`resource_adequacy\` text,
  	\`independence_and_objectivity\` text,
  	\`risk_based_auditing\` integer DEFAULT true,
  	\`audit_function_status\` text DEFAULT 'established' NOT NULL,
  	\`charter_document_id\` text(36),
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`audit_committee_id\`) REFERENCES \`audit_committees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`audit_plan_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`charter_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`internal_audit_function_uuid_idx\` ON \`internal_audit_function\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_tenant_idx\` ON \`internal_audit_function\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_entity_idx\` ON \`internal_audit_function\` (\`entity_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`internal_audit_function_charter_id_idx\` ON \`internal_audit_function\` (\`charter_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_audit_committee_idx\` ON \`internal_audit_function\` (\`audit_committee_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_audit_plan_document_idx\` ON \`internal_audit_function\` (\`audit_plan_document_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_charter_document_idx\` ON \`internal_audit_function\` (\`charter_document_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_updated_at_idx\` ON \`internal_audit_function\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_created_at_idx\` ON \`internal_audit_function\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`internal_audit_function_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_committee_minutes_id\` text(36),
  	\`audit_findings_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`internal_audit_function\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_committee_minutes_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`internal_audit_function_rels_order_idx\` ON \`internal_audit_function_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_rels_parent_idx\` ON \`internal_audit_function_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_rels_path_idx\` ON \`internal_audit_function_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_rels_audit_committee_minutes_id_idx\` ON \`internal_audit_function_rels\` (\`audit_committee_minutes_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_rels_audit_findings_id_idx\` ON \`internal_audit_function_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE TABLE \`e3d8eef548a8d8022abc3af81e21232c6\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`asset_category\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`segment_reporting\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e3d8eef548a8d8022abc3af81e21232c6_order_idx\` ON \`e3d8eef548a8d8022abc3af81e21232c6\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e3d8eef548a8d8022abc3af81e21232c6_parent_id_idx\` ON \`e3d8eef548a8d8022abc3af81e21232c6\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ebe1f8a37cdab80fe87f27a2a9809a286\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`country_code\` text NOT NULL,
  	\`revenue\` numeric NOT NULL,
  	\`assets\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`segment_reporting\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ebe1f8a37cdab80fe87f27a2a9809a286_order_idx\` ON \`ebe1f8a37cdab80fe87f27a2a9809a286\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ebe1f8a37cdab80fe87f27a2a9809a286_parent_id_idx\` ON \`ebe1f8a37cdab80fe87f27a2a9809a286\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`segment_reporting\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`entity_id\` text(36) NOT NULL,
  	\`segmentation_basis\` text NOT NULL,
  	\`reporting_standard\` text NOT NULL,
  	\`fiscal_period\` text NOT NULL,
  	\`segment_name\` text NOT NULL,
  	\`segment_description\` text,
  	\`chief_operating_decision_maker\` text,
  	\`revenue\` numeric NOT NULL,
  	\`external_revenue\` numeric,
  	\`intersegment_revenue\` numeric,
  	\`operating_profit\` numeric,
  	\`interest\` numeric,
  	\`taxes\` numeric,
  	\`net_income\` numeric,
  	\`assets\` numeric NOT NULL,
  	\`liabilities\` numeric NOT NULL,
  	\`capital_expenditures\` numeric,
  	\`depreciation\` numeric,
  	\`impairment_charges\` numeric,
  	\`major_customer_dependency\` integer,
  	\`major_customer_name\` text,
  	\`major_customer_revenue_amount\` numeric,
  	\`major_customer_percentage\` numeric,
  	\`transfer_pricing_policies\` text,
  	\`quantitative_measurements\` text,
  	\`reconciliation_to_consolidated\` text NOT NULL,
  	\`segment_reporting_document_id\` text(36),
  	\`reporting_status\` text DEFAULT 'under-preparation' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`segment_reporting_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`segment_reporting_uuid_idx\` ON \`segment_reporting\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`segment_reporting_tenant_idx\` ON \`segment_reporting\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`segment_reporting_entity_idx\` ON \`segment_reporting\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`segment_reporting_segment_reporting_document_idx\` ON \`segment_reporting\` (\`segment_reporting_document_id\`);`)
  await db.run(sql`CREATE INDEX \`segment_reporting_updated_at_idx\` ON \`segment_reporting\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`segment_reporting_created_at_idx\` ON \`segment_reporting\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`segment_reporting_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`disclosure_checklists_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`segment_reporting\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`disclosure_checklists_id\`) REFERENCES \`disclosure_checklists\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`segment_reporting_rels_order_idx\` ON \`segment_reporting_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`segment_reporting_rels_parent_idx\` ON \`segment_reporting_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`segment_reporting_rels_path_idx\` ON \`segment_reporting_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`segment_reporting_rels_disclosure_checklists_id_idx\` ON \`segment_reporting_rels\` (\`disclosure_checklists_id\`);`)
  await db.run(sql`CREATE TABLE \`consent_records\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`consent_id\` text NOT NULL,
  	\`data_subject_id\` text(36) NOT NULL,
  	\`purpose\` text NOT NULL,
  	\`lawful_basis\` text DEFAULT 'consent',
  	\`consent_text\` text NOT NULL,
  	\`consent_version\` text,
  	\`captured_via\` text,
  	\`ip_address\` text,
  	\`user_agent\` text,
  	\`status\` text DEFAULT 'given',
  	\`given_at\` text,
  	\`withdrawn_at\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`data_subject_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`consent_records_uuid_idx\` ON \`consent_records\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`consent_records_tenant_idx\` ON \`consent_records\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`consent_records_consent_id_idx\` ON \`consent_records\` (\`consent_id\`);`)
  await db.run(sql`CREATE INDEX \`consent_records_data_subject_idx\` ON \`consent_records\` (\`data_subject_id\`);`)
  await db.run(sql`CREATE INDEX \`consent_records_created_by_idx\` ON \`consent_records\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`consent_records_approved_by_idx\` ON \`consent_records\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`consent_records_updated_at_idx\` ON \`consent_records\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`consent_records_created_at_idx\` ON \`consent_records\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`data_subject_requests\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`request_id\` text NOT NULL,
  	\`data_subject_id\` text(36) NOT NULL,
  	\`request_type\` text NOT NULL,
  	\`request_detail\` text,
  	\`submitted_at\` text NOT NULL,
  	\`due_at\` text,
  	\`status\` text DEFAULT 'submitted',
  	\`completed_at\` text,
  	\`fulfilment_evidence\` text,
  	\`handler_id\` text(36),
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`data_subject_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`handler_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`data_subject_requests_uuid_idx\` ON \`data_subject_requests\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`data_subject_requests_tenant_idx\` ON \`data_subject_requests\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`data_subject_requests_request_id_idx\` ON \`data_subject_requests\` (\`request_id\`);`)
  await db.run(sql`CREATE INDEX \`data_subject_requests_data_subject_idx\` ON \`data_subject_requests\` (\`data_subject_id\`);`)
  await db.run(sql`CREATE INDEX \`data_subject_requests_handler_idx\` ON \`data_subject_requests\` (\`handler_id\`);`)
  await db.run(sql`CREATE INDEX \`data_subject_requests_created_by_idx\` ON \`data_subject_requests\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`data_subject_requests_approved_by_idx\` ON \`data_subject_requests\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`data_subject_requests_updated_at_idx\` ON \`data_subject_requests\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`data_subject_requests_created_at_idx\` ON \`data_subject_requests\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`data_subject_requests_locales\` (
  	\`rejection_reason\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`data_subject_requests\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`data_subject_requests_locales_locale_parent_id_unique\` ON \`data_subject_requests_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e89747974e3198578977032ad94a759c1\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`special\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`data_processing_activities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e89747974e3198578977032ad94a759c1_order_idx\` ON \`e89747974e3198578977032ad94a759c1\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e89747974e3198578977032ad94a759c1_parent_id_idx\` ON \`e89747974e3198578977032ad94a759c1\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e4b2d0cf96ff18f2e94f69d77ee2c025f\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`data_processing_activities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e4b2d0cf96ff18f2e94f69d77ee2c025f_order_idx\` ON \`e4b2d0cf96ff18f2e94f69d77ee2c025f\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e4b2d0cf96ff18f2e94f69d77ee2c025f_parent_id_idx\` ON \`e4b2d0cf96ff18f2e94f69d77ee2c025f\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ed5b0fb68f51786feb6e1eee30449385f\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`data_processing_activities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ed5b0fb68f51786feb6e1eee30449385f_order_idx\` ON \`ed5b0fb68f51786feb6e1eee30449385f\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ed5b0fb68f51786feb6e1eee30449385f_parent_id_idx\` ON \`ed5b0fb68f51786feb6e1eee30449385f\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ed5b0fb68f51786feb6e1eee30449385f_locales\` (
  	\`recipient\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ed5b0fb68f51786feb6e1eee30449385f\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`ed5b0fb68f51786feb6e1eee30449385f_locales_locale_parent_id_u\` ON \`ed5b0fb68f51786feb6e1eee30449385f_locales\` (\`_locale\`,\`_parent_id\`);`)
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
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`dpo_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`data_processing_activities_uuid_idx\` ON \`data_processing_activities\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_tenant_idx\` ON \`data_processing_activities\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`data_processing_activities_activity_name_idx\` ON \`data_processing_activities\` (\`activity_name\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_dpo_idx\` ON \`data_processing_activities\` (\`dpo_id\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_created_by_idx\` ON \`data_processing_activities\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_approved_by_idx\` ON \`data_processing_activities\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_updated_at_idx\` ON \`data_processing_activities\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_created_at_idx\` ON \`data_processing_activities\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e1dc5ded7e20c82a1b0dd2f3eaf6425fd\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_type\` text,
  	\`doc_number\` text,
  	\`issuing_country\` text,
  	\`expires_at\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`kyc_checks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e1dc5ded7e20c82a1b0dd2f3eaf6425fd_order_idx\` ON \`e1dc5ded7e20c82a1b0dd2f3eaf6425fd\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e1dc5ded7e20c82a1b0dd2f3eaf6425fd_parent_id_idx\` ON \`e1dc5ded7e20c82a1b0dd2f3eaf6425fd\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`kyc_checks\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`check_id\` text NOT NULL,
  	\`subject_type\` text NOT NULL,
  	\`subject_id\` text(36) NOT NULL,
  	\`cdd_level\` text NOT NULL,
  	\`sanctions_screening_screened_at\` text,
  	\`sanctions_screening_lists\` text,
  	\`sanctions_screening_match_found\` integer DEFAULT false,
  	\`sanctions_screening_match_details\` text,
  	\`pep_status\` text,
  	\`risk_rating\` text,
  	\`status\` text DEFAULT 'pending',
  	\`completed_at\` text,
  	\`next_review_due\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`subject_id\`) REFERENCES \`customers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`kyc_checks_uuid_idx\` ON \`kyc_checks\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`kyc_checks_tenant_idx\` ON \`kyc_checks\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`kyc_checks_check_id_idx\` ON \`kyc_checks\` (\`check_id\`);`)
  await db.run(sql`CREATE INDEX \`kyc_checks_subject_idx\` ON \`kyc_checks\` (\`subject_id\`);`)
  await db.run(sql`CREATE INDEX \`kyc_checks_created_by_idx\` ON \`kyc_checks\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`kyc_checks_approved_by_idx\` ON \`kyc_checks\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`kyc_checks_updated_at_idx\` ON \`kyc_checks\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`kyc_checks_created_at_idx\` ON \`kyc_checks\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`beneficial_owners\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`entity_id\` text(36) NOT NULL,
  	\`full_name\` text NOT NULL,
  	\`date_of_birth\` text,
  	\`nationality\` text,
  	\`residence_country\` text,
  	\`residence_address_id\` text(36),
  	\`ownership_percent\` numeric,
  	\`control_type\` text NOT NULL,
  	\`pep_status\` text,
  	\`kyc_check_id\` text(36),
  	\`status\` text DEFAULT 'active',
  	\`effective_from\` text,
  	\`effective_to\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`residence_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`kyc_check_id\`) REFERENCES \`kyc_checks\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`beneficial_owners_uuid_idx\` ON \`beneficial_owners\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`beneficial_owners_tenant_idx\` ON \`beneficial_owners\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`beneficial_owners_entity_idx\` ON \`beneficial_owners\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`beneficial_owners_residence_address_idx\` ON \`beneficial_owners\` (\`residence_address_id\`);`)
  await db.run(sql`CREATE INDEX \`beneficial_owners_kyc_check_idx\` ON \`beneficial_owners\` (\`kyc_check_id\`);`)
  await db.run(sql`CREATE INDEX \`beneficial_owners_created_by_idx\` ON \`beneficial_owners\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`beneficial_owners_approved_by_idx\` ON \`beneficial_owners\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`beneficial_owners_updated_at_idx\` ON \`beneficial_owners\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`beneficial_owners_created_at_idx\` ON \`beneficial_owners\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e748d22a668778d2291b0c286f5fb0b16\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36) NOT NULL,
  	\`batch_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`batch_id\`) REFERENCES \`batches\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e748d22a668778d2291b0c286f5fb0b16_order_idx\` ON \`e748d22a668778d2291b0c286f5fb0b16\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e748d22a668778d2291b0c286f5fb0b16_parent_id_idx\` ON \`e748d22a668778d2291b0c286f5fb0b16\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e748d22a668778d2291b0c286f5fb0b16_item_idx\` ON \`e748d22a668778d2291b0c286f5fb0b16\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`e748d22a668778d2291b0c286f5fb0b16_batch_idx\` ON \`e748d22a668778d2291b0c286f5fb0b16\` (\`batch_id\`);`)
  await db.run(sql`CREATE TABLE \`packages\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`reference\` text NOT NULL,
  	\`sscc\` text,
  	\`type\` text DEFAULT 'carton',
  	\`parent_package_id\` text(36),
  	\`shipment_id\` text(36),
  	\`measurements_gross_weight\` numeric,
  	\`measurements_net_weight\` numeric,
  	\`measurements_weight_unit_of_measure\` text DEFAULT 'KGM',
  	\`measurements_length\` numeric,
  	\`measurements_width\` numeric,
  	\`measurements_height\` numeric,
  	\`measurements_dimension_unit_of_measure\` text DEFAULT 'CMT',
  	\`warehouse_location_id\` text(36),
  	\`status\` text DEFAULT 'packing',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_package_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`shipment_id\`) REFERENCES \`shipments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`warehouse_location_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`packages_uuid_idx\` ON \`packages\` (\`uuid\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`packages_reference_idx\` ON \`packages\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`packages_sscc_idx\` ON \`packages\` (\`sscc\`);`)
  await db.run(sql`CREATE INDEX \`packages_parent_package_idx\` ON \`packages\` (\`parent_package_id\`);`)
  await db.run(sql`CREATE INDEX \`packages_shipment_idx\` ON \`packages\` (\`shipment_id\`);`)
  await db.run(sql`CREATE INDEX \`packages_warehouse_location_idx\` ON \`packages\` (\`warehouse_location_id\`);`)
  await db.run(sql`CREATE INDEX \`packages_created_by_idx\` ON \`packages\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`packages_approved_by_idx\` ON \`packages\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`packages_updated_at_idx\` ON \`packages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`packages_created_at_idx\` ON \`packages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`messages\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`subject\` text NOT NULL,
  	\`body\` text NOT NULL,
  	\`priority\` text DEFAULT 'normal',
  	\`parent_message_id\` text(36),
  	\`read_at\` text,
  	\`status\` text DEFAULT 'unread',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_message_id\`) REFERENCES \`messages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`messages_uuid_idx\` ON \`messages\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`messages_parent_message_idx\` ON \`messages\` (\`parent_message_id\`);`)
  await db.run(sql`CREATE INDEX \`messages_created_by_idx\` ON \`messages\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`messages_approved_by_idx\` ON \`messages\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`messages_updated_at_idx\` ON \`messages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`messages_created_at_idx\` ON \`messages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`messages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	\`invoices_id\` text(36),
  	\`customers_id\` text(36),
  	\`vendors_id\` text(36),
  	\`sales_orders_id\` text(36),
  	\`purchase_orders_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`messages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`invoices_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`customers_id\`) REFERENCES \`customers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`vendors_id\`) REFERENCES \`vendors\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`sales_orders_id\`) REFERENCES \`sales_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`purchase_orders_id\`) REFERENCES \`purchase_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`messages_rels_order_idx\` ON \`messages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_parent_idx\` ON \`messages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_path_idx\` ON \`messages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_users_id_idx\` ON \`messages_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_invoices_id_idx\` ON \`messages_rels\` (\`invoices_id\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_customers_id_idx\` ON \`messages_rels\` (\`customers_id\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_vendors_id_idx\` ON \`messages_rels\` (\`vendors_id\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_sales_orders_id_idx\` ON \`messages_rels\` (\`sales_orders_id\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_purchase_orders_id_idx\` ON \`messages_rels\` (\`purchase_orders_id\`);`)
  await db.run(sql`CREATE TABLE \`chat\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`event\` text NOT NULL,
  	\`event_uuid\` text NOT NULL,
  	\`aggregate_id\` text,
  	\`agent\` text NOT NULL,
  	\`payload\` text,
  	\`depth\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`chat_uuid_idx\` ON \`chat\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`chat_tenant_idx\` ON \`chat\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`chat_event_idx\` ON \`chat\` (\`event\`);`)
  await db.run(sql`CREATE INDEX \`chat_event_uuid_idx\` ON \`chat\` (\`event_uuid\`);`)
  await db.run(sql`CREATE INDEX \`chat_aggregate_id_idx\` ON \`chat\` (\`aggregate_id\`);`)
  await db.run(sql`CREATE INDEX \`chat_agent_idx\` ON \`chat\` (\`agent\`);`)
  await db.run(sql`CREATE INDEX \`chat_updated_at_idx\` ON \`chat\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`chat_created_at_idx\` ON \`chat\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`csrd_disclosures\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`legal_entity_id\` text(36),
  	\`datapoint_id\` text NOT NULL,
  	\`reporting_year\` numeric NOT NULL,
  	\`esrs_category\` text NOT NULL,
  	\`esrs_topic\` text NOT NULL,
  	\`materiality\` text DEFAULT 'double_material',
  	\`narrative\` text,
  	\`quantitative_kpi_value\` numeric,
  	\`quantitative_kpi_unit\` text,
  	\`quantitative_kpi_methodology\` text,
  	\`quantitative_kpi_prior_year_comparison\` numeric,
  	\`quantitative_kpi_target_value\` numeric,
  	\`quantitative_kpi_target_year\` numeric,
  	\`iro_kind\` text,
  	\`iro_time_horizon\` text,
  	\`iro_value_chain_stage\` text,
  	\`assurance_status\` text DEFAULT 'not_assured',
  	\`assurance_provider\` text,
  	\`evidence_attestation_id\` text(36),
  	\`is_e_u_taxonomy_eligible\` integer DEFAULT false,
  	\`is_e_u_taxonomy_aligned\` integer DEFAULT false,
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`legal_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`evidence_attestation_id\`) REFERENCES \`evidence_attestations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`csrd_disclosures_uuid_idx\` ON \`csrd_disclosures\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`csrd_disclosures_tenant_idx\` ON \`csrd_disclosures\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`csrd_disclosures_legal_entity_idx\` ON \`csrd_disclosures\` (\`legal_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`csrd_disclosures_datapoint_id_idx\` ON \`csrd_disclosures\` (\`datapoint_id\`);`)
  await db.run(sql`CREATE INDEX \`csrd_disclosures_reporting_year_idx\` ON \`csrd_disclosures\` (\`reporting_year\`);`)
  await db.run(sql`CREATE INDEX \`csrd_disclosures_evidence_attestation_idx\` ON \`csrd_disclosures\` (\`evidence_attestation_id\`);`)
  await db.run(sql`CREATE INDEX \`csrd_disclosures_created_by_idx\` ON \`csrd_disclosures\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`csrd_disclosures_approved_by_idx\` ON \`csrd_disclosures\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`csrd_disclosures_updated_at_idx\` ON \`csrd_disclosures\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`csrd_disclosures_created_at_idx\` ON \`csrd_disclosures\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`carbon_emissions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`legal_entity_id\` text(36),
  	\`reporting_year\` numeric NOT NULL,
  	\`reporting_period_id\` text(36),
  	\`scope\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`activity_data_value\` numeric NOT NULL,
  	\`activity_data_unit\` text NOT NULL,
  	\`activity_data_source_description\` text,
  	\`emission_factor_value\` numeric NOT NULL,
  	\`emission_factor_unit\` text NOT NULL,
  	\`emission_factor_source_ref\` text,
  	\`emission_factor_gwp_horizon\` text DEFAULT 'gwp_100',
  	\`t_c_o2e_value\` numeric NOT NULL,
  	\`gas_breakdown_co2\` numeric DEFAULT 0,
  	\`gas_breakdown_ch4\` numeric DEFAULT 0,
  	\`gas_breakdown_n2o\` numeric DEFAULT 0,
  	\`gas_breakdown_hfc\` numeric DEFAULT 0,
  	\`gas_breakdown_pfc\` numeric DEFAULT 0,
  	\`gas_breakdown_sf6\` numeric DEFAULT 0,
  	\`gas_breakdown_nf3\` numeric DEFAULT 0,
  	\`methodology\` text DEFAULT 'spend_based',
  	\`data_quality\` text DEFAULT 'measured',
  	\`is_verified\` integer DEFAULT false,
  	\`verifier_name\` text,
  	\`verification_date\` text,
  	\`evidence_attestation_id\` text(36),
  	\`cbam_relevant\` integer DEFAULT false,
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`legal_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reporting_period_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`evidence_attestation_id\`) REFERENCES \`evidence_attestations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`carbon_emissions_uuid_idx\` ON \`carbon_emissions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`carbon_emissions_tenant_idx\` ON \`carbon_emissions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`carbon_emissions_reference_idx\` ON \`carbon_emissions\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`carbon_emissions_legal_entity_idx\` ON \`carbon_emissions\` (\`legal_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`carbon_emissions_reporting_year_idx\` ON \`carbon_emissions\` (\`reporting_year\`);`)
  await db.run(sql`CREATE INDEX \`carbon_emissions_reporting_period_idx\` ON \`carbon_emissions\` (\`reporting_period_id\`);`)
  await db.run(sql`CREATE INDEX \`carbon_emissions_evidence_attestation_idx\` ON \`carbon_emissions\` (\`evidence_attestation_id\`);`)
  await db.run(sql`CREATE INDEX \`carbon_emissions_created_by_idx\` ON \`carbon_emissions\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`carbon_emissions_approved_by_idx\` ON \`carbon_emissions\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`carbon_emissions_updated_at_idx\` ON \`carbon_emissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`carbon_emissions_created_at_idx\` ON \`carbon_emissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`biological_assets\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`class_kind\` text NOT NULL,
  	\`units_on_hand\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`fair_value_less_costs_to_sell\` numeric NOT NULL,
  	\`prior_period_fvlcts\` numeric,
  	\`biological_transformation_gain_loss\` numeric,
  	\`price_change_gain_loss\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`maturity_stage\` text,
  	\`fair_value_measurement_id\` text(36),
  	\`journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fair_value_measurement_id\`) REFERENCES \`fair_value_measurements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`biological_assets_uuid_idx\` ON \`biological_assets\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`biological_assets_tenant_idx\` ON \`biological_assets\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`biological_assets_reference_idx\` ON \`biological_assets\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`biological_assets_fair_value_measurement_idx\` ON \`biological_assets\` (\`fair_value_measurement_id\`);`)
  await db.run(sql`CREATE INDEX \`biological_assets_journal_entry_idx\` ON \`biological_assets\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`biological_assets_created_by_idx\` ON \`biological_assets\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`biological_assets_approved_by_idx\` ON \`biological_assets\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`biological_assets_updated_at_idx\` ON \`biological_assets\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`biological_assets_created_at_idx\` ON \`biological_assets\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`mineral_resource_assets\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`concession_type\` text NOT NULL,
  	\`jurisdiction\` text,
  	\`concession_id\` text,
  	\`capitalised_amount\` numeric NOT NULL,
  	\`measurement_policy\` text DEFAULT 'cost',
  	\`commercial_viability_date\` text,
  	\`reclassified_to_collection\` text,
  	\`reclassified_to_id\` text,
  	\`impairment_loss\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'exploring',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`mineral_resource_assets_uuid_idx\` ON \`mineral_resource_assets\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`mineral_resource_assets_tenant_idx\` ON \`mineral_resource_assets\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`mineral_resource_assets_reference_idx\` ON \`mineral_resource_assets\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`mineral_resource_assets_created_by_idx\` ON \`mineral_resource_assets\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`mineral_resource_assets_approved_by_idx\` ON \`mineral_resource_assets\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`mineral_resource_assets_updated_at_idx\` ON \`mineral_resource_assets\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`mineral_resource_assets_created_at_idx\` ON \`mineral_resource_assets\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`investment_properties\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`property_id\` text(36) NOT NULL,
  	\`acquisition_date\` text NOT NULL,
  	\`acquisition_cost\` numeric NOT NULL,
  	\`measurement_model\` text DEFAULT 'fair_value' NOT NULL,
  	\`current_fair_value\` numeric,
  	\`fair_value_change_ytd\` numeric DEFAULT 0,
  	\`rental_income_ytd\` numeric DEFAULT 0,
  	\`direct_operating_expenses_ytd\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`transfer_reason\` text,
  	\`lease_id\` text(36),
  	\`fair_value_measurement_id\` text(36),
  	\`journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`property_id\`) REFERENCES \`properties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`lease_id\`) REFERENCES \`leases\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fair_value_measurement_id\`) REFERENCES \`fair_value_measurements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`investment_properties_uuid_idx\` ON \`investment_properties\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`investment_properties_tenant_idx\` ON \`investment_properties\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`investment_properties_reference_idx\` ON \`investment_properties\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`investment_properties_property_idx\` ON \`investment_properties\` (\`property_id\`);`)
  await db.run(sql`CREATE INDEX \`investment_properties_lease_idx\` ON \`investment_properties\` (\`lease_id\`);`)
  await db.run(sql`CREATE INDEX \`investment_properties_fair_value_measurement_idx\` ON \`investment_properties\` (\`fair_value_measurement_id\`);`)
  await db.run(sql`CREATE INDEX \`investment_properties_journal_entry_idx\` ON \`investment_properties\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`investment_properties_created_by_idx\` ON \`investment_properties\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`investment_properties_approved_by_idx\` ON \`investment_properties\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`investment_properties_updated_at_idx\` ON \`investment_properties\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`investment_properties_created_at_idx\` ON \`investment_properties\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`prov_mvmt\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`period_id\` text(36) NOT NULL,
  	\`movement_type\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`journal_entry_id\` text(36),
  	\`movement_date\` text NOT NULL,
  	\`memo\` text,
  	FOREIGN KEY (\`period_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`provisions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`prov_mvmt_order_idx\` ON \`prov_mvmt\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`prov_mvmt_parent_id_idx\` ON \`prov_mvmt\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`prov_mvmt_period_idx\` ON \`prov_mvmt\` (\`period_id\`);`)
  await db.run(sql`CREATE INDEX \`prov_mvmt_journal_entry_idx\` ON \`prov_mvmt\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`provisions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`provision_type\` text NOT NULL,
  	\`legal_entity_id\` text(36),
  	\`recognition_date\` text NOT NULL,
  	\`period_id\` text(36) NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`best_estimate\` numeric NOT NULL,
  	\`undiscounted_amount\` numeric,
  	\`discount_rate\` numeric,
  	\`discounted_amount\` numeric,
  	\`expected_settlement_date\` text,
  	\`expected_settlement_window\` text DEFAULT 'within_12m',
  	\`reimbursement_expected_amount\` numeric DEFAULT 0,
  	\`reimbursement_expected_is_virtually_certain\` integer DEFAULT false,
  	\`reimbursement_expected_reimbursing_party\` text,
  	\`uncertainty_source\` text,
  	\`source_finding_id\` text(36),
  	\`requires_legal_review\` integer DEFAULT false,
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`legal_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`period_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`source_finding_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`provisions_uuid_idx\` ON \`provisions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`provisions_tenant_idx\` ON \`provisions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`provisions_reference_idx\` ON \`provisions\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`provisions_legal_entity_idx\` ON \`provisions\` (\`legal_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`provisions_period_idx\` ON \`provisions\` (\`period_id\`);`)
  await db.run(sql`CREATE INDEX \`provisions_source_finding_idx\` ON \`provisions\` (\`source_finding_id\`);`)
  await db.run(sql`CREATE INDEX \`provisions_created_by_idx\` ON \`provisions\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`provisions_approved_by_idx\` ON \`provisions\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`provisions_updated_at_idx\` ON \`provisions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`provisions_created_at_idx\` ON \`provisions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`grant_cond\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`condition\` text NOT NULL,
  	\`target_date\` text,
  	\`status\` text DEFAULT 'open',
  	\`evidence_ref\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`government_grants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`grant_cond_order_idx\` ON \`grant_cond\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`grant_cond_parent_id_idx\` ON \`grant_cond\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`government_grants\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`grant_name\` text NOT NULL,
  	\`grantor_name\` text NOT NULL,
  	\`grantor_country_code\` text,
  	\`legal_entity_id\` text(36),
  	\`grant_type\` text NOT NULL,
  	\`recognition_method\` text DEFAULT 'deferred_income' NOT NULL,
  	\`recognition_pattern\` text DEFAULT 'systematic_useful_life',
  	\`award_date\` text NOT NULL,
  	\`effective_start_date\` text,
  	\`effective_end_date\` text,
  	\`currency\` text DEFAULT 'EUR',
  	\`total_awarded\` numeric NOT NULL,
  	\`amount_received\` numeric DEFAULT 0,
  	\`recognised_to_date\` numeric DEFAULT 0,
  	\`deferred_income_balance\` numeric DEFAULT 0,
  	\`clawback_provision_id\` text(36),
  	\`is_e_u_funded\` integer DEFAULT false,
  	\`eu_c_f_c_a_reference\` text,
  	\`related_asset_id\` text(36),
  	\`status\` text DEFAULT 'awarded',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`legal_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`clawback_provision_id\`) REFERENCES \`provisions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`related_asset_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`government_grants_uuid_idx\` ON \`government_grants\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`government_grants_tenant_idx\` ON \`government_grants\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`government_grants_reference_idx\` ON \`government_grants\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`government_grants_legal_entity_idx\` ON \`government_grants\` (\`legal_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`government_grants_clawback_provision_idx\` ON \`government_grants\` (\`clawback_provision_id\`);`)
  await db.run(sql`CREATE INDEX \`government_grants_related_asset_idx\` ON \`government_grants\` (\`related_asset_id\`);`)
  await db.run(sql`CREATE INDEX \`government_grants_created_by_idx\` ON \`government_grants\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`government_grants_approved_by_idx\` ON \`government_grants\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`government_grants_updated_at_idx\` ON \`government_grants\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`government_grants_created_at_idx\` ON \`government_grants\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`deferred_tax_items\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`kind\` text NOT NULL,
  	\`classification\` text DEFAULT 'non_current' NOT NULL,
  	\`source_collection\` text,
  	\`source_id\` text,
  	\`jurisdiction_id\` text(36) NOT NULL,
  	\`temporary_difference\` numeric NOT NULL,
  	\`tax_rate\` numeric NOT NULL,
  	\`deferred_tax_amount\` numeric NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`recognition_date\` text NOT NULL,
  	\`expected_reversal_date\` text,
  	\`realisation_probability\` text,
  	\`journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`jurisdiction_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`deferred_tax_items_uuid_idx\` ON \`deferred_tax_items\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`deferred_tax_items_tenant_idx\` ON \`deferred_tax_items\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`deferred_tax_items_reference_idx\` ON \`deferred_tax_items\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`deferred_tax_items_jurisdiction_idx\` ON \`deferred_tax_items\` (\`jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`deferred_tax_items_recognition_date_idx\` ON \`deferred_tax_items\` (\`recognition_date\`);`)
  await db.run(sql`CREATE INDEX \`deferred_tax_items_journal_entry_idx\` ON \`deferred_tax_items\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`deferred_tax_items_created_by_idx\` ON \`deferred_tax_items\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`deferred_tax_items_approved_by_idx\` ON \`deferred_tax_items\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`deferred_tax_items_updated_at_idx\` ON \`deferred_tax_items\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`deferred_tax_items_created_at_idx\` ON \`deferred_tax_items\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`sbp_tranches\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tranche\` numeric NOT NULL,
  	\`vest_date\` text NOT NULL,
  	\`units_vesting\` numeric NOT NULL,
  	\`is_cliff\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`share_based_payments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sbp_tranches_order_idx\` ON \`sbp_tranches\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`sbp_tranches_parent_id_idx\` ON \`sbp_tranches\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`share_based_payments\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`employee_id\` text(36) NOT NULL,
  	\`award_type\` text NOT NULL,
  	\`settlement_type\` text DEFAULT 'equity' NOT NULL,
  	\`grant_date\` text NOT NULL,
  	\`number_of_units\` numeric NOT NULL,
  	\`strike_price\` numeric DEFAULT 0,
  	\`fair_value_at_grant\` numeric NOT NULL,
  	\`total_grant_value\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`vesting_conditions_service_condition_months\` numeric DEFAULT 12,
  	\`vesting_conditions_has_performance_condition\` integer DEFAULT false,
  	\`vesting_conditions_performance_metric\` text,
  	\`vesting_conditions_has_market_condition\` integer DEFAULT false,
  	\`vesting_conditions_market_condition\` text,
  	\`expiration_date\` text,
  	\`forfeiture_rate_assumption\` numeric,
  	\`cumulative_expense_recognised\` numeric DEFAULT 0,
  	\`units_exercised\` numeric DEFAULT 0,
  	\`units_forfeited\` numeric DEFAULT 0,
  	\`units_cancelled\` numeric DEFAULT 0,
  	\`journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'granted',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`employee_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`share_based_payments_uuid_idx\` ON \`share_based_payments\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`share_based_payments_tenant_idx\` ON \`share_based_payments\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`share_based_payments_reference_idx\` ON \`share_based_payments\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`share_based_payments_employee_idx\` ON \`share_based_payments\` (\`employee_id\`);`)
  await db.run(sql`CREATE INDEX \`share_based_payments_grant_date_idx\` ON \`share_based_payments\` (\`grant_date\`);`)
  await db.run(sql`CREATE INDEX \`share_based_payments_journal_entry_idx\` ON \`share_based_payments\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`share_based_payments_created_by_idx\` ON \`share_based_payments\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`share_based_payments_approved_by_idx\` ON \`share_based_payments\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`share_based_payments_updated_at_idx\` ON \`share_based_payments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`share_based_payments_created_at_idx\` ON \`share_based_payments\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`bc_ppa\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`fair_value\` numeric NOT NULL,
  	\`useful_life_years\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`business_combinations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bc_ppa_order_idx\` ON \`bc_ppa\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`bc_ppa_parent_id_idx\` ON \`bc_ppa\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`bc_ppa_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bc_ppa\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`bc_ppa_locales_locale_parent_id_unique\` ON \`bc_ppa_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`business_combinations\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`acquiree_name\` text NOT NULL,
  	\`acquiree_legal_entity_id\` text(36),
  	\`deal_type\` text NOT NULL,
  	\`acquisition_date\` text NOT NULL,
  	\`percentage_acquired\` numeric NOT NULL,
  	\`consideration_transferred\` numeric NOT NULL,
  	\`cash_consideration\` numeric DEFAULT 0,
  	\`equity_consideration\` numeric DEFAULT 0,
  	\`contingent_consideration\` numeric DEFAULT 0,
  	\`nci_fair_value\` numeric DEFAULT 0,
  	\`previously_held_interest_fair_value\` numeric DEFAULT 0,
  	\`fair_value_identifiable_net_assets\` numeric NOT NULL,
  	\`goodwill\` numeric,
  	\`is_bargain_purchase\` integer DEFAULT false,
  	\`currency\` text DEFAULT 'EUR',
  	\`measurement_period_end_date\` text,
  	\`transaction_costs\` numeric DEFAULT 0,
  	\`journal_entry_id\` text(36),
  	\`evidence_attestation_id\` text(36),
  	\`status\` text DEFAULT 'signed',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`acquiree_legal_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`evidence_attestation_id\`) REFERENCES \`evidence_attestations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`business_combinations_uuid_idx\` ON \`business_combinations\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`business_combinations_tenant_idx\` ON \`business_combinations\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`business_combinations_reference_idx\` ON \`business_combinations\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`business_combinations_acquiree_legal_entity_idx\` ON \`business_combinations\` (\`acquiree_legal_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`business_combinations_acquisition_date_idx\` ON \`business_combinations\` (\`acquisition_date\`);`)
  await db.run(sql`CREATE INDEX \`business_combinations_journal_entry_idx\` ON \`business_combinations\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`business_combinations_evidence_attestation_idx\` ON \`business_combinations\` (\`evidence_attestation_id\`);`)
  await db.run(sql`CREATE INDEX \`business_combinations_created_by_idx\` ON \`business_combinations\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`business_combinations_approved_by_idx\` ON \`business_combinations\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`business_combinations_updated_at_idx\` ON \`business_combinations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`business_combinations_created_at_idx\` ON \`business_combinations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`held_for_sale_classifications\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`classification_kind\` text NOT NULL,
  	\`source_collection\` text NOT NULL,
  	\`source_id\` text NOT NULL,
  	\`classification_date\` text NOT NULL,
  	\`expected_sale_date\` text,
  	\`carrying_amount_at_classification\` numeric NOT NULL,
  	\`fair_value\` numeric NOT NULL,
  	\`costs_to_sell\` numeric DEFAULT 0,
  	\`fair_value_less_costs_to_sell\` numeric,
  	\`impairment_loss\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`is_discontinued_operation\` integer DEFAULT false,
  	\`segment\` text,
  	\`actual_sale_date\` text,
  	\`actual_sale_proceeds\` numeric,
  	\`gain_loss_on_disposal\` numeric,
  	\`fair_value_measurement_id\` text(36),
  	\`journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'classified',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fair_value_measurement_id\`) REFERENCES \`fair_value_measurements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`held_for_sale_classifications_uuid_idx\` ON \`held_for_sale_classifications\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_tenant_idx\` ON \`held_for_sale_classifications\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`held_for_sale_classifications_reference_idx\` ON \`held_for_sale_classifications\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_classification_date_idx\` ON \`held_for_sale_classifications\` (\`classification_date\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_fair_value_measurement_idx\` ON \`held_for_sale_classifications\` (\`fair_value_measurement_id\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_journal_entry_idx\` ON \`held_for_sale_classifications\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_created_by_idx\` ON \`held_for_sale_classifications\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_approved_by_idx\` ON \`held_for_sale_classifications\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_updated_at_idx\` ON \`held_for_sale_classifications\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_created_at_idx\` ON \`held_for_sale_classifications\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`fv_l3_inputs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`input_name\` text,
  	\`value\` numeric,
  	\`range_min\` numeric,
  	\`range_max\` numeric,
  	\`sensitivity\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`fair_value_measurements\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`fv_l3_inputs_order_idx\` ON \`fv_l3_inputs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`fv_l3_inputs_parent_id_idx\` ON \`fv_l3_inputs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`fair_value_measurements\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`source_collection\` text NOT NULL,
  	\`source_id\` text NOT NULL,
  	\`level\` text NOT NULL,
  	\`valuation_technique\` text NOT NULL,
  	\`measurement_date\` text NOT NULL,
  	\`fair_value\` numeric NOT NULL,
  	\`prior_fair_value\` numeric,
  	\`fair_value_change\` numeric,
  	\`recognition_route\` text DEFAULT 'p_and_l' NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`principal_market\` text,
  	\`valuer\` text,
  	\`valuation_report_id\` text(36),
  	\`journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`valuation_report_id\`) REFERENCES \`evidence_attestations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`fair_value_measurements_uuid_idx\` ON \`fair_value_measurements\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_tenant_idx\` ON \`fair_value_measurements\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`fair_value_measurements_reference_idx\` ON \`fair_value_measurements\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_source_collection_idx\` ON \`fair_value_measurements\` (\`source_collection\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_source_id_idx\` ON \`fair_value_measurements\` (\`source_id\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_measurement_date_idx\` ON \`fair_value_measurements\` (\`measurement_date\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_valuation_report_idx\` ON \`fair_value_measurements\` (\`valuation_report_id\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_journal_entry_idx\` ON \`fair_value_measurements\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_created_by_idx\` ON \`fair_value_measurements\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_approved_by_idx\` ON \`fair_value_measurements\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_updated_at_idx\` ON \`fair_value_measurements\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_created_at_idx\` ON \`fair_value_measurements\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`eps_share_events\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`event_date\` text NOT NULL,
  	\`event_kind\` text NOT NULL,
  	\`shares_delta\` numeric NOT NULL,
  	\`split_ratio\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`earnings_per_share\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eps_share_events_order_idx\` ON \`eps_share_events\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eps_share_events_parent_id_idx\` ON \`eps_share_events\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`earnings_per_share\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`period_id\` text(36) NOT NULL,
  	\`period_end\` text NOT NULL,
  	\`net_profit_attributable_to_ordinary\` numeric NOT NULL,
  	\`preferred_dividends\` numeric DEFAULT 0,
  	\`basic_eps_numerator\` numeric,
  	\`weighted_average_ordinary_shares\` numeric NOT NULL,
  	\`basic_eps\` numeric,
  	\`dilutive_potential_shares\` numeric DEFAULT 0,
  	\`anti_dilutive_shares\` numeric DEFAULT 0,
  	\`diluted_eps\` numeric,
  	\`continuing_vs_discontinued_continuing_eps_basic\` numeric,
  	\`continuing_vs_discontinued_continuing_eps_diluted\` numeric,
  	\`continuing_vs_discontinued_discontinued_eps_basic\` numeric,
  	\`continuing_vs_discontinued_discontinued_eps_diluted\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`period_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`earnings_per_share_uuid_idx\` ON \`earnings_per_share\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`earnings_per_share_tenant_idx\` ON \`earnings_per_share\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`earnings_per_share_reference_idx\` ON \`earnings_per_share\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`earnings_per_share_period_idx\` ON \`earnings_per_share\` (\`period_id\`);`)
  await db.run(sql`CREATE INDEX \`earnings_per_share_period_end_idx\` ON \`earnings_per_share\` (\`period_end\`);`)
  await db.run(sql`CREATE INDEX \`earnings_per_share_created_by_idx\` ON \`earnings_per_share\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`earnings_per_share_approved_by_idx\` ON \`earnings_per_share\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`earnings_per_share_updated_at_idx\` ON \`earnings_per_share\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`earnings_per_share_created_at_idx\` ON \`earnings_per_share\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`insurance_contracts\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`measurement_model\` text NOT NULL,
  	\`line_of_business\` text NOT NULL,
  	\`portfolio_id\` text NOT NULL,
  	\`cohort_year\` numeric NOT NULL,
  	\`profitability_group\` text NOT NULL,
  	\`inception_date\` text NOT NULL,
  	\`coverage_end_date\` text,
  	\`future_cashflows_estimate\` numeric NOT NULL,
  	\`discount_rate\` numeric NOT NULL,
  	\`risk_adjustment\` numeric DEFAULT 0,
  	\`csm\` numeric DEFAULT 0,
  	\`loss_component\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`reinsurance_contract_id\` text(36),
  	\`fair_value_measurement_id\` text(36),
  	\`journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'recognised',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reinsurance_contract_id\`) REFERENCES \`insurance_contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fair_value_measurement_id\`) REFERENCES \`fair_value_measurements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`insurance_contracts_uuid_idx\` ON \`insurance_contracts\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`insurance_contracts_tenant_idx\` ON \`insurance_contracts\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`insurance_contracts_reference_idx\` ON \`insurance_contracts\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`insurance_contracts_inception_date_idx\` ON \`insurance_contracts\` (\`inception_date\`);`)
  await db.run(sql`CREATE INDEX \`insurance_contracts_reinsurance_contract_idx\` ON \`insurance_contracts\` (\`reinsurance_contract_id\`);`)
  await db.run(sql`CREATE INDEX \`insurance_contracts_fair_value_measurement_idx\` ON \`insurance_contracts\` (\`fair_value_measurement_id\`);`)
  await db.run(sql`CREATE INDEX \`insurance_contracts_journal_entry_idx\` ON \`insurance_contracts\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`insurance_contracts_created_by_idx\` ON \`insurance_contracts\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`insurance_contracts_approved_by_idx\` ON \`insurance_contracts\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`insurance_contracts_updated_at_idx\` ON \`insurance_contracts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`insurance_contracts_created_at_idx\` ON \`insurance_contracts\` (\`created_at\`);`)
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
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`regulatory_deferral_accounts_uuid_idx\` ON \`regulatory_deferral_accounts\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_deferral_accounts_tenant_idx\` ON \`regulatory_deferral_accounts\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`regulatory_deferral_accounts_reference_idx\` ON \`regulatory_deferral_accounts\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_deferral_accounts_created_by_idx\` ON \`regulatory_deferral_accounts\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_deferral_accounts_approved_by_idx\` ON \`regulatory_deferral_accounts\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_deferral_accounts_updated_at_idx\` ON \`regulatory_deferral_accounts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_deferral_accounts_created_at_idx\` ON \`regulatory_deferral_accounts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`post_balance_sheet_events\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`period_id\` text(36) NOT NULL,
  	\`event_date\` text NOT NULL,
  	\`classification\` text NOT NULL,
  	\`event_kind\` text NOT NULL,
  	\`estimated_impact\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`source_collection\` text,
  	\`source_id\` text,
  	\`journal_entry_id\` text(36),
  	\`disclosed_in_f_s\` integer DEFAULT false,
  	\`status\` text DEFAULT 'identified',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`period_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`post_balance_sheet_events_uuid_idx\` ON \`post_balance_sheet_events\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_tenant_idx\` ON \`post_balance_sheet_events\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`post_balance_sheet_events_reference_idx\` ON \`post_balance_sheet_events\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_period_idx\` ON \`post_balance_sheet_events\` (\`period_id\`);`)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_event_date_idx\` ON \`post_balance_sheet_events\` (\`event_date\`);`)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_journal_entry_idx\` ON \`post_balance_sheet_events\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_created_by_idx\` ON \`post_balance_sheet_events\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_approved_by_idx\` ON \`post_balance_sheet_events\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_updated_at_idx\` ON \`post_balance_sheet_events\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_created_at_idx\` ON \`post_balance_sheet_events\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`post_balance_sheet_events_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`post_balance_sheet_events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`post_balance_sheet_events_locales_locale_parent_id_unique\` ON \`post_balance_sheet_events_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`transaction_failures\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`transaction_date\` text NOT NULL,
  	\`source_type\` text NOT NULL,
  	\`source_collection\` text,
  	\`source_id\` text,
  	\`reason\` text NOT NULL,
  	\`status_code\` text NOT NULL,
  	\`error_payload\` text,
  	\`retry_count\` numeric DEFAULT 0,
  	\`max_retries\` numeric DEFAULT 5,
  	\`next_retry_at\` text,
  	\`last_retry_at\` text,
  	\`resolved_by_id\` text(36),
  	\`resolution\` text,
  	\`status\` text DEFAULT 'open',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`resolved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`transaction_failures_uuid_idx\` ON \`transaction_failures\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`transaction_failures_tenant_idx\` ON \`transaction_failures\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`transaction_failures_reference_idx\` ON \`transaction_failures\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`transaction_failures_transaction_date_idx\` ON \`transaction_failures\` (\`transaction_date\`);`)
  await db.run(sql`CREATE INDEX \`transaction_failures_resolved_by_idx\` ON \`transaction_failures\` (\`resolved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`transaction_failures_created_by_idx\` ON \`transaction_failures\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`transaction_failures_approved_by_idx\` ON \`transaction_failures\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`transaction_failures_updated_at_idx\` ON \`transaction_failures\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`transaction_failures_created_at_idx\` ON \`transaction_failures\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`cbcr_row\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`jurisdiction_code\` text NOT NULL,
  	\`unrelated_revenue\` numeric DEFAULT 0,
  	\`related_revenue\` numeric DEFAULT 0,
  	\`total_revenue\` numeric DEFAULT 0,
  	\`profit_before_tax\` numeric DEFAULT 0,
  	\`income_tax_paid_cash\` numeric DEFAULT 0,
  	\`income_tax_accrued\` numeric DEFAULT 0,
  	\`stated_capital\` numeric DEFAULT 0,
  	\`accumulated_earnings\` numeric DEFAULT 0,
  	\`number_of_employees\` numeric DEFAULT 0,
  	\`tangible_assets\` numeric DEFAULT 0,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`transfer_pricing_files\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cbcr_row_order_idx\` ON \`cbcr_row\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cbcr_row_parent_id_idx\` ON \`cbcr_row\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`cbcr_row_jurisdiction_code_idx\` ON \`cbcr_row\` (\`jurisdiction_code\`);`)
  await db.run(sql`CREATE TABLE \`transfer_pricing_files\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`reporting_year\` numeric NOT NULL,
  	\`file_type\` text NOT NULL,
  	\`jurisdiction_code\` text NOT NULL,
  	\`local_file_entity_id\` text(36),
  	\`consolidated_head_entity_id\` text(36),
  	\`master_file_sections_org_structure\` text,
  	\`master_file_sections_business_description\` text,
  	\`master_file_sections_intangibles\` text,
  	\`master_file_sections_intercompany_financial_activities\` text,
  	\`master_file_sections_financial_and_tax_positions\` text,
  	\`local_file_sections_local_entity_description\` text,
  	\`local_file_sections_controlled_transactions\` text,
  	\`local_file_sections_financial_information\` text,
  	\`tp_method\` text,
  	\`reporting_currency\` text DEFAULT 'EUR',
  	\`consolidated_revenue\` numeric,
  	\`cbcr_filing_threshold_met\` integer DEFAULT false,
  	\`pillar_two_applicable\` integer DEFAULT false,
  	\`preparation_date\` text,
  	\`filing_deadline\` text,
  	\`filing_date\` text,
  	\`filing_status\` text DEFAULT 'in_preparation',
  	\`evidence_attestation_id\` text(36),
  	\`apa_reference\` text,
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`local_file_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`consolidated_head_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`evidence_attestation_id\`) REFERENCES \`evidence_attestations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`transfer_pricing_files_uuid_idx\` ON \`transfer_pricing_files\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_files_tenant_idx\` ON \`transfer_pricing_files\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`transfer_pricing_files_reference_idx\` ON \`transfer_pricing_files\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_files_reporting_year_idx\` ON \`transfer_pricing_files\` (\`reporting_year\`);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_files_jurisdiction_code_idx\` ON \`transfer_pricing_files\` (\`jurisdiction_code\`);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_files_local_file_entity_idx\` ON \`transfer_pricing_files\` (\`local_file_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_files_consolidated_head_entity_idx\` ON \`transfer_pricing_files\` (\`consolidated_head_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_files_evidence_attestation_idx\` ON \`transfer_pricing_files\` (\`evidence_attestation_id\`);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_files_created_by_idx\` ON \`transfer_pricing_files\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_files_approved_by_idx\` ON \`transfer_pricing_files\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_files_updated_at_idx\` ON \`transfer_pricing_files\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_files_created_at_idx\` ON \`transfer_pricing_files\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e00d4d9ef3ee486519ef61f236288a7ce\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`other_standard_id\` text(36) NOT NULL,
  	\`law_id\` text,
  	\`severity\` text DEFAULT 'caution',
  	FOREIGN KEY (\`other_standard_id\`) REFERENCES \`standards\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`standards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e00d4d9ef3ee486519ef61f236288a7ce_order_idx\` ON \`e00d4d9ef3ee486519ef61f236288a7ce\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e00d4d9ef3ee486519ef61f236288a7ce_parent_id_idx\` ON \`e00d4d9ef3ee486519ef61f236288a7ce\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e00d4d9ef3ee486519ef61f236288a7ce_other_standard_idx\` ON \`e00d4d9ef3ee486519ef61f236288a7ce\` (\`other_standard_id\`);`)
  await db.run(sql`CREATE TABLE \`e00d4d9ef3ee486519ef61f236288a7ce_locales\` (
  	\`rationale\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e00d4d9ef3ee486519ef61f236288a7ce\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e00d4d9ef3ee486519ef61f236288a7ce_locales_locale_parent_id_u\` ON \`e00d4d9ef3ee486519ef61f236288a7ce_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e27ef0824049282a9a3514febfe91938b\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`module_path\` text NOT NULL,
  	\`banner\` text,
  	\`section\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`standards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e27ef0824049282a9a3514febfe91938b_order_idx\` ON \`e27ef0824049282a9a3514febfe91938b\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e27ef0824049282a9a3514febfe91938b_parent_id_idx\` ON \`e27ef0824049282a9a3514febfe91938b\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`standards\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`tenant_id\` text(36),
  	\`uuid\` text NOT NULL,
  	\`standard_id\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`family\` text NOT NULL,
  	\`publisher\` text,
  	\`version\` text,
  	\`url\` text,
  	\`effective_from\` text,
  	\`effective_until\` text,
  	\`superseded_by_id\` text(36),
  	\`supersession_rationale\` text,
  	\`adoption_status\` text DEFAULT 'required',
  	\`exemption_rationale\` text,
  	\`live_content_uuid\` text,
  	\`did_uri\` text,
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`superseded_by_id\`) REFERENCES \`standards\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`standards_tenant_idx\` ON \`standards\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`standards_uuid_idx\` ON \`standards\` (\`uuid\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`standards_standard_id_idx\` ON \`standards\` (\`standard_id\`);`)
  await db.run(sql`CREATE INDEX \`standards_superseded_by_idx\` ON \`standards\` (\`superseded_by_id\`);`)
  await db.run(sql`CREATE INDEX \`standards_created_by_idx\` ON \`standards\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`standards_approved_by_idx\` ON \`standards\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`standards_updated_at_idx\` ON \`standards\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`standards_created_at_idx\` ON \`standards\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`standards_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`standards_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`standards\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`standards_id\`) REFERENCES \`standards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`standards_rels_order_idx\` ON \`standards_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`standards_rels_parent_idx\` ON \`standards_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`standards_rels_path_idx\` ON \`standards_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`standards_rels_standards_id_idx\` ON \`standards_rels\` (\`standards_id\`);`)
  await db.run(sql`CREATE TABLE \`efd47cc9ff5ea8cf99caa31b20fc740b2\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`collection\` text NOT NULL,
  	\`doc_id\` text NOT NULL,
  	\`edge_kind\` text DEFAULT 'about',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`memories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`efd47cc9ff5ea8cf99caa31b20fc740b2_order_idx\` ON \`efd47cc9ff5ea8cf99caa31b20fc740b2\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`efd47cc9ff5ea8cf99caa31b20fc740b2_parent_id_idx\` ON \`efd47cc9ff5ea8cf99caa31b20fc740b2\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`memories\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`tenant_id\` text(36),
  	\`uuid\` text NOT NULL,
  	\`memory_ref\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`body\` text,
  	\`owner_type\` text NOT NULL,
  	\`owner_id\` text NOT NULL,
  	\`kind\` text NOT NULL,
  	\`key\` text NOT NULL,
  	\`payload\` text,
  	\`rationale\` text,
  	\`recorded_at\` text NOT NULL,
  	\`expires_at\` text,
  	\`content_uuid\` text,
  	\`cycle_uuid\` text,
  	\`emitted_from_event\` text,
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`memories_tenant_idx\` ON \`memories\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`memories_uuid_idx\` ON \`memories\` (\`uuid\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`memories_memory_ref_idx\` ON \`memories\` (\`memory_ref\`);`)
  await db.run(sql`CREATE INDEX \`memories_key_idx\` ON \`memories\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`memories_content_uuid_idx\` ON \`memories\` (\`content_uuid\`);`)
  await db.run(sql`CREATE INDEX \`memories_cycle_uuid_idx\` ON \`memories\` (\`cycle_uuid\`);`)
  await db.run(sql`CREATE INDEX \`memories_created_by_idx\` ON \`memories\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`memories_approved_by_idx\` ON \`memories\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`memories_updated_at_idx\` ON \`memories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`memories_created_at_idx\` ON \`memories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`ef88c2ed312a88bb190229980a3720e72\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`mcp_tool_metadata\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ef88c2ed312a88bb190229980a3720e72_order_idx\` ON \`ef88c2ed312a88bb190229980a3720e72\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ef88c2ed312a88bb190229980a3720e72_parent_id_idx\` ON \`ef88c2ed312a88bb190229980a3720e72\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`mcp_tool_metadata\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`tenant_id\` text(36),
  	\`uuid\` text NOT NULL,
  	\`tool_name\` text NOT NULL,
  	\`area\` text NOT NULL,
  	\`enabled\` integer DEFAULT true,
  	\`last_synced_from_catalog_at\` text,
  	\`status\` text DEFAULT 'enabled',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`mcp_tool_metadata_tenant_idx\` ON \`mcp_tool_metadata\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`mcp_tool_metadata_uuid_idx\` ON \`mcp_tool_metadata\` (\`uuid\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`mcp_tool_metadata_tool_name_idx\` ON \`mcp_tool_metadata\` (\`tool_name\`);`)
  await db.run(sql`CREATE INDEX \`mcp_tool_metadata_created_by_idx\` ON \`mcp_tool_metadata\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`mcp_tool_metadata_approved_by_idx\` ON \`mcp_tool_metadata\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`mcp_tool_metadata_updated_at_idx\` ON \`mcp_tool_metadata\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`mcp_tool_metadata_created_at_idx\` ON \`mcp_tool_metadata\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`mcp_tool_metadata_locales\` (
  	\`description\` text NOT NULL,
  	\`display_name\` text,
  	\`documentation_url\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`mcp_tool_metadata\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`mcp_tool_metadata_locales_locale_parent_id_unique\` ON \`mcp_tool_metadata_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`eec49ec68ab2a8e6985f5d5422fa6267d\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`collection\` text NOT NULL,
  	\`doc_id\` text NOT NULL,
  	\`edge_kind\` text DEFAULT 'translates',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`translations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eec49ec68ab2a8e6985f5d5422fa6267d_order_idx\` ON \`eec49ec68ab2a8e6985f5d5422fa6267d\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eec49ec68ab2a8e6985f5d5422fa6267d_parent_id_idx\` ON \`eec49ec68ab2a8e6985f5d5422fa6267d\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`translations\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`tenant_id\` text(36),
  	\`uuid\` text NOT NULL,
  	\`translation_key\` text NOT NULL,
  	\`scope\` text NOT NULL,
  	\`key\` text NOT NULL,
  	\`overrides_collection\` text,
  	\`overrides_doc_id\` text,
  	\`effective_from\` text,
  	\`effective_until\` text,
  	\`content_uuid\` text,
  	\`shared_across_role_profile\` text,
  	\`status\` text DEFAULT 'pending_approval',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`translations_tenant_idx\` ON \`translations\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`translations_uuid_idx\` ON \`translations\` (\`uuid\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`translations_translation_key_idx\` ON \`translations\` (\`translation_key\`);`)
  await db.run(sql`CREATE INDEX \`translations_key_idx\` ON \`translations\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`translations_content_uuid_idx\` ON \`translations\` (\`content_uuid\`);`)
  await db.run(sql`CREATE INDEX \`translations_created_by_idx\` ON \`translations\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`translations_approved_by_idx\` ON \`translations\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`translations_updated_at_idx\` ON \`translations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`translations_created_at_idx\` ON \`translations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`translations_locales\` (
  	\`value\` text NOT NULL,
  	\`note\` text,
  	\`overrides_platform_default\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`translations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`translations_locales_locale_parent_id_unique\` ON \`translations_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`commitments\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`commitment_number\` text NOT NULL,
  	\`commitment_amount\` numeric NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`commitment_description\` text NOT NULL,
  	\`authorization_level\` text NOT NULL,
  	\`authorized_by_id\` text(36) NOT NULL,
  	\`authorization_date\` text NOT NULL,
  	\`authorization_expiry_date\` text,
  	\`approval_status\` text DEFAULT 'draft' NOT NULL,
  	\`spending_profile_department\` text,
  	\`spending_profile_budget_line\` text,
  	\`spending_profile_vendor_name\` text,
  	\`budget_reservation_reserved_amount\` numeric DEFAULT 0,
  	\`budget_reservation_committed_amount\` numeric DEFAULT 0,
  	\`budget_reservation_spent_amount\` numeric DEFAULT 0,
  	\`budget_reservation_available_balance\` numeric DEFAULT 0,
  	\`linked_purchase_order_id\` text(36),
  	\`linked_contract_id\` text(36),
  	\`zkod_mandatory_arbitration_clause\` integer DEFAULT true,
  	\`zkod_zkod_commitment_number\` text,
  	\`zkod_zkod_notarized\` integer DEFAULT false,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`approval_comments\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`authorized_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`linked_purchase_order_id\`) REFERENCES \`purchase_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`linked_contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`commitments_uuid_idx\` ON \`commitments\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`commitments_tenant_idx\` ON \`commitments\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`commitments_commitment_number_idx\` ON \`commitments\` (\`commitment_number\`);`)
  await db.run(sql`CREATE INDEX \`commitments_authorized_by_idx\` ON \`commitments\` (\`authorized_by_id\`);`)
  await db.run(sql`CREATE INDEX \`commitments_linked_purchase_order_idx\` ON \`commitments\` (\`linked_purchase_order_id\`);`)
  await db.run(sql`CREATE INDEX \`commitments_linked_contract_idx\` ON \`commitments\` (\`linked_contract_id\`);`)
  await db.run(sql`CREATE INDEX \`commitments_created_by_idx\` ON \`commitments\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`commitments_approved_by_idx\` ON \`commitments\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`commitments_updated_at_idx\` ON \`commitments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`commitments_created_at_idx\` ON \`commitments\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`contract_amendments\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`amendment_title\` text NOT NULL,
  	\`contract_id\` text(36) NOT NULL,
  	\`amendment_date\` text NOT NULL,
  	\`modification_reason\` text NOT NULL,
  	\`original_terms_summary\` text NOT NULL,
  	\`new_effective_terms\` text NOT NULL,
  	\`revenue_impact_amount\` numeric DEFAULT 0 NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`impact_classification\` text NOT NULL,
  	\`variance_analysis_planned_completion_date\` text,
  	\`variance_analysis_revised_completion_date\` text,
  	\`variance_analysis_completion_date_variance_days\` numeric,
  	\`approval_status\` text DEFAULT 'draft' NOT NULL,
  	\`zkod_zkod_notarized\` integer DEFAULT false,
  	\`zkod_zkod_notary_reference\` text,
  	\`zkod_mandatory_arbitration\` integer DEFAULT false,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`internal_notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`contract_amendments_uuid_idx\` ON \`contract_amendments\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`contract_amendments_tenant_idx\` ON \`contract_amendments\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_amendments_contract_idx\` ON \`contract_amendments\` (\`contract_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_amendments_created_by_idx\` ON \`contract_amendments\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_amendments_approved_by_idx\` ON \`contract_amendments\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_amendments_updated_at_idx\` ON \`contract_amendments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`contract_amendments_created_at_idx\` ON \`contract_amendments\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`contract_performance\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`contract_id\` text(36) NOT NULL,
  	\`performance_obligation_index\` numeric,
  	\`milestone_title\` text NOT NULL,
  	\`milestone_sequence\` numeric NOT NULL,
  	\`acceptance_criteria\` text NOT NULL,
  	\`control_transfer_method\` text NOT NULL,
  	\`planned_completion_date\` text NOT NULL,
  	\`actual_completion_date\` text,
  	\`completion_date_variance_days\` numeric,
  	\`completion_status\` text DEFAULT 'not_started' NOT NULL,
  	\`control_transferred_at\` text,
  	\`associated_invoice_id\` text(36),
  	\`revenue_recognized_amount\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`revenue_recognized_at\` text,
  	\`associated_sales_order_id\` text(36),
  	\`zkod_zkod_acceptance_protocol_date\` text,
  	\`zkod_zkod_acceptance_protocol_number\` text,
  	\`zkod_mandatory_arbitration\` integer DEFAULT false,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`performance_notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`associated_invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`associated_sales_order_id\`) REFERENCES \`sales_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`contract_performance_uuid_idx\` ON \`contract_performance\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_tenant_idx\` ON \`contract_performance\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_contract_idx\` ON \`contract_performance\` (\`contract_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_associated_invoice_idx\` ON \`contract_performance\` (\`associated_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_associated_sales_order_idx\` ON \`contract_performance\` (\`associated_sales_order_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_created_by_idx\` ON \`contract_performance\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_approved_by_idx\` ON \`contract_performance\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_updated_at_idx\` ON \`contract_performance\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_created_at_idx\` ON \`contract_performance\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`contract_signatures\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`signature_title\` text NOT NULL,
  	\`contract_id\` text(36) NOT NULL,
  	\`signature_sequence\` numeric NOT NULL,
  	\`signatory_role\` text NOT NULL,
  	\`signatory_name\` text NOT NULL,
  	\`signatory_email\` text,
  	\`signatory_title\` text,
  	\`signature_status\` text DEFAULT 'draft' NOT NULL,
  	\`signature_timestamp\` text,
  	\`signature_provider\` text,
  	\`signature_verification_url\` text,
  	\`digital_certificate_verified\` integer DEFAULT false,
  	\`pdf_storage_link\` text,
  	\`rejection_info_rejection_reason\` text,
  	\`rejection_info_rejected_by_id\` text(36),
  	\`rejection_info_rejected_at\` text,
  	\`zkod_zkod_notarized\` integer DEFAULT false,
  	\`zkod_zkod_notary_reference\` text,
  	\`zkod_mandatory_arbitration_attested\` integer DEFAULT false,
  	\`zkod_bulgaria_eid_verified\` integer DEFAULT false,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`approval_comments\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`rejection_info_rejected_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`contract_signatures_uuid_idx\` ON \`contract_signatures\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`contract_signatures_tenant_idx\` ON \`contract_signatures\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_signatures_contract_idx\` ON \`contract_signatures\` (\`contract_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_signatures_signature_status_idx\` ON \`contract_signatures\` (\`signature_status\`);`)
  await db.run(sql`CREATE INDEX \`contract_signatures_rejection_info_rejection_info_reject_idx\` ON \`contract_signatures\` (\`rejection_info_rejected_by_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_signatures_created_by_idx\` ON \`contract_signatures\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_signatures_approved_by_idx\` ON \`contract_signatures\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_signatures_updated_at_idx\` ON \`contract_signatures\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`contract_signatures_created_at_idx\` ON \`contract_signatures\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`legal_entities\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`legal_name\` text NOT NULL,
  	\`trade_name\` text,
  	\`legal_form\` text,
  	\`country_code\` text NOT NULL,
  	\`registration_number\` text NOT NULL,
  	\`vat_number\` text,
  	\`lei\` text,
  	\`consolidation_method\` text DEFAULT 'full',
  	\`consolidation_status\` text DEFAULT 'subsidiary',
  	\`is_head_entity\` integer DEFAULT false,
  	\`parent_id\` text(36),
  	\`ownership_percent\` numeric,
  	\`voting_percent\` numeric,
  	\`functional_currency\` text DEFAULT 'EUR',
  	\`presentation_currency\` text DEFAULT 'EUR',
  	\`reporting_framework\` text DEFAULT 'ifrs',
  	\`ifrs_adoption_date\` text,
  	\`statutory_year_end\` text,
  	\`registered_address_street\` text,
  	\`registered_address_city\` text,
  	\`registered_address_postal_code\` text,
  	\`registered_address_region\` text,
  	\`registered_address_country_code\` text,
  	\`sic_code\` text,
  	\`nace_code\` text,
  	\`effective_from\` text NOT NULL,
  	\`effective_to\` text,
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`legal_entities_uuid_idx\` ON \`legal_entities\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`legal_entities_tenant_idx\` ON \`legal_entities\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`legal_entities_legal_name_idx\` ON \`legal_entities\` (\`legal_name\`);`)
  await db.run(sql`CREATE INDEX \`legal_entities_country_code_idx\` ON \`legal_entities\` (\`country_code\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`legal_entities_registration_number_idx\` ON \`legal_entities\` (\`registration_number\`);`)
  await db.run(sql`CREATE INDEX \`legal_entities_vat_number_idx\` ON \`legal_entities\` (\`vat_number\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`legal_entities_lei_idx\` ON \`legal_entities\` (\`lei\`);`)
  await db.run(sql`CREATE INDEX \`legal_entities_parent_idx\` ON \`legal_entities\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`legal_entities_created_by_idx\` ON \`legal_entities\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`legal_entities_approved_by_idx\` ON \`legal_entities\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`legal_entities_updated_at_idx\` ON \`legal_entities\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`legal_entities_created_at_idx\` ON \`legal_entities\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`ai_suggestions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`suggestion_id\` text NOT NULL,
  	\`feature\` text NOT NULL,
  	\`model\` text NOT NULL,
  	\`inference_time\` text NOT NULL,
  	\`inputs\` text NOT NULL,
  	\`outputs\` text NOT NULL,
  	\`confidence\` numeric,
  	\`ai_risk_class\` text DEFAULT 'limited' NOT NULL,
  	\`source_collection\` text,
  	\`source_id\` text,
  	\`human_decision\` text DEFAULT 'pending',
  	\`decision_maker_id\` text(36),
  	\`decision_at\` text,
  	\`decision_rationale\` text,
  	\`applied_to\` text,
  	\`gateway_gateway_id\` text,
  	\`gateway_cache_status\` text,
  	\`gateway_tokens_in\` numeric,
  	\`gateway_tokens_out\` numeric,
  	\`gateway_latency_ms\` numeric,
  	\`gateway_usage_record_id\` text(36),
  	\`status\` text DEFAULT 'recorded',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`decision_maker_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gateway_usage_record_id\`) REFERENCES \`usage_records\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`ai_suggestions_uuid_idx\` ON \`ai_suggestions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`ai_suggestions_tenant_idx\` ON \`ai_suggestions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`ai_suggestions_suggestion_id_idx\` ON \`ai_suggestions\` (\`suggestion_id\`);`)
  await db.run(sql`CREATE INDEX \`ai_suggestions_feature_idx\` ON \`ai_suggestions\` (\`feature\`);`)
  await db.run(sql`CREATE INDEX \`ai_suggestions_model_idx\` ON \`ai_suggestions\` (\`model\`);`)
  await db.run(sql`CREATE INDEX \`ai_suggestions_inference_time_idx\` ON \`ai_suggestions\` (\`inference_time\`);`)
  await db.run(sql`CREATE INDEX \`ai_suggestions_source_collection_idx\` ON \`ai_suggestions\` (\`source_collection\`);`)
  await db.run(sql`CREATE INDEX \`ai_suggestions_source_id_idx\` ON \`ai_suggestions\` (\`source_id\`);`)
  await db.run(sql`CREATE INDEX \`ai_suggestions_decision_maker_idx\` ON \`ai_suggestions\` (\`decision_maker_id\`);`)
  await db.run(sql`CREATE INDEX \`ai_suggestions_gateway_gateway_usage_record_idx\` ON \`ai_suggestions\` (\`gateway_usage_record_id\`);`)
  await db.run(sql`CREATE INDEX \`ai_suggestions_created_by_idx\` ON \`ai_suggestions\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`ai_suggestions_approved_by_idx\` ON \`ai_suggestions\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`ai_suggestions_updated_at_idx\` ON \`ai_suggestions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`ai_suggestions_created_at_idx\` ON \`ai_suggestions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`usage_records\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`event_id\` text NOT NULL,
  	\`feature\` text NOT NULL,
  	\`meter_kind\` text DEFAULT 'count' NOT NULL,
  	\`quantity\` numeric DEFAULT 1 NOT NULL,
  	\`event_time\` text NOT NULL,
  	\`billing_period\` text NOT NULL,
  	\`subscription_id\` text(36),
  	\`source_collection\` text,
  	\`source_id\` text,
  	\`rate\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`amount\` numeric DEFAULT 0,
  	\`invoice_id\` text(36),
  	\`status\` text DEFAULT 'recorded',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`subscription_id\`) REFERENCES \`subscriptions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`usage_records_uuid_idx\` ON \`usage_records\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`usage_records_tenant_idx\` ON \`usage_records\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`usage_records_event_id_idx\` ON \`usage_records\` (\`event_id\`);`)
  await db.run(sql`CREATE INDEX \`usage_records_feature_idx\` ON \`usage_records\` (\`feature\`);`)
  await db.run(sql`CREATE INDEX \`usage_records_event_time_idx\` ON \`usage_records\` (\`event_time\`);`)
  await db.run(sql`CREATE INDEX \`usage_records_billing_period_idx\` ON \`usage_records\` (\`billing_period\`);`)
  await db.run(sql`CREATE INDEX \`usage_records_subscription_idx\` ON \`usage_records\` (\`subscription_id\`);`)
  await db.run(sql`CREATE INDEX \`usage_records_invoice_idx\` ON \`usage_records\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`usage_records_created_by_idx\` ON \`usage_records\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`usage_records_approved_by_idx\` ON \`usage_records\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`usage_records_updated_at_idx\` ON \`usage_records\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`usage_records_created_at_idx\` ON \`usage_records\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e6cabc1f1ac608b48984c03e53002797a\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence_number\` numeric NOT NULL,
  	\`journal_entry_id_id\` text(36),
  	\`from_entity\` text NOT NULL,
  	\`to_entity\` text NOT NULL,
  	\`account\` text NOT NULL,
  	\`account_type\` text,
  	\`elimination_amount\` numeric NOT NULL,
  	\`description\` text,
  	\`posted\` integer DEFAULT false,
  	\`posted_date\` text,
  	FOREIGN KEY (\`journal_entry_id_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`consolidations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e6cabc1f1ac608b48984c03e53002797a_order_idx\` ON \`e6cabc1f1ac608b48984c03e53002797a\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e6cabc1f1ac608b48984c03e53002797a_parent_id_idx\` ON \`e6cabc1f1ac608b48984c03e53002797a\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e6cabc1f1ac608b48984c03e53002797a_journal_entry_id_idx\` ON \`e6cabc1f1ac608b48984c03e53002797a\` (\`journal_entry_id_id\`);`)
  await db.run(sql`CREATE TABLE \`consolidations\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`consolidation_name\` text NOT NULL,
  	\`consolidation_group_id\` text(36) NOT NULL,
  	\`fiscal_year\` numeric NOT NULL,
  	\`period_closing_date\` text NOT NULL,
  	\`consolidation_currency\` text,
  	\`consolidation_type\` text NOT NULL,
  	\`consolidated_by_id\` text(36),
  	\`consolidation_status\` text DEFAULT 'in-progress' NOT NULL,
  	\`consolidation_readiness\` text,
  	\`governance_scope\` text,
  	\`chain_leaf_uuid\` text,
  	\`audit_trail\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`consolidation_group_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`consolidated_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`consolidations_uuid_idx\` ON \`consolidations\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`consolidations_tenant_idx\` ON \`consolidations\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`consolidations_consolidation_name_idx\` ON \`consolidations\` (\`consolidation_name\`);`)
  await db.run(sql`CREATE INDEX \`consolidations_consolidation_group_idx\` ON \`consolidations\` (\`consolidation_group_id\`);`)
  await db.run(sql`CREATE INDEX \`consolidations_consolidated_by_idx\` ON \`consolidations\` (\`consolidated_by_id\`);`)
  await db.run(sql`CREATE INDEX \`consolidations_updated_at_idx\` ON \`consolidations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`consolidations_created_at_idx\` ON \`consolidations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`consolidations_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`legal_entities_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`consolidations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`legal_entities_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`consolidations_rels_order_idx\` ON \`consolidations_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`consolidations_rels_parent_idx\` ON \`consolidations_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`consolidations_rels_path_idx\` ON \`consolidations_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`consolidations_rels_legal_entities_id_idx\` ON \`consolidations_rels\` (\`legal_entities_id\`);`)
  await db.run(sql`CREATE TABLE \`eb6304bde8ac98a988117180add07de51\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence_number\` numeric NOT NULL,
  	\`journal_entry_id_id\` text(36),
  	\`from_entity\` text NOT NULL,
  	\`to_entity\` text NOT NULL,
  	\`account\` text NOT NULL,
  	\`account_type\` text,
  	\`adjustment_amount\` numeric NOT NULL,
  	\`description\` text,
  	\`posted\` integer DEFAULT false,
  	\`posted_date\` text,
  	FOREIGN KEY (\`journal_entry_id_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tax_periods\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eb6304bde8ac98a988117180add07de51_order_idx\` ON \`eb6304bde8ac98a988117180add07de51\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eb6304bde8ac98a988117180add07de51_parent_id_idx\` ON \`eb6304bde8ac98a988117180add07de51\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`eb6304bde8ac98a988117180add07de51_journal_entry_id_idx\` ON \`eb6304bde8ac98a988117180add07de51\` (\`journal_entry_id_id\`);`)
  await db.run(sql`CREATE TABLE \`tax_periods\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`tax_period_name\` text NOT NULL,
  	\`tax_jurisdiction\` text NOT NULL,
  	\`tax_period_type\` text NOT NULL,
  	\`fiscal_period_id_id\` text(36) NOT NULL,
  	\`tax_period_end_date\` text NOT NULL,
  	\`filing_deadline\` text NOT NULL,
  	\`tax_currency\` text,
  	\`filed_by_id\` text(36),
  	\`tax_status\` text DEFAULT 'pending-closing' NOT NULL,
  	\`tax_period_readiness\` text,
  	\`transfer_pricing_adjustment_count\` numeric,
  	\`governance_scope\` text,
  	\`chain_leaf_uuid\` text,
  	\`audit_trail\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fiscal_period_id_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`filed_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tax_periods_uuid_idx\` ON \`tax_periods\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`tax_periods_tenant_idx\` ON \`tax_periods\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tax_periods_tax_period_name_idx\` ON \`tax_periods\` (\`tax_period_name\`);`)
  await db.run(sql`CREATE INDEX \`tax_periods_fiscal_period_id_idx\` ON \`tax_periods\` (\`fiscal_period_id_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_periods_filed_by_idx\` ON \`tax_periods\` (\`filed_by_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_periods_updated_at_idx\` ON \`tax_periods\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tax_periods_created_at_idx\` ON \`tax_periods\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e98126fc1e3858f72a76a355f88289eb6\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`jurisdiction_code\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_reports\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e98126fc1e3858f72a76a355f88289eb6_order_idx\` ON \`e98126fc1e3858f72a76a355f88289eb6\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e98126fc1e3858f72a76a355f88289eb6_parent_id_idx\` ON \`e98126fc1e3858f72a76a355f88289eb6\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e4c59bd52eb4f82d6a279a9499d2e35c8\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`jurisdiction\` text NOT NULL,
  	\`filing_type\` text,
  	\`filing_format\` text,
  	\`filing_deadline\` text,
  	\`submission_method\` text,
  	\`submission_status\` text DEFAULT 'draft',
  	\`submission_date\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_reports\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e4c59bd52eb4f82d6a279a9499d2e35c8_order_idx\` ON \`e4c59bd52eb4f82d6a279a9499d2e35c8\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e4c59bd52eb4f82d6a279a9499d2e35c8_parent_id_idx\` ON \`e4c59bd52eb4f82d6a279a9499d2e35c8\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ebf8b394d0fdc86c18e4f79da4d0015e7\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`jurisdiction\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e6443025e2e8e8ce299e90c6ffbf537d7\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ebf8b394d0fdc86c18e4f79da4d0015e7_order_idx\` ON \`ebf8b394d0fdc86c18e4f79da4d0015e7\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ebf8b394d0fdc86c18e4f79da4d0015e7_parent_id_idx\` ON \`ebf8b394d0fdc86c18e4f79da4d0015e7\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e6443025e2e8e8ce299e90c6ffbf537d7\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`optimization_type\` text NOT NULL,
  	\`estimated_tax_savings\` numeric,
  	\`savings_currency\` text,
  	\`compliance_risk\` text,
  	\`description\` text,
  	\`recommended_action\` text,
  	\`implementation_status\` text DEFAULT 'recommended',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_reports\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e6443025e2e8e8ce299e90c6ffbf537d7_order_idx\` ON \`e6443025e2e8e8ce299e90c6ffbf537d7\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e6443025e2e8e8ce299e90c6ffbf537d7_parent_id_idx\` ON \`e6443025e2e8e8ce299e90c6ffbf537d7\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`audit_reports\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`audit_report_name\` text NOT NULL,
  	\`audit_year\` numeric NOT NULL,
  	\`consolidation_id_id\` text(36),
  	\`report_type\` text NOT NULL,
  	\`generated_by_id\` text(36),
  	\`audit_status\` text DEFAULT 'pending-generation' NOT NULL,
  	\`audit_report_content\` text,
  	\`transfer_pricing_package\` text,
  	\`validation_status\` text DEFAULT 'pending-review',
  	\`governance_scope\` text,
  	\`chain_leaf_uuid\` text,
  	\`audit_trail\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`consolidation_id_id\`) REFERENCES \`consolidations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`generated_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`audit_reports_uuid_idx\` ON \`audit_reports\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`audit_reports_tenant_idx\` ON \`audit_reports\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`audit_reports_audit_report_name_idx\` ON \`audit_reports\` (\`audit_report_name\`);`)
  await db.run(sql`CREATE INDEX \`audit_reports_consolidation_id_idx\` ON \`audit_reports\` (\`consolidation_id_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_reports_generated_by_idx\` ON \`audit_reports\` (\`generated_by_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_reports_updated_at_idx\` ON \`audit_reports\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`audit_reports_created_at_idx\` ON \`audit_reports\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`transfer_pricing_adjustments\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`adjustment_description\` text NOT NULL,
  	\`tax_jurisdiction\` text NOT NULL,
  	\`tax_period_id\` text(36),
  	\`from_entity\` text NOT NULL,
  	\`to_entity\` text NOT NULL,
  	\`transaction_type\` text NOT NULL,
  	\`original_amount\` numeric NOT NULL,
  	\`adjusted_amount\` numeric NOT NULL,
  	\`adjustment_amount\` numeric,
  	\`method_used\` text NOT NULL,
  	\`adjustment_reason\` text NOT NULL,
  	\`supporting_documentation\` text NOT NULL,
  	\`documentation_status\` text DEFAULT 'draft',
  	\`adjustment_date\` text NOT NULL,
  	\`audit_trail\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tax_period_id\`) REFERENCES \`tax_periods\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`transfer_pricing_adjustments_uuid_idx\` ON \`transfer_pricing_adjustments\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_adjustments_tenant_idx\` ON \`transfer_pricing_adjustments\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`transfer_pricing_adjustments_adjustment_description_idx\` ON \`transfer_pricing_adjustments\` (\`adjustment_description\`);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_adjustments_tax_period_idx\` ON \`transfer_pricing_adjustments\` (\`tax_period_id\`);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_adjustments_updated_at_idx\` ON \`transfer_pricing_adjustments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_adjustments_created_at_idx\` ON \`transfer_pricing_adjustments\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`transfer_pricing_adjustments_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`journal_entries_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`transfer_pricing_adjustments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`journal_entries_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`transfer_pricing_adjustments_rels_order_idx\` ON \`transfer_pricing_adjustments_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_adjustments_rels_parent_idx\` ON \`transfer_pricing_adjustments_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_adjustments_rels_path_idx\` ON \`transfer_pricing_adjustments_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_adjustments_rels_journal_entries_id_idx\` ON \`transfer_pricing_adjustments_rels\` (\`journal_entries_id\`);`)
  await db.run(sql`CREATE TABLE \`post_close_analytics_reports\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`analytics_report_name\` text NOT NULL,
  	\`fiscal_year\` numeric NOT NULL,
  	\`audit_report_id_id\` text(36),
  	\`consolidation_id_id\` text(36),
  	\`report_type\` text,
  	\`generated_by_id\` text(36),
  	\`analysis_status\` text DEFAULT 'pending-analysis' NOT NULL,
  	\`variance_analysis_report\` text,
  	\`ratio_analysis_report\` text,
  	\`segment_analysis_report\` text,
  	\`management_reporting_summary\` text,
  	\`executive_summary_text\` text,
  	\`validation_status\` text DEFAULT 'pending-review',
  	\`governance_scope\` text,
  	\`chain_leaf_uuid\` text,
  	\`analytics_trail\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`audit_report_id_id\`) REFERENCES \`audit_reports\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`consolidation_id_id\`) REFERENCES \`consolidations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`generated_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`post_close_analytics_reports_uuid_idx\` ON \`post_close_analytics_reports\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`post_close_analytics_reports_tenant_idx\` ON \`post_close_analytics_reports\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`post_close_analytics_reports_analytics_report_name_idx\` ON \`post_close_analytics_reports\` (\`analytics_report_name\`);`)
  await db.run(sql`CREATE INDEX \`post_close_analytics_reports_audit_report_id_idx\` ON \`post_close_analytics_reports\` (\`audit_report_id_id\`);`)
  await db.run(sql`CREATE INDEX \`post_close_analytics_reports_consolidation_id_idx\` ON \`post_close_analytics_reports\` (\`consolidation_id_id\`);`)
  await db.run(sql`CREATE INDEX \`post_close_analytics_reports_generated_by_idx\` ON \`post_close_analytics_reports\` (\`generated_by_id\`);`)
  await db.run(sql`CREATE INDEX \`post_close_analytics_reports_updated_at_idx\` ON \`post_close_analytics_reports\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`post_close_analytics_reports_created_at_idx\` ON \`post_close_analytics_reports\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`efcc0fcec210180b68b558b4fd7cc7f1d\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`group\` text,
  	\`rate\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`fiscal_devices\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`efcc0fcec210180b68b558b4fd7cc7f1d_order_idx\` ON \`efcc0fcec210180b68b558b4fd7cc7f1d\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`efcc0fcec210180b68b558b4fd7cc7f1d_parent_id_idx\` ON \`efcc0fcec210180b68b558b4fd7cc7f1d\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`fiscal_devices\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`individual_number\` text NOT NULL,
  	\`model\` text,
  	\`manufacturer\` text,
  	\`currency\` text,
  	\`default_operator_id\` text(36),
  	\`default_terminal_id\` text(36),
  	\`status\` text DEFAULT 'active',
  	\`registered_at\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`default_operator_id\`) REFERENCES \`operators\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`default_terminal_id\`) REFERENCES \`terminals\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`fiscal_devices_uuid_idx\` ON \`fiscal_devices\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_devices_tenant_idx\` ON \`fiscal_devices\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`fiscal_devices_individual_number_idx\` ON \`fiscal_devices\` (\`individual_number\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_devices_default_operator_idx\` ON \`fiscal_devices\` (\`default_operator_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_devices_default_terminal_idx\` ON \`fiscal_devices\` (\`default_terminal_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_devices_created_by_idx\` ON \`fiscal_devices\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_devices_approved_by_idx\` ON \`fiscal_devices\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_devices_updated_at_idx\` ON \`fiscal_devices\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_devices_created_at_idx\` ON \`fiscal_devices\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e9749956a340987ec9eeac999bdcebefd\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`description\` text,
  	\`quantity\` numeric DEFAULT 1,
  	\`unit_price\` numeric DEFAULT 0,
  	\`vat_rate\` numeric DEFAULT 0,
  	\`amount\` numeric DEFAULT 0,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sales\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e9749956a340987ec9eeac999bdcebefd_order_idx\` ON \`e9749956a340987ec9eeac999bdcebefd\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e9749956a340987ec9eeac999bdcebefd_parent_id_idx\` ON \`e9749956a340987ec9eeac999bdcebefd\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`sales\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`unp\` text,
  	\`unp_sequence\` numeric,
  	\`fiscal_device_number\` text NOT NULL,
  	\`fiscal_device_id\` text(36),
  	\`operator_code\` text DEFAULT '0000',
  	\`sale_date\` text NOT NULL,
  	\`status\` text DEFAULT 'open',
  	\`total\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`payment_type\` text DEFAULT 'cash',
  	\`fiscal_receipt_number\` text,
  	\`operator_id\` text(36),
  	\`terminal_id\` text(36),
  	\`receipt_id\` text(36),
  	\`source_type\` text,
  	\`source_ref\` text,
  	\`reversal_of_id\` text(36),
  	\`reversed_by_id\` text(36),
  	\`reversal_reason\` text,
  	\`closed_at\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fiscal_device_id\`) REFERENCES \`fiscal_devices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`operator_id\`) REFERENCES \`operators\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`terminal_id\`) REFERENCES \`terminals\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`receipt_id\`) REFERENCES \`receipts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reversal_of_id\`) REFERENCES \`sales\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reversed_by_id\`) REFERENCES \`sales\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sales_uuid_idx\` ON \`sales\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`sales_tenant_idx\` ON \`sales\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`sales_unp_idx\` ON \`sales\` (\`unp\`);`)
  await db.run(sql`CREATE INDEX \`sales_fiscal_device_number_idx\` ON \`sales\` (\`fiscal_device_number\`);`)
  await db.run(sql`CREATE INDEX \`sales_fiscal_device_idx\` ON \`sales\` (\`fiscal_device_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_operator_idx\` ON \`sales\` (\`operator_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_terminal_idx\` ON \`sales\` (\`terminal_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_receipt_idx\` ON \`sales\` (\`receipt_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_source_source_type_idx\` ON \`sales\` (\`source_type\`);`)
  await db.run(sql`CREATE INDEX \`sales_source_source_ref_idx\` ON \`sales\` (\`source_ref\`);`)
  await db.run(sql`CREATE INDEX \`sales_reversal_of_idx\` ON \`sales\` (\`reversal_of_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_reversed_by_idx\` ON \`sales\` (\`reversed_by_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_created_by_idx\` ON \`sales\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_approved_by_idx\` ON \`sales\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_updated_at_idx\` ON \`sales\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`sales_created_at_idx\` ON \`sales\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e63b40236bd7481698a9e62f00c83c76d\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`group\` text,
  	\`rate\` numeric,
  	\`net\` numeric,
  	\`vat\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`receipts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e63b40236bd7481698a9e62f00c83c76d_order_idx\` ON \`e63b40236bd7481698a9e62f00c83c76d\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e63b40236bd7481698a9e62f00c83c76d_parent_id_idx\` ON \`e63b40236bd7481698a9e62f00c83c76d\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`edc80b35eb7c98472b2e2fc49f713ea39\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`description\` text,
  	\`quantity\` numeric DEFAULT 1,
  	\`unit_price\` numeric DEFAULT 0,
  	\`vat_rate\` numeric DEFAULT 0,
  	\`amount\` numeric DEFAULT 0,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`receipts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`edc80b35eb7c98472b2e2fc49f713ea39_order_idx\` ON \`edc80b35eb7c98472b2e2fc49f713ea39\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`edc80b35eb7c98472b2e2fc49f713ea39_parent_id_idx\` ON \`edc80b35eb7c98472b2e2fc49f713ea39\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`receipts\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`receipt_number\` text,
  	\`unp\` text,
  	\`sale_id\` text(36),
  	\`fiscal_device_number\` text,
  	\`operator_code\` text DEFAULT '0000',
  	\`virtual_pos_terminal_id\` text(36),
  	\`qr_data\` text,
  	\`issued_at\` text,
  	\`total\` numeric DEFAULT 0,
  	\`vat_total\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`payment_type\` text DEFAULT 'cash',
  	\`delivered_to\` text,
  	\`status\` text DEFAULT 'issued',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`sale_id\`) REFERENCES \`sales\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`virtual_pos_terminal_id\`) REFERENCES \`terminals\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`receipts_uuid_idx\` ON \`receipts\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`receipts_tenant_idx\` ON \`receipts\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`receipts_receipt_number_idx\` ON \`receipts\` (\`receipt_number\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`receipts_unp_idx\` ON \`receipts\` (\`unp\`);`)
  await db.run(sql`CREATE INDEX \`receipts_sale_idx\` ON \`receipts\` (\`sale_id\`);`)
  await db.run(sql`CREATE INDEX \`receipts_fiscal_device_number_idx\` ON \`receipts\` (\`fiscal_device_number\`);`)
  await db.run(sql`CREATE INDEX \`receipts_virtual_pos_terminal_idx\` ON \`receipts\` (\`virtual_pos_terminal_id\`);`)
  await db.run(sql`CREATE INDEX \`receipts_created_by_idx\` ON \`receipts\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`receipts_approved_by_idx\` ON \`receipts\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`receipts_updated_at_idx\` ON \`receipts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`receipts_created_at_idx\` ON \`receipts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`operators\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`code\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`user_id\` text(36),
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`operators_uuid_idx\` ON \`operators\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`operators_tenant_idx\` ON \`operators\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`operators_code_idx\` ON \`operators\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`operators_user_idx\` ON \`operators\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`operators_created_by_idx\` ON \`operators\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`operators_approved_by_idx\` ON \`operators\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`operators_updated_at_idx\` ON \`operators\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`operators_created_at_idx\` ON \`operators\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`terminals\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`terminal_number\` text NOT NULL,
  	\`provider\` text,
  	\`account_number\` text,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`terminals_uuid_idx\` ON \`terminals\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`terminals_tenant_idx\` ON \`terminals\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`terminals_terminal_number_idx\` ON \`terminals\` (\`terminal_number\`);`)
  await db.run(sql`CREATE INDEX \`terminals_created_by_idx\` ON \`terminals\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`terminals_approved_by_idx\` ON \`terminals\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`terminals_updated_at_idx\` ON \`terminals\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`terminals_created_at_idx\` ON \`terminals\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`audit_submissions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`period_start\` text NOT NULL,
  	\`period_end\` text NOT NULL,
  	\`count\` numeric DEFAULT 0,
  	\`control_sum\` numeric DEFAULT 0,
  	\`status\` text DEFAULT 'built',
  	\`submitted_at\` text,
  	\`nap_response\` text,
  	\`xml\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`audit_submissions_uuid_idx\` ON \`audit_submissions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`audit_submissions_tenant_idx\` ON \`audit_submissions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_submissions_created_by_idx\` ON \`audit_submissions\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_submissions_approved_by_idx\` ON \`audit_submissions\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_submissions_updated_at_idx\` ON \`audit_submissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`audit_submissions_created_at_idx\` ON \`audit_submissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`addresses\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`customer_id\` text(36),
  	\`title\` text,
  	\`first_name\` text,
  	\`last_name\` text,
  	\`company\` text,
  	\`address_line1\` text,
  	\`address_line2\` text,
  	\`city\` text,
  	\`state\` text,
  	\`postal_code\` text,
  	\`country\` text NOT NULL,
  	\`phone\` text,
  	\`code\` text,
  	\`name\` text,
  	\`email\` text,
  	\`tax_type\` text,
  	\`tax_code\` text,
  	\`tax_rate\` numeric,
  	\`nin_code\` text,
  	\`currency_code\` text DEFAULT 'EUR',
  	\`debit_account_id\` text(36),
  	\`credit_account_id\` text(36),
  	\`cash_account_id\` text(36),
  	\`note\` text,
  	\`is_default\` integer DEFAULT false,
  	\`metadata\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cash_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`addresses_uuid_idx\` ON \`addresses\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`addresses_tenant_idx\` ON \`addresses\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`addresses_customer_idx\` ON \`addresses\` (\`customer_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`addresses_code_idx\` ON \`addresses\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`addresses_tax_code_idx\` ON \`addresses\` (\`tax_code\`);`)
  await db.run(sql`CREATE INDEX \`addresses_nin_code_idx\` ON \`addresses\` (\`nin_code\`);`)
  await db.run(sql`CREATE INDEX \`addresses_debit_account_idx\` ON \`addresses\` (\`debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`addresses_credit_account_idx\` ON \`addresses\` (\`credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`addresses_cash_account_idx\` ON \`addresses\` (\`cash_account_id\`);`)
  await db.run(sql`CREATE INDEX \`addresses_updated_at_idx\` ON \`addresses\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`addresses_created_at_idx\` ON \`addresses\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`variants\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`title\` text,
  	\`product_id\` text(36),
  	\`inventory\` numeric DEFAULT 0,
  	\`price_in_e_u_r_enabled\` integer,
  	\`price_in_e_u_r\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`deleted_at\` text,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`variants_uuid_idx\` ON \`variants\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`variants_tenant_idx\` ON \`variants\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`variants_product_idx\` ON \`variants\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX \`variants_updated_at_idx\` ON \`variants\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`variants_created_at_idx\` ON \`variants\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`variants_deleted_at_idx\` ON \`variants\` (\`deleted_at\`);`)
  await db.run(sql`CREATE INDEX \`variants__status_idx\` ON \`variants\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`variants_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`variant_options_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`variant_options_id\`) REFERENCES \`variant_options\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`variants_rels_order_idx\` ON \`variants_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`variants_rels_parent_idx\` ON \`variants_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`variants_rels_path_idx\` ON \`variants_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`variants_rels_variant_options_id_idx\` ON \`variants_rels\` (\`variant_options_id\`);`)
  await db.run(sql`CREATE TABLE \`_variants_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_title\` text,
  	\`version_product_id\` text(36),
  	\`version_inventory\` numeric DEFAULT 0,
  	\`version_price_in_e_u_r_enabled\` integer,
  	\`version_price_in_e_u_r\` numeric,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version_deleted_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_variants_v_parent_idx\` ON \`_variants_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_version_version_uuid_idx\` ON \`_variants_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_version_version_tenant_idx\` ON \`_variants_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_version_version_product_idx\` ON \`_variants_v\` (\`version_product_id\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_version_version_updated_at_idx\` ON \`_variants_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_version_version_created_at_idx\` ON \`_variants_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_version_version_deleted_at_idx\` ON \`_variants_v\` (\`version_deleted_at\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_version_version__status_idx\` ON \`_variants_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_created_at_idx\` ON \`_variants_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_updated_at_idx\` ON \`_variants_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_snapshot_idx\` ON \`_variants_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_published_locale_idx\` ON \`_variants_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_latest_idx\` ON \`_variants_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_autosave_idx\` ON \`_variants_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_variants_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`variant_options_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_variants_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`variant_options_id\`) REFERENCES \`variant_options\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_variants_v_rels_order_idx\` ON \`_variants_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_rels_parent_idx\` ON \`_variants_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_rels_path_idx\` ON \`_variants_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_rels_variant_options_id_idx\` ON \`_variants_v_rels\` (\`variant_options_id\`);`)
  await db.run(sql`CREATE TABLE \`variant_types\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`label\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`deleted_at\` text,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`variant_types_uuid_idx\` ON \`variant_types\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`variant_types_tenant_idx\` ON \`variant_types\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`variant_types_updated_at_idx\` ON \`variant_types\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`variant_types_created_at_idx\` ON \`variant_types\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`variant_types_deleted_at_idx\` ON \`variant_types\` (\`deleted_at\`);`)
  await db.run(sql`CREATE TABLE \`variant_options\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`_variantoptions_options_order\` text,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`variant_type_id\` text(36) NOT NULL,
  	\`label\` text NOT NULL,
  	\`value\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`deleted_at\` text,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_type_id\`) REFERENCES \`variant_types\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`variant_options__variantoptions_options_order_idx\` ON \`variant_options\` (\`_variantoptions_options_order\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`variant_options_uuid_idx\` ON \`variant_options\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`variant_options_tenant_idx\` ON \`variant_options\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`variant_options_variant_type_idx\` ON \`variant_options\` (\`variant_type_id\`);`)
  await db.run(sql`CREATE INDEX \`variant_options_updated_at_idx\` ON \`variant_options\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`variant_options_created_at_idx\` ON \`variant_options\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`variant_options_deleted_at_idx\` ON \`variant_options\` (\`deleted_at\`);`)
  await db.run(sql`CREATE TABLE \`e807e5fa7ee658a6daf578f601def9edb\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` text(36),
  	\`variant_option_id\` text(36),
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_option_id\`) REFERENCES \`variant_options\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e807e5fa7ee658a6daf578f601def9edb_order_idx\` ON \`e807e5fa7ee658a6daf578f601def9edb\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e807e5fa7ee658a6daf578f601def9edb_parent_id_idx\` ON \`e807e5fa7ee658a6daf578f601def9edb\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e807e5fa7ee658a6daf578f601def9edb_image_idx\` ON \`e807e5fa7ee658a6daf578f601def9edb\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`e807e5fa7ee658a6daf578f601def9edb_variant_option_idx\` ON \`e807e5fa7ee658a6daf578f601def9edb\` (\`variant_option_id\`);`)
  await db.run(sql`CREATE TABLE \`e706ae1eff60a86858e60d43a8408a40c\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e2d7410d34f388b4e91b8d3253617c145\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e706ae1eff60a86858e60d43a8408a40c_order_idx\` ON \`e706ae1eff60a86858e60d43a8408a40c\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e706ae1eff60a86858e60d43a8408a40c_parent_id_idx\` ON \`e706ae1eff60a86858e60d43a8408a40c\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e2d7410d34f388b4e91b8d3253617c145\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e2d7410d34f388b4e91b8d3253617c145_order_idx\` ON \`e2d7410d34f388b4e91b8d3253617c145\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e2d7410d34f388b4e91b8d3253617c145_parent_id_idx\` ON \`e2d7410d34f388b4e91b8d3253617c145\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e2d7410d34f388b4e91b8d3253617c145_path_idx\` ON \`e2d7410d34f388b4e91b8d3253617c145\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`e8be93ceba4838a2ea2eb22b6dbda9f7d\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'oneThird',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e3e08cdb269b3896c82e9ebaf3a7cdad9\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e8be93ceba4838a2ea2eb22b6dbda9f7d_order_idx\` ON \`e8be93ceba4838a2ea2eb22b6dbda9f7d\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e8be93ceba4838a2ea2eb22b6dbda9f7d_parent_id_idx\` ON \`e8be93ceba4838a2ea2eb22b6dbda9f7d\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e3e08cdb269b3896c82e9ebaf3a7cdad9\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e3e08cdb269b3896c82e9ebaf3a7cdad9_order_idx\` ON \`e3e08cdb269b3896c82e9ebaf3a7cdad9\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e3e08cdb269b3896c82e9ebaf3a7cdad9_parent_id_idx\` ON \`e3e08cdb269b3896c82e9ebaf3a7cdad9\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e3e08cdb269b3896c82e9ebaf3a7cdad9_path_idx\` ON \`e3e08cdb269b3896c82e9ebaf3a7cdad9\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`ed959efe1dd6a86dc91541e91cc18f307\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` text(36),
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ed959efe1dd6a86dc91541e91cc18f307_order_idx\` ON \`ed959efe1dd6a86dc91541e91cc18f307\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ed959efe1dd6a86dc91541e91cc18f307_parent_id_idx\` ON \`ed959efe1dd6a86dc91541e91cc18f307\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ed959efe1dd6a86dc91541e91cc18f307_path_idx\` ON \`ed959efe1dd6a86dc91541e91cc18f307\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`ed959efe1dd6a86dc91541e91cc18f307_media_idx\` ON \`ed959efe1dd6a86dc91541e91cc18f307\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`products\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`title\` text,
  	\`description\` text,
  	\`inventory\` numeric DEFAULT 0,
  	\`enable_variants\` integer,
  	\`price_in_e_u_r_enabled\` integer,
  	\`price_in_e_u_r\` numeric,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`deleted_at\` text,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`products_uuid_idx\` ON \`products\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`products_tenant_idx\` ON \`products\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`products_slug_idx\` ON \`products\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`products_updated_at_idx\` ON \`products\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`products_created_at_idx\` ON \`products\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`products_deleted_at_idx\` ON \`products\` (\`deleted_at\`);`)
  await db.run(sql`CREATE INDEX \`products__status_idx\` ON \`products\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`products_locales\` (
  	\`meta_title\` text,
  	\`meta_image_id\` text(36),
  	\`meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_meta_meta_image_idx\` ON \`products_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`products_locales_locale_parent_id_unique\` ON \`products_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	\`variant_types_id\` text(36),
  	\`products_id\` text(36),
  	\`categories_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`variant_types_id\`) REFERENCES \`variant_types\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_rels_order_idx\` ON \`products_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_parent_idx\` ON \`products_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_path_idx\` ON \`products_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_pages_id_idx\` ON \`products_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_posts_id_idx\` ON \`products_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_variant_types_id_idx\` ON \`products_rels\` (\`variant_types_id\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_products_id_idx\` ON \`products_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_categories_id_idx\` ON \`products_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE TABLE \`_e807e5fa7ee658a6daf578f601def9edb_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`image_id\` text(36),
  	\`variant_option_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_option_id\`) REFERENCES \`variant_options\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e807e5fa7ee658a6daf578f601def9edb_v_order_idx\` ON \`_e807e5fa7ee658a6daf578f601def9edb_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e807e5fa7ee658a6daf578f601def9edb_v_parent_id_idx\` ON \`_e807e5fa7ee658a6daf578f601def9edb_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e807e5fa7ee658a6daf578f601def9edb_v_image_idx\` ON \`_e807e5fa7ee658a6daf578f601def9edb_v\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_e807e5fa7ee658a6daf578f601def9edb_v_variant_option_idx\` ON \`_e807e5fa7ee658a6daf578f601def9edb_v\` (\`variant_option_id\`);`)
  await db.run(sql`CREATE TABLE \`_e706ae1eff60a86858e60d43a8408a40c_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e2d7410d34f388b4e91b8d3253617c145_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e706ae1eff60a86858e60d43a8408a40c_v_order_idx\` ON \`_e706ae1eff60a86858e60d43a8408a40c_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e706ae1eff60a86858e60d43a8408a40c_v_parent_id_idx\` ON \`_e706ae1eff60a86858e60d43a8408a40c_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e2d7410d34f388b4e91b8d3253617c145_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e2d7410d34f388b4e91b8d3253617c145_v_order_idx\` ON \`_e2d7410d34f388b4e91b8d3253617c145_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e2d7410d34f388b4e91b8d3253617c145_v_parent_id_idx\` ON \`_e2d7410d34f388b4e91b8d3253617c145_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e2d7410d34f388b4e91b8d3253617c145_v_path_idx\` ON \`_e2d7410d34f388b4e91b8d3253617c145_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_e8be93ceba4838a2ea2eb22b6dbda9f7d_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'oneThird',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e3e08cdb269b3896c82e9ebaf3a7cdad9_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e8be93ceba4838a2ea2eb22b6dbda9f7d_v_order_idx\` ON \`_e8be93ceba4838a2ea2eb22b6dbda9f7d_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e8be93ceba4838a2ea2eb22b6dbda9f7d_v_parent_id_idx\` ON \`_e8be93ceba4838a2ea2eb22b6dbda9f7d_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e3e08cdb269b3896c82e9ebaf3a7cdad9_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e3e08cdb269b3896c82e9ebaf3a7cdad9_v_order_idx\` ON \`_e3e08cdb269b3896c82e9ebaf3a7cdad9_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e3e08cdb269b3896c82e9ebaf3a7cdad9_v_parent_id_idx\` ON \`_e3e08cdb269b3896c82e9ebaf3a7cdad9_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e3e08cdb269b3896c82e9ebaf3a7cdad9_v_path_idx\` ON \`_e3e08cdb269b3896c82e9ebaf3a7cdad9_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_ed959efe1dd6a86dc91541e91cc18f307_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`media_id\` text(36),
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ed959efe1dd6a86dc91541e91cc18f307_v_order_idx\` ON \`_ed959efe1dd6a86dc91541e91cc18f307_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ed959efe1dd6a86dc91541e91cc18f307_v_parent_id_idx\` ON \`_ed959efe1dd6a86dc91541e91cc18f307_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ed959efe1dd6a86dc91541e91cc18f307_v_path_idx\` ON \`_ed959efe1dd6a86dc91541e91cc18f307_v\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_ed959efe1dd6a86dc91541e91cc18f307_v_media_idx\` ON \`_ed959efe1dd6a86dc91541e91cc18f307_v\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_title\` text,
  	\`version_description\` text,
  	\`version_inventory\` numeric DEFAULT 0,
  	\`version_enable_variants\` integer,
  	\`version_price_in_e_u_r_enabled\` integer,
  	\`version_price_in_e_u_r\` numeric,
  	\`version_generate_slug\` integer DEFAULT true,
  	\`version_slug\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version_deleted_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_parent_idx\` ON \`_products_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_uuid_idx\` ON \`_products_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_tenant_idx\` ON \`_products_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_slug_idx\` ON \`_products_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_updated_at_idx\` ON \`_products_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_created_at_idx\` ON \`_products_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_deleted_at_idx\` ON \`_products_v\` (\`version_deleted_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version__status_idx\` ON \`_products_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_created_at_idx\` ON \`_products_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_updated_at_idx\` ON \`_products_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_snapshot_idx\` ON \`_products_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_published_locale_idx\` ON \`_products_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_latest_idx\` ON \`_products_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_autosave_idx\` ON \`_products_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_locales\` (
  	\`version_meta_title\` text,
  	\`version_meta_image_id\` text(36),
  	\`version_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_meta_version_meta_image_idx\` ON \`_products_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_products_v_locales_locale_parent_id_unique\` ON \`_products_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	\`variant_types_id\` text(36),
  	\`products_id\` text(36),
  	\`categories_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`variant_types_id\`) REFERENCES \`variant_types\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_rels_order_idx\` ON \`_products_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_rels_parent_idx\` ON \`_products_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_rels_path_idx\` ON \`_products_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_rels_pages_id_idx\` ON \`_products_v_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_rels_posts_id_idx\` ON \`_products_v_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_rels_variant_types_id_idx\` ON \`_products_v_rels\` (\`variant_types_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_rels_products_id_idx\` ON \`_products_v_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_rels_categories_id_idx\` ON \`_products_v_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE TABLE \`e36231b73e55787b6bbebfd9458a6c7d6\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`product_id\` text(36),
  	\`variant_id\` text(36),
  	\`quantity\` numeric DEFAULT 1 NOT NULL,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`carts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e36231b73e55787b6bbebfd9458a6c7d6_order_idx\` ON \`e36231b73e55787b6bbebfd9458a6c7d6\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e36231b73e55787b6bbebfd9458a6c7d6_parent_id_idx\` ON \`e36231b73e55787b6bbebfd9458a6c7d6\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e36231b73e55787b6bbebfd9458a6c7d6_product_idx\` ON \`e36231b73e55787b6bbebfd9458a6c7d6\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX \`e36231b73e55787b6bbebfd9458a6c7d6_variant_idx\` ON \`e36231b73e55787b6bbebfd9458a6c7d6\` (\`variant_id\`);`)
  await db.run(sql`CREATE TABLE \`carts\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`secret\` text,
  	\`customer_id\` text(36),
  	\`purchased_at\` text,
  	\`subtotal\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`carts_uuid_idx\` ON \`carts\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`carts_tenant_idx\` ON \`carts\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`carts_secret_idx\` ON \`carts\` (\`secret\`);`)
  await db.run(sql`CREATE INDEX \`carts_customer_idx\` ON \`carts\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`carts_updated_at_idx\` ON \`carts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`carts_created_at_idx\` ON \`carts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`e3acbac9f125c8bad9fe2ad09574853a0\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`product_id\` text(36),
  	\`variant_id\` text(36),
  	\`quantity\` numeric DEFAULT 1 NOT NULL,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e3acbac9f125c8bad9fe2ad09574853a0_order_idx\` ON \`e3acbac9f125c8bad9fe2ad09574853a0\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e3acbac9f125c8bad9fe2ad09574853a0_parent_id_idx\` ON \`e3acbac9f125c8bad9fe2ad09574853a0\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e3acbac9f125c8bad9fe2ad09574853a0_product_idx\` ON \`e3acbac9f125c8bad9fe2ad09574853a0\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX \`e3acbac9f125c8bad9fe2ad09574853a0_variant_idx\` ON \`e3acbac9f125c8bad9fe2ad09574853a0\` (\`variant_id\`);`)
  await db.run(sql`CREATE TABLE \`orders\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`shipping_address_title\` text,
  	\`shipping_address_first_name\` text,
  	\`shipping_address_last_name\` text,
  	\`shipping_address_company\` text,
  	\`shipping_address_address_line1\` text,
  	\`shipping_address_address_line2\` text,
  	\`shipping_address_city\` text,
  	\`shipping_address_state\` text,
  	\`shipping_address_postal_code\` text,
  	\`shipping_address_country\` text,
  	\`shipping_address_phone\` text,
  	\`customer_id\` text(36),
  	\`customer_email\` text,
  	\`status\` text DEFAULT 'processing',
  	\`amount\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`access_token\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_uuid_idx\` ON \`orders\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`orders_tenant_idx\` ON \`orders\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_customer_idx\` ON \`orders\` (\`customer_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_access_token_idx\` ON \`orders\` (\`access_token\`);`)
  await db.run(sql`CREATE INDEX \`orders_updated_at_idx\` ON \`orders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`orders_created_at_idx\` ON \`orders\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`orders_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`transactions_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`transactions_id\`) REFERENCES \`transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`orders_rels_order_idx\` ON \`orders_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`orders_rels_parent_idx\` ON \`orders_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_rels_path_idx\` ON \`orders_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`orders_rels_transactions_id_idx\` ON \`orders_rels\` (\`transactions_id\`);`)
  await db.run(sql`CREATE TABLE \`e4375580a944f874eb05f54d12cb85d91\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`product_id\` text(36),
  	\`variant_id\` text(36),
  	\`quantity\` numeric DEFAULT 1 NOT NULL,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e4375580a944f874eb05f54d12cb85d91_order_idx\` ON \`e4375580a944f874eb05f54d12cb85d91\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e4375580a944f874eb05f54d12cb85d91_parent_id_idx\` ON \`e4375580a944f874eb05f54d12cb85d91\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e4375580a944f874eb05f54d12cb85d91_product_idx\` ON \`e4375580a944f874eb05f54d12cb85d91\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX \`e4375580a944f874eb05f54d12cb85d91_variant_idx\` ON \`e4375580a944f874eb05f54d12cb85d91\` (\`variant_id\`);`)
  await db.run(sql`CREATE TABLE \`transactions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`payment_method\` text,
  	\`stripe_customer_i_d\` text,
  	\`stripe_payment_intent_i_d\` text,
  	\`billing_address_title\` text,
  	\`billing_address_first_name\` text,
  	\`billing_address_last_name\` text,
  	\`billing_address_company\` text,
  	\`billing_address_address_line1\` text,
  	\`billing_address_address_line2\` text,
  	\`billing_address_city\` text,
  	\`billing_address_state\` text,
  	\`billing_address_postal_code\` text,
  	\`billing_address_country\` text,
  	\`billing_address_phone\` text,
  	\`status\` text DEFAULT 'pending' NOT NULL,
  	\`customer_id\` text(36),
  	\`customer_email\` text,
  	\`order_id\` text(36),
  	\`cart_id\` text(36),
  	\`amount\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cart_id\`) REFERENCES \`carts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`transactions_uuid_idx\` ON \`transactions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`transactions_tenant_idx\` ON \`transactions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`transactions_customer_idx\` ON \`transactions\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`transactions_order_idx\` ON \`transactions\` (\`order_id\`);`)
  await db.run(sql`CREATE INDEX \`transactions_cart_idx\` ON \`transactions\` (\`cart_id\`);`)
  await db.run(sql`CREATE INDEX \`transactions_updated_at_idx\` ON \`transactions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`transactions_created_at_idx\` ON \`transactions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`ec7b0187f544b883ba491da04c8bac20f\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`default_value\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ec7b0187f544b883ba491da04c8bac20f_order_idx\` ON \`ec7b0187f544b883ba491da04c8bac20f\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ec7b0187f544b883ba491da04c8bac20f_parent_id_idx\` ON \`ec7b0187f544b883ba491da04c8bac20f\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ec7b0187f544b883ba491da04c8bac20f_path_idx\` ON \`ec7b0187f544b883ba491da04c8bac20f\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`ec7b0187f544b883ba491da04c8bac20f_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ec7b0187f544b883ba491da04c8bac20f\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`ec7b0187f544b883ba491da04c8bac20f_locales_locale_parent_id_u\` ON \`ec7b0187f544b883ba491da04c8bac20f_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e77b9fc908c6084fc900cc66442b89e32\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e77b9fc908c6084fc900cc66442b89e32_order_idx\` ON \`e77b9fc908c6084fc900cc66442b89e32\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e77b9fc908c6084fc900cc66442b89e32_parent_id_idx\` ON \`e77b9fc908c6084fc900cc66442b89e32\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e77b9fc908c6084fc900cc66442b89e32_path_idx\` ON \`e77b9fc908c6084fc900cc66442b89e32\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`e77b9fc908c6084fc900cc66442b89e32_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e77b9fc908c6084fc900cc66442b89e32\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e77b9fc908c6084fc900cc66442b89e32_locales_locale_parent_id_u\` ON \`e77b9fc908c6084fc900cc66442b89e32_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e964a176201f3810d8e23c948af516fb2\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e964a176201f3810d8e23c948af516fb2_order_idx\` ON \`e964a176201f3810d8e23c948af516fb2\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e964a176201f3810d8e23c948af516fb2_parent_id_idx\` ON \`e964a176201f3810d8e23c948af516fb2\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e964a176201f3810d8e23c948af516fb2_path_idx\` ON \`e964a176201f3810d8e23c948af516fb2\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`e964a176201f3810d8e23c948af516fb2_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e964a176201f3810d8e23c948af516fb2\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e964a176201f3810d8e23c948af516fb2_locales_locale_parent_id_u\` ON \`e964a176201f3810d8e23c948af516fb2_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ed69fe51f407b86e5a973495011c151e9\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ed69fe51f407b86e5a973495011c151e9_order_idx\` ON \`ed69fe51f407b86e5a973495011c151e9\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ed69fe51f407b86e5a973495011c151e9_parent_id_idx\` ON \`ed69fe51f407b86e5a973495011c151e9\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ed69fe51f407b86e5a973495011c151e9_path_idx\` ON \`ed69fe51f407b86e5a973495011c151e9\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`ed69fe51f407b86e5a973495011c151e9_locales\` (
  	\`message\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ed69fe51f407b86e5a973495011c151e9\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`ed69fe51f407b86e5a973495011c151e9_locales_locale_parent_id_u\` ON \`ed69fe51f407b86e5a973495011c151e9_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e172457e3d41c8a0da66683b4f5b2bb5d\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`default_value\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e172457e3d41c8a0da66683b4f5b2bb5d_order_idx\` ON \`e172457e3d41c8a0da66683b4f5b2bb5d\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e172457e3d41c8a0da66683b4f5b2bb5d_parent_id_idx\` ON \`e172457e3d41c8a0da66683b4f5b2bb5d\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e172457e3d41c8a0da66683b4f5b2bb5d_path_idx\` ON \`e172457e3d41c8a0da66683b4f5b2bb5d\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`e172457e3d41c8a0da66683b4f5b2bb5d_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e172457e3d41c8a0da66683b4f5b2bb5d\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e172457e3d41c8a0da66683b4f5b2bb5d_locales_locale_parent_id_u\` ON \`e172457e3d41c8a0da66683b4f5b2bb5d_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e1fef94f431b585ac823da9a3677c38c6\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e079ab6e4a6a98374b8033579bf65ae20\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e1fef94f431b585ac823da9a3677c38c6_order_idx\` ON \`e1fef94f431b585ac823da9a3677c38c6\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e1fef94f431b585ac823da9a3677c38c6_parent_id_idx\` ON \`e1fef94f431b585ac823da9a3677c38c6\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e1fef94f431b585ac823da9a3677c38c6_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e1fef94f431b585ac823da9a3677c38c6\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e1fef94f431b585ac823da9a3677c38c6_locales_locale_parent_id_u\` ON \`e1fef94f431b585ac823da9a3677c38c6_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e079ab6e4a6a98374b8033579bf65ae20\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`placeholder\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e079ab6e4a6a98374b8033579bf65ae20_order_idx\` ON \`e079ab6e4a6a98374b8033579bf65ae20\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e079ab6e4a6a98374b8033579bf65ae20_parent_id_idx\` ON \`e079ab6e4a6a98374b8033579bf65ae20\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e079ab6e4a6a98374b8033579bf65ae20_path_idx\` ON \`e079ab6e4a6a98374b8033579bf65ae20\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`e079ab6e4a6a98374b8033579bf65ae20_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e079ab6e4a6a98374b8033579bf65ae20\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e079ab6e4a6a98374b8033579bf65ae20_locales_locale_parent_id_u\` ON \`e079ab6e4a6a98374b8033579bf65ae20_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e87df93fee1818fab87f9c6da399fdb7d\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e87df93fee1818fab87f9c6da399fdb7d_order_idx\` ON \`e87df93fee1818fab87f9c6da399fdb7d\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e87df93fee1818fab87f9c6da399fdb7d_parent_id_idx\` ON \`e87df93fee1818fab87f9c6da399fdb7d\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e87df93fee1818fab87f9c6da399fdb7d_path_idx\` ON \`e87df93fee1818fab87f9c6da399fdb7d\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`e87df93fee1818fab87f9c6da399fdb7d_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e87df93fee1818fab87f9c6da399fdb7d\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e87df93fee1818fab87f9c6da399fdb7d_locales_locale_parent_id_u\` ON \`e87df93fee1818fab87f9c6da399fdb7d_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e6d67388f0be98e9fa6d861b333356635\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e6d67388f0be98e9fa6d861b333356635_order_idx\` ON \`e6d67388f0be98e9fa6d861b333356635\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e6d67388f0be98e9fa6d861b333356635_parent_id_idx\` ON \`e6d67388f0be98e9fa6d861b333356635\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e6d67388f0be98e9fa6d861b333356635_path_idx\` ON \`e6d67388f0be98e9fa6d861b333356635\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`e6d67388f0be98e9fa6d861b333356635_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e6d67388f0be98e9fa6d861b333356635\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e6d67388f0be98e9fa6d861b333356635_locales_locale_parent_id_u\` ON \`e6d67388f0be98e9fa6d861b333356635_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e17421b6a908d8c008312bf0e38ef9253\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e17421b6a908d8c008312bf0e38ef9253_order_idx\` ON \`e17421b6a908d8c008312bf0e38ef9253\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e17421b6a908d8c008312bf0e38ef9253_parent_id_idx\` ON \`e17421b6a908d8c008312bf0e38ef9253\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e17421b6a908d8c008312bf0e38ef9253_path_idx\` ON \`e17421b6a908d8c008312bf0e38ef9253\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`e17421b6a908d8c008312bf0e38ef9253_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e17421b6a908d8c008312bf0e38ef9253\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e17421b6a908d8c008312bf0e38ef9253_locales_locale_parent_id_u\` ON \`e17421b6a908d8c008312bf0e38ef9253_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e7d0b5cfcc0f18d07a0f986e2f1aa3ad3\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email_to\` text,
  	\`cc\` text,
  	\`bcc\` text,
  	\`reply_to\` text,
  	\`email_from\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e7d0b5cfcc0f18d07a0f986e2f1aa3ad3_order_idx\` ON \`e7d0b5cfcc0f18d07a0f986e2f1aa3ad3\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e7d0b5cfcc0f18d07a0f986e2f1aa3ad3_parent_id_idx\` ON \`e7d0b5cfcc0f18d07a0f986e2f1aa3ad3\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e7d0b5cfcc0f18d07a0f986e2f1aa3ad3_locales\` (
  	\`subject\` text DEFAULT 'You''ve received a new message.' NOT NULL,
  	\`message\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e7d0b5cfcc0f18d07a0f986e2f1aa3ad3\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e7d0b5cfcc0f18d07a0f986e2f1aa3ad3_locales_locale_parent_id_u\` ON \`e7d0b5cfcc0f18d07a0f986e2f1aa3ad3_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`title\` text NOT NULL,
  	\`confirmation_type\` text DEFAULT 'message',
  	\`redirect_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_uuid_idx\` ON \`forms\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`forms_updated_at_idx\` ON \`forms\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`forms_created_at_idx\` ON \`forms\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`forms_locales\` (
  	\`submit_button_label\` text,
  	\`confirmation_message\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_locales_locale_parent_id_unique\` ON \`forms_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e0fa36534560c842e89b11febfa39e66d\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e0fa36534560c842e89b11febfa39e66d_order_idx\` ON \`e0fa36534560c842e89b11febfa39e66d\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e0fa36534560c842e89b11febfa39e66d_parent_id_idx\` ON \`e0fa36534560c842e89b11febfa39e66d\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`form_id\` text(36) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`form_submissions_uuid_idx\` ON \`form_submissions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_form_idx\` ON \`form_submissions\` (\`form_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_updated_at_idx\` ON \`form_submissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_created_at_idx\` ON \`form_submissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`redirects\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`from\` text NOT NULL,
  	\`to_type\` text DEFAULT 'reference',
  	\`to_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`redirects_uuid_idx\` ON \`redirects\` (\`uuid\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`redirects_from_idx\` ON \`redirects\` (\`from\`);`)
  await db.run(sql`CREATE INDEX \`redirects_updated_at_idx\` ON \`redirects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`redirects_created_at_idx\` ON \`redirects\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`redirects_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`redirects_rels_order_idx\` ON \`redirects_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_parent_idx\` ON \`redirects_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_path_idx\` ON \`redirects_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_pages_id_idx\` ON \`redirects_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_posts_id_idx\` ON \`redirects_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`ead7b4055f97980b6b7934d5acfec3e62\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`relation_to\` text,
  	\`category_i_d\` text,
  	\`title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ead7b4055f97980b6b7934d5acfec3e62_order_idx\` ON \`ead7b4055f97980b6b7934d5acfec3e62\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ead7b4055f97980b6b7934d5acfec3e62_parent_id_idx\` ON \`ead7b4055f97980b6b7934d5acfec3e62\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`search\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`priority\` numeric,
  	\`doc_relation_to\` text NOT NULL,
  	\`doc_value\` text NOT NULL,
  	\`slug\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` text(36),
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`search_uuid_idx\` ON \`search\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`search_doc_doc_relation_to_idx\` ON \`search\` (\`doc_relation_to\`);`)
  await db.run(sql`CREATE INDEX \`search_doc_doc_value_idx\` ON \`search\` (\`doc_value\`);`)
  await db.run(sql`CREATE INDEX \`search_slug_idx\` ON \`search\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`search_meta_meta_image_idx\` ON \`search\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`search_updated_at_idx\` ON \`search\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`search_created_at_idx\` ON \`search\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`search_locales\` (
  	\`title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`search_locales_locale_parent_id_unique\` ON \`search_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`exports\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`name\` text,
  	\`format\` text DEFAULT 'csv' NOT NULL,
  	\`limit\` numeric,
  	\`page\` numeric DEFAULT 1,
  	\`sort\` text,
  	\`sort_order\` text,
  	\`locale\` text DEFAULT 'all',
  	\`drafts\` text DEFAULT 'yes',
  	\`collection_slug\` text DEFAULT 'account-reconciliations' NOT NULL,
  	\`where\` text DEFAULT '{}',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`exports_uuid_idx\` ON \`exports\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`exports_updated_at_idx\` ON \`exports\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`exports_created_at_idx\` ON \`exports\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`exports_filename_idx\` ON \`exports\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`exports_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`exports\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`exports_texts_order_parent\` ON \`exports_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`imports\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`collection_slug\` text DEFAULT 'account-reconciliations' NOT NULL,
  	\`import_mode\` text,
  	\`match_field\` text DEFAULT 'id',
  	\`status\` text DEFAULT 'pending',
  	\`summary_imported\` numeric,
  	\`summary_updated\` numeric,
  	\`summary_total\` numeric,
  	\`summary_issues\` numeric,
  	\`summary_issue_details\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`imports_uuid_idx\` ON \`imports\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`imports_updated_at_idx\` ON \`imports\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`imports_created_at_idx\` ON \`imports\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`imports_filename_idx\` ON \`imports\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`payload_mcp_api_keys\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`user_id\` text(36) NOT NULL,
  	\`label\` text,
  	\`description\` text,
  	\`pages_find\` integer DEFAULT false,
  	\`pages_create\` integer DEFAULT false,
  	\`pages_update\` integer DEFAULT false,
  	\`pages_delete\` integer DEFAULT false,
  	\`posts_find\` integer DEFAULT false,
  	\`posts_create\` integer DEFAULT false,
  	\`posts_update\` integer DEFAULT false,
  	\`posts_delete\` integer DEFAULT false,
  	\`media_find\` integer DEFAULT false,
  	\`media_create\` integer DEFAULT false,
  	\`media_update\` integer DEFAULT false,
  	\`media_delete\` integer DEFAULT false,
  	\`categories_find\` integer DEFAULT false,
  	\`categories_create\` integer DEFAULT false,
  	\`categories_update\` integer DEFAULT false,
  	\`categories_delete\` integer DEFAULT false,
  	\`products_find\` integer DEFAULT false,
  	\`products_create\` integer DEFAULT false,
  	\`products_update\` integer DEFAULT false,
  	\`products_delete\` integer DEFAULT false,
  	\`memories_find\` integer DEFAULT false,
  	\`memories_create\` integer DEFAULT false,
  	\`memories_update\` integer DEFAULT false,
  	\`memories_delete\` integer DEFAULT false,
  	\`connections_find\` integer DEFAULT false,
  	\`connections_create\` integer DEFAULT false,
  	\`connections_update\` integer DEFAULT false,
  	\`connections_delete\` integer DEFAULT false,
  	\`messages_find\` integer DEFAULT false,
  	\`messages_create\` integer DEFAULT false,
  	\`messages_update\` integer DEFAULT false,
  	\`messages_delete\` integer DEFAULT false,
  	\`job_positions_find\` integer DEFAULT false,
  	\`job_positions_create\` integer DEFAULT false,
  	\`job_positions_update\` integer DEFAULT false,
  	\`job_positions_delete\` integer DEFAULT false,
  	\`employees_find\` integer DEFAULT false,
  	\`employees_create\` integer DEFAULT false,
  	\`employees_update\` integer DEFAULT false,
  	\`employees_delete\` integer DEFAULT false,
  	\`header_find\` integer DEFAULT false,
  	\`header_update\` integer DEFAULT false,
  	\`footer_find\` integer DEFAULT false,
  	\`footer_update\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`enable_a_p_i_key\` integer,
  	\`api_key\` text,
  	\`api_key_index\` text,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_mcp_api_keys_user_idx\` ON \`payload_mcp_api_keys\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_mcp_api_keys_updated_at_idx\` ON \`payload_mcp_api_keys\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_mcp_api_keys_created_at_idx\` ON \`payload_mcp_api_keys\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs_log\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`executed_at\` text NOT NULL,
  	\`completed_at\` text NOT NULL,
  	\`task_slug\` text NOT NULL,
  	\`task_i_d\` text NOT NULL,
  	\`input\` text,
  	\`output\` text,
  	\`state\` text NOT NULL,
  	\`error\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`payload_jobs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_order_idx\` ON \`payload_jobs_log\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_parent_id_idx\` ON \`payload_jobs_log\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`input\` text,
  	\`completed_at\` text,
  	\`total_tried\` numeric DEFAULT 0,
  	\`has_error\` integer DEFAULT false,
  	\`error\` text,
  	\`task_slug\` text,
  	\`queue\` text DEFAULT 'default',
  	\`wait_until\` text,
  	\`processing\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_jobs_completed_at_idx\` ON \`payload_jobs\` (\`completed_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_total_tried_idx\` ON \`payload_jobs\` (\`total_tried\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_has_error_idx\` ON \`payload_jobs\` (\`has_error\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_task_slug_idx\` ON \`payload_jobs\` (\`task_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_queue_idx\` ON \`payload_jobs\` (\`queue\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_wait_until_idx\` ON \`payload_jobs\` (\`wait_until\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_processing_idx\` ON \`payload_jobs\` (\`processing\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_updated_at_idx\` ON \`payload_jobs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_created_at_idx\` ON \`payload_jobs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`addresses_id\` text(36),
  	\`variants_id\` text(36),
  	\`variant_types_id\` text(36),
  	\`variant_options_id\` text(36),
  	\`products_id\` text(36),
  	\`carts_id\` text(36),
  	\`orders_id\` text(36),
  	\`transactions_id\` text(36),
  	\`forms_id\` text(36),
  	\`form_submissions_id\` text(36),
  	\`redirects_id\` text(36),
  	\`search_id\` text(36),
  	\`payload_mcp_api_keys_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`addresses_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`variants_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`variant_types_id\`) REFERENCES \`variant_types\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`variant_options_id\`) REFERENCES \`variant_options\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`carts_id\`) REFERENCES \`carts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`orders_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`transactions_id\`) REFERENCES \`transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`form_submissions_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`redirects_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`search_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`payload_mcp_api_keys_id\`) REFERENCES \`payload_mcp_api_keys\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_addresses_id_idx\` ON \`payload_locked_documents_rels\` (\`addresses_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_variants_id_idx\` ON \`payload_locked_documents_rels\` (\`variants_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_variant_types_id_idx\` ON \`payload_locked_documents_rels\` (\`variant_types_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_variant_options_id_idx\` ON \`payload_locked_documents_rels\` (\`variant_options_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_products_id_idx\` ON \`payload_locked_documents_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_carts_id_idx\` ON \`payload_locked_documents_rels\` (\`carts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_orders_id_idx\` ON \`payload_locked_documents_rels\` (\`orders_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_transactions_id_idx\` ON \`payload_locked_documents_rels\` (\`transactions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_forms_id_idx\` ON \`payload_locked_documents_rels\` (\`forms_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_form_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`form_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_redirects_id_idx\` ON \`payload_locked_documents_rels\` (\`redirects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_search_id_idx\` ON \`payload_locked_documents_rels\` (\`search_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_payload_mcp_api_keys_id_idx\` ON \`payload_locked_documents_rels\` (\`payload_mcp_api_keys_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	\`payload_mcp_api_keys_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`payload_mcp_api_keys_id\`) REFERENCES \`payload_mcp_api_keys\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_payload_mcp_api_keys_id_idx\` ON \`payload_preferences_rels\` (\`payload_mcp_api_keys_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_query_presets\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`is_shared\` integer DEFAULT false,
  	\`access_read_constraint\` text DEFAULT 'onlyMe',
  	\`access_update_constraint\` text DEFAULT 'onlyMe',
  	\`access_delete_constraint\` text DEFAULT 'onlyMe',
  	\`where\` text,
  	\`columns\` text,
  	\`group_by\` text,
  	\`related_collection\` text NOT NULL,
  	\`is_temp\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_query_presets_updated_at_idx\` ON \`payload_query_presets\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_query_presets_created_at_idx\` ON \`payload_query_presets\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_query_presets_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_query_presets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_query_presets_rels_order_idx\` ON \`payload_query_presets_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_query_presets_rels_parent_idx\` ON \`payload_query_presets_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_query_presets_rels_path_idx\` ON \`payload_query_presets_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_query_presets_rels_users_id_idx\` ON \`payload_query_presets_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`header_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_nav_items_order_idx\` ON \`header_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_parent_id_idx\` ON \`header_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`header_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_rels_order_idx\` ON \`header_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_parent_idx\` ON \`header_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_path_idx\` ON \`header_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_pages_id_idx\` ON \`header_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_posts_id_idx\` ON \`header_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_nav_items_order_idx\` ON \`footer_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_nav_items_parent_id_idx\` ON \`footer_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`footer_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_rels_order_idx\` ON \`footer_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_parent_idx\` ON \`footer_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_path_idx\` ON \`footer_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_pages_id_idx\` ON \`footer_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_posts_id_idx\` ON \`footer_rels\` (\`posts_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`tenants\`;`)
  await db.run(sql`DROP TABLE \`eb6619ccc69668dd8a8e13e6b854fec14\`;`)
  await db.run(sql`DROP TABLE \`e1bbe6311f13282339e495c8800870cc5\`;`)
  await db.run(sql`DROP TABLE \`ef1d2a1529c6a89c49a42b4994043f30d\`;`)
  await db.run(sql`DROP TABLE \`e2a4022d9ee878058b14896fdca6954e1\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`roles\`;`)
  await db.run(sql`DROP TABLE \`roles_rels\`;`)
  await db.run(sql`DROP TABLE \`user_roles\`;`)
  await db.run(sql`DROP TABLE \`e0dc067124d478cdba631b9fa5d670eec\`;`)
  await db.run(sql`DROP TABLE \`e0b6622b1c93180c98294697a29240a6f\`;`)
  await db.run(sql`DROP TABLE \`e36c778a2ac5684d1bbce502ea4931500\`;`)
  await db.run(sql`DROP TABLE \`ee3949e56baa28c1b867172a5dee40d6a\`;`)
  await db.run(sql`DROP TABLE \`ef7c8a03cb2628f4da06a88c4f30d47c7\`;`)
  await db.run(sql`DROP TABLE \`e81cc20c70fe78dbeaf3103630ebc6fbc\`;`)
  await db.run(sql`DROP TABLE \`e9cafee9f0fed8430a34bf14bb8d7771b\`;`)
  await db.run(sql`DROP TABLE \`e87f1621ae35f869b9a226c9e15aa2c0c\`;`)
  await db.run(sql`DROP TABLE \`e9e1fb928a8a084e1aa55074c6bfe43c8\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`_e0dc067124d478cdba631b9fa5d670eec_v\`;`)
  await db.run(sql`DROP TABLE \`_e0b6622b1c93180c98294697a29240a6f_v\`;`)
  await db.run(sql`DROP TABLE \`_e36c778a2ac5684d1bbce502ea4931500_v\`;`)
  await db.run(sql`DROP TABLE \`_ee3949e56baa28c1b867172a5dee40d6a_v\`;`)
  await db.run(sql`DROP TABLE \`_ef7c8a03cb2628f4da06a88c4f30d47c7_v\`;`)
  await db.run(sql`DROP TABLE \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v\`;`)
  await db.run(sql`DROP TABLE \`_e9cafee9f0fed8430a34bf14bb8d7771b_v\`;`)
  await db.run(sql`DROP TABLE \`_e87f1621ae35f869b9a226c9e15aa2c0c_v\`;`)
  await db.run(sql`DROP TABLE \`_e9e1fb928a8a084e1aa55074c6bfe43c8_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_rels\`;`)
  await db.run(sql`DROP TABLE \`e4cefc0562d378871ba0511ef359b5126\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_rels\`;`)
  await db.run(sql`DROP TABLE \`_e4cefc0562d378871ba0511ef359b5126_v\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`eb9ba47f0935d85bf9626dd6756872a56\`;`)
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`DROP TABLE \`e0f3c4597ea4d815698b6463649de69e2\`;`)
  await db.run(sql`DROP TABLE \`invoices\`;`)
  await db.run(sql`DROP TABLE \`invoice_lines\`;`)
  await db.run(sql`DROP TABLE \`payment_methods\`;`)
  await db.run(sql`DROP TABLE \`payments\`;`)
  await db.run(sql`DROP TABLE \`subscription_plans\`;`)
  await db.run(sql`DROP TABLE \`subscriptions\`;`)
  await db.run(sql`DROP TABLE \`items\`;`)
  await db.run(sql`DROP TABLE \`e056c1b5d14948e2cbc1c72ae143dec2a\`;`)
  await db.run(sql`DROP TABLE \`gl_accounts\`;`)
  await db.run(sql`DROP TABLE \`gl_accounts_locales\`;`)
  await db.run(sql`DROP TABLE \`gl_posting_rules\`;`)
  await db.run(sql`DROP TABLE \`gl_posting_rules_rels\`;`)
  await db.run(sql`DROP TABLE \`e1bde3ecd157d8e63be74306ae19685b5\`;`)
  await db.run(sql`DROP TABLE \`e1bde3ecd157d8e63be74306ae19685b5_locales\`;`)
  await db.run(sql`DROP TABLE \`journal_entries\`;`)
  await db.run(sql`DROP TABLE \`journal_entries_locales\`;`)
  await db.run(sql`DROP TABLE \`ea6ce72f9bf098ac48a6c7dc3362a4b9d\`;`)
  await db.run(sql`DROP TABLE \`gl_postings\`;`)
  await db.run(sql`DROP TABLE \`period_locks\`;`)
  await db.run(sql`DROP TABLE \`period_locks_rels\`;`)
  await db.run(sql`DROP TABLE \`e331d8adbec1389829f03d1a10e5ec41d\`;`)
  await db.run(sql`DROP TABLE \`closing_entries\`;`)
  await db.run(sql`DROP TABLE \`e054a9f104e2283d399aaa493f7a613d3\`;`)
  await db.run(sql`DROP TABLE \`e054a9f104e2283d399aaa493f7a613d3_locales\`;`)
  await db.run(sql`DROP TABLE \`e03d4a88bb21985cf9204ac7e7b91dd7b\`;`)
  await db.run(sql`DROP TABLE \`bank_statements\`;`)
  await db.run(sql`DROP TABLE \`e31afc32d6c1b8e8fbbde1ae7a7c1b65e\`;`)
  await db.run(sql`DROP TABLE \`bank_transactions\`;`)
  await db.run(sql`DROP TABLE \`bank_accounts\`;`)
  await db.run(sql`DROP TABLE \`e79d3f9d1d5268d09bc229598ff88c147\`;`)
  await db.run(sql`DROP TABLE \`e79d3f9d1d5268d09bc229598ff88c147_locales\`;`)
  await db.run(sql`DROP TABLE \`eea91a2735c5d81fab00e29e7205a1913\`;`)
  await db.run(sql`DROP TABLE \`eea91a2735c5d81fab00e29e7205a1913_locales\`;`)
  await db.run(sql`DROP TABLE \`account_reconciliations\`;`)
  await db.run(sql`DROP TABLE \`account_reconciliations_locales\`;`)
  await db.run(sql`DROP TABLE \`e90e89d5dfa078b99bb64c75493531070\`;`)
  await db.run(sql`DROP TABLE \`e90e89d5dfa078b99bb64c75493531070_locales\`;`)
  await db.run(sql`DROP TABLE \`bank_reconciliations\`;`)
  await db.run(sql`DROP TABLE \`e6ebcc7c621e687b59dbfd3dbfb40df80\`;`)
  await db.run(sql`DROP TABLE \`eb29a4918c12889c69eaee1b51e5e94dc\`;`)
  await db.run(sql`DROP TABLE \`financial_statements\`;`)
  await db.run(sql`DROP TABLE \`period_end_adjustments\`;`)
  await db.run(sql`DROP TABLE \`period_end_adjustments_locales\`;`)
  await db.run(sql`DROP TABLE \`recur_je_lines\`;`)
  await db.run(sql`DROP TABLE \`recurring_journals\`;`)
  await db.run(sql`DROP TABLE \`recurring_journals_locales\`;`)
  await db.run(sql`DROP TABLE \`prior_period_adjustments\`;`)
  await db.run(sql`DROP TABLE \`rounding_adjustments\`;`)
  await db.run(sql`DROP TABLE \`tax_calculations\`;`)
  await db.run(sql`DROP TABLE \`tax_codes\`;`)
  await db.run(sql`DROP TABLE \`tax_codes_rels\`;`)
  await db.run(sql`DROP TABLE \`tax_jurisdictions\`;`)
  await db.run(sql`DROP TABLE \`eb42b6ce7a98b8069add2b649d5ebebf1\`;`)
  await db.run(sql`DROP TABLE \`tax_returns\`;`)
  await db.run(sql`DROP TABLE \`tax_returns_rels\`;`)
  await db.run(sql`DROP TABLE \`currency_rates\`;`)
  await db.run(sql`DROP TABLE \`fiscal_periods\`;`)
  await db.run(sql`DROP TABLE \`fiscal_calendars\`;`)
  await db.run(sql`DROP TABLE \`fiscal_period_snapshots\`;`)
  await db.run(sql`DROP TABLE \`fixed_assets\`;`)
  await db.run(sql`DROP TABLE \`fixed_assets_locales\`;`)
  await db.run(sql`DROP TABLE \`depreciation_schedules\`;`)
  await db.run(sql`DROP TABLE \`customers\`;`)
  await db.run(sql`DROP TABLE \`customers_rels\`;`)
  await db.run(sql`DROP TABLE \`leads\`;`)
  await db.run(sql`DROP TABLE \`opportunities\`;`)
  await db.run(sql`DROP TABLE \`opportunities_locales\`;`)
  await db.run(sql`DROP TABLE \`customer_segments\`;`)
  await db.run(sql`DROP TABLE \`customer_segments_locales\`;`)
  await db.run(sql`DROP TABLE \`e601f23df2ed88bbc9842a7d6b5f41838\`;`)
  await db.run(sql`DROP TABLE \`e601f23df2ed88bbc9842a7d6b5f41838_locales\`;`)
  await db.run(sql`DROP TABLE \`quotes\`;`)
  await db.run(sql`DROP TABLE \`ea1127d16d0118cc6b920e6820a2d4f19\`;`)
  await db.run(sql`DROP TABLE \`ea1127d16d0118cc6b920e6820a2d4f19_locales\`;`)
  await db.run(sql`DROP TABLE \`sales_orders\`;`)
  await db.run(sql`DROP TABLE \`sales_orders_locales\`;`)
  await db.run(sql`DROP TABLE \`sales_commissions\`;`)
  await db.run(sql`DROP TABLE \`credit_memos\`;`)
  await db.run(sql`DROP TABLE \`e70806190d4048502b85ef401011f5819\`;`)
  await db.run(sql`DROP TABLE \`returns\`;`)
  await db.run(sql`DROP TABLE \`e934f7628401582b094b784c3c47361f6\`;`)
  await db.run(sql`DROP TABLE \`shipments\`;`)
  await db.run(sql`DROP TABLE \`refunds\`;`)
  await db.run(sql`DROP TABLE \`payment_allocations\`;`)
  await db.run(sql`DROP TABLE \`eceaf268e207982e58512501eaf1eb056\`;`)
  await db.run(sql`DROP TABLE \`eceaf268e207982e58512501eaf1eb056_locales\`;`)
  await db.run(sql`DROP TABLE \`dunning_cycles\`;`)
  await db.run(sql`DROP TABLE \`vendors\`;`)
  await db.run(sql`DROP TABLE \`vendors_rels\`;`)
  await db.run(sql`DROP TABLE \`vq_lines\`;`)
  await db.run(sql`DROP TABLE \`vq_lines_locales\`;`)
  await db.run(sql`DROP TABLE \`vendor_quotes\`;`)
  await db.run(sql`DROP TABLE \`vendor_scorecards\`;`)
  await db.run(sql`DROP TABLE \`eced028e288018042b97287d40f1c01dd\`;`)
  await db.run(sql`DROP TABLE \`eced028e288018042b97287d40f1c01dd_locales\`;`)
  await db.run(sql`DROP TABLE \`purchase_orders\`;`)
  await db.run(sql`DROP TABLE \`pr_lines\`;`)
  await db.run(sql`DROP TABLE \`pr_lines_locales\`;`)
  await db.run(sql`DROP TABLE \`pr_approval\`;`)
  await db.run(sql`DROP TABLE \`pr_approval_locales\`;`)
  await db.run(sql`DROP TABLE \`purchase_requisitions\`;`)
  await db.run(sql`DROP TABLE \`eeacdeee24bab86b0a04db17f2c688224\`;`)
  await db.run(sql`DROP TABLE \`eeacdeee24bab86b0a04db17f2c688224_locales\`;`)
  await db.run(sql`DROP TABLE \`goods_receipts\`;`)
  await db.run(sql`DROP TABLE \`inventory_movements\`;`)
  await db.run(sql`DROP TABLE \`ebc746b7cb78f8bacb518c6e721f7b188\`;`)
  await db.run(sql`DROP TABLE \`ebc746b7cb78f8bacb518c6e721f7b188_locales\`;`)
  await db.run(sql`DROP TABLE \`warehouse_locations\`;`)
  await db.run(sql`DROP TABLE \`warehouse_locations_locales\`;`)
  await db.run(sql`DROP TABLE \`ea97c27c5b39a86618794e02c9a375e5b\`;`)
  await db.run(sql`DROP TABLE \`cost_centers\`;`)
  await db.run(sql`DROP TABLE \`cost_centers_locales\`;`)
  await db.run(sql`DROP TABLE \`e595e236aadea8384bc3bfd7c2ccb6542\`;`)
  await db.run(sql`DROP TABLE \`e595e236aadea8384bc3bfd7c2ccb6542_locales\`;`)
  await db.run(sql`DROP TABLE \`budget_planning\`;`)
  await db.run(sql`DROP TABLE \`cost_variances\`;`)
  await db.run(sql`DROP TABLE \`intercompany_transactions\`;`)
  await db.run(sql`DROP TABLE \`e739a79cfffa08b4faa0baba3495bf9be\`;`)
  await db.run(sql`DROP TABLE \`consolidation_eliminations\`;`)
  await db.run(sql`DROP TABLE \`fx_transactions\`;`)
  await db.run(sql`DROP TABLE \`e476334f99a5080e1b8620daf7fabba26\`;`)
  await db.run(sql`DROP TABLE \`e476334f99a5080e1b8620daf7fabba26_locales\`;`)
  await db.run(sql`DROP TABLE \`contracts\`;`)
  await db.run(sql`DROP TABLE \`contracts_locales\`;`)
  await db.run(sql`DROP TABLE \`contracts_rels\`;`)
  await db.run(sql`DROP TABLE \`performance_obligations\`;`)
  await db.run(sql`DROP TABLE \`performance_obligations_locales\`;`)
  await db.run(sql`DROP TABLE \`commitments_and_contingencies\`;`)
  await db.run(sql`DROP TABLE \`commitments_and_contingencies_locales\`;`)
  await db.run(sql`DROP TABLE \`e5496afa044df8c088b22ddbda34aa6ab\`;`)
  await db.run(sql`DROP TABLE \`e5496afa044df8c088b22ddbda34aa6ab_locales\`;`)
  await db.run(sql`DROP TABLE \`leases\`;`)
  await db.run(sql`DROP TABLE \`lease_modifications\`;`)
  await db.run(sql`DROP TABLE \`lease_period_postings\`;`)
  await db.run(sql`DROP TABLE \`ecf42f6f7e9ab844998d1601a14e54745\`;`)
  await db.run(sql`DROP TABLE \`payment_runs\`;`)
  await db.run(sql`DROP TABLE \`sepa_mandates\`;`)
  await db.run(sql`DROP TABLE \`e30a95432eb9e8c50a8468c48698c4e69\`;`)
  await db.run(sql`DROP TABLE \`payroll_runs\`;`)
  await db.run(sql`DROP TABLE \`e6ad64a821b7689ad8f40c0ee61ef44c7\`;`)
  await db.run(sql`DROP TABLE \`employees\`;`)
  await db.run(sql`DROP TABLE \`connections\`;`)
  await db.run(sql`DROP TABLE \`sectors\`;`)
  await db.run(sql`DROP TABLE \`e89951a9dc19789428d4d937cfad80caf\`;`)
  await db.run(sql`DROP TABLE \`job_positions\`;`)
  await db.run(sql`DROP TABLE \`time_entries\`;`)
  await db.run(sql`DROP TABLE \`leave_requests\`;`)
  await db.run(sql`DROP TABLE \`leave_requests_locales\`;`)
  await db.run(sql`DROP TABLE \`pr_comp_rating\`;`)
  await db.run(sql`DROP TABLE \`pr_comp_rating_locales\`;`)
  await db.run(sql`DROP TABLE \`pr_next_goals\`;`)
  await db.run(sql`DROP TABLE \`performance_reviews\`;`)
  await db.run(sql`DROP TABLE \`er_lines\`;`)
  await db.run(sql`DROP TABLE \`er_lines_locales\`;`)
  await db.run(sql`DROP TABLE \`er_approval\`;`)
  await db.run(sql`DROP TABLE \`er_approval_locales\`;`)
  await db.run(sql`DROP TABLE \`expense_reports\`;`)
  await db.run(sql`DROP TABLE \`rp_intvw\`;`)
  await db.run(sql`DROP TABLE \`recruiting_pipeline\`;`)
  await db.run(sql`DROP TABLE \`recruiting_pipeline_rels\`;`)
  await db.run(sql`DROP TABLE \`activities\`;`)
  await db.run(sql`DROP TABLE \`activities_locales\`;`)
  await db.run(sql`DROP TABLE \`projects\`;`)
  await db.run(sql`DROP TABLE \`projects_locales\`;`)
  await db.run(sql`DROP TABLE \`project_tasks\`;`)
  await db.run(sql`DROP TABLE \`project_tasks_locales\`;`)
  await db.run(sql`DROP TABLE \`project_tasks_rels\`;`)
  await db.run(sql`DROP TABLE \`project_milestones\`;`)
  await db.run(sql`DROP TABLE \`project_milestones_locales\`;`)
  await db.run(sql`DROP TABLE \`work_orders\`;`)
  await db.run(sql`DROP TABLE \`wf_steps\`;`)
  await db.run(sql`DROP TABLE \`wf_steps_locales\`;`)
  await db.run(sql`DROP TABLE \`workflow_definitions\`;`)
  await db.run(sql`DROP TABLE \`workflow_definitions_locales\`;`)
  await db.run(sql`DROP TABLE \`wfi_history\`;`)
  await db.run(sql`DROP TABLE \`wfi_history_locales\`;`)
  await db.run(sql`DROP TABLE \`workflow_instances\`;`)
  await db.run(sql`DROP TABLE \`ee29d67e947fd80f68f80f3b1111ed7a7\`;`)
  await db.run(sql`DROP TABLE \`e2e7264e544c08b9fada634cb598433cb\`;`)
  await db.run(sql`DROP TABLE \`e2e7264e544c08b9fada634cb598433cb_locales\`;`)
  await db.run(sql`DROP TABLE \`bills_of_materials\`;`)
  await db.run(sql`DROP TABLE \`batches\`;`)
  await db.run(sql`DROP TABLE \`batches_rels\`;`)
  await db.run(sql`DROP TABLE \`work_centers\`;`)
  await db.run(sql`DROP TABLE \`work_shifts\`;`)
  await db.run(sql`DROP TABLE \`operations\`;`)
  await db.run(sql`DROP TABLE \`routings\`;`)
  await db.run(sql`DROP TABLE \`e2c337a3fd6218b33858630a71f1fe155\`;`)
  await db.run(sql`DROP TABLE \`operation_runs\`;`)
  await db.run(sql`DROP TABLE \`production_receipts\`;`)
  await db.run(sql`DROP TABLE \`quality_inspections\`;`)
  await db.run(sql`DROP TABLE \`wip_snapshots\`;`)
  await db.run(sql`DROP TABLE \`tags\`;`)
  await db.run(sql`DROP TABLE \`taggings\`;`)
  await db.run(sql`DROP TABLE \`properties\`;`)
  await db.run(sql`DROP TABLE \`properties_locales\`;`)
  await db.run(sql`DROP TABLE \`e8210b2bdad518d079d5f7f311f47e82e\`;`)
  await db.run(sql`DROP TABLE \`spaces\`;`)
  await db.run(sql`DROP TABLE \`spaces_locales\`;`)
  await db.run(sql`DROP TABLE \`ee3241873f3c38beca1cf0af901e38fb9\`;`)
  await db.run(sql`DROP TABLE \`ee3241873f3c38beca1cf0af901e38fb9_locales\`;`)
  await db.run(sql`DROP TABLE \`maintenance_requests\`;`)
  await db.run(sql`DROP TABLE \`maintenance_requests_locales\`;`)
  await db.run(sql`DROP TABLE \`mwo_parts\`;`)
  await db.run(sql`DROP TABLE \`mwo_parts_locales\`;`)
  await db.run(sql`DROP TABLE \`mwo_labour\`;`)
  await db.run(sql`DROP TABLE \`maintenance_work_orders\`;`)
  await db.run(sql`DROP TABLE \`maintenance_work_orders_locales\`;`)
  await db.run(sql`DROP TABLE \`e3c6dbd1f63738f9a85006b63c3c94908\`;`)
  await db.run(sql`DROP TABLE \`e67933bc56ed48ddc92a51e05dd2e16ec\`;`)
  await db.run(sql`DROP TABLE \`bookable_resources\`;`)
  await db.run(sql`DROP TABLE \`bookable_resources_locales\`;`)
  await db.run(sql`DROP TABLE \`bookings\`;`)
  await db.run(sql`DROP TABLE \`bookings_locales\`;`)
  await db.run(sql`DROP TABLE \`e294e318ae4b38416b0854e7571907375\`;`)
  await db.run(sql`DROP TABLE \`e294e318ae4b38416b0854e7571907375_locales\`;`)
  await db.run(sql`DROP TABLE \`carriers\`;`)
  await db.run(sql`DROP TABLE \`tracking_events\`;`)
  await db.run(sql`DROP TABLE \`ebcc4e7fa5c5b870285d8619d67acbe3e\`;`)
  await db.run(sql`DROP TABLE \`customs_declarations\`;`)
  await db.run(sql`DROP TABLE \`consignment_arrangements\`;`)
  await db.run(sql`DROP TABLE \`consignment_inventory\`;`)
  await db.run(sql`DROP TABLE \`consignment_sales\`;`)
  await db.run(sql`DROP TABLE \`e074d1a41a9e282648fbfbec1c6fb43ea\`;`)
  await db.run(sql`DROP TABLE \`audit_events\`;`)
  await db.run(sql`DROP TABLE \`api_audit_events\`;`)
  await db.run(sql`DROP TABLE \`evidence_attestations\`;`)
  await db.run(sql`DROP TABLE \`shares\`;`)
  await db.run(sql`DROP TABLE \`ef34fbcd44ea281498af77442ff84199a\`;`)
  await db.run(sql`DROP TABLE \`entity_types\`;`)
  await db.run(sql`DROP TABLE \`entity_types_rels\`;`)
  await db.run(sql`DROP TABLE \`e6b390099a5c88994b32617396728b9d1\`;`)
  await db.run(sql`DROP TABLE \`e6eb48eceb528889a8621e1cf37bbe038\`;`)
  await db.run(sql`DROP TABLE \`taxing_jurisdictions\`;`)
  await db.run(sql`DROP TABLE \`taxing_jurisdictions_rels\`;`)
  await db.run(sql`DROP TABLE \`entity_legal_structures\`;`)
  await db.run(sql`DROP TABLE \`compliance_frameworks\`;`)
  await db.run(sql`DROP TABLE \`compliance_requirements\`;`)
  await db.run(sql`DROP TABLE \`internal_controls\`;`)
  await db.run(sql`DROP TABLE \`control_tests\`;`)
  await db.run(sql`DROP TABLE \`audit_samples\`;`)
  await db.run(sql`DROP TABLE \`compliance_gaps\`;`)
  await db.run(sql`DROP TABLE \`e77fca21a191f8082bc2a98b0bfd457e8\`;`)
  await db.run(sql`DROP TABLE \`e6c77d0f4b1888ce9bfd5c79a01b9bf36\`;`)
  await db.run(sql`DROP TABLE \`audit_evidence\`;`)
  await db.run(sql`DROP TABLE \`ebdf6c5cf64618eb3a6cbab343da6bac0\`;`)
  await db.run(sql`DROP TABLE \`audit_findings\`;`)
  await db.run(sql`DROP TABLE \`audit_trail_events\`;`)
  await db.run(sql`DROP TABLE \`eed4d3e0dc8168b24a00ca2f6a516bc58\`;`)
  await db.run(sql`DROP TABLE \`remediation_plans\`;`)
  await db.run(sql`DROP TABLE \`audit_committees\`;`)
  await db.run(sql`DROP TABLE \`audit_committees_rels\`;`)
  await db.run(sql`DROP TABLE \`ecc9fd5637b9c8429b03a8b23abb12a0a\`;`)
  await db.run(sql`DROP TABLE \`audit_committee_members\`;`)
  await db.run(sql`DROP TABLE \`board_actions\`;`)
  await db.run(sql`DROP TABLE \`board_actions_rels\`;`)
  await db.run(sql`DROP TABLE \`e2fd3794b06848c5791b307f9f023909c\`;`)
  await db.run(sql`DROP TABLE \`management_certifications\`;`)
  await db.run(sql`DROP TABLE \`management_certifications_rels\`;`)
  await db.run(sql`DROP TABLE \`regulatory_reports\`;`)
  await db.run(sql`DROP TABLE \`regulatory_reports_rels\`;`)
  await db.run(sql`DROP TABLE \`internal_policies\`;`)
  await db.run(sql`DROP TABLE \`internal_policies_rels\`;`)
  await db.run(sql`DROP TABLE \`e86a4abedd768812d9092751010ab81e5\`;`)
  await db.run(sql`DROP TABLE \`statutory_report_templates\`;`)
  await db.run(sql`DROP TABLE \`statutory_field_mappings\`;`)
  await db.run(sql`DROP TABLE \`policy_versions\`;`)
  await db.run(sql`DROP TABLE \`policy_acknowledgments\`;`)
  await db.run(sql`DROP TABLE \`compliance_deadlines\`;`)
  await db.run(sql`DROP TABLE \`e63374315133189659a5f11c2d82e4d14\`;`)
  await db.run(sql`DROP TABLE \`e98d28b906a8a84fc83665a4bee6d69f1\`;`)
  await db.run(sql`DROP TABLE \`compliance_notifications\`;`)
  await db.run(sql`DROP TABLE \`reporting_standards\`;`)
  await db.run(sql`DROP TABLE \`ed4bb747bf248847fbb37044680471a81\`;`)
  await db.run(sql`DROP TABLE \`reporting_mappings\`;`)
  await db.run(sql`DROP TABLE \`related_party_transactions\`;`)
  await db.run(sql`DROP TABLE \`related_party_transactions_rels\`;`)
  await db.run(sql`DROP TABLE \`e7b6d5ba25f4f809caff6535d1804c987\`;`)
  await db.run(sql`DROP TABLE \`management_assessment_icfr\`;`)
  await db.run(sql`DROP TABLE \`management_assessment_icfr_rels\`;`)
  await db.run(sql`DROP TABLE \`e2cf7ebcb20e98c53ac2931d630d1a794\`;`)
  await db.run(sql`DROP TABLE \`disclosure_checklists\`;`)
  await db.run(sql`DROP TABLE \`disclosure_checklists_rels\`;`)
  await db.run(sql`DROP TABLE \`e096b0d817dc2803fbde647fc45fdd1d2\`;`)
  await db.run(sql`DROP TABLE \`eb97d9b37aa2f8c0cba9177cb912664fa\`;`)
  await db.run(sql`DROP TABLE \`e847fc1809b2f8f1dbee08a0fff515091\`;`)
  await db.run(sql`DROP TABLE \`e1465d8f360ca8f11a355cbdf4650ac30\`;`)
  await db.run(sql`DROP TABLE \`audit_committee_minutes\`;`)
  await db.run(sql`DROP TABLE \`audit_committee_minutes_rels\`;`)
  await db.run(sql`DROP TABLE \`risk_register\`;`)
  await db.run(sql`DROP TABLE \`risk_register_rels\`;`)
  await db.run(sql`DROP TABLE \`e1a216420daff8b30ba8bab31bff7f178\`;`)
  await db.run(sql`DROP TABLE \`e55475e7a36b48103a9792367bb20bd76\`;`)
  await db.run(sql`DROP TABLE \`debt_schedule\`;`)
  await db.run(sql`DROP TABLE \`debt_schedule_rels\`;`)
  await db.run(sql`DROP TABLE \`e2ed3319156f98328b9f2124e3154b2b0\`;`)
  await db.run(sql`DROP TABLE \`ea2509c33f75c8e20a0407280749b7f16\`;`)
  await db.run(sql`DROP TABLE \`internal_audit_function\`;`)
  await db.run(sql`DROP TABLE \`internal_audit_function_rels\`;`)
  await db.run(sql`DROP TABLE \`e3d8eef548a8d8022abc3af81e21232c6\`;`)
  await db.run(sql`DROP TABLE \`ebe1f8a37cdab80fe87f27a2a9809a286\`;`)
  await db.run(sql`DROP TABLE \`segment_reporting\`;`)
  await db.run(sql`DROP TABLE \`segment_reporting_rels\`;`)
  await db.run(sql`DROP TABLE \`consent_records\`;`)
  await db.run(sql`DROP TABLE \`data_subject_requests\`;`)
  await db.run(sql`DROP TABLE \`data_subject_requests_locales\`;`)
  await db.run(sql`DROP TABLE \`e89747974e3198578977032ad94a759c1\`;`)
  await db.run(sql`DROP TABLE \`e4b2d0cf96ff18f2e94f69d77ee2c025f\`;`)
  await db.run(sql`DROP TABLE \`ed5b0fb68f51786feb6e1eee30449385f\`;`)
  await db.run(sql`DROP TABLE \`ed5b0fb68f51786feb6e1eee30449385f_locales\`;`)
  await db.run(sql`DROP TABLE \`transfers\`;`)
  await db.run(sql`DROP TABLE \`data_processing_activities\`;`)
  await db.run(sql`DROP TABLE \`e1dc5ded7e20c82a1b0dd2f3eaf6425fd\`;`)
  await db.run(sql`DROP TABLE \`kyc_checks\`;`)
  await db.run(sql`DROP TABLE \`beneficial_owners\`;`)
  await db.run(sql`DROP TABLE \`e748d22a668778d2291b0c286f5fb0b16\`;`)
  await db.run(sql`DROP TABLE \`packages\`;`)
  await db.run(sql`DROP TABLE \`messages\`;`)
  await db.run(sql`DROP TABLE \`messages_rels\`;`)
  await db.run(sql`DROP TABLE \`chat\`;`)
  await db.run(sql`DROP TABLE \`csrd_disclosures\`;`)
  await db.run(sql`DROP TABLE \`carbon_emissions\`;`)
  await db.run(sql`DROP TABLE \`biological_assets\`;`)
  await db.run(sql`DROP TABLE \`mineral_resource_assets\`;`)
  await db.run(sql`DROP TABLE \`investment_properties\`;`)
  await db.run(sql`DROP TABLE \`prov_mvmt\`;`)
  await db.run(sql`DROP TABLE \`provisions\`;`)
  await db.run(sql`DROP TABLE \`grant_cond\`;`)
  await db.run(sql`DROP TABLE \`government_grants\`;`)
  await db.run(sql`DROP TABLE \`deferred_tax_items\`;`)
  await db.run(sql`DROP TABLE \`sbp_tranches\`;`)
  await db.run(sql`DROP TABLE \`share_based_payments\`;`)
  await db.run(sql`DROP TABLE \`bc_ppa\`;`)
  await db.run(sql`DROP TABLE \`bc_ppa_locales\`;`)
  await db.run(sql`DROP TABLE \`business_combinations\`;`)
  await db.run(sql`DROP TABLE \`held_for_sale_classifications\`;`)
  await db.run(sql`DROP TABLE \`fv_l3_inputs\`;`)
  await db.run(sql`DROP TABLE \`fair_value_measurements\`;`)
  await db.run(sql`DROP TABLE \`eps_share_events\`;`)
  await db.run(sql`DROP TABLE \`earnings_per_share\`;`)
  await db.run(sql`DROP TABLE \`insurance_contracts\`;`)
  await db.run(sql`DROP TABLE \`regulatory_deferral_accounts\`;`)
  await db.run(sql`DROP TABLE \`post_balance_sheet_events\`;`)
  await db.run(sql`DROP TABLE \`post_balance_sheet_events_locales\`;`)
  await db.run(sql`DROP TABLE \`transaction_failures\`;`)
  await db.run(sql`DROP TABLE \`cbcr_row\`;`)
  await db.run(sql`DROP TABLE \`transfer_pricing_files\`;`)
  await db.run(sql`DROP TABLE \`e00d4d9ef3ee486519ef61f236288a7ce\`;`)
  await db.run(sql`DROP TABLE \`e00d4d9ef3ee486519ef61f236288a7ce_locales\`;`)
  await db.run(sql`DROP TABLE \`e27ef0824049282a9a3514febfe91938b\`;`)
  await db.run(sql`DROP TABLE \`standards\`;`)
  await db.run(sql`DROP TABLE \`standards_rels\`;`)
  await db.run(sql`DROP TABLE \`efd47cc9ff5ea8cf99caa31b20fc740b2\`;`)
  await db.run(sql`DROP TABLE \`memories\`;`)
  await db.run(sql`DROP TABLE \`ef88c2ed312a88bb190229980a3720e72\`;`)
  await db.run(sql`DROP TABLE \`mcp_tool_metadata\`;`)
  await db.run(sql`DROP TABLE \`mcp_tool_metadata_locales\`;`)
  await db.run(sql`DROP TABLE \`eec49ec68ab2a8e6985f5d5422fa6267d\`;`)
  await db.run(sql`DROP TABLE \`translations\`;`)
  await db.run(sql`DROP TABLE \`translations_locales\`;`)
  await db.run(sql`DROP TABLE \`commitments\`;`)
  await db.run(sql`DROP TABLE \`contract_amendments\`;`)
  await db.run(sql`DROP TABLE \`contract_performance\`;`)
  await db.run(sql`DROP TABLE \`contract_signatures\`;`)
  await db.run(sql`DROP TABLE \`legal_entities\`;`)
  await db.run(sql`DROP TABLE \`ai_suggestions\`;`)
  await db.run(sql`DROP TABLE \`usage_records\`;`)
  await db.run(sql`DROP TABLE \`e6cabc1f1ac608b48984c03e53002797a\`;`)
  await db.run(sql`DROP TABLE \`consolidations\`;`)
  await db.run(sql`DROP TABLE \`consolidations_rels\`;`)
  await db.run(sql`DROP TABLE \`eb6304bde8ac98a988117180add07de51\`;`)
  await db.run(sql`DROP TABLE \`tax_periods\`;`)
  await db.run(sql`DROP TABLE \`e98126fc1e3858f72a76a355f88289eb6\`;`)
  await db.run(sql`DROP TABLE \`e4c59bd52eb4f82d6a279a9499d2e35c8\`;`)
  await db.run(sql`DROP TABLE \`ebf8b394d0fdc86c18e4f79da4d0015e7\`;`)
  await db.run(sql`DROP TABLE \`e6443025e2e8e8ce299e90c6ffbf537d7\`;`)
  await db.run(sql`DROP TABLE \`audit_reports\`;`)
  await db.run(sql`DROP TABLE \`transfer_pricing_adjustments\`;`)
  await db.run(sql`DROP TABLE \`transfer_pricing_adjustments_rels\`;`)
  await db.run(sql`DROP TABLE \`post_close_analytics_reports\`;`)
  await db.run(sql`DROP TABLE \`efcc0fcec210180b68b558b4fd7cc7f1d\`;`)
  await db.run(sql`DROP TABLE \`fiscal_devices\`;`)
  await db.run(sql`DROP TABLE \`e9749956a340987ec9eeac999bdcebefd\`;`)
  await db.run(sql`DROP TABLE \`sales\`;`)
  await db.run(sql`DROP TABLE \`e63b40236bd7481698a9e62f00c83c76d\`;`)
  await db.run(sql`DROP TABLE \`edc80b35eb7c98472b2e2fc49f713ea39\`;`)
  await db.run(sql`DROP TABLE \`receipts\`;`)
  await db.run(sql`DROP TABLE \`operators\`;`)
  await db.run(sql`DROP TABLE \`terminals\`;`)
  await db.run(sql`DROP TABLE \`audit_submissions\`;`)
  await db.run(sql`DROP TABLE \`addresses\`;`)
  await db.run(sql`DROP TABLE \`variants\`;`)
  await db.run(sql`DROP TABLE \`variants_rels\`;`)
  await db.run(sql`DROP TABLE \`_variants_v\`;`)
  await db.run(sql`DROP TABLE \`_variants_v_rels\`;`)
  await db.run(sql`DROP TABLE \`variant_types\`;`)
  await db.run(sql`DROP TABLE \`variant_options\`;`)
  await db.run(sql`DROP TABLE \`e807e5fa7ee658a6daf578f601def9edb\`;`)
  await db.run(sql`DROP TABLE \`e706ae1eff60a86858e60d43a8408a40c\`;`)
  await db.run(sql`DROP TABLE \`e2d7410d34f388b4e91b8d3253617c145\`;`)
  await db.run(sql`DROP TABLE \`e8be93ceba4838a2ea2eb22b6dbda9f7d\`;`)
  await db.run(sql`DROP TABLE \`e3e08cdb269b3896c82e9ebaf3a7cdad9\`;`)
  await db.run(sql`DROP TABLE \`ed959efe1dd6a86dc91541e91cc18f307\`;`)
  await db.run(sql`DROP TABLE \`products\`;`)
  await db.run(sql`DROP TABLE \`products_locales\`;`)
  await db.run(sql`DROP TABLE \`products_rels\`;`)
  await db.run(sql`DROP TABLE \`_e807e5fa7ee658a6daf578f601def9edb_v\`;`)
  await db.run(sql`DROP TABLE \`_e706ae1eff60a86858e60d43a8408a40c_v\`;`)
  await db.run(sql`DROP TABLE \`_e2d7410d34f388b4e91b8d3253617c145_v\`;`)
  await db.run(sql`DROP TABLE \`_e8be93ceba4838a2ea2eb22b6dbda9f7d_v\`;`)
  await db.run(sql`DROP TABLE \`_e3e08cdb269b3896c82e9ebaf3a7cdad9_v\`;`)
  await db.run(sql`DROP TABLE \`_ed959efe1dd6a86dc91541e91cc18f307_v\`;`)
  await db.run(sql`DROP TABLE \`_products_v\`;`)
  await db.run(sql`DROP TABLE \`_products_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_products_v_rels\`;`)
  await db.run(sql`DROP TABLE \`e36231b73e55787b6bbebfd9458a6c7d6\`;`)
  await db.run(sql`DROP TABLE \`carts\`;`)
  await db.run(sql`DROP TABLE \`e3acbac9f125c8bad9fe2ad09574853a0\`;`)
  await db.run(sql`DROP TABLE \`orders\`;`)
  await db.run(sql`DROP TABLE \`orders_rels\`;`)
  await db.run(sql`DROP TABLE \`e4375580a944f874eb05f54d12cb85d91\`;`)
  await db.run(sql`DROP TABLE \`transactions\`;`)
  await db.run(sql`DROP TABLE \`ec7b0187f544b883ba491da04c8bac20f\`;`)
  await db.run(sql`DROP TABLE \`ec7b0187f544b883ba491da04c8bac20f_locales\`;`)
  await db.run(sql`DROP TABLE \`e77b9fc908c6084fc900cc66442b89e32\`;`)
  await db.run(sql`DROP TABLE \`e77b9fc908c6084fc900cc66442b89e32_locales\`;`)
  await db.run(sql`DROP TABLE \`e964a176201f3810d8e23c948af516fb2\`;`)
  await db.run(sql`DROP TABLE \`e964a176201f3810d8e23c948af516fb2_locales\`;`)
  await db.run(sql`DROP TABLE \`ed69fe51f407b86e5a973495011c151e9\`;`)
  await db.run(sql`DROP TABLE \`ed69fe51f407b86e5a973495011c151e9_locales\`;`)
  await db.run(sql`DROP TABLE \`e172457e3d41c8a0da66683b4f5b2bb5d\`;`)
  await db.run(sql`DROP TABLE \`e172457e3d41c8a0da66683b4f5b2bb5d_locales\`;`)
  await db.run(sql`DROP TABLE \`e1fef94f431b585ac823da9a3677c38c6\`;`)
  await db.run(sql`DROP TABLE \`e1fef94f431b585ac823da9a3677c38c6_locales\`;`)
  await db.run(sql`DROP TABLE \`e079ab6e4a6a98374b8033579bf65ae20\`;`)
  await db.run(sql`DROP TABLE \`e079ab6e4a6a98374b8033579bf65ae20_locales\`;`)
  await db.run(sql`DROP TABLE \`e87df93fee1818fab87f9c6da399fdb7d\`;`)
  await db.run(sql`DROP TABLE \`e87df93fee1818fab87f9c6da399fdb7d_locales\`;`)
  await db.run(sql`DROP TABLE \`e6d67388f0be98e9fa6d861b333356635\`;`)
  await db.run(sql`DROP TABLE \`e6d67388f0be98e9fa6d861b333356635_locales\`;`)
  await db.run(sql`DROP TABLE \`e17421b6a908d8c008312bf0e38ef9253\`;`)
  await db.run(sql`DROP TABLE \`e17421b6a908d8c008312bf0e38ef9253_locales\`;`)
  await db.run(sql`DROP TABLE \`e7d0b5cfcc0f18d07a0f986e2f1aa3ad3\`;`)
  await db.run(sql`DROP TABLE \`e7d0b5cfcc0f18d07a0f986e2f1aa3ad3_locales\`;`)
  await db.run(sql`DROP TABLE \`forms\`;`)
  await db.run(sql`DROP TABLE \`forms_locales\`;`)
  await db.run(sql`DROP TABLE \`e0fa36534560c842e89b11febfa39e66d\`;`)
  await db.run(sql`DROP TABLE \`form_submissions\`;`)
  await db.run(sql`DROP TABLE \`redirects\`;`)
  await db.run(sql`DROP TABLE \`redirects_rels\`;`)
  await db.run(sql`DROP TABLE \`ead7b4055f97980b6b7934d5acfec3e62\`;`)
  await db.run(sql`DROP TABLE \`search\`;`)
  await db.run(sql`DROP TABLE \`search_locales\`;`)
  await db.run(sql`DROP TABLE \`exports\`;`)
  await db.run(sql`DROP TABLE \`exports_texts\`;`)
  await db.run(sql`DROP TABLE \`imports\`;`)
  await db.run(sql`DROP TABLE \`payload_mcp_api_keys\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs_log\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`payload_query_presets\`;`)
  await db.run(sql`DROP TABLE \`payload_query_presets_rels\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`DROP TABLE \`header_rels\`;`)
  await db.run(sql`DROP TABLE \`footer_nav_items\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`DROP TABLE \`footer_rels\`;`)
}
