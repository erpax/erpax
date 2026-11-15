import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`consolidation_eliminations_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`consolidation_eliminations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`consolidation_eliminations_rels_order_idx\` ON \`consolidation_eliminations_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`consolidation_eliminations_rels_parent_idx\` ON \`consolidation_eliminations_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`consolidation_eliminations_rels_path_idx\` ON \`consolidation_eliminations_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`consolidation_eliminations_rels_users_id_idx\` ON \`consolidation_eliminations_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_consolidation_eliminations_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_consolidation_eliminations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_consolidation_eliminations_v_rels_order_idx\` ON \`_consolidation_eliminations_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_consolidation_eliminations_v_rels_parent_idx\` ON \`_consolidation_eliminations_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_consolidation_eliminations_v_rels_path_idx\` ON \`_consolidation_eliminations_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_consolidation_eliminations_v_rels_users_id_idx\` ON \`_consolidation_eliminations_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`intercompany_transactions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`intercompany_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`intercompany_transactions_rels_order_idx\` ON \`intercompany_transactions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`intercompany_transactions_rels_parent_idx\` ON \`intercompany_transactions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`intercompany_transactions_rels_path_idx\` ON \`intercompany_transactions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`intercompany_transactions_rels_users_id_idx\` ON \`intercompany_transactions_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_intercompany_transactions_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_intercompany_transactions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_intercompany_transactions_v_rels_order_idx\` ON \`_intercompany_transactions_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_intercompany_transactions_v_rels_parent_idx\` ON \`_intercompany_transactions_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_intercompany_transactions_v_rels_path_idx\` ON \`_intercompany_transactions_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_intercompany_transactions_v_rels_users_id_idx\` ON \`_intercompany_transactions_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`org_units_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`org_units\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`org_units_rels_order_idx\` ON \`org_units_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`org_units_rels_parent_idx\` ON \`org_units_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`org_units_rels_path_idx\` ON \`org_units_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`org_units_rels_users_id_idx\` ON \`org_units_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_org_units_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_org_units_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_org_units_v_rels_order_idx\` ON \`_org_units_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_org_units_v_rels_parent_idx\` ON \`_org_units_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_org_units_v_rels_path_idx\` ON \`_org_units_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_org_units_v_rels_users_id_idx\` ON \`_org_units_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`tenants_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tenants_rels_order_idx\` ON \`tenants_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`tenants_rels_parent_idx\` ON \`tenants_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tenants_rels_path_idx\` ON \`tenants_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`tenants_rels_users_id_idx\` ON \`tenants_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_tenants_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_tenants_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_tenants_v_rels_order_idx\` ON \`_tenants_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_tenants_v_rels_parent_idx\` ON \`_tenants_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_tenants_v_rels_path_idx\` ON \`_tenants_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_tenants_v_rels_users_id_idx\` ON \`_tenants_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`categories_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_rels_order_idx\` ON \`categories_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`categories_rels_parent_idx\` ON \`categories_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_rels_path_idx\` ON \`categories_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`categories_rels_users_id_idx\` ON \`categories_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_categories_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_categories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_categories_v_rels_order_idx\` ON \`_categories_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_rels_parent_idx\` ON \`_categories_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_rels_path_idx\` ON \`_categories_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_categories_v_rels_users_id_idx\` ON \`_categories_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`media_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`media_rels_order_idx\` ON \`media_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`media_rels_parent_idx\` ON \`media_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`media_rels_path_idx\` ON \`media_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`media_rels_users_id_idx\` ON \`media_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_media_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_media_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_media_v_rels_order_idx\` ON \`_media_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_rels_parent_idx\` ON \`_media_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_rels_path_idx\` ON \`_media_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_rels_users_id_idx\` ON \`_media_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`activities_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`activities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`activities_rels_order_idx\` ON \`activities_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`activities_rels_parent_idx\` ON \`activities_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`activities_rels_path_idx\` ON \`activities_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`activities_rels_users_id_idx\` ON \`activities_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_activities_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_activities_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_activities_v_rels_order_idx\` ON \`_activities_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_activities_v_rels_parent_idx\` ON \`_activities_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_activities_v_rels_path_idx\` ON \`_activities_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_activities_v_rels_users_id_idx\` ON \`_activities_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`ai_suggestions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`ai_suggestions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ai_suggestions_rels_order_idx\` ON \`ai_suggestions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`ai_suggestions_rels_parent_idx\` ON \`ai_suggestions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`ai_suggestions_rels_path_idx\` ON \`ai_suggestions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`ai_suggestions_rels_users_id_idx\` ON \`ai_suggestions_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_ai_suggestions_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_ai_suggestions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ai_suggestions_v_rels_order_idx\` ON \`_ai_suggestions_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_ai_suggestions_v_rels_parent_idx\` ON \`_ai_suggestions_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_ai_suggestions_v_rels_path_idx\` ON \`_ai_suggestions_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_ai_suggestions_v_rels_users_id_idx\` ON \`_ai_suggestions_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`beneficial_owners_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`beneficial_owners\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`beneficial_owners_rels_order_idx\` ON \`beneficial_owners_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`beneficial_owners_rels_parent_idx\` ON \`beneficial_owners_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`beneficial_owners_rels_path_idx\` ON \`beneficial_owners_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`beneficial_owners_rels_users_id_idx\` ON \`beneficial_owners_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_beneficial_owners_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_beneficial_owners_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_beneficial_owners_v_rels_order_idx\` ON \`_beneficial_owners_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_beneficial_owners_v_rels_parent_idx\` ON \`_beneficial_owners_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_beneficial_owners_v_rels_path_idx\` ON \`_beneficial_owners_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_beneficial_owners_v_rels_users_id_idx\` ON \`_beneficial_owners_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`bookings_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`bookings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bookings_rels_order_idx\` ON \`bookings_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`bookings_rels_parent_idx\` ON \`bookings_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`bookings_rels_path_idx\` ON \`bookings_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`bookings_rels_users_id_idx\` ON \`bookings_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_bookings_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_bookings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_bookings_v_rels_order_idx\` ON \`_bookings_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_bookings_v_rels_parent_idx\` ON \`_bookings_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_bookings_v_rels_path_idx\` ON \`_bookings_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_bookings_v_rels_users_id_idx\` ON \`_bookings_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`consent_records_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`consent_records\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`consent_records_rels_order_idx\` ON \`consent_records_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`consent_records_rels_parent_idx\` ON \`consent_records_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`consent_records_rels_path_idx\` ON \`consent_records_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`consent_records_rels_users_id_idx\` ON \`consent_records_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_consent_records_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_consent_records_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_consent_records_v_rels_order_idx\` ON \`_consent_records_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_consent_records_v_rels_parent_idx\` ON \`_consent_records_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_consent_records_v_rels_path_idx\` ON \`_consent_records_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_consent_records_v_rels_users_id_idx\` ON \`_consent_records_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`consignment_arrangements_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`consignment_arrangements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`consignment_arrangements_rels_order_idx\` ON \`consignment_arrangements_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`consignment_arrangements_rels_parent_idx\` ON \`consignment_arrangements_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`consignment_arrangements_rels_path_idx\` ON \`consignment_arrangements_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`consignment_arrangements_rels_users_id_idx\` ON \`consignment_arrangements_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_consignment_arrangements_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_consignment_arrangements_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_consignment_arrangements_v_rels_order_idx\` ON \`_consignment_arrangements_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_consignment_arrangements_v_rels_parent_idx\` ON \`_consignment_arrangements_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_consignment_arrangements_v_rels_path_idx\` ON \`_consignment_arrangements_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_consignment_arrangements_v_rels_users_id_idx\` ON \`_consignment_arrangements_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`consignment_sales_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`consignment_sales\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`consignment_sales_rels_order_idx\` ON \`consignment_sales_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`consignment_sales_rels_parent_idx\` ON \`consignment_sales_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`consignment_sales_rels_path_idx\` ON \`consignment_sales_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`consignment_sales_rels_users_id_idx\` ON \`consignment_sales_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_consignment_sales_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_consignment_sales_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_consignment_sales_v_rels_order_idx\` ON \`_consignment_sales_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_consignment_sales_v_rels_parent_idx\` ON \`_consignment_sales_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_consignment_sales_v_rels_path_idx\` ON \`_consignment_sales_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_consignment_sales_v_rels_users_id_idx\` ON \`_consignment_sales_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`credit_memos_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`credit_memos\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`credit_memos_rels_order_idx\` ON \`credit_memos_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_rels_parent_idx\` ON \`credit_memos_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_rels_path_idx\` ON \`credit_memos_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_rels_users_id_idx\` ON \`credit_memos_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_credit_memos_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_credit_memos_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_rels_order_idx\` ON \`_credit_memos_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_rels_parent_idx\` ON \`_credit_memos_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_rels_path_idx\` ON \`_credit_memos_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_credit_memos_v_rels_users_id_idx\` ON \`_credit_memos_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`customer_segments_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`customer_segments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`customer_segments_rels_order_idx\` ON \`customer_segments_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`customer_segments_rels_parent_idx\` ON \`customer_segments_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`customer_segments_rels_path_idx\` ON \`customer_segments_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`customer_segments_rels_users_id_idx\` ON \`customer_segments_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_customer_segments_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_customer_segments_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_customer_segments_v_rels_order_idx\` ON \`_customer_segments_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_customer_segments_v_rels_parent_idx\` ON \`_customer_segments_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_customer_segments_v_rels_path_idx\` ON \`_customer_segments_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_customer_segments_v_rels_users_id_idx\` ON \`_customer_segments_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`customs_declarations_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`customs_declarations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`customs_declarations_rels_order_idx\` ON \`customs_declarations_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`customs_declarations_rels_parent_idx\` ON \`customs_declarations_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`customs_declarations_rels_path_idx\` ON \`customs_declarations_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`customs_declarations_rels_users_id_idx\` ON \`customs_declarations_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_customs_declarations_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_customs_declarations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_customs_declarations_v_rels_order_idx\` ON \`_customs_declarations_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_customs_declarations_v_rels_parent_idx\` ON \`_customs_declarations_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_customs_declarations_v_rels_path_idx\` ON \`_customs_declarations_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_customs_declarations_v_rels_users_id_idx\` ON \`_customs_declarations_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`dunning_cycles_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`dunning_cycles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`dunning_cycles_rels_order_idx\` ON \`dunning_cycles_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_rels_parent_idx\` ON \`dunning_cycles_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_rels_path_idx\` ON \`dunning_cycles_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_rels_users_id_idx\` ON \`dunning_cycles_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_dunning_cycles_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_dunning_cycles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_dunning_cycles_v_rels_order_idx\` ON \`_dunning_cycles_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_dunning_cycles_v_rels_parent_idx\` ON \`_dunning_cycles_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_dunning_cycles_v_rels_path_idx\` ON \`_dunning_cycles_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_dunning_cycles_v_rels_users_id_idx\` ON \`_dunning_cycles_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`fiscal_devices_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`fiscal_devices\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`fiscal_devices_rels_order_idx\` ON \`fiscal_devices_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_devices_rels_parent_idx\` ON \`fiscal_devices_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_devices_rels_path_idx\` ON \`fiscal_devices_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_devices_rels_users_id_idx\` ON \`fiscal_devices_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_fiscal_devices_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_fiscal_devices_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_fiscal_devices_v_rels_order_idx\` ON \`_fiscal_devices_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_fiscal_devices_v_rels_parent_idx\` ON \`_fiscal_devices_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_fiscal_devices_v_rels_path_idx\` ON \`_fiscal_devices_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_fiscal_devices_v_rels_users_id_idx\` ON \`_fiscal_devices_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`goods_receipts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`goods_receipts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`goods_receipts_rels_order_idx\` ON \`goods_receipts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_rels_parent_idx\` ON \`goods_receipts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_rels_path_idx\` ON \`goods_receipts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_rels_users_id_idx\` ON \`goods_receipts_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_goods_receipts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_goods_receipts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_rels_order_idx\` ON \`_goods_receipts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_rels_parent_idx\` ON \`_goods_receipts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_rels_path_idx\` ON \`_goods_receipts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_goods_receipts_v_rels_users_id_idx\` ON \`_goods_receipts_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`invoice_lines_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`invoice_lines\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`invoice_lines_rels_order_idx\` ON \`invoice_lines_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_rels_parent_idx\` ON \`invoice_lines_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_rels_path_idx\` ON \`invoice_lines_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_rels_users_id_idx\` ON \`invoice_lines_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_invoice_lines_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_invoice_lines_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_rels_order_idx\` ON \`_invoice_lines_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_rels_parent_idx\` ON \`_invoice_lines_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_rels_path_idx\` ON \`_invoice_lines_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_invoice_lines_v_rels_users_id_idx\` ON \`_invoice_lines_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`invoices_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`invoices_rels_order_idx\` ON \`invoices_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`invoices_rels_parent_idx\` ON \`invoices_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_rels_path_idx\` ON \`invoices_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`invoices_rels_users_id_idx\` ON \`invoices_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_invoices_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_invoices_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_invoices_v_rels_order_idx\` ON \`_invoices_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_rels_parent_idx\` ON \`_invoices_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_rels_path_idx\` ON \`_invoices_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_invoices_v_rels_users_id_idx\` ON \`_invoices_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`kyc_checks_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`kyc_checks\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`kyc_checks_rels_order_idx\` ON \`kyc_checks_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`kyc_checks_rels_parent_idx\` ON \`kyc_checks_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`kyc_checks_rels_path_idx\` ON \`kyc_checks_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`kyc_checks_rels_users_id_idx\` ON \`kyc_checks_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_kyc_checks_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_kyc_checks_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_kyc_checks_v_rels_order_idx\` ON \`_kyc_checks_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_kyc_checks_v_rels_parent_idx\` ON \`_kyc_checks_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_kyc_checks_v_rels_path_idx\` ON \`_kyc_checks_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_kyc_checks_v_rels_users_id_idx\` ON \`_kyc_checks_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`leads_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`leads\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`leads_rels_order_idx\` ON \`leads_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`leads_rels_parent_idx\` ON \`leads_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`leads_rels_path_idx\` ON \`leads_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`leads_rels_users_id_idx\` ON \`leads_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_leads_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_leads_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_leads_v_rels_order_idx\` ON \`_leads_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_leads_v_rels_parent_idx\` ON \`_leads_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_leads_v_rels_path_idx\` ON \`_leads_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_leads_v_rels_users_id_idx\` ON \`_leads_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`operators_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`operators\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`operators_rels_order_idx\` ON \`operators_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`operators_rels_parent_idx\` ON \`operators_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`operators_rels_path_idx\` ON \`operators_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`operators_rels_users_id_idx\` ON \`operators_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_operators_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_operators_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_operators_v_rels_order_idx\` ON \`_operators_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_operators_v_rels_parent_idx\` ON \`_operators_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_operators_v_rels_path_idx\` ON \`_operators_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_operators_v_rels_users_id_idx\` ON \`_operators_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`opportunities_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`opportunities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`opportunities_rels_order_idx\` ON \`opportunities_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`opportunities_rels_parent_idx\` ON \`opportunities_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`opportunities_rels_path_idx\` ON \`opportunities_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`opportunities_rels_users_id_idx\` ON \`opportunities_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_opportunities_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_opportunities_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_opportunities_v_rels_order_idx\` ON \`_opportunities_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_opportunities_v_rels_parent_idx\` ON \`_opportunities_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_opportunities_v_rels_path_idx\` ON \`_opportunities_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_opportunities_v_rels_users_id_idx\` ON \`_opportunities_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payment_allocations_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payment_allocations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payment_allocations_rels_order_idx\` ON \`payment_allocations_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_rels_parent_idx\` ON \`payment_allocations_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_rels_path_idx\` ON \`payment_allocations_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payment_allocations_rels_users_id_idx\` ON \`payment_allocations_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_payment_allocations_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_payment_allocations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_rels_order_idx\` ON \`_payment_allocations_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_rels_parent_idx\` ON \`_payment_allocations_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_rels_path_idx\` ON \`_payment_allocations_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_payment_allocations_v_rels_users_id_idx\` ON \`_payment_allocations_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payment_runs_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payment_runs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payment_runs_rels_order_idx\` ON \`payment_runs_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payment_runs_rels_parent_idx\` ON \`payment_runs_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_runs_rels_path_idx\` ON \`payment_runs_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payment_runs_rels_users_id_idx\` ON \`payment_runs_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_payment_runs_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_payment_runs_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_payment_runs_v_rels_order_idx\` ON \`_payment_runs_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_payment_runs_v_rels_parent_idx\` ON \`_payment_runs_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_payment_runs_v_rels_path_idx\` ON \`_payment_runs_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_payment_runs_v_rels_users_id_idx\` ON \`_payment_runs_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`project_milestones_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`project_milestones\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`project_milestones_rels_order_idx\` ON \`project_milestones_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`project_milestones_rels_parent_idx\` ON \`project_milestones_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`project_milestones_rels_path_idx\` ON \`project_milestones_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`project_milestones_rels_users_id_idx\` ON \`project_milestones_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_project_milestones_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_project_milestones_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_project_milestones_v_rels_order_idx\` ON \`_project_milestones_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_project_milestones_v_rels_parent_idx\` ON \`_project_milestones_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_project_milestones_v_rels_path_idx\` ON \`_project_milestones_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_project_milestones_v_rels_users_id_idx\` ON \`_project_milestones_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`receipts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`receipts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`receipts_rels_order_idx\` ON \`receipts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`receipts_rels_parent_idx\` ON \`receipts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`receipts_rels_path_idx\` ON \`receipts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`receipts_rels_users_id_idx\` ON \`receipts_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_receipts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_receipts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_receipts_v_rels_order_idx\` ON \`_receipts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_receipts_v_rels_parent_idx\` ON \`_receipts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_receipts_v_rels_path_idx\` ON \`_receipts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_receipts_v_rels_users_id_idx\` ON \`_receipts_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`returns_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`returns\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`returns_rels_order_idx\` ON \`returns_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`returns_rels_parent_idx\` ON \`returns_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`returns_rels_path_idx\` ON \`returns_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`returns_rels_users_id_idx\` ON \`returns_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_returns_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_returns_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_returns_v_rels_order_idx\` ON \`_returns_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_rels_parent_idx\` ON \`_returns_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_rels_path_idx\` ON \`_returns_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_returns_v_rels_users_id_idx\` ON \`_returns_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`sales_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`sales\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sales_rels_order_idx\` ON \`sales_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`sales_rels_parent_idx\` ON \`sales_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_rels_path_idx\` ON \`sales_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`sales_rels_users_id_idx\` ON \`sales_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_sales_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_sales_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sales_v_rels_order_idx\` ON \`_sales_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_sales_v_rels_parent_idx\` ON \`_sales_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sales_v_rels_path_idx\` ON \`_sales_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_sales_v_rels_users_id_idx\` ON \`_sales_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`sepa_mandates_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`sepa_mandates\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sepa_mandates_rels_order_idx\` ON \`sepa_mandates_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_rels_parent_idx\` ON \`sepa_mandates_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_rels_path_idx\` ON \`sepa_mandates_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_rels_users_id_idx\` ON \`sepa_mandates_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_sepa_mandates_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_sepa_mandates_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sepa_mandates_v_rels_order_idx\` ON \`_sepa_mandates_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_sepa_mandates_v_rels_parent_idx\` ON \`_sepa_mandates_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sepa_mandates_v_rels_path_idx\` ON \`_sepa_mandates_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_sepa_mandates_v_rels_users_id_idx\` ON \`_sepa_mandates_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`subscription_plans_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`subscription_plans\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`subscription_plans_rels_order_idx\` ON \`subscription_plans_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`subscription_plans_rels_parent_idx\` ON \`subscription_plans_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`subscription_plans_rels_path_idx\` ON \`subscription_plans_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`subscription_plans_rels_users_id_idx\` ON \`subscription_plans_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_subscription_plans_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_subscription_plans_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_subscription_plans_v_rels_order_idx\` ON \`_subscription_plans_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_subscription_plans_v_rels_parent_idx\` ON \`_subscription_plans_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_subscription_plans_v_rels_path_idx\` ON \`_subscription_plans_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_subscription_plans_v_rels_users_id_idx\` ON \`_subscription_plans_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`subscriptions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`subscriptions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`subscriptions_rels_order_idx\` ON \`subscriptions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`subscriptions_rels_parent_idx\` ON \`subscriptions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`subscriptions_rels_path_idx\` ON \`subscriptions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`subscriptions_rels_users_id_idx\` ON \`subscriptions_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_subscriptions_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_subscriptions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_subscriptions_v_rels_order_idx\` ON \`_subscriptions_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_subscriptions_v_rels_parent_idx\` ON \`_subscriptions_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_subscriptions_v_rels_path_idx\` ON \`_subscriptions_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_subscriptions_v_rels_users_id_idx\` ON \`_subscriptions_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`terminals_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`terminals\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`terminals_rels_order_idx\` ON \`terminals_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`terminals_rels_parent_idx\` ON \`terminals_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`terminals_rels_path_idx\` ON \`terminals_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`terminals_rels_users_id_idx\` ON \`terminals_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_terminals_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_terminals_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_terminals_v_rels_order_idx\` ON \`_terminals_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_terminals_v_rels_parent_idx\` ON \`_terminals_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_terminals_v_rels_path_idx\` ON \`_terminals_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_terminals_v_rels_users_id_idx\` ON \`_terminals_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`usage_records_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`usage_records\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`usage_records_rels_order_idx\` ON \`usage_records_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`usage_records_rels_parent_idx\` ON \`usage_records_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`usage_records_rels_path_idx\` ON \`usage_records_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`usage_records_rels_users_id_idx\` ON \`usage_records_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_usage_records_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_usage_records_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_usage_records_v_rels_order_idx\` ON \`_usage_records_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_usage_records_v_rels_parent_idx\` ON \`_usage_records_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_usage_records_v_rels_path_idx\` ON \`_usage_records_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_usage_records_v_rels_users_id_idx\` ON \`_usage_records_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`vendor_scorecards_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`vendor_scorecards\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`vendor_scorecards_rels_order_idx\` ON \`vendor_scorecards_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`vendor_scorecards_rels_parent_idx\` ON \`vendor_scorecards_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`vendor_scorecards_rels_path_idx\` ON \`vendor_scorecards_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`vendor_scorecards_rels_users_id_idx\` ON \`vendor_scorecards_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_vendor_scorecards_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_vendor_scorecards_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_vendor_scorecards_v_rels_order_idx\` ON \`_vendor_scorecards_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_scorecards_v_rels_parent_idx\` ON \`_vendor_scorecards_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_scorecards_v_rels_path_idx\` ON \`_vendor_scorecards_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_scorecards_v_rels_users_id_idx\` ON \`_vendor_scorecards_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`commitments_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`commitments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`commitments_rels_order_idx\` ON \`commitments_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`commitments_rels_parent_idx\` ON \`commitments_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`commitments_rels_path_idx\` ON \`commitments_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`commitments_rels_users_id_idx\` ON \`commitments_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_commitments_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_commitments_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_commitments_v_rels_order_idx\` ON \`_commitments_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_rels_parent_idx\` ON \`_commitments_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_rels_path_idx\` ON \`_commitments_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_commitments_v_rels_users_id_idx\` ON \`_commitments_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`contract_performance_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`contract_performance\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contract_performance_rels_order_idx\` ON \`contract_performance_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_rels_parent_idx\` ON \`contract_performance_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_rels_path_idx\` ON \`contract_performance_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`contract_performance_rels_users_id_idx\` ON \`contract_performance_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_contract_performance_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_contract_performance_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_rels_order_idx\` ON \`_contract_performance_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_rels_parent_idx\` ON \`_contract_performance_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_rels_path_idx\` ON \`_contract_performance_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_contract_performance_v_rels_users_id_idx\` ON \`_contract_performance_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`account_reconciliations_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`account_reconciliations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`account_reconciliations_rels_order_idx\` ON \`account_reconciliations_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_rels_parent_idx\` ON \`account_reconciliations_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_rels_path_idx\` ON \`account_reconciliations_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_rels_users_id_idx\` ON \`account_reconciliations_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_account_reconciliations_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_account_reconciliations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_account_reconciliations_v_rels_order_idx\` ON \`_account_reconciliations_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_account_reconciliations_v_rels_parent_idx\` ON \`_account_reconciliations_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_account_reconciliations_v_rels_path_idx\` ON \`_account_reconciliations_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_account_reconciliations_v_rels_users_id_idx\` ON \`_account_reconciliations_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`audit_reports_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`audit_reports\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`audit_reports_rels_order_idx\` ON \`audit_reports_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`audit_reports_rels_parent_idx\` ON \`audit_reports_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_reports_rels_path_idx\` ON \`audit_reports_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`audit_reports_rels_users_id_idx\` ON \`audit_reports_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_audit_reports_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_audit_reports_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_audit_reports_v_rels_order_idx\` ON \`_audit_reports_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_audit_reports_v_rels_parent_idx\` ON \`_audit_reports_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_audit_reports_v_rels_path_idx\` ON \`_audit_reports_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_audit_reports_v_rels_users_id_idx\` ON \`_audit_reports_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`bank_accounts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`bank_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bank_accounts_rels_order_idx\` ON \`bank_accounts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`bank_accounts_rels_parent_idx\` ON \`bank_accounts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_accounts_rels_path_idx\` ON \`bank_accounts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`bank_accounts_rels_users_id_idx\` ON \`bank_accounts_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_bank_accounts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_bank_accounts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_bank_accounts_v_rels_order_idx\` ON \`_bank_accounts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_bank_accounts_v_rels_parent_idx\` ON \`_bank_accounts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_bank_accounts_v_rels_path_idx\` ON \`_bank_accounts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_bank_accounts_v_rels_users_id_idx\` ON \`_bank_accounts_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`bank_reconciliations_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`bank_reconciliations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bank_reconciliations_rels_order_idx\` ON \`bank_reconciliations_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`bank_reconciliations_rels_parent_idx\` ON \`bank_reconciliations_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_reconciliations_rels_path_idx\` ON \`bank_reconciliations_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`bank_reconciliations_rels_users_id_idx\` ON \`bank_reconciliations_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_bank_reconciliations_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_bank_reconciliations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_bank_reconciliations_v_rels_order_idx\` ON \`_bank_reconciliations_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_bank_reconciliations_v_rels_parent_idx\` ON \`_bank_reconciliations_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_bank_reconciliations_v_rels_path_idx\` ON \`_bank_reconciliations_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_bank_reconciliations_v_rels_users_id_idx\` ON \`_bank_reconciliations_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`bank_statements_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`bank_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bank_statements_rels_order_idx\` ON \`bank_statements_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`bank_statements_rels_parent_idx\` ON \`bank_statements_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_statements_rels_path_idx\` ON \`bank_statements_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`bank_statements_rels_users_id_idx\` ON \`bank_statements_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_bank_statements_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_bank_statements_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_bank_statements_v_rels_order_idx\` ON \`_bank_statements_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_bank_statements_v_rels_parent_idx\` ON \`_bank_statements_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_bank_statements_v_rels_path_idx\` ON \`_bank_statements_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_bank_statements_v_rels_users_id_idx\` ON \`_bank_statements_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`bank_transactions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`bank_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bank_transactions_rels_order_idx\` ON \`bank_transactions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`bank_transactions_rels_parent_idx\` ON \`bank_transactions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_transactions_rels_path_idx\` ON \`bank_transactions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`bank_transactions_rels_users_id_idx\` ON \`bank_transactions_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_bank_transactions_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_bank_transactions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_bank_transactions_v_rels_order_idx\` ON \`_bank_transactions_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_bank_transactions_v_rels_parent_idx\` ON \`_bank_transactions_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_bank_transactions_v_rels_path_idx\` ON \`_bank_transactions_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_bank_transactions_v_rels_users_id_idx\` ON \`_bank_transactions_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`bookable_resources_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`bookable_resources\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bookable_resources_rels_order_idx\` ON \`bookable_resources_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`bookable_resources_rels_parent_idx\` ON \`bookable_resources_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`bookable_resources_rels_path_idx\` ON \`bookable_resources_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`bookable_resources_rels_users_id_idx\` ON \`bookable_resources_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_bookable_resources_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_bookable_resources_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_bookable_resources_v_rels_order_idx\` ON \`_bookable_resources_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_bookable_resources_v_rels_parent_idx\` ON \`_bookable_resources_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_bookable_resources_v_rels_path_idx\` ON \`_bookable_resources_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_bookable_resources_v_rels_users_id_idx\` ON \`_bookable_resources_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`carbon_emissions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`carbon_emissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`carbon_emissions_rels_order_idx\` ON \`carbon_emissions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`carbon_emissions_rels_parent_idx\` ON \`carbon_emissions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`carbon_emissions_rels_path_idx\` ON \`carbon_emissions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`carbon_emissions_rels_users_id_idx\` ON \`carbon_emissions_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_carbon_emissions_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_carbon_emissions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_carbon_emissions_v_rels_order_idx\` ON \`_carbon_emissions_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_carbon_emissions_v_rels_parent_idx\` ON \`_carbon_emissions_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_carbon_emissions_v_rels_path_idx\` ON \`_carbon_emissions_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_carbon_emissions_v_rels_users_id_idx\` ON \`_carbon_emissions_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`closing_entries_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`closing_entries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`closing_entries_rels_order_idx\` ON \`closing_entries_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`closing_entries_rels_parent_idx\` ON \`closing_entries_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`closing_entries_rels_path_idx\` ON \`closing_entries_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`closing_entries_rels_users_id_idx\` ON \`closing_entries_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_closing_entries_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_closing_entries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_closing_entries_v_rels_order_idx\` ON \`_closing_entries_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_closing_entries_v_rels_parent_idx\` ON \`_closing_entries_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_closing_entries_v_rels_path_idx\` ON \`_closing_entries_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_closing_entries_v_rels_users_id_idx\` ON \`_closing_entries_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`compliance_deadlines_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`compliance_deadlines\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_rels_order_idx\` ON \`compliance_deadlines_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_rels_parent_idx\` ON \`compliance_deadlines_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_rels_path_idx\` ON \`compliance_deadlines_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`compliance_deadlines_rels_users_id_idx\` ON \`compliance_deadlines_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_compliance_deadlines_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_compliance_deadlines_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_rels_order_idx\` ON \`_compliance_deadlines_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_rels_parent_idx\` ON \`_compliance_deadlines_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_rels_path_idx\` ON \`_compliance_deadlines_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_deadlines_v_rels_users_id_idx\` ON \`_compliance_deadlines_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`csrd_disclosures_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`csrd_disclosures\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`csrd_disclosures_rels_order_idx\` ON \`csrd_disclosures_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`csrd_disclosures_rels_parent_idx\` ON \`csrd_disclosures_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`csrd_disclosures_rels_path_idx\` ON \`csrd_disclosures_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`csrd_disclosures_rels_users_id_idx\` ON \`csrd_disclosures_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_csrd_disclosures_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_csrd_disclosures_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_csrd_disclosures_v_rels_order_idx\` ON \`_csrd_disclosures_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_csrd_disclosures_v_rels_parent_idx\` ON \`_csrd_disclosures_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_csrd_disclosures_v_rels_path_idx\` ON \`_csrd_disclosures_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_csrd_disclosures_v_rels_users_id_idx\` ON \`_csrd_disclosures_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`currency_rates_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`currency_rates\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`currency_rates_rels_order_idx\` ON \`currency_rates_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`currency_rates_rels_parent_idx\` ON \`currency_rates_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`currency_rates_rels_path_idx\` ON \`currency_rates_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`currency_rates_rels_users_id_idx\` ON \`currency_rates_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_currency_rates_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_currency_rates_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_currency_rates_v_rels_order_idx\` ON \`_currency_rates_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_currency_rates_v_rels_parent_idx\` ON \`_currency_rates_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_currency_rates_v_rels_path_idx\` ON \`_currency_rates_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_currency_rates_v_rels_users_id_idx\` ON \`_currency_rates_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`earnings_per_share_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`earnings_per_share\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`earnings_per_share_rels_order_idx\` ON \`earnings_per_share_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`earnings_per_share_rels_parent_idx\` ON \`earnings_per_share_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`earnings_per_share_rels_path_idx\` ON \`earnings_per_share_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`earnings_per_share_rels_users_id_idx\` ON \`earnings_per_share_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_earnings_per_share_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_earnings_per_share_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_earnings_per_share_v_rels_order_idx\` ON \`_earnings_per_share_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_earnings_per_share_v_rels_parent_idx\` ON \`_earnings_per_share_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_earnings_per_share_v_rels_path_idx\` ON \`_earnings_per_share_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_earnings_per_share_v_rels_users_id_idx\` ON \`_earnings_per_share_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`entity_legal_structures_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`entity_legal_structures\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`entity_legal_structures_rels_order_idx\` ON \`entity_legal_structures_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`entity_legal_structures_rels_parent_idx\` ON \`entity_legal_structures_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`entity_legal_structures_rels_path_idx\` ON \`entity_legal_structures_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`entity_legal_structures_rels_users_id_idx\` ON \`entity_legal_structures_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_entity_legal_structures_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_entity_legal_structures_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_entity_legal_structures_v_rels_order_idx\` ON \`_entity_legal_structures_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_entity_legal_structures_v_rels_parent_idx\` ON \`_entity_legal_structures_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_entity_legal_structures_v_rels_path_idx\` ON \`_entity_legal_structures_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_entity_legal_structures_v_rels_users_id_idx\` ON \`_entity_legal_structures_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`evidence_attestations_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`evidence_attestations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`evidence_attestations_rels_order_idx\` ON \`evidence_attestations_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`evidence_attestations_rels_parent_idx\` ON \`evidence_attestations_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`evidence_attestations_rels_path_idx\` ON \`evidence_attestations_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`evidence_attestations_rels_users_id_idx\` ON \`evidence_attestations_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_evidence_attestations_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_evidence_attestations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_evidence_attestations_v_rels_order_idx\` ON \`_evidence_attestations_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_evidence_attestations_v_rels_parent_idx\` ON \`_evidence_attestations_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_evidence_attestations_v_rels_path_idx\` ON \`_evidence_attestations_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_evidence_attestations_v_rels_users_id_idx\` ON \`_evidence_attestations_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`financial_statements_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`financial_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`financial_statements_rels_order_idx\` ON \`financial_statements_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`financial_statements_rels_parent_idx\` ON \`financial_statements_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`financial_statements_rels_path_idx\` ON \`financial_statements_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`financial_statements_rels_users_id_idx\` ON \`financial_statements_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_financial_statements_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_financial_statements_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_financial_statements_v_rels_order_idx\` ON \`_financial_statements_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_financial_statements_v_rels_parent_idx\` ON \`_financial_statements_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_financial_statements_v_rels_path_idx\` ON \`_financial_statements_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_financial_statements_v_rels_users_id_idx\` ON \`_financial_statements_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`fiscal_calendars_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`fiscal_calendars\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`fiscal_calendars_rels_order_idx\` ON \`fiscal_calendars_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_calendars_rels_parent_idx\` ON \`fiscal_calendars_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_calendars_rels_path_idx\` ON \`fiscal_calendars_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_calendars_rels_users_id_idx\` ON \`fiscal_calendars_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_fiscal_calendars_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_fiscal_calendars_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_fiscal_calendars_v_rels_order_idx\` ON \`_fiscal_calendars_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_fiscal_calendars_v_rels_parent_idx\` ON \`_fiscal_calendars_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_fiscal_calendars_v_rels_path_idx\` ON \`_fiscal_calendars_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_fiscal_calendars_v_rels_users_id_idx\` ON \`_fiscal_calendars_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`fiscal_periods_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`fiscal_periods_rels_order_idx\` ON \`fiscal_periods_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_rels_parent_idx\` ON \`fiscal_periods_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_rels_path_idx\` ON \`fiscal_periods_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_rels_users_id_idx\` ON \`fiscal_periods_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_fiscal_periods_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_fiscal_periods_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_fiscal_periods_v_rels_order_idx\` ON \`_fiscal_periods_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_fiscal_periods_v_rels_parent_idx\` ON \`_fiscal_periods_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_fiscal_periods_v_rels_path_idx\` ON \`_fiscal_periods_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_fiscal_periods_v_rels_users_id_idx\` ON \`_fiscal_periods_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`fx_transactions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`fx_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`fx_transactions_rels_order_idx\` ON \`fx_transactions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`fx_transactions_rels_parent_idx\` ON \`fx_transactions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`fx_transactions_rels_path_idx\` ON \`fx_transactions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`fx_transactions_rels_users_id_idx\` ON \`fx_transactions_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_fx_transactions_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_fx_transactions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_fx_transactions_v_rels_order_idx\` ON \`_fx_transactions_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_fx_transactions_v_rels_parent_idx\` ON \`_fx_transactions_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_fx_transactions_v_rels_path_idx\` ON \`_fx_transactions_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_fx_transactions_v_rels_users_id_idx\` ON \`_fx_transactions_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`gl_accounts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`gl_accounts_rels_order_idx\` ON \`gl_accounts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`gl_accounts_rels_parent_idx\` ON \`gl_accounts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`gl_accounts_rels_path_idx\` ON \`gl_accounts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`gl_accounts_rels_users_id_idx\` ON \`gl_accounts_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_gl_accounts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_gl_accounts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_gl_accounts_v_rels_order_idx\` ON \`_gl_accounts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_gl_accounts_v_rels_parent_idx\` ON \`_gl_accounts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_gl_accounts_v_rels_path_idx\` ON \`_gl_accounts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_gl_accounts_v_rels_users_id_idx\` ON \`_gl_accounts_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`gl_postings_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`gl_postings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`gl_postings_rels_order_idx\` ON \`gl_postings_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`gl_postings_rels_parent_idx\` ON \`gl_postings_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`gl_postings_rels_path_idx\` ON \`gl_postings_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`gl_postings_rels_users_id_idx\` ON \`gl_postings_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_gl_postings_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_gl_postings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_gl_postings_v_rels_order_idx\` ON \`_gl_postings_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_gl_postings_v_rels_parent_idx\` ON \`_gl_postings_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_gl_postings_v_rels_path_idx\` ON \`_gl_postings_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_gl_postings_v_rels_users_id_idx\` ON \`_gl_postings_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`journal_entries_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`journal_entries_rels_order_idx\` ON \`journal_entries_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`journal_entries_rels_parent_idx\` ON \`journal_entries_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`journal_entries_rels_path_idx\` ON \`journal_entries_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`journal_entries_rels_users_id_idx\` ON \`journal_entries_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_journal_entries_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_journal_entries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_journal_entries_v_rels_order_idx\` ON \`_journal_entries_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_journal_entries_v_rels_parent_idx\` ON \`_journal_entries_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_journal_entries_v_rels_path_idx\` ON \`_journal_entries_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_journal_entries_v_rels_users_id_idx\` ON \`_journal_entries_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`lease_modifications_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`lease_modifications\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`lease_modifications_rels_order_idx\` ON \`lease_modifications_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`lease_modifications_rels_parent_idx\` ON \`lease_modifications_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_modifications_rels_path_idx\` ON \`lease_modifications_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`lease_modifications_rels_users_id_idx\` ON \`lease_modifications_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_lease_modifications_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_lease_modifications_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_lease_modifications_v_rels_order_idx\` ON \`_lease_modifications_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_lease_modifications_v_rels_parent_idx\` ON \`_lease_modifications_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_lease_modifications_v_rels_path_idx\` ON \`_lease_modifications_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_lease_modifications_v_rels_users_id_idx\` ON \`_lease_modifications_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`legal_entities_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`legal_entities_rels_order_idx\` ON \`legal_entities_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`legal_entities_rels_parent_idx\` ON \`legal_entities_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`legal_entities_rels_path_idx\` ON \`legal_entities_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`legal_entities_rels_users_id_idx\` ON \`legal_entities_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_legal_entities_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_legal_entities_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_legal_entities_v_rels_order_idx\` ON \`_legal_entities_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_legal_entities_v_rels_parent_idx\` ON \`_legal_entities_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_legal_entities_v_rels_path_idx\` ON \`_legal_entities_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_legal_entities_v_rels_users_id_idx\` ON \`_legal_entities_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`period_end_adjustments_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`period_end_adjustments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`period_end_adjustments_rels_order_idx\` ON \`period_end_adjustments_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`period_end_adjustments_rels_parent_idx\` ON \`period_end_adjustments_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`period_end_adjustments_rels_path_idx\` ON \`period_end_adjustments_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`period_end_adjustments_rels_users_id_idx\` ON \`period_end_adjustments_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_period_end_adjustments_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_period_end_adjustments_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_period_end_adjustments_v_rels_order_idx\` ON \`_period_end_adjustments_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_period_end_adjustments_v_rels_parent_idx\` ON \`_period_end_adjustments_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_period_end_adjustments_v_rels_path_idx\` ON \`_period_end_adjustments_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_period_end_adjustments_v_rels_users_id_idx\` ON \`_period_end_adjustments_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`period_locks_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`period_locks\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`period_locks_rels_order_idx\` ON \`period_locks_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`period_locks_rels_parent_idx\` ON \`period_locks_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`period_locks_rels_path_idx\` ON \`period_locks_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`period_locks_rels_users_id_idx\` ON \`period_locks_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_period_locks_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_period_locks_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_period_locks_v_rels_order_idx\` ON \`_period_locks_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_period_locks_v_rels_parent_idx\` ON \`_period_locks_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_period_locks_v_rels_path_idx\` ON \`_period_locks_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_period_locks_v_rels_users_id_idx\` ON \`_period_locks_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`post_balance_sheet_events_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`post_balance_sheet_events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_rels_order_idx\` ON \`post_balance_sheet_events_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_rels_parent_idx\` ON \`post_balance_sheet_events_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_rels_path_idx\` ON \`post_balance_sheet_events_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`post_balance_sheet_events_rels_users_id_idx\` ON \`post_balance_sheet_events_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_post_balance_sheet_events_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_post_balance_sheet_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_post_balance_sheet_events_v_rels_order_idx\` ON \`_post_balance_sheet_events_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_post_balance_sheet_events_v_rels_parent_idx\` ON \`_post_balance_sheet_events_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_post_balance_sheet_events_v_rels_path_idx\` ON \`_post_balance_sheet_events_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_post_balance_sheet_events_v_rels_users_id_idx\` ON \`_post_balance_sheet_events_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`post_close_analytics_reports_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`post_close_analytics_reports\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`post_close_analytics_reports_rels_order_idx\` ON \`post_close_analytics_reports_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`post_close_analytics_reports_rels_parent_idx\` ON \`post_close_analytics_reports_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`post_close_analytics_reports_rels_path_idx\` ON \`post_close_analytics_reports_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`post_close_analytics_reports_rels_users_id_idx\` ON \`post_close_analytics_reports_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_post_close_analytics_reports_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_post_close_analytics_reports_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_post_close_analytics_reports_v_rels_order_idx\` ON \`_post_close_analytics_reports_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_post_close_analytics_reports_v_rels_parent_idx\` ON \`_post_close_analytics_reports_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_post_close_analytics_reports_v_rels_path_idx\` ON \`_post_close_analytics_reports_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_post_close_analytics_reports_v_rels_users_id_idx\` ON \`_post_close_analytics_reports_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`prior_period_adjustments_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`prior_period_adjustments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`prior_period_adjustments_rels_order_idx\` ON \`prior_period_adjustments_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`prior_period_adjustments_rels_parent_idx\` ON \`prior_period_adjustments_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`prior_period_adjustments_rels_path_idx\` ON \`prior_period_adjustments_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`prior_period_adjustments_rels_users_id_idx\` ON \`prior_period_adjustments_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_prior_period_adjustments_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_prior_period_adjustments_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_prior_period_adjustments_v_rels_order_idx\` ON \`_prior_period_adjustments_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_prior_period_adjustments_v_rels_parent_idx\` ON \`_prior_period_adjustments_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_prior_period_adjustments_v_rels_path_idx\` ON \`_prior_period_adjustments_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_prior_period_adjustments_v_rels_users_id_idx\` ON \`_prior_period_adjustments_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`provisions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`provisions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`provisions_rels_order_idx\` ON \`provisions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`provisions_rels_parent_idx\` ON \`provisions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`provisions_rels_path_idx\` ON \`provisions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`provisions_rels_users_id_idx\` ON \`provisions_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_provisions_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_provisions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_provisions_v_rels_order_idx\` ON \`_provisions_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_rels_parent_idx\` ON \`_provisions_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_rels_path_idx\` ON \`_provisions_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_provisions_v_rels_users_id_idx\` ON \`_provisions_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`reporting_standards_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`reporting_standards\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`reporting_standards_rels_order_idx\` ON \`reporting_standards_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_rels_parent_idx\` ON \`reporting_standards_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_rels_path_idx\` ON \`reporting_standards_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`reporting_standards_rels_users_id_idx\` ON \`reporting_standards_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_reporting_standards_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_reporting_standards_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_rels_order_idx\` ON \`_reporting_standards_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_rels_parent_idx\` ON \`_reporting_standards_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_rels_path_idx\` ON \`_reporting_standards_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_standards_v_rels_users_id_idx\` ON \`_reporting_standards_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`statutory_report_templates_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`statutory_report_templates\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_rels_order_idx\` ON \`statutory_report_templates_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_rels_parent_idx\` ON \`statutory_report_templates_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_rels_path_idx\` ON \`statutory_report_templates_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`statutory_report_templates_rels_users_id_idx\` ON \`statutory_report_templates_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_statutory_report_templates_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_statutory_report_templates_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_rels_order_idx\` ON \`_statutory_report_templates_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_rels_parent_idx\` ON \`_statutory_report_templates_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_rels_path_idx\` ON \`_statutory_report_templates_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_report_templates_v_rels_users_id_idx\` ON \`_statutory_report_templates_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`tax_calculations_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tax_calculations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tax_calculations_rels_order_idx\` ON \`tax_calculations_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`tax_calculations_rels_parent_idx\` ON \`tax_calculations_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_calculations_rels_path_idx\` ON \`tax_calculations_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`tax_calculations_rels_users_id_idx\` ON \`tax_calculations_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_tax_calculations_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_tax_calculations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_tax_calculations_v_rels_order_idx\` ON \`_tax_calculations_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_tax_calculations_v_rels_parent_idx\` ON \`_tax_calculations_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_tax_calculations_v_rels_path_idx\` ON \`_tax_calculations_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_tax_calculations_v_rels_users_id_idx\` ON \`_tax_calculations_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`tax_periods_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tax_periods\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tax_periods_rels_order_idx\` ON \`tax_periods_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`tax_periods_rels_parent_idx\` ON \`tax_periods_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_periods_rels_path_idx\` ON \`tax_periods_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`tax_periods_rels_users_id_idx\` ON \`tax_periods_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_tax_periods_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_tax_periods_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_tax_periods_v_rels_order_idx\` ON \`_tax_periods_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_tax_periods_v_rels_parent_idx\` ON \`_tax_periods_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_tax_periods_v_rels_path_idx\` ON \`_tax_periods_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_tax_periods_v_rels_users_id_idx\` ON \`_tax_periods_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`transfer_pricing_files_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`transfer_pricing_files\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`transfer_pricing_files_rels_order_idx\` ON \`transfer_pricing_files_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_files_rels_parent_idx\` ON \`transfer_pricing_files_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_files_rels_path_idx\` ON \`transfer_pricing_files_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_files_rels_users_id_idx\` ON \`transfer_pricing_files_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_transfer_pricing_files_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_transfer_pricing_files_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_transfer_pricing_files_v_rels_order_idx\` ON \`_transfer_pricing_files_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_transfer_pricing_files_v_rels_parent_idx\` ON \`_transfer_pricing_files_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_transfer_pricing_files_v_rels_path_idx\` ON \`_transfer_pricing_files_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_transfer_pricing_files_v_rels_users_id_idx\` ON \`_transfer_pricing_files_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`wip_snapshots_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`wip_snapshots\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`wip_snapshots_rels_order_idx\` ON \`wip_snapshots_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`wip_snapshots_rels_parent_idx\` ON \`wip_snapshots_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`wip_snapshots_rels_path_idx\` ON \`wip_snapshots_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`wip_snapshots_rels_users_id_idx\` ON \`wip_snapshots_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_wip_snapshots_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_wip_snapshots_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_wip_snapshots_v_rels_order_idx\` ON \`_wip_snapshots_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_wip_snapshots_v_rels_parent_idx\` ON \`_wip_snapshots_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_wip_snapshots_v_rels_path_idx\` ON \`_wip_snapshots_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_wip_snapshots_v_rels_users_id_idx\` ON \`_wip_snapshots_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`cost_centers_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cost_centers_rels_order_idx\` ON \`cost_centers_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`cost_centers_rels_parent_idx\` ON \`cost_centers_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`cost_centers_rels_path_idx\` ON \`cost_centers_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`cost_centers_rels_users_id_idx\` ON \`cost_centers_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_cost_centers_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_cost_centers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_cost_centers_v_rels_order_idx\` ON \`_cost_centers_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_cost_centers_v_rels_parent_idx\` ON \`_cost_centers_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_cost_centers_v_rels_path_idx\` ON \`_cost_centers_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_cost_centers_v_rels_users_id_idx\` ON \`_cost_centers_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`employees_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`employees_rels_order_idx\` ON \`employees_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`employees_rels_parent_idx\` ON \`employees_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`employees_rels_path_idx\` ON \`employees_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`employees_rels_users_id_idx\` ON \`employees_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_employees_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_employees_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_employees_v_rels_order_idx\` ON \`_employees_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_employees_v_rels_parent_idx\` ON \`_employees_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_employees_v_rels_path_idx\` ON \`_employees_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_employees_v_rels_users_id_idx\` ON \`_employees_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`expense_reports_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`expense_reports\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`expense_reports_rels_order_idx\` ON \`expense_reports_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_rels_parent_idx\` ON \`expense_reports_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_rels_path_idx\` ON \`expense_reports_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`expense_reports_rels_users_id_idx\` ON \`expense_reports_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_expense_reports_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_expense_reports_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_rels_order_idx\` ON \`_expense_reports_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_rels_parent_idx\` ON \`_expense_reports_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_rels_path_idx\` ON \`_expense_reports_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_expense_reports_v_rels_users_id_idx\` ON \`_expense_reports_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`job_positions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`job_positions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`job_positions_rels_order_idx\` ON \`job_positions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`job_positions_rels_parent_idx\` ON \`job_positions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`job_positions_rels_path_idx\` ON \`job_positions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`job_positions_rels_users_id_idx\` ON \`job_positions_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_job_positions_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_job_positions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_job_positions_v_rels_order_idx\` ON \`_job_positions_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_job_positions_v_rels_parent_idx\` ON \`_job_positions_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_job_positions_v_rels_path_idx\` ON \`_job_positions_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_job_positions_v_rels_users_id_idx\` ON \`_job_positions_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`leave_requests_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`leave_requests\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`leave_requests_rels_order_idx\` ON \`leave_requests_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`leave_requests_rels_parent_idx\` ON \`leave_requests_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`leave_requests_rels_path_idx\` ON \`leave_requests_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`leave_requests_rels_users_id_idx\` ON \`leave_requests_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_leave_requests_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_leave_requests_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_leave_requests_v_rels_order_idx\` ON \`_leave_requests_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_leave_requests_v_rels_parent_idx\` ON \`_leave_requests_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_leave_requests_v_rels_path_idx\` ON \`_leave_requests_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_leave_requests_v_rels_users_id_idx\` ON \`_leave_requests_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`maintenance_work_orders_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`maintenance_work_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`maintenance_work_orders_rels_order_idx\` ON \`maintenance_work_orders_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_work_orders_rels_parent_idx\` ON \`maintenance_work_orders_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_work_orders_rels_path_idx\` ON \`maintenance_work_orders_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`maintenance_work_orders_rels_users_id_idx\` ON \`maintenance_work_orders_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_maintenance_work_orders_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_maintenance_work_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_maintenance_work_orders_v_rels_order_idx\` ON \`_maintenance_work_orders_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_maintenance_work_orders_v_rels_parent_idx\` ON \`_maintenance_work_orders_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_maintenance_work_orders_v_rels_path_idx\` ON \`_maintenance_work_orders_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_maintenance_work_orders_v_rels_users_id_idx\` ON \`_maintenance_work_orders_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payroll_runs_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payroll_runs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payroll_runs_rels_order_idx\` ON \`payroll_runs_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_rels_parent_idx\` ON \`payroll_runs_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_rels_path_idx\` ON \`payroll_runs_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_rels_users_id_idx\` ON \`payroll_runs_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_payroll_runs_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_payroll_runs_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_payroll_runs_v_rels_order_idx\` ON \`_payroll_runs_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_payroll_runs_v_rels_parent_idx\` ON \`_payroll_runs_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_payroll_runs_v_rels_path_idx\` ON \`_payroll_runs_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_payroll_runs_v_rels_users_id_idx\` ON \`_payroll_runs_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`performance_reviews_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`performance_reviews\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`performance_reviews_rels_order_idx\` ON \`performance_reviews_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`performance_reviews_rels_parent_idx\` ON \`performance_reviews_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`performance_reviews_rels_path_idx\` ON \`performance_reviews_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`performance_reviews_rels_users_id_idx\` ON \`performance_reviews_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_performance_reviews_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_performance_reviews_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_performance_reviews_v_rels_order_idx\` ON \`_performance_reviews_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_performance_reviews_v_rels_parent_idx\` ON \`_performance_reviews_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_performance_reviews_v_rels_path_idx\` ON \`_performance_reviews_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_performance_reviews_v_rels_users_id_idx\` ON \`_performance_reviews_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`sales_commissions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`sales_commissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sales_commissions_rels_order_idx\` ON \`sales_commissions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`sales_commissions_rels_parent_idx\` ON \`sales_commissions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sales_commissions_rels_path_idx\` ON \`sales_commissions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`sales_commissions_rels_users_id_idx\` ON \`sales_commissions_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_sales_commissions_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_sales_commissions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sales_commissions_v_rels_order_idx\` ON \`_sales_commissions_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_sales_commissions_v_rels_parent_idx\` ON \`_sales_commissions_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sales_commissions_v_rels_path_idx\` ON \`_sales_commissions_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_sales_commissions_v_rels_users_id_idx\` ON \`_sales_commissions_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`share_based_payments_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`share_based_payments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`share_based_payments_rels_order_idx\` ON \`share_based_payments_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`share_based_payments_rels_parent_idx\` ON \`share_based_payments_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`share_based_payments_rels_path_idx\` ON \`share_based_payments_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`share_based_payments_rels_users_id_idx\` ON \`share_based_payments_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_share_based_payments_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_share_based_payments_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_share_based_payments_v_rels_order_idx\` ON \`_share_based_payments_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_share_based_payments_v_rels_parent_idx\` ON \`_share_based_payments_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_share_based_payments_v_rels_path_idx\` ON \`_share_based_payments_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_share_based_payments_v_rels_users_id_idx\` ON \`_share_based_payments_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`time_entries_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`time_entries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`time_entries_rels_order_idx\` ON \`time_entries_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`time_entries_rels_parent_idx\` ON \`time_entries_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`time_entries_rels_path_idx\` ON \`time_entries_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`time_entries_rels_users_id_idx\` ON \`time_entries_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_time_entries_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_time_entries_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_time_entries_v_rels_order_idx\` ON \`_time_entries_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_time_entries_v_rels_parent_idx\` ON \`_time_entries_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_time_entries_v_rels_path_idx\` ON \`_time_entries_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_time_entries_v_rels_users_id_idx\` ON \`_time_entries_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`work_shifts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`work_shifts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`work_shifts_rels_order_idx\` ON \`work_shifts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`work_shifts_rels_parent_idx\` ON \`work_shifts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`work_shifts_rels_path_idx\` ON \`work_shifts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`work_shifts_rels_users_id_idx\` ON \`work_shifts_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_work_shifts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_work_shifts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_work_shifts_v_rels_order_idx\` ON \`_work_shifts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_work_shifts_v_rels_parent_idx\` ON \`_work_shifts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_work_shifts_v_rels_path_idx\` ON \`_work_shifts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_work_shifts_v_rels_users_id_idx\` ON \`_work_shifts_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`bills_of_materials_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`bills_of_materials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bills_of_materials_rels_order_idx\` ON \`bills_of_materials_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`bills_of_materials_rels_parent_idx\` ON \`bills_of_materials_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`bills_of_materials_rels_path_idx\` ON \`bills_of_materials_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`bills_of_materials_rels_users_id_idx\` ON \`bills_of_materials_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_bills_of_materials_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_bills_of_materials_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_rels_order_idx\` ON \`_bills_of_materials_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_rels_parent_idx\` ON \`_bills_of_materials_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_rels_path_idx\` ON \`_bills_of_materials_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_bills_of_materials_v_rels_users_id_idx\` ON \`_bills_of_materials_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`cost_variances_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`cost_variances\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cost_variances_rels_order_idx\` ON \`cost_variances_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`cost_variances_rels_parent_idx\` ON \`cost_variances_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`cost_variances_rels_path_idx\` ON \`cost_variances_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`cost_variances_rels_users_id_idx\` ON \`cost_variances_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_cost_variances_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_cost_variances_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_cost_variances_v_rels_order_idx\` ON \`_cost_variances_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_cost_variances_v_rels_parent_idx\` ON \`_cost_variances_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_cost_variances_v_rels_path_idx\` ON \`_cost_variances_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_cost_variances_v_rels_users_id_idx\` ON \`_cost_variances_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`lot_variants_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`lot_variants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`lot_variants_rels_order_idx\` ON \`lot_variants_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`lot_variants_rels_parent_idx\` ON \`lot_variants_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`lot_variants_rels_path_idx\` ON \`lot_variants_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`lot_variants_rels_users_id_idx\` ON \`lot_variants_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_lot_variants_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_lot_variants_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_rels_order_idx\` ON \`_lot_variants_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_rels_parent_idx\` ON \`_lot_variants_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_rels_path_idx\` ON \`_lot_variants_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_lot_variants_v_rels_users_id_idx\` ON \`_lot_variants_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`lot_work_phases_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`lot_work_phases\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`lot_work_phases_rels_order_idx\` ON \`lot_work_phases_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`lot_work_phases_rels_parent_idx\` ON \`lot_work_phases_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`lot_work_phases_rels_path_idx\` ON \`lot_work_phases_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`lot_work_phases_rels_users_id_idx\` ON \`lot_work_phases_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_lot_work_phases_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_lot_work_phases_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_lot_work_phases_v_rels_order_idx\` ON \`_lot_work_phases_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_lot_work_phases_v_rels_parent_idx\` ON \`_lot_work_phases_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_lot_work_phases_v_rels_path_idx\` ON \`_lot_work_phases_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_lot_work_phases_v_rels_users_id_idx\` ON \`_lot_work_phases_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`lots_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`lots\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`lots_rels_order_idx\` ON \`lots_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`lots_rels_parent_idx\` ON \`lots_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`lots_rels_path_idx\` ON \`lots_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`lots_rels_users_id_idx\` ON \`lots_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_lots_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_lots_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_lots_v_rels_order_idx\` ON \`_lots_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_rels_parent_idx\` ON \`_lots_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_rels_path_idx\` ON \`_lots_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_lots_v_rels_users_id_idx\` ON \`_lots_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`pack_items_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pack_items\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pack_items_rels_order_idx\` ON \`pack_items_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pack_items_rels_parent_idx\` ON \`pack_items_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pack_items_rels_path_idx\` ON \`pack_items_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pack_items_rels_users_id_idx\` ON \`pack_items_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_pack_items_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pack_items_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pack_items_v_rels_order_idx\` ON \`_pack_items_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_pack_items_v_rels_parent_idx\` ON \`_pack_items_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pack_items_v_rels_path_idx\` ON \`_pack_items_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_pack_items_v_rels_users_id_idx\` ON \`_pack_items_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`packs_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`packs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`packs_rels_order_idx\` ON \`packs_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`packs_rels_parent_idx\` ON \`packs_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`packs_rels_path_idx\` ON \`packs_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`packs_rels_users_id_idx\` ON \`packs_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_packs_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_packs_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_packs_v_rels_order_idx\` ON \`_packs_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_packs_v_rels_parent_idx\` ON \`_packs_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_packs_v_rels_path_idx\` ON \`_packs_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_packs_v_rels_users_id_idx\` ON \`_packs_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`work_centers_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`work_centers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`work_centers_rels_order_idx\` ON \`work_centers_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`work_centers_rels_parent_idx\` ON \`work_centers_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`work_centers_rels_path_idx\` ON \`work_centers_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`work_centers_rels_users_id_idx\` ON \`work_centers_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_work_centers_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_work_centers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_work_centers_v_rels_order_idx\` ON \`_work_centers_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_work_centers_v_rels_parent_idx\` ON \`_work_centers_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_work_centers_v_rels_path_idx\` ON \`_work_centers_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_work_centers_v_rels_users_id_idx\` ON \`_work_centers_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`work_orders_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`work_orders_rels_order_idx\` ON \`work_orders_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_rels_parent_idx\` ON \`work_orders_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_rels_path_idx\` ON \`work_orders_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_rels_users_id_idx\` ON \`work_orders_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_work_orders_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_work_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_work_orders_v_rels_order_idx\` ON \`_work_orders_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_rels_parent_idx\` ON \`_work_orders_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_rels_path_idx\` ON \`_work_orders_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_rels_users_id_idx\` ON \`_work_orders_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`work_phases_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`work_phases\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`work_phases_rels_order_idx\` ON \`work_phases_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`work_phases_rels_parent_idx\` ON \`work_phases_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`work_phases_rels_path_idx\` ON \`work_phases_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`work_phases_rels_users_id_idx\` ON \`work_phases_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_work_phases_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_work_phases_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_work_phases_v_rels_order_idx\` ON \`_work_phases_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_work_phases_v_rels_parent_idx\` ON \`_work_phases_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_work_phases_v_rels_path_idx\` ON \`_work_phases_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_work_phases_v_rels_users_id_idx\` ON \`_work_phases_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`carriers_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`carriers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`carriers_rels_order_idx\` ON \`carriers_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`carriers_rels_parent_idx\` ON \`carriers_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`carriers_rels_path_idx\` ON \`carriers_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`carriers_rels_users_id_idx\` ON \`carriers_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_carriers_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_carriers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_carriers_v_rels_order_idx\` ON \`_carriers_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_carriers_v_rels_parent_idx\` ON \`_carriers_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_carriers_v_rels_path_idx\` ON \`_carriers_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_carriers_v_rels_users_id_idx\` ON \`_carriers_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`consignment_inventory_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`consignment_inventory\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`consignment_inventory_rels_order_idx\` ON \`consignment_inventory_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`consignment_inventory_rels_parent_idx\` ON \`consignment_inventory_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`consignment_inventory_rels_path_idx\` ON \`consignment_inventory_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`consignment_inventory_rels_users_id_idx\` ON \`consignment_inventory_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_consignment_inventory_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_consignment_inventory_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_consignment_inventory_v_rels_order_idx\` ON \`_consignment_inventory_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_consignment_inventory_v_rels_parent_idx\` ON \`_consignment_inventory_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_consignment_inventory_v_rels_path_idx\` ON \`_consignment_inventory_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_consignment_inventory_v_rels_users_id_idx\` ON \`_consignment_inventory_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`inventory_movements_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`inventory_movements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`inventory_movements_rels_order_idx\` ON \`inventory_movements_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`inventory_movements_rels_parent_idx\` ON \`inventory_movements_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`inventory_movements_rels_path_idx\` ON \`inventory_movements_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`inventory_movements_rels_users_id_idx\` ON \`inventory_movements_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_inventory_movements_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_inventory_movements_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_rels_order_idx\` ON \`_inventory_movements_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_rels_parent_idx\` ON \`_inventory_movements_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_rels_path_idx\` ON \`_inventory_movements_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_inventory_movements_v_rels_users_id_idx\` ON \`_inventory_movements_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`packages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`packages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`packages_rels_order_idx\` ON \`packages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`packages_rels_parent_idx\` ON \`packages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`packages_rels_path_idx\` ON \`packages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`packages_rels_users_id_idx\` ON \`packages_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_packages_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_packages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_packages_v_rels_order_idx\` ON \`_packages_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_packages_v_rels_parent_idx\` ON \`_packages_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_packages_v_rels_path_idx\` ON \`_packages_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_packages_v_rels_users_id_idx\` ON \`_packages_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`production_receipts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`production_receipts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`production_receipts_rels_order_idx\` ON \`production_receipts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`production_receipts_rels_parent_idx\` ON \`production_receipts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`production_receipts_rels_path_idx\` ON \`production_receipts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`production_receipts_rels_users_id_idx\` ON \`production_receipts_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_production_receipts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_production_receipts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_rels_order_idx\` ON \`_production_receipts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_rels_parent_idx\` ON \`_production_receipts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_rels_path_idx\` ON \`_production_receipts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_production_receipts_v_rels_users_id_idx\` ON \`_production_receipts_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`quality_inspections_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`quality_inspections\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`quality_inspections_rels_order_idx\` ON \`quality_inspections_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`quality_inspections_rels_parent_idx\` ON \`quality_inspections_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`quality_inspections_rels_path_idx\` ON \`quality_inspections_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`quality_inspections_rels_users_id_idx\` ON \`quality_inspections_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_quality_inspections_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_quality_inspections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_rels_order_idx\` ON \`_quality_inspections_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_rels_parent_idx\` ON \`_quality_inspections_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_rels_path_idx\` ON \`_quality_inspections_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_quality_inspections_v_rels_users_id_idx\` ON \`_quality_inspections_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`shipments_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`shipments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`shipments_rels_order_idx\` ON \`shipments_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`shipments_rels_parent_idx\` ON \`shipments_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`shipments_rels_path_idx\` ON \`shipments_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`shipments_rels_users_id_idx\` ON \`shipments_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_shipments_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_shipments_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_shipments_v_rels_order_idx\` ON \`_shipments_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_rels_parent_idx\` ON \`_shipments_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_rels_path_idx\` ON \`_shipments_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_shipments_v_rels_users_id_idx\` ON \`_shipments_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`tracking_events_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tracking_events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tracking_events_rels_order_idx\` ON \`tracking_events_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`tracking_events_rels_parent_idx\` ON \`tracking_events_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tracking_events_rels_path_idx\` ON \`tracking_events_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`tracking_events_rels_users_id_idx\` ON \`tracking_events_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_tracking_events_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_tracking_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_tracking_events_v_rels_order_idx\` ON \`_tracking_events_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_tracking_events_v_rels_parent_idx\` ON \`_tracking_events_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_tracking_events_v_rels_path_idx\` ON \`_tracking_events_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_tracking_events_v_rels_users_id_idx\` ON \`_tracking_events_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`warehouse_locations_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`warehouse_locations_rels_order_idx\` ON \`warehouse_locations_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`warehouse_locations_rels_parent_idx\` ON \`warehouse_locations_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`warehouse_locations_rels_path_idx\` ON \`warehouse_locations_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`warehouse_locations_rels_users_id_idx\` ON \`warehouse_locations_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_warehouse_locations_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_warehouse_locations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_warehouse_locations_v_rels_order_idx\` ON \`_warehouse_locations_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_warehouse_locations_v_rels_parent_idx\` ON \`_warehouse_locations_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_warehouse_locations_v_rels_path_idx\` ON \`_warehouse_locations_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_warehouse_locations_v_rels_users_id_idx\` ON \`_warehouse_locations_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`audit_committees_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`audit_committees\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`audit_committees_rels_order_idx\` ON \`audit_committees_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`audit_committees_rels_parent_idx\` ON \`audit_committees_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_committees_rels_path_idx\` ON \`audit_committees_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`audit_committees_rels_users_id_idx\` ON \`audit_committees_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_audit_committees_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_audit_committees_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_audit_committees_v_rels_order_idx\` ON \`_audit_committees_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_audit_committees_v_rels_parent_idx\` ON \`_audit_committees_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_audit_committees_v_rels_path_idx\` ON \`_audit_committees_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_audit_committees_v_rels_users_id_idx\` ON \`_audit_committees_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`audit_evidence_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`audit_evidence\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`audit_evidence_rels_order_idx\` ON \`audit_evidence_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`audit_evidence_rels_parent_idx\` ON \`audit_evidence_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_evidence_rels_path_idx\` ON \`audit_evidence_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`audit_evidence_rels_users_id_idx\` ON \`audit_evidence_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_audit_evidence_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_audit_evidence_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_audit_evidence_v_rels_order_idx\` ON \`_audit_evidence_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_audit_evidence_v_rels_parent_idx\` ON \`_audit_evidence_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_audit_evidence_v_rels_path_idx\` ON \`_audit_evidence_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_audit_evidence_v_rels_users_id_idx\` ON \`_audit_evidence_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`audit_findings_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`audit_findings_rels_order_idx\` ON \`audit_findings_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_rels_parent_idx\` ON \`audit_findings_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_rels_path_idx\` ON \`audit_findings_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_rels_users_id_idx\` ON \`audit_findings_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_audit_findings_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_audit_findings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_audit_findings_v_rels_order_idx\` ON \`_audit_findings_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_audit_findings_v_rels_parent_idx\` ON \`_audit_findings_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_audit_findings_v_rels_path_idx\` ON \`_audit_findings_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_audit_findings_v_rels_users_id_idx\` ON \`_audit_findings_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`audit_samples_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`audit_samples\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`audit_samples_rels_order_idx\` ON \`audit_samples_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`audit_samples_rels_parent_idx\` ON \`audit_samples_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_samples_rels_path_idx\` ON \`audit_samples_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`audit_samples_rels_users_id_idx\` ON \`audit_samples_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_audit_samples_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_audit_samples_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_audit_samples_v_rels_order_idx\` ON \`_audit_samples_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_audit_samples_v_rels_parent_idx\` ON \`_audit_samples_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_audit_samples_v_rels_path_idx\` ON \`_audit_samples_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_audit_samples_v_rels_users_id_idx\` ON \`_audit_samples_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`compliance_frameworks_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`compliance_frameworks\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`compliance_frameworks_rels_order_idx\` ON \`compliance_frameworks_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`compliance_frameworks_rels_parent_idx\` ON \`compliance_frameworks_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_frameworks_rels_path_idx\` ON \`compliance_frameworks_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`compliance_frameworks_rels_users_id_idx\` ON \`compliance_frameworks_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_compliance_frameworks_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_compliance_frameworks_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_compliance_frameworks_v_rels_order_idx\` ON \`_compliance_frameworks_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_frameworks_v_rels_parent_idx\` ON \`_compliance_frameworks_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_frameworks_v_rels_path_idx\` ON \`_compliance_frameworks_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_frameworks_v_rels_users_id_idx\` ON \`_compliance_frameworks_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`compliance_gaps_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`compliance_gaps\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`compliance_gaps_rels_order_idx\` ON \`compliance_gaps_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`compliance_gaps_rels_parent_idx\` ON \`compliance_gaps_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_gaps_rels_path_idx\` ON \`compliance_gaps_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`compliance_gaps_rels_users_id_idx\` ON \`compliance_gaps_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_compliance_gaps_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_compliance_gaps_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_compliance_gaps_v_rels_order_idx\` ON \`_compliance_gaps_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_gaps_v_rels_parent_idx\` ON \`_compliance_gaps_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_gaps_v_rels_path_idx\` ON \`_compliance_gaps_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_gaps_v_rels_users_id_idx\` ON \`_compliance_gaps_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`compliance_requirements_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`compliance_requirements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`compliance_requirements_rels_order_idx\` ON \`compliance_requirements_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`compliance_requirements_rels_parent_idx\` ON \`compliance_requirements_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_requirements_rels_path_idx\` ON \`compliance_requirements_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`compliance_requirements_rels_users_id_idx\` ON \`compliance_requirements_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_compliance_requirements_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_compliance_requirements_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_compliance_requirements_v_rels_order_idx\` ON \`_compliance_requirements_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_requirements_v_rels_parent_idx\` ON \`_compliance_requirements_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_requirements_v_rels_path_idx\` ON \`_compliance_requirements_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_requirements_v_rels_users_id_idx\` ON \`_compliance_requirements_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`control_tests_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`control_tests\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`control_tests_rels_order_idx\` ON \`control_tests_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`control_tests_rels_parent_idx\` ON \`control_tests_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`control_tests_rels_path_idx\` ON \`control_tests_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`control_tests_rels_users_id_idx\` ON \`control_tests_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_control_tests_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_control_tests_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_control_tests_v_rels_order_idx\` ON \`_control_tests_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_control_tests_v_rels_parent_idx\` ON \`_control_tests_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_control_tests_v_rels_path_idx\` ON \`_control_tests_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_control_tests_v_rels_users_id_idx\` ON \`_control_tests_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`government_grants_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`government_grants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`government_grants_rels_order_idx\` ON \`government_grants_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`government_grants_rels_parent_idx\` ON \`government_grants_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`government_grants_rels_path_idx\` ON \`government_grants_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`government_grants_rels_users_id_idx\` ON \`government_grants_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_government_grants_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_government_grants_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_government_grants_v_rels_order_idx\` ON \`_government_grants_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_government_grants_v_rels_parent_idx\` ON \`_government_grants_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_government_grants_v_rels_path_idx\` ON \`_government_grants_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_government_grants_v_rels_users_id_idx\` ON \`_government_grants_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`internal_controls_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`internal_controls_rels_order_idx\` ON \`internal_controls_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`internal_controls_rels_parent_idx\` ON \`internal_controls_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_controls_rels_path_idx\` ON \`internal_controls_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`internal_controls_rels_users_id_idx\` ON \`internal_controls_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_internal_controls_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_internal_controls_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_internal_controls_v_rels_order_idx\` ON \`_internal_controls_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_internal_controls_v_rels_parent_idx\` ON \`_internal_controls_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_internal_controls_v_rels_path_idx\` ON \`_internal_controls_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_internal_controls_v_rels_users_id_idx\` ON \`_internal_controls_v_rels\` (\`users_id\`);`)
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
  await db.run(sql`CREATE TABLE \`biological_assets_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`biological_assets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`biological_assets_rels_order_idx\` ON \`biological_assets_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`biological_assets_rels_parent_idx\` ON \`biological_assets_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`biological_assets_rels_path_idx\` ON \`biological_assets_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`biological_assets_rels_users_id_idx\` ON \`biological_assets_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_biological_assets_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_biological_assets_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_biological_assets_v_rels_order_idx\` ON \`_biological_assets_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_biological_assets_v_rels_parent_idx\` ON \`_biological_assets_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_biological_assets_v_rels_path_idx\` ON \`_biological_assets_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_biological_assets_v_rels_users_id_idx\` ON \`_biological_assets_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`business_combinations_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`business_combinations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`business_combinations_rels_order_idx\` ON \`business_combinations_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`business_combinations_rels_parent_idx\` ON \`business_combinations_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`business_combinations_rels_path_idx\` ON \`business_combinations_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`business_combinations_rels_users_id_idx\` ON \`business_combinations_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_business_combinations_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_business_combinations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_business_combinations_v_rels_order_idx\` ON \`_business_combinations_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_business_combinations_v_rels_parent_idx\` ON \`_business_combinations_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_business_combinations_v_rels_path_idx\` ON \`_business_combinations_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_business_combinations_v_rels_users_id_idx\` ON \`_business_combinations_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`depreciation_schedules_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`depreciation_schedules\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`depreciation_schedules_rels_order_idx\` ON \`depreciation_schedules_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`depreciation_schedules_rels_parent_idx\` ON \`depreciation_schedules_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`depreciation_schedules_rels_path_idx\` ON \`depreciation_schedules_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`depreciation_schedules_rels_users_id_idx\` ON \`depreciation_schedules_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_depreciation_schedules_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_depreciation_schedules_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_depreciation_schedules_v_rels_order_idx\` ON \`_depreciation_schedules_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_depreciation_schedules_v_rels_parent_idx\` ON \`_depreciation_schedules_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_depreciation_schedules_v_rels_path_idx\` ON \`_depreciation_schedules_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_depreciation_schedules_v_rels_users_id_idx\` ON \`_depreciation_schedules_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`fixed_assets_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`fixed_assets_rels_order_idx\` ON \`fixed_assets_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`fixed_assets_rels_parent_idx\` ON \`fixed_assets_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`fixed_assets_rels_path_idx\` ON \`fixed_assets_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`fixed_assets_rels_users_id_idx\` ON \`fixed_assets_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_fixed_assets_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_fixed_assets_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_fixed_assets_v_rels_order_idx\` ON \`_fixed_assets_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_fixed_assets_v_rels_parent_idx\` ON \`_fixed_assets_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_fixed_assets_v_rels_path_idx\` ON \`_fixed_assets_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_fixed_assets_v_rels_users_id_idx\` ON \`_fixed_assets_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`insurance_contracts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`insurance_contracts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`insurance_contracts_rels_order_idx\` ON \`insurance_contracts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`insurance_contracts_rels_parent_idx\` ON \`insurance_contracts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`insurance_contracts_rels_path_idx\` ON \`insurance_contracts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`insurance_contracts_rels_users_id_idx\` ON \`insurance_contracts_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_insurance_contracts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_insurance_contracts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_insurance_contracts_v_rels_order_idx\` ON \`_insurance_contracts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_insurance_contracts_v_rels_parent_idx\` ON \`_insurance_contracts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_insurance_contracts_v_rels_path_idx\` ON \`_insurance_contracts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_insurance_contracts_v_rels_users_id_idx\` ON \`_insurance_contracts_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`investment_properties_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`investment_properties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`investment_properties_rels_order_idx\` ON \`investment_properties_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`investment_properties_rels_parent_idx\` ON \`investment_properties_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`investment_properties_rels_path_idx\` ON \`investment_properties_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`investment_properties_rels_users_id_idx\` ON \`investment_properties_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_investment_properties_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_investment_properties_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_investment_properties_v_rels_order_idx\` ON \`_investment_properties_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_investment_properties_v_rels_parent_idx\` ON \`_investment_properties_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_investment_properties_v_rels_path_idx\` ON \`_investment_properties_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_investment_properties_v_rels_users_id_idx\` ON \`_investment_properties_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`lease_period_postings_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`lease_period_postings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`lease_period_postings_rels_order_idx\` ON \`lease_period_postings_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_rels_parent_idx\` ON \`lease_period_postings_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_rels_path_idx\` ON \`lease_period_postings_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_rels_users_id_idx\` ON \`lease_period_postings_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_lease_period_postings_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_lease_period_postings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_lease_period_postings_v_rels_order_idx\` ON \`_lease_period_postings_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_lease_period_postings_v_rels_parent_idx\` ON \`_lease_period_postings_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_lease_period_postings_v_rels_path_idx\` ON \`_lease_period_postings_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_lease_period_postings_v_rels_users_id_idx\` ON \`_lease_period_postings_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`leases_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`leases\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`leases_rels_order_idx\` ON \`leases_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`leases_rels_parent_idx\` ON \`leases_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`leases_rels_path_idx\` ON \`leases_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`leases_rels_users_id_idx\` ON \`leases_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_leases_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_leases_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_leases_v_rels_order_idx\` ON \`_leases_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_leases_v_rels_parent_idx\` ON \`_leases_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_leases_v_rels_path_idx\` ON \`_leases_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_leases_v_rels_users_id_idx\` ON \`_leases_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`properties_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`properties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`properties_rels_order_idx\` ON \`properties_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`properties_rels_parent_idx\` ON \`properties_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`properties_rels_path_idx\` ON \`properties_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`properties_rels_users_id_idx\` ON \`properties_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_properties_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_properties_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_properties_v_rels_order_idx\` ON \`_properties_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_properties_v_rels_parent_idx\` ON \`_properties_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_properties_v_rels_path_idx\` ON \`_properties_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_properties_v_rels_users_id_idx\` ON \`_properties_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`spaces_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`spaces\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`spaces_rels_order_idx\` ON \`spaces_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`spaces_rels_parent_idx\` ON \`spaces_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`spaces_rels_path_idx\` ON \`spaces_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`spaces_rels_users_id_idx\` ON \`spaces_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_spaces_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_spaces_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_spaces_v_rels_order_idx\` ON \`_spaces_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_spaces_v_rels_parent_idx\` ON \`_spaces_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_spaces_v_rels_path_idx\` ON \`_spaces_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_spaces_v_rels_users_id_idx\` ON \`_spaces_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`budget_planning_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`budget_planning\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`budget_planning_rels_order_idx\` ON \`budget_planning_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_rels_parent_idx\` ON \`budget_planning_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_rels_path_idx\` ON \`budget_planning_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_rels_users_id_idx\` ON \`budget_planning_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_budget_planning_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_budget_planning_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_budget_planning_v_rels_order_idx\` ON \`_budget_planning_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_budget_planning_v_rels_parent_idx\` ON \`_budget_planning_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_budget_planning_v_rels_path_idx\` ON \`_budget_planning_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_budget_planning_v_rels_users_id_idx\` ON \`_budget_planning_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`performance_obligations_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`performance_obligations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`performance_obligations_rels_order_idx\` ON \`performance_obligations_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`performance_obligations_rels_parent_idx\` ON \`performance_obligations_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`performance_obligations_rels_path_idx\` ON \`performance_obligations_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`performance_obligations_rels_users_id_idx\` ON \`performance_obligations_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_performance_obligations_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_performance_obligations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_performance_obligations_v_rels_order_idx\` ON \`_performance_obligations_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_performance_obligations_v_rels_parent_idx\` ON \`_performance_obligations_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_performance_obligations_v_rels_path_idx\` ON \`_performance_obligations_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_performance_obligations_v_rels_users_id_idx\` ON \`_performance_obligations_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_rels_order_idx\` ON \`projects_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_parent_idx\` ON \`projects_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_path_idx\` ON \`projects_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_users_id_idx\` ON \`projects_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_projects_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_projects_v_rels_order_idx\` ON \`_projects_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_rels_parent_idx\` ON \`_projects_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_rels_path_idx\` ON \`_projects_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_projects_v_rels_users_id_idx\` ON \`_projects_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`recurring_journals_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`recurring_journals\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`recurring_journals_rels_order_idx\` ON \`recurring_journals_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`recurring_journals_rels_parent_idx\` ON \`recurring_journals_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`recurring_journals_rels_path_idx\` ON \`recurring_journals_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`recurring_journals_rels_users_id_idx\` ON \`recurring_journals_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_recurring_journals_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_recurring_journals_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_recurring_journals_v_rels_order_idx\` ON \`_recurring_journals_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_recurring_journals_v_rels_parent_idx\` ON \`_recurring_journals_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_recurring_journals_v_rels_path_idx\` ON \`_recurring_journals_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_recurring_journals_v_rels_users_id_idx\` ON \`_recurring_journals_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`workflow_definitions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`workflow_definitions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`workflow_definitions_rels_order_idx\` ON \`workflow_definitions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`workflow_definitions_rels_parent_idx\` ON \`workflow_definitions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`workflow_definitions_rels_path_idx\` ON \`workflow_definitions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`workflow_definitions_rels_users_id_idx\` ON \`workflow_definitions_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_workflow_definitions_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_workflow_definitions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_workflow_definitions_v_rels_order_idx\` ON \`_workflow_definitions_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_workflow_definitions_v_rels_parent_idx\` ON \`_workflow_definitions_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_workflow_definitions_v_rels_path_idx\` ON \`_workflow_definitions_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_workflow_definitions_v_rels_users_id_idx\` ON \`_workflow_definitions_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`workflow_instances_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`workflow_instances\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`workflow_instances_rels_order_idx\` ON \`workflow_instances_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`workflow_instances_rels_parent_idx\` ON \`workflow_instances_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`workflow_instances_rels_path_idx\` ON \`workflow_instances_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`workflow_instances_rels_users_id_idx\` ON \`workflow_instances_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_workflow_instances_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_workflow_instances_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_workflow_instances_v_rels_order_idx\` ON \`_workflow_instances_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_workflow_instances_v_rels_parent_idx\` ON \`_workflow_instances_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_workflow_instances_v_rels_path_idx\` ON \`_workflow_instances_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_workflow_instances_v_rels_users_id_idx\` ON \`_workflow_instances_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`contract_amendments_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`contract_amendments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contract_amendments_rels_order_idx\` ON \`contract_amendments_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`contract_amendments_rels_parent_idx\` ON \`contract_amendments_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_amendments_rels_path_idx\` ON \`contract_amendments_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`contract_amendments_rels_users_id_idx\` ON \`contract_amendments_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_contract_amendments_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_contract_amendments_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_contract_amendments_v_rels_order_idx\` ON \`_contract_amendments_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_contract_amendments_v_rels_parent_idx\` ON \`_contract_amendments_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_amendments_v_rels_path_idx\` ON \`_contract_amendments_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_contract_amendments_v_rels_users_id_idx\` ON \`_contract_amendments_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`contract_signatures_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`contract_signatures\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contract_signatures_rels_order_idx\` ON \`contract_signatures_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`contract_signatures_rels_parent_idx\` ON \`contract_signatures_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contract_signatures_rels_path_idx\` ON \`contract_signatures_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`contract_signatures_rels_users_id_idx\` ON \`contract_signatures_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_contract_signatures_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_contract_signatures_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_contract_signatures_v_rels_order_idx\` ON \`_contract_signatures_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_contract_signatures_v_rels_parent_idx\` ON \`_contract_signatures_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_contract_signatures_v_rels_path_idx\` ON \`_contract_signatures_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_contract_signatures_v_rels_users_id_idx\` ON \`_contract_signatures_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`chat_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`chat\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`chat_rels_order_idx\` ON \`chat_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`chat_rels_parent_idx\` ON \`chat_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`chat_rels_path_idx\` ON \`chat_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`chat_rels_users_id_idx\` ON \`chat_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_chat_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_chat_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_chat_v_rels_order_idx\` ON \`_chat_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_chat_v_rels_parent_idx\` ON \`_chat_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_chat_v_rels_path_idx\` ON \`_chat_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_chat_v_rels_users_id_idx\` ON \`_chat_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`connections_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`connections\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`connections_rels_order_idx\` ON \`connections_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`connections_rels_parent_idx\` ON \`connections_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`connections_rels_path_idx\` ON \`connections_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`connections_rels_users_id_idx\` ON \`connections_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_connections_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_connections_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_connections_v_rels_order_idx\` ON \`_connections_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_connections_v_rels_parent_idx\` ON \`_connections_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_connections_v_rels_path_idx\` ON \`_connections_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_connections_v_rels_users_id_idx\` ON \`_connections_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`api_audit_events_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`api_audit_events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`api_audit_events_rels_order_idx\` ON \`api_audit_events_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`api_audit_events_rels_parent_idx\` ON \`api_audit_events_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`api_audit_events_rels_path_idx\` ON \`api_audit_events_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`api_audit_events_rels_users_id_idx\` ON \`api_audit_events_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_api_audit_events_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_api_audit_events_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_api_audit_events_v_rels_order_idx\` ON \`_api_audit_events_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_api_audit_events_v_rels_parent_idx\` ON \`_api_audit_events_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_api_audit_events_v_rels_path_idx\` ON \`_api_audit_events_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_api_audit_events_v_rels_users_id_idx\` ON \`_api_audit_events_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`audit_events_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`audit_events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`audit_events_rels_order_idx\` ON \`audit_events_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`audit_events_rels_parent_idx\` ON \`audit_events_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_events_rels_path_idx\` ON \`audit_events_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`audit_events_rels_users_id_idx\` ON \`audit_events_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`audit_submissions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`audit_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`audit_submissions_rels_order_idx\` ON \`audit_submissions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`audit_submissions_rels_parent_idx\` ON \`audit_submissions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_submissions_rels_path_idx\` ON \`audit_submissions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`audit_submissions_rels_users_id_idx\` ON \`audit_submissions_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_audit_submissions_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_audit_submissions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_audit_submissions_v_rels_order_idx\` ON \`_audit_submissions_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_audit_submissions_v_rels_parent_idx\` ON \`_audit_submissions_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_audit_submissions_v_rels_path_idx\` ON \`_audit_submissions_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_audit_submissions_v_rels_users_id_idx\` ON \`_audit_submissions_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`data_processing_activities_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`data_processing_activities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`data_processing_activities_rels_order_idx\` ON \`data_processing_activities_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_rels_parent_idx\` ON \`data_processing_activities_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_rels_path_idx\` ON \`data_processing_activities_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_rels_users_id_idx\` ON \`data_processing_activities_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_data_processing_activities_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_data_processing_activities_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_data_processing_activities_v_rels_order_idx\` ON \`_data_processing_activities_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_data_processing_activities_v_rels_parent_idx\` ON \`_data_processing_activities_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_data_processing_activities_v_rels_path_idx\` ON \`_data_processing_activities_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_data_processing_activities_v_rels_users_id_idx\` ON \`_data_processing_activities_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`data_subject_requests_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`data_subject_requests\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`data_subject_requests_rels_order_idx\` ON \`data_subject_requests_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`data_subject_requests_rels_parent_idx\` ON \`data_subject_requests_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`data_subject_requests_rels_path_idx\` ON \`data_subject_requests_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`data_subject_requests_rels_users_id_idx\` ON \`data_subject_requests_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_data_subject_requests_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_data_subject_requests_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_data_subject_requests_v_rels_order_idx\` ON \`_data_subject_requests_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_data_subject_requests_v_rels_parent_idx\` ON \`_data_subject_requests_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_data_subject_requests_v_rels_path_idx\` ON \`_data_subject_requests_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_data_subject_requests_v_rels_users_id_idx\` ON \`_data_subject_requests_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`memories_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`memories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`memories_rels_order_idx\` ON \`memories_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`memories_rels_parent_idx\` ON \`memories_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`memories_rels_path_idx\` ON \`memories_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`memories_rels_users_id_idx\` ON \`memories_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_memories_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_memories_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_memories_v_rels_order_idx\` ON \`_memories_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_memories_v_rels_parent_idx\` ON \`_memories_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_memories_v_rels_path_idx\` ON \`_memories_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_memories_v_rels_users_id_idx\` ON \`_memories_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`mineral_resource_assets_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`mineral_resource_assets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`mineral_resource_assets_rels_order_idx\` ON \`mineral_resource_assets_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`mineral_resource_assets_rels_parent_idx\` ON \`mineral_resource_assets_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`mineral_resource_assets_rels_path_idx\` ON \`mineral_resource_assets_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`mineral_resource_assets_rels_users_id_idx\` ON \`mineral_resource_assets_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_mineral_resource_assets_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_mineral_resource_assets_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_mineral_resource_assets_v_rels_order_idx\` ON \`_mineral_resource_assets_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_mineral_resource_assets_v_rels_parent_idx\` ON \`_mineral_resource_assets_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_mineral_resource_assets_v_rels_path_idx\` ON \`_mineral_resource_assets_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_mineral_resource_assets_v_rels_users_id_idx\` ON \`_mineral_resource_assets_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`regulatory_deferral_accounts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`regulatory_deferral_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`regulatory_deferral_accounts_rels_order_idx\` ON \`regulatory_deferral_accounts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_deferral_accounts_rels_parent_idx\` ON \`regulatory_deferral_accounts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_deferral_accounts_rels_path_idx\` ON \`regulatory_deferral_accounts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_deferral_accounts_rels_users_id_idx\` ON \`regulatory_deferral_accounts_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_regulatory_deferral_accounts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_regulatory_deferral_accounts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_regulatory_deferral_accounts_v_rels_order_idx\` ON \`_regulatory_deferral_accounts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_deferral_accounts_v_rels_parent_idx\` ON \`_regulatory_deferral_accounts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_deferral_accounts_v_rels_path_idx\` ON \`_regulatory_deferral_accounts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_deferral_accounts_v_rels_users_id_idx\` ON \`_regulatory_deferral_accounts_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`rounding_adjustments_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`rounding_adjustments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`rounding_adjustments_rels_order_idx\` ON \`rounding_adjustments_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`rounding_adjustments_rels_parent_idx\` ON \`rounding_adjustments_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`rounding_adjustments_rels_path_idx\` ON \`rounding_adjustments_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`rounding_adjustments_rels_users_id_idx\` ON \`rounding_adjustments_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_rounding_adjustments_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_rounding_adjustments_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_rounding_adjustments_v_rels_order_idx\` ON \`_rounding_adjustments_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_rounding_adjustments_v_rels_parent_idx\` ON \`_rounding_adjustments_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_rounding_adjustments_v_rels_path_idx\` ON \`_rounding_adjustments_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_rounding_adjustments_v_rels_users_id_idx\` ON \`_rounding_adjustments_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`sectors_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`sectors\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`sectors_rels_order_idx\` ON \`sectors_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`sectors_rels_parent_idx\` ON \`sectors_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`sectors_rels_path_idx\` ON \`sectors_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`sectors_rels_users_id_idx\` ON \`sectors_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_sectors_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_sectors_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_sectors_v_rels_order_idx\` ON \`_sectors_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_sectors_v_rels_parent_idx\` ON \`_sectors_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_sectors_v_rels_path_idx\` ON \`_sectors_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_sectors_v_rels_users_id_idx\` ON \`_sectors_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`shares_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`shares\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`shares_rels_order_idx\` ON \`shares_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`shares_rels_parent_idx\` ON \`shares_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`shares_rels_path_idx\` ON \`shares_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`shares_rels_users_id_idx\` ON \`shares_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_shares_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_shares_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_shares_v_rels_order_idx\` ON \`_shares_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_shares_v_rels_parent_idx\` ON \`_shares_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_shares_v_rels_path_idx\` ON \`_shares_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_shares_v_rels_users_id_idx\` ON \`_shares_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`taggings_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`taggings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`taggings_rels_order_idx\` ON \`taggings_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`taggings_rels_parent_idx\` ON \`taggings_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`taggings_rels_path_idx\` ON \`taggings_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`taggings_rels_users_id_idx\` ON \`taggings_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_taggings_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_taggings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_taggings_v_rels_order_idx\` ON \`_taggings_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_taggings_v_rels_parent_idx\` ON \`_taggings_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_taggings_v_rels_path_idx\` ON \`_taggings_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_taggings_v_rels_users_id_idx\` ON \`_taggings_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`tags_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tags_rels_order_idx\` ON \`tags_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`tags_rels_parent_idx\` ON \`tags_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tags_rels_path_idx\` ON \`tags_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`tags_rels_users_id_idx\` ON \`tags_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_tags_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_tags_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_tags_v_rels_order_idx\` ON \`_tags_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_tags_v_rels_parent_idx\` ON \`_tags_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_tags_v_rels_path_idx\` ON \`_tags_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_tags_v_rels_users_id_idx\` ON \`_tags_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`transaction_failures_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`transaction_failures\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`transaction_failures_rels_order_idx\` ON \`transaction_failures_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`transaction_failures_rels_parent_idx\` ON \`transaction_failures_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`transaction_failures_rels_path_idx\` ON \`transaction_failures_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`transaction_failures_rels_users_id_idx\` ON \`transaction_failures_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_transaction_failures_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_transaction_failures_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_transaction_failures_v_rels_order_idx\` ON \`_transaction_failures_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_transaction_failures_v_rels_parent_idx\` ON \`_transaction_failures_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_transaction_failures_v_rels_path_idx\` ON \`_transaction_failures_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_transaction_failures_v_rels_users_id_idx\` ON \`_transaction_failures_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`translations_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`translations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`translations_rels_order_idx\` ON \`translations_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`translations_rels_parent_idx\` ON \`translations_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`translations_rels_path_idx\` ON \`translations_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`translations_rels_users_id_idx\` ON \`translations_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_translations_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_translations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_translations_v_rels_order_idx\` ON \`_translations_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_translations_v_rels_parent_idx\` ON \`_translations_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_translations_v_rels_path_idx\` ON \`_translations_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_translations_v_rels_users_id_idx\` ON \`_translations_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_rels_order_idx\` ON \`forms_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`forms_rels_parent_idx\` ON \`forms_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_rels_path_idx\` ON \`forms_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`forms_rels_users_id_idx\` ON \`forms_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_forms_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_forms_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_forms_v_rels_order_idx\` ON \`_forms_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_rels_parent_idx\` ON \`_forms_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_rels_path_idx\` ON \`_forms_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_forms_v_rels_users_id_idx\` ON \`_forms_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`exports_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`exports\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`exports_rels_order_idx\` ON \`exports_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`exports_rels_parent_idx\` ON \`exports_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`exports_rels_path_idx\` ON \`exports_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`exports_rels_users_id_idx\` ON \`exports_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_exports_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_exports_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_exports_v_rels_order_idx\` ON \`_exports_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_exports_v_rels_parent_idx\` ON \`_exports_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_exports_v_rels_path_idx\` ON \`_exports_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_exports_v_rels_users_id_idx\` ON \`_exports_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`imports_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`imports\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`imports_rels_order_idx\` ON \`imports_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`imports_rels_parent_idx\` ON \`imports_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`imports_rels_path_idx\` ON \`imports_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`imports_rels_users_id_idx\` ON \`imports_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_imports_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_imports_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_imports_v_rels_order_idx\` ON \`_imports_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_imports_v_rels_parent_idx\` ON \`_imports_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_imports_v_rels_path_idx\` ON \`_imports_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_imports_v_rels_users_id_idx\` ON \`_imports_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_llm_instructions\` (
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`entity_slug\` text NOT NULL,
  	\`entity_type\` text NOT NULL,
  	\`additional_instructions\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_entity_slug_idx\` ON \`payload_llm_instructions\` (\`entity_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_updated_at_idx\` ON \`payload_llm_instructions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_created_at_idx\` ON \`payload_llm_instructions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_llm_instructions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_llm_instructions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_rels_order_idx\` ON \`payload_llm_instructions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_rels_parent_idx\` ON \`payload_llm_instructions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_rels_path_idx\` ON \`payload_llm_instructions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_llm_instructions_rels_users_id_idx\` ON \`payload_llm_instructions_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_header_v_version_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_header_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_header_v_version_nav_items_order_idx\` ON \`_header_v_version_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_header_v_version_nav_items_parent_id_idx\` ON \`_header_v_version_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_header_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_header_v_created_at_idx\` ON \`_header_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_header_v_updated_at_idx\` ON \`_header_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_header_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_header_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_header_v_rels_order_idx\` ON \`_header_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_header_v_rels_parent_idx\` ON \`_header_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_header_v_rels_path_idx\` ON \`_header_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_header_v_rels_pages_id_idx\` ON \`_header_v_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`_header_v_rels_posts_id_idx\` ON \`_header_v_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`_header_v_rels_users_id_idx\` ON \`_header_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v_version_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_footer_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_version_nav_items_order_idx\` ON \`_footer_v_version_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_version_nav_items_parent_id_idx\` ON \`_footer_v_version_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_created_at_idx\` ON \`_footer_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_updated_at_idx\` ON \`_footer_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_footer_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_footer_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_footer_v_rels_order_idx\` ON \`_footer_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_rels_parent_idx\` ON \`_footer_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_rels_path_idx\` ON \`_footer_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_rels_pages_id_idx\` ON \`_footer_v_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_rels_posts_id_idx\` ON \`_footer_v_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`_footer_v_rels_users_id_idx\` ON \`_footer_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`providers_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`providers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`providers_rels_order_idx\` ON \`providers_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`providers_rels_parent_idx\` ON \`providers_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`providers_rels_path_idx\` ON \`providers_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`providers_rels_users_id_idx\` ON \`providers_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_providers_v_version_providers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`provider\` text NOT NULL,
  	\`enabled\` integer DEFAULT true,
  	\`client_id\` text,
  	\`client_secret\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_providers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_providers_v_version_providers_order_idx\` ON \`_providers_v_version_providers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_providers_v_version_providers_parent_id_idx\` ON \`_providers_v_version_providers\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_providers_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_providers_v_created_at_idx\` ON \`_providers_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_providers_v_updated_at_idx\` ON \`_providers_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_providers_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_providers_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_providers_v_rels_order_idx\` ON \`_providers_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_providers_v_rels_parent_idx\` ON \`_providers_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_providers_v_rels_path_idx\` ON \`_providers_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_providers_v_rels_users_id_idx\` ON \`_providers_v_rels\` (\`users_id\`);`)
  await db.run(sql`DROP TABLE \`payload_mcp_api_keys\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`addresses_id\` text(36),
  	\`variants_id\` text(36),
  	\`variant_types_id\` text(36),
  	\`variant_options_id\` text(36),
  	\`products_id\` text(36),
  	\`carts_id\` text(36),
  	\`orders_id\` text(36),
  	\`transactions_id\` text(36),
  	\`forms_id\` text(36),
  	\`form_submissions_id\` text(36),
  	\`redirects_id\` text(36),
  	\`search_id\` text(36),
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`addresses_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`variants_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`variant_types_id\`) REFERENCES \`variant_types\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`variant_options_id\`) REFERENCES \`variant_options\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`carts_id\`) REFERENCES \`carts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`orders_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`transactions_id\`) REFERENCES \`transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`form_submissions_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`redirects_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`search_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "addresses_id", "variants_id", "variant_types_id", "variant_options_id", "products_id", "carts_id", "orders_id", "transactions_id", "forms_id", "form_submissions_id", "redirects_id", "search_id", "users_id") SELECT "id", "order", "parent_id", "path", "addresses_id", "variants_id", "variant_types_id", "variant_options_id", "products_id", "carts_id", "orders_id", "transactions_id", "forms_id", "form_submissions_id", "redirects_id", "search_id", "users_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_addresses_id_idx\` ON \`payload_locked_documents_rels\` (\`addresses_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_variants_id_idx\` ON \`payload_locked_documents_rels\` (\`variants_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_variant_types_id_idx\` ON \`payload_locked_documents_rels\` (\`variant_types_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_variant_options_id_idx\` ON \`payload_locked_documents_rels\` (\`variant_options_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_products_id_idx\` ON \`payload_locked_documents_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_carts_id_idx\` ON \`payload_locked_documents_rels\` (\`carts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_orders_id_idx\` ON \`payload_locked_documents_rels\` (\`orders_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_transactions_id_idx\` ON \`payload_locked_documents_rels\` (\`transactions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_forms_id_idx\` ON \`payload_locked_documents_rels\` (\`forms_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_form_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`form_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_redirects_id_idx\` ON \`payload_locked_documents_rels\` (\`redirects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_search_id_idx\` ON \`payload_locked_documents_rels\` (\`search_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_preferences_rels\`("id", "order", "parent_id", "path", "users_id") SELECT "id", "order", "parent_id", "path", "users_id" FROM \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_preferences_rels\` RENAME TO \`payload_preferences_rels\`;`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`DROP INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\`;`)
  await db.run(sql`DROP INDEX \`media_sizes_square_sizes_square_filename_idx\`;`)
  await db.run(sql`DROP INDEX \`media_sizes_small_sizes_small_filename_idx\`;`)
  await db.run(sql`DROP INDEX \`media_sizes_medium_sizes_medium_filename_idx\`;`)
  await db.run(sql`DROP INDEX \`media_sizes_large_sizes_large_filename_idx\`;`)
  await db.run(sql`DROP INDEX \`media_sizes_xlarge_sizes_xlarge_filename_idx\`;`)
  await db.run(sql`DROP INDEX \`media_sizes_og_sizes_og_filename_idx\`;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`prefix\` text DEFAULT '';`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`_objectkey\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`_stored\` integer;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`_transforms\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_filename\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_url\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original_prefix\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original__objectkey\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`original__stored\` integer;`)
  await db.run(sql`CREATE INDEX \`media_original_original_filename_idx\` ON \`media\` (\`original_filename\`);`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`focal_x\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`focal_y\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_thumbnail_url\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_thumbnail_width\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_thumbnail_height\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_thumbnail_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_thumbnail_filesize\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_thumbnail_filename\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_square_url\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_square_width\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_square_height\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_square_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_square_filesize\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_square_filename\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_small_url\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_small_width\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_small_height\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_small_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_small_filesize\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_small_filename\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_medium_url\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_medium_width\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_medium_height\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_medium_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_medium_filesize\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_medium_filename\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_large_url\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_large_width\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_large_height\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_large_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_large_filesize\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_large_filename\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_xlarge_url\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_xlarge_width\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_xlarge_height\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_xlarge_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_xlarge_filesize\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_xlarge_filename\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_og_url\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_og_width\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_og_height\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_og_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_og_filesize\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`sizes_og_filename\`;`)
  await db.run(sql`DROP INDEX \`_media_v_version_sizes_thumbnail_version_sizes_thumbnail_idx\`;`)
  await db.run(sql`DROP INDEX \`_media_v_version_sizes_square_version_sizes_square_filen_idx\`;`)
  await db.run(sql`DROP INDEX \`_media_v_version_sizes_small_version_sizes_small_filenam_idx\`;`)
  await db.run(sql`DROP INDEX \`_media_v_version_sizes_medium_version_sizes_medium_filen_idx\`;`)
  await db.run(sql`DROP INDEX \`_media_v_version_sizes_large_version_sizes_large_filenam_idx\`;`)
  await db.run(sql`DROP INDEX \`_media_v_version_sizes_xlarge_version_sizes_xlarge_filen_idx\`;`)
  await db.run(sql`DROP INDEX \`_media_v_version_sizes_og_version_sizes_og_filename_idx\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_prefix\` text DEFAULT '';`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version__objectkey\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version__stored\` integer;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version__transforms\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_original_filename\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_original_url\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_original_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_original_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_original_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_original_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_original_prefix\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_original__objectkey\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_original__stored\` integer;`)
  await db.run(sql`CREATE INDEX \`_media_v_version_original_version_original_filename_idx\` ON \`_media_v\` (\`version_original_filename\`);`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_focal_x\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_focal_y\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_thumbnail_url\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_thumbnail_width\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_thumbnail_height\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_thumbnail_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_thumbnail_filesize\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_thumbnail_filename\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_square_url\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_square_width\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_square_height\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_square_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_square_filesize\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_square_filename\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_small_url\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_small_width\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_small_height\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_small_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_small_filesize\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_small_filename\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_medium_url\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_medium_width\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_medium_height\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_medium_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_medium_filesize\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_medium_filename\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_large_url\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_large_width\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_large_height\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_large_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_large_filesize\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_large_filename\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_xlarge_url\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_xlarge_width\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_xlarge_height\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_xlarge_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_xlarge_filesize\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_xlarge_filename\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_og_url\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_og_width\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_og_height\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_og_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_og_filesize\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_sizes_og_filename\`;`)
  await db.run(sql`DROP INDEX \`pages__status_idx\`;`)
  await db.run(sql`DROP INDEX \`pages_slug_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_slug_1_idx\` ON \`pages\` (\`tenant_id\`,\`slug\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`generate_slug\`;`)
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`pages_locales_locale_parent_id_unique\`;`)
  await db.run(sql`ALTER TABLE \`pages_locales\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages_locales\` (\`_status\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_locales_parent_id_locale_unique\` ON \`pages_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_pages_v_version_version__status_idx\`;`)
  await db.run(sql`DROP INDEX \`_pages_v_snapshot_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_slug_1_idx\` ON \`_pages_v\` (\`version_tenant_id\`,\`version_slug\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`version_generate_slug\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`version__status\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`snapshot\`;`)
  await db.run(sql`DROP INDEX \`_pages_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v_locales\` ADD \`version__status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v_locales\` (\`version__status\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_locales_parent_id_locale_unique\` ON \`_pages_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`posts__status_idx\`;`)
  await db.run(sql`DROP INDEX \`posts_slug_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_slug_2_idx\` ON \`posts\` (\`tenant_id\`,\`slug\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`generate_slug\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`posts_locales_locale_parent_id_unique\`;`)
  await db.run(sql`ALTER TABLE \`posts_locales\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts_locales\` (\`_status\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_locales_parent_id_locale_unique\` ON \`posts_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_posts_v_version_version__status_idx\`;`)
  await db.run(sql`DROP INDEX \`_posts_v_snapshot_idx\`;`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_slug_2_idx\` ON \`_posts_v\` (\`version_tenant_id\`,\`version_slug\`);`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_generate_slug\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version__status\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`snapshot\`;`)
  await db.run(sql`DROP INDEX \`_posts_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v_locales\` ADD \`version__status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version__status_idx\` ON \`_posts_v_locales\` (\`version__status\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_locales_parent_id_locale_unique\` ON \`_posts_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`activities_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`activities_locales_parent_id_locale_unique\` ON \`activities_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_activities_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_activities_v_locales_parent_id_locale_unique\` ON \`_activities_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`bookings_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`bookings_locales_parent_id_locale_unique\` ON \`bookings_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_bookings_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_bookings_v_locales_parent_id_locale_unique\` ON \`_bookings_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`customer_segments_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`customer_segments_locales_parent_id_locale_unique\` ON \`customer_segments_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_customer_segments_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_customer_segments_v_locales_parent_id_locale_unique\` ON \`_customer_segments_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`dunning_cycles_history_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`dunning_cycles_history_locales_parent_id_locale_unique\` ON \`dunning_cycles_history_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_dunning_cycles_v_version_history_locales_locale_parent_id_u\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_dunning_cycles_v_version_history_locales_parent_id_locale_u\` ON \`_dunning_cycles_v_version_history_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`goods_receipts_lines_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`goods_receipts_lines_locales_parent_id_locale_unique\` ON \`goods_receipts_lines_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_goods_receipts_v_version_lines_locales_locale_parent_id_uni\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_goods_receipts_v_version_lines_locales_parent_id_locale_uni\` ON \`_goods_receipts_v_version_lines_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`opportunities_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`opportunities_locales_parent_id_locale_unique\` ON \`opportunities_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_opportunities_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_opportunities_v_locales_parent_id_locale_unique\` ON \`_opportunities_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`project_milestones_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`project_milestones_locales_parent_id_locale_unique\` ON \`project_milestones_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_project_milestones_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_project_milestones_v_locales_parent_id_locale_unique\` ON \`_project_milestones_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`account_reconciliations_external_adjus_79d3f9d1_locales_loca\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`account_reconciliations_external_adjus_79d3f9d1_locales_pare\` ON \`account_reconciliations_external_adjus_79d3f9d1_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`account_reconciliations_gl_adjustments_locales_locale_parent\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`account_reconciliations_gl_adjustments_locales_parent_id_loc\` ON \`account_reconciliations_gl_adjustments_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`account_reconciliations_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`account_reconciliations_locales_parent_id_locale_unique\` ON \`account_reconciliations_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_account_reconciliations_external_adjus_79d3f9d1_v_locales_l\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_account_reconciliations_external_adjus_79d3f9d1_v_locales_p\` ON \`_account_reconciliations_external_adjus_79d3f9d1_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_account_reconciliations_v_version_gl_adjustments_locales_lo\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_account_reconciliations_v_version_gl_adjustments_locales_pa\` ON \`_account_reconciliations_v_version_gl_adjustments_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_account_reconciliations_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_account_reconciliations_v_locales_parent_id_locale_unique\` ON \`_account_reconciliations_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`bank_reconciliations_reconciling_items_locales_locale_parent\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`bank_reconciliations_reconciling_items_locales_parent_id_loc\` ON \`bank_reconciliations_reconciling_items_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_bank_reconciliations_v_version_reconciling_items_locales_lo\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_bank_reconciliations_v_version_reconciling_items_locales_pa\` ON \`_bank_reconciliations_v_version_reconciling_items_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`bank_statements_transactions_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`bank_statements_transactions_locales_parent_id_locale_unique\` ON \`bank_statements_transactions_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_bank_statements_v_version_transactions_locales_locale_paren\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_bank_statements_v_version_transactions_locales_parent_id_lo\` ON \`_bank_statements_v_version_transactions_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`bookable_resources_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`bookable_resources_locales_parent_id_locale_unique\` ON \`bookable_resources_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_bookable_resources_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_bookable_resources_v_locales_parent_id_locale_unique\` ON \`_bookable_resources_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`gl_accounts_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`gl_accounts_locales_parent_id_locale_unique\` ON \`gl_accounts_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_gl_accounts_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_gl_accounts_v_locales_parent_id_locale_unique\` ON \`_gl_accounts_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`journal_entries_lines_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`journal_entries_lines_locales_parent_id_locale_unique\` ON \`journal_entries_lines_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`journal_entries_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`journal_entries_locales_parent_id_locale_unique\` ON \`journal_entries_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_journal_entries_v_version_lines_locales_locale_parent_id_un\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_journal_entries_v_version_lines_locales_parent_id_locale_un\` ON \`_journal_entries_v_version_lines_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_journal_entries_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_journal_entries_v_locales_parent_id_locale_unique\` ON \`_journal_entries_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`period_end_adjustments_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`period_end_adjustments_locales_parent_id_locale_unique\` ON \`period_end_adjustments_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_period_end_adjustments_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_period_end_adjustments_v_locales_parent_id_locale_unique\` ON \`_period_end_adjustments_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`post_balance_sheet_events_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`post_balance_sheet_events_locales_parent_id_locale_unique\` ON \`post_balance_sheet_events_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_post_balance_sheet_events_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_post_balance_sheet_events_v_locales_parent_id_locale_unique\` ON \`_post_balance_sheet_events_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`cost_centers_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`cost_centers_locales_parent_id_locale_unique\` ON \`cost_centers_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_cost_centers_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_cost_centers_v_locales_parent_id_locale_unique\` ON \`_cost_centers_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`er_lines_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`er_lines_locales_parent_id_locale_unique\` ON \`er_lines_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`er_approval_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`er_approval_locales_parent_id_locale_unique\` ON \`er_approval_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_er_lines_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_er_lines_v_locales_parent_id_locale_unique\` ON \`_er_lines_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_er_approval_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_er_approval_v_locales_parent_id_locale_unique\` ON \`_er_approval_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`leave_requests_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`leave_requests_locales_parent_id_locale_unique\` ON \`leave_requests_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_leave_requests_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_leave_requests_v_locales_parent_id_locale_unique\` ON \`_leave_requests_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`maintenance_work_orders_photos_locales_locale_parent_id_uniq\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`maintenance_work_orders_photos_locales_parent_id_locale_uniq\` ON \`maintenance_work_orders_photos_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`mwo_parts_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`mwo_parts_locales_parent_id_locale_unique\` ON \`mwo_parts_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`maintenance_work_orders_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`maintenance_work_orders_locales_parent_id_locale_unique\` ON \`maintenance_work_orders_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_maintenance_work_orders_v_version_photos_locales_locale_par\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_maintenance_work_orders_v_version_photos_locales_parent_id_\` ON \`_maintenance_work_orders_v_version_photos_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_mwo_parts_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_mwo_parts_v_locales_parent_id_locale_unique\` ON \`_mwo_parts_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_maintenance_work_orders_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_maintenance_work_orders_v_locales_parent_id_locale_unique\` ON \`_maintenance_work_orders_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`pr_comp_rating_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`pr_comp_rating_locales_parent_id_locale_unique\` ON \`pr_comp_rating_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_pr_comp_rating_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_pr_comp_rating_v_locales_parent_id_locale_unique\` ON \`_pr_comp_rating_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`bills_of_materials_operations_locales_locale_parent_id_uniqu\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`bills_of_materials_operations_locales_parent_id_locale_uniqu\` ON \`bills_of_materials_operations_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_bills_of_materials_v_version_operations_locales_locale_pare\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_bills_of_materials_v_version_operations_locales_parent_id_l\` ON \`_bills_of_materials_v_version_operations_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`carriers_service_levels_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`carriers_service_levels_locales_parent_id_locale_unique\` ON \`carriers_service_levels_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_carriers_v_version_service_levels_locales_locale_parent_id_\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_carriers_v_version_service_levels_locales_parent_id_locale_\` ON \`_carriers_v_version_service_levels_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`warehouse_locations_bins_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`warehouse_locations_bins_locales_parent_id_locale_unique\` ON \`warehouse_locations_bins_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`warehouse_locations_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`warehouse_locations_locales_parent_id_locale_unique\` ON \`warehouse_locations_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_warehouse_locations_v_version_bins_locales_locale_parent_id\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_warehouse_locations_v_version_bins_locales_parent_id_locale\` ON \`_warehouse_locations_v_version_bins_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_warehouse_locations_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_warehouse_locations_v_locales_parent_id_locale_unique\` ON \`_warehouse_locations_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`bc_ppa_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`bc_ppa_locales_parent_id_locale_unique\` ON \`bc_ppa_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_bc_ppa_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_bc_ppa_v_locales_parent_id_locale_unique\` ON \`_bc_ppa_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`fixed_assets_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`fixed_assets_locales_parent_id_locale_unique\` ON \`fixed_assets_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_fixed_assets_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_fixed_assets_v_locales_parent_id_locale_unique\` ON \`_fixed_assets_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`leases_modifications_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`leases_modifications_locales_parent_id_locale_unique\` ON \`leases_modifications_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_leases_v_version_modifications_locales_locale_parent_id_uni\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_leases_v_version_modifications_locales_parent_id_locale_uni\` ON \`_leases_v_version_modifications_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`properties_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`properties_locales_parent_id_locale_unique\` ON \`properties_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_properties_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_properties_v_locales_parent_id_locale_unique\` ON \`_properties_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`spaces_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`spaces_locales_parent_id_locale_unique\` ON \`spaces_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_spaces_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_spaces_v_locales_parent_id_locale_unique\` ON \`_spaces_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`budget_planning_budget_line_items_locales_locale_parent_id_u\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`budget_planning_budget_line_items_locales_parent_id_locale_u\` ON \`budget_planning_budget_line_items_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_budget_planning_v_version_budget_line_items_locales_locale_\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_budget_planning_v_version_budget_line_items_locales_parent_\` ON \`_budget_planning_v_version_budget_line_items_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`contracts_modifications_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`contracts_modifications_locales_parent_id_locale_unique\` ON \`contracts_modifications_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`contracts_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`contracts_locales_parent_id_locale_unique\` ON \`contracts_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_contracts_v_version_modifications_locales_locale_parent_id_\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_contracts_v_version_modifications_locales_parent_id_locale_\` ON \`_contracts_v_version_modifications_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_contracts_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_contracts_v_locales_parent_id_locale_unique\` ON \`_contracts_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`performance_obligations_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`performance_obligations_locales_parent_id_locale_unique\` ON \`performance_obligations_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_performance_obligations_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_performance_obligations_v_locales_parent_id_locale_unique\` ON \`_performance_obligations_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`project_tasks_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`project_tasks_locales_parent_id_locale_unique\` ON \`project_tasks_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_project_tasks_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_project_tasks_v_locales_parent_id_locale_unique\` ON \`_project_tasks_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`projects_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_locales_parent_id_locale_unique\` ON \`projects_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_projects_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_projects_v_locales_parent_id_locale_unique\` ON \`_projects_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`recurring_journals_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`recurring_journals_locales_parent_id_locale_unique\` ON \`recurring_journals_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_recurring_journals_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_recurring_journals_v_locales_parent_id_locale_unique\` ON \`_recurring_journals_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`wf_steps_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`wf_steps_locales_parent_id_locale_unique\` ON \`wf_steps_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`workflow_definitions_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`workflow_definitions_locales_parent_id_locale_unique\` ON \`workflow_definitions_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_wf_steps_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_wf_steps_v_locales_parent_id_locale_unique\` ON \`_wf_steps_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_workflow_definitions_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_workflow_definitions_v_locales_parent_id_locale_unique\` ON \`_workflow_definitions_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`wfi_history_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`wfi_history_locales_parent_id_locale_unique\` ON \`wfi_history_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_wfi_history_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_wfi_history_v_locales_parent_id_locale_unique\` ON \`_wfi_history_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`data_processing_activities_recipient_c_d5b0fb68_locales_loca\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`data_processing_activities_recipient_c_d5b0fb68_locales_pare\` ON \`data_processing_activities_recipient_c_d5b0fb68_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_data_processing_activities_recipient_c_d5b0fb68_v_locales_l\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_data_processing_activities_recipient_c_d5b0fb68_v_locales_p\` ON \`_data_processing_activities_recipient_c_d5b0fb68_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`data_subject_requests_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`data_subject_requests_locales_parent_id_locale_unique\` ON \`data_subject_requests_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_data_subject_requests_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_data_subject_requests_v_locales_parent_id_locale_unique\` ON \`_data_subject_requests_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`standards_conflicts_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`standards_conflicts_locales_parent_id_locale_unique\` ON \`standards_conflicts_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_standards_v_version_conflicts_locales_locale_parent_id_uniq\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_standards_v_version_conflicts_locales_parent_id_locale_uniq\` ON \`_standards_v_version_conflicts_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`translations_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`translations_locales_parent_id_locale_unique\` ON \`translations_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_translations_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_translations_v_locales_parent_id_locale_unique\` ON \`_translations_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_variants_v_snapshot_idx\`;`)
  await db.run(sql`ALTER TABLE \`_variants_v\` DROP COLUMN \`snapshot\`;`)
  await db.run(sql`DROP INDEX \`products__status_idx\`;`)
  await db.run(sql`ALTER TABLE \`products\` DROP COLUMN \`generate_slug\`;`)
  await db.run(sql`ALTER TABLE \`products\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`products_locales_locale_parent_id_unique\`;`)
  await db.run(sql`ALTER TABLE \`products_locales\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`products__status_idx\` ON \`products_locales\` (\`_status\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`products_locales_parent_id_locale_unique\` ON \`products_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_products_v_version_version__status_idx\`;`)
  await db.run(sql`DROP INDEX \`_products_v_snapshot_idx\`;`)
  await db.run(sql`ALTER TABLE \`_products_v\` DROP COLUMN \`version_generate_slug\`;`)
  await db.run(sql`ALTER TABLE \`_products_v\` DROP COLUMN \`version__status\`;`)
  await db.run(sql`ALTER TABLE \`_products_v\` DROP COLUMN \`snapshot\`;`)
  await db.run(sql`DROP INDEX \`_products_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`ALTER TABLE \`_products_v_locales\` ADD \`version__status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version__status_idx\` ON \`_products_v_locales\` (\`version__status\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_products_v_locales_parent_id_locale_unique\` ON \`_products_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`orders_lines_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_lines_locales_parent_id_locale_unique\` ON \`orders_lines_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`orders_approval_chain_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_approval_chain_locales_parent_id_locale_unique\` ON \`orders_approval_chain_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`orders_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_locales_parent_id_locale_unique\` ON \`orders_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_orders_v_version_lines_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_orders_v_version_lines_locales_parent_id_locale_unique\` ON \`_orders_v_version_lines_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_orders_v_version_approval_chain_locales_locale_parent_id_un\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_orders_v_version_approval_chain_locales_parent_id_locale_un\` ON \`_orders_v_version_approval_chain_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_orders_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_orders_v_locales_parent_id_locale_unique\` ON \`_orders_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`forms_blocks_checkbox_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_checkbox_locales_parent_id_locale_unique\` ON \`forms_blocks_checkbox_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`forms_blocks_country_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_country_locales_parent_id_locale_unique\` ON \`forms_blocks_country_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`forms_blocks_email_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_email_locales_parent_id_locale_unique\` ON \`forms_blocks_email_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`forms_blocks_message_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_message_locales_parent_id_locale_unique\` ON \`forms_blocks_message_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`forms_blocks_number_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_number_locales_parent_id_locale_unique\` ON \`forms_blocks_number_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`forms_blocks_select_options_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_select_options_locales_parent_id_locale_unique\` ON \`forms_blocks_select_options_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`forms_blocks_select_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_select_locales_parent_id_locale_unique\` ON \`forms_blocks_select_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`forms_blocks_state_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_state_locales_parent_id_locale_unique\` ON \`forms_blocks_state_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`forms_blocks_text_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_text_locales_parent_id_locale_unique\` ON \`forms_blocks_text_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`forms_blocks_textarea_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_textarea_locales_parent_id_locale_unique\` ON \`forms_blocks_textarea_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`forms_emails_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_emails_locales_parent_id_locale_unique\` ON \`forms_emails_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`forms_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_locales_parent_id_locale_unique\` ON \`forms_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_blocks_checkbox_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_blocks_checkbox_locales_parent_id_locale_unique\` ON \`_forms_v_blocks_checkbox_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_blocks_country_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_blocks_country_locales_parent_id_locale_unique\` ON \`_forms_v_blocks_country_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_blocks_email_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_blocks_email_locales_parent_id_locale_unique\` ON \`_forms_v_blocks_email_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_blocks_message_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_blocks_message_locales_parent_id_locale_unique\` ON \`_forms_v_blocks_message_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_blocks_number_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_blocks_number_locales_parent_id_locale_unique\` ON \`_forms_v_blocks_number_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_blocks_select_options_locales_locale_parent_id_uniq\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_blocks_select_options_locales_parent_id_locale_uniq\` ON \`_forms_v_blocks_select_options_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_blocks_select_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_blocks_select_locales_parent_id_locale_unique\` ON \`_forms_v_blocks_select_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_blocks_state_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_blocks_state_locales_parent_id_locale_unique\` ON \`_forms_v_blocks_state_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_blocks_text_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_blocks_text_locales_parent_id_locale_unique\` ON \`_forms_v_blocks_text_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_blocks_textarea_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_blocks_textarea_locales_parent_id_locale_unique\` ON \`_forms_v_blocks_textarea_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_version_emails_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_version_emails_locales_parent_id_locale_unique\` ON \`_forms_v_version_emails_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_locales_parent_id_locale_unique\` ON \`_forms_v_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`search_locales_locale_parent_id_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`search_locales_parent_id_locale_unique\` ON \`search_locales\` (\`_parent_id\`,\`_locale\`);`)
  await db.run(sql`DROP INDEX \`payload_jobs_processing_idx\`;`)
  await db.run(sql`ALTER TABLE \`payload_jobs\` ADD \`processing_until\` text;`)
  await db.run(sql`ALTER TABLE \`payload_jobs\` ADD \`processing_token\` text;`)
  await db.run(sql`ALTER TABLE \`payload_jobs\` ADD \`concurrency_key\` text;`)
  await db.run(sql`CREATE INDEX \`payload_jobs_processing_until_idx\` ON \`payload_jobs\` (\`processing_until\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_concurrency_key_idx\` ON \`payload_jobs\` (\`concurrency_key\`);`)
  await db.run(sql`ALTER TABLE \`payload_jobs\` DROP COLUMN \`processing\`;`)
  await db.run(sql`DROP INDEX \`categories_slug_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`tenant_slug_idx\` ON \`categories\` (\`tenant_id\`,\`slug\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`ALTER TABLE \`categories\` DROP COLUMN \`generate_slug\`;`)
  await db.run(sql`CREATE TABLE \`__new_payload_jobs_log\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`executed_at\` text NOT NULL,
  	\`completed_at\` text NOT NULL,
  	\`task_slug\` text NOT NULL,
  	\`task_i_d\` text NOT NULL,
  	\`input\` text NOT NULL,
  	\`output\` text,
  	\`state\` text NOT NULL,
  	\`error\` text,
  	\`parent_task_slug\` text,
  	\`parent_task_i_d\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`payload_jobs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_jobs_log\`("_order", "_parent_id", "id", "executed_at", "completed_at", "task_slug", "task_i_d", "input", "output", "state", "error", "parent_task_slug", "parent_task_i_d") SELECT "_order", "_parent_id", "id", "executed_at", "completed_at", "task_slug", "task_i_d", "input", "output", "state", "error", "parent_task_slug", "parent_task_i_d" FROM \`payload_jobs_log\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs_log\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_jobs_log\` RENAME TO \`payload_jobs_log\`;`)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_order_idx\` ON \`payload_jobs_log\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_parent_id_idx\` ON \`payload_jobs_log\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`roles_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`roles_rels_users_id_idx\` ON \`roles_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_roles_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_roles_v_rels_users_id_idx\` ON \`_roles_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`users_sessions\` ADD \`refresh_count\` numeric;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` ADD \`refreshed_at\` text;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` ADD \`label\` text;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` ADD \`type\` text;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` ADD \`metadata\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`api_key\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`api_key_last4\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`api_key_index\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`reset_password_requested_at\` text;`)
  await db.run(sql`ALTER TABLE \`users_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`users_rels_users_id_idx\` ON \`users_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_users_v_version_sessions\` ADD \`refresh_count\` numeric;`)
  await db.run(sql`ALTER TABLE \`_users_v_version_sessions\` ADD \`refreshed_at\` text;`)
  await db.run(sql`ALTER TABLE \`_users_v_version_sessions\` ADD \`label\` text;`)
  await db.run(sql`ALTER TABLE \`_users_v_version_sessions\` ADD \`type\` text;`)
  await db.run(sql`ALTER TABLE \`_users_v_version_sessions\` ADD \`metadata\` text;`)
  await db.run(sql`ALTER TABLE \`_users_v\` ADD \`version_api_key\` text;`)
  await db.run(sql`ALTER TABLE \`_users_v\` ADD \`version_api_key_last4\` text;`)
  await db.run(sql`ALTER TABLE \`_users_v\` ADD \`version_api_key_index\` text;`)
  await db.run(sql`ALTER TABLE \`_users_v\` ADD \`version_reset_password_requested_at\` text;`)
  await db.run(sql`ALTER TABLE \`_users_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_users_v_rels_users_id_idx\` ON \`_users_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`pages_rels_users_id_idx\` ON \`pages_rels\` (\`users_id\`,\`locale\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_users_id_idx\` ON \`_pages_v_rels\` (\`users_id\`,\`locale\`);`)
  await db.run(sql`ALTER TABLE \`batches_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`batches_rels_users_id_idx\` ON \`batches_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_batches_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_batches_v_rels_users_id_idx\` ON \`_batches_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`parties_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`parties_rels_users_id_idx\` ON \`parties_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_parties_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_parties_v_rels_users_id_idx\` ON \`_parties_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`consolidations_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`consolidations_rels_users_id_idx\` ON \`consolidations_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_consolidations_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_consolidations_v_rels_users_id_idx\` ON \`_consolidations_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`tax_codes_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`tax_codes_rels_users_id_idx\` ON \`tax_codes_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_tax_codes_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_tax_codes_v_rels_users_id_idx\` ON \`_tax_codes_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`tax_jurisdictions_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_rels_users_id_idx\` ON \`tax_jurisdictions_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_tax_jurisdictions_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_tax_jurisdictions_v_rels_users_id_idx\` ON \`_tax_jurisdictions_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`tax_returns_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`tax_returns_rels_users_id_idx\` ON \`tax_returns_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_tax_returns_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_tax_returns_v_rels_users_id_idx\` ON \`_tax_returns_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`transfer_pricing_adjustments_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_adjustments_rels_users_id_idx\` ON \`transfer_pricing_adjustments_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_transfer_pricing_adjustments_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_transfer_pricing_adjustments_v_rels_users_id_idx\` ON \`_transfer_pricing_adjustments_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`deferred_tax_items_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`deferred_tax_items_rels_users_id_idx\` ON \`deferred_tax_items_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_deferred_tax_items_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_deferred_tax_items_v_rels_users_id_idx\` ON \`_deferred_tax_items_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`audit_committee_minutes_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`audit_committee_minutes_rels_users_id_idx\` ON \`audit_committee_minutes_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_audit_committee_minutes_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_audit_committee_minutes_v_rels_users_id_idx\` ON \`_audit_committee_minutes_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`board_actions_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`board_actions_rels_users_id_idx\` ON \`board_actions_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_board_actions_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_board_actions_v_rels_users_id_idx\` ON \`_board_actions_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`debt_schedule_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_rels_users_id_idx\` ON \`debt_schedule_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_debt_schedule_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_rels_users_id_idx\` ON \`_debt_schedule_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`disclosure_checklists_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`disclosure_checklists_rels_users_id_idx\` ON \`disclosure_checklists_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_disclosure_checklists_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_disclosure_checklists_v_rels_users_id_idx\` ON \`_disclosure_checklists_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`entity_types_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`entity_types_rels_users_id_idx\` ON \`entity_types_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_entity_types_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_entity_types_v_rels_users_id_idx\` ON \`_entity_types_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`internal_audit_function_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_rels_users_id_idx\` ON \`internal_audit_function_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_internal_audit_function_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_rels_users_id_idx\` ON \`_internal_audit_function_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`internal_policies_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`internal_policies_rels_users_id_idx\` ON \`internal_policies_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_internal_policies_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_internal_policies_v_rels_users_id_idx\` ON \`_internal_policies_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`management_assessment_icfr_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_rels_users_id_idx\` ON \`management_assessment_icfr_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_management_assessment_icfr_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_v_rels_users_id_idx\` ON \`_management_assessment_icfr_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`management_certifications_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`management_certifications_rels_users_id_idx\` ON \`management_certifications_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_management_certifications_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_management_certifications_v_rels_users_id_idx\` ON \`_management_certifications_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`regulatory_reports_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_rels_users_id_idx\` ON \`regulatory_reports_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_regulatory_reports_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_rels_users_id_idx\` ON \`_regulatory_reports_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`related_party_transactions_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_rels_users_id_idx\` ON \`related_party_transactions_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_related_party_transactions_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_related_party_transactions_v_rels_users_id_idx\` ON \`_related_party_transactions_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`risk_register_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`risk_register_rels_users_id_idx\` ON \`risk_register_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_risk_register_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_risk_register_v_rels_users_id_idx\` ON \`_risk_register_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`segment_reporting_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`segment_reporting_rels_users_id_idx\` ON \`segment_reporting_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_segment_reporting_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_segment_reporting_v_rels_users_id_idx\` ON \`_segment_reporting_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`fair_value_measurements_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_rels_users_id_idx\` ON \`fair_value_measurements_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_fair_value_measurements_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_fair_value_measurements_v_rels_users_id_idx\` ON \`_fair_value_measurements_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`held_for_sale_classifications_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_rels_users_id_idx\` ON \`held_for_sale_classifications_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_held_for_sale_classifications_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_rels_users_id_idx\` ON \`_held_for_sale_classifications_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`contracts_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`contracts_rels_users_id_idx\` ON \`contracts_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_contracts_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_contracts_v_rels_users_id_idx\` ON \`_contracts_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`project_tasks_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`project_tasks_rels_users_id_idx\` ON \`project_tasks_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_project_tasks_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_project_tasks_v_rels_users_id_idx\` ON \`_project_tasks_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`standards_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`standards_rels_users_id_idx\` ON \`standards_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_standards_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_standards_v_rels_users_id_idx\` ON \`_standards_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`redirects_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_users_id_idx\` ON \`redirects_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`_redirects_v_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`_redirects_v_rels_users_id_idx\` ON \`_redirects_v_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`exports\` ADD \`_stored\` integer;`)
  await db.run(sql`ALTER TABLE \`exports\` ADD \`_transforms\` text;`)
  await db.run(sql`ALTER TABLE \`exports\` ADD \`original_filename\` text;`)
  await db.run(sql`ALTER TABLE \`exports\` ADD \`original_url\` text;`)
  await db.run(sql`ALTER TABLE \`exports\` ADD \`original_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`exports\` ADD \`original_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`exports\` ADD \`original_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`exports\` ADD \`original_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`exports\` ADD \`original_prefix\` text;`)
  await db.run(sql`ALTER TABLE \`exports\` ADD \`original__objectkey\` text;`)
  await db.run(sql`ALTER TABLE \`exports\` ADD \`original__stored\` integer;`)
  await db.run(sql`CREATE INDEX \`exports_original_original_filename_idx\` ON \`exports\` (\`original_filename\`);`)
  await db.run(sql`ALTER TABLE \`_exports_v\` ADD \`version__stored\` integer;`)
  await db.run(sql`ALTER TABLE \`_exports_v\` ADD \`version__transforms\` text;`)
  await db.run(sql`ALTER TABLE \`_exports_v\` ADD \`version_original_filename\` text;`)
  await db.run(sql`ALTER TABLE \`_exports_v\` ADD \`version_original_url\` text;`)
  await db.run(sql`ALTER TABLE \`_exports_v\` ADD \`version_original_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`_exports_v\` ADD \`version_original_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`_exports_v\` ADD \`version_original_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`_exports_v\` ADD \`version_original_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`_exports_v\` ADD \`version_original_prefix\` text;`)
  await db.run(sql`ALTER TABLE \`_exports_v\` ADD \`version_original__objectkey\` text;`)
  await db.run(sql`ALTER TABLE \`_exports_v\` ADD \`version_original__stored\` integer;`)
  await db.run(sql`CREATE INDEX \`_exports_v_version_original_version_original_filename_idx\` ON \`_exports_v\` (\`version_original_filename\`);`)
  await db.run(sql`ALTER TABLE \`imports\` ADD \`_stored\` integer;`)
  await db.run(sql`ALTER TABLE \`imports\` ADD \`_transforms\` text;`)
  await db.run(sql`ALTER TABLE \`imports\` ADD \`original_filename\` text;`)
  await db.run(sql`ALTER TABLE \`imports\` ADD \`original_url\` text;`)
  await db.run(sql`ALTER TABLE \`imports\` ADD \`original_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`imports\` ADD \`original_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`imports\` ADD \`original_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`imports\` ADD \`original_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`imports\` ADD \`original_prefix\` text;`)
  await db.run(sql`ALTER TABLE \`imports\` ADD \`original__objectkey\` text;`)
  await db.run(sql`ALTER TABLE \`imports\` ADD \`original__stored\` integer;`)
  await db.run(sql`CREATE INDEX \`imports_original_original_filename_idx\` ON \`imports\` (\`original_filename\`);`)
  await db.run(sql`ALTER TABLE \`_imports_v\` ADD \`version__stored\` integer;`)
  await db.run(sql`ALTER TABLE \`_imports_v\` ADD \`version__transforms\` text;`)
  await db.run(sql`ALTER TABLE \`_imports_v\` ADD \`version_original_filename\` text;`)
  await db.run(sql`ALTER TABLE \`_imports_v\` ADD \`version_original_url\` text;`)
  await db.run(sql`ALTER TABLE \`_imports_v\` ADD \`version_original_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`_imports_v\` ADD \`version_original_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`_imports_v\` ADD \`version_original_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`_imports_v\` ADD \`version_original_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`_imports_v\` ADD \`version_original_prefix\` text;`)
  await db.run(sql`ALTER TABLE \`_imports_v\` ADD \`version_original__objectkey\` text;`)
  await db.run(sql`ALTER TABLE \`_imports_v\` ADD \`version_original__stored\` integer;`)
  await db.run(sql`CREATE INDEX \`_imports_v_version_original_version_original_filename_idx\` ON \`_imports_v\` (\`version_original_filename\`);`)
  await db.run(sql`ALTER TABLE \`header_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`header_rels_users_id_idx\` ON \`header_rels\` (\`users_id\`);`)
  await db.run(sql`ALTER TABLE \`footer_rels\` ADD \`users_id\` text(36) REFERENCES users(id);`)
  await db.run(sql`CREATE INDEX \`footer_rels_users_id_idx\` ON \`footer_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`version_tenant_version_slug_idx\` ON \`_categories_v\` (\`version_tenant_id\`,\`version_slug\`);`)
  await db.run(sql`ALTER TABLE \`_categories_v\` DROP COLUMN \`version_generate_slug\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`payload_mcp_api_keys\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`user_id\` text(36) NOT NULL,
  	\`label\` text,
  	\`description\` text,
  	\`scopes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`enable_a_p_i_key\` integer,
  	\`api_key\` text,
  	\`api_key_index\` text,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_mcp_api_keys_user_idx\` ON \`payload_mcp_api_keys\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_mcp_api_keys_updated_at_idx\` ON \`payload_mcp_api_keys\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_mcp_api_keys_created_at_idx\` ON \`payload_mcp_api_keys\` (\`created_at\`);`)
  await db.run(sql`DROP TABLE \`consolidation_eliminations_rels\`;`)
  await db.run(sql`DROP TABLE \`_consolidation_eliminations_v_rels\`;`)
  await db.run(sql`DROP TABLE \`intercompany_transactions_rels\`;`)
  await db.run(sql`DROP TABLE \`_intercompany_transactions_v_rels\`;`)
  await db.run(sql`DROP TABLE \`org_units_rels\`;`)
  await db.run(sql`DROP TABLE \`_org_units_v_rels\`;`)
  await db.run(sql`DROP TABLE \`tenants_rels\`;`)
  await db.run(sql`DROP TABLE \`_tenants_v_rels\`;`)
  await db.run(sql`DROP TABLE \`categories_rels\`;`)
  await db.run(sql`DROP TABLE \`_categories_v_rels\`;`)
  await db.run(sql`DROP TABLE \`media_rels\`;`)
  await db.run(sql`DROP TABLE \`_media_v_rels\`;`)
  await db.run(sql`DROP TABLE \`activities_rels\`;`)
  await db.run(sql`DROP TABLE \`_activities_v_rels\`;`)
  await db.run(sql`DROP TABLE \`ai_suggestions_rels\`;`)
  await db.run(sql`DROP TABLE \`_ai_suggestions_v_rels\`;`)
  await db.run(sql`DROP TABLE \`beneficial_owners_rels\`;`)
  await db.run(sql`DROP TABLE \`_beneficial_owners_v_rels\`;`)
  await db.run(sql`DROP TABLE \`bookings_rels\`;`)
  await db.run(sql`DROP TABLE \`_bookings_v_rels\`;`)
  await db.run(sql`DROP TABLE \`consent_records_rels\`;`)
  await db.run(sql`DROP TABLE \`_consent_records_v_rels\`;`)
  await db.run(sql`DROP TABLE \`consignment_arrangements_rels\`;`)
  await db.run(sql`DROP TABLE \`_consignment_arrangements_v_rels\`;`)
  await db.run(sql`DROP TABLE \`consignment_sales_rels\`;`)
  await db.run(sql`DROP TABLE \`_consignment_sales_v_rels\`;`)
  await db.run(sql`DROP TABLE \`credit_memos_rels\`;`)
  await db.run(sql`DROP TABLE \`_credit_memos_v_rels\`;`)
  await db.run(sql`DROP TABLE \`customer_segments_rels\`;`)
  await db.run(sql`DROP TABLE \`_customer_segments_v_rels\`;`)
  await db.run(sql`DROP TABLE \`customs_declarations_rels\`;`)
  await db.run(sql`DROP TABLE \`_customs_declarations_v_rels\`;`)
  await db.run(sql`DROP TABLE \`dunning_cycles_rels\`;`)
  await db.run(sql`DROP TABLE \`_dunning_cycles_v_rels\`;`)
  await db.run(sql`DROP TABLE \`fiscal_devices_rels\`;`)
  await db.run(sql`DROP TABLE \`_fiscal_devices_v_rels\`;`)
  await db.run(sql`DROP TABLE \`goods_receipts_rels\`;`)
  await db.run(sql`DROP TABLE \`_goods_receipts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`invoice_lines_rels\`;`)
  await db.run(sql`DROP TABLE \`_invoice_lines_v_rels\`;`)
  await db.run(sql`DROP TABLE \`invoices_rels\`;`)
  await db.run(sql`DROP TABLE \`_invoices_v_rels\`;`)
  await db.run(sql`DROP TABLE \`kyc_checks_rels\`;`)
  await db.run(sql`DROP TABLE \`_kyc_checks_v_rels\`;`)
  await db.run(sql`DROP TABLE \`leads_rels\`;`)
  await db.run(sql`DROP TABLE \`_leads_v_rels\`;`)
  await db.run(sql`DROP TABLE \`operators_rels\`;`)
  await db.run(sql`DROP TABLE \`_operators_v_rels\`;`)
  await db.run(sql`DROP TABLE \`opportunities_rels\`;`)
  await db.run(sql`DROP TABLE \`_opportunities_v_rels\`;`)
  await db.run(sql`DROP TABLE \`payment_allocations_rels\`;`)
  await db.run(sql`DROP TABLE \`_payment_allocations_v_rels\`;`)
  await db.run(sql`DROP TABLE \`payment_runs_rels\`;`)
  await db.run(sql`DROP TABLE \`_payment_runs_v_rels\`;`)
  await db.run(sql`DROP TABLE \`project_milestones_rels\`;`)
  await db.run(sql`DROP TABLE \`_project_milestones_v_rels\`;`)
  await db.run(sql`DROP TABLE \`receipts_rels\`;`)
  await db.run(sql`DROP TABLE \`_receipts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`returns_rels\`;`)
  await db.run(sql`DROP TABLE \`_returns_v_rels\`;`)
  await db.run(sql`DROP TABLE \`sales_rels\`;`)
  await db.run(sql`DROP TABLE \`_sales_v_rels\`;`)
  await db.run(sql`DROP TABLE \`sepa_mandates_rels\`;`)
  await db.run(sql`DROP TABLE \`_sepa_mandates_v_rels\`;`)
  await db.run(sql`DROP TABLE \`subscription_plans_rels\`;`)
  await db.run(sql`DROP TABLE \`_subscription_plans_v_rels\`;`)
  await db.run(sql`DROP TABLE \`subscriptions_rels\`;`)
  await db.run(sql`DROP TABLE \`_subscriptions_v_rels\`;`)
  await db.run(sql`DROP TABLE \`terminals_rels\`;`)
  await db.run(sql`DROP TABLE \`_terminals_v_rels\`;`)
  await db.run(sql`DROP TABLE \`usage_records_rels\`;`)
  await db.run(sql`DROP TABLE \`_usage_records_v_rels\`;`)
  await db.run(sql`DROP TABLE \`vendor_scorecards_rels\`;`)
  await db.run(sql`DROP TABLE \`_vendor_scorecards_v_rels\`;`)
  await db.run(sql`DROP TABLE \`commitments_rels\`;`)
  await db.run(sql`DROP TABLE \`_commitments_v_rels\`;`)
  await db.run(sql`DROP TABLE \`contract_performance_rels\`;`)
  await db.run(sql`DROP TABLE \`_contract_performance_v_rels\`;`)
  await db.run(sql`DROP TABLE \`account_reconciliations_rels\`;`)
  await db.run(sql`DROP TABLE \`_account_reconciliations_v_rels\`;`)
  await db.run(sql`DROP TABLE \`audit_reports_rels\`;`)
  await db.run(sql`DROP TABLE \`_audit_reports_v_rels\`;`)
  await db.run(sql`DROP TABLE \`bank_accounts_rels\`;`)
  await db.run(sql`DROP TABLE \`_bank_accounts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`bank_reconciliations_rels\`;`)
  await db.run(sql`DROP TABLE \`_bank_reconciliations_v_rels\`;`)
  await db.run(sql`DROP TABLE \`bank_statements_rels\`;`)
  await db.run(sql`DROP TABLE \`_bank_statements_v_rels\`;`)
  await db.run(sql`DROP TABLE \`bank_transactions_rels\`;`)
  await db.run(sql`DROP TABLE \`_bank_transactions_v_rels\`;`)
  await db.run(sql`DROP TABLE \`bookable_resources_rels\`;`)
  await db.run(sql`DROP TABLE \`_bookable_resources_v_rels\`;`)
  await db.run(sql`DROP TABLE \`carbon_emissions_rels\`;`)
  await db.run(sql`DROP TABLE \`_carbon_emissions_v_rels\`;`)
  await db.run(sql`DROP TABLE \`closing_entries_rels\`;`)
  await db.run(sql`DROP TABLE \`_closing_entries_v_rels\`;`)
  await db.run(sql`DROP TABLE \`compliance_deadlines_rels\`;`)
  await db.run(sql`DROP TABLE \`_compliance_deadlines_v_rels\`;`)
  await db.run(sql`DROP TABLE \`csrd_disclosures_rels\`;`)
  await db.run(sql`DROP TABLE \`_csrd_disclosures_v_rels\`;`)
  await db.run(sql`DROP TABLE \`currency_rates_rels\`;`)
  await db.run(sql`DROP TABLE \`_currency_rates_v_rels\`;`)
  await db.run(sql`DROP TABLE \`earnings_per_share_rels\`;`)
  await db.run(sql`DROP TABLE \`_earnings_per_share_v_rels\`;`)
  await db.run(sql`DROP TABLE \`entity_legal_structures_rels\`;`)
  await db.run(sql`DROP TABLE \`_entity_legal_structures_v_rels\`;`)
  await db.run(sql`DROP TABLE \`evidence_attestations_rels\`;`)
  await db.run(sql`DROP TABLE \`_evidence_attestations_v_rels\`;`)
  await db.run(sql`DROP TABLE \`financial_statements_rels\`;`)
  await db.run(sql`DROP TABLE \`_financial_statements_v_rels\`;`)
  await db.run(sql`DROP TABLE \`fiscal_calendars_rels\`;`)
  await db.run(sql`DROP TABLE \`_fiscal_calendars_v_rels\`;`)
  await db.run(sql`DROP TABLE \`fiscal_periods_rels\`;`)
  await db.run(sql`DROP TABLE \`_fiscal_periods_v_rels\`;`)
  await db.run(sql`DROP TABLE \`fx_transactions_rels\`;`)
  await db.run(sql`DROP TABLE \`_fx_transactions_v_rels\`;`)
  await db.run(sql`DROP TABLE \`gl_accounts_rels\`;`)
  await db.run(sql`DROP TABLE \`_gl_accounts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`gl_postings_rels\`;`)
  await db.run(sql`DROP TABLE \`_gl_postings_v_rels\`;`)
  await db.run(sql`DROP TABLE \`journal_entries_rels\`;`)
  await db.run(sql`DROP TABLE \`_journal_entries_v_rels\`;`)
  await db.run(sql`DROP TABLE \`lease_modifications_rels\`;`)
  await db.run(sql`DROP TABLE \`_lease_modifications_v_rels\`;`)
  await db.run(sql`DROP TABLE \`legal_entities_rels\`;`)
  await db.run(sql`DROP TABLE \`_legal_entities_v_rels\`;`)
  await db.run(sql`DROP TABLE \`period_end_adjustments_rels\`;`)
  await db.run(sql`DROP TABLE \`_period_end_adjustments_v_rels\`;`)
  await db.run(sql`DROP TABLE \`period_locks_rels\`;`)
  await db.run(sql`DROP TABLE \`_period_locks_v_rels\`;`)
  await db.run(sql`DROP TABLE \`post_balance_sheet_events_rels\`;`)
  await db.run(sql`DROP TABLE \`_post_balance_sheet_events_v_rels\`;`)
  await db.run(sql`DROP TABLE \`post_close_analytics_reports_rels\`;`)
  await db.run(sql`DROP TABLE \`_post_close_analytics_reports_v_rels\`;`)
  await db.run(sql`DROP TABLE \`prior_period_adjustments_rels\`;`)
  await db.run(sql`DROP TABLE \`_prior_period_adjustments_v_rels\`;`)
  await db.run(sql`DROP TABLE \`provisions_rels\`;`)
  await db.run(sql`DROP TABLE \`_provisions_v_rels\`;`)
  await db.run(sql`DROP TABLE \`reporting_standards_rels\`;`)
  await db.run(sql`DROP TABLE \`_reporting_standards_v_rels\`;`)
  await db.run(sql`DROP TABLE \`statutory_report_templates_rels\`;`)
  await db.run(sql`DROP TABLE \`_statutory_report_templates_v_rels\`;`)
  await db.run(sql`DROP TABLE \`tax_calculations_rels\`;`)
  await db.run(sql`DROP TABLE \`_tax_calculations_v_rels\`;`)
  await db.run(sql`DROP TABLE \`tax_periods_rels\`;`)
  await db.run(sql`DROP TABLE \`_tax_periods_v_rels\`;`)
  await db.run(sql`DROP TABLE \`transfer_pricing_files_rels\`;`)
  await db.run(sql`DROP TABLE \`_transfer_pricing_files_v_rels\`;`)
  await db.run(sql`DROP TABLE \`wip_snapshots_rels\`;`)
  await db.run(sql`DROP TABLE \`_wip_snapshots_v_rels\`;`)
  await db.run(sql`DROP TABLE \`cost_centers_rels\`;`)
  await db.run(sql`DROP TABLE \`_cost_centers_v_rels\`;`)
  await db.run(sql`DROP TABLE \`employees_rels\`;`)
  await db.run(sql`DROP TABLE \`_employees_v_rels\`;`)
  await db.run(sql`DROP TABLE \`expense_reports_rels\`;`)
  await db.run(sql`DROP TABLE \`_expense_reports_v_rels\`;`)
  await db.run(sql`DROP TABLE \`job_positions_rels\`;`)
  await db.run(sql`DROP TABLE \`_job_positions_v_rels\`;`)
  await db.run(sql`DROP TABLE \`leave_requests_rels\`;`)
  await db.run(sql`DROP TABLE \`_leave_requests_v_rels\`;`)
  await db.run(sql`DROP TABLE \`maintenance_work_orders_rels\`;`)
  await db.run(sql`DROP TABLE \`_maintenance_work_orders_v_rels\`;`)
  await db.run(sql`DROP TABLE \`payroll_runs_rels\`;`)
  await db.run(sql`DROP TABLE \`_payroll_runs_v_rels\`;`)
  await db.run(sql`DROP TABLE \`performance_reviews_rels\`;`)
  await db.run(sql`DROP TABLE \`_performance_reviews_v_rels\`;`)
  await db.run(sql`DROP TABLE \`sales_commissions_rels\`;`)
  await db.run(sql`DROP TABLE \`_sales_commissions_v_rels\`;`)
  await db.run(sql`DROP TABLE \`share_based_payments_rels\`;`)
  await db.run(sql`DROP TABLE \`_share_based_payments_v_rels\`;`)
  await db.run(sql`DROP TABLE \`time_entries_rels\`;`)
  await db.run(sql`DROP TABLE \`_time_entries_v_rels\`;`)
  await db.run(sql`DROP TABLE \`work_shifts_rels\`;`)
  await db.run(sql`DROP TABLE \`_work_shifts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`bills_of_materials_rels\`;`)
  await db.run(sql`DROP TABLE \`_bills_of_materials_v_rels\`;`)
  await db.run(sql`DROP TABLE \`cost_variances_rels\`;`)
  await db.run(sql`DROP TABLE \`_cost_variances_v_rels\`;`)
  await db.run(sql`DROP TABLE \`lot_variants_rels\`;`)
  await db.run(sql`DROP TABLE \`_lot_variants_v_rels\`;`)
  await db.run(sql`DROP TABLE \`lot_work_phases_rels\`;`)
  await db.run(sql`DROP TABLE \`_lot_work_phases_v_rels\`;`)
  await db.run(sql`DROP TABLE \`lots_rels\`;`)
  await db.run(sql`DROP TABLE \`_lots_v_rels\`;`)
  await db.run(sql`DROP TABLE \`pack_items_rels\`;`)
  await db.run(sql`DROP TABLE \`_pack_items_v_rels\`;`)
  await db.run(sql`DROP TABLE \`packs_rels\`;`)
  await db.run(sql`DROP TABLE \`_packs_v_rels\`;`)
  await db.run(sql`DROP TABLE \`work_centers_rels\`;`)
  await db.run(sql`DROP TABLE \`_work_centers_v_rels\`;`)
  await db.run(sql`DROP TABLE \`work_orders_rels\`;`)
  await db.run(sql`DROP TABLE \`_work_orders_v_rels\`;`)
  await db.run(sql`DROP TABLE \`work_phases_rels\`;`)
  await db.run(sql`DROP TABLE \`_work_phases_v_rels\`;`)
  await db.run(sql`DROP TABLE \`carriers_rels\`;`)
  await db.run(sql`DROP TABLE \`_carriers_v_rels\`;`)
  await db.run(sql`DROP TABLE \`consignment_inventory_rels\`;`)
  await db.run(sql`DROP TABLE \`_consignment_inventory_v_rels\`;`)
  await db.run(sql`DROP TABLE \`inventory_movements_rels\`;`)
  await db.run(sql`DROP TABLE \`_inventory_movements_v_rels\`;`)
  await db.run(sql`DROP TABLE \`packages_rels\`;`)
  await db.run(sql`DROP TABLE \`_packages_v_rels\`;`)
  await db.run(sql`DROP TABLE \`production_receipts_rels\`;`)
  await db.run(sql`DROP TABLE \`_production_receipts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`quality_inspections_rels\`;`)
  await db.run(sql`DROP TABLE \`_quality_inspections_v_rels\`;`)
  await db.run(sql`DROP TABLE \`shipments_rels\`;`)
  await db.run(sql`DROP TABLE \`_shipments_v_rels\`;`)
  await db.run(sql`DROP TABLE \`tracking_events_rels\`;`)
  await db.run(sql`DROP TABLE \`_tracking_events_v_rels\`;`)
  await db.run(sql`DROP TABLE \`warehouse_locations_rels\`;`)
  await db.run(sql`DROP TABLE \`_warehouse_locations_v_rels\`;`)
  await db.run(sql`DROP TABLE \`audit_committees_rels\`;`)
  await db.run(sql`DROP TABLE \`_audit_committees_v_rels\`;`)
  await db.run(sql`DROP TABLE \`audit_evidence_rels\`;`)
  await db.run(sql`DROP TABLE \`_audit_evidence_v_rels\`;`)
  await db.run(sql`DROP TABLE \`audit_findings_rels\`;`)
  await db.run(sql`DROP TABLE \`_audit_findings_v_rels\`;`)
  await db.run(sql`DROP TABLE \`audit_samples_rels\`;`)
  await db.run(sql`DROP TABLE \`_audit_samples_v_rels\`;`)
  await db.run(sql`DROP TABLE \`compliance_frameworks_rels\`;`)
  await db.run(sql`DROP TABLE \`_compliance_frameworks_v_rels\`;`)
  await db.run(sql`DROP TABLE \`compliance_gaps_rels\`;`)
  await db.run(sql`DROP TABLE \`_compliance_gaps_v_rels\`;`)
  await db.run(sql`DROP TABLE \`compliance_requirements_rels\`;`)
  await db.run(sql`DROP TABLE \`_compliance_requirements_v_rels\`;`)
  await db.run(sql`DROP TABLE \`control_tests_rels\`;`)
  await db.run(sql`DROP TABLE \`_control_tests_v_rels\`;`)
  await db.run(sql`DROP TABLE \`government_grants_rels\`;`)
  await db.run(sql`DROP TABLE \`_government_grants_v_rels\`;`)
  await db.run(sql`DROP TABLE \`internal_controls_rels\`;`)
  await db.run(sql`DROP TABLE \`_internal_controls_v_rels\`;`)
  await db.run(sql`DROP TABLE \`policy_acknowledgments_rels\`;`)
  await db.run(sql`DROP TABLE \`_policy_acknowledgments_v_rels\`;`)
  await db.run(sql`DROP TABLE \`remediation_plans_rels\`;`)
  await db.run(sql`DROP TABLE \`_remediation_plans_v_rels\`;`)
  await db.run(sql`DROP TABLE \`biological_assets_rels\`;`)
  await db.run(sql`DROP TABLE \`_biological_assets_v_rels\`;`)
  await db.run(sql`DROP TABLE \`business_combinations_rels\`;`)
  await db.run(sql`DROP TABLE \`_business_combinations_v_rels\`;`)
  await db.run(sql`DROP TABLE \`depreciation_schedules_rels\`;`)
  await db.run(sql`DROP TABLE \`_depreciation_schedules_v_rels\`;`)
  await db.run(sql`DROP TABLE \`fixed_assets_rels\`;`)
  await db.run(sql`DROP TABLE \`_fixed_assets_v_rels\`;`)
  await db.run(sql`DROP TABLE \`insurance_contracts_rels\`;`)
  await db.run(sql`DROP TABLE \`_insurance_contracts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`investment_properties_rels\`;`)
  await db.run(sql`DROP TABLE \`_investment_properties_v_rels\`;`)
  await db.run(sql`DROP TABLE \`lease_period_postings_rels\`;`)
  await db.run(sql`DROP TABLE \`_lease_period_postings_v_rels\`;`)
  await db.run(sql`DROP TABLE \`leases_rels\`;`)
  await db.run(sql`DROP TABLE \`_leases_v_rels\`;`)
  await db.run(sql`DROP TABLE \`properties_rels\`;`)
  await db.run(sql`DROP TABLE \`_properties_v_rels\`;`)
  await db.run(sql`DROP TABLE \`spaces_rels\`;`)
  await db.run(sql`DROP TABLE \`_spaces_v_rels\`;`)
  await db.run(sql`DROP TABLE \`budget_planning_rels\`;`)
  await db.run(sql`DROP TABLE \`_budget_planning_v_rels\`;`)
  await db.run(sql`DROP TABLE \`performance_obligations_rels\`;`)
  await db.run(sql`DROP TABLE \`_performance_obligations_v_rels\`;`)
  await db.run(sql`DROP TABLE \`projects_rels\`;`)
  await db.run(sql`DROP TABLE \`_projects_v_rels\`;`)
  await db.run(sql`DROP TABLE \`recurring_journals_rels\`;`)
  await db.run(sql`DROP TABLE \`_recurring_journals_v_rels\`;`)
  await db.run(sql`DROP TABLE \`workflow_definitions_rels\`;`)
  await db.run(sql`DROP TABLE \`_workflow_definitions_v_rels\`;`)
  await db.run(sql`DROP TABLE \`workflow_instances_rels\`;`)
  await db.run(sql`DROP TABLE \`_workflow_instances_v_rels\`;`)
  await db.run(sql`DROP TABLE \`contract_amendments_rels\`;`)
  await db.run(sql`DROP TABLE \`_contract_amendments_v_rels\`;`)
  await db.run(sql`DROP TABLE \`contract_signatures_rels\`;`)
  await db.run(sql`DROP TABLE \`_contract_signatures_v_rels\`;`)
  await db.run(sql`DROP TABLE \`chat_rels\`;`)
  await db.run(sql`DROP TABLE \`_chat_v_rels\`;`)
  await db.run(sql`DROP TABLE \`connections_rels\`;`)
  await db.run(sql`DROP TABLE \`_connections_v_rels\`;`)
  await db.run(sql`DROP TABLE \`api_audit_events_rels\`;`)
  await db.run(sql`DROP TABLE \`_api_audit_events_v_rels\`;`)
  await db.run(sql`DROP TABLE \`audit_events_rels\`;`)
  await db.run(sql`DROP TABLE \`audit_submissions_rels\`;`)
  await db.run(sql`DROP TABLE \`_audit_submissions_v_rels\`;`)
  await db.run(sql`DROP TABLE \`data_processing_activities_rels\`;`)
  await db.run(sql`DROP TABLE \`_data_processing_activities_v_rels\`;`)
  await db.run(sql`DROP TABLE \`data_subject_requests_rels\`;`)
  await db.run(sql`DROP TABLE \`_data_subject_requests_v_rels\`;`)
  await db.run(sql`DROP TABLE \`memories_rels\`;`)
  await db.run(sql`DROP TABLE \`_memories_v_rels\`;`)
  await db.run(sql`DROP TABLE \`mineral_resource_assets_rels\`;`)
  await db.run(sql`DROP TABLE \`_mineral_resource_assets_v_rels\`;`)
  await db.run(sql`DROP TABLE \`regulatory_deferral_accounts_rels\`;`)
  await db.run(sql`DROP TABLE \`_regulatory_deferral_accounts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`rounding_adjustments_rels\`;`)
  await db.run(sql`DROP TABLE \`_rounding_adjustments_v_rels\`;`)
  await db.run(sql`DROP TABLE \`sectors_rels\`;`)
  await db.run(sql`DROP TABLE \`_sectors_v_rels\`;`)
  await db.run(sql`DROP TABLE \`shares_rels\`;`)
  await db.run(sql`DROP TABLE \`_shares_v_rels\`;`)
  await db.run(sql`DROP TABLE \`taggings_rels\`;`)
  await db.run(sql`DROP TABLE \`_taggings_v_rels\`;`)
  await db.run(sql`DROP TABLE \`tags_rels\`;`)
  await db.run(sql`DROP TABLE \`_tags_v_rels\`;`)
  await db.run(sql`DROP TABLE \`transaction_failures_rels\`;`)
  await db.run(sql`DROP TABLE \`_transaction_failures_v_rels\`;`)
  await db.run(sql`DROP TABLE \`translations_rels\`;`)
  await db.run(sql`DROP TABLE \`_translations_v_rels\`;`)
  await db.run(sql`DROP TABLE \`forms_rels\`;`)
  await db.run(sql`DROP TABLE \`_forms_v_rels\`;`)
  await db.run(sql`DROP TABLE \`exports_rels\`;`)
  await db.run(sql`DROP TABLE \`_exports_v_rels\`;`)
  await db.run(sql`DROP TABLE \`imports_rels\`;`)
  await db.run(sql`DROP TABLE \`_imports_v_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_llm_instructions\`;`)
  await db.run(sql`DROP TABLE \`payload_llm_instructions_rels\`;`)
  await db.run(sql`DROP TABLE \`_header_v_version_nav_items\`;`)
  await db.run(sql`DROP TABLE \`_header_v\`;`)
  await db.run(sql`DROP TABLE \`_header_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_version_nav_items\`;`)
  await db.run(sql`DROP TABLE \`_footer_v\`;`)
  await db.run(sql`DROP TABLE \`_footer_v_rels\`;`)
  await db.run(sql`DROP TABLE \`providers_rels\`;`)
  await db.run(sql`DROP TABLE \`_providers_v_version_providers\`;`)
  await db.run(sql`DROP TABLE \`_providers_v\`;`)
  await db.run(sql`DROP TABLE \`_providers_v_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_roles_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`tenants_id\` text(36),
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	\`media_id\` text(36),
  	\`categories_id\` text(36),
  	\`products_id\` text(36),
  	\`orders_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`roles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tenants_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`orders_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_roles_rels\`("id", "order", "parent_id", "path", "tenants_id", "pages_id", "posts_id", "media_id", "categories_id", "products_id", "orders_id") SELECT "id", "order", "parent_id", "path", "tenants_id", "pages_id", "posts_id", "media_id", "categories_id", "products_id", "orders_id" FROM \`roles_rels\`;`)
  await db.run(sql`DROP TABLE \`roles_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_roles_rels\` RENAME TO \`roles_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`roles_rels_order_idx\` ON \`roles_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_parent_idx\` ON \`roles_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_path_idx\` ON \`roles_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_tenants_id_idx\` ON \`roles_rels\` (\`tenants_id\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_pages_id_idx\` ON \`roles_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_posts_id_idx\` ON \`roles_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_media_id_idx\` ON \`roles_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_categories_id_idx\` ON \`roles_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_products_id_idx\` ON \`roles_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_orders_id_idx\` ON \`roles_rels\` (\`orders_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__roles_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`tenants_id\` text(36),
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	\`media_id\` text(36),
  	\`categories_id\` text(36),
  	\`products_id\` text(36),
  	\`orders_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_roles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tenants_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`orders_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__roles_v_rels\`("id", "order", "parent_id", "path", "tenants_id", "pages_id", "posts_id", "media_id", "categories_id", "products_id", "orders_id") SELECT "id", "order", "parent_id", "path", "tenants_id", "pages_id", "posts_id", "media_id", "categories_id", "products_id", "orders_id" FROM \`_roles_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_roles_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__roles_v_rels\` RENAME TO \`_roles_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_roles_v_rels_order_idx\` ON \`_roles_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_roles_v_rels_parent_idx\` ON \`_roles_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_roles_v_rels_path_idx\` ON \`_roles_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_roles_v_rels_tenants_id_idx\` ON \`_roles_v_rels\` (\`tenants_id\`);`)
  await db.run(sql`CREATE INDEX \`_roles_v_rels_pages_id_idx\` ON \`_roles_v_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`_roles_v_rels_posts_id_idx\` ON \`_roles_v_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`_roles_v_rels_media_id_idx\` ON \`_roles_v_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`_roles_v_rels_categories_id_idx\` ON \`_roles_v_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`_roles_v_rels_products_id_idx\` ON \`_roles_v_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`_roles_v_rels_orders_id_idx\` ON \`_roles_v_rels\` (\`orders_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_users_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`roles_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`roles_id\`) REFERENCES \`roles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_users_rels\`("id", "order", "parent_id", "path", "roles_id") SELECT "id", "order", "parent_id", "path", "roles_id" FROM \`users_rels\`;`)
  await db.run(sql`DROP TABLE \`users_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_users_rels\` RENAME TO \`users_rels\`;`)
  await db.run(sql`CREATE INDEX \`users_rels_order_idx\` ON \`users_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`users_rels_parent_idx\` ON \`users_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`users_rels_path_idx\` ON \`users_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`users_rels_roles_id_idx\` ON \`users_rels\` (\`roles_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__users_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`roles_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_users_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`roles_id\`) REFERENCES \`roles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__users_v_rels\`("id", "order", "parent_id", "path", "roles_id") SELECT "id", "order", "parent_id", "path", "roles_id" FROM \`_users_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_users_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__users_v_rels\` RENAME TO \`_users_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_users_v_rels_order_idx\` ON \`_users_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_rels_parent_idx\` ON \`_users_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_rels_path_idx\` ON \`_users_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_rels_roles_id_idx\` ON \`_users_v_rels\` (\`roles_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`locale\` text,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	\`categories_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_pages_rels\`("id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id") SELECT "id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id" FROM \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_pages_rels\` RENAME TO \`pages_rels\`;`)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_locale_idx\` ON \`pages_rels\` (\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_pages_id_idx\` ON \`pages_rels\` (\`pages_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_posts_id_idx\` ON \`pages_rels\` (\`posts_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_categories_id_idx\` ON \`pages_rels\` (\`categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE TABLE \`__new__pages_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`locale\` text,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	\`categories_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__pages_v_rels\`("id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id") SELECT "id", "order", "parent_id", "path", "locale", "pages_id", "posts_id", "categories_id" FROM \`_pages_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__pages_v_rels\` RENAME TO \`_pages_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_order_idx\` ON \`_pages_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_parent_idx\` ON \`_pages_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_path_idx\` ON \`_pages_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_locale_idx\` ON \`_pages_v_rels\` (\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_pages_id_idx\` ON \`_pages_v_rels\` (\`pages_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_posts_id_idx\` ON \`_pages_v_rels\` (\`posts_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_categories_id_idx\` ON \`_pages_v_rels\` (\`categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE TABLE \`__new_batches_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`batches_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`batches\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`batches_id\`) REFERENCES \`batches\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_batches_rels\`("id", "order", "parent_id", "path", "batches_id") SELECT "id", "order", "parent_id", "path", "batches_id" FROM \`batches_rels\`;`)
  await db.run(sql`DROP TABLE \`batches_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_batches_rels\` RENAME TO \`batches_rels\`;`)
  await db.run(sql`CREATE INDEX \`batches_rels_order_idx\` ON \`batches_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`batches_rels_parent_idx\` ON \`batches_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`batches_rels_path_idx\` ON \`batches_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`batches_rels_batches_id_idx\` ON \`batches_rels\` (\`batches_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__batches_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`batches_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_batches_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`batches_id\`) REFERENCES \`batches\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__batches_v_rels\`("id", "order", "parent_id", "path", "batches_id") SELECT "id", "order", "parent_id", "path", "batches_id" FROM \`_batches_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_batches_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__batches_v_rels\` RENAME TO \`_batches_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_batches_v_rels_order_idx\` ON \`_batches_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_rels_parent_idx\` ON \`_batches_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_rels_path_idx\` ON \`_batches_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_batches_v_rels_batches_id_idx\` ON \`_batches_v_rels\` (\`batches_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_parties_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`addresses_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`addresses_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_parties_rels\`("id", "order", "parent_id", "path", "addresses_id") SELECT "id", "order", "parent_id", "path", "addresses_id" FROM \`parties_rels\`;`)
  await db.run(sql`DROP TABLE \`parties_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_parties_rels\` RENAME TO \`parties_rels\`;`)
  await db.run(sql`CREATE INDEX \`parties_rels_order_idx\` ON \`parties_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`parties_rels_parent_idx\` ON \`parties_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`parties_rels_path_idx\` ON \`parties_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`parties_rels_addresses_id_idx\` ON \`parties_rels\` (\`addresses_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__parties_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`addresses_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_parties_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`addresses_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__parties_v_rels\`("id", "order", "parent_id", "path", "addresses_id") SELECT "id", "order", "parent_id", "path", "addresses_id" FROM \`_parties_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_parties_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__parties_v_rels\` RENAME TO \`_parties_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_parties_v_rels_order_idx\` ON \`_parties_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_parties_v_rels_parent_idx\` ON \`_parties_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_parties_v_rels_path_idx\` ON \`_parties_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_parties_v_rels_addresses_id_idx\` ON \`_parties_v_rels\` (\`addresses_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_consolidations_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`legal_entities_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`consolidations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`legal_entities_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_consolidations_rels\`("id", "order", "parent_id", "path", "legal_entities_id") SELECT "id", "order", "parent_id", "path", "legal_entities_id" FROM \`consolidations_rels\`;`)
  await db.run(sql`DROP TABLE \`consolidations_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_consolidations_rels\` RENAME TO \`consolidations_rels\`;`)
  await db.run(sql`CREATE INDEX \`consolidations_rels_order_idx\` ON \`consolidations_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`consolidations_rels_parent_idx\` ON \`consolidations_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`consolidations_rels_path_idx\` ON \`consolidations_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`consolidations_rels_legal_entities_id_idx\` ON \`consolidations_rels\` (\`legal_entities_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__consolidations_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`legal_entities_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_consolidations_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`legal_entities_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__consolidations_v_rels\`("id", "order", "parent_id", "path", "legal_entities_id") SELECT "id", "order", "parent_id", "path", "legal_entities_id" FROM \`_consolidations_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_consolidations_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__consolidations_v_rels\` RENAME TO \`_consolidations_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_consolidations_v_rels_order_idx\` ON \`_consolidations_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_consolidations_v_rels_parent_idx\` ON \`_consolidations_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_consolidations_v_rels_path_idx\` ON \`_consolidations_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_consolidations_v_rels_legal_entities_id_idx\` ON \`_consolidations_v_rels\` (\`legal_entities_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_tax_codes_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`tax_codes_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tax_codes_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_tax_codes_rels\`("id", "order", "parent_id", "path", "tax_codes_id") SELECT "id", "order", "parent_id", "path", "tax_codes_id" FROM \`tax_codes_rels\`;`)
  await db.run(sql`DROP TABLE \`tax_codes_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_tax_codes_rels\` RENAME TO \`tax_codes_rels\`;`)
  await db.run(sql`CREATE INDEX \`tax_codes_rels_order_idx\` ON \`tax_codes_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_rels_parent_idx\` ON \`tax_codes_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_rels_path_idx\` ON \`tax_codes_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_rels_tax_codes_id_idx\` ON \`tax_codes_rels\` (\`tax_codes_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__tax_codes_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`tax_codes_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_tax_codes_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tax_codes_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__tax_codes_v_rels\`("id", "order", "parent_id", "path", "tax_codes_id") SELECT "id", "order", "parent_id", "path", "tax_codes_id" FROM \`_tax_codes_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_tax_codes_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__tax_codes_v_rels\` RENAME TO \`_tax_codes_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_tax_codes_v_rels_order_idx\` ON \`_tax_codes_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_tax_codes_v_rels_parent_idx\` ON \`_tax_codes_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_tax_codes_v_rels_path_idx\` ON \`_tax_codes_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_tax_codes_v_rels_tax_codes_id_idx\` ON \`_tax_codes_v_rels\` (\`tax_codes_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_tax_jurisdictions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`compliance_frameworks_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_frameworks_id\`) REFERENCES \`compliance_frameworks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_tax_jurisdictions_rels\`("id", "order", "parent_id", "path", "compliance_frameworks_id") SELECT "id", "order", "parent_id", "path", "compliance_frameworks_id" FROM \`tax_jurisdictions_rels\`;`)
  await db.run(sql`DROP TABLE \`tax_jurisdictions_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_tax_jurisdictions_rels\` RENAME TO \`tax_jurisdictions_rels\`;`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_rels_order_idx\` ON \`tax_jurisdictions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_rels_parent_idx\` ON \`tax_jurisdictions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_rels_path_idx\` ON \`tax_jurisdictions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_rels_compliance_frameworks_id_idx\` ON \`tax_jurisdictions_rels\` (\`compliance_frameworks_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__tax_jurisdictions_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`compliance_frameworks_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_tax_jurisdictions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_frameworks_id\`) REFERENCES \`compliance_frameworks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__tax_jurisdictions_v_rels\`("id", "order", "parent_id", "path", "compliance_frameworks_id") SELECT "id", "order", "parent_id", "path", "compliance_frameworks_id" FROM \`_tax_jurisdictions_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_tax_jurisdictions_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__tax_jurisdictions_v_rels\` RENAME TO \`_tax_jurisdictions_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_tax_jurisdictions_v_rels_order_idx\` ON \`_tax_jurisdictions_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_tax_jurisdictions_v_rels_parent_idx\` ON \`_tax_jurisdictions_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_tax_jurisdictions_v_rels_path_idx\` ON \`_tax_jurisdictions_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_tax_jurisdictions_v_rels_compliance_frameworks_id_idx\` ON \`_tax_jurisdictions_v_rels\` (\`compliance_frameworks_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_tax_returns_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`tax_calculations_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tax_returns\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tax_calculations_id\`) REFERENCES \`tax_calculations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_tax_returns_rels\`("id", "order", "parent_id", "path", "tax_calculations_id") SELECT "id", "order", "parent_id", "path", "tax_calculations_id" FROM \`tax_returns_rels\`;`)
  await db.run(sql`DROP TABLE \`tax_returns_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_tax_returns_rels\` RENAME TO \`tax_returns_rels\`;`)
  await db.run(sql`CREATE INDEX \`tax_returns_rels_order_idx\` ON \`tax_returns_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_rels_parent_idx\` ON \`tax_returns_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_rels_path_idx\` ON \`tax_returns_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_rels_tax_calculations_id_idx\` ON \`tax_returns_rels\` (\`tax_calculations_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__tax_returns_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`tax_calculations_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_tax_returns_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tax_calculations_id\`) REFERENCES \`tax_calculations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__tax_returns_v_rels\`("id", "order", "parent_id", "path", "tax_calculations_id") SELECT "id", "order", "parent_id", "path", "tax_calculations_id" FROM \`_tax_returns_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_tax_returns_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__tax_returns_v_rels\` RENAME TO \`_tax_returns_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_tax_returns_v_rels_order_idx\` ON \`_tax_returns_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_tax_returns_v_rels_parent_idx\` ON \`_tax_returns_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_tax_returns_v_rels_path_idx\` ON \`_tax_returns_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_tax_returns_v_rels_tax_calculations_id_idx\` ON \`_tax_returns_v_rels\` (\`tax_calculations_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_transfer_pricing_adjustments_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`journal_entries_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`transfer_pricing_adjustments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`journal_entries_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_transfer_pricing_adjustments_rels\`("id", "order", "parent_id", "path", "journal_entries_id") SELECT "id", "order", "parent_id", "path", "journal_entries_id" FROM \`transfer_pricing_adjustments_rels\`;`)
  await db.run(sql`DROP TABLE \`transfer_pricing_adjustments_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_transfer_pricing_adjustments_rels\` RENAME TO \`transfer_pricing_adjustments_rels\`;`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_adjustments_rels_order_idx\` ON \`transfer_pricing_adjustments_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_adjustments_rels_parent_idx\` ON \`transfer_pricing_adjustments_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_adjustments_rels_path_idx\` ON \`transfer_pricing_adjustments_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`transfer_pricing_adjustments_rels_journal_entries_id_idx\` ON \`transfer_pricing_adjustments_rels\` (\`journal_entries_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__transfer_pricing_adjustments_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`journal_entries_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_transfer_pricing_adjustments_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`journal_entries_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__transfer_pricing_adjustments_v_rels\`("id", "order", "parent_id", "path", "journal_entries_id") SELECT "id", "order", "parent_id", "path", "journal_entries_id" FROM \`_transfer_pricing_adjustments_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_transfer_pricing_adjustments_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__transfer_pricing_adjustments_v_rels\` RENAME TO \`_transfer_pricing_adjustments_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_transfer_pricing_adjustments_v_rels_order_idx\` ON \`_transfer_pricing_adjustments_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_transfer_pricing_adjustments_v_rels_parent_idx\` ON \`_transfer_pricing_adjustments_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_transfer_pricing_adjustments_v_rels_path_idx\` ON \`_transfer_pricing_adjustments_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_transfer_pricing_adjustments_v_rels_journal_entries_id_idx\` ON \`_transfer_pricing_adjustments_v_rels\` (\`journal_entries_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_deferred_tax_items_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`fixed_assets_id\` text(36),
  	\`inventory_movements_id\` text(36),
  	\`provisions_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`deferred_tax_items\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fixed_assets_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`inventory_movements_id\`) REFERENCES \`inventory_movements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`provisions_id\`) REFERENCES \`provisions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_deferred_tax_items_rels\`("id", "order", "parent_id", "path", "fixed_assets_id", "inventory_movements_id", "provisions_id") SELECT "id", "order", "parent_id", "path", "fixed_assets_id", "inventory_movements_id", "provisions_id" FROM \`deferred_tax_items_rels\`;`)
  await db.run(sql`DROP TABLE \`deferred_tax_items_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_deferred_tax_items_rels\` RENAME TO \`deferred_tax_items_rels\`;`)
  await db.run(sql`CREATE INDEX \`deferred_tax_items_rels_order_idx\` ON \`deferred_tax_items_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`deferred_tax_items_rels_parent_idx\` ON \`deferred_tax_items_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`deferred_tax_items_rels_path_idx\` ON \`deferred_tax_items_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`deferred_tax_items_rels_fixed_assets_id_idx\` ON \`deferred_tax_items_rels\` (\`fixed_assets_id\`);`)
  await db.run(sql`CREATE INDEX \`deferred_tax_items_rels_inventory_movements_id_idx\` ON \`deferred_tax_items_rels\` (\`inventory_movements_id\`);`)
  await db.run(sql`CREATE INDEX \`deferred_tax_items_rels_provisions_id_idx\` ON \`deferred_tax_items_rels\` (\`provisions_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__deferred_tax_items_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`fixed_assets_id\` text(36),
  	\`inventory_movements_id\` text(36),
  	\`provisions_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_deferred_tax_items_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fixed_assets_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`inventory_movements_id\`) REFERENCES \`inventory_movements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`provisions_id\`) REFERENCES \`provisions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__deferred_tax_items_v_rels\`("id", "order", "parent_id", "path", "fixed_assets_id", "inventory_movements_id", "provisions_id") SELECT "id", "order", "parent_id", "path", "fixed_assets_id", "inventory_movements_id", "provisions_id" FROM \`_deferred_tax_items_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_deferred_tax_items_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__deferred_tax_items_v_rels\` RENAME TO \`_deferred_tax_items_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_deferred_tax_items_v_rels_order_idx\` ON \`_deferred_tax_items_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_deferred_tax_items_v_rels_parent_idx\` ON \`_deferred_tax_items_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_deferred_tax_items_v_rels_path_idx\` ON \`_deferred_tax_items_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_deferred_tax_items_v_rels_fixed_assets_id_idx\` ON \`_deferred_tax_items_v_rels\` (\`fixed_assets_id\`);`)
  await db.run(sql`CREATE INDEX \`_deferred_tax_items_v_rels_inventory_movements_id_idx\` ON \`_deferred_tax_items_v_rels\` (\`inventory_movements_id\`);`)
  await db.run(sql`CREATE INDEX \`_deferred_tax_items_v_rels_provisions_id_idx\` ON \`_deferred_tax_items_v_rels\` (\`provisions_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_audit_committee_minutes_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`board_actions_id\` text(36),
  	\`audit_findings_id\` text(36),
  	\`compliance_gaps_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`board_actions_id\`) REFERENCES \`board_actions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_gaps_id\`) REFERENCES \`compliance_gaps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_audit_committee_minutes_rels\`("id", "order", "parent_id", "path", "board_actions_id", "audit_findings_id", "compliance_gaps_id") SELECT "id", "order", "parent_id", "path", "board_actions_id", "audit_findings_id", "compliance_gaps_id" FROM \`audit_committee_minutes_rels\`;`)
  await db.run(sql`DROP TABLE \`audit_committee_minutes_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_audit_committee_minutes_rels\` RENAME TO \`audit_committee_minutes_rels\`;`)
  await db.run(sql`CREATE INDEX \`audit_committee_minutes_rels_order_idx\` ON \`audit_committee_minutes_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`audit_committee_minutes_rels_parent_idx\` ON \`audit_committee_minutes_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_committee_minutes_rels_path_idx\` ON \`audit_committee_minutes_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`audit_committee_minutes_rels_board_actions_id_idx\` ON \`audit_committee_minutes_rels\` (\`board_actions_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_committee_minutes_rels_audit_findings_id_idx\` ON \`audit_committee_minutes_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_committee_minutes_rels_compliance_gaps_id_idx\` ON \`audit_committee_minutes_rels\` (\`compliance_gaps_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__audit_committee_minutes_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`board_actions_id\` text(36),
  	\`audit_findings_id\` text(36),
  	\`compliance_gaps_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_audit_committee_minutes_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`board_actions_id\`) REFERENCES \`board_actions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_gaps_id\`) REFERENCES \`compliance_gaps\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__audit_committee_minutes_v_rels\`("id", "order", "parent_id", "path", "board_actions_id", "audit_findings_id", "compliance_gaps_id") SELECT "id", "order", "parent_id", "path", "board_actions_id", "audit_findings_id", "compliance_gaps_id" FROM \`_audit_committee_minutes_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_audit_committee_minutes_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__audit_committee_minutes_v_rels\` RENAME TO \`_audit_committee_minutes_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_audit_committee_minutes_v_rels_order_idx\` ON \`_audit_committee_minutes_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_audit_committee_minutes_v_rels_parent_idx\` ON \`_audit_committee_minutes_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_audit_committee_minutes_v_rels_path_idx\` ON \`_audit_committee_minutes_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_audit_committee_minutes_v_rels_board_actions_id_idx\` ON \`_audit_committee_minutes_v_rels\` (\`board_actions_id\`);`)
  await db.run(sql`CREATE INDEX \`_audit_committee_minutes_v_rels_audit_findings_id_idx\` ON \`_audit_committee_minutes_v_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE INDEX \`_audit_committee_minutes_v_rels_compliance_gaps_id_idx\` ON \`_audit_committee_minutes_v_rels\` (\`compliance_gaps_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_board_actions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`internal_controls_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`board_actions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_board_actions_rels\`("id", "order", "parent_id", "path", "internal_controls_id") SELECT "id", "order", "parent_id", "path", "internal_controls_id" FROM \`board_actions_rels\`;`)
  await db.run(sql`DROP TABLE \`board_actions_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_board_actions_rels\` RENAME TO \`board_actions_rels\`;`)
  await db.run(sql`CREATE INDEX \`board_actions_rels_order_idx\` ON \`board_actions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`board_actions_rels_parent_idx\` ON \`board_actions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`board_actions_rels_path_idx\` ON \`board_actions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`board_actions_rels_internal_controls_id_idx\` ON \`board_actions_rels\` (\`internal_controls_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__board_actions_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`internal_controls_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_board_actions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__board_actions_v_rels\`("id", "order", "parent_id", "path", "internal_controls_id") SELECT "id", "order", "parent_id", "path", "internal_controls_id" FROM \`_board_actions_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_board_actions_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__board_actions_v_rels\` RENAME TO \`_board_actions_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_board_actions_v_rels_order_idx\` ON \`_board_actions_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_board_actions_v_rels_parent_idx\` ON \`_board_actions_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_board_actions_v_rels_path_idx\` ON \`_board_actions_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_board_actions_v_rels_internal_controls_id_idx\` ON \`_board_actions_v_rels\` (\`internal_controls_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_debt_schedule_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`legal_entities_id\` text(36),
  	\`fx_transactions_id\` text(36),
  	\`internal_controls_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`debt_schedule\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`legal_entities_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fx_transactions_id\`) REFERENCES \`fx_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_debt_schedule_rels\`("id", "order", "parent_id", "path", "legal_entities_id", "fx_transactions_id", "internal_controls_id") SELECT "id", "order", "parent_id", "path", "legal_entities_id", "fx_transactions_id", "internal_controls_id" FROM \`debt_schedule_rels\`;`)
  await db.run(sql`DROP TABLE \`debt_schedule_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_debt_schedule_rels\` RENAME TO \`debt_schedule_rels\`;`)
  await db.run(sql`CREATE INDEX \`debt_schedule_rels_order_idx\` ON \`debt_schedule_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_rels_parent_idx\` ON \`debt_schedule_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_rels_path_idx\` ON \`debt_schedule_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_rels_legal_entities_id_idx\` ON \`debt_schedule_rels\` (\`legal_entities_id\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_rels_fx_transactions_id_idx\` ON \`debt_schedule_rels\` (\`fx_transactions_id\`);`)
  await db.run(sql`CREATE INDEX \`debt_schedule_rels_internal_controls_id_idx\` ON \`debt_schedule_rels\` (\`internal_controls_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__debt_schedule_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`legal_entities_id\` text(36),
  	\`fx_transactions_id\` text(36),
  	\`internal_controls_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_debt_schedule_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`legal_entities_id\`) REFERENCES \`legal_entities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fx_transactions_id\`) REFERENCES \`fx_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__debt_schedule_v_rels\`("id", "order", "parent_id", "path", "legal_entities_id", "fx_transactions_id", "internal_controls_id") SELECT "id", "order", "parent_id", "path", "legal_entities_id", "fx_transactions_id", "internal_controls_id" FROM \`_debt_schedule_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_debt_schedule_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__debt_schedule_v_rels\` RENAME TO \`_debt_schedule_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_rels_order_idx\` ON \`_debt_schedule_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_rels_parent_idx\` ON \`_debt_schedule_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_rels_path_idx\` ON \`_debt_schedule_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_rels_legal_entities_id_idx\` ON \`_debt_schedule_v_rels\` (\`legal_entities_id\`);`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_rels_fx_transactions_id_idx\` ON \`_debt_schedule_v_rels\` (\`fx_transactions_id\`);`)
  await db.run(sql`CREATE INDEX \`_debt_schedule_v_rels_internal_controls_id_idx\` ON \`_debt_schedule_v_rels\` (\`internal_controls_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_disclosure_checklists_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_evidence_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`disclosure_checklists\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_evidence_id\`) REFERENCES \`audit_evidence\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_disclosure_checklists_rels\`("id", "order", "parent_id", "path", "audit_evidence_id") SELECT "id", "order", "parent_id", "path", "audit_evidence_id" FROM \`disclosure_checklists_rels\`;`)
  await db.run(sql`DROP TABLE \`disclosure_checklists_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_disclosure_checklists_rels\` RENAME TO \`disclosure_checklists_rels\`;`)
  await db.run(sql`CREATE INDEX \`disclosure_checklists_rels_order_idx\` ON \`disclosure_checklists_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`disclosure_checklists_rels_parent_idx\` ON \`disclosure_checklists_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`disclosure_checklists_rels_path_idx\` ON \`disclosure_checklists_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`disclosure_checklists_rels_audit_evidence_id_idx\` ON \`disclosure_checklists_rels\` (\`audit_evidence_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__disclosure_checklists_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_evidence_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_disclosure_checklists_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_evidence_id\`) REFERENCES \`audit_evidence\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__disclosure_checklists_v_rels\`("id", "order", "parent_id", "path", "audit_evidence_id") SELECT "id", "order", "parent_id", "path", "audit_evidence_id" FROM \`_disclosure_checklists_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_disclosure_checklists_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__disclosure_checklists_v_rels\` RENAME TO \`_disclosure_checklists_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_disclosure_checklists_v_rels_order_idx\` ON \`_disclosure_checklists_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_disclosure_checklists_v_rels_parent_idx\` ON \`_disclosure_checklists_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_disclosure_checklists_v_rels_path_idx\` ON \`_disclosure_checklists_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_disclosure_checklists_v_rels_audit_evidence_id_idx\` ON \`_disclosure_checklists_v_rels\` (\`audit_evidence_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_entity_types_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`compliance_frameworks_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`entity_types\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_frameworks_id\`) REFERENCES \`compliance_frameworks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_entity_types_rels\`("id", "order", "parent_id", "path", "compliance_frameworks_id") SELECT "id", "order", "parent_id", "path", "compliance_frameworks_id" FROM \`entity_types_rels\`;`)
  await db.run(sql`DROP TABLE \`entity_types_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_entity_types_rels\` RENAME TO \`entity_types_rels\`;`)
  await db.run(sql`CREATE INDEX \`entity_types_rels_order_idx\` ON \`entity_types_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`entity_types_rels_parent_idx\` ON \`entity_types_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`entity_types_rels_path_idx\` ON \`entity_types_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`entity_types_rels_compliance_frameworks_id_idx\` ON \`entity_types_rels\` (\`compliance_frameworks_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__entity_types_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`compliance_frameworks_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_entity_types_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_frameworks_id\`) REFERENCES \`compliance_frameworks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__entity_types_v_rels\`("id", "order", "parent_id", "path", "compliance_frameworks_id") SELECT "id", "order", "parent_id", "path", "compliance_frameworks_id" FROM \`_entity_types_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_entity_types_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__entity_types_v_rels\` RENAME TO \`_entity_types_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_entity_types_v_rels_order_idx\` ON \`_entity_types_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_entity_types_v_rels_parent_idx\` ON \`_entity_types_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_entity_types_v_rels_path_idx\` ON \`_entity_types_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_entity_types_v_rels_compliance_frameworks_id_idx\` ON \`_entity_types_v_rels\` (\`compliance_frameworks_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_internal_audit_function_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_committee_minutes_id\` text(36),
  	\`audit_findings_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`internal_audit_function\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_committee_minutes_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_internal_audit_function_rels\`("id", "order", "parent_id", "path", "audit_committee_minutes_id", "audit_findings_id") SELECT "id", "order", "parent_id", "path", "audit_committee_minutes_id", "audit_findings_id" FROM \`internal_audit_function_rels\`;`)
  await db.run(sql`DROP TABLE \`internal_audit_function_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_internal_audit_function_rels\` RENAME TO \`internal_audit_function_rels\`;`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_rels_order_idx\` ON \`internal_audit_function_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_rels_parent_idx\` ON \`internal_audit_function_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_rels_path_idx\` ON \`internal_audit_function_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_rels_audit_committee_minutes_id_idx\` ON \`internal_audit_function_rels\` (\`audit_committee_minutes_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_audit_function_rels_audit_findings_id_idx\` ON \`internal_audit_function_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__internal_audit_function_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_committee_minutes_id\` text(36),
  	\`audit_findings_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_internal_audit_function_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_committee_minutes_id\`) REFERENCES \`audit_committee_minutes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__internal_audit_function_v_rels\`("id", "order", "parent_id", "path", "audit_committee_minutes_id", "audit_findings_id") SELECT "id", "order", "parent_id", "path", "audit_committee_minutes_id", "audit_findings_id" FROM \`_internal_audit_function_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_internal_audit_function_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__internal_audit_function_v_rels\` RENAME TO \`_internal_audit_function_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_rels_order_idx\` ON \`_internal_audit_function_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_rels_parent_idx\` ON \`_internal_audit_function_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_rels_path_idx\` ON \`_internal_audit_function_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_rels_audit_committee_minutes__idx\` ON \`_internal_audit_function_v_rels\` (\`audit_committee_minutes_id\`);`)
  await db.run(sql`CREATE INDEX \`_internal_audit_function_v_rels_audit_findings_id_idx\` ON \`_internal_audit_function_v_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_internal_policies_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`internal_controls_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`internal_policies\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_internal_policies_rels\`("id", "order", "parent_id", "path", "internal_controls_id") SELECT "id", "order", "parent_id", "path", "internal_controls_id" FROM \`internal_policies_rels\`;`)
  await db.run(sql`DROP TABLE \`internal_policies_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_internal_policies_rels\` RENAME TO \`internal_policies_rels\`;`)
  await db.run(sql`CREATE INDEX \`internal_policies_rels_order_idx\` ON \`internal_policies_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`internal_policies_rels_parent_idx\` ON \`internal_policies_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`internal_policies_rels_path_idx\` ON \`internal_policies_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`internal_policies_rels_internal_controls_id_idx\` ON \`internal_policies_rels\` (\`internal_controls_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__internal_policies_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`internal_controls_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_internal_policies_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__internal_policies_v_rels\`("id", "order", "parent_id", "path", "internal_controls_id") SELECT "id", "order", "parent_id", "path", "internal_controls_id" FROM \`_internal_policies_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_internal_policies_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__internal_policies_v_rels\` RENAME TO \`_internal_policies_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_internal_policies_v_rels_order_idx\` ON \`_internal_policies_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_internal_policies_v_rels_parent_idx\` ON \`_internal_policies_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_internal_policies_v_rels_path_idx\` ON \`_internal_policies_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_internal_policies_v_rels_internal_controls_id_idx\` ON \`_internal_policies_v_rels\` (\`internal_controls_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_management_assessment_icfr_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_findings_id\` text(36),
  	\`control_tests_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`management_assessment_icfr\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`control_tests_id\`) REFERENCES \`control_tests\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_management_assessment_icfr_rels\`("id", "order", "parent_id", "path", "audit_findings_id", "control_tests_id") SELECT "id", "order", "parent_id", "path", "audit_findings_id", "control_tests_id" FROM \`management_assessment_icfr_rels\`;`)
  await db.run(sql`DROP TABLE \`management_assessment_icfr_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_management_assessment_icfr_rels\` RENAME TO \`management_assessment_icfr_rels\`;`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_rels_order_idx\` ON \`management_assessment_icfr_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_rels_parent_idx\` ON \`management_assessment_icfr_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_rels_path_idx\` ON \`management_assessment_icfr_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_rels_audit_findings_id_idx\` ON \`management_assessment_icfr_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE INDEX \`management_assessment_icfr_rels_control_tests_id_idx\` ON \`management_assessment_icfr_rels\` (\`control_tests_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__management_assessment_icfr_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_findings_id\` text(36),
  	\`control_tests_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_management_assessment_icfr_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`control_tests_id\`) REFERENCES \`control_tests\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__management_assessment_icfr_v_rels\`("id", "order", "parent_id", "path", "audit_findings_id", "control_tests_id") SELECT "id", "order", "parent_id", "path", "audit_findings_id", "control_tests_id" FROM \`_management_assessment_icfr_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_management_assessment_icfr_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__management_assessment_icfr_v_rels\` RENAME TO \`_management_assessment_icfr_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_v_rels_order_idx\` ON \`_management_assessment_icfr_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_v_rels_parent_idx\` ON \`_management_assessment_icfr_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_v_rels_path_idx\` ON \`_management_assessment_icfr_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_v_rels_audit_findings_id_idx\` ON \`_management_assessment_icfr_v_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE INDEX \`_management_assessment_icfr_v_rels_control_tests_id_idx\` ON \`_management_assessment_icfr_v_rels\` (\`control_tests_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_management_certifications_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_findings_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`management_certifications\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_management_certifications_rels\`("id", "order", "parent_id", "path", "audit_findings_id") SELECT "id", "order", "parent_id", "path", "audit_findings_id" FROM \`management_certifications_rels\`;`)
  await db.run(sql`DROP TABLE \`management_certifications_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_management_certifications_rels\` RENAME TO \`management_certifications_rels\`;`)
  await db.run(sql`CREATE INDEX \`management_certifications_rels_order_idx\` ON \`management_certifications_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`management_certifications_rels_parent_idx\` ON \`management_certifications_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`management_certifications_rels_path_idx\` ON \`management_certifications_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`management_certifications_rels_audit_findings_id_idx\` ON \`management_certifications_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__management_certifications_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_findings_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_management_certifications_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__management_certifications_v_rels\`("id", "order", "parent_id", "path", "audit_findings_id") SELECT "id", "order", "parent_id", "path", "audit_findings_id" FROM \`_management_certifications_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_management_certifications_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__management_certifications_v_rels\` RENAME TO \`_management_certifications_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_management_certifications_v_rels_order_idx\` ON \`_management_certifications_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_management_certifications_v_rels_parent_idx\` ON \`_management_certifications_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_management_certifications_v_rels_path_idx\` ON \`_management_certifications_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_management_certifications_v_rels_audit_findings_id_idx\` ON \`_management_certifications_v_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_regulatory_reports_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_findings_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`regulatory_reports\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_regulatory_reports_rels\`("id", "order", "parent_id", "path", "audit_findings_id") SELECT "id", "order", "parent_id", "path", "audit_findings_id" FROM \`regulatory_reports_rels\`;`)
  await db.run(sql`DROP TABLE \`regulatory_reports_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_regulatory_reports_rels\` RENAME TO \`regulatory_reports_rels\`;`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_rels_order_idx\` ON \`regulatory_reports_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_rels_parent_idx\` ON \`regulatory_reports_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_rels_path_idx\` ON \`regulatory_reports_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`regulatory_reports_rels_audit_findings_id_idx\` ON \`regulatory_reports_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__regulatory_reports_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`audit_findings_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_regulatory_reports_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__regulatory_reports_v_rels\`("id", "order", "parent_id", "path", "audit_findings_id") SELECT "id", "order", "parent_id", "path", "audit_findings_id" FROM \`_regulatory_reports_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_regulatory_reports_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__regulatory_reports_v_rels\` RENAME TO \`_regulatory_reports_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_rels_order_idx\` ON \`_regulatory_reports_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_rels_parent_idx\` ON \`_regulatory_reports_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_rels_path_idx\` ON \`_regulatory_reports_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_regulatory_reports_v_rels_audit_findings_id_idx\` ON \`_regulatory_reports_v_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_related_party_transactions_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`internal_controls_id\` text(36),
  	\`audit_evidence_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`related_party_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_evidence_id\`) REFERENCES \`audit_evidence\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_related_party_transactions_rels\`("id", "order", "parent_id", "path", "internal_controls_id", "audit_evidence_id") SELECT "id", "order", "parent_id", "path", "internal_controls_id", "audit_evidence_id" FROM \`related_party_transactions_rels\`;`)
  await db.run(sql`DROP TABLE \`related_party_transactions_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_related_party_transactions_rels\` RENAME TO \`related_party_transactions_rels\`;`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_rels_order_idx\` ON \`related_party_transactions_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_rels_parent_idx\` ON \`related_party_transactions_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_rels_path_idx\` ON \`related_party_transactions_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_rels_internal_controls_id_idx\` ON \`related_party_transactions_rels\` (\`internal_controls_id\`);`)
  await db.run(sql`CREATE INDEX \`related_party_transactions_rels_audit_evidence_id_idx\` ON \`related_party_transactions_rels\` (\`audit_evidence_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__related_party_transactions_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`internal_controls_id\` text(36),
  	\`audit_evidence_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_related_party_transactions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_evidence_id\`) REFERENCES \`audit_evidence\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__related_party_transactions_v_rels\`("id", "order", "parent_id", "path", "internal_controls_id", "audit_evidence_id") SELECT "id", "order", "parent_id", "path", "internal_controls_id", "audit_evidence_id" FROM \`_related_party_transactions_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_related_party_transactions_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__related_party_transactions_v_rels\` RENAME TO \`_related_party_transactions_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_related_party_transactions_v_rels_order_idx\` ON \`_related_party_transactions_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_related_party_transactions_v_rels_parent_idx\` ON \`_related_party_transactions_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_related_party_transactions_v_rels_path_idx\` ON \`_related_party_transactions_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_related_party_transactions_v_rels_internal_controls_id_idx\` ON \`_related_party_transactions_v_rels\` (\`internal_controls_id\`);`)
  await db.run(sql`CREATE INDEX \`_related_party_transactions_v_rels_audit_evidence_id_idx\` ON \`_related_party_transactions_v_rels\` (\`audit_evidence_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_risk_register_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`internal_controls_id\` text(36),
  	\`compliance_requirements_id\` text(36),
  	\`audit_findings_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`risk_register\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_requirements_id\`) REFERENCES \`compliance_requirements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_risk_register_rels\`("id", "order", "parent_id", "path", "internal_controls_id", "compliance_requirements_id", "audit_findings_id") SELECT "id", "order", "parent_id", "path", "internal_controls_id", "compliance_requirements_id", "audit_findings_id" FROM \`risk_register_rels\`;`)
  await db.run(sql`DROP TABLE \`risk_register_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_risk_register_rels\` RENAME TO \`risk_register_rels\`;`)
  await db.run(sql`CREATE INDEX \`risk_register_rels_order_idx\` ON \`risk_register_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`risk_register_rels_parent_idx\` ON \`risk_register_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`risk_register_rels_path_idx\` ON \`risk_register_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`risk_register_rels_internal_controls_id_idx\` ON \`risk_register_rels\` (\`internal_controls_id\`);`)
  await db.run(sql`CREATE INDEX \`risk_register_rels_compliance_requirements_id_idx\` ON \`risk_register_rels\` (\`compliance_requirements_id\`);`)
  await db.run(sql`CREATE INDEX \`risk_register_rels_audit_findings_id_idx\` ON \`risk_register_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__risk_register_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`internal_controls_id\` text(36),
  	\`compliance_requirements_id\` text(36),
  	\`audit_findings_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_risk_register_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`internal_controls_id\`) REFERENCES \`internal_controls\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`compliance_requirements_id\`) REFERENCES \`compliance_requirements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__risk_register_v_rels\`("id", "order", "parent_id", "path", "internal_controls_id", "compliance_requirements_id", "audit_findings_id") SELECT "id", "order", "parent_id", "path", "internal_controls_id", "compliance_requirements_id", "audit_findings_id" FROM \`_risk_register_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_risk_register_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__risk_register_v_rels\` RENAME TO \`_risk_register_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_risk_register_v_rels_order_idx\` ON \`_risk_register_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_risk_register_v_rels_parent_idx\` ON \`_risk_register_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_risk_register_v_rels_path_idx\` ON \`_risk_register_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_risk_register_v_rels_internal_controls_id_idx\` ON \`_risk_register_v_rels\` (\`internal_controls_id\`);`)
  await db.run(sql`CREATE INDEX \`_risk_register_v_rels_compliance_requirements_id_idx\` ON \`_risk_register_v_rels\` (\`compliance_requirements_id\`);`)
  await db.run(sql`CREATE INDEX \`_risk_register_v_rels_audit_findings_id_idx\` ON \`_risk_register_v_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_segment_reporting_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`disclosure_checklists_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`segment_reporting\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`disclosure_checklists_id\`) REFERENCES \`disclosure_checklists\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_segment_reporting_rels\`("id", "order", "parent_id", "path", "disclosure_checklists_id") SELECT "id", "order", "parent_id", "path", "disclosure_checklists_id" FROM \`segment_reporting_rels\`;`)
  await db.run(sql`DROP TABLE \`segment_reporting_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_segment_reporting_rels\` RENAME TO \`segment_reporting_rels\`;`)
  await db.run(sql`CREATE INDEX \`segment_reporting_rels_order_idx\` ON \`segment_reporting_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`segment_reporting_rels_parent_idx\` ON \`segment_reporting_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`segment_reporting_rels_path_idx\` ON \`segment_reporting_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`segment_reporting_rels_disclosure_checklists_id_idx\` ON \`segment_reporting_rels\` (\`disclosure_checklists_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__segment_reporting_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`disclosure_checklists_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_segment_reporting_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`disclosure_checklists_id\`) REFERENCES \`disclosure_checklists\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__segment_reporting_v_rels\`("id", "order", "parent_id", "path", "disclosure_checklists_id") SELECT "id", "order", "parent_id", "path", "disclosure_checklists_id" FROM \`_segment_reporting_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_segment_reporting_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__segment_reporting_v_rels\` RENAME TO \`_segment_reporting_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_segment_reporting_v_rels_order_idx\` ON \`_segment_reporting_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_segment_reporting_v_rels_parent_idx\` ON \`_segment_reporting_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_segment_reporting_v_rels_path_idx\` ON \`_segment_reporting_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_segment_reporting_v_rels_disclosure_checklists_id_idx\` ON \`_segment_reporting_v_rels\` (\`disclosure_checklists_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_fair_value_measurements_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`fixed_assets_id\` text(36),
  	\`investment_properties_id\` text(36),
  	\`biological_assets_id\` text(36),
  	\`fx_transactions_id\` text(36),
  	\`share_based_payments_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`fair_value_measurements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fixed_assets_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`investment_properties_id\`) REFERENCES \`investment_properties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`biological_assets_id\`) REFERENCES \`biological_assets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fx_transactions_id\`) REFERENCES \`fx_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`share_based_payments_id\`) REFERENCES \`share_based_payments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_fair_value_measurements_rels\`("id", "order", "parent_id", "path", "fixed_assets_id", "investment_properties_id", "biological_assets_id", "fx_transactions_id", "share_based_payments_id") SELECT "id", "order", "parent_id", "path", "fixed_assets_id", "investment_properties_id", "biological_assets_id", "fx_transactions_id", "share_based_payments_id" FROM \`fair_value_measurements_rels\`;`)
  await db.run(sql`DROP TABLE \`fair_value_measurements_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_fair_value_measurements_rels\` RENAME TO \`fair_value_measurements_rels\`;`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_rels_order_idx\` ON \`fair_value_measurements_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_rels_parent_idx\` ON \`fair_value_measurements_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_rels_path_idx\` ON \`fair_value_measurements_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_rels_fixed_assets_id_idx\` ON \`fair_value_measurements_rels\` (\`fixed_assets_id\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_rels_investment_properties_id_idx\` ON \`fair_value_measurements_rels\` (\`investment_properties_id\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_rels_biological_assets_id_idx\` ON \`fair_value_measurements_rels\` (\`biological_assets_id\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_rels_fx_transactions_id_idx\` ON \`fair_value_measurements_rels\` (\`fx_transactions_id\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_rels_share_based_payments_id_idx\` ON \`fair_value_measurements_rels\` (\`share_based_payments_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__fair_value_measurements_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`fixed_assets_id\` text(36),
  	\`investment_properties_id\` text(36),
  	\`biological_assets_id\` text(36),
  	\`fx_transactions_id\` text(36),
  	\`share_based_payments_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_fair_value_measurements_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fixed_assets_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`investment_properties_id\`) REFERENCES \`investment_properties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`biological_assets_id\`) REFERENCES \`biological_assets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fx_transactions_id\`) REFERENCES \`fx_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`share_based_payments_id\`) REFERENCES \`share_based_payments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__fair_value_measurements_v_rels\`("id", "order", "parent_id", "path", "fixed_assets_id", "investment_properties_id", "biological_assets_id", "fx_transactions_id", "share_based_payments_id") SELECT "id", "order", "parent_id", "path", "fixed_assets_id", "investment_properties_id", "biological_assets_id", "fx_transactions_id", "share_based_payments_id" FROM \`_fair_value_measurements_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_fair_value_measurements_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__fair_value_measurements_v_rels\` RENAME TO \`_fair_value_measurements_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_fair_value_measurements_v_rels_order_idx\` ON \`_fair_value_measurements_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_fair_value_measurements_v_rels_parent_idx\` ON \`_fair_value_measurements_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_fair_value_measurements_v_rels_path_idx\` ON \`_fair_value_measurements_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_fair_value_measurements_v_rels_fixed_assets_id_idx\` ON \`_fair_value_measurements_v_rels\` (\`fixed_assets_id\`);`)
  await db.run(sql`CREATE INDEX \`_fair_value_measurements_v_rels_investment_properties_id_idx\` ON \`_fair_value_measurements_v_rels\` (\`investment_properties_id\`);`)
  await db.run(sql`CREATE INDEX \`_fair_value_measurements_v_rels_biological_assets_id_idx\` ON \`_fair_value_measurements_v_rels\` (\`biological_assets_id\`);`)
  await db.run(sql`CREATE INDEX \`_fair_value_measurements_v_rels_fx_transactions_id_idx\` ON \`_fair_value_measurements_v_rels\` (\`fx_transactions_id\`);`)
  await db.run(sql`CREATE INDEX \`_fair_value_measurements_v_rels_share_based_payments_id_idx\` ON \`_fair_value_measurements_v_rels\` (\`share_based_payments_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_held_for_sale_classifications_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`fixed_assets_id\` text(36),
  	\`investment_properties_id\` text(36),
  	\`business_combinations_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`held_for_sale_classifications\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fixed_assets_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`investment_properties_id\`) REFERENCES \`investment_properties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`business_combinations_id\`) REFERENCES \`business_combinations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_held_for_sale_classifications_rels\`("id", "order", "parent_id", "path", "fixed_assets_id", "investment_properties_id", "business_combinations_id") SELECT "id", "order", "parent_id", "path", "fixed_assets_id", "investment_properties_id", "business_combinations_id" FROM \`held_for_sale_classifications_rels\`;`)
  await db.run(sql`DROP TABLE \`held_for_sale_classifications_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_held_for_sale_classifications_rels\` RENAME TO \`held_for_sale_classifications_rels\`;`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_rels_order_idx\` ON \`held_for_sale_classifications_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_rels_parent_idx\` ON \`held_for_sale_classifications_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_rels_path_idx\` ON \`held_for_sale_classifications_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_rels_fixed_assets_id_idx\` ON \`held_for_sale_classifications_rels\` (\`fixed_assets_id\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_rels_investment_properties_idx\` ON \`held_for_sale_classifications_rels\` (\`investment_properties_id\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_rels_business_combinations_idx\` ON \`held_for_sale_classifications_rels\` (\`business_combinations_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__held_for_sale_classifications_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`fixed_assets_id\` text(36),
  	\`investment_properties_id\` text(36),
  	\`business_combinations_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_held_for_sale_classifications_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fixed_assets_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`investment_properties_id\`) REFERENCES \`investment_properties\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`business_combinations_id\`) REFERENCES \`business_combinations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__held_for_sale_classifications_v_rels\`("id", "order", "parent_id", "path", "fixed_assets_id", "investment_properties_id", "business_combinations_id") SELECT "id", "order", "parent_id", "path", "fixed_assets_id", "investment_properties_id", "business_combinations_id" FROM \`_held_for_sale_classifications_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_held_for_sale_classifications_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__held_for_sale_classifications_v_rels\` RENAME TO \`_held_for_sale_classifications_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_rels_order_idx\` ON \`_held_for_sale_classifications_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_rels_parent_idx\` ON \`_held_for_sale_classifications_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_rels_path_idx\` ON \`_held_for_sale_classifications_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_rels_fixed_assets_id_idx\` ON \`_held_for_sale_classifications_v_rels\` (\`fixed_assets_id\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_rels_investment_propert_idx\` ON \`_held_for_sale_classifications_v_rels\` (\`investment_properties_id\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_rels_business_combinati_idx\` ON \`_held_for_sale_classifications_v_rels\` (\`business_combinations_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_contracts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`contracts_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`contracts_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_contracts_rels\`("id", "order", "parent_id", "path", "contracts_id") SELECT "id", "order", "parent_id", "path", "contracts_id" FROM \`contracts_rels\`;`)
  await db.run(sql`DROP TABLE \`contracts_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_contracts_rels\` RENAME TO \`contracts_rels\`;`)
  await db.run(sql`CREATE INDEX \`contracts_rels_order_idx\` ON \`contracts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`contracts_rels_parent_idx\` ON \`contracts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contracts_rels_path_idx\` ON \`contracts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`contracts_rels_contracts_id_idx\` ON \`contracts_rels\` (\`contracts_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__contracts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`contracts_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_contracts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`contracts_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__contracts_v_rels\`("id", "order", "parent_id", "path", "contracts_id") SELECT "id", "order", "parent_id", "path", "contracts_id" FROM \`_contracts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_contracts_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__contracts_v_rels\` RENAME TO \`_contracts_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_contracts_v_rels_order_idx\` ON \`_contracts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_contracts_v_rels_parent_idx\` ON \`_contracts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_contracts_v_rels_path_idx\` ON \`_contracts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_contracts_v_rels_contracts_id_idx\` ON \`_contracts_v_rels\` (\`contracts_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_project_tasks_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`project_tasks_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`project_tasks\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`project_tasks_id\`) REFERENCES \`project_tasks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_project_tasks_rels\`("id", "order", "parent_id", "path", "project_tasks_id") SELECT "id", "order", "parent_id", "path", "project_tasks_id" FROM \`project_tasks_rels\`;`)
  await db.run(sql`DROP TABLE \`project_tasks_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_project_tasks_rels\` RENAME TO \`project_tasks_rels\`;`)
  await db.run(sql`CREATE INDEX \`project_tasks_rels_order_idx\` ON \`project_tasks_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`project_tasks_rels_parent_idx\` ON \`project_tasks_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`project_tasks_rels_path_idx\` ON \`project_tasks_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`project_tasks_rels_project_tasks_id_idx\` ON \`project_tasks_rels\` (\`project_tasks_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__project_tasks_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`project_tasks_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_project_tasks_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`project_tasks_id\`) REFERENCES \`project_tasks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__project_tasks_v_rels\`("id", "order", "parent_id", "path", "project_tasks_id") SELECT "id", "order", "parent_id", "path", "project_tasks_id" FROM \`_project_tasks_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_project_tasks_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__project_tasks_v_rels\` RENAME TO \`_project_tasks_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_project_tasks_v_rels_order_idx\` ON \`_project_tasks_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_project_tasks_v_rels_parent_idx\` ON \`_project_tasks_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_project_tasks_v_rels_path_idx\` ON \`_project_tasks_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_project_tasks_v_rels_project_tasks_id_idx\` ON \`_project_tasks_v_rels\` (\`project_tasks_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_standards_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`standards_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`standards\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`standards_id\`) REFERENCES \`standards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_standards_rels\`("id", "order", "parent_id", "path", "standards_id") SELECT "id", "order", "parent_id", "path", "standards_id" FROM \`standards_rels\`;`)
  await db.run(sql`DROP TABLE \`standards_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_standards_rels\` RENAME TO \`standards_rels\`;`)
  await db.run(sql`CREATE INDEX \`standards_rels_order_idx\` ON \`standards_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`standards_rels_parent_idx\` ON \`standards_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`standards_rels_path_idx\` ON \`standards_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`standards_rels_standards_id_idx\` ON \`standards_rels\` (\`standards_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__standards_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`standards_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_standards_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`standards_id\`) REFERENCES \`standards\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__standards_v_rels\`("id", "order", "parent_id", "path", "standards_id") SELECT "id", "order", "parent_id", "path", "standards_id" FROM \`_standards_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_standards_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__standards_v_rels\` RENAME TO \`_standards_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_standards_v_rels_order_idx\` ON \`_standards_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_standards_v_rels_parent_idx\` ON \`_standards_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_standards_v_rels_path_idx\` ON \`_standards_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_standards_v_rels_standards_id_idx\` ON \`_standards_v_rels\` (\`standards_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_redirects_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_redirects_rels\`("id", "order", "parent_id", "path", "pages_id", "posts_id") SELECT "id", "order", "parent_id", "path", "pages_id", "posts_id" FROM \`redirects_rels\`;`)
  await db.run(sql`DROP TABLE \`redirects_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_redirects_rels\` RENAME TO \`redirects_rels\`;`)
  await db.run(sql`CREATE INDEX \`redirects_rels_order_idx\` ON \`redirects_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_parent_idx\` ON \`redirects_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_path_idx\` ON \`redirects_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_pages_id_idx\` ON \`redirects_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_posts_id_idx\` ON \`redirects_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__redirects_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_redirects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__redirects_v_rels\`("id", "order", "parent_id", "path", "pages_id", "posts_id") SELECT "id", "order", "parent_id", "path", "pages_id", "posts_id" FROM \`_redirects_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_redirects_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__redirects_v_rels\` RENAME TO \`_redirects_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_redirects_v_rels_order_idx\` ON \`_redirects_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_redirects_v_rels_parent_idx\` ON \`_redirects_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_redirects_v_rels_path_idx\` ON \`_redirects_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_redirects_v_rels_pages_id_idx\` ON \`_redirects_v_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`_redirects_v_rels_posts_id_idx\` ON \`_redirects_v_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_header_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_header_rels\`("id", "order", "parent_id", "path", "pages_id", "posts_id") SELECT "id", "order", "parent_id", "path", "pages_id", "posts_id" FROM \`header_rels\`;`)
  await db.run(sql`DROP TABLE \`header_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_header_rels\` RENAME TO \`header_rels\`;`)
  await db.run(sql`CREATE INDEX \`header_rels_order_idx\` ON \`header_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_parent_idx\` ON \`header_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_path_idx\` ON \`header_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_pages_id_idx\` ON \`header_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_posts_id_idx\` ON \`header_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_footer_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` text(36),
  	\`posts_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_footer_rels\`("id", "order", "parent_id", "path", "pages_id", "posts_id") SELECT "id", "order", "parent_id", "path", "pages_id", "posts_id" FROM \`footer_rels\`;`)
  await db.run(sql`DROP TABLE \`footer_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_footer_rels\` RENAME TO \`footer_rels\`;`)
  await db.run(sql`CREATE INDEX \`footer_rels_order_idx\` ON \`footer_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_parent_idx\` ON \`footer_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_path_idx\` ON \`footer_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_pages_id_idx\` ON \`footer_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_posts_id_idx\` ON \`footer_rels\` (\`posts_id\`);`)
  await db.run(sql`DROP INDEX \`tenant_slug_idx\`;`)
  await db.run(sql`DROP INDEX \`categories_slug_idx\`;`)
  await db.run(sql`ALTER TABLE \`categories\` ADD \`generate_slug\` integer DEFAULT true;`)
  await db.run(sql`CREATE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`DROP INDEX \`version_tenant_version_slug_idx\`;`)
  await db.run(sql`ALTER TABLE \`_categories_v\` ADD \`version_generate_slug\` integer DEFAULT true;`)
  await db.run(sql`DROP INDEX \`media_original_original_filename_idx\`;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`focal_x\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`focal_y\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_url\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_thumbnail_filename\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_square_url\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_square_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_square_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_square_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_square_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_square_filename\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_small_url\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_small_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_small_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_small_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_small_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_small_filename\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_medium_url\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_medium_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_medium_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_medium_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_medium_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_medium_filename\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_large_url\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_large_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_large_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_large_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_large_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_large_filename\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_xlarge_url\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_xlarge_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_xlarge_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_xlarge_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_xlarge_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_xlarge_filename\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_og_url\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_og_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_og_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_og_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_og_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`sizes_og_filename\` text;`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_square_sizes_square_filename_idx\` ON \`media\` (\`sizes_square_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_small_sizes_small_filename_idx\` ON \`media\` (\`sizes_small_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_medium_sizes_medium_filename_idx\` ON \`media\` (\`sizes_medium_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_large_sizes_large_filename_idx\` ON \`media\` (\`sizes_large_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_xlarge_sizes_xlarge_filename_idx\` ON \`media\` (\`sizes_xlarge_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_og_sizes_og_filename_idx\` ON \`media\` (\`sizes_og_filename\`);`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`prefix\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`_objectkey\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`_stored\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`_transforms\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_filename\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_url\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_filesize\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_width\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_height\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original_prefix\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original__objectkey\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`original__stored\`;`)
  await db.run(sql`DROP INDEX \`_media_v_version_original_version_original_filename_idx\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_focal_x\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_focal_y\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_thumbnail_url\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_thumbnail_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_thumbnail_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_thumbnail_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_thumbnail_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_thumbnail_filename\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_square_url\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_square_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_square_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_square_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_square_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_square_filename\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_small_url\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_small_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_small_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_small_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_small_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_small_filename\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_medium_url\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_medium_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_medium_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_medium_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_medium_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_medium_filename\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_large_url\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_large_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_large_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_large_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_large_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_large_filename\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_xlarge_url\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_xlarge_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_xlarge_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_xlarge_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_xlarge_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_xlarge_filename\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_og_url\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_og_width\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_og_height\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_og_mime_type\` text;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_og_filesize\` numeric;`)
  await db.run(sql`ALTER TABLE \`_media_v\` ADD \`version_sizes_og_filename\` text;`)
  await db.run(sql`CREATE INDEX \`_media_v_version_sizes_thumbnail_version_sizes_thumbnail_idx\` ON \`_media_v\` (\`version_sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_sizes_square_version_sizes_square_filen_idx\` ON \`_media_v\` (\`version_sizes_square_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_sizes_small_version_sizes_small_filenam_idx\` ON \`_media_v\` (\`version_sizes_small_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_sizes_medium_version_sizes_medium_filen_idx\` ON \`_media_v\` (\`version_sizes_medium_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_sizes_large_version_sizes_large_filenam_idx\` ON \`_media_v\` (\`version_sizes_large_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_sizes_xlarge_version_sizes_xlarge_filen_idx\` ON \`_media_v\` (\`version_sizes_xlarge_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_sizes_og_version_sizes_og_filename_idx\` ON \`_media_v\` (\`version_sizes_og_filename\`);`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_prefix\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version__objectkey\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version__stored\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version__transforms\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_original_filename\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_original_url\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_original_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_original_filesize\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_original_width\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_original_height\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_original_prefix\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_original__objectkey\`;`)
  await db.run(sql`ALTER TABLE \`_media_v\` DROP COLUMN \`version_original__stored\`;`)
  await db.run(sql`DROP INDEX \`tenant_slug_1_idx\`;`)
  await db.run(sql`DROP INDEX \`pages_slug_idx\`;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`generate_slug\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`pages\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`DROP INDEX \`pages__status_idx\`;`)
  await db.run(sql`DROP INDEX \`pages_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_locales_locale_parent_id_unique\` ON \`pages_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`pages_locales\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`version_tenant_version_slug_1_idx\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_generate_slug\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version__status\` text DEFAULT 'draft';`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`snapshot\` integer;`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_snapshot_idx\` ON \`_pages_v\` (\`snapshot\`);`)
  await db.run(sql`DROP INDEX \`_pages_v_version_version__status_idx\`;`)
  await db.run(sql`DROP INDEX \`_pages_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_locales_locale_parent_id_unique\` ON \`_pages_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`_pages_v_locales\` DROP COLUMN \`version__status\`;`)
  await db.run(sql`DROP INDEX \`tenant_slug_2_idx\`;`)
  await db.run(sql`DROP INDEX \`posts_slug_idx\`;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`generate_slug\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts\` (\`_status\`);`)
  await db.run(sql`CREATE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`DROP INDEX \`posts__status_idx\`;`)
  await db.run(sql`DROP INDEX \`posts_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_locales_locale_parent_id_unique\` ON \`posts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`posts_locales\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`version_tenant_version_slug_2_idx\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_generate_slug\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version__status\` text DEFAULT 'draft';`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`snapshot\` integer;`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_snapshot_idx\` ON \`_posts_v\` (\`snapshot\`);`)
  await db.run(sql`DROP INDEX \`_posts_v_version_version__status_idx\`;`)
  await db.run(sql`DROP INDEX \`_posts_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_locales_locale_parent_id_unique\` ON \`_posts_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`_posts_v_locales\` DROP COLUMN \`version__status\`;`)
  await db.run(sql`DROP INDEX \`activities_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`activities_locales_locale_parent_id_unique\` ON \`activities_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_activities_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_activities_v_locales_locale_parent_id_unique\` ON \`_activities_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`bookings_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`bookings_locales_locale_parent_id_unique\` ON \`bookings_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_bookings_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_bookings_v_locales_locale_parent_id_unique\` ON \`_bookings_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`customer_segments_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`customer_segments_locales_locale_parent_id_unique\` ON \`customer_segments_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_customer_segments_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_customer_segments_v_locales_locale_parent_id_unique\` ON \`_customer_segments_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`dunning_cycles_history_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`dunning_cycles_history_locales_locale_parent_id_unique\` ON \`dunning_cycles_history_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_dunning_cycles_v_version_history_locales_parent_id_locale_u\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_dunning_cycles_v_version_history_locales_locale_parent_id_u\` ON \`_dunning_cycles_v_version_history_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`goods_receipts_lines_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`goods_receipts_lines_locales_locale_parent_id_unique\` ON \`goods_receipts_lines_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_goods_receipts_v_version_lines_locales_parent_id_locale_uni\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_goods_receipts_v_version_lines_locales_locale_parent_id_uni\` ON \`_goods_receipts_v_version_lines_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`opportunities_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`opportunities_locales_locale_parent_id_unique\` ON \`opportunities_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_opportunities_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_opportunities_v_locales_locale_parent_id_unique\` ON \`_opportunities_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`project_milestones_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`project_milestones_locales_locale_parent_id_unique\` ON \`project_milestones_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_project_milestones_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_project_milestones_v_locales_locale_parent_id_unique\` ON \`_project_milestones_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`account_reconciliations_external_adjus_79d3f9d1_locales_pare\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`account_reconciliations_external_adjus_79d3f9d1_locales_loca\` ON \`account_reconciliations_external_adjus_79d3f9d1_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`account_reconciliations_gl_adjustments_locales_parent_id_loc\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`account_reconciliations_gl_adjustments_locales_locale_parent\` ON \`account_reconciliations_gl_adjustments_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`account_reconciliations_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`account_reconciliations_locales_locale_parent_id_unique\` ON \`account_reconciliations_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_account_reconciliations_external_adjus_79d3f9d1_v_locales_p\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_account_reconciliations_external_adjus_79d3f9d1_v_locales_l\` ON \`_account_reconciliations_external_adjus_79d3f9d1_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_account_reconciliations_v_version_gl_adjustments_locales_pa\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_account_reconciliations_v_version_gl_adjustments_locales_lo\` ON \`_account_reconciliations_v_version_gl_adjustments_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_account_reconciliations_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_account_reconciliations_v_locales_locale_parent_id_unique\` ON \`_account_reconciliations_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`bank_reconciliations_reconciling_items_locales_parent_id_loc\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`bank_reconciliations_reconciling_items_locales_locale_parent\` ON \`bank_reconciliations_reconciling_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_bank_reconciliations_v_version_reconciling_items_locales_pa\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_bank_reconciliations_v_version_reconciling_items_locales_lo\` ON \`_bank_reconciliations_v_version_reconciling_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`bank_statements_transactions_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`bank_statements_transactions_locales_locale_parent_id_unique\` ON \`bank_statements_transactions_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_bank_statements_v_version_transactions_locales_parent_id_lo\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_bank_statements_v_version_transactions_locales_locale_paren\` ON \`_bank_statements_v_version_transactions_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`bookable_resources_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`bookable_resources_locales_locale_parent_id_unique\` ON \`bookable_resources_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_bookable_resources_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_bookable_resources_v_locales_locale_parent_id_unique\` ON \`_bookable_resources_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`gl_accounts_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`gl_accounts_locales_locale_parent_id_unique\` ON \`gl_accounts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_gl_accounts_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_gl_accounts_v_locales_locale_parent_id_unique\` ON \`_gl_accounts_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`journal_entries_lines_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`journal_entries_lines_locales_locale_parent_id_unique\` ON \`journal_entries_lines_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`journal_entries_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`journal_entries_locales_locale_parent_id_unique\` ON \`journal_entries_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_journal_entries_v_version_lines_locales_parent_id_locale_un\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_journal_entries_v_version_lines_locales_locale_parent_id_un\` ON \`_journal_entries_v_version_lines_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_journal_entries_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_journal_entries_v_locales_locale_parent_id_unique\` ON \`_journal_entries_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`period_end_adjustments_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`period_end_adjustments_locales_locale_parent_id_unique\` ON \`period_end_adjustments_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_period_end_adjustments_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_period_end_adjustments_v_locales_locale_parent_id_unique\` ON \`_period_end_adjustments_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`post_balance_sheet_events_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`post_balance_sheet_events_locales_locale_parent_id_unique\` ON \`post_balance_sheet_events_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_post_balance_sheet_events_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_post_balance_sheet_events_v_locales_locale_parent_id_unique\` ON \`_post_balance_sheet_events_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`cost_centers_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`cost_centers_locales_locale_parent_id_unique\` ON \`cost_centers_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_cost_centers_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_cost_centers_v_locales_locale_parent_id_unique\` ON \`_cost_centers_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`er_lines_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`er_lines_locales_locale_parent_id_unique\` ON \`er_lines_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`er_approval_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`er_approval_locales_locale_parent_id_unique\` ON \`er_approval_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_er_lines_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_er_lines_v_locales_locale_parent_id_unique\` ON \`_er_lines_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_er_approval_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_er_approval_v_locales_locale_parent_id_unique\` ON \`_er_approval_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`leave_requests_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`leave_requests_locales_locale_parent_id_unique\` ON \`leave_requests_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_leave_requests_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_leave_requests_v_locales_locale_parent_id_unique\` ON \`_leave_requests_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`maintenance_work_orders_photos_locales_parent_id_locale_uniq\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`maintenance_work_orders_photos_locales_locale_parent_id_uniq\` ON \`maintenance_work_orders_photos_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`mwo_parts_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`mwo_parts_locales_locale_parent_id_unique\` ON \`mwo_parts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`maintenance_work_orders_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`maintenance_work_orders_locales_locale_parent_id_unique\` ON \`maintenance_work_orders_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_maintenance_work_orders_v_version_photos_locales_parent_id_\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_maintenance_work_orders_v_version_photos_locales_locale_par\` ON \`_maintenance_work_orders_v_version_photos_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_mwo_parts_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_mwo_parts_v_locales_locale_parent_id_unique\` ON \`_mwo_parts_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_maintenance_work_orders_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_maintenance_work_orders_v_locales_locale_parent_id_unique\` ON \`_maintenance_work_orders_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`pr_comp_rating_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`pr_comp_rating_locales_locale_parent_id_unique\` ON \`pr_comp_rating_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_pr_comp_rating_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_pr_comp_rating_v_locales_locale_parent_id_unique\` ON \`_pr_comp_rating_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`bills_of_materials_operations_locales_parent_id_locale_uniqu\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`bills_of_materials_operations_locales_locale_parent_id_uniqu\` ON \`bills_of_materials_operations_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_bills_of_materials_v_version_operations_locales_parent_id_l\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_bills_of_materials_v_version_operations_locales_locale_pare\` ON \`_bills_of_materials_v_version_operations_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`carriers_service_levels_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`carriers_service_levels_locales_locale_parent_id_unique\` ON \`carriers_service_levels_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_carriers_v_version_service_levels_locales_parent_id_locale_\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_carriers_v_version_service_levels_locales_locale_parent_id_\` ON \`_carriers_v_version_service_levels_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`warehouse_locations_bins_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`warehouse_locations_bins_locales_locale_parent_id_unique\` ON \`warehouse_locations_bins_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`warehouse_locations_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`warehouse_locations_locales_locale_parent_id_unique\` ON \`warehouse_locations_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_warehouse_locations_v_version_bins_locales_parent_id_locale\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_warehouse_locations_v_version_bins_locales_locale_parent_id\` ON \`_warehouse_locations_v_version_bins_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_warehouse_locations_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_warehouse_locations_v_locales_locale_parent_id_unique\` ON \`_warehouse_locations_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`bc_ppa_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`bc_ppa_locales_locale_parent_id_unique\` ON \`bc_ppa_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_bc_ppa_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_bc_ppa_v_locales_locale_parent_id_unique\` ON \`_bc_ppa_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`fixed_assets_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`fixed_assets_locales_locale_parent_id_unique\` ON \`fixed_assets_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_fixed_assets_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_fixed_assets_v_locales_locale_parent_id_unique\` ON \`_fixed_assets_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`leases_modifications_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`leases_modifications_locales_locale_parent_id_unique\` ON \`leases_modifications_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_leases_v_version_modifications_locales_parent_id_locale_uni\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_leases_v_version_modifications_locales_locale_parent_id_uni\` ON \`_leases_v_version_modifications_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`properties_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`properties_locales_locale_parent_id_unique\` ON \`properties_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_properties_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_properties_v_locales_locale_parent_id_unique\` ON \`_properties_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`spaces_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`spaces_locales_locale_parent_id_unique\` ON \`spaces_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_spaces_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_spaces_v_locales_locale_parent_id_unique\` ON \`_spaces_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`budget_planning_budget_line_items_locales_parent_id_locale_u\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`budget_planning_budget_line_items_locales_locale_parent_id_u\` ON \`budget_planning_budget_line_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_budget_planning_v_version_budget_line_items_locales_parent_\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_budget_planning_v_version_budget_line_items_locales_locale_\` ON \`_budget_planning_v_version_budget_line_items_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`contracts_modifications_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`contracts_modifications_locales_locale_parent_id_unique\` ON \`contracts_modifications_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`contracts_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`contracts_locales_locale_parent_id_unique\` ON \`contracts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_contracts_v_version_modifications_locales_parent_id_locale_\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_contracts_v_version_modifications_locales_locale_parent_id_\` ON \`_contracts_v_version_modifications_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_contracts_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_contracts_v_locales_locale_parent_id_unique\` ON \`_contracts_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`performance_obligations_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`performance_obligations_locales_locale_parent_id_unique\` ON \`performance_obligations_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_performance_obligations_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_performance_obligations_v_locales_locale_parent_id_unique\` ON \`_performance_obligations_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`project_tasks_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`project_tasks_locales_locale_parent_id_unique\` ON \`project_tasks_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_project_tasks_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_project_tasks_v_locales_locale_parent_id_unique\` ON \`_project_tasks_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`projects_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`projects_locales_locale_parent_id_unique\` ON \`projects_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_projects_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_projects_v_locales_locale_parent_id_unique\` ON \`_projects_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`recurring_journals_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`recurring_journals_locales_locale_parent_id_unique\` ON \`recurring_journals_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_recurring_journals_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_recurring_journals_v_locales_locale_parent_id_unique\` ON \`_recurring_journals_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`wf_steps_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`wf_steps_locales_locale_parent_id_unique\` ON \`wf_steps_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`workflow_definitions_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`workflow_definitions_locales_locale_parent_id_unique\` ON \`workflow_definitions_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_wf_steps_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_wf_steps_v_locales_locale_parent_id_unique\` ON \`_wf_steps_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_workflow_definitions_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_workflow_definitions_v_locales_locale_parent_id_unique\` ON \`_workflow_definitions_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`wfi_history_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`wfi_history_locales_locale_parent_id_unique\` ON \`wfi_history_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_wfi_history_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_wfi_history_v_locales_locale_parent_id_unique\` ON \`_wfi_history_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`data_processing_activities_recipient_c_d5b0fb68_locales_pare\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`data_processing_activities_recipient_c_d5b0fb68_locales_loca\` ON \`data_processing_activities_recipient_c_d5b0fb68_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_data_processing_activities_recipient_c_d5b0fb68_v_locales_p\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_data_processing_activities_recipient_c_d5b0fb68_v_locales_l\` ON \`_data_processing_activities_recipient_c_d5b0fb68_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`data_subject_requests_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`data_subject_requests_locales_locale_parent_id_unique\` ON \`data_subject_requests_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_data_subject_requests_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_data_subject_requests_v_locales_locale_parent_id_unique\` ON \`_data_subject_requests_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`standards_conflicts_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`standards_conflicts_locales_locale_parent_id_unique\` ON \`standards_conflicts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_standards_v_version_conflicts_locales_parent_id_locale_uniq\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_standards_v_version_conflicts_locales_locale_parent_id_uniq\` ON \`_standards_v_version_conflicts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`translations_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`translations_locales_locale_parent_id_unique\` ON \`translations_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_translations_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_translations_v_locales_locale_parent_id_unique\` ON \`_translations_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`products__status_idx\`;`)
  await db.run(sql`DROP INDEX \`products_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`products_locales_locale_parent_id_unique\` ON \`products_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`products_locales\` DROP COLUMN \`_status\`;`)
  await db.run(sql`DROP INDEX \`_products_v_version_version__status_idx\`;`)
  await db.run(sql`DROP INDEX \`_products_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_products_v_locales_locale_parent_id_unique\` ON \`_products_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`_products_v_locales\` DROP COLUMN \`version__status\`;`)
  await db.run(sql`DROP INDEX \`orders_lines_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_lines_locales_locale_parent_id_unique\` ON \`orders_lines_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`orders_approval_chain_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_approval_chain_locales_locale_parent_id_unique\` ON \`orders_approval_chain_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`orders_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_locales_locale_parent_id_unique\` ON \`orders_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_orders_v_version_lines_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_orders_v_version_lines_locales_locale_parent_id_unique\` ON \`_orders_v_version_lines_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_orders_v_version_approval_chain_locales_parent_id_locale_un\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_orders_v_version_approval_chain_locales_locale_parent_id_un\` ON \`_orders_v_version_approval_chain_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_orders_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_orders_v_locales_locale_parent_id_unique\` ON \`_orders_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`forms_blocks_checkbox_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_checkbox_locales_locale_parent_id_unique\` ON \`forms_blocks_checkbox_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`forms_blocks_country_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_country_locales_locale_parent_id_unique\` ON \`forms_blocks_country_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`forms_blocks_email_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_email_locales_locale_parent_id_unique\` ON \`forms_blocks_email_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`forms_blocks_message_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_message_locales_locale_parent_id_unique\` ON \`forms_blocks_message_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`forms_blocks_number_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_number_locales_locale_parent_id_unique\` ON \`forms_blocks_number_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`forms_blocks_select_options_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_select_options_locales_locale_parent_id_unique\` ON \`forms_blocks_select_options_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`forms_blocks_select_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_select_locales_locale_parent_id_unique\` ON \`forms_blocks_select_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`forms_blocks_state_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_state_locales_locale_parent_id_unique\` ON \`forms_blocks_state_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`forms_blocks_text_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_text_locales_locale_parent_id_unique\` ON \`forms_blocks_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`forms_blocks_textarea_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_textarea_locales_locale_parent_id_unique\` ON \`forms_blocks_textarea_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`forms_emails_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_emails_locales_locale_parent_id_unique\` ON \`forms_emails_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`forms_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_locales_locale_parent_id_unique\` ON \`forms_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_blocks_checkbox_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_blocks_checkbox_locales_locale_parent_id_unique\` ON \`_forms_v_blocks_checkbox_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_blocks_country_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_blocks_country_locales_locale_parent_id_unique\` ON \`_forms_v_blocks_country_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_blocks_email_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_blocks_email_locales_locale_parent_id_unique\` ON \`_forms_v_blocks_email_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_blocks_message_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_blocks_message_locales_locale_parent_id_unique\` ON \`_forms_v_blocks_message_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_blocks_number_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_blocks_number_locales_locale_parent_id_unique\` ON \`_forms_v_blocks_number_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_blocks_select_options_locales_parent_id_locale_uniq\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_blocks_select_options_locales_locale_parent_id_uniq\` ON \`_forms_v_blocks_select_options_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_blocks_select_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_blocks_select_locales_locale_parent_id_unique\` ON \`_forms_v_blocks_select_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_blocks_state_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_blocks_state_locales_locale_parent_id_unique\` ON \`_forms_v_blocks_state_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_blocks_text_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_blocks_text_locales_locale_parent_id_unique\` ON \`_forms_v_blocks_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_blocks_textarea_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_blocks_textarea_locales_locale_parent_id_unique\` ON \`_forms_v_blocks_textarea_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_version_emails_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_version_emails_locales_locale_parent_id_unique\` ON \`_forms_v_version_emails_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`_forms_v_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`_forms_v_locales_locale_parent_id_unique\` ON \`_forms_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`search_locales_parent_id_locale_unique\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`search_locales_locale_parent_id_unique\` ON \`search_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`DROP INDEX \`exports_original_original_filename_idx\`;`)
  await db.run(sql`ALTER TABLE \`exports\` DROP COLUMN \`_stored\`;`)
  await db.run(sql`ALTER TABLE \`exports\` DROP COLUMN \`_transforms\`;`)
  await db.run(sql`ALTER TABLE \`exports\` DROP COLUMN \`original_filename\`;`)
  await db.run(sql`ALTER TABLE \`exports\` DROP COLUMN \`original_url\`;`)
  await db.run(sql`ALTER TABLE \`exports\` DROP COLUMN \`original_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`exports\` DROP COLUMN \`original_filesize\`;`)
  await db.run(sql`ALTER TABLE \`exports\` DROP COLUMN \`original_width\`;`)
  await db.run(sql`ALTER TABLE \`exports\` DROP COLUMN \`original_height\`;`)
  await db.run(sql`ALTER TABLE \`exports\` DROP COLUMN \`original_prefix\`;`)
  await db.run(sql`ALTER TABLE \`exports\` DROP COLUMN \`original__objectkey\`;`)
  await db.run(sql`ALTER TABLE \`exports\` DROP COLUMN \`original__stored\`;`)
  await db.run(sql`DROP INDEX \`_exports_v_version_original_version_original_filename_idx\`;`)
  await db.run(sql`ALTER TABLE \`_exports_v\` DROP COLUMN \`version__stored\`;`)
  await db.run(sql`ALTER TABLE \`_exports_v\` DROP COLUMN \`version__transforms\`;`)
  await db.run(sql`ALTER TABLE \`_exports_v\` DROP COLUMN \`version_original_filename\`;`)
  await db.run(sql`ALTER TABLE \`_exports_v\` DROP COLUMN \`version_original_url\`;`)
  await db.run(sql`ALTER TABLE \`_exports_v\` DROP COLUMN \`version_original_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`_exports_v\` DROP COLUMN \`version_original_filesize\`;`)
  await db.run(sql`ALTER TABLE \`_exports_v\` DROP COLUMN \`version_original_width\`;`)
  await db.run(sql`ALTER TABLE \`_exports_v\` DROP COLUMN \`version_original_height\`;`)
  await db.run(sql`ALTER TABLE \`_exports_v\` DROP COLUMN \`version_original_prefix\`;`)
  await db.run(sql`ALTER TABLE \`_exports_v\` DROP COLUMN \`version_original__objectkey\`;`)
  await db.run(sql`ALTER TABLE \`_exports_v\` DROP COLUMN \`version_original__stored\`;`)
  await db.run(sql`DROP INDEX \`imports_original_original_filename_idx\`;`)
  await db.run(sql`ALTER TABLE \`imports\` DROP COLUMN \`_stored\`;`)
  await db.run(sql`ALTER TABLE \`imports\` DROP COLUMN \`_transforms\`;`)
  await db.run(sql`ALTER TABLE \`imports\` DROP COLUMN \`original_filename\`;`)
  await db.run(sql`ALTER TABLE \`imports\` DROP COLUMN \`original_url\`;`)
  await db.run(sql`ALTER TABLE \`imports\` DROP COLUMN \`original_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`imports\` DROP COLUMN \`original_filesize\`;`)
  await db.run(sql`ALTER TABLE \`imports\` DROP COLUMN \`original_width\`;`)
  await db.run(sql`ALTER TABLE \`imports\` DROP COLUMN \`original_height\`;`)
  await db.run(sql`ALTER TABLE \`imports\` DROP COLUMN \`original_prefix\`;`)
  await db.run(sql`ALTER TABLE \`imports\` DROP COLUMN \`original__objectkey\`;`)
  await db.run(sql`ALTER TABLE \`imports\` DROP COLUMN \`original__stored\`;`)
  await db.run(sql`DROP INDEX \`_imports_v_version_original_version_original_filename_idx\`;`)
  await db.run(sql`ALTER TABLE \`_imports_v\` DROP COLUMN \`version__stored\`;`)
  await db.run(sql`ALTER TABLE \`_imports_v\` DROP COLUMN \`version__transforms\`;`)
  await db.run(sql`ALTER TABLE \`_imports_v\` DROP COLUMN \`version_original_filename\`;`)
  await db.run(sql`ALTER TABLE \`_imports_v\` DROP COLUMN \`version_original_url\`;`)
  await db.run(sql`ALTER TABLE \`_imports_v\` DROP COLUMN \`version_original_mime_type\`;`)
  await db.run(sql`ALTER TABLE \`_imports_v\` DROP COLUMN \`version_original_filesize\`;`)
  await db.run(sql`ALTER TABLE \`_imports_v\` DROP COLUMN \`version_original_width\`;`)
  await db.run(sql`ALTER TABLE \`_imports_v\` DROP COLUMN \`version_original_height\`;`)
  await db.run(sql`ALTER TABLE \`_imports_v\` DROP COLUMN \`version_original_prefix\`;`)
  await db.run(sql`ALTER TABLE \`_imports_v\` DROP COLUMN \`version_original__objectkey\`;`)
  await db.run(sql`ALTER TABLE \`_imports_v\` DROP COLUMN \`version_original__stored\`;`)
  await db.run(sql`DROP INDEX \`payload_jobs_processing_until_idx\`;`)
  await db.run(sql`DROP INDEX \`payload_jobs_concurrency_key_idx\`;`)
  await db.run(sql`ALTER TABLE \`payload_jobs\` ADD \`processing\` integer DEFAULT false;`)
  await db.run(sql`CREATE INDEX \`payload_jobs_processing_idx\` ON \`payload_jobs\` (\`processing\`);`)
  await db.run(sql`ALTER TABLE \`payload_jobs\` DROP COLUMN \`processing_until\`;`)
  await db.run(sql`ALTER TABLE \`payload_jobs\` DROP COLUMN \`processing_token\`;`)
  await db.run(sql`ALTER TABLE \`payload_jobs\` DROP COLUMN \`concurrency_key\`;`)
  await db.run(sql`CREATE TABLE \`__new_payload_jobs_log\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`executed_at\` text NOT NULL,
  	\`completed_at\` text NOT NULL,
  	\`task_slug\` text NOT NULL,
  	\`task_i_d\` text NOT NULL,
  	\`input\` text,
  	\`output\` text,
  	\`state\` text NOT NULL,
  	\`error\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`payload_jobs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_jobs_log\`("_order", "_parent_id", "id", "executed_at", "completed_at", "task_slug", "task_i_d", "input", "output", "state", "error") SELECT "_order", "_parent_id", "id", "executed_at", "completed_at", "task_slug", "task_i_d", "input", "output", "state", "error" FROM \`payload_jobs_log\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs_log\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_jobs_log\` RENAME TO \`payload_jobs_log\`;`)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_order_idx\` ON \`payload_jobs_log\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_parent_id_idx\` ON \`payload_jobs_log\` (\`_parent_id\`);`)
  await db.run(sql`ALTER TABLE \`_variants_v\` ADD \`snapshot\` integer;`)
  await db.run(sql`CREATE INDEX \`_variants_v_snapshot_idx\` ON \`_variants_v\` (\`snapshot\`);`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`generate_slug\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`products\` ADD \`_status\` text DEFAULT 'draft';`)
  await db.run(sql`CREATE INDEX \`products__status_idx\` ON \`products\` (\`_status\`);`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version_generate_slug\` integer DEFAULT true;`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`version__status\` text DEFAULT 'draft';`)
  await db.run(sql`ALTER TABLE \`_products_v\` ADD \`snapshot\` integer;`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version__status_idx\` ON \`_products_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_snapshot_idx\` ON \`_products_v\` (\`snapshot\`);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`payload_mcp_api_keys_id\` text(36) REFERENCES payload_mcp_api_keys(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_payload_mcp_api_keys_id_idx\` ON \`payload_locked_documents_rels\` (\`payload_mcp_api_keys_id\`);`)
  await db.run(sql`ALTER TABLE \`payload_preferences_rels\` ADD \`payload_mcp_api_keys_id\` text(36) REFERENCES payload_mcp_api_keys(id);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_payload_mcp_api_keys_id_idx\` ON \`payload_preferences_rels\` (\`payload_mcp_api_keys_id\`);`)
  await db.run(sql`ALTER TABLE \`users_sessions\` DROP COLUMN \`refresh_count\`;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` DROP COLUMN \`refreshed_at\`;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` DROP COLUMN \`label\`;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` DROP COLUMN \`type\`;`)
  await db.run(sql`ALTER TABLE \`users_sessions\` DROP COLUMN \`metadata\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`api_key\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`api_key_last4\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`api_key_index\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`reset_password_requested_at\`;`)
  await db.run(sql`ALTER TABLE \`_users_v_version_sessions\` DROP COLUMN \`refresh_count\`;`)
  await db.run(sql`ALTER TABLE \`_users_v_version_sessions\` DROP COLUMN \`refreshed_at\`;`)
  await db.run(sql`ALTER TABLE \`_users_v_version_sessions\` DROP COLUMN \`label\`;`)
  await db.run(sql`ALTER TABLE \`_users_v_version_sessions\` DROP COLUMN \`type\`;`)
  await db.run(sql`ALTER TABLE \`_users_v_version_sessions\` DROP COLUMN \`metadata\`;`)
  await db.run(sql`ALTER TABLE \`_users_v\` DROP COLUMN \`version_api_key\`;`)
  await db.run(sql`ALTER TABLE \`_users_v\` DROP COLUMN \`version_api_key_last4\`;`)
  await db.run(sql`ALTER TABLE \`_users_v\` DROP COLUMN \`version_api_key_index\`;`)
  await db.run(sql`ALTER TABLE \`_users_v\` DROP COLUMN \`version_reset_password_requested_at\`;`)
}
