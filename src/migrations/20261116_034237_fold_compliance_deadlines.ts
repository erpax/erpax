import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_document_details_compliance_dead_7d85e2ca\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages_document_details_compliance_dead_755c349a\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_compliance_dead_7d85e2ca_order_idx\` ON \`pages_document_details_compliance_dead_7d85e2ca\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_compliance_dead_7d85e2ca_parent_idx\` ON \`pages_document_details_compliance_dead_7d85e2ca\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_document_details_compliance_dead_e13ac615\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`recipient_email\` text,
  	\`recipient_role\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_document_details_compliance_dead_755c349a\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_compliance_dead_e13ac615_order_idx\` ON \`pages_document_details_compliance_dead_e13ac615\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_compliance_dead_e13ac615_parent_id_idx\` ON \`pages_document_details_compliance_dead_e13ac615\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_document_details_compliance_dead_755c349a\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`notification_title\` text,
  	\`days_before_due\` numeric,
  	\`sent_date\` text,
  	\`status\` text DEFAULT 'scheduled',
  	\`notification_content\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_document_details_compliance_dead_6ec52b16\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_compliance_dead_755c349a_order_idx\` ON \`pages_document_details_compliance_dead_755c349a\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_compliance_dead_755c349a_parent_id_idx\` ON \`pages_document_details_compliance_dead_755c349a\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_document_details_compliance_dead_6ec52b16\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`deadline_type\` text,
  	\`entity_id\` text(36),
  	\`requirement_id\` text(36),
  	\`due_date\` text,
  	\`submission_date\` text,
  	\`status\` text DEFAULT 'on-track',
  	\`priority\` text,
  	\`penalty\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`requirement_id\`) REFERENCES \`compliance_requirements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_compliance_dead_6ec52b16_order_idx\` ON \`pages_document_details_compliance_dead_6ec52b16\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_compliance_dead_6ec52b16_parent_id_idx\` ON \`pages_document_details_compliance_dead_6ec52b16\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_compliance_dead_6ec52b16_path_idx\` ON \`pages_document_details_compliance_dead_6ec52b16\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_compliance_dead_6ec52b16_entity_idx\` ON \`pages_document_details_compliance_dead_6ec52b16\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_compliance_dead_6ec52b16_requirem_idx\` ON \`pages_document_details_compliance_dead_6ec52b16\` (\`requirement_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_compliance_dead_7d85e2ca_v\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_document_details_compliance_dead_755c349a_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_compliance_dead_7d85e2ca_v_order_idx\` ON \`_pages_document_details_compliance_dead_7d85e2ca_v\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_compliance_dead_7d85e2ca_v_parent_idx\` ON \`_pages_document_details_compliance_dead_7d85e2ca_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_compliance_dead_e13ac615_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`recipient_email\` text,
  	\`recipient_role\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_document_details_compliance_dead_755c349a_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_compliance_dead_e13ac615_v_order_idx\` ON \`_pages_document_details_compliance_dead_e13ac615_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_compliance_dead_e13ac615_v_parent_id_idx\` ON \`_pages_document_details_compliance_dead_e13ac615_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_compliance_dead_755c349a_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`notification_title\` text,
  	\`days_before_due\` numeric,
  	\`sent_date\` text,
  	\`status\` text DEFAULT 'scheduled',
  	\`notification_content\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_document_details_compliance_dead_6ec52b16_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_compliance_dead_755c349a_v_order_idx\` ON \`_pages_document_details_compliance_dead_755c349a_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_compliance_dead_755c349a_v_parent_id_idx\` ON \`_pages_document_details_compliance_dead_755c349a_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_compliance_dead_6ec52b16_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`deadline_type\` text,
  	\`entity_id\` text(36),
  	\`requirement_id\` text(36),
  	\`due_date\` text,
  	\`submission_date\` text,
  	\`status\` text DEFAULT 'on-track',
  	\`priority\` text,
  	\`penalty\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`requirement_id\`) REFERENCES \`compliance_requirements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_compliance_dead_6ec52b16_v_order_idx\` ON \`_pages_document_details_compliance_dead_6ec52b16_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_compliance_dead_6ec52b16_v_parent_id_idx\` ON \`_pages_document_details_compliance_dead_6ec52b16_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_compliance_dead_6ec52b16_v_path_idx\` ON \`_pages_document_details_compliance_dead_6ec52b16_v\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_compliance_dead_6ec52b16_v_entit_idx\` ON \`_pages_document_details_compliance_dead_6ec52b16_v\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_compliance_dead_6ec52b16_v_requi_idx\` ON \`_pages_document_details_compliance_dead_6ec52b16_v\` (\`requirement_id\`);`)
  await db.run(sql`DROP TABLE \`compliance_deadlines_notifications_not_656a9725\`;`)
  await db.run(sql`DROP TABLE \`compliance_deadlines_notifications_rec_53bc7822\`;`)
  await db.run(sql`DROP TABLE \`compliance_deadlines_notifications\`;`)
  await db.run(sql`DROP TABLE \`compliance_deadlines\`;`)
  await db.run(sql`DROP TABLE \`compliance_deadlines_rels\`;`)
  await db.run(sql`DROP TABLE \`_compliance_deadlines_notifications_not_656a9725_v\`;`)
  await db.run(sql`DROP TABLE \`_compliance_deadlines_notifications_rec_53bc7822_v\`;`)
  await db.run(sql`DROP TABLE \`_compliance_deadlines_v_version_notifications\`;`)
  await db.run(sql`DROP TABLE \`_compliance_deadlines_v\`;`)
  await db.run(sql`DROP TABLE \`_compliance_deadlines_v_rels\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`compliance_deadlines_notifications_not_656a9725\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`compliance_deadlines_notifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_notifications_not_656a9725_order_idx\` ON \`compliance_deadlines_notifications_not_656a9725\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_notifications_not_656a9725_parent_idx\` ON \`compliance_deadlines_notifications_not_656a9725\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`compliance_deadlines_notifications_rec_53bc7822\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`recipient_email\` text,
  	\`recipient_role\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`compliance_deadlines_notifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_notifications_rec_53bc7822_order_idx\` ON \`compliance_deadlines_notifications_rec_53bc7822\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_notifications_rec_53bc7822_parent_id_idx\` ON \`compliance_deadlines_notifications_rec_53bc7822\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`compliance_deadlines_notifications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`notification_title\` text NOT NULL,
  	\`notification_content\` text,
  	\`days_before_due\` numeric NOT NULL,
  	\`sent_date\` text,
  	\`status\` text DEFAULT 'scheduled',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`compliance_deadlines\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_notifications_order_idx\` ON \`compliance_deadlines_notifications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_notifications_parent_id_idx\` ON \`compliance_deadlines_notifications\` (\`_parent_id\`);`)
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
  	FOREIGN KEY (\`jurisdiction_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`requirement_id\`) REFERENCES \`compliance_requirements\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`compliance_deadlines_uuid_idx\` ON \`compliance_deadlines\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_tenant_idx\` ON \`compliance_deadlines\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_entity_idx\` ON \`compliance_deadlines\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_deadline_name_idx\` ON \`compliance_deadlines\` (\`deadline_name\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_jurisdiction_idx\` ON \`compliance_deadlines\` (\`jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_requirement_idx\` ON \`compliance_deadlines\` (\`requirement_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_updated_at_idx\` ON \`compliance_deadlines\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_created_at_idx\` ON \`compliance_deadlines\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`compliance_deadlines_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`compliance_deadlines\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_rels_order_idx\` ON \`compliance_deadlines_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_rels_parent_idx\` ON \`compliance_deadlines_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_rels_path_idx\` ON \`compliance_deadlines_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_rels_users_id_idx\` ON \`compliance_deadlines_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_compliance_deadlines_notifications_not_656a9725_v\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_compliance_deadlines_v_version_notifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_notifications_not_656a9725_v_order_idx\` ON \`_compliance_deadlines_notifications_not_656a9725_v\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_notifications_not_656a9725_v_parent_idx\` ON \`_compliance_deadlines_notifications_not_656a9725_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_compliance_deadlines_notifications_rec_53bc7822_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`recipient_email\` text,
  	\`recipient_role\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_compliance_deadlines_v_version_notifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_notifications_rec_53bc7822_v_order_idx\` ON \`_compliance_deadlines_notifications_rec_53bc7822_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_notifications_rec_53bc7822_v_parent_id_idx\` ON \`_compliance_deadlines_notifications_rec_53bc7822_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_compliance_deadlines_v_version_notifications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`notification_title\` text NOT NULL,
  	\`notification_content\` text,
  	\`days_before_due\` numeric NOT NULL,
  	\`sent_date\` text,
  	\`status\` text DEFAULT 'scheduled',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_compliance_deadlines_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_notifications_order_idx\` ON \`_compliance_deadlines_v_version_notifications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_notifications_parent_id_idx\` ON \`_compliance_deadlines_v_version_notifications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_compliance_deadlines_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_entity_id\` text(36) NOT NULL,
  	\`version_deadline_name\` text NOT NULL,
  	\`version_deadline_type\` text NOT NULL,
  	\`version_jurisdiction_id\` text(36),
  	\`version_requirement_id\` text(36),
  	\`version_due_date\` text NOT NULL,
  	\`version_submission_date\` text,
  	\`version_status\` text DEFAULT 'on-track',
  	\`version_priority\` text,
  	\`version_penalty\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`compliance_deadlines\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_jurisdiction_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_requirement_id\`) REFERENCES \`compliance_requirements\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_parent_idx\` ON \`_compliance_deadlines_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_version_uuid_idx\` ON \`_compliance_deadlines_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_version_tenant_idx\` ON \`_compliance_deadlines_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_version_entity_idx\` ON \`_compliance_deadlines_v\` (\`version_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_version_deadline_name_idx\` ON \`_compliance_deadlines_v\` (\`version_deadline_name\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_version_jurisdiction_idx\` ON \`_compliance_deadlines_v\` (\`version_jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_version_requirement_idx\` ON \`_compliance_deadlines_v\` (\`version_requirement_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_version_updated_at_idx\` ON \`_compliance_deadlines_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_version_created_at_idx\` ON \`_compliance_deadlines_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_created_at_idx\` ON \`_compliance_deadlines_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_updated_at_idx\` ON \`_compliance_deadlines_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_compliance_deadlines_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_compliance_deadlines_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_rels_order_idx\` ON \`_compliance_deadlines_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_rels_parent_idx\` ON \`_compliance_deadlines_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_rels_path_idx\` ON \`_compliance_deadlines_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_rels_users_id_idx\` ON \`_compliance_deadlines_v_rels\` (\`users_id\`);`)
  await db.run(sql`DROP TABLE \`pages_document_details_compliance_dead_7d85e2ca\`;`)
  await db.run(sql`DROP TABLE \`pages_document_details_compliance_dead_e13ac615\`;`)
  await db.run(sql`DROP TABLE \`pages_document_details_compliance_dead_755c349a\`;`)
  await db.run(sql`DROP TABLE \`pages_document_details_compliance_dead_6ec52b16\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_compliance_dead_7d85e2ca_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_compliance_dead_e13ac615_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_compliance_dead_755c349a_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_compliance_dead_6ec52b16_v\`;`)
}
