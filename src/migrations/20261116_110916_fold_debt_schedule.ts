import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_document_details_debt_instrument_a9db3299\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`payment_date\` text,
  	\`principal_payment\` numeric,
  	\`interest_payment\` numeric,
  	\`total_payment\` numeric,
  	\`payment_status\` text DEFAULT 'scheduled',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_debt_instrument\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_debt_instrument_a9db3299_order_idx\` ON \`pages_document_details_debt_instrument_a9db3299\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_debt_instrument_a9db3299_parent_id_idx\` ON \`pages_document_details_debt_instrument_a9db3299\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_document_details_debt_instrument_982ca23f\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`covenant_name\` text,
  	\`threshold\` text,
  	\`current_performance\` text,
  	\`tested_frequency\` text,
  	\`compliance_status\` text DEFAULT 'compliant',
  	\`covenant_definition\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_debt_instrument\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_debt_instrument_982ca23f_order_idx\` ON \`pages_document_details_debt_instrument_982ca23f\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_debt_instrument_982ca23f_parent_id_idx\` ON \`pages_document_details_debt_instrument_982ca23f\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_debt_instrument\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`entity_id\` text(36),
  	\`debt_type\` text,
  	\`debt_status\` text DEFAULT 'active',
  	\`lender_name\` text,
  	\`lender_contact\` text,
  	\`principal_amount\` numeric,
  	\`outstanding_balance\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`maturity_date\` text,
  	\`interest_rate\` text,
  	\`interest_payment_frequency\` text,
  	\`security_type\` text,
  	\`security_details\` text,
  	\`last_covenant_compliance_test\` text,
  	\`next_covenant_test\` text,
  	\`operational_covenants\` text,
  	\`restrictive_covenants\` text,
  	\`prepayment_terms\` text,
  	\`default_provisions\` text,
  	\`risk_assessment\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_debt_instrument_order_idx\` ON \`pages_blocks_debt_instrument\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_debt_instrument_parent_id_idx\` ON \`pages_blocks_debt_instrument\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_debt_instrument_path_idx\` ON \`pages_blocks_debt_instrument\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_debt_instrument_entity_idx\` ON \`pages_blocks_debt_instrument\` (\`entity_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_debt_instrument_a9db3299_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`payment_date\` text,
  	\`principal_payment\` numeric,
  	\`interest_payment\` numeric,
  	\`total_payment\` numeric,
  	\`payment_status\` text DEFAULT 'scheduled',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_debt_instrument\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_debt_instrument_a9db3299_v_order_idx\` ON \`_pages_document_details_debt_instrument_a9db3299_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_debt_instrument_a9db3299_v_parent_id_idx\` ON \`_pages_document_details_debt_instrument_a9db3299_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_debt_instrument_982ca23f_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`covenant_name\` text,
  	\`threshold\` text,
  	\`current_performance\` text,
  	\`tested_frequency\` text,
  	\`compliance_status\` text DEFAULT 'compliant',
  	\`covenant_definition\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_debt_instrument\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_debt_instrument_982ca23f_v_order_idx\` ON \`_pages_document_details_debt_instrument_982ca23f_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_debt_instrument_982ca23f_v_parent_id_idx\` ON \`_pages_document_details_debt_instrument_982ca23f_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_debt_instrument\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`entity_id\` text(36),
  	\`debt_type\` text,
  	\`debt_status\` text DEFAULT 'active',
  	\`lender_name\` text,
  	\`lender_contact\` text,
  	\`principal_amount\` numeric,
  	\`outstanding_balance\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`maturity_date\` text,
  	\`interest_rate\` text,
  	\`interest_payment_frequency\` text,
  	\`security_type\` text,
  	\`security_details\` text,
  	\`last_covenant_compliance_test\` text,
  	\`next_covenant_test\` text,
  	\`operational_covenants\` text,
  	\`restrictive_covenants\` text,
  	\`prepayment_terms\` text,
  	\`default_provisions\` text,
  	\`risk_assessment\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_debt_instrument_order_idx\` ON \`_pages_v_blocks_debt_instrument\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_debt_instrument_parent_id_idx\` ON \`_pages_v_blocks_debt_instrument\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_debt_instrument_path_idx\` ON \`_pages_v_blocks_debt_instrument\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_debt_instrument_entity_idx\` ON \`_pages_v_blocks_debt_instrument\` (\`entity_id\`);`)
  await db.run(sql`DROP TABLE \`debt_schedule_repayment_schedule\`;`)
  await db.run(sql`DROP TABLE \`debt_schedule_financial_covenants\`;`)
  await db.run(sql`DROP TABLE \`debt_schedule\`;`)
  await db.run(sql`DROP TABLE \`debt_schedule_rels\`;`)
  await db.run(sql`DROP TABLE \`_debt_schedule_v_version_repayment_schedule\`;`)
  await db.run(sql`DROP TABLE \`_debt_schedule_v_version_financial_covenants\`;`)
  await db.run(sql`DROP TABLE \`_debt_schedule_v\`;`)
  await db.run(sql`DROP TABLE \`_debt_schedule_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`pages_rels\` ADD \`legal_entities_id\` text(36) REFERENCES legal_entities(id);`)
  await db.run(sql`ALTER TABLE \`pages_rels\` ADD \`fx_transactions_id\` text(36) REFERENCES fx_transactions(id);`)
  await db.run(sql`ALTER TABLE \`pages_rels\` ADD \`internal_controls_id\` text(36) REFERENCES internal_controls(id);`)
  await db.run(sql`CREATE INDEX \`pages_rels_legal_entities_id_idx\` ON \`pages_rels\` (\`legal_entities_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_fx_transactions_id_idx\` ON \`pages_rels\` (\`fx_transactions_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_internal_controls_id_idx\` ON \`pages_rels\` (\`internal_controls_id\`,\`locale\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_rels\` ADD \`legal_entities_id\` text(36) REFERENCES legal_entities(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v_rels\` ADD \`fx_transactions_id\` text(36) REFERENCES fx_transactions(id);`)
  await db.run(sql`ALTER TABLE \`_pages_v_rels\` ADD \`internal_controls_id\` text(36) REFERENCES internal_controls(id);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_legal_entities_id_idx\` ON \`_pages_v_rels\` (\`legal_entities_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_fx_transactions_id_idx\` ON \`_pages_v_rels\` (\`fx_transactions_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_internal_controls_id_idx\` ON \`_pages_v_rels\` (\`internal_controls_id\`,\`locale\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`debt_schedule_repayment_schedule\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`payment_date\` text NOT NULL,
  	\`principal_payment\` numeric NOT NULL,
  	\`interest_payment\` numeric,
  	\`total_payment\` numeric,
  	\`payment_status\` text DEFAULT 'scheduled',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`debt_schedule\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`debt_schedule_repayment_schedule_order_idx\` ON \`debt_schedule_repayment_schedule\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_repayment_schedule_parent_id_idx\` ON \`debt_schedule_repayment_schedule\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`debt_schedule_financial_covenants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`covenant_name\` text NOT NULL,
  	\`covenant_definition\` text,
  	\`tested_frequency\` text,
  	\`threshold\` text NOT NULL,
  	\`current_performance\` text,
  	\`compliance_status\` text DEFAULT 'compliant',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`debt_schedule\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`debt_schedule_financial_covenants_order_idx\` ON \`debt_schedule_financial_covenants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_financial_covenants_parent_id_idx\` ON \`debt_schedule_financial_covenants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`debt_schedule\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`entity_id\` text(36) NOT NULL,
  	\`debt_instrument_name\` text NOT NULL,
  	\`debt_instrument_id\` text NOT NULL,
  	\`debt_type\` text NOT NULL,
  	\`lender_name\` text NOT NULL,
  	\`lender_contact\` text,
  	\`principal_amount\` numeric NOT NULL,
  	\`currency\` text NOT NULL,
  	\`issuance_date\` text NOT NULL,
  	\`maturity_date\` text NOT NULL,
  	\`interest_rate\` text,
  	\`interest_payment_frequency\` text,
  	\`outstanding_balance\` numeric NOT NULL,
  	\`security_type\` text,
  	\`security_details\` text,
  	\`operational_covenants\` text,
  	\`restrictive_covenants\` text,
  	\`prepayment_terms\` text,
  	\`default_provisions\` text,
  	\`last_covenant_compliance_test\` text,
  	\`next_covenant_test\` text,
  	\`risk_assessment\` text,
  	\`debt_status\` text DEFAULT 'active' NOT NULL,
  	\`debt_agreement_id\` text(36),
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`debt_agreement_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`debt_schedule_uuid_idx\` ON \`debt_schedule\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_tenant_idx\` ON \`debt_schedule\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_entity_idx\` ON \`debt_schedule\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_debt_instrument_name_idx\` ON \`debt_schedule\` (\`debt_instrument_name\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_debt_agreement_idx\` ON \`debt_schedule\` (\`debt_agreement_id\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_updated_at_idx\` ON \`debt_schedule\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_created_at_idx\` ON \`debt_schedule\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_debtInstrumentId_idx\` ON \`debt_schedule\` (\`tenant_id\`,\`debt_instrument_id\`);`)
  await db.run(sql`CREATE TABLE \`debt_schedule_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`legal_entities_id\` text(36),
  	\`fx_transactions_id\` text(36),
  	\`internal_controls_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`debt_schedule\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`legal_entities_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fx_transactions_id\`) REFERENCES \`fx_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`debt_schedule_rels_order_idx\` ON \`debt_schedule_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_rels_parent_idx\` ON \`debt_schedule_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_rels_path_idx\` ON \`debt_schedule_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_rels_legal_entities_id_idx\` ON \`debt_schedule_rels\` (\`legal_entities_id\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_rels_fx_transactions_id_idx\` ON \`debt_schedule_rels\` (\`fx_transactions_id\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_rels_internal_controls_id_idx\` ON \`debt_schedule_rels\` (\`internal_controls_id\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_rels_users_id_idx\` ON \`debt_schedule_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_debt_schedule_v_version_repayment_schedule\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`payment_date\` text NOT NULL,
  	\`principal_payment\` numeric NOT NULL,
  	\`interest_payment\` numeric,
  	\`total_payment\` numeric,
  	\`payment_status\` text DEFAULT 'scheduled',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_debt_schedule_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_version_repayment_schedule_order_idx\` ON \`_debt_schedule_v_version_repayment_schedule\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_version_repayment_schedule_parent_id_idx\` ON \`_debt_schedule_v_version_repayment_schedule\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_debt_schedule_v_version_financial_covenants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`covenant_name\` text NOT NULL,
  	\`covenant_definition\` text,
  	\`tested_frequency\` text,
  	\`threshold\` text NOT NULL,
  	\`current_performance\` text,
  	\`compliance_status\` text DEFAULT 'compliant',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_debt_schedule_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_version_financial_covenants_order_idx\` ON \`_debt_schedule_v_version_financial_covenants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_version_financial_covenants_parent_id_idx\` ON \`_debt_schedule_v_version_financial_covenants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_debt_schedule_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_entity_id\` text(36) NOT NULL,
  	\`version_debt_instrument_name\` text NOT NULL,
  	\`version_debt_instrument_id\` text NOT NULL,
  	\`version_debt_type\` text NOT NULL,
  	\`version_lender_name\` text NOT NULL,
  	\`version_lender_contact\` text,
  	\`version_principal_amount\` numeric NOT NULL,
  	\`version_currency\` text NOT NULL,
  	\`version_issuance_date\` text NOT NULL,
  	\`version_maturity_date\` text NOT NULL,
  	\`version_interest_rate\` text,
  	\`version_interest_payment_frequency\` text,
  	\`version_outstanding_balance\` numeric NOT NULL,
  	\`version_security_type\` text,
  	\`version_security_details\` text,
  	\`version_operational_covenants\` text,
  	\`version_restrictive_covenants\` text,
  	\`version_prepayment_terms\` text,
  	\`version_default_provisions\` text,
  	\`version_last_covenant_compliance_test\` text,
  	\`version_next_covenant_test\` text,
  	\`version_risk_assessment\` text,
  	\`version_debt_status\` text DEFAULT 'active' NOT NULL,
  	\`version_debt_agreement_id\` text(36),
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`debt_schedule\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_debt_agreement_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_parent_idx\` ON \`_debt_schedule_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_version_version_uuid_idx\` ON \`_debt_schedule_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_version_version_tenant_idx\` ON \`_debt_schedule_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_version_version_entity_idx\` ON \`_debt_schedule_v\` (\`version_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_version_version_debt_instrument_name_idx\` ON \`_debt_schedule_v\` (\`version_debt_instrument_name\`);`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_version_version_debt_agreement_idx\` ON \`_debt_schedule_v\` (\`version_debt_agreement_id\`);`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_version_version_updated_at_idx\` ON \`_debt_schedule_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_version_version_created_at_idx\` ON \`_debt_schedule_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_created_at_idx\` ON \`_debt_schedule_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_updated_at_idx\` ON \`_debt_schedule_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_debtInstrumentId_idx\` ON \`_debt_schedule_v\` (\`version_tenant_id\`,\`version_debt_instrument_id\`);`)
  await db.run(sql`CREATE TABLE \`_debt_schedule_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`legal_entities_id\` text(36),
  	\`fx_transactions_id\` text(36),
  	\`internal_controls_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_debt_schedule_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`legal_entities_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fx_transactions_id\`) REFERENCES \`fx_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_rels_order_idx\` ON \`_debt_schedule_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_rels_parent_idx\` ON \`_debt_schedule_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_rels_path_idx\` ON \`_debt_schedule_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_rels_legal_entities_id_idx\` ON \`_debt_schedule_v_rels\` (\`legal_entities_id\`);`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_rels_fx_transactions_id_idx\` ON \`_debt_schedule_v_rels\` (\`fx_transactions_id\`);`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_rels_internal_controls_id_idx\` ON \`_debt_schedule_v_rels\` (\`internal_controls_id\`);`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_rels_users_id_idx\` ON \`_debt_schedule_v_rels\` (\`users_id\`);`)
  await db.run(sql`DROP TABLE \`pages_document_details_debt_instrument_a9db3299\`;`)
  await db.run(sql`DROP TABLE \`pages_document_details_debt_instrument_982ca23f\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_debt_instrument\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_debt_instrument_a9db3299_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_debt_instrument_982ca23f_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_debt_instrument\`;`)
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
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_committee_minutes_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_rels\`("id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "audit_findings_id", "audit_committee_minutes_id", "users_id") SELECT "id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "audit_findings_id", "audit_committee_minutes_id", "users_id" FROM \`pages_rels\`;`)
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
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_committee_minutes_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_rels\`("id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "audit_findings_id", "audit_committee_minutes_id", "users_id") SELECT "id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "audit_findings_id", "audit_committee_minutes_id", "users_id" FROM \`_pages_v_rels\`;`)
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
  await db.run(sql`CREATE INDEX \`_pages_v_rels_users_id_idx\` ON \`_pages_v_rels\` (\`users_id\`,\`locale\`);`)
}
