import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_document_links_rules\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`source_element\` text,
  	\`target_element\` text,
  	\`transformation\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_document_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_links_rules_order_idx\` ON \`pages_document_links_rules\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_links_rules_parent_id_idx\` ON \`pages_document_links_rules\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_document_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`page_id\` text(36),
  	\`kind\` text,
  	\`status\` text DEFAULT 'pending-review',
  	FOREIGN KEY (\`page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_links_order_idx\` ON \`pages_document_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_links_parent_id_idx\` ON \`pages_document_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_links_page_idx\` ON \`pages_document_links\` (\`page_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_version_document_links_rules\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`source_element\` text,
  	\`target_element\` text,
  	\`transformation\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_version_document_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_version_document_links_rules_order_idx\` ON \`_pages_v_version_document_links_rules\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_document_links_rules_parent_id_idx\` ON \`_pages_v_version_document_links_rules\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_version_document_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`page_id\` text(36),
  	\`kind\` text,
  	\`status\` text DEFAULT 'pending-review',
  	\`_uuid\` text,
  	FOREIGN KEY (\`page_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_version_document_links_order_idx\` ON \`_pages_v_version_document_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_document_links_parent_id_idx\` ON \`_pages_v_version_document_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_document_links_page_idx\` ON \`_pages_v_version_document_links\` (\`page_id\`);`)
  await db.run(sql`DROP TABLE \`reporting_standards_mappings_mapping_r_b810673f\`;`)
  await db.run(sql`DROP TABLE \`reporting_standards_mappings\`;`)
  await db.run(sql`DROP TABLE \`reporting_standards\`;`)
  await db.run(sql`DROP TABLE \`reporting_standards_rels\`;`)
  await db.run(sql`DROP TABLE \`_reporting_standards_mappings_mapping_r_b810673f_v\`;`)
  await db.run(sql`DROP TABLE \`_reporting_standards_v_version_mappings\`;`)
  await db.run(sql`DROP TABLE \`_reporting_standards_v\`;`)
  await db.run(sql`DROP TABLE \`_reporting_standards_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`document_type\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`document_code\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`document_version\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`document_effective_date\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`document_classification\` text;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`document_jurisdiction_id\` text(36) REFERENCES tax_jurisdictions(id);`)
  await db.run(sql`CREATE INDEX \`pages_document_type_idx\` ON \`pages\` (\`document_type\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_document_jurisdiction_idx\` ON \`pages\` (\`document_jurisdiction_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_rels\` ADD \`media_id\` text(36) REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`pages_rels_media_id_idx\` ON \`pages_rels\` (\`media_id\`,\`locale\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_document_type\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_document_code\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_document_version\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_document_effective_date\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_document_classification\` text;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_document_jurisdiction_id\` text(36) REFERENCES tax_jurisdictions(id);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_document_type_idx\` ON \`_pages_v\` (\`version_document_type\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_document_version_document_jurisdiction_idx\` ON \`_pages_v\` (\`version_document_jurisdiction_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_rels\` ADD \`media_id\` text(36) REFERENCES media(id);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_media_id_idx\` ON \`_pages_v_rels\` (\`media_id\`,\`locale\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`reporting_standards_mappings_mapping_r_b810673f\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`source_element\` text,
  	\`target_element\` text,
  	\`transformation\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`reporting_standards_mappings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`reporting_standards_mappings_mapping_r_b810673f_order_idx\` ON \`reporting_standards_mappings_mapping_r_b810673f\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_mappings_mapping_r_b810673f_parent_id_idx\` ON \`reporting_standards_mappings_mapping_r_b810673f\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`reporting_standards_mappings\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`mapping_name\` text NOT NULL,
  	\`to_standard_id\` text(36) NOT NULL,
  	\`mapping_type\` text NOT NULL,
  	\`status\` text DEFAULT 'pending-review',
  	FOREIGN KEY (\`to_standard_id\`) REFERENCES \`reporting_standards\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`reporting_standards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`reporting_standards_mappings_order_idx\` ON \`reporting_standards_mappings\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_mappings_parent_id_idx\` ON \`reporting_standards_mappings\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_mappings_to_standard_idx\` ON \`reporting_standards_mappings\` (\`to_standard_id\`);`)
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
  	FOREIGN KEY (\`jurisdiction_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reference_material_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`reporting_standards_uuid_idx\` ON \`reporting_standards\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_tenant_idx\` ON \`reporting_standards\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_standard_name_idx\` ON \`reporting_standards\` (\`standard_name\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_jurisdiction_idx\` ON \`reporting_standards\` (\`jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_reference_material_idx\` ON \`reporting_standards\` (\`reference_material_id\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_updated_at_idx\` ON \`reporting_standards\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_created_at_idx\` ON \`reporting_standards\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`reporting_standards_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`reporting_standards\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`reporting_standards_rels_order_idx\` ON \`reporting_standards_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_rels_parent_idx\` ON \`reporting_standards_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_rels_path_idx\` ON \`reporting_standards_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_rels_users_id_idx\` ON \`reporting_standards_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_reporting_standards_mappings_mapping_r_b810673f_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`source_element\` text,
  	\`target_element\` text,
  	\`transformation\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_reporting_standards_v_version_mappings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_reporting_standards_mappings_mapping_r_b810673f_v_order_idx\` ON \`_reporting_standards_mappings_mapping_r_b810673f_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_mappings_mapping_r_b810673f_v_parent_id_idx\` ON \`_reporting_standards_mappings_mapping_r_b810673f_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_reporting_standards_v_version_mappings\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`mapping_name\` text NOT NULL,
  	\`to_standard_id\` text(36) NOT NULL,
  	\`mapping_type\` text NOT NULL,
  	\`status\` text DEFAULT 'pending-review',
  	\`_uuid\` text,
  	FOREIGN KEY (\`to_standard_id\`) REFERENCES \`reporting_standards\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_reporting_standards_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_version_mappings_order_idx\` ON \`_reporting_standards_v_version_mappings\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_version_mappings_parent_id_idx\` ON \`_reporting_standards_v_version_mappings\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_version_mappings_to_standard_idx\` ON \`_reporting_standards_v_version_mappings\` (\`to_standard_id\`);`)
  await db.run(sql`CREATE TABLE \`_reporting_standards_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_standard_name\` text NOT NULL,
  	\`version_standard_code\` text NOT NULL,
  	\`version_standard_type\` text NOT NULL,
  	\`version_jurisdiction_id\` text(36),
  	\`version_description\` text,
  	\`version_version\` text,
  	\`version_effective_date\` text NOT NULL,
  	\`version_reference_material_id\` text(36),
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`reporting_standards\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_jurisdiction_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_reference_material_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_parent_idx\` ON \`_reporting_standards_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_version_version_uuid_idx\` ON \`_reporting_standards_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_version_version_tenant_idx\` ON \`_reporting_standards_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_version_version_standard_name_idx\` ON \`_reporting_standards_v\` (\`version_standard_name\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_version_version_jurisdiction_idx\` ON \`_reporting_standards_v\` (\`version_jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_version_version_reference_materia_idx\` ON \`_reporting_standards_v\` (\`version_reference_material_id\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_version_version_updated_at_idx\` ON \`_reporting_standards_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_version_version_created_at_idx\` ON \`_reporting_standards_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_created_at_idx\` ON \`_reporting_standards_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_updated_at_idx\` ON \`_reporting_standards_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_reporting_standards_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_reporting_standards_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_rels_order_idx\` ON \`_reporting_standards_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_rels_parent_idx\` ON \`_reporting_standards_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_rels_path_idx\` ON \`_reporting_standards_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_rels_users_id_idx\` ON \`_reporting_standards_v_rels\` (\`users_id\`);`)
  await db.run(sql`DROP TABLE \`pages_document_links_rules\`;`)
  await db.run(sql`DROP TABLE \`pages_document_links\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_document_links_rules\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_document_links\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`seed\` text,
  	\`published_at\` text,
  	\`slug\` text,
  	\`parent_id\` text(36),
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages\`("id", "uuid", "tenant_id", "seed", "published_at", "slug", "parent_id", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "seed", "published_at", "slug", "parent_id", "updated_at", "created_at" FROM \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages\` RENAME TO \`pages\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_uuid_idx\` ON \`pages\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`pages_tenant_idx\` ON \`pages\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_seed_idx\` ON \`pages\` (\`seed\`);`)
  await db.run(sql`CREATE INDEX \`pages_published_at_idx\` ON \`pages\` (\`published_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_parent_idx\` ON \`pages\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_slug_1_idx\` ON \`pages\` (\`tenant_id\`,\`slug\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`locale\` text,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	\`categories_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_rels\`("id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "users_id") SELECT "id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "users_id" FROM \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_rels\` RENAME TO \`pages_rels\`;`)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_locale_idx\` ON \`pages_rels\` (\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_pages_id_idx\` ON \`pages_rels\` (\`pages_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_posts_id_idx\` ON \`pages_rels\` (\`posts_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_categories_id_idx\` ON \`pages_rels\` (\`categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_users_id_idx\` ON \`pages_rels\` (\`users_id\`,\`locale\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_seed\` text,
  	\`version_published_at\` text,
  	\`version_slug\` text,
  	\`version_parent_id\` text(36),
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_seed", "version_published_at", "version_slug", "version_parent_id", "version_updated_at", "version_created_at", "created_at", "updated_at", "published_locale", "latest", "autosave") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_seed", "version_published_at", "version_slug", "version_parent_id", "version_updated_at", "version_created_at", "created_at", "updated_at", "published_locale", "latest", "autosave" FROM \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v\` RENAME TO \`_pages_v\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_uuid_idx\` ON \`_pages_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_tenant_idx\` ON \`_pages_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_seed_idx\` ON \`_pages_v\` (\`version_seed\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_published_at_idx\` ON \`_pages_v\` (\`version_published_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_parent_idx\` ON \`_pages_v\` (\`version_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_published_locale_idx\` ON \`_pages_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_slug_1_idx\` ON \`_pages_v\` (\`version_tenant_id\`,\`version_slug\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`locale\` text,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	\`categories_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_rels\`("id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "users_id") SELECT "id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "users_id" FROM \`_pages_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_rels\` RENAME TO \`_pages_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_order_idx\` ON \`_pages_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_parent_idx\` ON \`_pages_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_path_idx\` ON \`_pages_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_locale_idx\` ON \`_pages_v_rels\` (\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_pages_id_idx\` ON \`_pages_v_rels\` (\`pages_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_posts_id_idx\` ON \`_pages_v_rels\` (\`posts_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_categories_id_idx\` ON \`_pages_v_rels\` (\`categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_users_id_idx\` ON \`_pages_v_rels\` (\`users_id\`,\`locale\`);`)
}
