import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`audit_findings_remediation_action_step_18c0fcdc\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`description\` text NOT NULL,
  	\`status\` text DEFAULT 'not-started',
  	\`owner\` text,
  	\`target_date\` text,
  	\`completed_date\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`audit_findings_remediation_action_step_18c0fcdc_order_idx\` ON \`audit_findings_remediation_action_step_18c0fcdc\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_remediation_action_step_18c0fcdc_parent_id_idx\` ON \`audit_findings_remediation_action_step_18c0fcdc\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_audit_findings_remediation_action_step_18c0fcdc_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`description\` text NOT NULL,
  	\`status\` text DEFAULT 'not-started',
  	\`owner\` text,
  	\`target_date\` text,
  	\`completed_date\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_findings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_audit_findings_remediation_action_step_18c0fcdc_v_order_idx\` ON \`_audit_findings_remediation_action_step_18c0fcdc_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_audit_findings_remediation_action_step_18c0fcdc_v_parent_id_idx\` ON \`_audit_findings_remediation_action_step_18c0fcdc_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`compliance_gaps_remediation_action_ste_4120a6f2\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`description\` text NOT NULL,
  	\`status\` text DEFAULT 'not-started',
  	\`owner\` text,
  	\`target_date\` text,
  	\`completed_date\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`compliance_gaps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`compliance_gaps_remediation_action_ste_4120a6f2_order_idx\` ON \`compliance_gaps_remediation_action_ste_4120a6f2\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`compliance_gaps_remediation_action_ste_4120a6f2_parent_id_idx\` ON \`compliance_gaps_remediation_action_ste_4120a6f2\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_compliance_gaps_remediation_action_ste_4120a6f2_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`description\` text NOT NULL,
  	\`status\` text DEFAULT 'not-started',
  	\`owner\` text,
  	\`target_date\` text,
  	\`completed_date\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_compliance_gaps_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_compliance_gaps_remediation_action_ste_4120a6f2_v_order_idx\` ON \`_compliance_gaps_remediation_action_ste_4120a6f2_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_gaps_remediation_action_ste_4120a6f2_v_parent_id_idx\` ON \`_compliance_gaps_remediation_action_ste_4120a6f2_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`internal_policies_acknowledgments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`employee_name\` text NOT NULL,
  	\`employee_id\` text,
  	\`status\` text DEFAULT 'pending',
  	\`policy_version\` text,
  	\`acknowledged_at\` text,
  	\`acknowledged_by\` text,
  	\`signed_document_id\` text(36),
  	FOREIGN KEY (\`signed_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`internal_policies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`internal_policies_acknowledgments_order_idx\` ON \`internal_policies_acknowledgments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`internal_policies_acknowledgments_parent_id_idx\` ON \`internal_policies_acknowledgments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_policies_acknowledgments_policy_version_idx\` ON \`internal_policies_acknowledgments\` (\`policy_version\`);`)
  await db.run(sql`CREATE INDEX \`internal_policies_acknowledgments_signed_document_idx\` ON \`internal_policies_acknowledgments\` (\`signed_document_id\`);`)
  await db.run(sql`CREATE TABLE \`_internal_policies_v_version_acknowledgments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`employee_name\` text NOT NULL,
  	\`employee_id\` text,
  	\`status\` text DEFAULT 'pending',
  	\`policy_version\` text,
  	\`acknowledged_at\` text,
  	\`acknowledged_by\` text,
  	\`signed_document_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`signed_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_internal_policies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_internal_policies_v_version_acknowledgments_order_idx\` ON \`_internal_policies_v_version_acknowledgments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_internal_policies_v_version_acknowledgments_parent_id_idx\` ON \`_internal_policies_v_version_acknowledgments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_internal_policies_v_version_acknowledgments_policy_vers_idx\` ON \`_internal_policies_v_version_acknowledgments\` (\`policy_version\`);`)
  await db.run(sql`CREATE INDEX \`_internal_policies_v_version_acknowledgments_signed_docu_idx\` ON \`_internal_policies_v_version_acknowledgments\` (\`signed_document_id\`);`)
  await db.run(sql`DROP TABLE \`policy_acknowledgments\`;`)
  await db.run(sql`DROP TABLE \`policy_acknowledgments_rels\`;`)
  await db.run(sql`DROP TABLE \`_policy_acknowledgments_v\`;`)
  await db.run(sql`DROP TABLE \`_policy_acknowledgments_v_rels\`;`)
  await db.run(sql`DROP TABLE \`remediation_plans_action_steps\`;`)
  await db.run(sql`DROP TABLE \`remediation_plans\`;`)
  await db.run(sql`DROP TABLE \`remediation_plans_rels\`;`)
  await db.run(sql`DROP TABLE \`_remediation_plans_v_version_action_steps\`;`)
  await db.run(sql`DROP TABLE \`_remediation_plans_v\`;`)
  await db.run(sql`DROP TABLE \`_remediation_plans_v_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_form_submissions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`addresses_id\` text(36),
  	\`audit_committees_id\` text(36),
  	\`audit_evidence_id\` text(36),
  	\`audit_findings_id\` text(36),
  	\`bank_accounts_id\` text(36),
  	\`bank_statements_id\` text(36),
  	\`bookable_resources_id\` text(36),
  	\`categories_id\` text(36),
  	\`compliance_frameworks_id\` text(36),
  	\`compliance_requirements_id\` text(36),
  	\`consent_records_id\` text(36),
  	\`consignment_arrangements_id\` text(36),
  	\`consolidations_id\` text(36),
  	\`contracts_id\` text(36),
  	\`control_tests_id\` text(36),
  	\`cost_centers_id\` text(36),
  	\`employees_id\` text(36),
  	\`entity_types_id\` text(36),
  	\`evidence_attestations_id\` text(36),
  	\`fair_value_measurements_id\` text(36),
  	\`fiscal_devices_id\` text(36),
  	\`fiscal_periods_id\` text(36),
  	\`fixed_assets_id\` text(36),
  	\`fx_transactions_id\` text(36),
  	\`gl_accounts_id\` text,
  	\`goods_receipts_id\` text(36),
  	\`government_grants_id\` text(36),
  	\`internal_controls_id\` text(36),
  	\`internal_policies_id\` text(36),
  	\`inventory_movements_id\` text(36),
  	\`investment_properties_id\` text(36),
  	\`invoices_id\` text(36),
  	\`job_positions_id\` text(36),
  	\`journal_entries_id\` text(36),
  	\`leads_id\` text(36),
  	\`leases_id\` text(36),
  	\`legal_entities_id\` text(36),
  	\`lot_variants_id\` text(36),
  	\`lot_work_phases_id\` text(36),
  	\`lots_id\` text(36),
  	\`media_id\` text(36),
  	\`operators_id\` text(36),
  	\`opportunities_id\` text(36),
  	\`orders_id\` text(36),
  	\`pages_id\` text(36),
  	\`parties_id\` text(36),
  	\`payroll_runs_id\` text(36),
  	\`posts_id\` text(36),
  	\`products_id\` text(36),
  	\`projects_id\` text(36),
  	\`properties_id\` text(36),
  	\`provisions_id\` text(36),
  	\`quality_inspections_id\` text(36),
  	\`receipts_id\` text(36),
  	\`shipments_id\` text(36),
  	\`spaces_id\` text(36),
  	\`subscriptions_id\` text(36),
  	\`tax_codes_id\` text(36),
  	\`tax_jurisdictions_id\` text(36),
  	\`tenants_id\` text(36),
  	\`terminals_id\` text(36),
  	\`transactions_id\` text(36),
  	\`users_id\` text(36),
  	\`warehouse_locations_id\` text(36),
  	\`work_centers_id\` text(36),
  	\`work_orders_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`addresses_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_committees_id\`) REFERENCES \`audit_committees\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_evidence_id\`) REFERENCES \`audit_evidence\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`bank_accounts_id\`) REFERENCES \`bank_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`bank_statements_id\`) REFERENCES \`bank_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`bookable_resources_id\`) REFERENCES \`bookable_resources\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_frameworks_id\`) REFERENCES \`compliance_frameworks\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_requirements_id\`) REFERENCES \`compliance_requirements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`consent_records_id\`) REFERENCES \`consent_records\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`consignment_arrangements_id\`) REFERENCES \`consignment_arrangements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`consolidations_id\`) REFERENCES \`consolidations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`contracts_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`control_tests_id\`) REFERENCES \`control_tests\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`cost_centers_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`employees_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`entity_types_id\`) REFERENCES \`entity_types\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`evidence_attestations_id\`) REFERENCES \`evidence_attestations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fair_value_measurements_id\`) REFERENCES \`fair_value_measurements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fiscal_devices_id\`) REFERENCES \`fiscal_devices\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fiscal_periods_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fixed_assets_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fx_transactions_id\`) REFERENCES \`fx_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`gl_accounts_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`goods_receipts_id\`) REFERENCES \`goods_receipts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`government_grants_id\`) REFERENCES \`government_grants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_policies_id\`) REFERENCES \`internal_policies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`inventory_movements_id\`) REFERENCES \`inventory_movements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`investment_properties_id\`) REFERENCES \`investment_properties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`invoices_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`job_positions_id\`) REFERENCES \`job_positions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`journal_entries_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`leads_id\`) REFERENCES \`leads\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`leases_id\`) REFERENCES \`leases\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`legal_entities_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`lot_variants_id\`) REFERENCES \`lot_variants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`lot_work_phases_id\`) REFERENCES \`lot_work_phases\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`lots_id\`) REFERENCES \`lots\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`operators_id\`) REFERENCES \`operators\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`opportunities_id\`) REFERENCES \`opportunities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`orders_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`parties_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`payroll_runs_id\`) REFERENCES \`payroll_runs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`properties_id\`) REFERENCES \`properties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`provisions_id\`) REFERENCES \`provisions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`quality_inspections_id\`) REFERENCES \`quality_inspections\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`receipts_id\`) REFERENCES \`receipts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`shipments_id\`) REFERENCES \`shipments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`spaces_id\`) REFERENCES \`spaces\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`subscriptions_id\`) REFERENCES \`subscriptions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tax_codes_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tax_jurisdictions_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tenants_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`terminals_id\`) REFERENCES \`terminals\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`transactions_id\`) REFERENCES \`transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`warehouse_locations_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`work_centers_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`work_orders_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_form_submissions_rels\`("id", "order", "parent_id", "path", "addresses_id", "audit_committees_id", "audit_evidence_id", "audit_findings_id", "bank_accounts_id", "bank_statements_id", "bookable_resources_id", "categories_id", "compliance_frameworks_id", "compliance_requirements_id", "consent_records_id", "consignment_arrangements_id", "consolidations_id", "contracts_id", "control_tests_id", "cost_centers_id", "employees_id", "entity_types_id", "evidence_attestations_id", "fair_value_measurements_id", "fiscal_devices_id", "fiscal_periods_id", "fixed_assets_id", "fx_transactions_id", "gl_accounts_id", "goods_receipts_id", "government_grants_id", "internal_controls_id", "internal_policies_id", "inventory_movements_id", "investment_properties_id", "invoices_id", "job_positions_id", "journal_entries_id", "leads_id", "leases_id", "legal_entities_id", "lot_variants_id", "lot_work_phases_id", "lots_id", "media_id", "operators_id", "opportunities_id", "orders_id", "pages_id", "parties_id", "payroll_runs_id", "posts_id", "products_id", "projects_id", "properties_id", "provisions_id", "quality_inspections_id", "receipts_id", "shipments_id", "spaces_id", "subscriptions_id", "tax_codes_id", "tax_jurisdictions_id", "tenants_id", "terminals_id", "transactions_id", "users_id", "warehouse_locations_id", "work_centers_id", "work_orders_id") SELECT "id", "order", "parent_id", "path", "addresses_id", "audit_committees_id", "audit_evidence_id", "audit_findings_id", "bank_accounts_id", "bank_statements_id", "bookable_resources_id", "categories_id", "compliance_frameworks_id", "compliance_requirements_id", "consent_records_id", "consignment_arrangements_id", "consolidations_id", "contracts_id", "control_tests_id", "cost_centers_id", "employees_id", "entity_types_id", "evidence_attestations_id", "fair_value_measurements_id", "fiscal_devices_id", "fiscal_periods_id", "fixed_assets_id", "fx_transactions_id", "gl_accounts_id", "goods_receipts_id", "government_grants_id", "internal_controls_id", "internal_policies_id", "inventory_movements_id", "investment_properties_id", "invoices_id", "job_positions_id", "journal_entries_id", "leads_id", "leases_id", "legal_entities_id", "lot_variants_id", "lot_work_phases_id", "lots_id", "media_id", "operators_id", "opportunities_id", "orders_id", "pages_id", "parties_id", "payroll_runs_id", "posts_id", "products_id", "projects_id", "properties_id", "provisions_id", "quality_inspections_id", "receipts_id", "shipments_id", "spaces_id", "subscriptions_id", "tax_codes_id", "tax_jurisdictions_id", "tenants_id", "terminals_id", "transactions_id", "users_id", "warehouse_locations_id", "work_centers_id", "work_orders_id" FROM \`form_submissions_rels\`;`)
  await db.run(sql`DROP TABLE \`form_submissions_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_form_submissions_rels\` RENAME TO \`form_submissions_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_order_idx\` ON \`form_submissions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_parent_idx\` ON \`form_submissions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_path_idx\` ON \`form_submissions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_addresses_id_idx\` ON \`form_submissions_rels\` (\`addresses_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_audit_committees_id_idx\` ON \`form_submissions_rels\` (\`audit_committees_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_audit_evidence_id_idx\` ON \`form_submissions_rels\` (\`audit_evidence_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_audit_findings_id_idx\` ON \`form_submissions_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_bank_accounts_id_idx\` ON \`form_submissions_rels\` (\`bank_accounts_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_bank_statements_id_idx\` ON \`form_submissions_rels\` (\`bank_statements_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_bookable_resources_id_idx\` ON \`form_submissions_rels\` (\`bookable_resources_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_categories_id_idx\` ON \`form_submissions_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_compliance_frameworks_id_idx\` ON \`form_submissions_rels\` (\`compliance_frameworks_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_compliance_requirements_id_idx\` ON \`form_submissions_rels\` (\`compliance_requirements_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_consent_records_id_idx\` ON \`form_submissions_rels\` (\`consent_records_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_consignment_arrangements_id_idx\` ON \`form_submissions_rels\` (\`consignment_arrangements_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_consolidations_id_idx\` ON \`form_submissions_rels\` (\`consolidations_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_contracts_id_idx\` ON \`form_submissions_rels\` (\`contracts_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_control_tests_id_idx\` ON \`form_submissions_rels\` (\`control_tests_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_cost_centers_id_idx\` ON \`form_submissions_rels\` (\`cost_centers_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_employees_id_idx\` ON \`form_submissions_rels\` (\`employees_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_entity_types_id_idx\` ON \`form_submissions_rels\` (\`entity_types_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_evidence_attestations_id_idx\` ON \`form_submissions_rels\` (\`evidence_attestations_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_fair_value_measurements_id_idx\` ON \`form_submissions_rels\` (\`fair_value_measurements_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_fiscal_devices_id_idx\` ON \`form_submissions_rels\` (\`fiscal_devices_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_fiscal_periods_id_idx\` ON \`form_submissions_rels\` (\`fiscal_periods_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_fixed_assets_id_idx\` ON \`form_submissions_rels\` (\`fixed_assets_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_fx_transactions_id_idx\` ON \`form_submissions_rels\` (\`fx_transactions_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_gl_accounts_id_idx\` ON \`form_submissions_rels\` (\`gl_accounts_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_goods_receipts_id_idx\` ON \`form_submissions_rels\` (\`goods_receipts_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_government_grants_id_idx\` ON \`form_submissions_rels\` (\`government_grants_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_internal_controls_id_idx\` ON \`form_submissions_rels\` (\`internal_controls_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_internal_policies_id_idx\` ON \`form_submissions_rels\` (\`internal_policies_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_inventory_movements_id_idx\` ON \`form_submissions_rels\` (\`inventory_movements_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_investment_properties_id_idx\` ON \`form_submissions_rels\` (\`investment_properties_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_invoices_id_idx\` ON \`form_submissions_rels\` (\`invoices_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_job_positions_id_idx\` ON \`form_submissions_rels\` (\`job_positions_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_journal_entries_id_idx\` ON \`form_submissions_rels\` (\`journal_entries_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_leads_id_idx\` ON \`form_submissions_rels\` (\`leads_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_leases_id_idx\` ON \`form_submissions_rels\` (\`leases_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_legal_entities_id_idx\` ON \`form_submissions_rels\` (\`legal_entities_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_lot_variants_id_idx\` ON \`form_submissions_rels\` (\`lot_variants_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_lot_work_phases_id_idx\` ON \`form_submissions_rels\` (\`lot_work_phases_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_lots_id_idx\` ON \`form_submissions_rels\` (\`lots_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_media_id_idx\` ON \`form_submissions_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_operators_id_idx\` ON \`form_submissions_rels\` (\`operators_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_opportunities_id_idx\` ON \`form_submissions_rels\` (\`opportunities_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_orders_id_idx\` ON \`form_submissions_rels\` (\`orders_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_pages_id_idx\` ON \`form_submissions_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_parties_id_idx\` ON \`form_submissions_rels\` (\`parties_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_payroll_runs_id_idx\` ON \`form_submissions_rels\` (\`payroll_runs_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_posts_id_idx\` ON \`form_submissions_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_products_id_idx\` ON \`form_submissions_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_projects_id_idx\` ON \`form_submissions_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_properties_id_idx\` ON \`form_submissions_rels\` (\`properties_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_provisions_id_idx\` ON \`form_submissions_rels\` (\`provisions_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_quality_inspections_id_idx\` ON \`form_submissions_rels\` (\`quality_inspections_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_receipts_id_idx\` ON \`form_submissions_rels\` (\`receipts_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_shipments_id_idx\` ON \`form_submissions_rels\` (\`shipments_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_spaces_id_idx\` ON \`form_submissions_rels\` (\`spaces_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_subscriptions_id_idx\` ON \`form_submissions_rels\` (\`subscriptions_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_tax_codes_id_idx\` ON \`form_submissions_rels\` (\`tax_codes_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_tax_jurisdictions_id_idx\` ON \`form_submissions_rels\` (\`tax_jurisdictions_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_tenants_id_idx\` ON \`form_submissions_rels\` (\`tenants_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_terminals_id_idx\` ON \`form_submissions_rels\` (\`terminals_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_transactions_id_idx\` ON \`form_submissions_rels\` (\`transactions_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_users_id_idx\` ON \`form_submissions_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_warehouse_locations_id_idx\` ON \`form_submissions_rels\` (\`warehouse_locations_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_work_centers_id_idx\` ON \`form_submissions_rels\` (\`work_centers_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_work_orders_id_idx\` ON \`form_submissions_rels\` (\`work_orders_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__form_submissions_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`addresses_id\` text(36),
  	\`audit_committees_id\` text(36),
  	\`audit_evidence_id\` text(36),
  	\`audit_findings_id\` text(36),
  	\`bank_accounts_id\` text(36),
  	\`bank_statements_id\` text(36),
  	\`bookable_resources_id\` text(36),
  	\`categories_id\` text(36),
  	\`compliance_frameworks_id\` text(36),
  	\`compliance_requirements_id\` text(36),
  	\`consent_records_id\` text(36),
  	\`consignment_arrangements_id\` text(36),
  	\`consolidations_id\` text(36),
  	\`contracts_id\` text(36),
  	\`control_tests_id\` text(36),
  	\`cost_centers_id\` text(36),
  	\`employees_id\` text(36),
  	\`entity_types_id\` text(36),
  	\`evidence_attestations_id\` text(36),
  	\`fair_value_measurements_id\` text(36),
  	\`fiscal_devices_id\` text(36),
  	\`fiscal_periods_id\` text(36),
  	\`fixed_assets_id\` text(36),
  	\`fx_transactions_id\` text(36),
  	\`gl_accounts_id\` text,
  	\`goods_receipts_id\` text(36),
  	\`government_grants_id\` text(36),
  	\`internal_controls_id\` text(36),
  	\`internal_policies_id\` text(36),
  	\`inventory_movements_id\` text(36),
  	\`investment_properties_id\` text(36),
  	\`invoices_id\` text(36),
  	\`job_positions_id\` text(36),
  	\`journal_entries_id\` text(36),
  	\`leads_id\` text(36),
  	\`leases_id\` text(36),
  	\`legal_entities_id\` text(36),
  	\`lot_variants_id\` text(36),
  	\`lot_work_phases_id\` text(36),
  	\`lots_id\` text(36),
  	\`media_id\` text(36),
  	\`operators_id\` text(36),
  	\`opportunities_id\` text(36),
  	\`orders_id\` text(36),
  	\`pages_id\` text(36),
  	\`parties_id\` text(36),
  	\`payroll_runs_id\` text(36),
  	\`posts_id\` text(36),
  	\`products_id\` text(36),
  	\`projects_id\` text(36),
  	\`properties_id\` text(36),
  	\`provisions_id\` text(36),
  	\`quality_inspections_id\` text(36),
  	\`receipts_id\` text(36),
  	\`shipments_id\` text(36),
  	\`spaces_id\` text(36),
  	\`subscriptions_id\` text(36),
  	\`tax_codes_id\` text(36),
  	\`tax_jurisdictions_id\` text(36),
  	\`tenants_id\` text(36),
  	\`terminals_id\` text(36),
  	\`transactions_id\` text(36),
  	\`users_id\` text(36),
  	\`warehouse_locations_id\` text(36),
  	\`work_centers_id\` text(36),
  	\`work_orders_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_form_submissions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`addresses_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_committees_id\`) REFERENCES \`audit_committees\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_evidence_id\`) REFERENCES \`audit_evidence\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`bank_accounts_id\`) REFERENCES \`bank_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`bank_statements_id\`) REFERENCES \`bank_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`bookable_resources_id\`) REFERENCES \`bookable_resources\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_frameworks_id\`) REFERENCES \`compliance_frameworks\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_requirements_id\`) REFERENCES \`compliance_requirements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`consent_records_id\`) REFERENCES \`consent_records\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`consignment_arrangements_id\`) REFERENCES \`consignment_arrangements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`consolidations_id\`) REFERENCES \`consolidations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`contracts_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`control_tests_id\`) REFERENCES \`control_tests\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`cost_centers_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`employees_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`entity_types_id\`) REFERENCES \`entity_types\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`evidence_attestations_id\`) REFERENCES \`evidence_attestations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fair_value_measurements_id\`) REFERENCES \`fair_value_measurements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fiscal_devices_id\`) REFERENCES \`fiscal_devices\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fiscal_periods_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fixed_assets_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fx_transactions_id\`) REFERENCES \`fx_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`gl_accounts_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`goods_receipts_id\`) REFERENCES \`goods_receipts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`government_grants_id\`) REFERENCES \`government_grants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_policies_id\`) REFERENCES \`internal_policies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`inventory_movements_id\`) REFERENCES \`inventory_movements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`investment_properties_id\`) REFERENCES \`investment_properties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`invoices_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`job_positions_id\`) REFERENCES \`job_positions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`journal_entries_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`leads_id\`) REFERENCES \`leads\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`leases_id\`) REFERENCES \`leases\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`legal_entities_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`lot_variants_id\`) REFERENCES \`lot_variants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`lot_work_phases_id\`) REFERENCES \`lot_work_phases\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`lots_id\`) REFERENCES \`lots\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`operators_id\`) REFERENCES \`operators\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`opportunities_id\`) REFERENCES \`opportunities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`orders_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`parties_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`payroll_runs_id\`) REFERENCES \`payroll_runs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`properties_id\`) REFERENCES \`properties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`provisions_id\`) REFERENCES \`provisions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`quality_inspections_id\`) REFERENCES \`quality_inspections\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`receipts_id\`) REFERENCES \`receipts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`shipments_id\`) REFERENCES \`shipments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`spaces_id\`) REFERENCES \`spaces\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`subscriptions_id\`) REFERENCES \`subscriptions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tax_codes_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tax_jurisdictions_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tenants_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`terminals_id\`) REFERENCES \`terminals\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`transactions_id\`) REFERENCES \`transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`warehouse_locations_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`work_centers_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`work_orders_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__form_submissions_v_rels\`("id", "order", "parent_id", "path", "addresses_id", "audit_committees_id", "audit_evidence_id", "audit_findings_id", "bank_accounts_id", "bank_statements_id", "bookable_resources_id", "categories_id", "compliance_frameworks_id", "compliance_requirements_id", "consent_records_id", "consignment_arrangements_id", "consolidations_id", "contracts_id", "control_tests_id", "cost_centers_id", "employees_id", "entity_types_id", "evidence_attestations_id", "fair_value_measurements_id", "fiscal_devices_id", "fiscal_periods_id", "fixed_assets_id", "fx_transactions_id", "gl_accounts_id", "goods_receipts_id", "government_grants_id", "internal_controls_id", "internal_policies_id", "inventory_movements_id", "investment_properties_id", "invoices_id", "job_positions_id", "journal_entries_id", "leads_id", "leases_id", "legal_entities_id", "lot_variants_id", "lot_work_phases_id", "lots_id", "media_id", "operators_id", "opportunities_id", "orders_id", "pages_id", "parties_id", "payroll_runs_id", "posts_id", "products_id", "projects_id", "properties_id", "provisions_id", "quality_inspections_id", "receipts_id", "shipments_id", "spaces_id", "subscriptions_id", "tax_codes_id", "tax_jurisdictions_id", "tenants_id", "terminals_id", "transactions_id", "users_id", "warehouse_locations_id", "work_centers_id", "work_orders_id") SELECT "id", "order", "parent_id", "path", "addresses_id", "audit_committees_id", "audit_evidence_id", "audit_findings_id", "bank_accounts_id", "bank_statements_id", "bookable_resources_id", "categories_id", "compliance_frameworks_id", "compliance_requirements_id", "consent_records_id", "consignment_arrangements_id", "consolidations_id", "contracts_id", "control_tests_id", "cost_centers_id", "employees_id", "entity_types_id", "evidence_attestations_id", "fair_value_measurements_id", "fiscal_devices_id", "fiscal_periods_id", "fixed_assets_id", "fx_transactions_id", "gl_accounts_id", "goods_receipts_id", "government_grants_id", "internal_controls_id", "internal_policies_id", "inventory_movements_id", "investment_properties_id", "invoices_id", "job_positions_id", "journal_entries_id", "leads_id", "leases_id", "legal_entities_id", "lot_variants_id", "lot_work_phases_id", "lots_id", "media_id", "operators_id", "opportunities_id", "orders_id", "pages_id", "parties_id", "payroll_runs_id", "posts_id", "products_id", "projects_id", "properties_id", "provisions_id", "quality_inspections_id", "receipts_id", "shipments_id", "spaces_id", "subscriptions_id", "tax_codes_id", "tax_jurisdictions_id", "tenants_id", "terminals_id", "transactions_id", "users_id", "warehouse_locations_id", "work_centers_id", "work_orders_id" FROM \`_form_submissions_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_form_submissions_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__form_submissions_v_rels\` RENAME TO \`_form_submissions_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_order_idx\` ON \`_form_submissions_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_parent_idx\` ON \`_form_submissions_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_path_idx\` ON \`_form_submissions_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_addresses_id_idx\` ON \`_form_submissions_v_rels\` (\`addresses_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_audit_committees_id_idx\` ON \`_form_submissions_v_rels\` (\`audit_committees_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_audit_evidence_id_idx\` ON \`_form_submissions_v_rels\` (\`audit_evidence_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_audit_findings_id_idx\` ON \`_form_submissions_v_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_bank_accounts_id_idx\` ON \`_form_submissions_v_rels\` (\`bank_accounts_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_bank_statements_id_idx\` ON \`_form_submissions_v_rels\` (\`bank_statements_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_bookable_resources_id_idx\` ON \`_form_submissions_v_rels\` (\`bookable_resources_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_categories_id_idx\` ON \`_form_submissions_v_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_compliance_frameworks_id_idx\` ON \`_form_submissions_v_rels\` (\`compliance_frameworks_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_compliance_requirements_id_idx\` ON \`_form_submissions_v_rels\` (\`compliance_requirements_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_consent_records_id_idx\` ON \`_form_submissions_v_rels\` (\`consent_records_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_consignment_arrangements_id_idx\` ON \`_form_submissions_v_rels\` (\`consignment_arrangements_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_consolidations_id_idx\` ON \`_form_submissions_v_rels\` (\`consolidations_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_contracts_id_idx\` ON \`_form_submissions_v_rels\` (\`contracts_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_control_tests_id_idx\` ON \`_form_submissions_v_rels\` (\`control_tests_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_cost_centers_id_idx\` ON \`_form_submissions_v_rels\` (\`cost_centers_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_employees_id_idx\` ON \`_form_submissions_v_rels\` (\`employees_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_entity_types_id_idx\` ON \`_form_submissions_v_rels\` (\`entity_types_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_evidence_attestations_id_idx\` ON \`_form_submissions_v_rels\` (\`evidence_attestations_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_fair_value_measurements_id_idx\` ON \`_form_submissions_v_rels\` (\`fair_value_measurements_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_fiscal_devices_id_idx\` ON \`_form_submissions_v_rels\` (\`fiscal_devices_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_fiscal_periods_id_idx\` ON \`_form_submissions_v_rels\` (\`fiscal_periods_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_fixed_assets_id_idx\` ON \`_form_submissions_v_rels\` (\`fixed_assets_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_fx_transactions_id_idx\` ON \`_form_submissions_v_rels\` (\`fx_transactions_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_gl_accounts_id_idx\` ON \`_form_submissions_v_rels\` (\`gl_accounts_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_goods_receipts_id_idx\` ON \`_form_submissions_v_rels\` (\`goods_receipts_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_government_grants_id_idx\` ON \`_form_submissions_v_rels\` (\`government_grants_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_internal_controls_id_idx\` ON \`_form_submissions_v_rels\` (\`internal_controls_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_internal_policies_id_idx\` ON \`_form_submissions_v_rels\` (\`internal_policies_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_inventory_movements_id_idx\` ON \`_form_submissions_v_rels\` (\`inventory_movements_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_investment_properties_id_idx\` ON \`_form_submissions_v_rels\` (\`investment_properties_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_invoices_id_idx\` ON \`_form_submissions_v_rels\` (\`invoices_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_job_positions_id_idx\` ON \`_form_submissions_v_rels\` (\`job_positions_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_journal_entries_id_idx\` ON \`_form_submissions_v_rels\` (\`journal_entries_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_leads_id_idx\` ON \`_form_submissions_v_rels\` (\`leads_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_leases_id_idx\` ON \`_form_submissions_v_rels\` (\`leases_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_legal_entities_id_idx\` ON \`_form_submissions_v_rels\` (\`legal_entities_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_lot_variants_id_idx\` ON \`_form_submissions_v_rels\` (\`lot_variants_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_lot_work_phases_id_idx\` ON \`_form_submissions_v_rels\` (\`lot_work_phases_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_lots_id_idx\` ON \`_form_submissions_v_rels\` (\`lots_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_media_id_idx\` ON \`_form_submissions_v_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_operators_id_idx\` ON \`_form_submissions_v_rels\` (\`operators_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_opportunities_id_idx\` ON \`_form_submissions_v_rels\` (\`opportunities_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_orders_id_idx\` ON \`_form_submissions_v_rels\` (\`orders_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_pages_id_idx\` ON \`_form_submissions_v_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_parties_id_idx\` ON \`_form_submissions_v_rels\` (\`parties_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_payroll_runs_id_idx\` ON \`_form_submissions_v_rels\` (\`payroll_runs_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_posts_id_idx\` ON \`_form_submissions_v_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_products_id_idx\` ON \`_form_submissions_v_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_projects_id_idx\` ON \`_form_submissions_v_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_properties_id_idx\` ON \`_form_submissions_v_rels\` (\`properties_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_provisions_id_idx\` ON \`_form_submissions_v_rels\` (\`provisions_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_quality_inspections_id_idx\` ON \`_form_submissions_v_rels\` (\`quality_inspections_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_receipts_id_idx\` ON \`_form_submissions_v_rels\` (\`receipts_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_shipments_id_idx\` ON \`_form_submissions_v_rels\` (\`shipments_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_spaces_id_idx\` ON \`_form_submissions_v_rels\` (\`spaces_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_subscriptions_id_idx\` ON \`_form_submissions_v_rels\` (\`subscriptions_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_tax_codes_id_idx\` ON \`_form_submissions_v_rels\` (\`tax_codes_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_tax_jurisdictions_id_idx\` ON \`_form_submissions_v_rels\` (\`tax_jurisdictions_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_tenants_id_idx\` ON \`_form_submissions_v_rels\` (\`tenants_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_terminals_id_idx\` ON \`_form_submissions_v_rels\` (\`terminals_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_transactions_id_idx\` ON \`_form_submissions_v_rels\` (\`transactions_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_users_id_idx\` ON \`_form_submissions_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_warehouse_locations_id_idx\` ON \`_form_submissions_v_rels\` (\`warehouse_locations_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_work_centers_id_idx\` ON \`_form_submissions_v_rels\` (\`work_centers_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_work_orders_id_idx\` ON \`_form_submissions_v_rels\` (\`work_orders_id\`);`)
  await db.run(sql`ALTER TABLE \`audit_findings\` ADD \`remediation_title\` text;`)
  await db.run(sql`ALTER TABLE \`audit_findings\` ADD \`remediation_description\` text;`)
  await db.run(sql`ALTER TABLE \`audit_findings\` ADD \`remediation_remediation_type\` text;`)
  await db.run(sql`ALTER TABLE \`audit_findings\` ADD \`remediation_priority\` text;`)
  await db.run(sql`ALTER TABLE \`audit_findings\` ADD \`remediation_status\` text DEFAULT 'planned';`)
  await db.run(sql`ALTER TABLE \`audit_findings\` ADD \`remediation_policy_id\` text(36) REFERENCES internal_policies(id);`)
  await db.run(sql`ALTER TABLE \`audit_findings\` ADD \`remediation_policy_version\` text;`)
  await db.run(sql`ALTER TABLE \`audit_findings\` ADD \`remediation_owner_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`audit_findings\` ADD \`remediation_target_date\` text;`)
  await db.run(sql`ALTER TABLE \`audit_findings\` ADD \`remediation_completion_date\` text;`)
  await db.run(sql`ALTER TABLE \`audit_findings\` ADD \`remediation_required_resources\` text;`)
  await db.run(sql`ALTER TABLE \`audit_findings\` ADD \`remediation_budget\` numeric;`)
  await db.run(sql`ALTER TABLE \`audit_findings\` ADD \`remediation_risk_of_delay\` text;`)
  await db.run(sql`ALTER TABLE \`audit_findings\` ADD \`remediation_approved_by_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`audit_findings\` ADD \`remediation_approval_date\` text;`)
  await db.run(sql`CREATE INDEX \`audit_findings_remediation_remediation_policy_idx\` ON \`audit_findings\` (\`remediation_policy_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_remediation_remediation_owner_idx\` ON \`audit_findings\` (\`remediation_owner_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_remediation_remediation_approved_by_idx\` ON \`audit_findings\` (\`remediation_approved_by_id\`);`)
  await db.run(sql`ALTER TABLE \`_audit_findings_v\` ADD \`version_remediation_title\` text;`)
  await db.run(sql`ALTER TABLE \`_audit_findings_v\` ADD \`version_remediation_description\` text;`)
  await db.run(sql`ALTER TABLE \`_audit_findings_v\` ADD \`version_remediation_remediation_type\` text;`)
  await db.run(sql`ALTER TABLE \`_audit_findings_v\` ADD \`version_remediation_priority\` text;`)
  await db.run(sql`ALTER TABLE \`_audit_findings_v\` ADD \`version_remediation_status\` text DEFAULT 'planned';`)
  await db.run(sql`ALTER TABLE \`_audit_findings_v\` ADD \`version_remediation_policy_id\` text(36) REFERENCES internal_policies(id);`)
  await db.run(sql`ALTER TABLE \`_audit_findings_v\` ADD \`version_remediation_policy_version\` text;`)
  await db.run(sql`ALTER TABLE \`_audit_findings_v\` ADD \`version_remediation_owner_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`_audit_findings_v\` ADD \`version_remediation_target_date\` text;`)
  await db.run(sql`ALTER TABLE \`_audit_findings_v\` ADD \`version_remediation_completion_date\` text;`)
  await db.run(sql`ALTER TABLE \`_audit_findings_v\` ADD \`version_remediation_required_resources\` text;`)
  await db.run(sql`ALTER TABLE \`_audit_findings_v\` ADD \`version_remediation_budget\` numeric;`)
  await db.run(sql`ALTER TABLE \`_audit_findings_v\` ADD \`version_remediation_risk_of_delay\` text;`)
  await db.run(sql`ALTER TABLE \`_audit_findings_v\` ADD \`version_remediation_approved_by_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`_audit_findings_v\` ADD \`version_remediation_approval_date\` text;`)
  await db.run(sql`CREATE INDEX \`_audit_findings_v_version_remediation_version_remediatio_idx\` ON \`_audit_findings_v\` (\`version_remediation_policy_id\`);`)
  await db.run(sql`CREATE INDEX \`_audit_findings_v_version_remediation_version_remediat_1_idx\` ON \`_audit_findings_v\` (\`version_remediation_owner_id\`);`)
  await db.run(sql`CREATE INDEX \`_audit_findings_v_version_remediation_version_remediat_2_idx\` ON \`_audit_findings_v\` (\`version_remediation_approved_by_id\`);`)
  await db.run(sql`ALTER TABLE \`compliance_gaps\` ADD \`remediation_title\` text;`)
  await db.run(sql`ALTER TABLE \`compliance_gaps\` ADD \`remediation_description\` text;`)
  await db.run(sql`ALTER TABLE \`compliance_gaps\` ADD \`remediation_remediation_type\` text;`)
  await db.run(sql`ALTER TABLE \`compliance_gaps\` ADD \`remediation_priority\` text;`)
  await db.run(sql`ALTER TABLE \`compliance_gaps\` ADD \`remediation_status\` text DEFAULT 'planned';`)
  await db.run(sql`ALTER TABLE \`compliance_gaps\` ADD \`remediation_policy_id\` text(36) REFERENCES internal_policies(id);`)
  await db.run(sql`ALTER TABLE \`compliance_gaps\` ADD \`remediation_policy_version\` text;`)
  await db.run(sql`ALTER TABLE \`compliance_gaps\` ADD \`remediation_owner_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`compliance_gaps\` ADD \`remediation_target_date\` text;`)
  await db.run(sql`ALTER TABLE \`compliance_gaps\` ADD \`remediation_completion_date\` text;`)
  await db.run(sql`ALTER TABLE \`compliance_gaps\` ADD \`remediation_required_resources\` text;`)
  await db.run(sql`ALTER TABLE \`compliance_gaps\` ADD \`remediation_budget\` numeric;`)
  await db.run(sql`ALTER TABLE \`compliance_gaps\` ADD \`remediation_risk_of_delay\` text;`)
  await db.run(sql`ALTER TABLE \`compliance_gaps\` ADD \`remediation_approved_by_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`compliance_gaps\` ADD \`remediation_approval_date\` text;`)
  await db.run(sql`CREATE INDEX \`compliance_gaps_remediation_remediation_policy_idx\` ON \`compliance_gaps\` (\`remediation_policy_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_gaps_remediation_remediation_owner_idx\` ON \`compliance_gaps\` (\`remediation_owner_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_gaps_remediation_remediation_approved_by_idx\` ON \`compliance_gaps\` (\`remediation_approved_by_id\`);`)
  await db.run(sql`ALTER TABLE \`_compliance_gaps_v\` ADD \`version_remediation_title\` text;`)
  await db.run(sql`ALTER TABLE \`_compliance_gaps_v\` ADD \`version_remediation_description\` text;`)
  await db.run(sql`ALTER TABLE \`_compliance_gaps_v\` ADD \`version_remediation_remediation_type\` text;`)
  await db.run(sql`ALTER TABLE \`_compliance_gaps_v\` ADD \`version_remediation_priority\` text;`)
  await db.run(sql`ALTER TABLE \`_compliance_gaps_v\` ADD \`version_remediation_status\` text DEFAULT 'planned';`)
  await db.run(sql`ALTER TABLE \`_compliance_gaps_v\` ADD \`version_remediation_policy_id\` text(36) REFERENCES internal_policies(id);`)
  await db.run(sql`ALTER TABLE \`_compliance_gaps_v\` ADD \`version_remediation_policy_version\` text;`)
  await db.run(sql`ALTER TABLE \`_compliance_gaps_v\` ADD \`version_remediation_owner_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`_compliance_gaps_v\` ADD \`version_remediation_target_date\` text;`)
  await db.run(sql`ALTER TABLE \`_compliance_gaps_v\` ADD \`version_remediation_completion_date\` text;`)
  await db.run(sql`ALTER TABLE \`_compliance_gaps_v\` ADD \`version_remediation_required_resources\` text;`)
  await db.run(sql`ALTER TABLE \`_compliance_gaps_v\` ADD \`version_remediation_budget\` numeric;`)
  await db.run(sql`ALTER TABLE \`_compliance_gaps_v\` ADD \`version_remediation_risk_of_delay\` text;`)
  await db.run(sql`ALTER TABLE \`_compliance_gaps_v\` ADD \`version_remediation_approved_by_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`_compliance_gaps_v\` ADD \`version_remediation_approval_date\` text;`)
  await db.run(sql`CREATE INDEX \`_compliance_gaps_v_version_remediation_version_remediati_idx\` ON \`_compliance_gaps_v\` (\`version_remediation_policy_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_gaps_v_version_remediation_version_remedia_1_idx\` ON \`_compliance_gaps_v\` (\`version_remediation_owner_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_gaps_v_version_remediation_version_remedia_2_idx\` ON \`_compliance_gaps_v\` (\`version_remediation_approved_by_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`policy_acknowledgments\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`policy_id\` text(36) NOT NULL,
  	\`policy_version_number\` text,
  	\`employee_name\` text NOT NULL,
  	\`employee_id\` text,
  	\`acknowledged_date\` text NOT NULL,
  	\`acknowledged_by\` text,
  	\`signed_document_id\` text(36),
  	\`status\` text DEFAULT 'pending',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`policy_id\`) REFERENCES \`internal_policies\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`signed_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`policy_acknowledgments_uuid_idx\` ON \`policy_acknowledgments\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_tenant_idx\` ON \`policy_acknowledgments\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_policy_idx\` ON \`policy_acknowledgments\` (\`policy_id\`);`)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_policy_version_number_idx\` ON \`policy_acknowledgments\` (\`policy_version_number\`);`)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_employee_name_idx\` ON \`policy_acknowledgments\` (\`employee_name\`);`)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_signed_document_idx\` ON \`policy_acknowledgments\` (\`signed_document_id\`);`)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_updated_at_idx\` ON \`policy_acknowledgments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_created_at_idx\` ON \`policy_acknowledgments\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`policy_acknowledgments_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`policy_acknowledgments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_rels_order_idx\` ON \`policy_acknowledgments_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_rels_parent_idx\` ON \`policy_acknowledgments_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_rels_path_idx\` ON \`policy_acknowledgments_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`policy_acknowledgments_rels_users_id_idx\` ON \`policy_acknowledgments_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_policy_acknowledgments_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_policy_id\` text(36) NOT NULL,
  	\`version_policy_version_number\` text,
  	\`version_employee_name\` text NOT NULL,
  	\`version_employee_id\` text,
  	\`version_acknowledged_date\` text NOT NULL,
  	\`version_acknowledged_by\` text,
  	\`version_signed_document_id\` text(36),
  	\`version_status\` text DEFAULT 'pending',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`policy_acknowledgments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_policy_id\`) REFERENCES \`internal_policies\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_signed_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_parent_idx\` ON \`_policy_acknowledgments_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_version_version_uuid_idx\` ON \`_policy_acknowledgments_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_version_version_tenant_idx\` ON \`_policy_acknowledgments_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_version_version_policy_idx\` ON \`_policy_acknowledgments_v\` (\`version_policy_id\`);`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_version_version_policy_version_idx\` ON \`_policy_acknowledgments_v\` (\`version_policy_version_number\`);`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_version_version_employee_name_idx\` ON \`_policy_acknowledgments_v\` (\`version_employee_name\`);`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_version_version_signed_documen_idx\` ON \`_policy_acknowledgments_v\` (\`version_signed_document_id\`);`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_version_version_updated_at_idx\` ON \`_policy_acknowledgments_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_version_version_created_at_idx\` ON \`_policy_acknowledgments_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_created_at_idx\` ON \`_policy_acknowledgments_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_updated_at_idx\` ON \`_policy_acknowledgments_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_policy_acknowledgments_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_policy_acknowledgments_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_rels_order_idx\` ON \`_policy_acknowledgments_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_rels_parent_idx\` ON \`_policy_acknowledgments_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_rels_path_idx\` ON \`_policy_acknowledgments_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_policy_acknowledgments_v_rels_users_id_idx\` ON \`_policy_acknowledgments_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`remediation_plans_action_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`description\` text NOT NULL,
  	\`owner\` text,
  	\`target_date\` text,
  	\`status\` text DEFAULT 'not-started',
  	\`completed_date\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`remediation_plans\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`remediation_plans_action_steps_order_idx\` ON \`remediation_plans_action_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`remediation_plans_action_steps_parent_id_idx\` ON \`remediation_plans_action_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`remediation_plans\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`related_finding_id\` text(36),
  	\`related_gap_id\` text(36),
  	\`remediation_type\` text NOT NULL,
  	\`priority\` text NOT NULL,
  	\`owner_id\` text(36) NOT NULL,
  	\`target_date\` text NOT NULL,
  	\`completion_date\` text,
  	\`status\` text DEFAULT 'planned' NOT NULL,
  	\`required_resources\` text,
  	\`budget\` numeric,
  	\`risk_of_delay\` text,
  	\`approved_by_id\` text(36),
  	\`approval_date\` text,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`related_finding_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`related_gap_id\`) REFERENCES \`compliance_gaps\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`owner_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`remediation_plans_uuid_idx\` ON \`remediation_plans\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`remediation_plans_tenant_idx\` ON \`remediation_plans\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`remediation_plans_title_idx\` ON \`remediation_plans\` (\`title\`);`)
  await db.run(sql`CREATE INDEX \`remediation_plans_related_finding_idx\` ON \`remediation_plans\` (\`related_finding_id\`);`)
  await db.run(sql`CREATE INDEX \`remediation_plans_related_gap_idx\` ON \`remediation_plans\` (\`related_gap_id\`);`)
  await db.run(sql`CREATE INDEX \`remediation_plans_owner_idx\` ON \`remediation_plans\` (\`owner_id\`);`)
  await db.run(sql`CREATE INDEX \`remediation_plans_approved_by_idx\` ON \`remediation_plans\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`remediation_plans_updated_at_idx\` ON \`remediation_plans\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`remediation_plans_created_at_idx\` ON \`remediation_plans\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`remediation_plans_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`remediation_plans\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`remediation_plans_rels_order_idx\` ON \`remediation_plans_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`remediation_plans_rels_parent_idx\` ON \`remediation_plans_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`remediation_plans_rels_path_idx\` ON \`remediation_plans_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`remediation_plans_rels_users_id_idx\` ON \`remediation_plans_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_remediation_plans_v_version_action_steps\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`description\` text NOT NULL,
  	\`owner\` text,
  	\`target_date\` text,
  	\`status\` text DEFAULT 'not-started',
  	\`completed_date\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_remediation_plans_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_remediation_plans_v_version_action_steps_order_idx\` ON \`_remediation_plans_v_version_action_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_remediation_plans_v_version_action_steps_parent_id_idx\` ON \`_remediation_plans_v_version_action_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_remediation_plans_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_title\` text NOT NULL,
  	\`version_description\` text NOT NULL,
  	\`version_related_finding_id\` text(36),
  	\`version_related_gap_id\` text(36),
  	\`version_remediation_type\` text NOT NULL,
  	\`version_priority\` text NOT NULL,
  	\`version_owner_id\` text(36) NOT NULL,
  	\`version_target_date\` text NOT NULL,
  	\`version_completion_date\` text,
  	\`version_status\` text DEFAULT 'planned' NOT NULL,
  	\`version_required_resources\` text,
  	\`version_budget\` numeric,
  	\`version_risk_of_delay\` text,
  	\`version_approved_by_id\` text(36),
  	\`version_approval_date\` text,
  	\`version_is_active\` integer DEFAULT true,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`remediation_plans\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_related_finding_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_related_gap_id\`) REFERENCES \`compliance_gaps\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_owner_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_remediation_plans_v_parent_idx\` ON \`_remediation_plans_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_remediation_plans_v_version_version_uuid_idx\` ON \`_remediation_plans_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_remediation_plans_v_version_version_tenant_idx\` ON \`_remediation_plans_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_remediation_plans_v_version_version_title_idx\` ON \`_remediation_plans_v\` (\`version_title\`);`)
  await db.run(sql`CREATE INDEX \`_remediation_plans_v_version_version_related_finding_idx\` ON \`_remediation_plans_v\` (\`version_related_finding_id\`);`)
  await db.run(sql`CREATE INDEX \`_remediation_plans_v_version_version_related_gap_idx\` ON \`_remediation_plans_v\` (\`version_related_gap_id\`);`)
  await db.run(sql`CREATE INDEX \`_remediation_plans_v_version_version_owner_idx\` ON \`_remediation_plans_v\` (\`version_owner_id\`);`)
  await db.run(sql`CREATE INDEX \`_remediation_plans_v_version_version_approved_by_idx\` ON \`_remediation_plans_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_remediation_plans_v_version_version_updated_at_idx\` ON \`_remediation_plans_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_remediation_plans_v_version_version_created_at_idx\` ON \`_remediation_plans_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_remediation_plans_v_created_at_idx\` ON \`_remediation_plans_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_remediation_plans_v_updated_at_idx\` ON \`_remediation_plans_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_remediation_plans_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_remediation_plans_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_remediation_plans_v_rels_order_idx\` ON \`_remediation_plans_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_remediation_plans_v_rels_parent_idx\` ON \`_remediation_plans_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_remediation_plans_v_rels_path_idx\` ON \`_remediation_plans_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_remediation_plans_v_rels_users_id_idx\` ON \`_remediation_plans_v_rels\` (\`users_id\`);`)
  await db.run(sql`DROP TABLE \`audit_findings_remediation_action_step_18c0fcdc\`;`)
  await db.run(sql`DROP TABLE \`_audit_findings_remediation_action_step_18c0fcdc_v\`;`)
  await db.run(sql`DROP TABLE \`compliance_gaps_remediation_action_ste_4120a6f2\`;`)
  await db.run(sql`DROP TABLE \`_compliance_gaps_remediation_action_ste_4120a6f2_v\`;`)
  await db.run(sql`DROP TABLE \`internal_policies_acknowledgments\`;`)
  await db.run(sql`DROP TABLE \`_internal_policies_v_version_acknowledgments\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_audit_findings\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`finding_type\` text NOT NULL,
  	\`severity\` text NOT NULL,
  	\`related_control_id\` text(36),
  	\`related_control_test_id\` text(36),
  	\`frequency_of_occurrence\` text,
  	\`potential_impact\` text,
  	\`identified_date\` text NOT NULL,
  	\`identified_by_id\` text(36) NOT NULL,
  	\`root_cause\` text,
  	\`risk_category\` text,
  	\`status\` text DEFAULT 'open' NOT NULL,
  	\`management_response\` text,
  	\`management_response_date\` text,
  	\`prior_year_reference\` text,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`related_control_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`related_control_test_id\`) REFERENCES \`control_tests\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`identified_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_audit_findings\`("id", "uuid", "tenant_id", "title", "description", "finding_type", "severity", "related_control_id", "related_control_test_id", "frequency_of_occurrence", "potential_impact", "identified_date", "identified_by_id", "root_cause", "risk_category", "status", "management_response", "management_response_date", "prior_year_reference", "is_active", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "title", "description", "finding_type", "severity", "related_control_id", "related_control_test_id", "frequency_of_occurrence", "potential_impact", "identified_date", "identified_by_id", "root_cause", "risk_category", "status", "management_response", "management_response_date", "prior_year_reference", "is_active", "updated_at", "created_at" FROM \`audit_findings\`;`)
  await db.run(sql`DROP TABLE \`audit_findings\`;`)
  await db.run(sql`ALTER TABLE \`__new_audit_findings\` RENAME TO \`audit_findings\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`audit_findings_uuid_idx\` ON \`audit_findings\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_tenant_idx\` ON \`audit_findings\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_title_idx\` ON \`audit_findings\` (\`title\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_related_control_idx\` ON \`audit_findings\` (\`related_control_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_related_control_test_idx\` ON \`audit_findings\` (\`related_control_test_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_identified_by_idx\` ON \`audit_findings\` (\`identified_by_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_updated_at_idx\` ON \`audit_findings\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_created_at_idx\` ON \`audit_findings\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__audit_findings_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_title\` text NOT NULL,
  	\`version_description\` text NOT NULL,
  	\`version_finding_type\` text NOT NULL,
  	\`version_severity\` text NOT NULL,
  	\`version_related_control_id\` text(36),
  	\`version_related_control_test_id\` text(36),
  	\`version_frequency_of_occurrence\` text,
  	\`version_potential_impact\` text,
  	\`version_identified_date\` text NOT NULL,
  	\`version_identified_by_id\` text(36) NOT NULL,
  	\`version_root_cause\` text,
  	\`version_risk_category\` text,
  	\`version_status\` text DEFAULT 'open' NOT NULL,
  	\`version_management_response\` text,
  	\`version_management_response_date\` text,
  	\`version_prior_year_reference\` text,
  	\`version_is_active\` integer DEFAULT true,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_related_control_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_related_control_test_id\`) REFERENCES \`control_tests\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_identified_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__audit_findings_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_title", "version_description", "version_finding_type", "version_severity", "version_related_control_id", "version_related_control_test_id", "version_frequency_of_occurrence", "version_potential_impact", "version_identified_date", "version_identified_by_id", "version_root_cause", "version_risk_category", "version_status", "version_management_response", "version_management_response_date", "version_prior_year_reference", "version_is_active", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_title", "version_description", "version_finding_type", "version_severity", "version_related_control_id", "version_related_control_test_id", "version_frequency_of_occurrence", "version_potential_impact", "version_identified_date", "version_identified_by_id", "version_root_cause", "version_risk_category", "version_status", "version_management_response", "version_management_response_date", "version_prior_year_reference", "version_is_active", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_audit_findings_v\`;`)
  await db.run(sql`DROP TABLE \`_audit_findings_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__audit_findings_v\` RENAME TO \`_audit_findings_v\`;`)
  await db.run(sql`CREATE INDEX \`_audit_findings_v_parent_idx\` ON \`_audit_findings_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_audit_findings_v_version_version_uuid_idx\` ON \`_audit_findings_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_audit_findings_v_version_version_tenant_idx\` ON \`_audit_findings_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_audit_findings_v_version_version_title_idx\` ON \`_audit_findings_v\` (\`version_title\`);`)
  await db.run(sql`CREATE INDEX \`_audit_findings_v_version_version_related_control_idx\` ON \`_audit_findings_v\` (\`version_related_control_id\`);`)
  await db.run(sql`CREATE INDEX \`_audit_findings_v_version_version_related_control_test_idx\` ON \`_audit_findings_v\` (\`version_related_control_test_id\`);`)
  await db.run(sql`CREATE INDEX \`_audit_findings_v_version_version_identified_by_idx\` ON \`_audit_findings_v\` (\`version_identified_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_audit_findings_v_version_version_updated_at_idx\` ON \`_audit_findings_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_audit_findings_v_version_version_created_at_idx\` ON \`_audit_findings_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_audit_findings_v_created_at_idx\` ON \`_audit_findings_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_audit_findings_v_updated_at_idx\` ON \`_audit_findings_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_compliance_gaps\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`requirement_id\` text(36) NOT NULL,
  	\`gap_type\` text NOT NULL,
  	\`severity\` text NOT NULL,
  	\`status\` text DEFAULT 'identified' NOT NULL,
  	\`current_state\` text,
  	\`required_state\` text,
  	\`root_cause\` text,
  	\`identified_date\` text NOT NULL,
  	\`identified_by_id\` text(36) NOT NULL,
  	\`target_closure_date\` text,
  	\`actual_closure_date\` text,
  	\`risk_exposure\` text,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`requirement_id\`) REFERENCES \`compliance_requirements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`identified_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_compliance_gaps\`("id", "uuid", "tenant_id", "title", "description", "requirement_id", "gap_type", "severity", "status", "current_state", "required_state", "root_cause", "identified_date", "identified_by_id", "target_closure_date", "actual_closure_date", "risk_exposure", "is_active", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "title", "description", "requirement_id", "gap_type", "severity", "status", "current_state", "required_state", "root_cause", "identified_date", "identified_by_id", "target_closure_date", "actual_closure_date", "risk_exposure", "is_active", "updated_at", "created_at" FROM \`compliance_gaps\`;`)
  await db.run(sql`DROP TABLE \`compliance_gaps\`;`)
  await db.run(sql`ALTER TABLE \`__new_compliance_gaps\` RENAME TO \`compliance_gaps\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`compliance_gaps_uuid_idx\` ON \`compliance_gaps\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`compliance_gaps_tenant_idx\` ON \`compliance_gaps\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_gaps_title_idx\` ON \`compliance_gaps\` (\`title\`);`)
  await db.run(sql`CREATE INDEX \`compliance_gaps_requirement_idx\` ON \`compliance_gaps\` (\`requirement_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_gaps_identified_by_idx\` ON \`compliance_gaps\` (\`identified_by_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_gaps_updated_at_idx\` ON \`compliance_gaps\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`compliance_gaps_created_at_idx\` ON \`compliance_gaps\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__compliance_gaps_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_title\` text NOT NULL,
  	\`version_description\` text NOT NULL,
  	\`version_requirement_id\` text(36) NOT NULL,
  	\`version_gap_type\` text NOT NULL,
  	\`version_severity\` text NOT NULL,
  	\`version_status\` text DEFAULT 'identified' NOT NULL,
  	\`version_current_state\` text,
  	\`version_required_state\` text,
  	\`version_root_cause\` text,
  	\`version_identified_date\` text NOT NULL,
  	\`version_identified_by_id\` text(36) NOT NULL,
  	\`version_target_closure_date\` text,
  	\`version_actual_closure_date\` text,
  	\`version_risk_exposure\` text,
  	\`version_is_active\` integer DEFAULT true,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`compliance_gaps\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_requirement_id\`) REFERENCES \`compliance_requirements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_identified_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__compliance_gaps_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_title", "version_description", "version_requirement_id", "version_gap_type", "version_severity", "version_status", "version_current_state", "version_required_state", "version_root_cause", "version_identified_date", "version_identified_by_id", "version_target_closure_date", "version_actual_closure_date", "version_risk_exposure", "version_is_active", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_title", "version_description", "version_requirement_id", "version_gap_type", "version_severity", "version_status", "version_current_state", "version_required_state", "version_root_cause", "version_identified_date", "version_identified_by_id", "version_target_closure_date", "version_actual_closure_date", "version_risk_exposure", "version_is_active", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_compliance_gaps_v\`;`)
  await db.run(sql`DROP TABLE \`_compliance_gaps_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__compliance_gaps_v\` RENAME TO \`_compliance_gaps_v\`;`)
  await db.run(sql`CREATE INDEX \`_compliance_gaps_v_parent_idx\` ON \`_compliance_gaps_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_gaps_v_version_version_uuid_idx\` ON \`_compliance_gaps_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_gaps_v_version_version_tenant_idx\` ON \`_compliance_gaps_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_gaps_v_version_version_title_idx\` ON \`_compliance_gaps_v\` (\`version_title\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_gaps_v_version_version_requirement_idx\` ON \`_compliance_gaps_v\` (\`version_requirement_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_gaps_v_version_version_identified_by_idx\` ON \`_compliance_gaps_v\` (\`version_identified_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_gaps_v_version_version_updated_at_idx\` ON \`_compliance_gaps_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_gaps_v_version_version_created_at_idx\` ON \`_compliance_gaps_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_gaps_v_created_at_idx\` ON \`_compliance_gaps_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_gaps_v_updated_at_idx\` ON \`_compliance_gaps_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_form_submissions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`addresses_id\` text(36),
  	\`audit_committees_id\` text(36),
  	\`audit_evidence_id\` text(36),
  	\`audit_findings_id\` text(36),
  	\`bank_accounts_id\` text(36),
  	\`bank_statements_id\` text(36),
  	\`bookable_resources_id\` text(36),
  	\`categories_id\` text(36),
  	\`compliance_frameworks_id\` text(36),
  	\`compliance_gaps_id\` text(36),
  	\`compliance_requirements_id\` text(36),
  	\`consent_records_id\` text(36),
  	\`consignment_arrangements_id\` text(36),
  	\`consolidations_id\` text(36),
  	\`contracts_id\` text(36),
  	\`control_tests_id\` text(36),
  	\`cost_centers_id\` text(36),
  	\`employees_id\` text(36),
  	\`entity_types_id\` text(36),
  	\`evidence_attestations_id\` text(36),
  	\`fair_value_measurements_id\` text(36),
  	\`fiscal_devices_id\` text(36),
  	\`fiscal_periods_id\` text(36),
  	\`fixed_assets_id\` text(36),
  	\`fx_transactions_id\` text(36),
  	\`gl_accounts_id\` text,
  	\`goods_receipts_id\` text(36),
  	\`government_grants_id\` text(36),
  	\`internal_controls_id\` text(36),
  	\`inventory_movements_id\` text(36),
  	\`investment_properties_id\` text(36),
  	\`invoices_id\` text(36),
  	\`job_positions_id\` text(36),
  	\`journal_entries_id\` text(36),
  	\`leads_id\` text(36),
  	\`leases_id\` text(36),
  	\`legal_entities_id\` text(36),
  	\`lot_variants_id\` text(36),
  	\`lot_work_phases_id\` text(36),
  	\`lots_id\` text(36),
  	\`media_id\` text(36),
  	\`operators_id\` text(36),
  	\`opportunities_id\` text(36),
  	\`orders_id\` text(36),
  	\`pages_id\` text(36),
  	\`parties_id\` text(36),
  	\`payroll_runs_id\` text(36),
  	\`posts_id\` text(36),
  	\`products_id\` text(36),
  	\`projects_id\` text(36),
  	\`properties_id\` text(36),
  	\`provisions_id\` text(36),
  	\`quality_inspections_id\` text(36),
  	\`receipts_id\` text(36),
  	\`shipments_id\` text(36),
  	\`spaces_id\` text(36),
  	\`subscriptions_id\` text(36),
  	\`tax_codes_id\` text(36),
  	\`tax_jurisdictions_id\` text(36),
  	\`tenants_id\` text(36),
  	\`terminals_id\` text(36),
  	\`transactions_id\` text(36),
  	\`users_id\` text(36),
  	\`warehouse_locations_id\` text(36),
  	\`work_centers_id\` text(36),
  	\`work_orders_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`addresses_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_committees_id\`) REFERENCES \`audit_committees\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_evidence_id\`) REFERENCES \`audit_evidence\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`bank_accounts_id\`) REFERENCES \`bank_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`bank_statements_id\`) REFERENCES \`bank_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`bookable_resources_id\`) REFERENCES \`bookable_resources\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_frameworks_id\`) REFERENCES \`compliance_frameworks\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_gaps_id\`) REFERENCES \`compliance_gaps\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_requirements_id\`) REFERENCES \`compliance_requirements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`consent_records_id\`) REFERENCES \`consent_records\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`consignment_arrangements_id\`) REFERENCES \`consignment_arrangements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`consolidations_id\`) REFERENCES \`consolidations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`contracts_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`control_tests_id\`) REFERENCES \`control_tests\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`cost_centers_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`employees_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`entity_types_id\`) REFERENCES \`entity_types\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`evidence_attestations_id\`) REFERENCES \`evidence_attestations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fair_value_measurements_id\`) REFERENCES \`fair_value_measurements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fiscal_devices_id\`) REFERENCES \`fiscal_devices\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fiscal_periods_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fixed_assets_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fx_transactions_id\`) REFERENCES \`fx_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`gl_accounts_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`goods_receipts_id\`) REFERENCES \`goods_receipts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`government_grants_id\`) REFERENCES \`government_grants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`inventory_movements_id\`) REFERENCES \`inventory_movements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`investment_properties_id\`) REFERENCES \`investment_properties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`invoices_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`job_positions_id\`) REFERENCES \`job_positions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`journal_entries_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`leads_id\`) REFERENCES \`leads\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`leases_id\`) REFERENCES \`leases\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`legal_entities_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`lot_variants_id\`) REFERENCES \`lot_variants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`lot_work_phases_id\`) REFERENCES \`lot_work_phases\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`lots_id\`) REFERENCES \`lots\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`operators_id\`) REFERENCES \`operators\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`opportunities_id\`) REFERENCES \`opportunities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`orders_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`parties_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`payroll_runs_id\`) REFERENCES \`payroll_runs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`properties_id\`) REFERENCES \`properties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`provisions_id\`) REFERENCES \`provisions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`quality_inspections_id\`) REFERENCES \`quality_inspections\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`receipts_id\`) REFERENCES \`receipts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`shipments_id\`) REFERENCES \`shipments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`spaces_id\`) REFERENCES \`spaces\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`subscriptions_id\`) REFERENCES \`subscriptions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tax_codes_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tax_jurisdictions_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tenants_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`terminals_id\`) REFERENCES \`terminals\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`transactions_id\`) REFERENCES \`transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`warehouse_locations_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`work_centers_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`work_orders_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_form_submissions_rels\`("id", "order", "parent_id", "path", "addresses_id", "audit_committees_id", "audit_evidence_id", "audit_findings_id", "bank_accounts_id", "bank_statements_id", "bookable_resources_id", "categories_id", "compliance_frameworks_id", "compliance_gaps_id", "compliance_requirements_id", "consent_records_id", "consignment_arrangements_id", "consolidations_id", "contracts_id", "control_tests_id", "cost_centers_id", "employees_id", "entity_types_id", "evidence_attestations_id", "fair_value_measurements_id", "fiscal_devices_id", "fiscal_periods_id", "fixed_assets_id", "fx_transactions_id", "gl_accounts_id", "goods_receipts_id", "government_grants_id", "internal_controls_id", "inventory_movements_id", "investment_properties_id", "invoices_id", "job_positions_id", "journal_entries_id", "leads_id", "leases_id", "legal_entities_id", "lot_variants_id", "lot_work_phases_id", "lots_id", "media_id", "operators_id", "opportunities_id", "orders_id", "pages_id", "parties_id", "payroll_runs_id", "posts_id", "products_id", "projects_id", "properties_id", "provisions_id", "quality_inspections_id", "receipts_id", "shipments_id", "spaces_id", "subscriptions_id", "tax_codes_id", "tax_jurisdictions_id", "tenants_id", "terminals_id", "transactions_id", "users_id", "warehouse_locations_id", "work_centers_id", "work_orders_id") SELECT "id", "order", "parent_id", "path", "addresses_id", "audit_committees_id", "audit_evidence_id", "audit_findings_id", "bank_accounts_id", "bank_statements_id", "bookable_resources_id", "categories_id", "compliance_frameworks_id", "compliance_gaps_id", "compliance_requirements_id", "consent_records_id", "consignment_arrangements_id", "consolidations_id", "contracts_id", "control_tests_id", "cost_centers_id", "employees_id", "entity_types_id", "evidence_attestations_id", "fair_value_measurements_id", "fiscal_devices_id", "fiscal_periods_id", "fixed_assets_id", "fx_transactions_id", "gl_accounts_id", "goods_receipts_id", "government_grants_id", "internal_controls_id", "inventory_movements_id", "investment_properties_id", "invoices_id", "job_positions_id", "journal_entries_id", "leads_id", "leases_id", "legal_entities_id", "lot_variants_id", "lot_work_phases_id", "lots_id", "media_id", "operators_id", "opportunities_id", "orders_id", "pages_id", "parties_id", "payroll_runs_id", "posts_id", "products_id", "projects_id", "properties_id", "provisions_id", "quality_inspections_id", "receipts_id", "shipments_id", "spaces_id", "subscriptions_id", "tax_codes_id", "tax_jurisdictions_id", "tenants_id", "terminals_id", "transactions_id", "users_id", "warehouse_locations_id", "work_centers_id", "work_orders_id" FROM \`form_submissions_rels\`;`)
  await db.run(sql`DROP TABLE \`form_submissions_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_form_submissions_rels\` RENAME TO \`form_submissions_rels\`;`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_order_idx\` ON \`form_submissions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_parent_idx\` ON \`form_submissions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_path_idx\` ON \`form_submissions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_addresses_id_idx\` ON \`form_submissions_rels\` (\`addresses_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_audit_committees_id_idx\` ON \`form_submissions_rels\` (\`audit_committees_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_audit_evidence_id_idx\` ON \`form_submissions_rels\` (\`audit_evidence_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_audit_findings_id_idx\` ON \`form_submissions_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_bank_accounts_id_idx\` ON \`form_submissions_rels\` (\`bank_accounts_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_bank_statements_id_idx\` ON \`form_submissions_rels\` (\`bank_statements_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_bookable_resources_id_idx\` ON \`form_submissions_rels\` (\`bookable_resources_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_categories_id_idx\` ON \`form_submissions_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_compliance_frameworks_id_idx\` ON \`form_submissions_rels\` (\`compliance_frameworks_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_compliance_gaps_id_idx\` ON \`form_submissions_rels\` (\`compliance_gaps_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_compliance_requirements_id_idx\` ON \`form_submissions_rels\` (\`compliance_requirements_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_consent_records_id_idx\` ON \`form_submissions_rels\` (\`consent_records_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_consignment_arrangements_id_idx\` ON \`form_submissions_rels\` (\`consignment_arrangements_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_consolidations_id_idx\` ON \`form_submissions_rels\` (\`consolidations_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_contracts_id_idx\` ON \`form_submissions_rels\` (\`contracts_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_control_tests_id_idx\` ON \`form_submissions_rels\` (\`control_tests_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_cost_centers_id_idx\` ON \`form_submissions_rels\` (\`cost_centers_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_employees_id_idx\` ON \`form_submissions_rels\` (\`employees_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_entity_types_id_idx\` ON \`form_submissions_rels\` (\`entity_types_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_evidence_attestations_id_idx\` ON \`form_submissions_rels\` (\`evidence_attestations_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_fair_value_measurements_id_idx\` ON \`form_submissions_rels\` (\`fair_value_measurements_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_fiscal_devices_id_idx\` ON \`form_submissions_rels\` (\`fiscal_devices_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_fiscal_periods_id_idx\` ON \`form_submissions_rels\` (\`fiscal_periods_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_fixed_assets_id_idx\` ON \`form_submissions_rels\` (\`fixed_assets_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_fx_transactions_id_idx\` ON \`form_submissions_rels\` (\`fx_transactions_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_gl_accounts_id_idx\` ON \`form_submissions_rels\` (\`gl_accounts_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_goods_receipts_id_idx\` ON \`form_submissions_rels\` (\`goods_receipts_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_government_grants_id_idx\` ON \`form_submissions_rels\` (\`government_grants_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_internal_controls_id_idx\` ON \`form_submissions_rels\` (\`internal_controls_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_inventory_movements_id_idx\` ON \`form_submissions_rels\` (\`inventory_movements_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_investment_properties_id_idx\` ON \`form_submissions_rels\` (\`investment_properties_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_invoices_id_idx\` ON \`form_submissions_rels\` (\`invoices_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_job_positions_id_idx\` ON \`form_submissions_rels\` (\`job_positions_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_journal_entries_id_idx\` ON \`form_submissions_rels\` (\`journal_entries_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_leads_id_idx\` ON \`form_submissions_rels\` (\`leads_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_leases_id_idx\` ON \`form_submissions_rels\` (\`leases_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_legal_entities_id_idx\` ON \`form_submissions_rels\` (\`legal_entities_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_lot_variants_id_idx\` ON \`form_submissions_rels\` (\`lot_variants_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_lot_work_phases_id_idx\` ON \`form_submissions_rels\` (\`lot_work_phases_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_lots_id_idx\` ON \`form_submissions_rels\` (\`lots_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_media_id_idx\` ON \`form_submissions_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_operators_id_idx\` ON \`form_submissions_rels\` (\`operators_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_opportunities_id_idx\` ON \`form_submissions_rels\` (\`opportunities_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_orders_id_idx\` ON \`form_submissions_rels\` (\`orders_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_pages_id_idx\` ON \`form_submissions_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_parties_id_idx\` ON \`form_submissions_rels\` (\`parties_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_payroll_runs_id_idx\` ON \`form_submissions_rels\` (\`payroll_runs_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_posts_id_idx\` ON \`form_submissions_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_products_id_idx\` ON \`form_submissions_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_projects_id_idx\` ON \`form_submissions_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_properties_id_idx\` ON \`form_submissions_rels\` (\`properties_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_provisions_id_idx\` ON \`form_submissions_rels\` (\`provisions_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_quality_inspections_id_idx\` ON \`form_submissions_rels\` (\`quality_inspections_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_receipts_id_idx\` ON \`form_submissions_rels\` (\`receipts_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_shipments_id_idx\` ON \`form_submissions_rels\` (\`shipments_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_spaces_id_idx\` ON \`form_submissions_rels\` (\`spaces_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_subscriptions_id_idx\` ON \`form_submissions_rels\` (\`subscriptions_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_tax_codes_id_idx\` ON \`form_submissions_rels\` (\`tax_codes_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_tax_jurisdictions_id_idx\` ON \`form_submissions_rels\` (\`tax_jurisdictions_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_tenants_id_idx\` ON \`form_submissions_rels\` (\`tenants_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_terminals_id_idx\` ON \`form_submissions_rels\` (\`terminals_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_transactions_id_idx\` ON \`form_submissions_rels\` (\`transactions_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_users_id_idx\` ON \`form_submissions_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_warehouse_locations_id_idx\` ON \`form_submissions_rels\` (\`warehouse_locations_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_work_centers_id_idx\` ON \`form_submissions_rels\` (\`work_centers_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_rels_work_orders_id_idx\` ON \`form_submissions_rels\` (\`work_orders_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__form_submissions_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`addresses_id\` text(36),
  	\`audit_committees_id\` text(36),
  	\`audit_evidence_id\` text(36),
  	\`audit_findings_id\` text(36),
  	\`bank_accounts_id\` text(36),
  	\`bank_statements_id\` text(36),
  	\`bookable_resources_id\` text(36),
  	\`categories_id\` text(36),
  	\`compliance_frameworks_id\` text(36),
  	\`compliance_gaps_id\` text(36),
  	\`compliance_requirements_id\` text(36),
  	\`consent_records_id\` text(36),
  	\`consignment_arrangements_id\` text(36),
  	\`consolidations_id\` text(36),
  	\`contracts_id\` text(36),
  	\`control_tests_id\` text(36),
  	\`cost_centers_id\` text(36),
  	\`employees_id\` text(36),
  	\`entity_types_id\` text(36),
  	\`evidence_attestations_id\` text(36),
  	\`fair_value_measurements_id\` text(36),
  	\`fiscal_devices_id\` text(36),
  	\`fiscal_periods_id\` text(36),
  	\`fixed_assets_id\` text(36),
  	\`fx_transactions_id\` text(36),
  	\`gl_accounts_id\` text,
  	\`goods_receipts_id\` text(36),
  	\`government_grants_id\` text(36),
  	\`internal_controls_id\` text(36),
  	\`inventory_movements_id\` text(36),
  	\`investment_properties_id\` text(36),
  	\`invoices_id\` text(36),
  	\`job_positions_id\` text(36),
  	\`journal_entries_id\` text(36),
  	\`leads_id\` text(36),
  	\`leases_id\` text(36),
  	\`legal_entities_id\` text(36),
  	\`lot_variants_id\` text(36),
  	\`lot_work_phases_id\` text(36),
  	\`lots_id\` text(36),
  	\`media_id\` text(36),
  	\`operators_id\` text(36),
  	\`opportunities_id\` text(36),
  	\`orders_id\` text(36),
  	\`pages_id\` text(36),
  	\`parties_id\` text(36),
  	\`payroll_runs_id\` text(36),
  	\`posts_id\` text(36),
  	\`products_id\` text(36),
  	\`projects_id\` text(36),
  	\`properties_id\` text(36),
  	\`provisions_id\` text(36),
  	\`quality_inspections_id\` text(36),
  	\`receipts_id\` text(36),
  	\`shipments_id\` text(36),
  	\`spaces_id\` text(36),
  	\`subscriptions_id\` text(36),
  	\`tax_codes_id\` text(36),
  	\`tax_jurisdictions_id\` text(36),
  	\`tenants_id\` text(36),
  	\`terminals_id\` text(36),
  	\`transactions_id\` text(36),
  	\`users_id\` text(36),
  	\`warehouse_locations_id\` text(36),
  	\`work_centers_id\` text(36),
  	\`work_orders_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_form_submissions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`addresses_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_committees_id\`) REFERENCES \`audit_committees\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_evidence_id\`) REFERENCES \`audit_evidence\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`bank_accounts_id\`) REFERENCES \`bank_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`bank_statements_id\`) REFERENCES \`bank_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`bookable_resources_id\`) REFERENCES \`bookable_resources\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_frameworks_id\`) REFERENCES \`compliance_frameworks\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_gaps_id\`) REFERENCES \`compliance_gaps\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_requirements_id\`) REFERENCES \`compliance_requirements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`consent_records_id\`) REFERENCES \`consent_records\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`consignment_arrangements_id\`) REFERENCES \`consignment_arrangements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`consolidations_id\`) REFERENCES \`consolidations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`contracts_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`control_tests_id\`) REFERENCES \`control_tests\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`cost_centers_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`employees_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`entity_types_id\`) REFERENCES \`entity_types\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`evidence_attestations_id\`) REFERENCES \`evidence_attestations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fair_value_measurements_id\`) REFERENCES \`fair_value_measurements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fiscal_devices_id\`) REFERENCES \`fiscal_devices\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fiscal_periods_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fixed_assets_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fx_transactions_id\`) REFERENCES \`fx_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`gl_accounts_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`goods_receipts_id\`) REFERENCES \`goods_receipts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`government_grants_id\`) REFERENCES \`government_grants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`inventory_movements_id\`) REFERENCES \`inventory_movements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`investment_properties_id\`) REFERENCES \`investment_properties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`invoices_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`job_positions_id\`) REFERENCES \`job_positions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`journal_entries_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`leads_id\`) REFERENCES \`leads\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`leases_id\`) REFERENCES \`leases\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`legal_entities_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`lot_variants_id\`) REFERENCES \`lot_variants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`lot_work_phases_id\`) REFERENCES \`lot_work_phases\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`lots_id\`) REFERENCES \`lots\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`operators_id\`) REFERENCES \`operators\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`opportunities_id\`) REFERENCES \`opportunities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`orders_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`parties_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`payroll_runs_id\`) REFERENCES \`payroll_runs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`properties_id\`) REFERENCES \`properties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`provisions_id\`) REFERENCES \`provisions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`quality_inspections_id\`) REFERENCES \`quality_inspections\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`receipts_id\`) REFERENCES \`receipts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`shipments_id\`) REFERENCES \`shipments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`spaces_id\`) REFERENCES \`spaces\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`subscriptions_id\`) REFERENCES \`subscriptions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tax_codes_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tax_jurisdictions_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tenants_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`terminals_id\`) REFERENCES \`terminals\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`transactions_id\`) REFERENCES \`transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`warehouse_locations_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`work_centers_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`work_orders_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__form_submissions_v_rels\`("id", "order", "parent_id", "path", "addresses_id", "audit_committees_id", "audit_evidence_id", "audit_findings_id", "bank_accounts_id", "bank_statements_id", "bookable_resources_id", "categories_id", "compliance_frameworks_id", "compliance_gaps_id", "compliance_requirements_id", "consent_records_id", "consignment_arrangements_id", "consolidations_id", "contracts_id", "control_tests_id", "cost_centers_id", "employees_id", "entity_types_id", "evidence_attestations_id", "fair_value_measurements_id", "fiscal_devices_id", "fiscal_periods_id", "fixed_assets_id", "fx_transactions_id", "gl_accounts_id", "goods_receipts_id", "government_grants_id", "internal_controls_id", "inventory_movements_id", "investment_properties_id", "invoices_id", "job_positions_id", "journal_entries_id", "leads_id", "leases_id", "legal_entities_id", "lot_variants_id", "lot_work_phases_id", "lots_id", "media_id", "operators_id", "opportunities_id", "orders_id", "pages_id", "parties_id", "payroll_runs_id", "posts_id", "products_id", "projects_id", "properties_id", "provisions_id", "quality_inspections_id", "receipts_id", "shipments_id", "spaces_id", "subscriptions_id", "tax_codes_id", "tax_jurisdictions_id", "tenants_id", "terminals_id", "transactions_id", "users_id", "warehouse_locations_id", "work_centers_id", "work_orders_id") SELECT "id", "order", "parent_id", "path", "addresses_id", "audit_committees_id", "audit_evidence_id", "audit_findings_id", "bank_accounts_id", "bank_statements_id", "bookable_resources_id", "categories_id", "compliance_frameworks_id", "compliance_gaps_id", "compliance_requirements_id", "consent_records_id", "consignment_arrangements_id", "consolidations_id", "contracts_id", "control_tests_id", "cost_centers_id", "employees_id", "entity_types_id", "evidence_attestations_id", "fair_value_measurements_id", "fiscal_devices_id", "fiscal_periods_id", "fixed_assets_id", "fx_transactions_id", "gl_accounts_id", "goods_receipts_id", "government_grants_id", "internal_controls_id", "inventory_movements_id", "investment_properties_id", "invoices_id", "job_positions_id", "journal_entries_id", "leads_id", "leases_id", "legal_entities_id", "lot_variants_id", "lot_work_phases_id", "lots_id", "media_id", "operators_id", "opportunities_id", "orders_id", "pages_id", "parties_id", "payroll_runs_id", "posts_id", "products_id", "projects_id", "properties_id", "provisions_id", "quality_inspections_id", "receipts_id", "shipments_id", "spaces_id", "subscriptions_id", "tax_codes_id", "tax_jurisdictions_id", "tenants_id", "terminals_id", "transactions_id", "users_id", "warehouse_locations_id", "work_centers_id", "work_orders_id" FROM \`_form_submissions_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_form_submissions_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__form_submissions_v_rels\` RENAME TO \`_form_submissions_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_order_idx\` ON \`_form_submissions_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_parent_idx\` ON \`_form_submissions_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_path_idx\` ON \`_form_submissions_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_addresses_id_idx\` ON \`_form_submissions_v_rels\` (\`addresses_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_audit_committees_id_idx\` ON \`_form_submissions_v_rels\` (\`audit_committees_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_audit_evidence_id_idx\` ON \`_form_submissions_v_rels\` (\`audit_evidence_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_audit_findings_id_idx\` ON \`_form_submissions_v_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_bank_accounts_id_idx\` ON \`_form_submissions_v_rels\` (\`bank_accounts_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_bank_statements_id_idx\` ON \`_form_submissions_v_rels\` (\`bank_statements_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_bookable_resources_id_idx\` ON \`_form_submissions_v_rels\` (\`bookable_resources_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_categories_id_idx\` ON \`_form_submissions_v_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_compliance_frameworks_id_idx\` ON \`_form_submissions_v_rels\` (\`compliance_frameworks_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_compliance_gaps_id_idx\` ON \`_form_submissions_v_rels\` (\`compliance_gaps_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_compliance_requirements_id_idx\` ON \`_form_submissions_v_rels\` (\`compliance_requirements_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_consent_records_id_idx\` ON \`_form_submissions_v_rels\` (\`consent_records_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_consignment_arrangements_id_idx\` ON \`_form_submissions_v_rels\` (\`consignment_arrangements_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_consolidations_id_idx\` ON \`_form_submissions_v_rels\` (\`consolidations_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_contracts_id_idx\` ON \`_form_submissions_v_rels\` (\`contracts_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_control_tests_id_idx\` ON \`_form_submissions_v_rels\` (\`control_tests_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_cost_centers_id_idx\` ON \`_form_submissions_v_rels\` (\`cost_centers_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_employees_id_idx\` ON \`_form_submissions_v_rels\` (\`employees_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_entity_types_id_idx\` ON \`_form_submissions_v_rels\` (\`entity_types_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_evidence_attestations_id_idx\` ON \`_form_submissions_v_rels\` (\`evidence_attestations_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_fair_value_measurements_id_idx\` ON \`_form_submissions_v_rels\` (\`fair_value_measurements_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_fiscal_devices_id_idx\` ON \`_form_submissions_v_rels\` (\`fiscal_devices_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_fiscal_periods_id_idx\` ON \`_form_submissions_v_rels\` (\`fiscal_periods_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_fixed_assets_id_idx\` ON \`_form_submissions_v_rels\` (\`fixed_assets_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_fx_transactions_id_idx\` ON \`_form_submissions_v_rels\` (\`fx_transactions_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_gl_accounts_id_idx\` ON \`_form_submissions_v_rels\` (\`gl_accounts_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_goods_receipts_id_idx\` ON \`_form_submissions_v_rels\` (\`goods_receipts_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_government_grants_id_idx\` ON \`_form_submissions_v_rels\` (\`government_grants_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_internal_controls_id_idx\` ON \`_form_submissions_v_rels\` (\`internal_controls_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_inventory_movements_id_idx\` ON \`_form_submissions_v_rels\` (\`inventory_movements_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_investment_properties_id_idx\` ON \`_form_submissions_v_rels\` (\`investment_properties_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_invoices_id_idx\` ON \`_form_submissions_v_rels\` (\`invoices_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_job_positions_id_idx\` ON \`_form_submissions_v_rels\` (\`job_positions_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_journal_entries_id_idx\` ON \`_form_submissions_v_rels\` (\`journal_entries_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_leads_id_idx\` ON \`_form_submissions_v_rels\` (\`leads_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_leases_id_idx\` ON \`_form_submissions_v_rels\` (\`leases_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_legal_entities_id_idx\` ON \`_form_submissions_v_rels\` (\`legal_entities_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_lot_variants_id_idx\` ON \`_form_submissions_v_rels\` (\`lot_variants_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_lot_work_phases_id_idx\` ON \`_form_submissions_v_rels\` (\`lot_work_phases_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_lots_id_idx\` ON \`_form_submissions_v_rels\` (\`lots_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_media_id_idx\` ON \`_form_submissions_v_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_operators_id_idx\` ON \`_form_submissions_v_rels\` (\`operators_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_opportunities_id_idx\` ON \`_form_submissions_v_rels\` (\`opportunities_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_orders_id_idx\` ON \`_form_submissions_v_rels\` (\`orders_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_pages_id_idx\` ON \`_form_submissions_v_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_parties_id_idx\` ON \`_form_submissions_v_rels\` (\`parties_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_payroll_runs_id_idx\` ON \`_form_submissions_v_rels\` (\`payroll_runs_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_posts_id_idx\` ON \`_form_submissions_v_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_products_id_idx\` ON \`_form_submissions_v_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_projects_id_idx\` ON \`_form_submissions_v_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_properties_id_idx\` ON \`_form_submissions_v_rels\` (\`properties_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_provisions_id_idx\` ON \`_form_submissions_v_rels\` (\`provisions_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_quality_inspections_id_idx\` ON \`_form_submissions_v_rels\` (\`quality_inspections_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_receipts_id_idx\` ON \`_form_submissions_v_rels\` (\`receipts_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_shipments_id_idx\` ON \`_form_submissions_v_rels\` (\`shipments_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_spaces_id_idx\` ON \`_form_submissions_v_rels\` (\`spaces_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_subscriptions_id_idx\` ON \`_form_submissions_v_rels\` (\`subscriptions_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_tax_codes_id_idx\` ON \`_form_submissions_v_rels\` (\`tax_codes_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_tax_jurisdictions_id_idx\` ON \`_form_submissions_v_rels\` (\`tax_jurisdictions_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_tenants_id_idx\` ON \`_form_submissions_v_rels\` (\`tenants_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_terminals_id_idx\` ON \`_form_submissions_v_rels\` (\`terminals_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_transactions_id_idx\` ON \`_form_submissions_v_rels\` (\`transactions_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_users_id_idx\` ON \`_form_submissions_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_warehouse_locations_id_idx\` ON \`_form_submissions_v_rels\` (\`warehouse_locations_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_work_centers_id_idx\` ON \`_form_submissions_v_rels\` (\`work_centers_id\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_rels_work_orders_id_idx\` ON \`_form_submissions_v_rels\` (\`work_orders_id\`);`)
}
