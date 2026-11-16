import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_blocks_held_for_sale\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`classification_kind\` text,
  	\`status\` text DEFAULT 'classified',
  	\`expected_sale_date\` text,
  	\`carrying_amount_at_classification\` numeric,
  	\`fair_value\` numeric,
  	\`costs_to_sell\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`fair_value_less_costs_to_sell\` numeric,
  	\`impairment_loss\` numeric,
  	\`is_discontinued_operation\` integer DEFAULT false,
  	\`segment\` text,
  	\`actual_sale_date\` text,
  	\`actual_sale_proceeds\` numeric,
  	\`gain_loss_on_disposal\` numeric,
  	\`fair_value_measurement_id\` text(36),
  	\`journal_entry_id\` text(36),
  	\`notes\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`fair_value_measurement_id\`) REFERENCES \`fair_value_measurements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_held_for_sale_order_idx\` ON \`pages_blocks_held_for_sale\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_held_for_sale_parent_id_idx\` ON \`pages_blocks_held_for_sale\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_held_for_sale_path_idx\` ON \`pages_blocks_held_for_sale\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_held_for_sale_fair_value_measurement_idx\` ON \`pages_blocks_held_for_sale\` (\`fair_value_measurement_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_held_for_sale_journal_entry_idx\` ON \`pages_blocks_held_for_sale\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_held_for_sale\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`classification_kind\` text,
  	\`status\` text DEFAULT 'classified',
  	\`expected_sale_date\` text,
  	\`carrying_amount_at_classification\` numeric,
  	\`fair_value\` numeric,
  	\`costs_to_sell\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`fair_value_less_costs_to_sell\` numeric,
  	\`impairment_loss\` numeric,
  	\`is_discontinued_operation\` integer DEFAULT false,
  	\`segment\` text,
  	\`actual_sale_date\` text,
  	\`actual_sale_proceeds\` numeric,
  	\`gain_loss_on_disposal\` numeric,
  	\`fair_value_measurement_id\` text(36),
  	\`journal_entry_id\` text(36),
  	\`notes\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`fair_value_measurement_id\`) REFERENCES \`fair_value_measurements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_held_for_sale_order_idx\` ON \`_pages_v_blocks_held_for_sale\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_held_for_sale_parent_id_idx\` ON \`_pages_v_blocks_held_for_sale\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_held_for_sale_path_idx\` ON \`_pages_v_blocks_held_for_sale\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_held_for_sale_fair_value_measurement_idx\` ON \`_pages_v_blocks_held_for_sale\` (\`fair_value_measurement_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_held_for_sale_journal_entry_idx\` ON \`_pages_v_blocks_held_for_sale\` (\`journal_entry_id\`);`)
  await db.run(sql`DROP TABLE \`held_for_sale_classifications\`;`)
  await db.run(sql`DROP TABLE \`held_for_sale_classifications_rels\`;`)
  await db.run(sql`DROP TABLE \`_held_for_sale_classifications_v\`;`)
  await db.run(sql`DROP TABLE \`_held_for_sale_classifications_v_rels\`;`)
  await db.run(sql`DROP INDEX \`tenant_reference_11_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_31_idx\` ON \`transfer_pricing_files\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_11_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_31_idx\` ON \`_transfer_pricing_files_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_12_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_11_idx\` ON \`leave_requests\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_12_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_11_idx\` ON \`_leave_requests_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_13_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_12_idx\` ON \`maintenance_work_orders\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_13_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_12_idx\` ON \`_maintenance_work_orders_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_14_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_13_idx\` ON \`performance_reviews\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_14_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_13_idx\` ON \`_performance_reviews_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_15_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_14_idx\` ON \`sales_commissions\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_15_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_14_idx\` ON \`_sales_commissions_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_16_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_15_idx\` ON \`share_based_payments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_16_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_15_idx\` ON \`_share_based_payments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_17_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_16_idx\` ON \`work_shifts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_17_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_16_idx\` ON \`_work_shifts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_18_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_17_idx\` ON \`bills_of_materials\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_18_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_17_idx\` ON \`_bills_of_materials_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_19_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_18_idx\` ON \`cost_variances\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_19_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_18_idx\` ON \`_cost_variances_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_20_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_19_idx\` ON \`pack_items\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_20_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_19_idx\` ON \`_pack_items_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_21_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_20_idx\` ON \`work_centers\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_21_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_20_idx\` ON \`_work_centers_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_22_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_21_idx\` ON \`work_orders\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_22_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_21_idx\` ON \`_work_orders_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_23_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_22_idx\` ON \`deferred_tax_items\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_23_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_22_idx\` ON \`_deferred_tax_items_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_24_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_23_idx\` ON \`packages\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_24_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_23_idx\` ON \`_packages_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_25_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_24_idx\` ON \`production_receipts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_25_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_24_idx\` ON \`_production_receipts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_26_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_25_idx\` ON \`quality_inspections\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_26_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_25_idx\` ON \`_quality_inspections_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_27_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_26_idx\` ON \`government_grants\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_27_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_26_idx\` ON \`_government_grants_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_28_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_27_idx\` ON \`biological_assets\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_28_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_27_idx\` ON \`_biological_assets_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_29_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_28_idx\` ON \`business_combinations\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_29_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_28_idx\` ON \`_business_combinations_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_30_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_29_idx\` ON \`fair_value_measurements\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_30_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_29_idx\` ON \`_fair_value_measurements_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_32_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_30_idx\` ON \`investment_properties\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_32_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_30_idx\` ON \`_investment_properties_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_33_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_32_idx\` ON \`mineral_resource_assets\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_33_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_32_idx\` ON \`_mineral_resource_assets_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_34_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_33_idx\` ON \`rounding_adjustments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_34_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_33_idx\` ON \`_rounding_adjustments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_35_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_34_idx\` ON \`transaction_failures\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_35_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_34_idx\` ON \`_transaction_failures_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`ALTER TABLE \`pages_rels\` ADD \`fixed_assets_id\` text(36) REFERENCES fixed_assets(id);`)
  await db.run(sql`ALTER TABLE \`pages_rels\` ADD \`investment_properties_id\` text(36) REFERENCES investment_properties(id);`)
  await db.run(sql`ALTER TABLE \`pages_rels\` ADD \`business_combinations_id\` text(36) REFERENCES business_combinations(id);`)
  await db.run(sql`CREATE INDEX \`pages_rels_fixed_assets_id_idx\` ON \`pages_rels\` (\`fixed_assets_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_investment_properties_id_idx\` ON \`pages_rels\` (\`investment_properties_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_business_combinations_id_idx\` ON \`pages_rels\` (\`business_combinations_id\`,\`locale\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_rels\` ADD \`fixed_assets_id\` text(36) REFERENCES fixed_assets(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v_rels\` ADD \`investment_properties_id\` text(36) REFERENCES investment_properties(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v_rels\` ADD \`business_combinations_id\` text(36) REFERENCES business_combinations(id);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_fixed_assets_id_idx\` ON \`_pages_v_rels\` (\`fixed_assets_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_investment_properties_id_idx\` ON \`_pages_v_rels\` (\`investment_properties_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_business_combinations_id_idx\` ON \`_pages_v_rels\` (\`business_combinations_id\`,\`locale\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`held_for_sale_classifications\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`classification_kind\` text NOT NULL,
  	\`classification_date\` text NOT NULL,
  	\`expected_sale_date\` text,
  	\`carrying_amount_at_classification\` numeric NOT NULL,
  	\`fair_value\` numeric NOT NULL,
  	\`costs_to_sell\` numeric DEFAULT 0,
  	\`fair_value_less_costs_to_sell\` numeric,
  	\`impairment_loss\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`is_discontinued_operation\` integer DEFAULT false,
  	\`segment\` text,
  	\`actual_sale_date\` text,
  	\`actual_sale_proceeds\` numeric,
  	\`gain_loss_on_disposal\` numeric,
  	\`fair_value_measurement_id\` text(36),
  	\`journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'classified',
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fair_value_measurement_id\`) REFERENCES \`fair_value_measurements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`held_for_sale_classifications_uuid_idx\` ON \`held_for_sale_classifications\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_tenant_idx\` ON \`held_for_sale_classifications\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_classification_date_idx\` ON \`held_for_sale_classifications\` (\`classification_date\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_fair_value_measurement_idx\` ON \`held_for_sale_classifications\` (\`fair_value_measurement_id\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_journal_entry_idx\` ON \`held_for_sale_classifications\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_approved_by_idx\` ON \`held_for_sale_classifications\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_updated_at_idx\` ON \`held_for_sale_classifications\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_created_at_idx\` ON \`held_for_sale_classifications\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_31_idx\` ON \`held_for_sale_classifications\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`CREATE TABLE \`held_for_sale_classifications_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`fixed_assets_id\` text(36),
  	\`investment_properties_id\` text(36),
  	\`business_combinations_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`held_for_sale_classifications\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fixed_assets_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`investment_properties_id\`) REFERENCES \`investment_properties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`business_combinations_id\`) REFERENCES \`business_combinations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_rels_order_idx\` ON \`held_for_sale_classifications_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_rels_parent_idx\` ON \`held_for_sale_classifications_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_rels_path_idx\` ON \`held_for_sale_classifications_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_rels_fixed_assets_id_idx\` ON \`held_for_sale_classifications_rels\` (\`fixed_assets_id\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_rels_investment_properties_idx\` ON \`held_for_sale_classifications_rels\` (\`investment_properties_id\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_rels_business_combinations_idx\` ON \`held_for_sale_classifications_rels\` (\`business_combinations_id\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_rels_users_id_idx\` ON \`held_for_sale_classifications_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_held_for_sale_classifications_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_reference\` text NOT NULL,
  	\`version_classification_kind\` text NOT NULL,
  	\`version_classification_date\` text NOT NULL,
  	\`version_expected_sale_date\` text,
  	\`version_carrying_amount_at_classification\` numeric NOT NULL,
  	\`version_fair_value\` numeric NOT NULL,
  	\`version_costs_to_sell\` numeric DEFAULT 0,
  	\`version_fair_value_less_costs_to_sell\` numeric,
  	\`version_impairment_loss\` numeric,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_is_discontinued_operation\` integer DEFAULT false,
  	\`version_segment\` text,
  	\`version_actual_sale_date\` text,
  	\`version_actual_sale_proceeds\` numeric,
  	\`version_gain_loss_on_disposal\` numeric,
  	\`version_fair_value_measurement_id\` text(36),
  	\`version_journal_entry_id\` text(36),
  	\`version_status\` text DEFAULT 'classified',
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`held_for_sale_classifications\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_fair_value_measurement_id\`) REFERENCES \`fair_value_measurements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_parent_idx\` ON \`_held_for_sale_classifications_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_version_version_uuid_idx\` ON \`_held_for_sale_classifications_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_version_version_tenant_idx\` ON \`_held_for_sale_classifications_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_version_version_classif_idx\` ON \`_held_for_sale_classifications_v\` (\`version_classification_date\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_version_version_fair_va_idx\` ON \`_held_for_sale_classifications_v\` (\`version_fair_value_measurement_id\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_version_version_journal_idx\` ON \`_held_for_sale_classifications_v\` (\`version_journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_version_version_approve_idx\` ON \`_held_for_sale_classifications_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_version_version_updated_idx\` ON \`_held_for_sale_classifications_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_version_version_created_idx\` ON \`_held_for_sale_classifications_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_created_at_idx\` ON \`_held_for_sale_classifications_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_updated_at_idx\` ON \`_held_for_sale_classifications_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_31_idx\` ON \`_held_for_sale_classifications_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`CREATE TABLE \`_held_for_sale_classifications_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`fixed_assets_id\` text(36),
  	\`investment_properties_id\` text(36),
  	\`business_combinations_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_held_for_sale_classifications_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fixed_assets_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`investment_properties_id\`) REFERENCES \`investment_properties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`business_combinations_id\`) REFERENCES \`business_combinations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_rels_order_idx\` ON \`_held_for_sale_classifications_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_rels_parent_idx\` ON \`_held_for_sale_classifications_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_rels_path_idx\` ON \`_held_for_sale_classifications_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_rels_fixed_assets_id_idx\` ON \`_held_for_sale_classifications_v_rels\` (\`fixed_assets_id\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_rels_investment_propert_idx\` ON \`_held_for_sale_classifications_v_rels\` (\`investment_properties_id\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_rels_business_combinati_idx\` ON \`_held_for_sale_classifications_v_rels\` (\`business_combinations_id\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_rels_users_id_idx\` ON \`_held_for_sale_classifications_v_rels\` (\`users_id\`);`)
  await db.run(sql`DROP TABLE \`pages_blocks_held_for_sale\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_held_for_sale\`;`)
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
  	\`audit_findings_id\` text(36),
  	\`audit_committee_minutes_id\` text(36),
  	\`legal_entities_id\` text(36),
  	\`fx_transactions_id\` text(36),
  	\`internal_controls_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_committee_minutes_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`legal_entities_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fx_transactions_id\`) REFERENCES \`fx_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_rels\`("id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "audit_findings_id", "audit_committee_minutes_id", "legal_entities_id", "fx_transactions_id", "internal_controls_id", "users_id") SELECT "id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "audit_findings_id", "audit_committee_minutes_id", "legal_entities_id", "fx_transactions_id", "internal_controls_id", "users_id" FROM \`pages_rels\`;`)
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
  await db.run(sql`CREATE INDEX \`pages_rels_audit_findings_id_idx\` ON \`pages_rels\` (\`audit_findings_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_audit_committee_minutes_id_idx\` ON \`pages_rels\` (\`audit_committee_minutes_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_legal_entities_id_idx\` ON \`pages_rels\` (\`legal_entities_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_fx_transactions_id_idx\` ON \`pages_rels\` (\`fx_transactions_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_internal_controls_id_idx\` ON \`pages_rels\` (\`internal_controls_id\`,\`locale\`);`)
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
  	\`audit_findings_id\` text(36),
  	\`audit_committee_minutes_id\` text(36),
  	\`legal_entities_id\` text(36),
  	\`fx_transactions_id\` text(36),
  	\`internal_controls_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_committee_minutes_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`legal_entities_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fx_transactions_id\`) REFERENCES \`fx_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_rels\`("id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "audit_findings_id", "audit_committee_minutes_id", "legal_entities_id", "fx_transactions_id", "internal_controls_id", "users_id") SELECT "id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "audit_findings_id", "audit_committee_minutes_id", "legal_entities_id", "fx_transactions_id", "internal_controls_id", "users_id" FROM \`_pages_v_rels\`;`)
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
  await db.run(sql`CREATE INDEX \`_pages_v_rels_audit_findings_id_idx\` ON \`_pages_v_rels\` (\`audit_findings_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_audit_committee_minutes_id_idx\` ON \`_pages_v_rels\` (\`audit_committee_minutes_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_legal_entities_id_idx\` ON \`_pages_v_rels\` (\`legal_entities_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_fx_transactions_id_idx\` ON \`_pages_v_rels\` (\`fx_transactions_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_internal_controls_id_idx\` ON \`_pages_v_rels\` (\`internal_controls_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_users_id_idx\` ON \`_pages_v_rels\` (\`users_id\`,\`locale\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_11_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_12_idx\` ON \`leave_requests\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_11_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_12_idx\` ON \`_leave_requests_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_12_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_13_idx\` ON \`maintenance_work_orders\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_12_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_13_idx\` ON \`_maintenance_work_orders_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_13_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_14_idx\` ON \`performance_reviews\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_13_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_14_idx\` ON \`_performance_reviews_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_14_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_15_idx\` ON \`sales_commissions\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_14_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_15_idx\` ON \`_sales_commissions_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_15_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_16_idx\` ON \`share_based_payments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_15_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_16_idx\` ON \`_share_based_payments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_16_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_17_idx\` ON \`work_shifts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_16_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_17_idx\` ON \`_work_shifts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_17_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_18_idx\` ON \`bills_of_materials\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_17_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_18_idx\` ON \`_bills_of_materials_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_18_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_19_idx\` ON \`cost_variances\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_18_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_19_idx\` ON \`_cost_variances_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_19_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_20_idx\` ON \`pack_items\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_19_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_20_idx\` ON \`_pack_items_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_20_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_21_idx\` ON \`work_centers\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_20_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_21_idx\` ON \`_work_centers_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_21_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_22_idx\` ON \`work_orders\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_21_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_22_idx\` ON \`_work_orders_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_22_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_23_idx\` ON \`deferred_tax_items\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_22_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_23_idx\` ON \`_deferred_tax_items_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_23_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_24_idx\` ON \`packages\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_23_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_24_idx\` ON \`_packages_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_24_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_25_idx\` ON \`production_receipts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_24_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_25_idx\` ON \`_production_receipts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_25_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_26_idx\` ON \`quality_inspections\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_25_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_26_idx\` ON \`_quality_inspections_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_26_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_27_idx\` ON \`government_grants\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_26_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_27_idx\` ON \`_government_grants_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_27_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_28_idx\` ON \`biological_assets\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_27_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_28_idx\` ON \`_biological_assets_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_28_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_29_idx\` ON \`business_combinations\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_28_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_29_idx\` ON \`_business_combinations_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_29_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_30_idx\` ON \`fair_value_measurements\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_29_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_30_idx\` ON \`_fair_value_measurements_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_30_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_32_idx\` ON \`investment_properties\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_30_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_32_idx\` ON \`_investment_properties_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_31_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_11_idx\` ON \`transfer_pricing_files\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_31_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_11_idx\` ON \`_transfer_pricing_files_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_32_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_33_idx\` ON \`mineral_resource_assets\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_32_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_33_idx\` ON \`_mineral_resource_assets_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_33_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_34_idx\` ON \`rounding_adjustments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_33_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_34_idx\` ON \`_rounding_adjustments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_34_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_35_idx\` ON \`transaction_failures\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_34_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_35_idx\` ON \`_transaction_failures_v\` (\`version_tenant_id\`,\`version_reference\`);`)
}
