import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_document_details_insurance_contr_057e38d7\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`measurement_model\` text,
  	\`line_of_business\` text,
  	\`status\` text DEFAULT 'recognised',
  	\`portfolio_id\` text,
  	\`cohort_year\` numeric,
  	\`profitability_group\` text,
  	\`coverage_end_date\` text,
  	\`future_cashflows_estimate\` numeric,
  	\`discount_rate\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`risk_adjustment\` numeric DEFAULT 0,
  	\`csm\` numeric DEFAULT 0,
  	\`loss_component\` numeric DEFAULT 0,
  	\`reinsurance_contract_id\` text(36),
  	\`fair_value_measurement_id\` text(36),
  	\`journal_entry_id\` text(36),
  	\`notes\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`reinsurance_contract_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fair_value_measurement_id\`) REFERENCES \`fair_value_measurements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_insurance_contr_057e38d7_order_idx\` ON \`pages_document_details_insurance_contr_057e38d7\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_insurance_contr_057e38d7_parent_id_idx\` ON \`pages_document_details_insurance_contr_057e38d7\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_insurance_contr_057e38d7_path_idx\` ON \`pages_document_details_insurance_contr_057e38d7\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_insurance_contr_057e38d7_reinsura_idx\` ON \`pages_document_details_insurance_contr_057e38d7\` (\`reinsurance_contract_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_insurance_contr_057e38d7_fair_val_idx\` ON \`pages_document_details_insurance_contr_057e38d7\` (\`fair_value_measurement_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_insurance_contr_057e38d7_journal__idx\` ON \`pages_document_details_insurance_contr_057e38d7\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_insurance_contr_057e38d7_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`measurement_model\` text,
  	\`line_of_business\` text,
  	\`status\` text DEFAULT 'recognised',
  	\`portfolio_id\` text,
  	\`cohort_year\` numeric,
  	\`profitability_group\` text,
  	\`coverage_end_date\` text,
  	\`future_cashflows_estimate\` numeric,
  	\`discount_rate\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`risk_adjustment\` numeric DEFAULT 0,
  	\`csm\` numeric DEFAULT 0,
  	\`loss_component\` numeric DEFAULT 0,
  	\`reinsurance_contract_id\` text(36),
  	\`fair_value_measurement_id\` text(36),
  	\`journal_entry_id\` text(36),
  	\`notes\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`reinsurance_contract_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fair_value_measurement_id\`) REFERENCES \`fair_value_measurements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_insurance_contr_057e38d7_v_order_idx\` ON \`_pages_document_details_insurance_contr_057e38d7_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_insurance_contr_057e38d7_v_parent_id_idx\` ON \`_pages_document_details_insurance_contr_057e38d7_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_insurance_contr_057e38d7_v_path_idx\` ON \`_pages_document_details_insurance_contr_057e38d7_v\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_insurance_contr_057e38d7_v_reins_idx\` ON \`_pages_document_details_insurance_contr_057e38d7_v\` (\`reinsurance_contract_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_insurance_contr_057e38d7_v_fair__idx\` ON \`_pages_document_details_insurance_contr_057e38d7_v\` (\`fair_value_measurement_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_insurance_contr_057e38d7_v_journ_idx\` ON \`_pages_document_details_insurance_contr_057e38d7_v\` (\`journal_entry_id\`);`)
  await db.run(sql`DROP TABLE \`insurance_contracts\`;`)
  await db.run(sql`DROP TABLE \`insurance_contracts_rels\`;`)
  await db.run(sql`DROP TABLE \`_insurance_contracts_v\`;`)
  await db.run(sql`DROP TABLE \`_insurance_contracts_v_rels\`;`)
  await db.run(sql`DROP INDEX \`tenant_reference_33_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_32_idx\` ON \`investment_properties\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_33_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_32_idx\` ON \`_investment_properties_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_34_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_33_idx\` ON \`mineral_resource_assets\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_34_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_33_idx\` ON \`_mineral_resource_assets_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_35_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_34_idx\` ON \`regulatory_deferral_accounts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_35_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_34_idx\` ON \`_regulatory_deferral_accounts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_36_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_35_idx\` ON \`rounding_adjustments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_36_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_35_idx\` ON \`_rounding_adjustments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_37_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_36_idx\` ON \`transaction_failures\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_37_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_36_idx\` ON \`_transaction_failures_v\` (\`version_tenant_id\`,\`version_reference\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`insurance_contracts\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`measurement_model\` text NOT NULL,
  	\`line_of_business\` text NOT NULL,
  	\`portfolio_id\` text NOT NULL,
  	\`cohort_year\` numeric NOT NULL,
  	\`profitability_group\` text NOT NULL,
  	\`inception_date\` text NOT NULL,
  	\`coverage_end_date\` text,
  	\`future_cashflows_estimate\` numeric NOT NULL,
  	\`discount_rate\` numeric NOT NULL,
  	\`risk_adjustment\` numeric DEFAULT 0,
  	\`csm\` numeric DEFAULT 0,
  	\`loss_component\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`reinsurance_contract_id\` text(36),
  	\`fair_value_measurement_id\` text(36),
  	\`journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'recognised',
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reinsurance_contract_id\`) REFERENCES \`insurance_contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fair_value_measurement_id\`) REFERENCES \`fair_value_measurements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`insurance_contracts_uuid_idx\` ON \`insurance_contracts\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`insurance_contracts_tenant_idx\` ON \`insurance_contracts\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`insurance_contracts_inception_date_idx\` ON \`insurance_contracts\` (\`inception_date\`);`)
  await db.run(sql`CREATE INDEX \`insurance_contracts_reinsurance_contract_idx\` ON \`insurance_contracts\` (\`reinsurance_contract_id\`);`)
  await db.run(sql`CREATE INDEX \`insurance_contracts_fair_value_measurement_idx\` ON \`insurance_contracts\` (\`fair_value_measurement_id\`);`)
  await db.run(sql`CREATE INDEX \`insurance_contracts_journal_entry_idx\` ON \`insurance_contracts\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`insurance_contracts_approved_by_idx\` ON \`insurance_contracts\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`insurance_contracts_updated_at_idx\` ON \`insurance_contracts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`insurance_contracts_created_at_idx\` ON \`insurance_contracts\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_32_idx\` ON \`insurance_contracts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`CREATE TABLE \`insurance_contracts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`insurance_contracts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`insurance_contracts_rels_order_idx\` ON \`insurance_contracts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`insurance_contracts_rels_parent_idx\` ON \`insurance_contracts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`insurance_contracts_rels_path_idx\` ON \`insurance_contracts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`insurance_contracts_rels_users_id_idx\` ON \`insurance_contracts_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_insurance_contracts_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_reference\` text NOT NULL,
  	\`version_measurement_model\` text NOT NULL,
  	\`version_line_of_business\` text NOT NULL,
  	\`version_portfolio_id\` text NOT NULL,
  	\`version_cohort_year\` numeric NOT NULL,
  	\`version_profitability_group\` text NOT NULL,
  	\`version_inception_date\` text NOT NULL,
  	\`version_coverage_end_date\` text,
  	\`version_future_cashflows_estimate\` numeric NOT NULL,
  	\`version_discount_rate\` numeric NOT NULL,
  	\`version_risk_adjustment\` numeric DEFAULT 0,
  	\`version_csm\` numeric DEFAULT 0,
  	\`version_loss_component\` numeric DEFAULT 0,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_reinsurance_contract_id\` text(36),
  	\`version_fair_value_measurement_id\` text(36),
  	\`version_journal_entry_id\` text(36),
  	\`version_status\` text DEFAULT 'recognised',
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`insurance_contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_reinsurance_contract_id\`) REFERENCES \`insurance_contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_fair_value_measurement_id\`) REFERENCES \`fair_value_measurements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_insurance_contracts_v_parent_idx\` ON \`_insurance_contracts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_insurance_contracts_v_version_version_uuid_idx\` ON \`_insurance_contracts_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_insurance_contracts_v_version_version_tenant_idx\` ON \`_insurance_contracts_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_insurance_contracts_v_version_version_inception_date_idx\` ON \`_insurance_contracts_v\` (\`version_inception_date\`);`)
  await db.run(sql`CREATE INDEX \`_insurance_contracts_v_version_version_reinsurance_contr_idx\` ON \`_insurance_contracts_v\` (\`version_reinsurance_contract_id\`);`)
  await db.run(sql`CREATE INDEX \`_insurance_contracts_v_version_version_fair_value_measur_idx\` ON \`_insurance_contracts_v\` (\`version_fair_value_measurement_id\`);`)
  await db.run(sql`CREATE INDEX \`_insurance_contracts_v_version_version_journal_entry_idx\` ON \`_insurance_contracts_v\` (\`version_journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`_insurance_contracts_v_version_version_approved_by_idx\` ON \`_insurance_contracts_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_insurance_contracts_v_version_version_updated_at_idx\` ON \`_insurance_contracts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_insurance_contracts_v_version_version_created_at_idx\` ON \`_insurance_contracts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_insurance_contracts_v_created_at_idx\` ON \`_insurance_contracts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_insurance_contracts_v_updated_at_idx\` ON \`_insurance_contracts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_32_idx\` ON \`_insurance_contracts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`CREATE TABLE \`_insurance_contracts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_insurance_contracts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_insurance_contracts_v_rels_order_idx\` ON \`_insurance_contracts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_insurance_contracts_v_rels_parent_idx\` ON \`_insurance_contracts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_insurance_contracts_v_rels_path_idx\` ON \`_insurance_contracts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_insurance_contracts_v_rels_users_id_idx\` ON \`_insurance_contracts_v_rels\` (\`users_id\`);`)
  await db.run(sql`DROP TABLE \`pages_document_details_insurance_contr_057e38d7\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_insurance_contr_057e38d7_v\`;`)
  await db.run(sql`DROP INDEX \`tenant_reference_32_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_33_idx\` ON \`investment_properties\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_32_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_33_idx\` ON \`_investment_properties_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_33_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_34_idx\` ON \`mineral_resource_assets\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_33_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_34_idx\` ON \`_mineral_resource_assets_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_34_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_35_idx\` ON \`regulatory_deferral_accounts\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_34_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_35_idx\` ON \`_regulatory_deferral_accounts_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_35_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_36_idx\` ON \`rounding_adjustments\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_35_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_36_idx\` ON \`_rounding_adjustments_v\` (\`version_tenant_id\`,\`version_reference\`);`)
  await db.run(sql`DROP INDEX \`tenant_reference_36_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_reference_37_idx\` ON \`transaction_failures\` (\`tenant_id\`,\`reference\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_reference_36_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_reference_37_idx\` ON \`_transaction_failures_v\` (\`version_tenant_id\`,\`version_reference\`);`)
}
