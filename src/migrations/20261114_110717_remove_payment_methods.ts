import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`payment_methods\`;`)
  await db.run(sql`DROP TABLE \`_payment_methods_v\`;`)
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`payment_methods\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`stripe_payment_method_id\` text NOT NULL,
  	\`type\` text NOT NULL,
  	\`card_brand\` text,
  	\`card_last4\` text,
  	\`card_exp_month\` numeric,
  	\`card_exp_year\` numeric,
  	\`bank_name\` text,
  	\`bank_last4\` text,
  	\`is_default\` integer DEFAULT false,
  	\`is_active\` integer DEFAULT true,
  	\`created_via_stripe\` integer DEFAULT false,
  	\`next_retry_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payment_methods_uuid_idx\` ON \`payment_methods\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`payment_methods_tenant_idx\` ON \`payment_methods\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`payment_methods_stripe_payment_method_id_idx\` ON \`payment_methods\` (\`stripe_payment_method_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_methods_updated_at_idx\` ON \`payment_methods\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payment_methods_created_at_idx\` ON \`payment_methods\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_payment_methods_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_stripe_payment_method_id\` text NOT NULL,
  	\`version_type\` text NOT NULL,
  	\`version_card_brand\` text,
  	\`version_card_last4\` text,
  	\`version_card_exp_month\` numeric,
  	\`version_card_exp_year\` numeric,
  	\`version_bank_name\` text,
  	\`version_bank_last4\` text,
  	\`version_is_default\` integer DEFAULT false,
  	\`version_is_active\` integer DEFAULT true,
  	\`version_created_via_stripe\` integer DEFAULT false,
  	\`version_next_retry_at\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payment_methods\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_payment_methods_v_parent_idx\` ON \`_payment_methods_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_payment_methods_v_version_version_uuid_idx\` ON \`_payment_methods_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_payment_methods_v_version_version_tenant_idx\` ON \`_payment_methods_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_payment_methods_v_version_version_stripe_payment_method_idx\` ON \`_payment_methods_v\` (\`version_stripe_payment_method_id\`);`)
  await db.run(sql`CREATE INDEX \`_payment_methods_v_version_version_updated_at_idx\` ON \`_payment_methods_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_payment_methods_v_version_version_created_at_idx\` ON \`_payment_methods_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_payment_methods_v_created_at_idx\` ON \`_payment_methods_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_payment_methods_v_updated_at_idx\` ON \`_payment_methods_v\` (\`updated_at\`);`)
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
}
