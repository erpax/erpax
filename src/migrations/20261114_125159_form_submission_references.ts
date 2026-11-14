import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`form_submissions_references\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_references_order_idx\` ON \`form_submissions_references\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_references_parent_id_idx\` ON \`form_submissions_references\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions_rels\` (
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
  await db.run(sql`CREATE TABLE \`_form_submissions_v_version_references\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_form_submissions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_version_references_order_idx\` ON \`_form_submissions_v_version_references\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_form_submissions_v_version_references_parent_id_idx\` ON \`_form_submissions_v_version_references\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_form_submissions_v_rels\` (
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
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'orders', entity: 'collection', fieldPath: 'approvalChain.comment', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'purchase-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'purchase-requisitions', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'purchase-requisitions', entity: 'collection', fieldPath: 'approvalChain.comment', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'vendor-quotes', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`form_submissions_references\`;`)
  await db.run(sql`DROP TABLE \`form_submissions_rels\`;`)
  await db.run(sql`DROP TABLE \`_form_submissions_v_version_references\`;`)
  await db.run(sql`DROP TABLE \`_form_submissions_v_rels\`;`)
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'orders', entity: 'collection', fieldPath: 'approvalChain.comment', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'purchase-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'purchase-requisitions', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'purchase-requisitions', entity: 'collection', fieldPath: 'approvalChain.comment', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'vendor-quotes', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
}
