import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`deferred_tax_items_rels\` (
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
  await db.run(sql`CREATE INDEX \`deferred_tax_items_rels_order_idx\` ON \`deferred_tax_items_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`deferred_tax_items_rels_parent_idx\` ON \`deferred_tax_items_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`deferred_tax_items_rels_path_idx\` ON \`deferred_tax_items_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`deferred_tax_items_rels_fixed_assets_id_idx\` ON \`deferred_tax_items_rels\` (\`fixed_assets_id\`);`)
  await db.run(sql`CREATE INDEX \`deferred_tax_items_rels_inventory_movements_id_idx\` ON \`deferred_tax_items_rels\` (\`inventory_movements_id\`);`)
  await db.run(sql`CREATE INDEX \`deferred_tax_items_rels_provisions_id_idx\` ON \`deferred_tax_items_rels\` (\`provisions_id\`);`)
  await db.run(sql`CREATE TABLE \`_deferred_tax_items_v_rels\` (
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
  await db.run(sql`CREATE INDEX \`_deferred_tax_items_v_rels_order_idx\` ON \`_deferred_tax_items_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_deferred_tax_items_v_rels_parent_idx\` ON \`_deferred_tax_items_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_deferred_tax_items_v_rels_path_idx\` ON \`_deferred_tax_items_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_deferred_tax_items_v_rels_fixed_assets_id_idx\` ON \`_deferred_tax_items_v_rels\` (\`fixed_assets_id\`);`)
  await db.run(sql`CREATE INDEX \`_deferred_tax_items_v_rels_inventory_movements_id_idx\` ON \`_deferred_tax_items_v_rels\` (\`inventory_movements_id\`);`)
  await db.run(sql`CREATE INDEX \`_deferred_tax_items_v_rels_provisions_id_idx\` ON \`_deferred_tax_items_v_rels\` (\`provisions_id\`);`)
  await db.run(sql`CREATE TABLE \`fair_value_measurements_rels\` (
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
  await db.run(sql`CREATE INDEX \`fair_value_measurements_rels_order_idx\` ON \`fair_value_measurements_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_rels_parent_idx\` ON \`fair_value_measurements_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_rels_path_idx\` ON \`fair_value_measurements_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_rels_fixed_assets_id_idx\` ON \`fair_value_measurements_rels\` (\`fixed_assets_id\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_rels_investment_properties_id_idx\` ON \`fair_value_measurements_rels\` (\`investment_properties_id\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_rels_biological_assets_id_idx\` ON \`fair_value_measurements_rels\` (\`biological_assets_id\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_rels_fx_transactions_id_idx\` ON \`fair_value_measurements_rels\` (\`fx_transactions_id\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_rels_share_based_payments_id_idx\` ON \`fair_value_measurements_rels\` (\`share_based_payments_id\`);`)
  await db.run(sql`CREATE TABLE \`_fair_value_measurements_v_rels\` (
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
  await db.run(sql`CREATE INDEX \`_fair_value_measurements_v_rels_order_idx\` ON \`_fair_value_measurements_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_fair_value_measurements_v_rels_parent_idx\` ON \`_fair_value_measurements_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_fair_value_measurements_v_rels_path_idx\` ON \`_fair_value_measurements_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_fair_value_measurements_v_rels_fixed_assets_id_idx\` ON \`_fair_value_measurements_v_rels\` (\`fixed_assets_id\`);`)
  await db.run(sql`CREATE INDEX \`_fair_value_measurements_v_rels_investment_properties_id_idx\` ON \`_fair_value_measurements_v_rels\` (\`investment_properties_id\`);`)
  await db.run(sql`CREATE INDEX \`_fair_value_measurements_v_rels_biological_assets_id_idx\` ON \`_fair_value_measurements_v_rels\` (\`biological_assets_id\`);`)
  await db.run(sql`CREATE INDEX \`_fair_value_measurements_v_rels_fx_transactions_id_idx\` ON \`_fair_value_measurements_v_rels\` (\`fx_transactions_id\`);`)
  await db.run(sql`CREATE INDEX \`_fair_value_measurements_v_rels_share_based_payments_id_idx\` ON \`_fair_value_measurements_v_rels\` (\`share_based_payments_id\`);`)
  await db.run(sql`CREATE TABLE \`held_for_sale_classifications_rels\` (
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
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_rels_order_idx\` ON \`held_for_sale_classifications_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_rels_parent_idx\` ON \`held_for_sale_classifications_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_rels_path_idx\` ON \`held_for_sale_classifications_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_rels_fixed_assets_id_idx\` ON \`held_for_sale_classifications_rels\` (\`fixed_assets_id\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_rels_investment_properties_idx\` ON \`held_for_sale_classifications_rels\` (\`investment_properties_id\`);`)
  await db.run(sql`CREATE INDEX \`held_for_sale_classifications_rels_business_combinations_idx\` ON \`held_for_sale_classifications_rels\` (\`business_combinations_id\`);`)
  await db.run(sql`CREATE TABLE \`_held_for_sale_classifications_v_rels\` (
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
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_rels_order_idx\` ON \`_held_for_sale_classifications_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_rels_parent_idx\` ON \`_held_for_sale_classifications_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_rels_path_idx\` ON \`_held_for_sale_classifications_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_rels_fixed_assets_id_idx\` ON \`_held_for_sale_classifications_v_rels\` (\`fixed_assets_id\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_rels_investment_propert_idx\` ON \`_held_for_sale_classifications_v_rels\` (\`investment_properties_id\`);`)
  await db.run(sql`CREATE INDEX \`_held_for_sale_classifications_v_rels_business_combinati_idx\` ON \`_held_for_sale_classifications_v_rels\` (\`business_combinations_id\`);`)
  await db.run(sql`DROP INDEX \`fair_value_measurements_source_collection_idx\`;`)
  await db.run(sql`DROP INDEX \`fair_value_measurements_source_id_idx\`;`)
  await db.run(sql`ALTER TABLE \`fair_value_measurements\` DROP COLUMN \`source_collection\`;`)
  await db.run(sql`ALTER TABLE \`fair_value_measurements\` DROP COLUMN \`source_id\`;`)
  await db.run(sql`DROP INDEX \`_fair_value_measurements_v_version_version_source_collec_idx\`;`)
  await db.run(sql`DROP INDEX \`_fair_value_measurements_v_version_version_source_id_idx\`;`)
  await db.run(sql`ALTER TABLE \`_fair_value_measurements_v\` DROP COLUMN \`version_source_collection\`;`)
  await db.run(sql`ALTER TABLE \`_fair_value_measurements_v\` DROP COLUMN \`version_source_id\`;`)
  await db.run(sql`ALTER TABLE \`deferred_tax_items\` DROP COLUMN \`source_collection\`;`)
  await db.run(sql`ALTER TABLE \`deferred_tax_items\` DROP COLUMN \`source_id\`;`)
  await db.run(sql`ALTER TABLE \`_deferred_tax_items_v\` DROP COLUMN \`version_source_collection\`;`)
  await db.run(sql`ALTER TABLE \`_deferred_tax_items_v\` DROP COLUMN \`version_source_id\`;`)
  await db.run(sql`ALTER TABLE \`held_for_sale_classifications\` DROP COLUMN \`source_collection\`;`)
  await db.run(sql`ALTER TABLE \`held_for_sale_classifications\` DROP COLUMN \`source_id\`;`)
  await db.run(sql`ALTER TABLE \`_held_for_sale_classifications_v\` DROP COLUMN \`version_source_collection\`;`)
  await db.run(sql`ALTER TABLE \`_held_for_sale_classifications_v\` DROP COLUMN \`version_source_id\`;`)
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`deferred_tax_items_rels\`;`)
  await db.run(sql`DROP TABLE \`_deferred_tax_items_v_rels\`;`)
  await db.run(sql`DROP TABLE \`fair_value_measurements_rels\`;`)
  await db.run(sql`DROP TABLE \`_fair_value_measurements_v_rels\`;`)
  await db.run(sql`DROP TABLE \`held_for_sale_classifications_rels\`;`)
  await db.run(sql`DROP TABLE \`_held_for_sale_classifications_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`deferred_tax_items\` ADD \`source_collection\` text;`)
  await db.run(sql`ALTER TABLE \`deferred_tax_items\` ADD \`source_id\` text;`)
  await db.run(sql`ALTER TABLE \`_deferred_tax_items_v\` ADD \`version_source_collection\` text;`)
  await db.run(sql`ALTER TABLE \`_deferred_tax_items_v\` ADD \`version_source_id\` text;`)
  await db.run(sql`ALTER TABLE \`fair_value_measurements\` ADD \`source_collection\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`fair_value_measurements\` ADD \`source_id\` text NOT NULL;`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_source_collection_idx\` ON \`fair_value_measurements\` (\`source_collection\`);`)
  await db.run(sql`CREATE INDEX \`fair_value_measurements_source_id_idx\` ON \`fair_value_measurements\` (\`source_id\`);`)
  await db.run(sql`ALTER TABLE \`_fair_value_measurements_v\` ADD \`version_source_collection\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`_fair_value_measurements_v\` ADD \`version_source_id\` text NOT NULL;`)
  await db.run(sql`CREATE INDEX \`_fair_value_measurements_v_version_version_source_collec_idx\` ON \`_fair_value_measurements_v\` (\`version_source_collection\`);`)
  await db.run(sql`CREATE INDEX \`_fair_value_measurements_v_version_version_source_id_idx\` ON \`_fair_value_measurements_v\` (\`version_source_id\`);`)
  await db.run(sql`ALTER TABLE \`held_for_sale_classifications\` ADD \`source_collection\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`held_for_sale_classifications\` ADD \`source_id\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`_held_for_sale_classifications_v\` ADD \`version_source_collection\` text NOT NULL;`)
  await db.run(sql`ALTER TABLE \`_held_for_sale_classifications_v\` ADD \`version_source_id\` text NOT NULL;`)
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'sales-orders', entity: 'collection', fieldPath: 'cancellationReason', defaultLocale: 'en', req })
}
