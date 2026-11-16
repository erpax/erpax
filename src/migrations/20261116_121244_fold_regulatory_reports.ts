import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_document_details_regulatory_repo_962d614a\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`entity_id\` text(36),
  	\`report_type\` text,
  	\`status\` text,
  	\`reporting_standard_id\` text(36),
  	\`grant_id\` text(36),
  	\`fiscal_period_start\` text,
  	\`fiscal_period_end\` text,
  	\`due_date\` text,
  	\`submission_date\` text,
  	\`regulatory_feedback\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reporting_standard_id\`) REFERENCES \`compliance_frameworks\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`grant_id\`) REFERENCES \`government_grants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_regulatory_repo_962d614a_order_idx\` ON \`pages_document_details_regulatory_repo_962d614a\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_regulatory_repo_962d614a_parent_id_idx\` ON \`pages_document_details_regulatory_repo_962d614a\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_regulatory_repo_962d614a_path_idx\` ON \`pages_document_details_regulatory_repo_962d614a\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_regulatory_repo_962d614a_entity_idx\` ON \`pages_document_details_regulatory_repo_962d614a\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_regulatory_repo_962d614a_reportin_idx\` ON \`pages_document_details_regulatory_repo_962d614a\` (\`reporting_standard_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_regulatory_repo_962d614a_grant_idx\` ON \`pages_document_details_regulatory_repo_962d614a\` (\`grant_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_regulatory_repo_962d614a_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`entity_id\` text(36),
  	\`report_type\` text,
  	\`status\` text,
  	\`reporting_standard_id\` text(36),
  	\`grant_id\` text(36),
  	\`fiscal_period_start\` text,
  	\`fiscal_period_end\` text,
  	\`due_date\` text,
  	\`submission_date\` text,
  	\`regulatory_feedback\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reporting_standard_id\`) REFERENCES \`compliance_frameworks\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`grant_id\`) REFERENCES \`government_grants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_regulatory_repo_962d614a_v_order_idx\` ON \`_pages_document_details_regulatory_repo_962d614a_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_regulatory_repo_962d614a_v_parent_id_idx\` ON \`_pages_document_details_regulatory_repo_962d614a_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_regulatory_repo_962d614a_v_path_idx\` ON \`_pages_document_details_regulatory_repo_962d614a_v\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_regulatory_repo_962d614a_v_entit_idx\` ON \`_pages_document_details_regulatory_repo_962d614a_v\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_regulatory_repo_962d614a_v_repor_idx\` ON \`_pages_document_details_regulatory_repo_962d614a_v\` (\`reporting_standard_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_regulatory_repo_962d614a_v_grant_idx\` ON \`_pages_document_details_regulatory_repo_962d614a_v\` (\`grant_id\`);`)
  await db.run(sql`DROP TABLE \`regulatory_reports\`;`)
  await db.run(sql`DROP TABLE \`regulatory_reports_rels\`;`)
  await db.run(sql`DROP TABLE \`_regulatory_reports_v\`;`)
  await db.run(sql`DROP TABLE \`_regulatory_reports_v_rels\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`regulatory_reports\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`grant_id\` text(36),
  	\`entity_id\` text(36) NOT NULL,
  	\`report_name\` text NOT NULL,
  	\`reporting_standard_id\` text(36),
  	\`jurisdiction_id\` text(36) NOT NULL,
  	\`report_type\` text NOT NULL,
  	\`fiscal_period_start\` text NOT NULL,
  	\`fiscal_period_end\` text NOT NULL,
  	\`due_date\` text NOT NULL,
  	\`submission_date\` text,
  	\`status\` text NOT NULL,
  	\`report_document_id\` text(36),
  	\`regulatory_feedback\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`grant_id\`) REFERENCES \`government_grants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reporting_standard_id\`) REFERENCES \`compliance_frameworks\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`jurisdiction_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`report_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`regulatory_reports_uuid_idx\` ON \`regulatory_reports\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_tenant_idx\` ON \`regulatory_reports\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_grant_idx\` ON \`regulatory_reports\` (\`grant_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_entity_idx\` ON \`regulatory_reports\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_report_name_idx\` ON \`regulatory_reports\` (\`report_name\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_reporting_standard_idx\` ON \`regulatory_reports\` (\`reporting_standard_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_jurisdiction_idx\` ON \`regulatory_reports\` (\`jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_report_document_idx\` ON \`regulatory_reports\` (\`report_document_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_updated_at_idx\` ON \`regulatory_reports\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_created_at_idx\` ON \`regulatory_reports\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`regulatory_reports_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_findings_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`regulatory_reports\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`regulatory_reports_rels_order_idx\` ON \`regulatory_reports_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_rels_parent_idx\` ON \`regulatory_reports_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_rels_path_idx\` ON \`regulatory_reports_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_rels_audit_findings_id_idx\` ON \`regulatory_reports_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_rels_users_id_idx\` ON \`regulatory_reports_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_regulatory_reports_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_grant_id\` text(36),
  	\`version_entity_id\` text(36) NOT NULL,
  	\`version_report_name\` text NOT NULL,
  	\`version_reporting_standard_id\` text(36),
  	\`version_jurisdiction_id\` text(36) NOT NULL,
  	\`version_report_type\` text NOT NULL,
  	\`version_fiscal_period_start\` text NOT NULL,
  	\`version_fiscal_period_end\` text NOT NULL,
  	\`version_due_date\` text NOT NULL,
  	\`version_submission_date\` text,
  	\`version_status\` text NOT NULL,
  	\`version_report_document_id\` text(36),
  	\`version_regulatory_feedback\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`regulatory_reports\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_grant_id\`) REFERENCES \`government_grants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_reporting_standard_id\`) REFERENCES \`compliance_frameworks\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_jurisdiction_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_report_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_parent_idx\` ON \`_regulatory_reports_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_uuid_idx\` ON \`_regulatory_reports_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_tenant_idx\` ON \`_regulatory_reports_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_grant_idx\` ON \`_regulatory_reports_v\` (\`version_grant_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_entity_idx\` ON \`_regulatory_reports_v\` (\`version_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_report_name_idx\` ON \`_regulatory_reports_v\` (\`version_report_name\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_reporting_standard_idx\` ON \`_regulatory_reports_v\` (\`version_reporting_standard_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_jurisdiction_idx\` ON \`_regulatory_reports_v\` (\`version_jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_report_document_idx\` ON \`_regulatory_reports_v\` (\`version_report_document_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_updated_at_idx\` ON \`_regulatory_reports_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_created_at_idx\` ON \`_regulatory_reports_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_created_at_idx\` ON \`_regulatory_reports_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_updated_at_idx\` ON \`_regulatory_reports_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_regulatory_reports_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_findings_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_regulatory_reports_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_rels_order_idx\` ON \`_regulatory_reports_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_rels_parent_idx\` ON \`_regulatory_reports_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_rels_path_idx\` ON \`_regulatory_reports_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_rels_audit_findings_id_idx\` ON \`_regulatory_reports_v_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_rels_users_id_idx\` ON \`_regulatory_reports_v_rels\` (\`users_id\`);`)
  await db.run(sql`DROP TABLE \`pages_document_details_regulatory_repo_962d614a\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_regulatory_repo_962d614a_v\`;`)
}
