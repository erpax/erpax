import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
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
  await db.run(sql`DROP TABLE \`commitments_and_contingencies\`;`)
  await db.run(sql`DROP TABLE \`commitments_and_contingencies_locales\`;`)
  await db.run(sql`DROP TABLE \`_commitments_and_contingencies_v\`;`)
  await db.run(sql`DROP TABLE \`_commitments_and_contingencies_v_locales\`;`)
  await db.run(sql`DROP TABLE \`refunds\`;`)
  await db.run(sql`DROP TABLE \`_refunds_v\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_provisions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`kind\` text DEFAULT 'provision' NOT NULL,
  	\`category\` text,
  	\`counterparty\` text,
  	\`inception_date\` text,
  	\`expected_resolution_date\` text,
  	\`likelihood\` text,
  	\`maximum_exposure\` numeric,
  	\`expected_outflow\` numeric,
  	\`is_onerous_contract_related\` integer DEFAULT false,
  	\`note_text\` text,
  	\`provision_type\` text,
  	\`legal_entity_id\` text(36),
  	\`recognition_date\` text,
  	\`period_id\` text(36),
  	\`currency\` text DEFAULT 'EUR',
  	\`best_estimate\` numeric,
  	\`undiscounted_amount\` numeric,
  	\`discount_rate\` numeric,
  	\`discounted_amount\` numeric,
  	\`expected_settlement_date\` text,
  	\`expected_settlement_window\` text DEFAULT 'within_12m',
  	\`reimbursement_expected_amount\` numeric DEFAULT 0,
  	\`reimbursement_expected_is_virtually_certain\` integer DEFAULT false,
  	\`reimbursement_expected_reimbursing_party\` text,
  	\`uncertainty_source\` text,
  	\`source_finding_id\` text(36),
  	\`requires_legal_review\` integer DEFAULT false,
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`legal_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`period_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`source_finding_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_provisions\`("id", "uuid", "tenant_id", "reference", "description", "kind", "category", "counterparty", "inception_date", "expected_resolution_date", "likelihood", "maximum_exposure", "expected_outflow", "is_onerous_contract_related", "note_text", "provision_type", "legal_entity_id", "recognition_date", "period_id", "currency", "best_estimate", "undiscounted_amount", "discount_rate", "discounted_amount", "expected_settlement_date", "expected_settlement_window", "reimbursement_expected_amount", "reimbursement_expected_is_virtually_certain", "reimbursement_expected_reimbursing_party", "uncertainty_source", "source_finding_id", "requires_legal_review", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "reference", "description", "kind", "category", "counterparty", "inception_date", "expected_resolution_date", "likelihood", "maximum_exposure", "expected_outflow", "is_onerous_contract_related", "note_text", "provision_type", "legal_entity_id", "recognition_date", "period_id", "currency", "best_estimate", "undiscounted_amount", "discount_rate", "discounted_amount", "expected_settlement_date", "expected_settlement_window", "reimbursement_expected_amount", "reimbursement_expected_is_virtually_certain", "reimbursement_expected_reimbursing_party", "uncertainty_source", "source_finding_id", "requires_legal_review", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`provisions\`;`)
  await db.run(sql`DROP TABLE \`provisions\`;`)
  await db.run(sql`ALTER TABLE \`__new_provisions\` RENAME TO \`provisions\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`provisions_uuid_idx\` ON \`provisions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`provisions_tenant_idx\` ON \`provisions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`provisions_reference_idx\` ON \`provisions\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`provisions_legal_entity_idx\` ON \`provisions\` (\`legal_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`provisions_period_idx\` ON \`provisions\` (\`period_id\`);`)
  await db.run(sql`CREATE INDEX \`provisions_source_finding_idx\` ON \`provisions\` (\`source_finding_id\`);`)
  await db.run(sql`CREATE INDEX \`provisions_created_by_idx\` ON \`provisions\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`provisions_approved_by_idx\` ON \`provisions\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`provisions_updated_at_idx\` ON \`provisions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`provisions_created_at_idx\` ON \`provisions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__provisions_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_reference\` text NOT NULL,
  	\`version_description\` text NOT NULL,
  	\`version_kind\` text DEFAULT 'provision' NOT NULL,
  	\`version_category\` text,
  	\`version_counterparty\` text,
  	\`version_inception_date\` text,
  	\`version_expected_resolution_date\` text,
  	\`version_likelihood\` text,
  	\`version_maximum_exposure\` numeric,
  	\`version_expected_outflow\` numeric,
  	\`version_is_onerous_contract_related\` integer DEFAULT false,
  	\`version_note_text\` text,
  	\`version_provision_type\` text,
  	\`version_legal_entity_id\` text(36),
  	\`version_recognition_date\` text,
  	\`version_period_id\` text(36),
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_best_estimate\` numeric,
  	\`version_undiscounted_amount\` numeric,
  	\`version_discount_rate\` numeric,
  	\`version_discounted_amount\` numeric,
  	\`version_expected_settlement_date\` text,
  	\`version_expected_settlement_window\` text DEFAULT 'within_12m',
  	\`version_reimbursement_expected_amount\` numeric DEFAULT 0,
  	\`version_reimbursement_expected_is_virtually_certain\` integer DEFAULT false,
  	\`version_reimbursement_expected_reimbursing_party\` text,
  	\`version_uncertainty_source\` text,
  	\`version_source_finding_id\` text(36),
  	\`version_requires_legal_review\` integer DEFAULT false,
  	\`version_status\` text DEFAULT 'draft',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`provisions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_legal_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_period_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_source_finding_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__provisions_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_description", "version_kind", "version_category", "version_counterparty", "version_inception_date", "version_expected_resolution_date", "version_likelihood", "version_maximum_exposure", "version_expected_outflow", "version_is_onerous_contract_related", "version_note_text", "version_provision_type", "version_legal_entity_id", "version_recognition_date", "version_period_id", "version_currency", "version_best_estimate", "version_undiscounted_amount", "version_discount_rate", "version_discounted_amount", "version_expected_settlement_date", "version_expected_settlement_window", "version_reimbursement_expected_amount", "version_reimbursement_expected_is_virtually_certain", "version_reimbursement_expected_reimbursing_party", "version_uncertainty_source", "version_source_finding_id", "version_requires_legal_review", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_description", "version_kind", "version_category", "version_counterparty", "version_inception_date", "version_expected_resolution_date", "version_likelihood", "version_maximum_exposure", "version_expected_outflow", "version_is_onerous_contract_related", "version_note_text", "version_provision_type", "version_legal_entity_id", "version_recognition_date", "version_period_id", "version_currency", "version_best_estimate", "version_undiscounted_amount", "version_discount_rate", "version_discounted_amount", "version_expected_settlement_date", "version_expected_settlement_window", "version_reimbursement_expected_amount", "version_reimbursement_expected_is_virtually_certain", "version_reimbursement_expected_reimbursing_party", "version_uncertainty_source", "version_source_finding_id", "version_requires_legal_review", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_provisions_v\`;`)
  await db.run(sql`DROP TABLE \`_provisions_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__provisions_v\` RENAME TO \`_provisions_v\`;`)
  await db.run(sql`CREATE INDEX \`_provisions_v_parent_idx\` ON \`_provisions_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_version_version_uuid_idx\` ON \`_provisions_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_version_version_tenant_idx\` ON \`_provisions_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_version_version_reference_idx\` ON \`_provisions_v\` (\`version_reference\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_version_version_legal_entity_idx\` ON \`_provisions_v\` (\`version_legal_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_version_version_period_idx\` ON \`_provisions_v\` (\`version_period_id\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_version_version_source_finding_idx\` ON \`_provisions_v\` (\`version_source_finding_id\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_version_version_created_by_idx\` ON \`_provisions_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_version_version_approved_by_idx\` ON \`_provisions_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_version_version_updated_at_idx\` ON \`_provisions_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_version_version_created_at_idx\` ON \`_provisions_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_created_at_idx\` ON \`_provisions_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_updated_at_idx\` ON \`_provisions_v\` (\`updated_at\`);`)
  await db.run(sql`ALTER TABLE \`credit_memos\` ADD \`order_id\` text(36) REFERENCES sales_orders(id);`)
  await db.run(sql`CREATE INDEX \`credit_memos_order_idx\` ON \`credit_memos\` (\`order_id\`);`)
  await db.run(sql`ALTER TABLE \`_credit_memos_v\` ADD \`version_order_id\` text(36) REFERENCES sales_orders(id);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_order_idx\` ON \`_credit_memos_v\` (\`version_order_id\`);`)
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'commitments-and-contingencies', entity: 'collection', fieldPath: 'description', defaultLocale: 'en', req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`commitments_and_contingencies\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`kind\` text NOT NULL,
  	\`category\` text NOT NULL,
  	\`legal_entity_id\` text(36),
  	\`counterparty\` text,
  	\`inception_date\` text NOT NULL,
  	\`expected_resolution_date\` text,
  	\`likelihood\` text DEFAULT 'possible',
  	\`currency\` text DEFAULT 'EUR',
  	\`maximum_exposure\` numeric NOT NULL,
  	\`expected_outflow\` numeric,
  	\`reimbursement_expected\` numeric DEFAULT 0,
  	\`is_onerous_contract_related\` integer DEFAULT false,
  	\`recognised_as_provision_id\` text(36),
  	\`note_text\` text,
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`legal_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`recognised_as_provision_id\`) REFERENCES \`provisions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`commitments_and_contingencies_uuid_idx\` ON \`commitments_and_contingencies\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`commitments_and_contingencies_tenant_idx\` ON \`commitments_and_contingencies\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`commitments_and_contingencies_reference_idx\` ON \`commitments_and_contingencies\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`commitments_and_contingencies_legal_entity_idx\` ON \`commitments_and_contingencies\` (\`legal_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`commitments_and_contingencies_recognised_as_provision_idx\` ON \`commitments_and_contingencies\` (\`recognised_as_provision_id\`);`)
  await db.run(sql`CREATE INDEX \`commitments_and_contingencies_created_by_idx\` ON \`commitments_and_contingencies\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`commitments_and_contingencies_approved_by_idx\` ON \`commitments_and_contingencies\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`commitments_and_contingencies_updated_at_idx\` ON \`commitments_and_contingencies\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`commitments_and_contingencies_created_at_idx\` ON \`commitments_and_contingencies\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`commitments_and_contingencies_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`commitments_and_contingencies\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`commitments_and_contingencies_locales_locale_parent_id_uniqu\` ON \`commitments_and_contingencies_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_commitments_and_contingencies_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_reference\` text NOT NULL,
  	\`version_kind\` text NOT NULL,
  	\`version_category\` text NOT NULL,
  	\`version_legal_entity_id\` text(36),
  	\`version_counterparty\` text,
  	\`version_inception_date\` text NOT NULL,
  	\`version_expected_resolution_date\` text,
  	\`version_likelihood\` text DEFAULT 'possible',
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_maximum_exposure\` numeric NOT NULL,
  	\`version_expected_outflow\` numeric,
  	\`version_reimbursement_expected\` numeric DEFAULT 0,
  	\`version_is_onerous_contract_related\` integer DEFAULT false,
  	\`version_recognised_as_provision_id\` text(36),
  	\`version_note_text\` text,
  	\`version_status\` text DEFAULT 'active',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`commitments_and_contingencies\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_legal_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_recognised_as_provision_id\`) REFERENCES \`provisions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_commitments_and_contingencies_v_parent_idx\` ON \`_commitments_and_contingencies_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_and_contingencies_v_version_version_uuid_idx\` ON \`_commitments_and_contingencies_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_and_contingencies_v_version_version_tenant_idx\` ON \`_commitments_and_contingencies_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_and_contingencies_v_version_version_referen_idx\` ON \`_commitments_and_contingencies_v\` (\`version_reference\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_and_contingencies_v_version_version_legal_e_idx\` ON \`_commitments_and_contingencies_v\` (\`version_legal_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_and_contingencies_v_version_version_recogni_idx\` ON \`_commitments_and_contingencies_v\` (\`version_recognised_as_provision_id\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_and_contingencies_v_version_version_created_idx\` ON \`_commitments_and_contingencies_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_and_contingencies_v_version_version_approve_idx\` ON \`_commitments_and_contingencies_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_and_contingencies_v_version_version_updated_idx\` ON \`_commitments_and_contingencies_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_and_contingencies_v_version_version_creat_1_idx\` ON \`_commitments_and_contingencies_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_and_contingencies_v_created_at_idx\` ON \`_commitments_and_contingencies_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_and_contingencies_v_updated_at_idx\` ON \`_commitments_and_contingencies_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_commitments_and_contingencies_v_locales\` (
  	\`version_description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_commitments_and_contingencies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_commitments_and_contingencies_v_locales_locale_parent_id_un\` ON \`_commitments_and_contingencies_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`refunds\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`refund_number\` text NOT NULL,
  	\`credit_memo_id\` text(36) NOT NULL,
  	\`invoice_id\` text(36),
  	\`order_id\` text(36),
  	\`amount\` numeric NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`method\` text NOT NULL,
  	\`stripe_refund_id\` text,
  	\`status\` text DEFAULT 'draft',
  	\`refunded_at\` text,
  	\`settled_at\` text,
  	\`failure_reason\` text,
  	\`journal_entry_id\` text(36),
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`credit_memo_id\`) REFERENCES \`credit_memos\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`order_id\`) REFERENCES \`sales_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`refunds_uuid_idx\` ON \`refunds\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`refunds_tenant_idx\` ON \`refunds\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`refunds_refund_number_idx\` ON \`refunds\` (\`refund_number\`);`)
  await db.run(sql`CREATE INDEX \`refunds_credit_memo_idx\` ON \`refunds\` (\`credit_memo_id\`);`)
  await db.run(sql`CREATE INDEX \`refunds_invoice_idx\` ON \`refunds\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`refunds_order_idx\` ON \`refunds\` (\`order_id\`);`)
  await db.run(sql`CREATE INDEX \`refunds_journal_entry_idx\` ON \`refunds\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`refunds_created_by_idx\` ON \`refunds\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`refunds_approved_by_idx\` ON \`refunds\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`refunds_updated_at_idx\` ON \`refunds\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`refunds_created_at_idx\` ON \`refunds\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_refunds_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_refund_number\` text NOT NULL,
  	\`version_credit_memo_id\` text(36) NOT NULL,
  	\`version_invoice_id\` text(36),
  	\`version_order_id\` text(36),
  	\`version_amount\` numeric NOT NULL,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_method\` text NOT NULL,
  	\`version_stripe_refund_id\` text,
  	\`version_status\` text DEFAULT 'draft',
  	\`version_refunded_at\` text,
  	\`version_settled_at\` text,
  	\`version_failure_reason\` text,
  	\`version_journal_entry_id\` text(36),
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`refunds\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_credit_memo_id\`) REFERENCES \`credit_memos\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_order_id\`) REFERENCES \`sales_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_refunds_v_parent_idx\` ON \`_refunds_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_refunds_v_version_version_uuid_idx\` ON \`_refunds_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_refunds_v_version_version_tenant_idx\` ON \`_refunds_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_refunds_v_version_version_refund_number_idx\` ON \`_refunds_v\` (\`version_refund_number\`);`)
  await db.run(sql`CREATE INDEX \`_refunds_v_version_version_credit_memo_idx\` ON \`_refunds_v\` (\`version_credit_memo_id\`);`)
  await db.run(sql`CREATE INDEX \`_refunds_v_version_version_invoice_idx\` ON \`_refunds_v\` (\`version_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`_refunds_v_version_version_order_idx\` ON \`_refunds_v\` (\`version_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_refunds_v_version_version_journal_entry_idx\` ON \`_refunds_v\` (\`version_journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`_refunds_v_version_version_created_by_idx\` ON \`_refunds_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_refunds_v_version_version_approved_by_idx\` ON \`_refunds_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_refunds_v_version_version_updated_at_idx\` ON \`_refunds_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_refunds_v_version_version_created_at_idx\` ON \`_refunds_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_refunds_v_created_at_idx\` ON \`_refunds_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_refunds_v_updated_at_idx\` ON \`_refunds_v\` (\`updated_at\`);`)
  await db.run(sql`DROP TABLE \`eb1072c7c529688419f78c582bc502b89\`;`)
  await db.run(sql`DROP TABLE \`_eb1072c7c529688419f78c582bc502b89_v\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_credit_memos\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`memo_number\` text NOT NULL,
  	\`customer_id\` text(36),
  	\`invoice_id\` text(36),
  	\`reason\` text NOT NULL,
  	\`reason_detail\` text,
  	\`amount\` numeric NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'draft',
  	\`issued_at\` text,
  	\`applied_at\` text,
  	\`settled_at\` text,
  	\`journal_entry_id\` text(36),
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_credit_memos\`("id", "uuid", "tenant_id", "memo_number", "customer_id", "invoice_id", "reason", "reason_detail", "amount", "currency", "status", "issued_at", "applied_at", "settled_at", "journal_entry_id", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "memo_number", "customer_id", "invoice_id", "reason", "reason_detail", "amount", "currency", "status", "issued_at", "applied_at", "settled_at", "journal_entry_id", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`credit_memos\`;`)
  await db.run(sql`DROP TABLE \`credit_memos\`;`)
  await db.run(sql`ALTER TABLE \`__new_credit_memos\` RENAME TO \`credit_memos\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`credit_memos_uuid_idx\` ON \`credit_memos\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_tenant_idx\` ON \`credit_memos\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`credit_memos_memo_number_idx\` ON \`credit_memos\` (\`memo_number\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_customer_idx\` ON \`credit_memos\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_invoice_idx\` ON \`credit_memos\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_journal_entry_idx\` ON \`credit_memos\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_created_by_idx\` ON \`credit_memos\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_approved_by_idx\` ON \`credit_memos\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_updated_at_idx\` ON \`credit_memos\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_created_at_idx\` ON \`credit_memos\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__credit_memos_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_memo_number\` text NOT NULL,
  	\`version_customer_id\` text(36),
  	\`version_invoice_id\` text(36),
  	\`version_reason\` text NOT NULL,
  	\`version_reason_detail\` text,
  	\`version_amount\` numeric NOT NULL,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_status\` text DEFAULT 'draft',
  	\`version_issued_at\` text,
  	\`version_applied_at\` text,
  	\`version_settled_at\` text,
  	\`version_journal_entry_id\` text(36),
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`credit_memos\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_customer_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__credit_memos_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_memo_number", "version_customer_id", "version_invoice_id", "version_reason", "version_reason_detail", "version_amount", "version_currency", "version_status", "version_issued_at", "version_applied_at", "version_settled_at", "version_journal_entry_id", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_memo_number", "version_customer_id", "version_invoice_id", "version_reason", "version_reason_detail", "version_amount", "version_currency", "version_status", "version_issued_at", "version_applied_at", "version_settled_at", "version_journal_entry_id", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_credit_memos_v\`;`)
  await db.run(sql`DROP TABLE \`_credit_memos_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__credit_memos_v\` RENAME TO \`_credit_memos_v\`;`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_parent_idx\` ON \`_credit_memos_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_uuid_idx\` ON \`_credit_memos_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_tenant_idx\` ON \`_credit_memos_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_memo_number_idx\` ON \`_credit_memos_v\` (\`version_memo_number\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_customer_idx\` ON \`_credit_memos_v\` (\`version_customer_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_invoice_idx\` ON \`_credit_memos_v\` (\`version_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_journal_entry_idx\` ON \`_credit_memos_v\` (\`version_journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_created_by_idx\` ON \`_credit_memos_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_approved_by_idx\` ON \`_credit_memos_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_updated_at_idx\` ON \`_credit_memos_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_version_version_created_at_idx\` ON \`_credit_memos_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_created_at_idx\` ON \`_credit_memos_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_updated_at_idx\` ON \`_credit_memos_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_provisions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`provision_type\` text NOT NULL,
  	\`legal_entity_id\` text(36),
  	\`recognition_date\` text NOT NULL,
  	\`period_id\` text(36) NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`best_estimate\` numeric NOT NULL,
  	\`undiscounted_amount\` numeric,
  	\`discount_rate\` numeric,
  	\`discounted_amount\` numeric,
  	\`expected_settlement_date\` text,
  	\`expected_settlement_window\` text DEFAULT 'within_12m',
  	\`reimbursement_expected_amount\` numeric DEFAULT 0,
  	\`reimbursement_expected_is_virtually_certain\` integer DEFAULT false,
  	\`reimbursement_expected_reimbursing_party\` text,
  	\`uncertainty_source\` text,
  	\`source_finding_id\` text(36),
  	\`requires_legal_review\` integer DEFAULT false,
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`legal_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`period_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`source_finding_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_provisions\`("id", "uuid", "tenant_id", "reference", "description", "provision_type", "legal_entity_id", "recognition_date", "period_id", "currency", "best_estimate", "undiscounted_amount", "discount_rate", "discounted_amount", "expected_settlement_date", "expected_settlement_window", "reimbursement_expected_amount", "reimbursement_expected_is_virtually_certain", "reimbursement_expected_reimbursing_party", "uncertainty_source", "source_finding_id", "requires_legal_review", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "reference", "description", "provision_type", "legal_entity_id", "recognition_date", "period_id", "currency", "best_estimate", "undiscounted_amount", "discount_rate", "discounted_amount", "expected_settlement_date", "expected_settlement_window", "reimbursement_expected_amount", "reimbursement_expected_is_virtually_certain", "reimbursement_expected_reimbursing_party", "uncertainty_source", "source_finding_id", "requires_legal_review", "status", "created_by_id", "approved_by_id", "approved_at", "notes", "updated_at", "created_at" FROM \`provisions\`;`)
  await db.run(sql`DROP TABLE \`provisions\`;`)
  await db.run(sql`ALTER TABLE \`__new_provisions\` RENAME TO \`provisions\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`provisions_uuid_idx\` ON \`provisions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`provisions_tenant_idx\` ON \`provisions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`provisions_reference_idx\` ON \`provisions\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`provisions_legal_entity_idx\` ON \`provisions\` (\`legal_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`provisions_period_idx\` ON \`provisions\` (\`period_id\`);`)
  await db.run(sql`CREATE INDEX \`provisions_source_finding_idx\` ON \`provisions\` (\`source_finding_id\`);`)
  await db.run(sql`CREATE INDEX \`provisions_created_by_idx\` ON \`provisions\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`provisions_approved_by_idx\` ON \`provisions\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`provisions_updated_at_idx\` ON \`provisions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`provisions_created_at_idx\` ON \`provisions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__provisions_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_reference\` text NOT NULL,
  	\`version_description\` text NOT NULL,
  	\`version_provision_type\` text NOT NULL,
  	\`version_legal_entity_id\` text(36),
  	\`version_recognition_date\` text NOT NULL,
  	\`version_period_id\` text(36) NOT NULL,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_best_estimate\` numeric NOT NULL,
  	\`version_undiscounted_amount\` numeric,
  	\`version_discount_rate\` numeric,
  	\`version_discounted_amount\` numeric,
  	\`version_expected_settlement_date\` text,
  	\`version_expected_settlement_window\` text DEFAULT 'within_12m',
  	\`version_reimbursement_expected_amount\` numeric DEFAULT 0,
  	\`version_reimbursement_expected_is_virtually_certain\` integer DEFAULT false,
  	\`version_reimbursement_expected_reimbursing_party\` text,
  	\`version_uncertainty_source\` text,
  	\`version_source_finding_id\` text(36),
  	\`version_requires_legal_review\` integer DEFAULT false,
  	\`version_status\` text DEFAULT 'draft',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`provisions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_legal_entity_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_period_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_source_finding_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__provisions_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_description", "version_provision_type", "version_legal_entity_id", "version_recognition_date", "version_period_id", "version_currency", "version_best_estimate", "version_undiscounted_amount", "version_discount_rate", "version_discounted_amount", "version_expected_settlement_date", "version_expected_settlement_window", "version_reimbursement_expected_amount", "version_reimbursement_expected_is_virtually_certain", "version_reimbursement_expected_reimbursing_party", "version_uncertainty_source", "version_source_finding_id", "version_requires_legal_review", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_description", "version_provision_type", "version_legal_entity_id", "version_recognition_date", "version_period_id", "version_currency", "version_best_estimate", "version_undiscounted_amount", "version_discount_rate", "version_discounted_amount", "version_expected_settlement_date", "version_expected_settlement_window", "version_reimbursement_expected_amount", "version_reimbursement_expected_is_virtually_certain", "version_reimbursement_expected_reimbursing_party", "version_uncertainty_source", "version_source_finding_id", "version_requires_legal_review", "version_status", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_notes", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_provisions_v\`;`)
  await db.run(sql`DROP TABLE \`_provisions_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__provisions_v\` RENAME TO \`_provisions_v\`;`)
  await db.run(sql`CREATE INDEX \`_provisions_v_parent_idx\` ON \`_provisions_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_version_version_uuid_idx\` ON \`_provisions_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_version_version_tenant_idx\` ON \`_provisions_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_version_version_reference_idx\` ON \`_provisions_v\` (\`version_reference\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_version_version_legal_entity_idx\` ON \`_provisions_v\` (\`version_legal_entity_id\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_version_version_period_idx\` ON \`_provisions_v\` (\`version_period_id\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_version_version_source_finding_idx\` ON \`_provisions_v\` (\`version_source_finding_id\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_version_version_created_by_idx\` ON \`_provisions_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_version_version_approved_by_idx\` ON \`_provisions_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_version_version_updated_at_idx\` ON \`_provisions_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_version_version_created_at_idx\` ON \`_provisions_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_created_at_idx\` ON \`_provisions_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_updated_at_idx\` ON \`_provisions_v\` (\`updated_at\`);`)
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'commitments-and-contingencies', entity: 'collection', fieldPath: 'description', defaultLocale: 'en', req })
}
