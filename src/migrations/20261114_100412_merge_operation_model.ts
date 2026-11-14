import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`e2c337a3fd6218b33858630a71f1fe155\`;`)
  await db.run(sql`DROP TABLE \`operation_runs\`;`)
  await db.run(sql`DROP TABLE \`_e2c337a3fd6218b33858630a71f1fe155_v\`;`)
  await db.run(sql`DROP TABLE \`_operation_runs_v\`;`)
  await db.run(sql`DROP TABLE \`eab01b97511988cbcb45cc0b7914b50ed\`;`)
  await db.run(sql`DROP TABLE \`operations\`;`)
  await db.run(sql`DROP TABLE \`_eab01b97511988cbcb45cc0b7914b50ed_v\`;`)
  await db.run(sql`DROP TABLE \`_operations_v\`;`)
  await db.run(sql`DROP TABLE \`routings\`;`)
  await db.run(sql`DROP TABLE \`_routings_v\`;`)
  await db.run(sql`ALTER TABLE \`work_orders\` ADD \`units_scrap\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`_work_orders_v\` ADD \`version_units_scrap\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`work_phases\` ADD \`default_work_center_id\` text(36) REFERENCES work_centers(id);`)
  await db.run(sql`CREATE INDEX \`work_phases_default_work_center_idx\` ON \`work_phases\` (\`default_work_center_id\`);`)
  await db.run(sql`ALTER TABLE \`_work_phases_v\` ADD \`version_default_work_center_id\` text(36) REFERENCES work_centers(id);`)
  await db.run(sql`CREATE INDEX \`_work_phases_v_version_version_default_work_center_idx\` ON \`_work_phases_v\` (\`version_default_work_center_id\`);`)
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
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
  await db.run(sql`CREATE TABLE \`_e2c337a3fd6218b33858630a71f1fe155_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`attributes\` text,
  	\`qty_ordered\` numeric DEFAULT 0,
  	\`qty_produced\` numeric DEFAULT 0,
  	\`qty_backordered\` numeric DEFAULT 0,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_operation_runs_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e2c337a3fd6218b33858630a71f1fe155_v_order_idx\` ON \`_e2c337a3fd6218b33858630a71f1fe155_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e2c337a3fd6218b33858630a71f1fe155_v_parent_id_idx\` ON \`_e2c337a3fd6218b33858630a71f1fe155_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_operation_runs_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_reference\` text NOT NULL,
  	\`version_work_order_id\` text(36) NOT NULL,
  	\`version_routing_id\` text(36),
  	\`version_operation_id\` text(36),
  	\`version_work_center_id\` text(36),
  	\`version_work_shift_id\` text(36),
  	\`version_qty_ordered\` numeric DEFAULT 0,
  	\`version_qty_produced\` numeric DEFAULT 0,
  	\`version_qty_scrap\` numeric DEFAULT 0,
  	\`version_qty_backordered\` numeric DEFAULT 0,
  	\`version_unit_of_measure\` text DEFAULT 'C62',
  	\`version_started_at\` text,
  	\`version_completed_at\` text,
  	\`version_status\` text DEFAULT 'draft',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`operation_runs\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_work_order_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_routing_id\`) REFERENCES \`routings\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_operation_id\`) REFERENCES \`operations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_work_center_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_work_shift_id\`) REFERENCES \`work_shifts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_operation_runs_v_parent_idx\` ON \`_operation_runs_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_operation_runs_v_version_version_uuid_idx\` ON \`_operation_runs_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_operation_runs_v_version_version_tenant_idx\` ON \`_operation_runs_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_operation_runs_v_version_version_reference_idx\` ON \`_operation_runs_v\` (\`version_reference\`);`)
  await db.run(sql`CREATE INDEX \`_operation_runs_v_version_version_work_order_idx\` ON \`_operation_runs_v\` (\`version_work_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_operation_runs_v_version_version_routing_idx\` ON \`_operation_runs_v\` (\`version_routing_id\`);`)
  await db.run(sql`CREATE INDEX \`_operation_runs_v_version_version_operation_idx\` ON \`_operation_runs_v\` (\`version_operation_id\`);`)
  await db.run(sql`CREATE INDEX \`_operation_runs_v_version_version_work_center_idx\` ON \`_operation_runs_v\` (\`version_work_center_id\`);`)
  await db.run(sql`CREATE INDEX \`_operation_runs_v_version_version_work_shift_idx\` ON \`_operation_runs_v\` (\`version_work_shift_id\`);`)
  await db.run(sql`CREATE INDEX \`_operation_runs_v_version_version_created_by_idx\` ON \`_operation_runs_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_operation_runs_v_version_version_approved_by_idx\` ON \`_operation_runs_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_operation_runs_v_version_version_updated_at_idx\` ON \`_operation_runs_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_operation_runs_v_version_version_created_at_idx\` ON \`_operation_runs_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_operation_runs_v_created_at_idx\` ON \`_operation_runs_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_operation_runs_v_updated_at_idx\` ON \`_operation_runs_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`eab01b97511988cbcb45cc0b7914b50ed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`operations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`operations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eab01b97511988cbcb45cc0b7914b50ed_order_idx\` ON \`eab01b97511988cbcb45cc0b7914b50ed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eab01b97511988cbcb45cc0b7914b50ed_parent_id_idx\` ON \`eab01b97511988cbcb45cc0b7914b50ed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`eab01b97511988cbcb45cc0b7914b50ed_locale_idx\` ON \`eab01b97511988cbcb45cc0b7914b50ed\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`eab01b97511988cbcb45cc0b7914b50ed_doc_idx\` ON \`eab01b97511988cbcb45cc0b7914b50ed\` (\`doc_id\`);`)
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
  await db.run(sql`CREATE TABLE \`_eab01b97511988cbcb45cc0b7914b50ed_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`operations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_operations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_eab01b97511988cbcb45cc0b7914b50ed_v_order_idx\` ON \`_eab01b97511988cbcb45cc0b7914b50ed_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eab01b97511988cbcb45cc0b7914b50ed_v_parent_id_idx\` ON \`_eab01b97511988cbcb45cc0b7914b50ed_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_eab01b97511988cbcb45cc0b7914b50ed_v_locale_idx\` ON \`_eab01b97511988cbcb45cc0b7914b50ed_v\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`_eab01b97511988cbcb45cc0b7914b50ed_v_doc_idx\` ON \`_eab01b97511988cbcb45cc0b7914b50ed_v\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`_operations_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_reference\` text NOT NULL,
  	\`version_name\` text NOT NULL,
  	\`version_default_work_center_id\` text(36),
  	\`version_parent_id\` text(36),
  	\`version_status\` text DEFAULT 'active',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`operations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_default_work_center_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parent_id\`) REFERENCES \`operations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_operations_v_parent_idx\` ON \`_operations_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_operations_v_version_version_uuid_idx\` ON \`_operations_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_operations_v_version_version_tenant_idx\` ON \`_operations_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_operations_v_version_version_reference_idx\` ON \`_operations_v\` (\`version_reference\`);`)
  await db.run(sql`CREATE INDEX \`_operations_v_version_version_default_work_center_idx\` ON \`_operations_v\` (\`version_default_work_center_id\`);`)
  await db.run(sql`CREATE INDEX \`_operations_v_version_version_parent_idx\` ON \`_operations_v\` (\`version_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_operations_v_version_version_created_by_idx\` ON \`_operations_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_operations_v_version_version_approved_by_idx\` ON \`_operations_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_operations_v_version_version_updated_at_idx\` ON \`_operations_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_operations_v_version_version_created_at_idx\` ON \`_operations_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_operations_v_created_at_idx\` ON \`_operations_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_operations_v_updated_at_idx\` ON \`_operations_v\` (\`updated_at\`);`)
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
  await db.run(sql`CREATE TABLE \`_routings_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_reference\` text NOT NULL,
  	\`version_work_order_id\` text(36) NOT NULL,
  	\`version_operation_id\` text(36) NOT NULL,
  	\`version_work_center_id\` text(36),
  	\`version_seq\` numeric DEFAULT 0 NOT NULL,
  	\`version_setup_time_minutes\` numeric DEFAULT 0,
  	\`version_run_time_seconds_per_unit\` numeric,
  	\`version_unit_of_measure\` text DEFAULT 'C62',
  	\`version_status\` text DEFAULT 'draft',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`routings\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_work_order_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_operation_id\`) REFERENCES \`operations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_work_center_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_routings_v_parent_idx\` ON \`_routings_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_routings_v_version_version_uuid_idx\` ON \`_routings_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_routings_v_version_version_tenant_idx\` ON \`_routings_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_routings_v_version_version_reference_idx\` ON \`_routings_v\` (\`version_reference\`);`)
  await db.run(sql`CREATE INDEX \`_routings_v_version_version_work_order_idx\` ON \`_routings_v\` (\`version_work_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_routings_v_version_version_operation_idx\` ON \`_routings_v\` (\`version_operation_id\`);`)
  await db.run(sql`CREATE INDEX \`_routings_v_version_version_work_center_idx\` ON \`_routings_v\` (\`version_work_center_id\`);`)
  await db.run(sql`CREATE INDEX \`_routings_v_version_version_seq_idx\` ON \`_routings_v\` (\`version_seq\`);`)
  await db.run(sql`CREATE INDEX \`_routings_v_version_version_created_by_idx\` ON \`_routings_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_routings_v_version_version_approved_by_idx\` ON \`_routings_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_routings_v_version_version_updated_at_idx\` ON \`_routings_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_routings_v_version_version_created_at_idx\` ON \`_routings_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_routings_v_created_at_idx\` ON \`_routings_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_routings_v_updated_at_idx\` ON \`_routings_v\` (\`updated_at\`);`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_work_phases\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`code\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`kind\` text,
  	\`parent_id\` text(36),
  	\`machine_type\` text,
  	\`work_type\` text,
  	\`work_seconds\` numeric,
  	\`skill_level\` numeric,
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`work_phases\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_work_phases\`("id", "uuid", "tenant_id", "code", "name", "kind", "parent_id", "machine_type", "work_type", "work_seconds", "skill_level", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "code", "name", "kind", "parent_id", "machine_type", "work_type", "work_seconds", "skill_level", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`work_phases\`;`)
  await db.run(sql`DROP TABLE \`work_phases\`;`)
  await db.run(sql`ALTER TABLE \`__new_work_phases\` RENAME TO \`work_phases\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`work_phases_uuid_idx\` ON \`work_phases\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`work_phases_tenant_idx\` ON \`work_phases\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`work_phases_code_idx\` ON \`work_phases\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`work_phases_kind_idx\` ON \`work_phases\` (\`kind\`);`)
  await db.run(sql`CREATE INDEX \`work_phases_parent_idx\` ON \`work_phases\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`work_phases_created_by_idx\` ON \`work_phases\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`work_phases_approved_by_idx\` ON \`work_phases\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`work_phases_updated_at_idx\` ON \`work_phases\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`work_phases_created_at_idx\` ON \`work_phases\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__work_phases_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_code\` text NOT NULL,
  	\`version_name\` text NOT NULL,
  	\`version_kind\` text,
  	\`version_parent_id\` text(36),
  	\`version_machine_type\` text,
  	\`version_work_type\` text,
  	\`version_work_seconds\` numeric,
  	\`version_skill_level\` numeric,
  	\`version_status\` text DEFAULT 'active',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`work_phases\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parent_id\`) REFERENCES \`work_phases\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__work_phases_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_code", "version_name", "version_kind", "version_parent_id", "version_machine_type", "version_work_type", "version_work_seconds", "version_skill_level", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_code", "version_name", "version_kind", "version_parent_id", "version_machine_type", "version_work_type", "version_work_seconds", "version_skill_level", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_work_phases_v\`;`)
  await db.run(sql`DROP TABLE \`_work_phases_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__work_phases_v\` RENAME TO \`_work_phases_v\`;`)
  await db.run(sql`CREATE INDEX \`_work_phases_v_parent_idx\` ON \`_work_phases_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_work_phases_v_version_version_uuid_idx\` ON \`_work_phases_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_work_phases_v_version_version_tenant_idx\` ON \`_work_phases_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_work_phases_v_version_version_code_idx\` ON \`_work_phases_v\` (\`version_code\`);`)
  await db.run(sql`CREATE INDEX \`_work_phases_v_version_version_kind_idx\` ON \`_work_phases_v\` (\`version_kind\`);`)
  await db.run(sql`CREATE INDEX \`_work_phases_v_version_version_parent_idx\` ON \`_work_phases_v\` (\`version_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_work_phases_v_version_version_created_by_idx\` ON \`_work_phases_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_work_phases_v_version_version_approved_by_idx\` ON \`_work_phases_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_work_phases_v_version_version_updated_at_idx\` ON \`_work_phases_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_work_phases_v_version_version_created_at_idx\` ON \`_work_phases_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_work_phases_v_created_at_idx\` ON \`_work_phases_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_work_phases_v_updated_at_idx\` ON \`_work_phases_v\` (\`updated_at\`);`)
  await db.run(sql`ALTER TABLE \`work_orders\` DROP COLUMN \`units_scrap\`;`)
  await db.run(sql`ALTER TABLE \`_work_orders_v\` DROP COLUMN \`version_units_scrap\`;`)
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
}
