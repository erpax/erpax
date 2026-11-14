import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`groups_external_ids\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`groups_external_ids_order_idx\` ON \`groups_external_ids\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`groups_external_ids_parent_id_idx\` ON \`groups_external_ids\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`groups_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email\` text,
  	\`role\` text DEFAULT 'member' NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`groups_members_order_idx\` ON \`groups_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`groups_members_parent_id_idx\` ON \`groups_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`groups\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`name\` text NOT NULL,
  	\`email\` text,
  	\`description\` text,
  	\`kind\` text DEFAULT 'team',
  	\`admin_created\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`groups_uuid_idx\` ON \`groups\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`groups_tenant_idx\` ON \`groups\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`groups_name_idx\` ON \`groups\` (\`name\`);`)
  await db.run(sql`CREATE INDEX \`groups_updated_at_idx\` ON \`groups\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`groups_created_at_idx\` ON \`groups\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_email_idx\` ON \`groups\` (\`tenant_id\`,\`email\`);`)
  await db.run(sql`CREATE TABLE \`groups_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`groups_texts_order_parent\` ON \`groups_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`groups_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	\`groups_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`groups\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`groups_id\`) REFERENCES \`groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`groups_rels_order_idx\` ON \`groups_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`groups_rels_parent_idx\` ON \`groups_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`groups_rels_path_idx\` ON \`groups_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`groups_rels_users_id_idx\` ON \`groups_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`groups_rels_groups_id_idx\` ON \`groups_rels\` (\`groups_id\`);`)
  await db.run(sql`CREATE TABLE \`_groups_v_version_external_ids\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`type\` text NOT NULL,
  	\`value\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_groups_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_groups_v_version_external_ids_order_idx\` ON \`_groups_v_version_external_ids\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_groups_v_version_external_ids_parent_id_idx\` ON \`_groups_v_version_external_ids\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_groups_v_version_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`email\` text,
  	\`role\` text DEFAULT 'member' NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_groups_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_groups_v_version_members_order_idx\` ON \`_groups_v_version_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_groups_v_version_members_parent_id_idx\` ON \`_groups_v_version_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_groups_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_name\` text NOT NULL,
  	\`version_email\` text,
  	\`version_description\` text,
  	\`version_kind\` text DEFAULT 'team',
  	\`version_admin_created\` integer DEFAULT true,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`groups\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_groups_v_parent_idx\` ON \`_groups_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_groups_v_version_version_uuid_idx\` ON \`_groups_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_groups_v_version_version_tenant_idx\` ON \`_groups_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_groups_v_version_version_name_idx\` ON \`_groups_v\` (\`version_name\`);`)
  await db.run(sql`CREATE INDEX \`_groups_v_version_version_updated_at_idx\` ON \`_groups_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_groups_v_version_version_created_at_idx\` ON \`_groups_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_groups_v_created_at_idx\` ON \`_groups_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_groups_v_updated_at_idx\` ON \`_groups_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_email_idx\` ON \`_groups_v\` (\`version_tenant_id\`,\`version_email\`);`)
  await db.run(sql`CREATE TABLE \`_groups_v_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_groups_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_groups_v_texts_order_parent\` ON \`_groups_v_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_groups_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	\`groups_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_groups_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`groups_id\`) REFERENCES \`groups\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_groups_v_rels_order_idx\` ON \`_groups_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_groups_v_rels_parent_idx\` ON \`_groups_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_groups_v_rels_path_idx\` ON \`_groups_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_groups_v_rels_users_id_idx\` ON \`_groups_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`_groups_v_rels_groups_id_idx\` ON \`_groups_v_rels\` (\`groups_id\`);`)
  await db.run(sql`CREATE TABLE \`org_units_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`org_units\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`org_units\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`org_units_breadcrumbs_order_idx\` ON \`org_units_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`org_units_breadcrumbs_parent_id_idx\` ON \`org_units_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`org_units_breadcrumbs_locale_idx\` ON \`org_units_breadcrumbs\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`org_units_breadcrumbs_doc_idx\` ON \`org_units_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`org_units\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`name\` text NOT NULL,
  	\`description\` text,
  	\`parent_id\` text(36),
  	\`block_inheritance\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`org_units\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`org_units_uuid_idx\` ON \`org_units\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`org_units_tenant_idx\` ON \`org_units\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`org_units_parent_idx\` ON \`org_units\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`org_units_updated_at_idx\` ON \`org_units\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`org_units_created_at_idx\` ON \`org_units\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_parent_name_idx\` ON \`org_units\` (\`tenant_id\`,\`parent_id\`,\`name\`);`)
  await db.run(sql`CREATE TABLE \`_org_units_v_version_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`org_units\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_org_units_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_org_units_v_version_breadcrumbs_order_idx\` ON \`_org_units_v_version_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_org_units_v_version_breadcrumbs_parent_id_idx\` ON \`_org_units_v_version_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_org_units_v_version_breadcrumbs_locale_idx\` ON \`_org_units_v_version_breadcrumbs\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`_org_units_v_version_breadcrumbs_doc_idx\` ON \`_org_units_v_version_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`_org_units_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_name\` text NOT NULL,
  	\`version_description\` text,
  	\`version_parent_id\` text(36),
  	\`version_block_inheritance\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`org_units\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parent_id\`) REFERENCES \`org_units\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_org_units_v_parent_idx\` ON \`_org_units_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_org_units_v_version_version_uuid_idx\` ON \`_org_units_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_org_units_v_version_version_tenant_idx\` ON \`_org_units_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_org_units_v_version_version_parent_idx\` ON \`_org_units_v\` (\`version_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_org_units_v_version_version_updated_at_idx\` ON \`_org_units_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_org_units_v_version_version_created_at_idx\` ON \`_org_units_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_org_units_v_created_at_idx\` ON \`_org_units_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_org_units_v_updated_at_idx\` ON \`_org_units_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_parent_version_name_idx\` ON \`_org_units_v\` (\`version_tenant_id\`,\`version_parent_id\`,\`version_name\`);`)
  await db.run(sql`CREATE TABLE \`tenants_domains\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`verified\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tenants_domains_order_idx\` ON \`tenants_domains\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`tenants_domains_parent_id_idx\` ON \`tenants_domains\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`tenants_providers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`provider\` text NOT NULL,
  	\`enabled\` integer DEFAULT true,
  	\`account\` text,
  	\`domain\` text,
  	\`directory\` integer DEFAULT false,
  	\`client_id\` text,
  	\`client_secret\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tenants_providers_order_idx\` ON \`tenants_providers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`tenants_providers_parent_id_idx\` ON \`tenants_providers\` (\`_parent_id\`);`)
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
  await db.run(sql`CREATE TABLE \`users_emails\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`type\` text,
  	\`primary\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_emails_order_idx\` ON \`users_emails\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_emails_parent_id_idx\` ON \`users_emails\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users_phone_numbers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`type\` text,
  	\`primary\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_phone_numbers_order_idx\` ON \`users_phone_numbers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_phone_numbers_parent_id_idx\` ON \`users_phone_numbers\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users_external_ids\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`type\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_external_ids_order_idx\` ON \`users_external_ids\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_external_ids_parent_id_idx\` ON \`users_external_ids\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_texts_order_parent\` ON \`users_texts\` (\`order\`,\`parent_id\`);`)
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
  await db.run(sql`CREATE TABLE \`providers_providers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`provider\` text NOT NULL,
  	\`enabled\` integer DEFAULT true,
  	\`client_id\` text,
  	\`client_secret\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`providers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`providers_providers_order_idx\` ON \`providers_providers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`providers_providers_parent_id_idx\` ON \`providers_providers\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`providers\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`ALTER TABLE \`roles\` ADD \`description\` text;`)
  await db.run(sql`ALTER TABLE \`roles\` ADD \`system\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_roles_v\` ADD \`version_description\` text;`)
  await db.run(sql`ALTER TABLE \`_roles_v\` ADD \`version_system\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`tenants\` ADD \`contact_email\` text;`)
  await db.run(sql`ALTER TABLE \`tenants\` ADD \`contact_phone\` text;`)
  await db.run(sql`ALTER TABLE \`_tenants_v\` ADD \`version_contact_email\` text;`)
  await db.run(sql`ALTER TABLE \`_tenants_v\` ADD \`version_contact_phone\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`given_name\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`middle_name\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`family_name\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`nickname\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`photo_id\` text(36) REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`timezone\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`last_login\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`password_changed_at\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`active\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`inactive_reason\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`org_unit_id\` text(36) REFERENCES org_units(id);`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`recovery_email\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`recovery_phone\` text;`)
  await db.run(sql`CREATE INDEX \`users_photo_idx\` ON \`users\` (\`photo_id\`);`)
  await db.run(sql`CREATE INDEX \`users_org_unit_idx\` ON \`users\` (\`org_unit_id\`);`)
  await db.run(sql`ALTER TABLE \`_users_v\` ADD \`version_given_name\` text;`)
  await db.run(sql`ALTER TABLE \`_users_v\` ADD \`version_middle_name\` text;`)
  await db.run(sql`ALTER TABLE \`_users_v\` ADD \`version_family_name\` text;`)
  await db.run(sql`ALTER TABLE \`_users_v\` ADD \`version_nickname\` text;`)
  await db.run(sql`ALTER TABLE \`_users_v\` ADD \`version_photo_id\` text(36) REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`_users_v\` ADD \`version_timezone\` text;`)
  await db.run(sql`ALTER TABLE \`_users_v\` ADD \`version_last_login\` text;`)
  await db.run(sql`ALTER TABLE \`_users_v\` ADD \`version_password_changed_at\` text;`)
  await db.run(sql`ALTER TABLE \`_users_v\` ADD \`version_active\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`_users_v\` ADD \`version_inactive_reason\` text;`)
  await db.run(sql`ALTER TABLE \`_users_v\` ADD \`version_org_unit_id\` text(36) REFERENCES org_units(id);`)
  await db.run(sql`ALTER TABLE \`_users_v\` ADD \`version_recovery_email\` text;`)
  await db.run(sql`ALTER TABLE \`_users_v\` ADD \`version_recovery_phone\` text;`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_photo_idx\` ON \`_users_v\` (\`version_photo_id\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_org_unit_idx\` ON \`_users_v\` (\`version_org_unit_id\`);`)
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'org-units', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'orders', entity: 'collection', fieldPath: 'approvalChain.comment', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'purchase-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'purchase-requisitions', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'purchase-requisitions', entity: 'collection', fieldPath: 'approvalChain.comment', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'vendor-quotes', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`groups_external_ids\`;`)
  await db.run(sql`DROP TABLE \`groups_members\`;`)
  await db.run(sql`DROP TABLE \`groups\`;`)
  await db.run(sql`DROP TABLE \`groups_texts\`;`)
  await db.run(sql`DROP TABLE \`groups_rels\`;`)
  await db.run(sql`DROP TABLE \`_groups_v_version_external_ids\`;`)
  await db.run(sql`DROP TABLE \`_groups_v_version_members\`;`)
  await db.run(sql`DROP TABLE \`_groups_v\`;`)
  await db.run(sql`DROP TABLE \`_groups_v_texts\`;`)
  await db.run(sql`DROP TABLE \`_groups_v_rels\`;`)
  await db.run(sql`DROP TABLE \`org_units_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`org_units\`;`)
  await db.run(sql`DROP TABLE \`_org_units_v_version_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`_org_units_v\`;`)
  await db.run(sql`DROP TABLE \`tenants_domains\`;`)
  await db.run(sql`DROP TABLE \`tenants_providers\`;`)
  await db.run(sql`DROP TABLE \`_tenants_v_version_domains\`;`)
  await db.run(sql`DROP TABLE \`_tenants_v_version_providers\`;`)
  await db.run(sql`DROP TABLE \`users_emails\`;`)
  await db.run(sql`DROP TABLE \`users_phone_numbers\`;`)
  await db.run(sql`DROP TABLE \`users_external_ids\`;`)
  await db.run(sql`DROP TABLE \`users_texts\`;`)
  await db.run(sql`DROP TABLE \`_users_v_version_emails\`;`)
  await db.run(sql`DROP TABLE \`_users_v_version_phone_numbers\`;`)
  await db.run(sql`DROP TABLE \`_users_v_version_external_ids\`;`)
  await db.run(sql`DROP TABLE \`_users_v_texts\`;`)
  await db.run(sql`DROP TABLE \`providers_providers\`;`)
  await db.run(sql`DROP TABLE \`providers\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_users\` (
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
  await db.run(sql`INSERT INTO \`__new_users\`("id", "uuid", "password", "name", "username", "config_localization_default_locale", "config_localization_display_currency", "config_localization_date_format", "config_features", "updated_at", "created_at", "email", "reset_password_token", "reset_password_expiration", "salt", "hash", "login_attempts", "lock_until") SELECT "id", "uuid", "password", "name", "username", "config_localization_default_locale", "config_localization_display_currency", "config_localization_date_format", "config_features", "updated_at", "created_at", "email", "reset_password_token", "reset_password_expiration", "salt", "hash", "login_attempts", "lock_until" FROM \`users\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`ALTER TABLE \`__new_users\` RENAME TO \`users\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_uuid_idx\` ON \`users\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`users_username_idx\` ON \`users\` (\`username\`);`)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`__new__users_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_password\` text,
  	\`version_name\` text,
  	\`version_username\` text,
  	\`version_config_localization_default_locale\` text,
  	\`version_config_localization_display_currency\` text,
  	\`version_config_localization_date_format\` text DEFAULT 'locale',
  	\`version_config_features\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version_email\` text NOT NULL,
  	\`version_reset_password_token\` text,
  	\`version_reset_password_expiration\` text,
  	\`version_salt\` text,
  	\`version_hash\` text,
  	\`version_login_attempts\` numeric DEFAULT 0,
  	\`version_lock_until\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__users_v\`("id", "parent_id", "version_uuid", "version_password", "version_name", "version_username", "version_config_localization_default_locale", "version_config_localization_display_currency", "version_config_localization_date_format", "version_config_features", "version_updated_at", "version_created_at", "version_email", "version_reset_password_token", "version_reset_password_expiration", "version_salt", "version_hash", "version_login_attempts", "version_lock_until", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_password", "version_name", "version_username", "version_config_localization_default_locale", "version_config_localization_display_currency", "version_config_localization_date_format", "version_config_features", "version_updated_at", "version_created_at", "version_email", "version_reset_password_token", "version_reset_password_expiration", "version_salt", "version_hash", "version_login_attempts", "version_lock_until", "created_at", "updated_at" FROM \`_users_v\`;`)
  await db.run(sql`DROP TABLE \`_users_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__users_v\` RENAME TO \`_users_v\`;`)
  await db.run(sql`CREATE INDEX \`_users_v_parent_idx\` ON \`_users_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_uuid_idx\` ON \`_users_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_username_idx\` ON \`_users_v\` (\`version_username\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_updated_at_idx\` ON \`_users_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_created_at_idx\` ON \`_users_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_email_idx\` ON \`_users_v\` (\`version_email\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_created_at_idx\` ON \`_users_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_updated_at_idx\` ON \`_users_v\` (\`updated_at\`);`)
  await db.run(sql`ALTER TABLE \`roles\` DROP COLUMN \`description\`;`)
  await db.run(sql`ALTER TABLE \`roles\` DROP COLUMN \`system\`;`)
  await db.run(sql`ALTER TABLE \`_roles_v\` DROP COLUMN \`version_description\`;`)
  await db.run(sql`ALTER TABLE \`_roles_v\` DROP COLUMN \`version_system\`;`)
  await db.run(sql`ALTER TABLE \`tenants\` DROP COLUMN \`contact_email\`;`)
  await db.run(sql`ALTER TABLE \`tenants\` DROP COLUMN \`contact_phone\`;`)
  await db.run(sql`ALTER TABLE \`_tenants_v\` DROP COLUMN \`version_contact_email\`;`)
  await db.run(sql`ALTER TABLE \`_tenants_v\` DROP COLUMN \`version_contact_phone\`;`)
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'org-units', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'orders', entity: 'collection', fieldPath: 'approvalChain.comment', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'purchase-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'purchase-requisitions', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'purchase-requisitions', entity: 'collection', fieldPath: 'approvalChain.comment', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'vendor-quotes', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
}
