import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`_tenants_v_version_domains\`;`)
  await db.run(sql`DROP TABLE \`_tenants_v_version_apps\`;`)
  await db.run(sql`DROP TABLE \`_tenants_v_version_providers\`;`)
  await db.run(sql`DROP TABLE \`_tenants_v\`;`)
  await db.run(sql`DROP TABLE \`_tenants_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_users_v_version_emails\`;`)
  await db.run(sql`DROP TABLE \`_users_v_version_phone_numbers\`;`)
  await db.run(sql`DROP TABLE \`_users_v_version_external_ids\`;`)
  await db.run(sql`DROP TABLE \`_users_v_version_competencies\`;`)
  await db.run(sql`DROP TABLE \`_users_v_version_roles\`;`)
  await db.run(sql`DROP TABLE \`_users_v_version_tenants_roles\`;`)
  await db.run(sql`DROP TABLE \`_users_v_version_tenants\`;`)
  await db.run(sql`DROP TABLE \`_users_v_version_sessions\`;`)
  await db.run(sql`DROP TABLE \`_users_v\`;`)
  await db.run(sql`DROP TABLE \`_users_v_texts\`;`)
  await db.run(sql`DROP TABLE \`_users_v_rels\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`_tenants_v_version_domains\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`verified\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_tenants_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_tenants_v_version_domains_order_idx\` ON \`_tenants_v_version_domains\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_tenants_v_version_domains_parent_id_idx\` ON \`_tenants_v_version_domains\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_tenants_v_version_apps\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_tenants_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_tenants_v_version_apps_order_idx\` ON \`_tenants_v_version_apps\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_tenants_v_version_apps_parent_idx\` ON \`_tenants_v_version_apps\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_tenants_v_version_providers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`provider\` text NOT NULL,
  	\`enabled\` integer DEFAULT true,
  	\`account\` text,
  	\`domain\` text,
  	\`directory\` integer DEFAULT false,
  	\`client_id\` text,
  	\`client_secret\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_tenants_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_tenants_v_version_providers_order_idx\` ON \`_tenants_v_version_providers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_tenants_v_version_providers_parent_id_idx\` ON \`_tenants_v_version_providers\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_tenants_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_name\` text NOT NULL,
  	\`version_domain\` text,
  	\`version_app\` text,
  	\`version_contact_email\` text,
  	\`version_contact_phone\` text,
  	\`version_slug\` text NOT NULL,
  	\`version_locales\` text DEFAULT '[]',
  	\`version_config_identity_country\` text,
  	\`version_config_identity_legal_name\` text,
  	\`version_config_identity_tax_registration\` text,
  	\`version_config_localization_default_locale\` text,
  	\`version_config_localization_fallback_locale\` text,
  	\`version_config_currency_reporting_currency\` text,
  	\`version_config_accounting_standard\` text,
  	\`version_config_accounting_fiscal_year_start_month\` numeric DEFAULT 1,
  	\`version_allow_public_read\` integer DEFAULT false,
  	\`version_public_site_url\` text,
  	\`version_stripe_publishable_key\` text,
  	\`version_stripe_secret_key\` text,
  	\`version_stripe_webhook_secret\` text,
  	\`version_integration_settings\` text,
  	\`version_email_default_from_address\` text,
  	\`version_email_default_from_name\` text,
  	\`version_mcp_api_key\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_tenants_v_parent_idx\` ON \`_tenants_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_tenants_v_version_version_uuid_idx\` ON \`_tenants_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_tenants_v_version_version_name_idx\` ON \`_tenants_v\` (\`version_name\`);`)
  await db.run(sql`CREATE INDEX \`_tenants_v_version_version_domain_idx\` ON \`_tenants_v\` (\`version_domain\`);`)
  await db.run(sql`CREATE INDEX \`_tenants_v_version_version_app_idx\` ON \`_tenants_v\` (\`version_app\`);`)
  await db.run(sql`CREATE INDEX \`_tenants_v_version_version_slug_idx\` ON \`_tenants_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_tenants_v_version_version_allow_public_read_idx\` ON \`_tenants_v\` (\`version_allow_public_read\`);`)
  await db.run(sql`CREATE INDEX \`_tenants_v_version_version_updated_at_idx\` ON \`_tenants_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_tenants_v_version_version_created_at_idx\` ON \`_tenants_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_tenants_v_created_at_idx\` ON \`_tenants_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_tenants_v_updated_at_idx\` ON \`_tenants_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_tenants_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_tenants_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_tenants_v_rels_order_idx\` ON \`_tenants_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_tenants_v_rels_parent_idx\` ON \`_tenants_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_tenants_v_rels_path_idx\` ON \`_tenants_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_tenants_v_rels_users_id_idx\` ON \`_tenants_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_users_v_version_emails\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`type\` text,
  	\`primary\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_users_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_users_v_version_emails_order_idx\` ON \`_users_v_version_emails\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_emails_parent_id_idx\` ON \`_users_v_version_emails\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_users_v_version_phone_numbers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`type\` text,
  	\`primary\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_users_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_users_v_version_phone_numbers_order_idx\` ON \`_users_v_version_phone_numbers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_phone_numbers_parent_id_idx\` ON \`_users_v_version_phone_numbers\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_users_v_version_external_ids\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`type\` text NOT NULL,
  	\`value\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_users_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_users_v_version_external_ids_order_idx\` ON \`_users_v_version_external_ids\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_external_ids_parent_id_idx\` ON \`_users_v_version_external_ids\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_users_v_version_competencies\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`competency\` text NOT NULL,
  	\`proficiency\` numeric,
  	\`assessed_at\` text,
  	\`evidence\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_users_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_users_v_version_competencies_order_idx\` ON \`_users_v_version_competencies\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_competencies_parent_id_idx\` ON \`_users_v_version_competencies\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_competencies_competency_idx\` ON \`_users_v_version_competencies\` (\`competency\`);`)
  await db.run(sql`CREATE TABLE \`_users_v_version_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_users_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_users_v_version_roles_order_idx\` ON \`_users_v_version_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_roles_parent_idx\` ON \`_users_v_version_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_users_v_version_tenants_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_users_v_version_tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_users_v_version_tenants_roles_order_idx\` ON \`_users_v_version_tenants_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_tenants_roles_parent_idx\` ON \`_users_v_version_tenants_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_users_v_version_tenants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`tenant_id\` text(36) NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_users_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_users_v_version_tenants_order_idx\` ON \`_users_v_version_tenants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_tenants_parent_id_idx\` ON \`_users_v_version_tenants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_tenants_tenant_idx\` ON \`_users_v_version_tenants\` (\`tenant_id\`);`)
  await db.run(sql`CREATE TABLE \`_users_v_version_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`_uuid\` text NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	\`refresh_count\` numeric,
  	\`refreshed_at\` text,
  	\`label\` text,
  	\`type\` text,
  	\`metadata\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_users_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_users_v_version_sessions_order_idx\` ON \`_users_v_version_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_sessions_parent_id_idx\` ON \`_users_v_version_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_users_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_password\` text,
  	\`version_name\` text,
  	\`version_given_name\` text,
  	\`version_middle_name\` text,
  	\`version_family_name\` text,
  	\`version_nickname\` text,
  	\`version_photo_id\` text(36),
  	\`version_timezone\` text,
  	\`version_last_login\` text,
  	\`version_password_changed_at\` text,
  	\`version_active\` integer DEFAULT true,
  	\`version_inactive_reason\` text,
  	\`version_org_unit_id\` text(36),
  	\`version_recovery_email\` text,
  	\`version_recovery_phone\` text,
  	\`version_username\` text,
  	\`version_config_localization_default_locale\` text,
  	\`version_config_localization_display_currency\` text,
  	\`version_config_localization_date_format\` text DEFAULT 'locale',
  	\`version_config_features\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version_api_key\` text,
  	\`version_api_key_last4\` text,
  	\`version_api_key_index\` text,
  	\`version_email\` text NOT NULL,
  	\`version_reset_password_token\` text,
  	\`version_reset_password_expiration\` text,
  	\`version_salt\` text,
  	\`version_hash\` text,
  	\`version_reset_password_requested_at\` text,
  	\`version_login_attempts\` numeric DEFAULT 0,
  	\`version_lock_until\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_org_unit_id\`) REFERENCES \`org_units\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_users_v_parent_idx\` ON \`_users_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_uuid_idx\` ON \`_users_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_name_idx\` ON \`_users_v\` (\`version_name\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_photo_idx\` ON \`_users_v\` (\`version_photo_id\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_org_unit_idx\` ON \`_users_v\` (\`version_org_unit_id\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_username_idx\` ON \`_users_v\` (\`version_username\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_updated_at_idx\` ON \`_users_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_created_at_idx\` ON \`_users_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_email_idx\` ON \`_users_v\` (\`version_email\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_created_at_idx\` ON \`_users_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_updated_at_idx\` ON \`_users_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_users_v_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_users_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_users_v_texts_order_parent\` ON \`_users_v_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_users_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`roles_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_users_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`roles_id\`) REFERENCES \`roles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_users_v_rels_order_idx\` ON \`_users_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_rels_parent_idx\` ON \`_users_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_rels_path_idx\` ON \`_users_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_rels_roles_id_idx\` ON \`_users_v_rels\` (\`roles_id\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_rels_users_id_idx\` ON \`_users_v_rels\` (\`users_id\`);`)
}
