import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`performance_obligations_milestones\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`title\` text NOT NULL,
  	\`status\` text DEFAULT 'not_started' NOT NULL,
  	\`acceptance_criteria\` text NOT NULL,
  	\`planned_completion_date\` text NOT NULL,
  	\`actual_completion_date\` text,
  	\`variance_days\` numeric,
  	\`control_transferred_at\` text,
  	\`revenue_recognized\` numeric DEFAULT 0,
  	\`invoice_id\` text(36),
  	\`order_id\` text(36),
  	\`acceptance_protocol_date\` text,
  	\`acceptance_protocol_number\` text,
  	\`notes\` text,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`performance_obligations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`performance_obligations_milestones_order_idx\` ON \`performance_obligations_milestones\` (\`order_id\`);`)
  await db.run(sql`CREATE INDEX \`performance_obligations_milestones_parent_id_idx\` ON \`performance_obligations_milestones\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`performance_obligations_milestones_invoice_idx\` ON \`performance_obligations_milestones\` (\`invoice_id\`);`)
  await db.run(sql`CREATE TABLE \`_performance_obligations_v_version_milestones\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`title\` text NOT NULL,
  	\`status\` text DEFAULT 'not_started' NOT NULL,
  	\`acceptance_criteria\` text NOT NULL,
  	\`planned_completion_date\` text NOT NULL,
  	\`actual_completion_date\` text,
  	\`variance_days\` numeric,
  	\`control_transferred_at\` text,
  	\`revenue_recognized\` numeric DEFAULT 0,
  	\`invoice_id\` text(36),
  	\`order_id\` text(36),
  	\`acceptance_protocol_date\` text,
  	\`acceptance_protocol_number\` text,
  	\`notes\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_performance_obligations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_performance_obligations_v_version_milestones_order_idx\` ON \`_performance_obligations_v_version_milestones\` (\`order_id\`);`)
  await db.run(sql`CREATE INDEX \`_performance_obligations_v_version_milestones_parent_id_idx\` ON \`_performance_obligations_v_version_milestones\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_performance_obligations_v_version_milestones_invoice_idx\` ON \`_performance_obligations_v_version_milestones\` (\`invoice_id\`);`)
  await db.run(sql`CREATE TABLE \`contracts_signatures\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`role\` text NOT NULL,
  	\`status\` text DEFAULT 'draft' NOT NULL,
  	\`name\` text NOT NULL,
  	\`email\` text,
  	\`title\` text,
  	\`provider\` text,
  	\`signed_at\` text,
  	\`verification_url\` text,
  	\`certificate_verified\` integer,
  	\`document_link\` text,
  	\`eid_verified\` integer,
  	\`notarized\` integer DEFAULT false,
  	\`notary_reference\` text,
  	\`arbitration_attested\` integer DEFAULT false,
  	\`rejection_reason\` text,
  	\`rejected_at\` text,
  	\`comments\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contracts_signatures_order_idx\` ON \`contracts_signatures\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`contracts_signatures_parent_id_idx\` ON \`contracts_signatures\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_contracts_v_version_signatures\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`role\` text NOT NULL,
  	\`status\` text DEFAULT 'draft' NOT NULL,
  	\`name\` text NOT NULL,
  	\`email\` text,
  	\`title\` text,
  	\`provider\` text,
  	\`signed_at\` text,
  	\`verification_url\` text,
  	\`certificate_verified\` integer,
  	\`document_link\` text,
  	\`eid_verified\` integer,
  	\`notarized\` integer DEFAULT false,
  	\`notary_reference\` text,
  	\`arbitration_attested\` integer DEFAULT false,
  	\`rejection_reason\` text,
  	\`rejected_at\` text,
  	\`comments\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_contracts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_contracts_v_version_signatures_order_idx\` ON \`_contracts_v_version_signatures\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_contracts_v_version_signatures_parent_id_idx\` ON \`_contracts_v_version_signatures\` (\`_parent_id\`);`)
  await db.run(sql`DROP TABLE \`contract_performance\`;`)
  await db.run(sql`DROP TABLE \`contract_performance_rels\`;`)
  await db.run(sql`DROP TABLE \`_contract_performance_v\`;`)
  await db.run(sql`DROP TABLE \`_contract_performance_v_rels\`;`)
  await db.run(sql`DROP TABLE \`contract_amendments\`;`)
  await db.run(sql`DROP TABLE \`contract_amendments_rels\`;`)
  await db.run(sql`DROP TABLE \`_contract_amendments_v\`;`)
  await db.run(sql`DROP TABLE \`_contract_amendments_v_rels\`;`)
  await db.run(sql`DROP TABLE \`contract_signatures\`;`)
  await db.run(sql`DROP TABLE \`contract_signatures_rels\`;`)
  await db.run(sql`DROP TABLE \`_contract_signatures_v\`;`)
  await db.run(sql`DROP TABLE \`_contract_signatures_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`contracts_modifications\` ADD \`reason\` text;`)
  await db.run(sql`ALTER TABLE \`contracts_modifications\` ADD \`classification\` text;`)
  await db.run(sql`ALTER TABLE \`contracts_modifications\` ADD \`original_terms\` text;`)
  await db.run(sql`ALTER TABLE \`contracts_modifications\` ADD \`new_terms\` text;`)
  await db.run(sql`ALTER TABLE \`contracts_modifications\` ADD \`planned_completion_date\` text;`)
  await db.run(sql`ALTER TABLE \`contracts_modifications\` ADD \`revised_completion_date\` text;`)
  await db.run(sql`ALTER TABLE \`contracts_modifications\` ADD \`approval_status\` text DEFAULT 'draft';`)
  await db.run(sql`ALTER TABLE \`contracts_modifications\` ADD \`approved_by_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`contracts_modifications\` ADD \`notarized\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`contracts_modifications\` ADD \`notary_reference\` text;`)
  await db.run(sql`ALTER TABLE \`contracts_modifications\` ADD \`mandatory_arbitration\` integer DEFAULT false;`)
  await db.run(sql`CREATE INDEX \`contracts_modifications_approved_by_idx\` ON \`contracts_modifications\` (\`approved_by_id\`);`)
  await db.run(sql`ALTER TABLE \`_contracts_v_version_modifications\` ADD \`reason\` text;`)
  await db.run(sql`ALTER TABLE \`_contracts_v_version_modifications\` ADD \`classification\` text;`)
  await db.run(sql`ALTER TABLE \`_contracts_v_version_modifications\` ADD \`original_terms\` text;`)
  await db.run(sql`ALTER TABLE \`_contracts_v_version_modifications\` ADD \`new_terms\` text;`)
  await db.run(sql`ALTER TABLE \`_contracts_v_version_modifications\` ADD \`planned_completion_date\` text;`)
  await db.run(sql`ALTER TABLE \`_contracts_v_version_modifications\` ADD \`revised_completion_date\` text;`)
  await db.run(sql`ALTER TABLE \`_contracts_v_version_modifications\` ADD \`approval_status\` text DEFAULT 'draft';`)
  await db.run(sql`ALTER TABLE \`_contracts_v_version_modifications\` ADD \`approved_by_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`_contracts_v_version_modifications\` ADD \`notarized\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`_contracts_v_version_modifications\` ADD \`notary_reference\` text;`)
  await db.run(sql`ALTER TABLE \`_contracts_v_version_modifications\` ADD \`mandatory_arbitration\` integer DEFAULT false;`)
  await db.run(sql`CREATE INDEX \`_contracts_v_version_modifications_approved_by_idx\` ON \`_contracts_v_version_modifications\` (\`approved_by_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`contract_performance\` (
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
  await db.run(sql`CREATE UNIQUE INDEX \`contract_performance_uuid_idx\` ON \`contract_performance\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_tenant_idx\` ON \`contract_performance\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_contract_idx\` ON \`contract_performance\` (\`contract_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_milestone_title_idx\` ON \`contract_performance\` (\`milestone_title\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_associated_invoice_idx\` ON \`contract_performance\` (\`associated_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_associated_sales_order_idx\` ON \`contract_performance\` (\`associated_sales_order_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_created_by_idx\` ON \`contract_performance\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_approved_by_idx\` ON \`contract_performance\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_updated_at_idx\` ON \`contract_performance\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_created_at_idx\` ON \`contract_performance\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`contract_performance_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`contract_performance\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contract_performance_rels_order_idx\` ON \`contract_performance_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_rels_parent_idx\` ON \`contract_performance_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_rels_path_idx\` ON \`contract_performance_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_rels_users_id_idx\` ON \`contract_performance_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_contract_performance_v\` (
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
  await db.run(sql`CREATE INDEX \`_contract_performance_v_parent_idx\` ON \`_contract_performance_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_uuid_idx\` ON \`_contract_performance_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_tenant_idx\` ON \`_contract_performance_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_contract_idx\` ON \`_contract_performance_v\` (\`version_contract_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_milestone_title_idx\` ON \`_contract_performance_v\` (\`version_milestone_title\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_associated_invoi_idx\` ON \`_contract_performance_v\` (\`version_associated_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_associated_sales_idx\` ON \`_contract_performance_v\` (\`version_associated_sales_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_created_by_idx\` ON \`_contract_performance_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_approved_by_idx\` ON \`_contract_performance_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_updated_at_idx\` ON \`_contract_performance_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_version_version_created_at_idx\` ON \`_contract_performance_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_created_at_idx\` ON \`_contract_performance_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_updated_at_idx\` ON \`_contract_performance_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_contract_performance_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_contract_performance_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_rels_order_idx\` ON \`_contract_performance_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_rels_parent_idx\` ON \`_contract_performance_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_rels_path_idx\` ON \`_contract_performance_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_rels_users_id_idx\` ON \`_contract_performance_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`contract_amendments\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`amendment_title\` text NOT NULL,
  	\`contract_id\` text(36) NOT NULL,
  	\`amendment_date\` text NOT NULL,
  	\`modification_reason\` text NOT NULL,
  	\`original_terms_summary\` text NOT NULL,
  	\`new_effective_terms\` text NOT NULL,
  	\`revenue_impact_amount\` numeric DEFAULT 0 NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`impact_classification\` text NOT NULL,
  	\`variance_analysis_planned_completion_date\` text,
  	\`variance_analysis_revised_completion_date\` text,
  	\`variance_analysis_completion_date_variance_days\` numeric,
  	\`approval_status\` text DEFAULT 'draft' NOT NULL,
  	\`zkod_zkod_notarized\` integer DEFAULT false,
  	\`zkod_zkod_notary_reference\` text,
  	\`zkod_mandatory_arbitration\` integer DEFAULT false,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`internal_notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`contract_amendments_uuid_idx\` ON \`contract_amendments\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`contract_amendments_tenant_idx\` ON \`contract_amendments\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_amendments_amendment_title_idx\` ON \`contract_amendments\` (\`amendment_title\`);`)
  await db.run(sql`CREATE INDEX \`contract_amendments_contract_idx\` ON \`contract_amendments\` (\`contract_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_amendments_created_by_idx\` ON \`contract_amendments\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_amendments_approved_by_idx\` ON \`contract_amendments\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_amendments_updated_at_idx\` ON \`contract_amendments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`contract_amendments_created_at_idx\` ON \`contract_amendments\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`contract_amendments_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`contract_amendments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contract_amendments_rels_order_idx\` ON \`contract_amendments_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`contract_amendments_rels_parent_idx\` ON \`contract_amendments_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_amendments_rels_path_idx\` ON \`contract_amendments_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`contract_amendments_rels_users_id_idx\` ON \`contract_amendments_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_contract_amendments_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_amendment_title\` text NOT NULL,
  	\`version_contract_id\` text(36) NOT NULL,
  	\`version_amendment_date\` text NOT NULL,
  	\`version_modification_reason\` text NOT NULL,
  	\`version_original_terms_summary\` text NOT NULL,
  	\`version_new_effective_terms\` text NOT NULL,
  	\`version_revenue_impact_amount\` numeric DEFAULT 0 NOT NULL,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_impact_classification\` text NOT NULL,
  	\`version_variance_analysis_planned_completion_date\` text,
  	\`version_variance_analysis_revised_completion_date\` text,
  	\`version_variance_analysis_completion_date_variance_days\` numeric,
  	\`version_approval_status\` text DEFAULT 'draft' NOT NULL,
  	\`version_zkod_zkod_notarized\` integer DEFAULT false,
  	\`version_zkod_zkod_notary_reference\` text,
  	\`version_zkod_mandatory_arbitration\` integer DEFAULT false,
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_internal_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`contract_amendments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_contract_amendments_v_parent_idx\` ON \`_contract_amendments_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_amendments_v_version_version_uuid_idx\` ON \`_contract_amendments_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_contract_amendments_v_version_version_tenant_idx\` ON \`_contract_amendments_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_amendments_v_version_version_amendment_title_idx\` ON \`_contract_amendments_v\` (\`version_amendment_title\`);`)
  await db.run(sql`CREATE INDEX \`_contract_amendments_v_version_version_contract_idx\` ON \`_contract_amendments_v\` (\`version_contract_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_amendments_v_version_version_created_by_idx\` ON \`_contract_amendments_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_amendments_v_version_version_approved_by_idx\` ON \`_contract_amendments_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_amendments_v_version_version_updated_at_idx\` ON \`_contract_amendments_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_contract_amendments_v_version_version_created_at_idx\` ON \`_contract_amendments_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_contract_amendments_v_created_at_idx\` ON \`_contract_amendments_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_contract_amendments_v_updated_at_idx\` ON \`_contract_amendments_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_contract_amendments_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_contract_amendments_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_contract_amendments_v_rels_order_idx\` ON \`_contract_amendments_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_contract_amendments_v_rels_parent_idx\` ON \`_contract_amendments_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_amendments_v_rels_path_idx\` ON \`_contract_amendments_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_contract_amendments_v_rels_users_id_idx\` ON \`_contract_amendments_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`contract_signatures\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`signature_title\` text NOT NULL,
  	\`contract_id\` text(36) NOT NULL,
  	\`signature_sequence\` numeric NOT NULL,
  	\`signatory_role\` text NOT NULL,
  	\`signatory_name\` text NOT NULL,
  	\`signatory_email\` text,
  	\`signatory_title\` text,
  	\`signature_status\` text DEFAULT 'draft' NOT NULL,
  	\`signature_timestamp\` text,
  	\`signature_provider\` text,
  	\`signature_verification_url\` text,
  	\`digital_certificate_verified\` integer DEFAULT false,
  	\`pdf_storage_link\` text,
  	\`rejection_info_rejection_reason\` text,
  	\`rejection_info_rejected_by_id\` text(36),
  	\`rejection_info_rejected_at\` text,
  	\`zkod_zkod_notarized\` integer DEFAULT false,
  	\`zkod_zkod_notary_reference\` text,
  	\`zkod_mandatory_arbitration_attested\` integer DEFAULT false,
  	\`zkod_bulgaria_eid_verified\` integer DEFAULT false,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`approval_comments\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`rejection_info_rejected_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`contract_signatures_uuid_idx\` ON \`contract_signatures\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`contract_signatures_tenant_idx\` ON \`contract_signatures\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_signatures_signature_title_idx\` ON \`contract_signatures\` (\`signature_title\`);`)
  await db.run(sql`CREATE INDEX \`contract_signatures_contract_idx\` ON \`contract_signatures\` (\`contract_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_signatures_signature_status_idx\` ON \`contract_signatures\` (\`signature_status\`);`)
  await db.run(sql`CREATE INDEX \`contract_signatures_rejection_info_rejection_info_reject_idx\` ON \`contract_signatures\` (\`rejection_info_rejected_by_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_signatures_created_by_idx\` ON \`contract_signatures\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_signatures_approved_by_idx\` ON \`contract_signatures\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_signatures_updated_at_idx\` ON \`contract_signatures\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`contract_signatures_created_at_idx\` ON \`contract_signatures\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`contract_signatures_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`contract_signatures\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contract_signatures_rels_order_idx\` ON \`contract_signatures_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`contract_signatures_rels_parent_idx\` ON \`contract_signatures_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_signatures_rels_path_idx\` ON \`contract_signatures_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`contract_signatures_rels_users_id_idx\` ON \`contract_signatures_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_contract_signatures_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_signature_title\` text NOT NULL,
  	\`version_contract_id\` text(36) NOT NULL,
  	\`version_signature_sequence\` numeric NOT NULL,
  	\`version_signatory_role\` text NOT NULL,
  	\`version_signatory_name\` text NOT NULL,
  	\`version_signatory_email\` text,
  	\`version_signatory_title\` text,
  	\`version_signature_status\` text DEFAULT 'draft' NOT NULL,
  	\`version_signature_timestamp\` text,
  	\`version_signature_provider\` text,
  	\`version_signature_verification_url\` text,
  	\`version_digital_certificate_verified\` integer DEFAULT false,
  	\`version_pdf_storage_link\` text,
  	\`version_rejection_info_rejection_reason\` text,
  	\`version_rejection_info_rejected_by_id\` text(36),
  	\`version_rejection_info_rejected_at\` text,
  	\`version_zkod_zkod_notarized\` integer DEFAULT false,
  	\`version_zkod_zkod_notary_reference\` text,
  	\`version_zkod_mandatory_arbitration_attested\` integer DEFAULT false,
  	\`version_zkod_bulgaria_eid_verified\` integer DEFAULT false,
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_approval_comments\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`contract_signatures\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_rejection_info_rejected_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_contract_signatures_v_parent_idx\` ON \`_contract_signatures_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_signatures_v_version_version_uuid_idx\` ON \`_contract_signatures_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_contract_signatures_v_version_version_tenant_idx\` ON \`_contract_signatures_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_signatures_v_version_version_signature_title_idx\` ON \`_contract_signatures_v\` (\`version_signature_title\`);`)
  await db.run(sql`CREATE INDEX \`_contract_signatures_v_version_version_contract_idx\` ON \`_contract_signatures_v\` (\`version_contract_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_signatures_v_version_version_signature_status_idx\` ON \`_contract_signatures_v\` (\`version_signature_status\`);`)
  await db.run(sql`CREATE INDEX \`_contract_signatures_v_version_rejection_info_version_re_idx\` ON \`_contract_signatures_v\` (\`version_rejection_info_rejected_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_signatures_v_version_version_created_by_idx\` ON \`_contract_signatures_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_signatures_v_version_version_approved_by_idx\` ON \`_contract_signatures_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_signatures_v_version_version_updated_at_idx\` ON \`_contract_signatures_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_contract_signatures_v_version_version_created_at_idx\` ON \`_contract_signatures_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_contract_signatures_v_created_at_idx\` ON \`_contract_signatures_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_contract_signatures_v_updated_at_idx\` ON \`_contract_signatures_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_contract_signatures_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_contract_signatures_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_contract_signatures_v_rels_order_idx\` ON \`_contract_signatures_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_contract_signatures_v_rels_parent_idx\` ON \`_contract_signatures_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_signatures_v_rels_path_idx\` ON \`_contract_signatures_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_contract_signatures_v_rels_users_id_idx\` ON \`_contract_signatures_v_rels\` (\`users_id\`);`)
  await db.run(sql`DROP TABLE \`performance_obligations_milestones\`;`)
  await db.run(sql`DROP TABLE \`_performance_obligations_v_version_milestones\`;`)
  await db.run(sql`DROP TABLE \`contracts_signatures\`;`)
  await db.run(sql`DROP TABLE \`_contracts_v_version_signatures\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_contracts_modifications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`modified_at\` text NOT NULL,
  	\`price_impact\` numeric,
  	\`modified_by_id\` text(36),
  	FOREIGN KEY (\`modified_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_contracts_modifications\`("_order", "_parent_id", "id", "modified_at", "price_impact", "modified_by_id") SELECT "_order", "_parent_id", "id", "modified_at", "price_impact", "modified_by_id" FROM \`contracts_modifications\`;`)
  await db.run(sql`DROP TABLE \`contracts_modifications\`;`)
  await db.run(sql`ALTER TABLE \`__new_contracts_modifications\` RENAME TO \`contracts_modifications\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`contracts_modifications_order_idx\` ON \`contracts_modifications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`contracts_modifications_parent_id_idx\` ON \`contracts_modifications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contracts_modifications_modified_by_idx\` ON \`contracts_modifications\` (\`modified_by_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__contracts_v_version_modifications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`modified_at\` text NOT NULL,
  	\`price_impact\` numeric,
  	\`modified_by_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`modified_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_contracts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__contracts_v_version_modifications\`("_order", "_parent_id", "id", "modified_at", "price_impact", "modified_by_id", "_uuid") SELECT "_order", "_parent_id", "id", "modified_at", "price_impact", "modified_by_id", "_uuid" FROM \`_contracts_v_version_modifications\`;`)
  await db.run(sql`DROP TABLE \`_contracts_v_version_modifications\`;`)
  await db.run(sql`ALTER TABLE \`__new__contracts_v_version_modifications\` RENAME TO \`_contracts_v_version_modifications\`;`)
  await db.run(sql`CREATE INDEX \`_contracts_v_version_modifications_order_idx\` ON \`_contracts_v_version_modifications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_contracts_v_version_modifications_parent_id_idx\` ON \`_contracts_v_version_modifications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_contracts_v_version_modifications_modified_by_idx\` ON \`_contracts_v_version_modifications\` (\`modified_by_id\`);`)
}
