import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`roles_rels\` ADD \`orders_id\` text(36) REFERENCES orders(id);`)
  await db.run(sql`CREATE INDEX \`roles_rels_orders_id_idx\` ON \`roles_rels\` (\`orders_id\`);`)
  await db.run(sql`ALTER TABLE \`_roles_v_rels\` ADD \`orders_id\` text(36) REFERENCES orders(id);`)
  await db.run(sql`CREATE INDEX \`_roles_v_rels_orders_id_idx\` ON \`_roles_v_rels\` (\`orders_id\`);`)
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'orders', entity: 'collection', fieldPath: 'approvalChain.comment', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'purchase-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'purchase-requisitions', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'purchase-requisitions', entity: 'collection', fieldPath: 'approvalChain.comment', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'vendor-quotes', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
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
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`roles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tenants_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_roles_rels\`("id", "order", "parent_id", "path", "tenants_id", "pages_id", "posts_id", "media_id", "categories_id", "products_id") SELECT "id", "order", "parent_id", "path", "tenants_id", "pages_id", "posts_id", "media_id", "categories_id", "products_id" FROM \`roles_rels\`;`)
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
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_roles_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tenants_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__roles_v_rels\`("id", "order", "parent_id", "path", "tenants_id", "pages_id", "posts_id", "media_id", "categories_id", "products_id") SELECT "id", "order", "parent_id", "path", "tenants_id", "pages_id", "posts_id", "media_id", "categories_id", "products_id" FROM \`_roles_v_rels\`;`)
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
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'orders', entity: 'collection', fieldPath: 'approvalChain.comment', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'purchase-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'purchase-requisitions', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'purchase-requisitions', entity: 'collection', fieldPath: 'approvalChain.comment', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'vendor-quotes', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
}
