/**
 * Tables and enums take Payload's own names (the naming plugin no longer hashes them).
 *
 * 332 hashed tables are replaced by tables under Payload's names. Hand-edited after generation:
 *  - EVERY statement is repeatable (`IF NOT EXISTS` / `IF EXISTS`). D1 does not run a migration in
 *    one transaction, and the deploy build has been interrupted mid-migration before; a migration
 *    of 1,456 statements must be able to simply run again.
 *  - the two renamed tables that hold rows in production (the users' roles and their version rows)
 *    are copied across before the hashed tables are dropped.
 */
import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`account_reconciliations_external_adjus_79d3f9d1\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`originated_at\` text NOT NULL,
  	\`aging_bucket\` text,
  	\`bank_transaction_id\` text(36),
  	\`journal_entry_id\` text(36),
  	FOREIGN KEY (\`bank_transaction_id\`) REFERENCES \`bank_transactions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`account_reconciliations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`account_reconciliations_external_adjus_79d3f9d1_order_idx\` ON \`account_reconciliations_external_adjus_79d3f9d1\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`account_reconciliations_external_adjus_79d3f9d1_parent_id_idx\` ON \`account_reconciliations_external_adjus_79d3f9d1\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`account_reconciliations_external_adjus_79d3f9d1_bank_tra_idx\` ON \`account_reconciliations_external_adjus_79d3f9d1\` (\`bank_transaction_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`account_reconciliations_external_adjus_79d3f9d1_journal__idx\` ON \`account_reconciliations_external_adjus_79d3f9d1\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`account_reconciliations_external_adjus_79d3f9d1_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`account_reconciliations_external_adjus_79d3f9d1\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`account_reconciliations_external_adjus_79d3f9d1_locales_loca\` ON \`account_reconciliations_external_adjus_79d3f9d1_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`account_reconciliations_gl_adjustments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`originated_at\` text NOT NULL,
  	\`aging_bucket\` text,
  	\`journal_entry_id\` text(36),
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`account_reconciliations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`account_reconciliations_gl_adjustments_order_idx\` ON \`account_reconciliations_gl_adjustments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`account_reconciliations_gl_adjustments_parent_id_idx\` ON \`account_reconciliations_gl_adjustments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`account_reconciliations_gl_adjustments_journal_entry_idx\` ON \`account_reconciliations_gl_adjustments\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`account_reconciliations_gl_adjustments_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`account_reconciliations_gl_adjustments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`account_reconciliations_gl_adjustments_locales_locale_parent\` ON \`account_reconciliations_gl_adjustments_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_account_reconciliations_external_adjus_79d3f9d1_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`originated_at\` text NOT NULL,
  	\`aging_bucket\` text,
  	\`bank_transaction_id\` text(36),
  	\`journal_entry_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`bank_transaction_id\`) REFERENCES \`bank_transactions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_account_reconciliations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_account_reconciliations_external_adjus_79d3f9d1_v_order_idx\` ON \`_account_reconciliations_external_adjus_79d3f9d1_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_account_reconciliations_external_adjus_79d3f9d1_v_parent_id_idx\` ON \`_account_reconciliations_external_adjus_79d3f9d1_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_account_reconciliations_external_adjus_79d3f9d1_v_bank__idx\` ON \`_account_reconciliations_external_adjus_79d3f9d1_v\` (\`bank_transaction_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_account_reconciliations_external_adjus_79d3f9d1_v_journ_idx\` ON \`_account_reconciliations_external_adjus_79d3f9d1_v\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_account_reconciliations_external_adjus_79d3f9d1_v_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_account_reconciliations_external_adjus_79d3f9d1_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_account_reconciliations_external_adjus_79d3f9d1_v_locales_l\` ON \`_account_reconciliations_external_adjus_79d3f9d1_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_account_reconciliations_v_version_gl_adjustments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`originated_at\` text NOT NULL,
  	\`aging_bucket\` text,
  	\`journal_entry_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_account_reconciliations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_account_reconciliations_v_version_gl_adjustments_order_idx\` ON \`_account_reconciliations_v_version_gl_adjustments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_account_reconciliations_v_version_gl_adjustments_parent_id_idx\` ON \`_account_reconciliations_v_version_gl_adjustments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_account_reconciliations_v_version_gl_adjustments_journa_idx\` ON \`_account_reconciliations_v_version_gl_adjustments\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_account_reconciliations_v_version_gl_adjustments_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_account_reconciliations_v_version_gl_adjustments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_account_reconciliations_v_version_gl_adjustments_locales_lo\` ON \`_account_reconciliations_v_version_gl_adjustments_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`audit_committee_minutes_attendees\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`title\` text,
  	\`affiliation\` text,
  	\`status\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_committee_minutes_attendees_order_idx\` ON \`audit_committee_minutes_attendees\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_committee_minutes_attendees_parent_id_idx\` ON \`audit_committee_minutes_attendees\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`audit_committee_minutes_agenda\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`topic\` text NOT NULL,
  	\`presenter\` text,
  	\`time_allocated\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_committee_minutes_agenda_order_idx\` ON \`audit_committee_minutes_agenda\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_committee_minutes_agenda_parent_id_idx\` ON \`audit_committee_minutes_agenda\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`audit_committee_minutes_key_decisions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`decision\` text NOT NULL,
  	\`rationale\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_committee_minutes_key_decisions_order_idx\` ON \`audit_committee_minutes_key_decisions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_committee_minutes_key_decisions_parent_id_idx\` ON \`audit_committee_minutes_key_decisions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`audit_committee_minutes_action_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`action_description\` text NOT NULL,
  	\`assigned_to\` text NOT NULL,
  	\`due_date\` text NOT NULL,
  	\`status\` text DEFAULT 'open',
  	\`completion_date\` text,
  	\`completion_notes\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_committee_minutes_action_items_order_idx\` ON \`audit_committee_minutes_action_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_committee_minutes_action_items_parent_id_idx\` ON \`audit_committee_minutes_action_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_audit_committee_minutes_v_version_attendees\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`title\` text,
  	\`affiliation\` text,
  	\`status\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_committee_minutes_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_committee_minutes_v_version_attendees_order_idx\` ON \`_audit_committee_minutes_v_version_attendees\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_committee_minutes_v_version_attendees_parent_id_idx\` ON \`_audit_committee_minutes_v_version_attendees\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_audit_committee_minutes_v_version_agenda\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`topic\` text NOT NULL,
  	\`presenter\` text,
  	\`time_allocated\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_committee_minutes_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_committee_minutes_v_version_agenda_order_idx\` ON \`_audit_committee_minutes_v_version_agenda\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_committee_minutes_v_version_agenda_parent_id_idx\` ON \`_audit_committee_minutes_v_version_agenda\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_audit_committee_minutes_v_version_key_decisions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`decision\` text NOT NULL,
  	\`rationale\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_committee_minutes_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_committee_minutes_v_version_key_decisions_order_idx\` ON \`_audit_committee_minutes_v_version_key_decisions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_committee_minutes_v_version_key_decisions_parent_id_idx\` ON \`_audit_committee_minutes_v_version_key_decisions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_audit_committee_minutes_v_version_action_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`action_description\` text NOT NULL,
  	\`assigned_to\` text NOT NULL,
  	\`due_date\` text NOT NULL,
  	\`status\` text DEFAULT 'open',
  	\`completion_date\` text,
  	\`completion_notes\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_committee_minutes_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_committee_minutes_v_version_action_items_order_idx\` ON \`_audit_committee_minutes_v_version_action_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_committee_minutes_v_version_action_items_parent_id_idx\` ON \`_audit_committee_minutes_v_version_action_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`audit_committees_members_expertise\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`area\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_committees_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_committees_members_expertise_order_idx\` ON \`audit_committees_members_expertise\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_committees_members_expertise_parent_id_idx\` ON \`audit_committees_members_expertise\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`audit_committees_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`member_name\` text NOT NULL,
  	\`title\` text,
  	\`affiliation\` text NOT NULL,
  	\`appointed_date\` text NOT NULL,
  	\`term_end_date\` text,
  	\`role\` text,
  	\`status\` text DEFAULT 'active',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_committees\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_committees_members_order_idx\` ON \`audit_committees_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_committees_members_parent_id_idx\` ON \`audit_committees_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_audit_committees_v_version_members_expertise\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`area\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_committees_v_version_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_committees_v_version_members_expertise_order_idx\` ON \`_audit_committees_v_version_members_expertise\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_committees_v_version_members_expertise_parent_id_idx\` ON \`_audit_committees_v_version_members_expertise\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_audit_committees_v_version_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`member_name\` text NOT NULL,
  	\`title\` text,
  	\`affiliation\` text NOT NULL,
  	\`appointed_date\` text NOT NULL,
  	\`term_end_date\` text,
  	\`role\` text,
  	\`status\` text DEFAULT 'active',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_committees_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_committees_v_version_members_order_idx\` ON \`_audit_committees_v_version_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_committees_v_version_members_parent_id_idx\` ON \`_audit_committees_v_version_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`audit_events_changes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`previous_value\` text,
  	\`next_value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_events_changes_order_idx\` ON \`audit_events_changes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_events_changes_parent_id_idx\` ON \`audit_events_changes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`audit_evidence_evidence_chain\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`actor\` text NOT NULL,
  	\`action\` text NOT NULL,
  	\`action_date\` text,
  	\`notes\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_evidence\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_evidence_evidence_chain_order_idx\` ON \`audit_evidence_evidence_chain\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_evidence_evidence_chain_parent_id_idx\` ON \`audit_evidence_evidence_chain\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`audit_evidence_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_evidence\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_evidence_tags_order_idx\` ON \`audit_evidence_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_evidence_tags_parent_id_idx\` ON \`audit_evidence_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_audit_evidence_v_version_evidence_chain\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`actor\` text NOT NULL,
  	\`action\` text NOT NULL,
  	\`action_date\` text,
  	\`notes\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_evidence_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_evidence_v_version_evidence_chain_order_idx\` ON \`_audit_evidence_v_version_evidence_chain\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_evidence_v_version_evidence_chain_parent_id_idx\` ON \`_audit_evidence_v_version_evidence_chain\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_audit_evidence_v_version_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`tag\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_evidence_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_evidence_v_version_tags_order_idx\` ON \`_audit_evidence_v_version_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_evidence_v_version_tags_parent_id_idx\` ON \`_audit_evidence_v_version_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`audit_findings_communicated_to\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`recipient\` text NOT NULL,
  	\`communication_date\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_findings_communicated_to_order_idx\` ON \`audit_findings_communicated_to\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_findings_communicated_to_parent_id_idx\` ON \`audit_findings_communicated_to\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_audit_findings_v_version_communicated_to\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`recipient\` text NOT NULL,
  	\`communication_date\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_findings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_findings_v_version_communicated_to_order_idx\` ON \`_audit_findings_v_version_communicated_to\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_findings_v_version_communicated_to_parent_id_idx\` ON \`_audit_findings_v_version_communicated_to\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`audit_reports_target_jurisdictions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`jurisdiction_code\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_reports\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_reports_target_jurisdictions_order_idx\` ON \`audit_reports_target_jurisdictions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_reports_target_jurisdictions_parent_id_idx\` ON \`audit_reports_target_jurisdictions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`audit_reports_regulatory_filings\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`jurisdiction\` text NOT NULL,
  	\`filing_type\` text,
  	\`filing_format\` text,
  	\`filing_deadline\` text,
  	\`submission_method\` text,
  	\`submission_status\` text DEFAULT 'draft',
  	\`submission_date\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_reports\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_reports_regulatory_filings_order_idx\` ON \`audit_reports_regulatory_filings\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_reports_regulatory_filings_parent_id_idx\` ON \`audit_reports_regulatory_filings\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`audit_reports_optimization_recommendat_bf8b394d\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`jurisdiction\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_reports_optimization_recommendat_6443025e\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_reports_optimization_recommendat_bf8b394d_order_idx\` ON \`audit_reports_optimization_recommendat_bf8b394d\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_reports_optimization_recommendat_bf8b394d_parent_id_idx\` ON \`audit_reports_optimization_recommendat_bf8b394d\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`audit_reports_optimization_recommendat_6443025e\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`optimization_type\` text NOT NULL,
  	\`estimated_tax_savings\` numeric,
  	\`savings_currency\` text,
  	\`compliance_risk\` text,
  	\`description\` text,
  	\`recommended_action\` text,
  	\`implementation_status\` text DEFAULT 'recommended',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_reports\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_reports_optimization_recommendat_6443025e_order_idx\` ON \`audit_reports_optimization_recommendat_6443025e\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`audit_reports_optimization_recommendat_6443025e_parent_id_idx\` ON \`audit_reports_optimization_recommendat_6443025e\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_audit_reports_v_version_target_jurisdictions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`jurisdiction_code\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_reports_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_reports_v_version_target_jurisdictions_order_idx\` ON \`_audit_reports_v_version_target_jurisdictions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_reports_v_version_target_jurisdictions_parent_id_idx\` ON \`_audit_reports_v_version_target_jurisdictions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_audit_reports_v_version_regulatory_filings\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`jurisdiction\` text NOT NULL,
  	\`filing_type\` text,
  	\`filing_format\` text,
  	\`filing_deadline\` text,
  	\`submission_method\` text,
  	\`submission_status\` text DEFAULT 'draft',
  	\`submission_date\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_reports_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_reports_v_version_regulatory_filings_order_idx\` ON \`_audit_reports_v_version_regulatory_filings\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_reports_v_version_regulatory_filings_parent_id_idx\` ON \`_audit_reports_v_version_regulatory_filings\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_audit_reports_optimization_recommendat_bf8b394d_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`jurisdiction\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_reports_optimization_recommendat_6443025e_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_reports_optimization_recommendat_bf8b394d_v_order_idx\` ON \`_audit_reports_optimization_recommendat_bf8b394d_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_reports_optimization_recommendat_bf8b394d_v_parent_id_idx\` ON \`_audit_reports_optimization_recommendat_bf8b394d_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_audit_reports_optimization_recommendat_6443025e_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`optimization_type\` text NOT NULL,
  	\`estimated_tax_savings\` numeric,
  	\`savings_currency\` text,
  	\`compliance_risk\` text,
  	\`description\` text,
  	\`recommended_action\` text,
  	\`implementation_status\` text DEFAULT 'recommended',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_reports_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_reports_optimization_recommendat_6443025e_v_order_idx\` ON \`_audit_reports_optimization_recommendat_6443025e_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_audit_reports_optimization_recommendat_6443025e_v_parent_id_idx\` ON \`_audit_reports_optimization_recommendat_6443025e_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`bank_reconciliations_reconciling_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`kind\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`reference\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bank_reconciliations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`bank_reconciliations_reconciling_items_order_idx\` ON \`bank_reconciliations_reconciling_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`bank_reconciliations_reconciling_items_parent_id_idx\` ON \`bank_reconciliations_reconciling_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`bank_reconciliations_reconciling_items_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bank_reconciliations_reconciling_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`bank_reconciliations_reconciling_items_locales_locale_parent\` ON \`bank_reconciliations_reconciling_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_bank_reconciliations_v_version_reconciling_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`kind\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`reference\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bank_reconciliations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_bank_reconciliations_v_version_reconciling_items_order_idx\` ON \`_bank_reconciliations_v_version_reconciling_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_bank_reconciliations_v_version_reconciling_items_parent_id_idx\` ON \`_bank_reconciliations_v_version_reconciling_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_bank_reconciliations_v_version_reconciling_items_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bank_reconciliations_v_version_reconciling_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_bank_reconciliations_v_version_reconciling_items_locales_lo\` ON \`_bank_reconciliations_v_version_reconciling_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`bank_statements_transactions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`transaction_date\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`reference\` text,
  	\`balance_after\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bank_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`bank_statements_transactions_order_idx\` ON \`bank_statements_transactions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`bank_statements_transactions_parent_id_idx\` ON \`bank_statements_transactions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`bank_statements_transactions_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bank_statements_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`bank_statements_transactions_locales_locale_parent_id_unique\` ON \`bank_statements_transactions_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`bank_statements_matched_transactions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`bank_statement_line_index\` numeric NOT NULL,
  	\`journal_entry_id\` text(36) NOT NULL,
  	\`match_type\` text NOT NULL,
  	\`match_score\` numeric,
  	\`variance_amount\` numeric,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bank_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`bank_statements_matched_transactions_order_idx\` ON \`bank_statements_matched_transactions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`bank_statements_matched_transactions_parent_id_idx\` ON \`bank_statements_matched_transactions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`bank_statements_matched_transactions_journal_entry_idx\` ON \`bank_statements_matched_transactions\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_bank_statements_v_version_transactions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`transaction_date\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`reference\` text,
  	\`balance_after\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bank_statements_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_bank_statements_v_version_transactions_order_idx\` ON \`_bank_statements_v_version_transactions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_bank_statements_v_version_transactions_parent_id_idx\` ON \`_bank_statements_v_version_transactions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_bank_statements_v_version_transactions_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bank_statements_v_version_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_bank_statements_v_version_transactions_locales_locale_paren\` ON \`_bank_statements_v_version_transactions_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_bank_statements_v_version_matched_transactions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`bank_statement_line_index\` numeric NOT NULL,
  	\`journal_entry_id\` text(36) NOT NULL,
  	\`match_type\` text NOT NULL,
  	\`match_score\` numeric,
  	\`variance_amount\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bank_statements_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_bank_statements_v_version_matched_transactions_order_idx\` ON \`_bank_statements_v_version_matched_transactions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_bank_statements_v_version_matched_transactions_parent_id_idx\` ON \`_bank_statements_v_version_matched_transactions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_bank_statements_v_version_matched_transactions_journal__idx\` ON \`_bank_statements_v_version_matched_transactions\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`bank_transactions_matched_journal_entr_31afc32d\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`journal_entry_id\` text(36) NOT NULL,
  	\`matched_amount\` numeric NOT NULL,
  	\`match_score\` numeric,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bank_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`bank_transactions_matched_journal_entr_31afc32d_order_idx\` ON \`bank_transactions_matched_journal_entr_31afc32d\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`bank_transactions_matched_journal_entr_31afc32d_parent_id_idx\` ON \`bank_transactions_matched_journal_entr_31afc32d\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`bank_transactions_matched_journal_entr_31afc32d_journal__idx\` ON \`bank_transactions_matched_journal_entr_31afc32d\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_bank_transactions_matched_journal_entr_31afc32d_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`journal_entry_id\` text(36) NOT NULL,
  	\`matched_amount\` numeric NOT NULL,
  	\`match_score\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bank_transactions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_bank_transactions_matched_journal_entr_31afc32d_v_order_idx\` ON \`_bank_transactions_matched_journal_entr_31afc32d_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_bank_transactions_matched_journal_entr_31afc32d_v_parent_id_idx\` ON \`_bank_transactions_matched_journal_entr_31afc32d_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_bank_transactions_matched_journal_entr_31afc32d_v_journ_idx\` ON \`_bank_transactions_matched_journal_entr_31afc32d_v\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`bills_of_materials_components\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36) NOT NULL,
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`waste_allowance\` numeric DEFAULT 0,
  	\`is_optional\` integer DEFAULT false,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bills_of_materials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`bills_of_materials_components_order_idx\` ON \`bills_of_materials_components\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`bills_of_materials_components_parent_id_idx\` ON \`bills_of_materials_components\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`bills_of_materials_components_item_idx\` ON \`bills_of_materials_components\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`bills_of_materials_operations\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`work_center_id\` text(36),
  	\`standard_labour_minutes\` numeric DEFAULT 0,
  	\`standard_machine_minutes\` numeric DEFAULT 0,
  	FOREIGN KEY (\`work_center_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bills_of_materials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`bills_of_materials_operations_order_idx\` ON \`bills_of_materials_operations\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`bills_of_materials_operations_parent_id_idx\` ON \`bills_of_materials_operations\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`bills_of_materials_operations_work_center_idx\` ON \`bills_of_materials_operations\` (\`work_center_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`bills_of_materials_operations_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bills_of_materials_operations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`bills_of_materials_operations_locales_locale_parent_id_uniqu\` ON \`bills_of_materials_operations_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_bills_of_materials_v_version_components\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36) NOT NULL,
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`waste_allowance\` numeric DEFAULT 0,
  	\`is_optional\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bills_of_materials_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_bills_of_materials_v_version_components_order_idx\` ON \`_bills_of_materials_v_version_components\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_bills_of_materials_v_version_components_parent_id_idx\` ON \`_bills_of_materials_v_version_components\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_bills_of_materials_v_version_components_item_idx\` ON \`_bills_of_materials_v_version_components\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_bills_of_materials_v_version_operations\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`work_center_id\` text(36),
  	\`standard_labour_minutes\` numeric DEFAULT 0,
  	\`standard_machine_minutes\` numeric DEFAULT 0,
  	\`_uuid\` text,
  	FOREIGN KEY (\`work_center_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bills_of_materials_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_bills_of_materials_v_version_operations_order_idx\` ON \`_bills_of_materials_v_version_operations\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_bills_of_materials_v_version_operations_parent_id_idx\` ON \`_bills_of_materials_v_version_operations\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_bills_of_materials_v_version_operations_work_center_idx\` ON \`_bills_of_materials_v_version_operations\` (\`work_center_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_bills_of_materials_v_version_operations_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bills_of_materials_v_version_operations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_bills_of_materials_v_version_operations_locales_locale_pare\` ON \`_bills_of_materials_v_version_operations_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`bookable_resources_pricing_tiers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tier_name\` text NOT NULL,
  	\`rate\` numeric NOT NULL,
  	\`effective_from\` text,
  	\`effective_to\` text,
  	\`min_stay_days\` numeric,
  	\`is_active\` integer DEFAULT true,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bookable_resources\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`bookable_resources_pricing_tiers_order_idx\` ON \`bookable_resources_pricing_tiers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`bookable_resources_pricing_tiers_parent_id_idx\` ON \`bookable_resources_pricing_tiers\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`bookable_resources_amenities\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bookable_resources\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`bookable_resources_amenities_order_idx\` ON \`bookable_resources_amenities\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`bookable_resources_amenities_parent_id_idx\` ON \`bookable_resources_amenities\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_bookable_resources_v_version_pricing_tiers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`tier_name\` text NOT NULL,
  	\`rate\` numeric NOT NULL,
  	\`effective_from\` text,
  	\`effective_to\` text,
  	\`min_stay_days\` numeric,
  	\`is_active\` integer DEFAULT true,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bookable_resources_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_bookable_resources_v_version_pricing_tiers_order_idx\` ON \`_bookable_resources_v_version_pricing_tiers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_bookable_resources_v_version_pricing_tiers_parent_id_idx\` ON \`_bookable_resources_v_version_pricing_tiers\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_bookable_resources_v_version_amenities\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`tag\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bookable_resources_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_bookable_resources_v_version_amenities_order_idx\` ON \`_bookable_resources_v_version_amenities\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_bookable_resources_v_version_amenities_parent_id_idx\` ON \`_bookable_resources_v_version_amenities\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`budget_planning_budget_line_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`gl_account_id\` text NOT NULL,
  	\`account_number\` text,
  	\`account_name\` text,
  	\`account_type\` text,
  	\`budget_amount\` numeric NOT NULL,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`budget_planning\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`budget_planning_budget_line_items_order_idx\` ON \`budget_planning_budget_line_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`budget_planning_budget_line_items_parent_id_idx\` ON \`budget_planning_budget_line_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`budget_planning_budget_line_items_gl_account_idx\` ON \`budget_planning_budget_line_items\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`budget_planning_budget_line_items_locales\` (
  	\`notes\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`budget_planning_budget_line_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`budget_planning_budget_line_items_locales_locale_parent_id_u\` ON \`budget_planning_budget_line_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_budget_planning_v_version_budget_line_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`gl_account_id\` text NOT NULL,
  	\`account_number\` text,
  	\`account_name\` text,
  	\`account_type\` text,
  	\`budget_amount\` numeric NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_budget_planning_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_budget_planning_v_version_budget_line_items_order_idx\` ON \`_budget_planning_v_version_budget_line_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_budget_planning_v_version_budget_line_items_parent_id_idx\` ON \`_budget_planning_v_version_budget_line_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_budget_planning_v_version_budget_line_items_gl_account_idx\` ON \`_budget_planning_v_version_budget_line_items\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_budget_planning_v_version_budget_line_items_locales\` (
  	\`notes\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_budget_planning_v_version_budget_line_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_budget_planning_v_version_budget_line_items_locales_locale_\` ON \`_budget_planning_v_version_budget_line_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`carriers_service_levels\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`incoterm\` text,
  	\`transit_days\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`carriers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`carriers_service_levels_order_idx\` ON \`carriers_service_levels\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`carriers_service_levels_parent_id_idx\` ON \`carriers_service_levels\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`carriers_service_levels_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`carriers_service_levels\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`carriers_service_levels_locales_locale_parent_id_unique\` ON \`carriers_service_levels_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_carriers_v_version_service_levels\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`incoterm\` text,
  	\`transit_days\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_carriers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_carriers_v_version_service_levels_order_idx\` ON \`_carriers_v_version_service_levels\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_carriers_v_version_service_levels_parent_id_idx\` ON \`_carriers_v_version_service_levels\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_carriers_v_version_service_levels_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_carriers_v_version_service_levels\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_carriers_v_version_service_levels_locales_locale_parent_id_\` ON \`_carriers_v_version_service_levels_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`cases_parties\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`role\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cases\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`cases_parties_order_idx\` ON \`cases_parties\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`cases_parties_parent_id_idx\` ON \`cases_parties\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`cases_parties_role_idx\` ON \`cases_parties\` (\`role\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`cases_proceedings\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`kind\` text NOT NULL,
  	\`held_at\` text,
  	\`summary\` text,
  	\`ruling\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cases\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`cases_proceedings_order_idx\` ON \`cases_proceedings\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`cases_proceedings_parent_id_idx\` ON \`cases_proceedings\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`cases_evidence\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content_uuid\` text,
  	\`kind\` text,
  	\`summary\` text,
  	\`filed_at\` text,
  	\`filed_by_id\` text(36),
  	\`supersedes\` text,
  	FOREIGN KEY (\`filed_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cases\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`cases_evidence_order_idx\` ON \`cases_evidence\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`cases_evidence_parent_id_idx\` ON \`cases_evidence\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`cases_evidence_content_uuid_idx\` ON \`cases_evidence\` (\`content_uuid\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`cases_evidence_filed_by_idx\` ON \`cases_evidence\` (\`filed_by_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_cases_v_version_parties\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`role\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_cases_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_cases_v_version_parties_order_idx\` ON \`_cases_v_version_parties\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_cases_v_version_parties_parent_id_idx\` ON \`_cases_v_version_parties\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_cases_v_version_parties_role_idx\` ON \`_cases_v_version_parties\` (\`role\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_cases_v_version_proceedings\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`kind\` text NOT NULL,
  	\`held_at\` text,
  	\`summary\` text,
  	\`ruling\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_cases_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_cases_v_version_proceedings_order_idx\` ON \`_cases_v_version_proceedings\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_cases_v_version_proceedings_parent_id_idx\` ON \`_cases_v_version_proceedings\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_cases_v_version_evidence\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`content_uuid\` text,
  	\`kind\` text,
  	\`summary\` text,
  	\`filed_at\` text,
  	\`filed_by_id\` text(36),
  	\`supersedes\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`filed_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_cases_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_cases_v_version_evidence_order_idx\` ON \`_cases_v_version_evidence\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_cases_v_version_evidence_parent_id_idx\` ON \`_cases_v_version_evidence\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_cases_v_version_evidence_content_uuid_idx\` ON \`_cases_v_version_evidence\` (\`content_uuid\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_cases_v_version_evidence_filed_by_idx\` ON \`_cases_v_version_evidence\` (\`filed_by_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`categories_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`title\` text,
  	\`url\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`categories_breadcrumbs_order_idx\` ON \`categories_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`categories_breadcrumbs_parent_id_idx\` ON \`categories_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`categories_breadcrumbs_doc_idx\` ON \`categories_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_categories_v_version_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`title\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_categories_v_version_breadcrumbs_order_idx\` ON \`_categories_v_version_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_categories_v_version_breadcrumbs_parent_id_idx\` ON \`_categories_v_version_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_categories_v_version_breadcrumbs_doc_idx\` ON \`_categories_v_version_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`closing_entries_closing_entries\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence_number\` numeric NOT NULL,
  	\`journal_entry_id_id\` text(36) NOT NULL,
  	\`entry_description\` text NOT NULL,
  	\`accounts_closed\` text,
  	\`net_amount\` numeric NOT NULL,
  	\`retained_earnings_impact\` numeric,
  	\`posted\` integer DEFAULT false,
  	\`posted_date\` text,
  	\`reversing_entry_id_id\` text(36),
  	\`notes\` text,
  	FOREIGN KEY (\`journal_entry_id_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reversing_entry_id_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`closing_entries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`closing_entries_closing_entries_order_idx\` ON \`closing_entries_closing_entries\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`closing_entries_closing_entries_parent_id_idx\` ON \`closing_entries_closing_entries\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`closing_entries_closing_entries_journal_entry_id_idx\` ON \`closing_entries_closing_entries\` (\`journal_entry_id_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`closing_entries_closing_entries_reversing_entry_id_idx\` ON \`closing_entries_closing_entries\` (\`reversing_entry_id_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_closing_entries_v_version_closing_entries\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`sequence_number\` numeric NOT NULL,
  	\`journal_entry_id_id\` text(36) NOT NULL,
  	\`entry_description\` text NOT NULL,
  	\`accounts_closed\` text,
  	\`net_amount\` numeric NOT NULL,
  	\`retained_earnings_impact\` numeric,
  	\`posted\` integer DEFAULT false,
  	\`posted_date\` text,
  	\`reversing_entry_id_id\` text(36),
  	\`notes\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`journal_entry_id_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reversing_entry_id_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_closing_entries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_closing_entries_v_version_closing_entries_order_idx\` ON \`_closing_entries_v_version_closing_entries\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_closing_entries_v_version_closing_entries_parent_id_idx\` ON \`_closing_entries_v_version_closing_entries\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_closing_entries_v_version_closing_entries_journal_entry_idx\` ON \`_closing_entries_v_version_closing_entries\` (\`journal_entry_id_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_closing_entries_v_version_closing_entries_reversing_ent_idx\` ON \`_closing_entries_v_version_closing_entries\` (\`reversing_entry_id_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`compliance_deadlines_notifications_not_656a9725\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`compliance_deadlines_notifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`compliance_deadlines_notifications_not_656a9725_order_idx\` ON \`compliance_deadlines_notifications_not_656a9725\` (\`order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`compliance_deadlines_notifications_not_656a9725_parent_idx\` ON \`compliance_deadlines_notifications_not_656a9725\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`compliance_deadlines_notifications_rec_53bc7822\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`recipient_email\` text,
  	\`recipient_role\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`compliance_deadlines_notifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`compliance_deadlines_notifications_rec_53bc7822_order_idx\` ON \`compliance_deadlines_notifications_rec_53bc7822\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`compliance_deadlines_notifications_rec_53bc7822_parent_id_idx\` ON \`compliance_deadlines_notifications_rec_53bc7822\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`compliance_deadlines_notifications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`notification_title\` text NOT NULL,
  	\`notification_content\` text,
  	\`days_before_due\` numeric NOT NULL,
  	\`sent_date\` text,
  	\`status\` text DEFAULT 'scheduled',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`compliance_deadlines\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`compliance_deadlines_notifications_order_idx\` ON \`compliance_deadlines_notifications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`compliance_deadlines_notifications_parent_id_idx\` ON \`compliance_deadlines_notifications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_compliance_deadlines_notifications_not_656a9725_v\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_compliance_deadlines_v_version_notifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_compliance_deadlines_notifications_not_656a9725_v_order_idx\` ON \`_compliance_deadlines_notifications_not_656a9725_v\` (\`order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_compliance_deadlines_notifications_not_656a9725_v_parent_idx\` ON \`_compliance_deadlines_notifications_not_656a9725_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_compliance_deadlines_notifications_rec_53bc7822_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`recipient_email\` text,
  	\`recipient_role\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_compliance_deadlines_v_version_notifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_compliance_deadlines_notifications_rec_53bc7822_v_order_idx\` ON \`_compliance_deadlines_notifications_rec_53bc7822_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_compliance_deadlines_notifications_rec_53bc7822_v_parent_id_idx\` ON \`_compliance_deadlines_notifications_rec_53bc7822_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_compliance_deadlines_v_version_notifications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`notification_title\` text NOT NULL,
  	\`notification_content\` text,
  	\`days_before_due\` numeric NOT NULL,
  	\`sent_date\` text,
  	\`status\` text DEFAULT 'scheduled',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_compliance_deadlines_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_compliance_deadlines_v_version_notifications_order_idx\` ON \`_compliance_deadlines_v_version_notifications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_compliance_deadlines_v_version_notifications_parent_id_idx\` ON \`_compliance_deadlines_v_version_notifications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`consolidation_eliminations_subsidiarie_739a79cf\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`role\` text DEFAULT 'subsidiary',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`consolidation_eliminations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`consolidation_eliminations_subsidiarie_739a79cf_order_idx\` ON \`consolidation_eliminations_subsidiarie_739a79cf\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`consolidation_eliminations_subsidiarie_739a79cf_parent_id_idx\` ON \`consolidation_eliminations_subsidiarie_739a79cf\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_consolidation_eliminations_subsidiarie_739a79cf_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`role\` text DEFAULT 'subsidiary',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_consolidation_eliminations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_consolidation_eliminations_subsidiarie_739a79cf_v_order_idx\` ON \`_consolidation_eliminations_subsidiarie_739a79cf_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_consolidation_eliminations_subsidiarie_739a79cf_v_parent_id_idx\` ON \`_consolidation_eliminations_subsidiarie_739a79cf_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`consolidations_elimination_entries\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence_number\` numeric NOT NULL,
  	\`journal_entry_id_id\` text(36),
  	\`from_entity\` text NOT NULL,
  	\`to_entity\` text NOT NULL,
  	\`account\` text NOT NULL,
  	\`account_type\` text,
  	\`elimination_amount\` numeric NOT NULL,
  	\`description\` text,
  	\`posted\` integer DEFAULT false,
  	\`posted_date\` text,
  	FOREIGN KEY (\`journal_entry_id_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`consolidations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`consolidations_elimination_entries_order_idx\` ON \`consolidations_elimination_entries\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`consolidations_elimination_entries_parent_id_idx\` ON \`consolidations_elimination_entries\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`consolidations_elimination_entries_journal_entry_id_idx\` ON \`consolidations_elimination_entries\` (\`journal_entry_id_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_consolidations_v_version_elimination_entries\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`sequence_number\` numeric NOT NULL,
  	\`journal_entry_id_id\` text(36),
  	\`from_entity\` text NOT NULL,
  	\`to_entity\` text NOT NULL,
  	\`account\` text NOT NULL,
  	\`account_type\` text,
  	\`elimination_amount\` numeric NOT NULL,
  	\`description\` text,
  	\`posted\` integer DEFAULT false,
  	\`posted_date\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`journal_entry_id_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_consolidations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_consolidations_v_version_elimination_entries_order_idx\` ON \`_consolidations_v_version_elimination_entries\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_consolidations_v_version_elimination_entries_parent_id_idx\` ON \`_consolidations_v_version_elimination_entries\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_consolidations_v_version_elimination_entries_journal_en_idx\` ON \`_consolidations_v_version_elimination_entries\` (\`journal_entry_id_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`contracts_modifications\` (
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
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`contracts_modifications_order_idx\` ON \`contracts_modifications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`contracts_modifications_parent_id_idx\` ON \`contracts_modifications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`contracts_modifications_modified_by_idx\` ON \`contracts_modifications\` (\`modified_by_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`contracts_modifications_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contracts_modifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`contracts_modifications_locales_locale_parent_id_unique\` ON \`contracts_modifications_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_contracts_v_version_modifications\` (
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
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_contracts_v_version_modifications_order_idx\` ON \`_contracts_v_version_modifications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_contracts_v_version_modifications_parent_id_idx\` ON \`_contracts_v_version_modifications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_contracts_v_version_modifications_modified_by_idx\` ON \`_contracts_v_version_modifications\` (\`modified_by_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_contracts_v_version_modifications_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_contracts_v_version_modifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_contracts_v_version_modifications_locales_locale_parent_id_\` ON \`_contracts_v_version_modifications_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`cost_centers_allocation_rules\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`target_cost_center_id\` text(36),
  	\`basis\` text,
  	\`percentage\` numeric,
  	FOREIGN KEY (\`target_cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`cost_centers_allocation_rules_order_idx\` ON \`cost_centers_allocation_rules\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`cost_centers_allocation_rules_parent_id_idx\` ON \`cost_centers_allocation_rules\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`cost_centers_allocation_rules_target_cost_center_idx\` ON \`cost_centers_allocation_rules\` (\`target_cost_center_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`cost_centers_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`cost_centers_breadcrumbs_order_idx\` ON \`cost_centers_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`cost_centers_breadcrumbs_parent_id_idx\` ON \`cost_centers_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`cost_centers_breadcrumbs_locale_idx\` ON \`cost_centers_breadcrumbs\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`cost_centers_breadcrumbs_doc_idx\` ON \`cost_centers_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_cost_centers_v_version_allocation_rules\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`target_cost_center_id\` text(36),
  	\`basis\` text,
  	\`percentage\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`target_cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_cost_centers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_cost_centers_v_version_allocation_rules_order_idx\` ON \`_cost_centers_v_version_allocation_rules\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_cost_centers_v_version_allocation_rules_parent_id_idx\` ON \`_cost_centers_v_version_allocation_rules\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_cost_centers_v_version_allocation_rules_target_cost_cen_idx\` ON \`_cost_centers_v_version_allocation_rules\` (\`target_cost_center_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_cost_centers_v_version_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_cost_centers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_cost_centers_v_version_breadcrumbs_order_idx\` ON \`_cost_centers_v_version_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_cost_centers_v_version_breadcrumbs_parent_id_idx\` ON \`_cost_centers_v_version_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_cost_centers_v_version_breadcrumbs_locale_idx\` ON \`_cost_centers_v_version_breadcrumbs\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_cost_centers_v_version_breadcrumbs_doc_idx\` ON \`_cost_centers_v_version_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`credit_memos_refunds\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`method\` text NOT NULL,
  	\`stripe_refund_id\` text,
  	\`status\` text DEFAULT 'pending' NOT NULL,
  	\`refunded_at\` text,
  	\`settled_at\` text,
  	\`failure_reason\` text,
  	\`journal_entry_id\` text(36),
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`credit_memos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`credit_memos_refunds_order_idx\` ON \`credit_memos_refunds\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`credit_memos_refunds_parent_id_idx\` ON \`credit_memos_refunds\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`credit_memos_refunds_journal_entry_idx\` ON \`credit_memos_refunds\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_credit_memos_v_version_refunds\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`method\` text NOT NULL,
  	\`stripe_refund_id\` text,
  	\`status\` text DEFAULT 'pending' NOT NULL,
  	\`refunded_at\` text,
  	\`settled_at\` text,
  	\`failure_reason\` text,
  	\`journal_entry_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_credit_memos_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_credit_memos_v_version_refunds_order_idx\` ON \`_credit_memos_v_version_refunds\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_credit_memos_v_version_refunds_parent_id_idx\` ON \`_credit_memos_v_version_refunds\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_credit_memos_v_version_refunds_journal_entry_idx\` ON \`_credit_memos_v_version_refunds\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`customs_declarations_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`description\` text NOT NULL,
  	\`hs_code\` text NOT NULL,
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`net_weight\` numeric,
  	\`gross_weight\` numeric,
  	\`declared_value\` numeric NOT NULL,
  	\`preferential_origin\` integer DEFAULT false,
  	\`tariff_preference_code\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`customs_declarations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`customs_declarations_lines_order_idx\` ON \`customs_declarations_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`customs_declarations_lines_parent_id_idx\` ON \`customs_declarations_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`customs_declarations_lines_item_idx\` ON \`customs_declarations_lines\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_customs_declarations_v_version_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`description\` text NOT NULL,
  	\`hs_code\` text NOT NULL,
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`net_weight\` numeric,
  	\`gross_weight\` numeric,
  	\`declared_value\` numeric NOT NULL,
  	\`preferential_origin\` integer DEFAULT false,
  	\`tariff_preference_code\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_customs_declarations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_customs_declarations_v_version_lines_order_idx\` ON \`_customs_declarations_v_version_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_customs_declarations_v_version_lines_parent_id_idx\` ON \`_customs_declarations_v_version_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_customs_declarations_v_version_lines_item_idx\` ON \`_customs_declarations_v_version_lines\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`data_processing_activities_data_catego_89747974\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`special\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`data_processing_activities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`data_processing_activities_data_catego_89747974_order_idx\` ON \`data_processing_activities_data_catego_89747974\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`data_processing_activities_data_catego_89747974_parent_id_idx\` ON \`data_processing_activities_data_catego_89747974\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`data_processing_activities_data_subjec_4b2d0cf9\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`data_processing_activities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`data_processing_activities_data_subjec_4b2d0cf9_order_idx\` ON \`data_processing_activities_data_subjec_4b2d0cf9\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`data_processing_activities_data_subjec_4b2d0cf9_parent_id_idx\` ON \`data_processing_activities_data_subjec_4b2d0cf9\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`data_processing_activities_recipient_c_d5b0fb68\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`data_processing_activities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`data_processing_activities_recipient_c_d5b0fb68_order_idx\` ON \`data_processing_activities_recipient_c_d5b0fb68\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`data_processing_activities_recipient_c_d5b0fb68_parent_id_idx\` ON \`data_processing_activities_recipient_c_d5b0fb68\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`data_processing_activities_recipient_c_d5b0fb68_locales\` (
  	\`recipient\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`data_processing_activities_recipient_c_d5b0fb68\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`data_processing_activities_recipient_c_d5b0fb68_locales_loca\` ON \`data_processing_activities_recipient_c_d5b0fb68_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_data_processing_activities_data_catego_89747974_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`special\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_data_processing_activities_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_data_processing_activities_data_catego_89747974_v_order_idx\` ON \`_data_processing_activities_data_catego_89747974_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_data_processing_activities_data_catego_89747974_v_parent_id_idx\` ON \`_data_processing_activities_data_catego_89747974_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_data_processing_activities_data_subjec_4b2d0cf9_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_data_processing_activities_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_data_processing_activities_data_subjec_4b2d0cf9_v_order_idx\` ON \`_data_processing_activities_data_subjec_4b2d0cf9_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_data_processing_activities_data_subjec_4b2d0cf9_v_parent_id_idx\` ON \`_data_processing_activities_data_subjec_4b2d0cf9_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_data_processing_activities_recipient_c_d5b0fb68_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_data_processing_activities_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_data_processing_activities_recipient_c_d5b0fb68_v_order_idx\` ON \`_data_processing_activities_recipient_c_d5b0fb68_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_data_processing_activities_recipient_c_d5b0fb68_v_parent_id_idx\` ON \`_data_processing_activities_recipient_c_d5b0fb68_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_data_processing_activities_recipient_c_d5b0fb68_v_locales\` (
  	\`recipient\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_data_processing_activities_recipient_c_d5b0fb68_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_data_processing_activities_recipient_c_d5b0fb68_v_locales_l\` ON \`_data_processing_activities_recipient_c_d5b0fb68_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`debt_schedule_repayment_schedule\` (
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
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`debt_schedule_repayment_schedule_order_idx\` ON \`debt_schedule_repayment_schedule\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`debt_schedule_repayment_schedule_parent_id_idx\` ON \`debt_schedule_repayment_schedule\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`debt_schedule_financial_covenants\` (
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
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`debt_schedule_financial_covenants_order_idx\` ON \`debt_schedule_financial_covenants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`debt_schedule_financial_covenants_parent_id_idx\` ON \`debt_schedule_financial_covenants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_debt_schedule_v_version_repayment_schedule\` (
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
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_debt_schedule_v_version_repayment_schedule_order_idx\` ON \`_debt_schedule_v_version_repayment_schedule\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_debt_schedule_v_version_repayment_schedule_parent_id_idx\` ON \`_debt_schedule_v_version_repayment_schedule\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_debt_schedule_v_version_financial_covenants\` (
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
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_debt_schedule_v_version_financial_covenants_order_idx\` ON \`_debt_schedule_v_version_financial_covenants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_debt_schedule_v_version_financial_covenants_parent_id_idx\` ON \`_debt_schedule_v_version_financial_covenants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`disclosure_checklists_disclosure_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`disclosure_title\` text NOT NULL,
  	\`disclosure_requirement\` text NOT NULL,
  	\`applicability\` text NOT NULL,
  	\`applicability_condition\` text,
  	\`completion_status\` text DEFAULT 'not-started' NOT NULL,
  	\`assigned_to\` text,
  	\`target_date\` text,
  	\`completion_date\` text,
  	\`notes\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`disclosure_checklists\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`disclosure_checklists_disclosure_items_order_idx\` ON \`disclosure_checklists_disclosure_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`disclosure_checklists_disclosure_items_parent_id_idx\` ON \`disclosure_checklists_disclosure_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_disclosure_checklists_v_version_disclosure_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`disclosure_title\` text NOT NULL,
  	\`disclosure_requirement\` text NOT NULL,
  	\`applicability\` text NOT NULL,
  	\`applicability_condition\` text,
  	\`completion_status\` text DEFAULT 'not-started' NOT NULL,
  	\`assigned_to\` text,
  	\`target_date\` text,
  	\`completion_date\` text,
  	\`notes\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_disclosure_checklists_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_disclosure_checklists_v_version_disclosure_items_order_idx\` ON \`_disclosure_checklists_v_version_disclosure_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_disclosure_checklists_v_version_disclosure_items_parent_id_idx\` ON \`_disclosure_checklists_v_version_disclosure_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`dunning_cycles_history\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`stage\` text NOT NULL,
  	\`entered_at\` text NOT NULL,
  	\`amount_overdue_at_entry\` numeric,
  	\`communication_sent\` text,
  	\`communication_reference\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`dunning_cycles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`dunning_cycles_history_order_idx\` ON \`dunning_cycles_history\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`dunning_cycles_history_parent_id_idx\` ON \`dunning_cycles_history\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`dunning_cycles_history_locales\` (
  	\`notes\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`dunning_cycles_history\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`dunning_cycles_history_locales_locale_parent_id_unique\` ON \`dunning_cycles_history_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_dunning_cycles_v_version_history\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`stage\` text NOT NULL,
  	\`entered_at\` text NOT NULL,
  	\`amount_overdue_at_entry\` numeric,
  	\`communication_sent\` text,
  	\`communication_reference\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_dunning_cycles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_dunning_cycles_v_version_history_order_idx\` ON \`_dunning_cycles_v_version_history\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_dunning_cycles_v_version_history_parent_id_idx\` ON \`_dunning_cycles_v_version_history\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_dunning_cycles_v_version_history_locales\` (
  	\`notes\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_dunning_cycles_v_version_history\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_dunning_cycles_v_version_history_locales_locale_parent_id_u\` ON \`_dunning_cycles_v_version_history_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`employees_competencies\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`competency\` text NOT NULL,
  	\`proficiency\` numeric,
  	\`assessed_at\` text,
  	\`evidence\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`employees_competencies_order_idx\` ON \`employees_competencies\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`employees_competencies_parent_id_idx\` ON \`employees_competencies\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`employees_competencies_competency_idx\` ON \`employees_competencies\` (\`competency\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_employees_v_version_competencies\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`competency\` text NOT NULL,
  	\`proficiency\` numeric,
  	\`assessed_at\` text,
  	\`evidence\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_employees_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_employees_v_version_competencies_order_idx\` ON \`_employees_v_version_competencies\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_employees_v_version_competencies_parent_id_idx\` ON \`_employees_v_version_competencies\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_employees_v_version_competencies_competency_idx\` ON \`_employees_v_version_competencies\` (\`competency\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`entity_types_jurisdiction_applicabilit_f34fbcd4\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`jurisdiction\` text NOT NULL,
  	\`applicable_in_jurisdiction\` integer DEFAULT true,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`entity_types\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`entity_types_jurisdiction_applicabilit_f34fbcd4_order_idx\` ON \`entity_types_jurisdiction_applicabilit_f34fbcd4\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`entity_types_jurisdiction_applicabilit_f34fbcd4_parent_id_idx\` ON \`entity_types_jurisdiction_applicabilit_f34fbcd4\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_entity_types_jurisdiction_applicabilit_f34fbcd4_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`jurisdiction\` text NOT NULL,
  	\`applicable_in_jurisdiction\` integer DEFAULT true,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_entity_types_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_entity_types_jurisdiction_applicabilit_f34fbcd4_v_order_idx\` ON \`_entity_types_jurisdiction_applicabilit_f34fbcd4_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_entity_types_jurisdiction_applicabilit_f34fbcd4_v_parent_id_idx\` ON \`_entity_types_jurisdiction_applicabilit_f34fbcd4_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`financial_statements_financial_ratios\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`ratio_name\` text NOT NULL,
  	\`ratio_value\` numeric NOT NULL,
  	\`category\` text NOT NULL,
  	\`interpretation\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`financial_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`financial_statements_financial_ratios_order_idx\` ON \`financial_statements_financial_ratios\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`financial_statements_financial_ratios_parent_id_idx\` ON \`financial_statements_financial_ratios\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`financial_statements_export_formats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`format\` text NOT NULL,
  	\`file_url\` text,
  	\`generated_at\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`financial_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`financial_statements_export_formats_order_idx\` ON \`financial_statements_export_formats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`financial_statements_export_formats_parent_id_idx\` ON \`financial_statements_export_formats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_financial_statements_v_version_financial_ratios\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`ratio_name\` text NOT NULL,
  	\`ratio_value\` numeric NOT NULL,
  	\`category\` text NOT NULL,
  	\`interpretation\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_financial_statements_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_financial_statements_v_version_financial_ratios_order_idx\` ON \`_financial_statements_v_version_financial_ratios\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_financial_statements_v_version_financial_ratios_parent_id_idx\` ON \`_financial_statements_v_version_financial_ratios\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_financial_statements_v_version_export_formats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`format\` text NOT NULL,
  	\`file_url\` text,
  	\`generated_at\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_financial_statements_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_financial_statements_v_version_export_formats_order_idx\` ON \`_financial_statements_v_version_export_formats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_financial_statements_v_version_export_formats_parent_id_idx\` ON \`_financial_statements_v_version_export_formats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`fiscal_devices_tax_groups\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`group\` text,
  	\`rate\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`fiscal_devices\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`fiscal_devices_tax_groups_order_idx\` ON \`fiscal_devices_tax_groups\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`fiscal_devices_tax_groups_parent_id_idx\` ON \`fiscal_devices_tax_groups\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_fiscal_devices_v_version_tax_groups\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`group\` text,
  	\`rate\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_fiscal_devices_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_fiscal_devices_v_version_tax_groups_order_idx\` ON \`_fiscal_devices_v_version_tax_groups\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_fiscal_devices_v_version_tax_groups_parent_id_idx\` ON \`_fiscal_devices_v_version_tax_groups\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`gl_accounts_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`gl_accounts_tags_order_idx\` ON \`gl_accounts_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`gl_accounts_tags_parent_id_idx\` ON \`gl_accounts_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_gl_accounts_v_version_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_gl_accounts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_gl_accounts_v_version_tags_order_idx\` ON \`_gl_accounts_v_version_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_gl_accounts_v_version_tags_parent_id_idx\` ON \`_gl_accounts_v_version_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`gl_postings_admin_override_history\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`overridden_by\` text,
  	\`override_date\` text,
  	\`override_reason\` text NOT NULL,
  	\`prior_value\` text,
  	\`new_value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`gl_postings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`gl_postings_admin_override_history_order_idx\` ON \`gl_postings_admin_override_history\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`gl_postings_admin_override_history_parent_id_idx\` ON \`gl_postings_admin_override_history\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`gl_postings_accounts_affected\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`gl_account_id\` text NOT NULL,
  	\`account_number\` text,
  	\`account_name\` text,
  	\`debit_amount\` numeric DEFAULT 0,
  	\`credit_amount\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`gl_postings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`gl_postings_accounts_affected_order_idx\` ON \`gl_postings_accounts_affected\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`gl_postings_accounts_affected_parent_id_idx\` ON \`gl_postings_accounts_affected\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`gl_postings_accounts_affected_gl_account_idx\` ON \`gl_postings_accounts_affected\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_gl_postings_v_version_admin_override_history\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`overridden_by\` text,
  	\`override_date\` text,
  	\`override_reason\` text NOT NULL,
  	\`prior_value\` text,
  	\`new_value\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_gl_postings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_gl_postings_v_version_admin_override_history_order_idx\` ON \`_gl_postings_v_version_admin_override_history\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_gl_postings_v_version_admin_override_history_parent_id_idx\` ON \`_gl_postings_v_version_admin_override_history\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_gl_postings_v_version_accounts_affected\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`gl_account_id\` text NOT NULL,
  	\`account_number\` text,
  	\`account_name\` text,
  	\`debit_amount\` numeric DEFAULT 0,
  	\`credit_amount\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`_uuid\` text,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_gl_postings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_gl_postings_v_version_accounts_affected_order_idx\` ON \`_gl_postings_v_version_accounts_affected\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_gl_postings_v_version_accounts_affected_parent_id_idx\` ON \`_gl_postings_v_version_accounts_affected\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_gl_postings_v_version_accounts_affected_gl_account_idx\` ON \`_gl_postings_v_version_accounts_affected\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`goods_receipts_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity_received\` numeric NOT NULL,
  	\`quantity_damaged\` numeric DEFAULT 0,
  	\`condition\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`goods_receipts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`goods_receipts_lines_order_idx\` ON \`goods_receipts_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`goods_receipts_lines_parent_id_idx\` ON \`goods_receipts_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`goods_receipts_lines_item_idx\` ON \`goods_receipts_lines\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`goods_receipts_lines_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`goods_receipts_lines\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`goods_receipts_lines_locales_locale_parent_id_unique\` ON \`goods_receipts_lines_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_goods_receipts_v_version_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity_received\` numeric NOT NULL,
  	\`quantity_damaged\` numeric DEFAULT 0,
  	\`condition\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_goods_receipts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_goods_receipts_v_version_lines_order_idx\` ON \`_goods_receipts_v_version_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_goods_receipts_v_version_lines_parent_id_idx\` ON \`_goods_receipts_v_version_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_goods_receipts_v_version_lines_item_idx\` ON \`_goods_receipts_v_version_lines\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_goods_receipts_v_version_lines_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_goods_receipts_v_version_lines\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_goods_receipts_v_version_lines_locales_locale_parent_id_uni\` ON \`_goods_receipts_v_version_lines_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`internal_audit_function_audit_engageme_2ed33191\` (
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
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`internal_audit_function_audit_engageme_2ed33191_order_idx\` ON \`internal_audit_function_audit_engageme_2ed33191\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`internal_audit_function_audit_engageme_2ed33191_parent_id_idx\` ON \`internal_audit_function_audit_engageme_2ed33191\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`internal_audit_function_follow_up_trac_a2509c33\` (
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
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`internal_audit_function_follow_up_trac_a2509c33_order_idx\` ON \`internal_audit_function_follow_up_trac_a2509c33\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`internal_audit_function_follow_up_trac_a2509c33_parent_id_idx\` ON \`internal_audit_function_follow_up_trac_a2509c33\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_internal_audit_function_audit_engageme_2ed33191_v\` (
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
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_internal_audit_function_audit_engageme_2ed33191_v_order_idx\` ON \`_internal_audit_function_audit_engageme_2ed33191_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_internal_audit_function_audit_engageme_2ed33191_v_parent_id_idx\` ON \`_internal_audit_function_audit_engageme_2ed33191_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_internal_audit_function_follow_up_trac_a2509c33_v\` (
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
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_internal_audit_function_follow_up_trac_a2509c33_v_order_idx\` ON \`_internal_audit_function_follow_up_trac_a2509c33_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_internal_audit_function_follow_up_trac_a2509c33_v_parent_id_idx\` ON \`_internal_audit_function_follow_up_trac_a2509c33_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`invoices_vat_breakdown\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category_code\` text NOT NULL,
  	\`rate\` numeric,
  	\`taxable_amount\` numeric NOT NULL,
  	\`tax_amount\` numeric NOT NULL,
  	\`exemption_reason_code\` text,
  	\`exemption_reason\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`invoices_vat_breakdown_order_idx\` ON \`invoices_vat_breakdown\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`invoices_vat_breakdown_parent_id_idx\` ON \`invoices_vat_breakdown\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_invoices_v_version_vat_breakdown\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`category_code\` text NOT NULL,
  	\`rate\` numeric,
  	\`taxable_amount\` numeric NOT NULL,
  	\`tax_amount\` numeric NOT NULL,
  	\`exemption_reason_code\` text,
  	\`exemption_reason\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_invoices_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_invoices_v_version_vat_breakdown_order_idx\` ON \`_invoices_v_version_vat_breakdown\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_invoices_v_version_vat_breakdown_parent_id_idx\` ON \`_invoices_v_version_vat_breakdown\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`job_positions_required_competencies\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`competency\` text NOT NULL,
  	\`min_proficiency\` numeric,
  	\`mandatory\` integer DEFAULT true,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_positions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`job_positions_required_competencies_order_idx\` ON \`job_positions_required_competencies\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`job_positions_required_competencies_parent_id_idx\` ON \`job_positions_required_competencies\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`job_positions_required_competencies_competency_idx\` ON \`job_positions_required_competencies\` (\`competency\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_job_positions_v_version_required_competencies\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`competency\` text NOT NULL,
  	\`min_proficiency\` numeric,
  	\`mandatory\` integer DEFAULT true,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_job_positions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_job_positions_v_version_required_competencies_order_idx\` ON \`_job_positions_v_version_required_competencies\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_job_positions_v_version_required_competencies_parent_id_idx\` ON \`_job_positions_v_version_required_competencies\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_job_positions_v_version_required_competencies_competenc_idx\` ON \`_job_positions_v_version_required_competencies\` (\`competency\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`journal_entries_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`line_number\` numeric DEFAULT 1,
  	\`gl_account_id\` text NOT NULL,
  	\`account_number\` text,
  	\`account_name\` text,
  	\`debit\` numeric DEFAULT 0,
  	\`credit\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`exchange_rate\` numeric DEFAULT 1,
  	\`cost_center_id\` text,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`journal_entries_lines_order_idx\` ON \`journal_entries_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`journal_entries_lines_parent_id_idx\` ON \`journal_entries_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`journal_entries_lines_gl_account_idx\` ON \`journal_entries_lines\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`journal_entries_lines_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`journal_entries_lines\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`journal_entries_lines_locales_locale_parent_id_unique\` ON \`journal_entries_lines_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_journal_entries_v_version_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`line_number\` numeric DEFAULT 1,
  	\`gl_account_id\` text NOT NULL,
  	\`account_number\` text,
  	\`account_name\` text,
  	\`debit\` numeric DEFAULT 0,
  	\`credit\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`exchange_rate\` numeric DEFAULT 1,
  	\`cost_center_id\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_journal_entries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_journal_entries_v_version_lines_order_idx\` ON \`_journal_entries_v_version_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_journal_entries_v_version_lines_parent_id_idx\` ON \`_journal_entries_v_version_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_journal_entries_v_version_lines_gl_account_idx\` ON \`_journal_entries_v_version_lines\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_journal_entries_v_version_lines_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_journal_entries_v_version_lines\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_journal_entries_v_version_lines_locales_locale_parent_id_un\` ON \`_journal_entries_v_version_lines_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`kyc_checks_identity_documents\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_type\` text,
  	\`doc_number\` text,
  	\`issuing_country\` text,
  	\`expires_at\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`kyc_checks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`kyc_checks_identity_documents_order_idx\` ON \`kyc_checks_identity_documents\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`kyc_checks_identity_documents_parent_id_idx\` ON \`kyc_checks_identity_documents\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_kyc_checks_v_version_identity_documents\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`doc_type\` text,
  	\`doc_number\` text,
  	\`issuing_country\` text,
  	\`expires_at\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_kyc_checks_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_kyc_checks_v_version_identity_documents_order_idx\` ON \`_kyc_checks_v_version_identity_documents\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_kyc_checks_v_version_identity_documents_parent_id_idx\` ON \`_kyc_checks_v_version_identity_documents\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`leases_modifications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`effective_date\` text NOT NULL,
  	\`kind\` text NOT NULL,
  	\`new_discount_rate_percent\` numeric,
  	\`new_fixed_payment\` numeric,
  	\`new_end_date\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`leases\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`leases_modifications_order_idx\` ON \`leases_modifications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`leases_modifications_parent_id_idx\` ON \`leases_modifications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`leases_modifications_locales\` (
  	\`notes\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`leases_modifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`leases_modifications_locales_locale_parent_id_unique\` ON \`leases_modifications_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_leases_v_version_modifications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`effective_date\` text NOT NULL,
  	\`kind\` text NOT NULL,
  	\`new_discount_rate_percent\` numeric,
  	\`new_fixed_payment\` numeric,
  	\`new_end_date\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_leases_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_leases_v_version_modifications_order_idx\` ON \`_leases_v_version_modifications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_leases_v_version_modifications_parent_id_idx\` ON \`_leases_v_version_modifications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_leases_v_version_modifications_locales\` (
  	\`notes\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_leases_v_version_modifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_leases_v_version_modifications_locales_locale_parent_id_uni\` ON \`_leases_v_version_modifications_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`legal_entities_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`legal_entities_breadcrumbs_order_idx\` ON \`legal_entities_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`legal_entities_breadcrumbs_parent_id_idx\` ON \`legal_entities_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`legal_entities_breadcrumbs_locale_idx\` ON \`legal_entities_breadcrumbs\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`legal_entities_breadcrumbs_doc_idx\` ON \`legal_entities_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_legal_entities_v_version_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_legal_entities_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_legal_entities_v_version_breadcrumbs_order_idx\` ON \`_legal_entities_v_version_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_legal_entities_v_version_breadcrumbs_parent_id_idx\` ON \`_legal_entities_v_version_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_legal_entities_v_version_breadcrumbs_locale_idx\` ON \`_legal_entities_v_version_breadcrumbs\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_legal_entities_v_version_breadcrumbs_doc_idx\` ON \`_legal_entities_v_version_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`lot_variants_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`units\` numeric,
  	\`produced\` numeric,
  	\`packed\` numeric,
  	\`shipped\` numeric,
  	\`delivered\` numeric,
  	\`ordered\` numeric,
  	\`unit_grams\` numeric,
  	\`minutes_ordered\` numeric,
  	\`minutes_produced\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`lot_variants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`lot_variants_options_order_idx\` ON \`lot_variants_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`lot_variants_options_parent_id_idx\` ON \`lot_variants_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_lot_variants_v_version_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`units\` numeric,
  	\`produced\` numeric,
  	\`packed\` numeric,
  	\`shipped\` numeric,
  	\`delivered\` numeric,
  	\`ordered\` numeric,
  	\`unit_grams\` numeric,
  	\`minutes_ordered\` numeric,
  	\`minutes_produced\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_lot_variants_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_lot_variants_v_version_options_order_idx\` ON \`_lot_variants_v_version_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_lot_variants_v_version_options_parent_id_idx\` ON \`_lot_variants_v_version_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`maintenance_work_orders_photos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`maintenance_work_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`maintenance_work_orders_photos_order_idx\` ON \`maintenance_work_orders_photos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`maintenance_work_orders_photos_parent_id_idx\` ON \`maintenance_work_orders_photos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`maintenance_work_orders_photos_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`maintenance_work_orders_photos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`maintenance_work_orders_photos_locales_locale_parent_id_uniq\` ON \`maintenance_work_orders_photos_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_maintenance_work_orders_v_version_photos\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`url\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_maintenance_work_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_maintenance_work_orders_v_version_photos_order_idx\` ON \`_maintenance_work_orders_v_version_photos\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_maintenance_work_orders_v_version_photos_parent_id_idx\` ON \`_maintenance_work_orders_v_version_photos\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_maintenance_work_orders_v_version_photos_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_maintenance_work_orders_v_version_photos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_maintenance_work_orders_v_version_photos_locales_locale_par\` ON \`_maintenance_work_orders_v_version_photos_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`management_assessment_icfr_certifying_7b6d5ba2\` (
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
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`management_assessment_icfr_certifying_7b6d5ba2_order_idx\` ON \`management_assessment_icfr_certifying_7b6d5ba2\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`management_assessment_icfr_certifying_7b6d5ba2_parent_id_idx\` ON \`management_assessment_icfr_certifying_7b6d5ba2\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`management_assessment_icfr_certifying_7b6d5ba2_signature_idx\` ON \`management_assessment_icfr_certifying_7b6d5ba2\` (\`signature_document_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_management_assessment_icfr_certifying_7b6d5ba2_v\` (
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
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_management_assessment_icfr_certifying_7b6d5ba2_v_order_idx\` ON \`_management_assessment_icfr_certifying_7b6d5ba2_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_management_assessment_icfr_certifying_7b6d5ba2_v_parent_id_idx\` ON \`_management_assessment_icfr_certifying_7b6d5ba2_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_management_assessment_icfr_certifying_7b6d5ba2_v_signat_idx\` ON \`_management_assessment_icfr_certifying_7b6d5ba2_v\` (\`signature_document_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`management_certifications_assertions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`assertion\` text,
  	\`certification_level\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`management_certifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`management_certifications_assertions_order_idx\` ON \`management_certifications_assertions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`management_certifications_assertions_parent_id_idx\` ON \`management_certifications_assertions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_management_certifications_v_version_assertions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`assertion\` text,
  	\`certification_level\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_management_certifications_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_management_certifications_v_version_assertions_order_idx\` ON \`_management_certifications_v_version_assertions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_management_certifications_v_version_assertions_parent_id_idx\` ON \`_management_certifications_v_version_assertions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`memories_related_to\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`collection\` text NOT NULL,
  	\`doc_id\` text NOT NULL,
  	\`edge_kind\` text DEFAULT 'about',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`memories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`memories_related_to_order_idx\` ON \`memories_related_to\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`memories_related_to_parent_id_idx\` ON \`memories_related_to\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_memories_v_version_related_to\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`collection\` text NOT NULL,
  	\`doc_id\` text NOT NULL,
  	\`edge_kind\` text DEFAULT 'about',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_memories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_memories_v_version_related_to_order_idx\` ON \`_memories_v_version_related_to\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_memories_v_version_related_to_parent_id_idx\` ON \`_memories_v_version_related_to\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`pack_items_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`ordered\` numeric DEFAULT 0,
  	\`packed\` numeric DEFAULT 0,
  	\`unit_grams\` numeric,
  	\`net_unit_grams\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pack_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pack_items_options_order_idx\` ON \`pack_items_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pack_items_options_parent_id_idx\` ON \`pack_items_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_pack_items_v_version_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`ordered\` numeric DEFAULT 0,
  	\`packed\` numeric DEFAULT 0,
  	\`unit_grams\` numeric,
  	\`net_unit_grams\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pack_items_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pack_items_v_version_options_order_idx\` ON \`_pack_items_v_version_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pack_items_v_version_options_parent_id_idx\` ON \`_pack_items_v_version_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`packages_contents\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36) NOT NULL,
  	\`batch_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`batch_id\`) REFERENCES \`batches\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`packages_contents_order_idx\` ON \`packages_contents\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`packages_contents_parent_id_idx\` ON \`packages_contents\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`packages_contents_item_idx\` ON \`packages_contents\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`packages_contents_batch_idx\` ON \`packages_contents\` (\`batch_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_packages_v_version_contents\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36) NOT NULL,
  	\`batch_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`batch_id\`) REFERENCES \`batches\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_packages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_packages_v_version_contents_order_idx\` ON \`_packages_v_version_contents\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_packages_v_version_contents_parent_id_idx\` ON \`_packages_v_version_contents\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_packages_v_version_contents_item_idx\` ON \`_packages_v_version_contents\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_packages_v_version_contents_batch_idx\` ON \`_packages_v_version_contents\` (\`batch_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`pages_hero_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_hero_links_order_idx\` ON \`pages_hero_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_hero_links_parent_id_idx\` ON \`pages_hero_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_hero_links_locale_idx\` ON \`pages_hero_links\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`pages_blocks_cta_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_cta_links_order_idx\` ON \`pages_blocks_cta_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_cta_links_parent_id_idx\` ON \`pages_blocks_cta_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_cta_links_locale_idx\` ON \`pages_blocks_cta_links\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`pages_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_cta_order_idx\` ON \`pages_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_cta_parent_id_idx\` ON \`pages_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_cta_path_idx\` ON \`pages_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_cta_locale_idx\` ON \`pages_blocks_cta\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`pages_blocks_content_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'oneThird',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_content_columns_order_idx\` ON \`pages_blocks_content_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_content_columns_parent_id_idx\` ON \`pages_blocks_content_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_content_columns_locale_idx\` ON \`pages_blocks_content_columns\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`pages_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_content_order_idx\` ON \`pages_blocks_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_content_parent_id_idx\` ON \`pages_blocks_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_content_path_idx\` ON \`pages_blocks_content\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_content_locale_idx\` ON \`pages_blocks_content\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`pages_blocks_media_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` text(36),
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_media_block_order_idx\` ON \`pages_blocks_media_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_media_block_parent_id_idx\` ON \`pages_blocks_media_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_media_block_path_idx\` ON \`pages_blocks_media_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_media_block_locale_idx\` ON \`pages_blocks_media_block\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_media_block_media_idx\` ON \`pages_blocks_media_block\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`pages_blocks_archive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro_content\` text,
  	\`populate_by\` text DEFAULT 'collection',
  	\`relation_to\` text DEFAULT 'posts',
  	\`limit\` numeric DEFAULT 10,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_archive_order_idx\` ON \`pages_blocks_archive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_archive_parent_id_idx\` ON \`pages_blocks_archive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_archive_path_idx\` ON \`pages_blocks_archive\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_archive_locale_idx\` ON \`pages_blocks_archive\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`pages_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_id\` text(36),
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_form_block_order_idx\` ON \`pages_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_form_block_parent_id_idx\` ON \`pages_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_form_block_path_idx\` ON \`pages_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_form_block_locale_idx\` ON \`pages_blocks_form_block\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_blocks_form_block_form_idx\` ON \`pages_blocks_form_block\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`pages_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`title\` text,
  	\`url\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_breadcrumbs_order_idx\` ON \`pages_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_breadcrumbs_parent_id_idx\` ON \`pages_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`pages_breadcrumbs_doc_idx\` ON \`pages_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_pages_v_version_hero_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_version_hero_links_order_idx\` ON \`_pages_v_version_hero_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_version_hero_links_parent_id_idx\` ON \`_pages_v_version_hero_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_version_hero_links_locale_idx\` ON \`_pages_v_version_hero_links\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_pages_v_blocks_cta_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_cta_links_order_idx\` ON \`_pages_v_blocks_cta_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_cta_links_parent_id_idx\` ON \`_pages_v_blocks_cta_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_cta_links_locale_idx\` ON \`_pages_v_blocks_cta_links\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_pages_v_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_cta_order_idx\` ON \`_pages_v_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_cta_parent_id_idx\` ON \`_pages_v_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_cta_path_idx\` ON \`_pages_v_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_cta_locale_idx\` ON \`_pages_v_blocks_cta\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_pages_v_blocks_content_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'oneThird',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_content_columns_order_idx\` ON \`_pages_v_blocks_content_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_content_columns_parent_id_idx\` ON \`_pages_v_blocks_content_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_content_columns_locale_idx\` ON \`_pages_v_blocks_content_columns\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_pages_v_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_content_order_idx\` ON \`_pages_v_blocks_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_content_parent_id_idx\` ON \`_pages_v_blocks_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_content_path_idx\` ON \`_pages_v_blocks_content\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_content_locale_idx\` ON \`_pages_v_blocks_content\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_pages_v_blocks_media_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`media_id\` text(36),
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_media_block_order_idx\` ON \`_pages_v_blocks_media_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_media_block_parent_id_idx\` ON \`_pages_v_blocks_media_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_media_block_path_idx\` ON \`_pages_v_blocks_media_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_media_block_locale_idx\` ON \`_pages_v_blocks_media_block\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_media_block_media_idx\` ON \`_pages_v_blocks_media_block\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_pages_v_blocks_archive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`intro_content\` text,
  	\`populate_by\` text DEFAULT 'collection',
  	\`relation_to\` text DEFAULT 'posts',
  	\`limit\` numeric DEFAULT 10,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_archive_order_idx\` ON \`_pages_v_blocks_archive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_archive_parent_id_idx\` ON \`_pages_v_blocks_archive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_archive_path_idx\` ON \`_pages_v_blocks_archive\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_archive_locale_idx\` ON \`_pages_v_blocks_archive\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_pages_v_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`form_id\` text(36),
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_form_block_order_idx\` ON \`_pages_v_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_form_block_parent_id_idx\` ON \`_pages_v_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_form_block_path_idx\` ON \`_pages_v_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_form_block_locale_idx\` ON \`_pages_v_blocks_form_block\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_blocks_form_block_form_idx\` ON \`_pages_v_blocks_form_block\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_pages_v_version_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`title\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_version_breadcrumbs_order_idx\` ON \`_pages_v_version_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_version_breadcrumbs_parent_id_idx\` ON \`_pages_v_version_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_pages_v_version_breadcrumbs_doc_idx\` ON \`_pages_v_version_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`parties_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`parties_roles_order_idx\` ON \`parties_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`parties_roles_parent_idx\` ON \`parties_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`parties_roles_value_idx\` ON \`parties_roles\` (\`value\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_parties_v_version_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_parties_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_parties_v_version_roles_order_idx\` ON \`_parties_v_version_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_parties_v_version_roles_parent_idx\` ON \`_parties_v_version_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_parties_v_version_roles_value_idx\` ON \`_parties_v_version_roles\` (\`value\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`payment_runs_transactions\` (
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
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payment_runs_transactions_order_idx\` ON \`payment_runs_transactions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payment_runs_transactions_parent_id_idx\` ON \`payment_runs_transactions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payment_runs_transactions_source_bill_idx\` ON \`payment_runs_transactions\` (\`source_bill_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payment_runs_transactions_payment_record_idx\` ON \`payment_runs_transactions\` (\`payment_record_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_payment_runs_v_version_transactions\` (
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
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_payment_runs_v_version_transactions_order_idx\` ON \`_payment_runs_v_version_transactions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_payment_runs_v_version_transactions_parent_id_idx\` ON \`_payment_runs_v_version_transactions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_payment_runs_v_version_transactions_source_bill_idx\` ON \`_payment_runs_v_version_transactions\` (\`source_bill_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_payment_runs_v_version_transactions_payment_record_idx\` ON \`_payment_runs_v_version_transactions\` (\`payment_record_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`payroll_runs_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`employee_id\` text(36) NOT NULL,
  	\`regular_minutes\` numeric DEFAULT 0,
  	\`overtime15_minutes\` numeric DEFAULT 0,
  	\`overtime2_minutes\` numeric DEFAULT 0,
  	\`night_shift_minutes\` numeric DEFAULT 0,
  	\`holiday_work_minutes\` numeric DEFAULT 0,
  	\`pto_minutes\` numeric DEFAULT 0,
  	\`sick_minutes\` numeric DEFAULT 0,
  	\`base_gross\` numeric NOT NULL,
  	\`overtime_gross\` numeric DEFAULT 0,
  	\`bonus_gross\` numeric DEFAULT 0,
  	\`total_gross\` numeric NOT NULL,
  	\`income_tax_withheld\` numeric DEFAULT 0,
  	\`social_security_employee\` numeric DEFAULT 0,
  	\`pension_employee\` numeric DEFAULT 0,
  	\`other_deductions\` numeric DEFAULT 0,
  	\`net_pay\` numeric NOT NULL,
  	\`social_security_employer\` numeric DEFAULT 0,
  	\`pension_employer\` numeric DEFAULT 0,
  	\`payroll_taxes_employer\` numeric DEFAULT 0,
  	\`cost_center_id\` text(36),
  	\`pay_slip_document_id\` text(36),
  	FOREIGN KEY (\`employee_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`pay_slip_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`payroll_runs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payroll_runs_lines_order_idx\` ON \`payroll_runs_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payroll_runs_lines_parent_id_idx\` ON \`payroll_runs_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payroll_runs_lines_employee_idx\` ON \`payroll_runs_lines\` (\`employee_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payroll_runs_lines_cost_center_idx\` ON \`payroll_runs_lines\` (\`cost_center_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`payroll_runs_lines_pay_slip_document_idx\` ON \`payroll_runs_lines\` (\`pay_slip_document_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_payroll_runs_v_version_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`employee_id\` text(36) NOT NULL,
  	\`regular_minutes\` numeric DEFAULT 0,
  	\`overtime15_minutes\` numeric DEFAULT 0,
  	\`overtime2_minutes\` numeric DEFAULT 0,
  	\`night_shift_minutes\` numeric DEFAULT 0,
  	\`holiday_work_minutes\` numeric DEFAULT 0,
  	\`pto_minutes\` numeric DEFAULT 0,
  	\`sick_minutes\` numeric DEFAULT 0,
  	\`base_gross\` numeric NOT NULL,
  	\`overtime_gross\` numeric DEFAULT 0,
  	\`bonus_gross\` numeric DEFAULT 0,
  	\`total_gross\` numeric NOT NULL,
  	\`income_tax_withheld\` numeric DEFAULT 0,
  	\`social_security_employee\` numeric DEFAULT 0,
  	\`pension_employee\` numeric DEFAULT 0,
  	\`other_deductions\` numeric DEFAULT 0,
  	\`net_pay\` numeric NOT NULL,
  	\`social_security_employer\` numeric DEFAULT 0,
  	\`pension_employer\` numeric DEFAULT 0,
  	\`payroll_taxes_employer\` numeric DEFAULT 0,
  	\`cost_center_id\` text(36),
  	\`pay_slip_document_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`employee_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`pay_slip_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_payroll_runs_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_payroll_runs_v_version_lines_order_idx\` ON \`_payroll_runs_v_version_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_payroll_runs_v_version_lines_parent_id_idx\` ON \`_payroll_runs_v_version_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_payroll_runs_v_version_lines_employee_idx\` ON \`_payroll_runs_v_version_lines\` (\`employee_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_payroll_runs_v_version_lines_cost_center_idx\` ON \`_payroll_runs_v_version_lines\` (\`cost_center_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_payroll_runs_v_version_lines_pay_slip_document_idx\` ON \`_payroll_runs_v_version_lines\` (\`pay_slip_document_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`posts_populated_authors\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`posts_populated_authors_order_idx\` ON \`posts_populated_authors\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`posts_populated_authors_parent_id_idx\` ON \`posts_populated_authors\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_posts_v_version_populated_authors\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_populated_authors_order_idx\` ON \`_posts_v_version_populated_authors\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_populated_authors_parent_id_idx\` ON \`_posts_v_version_populated_authors\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`receipts_vat_breakdown\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`group\` text,
  	\`rate\` numeric,
  	\`net\` numeric,
  	\`vat\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`receipts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`receipts_vat_breakdown_order_idx\` ON \`receipts_vat_breakdown\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`receipts_vat_breakdown_parent_id_idx\` ON \`receipts_vat_breakdown\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`receipts_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`description\` text,
  	\`quantity\` numeric DEFAULT 1,
  	\`unit_price\` numeric DEFAULT 0,
  	\`vat_rate\` numeric DEFAULT 0,
  	\`amount\` numeric DEFAULT 0,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`receipts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`receipts_lines_order_idx\` ON \`receipts_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`receipts_lines_parent_id_idx\` ON \`receipts_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_receipts_v_version_vat_breakdown\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`group\` text,
  	\`rate\` numeric,
  	\`net\` numeric,
  	\`vat\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_receipts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_receipts_v_version_vat_breakdown_order_idx\` ON \`_receipts_v_version_vat_breakdown\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_receipts_v_version_vat_breakdown_parent_id_idx\` ON \`_receipts_v_version_vat_breakdown\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_receipts_v_version_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`description\` text,
  	\`quantity\` numeric DEFAULT 1,
  	\`unit_price\` numeric DEFAULT 0,
  	\`vat_rate\` numeric DEFAULT 0,
  	\`amount\` numeric DEFAULT 0,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_receipts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_receipts_v_version_lines_order_idx\` ON \`_receipts_v_version_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_receipts_v_version_lines_parent_id_idx\` ON \`_receipts_v_version_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`remediation_plans_action_steps\` (
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
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`remediation_plans_action_steps_order_idx\` ON \`remediation_plans_action_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`remediation_plans_action_steps_parent_id_idx\` ON \`remediation_plans_action_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_remediation_plans_v_version_action_steps\` (
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
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_remediation_plans_v_version_action_steps_order_idx\` ON \`_remediation_plans_v_version_action_steps\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_remediation_plans_v_version_action_steps_parent_id_idx\` ON \`_remediation_plans_v_version_action_steps\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`reporting_standards_mappings_mapping_r_b810673f\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`source_element\` text,
  	\`target_element\` text,
  	\`transformation\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`reporting_standards_mappings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`reporting_standards_mappings_mapping_r_b810673f_order_idx\` ON \`reporting_standards_mappings_mapping_r_b810673f\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`reporting_standards_mappings_mapping_r_b810673f_parent_id_idx\` ON \`reporting_standards_mappings_mapping_r_b810673f\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`reporting_standards_mappings\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`mapping_name\` text NOT NULL,
  	\`to_standard_id\` text(36) NOT NULL,
  	\`mapping_type\` text NOT NULL,
  	\`status\` text DEFAULT 'pending-review',
  	FOREIGN KEY (\`to_standard_id\`) REFERENCES \`reporting_standards\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`reporting_standards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`reporting_standards_mappings_order_idx\` ON \`reporting_standards_mappings\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`reporting_standards_mappings_parent_id_idx\` ON \`reporting_standards_mappings\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`reporting_standards_mappings_to_standard_idx\` ON \`reporting_standards_mappings\` (\`to_standard_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_reporting_standards_mappings_mapping_r_b810673f_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`source_element\` text,
  	\`target_element\` text,
  	\`transformation\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_reporting_standards_v_version_mappings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_reporting_standards_mappings_mapping_r_b810673f_v_order_idx\` ON \`_reporting_standards_mappings_mapping_r_b810673f_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_reporting_standards_mappings_mapping_r_b810673f_v_parent_id_idx\` ON \`_reporting_standards_mappings_mapping_r_b810673f_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_reporting_standards_v_version_mappings\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`mapping_name\` text NOT NULL,
  	\`to_standard_id\` text(36) NOT NULL,
  	\`mapping_type\` text NOT NULL,
  	\`status\` text DEFAULT 'pending-review',
  	\`_uuid\` text,
  	FOREIGN KEY (\`to_standard_id\`) REFERENCES \`reporting_standards\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_reporting_standards_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_reporting_standards_v_version_mappings_order_idx\` ON \`_reporting_standards_v_version_mappings\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_reporting_standards_v_version_mappings_parent_id_idx\` ON \`_reporting_standards_v_version_mappings\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_reporting_standards_v_version_mappings_to_standard_idx\` ON \`_reporting_standards_v_version_mappings\` (\`to_standard_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`returns_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity_returned\` numeric NOT NULL,
  	\`restock\` integer DEFAULT true,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`returns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`returns_lines_order_idx\` ON \`returns_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`returns_lines_parent_id_idx\` ON \`returns_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`returns_lines_item_idx\` ON \`returns_lines\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_returns_v_version_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity_returned\` numeric NOT NULL,
  	\`restock\` integer DEFAULT true,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_returns_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_returns_v_version_lines_order_idx\` ON \`_returns_v_version_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_returns_v_version_lines_parent_id_idx\` ON \`_returns_v_version_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_returns_v_version_lines_item_idx\` ON \`_returns_v_version_lines\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`sales_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`description\` text,
  	\`quantity\` numeric DEFAULT 1,
  	\`unit_price\` numeric DEFAULT 0,
  	\`vat_rate\` numeric DEFAULT 0,
  	\`amount\` numeric DEFAULT 0,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sales\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`sales_items_order_idx\` ON \`sales_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`sales_items_parent_id_idx\` ON \`sales_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_sales_v_version_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`description\` text,
  	\`quantity\` numeric DEFAULT 1,
  	\`unit_price\` numeric DEFAULT 0,
  	\`vat_rate\` numeric DEFAULT 0,
  	\`amount\` numeric DEFAULT 0,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sales_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_sales_v_version_items_order_idx\` ON \`_sales_v_version_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_sales_v_version_items_parent_id_idx\` ON \`_sales_v_version_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`sectors_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`sectors\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sectors\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`sectors_breadcrumbs_order_idx\` ON \`sectors_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`sectors_breadcrumbs_parent_id_idx\` ON \`sectors_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`sectors_breadcrumbs_locale_idx\` ON \`sectors_breadcrumbs\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`sectors_breadcrumbs_doc_idx\` ON \`sectors_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_sectors_v_version_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`sectors\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sectors_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_sectors_v_version_breadcrumbs_order_idx\` ON \`_sectors_v_version_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_sectors_v_version_breadcrumbs_parent_id_idx\` ON \`_sectors_v_version_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_sectors_v_version_breadcrumbs_locale_idx\` ON \`_sectors_v_version_breadcrumbs\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_sectors_v_version_breadcrumbs_doc_idx\` ON \`_sectors_v_version_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`segment_reporting_identifiable_assets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`asset_category\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`segment_reporting\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`segment_reporting_identifiable_assets_order_idx\` ON \`segment_reporting_identifiable_assets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`segment_reporting_identifiable_assets_parent_id_idx\` ON \`segment_reporting_identifiable_assets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`segment_reporting_segment_geography\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`country_code\` text NOT NULL,
  	\`revenue\` numeric NOT NULL,
  	\`assets\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`segment_reporting\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`segment_reporting_segment_geography_order_idx\` ON \`segment_reporting_segment_geography\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`segment_reporting_segment_geography_parent_id_idx\` ON \`segment_reporting_segment_geography\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_segment_reporting_v_version_identifiable_assets\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`asset_category\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_segment_reporting_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_segment_reporting_v_version_identifiable_assets_order_idx\` ON \`_segment_reporting_v_version_identifiable_assets\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_segment_reporting_v_version_identifiable_assets_parent_id_idx\` ON \`_segment_reporting_v_version_identifiable_assets\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_segment_reporting_v_version_segment_geography\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`country_code\` text NOT NULL,
  	\`revenue\` numeric NOT NULL,
  	\`assets\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_segment_reporting_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_segment_reporting_v_version_segment_geography_order_idx\` ON \`_segment_reporting_v_version_segment_geography\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_segment_reporting_v_version_segment_geography_parent_id_idx\` ON \`_segment_reporting_v_version_segment_geography\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`shipments_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`shipments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`shipments_lines_order_idx\` ON \`shipments_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`shipments_lines_parent_id_idx\` ON \`shipments_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`shipments_lines_item_idx\` ON \`shipments_lines\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_shipments_v_version_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_shipments_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_shipments_v_version_lines_order_idx\` ON \`_shipments_v_version_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_shipments_v_version_lines_parent_id_idx\` ON \`_shipments_v_version_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_shipments_v_version_lines_item_idx\` ON \`_shipments_v_version_lines\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`spaces_amenities\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`spaces\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`spaces_amenities_order_idx\` ON \`spaces_amenities\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`spaces_amenities_parent_id_idx\` ON \`spaces_amenities\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_spaces_v_version_amenities\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`tag\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_spaces_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_spaces_v_version_amenities_order_idx\` ON \`_spaces_v_version_amenities\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_spaces_v_version_amenities_parent_id_idx\` ON \`_spaces_v_version_amenities\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`standards_conflicts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`other_standard_id\` text(36) NOT NULL,
  	\`law_id\` text,
  	\`severity\` text DEFAULT 'caution',
  	FOREIGN KEY (\`other_standard_id\`) REFERENCES \`standards\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`standards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`standards_conflicts_order_idx\` ON \`standards_conflicts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`standards_conflicts_parent_id_idx\` ON \`standards_conflicts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`standards_conflicts_other_standard_idx\` ON \`standards_conflicts\` (\`other_standard_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`standards_conflicts_locales\` (
  	\`rationale\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`standards_conflicts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`standards_conflicts_locales_locale_parent_id_unique\` ON \`standards_conflicts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`standards_citing_modules\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`module_path\` text NOT NULL,
  	\`banner\` text,
  	\`section\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`standards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`standards_citing_modules_order_idx\` ON \`standards_citing_modules\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`standards_citing_modules_parent_id_idx\` ON \`standards_citing_modules\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_standards_v_version_conflicts\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`other_standard_id\` text(36) NOT NULL,
  	\`law_id\` text,
  	\`severity\` text DEFAULT 'caution',
  	\`_uuid\` text,
  	FOREIGN KEY (\`other_standard_id\`) REFERENCES \`standards\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_standards_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_standards_v_version_conflicts_order_idx\` ON \`_standards_v_version_conflicts\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_standards_v_version_conflicts_parent_id_idx\` ON \`_standards_v_version_conflicts\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_standards_v_version_conflicts_other_standard_idx\` ON \`_standards_v_version_conflicts\` (\`other_standard_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_standards_v_version_conflicts_locales\` (
  	\`rationale\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_standards_v_version_conflicts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_standards_v_version_conflicts_locales_locale_parent_id_uniq\` ON \`_standards_v_version_conflicts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_standards_v_version_citing_modules\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`module_path\` text NOT NULL,
  	\`banner\` text,
  	\`section\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_standards_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_standards_v_version_citing_modules_order_idx\` ON \`_standards_v_version_citing_modules\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_standards_v_version_citing_modules_parent_id_idx\` ON \`_standards_v_version_citing_modules\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`statutory_report_templates_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_name\` text,
  	\`sequence\` numeric,
  	\`mandatory\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`statutory_report_templates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`statutory_report_templates_sections_order_idx\` ON \`statutory_report_templates_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`statutory_report_templates_sections_parent_id_idx\` ON \`statutory_report_templates_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`statutory_report_templates_field_mappi_31fb556a\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`mapping_name\` text NOT NULL,
  	\`field_name\` text NOT NULL,
  	\`field_type\` text,
  	\`source_collection\` text,
  	\`source_field\` text,
  	\`transformation\` text,
  	\`mandatory\` integer DEFAULT true,
  	\`validation_rules\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`statutory_report_templates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`statutory_report_templates_field_mappi_31fb556a_order_idx\` ON \`statutory_report_templates_field_mappi_31fb556a\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`statutory_report_templates_field_mappi_31fb556a_parent_id_idx\` ON \`statutory_report_templates_field_mappi_31fb556a\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_statutory_report_templates_v_version_sections\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`section_name\` text,
  	\`sequence\` numeric,
  	\`mandatory\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_statutory_report_templates_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_statutory_report_templates_v_version_sections_order_idx\` ON \`_statutory_report_templates_v_version_sections\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_statutory_report_templates_v_version_sections_parent_id_idx\` ON \`_statutory_report_templates_v_version_sections\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_statutory_report_templates_field_mappi_31fb556a_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`mapping_name\` text NOT NULL,
  	\`field_name\` text NOT NULL,
  	\`field_type\` text,
  	\`source_collection\` text,
  	\`source_field\` text,
  	\`transformation\` text,
  	\`mandatory\` integer DEFAULT true,
  	\`validation_rules\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_statutory_report_templates_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_statutory_report_templates_field_mappi_31fb556a_v_order_idx\` ON \`_statutory_report_templates_field_mappi_31fb556a_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_statutory_report_templates_field_mappi_31fb556a_v_parent_id_idx\` ON \`_statutory_report_templates_field_mappi_31fb556a_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`tax_jurisdictions_languages\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`language_code\` text NOT NULL,
  	\`language_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`tax_jurisdictions_languages_order_idx\` ON \`tax_jurisdictions_languages\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`tax_jurisdictions_languages_parent_id_idx\` ON \`tax_jurisdictions_languages\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`tax_jurisdictions_filing_deadlines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`filing_type\` text NOT NULL,
  	\`deadline\` text NOT NULL,
  	\`frequency\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`tax_jurisdictions_filing_deadlines_order_idx\` ON \`tax_jurisdictions_filing_deadlines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`tax_jurisdictions_filing_deadlines_parent_id_idx\` ON \`tax_jurisdictions_filing_deadlines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_tax_jurisdictions_v_version_languages\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`language_code\` text NOT NULL,
  	\`language_name\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_tax_jurisdictions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_tax_jurisdictions_v_version_languages_order_idx\` ON \`_tax_jurisdictions_v_version_languages\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_tax_jurisdictions_v_version_languages_parent_id_idx\` ON \`_tax_jurisdictions_v_version_languages\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_tax_jurisdictions_v_version_filing_deadlines\` (
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
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_tax_jurisdictions_v_version_filing_deadlines_order_idx\` ON \`_tax_jurisdictions_v_version_filing_deadlines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_tax_jurisdictions_v_version_filing_deadlines_parent_id_idx\` ON \`_tax_jurisdictions_v_version_filing_deadlines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`tax_periods_tax_adjustment_entries\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence_number\` numeric NOT NULL,
  	\`journal_entry_id_id\` text(36),
  	\`from_entity\` text NOT NULL,
  	\`to_entity\` text NOT NULL,
  	\`account\` text NOT NULL,
  	\`account_type\` text,
  	\`adjustment_amount\` numeric NOT NULL,
  	\`description\` text,
  	\`posted\` integer DEFAULT false,
  	\`posted_date\` text,
  	FOREIGN KEY (\`journal_entry_id_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tax_periods\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`tax_periods_tax_adjustment_entries_order_idx\` ON \`tax_periods_tax_adjustment_entries\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`tax_periods_tax_adjustment_entries_parent_id_idx\` ON \`tax_periods_tax_adjustment_entries\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`tax_periods_tax_adjustment_entries_journal_entry_id_idx\` ON \`tax_periods_tax_adjustment_entries\` (\`journal_entry_id_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_tax_periods_v_version_tax_adjustment_entries\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`sequence_number\` numeric NOT NULL,
  	\`journal_entry_id_id\` text(36),
  	\`from_entity\` text NOT NULL,
  	\`to_entity\` text NOT NULL,
  	\`account\` text NOT NULL,
  	\`account_type\` text,
  	\`adjustment_amount\` numeric NOT NULL,
  	\`description\` text,
  	\`posted\` integer DEFAULT false,
  	\`posted_date\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`journal_entry_id_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_tax_periods_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_tax_periods_v_version_tax_adjustment_entries_order_idx\` ON \`_tax_periods_v_version_tax_adjustment_entries\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_tax_periods_v_version_tax_adjustment_entries_parent_id_idx\` ON \`_tax_periods_v_version_tax_adjustment_entries\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_tax_periods_v_version_tax_adjustment_entries_journal_en_idx\` ON \`_tax_periods_v_version_tax_adjustment_entries\` (\`journal_entry_id_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`tax_returns_attachments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` text(36),
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tax_returns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`tax_returns_attachments_order_idx\` ON \`tax_returns_attachments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`tax_returns_attachments_parent_id_idx\` ON \`tax_returns_attachments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`tax_returns_attachments_media_idx\` ON \`tax_returns_attachments\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_tax_returns_v_version_attachments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`media_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_tax_returns_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_tax_returns_v_version_attachments_order_idx\` ON \`_tax_returns_v_version_attachments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_tax_returns_v_version_attachments_parent_id_idx\` ON \`_tax_returns_v_version_attachments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_tax_returns_v_version_attachments_media_idx\` ON \`_tax_returns_v_version_attachments\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`translations_related_to\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`collection\` text NOT NULL,
  	\`doc_id\` text NOT NULL,
  	\`edge_kind\` text DEFAULT 'translates',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`translations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`translations_related_to_order_idx\` ON \`translations_related_to\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`translations_related_to_parent_id_idx\` ON \`translations_related_to\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_translations_v_version_related_to\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`collection\` text NOT NULL,
  	\`doc_id\` text NOT NULL,
  	\`edge_kind\` text DEFAULT 'translates',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_translations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_translations_v_version_related_to_order_idx\` ON \`_translations_v_version_related_to\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_translations_v_version_related_to_parent_id_idx\` ON \`_translations_v_version_related_to\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`users_competencies\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`competency\` text NOT NULL,
  	\`proficiency\` numeric,
  	\`assessed_at\` text,
  	\`evidence\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`users_competencies_order_idx\` ON \`users_competencies\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`users_competencies_parent_id_idx\` ON \`users_competencies\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`users_competencies_competency_idx\` ON \`users_competencies\` (\`competency\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`users_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`users_roles_order_idx\` ON \`users_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`users_roles_parent_idx\` ON \`users_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`users_tenants_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users_tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`users_tenants_roles_order_idx\` ON \`users_tenants_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`users_tenants_roles_parent_idx\` ON \`users_tenants_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`users_tenants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tenant_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`users_tenants_order_idx\` ON \`users_tenants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`users_tenants_parent_id_idx\` ON \`users_tenants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`users_tenants_tenant_idx\` ON \`users_tenants\` (\`tenant_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_users_v_version_competencies\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`competency\` text NOT NULL,
  	\`proficiency\` numeric,
  	\`assessed_at\` text,
  	\`evidence\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_users_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_users_v_version_competencies_order_idx\` ON \`_users_v_version_competencies\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_users_v_version_competencies_parent_id_idx\` ON \`_users_v_version_competencies\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_users_v_version_competencies_competency_idx\` ON \`_users_v_version_competencies\` (\`competency\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_users_v_version_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_users_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_users_v_version_roles_order_idx\` ON \`_users_v_version_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_users_v_version_roles_parent_idx\` ON \`_users_v_version_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_users_v_version_tenants_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_users_v_version_tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_users_v_version_tenants_roles_order_idx\` ON \`_users_v_version_tenants_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_users_v_version_tenants_roles_parent_idx\` ON \`_users_v_version_tenants_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_users_v_version_tenants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`tenant_id\` text(36) NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_users_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_users_v_version_tenants_order_idx\` ON \`_users_v_version_tenants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_users_v_version_tenants_parent_id_idx\` ON \`_users_v_version_tenants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_users_v_version_tenants_tenant_idx\` ON \`_users_v_version_tenants\` (\`tenant_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`warehouse_locations_bins\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`bin_code\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`warehouse_locations_bins_order_idx\` ON \`warehouse_locations_bins\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`warehouse_locations_bins_parent_id_idx\` ON \`warehouse_locations_bins\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`warehouse_locations_bins_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`warehouse_locations_bins\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`warehouse_locations_bins_locales_locale_parent_id_unique\` ON \`warehouse_locations_bins_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_warehouse_locations_v_version_bins\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`bin_code\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_warehouse_locations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_warehouse_locations_v_version_bins_order_idx\` ON \`_warehouse_locations_v_version_bins\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_warehouse_locations_v_version_bins_parent_id_idx\` ON \`_warehouse_locations_v_version_bins\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_warehouse_locations_v_version_bins_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_warehouse_locations_v_version_bins\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_warehouse_locations_v_version_bins_locales_locale_parent_id\` ON \`_warehouse_locations_v_version_bins_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`work_centers_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`work_centers_breadcrumbs_order_idx\` ON \`work_centers_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`work_centers_breadcrumbs_parent_id_idx\` ON \`work_centers_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`work_centers_breadcrumbs_locale_idx\` ON \`work_centers_breadcrumbs\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`work_centers_breadcrumbs_doc_idx\` ON \`work_centers_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_work_centers_v_version_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_work_centers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_work_centers_v_version_breadcrumbs_order_idx\` ON \`_work_centers_v_version_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_work_centers_v_version_breadcrumbs_parent_id_idx\` ON \`_work_centers_v_version_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_work_centers_v_version_breadcrumbs_locale_idx\` ON \`_work_centers_v_version_breadcrumbs\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_work_centers_v_version_breadcrumbs_doc_idx\` ON \`_work_centers_v_version_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`work_orders_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`ordered\` numeric DEFAULT 0,
  	\`produced\` numeric DEFAULT 0,
  	\`backordered\` numeric DEFAULT 0,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`work_orders_options_order_idx\` ON \`work_orders_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`work_orders_options_parent_id_idx\` ON \`work_orders_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_work_orders_v_version_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`ordered\` numeric DEFAULT 0,
  	\`produced\` numeric DEFAULT 0,
  	\`backordered\` numeric DEFAULT 0,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_work_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_work_orders_v_version_options_order_idx\` ON \`_work_orders_v_version_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_work_orders_v_version_options_parent_id_idx\` ON \`_work_orders_v_version_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`work_phases_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`work_phases\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`work_phases\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`work_phases_breadcrumbs_order_idx\` ON \`work_phases_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`work_phases_breadcrumbs_parent_id_idx\` ON \`work_phases_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`work_phases_breadcrumbs_locale_idx\` ON \`work_phases_breadcrumbs\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`work_phases_breadcrumbs_doc_idx\` ON \`work_phases_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_work_phases_v_version_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`work_phases\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_work_phases_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_work_phases_v_version_breadcrumbs_order_idx\` ON \`_work_phases_v_version_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_work_phases_v_version_breadcrumbs_parent_id_idx\` ON \`_work_phases_v_version_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_work_phases_v_version_breadcrumbs_locale_idx\` ON \`_work_phases_v_version_breadcrumbs\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_work_phases_v_version_breadcrumbs_doc_idx\` ON \`_work_phases_v_version_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`products_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` text(36),
  	\`variant_option_id\` text(36),
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_option_id\`) REFERENCES \`variant_options\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_gallery_order_idx\` ON \`products_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_gallery_parent_id_idx\` ON \`products_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_gallery_image_idx\` ON \`products_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_gallery_variant_option_idx\` ON \`products_gallery\` (\`variant_option_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`products_blocks_cta_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_blocks_cta_links_order_idx\` ON \`products_blocks_cta_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_blocks_cta_links_parent_id_idx\` ON \`products_blocks_cta_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`products_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_blocks_cta_order_idx\` ON \`products_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_blocks_cta_parent_id_idx\` ON \`products_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_blocks_cta_path_idx\` ON \`products_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`products_blocks_content_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'oneThird',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_blocks_content_columns_order_idx\` ON \`products_blocks_content_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_blocks_content_columns_parent_id_idx\` ON \`products_blocks_content_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`products_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_blocks_content_order_idx\` ON \`products_blocks_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_blocks_content_parent_id_idx\` ON \`products_blocks_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_blocks_content_path_idx\` ON \`products_blocks_content\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`products_blocks_media_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` text(36),
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_blocks_media_block_order_idx\` ON \`products_blocks_media_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_blocks_media_block_parent_id_idx\` ON \`products_blocks_media_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_blocks_media_block_path_idx\` ON \`products_blocks_media_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`products_blocks_media_block_media_idx\` ON \`products_blocks_media_block\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_products_v_version_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`image_id\` text(36),
  	\`variant_option_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_option_id\`) REFERENCES \`variant_options\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_products_v_version_gallery_order_idx\` ON \`_products_v_version_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_products_v_version_gallery_parent_id_idx\` ON \`_products_v_version_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_products_v_version_gallery_image_idx\` ON \`_products_v_version_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_products_v_version_gallery_variant_option_idx\` ON \`_products_v_version_gallery\` (\`variant_option_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_products_v_blocks_cta_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_products_v_blocks_cta_links_order_idx\` ON \`_products_v_blocks_cta_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_products_v_blocks_cta_links_parent_id_idx\` ON \`_products_v_blocks_cta_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_products_v_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_products_v_blocks_cta_order_idx\` ON \`_products_v_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_products_v_blocks_cta_parent_id_idx\` ON \`_products_v_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_products_v_blocks_cta_path_idx\` ON \`_products_v_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_products_v_blocks_content_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'oneThird',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v_blocks_content\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_products_v_blocks_content_columns_order_idx\` ON \`_products_v_blocks_content_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_products_v_blocks_content_columns_parent_id_idx\` ON \`_products_v_blocks_content_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_products_v_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_products_v_blocks_content_order_idx\` ON \`_products_v_blocks_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_products_v_blocks_content_parent_id_idx\` ON \`_products_v_blocks_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_products_v_blocks_content_path_idx\` ON \`_products_v_blocks_content\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_products_v_blocks_media_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`media_id\` text(36),
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_products_v_blocks_media_block_order_idx\` ON \`_products_v_blocks_media_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_products_v_blocks_media_block_parent_id_idx\` ON \`_products_v_blocks_media_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_products_v_blocks_media_block_path_idx\` ON \`_products_v_blocks_media_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_products_v_blocks_media_block_media_idx\` ON \`_products_v_blocks_media_block\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`carts_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`product_id\` text(36),
  	\`variant_id\` text(36),
  	\`quantity\` numeric DEFAULT 1 NOT NULL,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`carts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`carts_items_order_idx\` ON \`carts_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`carts_items_parent_id_idx\` ON \`carts_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`carts_items_product_idx\` ON \`carts_items\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`carts_items_variant_idx\` ON \`carts_items\` (\`variant_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_carts_v_version_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`product_id\` text(36),
  	\`variant_id\` text(36),
  	\`quantity\` numeric DEFAULT 1 NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_carts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_carts_v_version_items_order_idx\` ON \`_carts_v_version_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_carts_v_version_items_parent_id_idx\` ON \`_carts_v_version_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_carts_v_version_items_product_idx\` ON \`_carts_v_version_items\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_carts_v_version_items_variant_idx\` ON \`_carts_v_version_items\` (\`variant_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`orders_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`product_id\` text(36),
  	\`variant_id\` text(36),
  	\`quantity\` numeric DEFAULT 1 NOT NULL,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`orders_items_order_idx\` ON \`orders_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`orders_items_parent_id_idx\` ON \`orders_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`orders_items_product_idx\` ON \`orders_items\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`orders_items_variant_idx\` ON \`orders_items\` (\`variant_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`orders_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`line_number\` numeric NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`unit_price\` numeric NOT NULL,
  	\`line_net\` numeric DEFAULT 0,
  	\`tax_category_id\` text(36),
  	\`discount\` numeric DEFAULT 0,
  	\`requested_delivery_date\` text,
  	\`gl_account_id\` text,
  	\`quantity_received\` numeric DEFAULT 0,
  	\`lead_time_days\` numeric,
  	\`preferred_vendor_id\` text(36),
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tax_category_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`preferred_vendor_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`orders_lines_order_idx\` ON \`orders_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`orders_lines_parent_id_idx\` ON \`orders_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`orders_lines_item_idx\` ON \`orders_lines\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`orders_lines_tax_category_idx\` ON \`orders_lines\` (\`tax_category_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`orders_lines_gl_account_idx\` ON \`orders_lines\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`orders_lines_preferred_vendor_idx\` ON \`orders_lines\` (\`preferred_vendor_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`orders_lines_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders_lines\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`orders_lines_locales_locale_parent_id_unique\` ON \`orders_lines_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`orders_approval_chain\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`step\` numeric NOT NULL,
  	\`approver_id\` text(36) NOT NULL,
  	\`role\` text,
  	\`decision\` text DEFAULT 'pending',
  	\`decided_at\` text,
  	FOREIGN KEY (\`approver_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`orders_approval_chain_order_idx\` ON \`orders_approval_chain\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`orders_approval_chain_parent_id_idx\` ON \`orders_approval_chain\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`orders_approval_chain_approver_idx\` ON \`orders_approval_chain\` (\`approver_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`orders_approval_chain_locales\` (
  	\`comment\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders_approval_chain\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`orders_approval_chain_locales_locale_parent_id_unique\` ON \`orders_approval_chain_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_orders_v_version_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`product_id\` text(36),
  	\`variant_id\` text(36),
  	\`quantity\` numeric DEFAULT 1 NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_orders_v_version_items_order_idx\` ON \`_orders_v_version_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_orders_v_version_items_parent_id_idx\` ON \`_orders_v_version_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_orders_v_version_items_product_idx\` ON \`_orders_v_version_items\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_orders_v_version_items_variant_idx\` ON \`_orders_v_version_items\` (\`variant_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_orders_v_version_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`line_number\` numeric NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`unit_price\` numeric NOT NULL,
  	\`line_net\` numeric DEFAULT 0,
  	\`tax_category_id\` text(36),
  	\`discount\` numeric DEFAULT 0,
  	\`requested_delivery_date\` text,
  	\`gl_account_id\` text,
  	\`quantity_received\` numeric DEFAULT 0,
  	\`lead_time_days\` numeric,
  	\`preferred_vendor_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tax_category_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`preferred_vendor_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_orders_v_version_lines_order_idx\` ON \`_orders_v_version_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_orders_v_version_lines_parent_id_idx\` ON \`_orders_v_version_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_orders_v_version_lines_item_idx\` ON \`_orders_v_version_lines\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_orders_v_version_lines_tax_category_idx\` ON \`_orders_v_version_lines\` (\`tax_category_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_orders_v_version_lines_gl_account_idx\` ON \`_orders_v_version_lines\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_orders_v_version_lines_preferred_vendor_idx\` ON \`_orders_v_version_lines\` (\`preferred_vendor_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_orders_v_version_lines_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_orders_v_version_lines\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_orders_v_version_lines_locales_locale_parent_id_unique\` ON \`_orders_v_version_lines_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_orders_v_version_approval_chain\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`step\` numeric NOT NULL,
  	\`approver_id\` text(36) NOT NULL,
  	\`role\` text,
  	\`decision\` text DEFAULT 'pending',
  	\`decided_at\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`approver_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_orders_v_version_approval_chain_order_idx\` ON \`_orders_v_version_approval_chain\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_orders_v_version_approval_chain_parent_id_idx\` ON \`_orders_v_version_approval_chain\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_orders_v_version_approval_chain_approver_idx\` ON \`_orders_v_version_approval_chain\` (\`approver_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_orders_v_version_approval_chain_locales\` (
  	\`comment\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_orders_v_version_approval_chain\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_orders_v_version_approval_chain_locales_locale_parent_id_un\` ON \`_orders_v_version_approval_chain_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`transactions_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`product_id\` text(36),
  	\`variant_id\` text(36),
  	\`quantity\` numeric DEFAULT 1 NOT NULL,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`transactions_items_order_idx\` ON \`transactions_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`transactions_items_parent_id_idx\` ON \`transactions_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`transactions_items_product_idx\` ON \`transactions_items\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`transactions_items_variant_idx\` ON \`transactions_items\` (\`variant_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_transactions_v_version_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`product_id\` text(36),
  	\`variant_id\` text(36),
  	\`quantity\` numeric DEFAULT 1 NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_transactions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_transactions_v_version_items_order_idx\` ON \`_transactions_v_version_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_transactions_v_version_items_parent_id_idx\` ON \`_transactions_v_version_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_transactions_v_version_items_product_idx\` ON \`_transactions_v_version_items\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_transactions_v_version_items_variant_idx\` ON \`_transactions_v_version_items\` (\`variant_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`forms_blocks_checkbox\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`default_value\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_checkbox_order_idx\` ON \`forms_blocks_checkbox\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_checkbox_parent_id_idx\` ON \`forms_blocks_checkbox\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_checkbox_path_idx\` ON \`forms_blocks_checkbox\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`forms_blocks_checkbox_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_checkbox\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`forms_blocks_checkbox_locales_locale_parent_id_unique\` ON \`forms_blocks_checkbox_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`forms_blocks_country\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_country_order_idx\` ON \`forms_blocks_country\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_country_parent_id_idx\` ON \`forms_blocks_country\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_country_path_idx\` ON \`forms_blocks_country\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`forms_blocks_country_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_country\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`forms_blocks_country_locales_locale_parent_id_unique\` ON \`forms_blocks_country_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`forms_blocks_email\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_email_order_idx\` ON \`forms_blocks_email\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_email_parent_id_idx\` ON \`forms_blocks_email\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_email_path_idx\` ON \`forms_blocks_email\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`forms_blocks_email_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_email\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`forms_blocks_email_locales_locale_parent_id_unique\` ON \`forms_blocks_email_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`forms_blocks_message\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_message_order_idx\` ON \`forms_blocks_message\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_message_parent_id_idx\` ON \`forms_blocks_message\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_message_path_idx\` ON \`forms_blocks_message\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`forms_blocks_message_locales\` (
  	\`message\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_message\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`forms_blocks_message_locales_locale_parent_id_unique\` ON \`forms_blocks_message_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`forms_blocks_number\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`default_value\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_number_order_idx\` ON \`forms_blocks_number\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_number_parent_id_idx\` ON \`forms_blocks_number\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_number_path_idx\` ON \`forms_blocks_number\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`forms_blocks_number_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_number\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`forms_blocks_number_locales_locale_parent_id_unique\` ON \`forms_blocks_number_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`forms_blocks_select_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_select_options_order_idx\` ON \`forms_blocks_select_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_select_options_parent_id_idx\` ON \`forms_blocks_select_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`forms_blocks_select_options_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select_options\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`forms_blocks_select_options_locales_locale_parent_id_unique\` ON \`forms_blocks_select_options_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`forms_blocks_select\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`placeholder\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_select_order_idx\` ON \`forms_blocks_select\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_select_parent_id_idx\` ON \`forms_blocks_select\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_select_path_idx\` ON \`forms_blocks_select\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`forms_blocks_select_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`forms_blocks_select_locales_locale_parent_id_unique\` ON \`forms_blocks_select_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`forms_blocks_state\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_state_order_idx\` ON \`forms_blocks_state\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_state_parent_id_idx\` ON \`forms_blocks_state\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_state_path_idx\` ON \`forms_blocks_state\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`forms_blocks_state_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_state\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`forms_blocks_state_locales_locale_parent_id_unique\` ON \`forms_blocks_state_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`forms_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_text_order_idx\` ON \`forms_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_text_parent_id_idx\` ON \`forms_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_text_path_idx\` ON \`forms_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`forms_blocks_text_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`forms_blocks_text_locales_locale_parent_id_unique\` ON \`forms_blocks_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`forms_blocks_textarea\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_textarea_order_idx\` ON \`forms_blocks_textarea\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_textarea_parent_id_idx\` ON \`forms_blocks_textarea\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_blocks_textarea_path_idx\` ON \`forms_blocks_textarea\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`forms_blocks_textarea_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_textarea\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`forms_blocks_textarea_locales_locale_parent_id_unique\` ON \`forms_blocks_textarea_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`forms_emails\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email_to\` text,
  	\`cc\` text,
  	\`bcc\` text,
  	\`reply_to\` text,
  	\`email_from\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_emails_order_idx\` ON \`forms_emails\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`forms_emails_parent_id_idx\` ON \`forms_emails\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`forms_emails_locales\` (
  	\`subject\` text DEFAULT 'You''ve received a new message.' NOT NULL,
  	\`message\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_emails\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`forms_emails_locales_locale_parent_id_unique\` ON \`forms_emails_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_forms_v_blocks_checkbox\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`default_value\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_checkbox_order_idx\` ON \`_forms_v_blocks_checkbox\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_checkbox_parent_id_idx\` ON \`_forms_v_blocks_checkbox\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_checkbox_path_idx\` ON \`_forms_v_blocks_checkbox\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_forms_v_blocks_checkbox_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v_blocks_checkbox\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_forms_v_blocks_checkbox_locales_locale_parent_id_unique\` ON \`_forms_v_blocks_checkbox_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_forms_v_blocks_country\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_country_order_idx\` ON \`_forms_v_blocks_country\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_country_parent_id_idx\` ON \`_forms_v_blocks_country\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_country_path_idx\` ON \`_forms_v_blocks_country\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_forms_v_blocks_country_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v_blocks_country\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_forms_v_blocks_country_locales_locale_parent_id_unique\` ON \`_forms_v_blocks_country_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_forms_v_blocks_email\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_email_order_idx\` ON \`_forms_v_blocks_email\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_email_parent_id_idx\` ON \`_forms_v_blocks_email\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_email_path_idx\` ON \`_forms_v_blocks_email\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_forms_v_blocks_email_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v_blocks_email\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_forms_v_blocks_email_locales_locale_parent_id_unique\` ON \`_forms_v_blocks_email_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_forms_v_blocks_message\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_message_order_idx\` ON \`_forms_v_blocks_message\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_message_parent_id_idx\` ON \`_forms_v_blocks_message\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_message_path_idx\` ON \`_forms_v_blocks_message\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_forms_v_blocks_message_locales\` (
  	\`message\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v_blocks_message\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_forms_v_blocks_message_locales_locale_parent_id_unique\` ON \`_forms_v_blocks_message_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_forms_v_blocks_number\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`default_value\` numeric,
  	\`required\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_number_order_idx\` ON \`_forms_v_blocks_number\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_number_parent_id_idx\` ON \`_forms_v_blocks_number\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_number_path_idx\` ON \`_forms_v_blocks_number\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_forms_v_blocks_number_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v_blocks_number\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_forms_v_blocks_number_locales_locale_parent_id_unique\` ON \`_forms_v_blocks_number_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_forms_v_blocks_select_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v_blocks_select\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_select_options_order_idx\` ON \`_forms_v_blocks_select_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_select_options_parent_id_idx\` ON \`_forms_v_blocks_select_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_forms_v_blocks_select_options_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v_blocks_select_options\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_forms_v_blocks_select_options_locales_locale_parent_id_uniq\` ON \`_forms_v_blocks_select_options_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_forms_v_blocks_select\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`placeholder\` text,
  	\`required\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_select_order_idx\` ON \`_forms_v_blocks_select\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_select_parent_id_idx\` ON \`_forms_v_blocks_select\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_select_path_idx\` ON \`_forms_v_blocks_select\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_forms_v_blocks_select_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v_blocks_select\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_forms_v_blocks_select_locales_locale_parent_id_unique\` ON \`_forms_v_blocks_select_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_forms_v_blocks_state\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_state_order_idx\` ON \`_forms_v_blocks_state\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_state_parent_id_idx\` ON \`_forms_v_blocks_state\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_state_path_idx\` ON \`_forms_v_blocks_state\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_forms_v_blocks_state_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v_blocks_state\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_forms_v_blocks_state_locales_locale_parent_id_unique\` ON \`_forms_v_blocks_state_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_forms_v_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_text_order_idx\` ON \`_forms_v_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_text_parent_id_idx\` ON \`_forms_v_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_text_path_idx\` ON \`_forms_v_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_forms_v_blocks_text_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v_blocks_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_forms_v_blocks_text_locales_locale_parent_id_unique\` ON \`_forms_v_blocks_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_forms_v_blocks_textarea\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_textarea_order_idx\` ON \`_forms_v_blocks_textarea\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_textarea_parent_id_idx\` ON \`_forms_v_blocks_textarea\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_blocks_textarea_path_idx\` ON \`_forms_v_blocks_textarea\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_forms_v_blocks_textarea_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v_blocks_textarea\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_forms_v_blocks_textarea_locales_locale_parent_id_unique\` ON \`_forms_v_blocks_textarea_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_forms_v_version_emails\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`email_to\` text,
  	\`cc\` text,
  	\`bcc\` text,
  	\`reply_to\` text,
  	\`email_from\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_version_emails_order_idx\` ON \`_forms_v_version_emails\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_forms_v_version_emails_parent_id_idx\` ON \`_forms_v_version_emails\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_forms_v_version_emails_locales\` (
  	\`subject\` text DEFAULT 'You''ve received a new message.' NOT NULL,
  	\`message\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v_version_emails\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`_forms_v_version_emails_locales_locale_parent_id_unique\` ON \`_forms_v_version_emails_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`form_submissions_submission_data\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`form_submissions_submission_data_order_idx\` ON \`form_submissions_submission_data\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`form_submissions_submission_data_parent_id_idx\` ON \`form_submissions_submission_data\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_form_submissions_v_version_submission_data\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`value\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_form_submissions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_form_submissions_v_version_submission_data_order_idx\` ON \`_form_submissions_v_version_submission_data\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`_form_submissions_v_version_submission_data_parent_id_idx\` ON \`_form_submissions_v_version_submission_data\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`search_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`relation_to\` text,
  	\`category_i_d\` text,
  	\`title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`search_categories_order_idx\` ON \`search_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`search_categories_parent_id_idx\` ON \`search_categories\` (\`_parent_id\`);`)
  // The only rows any renamed table holds in production: the users' roles (5) and their version rows (4).
  // Carry them into Payload's table names before the hashed tables are dropped. OR IGNORE and the
  // try/catch make this repeatable: on a second run the rows are already there, or the old table is gone.
  for (const [from, to] of [
    ['e1bbe6311f13282339e495c8800870cc5', 'users_roles'],
    ['_e1bbe6311f13282339e495c8800870cc5_v', '_users_v_version_roles'],
  ] as const) {
    try {
      await db.run(sql.raw(`INSERT OR IGNORE INTO \`${to}\` (\`order\`, \`parent_id\`, \`value\`, \`id\`) SELECT \`order\`, \`parent_id\`, \`value\`, \`id\` FROM \`${from}\`;`))
    } catch {
      // the hashed table no longer exists: an earlier run of this migration already carried its rows
    }
  }

  await db.run(sql`DROP TABLE IF EXISTS \`e79d3f9d1d5268d09bc229598ff88c147\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e79d3f9d1d5268d09bc229598ff88c147_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`eea91a2735c5d81fab00e29e7205a1913\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`eea91a2735c5d81fab00e29e7205a1913_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e79d3f9d1d5268d09bc229598ff88c147_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e79d3f9d1d5268d09bc229598ff88c147_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_eea91a2735c5d81fab00e29e7205a1913_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_eea91a2735c5d81fab00e29e7205a1913_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e096b0d817dc2803fbde647fc45fdd1d2\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`eb97d9b37aa2f8c0cba9177cb912664fa\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e847fc1809b2f8f1dbee08a0fff515091\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e1465d8f360ca8f11a355cbdf4650ac30\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e096b0d817dc2803fbde647fc45fdd1d2_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_eb97d9b37aa2f8c0cba9177cb912664fa_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e847fc1809b2f8f1dbee08a0fff515091_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e1465d8f360ca8f11a355cbdf4650ac30_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ea24bc9013544855da0f5f782d0971ded\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e613ebfd330e58c40b7e710e3a1566a25\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ea24bc9013544855da0f5f782d0971ded_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e613ebfd330e58c40b7e710e3a1566a25_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e074d1a41a9e282648fbfbec1c6fb43ea\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e77fca21a191f8082bc2a98b0bfd457e8\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e6c77d0f4b1888ce9bfd5c79a01b9bf36\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e77fca21a191f8082bc2a98b0bfd457e8_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e6c77d0f4b1888ce9bfd5c79a01b9bf36_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ebdf6c5cf64618eb3a6cbab343da6bac0\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ebdf6c5cf64618eb3a6cbab343da6bac0_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e98126fc1e3858f72a76a355f88289eb6\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e4c59bd52eb4f82d6a279a9499d2e35c8\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ebf8b394d0fdc86c18e4f79da4d0015e7\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e6443025e2e8e8ce299e90c6ffbf537d7\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e98126fc1e3858f72a76a355f88289eb6_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e4c59bd52eb4f82d6a279a9499d2e35c8_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ebf8b394d0fdc86c18e4f79da4d0015e7_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e6443025e2e8e8ce299e90c6ffbf537d7_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e90e89d5dfa078b99bb64c75493531070\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e90e89d5dfa078b99bb64c75493531070_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e90e89d5dfa078b99bb64c75493531070_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e90e89d5dfa078b99bb64c75493531070_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e054a9f104e2283d399aaa493f7a613d3\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e054a9f104e2283d399aaa493f7a613d3_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e03d4a88bb21985cf9204ac7e7b91dd7b\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e054a9f104e2283d399aaa493f7a613d3_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e054a9f104e2283d399aaa493f7a613d3_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e03d4a88bb21985cf9204ac7e7b91dd7b_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e31afc32d6c1b8e8fbbde1ae7a7c1b65e\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e31afc32d6c1b8e8fbbde1ae7a7c1b65e_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ee29d67e947fd80f68f80f3b1111ed7a7\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e2e7264e544c08b9fada634cb598433cb\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e2e7264e544c08b9fada634cb598433cb_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ee29d67e947fd80f68f80f3b1111ed7a7_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e2e7264e544c08b9fada634cb598433cb_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e2e7264e544c08b9fada634cb598433cb_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e3c6dbd1f63738f9a85006b63c3c94908\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e67933bc56ed48ddc92a51e05dd2e16ec\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e3c6dbd1f63738f9a85006b63c3c94908_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e67933bc56ed48ddc92a51e05dd2e16ec_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e595e236aadea8384bc3bfd7c2ccb6542\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e595e236aadea8384bc3bfd7c2ccb6542_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e595e236aadea8384bc3bfd7c2ccb6542_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e595e236aadea8384bc3bfd7c2ccb6542_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e294e318ae4b38416b0854e7571907375\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e294e318ae4b38416b0854e7571907375_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e294e318ae4b38416b0854e7571907375_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e294e318ae4b38416b0854e7571907375_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e190f605baa358add905ea2130eb5e8d4\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e4a27b40227628eedbbe6eb920284f46f\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ecee216e00b478cf7afc1f02f06e6ca9f\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e190f605baa358add905ea2130eb5e8d4_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e4a27b40227628eedbbe6eb920284f46f_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ecee216e00b478cf7afc1f02f06e6ca9f_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`eb9ba47f0935d85bf9626dd6756872a56\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_eb9ba47f0935d85bf9626dd6756872a56_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e331d8adbec1389829f03d1a10e5ec41d\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e331d8adbec1389829f03d1a10e5ec41d_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e656a9725ee398de3897bd61fd8162572\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e53bc78229e6886b6a047e57b9575cb8b\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ec5da128012e481c48a0e85cf8143c2da\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e656a9725ee398de3897bd61fd8162572_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e53bc78229e6886b6a047e57b9575cb8b_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ec5da128012e481c48a0e85cf8143c2da_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e739a79cfffa08b4faa0baba3495bf9be\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e739a79cfffa08b4faa0baba3495bf9be_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e6cabc1f1ac608b48984c03e53002797a\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e6cabc1f1ac608b48984c03e53002797a_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e476334f99a5080e1b8620daf7fabba26\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e476334f99a5080e1b8620daf7fabba26_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e476334f99a5080e1b8620daf7fabba26_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e476334f99a5080e1b8620daf7fabba26_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ea97c27c5b39a86618794e02c9a375e5b\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ed73da8fdfdc782349d06169d1dacf27a\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ea97c27c5b39a86618794e02c9a375e5b_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ed73da8fdfdc782349d06169d1dacf27a_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`eb1072c7c529688419f78c582bc502b89\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_eb1072c7c529688419f78c582bc502b89_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ebcc4e7fa5c5b870285d8619d67acbe3e\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e89747974e3198578977032ad94a759c1\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e4b2d0cf96ff18f2e94f69d77ee2c025f\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ed5b0fb68f51786feb6e1eee30449385f\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ed5b0fb68f51786feb6e1eee30449385f_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e89747974e3198578977032ad94a759c1_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e4b2d0cf96ff18f2e94f69d77ee2c025f_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ed5b0fb68f51786feb6e1eee30449385f_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ed5b0fb68f51786feb6e1eee30449385f_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e1a216420daff8b30ba8bab31bff7f178\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e55475e7a36b48103a9792367bb20bd76\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e1a216420daff8b30ba8bab31bff7f178_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e55475e7a36b48103a9792367bb20bd76_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e2cf7ebcb20e98c53ac2931d630d1a794\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e2cf7ebcb20e98c53ac2931d630d1a794_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`eceaf268e207982e58512501eaf1eb056\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`eceaf268e207982e58512501eaf1eb056_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_eceaf268e207982e58512501eaf1eb056_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_eceaf268e207982e58512501eaf1eb056_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e6ad64a821b7689ad8f40c0ee61ef44c7\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e6ad64a821b7689ad8f40c0ee61ef44c7_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ef34fbcd44ea281498af77442ff84199a\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ef34fbcd44ea281498af77442ff84199a_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e6ebcc7c621e687b59dbfd3dbfb40df80\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`eb29a4918c12889c69eaee1b51e5e94dc\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e6ebcc7c621e687b59dbfd3dbfb40df80_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_eb29a4918c12889c69eaee1b51e5e94dc_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`efcc0fcec210180b68b558b4fd7cc7f1d\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_efcc0fcec210180b68b558b4fd7cc7f1d_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e056c1b5d14948e2cbc1c72ae143dec2a\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e056c1b5d14948e2cbc1c72ae143dec2a_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ee888d42e9fc48f37b14244e9a2631a6b\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ea6ce72f9bf098ac48a6c7dc3362a4b9d\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ee888d42e9fc48f37b14244e9a2631a6b_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ea6ce72f9bf098ac48a6c7dc3362a4b9d_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`eeacdeee24bab86b0a04db17f2c688224\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`eeacdeee24bab86b0a04db17f2c688224_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_eeacdeee24bab86b0a04db17f2c688224_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_eeacdeee24bab86b0a04db17f2c688224_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e2ed3319156f98328b9f2124e3154b2b0\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ea2509c33f75c8e20a0407280749b7f16\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e2ed3319156f98328b9f2124e3154b2b0_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ea2509c33f75c8e20a0407280749b7f16_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e0f3c4597ea4d815698b6463649de69e2\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e0f3c4597ea4d815698b6463649de69e2_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e89951a9dc19789428d4d937cfad80caf\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e89951a9dc19789428d4d937cfad80caf_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e1bde3ecd157d8e63be74306ae19685b5\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e1bde3ecd157d8e63be74306ae19685b5_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e1bde3ecd157d8e63be74306ae19685b5_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e1bde3ecd157d8e63be74306ae19685b5_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e1dc5ded7e20c82a1b0dd2f3eaf6425fd\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e1dc5ded7e20c82a1b0dd2f3eaf6425fd_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e5496afa044df8c088b22ddbda34aa6ab\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e5496afa044df8c088b22ddbda34aa6ab_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e5496afa044df8c088b22ddbda34aa6ab_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e5496afa044df8c088b22ddbda34aa6ab_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e70edf9a8aa6d85848b0f21b5df0eb698\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e70edf9a8aa6d85848b0f21b5df0eb698_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`eb22e68b6bc9e83c8b9eb71f57a6918ce\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_eb22e68b6bc9e83c8b9eb71f57a6918ce_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e884551fbfb37859eb103c596d4a20817\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e884551fbfb37859eb103c596d4a20817_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e884551fbfb37859eb103c596d4a20817_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e884551fbfb37859eb103c596d4a20817_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e7b6d5ba25f4f809caff6535d1804c987\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e7b6d5ba25f4f809caff6535d1804c987_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e2fd3794b06848c5791b307f9f023909c\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e2fd3794b06848c5791b307f9f023909c_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`efd47cc9ff5ea8cf99caa31b20fc740b2\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_efd47cc9ff5ea8cf99caa31b20fc740b2_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e2aa7c626cae68b3b9472f11356928281\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e2aa7c626cae68b3b9472f11356928281_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e748d22a668778d2291b0c286f5fb0b16\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e748d22a668778d2291b0c286f5fb0b16_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e0dc067124d478cdba631b9fa5d670eec\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e0b6622b1c93180c98294697a29240a6f\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e36c778a2ac5684d1bbce502ea4931500\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ee3949e56baa28c1b867172a5dee40d6a\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ef7c8a03cb2628f4da06a88c4f30d47c7\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e81cc20c70fe78dbeaf3103630ebc6fbc\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e9cafee9f0fed8430a34bf14bb8d7771b\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e87f1621ae35f869b9a226c9e15aa2c0c\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e9e1fb928a8a084e1aa55074c6bfe43c8\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e0dc067124d478cdba631b9fa5d670eec_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e0b6622b1c93180c98294697a29240a6f_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e36c778a2ac5684d1bbce502ea4931500_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ee3949e56baa28c1b867172a5dee40d6a_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ef7c8a03cb2628f4da06a88c4f30d47c7_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e9cafee9f0fed8430a34bf14bb8d7771b_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e87f1621ae35f869b9a226c9e15aa2c0c_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e9e1fb928a8a084e1aa55074c6bfe43c8_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e8a9ff406b63a84698d79f68f093eac52\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e8a9ff406b63a84698d79f68f093eac52_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ecf42f6f7e9ab844998d1601a14e54745\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ecf42f6f7e9ab844998d1601a14e54745_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e30a95432eb9e8c50a8468c48698c4e69\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e30a95432eb9e8c50a8468c48698c4e69_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e4cefc0562d378871ba0511ef359b5126\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e4cefc0562d378871ba0511ef359b5126_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e63b40236bd7481698a9e62f00c83c76d\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`edc80b35eb7c98472b2e2fc49f713ea39\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e63b40236bd7481698a9e62f00c83c76d_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_edc80b35eb7c98472b2e2fc49f713ea39_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`eed4d3e0dc8168b24a00ca2f6a516bc58\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_eed4d3e0dc8168b24a00ca2f6a516bc58_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`eb810673fc2f58e658d8eede73daf9d48\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e818531f584178fa6906f1e091b15b481\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_eb810673fc2f58e658d8eede73daf9d48_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e818531f584178fa6906f1e091b15b481_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e70806190d4048502b85ef401011f5819\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e70806190d4048502b85ef401011f5819_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e9749956a340987ec9eeac999bdcebefd\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e9749956a340987ec9eeac999bdcebefd_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e0110a568cd51804a93eaef638c1f23c7\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e0110a568cd51804a93eaef638c1f23c7_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e3d8eef548a8d8022abc3af81e21232c6\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ebe1f8a37cdab80fe87f27a2a9809a286\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e3d8eef548a8d8022abc3af81e21232c6_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ebe1f8a37cdab80fe87f27a2a9809a286_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e934f7628401582b094b784c3c47361f6\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e934f7628401582b094b784c3c47361f6_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e8210b2bdad518d079d5f7f311f47e82e\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e8210b2bdad518d079d5f7f311f47e82e_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e00d4d9ef3ee486519ef61f236288a7ce\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e00d4d9ef3ee486519ef61f236288a7ce_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e27ef0824049282a9a3514febfe91938b\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e00d4d9ef3ee486519ef61f236288a7ce_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e00d4d9ef3ee486519ef61f236288a7ce_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e27ef0824049282a9a3514febfe91938b_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e86a4abedd768812d9092751010ab81e5\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e31fb556a79398d99bc575483c481e601\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e86a4abedd768812d9092751010ab81e5_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e31fb556a79398d99bc575483c481e601_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e8ace94baac3a8fadab2c2813fa5e353c\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`eb0ad1d8388688f31ad72a311eb768c1d\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e8ace94baac3a8fadab2c2813fa5e353c_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_eb0ad1d8388688f31ad72a311eb768c1d_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`eb6304bde8ac98a988117180add07de51\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_eb6304bde8ac98a988117180add07de51_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`eb42b6ce7a98b8069add2b649d5ebebf1\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_eb42b6ce7a98b8069add2b649d5ebebf1_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`eec49ec68ab2a8e6985f5d5422fa6267d\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_eec49ec68ab2a8e6985f5d5422fa6267d_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`eb6619ccc69668dd8a8e13e6b854fec14\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e1bbe6311f13282339e495c8800870cc5\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ef1d2a1529c6a89c49a42b4994043f30d\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e2a4022d9ee878058b14896fdca6954e1\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_eb6619ccc69668dd8a8e13e6b854fec14_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e1bbe6311f13282339e495c8800870cc5_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ef1d2a1529c6a89c49a42b4994043f30d_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e2a4022d9ee878058b14896fdca6954e1_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ebc746b7cb78f8bacb518c6e721f7b188\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ebc746b7cb78f8bacb518c6e721f7b188_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ebc746b7cb78f8bacb518c6e721f7b188_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ebc746b7cb78f8bacb518c6e721f7b188_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e1f8c250bfe948169bd55746726186bfd\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e1f8c250bfe948169bd55746726186bfd_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ef66041e07036859db2beb433fbb6a700\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ef66041e07036859db2beb433fbb6a700_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e8bd9e457c3bb82e6a7a2ca4dc0741cd3\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e8bd9e457c3bb82e6a7a2ca4dc0741cd3_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e807e5fa7ee658a6daf578f601def9edb\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e706ae1eff60a86858e60d43a8408a40c\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e2d7410d34f388b4e91b8d3253617c145\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e8be93ceba4838a2ea2eb22b6dbda9f7d\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e3e08cdb269b3896c82e9ebaf3a7cdad9\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ed959efe1dd6a86dc91541e91cc18f307\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e807e5fa7ee658a6daf578f601def9edb_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e706ae1eff60a86858e60d43a8408a40c_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e2d7410d34f388b4e91b8d3253617c145_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e8be93ceba4838a2ea2eb22b6dbda9f7d_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e3e08cdb269b3896c82e9ebaf3a7cdad9_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ed959efe1dd6a86dc91541e91cc18f307_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e36231b73e55787b6bbebfd9458a6c7d6\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e36231b73e55787b6bbebfd9458a6c7d6_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e3acbac9f125c8bad9fe2ad09574853a0\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e801d0467ac3d8adb9473d14e41225f76\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e801d0467ac3d8adb9473d14e41225f76_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e39e594dd68848a429847c4ee70016372\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e39e594dd68848a429847c4ee70016372_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e3acbac9f125c8bad9fe2ad09574853a0_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e801d0467ac3d8adb9473d14e41225f76_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e801d0467ac3d8adb9473d14e41225f76_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e39e594dd68848a429847c4ee70016372_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e39e594dd68848a429847c4ee70016372_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e4375580a944f874eb05f54d12cb85d91\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e4375580a944f874eb05f54d12cb85d91_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ec7b0187f544b883ba491da04c8bac20f\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ec7b0187f544b883ba491da04c8bac20f_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e77b9fc908c6084fc900cc66442b89e32\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e77b9fc908c6084fc900cc66442b89e32_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e964a176201f3810d8e23c948af516fb2\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e964a176201f3810d8e23c948af516fb2_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ed69fe51f407b86e5a973495011c151e9\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ed69fe51f407b86e5a973495011c151e9_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e172457e3d41c8a0da66683b4f5b2bb5d\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e172457e3d41c8a0da66683b4f5b2bb5d_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e1fef94f431b585ac823da9a3677c38c6\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e1fef94f431b585ac823da9a3677c38c6_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e079ab6e4a6a98374b8033579bf65ae20\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e079ab6e4a6a98374b8033579bf65ae20_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e87df93fee1818fab87f9c6da399fdb7d\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e87df93fee1818fab87f9c6da399fdb7d_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e6d67388f0be98e9fa6d861b333356635\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e6d67388f0be98e9fa6d861b333356635_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e17421b6a908d8c008312bf0e38ef9253\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e17421b6a908d8c008312bf0e38ef9253_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e7d0b5cfcc0f18d07a0f986e2f1aa3ad3\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e7d0b5cfcc0f18d07a0f986e2f1aa3ad3_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ec7b0187f544b883ba491da04c8bac20f_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ec7b0187f544b883ba491da04c8bac20f_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e77b9fc908c6084fc900cc66442b89e32_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e77b9fc908c6084fc900cc66442b89e32_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e964a176201f3810d8e23c948af516fb2_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e964a176201f3810d8e23c948af516fb2_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ed69fe51f407b86e5a973495011c151e9_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_ed69fe51f407b86e5a973495011c151e9_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e172457e3d41c8a0da66683b4f5b2bb5d_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e172457e3d41c8a0da66683b4f5b2bb5d_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e1fef94f431b585ac823da9a3677c38c6_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e1fef94f431b585ac823da9a3677c38c6_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e079ab6e4a6a98374b8033579bf65ae20_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e079ab6e4a6a98374b8033579bf65ae20_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e87df93fee1818fab87f9c6da399fdb7d_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e87df93fee1818fab87f9c6da399fdb7d_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e6d67388f0be98e9fa6d861b333356635_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e6d67388f0be98e9fa6d861b333356635_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e17421b6a908d8c008312bf0e38ef9253_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e17421b6a908d8c008312bf0e38ef9253_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e7d0b5cfcc0f18d07a0f986e2f1aa3ad3_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e7d0b5cfcc0f18d07a0f986e2f1aa3ad3_v_locales\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`e0fa36534560c842e89b11febfa39e66d\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`_e0fa36534560c842e89b11febfa39e66d_v\`;`)
  await db.run(sql`DROP TABLE IF EXISTS \`ead7b4055f97980b6b7934d5acfec3e62\`;`)
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'orders', entity: 'collection', fieldPath: 'approvalChain.comment', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'purchase-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'purchase-requisitions', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'purchase-requisitions', entity: 'collection', fieldPath: 'approvalChain.comment', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'vendor-quotes', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`e79d3f9d1d5268d09bc229598ff88c147\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`originated_at\` text NOT NULL,
  	\`aging_bucket\` text,
  	\`bank_transaction_id\` text(36),
  	\`journal_entry_id\` text(36),
  	FOREIGN KEY (\`bank_transaction_id\`) REFERENCES \`bank_transactions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`account_reconciliations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e79d3f9d1d5268d09bc229598ff88c147_order_idx\` ON \`e79d3f9d1d5268d09bc229598ff88c147\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e79d3f9d1d5268d09bc229598ff88c147_parent_id_idx\` ON \`e79d3f9d1d5268d09bc229598ff88c147\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e79d3f9d1d5268d09bc229598ff88c147_bank_transaction_idx\` ON \`e79d3f9d1d5268d09bc229598ff88c147\` (\`bank_transaction_id\`);`)
  await db.run(sql`CREATE INDEX \`e79d3f9d1d5268d09bc229598ff88c147_journal_entry_idx\` ON \`e79d3f9d1d5268d09bc229598ff88c147\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`e79d3f9d1d5268d09bc229598ff88c147_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e79d3f9d1d5268d09bc229598ff88c147\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e79d3f9d1d5268d09bc229598ff88c147_locales_locale_parent_id_u\` ON \`e79d3f9d1d5268d09bc229598ff88c147_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`eea91a2735c5d81fab00e29e7205a1913\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`originated_at\` text NOT NULL,
  	\`aging_bucket\` text,
  	\`journal_entry_id\` text(36),
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`account_reconciliations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eea91a2735c5d81fab00e29e7205a1913_order_idx\` ON \`eea91a2735c5d81fab00e29e7205a1913\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eea91a2735c5d81fab00e29e7205a1913_parent_id_idx\` ON \`eea91a2735c5d81fab00e29e7205a1913\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`eea91a2735c5d81fab00e29e7205a1913_journal_entry_idx\` ON \`eea91a2735c5d81fab00e29e7205a1913\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`eea91a2735c5d81fab00e29e7205a1913_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`eea91a2735c5d81fab00e29e7205a1913\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`eea91a2735c5d81fab00e29e7205a1913_locales_locale_parent_id_u\` ON \`eea91a2735c5d81fab00e29e7205a1913_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e79d3f9d1d5268d09bc229598ff88c147_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`originated_at\` text NOT NULL,
  	\`aging_bucket\` text,
  	\`bank_transaction_id\` text(36),
  	\`journal_entry_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`bank_transaction_id\`) REFERENCES \`bank_transactions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_account_reconciliations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e79d3f9d1d5268d09bc229598ff88c147_v_order_idx\` ON \`_e79d3f9d1d5268d09bc229598ff88c147_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e79d3f9d1d5268d09bc229598ff88c147_v_parent_id_idx\` ON \`_e79d3f9d1d5268d09bc229598ff88c147_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e79d3f9d1d5268d09bc229598ff88c147_v_bank_transaction_idx\` ON \`_e79d3f9d1d5268d09bc229598ff88c147_v\` (\`bank_transaction_id\`);`)
  await db.run(sql`CREATE INDEX \`_e79d3f9d1d5268d09bc229598ff88c147_v_journal_entry_idx\` ON \`_e79d3f9d1d5268d09bc229598ff88c147_v\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`_e79d3f9d1d5268d09bc229598ff88c147_v_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e79d3f9d1d5268d09bc229598ff88c147_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_e79d3f9d1d5268d09bc229598ff88c147_v_locales_locale_parent_i\` ON \`_e79d3f9d1d5268d09bc229598ff88c147_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_eea91a2735c5d81fab00e29e7205a1913_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`originated_at\` text NOT NULL,
  	\`aging_bucket\` text,
  	\`journal_entry_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_account_reconciliations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_eea91a2735c5d81fab00e29e7205a1913_v_order_idx\` ON \`_eea91a2735c5d81fab00e29e7205a1913_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eea91a2735c5d81fab00e29e7205a1913_v_parent_id_idx\` ON \`_eea91a2735c5d81fab00e29e7205a1913_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_eea91a2735c5d81fab00e29e7205a1913_v_journal_entry_idx\` ON \`_eea91a2735c5d81fab00e29e7205a1913_v\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`_eea91a2735c5d81fab00e29e7205a1913_v_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_eea91a2735c5d81fab00e29e7205a1913_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_eea91a2735c5d81fab00e29e7205a1913_v_locales_locale_parent_i\` ON \`_eea91a2735c5d81fab00e29e7205a1913_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e096b0d817dc2803fbde647fc45fdd1d2\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`title\` text,
  	\`affiliation\` text,
  	\`status\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e096b0d817dc2803fbde647fc45fdd1d2_order_idx\` ON \`e096b0d817dc2803fbde647fc45fdd1d2\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e096b0d817dc2803fbde647fc45fdd1d2_parent_id_idx\` ON \`e096b0d817dc2803fbde647fc45fdd1d2\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`eb97d9b37aa2f8c0cba9177cb912664fa\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`topic\` text NOT NULL,
  	\`presenter\` text,
  	\`time_allocated\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eb97d9b37aa2f8c0cba9177cb912664fa_order_idx\` ON \`eb97d9b37aa2f8c0cba9177cb912664fa\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eb97d9b37aa2f8c0cba9177cb912664fa_parent_id_idx\` ON \`eb97d9b37aa2f8c0cba9177cb912664fa\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e847fc1809b2f8f1dbee08a0fff515091\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`decision\` text NOT NULL,
  	\`rationale\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e847fc1809b2f8f1dbee08a0fff515091_order_idx\` ON \`e847fc1809b2f8f1dbee08a0fff515091\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e847fc1809b2f8f1dbee08a0fff515091_parent_id_idx\` ON \`e847fc1809b2f8f1dbee08a0fff515091\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e1465d8f360ca8f11a355cbdf4650ac30\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`action_description\` text NOT NULL,
  	\`assigned_to\` text NOT NULL,
  	\`due_date\` text NOT NULL,
  	\`status\` text DEFAULT 'open',
  	\`completion_date\` text,
  	\`completion_notes\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e1465d8f360ca8f11a355cbdf4650ac30_order_idx\` ON \`e1465d8f360ca8f11a355cbdf4650ac30\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e1465d8f360ca8f11a355cbdf4650ac30_parent_id_idx\` ON \`e1465d8f360ca8f11a355cbdf4650ac30\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e096b0d817dc2803fbde647fc45fdd1d2_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`title\` text,
  	\`affiliation\` text,
  	\`status\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_committee_minutes_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e096b0d817dc2803fbde647fc45fdd1d2_v_order_idx\` ON \`_e096b0d817dc2803fbde647fc45fdd1d2_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e096b0d817dc2803fbde647fc45fdd1d2_v_parent_id_idx\` ON \`_e096b0d817dc2803fbde647fc45fdd1d2_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_eb97d9b37aa2f8c0cba9177cb912664fa_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`topic\` text NOT NULL,
  	\`presenter\` text,
  	\`time_allocated\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_committee_minutes_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_eb97d9b37aa2f8c0cba9177cb912664fa_v_order_idx\` ON \`_eb97d9b37aa2f8c0cba9177cb912664fa_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eb97d9b37aa2f8c0cba9177cb912664fa_v_parent_id_idx\` ON \`_eb97d9b37aa2f8c0cba9177cb912664fa_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e847fc1809b2f8f1dbee08a0fff515091_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`decision\` text NOT NULL,
  	\`rationale\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_committee_minutes_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e847fc1809b2f8f1dbee08a0fff515091_v_order_idx\` ON \`_e847fc1809b2f8f1dbee08a0fff515091_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e847fc1809b2f8f1dbee08a0fff515091_v_parent_id_idx\` ON \`_e847fc1809b2f8f1dbee08a0fff515091_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e1465d8f360ca8f11a355cbdf4650ac30_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`action_description\` text NOT NULL,
  	\`assigned_to\` text NOT NULL,
  	\`due_date\` text NOT NULL,
  	\`status\` text DEFAULT 'open',
  	\`completion_date\` text,
  	\`completion_notes\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_committee_minutes_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e1465d8f360ca8f11a355cbdf4650ac30_v_order_idx\` ON \`_e1465d8f360ca8f11a355cbdf4650ac30_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e1465d8f360ca8f11a355cbdf4650ac30_v_parent_id_idx\` ON \`_e1465d8f360ca8f11a355cbdf4650ac30_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ea24bc9013544855da0f5f782d0971ded\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`area\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e613ebfd330e58c40b7e710e3a1566a25\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ea24bc9013544855da0f5f782d0971ded_order_idx\` ON \`ea24bc9013544855da0f5f782d0971ded\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ea24bc9013544855da0f5f782d0971ded_parent_id_idx\` ON \`ea24bc9013544855da0f5f782d0971ded\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e613ebfd330e58c40b7e710e3a1566a25\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`member_name\` text NOT NULL,
  	\`title\` text,
  	\`affiliation\` text NOT NULL,
  	\`appointed_date\` text NOT NULL,
  	\`term_end_date\` text,
  	\`role\` text,
  	\`status\` text DEFAULT 'active',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_committees\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e613ebfd330e58c40b7e710e3a1566a25_order_idx\` ON \`e613ebfd330e58c40b7e710e3a1566a25\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e613ebfd330e58c40b7e710e3a1566a25_parent_id_idx\` ON \`e613ebfd330e58c40b7e710e3a1566a25\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ea24bc9013544855da0f5f782d0971ded_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`area\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e613ebfd330e58c40b7e710e3a1566a25_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ea24bc9013544855da0f5f782d0971ded_v_order_idx\` ON \`_ea24bc9013544855da0f5f782d0971ded_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ea24bc9013544855da0f5f782d0971ded_v_parent_id_idx\` ON \`_ea24bc9013544855da0f5f782d0971ded_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e613ebfd330e58c40b7e710e3a1566a25_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`member_name\` text NOT NULL,
  	\`title\` text,
  	\`affiliation\` text NOT NULL,
  	\`appointed_date\` text NOT NULL,
  	\`term_end_date\` text,
  	\`role\` text,
  	\`status\` text DEFAULT 'active',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_committees_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e613ebfd330e58c40b7e710e3a1566a25_v_order_idx\` ON \`_e613ebfd330e58c40b7e710e3a1566a25_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e613ebfd330e58c40b7e710e3a1566a25_v_parent_id_idx\` ON \`_e613ebfd330e58c40b7e710e3a1566a25_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e074d1a41a9e282648fbfbec1c6fb43ea\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`previous_value\` text,
  	\`next_value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e074d1a41a9e282648fbfbec1c6fb43ea_order_idx\` ON \`e074d1a41a9e282648fbfbec1c6fb43ea\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e074d1a41a9e282648fbfbec1c6fb43ea_parent_id_idx\` ON \`e074d1a41a9e282648fbfbec1c6fb43ea\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e77fca21a191f8082bc2a98b0bfd457e8\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`actor\` text NOT NULL,
  	\`action\` text NOT NULL,
  	\`action_date\` text,
  	\`notes\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_evidence\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e77fca21a191f8082bc2a98b0bfd457e8_order_idx\` ON \`e77fca21a191f8082bc2a98b0bfd457e8\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e77fca21a191f8082bc2a98b0bfd457e8_parent_id_idx\` ON \`e77fca21a191f8082bc2a98b0bfd457e8\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e6c77d0f4b1888ce9bfd5c79a01b9bf36\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_evidence\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e6c77d0f4b1888ce9bfd5c79a01b9bf36_order_idx\` ON \`e6c77d0f4b1888ce9bfd5c79a01b9bf36\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e6c77d0f4b1888ce9bfd5c79a01b9bf36_parent_id_idx\` ON \`e6c77d0f4b1888ce9bfd5c79a01b9bf36\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e77fca21a191f8082bc2a98b0bfd457e8_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`actor\` text NOT NULL,
  	\`action\` text NOT NULL,
  	\`action_date\` text,
  	\`notes\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_evidence_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e77fca21a191f8082bc2a98b0bfd457e8_v_order_idx\` ON \`_e77fca21a191f8082bc2a98b0bfd457e8_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e77fca21a191f8082bc2a98b0bfd457e8_v_parent_id_idx\` ON \`_e77fca21a191f8082bc2a98b0bfd457e8_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e6c77d0f4b1888ce9bfd5c79a01b9bf36_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`tag\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_evidence_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e6c77d0f4b1888ce9bfd5c79a01b9bf36_v_order_idx\` ON \`_e6c77d0f4b1888ce9bfd5c79a01b9bf36_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e6c77d0f4b1888ce9bfd5c79a01b9bf36_v_parent_id_idx\` ON \`_e6c77d0f4b1888ce9bfd5c79a01b9bf36_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ebdf6c5cf64618eb3a6cbab343da6bac0\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`recipient\` text NOT NULL,
  	\`communication_date\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ebdf6c5cf64618eb3a6cbab343da6bac0_order_idx\` ON \`ebdf6c5cf64618eb3a6cbab343da6bac0\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ebdf6c5cf64618eb3a6cbab343da6bac0_parent_id_idx\` ON \`ebdf6c5cf64618eb3a6cbab343da6bac0\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ebdf6c5cf64618eb3a6cbab343da6bac0_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`recipient\` text NOT NULL,
  	\`communication_date\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_findings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ebdf6c5cf64618eb3a6cbab343da6bac0_v_order_idx\` ON \`_ebdf6c5cf64618eb3a6cbab343da6bac0_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ebdf6c5cf64618eb3a6cbab343da6bac0_v_parent_id_idx\` ON \`_ebdf6c5cf64618eb3a6cbab343da6bac0_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e98126fc1e3858f72a76a355f88289eb6\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`jurisdiction_code\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_reports\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e98126fc1e3858f72a76a355f88289eb6_order_idx\` ON \`e98126fc1e3858f72a76a355f88289eb6\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e98126fc1e3858f72a76a355f88289eb6_parent_id_idx\` ON \`e98126fc1e3858f72a76a355f88289eb6\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e4c59bd52eb4f82d6a279a9499d2e35c8\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`jurisdiction\` text NOT NULL,
  	\`filing_type\` text,
  	\`filing_format\` text,
  	\`filing_deadline\` text,
  	\`submission_method\` text,
  	\`submission_status\` text DEFAULT 'draft',
  	\`submission_date\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_reports\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e4c59bd52eb4f82d6a279a9499d2e35c8_order_idx\` ON \`e4c59bd52eb4f82d6a279a9499d2e35c8\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e4c59bd52eb4f82d6a279a9499d2e35c8_parent_id_idx\` ON \`e4c59bd52eb4f82d6a279a9499d2e35c8\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ebf8b394d0fdc86c18e4f79da4d0015e7\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`jurisdiction\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e6443025e2e8e8ce299e90c6ffbf537d7\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ebf8b394d0fdc86c18e4f79da4d0015e7_order_idx\` ON \`ebf8b394d0fdc86c18e4f79da4d0015e7\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ebf8b394d0fdc86c18e4f79da4d0015e7_parent_id_idx\` ON \`ebf8b394d0fdc86c18e4f79da4d0015e7\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e6443025e2e8e8ce299e90c6ffbf537d7\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`optimization_type\` text NOT NULL,
  	\`estimated_tax_savings\` numeric,
  	\`savings_currency\` text,
  	\`compliance_risk\` text,
  	\`description\` text,
  	\`recommended_action\` text,
  	\`implementation_status\` text DEFAULT 'recommended',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_reports\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e6443025e2e8e8ce299e90c6ffbf537d7_order_idx\` ON \`e6443025e2e8e8ce299e90c6ffbf537d7\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e6443025e2e8e8ce299e90c6ffbf537d7_parent_id_idx\` ON \`e6443025e2e8e8ce299e90c6ffbf537d7\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e98126fc1e3858f72a76a355f88289eb6_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`jurisdiction_code\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_reports_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e98126fc1e3858f72a76a355f88289eb6_v_order_idx\` ON \`_e98126fc1e3858f72a76a355f88289eb6_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e98126fc1e3858f72a76a355f88289eb6_v_parent_id_idx\` ON \`_e98126fc1e3858f72a76a355f88289eb6_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e4c59bd52eb4f82d6a279a9499d2e35c8_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`jurisdiction\` text NOT NULL,
  	\`filing_type\` text,
  	\`filing_format\` text,
  	\`filing_deadline\` text,
  	\`submission_method\` text,
  	\`submission_status\` text DEFAULT 'draft',
  	\`submission_date\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_reports_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e4c59bd52eb4f82d6a279a9499d2e35c8_v_order_idx\` ON \`_e4c59bd52eb4f82d6a279a9499d2e35c8_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e4c59bd52eb4f82d6a279a9499d2e35c8_v_parent_id_idx\` ON \`_e4c59bd52eb4f82d6a279a9499d2e35c8_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ebf8b394d0fdc86c18e4f79da4d0015e7_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`jurisdiction\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e6443025e2e8e8ce299e90c6ffbf537d7_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ebf8b394d0fdc86c18e4f79da4d0015e7_v_order_idx\` ON \`_ebf8b394d0fdc86c18e4f79da4d0015e7_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ebf8b394d0fdc86c18e4f79da4d0015e7_v_parent_id_idx\` ON \`_ebf8b394d0fdc86c18e4f79da4d0015e7_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e6443025e2e8e8ce299e90c6ffbf537d7_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`optimization_type\` text NOT NULL,
  	\`estimated_tax_savings\` numeric,
  	\`savings_currency\` text,
  	\`compliance_risk\` text,
  	\`description\` text,
  	\`recommended_action\` text,
  	\`implementation_status\` text DEFAULT 'recommended',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_audit_reports_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e6443025e2e8e8ce299e90c6ffbf537d7_v_order_idx\` ON \`_e6443025e2e8e8ce299e90c6ffbf537d7_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e6443025e2e8e8ce299e90c6ffbf537d7_v_parent_id_idx\` ON \`_e6443025e2e8e8ce299e90c6ffbf537d7_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e90e89d5dfa078b99bb64c75493531070\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`kind\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`reference\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bank_reconciliations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e90e89d5dfa078b99bb64c75493531070_order_idx\` ON \`e90e89d5dfa078b99bb64c75493531070\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e90e89d5dfa078b99bb64c75493531070_parent_id_idx\` ON \`e90e89d5dfa078b99bb64c75493531070\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e90e89d5dfa078b99bb64c75493531070_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e90e89d5dfa078b99bb64c75493531070\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e90e89d5dfa078b99bb64c75493531070_locales_locale_parent_id_u\` ON \`e90e89d5dfa078b99bb64c75493531070_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e90e89d5dfa078b99bb64c75493531070_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`kind\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`reference\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bank_reconciliations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e90e89d5dfa078b99bb64c75493531070_v_order_idx\` ON \`_e90e89d5dfa078b99bb64c75493531070_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e90e89d5dfa078b99bb64c75493531070_v_parent_id_idx\` ON \`_e90e89d5dfa078b99bb64c75493531070_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e90e89d5dfa078b99bb64c75493531070_v_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e90e89d5dfa078b99bb64c75493531070_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_e90e89d5dfa078b99bb64c75493531070_v_locales_locale_parent_i\` ON \`_e90e89d5dfa078b99bb64c75493531070_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e054a9f104e2283d399aaa493f7a613d3\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`transaction_date\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`reference\` text,
  	\`balance_after\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bank_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e054a9f104e2283d399aaa493f7a613d3_order_idx\` ON \`e054a9f104e2283d399aaa493f7a613d3\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e054a9f104e2283d399aaa493f7a613d3_parent_id_idx\` ON \`e054a9f104e2283d399aaa493f7a613d3\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e054a9f104e2283d399aaa493f7a613d3_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e054a9f104e2283d399aaa493f7a613d3\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e054a9f104e2283d399aaa493f7a613d3_locales_locale_parent_id_u\` ON \`e054a9f104e2283d399aaa493f7a613d3_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e03d4a88bb21985cf9204ac7e7b91dd7b\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`bank_statement_line_index\` numeric NOT NULL,
  	\`journal_entry_id\` text(36) NOT NULL,
  	\`match_type\` text NOT NULL,
  	\`match_score\` numeric,
  	\`variance_amount\` numeric,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bank_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e03d4a88bb21985cf9204ac7e7b91dd7b_order_idx\` ON \`e03d4a88bb21985cf9204ac7e7b91dd7b\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e03d4a88bb21985cf9204ac7e7b91dd7b_parent_id_idx\` ON \`e03d4a88bb21985cf9204ac7e7b91dd7b\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e03d4a88bb21985cf9204ac7e7b91dd7b_journal_entry_idx\` ON \`e03d4a88bb21985cf9204ac7e7b91dd7b\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`_e054a9f104e2283d399aaa493f7a613d3_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`transaction_date\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`reference\` text,
  	\`balance_after\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bank_statements_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e054a9f104e2283d399aaa493f7a613d3_v_order_idx\` ON \`_e054a9f104e2283d399aaa493f7a613d3_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e054a9f104e2283d399aaa493f7a613d3_v_parent_id_idx\` ON \`_e054a9f104e2283d399aaa493f7a613d3_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e054a9f104e2283d399aaa493f7a613d3_v_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e054a9f104e2283d399aaa493f7a613d3_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_e054a9f104e2283d399aaa493f7a613d3_v_locales_locale_parent_i\` ON \`_e054a9f104e2283d399aaa493f7a613d3_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e03d4a88bb21985cf9204ac7e7b91dd7b_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`bank_statement_line_index\` numeric NOT NULL,
  	\`journal_entry_id\` text(36) NOT NULL,
  	\`match_type\` text NOT NULL,
  	\`match_score\` numeric,
  	\`variance_amount\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bank_statements_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e03d4a88bb21985cf9204ac7e7b91dd7b_v_order_idx\` ON \`_e03d4a88bb21985cf9204ac7e7b91dd7b_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e03d4a88bb21985cf9204ac7e7b91dd7b_v_parent_id_idx\` ON \`_e03d4a88bb21985cf9204ac7e7b91dd7b_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e03d4a88bb21985cf9204ac7e7b91dd7b_v_journal_entry_idx\` ON \`_e03d4a88bb21985cf9204ac7e7b91dd7b_v\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`e31afc32d6c1b8e8fbbde1ae7a7c1b65e\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`journal_entry_id\` text(36) NOT NULL,
  	\`matched_amount\` numeric NOT NULL,
  	\`match_score\` numeric,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bank_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e31afc32d6c1b8e8fbbde1ae7a7c1b65e_order_idx\` ON \`e31afc32d6c1b8e8fbbde1ae7a7c1b65e\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e31afc32d6c1b8e8fbbde1ae7a7c1b65e_parent_id_idx\` ON \`e31afc32d6c1b8e8fbbde1ae7a7c1b65e\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e31afc32d6c1b8e8fbbde1ae7a7c1b65e_journal_entry_idx\` ON \`e31afc32d6c1b8e8fbbde1ae7a7c1b65e\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`_e31afc32d6c1b8e8fbbde1ae7a7c1b65e_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`journal_entry_id\` text(36) NOT NULL,
  	\`matched_amount\` numeric NOT NULL,
  	\`match_score\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bank_transactions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e31afc32d6c1b8e8fbbde1ae7a7c1b65e_v_order_idx\` ON \`_e31afc32d6c1b8e8fbbde1ae7a7c1b65e_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e31afc32d6c1b8e8fbbde1ae7a7c1b65e_v_parent_id_idx\` ON \`_e31afc32d6c1b8e8fbbde1ae7a7c1b65e_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e31afc32d6c1b8e8fbbde1ae7a7c1b65e_v_journal_entry_idx\` ON \`_e31afc32d6c1b8e8fbbde1ae7a7c1b65e_v\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`ee29d67e947fd80f68f80f3b1111ed7a7\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36) NOT NULL,
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`waste_allowance\` numeric DEFAULT 0,
  	\`is_optional\` integer DEFAULT false,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bills_of_materials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ee29d67e947fd80f68f80f3b1111ed7a7_order_idx\` ON \`ee29d67e947fd80f68f80f3b1111ed7a7\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ee29d67e947fd80f68f80f3b1111ed7a7_parent_id_idx\` ON \`ee29d67e947fd80f68f80f3b1111ed7a7\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ee29d67e947fd80f68f80f3b1111ed7a7_item_idx\` ON \`ee29d67e947fd80f68f80f3b1111ed7a7\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`e2e7264e544c08b9fada634cb598433cb\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`work_center_id\` text(36),
  	\`standard_labour_minutes\` numeric DEFAULT 0,
  	\`standard_machine_minutes\` numeric DEFAULT 0,
  	FOREIGN KEY (\`work_center_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bills_of_materials\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e2e7264e544c08b9fada634cb598433cb_order_idx\` ON \`e2e7264e544c08b9fada634cb598433cb\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e2e7264e544c08b9fada634cb598433cb_parent_id_idx\` ON \`e2e7264e544c08b9fada634cb598433cb\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e2e7264e544c08b9fada634cb598433cb_work_center_idx\` ON \`e2e7264e544c08b9fada634cb598433cb\` (\`work_center_id\`);`)
  await db.run(sql`CREATE TABLE \`e2e7264e544c08b9fada634cb598433cb_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e2e7264e544c08b9fada634cb598433cb\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e2e7264e544c08b9fada634cb598433cb_locales_locale_parent_id_u\` ON \`e2e7264e544c08b9fada634cb598433cb_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ee29d67e947fd80f68f80f3b1111ed7a7_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36) NOT NULL,
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`waste_allowance\` numeric DEFAULT 0,
  	\`is_optional\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bills_of_materials_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ee29d67e947fd80f68f80f3b1111ed7a7_v_order_idx\` ON \`_ee29d67e947fd80f68f80f3b1111ed7a7_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ee29d67e947fd80f68f80f3b1111ed7a7_v_parent_id_idx\` ON \`_ee29d67e947fd80f68f80f3b1111ed7a7_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ee29d67e947fd80f68f80f3b1111ed7a7_v_item_idx\` ON \`_ee29d67e947fd80f68f80f3b1111ed7a7_v\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`_e2e7264e544c08b9fada634cb598433cb_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`work_center_id\` text(36),
  	\`standard_labour_minutes\` numeric DEFAULT 0,
  	\`standard_machine_minutes\` numeric DEFAULT 0,
  	\`_uuid\` text,
  	FOREIGN KEY (\`work_center_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bills_of_materials_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e2e7264e544c08b9fada634cb598433cb_v_order_idx\` ON \`_e2e7264e544c08b9fada634cb598433cb_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e2e7264e544c08b9fada634cb598433cb_v_parent_id_idx\` ON \`_e2e7264e544c08b9fada634cb598433cb_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e2e7264e544c08b9fada634cb598433cb_v_work_center_idx\` ON \`_e2e7264e544c08b9fada634cb598433cb_v\` (\`work_center_id\`);`)
  await db.run(sql`CREATE TABLE \`_e2e7264e544c08b9fada634cb598433cb_v_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e2e7264e544c08b9fada634cb598433cb_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_e2e7264e544c08b9fada634cb598433cb_v_locales_locale_parent_i\` ON \`_e2e7264e544c08b9fada634cb598433cb_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e3c6dbd1f63738f9a85006b63c3c94908\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tier_name\` text NOT NULL,
  	\`rate\` numeric NOT NULL,
  	\`effective_from\` text,
  	\`effective_to\` text,
  	\`min_stay_days\` numeric,
  	\`is_active\` integer DEFAULT true,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bookable_resources\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e3c6dbd1f63738f9a85006b63c3c94908_order_idx\` ON \`e3c6dbd1f63738f9a85006b63c3c94908\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e3c6dbd1f63738f9a85006b63c3c94908_parent_id_idx\` ON \`e3c6dbd1f63738f9a85006b63c3c94908\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e67933bc56ed48ddc92a51e05dd2e16ec\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bookable_resources\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e67933bc56ed48ddc92a51e05dd2e16ec_order_idx\` ON \`e67933bc56ed48ddc92a51e05dd2e16ec\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e67933bc56ed48ddc92a51e05dd2e16ec_parent_id_idx\` ON \`e67933bc56ed48ddc92a51e05dd2e16ec\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e3c6dbd1f63738f9a85006b63c3c94908_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`tier_name\` text NOT NULL,
  	\`rate\` numeric NOT NULL,
  	\`effective_from\` text,
  	\`effective_to\` text,
  	\`min_stay_days\` numeric,
  	\`is_active\` integer DEFAULT true,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bookable_resources_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e3c6dbd1f63738f9a85006b63c3c94908_v_order_idx\` ON \`_e3c6dbd1f63738f9a85006b63c3c94908_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e3c6dbd1f63738f9a85006b63c3c94908_v_parent_id_idx\` ON \`_e3c6dbd1f63738f9a85006b63c3c94908_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e67933bc56ed48ddc92a51e05dd2e16ec_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`tag\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_bookable_resources_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e67933bc56ed48ddc92a51e05dd2e16ec_v_order_idx\` ON \`_e67933bc56ed48ddc92a51e05dd2e16ec_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e67933bc56ed48ddc92a51e05dd2e16ec_v_parent_id_idx\` ON \`_e67933bc56ed48ddc92a51e05dd2e16ec_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e595e236aadea8384bc3bfd7c2ccb6542\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`gl_account_id\` text NOT NULL,
  	\`account_number\` text,
  	\`account_name\` text,
  	\`account_type\` text,
  	\`budget_amount\` numeric NOT NULL,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`budget_planning\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e595e236aadea8384bc3bfd7c2ccb6542_order_idx\` ON \`e595e236aadea8384bc3bfd7c2ccb6542\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e595e236aadea8384bc3bfd7c2ccb6542_parent_id_idx\` ON \`e595e236aadea8384bc3bfd7c2ccb6542\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e595e236aadea8384bc3bfd7c2ccb6542_gl_account_idx\` ON \`e595e236aadea8384bc3bfd7c2ccb6542\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`e595e236aadea8384bc3bfd7c2ccb6542_locales\` (
  	\`notes\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e595e236aadea8384bc3bfd7c2ccb6542\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e595e236aadea8384bc3bfd7c2ccb6542_locales_locale_parent_id_u\` ON \`e595e236aadea8384bc3bfd7c2ccb6542_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e595e236aadea8384bc3bfd7c2ccb6542_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`gl_account_id\` text NOT NULL,
  	\`account_number\` text,
  	\`account_name\` text,
  	\`account_type\` text,
  	\`budget_amount\` numeric NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_budget_planning_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e595e236aadea8384bc3bfd7c2ccb6542_v_order_idx\` ON \`_e595e236aadea8384bc3bfd7c2ccb6542_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e595e236aadea8384bc3bfd7c2ccb6542_v_parent_id_idx\` ON \`_e595e236aadea8384bc3bfd7c2ccb6542_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e595e236aadea8384bc3bfd7c2ccb6542_v_gl_account_idx\` ON \`_e595e236aadea8384bc3bfd7c2ccb6542_v\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`_e595e236aadea8384bc3bfd7c2ccb6542_v_locales\` (
  	\`notes\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e595e236aadea8384bc3bfd7c2ccb6542_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_e595e236aadea8384bc3bfd7c2ccb6542_v_locales_locale_parent_i\` ON \`_e595e236aadea8384bc3bfd7c2ccb6542_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e294e318ae4b38416b0854e7571907375\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`incoterm\` text,
  	\`transit_days\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`carriers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e294e318ae4b38416b0854e7571907375_order_idx\` ON \`e294e318ae4b38416b0854e7571907375\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e294e318ae4b38416b0854e7571907375_parent_id_idx\` ON \`e294e318ae4b38416b0854e7571907375\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e294e318ae4b38416b0854e7571907375_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e294e318ae4b38416b0854e7571907375\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e294e318ae4b38416b0854e7571907375_locales_locale_parent_id_u\` ON \`e294e318ae4b38416b0854e7571907375_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e294e318ae4b38416b0854e7571907375_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`incoterm\` text,
  	\`transit_days\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_carriers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e294e318ae4b38416b0854e7571907375_v_order_idx\` ON \`_e294e318ae4b38416b0854e7571907375_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e294e318ae4b38416b0854e7571907375_v_parent_id_idx\` ON \`_e294e318ae4b38416b0854e7571907375_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e294e318ae4b38416b0854e7571907375_v_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e294e318ae4b38416b0854e7571907375_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_e294e318ae4b38416b0854e7571907375_v_locales_locale_parent_i\` ON \`_e294e318ae4b38416b0854e7571907375_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e190f605baa358add905ea2130eb5e8d4\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`role\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cases\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e190f605baa358add905ea2130eb5e8d4_order_idx\` ON \`e190f605baa358add905ea2130eb5e8d4\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e190f605baa358add905ea2130eb5e8d4_parent_id_idx\` ON \`e190f605baa358add905ea2130eb5e8d4\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e190f605baa358add905ea2130eb5e8d4_role_idx\` ON \`e190f605baa358add905ea2130eb5e8d4\` (\`role\`);`)
  await db.run(sql`CREATE TABLE \`e4a27b40227628eedbbe6eb920284f46f\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`kind\` text NOT NULL,
  	\`held_at\` text,
  	\`summary\` text,
  	\`ruling\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cases\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e4a27b40227628eedbbe6eb920284f46f_order_idx\` ON \`e4a27b40227628eedbbe6eb920284f46f\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e4a27b40227628eedbbe6eb920284f46f_parent_id_idx\` ON \`e4a27b40227628eedbbe6eb920284f46f\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ecee216e00b478cf7afc1f02f06e6ca9f\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content_uuid\` text,
  	\`kind\` text,
  	\`summary\` text,
  	\`filed_at\` text,
  	\`filed_by_id\` text(36),
  	\`supersedes\` text,
  	FOREIGN KEY (\`filed_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cases\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ecee216e00b478cf7afc1f02f06e6ca9f_order_idx\` ON \`ecee216e00b478cf7afc1f02f06e6ca9f\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ecee216e00b478cf7afc1f02f06e6ca9f_parent_id_idx\` ON \`ecee216e00b478cf7afc1f02f06e6ca9f\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ecee216e00b478cf7afc1f02f06e6ca9f_content_uuid_idx\` ON \`ecee216e00b478cf7afc1f02f06e6ca9f\` (\`content_uuid\`);`)
  await db.run(sql`CREATE INDEX \`ecee216e00b478cf7afc1f02f06e6ca9f_filed_by_idx\` ON \`ecee216e00b478cf7afc1f02f06e6ca9f\` (\`filed_by_id\`);`)
  await db.run(sql`CREATE TABLE \`_e190f605baa358add905ea2130eb5e8d4_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`role\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_cases_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e190f605baa358add905ea2130eb5e8d4_v_order_idx\` ON \`_e190f605baa358add905ea2130eb5e8d4_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e190f605baa358add905ea2130eb5e8d4_v_parent_id_idx\` ON \`_e190f605baa358add905ea2130eb5e8d4_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e190f605baa358add905ea2130eb5e8d4_v_role_idx\` ON \`_e190f605baa358add905ea2130eb5e8d4_v\` (\`role\`);`)
  await db.run(sql`CREATE TABLE \`_e4a27b40227628eedbbe6eb920284f46f_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`kind\` text NOT NULL,
  	\`held_at\` text,
  	\`summary\` text,
  	\`ruling\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_cases_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e4a27b40227628eedbbe6eb920284f46f_v_order_idx\` ON \`_e4a27b40227628eedbbe6eb920284f46f_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e4a27b40227628eedbbe6eb920284f46f_v_parent_id_idx\` ON \`_e4a27b40227628eedbbe6eb920284f46f_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ecee216e00b478cf7afc1f02f06e6ca9f_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`content_uuid\` text,
  	\`kind\` text,
  	\`summary\` text,
  	\`filed_at\` text,
  	\`filed_by_id\` text(36),
  	\`supersedes\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`filed_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_cases_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ecee216e00b478cf7afc1f02f06e6ca9f_v_order_idx\` ON \`_ecee216e00b478cf7afc1f02f06e6ca9f_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ecee216e00b478cf7afc1f02f06e6ca9f_v_parent_id_idx\` ON \`_ecee216e00b478cf7afc1f02f06e6ca9f_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ecee216e00b478cf7afc1f02f06e6ca9f_v_content_uuid_idx\` ON \`_ecee216e00b478cf7afc1f02f06e6ca9f_v\` (\`content_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_ecee216e00b478cf7afc1f02f06e6ca9f_v_filed_by_idx\` ON \`_ecee216e00b478cf7afc1f02f06e6ca9f_v\` (\`filed_by_id\`);`)
  await db.run(sql`CREATE TABLE \`eb9ba47f0935d85bf9626dd6756872a56\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`title\` text,
  	\`url\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eb9ba47f0935d85bf9626dd6756872a56_order_idx\` ON \`eb9ba47f0935d85bf9626dd6756872a56\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eb9ba47f0935d85bf9626dd6756872a56_parent_id_idx\` ON \`eb9ba47f0935d85bf9626dd6756872a56\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`eb9ba47f0935d85bf9626dd6756872a56_doc_idx\` ON \`eb9ba47f0935d85bf9626dd6756872a56\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`_eb9ba47f0935d85bf9626dd6756872a56_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`title\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_eb9ba47f0935d85bf9626dd6756872a56_v_order_idx\` ON \`_eb9ba47f0935d85bf9626dd6756872a56_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eb9ba47f0935d85bf9626dd6756872a56_v_parent_id_idx\` ON \`_eb9ba47f0935d85bf9626dd6756872a56_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_eb9ba47f0935d85bf9626dd6756872a56_v_doc_idx\` ON \`_eb9ba47f0935d85bf9626dd6756872a56_v\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`e331d8adbec1389829f03d1a10e5ec41d\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence_number\` numeric NOT NULL,
  	\`journal_entry_id_id\` text(36) NOT NULL,
  	\`entry_description\` text NOT NULL,
  	\`accounts_closed\` text,
  	\`net_amount\` numeric NOT NULL,
  	\`retained_earnings_impact\` numeric,
  	\`posted\` integer DEFAULT false,
  	\`posted_date\` text,
  	\`reversing_entry_id_id\` text(36),
  	\`notes\` text,
  	FOREIGN KEY (\`journal_entry_id_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reversing_entry_id_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`closing_entries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e331d8adbec1389829f03d1a10e5ec41d_order_idx\` ON \`e331d8adbec1389829f03d1a10e5ec41d\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e331d8adbec1389829f03d1a10e5ec41d_parent_id_idx\` ON \`e331d8adbec1389829f03d1a10e5ec41d\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e331d8adbec1389829f03d1a10e5ec41d_journal_entry_id_idx\` ON \`e331d8adbec1389829f03d1a10e5ec41d\` (\`journal_entry_id_id\`);`)
  await db.run(sql`CREATE INDEX \`e331d8adbec1389829f03d1a10e5ec41d_reversing_entry_id_idx\` ON \`e331d8adbec1389829f03d1a10e5ec41d\` (\`reversing_entry_id_id\`);`)
  await db.run(sql`CREATE TABLE \`_e331d8adbec1389829f03d1a10e5ec41d_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`sequence_number\` numeric NOT NULL,
  	\`journal_entry_id_id\` text(36) NOT NULL,
  	\`entry_description\` text NOT NULL,
  	\`accounts_closed\` text,
  	\`net_amount\` numeric NOT NULL,
  	\`retained_earnings_impact\` numeric,
  	\`posted\` integer DEFAULT false,
  	\`posted_date\` text,
  	\`reversing_entry_id_id\` text(36),
  	\`notes\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`journal_entry_id_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reversing_entry_id_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_closing_entries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e331d8adbec1389829f03d1a10e5ec41d_v_order_idx\` ON \`_e331d8adbec1389829f03d1a10e5ec41d_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e331d8adbec1389829f03d1a10e5ec41d_v_parent_id_idx\` ON \`_e331d8adbec1389829f03d1a10e5ec41d_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e331d8adbec1389829f03d1a10e5ec41d_v_journal_entry_id_idx\` ON \`_e331d8adbec1389829f03d1a10e5ec41d_v\` (\`journal_entry_id_id\`);`)
  await db.run(sql`CREATE INDEX \`_e331d8adbec1389829f03d1a10e5ec41d_v_reversing_entry_id_idx\` ON \`_e331d8adbec1389829f03d1a10e5ec41d_v\` (\`reversing_entry_id_id\`);`)
  await db.run(sql`CREATE TABLE \`e656a9725ee398de3897bd61fd8162572\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`ec5da128012e481c48a0e85cf8143c2da\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e656a9725ee398de3897bd61fd8162572_order_idx\` ON \`e656a9725ee398de3897bd61fd8162572\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`e656a9725ee398de3897bd61fd8162572_parent_idx\` ON \`e656a9725ee398de3897bd61fd8162572\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e53bc78229e6886b6a047e57b9575cb8b\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`recipient_email\` text,
  	\`recipient_role\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ec5da128012e481c48a0e85cf8143c2da\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e53bc78229e6886b6a047e57b9575cb8b_order_idx\` ON \`e53bc78229e6886b6a047e57b9575cb8b\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e53bc78229e6886b6a047e57b9575cb8b_parent_id_idx\` ON \`e53bc78229e6886b6a047e57b9575cb8b\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ec5da128012e481c48a0e85cf8143c2da\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`notification_title\` text NOT NULL,
  	\`notification_content\` text,
  	\`days_before_due\` numeric NOT NULL,
  	\`sent_date\` text,
  	\`status\` text DEFAULT 'scheduled',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`compliance_deadlines\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ec5da128012e481c48a0e85cf8143c2da_order_idx\` ON \`ec5da128012e481c48a0e85cf8143c2da\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ec5da128012e481c48a0e85cf8143c2da_parent_id_idx\` ON \`ec5da128012e481c48a0e85cf8143c2da\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e656a9725ee398de3897bd61fd8162572_v\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_ec5da128012e481c48a0e85cf8143c2da_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e656a9725ee398de3897bd61fd8162572_v_order_idx\` ON \`_e656a9725ee398de3897bd61fd8162572_v\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_e656a9725ee398de3897bd61fd8162572_v_parent_idx\` ON \`_e656a9725ee398de3897bd61fd8162572_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e53bc78229e6886b6a047e57b9575cb8b_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`recipient_email\` text,
  	\`recipient_role\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_ec5da128012e481c48a0e85cf8143c2da_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e53bc78229e6886b6a047e57b9575cb8b_v_order_idx\` ON \`_e53bc78229e6886b6a047e57b9575cb8b_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e53bc78229e6886b6a047e57b9575cb8b_v_parent_id_idx\` ON \`_e53bc78229e6886b6a047e57b9575cb8b_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ec5da128012e481c48a0e85cf8143c2da_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`notification_title\` text NOT NULL,
  	\`notification_content\` text,
  	\`days_before_due\` numeric NOT NULL,
  	\`sent_date\` text,
  	\`status\` text DEFAULT 'scheduled',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_compliance_deadlines_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ec5da128012e481c48a0e85cf8143c2da_v_order_idx\` ON \`_ec5da128012e481c48a0e85cf8143c2da_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ec5da128012e481c48a0e85cf8143c2da_v_parent_id_idx\` ON \`_ec5da128012e481c48a0e85cf8143c2da_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e739a79cfffa08b4faa0baba3495bf9be\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`role\` text DEFAULT 'subsidiary',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`consolidation_eliminations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e739a79cfffa08b4faa0baba3495bf9be_order_idx\` ON \`e739a79cfffa08b4faa0baba3495bf9be\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e739a79cfffa08b4faa0baba3495bf9be_parent_id_idx\` ON \`e739a79cfffa08b4faa0baba3495bf9be\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e739a79cfffa08b4faa0baba3495bf9be_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`role\` text DEFAULT 'subsidiary',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_consolidation_eliminations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e739a79cfffa08b4faa0baba3495bf9be_v_order_idx\` ON \`_e739a79cfffa08b4faa0baba3495bf9be_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e739a79cfffa08b4faa0baba3495bf9be_v_parent_id_idx\` ON \`_e739a79cfffa08b4faa0baba3495bf9be_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e6cabc1f1ac608b48984c03e53002797a\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence_number\` numeric NOT NULL,
  	\`journal_entry_id_id\` text(36),
  	\`from_entity\` text NOT NULL,
  	\`to_entity\` text NOT NULL,
  	\`account\` text NOT NULL,
  	\`account_type\` text,
  	\`elimination_amount\` numeric NOT NULL,
  	\`description\` text,
  	\`posted\` integer DEFAULT false,
  	\`posted_date\` text,
  	FOREIGN KEY (\`journal_entry_id_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`consolidations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e6cabc1f1ac608b48984c03e53002797a_order_idx\` ON \`e6cabc1f1ac608b48984c03e53002797a\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e6cabc1f1ac608b48984c03e53002797a_parent_id_idx\` ON \`e6cabc1f1ac608b48984c03e53002797a\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e6cabc1f1ac608b48984c03e53002797a_journal_entry_id_idx\` ON \`e6cabc1f1ac608b48984c03e53002797a\` (\`journal_entry_id_id\`);`)
  await db.run(sql`CREATE TABLE \`_e6cabc1f1ac608b48984c03e53002797a_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`sequence_number\` numeric NOT NULL,
  	\`journal_entry_id_id\` text(36),
  	\`from_entity\` text NOT NULL,
  	\`to_entity\` text NOT NULL,
  	\`account\` text NOT NULL,
  	\`account_type\` text,
  	\`elimination_amount\` numeric NOT NULL,
  	\`description\` text,
  	\`posted\` integer DEFAULT false,
  	\`posted_date\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`journal_entry_id_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_consolidations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e6cabc1f1ac608b48984c03e53002797a_v_order_idx\` ON \`_e6cabc1f1ac608b48984c03e53002797a_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e6cabc1f1ac608b48984c03e53002797a_v_parent_id_idx\` ON \`_e6cabc1f1ac608b48984c03e53002797a_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e6cabc1f1ac608b48984c03e53002797a_v_journal_entry_id_idx\` ON \`_e6cabc1f1ac608b48984c03e53002797a_v\` (\`journal_entry_id_id\`);`)
  await db.run(sql`CREATE TABLE \`e476334f99a5080e1b8620daf7fabba26\` (
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
  await db.run(sql`CREATE INDEX \`e476334f99a5080e1b8620daf7fabba26_order_idx\` ON \`e476334f99a5080e1b8620daf7fabba26\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e476334f99a5080e1b8620daf7fabba26_parent_id_idx\` ON \`e476334f99a5080e1b8620daf7fabba26\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e476334f99a5080e1b8620daf7fabba26_modified_by_idx\` ON \`e476334f99a5080e1b8620daf7fabba26\` (\`modified_by_id\`);`)
  await db.run(sql`CREATE TABLE \`e476334f99a5080e1b8620daf7fabba26_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e476334f99a5080e1b8620daf7fabba26\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e476334f99a5080e1b8620daf7fabba26_locales_locale_parent_id_u\` ON \`e476334f99a5080e1b8620daf7fabba26_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e476334f99a5080e1b8620daf7fabba26_v\` (
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
  await db.run(sql`CREATE INDEX \`_e476334f99a5080e1b8620daf7fabba26_v_order_idx\` ON \`_e476334f99a5080e1b8620daf7fabba26_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e476334f99a5080e1b8620daf7fabba26_v_parent_id_idx\` ON \`_e476334f99a5080e1b8620daf7fabba26_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e476334f99a5080e1b8620daf7fabba26_v_modified_by_idx\` ON \`_e476334f99a5080e1b8620daf7fabba26_v\` (\`modified_by_id\`);`)
  await db.run(sql`CREATE TABLE \`_e476334f99a5080e1b8620daf7fabba26_v_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e476334f99a5080e1b8620daf7fabba26_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_e476334f99a5080e1b8620daf7fabba26_v_locales_locale_parent_i\` ON \`_e476334f99a5080e1b8620daf7fabba26_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ea97c27c5b39a86618794e02c9a375e5b\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`target_cost_center_id\` text(36),
  	\`basis\` text,
  	\`percentage\` numeric,
  	FOREIGN KEY (\`target_cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ea97c27c5b39a86618794e02c9a375e5b_order_idx\` ON \`ea97c27c5b39a86618794e02c9a375e5b\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ea97c27c5b39a86618794e02c9a375e5b_parent_id_idx\` ON \`ea97c27c5b39a86618794e02c9a375e5b\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ea97c27c5b39a86618794e02c9a375e5b_target_cost_center_idx\` ON \`ea97c27c5b39a86618794e02c9a375e5b\` (\`target_cost_center_id\`);`)
  await db.run(sql`CREATE TABLE \`ed73da8fdfdc782349d06169d1dacf27a\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ed73da8fdfdc782349d06169d1dacf27a_order_idx\` ON \`ed73da8fdfdc782349d06169d1dacf27a\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ed73da8fdfdc782349d06169d1dacf27a_parent_id_idx\` ON \`ed73da8fdfdc782349d06169d1dacf27a\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ed73da8fdfdc782349d06169d1dacf27a_locale_idx\` ON \`ed73da8fdfdc782349d06169d1dacf27a\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`ed73da8fdfdc782349d06169d1dacf27a_doc_idx\` ON \`ed73da8fdfdc782349d06169d1dacf27a\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`_ea97c27c5b39a86618794e02c9a375e5b_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`target_cost_center_id\` text(36),
  	\`basis\` text,
  	\`percentage\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`target_cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_cost_centers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ea97c27c5b39a86618794e02c9a375e5b_v_order_idx\` ON \`_ea97c27c5b39a86618794e02c9a375e5b_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ea97c27c5b39a86618794e02c9a375e5b_v_parent_id_idx\` ON \`_ea97c27c5b39a86618794e02c9a375e5b_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ea97c27c5b39a86618794e02c9a375e5b_v_target_cost_center_idx\` ON \`_ea97c27c5b39a86618794e02c9a375e5b_v\` (\`target_cost_center_id\`);`)
  await db.run(sql`CREATE TABLE \`_ed73da8fdfdc782349d06169d1dacf27a_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_cost_centers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ed73da8fdfdc782349d06169d1dacf27a_v_order_idx\` ON \`_ed73da8fdfdc782349d06169d1dacf27a_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ed73da8fdfdc782349d06169d1dacf27a_v_parent_id_idx\` ON \`_ed73da8fdfdc782349d06169d1dacf27a_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ed73da8fdfdc782349d06169d1dacf27a_v_locale_idx\` ON \`_ed73da8fdfdc782349d06169d1dacf27a_v\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`_ed73da8fdfdc782349d06169d1dacf27a_v_doc_idx\` ON \`_ed73da8fdfdc782349d06169d1dacf27a_v\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`eb1072c7c529688419f78c582bc502b89\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`method\` text NOT NULL,
  	\`stripe_refund_id\` text,
  	\`status\` text DEFAULT 'pending' NOT NULL,
  	\`refunded_at\` text,
  	\`settled_at\` text,
  	\`failure_reason\` text,
  	\`journal_entry_id\` text(36),
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`credit_memos\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eb1072c7c529688419f78c582bc502b89_order_idx\` ON \`eb1072c7c529688419f78c582bc502b89\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eb1072c7c529688419f78c582bc502b89_parent_id_idx\` ON \`eb1072c7c529688419f78c582bc502b89\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`eb1072c7c529688419f78c582bc502b89_journal_entry_idx\` ON \`eb1072c7c529688419f78c582bc502b89\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`_eb1072c7c529688419f78c582bc502b89_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`method\` text NOT NULL,
  	\`stripe_refund_id\` text,
  	\`status\` text DEFAULT 'pending' NOT NULL,
  	\`refunded_at\` text,
  	\`settled_at\` text,
  	\`failure_reason\` text,
  	\`journal_entry_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_credit_memos_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_eb1072c7c529688419f78c582bc502b89_v_order_idx\` ON \`_eb1072c7c529688419f78c582bc502b89_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eb1072c7c529688419f78c582bc502b89_v_parent_id_idx\` ON \`_eb1072c7c529688419f78c582bc502b89_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_eb1072c7c529688419f78c582bc502b89_v_journal_entry_idx\` ON \`_eb1072c7c529688419f78c582bc502b89_v\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`ebcc4e7fa5c5b870285d8619d67acbe3e\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`description\` text NOT NULL,
  	\`hs_code\` text NOT NULL,
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`net_weight\` numeric,
  	\`gross_weight\` numeric,
  	\`declared_value\` numeric NOT NULL,
  	\`preferential_origin\` integer DEFAULT false,
  	\`tariff_preference_code\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`customs_declarations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ebcc4e7fa5c5b870285d8619d67acbe3e_order_idx\` ON \`ebcc4e7fa5c5b870285d8619d67acbe3e\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ebcc4e7fa5c5b870285d8619d67acbe3e_parent_id_idx\` ON \`ebcc4e7fa5c5b870285d8619d67acbe3e\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ebcc4e7fa5c5b870285d8619d67acbe3e_item_idx\` ON \`ebcc4e7fa5c5b870285d8619d67acbe3e\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`description\` text NOT NULL,
  	\`hs_code\` text NOT NULL,
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`net_weight\` numeric,
  	\`gross_weight\` numeric,
  	\`declared_value\` numeric NOT NULL,
  	\`preferential_origin\` integer DEFAULT false,
  	\`tariff_preference_code\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_customs_declarations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v_order_idx\` ON \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v_parent_id_idx\` ON \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v_item_idx\` ON \`_ebcc4e7fa5c5b870285d8619d67acbe3e_v\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`e89747974e3198578977032ad94a759c1\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`special\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`data_processing_activities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e89747974e3198578977032ad94a759c1_order_idx\` ON \`e89747974e3198578977032ad94a759c1\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e89747974e3198578977032ad94a759c1_parent_id_idx\` ON \`e89747974e3198578977032ad94a759c1\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e4b2d0cf96ff18f2e94f69d77ee2c025f\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`data_processing_activities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e4b2d0cf96ff18f2e94f69d77ee2c025f_order_idx\` ON \`e4b2d0cf96ff18f2e94f69d77ee2c025f\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e4b2d0cf96ff18f2e94f69d77ee2c025f_parent_id_idx\` ON \`e4b2d0cf96ff18f2e94f69d77ee2c025f\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ed5b0fb68f51786feb6e1eee30449385f\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`data_processing_activities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ed5b0fb68f51786feb6e1eee30449385f_order_idx\` ON \`ed5b0fb68f51786feb6e1eee30449385f\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ed5b0fb68f51786feb6e1eee30449385f_parent_id_idx\` ON \`ed5b0fb68f51786feb6e1eee30449385f\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ed5b0fb68f51786feb6e1eee30449385f_locales\` (
  	\`recipient\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ed5b0fb68f51786feb6e1eee30449385f\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`ed5b0fb68f51786feb6e1eee30449385f_locales_locale_parent_id_u\` ON \`ed5b0fb68f51786feb6e1eee30449385f_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e89747974e3198578977032ad94a759c1_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`special\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_data_processing_activities_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e89747974e3198578977032ad94a759c1_v_order_idx\` ON \`_e89747974e3198578977032ad94a759c1_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e89747974e3198578977032ad94a759c1_v_parent_id_idx\` ON \`_e89747974e3198578977032ad94a759c1_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e4b2d0cf96ff18f2e94f69d77ee2c025f_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_data_processing_activities_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e4b2d0cf96ff18f2e94f69d77ee2c025f_v_order_idx\` ON \`_e4b2d0cf96ff18f2e94f69d77ee2c025f_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e4b2d0cf96ff18f2e94f69d77ee2c025f_v_parent_id_idx\` ON \`_e4b2d0cf96ff18f2e94f69d77ee2c025f_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ed5b0fb68f51786feb6e1eee30449385f_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_data_processing_activities_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ed5b0fb68f51786feb6e1eee30449385f_v_order_idx\` ON \`_ed5b0fb68f51786feb6e1eee30449385f_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ed5b0fb68f51786feb6e1eee30449385f_v_parent_id_idx\` ON \`_ed5b0fb68f51786feb6e1eee30449385f_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ed5b0fb68f51786feb6e1eee30449385f_v_locales\` (
  	\`recipient\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_ed5b0fb68f51786feb6e1eee30449385f_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_ed5b0fb68f51786feb6e1eee30449385f_v_locales_locale_parent_i\` ON \`_ed5b0fb68f51786feb6e1eee30449385f_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e1a216420daff8b30ba8bab31bff7f178\` (
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
  await db.run(sql`CREATE INDEX \`e1a216420daff8b30ba8bab31bff7f178_order_idx\` ON \`e1a216420daff8b30ba8bab31bff7f178\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e1a216420daff8b30ba8bab31bff7f178_parent_id_idx\` ON \`e1a216420daff8b30ba8bab31bff7f178\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e55475e7a36b48103a9792367bb20bd76\` (
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
  await db.run(sql`CREATE INDEX \`e55475e7a36b48103a9792367bb20bd76_order_idx\` ON \`e55475e7a36b48103a9792367bb20bd76\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e55475e7a36b48103a9792367bb20bd76_parent_id_idx\` ON \`e55475e7a36b48103a9792367bb20bd76\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e1a216420daff8b30ba8bab31bff7f178_v\` (
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
  await db.run(sql`CREATE INDEX \`_e1a216420daff8b30ba8bab31bff7f178_v_order_idx\` ON \`_e1a216420daff8b30ba8bab31bff7f178_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e1a216420daff8b30ba8bab31bff7f178_v_parent_id_idx\` ON \`_e1a216420daff8b30ba8bab31bff7f178_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e55475e7a36b48103a9792367bb20bd76_v\` (
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
  await db.run(sql`CREATE INDEX \`_e55475e7a36b48103a9792367bb20bd76_v_order_idx\` ON \`_e55475e7a36b48103a9792367bb20bd76_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e55475e7a36b48103a9792367bb20bd76_v_parent_id_idx\` ON \`_e55475e7a36b48103a9792367bb20bd76_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e2cf7ebcb20e98c53ac2931d630d1a794\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`disclosure_title\` text NOT NULL,
  	\`disclosure_requirement\` text NOT NULL,
  	\`applicability\` text NOT NULL,
  	\`applicability_condition\` text,
  	\`completion_status\` text DEFAULT 'not-started' NOT NULL,
  	\`assigned_to\` text,
  	\`target_date\` text,
  	\`completion_date\` text,
  	\`notes\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`disclosure_checklists\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e2cf7ebcb20e98c53ac2931d630d1a794_order_idx\` ON \`e2cf7ebcb20e98c53ac2931d630d1a794\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e2cf7ebcb20e98c53ac2931d630d1a794_parent_id_idx\` ON \`e2cf7ebcb20e98c53ac2931d630d1a794\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e2cf7ebcb20e98c53ac2931d630d1a794_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`sequence\` numeric NOT NULL,
  	\`disclosure_title\` text NOT NULL,
  	\`disclosure_requirement\` text NOT NULL,
  	\`applicability\` text NOT NULL,
  	\`applicability_condition\` text,
  	\`completion_status\` text DEFAULT 'not-started' NOT NULL,
  	\`assigned_to\` text,
  	\`target_date\` text,
  	\`completion_date\` text,
  	\`notes\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_disclosure_checklists_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e2cf7ebcb20e98c53ac2931d630d1a794_v_order_idx\` ON \`_e2cf7ebcb20e98c53ac2931d630d1a794_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e2cf7ebcb20e98c53ac2931d630d1a794_v_parent_id_idx\` ON \`_e2cf7ebcb20e98c53ac2931d630d1a794_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`eceaf268e207982e58512501eaf1eb056\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`stage\` text NOT NULL,
  	\`entered_at\` text NOT NULL,
  	\`amount_overdue_at_entry\` numeric,
  	\`communication_sent\` text,
  	\`communication_reference\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`dunning_cycles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eceaf268e207982e58512501eaf1eb056_order_idx\` ON \`eceaf268e207982e58512501eaf1eb056\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eceaf268e207982e58512501eaf1eb056_parent_id_idx\` ON \`eceaf268e207982e58512501eaf1eb056\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`eceaf268e207982e58512501eaf1eb056_locales\` (
  	\`notes\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`eceaf268e207982e58512501eaf1eb056\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`eceaf268e207982e58512501eaf1eb056_locales_locale_parent_id_u\` ON \`eceaf268e207982e58512501eaf1eb056_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_eceaf268e207982e58512501eaf1eb056_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`stage\` text NOT NULL,
  	\`entered_at\` text NOT NULL,
  	\`amount_overdue_at_entry\` numeric,
  	\`communication_sent\` text,
  	\`communication_reference\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_dunning_cycles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_eceaf268e207982e58512501eaf1eb056_v_order_idx\` ON \`_eceaf268e207982e58512501eaf1eb056_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eceaf268e207982e58512501eaf1eb056_v_parent_id_idx\` ON \`_eceaf268e207982e58512501eaf1eb056_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_eceaf268e207982e58512501eaf1eb056_v_locales\` (
  	\`notes\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_eceaf268e207982e58512501eaf1eb056_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_eceaf268e207982e58512501eaf1eb056_v_locales_locale_parent_i\` ON \`_eceaf268e207982e58512501eaf1eb056_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e6ad64a821b7689ad8f40c0ee61ef44c7\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`competency\` text NOT NULL,
  	\`proficiency\` numeric,
  	\`assessed_at\` text,
  	\`evidence\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e6ad64a821b7689ad8f40c0ee61ef44c7_order_idx\` ON \`e6ad64a821b7689ad8f40c0ee61ef44c7\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e6ad64a821b7689ad8f40c0ee61ef44c7_parent_id_idx\` ON \`e6ad64a821b7689ad8f40c0ee61ef44c7\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e6ad64a821b7689ad8f40c0ee61ef44c7_competency_idx\` ON \`e6ad64a821b7689ad8f40c0ee61ef44c7\` (\`competency\`);`)
  await db.run(sql`CREATE TABLE \`_e6ad64a821b7689ad8f40c0ee61ef44c7_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`competency\` text NOT NULL,
  	\`proficiency\` numeric,
  	\`assessed_at\` text,
  	\`evidence\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_employees_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e6ad64a821b7689ad8f40c0ee61ef44c7_v_order_idx\` ON \`_e6ad64a821b7689ad8f40c0ee61ef44c7_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e6ad64a821b7689ad8f40c0ee61ef44c7_v_parent_id_idx\` ON \`_e6ad64a821b7689ad8f40c0ee61ef44c7_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e6ad64a821b7689ad8f40c0ee61ef44c7_v_competency_idx\` ON \`_e6ad64a821b7689ad8f40c0ee61ef44c7_v\` (\`competency\`);`)
  await db.run(sql`CREATE TABLE \`ef34fbcd44ea281498af77442ff84199a\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`jurisdiction\` text NOT NULL,
  	\`applicable_in_jurisdiction\` integer DEFAULT true,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`entity_types\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ef34fbcd44ea281498af77442ff84199a_order_idx\` ON \`ef34fbcd44ea281498af77442ff84199a\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ef34fbcd44ea281498af77442ff84199a_parent_id_idx\` ON \`ef34fbcd44ea281498af77442ff84199a\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ef34fbcd44ea281498af77442ff84199a_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`jurisdiction\` text NOT NULL,
  	\`applicable_in_jurisdiction\` integer DEFAULT true,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_entity_types_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ef34fbcd44ea281498af77442ff84199a_v_order_idx\` ON \`_ef34fbcd44ea281498af77442ff84199a_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ef34fbcd44ea281498af77442ff84199a_v_parent_id_idx\` ON \`_ef34fbcd44ea281498af77442ff84199a_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e6ebcc7c621e687b59dbfd3dbfb40df80\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`ratio_name\` text NOT NULL,
  	\`ratio_value\` numeric NOT NULL,
  	\`category\` text NOT NULL,
  	\`interpretation\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`financial_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e6ebcc7c621e687b59dbfd3dbfb40df80_order_idx\` ON \`e6ebcc7c621e687b59dbfd3dbfb40df80\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e6ebcc7c621e687b59dbfd3dbfb40df80_parent_id_idx\` ON \`e6ebcc7c621e687b59dbfd3dbfb40df80\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`eb29a4918c12889c69eaee1b51e5e94dc\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`format\` text NOT NULL,
  	\`file_url\` text,
  	\`generated_at\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`financial_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eb29a4918c12889c69eaee1b51e5e94dc_order_idx\` ON \`eb29a4918c12889c69eaee1b51e5e94dc\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eb29a4918c12889c69eaee1b51e5e94dc_parent_id_idx\` ON \`eb29a4918c12889c69eaee1b51e5e94dc\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e6ebcc7c621e687b59dbfd3dbfb40df80_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`ratio_name\` text NOT NULL,
  	\`ratio_value\` numeric NOT NULL,
  	\`category\` text NOT NULL,
  	\`interpretation\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_financial_statements_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e6ebcc7c621e687b59dbfd3dbfb40df80_v_order_idx\` ON \`_e6ebcc7c621e687b59dbfd3dbfb40df80_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e6ebcc7c621e687b59dbfd3dbfb40df80_v_parent_id_idx\` ON \`_e6ebcc7c621e687b59dbfd3dbfb40df80_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_eb29a4918c12889c69eaee1b51e5e94dc_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`format\` text NOT NULL,
  	\`file_url\` text,
  	\`generated_at\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_financial_statements_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_eb29a4918c12889c69eaee1b51e5e94dc_v_order_idx\` ON \`_eb29a4918c12889c69eaee1b51e5e94dc_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eb29a4918c12889c69eaee1b51e5e94dc_v_parent_id_idx\` ON \`_eb29a4918c12889c69eaee1b51e5e94dc_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`efcc0fcec210180b68b558b4fd7cc7f1d\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`group\` text,
  	\`rate\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`fiscal_devices\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`efcc0fcec210180b68b558b4fd7cc7f1d_order_idx\` ON \`efcc0fcec210180b68b558b4fd7cc7f1d\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`efcc0fcec210180b68b558b4fd7cc7f1d_parent_id_idx\` ON \`efcc0fcec210180b68b558b4fd7cc7f1d\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_efcc0fcec210180b68b558b4fd7cc7f1d_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`group\` text,
  	\`rate\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_fiscal_devices_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_efcc0fcec210180b68b558b4fd7cc7f1d_v_order_idx\` ON \`_efcc0fcec210180b68b558b4fd7cc7f1d_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_efcc0fcec210180b68b558b4fd7cc7f1d_v_parent_id_idx\` ON \`_efcc0fcec210180b68b558b4fd7cc7f1d_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e056c1b5d14948e2cbc1c72ae143dec2a\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e056c1b5d14948e2cbc1c72ae143dec2a_order_idx\` ON \`e056c1b5d14948e2cbc1c72ae143dec2a\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e056c1b5d14948e2cbc1c72ae143dec2a_parent_id_idx\` ON \`e056c1b5d14948e2cbc1c72ae143dec2a\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e056c1b5d14948e2cbc1c72ae143dec2a_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_gl_accounts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e056c1b5d14948e2cbc1c72ae143dec2a_v_order_idx\` ON \`_e056c1b5d14948e2cbc1c72ae143dec2a_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e056c1b5d14948e2cbc1c72ae143dec2a_v_parent_id_idx\` ON \`_e056c1b5d14948e2cbc1c72ae143dec2a_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ee888d42e9fc48f37b14244e9a2631a6b\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`overridden_by\` text,
  	\`override_date\` text,
  	\`override_reason\` text NOT NULL,
  	\`prior_value\` text,
  	\`new_value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`gl_postings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ee888d42e9fc48f37b14244e9a2631a6b_order_idx\` ON \`ee888d42e9fc48f37b14244e9a2631a6b\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ee888d42e9fc48f37b14244e9a2631a6b_parent_id_idx\` ON \`ee888d42e9fc48f37b14244e9a2631a6b\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ea6ce72f9bf098ac48a6c7dc3362a4b9d\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`gl_account_id\` text NOT NULL,
  	\`account_number\` text,
  	\`account_name\` text,
  	\`debit_amount\` numeric DEFAULT 0,
  	\`credit_amount\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`gl_postings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ea6ce72f9bf098ac48a6c7dc3362a4b9d_order_idx\` ON \`ea6ce72f9bf098ac48a6c7dc3362a4b9d\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ea6ce72f9bf098ac48a6c7dc3362a4b9d_parent_id_idx\` ON \`ea6ce72f9bf098ac48a6c7dc3362a4b9d\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ea6ce72f9bf098ac48a6c7dc3362a4b9d_gl_account_idx\` ON \`ea6ce72f9bf098ac48a6c7dc3362a4b9d\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`_ee888d42e9fc48f37b14244e9a2631a6b_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`overridden_by\` text,
  	\`override_date\` text,
  	\`override_reason\` text NOT NULL,
  	\`prior_value\` text,
  	\`new_value\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_gl_postings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ee888d42e9fc48f37b14244e9a2631a6b_v_order_idx\` ON \`_ee888d42e9fc48f37b14244e9a2631a6b_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ee888d42e9fc48f37b14244e9a2631a6b_v_parent_id_idx\` ON \`_ee888d42e9fc48f37b14244e9a2631a6b_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ea6ce72f9bf098ac48a6c7dc3362a4b9d_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`gl_account_id\` text NOT NULL,
  	\`account_number\` text,
  	\`account_name\` text,
  	\`debit_amount\` numeric DEFAULT 0,
  	\`credit_amount\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`_uuid\` text,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_gl_postings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ea6ce72f9bf098ac48a6c7dc3362a4b9d_v_order_idx\` ON \`_ea6ce72f9bf098ac48a6c7dc3362a4b9d_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ea6ce72f9bf098ac48a6c7dc3362a4b9d_v_parent_id_idx\` ON \`_ea6ce72f9bf098ac48a6c7dc3362a4b9d_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ea6ce72f9bf098ac48a6c7dc3362a4b9d_v_gl_account_idx\` ON \`_ea6ce72f9bf098ac48a6c7dc3362a4b9d_v\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`eeacdeee24bab86b0a04db17f2c688224\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity_received\` numeric NOT NULL,
  	\`quantity_damaged\` numeric DEFAULT 0,
  	\`condition\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`goods_receipts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eeacdeee24bab86b0a04db17f2c688224_order_idx\` ON \`eeacdeee24bab86b0a04db17f2c688224\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eeacdeee24bab86b0a04db17f2c688224_parent_id_idx\` ON \`eeacdeee24bab86b0a04db17f2c688224\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`eeacdeee24bab86b0a04db17f2c688224_item_idx\` ON \`eeacdeee24bab86b0a04db17f2c688224\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`eeacdeee24bab86b0a04db17f2c688224_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`eeacdeee24bab86b0a04db17f2c688224\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`eeacdeee24bab86b0a04db17f2c688224_locales_locale_parent_id_u\` ON \`eeacdeee24bab86b0a04db17f2c688224_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_eeacdeee24bab86b0a04db17f2c688224_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity_received\` numeric NOT NULL,
  	\`quantity_damaged\` numeric DEFAULT 0,
  	\`condition\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_goods_receipts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_eeacdeee24bab86b0a04db17f2c688224_v_order_idx\` ON \`_eeacdeee24bab86b0a04db17f2c688224_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eeacdeee24bab86b0a04db17f2c688224_v_parent_id_idx\` ON \`_eeacdeee24bab86b0a04db17f2c688224_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_eeacdeee24bab86b0a04db17f2c688224_v_item_idx\` ON \`_eeacdeee24bab86b0a04db17f2c688224_v\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`_eeacdeee24bab86b0a04db17f2c688224_v_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_eeacdeee24bab86b0a04db17f2c688224_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_eeacdeee24bab86b0a04db17f2c688224_v_locales_locale_parent_i\` ON \`_eeacdeee24bab86b0a04db17f2c688224_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e2ed3319156f98328b9f2124e3154b2b0\` (
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
  await db.run(sql`CREATE INDEX \`e2ed3319156f98328b9f2124e3154b2b0_order_idx\` ON \`e2ed3319156f98328b9f2124e3154b2b0\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e2ed3319156f98328b9f2124e3154b2b0_parent_id_idx\` ON \`e2ed3319156f98328b9f2124e3154b2b0\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ea2509c33f75c8e20a0407280749b7f16\` (
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
  await db.run(sql`CREATE INDEX \`ea2509c33f75c8e20a0407280749b7f16_order_idx\` ON \`ea2509c33f75c8e20a0407280749b7f16\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ea2509c33f75c8e20a0407280749b7f16_parent_id_idx\` ON \`ea2509c33f75c8e20a0407280749b7f16\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e2ed3319156f98328b9f2124e3154b2b0_v\` (
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
  await db.run(sql`CREATE INDEX \`_e2ed3319156f98328b9f2124e3154b2b0_v_order_idx\` ON \`_e2ed3319156f98328b9f2124e3154b2b0_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e2ed3319156f98328b9f2124e3154b2b0_v_parent_id_idx\` ON \`_e2ed3319156f98328b9f2124e3154b2b0_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ea2509c33f75c8e20a0407280749b7f16_v\` (
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
  await db.run(sql`CREATE INDEX \`_ea2509c33f75c8e20a0407280749b7f16_v_order_idx\` ON \`_ea2509c33f75c8e20a0407280749b7f16_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ea2509c33f75c8e20a0407280749b7f16_v_parent_id_idx\` ON \`_ea2509c33f75c8e20a0407280749b7f16_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e0f3c4597ea4d815698b6463649de69e2\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category_code\` text NOT NULL,
  	\`rate\` numeric,
  	\`taxable_amount\` numeric NOT NULL,
  	\`tax_amount\` numeric NOT NULL,
  	\`exemption_reason_code\` text,
  	\`exemption_reason\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e0f3c4597ea4d815698b6463649de69e2_order_idx\` ON \`e0f3c4597ea4d815698b6463649de69e2\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e0f3c4597ea4d815698b6463649de69e2_parent_id_idx\` ON \`e0f3c4597ea4d815698b6463649de69e2\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e0f3c4597ea4d815698b6463649de69e2_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`category_code\` text NOT NULL,
  	\`rate\` numeric,
  	\`taxable_amount\` numeric NOT NULL,
  	\`tax_amount\` numeric NOT NULL,
  	\`exemption_reason_code\` text,
  	\`exemption_reason\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_invoices_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e0f3c4597ea4d815698b6463649de69e2_v_order_idx\` ON \`_e0f3c4597ea4d815698b6463649de69e2_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e0f3c4597ea4d815698b6463649de69e2_v_parent_id_idx\` ON \`_e0f3c4597ea4d815698b6463649de69e2_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e89951a9dc19789428d4d937cfad80caf\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`competency\` text NOT NULL,
  	\`min_proficiency\` numeric,
  	\`mandatory\` integer DEFAULT true,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`job_positions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e89951a9dc19789428d4d937cfad80caf_order_idx\` ON \`e89951a9dc19789428d4d937cfad80caf\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e89951a9dc19789428d4d937cfad80caf_parent_id_idx\` ON \`e89951a9dc19789428d4d937cfad80caf\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e89951a9dc19789428d4d937cfad80caf_competency_idx\` ON \`e89951a9dc19789428d4d937cfad80caf\` (\`competency\`);`)
  await db.run(sql`CREATE TABLE \`_e89951a9dc19789428d4d937cfad80caf_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`competency\` text NOT NULL,
  	\`min_proficiency\` numeric,
  	\`mandatory\` integer DEFAULT true,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_job_positions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e89951a9dc19789428d4d937cfad80caf_v_order_idx\` ON \`_e89951a9dc19789428d4d937cfad80caf_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e89951a9dc19789428d4d937cfad80caf_v_parent_id_idx\` ON \`_e89951a9dc19789428d4d937cfad80caf_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e89951a9dc19789428d4d937cfad80caf_v_competency_idx\` ON \`_e89951a9dc19789428d4d937cfad80caf_v\` (\`competency\`);`)
  await db.run(sql`CREATE TABLE \`e1bde3ecd157d8e63be74306ae19685b5\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`line_number\` numeric DEFAULT 1,
  	\`gl_account_id\` text NOT NULL,
  	\`account_number\` text,
  	\`account_name\` text,
  	\`debit\` numeric DEFAULT 0,
  	\`credit\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`exchange_rate\` numeric DEFAULT 1,
  	\`cost_center_id\` text,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e1bde3ecd157d8e63be74306ae19685b5_order_idx\` ON \`e1bde3ecd157d8e63be74306ae19685b5\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e1bde3ecd157d8e63be74306ae19685b5_parent_id_idx\` ON \`e1bde3ecd157d8e63be74306ae19685b5\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e1bde3ecd157d8e63be74306ae19685b5_gl_account_idx\` ON \`e1bde3ecd157d8e63be74306ae19685b5\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`e1bde3ecd157d8e63be74306ae19685b5_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e1bde3ecd157d8e63be74306ae19685b5\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e1bde3ecd157d8e63be74306ae19685b5_locales_locale_parent_id_u\` ON \`e1bde3ecd157d8e63be74306ae19685b5_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e1bde3ecd157d8e63be74306ae19685b5_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`line_number\` numeric DEFAULT 1,
  	\`gl_account_id\` text NOT NULL,
  	\`account_number\` text,
  	\`account_name\` text,
  	\`debit\` numeric DEFAULT 0,
  	\`credit\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`exchange_rate\` numeric DEFAULT 1,
  	\`cost_center_id\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_journal_entries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e1bde3ecd157d8e63be74306ae19685b5_v_order_idx\` ON \`_e1bde3ecd157d8e63be74306ae19685b5_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e1bde3ecd157d8e63be74306ae19685b5_v_parent_id_idx\` ON \`_e1bde3ecd157d8e63be74306ae19685b5_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e1bde3ecd157d8e63be74306ae19685b5_v_gl_account_idx\` ON \`_e1bde3ecd157d8e63be74306ae19685b5_v\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`_e1bde3ecd157d8e63be74306ae19685b5_v_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e1bde3ecd157d8e63be74306ae19685b5_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_e1bde3ecd157d8e63be74306ae19685b5_v_locales_locale_parent_i\` ON \`_e1bde3ecd157d8e63be74306ae19685b5_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e1dc5ded7e20c82a1b0dd2f3eaf6425fd\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_type\` text,
  	\`doc_number\` text,
  	\`issuing_country\` text,
  	\`expires_at\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`kyc_checks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e1dc5ded7e20c82a1b0dd2f3eaf6425fd_order_idx\` ON \`e1dc5ded7e20c82a1b0dd2f3eaf6425fd\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e1dc5ded7e20c82a1b0dd2f3eaf6425fd_parent_id_idx\` ON \`e1dc5ded7e20c82a1b0dd2f3eaf6425fd\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e1dc5ded7e20c82a1b0dd2f3eaf6425fd_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`doc_type\` text,
  	\`doc_number\` text,
  	\`issuing_country\` text,
  	\`expires_at\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_kyc_checks_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e1dc5ded7e20c82a1b0dd2f3eaf6425fd_v_order_idx\` ON \`_e1dc5ded7e20c82a1b0dd2f3eaf6425fd_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e1dc5ded7e20c82a1b0dd2f3eaf6425fd_v_parent_id_idx\` ON \`_e1dc5ded7e20c82a1b0dd2f3eaf6425fd_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e5496afa044df8c088b22ddbda34aa6ab\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`effective_date\` text NOT NULL,
  	\`kind\` text NOT NULL,
  	\`new_discount_rate_percent\` numeric,
  	\`new_fixed_payment\` numeric,
  	\`new_end_date\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`leases\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e5496afa044df8c088b22ddbda34aa6ab_order_idx\` ON \`e5496afa044df8c088b22ddbda34aa6ab\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e5496afa044df8c088b22ddbda34aa6ab_parent_id_idx\` ON \`e5496afa044df8c088b22ddbda34aa6ab\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e5496afa044df8c088b22ddbda34aa6ab_locales\` (
  	\`notes\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e5496afa044df8c088b22ddbda34aa6ab\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e5496afa044df8c088b22ddbda34aa6ab_locales_locale_parent_id_u\` ON \`e5496afa044df8c088b22ddbda34aa6ab_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e5496afa044df8c088b22ddbda34aa6ab_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`effective_date\` text NOT NULL,
  	\`kind\` text NOT NULL,
  	\`new_discount_rate_percent\` numeric,
  	\`new_fixed_payment\` numeric,
  	\`new_end_date\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_leases_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e5496afa044df8c088b22ddbda34aa6ab_v_order_idx\` ON \`_e5496afa044df8c088b22ddbda34aa6ab_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e5496afa044df8c088b22ddbda34aa6ab_v_parent_id_idx\` ON \`_e5496afa044df8c088b22ddbda34aa6ab_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e5496afa044df8c088b22ddbda34aa6ab_v_locales\` (
  	\`notes\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e5496afa044df8c088b22ddbda34aa6ab_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_e5496afa044df8c088b22ddbda34aa6ab_v_locales_locale_parent_i\` ON \`_e5496afa044df8c088b22ddbda34aa6ab_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e70edf9a8aa6d85848b0f21b5df0eb698\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e70edf9a8aa6d85848b0f21b5df0eb698_order_idx\` ON \`e70edf9a8aa6d85848b0f21b5df0eb698\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e70edf9a8aa6d85848b0f21b5df0eb698_parent_id_idx\` ON \`e70edf9a8aa6d85848b0f21b5df0eb698\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e70edf9a8aa6d85848b0f21b5df0eb698_locale_idx\` ON \`e70edf9a8aa6d85848b0f21b5df0eb698\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`e70edf9a8aa6d85848b0f21b5df0eb698_doc_idx\` ON \`e70edf9a8aa6d85848b0f21b5df0eb698\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`_e70edf9a8aa6d85848b0f21b5df0eb698_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_legal_entities_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e70edf9a8aa6d85848b0f21b5df0eb698_v_order_idx\` ON \`_e70edf9a8aa6d85848b0f21b5df0eb698_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e70edf9a8aa6d85848b0f21b5df0eb698_v_parent_id_idx\` ON \`_e70edf9a8aa6d85848b0f21b5df0eb698_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e70edf9a8aa6d85848b0f21b5df0eb698_v_locale_idx\` ON \`_e70edf9a8aa6d85848b0f21b5df0eb698_v\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`_e70edf9a8aa6d85848b0f21b5df0eb698_v_doc_idx\` ON \`_e70edf9a8aa6d85848b0f21b5df0eb698_v\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`eb22e68b6bc9e83c8b9eb71f57a6918ce\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`units\` numeric,
  	\`produced\` numeric,
  	\`packed\` numeric,
  	\`shipped\` numeric,
  	\`delivered\` numeric,
  	\`ordered\` numeric,
  	\`unit_grams\` numeric,
  	\`minutes_ordered\` numeric,
  	\`minutes_produced\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`lot_variants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eb22e68b6bc9e83c8b9eb71f57a6918ce_order_idx\` ON \`eb22e68b6bc9e83c8b9eb71f57a6918ce\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eb22e68b6bc9e83c8b9eb71f57a6918ce_parent_id_idx\` ON \`eb22e68b6bc9e83c8b9eb71f57a6918ce\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_eb22e68b6bc9e83c8b9eb71f57a6918ce_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`units\` numeric,
  	\`produced\` numeric,
  	\`packed\` numeric,
  	\`shipped\` numeric,
  	\`delivered\` numeric,
  	\`ordered\` numeric,
  	\`unit_grams\` numeric,
  	\`minutes_ordered\` numeric,
  	\`minutes_produced\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_lot_variants_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_eb22e68b6bc9e83c8b9eb71f57a6918ce_v_order_idx\` ON \`_eb22e68b6bc9e83c8b9eb71f57a6918ce_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eb22e68b6bc9e83c8b9eb71f57a6918ce_v_parent_id_idx\` ON \`_eb22e68b6bc9e83c8b9eb71f57a6918ce_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e884551fbfb37859eb103c596d4a20817\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`maintenance_work_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e884551fbfb37859eb103c596d4a20817_order_idx\` ON \`e884551fbfb37859eb103c596d4a20817\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e884551fbfb37859eb103c596d4a20817_parent_id_idx\` ON \`e884551fbfb37859eb103c596d4a20817\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e884551fbfb37859eb103c596d4a20817_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e884551fbfb37859eb103c596d4a20817\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e884551fbfb37859eb103c596d4a20817_locales_locale_parent_id_u\` ON \`e884551fbfb37859eb103c596d4a20817_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e884551fbfb37859eb103c596d4a20817_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`url\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_maintenance_work_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e884551fbfb37859eb103c596d4a20817_v_order_idx\` ON \`_e884551fbfb37859eb103c596d4a20817_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e884551fbfb37859eb103c596d4a20817_v_parent_id_idx\` ON \`_e884551fbfb37859eb103c596d4a20817_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e884551fbfb37859eb103c596d4a20817_v_locales\` (
  	\`caption\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e884551fbfb37859eb103c596d4a20817_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_e884551fbfb37859eb103c596d4a20817_v_locales_locale_parent_i\` ON \`_e884551fbfb37859eb103c596d4a20817_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e7b6d5ba25f4f809caff6535d1804c987\` (
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
  await db.run(sql`CREATE INDEX \`e7b6d5ba25f4f809caff6535d1804c987_order_idx\` ON \`e7b6d5ba25f4f809caff6535d1804c987\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e7b6d5ba25f4f809caff6535d1804c987_parent_id_idx\` ON \`e7b6d5ba25f4f809caff6535d1804c987\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e7b6d5ba25f4f809caff6535d1804c987_signature_document_idx\` ON \`e7b6d5ba25f4f809caff6535d1804c987\` (\`signature_document_id\`);`)
  await db.run(sql`CREATE TABLE \`_e7b6d5ba25f4f809caff6535d1804c987_v\` (
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
  await db.run(sql`CREATE INDEX \`_e7b6d5ba25f4f809caff6535d1804c987_v_order_idx\` ON \`_e7b6d5ba25f4f809caff6535d1804c987_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e7b6d5ba25f4f809caff6535d1804c987_v_parent_id_idx\` ON \`_e7b6d5ba25f4f809caff6535d1804c987_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e7b6d5ba25f4f809caff6535d1804c987_v_signature_document_idx\` ON \`_e7b6d5ba25f4f809caff6535d1804c987_v\` (\`signature_document_id\`);`)
  await db.run(sql`CREATE TABLE \`e2fd3794b06848c5791b307f9f023909c\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`assertion\` text,
  	\`certification_level\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`management_certifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e2fd3794b06848c5791b307f9f023909c_order_idx\` ON \`e2fd3794b06848c5791b307f9f023909c\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e2fd3794b06848c5791b307f9f023909c_parent_id_idx\` ON \`e2fd3794b06848c5791b307f9f023909c\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e2fd3794b06848c5791b307f9f023909c_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`assertion\` text,
  	\`certification_level\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_management_certifications_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e2fd3794b06848c5791b307f9f023909c_v_order_idx\` ON \`_e2fd3794b06848c5791b307f9f023909c_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e2fd3794b06848c5791b307f9f023909c_v_parent_id_idx\` ON \`_e2fd3794b06848c5791b307f9f023909c_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`efd47cc9ff5ea8cf99caa31b20fc740b2\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`collection\` text NOT NULL,
  	\`doc_id\` text NOT NULL,
  	\`edge_kind\` text DEFAULT 'about',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`memories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`efd47cc9ff5ea8cf99caa31b20fc740b2_order_idx\` ON \`efd47cc9ff5ea8cf99caa31b20fc740b2\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`efd47cc9ff5ea8cf99caa31b20fc740b2_parent_id_idx\` ON \`efd47cc9ff5ea8cf99caa31b20fc740b2\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_efd47cc9ff5ea8cf99caa31b20fc740b2_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`collection\` text NOT NULL,
  	\`doc_id\` text NOT NULL,
  	\`edge_kind\` text DEFAULT 'about',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_memories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_efd47cc9ff5ea8cf99caa31b20fc740b2_v_order_idx\` ON \`_efd47cc9ff5ea8cf99caa31b20fc740b2_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_efd47cc9ff5ea8cf99caa31b20fc740b2_v_parent_id_idx\` ON \`_efd47cc9ff5ea8cf99caa31b20fc740b2_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e2aa7c626cae68b3b9472f11356928281\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`ordered\` numeric DEFAULT 0,
  	\`packed\` numeric DEFAULT 0,
  	\`unit_grams\` numeric,
  	\`net_unit_grams\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pack_items\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e2aa7c626cae68b3b9472f11356928281_order_idx\` ON \`e2aa7c626cae68b3b9472f11356928281\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e2aa7c626cae68b3b9472f11356928281_parent_id_idx\` ON \`e2aa7c626cae68b3b9472f11356928281\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e2aa7c626cae68b3b9472f11356928281_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`ordered\` numeric DEFAULT 0,
  	\`packed\` numeric DEFAULT 0,
  	\`unit_grams\` numeric,
  	\`net_unit_grams\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pack_items_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e2aa7c626cae68b3b9472f11356928281_v_order_idx\` ON \`_e2aa7c626cae68b3b9472f11356928281_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e2aa7c626cae68b3b9472f11356928281_v_parent_id_idx\` ON \`_e2aa7c626cae68b3b9472f11356928281_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e748d22a668778d2291b0c286f5fb0b16\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36) NOT NULL,
  	\`batch_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`batch_id\`) REFERENCES \`batches\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e748d22a668778d2291b0c286f5fb0b16_order_idx\` ON \`e748d22a668778d2291b0c286f5fb0b16\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e748d22a668778d2291b0c286f5fb0b16_parent_id_idx\` ON \`e748d22a668778d2291b0c286f5fb0b16\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e748d22a668778d2291b0c286f5fb0b16_item_idx\` ON \`e748d22a668778d2291b0c286f5fb0b16\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`e748d22a668778d2291b0c286f5fb0b16_batch_idx\` ON \`e748d22a668778d2291b0c286f5fb0b16\` (\`batch_id\`);`)
  await db.run(sql`CREATE TABLE \`_e748d22a668778d2291b0c286f5fb0b16_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36) NOT NULL,
  	\`batch_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`batch_id\`) REFERENCES \`batches\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_packages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e748d22a668778d2291b0c286f5fb0b16_v_order_idx\` ON \`_e748d22a668778d2291b0c286f5fb0b16_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e748d22a668778d2291b0c286f5fb0b16_v_parent_id_idx\` ON \`_e748d22a668778d2291b0c286f5fb0b16_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e748d22a668778d2291b0c286f5fb0b16_v_item_idx\` ON \`_e748d22a668778d2291b0c286f5fb0b16_v\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`_e748d22a668778d2291b0c286f5fb0b16_v_batch_idx\` ON \`_e748d22a668778d2291b0c286f5fb0b16_v\` (\`batch_id\`);`)
  await db.run(sql`CREATE TABLE \`e0dc067124d478cdba631b9fa5d670eec\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e0dc067124d478cdba631b9fa5d670eec_order_idx\` ON \`e0dc067124d478cdba631b9fa5d670eec\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e0dc067124d478cdba631b9fa5d670eec_parent_id_idx\` ON \`e0dc067124d478cdba631b9fa5d670eec\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e0dc067124d478cdba631b9fa5d670eec_locale_idx\` ON \`e0dc067124d478cdba631b9fa5d670eec\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`e0b6622b1c93180c98294697a29240a6f\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e36c778a2ac5684d1bbce502ea4931500\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e0b6622b1c93180c98294697a29240a6f_order_idx\` ON \`e0b6622b1c93180c98294697a29240a6f\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e0b6622b1c93180c98294697a29240a6f_parent_id_idx\` ON \`e0b6622b1c93180c98294697a29240a6f\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e0b6622b1c93180c98294697a29240a6f_locale_idx\` ON \`e0b6622b1c93180c98294697a29240a6f\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`e36c778a2ac5684d1bbce502ea4931500\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e36c778a2ac5684d1bbce502ea4931500_order_idx\` ON \`e36c778a2ac5684d1bbce502ea4931500\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e36c778a2ac5684d1bbce502ea4931500_parent_id_idx\` ON \`e36c778a2ac5684d1bbce502ea4931500\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e36c778a2ac5684d1bbce502ea4931500_path_idx\` ON \`e36c778a2ac5684d1bbce502ea4931500\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`e36c778a2ac5684d1bbce502ea4931500_locale_idx\` ON \`e36c778a2ac5684d1bbce502ea4931500\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`ee3949e56baa28c1b867172a5dee40d6a\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'oneThird',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ef7c8a03cb2628f4da06a88c4f30d47c7\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ee3949e56baa28c1b867172a5dee40d6a_order_idx\` ON \`ee3949e56baa28c1b867172a5dee40d6a\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ee3949e56baa28c1b867172a5dee40d6a_parent_id_idx\` ON \`ee3949e56baa28c1b867172a5dee40d6a\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ee3949e56baa28c1b867172a5dee40d6a_locale_idx\` ON \`ee3949e56baa28c1b867172a5dee40d6a\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`ef7c8a03cb2628f4da06a88c4f30d47c7\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ef7c8a03cb2628f4da06a88c4f30d47c7_order_idx\` ON \`ef7c8a03cb2628f4da06a88c4f30d47c7\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ef7c8a03cb2628f4da06a88c4f30d47c7_parent_id_idx\` ON \`ef7c8a03cb2628f4da06a88c4f30d47c7\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ef7c8a03cb2628f4da06a88c4f30d47c7_path_idx\` ON \`ef7c8a03cb2628f4da06a88c4f30d47c7\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`ef7c8a03cb2628f4da06a88c4f30d47c7_locale_idx\` ON \`ef7c8a03cb2628f4da06a88c4f30d47c7\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`e81cc20c70fe78dbeaf3103630ebc6fbc\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` text(36),
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e81cc20c70fe78dbeaf3103630ebc6fbc_order_idx\` ON \`e81cc20c70fe78dbeaf3103630ebc6fbc\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e81cc20c70fe78dbeaf3103630ebc6fbc_parent_id_idx\` ON \`e81cc20c70fe78dbeaf3103630ebc6fbc\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e81cc20c70fe78dbeaf3103630ebc6fbc_path_idx\` ON \`e81cc20c70fe78dbeaf3103630ebc6fbc\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`e81cc20c70fe78dbeaf3103630ebc6fbc_locale_idx\` ON \`e81cc20c70fe78dbeaf3103630ebc6fbc\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`e81cc20c70fe78dbeaf3103630ebc6fbc_media_idx\` ON \`e81cc20c70fe78dbeaf3103630ebc6fbc\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`e9cafee9f0fed8430a34bf14bb8d7771b\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`intro_content\` text,
  	\`populate_by\` text DEFAULT 'collection',
  	\`relation_to\` text DEFAULT 'posts',
  	\`limit\` numeric DEFAULT 10,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e9cafee9f0fed8430a34bf14bb8d7771b_order_idx\` ON \`e9cafee9f0fed8430a34bf14bb8d7771b\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e9cafee9f0fed8430a34bf14bb8d7771b_parent_id_idx\` ON \`e9cafee9f0fed8430a34bf14bb8d7771b\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e9cafee9f0fed8430a34bf14bb8d7771b_path_idx\` ON \`e9cafee9f0fed8430a34bf14bb8d7771b\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`e9cafee9f0fed8430a34bf14bb8d7771b_locale_idx\` ON \`e9cafee9f0fed8430a34bf14bb8d7771b\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`e87f1621ae35f869b9a226c9e15aa2c0c\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_id\` text(36),
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e87f1621ae35f869b9a226c9e15aa2c0c_order_idx\` ON \`e87f1621ae35f869b9a226c9e15aa2c0c\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e87f1621ae35f869b9a226c9e15aa2c0c_parent_id_idx\` ON \`e87f1621ae35f869b9a226c9e15aa2c0c\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e87f1621ae35f869b9a226c9e15aa2c0c_path_idx\` ON \`e87f1621ae35f869b9a226c9e15aa2c0c\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`e87f1621ae35f869b9a226c9e15aa2c0c_locale_idx\` ON \`e87f1621ae35f869b9a226c9e15aa2c0c\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`e87f1621ae35f869b9a226c9e15aa2c0c_form_idx\` ON \`e87f1621ae35f869b9a226c9e15aa2c0c\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`e9e1fb928a8a084e1aa55074c6bfe43c8\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`title\` text,
  	\`url\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e9e1fb928a8a084e1aa55074c6bfe43c8_order_idx\` ON \`e9e1fb928a8a084e1aa55074c6bfe43c8\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e9e1fb928a8a084e1aa55074c6bfe43c8_parent_id_idx\` ON \`e9e1fb928a8a084e1aa55074c6bfe43c8\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e9e1fb928a8a084e1aa55074c6bfe43c8_doc_idx\` ON \`e9e1fb928a8a084e1aa55074c6bfe43c8\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`_e0dc067124d478cdba631b9fa5d670eec_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e0dc067124d478cdba631b9fa5d670eec_v_order_idx\` ON \`_e0dc067124d478cdba631b9fa5d670eec_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e0dc067124d478cdba631b9fa5d670eec_v_parent_id_idx\` ON \`_e0dc067124d478cdba631b9fa5d670eec_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e0dc067124d478cdba631b9fa5d670eec_v_locale_idx\` ON \`_e0dc067124d478cdba631b9fa5d670eec_v\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_e0b6622b1c93180c98294697a29240a6f_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e36c778a2ac5684d1bbce502ea4931500_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e0b6622b1c93180c98294697a29240a6f_v_order_idx\` ON \`_e0b6622b1c93180c98294697a29240a6f_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e0b6622b1c93180c98294697a29240a6f_v_parent_id_idx\` ON \`_e0b6622b1c93180c98294697a29240a6f_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e0b6622b1c93180c98294697a29240a6f_v_locale_idx\` ON \`_e0b6622b1c93180c98294697a29240a6f_v\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_e36c778a2ac5684d1bbce502ea4931500_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e36c778a2ac5684d1bbce502ea4931500_v_order_idx\` ON \`_e36c778a2ac5684d1bbce502ea4931500_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e36c778a2ac5684d1bbce502ea4931500_v_parent_id_idx\` ON \`_e36c778a2ac5684d1bbce502ea4931500_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e36c778a2ac5684d1bbce502ea4931500_v_path_idx\` ON \`_e36c778a2ac5684d1bbce502ea4931500_v\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_e36c778a2ac5684d1bbce502ea4931500_v_locale_idx\` ON \`_e36c778a2ac5684d1bbce502ea4931500_v\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_ee3949e56baa28c1b867172a5dee40d6a_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'oneThird',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_ef7c8a03cb2628f4da06a88c4f30d47c7_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ee3949e56baa28c1b867172a5dee40d6a_v_order_idx\` ON \`_ee3949e56baa28c1b867172a5dee40d6a_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ee3949e56baa28c1b867172a5dee40d6a_v_parent_id_idx\` ON \`_ee3949e56baa28c1b867172a5dee40d6a_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ee3949e56baa28c1b867172a5dee40d6a_v_locale_idx\` ON \`_ee3949e56baa28c1b867172a5dee40d6a_v\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_ef7c8a03cb2628f4da06a88c4f30d47c7_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ef7c8a03cb2628f4da06a88c4f30d47c7_v_order_idx\` ON \`_ef7c8a03cb2628f4da06a88c4f30d47c7_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ef7c8a03cb2628f4da06a88c4f30d47c7_v_parent_id_idx\` ON \`_ef7c8a03cb2628f4da06a88c4f30d47c7_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ef7c8a03cb2628f4da06a88c4f30d47c7_v_path_idx\` ON \`_ef7c8a03cb2628f4da06a88c4f30d47c7_v\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_ef7c8a03cb2628f4da06a88c4f30d47c7_v_locale_idx\` ON \`_ef7c8a03cb2628f4da06a88c4f30d47c7_v\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`media_id\` text(36),
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v_order_idx\` ON \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v_parent_id_idx\` ON \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v_path_idx\` ON \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v_locale_idx\` ON \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v_media_idx\` ON \`_e81cc20c70fe78dbeaf3103630ebc6fbc_v\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_e9cafee9f0fed8430a34bf14bb8d7771b_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`intro_content\` text,
  	\`populate_by\` text DEFAULT 'collection',
  	\`relation_to\` text DEFAULT 'posts',
  	\`limit\` numeric DEFAULT 10,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e9cafee9f0fed8430a34bf14bb8d7771b_v_order_idx\` ON \`_e9cafee9f0fed8430a34bf14bb8d7771b_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e9cafee9f0fed8430a34bf14bb8d7771b_v_parent_id_idx\` ON \`_e9cafee9f0fed8430a34bf14bb8d7771b_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e9cafee9f0fed8430a34bf14bb8d7771b_v_path_idx\` ON \`_e9cafee9f0fed8430a34bf14bb8d7771b_v\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_e9cafee9f0fed8430a34bf14bb8d7771b_v_locale_idx\` ON \`_e9cafee9f0fed8430a34bf14bb8d7771b_v\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_e87f1621ae35f869b9a226c9e15aa2c0c_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`form_id\` text(36),
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e87f1621ae35f869b9a226c9e15aa2c0c_v_order_idx\` ON \`_e87f1621ae35f869b9a226c9e15aa2c0c_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e87f1621ae35f869b9a226c9e15aa2c0c_v_parent_id_idx\` ON \`_e87f1621ae35f869b9a226c9e15aa2c0c_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e87f1621ae35f869b9a226c9e15aa2c0c_v_path_idx\` ON \`_e87f1621ae35f869b9a226c9e15aa2c0c_v\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_e87f1621ae35f869b9a226c9e15aa2c0c_v_locale_idx\` ON \`_e87f1621ae35f869b9a226c9e15aa2c0c_v\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`_e87f1621ae35f869b9a226c9e15aa2c0c_v_form_idx\` ON \`_e87f1621ae35f869b9a226c9e15aa2c0c_v\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`_e9e1fb928a8a084e1aa55074c6bfe43c8_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`title\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e9e1fb928a8a084e1aa55074c6bfe43c8_v_order_idx\` ON \`_e9e1fb928a8a084e1aa55074c6bfe43c8_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e9e1fb928a8a084e1aa55074c6bfe43c8_v_parent_id_idx\` ON \`_e9e1fb928a8a084e1aa55074c6bfe43c8_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e9e1fb928a8a084e1aa55074c6bfe43c8_v_doc_idx\` ON \`_e9e1fb928a8a084e1aa55074c6bfe43c8_v\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`e8a9ff406b63a84698d79f68f093eac52\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e8a9ff406b63a84698d79f68f093eac52_order_idx\` ON \`e8a9ff406b63a84698d79f68f093eac52\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`e8a9ff406b63a84698d79f68f093eac52_parent_idx\` ON \`e8a9ff406b63a84698d79f68f093eac52\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e8a9ff406b63a84698d79f68f093eac52_value_idx\` ON \`e8a9ff406b63a84698d79f68f093eac52\` (\`value\`);`)
  await db.run(sql`CREATE TABLE \`_e8a9ff406b63a84698d79f68f093eac52_v\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_parties_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e8a9ff406b63a84698d79f68f093eac52_v_order_idx\` ON \`_e8a9ff406b63a84698d79f68f093eac52_v\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_e8a9ff406b63a84698d79f68f093eac52_v_parent_idx\` ON \`_e8a9ff406b63a84698d79f68f093eac52_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e8a9ff406b63a84698d79f68f093eac52_v_value_idx\` ON \`_e8a9ff406b63a84698d79f68f093eac52_v\` (\`value\`);`)
  await db.run(sql`CREATE TABLE \`ecf42f6f7e9ab844998d1601a14e54745\` (
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
  await db.run(sql`CREATE INDEX \`ecf42f6f7e9ab844998d1601a14e54745_order_idx\` ON \`ecf42f6f7e9ab844998d1601a14e54745\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ecf42f6f7e9ab844998d1601a14e54745_parent_id_idx\` ON \`ecf42f6f7e9ab844998d1601a14e54745\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ecf42f6f7e9ab844998d1601a14e54745_source_bill_idx\` ON \`ecf42f6f7e9ab844998d1601a14e54745\` (\`source_bill_id\`);`)
  await db.run(sql`CREATE INDEX \`ecf42f6f7e9ab844998d1601a14e54745_payment_record_idx\` ON \`ecf42f6f7e9ab844998d1601a14e54745\` (\`payment_record_id\`);`)
  await db.run(sql`CREATE TABLE \`_ecf42f6f7e9ab844998d1601a14e54745_v\` (
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
  await db.run(sql`CREATE INDEX \`_ecf42f6f7e9ab844998d1601a14e54745_v_order_idx\` ON \`_ecf42f6f7e9ab844998d1601a14e54745_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ecf42f6f7e9ab844998d1601a14e54745_v_parent_id_idx\` ON \`_ecf42f6f7e9ab844998d1601a14e54745_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ecf42f6f7e9ab844998d1601a14e54745_v_source_bill_idx\` ON \`_ecf42f6f7e9ab844998d1601a14e54745_v\` (\`source_bill_id\`);`)
  await db.run(sql`CREATE INDEX \`_ecf42f6f7e9ab844998d1601a14e54745_v_payment_record_idx\` ON \`_ecf42f6f7e9ab844998d1601a14e54745_v\` (\`payment_record_id\`);`)
  await db.run(sql`CREATE TABLE \`e30a95432eb9e8c50a8468c48698c4e69\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`employee_id\` text(36) NOT NULL,
  	\`regular_minutes\` numeric DEFAULT 0,
  	\`overtime15_minutes\` numeric DEFAULT 0,
  	\`overtime2_minutes\` numeric DEFAULT 0,
  	\`night_shift_minutes\` numeric DEFAULT 0,
  	\`holiday_work_minutes\` numeric DEFAULT 0,
  	\`pto_minutes\` numeric DEFAULT 0,
  	\`sick_minutes\` numeric DEFAULT 0,
  	\`base_gross\` numeric NOT NULL,
  	\`overtime_gross\` numeric DEFAULT 0,
  	\`bonus_gross\` numeric DEFAULT 0,
  	\`total_gross\` numeric NOT NULL,
  	\`income_tax_withheld\` numeric DEFAULT 0,
  	\`social_security_employee\` numeric DEFAULT 0,
  	\`pension_employee\` numeric DEFAULT 0,
  	\`other_deductions\` numeric DEFAULT 0,
  	\`net_pay\` numeric NOT NULL,
  	\`social_security_employer\` numeric DEFAULT 0,
  	\`pension_employer\` numeric DEFAULT 0,
  	\`payroll_taxes_employer\` numeric DEFAULT 0,
  	\`cost_center_id\` text(36),
  	\`pay_slip_document_id\` text(36),
  	FOREIGN KEY (\`employee_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`pay_slip_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`payroll_runs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e30a95432eb9e8c50a8468c48698c4e69_order_idx\` ON \`e30a95432eb9e8c50a8468c48698c4e69\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e30a95432eb9e8c50a8468c48698c4e69_parent_id_idx\` ON \`e30a95432eb9e8c50a8468c48698c4e69\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e30a95432eb9e8c50a8468c48698c4e69_employee_idx\` ON \`e30a95432eb9e8c50a8468c48698c4e69\` (\`employee_id\`);`)
  await db.run(sql`CREATE INDEX \`e30a95432eb9e8c50a8468c48698c4e69_cost_center_idx\` ON \`e30a95432eb9e8c50a8468c48698c4e69\` (\`cost_center_id\`);`)
  await db.run(sql`CREATE INDEX \`e30a95432eb9e8c50a8468c48698c4e69_pay_slip_document_idx\` ON \`e30a95432eb9e8c50a8468c48698c4e69\` (\`pay_slip_document_id\`);`)
  await db.run(sql`CREATE TABLE \`_e30a95432eb9e8c50a8468c48698c4e69_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`employee_id\` text(36) NOT NULL,
  	\`regular_minutes\` numeric DEFAULT 0,
  	\`overtime15_minutes\` numeric DEFAULT 0,
  	\`overtime2_minutes\` numeric DEFAULT 0,
  	\`night_shift_minutes\` numeric DEFAULT 0,
  	\`holiday_work_minutes\` numeric DEFAULT 0,
  	\`pto_minutes\` numeric DEFAULT 0,
  	\`sick_minutes\` numeric DEFAULT 0,
  	\`base_gross\` numeric NOT NULL,
  	\`overtime_gross\` numeric DEFAULT 0,
  	\`bonus_gross\` numeric DEFAULT 0,
  	\`total_gross\` numeric NOT NULL,
  	\`income_tax_withheld\` numeric DEFAULT 0,
  	\`social_security_employee\` numeric DEFAULT 0,
  	\`pension_employee\` numeric DEFAULT 0,
  	\`other_deductions\` numeric DEFAULT 0,
  	\`net_pay\` numeric NOT NULL,
  	\`social_security_employer\` numeric DEFAULT 0,
  	\`pension_employer\` numeric DEFAULT 0,
  	\`payroll_taxes_employer\` numeric DEFAULT 0,
  	\`cost_center_id\` text(36),
  	\`pay_slip_document_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`employee_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`pay_slip_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_payroll_runs_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e30a95432eb9e8c50a8468c48698c4e69_v_order_idx\` ON \`_e30a95432eb9e8c50a8468c48698c4e69_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e30a95432eb9e8c50a8468c48698c4e69_v_parent_id_idx\` ON \`_e30a95432eb9e8c50a8468c48698c4e69_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e30a95432eb9e8c50a8468c48698c4e69_v_employee_idx\` ON \`_e30a95432eb9e8c50a8468c48698c4e69_v\` (\`employee_id\`);`)
  await db.run(sql`CREATE INDEX \`_e30a95432eb9e8c50a8468c48698c4e69_v_cost_center_idx\` ON \`_e30a95432eb9e8c50a8468c48698c4e69_v\` (\`cost_center_id\`);`)
  await db.run(sql`CREATE INDEX \`_e30a95432eb9e8c50a8468c48698c4e69_v_pay_slip_document_idx\` ON \`_e30a95432eb9e8c50a8468c48698c4e69_v\` (\`pay_slip_document_id\`);`)
  await db.run(sql`CREATE TABLE \`e4cefc0562d378871ba0511ef359b5126\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e4cefc0562d378871ba0511ef359b5126_order_idx\` ON \`e4cefc0562d378871ba0511ef359b5126\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e4cefc0562d378871ba0511ef359b5126_parent_id_idx\` ON \`e4cefc0562d378871ba0511ef359b5126\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e4cefc0562d378871ba0511ef359b5126_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e4cefc0562d378871ba0511ef359b5126_v_order_idx\` ON \`_e4cefc0562d378871ba0511ef359b5126_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e4cefc0562d378871ba0511ef359b5126_v_parent_id_idx\` ON \`_e4cefc0562d378871ba0511ef359b5126_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e63b40236bd7481698a9e62f00c83c76d\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`group\` text,
  	\`rate\` numeric,
  	\`net\` numeric,
  	\`vat\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`receipts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e63b40236bd7481698a9e62f00c83c76d_order_idx\` ON \`e63b40236bd7481698a9e62f00c83c76d\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e63b40236bd7481698a9e62f00c83c76d_parent_id_idx\` ON \`e63b40236bd7481698a9e62f00c83c76d\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`edc80b35eb7c98472b2e2fc49f713ea39\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`description\` text,
  	\`quantity\` numeric DEFAULT 1,
  	\`unit_price\` numeric DEFAULT 0,
  	\`vat_rate\` numeric DEFAULT 0,
  	\`amount\` numeric DEFAULT 0,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`receipts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`edc80b35eb7c98472b2e2fc49f713ea39_order_idx\` ON \`edc80b35eb7c98472b2e2fc49f713ea39\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`edc80b35eb7c98472b2e2fc49f713ea39_parent_id_idx\` ON \`edc80b35eb7c98472b2e2fc49f713ea39\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e63b40236bd7481698a9e62f00c83c76d_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`group\` text,
  	\`rate\` numeric,
  	\`net\` numeric,
  	\`vat\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_receipts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e63b40236bd7481698a9e62f00c83c76d_v_order_idx\` ON \`_e63b40236bd7481698a9e62f00c83c76d_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e63b40236bd7481698a9e62f00c83c76d_v_parent_id_idx\` ON \`_e63b40236bd7481698a9e62f00c83c76d_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_edc80b35eb7c98472b2e2fc49f713ea39_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`description\` text,
  	\`quantity\` numeric DEFAULT 1,
  	\`unit_price\` numeric DEFAULT 0,
  	\`vat_rate\` numeric DEFAULT 0,
  	\`amount\` numeric DEFAULT 0,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_receipts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_edc80b35eb7c98472b2e2fc49f713ea39_v_order_idx\` ON \`_edc80b35eb7c98472b2e2fc49f713ea39_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_edc80b35eb7c98472b2e2fc49f713ea39_v_parent_id_idx\` ON \`_edc80b35eb7c98472b2e2fc49f713ea39_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`eed4d3e0dc8168b24a00ca2f6a516bc58\` (
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
  await db.run(sql`CREATE INDEX \`eed4d3e0dc8168b24a00ca2f6a516bc58_order_idx\` ON \`eed4d3e0dc8168b24a00ca2f6a516bc58\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eed4d3e0dc8168b24a00ca2f6a516bc58_parent_id_idx\` ON \`eed4d3e0dc8168b24a00ca2f6a516bc58\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_eed4d3e0dc8168b24a00ca2f6a516bc58_v\` (
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
  await db.run(sql`CREATE INDEX \`_eed4d3e0dc8168b24a00ca2f6a516bc58_v_order_idx\` ON \`_eed4d3e0dc8168b24a00ca2f6a516bc58_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eed4d3e0dc8168b24a00ca2f6a516bc58_v_parent_id_idx\` ON \`_eed4d3e0dc8168b24a00ca2f6a516bc58_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`eb810673fc2f58e658d8eede73daf9d48\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`source_element\` text,
  	\`target_element\` text,
  	\`transformation\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e818531f584178fa6906f1e091b15b481\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eb810673fc2f58e658d8eede73daf9d48_order_idx\` ON \`eb810673fc2f58e658d8eede73daf9d48\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eb810673fc2f58e658d8eede73daf9d48_parent_id_idx\` ON \`eb810673fc2f58e658d8eede73daf9d48\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e818531f584178fa6906f1e091b15b481\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`mapping_name\` text NOT NULL,
  	\`to_standard_id\` text(36) NOT NULL,
  	\`mapping_type\` text NOT NULL,
  	\`status\` text DEFAULT 'pending-review',
  	FOREIGN KEY (\`to_standard_id\`) REFERENCES \`reporting_standards\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`reporting_standards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e818531f584178fa6906f1e091b15b481_order_idx\` ON \`e818531f584178fa6906f1e091b15b481\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e818531f584178fa6906f1e091b15b481_parent_id_idx\` ON \`e818531f584178fa6906f1e091b15b481\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e818531f584178fa6906f1e091b15b481_to_standard_idx\` ON \`e818531f584178fa6906f1e091b15b481\` (\`to_standard_id\`);`)
  await db.run(sql`CREATE TABLE \`_eb810673fc2f58e658d8eede73daf9d48_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`source_element\` text,
  	\`target_element\` text,
  	\`transformation\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e818531f584178fa6906f1e091b15b481_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_eb810673fc2f58e658d8eede73daf9d48_v_order_idx\` ON \`_eb810673fc2f58e658d8eede73daf9d48_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eb810673fc2f58e658d8eede73daf9d48_v_parent_id_idx\` ON \`_eb810673fc2f58e658d8eede73daf9d48_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e818531f584178fa6906f1e091b15b481_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`mapping_name\` text NOT NULL,
  	\`to_standard_id\` text(36) NOT NULL,
  	\`mapping_type\` text NOT NULL,
  	\`status\` text DEFAULT 'pending-review',
  	\`_uuid\` text,
  	FOREIGN KEY (\`to_standard_id\`) REFERENCES \`reporting_standards\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_reporting_standards_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e818531f584178fa6906f1e091b15b481_v_order_idx\` ON \`_e818531f584178fa6906f1e091b15b481_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e818531f584178fa6906f1e091b15b481_v_parent_id_idx\` ON \`_e818531f584178fa6906f1e091b15b481_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e818531f584178fa6906f1e091b15b481_v_to_standard_idx\` ON \`_e818531f584178fa6906f1e091b15b481_v\` (\`to_standard_id\`);`)
  await db.run(sql`CREATE TABLE \`e70806190d4048502b85ef401011f5819\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity_returned\` numeric NOT NULL,
  	\`restock\` integer DEFAULT true,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`returns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e70806190d4048502b85ef401011f5819_order_idx\` ON \`e70806190d4048502b85ef401011f5819\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e70806190d4048502b85ef401011f5819_parent_id_idx\` ON \`e70806190d4048502b85ef401011f5819\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e70806190d4048502b85ef401011f5819_item_idx\` ON \`e70806190d4048502b85ef401011f5819\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`_e70806190d4048502b85ef401011f5819_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity_returned\` numeric NOT NULL,
  	\`restock\` integer DEFAULT true,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_returns_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e70806190d4048502b85ef401011f5819_v_order_idx\` ON \`_e70806190d4048502b85ef401011f5819_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e70806190d4048502b85ef401011f5819_v_parent_id_idx\` ON \`_e70806190d4048502b85ef401011f5819_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e70806190d4048502b85ef401011f5819_v_item_idx\` ON \`_e70806190d4048502b85ef401011f5819_v\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`e9749956a340987ec9eeac999bdcebefd\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`description\` text,
  	\`quantity\` numeric DEFAULT 1,
  	\`unit_price\` numeric DEFAULT 0,
  	\`vat_rate\` numeric DEFAULT 0,
  	\`amount\` numeric DEFAULT 0,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sales\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e9749956a340987ec9eeac999bdcebefd_order_idx\` ON \`e9749956a340987ec9eeac999bdcebefd\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e9749956a340987ec9eeac999bdcebefd_parent_id_idx\` ON \`e9749956a340987ec9eeac999bdcebefd\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e9749956a340987ec9eeac999bdcebefd_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`description\` text,
  	\`quantity\` numeric DEFAULT 1,
  	\`unit_price\` numeric DEFAULT 0,
  	\`vat_rate\` numeric DEFAULT 0,
  	\`amount\` numeric DEFAULT 0,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sales_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e9749956a340987ec9eeac999bdcebefd_v_order_idx\` ON \`_e9749956a340987ec9eeac999bdcebefd_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e9749956a340987ec9eeac999bdcebefd_v_parent_id_idx\` ON \`_e9749956a340987ec9eeac999bdcebefd_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e0110a568cd51804a93eaef638c1f23c7\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`sectors\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`sectors\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e0110a568cd51804a93eaef638c1f23c7_order_idx\` ON \`e0110a568cd51804a93eaef638c1f23c7\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e0110a568cd51804a93eaef638c1f23c7_parent_id_idx\` ON \`e0110a568cd51804a93eaef638c1f23c7\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e0110a568cd51804a93eaef638c1f23c7_locale_idx\` ON \`e0110a568cd51804a93eaef638c1f23c7\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`e0110a568cd51804a93eaef638c1f23c7_doc_idx\` ON \`e0110a568cd51804a93eaef638c1f23c7\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`_e0110a568cd51804a93eaef638c1f23c7_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`sectors\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_sectors_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e0110a568cd51804a93eaef638c1f23c7_v_order_idx\` ON \`_e0110a568cd51804a93eaef638c1f23c7_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e0110a568cd51804a93eaef638c1f23c7_v_parent_id_idx\` ON \`_e0110a568cd51804a93eaef638c1f23c7_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e0110a568cd51804a93eaef638c1f23c7_v_locale_idx\` ON \`_e0110a568cd51804a93eaef638c1f23c7_v\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`_e0110a568cd51804a93eaef638c1f23c7_v_doc_idx\` ON \`_e0110a568cd51804a93eaef638c1f23c7_v\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`e3d8eef548a8d8022abc3af81e21232c6\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`asset_category\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`segment_reporting\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e3d8eef548a8d8022abc3af81e21232c6_order_idx\` ON \`e3d8eef548a8d8022abc3af81e21232c6\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e3d8eef548a8d8022abc3af81e21232c6_parent_id_idx\` ON \`e3d8eef548a8d8022abc3af81e21232c6\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ebe1f8a37cdab80fe87f27a2a9809a286\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`country_code\` text NOT NULL,
  	\`revenue\` numeric NOT NULL,
  	\`assets\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`segment_reporting\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ebe1f8a37cdab80fe87f27a2a9809a286_order_idx\` ON \`ebe1f8a37cdab80fe87f27a2a9809a286\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ebe1f8a37cdab80fe87f27a2a9809a286_parent_id_idx\` ON \`ebe1f8a37cdab80fe87f27a2a9809a286\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e3d8eef548a8d8022abc3af81e21232c6_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`asset_category\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_segment_reporting_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e3d8eef548a8d8022abc3af81e21232c6_v_order_idx\` ON \`_e3d8eef548a8d8022abc3af81e21232c6_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e3d8eef548a8d8022abc3af81e21232c6_v_parent_id_idx\` ON \`_e3d8eef548a8d8022abc3af81e21232c6_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ebe1f8a37cdab80fe87f27a2a9809a286_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`country_code\` text NOT NULL,
  	\`revenue\` numeric NOT NULL,
  	\`assets\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_segment_reporting_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ebe1f8a37cdab80fe87f27a2a9809a286_v_order_idx\` ON \`_ebe1f8a37cdab80fe87f27a2a9809a286_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ebe1f8a37cdab80fe87f27a2a9809a286_v_parent_id_idx\` ON \`_ebe1f8a37cdab80fe87f27a2a9809a286_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e934f7628401582b094b784c3c47361f6\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`shipments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e934f7628401582b094b784c3c47361f6_order_idx\` ON \`e934f7628401582b094b784c3c47361f6\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e934f7628401582b094b784c3c47361f6_parent_id_idx\` ON \`e934f7628401582b094b784c3c47361f6\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e934f7628401582b094b784c3c47361f6_item_idx\` ON \`e934f7628401582b094b784c3c47361f6\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`_e934f7628401582b094b784c3c47361f6_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_shipments_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e934f7628401582b094b784c3c47361f6_v_order_idx\` ON \`_e934f7628401582b094b784c3c47361f6_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e934f7628401582b094b784c3c47361f6_v_parent_id_idx\` ON \`_e934f7628401582b094b784c3c47361f6_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e934f7628401582b094b784c3c47361f6_v_item_idx\` ON \`_e934f7628401582b094b784c3c47361f6_v\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`e8210b2bdad518d079d5f7f311f47e82e\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`spaces\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e8210b2bdad518d079d5f7f311f47e82e_order_idx\` ON \`e8210b2bdad518d079d5f7f311f47e82e\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e8210b2bdad518d079d5f7f311f47e82e_parent_id_idx\` ON \`e8210b2bdad518d079d5f7f311f47e82e\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e8210b2bdad518d079d5f7f311f47e82e_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`tag\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_spaces_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e8210b2bdad518d079d5f7f311f47e82e_v_order_idx\` ON \`_e8210b2bdad518d079d5f7f311f47e82e_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e8210b2bdad518d079d5f7f311f47e82e_v_parent_id_idx\` ON \`_e8210b2bdad518d079d5f7f311f47e82e_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e00d4d9ef3ee486519ef61f236288a7ce\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`other_standard_id\` text(36) NOT NULL,
  	\`law_id\` text,
  	\`severity\` text DEFAULT 'caution',
  	FOREIGN KEY (\`other_standard_id\`) REFERENCES \`standards\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`standards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e00d4d9ef3ee486519ef61f236288a7ce_order_idx\` ON \`e00d4d9ef3ee486519ef61f236288a7ce\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e00d4d9ef3ee486519ef61f236288a7ce_parent_id_idx\` ON \`e00d4d9ef3ee486519ef61f236288a7ce\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e00d4d9ef3ee486519ef61f236288a7ce_other_standard_idx\` ON \`e00d4d9ef3ee486519ef61f236288a7ce\` (\`other_standard_id\`);`)
  await db.run(sql`CREATE TABLE \`e00d4d9ef3ee486519ef61f236288a7ce_locales\` (
  	\`rationale\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e00d4d9ef3ee486519ef61f236288a7ce\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e00d4d9ef3ee486519ef61f236288a7ce_locales_locale_parent_id_u\` ON \`e00d4d9ef3ee486519ef61f236288a7ce_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e27ef0824049282a9a3514febfe91938b\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`module_path\` text NOT NULL,
  	\`banner\` text,
  	\`section\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`standards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e27ef0824049282a9a3514febfe91938b_order_idx\` ON \`e27ef0824049282a9a3514febfe91938b\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e27ef0824049282a9a3514febfe91938b_parent_id_idx\` ON \`e27ef0824049282a9a3514febfe91938b\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e00d4d9ef3ee486519ef61f236288a7ce_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`other_standard_id\` text(36) NOT NULL,
  	\`law_id\` text,
  	\`severity\` text DEFAULT 'caution',
  	\`_uuid\` text,
  	FOREIGN KEY (\`other_standard_id\`) REFERENCES \`standards\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_standards_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e00d4d9ef3ee486519ef61f236288a7ce_v_order_idx\` ON \`_e00d4d9ef3ee486519ef61f236288a7ce_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e00d4d9ef3ee486519ef61f236288a7ce_v_parent_id_idx\` ON \`_e00d4d9ef3ee486519ef61f236288a7ce_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e00d4d9ef3ee486519ef61f236288a7ce_v_other_standard_idx\` ON \`_e00d4d9ef3ee486519ef61f236288a7ce_v\` (\`other_standard_id\`);`)
  await db.run(sql`CREATE TABLE \`_e00d4d9ef3ee486519ef61f236288a7ce_v_locales\` (
  	\`rationale\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e00d4d9ef3ee486519ef61f236288a7ce_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_e00d4d9ef3ee486519ef61f236288a7ce_v_locales_locale_parent_i\` ON \`_e00d4d9ef3ee486519ef61f236288a7ce_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e27ef0824049282a9a3514febfe91938b_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`module_path\` text NOT NULL,
  	\`banner\` text,
  	\`section\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_standards_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e27ef0824049282a9a3514febfe91938b_v_order_idx\` ON \`_e27ef0824049282a9a3514febfe91938b_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e27ef0824049282a9a3514febfe91938b_v_parent_id_idx\` ON \`_e27ef0824049282a9a3514febfe91938b_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e86a4abedd768812d9092751010ab81e5\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_name\` text,
  	\`sequence\` numeric,
  	\`mandatory\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`statutory_report_templates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e86a4abedd768812d9092751010ab81e5_order_idx\` ON \`e86a4abedd768812d9092751010ab81e5\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e86a4abedd768812d9092751010ab81e5_parent_id_idx\` ON \`e86a4abedd768812d9092751010ab81e5\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e31fb556a79398d99bc575483c481e601\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`mapping_name\` text NOT NULL,
  	\`field_name\` text NOT NULL,
  	\`field_type\` text,
  	\`source_collection\` text,
  	\`source_field\` text,
  	\`transformation\` text,
  	\`mandatory\` integer DEFAULT true,
  	\`validation_rules\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`statutory_report_templates\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e31fb556a79398d99bc575483c481e601_order_idx\` ON \`e31fb556a79398d99bc575483c481e601\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e31fb556a79398d99bc575483c481e601_parent_id_idx\` ON \`e31fb556a79398d99bc575483c481e601\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e86a4abedd768812d9092751010ab81e5_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`section_name\` text,
  	\`sequence\` numeric,
  	\`mandatory\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_statutory_report_templates_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e86a4abedd768812d9092751010ab81e5_v_order_idx\` ON \`_e86a4abedd768812d9092751010ab81e5_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e86a4abedd768812d9092751010ab81e5_v_parent_id_idx\` ON \`_e86a4abedd768812d9092751010ab81e5_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e31fb556a79398d99bc575483c481e601_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`mapping_name\` text NOT NULL,
  	\`field_name\` text NOT NULL,
  	\`field_type\` text,
  	\`source_collection\` text,
  	\`source_field\` text,
  	\`transformation\` text,
  	\`mandatory\` integer DEFAULT true,
  	\`validation_rules\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_statutory_report_templates_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e31fb556a79398d99bc575483c481e601_v_order_idx\` ON \`_e31fb556a79398d99bc575483c481e601_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e31fb556a79398d99bc575483c481e601_v_parent_id_idx\` ON \`_e31fb556a79398d99bc575483c481e601_v\` (\`_parent_id\`);`)
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
  await db.run(sql`CREATE TABLE \`eb6304bde8ac98a988117180add07de51\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`sequence_number\` numeric NOT NULL,
  	\`journal_entry_id_id\` text(36),
  	\`from_entity\` text NOT NULL,
  	\`to_entity\` text NOT NULL,
  	\`account\` text NOT NULL,
  	\`account_type\` text,
  	\`adjustment_amount\` numeric NOT NULL,
  	\`description\` text,
  	\`posted\` integer DEFAULT false,
  	\`posted_date\` text,
  	FOREIGN KEY (\`journal_entry_id_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tax_periods\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eb6304bde8ac98a988117180add07de51_order_idx\` ON \`eb6304bde8ac98a988117180add07de51\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eb6304bde8ac98a988117180add07de51_parent_id_idx\` ON \`eb6304bde8ac98a988117180add07de51\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`eb6304bde8ac98a988117180add07de51_journal_entry_id_idx\` ON \`eb6304bde8ac98a988117180add07de51\` (\`journal_entry_id_id\`);`)
  await db.run(sql`CREATE TABLE \`_eb6304bde8ac98a988117180add07de51_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`sequence_number\` numeric NOT NULL,
  	\`journal_entry_id_id\` text(36),
  	\`from_entity\` text NOT NULL,
  	\`to_entity\` text NOT NULL,
  	\`account\` text NOT NULL,
  	\`account_type\` text,
  	\`adjustment_amount\` numeric NOT NULL,
  	\`description\` text,
  	\`posted\` integer DEFAULT false,
  	\`posted_date\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`journal_entry_id_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_tax_periods_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_eb6304bde8ac98a988117180add07de51_v_order_idx\` ON \`_eb6304bde8ac98a988117180add07de51_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eb6304bde8ac98a988117180add07de51_v_parent_id_idx\` ON \`_eb6304bde8ac98a988117180add07de51_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_eb6304bde8ac98a988117180add07de51_v_journal_entry_id_idx\` ON \`_eb6304bde8ac98a988117180add07de51_v\` (\`journal_entry_id_id\`);`)
  await db.run(sql`CREATE TABLE \`eb42b6ce7a98b8069add2b649d5ebebf1\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` text(36),
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tax_returns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eb42b6ce7a98b8069add2b649d5ebebf1_order_idx\` ON \`eb42b6ce7a98b8069add2b649d5ebebf1\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eb42b6ce7a98b8069add2b649d5ebebf1_parent_id_idx\` ON \`eb42b6ce7a98b8069add2b649d5ebebf1\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`eb42b6ce7a98b8069add2b649d5ebebf1_media_idx\` ON \`eb42b6ce7a98b8069add2b649d5ebebf1\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_eb42b6ce7a98b8069add2b649d5ebebf1_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`media_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_tax_returns_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_eb42b6ce7a98b8069add2b649d5ebebf1_v_order_idx\` ON \`_eb42b6ce7a98b8069add2b649d5ebebf1_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eb42b6ce7a98b8069add2b649d5ebebf1_v_parent_id_idx\` ON \`_eb42b6ce7a98b8069add2b649d5ebebf1_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_eb42b6ce7a98b8069add2b649d5ebebf1_v_media_idx\` ON \`_eb42b6ce7a98b8069add2b649d5ebebf1_v\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`eec49ec68ab2a8e6985f5d5422fa6267d\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`collection\` text NOT NULL,
  	\`doc_id\` text NOT NULL,
  	\`edge_kind\` text DEFAULT 'translates',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`translations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eec49ec68ab2a8e6985f5d5422fa6267d_order_idx\` ON \`eec49ec68ab2a8e6985f5d5422fa6267d\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eec49ec68ab2a8e6985f5d5422fa6267d_parent_id_idx\` ON \`eec49ec68ab2a8e6985f5d5422fa6267d\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_eec49ec68ab2a8e6985f5d5422fa6267d_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`collection\` text NOT NULL,
  	\`doc_id\` text NOT NULL,
  	\`edge_kind\` text DEFAULT 'translates',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_translations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_eec49ec68ab2a8e6985f5d5422fa6267d_v_order_idx\` ON \`_eec49ec68ab2a8e6985f5d5422fa6267d_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eec49ec68ab2a8e6985f5d5422fa6267d_v_parent_id_idx\` ON \`_eec49ec68ab2a8e6985f5d5422fa6267d_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`eb6619ccc69668dd8a8e13e6b854fec14\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`competency\` text NOT NULL,
  	\`proficiency\` numeric,
  	\`assessed_at\` text,
  	\`evidence\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`eb6619ccc69668dd8a8e13e6b854fec14_order_idx\` ON \`eb6619ccc69668dd8a8e13e6b854fec14\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`eb6619ccc69668dd8a8e13e6b854fec14_parent_id_idx\` ON \`eb6619ccc69668dd8a8e13e6b854fec14\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`eb6619ccc69668dd8a8e13e6b854fec14_competency_idx\` ON \`eb6619ccc69668dd8a8e13e6b854fec14\` (\`competency\`);`)
  await db.run(sql`CREATE TABLE \`e1bbe6311f13282339e495c8800870cc5\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e1bbe6311f13282339e495c8800870cc5_order_idx\` ON \`e1bbe6311f13282339e495c8800870cc5\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`e1bbe6311f13282339e495c8800870cc5_parent_idx\` ON \`e1bbe6311f13282339e495c8800870cc5\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ef1d2a1529c6a89c49a42b4994043f30d\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`e2a4022d9ee878058b14896fdca6954e1\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ef1d2a1529c6a89c49a42b4994043f30d_order_idx\` ON \`ef1d2a1529c6a89c49a42b4994043f30d\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`ef1d2a1529c6a89c49a42b4994043f30d_parent_idx\` ON \`ef1d2a1529c6a89c49a42b4994043f30d\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e2a4022d9ee878058b14896fdca6954e1\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tenant_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e2a4022d9ee878058b14896fdca6954e1_order_idx\` ON \`e2a4022d9ee878058b14896fdca6954e1\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e2a4022d9ee878058b14896fdca6954e1_parent_id_idx\` ON \`e2a4022d9ee878058b14896fdca6954e1\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e2a4022d9ee878058b14896fdca6954e1_tenant_idx\` ON \`e2a4022d9ee878058b14896fdca6954e1\` (\`tenant_id\`);`)
  await db.run(sql`CREATE TABLE \`_eb6619ccc69668dd8a8e13e6b854fec14_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`competency\` text NOT NULL,
  	\`proficiency\` numeric,
  	\`assessed_at\` text,
  	\`evidence\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_users_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_eb6619ccc69668dd8a8e13e6b854fec14_v_order_idx\` ON \`_eb6619ccc69668dd8a8e13e6b854fec14_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_eb6619ccc69668dd8a8e13e6b854fec14_v_parent_id_idx\` ON \`_eb6619ccc69668dd8a8e13e6b854fec14_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_eb6619ccc69668dd8a8e13e6b854fec14_v_competency_idx\` ON \`_eb6619ccc69668dd8a8e13e6b854fec14_v\` (\`competency\`);`)
  await db.run(sql`CREATE TABLE \`_e1bbe6311f13282339e495c8800870cc5_v\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_users_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e1bbe6311f13282339e495c8800870cc5_v_order_idx\` ON \`_e1bbe6311f13282339e495c8800870cc5_v\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_e1bbe6311f13282339e495c8800870cc5_v_parent_idx\` ON \`_e1bbe6311f13282339e495c8800870cc5_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ef1d2a1529c6a89c49a42b4994043f30d_v\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_e2a4022d9ee878058b14896fdca6954e1_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ef1d2a1529c6a89c49a42b4994043f30d_v_order_idx\` ON \`_ef1d2a1529c6a89c49a42b4994043f30d_v\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_ef1d2a1529c6a89c49a42b4994043f30d_v_parent_idx\` ON \`_ef1d2a1529c6a89c49a42b4994043f30d_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e2a4022d9ee878058b14896fdca6954e1_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`tenant_id\` text(36) NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_users_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e2a4022d9ee878058b14896fdca6954e1_v_order_idx\` ON \`_e2a4022d9ee878058b14896fdca6954e1_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e2a4022d9ee878058b14896fdca6954e1_v_parent_id_idx\` ON \`_e2a4022d9ee878058b14896fdca6954e1_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e2a4022d9ee878058b14896fdca6954e1_v_tenant_idx\` ON \`_e2a4022d9ee878058b14896fdca6954e1_v\` (\`tenant_id\`);`)
  await db.run(sql`CREATE TABLE \`ebc746b7cb78f8bacb518c6e721f7b188\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`bin_code\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ebc746b7cb78f8bacb518c6e721f7b188_order_idx\` ON \`ebc746b7cb78f8bacb518c6e721f7b188\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ebc746b7cb78f8bacb518c6e721f7b188_parent_id_idx\` ON \`ebc746b7cb78f8bacb518c6e721f7b188\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ebc746b7cb78f8bacb518c6e721f7b188_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ebc746b7cb78f8bacb518c6e721f7b188\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`ebc746b7cb78f8bacb518c6e721f7b188_locales_locale_parent_id_u\` ON \`ebc746b7cb78f8bacb518c6e721f7b188_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ebc746b7cb78f8bacb518c6e721f7b188_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`bin_code\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_warehouse_locations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ebc746b7cb78f8bacb518c6e721f7b188_v_order_idx\` ON \`_ebc746b7cb78f8bacb518c6e721f7b188_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ebc746b7cb78f8bacb518c6e721f7b188_v_parent_id_idx\` ON \`_ebc746b7cb78f8bacb518c6e721f7b188_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ebc746b7cb78f8bacb518c6e721f7b188_v_locales\` (
  	\`description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_ebc746b7cb78f8bacb518c6e721f7b188_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_ebc746b7cb78f8bacb518c6e721f7b188_v_locales_locale_parent_i\` ON \`_ebc746b7cb78f8bacb518c6e721f7b188_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e1f8c250bfe948169bd55746726186bfd\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e1f8c250bfe948169bd55746726186bfd_order_idx\` ON \`e1f8c250bfe948169bd55746726186bfd\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e1f8c250bfe948169bd55746726186bfd_parent_id_idx\` ON \`e1f8c250bfe948169bd55746726186bfd\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e1f8c250bfe948169bd55746726186bfd_locale_idx\` ON \`e1f8c250bfe948169bd55746726186bfd\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`e1f8c250bfe948169bd55746726186bfd_doc_idx\` ON \`e1f8c250bfe948169bd55746726186bfd\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`_e1f8c250bfe948169bd55746726186bfd_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_work_centers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e1f8c250bfe948169bd55746726186bfd_v_order_idx\` ON \`_e1f8c250bfe948169bd55746726186bfd_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e1f8c250bfe948169bd55746726186bfd_v_parent_id_idx\` ON \`_e1f8c250bfe948169bd55746726186bfd_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e1f8c250bfe948169bd55746726186bfd_v_locale_idx\` ON \`_e1f8c250bfe948169bd55746726186bfd_v\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`_e1f8c250bfe948169bd55746726186bfd_v_doc_idx\` ON \`_e1f8c250bfe948169bd55746726186bfd_v\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`ef66041e07036859db2beb433fbb6a700\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`ordered\` numeric DEFAULT 0,
  	\`produced\` numeric DEFAULT 0,
  	\`backordered\` numeric DEFAULT 0,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ef66041e07036859db2beb433fbb6a700_order_idx\` ON \`ef66041e07036859db2beb433fbb6a700\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ef66041e07036859db2beb433fbb6a700_parent_id_idx\` ON \`ef66041e07036859db2beb433fbb6a700\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ef66041e07036859db2beb433fbb6a700_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`ordered\` numeric DEFAULT 0,
  	\`produced\` numeric DEFAULT 0,
  	\`backordered\` numeric DEFAULT 0,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_work_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ef66041e07036859db2beb433fbb6a700_v_order_idx\` ON \`_ef66041e07036859db2beb433fbb6a700_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ef66041e07036859db2beb433fbb6a700_v_parent_id_idx\` ON \`_ef66041e07036859db2beb433fbb6a700_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e8bd9e457c3bb82e6a7a2ca4dc0741cd3\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`work_phases\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`work_phases\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e8bd9e457c3bb82e6a7a2ca4dc0741cd3_order_idx\` ON \`e8bd9e457c3bb82e6a7a2ca4dc0741cd3\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e8bd9e457c3bb82e6a7a2ca4dc0741cd3_parent_id_idx\` ON \`e8bd9e457c3bb82e6a7a2ca4dc0741cd3\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e8bd9e457c3bb82e6a7a2ca4dc0741cd3_locale_idx\` ON \`e8bd9e457c3bb82e6a7a2ca4dc0741cd3\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`e8bd9e457c3bb82e6a7a2ca4dc0741cd3_doc_idx\` ON \`e8bd9e457c3bb82e6a7a2ca4dc0741cd3\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`_e8bd9e457c3bb82e6a7a2ca4dc0741cd3_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`doc_id\` text(36),
  	\`url\` text,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`work_phases\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_work_phases_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e8bd9e457c3bb82e6a7a2ca4dc0741cd3_v_order_idx\` ON \`_e8bd9e457c3bb82e6a7a2ca4dc0741cd3_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e8bd9e457c3bb82e6a7a2ca4dc0741cd3_v_parent_id_idx\` ON \`_e8bd9e457c3bb82e6a7a2ca4dc0741cd3_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e8bd9e457c3bb82e6a7a2ca4dc0741cd3_v_locale_idx\` ON \`_e8bd9e457c3bb82e6a7a2ca4dc0741cd3_v\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`_e8bd9e457c3bb82e6a7a2ca4dc0741cd3_v_doc_idx\` ON \`_e8bd9e457c3bb82e6a7a2ca4dc0741cd3_v\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`e807e5fa7ee658a6daf578f601def9edb\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` text(36),
  	\`variant_option_id\` text(36),
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_option_id\`) REFERENCES \`variant_options\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e807e5fa7ee658a6daf578f601def9edb_order_idx\` ON \`e807e5fa7ee658a6daf578f601def9edb\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e807e5fa7ee658a6daf578f601def9edb_parent_id_idx\` ON \`e807e5fa7ee658a6daf578f601def9edb\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e807e5fa7ee658a6daf578f601def9edb_image_idx\` ON \`e807e5fa7ee658a6daf578f601def9edb\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`e807e5fa7ee658a6daf578f601def9edb_variant_option_idx\` ON \`e807e5fa7ee658a6daf578f601def9edb\` (\`variant_option_id\`);`)
  await db.run(sql`CREATE TABLE \`e706ae1eff60a86858e60d43a8408a40c\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e2d7410d34f388b4e91b8d3253617c145\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e706ae1eff60a86858e60d43a8408a40c_order_idx\` ON \`e706ae1eff60a86858e60d43a8408a40c\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e706ae1eff60a86858e60d43a8408a40c_parent_id_idx\` ON \`e706ae1eff60a86858e60d43a8408a40c\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e2d7410d34f388b4e91b8d3253617c145\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e2d7410d34f388b4e91b8d3253617c145_order_idx\` ON \`e2d7410d34f388b4e91b8d3253617c145\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e2d7410d34f388b4e91b8d3253617c145_parent_id_idx\` ON \`e2d7410d34f388b4e91b8d3253617c145\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e2d7410d34f388b4e91b8d3253617c145_path_idx\` ON \`e2d7410d34f388b4e91b8d3253617c145\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`e8be93ceba4838a2ea2eb22b6dbda9f7d\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'oneThird',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e3e08cdb269b3896c82e9ebaf3a7cdad9\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e8be93ceba4838a2ea2eb22b6dbda9f7d_order_idx\` ON \`e8be93ceba4838a2ea2eb22b6dbda9f7d\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e8be93ceba4838a2ea2eb22b6dbda9f7d_parent_id_idx\` ON \`e8be93ceba4838a2ea2eb22b6dbda9f7d\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e3e08cdb269b3896c82e9ebaf3a7cdad9\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e3e08cdb269b3896c82e9ebaf3a7cdad9_order_idx\` ON \`e3e08cdb269b3896c82e9ebaf3a7cdad9\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e3e08cdb269b3896c82e9ebaf3a7cdad9_parent_id_idx\` ON \`e3e08cdb269b3896c82e9ebaf3a7cdad9\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e3e08cdb269b3896c82e9ebaf3a7cdad9_path_idx\` ON \`e3e08cdb269b3896c82e9ebaf3a7cdad9\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`ed959efe1dd6a86dc91541e91cc18f307\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` text(36),
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ed959efe1dd6a86dc91541e91cc18f307_order_idx\` ON \`ed959efe1dd6a86dc91541e91cc18f307\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ed959efe1dd6a86dc91541e91cc18f307_parent_id_idx\` ON \`ed959efe1dd6a86dc91541e91cc18f307\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ed959efe1dd6a86dc91541e91cc18f307_path_idx\` ON \`ed959efe1dd6a86dc91541e91cc18f307\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`ed959efe1dd6a86dc91541e91cc18f307_media_idx\` ON \`ed959efe1dd6a86dc91541e91cc18f307\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_e807e5fa7ee658a6daf578f601def9edb_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`image_id\` text(36),
  	\`variant_option_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_option_id\`) REFERENCES \`variant_options\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e807e5fa7ee658a6daf578f601def9edb_v_order_idx\` ON \`_e807e5fa7ee658a6daf578f601def9edb_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e807e5fa7ee658a6daf578f601def9edb_v_parent_id_idx\` ON \`_e807e5fa7ee658a6daf578f601def9edb_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e807e5fa7ee658a6daf578f601def9edb_v_image_idx\` ON \`_e807e5fa7ee658a6daf578f601def9edb_v\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_e807e5fa7ee658a6daf578f601def9edb_v_variant_option_idx\` ON \`_e807e5fa7ee658a6daf578f601def9edb_v\` (\`variant_option_id\`);`)
  await db.run(sql`CREATE TABLE \`_e706ae1eff60a86858e60d43a8408a40c_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e2d7410d34f388b4e91b8d3253617c145_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e706ae1eff60a86858e60d43a8408a40c_v_order_idx\` ON \`_e706ae1eff60a86858e60d43a8408a40c_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e706ae1eff60a86858e60d43a8408a40c_v_parent_id_idx\` ON \`_e706ae1eff60a86858e60d43a8408a40c_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e2d7410d34f388b4e91b8d3253617c145_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e2d7410d34f388b4e91b8d3253617c145_v_order_idx\` ON \`_e2d7410d34f388b4e91b8d3253617c145_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e2d7410d34f388b4e91b8d3253617c145_v_parent_id_idx\` ON \`_e2d7410d34f388b4e91b8d3253617c145_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e2d7410d34f388b4e91b8d3253617c145_v_path_idx\` ON \`_e2d7410d34f388b4e91b8d3253617c145_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_e8be93ceba4838a2ea2eb22b6dbda9f7d_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`size\` text DEFAULT 'oneThird',
  	\`rich_text\` text,
  	\`enable_link\` integer,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e3e08cdb269b3896c82e9ebaf3a7cdad9_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e8be93ceba4838a2ea2eb22b6dbda9f7d_v_order_idx\` ON \`_e8be93ceba4838a2ea2eb22b6dbda9f7d_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e8be93ceba4838a2ea2eb22b6dbda9f7d_v_parent_id_idx\` ON \`_e8be93ceba4838a2ea2eb22b6dbda9f7d_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e3e08cdb269b3896c82e9ebaf3a7cdad9_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e3e08cdb269b3896c82e9ebaf3a7cdad9_v_order_idx\` ON \`_e3e08cdb269b3896c82e9ebaf3a7cdad9_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e3e08cdb269b3896c82e9ebaf3a7cdad9_v_parent_id_idx\` ON \`_e3e08cdb269b3896c82e9ebaf3a7cdad9_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e3e08cdb269b3896c82e9ebaf3a7cdad9_v_path_idx\` ON \`_e3e08cdb269b3896c82e9ebaf3a7cdad9_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_ed959efe1dd6a86dc91541e91cc18f307_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`media_id\` text(36),
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ed959efe1dd6a86dc91541e91cc18f307_v_order_idx\` ON \`_ed959efe1dd6a86dc91541e91cc18f307_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ed959efe1dd6a86dc91541e91cc18f307_v_parent_id_idx\` ON \`_ed959efe1dd6a86dc91541e91cc18f307_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ed959efe1dd6a86dc91541e91cc18f307_v_path_idx\` ON \`_ed959efe1dd6a86dc91541e91cc18f307_v\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_ed959efe1dd6a86dc91541e91cc18f307_v_media_idx\` ON \`_ed959efe1dd6a86dc91541e91cc18f307_v\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`e36231b73e55787b6bbebfd9458a6c7d6\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`product_id\` text(36),
  	\`variant_id\` text(36),
  	\`quantity\` numeric DEFAULT 1 NOT NULL,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`carts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e36231b73e55787b6bbebfd9458a6c7d6_order_idx\` ON \`e36231b73e55787b6bbebfd9458a6c7d6\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e36231b73e55787b6bbebfd9458a6c7d6_parent_id_idx\` ON \`e36231b73e55787b6bbebfd9458a6c7d6\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e36231b73e55787b6bbebfd9458a6c7d6_product_idx\` ON \`e36231b73e55787b6bbebfd9458a6c7d6\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX \`e36231b73e55787b6bbebfd9458a6c7d6_variant_idx\` ON \`e36231b73e55787b6bbebfd9458a6c7d6\` (\`variant_id\`);`)
  await db.run(sql`CREATE TABLE \`_e36231b73e55787b6bbebfd9458a6c7d6_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`product_id\` text(36),
  	\`variant_id\` text(36),
  	\`quantity\` numeric DEFAULT 1 NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_carts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e36231b73e55787b6bbebfd9458a6c7d6_v_order_idx\` ON \`_e36231b73e55787b6bbebfd9458a6c7d6_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e36231b73e55787b6bbebfd9458a6c7d6_v_parent_id_idx\` ON \`_e36231b73e55787b6bbebfd9458a6c7d6_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e36231b73e55787b6bbebfd9458a6c7d6_v_product_idx\` ON \`_e36231b73e55787b6bbebfd9458a6c7d6_v\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX \`_e36231b73e55787b6bbebfd9458a6c7d6_v_variant_idx\` ON \`_e36231b73e55787b6bbebfd9458a6c7d6_v\` (\`variant_id\`);`)
  await db.run(sql`CREATE TABLE \`e3acbac9f125c8bad9fe2ad09574853a0\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`product_id\` text(36),
  	\`variant_id\` text(36),
  	\`quantity\` numeric DEFAULT 1 NOT NULL,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e3acbac9f125c8bad9fe2ad09574853a0_order_idx\` ON \`e3acbac9f125c8bad9fe2ad09574853a0\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e3acbac9f125c8bad9fe2ad09574853a0_parent_id_idx\` ON \`e3acbac9f125c8bad9fe2ad09574853a0\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e3acbac9f125c8bad9fe2ad09574853a0_product_idx\` ON \`e3acbac9f125c8bad9fe2ad09574853a0\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX \`e3acbac9f125c8bad9fe2ad09574853a0_variant_idx\` ON \`e3acbac9f125c8bad9fe2ad09574853a0\` (\`variant_id\`);`)
  await db.run(sql`CREATE TABLE \`e801d0467ac3d8adb9473d14e41225f76\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`line_number\` numeric NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`unit_price\` numeric NOT NULL,
  	\`line_net\` numeric DEFAULT 0,
  	\`tax_category_id\` text(36),
  	\`discount\` numeric DEFAULT 0,
  	\`requested_delivery_date\` text,
  	\`gl_account_id\` text,
  	\`quantity_received\` numeric DEFAULT 0,
  	\`lead_time_days\` numeric,
  	\`preferred_vendor_id\` text(36),
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tax_category_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`preferred_vendor_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_order_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_parent_id_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_item_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_tax_category_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`tax_category_id\`);`)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_gl_account_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_preferred_vendor_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`preferred_vendor_id\`);`)
  await db.run(sql`CREATE TABLE \`e801d0467ac3d8adb9473d14e41225f76_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e801d0467ac3d8adb9473d14e41225f76\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e801d0467ac3d8adb9473d14e41225f76_locales_locale_parent_id_u\` ON \`e801d0467ac3d8adb9473d14e41225f76_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e39e594dd68848a429847c4ee70016372\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`step\` numeric NOT NULL,
  	\`approver_id\` text(36) NOT NULL,
  	\`role\` text,
  	\`decision\` text DEFAULT 'pending',
  	\`decided_at\` text,
  	FOREIGN KEY (\`approver_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e39e594dd68848a429847c4ee70016372_order_idx\` ON \`e39e594dd68848a429847c4ee70016372\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e39e594dd68848a429847c4ee70016372_parent_id_idx\` ON \`e39e594dd68848a429847c4ee70016372\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e39e594dd68848a429847c4ee70016372_approver_idx\` ON \`e39e594dd68848a429847c4ee70016372\` (\`approver_id\`);`)
  await db.run(sql`CREATE TABLE \`e39e594dd68848a429847c4ee70016372_locales\` (
  	\`comment\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e39e594dd68848a429847c4ee70016372\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e39e594dd68848a429847c4ee70016372_locales_locale_parent_id_u\` ON \`e39e594dd68848a429847c4ee70016372_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e3acbac9f125c8bad9fe2ad09574853a0_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`product_id\` text(36),
  	\`variant_id\` text(36),
  	\`quantity\` numeric DEFAULT 1 NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e3acbac9f125c8bad9fe2ad09574853a0_v_order_idx\` ON \`_e3acbac9f125c8bad9fe2ad09574853a0_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e3acbac9f125c8bad9fe2ad09574853a0_v_parent_id_idx\` ON \`_e3acbac9f125c8bad9fe2ad09574853a0_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e3acbac9f125c8bad9fe2ad09574853a0_v_product_idx\` ON \`_e3acbac9f125c8bad9fe2ad09574853a0_v\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX \`_e3acbac9f125c8bad9fe2ad09574853a0_v_variant_idx\` ON \`_e3acbac9f125c8bad9fe2ad09574853a0_v\` (\`variant_id\`);`)
  await db.run(sql`CREATE TABLE \`_e801d0467ac3d8adb9473d14e41225f76_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`line_number\` numeric NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`unit_of_measure\` text DEFAULT 'C62',
  	\`unit_price\` numeric NOT NULL,
  	\`line_net\` numeric DEFAULT 0,
  	\`tax_category_id\` text(36),
  	\`discount\` numeric DEFAULT 0,
  	\`requested_delivery_date\` text,
  	\`gl_account_id\` text,
  	\`quantity_received\` numeric DEFAULT 0,
  	\`lead_time_days\` numeric,
  	\`preferred_vendor_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tax_category_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`preferred_vendor_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_order_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_parent_id_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_item_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_tax_category_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`tax_category_id\`);`)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_gl_account_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_preferred_vendor_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`preferred_vendor_id\`);`)
  await db.run(sql`CREATE TABLE \`_e801d0467ac3d8adb9473d14e41225f76_v_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e801d0467ac3d8adb9473d14e41225f76_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_locales_locale_parent_i\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e39e594dd68848a429847c4ee70016372_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`step\` numeric NOT NULL,
  	\`approver_id\` text(36) NOT NULL,
  	\`role\` text,
  	\`decision\` text DEFAULT 'pending',
  	\`decided_at\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`approver_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e39e594dd68848a429847c4ee70016372_v_order_idx\` ON \`_e39e594dd68848a429847c4ee70016372_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e39e594dd68848a429847c4ee70016372_v_parent_id_idx\` ON \`_e39e594dd68848a429847c4ee70016372_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e39e594dd68848a429847c4ee70016372_v_approver_idx\` ON \`_e39e594dd68848a429847c4ee70016372_v\` (\`approver_id\`);`)
  await db.run(sql`CREATE TABLE \`_e39e594dd68848a429847c4ee70016372_v_locales\` (
  	\`comment\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e39e594dd68848a429847c4ee70016372_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_e39e594dd68848a429847c4ee70016372_v_locales_locale_parent_i\` ON \`_e39e594dd68848a429847c4ee70016372_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e4375580a944f874eb05f54d12cb85d91\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`product_id\` text(36),
  	\`variant_id\` text(36),
  	\`quantity\` numeric DEFAULT 1 NOT NULL,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e4375580a944f874eb05f54d12cb85d91_order_idx\` ON \`e4375580a944f874eb05f54d12cb85d91\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e4375580a944f874eb05f54d12cb85d91_parent_id_idx\` ON \`e4375580a944f874eb05f54d12cb85d91\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e4375580a944f874eb05f54d12cb85d91_product_idx\` ON \`e4375580a944f874eb05f54d12cb85d91\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX \`e4375580a944f874eb05f54d12cb85d91_variant_idx\` ON \`e4375580a944f874eb05f54d12cb85d91\` (\`variant_id\`);`)
  await db.run(sql`CREATE TABLE \`_e4375580a944f874eb05f54d12cb85d91_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`product_id\` text(36),
  	\`variant_id\` text(36),
  	\`quantity\` numeric DEFAULT 1 NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_transactions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e4375580a944f874eb05f54d12cb85d91_v_order_idx\` ON \`_e4375580a944f874eb05f54d12cb85d91_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e4375580a944f874eb05f54d12cb85d91_v_parent_id_idx\` ON \`_e4375580a944f874eb05f54d12cb85d91_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e4375580a944f874eb05f54d12cb85d91_v_product_idx\` ON \`_e4375580a944f874eb05f54d12cb85d91_v\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX \`_e4375580a944f874eb05f54d12cb85d91_v_variant_idx\` ON \`_e4375580a944f874eb05f54d12cb85d91_v\` (\`variant_id\`);`)
  await db.run(sql`CREATE TABLE \`ec7b0187f544b883ba491da04c8bac20f\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`default_value\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ec7b0187f544b883ba491da04c8bac20f_order_idx\` ON \`ec7b0187f544b883ba491da04c8bac20f\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ec7b0187f544b883ba491da04c8bac20f_parent_id_idx\` ON \`ec7b0187f544b883ba491da04c8bac20f\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ec7b0187f544b883ba491da04c8bac20f_path_idx\` ON \`ec7b0187f544b883ba491da04c8bac20f\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`ec7b0187f544b883ba491da04c8bac20f_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ec7b0187f544b883ba491da04c8bac20f\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`ec7b0187f544b883ba491da04c8bac20f_locales_locale_parent_id_u\` ON \`ec7b0187f544b883ba491da04c8bac20f_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e77b9fc908c6084fc900cc66442b89e32\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e77b9fc908c6084fc900cc66442b89e32_order_idx\` ON \`e77b9fc908c6084fc900cc66442b89e32\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e77b9fc908c6084fc900cc66442b89e32_parent_id_idx\` ON \`e77b9fc908c6084fc900cc66442b89e32\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e77b9fc908c6084fc900cc66442b89e32_path_idx\` ON \`e77b9fc908c6084fc900cc66442b89e32\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`e77b9fc908c6084fc900cc66442b89e32_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e77b9fc908c6084fc900cc66442b89e32\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e77b9fc908c6084fc900cc66442b89e32_locales_locale_parent_id_u\` ON \`e77b9fc908c6084fc900cc66442b89e32_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e964a176201f3810d8e23c948af516fb2\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e964a176201f3810d8e23c948af516fb2_order_idx\` ON \`e964a176201f3810d8e23c948af516fb2\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e964a176201f3810d8e23c948af516fb2_parent_id_idx\` ON \`e964a176201f3810d8e23c948af516fb2\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e964a176201f3810d8e23c948af516fb2_path_idx\` ON \`e964a176201f3810d8e23c948af516fb2\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`e964a176201f3810d8e23c948af516fb2_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e964a176201f3810d8e23c948af516fb2\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e964a176201f3810d8e23c948af516fb2_locales_locale_parent_id_u\` ON \`e964a176201f3810d8e23c948af516fb2_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ed69fe51f407b86e5a973495011c151e9\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ed69fe51f407b86e5a973495011c151e9_order_idx\` ON \`ed69fe51f407b86e5a973495011c151e9\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ed69fe51f407b86e5a973495011c151e9_parent_id_idx\` ON \`ed69fe51f407b86e5a973495011c151e9\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ed69fe51f407b86e5a973495011c151e9_path_idx\` ON \`ed69fe51f407b86e5a973495011c151e9\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`ed69fe51f407b86e5a973495011c151e9_locales\` (
  	\`message\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`ed69fe51f407b86e5a973495011c151e9\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`ed69fe51f407b86e5a973495011c151e9_locales_locale_parent_id_u\` ON \`ed69fe51f407b86e5a973495011c151e9_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e172457e3d41c8a0da66683b4f5b2bb5d\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`default_value\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e172457e3d41c8a0da66683b4f5b2bb5d_order_idx\` ON \`e172457e3d41c8a0da66683b4f5b2bb5d\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e172457e3d41c8a0da66683b4f5b2bb5d_parent_id_idx\` ON \`e172457e3d41c8a0da66683b4f5b2bb5d\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e172457e3d41c8a0da66683b4f5b2bb5d_path_idx\` ON \`e172457e3d41c8a0da66683b4f5b2bb5d\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`e172457e3d41c8a0da66683b4f5b2bb5d_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e172457e3d41c8a0da66683b4f5b2bb5d\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e172457e3d41c8a0da66683b4f5b2bb5d_locales_locale_parent_id_u\` ON \`e172457e3d41c8a0da66683b4f5b2bb5d_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e1fef94f431b585ac823da9a3677c38c6\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e079ab6e4a6a98374b8033579bf65ae20\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e1fef94f431b585ac823da9a3677c38c6_order_idx\` ON \`e1fef94f431b585ac823da9a3677c38c6\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e1fef94f431b585ac823da9a3677c38c6_parent_id_idx\` ON \`e1fef94f431b585ac823da9a3677c38c6\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e1fef94f431b585ac823da9a3677c38c6_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e1fef94f431b585ac823da9a3677c38c6\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e1fef94f431b585ac823da9a3677c38c6_locales_locale_parent_id_u\` ON \`e1fef94f431b585ac823da9a3677c38c6_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e079ab6e4a6a98374b8033579bf65ae20\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`placeholder\` text,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e079ab6e4a6a98374b8033579bf65ae20_order_idx\` ON \`e079ab6e4a6a98374b8033579bf65ae20\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e079ab6e4a6a98374b8033579bf65ae20_parent_id_idx\` ON \`e079ab6e4a6a98374b8033579bf65ae20\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e079ab6e4a6a98374b8033579bf65ae20_path_idx\` ON \`e079ab6e4a6a98374b8033579bf65ae20\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`e079ab6e4a6a98374b8033579bf65ae20_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e079ab6e4a6a98374b8033579bf65ae20\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e079ab6e4a6a98374b8033579bf65ae20_locales_locale_parent_id_u\` ON \`e079ab6e4a6a98374b8033579bf65ae20_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e87df93fee1818fab87f9c6da399fdb7d\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e87df93fee1818fab87f9c6da399fdb7d_order_idx\` ON \`e87df93fee1818fab87f9c6da399fdb7d\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e87df93fee1818fab87f9c6da399fdb7d_parent_id_idx\` ON \`e87df93fee1818fab87f9c6da399fdb7d\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e87df93fee1818fab87f9c6da399fdb7d_path_idx\` ON \`e87df93fee1818fab87f9c6da399fdb7d\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`e87df93fee1818fab87f9c6da399fdb7d_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e87df93fee1818fab87f9c6da399fdb7d\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e87df93fee1818fab87f9c6da399fdb7d_locales_locale_parent_id_u\` ON \`e87df93fee1818fab87f9c6da399fdb7d_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e6d67388f0be98e9fa6d861b333356635\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e6d67388f0be98e9fa6d861b333356635_order_idx\` ON \`e6d67388f0be98e9fa6d861b333356635\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e6d67388f0be98e9fa6d861b333356635_parent_id_idx\` ON \`e6d67388f0be98e9fa6d861b333356635\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e6d67388f0be98e9fa6d861b333356635_path_idx\` ON \`e6d67388f0be98e9fa6d861b333356635\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`e6d67388f0be98e9fa6d861b333356635_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e6d67388f0be98e9fa6d861b333356635\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e6d67388f0be98e9fa6d861b333356635_locales_locale_parent_id_u\` ON \`e6d67388f0be98e9fa6d861b333356635_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e17421b6a908d8c008312bf0e38ef9253\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e17421b6a908d8c008312bf0e38ef9253_order_idx\` ON \`e17421b6a908d8c008312bf0e38ef9253\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e17421b6a908d8c008312bf0e38ef9253_parent_id_idx\` ON \`e17421b6a908d8c008312bf0e38ef9253\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e17421b6a908d8c008312bf0e38ef9253_path_idx\` ON \`e17421b6a908d8c008312bf0e38ef9253\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`e17421b6a908d8c008312bf0e38ef9253_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e17421b6a908d8c008312bf0e38ef9253\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e17421b6a908d8c008312bf0e38ef9253_locales_locale_parent_id_u\` ON \`e17421b6a908d8c008312bf0e38ef9253_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e7d0b5cfcc0f18d07a0f986e2f1aa3ad3\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email_to\` text,
  	\`cc\` text,
  	\`bcc\` text,
  	\`reply_to\` text,
  	\`email_from\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e7d0b5cfcc0f18d07a0f986e2f1aa3ad3_order_idx\` ON \`e7d0b5cfcc0f18d07a0f986e2f1aa3ad3\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e7d0b5cfcc0f18d07a0f986e2f1aa3ad3_parent_id_idx\` ON \`e7d0b5cfcc0f18d07a0f986e2f1aa3ad3\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e7d0b5cfcc0f18d07a0f986e2f1aa3ad3_locales\` (
  	\`subject\` text DEFAULT 'You''ve received a new message.' NOT NULL,
  	\`message\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`e7d0b5cfcc0f18d07a0f986e2f1aa3ad3\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`e7d0b5cfcc0f18d07a0f986e2f1aa3ad3_locales_locale_parent_id_u\` ON \`e7d0b5cfcc0f18d07a0f986e2f1aa3ad3_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ec7b0187f544b883ba491da04c8bac20f_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`default_value\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ec7b0187f544b883ba491da04c8bac20f_v_order_idx\` ON \`_ec7b0187f544b883ba491da04c8bac20f_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ec7b0187f544b883ba491da04c8bac20f_v_parent_id_idx\` ON \`_ec7b0187f544b883ba491da04c8bac20f_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ec7b0187f544b883ba491da04c8bac20f_v_path_idx\` ON \`_ec7b0187f544b883ba491da04c8bac20f_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_ec7b0187f544b883ba491da04c8bac20f_v_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_ec7b0187f544b883ba491da04c8bac20f_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_ec7b0187f544b883ba491da04c8bac20f_v_locales_locale_parent_i\` ON \`_ec7b0187f544b883ba491da04c8bac20f_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e77b9fc908c6084fc900cc66442b89e32_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e77b9fc908c6084fc900cc66442b89e32_v_order_idx\` ON \`_e77b9fc908c6084fc900cc66442b89e32_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e77b9fc908c6084fc900cc66442b89e32_v_parent_id_idx\` ON \`_e77b9fc908c6084fc900cc66442b89e32_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e77b9fc908c6084fc900cc66442b89e32_v_path_idx\` ON \`_e77b9fc908c6084fc900cc66442b89e32_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_e77b9fc908c6084fc900cc66442b89e32_v_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e77b9fc908c6084fc900cc66442b89e32_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_e77b9fc908c6084fc900cc66442b89e32_v_locales_locale_parent_i\` ON \`_e77b9fc908c6084fc900cc66442b89e32_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e964a176201f3810d8e23c948af516fb2_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e964a176201f3810d8e23c948af516fb2_v_order_idx\` ON \`_e964a176201f3810d8e23c948af516fb2_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e964a176201f3810d8e23c948af516fb2_v_parent_id_idx\` ON \`_e964a176201f3810d8e23c948af516fb2_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e964a176201f3810d8e23c948af516fb2_v_path_idx\` ON \`_e964a176201f3810d8e23c948af516fb2_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_e964a176201f3810d8e23c948af516fb2_v_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e964a176201f3810d8e23c948af516fb2_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_e964a176201f3810d8e23c948af516fb2_v_locales_locale_parent_i\` ON \`_e964a176201f3810d8e23c948af516fb2_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_ed69fe51f407b86e5a973495011c151e9_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ed69fe51f407b86e5a973495011c151e9_v_order_idx\` ON \`_ed69fe51f407b86e5a973495011c151e9_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ed69fe51f407b86e5a973495011c151e9_v_parent_id_idx\` ON \`_ed69fe51f407b86e5a973495011c151e9_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ed69fe51f407b86e5a973495011c151e9_v_path_idx\` ON \`_ed69fe51f407b86e5a973495011c151e9_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_ed69fe51f407b86e5a973495011c151e9_v_locales\` (
  	\`message\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_ed69fe51f407b86e5a973495011c151e9_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_ed69fe51f407b86e5a973495011c151e9_v_locales_locale_parent_i\` ON \`_ed69fe51f407b86e5a973495011c151e9_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e172457e3d41c8a0da66683b4f5b2bb5d_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`default_value\` numeric,
  	\`required\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e172457e3d41c8a0da66683b4f5b2bb5d_v_order_idx\` ON \`_e172457e3d41c8a0da66683b4f5b2bb5d_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e172457e3d41c8a0da66683b4f5b2bb5d_v_parent_id_idx\` ON \`_e172457e3d41c8a0da66683b4f5b2bb5d_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e172457e3d41c8a0da66683b4f5b2bb5d_v_path_idx\` ON \`_e172457e3d41c8a0da66683b4f5b2bb5d_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_e172457e3d41c8a0da66683b4f5b2bb5d_v_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e172457e3d41c8a0da66683b4f5b2bb5d_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_e172457e3d41c8a0da66683b4f5b2bb5d_v_locales_locale_parent_i\` ON \`_e172457e3d41c8a0da66683b4f5b2bb5d_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e1fef94f431b585ac823da9a3677c38c6_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e079ab6e4a6a98374b8033579bf65ae20_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e1fef94f431b585ac823da9a3677c38c6_v_order_idx\` ON \`_e1fef94f431b585ac823da9a3677c38c6_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e1fef94f431b585ac823da9a3677c38c6_v_parent_id_idx\` ON \`_e1fef94f431b585ac823da9a3677c38c6_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e1fef94f431b585ac823da9a3677c38c6_v_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e1fef94f431b585ac823da9a3677c38c6_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_e1fef94f431b585ac823da9a3677c38c6_v_locales_locale_parent_i\` ON \`_e1fef94f431b585ac823da9a3677c38c6_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e079ab6e4a6a98374b8033579bf65ae20_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`placeholder\` text,
  	\`required\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e079ab6e4a6a98374b8033579bf65ae20_v_order_idx\` ON \`_e079ab6e4a6a98374b8033579bf65ae20_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e079ab6e4a6a98374b8033579bf65ae20_v_parent_id_idx\` ON \`_e079ab6e4a6a98374b8033579bf65ae20_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e079ab6e4a6a98374b8033579bf65ae20_v_path_idx\` ON \`_e079ab6e4a6a98374b8033579bf65ae20_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_e079ab6e4a6a98374b8033579bf65ae20_v_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e079ab6e4a6a98374b8033579bf65ae20_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_e079ab6e4a6a98374b8033579bf65ae20_v_locales_locale_parent_i\` ON \`_e079ab6e4a6a98374b8033579bf65ae20_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e87df93fee1818fab87f9c6da399fdb7d_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e87df93fee1818fab87f9c6da399fdb7d_v_order_idx\` ON \`_e87df93fee1818fab87f9c6da399fdb7d_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e87df93fee1818fab87f9c6da399fdb7d_v_parent_id_idx\` ON \`_e87df93fee1818fab87f9c6da399fdb7d_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e87df93fee1818fab87f9c6da399fdb7d_v_path_idx\` ON \`_e87df93fee1818fab87f9c6da399fdb7d_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_e87df93fee1818fab87f9c6da399fdb7d_v_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e87df93fee1818fab87f9c6da399fdb7d_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_e87df93fee1818fab87f9c6da399fdb7d_v_locales_locale_parent_i\` ON \`_e87df93fee1818fab87f9c6da399fdb7d_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e6d67388f0be98e9fa6d861b333356635_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e6d67388f0be98e9fa6d861b333356635_v_order_idx\` ON \`_e6d67388f0be98e9fa6d861b333356635_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e6d67388f0be98e9fa6d861b333356635_v_parent_id_idx\` ON \`_e6d67388f0be98e9fa6d861b333356635_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e6d67388f0be98e9fa6d861b333356635_v_path_idx\` ON \`_e6d67388f0be98e9fa6d861b333356635_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_e6d67388f0be98e9fa6d861b333356635_v_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e6d67388f0be98e9fa6d861b333356635_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_e6d67388f0be98e9fa6d861b333356635_v_locales_locale_parent_i\` ON \`_e6d67388f0be98e9fa6d861b333356635_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e17421b6a908d8c008312bf0e38ef9253_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e17421b6a908d8c008312bf0e38ef9253_v_order_idx\` ON \`_e17421b6a908d8c008312bf0e38ef9253_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e17421b6a908d8c008312bf0e38ef9253_v_parent_id_idx\` ON \`_e17421b6a908d8c008312bf0e38ef9253_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e17421b6a908d8c008312bf0e38ef9253_v_path_idx\` ON \`_e17421b6a908d8c008312bf0e38ef9253_v\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_e17421b6a908d8c008312bf0e38ef9253_v_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e17421b6a908d8c008312bf0e38ef9253_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_e17421b6a908d8c008312bf0e38ef9253_v_locales_locale_parent_i\` ON \`_e17421b6a908d8c008312bf0e38ef9253_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e7d0b5cfcc0f18d07a0f986e2f1aa3ad3_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`email_to\` text,
  	\`cc\` text,
  	\`bcc\` text,
  	\`reply_to\` text,
  	\`email_from\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e7d0b5cfcc0f18d07a0f986e2f1aa3ad3_v_order_idx\` ON \`_e7d0b5cfcc0f18d07a0f986e2f1aa3ad3_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e7d0b5cfcc0f18d07a0f986e2f1aa3ad3_v_parent_id_idx\` ON \`_e7d0b5cfcc0f18d07a0f986e2f1aa3ad3_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e7d0b5cfcc0f18d07a0f986e2f1aa3ad3_v_locales\` (
  	\`subject\` text DEFAULT 'You''ve received a new message.' NOT NULL,
  	\`message\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_e7d0b5cfcc0f18d07a0f986e2f1aa3ad3_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_e7d0b5cfcc0f18d07a0f986e2f1aa3ad3_v_locales_locale_parent_i\` ON \`_e7d0b5cfcc0f18d07a0f986e2f1aa3ad3_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e0fa36534560c842e89b11febfa39e66d\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e0fa36534560c842e89b11febfa39e66d_order_idx\` ON \`e0fa36534560c842e89b11febfa39e66d\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e0fa36534560c842e89b11febfa39e66d_parent_id_idx\` ON \`e0fa36534560c842e89b11febfa39e66d\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e0fa36534560c842e89b11febfa39e66d_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`value\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_form_submissions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e0fa36534560c842e89b11febfa39e66d_v_order_idx\` ON \`_e0fa36534560c842e89b11febfa39e66d_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e0fa36534560c842e89b11febfa39e66d_v_parent_id_idx\` ON \`_e0fa36534560c842e89b11febfa39e66d_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`ead7b4055f97980b6b7934d5acfec3e62\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`relation_to\` text,
  	\`category_i_d\` text,
  	\`title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ead7b4055f97980b6b7934d5acfec3e62_order_idx\` ON \`ead7b4055f97980b6b7934d5acfec3e62\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ead7b4055f97980b6b7934d5acfec3e62_parent_id_idx\` ON \`ead7b4055f97980b6b7934d5acfec3e62\` (\`_parent_id\`);`)
  await db.run(sql`DROP TABLE \`account_reconciliations_external_adjus_79d3f9d1\`;`)
  await db.run(sql`DROP TABLE \`account_reconciliations_external_adjus_79d3f9d1_locales\`;`)
  await db.run(sql`DROP TABLE \`account_reconciliations_gl_adjustments\`;`)
  await db.run(sql`DROP TABLE \`account_reconciliations_gl_adjustments_locales\`;`)
  await db.run(sql`DROP TABLE \`_account_reconciliations_external_adjus_79d3f9d1_v\`;`)
  await db.run(sql`DROP TABLE \`_account_reconciliations_external_adjus_79d3f9d1_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_account_reconciliations_v_version_gl_adjustments\`;`)
  await db.run(sql`DROP TABLE \`_account_reconciliations_v_version_gl_adjustments_locales\`;`)
  await db.run(sql`DROP TABLE \`audit_committee_minutes_attendees\`;`)
  await db.run(sql`DROP TABLE \`audit_committee_minutes_agenda\`;`)
  await db.run(sql`DROP TABLE \`audit_committee_minutes_key_decisions\`;`)
  await db.run(sql`DROP TABLE \`audit_committee_minutes_action_items\`;`)
  await db.run(sql`DROP TABLE \`_audit_committee_minutes_v_version_attendees\`;`)
  await db.run(sql`DROP TABLE \`_audit_committee_minutes_v_version_agenda\`;`)
  await db.run(sql`DROP TABLE \`_audit_committee_minutes_v_version_key_decisions\`;`)
  await db.run(sql`DROP TABLE \`_audit_committee_minutes_v_version_action_items\`;`)
  await db.run(sql`DROP TABLE \`audit_committees_members_expertise\`;`)
  await db.run(sql`DROP TABLE \`audit_committees_members\`;`)
  await db.run(sql`DROP TABLE \`_audit_committees_v_version_members_expertise\`;`)
  await db.run(sql`DROP TABLE \`_audit_committees_v_version_members\`;`)
  await db.run(sql`DROP TABLE \`audit_events_changes\`;`)
  await db.run(sql`DROP TABLE \`audit_evidence_evidence_chain\`;`)
  await db.run(sql`DROP TABLE \`audit_evidence_tags\`;`)
  await db.run(sql`DROP TABLE \`_audit_evidence_v_version_evidence_chain\`;`)
  await db.run(sql`DROP TABLE \`_audit_evidence_v_version_tags\`;`)
  await db.run(sql`DROP TABLE \`audit_findings_communicated_to\`;`)
  await db.run(sql`DROP TABLE \`_audit_findings_v_version_communicated_to\`;`)
  await db.run(sql`DROP TABLE \`audit_reports_target_jurisdictions\`;`)
  await db.run(sql`DROP TABLE \`audit_reports_regulatory_filings\`;`)
  await db.run(sql`DROP TABLE \`audit_reports_optimization_recommendat_bf8b394d\`;`)
  await db.run(sql`DROP TABLE \`audit_reports_optimization_recommendat_6443025e\`;`)
  await db.run(sql`DROP TABLE \`_audit_reports_v_version_target_jurisdictions\`;`)
  await db.run(sql`DROP TABLE \`_audit_reports_v_version_regulatory_filings\`;`)
  await db.run(sql`DROP TABLE \`_audit_reports_optimization_recommendat_bf8b394d_v\`;`)
  await db.run(sql`DROP TABLE \`_audit_reports_optimization_recommendat_6443025e_v\`;`)
  await db.run(sql`DROP TABLE \`bank_reconciliations_reconciling_items\`;`)
  await db.run(sql`DROP TABLE \`bank_reconciliations_reconciling_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_bank_reconciliations_v_version_reconciling_items\`;`)
  await db.run(sql`DROP TABLE \`_bank_reconciliations_v_version_reconciling_items_locales\`;`)
  await db.run(sql`DROP TABLE \`bank_statements_transactions\`;`)
  await db.run(sql`DROP TABLE \`bank_statements_transactions_locales\`;`)
  await db.run(sql`DROP TABLE \`bank_statements_matched_transactions\`;`)
  await db.run(sql`DROP TABLE \`_bank_statements_v_version_transactions\`;`)
  await db.run(sql`DROP TABLE \`_bank_statements_v_version_transactions_locales\`;`)
  await db.run(sql`DROP TABLE \`_bank_statements_v_version_matched_transactions\`;`)
  await db.run(sql`DROP TABLE \`bank_transactions_matched_journal_entr_31afc32d\`;`)
  await db.run(sql`DROP TABLE \`_bank_transactions_matched_journal_entr_31afc32d_v\`;`)
  await db.run(sql`DROP TABLE \`bills_of_materials_components\`;`)
  await db.run(sql`DROP TABLE \`bills_of_materials_operations\`;`)
  await db.run(sql`DROP TABLE \`bills_of_materials_operations_locales\`;`)
  await db.run(sql`DROP TABLE \`_bills_of_materials_v_version_components\`;`)
  await db.run(sql`DROP TABLE \`_bills_of_materials_v_version_operations\`;`)
  await db.run(sql`DROP TABLE \`_bills_of_materials_v_version_operations_locales\`;`)
  await db.run(sql`DROP TABLE \`bookable_resources_pricing_tiers\`;`)
  await db.run(sql`DROP TABLE \`bookable_resources_amenities\`;`)
  await db.run(sql`DROP TABLE \`_bookable_resources_v_version_pricing_tiers\`;`)
  await db.run(sql`DROP TABLE \`_bookable_resources_v_version_amenities\`;`)
  await db.run(sql`DROP TABLE \`budget_planning_budget_line_items\`;`)
  await db.run(sql`DROP TABLE \`budget_planning_budget_line_items_locales\`;`)
  await db.run(sql`DROP TABLE \`_budget_planning_v_version_budget_line_items\`;`)
  await db.run(sql`DROP TABLE \`_budget_planning_v_version_budget_line_items_locales\`;`)
  await db.run(sql`DROP TABLE \`carriers_service_levels\`;`)
  await db.run(sql`DROP TABLE \`carriers_service_levels_locales\`;`)
  await db.run(sql`DROP TABLE \`_carriers_v_version_service_levels\`;`)
  await db.run(sql`DROP TABLE \`_carriers_v_version_service_levels_locales\`;`)
  await db.run(sql`DROP TABLE \`cases_parties\`;`)
  await db.run(sql`DROP TABLE \`cases_proceedings\`;`)
  await db.run(sql`DROP TABLE \`cases_evidence\`;`)
  await db.run(sql`DROP TABLE \`_cases_v_version_parties\`;`)
  await db.run(sql`DROP TABLE \`_cases_v_version_proceedings\`;`)
  await db.run(sql`DROP TABLE \`_cases_v_version_evidence\`;`)
  await db.run(sql`DROP TABLE \`categories_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_version_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`closing_entries_closing_entries\`;`)
  await db.run(sql`DROP TABLE \`_closing_entries_v_version_closing_entries\`;`)
  await db.run(sql`DROP TABLE \`compliance_deadlines_notifications_not_656a9725\`;`)
  await db.run(sql`DROP TABLE \`compliance_deadlines_notifications_rec_53bc7822\`;`)
  await db.run(sql`DROP TABLE \`compliance_deadlines_notifications\`;`)
  await db.run(sql`DROP TABLE \`_compliance_deadlines_notifications_not_656a9725_v\`;`)
  await db.run(sql`DROP TABLE \`_compliance_deadlines_notifications_rec_53bc7822_v\`;`)
  await db.run(sql`DROP TABLE \`_compliance_deadlines_v_version_notifications\`;`)
  await db.run(sql`DROP TABLE \`consolidation_eliminations_subsidiarie_739a79cf\`;`)
  await db.run(sql`DROP TABLE \`_consolidation_eliminations_subsidiarie_739a79cf_v\`;`)
  await db.run(sql`DROP TABLE \`consolidations_elimination_entries\`;`)
  await db.run(sql`DROP TABLE \`_consolidations_v_version_elimination_entries\`;`)
  await db.run(sql`DROP TABLE \`contracts_modifications\`;`)
  await db.run(sql`DROP TABLE \`contracts_modifications_locales\`;`)
  await db.run(sql`DROP TABLE \`_contracts_v_version_modifications\`;`)
  await db.run(sql`DROP TABLE \`_contracts_v_version_modifications_locales\`;`)
  await db.run(sql`DROP TABLE \`cost_centers_allocation_rules\`;`)
  await db.run(sql`DROP TABLE \`cost_centers_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`_cost_centers_v_version_allocation_rules\`;`)
  await db.run(sql`DROP TABLE \`_cost_centers_v_version_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`credit_memos_refunds\`;`)
  await db.run(sql`DROP TABLE \`_credit_memos_v_version_refunds\`;`)
  await db.run(sql`DROP TABLE \`customs_declarations_lines\`;`)
  await db.run(sql`DROP TABLE \`_customs_declarations_v_version_lines\`;`)
  await db.run(sql`DROP TABLE \`data_processing_activities_data_catego_89747974\`;`)
  await db.run(sql`DROP TABLE \`data_processing_activities_data_subjec_4b2d0cf9\`;`)
  await db.run(sql`DROP TABLE \`data_processing_activities_recipient_c_d5b0fb68\`;`)
  await db.run(sql`DROP TABLE \`data_processing_activities_recipient_c_d5b0fb68_locales\`;`)
  await db.run(sql`DROP TABLE \`_data_processing_activities_data_catego_89747974_v\`;`)
  await db.run(sql`DROP TABLE \`_data_processing_activities_data_subjec_4b2d0cf9_v\`;`)
  await db.run(sql`DROP TABLE \`_data_processing_activities_recipient_c_d5b0fb68_v\`;`)
  await db.run(sql`DROP TABLE \`_data_processing_activities_recipient_c_d5b0fb68_v_locales\`;`)
  await db.run(sql`DROP TABLE \`debt_schedule_repayment_schedule\`;`)
  await db.run(sql`DROP TABLE \`debt_schedule_financial_covenants\`;`)
  await db.run(sql`DROP TABLE \`_debt_schedule_v_version_repayment_schedule\`;`)
  await db.run(sql`DROP TABLE \`_debt_schedule_v_version_financial_covenants\`;`)
  await db.run(sql`DROP TABLE \`disclosure_checklists_disclosure_items\`;`)
  await db.run(sql`DROP TABLE \`_disclosure_checklists_v_version_disclosure_items\`;`)
  await db.run(sql`DROP TABLE \`dunning_cycles_history\`;`)
  await db.run(sql`DROP TABLE \`dunning_cycles_history_locales\`;`)
  await db.run(sql`DROP TABLE \`_dunning_cycles_v_version_history\`;`)
  await db.run(sql`DROP TABLE \`_dunning_cycles_v_version_history_locales\`;`)
  await db.run(sql`DROP TABLE \`employees_competencies\`;`)
  await db.run(sql`DROP TABLE \`_employees_v_version_competencies\`;`)
  await db.run(sql`DROP TABLE \`entity_types_jurisdiction_applicabilit_f34fbcd4\`;`)
  await db.run(sql`DROP TABLE \`_entity_types_jurisdiction_applicabilit_f34fbcd4_v\`;`)
  await db.run(sql`DROP TABLE \`financial_statements_financial_ratios\`;`)
  await db.run(sql`DROP TABLE \`financial_statements_export_formats\`;`)
  await db.run(sql`DROP TABLE \`_financial_statements_v_version_financial_ratios\`;`)
  await db.run(sql`DROP TABLE \`_financial_statements_v_version_export_formats\`;`)
  await db.run(sql`DROP TABLE \`fiscal_devices_tax_groups\`;`)
  await db.run(sql`DROP TABLE \`_fiscal_devices_v_version_tax_groups\`;`)
  await db.run(sql`DROP TABLE \`gl_accounts_tags\`;`)
  await db.run(sql`DROP TABLE \`_gl_accounts_v_version_tags\`;`)
  await db.run(sql`DROP TABLE \`gl_postings_admin_override_history\`;`)
  await db.run(sql`DROP TABLE \`gl_postings_accounts_affected\`;`)
  await db.run(sql`DROP TABLE \`_gl_postings_v_version_admin_override_history\`;`)
  await db.run(sql`DROP TABLE \`_gl_postings_v_version_accounts_affected\`;`)
  await db.run(sql`DROP TABLE \`goods_receipts_lines\`;`)
  await db.run(sql`DROP TABLE \`goods_receipts_lines_locales\`;`)
  await db.run(sql`DROP TABLE \`_goods_receipts_v_version_lines\`;`)
  await db.run(sql`DROP TABLE \`_goods_receipts_v_version_lines_locales\`;`)
  await db.run(sql`DROP TABLE \`internal_audit_function_audit_engageme_2ed33191\`;`)
  await db.run(sql`DROP TABLE \`internal_audit_function_follow_up_trac_a2509c33\`;`)
  await db.run(sql`DROP TABLE \`_internal_audit_function_audit_engageme_2ed33191_v\`;`)
  await db.run(sql`DROP TABLE \`_internal_audit_function_follow_up_trac_a2509c33_v\`;`)
  await db.run(sql`DROP TABLE \`invoices_vat_breakdown\`;`)
  await db.run(sql`DROP TABLE \`_invoices_v_version_vat_breakdown\`;`)
  await db.run(sql`DROP TABLE \`job_positions_required_competencies\`;`)
  await db.run(sql`DROP TABLE \`_job_positions_v_version_required_competencies\`;`)
  await db.run(sql`DROP TABLE \`journal_entries_lines\`;`)
  await db.run(sql`DROP TABLE \`journal_entries_lines_locales\`;`)
  await db.run(sql`DROP TABLE \`_journal_entries_v_version_lines\`;`)
  await db.run(sql`DROP TABLE \`_journal_entries_v_version_lines_locales\`;`)
  await db.run(sql`DROP TABLE \`kyc_checks_identity_documents\`;`)
  await db.run(sql`DROP TABLE \`_kyc_checks_v_version_identity_documents\`;`)
  await db.run(sql`DROP TABLE \`leases_modifications\`;`)
  await db.run(sql`DROP TABLE \`leases_modifications_locales\`;`)
  await db.run(sql`DROP TABLE \`_leases_v_version_modifications\`;`)
  await db.run(sql`DROP TABLE \`_leases_v_version_modifications_locales\`;`)
  await db.run(sql`DROP TABLE \`legal_entities_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`_legal_entities_v_version_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`lot_variants_options\`;`)
  await db.run(sql`DROP TABLE \`_lot_variants_v_version_options\`;`)
  await db.run(sql`DROP TABLE \`maintenance_work_orders_photos\`;`)
  await db.run(sql`DROP TABLE \`maintenance_work_orders_photos_locales\`;`)
  await db.run(sql`DROP TABLE \`_maintenance_work_orders_v_version_photos\`;`)
  await db.run(sql`DROP TABLE \`_maintenance_work_orders_v_version_photos_locales\`;`)
  await db.run(sql`DROP TABLE \`management_assessment_icfr_certifying_7b6d5ba2\`;`)
  await db.run(sql`DROP TABLE \`_management_assessment_icfr_certifying_7b6d5ba2_v\`;`)
  await db.run(sql`DROP TABLE \`management_certifications_assertions\`;`)
  await db.run(sql`DROP TABLE \`_management_certifications_v_version_assertions\`;`)
  await db.run(sql`DROP TABLE \`memories_related_to\`;`)
  await db.run(sql`DROP TABLE \`_memories_v_version_related_to\`;`)
  await db.run(sql`DROP TABLE \`pack_items_options\`;`)
  await db.run(sql`DROP TABLE \`_pack_items_v_version_options\`;`)
  await db.run(sql`DROP TABLE \`packages_contents\`;`)
  await db.run(sql`DROP TABLE \`_packages_v_version_contents\`;`)
  await db.run(sql`DROP TABLE \`pages_hero_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_media_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_archive\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`pages_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_hero_links\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_media_block\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_archive\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`parties_roles\`;`)
  await db.run(sql`DROP TABLE \`_parties_v_version_roles\`;`)
  await db.run(sql`DROP TABLE \`payment_runs_transactions\`;`)
  await db.run(sql`DROP TABLE \`_payment_runs_v_version_transactions\`;`)
  await db.run(sql`DROP TABLE \`payroll_runs_lines\`;`)
  await db.run(sql`DROP TABLE \`_payroll_runs_v_version_lines\`;`)
  await db.run(sql`DROP TABLE \`posts_populated_authors\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_version_populated_authors\`;`)
  await db.run(sql`DROP TABLE \`receipts_vat_breakdown\`;`)
  await db.run(sql`DROP TABLE \`receipts_lines\`;`)
  await db.run(sql`DROP TABLE \`_receipts_v_version_vat_breakdown\`;`)
  await db.run(sql`DROP TABLE \`_receipts_v_version_lines\`;`)
  await db.run(sql`DROP TABLE \`remediation_plans_action_steps\`;`)
  await db.run(sql`DROP TABLE \`_remediation_plans_v_version_action_steps\`;`)
  await db.run(sql`DROP TABLE \`reporting_standards_mappings_mapping_r_b810673f\`;`)
  await db.run(sql`DROP TABLE \`reporting_standards_mappings\`;`)
  await db.run(sql`DROP TABLE \`_reporting_standards_mappings_mapping_r_b810673f_v\`;`)
  await db.run(sql`DROP TABLE \`_reporting_standards_v_version_mappings\`;`)
  await db.run(sql`DROP TABLE \`returns_lines\`;`)
  await db.run(sql`DROP TABLE \`_returns_v_version_lines\`;`)
  await db.run(sql`DROP TABLE \`sales_items\`;`)
  await db.run(sql`DROP TABLE \`_sales_v_version_items\`;`)
  await db.run(sql`DROP TABLE \`sectors_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`_sectors_v_version_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`segment_reporting_identifiable_assets\`;`)
  await db.run(sql`DROP TABLE \`segment_reporting_segment_geography\`;`)
  await db.run(sql`DROP TABLE \`_segment_reporting_v_version_identifiable_assets\`;`)
  await db.run(sql`DROP TABLE \`_segment_reporting_v_version_segment_geography\`;`)
  await db.run(sql`DROP TABLE \`shipments_lines\`;`)
  await db.run(sql`DROP TABLE \`_shipments_v_version_lines\`;`)
  await db.run(sql`DROP TABLE \`spaces_amenities\`;`)
  await db.run(sql`DROP TABLE \`_spaces_v_version_amenities\`;`)
  await db.run(sql`DROP TABLE \`standards_conflicts\`;`)
  await db.run(sql`DROP TABLE \`standards_conflicts_locales\`;`)
  await db.run(sql`DROP TABLE \`standards_citing_modules\`;`)
  await db.run(sql`DROP TABLE \`_standards_v_version_conflicts\`;`)
  await db.run(sql`DROP TABLE \`_standards_v_version_conflicts_locales\`;`)
  await db.run(sql`DROP TABLE \`_standards_v_version_citing_modules\`;`)
  await db.run(sql`DROP TABLE \`statutory_report_templates_sections\`;`)
  await db.run(sql`DROP TABLE \`statutory_report_templates_field_mappi_31fb556a\`;`)
  await db.run(sql`DROP TABLE \`_statutory_report_templates_v_version_sections\`;`)
  await db.run(sql`DROP TABLE \`_statutory_report_templates_field_mappi_31fb556a_v\`;`)
  await db.run(sql`DROP TABLE \`tax_jurisdictions_languages\`;`)
  await db.run(sql`DROP TABLE \`tax_jurisdictions_filing_deadlines\`;`)
  await db.run(sql`DROP TABLE \`_tax_jurisdictions_v_version_languages\`;`)
  await db.run(sql`DROP TABLE \`_tax_jurisdictions_v_version_filing_deadlines\`;`)
  await db.run(sql`DROP TABLE \`tax_periods_tax_adjustment_entries\`;`)
  await db.run(sql`DROP TABLE \`_tax_periods_v_version_tax_adjustment_entries\`;`)
  await db.run(sql`DROP TABLE \`tax_returns_attachments\`;`)
  await db.run(sql`DROP TABLE \`_tax_returns_v_version_attachments\`;`)
  await db.run(sql`DROP TABLE \`translations_related_to\`;`)
  await db.run(sql`DROP TABLE \`_translations_v_version_related_to\`;`)
  await db.run(sql`DROP TABLE \`users_competencies\`;`)
  await db.run(sql`DROP TABLE \`users_roles\`;`)
  await db.run(sql`DROP TABLE \`users_tenants_roles\`;`)
  await db.run(sql`DROP TABLE \`users_tenants\`;`)
  await db.run(sql`DROP TABLE \`_users_v_version_competencies\`;`)
  await db.run(sql`DROP TABLE \`_users_v_version_roles\`;`)
  await db.run(sql`DROP TABLE \`_users_v_version_tenants_roles\`;`)
  await db.run(sql`DROP TABLE \`_users_v_version_tenants\`;`)
  await db.run(sql`DROP TABLE \`warehouse_locations_bins\`;`)
  await db.run(sql`DROP TABLE \`warehouse_locations_bins_locales\`;`)
  await db.run(sql`DROP TABLE \`_warehouse_locations_v_version_bins\`;`)
  await db.run(sql`DROP TABLE \`_warehouse_locations_v_version_bins_locales\`;`)
  await db.run(sql`DROP TABLE \`work_centers_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`_work_centers_v_version_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`work_orders_options\`;`)
  await db.run(sql`DROP TABLE \`_work_orders_v_version_options\`;`)
  await db.run(sql`DROP TABLE \`work_phases_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`_work_phases_v_version_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`products_gallery\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_media_block\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_gallery\`;`)
  await db.run(sql`DROP TABLE \`_products_v_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`_products_v_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`_products_v_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`_products_v_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`_products_v_blocks_media_block\`;`)
  await db.run(sql`DROP TABLE \`carts_items\`;`)
  await db.run(sql`DROP TABLE \`_carts_v_version_items\`;`)
  await db.run(sql`DROP TABLE \`orders_items\`;`)
  await db.run(sql`DROP TABLE \`orders_lines\`;`)
  await db.run(sql`DROP TABLE \`orders_lines_locales\`;`)
  await db.run(sql`DROP TABLE \`orders_approval_chain\`;`)
  await db.run(sql`DROP TABLE \`orders_approval_chain_locales\`;`)
  await db.run(sql`DROP TABLE \`_orders_v_version_items\`;`)
  await db.run(sql`DROP TABLE \`_orders_v_version_lines\`;`)
  await db.run(sql`DROP TABLE \`_orders_v_version_lines_locales\`;`)
  await db.run(sql`DROP TABLE \`_orders_v_version_approval_chain\`;`)
  await db.run(sql`DROP TABLE \`_orders_v_version_approval_chain_locales\`;`)
  await db.run(sql`DROP TABLE \`transactions_items\`;`)
  await db.run(sql`DROP TABLE \`_transactions_v_version_items\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_checkbox\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_checkbox_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_country\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_country_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_email\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_email_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_message\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_message_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_number\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_number_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select_options\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select_options_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_select_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_state\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_state_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_text_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_textarea\`;`)
  await db.run(sql`DROP TABLE \`forms_blocks_textarea_locales\`;`)
  await db.run(sql`DROP TABLE \`forms_emails\`;`)
  await db.run(sql`DROP TABLE \`forms_emails_locales\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_checkbox\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_checkbox_locales\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_country\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_country_locales\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_email\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_email_locales\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_message\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_message_locales\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_number\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_number_locales\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_select_options\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_select_options_locales\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_select\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_select_locales\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_state\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_state_locales\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_text\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_text_locales\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_textarea\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_blocks_textarea_locales\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_version_emails\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_version_emails_locales\`;`)
  await db.run(sql`DROP TABLE \`form_submissions_submission_data\`;`)
  await db.run(sql`DROP TABLE \`_form_submissions_v_version_submission_data\`;`)
  await db.run(sql`DROP TABLE \`search_categories\`;`)
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'orders', entity: 'collection', fieldPath: 'approvalChain.comment', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'purchase-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'purchase-requisitions', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'purchase-requisitions', entity: 'collection', fieldPath: 'approvalChain.comment', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'vendor-quotes', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
}
