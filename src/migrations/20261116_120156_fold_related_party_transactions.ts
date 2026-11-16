import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pages_document_details_related_party_t_47abea7a\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`entity_id\` text(36),
  	\`related_party_name\` text,
  	\`related_party_type\` text,
  	\`transaction_type\` text,
  	\`amount\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`terms\` text,
  	\`arm_length_basis\` text,
  	\`approval_status\` text DEFAULT 'pending',
  	\`approver_name\` text,
  	\`approval_date\` text,
  	\`disclosure_required\` integer DEFAULT true,
  	\`disclosed_in_financial_statements\` integer DEFAULT false,
  	\`disclosure_reference\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_document_details_related_party_t_47abea7a_order_idx\` ON \`pages_document_details_related_party_t_47abea7a\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_related_party_t_47abea7a_parent_id_idx\` ON \`pages_document_details_related_party_t_47abea7a\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_related_party_t_47abea7a_path_idx\` ON \`pages_document_details_related_party_t_47abea7a\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_document_details_related_party_t_47abea7a_entity_idx\` ON \`pages_document_details_related_party_t_47abea7a\` (\`entity_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_document_details_related_party_t_47abea7a_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`entity_id\` text(36),
  	\`related_party_name\` text,
  	\`related_party_type\` text,
  	\`transaction_type\` text,
  	\`amount\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`terms\` text,
  	\`arm_length_basis\` text,
  	\`approval_status\` text DEFAULT 'pending',
  	\`approver_name\` text,
  	\`approval_date\` text,
  	\`disclosure_required\` integer DEFAULT true,
  	\`disclosed_in_financial_statements\` integer DEFAULT false,
  	\`disclosure_reference\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_document_details_related_party_t_47abea7a_v_order_idx\` ON \`_pages_document_details_related_party_t_47abea7a_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_related_party_t_47abea7a_v_parent_id_idx\` ON \`_pages_document_details_related_party_t_47abea7a_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_related_party_t_47abea7a_v_path_idx\` ON \`_pages_document_details_related_party_t_47abea7a_v\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_document_details_related_party_t_47abea7a_v_entit_idx\` ON \`_pages_document_details_related_party_t_47abea7a_v\` (\`entity_id\`);`)
  await db.run(sql`DROP TABLE \`related_party_transactions\`;`)
  await db.run(sql`DROP TABLE \`related_party_transactions_rels\`;`)
  await db.run(sql`DROP TABLE \`_related_party_transactions_v\`;`)
  await db.run(sql`DROP TABLE \`_related_party_transactions_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`pages_rels\` ADD \`audit_evidence_id\` text(36) REFERENCES audit_evidence(id);`)
  await db.run(sql`CREATE INDEX \`pages_rels_audit_evidence_id_idx\` ON \`pages_rels\` (\`audit_evidence_id\`,\`locale\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_rels\` ADD \`audit_evidence_id\` text(36) REFERENCES audit_evidence(id);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_audit_evidence_id_idx\` ON \`_pages_v_rels\` (\`audit_evidence_id\`,\`locale\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`related_party_transactions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`entity_id\` text(36) NOT NULL,
  	\`related_party_name\` text NOT NULL,
  	\`related_party_type\` text NOT NULL,
  	\`relationship\` text NOT NULL,
  	\`transaction_date\` text NOT NULL,
  	\`transaction_description\` text NOT NULL,
  	\`transaction_type\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`currency\` text NOT NULL,
  	\`terms\` text,
  	\`arm_length_basis\` text,
  	\`approval_status\` text DEFAULT 'pending',
  	\`approver_name\` text,
  	\`approval_date\` text,
  	\`disclosure_required\` integer DEFAULT true,
  	\`disclosed_in_financial_statements\` integer DEFAULT false,
  	\`disclosure_reference\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`related_party_transactions_uuid_idx\` ON \`related_party_transactions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_tenant_idx\` ON \`related_party_transactions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_entity_idx\` ON \`related_party_transactions\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_related_party_name_idx\` ON \`related_party_transactions\` (\`related_party_name\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_transaction_description_idx\` ON \`related_party_transactions\` (\`transaction_description\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_updated_at_idx\` ON \`related_party_transactions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_created_at_idx\` ON \`related_party_transactions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`related_party_transactions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`internal_controls_id\` text(36),
  	\`audit_evidence_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`related_party_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_evidence_id\`) REFERENCES \`audit_evidence\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`related_party_transactions_rels_order_idx\` ON \`related_party_transactions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_rels_parent_idx\` ON \`related_party_transactions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_rels_path_idx\` ON \`related_party_transactions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_rels_internal_controls_id_idx\` ON \`related_party_transactions_rels\` (\`internal_controls_id\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_rels_audit_evidence_id_idx\` ON \`related_party_transactions_rels\` (\`audit_evidence_id\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_rels_users_id_idx\` ON \`related_party_transactions_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_related_party_transactions_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_entity_id\` text(36) NOT NULL,
  	\`version_related_party_name\` text NOT NULL,
  	\`version_related_party_type\` text NOT NULL,
  	\`version_relationship\` text NOT NULL,
  	\`version_transaction_date\` text NOT NULL,
  	\`version_transaction_description\` text NOT NULL,
  	\`version_transaction_type\` text NOT NULL,
  	\`version_amount\` numeric NOT NULL,
  	\`version_currency\` text NOT NULL,
  	\`version_terms\` text,
  	\`version_arm_length_basis\` text,
  	\`version_approval_status\` text DEFAULT 'pending',
  	\`version_approver_name\` text,
  	\`version_approval_date\` text,
  	\`version_disclosure_required\` integer DEFAULT true,
  	\`version_disclosed_in_financial_statements\` integer DEFAULT false,
  	\`version_disclosure_reference\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`related_party_transactions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_related_party_transactions_v_parent_idx\` ON \`_related_party_transactions_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_related_party_transactions_v_version_version_uuid_idx\` ON \`_related_party_transactions_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_related_party_transactions_v_version_version_tenant_idx\` ON \`_related_party_transactions_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_related_party_transactions_v_version_version_entity_idx\` ON \`_related_party_transactions_v\` (\`version_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`_related_party_transactions_v_version_version_related_pa_idx\` ON \`_related_party_transactions_v\` (\`version_related_party_name\`);`)
  await db.run(sql`CREATE INDEX \`_related_party_transactions_v_version_version_transactio_idx\` ON \`_related_party_transactions_v\` (\`version_transaction_description\`);`)
  await db.run(sql`CREATE INDEX \`_related_party_transactions_v_version_version_updated_at_idx\` ON \`_related_party_transactions_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_related_party_transactions_v_version_version_created_at_idx\` ON \`_related_party_transactions_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_related_party_transactions_v_created_at_idx\` ON \`_related_party_transactions_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_related_party_transactions_v_updated_at_idx\` ON \`_related_party_transactions_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_related_party_transactions_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`internal_controls_id\` text(36),
  	\`audit_evidence_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_related_party_transactions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_evidence_id\`) REFERENCES \`audit_evidence\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_related_party_transactions_v_rels_order_idx\` ON \`_related_party_transactions_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_related_party_transactions_v_rels_parent_idx\` ON \`_related_party_transactions_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_related_party_transactions_v_rels_path_idx\` ON \`_related_party_transactions_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_related_party_transactions_v_rels_internal_controls_id_idx\` ON \`_related_party_transactions_v_rels\` (\`internal_controls_id\`);`)
  await db.run(sql`CREATE INDEX \`_related_party_transactions_v_rels_audit_evidence_id_idx\` ON \`_related_party_transactions_v_rels\` (\`audit_evidence_id\`);`)
  await db.run(sql`CREATE INDEX \`_related_party_transactions_v_rels_users_id_idx\` ON \`_related_party_transactions_v_rels\` (\`users_id\`);`)
  await db.run(sql`DROP TABLE \`pages_document_details_related_party_t_47abea7a\`;`)
  await db.run(sql`DROP TABLE \`_pages_document_details_related_party_t_47abea7a_v\`;`)
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
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_rels\`("id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "audit_findings_id", "audit_committee_minutes_id", "legal_entities_id", "fx_transactions_id", "internal_controls_id", "fixed_assets_id", "investment_properties_id", "business_combinations_id", "users_id") SELECT "id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "audit_findings_id", "audit_committee_minutes_id", "legal_entities_id", "fx_transactions_id", "internal_controls_id", "fixed_assets_id", "investment_properties_id", "business_combinations_id", "users_id" FROM \`pages_rels\`;`)
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
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_rels\`("id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "audit_findings_id", "audit_committee_minutes_id", "legal_entities_id", "fx_transactions_id", "internal_controls_id", "fixed_assets_id", "investment_properties_id", "business_combinations_id", "users_id") SELECT "id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id", "media_id", "audit_findings_id", "audit_committee_minutes_id", "legal_entities_id", "fx_transactions_id", "internal_controls_id", "fixed_assets_id", "investment_properties_id", "business_combinations_id", "users_id" FROM \`_pages_v_rels\`;`)
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
  await db.run(sql`CREATE INDEX \`_pages_v_rels_users_id_idx\` ON \`_pages_v_rels\` (\`users_id\`,\`locale\`);`)
}
