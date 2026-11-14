import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`items\`;`)
  await db.run(sql`DROP TABLE \`_items_v\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_batches\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
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
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`work_order_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`goods_receipt_id\`) REFERENCES \`goods_receipts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`supplier_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`warehouse_location_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`quality_inspection_id\`) REFERENCES \`quality_inspections\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_batches\`("id", "uuid", "tenant_id", "reference", "item_id", "quantity", "unit_of_measure", "remaining_quantity", "status", "manufacture_date", "expiry_date", "received_date", "country_of_origin", "origin", "work_order_id", "goods_receipt_id", "supplier_id", "supplier_batch_ref", "warehouse_location_id", "quality_inspection_id", "currency", "unit_cost", "recall_recalled", "recall_recall_reference", "recall_recall_date", "recall_recall_reason", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "reference", "item_id", "quantity", "unit_of_measure", "remaining_quantity", "status", "manufacture_date", "expiry_date", "received_date", "country_of_origin", "origin", "work_order_id", "goods_receipt_id", "supplier_id", "supplier_batch_ref", "warehouse_location_id", "quality_inspection_id", "currency", "unit_cost", "recall_recalled", "recall_recall_reference", "recall_recall_date", "recall_recall_reason", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`batches\`;`)
  await db.run(sql`DROP TABLE \`batches\`;`)
  await db.run(sql`ALTER TABLE \`__new_batches\` RENAME TO \`batches\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`batches_uuid_idx\` ON \`batches\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`batches_tenant_idx\` ON \`batches\` (\`tenant_id\`);`)
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
  await db.run(sql`CREATE TABLE \`__new__batches_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_reference\` text NOT NULL,
  	\`version_item_id\` text(36) NOT NULL,
  	\`version_quantity\` numeric NOT NULL,
  	\`version_unit_of_measure\` text DEFAULT 'C62',
  	\`version_remaining_quantity\` numeric DEFAULT 0,
  	\`version_status\` text DEFAULT 'quarantine',
  	\`version_manufacture_date\` text,
  	\`version_expiry_date\` text,
  	\`version_received_date\` text,
  	\`version_country_of_origin\` text,
  	\`version_origin\` text DEFAULT 'produced',
  	\`version_work_order_id\` text(36),
  	\`version_goods_receipt_id\` text(36),
  	\`version_supplier_id\` text(36),
  	\`version_supplier_batch_ref\` text,
  	\`version_warehouse_location_id\` text(36),
  	\`version_quality_inspection_id\` text(36),
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_unit_cost\` numeric DEFAULT 0,
  	\`version_recall_recalled\` integer DEFAULT false,
  	\`version_recall_recall_reference\` text,
  	\`version_recall_recall_date\` text,
  	\`version_recall_recall_reason\` text,
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`batches\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_work_order_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_goods_receipt_id\`) REFERENCES \`goods_receipts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_supplier_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_warehouse_location_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_quality_inspection_id\`) REFERENCES \`quality_inspections\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__batches_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_item_id", "version_quantity", "version_unit_of_measure", "version_remaining_quantity", "version_status", "version_manufacture_date", "version_expiry_date", "version_received_date", "version_country_of_origin", "version_origin", "version_work_order_id", "version_goods_receipt_id", "version_supplier_id", "version_supplier_batch_ref", "version_warehouse_location_id", "version_quality_inspection_id", "version_currency", "version_unit_cost", "version_recall_recalled", "version_recall_recall_reference", "version_recall_recall_date", "version_recall_recall_reason", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_item_id", "version_quantity", "version_unit_of_measure", "version_remaining_quantity", "version_status", "version_manufacture_date", "version_expiry_date", "version_received_date", "version_country_of_origin", "version_origin", "version_work_order_id", "version_goods_receipt_id", "version_supplier_id", "version_supplier_batch_ref", "version_warehouse_location_id", "version_quality_inspection_id", "version_currency", "version_unit_cost", "version_recall_recalled", "version_recall_recall_reference", "version_recall_recall_date", "version_recall_recall_reason", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_batches_v\`;`)
  await db.run(sql`DROP TABLE \`_batches_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__batches_v\` RENAME TO \`_batches_v\`;`)
  await db.run(sql`CREATE INDEX \`_batches_v_parent_idx\` ON \`_batches_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_uuid_idx\` ON \`_batches_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_tenant_idx\` ON \`_batches_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_reference_idx\` ON \`_batches_v\` (\`version_reference\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_item_idx\` ON \`_batches_v\` (\`version_item_id\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_manufacture_date_idx\` ON \`_batches_v\` (\`version_manufacture_date\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_expiry_date_idx\` ON \`_batches_v\` (\`version_expiry_date\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_country_of_origin_idx\` ON \`_batches_v\` (\`version_country_of_origin\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_work_order_idx\` ON \`_batches_v\` (\`version_work_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_goods_receipt_idx\` ON \`_batches_v\` (\`version_goods_receipt_id\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_supplier_idx\` ON \`_batches_v\` (\`version_supplier_id\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_warehouse_location_idx\` ON \`_batches_v\` (\`version_warehouse_location_id\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_quality_inspection_idx\` ON \`_batches_v\` (\`version_quality_inspection_id\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_created_by_idx\` ON \`_batches_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_approved_by_idx\` ON \`_batches_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_updated_at_idx\` ON \`_batches_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_created_at_idx\` ON \`_batches_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_created_at_idx\` ON \`_batches_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_updated_at_idx\` ON \`_batches_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_ee29d67e947fd80f68f80f3b1111ed7a7\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36) NOT NULL,
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`waste_allowance\` numeric DEFAULT 0,
  	\`is_optional\` integer DEFAULT false,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bills_of_materials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_ee29d67e947fd80f68f80f3b1111ed7a7\`("_order", "_parent_id", "id", "item_id", "quantity", "unit_of_measure", "waste_allowance", "is_optional") SELECT "_order", "_parent_id", "id", "item_id", "quantity", "unit_of_measure", "waste_allowance", "is_optional" FROM \`ee29d67e947fd80f68f80f3b1111ed7a7\`;`)
  await db.run(sql`DROP TABLE \`ee29d67e947fd80f68f80f3b1111ed7a7\`;`)
  await db.run(sql`ALTER TABLE \`__new_ee29d67e947fd80f68f80f3b1111ed7a7\` RENAME TO \`ee29d67e947fd80f68f80f3b1111ed7a7\`;`)
  await db.run(sql`CREATE INDEX \`ee29d67e947fd80f68f80f3b1111ed7a7_order_idx\` ON \`ee29d67e947fd80f68f80f3b1111ed7a7\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ee29d67e947fd80f68f80f3b1111ed7a7_parent_id_idx\` ON \`ee29d67e947fd80f68f80f3b1111ed7a7\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ee29d67e947fd80f68f80f3b1111ed7a7_item_idx\` ON \`ee29d67e947fd80f68f80f3b1111ed7a7\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_bills_of_materials\` (
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
  	FOREIGN KEY (\`finished_good_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_bills_of_materials\`("id", "uuid", "tenant_id", "reference", "finished_good_id", "version", "effective_from", "effective_to", "produced_quantity", "engineering_change_order", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "reference", "finished_good_id", "version", "effective_from", "effective_to", "produced_quantity", "engineering_change_order", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`bills_of_materials\`;`)
  await db.run(sql`DROP TABLE \`bills_of_materials\`;`)
  await db.run(sql`ALTER TABLE \`__new_bills_of_materials\` RENAME TO \`bills_of_materials\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`bills_of_materials_uuid_idx\` ON \`bills_of_materials\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`bills_of_materials_tenant_idx\` ON \`bills_of_materials\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`bills_of_materials_reference_idx\` ON \`bills_of_materials\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`bills_of_materials_finished_good_idx\` ON \`bills_of_materials\` (\`finished_good_id\`);`)
  await db.run(sql`CREATE INDEX \`bills_of_materials_created_by_idx\` ON \`bills_of_materials\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`bills_of_materials_approved_by_idx\` ON \`bills_of_materials\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`bills_of_materials_updated_at_idx\` ON \`bills_of_materials\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`bills_of_materials_created_at_idx\` ON \`bills_of_materials\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__ee29d67e947fd80f68f80f3b1111ed7a7_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36) NOT NULL,
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`waste_allowance\` numeric DEFAULT 0,
  	\`is_optional\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bills_of_materials_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__ee29d67e947fd80f68f80f3b1111ed7a7_v\`("_order", "_parent_id", "id", "item_id", "quantity", "unit_of_measure", "waste_allowance", "is_optional", "_uuid") SELECT "_order", "_parent_id", "id", "item_id", "quantity", "unit_of_measure", "waste_allowance", "is_optional", "_uuid" FROM \`_ee29d67e947fd80f68f80f3b1111ed7a7_v\`;`)
  await db.run(sql`DROP TABLE \`_ee29d67e947fd80f68f80f3b1111ed7a7_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__ee29d67e947fd80f68f80f3b1111ed7a7_v\` RENAME TO \`_ee29d67e947fd80f68f80f3b1111ed7a7_v\`;`)
  await db.run(sql`CREATE INDEX \`_ee29d67e947fd80f68f80f3b1111ed7a7_v_order_idx\` ON \`_ee29d67e947fd80f68f80f3b1111ed7a7_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ee29d67e947fd80f68f80f3b1111ed7a7_v_parent_id_idx\` ON \`_ee29d67e947fd80f68f80f3b1111ed7a7_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ee29d67e947fd80f68f80f3b1111ed7a7_v_item_idx\` ON \`_ee29d67e947fd80f68f80f3b1111ed7a7_v\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__bills_of_materials_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_reference\` text NOT NULL,
  	\`version_finished_good_id\` text(36) NOT NULL,
  	\`version_version\` text NOT NULL,
  	\`version_effective_from\` text NOT NULL,
  	\`version_effective_to\` text,
  	\`version_produced_quantity\` numeric DEFAULT 1,
  	\`version_engineering_change_order\` text,
  	\`version_status\` text DEFAULT 'draft',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`bills_of_materials\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_finished_good_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__bills_of_materials_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_finished_good_id", "version_version", "version_effective_from", "version_effective_to", "version_produced_quantity", "version_engineering_change_order", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_finished_good_id", "version_version", "version_effective_from", "version_effective_to", "version_produced_quantity", "version_engineering_change_order", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_bills_of_materials_v\`;`)
  await db.run(sql`DROP TABLE \`_bills_of_materials_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__bills_of_materials_v\` RENAME TO \`_bills_of_materials_v\`;`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_parent_idx\` ON \`_bills_of_materials_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_version_version_uuid_idx\` ON \`_bills_of_materials_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_version_version_tenant_idx\` ON \`_bills_of_materials_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_version_version_reference_idx\` ON \`_bills_of_materials_v\` (\`version_reference\`);`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_version_version_finished_good_idx\` ON \`_bills_of_materials_v\` (\`version_finished_good_id\`);`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_version_version_created_by_idx\` ON \`_bills_of_materials_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_version_version_approved_by_idx\` ON \`_bills_of_materials_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_version_version_updated_at_idx\` ON \`_bills_of_materials_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_version_version_created_at_idx\` ON \`_bills_of_materials_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_created_at_idx\` ON \`_bills_of_materials_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_updated_at_idx\` ON \`_bills_of_materials_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_ebcc4e7fa5c5b870285d8619d67acbe3e\` (
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
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`customs_declarations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_ebcc4e7fa5c5b870285d8619d67acbe3e\`("_order", "_parent_id", "id", "item_id", "description", "hs_code", "quantity", "unit_of_measure", "net_weight", "gross_weight", "declared_value", "preferential_origin", "tariff_preference_code") SELECT "_order", "_parent_id", "id", "item_id", "description", "hs_code", "quantity", "unit_of_measure", "net_weight", "gross_weight", "declared_value", "preferential_origin", "tariff_preference_code" FROM \`ebcc4e7fa5c5b870285d8619d67acbe3e\`;`)
  await db.run(sql`DROP TABLE \`ebcc4e7fa5c5b870285d8619d67acbe3e\`;`)
  await db.run(sql`ALTER TABLE \`__new_ebcc4e7fa5c5b870285d8619d67acbe3e\` RENAME TO \`ebcc4e7fa5c5b870285d8619d67acbe3e\`;`)
  await db.run(sql`CREATE INDEX \`ebcc4e7fa5c5b870285d8619d67acbe3e_order_idx\` ON \`ebcc4e7fa5c5b870285d8619d67acbe3e\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ebcc4e7fa5c5b870285d8619d67acbe3e_parent_id_idx\` ON \`ebcc4e7fa5c5b870285d8619d67acbe3e\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ebcc4e7fa5c5b870285d8619d67acbe3e_item_idx\` ON \`ebcc4e7fa5c5b870285d8619d67acbe3e\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__ebcc4e7fa5c5b870285d8619d67acbe3e_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
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
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_customs_declarations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__ebcc4e7fa5c5b870285d8619d67acbe3e_v\`("_order", "_parent_id", "id", "item_id", "description", "hs_code", "quantity", "unit_of_measure", "net_weight", "gross_weight", "declared_value", "preferential_origin", "tariff_preference_code", "_uuid") SELECT "_order", "_parent_id", "id", "item_id", "description", "hs_code", "quantity", "unit_of_measure", "net_weight", "gross_weight", "declared_value", "preferential_origin", "tariff_preference_code", "_uuid" FROM \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v\`;`)
  await db.run(sql`DROP TABLE \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__ebcc4e7fa5c5b870285d8619d67acbe3e_v\` RENAME TO \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v\`;`)
  await db.run(sql`CREATE INDEX \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v_order_idx\` ON \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v_parent_id_idx\` ON \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v_item_idx\` ON \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_eeacdeee24bab86b0a04db17f2c688224\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity_received\` numeric NOT NULL,
  	\`quantity_damaged\` numeric DEFAULT 0,
  	\`condition\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`goods_receipts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_eeacdeee24bab86b0a04db17f2c688224\`("_order", "_parent_id", "id", "item_id", "quantity_received", "quantity_damaged", "condition") SELECT "_order", "_parent_id", "id", "item_id", "quantity_received", "quantity_damaged", "condition" FROM \`eeacdeee24bab86b0a04db17f2c688224\`;`)
  await db.run(sql`DROP TABLE \`eeacdeee24bab86b0a04db17f2c688224\`;`)
  await db.run(sql`ALTER TABLE \`__new_eeacdeee24bab86b0a04db17f2c688224\` RENAME TO \`eeacdeee24bab86b0a04db17f2c688224\`;`)
  await db.run(sql`CREATE INDEX \`eeacdeee24bab86b0a04db17f2c688224_order_idx\` ON \`eeacdeee24bab86b0a04db17f2c688224\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eeacdeee24bab86b0a04db17f2c688224_parent_id_idx\` ON \`eeacdeee24bab86b0a04db17f2c688224\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`eeacdeee24bab86b0a04db17f2c688224_item_idx\` ON \`eeacdeee24bab86b0a04db17f2c688224\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__eeacdeee24bab86b0a04db17f2c688224_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity_received\` numeric NOT NULL,
  	\`quantity_damaged\` numeric DEFAULT 0,
  	\`condition\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_goods_receipts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__eeacdeee24bab86b0a04db17f2c688224_v\`("_order", "_parent_id", "id", "item_id", "quantity_received", "quantity_damaged", "condition", "_uuid") SELECT "_order", "_parent_id", "id", "item_id", "quantity_received", "quantity_damaged", "condition", "_uuid" FROM \`_eeacdeee24bab86b0a04db17f2c688224_v\`;`)
  await db.run(sql`DROP TABLE \`_eeacdeee24bab86b0a04db17f2c688224_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__eeacdeee24bab86b0a04db17f2c688224_v\` RENAME TO \`_eeacdeee24bab86b0a04db17f2c688224_v\`;`)
  await db.run(sql`CREATE INDEX \`_eeacdeee24bab86b0a04db17f2c688224_v_order_idx\` ON \`_eeacdeee24bab86b0a04db17f2c688224_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eeacdeee24bab86b0a04db17f2c688224_v_parent_id_idx\` ON \`_eeacdeee24bab86b0a04db17f2c688224_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_eeacdeee24bab86b0a04db17f2c688224_v_item_idx\` ON \`_eeacdeee24bab86b0a04db17f2c688224_v\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_inventory_movements\` (
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
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`from_location_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`to_location_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_inventory_movements\`("id", "uuid", "tenant_id", "movement_id", "kind", "item_id", "lot_or_serial", "quantity", "unit_cost", "extended_cost", "valuation_method", "currency", "from_location_id", "to_location_id", "movement_at", "source_document_type", "source_document_id", "journal_entry_id", "status", "posted_at", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "movement_id", "kind", "item_id", "lot_or_serial", "quantity", "unit_cost", "extended_cost", "valuation_method", "currency", "from_location_id", "to_location_id", "movement_at", "source_document_type", "source_document_id", "journal_entry_id", "status", "posted_at", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`inventory_movements\`;`)
  await db.run(sql`DROP TABLE \`inventory_movements\`;`)
  await db.run(sql`ALTER TABLE \`__new_inventory_movements\` RENAME TO \`inventory_movements\`;`)
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
  await db.run(sql`CREATE TABLE \`__new__inventory_movements_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_movement_id\` text NOT NULL,
  	\`version_kind\` text NOT NULL,
  	\`version_item_id\` text(36) NOT NULL,
  	\`version_lot_or_serial\` text,
  	\`version_quantity\` numeric NOT NULL,
  	\`version_unit_cost\` numeric DEFAULT 0,
  	\`version_extended_cost\` numeric DEFAULT 0,
  	\`version_valuation_method\` text DEFAULT 'weighted_average' NOT NULL,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_from_location_id\` text(36),
  	\`version_to_location_id\` text(36),
  	\`version_movement_at\` text NOT NULL,
  	\`version_source_document_type\` text,
  	\`version_source_document_id\` text,
  	\`version_journal_entry_id\` text(36),
  	\`version_status\` text DEFAULT 'draft',
  	\`version_posted_at\` text,
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`inventory_movements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_from_location_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_to_location_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__inventory_movements_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_movement_id", "version_kind", "version_item_id", "version_lot_or_serial", "version_quantity", "version_unit_cost", "version_extended_cost", "version_valuation_method", "version_currency", "version_from_location_id", "version_to_location_id", "version_movement_at", "version_source_document_type", "version_source_document_id", "version_journal_entry_id", "version_status", "version_posted_at", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_movement_id", "version_kind", "version_item_id", "version_lot_or_serial", "version_quantity", "version_unit_cost", "version_extended_cost", "version_valuation_method", "version_currency", "version_from_location_id", "version_to_location_id", "version_movement_at", "version_source_document_type", "version_source_document_id", "version_journal_entry_id", "version_status", "version_posted_at", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_inventory_movements_v\`;`)
  await db.run(sql`DROP TABLE \`_inventory_movements_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__inventory_movements_v\` RENAME TO \`_inventory_movements_v\`;`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_parent_idx\` ON \`_inventory_movements_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_uuid_idx\` ON \`_inventory_movements_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_tenant_idx\` ON \`_inventory_movements_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_movement_id_idx\` ON \`_inventory_movements_v\` (\`version_movement_id\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_item_idx\` ON \`_inventory_movements_v\` (\`version_item_id\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_from_location_idx\` ON \`_inventory_movements_v\` (\`version_from_location_id\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_to_location_idx\` ON \`_inventory_movements_v\` (\`version_to_location_id\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_movement_at_idx\` ON \`_inventory_movements_v\` (\`version_movement_at\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_journal_entry_idx\` ON \`_inventory_movements_v\` (\`version_journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_created_by_idx\` ON \`_inventory_movements_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_approved_by_idx\` ON \`_inventory_movements_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_updated_at_idx\` ON \`_inventory_movements_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_created_at_idx\` ON \`_inventory_movements_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_created_at_idx\` ON \`_inventory_movements_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_updated_at_idx\` ON \`_inventory_movements_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_invoice_lines\` (
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
  	\`ledger_debit_account_id\` text,
  	\`ledger_credit_account_id\` text,
  	\`ledger_tax_debit_account_id\` text,
  	\`ledger_tax_credit_account_id\` text,
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
  	FOREIGN KEY (\`items_buyer_item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`items_seller_item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`items_source_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`items_destination_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_tax_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_tax_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_invoice_lines\`("id", "uuid", "tenant_id", "invoice_id", "code", "description", "line_note", "object_identifier", "status", "items_buyer_item_id", "items_seller_item_id", "items_source_id", "items_destination_id", "quantity_quantity", "quantity_unit", "quantity_grams", "pricing_unit_price", "pricing_item_total", "pricing_exchange_rate", "discounting_discount_rate", "discounting_discount_total", "taxation_taxable", "taxation_vat_category_code", "taxation_tax_rate", "taxation_vat_exemption_reason_code", "taxation_vat_exemption_reason", "taxation_price_includes_tax", "taxation_net_total", "taxation_tax_total", "totals_total_amount", "totals_total_paid", "totals_total_due", "ledger_debit_account_id", "ledger_credit_account_id", "ledger_tax_debit_account_id", "ledger_tax_credit_account_id", "dates_contract_start", "dates_contract_end", "dates_period_start", "dates_period_end", "dates_delivered_at", "dates_returned_at", "details_currency_code", "details_sku", "details_hs_code", "details_serial_number", "details_lot", "details_variant", "details_variation", "details_option", "details_period", "details_gift_card", "metadata", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "invoice_id", "code", "description", "line_note", "object_identifier", "status", "items_buyer_item_id", "items_seller_item_id", "items_source_id", "items_destination_id", "quantity_quantity", "quantity_unit", "quantity_grams", "pricing_unit_price", "pricing_item_total", "pricing_exchange_rate", "discounting_discount_rate", "discounting_discount_total", "taxation_taxable", "taxation_vat_category_code", "taxation_tax_rate", "taxation_vat_exemption_reason_code", "taxation_vat_exemption_reason", "taxation_price_includes_tax", "taxation_net_total", "taxation_tax_total", "totals_total_amount", "totals_total_paid", "totals_total_due", "ledger_debit_account_id", "ledger_credit_account_id", "ledger_tax_debit_account_id", "ledger_tax_credit_account_id", "dates_contract_start", "dates_contract_end", "dates_period_start", "dates_period_end", "dates_delivered_at", "dates_returned_at", "details_currency_code", "details_sku", "details_hs_code", "details_serial_number", "details_lot", "details_variant", "details_variation", "details_option", "details_period", "details_gift_card", "metadata", "updated_at", "created_at" FROM \`invoice_lines\`;`)
  await db.run(sql`DROP TABLE \`invoice_lines\`;`)
  await db.run(sql`ALTER TABLE \`__new_invoice_lines\` RENAME TO \`invoice_lines\`;`)
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
  await db.run(sql`CREATE TABLE \`__new__invoice_lines_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_invoice_id\` text(36) NOT NULL,
  	\`version_code\` text,
  	\`version_description\` text NOT NULL,
  	\`version_line_note\` text,
  	\`version_object_identifier\` text,
  	\`version_status\` text,
  	\`version_items_buyer_item_id\` text(36),
  	\`version_items_seller_item_id\` text(36),
  	\`version_items_source_id\` text(36),
  	\`version_items_destination_id\` text(36),
  	\`version_quantity_quantity\` numeric DEFAULT 1 NOT NULL,
  	\`version_quantity_unit\` text,
  	\`version_quantity_grams\` numeric,
  	\`version_pricing_unit_price\` numeric DEFAULT 0 NOT NULL,
  	\`version_pricing_item_total\` numeric DEFAULT 0 NOT NULL,
  	\`version_pricing_exchange_rate\` numeric,
  	\`version_discounting_discount_rate\` numeric,
  	\`version_discounting_discount_total\` numeric DEFAULT 0,
  	\`version_taxation_taxable\` integer DEFAULT true,
  	\`version_taxation_vat_category_code\` text DEFAULT 'S' NOT NULL,
  	\`version_taxation_tax_rate\` numeric,
  	\`version_taxation_vat_exemption_reason_code\` text,
  	\`version_taxation_vat_exemption_reason\` text,
  	\`version_taxation_price_includes_tax\` integer DEFAULT false,
  	\`version_taxation_net_total\` numeric DEFAULT 0,
  	\`version_taxation_tax_total\` numeric DEFAULT 0,
  	\`version_totals_total_amount\` numeric DEFAULT 0 NOT NULL,
  	\`version_totals_total_paid\` numeric DEFAULT 0,
  	\`version_totals_total_due\` numeric DEFAULT 0,
  	\`version_ledger_debit_account_id\` text,
  	\`version_ledger_credit_account_id\` text,
  	\`version_ledger_tax_debit_account_id\` text,
  	\`version_ledger_tax_credit_account_id\` text,
  	\`version_dates_contract_start\` text,
  	\`version_dates_contract_end\` text,
  	\`version_dates_period_start\` text,
  	\`version_dates_period_end\` text,
  	\`version_dates_delivered_at\` text,
  	\`version_dates_returned_at\` text,
  	\`version_details_currency_code\` text,
  	\`version_details_sku\` text,
  	\`version_details_hs_code\` text,
  	\`version_details_serial_number\` text,
  	\`version_details_lot\` text,
  	\`version_details_variant\` text,
  	\`version_details_variation\` text,
  	\`version_details_option\` text,
  	\`version_details_period\` text,
  	\`version_details_gift_card\` integer DEFAULT false,
  	\`version_metadata\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`invoice_lines\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_items_buyer_item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_items_seller_item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_items_source_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_items_destination_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_ledger_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_ledger_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_ledger_tax_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_ledger_tax_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__invoice_lines_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_invoice_id", "version_code", "version_description", "version_line_note", "version_object_identifier", "version_status", "version_items_buyer_item_id", "version_items_seller_item_id", "version_items_source_id", "version_items_destination_id", "version_quantity_quantity", "version_quantity_unit", "version_quantity_grams", "version_pricing_unit_price", "version_pricing_item_total", "version_pricing_exchange_rate", "version_discounting_discount_rate", "version_discounting_discount_total", "version_taxation_taxable", "version_taxation_vat_category_code", "version_taxation_tax_rate", "version_taxation_vat_exemption_reason_code", "version_taxation_vat_exemption_reason", "version_taxation_price_includes_tax", "version_taxation_net_total", "version_taxation_tax_total", "version_totals_total_amount", "version_totals_total_paid", "version_totals_total_due", "version_ledger_debit_account_id", "version_ledger_credit_account_id", "version_ledger_tax_debit_account_id", "version_ledger_tax_credit_account_id", "version_dates_contract_start", "version_dates_contract_end", "version_dates_period_start", "version_dates_period_end", "version_dates_delivered_at", "version_dates_returned_at", "version_details_currency_code", "version_details_sku", "version_details_hs_code", "version_details_serial_number", "version_details_lot", "version_details_variant", "version_details_variation", "version_details_option", "version_details_period", "version_details_gift_card", "version_metadata", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_invoice_id", "version_code", "version_description", "version_line_note", "version_object_identifier", "version_status", "version_items_buyer_item_id", "version_items_seller_item_id", "version_items_source_id", "version_items_destination_id", "version_quantity_quantity", "version_quantity_unit", "version_quantity_grams", "version_pricing_unit_price", "version_pricing_item_total", "version_pricing_exchange_rate", "version_discounting_discount_rate", "version_discounting_discount_total", "version_taxation_taxable", "version_taxation_vat_category_code", "version_taxation_tax_rate", "version_taxation_vat_exemption_reason_code", "version_taxation_vat_exemption_reason", "version_taxation_price_includes_tax", "version_taxation_net_total", "version_taxation_tax_total", "version_totals_total_amount", "version_totals_total_paid", "version_totals_total_due", "version_ledger_debit_account_id", "version_ledger_credit_account_id", "version_ledger_tax_debit_account_id", "version_ledger_tax_credit_account_id", "version_dates_contract_start", "version_dates_contract_end", "version_dates_period_start", "version_dates_period_end", "version_dates_delivered_at", "version_dates_returned_at", "version_details_currency_code", "version_details_sku", "version_details_hs_code", "version_details_serial_number", "version_details_lot", "version_details_variant", "version_details_variation", "version_details_option", "version_details_period", "version_details_gift_card", "version_metadata", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_invoice_lines_v\`;`)
  await db.run(sql`DROP TABLE \`_invoice_lines_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__invoice_lines_v\` RENAME TO \`_invoice_lines_v\`;`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_parent_idx\` ON \`_invoice_lines_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_version_uuid_idx\` ON \`_invoice_lines_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_version_tenant_idx\` ON \`_invoice_lines_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_version_invoice_idx\` ON \`_invoice_lines_v\` (\`version_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_version_code_idx\` ON \`_invoice_lines_v\` (\`version_code\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_items_version_items_buyer_item_idx\` ON \`_invoice_lines_v\` (\`version_items_buyer_item_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_items_version_items_seller_item_idx\` ON \`_invoice_lines_v\` (\`version_items_seller_item_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_items_version_items_source_idx\` ON \`_invoice_lines_v\` (\`version_items_source_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_items_version_items_destination_idx\` ON \`_invoice_lines_v\` (\`version_items_destination_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_ledger_version_ledger_debit_acc_idx\` ON \`_invoice_lines_v\` (\`version_ledger_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_ledger_version_ledger_credit_ac_idx\` ON \`_invoice_lines_v\` (\`version_ledger_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_ledger_version_ledger_tax_debit_idx\` ON \`_invoice_lines_v\` (\`version_ledger_tax_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_ledger_version_ledger_tax_credi_idx\` ON \`_invoice_lines_v\` (\`version_ledger_tax_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_version_updated_at_idx\` ON \`_invoice_lines_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_version_created_at_idx\` ON \`_invoice_lines_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_created_at_idx\` ON \`_invoice_lines_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_updated_at_idx\` ON \`_invoice_lines_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_lot_variants\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`lot_id\` text(36) NOT NULL,
  	\`product_variant_id\` text(36),
  	\`work_phase_id\` text(36),
  	\`code\` text,
  	\`name\` text,
  	\`batch\` text,
  	\`sub_variant\` numeric,
  	\`units_ordered\` numeric,
  	\`units\` numeric,
  	\`units_produced\` numeric,
  	\`units_packed\` numeric,
  	\`units_shipped\` numeric,
  	\`units_delivered\` numeric,
  	\`minutes_ordered\` numeric,
  	\`minutes_produced\` numeric,
  	\`minutes_to_produce\` numeric,
  	\`net_weight\` numeric,
  	\`gross_weight\` numeric,
  	\`billable_weight\` numeric,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`lot_id\`) REFERENCES \`lots\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`product_variant_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`work_phase_id\`) REFERENCES \`lot_work_phases\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_lot_variants\`("id", "uuid", "tenant_id", "lot_id", "product_variant_id", "work_phase_id", "code", "name", "batch", "sub_variant", "units_ordered", "units", "units_produced", "units_packed", "units_shipped", "units_delivered", "minutes_ordered", "minutes_produced", "minutes_to_produce", "net_weight", "gross_weight", "billable_weight", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "lot_id", "product_variant_id", "work_phase_id", "code", "name", "batch", "sub_variant", "units_ordered", "units", "units_produced", "units_packed", "units_shipped", "units_delivered", "minutes_ordered", "minutes_produced", "minutes_to_produce", "net_weight", "gross_weight", "billable_weight", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`lot_variants\`;`)
  await db.run(sql`DROP TABLE \`lot_variants\`;`)
  await db.run(sql`ALTER TABLE \`__new_lot_variants\` RENAME TO \`lot_variants\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`lot_variants_uuid_idx\` ON \`lot_variants\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`lot_variants_tenant_idx\` ON \`lot_variants\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`lot_variants_lot_idx\` ON \`lot_variants\` (\`lot_id\`);`)
  await db.run(sql`CREATE INDEX \`lot_variants_product_variant_idx\` ON \`lot_variants\` (\`product_variant_id\`);`)
  await db.run(sql`CREATE INDEX \`lot_variants_work_phase_idx\` ON \`lot_variants\` (\`work_phase_id\`);`)
  await db.run(sql`CREATE INDEX \`lot_variants_code_idx\` ON \`lot_variants\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`lot_variants_created_by_idx\` ON \`lot_variants\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`lot_variants_approved_by_idx\` ON \`lot_variants\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`lot_variants_updated_at_idx\` ON \`lot_variants\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`lot_variants_created_at_idx\` ON \`lot_variants\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__lot_variants_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_lot_id\` text(36) NOT NULL,
  	\`version_product_variant_id\` text(36),
  	\`version_work_phase_id\` text(36),
  	\`version_code\` text,
  	\`version_name\` text,
  	\`version_batch\` text,
  	\`version_sub_variant\` numeric,
  	\`version_units_ordered\` numeric,
  	\`version_units\` numeric,
  	\`version_units_produced\` numeric,
  	\`version_units_packed\` numeric,
  	\`version_units_shipped\` numeric,
  	\`version_units_delivered\` numeric,
  	\`version_minutes_ordered\` numeric,
  	\`version_minutes_produced\` numeric,
  	\`version_minutes_to_produce\` numeric,
  	\`version_net_weight\` numeric,
  	\`version_gross_weight\` numeric,
  	\`version_billable_weight\` numeric,
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`lot_variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_lot_id\`) REFERENCES \`lots\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_product_variant_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_work_phase_id\`) REFERENCES \`lot_work_phases\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__lot_variants_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_lot_id", "version_product_variant_id", "version_work_phase_id", "version_code", "version_name", "version_batch", "version_sub_variant", "version_units_ordered", "version_units", "version_units_produced", "version_units_packed", "version_units_shipped", "version_units_delivered", "version_minutes_ordered", "version_minutes_produced", "version_minutes_to_produce", "version_net_weight", "version_gross_weight", "version_billable_weight", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_lot_id", "version_product_variant_id", "version_work_phase_id", "version_code", "version_name", "version_batch", "version_sub_variant", "version_units_ordered", "version_units", "version_units_produced", "version_units_packed", "version_units_shipped", "version_units_delivered", "version_minutes_ordered", "version_minutes_produced", "version_minutes_to_produce", "version_net_weight", "version_gross_weight", "version_billable_weight", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_lot_variants_v\`;`)
  await db.run(sql`DROP TABLE \`_lot_variants_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__lot_variants_v\` RENAME TO \`_lot_variants_v\`;`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_parent_idx\` ON \`_lot_variants_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_version_version_uuid_idx\` ON \`_lot_variants_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_version_version_tenant_idx\` ON \`_lot_variants_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_version_version_lot_idx\` ON \`_lot_variants_v\` (\`version_lot_id\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_version_version_product_variant_idx\` ON \`_lot_variants_v\` (\`version_product_variant_id\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_version_version_work_phase_idx\` ON \`_lot_variants_v\` (\`version_work_phase_id\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_version_version_code_idx\` ON \`_lot_variants_v\` (\`version_code\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_version_version_created_by_idx\` ON \`_lot_variants_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_version_version_approved_by_idx\` ON \`_lot_variants_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_version_version_updated_at_idx\` ON \`_lot_variants_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_version_version_created_at_idx\` ON \`_lot_variants_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_created_at_idx\` ON \`_lot_variants_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_updated_at_idx\` ON \`_lot_variants_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_lots\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`number\` text,
  	\`order_id\` text(36),
  	\`product_id\` text(36),
  	\`kind\` text,
  	\`status\` text DEFAULT 'opened',
  	\`confirmed_at\` text,
  	\`started_at\` text,
  	\`finished_at\` text,
  	\`closed_at\` text,
  	\`canceled_at\` text,
  	\`cancel_reason\` text,
  	\`date\` text,
  	\`delivery_date\` text,
  	\`shipped_at\` text,
  	\`delivered_at\` text,
  	\`units_ordered\` numeric,
  	\`units\` numeric,
  	\`units_produced\` numeric,
  	\`units_packed\` numeric,
  	\`units_shipped\` numeric,
  	\`units_delivered\` numeric,
  	\`units_invoiced\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`unit_price\` numeric,
  	\`unit_cost\` numeric,
  	\`amount_invoiced\` numeric,
  	\`amount_paid\` numeric,
  	\`minutes_ordered\` numeric,
  	\`minutes_produced\` numeric,
  	\`minutes_to_produce\` numeric,
  	\`net_weight\` numeric,
  	\`gross_weight\` numeric,
  	\`billable_weight\` numeric,
  	\`lot_variants_count\` numeric,
  	\`lot_work_phases_count\` numeric,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_lots\`("id", "uuid", "tenant_id", "number", "order_id", "product_id", "kind", "status", "confirmed_at", "started_at", "finished_at", "closed_at", "canceled_at", "cancel_reason", "date", "delivery_date", "shipped_at", "delivered_at", "units_ordered", "units", "units_produced", "units_packed", "units_shipped", "units_delivered", "units_invoiced", "currency", "unit_price", "unit_cost", "amount_invoiced", "amount_paid", "minutes_ordered", "minutes_produced", "minutes_to_produce", "net_weight", "gross_weight", "billable_weight", "lot_variants_count", "lot_work_phases_count", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "number", "order_id", "product_id", "kind", "status", "confirmed_at", "started_at", "finished_at", "closed_at", "canceled_at", "cancel_reason", "date", "delivery_date", "shipped_at", "delivered_at", "units_ordered", "units", "units_produced", "units_packed", "units_shipped", "units_delivered", "units_invoiced", "currency", "unit_price", "unit_cost", "amount_invoiced", "amount_paid", "minutes_ordered", "minutes_produced", "minutes_to_produce", "net_weight", "gross_weight", "billable_weight", "lot_variants_count", "lot_work_phases_count", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`lots\`;`)
  await db.run(sql`DROP TABLE \`lots\`;`)
  await db.run(sql`ALTER TABLE \`__new_lots\` RENAME TO \`lots\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`lots_uuid_idx\` ON \`lots\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`lots_tenant_idx\` ON \`lots\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`lots_number_idx\` ON \`lots\` (\`number\`);`)
  await db.run(sql`CREATE INDEX \`lots_order_idx\` ON \`lots\` (\`order_id\`);`)
  await db.run(sql`CREATE INDEX \`lots_product_idx\` ON \`lots\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX \`lots_kind_idx\` ON \`lots\` (\`kind\`);`)
  await db.run(sql`CREATE INDEX \`lots_status_idx\` ON \`lots\` (\`status\`);`)
  await db.run(sql`CREATE INDEX \`lots_created_by_idx\` ON \`lots\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`lots_approved_by_idx\` ON \`lots\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`lots_updated_at_idx\` ON \`lots\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`lots_created_at_idx\` ON \`lots\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__lots_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_number\` text,
  	\`version_order_id\` text(36),
  	\`version_product_id\` text(36),
  	\`version_kind\` text,
  	\`version_status\` text DEFAULT 'opened',
  	\`version_confirmed_at\` text,
  	\`version_started_at\` text,
  	\`version_finished_at\` text,
  	\`version_closed_at\` text,
  	\`version_canceled_at\` text,
  	\`version_cancel_reason\` text,
  	\`version_date\` text,
  	\`version_delivery_date\` text,
  	\`version_shipped_at\` text,
  	\`version_delivered_at\` text,
  	\`version_units_ordered\` numeric,
  	\`version_units\` numeric,
  	\`version_units_produced\` numeric,
  	\`version_units_packed\` numeric,
  	\`version_units_shipped\` numeric,
  	\`version_units_delivered\` numeric,
  	\`version_units_invoiced\` numeric,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_unit_price\` numeric,
  	\`version_unit_cost\` numeric,
  	\`version_amount_invoiced\` numeric,
  	\`version_amount_paid\` numeric,
  	\`version_minutes_ordered\` numeric,
  	\`version_minutes_produced\` numeric,
  	\`version_minutes_to_produce\` numeric,
  	\`version_net_weight\` numeric,
  	\`version_gross_weight\` numeric,
  	\`version_billable_weight\` numeric,
  	\`version_lot_variants_count\` numeric,
  	\`version_lot_work_phases_count\` numeric,
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`lots\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__lots_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_number", "version_order_id", "version_product_id", "version_kind", "version_status", "version_confirmed_at", "version_started_at", "version_finished_at", "version_closed_at", "version_canceled_at", "version_cancel_reason", "version_date", "version_delivery_date", "version_shipped_at", "version_delivered_at", "version_units_ordered", "version_units", "version_units_produced", "version_units_packed", "version_units_shipped", "version_units_delivered", "version_units_invoiced", "version_currency", "version_unit_price", "version_unit_cost", "version_amount_invoiced", "version_amount_paid", "version_minutes_ordered", "version_minutes_produced", "version_minutes_to_produce", "version_net_weight", "version_gross_weight", "version_billable_weight", "version_lot_variants_count", "version_lot_work_phases_count", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_number", "version_order_id", "version_product_id", "version_kind", "version_status", "version_confirmed_at", "version_started_at", "version_finished_at", "version_closed_at", "version_canceled_at", "version_cancel_reason", "version_date", "version_delivery_date", "version_shipped_at", "version_delivered_at", "version_units_ordered", "version_units", "version_units_produced", "version_units_packed", "version_units_shipped", "version_units_delivered", "version_units_invoiced", "version_currency", "version_unit_price", "version_unit_cost", "version_amount_invoiced", "version_amount_paid", "version_minutes_ordered", "version_minutes_produced", "version_minutes_to_produce", "version_net_weight", "version_gross_weight", "version_billable_weight", "version_lot_variants_count", "version_lot_work_phases_count", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_lots_v\`;`)
  await db.run(sql`DROP TABLE \`_lots_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__lots_v\` RENAME TO \`_lots_v\`;`)
  await db.run(sql`CREATE INDEX \`_lots_v_parent_idx\` ON \`_lots_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_version_version_uuid_idx\` ON \`_lots_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_version_version_tenant_idx\` ON \`_lots_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_version_version_number_idx\` ON \`_lots_v\` (\`version_number\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_version_version_order_idx\` ON \`_lots_v\` (\`version_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_version_version_product_idx\` ON \`_lots_v\` (\`version_product_id\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_version_version_kind_idx\` ON \`_lots_v\` (\`version_kind\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_version_version_status_idx\` ON \`_lots_v\` (\`version_status\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_version_version_created_by_idx\` ON \`_lots_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_version_version_approved_by_idx\` ON \`_lots_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_version_version_updated_at_idx\` ON \`_lots_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_version_version_created_at_idx\` ON \`_lots_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_created_at_idx\` ON \`_lots_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_updated_at_idx\` ON \`_lots_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_e748d22a668778d2291b0c286f5fb0b16\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36) NOT NULL,
  	\`batch_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`batch_id\`) REFERENCES \`batches\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_e748d22a668778d2291b0c286f5fb0b16\`("_order", "_parent_id", "id", "item_id", "batch_id", "quantity", "unit_of_measure") SELECT "_order", "_parent_id", "id", "item_id", "batch_id", "quantity", "unit_of_measure" FROM \`e748d22a668778d2291b0c286f5fb0b16\`;`)
  await db.run(sql`DROP TABLE \`e748d22a668778d2291b0c286f5fb0b16\`;`)
  await db.run(sql`ALTER TABLE \`__new_e748d22a668778d2291b0c286f5fb0b16\` RENAME TO \`e748d22a668778d2291b0c286f5fb0b16\`;`)
  await db.run(sql`CREATE INDEX \`e748d22a668778d2291b0c286f5fb0b16_order_idx\` ON \`e748d22a668778d2291b0c286f5fb0b16\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e748d22a668778d2291b0c286f5fb0b16_parent_id_idx\` ON \`e748d22a668778d2291b0c286f5fb0b16\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e748d22a668778d2291b0c286f5fb0b16_item_idx\` ON \`e748d22a668778d2291b0c286f5fb0b16\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`e748d22a668778d2291b0c286f5fb0b16_batch_idx\` ON \`e748d22a668778d2291b0c286f5fb0b16\` (\`batch_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__e748d22a668778d2291b0c286f5fb0b16_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36) NOT NULL,
  	\`batch_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`batch_id\`) REFERENCES \`batches\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_packages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__e748d22a668778d2291b0c286f5fb0b16_v\`("_order", "_parent_id", "id", "item_id", "batch_id", "quantity", "unit_of_measure", "_uuid") SELECT "_order", "_parent_id", "id", "item_id", "batch_id", "quantity", "unit_of_measure", "_uuid" FROM \`_e748d22a668778d2291b0c286f5fb0b16_v\`;`)
  await db.run(sql`DROP TABLE \`_e748d22a668778d2291b0c286f5fb0b16_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__e748d22a668778d2291b0c286f5fb0b16_v\` RENAME TO \`_e748d22a668778d2291b0c286f5fb0b16_v\`;`)
  await db.run(sql`CREATE INDEX \`_e748d22a668778d2291b0c286f5fb0b16_v_order_idx\` ON \`_e748d22a668778d2291b0c286f5fb0b16_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e748d22a668778d2291b0c286f5fb0b16_v_parent_id_idx\` ON \`_e748d22a668778d2291b0c286f5fb0b16_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e748d22a668778d2291b0c286f5fb0b16_v_item_idx\` ON \`_e748d22a668778d2291b0c286f5fb0b16_v\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`_e748d22a668778d2291b0c286f5fb0b16_v_batch_idx\` ON \`_e748d22a668778d2291b0c286f5fb0b16_v\` (\`batch_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_production_receipts\` (
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
  	FOREIGN KEY (\`finished_good_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`target_warehouse_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`inventory_movement_id\`) REFERENCES \`inventory_movements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_production_receipts\`("id", "uuid", "tenant_id", "reference", "work_order_id", "finished_good_id", "received_quantity", "target_warehouse_id", "lot_number", "serial_numbers", "receipt_date", "currency", "cost_material_cost", "cost_labour_cost", "cost_overhead_cost", "cost_absorbed_cost", "cost_unit_cost", "inventory_movement_id", "journal_entry_id", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "reference", "work_order_id", "finished_good_id", "received_quantity", "target_warehouse_id", "lot_number", "serial_numbers", "receipt_date", "currency", "cost_material_cost", "cost_labour_cost", "cost_overhead_cost", "cost_absorbed_cost", "cost_unit_cost", "inventory_movement_id", "journal_entry_id", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`production_receipts\`;`)
  await db.run(sql`DROP TABLE \`production_receipts\`;`)
  await db.run(sql`ALTER TABLE \`__new_production_receipts\` RENAME TO \`production_receipts\`;`)
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
  await db.run(sql`CREATE TABLE \`__new__production_receipts_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_reference\` text NOT NULL,
  	\`version_work_order_id\` text(36) NOT NULL,
  	\`version_finished_good_id\` text(36) NOT NULL,
  	\`version_received_quantity\` numeric NOT NULL,
  	\`version_target_warehouse_id\` text(36) NOT NULL,
  	\`version_lot_number\` text,
  	\`version_serial_numbers\` text,
  	\`version_receipt_date\` text NOT NULL,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_cost_material_cost\` numeric DEFAULT 0,
  	\`version_cost_labour_cost\` numeric DEFAULT 0,
  	\`version_cost_overhead_cost\` numeric DEFAULT 0,
  	\`version_cost_absorbed_cost\` numeric DEFAULT 0,
  	\`version_cost_unit_cost\` numeric DEFAULT 0,
  	\`version_inventory_movement_id\` text(36),
  	\`version_journal_entry_id\` text(36),
  	\`version_status\` text DEFAULT 'draft',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`production_receipts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_work_order_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_finished_good_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_target_warehouse_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_inventory_movement_id\`) REFERENCES \`inventory_movements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__production_receipts_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_work_order_id", "version_finished_good_id", "version_received_quantity", "version_target_warehouse_id", "version_lot_number", "version_serial_numbers", "version_receipt_date", "version_currency", "version_cost_material_cost", "version_cost_labour_cost", "version_cost_overhead_cost", "version_cost_absorbed_cost", "version_cost_unit_cost", "version_inventory_movement_id", "version_journal_entry_id", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_work_order_id", "version_finished_good_id", "version_received_quantity", "version_target_warehouse_id", "version_lot_number", "version_serial_numbers", "version_receipt_date", "version_currency", "version_cost_material_cost", "version_cost_labour_cost", "version_cost_overhead_cost", "version_cost_absorbed_cost", "version_cost_unit_cost", "version_inventory_movement_id", "version_journal_entry_id", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_production_receipts_v\`;`)
  await db.run(sql`DROP TABLE \`_production_receipts_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__production_receipts_v\` RENAME TO \`_production_receipts_v\`;`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_parent_idx\` ON \`_production_receipts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_uuid_idx\` ON \`_production_receipts_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_tenant_idx\` ON \`_production_receipts_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_reference_idx\` ON \`_production_receipts_v\` (\`version_reference\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_work_order_idx\` ON \`_production_receipts_v\` (\`version_work_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_finished_good_idx\` ON \`_production_receipts_v\` (\`version_finished_good_id\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_target_warehouse_idx\` ON \`_production_receipts_v\` (\`version_target_warehouse_id\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_receipt_date_idx\` ON \`_production_receipts_v\` (\`version_receipt_date\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_inventory_movemen_idx\` ON \`_production_receipts_v\` (\`version_inventory_movement_id\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_journal_entry_idx\` ON \`_production_receipts_v\` (\`version_journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_created_by_idx\` ON \`_production_receipts_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_approved_by_idx\` ON \`_production_receipts_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_updated_at_idx\` ON \`_production_receipts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_created_at_idx\` ON \`_production_receipts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_created_at_idx\` ON \`_production_receipts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_updated_at_idx\` ON \`_production_receipts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_eced028e288018042b97287d40f1c01dd\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`line_number\` numeric DEFAULT 1,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`unit_price\` numeric NOT NULL,
  	\`line_total\` numeric DEFAULT 0,
  	\`gl_account_id\` text,
  	\`quantity_received\` numeric DEFAULT 0,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`purchase_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_eced028e288018042b97287d40f1c01dd\`("_order", "_parent_id", "id", "line_number", "item_id", "quantity", "unit_price", "line_total", "gl_account_id", "quantity_received") SELECT "_order", "_parent_id", "id", "line_number", "item_id", "quantity", "unit_price", "line_total", "gl_account_id", "quantity_received" FROM \`eced028e288018042b97287d40f1c01dd\`;`)
  await db.run(sql`DROP TABLE \`eced028e288018042b97287d40f1c01dd\`;`)
  await db.run(sql`ALTER TABLE \`__new_eced028e288018042b97287d40f1c01dd\` RENAME TO \`eced028e288018042b97287d40f1c01dd\`;`)
  await db.run(sql`CREATE INDEX \`eced028e288018042b97287d40f1c01dd_order_idx\` ON \`eced028e288018042b97287d40f1c01dd\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eced028e288018042b97287d40f1c01dd_parent_id_idx\` ON \`eced028e288018042b97287d40f1c01dd\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`eced028e288018042b97287d40f1c01dd_item_idx\` ON \`eced028e288018042b97287d40f1c01dd\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`eced028e288018042b97287d40f1c01dd_gl_account_idx\` ON \`eced028e288018042b97287d40f1c01dd\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__eced028e288018042b97287d40f1c01dd_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`line_number\` numeric DEFAULT 1,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`unit_price\` numeric NOT NULL,
  	\`line_total\` numeric DEFAULT 0,
  	\`gl_account_id\` text,
  	\`quantity_received\` numeric DEFAULT 0,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_purchase_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__eced028e288018042b97287d40f1c01dd_v\`("_order", "_parent_id", "id", "line_number", "item_id", "quantity", "unit_price", "line_total", "gl_account_id", "quantity_received", "_uuid") SELECT "_order", "_parent_id", "id", "line_number", "item_id", "quantity", "unit_price", "line_total", "gl_account_id", "quantity_received", "_uuid" FROM \`_eced028e288018042b97287d40f1c01dd_v\`;`)
  await db.run(sql`DROP TABLE \`_eced028e288018042b97287d40f1c01dd_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__eced028e288018042b97287d40f1c01dd_v\` RENAME TO \`_eced028e288018042b97287d40f1c01dd_v\`;`)
  await db.run(sql`CREATE INDEX \`_eced028e288018042b97287d40f1c01dd_v_order_idx\` ON \`_eced028e288018042b97287d40f1c01dd_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eced028e288018042b97287d40f1c01dd_v_parent_id_idx\` ON \`_eced028e288018042b97287d40f1c01dd_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_eced028e288018042b97287d40f1c01dd_v_item_idx\` ON \`_eced028e288018042b97287d40f1c01dd_v\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`_eced028e288018042b97287d40f1c01dd_v_gl_account_idx\` ON \`_eced028e288018042b97287d40f1c01dd_v\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_pr_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`uom\` text DEFAULT 'EA',
  	\`estimated_unit_price\` numeric NOT NULL,
  	\`estimated_amount\` numeric NOT NULL,
  	\`gl_account_id\` text,
  	\`preferred_vendor_id\` text(36),
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`preferred_vendor_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`purchase_requisitions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pr_lines\`("_order", "_parent_id", "id", "item_id", "quantity", "uom", "estimated_unit_price", "estimated_amount", "gl_account_id", "preferred_vendor_id") SELECT "_order", "_parent_id", "id", "item_id", "quantity", "uom", "estimated_unit_price", "estimated_amount", "gl_account_id", "preferred_vendor_id" FROM \`pr_lines\`;`)
  await db.run(sql`DROP TABLE \`pr_lines\`;`)
  await db.run(sql`ALTER TABLE \`__new_pr_lines\` RENAME TO \`pr_lines\`;`)
  await db.run(sql`CREATE INDEX \`pr_lines_order_idx\` ON \`pr_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pr_lines_parent_id_idx\` ON \`pr_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pr_lines_item_idx\` ON \`pr_lines\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`pr_lines_gl_account_idx\` ON \`pr_lines\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE INDEX \`pr_lines_preferred_vendor_idx\` ON \`pr_lines\` (\`preferred_vendor_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__pr_lines_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`uom\` text DEFAULT 'EA',
  	\`estimated_unit_price\` numeric NOT NULL,
  	\`estimated_amount\` numeric NOT NULL,
  	\`gl_account_id\` text,
  	\`preferred_vendor_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`preferred_vendor_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_purchase_requisitions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pr_lines_v\`("_order", "_parent_id", "id", "item_id", "quantity", "uom", "estimated_unit_price", "estimated_amount", "gl_account_id", "preferred_vendor_id", "_uuid") SELECT "_order", "_parent_id", "id", "item_id", "quantity", "uom", "estimated_unit_price", "estimated_amount", "gl_account_id", "preferred_vendor_id", "_uuid" FROM \`_pr_lines_v\`;`)
  await db.run(sql`DROP TABLE \`_pr_lines_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__pr_lines_v\` RENAME TO \`_pr_lines_v\`;`)
  await db.run(sql`CREATE INDEX \`_pr_lines_v_order_idx\` ON \`_pr_lines_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pr_lines_v_parent_id_idx\` ON \`_pr_lines_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pr_lines_v_item_idx\` ON \`_pr_lines_v\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`_pr_lines_v_gl_account_idx\` ON \`_pr_lines_v\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_pr_lines_v_preferred_vendor_idx\` ON \`_pr_lines_v\` (\`preferred_vendor_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_quality_inspections\` (
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
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`work_order_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`goods_receipt_id\`) REFERENCES \`goods_receipts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`shipment_id\`) REFERENCES \`shipments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`inspector_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`inventory_movement_id\`) REFERENCES \`inventory_movements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_quality_inspections\`("id", "uuid", "tenant_id", "reference", "inspection_type", "item_id", "inspected_quantity", "sample_size", "failed_quantity", "work_order_id", "goods_receipt_id", "shipment_id", "inspection_date", "inspector_id", "outcome", "failure_reason", "capa_reference", "inventory_movement_id", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "reference", "inspection_type", "item_id", "inspected_quantity", "sample_size", "failed_quantity", "work_order_id", "goods_receipt_id", "shipment_id", "inspection_date", "inspector_id", "outcome", "failure_reason", "capa_reference", "inventory_movement_id", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`quality_inspections\`;`)
  await db.run(sql`DROP TABLE \`quality_inspections\`;`)
  await db.run(sql`ALTER TABLE \`__new_quality_inspections\` RENAME TO \`quality_inspections\`;`)
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
  await db.run(sql`CREATE TABLE \`__new__quality_inspections_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_reference\` text NOT NULL,
  	\`version_inspection_type\` text NOT NULL,
  	\`version_item_id\` text(36) NOT NULL,
  	\`version_inspected_quantity\` numeric NOT NULL,
  	\`version_sample_size\` numeric,
  	\`version_failed_quantity\` numeric DEFAULT 0,
  	\`version_work_order_id\` text(36),
  	\`version_goods_receipt_id\` text(36),
  	\`version_shipment_id\` text(36),
  	\`version_inspection_date\` text NOT NULL,
  	\`version_inspector_id\` text(36),
  	\`version_outcome\` text DEFAULT 'pending' NOT NULL,
  	\`version_failure_reason\` text,
  	\`version_capa_reference\` text,
  	\`version_inventory_movement_id\` text(36),
  	\`version_status\` text DEFAULT 'draft',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`quality_inspections\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_work_order_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_goods_receipt_id\`) REFERENCES \`goods_receipts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_shipment_id\`) REFERENCES \`shipments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_inspector_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_inventory_movement_id\`) REFERENCES \`inventory_movements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__quality_inspections_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_inspection_type", "version_item_id", "version_inspected_quantity", "version_sample_size", "version_failed_quantity", "version_work_order_id", "version_goods_receipt_id", "version_shipment_id", "version_inspection_date", "version_inspector_id", "version_outcome", "version_failure_reason", "version_capa_reference", "version_inventory_movement_id", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_inspection_type", "version_item_id", "version_inspected_quantity", "version_sample_size", "version_failed_quantity", "version_work_order_id", "version_goods_receipt_id", "version_shipment_id", "version_inspection_date", "version_inspector_id", "version_outcome", "version_failure_reason", "version_capa_reference", "version_inventory_movement_id", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_quality_inspections_v\`;`)
  await db.run(sql`DROP TABLE \`_quality_inspections_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__quality_inspections_v\` RENAME TO \`_quality_inspections_v\`;`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_parent_idx\` ON \`_quality_inspections_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_uuid_idx\` ON \`_quality_inspections_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_tenant_idx\` ON \`_quality_inspections_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_reference_idx\` ON \`_quality_inspections_v\` (\`version_reference\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_item_idx\` ON \`_quality_inspections_v\` (\`version_item_id\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_work_order_idx\` ON \`_quality_inspections_v\` (\`version_work_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_goods_receipt_idx\` ON \`_quality_inspections_v\` (\`version_goods_receipt_id\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_shipment_idx\` ON \`_quality_inspections_v\` (\`version_shipment_id\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_inspection_date_idx\` ON \`_quality_inspections_v\` (\`version_inspection_date\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_inspector_idx\` ON \`_quality_inspections_v\` (\`version_inspector_id\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_inventory_movemen_idx\` ON \`_quality_inspections_v\` (\`version_inventory_movement_id\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_created_by_idx\` ON \`_quality_inspections_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_approved_by_idx\` ON \`_quality_inspections_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_updated_at_idx\` ON \`_quality_inspections_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_created_at_idx\` ON \`_quality_inspections_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_created_at_idx\` ON \`_quality_inspections_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_updated_at_idx\` ON \`_quality_inspections_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_e70806190d4048502b85ef401011f5819\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity_returned\` numeric NOT NULL,
  	\`restock\` integer DEFAULT true,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`returns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_e70806190d4048502b85ef401011f5819\`("_order", "_parent_id", "id", "item_id", "quantity_returned", "restock") SELECT "_order", "_parent_id", "id", "item_id", "quantity_returned", "restock" FROM \`e70806190d4048502b85ef401011f5819\`;`)
  await db.run(sql`DROP TABLE \`e70806190d4048502b85ef401011f5819\`;`)
  await db.run(sql`ALTER TABLE \`__new_e70806190d4048502b85ef401011f5819\` RENAME TO \`e70806190d4048502b85ef401011f5819\`;`)
  await db.run(sql`CREATE INDEX \`e70806190d4048502b85ef401011f5819_order_idx\` ON \`e70806190d4048502b85ef401011f5819\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e70806190d4048502b85ef401011f5819_parent_id_idx\` ON \`e70806190d4048502b85ef401011f5819\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e70806190d4048502b85ef401011f5819_item_idx\` ON \`e70806190d4048502b85ef401011f5819\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__e70806190d4048502b85ef401011f5819_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity_returned\` numeric NOT NULL,
  	\`restock\` integer DEFAULT true,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_returns_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__e70806190d4048502b85ef401011f5819_v\`("_order", "_parent_id", "id", "item_id", "quantity_returned", "restock", "_uuid") SELECT "_order", "_parent_id", "id", "item_id", "quantity_returned", "restock", "_uuid" FROM \`_e70806190d4048502b85ef401011f5819_v\`;`)
  await db.run(sql`DROP TABLE \`_e70806190d4048502b85ef401011f5819_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__e70806190d4048502b85ef401011f5819_v\` RENAME TO \`_e70806190d4048502b85ef401011f5819_v\`;`)
  await db.run(sql`CREATE INDEX \`_e70806190d4048502b85ef401011f5819_v_order_idx\` ON \`_e70806190d4048502b85ef401011f5819_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e70806190d4048502b85ef401011f5819_v_parent_id_idx\` ON \`_e70806190d4048502b85ef401011f5819_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e70806190d4048502b85ef401011f5819_v_item_idx\` ON \`_e70806190d4048502b85ef401011f5819_v\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_e934f7628401582b094b784c3c47361f6\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`shipments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_e934f7628401582b094b784c3c47361f6\`("_order", "_parent_id", "id", "item_id", "quantity") SELECT "_order", "_parent_id", "id", "item_id", "quantity" FROM \`e934f7628401582b094b784c3c47361f6\`;`)
  await db.run(sql`DROP TABLE \`e934f7628401582b094b784c3c47361f6\`;`)
  await db.run(sql`ALTER TABLE \`__new_e934f7628401582b094b784c3c47361f6\` RENAME TO \`e934f7628401582b094b784c3c47361f6\`;`)
  await db.run(sql`CREATE INDEX \`e934f7628401582b094b784c3c47361f6_order_idx\` ON \`e934f7628401582b094b784c3c47361f6\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e934f7628401582b094b784c3c47361f6_parent_id_idx\` ON \`e934f7628401582b094b784c3c47361f6\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e934f7628401582b094b784c3c47361f6_item_idx\` ON \`e934f7628401582b094b784c3c47361f6\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__e934f7628401582b094b784c3c47361f6_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_shipments_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__e934f7628401582b094b784c3c47361f6_v\`("_order", "_parent_id", "id", "item_id", "quantity", "_uuid") SELECT "_order", "_parent_id", "id", "item_id", "quantity", "_uuid" FROM \`_e934f7628401582b094b784c3c47361f6_v\`;`)
  await db.run(sql`DROP TABLE \`_e934f7628401582b094b784c3c47361f6_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__e934f7628401582b094b784c3c47361f6_v\` RENAME TO \`_e934f7628401582b094b784c3c47361f6_v\`;`)
  await db.run(sql`CREATE INDEX \`_e934f7628401582b094b784c3c47361f6_v_order_idx\` ON \`_e934f7628401582b094b784c3c47361f6_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e934f7628401582b094b784c3c47361f6_v_parent_id_idx\` ON \`_e934f7628401582b094b784c3c47361f6_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e934f7628401582b094b784c3c47361f6_v_item_idx\` ON \`_e934f7628401582b094b784c3c47361f6_v\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_vq_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`uom\` text DEFAULT 'EA',
  	\`unit_price\` numeric NOT NULL,
  	\`line_total\` numeric NOT NULL,
  	\`lead_time_days\` numeric,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`vendor_quotes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_vq_lines\`("_order", "_parent_id", "id", "item_id", "quantity", "uom", "unit_price", "line_total", "lead_time_days") SELECT "_order", "_parent_id", "id", "item_id", "quantity", "uom", "unit_price", "line_total", "lead_time_days" FROM \`vq_lines\`;`)
  await db.run(sql`DROP TABLE \`vq_lines\`;`)
  await db.run(sql`ALTER TABLE \`__new_vq_lines\` RENAME TO \`vq_lines\`;`)
  await db.run(sql`CREATE INDEX \`vq_lines_order_idx\` ON \`vq_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`vq_lines_parent_id_idx\` ON \`vq_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`vq_lines_item_idx\` ON \`vq_lines\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__vq_lines_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`uom\` text DEFAULT 'EA',
  	\`unit_price\` numeric NOT NULL,
  	\`line_total\` numeric NOT NULL,
  	\`lead_time_days\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_vendor_quotes_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__vq_lines_v\`("_order", "_parent_id", "id", "item_id", "quantity", "uom", "unit_price", "line_total", "lead_time_days", "_uuid") SELECT "_order", "_parent_id", "id", "item_id", "quantity", "uom", "unit_price", "line_total", "lead_time_days", "_uuid" FROM \`_vq_lines_v\`;`)
  await db.run(sql`DROP TABLE \`_vq_lines_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__vq_lines_v\` RENAME TO \`_vq_lines_v\`;`)
  await db.run(sql`CREATE INDEX \`_vq_lines_v_order_idx\` ON \`_vq_lines_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_vq_lines_v_parent_id_idx\` ON \`_vq_lines_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_vq_lines_v_item_idx\` ON \`_vq_lines_v\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_e801d0467ac3d8adb9473d14e41225f76\` (
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
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tax_category_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_e801d0467ac3d8adb9473d14e41225f76\`("_order", "_parent_id", "id", "line_number", "item_id", "quantity", "unit_of_measure", "unit_price", "line_net", "tax_category_id", "discount", "requested_delivery_date") SELECT "_order", "_parent_id", "id", "line_number", "item_id", "quantity", "unit_of_measure", "unit_price", "line_net", "tax_category_id", "discount", "requested_delivery_date" FROM \`e801d0467ac3d8adb9473d14e41225f76\`;`)
  await db.run(sql`DROP TABLE \`e801d0467ac3d8adb9473d14e41225f76\`;`)
  await db.run(sql`ALTER TABLE \`__new_e801d0467ac3d8adb9473d14e41225f76\` RENAME TO \`e801d0467ac3d8adb9473d14e41225f76\`;`)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_order_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_parent_id_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_item_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_tax_category_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`tax_category_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__e801d0467ac3d8adb9473d14e41225f76_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`line_number\` numeric NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`unit_price\` numeric NOT NULL,
  	\`line_net\` numeric DEFAULT 0,
  	\`tax_category_id\` text(36),
  	\`discount\` numeric DEFAULT 0,
  	\`requested_delivery_date\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tax_category_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__e801d0467ac3d8adb9473d14e41225f76_v\`("_order", "_parent_id", "id", "line_number", "item_id", "quantity", "unit_of_measure", "unit_price", "line_net", "tax_category_id", "discount", "requested_delivery_date", "_uuid") SELECT "_order", "_parent_id", "id", "line_number", "item_id", "quantity", "unit_of_measure", "unit_price", "line_net", "tax_category_id", "discount", "requested_delivery_date", "_uuid" FROM \`_e801d0467ac3d8adb9473d14e41225f76_v\`;`)
  await db.run(sql`DROP TABLE \`_e801d0467ac3d8adb9473d14e41225f76_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__e801d0467ac3d8adb9473d14e41225f76_v\` RENAME TO \`_e801d0467ac3d8adb9473d14e41225f76_v\`;`)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_order_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_parent_id_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_item_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_tax_category_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`tax_category_id\`);`)
  await db.run(sql`ALTER TABLE \`variants\` ADD \`sku\` text;`)
  await db.run(sql`ALTER TABLE \`variants\` ADD \`barcode\` text;`)
  await db.run(sql`CREATE UNIQUE INDEX \`variants_sku_idx\` ON \`variants\` (\`sku\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`variants_barcode_idx\` ON \`variants\` (\`barcode\`);`)
  await db.run(sql`ALTER TABLE \`_variants_v\` ADD \`version_sku\` text;`)
  await db.run(sql`ALTER TABLE \`_variants_v\` ADD \`version_barcode\` text;`)
  await db.run(sql`CREATE INDEX \`_variants_v_version_version_sku_idx\` ON \`_variants_v\` (\`version_sku\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_version_version_barcode_idx\` ON \`_variants_v\` (\`version_barcode\`);`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`code\` text;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`sku\` text;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`barcode\` text;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`address_id\` text(36) REFERENCES addresses(id);`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`pricing_price\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`pricing_cost\` numeric;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`pricing_compare_at_price\` numeric;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`pricing_vendor_price\` numeric;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`pricing_min_price\` numeric;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`pricing_currency_code\` text DEFAULT 'EUR';`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`pricing_price_includes_tax\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`taxation_taxable\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`taxation_tax_rate\` numeric;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`taxation_tax_debit_account_id\` text REFERENCES gl_accounts(id);`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`taxation_tax_credit_account_id\` text REFERENCES gl_accounts(id);`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`ledger_debit_account_id\` text REFERENCES gl_accounts(id);`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`ledger_credit_account_id\` text REFERENCES gl_accounts(id);`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`stock_inventory_quantity\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`stock_inventory_management\` text;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`stock_inventory_policy\` text;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`physical_weight\` numeric;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`physical_weight_unit\` text;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`physical_grams\` numeric;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`physical_hs_code\` text;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`physical_contents\` text;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`physical_requires_shipping\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`discounts_max_discount_rate\` numeric;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`discounts_min_profit_rate\` numeric;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`discounts_max_profit_rate\` numeric;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`fulfillment_fulfillment_service\` text;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`fulfillment_period\` text;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`visibility_visibility\` text;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`metadata\` text;`)
  await db.run(sql`CREATE UNIQUE INDEX \`products_code_idx\` ON \`products\` (\`code\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`products_sku_idx\` ON \`products\` (\`sku\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`products_barcode_idx\` ON \`products\` (\`barcode\`);`)
  await db.run(sql`CREATE INDEX \`products_address_idx\` ON \`products\` (\`address_id\`);`)
  await db.run(sql`CREATE INDEX \`products_taxation_taxation_tax_debit_account_idx\` ON \`products\` (\`taxation_tax_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`products_taxation_taxation_tax_credit_account_idx\` ON \`products\` (\`taxation_tax_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`products_ledger_ledger_debit_account_idx\` ON \`products\` (\`ledger_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`products_ledger_ledger_credit_account_idx\` ON \`products\` (\`ledger_credit_account_id\`);`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_code\` text;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_sku\` text;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_barcode\` text;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_address_id\` text(36) REFERENCES addresses(id);`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_pricing_price\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_pricing_cost\` numeric;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_pricing_compare_at_price\` numeric;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_pricing_vendor_price\` numeric;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_pricing_min_price\` numeric;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_pricing_currency_code\` text DEFAULT 'EUR';`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_pricing_price_includes_tax\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_taxation_taxable\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_taxation_tax_rate\` numeric;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_taxation_tax_debit_account_id\` text REFERENCES gl_accounts(id);`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_taxation_tax_credit_account_id\` text REFERENCES gl_accounts(id);`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_ledger_debit_account_id\` text REFERENCES gl_accounts(id);`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_ledger_credit_account_id\` text REFERENCES gl_accounts(id);`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_stock_inventory_quantity\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_stock_inventory_management\` text;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_stock_inventory_policy\` text;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_physical_weight\` numeric;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_physical_weight_unit\` text;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_physical_grams\` numeric;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_physical_hs_code\` text;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_physical_contents\` text;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_physical_requires_shipping\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_discounts_max_discount_rate\` numeric;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_discounts_min_profit_rate\` numeric;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_discounts_max_profit_rate\` numeric;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_fulfillment_fulfillment_service\` text;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_fulfillment_period\` text;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_visibility_visibility\` text;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_metadata\` text;`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_code_idx\` ON \`_products_v\` (\`version_code\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_sku_idx\` ON \`_products_v\` (\`version_sku\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_barcode_idx\` ON \`_products_v\` (\`version_barcode\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_address_idx\` ON \`_products_v\` (\`version_address_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_taxation_version_taxation_tax_debit__idx\` ON \`_products_v\` (\`version_taxation_tax_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_taxation_version_taxation_tax_credit_idx\` ON \`_products_v\` (\`version_taxation_tax_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_ledger_version_ledger_debit_account_idx\` ON \`_products_v\` (\`version_ledger_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_ledger_version_ledger_credit_account_idx\` ON \`_products_v\` (\`version_ledger_credit_account_id\`);`)
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`items\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`code\` text NOT NULL,
  	\`name\` text,
  	\`sku\` text,
  	\`barcode\` text,
  	\`product_id\` text(36),
  	\`variant_id\` text(36),
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
  	\`taxation_tax_debit_account_id\` text,
  	\`taxation_tax_credit_account_id\` text,
  	\`ledger_debit_account_id\` text,
  	\`ledger_credit_account_id\` text,
  	\`inventory_inventory_quantity\` numeric DEFAULT 0 NOT NULL,
  	\`inventory_inventory_management\` text,
  	\`inventory_inventory_policy\` text,
  	\`physical_weight\` numeric,
  	\`physical_weight_unit\` text,
  	\`physical_grams\` numeric,
  	\`physical_hs_code\` text,
  	\`physical_contents\` text,
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
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
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
  await db.run(sql`CREATE INDEX \`items_name_idx\` ON \`items\` (\`name\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`items_sku_idx\` ON \`items\` (\`sku\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`items_barcode_idx\` ON \`items\` (\`barcode\`);`)
  await db.run(sql`CREATE INDEX \`items_product_idx\` ON \`items\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX \`items_variant_idx\` ON \`items\` (\`variant_id\`);`)
  await db.run(sql`CREATE INDEX \`items_address_idx\` ON \`items\` (\`address_id\`);`)
  await db.run(sql`CREATE INDEX \`items_taxation_taxation_tax_debit_account_idx\` ON \`items\` (\`taxation_tax_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`items_taxation_taxation_tax_credit_account_idx\` ON \`items\` (\`taxation_tax_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`items_ledger_ledger_debit_account_idx\` ON \`items\` (\`ledger_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`items_ledger_ledger_credit_account_idx\` ON \`items\` (\`ledger_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`items_updated_at_idx\` ON \`items\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`items_created_at_idx\` ON \`items\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_items_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_code\` text NOT NULL,
  	\`version_name\` text,
  	\`version_sku\` text,
  	\`version_barcode\` text,
  	\`version_product_id\` text(36),
  	\`version_variant_id\` text(36),
  	\`version_address_id\` text(36) NOT NULL,
  	\`version_pricing_price\` numeric DEFAULT 0,
  	\`version_pricing_cost\` numeric,
  	\`version_pricing_compare_at_price\` numeric,
  	\`version_pricing_vendor_price\` numeric,
  	\`version_pricing_min_price\` numeric,
  	\`version_pricing_currency_code\` text DEFAULT 'EUR' NOT NULL,
  	\`version_pricing_price_includes_tax\` integer DEFAULT false,
  	\`version_taxation_taxable\` integer DEFAULT true,
  	\`version_taxation_tax_rate\` numeric,
  	\`version_taxation_tax_debit_account_id\` text,
  	\`version_taxation_tax_credit_account_id\` text,
  	\`version_ledger_debit_account_id\` text,
  	\`version_ledger_credit_account_id\` text,
  	\`version_inventory_inventory_quantity\` numeric DEFAULT 0 NOT NULL,
  	\`version_inventory_inventory_management\` text,
  	\`version_inventory_inventory_policy\` text,
  	\`version_physical_weight\` numeric,
  	\`version_physical_weight_unit\` text,
  	\`version_physical_grams\` numeric,
  	\`version_physical_hs_code\` text,
  	\`version_physical_contents\` text,
  	\`version_physical_requires_shipping\` integer DEFAULT true,
  	\`version_discounts_max_discount_rate\` numeric,
  	\`version_discounts_min_profit_rate\` numeric,
  	\`version_discounts_max_profit_rate\` numeric,
  	\`version_fulfillment_fulfillment_service\` text,
  	\`version_fulfillment_period\` text,
  	\`version_visibility_visibility\` text,
  	\`version_metadata\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_variant_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_taxation_tax_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_taxation_tax_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_ledger_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_ledger_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_items_v_parent_idx\` ON \`_items_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_version_uuid_idx\` ON \`_items_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_version_tenant_idx\` ON \`_items_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_version_code_idx\` ON \`_items_v\` (\`version_code\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_version_name_idx\` ON \`_items_v\` (\`version_name\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_version_sku_idx\` ON \`_items_v\` (\`version_sku\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_version_barcode_idx\` ON \`_items_v\` (\`version_barcode\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_version_product_idx\` ON \`_items_v\` (\`version_product_id\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_version_variant_idx\` ON \`_items_v\` (\`version_variant_id\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_version_address_idx\` ON \`_items_v\` (\`version_address_id\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_taxation_version_taxation_tax_debit_acc_idx\` ON \`_items_v\` (\`version_taxation_tax_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_taxation_version_taxation_tax_credit_ac_idx\` ON \`_items_v\` (\`version_taxation_tax_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_ledger_version_ledger_debit_account_idx\` ON \`_items_v\` (\`version_ledger_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_ledger_version_ledger_credit_account_idx\` ON \`_items_v\` (\`version_ledger_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_version_updated_at_idx\` ON \`_items_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_version_created_at_idx\` ON \`_items_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_created_at_idx\` ON \`_items_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_updated_at_idx\` ON \`_items_v\` (\`updated_at\`);`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_batches\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
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
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`work_order_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`goods_receipt_id\`) REFERENCES \`goods_receipts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`supplier_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`warehouse_location_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`quality_inspection_id\`) REFERENCES \`quality_inspections\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_batches\`("id", "uuid", "tenant_id", "reference", "item_id", "quantity", "unit_of_measure", "remaining_quantity", "status", "manufacture_date", "expiry_date", "received_date", "country_of_origin", "origin", "work_order_id", "goods_receipt_id", "supplier_id", "supplier_batch_ref", "warehouse_location_id", "quality_inspection_id", "currency", "unit_cost", "recall_recalled", "recall_recall_reference", "recall_recall_date", "recall_recall_reason", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "reference", "item_id", "quantity", "unit_of_measure", "remaining_quantity", "status", "manufacture_date", "expiry_date", "received_date", "country_of_origin", "origin", "work_order_id", "goods_receipt_id", "supplier_id", "supplier_batch_ref", "warehouse_location_id", "quality_inspection_id", "currency", "unit_cost", "recall_recalled", "recall_recall_reference", "recall_recall_date", "recall_recall_reason", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`batches\`;`)
  await db.run(sql`DROP TABLE \`batches\`;`)
  await db.run(sql`ALTER TABLE \`__new_batches\` RENAME TO \`batches\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`batches_uuid_idx\` ON \`batches\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`batches_tenant_idx\` ON \`batches\` (\`tenant_id\`);`)
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
  await db.run(sql`CREATE TABLE \`__new__batches_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_reference\` text NOT NULL,
  	\`version_item_id\` text(36) NOT NULL,
  	\`version_quantity\` numeric NOT NULL,
  	\`version_unit_of_measure\` text DEFAULT 'C62',
  	\`version_remaining_quantity\` numeric DEFAULT 0,
  	\`version_status\` text DEFAULT 'quarantine',
  	\`version_manufacture_date\` text,
  	\`version_expiry_date\` text,
  	\`version_received_date\` text,
  	\`version_country_of_origin\` text,
  	\`version_origin\` text DEFAULT 'produced',
  	\`version_work_order_id\` text(36),
  	\`version_goods_receipt_id\` text(36),
  	\`version_supplier_id\` text(36),
  	\`version_supplier_batch_ref\` text,
  	\`version_warehouse_location_id\` text(36),
  	\`version_quality_inspection_id\` text(36),
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_unit_cost\` numeric DEFAULT 0,
  	\`version_recall_recalled\` integer DEFAULT false,
  	\`version_recall_recall_reference\` text,
  	\`version_recall_recall_date\` text,
  	\`version_recall_recall_reason\` text,
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`batches\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_work_order_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_goods_receipt_id\`) REFERENCES \`goods_receipts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_supplier_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_warehouse_location_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_quality_inspection_id\`) REFERENCES \`quality_inspections\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__batches_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_item_id", "version_quantity", "version_unit_of_measure", "version_remaining_quantity", "version_status", "version_manufacture_date", "version_expiry_date", "version_received_date", "version_country_of_origin", "version_origin", "version_work_order_id", "version_goods_receipt_id", "version_supplier_id", "version_supplier_batch_ref", "version_warehouse_location_id", "version_quality_inspection_id", "version_currency", "version_unit_cost", "version_recall_recalled", "version_recall_recall_reference", "version_recall_recall_date", "version_recall_recall_reason", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_item_id", "version_quantity", "version_unit_of_measure", "version_remaining_quantity", "version_status", "version_manufacture_date", "version_expiry_date", "version_received_date", "version_country_of_origin", "version_origin", "version_work_order_id", "version_goods_receipt_id", "version_supplier_id", "version_supplier_batch_ref", "version_warehouse_location_id", "version_quality_inspection_id", "version_currency", "version_unit_cost", "version_recall_recalled", "version_recall_recall_reference", "version_recall_recall_date", "version_recall_recall_reason", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_batches_v\`;`)
  await db.run(sql`DROP TABLE \`_batches_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__batches_v\` RENAME TO \`_batches_v\`;`)
  await db.run(sql`CREATE INDEX \`_batches_v_parent_idx\` ON \`_batches_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_uuid_idx\` ON \`_batches_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_tenant_idx\` ON \`_batches_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_reference_idx\` ON \`_batches_v\` (\`version_reference\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_item_idx\` ON \`_batches_v\` (\`version_item_id\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_manufacture_date_idx\` ON \`_batches_v\` (\`version_manufacture_date\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_expiry_date_idx\` ON \`_batches_v\` (\`version_expiry_date\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_country_of_origin_idx\` ON \`_batches_v\` (\`version_country_of_origin\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_work_order_idx\` ON \`_batches_v\` (\`version_work_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_goods_receipt_idx\` ON \`_batches_v\` (\`version_goods_receipt_id\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_supplier_idx\` ON \`_batches_v\` (\`version_supplier_id\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_warehouse_location_idx\` ON \`_batches_v\` (\`version_warehouse_location_id\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_quality_inspection_idx\` ON \`_batches_v\` (\`version_quality_inspection_id\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_created_by_idx\` ON \`_batches_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_approved_by_idx\` ON \`_batches_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_updated_at_idx\` ON \`_batches_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_version_version_created_at_idx\` ON \`_batches_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_created_at_idx\` ON \`_batches_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_updated_at_idx\` ON \`_batches_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_ee29d67e947fd80f68f80f3b1111ed7a7\` (
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
  await db.run(sql`INSERT INTO \`__new_ee29d67e947fd80f68f80f3b1111ed7a7\`("_order", "_parent_id", "id", "item_id", "quantity", "unit_of_measure", "waste_allowance", "is_optional") SELECT "_order", "_parent_id", "id", "item_id", "quantity", "unit_of_measure", "waste_allowance", "is_optional" FROM \`ee29d67e947fd80f68f80f3b1111ed7a7\`;`)
  await db.run(sql`DROP TABLE \`ee29d67e947fd80f68f80f3b1111ed7a7\`;`)
  await db.run(sql`ALTER TABLE \`__new_ee29d67e947fd80f68f80f3b1111ed7a7\` RENAME TO \`ee29d67e947fd80f68f80f3b1111ed7a7\`;`)
  await db.run(sql`CREATE INDEX \`ee29d67e947fd80f68f80f3b1111ed7a7_order_idx\` ON \`ee29d67e947fd80f68f80f3b1111ed7a7\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ee29d67e947fd80f68f80f3b1111ed7a7_parent_id_idx\` ON \`ee29d67e947fd80f68f80f3b1111ed7a7\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ee29d67e947fd80f68f80f3b1111ed7a7_item_idx\` ON \`ee29d67e947fd80f68f80f3b1111ed7a7\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_bills_of_materials\` (
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
  await db.run(sql`INSERT INTO \`__new_bills_of_materials\`("id", "uuid", "tenant_id", "reference", "finished_good_id", "version", "effective_from", "effective_to", "produced_quantity", "engineering_change_order", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "reference", "finished_good_id", "version", "effective_from", "effective_to", "produced_quantity", "engineering_change_order", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`bills_of_materials\`;`)
  await db.run(sql`DROP TABLE \`bills_of_materials\`;`)
  await db.run(sql`ALTER TABLE \`__new_bills_of_materials\` RENAME TO \`bills_of_materials\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`bills_of_materials_uuid_idx\` ON \`bills_of_materials\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`bills_of_materials_tenant_idx\` ON \`bills_of_materials\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`bills_of_materials_reference_idx\` ON \`bills_of_materials\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`bills_of_materials_finished_good_idx\` ON \`bills_of_materials\` (\`finished_good_id\`);`)
  await db.run(sql`CREATE INDEX \`bills_of_materials_created_by_idx\` ON \`bills_of_materials\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`bills_of_materials_approved_by_idx\` ON \`bills_of_materials\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`bills_of_materials_updated_at_idx\` ON \`bills_of_materials\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`bills_of_materials_created_at_idx\` ON \`bills_of_materials\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__ee29d67e947fd80f68f80f3b1111ed7a7_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36) NOT NULL,
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`waste_allowance\` numeric DEFAULT 0,
  	\`is_optional\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bills_of_materials_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__ee29d67e947fd80f68f80f3b1111ed7a7_v\`("_order", "_parent_id", "id", "item_id", "quantity", "unit_of_measure", "waste_allowance", "is_optional", "_uuid") SELECT "_order", "_parent_id", "id", "item_id", "quantity", "unit_of_measure", "waste_allowance", "is_optional", "_uuid" FROM \`_ee29d67e947fd80f68f80f3b1111ed7a7_v\`;`)
  await db.run(sql`DROP TABLE \`_ee29d67e947fd80f68f80f3b1111ed7a7_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__ee29d67e947fd80f68f80f3b1111ed7a7_v\` RENAME TO \`_ee29d67e947fd80f68f80f3b1111ed7a7_v\`;`)
  await db.run(sql`CREATE INDEX \`_ee29d67e947fd80f68f80f3b1111ed7a7_v_order_idx\` ON \`_ee29d67e947fd80f68f80f3b1111ed7a7_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ee29d67e947fd80f68f80f3b1111ed7a7_v_parent_id_idx\` ON \`_ee29d67e947fd80f68f80f3b1111ed7a7_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ee29d67e947fd80f68f80f3b1111ed7a7_v_item_idx\` ON \`_ee29d67e947fd80f68f80f3b1111ed7a7_v\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__bills_of_materials_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_reference\` text NOT NULL,
  	\`version_finished_good_id\` text(36) NOT NULL,
  	\`version_version\` text NOT NULL,
  	\`version_effective_from\` text NOT NULL,
  	\`version_effective_to\` text,
  	\`version_produced_quantity\` numeric DEFAULT 1,
  	\`version_engineering_change_order\` text,
  	\`version_status\` text DEFAULT 'draft',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`bills_of_materials\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_finished_good_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__bills_of_materials_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_finished_good_id", "version_version", "version_effective_from", "version_effective_to", "version_produced_quantity", "version_engineering_change_order", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_finished_good_id", "version_version", "version_effective_from", "version_effective_to", "version_produced_quantity", "version_engineering_change_order", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_bills_of_materials_v\`;`)
  await db.run(sql`DROP TABLE \`_bills_of_materials_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__bills_of_materials_v\` RENAME TO \`_bills_of_materials_v\`;`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_parent_idx\` ON \`_bills_of_materials_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_version_version_uuid_idx\` ON \`_bills_of_materials_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_version_version_tenant_idx\` ON \`_bills_of_materials_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_version_version_reference_idx\` ON \`_bills_of_materials_v\` (\`version_reference\`);`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_version_version_finished_good_idx\` ON \`_bills_of_materials_v\` (\`version_finished_good_id\`);`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_version_version_created_by_idx\` ON \`_bills_of_materials_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_version_version_approved_by_idx\` ON \`_bills_of_materials_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_version_version_updated_at_idx\` ON \`_bills_of_materials_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_version_version_created_at_idx\` ON \`_bills_of_materials_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_created_at_idx\` ON \`_bills_of_materials_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_updated_at_idx\` ON \`_bills_of_materials_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_ebcc4e7fa5c5b870285d8619d67acbe3e\` (
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
  await db.run(sql`INSERT INTO \`__new_ebcc4e7fa5c5b870285d8619d67acbe3e\`("_order", "_parent_id", "id", "item_id", "description", "hs_code", "quantity", "unit_of_measure", "net_weight", "gross_weight", "declared_value", "preferential_origin", "tariff_preference_code") SELECT "_order", "_parent_id", "id", "item_id", "description", "hs_code", "quantity", "unit_of_measure", "net_weight", "gross_weight", "declared_value", "preferential_origin", "tariff_preference_code" FROM \`ebcc4e7fa5c5b870285d8619d67acbe3e\`;`)
  await db.run(sql`DROP TABLE \`ebcc4e7fa5c5b870285d8619d67acbe3e\`;`)
  await db.run(sql`ALTER TABLE \`__new_ebcc4e7fa5c5b870285d8619d67acbe3e\` RENAME TO \`ebcc4e7fa5c5b870285d8619d67acbe3e\`;`)
  await db.run(sql`CREATE INDEX \`ebcc4e7fa5c5b870285d8619d67acbe3e_order_idx\` ON \`ebcc4e7fa5c5b870285d8619d67acbe3e\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ebcc4e7fa5c5b870285d8619d67acbe3e_parent_id_idx\` ON \`ebcc4e7fa5c5b870285d8619d67acbe3e\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ebcc4e7fa5c5b870285d8619d67acbe3e_item_idx\` ON \`ebcc4e7fa5c5b870285d8619d67acbe3e\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__ebcc4e7fa5c5b870285d8619d67acbe3e_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
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
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_customs_declarations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__ebcc4e7fa5c5b870285d8619d67acbe3e_v\`("_order", "_parent_id", "id", "item_id", "description", "hs_code", "quantity", "unit_of_measure", "net_weight", "gross_weight", "declared_value", "preferential_origin", "tariff_preference_code", "_uuid") SELECT "_order", "_parent_id", "id", "item_id", "description", "hs_code", "quantity", "unit_of_measure", "net_weight", "gross_weight", "declared_value", "preferential_origin", "tariff_preference_code", "_uuid" FROM \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v\`;`)
  await db.run(sql`DROP TABLE \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__ebcc4e7fa5c5b870285d8619d67acbe3e_v\` RENAME TO \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v\`;`)
  await db.run(sql`CREATE INDEX \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v_order_idx\` ON \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v_parent_id_idx\` ON \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v_item_idx\` ON \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_eeacdeee24bab86b0a04db17f2c688224\` (
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
  await db.run(sql`INSERT INTO \`__new_eeacdeee24bab86b0a04db17f2c688224\`("_order", "_parent_id", "id", "item_id", "quantity_received", "quantity_damaged", "condition") SELECT "_order", "_parent_id", "id", "item_id", "quantity_received", "quantity_damaged", "condition" FROM \`eeacdeee24bab86b0a04db17f2c688224\`;`)
  await db.run(sql`DROP TABLE \`eeacdeee24bab86b0a04db17f2c688224\`;`)
  await db.run(sql`ALTER TABLE \`__new_eeacdeee24bab86b0a04db17f2c688224\` RENAME TO \`eeacdeee24bab86b0a04db17f2c688224\`;`)
  await db.run(sql`CREATE INDEX \`eeacdeee24bab86b0a04db17f2c688224_order_idx\` ON \`eeacdeee24bab86b0a04db17f2c688224\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eeacdeee24bab86b0a04db17f2c688224_parent_id_idx\` ON \`eeacdeee24bab86b0a04db17f2c688224\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`eeacdeee24bab86b0a04db17f2c688224_item_idx\` ON \`eeacdeee24bab86b0a04db17f2c688224\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__eeacdeee24bab86b0a04db17f2c688224_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity_received\` numeric NOT NULL,
  	\`quantity_damaged\` numeric DEFAULT 0,
  	\`condition\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_goods_receipts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__eeacdeee24bab86b0a04db17f2c688224_v\`("_order", "_parent_id", "id", "item_id", "quantity_received", "quantity_damaged", "condition", "_uuid") SELECT "_order", "_parent_id", "id", "item_id", "quantity_received", "quantity_damaged", "condition", "_uuid" FROM \`_eeacdeee24bab86b0a04db17f2c688224_v\`;`)
  await db.run(sql`DROP TABLE \`_eeacdeee24bab86b0a04db17f2c688224_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__eeacdeee24bab86b0a04db17f2c688224_v\` RENAME TO \`_eeacdeee24bab86b0a04db17f2c688224_v\`;`)
  await db.run(sql`CREATE INDEX \`_eeacdeee24bab86b0a04db17f2c688224_v_order_idx\` ON \`_eeacdeee24bab86b0a04db17f2c688224_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eeacdeee24bab86b0a04db17f2c688224_v_parent_id_idx\` ON \`_eeacdeee24bab86b0a04db17f2c688224_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_eeacdeee24bab86b0a04db17f2c688224_v_item_idx\` ON \`_eeacdeee24bab86b0a04db17f2c688224_v\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_inventory_movements\` (
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
  await db.run(sql`INSERT INTO \`__new_inventory_movements\`("id", "uuid", "tenant_id", "movement_id", "kind", "item_id", "lot_or_serial", "quantity", "unit_cost", "extended_cost", "valuation_method", "currency", "from_location_id", "to_location_id", "movement_at", "source_document_type", "source_document_id", "journal_entry_id", "status", "posted_at", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "movement_id", "kind", "item_id", "lot_or_serial", "quantity", "unit_cost", "extended_cost", "valuation_method", "currency", "from_location_id", "to_location_id", "movement_at", "source_document_type", "source_document_id", "journal_entry_id", "status", "posted_at", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`inventory_movements\`;`)
  await db.run(sql`DROP TABLE \`inventory_movements\`;`)
  await db.run(sql`ALTER TABLE \`__new_inventory_movements\` RENAME TO \`inventory_movements\`;`)
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
  await db.run(sql`CREATE TABLE \`__new__inventory_movements_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_movement_id\` text NOT NULL,
  	\`version_kind\` text NOT NULL,
  	\`version_item_id\` text(36) NOT NULL,
  	\`version_lot_or_serial\` text,
  	\`version_quantity\` numeric NOT NULL,
  	\`version_unit_cost\` numeric DEFAULT 0,
  	\`version_extended_cost\` numeric DEFAULT 0,
  	\`version_valuation_method\` text DEFAULT 'weighted_average' NOT NULL,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_from_location_id\` text(36),
  	\`version_to_location_id\` text(36),
  	\`version_movement_at\` text NOT NULL,
  	\`version_source_document_type\` text,
  	\`version_source_document_id\` text,
  	\`version_journal_entry_id\` text(36),
  	\`version_status\` text DEFAULT 'draft',
  	\`version_posted_at\` text,
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`inventory_movements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_from_location_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_to_location_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__inventory_movements_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_movement_id", "version_kind", "version_item_id", "version_lot_or_serial", "version_quantity", "version_unit_cost", "version_extended_cost", "version_valuation_method", "version_currency", "version_from_location_id", "version_to_location_id", "version_movement_at", "version_source_document_type", "version_source_document_id", "version_journal_entry_id", "version_status", "version_posted_at", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_movement_id", "version_kind", "version_item_id", "version_lot_or_serial", "version_quantity", "version_unit_cost", "version_extended_cost", "version_valuation_method", "version_currency", "version_from_location_id", "version_to_location_id", "version_movement_at", "version_source_document_type", "version_source_document_id", "version_journal_entry_id", "version_status", "version_posted_at", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_inventory_movements_v\`;`)
  await db.run(sql`DROP TABLE \`_inventory_movements_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__inventory_movements_v\` RENAME TO \`_inventory_movements_v\`;`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_parent_idx\` ON \`_inventory_movements_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_uuid_idx\` ON \`_inventory_movements_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_tenant_idx\` ON \`_inventory_movements_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_movement_id_idx\` ON \`_inventory_movements_v\` (\`version_movement_id\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_item_idx\` ON \`_inventory_movements_v\` (\`version_item_id\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_from_location_idx\` ON \`_inventory_movements_v\` (\`version_from_location_id\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_to_location_idx\` ON \`_inventory_movements_v\` (\`version_to_location_id\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_movement_at_idx\` ON \`_inventory_movements_v\` (\`version_movement_at\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_journal_entry_idx\` ON \`_inventory_movements_v\` (\`version_journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_created_by_idx\` ON \`_inventory_movements_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_approved_by_idx\` ON \`_inventory_movements_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_updated_at_idx\` ON \`_inventory_movements_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_version_version_created_at_idx\` ON \`_inventory_movements_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_created_at_idx\` ON \`_inventory_movements_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_updated_at_idx\` ON \`_inventory_movements_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_invoice_lines\` (
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
  	\`ledger_debit_account_id\` text,
  	\`ledger_credit_account_id\` text,
  	\`ledger_tax_debit_account_id\` text,
  	\`ledger_tax_credit_account_id\` text,
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
  await db.run(sql`INSERT INTO \`__new_invoice_lines\`("id", "uuid", "tenant_id", "invoice_id", "code", "description", "line_note", "object_identifier", "status", "items_buyer_item_id", "items_seller_item_id", "items_source_id", "items_destination_id", "quantity_quantity", "quantity_unit", "quantity_grams", "pricing_unit_price", "pricing_item_total", "pricing_exchange_rate", "discounting_discount_rate", "discounting_discount_total", "taxation_taxable", "taxation_vat_category_code", "taxation_tax_rate", "taxation_vat_exemption_reason_code", "taxation_vat_exemption_reason", "taxation_price_includes_tax", "taxation_net_total", "taxation_tax_total", "totals_total_amount", "totals_total_paid", "totals_total_due", "ledger_debit_account_id", "ledger_credit_account_id", "ledger_tax_debit_account_id", "ledger_tax_credit_account_id", "dates_contract_start", "dates_contract_end", "dates_period_start", "dates_period_end", "dates_delivered_at", "dates_returned_at", "details_currency_code", "details_sku", "details_hs_code", "details_serial_number", "details_lot", "details_variant", "details_variation", "details_option", "details_period", "details_gift_card", "metadata", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "invoice_id", "code", "description", "line_note", "object_identifier", "status", "items_buyer_item_id", "items_seller_item_id", "items_source_id", "items_destination_id", "quantity_quantity", "quantity_unit", "quantity_grams", "pricing_unit_price", "pricing_item_total", "pricing_exchange_rate", "discounting_discount_rate", "discounting_discount_total", "taxation_taxable", "taxation_vat_category_code", "taxation_tax_rate", "taxation_vat_exemption_reason_code", "taxation_vat_exemption_reason", "taxation_price_includes_tax", "taxation_net_total", "taxation_tax_total", "totals_total_amount", "totals_total_paid", "totals_total_due", "ledger_debit_account_id", "ledger_credit_account_id", "ledger_tax_debit_account_id", "ledger_tax_credit_account_id", "dates_contract_start", "dates_contract_end", "dates_period_start", "dates_period_end", "dates_delivered_at", "dates_returned_at", "details_currency_code", "details_sku", "details_hs_code", "details_serial_number", "details_lot", "details_variant", "details_variation", "details_option", "details_period", "details_gift_card", "metadata", "updated_at", "created_at" FROM \`invoice_lines\`;`)
  await db.run(sql`DROP TABLE \`invoice_lines\`;`)
  await db.run(sql`ALTER TABLE \`__new_invoice_lines\` RENAME TO \`invoice_lines\`;`)
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
  await db.run(sql`CREATE TABLE \`__new__invoice_lines_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_invoice_id\` text(36) NOT NULL,
  	\`version_code\` text,
  	\`version_description\` text NOT NULL,
  	\`version_line_note\` text,
  	\`version_object_identifier\` text,
  	\`version_status\` text,
  	\`version_items_buyer_item_id\` text(36),
  	\`version_items_seller_item_id\` text(36),
  	\`version_items_source_id\` text(36),
  	\`version_items_destination_id\` text(36),
  	\`version_quantity_quantity\` numeric DEFAULT 1 NOT NULL,
  	\`version_quantity_unit\` text,
  	\`version_quantity_grams\` numeric,
  	\`version_pricing_unit_price\` numeric DEFAULT 0 NOT NULL,
  	\`version_pricing_item_total\` numeric DEFAULT 0 NOT NULL,
  	\`version_pricing_exchange_rate\` numeric,
  	\`version_discounting_discount_rate\` numeric,
  	\`version_discounting_discount_total\` numeric DEFAULT 0,
  	\`version_taxation_taxable\` integer DEFAULT true,
  	\`version_taxation_vat_category_code\` text DEFAULT 'S' NOT NULL,
  	\`version_taxation_tax_rate\` numeric,
  	\`version_taxation_vat_exemption_reason_code\` text,
  	\`version_taxation_vat_exemption_reason\` text,
  	\`version_taxation_price_includes_tax\` integer DEFAULT false,
  	\`version_taxation_net_total\` numeric DEFAULT 0,
  	\`version_taxation_tax_total\` numeric DEFAULT 0,
  	\`version_totals_total_amount\` numeric DEFAULT 0 NOT NULL,
  	\`version_totals_total_paid\` numeric DEFAULT 0,
  	\`version_totals_total_due\` numeric DEFAULT 0,
  	\`version_ledger_debit_account_id\` text,
  	\`version_ledger_credit_account_id\` text,
  	\`version_ledger_tax_debit_account_id\` text,
  	\`version_ledger_tax_credit_account_id\` text,
  	\`version_dates_contract_start\` text,
  	\`version_dates_contract_end\` text,
  	\`version_dates_period_start\` text,
  	\`version_dates_period_end\` text,
  	\`version_dates_delivered_at\` text,
  	\`version_dates_returned_at\` text,
  	\`version_details_currency_code\` text,
  	\`version_details_sku\` text,
  	\`version_details_hs_code\` text,
  	\`version_details_serial_number\` text,
  	\`version_details_lot\` text,
  	\`version_details_variant\` text,
  	\`version_details_variation\` text,
  	\`version_details_option\` text,
  	\`version_details_period\` text,
  	\`version_details_gift_card\` integer DEFAULT false,
  	\`version_metadata\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`invoice_lines\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_items_buyer_item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_items_seller_item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_items_source_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_items_destination_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_ledger_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_ledger_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_ledger_tax_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_ledger_tax_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__invoice_lines_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_invoice_id", "version_code", "version_description", "version_line_note", "version_object_identifier", "version_status", "version_items_buyer_item_id", "version_items_seller_item_id", "version_items_source_id", "version_items_destination_id", "version_quantity_quantity", "version_quantity_unit", "version_quantity_grams", "version_pricing_unit_price", "version_pricing_item_total", "version_pricing_exchange_rate", "version_discounting_discount_rate", "version_discounting_discount_total", "version_taxation_taxable", "version_taxation_vat_category_code", "version_taxation_tax_rate", "version_taxation_vat_exemption_reason_code", "version_taxation_vat_exemption_reason", "version_taxation_price_includes_tax", "version_taxation_net_total", "version_taxation_tax_total", "version_totals_total_amount", "version_totals_total_paid", "version_totals_total_due", "version_ledger_debit_account_id", "version_ledger_credit_account_id", "version_ledger_tax_debit_account_id", "version_ledger_tax_credit_account_id", "version_dates_contract_start", "version_dates_contract_end", "version_dates_period_start", "version_dates_period_end", "version_dates_delivered_at", "version_dates_returned_at", "version_details_currency_code", "version_details_sku", "version_details_hs_code", "version_details_serial_number", "version_details_lot", "version_details_variant", "version_details_variation", "version_details_option", "version_details_period", "version_details_gift_card", "version_metadata", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_invoice_id", "version_code", "version_description", "version_line_note", "version_object_identifier", "version_status", "version_items_buyer_item_id", "version_items_seller_item_id", "version_items_source_id", "version_items_destination_id", "version_quantity_quantity", "version_quantity_unit", "version_quantity_grams", "version_pricing_unit_price", "version_pricing_item_total", "version_pricing_exchange_rate", "version_discounting_discount_rate", "version_discounting_discount_total", "version_taxation_taxable", "version_taxation_vat_category_code", "version_taxation_tax_rate", "version_taxation_vat_exemption_reason_code", "version_taxation_vat_exemption_reason", "version_taxation_price_includes_tax", "version_taxation_net_total", "version_taxation_tax_total", "version_totals_total_amount", "version_totals_total_paid", "version_totals_total_due", "version_ledger_debit_account_id", "version_ledger_credit_account_id", "version_ledger_tax_debit_account_id", "version_ledger_tax_credit_account_id", "version_dates_contract_start", "version_dates_contract_end", "version_dates_period_start", "version_dates_period_end", "version_dates_delivered_at", "version_dates_returned_at", "version_details_currency_code", "version_details_sku", "version_details_hs_code", "version_details_serial_number", "version_details_lot", "version_details_variant", "version_details_variation", "version_details_option", "version_details_period", "version_details_gift_card", "version_metadata", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_invoice_lines_v\`;`)
  await db.run(sql`DROP TABLE \`_invoice_lines_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__invoice_lines_v\` RENAME TO \`_invoice_lines_v\`;`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_parent_idx\` ON \`_invoice_lines_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_version_uuid_idx\` ON \`_invoice_lines_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_version_tenant_idx\` ON \`_invoice_lines_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_version_invoice_idx\` ON \`_invoice_lines_v\` (\`version_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_version_code_idx\` ON \`_invoice_lines_v\` (\`version_code\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_items_version_items_buyer_item_idx\` ON \`_invoice_lines_v\` (\`version_items_buyer_item_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_items_version_items_seller_item_idx\` ON \`_invoice_lines_v\` (\`version_items_seller_item_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_items_version_items_source_idx\` ON \`_invoice_lines_v\` (\`version_items_source_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_items_version_items_destination_idx\` ON \`_invoice_lines_v\` (\`version_items_destination_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_ledger_version_ledger_debit_acc_idx\` ON \`_invoice_lines_v\` (\`version_ledger_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_ledger_version_ledger_credit_ac_idx\` ON \`_invoice_lines_v\` (\`version_ledger_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_ledger_version_ledger_tax_debit_idx\` ON \`_invoice_lines_v\` (\`version_ledger_tax_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_ledger_version_ledger_tax_credi_idx\` ON \`_invoice_lines_v\` (\`version_ledger_tax_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_version_updated_at_idx\` ON \`_invoice_lines_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_version_version_created_at_idx\` ON \`_invoice_lines_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_created_at_idx\` ON \`_invoice_lines_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_updated_at_idx\` ON \`_invoice_lines_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_lot_variants\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`lot_id\` text(36) NOT NULL,
  	\`product_variant_id\` text(36),
  	\`work_phase_id\` text(36),
  	\`code\` text,
  	\`name\` text,
  	\`batch\` text,
  	\`sub_variant\` numeric,
  	\`units_ordered\` numeric,
  	\`units\` numeric,
  	\`units_produced\` numeric,
  	\`units_packed\` numeric,
  	\`units_shipped\` numeric,
  	\`units_delivered\` numeric,
  	\`minutes_ordered\` numeric,
  	\`minutes_produced\` numeric,
  	\`minutes_to_produce\` numeric,
  	\`net_weight\` numeric,
  	\`gross_weight\` numeric,
  	\`billable_weight\` numeric,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`lot_id\`) REFERENCES \`lots\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`product_variant_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`work_phase_id\`) REFERENCES \`lot_work_phases\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_lot_variants\`("id", "uuid", "tenant_id", "lot_id", "product_variant_id", "work_phase_id", "code", "name", "batch", "sub_variant", "units_ordered", "units", "units_produced", "units_packed", "units_shipped", "units_delivered", "minutes_ordered", "minutes_produced", "minutes_to_produce", "net_weight", "gross_weight", "billable_weight", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "lot_id", "product_variant_id", "work_phase_id", "code", "name", "batch", "sub_variant", "units_ordered", "units", "units_produced", "units_packed", "units_shipped", "units_delivered", "minutes_ordered", "minutes_produced", "minutes_to_produce", "net_weight", "gross_weight", "billable_weight", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`lot_variants\`;`)
  await db.run(sql`DROP TABLE \`lot_variants\`;`)
  await db.run(sql`ALTER TABLE \`__new_lot_variants\` RENAME TO \`lot_variants\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`lot_variants_uuid_idx\` ON \`lot_variants\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`lot_variants_tenant_idx\` ON \`lot_variants\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`lot_variants_lot_idx\` ON \`lot_variants\` (\`lot_id\`);`)
  await db.run(sql`CREATE INDEX \`lot_variants_product_variant_idx\` ON \`lot_variants\` (\`product_variant_id\`);`)
  await db.run(sql`CREATE INDEX \`lot_variants_work_phase_idx\` ON \`lot_variants\` (\`work_phase_id\`);`)
  await db.run(sql`CREATE INDEX \`lot_variants_code_idx\` ON \`lot_variants\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`lot_variants_created_by_idx\` ON \`lot_variants\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`lot_variants_approved_by_idx\` ON \`lot_variants\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`lot_variants_updated_at_idx\` ON \`lot_variants\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`lot_variants_created_at_idx\` ON \`lot_variants\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__lot_variants_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_lot_id\` text(36) NOT NULL,
  	\`version_product_variant_id\` text(36),
  	\`version_work_phase_id\` text(36),
  	\`version_code\` text,
  	\`version_name\` text,
  	\`version_batch\` text,
  	\`version_sub_variant\` numeric,
  	\`version_units_ordered\` numeric,
  	\`version_units\` numeric,
  	\`version_units_produced\` numeric,
  	\`version_units_packed\` numeric,
  	\`version_units_shipped\` numeric,
  	\`version_units_delivered\` numeric,
  	\`version_minutes_ordered\` numeric,
  	\`version_minutes_produced\` numeric,
  	\`version_minutes_to_produce\` numeric,
  	\`version_net_weight\` numeric,
  	\`version_gross_weight\` numeric,
  	\`version_billable_weight\` numeric,
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`lot_variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_lot_id\`) REFERENCES \`lots\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_product_variant_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_work_phase_id\`) REFERENCES \`lot_work_phases\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__lot_variants_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_lot_id", "version_product_variant_id", "version_work_phase_id", "version_code", "version_name", "version_batch", "version_sub_variant", "version_units_ordered", "version_units", "version_units_produced", "version_units_packed", "version_units_shipped", "version_units_delivered", "version_minutes_ordered", "version_minutes_produced", "version_minutes_to_produce", "version_net_weight", "version_gross_weight", "version_billable_weight", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_lot_id", "version_product_variant_id", "version_work_phase_id", "version_code", "version_name", "version_batch", "version_sub_variant", "version_units_ordered", "version_units", "version_units_produced", "version_units_packed", "version_units_shipped", "version_units_delivered", "version_minutes_ordered", "version_minutes_produced", "version_minutes_to_produce", "version_net_weight", "version_gross_weight", "version_billable_weight", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_lot_variants_v\`;`)
  await db.run(sql`DROP TABLE \`_lot_variants_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__lot_variants_v\` RENAME TO \`_lot_variants_v\`;`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_parent_idx\` ON \`_lot_variants_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_version_version_uuid_idx\` ON \`_lot_variants_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_version_version_tenant_idx\` ON \`_lot_variants_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_version_version_lot_idx\` ON \`_lot_variants_v\` (\`version_lot_id\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_version_version_product_variant_idx\` ON \`_lot_variants_v\` (\`version_product_variant_id\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_version_version_work_phase_idx\` ON \`_lot_variants_v\` (\`version_work_phase_id\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_version_version_code_idx\` ON \`_lot_variants_v\` (\`version_code\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_version_version_created_by_idx\` ON \`_lot_variants_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_version_version_approved_by_idx\` ON \`_lot_variants_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_version_version_updated_at_idx\` ON \`_lot_variants_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_version_version_created_at_idx\` ON \`_lot_variants_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_created_at_idx\` ON \`_lot_variants_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_updated_at_idx\` ON \`_lot_variants_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_lots\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`number\` text,
  	\`order_id\` text(36),
  	\`product_id\` text(36),
  	\`kind\` text,
  	\`status\` text DEFAULT 'opened',
  	\`confirmed_at\` text,
  	\`started_at\` text,
  	\`finished_at\` text,
  	\`closed_at\` text,
  	\`canceled_at\` text,
  	\`cancel_reason\` text,
  	\`date\` text,
  	\`delivery_date\` text,
  	\`shipped_at\` text,
  	\`delivered_at\` text,
  	\`units_ordered\` numeric,
  	\`units\` numeric,
  	\`units_produced\` numeric,
  	\`units_packed\` numeric,
  	\`units_shipped\` numeric,
  	\`units_delivered\` numeric,
  	\`units_invoiced\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`unit_price\` numeric,
  	\`unit_cost\` numeric,
  	\`amount_invoiced\` numeric,
  	\`amount_paid\` numeric,
  	\`minutes_ordered\` numeric,
  	\`minutes_produced\` numeric,
  	\`minutes_to_produce\` numeric,
  	\`net_weight\` numeric,
  	\`gross_weight\` numeric,
  	\`billable_weight\` numeric,
  	\`lot_variants_count\` numeric,
  	\`lot_work_phases_count\` numeric,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_lots\`("id", "uuid", "tenant_id", "number", "order_id", "product_id", "kind", "status", "confirmed_at", "started_at", "finished_at", "closed_at", "canceled_at", "cancel_reason", "date", "delivery_date", "shipped_at", "delivered_at", "units_ordered", "units", "units_produced", "units_packed", "units_shipped", "units_delivered", "units_invoiced", "currency", "unit_price", "unit_cost", "amount_invoiced", "amount_paid", "minutes_ordered", "minutes_produced", "minutes_to_produce", "net_weight", "gross_weight", "billable_weight", "lot_variants_count", "lot_work_phases_count", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "number", "order_id", "product_id", "kind", "status", "confirmed_at", "started_at", "finished_at", "closed_at", "canceled_at", "cancel_reason", "date", "delivery_date", "shipped_at", "delivered_at", "units_ordered", "units", "units_produced", "units_packed", "units_shipped", "units_delivered", "units_invoiced", "currency", "unit_price", "unit_cost", "amount_invoiced", "amount_paid", "minutes_ordered", "minutes_produced", "minutes_to_produce", "net_weight", "gross_weight", "billable_weight", "lot_variants_count", "lot_work_phases_count", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`lots\`;`)
  await db.run(sql`DROP TABLE \`lots\`;`)
  await db.run(sql`ALTER TABLE \`__new_lots\` RENAME TO \`lots\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`lots_uuid_idx\` ON \`lots\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`lots_tenant_idx\` ON \`lots\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`lots_number_idx\` ON \`lots\` (\`number\`);`)
  await db.run(sql`CREATE INDEX \`lots_order_idx\` ON \`lots\` (\`order_id\`);`)
  await db.run(sql`CREATE INDEX \`lots_product_idx\` ON \`lots\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX \`lots_kind_idx\` ON \`lots\` (\`kind\`);`)
  await db.run(sql`CREATE INDEX \`lots_status_idx\` ON \`lots\` (\`status\`);`)
  await db.run(sql`CREATE INDEX \`lots_created_by_idx\` ON \`lots\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`lots_approved_by_idx\` ON \`lots\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`lots_updated_at_idx\` ON \`lots\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`lots_created_at_idx\` ON \`lots\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__lots_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_number\` text,
  	\`version_order_id\` text(36),
  	\`version_product_id\` text(36),
  	\`version_kind\` text,
  	\`version_status\` text DEFAULT 'opened',
  	\`version_confirmed_at\` text,
  	\`version_started_at\` text,
  	\`version_finished_at\` text,
  	\`version_closed_at\` text,
  	\`version_canceled_at\` text,
  	\`version_cancel_reason\` text,
  	\`version_date\` text,
  	\`version_delivery_date\` text,
  	\`version_shipped_at\` text,
  	\`version_delivered_at\` text,
  	\`version_units_ordered\` numeric,
  	\`version_units\` numeric,
  	\`version_units_produced\` numeric,
  	\`version_units_packed\` numeric,
  	\`version_units_shipped\` numeric,
  	\`version_units_delivered\` numeric,
  	\`version_units_invoiced\` numeric,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_unit_price\` numeric,
  	\`version_unit_cost\` numeric,
  	\`version_amount_invoiced\` numeric,
  	\`version_amount_paid\` numeric,
  	\`version_minutes_ordered\` numeric,
  	\`version_minutes_produced\` numeric,
  	\`version_minutes_to_produce\` numeric,
  	\`version_net_weight\` numeric,
  	\`version_gross_weight\` numeric,
  	\`version_billable_weight\` numeric,
  	\`version_lot_variants_count\` numeric,
  	\`version_lot_work_phases_count\` numeric,
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`lots\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_product_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__lots_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_number", "version_order_id", "version_product_id", "version_kind", "version_status", "version_confirmed_at", "version_started_at", "version_finished_at", "version_closed_at", "version_canceled_at", "version_cancel_reason", "version_date", "version_delivery_date", "version_shipped_at", "version_delivered_at", "version_units_ordered", "version_units", "version_units_produced", "version_units_packed", "version_units_shipped", "version_units_delivered", "version_units_invoiced", "version_currency", "version_unit_price", "version_unit_cost", "version_amount_invoiced", "version_amount_paid", "version_minutes_ordered", "version_minutes_produced", "version_minutes_to_produce", "version_net_weight", "version_gross_weight", "version_billable_weight", "version_lot_variants_count", "version_lot_work_phases_count", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_number", "version_order_id", "version_product_id", "version_kind", "version_status", "version_confirmed_at", "version_started_at", "version_finished_at", "version_closed_at", "version_canceled_at", "version_cancel_reason", "version_date", "version_delivery_date", "version_shipped_at", "version_delivered_at", "version_units_ordered", "version_units", "version_units_produced", "version_units_packed", "version_units_shipped", "version_units_delivered", "version_units_invoiced", "version_currency", "version_unit_price", "version_unit_cost", "version_amount_invoiced", "version_amount_paid", "version_minutes_ordered", "version_minutes_produced", "version_minutes_to_produce", "version_net_weight", "version_gross_weight", "version_billable_weight", "version_lot_variants_count", "version_lot_work_phases_count", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_lots_v\`;`)
  await db.run(sql`DROP TABLE \`_lots_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__lots_v\` RENAME TO \`_lots_v\`;`)
  await db.run(sql`CREATE INDEX \`_lots_v_parent_idx\` ON \`_lots_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_version_version_uuid_idx\` ON \`_lots_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_version_version_tenant_idx\` ON \`_lots_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_version_version_number_idx\` ON \`_lots_v\` (\`version_number\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_version_version_order_idx\` ON \`_lots_v\` (\`version_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_version_version_product_idx\` ON \`_lots_v\` (\`version_product_id\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_version_version_kind_idx\` ON \`_lots_v\` (\`version_kind\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_version_version_status_idx\` ON \`_lots_v\` (\`version_status\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_version_version_created_by_idx\` ON \`_lots_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_version_version_approved_by_idx\` ON \`_lots_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_version_version_updated_at_idx\` ON \`_lots_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_version_version_created_at_idx\` ON \`_lots_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_created_at_idx\` ON \`_lots_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_updated_at_idx\` ON \`_lots_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_e748d22a668778d2291b0c286f5fb0b16\` (
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
  await db.run(sql`INSERT INTO \`__new_e748d22a668778d2291b0c286f5fb0b16\`("_order", "_parent_id", "id", "item_id", "batch_id", "quantity", "unit_of_measure") SELECT "_order", "_parent_id", "id", "item_id", "batch_id", "quantity", "unit_of_measure" FROM \`e748d22a668778d2291b0c286f5fb0b16\`;`)
  await db.run(sql`DROP TABLE \`e748d22a668778d2291b0c286f5fb0b16\`;`)
  await db.run(sql`ALTER TABLE \`__new_e748d22a668778d2291b0c286f5fb0b16\` RENAME TO \`e748d22a668778d2291b0c286f5fb0b16\`;`)
  await db.run(sql`CREATE INDEX \`e748d22a668778d2291b0c286f5fb0b16_order_idx\` ON \`e748d22a668778d2291b0c286f5fb0b16\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e748d22a668778d2291b0c286f5fb0b16_parent_id_idx\` ON \`e748d22a668778d2291b0c286f5fb0b16\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e748d22a668778d2291b0c286f5fb0b16_item_idx\` ON \`e748d22a668778d2291b0c286f5fb0b16\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`e748d22a668778d2291b0c286f5fb0b16_batch_idx\` ON \`e748d22a668778d2291b0c286f5fb0b16\` (\`batch_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__e748d22a668778d2291b0c286f5fb0b16_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36) NOT NULL,
  	\`batch_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`batch_id\`) REFERENCES \`batches\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_packages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__e748d22a668778d2291b0c286f5fb0b16_v\`("_order", "_parent_id", "id", "item_id", "batch_id", "quantity", "unit_of_measure", "_uuid") SELECT "_order", "_parent_id", "id", "item_id", "batch_id", "quantity", "unit_of_measure", "_uuid" FROM \`_e748d22a668778d2291b0c286f5fb0b16_v\`;`)
  await db.run(sql`DROP TABLE \`_e748d22a668778d2291b0c286f5fb0b16_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__e748d22a668778d2291b0c286f5fb0b16_v\` RENAME TO \`_e748d22a668778d2291b0c286f5fb0b16_v\`;`)
  await db.run(sql`CREATE INDEX \`_e748d22a668778d2291b0c286f5fb0b16_v_order_idx\` ON \`_e748d22a668778d2291b0c286f5fb0b16_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e748d22a668778d2291b0c286f5fb0b16_v_parent_id_idx\` ON \`_e748d22a668778d2291b0c286f5fb0b16_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e748d22a668778d2291b0c286f5fb0b16_v_item_idx\` ON \`_e748d22a668778d2291b0c286f5fb0b16_v\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`_e748d22a668778d2291b0c286f5fb0b16_v_batch_idx\` ON \`_e748d22a668778d2291b0c286f5fb0b16_v\` (\`batch_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_production_receipts\` (
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
  await db.run(sql`INSERT INTO \`__new_production_receipts\`("id", "uuid", "tenant_id", "reference", "work_order_id", "finished_good_id", "received_quantity", "target_warehouse_id", "lot_number", "serial_numbers", "receipt_date", "currency", "cost_material_cost", "cost_labour_cost", "cost_overhead_cost", "cost_absorbed_cost", "cost_unit_cost", "inventory_movement_id", "journal_entry_id", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "reference", "work_order_id", "finished_good_id", "received_quantity", "target_warehouse_id", "lot_number", "serial_numbers", "receipt_date", "currency", "cost_material_cost", "cost_labour_cost", "cost_overhead_cost", "cost_absorbed_cost", "cost_unit_cost", "inventory_movement_id", "journal_entry_id", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`production_receipts\`;`)
  await db.run(sql`DROP TABLE \`production_receipts\`;`)
  await db.run(sql`ALTER TABLE \`__new_production_receipts\` RENAME TO \`production_receipts\`;`)
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
  await db.run(sql`CREATE TABLE \`__new__production_receipts_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_reference\` text NOT NULL,
  	\`version_work_order_id\` text(36) NOT NULL,
  	\`version_finished_good_id\` text(36) NOT NULL,
  	\`version_received_quantity\` numeric NOT NULL,
  	\`version_target_warehouse_id\` text(36) NOT NULL,
  	\`version_lot_number\` text,
  	\`version_serial_numbers\` text,
  	\`version_receipt_date\` text NOT NULL,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_cost_material_cost\` numeric DEFAULT 0,
  	\`version_cost_labour_cost\` numeric DEFAULT 0,
  	\`version_cost_overhead_cost\` numeric DEFAULT 0,
  	\`version_cost_absorbed_cost\` numeric DEFAULT 0,
  	\`version_cost_unit_cost\` numeric DEFAULT 0,
  	\`version_inventory_movement_id\` text(36),
  	\`version_journal_entry_id\` text(36),
  	\`version_status\` text DEFAULT 'draft',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`production_receipts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_work_order_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_finished_good_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_target_warehouse_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_inventory_movement_id\`) REFERENCES \`inventory_movements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__production_receipts_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_work_order_id", "version_finished_good_id", "version_received_quantity", "version_target_warehouse_id", "version_lot_number", "version_serial_numbers", "version_receipt_date", "version_currency", "version_cost_material_cost", "version_cost_labour_cost", "version_cost_overhead_cost", "version_cost_absorbed_cost", "version_cost_unit_cost", "version_inventory_movement_id", "version_journal_entry_id", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_work_order_id", "version_finished_good_id", "version_received_quantity", "version_target_warehouse_id", "version_lot_number", "version_serial_numbers", "version_receipt_date", "version_currency", "version_cost_material_cost", "version_cost_labour_cost", "version_cost_overhead_cost", "version_cost_absorbed_cost", "version_cost_unit_cost", "version_inventory_movement_id", "version_journal_entry_id", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_production_receipts_v\`;`)
  await db.run(sql`DROP TABLE \`_production_receipts_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__production_receipts_v\` RENAME TO \`_production_receipts_v\`;`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_parent_idx\` ON \`_production_receipts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_uuid_idx\` ON \`_production_receipts_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_tenant_idx\` ON \`_production_receipts_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_reference_idx\` ON \`_production_receipts_v\` (\`version_reference\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_work_order_idx\` ON \`_production_receipts_v\` (\`version_work_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_finished_good_idx\` ON \`_production_receipts_v\` (\`version_finished_good_id\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_target_warehouse_idx\` ON \`_production_receipts_v\` (\`version_target_warehouse_id\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_receipt_date_idx\` ON \`_production_receipts_v\` (\`version_receipt_date\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_inventory_movemen_idx\` ON \`_production_receipts_v\` (\`version_inventory_movement_id\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_journal_entry_idx\` ON \`_production_receipts_v\` (\`version_journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_created_by_idx\` ON \`_production_receipts_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_approved_by_idx\` ON \`_production_receipts_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_updated_at_idx\` ON \`_production_receipts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_version_version_created_at_idx\` ON \`_production_receipts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_created_at_idx\` ON \`_production_receipts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_updated_at_idx\` ON \`_production_receipts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_eced028e288018042b97287d40f1c01dd\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`line_number\` numeric DEFAULT 1,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`unit_price\` numeric NOT NULL,
  	\`line_total\` numeric DEFAULT 0,
  	\`gl_account_id\` text,
  	\`quantity_received\` numeric DEFAULT 0,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`purchase_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_eced028e288018042b97287d40f1c01dd\`("_order", "_parent_id", "id", "line_number", "item_id", "quantity", "unit_price", "line_total", "gl_account_id", "quantity_received") SELECT "_order", "_parent_id", "id", "line_number", "item_id", "quantity", "unit_price", "line_total", "gl_account_id", "quantity_received" FROM \`eced028e288018042b97287d40f1c01dd\`;`)
  await db.run(sql`DROP TABLE \`eced028e288018042b97287d40f1c01dd\`;`)
  await db.run(sql`ALTER TABLE \`__new_eced028e288018042b97287d40f1c01dd\` RENAME TO \`eced028e288018042b97287d40f1c01dd\`;`)
  await db.run(sql`CREATE INDEX \`eced028e288018042b97287d40f1c01dd_order_idx\` ON \`eced028e288018042b97287d40f1c01dd\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eced028e288018042b97287d40f1c01dd_parent_id_idx\` ON \`eced028e288018042b97287d40f1c01dd\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`eced028e288018042b97287d40f1c01dd_item_idx\` ON \`eced028e288018042b97287d40f1c01dd\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`eced028e288018042b97287d40f1c01dd_gl_account_idx\` ON \`eced028e288018042b97287d40f1c01dd\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__eced028e288018042b97287d40f1c01dd_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`line_number\` numeric DEFAULT 1,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`unit_price\` numeric NOT NULL,
  	\`line_total\` numeric DEFAULT 0,
  	\`gl_account_id\` text,
  	\`quantity_received\` numeric DEFAULT 0,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_purchase_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__eced028e288018042b97287d40f1c01dd_v\`("_order", "_parent_id", "id", "line_number", "item_id", "quantity", "unit_price", "line_total", "gl_account_id", "quantity_received", "_uuid") SELECT "_order", "_parent_id", "id", "line_number", "item_id", "quantity", "unit_price", "line_total", "gl_account_id", "quantity_received", "_uuid" FROM \`_eced028e288018042b97287d40f1c01dd_v\`;`)
  await db.run(sql`DROP TABLE \`_eced028e288018042b97287d40f1c01dd_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__eced028e288018042b97287d40f1c01dd_v\` RENAME TO \`_eced028e288018042b97287d40f1c01dd_v\`;`)
  await db.run(sql`CREATE INDEX \`_eced028e288018042b97287d40f1c01dd_v_order_idx\` ON \`_eced028e288018042b97287d40f1c01dd_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eced028e288018042b97287d40f1c01dd_v_parent_id_idx\` ON \`_eced028e288018042b97287d40f1c01dd_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_eced028e288018042b97287d40f1c01dd_v_item_idx\` ON \`_eced028e288018042b97287d40f1c01dd_v\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`_eced028e288018042b97287d40f1c01dd_v_gl_account_idx\` ON \`_eced028e288018042b97287d40f1c01dd_v\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_pr_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`uom\` text DEFAULT 'EA',
  	\`estimated_unit_price\` numeric NOT NULL,
  	\`estimated_amount\` numeric NOT NULL,
  	\`gl_account_id\` text,
  	\`preferred_vendor_id\` text(36),
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`preferred_vendor_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`purchase_requisitions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pr_lines\`("_order", "_parent_id", "id", "item_id", "quantity", "uom", "estimated_unit_price", "estimated_amount", "gl_account_id", "preferred_vendor_id") SELECT "_order", "_parent_id", "id", "item_id", "quantity", "uom", "estimated_unit_price", "estimated_amount", "gl_account_id", "preferred_vendor_id" FROM \`pr_lines\`;`)
  await db.run(sql`DROP TABLE \`pr_lines\`;`)
  await db.run(sql`ALTER TABLE \`__new_pr_lines\` RENAME TO \`pr_lines\`;`)
  await db.run(sql`CREATE INDEX \`pr_lines_order_idx\` ON \`pr_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pr_lines_parent_id_idx\` ON \`pr_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pr_lines_item_idx\` ON \`pr_lines\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`pr_lines_gl_account_idx\` ON \`pr_lines\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE INDEX \`pr_lines_preferred_vendor_idx\` ON \`pr_lines\` (\`preferred_vendor_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__pr_lines_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`uom\` text DEFAULT 'EA',
  	\`estimated_unit_price\` numeric NOT NULL,
  	\`estimated_amount\` numeric NOT NULL,
  	\`gl_account_id\` text,
  	\`preferred_vendor_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`preferred_vendor_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_purchase_requisitions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pr_lines_v\`("_order", "_parent_id", "id", "item_id", "quantity", "uom", "estimated_unit_price", "estimated_amount", "gl_account_id", "preferred_vendor_id", "_uuid") SELECT "_order", "_parent_id", "id", "item_id", "quantity", "uom", "estimated_unit_price", "estimated_amount", "gl_account_id", "preferred_vendor_id", "_uuid" FROM \`_pr_lines_v\`;`)
  await db.run(sql`DROP TABLE \`_pr_lines_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__pr_lines_v\` RENAME TO \`_pr_lines_v\`;`)
  await db.run(sql`CREATE INDEX \`_pr_lines_v_order_idx\` ON \`_pr_lines_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pr_lines_v_parent_id_idx\` ON \`_pr_lines_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pr_lines_v_item_idx\` ON \`_pr_lines_v\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`_pr_lines_v_gl_account_idx\` ON \`_pr_lines_v\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_pr_lines_v_preferred_vendor_idx\` ON \`_pr_lines_v\` (\`preferred_vendor_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_quality_inspections\` (
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
  await db.run(sql`INSERT INTO \`__new_quality_inspections\`("id", "uuid", "tenant_id", "reference", "inspection_type", "item_id", "inspected_quantity", "sample_size", "failed_quantity", "work_order_id", "goods_receipt_id", "shipment_id", "inspection_date", "inspector_id", "outcome", "failure_reason", "capa_reference", "inventory_movement_id", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "reference", "inspection_type", "item_id", "inspected_quantity", "sample_size", "failed_quantity", "work_order_id", "goods_receipt_id", "shipment_id", "inspection_date", "inspector_id", "outcome", "failure_reason", "capa_reference", "inventory_movement_id", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`quality_inspections\`;`)
  await db.run(sql`DROP TABLE \`quality_inspections\`;`)
  await db.run(sql`ALTER TABLE \`__new_quality_inspections\` RENAME TO \`quality_inspections\`;`)
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
  await db.run(sql`CREATE TABLE \`__new__quality_inspections_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_reference\` text NOT NULL,
  	\`version_inspection_type\` text NOT NULL,
  	\`version_item_id\` text(36) NOT NULL,
  	\`version_inspected_quantity\` numeric NOT NULL,
  	\`version_sample_size\` numeric,
  	\`version_failed_quantity\` numeric DEFAULT 0,
  	\`version_work_order_id\` text(36),
  	\`version_goods_receipt_id\` text(36),
  	\`version_shipment_id\` text(36),
  	\`version_inspection_date\` text NOT NULL,
  	\`version_inspector_id\` text(36),
  	\`version_outcome\` text DEFAULT 'pending' NOT NULL,
  	\`version_failure_reason\` text,
  	\`version_capa_reference\` text,
  	\`version_inventory_movement_id\` text(36),
  	\`version_status\` text DEFAULT 'draft',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`quality_inspections\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_work_order_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_goods_receipt_id\`) REFERENCES \`goods_receipts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_shipment_id\`) REFERENCES \`shipments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_inspector_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_inventory_movement_id\`) REFERENCES \`inventory_movements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__quality_inspections_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_inspection_type", "version_item_id", "version_inspected_quantity", "version_sample_size", "version_failed_quantity", "version_work_order_id", "version_goods_receipt_id", "version_shipment_id", "version_inspection_date", "version_inspector_id", "version_outcome", "version_failure_reason", "version_capa_reference", "version_inventory_movement_id", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_inspection_type", "version_item_id", "version_inspected_quantity", "version_sample_size", "version_failed_quantity", "version_work_order_id", "version_goods_receipt_id", "version_shipment_id", "version_inspection_date", "version_inspector_id", "version_outcome", "version_failure_reason", "version_capa_reference", "version_inventory_movement_id", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_quality_inspections_v\`;`)
  await db.run(sql`DROP TABLE \`_quality_inspections_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__quality_inspections_v\` RENAME TO \`_quality_inspections_v\`;`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_parent_idx\` ON \`_quality_inspections_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_uuid_idx\` ON \`_quality_inspections_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_tenant_idx\` ON \`_quality_inspections_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_reference_idx\` ON \`_quality_inspections_v\` (\`version_reference\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_item_idx\` ON \`_quality_inspections_v\` (\`version_item_id\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_work_order_idx\` ON \`_quality_inspections_v\` (\`version_work_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_goods_receipt_idx\` ON \`_quality_inspections_v\` (\`version_goods_receipt_id\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_shipment_idx\` ON \`_quality_inspections_v\` (\`version_shipment_id\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_inspection_date_idx\` ON \`_quality_inspections_v\` (\`version_inspection_date\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_inspector_idx\` ON \`_quality_inspections_v\` (\`version_inspector_id\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_inventory_movemen_idx\` ON \`_quality_inspections_v\` (\`version_inventory_movement_id\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_created_by_idx\` ON \`_quality_inspections_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_approved_by_idx\` ON \`_quality_inspections_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_updated_at_idx\` ON \`_quality_inspections_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_version_version_created_at_idx\` ON \`_quality_inspections_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_created_at_idx\` ON \`_quality_inspections_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_updated_at_idx\` ON \`_quality_inspections_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_e70806190d4048502b85ef401011f5819\` (
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
  await db.run(sql`INSERT INTO \`__new_e70806190d4048502b85ef401011f5819\`("_order", "_parent_id", "id", "item_id", "quantity_returned", "restock") SELECT "_order", "_parent_id", "id", "item_id", "quantity_returned", "restock" FROM \`e70806190d4048502b85ef401011f5819\`;`)
  await db.run(sql`DROP TABLE \`e70806190d4048502b85ef401011f5819\`;`)
  await db.run(sql`ALTER TABLE \`__new_e70806190d4048502b85ef401011f5819\` RENAME TO \`e70806190d4048502b85ef401011f5819\`;`)
  await db.run(sql`CREATE INDEX \`e70806190d4048502b85ef401011f5819_order_idx\` ON \`e70806190d4048502b85ef401011f5819\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e70806190d4048502b85ef401011f5819_parent_id_idx\` ON \`e70806190d4048502b85ef401011f5819\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e70806190d4048502b85ef401011f5819_item_idx\` ON \`e70806190d4048502b85ef401011f5819\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__e70806190d4048502b85ef401011f5819_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity_returned\` numeric NOT NULL,
  	\`restock\` integer DEFAULT true,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_returns_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__e70806190d4048502b85ef401011f5819_v\`("_order", "_parent_id", "id", "item_id", "quantity_returned", "restock", "_uuid") SELECT "_order", "_parent_id", "id", "item_id", "quantity_returned", "restock", "_uuid" FROM \`_e70806190d4048502b85ef401011f5819_v\`;`)
  await db.run(sql`DROP TABLE \`_e70806190d4048502b85ef401011f5819_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__e70806190d4048502b85ef401011f5819_v\` RENAME TO \`_e70806190d4048502b85ef401011f5819_v\`;`)
  await db.run(sql`CREATE INDEX \`_e70806190d4048502b85ef401011f5819_v_order_idx\` ON \`_e70806190d4048502b85ef401011f5819_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e70806190d4048502b85ef401011f5819_v_parent_id_idx\` ON \`_e70806190d4048502b85ef401011f5819_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e70806190d4048502b85ef401011f5819_v_item_idx\` ON \`_e70806190d4048502b85ef401011f5819_v\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_e934f7628401582b094b784c3c47361f6\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`shipments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_e934f7628401582b094b784c3c47361f6\`("_order", "_parent_id", "id", "item_id", "quantity") SELECT "_order", "_parent_id", "id", "item_id", "quantity" FROM \`e934f7628401582b094b784c3c47361f6\`;`)
  await db.run(sql`DROP TABLE \`e934f7628401582b094b784c3c47361f6\`;`)
  await db.run(sql`ALTER TABLE \`__new_e934f7628401582b094b784c3c47361f6\` RENAME TO \`e934f7628401582b094b784c3c47361f6\`;`)
  await db.run(sql`CREATE INDEX \`e934f7628401582b094b784c3c47361f6_order_idx\` ON \`e934f7628401582b094b784c3c47361f6\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e934f7628401582b094b784c3c47361f6_parent_id_idx\` ON \`e934f7628401582b094b784c3c47361f6\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e934f7628401582b094b784c3c47361f6_item_idx\` ON \`e934f7628401582b094b784c3c47361f6\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__e934f7628401582b094b784c3c47361f6_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_shipments_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__e934f7628401582b094b784c3c47361f6_v\`("_order", "_parent_id", "id", "item_id", "quantity", "_uuid") SELECT "_order", "_parent_id", "id", "item_id", "quantity", "_uuid" FROM \`_e934f7628401582b094b784c3c47361f6_v\`;`)
  await db.run(sql`DROP TABLE \`_e934f7628401582b094b784c3c47361f6_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__e934f7628401582b094b784c3c47361f6_v\` RENAME TO \`_e934f7628401582b094b784c3c47361f6_v\`;`)
  await db.run(sql`CREATE INDEX \`_e934f7628401582b094b784c3c47361f6_v_order_idx\` ON \`_e934f7628401582b094b784c3c47361f6_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e934f7628401582b094b784c3c47361f6_v_parent_id_idx\` ON \`_e934f7628401582b094b784c3c47361f6_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e934f7628401582b094b784c3c47361f6_v_item_idx\` ON \`_e934f7628401582b094b784c3c47361f6_v\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_vq_lines\` (
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
  await db.run(sql`INSERT INTO \`__new_vq_lines\`("_order", "_parent_id", "id", "item_id", "quantity", "uom", "unit_price", "line_total", "lead_time_days") SELECT "_order", "_parent_id", "id", "item_id", "quantity", "uom", "unit_price", "line_total", "lead_time_days" FROM \`vq_lines\`;`)
  await db.run(sql`DROP TABLE \`vq_lines\`;`)
  await db.run(sql`ALTER TABLE \`__new_vq_lines\` RENAME TO \`vq_lines\`;`)
  await db.run(sql`CREATE INDEX \`vq_lines_order_idx\` ON \`vq_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`vq_lines_parent_id_idx\` ON \`vq_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`vq_lines_item_idx\` ON \`vq_lines\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__vq_lines_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`uom\` text DEFAULT 'EA',
  	\`unit_price\` numeric NOT NULL,
  	\`line_total\` numeric NOT NULL,
  	\`lead_time_days\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_vendor_quotes_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__vq_lines_v\`("_order", "_parent_id", "id", "item_id", "quantity", "uom", "unit_price", "line_total", "lead_time_days", "_uuid") SELECT "_order", "_parent_id", "id", "item_id", "quantity", "uom", "unit_price", "line_total", "lead_time_days", "_uuid" FROM \`_vq_lines_v\`;`)
  await db.run(sql`DROP TABLE \`_vq_lines_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__vq_lines_v\` RENAME TO \`_vq_lines_v\`;`)
  await db.run(sql`CREATE INDEX \`_vq_lines_v_order_idx\` ON \`_vq_lines_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_vq_lines_v_parent_id_idx\` ON \`_vq_lines_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_vq_lines_v_item_idx\` ON \`_vq_lines_v\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_products\` (
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
  await db.run(sql`INSERT INTO \`__new_products\`("id", "uuid", "tenant_id", "title", "description", "inventory", "enable_variants", "price_in_e_u_r_enabled", "price_in_e_u_r", "generate_slug", "slug", "updated_at", "created_at", "deleted_at", "_status") SELECT "id", "uuid", "tenant_id", "title", "description", "inventory", "enable_variants", "price_in_e_u_r_enabled", "price_in_e_u_r", "generate_slug", "slug", "updated_at", "created_at", "deleted_at", "_status" FROM \`products\`;`)
  await db.run(sql`DROP TABLE \`products\`;`)
  await db.run(sql`ALTER TABLE \`__new_products\` RENAME TO \`products\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`products_uuid_idx\` ON \`products\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`products_tenant_idx\` ON \`products\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`products_slug_idx\` ON \`products\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`products_updated_at_idx\` ON \`products\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`products_created_at_idx\` ON \`products\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`products_deleted_at_idx\` ON \`products\` (\`deleted_at\`);`)
  await db.run(sql`CREATE INDEX \`products__status_idx\` ON \`products\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`__new__products_v\` (
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
  await db.run(sql`INSERT INTO \`__new__products_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_title", "version_description", "version_inventory", "version_enable_variants", "version_price_in_e_u_r_enabled", "version_price_in_e_u_r", "version_generate_slug", "version_slug", "version_updated_at", "version_created_at", "version_deleted_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_title", "version_description", "version_inventory", "version_enable_variants", "version_price_in_e_u_r_enabled", "version_price_in_e_u_r", "version_generate_slug", "version_slug", "version_updated_at", "version_created_at", "version_deleted_at", "version__status", "created_at", "updated_at", "snapshot", "published_locale", "latest", "autosave" FROM \`_products_v\`;`)
  await db.run(sql`DROP TABLE \`_products_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__products_v\` RENAME TO \`_products_v\`;`)
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
  await db.run(sql`CREATE TABLE \`__new_e801d0467ac3d8adb9473d14e41225f76\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_e801d0467ac3d8adb9473d14e41225f76\`("_order", "_parent_id", "id", "line_number", "item_id", "quantity", "unit_of_measure", "unit_price", "line_net", "tax_category_id", "discount", "requested_delivery_date") SELECT "_order", "_parent_id", "id", "line_number", "item_id", "quantity", "unit_of_measure", "unit_price", "line_net", "tax_category_id", "discount", "requested_delivery_date" FROM \`e801d0467ac3d8adb9473d14e41225f76\`;`)
  await db.run(sql`DROP TABLE \`e801d0467ac3d8adb9473d14e41225f76\`;`)
  await db.run(sql`ALTER TABLE \`__new_e801d0467ac3d8adb9473d14e41225f76\` RENAME TO \`e801d0467ac3d8adb9473d14e41225f76\`;`)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_order_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_parent_id_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_item_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_tax_category_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`tax_category_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__e801d0467ac3d8adb9473d14e41225f76_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`line_number\` numeric NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`unit_price\` numeric NOT NULL,
  	\`line_net\` numeric DEFAULT 0,
  	\`tax_category_id\` text(36),
  	\`discount\` numeric DEFAULT 0,
  	\`requested_delivery_date\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tax_category_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__e801d0467ac3d8adb9473d14e41225f76_v\`("_order", "_parent_id", "id", "line_number", "item_id", "quantity", "unit_of_measure", "unit_price", "line_net", "tax_category_id", "discount", "requested_delivery_date", "_uuid") SELECT "_order", "_parent_id", "id", "line_number", "item_id", "quantity", "unit_of_measure", "unit_price", "line_net", "tax_category_id", "discount", "requested_delivery_date", "_uuid" FROM \`_e801d0467ac3d8adb9473d14e41225f76_v\`;`)
  await db.run(sql`DROP TABLE \`_e801d0467ac3d8adb9473d14e41225f76_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__e801d0467ac3d8adb9473d14e41225f76_v\` RENAME TO \`_e801d0467ac3d8adb9473d14e41225f76_v\`;`)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_order_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_parent_id_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_item_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_tax_category_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`tax_category_id\`);`)
  await db.run(sql`DROP INDEX \`variants_sku_idx\`;`)
  await db.run(sql`DROP INDEX \`variants_barcode_idx\`;`)
  await db.run(sql`ALTER TABLE \`variants\` DROP COLUMN \`sku\`;`)
  await db.run(sql`ALTER TABLE \`variants\` DROP COLUMN \`barcode\`;`)
  await db.run(sql`DROP INDEX \`_variants_v_version_version_sku_idx\`;`)
  await db.run(sql`DROP INDEX \`_variants_v_version_version_barcode_idx\`;`)
  await db.run(sql`ALTER TABLE \`_variants_v\` DROP COLUMN \`version_sku\`;`)
  await db.run(sql`ALTER TABLE \`_variants_v\` DROP COLUMN \`version_barcode\`;`)
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
}
