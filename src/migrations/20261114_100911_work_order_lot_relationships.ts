import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`work_orders_lot_variant_code_idx\`;`)
  await db.run(sql`DROP INDEX \`work_orders_lot_work_phase_code_idx\`;`)
  await db.run(sql`ALTER TABLE \`work_orders\` ADD \`lot_variant_id\` text(36) REFERENCES lot_variants(id);`)
  await db.run(sql`ALTER TABLE \`work_orders\` ADD \`lot_work_phase_id\` text(36) REFERENCES lot_work_phases(id);`)
  await db.run(sql`CREATE INDEX \`work_orders_lot_variant_idx\` ON \`work_orders\` (\`lot_variant_id\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_lot_work_phase_idx\` ON \`work_orders\` (\`lot_work_phase_id\`);`)
  await db.run(sql`ALTER TABLE \`work_orders\` DROP COLUMN \`lot_variant_code\`;`)
  await db.run(sql`ALTER TABLE \`work_orders\` DROP COLUMN \`lot_work_phase_code\`;`)
  await db.run(sql`DROP INDEX \`_work_orders_v_version_version_lot_variant_code_idx\`;`)
  await db.run(sql`DROP INDEX \`_work_orders_v_version_version_lot_work_phase_code_idx\`;`)
  await db.run(sql`ALTER TABLE \`_work_orders_v\` ADD \`version_lot_variant_id\` text(36) REFERENCES lot_variants(id);`)
  await db.run(sql`ALTER TABLE \`_work_orders_v\` ADD \`version_lot_work_phase_id\` text(36) REFERENCES lot_work_phases(id);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_version_version_lot_variant_idx\` ON \`_work_orders_v\` (\`version_lot_variant_id\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_version_version_lot_work_phase_idx\` ON \`_work_orders_v\` (\`version_lot_work_phase_id\`);`)
  await db.run(sql`ALTER TABLE \`_work_orders_v\` DROP COLUMN \`version_lot_variant_code\`;`)
  await db.run(sql`ALTER TABLE \`_work_orders_v\` DROP COLUMN \`version_lot_work_phase_code\`;`)
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_work_orders\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`reference\` text NOT NULL,
  	\`date\` text,
  	\`units_ordered\` numeric DEFAULT 0,
  	\`units_produced\` numeric DEFAULT 0,
  	\`units_backordered\` numeric DEFAULT 0,
  	\`units_scrap\` numeric DEFAULT 0,
  	\`unit_seconds\` numeric,
  	\`machines_per_worker\` numeric,
  	\`pay_per_hour\` numeric,
  	\`efficiency_percent\` numeric,
  	\`started_at\` text,
  	\`completed_at\` text,
  	\`delivered_at\` text,
  	\`closed_at\` text,
  	\`estimated_at\` text,
  	\`lot_variant_code\` text,
  	\`lot_work_phase_code\` text,
  	\`lot_work_phase_sort\` numeric,
  	\`machine_code\` text,
  	\`team_code\` text,
  	\`work_shift_id\` text(36),
  	\`worker_id\` text(36),
  	\`supervisor_id\` text(36),
  	\`director_id\` text(36),
  	\`forwarded_from_id\` text(36),
  	\`forwarded_to_id\` text(36),
  	\`note\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`work_shift_id\`) REFERENCES \`work_shifts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`worker_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`supervisor_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`director_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`forwarded_from_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`forwarded_to_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_work_orders\`("id", "uuid", "tenant_id", "reference", "date", "units_ordered", "units_produced", "units_backordered", "units_scrap", "unit_seconds", "machines_per_worker", "pay_per_hour", "efficiency_percent", "started_at", "completed_at", "delivered_at", "closed_at", "estimated_at", "lot_variant_code", "lot_work_phase_code", "lot_work_phase_sort", "machine_code", "team_code", "work_shift_id", "worker_id", "supervisor_id", "director_id", "forwarded_from_id", "forwarded_to_id", "note", "created_by_id", "approved_by_id", "approved_at", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "reference", "date", "units_ordered", "units_produced", "units_backordered", "units_scrap", "unit_seconds", "machines_per_worker", "pay_per_hour", "efficiency_percent", "started_at", "completed_at", "delivered_at", "closed_at", "estimated_at", "lot_variant_code", "lot_work_phase_code", "lot_work_phase_sort", "machine_code", "team_code", "work_shift_id", "worker_id", "supervisor_id", "director_id", "forwarded_from_id", "forwarded_to_id", "note", "created_by_id", "approved_by_id", "approved_at", "updated_at", "created_at" FROM \`work_orders\`;`)
  await db.run(sql`DROP TABLE \`work_orders\`;`)
  await db.run(sql`ALTER TABLE \`__new_work_orders\` RENAME TO \`work_orders\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`work_orders_uuid_idx\` ON \`work_orders\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_tenant_idx\` ON \`work_orders\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`work_orders_reference_idx\` ON \`work_orders\` (\`reference\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_date_idx\` ON \`work_orders\` (\`date\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_lot_variant_code_idx\` ON \`work_orders\` (\`lot_variant_code\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_lot_work_phase_code_idx\` ON \`work_orders\` (\`lot_work_phase_code\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_lot_work_phase_sort_idx\` ON \`work_orders\` (\`lot_work_phase_sort\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_team_code_idx\` ON \`work_orders\` (\`team_code\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_work_shift_idx\` ON \`work_orders\` (\`work_shift_id\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_worker_idx\` ON \`work_orders\` (\`worker_id\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_supervisor_idx\` ON \`work_orders\` (\`supervisor_id\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_director_idx\` ON \`work_orders\` (\`director_id\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_forwarded_from_idx\` ON \`work_orders\` (\`forwarded_from_id\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_forwarded_to_idx\` ON \`work_orders\` (\`forwarded_to_id\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_created_by_idx\` ON \`work_orders\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_approved_by_idx\` ON \`work_orders\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_updated_at_idx\` ON \`work_orders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`work_orders_created_at_idx\` ON \`work_orders\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__work_orders_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_reference\` text NOT NULL,
  	\`version_date\` text,
  	\`version_units_ordered\` numeric DEFAULT 0,
  	\`version_units_produced\` numeric DEFAULT 0,
  	\`version_units_backordered\` numeric DEFAULT 0,
  	\`version_units_scrap\` numeric DEFAULT 0,
  	\`version_unit_seconds\` numeric,
  	\`version_machines_per_worker\` numeric,
  	\`version_pay_per_hour\` numeric,
  	\`version_efficiency_percent\` numeric,
  	\`version_started_at\` text,
  	\`version_completed_at\` text,
  	\`version_delivered_at\` text,
  	\`version_closed_at\` text,
  	\`version_estimated_at\` text,
  	\`version_lot_variant_code\` text,
  	\`version_lot_work_phase_code\` text,
  	\`version_lot_work_phase_sort\` numeric,
  	\`version_machine_code\` text,
  	\`version_team_code\` text,
  	\`version_work_shift_id\` text(36),
  	\`version_worker_id\` text(36),
  	\`version_supervisor_id\` text(36),
  	\`version_director_id\` text(36),
  	\`version_forwarded_from_id\` text(36),
  	\`version_forwarded_to_id\` text(36),
  	\`version_note\` text,
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_work_shift_id\`) REFERENCES \`work_shifts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_worker_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_supervisor_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_director_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_forwarded_from_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_forwarded_to_id\`) REFERENCES \`work_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__work_orders_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_date", "version_units_ordered", "version_units_produced", "version_units_backordered", "version_units_scrap", "version_unit_seconds", "version_machines_per_worker", "version_pay_per_hour", "version_efficiency_percent", "version_started_at", "version_completed_at", "version_delivered_at", "version_closed_at", "version_estimated_at", "version_lot_variant_code", "version_lot_work_phase_code", "version_lot_work_phase_sort", "version_machine_code", "version_team_code", "version_work_shift_id", "version_worker_id", "version_supervisor_id", "version_director_id", "version_forwarded_from_id", "version_forwarded_to_id", "version_note", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_reference", "version_date", "version_units_ordered", "version_units_produced", "version_units_backordered", "version_units_scrap", "version_unit_seconds", "version_machines_per_worker", "version_pay_per_hour", "version_efficiency_percent", "version_started_at", "version_completed_at", "version_delivered_at", "version_closed_at", "version_estimated_at", "version_lot_variant_code", "version_lot_work_phase_code", "version_lot_work_phase_sort", "version_machine_code", "version_team_code", "version_work_shift_id", "version_worker_id", "version_supervisor_id", "version_director_id", "version_forwarded_from_id", "version_forwarded_to_id", "version_note", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_work_orders_v\`;`)
  await db.run(sql`DROP TABLE \`_work_orders_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__work_orders_v\` RENAME TO \`_work_orders_v\`;`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_parent_idx\` ON \`_work_orders_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_version_version_uuid_idx\` ON \`_work_orders_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_version_version_tenant_idx\` ON \`_work_orders_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_version_version_reference_idx\` ON \`_work_orders_v\` (\`version_reference\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_version_version_date_idx\` ON \`_work_orders_v\` (\`version_date\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_version_version_lot_variant_code_idx\` ON \`_work_orders_v\` (\`version_lot_variant_code\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_version_version_lot_work_phase_code_idx\` ON \`_work_orders_v\` (\`version_lot_work_phase_code\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_version_version_lot_work_phase_sort_idx\` ON \`_work_orders_v\` (\`version_lot_work_phase_sort\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_version_version_team_code_idx\` ON \`_work_orders_v\` (\`version_team_code\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_version_version_work_shift_idx\` ON \`_work_orders_v\` (\`version_work_shift_id\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_version_version_worker_idx\` ON \`_work_orders_v\` (\`version_worker_id\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_version_version_supervisor_idx\` ON \`_work_orders_v\` (\`version_supervisor_id\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_version_version_director_idx\` ON \`_work_orders_v\` (\`version_director_id\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_version_version_forwarded_from_idx\` ON \`_work_orders_v\` (\`version_forwarded_from_id\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_version_version_forwarded_to_idx\` ON \`_work_orders_v\` (\`version_forwarded_to_id\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_version_version_created_by_idx\` ON \`_work_orders_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_version_version_approved_by_idx\` ON \`_work_orders_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_version_version_updated_at_idx\` ON \`_work_orders_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_version_version_created_at_idx\` ON \`_work_orders_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_created_at_idx\` ON \`_work_orders_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_work_orders_v_updated_at_idx\` ON \`_work_orders_v\` (\`updated_at\`);`)
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
}
