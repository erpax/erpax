import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_document_details_management_cert_b944cc9a\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`assertion\` text,
  	\`certification_level\` text DEFAULT 'fully-certified',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_document_details_management_cert_8b348716\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_management_cert_b944cc9a_order_idx\` ON \`pages_document_details_management_cert_b944cc9a\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_management_cert_b944cc9a_parent_id_idx\` ON \`pages_document_details_management_cert_b944cc9a\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_document_details_management_cert_8b348716\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`certification_type\` text,
  	\`certifying_officer\` text,
  	\`entity_id\` text(36),
  	\`block_name\` text,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_management_cert_8b348716_order_idx\` ON \`pages_document_details_management_cert_8b348716\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_management_cert_8b348716_parent_id_idx\` ON \`pages_document_details_management_cert_8b348716\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_management_cert_8b348716_path_idx\` ON \`pages_document_details_management_cert_8b348716\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_management_cert_8b348716_entity_idx\` ON \`pages_document_details_management_cert_8b348716\` (\`entity_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_management_cert_b944cc9a_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`assertion\` text,
  	\`certification_level\` text DEFAULT 'fully-certified',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_document_details_management_cert_8b348716_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_management_cert_b944cc9a_v_order_idx\` ON \`_pages_document_details_management_cert_b944cc9a_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_management_cert_b944cc9a_v_parent_id_idx\` ON \`_pages_document_details_management_cert_b944cc9a_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_management_cert_8b348716_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`certification_type\` text,
  	\`certifying_officer\` text,
  	\`entity_id\` text(36),
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_management_cert_8b348716_v_order_idx\` ON \`_pages_document_details_management_cert_8b348716_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_management_cert_8b348716_v_parent_id_idx\` ON \`_pages_document_details_management_cert_8b348716_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_management_cert_8b348716_v_path_idx\` ON \`_pages_document_details_management_cert_8b348716_v\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_management_cert_8b348716_v_entit_idx\` ON \`_pages_document_details_management_cert_8b348716_v\` (\`entity_id\`);`)
  await db.run(sql`DROP TABLE \`management_certifications_assertions\`;`)
  await db.run(sql`DROP TABLE \`management_certifications\`;`)
  await db.run(sql`DROP TABLE \`management_certifications_rels\`;`)
  await db.run(sql`DROP TABLE \`_management_certifications_v_version_assertions\`;`)
  await db.run(sql`DROP TABLE \`_management_certifications_v\`;`)
  await db.run(sql`DROP TABLE \`_management_certifications_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`pages_rels\` ADD \`audit_findings_id\` text(36) REFERENCES audit_findings(id);`)
  await db.run(sql`CREATE INDEX \`pages_rels_audit_findings_id_idx\` ON \`pages_rels\` (\`audit_findings_id\`,\`locale\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_rels\` ADD \`audit_findings_id\` text(36) REFERENCES audit_findings(id);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_audit_findings_id_idx\` ON \`_pages_v_rels\` (\`audit_findings_id\`,\`locale\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`management_certifications_assertions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`assertion\` text,
  	\`certification_level\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`management_certifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`management_certifications_assertions_order_idx\` ON \`management_certifications_assertions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`management_certifications_assertions_parent_id_idx\` ON \`management_certifications_assertions\` (\`_parent_id\`);`)
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
  await db.run(sql`CREATE INDEX \`management_certifications_certification_name_idx\` ON \`management_certifications\` (\`certification_name\`);`)
  await db.run(sql`CREATE INDEX \`management_certifications_signed_document_idx\` ON \`management_certifications\` (\`signed_document_id\`);`)
  await db.run(sql`CREATE INDEX \`management_certifications_updated_at_idx\` ON \`management_certifications\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`management_certifications_created_at_idx\` ON \`management_certifications\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`management_certifications_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_findings_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`management_certifications\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`management_certifications_rels_order_idx\` ON \`management_certifications_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`management_certifications_rels_parent_idx\` ON \`management_certifications_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`management_certifications_rels_path_idx\` ON \`management_certifications_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`management_certifications_rels_audit_findings_id_idx\` ON \`management_certifications_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE INDEX \`management_certifications_rels_users_id_idx\` ON \`management_certifications_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_management_certifications_v_version_assertions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`assertion\` text,
  	\`certification_level\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_management_certifications_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_management_certifications_v_version_assertions_order_idx\` ON \`_management_certifications_v_version_assertions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_management_certifications_v_version_assertions_parent_id_idx\` ON \`_management_certifications_v_version_assertions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_management_certifications_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_entity_id\` text(36) NOT NULL,
  	\`version_certification_name\` text NOT NULL,
  	\`version_certifying_officer\` text NOT NULL,
  	\`version_certification_date\` text NOT NULL,
  	\`version_certification_type\` text NOT NULL,
  	\`version_scope\` text,
  	\`version_signed_document_id\` text(36),
  	\`version_status\` text DEFAULT 'current',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`management_certifications\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_signed_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_management_certifications_v_parent_idx\` ON \`_management_certifications_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_management_certifications_v_version_version_uuid_idx\` ON \`_management_certifications_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_management_certifications_v_version_version_tenant_idx\` ON \`_management_certifications_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_management_certifications_v_version_version_entity_idx\` ON \`_management_certifications_v\` (\`version_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`_management_certifications_v_version_version_certificati_idx\` ON \`_management_certifications_v\` (\`version_certification_name\`);`)
  await db.run(sql`CREATE INDEX \`_management_certifications_v_version_version_signed_docu_idx\` ON \`_management_certifications_v\` (\`version_signed_document_id\`);`)
  await db.run(sql`CREATE INDEX \`_management_certifications_v_version_version_updated_at_idx\` ON \`_management_certifications_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_management_certifications_v_version_version_created_at_idx\` ON \`_management_certifications_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_management_certifications_v_created_at_idx\` ON \`_management_certifications_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_management_certifications_v_updated_at_idx\` ON \`_management_certifications_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_management_certifications_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_findings_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_management_certifications_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_management_certifications_v_rels_order_idx\` ON \`_management_certifications_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_management_certifications_v_rels_parent_idx\` ON \`_management_certifications_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_management_certifications_v_rels_path_idx\` ON \`_management_certifications_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_management_certifications_v_rels_audit_findings_id_idx\` ON \`_management_certifications_v_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE INDEX \`_management_certifications_v_rels_users_id_idx\` ON \`_management_certifications_v_rels\` (\`users_id\`);`)
  await db.run(sql`DROP TABLE \`pages_document_details_management_cert_b944cc9a\`;`)
  await db.run(sql`DROP TABLE \`pages_document_details_management_cert_8b348716\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_management_cert_b944cc9a_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_management_cert_8b348716_v\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`locale\` text,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	\`categories_id\` text(36),
  	\`media_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_rels\`("id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "users_id") SELECT "id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "users_id" FROM \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_rels\` RENAME TO \`pages_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_locale_idx\` ON \`pages_rels\` (\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_pages_id_idx\` ON \`pages_rels\` (\`pages_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_posts_id_idx\` ON \`pages_rels\` (\`posts_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_categories_id_idx\` ON \`pages_rels\` (\`categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_media_id_idx\` ON \`pages_rels\` (\`media_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_users_id_idx\` ON \`pages_rels\` (\`users_id\`,\`locale\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`locale\` text,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	\`categories_id\` text(36),
  	\`media_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_rels\`("id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "users_id") SELECT "id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "users_id" FROM \`_pages_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_rels\` RENAME TO \`_pages_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_order_idx\` ON \`_pages_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_parent_idx\` ON \`_pages_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_path_idx\` ON \`_pages_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_locale_idx\` ON \`_pages_v_rels\` (\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_pages_id_idx\` ON \`_pages_v_rels\` (\`pages_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_posts_id_idx\` ON \`_pages_v_rels\` (\`posts_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_categories_id_idx\` ON \`_pages_v_rels\` (\`categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_media_id_idx\` ON \`_pages_v_rels\` (\`media_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_users_id_idx\` ON \`_pages_v_rels\` (\`users_id\`,\`locale\`);`)
}
