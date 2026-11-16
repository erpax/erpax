import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_document_details_internal_audit_cd02fb92\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`engagement_name\` text,
  	\`engagement_type\` text,
  	\`status\` text DEFAULT 'planned',
  	\`start_date\` text,
  	\`completion_date\` text,
  	\`report_issued\` integer DEFAULT false,
  	\`objective_scope\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_document_details_internal_audit_7730e62c\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_internal_audit_cd02fb92_order_idx\` ON \`pages_document_details_internal_audit_cd02fb92\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_internal_audit_cd02fb92_parent_id_idx\` ON \`pages_document_details_internal_audit_cd02fb92\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_document_details_internal_audit_880eef44\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`finding_reference\` text,
  	\`target_implementation_date\` text,
  	\`implementation_date\` text,
  	\`follow_up_status\` text DEFAULT 'not-started',
  	\`management_action\` text,
  	\`notes\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_document_details_internal_audit_7730e62c\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_internal_audit_880eef44_order_idx\` ON \`pages_document_details_internal_audit_880eef44\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_internal_audit_880eef44_parent_id_idx\` ON \`pages_document_details_internal_audit_880eef44\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_document_details_internal_audit_7730e62c\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`entity_id\` text(36),
  	\`reporting_line\` text,
  	\`audit_function_status\` text DEFAULT 'established',
  	\`chief_audit_executive\` text,
  	\`chief_audit_executive_contact\` text,
  	\`audit_committee_id\` text(36),
  	\`audit_staff_count\` numeric,
  	\`audit_budget\` numeric,
  	\`risk_based_auditing\` integer DEFAULT true,
  	\`audit_plan\` text,
  	\`audit_plan_year\` text,
  	\`audit_plan_approved_date\` text,
  	\`audit_plan_document_id\` text(36),
  	\`performance_metrics\` text,
  	\`quality_assurance\` text,
  	\`last_quality_review\` text,
  	\`next_quality_review\` text,
  	\`professional_standards\` text,
  	\`resource_adequacy\` text,
  	\`independence_and_objectivity\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`audit_committee_id\`) REFERENCES \`audit_committees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`audit_plan_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_internal_audit_7730e62c_order_idx\` ON \`pages_document_details_internal_audit_7730e62c\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_internal_audit_7730e62c_parent_id_idx\` ON \`pages_document_details_internal_audit_7730e62c\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_internal_audit_7730e62c_path_idx\` ON \`pages_document_details_internal_audit_7730e62c\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_internal_audit_7730e62c_entity_idx\` ON \`pages_document_details_internal_audit_7730e62c\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_internal_audit_7730e62c_audit_com_idx\` ON \`pages_document_details_internal_audit_7730e62c\` (\`audit_committee_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_internal_audit_7730e62c_audit_pla_idx\` ON \`pages_document_details_internal_audit_7730e62c\` (\`audit_plan_document_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_internal_audit_cd02fb92_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`engagement_name\` text,
  	\`engagement_type\` text,
  	\`status\` text DEFAULT 'planned',
  	\`start_date\` text,
  	\`completion_date\` text,
  	\`report_issued\` integer DEFAULT false,
  	\`objective_scope\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_document_details_internal_audit_7730e62c_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_internal_audit_cd02fb92_v_order_idx\` ON \`_pages_document_details_internal_audit_cd02fb92_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_internal_audit_cd02fb92_v_parent_id_idx\` ON \`_pages_document_details_internal_audit_cd02fb92_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_internal_audit_880eef44_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`finding_reference\` text,
  	\`target_implementation_date\` text,
  	\`implementation_date\` text,
  	\`follow_up_status\` text DEFAULT 'not-started',
  	\`management_action\` text,
  	\`notes\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_document_details_internal_audit_7730e62c_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_internal_audit_880eef44_v_order_idx\` ON \`_pages_document_details_internal_audit_880eef44_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_internal_audit_880eef44_v_parent_id_idx\` ON \`_pages_document_details_internal_audit_880eef44_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_internal_audit_7730e62c_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`entity_id\` text(36),
  	\`reporting_line\` text,
  	\`audit_function_status\` text DEFAULT 'established',
  	\`chief_audit_executive\` text,
  	\`chief_audit_executive_contact\` text,
  	\`audit_committee_id\` text(36),
  	\`audit_staff_count\` numeric,
  	\`audit_budget\` numeric,
  	\`risk_based_auditing\` integer DEFAULT true,
  	\`audit_plan\` text,
  	\`audit_plan_year\` text,
  	\`audit_plan_approved_date\` text,
  	\`audit_plan_document_id\` text(36),
  	\`performance_metrics\` text,
  	\`quality_assurance\` text,
  	\`last_quality_review\` text,
  	\`next_quality_review\` text,
  	\`professional_standards\` text,
  	\`resource_adequacy\` text,
  	\`independence_and_objectivity\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`audit_committee_id\`) REFERENCES \`audit_committees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`audit_plan_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_internal_audit_7730e62c_v_order_idx\` ON \`_pages_document_details_internal_audit_7730e62c_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_internal_audit_7730e62c_v_parent_id_idx\` ON \`_pages_document_details_internal_audit_7730e62c_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_internal_audit_7730e62c_v_path_idx\` ON \`_pages_document_details_internal_audit_7730e62c_v\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_internal_audit_7730e62c_v_entity_idx\` ON \`_pages_document_details_internal_audit_7730e62c_v\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_internal_audit_7730e62c_v_audit__idx\` ON \`_pages_document_details_internal_audit_7730e62c_v\` (\`audit_committee_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_internal_audit_7730e62c_v_audi_1_idx\` ON \`_pages_document_details_internal_audit_7730e62c_v\` (\`audit_plan_document_id\`);`)
  await db.run(sql`DROP TABLE \`internal_audit_function_audit_engageme_2ed33191\`;`)
  await db.run(sql`DROP TABLE \`internal_audit_function_follow_up_trac_a2509c33\`;`)
  await db.run(sql`DROP TABLE \`internal_audit_function\`;`)
  await db.run(sql`DROP TABLE \`internal_audit_function_rels\`;`)
  await db.run(sql`DROP TABLE \`_internal_audit_function_audit_engageme_2ed33191_v\`;`)
  await db.run(sql`DROP TABLE \`_internal_audit_function_follow_up_trac_a2509c33_v\`;`)
  await db.run(sql`DROP TABLE \`_internal_audit_function_v\`;`)
  await db.run(sql`DROP TABLE \`_internal_audit_function_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`pages_rels\` ADD \`audit_committee_minutes_id\` text(36) REFERENCES audit_committee_minutes(id);`)
  await db.run(sql`CREATE INDEX \`pages_rels_audit_committee_minutes_id_idx\` ON \`pages_rels\` (\`audit_committee_minutes_id\`,\`locale\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_rels\` ADD \`audit_committee_minutes_id\` text(36) REFERENCES audit_committee_minutes(id);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_audit_committee_minutes_id_idx\` ON \`_pages_v_rels\` (\`audit_committee_minutes_id\`,\`locale\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`internal_audit_function_audit_engageme_2ed33191\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`engagement_name\` text NOT NULL,
  	\`engagement_type\` text NOT NULL,
  	\`objective_scope\` text,
  	\`start_date\` text NOT NULL,
  	\`completion_date\` text,
  	\`status\` text DEFAULT 'planned',
  	\`report_issued\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`internal_audit_function\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`internal_audit_function_audit_engageme_2ed33191_order_idx\` ON \`internal_audit_function_audit_engageme_2ed33191\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_audit_engageme_2ed33191_parent_id_idx\` ON \`internal_audit_function_audit_engageme_2ed33191\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`internal_audit_function_follow_up_trac_a2509c33\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`finding_reference\` text NOT NULL,
  	\`management_action\` text NOT NULL,
  	\`target_implementation_date\` text NOT NULL,
  	\`implementation_date\` text,
  	\`follow_up_status\` text DEFAULT 'not-started',
  	\`notes\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`internal_audit_function\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`internal_audit_function_follow_up_trac_a2509c33_order_idx\` ON \`internal_audit_function_follow_up_trac_a2509c33\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_follow_up_trac_a2509c33_parent_id_idx\` ON \`internal_audit_function_follow_up_trac_a2509c33\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`internal_audit_function\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`entity_id\` text(36) NOT NULL,
  	\`function_name\` text NOT NULL,
  	\`audit_charter\` text NOT NULL,
  	\`charter_id\` text,
  	\`charter_approved_date\` text NOT NULL,
  	\`reporting_line\` text NOT NULL,
  	\`chief_audit_executive\` text NOT NULL,
  	\`chief_audit_executive_contact\` text,
  	\`audit_committee_id\` text(36),
  	\`audit_staff_count\` numeric,
  	\`audit_budget\` numeric,
  	\`audit_plan\` text,
  	\`audit_plan_year\` text,
  	\`audit_plan_approved_date\` text,
  	\`audit_plan_document_id\` text(36),
  	\`performance_metrics\` text,
  	\`quality_assurance\` text,
  	\`last_quality_review\` text,
  	\`next_quality_review\` text,
  	\`professional_standards\` text,
  	\`resource_adequacy\` text,
  	\`independence_and_objectivity\` text,
  	\`risk_based_auditing\` integer DEFAULT true,
  	\`audit_function_status\` text DEFAULT 'established' NOT NULL,
  	\`charter_document_id\` text(36),
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`audit_committee_id\`) REFERENCES \`audit_committees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`audit_plan_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`charter_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`internal_audit_function_uuid_idx\` ON \`internal_audit_function\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_tenant_idx\` ON \`internal_audit_function\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_entity_idx\` ON \`internal_audit_function\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_function_name_idx\` ON \`internal_audit_function\` (\`function_name\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_audit_committee_idx\` ON \`internal_audit_function\` (\`audit_committee_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_audit_plan_document_idx\` ON \`internal_audit_function\` (\`audit_plan_document_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_charter_document_idx\` ON \`internal_audit_function\` (\`charter_document_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_updated_at_idx\` ON \`internal_audit_function\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_created_at_idx\` ON \`internal_audit_function\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_charterId_idx\` ON \`internal_audit_function\` (\`tenant_id\`,\`charter_id\`);`)
  await db.run(sql`CREATE TABLE \`internal_audit_function_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_committee_minutes_id\` text(36),
  	\`audit_findings_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`internal_audit_function\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_committee_minutes_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`internal_audit_function_rels_order_idx\` ON \`internal_audit_function_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_rels_parent_idx\` ON \`internal_audit_function_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_rels_path_idx\` ON \`internal_audit_function_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_rels_audit_committee_minutes_id_idx\` ON \`internal_audit_function_rels\` (\`audit_committee_minutes_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_rels_audit_findings_id_idx\` ON \`internal_audit_function_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_rels_users_id_idx\` ON \`internal_audit_function_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_internal_audit_function_audit_engageme_2ed33191_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`engagement_name\` text NOT NULL,
  	\`engagement_type\` text NOT NULL,
  	\`objective_scope\` text,
  	\`start_date\` text NOT NULL,
  	\`completion_date\` text,
  	\`status\` text DEFAULT 'planned',
  	\`report_issued\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_internal_audit_function_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_audit_engageme_2ed33191_v_order_idx\` ON \`_internal_audit_function_audit_engageme_2ed33191_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_audit_engageme_2ed33191_v_parent_id_idx\` ON \`_internal_audit_function_audit_engageme_2ed33191_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_internal_audit_function_follow_up_trac_a2509c33_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`finding_reference\` text NOT NULL,
  	\`management_action\` text NOT NULL,
  	\`target_implementation_date\` text NOT NULL,
  	\`implementation_date\` text,
  	\`follow_up_status\` text DEFAULT 'not-started',
  	\`notes\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_internal_audit_function_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_follow_up_trac_a2509c33_v_order_idx\` ON \`_internal_audit_function_follow_up_trac_a2509c33_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_follow_up_trac_a2509c33_v_parent_id_idx\` ON \`_internal_audit_function_follow_up_trac_a2509c33_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_internal_audit_function_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_entity_id\` text(36) NOT NULL,
  	\`version_function_name\` text NOT NULL,
  	\`version_audit_charter\` text NOT NULL,
  	\`version_charter_id\` text,
  	\`version_charter_approved_date\` text NOT NULL,
  	\`version_reporting_line\` text NOT NULL,
  	\`version_chief_audit_executive\` text NOT NULL,
  	\`version_chief_audit_executive_contact\` text,
  	\`version_audit_committee_id\` text(36),
  	\`version_audit_staff_count\` numeric,
  	\`version_audit_budget\` numeric,
  	\`version_audit_plan\` text,
  	\`version_audit_plan_year\` text,
  	\`version_audit_plan_approved_date\` text,
  	\`version_audit_plan_document_id\` text(36),
  	\`version_performance_metrics\` text,
  	\`version_quality_assurance\` text,
  	\`version_last_quality_review\` text,
  	\`version_next_quality_review\` text,
  	\`version_professional_standards\` text,
  	\`version_resource_adequacy\` text,
  	\`version_independence_and_objectivity\` text,
  	\`version_risk_based_auditing\` integer DEFAULT true,
  	\`version_audit_function_status\` text DEFAULT 'established' NOT NULL,
  	\`version_charter_document_id\` text(36),
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`internal_audit_function\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_audit_committee_id\`) REFERENCES \`audit_committees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_audit_plan_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_charter_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_parent_idx\` ON \`_internal_audit_function_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_version_version_uuid_idx\` ON \`_internal_audit_function_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_version_version_tenant_idx\` ON \`_internal_audit_function_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_version_version_entity_idx\` ON \`_internal_audit_function_v\` (\`version_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_version_version_function_name_idx\` ON \`_internal_audit_function_v\` (\`version_function_name\`);`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_version_version_audit_committ_idx\` ON \`_internal_audit_function_v\` (\`version_audit_committee_id\`);`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_version_version_audit_plan_do_idx\` ON \`_internal_audit_function_v\` (\`version_audit_plan_document_id\`);`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_version_version_charter_docum_idx\` ON \`_internal_audit_function_v\` (\`version_charter_document_id\`);`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_version_version_updated_at_idx\` ON \`_internal_audit_function_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_version_version_created_at_idx\` ON \`_internal_audit_function_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_created_at_idx\` ON \`_internal_audit_function_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_updated_at_idx\` ON \`_internal_audit_function_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_charterId_idx\` ON \`_internal_audit_function_v\` (\`version_tenant_id\`,\`version_charter_id\`);`)
  await db.run(sql`CREATE TABLE \`_internal_audit_function_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_committee_minutes_id\` text(36),
  	\`audit_findings_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_internal_audit_function_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_committee_minutes_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_rels_order_idx\` ON \`_internal_audit_function_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_rels_parent_idx\` ON \`_internal_audit_function_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_rels_path_idx\` ON \`_internal_audit_function_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_rels_audit_committee_minutes__idx\` ON \`_internal_audit_function_v_rels\` (\`audit_committee_minutes_id\`);`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_rels_audit_findings_id_idx\` ON \`_internal_audit_function_v_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_rels_users_id_idx\` ON \`_internal_audit_function_v_rels\` (\`users_id\`);`)
  await db.run(sql`DROP TABLE \`pages_document_details_internal_audit_cd02fb92\`;`)
  await db.run(sql`DROP TABLE \`pages_document_details_internal_audit_880eef44\`;`)
  await db.run(sql`DROP TABLE \`pages_document_details_internal_audit_7730e62c\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_internal_audit_cd02fb92_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_internal_audit_880eef44_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_internal_audit_7730e62c_v\`;`)
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
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_rels\`("id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "audit_findings_id", "users_id") SELECT "id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "audit_findings_id", "users_id" FROM \`pages_rels\`;`)
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
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_rels\`("id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "audit_findings_id", "users_id") SELECT "id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "audit_findings_id", "users_id" FROM \`_pages_v_rels\`;`)
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
  await db.run(sql`CREATE INDEX \`_pages_v_rels_users_id_idx\` ON \`_pages_v_rels\` (\`users_id\`,\`locale\`);`)
}
