import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_document_details_statutory_repor_07416312\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_name\` text,
  	\`sequence\` numeric,
  	\`mandatory\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_document_details_statutory_repor_ad65ea54\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_statutory_repor_07416312_order_idx\` ON \`pages_document_details_statutory_repor_07416312\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_statutory_repor_07416312_parent_id_idx\` ON \`pages_document_details_statutory_repor_07416312\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_document_details_statutory_repor_c2b41a0a\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`mapping_name\` text,
  	\`field_name\` text,
  	\`field_type\` text,
  	\`mandatory\` integer DEFAULT true,
  	\`source_collection\` text,
  	\`source_field\` text,
  	\`transformation\` text,
  	\`validation_rules\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_document_details_statutory_repor_ad65ea54\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_statutory_repor_c2b41a0a_order_idx\` ON \`pages_document_details_statutory_repor_c2b41a0a\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_statutory_repor_c2b41a0a_parent_id_idx\` ON \`pages_document_details_statutory_repor_c2b41a0a\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_document_details_statutory_repor_ad65ea54\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`report_type\` text,
  	\`entity_type_id\` text(36),
  	\`effective_to\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`entity_type_id\`) REFERENCES \`entity_types\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_statutory_repor_ad65ea54_order_idx\` ON \`pages_document_details_statutory_repor_ad65ea54\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_statutory_repor_ad65ea54_parent_id_idx\` ON \`pages_document_details_statutory_repor_ad65ea54\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_statutory_repor_ad65ea54_path_idx\` ON \`pages_document_details_statutory_repor_ad65ea54\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_statutory_repor_ad65ea54_entity_t_idx\` ON \`pages_document_details_statutory_repor_ad65ea54\` (\`entity_type_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_statutory_repor_07416312_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`section_name\` text,
  	\`sequence\` numeric,
  	\`mandatory\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_document_details_statutory_repor_ad65ea54_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_statutory_repor_07416312_v_order_idx\` ON \`_pages_document_details_statutory_repor_07416312_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_statutory_repor_07416312_v_parent_id_idx\` ON \`_pages_document_details_statutory_repor_07416312_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_statutory_repor_c2b41a0a_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`mapping_name\` text,
  	\`field_name\` text,
  	\`field_type\` text,
  	\`mandatory\` integer DEFAULT true,
  	\`source_collection\` text,
  	\`source_field\` text,
  	\`transformation\` text,
  	\`validation_rules\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_document_details_statutory_repor_ad65ea54_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_statutory_repor_c2b41a0a_v_order_idx\` ON \`_pages_document_details_statutory_repor_c2b41a0a_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_statutory_repor_c2b41a0a_v_parent_id_idx\` ON \`_pages_document_details_statutory_repor_c2b41a0a_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_statutory_repor_ad65ea54_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`report_type\` text,
  	\`entity_type_id\` text(36),
  	\`effective_to\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`entity_type_id\`) REFERENCES \`entity_types\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_statutory_repor_ad65ea54_v_order_idx\` ON \`_pages_document_details_statutory_repor_ad65ea54_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_statutory_repor_ad65ea54_v_parent_id_idx\` ON \`_pages_document_details_statutory_repor_ad65ea54_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_statutory_repor_ad65ea54_v_path_idx\` ON \`_pages_document_details_statutory_repor_ad65ea54_v\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_statutory_repor_ad65ea54_v_entit_idx\` ON \`_pages_document_details_statutory_repor_ad65ea54_v\` (\`entity_type_id\`);`)
  await db.run(sql`DROP TABLE \`statutory_report_templates_sections\`;`)
  await db.run(sql`DROP TABLE \`statutory_report_templates_field_mappi_31fb556a\`;`)
  await db.run(sql`DROP TABLE \`statutory_report_templates\`;`)
  await db.run(sql`DROP TABLE \`statutory_report_templates_rels\`;`)
  await db.run(sql`DROP TABLE \`_statutory_report_templates_v_version_sections\`;`)
  await db.run(sql`DROP TABLE \`_statutory_report_templates_field_mappi_31fb556a_v\`;`)
  await db.run(sql`DROP TABLE \`_statutory_report_templates_v\`;`)
  await db.run(sql`DROP TABLE \`_statutory_report_templates_v_rels\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`statutory_report_templates_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_name\` text,
  	\`sequence\` numeric,
  	\`mandatory\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`statutory_report_templates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_sections_order_idx\` ON \`statutory_report_templates_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_sections_parent_id_idx\` ON \`statutory_report_templates_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`statutory_report_templates_field_mappi_31fb556a\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`mapping_name\` text NOT NULL,
  	\`field_name\` text NOT NULL,
  	\`field_type\` text,
  	\`source_collection\` text,
  	\`source_field\` text,
  	\`transformation\` text,
  	\`mandatory\` integer DEFAULT true,
  	\`validation_rules\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`statutory_report_templates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_field_mappi_31fb556a_order_idx\` ON \`statutory_report_templates_field_mappi_31fb556a\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_field_mappi_31fb556a_parent_id_idx\` ON \`statutory_report_templates_field_mappi_31fb556a\` (\`_parent_id\`);`)
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
  	FOREIGN KEY (\`jurisdiction_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_type_id\`) REFERENCES \`entity_types\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`template_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`statutory_report_templates_uuid_idx\` ON \`statutory_report_templates\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_tenant_idx\` ON \`statutory_report_templates\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_template_name_idx\` ON \`statutory_report_templates\` (\`template_name\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_jurisdiction_idx\` ON \`statutory_report_templates\` (\`jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_entity_type_idx\` ON \`statutory_report_templates\` (\`entity_type_id\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_template_document_idx\` ON \`statutory_report_templates\` (\`template_document_id\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_updated_at_idx\` ON \`statutory_report_templates\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_created_at_idx\` ON \`statutory_report_templates\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`statutory_report_templates_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`statutory_report_templates\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_rels_order_idx\` ON \`statutory_report_templates_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_rels_parent_idx\` ON \`statutory_report_templates_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_rels_path_idx\` ON \`statutory_report_templates_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_rels_users_id_idx\` ON \`statutory_report_templates_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_statutory_report_templates_v_version_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`section_name\` text,
  	\`sequence\` numeric,
  	\`mandatory\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_statutory_report_templates_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_sections_order_idx\` ON \`_statutory_report_templates_v_version_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_sections_parent_id_idx\` ON \`_statutory_report_templates_v_version_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_statutory_report_templates_field_mappi_31fb556a_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`mapping_name\` text NOT NULL,
  	\`field_name\` text NOT NULL,
  	\`field_type\` text,
  	\`source_collection\` text,
  	\`source_field\` text,
  	\`transformation\` text,
  	\`mandatory\` integer DEFAULT true,
  	\`validation_rules\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_statutory_report_templates_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_field_mappi_31fb556a_v_order_idx\` ON \`_statutory_report_templates_field_mappi_31fb556a_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_field_mappi_31fb556a_v_parent_id_idx\` ON \`_statutory_report_templates_field_mappi_31fb556a_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_statutory_report_templates_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_template_name\` text NOT NULL,
  	\`version_jurisdiction_id\` text(36) NOT NULL,
  	\`version_report_type\` text NOT NULL,
  	\`version_entity_type_id\` text(36),
  	\`version_template_document_id\` text(36),
  	\`version_effective_from\` text NOT NULL,
  	\`version_effective_to\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`statutory_report_templates\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_jurisdiction_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_entity_type_id\`) REFERENCES \`entity_types\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_template_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_parent_idx\` ON \`_statutory_report_templates_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_version_uuid_idx\` ON \`_statutory_report_templates_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_version_tenant_idx\` ON \`_statutory_report_templates_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_version_template_n_idx\` ON \`_statutory_report_templates_v\` (\`version_template_name\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_version_jurisdicti_idx\` ON \`_statutory_report_templates_v\` (\`version_jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_version_entity_typ_idx\` ON \`_statutory_report_templates_v\` (\`version_entity_type_id\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_version_template_d_idx\` ON \`_statutory_report_templates_v\` (\`version_template_document_id\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_version_updated_at_idx\` ON \`_statutory_report_templates_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_version_created_at_idx\` ON \`_statutory_report_templates_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_created_at_idx\` ON \`_statutory_report_templates_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_updated_at_idx\` ON \`_statutory_report_templates_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_statutory_report_templates_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_statutory_report_templates_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_rels_order_idx\` ON \`_statutory_report_templates_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_rels_parent_idx\` ON \`_statutory_report_templates_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_rels_path_idx\` ON \`_statutory_report_templates_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_rels_users_id_idx\` ON \`_statutory_report_templates_v_rels\` (\`users_id\`);`)
  await db.run(sql`DROP TABLE \`pages_document_details_statutory_repor_07416312\`;`)
  await db.run(sql`DROP TABLE \`pages_document_details_statutory_repor_c2b41a0a\`;`)
  await db.run(sql`DROP TABLE \`pages_document_details_statutory_repor_ad65ea54\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_statutory_repor_07416312_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_statutory_repor_c2b41a0a_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_statutory_repor_ad65ea54_v\`;`)
}
