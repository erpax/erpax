import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`e801d0467ac3d8adb9473d14e41225f76\` (
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
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_order_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_parent_id_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_item_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_tax_category_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`tax_category_id\`);`)
  await db.run(sql`CREATE TABLE \`e801d0467ac3d8adb9473d14e41225f76_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e801d0467ac3d8adb9473d14e41225f76\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e801d0467ac3d8adb9473d14e41225f76_locales_locale_parent_id_u\` ON \`e801d0467ac3d8adb9473d14e41225f76_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`orders_locales\` (
  	\`cancellation_reason\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_locales_locale_parent_id_unique\` ON \`orders_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e801d0467ac3d8adb9473d14e41225f76_v\` (
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
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_order_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_parent_id_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_item_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_tax_category_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`tax_category_id\`);`)
  await db.run(sql`CREATE TABLE \`_e801d0467ac3d8adb9473d14e41225f76_v_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e801d0467ac3d8adb9473d14e41225f76_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_locales_locale_parent_i\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_orders_v_locales\` (
  	\`version_cancellation_reason\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_orders_v_locales_locale_parent_id_unique\` ON \`_orders_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP TABLE \`ea1127d16d0118cc6b920e6820a2d4f19\`;`)
  await db.run(sql`DROP TABLE \`ea1127d16d0118cc6b920e6820a2d4f19_locales\`;`)
  await db.run(sql`DROP TABLE \`sales_orders\`;`)
  await db.run(sql`DROP TABLE \`sales_orders_locales\`;`)
  await db.run(sql`DROP TABLE \`_ea1127d16d0118cc6b920e6820a2d4f19_v\`;`)
  await db.run(sql`DROP TABLE \`_ea1127d16d0118cc6b920e6820a2d4f19_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_sales_orders_v\`;`)
  await db.run(sql`DROP TABLE \`_sales_orders_v_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_credit_memos\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`memo_number\` text NOT NULL,
  	\`customer_id\` text(36),
  	\`invoice_id\` text(36),
  	\`reason\` text NOT NULL,
  	\`reason_detail\` text,
  	\`order_id\` text(36),
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
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_credit_memos\`("id", "uuid", "tenant_id", "memo_number", "customer_id", "invoice_id", "reason", "reason_detail", "order_id", "amount", "currency", "status", "issued_at", "applied_at", "settled_at", "journal_entry_id", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "memo_number", "customer_id", "invoice_id", "reason", "reason_detail", "order_id", "amount", "currency", "status", "issued_at", "applied_at", "settled_at", "journal_entry_id", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`credit_memos\`;`)
  await db.run(sql`DROP TABLE \`credit_memos\`;`)
  await db.run(sql`ALTER TABLE \`__new_credit_memos\` RENAME TO \`credit_memos\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`credit_memos_uuid_idx\` ON \`credit_memos\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_tenant_idx\` ON \`credit_memos\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`credit_memos_memo_number_idx\` ON \`credit_memos\` (\`memo_number\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_customer_idx\` ON \`credit_memos\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_invoice_idx\` ON \`credit_memos\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_order_idx\` ON \`credit_memos\` (\`order_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_journal_entry_idx\` ON \`credit_memos\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_created_by_idx\` ON \`credit_memos\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_approved_by_idx\` ON \`credit_memos\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_updated_at_idx\` ON \`credit_memos\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_created_at_idx\` ON \`credit_memos\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__credit_memos_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_memo_number\` text NOT NULL,
  	\`version_customer_id\` text(36),
  	\`version_invoice_id\` text(36),
  	\`version_reason\` text NOT NULL,
  	\`version_reason_detail\` text,
  	\`version_order_id\` text(36),
  	\`version_amount\` numeric NOT NULL,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_status\` text DEFAULT 'draft',
  	\`version_issued_at\` text,
  	\`version_applied_at\` text,
  	\`version_settled_at\` text,
  	\`version_journal_entry_id\` text(36),
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`credit_memos\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_customer_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__credit_memos_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_memo_number", "version_customer_id", "version_invoice_id", "version_reason", "version_reason_detail", "version_order_id", "version_amount", "version_currency", "version_status", "version_issued_at", "version_applied_at", "version_settled_at", "version_journal_entry_id", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_memo_number", "version_customer_id", "version_invoice_id", "version_reason", "version_reason_detail", "version_order_id", "version_amount", "version_currency", "version_status", "version_issued_at", "version_applied_at", "version_settled_at", "version_journal_entry_id", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_credit_memos_v\`;`)
  await db.run(sql`DROP TABLE \`_credit_memos_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__credit_memos_v\` RENAME TO \`_credit_memos_v\`;`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_parent_idx\` ON \`_credit_memos_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_uuid_idx\` ON \`_credit_memos_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_tenant_idx\` ON \`_credit_memos_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_memo_number_idx\` ON \`_credit_memos_v\` (\`version_memo_number\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_customer_idx\` ON \`_credit_memos_v\` (\`version_customer_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_invoice_idx\` ON \`_credit_memos_v\` (\`version_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_order_idx\` ON \`_credit_memos_v\` (\`version_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_journal_entry_idx\` ON \`_credit_memos_v\` (\`version_journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_created_by_idx\` ON \`_credit_memos_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_approved_by_idx\` ON \`_credit_memos_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_updated_at_idx\` ON \`_credit_memos_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_created_at_idx\` ON \`_credit_memos_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_created_at_idx\` ON \`_credit_memos_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_updated_at_idx\` ON \`_credit_memos_v\` (\`updated_at\`);`)
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
  await db.run(sql`CREATE TABLE \`__new_messages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	\`invoices_id\` text(36),
  	\`parties_id\` text(36),
  	\`orders_id\` text(36),
  	\`purchase_orders_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`messages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`invoices_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`parties_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`orders_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`purchase_orders_id\`) REFERENCES \`purchase_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_messages_rels\`("id", "order", "parent_id", "path", "users_id", "invoices_id", "parties_id", "orders_id", "purchase_orders_id") SELECT "id", "order", "parent_id", "path", "users_id", "invoices_id", "parties_id", "orders_id", "purchase_orders_id" FROM \`messages_rels\`;`)
  await db.run(sql`DROP TABLE \`messages_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_messages_rels\` RENAME TO \`messages_rels\`;`)
  await db.run(sql`CREATE INDEX \`messages_rels_order_idx\` ON \`messages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_parent_idx\` ON \`messages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_path_idx\` ON \`messages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_users_id_idx\` ON \`messages_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_invoices_id_idx\` ON \`messages_rels\` (\`invoices_id\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_parties_id_idx\` ON \`messages_rels\` (\`parties_id\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_orders_id_idx\` ON \`messages_rels\` (\`orders_id\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_purchase_orders_id_idx\` ON \`messages_rels\` (\`purchase_orders_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_returns\` (
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
  	FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`credit_memo_id\`) REFERENCES \`credit_memos\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_returns\`("id", "uuid", "tenant_id", "rma_number", "order_id", "customer_id", "reason", "status", "authorised_at", "received_at", "restocked_at", "credit_memo_id", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "rma_number", "order_id", "customer_id", "reason", "status", "authorised_at", "received_at", "restocked_at", "credit_memo_id", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`returns\`;`)
  await db.run(sql`DROP TABLE \`returns\`;`)
  await db.run(sql`ALTER TABLE \`__new_returns\` RENAME TO \`returns\`;`)
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
  await db.run(sql`CREATE TABLE \`__new__returns_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_rma_number\` text NOT NULL,
  	\`version_order_id\` text(36) NOT NULL,
  	\`version_customer_id\` text(36),
  	\`version_reason\` text NOT NULL,
  	\`version_status\` text DEFAULT 'requested',
  	\`version_authorised_at\` text,
  	\`version_received_at\` text,
  	\`version_restocked_at\` text,
  	\`version_credit_memo_id\` text(36),
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`returns\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_customer_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_credit_memo_id\`) REFERENCES \`credit_memos\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__returns_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_rma_number", "version_order_id", "version_customer_id", "version_reason", "version_status", "version_authorised_at", "version_received_at", "version_restocked_at", "version_credit_memo_id", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_rma_number", "version_order_id", "version_customer_id", "version_reason", "version_status", "version_authorised_at", "version_received_at", "version_restocked_at", "version_credit_memo_id", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_returns_v\`;`)
  await db.run(sql`DROP TABLE \`_returns_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__returns_v\` RENAME TO \`_returns_v\`;`)
  await db.run(sql`CREATE INDEX \`_returns_v_parent_idx\` ON \`_returns_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_version_version_uuid_idx\` ON \`_returns_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_version_version_tenant_idx\` ON \`_returns_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_version_version_rma_number_idx\` ON \`_returns_v\` (\`version_rma_number\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_version_version_order_idx\` ON \`_returns_v\` (\`version_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_version_version_customer_idx\` ON \`_returns_v\` (\`version_customer_id\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_version_version_credit_memo_idx\` ON \`_returns_v\` (\`version_credit_memo_id\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_version_version_created_by_idx\` ON \`_returns_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_version_version_approved_by_idx\` ON \`_returns_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_version_version_updated_at_idx\` ON \`_returns_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_version_version_created_at_idx\` ON \`_returns_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_created_at_idx\` ON \`_returns_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_updated_at_idx\` ON \`_returns_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_shipments\` (
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
  	FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ship_from_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ship_to_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_shipments\`("id", "uuid", "tenant_id", "shipment_number", "order_id", "ship_from_address_id", "ship_to_address_id", "carrier", "tracking_number", "tracking_url", "shipping_cost", "status", "shipped_at", "delivered_at", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "shipment_number", "order_id", "ship_from_address_id", "ship_to_address_id", "carrier", "tracking_number", "tracking_url", "shipping_cost", "status", "shipped_at", "delivered_at", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`shipments\`;`)
  await db.run(sql`DROP TABLE \`shipments\`;`)
  await db.run(sql`ALTER TABLE \`__new_shipments\` RENAME TO \`shipments\`;`)
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
  await db.run(sql`CREATE TABLE \`__new__shipments_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_shipment_number\` text NOT NULL,
  	\`version_order_id\` text(36) NOT NULL,
  	\`version_ship_from_address_id\` text(36),
  	\`version_ship_to_address_id\` text(36) NOT NULL,
  	\`version_carrier\` text,
  	\`version_tracking_number\` text,
  	\`version_tracking_url\` text,
  	\`version_shipping_cost\` numeric DEFAULT 0,
  	\`version_status\` text DEFAULT 'pending',
  	\`version_shipped_at\` text,
  	\`version_delivered_at\` text,
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`shipments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_ship_from_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_ship_to_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__shipments_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_shipment_number", "version_order_id", "version_ship_from_address_id", "version_ship_to_address_id", "version_carrier", "version_tracking_number", "version_tracking_url", "version_shipping_cost", "version_status", "version_shipped_at", "version_delivered_at", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_shipment_number", "version_order_id", "version_ship_from_address_id", "version_ship_to_address_id", "version_carrier", "version_tracking_number", "version_tracking_url", "version_shipping_cost", "version_status", "version_shipped_at", "version_delivered_at", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_shipments_v\`;`)
  await db.run(sql`DROP TABLE \`_shipments_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__shipments_v\` RENAME TO \`_shipments_v\`;`)
  await db.run(sql`CREATE INDEX \`_shipments_v_parent_idx\` ON \`_shipments_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_version_version_uuid_idx\` ON \`_shipments_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_version_version_tenant_idx\` ON \`_shipments_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_version_version_shipment_number_idx\` ON \`_shipments_v\` (\`version_shipment_number\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_version_version_order_idx\` ON \`_shipments_v\` (\`version_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_version_version_ship_from_address_idx\` ON \`_shipments_v\` (\`version_ship_from_address_id\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_version_version_ship_to_address_idx\` ON \`_shipments_v\` (\`version_ship_to_address_id\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_version_version_tracking_number_idx\` ON \`_shipments_v\` (\`version_tracking_number\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_version_version_created_by_idx\` ON \`_shipments_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_version_version_approved_by_idx\` ON \`_shipments_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_version_version_updated_at_idx\` ON \`_shipments_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_version_version_created_at_idx\` ON \`_shipments_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_created_at_idx\` ON \`_shipments_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_updated_at_idx\` ON \`_shipments_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_contract_performance\` (
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
  	FOREIGN KEY (\`associated_sales_order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_contract_performance\`("id", "uuid", "tenant_id", "contract_id", "performance_obligation_index", "milestone_title", "milestone_sequence", "acceptance_criteria", "control_transfer_method", "planned_completion_date", "actual_completion_date", "completion_date_variance_days", "completion_status", "control_transferred_at", "associated_invoice_id", "revenue_recognized_amount", "currency", "revenue_recognized_at", "associated_sales_order_id", "zkod_zkod_acceptance_protocol_date", "zkod_zkod_acceptance_protocol_number", "zkod_mandatory_arbitration", "created_by_id", "approved_by_id", "approved_at", "performance_notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "contract_id", "performance_obligation_index", "milestone_title", "milestone_sequence", "acceptance_criteria", "control_transfer_method", "planned_completion_date", "actual_completion_date", "completion_date_variance_days", "completion_status", "control_transferred_at", "associated_invoice_id", "revenue_recognized_amount", "currency", "revenue_recognized_at", "associated_sales_order_id", "zkod_zkod_acceptance_protocol_date", "zkod_zkod_acceptance_protocol_number", "zkod_mandatory_arbitration", "created_by_id", "approved_by_id", "approved_at", "performance_notes", "updated_at", "created_at" FROM \`contract_performance\`;`)
  await db.run(sql`DROP TABLE \`contract_performance\`;`)
  await db.run(sql`ALTER TABLE \`__new_contract_performance\` RENAME TO \`contract_performance\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`contract_performance_uuid_idx\` ON \`contract_performance\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_tenant_idx\` ON \`contract_performance\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_contract_idx\` ON \`contract_performance\` (\`contract_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_associated_invoice_idx\` ON \`contract_performance\` (\`associated_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_associated_sales_order_idx\` ON \`contract_performance\` (\`associated_sales_order_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_created_by_idx\` ON \`contract_performance\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_approved_by_idx\` ON \`contract_performance\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_updated_at_idx\` ON \`contract_performance\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_created_at_idx\` ON \`contract_performance\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__contract_performance_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_contract_id\` text(36) NOT NULL,
  	\`version_performance_obligation_index\` numeric,
  	\`version_milestone_title\` text NOT NULL,
  	\`version_milestone_sequence\` numeric NOT NULL,
  	\`version_acceptance_criteria\` text NOT NULL,
  	\`version_control_transfer_method\` text NOT NULL,
  	\`version_planned_completion_date\` text NOT NULL,
  	\`version_actual_completion_date\` text,
  	\`version_completion_date_variance_days\` numeric,
  	\`version_completion_status\` text DEFAULT 'not_started' NOT NULL,
  	\`version_control_transferred_at\` text,
  	\`version_associated_invoice_id\` text(36),
  	\`version_revenue_recognized_amount\` numeric DEFAULT 0,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_revenue_recognized_at\` text,
  	\`version_associated_sales_order_id\` text(36),
  	\`version_zkod_zkod_acceptance_protocol_date\` text,
  	\`version_zkod_zkod_acceptance_protocol_number\` text,
  	\`version_zkod_mandatory_arbitration\` integer DEFAULT false,
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_performance_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`contract_performance\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_associated_invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_associated_sales_order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__contract_performance_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_contract_id", "version_performance_obligation_index", "version_milestone_title", "version_milestone_sequence", "version_acceptance_criteria", "version_control_transfer_method", "version_planned_completion_date", "version_actual_completion_date", "version_completion_date_variance_days", "version_completion_status", "version_control_transferred_at", "version_associated_invoice_id", "version_revenue_recognized_amount", "version_currency", "version_revenue_recognized_at", "version_associated_sales_order_id", "version_zkod_zkod_acceptance_protocol_date", "version_zkod_zkod_acceptance_protocol_number", "version_zkod_mandatory_arbitration", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_performance_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_contract_id", "version_performance_obligation_index", "version_milestone_title", "version_milestone_sequence", "version_acceptance_criteria", "version_control_transfer_method", "version_planned_completion_date", "version_actual_completion_date", "version_completion_date_variance_days", "version_completion_status", "version_control_transferred_at", "version_associated_invoice_id", "version_revenue_recognized_amount", "version_currency", "version_revenue_recognized_at", "version_associated_sales_order_id", "version_zkod_zkod_acceptance_protocol_date", "version_zkod_zkod_acceptance_protocol_number", "version_zkod_mandatory_arbitration", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_performance_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_contract_performance_v\`;`)
  await db.run(sql`DROP TABLE \`_contract_performance_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__contract_performance_v\` RENAME TO \`_contract_performance_v\`;`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_parent_idx\` ON \`_contract_performance_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_uuid_idx\` ON \`_contract_performance_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_tenant_idx\` ON \`_contract_performance_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_contract_idx\` ON \`_contract_performance_v\` (\`version_contract_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_associated_invoi_idx\` ON \`_contract_performance_v\` (\`version_associated_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_associated_sales_idx\` ON \`_contract_performance_v\` (\`version_associated_sales_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_created_by_idx\` ON \`_contract_performance_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_approved_by_idx\` ON \`_contract_performance_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_updated_at_idx\` ON \`_contract_performance_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_created_at_idx\` ON \`_contract_performance_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_created_at_idx\` ON \`_contract_performance_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_updated_at_idx\` ON \`_contract_performance_v\` (\`updated_at\`);`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`order_number\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`party_id\` text(36) REFERENCES parties(id);`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`customer_order_reference\` text;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`contract_id\` text(36) REFERENCES contracts(id);`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`sent_at\` text;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`expires_at\` text;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`accepted_at\` text;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`order_date\` text;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`requested_delivery_date\` text;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`promised_delivery_date\` text;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`ship_to_id\` text(36) REFERENCES addresses(id);`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`bill_to_id\` text(36) REFERENCES addresses(id);`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`sub_total_amount\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`tax_amount\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`total_amount\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`fulfilled_quantity\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`invoiced_amount\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`cancellation_date\` text;`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`created_by_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`approved_by_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`orders\` ADD \`approved_at\` text;`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_order_number_idx\` ON \`orders\` (\`order_number\`);`)
  await db.run(sql`CREATE INDEX \`orders_party_idx\` ON \`orders\` (\`party_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_contract_idx\` ON \`orders\` (\`contract_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_ship_to_idx\` ON \`orders\` (\`ship_to_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_bill_to_idx\` ON \`orders\` (\`bill_to_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_created_by_idx\` ON \`orders\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_approved_by_idx\` ON \`orders\` (\`approved_by_id\`);`)
  await db.run(sql`ALTER TABLE \`_orders_v\` ADD \`version_order_number\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`_orders_v\` ADD \`version_party_id\` text(36) REFERENCES parties(id);`)
  await db.run(sql`ALTER TABLE \`_orders_v\` ADD \`version_customer_order_reference\` text;`)
  await db.run(sql`ALTER TABLE \`_orders_v\` ADD \`version_contract_id\` text(36) REFERENCES contracts(id);`)
  await db.run(sql`ALTER TABLE \`_orders_v\` ADD \`version_sent_at\` text;`)
  await db.run(sql`ALTER TABLE \`_orders_v\` ADD \`version_expires_at\` text;`)
  await db.run(sql`ALTER TABLE \`_orders_v\` ADD \`version_accepted_at\` text;`)
  await db.run(sql`ALTER TABLE \`_orders_v\` ADD \`version_order_date\` text;`)
  await db.run(sql`ALTER TABLE \`_orders_v\` ADD \`version_requested_delivery_date\` text;`)
  await db.run(sql`ALTER TABLE \`_orders_v\` ADD \`version_promised_delivery_date\` text;`)
  await db.run(sql`ALTER TABLE \`_orders_v\` ADD \`version_ship_to_id\` text(36) REFERENCES addresses(id);`)
  await db.run(sql`ALTER TABLE \`_orders_v\` ADD \`version_bill_to_id\` text(36) REFERENCES addresses(id);`)
  await db.run(sql`ALTER TABLE \`_orders_v\` ADD \`version_sub_total_amount\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`_orders_v\` ADD \`version_tax_amount\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`_orders_v\` ADD \`version_total_amount\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`_orders_v\` ADD \`version_fulfilled_quantity\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`_orders_v\` ADD \`version_invoiced_amount\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`_orders_v\` ADD \`version_cancellation_date\` text;`)
  await db.run(sql`ALTER TABLE \`_orders_v\` ADD \`version_created_by_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`_orders_v\` ADD \`version_approved_by_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`_orders_v\` ADD \`version_approved_at\` text;`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_order_number_idx\` ON \`_orders_v\` (\`version_order_number\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_party_idx\` ON \`_orders_v\` (\`version_party_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_contract_idx\` ON \`_orders_v\` (\`version_contract_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_ship_to_idx\` ON \`_orders_v\` (\`version_ship_to_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_bill_to_idx\` ON \`_orders_v\` (\`version_bill_to_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_created_by_idx\` ON \`_orders_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_approved_by_idx\` ON \`_orders_v\` (\`version_approved_by_id\`);`)
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
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
  	\`contract_id\` text(36),
  	\`sent_at\` text,
  	\`expires_at\` text,
  	\`accepted_at\` text,
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
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
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
  await db.run(sql`CREATE TABLE \`_ea1127d16d0118cc6b920e6820a2d4f19_v\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sales_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ea1127d16d0118cc6b920e6820a2d4f19_v_order_idx\` ON \`_ea1127d16d0118cc6b920e6820a2d4f19_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ea1127d16d0118cc6b920e6820a2d4f19_v_parent_id_idx\` ON \`_ea1127d16d0118cc6b920e6820a2d4f19_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ea1127d16d0118cc6b920e6820a2d4f19_v_item_idx\` ON \`_ea1127d16d0118cc6b920e6820a2d4f19_v\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`_ea1127d16d0118cc6b920e6820a2d4f19_v_tax_category_idx\` ON \`_ea1127d16d0118cc6b920e6820a2d4f19_v\` (\`tax_category_id\`);`)
  await db.run(sql`CREATE TABLE \`_ea1127d16d0118cc6b920e6820a2d4f19_v_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_ea1127d16d0118cc6b920e6820a2d4f19_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_ea1127d16d0118cc6b920e6820a2d4f19_v_locales_locale_parent_i\` ON \`_ea1127d16d0118cc6b920e6820a2d4f19_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_sales_orders_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_tenant_id\` text(36),
  	\`version_uuid\` text NOT NULL,
  	\`version_order_number\` text NOT NULL,
  	\`version_customer_id\` text(36) NOT NULL,
  	\`version_customer_order_reference\` text,
  	\`version_contract_id\` text(36),
  	\`version_sent_at\` text,
  	\`version_expires_at\` text,
  	\`version_accepted_at\` text,
  	\`version_order_date\` text NOT NULL,
  	\`version_requested_delivery_date\` text,
  	\`version_promised_delivery_date\` text,
  	\`version_shipping_address_id\` text(36),
  	\`version_billing_address_id\` text(36),
  	\`version_currency\` text DEFAULT 'EUR' NOT NULL,
  	\`version_sub_total_amount\` numeric DEFAULT 0,
  	\`version_tax_amount\` numeric DEFAULT 0,
  	\`version_total_amount\` numeric DEFAULT 0,
  	\`version_fulfilled_quantity\` numeric DEFAULT 0,
  	\`version_invoiced_amount\` numeric DEFAULT 0,
  	\`version_cancellation_date\` text,
  	\`version_status\` text DEFAULT 'draft',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`sales_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_customer_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_shipping_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_billing_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_sales_orders_v_parent_idx\` ON \`_sales_orders_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sales_orders_v_version_version_tenant_idx\` ON \`_sales_orders_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_sales_orders_v_version_version_uuid_idx\` ON \`_sales_orders_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_sales_orders_v_version_version_order_number_idx\` ON \`_sales_orders_v\` (\`version_order_number\`);`)
  await db.run(sql`CREATE INDEX \`_sales_orders_v_version_version_customer_idx\` ON \`_sales_orders_v\` (\`version_customer_id\`);`)
  await db.run(sql`CREATE INDEX \`_sales_orders_v_version_version_contract_idx\` ON \`_sales_orders_v\` (\`version_contract_id\`);`)
  await db.run(sql`CREATE INDEX \`_sales_orders_v_version_version_shipping_address_idx\` ON \`_sales_orders_v\` (\`version_shipping_address_id\`);`)
  await db.run(sql`CREATE INDEX \`_sales_orders_v_version_version_billing_address_idx\` ON \`_sales_orders_v\` (\`version_billing_address_id\`);`)
  await db.run(sql`CREATE INDEX \`_sales_orders_v_version_version_created_by_idx\` ON \`_sales_orders_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_sales_orders_v_version_version_approved_by_idx\` ON \`_sales_orders_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_sales_orders_v_version_version_updated_at_idx\` ON \`_sales_orders_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_sales_orders_v_version_version_created_at_idx\` ON \`_sales_orders_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_sales_orders_v_created_at_idx\` ON \`_sales_orders_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_sales_orders_v_updated_at_idx\` ON \`_sales_orders_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_sales_orders_v_locales\` (
  	\`version_cancellation_reason\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sales_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_sales_orders_v_locales_locale_parent_id_unique\` ON \`_sales_orders_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP TABLE \`e801d0467ac3d8adb9473d14e41225f76\`;`)
  await db.run(sql`DROP TABLE \`e801d0467ac3d8adb9473d14e41225f76_locales\`;`)
  await db.run(sql`DROP TABLE \`orders_locales\`;`)
  await db.run(sql`DROP TABLE \`_e801d0467ac3d8adb9473d14e41225f76_v\`;`)
  await db.run(sql`DROP TABLE \`_e801d0467ac3d8adb9473d14e41225f76_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_orders_v_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_credit_memos\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`memo_number\` text NOT NULL,
  	\`customer_id\` text(36),
  	\`invoice_id\` text(36),
  	\`reason\` text NOT NULL,
  	\`reason_detail\` text,
  	\`order_id\` text(36),
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
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`order_id\`) REFERENCES \`sales_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_credit_memos\`("id", "uuid", "tenant_id", "memo_number", "customer_id", "invoice_id", "reason", "reason_detail", "order_id", "amount", "currency", "status", "issued_at", "applied_at", "settled_at", "journal_entry_id", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "memo_number", "customer_id", "invoice_id", "reason", "reason_detail", "order_id", "amount", "currency", "status", "issued_at", "applied_at", "settled_at", "journal_entry_id", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`credit_memos\`;`)
  await db.run(sql`DROP TABLE \`credit_memos\`;`)
  await db.run(sql`ALTER TABLE \`__new_credit_memos\` RENAME TO \`credit_memos\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`credit_memos_uuid_idx\` ON \`credit_memos\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_tenant_idx\` ON \`credit_memos\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`credit_memos_memo_number_idx\` ON \`credit_memos\` (\`memo_number\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_customer_idx\` ON \`credit_memos\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_invoice_idx\` ON \`credit_memos\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_order_idx\` ON \`credit_memos\` (\`order_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_journal_entry_idx\` ON \`credit_memos\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_created_by_idx\` ON \`credit_memos\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_approved_by_idx\` ON \`credit_memos\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_updated_at_idx\` ON \`credit_memos\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_created_at_idx\` ON \`credit_memos\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__credit_memos_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_memo_number\` text NOT NULL,
  	\`version_customer_id\` text(36),
  	\`version_invoice_id\` text(36),
  	\`version_reason\` text NOT NULL,
  	\`version_reason_detail\` text,
  	\`version_order_id\` text(36),
  	\`version_amount\` numeric NOT NULL,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_status\` text DEFAULT 'draft',
  	\`version_issued_at\` text,
  	\`version_applied_at\` text,
  	\`version_settled_at\` text,
  	\`version_journal_entry_id\` text(36),
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`credit_memos\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_customer_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_order_id\`) REFERENCES \`sales_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__credit_memos_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_memo_number", "version_customer_id", "version_invoice_id", "version_reason", "version_reason_detail", "version_order_id", "version_amount", "version_currency", "version_status", "version_issued_at", "version_applied_at", "version_settled_at", "version_journal_entry_id", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_memo_number", "version_customer_id", "version_invoice_id", "version_reason", "version_reason_detail", "version_order_id", "version_amount", "version_currency", "version_status", "version_issued_at", "version_applied_at", "version_settled_at", "version_journal_entry_id", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_credit_memos_v\`;`)
  await db.run(sql`DROP TABLE \`_credit_memos_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__credit_memos_v\` RENAME TO \`_credit_memos_v\`;`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_parent_idx\` ON \`_credit_memos_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_uuid_idx\` ON \`_credit_memos_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_tenant_idx\` ON \`_credit_memos_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_memo_number_idx\` ON \`_credit_memos_v\` (\`version_memo_number\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_customer_idx\` ON \`_credit_memos_v\` (\`version_customer_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_invoice_idx\` ON \`_credit_memos_v\` (\`version_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_order_idx\` ON \`_credit_memos_v\` (\`version_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_journal_entry_idx\` ON \`_credit_memos_v\` (\`version_journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_created_by_idx\` ON \`_credit_memos_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_approved_by_idx\` ON \`_credit_memos_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_updated_at_idx\` ON \`_credit_memos_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_created_at_idx\` ON \`_credit_memos_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_created_at_idx\` ON \`_credit_memos_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_updated_at_idx\` ON \`_credit_memos_v\` (\`updated_at\`);`)
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
  	FOREIGN KEY (\`order_id\`) REFERENCES \`sales_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
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
  	FOREIGN KEY (\`version_order_id\`) REFERENCES \`sales_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
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
  await db.run(sql`CREATE TABLE \`__new_messages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	\`invoices_id\` text(36),
  	\`parties_id\` text(36),
  	\`sales_orders_id\` text(36),
  	\`purchase_orders_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`messages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`invoices_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`parties_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`sales_orders_id\`) REFERENCES \`sales_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`purchase_orders_id\`) REFERENCES \`purchase_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_messages_rels\`("id", "order", "parent_id", "path", "users_id", "invoices_id", "parties_id", "sales_orders_id", "purchase_orders_id") SELECT "id", "order", "parent_id", "path", "users_id", "invoices_id", "parties_id", "sales_orders_id", "purchase_orders_id" FROM \`messages_rels\`;`)
  await db.run(sql`DROP TABLE \`messages_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_messages_rels\` RENAME TO \`messages_rels\`;`)
  await db.run(sql`CREATE INDEX \`messages_rels_order_idx\` ON \`messages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_parent_idx\` ON \`messages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_path_idx\` ON \`messages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_users_id_idx\` ON \`messages_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_invoices_id_idx\` ON \`messages_rels\` (\`invoices_id\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_parties_id_idx\` ON \`messages_rels\` (\`parties_id\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_sales_orders_id_idx\` ON \`messages_rels\` (\`sales_orders_id\`);`)
  await db.run(sql`CREATE INDEX \`messages_rels_purchase_orders_id_idx\` ON \`messages_rels\` (\`purchase_orders_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_returns\` (
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
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`credit_memo_id\`) REFERENCES \`credit_memos\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_returns\`("id", "uuid", "tenant_id", "rma_number", "order_id", "customer_id", "reason", "status", "authorised_at", "received_at", "restocked_at", "credit_memo_id", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "rma_number", "order_id", "customer_id", "reason", "status", "authorised_at", "received_at", "restocked_at", "credit_memo_id", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`returns\`;`)
  await db.run(sql`DROP TABLE \`returns\`;`)
  await db.run(sql`ALTER TABLE \`__new_returns\` RENAME TO \`returns\`;`)
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
  await db.run(sql`CREATE TABLE \`__new__returns_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_rma_number\` text NOT NULL,
  	\`version_order_id\` text(36) NOT NULL,
  	\`version_customer_id\` text(36),
  	\`version_reason\` text NOT NULL,
  	\`version_status\` text DEFAULT 'requested',
  	\`version_authorised_at\` text,
  	\`version_received_at\` text,
  	\`version_restocked_at\` text,
  	\`version_credit_memo_id\` text(36),
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`returns\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_order_id\`) REFERENCES \`sales_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_customer_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_credit_memo_id\`) REFERENCES \`credit_memos\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__returns_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_rma_number", "version_order_id", "version_customer_id", "version_reason", "version_status", "version_authorised_at", "version_received_at", "version_restocked_at", "version_credit_memo_id", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_rma_number", "version_order_id", "version_customer_id", "version_reason", "version_status", "version_authorised_at", "version_received_at", "version_restocked_at", "version_credit_memo_id", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_returns_v\`;`)
  await db.run(sql`DROP TABLE \`_returns_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__returns_v\` RENAME TO \`_returns_v\`;`)
  await db.run(sql`CREATE INDEX \`_returns_v_parent_idx\` ON \`_returns_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_version_version_uuid_idx\` ON \`_returns_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_version_version_tenant_idx\` ON \`_returns_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_version_version_rma_number_idx\` ON \`_returns_v\` (\`version_rma_number\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_version_version_order_idx\` ON \`_returns_v\` (\`version_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_version_version_customer_idx\` ON \`_returns_v\` (\`version_customer_id\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_version_version_credit_memo_idx\` ON \`_returns_v\` (\`version_credit_memo_id\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_version_version_created_by_idx\` ON \`_returns_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_version_version_approved_by_idx\` ON \`_returns_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_version_version_updated_at_idx\` ON \`_returns_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_version_version_created_at_idx\` ON \`_returns_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_created_at_idx\` ON \`_returns_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_updated_at_idx\` ON \`_returns_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_shipments\` (
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
  await db.run(sql`INSERT INTO \`__new_shipments\`("id", "uuid", "tenant_id", "shipment_number", "order_id", "ship_from_address_id", "ship_to_address_id", "carrier", "tracking_number", "tracking_url", "shipping_cost", "status", "shipped_at", "delivered_at", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "shipment_number", "order_id", "ship_from_address_id", "ship_to_address_id", "carrier", "tracking_number", "tracking_url", "shipping_cost", "status", "shipped_at", "delivered_at", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`shipments\`;`)
  await db.run(sql`DROP TABLE \`shipments\`;`)
  await db.run(sql`ALTER TABLE \`__new_shipments\` RENAME TO \`shipments\`;`)
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
  await db.run(sql`CREATE TABLE \`__new__shipments_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_shipment_number\` text NOT NULL,
  	\`version_order_id\` text(36) NOT NULL,
  	\`version_ship_from_address_id\` text(36),
  	\`version_ship_to_address_id\` text(36) NOT NULL,
  	\`version_carrier\` text,
  	\`version_tracking_number\` text,
  	\`version_tracking_url\` text,
  	\`version_shipping_cost\` numeric DEFAULT 0,
  	\`version_status\` text DEFAULT 'pending',
  	\`version_shipped_at\` text,
  	\`version_delivered_at\` text,
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`shipments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_order_id\`) REFERENCES \`sales_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_ship_from_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_ship_to_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__shipments_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_shipment_number", "version_order_id", "version_ship_from_address_id", "version_ship_to_address_id", "version_carrier", "version_tracking_number", "version_tracking_url", "version_shipping_cost", "version_status", "version_shipped_at", "version_delivered_at", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_shipment_number", "version_order_id", "version_ship_from_address_id", "version_ship_to_address_id", "version_carrier", "version_tracking_number", "version_tracking_url", "version_shipping_cost", "version_status", "version_shipped_at", "version_delivered_at", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_shipments_v\`;`)
  await db.run(sql`DROP TABLE \`_shipments_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__shipments_v\` RENAME TO \`_shipments_v\`;`)
  await db.run(sql`CREATE INDEX \`_shipments_v_parent_idx\` ON \`_shipments_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_version_version_uuid_idx\` ON \`_shipments_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_version_version_tenant_idx\` ON \`_shipments_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_version_version_shipment_number_idx\` ON \`_shipments_v\` (\`version_shipment_number\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_version_version_order_idx\` ON \`_shipments_v\` (\`version_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_version_version_ship_from_address_idx\` ON \`_shipments_v\` (\`version_ship_from_address_id\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_version_version_ship_to_address_idx\` ON \`_shipments_v\` (\`version_ship_to_address_id\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_version_version_tracking_number_idx\` ON \`_shipments_v\` (\`version_tracking_number\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_version_version_created_by_idx\` ON \`_shipments_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_version_version_approved_by_idx\` ON \`_shipments_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_version_version_updated_at_idx\` ON \`_shipments_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_version_version_created_at_idx\` ON \`_shipments_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_created_at_idx\` ON \`_shipments_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_updated_at_idx\` ON \`_shipments_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_contract_performance\` (
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
  await db.run(sql`INSERT INTO \`__new_contract_performance\`("id", "uuid", "tenant_id", "contract_id", "performance_obligation_index", "milestone_title", "milestone_sequence", "acceptance_criteria", "control_transfer_method", "planned_completion_date", "actual_completion_date", "completion_date_variance_days", "completion_status", "control_transferred_at", "associated_invoice_id", "revenue_recognized_amount", "currency", "revenue_recognized_at", "associated_sales_order_id", "zkod_zkod_acceptance_protocol_date", "zkod_zkod_acceptance_protocol_number", "zkod_mandatory_arbitration", "created_by_id", "approved_by_id", "approved_at", "performance_notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "contract_id", "performance_obligation_index", "milestone_title", "milestone_sequence", "acceptance_criteria", "control_transfer_method", "planned_completion_date", "actual_completion_date", "completion_date_variance_days", "completion_status", "control_transferred_at", "associated_invoice_id", "revenue_recognized_amount", "currency", "revenue_recognized_at", "associated_sales_order_id", "zkod_zkod_acceptance_protocol_date", "zkod_zkod_acceptance_protocol_number", "zkod_mandatory_arbitration", "created_by_id", "approved_by_id", "approved_at", "performance_notes", "updated_at", "created_at" FROM \`contract_performance\`;`)
  await db.run(sql`DROP TABLE \`contract_performance\`;`)
  await db.run(sql`ALTER TABLE \`__new_contract_performance\` RENAME TO \`contract_performance\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`contract_performance_uuid_idx\` ON \`contract_performance\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_tenant_idx\` ON \`contract_performance\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_contract_idx\` ON \`contract_performance\` (\`contract_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_associated_invoice_idx\` ON \`contract_performance\` (\`associated_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_associated_sales_order_idx\` ON \`contract_performance\` (\`associated_sales_order_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_created_by_idx\` ON \`contract_performance\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_approved_by_idx\` ON \`contract_performance\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_updated_at_idx\` ON \`contract_performance\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_created_at_idx\` ON \`contract_performance\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__contract_performance_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_contract_id\` text(36) NOT NULL,
  	\`version_performance_obligation_index\` numeric,
  	\`version_milestone_title\` text NOT NULL,
  	\`version_milestone_sequence\` numeric NOT NULL,
  	\`version_acceptance_criteria\` text NOT NULL,
  	\`version_control_transfer_method\` text NOT NULL,
  	\`version_planned_completion_date\` text NOT NULL,
  	\`version_actual_completion_date\` text,
  	\`version_completion_date_variance_days\` numeric,
  	\`version_completion_status\` text DEFAULT 'not_started' NOT NULL,
  	\`version_control_transferred_at\` text,
  	\`version_associated_invoice_id\` text(36),
  	\`version_revenue_recognized_amount\` numeric DEFAULT 0,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_revenue_recognized_at\` text,
  	\`version_associated_sales_order_id\` text(36),
  	\`version_zkod_zkod_acceptance_protocol_date\` text,
  	\`version_zkod_zkod_acceptance_protocol_number\` text,
  	\`version_zkod_mandatory_arbitration\` integer DEFAULT false,
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_performance_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`contract_performance\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_associated_invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_associated_sales_order_id\`) REFERENCES \`sales_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__contract_performance_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_contract_id", "version_performance_obligation_index", "version_milestone_title", "version_milestone_sequence", "version_acceptance_criteria", "version_control_transfer_method", "version_planned_completion_date", "version_actual_completion_date", "version_completion_date_variance_days", "version_completion_status", "version_control_transferred_at", "version_associated_invoice_id", "version_revenue_recognized_amount", "version_currency", "version_revenue_recognized_at", "version_associated_sales_order_id", "version_zkod_zkod_acceptance_protocol_date", "version_zkod_zkod_acceptance_protocol_number", "version_zkod_mandatory_arbitration", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_performance_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_contract_id", "version_performance_obligation_index", "version_milestone_title", "version_milestone_sequence", "version_acceptance_criteria", "version_control_transfer_method", "version_planned_completion_date", "version_actual_completion_date", "version_completion_date_variance_days", "version_completion_status", "version_control_transferred_at", "version_associated_invoice_id", "version_revenue_recognized_amount", "version_currency", "version_revenue_recognized_at", "version_associated_sales_order_id", "version_zkod_zkod_acceptance_protocol_date", "version_zkod_zkod_acceptance_protocol_number", "version_zkod_mandatory_arbitration", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_performance_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_contract_performance_v\`;`)
  await db.run(sql`DROP TABLE \`_contract_performance_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__contract_performance_v\` RENAME TO \`_contract_performance_v\`;`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_parent_idx\` ON \`_contract_performance_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_uuid_idx\` ON \`_contract_performance_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_tenant_idx\` ON \`_contract_performance_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_contract_idx\` ON \`_contract_performance_v\` (\`version_contract_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_associated_invoi_idx\` ON \`_contract_performance_v\` (\`version_associated_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_associated_sales_idx\` ON \`_contract_performance_v\` (\`version_associated_sales_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_created_by_idx\` ON \`_contract_performance_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_approved_by_idx\` ON \`_contract_performance_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_updated_at_idx\` ON \`_contract_performance_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_created_at_idx\` ON \`_contract_performance_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_created_at_idx\` ON \`_contract_performance_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_updated_at_idx\` ON \`_contract_performance_v\` (\`updated_at\`);`)
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
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_orders\`("id", "uuid", "tenant_id", "shipping_address_title", "shipping_address_first_name", "shipping_address_last_name", "shipping_address_company", "shipping_address_address_line1", "shipping_address_address_line2", "shipping_address_city", "shipping_address_state", "shipping_address_postal_code", "shipping_address_country", "shipping_address_phone", "customer_id", "customer_email", "status", "amount", "currency", "access_token", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "shipping_address_title", "shipping_address_first_name", "shipping_address_last_name", "shipping_address_company", "shipping_address_address_line1", "shipping_address_address_line2", "shipping_address_city", "shipping_address_state", "shipping_address_postal_code", "shipping_address_country", "shipping_address_phone", "customer_id", "customer_email", "status", "amount", "currency", "access_token", "updated_at", "created_at" FROM \`orders\`;`)
  await db.run(sql`DROP TABLE \`orders\`;`)
  await db.run(sql`ALTER TABLE \`__new_orders\` RENAME TO \`orders\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_uuid_idx\` ON \`orders\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`orders_tenant_idx\` ON \`orders\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_customer_idx\` ON \`orders\` (\`customer_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_access_token_idx\` ON \`orders\` (\`access_token\`);`)
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
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_customer_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__orders_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_shipping_address_title", "version_shipping_address_first_name", "version_shipping_address_last_name", "version_shipping_address_company", "version_shipping_address_address_line1", "version_shipping_address_address_line2", "version_shipping_address_city", "version_shipping_address_state", "version_shipping_address_postal_code", "version_shipping_address_country", "version_shipping_address_phone", "version_customer_id", "version_customer_email", "version_status", "version_amount", "version_currency", "version_access_token", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_shipping_address_title", "version_shipping_address_first_name", "version_shipping_address_last_name", "version_shipping_address_company", "version_shipping_address_address_line1", "version_shipping_address_address_line2", "version_shipping_address_city", "version_shipping_address_state", "version_shipping_address_postal_code", "version_shipping_address_country", "version_shipping_address_phone", "version_customer_id", "version_customer_email", "version_status", "version_amount", "version_currency", "version_access_token", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_orders_v\`;`)
  await db.run(sql`DROP TABLE \`_orders_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__orders_v\` RENAME TO \`_orders_v\`;`)
  await db.run(sql`CREATE INDEX \`_orders_v_parent_idx\` ON \`_orders_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_uuid_idx\` ON \`_orders_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_tenant_idx\` ON \`_orders_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_customer_idx\` ON \`_orders_v\` (\`version_customer_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_access_token_idx\` ON \`_orders_v\` (\`version_access_token\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_updated_at_idx\` ON \`_orders_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_created_at_idx\` ON \`_orders_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_created_at_idx\` ON \`_orders_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_updated_at_idx\` ON \`_orders_v\` (\`updated_at\`);`)
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
}
