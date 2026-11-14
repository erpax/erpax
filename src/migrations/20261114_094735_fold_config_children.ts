import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
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
  await db.run(sql`DROP TABLE \`e63374315133189659a5f11c2d82e4d14\`;`)
  await db.run(sql`DROP TABLE \`e98d28b906a8a84fc83665a4bee6d69f1\`;`)
  await db.run(sql`DROP TABLE \`compliance_notifications\`;`)
  await db.run(sql`DROP TABLE \`_e63374315133189659a5f11c2d82e4d14_v\`;`)
  await db.run(sql`DROP TABLE \`_e98d28b906a8a84fc83665a4bee6d69f1_v\`;`)
  await db.run(sql`DROP TABLE \`_compliance_notifications_v\`;`)
  await db.run(sql`DROP TABLE \`ed4bb747bf248847fbb37044680471a81\`;`)
  await db.run(sql`DROP TABLE \`reporting_mappings\`;`)
  await db.run(sql`DROP TABLE \`_ed4bb747bf248847fbb37044680471a81_v\`;`)
  await db.run(sql`DROP TABLE \`_reporting_mappings_v\`;`)
  await db.run(sql`DROP TABLE \`statutory_field_mappings\`;`)
  await db.run(sql`DROP TABLE \`_statutory_field_mappings_v\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`e63374315133189659a5f11c2d82e4d14\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`compliance_notifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e63374315133189659a5f11c2d82e4d14_order_idx\` ON \`e63374315133189659a5f11c2d82e4d14\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`e63374315133189659a5f11c2d82e4d14_parent_idx\` ON \`e63374315133189659a5f11c2d82e4d14\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`e98d28b906a8a84fc83665a4bee6d69f1\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`recipient_email\` text,
  	\`recipient_role\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`compliance_notifications\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`e98d28b906a8a84fc83665a4bee6d69f1_order_idx\` ON \`e98d28b906a8a84fc83665a4bee6d69f1\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e98d28b906a8a84fc83665a4bee6d69f1_parent_id_idx\` ON \`e98d28b906a8a84fc83665a4bee6d69f1\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`compliance_notifications\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`deadline_id\` text(36) NOT NULL,
  	\`notification_title\` text NOT NULL,
  	\`notification_content\` text,
  	\`days_before_due\` numeric NOT NULL,
  	\`sent_date\` text,
  	\`status\` text DEFAULT 'scheduled',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`deadline_id\`) REFERENCES \`compliance_deadlines\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`compliance_notifications_uuid_idx\` ON \`compliance_notifications\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`compliance_notifications_tenant_idx\` ON \`compliance_notifications\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_notifications_deadline_idx\` ON \`compliance_notifications\` (\`deadline_id\`);`)
  await db.run(sql`CREATE INDEX \`compliance_notifications_updated_at_idx\` ON \`compliance_notifications\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`compliance_notifications_created_at_idx\` ON \`compliance_notifications\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_e63374315133189659a5f11c2d82e4d14_v\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text(36) NOT NULL,
  	\`value\` text,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_compliance_notifications_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e63374315133189659a5f11c2d82e4d14_v_order_idx\` ON \`_e63374315133189659a5f11c2d82e4d14_v\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_e63374315133189659a5f11c2d82e4d14_v_parent_idx\` ON \`_e63374315133189659a5f11c2d82e4d14_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_e98d28b906a8a84fc83665a4bee6d69f1_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`recipient_email\` text,
  	\`recipient_role\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_compliance_notifications_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_e98d28b906a8a84fc83665a4bee6d69f1_v_order_idx\` ON \`_e98d28b906a8a84fc83665a4bee6d69f1_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e98d28b906a8a84fc83665a4bee6d69f1_v_parent_id_idx\` ON \`_e98d28b906a8a84fc83665a4bee6d69f1_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_compliance_notifications_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_deadline_id\` text(36) NOT NULL,
  	\`version_notification_title\` text NOT NULL,
  	\`version_notification_content\` text,
  	\`version_days_before_due\` numeric NOT NULL,
  	\`version_sent_date\` text,
  	\`version_status\` text DEFAULT 'scheduled',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`compliance_notifications\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_deadline_id\`) REFERENCES \`compliance_deadlines\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_compliance_notifications_v_parent_idx\` ON \`_compliance_notifications_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_notifications_v_version_version_uuid_idx\` ON \`_compliance_notifications_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_notifications_v_version_version_tenant_idx\` ON \`_compliance_notifications_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_notifications_v_version_version_deadline_idx\` ON \`_compliance_notifications_v\` (\`version_deadline_id\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_notifications_v_version_version_updated_at_idx\` ON \`_compliance_notifications_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_notifications_v_version_version_created_at_idx\` ON \`_compliance_notifications_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_notifications_v_created_at_idx\` ON \`_compliance_notifications_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_compliance_notifications_v_updated_at_idx\` ON \`_compliance_notifications_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`ed4bb747bf248847fbb37044680471a81\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`source_element\` text,
  	\`target_element\` text,
  	\`transformation\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`reporting_mappings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`ed4bb747bf248847fbb37044680471a81_order_idx\` ON \`ed4bb747bf248847fbb37044680471a81\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`ed4bb747bf248847fbb37044680471a81_parent_id_idx\` ON \`ed4bb747bf248847fbb37044680471a81\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`reporting_mappings\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`mapping_name\` text NOT NULL,
  	\`from_standard_id\` text(36) NOT NULL,
  	\`to_standard_id\` text(36) NOT NULL,
  	\`mapping_type\` text NOT NULL,
  	\`status\` text DEFAULT 'pending-review',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`from_standard_id\`) REFERENCES \`reporting_standards\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`to_standard_id\`) REFERENCES \`reporting_standards\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`reporting_mappings_uuid_idx\` ON \`reporting_mappings\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`reporting_mappings_tenant_idx\` ON \`reporting_mappings\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`reporting_mappings_from_standard_idx\` ON \`reporting_mappings\` (\`from_standard_id\`);`)
  await db.run(sql`CREATE INDEX \`reporting_mappings_to_standard_idx\` ON \`reporting_mappings\` (\`to_standard_id\`);`)
  await db.run(sql`CREATE INDEX \`reporting_mappings_updated_at_idx\` ON \`reporting_mappings\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`reporting_mappings_created_at_idx\` ON \`reporting_mappings\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_ed4bb747bf248847fbb37044680471a81_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`source_element\` text,
  	\`target_element\` text,
  	\`transformation\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_reporting_mappings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_ed4bb747bf248847fbb37044680471a81_v_order_idx\` ON \`_ed4bb747bf248847fbb37044680471a81_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_ed4bb747bf248847fbb37044680471a81_v_parent_id_idx\` ON \`_ed4bb747bf248847fbb37044680471a81_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_reporting_mappings_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_mapping_name\` text NOT NULL,
  	\`version_from_standard_id\` text(36) NOT NULL,
  	\`version_to_standard_id\` text(36) NOT NULL,
  	\`version_mapping_type\` text NOT NULL,
  	\`version_status\` text DEFAULT 'pending-review',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`reporting_mappings\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_from_standard_id\`) REFERENCES \`reporting_standards\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_to_standard_id\`) REFERENCES \`reporting_standards\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_reporting_mappings_v_parent_idx\` ON \`_reporting_mappings_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_mappings_v_version_version_uuid_idx\` ON \`_reporting_mappings_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_mappings_v_version_version_tenant_idx\` ON \`_reporting_mappings_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_mappings_v_version_version_from_standard_idx\` ON \`_reporting_mappings_v\` (\`version_from_standard_id\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_mappings_v_version_version_to_standard_idx\` ON \`_reporting_mappings_v\` (\`version_to_standard_id\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_mappings_v_version_version_updated_at_idx\` ON \`_reporting_mappings_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_mappings_v_version_version_created_at_idx\` ON \`_reporting_mappings_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_mappings_v_created_at_idx\` ON \`_reporting_mappings_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_reporting_mappings_v_updated_at_idx\` ON \`_reporting_mappings_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`statutory_field_mappings\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`mapping_name\` text NOT NULL,
  	\`report_template_id\` text(36) NOT NULL,
  	\`field_name\` text NOT NULL,
  	\`field_type\` text,
  	\`source_collection\` text,
  	\`source_field\` text,
  	\`transformation\` text,
  	\`mandatory\` integer DEFAULT true,
  	\`validation_rules\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`report_template_id\`) REFERENCES \`statutory_report_templates\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`statutory_field_mappings_uuid_idx\` ON \`statutory_field_mappings\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`statutory_field_mappings_tenant_idx\` ON \`statutory_field_mappings\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`statutory_field_mappings_report_template_idx\` ON \`statutory_field_mappings\` (\`report_template_id\`);`)
  await db.run(sql`CREATE INDEX \`statutory_field_mappings_updated_at_idx\` ON \`statutory_field_mappings\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`statutory_field_mappings_created_at_idx\` ON \`statutory_field_mappings\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_statutory_field_mappings_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_mapping_name\` text NOT NULL,
  	\`version_report_template_id\` text(36) NOT NULL,
  	\`version_field_name\` text NOT NULL,
  	\`version_field_type\` text,
  	\`version_source_collection\` text,
  	\`version_source_field\` text,
  	\`version_transformation\` text,
  	\`version_mandatory\` integer DEFAULT true,
  	\`version_validation_rules\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`statutory_field_mappings\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_report_template_id\`) REFERENCES \`statutory_report_templates\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_statutory_field_mappings_v_parent_idx\` ON \`_statutory_field_mappings_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_field_mappings_v_version_version_uuid_idx\` ON \`_statutory_field_mappings_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_field_mappings_v_version_version_tenant_idx\` ON \`_statutory_field_mappings_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_field_mappings_v_version_version_report_templ_idx\` ON \`_statutory_field_mappings_v\` (\`version_report_template_id\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_field_mappings_v_version_version_updated_at_idx\` ON \`_statutory_field_mappings_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_field_mappings_v_version_version_created_at_idx\` ON \`_statutory_field_mappings_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_field_mappings_v_created_at_idx\` ON \`_statutory_field_mappings_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_statutory_field_mappings_v_updated_at_idx\` ON \`_statutory_field_mappings_v\` (\`updated_at\`);`)
  await db.run(sql`DROP TABLE \`e656a9725ee398de3897bd61fd8162572\`;`)
  await db.run(sql`DROP TABLE \`e53bc78229e6886b6a047e57b9575cb8b\`;`)
  await db.run(sql`DROP TABLE \`ec5da128012e481c48a0e85cf8143c2da\`;`)
  await db.run(sql`DROP TABLE \`_e656a9725ee398de3897bd61fd8162572_v\`;`)
  await db.run(sql`DROP TABLE \`_e53bc78229e6886b6a047e57b9575cb8b_v\`;`)
  await db.run(sql`DROP TABLE \`_ec5da128012e481c48a0e85cf8143c2da_v\`;`)
  await db.run(sql`DROP TABLE \`eb810673fc2f58e658d8eede73daf9d48\`;`)
  await db.run(sql`DROP TABLE \`e818531f584178fa6906f1e091b15b481\`;`)
  await db.run(sql`DROP TABLE \`_eb810673fc2f58e658d8eede73daf9d48_v\`;`)
  await db.run(sql`DROP TABLE \`_e818531f584178fa6906f1e091b15b481_v\`;`)
  await db.run(sql`DROP TABLE \`e31fb556a79398d99bc575483c481e601\`;`)
  await db.run(sql`DROP TABLE \`_e31fb556a79398d99bc575483c481e601_v\`;`)
}
