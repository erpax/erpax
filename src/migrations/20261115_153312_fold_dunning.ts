import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`invoices_dunning_history\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`stage\` text NOT NULL,
  	\`entered_at\` text NOT NULL,
  	\`amount_overdue_at_entry\` numeric,
  	\`communication_sent\` text,
  	\`communication_reference\` text,
  	\`notes\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`invoices_dunning_history_order_idx\` ON \`invoices_dunning_history\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`invoices_dunning_history_parent_id_idx\` ON \`invoices_dunning_history\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_invoices_v_version_dunning_history\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`stage\` text NOT NULL,
  	\`entered_at\` text NOT NULL,
  	\`amount_overdue_at_entry\` numeric,
  	\`communication_sent\` text,
  	\`communication_reference\` text,
  	\`notes\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_invoices_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_dunning_history_order_idx\` ON \`_invoices_v_version_dunning_history\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_dunning_history_parent_id_idx\` ON \`_invoices_v_version_dunning_history\` (\`_parent_id\`);`)
  await db.run(sql`DROP TABLE \`dunning_cycles_history\`;`)
  await db.run(sql`DROP TABLE \`dunning_cycles_history_locales\`;`)
  await db.run(sql`DROP TABLE \`dunning_cycles\`;`)
  await db.run(sql`DROP TABLE \`dunning_cycles_rels\`;`)
  await db.run(sql`DROP TABLE \`_dunning_cycles_v_version_history\`;`)
  await db.run(sql`DROP TABLE \`_dunning_cycles_v_version_history_locales\`;`)
  await db.run(sql`DROP TABLE \`_dunning_cycles_v\`;`)
  await db.run(sql`DROP TABLE \`_dunning_cycles_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`invoices\` ADD \`dunning_stage\` text;`)
  await db.run(sql`ALTER TABLE \`invoices\` ADD \`dunning_stage_entered_at\` text;`)
  await db.run(sql`ALTER TABLE \`invoices\` ADD \`dunning_next_action_date\` text;`)
  await db.run(sql`ALTER TABLE \`invoices\` ADD \`dunning_status\` text;`)
  await db.run(sql`ALTER TABLE \`invoices\` ADD \`dunning_resolved_at\` text;`)
  await db.run(sql`ALTER TABLE \`invoices\` ADD \`dunning_paused\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`invoices\` ADD \`dunning_pause_reason\` text;`)
  await db.run(sql`ALTER TABLE \`invoices\` ADD \`dunning_payment_plan_ref\` text;`)
  await db.run(sql`ALTER TABLE \`invoices\` ADD \`dunning_ecl_provision\` numeric;`)
  await db.run(sql`ALTER TABLE \`invoices\` ADD \`dunning_write_off_journal_entry_id\` text(36) REFERENCES journal_entries(id);`)
  await db.run(sql`CREATE INDEX \`invoices_dunning_dunning_write_off_journal_entry_idx\` ON \`invoices\` (\`dunning_write_off_journal_entry_id\`);`)
  await db.run(sql`ALTER TABLE \`_invoices_v\` ADD \`version_dunning_stage\` text;`)
  await db.run(sql`ALTER TABLE \`_invoices_v\` ADD \`version_dunning_stage_entered_at\` text;`)
  await db.run(sql`ALTER TABLE \`_invoices_v\` ADD \`version_dunning_next_action_date\` text;`)
  await db.run(sql`ALTER TABLE \`_invoices_v\` ADD \`version_dunning_status\` text;`)
  await db.run(sql`ALTER TABLE \`_invoices_v\` ADD \`version_dunning_resolved_at\` text;`)
  await db.run(sql`ALTER TABLE \`_invoices_v\` ADD \`version_dunning_paused\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_invoices_v\` ADD \`version_dunning_pause_reason\` text;`)
  await db.run(sql`ALTER TABLE \`_invoices_v\` ADD \`version_dunning_payment_plan_ref\` text;`)
  await db.run(sql`ALTER TABLE \`_invoices_v\` ADD \`version_dunning_ecl_provision\` numeric;`)
  await db.run(sql`ALTER TABLE \`_invoices_v\` ADD \`version_dunning_write_off_journal_entry_id\` text(36) REFERENCES journal_entries(id);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_dunning_version_dunning_write_off_jo_idx\` ON \`_invoices_v\` (\`version_dunning_write_off_journal_entry_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`dunning_cycles_history\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`stage\` text NOT NULL,
  	\`entered_at\` text NOT NULL,
  	\`amount_overdue_at_entry\` numeric,
  	\`communication_sent\` text,
  	\`communication_reference\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`dunning_cycles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`dunning_cycles_history_order_idx\` ON \`dunning_cycles_history\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_history_parent_id_idx\` ON \`dunning_cycles_history\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`dunning_cycles_history_locales\` (
  	\`notes\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`dunning_cycles_history\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`dunning_cycles_history_locales_parent_id_locale_unique\` ON \`dunning_cycles_history_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`dunning_cycles\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`cycle_id\` text NOT NULL,
  	\`invoice_id\` text(36) NOT NULL,
  	\`customer_id\` text(36),
  	\`currency\` text DEFAULT 'EUR',
  	\`amount_overdue\` numeric NOT NULL,
  	\`invoice_due_date\` text NOT NULL,
  	\`days_past_due\` numeric,
  	\`current_stage\` text DEFAULT 'reminder' NOT NULL,
  	\`current_stage_entered_at\` text,
  	\`next_action_date\` text,
  	\`paused\` integer DEFAULT false,
  	\`pause_reason\` text,
  	\`payment_plan_ref\` text,
  	\`ecl_provision\` numeric,
  	\`write_off_journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'active',
  	\`resolved_at\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`write_off_journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`dunning_cycles_uuid_idx\` ON \`dunning_cycles\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_tenant_idx\` ON \`dunning_cycles\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_invoice_idx\` ON \`dunning_cycles\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_customer_idx\` ON \`dunning_cycles\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_write_off_journal_entry_idx\` ON \`dunning_cycles\` (\`write_off_journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_created_by_idx\` ON \`dunning_cycles\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_approved_by_idx\` ON \`dunning_cycles\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_updated_at_idx\` ON \`dunning_cycles\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_created_at_idx\` ON \`dunning_cycles\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_cycleId_idx\` ON \`dunning_cycles\` (\`tenant_id\`,\`cycle_id\`);`)
  await db.run(sql`CREATE TABLE \`dunning_cycles_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`dunning_cycles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`dunning_cycles_rels_order_idx\` ON \`dunning_cycles_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_rels_parent_idx\` ON \`dunning_cycles_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_rels_path_idx\` ON \`dunning_cycles_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_rels_users_id_idx\` ON \`dunning_cycles_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_dunning_cycles_v_version_history\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`stage\` text NOT NULL,
  	\`entered_at\` text NOT NULL,
  	\`amount_overdue_at_entry\` numeric,
  	\`communication_sent\` text,
  	\`communication_reference\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_dunning_cycles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_dunning_cycles_v_version_history_order_idx\` ON \`_dunning_cycles_v_version_history\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_dunning_cycles_v_version_history_parent_id_idx\` ON \`_dunning_cycles_v_version_history\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_dunning_cycles_v_version_history_locales\` (
  	\`notes\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_dunning_cycles_v_version_history\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_dunning_cycles_v_version_history_locales_parent_id_locale_u\` ON \`_dunning_cycles_v_version_history_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_dunning_cycles_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_cycle_id\` text NOT NULL,
  	\`version_invoice_id\` text(36) NOT NULL,
  	\`version_customer_id\` text(36),
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_amount_overdue\` numeric NOT NULL,
  	\`version_invoice_due_date\` text NOT NULL,
  	\`version_days_past_due\` numeric,
  	\`version_current_stage\` text DEFAULT 'reminder' NOT NULL,
  	\`version_current_stage_entered_at\` text,
  	\`version_next_action_date\` text,
  	\`version_paused\` integer DEFAULT false,
  	\`version_pause_reason\` text,
  	\`version_payment_plan_ref\` text,
  	\`version_ecl_provision\` numeric,
  	\`version_write_off_journal_entry_id\` text(36),
  	\`version_status\` text DEFAULT 'active',
  	\`version_resolved_at\` text,
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`dunning_cycles\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_customer_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_write_off_journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_dunning_cycles_v_parent_idx\` ON \`_dunning_cycles_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_dunning_cycles_v_version_version_uuid_idx\` ON \`_dunning_cycles_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_dunning_cycles_v_version_version_tenant_idx\` ON \`_dunning_cycles_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_dunning_cycles_v_version_version_invoice_idx\` ON \`_dunning_cycles_v\` (\`version_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`_dunning_cycles_v_version_version_customer_idx\` ON \`_dunning_cycles_v\` (\`version_customer_id\`);`)
  await db.run(sql`CREATE INDEX \`_dunning_cycles_v_version_version_write_off_journal_entr_idx\` ON \`_dunning_cycles_v\` (\`version_write_off_journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`_dunning_cycles_v_version_version_created_by_idx\` ON \`_dunning_cycles_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_dunning_cycles_v_version_version_approved_by_idx\` ON \`_dunning_cycles_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_dunning_cycles_v_version_version_updated_at_idx\` ON \`_dunning_cycles_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_dunning_cycles_v_version_version_created_at_idx\` ON \`_dunning_cycles_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_dunning_cycles_v_created_at_idx\` ON \`_dunning_cycles_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_dunning_cycles_v_updated_at_idx\` ON \`_dunning_cycles_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_cycleId_idx\` ON \`_dunning_cycles_v\` (\`version_tenant_id\`,\`version_cycle_id\`);`)
  await db.run(sql`CREATE TABLE \`_dunning_cycles_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_dunning_cycles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_dunning_cycles_v_rels_order_idx\` ON \`_dunning_cycles_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_dunning_cycles_v_rels_parent_idx\` ON \`_dunning_cycles_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_dunning_cycles_v_rels_path_idx\` ON \`_dunning_cycles_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_dunning_cycles_v_rels_users_id_idx\` ON \`_dunning_cycles_v_rels\` (\`users_id\`);`)
  await db.run(sql`DROP TABLE \`invoices_dunning_history\`;`)
  await db.run(sql`DROP TABLE \`_invoices_v_version_dunning_history\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_invoices\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`type_status_invoice_type\` text NOT NULL,
  	\`type_status_invoice_type_code\` text,
  	\`type_status_confirmed\` integer DEFAULT false,
  	\`status\` text DEFAULT 'draft',
  	\`number\` text,
  	\`protocol_number\` text,
  	\`purchase_order\` text,
  	\`sales_order\` text,
  	\`parties_seller_id\` text(36) NOT NULL,
  	\`parties_seller_agent_id\` text(36),
  	\`parties_buyer_id\` text(36) NOT NULL,
  	\`parties_buyer_agent_id\` text(36),
  	\`parties_supplier_id\` text(36),
  	\`parties_consignee_id\` text(36),
  	\`dates_date\` text,
  	\`dates_issued_at\` text,
  	\`dates_order_date\` text,
  	\`dates_proforma_date\` text,
  	\`dates_protocol_date\` text,
  	\`dates_payment_date\` text,
  	\`dates_paid_at\` text,
  	\`dates_delivered_at\` text,
  	\`dates_cancelled_at\` text,
  	\`dates_due_at\` text,
  	\`dates_past_due_since_at\` text,
  	\`dates_grace_period_ends_at\` text,
  	\`dates_suspension_scheduled_for\` text,
  	\`amounts_item_total\` numeric DEFAULT 0 NOT NULL,
  	\`amounts_discount_total\` numeric DEFAULT 0,
  	\`amounts_allowances_total\` numeric DEFAULT 0,
  	\`amounts_charges_total\` numeric DEFAULT 0,
  	\`amounts_net_total\` numeric DEFAULT 0,
  	\`amounts_tax_total\` numeric DEFAULT 0,
  	\`amounts_total_amount\` numeric DEFAULT 0 NOT NULL,
  	\`amounts_prepaid_amount\` numeric DEFAULT 0,
  	\`amounts_rounding_amount\` numeric DEFAULT 0,
  	\`amounts_total_paid\` numeric DEFAULT 0,
  	\`amounts_total_due\` numeric DEFAULT 0,
  	\`billing_tax_currency_code\` text DEFAULT 'EUR' NOT NULL,
  	\`billing_tax_exchange_rate\` numeric,
  	\`billing_tax_tax_type\` text,
  	\`billing_tax_taxes_included\` integer DEFAULT false,
  	\`billing_tax_tax_note\` text,
  	\`recurring_billing_period\` text,
  	\`recurring_next_billing_date\` text,
  	\`recurring_period_start\` text,
  	\`recurring_period_end\` text,
  	\`recurring_subscription_id\` text(36),
  	\`recurring_stripe_invoice_id\` text,
  	\`recurring_stripe_payment_intent_id\` text,
  	\`recurring_attempt_count\` numeric DEFAULT 0,
  	\`recurring_last_attempt_at\` text,
  	\`recurring_last_attempt_error\` text,
  	\`ledger_debit_account_id\` text,
  	\`ledger_credit_account_id\` text,
  	\`notes_note\` text,
  	\`notes_invoice_note\` text,
  	\`notes_delivery_note\` text,
  	\`notes_delivery_terms\` text,
  	\`notes_payment_terms\` text,
  	\`notes_payment_methods\` text,
  	\`relationships_parent_id\` text(36),
  	\`relationships_order_id\` text(36),
  	\`relationships_domain_id\` text(36),
  	\`fiscal_unp\` text,
  	\`fiscal_unp_sequence\` numeric,
  	\`fiscal_fiscal_device_id\` text(36),
  	\`fiscal_fiscal_device_number\` text,
  	\`fiscal_operator_code\` text DEFAULT '0000',
  	\`fiscal_terminal_id\` text(36),
  	\`fiscal_receipt_number\` text,
  	\`fiscal_receipt_id\` text(36),
  	\`fiscal_qr_data\` text,
  	\`fiscal_status\` text DEFAULT 'open',
  	\`fiscal_reversal_of_id\` text(36),
  	\`fiscal_reversed_by_id\` text(36),
  	\`test\` integer DEFAULT false,
  	\`metadata\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parties_seller_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parties_seller_agent_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parties_buyer_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parties_buyer_agent_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parties_supplier_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parties_consignee_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`recurring_subscription_id\`) REFERENCES \`subscriptions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`relationships_parent_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`relationships_order_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`relationships_domain_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fiscal_fiscal_device_id\`) REFERENCES \`fiscal_devices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fiscal_terminal_id\`) REFERENCES \`terminals\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fiscal_receipt_id\`) REFERENCES \`receipts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fiscal_reversal_of_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fiscal_reversed_by_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_invoices\`("id", "uuid", "tenant_id", "type_status_invoice_type", "type_status_invoice_type_code", "type_status_confirmed", "status", "number", "protocol_number", "purchase_order", "sales_order", "parties_seller_id", "parties_seller_agent_id", "parties_buyer_id", "parties_buyer_agent_id", "parties_supplier_id", "parties_consignee_id", "dates_date", "dates_issued_at", "dates_order_date", "dates_proforma_date", "dates_protocol_date", "dates_payment_date", "dates_paid_at", "dates_delivered_at", "dates_cancelled_at", "dates_due_at", "dates_past_due_since_at", "dates_grace_period_ends_at", "dates_suspension_scheduled_for", "amounts_item_total", "amounts_discount_total", "amounts_allowances_total", "amounts_charges_total", "amounts_net_total", "amounts_tax_total", "amounts_total_amount", "amounts_prepaid_amount", "amounts_rounding_amount", "amounts_total_paid", "amounts_total_due", "billing_tax_currency_code", "billing_tax_exchange_rate", "billing_tax_tax_type", "billing_tax_taxes_included", "billing_tax_tax_note", "recurring_billing_period", "recurring_next_billing_date", "recurring_period_start", "recurring_period_end", "recurring_subscription_id", "recurring_stripe_invoice_id", "recurring_stripe_payment_intent_id", "recurring_attempt_count", "recurring_last_attempt_at", "recurring_last_attempt_error", "ledger_debit_account_id", "ledger_credit_account_id", "notes_note", "notes_invoice_note", "notes_delivery_note", "notes_delivery_terms", "notes_payment_terms", "notes_payment_methods", "relationships_parent_id", "relationships_order_id", "relationships_domain_id", "fiscal_unp", "fiscal_unp_sequence", "fiscal_fiscal_device_id", "fiscal_fiscal_device_number", "fiscal_operator_code", "fiscal_terminal_id", "fiscal_receipt_number", "fiscal_receipt_id", "fiscal_qr_data", "fiscal_status", "fiscal_reversal_of_id", "fiscal_reversed_by_id", "test", "metadata", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "type_status_invoice_type", "type_status_invoice_type_code", "type_status_confirmed", "status", "number", "protocol_number", "purchase_order", "sales_order", "parties_seller_id", "parties_seller_agent_id", "parties_buyer_id", "parties_buyer_agent_id", "parties_supplier_id", "parties_consignee_id", "dates_date", "dates_issued_at", "dates_order_date", "dates_proforma_date", "dates_protocol_date", "dates_payment_date", "dates_paid_at", "dates_delivered_at", "dates_cancelled_at", "dates_due_at", "dates_past_due_since_at", "dates_grace_period_ends_at", "dates_suspension_scheduled_for", "amounts_item_total", "amounts_discount_total", "amounts_allowances_total", "amounts_charges_total", "amounts_net_total", "amounts_tax_total", "amounts_total_amount", "amounts_prepaid_amount", "amounts_rounding_amount", "amounts_total_paid", "amounts_total_due", "billing_tax_currency_code", "billing_tax_exchange_rate", "billing_tax_tax_type", "billing_tax_taxes_included", "billing_tax_tax_note", "recurring_billing_period", "recurring_next_billing_date", "recurring_period_start", "recurring_period_end", "recurring_subscription_id", "recurring_stripe_invoice_id", "recurring_stripe_payment_intent_id", "recurring_attempt_count", "recurring_last_attempt_at", "recurring_last_attempt_error", "ledger_debit_account_id", "ledger_credit_account_id", "notes_note", "notes_invoice_note", "notes_delivery_note", "notes_delivery_terms", "notes_payment_terms", "notes_payment_methods", "relationships_parent_id", "relationships_order_id", "relationships_domain_id", "fiscal_unp", "fiscal_unp_sequence", "fiscal_fiscal_device_id", "fiscal_fiscal_device_number", "fiscal_operator_code", "fiscal_terminal_id", "fiscal_receipt_number", "fiscal_receipt_id", "fiscal_qr_data", "fiscal_status", "fiscal_reversal_of_id", "fiscal_reversed_by_id", "test", "metadata", "updated_at", "created_at" FROM \`invoices\`;`)
  await db.run(sql`DROP TABLE \`invoices\`;`)
  await db.run(sql`ALTER TABLE \`__new_invoices\` RENAME TO \`invoices\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`invoices_uuid_idx\` ON \`invoices\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`invoices_tenant_idx\` ON \`invoices\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_type_status_type_status_invoice_type_idx\` ON \`invoices\` (\`type_status_invoice_type\`);`)
  await db.run(sql`CREATE INDEX \`invoices_status_idx\` ON \`invoices\` (\`status\`);`)
  await db.run(sql`CREATE INDEX \`invoices_parties_parties_seller_idx\` ON \`invoices\` (\`parties_seller_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_parties_parties_seller_agent_idx\` ON \`invoices\` (\`parties_seller_agent_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_parties_parties_buyer_idx\` ON \`invoices\` (\`parties_buyer_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_parties_parties_buyer_agent_idx\` ON \`invoices\` (\`parties_buyer_agent_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_parties_parties_supplier_idx\` ON \`invoices\` (\`parties_supplier_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_parties_parties_consignee_idx\` ON \`invoices\` (\`parties_consignee_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_dates_dates_date_idx\` ON \`invoices\` (\`dates_date\`);`)
  await db.run(sql`CREATE INDEX \`invoices_dates_dates_due_at_idx\` ON \`invoices\` (\`dates_due_at\`);`)
  await db.run(sql`CREATE INDEX \`invoices_dates_dates_past_due_since_at_idx\` ON \`invoices\` (\`dates_past_due_since_at\`);`)
  await db.run(sql`CREATE INDEX \`invoices_recurring_recurring_next_billing_date_idx\` ON \`invoices\` (\`recurring_next_billing_date\`);`)
  await db.run(sql`CREATE INDEX \`invoices_recurring_recurring_subscription_idx\` ON \`invoices\` (\`recurring_subscription_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_recurring_recurring_stripe_invoice_id_idx\` ON \`invoices\` (\`recurring_stripe_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_ledger_ledger_debit_account_idx\` ON \`invoices\` (\`ledger_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_ledger_ledger_credit_account_idx\` ON \`invoices\` (\`ledger_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_relationships_relationships_parent_idx\` ON \`invoices\` (\`relationships_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_relationships_relationships_order_idx\` ON \`invoices\` (\`relationships_order_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_relationships_relationships_domain_idx\` ON \`invoices\` (\`relationships_domain_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`invoices_fiscal_fiscal_unp_idx\` ON \`invoices\` (\`fiscal_unp\`);`)
  await db.run(sql`CREATE INDEX \`invoices_fiscal_fiscal_fiscal_device_idx\` ON \`invoices\` (\`fiscal_fiscal_device_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_fiscal_fiscal_fiscal_device_number_idx\` ON \`invoices\` (\`fiscal_fiscal_device_number\`);`)
  await db.run(sql`CREATE INDEX \`invoices_fiscal_fiscal_terminal_idx\` ON \`invoices\` (\`fiscal_terminal_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_fiscal_fiscal_receipt_idx\` ON \`invoices\` (\`fiscal_receipt_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_fiscal_fiscal_reversal_of_idx\` ON \`invoices\` (\`fiscal_reversal_of_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_fiscal_fiscal_reversed_by_idx\` ON \`invoices\` (\`fiscal_reversed_by_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_updated_at_idx\` ON \`invoices\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`invoices_created_at_idx\` ON \`invoices\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_number_idx\` ON \`invoices\` (\`tenant_id\`,\`number\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_protocolNumber_idx\` ON \`invoices\` (\`tenant_id\`,\`protocol_number\`);`)
  await db.run(sql`CREATE TABLE \`__new__invoices_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_type_status_invoice_type\` text NOT NULL,
  	\`version_type_status_invoice_type_code\` text,
  	\`version_type_status_confirmed\` integer DEFAULT false,
  	\`version_status\` text DEFAULT 'draft',
  	\`version_number\` text,
  	\`version_protocol_number\` text,
  	\`version_purchase_order\` text,
  	\`version_sales_order\` text,
  	\`version_parties_seller_id\` text(36) NOT NULL,
  	\`version_parties_seller_agent_id\` text(36),
  	\`version_parties_buyer_id\` text(36) NOT NULL,
  	\`version_parties_buyer_agent_id\` text(36),
  	\`version_parties_supplier_id\` text(36),
  	\`version_parties_consignee_id\` text(36),
  	\`version_dates_date\` text,
  	\`version_dates_issued_at\` text,
  	\`version_dates_order_date\` text,
  	\`version_dates_proforma_date\` text,
  	\`version_dates_protocol_date\` text,
  	\`version_dates_payment_date\` text,
  	\`version_dates_paid_at\` text,
  	\`version_dates_delivered_at\` text,
  	\`version_dates_cancelled_at\` text,
  	\`version_dates_due_at\` text,
  	\`version_dates_past_due_since_at\` text,
  	\`version_dates_grace_period_ends_at\` text,
  	\`version_dates_suspension_scheduled_for\` text,
  	\`version_amounts_item_total\` numeric DEFAULT 0 NOT NULL,
  	\`version_amounts_discount_total\` numeric DEFAULT 0,
  	\`version_amounts_allowances_total\` numeric DEFAULT 0,
  	\`version_amounts_charges_total\` numeric DEFAULT 0,
  	\`version_amounts_net_total\` numeric DEFAULT 0,
  	\`version_amounts_tax_total\` numeric DEFAULT 0,
  	\`version_amounts_total_amount\` numeric DEFAULT 0 NOT NULL,
  	\`version_amounts_prepaid_amount\` numeric DEFAULT 0,
  	\`version_amounts_rounding_amount\` numeric DEFAULT 0,
  	\`version_amounts_total_paid\` numeric DEFAULT 0,
  	\`version_amounts_total_due\` numeric DEFAULT 0,
  	\`version_billing_tax_currency_code\` text DEFAULT 'EUR' NOT NULL,
  	\`version_billing_tax_exchange_rate\` numeric,
  	\`version_billing_tax_tax_type\` text,
  	\`version_billing_tax_taxes_included\` integer DEFAULT false,
  	\`version_billing_tax_tax_note\` text,
  	\`version_recurring_billing_period\` text,
  	\`version_recurring_next_billing_date\` text,
  	\`version_recurring_period_start\` text,
  	\`version_recurring_period_end\` text,
  	\`version_recurring_subscription_id\` text(36),
  	\`version_recurring_stripe_invoice_id\` text,
  	\`version_recurring_stripe_payment_intent_id\` text,
  	\`version_recurring_attempt_count\` numeric DEFAULT 0,
  	\`version_recurring_last_attempt_at\` text,
  	\`version_recurring_last_attempt_error\` text,
  	\`version_ledger_debit_account_id\` text,
  	\`version_ledger_credit_account_id\` text,
  	\`version_notes_note\` text,
  	\`version_notes_invoice_note\` text,
  	\`version_notes_delivery_note\` text,
  	\`version_notes_delivery_terms\` text,
  	\`version_notes_payment_terms\` text,
  	\`version_notes_payment_methods\` text,
  	\`version_relationships_parent_id\` text(36),
  	\`version_relationships_order_id\` text(36),
  	\`version_relationships_domain_id\` text(36),
  	\`version_fiscal_unp\` text,
  	\`version_fiscal_unp_sequence\` numeric,
  	\`version_fiscal_fiscal_device_id\` text(36),
  	\`version_fiscal_fiscal_device_number\` text,
  	\`version_fiscal_operator_code\` text DEFAULT '0000',
  	\`version_fiscal_terminal_id\` text(36),
  	\`version_fiscal_receipt_number\` text,
  	\`version_fiscal_receipt_id\` text(36),
  	\`version_fiscal_qr_data\` text,
  	\`version_fiscal_status\` text DEFAULT 'open',
  	\`version_fiscal_reversal_of_id\` text(36),
  	\`version_fiscal_reversed_by_id\` text(36),
  	\`version_test\` integer DEFAULT false,
  	\`version_metadata\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parties_seller_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parties_seller_agent_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parties_buyer_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parties_buyer_agent_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parties_supplier_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parties_consignee_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_recurring_subscription_id\`) REFERENCES \`subscriptions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_ledger_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_ledger_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_relationships_parent_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_relationships_order_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_relationships_domain_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_fiscal_fiscal_device_id\`) REFERENCES \`fiscal_devices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_fiscal_terminal_id\`) REFERENCES \`terminals\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_fiscal_receipt_id\`) REFERENCES \`receipts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_fiscal_reversal_of_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_fiscal_reversed_by_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__invoices_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_type_status_invoice_type", "version_type_status_invoice_type_code", "version_type_status_confirmed", "version_status", "version_number", "version_protocol_number", "version_purchase_order", "version_sales_order", "version_parties_seller_id", "version_parties_seller_agent_id", "version_parties_buyer_id", "version_parties_buyer_agent_id", "version_parties_supplier_id", "version_parties_consignee_id", "version_dates_date", "version_dates_issued_at", "version_dates_order_date", "version_dates_proforma_date", "version_dates_protocol_date", "version_dates_payment_date", "version_dates_paid_at", "version_dates_delivered_at", "version_dates_cancelled_at", "version_dates_due_at", "version_dates_past_due_since_at", "version_dates_grace_period_ends_at", "version_dates_suspension_scheduled_for", "version_amounts_item_total", "version_amounts_discount_total", "version_amounts_allowances_total", "version_amounts_charges_total", "version_amounts_net_total", "version_amounts_tax_total", "version_amounts_total_amount", "version_amounts_prepaid_amount", "version_amounts_rounding_amount", "version_amounts_total_paid", "version_amounts_total_due", "version_billing_tax_currency_code", "version_billing_tax_exchange_rate", "version_billing_tax_tax_type", "version_billing_tax_taxes_included", "version_billing_tax_tax_note", "version_recurring_billing_period", "version_recurring_next_billing_date", "version_recurring_period_start", "version_recurring_period_end", "version_recurring_subscription_id", "version_recurring_stripe_invoice_id", "version_recurring_stripe_payment_intent_id", "version_recurring_attempt_count", "version_recurring_last_attempt_at", "version_recurring_last_attempt_error", "version_ledger_debit_account_id", "version_ledger_credit_account_id", "version_notes_note", "version_notes_invoice_note", "version_notes_delivery_note", "version_notes_delivery_terms", "version_notes_payment_terms", "version_notes_payment_methods", "version_relationships_parent_id", "version_relationships_order_id", "version_relationships_domain_id", "version_fiscal_unp", "version_fiscal_unp_sequence", "version_fiscal_fiscal_device_id", "version_fiscal_fiscal_device_number", "version_fiscal_operator_code", "version_fiscal_terminal_id", "version_fiscal_receipt_number", "version_fiscal_receipt_id", "version_fiscal_qr_data", "version_fiscal_status", "version_fiscal_reversal_of_id", "version_fiscal_reversed_by_id", "version_test", "version_metadata", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_type_status_invoice_type", "version_type_status_invoice_type_code", "version_type_status_confirmed", "version_status", "version_number", "version_protocol_number", "version_purchase_order", "version_sales_order", "version_parties_seller_id", "version_parties_seller_agent_id", "version_parties_buyer_id", "version_parties_buyer_agent_id", "version_parties_supplier_id", "version_parties_consignee_id", "version_dates_date", "version_dates_issued_at", "version_dates_order_date", "version_dates_proforma_date", "version_dates_protocol_date", "version_dates_payment_date", "version_dates_paid_at", "version_dates_delivered_at", "version_dates_cancelled_at", "version_dates_due_at", "version_dates_past_due_since_at", "version_dates_grace_period_ends_at", "version_dates_suspension_scheduled_for", "version_amounts_item_total", "version_amounts_discount_total", "version_amounts_allowances_total", "version_amounts_charges_total", "version_amounts_net_total", "version_amounts_tax_total", "version_amounts_total_amount", "version_amounts_prepaid_amount", "version_amounts_rounding_amount", "version_amounts_total_paid", "version_amounts_total_due", "version_billing_tax_currency_code", "version_billing_tax_exchange_rate", "version_billing_tax_tax_type", "version_billing_tax_taxes_included", "version_billing_tax_tax_note", "version_recurring_billing_period", "version_recurring_next_billing_date", "version_recurring_period_start", "version_recurring_period_end", "version_recurring_subscription_id", "version_recurring_stripe_invoice_id", "version_recurring_stripe_payment_intent_id", "version_recurring_attempt_count", "version_recurring_last_attempt_at", "version_recurring_last_attempt_error", "version_ledger_debit_account_id", "version_ledger_credit_account_id", "version_notes_note", "version_notes_invoice_note", "version_notes_delivery_note", "version_notes_delivery_terms", "version_notes_payment_terms", "version_notes_payment_methods", "version_relationships_parent_id", "version_relationships_order_id", "version_relationships_domain_id", "version_fiscal_unp", "version_fiscal_unp_sequence", "version_fiscal_fiscal_device_id", "version_fiscal_fiscal_device_number", "version_fiscal_operator_code", "version_fiscal_terminal_id", "version_fiscal_receipt_number", "version_fiscal_receipt_id", "version_fiscal_qr_data", "version_fiscal_status", "version_fiscal_reversal_of_id", "version_fiscal_reversed_by_id", "version_test", "version_metadata", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_invoices_v\`;`)
  await db.run(sql`DROP TABLE \`_invoices_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__invoices_v\` RENAME TO \`_invoices_v\`;`)
  await db.run(sql`CREATE INDEX \`_invoices_v_parent_idx\` ON \`_invoices_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_version_uuid_idx\` ON \`_invoices_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_version_tenant_idx\` ON \`_invoices_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_type_status_version_type_status_invo_idx\` ON \`_invoices_v\` (\`version_type_status_invoice_type\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_version_status_idx\` ON \`_invoices_v\` (\`version_status\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_parties_version_parties_seller_idx\` ON \`_invoices_v\` (\`version_parties_seller_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_parties_version_parties_seller_agent_idx\` ON \`_invoices_v\` (\`version_parties_seller_agent_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_parties_version_parties_buyer_idx\` ON \`_invoices_v\` (\`version_parties_buyer_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_parties_version_parties_buyer_agent_idx\` ON \`_invoices_v\` (\`version_parties_buyer_agent_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_parties_version_parties_supplier_idx\` ON \`_invoices_v\` (\`version_parties_supplier_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_parties_version_parties_consignee_idx\` ON \`_invoices_v\` (\`version_parties_consignee_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_dates_version_dates_date_idx\` ON \`_invoices_v\` (\`version_dates_date\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_dates_version_dates_due_at_idx\` ON \`_invoices_v\` (\`version_dates_due_at\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_dates_version_dates_past_due_since_a_idx\` ON \`_invoices_v\` (\`version_dates_past_due_since_at\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_recurring_version_recurring_next_bil_idx\` ON \`_invoices_v\` (\`version_recurring_next_billing_date\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_recurring_version_recurring_subscrip_idx\` ON \`_invoices_v\` (\`version_recurring_subscription_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_recurring_version_recurring_stripe_i_idx\` ON \`_invoices_v\` (\`version_recurring_stripe_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_ledger_version_ledger_debit_account_idx\` ON \`_invoices_v\` (\`version_ledger_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_ledger_version_ledger_credit_account_idx\` ON \`_invoices_v\` (\`version_ledger_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_relationships_version_relationships__idx\` ON \`_invoices_v\` (\`version_relationships_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_relationships_version_relationship_1_idx\` ON \`_invoices_v\` (\`version_relationships_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_relationships_version_relationship_2_idx\` ON \`_invoices_v\` (\`version_relationships_domain_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_fiscal_version_fiscal_unp_idx\` ON \`_invoices_v\` (\`version_fiscal_unp\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_fiscal_version_fiscal_fiscal_device_idx\` ON \`_invoices_v\` (\`version_fiscal_fiscal_device_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_fiscal_version_fiscal_fiscal_device__idx\` ON \`_invoices_v\` (\`version_fiscal_fiscal_device_number\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_fiscal_version_fiscal_terminal_idx\` ON \`_invoices_v\` (\`version_fiscal_terminal_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_fiscal_version_fiscal_receipt_idx\` ON \`_invoices_v\` (\`version_fiscal_receipt_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_fiscal_version_fiscal_reversal_of_idx\` ON \`_invoices_v\` (\`version_fiscal_reversal_of_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_fiscal_version_fiscal_reversed_by_idx\` ON \`_invoices_v\` (\`version_fiscal_reversed_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_version_updated_at_idx\` ON \`_invoices_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_version_version_created_at_idx\` ON \`_invoices_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_created_at_idx\` ON \`_invoices_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_updated_at_idx\` ON \`_invoices_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_number_idx\` ON \`_invoices_v\` (\`version_tenant_id\`,\`version_number\`);`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_protocolNumber_idx\` ON \`_invoices_v\` (\`version_tenant_id\`,\`version_protocol_number\`);`)
}
