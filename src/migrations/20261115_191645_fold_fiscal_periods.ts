import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`fiscal_periods_subsequent_events\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`event_date\` text NOT NULL,
  	\`classification\` text NOT NULL,
  	\`event_kind\` text NOT NULL,
  	\`estimated_impact\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'identified',
  	\`journal_entry_id\` text(36),
  	\`disclosed_in_f_s\` integer DEFAULT false,
  	\`source_collection\` text,
  	\`source_id\` text,
  	\`notes\` text,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`fiscal_periods_subsequent_events_order_idx\` ON \`fiscal_periods_subsequent_events\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_subsequent_events_parent_id_idx\` ON \`fiscal_periods_subsequent_events\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_subsequent_events_journal_entry_idx\` ON \`fiscal_periods_subsequent_events\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`fiscal_periods_subsequent_events_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`fiscal_periods_subsequent_events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`fiscal_periods_subsequent_events_locales_parent_id_locale_un\` ON \`fiscal_periods_subsequent_events_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_fiscal_periods_v_version_subsequent_events\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`event_date\` text NOT NULL,
  	\`classification\` text NOT NULL,
  	\`event_kind\` text NOT NULL,
  	\`estimated_impact\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'identified',
  	\`journal_entry_id\` text(36),
  	\`disclosed_in_f_s\` integer DEFAULT false,
  	\`source_collection\` text,
  	\`source_id\` text,
  	\`notes\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_fiscal_periods_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_fiscal_periods_v_version_subsequent_events_order_idx\` ON \`_fiscal_periods_v_version_subsequent_events\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_fiscal_periods_v_version_subsequent_events_parent_id_idx\` ON \`_fiscal_periods_v_version_subsequent_events\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_fiscal_periods_v_version_subsequent_events_journal_entr_idx\` ON \`_fiscal_periods_v_version_subsequent_events\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`_fiscal_periods_v_version_subsequent_events_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_fiscal_periods_v_version_subsequent_events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_fiscal_periods_v_version_subsequent_events_locales_parent_i\` ON \`_fiscal_periods_v_version_subsequent_events_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP TABLE \`post_balance_sheet_events\`;`)
  await db.run(sql`DROP TABLE \`post_balance_sheet_events_locales\`;`)
  await db.run(sql`DROP TABLE \`post_balance_sheet_events_rels\`;`)
  await db.run(sql`DROP TABLE \`_post_balance_sheet_events_v\`;`)
  await db.run(sql`DROP TABLE \`_post_balance_sheet_events_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_post_balance_sheet_events_v_rels\`;`)
  await db.run(sql`DROP INDEX \`tenant_reference_11_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_10_idx\` ON \`prior_period_adjustments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_11_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_10_idx\` ON \`_prior_period_adjustments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_12_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_11_idx\` ON \`provisions\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_12_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_11_idx\` ON \`_provisions_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_13_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_12_idx\` ON \`transfer_pricing_files\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_13_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_12_idx\` ON \`_transfer_pricing_files_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_14_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_13_idx\` ON \`leave_requests\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_14_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_13_idx\` ON \`_leave_requests_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_15_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_14_idx\` ON \`maintenance_work_orders\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_15_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_14_idx\` ON \`_maintenance_work_orders_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_16_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_15_idx\` ON \`performance_reviews\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_16_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_15_idx\` ON \`_performance_reviews_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_17_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_16_idx\` ON \`sales_commissions\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_17_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_16_idx\` ON \`_sales_commissions_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_18_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_17_idx\` ON \`share_based_payments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_18_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_17_idx\` ON \`_share_based_payments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_19_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_18_idx\` ON \`work_shifts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_19_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_18_idx\` ON \`_work_shifts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_20_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_19_idx\` ON \`bills_of_materials\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_20_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_19_idx\` ON \`_bills_of_materials_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_21_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_20_idx\` ON \`cost_variances\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_21_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_20_idx\` ON \`_cost_variances_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_22_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_21_idx\` ON \`pack_items\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_22_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_21_idx\` ON \`_pack_items_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_23_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_22_idx\` ON \`work_centers\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_23_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_22_idx\` ON \`_work_centers_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_24_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_23_idx\` ON \`work_orders\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_24_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_23_idx\` ON \`_work_orders_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_25_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_24_idx\` ON \`deferred_tax_items\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_25_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_24_idx\` ON \`_deferred_tax_items_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_26_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_25_idx\` ON \`packages\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_26_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_25_idx\` ON \`_packages_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_27_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_26_idx\` ON \`production_receipts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_27_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_26_idx\` ON \`_production_receipts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_28_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_27_idx\` ON \`quality_inspections\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_28_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_27_idx\` ON \`_quality_inspections_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_29_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_28_idx\` ON \`government_grants\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_29_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_28_idx\` ON \`_government_grants_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_30_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_29_idx\` ON \`biological_assets\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_30_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_29_idx\` ON \`_biological_assets_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_31_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_30_idx\` ON \`business_combinations\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_31_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_30_idx\` ON \`_business_combinations_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_32_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_31_idx\` ON \`fair_value_measurements\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_32_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_31_idx\` ON \`_fair_value_measurements_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_33_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_32_idx\` ON \`held_for_sale_classifications\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_33_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_32_idx\` ON \`_held_for_sale_classifications_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_34_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_33_idx\` ON \`insurance_contracts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_34_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_33_idx\` ON \`_insurance_contracts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_35_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_34_idx\` ON \`investment_properties\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_35_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_34_idx\` ON \`_investment_properties_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_36_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_35_idx\` ON \`mineral_resource_assets\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_36_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_35_idx\` ON \`_mineral_resource_assets_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_37_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_36_idx\` ON \`regulatory_deferral_accounts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_37_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_36_idx\` ON \`_regulatory_deferral_accounts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_38_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_37_idx\` ON \`rounding_adjustments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_38_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_37_idx\` ON \`_rounding_adjustments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_39_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_38_idx\` ON \`transaction_failures\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_39_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_38_idx\` ON \`_transaction_failures_v\` (\`version_tenant_id\`,\`version_reference\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`post_balance_sheet_events\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`period_id\` text(36) NOT NULL,
  	\`event_date\` text NOT NULL,
  	\`classification\` text NOT NULL,
  	\`event_kind\` text NOT NULL,
  	\`estimated_impact\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`source_collection\` text,
  	\`source_id\` text,
  	\`journal_entry_id\` text(36),
  	\`disclosed_in_f_s\` integer DEFAULT false,
  	\`status\` text DEFAULT 'identified',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`period_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`post_balance_sheet_events_uuid_idx\` ON \`post_balance_sheet_events\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_tenant_idx\` ON \`post_balance_sheet_events\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_period_idx\` ON \`post_balance_sheet_events\` (\`period_id\`);`)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_event_date_idx\` ON \`post_balance_sheet_events\` (\`event_date\`);`)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_journal_entry_idx\` ON \`post_balance_sheet_events\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_created_by_idx\` ON \`post_balance_sheet_events\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_approved_by_idx\` ON \`post_balance_sheet_events\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_updated_at_idx\` ON \`post_balance_sheet_events\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_created_at_idx\` ON \`post_balance_sheet_events\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_10_idx\` ON \`post_balance_sheet_events\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`CREATE TABLE \`post_balance_sheet_events_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`post_balance_sheet_events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`post_balance_sheet_events_locales_parent_id_locale_unique\` ON \`post_balance_sheet_events_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`post_balance_sheet_events_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`post_balance_sheet_events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_rels_order_idx\` ON \`post_balance_sheet_events_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_rels_parent_idx\` ON \`post_balance_sheet_events_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_rels_path_idx\` ON \`post_balance_sheet_events_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_rels_users_id_idx\` ON \`post_balance_sheet_events_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_post_balance_sheet_events_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_reference\` text NOT NULL,
  	\`version_period_id\` text(36) NOT NULL,
  	\`version_event_date\` text NOT NULL,
  	\`version_classification\` text NOT NULL,
  	\`version_event_kind\` text NOT NULL,
  	\`version_estimated_impact\` numeric DEFAULT 0,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_source_collection\` text,
  	\`version_source_id\` text,
  	\`version_journal_entry_id\` text(36),
  	\`version_disclosed_in_f_s\` integer DEFAULT false,
  	\`version_status\` text DEFAULT 'identified',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`post_balance_sheet_events\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_period_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_post_balance_sheet_events_v_parent_idx\` ON \`_post_balance_sheet_events_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_post_balance_sheet_events_v_version_version_uuid_idx\` ON \`_post_balance_sheet_events_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_post_balance_sheet_events_v_version_version_tenant_idx\` ON \`_post_balance_sheet_events_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_post_balance_sheet_events_v_version_version_period_idx\` ON \`_post_balance_sheet_events_v\` (\`version_period_id\`);`)
  await db.run(sql`CREATE INDEX \`_post_balance_sheet_events_v_version_version_event_date_idx\` ON \`_post_balance_sheet_events_v\` (\`version_event_date\`);`)
  await db.run(sql`CREATE INDEX \`_post_balance_sheet_events_v_version_version_journal_ent_idx\` ON \`_post_balance_sheet_events_v\` (\`version_journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`_post_balance_sheet_events_v_version_version_created_by_idx\` ON \`_post_balance_sheet_events_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_post_balance_sheet_events_v_version_version_approved_by_idx\` ON \`_post_balance_sheet_events_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_post_balance_sheet_events_v_version_version_updated_at_idx\` ON \`_post_balance_sheet_events_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_post_balance_sheet_events_v_version_version_created_at_idx\` ON \`_post_balance_sheet_events_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_post_balance_sheet_events_v_created_at_idx\` ON \`_post_balance_sheet_events_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_post_balance_sheet_events_v_updated_at_idx\` ON \`_post_balance_sheet_events_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_10_idx\` ON \`_post_balance_sheet_events_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`CREATE TABLE \`_post_balance_sheet_events_v_locales\` (
  	\`version_description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_post_balance_sheet_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_post_balance_sheet_events_v_locales_parent_id_locale_unique\` ON \`_post_balance_sheet_events_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_post_balance_sheet_events_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_post_balance_sheet_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_post_balance_sheet_events_v_rels_order_idx\` ON \`_post_balance_sheet_events_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_post_balance_sheet_events_v_rels_parent_idx\` ON \`_post_balance_sheet_events_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_post_balance_sheet_events_v_rels_path_idx\` ON \`_post_balance_sheet_events_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_post_balance_sheet_events_v_rels_users_id_idx\` ON \`_post_balance_sheet_events_v_rels\` (\`users_id\`);`)
  await db.run(sql`DROP TABLE \`fiscal_periods_subsequent_events\`;`)
  await db.run(sql`DROP TABLE \`fiscal_periods_subsequent_events_locales\`;`)
  await db.run(sql`DROP TABLE \`_fiscal_periods_v_version_subsequent_events\`;`)
  await db.run(sql`DROP TABLE \`_fiscal_periods_v_version_subsequent_events_locales\`;`)
  await db.run(sql`DROP INDEX \`tenant_reference_10_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_11_idx\` ON \`prior_period_adjustments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_10_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_11_idx\` ON \`_prior_period_adjustments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_11_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_12_idx\` ON \`provisions\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_11_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_12_idx\` ON \`_provisions_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_12_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_13_idx\` ON \`transfer_pricing_files\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_12_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_13_idx\` ON \`_transfer_pricing_files_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_13_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_14_idx\` ON \`leave_requests\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_13_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_14_idx\` ON \`_leave_requests_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_14_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_15_idx\` ON \`maintenance_work_orders\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_14_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_15_idx\` ON \`_maintenance_work_orders_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_15_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_16_idx\` ON \`performance_reviews\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_15_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_16_idx\` ON \`_performance_reviews_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_16_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_17_idx\` ON \`sales_commissions\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_16_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_17_idx\` ON \`_sales_commissions_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_17_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_18_idx\` ON \`share_based_payments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_17_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_18_idx\` ON \`_share_based_payments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_18_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_19_idx\` ON \`work_shifts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_18_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_19_idx\` ON \`_work_shifts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_19_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_20_idx\` ON \`bills_of_materials\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_19_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_20_idx\` ON \`_bills_of_materials_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_20_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_21_idx\` ON \`cost_variances\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_20_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_21_idx\` ON \`_cost_variances_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_21_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_22_idx\` ON \`pack_items\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_21_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_22_idx\` ON \`_pack_items_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_22_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_23_idx\` ON \`work_centers\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_22_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_23_idx\` ON \`_work_centers_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_23_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_24_idx\` ON \`work_orders\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_23_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_24_idx\` ON \`_work_orders_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_24_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_25_idx\` ON \`deferred_tax_items\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_24_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_25_idx\` ON \`_deferred_tax_items_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_25_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_26_idx\` ON \`packages\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_25_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_26_idx\` ON \`_packages_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_26_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_27_idx\` ON \`production_receipts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_26_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_27_idx\` ON \`_production_receipts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_27_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_28_idx\` ON \`quality_inspections\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_27_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_28_idx\` ON \`_quality_inspections_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_28_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_29_idx\` ON \`government_grants\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_28_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_29_idx\` ON \`_government_grants_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_29_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_30_idx\` ON \`biological_assets\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_29_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_30_idx\` ON \`_biological_assets_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_30_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_31_idx\` ON \`business_combinations\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_30_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_31_idx\` ON \`_business_combinations_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_31_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_32_idx\` ON \`fair_value_measurements\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_31_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_32_idx\` ON \`_fair_value_measurements_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_32_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_33_idx\` ON \`held_for_sale_classifications\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_32_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_33_idx\` ON \`_held_for_sale_classifications_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_33_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_34_idx\` ON \`insurance_contracts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_33_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_34_idx\` ON \`_insurance_contracts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_34_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_35_idx\` ON \`investment_properties\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_34_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_35_idx\` ON \`_investment_properties_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_35_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_36_idx\` ON \`mineral_resource_assets\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_35_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_36_idx\` ON \`_mineral_resource_assets_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_36_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_37_idx\` ON \`regulatory_deferral_accounts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_36_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_37_idx\` ON \`_regulatory_deferral_accounts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_37_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_38_idx\` ON \`rounding_adjustments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_37_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_38_idx\` ON \`_rounding_adjustments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_38_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_39_idx\` ON \`transaction_failures\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_38_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_39_idx\` ON \`_transaction_failures_v\` (\`version_tenant_id\`,\`version_reference\`);`)
}
