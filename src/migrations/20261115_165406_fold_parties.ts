import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`parties_mandates\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`mandate_id\` text NOT NULL,
  	\`local_instrument\` text DEFAULT 'CORE' NOT NULL,
  	\`status\` text DEFAULT 'active',
  	\`debtor_iban\` text NOT NULL,
  	\`debtor_bic\` text,
  	\`creditor_identifier\` text NOT NULL,
  	\`signature_date\` text NOT NULL,
  	\`signature_method\` text DEFAULT 'wet_ink',
  	\`mandate_document_id\` text(36),
  	\`last_collection_at\` text,
  	\`expiry_date\` text,
  	\`sequence_state\` text DEFAULT 'pending_first',
  	\`revoked_at\` text,
  	\`revocation_reason\` text,
  	\`notes\` text,
  	FOREIGN KEY (\`mandate_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`parties_mandates_order_idx\` ON \`parties_mandates\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`parties_mandates_parent_id_idx\` ON \`parties_mandates\` (\`_parent_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`parties_mandates_mandate_id_idx\` ON \`parties_mandates\` (\`mandate_id\`);`)
  await db.run(sql`CREATE INDEX \`parties_mandates_mandate_document_idx\` ON \`parties_mandates\` (\`mandate_document_id\`);`)
  await db.run(sql`CREATE TABLE \`parties_scorecards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`period_label\` text NOT NULL,
  	\`period_start_date\` text NOT NULL,
  	\`period_end_date\` text NOT NULL,
  	\`evaluator_id\` text(36) NOT NULL,
  	\`metrics_on_time_delivery_percent\` numeric,
  	\`metrics_quality_acceptance_rate\` numeric,
  	\`metrics_price_accuracy_percent\` numeric,
  	\`metrics_response_time_avg_hours\` numeric,
  	\`metrics_return_rate_percent\` numeric,
  	\`metrics_sustainability_score\` numeric,
  	\`metrics_cybersecurity_score\` numeric,
  	\`volumes_total_spend\` numeric DEFAULT 0,
  	\`volumes_number_of_purchase_orders\` numeric DEFAULT 0,
  	\`volumes_number_of_receipts\` numeric DEFAULT 0,
  	\`volumes_number_of_nonconformances\` numeric DEFAULT 0,
  	\`volumes_number_of_returns\` numeric DEFAULT 0,
  	\`overall_score\` numeric,
  	\`recommendation\` text NOT NULL,
  	\`status\` text DEFAULT 'draft',
  	\`improvement_plan\` text,
  	\`reviewed_with_vendor\` integer DEFAULT false,
  	\`review_meeting_date\` text,
  	\`notes\` text,
  	FOREIGN KEY (\`evaluator_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`parties_scorecards_order_idx\` ON \`parties_scorecards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`parties_scorecards_parent_id_idx\` ON \`parties_scorecards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`parties_scorecards_evaluator_idx\` ON \`parties_scorecards\` (\`evaluator_id\`);`)
  await db.run(sql`CREATE TABLE \`_parties_v_version_mandates\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`mandate_id\` text NOT NULL,
  	\`local_instrument\` text DEFAULT 'CORE' NOT NULL,
  	\`status\` text DEFAULT 'active',
  	\`debtor_iban\` text NOT NULL,
  	\`debtor_bic\` text,
  	\`creditor_identifier\` text NOT NULL,
  	\`signature_date\` text NOT NULL,
  	\`signature_method\` text DEFAULT 'wet_ink',
  	\`mandate_document_id\` text(36),
  	\`last_collection_at\` text,
  	\`expiry_date\` text,
  	\`sequence_state\` text DEFAULT 'pending_first',
  	\`revoked_at\` text,
  	\`revocation_reason\` text,
  	\`notes\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`mandate_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_parties_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_parties_v_version_mandates_order_idx\` ON \`_parties_v_version_mandates\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_parties_v_version_mandates_parent_id_idx\` ON \`_parties_v_version_mandates\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_parties_v_version_mandates_mandate_id_idx\` ON \`_parties_v_version_mandates\` (\`mandate_id\`);`)
  await db.run(sql`CREATE INDEX \`_parties_v_version_mandates_mandate_document_idx\` ON \`_parties_v_version_mandates\` (\`mandate_document_id\`);`)
  await db.run(sql`CREATE TABLE \`_parties_v_version_scorecards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`period_label\` text NOT NULL,
  	\`period_start_date\` text NOT NULL,
  	\`period_end_date\` text NOT NULL,
  	\`evaluator_id\` text(36) NOT NULL,
  	\`metrics_on_time_delivery_percent\` numeric,
  	\`metrics_quality_acceptance_rate\` numeric,
  	\`metrics_price_accuracy_percent\` numeric,
  	\`metrics_response_time_avg_hours\` numeric,
  	\`metrics_return_rate_percent\` numeric,
  	\`metrics_sustainability_score\` numeric,
  	\`metrics_cybersecurity_score\` numeric,
  	\`volumes_total_spend\` numeric DEFAULT 0,
  	\`volumes_number_of_purchase_orders\` numeric DEFAULT 0,
  	\`volumes_number_of_receipts\` numeric DEFAULT 0,
  	\`volumes_number_of_nonconformances\` numeric DEFAULT 0,
  	\`volumes_number_of_returns\` numeric DEFAULT 0,
  	\`overall_score\` numeric,
  	\`recommendation\` text NOT NULL,
  	\`status\` text DEFAULT 'draft',
  	\`improvement_plan\` text,
  	\`reviewed_with_vendor\` integer DEFAULT false,
  	\`review_meeting_date\` text,
  	\`notes\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`evaluator_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_parties_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_parties_v_version_scorecards_order_idx\` ON \`_parties_v_version_scorecards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_parties_v_version_scorecards_parent_id_idx\` ON \`_parties_v_version_scorecards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_parties_v_version_scorecards_evaluator_idx\` ON \`_parties_v_version_scorecards\` (\`evaluator_id\`);`)
  await db.run(sql`DROP TABLE \`sepa_mandates\`;`)
  await db.run(sql`DROP TABLE \`sepa_mandates_rels\`;`)
  await db.run(sql`DROP TABLE \`_sepa_mandates_v\`;`)
  await db.run(sql`DROP TABLE \`_sepa_mandates_v_rels\`;`)
  await db.run(sql`DROP TABLE \`vendor_scorecards\`;`)
  await db.run(sql`DROP TABLE \`vendor_scorecards_rels\`;`)
  await db.run(sql`DROP TABLE \`_vendor_scorecards_v\`;`)
  await db.run(sql`DROP TABLE \`_vendor_scorecards_v_rels\`;`)
  await db.run(sql`DROP INDEX \`tenant_reference_7_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_6_idx\` ON \`bank_reconciliations\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_7_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_6_idx\` ON \`_bank_reconciliations_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_8_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_7_idx\` ON \`carbon_emissions\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_8_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_7_idx\` ON \`_carbon_emissions_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_9_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_8_idx\` ON \`earnings_per_share\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_9_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_8_idx\` ON \`_earnings_per_share_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_10_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_9_idx\` ON \`lease_modifications\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_10_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_9_idx\` ON \`_lease_modifications_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_11_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_10_idx\` ON \`post_balance_sheet_events\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_11_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_10_idx\` ON \`_post_balance_sheet_events_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_12_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_11_idx\` ON \`prior_period_adjustments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_12_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_11_idx\` ON \`_prior_period_adjustments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_13_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_12_idx\` ON \`provisions\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_13_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_12_idx\` ON \`_provisions_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_14_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_13_idx\` ON \`transfer_pricing_files\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_14_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_13_idx\` ON \`_transfer_pricing_files_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_15_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_14_idx\` ON \`leave_requests\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_15_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_14_idx\` ON \`_leave_requests_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_16_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_15_idx\` ON \`maintenance_work_orders\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_16_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_15_idx\` ON \`_maintenance_work_orders_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_17_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_16_idx\` ON \`performance_reviews\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_17_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_16_idx\` ON \`_performance_reviews_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_18_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_17_idx\` ON \`sales_commissions\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_18_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_17_idx\` ON \`_sales_commissions_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_19_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_18_idx\` ON \`share_based_payments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_19_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_18_idx\` ON \`_share_based_payments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_20_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_19_idx\` ON \`work_shifts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_20_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_19_idx\` ON \`_work_shifts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_21_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_20_idx\` ON \`bills_of_materials\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_21_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_20_idx\` ON \`_bills_of_materials_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_22_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_21_idx\` ON \`cost_variances\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_22_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_21_idx\` ON \`_cost_variances_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_23_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_22_idx\` ON \`pack_items\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_23_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_22_idx\` ON \`_pack_items_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_24_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_23_idx\` ON \`work_centers\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_24_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_23_idx\` ON \`_work_centers_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_25_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_24_idx\` ON \`work_orders\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_25_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_24_idx\` ON \`_work_orders_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_26_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_25_idx\` ON \`deferred_tax_items\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_26_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_25_idx\` ON \`_deferred_tax_items_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_27_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_26_idx\` ON \`packages\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_27_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_26_idx\` ON \`_packages_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_28_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_27_idx\` ON \`production_receipts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_28_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_27_idx\` ON \`_production_receipts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_29_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_28_idx\` ON \`quality_inspections\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_29_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_28_idx\` ON \`_quality_inspections_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_30_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_29_idx\` ON \`government_grants\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_30_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_29_idx\` ON \`_government_grants_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_31_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_30_idx\` ON \`biological_assets\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_31_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_30_idx\` ON \`_biological_assets_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_32_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_31_idx\` ON \`business_combinations\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_32_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_31_idx\` ON \`_business_combinations_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_33_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_32_idx\` ON \`fair_value_measurements\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_33_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_32_idx\` ON \`_fair_value_measurements_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_34_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_33_idx\` ON \`held_for_sale_classifications\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_34_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_33_idx\` ON \`_held_for_sale_classifications_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_35_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_34_idx\` ON \`insurance_contracts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_35_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_34_idx\` ON \`_insurance_contracts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_36_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_35_idx\` ON \`investment_properties\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_36_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_35_idx\` ON \`_investment_properties_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_37_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_36_idx\` ON \`mineral_resource_assets\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_37_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_36_idx\` ON \`_mineral_resource_assets_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_38_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_37_idx\` ON \`regulatory_deferral_accounts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_38_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_37_idx\` ON \`_regulatory_deferral_accounts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_39_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_38_idx\` ON \`rounding_adjustments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_39_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_38_idx\` ON \`_rounding_adjustments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_40_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_39_idx\` ON \`transaction_failures\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_40_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_39_idx\` ON \`_transaction_failures_v\` (\`version_tenant_id\`,\`version_reference\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`sepa_mandates\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`mandate_id\` text NOT NULL,
  	\`local_instrument\` text DEFAULT 'CORE' NOT NULL,
  	\`debtor_name\` text NOT NULL,
  	\`debtor_iban\` text NOT NULL,
  	\`debtor_bic\` text,
  	\`debtor_id\` text(36),
  	\`creditor_identifier\` text NOT NULL,
  	\`signature_date\` text NOT NULL,
  	\`mandate_document_id\` text(36),
  	\`signature_method\` text DEFAULT 'wet_ink',
  	\`sequence_state\` text DEFAULT 'pending_first',
  	\`last_collection_at\` text,
  	\`expiry_date\` text,
  	\`revoked_at\` text,
  	\`revocation_reason\` text,
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`debtor_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`mandate_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`sepa_mandates_uuid_idx\` ON \`sepa_mandates\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_tenant_idx\` ON \`sepa_mandates\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_debtor_idx\` ON \`sepa_mandates\` (\`debtor_id\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_mandate_document_idx\` ON \`sepa_mandates\` (\`mandate_document_id\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_created_by_idx\` ON \`sepa_mandates\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_approved_by_idx\` ON \`sepa_mandates\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_updated_at_idx\` ON \`sepa_mandates\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_created_at_idx\` ON \`sepa_mandates\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_mandateId_idx\` ON \`sepa_mandates\` (\`tenant_id\`,\`mandate_id\`);`)
  await db.run(sql`CREATE TABLE \`sepa_mandates_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`sepa_mandates\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sepa_mandates_rels_order_idx\` ON \`sepa_mandates_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_rels_parent_idx\` ON \`sepa_mandates_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_rels_path_idx\` ON \`sepa_mandates_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_rels_users_id_idx\` ON \`sepa_mandates_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_sepa_mandates_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_mandate_id\` text NOT NULL,
  	\`version_local_instrument\` text DEFAULT 'CORE' NOT NULL,
  	\`version_debtor_name\` text NOT NULL,
  	\`version_debtor_iban\` text NOT NULL,
  	\`version_debtor_bic\` text,
  	\`version_debtor_id\` text(36),
  	\`version_creditor_identifier\` text NOT NULL,
  	\`version_signature_date\` text NOT NULL,
  	\`version_mandate_document_id\` text(36),
  	\`version_signature_method\` text DEFAULT 'wet_ink',
  	\`version_sequence_state\` text DEFAULT 'pending_first',
  	\`version_last_collection_at\` text,
  	\`version_expiry_date\` text,
  	\`version_revoked_at\` text,
  	\`version_revocation_reason\` text,
  	\`version_status\` text DEFAULT 'active',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`sepa_mandates\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_debtor_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_mandate_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_sepa_mandates_v_parent_idx\` ON \`_sepa_mandates_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sepa_mandates_v_version_version_uuid_idx\` ON \`_sepa_mandates_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_sepa_mandates_v_version_version_tenant_idx\` ON \`_sepa_mandates_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_sepa_mandates_v_version_version_debtor_idx\` ON \`_sepa_mandates_v\` (\`version_debtor_id\`);`)
  await db.run(sql`CREATE INDEX \`_sepa_mandates_v_version_version_mandate_document_idx\` ON \`_sepa_mandates_v\` (\`version_mandate_document_id\`);`)
  await db.run(sql`CREATE INDEX \`_sepa_mandates_v_version_version_created_by_idx\` ON \`_sepa_mandates_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_sepa_mandates_v_version_version_approved_by_idx\` ON \`_sepa_mandates_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_sepa_mandates_v_version_version_updated_at_idx\` ON \`_sepa_mandates_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_sepa_mandates_v_version_version_created_at_idx\` ON \`_sepa_mandates_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_sepa_mandates_v_created_at_idx\` ON \`_sepa_mandates_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_sepa_mandates_v_updated_at_idx\` ON \`_sepa_mandates_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_mandateId_idx\` ON \`_sepa_mandates_v\` (\`version_tenant_id\`,\`version_mandate_id\`);`)
  await db.run(sql`CREATE TABLE \`_sepa_mandates_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_sepa_mandates_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sepa_mandates_v_rels_order_idx\` ON \`_sepa_mandates_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_sepa_mandates_v_rels_parent_idx\` ON \`_sepa_mandates_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sepa_mandates_v_rels_path_idx\` ON \`_sepa_mandates_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_sepa_mandates_v_rels_users_id_idx\` ON \`_sepa_mandates_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`vendor_scorecards\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`vendor_id\` text(36) NOT NULL,
  	\`period_label\` text NOT NULL,
  	\`period_start_date\` text NOT NULL,
  	\`period_end_date\` text NOT NULL,
  	\`evaluator_id\` text(36) NOT NULL,
  	\`metrics_on_time_delivery_percent\` numeric,
  	\`metrics_quality_acceptance_rate\` numeric,
  	\`metrics_price_accuracy_percent\` numeric,
  	\`metrics_response_time_avg_hours\` numeric,
  	\`metrics_return_rate_percent\` numeric,
  	\`metrics_sustainability_score\` numeric,
  	\`metrics_cybersecurity_score\` numeric,
  	\`volumes_total_spend\` numeric DEFAULT 0,
  	\`volumes_number_of_purchase_orders\` numeric DEFAULT 0,
  	\`volumes_number_of_receipts\` numeric DEFAULT 0,
  	\`volumes_number_of_nonconformances\` numeric DEFAULT 0,
  	\`volumes_number_of_returns\` numeric DEFAULT 0,
  	\`overall_score\` numeric,
  	\`recommendation\` text NOT NULL,
  	\`improvement_plan\` text,
  	\`reviewed_with_vendor\` integer DEFAULT false,
  	\`review_meeting_date\` text,
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`vendor_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`evaluator_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`vendor_scorecards_uuid_idx\` ON \`vendor_scorecards\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`vendor_scorecards_tenant_idx\` ON \`vendor_scorecards\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`vendor_scorecards_vendor_idx\` ON \`vendor_scorecards\` (\`vendor_id\`);`)
  await db.run(sql`CREATE INDEX \`vendor_scorecards_evaluator_idx\` ON \`vendor_scorecards\` (\`evaluator_id\`);`)
  await db.run(sql`CREATE INDEX \`vendor_scorecards_created_by_idx\` ON \`vendor_scorecards\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`vendor_scorecards_approved_by_idx\` ON \`vendor_scorecards\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`vendor_scorecards_updated_at_idx\` ON \`vendor_scorecards\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`vendor_scorecards_created_at_idx\` ON \`vendor_scorecards\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_6_idx\` ON \`vendor_scorecards\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`CREATE TABLE \`vendor_scorecards_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`vendor_scorecards\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`vendor_scorecards_rels_order_idx\` ON \`vendor_scorecards_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`vendor_scorecards_rels_parent_idx\` ON \`vendor_scorecards_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`vendor_scorecards_rels_path_idx\` ON \`vendor_scorecards_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`vendor_scorecards_rels_users_id_idx\` ON \`vendor_scorecards_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_vendor_scorecards_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_reference\` text NOT NULL,
  	\`version_vendor_id\` text(36) NOT NULL,
  	\`version_period_label\` text NOT NULL,
  	\`version_period_start_date\` text NOT NULL,
  	\`version_period_end_date\` text NOT NULL,
  	\`version_evaluator_id\` text(36) NOT NULL,
  	\`version_metrics_on_time_delivery_percent\` numeric,
  	\`version_metrics_quality_acceptance_rate\` numeric,
  	\`version_metrics_price_accuracy_percent\` numeric,
  	\`version_metrics_response_time_avg_hours\` numeric,
  	\`version_metrics_return_rate_percent\` numeric,
  	\`version_metrics_sustainability_score\` numeric,
  	\`version_metrics_cybersecurity_score\` numeric,
  	\`version_volumes_total_spend\` numeric DEFAULT 0,
  	\`version_volumes_number_of_purchase_orders\` numeric DEFAULT 0,
  	\`version_volumes_number_of_receipts\` numeric DEFAULT 0,
  	\`version_volumes_number_of_nonconformances\` numeric DEFAULT 0,
  	\`version_volumes_number_of_returns\` numeric DEFAULT 0,
  	\`version_overall_score\` numeric,
  	\`version_recommendation\` text NOT NULL,
  	\`version_improvement_plan\` text,
  	\`version_reviewed_with_vendor\` integer DEFAULT false,
  	\`version_review_meeting_date\` text,
  	\`version_status\` text DEFAULT 'draft',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`vendor_scorecards\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_vendor_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_evaluator_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_vendor_scorecards_v_parent_idx\` ON \`_vendor_scorecards_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_scorecards_v_version_version_uuid_idx\` ON \`_vendor_scorecards_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_scorecards_v_version_version_tenant_idx\` ON \`_vendor_scorecards_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_scorecards_v_version_version_vendor_idx\` ON \`_vendor_scorecards_v\` (\`version_vendor_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_scorecards_v_version_version_evaluator_idx\` ON \`_vendor_scorecards_v\` (\`version_evaluator_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_scorecards_v_version_version_created_by_idx\` ON \`_vendor_scorecards_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_scorecards_v_version_version_approved_by_idx\` ON \`_vendor_scorecards_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_scorecards_v_version_version_updated_at_idx\` ON \`_vendor_scorecards_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_scorecards_v_version_version_created_at_idx\` ON \`_vendor_scorecards_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_scorecards_v_created_at_idx\` ON \`_vendor_scorecards_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_scorecards_v_updated_at_idx\` ON \`_vendor_scorecards_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_6_idx\` ON \`_vendor_scorecards_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`CREATE TABLE \`_vendor_scorecards_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_vendor_scorecards_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_vendor_scorecards_v_rels_order_idx\` ON \`_vendor_scorecards_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_scorecards_v_rels_parent_idx\` ON \`_vendor_scorecards_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_scorecards_v_rels_path_idx\` ON \`_vendor_scorecards_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_scorecards_v_rels_users_id_idx\` ON \`_vendor_scorecards_v_rels\` (\`users_id\`);`)
  await db.run(sql`DROP TABLE \`parties_mandates\`;`)
  await db.run(sql`DROP TABLE \`parties_scorecards\`;`)
  await db.run(sql`DROP TABLE \`_parties_v_version_mandates\`;`)
  await db.run(sql`DROP TABLE \`_parties_v_version_scorecards\`;`)
  await db.run(sql`DROP INDEX \`tenant_reference_6_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_7_idx\` ON \`bank_reconciliations\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_6_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_7_idx\` ON \`_bank_reconciliations_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_7_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_8_idx\` ON \`carbon_emissions\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_7_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_8_idx\` ON \`_carbon_emissions_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_8_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_9_idx\` ON \`earnings_per_share\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_8_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_9_idx\` ON \`_earnings_per_share_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_9_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_10_idx\` ON \`lease_modifications\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_9_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_10_idx\` ON \`_lease_modifications_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_10_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_11_idx\` ON \`post_balance_sheet_events\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_10_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_11_idx\` ON \`_post_balance_sheet_events_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_11_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_12_idx\` ON \`prior_period_adjustments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_11_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_12_idx\` ON \`_prior_period_adjustments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_12_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_13_idx\` ON \`provisions\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_12_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_13_idx\` ON \`_provisions_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_13_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_14_idx\` ON \`transfer_pricing_files\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_13_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_14_idx\` ON \`_transfer_pricing_files_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_14_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_15_idx\` ON \`leave_requests\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_14_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_15_idx\` ON \`_leave_requests_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_15_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_16_idx\` ON \`maintenance_work_orders\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_15_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_16_idx\` ON \`_maintenance_work_orders_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_16_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_17_idx\` ON \`performance_reviews\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_16_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_17_idx\` ON \`_performance_reviews_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_17_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_18_idx\` ON \`sales_commissions\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_17_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_18_idx\` ON \`_sales_commissions_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_18_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_19_idx\` ON \`share_based_payments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_18_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_19_idx\` ON \`_share_based_payments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_19_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_20_idx\` ON \`work_shifts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_19_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_20_idx\` ON \`_work_shifts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_20_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_21_idx\` ON \`bills_of_materials\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_20_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_21_idx\` ON \`_bills_of_materials_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_21_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_22_idx\` ON \`cost_variances\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_21_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_22_idx\` ON \`_cost_variances_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_22_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_23_idx\` ON \`pack_items\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_22_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_23_idx\` ON \`_pack_items_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_23_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_24_idx\` ON \`work_centers\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_23_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_24_idx\` ON \`_work_centers_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_24_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_25_idx\` ON \`work_orders\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_24_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_25_idx\` ON \`_work_orders_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_25_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_26_idx\` ON \`deferred_tax_items\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_25_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_26_idx\` ON \`_deferred_tax_items_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_26_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_27_idx\` ON \`packages\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_26_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_27_idx\` ON \`_packages_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_27_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_28_idx\` ON \`production_receipts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_27_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_28_idx\` ON \`_production_receipts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_28_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_29_idx\` ON \`quality_inspections\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_28_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_29_idx\` ON \`_quality_inspections_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_29_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_30_idx\` ON \`government_grants\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_29_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_30_idx\` ON \`_government_grants_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_30_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_31_idx\` ON \`biological_assets\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_30_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_31_idx\` ON \`_biological_assets_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_31_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_32_idx\` ON \`business_combinations\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_31_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_32_idx\` ON \`_business_combinations_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_32_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_33_idx\` ON \`fair_value_measurements\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_32_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_33_idx\` ON \`_fair_value_measurements_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_33_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_34_idx\` ON \`held_for_sale_classifications\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_33_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_34_idx\` ON \`_held_for_sale_classifications_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_34_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_35_idx\` ON \`insurance_contracts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_34_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_35_idx\` ON \`_insurance_contracts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_35_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_36_idx\` ON \`investment_properties\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_35_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_36_idx\` ON \`_investment_properties_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_36_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_37_idx\` ON \`mineral_resource_assets\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_36_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_37_idx\` ON \`_mineral_resource_assets_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_37_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_38_idx\` ON \`regulatory_deferral_accounts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_37_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_38_idx\` ON \`_regulatory_deferral_accounts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_38_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_39_idx\` ON \`rounding_adjustments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_38_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_39_idx\` ON \`_rounding_adjustments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_39_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_40_idx\` ON \`transaction_failures\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_39_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_40_idx\` ON \`_transaction_failures_v\` (\`version_tenant_id\`,\`version_reference\`);`)
}
