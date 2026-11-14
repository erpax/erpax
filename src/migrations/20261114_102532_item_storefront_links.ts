import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`items\` ADD \`product_id\` text(36) REFERENCES products(id);`)
  await db.run(sql`ALTER TABLE \`items\` ADD \`variant_id\` text(36) REFERENCES variants(id);`)
  await db.run(sql`CREATE INDEX \`items_product_idx\` ON \`items\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX \`items_variant_idx\` ON \`items\` (\`variant_id\`);`)
  await db.run(sql`ALTER TABLE \`_items_v\` ADD \`version_product_id\` text(36) REFERENCES products(id);`)
  await db.run(sql`ALTER TABLE \`_items_v\` ADD \`version_variant_id\` text(36) REFERENCES variants(id);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_version_product_idx\` ON \`_items_v\` (\`version_product_id\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_version_variant_idx\` ON \`_items_v\` (\`version_variant_id\`);`)
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_items\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`code\` text NOT NULL,
  	\`name\` text,
  	\`sku\` text,
  	\`barcode\` text,
  	\`address_id\` text(36) NOT NULL,
  	\`pricing_price\` numeric DEFAULT 0,
  	\`pricing_cost\` numeric,
  	\`pricing_compare_at_price\` numeric,
  	\`pricing_vendor_price\` numeric,
  	\`pricing_min_price\` numeric,
  	\`pricing_currency_code\` text DEFAULT 'EUR' NOT NULL,
  	\`pricing_price_includes_tax\` integer DEFAULT false,
  	\`taxation_taxable\` integer DEFAULT true,
  	\`taxation_tax_rate\` numeric,
  	\`taxation_tax_debit_account_id\` text,
  	\`taxation_tax_credit_account_id\` text,
  	\`ledger_debit_account_id\` text,
  	\`ledger_credit_account_id\` text,
  	\`inventory_inventory_quantity\` numeric DEFAULT 0 NOT NULL,
  	\`inventory_inventory_management\` text,
  	\`inventory_inventory_policy\` text,
  	\`physical_weight\` numeric,
  	\`physical_weight_unit\` text,
  	\`physical_grams\` numeric,
  	\`physical_hs_code\` text,
  	\`physical_contents\` text,
  	\`physical_requires_shipping\` integer DEFAULT true,
  	\`discounts_max_discount_rate\` numeric,
  	\`discounts_min_profit_rate\` numeric,
  	\`discounts_max_profit_rate\` numeric,
  	\`fulfillment_fulfillment_service\` text,
  	\`fulfillment_period\` text,
  	\`visibility_visibility\` text,
  	\`metadata\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`taxation_tax_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`taxation_tax_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_items\`("id", "uuid", "tenant_id", "code", "name", "sku", "barcode", "address_id", "pricing_price", "pricing_cost", "pricing_compare_at_price", "pricing_vendor_price", "pricing_min_price", "pricing_currency_code", "pricing_price_includes_tax", "taxation_taxable", "taxation_tax_rate", "taxation_tax_debit_account_id", "taxation_tax_credit_account_id", "ledger_debit_account_id", "ledger_credit_account_id", "inventory_inventory_quantity", "inventory_inventory_management", "inventory_inventory_policy", "physical_weight", "physical_weight_unit", "physical_grams", "physical_hs_code", "physical_contents", "physical_requires_shipping", "discounts_max_discount_rate", "discounts_min_profit_rate", "discounts_max_profit_rate", "fulfillment_fulfillment_service", "fulfillment_period", "visibility_visibility", "metadata", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "code", "name", "sku", "barcode", "address_id", "pricing_price", "pricing_cost", "pricing_compare_at_price", "pricing_vendor_price", "pricing_min_price", "pricing_currency_code", "pricing_price_includes_tax", "taxation_taxable", "taxation_tax_rate", "taxation_tax_debit_account_id", "taxation_tax_credit_account_id", "ledger_debit_account_id", "ledger_credit_account_id", "inventory_inventory_quantity", "inventory_inventory_management", "inventory_inventory_policy", "physical_weight", "physical_weight_unit", "physical_grams", "physical_hs_code", "physical_contents", "physical_requires_shipping", "discounts_max_discount_rate", "discounts_min_profit_rate", "discounts_max_profit_rate", "fulfillment_fulfillment_service", "fulfillment_period", "visibility_visibility", "metadata", "updated_at", "created_at" FROM \`items\`;`)
  await db.run(sql`DROP TABLE \`items\`;`)
  await db.run(sql`ALTER TABLE \`__new_items\` RENAME TO \`items\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`items_uuid_idx\` ON \`items\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`items_tenant_idx\` ON \`items\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`items_code_idx\` ON \`items\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`items_name_idx\` ON \`items\` (\`name\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`items_sku_idx\` ON \`items\` (\`sku\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`items_barcode_idx\` ON \`items\` (\`barcode\`);`)
  await db.run(sql`CREATE INDEX \`items_address_idx\` ON \`items\` (\`address_id\`);`)
  await db.run(sql`CREATE INDEX \`items_taxation_taxation_tax_debit_account_idx\` ON \`items\` (\`taxation_tax_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`items_taxation_taxation_tax_credit_account_idx\` ON \`items\` (\`taxation_tax_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`items_ledger_ledger_debit_account_idx\` ON \`items\` (\`ledger_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`items_ledger_ledger_credit_account_idx\` ON \`items\` (\`ledger_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`items_updated_at_idx\` ON \`items\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`items_created_at_idx\` ON \`items\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__items_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_code\` text NOT NULL,
  	\`version_name\` text,
  	\`version_sku\` text,
  	\`version_barcode\` text,
  	\`version_address_id\` text(36) NOT NULL,
  	\`version_pricing_price\` numeric DEFAULT 0,
  	\`version_pricing_cost\` numeric,
  	\`version_pricing_compare_at_price\` numeric,
  	\`version_pricing_vendor_price\` numeric,
  	\`version_pricing_min_price\` numeric,
  	\`version_pricing_currency_code\` text DEFAULT 'EUR' NOT NULL,
  	\`version_pricing_price_includes_tax\` integer DEFAULT false,
  	\`version_taxation_taxable\` integer DEFAULT true,
  	\`version_taxation_tax_rate\` numeric,
  	\`version_taxation_tax_debit_account_id\` text,
  	\`version_taxation_tax_credit_account_id\` text,
  	\`version_ledger_debit_account_id\` text,
  	\`version_ledger_credit_account_id\` text,
  	\`version_inventory_inventory_quantity\` numeric DEFAULT 0 NOT NULL,
  	\`version_inventory_inventory_management\` text,
  	\`version_inventory_inventory_policy\` text,
  	\`version_physical_weight\` numeric,
  	\`version_physical_weight_unit\` text,
  	\`version_physical_grams\` numeric,
  	\`version_physical_hs_code\` text,
  	\`version_physical_contents\` text,
  	\`version_physical_requires_shipping\` integer DEFAULT true,
  	\`version_discounts_max_discount_rate\` numeric,
  	\`version_discounts_min_profit_rate\` numeric,
  	\`version_discounts_max_profit_rate\` numeric,
  	\`version_fulfillment_fulfillment_service\` text,
  	\`version_fulfillment_period\` text,
  	\`version_visibility_visibility\` text,
  	\`version_metadata\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_taxation_tax_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_taxation_tax_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_ledger_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_ledger_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__items_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_code", "version_name", "version_sku", "version_barcode", "version_address_id", "version_pricing_price", "version_pricing_cost", "version_pricing_compare_at_price", "version_pricing_vendor_price", "version_pricing_min_price", "version_pricing_currency_code", "version_pricing_price_includes_tax", "version_taxation_taxable", "version_taxation_tax_rate", "version_taxation_tax_debit_account_id", "version_taxation_tax_credit_account_id", "version_ledger_debit_account_id", "version_ledger_credit_account_id", "version_inventory_inventory_quantity", "version_inventory_inventory_management", "version_inventory_inventory_policy", "version_physical_weight", "version_physical_weight_unit", "version_physical_grams", "version_physical_hs_code", "version_physical_contents", "version_physical_requires_shipping", "version_discounts_max_discount_rate", "version_discounts_min_profit_rate", "version_discounts_max_profit_rate", "version_fulfillment_fulfillment_service", "version_fulfillment_period", "version_visibility_visibility", "version_metadata", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_code", "version_name", "version_sku", "version_barcode", "version_address_id", "version_pricing_price", "version_pricing_cost", "version_pricing_compare_at_price", "version_pricing_vendor_price", "version_pricing_min_price", "version_pricing_currency_code", "version_pricing_price_includes_tax", "version_taxation_taxable", "version_taxation_tax_rate", "version_taxation_tax_debit_account_id", "version_taxation_tax_credit_account_id", "version_ledger_debit_account_id", "version_ledger_credit_account_id", "version_inventory_inventory_quantity", "version_inventory_inventory_management", "version_inventory_inventory_policy", "version_physical_weight", "version_physical_weight_unit", "version_physical_grams", "version_physical_hs_code", "version_physical_contents", "version_physical_requires_shipping", "version_discounts_max_discount_rate", "version_discounts_min_profit_rate", "version_discounts_max_profit_rate", "version_fulfillment_fulfillment_service", "version_fulfillment_period", "version_visibility_visibility", "version_metadata", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_items_v\`;`)
  await db.run(sql`DROP TABLE \`_items_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__items_v\` RENAME TO \`_items_v\`;`)
  await db.run(sql`CREATE INDEX \`_items_v_parent_idx\` ON \`_items_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_version_uuid_idx\` ON \`_items_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_version_tenant_idx\` ON \`_items_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_version_code_idx\` ON \`_items_v\` (\`version_code\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_version_name_idx\` ON \`_items_v\` (\`version_name\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_version_sku_idx\` ON \`_items_v\` (\`version_sku\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_version_barcode_idx\` ON \`_items_v\` (\`version_barcode\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_version_address_idx\` ON \`_items_v\` (\`version_address_id\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_taxation_version_taxation_tax_debit_acc_idx\` ON \`_items_v\` (\`version_taxation_tax_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_taxation_version_taxation_tax_credit_ac_idx\` ON \`_items_v\` (\`version_taxation_tax_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_ledger_version_ledger_debit_account_idx\` ON \`_items_v\` (\`version_ledger_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_ledger_version_ledger_credit_account_idx\` ON \`_items_v\` (\`version_ledger_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_version_updated_at_idx\` ON \`_items_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_version_version_created_at_idx\` ON \`_items_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_created_at_idx\` ON \`_items_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_items_v_updated_at_idx\` ON \`_items_v\` (\`updated_at\`);`)
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'operations', entity: 'collection', fieldPath: 'breadcrumbs', defaultLocale: 'en', req })
}
