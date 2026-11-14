import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`payments\`;`)
  await db.run(sql`DROP TABLE \`_payments_v\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_expense_reports\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`report_number\` text NOT NULL,
  	\`employee_id\` text(36) NOT NULL,
  	\`submission_date\` text NOT NULL,
  	\`period_start_date\` text,
  	\`period_end_date\` text,
  	\`project_id\` text(36),
  	\`cost_center_id\` text(36),
  	\`business_purpose\` text NOT NULL,
  	\`reimbursement_currency\` text DEFAULT 'EUR',
  	\`total_amount\` numeric NOT NULL,
  	\`total_reimbursable\` numeric,
  	\`total_non_reimbursable\` numeric DEFAULT 0,
  	\`reimbursement_method\` text DEFAULT 'payroll',
  	\`reimbursement_date\` text,
  	\`reimbursed_via_payroll_run_id\` text(36),
  	\`reimbursed_via_payment_id\` text(36),
  	\`journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`employee_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reimbursed_via_payroll_run_id\`) REFERENCES \`payroll_runs\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reimbursed_via_payment_id\`) REFERENCES \`transactions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_expense_reports\`("id", "uuid", "tenant_id", "report_number", "employee_id", "submission_date", "period_start_date", "period_end_date", "project_id", "cost_center_id", "business_purpose", "reimbursement_currency", "total_amount", "total_reimbursable", "total_non_reimbursable", "reimbursement_method", "reimbursement_date", "reimbursed_via_payroll_run_id", "reimbursed_via_payment_id", "journal_entry_id", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "report_number", "employee_id", "submission_date", "period_start_date", "period_end_date", "project_id", "cost_center_id", "business_purpose", "reimbursement_currency", "total_amount", "total_reimbursable", "total_non_reimbursable", "reimbursement_method", "reimbursement_date", "reimbursed_via_payroll_run_id", "reimbursed_via_payment_id", "journal_entry_id", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`expense_reports\`;`)
  await db.run(sql`DROP TABLE \`expense_reports\`;`)
  await db.run(sql`ALTER TABLE \`__new_expense_reports\` RENAME TO \`expense_reports\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`expense_reports_uuid_idx\` ON \`expense_reports\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_tenant_idx\` ON \`expense_reports\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`expense_reports_report_number_idx\` ON \`expense_reports\` (\`report_number\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_employee_idx\` ON \`expense_reports\` (\`employee_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_project_idx\` ON \`expense_reports\` (\`project_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_cost_center_idx\` ON \`expense_reports\` (\`cost_center_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_reimbursed_via_payroll_run_idx\` ON \`expense_reports\` (\`reimbursed_via_payroll_run_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_reimbursed_via_payment_idx\` ON \`expense_reports\` (\`reimbursed_via_payment_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_journal_entry_idx\` ON \`expense_reports\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_created_by_idx\` ON \`expense_reports\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_approved_by_idx\` ON \`expense_reports\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_updated_at_idx\` ON \`expense_reports\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_created_at_idx\` ON \`expense_reports\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__expense_reports_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_report_number\` text NOT NULL,
  	\`version_employee_id\` text(36) NOT NULL,
  	\`version_submission_date\` text NOT NULL,
  	\`version_period_start_date\` text,
  	\`version_period_end_date\` text,
  	\`version_project_id\` text(36),
  	\`version_cost_center_id\` text(36),
  	\`version_business_purpose\` text NOT NULL,
  	\`version_reimbursement_currency\` text DEFAULT 'EUR',
  	\`version_total_amount\` numeric NOT NULL,
  	\`version_total_reimbursable\` numeric,
  	\`version_total_non_reimbursable\` numeric DEFAULT 0,
  	\`version_reimbursement_method\` text DEFAULT 'payroll',
  	\`version_reimbursement_date\` text,
  	\`version_reimbursed_via_payroll_run_id\` text(36),
  	\`version_reimbursed_via_payment_id\` text(36),
  	\`version_journal_entry_id\` text(36),
  	\`version_status\` text DEFAULT 'draft',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`expense_reports\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_employee_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_reimbursed_via_payroll_run_id\`) REFERENCES \`payroll_runs\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_reimbursed_via_payment_id\`) REFERENCES \`transactions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__expense_reports_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_report_number", "version_employee_id", "version_submission_date", "version_period_start_date", "version_period_end_date", "version_project_id", "version_cost_center_id", "version_business_purpose", "version_reimbursement_currency", "version_total_amount", "version_total_reimbursable", "version_total_non_reimbursable", "version_reimbursement_method", "version_reimbursement_date", "version_reimbursed_via_payroll_run_id", "version_reimbursed_via_payment_id", "version_journal_entry_id", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_report_number", "version_employee_id", "version_submission_date", "version_period_start_date", "version_period_end_date", "version_project_id", "version_cost_center_id", "version_business_purpose", "version_reimbursement_currency", "version_total_amount", "version_total_reimbursable", "version_total_non_reimbursable", "version_reimbursement_method", "version_reimbursement_date", "version_reimbursed_via_payroll_run_id", "version_reimbursed_via_payment_id", "version_journal_entry_id", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_expense_reports_v\`;`)
  await db.run(sql`DROP TABLE \`_expense_reports_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__expense_reports_v\` RENAME TO \`_expense_reports_v\`;`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_parent_idx\` ON \`_expense_reports_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_uuid_idx\` ON \`_expense_reports_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_tenant_idx\` ON \`_expense_reports_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_report_number_idx\` ON \`_expense_reports_v\` (\`version_report_number\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_employee_idx\` ON \`_expense_reports_v\` (\`version_employee_id\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_project_idx\` ON \`_expense_reports_v\` (\`version_project_id\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_cost_center_idx\` ON \`_expense_reports_v\` (\`version_cost_center_id\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_reimbursed_via_payrol_idx\` ON \`_expense_reports_v\` (\`version_reimbursed_via_payroll_run_id\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_reimbursed_via_paymen_idx\` ON \`_expense_reports_v\` (\`version_reimbursed_via_payment_id\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_journal_entry_idx\` ON \`_expense_reports_v\` (\`version_journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_created_by_idx\` ON \`_expense_reports_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_approved_by_idx\` ON \`_expense_reports_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_updated_at_idx\` ON \`_expense_reports_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_created_at_idx\` ON \`_expense_reports_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_created_at_idx\` ON \`_expense_reports_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_updated_at_idx\` ON \`_expense_reports_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_payment_allocations\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text,
  	\`payment_id\` text(36) NOT NULL,
  	\`target_type\` text DEFAULT 'invoice' NOT NULL,
  	\`invoice_id\` text(36),
  	\`allocation_date\` text NOT NULL,
  	\`allocated_amount\` numeric NOT NULL,
  	\`allocated_fx\` numeric,
  	\`is_fully_settling\` integer DEFAULT false,
  	\`allocated_by_id\` text(36),
  	\`allocation_kind\` text DEFAULT 'manual',
  	\`reverse_of_id\` text(36),
  	\`status\` text DEFAULT 'posted',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`payment_id\`) REFERENCES \`transactions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`allocated_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reverse_of_id\`) REFERENCES \`payment_allocations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payment_allocations\`("id", "uuid", "tenant_id", "reference", "payment_id", "target_type", "invoice_id", "allocation_date", "allocated_amount", "allocated_fx", "is_fully_settling", "allocated_by_id", "allocation_kind", "reverse_of_id", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "reference", "payment_id", "target_type", "invoice_id", "allocation_date", "allocated_amount", "allocated_fx", "is_fully_settling", "allocated_by_id", "allocation_kind", "reverse_of_id", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`payment_allocations\`;`)
  await db.run(sql`DROP TABLE \`payment_allocations\`;`)
  await db.run(sql`ALTER TABLE \`__new_payment_allocations\` RENAME TO \`payment_allocations\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`payment_allocations_uuid_idx\` ON \`payment_allocations\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_tenant_idx\` ON \`payment_allocations\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_reference_idx\` ON \`payment_allocations\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_payment_idx\` ON \`payment_allocations\` (\`payment_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_invoice_idx\` ON \`payment_allocations\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_allocation_date_idx\` ON \`payment_allocations\` (\`allocation_date\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_allocated_by_idx\` ON \`payment_allocations\` (\`allocated_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_reverse_of_idx\` ON \`payment_allocations\` (\`reverse_of_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_created_by_idx\` ON \`payment_allocations\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_approved_by_idx\` ON \`payment_allocations\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_updated_at_idx\` ON \`payment_allocations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_created_at_idx\` ON \`payment_allocations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__payment_allocations_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_reference\` text,
  	\`version_payment_id\` text(36) NOT NULL,
  	\`version_target_type\` text DEFAULT 'invoice' NOT NULL,
  	\`version_invoice_id\` text(36),
  	\`version_allocation_date\` text NOT NULL,
  	\`version_allocated_amount\` numeric NOT NULL,
  	\`version_allocated_fx\` numeric,
  	\`version_is_fully_settling\` integer DEFAULT false,
  	\`version_allocated_by_id\` text(36),
  	\`version_allocation_kind\` text DEFAULT 'manual',
  	\`version_reverse_of_id\` text(36),
  	\`version_status\` text DEFAULT 'posted',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payment_allocations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_payment_id\`) REFERENCES \`transactions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_allocated_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_reverse_of_id\`) REFERENCES \`payment_allocations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__payment_allocations_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_payment_id", "version_target_type", "version_invoice_id", "version_allocation_date", "version_allocated_amount", "version_allocated_fx", "version_is_fully_settling", "version_allocated_by_id", "version_allocation_kind", "version_reverse_of_id", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_payment_id", "version_target_type", "version_invoice_id", "version_allocation_date", "version_allocated_amount", "version_allocated_fx", "version_is_fully_settling", "version_allocated_by_id", "version_allocation_kind", "version_reverse_of_id", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_payment_allocations_v\`;`)
  await db.run(sql`DROP TABLE \`_payment_allocations_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__payment_allocations_v\` RENAME TO \`_payment_allocations_v\`;`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_parent_idx\` ON \`_payment_allocations_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_uuid_idx\` ON \`_payment_allocations_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_tenant_idx\` ON \`_payment_allocations_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_reference_idx\` ON \`_payment_allocations_v\` (\`version_reference\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_payment_idx\` ON \`_payment_allocations_v\` (\`version_payment_id\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_invoice_idx\` ON \`_payment_allocations_v\` (\`version_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_allocation_date_idx\` ON \`_payment_allocations_v\` (\`version_allocation_date\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_allocated_by_idx\` ON \`_payment_allocations_v\` (\`version_allocated_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_reverse_of_idx\` ON \`_payment_allocations_v\` (\`version_reverse_of_id\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_created_by_idx\` ON \`_payment_allocations_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_approved_by_idx\` ON \`_payment_allocations_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_updated_at_idx\` ON \`_payment_allocations_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_created_at_idx\` ON \`_payment_allocations_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_created_at_idx\` ON \`_payment_allocations_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_updated_at_idx\` ON \`_payment_allocations_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_ecf42f6f7e9ab844998d1601a14e54745\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`end_to_end_id\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`counterparty_name\` text NOT NULL,
  	\`counterparty_iban\` text NOT NULL,
  	\`counterparty_bic\` text,
  	\`remittance_reference\` text,
  	\`mandate_id\` text,
  	\`source_bill_id\` text(36),
  	\`payment_record_id\` text(36),
  	FOREIGN KEY (\`source_bill_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`payment_record_id\`) REFERENCES \`transactions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`payment_runs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_ecf42f6f7e9ab844998d1601a14e54745\`("_order", "_parent_id", "id", "end_to_end_id", "amount", "counterparty_name", "counterparty_iban", "counterparty_bic", "remittance_reference", "mandate_id", "source_bill_id", "payment_record_id") SELECT "_order", "_parent_id", "id", "end_to_end_id", "amount", "counterparty_name", "counterparty_iban", "counterparty_bic", "remittance_reference", "mandate_id", "source_bill_id", "payment_record_id" FROM \`ecf42f6f7e9ab844998d1601a14e54745\`;`)
  await db.run(sql`DROP TABLE \`ecf42f6f7e9ab844998d1601a14e54745\`;`)
  await db.run(sql`ALTER TABLE \`__new_ecf42f6f7e9ab844998d1601a14e54745\` RENAME TO \`ecf42f6f7e9ab844998d1601a14e54745\`;`)
  await db.run(sql`CREATE INDEX \`ecf42f6f7e9ab844998d1601a14e54745_order_idx\` ON \`ecf42f6f7e9ab844998d1601a14e54745\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ecf42f6f7e9ab844998d1601a14e54745_parent_id_idx\` ON \`ecf42f6f7e9ab844998d1601a14e54745\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ecf42f6f7e9ab844998d1601a14e54745_source_bill_idx\` ON \`ecf42f6f7e9ab844998d1601a14e54745\` (\`source_bill_id\`);`)
  await db.run(sql`CREATE INDEX \`ecf42f6f7e9ab844998d1601a14e54745_payment_record_idx\` ON \`ecf42f6f7e9ab844998d1601a14e54745\` (\`payment_record_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__ecf42f6f7e9ab844998d1601a14e54745_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`end_to_end_id\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`counterparty_name\` text NOT NULL,
  	\`counterparty_iban\` text NOT NULL,
  	\`counterparty_bic\` text,
  	\`remittance_reference\` text,
  	\`mandate_id\` text,
  	\`source_bill_id\` text(36),
  	\`payment_record_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`source_bill_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`payment_record_id\`) REFERENCES \`transactions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_payment_runs_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__ecf42f6f7e9ab844998d1601a14e54745_v\`("_order", "_parent_id", "id", "end_to_end_id", "amount", "counterparty_name", "counterparty_iban", "counterparty_bic", "remittance_reference", "mandate_id", "source_bill_id", "payment_record_id", "_uuid") SELECT "_order", "_parent_id", "id", "end_to_end_id", "amount", "counterparty_name", "counterparty_iban", "counterparty_bic", "remittance_reference", "mandate_id", "source_bill_id", "payment_record_id", "_uuid" FROM \`_ecf42f6f7e9ab844998d1601a14e54745_v\`;`)
  await db.run(sql`DROP TABLE \`_ecf42f6f7e9ab844998d1601a14e54745_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__ecf42f6f7e9ab844998d1601a14e54745_v\` RENAME TO \`_ecf42f6f7e9ab844998d1601a14e54745_v\`;`)
  await db.run(sql`CREATE INDEX \`_ecf42f6f7e9ab844998d1601a14e54745_v_order_idx\` ON \`_ecf42f6f7e9ab844998d1601a14e54745_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ecf42f6f7e9ab844998d1601a14e54745_v_parent_id_idx\` ON \`_ecf42f6f7e9ab844998d1601a14e54745_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ecf42f6f7e9ab844998d1601a14e54745_v_source_bill_idx\` ON \`_ecf42f6f7e9ab844998d1601a14e54745_v\` (\`source_bill_id\`);`)
  await db.run(sql`CREATE INDEX \`_ecf42f6f7e9ab844998d1601a14e54745_v_payment_record_idx\` ON \`_ecf42f6f7e9ab844998d1601a14e54745_v\` (\`payment_record_id\`);`)
  await db.run(sql`ALTER TABLE \`transactions\` ADD \`transaction_number\` text;`)
  await db.run(sql`ALTER TABLE \`transactions\` ADD \`payment_kind\` text;`)
  await db.run(sql`ALTER TABLE \`transactions\` ADD \`invoice_id\` text(36) REFERENCES invoices(id);`)
  await db.run(sql`ALTER TABLE \`transactions\` ADD \`parties_sender_id\` text(36) REFERENCES addresses(id);`)
  await db.run(sql`ALTER TABLE \`transactions\` ADD \`parties_receiver_id\` text(36) REFERENCES addresses(id);`)
  await db.run(sql`ALTER TABLE \`transactions\` ADD \`amounts_amount\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`transactions\` ADD \`amounts_invoice_amount\` numeric;`)
  await db.run(sql`ALTER TABLE \`transactions\` ADD \`amounts_currency_code\` text DEFAULT 'EUR';`)
  await db.run(sql`ALTER TABLE \`transactions\` ADD \`amounts_exchange_rate\` numeric;`)
  await db.run(sql`ALTER TABLE \`transactions\` ADD \`dates_sent_at\` text;`)
  await db.run(sql`ALTER TABLE \`transactions\` ADD \`dates_received_at\` text;`)
  await db.run(sql`ALTER TABLE \`transactions\` ADD \`dates_authorized_at\` text;`)
  await db.run(sql`ALTER TABLE \`transactions\` ADD \`authorization_authorized_by_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`transactions\` ADD \`payment_payment_method\` text;`)
  await db.run(sql`ALTER TABLE \`transactions\` ADD \`payment_note\` text;`)
  await db.run(sql`ALTER TABLE \`transactions\` ADD \`metadata\` text;`)
  await db.run(sql`CREATE UNIQUE INDEX \`transactions_transaction_number_idx\` ON \`transactions\` (\`transaction_number\`);`)
  await db.run(sql`CREATE INDEX \`transactions_payment_kind_idx\` ON \`transactions\` (\`payment_kind\`);`)
  await db.run(sql`CREATE INDEX \`transactions_invoice_idx\` ON \`transactions\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`transactions_parties_parties_sender_idx\` ON \`transactions\` (\`parties_sender_id\`);`)
  await db.run(sql`CREATE INDEX \`transactions_parties_parties_receiver_idx\` ON \`transactions\` (\`parties_receiver_id\`);`)
  await db.run(sql`CREATE INDEX \`transactions_authorization_authorization_authorized_by_idx\` ON \`transactions\` (\`authorization_authorized_by_id\`);`)
  await db.run(sql`ALTER TABLE \`_transactions_v\` ADD \`version_transaction_number\` text;`)
  await db.run(sql`ALTER TABLE \`_transactions_v\` ADD \`version_payment_kind\` text;`)
  await db.run(sql`ALTER TABLE \`_transactions_v\` ADD \`version_invoice_id\` text(36) REFERENCES invoices(id);`)
  await db.run(sql`ALTER TABLE \`_transactions_v\` ADD \`version_parties_sender_id\` text(36) REFERENCES addresses(id);`)
  await db.run(sql`ALTER TABLE \`_transactions_v\` ADD \`version_parties_receiver_id\` text(36) REFERENCES addresses(id);`)
  await db.run(sql`ALTER TABLE \`_transactions_v\` ADD \`version_amounts_amount\` numeric DEFAULT 0;`)
  await db.run(sql`ALTER TABLE \`_transactions_v\` ADD \`version_amounts_invoice_amount\` numeric;`)
  await db.run(sql`ALTER TABLE \`_transactions_v\` ADD \`version_amounts_currency_code\` text DEFAULT 'EUR';`)
  await db.run(sql`ALTER TABLE \`_transactions_v\` ADD \`version_amounts_exchange_rate\` numeric;`)
  await db.run(sql`ALTER TABLE \`_transactions_v\` ADD \`version_dates_sent_at\` text;`)
  await db.run(sql`ALTER TABLE \`_transactions_v\` ADD \`version_dates_received_at\` text;`)
  await db.run(sql`ALTER TABLE \`_transactions_v\` ADD \`version_dates_authorized_at\` text;`)
  await db.run(sql`ALTER TABLE \`_transactions_v\` ADD \`version_authorization_authorized_by_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`ALTER TABLE \`_transactions_v\` ADD \`version_payment_payment_method\` text;`)
  await db.run(sql`ALTER TABLE \`_transactions_v\` ADD \`version_payment_note\` text;`)
  await db.run(sql`ALTER TABLE \`_transactions_v\` ADD \`version_metadata\` text;`)
  await db.run(sql`CREATE INDEX \`_transactions_v_version_version_transaction_number_idx\` ON \`_transactions_v\` (\`version_transaction_number\`);`)
  await db.run(sql`CREATE INDEX \`_transactions_v_version_version_payment_kind_idx\` ON \`_transactions_v\` (\`version_payment_kind\`);`)
  await db.run(sql`CREATE INDEX \`_transactions_v_version_version_invoice_idx\` ON \`_transactions_v\` (\`version_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`_transactions_v_version_parties_version_parties_sender_idx\` ON \`_transactions_v\` (\`version_parties_sender_id\`);`)
  await db.run(sql`CREATE INDEX \`_transactions_v_version_parties_version_parties_receiver_idx\` ON \`_transactions_v\` (\`version_parties_receiver_id\`);`)
  await db.run(sql`CREATE INDEX \`_transactions_v_version_authorization_version_authorizat_idx\` ON \`_transactions_v\` (\`version_authorization_authorized_by_id\`);`)
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`payments\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`transaction_number\` text,
  	\`payment_kind\` text DEFAULT 'received' NOT NULL,
  	\`status\` text DEFAULT 'recorded',
  	\`invoice_id\` text(36) NOT NULL,
  	\`parties_sender_id\` text(36) NOT NULL,
  	\`parties_receiver_id\` text(36) NOT NULL,
  	\`amounts_amount\` numeric DEFAULT 0 NOT NULL,
  	\`amounts_invoice_amount\` numeric,
  	\`amounts_currency_code\` text DEFAULT 'EUR' NOT NULL,
  	\`amounts_exchange_rate\` numeric,
  	\`dates_sent_at\` text,
  	\`dates_received_at\` text,
  	\`dates_authorized_at\` text,
  	\`authorization_authorized_by_id\` text(36),
  	\`payment_payment_method\` text,
  	\`payment_note\` text,
  	\`metadata\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parties_sender_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parties_receiver_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`authorization_authorized_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payments_uuid_idx\` ON \`payments\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`payments_tenant_idx\` ON \`payments\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`payments_transaction_number_idx\` ON \`payments\` (\`transaction_number\`);`)
  await db.run(sql`CREATE INDEX \`payments_payment_kind_idx\` ON \`payments\` (\`payment_kind\`);`)
  await db.run(sql`CREATE INDEX \`payments_status_idx\` ON \`payments\` (\`status\`);`)
  await db.run(sql`CREATE INDEX \`payments_invoice_idx\` ON \`payments\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`payments_parties_parties_sender_idx\` ON \`payments\` (\`parties_sender_id\`);`)
  await db.run(sql`CREATE INDEX \`payments_parties_parties_receiver_idx\` ON \`payments\` (\`parties_receiver_id\`);`)
  await db.run(sql`CREATE INDEX \`payments_authorization_authorization_authorized_by_idx\` ON \`payments\` (\`authorization_authorized_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payments_updated_at_idx\` ON \`payments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payments_created_at_idx\` ON \`payments\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_payments_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_transaction_number\` text,
  	\`version_payment_kind\` text DEFAULT 'received' NOT NULL,
  	\`version_status\` text DEFAULT 'recorded',
  	\`version_invoice_id\` text(36) NOT NULL,
  	\`version_parties_sender_id\` text(36) NOT NULL,
  	\`version_parties_receiver_id\` text(36) NOT NULL,
  	\`version_amounts_amount\` numeric DEFAULT 0 NOT NULL,
  	\`version_amounts_invoice_amount\` numeric,
  	\`version_amounts_currency_code\` text DEFAULT 'EUR' NOT NULL,
  	\`version_amounts_exchange_rate\` numeric,
  	\`version_dates_sent_at\` text,
  	\`version_dates_received_at\` text,
  	\`version_dates_authorized_at\` text,
  	\`version_authorization_authorized_by_id\` text(36),
  	\`version_payment_payment_method\` text,
  	\`version_payment_note\` text,
  	\`version_metadata\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parties_sender_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parties_receiver_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_authorization_authorized_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_payments_v_parent_idx\` ON \`_payments_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_payments_v_version_version_uuid_idx\` ON \`_payments_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_payments_v_version_version_tenant_idx\` ON \`_payments_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_payments_v_version_version_transaction_number_idx\` ON \`_payments_v\` (\`version_transaction_number\`);`)
  await db.run(sql`CREATE INDEX \`_payments_v_version_version_payment_kind_idx\` ON \`_payments_v\` (\`version_payment_kind\`);`)
  await db.run(sql`CREATE INDEX \`_payments_v_version_version_status_idx\` ON \`_payments_v\` (\`version_status\`);`)
  await db.run(sql`CREATE INDEX \`_payments_v_version_version_invoice_idx\` ON \`_payments_v\` (\`version_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`_payments_v_version_parties_version_parties_sender_idx\` ON \`_payments_v\` (\`version_parties_sender_id\`);`)
  await db.run(sql`CREATE INDEX \`_payments_v_version_parties_version_parties_receiver_idx\` ON \`_payments_v\` (\`version_parties_receiver_id\`);`)
  await db.run(sql`CREATE INDEX \`_payments_v_version_authorization_version_authorization__idx\` ON \`_payments_v\` (\`version_authorization_authorized_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_payments_v_version_version_updated_at_idx\` ON \`_payments_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_payments_v_version_version_created_at_idx\` ON \`_payments_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_payments_v_created_at_idx\` ON \`_payments_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_payments_v_updated_at_idx\` ON \`_payments_v\` (\`updated_at\`);`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_expense_reports\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`report_number\` text NOT NULL,
  	\`employee_id\` text(36) NOT NULL,
  	\`submission_date\` text NOT NULL,
  	\`period_start_date\` text,
  	\`period_end_date\` text,
  	\`project_id\` text(36),
  	\`cost_center_id\` text(36),
  	\`business_purpose\` text NOT NULL,
  	\`reimbursement_currency\` text DEFAULT 'EUR',
  	\`total_amount\` numeric NOT NULL,
  	\`total_reimbursable\` numeric,
  	\`total_non_reimbursable\` numeric DEFAULT 0,
  	\`reimbursement_method\` text DEFAULT 'payroll',
  	\`reimbursement_date\` text,
  	\`reimbursed_via_payroll_run_id\` text(36),
  	\`reimbursed_via_payment_id\` text(36),
  	\`journal_entry_id\` text(36),
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`employee_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reimbursed_via_payroll_run_id\`) REFERENCES \`payroll_runs\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reimbursed_via_payment_id\`) REFERENCES \`payments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_expense_reports\`("id", "uuid", "tenant_id", "report_number", "employee_id", "submission_date", "period_start_date", "period_end_date", "project_id", "cost_center_id", "business_purpose", "reimbursement_currency", "total_amount", "total_reimbursable", "total_non_reimbursable", "reimbursement_method", "reimbursement_date", "reimbursed_via_payroll_run_id", "reimbursed_via_payment_id", "journal_entry_id", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "report_number", "employee_id", "submission_date", "period_start_date", "period_end_date", "project_id", "cost_center_id", "business_purpose", "reimbursement_currency", "total_amount", "total_reimbursable", "total_non_reimbursable", "reimbursement_method", "reimbursement_date", "reimbursed_via_payroll_run_id", "reimbursed_via_payment_id", "journal_entry_id", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`expense_reports\`;`)
  await db.run(sql`DROP TABLE \`expense_reports\`;`)
  await db.run(sql`ALTER TABLE \`__new_expense_reports\` RENAME TO \`expense_reports\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`expense_reports_uuid_idx\` ON \`expense_reports\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_tenant_idx\` ON \`expense_reports\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`expense_reports_report_number_idx\` ON \`expense_reports\` (\`report_number\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_employee_idx\` ON \`expense_reports\` (\`employee_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_project_idx\` ON \`expense_reports\` (\`project_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_cost_center_idx\` ON \`expense_reports\` (\`cost_center_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_reimbursed_via_payroll_run_idx\` ON \`expense_reports\` (\`reimbursed_via_payroll_run_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_reimbursed_via_payment_idx\` ON \`expense_reports\` (\`reimbursed_via_payment_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_journal_entry_idx\` ON \`expense_reports\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_created_by_idx\` ON \`expense_reports\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_approved_by_idx\` ON \`expense_reports\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_updated_at_idx\` ON \`expense_reports\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_created_at_idx\` ON \`expense_reports\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__expense_reports_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_report_number\` text NOT NULL,
  	\`version_employee_id\` text(36) NOT NULL,
  	\`version_submission_date\` text NOT NULL,
  	\`version_period_start_date\` text,
  	\`version_period_end_date\` text,
  	\`version_project_id\` text(36),
  	\`version_cost_center_id\` text(36),
  	\`version_business_purpose\` text NOT NULL,
  	\`version_reimbursement_currency\` text DEFAULT 'EUR',
  	\`version_total_amount\` numeric NOT NULL,
  	\`version_total_reimbursable\` numeric,
  	\`version_total_non_reimbursable\` numeric DEFAULT 0,
  	\`version_reimbursement_method\` text DEFAULT 'payroll',
  	\`version_reimbursement_date\` text,
  	\`version_reimbursed_via_payroll_run_id\` text(36),
  	\`version_reimbursed_via_payment_id\` text(36),
  	\`version_journal_entry_id\` text(36),
  	\`version_status\` text DEFAULT 'draft',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`expense_reports\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_employee_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_reimbursed_via_payroll_run_id\`) REFERENCES \`payroll_runs\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_reimbursed_via_payment_id\`) REFERENCES \`payments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__expense_reports_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_report_number", "version_employee_id", "version_submission_date", "version_period_start_date", "version_period_end_date", "version_project_id", "version_cost_center_id", "version_business_purpose", "version_reimbursement_currency", "version_total_amount", "version_total_reimbursable", "version_total_non_reimbursable", "version_reimbursement_method", "version_reimbursement_date", "version_reimbursed_via_payroll_run_id", "version_reimbursed_via_payment_id", "version_journal_entry_id", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_report_number", "version_employee_id", "version_submission_date", "version_period_start_date", "version_period_end_date", "version_project_id", "version_cost_center_id", "version_business_purpose", "version_reimbursement_currency", "version_total_amount", "version_total_reimbursable", "version_total_non_reimbursable", "version_reimbursement_method", "version_reimbursement_date", "version_reimbursed_via_payroll_run_id", "version_reimbursed_via_payment_id", "version_journal_entry_id", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_expense_reports_v\`;`)
  await db.run(sql`DROP TABLE \`_expense_reports_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__expense_reports_v\` RENAME TO \`_expense_reports_v\`;`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_parent_idx\` ON \`_expense_reports_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_uuid_idx\` ON \`_expense_reports_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_tenant_idx\` ON \`_expense_reports_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_report_number_idx\` ON \`_expense_reports_v\` (\`version_report_number\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_employee_idx\` ON \`_expense_reports_v\` (\`version_employee_id\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_project_idx\` ON \`_expense_reports_v\` (\`version_project_id\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_cost_center_idx\` ON \`_expense_reports_v\` (\`version_cost_center_id\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_reimbursed_via_payrol_idx\` ON \`_expense_reports_v\` (\`version_reimbursed_via_payroll_run_id\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_reimbursed_via_paymen_idx\` ON \`_expense_reports_v\` (\`version_reimbursed_via_payment_id\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_journal_entry_idx\` ON \`_expense_reports_v\` (\`version_journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_created_by_idx\` ON \`_expense_reports_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_approved_by_idx\` ON \`_expense_reports_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_updated_at_idx\` ON \`_expense_reports_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_version_version_created_at_idx\` ON \`_expense_reports_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_created_at_idx\` ON \`_expense_reports_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_updated_at_idx\` ON \`_expense_reports_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_payment_allocations\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text,
  	\`payment_id\` text(36) NOT NULL,
  	\`target_type\` text DEFAULT 'invoice' NOT NULL,
  	\`invoice_id\` text(36),
  	\`allocation_date\` text NOT NULL,
  	\`allocated_amount\` numeric NOT NULL,
  	\`allocated_fx\` numeric,
  	\`is_fully_settling\` integer DEFAULT false,
  	\`allocated_by_id\` text(36),
  	\`allocation_kind\` text DEFAULT 'manual',
  	\`reverse_of_id\` text(36),
  	\`status\` text DEFAULT 'posted',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`payment_id\`) REFERENCES \`payments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`allocated_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reverse_of_id\`) REFERENCES \`payment_allocations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payment_allocations\`("id", "uuid", "tenant_id", "reference", "payment_id", "target_type", "invoice_id", "allocation_date", "allocated_amount", "allocated_fx", "is_fully_settling", "allocated_by_id", "allocation_kind", "reverse_of_id", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "reference", "payment_id", "target_type", "invoice_id", "allocation_date", "allocated_amount", "allocated_fx", "is_fully_settling", "allocated_by_id", "allocation_kind", "reverse_of_id", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`payment_allocations\`;`)
  await db.run(sql`DROP TABLE \`payment_allocations\`;`)
  await db.run(sql`ALTER TABLE \`__new_payment_allocations\` RENAME TO \`payment_allocations\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`payment_allocations_uuid_idx\` ON \`payment_allocations\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_tenant_idx\` ON \`payment_allocations\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_reference_idx\` ON \`payment_allocations\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_payment_idx\` ON \`payment_allocations\` (\`payment_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_invoice_idx\` ON \`payment_allocations\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_allocation_date_idx\` ON \`payment_allocations\` (\`allocation_date\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_allocated_by_idx\` ON \`payment_allocations\` (\`allocated_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_reverse_of_idx\` ON \`payment_allocations\` (\`reverse_of_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_created_by_idx\` ON \`payment_allocations\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_approved_by_idx\` ON \`payment_allocations\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_updated_at_idx\` ON \`payment_allocations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_created_at_idx\` ON \`payment_allocations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__payment_allocations_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_reference\` text,
  	\`version_payment_id\` text(36) NOT NULL,
  	\`version_target_type\` text DEFAULT 'invoice' NOT NULL,
  	\`version_invoice_id\` text(36),
  	\`version_allocation_date\` text NOT NULL,
  	\`version_allocated_amount\` numeric NOT NULL,
  	\`version_allocated_fx\` numeric,
  	\`version_is_fully_settling\` integer DEFAULT false,
  	\`version_allocated_by_id\` text(36),
  	\`version_allocation_kind\` text DEFAULT 'manual',
  	\`version_reverse_of_id\` text(36),
  	\`version_status\` text DEFAULT 'posted',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payment_allocations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_payment_id\`) REFERENCES \`payments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_allocated_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_reverse_of_id\`) REFERENCES \`payment_allocations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__payment_allocations_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_payment_id", "version_target_type", "version_invoice_id", "version_allocation_date", "version_allocated_amount", "version_allocated_fx", "version_is_fully_settling", "version_allocated_by_id", "version_allocation_kind", "version_reverse_of_id", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_payment_id", "version_target_type", "version_invoice_id", "version_allocation_date", "version_allocated_amount", "version_allocated_fx", "version_is_fully_settling", "version_allocated_by_id", "version_allocation_kind", "version_reverse_of_id", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_payment_allocations_v\`;`)
  await db.run(sql`DROP TABLE \`_payment_allocations_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__payment_allocations_v\` RENAME TO \`_payment_allocations_v\`;`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_parent_idx\` ON \`_payment_allocations_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_uuid_idx\` ON \`_payment_allocations_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_tenant_idx\` ON \`_payment_allocations_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_reference_idx\` ON \`_payment_allocations_v\` (\`version_reference\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_payment_idx\` ON \`_payment_allocations_v\` (\`version_payment_id\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_invoice_idx\` ON \`_payment_allocations_v\` (\`version_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_allocation_date_idx\` ON \`_payment_allocations_v\` (\`version_allocation_date\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_allocated_by_idx\` ON \`_payment_allocations_v\` (\`version_allocated_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_reverse_of_idx\` ON \`_payment_allocations_v\` (\`version_reverse_of_id\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_created_by_idx\` ON \`_payment_allocations_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_approved_by_idx\` ON \`_payment_allocations_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_updated_at_idx\` ON \`_payment_allocations_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_version_version_created_at_idx\` ON \`_payment_allocations_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_created_at_idx\` ON \`_payment_allocations_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_updated_at_idx\` ON \`_payment_allocations_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_ecf42f6f7e9ab844998d1601a14e54745\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`end_to_end_id\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`counterparty_name\` text NOT NULL,
  	\`counterparty_iban\` text NOT NULL,
  	\`counterparty_bic\` text,
  	\`remittance_reference\` text,
  	\`mandate_id\` text,
  	\`source_bill_id\` text(36),
  	\`payment_record_id\` text(36),
  	FOREIGN KEY (\`source_bill_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`payment_record_id\`) REFERENCES \`payments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`payment_runs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_ecf42f6f7e9ab844998d1601a14e54745\`("_order", "_parent_id", "id", "end_to_end_id", "amount", "counterparty_name", "counterparty_iban", "counterparty_bic", "remittance_reference", "mandate_id", "source_bill_id", "payment_record_id") SELECT "_order", "_parent_id", "id", "end_to_end_id", "amount", "counterparty_name", "counterparty_iban", "counterparty_bic", "remittance_reference", "mandate_id", "source_bill_id", "payment_record_id" FROM \`ecf42f6f7e9ab844998d1601a14e54745\`;`)
  await db.run(sql`DROP TABLE \`ecf42f6f7e9ab844998d1601a14e54745\`;`)
  await db.run(sql`ALTER TABLE \`__new_ecf42f6f7e9ab844998d1601a14e54745\` RENAME TO \`ecf42f6f7e9ab844998d1601a14e54745\`;`)
  await db.run(sql`CREATE INDEX \`ecf42f6f7e9ab844998d1601a14e54745_order_idx\` ON \`ecf42f6f7e9ab844998d1601a14e54745\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ecf42f6f7e9ab844998d1601a14e54745_parent_id_idx\` ON \`ecf42f6f7e9ab844998d1601a14e54745\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ecf42f6f7e9ab844998d1601a14e54745_source_bill_idx\` ON \`ecf42f6f7e9ab844998d1601a14e54745\` (\`source_bill_id\`);`)
  await db.run(sql`CREATE INDEX \`ecf42f6f7e9ab844998d1601a14e54745_payment_record_idx\` ON \`ecf42f6f7e9ab844998d1601a14e54745\` (\`payment_record_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__ecf42f6f7e9ab844998d1601a14e54745_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`end_to_end_id\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`counterparty_name\` text NOT NULL,
  	\`counterparty_iban\` text NOT NULL,
  	\`counterparty_bic\` text,
  	\`remittance_reference\` text,
  	\`mandate_id\` text,
  	\`source_bill_id\` text(36),
  	\`payment_record_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`source_bill_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`payment_record_id\`) REFERENCES \`payments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_payment_runs_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__ecf42f6f7e9ab844998d1601a14e54745_v\`("_order", "_parent_id", "id", "end_to_end_id", "amount", "counterparty_name", "counterparty_iban", "counterparty_bic", "remittance_reference", "mandate_id", "source_bill_id", "payment_record_id", "_uuid") SELECT "_order", "_parent_id", "id", "end_to_end_id", "amount", "counterparty_name", "counterparty_iban", "counterparty_bic", "remittance_reference", "mandate_id", "source_bill_id", "payment_record_id", "_uuid" FROM \`_ecf42f6f7e9ab844998d1601a14e54745_v\`;`)
  await db.run(sql`DROP TABLE \`_ecf42f6f7e9ab844998d1601a14e54745_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__ecf42f6f7e9ab844998d1601a14e54745_v\` RENAME TO \`_ecf42f6f7e9ab844998d1601a14e54745_v\`;`)
  await db.run(sql`CREATE INDEX \`_ecf42f6f7e9ab844998d1601a14e54745_v_order_idx\` ON \`_ecf42f6f7e9ab844998d1601a14e54745_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ecf42f6f7e9ab844998d1601a14e54745_v_parent_id_idx\` ON \`_ecf42f6f7e9ab844998d1601a14e54745_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ecf42f6f7e9ab844998d1601a14e54745_v_source_bill_idx\` ON \`_ecf42f6f7e9ab844998d1601a14e54745_v\` (\`source_bill_id\`);`)
  await db.run(sql`CREATE INDEX \`_ecf42f6f7e9ab844998d1601a14e54745_v_payment_record_idx\` ON \`_ecf42f6f7e9ab844998d1601a14e54745_v\` (\`payment_record_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_transactions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`payment_method\` text,
  	\`stripe_customer_i_d\` text,
  	\`stripe_payment_intent_i_d\` text,
  	\`billing_address_title\` text,
  	\`billing_address_first_name\` text,
  	\`billing_address_last_name\` text,
  	\`billing_address_company\` text,
  	\`billing_address_address_line1\` text,
  	\`billing_address_address_line2\` text,
  	\`billing_address_city\` text,
  	\`billing_address_state\` text,
  	\`billing_address_postal_code\` text,
  	\`billing_address_country\` text,
  	\`billing_address_phone\` text,
  	\`status\` text DEFAULT 'pending' NOT NULL,
  	\`customer_id\` text(36),
  	\`customer_email\` text,
  	\`order_id\` text(36),
  	\`cart_id\` text(36),
  	\`amount\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cart_id\`) REFERENCES \`carts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_transactions\`("id", "uuid", "tenant_id", "payment_method", "stripe_customer_i_d", "stripe_payment_intent_i_d", "billing_address_title", "billing_address_first_name", "billing_address_last_name", "billing_address_company", "billing_address_address_line1", "billing_address_address_line2", "billing_address_city", "billing_address_state", "billing_address_postal_code", "billing_address_country", "billing_address_phone", "status", "customer_id", "customer_email", "order_id", "cart_id", "amount", "currency", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "payment_method", "stripe_customer_i_d", "stripe_payment_intent_i_d", "billing_address_title", "billing_address_first_name", "billing_address_last_name", "billing_address_company", "billing_address_address_line1", "billing_address_address_line2", "billing_address_city", "billing_address_state", "billing_address_postal_code", "billing_address_country", "billing_address_phone", "status", "customer_id", "customer_email", "order_id", "cart_id", "amount", "currency", "updated_at", "created_at" FROM \`transactions\`;`)
  await db.run(sql`DROP TABLE \`transactions\`;`)
  await db.run(sql`ALTER TABLE \`__new_transactions\` RENAME TO \`transactions\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`transactions_uuid_idx\` ON \`transactions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`transactions_tenant_idx\` ON \`transactions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`transactions_customer_idx\` ON \`transactions\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`transactions_order_idx\` ON \`transactions\` (\`order_id\`);`)
  await db.run(sql`CREATE INDEX \`transactions_cart_idx\` ON \`transactions\` (\`cart_id\`);`)
  await db.run(sql`CREATE INDEX \`transactions_updated_at_idx\` ON \`transactions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`transactions_created_at_idx\` ON \`transactions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__transactions_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_payment_method\` text,
  	\`version_stripe_customer_i_d\` text,
  	\`version_stripe_payment_intent_i_d\` text,
  	\`version_billing_address_title\` text,
  	\`version_billing_address_first_name\` text,
  	\`version_billing_address_last_name\` text,
  	\`version_billing_address_company\` text,
  	\`version_billing_address_address_line1\` text,
  	\`version_billing_address_address_line2\` text,
  	\`version_billing_address_city\` text,
  	\`version_billing_address_state\` text,
  	\`version_billing_address_postal_code\` text,
  	\`version_billing_address_country\` text,
  	\`version_billing_address_phone\` text,
  	\`version_status\` text DEFAULT 'pending' NOT NULL,
  	\`version_customer_id\` text(36),
  	\`version_customer_email\` text,
  	\`version_order_id\` text(36),
  	\`version_cart_id\` text(36),
  	\`version_amount\` numeric,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`transactions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_customer_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_cart_id\`) REFERENCES \`carts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__transactions_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_payment_method", "version_stripe_customer_i_d", "version_stripe_payment_intent_i_d", "version_billing_address_title", "version_billing_address_first_name", "version_billing_address_last_name", "version_billing_address_company", "version_billing_address_address_line1", "version_billing_address_address_line2", "version_billing_address_city", "version_billing_address_state", "version_billing_address_postal_code", "version_billing_address_country", "version_billing_address_phone", "version_status", "version_customer_id", "version_customer_email", "version_order_id", "version_cart_id", "version_amount", "version_currency", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_payment_method", "version_stripe_customer_i_d", "version_stripe_payment_intent_i_d", "version_billing_address_title", "version_billing_address_first_name", "version_billing_address_last_name", "version_billing_address_company", "version_billing_address_address_line1", "version_billing_address_address_line2", "version_billing_address_city", "version_billing_address_state", "version_billing_address_postal_code", "version_billing_address_country", "version_billing_address_phone", "version_status", "version_customer_id", "version_customer_email", "version_order_id", "version_cart_id", "version_amount", "version_currency", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_transactions_v\`;`)
  await db.run(sql`DROP TABLE \`_transactions_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__transactions_v\` RENAME TO \`_transactions_v\`;`)
  await db.run(sql`CREATE INDEX \`_transactions_v_parent_idx\` ON \`_transactions_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_transactions_v_version_version_uuid_idx\` ON \`_transactions_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_transactions_v_version_version_tenant_idx\` ON \`_transactions_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_transactions_v_version_version_customer_idx\` ON \`_transactions_v\` (\`version_customer_id\`);`)
  await db.run(sql`CREATE INDEX \`_transactions_v_version_version_order_idx\` ON \`_transactions_v\` (\`version_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_transactions_v_version_version_cart_idx\` ON \`_transactions_v\` (\`version_cart_id\`);`)
  await db.run(sql`CREATE INDEX \`_transactions_v_version_version_updated_at_idx\` ON \`_transactions_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_transactions_v_version_version_created_at_idx\` ON \`_transactions_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_transactions_v_created_at_idx\` ON \`_transactions_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_transactions_v_updated_at_idx\` ON \`_transactions_v\` (\`updated_at\`);`)
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
}
