import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_document_details_earnings_per_sh_8b9a6162\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`event_date\` text,
  	\`event_kind\` text,
  	\`shares_delta\` numeric,
  	\`split_ratio\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_document_details_earnings_per_sh_c1564048\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_earnings_per_sh_8b9a6162_order_idx\` ON \`pages_document_details_earnings_per_sh_8b9a6162\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_earnings_per_sh_8b9a6162_parent_id_idx\` ON \`pages_document_details_earnings_per_sh_8b9a6162\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_document_details_earnings_per_sh_c1564048\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`period_id\` text(36),
  	\`period_end\` text,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'draft',
  	\`net_profit_attributable_to_ordinary\` numeric,
  	\`preferred_dividends\` numeric DEFAULT 0,
  	\`basic_eps_numerator\` numeric,
  	\`weighted_average_ordinary_shares\` numeric,
  	\`dilutive_potential_shares\` numeric DEFAULT 0,
  	\`anti_dilutive_shares\` numeric DEFAULT 0,
  	\`basic_eps\` numeric,
  	\`diluted_eps\` numeric,
  	\`continuing_vs_discontinued_continuing_eps_basic\` numeric,
  	\`continuing_vs_discontinued_continuing_eps_diluted\` numeric,
  	\`continuing_vs_discontinued_discontinued_eps_basic\` numeric,
  	\`continuing_vs_discontinued_discontinued_eps_diluted\` numeric,
  	\`notes\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`period_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_earnings_per_sh_c1564048_order_idx\` ON \`pages_document_details_earnings_per_sh_c1564048\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_earnings_per_sh_c1564048_parent_id_idx\` ON \`pages_document_details_earnings_per_sh_c1564048\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_earnings_per_sh_c1564048_path_idx\` ON \`pages_document_details_earnings_per_sh_c1564048\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_earnings_per_sh_c1564048_period_idx\` ON \`pages_document_details_earnings_per_sh_c1564048\` (\`period_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_earnings_per_sh_8b9a6162_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`event_date\` text,
  	\`event_kind\` text,
  	\`shares_delta\` numeric,
  	\`split_ratio\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_document_details_earnings_per_sh_c1564048_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_earnings_per_sh_8b9a6162_v_order_idx\` ON \`_pages_document_details_earnings_per_sh_8b9a6162_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_earnings_per_sh_8b9a6162_v_parent_id_idx\` ON \`_pages_document_details_earnings_per_sh_8b9a6162_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_earnings_per_sh_c1564048_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`period_id\` text(36),
  	\`period_end\` text,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'draft',
  	\`net_profit_attributable_to_ordinary\` numeric,
  	\`preferred_dividends\` numeric DEFAULT 0,
  	\`basic_eps_numerator\` numeric,
  	\`weighted_average_ordinary_shares\` numeric,
  	\`dilutive_potential_shares\` numeric DEFAULT 0,
  	\`anti_dilutive_shares\` numeric DEFAULT 0,
  	\`basic_eps\` numeric,
  	\`diluted_eps\` numeric,
  	\`continuing_vs_discontinued_continuing_eps_basic\` numeric,
  	\`continuing_vs_discontinued_continuing_eps_diluted\` numeric,
  	\`continuing_vs_discontinued_discontinued_eps_basic\` numeric,
  	\`continuing_vs_discontinued_discontinued_eps_diluted\` numeric,
  	\`notes\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`period_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_earnings_per_sh_c1564048_v_order_idx\` ON \`_pages_document_details_earnings_per_sh_c1564048_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_earnings_per_sh_c1564048_v_parent_id_idx\` ON \`_pages_document_details_earnings_per_sh_c1564048_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_earnings_per_sh_c1564048_v_path_idx\` ON \`_pages_document_details_earnings_per_sh_c1564048_v\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_earnings_per_sh_c1564048_v_perio_idx\` ON \`_pages_document_details_earnings_per_sh_c1564048_v\` (\`period_id\`);`)
  await db.run(sql`DROP TABLE \`eps_share_events\`;`)
  await db.run(sql`DROP TABLE \`earnings_per_share\`;`)
  await db.run(sql`DROP TABLE \`earnings_per_share_rels\`;`)
  await db.run(sql`DROP TABLE \`_eps_share_events_v\`;`)
  await db.run(sql`DROP TABLE \`_earnings_per_share_v\`;`)
  await db.run(sql`DROP TABLE \`_earnings_per_share_v_rels\`;`)
  await db.run(sql`DROP INDEX \`tenant_reference_9_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_8_idx\` ON \`lease_modifications\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_9_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_8_idx\` ON \`_lease_modifications_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_10_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_9_idx\` ON \`prior_period_adjustments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_10_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_9_idx\` ON \`_prior_period_adjustments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_11_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_10_idx\` ON \`provisions\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_11_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_10_idx\` ON \`_provisions_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_12_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_11_idx\` ON \`transfer_pricing_files\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_12_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_11_idx\` ON \`_transfer_pricing_files_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_13_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_12_idx\` ON \`leave_requests\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_13_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_12_idx\` ON \`_leave_requests_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_14_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_13_idx\` ON \`maintenance_work_orders\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_14_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_13_idx\` ON \`_maintenance_work_orders_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_15_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_14_idx\` ON \`performance_reviews\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_15_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_14_idx\` ON \`_performance_reviews_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_16_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_15_idx\` ON \`sales_commissions\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_16_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_15_idx\` ON \`_sales_commissions_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_17_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_16_idx\` ON \`share_based_payments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_17_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_16_idx\` ON \`_share_based_payments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_18_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_17_idx\` ON \`work_shifts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_18_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_17_idx\` ON \`_work_shifts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_19_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_18_idx\` ON \`bills_of_materials\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_19_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_18_idx\` ON \`_bills_of_materials_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_20_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_19_idx\` ON \`cost_variances\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_20_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_19_idx\` ON \`_cost_variances_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_21_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_20_idx\` ON \`pack_items\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_21_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_20_idx\` ON \`_pack_items_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_22_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_21_idx\` ON \`work_centers\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_22_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_21_idx\` ON \`_work_centers_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_23_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_22_idx\` ON \`work_orders\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_23_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_22_idx\` ON \`_work_orders_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_24_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_23_idx\` ON \`deferred_tax_items\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_24_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_23_idx\` ON \`_deferred_tax_items_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_25_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_24_idx\` ON \`packages\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_25_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_24_idx\` ON \`_packages_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_26_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_25_idx\` ON \`production_receipts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_26_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_25_idx\` ON \`_production_receipts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_27_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_26_idx\` ON \`quality_inspections\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_27_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_26_idx\` ON \`_quality_inspections_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_28_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_27_idx\` ON \`government_grants\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_28_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_27_idx\` ON \`_government_grants_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_29_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_28_idx\` ON \`biological_assets\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_29_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_28_idx\` ON \`_biological_assets_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_30_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_29_idx\` ON \`business_combinations\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_30_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_29_idx\` ON \`_business_combinations_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_31_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_30_idx\` ON \`fair_value_measurements\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_31_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_30_idx\` ON \`_fair_value_measurements_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_32_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_31_idx\` ON \`held_for_sale_classifications\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_32_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_31_idx\` ON \`_held_for_sale_classifications_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_33_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_32_idx\` ON \`insurance_contracts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_33_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_32_idx\` ON \`_insurance_contracts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_34_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_33_idx\` ON \`investment_properties\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_34_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_33_idx\` ON \`_investment_properties_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_35_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_34_idx\` ON \`mineral_resource_assets\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_35_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_34_idx\` ON \`_mineral_resource_assets_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_36_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_35_idx\` ON \`regulatory_deferral_accounts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_36_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_35_idx\` ON \`_regulatory_deferral_accounts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_37_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_36_idx\` ON \`rounding_adjustments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_37_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_36_idx\` ON \`_rounding_adjustments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_38_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_37_idx\` ON \`transaction_failures\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_38_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_37_idx\` ON \`_transaction_failures_v\` (\`version_tenant_id\`,\`version_reference\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`eps_share_events\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`event_date\` text NOT NULL,
  	\`event_kind\` text NOT NULL,
  	\`shares_delta\` numeric NOT NULL,
  	\`split_ratio\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`earnings_per_share\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eps_share_events_order_idx\` ON \`eps_share_events\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eps_share_events_parent_id_idx\` ON \`eps_share_events\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`earnings_per_share\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`period_id\` text(36) NOT NULL,
  	\`period_end\` text NOT NULL,
  	\`net_profit_attributable_to_ordinary\` numeric NOT NULL,
  	\`preferred_dividends\` numeric DEFAULT 0,
  	\`basic_eps_numerator\` numeric,
  	\`weighted_average_ordinary_shares\` numeric NOT NULL,
  	\`basic_eps\` numeric,
  	\`dilutive_potential_shares\` numeric DEFAULT 0,
  	\`anti_dilutive_shares\` numeric DEFAULT 0,
  	\`diluted_eps\` numeric,
  	\`continuing_vs_discontinued_continuing_eps_basic\` numeric,
  	\`continuing_vs_discontinued_continuing_eps_diluted\` numeric,
  	\`continuing_vs_discontinued_discontinued_eps_basic\` numeric,
  	\`continuing_vs_discontinued_discontinued_eps_diluted\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'draft',
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`period_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`earnings_per_share_uuid_idx\` ON \`earnings_per_share\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`earnings_per_share_tenant_idx\` ON \`earnings_per_share\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`earnings_per_share_period_idx\` ON \`earnings_per_share\` (\`period_id\`);`)
  await db.run(sql`CREATE INDEX \`earnings_per_share_period_end_idx\` ON \`earnings_per_share\` (\`period_end\`);`)
  await db.run(sql`CREATE INDEX \`earnings_per_share_approved_by_idx\` ON \`earnings_per_share\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`earnings_per_share_updated_at_idx\` ON \`earnings_per_share\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`earnings_per_share_created_at_idx\` ON \`earnings_per_share\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_8_idx\` ON \`earnings_per_share\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`CREATE TABLE \`earnings_per_share_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`earnings_per_share\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`earnings_per_share_rels_order_idx\` ON \`earnings_per_share_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`earnings_per_share_rels_parent_idx\` ON \`earnings_per_share_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`earnings_per_share_rels_path_idx\` ON \`earnings_per_share_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`earnings_per_share_rels_users_id_idx\` ON \`earnings_per_share_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_eps_share_events_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`event_date\` text NOT NULL,
  	\`event_kind\` text NOT NULL,
  	\`shares_delta\` numeric NOT NULL,
  	\`split_ratio\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_earnings_per_share_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_eps_share_events_v_order_idx\` ON \`_eps_share_events_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eps_share_events_v_parent_id_idx\` ON \`_eps_share_events_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_earnings_per_share_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_reference\` text NOT NULL,
  	\`version_period_id\` text(36) NOT NULL,
  	\`version_period_end\` text NOT NULL,
  	\`version_net_profit_attributable_to_ordinary\` numeric NOT NULL,
  	\`version_preferred_dividends\` numeric DEFAULT 0,
  	\`version_basic_eps_numerator\` numeric,
  	\`version_weighted_average_ordinary_shares\` numeric NOT NULL,
  	\`version_basic_eps\` numeric,
  	\`version_dilutive_potential_shares\` numeric DEFAULT 0,
  	\`version_anti_dilutive_shares\` numeric DEFAULT 0,
  	\`version_diluted_eps\` numeric,
  	\`version_continuing_vs_discontinued_continuing_eps_basic\` numeric,
  	\`version_continuing_vs_discontinued_continuing_eps_diluted\` numeric,
  	\`version_continuing_vs_discontinued_discontinued_eps_basic\` numeric,
  	\`version_continuing_vs_discontinued_discontinued_eps_diluted\` numeric,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_status\` text DEFAULT 'draft',
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`earnings_per_share\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_period_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_earnings_per_share_v_parent_idx\` ON \`_earnings_per_share_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_earnings_per_share_v_version_version_uuid_idx\` ON \`_earnings_per_share_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_earnings_per_share_v_version_version_tenant_idx\` ON \`_earnings_per_share_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_earnings_per_share_v_version_version_period_idx\` ON \`_earnings_per_share_v\` (\`version_period_id\`);`)
  await db.run(sql`CREATE INDEX \`_earnings_per_share_v_version_version_period_end_idx\` ON \`_earnings_per_share_v\` (\`version_period_end\`);`)
  await db.run(sql`CREATE INDEX \`_earnings_per_share_v_version_version_approved_by_idx\` ON \`_earnings_per_share_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_earnings_per_share_v_version_version_updated_at_idx\` ON \`_earnings_per_share_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_earnings_per_share_v_version_version_created_at_idx\` ON \`_earnings_per_share_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_earnings_per_share_v_created_at_idx\` ON \`_earnings_per_share_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_earnings_per_share_v_updated_at_idx\` ON \`_earnings_per_share_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_8_idx\` ON \`_earnings_per_share_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`CREATE TABLE \`_earnings_per_share_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_earnings_per_share_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_earnings_per_share_v_rels_order_idx\` ON \`_earnings_per_share_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_earnings_per_share_v_rels_parent_idx\` ON \`_earnings_per_share_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_earnings_per_share_v_rels_path_idx\` ON \`_earnings_per_share_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_earnings_per_share_v_rels_users_id_idx\` ON \`_earnings_per_share_v_rels\` (\`users_id\`);`)
  await db.run(sql`DROP TABLE \`pages_document_details_earnings_per_sh_8b9a6162\`;`)
  await db.run(sql`DROP TABLE \`pages_document_details_earnings_per_sh_c1564048\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_earnings_per_sh_8b9a6162_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_earnings_per_sh_c1564048_v\`;`)
  await db.run(sql`DROP INDEX \`tenant_reference_8_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_9_idx\` ON \`lease_modifications\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_8_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_9_idx\` ON \`_lease_modifications_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_9_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_10_idx\` ON \`prior_period_adjustments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_9_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_10_idx\` ON \`_prior_period_adjustments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_10_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_11_idx\` ON \`provisions\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_10_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_11_idx\` ON \`_provisions_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_11_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_12_idx\` ON \`transfer_pricing_files\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_11_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_12_idx\` ON \`_transfer_pricing_files_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_12_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_13_idx\` ON \`leave_requests\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_12_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_13_idx\` ON \`_leave_requests_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_13_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_14_idx\` ON \`maintenance_work_orders\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_13_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_14_idx\` ON \`_maintenance_work_orders_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_14_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_15_idx\` ON \`performance_reviews\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_14_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_15_idx\` ON \`_performance_reviews_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_15_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_16_idx\` ON \`sales_commissions\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_15_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_16_idx\` ON \`_sales_commissions_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_16_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_17_idx\` ON \`share_based_payments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_16_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_17_idx\` ON \`_share_based_payments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_17_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_18_idx\` ON \`work_shifts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_17_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_18_idx\` ON \`_work_shifts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_18_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_19_idx\` ON \`bills_of_materials\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_18_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_19_idx\` ON \`_bills_of_materials_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_19_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_20_idx\` ON \`cost_variances\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_19_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_20_idx\` ON \`_cost_variances_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_20_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_21_idx\` ON \`pack_items\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_20_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_21_idx\` ON \`_pack_items_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_21_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_22_idx\` ON \`work_centers\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_21_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_22_idx\` ON \`_work_centers_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_22_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_23_idx\` ON \`work_orders\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_22_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_23_idx\` ON \`_work_orders_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_23_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_24_idx\` ON \`deferred_tax_items\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_23_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_24_idx\` ON \`_deferred_tax_items_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_24_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_25_idx\` ON \`packages\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_24_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_25_idx\` ON \`_packages_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_25_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_26_idx\` ON \`production_receipts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_25_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_26_idx\` ON \`_production_receipts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_26_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_27_idx\` ON \`quality_inspections\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_26_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_27_idx\` ON \`_quality_inspections_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_27_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_28_idx\` ON \`government_grants\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_27_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_28_idx\` ON \`_government_grants_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_28_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_29_idx\` ON \`biological_assets\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_28_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_29_idx\` ON \`_biological_assets_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_29_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_30_idx\` ON \`business_combinations\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_29_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_30_idx\` ON \`_business_combinations_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_30_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_31_idx\` ON \`fair_value_measurements\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_30_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_31_idx\` ON \`_fair_value_measurements_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_31_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_32_idx\` ON \`held_for_sale_classifications\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_31_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_32_idx\` ON \`_held_for_sale_classifications_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_32_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_33_idx\` ON \`insurance_contracts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_32_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_33_idx\` ON \`_insurance_contracts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_33_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_34_idx\` ON \`investment_properties\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_33_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_34_idx\` ON \`_investment_properties_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_34_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_35_idx\` ON \`mineral_resource_assets\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_34_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_35_idx\` ON \`_mineral_resource_assets_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_35_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_36_idx\` ON \`regulatory_deferral_accounts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_35_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_36_idx\` ON \`_regulatory_deferral_accounts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_36_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_37_idx\` ON \`rounding_adjustments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_36_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_37_idx\` ON \`_rounding_adjustments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_37_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_38_idx\` ON \`transaction_failures\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_37_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_38_idx\` ON \`_transaction_failures_v\` (\`version_tenant_id\`,\`version_reference\`);`)
}
