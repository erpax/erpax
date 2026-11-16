import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_document_details_icfr_assessment_60571ac4\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`name\` text,
  	\`signature_date\` text,
  	\`signature_document_id\` text(36),
  	FOREIGN KEY (\`signature_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_icfr_assessment\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_icfr_assessment_60571ac4_order_idx\` ON \`pages_document_details_icfr_assessment_60571ac4\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_icfr_assessment_60571ac4_parent_id_idx\` ON \`pages_document_details_icfr_assessment_60571ac4\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_icfr_assessment_60571ac4_signatur_idx\` ON \`pages_document_details_icfr_assessment_60571ac4\` (\`signature_document_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_icfr_assessment\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`entity_id\` text(36),
  	\`control_framework\` text,
  	\`status\` text DEFAULT 'draft',
  	\`control_environment_assessment\` text,
  	\`risk_assessment_assessment\` text,
  	\`control_activities_assessment\` text,
  	\`information_communication_assessment\` text,
  	\`monitoring_assessment\` text,
  	\`significant_deficiencies_identified\` integer DEFAULT false,
  	\`material_weaknesses_identified\` integer DEFAULT false,
  	\`deficiency_details\` text,
  	\`remediation_actions\` text,
  	\`conclusion_statement\` text,
  	\`management_acknowledgment\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_icfr_assessment_order_idx\` ON \`pages_blocks_icfr_assessment\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_icfr_assessment_parent_id_idx\` ON \`pages_blocks_icfr_assessment\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_icfr_assessment_path_idx\` ON \`pages_blocks_icfr_assessment\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_icfr_assessment_entity_idx\` ON \`pages_blocks_icfr_assessment\` (\`entity_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_icfr_assessment_60571ac4_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`name\` text,
  	\`signature_date\` text,
  	\`signature_document_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`signature_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_icfr_assessment\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_icfr_assessment_60571ac4_v_order_idx\` ON \`_pages_document_details_icfr_assessment_60571ac4_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_icfr_assessment_60571ac4_v_parent_id_idx\` ON \`_pages_document_details_icfr_assessment_60571ac4_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_icfr_assessment_60571ac4_v_signa_idx\` ON \`_pages_document_details_icfr_assessment_60571ac4_v\` (\`signature_document_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_icfr_assessment\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`entity_id\` text(36),
  	\`control_framework\` text,
  	\`status\` text DEFAULT 'draft',
  	\`control_environment_assessment\` text,
  	\`risk_assessment_assessment\` text,
  	\`control_activities_assessment\` text,
  	\`information_communication_assessment\` text,
  	\`monitoring_assessment\` text,
  	\`significant_deficiencies_identified\` integer DEFAULT false,
  	\`material_weaknesses_identified\` integer DEFAULT false,
  	\`deficiency_details\` text,
  	\`remediation_actions\` text,
  	\`conclusion_statement\` text,
  	\`management_acknowledgment\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_icfr_assessment_order_idx\` ON \`_pages_v_blocks_icfr_assessment\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_icfr_assessment_parent_id_idx\` ON \`_pages_v_blocks_icfr_assessment\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_icfr_assessment_path_idx\` ON \`_pages_v_blocks_icfr_assessment\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_icfr_assessment_entity_idx\` ON \`_pages_v_blocks_icfr_assessment\` (\`entity_id\`);`)
  await db.run(sql`DROP TABLE \`management_assessment_icfr_certifying_7b6d5ba2\`;`)
  await db.run(sql`DROP TABLE \`management_assessment_icfr\`;`)
  await db.run(sql`DROP TABLE \`management_assessment_icfr_rels\`;`)
  await db.run(sql`DROP TABLE \`_management_assessment_icfr_certifying_7b6d5ba2_v\`;`)
  await db.run(sql`DROP TABLE \`_management_assessment_icfr_v\`;`)
  await db.run(sql`DROP TABLE \`_management_assessment_icfr_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`pages_rels\` ADD \`control_tests_id\` text(36) REFERENCES control_tests(id);`)
  await db.run(sql`CREATE INDEX \`pages_rels_control_tests_id_idx\` ON \`pages_rels\` (\`control_tests_id\`,\`locale\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_rels\` ADD \`control_tests_id\` text(36) REFERENCES control_tests(id);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_control_tests_id_idx\` ON \`_pages_v_rels\` (\`control_tests_id\`,\`locale\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`management_assessment_icfr_certifying_7b6d5ba2\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`signature_date\` text NOT NULL,
  	\`signature_document_id\` text(36),
  	FOREIGN KEY (\`signature_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`management_assessment_icfr\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_certifying_7b6d5ba2_order_idx\` ON \`management_assessment_icfr_certifying_7b6d5ba2\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_certifying_7b6d5ba2_parent_id_idx\` ON \`management_assessment_icfr_certifying_7b6d5ba2\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_certifying_7b6d5ba2_signature_idx\` ON \`management_assessment_icfr_certifying_7b6d5ba2\` (\`signature_document_id\`);`)
  await db.run(sql`CREATE TABLE \`management_assessment_icfr\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`entity_id\` text(36) NOT NULL,
  	\`assessment_period\` text NOT NULL,
  	\`assessment_date\` text NOT NULL,
  	\`scope\` text NOT NULL,
  	\`control_framework\` text NOT NULL,
  	\`control_environment_assessment\` text NOT NULL,
  	\`risk_assessment_assessment\` text NOT NULL,
  	\`control_activities_assessment\` text NOT NULL,
  	\`information_communication_assessment\` text NOT NULL,
  	\`monitoring_assessment\` text NOT NULL,
  	\`significant_deficiencies_identified\` integer DEFAULT false,
  	\`material_weaknesses_identified\` integer DEFAULT false,
  	\`deficiency_details\` text,
  	\`remediation_actions\` text,
  	\`conclusion_statement\` text NOT NULL,
  	\`management_acknowledgment\` text NOT NULL,
  	\`attestation_document_id\` text(36),
  	\`status\` text DEFAULT 'draft' NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`attestation_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`management_assessment_icfr_uuid_idx\` ON \`management_assessment_icfr\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_tenant_idx\` ON \`management_assessment_icfr\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_entity_idx\` ON \`management_assessment_icfr\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_assessment_period_idx\` ON \`management_assessment_icfr\` (\`assessment_period\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_attestation_document_idx\` ON \`management_assessment_icfr\` (\`attestation_document_id\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_updated_at_idx\` ON \`management_assessment_icfr\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_created_at_idx\` ON \`management_assessment_icfr\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`management_assessment_icfr_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_findings_id\` text(36),
  	\`control_tests_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`management_assessment_icfr\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`control_tests_id\`) REFERENCES \`control_tests\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_rels_order_idx\` ON \`management_assessment_icfr_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_rels_parent_idx\` ON \`management_assessment_icfr_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_rels_path_idx\` ON \`management_assessment_icfr_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_rels_audit_findings_id_idx\` ON \`management_assessment_icfr_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_rels_control_tests_id_idx\` ON \`management_assessment_icfr_rels\` (\`control_tests_id\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_rels_users_id_idx\` ON \`management_assessment_icfr_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_management_assessment_icfr_certifying_7b6d5ba2_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`signature_date\` text NOT NULL,
  	\`signature_document_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`signature_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_management_assessment_icfr_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_certifying_7b6d5ba2_v_order_idx\` ON \`_management_assessment_icfr_certifying_7b6d5ba2_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_certifying_7b6d5ba2_v_parent_id_idx\` ON \`_management_assessment_icfr_certifying_7b6d5ba2_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_certifying_7b6d5ba2_v_signat_idx\` ON \`_management_assessment_icfr_certifying_7b6d5ba2_v\` (\`signature_document_id\`);`)
  await db.run(sql`CREATE TABLE \`_management_assessment_icfr_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_entity_id\` text(36) NOT NULL,
  	\`version_assessment_period\` text NOT NULL,
  	\`version_assessment_date\` text NOT NULL,
  	\`version_scope\` text NOT NULL,
  	\`version_control_framework\` text NOT NULL,
  	\`version_control_environment_assessment\` text NOT NULL,
  	\`version_risk_assessment_assessment\` text NOT NULL,
  	\`version_control_activities_assessment\` text NOT NULL,
  	\`version_information_communication_assessment\` text NOT NULL,
  	\`version_monitoring_assessment\` text NOT NULL,
  	\`version_significant_deficiencies_identified\` integer DEFAULT false,
  	\`version_material_weaknesses_identified\` integer DEFAULT false,
  	\`version_deficiency_details\` text,
  	\`version_remediation_actions\` text,
  	\`version_conclusion_statement\` text NOT NULL,
  	\`version_management_acknowledgment\` text NOT NULL,
  	\`version_attestation_document_id\` text(36),
  	\`version_status\` text DEFAULT 'draft' NOT NULL,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`management_assessment_icfr\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_attestation_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_v_parent_idx\` ON \`_management_assessment_icfr_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_v_version_version_uuid_idx\` ON \`_management_assessment_icfr_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_v_version_version_tenant_idx\` ON \`_management_assessment_icfr_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_v_version_version_entity_idx\` ON \`_management_assessment_icfr_v\` (\`version_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_v_version_version_assessment_idx\` ON \`_management_assessment_icfr_v\` (\`version_assessment_period\`);`)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_v_version_version_attestatio_idx\` ON \`_management_assessment_icfr_v\` (\`version_attestation_document_id\`);`)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_v_version_version_updated_at_idx\` ON \`_management_assessment_icfr_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_v_version_version_created_at_idx\` ON \`_management_assessment_icfr_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_v_created_at_idx\` ON \`_management_assessment_icfr_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_v_updated_at_idx\` ON \`_management_assessment_icfr_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_management_assessment_icfr_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_findings_id\` text(36),
  	\`control_tests_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_management_assessment_icfr_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`control_tests_id\`) REFERENCES \`control_tests\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_v_rels_order_idx\` ON \`_management_assessment_icfr_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_v_rels_parent_idx\` ON \`_management_assessment_icfr_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_v_rels_path_idx\` ON \`_management_assessment_icfr_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_v_rels_audit_findings_id_idx\` ON \`_management_assessment_icfr_v_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_v_rels_control_tests_id_idx\` ON \`_management_assessment_icfr_v_rels\` (\`control_tests_id\`);`)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_v_rels_users_id_idx\` ON \`_management_assessment_icfr_v_rels\` (\`users_id\`);`)
  await db.run(sql`DROP TABLE \`pages_document_details_icfr_assessment_60571ac4\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_icfr_assessment\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_icfr_assessment_60571ac4_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_icfr_assessment\`;`)
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
  	\`legal_entities_id\` text(36),
  	\`fx_transactions_id\` text(36),
  	\`internal_controls_id\` text(36),
  	\`fixed_assets_id\` text(36),
  	\`investment_properties_id\` text(36),
  	\`business_combinations_id\` text(36),
  	\`audit_evidence_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_committee_minutes_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`legal_entities_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fx_transactions_id\`) REFERENCES \`fx_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fixed_assets_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`investment_properties_id\`) REFERENCES \`investment_properties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`business_combinations_id\`) REFERENCES \`business_combinations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_evidence_id\`) REFERENCES \`audit_evidence\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_rels\`("id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "audit_findings_id", "audit_committee_minutes_id", "legal_entities_id", "fx_transactions_id", "internal_controls_id", "fixed_assets_id", "investment_properties_id", "business_combinations_id", "audit_evidence_id", "users_id") SELECT "id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "audit_findings_id", "audit_committee_minutes_id", "legal_entities_id", "fx_transactions_id", "internal_controls_id", "fixed_assets_id", "investment_properties_id", "business_combinations_id", "audit_evidence_id", "users_id" FROM \`pages_rels\`;`)
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
  await db.run(sql`CREATE INDEX \`pages_rels_legal_entities_id_idx\` ON \`pages_rels\` (\`legal_entities_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_fx_transactions_id_idx\` ON \`pages_rels\` (\`fx_transactions_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_internal_controls_id_idx\` ON \`pages_rels\` (\`internal_controls_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_fixed_assets_id_idx\` ON \`pages_rels\` (\`fixed_assets_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_investment_properties_id_idx\` ON \`pages_rels\` (\`investment_properties_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_business_combinations_id_idx\` ON \`pages_rels\` (\`business_combinations_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_audit_evidence_id_idx\` ON \`pages_rels\` (\`audit_evidence_id\`,\`locale\`);`)
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
  	\`legal_entities_id\` text(36),
  	\`fx_transactions_id\` text(36),
  	\`internal_controls_id\` text(36),
  	\`fixed_assets_id\` text(36),
  	\`investment_properties_id\` text(36),
  	\`business_combinations_id\` text(36),
  	\`audit_evidence_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_committee_minutes_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`legal_entities_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fx_transactions_id\`) REFERENCES \`fx_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fixed_assets_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`investment_properties_id\`) REFERENCES \`investment_properties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`business_combinations_id\`) REFERENCES \`business_combinations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_evidence_id\`) REFERENCES \`audit_evidence\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_rels\`("id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "audit_findings_id", "audit_committee_minutes_id", "legal_entities_id", "fx_transactions_id", "internal_controls_id", "fixed_assets_id", "investment_properties_id", "business_combinations_id", "audit_evidence_id", "users_id") SELECT "id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "audit_findings_id", "audit_committee_minutes_id", "legal_entities_id", "fx_transactions_id", "internal_controls_id", "fixed_assets_id", "investment_properties_id", "business_combinations_id", "audit_evidence_id", "users_id" FROM \`_pages_v_rels\`;`)
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
  await db.run(sql`CREATE INDEX \`_pages_v_rels_legal_entities_id_idx\` ON \`_pages_v_rels\` (\`legal_entities_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_fx_transactions_id_idx\` ON \`_pages_v_rels\` (\`fx_transactions_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_internal_controls_id_idx\` ON \`_pages_v_rels\` (\`internal_controls_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_fixed_assets_id_idx\` ON \`_pages_v_rels\` (\`fixed_assets_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_investment_properties_id_idx\` ON \`_pages_v_rels\` (\`investment_properties_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_business_combinations_id_idx\` ON \`_pages_v_rels\` (\`business_combinations_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_audit_evidence_id_idx\` ON \`_pages_v_rels\` (\`audit_evidence_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_users_id_idx\` ON \`_pages_v_rels\` (\`users_id\`,\`locale\`);`)
}
