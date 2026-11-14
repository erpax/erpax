import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`e8ace94baac3a8fadab2c2813fa5e353c\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`language_code\` text NOT NULL,
  	\`language_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e8ace94baac3a8fadab2c2813fa5e353c_order_idx\` ON \`e8ace94baac3a8fadab2c2813fa5e353c\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e8ace94baac3a8fadab2c2813fa5e353c_parent_id_idx\` ON \`e8ace94baac3a8fadab2c2813fa5e353c\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`eb0ad1d8388688f31ad72a311eb768c1d\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`filing_type\` text NOT NULL,
  	\`deadline\` text NOT NULL,
  	\`frequency\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eb0ad1d8388688f31ad72a311eb768c1d_order_idx\` ON \`eb0ad1d8388688f31ad72a311eb768c1d\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eb0ad1d8388688f31ad72a311eb768c1d_parent_id_idx\` ON \`eb0ad1d8388688f31ad72a311eb768c1d\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`tax_jurisdictions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`compliance_frameworks_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_frameworks_id\`) REFERENCES \`compliance_frameworks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_rels_order_idx\` ON \`tax_jurisdictions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_rels_parent_idx\` ON \`tax_jurisdictions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_rels_path_idx\` ON \`tax_jurisdictions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_rels_compliance_frameworks_id_idx\` ON \`tax_jurisdictions_rels\` (\`compliance_frameworks_id\`);`)
  await db.run(sql`CREATE TABLE \`_e8ace94baac3a8fadab2c2813fa5e353c_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`language_code\` text NOT NULL,
  	\`language_name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_tax_jurisdictions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e8ace94baac3a8fadab2c2813fa5e353c_v_order_idx\` ON \`_e8ace94baac3a8fadab2c2813fa5e353c_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e8ace94baac3a8fadab2c2813fa5e353c_v_parent_id_idx\` ON \`_e8ace94baac3a8fadab2c2813fa5e353c_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_eb0ad1d8388688f31ad72a311eb768c1d_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`filing_type\` text NOT NULL,
  	\`deadline\` text NOT NULL,
  	\`frequency\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_tax_jurisdictions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_eb0ad1d8388688f31ad72a311eb768c1d_v_order_idx\` ON \`_eb0ad1d8388688f31ad72a311eb768c1d_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eb0ad1d8388688f31ad72a311eb768c1d_v_parent_id_idx\` ON \`_eb0ad1d8388688f31ad72a311eb768c1d_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_tax_jurisdictions_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`compliance_frameworks_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_tax_jurisdictions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_frameworks_id\`) REFERENCES \`compliance_frameworks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_tax_jurisdictions_v_rels_order_idx\` ON \`_tax_jurisdictions_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_tax_jurisdictions_v_rels_parent_idx\` ON \`_tax_jurisdictions_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_tax_jurisdictions_v_rels_path_idx\` ON \`_tax_jurisdictions_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_tax_jurisdictions_v_rels_compliance_frameworks_id_idx\` ON \`_tax_jurisdictions_v_rels\` (\`compliance_frameworks_id\`);`)
  await db.run(sql`DROP TABLE \`e6b390099a5c88994b32617396728b9d1\`;`)
  await db.run(sql`DROP TABLE \`e6eb48eceb528889a8621e1cf37bbe038\`;`)
  await db.run(sql`DROP TABLE \`taxing_jurisdictions\`;`)
  await db.run(sql`DROP TABLE \`taxing_jurisdictions_rels\`;`)
  await db.run(sql`DROP TABLE \`_e6b390099a5c88994b32617396728b9d1_v\`;`)
  await db.run(sql`DROP TABLE \`_e6eb48eceb528889a8621e1cf37bbe038_v\`;`)
  await db.run(sql`DROP TABLE \`_taxing_jurisdictions_v\`;`)
  await db.run(sql`DROP TABLE \`_taxing_jurisdictions_v_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_compliance_deadlines\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`entity_id\` text(36) NOT NULL,
  	\`deadline_name\` text NOT NULL,
  	\`deadline_type\` text NOT NULL,
  	\`jurisdiction_id\` text(36),
  	\`requirement_id\` text(36),
  	\`due_date\` text NOT NULL,
  	\`submission_date\` text,
  	\`status\` text DEFAULT 'on-track',
  	\`priority\` text,
  	\`penalty\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`jurisdiction_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`requirement_id\`) REFERENCES \`compliance_requirements\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_compliance_deadlines\`("id", "uuid", "tenant_id", "entity_id", "deadline_name", "deadline_type", "jurisdiction_id", "requirement_id", "due_date", "submission_date", "status", "priority", "penalty", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "entity_id", "deadline_name", "deadline_type", "jurisdiction_id", "requirement_id", "due_date", "submission_date", "status", "priority", "penalty", "updated_at", "created_at" FROM \`compliance_deadlines\`;`)
  await db.run(sql`DROP TABLE \`compliance_deadlines\`;`)
  await db.run(sql`ALTER TABLE \`__new_compliance_deadlines\` RENAME TO \`compliance_deadlines\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`compliance_deadlines_uuid_idx\` ON \`compliance_deadlines\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_tenant_idx\` ON \`compliance_deadlines\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_entity_idx\` ON \`compliance_deadlines\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_jurisdiction_idx\` ON \`compliance_deadlines\` (\`jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_requirement_idx\` ON \`compliance_deadlines\` (\`requirement_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_updated_at_idx\` ON \`compliance_deadlines\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_created_at_idx\` ON \`compliance_deadlines\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__compliance_deadlines_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_entity_id\` text(36) NOT NULL,
  	\`version_deadline_name\` text NOT NULL,
  	\`version_deadline_type\` text NOT NULL,
  	\`version_jurisdiction_id\` text(36),
  	\`version_requirement_id\` text(36),
  	\`version_due_date\` text NOT NULL,
  	\`version_submission_date\` text,
  	\`version_status\` text DEFAULT 'on-track',
  	\`version_priority\` text,
  	\`version_penalty\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`compliance_deadlines\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_jurisdiction_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_requirement_id\`) REFERENCES \`compliance_requirements\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__compliance_deadlines_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_entity_id", "version_deadline_name", "version_deadline_type", "version_jurisdiction_id", "version_requirement_id", "version_due_date", "version_submission_date", "version_status", "version_priority", "version_penalty", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_entity_id", "version_deadline_name", "version_deadline_type", "version_jurisdiction_id", "version_requirement_id", "version_due_date", "version_submission_date", "version_status", "version_priority", "version_penalty", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_compliance_deadlines_v\`;`)
  await db.run(sql`DROP TABLE \`_compliance_deadlines_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__compliance_deadlines_v\` RENAME TO \`_compliance_deadlines_v\`;`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_parent_idx\` ON \`_compliance_deadlines_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_version_uuid_idx\` ON \`_compliance_deadlines_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_version_tenant_idx\` ON \`_compliance_deadlines_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_version_entity_idx\` ON \`_compliance_deadlines_v\` (\`version_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_version_jurisdiction_idx\` ON \`_compliance_deadlines_v\` (\`version_jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_version_requirement_idx\` ON \`_compliance_deadlines_v\` (\`version_requirement_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_version_updated_at_idx\` ON \`_compliance_deadlines_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_version_created_at_idx\` ON \`_compliance_deadlines_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_created_at_idx\` ON \`_compliance_deadlines_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_updated_at_idx\` ON \`_compliance_deadlines_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_entity_legal_structures\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`jurisdiction_id\` text(36) NOT NULL,
  	\`entity_type_id\` text(36) NOT NULL,
  	\`local_name\` text NOT NULL,
  	\`abbreviation\` text,
  	\`description\` text,
  	\`regulatory_characteristics\` text,
  	\`governance_structure\` text,
  	\`tax_treatment\` text,
  	\`audit_requirement\` text,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`jurisdiction_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_type_id\`) REFERENCES \`entity_types\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_entity_legal_structures\`("id", "uuid", "tenant_id", "jurisdiction_id", "entity_type_id", "local_name", "abbreviation", "description", "regulatory_characteristics", "governance_structure", "tax_treatment", "audit_requirement", "is_active", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "jurisdiction_id", "entity_type_id", "local_name", "abbreviation", "description", "regulatory_characteristics", "governance_structure", "tax_treatment", "audit_requirement", "is_active", "updated_at", "created_at" FROM \`entity_legal_structures\`;`)
  await db.run(sql`DROP TABLE \`entity_legal_structures\`;`)
  await db.run(sql`ALTER TABLE \`__new_entity_legal_structures\` RENAME TO \`entity_legal_structures\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`entity_legal_structures_uuid_idx\` ON \`entity_legal_structures\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`entity_legal_structures_tenant_idx\` ON \`entity_legal_structures\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`entity_legal_structures_jurisdiction_idx\` ON \`entity_legal_structures\` (\`jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`entity_legal_structures_entity_type_idx\` ON \`entity_legal_structures\` (\`entity_type_id\`);`)
  await db.run(sql`CREATE INDEX \`entity_legal_structures_updated_at_idx\` ON \`entity_legal_structures\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`entity_legal_structures_created_at_idx\` ON \`entity_legal_structures\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__entity_legal_structures_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_jurisdiction_id\` text(36) NOT NULL,
  	\`version_entity_type_id\` text(36) NOT NULL,
  	\`version_local_name\` text NOT NULL,
  	\`version_abbreviation\` text,
  	\`version_description\` text,
  	\`version_regulatory_characteristics\` text,
  	\`version_governance_structure\` text,
  	\`version_tax_treatment\` text,
  	\`version_audit_requirement\` text,
  	\`version_is_active\` integer DEFAULT true,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`entity_legal_structures\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_jurisdiction_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_entity_type_id\`) REFERENCES \`entity_types\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__entity_legal_structures_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_jurisdiction_id", "version_entity_type_id", "version_local_name", "version_abbreviation", "version_description", "version_regulatory_characteristics", "version_governance_structure", "version_tax_treatment", "version_audit_requirement", "version_is_active", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_jurisdiction_id", "version_entity_type_id", "version_local_name", "version_abbreviation", "version_description", "version_regulatory_characteristics", "version_governance_structure", "version_tax_treatment", "version_audit_requirement", "version_is_active", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_entity_legal_structures_v\`;`)
  await db.run(sql`DROP TABLE \`_entity_legal_structures_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__entity_legal_structures_v\` RENAME TO \`_entity_legal_structures_v\`;`)
  await db.run(sql`CREATE INDEX \`_entity_legal_structures_v_parent_idx\` ON \`_entity_legal_structures_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_entity_legal_structures_v_version_version_uuid_idx\` ON \`_entity_legal_structures_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_entity_legal_structures_v_version_version_tenant_idx\` ON \`_entity_legal_structures_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_entity_legal_structures_v_version_version_jurisdiction_idx\` ON \`_entity_legal_structures_v\` (\`version_jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`_entity_legal_structures_v_version_version_entity_type_idx\` ON \`_entity_legal_structures_v\` (\`version_entity_type_id\`);`)
  await db.run(sql`CREATE INDEX \`_entity_legal_structures_v_version_version_updated_at_idx\` ON \`_entity_legal_structures_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_entity_legal_structures_v_version_version_created_at_idx\` ON \`_entity_legal_structures_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_entity_legal_structures_v_created_at_idx\` ON \`_entity_legal_structures_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_entity_legal_structures_v_updated_at_idx\` ON \`_entity_legal_structures_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_regulatory_reports\` (
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
  await db.run(sql`INSERT INTO \`__new_regulatory_reports\`("id", "uuid", "tenant_id", "grant_id", "entity_id", "report_name", "reporting_standard_id", "jurisdiction_id", "report_type", "fiscal_period_start", "fiscal_period_end", "due_date", "submission_date", "status", "report_document_id", "regulatory_feedback", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "grant_id", "entity_id", "report_name", "reporting_standard_id", "jurisdiction_id", "report_type", "fiscal_period_start", "fiscal_period_end", "due_date", "submission_date", "status", "report_document_id", "regulatory_feedback", "updated_at", "created_at" FROM \`regulatory_reports\`;`)
  await db.run(sql`DROP TABLE \`regulatory_reports\`;`)
  await db.run(sql`ALTER TABLE \`__new_regulatory_reports\` RENAME TO \`regulatory_reports\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`regulatory_reports_uuid_idx\` ON \`regulatory_reports\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_tenant_idx\` ON \`regulatory_reports\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_grant_idx\` ON \`regulatory_reports\` (\`grant_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_entity_idx\` ON \`regulatory_reports\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_reporting_standard_idx\` ON \`regulatory_reports\` (\`reporting_standard_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_jurisdiction_idx\` ON \`regulatory_reports\` (\`jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_report_document_idx\` ON \`regulatory_reports\` (\`report_document_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_updated_at_idx\` ON \`regulatory_reports\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_created_at_idx\` ON \`regulatory_reports\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__regulatory_reports_v\` (
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
  await db.run(sql`INSERT INTO \`__new__regulatory_reports_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_grant_id", "version_entity_id", "version_report_name", "version_reporting_standard_id", "version_jurisdiction_id", "version_report_type", "version_fiscal_period_start", "version_fiscal_period_end", "version_due_date", "version_submission_date", "version_status", "version_report_document_id", "version_regulatory_feedback", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_grant_id", "version_entity_id", "version_report_name", "version_reporting_standard_id", "version_jurisdiction_id", "version_report_type", "version_fiscal_period_start", "version_fiscal_period_end", "version_due_date", "version_submission_date", "version_status", "version_report_document_id", "version_regulatory_feedback", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_regulatory_reports_v\`;`)
  await db.run(sql`DROP TABLE \`_regulatory_reports_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__regulatory_reports_v\` RENAME TO \`_regulatory_reports_v\`;`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_parent_idx\` ON \`_regulatory_reports_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_uuid_idx\` ON \`_regulatory_reports_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_tenant_idx\` ON \`_regulatory_reports_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_grant_idx\` ON \`_regulatory_reports_v\` (\`version_grant_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_entity_idx\` ON \`_regulatory_reports_v\` (\`version_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_reporting_standard_idx\` ON \`_regulatory_reports_v\` (\`version_reporting_standard_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_jurisdiction_idx\` ON \`_regulatory_reports_v\` (\`version_jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_report_document_idx\` ON \`_regulatory_reports_v\` (\`version_report_document_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_updated_at_idx\` ON \`_regulatory_reports_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_created_at_idx\` ON \`_regulatory_reports_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_created_at_idx\` ON \`_regulatory_reports_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_updated_at_idx\` ON \`_regulatory_reports_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_reporting_standards\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`standard_name\` text NOT NULL,
  	\`standard_code\` text NOT NULL,
  	\`standard_type\` text NOT NULL,
  	\`jurisdiction_id\` text(36),
  	\`description\` text,
  	\`version\` text,
  	\`effective_date\` text NOT NULL,
  	\`reference_material_id\` text(36),
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`jurisdiction_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reference_material_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_reporting_standards\`("id", "uuid", "tenant_id", "standard_name", "standard_code", "standard_type", "jurisdiction_id", "description", "version", "effective_date", "reference_material_id", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "standard_name", "standard_code", "standard_type", "jurisdiction_id", "description", "version", "effective_date", "reference_material_id", "updated_at", "created_at" FROM \`reporting_standards\`;`)
  await db.run(sql`DROP TABLE \`reporting_standards\`;`)
  await db.run(sql`ALTER TABLE \`__new_reporting_standards\` RENAME TO \`reporting_standards\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`reporting_standards_uuid_idx\` ON \`reporting_standards\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_tenant_idx\` ON \`reporting_standards\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_jurisdiction_idx\` ON \`reporting_standards\` (\`jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_reference_material_idx\` ON \`reporting_standards\` (\`reference_material_id\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_updated_at_idx\` ON \`reporting_standards\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_created_at_idx\` ON \`reporting_standards\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__reporting_standards_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_standard_name\` text NOT NULL,
  	\`version_standard_code\` text NOT NULL,
  	\`version_standard_type\` text NOT NULL,
  	\`version_jurisdiction_id\` text(36),
  	\`version_description\` text,
  	\`version_version\` text,
  	\`version_effective_date\` text NOT NULL,
  	\`version_reference_material_id\` text(36),
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`reporting_standards\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_jurisdiction_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_reference_material_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__reporting_standards_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_standard_name", "version_standard_code", "version_standard_type", "version_jurisdiction_id", "version_description", "version_version", "version_effective_date", "version_reference_material_id", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_standard_name", "version_standard_code", "version_standard_type", "version_jurisdiction_id", "version_description", "version_version", "version_effective_date", "version_reference_material_id", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_reporting_standards_v\`;`)
  await db.run(sql`DROP TABLE \`_reporting_standards_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__reporting_standards_v\` RENAME TO \`_reporting_standards_v\`;`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_parent_idx\` ON \`_reporting_standards_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_version_version_uuid_idx\` ON \`_reporting_standards_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_version_version_tenant_idx\` ON \`_reporting_standards_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_version_version_jurisdiction_idx\` ON \`_reporting_standards_v\` (\`version_jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_version_version_reference_materia_idx\` ON \`_reporting_standards_v\` (\`version_reference_material_id\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_version_version_updated_at_idx\` ON \`_reporting_standards_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_version_version_created_at_idx\` ON \`_reporting_standards_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_created_at_idx\` ON \`_reporting_standards_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_updated_at_idx\` ON \`_reporting_standards_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_statutory_report_templates\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`template_name\` text NOT NULL,
  	\`jurisdiction_id\` text(36) NOT NULL,
  	\`report_type\` text NOT NULL,
  	\`entity_type_id\` text(36),
  	\`template_document_id\` text(36),
  	\`effective_from\` text NOT NULL,
  	\`effective_to\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`jurisdiction_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_type_id\`) REFERENCES \`entity_types\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`template_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_statutory_report_templates\`("id", "uuid", "tenant_id", "template_name", "jurisdiction_id", "report_type", "entity_type_id", "template_document_id", "effective_from", "effective_to", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "template_name", "jurisdiction_id", "report_type", "entity_type_id", "template_document_id", "effective_from", "effective_to", "updated_at", "created_at" FROM \`statutory_report_templates\`;`)
  await db.run(sql`DROP TABLE \`statutory_report_templates\`;`)
  await db.run(sql`ALTER TABLE \`__new_statutory_report_templates\` RENAME TO \`statutory_report_templates\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`statutory_report_templates_uuid_idx\` ON \`statutory_report_templates\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_tenant_idx\` ON \`statutory_report_templates\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_jurisdiction_idx\` ON \`statutory_report_templates\` (\`jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_entity_type_idx\` ON \`statutory_report_templates\` (\`entity_type_id\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_template_document_idx\` ON \`statutory_report_templates\` (\`template_document_id\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_updated_at_idx\` ON \`statutory_report_templates\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_created_at_idx\` ON \`statutory_report_templates\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__statutory_report_templates_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_template_name\` text NOT NULL,
  	\`version_jurisdiction_id\` text(36) NOT NULL,
  	\`version_report_type\` text NOT NULL,
  	\`version_entity_type_id\` text(36),
  	\`version_template_document_id\` text(36),
  	\`version_effective_from\` text NOT NULL,
  	\`version_effective_to\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`statutory_report_templates\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_jurisdiction_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_entity_type_id\`) REFERENCES \`entity_types\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_template_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__statutory_report_templates_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_template_name", "version_jurisdiction_id", "version_report_type", "version_entity_type_id", "version_template_document_id", "version_effective_from", "version_effective_to", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_template_name", "version_jurisdiction_id", "version_report_type", "version_entity_type_id", "version_template_document_id", "version_effective_from", "version_effective_to", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_statutory_report_templates_v\`;`)
  await db.run(sql`DROP TABLE \`_statutory_report_templates_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__statutory_report_templates_v\` RENAME TO \`_statutory_report_templates_v\`;`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_parent_idx\` ON \`_statutory_report_templates_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_version_uuid_idx\` ON \`_statutory_report_templates_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_version_tenant_idx\` ON \`_statutory_report_templates_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_version_jurisdicti_idx\` ON \`_statutory_report_templates_v\` (\`version_jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_version_entity_typ_idx\` ON \`_statutory_report_templates_v\` (\`version_entity_type_id\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_version_template_d_idx\` ON \`_statutory_report_templates_v\` (\`version_template_document_id\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_version_updated_at_idx\` ON \`_statutory_report_templates_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_version_created_at_idx\` ON \`_statutory_report_templates_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_created_at_idx\` ON \`_statutory_report_templates_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_updated_at_idx\` ON \`_statutory_report_templates_v\` (\`updated_at\`);`)
  await db.run(sql`ALTER TABLE \`tax_jurisdictions\` ADD \`geography_iso3_code\` text;`)
  await db.run(sql`ALTER TABLE \`tax_jurisdictions\` ADD \`parent_jurisdiction_id\` text(36) REFERENCES tax_jurisdictions(id);`)
  await db.run(sql`ALTER TABLE \`tax_jurisdictions\` ADD \`regulatory_characteristics\` text;`)
  await db.run(sql`ALTER TABLE \`tax_jurisdictions\` ADD \`banking_requirements\` text;`)
  await db.run(sql`ALTER TABLE \`tax_jurisdictions\` ADD \`is_active\` integer DEFAULT true;`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_parent_jurisdiction_idx\` ON \`tax_jurisdictions\` (\`parent_jurisdiction_id\`);`)
  await db.run(sql`ALTER TABLE \`_tax_jurisdictions_v\` ADD \`version_geography_iso3_code\` text;`)
  await db.run(sql`ALTER TABLE \`_tax_jurisdictions_v\` ADD \`version_parent_jurisdiction_id\` text(36) REFERENCES tax_jurisdictions(id);`)
  await db.run(sql`ALTER TABLE \`_tax_jurisdictions_v\` ADD \`version_regulatory_characteristics\` text;`)
  await db.run(sql`ALTER TABLE \`_tax_jurisdictions_v\` ADD \`version_banking_requirements\` text;`)
  await db.run(sql`ALTER TABLE \`_tax_jurisdictions_v\` ADD \`version_is_active\` integer DEFAULT true;`)
  await db.run(sql`CREATE INDEX \`_tax_jurisdictions_v_version_version_parent_jurisdiction_idx\` ON \`_tax_jurisdictions_v\` (\`version_parent_jurisdiction_id\`);`)
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`e6b390099a5c88994b32617396728b9d1\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`language_code\` text NOT NULL,
  	\`language_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e6b390099a5c88994b32617396728b9d1_order_idx\` ON \`e6b390099a5c88994b32617396728b9d1\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e6b390099a5c88994b32617396728b9d1_parent_id_idx\` ON \`e6b390099a5c88994b32617396728b9d1\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e6eb48eceb528889a8621e1cf37bbe038\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`filing_type\` text NOT NULL,
  	\`deadline\` text NOT NULL,
  	\`frequency\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e6eb48eceb528889a8621e1cf37bbe038_order_idx\` ON \`e6eb48eceb528889a8621e1cf37bbe038\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e6eb48eceb528889a8621e1cf37bbe038_parent_id_idx\` ON \`e6eb48eceb528889a8621e1cf37bbe038\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`taxing_jurisdictions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`code\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`type\` text NOT NULL,
  	\`parent_jurisdiction_id\` text(36),
  	\`iso2_code\` text,
  	\`iso3_code\` text,
  	\`primary_currency\` text,
  	\`regulatory_characteristics\` text,
  	\`banking_requirements\` text,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_jurisdiction_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`taxing_jurisdictions_uuid_idx\` ON \`taxing_jurisdictions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`taxing_jurisdictions_tenant_idx\` ON \`taxing_jurisdictions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`taxing_jurisdictions_code_idx\` ON \`taxing_jurisdictions\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`taxing_jurisdictions_parent_jurisdiction_idx\` ON \`taxing_jurisdictions\` (\`parent_jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`taxing_jurisdictions_updated_at_idx\` ON \`taxing_jurisdictions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`taxing_jurisdictions_created_at_idx\` ON \`taxing_jurisdictions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`taxing_jurisdictions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`compliance_frameworks_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_frameworks_id\`) REFERENCES \`compliance_frameworks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`taxing_jurisdictions_rels_order_idx\` ON \`taxing_jurisdictions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`taxing_jurisdictions_rels_parent_idx\` ON \`taxing_jurisdictions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`taxing_jurisdictions_rels_path_idx\` ON \`taxing_jurisdictions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`taxing_jurisdictions_rels_compliance_frameworks_id_idx\` ON \`taxing_jurisdictions_rels\` (\`compliance_frameworks_id\`);`)
  await db.run(sql`CREATE TABLE \`_e6b390099a5c88994b32617396728b9d1_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`language_code\` text NOT NULL,
  	\`language_name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_taxing_jurisdictions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e6b390099a5c88994b32617396728b9d1_v_order_idx\` ON \`_e6b390099a5c88994b32617396728b9d1_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e6b390099a5c88994b32617396728b9d1_v_parent_id_idx\` ON \`_e6b390099a5c88994b32617396728b9d1_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e6eb48eceb528889a8621e1cf37bbe038_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`filing_type\` text NOT NULL,
  	\`deadline\` text NOT NULL,
  	\`frequency\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_taxing_jurisdictions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e6eb48eceb528889a8621e1cf37bbe038_v_order_idx\` ON \`_e6eb48eceb528889a8621e1cf37bbe038_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e6eb48eceb528889a8621e1cf37bbe038_v_parent_id_idx\` ON \`_e6eb48eceb528889a8621e1cf37bbe038_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_taxing_jurisdictions_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_code\` text NOT NULL,
  	\`version_name\` text NOT NULL,
  	\`version_type\` text NOT NULL,
  	\`version_parent_jurisdiction_id\` text(36),
  	\`version_iso2_code\` text,
  	\`version_iso3_code\` text,
  	\`version_primary_currency\` text,
  	\`version_regulatory_characteristics\` text,
  	\`version_banking_requirements\` text,
  	\`version_is_active\` integer DEFAULT true,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parent_jurisdiction_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_taxing_jurisdictions_v_parent_idx\` ON \`_taxing_jurisdictions_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_taxing_jurisdictions_v_version_version_uuid_idx\` ON \`_taxing_jurisdictions_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_taxing_jurisdictions_v_version_version_tenant_idx\` ON \`_taxing_jurisdictions_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_taxing_jurisdictions_v_version_version_code_idx\` ON \`_taxing_jurisdictions_v\` (\`version_code\`);`)
  await db.run(sql`CREATE INDEX \`_taxing_jurisdictions_v_version_version_parent_jurisdict_idx\` ON \`_taxing_jurisdictions_v\` (\`version_parent_jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`_taxing_jurisdictions_v_version_version_updated_at_idx\` ON \`_taxing_jurisdictions_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_taxing_jurisdictions_v_version_version_created_at_idx\` ON \`_taxing_jurisdictions_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_taxing_jurisdictions_v_created_at_idx\` ON \`_taxing_jurisdictions_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_taxing_jurisdictions_v_updated_at_idx\` ON \`_taxing_jurisdictions_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_taxing_jurisdictions_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`compliance_frameworks_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_taxing_jurisdictions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_frameworks_id\`) REFERENCES \`compliance_frameworks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_taxing_jurisdictions_v_rels_order_idx\` ON \`_taxing_jurisdictions_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_taxing_jurisdictions_v_rels_parent_idx\` ON \`_taxing_jurisdictions_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_taxing_jurisdictions_v_rels_path_idx\` ON \`_taxing_jurisdictions_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_taxing_jurisdictions_v_rels_compliance_frameworks_id_idx\` ON \`_taxing_jurisdictions_v_rels\` (\`compliance_frameworks_id\`);`)
  await db.run(sql`DROP TABLE \`e8ace94baac3a8fadab2c2813fa5e353c\`;`)
  await db.run(sql`DROP TABLE \`eb0ad1d8388688f31ad72a311eb768c1d\`;`)
  await db.run(sql`DROP TABLE \`tax_jurisdictions_rels\`;`)
  await db.run(sql`DROP TABLE \`_e8ace94baac3a8fadab2c2813fa5e353c_v\`;`)
  await db.run(sql`DROP TABLE \`_eb0ad1d8388688f31ad72a311eb768c1d_v\`;`)
  await db.run(sql`DROP TABLE \`_tax_jurisdictions_v_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_compliance_deadlines\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`entity_id\` text(36) NOT NULL,
  	\`deadline_name\` text NOT NULL,
  	\`deadline_type\` text NOT NULL,
  	\`jurisdiction_id\` text(36),
  	\`requirement_id\` text(36),
  	\`due_date\` text NOT NULL,
  	\`submission_date\` text,
  	\`status\` text DEFAULT 'on-track',
  	\`priority\` text,
  	\`penalty\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`jurisdiction_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`requirement_id\`) REFERENCES \`compliance_requirements\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_compliance_deadlines\`("id", "uuid", "tenant_id", "entity_id", "deadline_name", "deadline_type", "jurisdiction_id", "requirement_id", "due_date", "submission_date", "status", "priority", "penalty", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "entity_id", "deadline_name", "deadline_type", "jurisdiction_id", "requirement_id", "due_date", "submission_date", "status", "priority", "penalty", "updated_at", "created_at" FROM \`compliance_deadlines\`;`)
  await db.run(sql`DROP TABLE \`compliance_deadlines\`;`)
  await db.run(sql`ALTER TABLE \`__new_compliance_deadlines\` RENAME TO \`compliance_deadlines\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`compliance_deadlines_uuid_idx\` ON \`compliance_deadlines\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_tenant_idx\` ON \`compliance_deadlines\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_entity_idx\` ON \`compliance_deadlines\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_jurisdiction_idx\` ON \`compliance_deadlines\` (\`jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_requirement_idx\` ON \`compliance_deadlines\` (\`requirement_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_updated_at_idx\` ON \`compliance_deadlines\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_created_at_idx\` ON \`compliance_deadlines\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__compliance_deadlines_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_entity_id\` text(36) NOT NULL,
  	\`version_deadline_name\` text NOT NULL,
  	\`version_deadline_type\` text NOT NULL,
  	\`version_jurisdiction_id\` text(36),
  	\`version_requirement_id\` text(36),
  	\`version_due_date\` text NOT NULL,
  	\`version_submission_date\` text,
  	\`version_status\` text DEFAULT 'on-track',
  	\`version_priority\` text,
  	\`version_penalty\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`compliance_deadlines\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_jurisdiction_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_requirement_id\`) REFERENCES \`compliance_requirements\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__compliance_deadlines_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_entity_id", "version_deadline_name", "version_deadline_type", "version_jurisdiction_id", "version_requirement_id", "version_due_date", "version_submission_date", "version_status", "version_priority", "version_penalty", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_entity_id", "version_deadline_name", "version_deadline_type", "version_jurisdiction_id", "version_requirement_id", "version_due_date", "version_submission_date", "version_status", "version_priority", "version_penalty", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_compliance_deadlines_v\`;`)
  await db.run(sql`DROP TABLE \`_compliance_deadlines_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__compliance_deadlines_v\` RENAME TO \`_compliance_deadlines_v\`;`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_parent_idx\` ON \`_compliance_deadlines_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_version_uuid_idx\` ON \`_compliance_deadlines_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_version_tenant_idx\` ON \`_compliance_deadlines_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_version_entity_idx\` ON \`_compliance_deadlines_v\` (\`version_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_version_jurisdiction_idx\` ON \`_compliance_deadlines_v\` (\`version_jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_version_requirement_idx\` ON \`_compliance_deadlines_v\` (\`version_requirement_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_version_updated_at_idx\` ON \`_compliance_deadlines_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_version_version_created_at_idx\` ON \`_compliance_deadlines_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_created_at_idx\` ON \`_compliance_deadlines_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_updated_at_idx\` ON \`_compliance_deadlines_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_entity_legal_structures\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`jurisdiction_id\` text(36) NOT NULL,
  	\`entity_type_id\` text(36) NOT NULL,
  	\`local_name\` text NOT NULL,
  	\`abbreviation\` text,
  	\`description\` text,
  	\`regulatory_characteristics\` text,
  	\`governance_structure\` text,
  	\`tax_treatment\` text,
  	\`audit_requirement\` text,
  	\`is_active\` integer DEFAULT true,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`jurisdiction_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_type_id\`) REFERENCES \`entity_types\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_entity_legal_structures\`("id", "uuid", "tenant_id", "jurisdiction_id", "entity_type_id", "local_name", "abbreviation", "description", "regulatory_characteristics", "governance_structure", "tax_treatment", "audit_requirement", "is_active", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "jurisdiction_id", "entity_type_id", "local_name", "abbreviation", "description", "regulatory_characteristics", "governance_structure", "tax_treatment", "audit_requirement", "is_active", "updated_at", "created_at" FROM \`entity_legal_structures\`;`)
  await db.run(sql`DROP TABLE \`entity_legal_structures\`;`)
  await db.run(sql`ALTER TABLE \`__new_entity_legal_structures\` RENAME TO \`entity_legal_structures\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`entity_legal_structures_uuid_idx\` ON \`entity_legal_structures\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`entity_legal_structures_tenant_idx\` ON \`entity_legal_structures\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`entity_legal_structures_jurisdiction_idx\` ON \`entity_legal_structures\` (\`jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`entity_legal_structures_entity_type_idx\` ON \`entity_legal_structures\` (\`entity_type_id\`);`)
  await db.run(sql`CREATE INDEX \`entity_legal_structures_updated_at_idx\` ON \`entity_legal_structures\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`entity_legal_structures_created_at_idx\` ON \`entity_legal_structures\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__entity_legal_structures_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_jurisdiction_id\` text(36) NOT NULL,
  	\`version_entity_type_id\` text(36) NOT NULL,
  	\`version_local_name\` text NOT NULL,
  	\`version_abbreviation\` text,
  	\`version_description\` text,
  	\`version_regulatory_characteristics\` text,
  	\`version_governance_structure\` text,
  	\`version_tax_treatment\` text,
  	\`version_audit_requirement\` text,
  	\`version_is_active\` integer DEFAULT true,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`entity_legal_structures\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_jurisdiction_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_entity_type_id\`) REFERENCES \`entity_types\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__entity_legal_structures_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_jurisdiction_id", "version_entity_type_id", "version_local_name", "version_abbreviation", "version_description", "version_regulatory_characteristics", "version_governance_structure", "version_tax_treatment", "version_audit_requirement", "version_is_active", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_jurisdiction_id", "version_entity_type_id", "version_local_name", "version_abbreviation", "version_description", "version_regulatory_characteristics", "version_governance_structure", "version_tax_treatment", "version_audit_requirement", "version_is_active", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_entity_legal_structures_v\`;`)
  await db.run(sql`DROP TABLE \`_entity_legal_structures_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__entity_legal_structures_v\` RENAME TO \`_entity_legal_structures_v\`;`)
  await db.run(sql`CREATE INDEX \`_entity_legal_structures_v_parent_idx\` ON \`_entity_legal_structures_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_entity_legal_structures_v_version_version_uuid_idx\` ON \`_entity_legal_structures_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_entity_legal_structures_v_version_version_tenant_idx\` ON \`_entity_legal_structures_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_entity_legal_structures_v_version_version_jurisdiction_idx\` ON \`_entity_legal_structures_v\` (\`version_jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`_entity_legal_structures_v_version_version_entity_type_idx\` ON \`_entity_legal_structures_v\` (\`version_entity_type_id\`);`)
  await db.run(sql`CREATE INDEX \`_entity_legal_structures_v_version_version_updated_at_idx\` ON \`_entity_legal_structures_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_entity_legal_structures_v_version_version_created_at_idx\` ON \`_entity_legal_structures_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_entity_legal_structures_v_created_at_idx\` ON \`_entity_legal_structures_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_entity_legal_structures_v_updated_at_idx\` ON \`_entity_legal_structures_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_regulatory_reports\` (
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
  	FOREIGN KEY (\`jurisdiction_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`report_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_regulatory_reports\`("id", "uuid", "tenant_id", "grant_id", "entity_id", "report_name", "reporting_standard_id", "jurisdiction_id", "report_type", "fiscal_period_start", "fiscal_period_end", "due_date", "submission_date", "status", "report_document_id", "regulatory_feedback", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "grant_id", "entity_id", "report_name", "reporting_standard_id", "jurisdiction_id", "report_type", "fiscal_period_start", "fiscal_period_end", "due_date", "submission_date", "status", "report_document_id", "regulatory_feedback", "updated_at", "created_at" FROM \`regulatory_reports\`;`)
  await db.run(sql`DROP TABLE \`regulatory_reports\`;`)
  await db.run(sql`ALTER TABLE \`__new_regulatory_reports\` RENAME TO \`regulatory_reports\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`regulatory_reports_uuid_idx\` ON \`regulatory_reports\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_tenant_idx\` ON \`regulatory_reports\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_grant_idx\` ON \`regulatory_reports\` (\`grant_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_entity_idx\` ON \`regulatory_reports\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_reporting_standard_idx\` ON \`regulatory_reports\` (\`reporting_standard_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_jurisdiction_idx\` ON \`regulatory_reports\` (\`jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_report_document_idx\` ON \`regulatory_reports\` (\`report_document_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_updated_at_idx\` ON \`regulatory_reports\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_created_at_idx\` ON \`regulatory_reports\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__regulatory_reports_v\` (
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
  	FOREIGN KEY (\`version_jurisdiction_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_report_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__regulatory_reports_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_grant_id", "version_entity_id", "version_report_name", "version_reporting_standard_id", "version_jurisdiction_id", "version_report_type", "version_fiscal_period_start", "version_fiscal_period_end", "version_due_date", "version_submission_date", "version_status", "version_report_document_id", "version_regulatory_feedback", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_grant_id", "version_entity_id", "version_report_name", "version_reporting_standard_id", "version_jurisdiction_id", "version_report_type", "version_fiscal_period_start", "version_fiscal_period_end", "version_due_date", "version_submission_date", "version_status", "version_report_document_id", "version_regulatory_feedback", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_regulatory_reports_v\`;`)
  await db.run(sql`DROP TABLE \`_regulatory_reports_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__regulatory_reports_v\` RENAME TO \`_regulatory_reports_v\`;`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_parent_idx\` ON \`_regulatory_reports_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_uuid_idx\` ON \`_regulatory_reports_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_tenant_idx\` ON \`_regulatory_reports_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_grant_idx\` ON \`_regulatory_reports_v\` (\`version_grant_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_entity_idx\` ON \`_regulatory_reports_v\` (\`version_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_reporting_standard_idx\` ON \`_regulatory_reports_v\` (\`version_reporting_standard_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_jurisdiction_idx\` ON \`_regulatory_reports_v\` (\`version_jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_report_document_idx\` ON \`_regulatory_reports_v\` (\`version_report_document_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_updated_at_idx\` ON \`_regulatory_reports_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_version_version_created_at_idx\` ON \`_regulatory_reports_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_created_at_idx\` ON \`_regulatory_reports_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_updated_at_idx\` ON \`_regulatory_reports_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_reporting_standards\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`standard_name\` text NOT NULL,
  	\`standard_code\` text NOT NULL,
  	\`standard_type\` text NOT NULL,
  	\`jurisdiction_id\` text(36),
  	\`description\` text,
  	\`version\` text,
  	\`effective_date\` text NOT NULL,
  	\`reference_material_id\` text(36),
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`jurisdiction_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reference_material_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_reporting_standards\`("id", "uuid", "tenant_id", "standard_name", "standard_code", "standard_type", "jurisdiction_id", "description", "version", "effective_date", "reference_material_id", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "standard_name", "standard_code", "standard_type", "jurisdiction_id", "description", "version", "effective_date", "reference_material_id", "updated_at", "created_at" FROM \`reporting_standards\`;`)
  await db.run(sql`DROP TABLE \`reporting_standards\`;`)
  await db.run(sql`ALTER TABLE \`__new_reporting_standards\` RENAME TO \`reporting_standards\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`reporting_standards_uuid_idx\` ON \`reporting_standards\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_tenant_idx\` ON \`reporting_standards\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_jurisdiction_idx\` ON \`reporting_standards\` (\`jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_reference_material_idx\` ON \`reporting_standards\` (\`reference_material_id\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_updated_at_idx\` ON \`reporting_standards\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_created_at_idx\` ON \`reporting_standards\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__reporting_standards_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_standard_name\` text NOT NULL,
  	\`version_standard_code\` text NOT NULL,
  	\`version_standard_type\` text NOT NULL,
  	\`version_jurisdiction_id\` text(36),
  	\`version_description\` text,
  	\`version_version\` text,
  	\`version_effective_date\` text NOT NULL,
  	\`version_reference_material_id\` text(36),
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`reporting_standards\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_jurisdiction_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_reference_material_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__reporting_standards_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_standard_name", "version_standard_code", "version_standard_type", "version_jurisdiction_id", "version_description", "version_version", "version_effective_date", "version_reference_material_id", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_standard_name", "version_standard_code", "version_standard_type", "version_jurisdiction_id", "version_description", "version_version", "version_effective_date", "version_reference_material_id", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_reporting_standards_v\`;`)
  await db.run(sql`DROP TABLE \`_reporting_standards_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__reporting_standards_v\` RENAME TO \`_reporting_standards_v\`;`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_parent_idx\` ON \`_reporting_standards_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_version_version_uuid_idx\` ON \`_reporting_standards_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_version_version_tenant_idx\` ON \`_reporting_standards_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_version_version_jurisdiction_idx\` ON \`_reporting_standards_v\` (\`version_jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_version_version_reference_materia_idx\` ON \`_reporting_standards_v\` (\`version_reference_material_id\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_version_version_updated_at_idx\` ON \`_reporting_standards_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_version_version_created_at_idx\` ON \`_reporting_standards_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_created_at_idx\` ON \`_reporting_standards_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_updated_at_idx\` ON \`_reporting_standards_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_statutory_report_templates\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`template_name\` text NOT NULL,
  	\`jurisdiction_id\` text(36) NOT NULL,
  	\`report_type\` text NOT NULL,
  	\`entity_type_id\` text(36),
  	\`template_document_id\` text(36),
  	\`effective_from\` text NOT NULL,
  	\`effective_to\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`jurisdiction_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_type_id\`) REFERENCES \`entity_types\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`template_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_statutory_report_templates\`("id", "uuid", "tenant_id", "template_name", "jurisdiction_id", "report_type", "entity_type_id", "template_document_id", "effective_from", "effective_to", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "template_name", "jurisdiction_id", "report_type", "entity_type_id", "template_document_id", "effective_from", "effective_to", "updated_at", "created_at" FROM \`statutory_report_templates\`;`)
  await db.run(sql`DROP TABLE \`statutory_report_templates\`;`)
  await db.run(sql`ALTER TABLE \`__new_statutory_report_templates\` RENAME TO \`statutory_report_templates\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`statutory_report_templates_uuid_idx\` ON \`statutory_report_templates\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_tenant_idx\` ON \`statutory_report_templates\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_jurisdiction_idx\` ON \`statutory_report_templates\` (\`jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_entity_type_idx\` ON \`statutory_report_templates\` (\`entity_type_id\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_template_document_idx\` ON \`statutory_report_templates\` (\`template_document_id\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_updated_at_idx\` ON \`statutory_report_templates\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_created_at_idx\` ON \`statutory_report_templates\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__statutory_report_templates_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_template_name\` text NOT NULL,
  	\`version_jurisdiction_id\` text(36) NOT NULL,
  	\`version_report_type\` text NOT NULL,
  	\`version_entity_type_id\` text(36),
  	\`version_template_document_id\` text(36),
  	\`version_effective_from\` text NOT NULL,
  	\`version_effective_to\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`statutory_report_templates\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_jurisdiction_id\`) REFERENCES \`taxing_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_entity_type_id\`) REFERENCES \`entity_types\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_template_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__statutory_report_templates_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_template_name", "version_jurisdiction_id", "version_report_type", "version_entity_type_id", "version_template_document_id", "version_effective_from", "version_effective_to", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_template_name", "version_jurisdiction_id", "version_report_type", "version_entity_type_id", "version_template_document_id", "version_effective_from", "version_effective_to", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_statutory_report_templates_v\`;`)
  await db.run(sql`DROP TABLE \`_statutory_report_templates_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__statutory_report_templates_v\` RENAME TO \`_statutory_report_templates_v\`;`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_parent_idx\` ON \`_statutory_report_templates_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_version_uuid_idx\` ON \`_statutory_report_templates_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_version_tenant_idx\` ON \`_statutory_report_templates_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_version_jurisdicti_idx\` ON \`_statutory_report_templates_v\` (\`version_jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_version_entity_typ_idx\` ON \`_statutory_report_templates_v\` (\`version_entity_type_id\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_version_template_d_idx\` ON \`_statutory_report_templates_v\` (\`version_template_document_id\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_version_updated_at_idx\` ON \`_statutory_report_templates_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_version_version_created_at_idx\` ON \`_statutory_report_templates_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_created_at_idx\` ON \`_statutory_report_templates_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_updated_at_idx\` ON \`_statutory_report_templates_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_tax_jurisdictions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`code\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`authority_name\` text,
  	\`geography_country\` text NOT NULL,
  	\`geography_region\` text,
  	\`geography_level\` text DEFAULT 'national' NOT NULL,
  	\`registration_registration_number\` text,
  	\`registration_registration_date\` text,
  	\`registration_deregistration_date\` text,
  	\`filing_filing_frequency\` text DEFAULT 'monthly',
  	\`filing_filing_due_day_of_month\` numeric,
  	\`filing_currency\` text DEFAULT 'EUR' NOT NULL,
  	\`notes_note\` text,
  	\`metadata\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_tax_jurisdictions\`("id", "uuid", "tenant_id", "code", "name", "authority_name", "geography_country", "geography_region", "geography_level", "registration_registration_number", "registration_registration_date", "registration_deregistration_date", "filing_filing_frequency", "filing_filing_due_day_of_month", "filing_currency", "notes_note", "metadata", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "code", "name", "authority_name", "geography_country", "geography_region", "geography_level", "registration_registration_number", "registration_registration_date", "registration_deregistration_date", "filing_filing_frequency", "filing_filing_due_day_of_month", "filing_currency", "notes_note", "metadata", "updated_at", "created_at" FROM \`tax_jurisdictions\`;`)
  await db.run(sql`DROP TABLE \`tax_jurisdictions\`;`)
  await db.run(sql`ALTER TABLE \`__new_tax_jurisdictions\` RENAME TO \`tax_jurisdictions\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tax_jurisdictions_uuid_idx\` ON \`tax_jurisdictions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_tenant_idx\` ON \`tax_jurisdictions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tax_jurisdictions_code_idx\` ON \`tax_jurisdictions\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_geography_geography_country_idx\` ON \`tax_jurisdictions\` (\`geography_country\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_geography_geography_region_idx\` ON \`tax_jurisdictions\` (\`geography_region\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_geography_geography_level_idx\` ON \`tax_jurisdictions\` (\`geography_level\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_registration_registration_registration_idx\` ON \`tax_jurisdictions\` (\`registration_registration_number\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_filing_filing_filing_frequency_idx\` ON \`tax_jurisdictions\` (\`filing_filing_frequency\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_updated_at_idx\` ON \`tax_jurisdictions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_created_at_idx\` ON \`tax_jurisdictions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__tax_jurisdictions_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_code\` text NOT NULL,
  	\`version_name\` text NOT NULL,
  	\`version_authority_name\` text,
  	\`version_geography_country\` text NOT NULL,
  	\`version_geography_region\` text,
  	\`version_geography_level\` text DEFAULT 'national' NOT NULL,
  	\`version_registration_registration_number\` text,
  	\`version_registration_registration_date\` text,
  	\`version_registration_deregistration_date\` text,
  	\`version_filing_filing_frequency\` text DEFAULT 'monthly',
  	\`version_filing_filing_due_day_of_month\` numeric,
  	\`version_filing_currency\` text DEFAULT 'EUR' NOT NULL,
  	\`version_notes_note\` text,
  	\`version_metadata\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__tax_jurisdictions_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_code", "version_name", "version_authority_name", "version_geography_country", "version_geography_region", "version_geography_level", "version_registration_registration_number", "version_registration_registration_date", "version_registration_deregistration_date", "version_filing_filing_frequency", "version_filing_filing_due_day_of_month", "version_filing_currency", "version_notes_note", "version_metadata", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_code", "version_name", "version_authority_name", "version_geography_country", "version_geography_region", "version_geography_level", "version_registration_registration_number", "version_registration_registration_date", "version_registration_deregistration_date", "version_filing_filing_frequency", "version_filing_filing_due_day_of_month", "version_filing_currency", "version_notes_note", "version_metadata", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_tax_jurisdictions_v\`;`)
  await db.run(sql`DROP TABLE \`_tax_jurisdictions_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__tax_jurisdictions_v\` RENAME TO \`_tax_jurisdictions_v\`;`)
  await db.run(sql`CREATE INDEX \`_tax_jurisdictions_v_parent_idx\` ON \`_tax_jurisdictions_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_tax_jurisdictions_v_version_version_uuid_idx\` ON \`_tax_jurisdictions_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_tax_jurisdictions_v_version_version_tenant_idx\` ON \`_tax_jurisdictions_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_tax_jurisdictions_v_version_version_code_idx\` ON \`_tax_jurisdictions_v\` (\`version_code\`);`)
  await db.run(sql`CREATE INDEX \`_tax_jurisdictions_v_version_geography_version_geography_idx\` ON \`_tax_jurisdictions_v\` (\`version_geography_country\`);`)
  await db.run(sql`CREATE INDEX \`_tax_jurisdictions_v_version_geography_version_geograp_1_idx\` ON \`_tax_jurisdictions_v\` (\`version_geography_region\`);`)
  await db.run(sql`CREATE INDEX \`_tax_jurisdictions_v_version_geography_version_geograp_2_idx\` ON \`_tax_jurisdictions_v\` (\`version_geography_level\`);`)
  await db.run(sql`CREATE INDEX \`_tax_jurisdictions_v_version_registration_version_regist_idx\` ON \`_tax_jurisdictions_v\` (\`version_registration_registration_number\`);`)
  await db.run(sql`CREATE INDEX \`_tax_jurisdictions_v_version_filing_version_filing_filin_idx\` ON \`_tax_jurisdictions_v\` (\`version_filing_filing_frequency\`);`)
  await db.run(sql`CREATE INDEX \`_tax_jurisdictions_v_version_version_updated_at_idx\` ON \`_tax_jurisdictions_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_tax_jurisdictions_v_version_version_created_at_idx\` ON \`_tax_jurisdictions_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_tax_jurisdictions_v_created_at_idx\` ON \`_tax_jurisdictions_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_tax_jurisdictions_v_updated_at_idx\` ON \`_tax_jurisdictions_v\` (\`updated_at\`);`)
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
}
