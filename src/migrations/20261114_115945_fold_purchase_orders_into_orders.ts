import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`eced028e288018042b97287d40f1c01dd\`;`)
  await db.run(sql`DROP TABLE \`eced028e288018042b97287d40f1c01dd_locales\`;`)
  await db.run(sql`DROP TABLE \`purchase_orders\`;`)
  await db.run(sql`DROP TABLE \`_eced028e288018042b97287d40f1c01dd_v\`;`)
  await db.run(sql`DROP TABLE \`_eced028e288018042b97287d40f1c01dd_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_purchase_orders_v\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_goods_receipts\` (
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
  	FOREIGN KEY (\`purchase_order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`inspected_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_goods_receipts\`("id", "uuid", "tenant_id", "receipt_number", "purchase_order_id", "received_date", "status", "inspected_at", "inspected_by_id", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "receipt_number", "purchase_order_id", "received_date", "status", "inspected_at", "inspected_by_id", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`goods_receipts\`;`)
  await db.run(sql`DROP TABLE \`goods_receipts\`;`)
  await db.run(sql`ALTER TABLE \`__new_goods_receipts\` RENAME TO \`goods_receipts\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`goods_receipts_uuid_idx\` ON \`goods_receipts\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_tenant_idx\` ON \`goods_receipts\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`goods_receipts_receipt_number_idx\` ON \`goods_receipts\` (\`receipt_number\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_purchase_order_idx\` ON \`goods_receipts\` (\`purchase_order_id\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_inspected_by_idx\` ON \`goods_receipts\` (\`inspected_by_id\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_created_by_idx\` ON \`goods_receipts\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_approved_by_idx\` ON \`goods_receipts\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_updated_at_idx\` ON \`goods_receipts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_created_at_idx\` ON \`goods_receipts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__goods_receipts_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_receipt_number\` text NOT NULL,
  	\`version_purchase_order_id\` text(36) NOT NULL,
  	\`version_received_date\` text NOT NULL,
  	\`version_status\` text DEFAULT 'pending',
  	\`version_inspected_at\` text,
  	\`version_inspected_by_id\` text(36),
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`goods_receipts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_purchase_order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_inspected_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__goods_receipts_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_receipt_number", "version_purchase_order_id", "version_received_date", "version_status", "version_inspected_at", "version_inspected_by_id", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_receipt_number", "version_purchase_order_id", "version_received_date", "version_status", "version_inspected_at", "version_inspected_by_id", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_goods_receipts_v\`;`)
  await db.run(sql`DROP TABLE \`_goods_receipts_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__goods_receipts_v\` RENAME TO \`_goods_receipts_v\`;`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_parent_idx\` ON \`_goods_receipts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_version_version_uuid_idx\` ON \`_goods_receipts_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_version_version_tenant_idx\` ON \`_goods_receipts_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_version_version_receipt_number_idx\` ON \`_goods_receipts_v\` (\`version_receipt_number\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_version_version_purchase_order_idx\` ON \`_goods_receipts_v\` (\`version_purchase_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_version_version_inspected_by_idx\` ON \`_goods_receipts_v\` (\`version_inspected_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_version_version_created_by_idx\` ON \`_goods_receipts_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_version_version_approved_by_idx\` ON \`_goods_receipts_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_version_version_updated_at_idx\` ON \`_goods_receipts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_version_version_created_at_idx\` ON \`_goods_receipts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_created_at_idx\` ON \`_goods_receipts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_updated_at_idx\` ON \`_goods_receipts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_messages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	\`invoices_id\` text(36),
  	\`parties_id\` text(36),
  	\`orders_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`messages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`invoices_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`parties_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`orders_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_messages_rels\`("id", "order", "parent_id", "path", "users_id", "invoices_id", "parties_id", "orders_id") SELECT "id", "order", "parent_id", "path", "users_id", "invoices_id", "parties_id", "orders_id" FROM \`messages_rels\`;`)
  await db.run(sql`DROP TABLE \`messages_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_messages_rels\` RENAME TO \`messages_rels\`;`)
  await db.run(sql`CREATE INDEX \`messages_rels_order_idx\` ON \`messages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_parent_idx\` ON \`messages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_path_idx\` ON \`messages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_users_id_idx\` ON \`messages_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_invoices_id_idx\` ON \`messages_rels\` (\`invoices_id\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_parties_id_idx\` ON \`messages_rels\` (\`parties_id\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_orders_id_idx\` ON \`messages_rels\` (\`orders_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_purchase_requisitions\` (
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
  	FOREIGN KEY (\`created_purchase_order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`awarded_quote_id\`) REFERENCES \`vendor_quotes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_purchase_requisitions\`("id", "uuid", "tenant_id", "requisition_number", "requisitioner_id", "department", "cost_center_id", "project_id", "requested_date", "required_by_date", "business_justification", "currency", "estimated_total", "priority", "requires_quotes", "minimum_quotes_required", "created_purchase_order_id", "awarded_quote_id", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "requisition_number", "requisitioner_id", "department", "cost_center_id", "project_id", "requested_date", "required_by_date", "business_justification", "currency", "estimated_total", "priority", "requires_quotes", "minimum_quotes_required", "created_purchase_order_id", "awarded_quote_id", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`purchase_requisitions\`;`)
  await db.run(sql`DROP TABLE \`purchase_requisitions\`;`)
  await db.run(sql`ALTER TABLE \`__new_purchase_requisitions\` RENAME TO \`purchase_requisitions\`;`)
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
  await db.run(sql`CREATE TABLE \`__new__purchase_requisitions_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_requisition_number\` text NOT NULL,
  	\`version_requisitioner_id\` text(36) NOT NULL,
  	\`version_department\` text,
  	\`version_cost_center_id\` text(36),
  	\`version_project_id\` text(36),
  	\`version_requested_date\` text NOT NULL,
  	\`version_required_by_date\` text,
  	\`version_business_justification\` text NOT NULL,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_estimated_total\` numeric NOT NULL,
  	\`version_priority\` text DEFAULT 'normal',
  	\`version_requires_quotes\` integer DEFAULT false,
  	\`version_minimum_quotes_required\` numeric DEFAULT 0,
  	\`version_created_purchase_order_id\` text(36),
  	\`version_awarded_quote_id\` text(36),
  	\`version_status\` text DEFAULT 'draft',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`purchase_requisitions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_requisitioner_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_purchase_order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_awarded_quote_id\`) REFERENCES \`vendor_quotes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__purchase_requisitions_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_requisition_number", "version_requisitioner_id", "version_department", "version_cost_center_id", "version_project_id", "version_requested_date", "version_required_by_date", "version_business_justification", "version_currency", "version_estimated_total", "version_priority", "version_requires_quotes", "version_minimum_quotes_required", "version_created_purchase_order_id", "version_awarded_quote_id", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_requisition_number", "version_requisitioner_id", "version_department", "version_cost_center_id", "version_project_id", "version_requested_date", "version_required_by_date", "version_business_justification", "version_currency", "version_estimated_total", "version_priority", "version_requires_quotes", "version_minimum_quotes_required", "version_created_purchase_order_id", "version_awarded_quote_id", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_purchase_requisitions_v\`;`)
  await db.run(sql`DROP TABLE \`_purchase_requisitions_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__purchase_requisitions_v\` RENAME TO \`_purchase_requisitions_v\`;`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_parent_idx\` ON \`_purchase_requisitions_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_uuid_idx\` ON \`_purchase_requisitions_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_tenant_idx\` ON \`_purchase_requisitions_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_requisition_num_idx\` ON \`_purchase_requisitions_v\` (\`version_requisition_number\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_requisitioner_idx\` ON \`_purchase_requisitions_v\` (\`version_requisitioner_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_cost_center_idx\` ON \`_purchase_requisitions_v\` (\`version_cost_center_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_project_idx\` ON \`_purchase_requisitions_v\` (\`version_project_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_created_purchas_idx\` ON \`_purchase_requisitions_v\` (\`version_created_purchase_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_awarded_quote_idx\` ON \`_purchase_requisitions_v\` (\`version_awarded_quote_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_created_by_idx\` ON \`_purchase_requisitions_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_approved_by_idx\` ON \`_purchase_requisitions_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_updated_at_idx\` ON \`_purchase_requisitions_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_created_at_idx\` ON \`_purchase_requisitions_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_created_at_idx\` ON \`_purchase_requisitions_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_updated_at_idx\` ON \`_purchase_requisitions_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_vendor_quotes\` (
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
  	FOREIGN KEY (\`vendor_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`requisition_id\`) REFERENCES \`purchase_requisitions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`awarded_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_purchase_order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_vendor_quotes\`("id", "uuid", "tenant_id", "quote_number", "vendor_id", "requisition_id", "rfq_issued_date", "quote_received_date", "valid_until", "currency", "subtotal", "tax_amount", "shipping_amount", "discount_amount", "total_amount", "payment_terms", "incoterms", "delivery_date", "is_awarded", "awarded_date", "awarded_by_id", "award_rationale", "created_purchase_order_id", "quality_assessment", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "quote_number", "vendor_id", "requisition_id", "rfq_issued_date", "quote_received_date", "valid_until", "currency", "subtotal", "tax_amount", "shipping_amount", "discount_amount", "total_amount", "payment_terms", "incoterms", "delivery_date", "is_awarded", "awarded_date", "awarded_by_id", "award_rationale", "created_purchase_order_id", "quality_assessment", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`vendor_quotes\`;`)
  await db.run(sql`DROP TABLE \`vendor_quotes\`;`)
  await db.run(sql`ALTER TABLE \`__new_vendor_quotes\` RENAME TO \`vendor_quotes\`;`)
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
  await db.run(sql`CREATE TABLE \`__new__vendor_quotes_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_quote_number\` text NOT NULL,
  	\`version_vendor_id\` text(36) NOT NULL,
  	\`version_requisition_id\` text(36),
  	\`version_rfq_issued_date\` text,
  	\`version_quote_received_date\` text NOT NULL,
  	\`version_valid_until\` text,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_subtotal\` numeric,
  	\`version_tax_amount\` numeric,
  	\`version_shipping_amount\` numeric,
  	\`version_discount_amount\` numeric,
  	\`version_total_amount\` numeric NOT NULL,
  	\`version_payment_terms\` text,
  	\`version_incoterms\` text,
  	\`version_delivery_date\` text,
  	\`version_is_awarded\` integer DEFAULT false,
  	\`version_awarded_date\` text,
  	\`version_awarded_by_id\` text(36),
  	\`version_award_rationale\` text,
  	\`version_created_purchase_order_id\` text(36),
  	\`version_quality_assessment\` text,
  	\`version_status\` text DEFAULT 'received',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`vendor_quotes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_vendor_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_requisition_id\`) REFERENCES \`purchase_requisitions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_awarded_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_purchase_order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__vendor_quotes_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_quote_number", "version_vendor_id", "version_requisition_id", "version_rfq_issued_date", "version_quote_received_date", "version_valid_until", "version_currency", "version_subtotal", "version_tax_amount", "version_shipping_amount", "version_discount_amount", "version_total_amount", "version_payment_terms", "version_incoterms", "version_delivery_date", "version_is_awarded", "version_awarded_date", "version_awarded_by_id", "version_award_rationale", "version_created_purchase_order_id", "version_quality_assessment", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_quote_number", "version_vendor_id", "version_requisition_id", "version_rfq_issued_date", "version_quote_received_date", "version_valid_until", "version_currency", "version_subtotal", "version_tax_amount", "version_shipping_amount", "version_discount_amount", "version_total_amount", "version_payment_terms", "version_incoterms", "version_delivery_date", "version_is_awarded", "version_awarded_date", "version_awarded_by_id", "version_award_rationale", "version_created_purchase_order_id", "version_quality_assessment", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_vendor_quotes_v\`;`)
  await db.run(sql`DROP TABLE \`_vendor_quotes_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__vendor_quotes_v\` RENAME TO \`_vendor_quotes_v\`;`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_parent_idx\` ON \`_vendor_quotes_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_uuid_idx\` ON \`_vendor_quotes_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_tenant_idx\` ON \`_vendor_quotes_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_quote_number_idx\` ON \`_vendor_quotes_v\` (\`version_quote_number\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_vendor_idx\` ON \`_vendor_quotes_v\` (\`version_vendor_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_requisition_idx\` ON \`_vendor_quotes_v\` (\`version_requisition_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_is_awarded_idx\` ON \`_vendor_quotes_v\` (\`version_is_awarded\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_awarded_by_idx\` ON \`_vendor_quotes_v\` (\`version_awarded_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_created_purchase_order_idx\` ON \`_vendor_quotes_v\` (\`version_created_purchase_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_created_by_idx\` ON \`_vendor_quotes_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_approved_by_idx\` ON \`_vendor_quotes_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_updated_at_idx\` ON \`_vendor_quotes_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_created_at_idx\` ON \`_vendor_quotes_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_created_at_idx\` ON \`_vendor_quotes_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_updated_at_idx\` ON \`_vendor_quotes_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_commitments\` (
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
  	FOREIGN KEY (\`linked_purchase_order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`linked_contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_commitments\`("id", "uuid", "tenant_id", "commitment_number", "commitment_amount", "currency", "commitment_description", "authorization_level", "authorized_by_id", "authorization_date", "authorization_expiry_date", "approval_status", "spending_profile_department", "spending_profile_budget_line", "spending_profile_vendor_name", "budget_reservation_reserved_amount", "budget_reservation_committed_amount", "budget_reservation_spent_amount", "budget_reservation_available_balance", "linked_purchase_order_id", "linked_contract_id", "zkod_mandatory_arbitration_clause", "zkod_zkod_commitment_number", "zkod_zkod_notarized", "created_by_id", "approved_by_id", "approved_at", "approval_comments", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "commitment_number", "commitment_amount", "currency", "commitment_description", "authorization_level", "authorized_by_id", "authorization_date", "authorization_expiry_date", "approval_status", "spending_profile_department", "spending_profile_budget_line", "spending_profile_vendor_name", "budget_reservation_reserved_amount", "budget_reservation_committed_amount", "budget_reservation_spent_amount", "budget_reservation_available_balance", "linked_purchase_order_id", "linked_contract_id", "zkod_mandatory_arbitration_clause", "zkod_zkod_commitment_number", "zkod_zkod_notarized", "created_by_id", "approved_by_id", "approved_at", "approval_comments", "updated_at", "created_at" FROM \`commitments\`;`)
  await db.run(sql`DROP TABLE \`commitments\`;`)
  await db.run(sql`ALTER TABLE \`__new_commitments\` RENAME TO \`commitments\`;`)
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
  await db.run(sql`CREATE TABLE \`__new__commitments_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_commitment_number\` text NOT NULL,
  	\`version_commitment_amount\` numeric NOT NULL,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_commitment_description\` text NOT NULL,
  	\`version_authorization_level\` text NOT NULL,
  	\`version_authorized_by_id\` text(36) NOT NULL,
  	\`version_authorization_date\` text NOT NULL,
  	\`version_authorization_expiry_date\` text,
  	\`version_approval_status\` text DEFAULT 'draft' NOT NULL,
  	\`version_spending_profile_department\` text,
  	\`version_spending_profile_budget_line\` text,
  	\`version_spending_profile_vendor_name\` text,
  	\`version_budget_reservation_reserved_amount\` numeric DEFAULT 0,
  	\`version_budget_reservation_committed_amount\` numeric DEFAULT 0,
  	\`version_budget_reservation_spent_amount\` numeric DEFAULT 0,
  	\`version_budget_reservation_available_balance\` numeric DEFAULT 0,
  	\`version_linked_purchase_order_id\` text(36),
  	\`version_linked_contract_id\` text(36),
  	\`version_zkod_mandatory_arbitration_clause\` integer DEFAULT true,
  	\`version_zkod_zkod_commitment_number\` text,
  	\`version_zkod_zkod_notarized\` integer DEFAULT false,
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_approval_comments\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`commitments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_authorized_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_linked_purchase_order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_linked_contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__commitments_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_commitment_number", "version_commitment_amount", "version_currency", "version_commitment_description", "version_authorization_level", "version_authorized_by_id", "version_authorization_date", "version_authorization_expiry_date", "version_approval_status", "version_spending_profile_department", "version_spending_profile_budget_line", "version_spending_profile_vendor_name", "version_budget_reservation_reserved_amount", "version_budget_reservation_committed_amount", "version_budget_reservation_spent_amount", "version_budget_reservation_available_balance", "version_linked_purchase_order_id", "version_linked_contract_id", "version_zkod_mandatory_arbitration_clause", "version_zkod_zkod_commitment_number", "version_zkod_zkod_notarized", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_approval_comments", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_commitment_number", "version_commitment_amount", "version_currency", "version_commitment_description", "version_authorization_level", "version_authorized_by_id", "version_authorization_date", "version_authorization_expiry_date", "version_approval_status", "version_spending_profile_department", "version_spending_profile_budget_line", "version_spending_profile_vendor_name", "version_budget_reservation_reserved_amount", "version_budget_reservation_committed_amount", "version_budget_reservation_spent_amount", "version_budget_reservation_available_balance", "version_linked_purchase_order_id", "version_linked_contract_id", "version_zkod_mandatory_arbitration_clause", "version_zkod_zkod_commitment_number", "version_zkod_zkod_notarized", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_approval_comments", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_commitments_v\`;`)
  await db.run(sql`DROP TABLE \`_commitments_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__commitments_v\` RENAME TO \`_commitments_v\`;`)
  await db.run(sql`CREATE INDEX \`_commitments_v_parent_idx\` ON \`_commitments_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_version_version_uuid_idx\` ON \`_commitments_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_version_version_tenant_idx\` ON \`_commitments_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_version_version_commitment_number_idx\` ON \`_commitments_v\` (\`version_commitment_number\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_version_version_authorized_by_idx\` ON \`_commitments_v\` (\`version_authorized_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_version_version_linked_purchase_order_idx\` ON \`_commitments_v\` (\`version_linked_purchase_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_version_version_linked_contract_idx\` ON \`_commitments_v\` (\`version_linked_contract_id\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_version_version_created_by_idx\` ON \`_commitments_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_version_version_approved_by_idx\` ON \`_commitments_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_version_version_updated_at_idx\` ON \`_commitments_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_version_version_created_at_idx\` ON \`_commitments_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_created_at_idx\` ON \`_commitments_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_updated_at_idx\` ON \`_commitments_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_orders\` (
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
  	\`side\` text DEFAULT 'sale',
  	\`order_number\` text,
  	\`party_id\` text(36),
  	\`customer_order_reference\` text,
  	\`contract_id\` text(36),
  	\`sent_at\` text,
  	\`expires_at\` text,
  	\`accepted_at\` text,
  	\`order_date\` text,
  	\`requested_delivery_date\` text,
  	\`promised_delivery_date\` text,
  	\`ship_to_id\` text(36),
  	\`bill_to_id\` text(36),
  	\`sub_total_amount\` numeric DEFAULT 0,
  	\`tax_amount\` numeric DEFAULT 0,
  	\`total_amount\` numeric DEFAULT 0,
  	\`vendor_id\` text(36),
  	\`project_id\` text(36),
  	\`delivery_terms\` text,
  	\`incoterms_location\` text,
  	\`submitted_at\` text,
  	\`closed_at\` text,
  	\`invoice_id\` text(36),
  	\`notes\` text,
  	\`fulfilled_quantity\` numeric DEFAULT 0,
  	\`invoiced_amount\` numeric DEFAULT 0,
  	\`cancellation_date\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`party_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ship_to_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`bill_to_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`vendor_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_orders\`("id", "uuid", "tenant_id", "shipping_address_title", "shipping_address_first_name", "shipping_address_last_name", "shipping_address_company", "shipping_address_address_line1", "shipping_address_address_line2", "shipping_address_city", "shipping_address_state", "shipping_address_postal_code", "shipping_address_country", "shipping_address_phone", "customer_id", "customer_email", "status", "amount", "currency", "access_token", "side", "order_number", "party_id", "customer_order_reference", "contract_id", "sent_at", "expires_at", "accepted_at", "order_date", "requested_delivery_date", "promised_delivery_date", "ship_to_id", "bill_to_id", "sub_total_amount", "tax_amount", "total_amount", "vendor_id", "project_id", "delivery_terms", "incoterms_location", "submitted_at", "closed_at", "invoice_id", "notes", "fulfilled_quantity", "invoiced_amount", "cancellation_date", "created_by_id", "approved_by_id", "approved_at", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "shipping_address_title", "shipping_address_first_name", "shipping_address_last_name", "shipping_address_company", "shipping_address_address_line1", "shipping_address_address_line2", "shipping_address_city", "shipping_address_state", "shipping_address_postal_code", "shipping_address_country", "shipping_address_phone", "customer_id", "customer_email", "status", "amount", "currency", "access_token", "side", "order_number", "party_id", "customer_order_reference", "contract_id", "sent_at", "expires_at", "accepted_at", "order_date", "requested_delivery_date", "promised_delivery_date", "ship_to_id", "bill_to_id", "sub_total_amount", "tax_amount", "total_amount", "vendor_id", "project_id", "delivery_terms", "incoterms_location", "submitted_at", "closed_at", "invoice_id", "notes", "fulfilled_quantity", "invoiced_amount", "cancellation_date", "created_by_id", "approved_by_id", "approved_at", "updated_at", "created_at" FROM \`orders\`;`)
  await db.run(sql`DROP TABLE \`orders\`;`)
  await db.run(sql`ALTER TABLE \`__new_orders\` RENAME TO \`orders\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_uuid_idx\` ON \`orders\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`orders_tenant_idx\` ON \`orders\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_customer_idx\` ON \`orders\` (\`customer_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_access_token_idx\` ON \`orders\` (\`access_token\`);`)
  await db.run(sql`CREATE INDEX \`orders_side_idx\` ON \`orders\` (\`side\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_order_number_idx\` ON \`orders\` (\`order_number\`);`)
  await db.run(sql`CREATE INDEX \`orders_party_idx\` ON \`orders\` (\`party_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_contract_idx\` ON \`orders\` (\`contract_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_ship_to_idx\` ON \`orders\` (\`ship_to_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_bill_to_idx\` ON \`orders\` (\`bill_to_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_vendor_idx\` ON \`orders\` (\`vendor_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_project_idx\` ON \`orders\` (\`project_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_invoice_idx\` ON \`orders\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_created_by_idx\` ON \`orders\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_approved_by_idx\` ON \`orders\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_updated_at_idx\` ON \`orders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`orders_created_at_idx\` ON \`orders\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__orders_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_shipping_address_title\` text,
  	\`version_shipping_address_first_name\` text,
  	\`version_shipping_address_last_name\` text,
  	\`version_shipping_address_company\` text,
  	\`version_shipping_address_address_line1\` text,
  	\`version_shipping_address_address_line2\` text,
  	\`version_shipping_address_city\` text,
  	\`version_shipping_address_state\` text,
  	\`version_shipping_address_postal_code\` text,
  	\`version_shipping_address_country\` text,
  	\`version_shipping_address_phone\` text,
  	\`version_customer_id\` text(36),
  	\`version_customer_email\` text,
  	\`version_status\` text DEFAULT 'processing',
  	\`version_amount\` numeric,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_access_token\` text,
  	\`version_side\` text DEFAULT 'sale',
  	\`version_order_number\` text,
  	\`version_party_id\` text(36),
  	\`version_customer_order_reference\` text,
  	\`version_contract_id\` text(36),
  	\`version_sent_at\` text,
  	\`version_expires_at\` text,
  	\`version_accepted_at\` text,
  	\`version_order_date\` text,
  	\`version_requested_delivery_date\` text,
  	\`version_promised_delivery_date\` text,
  	\`version_ship_to_id\` text(36),
  	\`version_bill_to_id\` text(36),
  	\`version_sub_total_amount\` numeric DEFAULT 0,
  	\`version_tax_amount\` numeric DEFAULT 0,
  	\`version_total_amount\` numeric DEFAULT 0,
  	\`version_vendor_id\` text(36),
  	\`version_project_id\` text(36),
  	\`version_delivery_terms\` text,
  	\`version_incoterms_location\` text,
  	\`version_submitted_at\` text,
  	\`version_closed_at\` text,
  	\`version_invoice_id\` text(36),
  	\`version_notes\` text,
  	\`version_fulfilled_quantity\` numeric DEFAULT 0,
  	\`version_invoiced_amount\` numeric DEFAULT 0,
  	\`version_cancellation_date\` text,
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_customer_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_party_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_ship_to_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_bill_to_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_vendor_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__orders_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_shipping_address_title", "version_shipping_address_first_name", "version_shipping_address_last_name", "version_shipping_address_company", "version_shipping_address_address_line1", "version_shipping_address_address_line2", "version_shipping_address_city", "version_shipping_address_state", "version_shipping_address_postal_code", "version_shipping_address_country", "version_shipping_address_phone", "version_customer_id", "version_customer_email", "version_status", "version_amount", "version_currency", "version_access_token", "version_side", "version_order_number", "version_party_id", "version_customer_order_reference", "version_contract_id", "version_sent_at", "version_expires_at", "version_accepted_at", "version_order_date", "version_requested_delivery_date", "version_promised_delivery_date", "version_ship_to_id", "version_bill_to_id", "version_sub_total_amount", "version_tax_amount", "version_total_amount", "version_vendor_id", "version_project_id", "version_delivery_terms", "version_incoterms_location", "version_submitted_at", "version_closed_at", "version_invoice_id", "version_notes", "version_fulfilled_quantity", "version_invoiced_amount", "version_cancellation_date", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_shipping_address_title", "version_shipping_address_first_name", "version_shipping_address_last_name", "version_shipping_address_company", "version_shipping_address_address_line1", "version_shipping_address_address_line2", "version_shipping_address_city", "version_shipping_address_state", "version_shipping_address_postal_code", "version_shipping_address_country", "version_shipping_address_phone", "version_customer_id", "version_customer_email", "version_status", "version_amount", "version_currency", "version_access_token", "version_side", "version_order_number", "version_party_id", "version_customer_order_reference", "version_contract_id", "version_sent_at", "version_expires_at", "version_accepted_at", "version_order_date", "version_requested_delivery_date", "version_promised_delivery_date", "version_ship_to_id", "version_bill_to_id", "version_sub_total_amount", "version_tax_amount", "version_total_amount", "version_vendor_id", "version_project_id", "version_delivery_terms", "version_incoterms_location", "version_submitted_at", "version_closed_at", "version_invoice_id", "version_notes", "version_fulfilled_quantity", "version_invoiced_amount", "version_cancellation_date", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_orders_v\`;`)
  await db.run(sql`DROP TABLE \`_orders_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__orders_v\` RENAME TO \`_orders_v\`;`)
  await db.run(sql`CREATE INDEX \`_orders_v_parent_idx\` ON \`_orders_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_uuid_idx\` ON \`_orders_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_tenant_idx\` ON \`_orders_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_customer_idx\` ON \`_orders_v\` (\`version_customer_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_access_token_idx\` ON \`_orders_v\` (\`version_access_token\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_side_idx\` ON \`_orders_v\` (\`version_side\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_order_number_idx\` ON \`_orders_v\` (\`version_order_number\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_party_idx\` ON \`_orders_v\` (\`version_party_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_contract_idx\` ON \`_orders_v\` (\`version_contract_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_ship_to_idx\` ON \`_orders_v\` (\`version_ship_to_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_bill_to_idx\` ON \`_orders_v\` (\`version_bill_to_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_vendor_idx\` ON \`_orders_v\` (\`version_vendor_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_project_idx\` ON \`_orders_v\` (\`version_project_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_invoice_idx\` ON \`_orders_v\` (\`version_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_created_by_idx\` ON \`_orders_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_approved_by_idx\` ON \`_orders_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_updated_at_idx\` ON \`_orders_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_created_at_idx\` ON \`_orders_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_created_at_idx\` ON \`_orders_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_updated_at_idx\` ON \`_orders_v\` (\`updated_at\`);`)
  await db.run(sql`ALTER TABLE \`e801d0467ac3d8adb9473d14e41225f76\` ADD \`gl_account_id\` text REFERENCES gl_accounts(id);`)
  await db.run(sql`ALTER TABLE \`e801d0467ac3d8adb9473d14e41225f76\` ADD \`quantity_received\` numeric DEFAULT 0;`)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_gl_account_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`gl_account_id\`);`)
  await db.run(sql`ALTER TABLE \`_e801d0467ac3d8adb9473d14e41225f76_v\` ADD \`gl_account_id\` text REFERENCES gl_accounts(id);`)
  await db.run(sql`ALTER TABLE \`_e801d0467ac3d8adb9473d14e41225f76_v\` ADD \`quantity_received\` numeric DEFAULT 0;`)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_gl_account_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`gl_account_id\`);`)
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'purchase-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`eced028e288018042b97287d40f1c01dd\` (
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
  	\`project_id\` text(36),
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
  	FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`vendor_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`purchase_orders_uuid_idx\` ON \`purchase_orders\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_tenant_idx\` ON \`purchase_orders\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_project_idx\` ON \`purchase_orders\` (\`project_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`purchase_orders_po_number_idx\` ON \`purchase_orders\` (\`po_number\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_vendor_idx\` ON \`purchase_orders\` (\`vendor_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_invoice_idx\` ON \`purchase_orders\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_created_by_idx\` ON \`purchase_orders\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_approved_by_idx\` ON \`purchase_orders\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_updated_at_idx\` ON \`purchase_orders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_created_at_idx\` ON \`purchase_orders\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_eced028e288018042b97287d40f1c01dd_v\` (
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
  await db.run(sql`CREATE INDEX \`_eced028e288018042b97287d40f1c01dd_v_order_idx\` ON \`_eced028e288018042b97287d40f1c01dd_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eced028e288018042b97287d40f1c01dd_v_parent_id_idx\` ON \`_eced028e288018042b97287d40f1c01dd_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_eced028e288018042b97287d40f1c01dd_v_item_idx\` ON \`_eced028e288018042b97287d40f1c01dd_v\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`_eced028e288018042b97287d40f1c01dd_v_gl_account_idx\` ON \`_eced028e288018042b97287d40f1c01dd_v\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`_eced028e288018042b97287d40f1c01dd_v_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_eced028e288018042b97287d40f1c01dd_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_eced028e288018042b97287d40f1c01dd_v_locales_locale_parent_i\` ON \`_eced028e288018042b97287d40f1c01dd_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_purchase_orders_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_project_id\` text(36),
  	\`version_po_number\` text NOT NULL,
  	\`version_vendor_id\` text(36) NOT NULL,
  	\`version_order_date\` text NOT NULL,
  	\`version_expected_delivery_date\` text,
  	\`version_delivery_terms\` text,
  	\`version_incoterms_location\` text,
  	\`version_subtotal\` numeric DEFAULT 0,
  	\`version_tax_amount\` numeric DEFAULT 0,
  	\`version_total_amount\` numeric DEFAULT 0,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_status\` text DEFAULT 'draft',
  	\`version_submitted_at\` text,
  	\`version_sent_at\` text,
  	\`version_closed_at\` text,
  	\`version_invoice_id\` text(36),
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`purchase_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_vendor_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_purchase_orders_v_parent_idx\` ON \`_purchase_orders_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_orders_v_version_version_uuid_idx\` ON \`_purchase_orders_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_orders_v_version_version_tenant_idx\` ON \`_purchase_orders_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_orders_v_version_version_project_idx\` ON \`_purchase_orders_v\` (\`version_project_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_orders_v_version_version_po_number_idx\` ON \`_purchase_orders_v\` (\`version_po_number\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_orders_v_version_version_vendor_idx\` ON \`_purchase_orders_v\` (\`version_vendor_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_orders_v_version_version_invoice_idx\` ON \`_purchase_orders_v\` (\`version_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_orders_v_version_version_created_by_idx\` ON \`_purchase_orders_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_orders_v_version_version_approved_by_idx\` ON \`_purchase_orders_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_orders_v_version_version_updated_at_idx\` ON \`_purchase_orders_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_orders_v_version_version_created_at_idx\` ON \`_purchase_orders_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_orders_v_created_at_idx\` ON \`_purchase_orders_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_orders_v_updated_at_idx\` ON \`_purchase_orders_v\` (\`updated_at\`);`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_goods_receipts\` (
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
  await db.run(sql`INSERT INTO \`__new_goods_receipts\`("id", "uuid", "tenant_id", "receipt_number", "purchase_order_id", "received_date", "status", "inspected_at", "inspected_by_id", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "receipt_number", "purchase_order_id", "received_date", "status", "inspected_at", "inspected_by_id", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`goods_receipts\`;`)
  await db.run(sql`DROP TABLE \`goods_receipts\`;`)
  await db.run(sql`ALTER TABLE \`__new_goods_receipts\` RENAME TO \`goods_receipts\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`goods_receipts_uuid_idx\` ON \`goods_receipts\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_tenant_idx\` ON \`goods_receipts\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`goods_receipts_receipt_number_idx\` ON \`goods_receipts\` (\`receipt_number\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_purchase_order_idx\` ON \`goods_receipts\` (\`purchase_order_id\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_inspected_by_idx\` ON \`goods_receipts\` (\`inspected_by_id\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_created_by_idx\` ON \`goods_receipts\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_approved_by_idx\` ON \`goods_receipts\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_updated_at_idx\` ON \`goods_receipts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_created_at_idx\` ON \`goods_receipts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__goods_receipts_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_receipt_number\` text NOT NULL,
  	\`version_purchase_order_id\` text(36) NOT NULL,
  	\`version_received_date\` text NOT NULL,
  	\`version_status\` text DEFAULT 'pending',
  	\`version_inspected_at\` text,
  	\`version_inspected_by_id\` text(36),
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`goods_receipts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_purchase_order_id\`) REFERENCES \`purchase_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_inspected_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__goods_receipts_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_receipt_number", "version_purchase_order_id", "version_received_date", "version_status", "version_inspected_at", "version_inspected_by_id", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_receipt_number", "version_purchase_order_id", "version_received_date", "version_status", "version_inspected_at", "version_inspected_by_id", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_goods_receipts_v\`;`)
  await db.run(sql`DROP TABLE \`_goods_receipts_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__goods_receipts_v\` RENAME TO \`_goods_receipts_v\`;`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_parent_idx\` ON \`_goods_receipts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_version_version_uuid_idx\` ON \`_goods_receipts_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_version_version_tenant_idx\` ON \`_goods_receipts_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_version_version_receipt_number_idx\` ON \`_goods_receipts_v\` (\`version_receipt_number\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_version_version_purchase_order_idx\` ON \`_goods_receipts_v\` (\`version_purchase_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_version_version_inspected_by_idx\` ON \`_goods_receipts_v\` (\`version_inspected_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_version_version_created_by_idx\` ON \`_goods_receipts_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_version_version_approved_by_idx\` ON \`_goods_receipts_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_version_version_updated_at_idx\` ON \`_goods_receipts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_version_version_created_at_idx\` ON \`_goods_receipts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_created_at_idx\` ON \`_goods_receipts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_updated_at_idx\` ON \`_goods_receipts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_purchase_requisitions\` (
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
  await db.run(sql`INSERT INTO \`__new_purchase_requisitions\`("id", "uuid", "tenant_id", "requisition_number", "requisitioner_id", "department", "cost_center_id", "project_id", "requested_date", "required_by_date", "business_justification", "currency", "estimated_total", "priority", "requires_quotes", "minimum_quotes_required", "created_purchase_order_id", "awarded_quote_id", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "requisition_number", "requisitioner_id", "department", "cost_center_id", "project_id", "requested_date", "required_by_date", "business_justification", "currency", "estimated_total", "priority", "requires_quotes", "minimum_quotes_required", "created_purchase_order_id", "awarded_quote_id", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`purchase_requisitions\`;`)
  await db.run(sql`DROP TABLE \`purchase_requisitions\`;`)
  await db.run(sql`ALTER TABLE \`__new_purchase_requisitions\` RENAME TO \`purchase_requisitions\`;`)
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
  await db.run(sql`CREATE TABLE \`__new__purchase_requisitions_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_requisition_number\` text NOT NULL,
  	\`version_requisitioner_id\` text(36) NOT NULL,
  	\`version_department\` text,
  	\`version_cost_center_id\` text(36),
  	\`version_project_id\` text(36),
  	\`version_requested_date\` text NOT NULL,
  	\`version_required_by_date\` text,
  	\`version_business_justification\` text NOT NULL,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_estimated_total\` numeric NOT NULL,
  	\`version_priority\` text DEFAULT 'normal',
  	\`version_requires_quotes\` integer DEFAULT false,
  	\`version_minimum_quotes_required\` numeric DEFAULT 0,
  	\`version_created_purchase_order_id\` text(36),
  	\`version_awarded_quote_id\` text(36),
  	\`version_status\` text DEFAULT 'draft',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`purchase_requisitions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_requisitioner_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_purchase_order_id\`) REFERENCES \`purchase_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_awarded_quote_id\`) REFERENCES \`vendor_quotes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__purchase_requisitions_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_requisition_number", "version_requisitioner_id", "version_department", "version_cost_center_id", "version_project_id", "version_requested_date", "version_required_by_date", "version_business_justification", "version_currency", "version_estimated_total", "version_priority", "version_requires_quotes", "version_minimum_quotes_required", "version_created_purchase_order_id", "version_awarded_quote_id", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_requisition_number", "version_requisitioner_id", "version_department", "version_cost_center_id", "version_project_id", "version_requested_date", "version_required_by_date", "version_business_justification", "version_currency", "version_estimated_total", "version_priority", "version_requires_quotes", "version_minimum_quotes_required", "version_created_purchase_order_id", "version_awarded_quote_id", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_purchase_requisitions_v\`;`)
  await db.run(sql`DROP TABLE \`_purchase_requisitions_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__purchase_requisitions_v\` RENAME TO \`_purchase_requisitions_v\`;`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_parent_idx\` ON \`_purchase_requisitions_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_uuid_idx\` ON \`_purchase_requisitions_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_tenant_idx\` ON \`_purchase_requisitions_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_requisition_num_idx\` ON \`_purchase_requisitions_v\` (\`version_requisition_number\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_requisitioner_idx\` ON \`_purchase_requisitions_v\` (\`version_requisitioner_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_cost_center_idx\` ON \`_purchase_requisitions_v\` (\`version_cost_center_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_project_idx\` ON \`_purchase_requisitions_v\` (\`version_project_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_created_purchas_idx\` ON \`_purchase_requisitions_v\` (\`version_created_purchase_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_awarded_quote_idx\` ON \`_purchase_requisitions_v\` (\`version_awarded_quote_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_created_by_idx\` ON \`_purchase_requisitions_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_approved_by_idx\` ON \`_purchase_requisitions_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_updated_at_idx\` ON \`_purchase_requisitions_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_created_at_idx\` ON \`_purchase_requisitions_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_created_at_idx\` ON \`_purchase_requisitions_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_updated_at_idx\` ON \`_purchase_requisitions_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_vendor_quotes\` (
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
  	FOREIGN KEY (\`vendor_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`requisition_id\`) REFERENCES \`purchase_requisitions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`awarded_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_purchase_order_id\`) REFERENCES \`purchase_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_vendor_quotes\`("id", "uuid", "tenant_id", "quote_number", "vendor_id", "requisition_id", "rfq_issued_date", "quote_received_date", "valid_until", "currency", "subtotal", "tax_amount", "shipping_amount", "discount_amount", "total_amount", "payment_terms", "incoterms", "delivery_date", "is_awarded", "awarded_date", "awarded_by_id", "award_rationale", "created_purchase_order_id", "quality_assessment", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "quote_number", "vendor_id", "requisition_id", "rfq_issued_date", "quote_received_date", "valid_until", "currency", "subtotal", "tax_amount", "shipping_amount", "discount_amount", "total_amount", "payment_terms", "incoterms", "delivery_date", "is_awarded", "awarded_date", "awarded_by_id", "award_rationale", "created_purchase_order_id", "quality_assessment", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`vendor_quotes\`;`)
  await db.run(sql`DROP TABLE \`vendor_quotes\`;`)
  await db.run(sql`ALTER TABLE \`__new_vendor_quotes\` RENAME TO \`vendor_quotes\`;`)
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
  await db.run(sql`CREATE TABLE \`__new__vendor_quotes_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_quote_number\` text NOT NULL,
  	\`version_vendor_id\` text(36) NOT NULL,
  	\`version_requisition_id\` text(36),
  	\`version_rfq_issued_date\` text,
  	\`version_quote_received_date\` text NOT NULL,
  	\`version_valid_until\` text,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_subtotal\` numeric,
  	\`version_tax_amount\` numeric,
  	\`version_shipping_amount\` numeric,
  	\`version_discount_amount\` numeric,
  	\`version_total_amount\` numeric NOT NULL,
  	\`version_payment_terms\` text,
  	\`version_incoterms\` text,
  	\`version_delivery_date\` text,
  	\`version_is_awarded\` integer DEFAULT false,
  	\`version_awarded_date\` text,
  	\`version_awarded_by_id\` text(36),
  	\`version_award_rationale\` text,
  	\`version_created_purchase_order_id\` text(36),
  	\`version_quality_assessment\` text,
  	\`version_status\` text DEFAULT 'received',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`vendor_quotes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_vendor_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_requisition_id\`) REFERENCES \`purchase_requisitions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_awarded_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_purchase_order_id\`) REFERENCES \`purchase_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__vendor_quotes_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_quote_number", "version_vendor_id", "version_requisition_id", "version_rfq_issued_date", "version_quote_received_date", "version_valid_until", "version_currency", "version_subtotal", "version_tax_amount", "version_shipping_amount", "version_discount_amount", "version_total_amount", "version_payment_terms", "version_incoterms", "version_delivery_date", "version_is_awarded", "version_awarded_date", "version_awarded_by_id", "version_award_rationale", "version_created_purchase_order_id", "version_quality_assessment", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_quote_number", "version_vendor_id", "version_requisition_id", "version_rfq_issued_date", "version_quote_received_date", "version_valid_until", "version_currency", "version_subtotal", "version_tax_amount", "version_shipping_amount", "version_discount_amount", "version_total_amount", "version_payment_terms", "version_incoterms", "version_delivery_date", "version_is_awarded", "version_awarded_date", "version_awarded_by_id", "version_award_rationale", "version_created_purchase_order_id", "version_quality_assessment", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_vendor_quotes_v\`;`)
  await db.run(sql`DROP TABLE \`_vendor_quotes_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__vendor_quotes_v\` RENAME TO \`_vendor_quotes_v\`;`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_parent_idx\` ON \`_vendor_quotes_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_uuid_idx\` ON \`_vendor_quotes_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_tenant_idx\` ON \`_vendor_quotes_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_quote_number_idx\` ON \`_vendor_quotes_v\` (\`version_quote_number\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_vendor_idx\` ON \`_vendor_quotes_v\` (\`version_vendor_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_requisition_idx\` ON \`_vendor_quotes_v\` (\`version_requisition_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_is_awarded_idx\` ON \`_vendor_quotes_v\` (\`version_is_awarded\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_awarded_by_idx\` ON \`_vendor_quotes_v\` (\`version_awarded_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_created_purchase_order_idx\` ON \`_vendor_quotes_v\` (\`version_created_purchase_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_created_by_idx\` ON \`_vendor_quotes_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_approved_by_idx\` ON \`_vendor_quotes_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_updated_at_idx\` ON \`_vendor_quotes_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_created_at_idx\` ON \`_vendor_quotes_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_created_at_idx\` ON \`_vendor_quotes_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_updated_at_idx\` ON \`_vendor_quotes_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_commitments\` (
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
  await db.run(sql`INSERT INTO \`__new_commitments\`("id", "uuid", "tenant_id", "commitment_number", "commitment_amount", "currency", "commitment_description", "authorization_level", "authorized_by_id", "authorization_date", "authorization_expiry_date", "approval_status", "spending_profile_department", "spending_profile_budget_line", "spending_profile_vendor_name", "budget_reservation_reserved_amount", "budget_reservation_committed_amount", "budget_reservation_spent_amount", "budget_reservation_available_balance", "linked_purchase_order_id", "linked_contract_id", "zkod_mandatory_arbitration_clause", "zkod_zkod_commitment_number", "zkod_zkod_notarized", "created_by_id", "approved_by_id", "approved_at", "approval_comments", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "commitment_number", "commitment_amount", "currency", "commitment_description", "authorization_level", "authorized_by_id", "authorization_date", "authorization_expiry_date", "approval_status", "spending_profile_department", "spending_profile_budget_line", "spending_profile_vendor_name", "budget_reservation_reserved_amount", "budget_reservation_committed_amount", "budget_reservation_spent_amount", "budget_reservation_available_balance", "linked_purchase_order_id", "linked_contract_id", "zkod_mandatory_arbitration_clause", "zkod_zkod_commitment_number", "zkod_zkod_notarized", "created_by_id", "approved_by_id", "approved_at", "approval_comments", "updated_at", "created_at" FROM \`commitments\`;`)
  await db.run(sql`DROP TABLE \`commitments\`;`)
  await db.run(sql`ALTER TABLE \`__new_commitments\` RENAME TO \`commitments\`;`)
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
  await db.run(sql`CREATE TABLE \`__new__commitments_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_commitment_number\` text NOT NULL,
  	\`version_commitment_amount\` numeric NOT NULL,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_commitment_description\` text NOT NULL,
  	\`version_authorization_level\` text NOT NULL,
  	\`version_authorized_by_id\` text(36) NOT NULL,
  	\`version_authorization_date\` text NOT NULL,
  	\`version_authorization_expiry_date\` text,
  	\`version_approval_status\` text DEFAULT 'draft' NOT NULL,
  	\`version_spending_profile_department\` text,
  	\`version_spending_profile_budget_line\` text,
  	\`version_spending_profile_vendor_name\` text,
  	\`version_budget_reservation_reserved_amount\` numeric DEFAULT 0,
  	\`version_budget_reservation_committed_amount\` numeric DEFAULT 0,
  	\`version_budget_reservation_spent_amount\` numeric DEFAULT 0,
  	\`version_budget_reservation_available_balance\` numeric DEFAULT 0,
  	\`version_linked_purchase_order_id\` text(36),
  	\`version_linked_contract_id\` text(36),
  	\`version_zkod_mandatory_arbitration_clause\` integer DEFAULT true,
  	\`version_zkod_zkod_commitment_number\` text,
  	\`version_zkod_zkod_notarized\` integer DEFAULT false,
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_approval_comments\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`commitments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_authorized_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_linked_purchase_order_id\`) REFERENCES \`purchase_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_linked_contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__commitments_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_commitment_number", "version_commitment_amount", "version_currency", "version_commitment_description", "version_authorization_level", "version_authorized_by_id", "version_authorization_date", "version_authorization_expiry_date", "version_approval_status", "version_spending_profile_department", "version_spending_profile_budget_line", "version_spending_profile_vendor_name", "version_budget_reservation_reserved_amount", "version_budget_reservation_committed_amount", "version_budget_reservation_spent_amount", "version_budget_reservation_available_balance", "version_linked_purchase_order_id", "version_linked_contract_id", "version_zkod_mandatory_arbitration_clause", "version_zkod_zkod_commitment_number", "version_zkod_zkod_notarized", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_approval_comments", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_commitment_number", "version_commitment_amount", "version_currency", "version_commitment_description", "version_authorization_level", "version_authorized_by_id", "version_authorization_date", "version_authorization_expiry_date", "version_approval_status", "version_spending_profile_department", "version_spending_profile_budget_line", "version_spending_profile_vendor_name", "version_budget_reservation_reserved_amount", "version_budget_reservation_committed_amount", "version_budget_reservation_spent_amount", "version_budget_reservation_available_balance", "version_linked_purchase_order_id", "version_linked_contract_id", "version_zkod_mandatory_arbitration_clause", "version_zkod_zkod_commitment_number", "version_zkod_zkod_notarized", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_approval_comments", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_commitments_v\`;`)
  await db.run(sql`DROP TABLE \`_commitments_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__commitments_v\` RENAME TO \`_commitments_v\`;`)
  await db.run(sql`CREATE INDEX \`_commitments_v_parent_idx\` ON \`_commitments_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_version_version_uuid_idx\` ON \`_commitments_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_version_version_tenant_idx\` ON \`_commitments_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_version_version_commitment_number_idx\` ON \`_commitments_v\` (\`version_commitment_number\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_version_version_authorized_by_idx\` ON \`_commitments_v\` (\`version_authorized_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_version_version_linked_purchase_order_idx\` ON \`_commitments_v\` (\`version_linked_purchase_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_version_version_linked_contract_idx\` ON \`_commitments_v\` (\`version_linked_contract_id\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_version_version_created_by_idx\` ON \`_commitments_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_version_version_approved_by_idx\` ON \`_commitments_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_version_version_updated_at_idx\` ON \`_commitments_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_version_version_created_at_idx\` ON \`_commitments_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_created_at_idx\` ON \`_commitments_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_updated_at_idx\` ON \`_commitments_v\` (\`updated_at\`);`)
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
  await db.run(sql`CREATE TABLE \`__new_orders\` (
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
  	\`order_number\` text NOT NULL,
  	\`party_id\` text(36),
  	\`customer_order_reference\` text,
  	\`contract_id\` text(36),
  	\`sent_at\` text,
  	\`expires_at\` text,
  	\`accepted_at\` text,
  	\`order_date\` text,
  	\`requested_delivery_date\` text,
  	\`promised_delivery_date\` text,
  	\`ship_to_id\` text(36),
  	\`bill_to_id\` text(36),
  	\`sub_total_amount\` numeric DEFAULT 0,
  	\`tax_amount\` numeric DEFAULT 0,
  	\`total_amount\` numeric DEFAULT 0,
  	\`fulfilled_quantity\` numeric DEFAULT 0,
  	\`invoiced_amount\` numeric DEFAULT 0,
  	\`cancellation_date\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`party_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ship_to_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`bill_to_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_orders\`("id", "uuid", "tenant_id", "shipping_address_title", "shipping_address_first_name", "shipping_address_last_name", "shipping_address_company", "shipping_address_address_line1", "shipping_address_address_line2", "shipping_address_city", "shipping_address_state", "shipping_address_postal_code", "shipping_address_country", "shipping_address_phone", "customer_id", "customer_email", "status", "amount", "currency", "access_token", "order_number", "party_id", "customer_order_reference", "contract_id", "sent_at", "expires_at", "accepted_at", "order_date", "requested_delivery_date", "promised_delivery_date", "ship_to_id", "bill_to_id", "sub_total_amount", "tax_amount", "total_amount", "fulfilled_quantity", "invoiced_amount", "cancellation_date", "created_by_id", "approved_by_id", "approved_at", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "shipping_address_title", "shipping_address_first_name", "shipping_address_last_name", "shipping_address_company", "shipping_address_address_line1", "shipping_address_address_line2", "shipping_address_city", "shipping_address_state", "shipping_address_postal_code", "shipping_address_country", "shipping_address_phone", "customer_id", "customer_email", "status", "amount", "currency", "access_token", "order_number", "party_id", "customer_order_reference", "contract_id", "sent_at", "expires_at", "accepted_at", "order_date", "requested_delivery_date", "promised_delivery_date", "ship_to_id", "bill_to_id", "sub_total_amount", "tax_amount", "total_amount", "fulfilled_quantity", "invoiced_amount", "cancellation_date", "created_by_id", "approved_by_id", "approved_at", "updated_at", "created_at" FROM \`orders\`;`)
  await db.run(sql`DROP TABLE \`orders\`;`)
  await db.run(sql`ALTER TABLE \`__new_orders\` RENAME TO \`orders\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_uuid_idx\` ON \`orders\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`orders_tenant_idx\` ON \`orders\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_customer_idx\` ON \`orders\` (\`customer_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_access_token_idx\` ON \`orders\` (\`access_token\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_order_number_idx\` ON \`orders\` (\`order_number\`);`)
  await db.run(sql`CREATE INDEX \`orders_party_idx\` ON \`orders\` (\`party_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_contract_idx\` ON \`orders\` (\`contract_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_ship_to_idx\` ON \`orders\` (\`ship_to_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_bill_to_idx\` ON \`orders\` (\`bill_to_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_created_by_idx\` ON \`orders\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_approved_by_idx\` ON \`orders\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_updated_at_idx\` ON \`orders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`orders_created_at_idx\` ON \`orders\` (\`created_at\`);`)
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
  await db.run(sql`CREATE TABLE \`__new__orders_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_shipping_address_title\` text,
  	\`version_shipping_address_first_name\` text,
  	\`version_shipping_address_last_name\` text,
  	\`version_shipping_address_company\` text,
  	\`version_shipping_address_address_line1\` text,
  	\`version_shipping_address_address_line2\` text,
  	\`version_shipping_address_city\` text,
  	\`version_shipping_address_state\` text,
  	\`version_shipping_address_postal_code\` text,
  	\`version_shipping_address_country\` text,
  	\`version_shipping_address_phone\` text,
  	\`version_customer_id\` text(36),
  	\`version_customer_email\` text,
  	\`version_status\` text DEFAULT 'processing',
  	\`version_amount\` numeric,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_access_token\` text,
  	\`version_order_number\` text NOT NULL,
  	\`version_party_id\` text(36),
  	\`version_customer_order_reference\` text,
  	\`version_contract_id\` text(36),
  	\`version_sent_at\` text,
  	\`version_expires_at\` text,
  	\`version_accepted_at\` text,
  	\`version_order_date\` text,
  	\`version_requested_delivery_date\` text,
  	\`version_promised_delivery_date\` text,
  	\`version_ship_to_id\` text(36),
  	\`version_bill_to_id\` text(36),
  	\`version_sub_total_amount\` numeric DEFAULT 0,
  	\`version_tax_amount\` numeric DEFAULT 0,
  	\`version_total_amount\` numeric DEFAULT 0,
  	\`version_fulfilled_quantity\` numeric DEFAULT 0,
  	\`version_invoiced_amount\` numeric DEFAULT 0,
  	\`version_cancellation_date\` text,
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_customer_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_party_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_ship_to_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_bill_to_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__orders_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_shipping_address_title", "version_shipping_address_first_name", "version_shipping_address_last_name", "version_shipping_address_company", "version_shipping_address_address_line1", "version_shipping_address_address_line2", "version_shipping_address_city", "version_shipping_address_state", "version_shipping_address_postal_code", "version_shipping_address_country", "version_shipping_address_phone", "version_customer_id", "version_customer_email", "version_status", "version_amount", "version_currency", "version_access_token", "version_order_number", "version_party_id", "version_customer_order_reference", "version_contract_id", "version_sent_at", "version_expires_at", "version_accepted_at", "version_order_date", "version_requested_delivery_date", "version_promised_delivery_date", "version_ship_to_id", "version_bill_to_id", "version_sub_total_amount", "version_tax_amount", "version_total_amount", "version_fulfilled_quantity", "version_invoiced_amount", "version_cancellation_date", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_shipping_address_title", "version_shipping_address_first_name", "version_shipping_address_last_name", "version_shipping_address_company", "version_shipping_address_address_line1", "version_shipping_address_address_line2", "version_shipping_address_city", "version_shipping_address_state", "version_shipping_address_postal_code", "version_shipping_address_country", "version_shipping_address_phone", "version_customer_id", "version_customer_email", "version_status", "version_amount", "version_currency", "version_access_token", "version_order_number", "version_party_id", "version_customer_order_reference", "version_contract_id", "version_sent_at", "version_expires_at", "version_accepted_at", "version_order_date", "version_requested_delivery_date", "version_promised_delivery_date", "version_ship_to_id", "version_bill_to_id", "version_sub_total_amount", "version_tax_amount", "version_total_amount", "version_fulfilled_quantity", "version_invoiced_amount", "version_cancellation_date", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_orders_v\`;`)
  await db.run(sql`DROP TABLE \`_orders_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__orders_v\` RENAME TO \`_orders_v\`;`)
  await db.run(sql`CREATE INDEX \`_orders_v_parent_idx\` ON \`_orders_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_uuid_idx\` ON \`_orders_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_tenant_idx\` ON \`_orders_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_customer_idx\` ON \`_orders_v\` (\`version_customer_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_access_token_idx\` ON \`_orders_v\` (\`version_access_token\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_order_number_idx\` ON \`_orders_v\` (\`version_order_number\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_party_idx\` ON \`_orders_v\` (\`version_party_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_contract_idx\` ON \`_orders_v\` (\`version_contract_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_ship_to_idx\` ON \`_orders_v\` (\`version_ship_to_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_bill_to_idx\` ON \`_orders_v\` (\`version_bill_to_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_created_by_idx\` ON \`_orders_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_approved_by_idx\` ON \`_orders_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_updated_at_idx\` ON \`_orders_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_created_at_idx\` ON \`_orders_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_created_at_idx\` ON \`_orders_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_updated_at_idx\` ON \`_orders_v\` (\`updated_at\`);`)
  await db.run(sql`ALTER TABLE \`messages_rels\` ADD \`purchase_orders_id\` text(36) REFERENCES purchase_orders(id);`)
  await db.run(sql`CREATE INDEX \`messages_rels_purchase_orders_id_idx\` ON \`messages_rels\` (\`purchase_orders_id\`);`)
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'purchase-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
}
