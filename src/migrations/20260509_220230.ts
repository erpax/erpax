import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`tenants\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`domain\` text,
  	\`slug\` text NOT NULL,
  	\`locales\` text DEFAULT '[]',
  	\`config_identity_country\` text,
  	\`config_identity_legal_name\` text,
  	\`config_identity_tax_registration\` text,
  	\`config_localization_default_locale\` text,
  	\`config_localization_fallback_locale\` text,
  	\`config_currency_reporting_currency\` text,
  	\`config_accounting_standard\` text,
  	\`config_accounting_fiscal_year_start_month\` numeric DEFAULT 1,
  	\`allow_public_read\` integer DEFAULT false,
  	\`public_site_url\` text,
  	\`stripe_publishable_key\` text,
  	\`stripe_secret_key\` text,
  	\`stripe_webhook_secret\` text,
  	\`integration_settings\` text,
  	\`resend_api_key\` text,
  	\`email_default_from_address\` text,
  	\`email_default_from_name\` text,
  	\`mcp_api_key\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`tenants_domain_idx\` ON \`tenants\` (\`domain\`);`)
  await db.run(sql`CREATE INDEX \`tenants_slug_idx\` ON \`tenants\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`tenants_allow_public_read_idx\` ON \`tenants\` (\`allow_public_read\`);`)
  await db.run(sql`CREATE INDEX \`tenants_updated_at_idx\` ON \`tenants\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tenants_created_at_idx\` ON \`tenants\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pages_hero_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
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
  await db.run(sql`CREATE INDEX \`pages_hero_links_order_idx\` ON \`pages_hero_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_links_parent_id_idx\` ON \`pages_hero_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_hero_links_locale_idx\` ON \`pages_hero_links\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta_links\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_links_order_idx\` ON \`pages_blocks_cta_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_links_parent_id_idx\` ON \`pages_blocks_cta_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_links_locale_idx\` ON \`pages_blocks_cta_links\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_order_idx\` ON \`pages_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_parent_id_idx\` ON \`pages_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_path_idx\` ON \`pages_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_cta_locale_idx\` ON \`pages_blocks_cta\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_content_columns\` (
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
  await db.run(sql`CREATE INDEX \`pages_blocks_content_columns_order_idx\` ON \`pages_blocks_content_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_columns_parent_id_idx\` ON \`pages_blocks_content_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_columns_locale_idx\` ON \`pages_blocks_content_columns\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_order_idx\` ON \`pages_blocks_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_parent_id_idx\` ON \`pages_blocks_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_path_idx\` ON \`pages_blocks_content\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_content_locale_idx\` ON \`pages_blocks_content\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_media_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_media_block_order_idx\` ON \`pages_blocks_media_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_media_block_parent_id_idx\` ON \`pages_blocks_media_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_media_block_path_idx\` ON \`pages_blocks_media_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_media_block_locale_idx\` ON \`pages_blocks_media_block\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_media_block_media_idx\` ON \`pages_blocks_media_block\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_archive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
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
  await db.run(sql`CREATE INDEX \`pages_blocks_archive_order_idx\` ON \`pages_blocks_archive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_archive_parent_id_idx\` ON \`pages_blocks_archive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_archive_path_idx\` ON \`pages_blocks_archive\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_archive_locale_idx\` ON \`pages_blocks_archive\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`form_id\` integer,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_order_idx\` ON \`pages_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_parent_id_idx\` ON \`pages_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_path_idx\` ON \`pages_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_locale_idx\` ON \`pages_blocks_form_block\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_form_block_form_idx\` ON \`pages_blocks_form_block\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` integer,
  	\`title\` text,
  	\`url\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_breadcrumbs_order_idx\` ON \`pages_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_breadcrumbs_parent_id_idx\` ON \`pages_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_breadcrumbs_doc_idx\` ON \`pages_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer,
  	\`published_at\` text,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text,
  	\`parent_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_tenant_idx\` ON \`pages\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_published_at_idx\` ON \`pages\` (\`published_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`pages_parent_idx\` ON \`pages\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`pages__status_idx\` ON \`pages\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`pages_locales\` (
  	\`title\` text,
  	\`hero_type\` text DEFAULT 'lowImpact',
  	\`hero_rich_text\` text,
  	\`hero_media_id\` integer,
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_hero_hero_media_idx\` ON \`pages_locales\` (\`hero_media_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_locales_locale_parent_id_unique\` ON \`pages_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`locale\` text,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_locale_idx\` ON \`pages_rels\` (\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_pages_id_idx\` ON \`pages_rels\` (\`pages_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_posts_id_idx\` ON \`pages_rels\` (\`posts_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_categories_id_idx\` ON \`pages_rels\` (\`categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_version_hero_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_links_order_idx\` ON \`_pages_v_version_hero_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_links_parent_id_idx\` ON \`_pages_v_version_hero_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_links_locale_idx\` ON \`_pages_v_version_hero_links\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_links_order_idx\` ON \`_pages_v_blocks_cta_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_links_parent_id_idx\` ON \`_pages_v_blocks_cta_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_links_locale_idx\` ON \`_pages_v_blocks_cta_links\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_order_idx\` ON \`_pages_v_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_parent_id_idx\` ON \`_pages_v_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_path_idx\` ON \`_pages_v_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_cta_locale_idx\` ON \`_pages_v_blocks_cta\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_content_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
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
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_columns_order_idx\` ON \`_pages_v_blocks_content_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_columns_parent_id_idx\` ON \`_pages_v_blocks_content_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_columns_locale_idx\` ON \`_pages_v_blocks_content_columns\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_order_idx\` ON \`_pages_v_blocks_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_parent_id_idx\` ON \`_pages_v_blocks_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_path_idx\` ON \`_pages_v_blocks_content\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_content_locale_idx\` ON \`_pages_v_blocks_content\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_media_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_media_block_order_idx\` ON \`_pages_v_blocks_media_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_media_block_parent_id_idx\` ON \`_pages_v_blocks_media_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_media_block_path_idx\` ON \`_pages_v_blocks_media_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_media_block_locale_idx\` ON \`_pages_v_blocks_media_block\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_media_block_media_idx\` ON \`_pages_v_blocks_media_block\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_archive\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`intro_content\` text,
  	\`populate_by\` text DEFAULT 'collection',
  	\`relation_to\` text DEFAULT 'posts',
  	\`limit\` numeric DEFAULT 10,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_archive_order_idx\` ON \`_pages_v_blocks_archive\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_archive_parent_id_idx\` ON \`_pages_v_blocks_archive\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_archive_path_idx\` ON \`_pages_v_blocks_archive\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_archive_locale_idx\` ON \`_pages_v_blocks_archive\` (\`_locale\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_blocks_form_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`form_id\` integer,
  	\`enable_intro\` integer,
  	\`intro_content\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_order_idx\` ON \`_pages_v_blocks_form_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_parent_id_idx\` ON \`_pages_v_blocks_form_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_path_idx\` ON \`_pages_v_blocks_form_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_locale_idx\` ON \`_pages_v_blocks_form_block\` (\`_locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_blocks_form_block_form_idx\` ON \`_pages_v_blocks_form_block\` (\`form_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_version_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`doc_id\` integer,
  	\`title\` text,
  	\`url\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_version_breadcrumbs_order_idx\` ON \`_pages_v_version_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_breadcrumbs_parent_id_idx\` ON \`_pages_v_version_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_breadcrumbs_doc_idx\` ON \`_pages_v_version_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_tenant_id\` integer,
  	\`version_published_at\` text,
  	\`version_generate_slug\` integer DEFAULT true,
  	\`version_slug\` text,
  	\`version_parent_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_parent_idx\` ON \`_pages_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_tenant_idx\` ON \`_pages_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_published_at_idx\` ON \`_pages_v\` (\`version_published_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_slug_idx\` ON \`_pages_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_parent_idx\` ON \`_pages_v\` (\`version_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_updated_at_idx\` ON \`_pages_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version_created_at_idx\` ON \`_pages_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_version__status_idx\` ON \`_pages_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_created_at_idx\` ON \`_pages_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_updated_at_idx\` ON \`_pages_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_snapshot_idx\` ON \`_pages_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_published_locale_idx\` ON \`_pages_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_latest_idx\` ON \`_pages_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_autosave_idx\` ON \`_pages_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_locales\` (
  	\`version_title\` text,
  	\`version_hero_type\` text DEFAULT 'lowImpact',
  	\`version_hero_rich_text\` text,
  	\`version_hero_media_id\` integer,
  	\`version_meta_title\` text,
  	\`version_meta_image_id\` integer,
  	\`version_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`version_hero_media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_version_hero_version_hero_media_idx\` ON \`_pages_v_locales\` (\`version_hero_media_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_version_meta_version_meta_image_idx\` ON \`_pages_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_pages_v_locales_locale_parent_id_unique\` ON \`_pages_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pages_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`locale\` text,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_pages_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_order_idx\` ON \`_pages_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_parent_idx\` ON \`_pages_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_path_idx\` ON \`_pages_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_locale_idx\` ON \`_pages_v_rels\` (\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_pages_id_idx\` ON \`_pages_v_rels\` (\`pages_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_posts_id_idx\` ON \`_pages_v_rels\` (\`posts_id\`,\`locale\`);`)
  await db.run(sql`CREATE INDEX \`_pages_v_rels_categories_id_idx\` ON \`_pages_v_rels\` (\`categories_id\`,\`locale\`);`)
  await db.run(sql`CREATE TABLE \`posts_populated_authors\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_populated_authors_order_idx\` ON \`posts_populated_authors\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`posts_populated_authors_parent_id_idx\` ON \`posts_populated_authors\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer,
  	\`hero_image_id\` integer,
  	\`published_at\` text,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_tenant_idx\` ON \`posts\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_hero_image_idx\` ON \`posts\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_published_at_idx\` ON \`posts\` (\`published_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`posts__status_idx\` ON \`posts\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`posts_locales\` (
  	\`title\` text,
  	\`content\` text,
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_meta_meta_image_idx\` ON \`posts_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_locales_locale_parent_id_unique\` ON \`posts_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	\`categories_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`posts_rels_order_idx\` ON \`posts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_parent_idx\` ON \`posts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_path_idx\` ON \`posts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_posts_id_idx\` ON \`posts_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_categories_id_idx\` ON \`posts_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`posts_rels_users_id_idx\` ON \`posts_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_version_populated_authors\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_version_populated_authors_order_idx\` ON \`_posts_v_version_populated_authors\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_populated_authors_parent_id_idx\` ON \`_posts_v_version_populated_authors\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_tenant_id\` integer,
  	\`version_hero_image_id\` integer,
  	\`version_published_at\` text,
  	\`version_generate_slug\` integer DEFAULT true,
  	\`version_slug\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_tenant_idx\` ON \`_posts_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_hero_image_idx\` ON \`_posts_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_published_at_idx\` ON \`_posts_v\` (\`version_published_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_snapshot_idx\` ON \`_posts_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_published_locale_idx\` ON \`_posts_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_autosave_idx\` ON \`_posts_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_locales\` (
  	\`version_title\` text,
  	\`version_content\` text,
  	\`version_meta_title\` text,
  	\`version_meta_image_id\` integer,
  	\`version_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_version_meta_version_meta_image_idx\` ON \`_posts_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_posts_v_locales_locale_parent_id_unique\` ON \`_posts_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_posts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	\`categories_id\` integer,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_order_idx\` ON \`_posts_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_parent_idx\` ON \`_posts_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_path_idx\` ON \`_posts_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_posts_id_idx\` ON \`_posts_v_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_categories_id_idx\` ON \`_posts_v_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`_posts_v_rels_users_id_idx\` ON \`_posts_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer,
  	\`alt\` text,
  	\`caption\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric,
  	\`sizes_thumbnail_url\` text,
  	\`sizes_thumbnail_width\` numeric,
  	\`sizes_thumbnail_height\` numeric,
  	\`sizes_thumbnail_mime_type\` text,
  	\`sizes_thumbnail_filesize\` numeric,
  	\`sizes_thumbnail_filename\` text,
  	\`sizes_square_url\` text,
  	\`sizes_square_width\` numeric,
  	\`sizes_square_height\` numeric,
  	\`sizes_square_mime_type\` text,
  	\`sizes_square_filesize\` numeric,
  	\`sizes_square_filename\` text,
  	\`sizes_small_url\` text,
  	\`sizes_small_width\` numeric,
  	\`sizes_small_height\` numeric,
  	\`sizes_small_mime_type\` text,
  	\`sizes_small_filesize\` numeric,
  	\`sizes_small_filename\` text,
  	\`sizes_medium_url\` text,
  	\`sizes_medium_width\` numeric,
  	\`sizes_medium_height\` numeric,
  	\`sizes_medium_mime_type\` text,
  	\`sizes_medium_filesize\` numeric,
  	\`sizes_medium_filename\` text,
  	\`sizes_large_url\` text,
  	\`sizes_large_width\` numeric,
  	\`sizes_large_height\` numeric,
  	\`sizes_large_mime_type\` text,
  	\`sizes_large_filesize\` numeric,
  	\`sizes_large_filename\` text,
  	\`sizes_xlarge_url\` text,
  	\`sizes_xlarge_width\` numeric,
  	\`sizes_xlarge_height\` numeric,
  	\`sizes_xlarge_mime_type\` text,
  	\`sizes_xlarge_filesize\` numeric,
  	\`sizes_xlarge_filename\` text,
  	\`sizes_og_url\` text,
  	\`sizes_og_width\` numeric,
  	\`sizes_og_height\` numeric,
  	\`sizes_og_mime_type\` text,
  	\`sizes_og_filesize\` numeric,
  	\`sizes_og_filename\` text,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`media_tenant_idx\` ON \`media\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_thumbnail_sizes_thumbnail_filename_idx\` ON \`media\` (\`sizes_thumbnail_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_square_sizes_square_filename_idx\` ON \`media\` (\`sizes_square_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_small_sizes_small_filename_idx\` ON \`media\` (\`sizes_small_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_medium_sizes_medium_filename_idx\` ON \`media\` (\`sizes_medium_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_large_sizes_large_filename_idx\` ON \`media\` (\`sizes_large_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_xlarge_sizes_xlarge_filename_idx\` ON \`media\` (\`sizes_xlarge_filename\`);`)
  await db.run(sql`CREATE INDEX \`media_sizes_og_sizes_og_filename_idx\` ON \`media\` (\`sizes_og_filename\`);`)
  await db.run(sql`CREATE TABLE \`categories_breadcrumbs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_id\` integer,
  	\`title\` text,
  	\`url\` text,
  	FOREIGN KEY (\`doc_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_breadcrumbs_order_idx\` ON \`categories_breadcrumbs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`categories_breadcrumbs_parent_id_idx\` ON \`categories_breadcrumbs\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_breadcrumbs_doc_idx\` ON \`categories_breadcrumbs\` (\`doc_id\`);`)
  await db.run(sql`CREATE TABLE \`categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer,
  	\`title\` text NOT NULL,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text NOT NULL,
  	\`parent_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`categories_tenant_idx\` ON \`categories\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`categories_parent_idx\` ON \`categories\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`categories_updated_at_idx\` ON \`categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`categories_created_at_idx\` ON \`categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`roles\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`binding\` text DEFAULT 'global' NOT NULL,
  	\`scoped_collection\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`roles_name_idx\` ON \`roles\` (\`name\`);`)
  await db.run(sql`CREATE INDEX \`roles_updated_at_idx\` ON \`roles\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`roles_created_at_idx\` ON \`roles\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`roles_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tenants_id\` integer,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	\`media_id\` integer,
  	\`categories_id\` integer,
  	\`products_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`roles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tenants_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`roles_rels_order_idx\` ON \`roles_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_parent_idx\` ON \`roles_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_path_idx\` ON \`roles_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_tenants_id_idx\` ON \`roles_rels\` (\`tenants_id\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_pages_id_idx\` ON \`roles_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_posts_id_idx\` ON \`roles_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_media_id_idx\` ON \`roles_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_categories_id_idx\` ON \`roles_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`roles_rels_products_id_idx\` ON \`roles_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE TABLE \`user_roles\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`user_id\` integer NOT NULL,
  	\`role_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`user_roles_user_idx\` ON \`user_roles\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`user_roles_role_idx\` ON \`user_roles\` (\`role_id\`);`)
  await db.run(sql`CREATE INDEX \`user_roles_updated_at_idx\` ON \`user_roles\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`user_roles_created_at_idx\` ON \`user_roles\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`users_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_roles_order_idx\` ON \`users_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`users_roles_parent_idx\` ON \`users_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users_tenants_roles\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users_tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_tenants_roles_order_idx\` ON \`users_tenants_roles\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`users_tenants_roles_parent_idx\` ON \`users_tenants_roles\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users_tenants\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_tenants_order_idx\` ON \`users_tenants\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_tenants_parent_id_idx\` ON \`users_tenants\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`users_tenants_tenant_idx\` ON \`users_tenants\` (\`tenant_id\`);`)
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`password\` text,
  	\`name\` text,
  	\`username\` text,
  	\`config_localization_default_locale\` text,
  	\`config_localization_display_currency\` text,
  	\`config_localization_date_format\` text DEFAULT 'locale',
  	\`config_features\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_username_idx\` ON \`users\` (\`username\`);`)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`subscription_plans\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`stripe_product_id\` text,
  	\`stripe_price_id\` text,
  	\`monthly_u_s_d\` numeric DEFAULT 0 NOT NULL,
  	\`yearly_u_s_d\` numeric,
  	\`billing_cycle\` text DEFAULT 'monthly' NOT NULL,
  	\`limits\` text DEFAULT '{"apiCallsPerMonth":null,"storageGB":null,"seats":null,"customDomains":false,"advancedAnalytics":false,"prioritySupport":false,"apiAccess":false,"webhooks":false}' NOT NULL,
  	\`is_active\` integer DEFAULT true,
  	\`description\` text,
  	\`sort_order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`subscription_plans_name_idx\` ON \`subscription_plans\` (\`name\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`subscription_plans_slug_idx\` ON \`subscription_plans\` (\`slug\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`subscription_plans_stripe_product_id_idx\` ON \`subscription_plans\` (\`stripe_product_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`subscription_plans_stripe_price_id_idx\` ON \`subscription_plans\` (\`stripe_price_id\`);`)
  await db.run(sql`CREATE INDEX \`subscription_plans_updated_at_idx\` ON \`subscription_plans\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`subscription_plans_created_at_idx\` ON \`subscription_plans\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`subscriptions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`plan_id\` integer NOT NULL,
  	\`status\` text DEFAULT 'trial' NOT NULL,
  	\`trial_started_at\` text,
  	\`trial_ends_at\` text,
  	\`current_period_start\` text,
  	\`current_period_end\` text,
  	\`stripe_subscription_id\` text,
  	\`stripe_customer_id\` text,
  	\`cancelled_at\` text,
  	\`cancellation_reason\` text,
  	\`paused_at\` text,
  	\`resume_at\` text,
  	\`last_status_change\` text,
  	\`last_status_change_reason\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`plan_id\`) REFERENCES \`subscription_plans\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`subscriptions_tenant_idx\` ON \`subscriptions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`subscriptions_plan_idx\` ON \`subscriptions\` (\`plan_id\`);`)
  await db.run(sql`CREATE INDEX \`subscriptions_status_idx\` ON \`subscriptions\` (\`status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`subscriptions_stripe_subscription_id_idx\` ON \`subscriptions\` (\`stripe_subscription_id\`);`)
  await db.run(sql`CREATE INDEX \`subscriptions_stripe_customer_id_idx\` ON \`subscriptions\` (\`stripe_customer_id\`);`)
  await db.run(sql`CREATE INDEX \`subscriptions_updated_at_idx\` ON \`subscriptions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`subscriptions_created_at_idx\` ON \`subscriptions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`items\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`sku\` text,
  	\`barcode\` text,
  	\`address_id\` integer NOT NULL,
  	\`pricing_price\` numeric DEFAULT 0,
  	\`pricing_cost\` numeric,
  	\`pricing_compare_at_price\` numeric,
  	\`pricing_vendor_price\` numeric,
  	\`pricing_min_price\` numeric,
  	\`pricing_currency_code\` text DEFAULT 'EUR' NOT NULL,
  	\`pricing_price_includes_tax\` integer DEFAULT false,
  	\`taxation_taxable\` integer DEFAULT true,
  	\`taxation_tax_rate\` numeric,
  	\`taxation_tax_debit_account_id\` integer,
  	\`taxation_tax_credit_account_id\` integer,
  	\`ledger_debit_account_id\` integer,
  	\`ledger_credit_account_id\` integer,
  	\`inventory_inventory_quantity\` numeric DEFAULT 0 NOT NULL,
  	\`inventory_inventory_management\` text,
  	\`inventory_inventory_policy\` text,
  	\`physical_weight\` numeric,
  	\`physical_weight_unit\` text,
  	\`physical_grams\` numeric,
  	\`physical_hs_code\` text,
  	\`physical_requires_shipping\` integer DEFAULT true,
  	\`discounts_max_discount_rate\` numeric,
  	\`discounts_min_profit_rate\` numeric,
  	\`discounts_max_profit_rate\` numeric,
  	\`fulfillment_fulfillment_service\` text,
  	\`fulfillment_period\` text,
  	\`visibility_visibility\` text,
  	\`metadata\` text,
  	\`tenant_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`taxation_tax_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`taxation_tax_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`items_code_idx\` ON \`items\` (\`code\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`items_sku_idx\` ON \`items\` (\`sku\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`items_barcode_idx\` ON \`items\` (\`barcode\`);`)
  await db.run(sql`CREATE INDEX \`items_address_idx\` ON \`items\` (\`address_id\`);`)
  await db.run(sql`CREATE INDEX \`items_taxation_taxation_tax_debit_account_idx\` ON \`items\` (\`taxation_tax_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`items_taxation_taxation_tax_credit_account_idx\` ON \`items\` (\`taxation_tax_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`items_ledger_ledger_debit_account_idx\` ON \`items\` (\`ledger_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`items_ledger_ledger_credit_account_idx\` ON \`items\` (\`ledger_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`items_tenant_idx\` ON \`items\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`items_updated_at_idx\` ON \`items\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`items_created_at_idx\` ON \`items\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`invoices_vat_breakdown\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
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
  await db.run(sql`CREATE INDEX \`invoices_vat_breakdown_order_idx\` ON \`invoices_vat_breakdown\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`invoices_vat_breakdown_parent_id_idx\` ON \`invoices_vat_breakdown\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`invoices\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`type_status_invoice_type\` text NOT NULL,
  	\`type_status_invoice_type_code\` text,
  	\`type_status_status\` text,
  	\`type_status_confirmed\` integer DEFAULT false,
  	\`number\` text,
  	\`protocol_number\` text,
  	\`purchase_order\` text,
  	\`sales_order\` text,
  	\`parties_seller_id\` integer NOT NULL,
  	\`parties_seller_agent_id\` integer,
  	\`parties_buyer_id\` integer NOT NULL,
  	\`parties_buyer_agent_id\` integer,
  	\`parties_supplier_id\` integer,
  	\`parties_consignee_id\` integer,
  	\`dates_date\` text,
  	\`dates_issued_at\` text,
  	\`dates_order_date\` text,
  	\`dates_proforma_date\` text,
  	\`dates_protocol_date\` text,
  	\`dates_payment_date\` text,
  	\`dates_paid_at\` text,
  	\`dates_delivered_at\` text,
  	\`dates_cancelled_at\` text,
  	\`dates_due_at\` text,
  	\`dates_past_due_since_at\` text,
  	\`dates_grace_period_ends_at\` text,
  	\`dates_suspension_scheduled_for\` text,
  	\`amounts_item_total\` numeric DEFAULT 0 NOT NULL,
  	\`amounts_discount_total\` numeric DEFAULT 0,
  	\`amounts_allowances_total\` numeric DEFAULT 0,
  	\`amounts_charges_total\` numeric DEFAULT 0,
  	\`amounts_net_total\` numeric DEFAULT 0,
  	\`amounts_tax_total\` numeric DEFAULT 0,
  	\`amounts_total_amount\` numeric DEFAULT 0 NOT NULL,
  	\`amounts_prepaid_amount\` numeric DEFAULT 0,
  	\`amounts_rounding_amount\` numeric DEFAULT 0,
  	\`amounts_total_paid\` numeric DEFAULT 0,
  	\`amounts_total_due\` numeric DEFAULT 0,
  	\`billing_tax_currency_code\` text DEFAULT 'EUR' NOT NULL,
  	\`billing_tax_exchange_rate\` numeric,
  	\`billing_tax_tax_type\` text,
  	\`billing_tax_taxes_included\` integer DEFAULT false,
  	\`billing_tax_tax_note\` text,
  	\`recurring_billing_period\` text,
  	\`recurring_next_billing_date\` text,
  	\`recurring_period_start\` text,
  	\`recurring_period_end\` text,
  	\`recurring_subscription_id\` integer,
  	\`ledger_debit_account_id\` integer,
  	\`ledger_credit_account_id\` integer,
  	\`notes_note\` text,
  	\`notes_invoice_note\` text,
  	\`notes_delivery_note\` text,
  	\`notes_delivery_terms\` text,
  	\`notes_payment_terms\` text,
  	\`notes_payment_methods\` text,
  	\`relationships_parent_id\` integer,
  	\`relationships_order_id\` integer,
  	\`relationships_domain_id\` integer,
  	\`test\` integer DEFAULT false,
  	\`metadata\` text,
  	\`tenant_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parties_seller_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parties_seller_agent_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parties_buyer_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parties_buyer_agent_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parties_supplier_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parties_consignee_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`recurring_subscription_id\`) REFERENCES \`subscriptions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`relationships_parent_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`relationships_order_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`relationships_domain_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`invoices_type_status_type_status_invoice_type_idx\` ON \`invoices\` (\`type_status_invoice_type\`);`)
  await db.run(sql`CREATE INDEX \`invoices_type_status_type_status_status_idx\` ON \`invoices\` (\`type_status_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`invoices_number_idx\` ON \`invoices\` (\`number\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`invoices_protocol_number_idx\` ON \`invoices\` (\`protocol_number\`);`)
  await db.run(sql`CREATE INDEX \`invoices_parties_parties_seller_idx\` ON \`invoices\` (\`parties_seller_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_parties_parties_seller_agent_idx\` ON \`invoices\` (\`parties_seller_agent_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_parties_parties_buyer_idx\` ON \`invoices\` (\`parties_buyer_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_parties_parties_buyer_agent_idx\` ON \`invoices\` (\`parties_buyer_agent_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_parties_parties_supplier_idx\` ON \`invoices\` (\`parties_supplier_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_parties_parties_consignee_idx\` ON \`invoices\` (\`parties_consignee_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_dates_dates_date_idx\` ON \`invoices\` (\`dates_date\`);`)
  await db.run(sql`CREATE INDEX \`invoices_dates_dates_due_at_idx\` ON \`invoices\` (\`dates_due_at\`);`)
  await db.run(sql`CREATE INDEX \`invoices_dates_dates_past_due_since_at_idx\` ON \`invoices\` (\`dates_past_due_since_at\`);`)
  await db.run(sql`CREATE INDEX \`invoices_recurring_recurring_next_billing_date_idx\` ON \`invoices\` (\`recurring_next_billing_date\`);`)
  await db.run(sql`CREATE INDEX \`invoices_recurring_recurring_subscription_idx\` ON \`invoices\` (\`recurring_subscription_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_ledger_ledger_debit_account_idx\` ON \`invoices\` (\`ledger_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_ledger_ledger_credit_account_idx\` ON \`invoices\` (\`ledger_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_relationships_relationships_parent_idx\` ON \`invoices\` (\`relationships_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_relationships_relationships_order_idx\` ON \`invoices\` (\`relationships_order_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_relationships_relationships_domain_idx\` ON \`invoices\` (\`relationships_domain_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_tenant_idx\` ON \`invoices\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`invoices_updated_at_idx\` ON \`invoices\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`invoices_created_at_idx\` ON \`invoices\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`invoice_lines\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`invoice_id\` integer NOT NULL,
  	\`code\` text,
  	\`description\` text NOT NULL,
  	\`line_note\` text,
  	\`object_identifier\` text,
  	\`status\` text,
  	\`items_buyer_item_id\` integer,
  	\`items_seller_item_id\` integer,
  	\`items_source_id\` integer,
  	\`items_destination_id\` integer,
  	\`quantity_quantity\` numeric DEFAULT 1 NOT NULL,
  	\`quantity_unit\` text,
  	\`quantity_grams\` numeric,
  	\`pricing_unit_price\` numeric DEFAULT 0 NOT NULL,
  	\`pricing_item_total\` numeric DEFAULT 0 NOT NULL,
  	\`pricing_exchange_rate\` numeric,
  	\`discounting_discount_rate\` numeric,
  	\`discounting_discount_total\` numeric DEFAULT 0,
  	\`taxation_taxable\` integer DEFAULT true,
  	\`taxation_vat_category_code\` text,
  	\`taxation_tax_rate\` numeric,
  	\`taxation_vat_exemption_reason_code\` text,
  	\`taxation_vat_exemption_reason\` text,
  	\`taxation_price_includes_tax\` integer DEFAULT false,
  	\`taxation_net_total\` numeric DEFAULT 0,
  	\`taxation_tax_total\` numeric DEFAULT 0,
  	\`totals_total_amount\` numeric DEFAULT 0 NOT NULL,
  	\`totals_total_paid\` numeric DEFAULT 0,
  	\`totals_total_due\` numeric DEFAULT 0,
  	\`ledger_debit_account_id\` integer,
  	\`ledger_credit_account_id\` integer,
  	\`ledger_tax_debit_account_id\` integer,
  	\`ledger_tax_credit_account_id\` integer,
  	\`dates_contract_start\` text,
  	\`dates_contract_end\` text,
  	\`dates_period_start\` text,
  	\`dates_period_end\` text,
  	\`dates_delivered_at\` text,
  	\`dates_returned_at\` text,
  	\`details_currency_code\` text,
  	\`details_sku\` text,
  	\`details_hs_code\` text,
  	\`details_serial_number\` text,
  	\`details_lot\` text,
  	\`details_variant\` text,
  	\`details_variation\` text,
  	\`details_option\` text,
  	\`details_period\` text,
  	\`details_gift_card\` integer DEFAULT false,
  	\`metadata\` text,
  	\`tenant_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`items_buyer_item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`items_seller_item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`items_source_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`items_destination_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_tax_debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_tax_credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`invoice_lines_invoice_idx\` ON \`invoice_lines\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_code_idx\` ON \`invoice_lines\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_items_items_buyer_item_idx\` ON \`invoice_lines\` (\`items_buyer_item_id\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_items_items_seller_item_idx\` ON \`invoice_lines\` (\`items_seller_item_id\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_items_items_source_idx\` ON \`invoice_lines\` (\`items_source_id\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_items_items_destination_idx\` ON \`invoice_lines\` (\`items_destination_id\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_ledger_ledger_debit_account_idx\` ON \`invoice_lines\` (\`ledger_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_ledger_ledger_credit_account_idx\` ON \`invoice_lines\` (\`ledger_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_ledger_ledger_tax_debit_account_idx\` ON \`invoice_lines\` (\`ledger_tax_debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_ledger_ledger_tax_credit_account_idx\` ON \`invoice_lines\` (\`ledger_tax_credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_tenant_idx\` ON \`invoice_lines\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_updated_at_idx\` ON \`invoice_lines\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`invoice_lines_created_at_idx\` ON \`invoice_lines\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payment_methods\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
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
  await db.run(sql`CREATE INDEX \`payment_methods_tenant_idx\` ON \`payment_methods\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`payment_methods_stripe_payment_method_id_idx\` ON \`payment_methods\` (\`stripe_payment_method_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_methods_updated_at_idx\` ON \`payment_methods\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payment_methods_created_at_idx\` ON \`payment_methods\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payments\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`transaction_number\` text,
  	\`invoice_id\` integer NOT NULL,
  	\`parties_sender_id\` integer NOT NULL,
  	\`parties_receiver_id\` integer NOT NULL,
  	\`amounts_amount\` numeric DEFAULT 0 NOT NULL,
  	\`amounts_invoice_amount\` numeric,
  	\`amounts_currency_code\` text DEFAULT 'EUR' NOT NULL,
  	\`amounts_exchange_rate\` numeric,
  	\`dates_sent_at\` text,
  	\`dates_received_at\` text,
  	\`dates_authorized_at\` text,
  	\`authorization_authorized_by_id\` integer,
  	\`payment_payment_method\` text,
  	\`payment_note\` text,
  	\`metadata\` text,
  	\`tenant_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parties_sender_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parties_receiver_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`authorization_authorized_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payments_transaction_number_idx\` ON \`payments\` (\`transaction_number\`);`)
  await db.run(sql`CREATE INDEX \`payments_invoice_idx\` ON \`payments\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`payments_parties_parties_sender_idx\` ON \`payments\` (\`parties_sender_id\`);`)
  await db.run(sql`CREATE INDEX \`payments_parties_parties_receiver_idx\` ON \`payments\` (\`parties_receiver_id\`);`)
  await db.run(sql`CREATE INDEX \`payments_authorization_authorization_authorized_by_idx\` ON \`payments\` (\`authorization_authorized_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payments_tenant_idx\` ON \`payments\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`payments_updated_at_idx\` ON \`payments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payments_created_at_idx\` ON \`payments\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`addresses\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer,
  	\`customer_id\` integer,
  	\`title\` text,
  	\`first_name\` text,
  	\`last_name\` text,
  	\`company\` text,
  	\`address_line1\` text,
  	\`address_line2\` text,
  	\`city\` text,
  	\`state\` text,
  	\`postal_code\` text,
  	\`country\` text NOT NULL,
  	\`phone\` text,
  	\`code\` text,
  	\`name\` text,
  	\`email\` text,
  	\`tax_type\` text,
  	\`tax_code\` text,
  	\`tax_rate\` numeric,
  	\`nin_code\` text,
  	\`currency_code\` text DEFAULT 'EUR',
  	\`debit_account_id\` integer,
  	\`credit_account_id\` integer,
  	\`cash_account_id\` integer,
  	\`note\` text,
  	\`is_default\` integer DEFAULT false,
  	\`metadata\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cash_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`addresses_tenant_idx\` ON \`addresses\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`addresses_customer_idx\` ON \`addresses\` (\`customer_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`addresses_code_idx\` ON \`addresses\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`addresses_tax_code_idx\` ON \`addresses\` (\`tax_code\`);`)
  await db.run(sql`CREATE INDEX \`addresses_nin_code_idx\` ON \`addresses\` (\`nin_code\`);`)
  await db.run(sql`CREATE INDEX \`addresses_debit_account_idx\` ON \`addresses\` (\`debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`addresses_credit_account_idx\` ON \`addresses\` (\`credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`addresses_cash_account_idx\` ON \`addresses\` (\`cash_account_id\`);`)
  await db.run(sql`CREATE INDEX \`addresses_updated_at_idx\` ON \`addresses\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`addresses_created_at_idx\` ON \`addresses\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`variants\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer,
  	\`title\` text,
  	\`product_id\` integer,
  	\`inventory\` numeric DEFAULT 0,
  	\`price_in_e_u_r_enabled\` integer,
  	\`price_in_e_u_r\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`deleted_at\` text,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`variants_tenant_idx\` ON \`variants\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`variants_product_idx\` ON \`variants\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX \`variants_updated_at_idx\` ON \`variants\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`variants_created_at_idx\` ON \`variants\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`variants_deleted_at_idx\` ON \`variants\` (\`deleted_at\`);`)
  await db.run(sql`CREATE INDEX \`variants__status_idx\` ON \`variants\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`variants_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`variant_options_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`variant_options_id\`) REFERENCES \`variant_options\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`variants_rels_order_idx\` ON \`variants_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`variants_rels_parent_idx\` ON \`variants_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`variants_rels_path_idx\` ON \`variants_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`variants_rels_variant_options_id_idx\` ON \`variants_rels\` (\`variant_options_id\`);`)
  await db.run(sql`CREATE TABLE \`_variants_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_tenant_id\` integer,
  	\`version_title\` text,
  	\`version_product_id\` integer,
  	\`version_inventory\` numeric DEFAULT 0,
  	\`version_price_in_e_u_r_enabled\` integer,
  	\`version_price_in_e_u_r\` numeric,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version_deleted_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_variants_v_parent_idx\` ON \`_variants_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_version_version_tenant_idx\` ON \`_variants_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_version_version_product_idx\` ON \`_variants_v\` (\`version_product_id\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_version_version_updated_at_idx\` ON \`_variants_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_version_version_created_at_idx\` ON \`_variants_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_version_version_deleted_at_idx\` ON \`_variants_v\` (\`version_deleted_at\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_version_version__status_idx\` ON \`_variants_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_created_at_idx\` ON \`_variants_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_updated_at_idx\` ON \`_variants_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_snapshot_idx\` ON \`_variants_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_published_locale_idx\` ON \`_variants_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_latest_idx\` ON \`_variants_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_autosave_idx\` ON \`_variants_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_variants_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`variant_options_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_variants_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`variant_options_id\`) REFERENCES \`variant_options\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_variants_v_rels_order_idx\` ON \`_variants_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_rels_parent_idx\` ON \`_variants_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_rels_path_idx\` ON \`_variants_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_variants_v_rels_variant_options_id_idx\` ON \`_variants_v_rels\` (\`variant_options_id\`);`)
  await db.run(sql`CREATE TABLE \`variant_types\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer,
  	\`label\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`deleted_at\` text,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`variant_types_tenant_idx\` ON \`variant_types\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`variant_types_updated_at_idx\` ON \`variant_types\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`variant_types_created_at_idx\` ON \`variant_types\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`variant_types_deleted_at_idx\` ON \`variant_types\` (\`deleted_at\`);`)
  await db.run(sql`CREATE TABLE \`variant_options\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_variantoptions_options_order\` text,
  	\`tenant_id\` integer,
  	\`variant_type_id\` integer NOT NULL,
  	\`label\` text NOT NULL,
  	\`value\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`deleted_at\` text,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_type_id\`) REFERENCES \`variant_types\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`variant_options__variantoptions_options_order_idx\` ON \`variant_options\` (\`_variantoptions_options_order\`);`)
  await db.run(sql`CREATE INDEX \`variant_options_tenant_idx\` ON \`variant_options\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`variant_options_variant_type_idx\` ON \`variant_options\` (\`variant_type_id\`);`)
  await db.run(sql`CREATE INDEX \`variant_options_updated_at_idx\` ON \`variant_options\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`variant_options_created_at_idx\` ON \`variant_options\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`variant_options_deleted_at_idx\` ON \`variant_options\` (\`deleted_at\`);`)
  await db.run(sql`CREATE TABLE \`products_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`variant_option_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_option_id\`) REFERENCES \`variant_options\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_gallery_order_idx\` ON \`products_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_gallery_parent_id_idx\` ON \`products_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_gallery_image_idx\` ON \`products_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`products_gallery_variant_option_idx\` ON \`products_gallery\` (\`variant_option_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_cta_links\` (
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
  await db.run(sql`CREATE INDEX \`products_blocks_cta_links_order_idx\` ON \`products_blocks_cta_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_cta_links_parent_id_idx\` ON \`products_blocks_cta_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_cta_order_idx\` ON \`products_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_cta_parent_id_idx\` ON \`products_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_cta_path_idx\` ON \`products_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_content_columns\` (
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
  await db.run(sql`CREATE INDEX \`products_blocks_content_columns_order_idx\` ON \`products_blocks_content_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_content_columns_parent_id_idx\` ON \`products_blocks_content_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_content_order_idx\` ON \`products_blocks_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_content_parent_id_idx\` ON \`products_blocks_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_content_path_idx\` ON \`products_blocks_content\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`products_blocks_media_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_blocks_media_block_order_idx\` ON \`products_blocks_media_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_media_block_parent_id_idx\` ON \`products_blocks_media_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_media_block_path_idx\` ON \`products_blocks_media_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`products_blocks_media_block_media_idx\` ON \`products_blocks_media_block\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`products\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer,
  	\`title\` text,
  	\`description\` text,
  	\`inventory\` numeric DEFAULT 0,
  	\`enable_variants\` integer,
  	\`price_in_e_u_r_enabled\` integer,
  	\`price_in_e_u_r\` numeric,
  	\`generate_slug\` integer DEFAULT true,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`deleted_at\` text,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`products_tenant_idx\` ON \`products\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`products_slug_idx\` ON \`products\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`products_updated_at_idx\` ON \`products\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`products_created_at_idx\` ON \`products\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`products_deleted_at_idx\` ON \`products\` (\`deleted_at\`);`)
  await db.run(sql`CREATE INDEX \`products__status_idx\` ON \`products\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`products_locales\` (
  	\`meta_title\` text,
  	\`meta_image_id\` integer,
  	\`meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_meta_meta_image_idx\` ON \`products_locales\` (\`meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`products_locales_locale_parent_id_unique\` ON \`products_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`products_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	\`variant_types_id\` integer,
  	\`products_id\` integer,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`variant_types_id\`) REFERENCES \`variant_types\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`products_rels_order_idx\` ON \`products_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_parent_idx\` ON \`products_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_path_idx\` ON \`products_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_pages_id_idx\` ON \`products_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_posts_id_idx\` ON \`products_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_variant_types_id_idx\` ON \`products_rels\` (\`variant_types_id\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_products_id_idx\` ON \`products_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`products_rels_categories_id_idx\` ON \`products_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_version_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`variant_option_id\` integer,
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_option_id\`) REFERENCES \`variant_options\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_gallery_order_idx\` ON \`_products_v_version_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_gallery_parent_id_idx\` ON \`_products_v_version_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_gallery_image_idx\` ON \`_products_v_version_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_gallery_variant_option_idx\` ON \`_products_v_version_gallery\` (\`variant_option_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_blocks_cta_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text,
  	\`link_appearance\` text DEFAULT 'default',
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v_blocks_cta\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_blocks_cta_links_order_idx\` ON \`_products_v_blocks_cta_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_blocks_cta_links_parent_id_idx\` ON \`_products_v_blocks_cta_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_blocks_cta\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_blocks_cta_order_idx\` ON \`_products_v_blocks_cta\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_blocks_cta_parent_id_idx\` ON \`_products_v_blocks_cta\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_blocks_cta_path_idx\` ON \`_products_v_blocks_cta\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_blocks_content_columns\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
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
  await db.run(sql`CREATE INDEX \`_products_v_blocks_content_columns_order_idx\` ON \`_products_v_blocks_content_columns\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_blocks_content_columns_parent_id_idx\` ON \`_products_v_blocks_content_columns\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_blocks_content_order_idx\` ON \`_products_v_blocks_content\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_blocks_content_parent_id_idx\` ON \`_products_v_blocks_content\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_blocks_content_path_idx\` ON \`_products_v_blocks_content\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_blocks_media_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_blocks_media_block_order_idx\` ON \`_products_v_blocks_media_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_blocks_media_block_parent_id_idx\` ON \`_products_v_blocks_media_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_blocks_media_block_path_idx\` ON \`_products_v_blocks_media_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_blocks_media_block_media_idx\` ON \`_products_v_blocks_media_block\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_tenant_id\` integer,
  	\`version_title\` text,
  	\`version_description\` text,
  	\`version_inventory\` numeric DEFAULT 0,
  	\`version_enable_variants\` integer,
  	\`version_price_in_e_u_r_enabled\` integer,
  	\`version_price_in_e_u_r\` numeric,
  	\`version_generate_slug\` integer DEFAULT true,
  	\`version_slug\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version_deleted_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`snapshot\` integer,
  	\`published_locale\` text,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_parent_idx\` ON \`_products_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_tenant_idx\` ON \`_products_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_slug_idx\` ON \`_products_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_updated_at_idx\` ON \`_products_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_created_at_idx\` ON \`_products_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version_deleted_at_idx\` ON \`_products_v\` (\`version_deleted_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_version_version__status_idx\` ON \`_products_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_created_at_idx\` ON \`_products_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_updated_at_idx\` ON \`_products_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_snapshot_idx\` ON \`_products_v\` (\`snapshot\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_published_locale_idx\` ON \`_products_v\` (\`published_locale\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_latest_idx\` ON \`_products_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_autosave_idx\` ON \`_products_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_locales\` (
  	\`version_meta_title\` text,
  	\`version_meta_image_id\` integer,
  	\`version_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`version_meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_version_meta_version_meta_image_idx\` ON \`_products_v_locales\` (\`version_meta_image_id\`,\`_locale\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`_products_v_locales_locale_parent_id_unique\` ON \`_products_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_products_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	\`variant_types_id\` integer,
  	\`products_id\` integer,
  	\`categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_products_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`variant_types_id\`) REFERENCES \`variant_types\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_products_v_rels_order_idx\` ON \`_products_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_rels_parent_idx\` ON \`_products_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_rels_path_idx\` ON \`_products_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_rels_pages_id_idx\` ON \`_products_v_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_rels_posts_id_idx\` ON \`_products_v_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_rels_variant_types_id_idx\` ON \`_products_v_rels\` (\`variant_types_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_rels_products_id_idx\` ON \`_products_v_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`_products_v_rels_categories_id_idx\` ON \`_products_v_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE TABLE \`carts_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`product_id\` integer,
  	\`variant_id\` integer,
  	\`quantity\` numeric DEFAULT 1 NOT NULL,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`carts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`carts_items_order_idx\` ON \`carts_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`carts_items_parent_id_idx\` ON \`carts_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`carts_items_product_idx\` ON \`carts_items\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX \`carts_items_variant_idx\` ON \`carts_items\` (\`variant_id\`);`)
  await db.run(sql`CREATE TABLE \`carts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer,
  	\`secret\` text,
  	\`customer_id\` integer,
  	\`purchased_at\` text,
  	\`subtotal\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`carts_tenant_idx\` ON \`carts\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`carts_secret_idx\` ON \`carts\` (\`secret\`);`)
  await db.run(sql`CREATE INDEX \`carts_customer_idx\` ON \`carts\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`carts_updated_at_idx\` ON \`carts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`carts_created_at_idx\` ON \`carts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`orders_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`product_id\` integer,
  	\`variant_id\` integer,
  	\`quantity\` numeric DEFAULT 1 NOT NULL,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`orders_items_order_idx\` ON \`orders_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`orders_items_parent_id_idx\` ON \`orders_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_items_product_idx\` ON \`orders_items\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_items_variant_idx\` ON \`orders_items\` (\`variant_id\`);`)
  await db.run(sql`CREATE TABLE \`orders\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer,
  	\`shipping_address_title\` text,
  	\`shipping_address_first_name\` text,
  	\`shipping_address_last_name\` text,
  	\`shipping_address_company\` text,
  	\`shipping_address_address_line1\` text,
  	\`shipping_address_address_line2\` text,
  	\`shipping_address_city\` text,
  	\`shipping_address_state\` text,
  	\`shipping_address_postal_code\` text,
  	\`shipping_address_country\` text,
  	\`shipping_address_phone\` text,
  	\`customer_id\` integer,
  	\`customer_email\` text,
  	\`status\` text DEFAULT 'processing',
  	\`amount\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`access_token\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`orders_tenant_idx\` ON \`orders\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_customer_idx\` ON \`orders\` (\`customer_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_access_token_idx\` ON \`orders\` (\`access_token\`);`)
  await db.run(sql`CREATE INDEX \`orders_updated_at_idx\` ON \`orders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`orders_created_at_idx\` ON \`orders\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`orders_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`transactions_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`transactions_id\`) REFERENCES \`transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`orders_rels_order_idx\` ON \`orders_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`orders_rels_parent_idx\` ON \`orders_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_rels_path_idx\` ON \`orders_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`orders_rels_transactions_id_idx\` ON \`orders_rels\` (\`transactions_id\`);`)
  await db.run(sql`CREATE TABLE \`transactions_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`product_id\` integer,
  	\`variant_id\` integer,
  	\`quantity\` numeric DEFAULT 1 NOT NULL,
  	FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`variant_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`transactions_items_order_idx\` ON \`transactions_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`transactions_items_parent_id_idx\` ON \`transactions_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`transactions_items_product_idx\` ON \`transactions_items\` (\`product_id\`);`)
  await db.run(sql`CREATE INDEX \`transactions_items_variant_idx\` ON \`transactions_items\` (\`variant_id\`);`)
  await db.run(sql`CREATE TABLE \`transactions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer,
  	\`payment_method\` text,
  	\`stripe_customer_i_d\` text,
  	\`stripe_payment_intent_i_d\` text,
  	\`billing_address_title\` text,
  	\`billing_address_first_name\` text,
  	\`billing_address_last_name\` text,
  	\`billing_address_company\` text,
  	\`billing_address_address_line1\` text,
  	\`billing_address_address_line2\` text,
  	\`billing_address_city\` text,
  	\`billing_address_state\` text,
  	\`billing_address_postal_code\` text,
  	\`billing_address_country\` text,
  	\`billing_address_phone\` text,
  	\`status\` text DEFAULT 'pending' NOT NULL,
  	\`customer_id\` integer,
  	\`customer_email\` text,
  	\`order_id\` integer,
  	\`cart_id\` integer,
  	\`amount\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cart_id\`) REFERENCES \`carts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`transactions_tenant_idx\` ON \`transactions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`transactions_customer_idx\` ON \`transactions\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`transactions_order_idx\` ON \`transactions\` (\`order_id\`);`)
  await db.run(sql`CREATE INDEX \`transactions_cart_idx\` ON \`transactions\` (\`cart_id\`);`)
  await db.run(sql`CREATE INDEX \`transactions_updated_at_idx\` ON \`transactions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`transactions_created_at_idx\` ON \`transactions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`exports\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`format\` text DEFAULT 'csv' NOT NULL,
  	\`limit\` numeric,
  	\`page\` numeric DEFAULT 1,
  	\`sort\` text,
  	\`sort_order\` text,
  	\`locale\` text DEFAULT 'all',
  	\`drafts\` text DEFAULT 'yes',
  	\`collection_slug\` text DEFAULT 'tenants' NOT NULL,
  	\`where\` text DEFAULT '{}',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`exports_updated_at_idx\` ON \`exports\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`exports_created_at_idx\` ON \`exports\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`exports_filename_idx\` ON \`exports\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`exports_texts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer NOT NULL,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`text\` text,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`exports\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`exports_texts_order_parent\` ON \`exports_texts\` (\`order\`,\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`imports\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`collection_slug\` text DEFAULT 'tenants' NOT NULL,
  	\`import_mode\` text,
  	\`match_field\` text DEFAULT 'id',
  	\`status\` text DEFAULT 'pending',
  	\`summary_imported\` numeric,
  	\`summary_updated\` numeric,
  	\`summary_total\` numeric,
  	\`summary_issues\` numeric,
  	\`summary_issue_details\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`imports_updated_at_idx\` ON \`imports\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`imports_created_at_idx\` ON \`imports\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`imports_filename_idx\` ON \`imports\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`audit_events_changes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`previous_value\` text,
  	\`next_value\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`audit_events\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`audit_events_changes_order_idx\` ON \`audit_events_changes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`audit_events_changes_parent_id_idx\` ON \`audit_events_changes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`audit_events\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`timestamp\` text NOT NULL,
  	\`event_type\` text NOT NULL,
  	\`source\` text,
  	\`collection_slug\` text NOT NULL,
  	\`operation\` text NOT NULL,
  	\`document_id\` text NOT NULL,
  	\`user_id\` integer,
  	\`previous_status\` text,
  	\`next_status\` text,
  	\`change_summary\` text,
  	\`sources\` text,
  	\`request_id\` text,
  	\`severity\` text DEFAULT 'info',
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`audit_events_tenant_idx\` ON \`audit_events\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_events_timestamp_idx\` ON \`audit_events\` (\`timestamp\`);`)
  await db.run(sql`CREATE INDEX \`audit_events_event_type_idx\` ON \`audit_events\` (\`event_type\`);`)
  await db.run(sql`CREATE INDEX \`audit_events_collection_slug_idx\` ON \`audit_events\` (\`collection_slug\`);`)
  await db.run(sql`CREATE INDEX \`audit_events_document_id_idx\` ON \`audit_events\` (\`document_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_events_user_idx\` ON \`audit_events\` (\`user_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_events_request_id_idx\` ON \`audit_events\` (\`request_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_events_updated_at_idx\` ON \`audit_events\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`audit_events_created_at_idx\` ON \`audit_events\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tax_jurisdictions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`authority_name\` text,
  	\`geography_country\` text NOT NULL,
  	\`geography_region\` text,
  	\`geography_level\` text DEFAULT 'national' NOT NULL,
  	\`registration_registration_number\` text,
  	\`registration_registration_date\` text,
  	\`registration_deregistration_date\` text,
  	\`filing_filing_frequency\` text DEFAULT 'monthly',
  	\`filing_filing_due_day_of_month\` numeric,
  	\`filing_currency\` text DEFAULT 'EUR' NOT NULL,
  	\`notes_note\` text,
  	\`metadata\` text,
  	\`tenant_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tax_jurisdictions_code_idx\` ON \`tax_jurisdictions\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_geography_geography_country_idx\` ON \`tax_jurisdictions\` (\`geography_country\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_geography_geography_region_idx\` ON \`tax_jurisdictions\` (\`geography_region\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_geography_geography_level_idx\` ON \`tax_jurisdictions\` (\`geography_level\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_registration_registration_registration_idx\` ON \`tax_jurisdictions\` (\`registration_registration_number\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_filing_filing_filing_frequency_idx\` ON \`tax_jurisdictions\` (\`filing_filing_frequency\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_tenant_idx\` ON \`tax_jurisdictions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_updated_at_idx\` ON \`tax_jurisdictions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tax_jurisdictions_created_at_idx\` ON \`tax_jurisdictions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tax_codes\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`label\` text NOT NULL,
  	\`identity_description\` text,
  	\`classification_tax_type\` text NOT NULL,
  	\`classification_category_code\` text DEFAULT 'S',
  	\`classification_jurisdiction_id\` integer NOT NULL,
  	\`rate_rate_percent\` numeric NOT NULL,
  	\`rate_reverse_charge_eligible\` integer DEFAULT false,
  	\`rate_recoverable\` integer DEFAULT true,
  	\`validity_effective_from\` text NOT NULL,
  	\`validity_effective_to\` text,
  	\`validity_is_active\` integer DEFAULT true,
  	\`ledger_default_collection_account_id\` integer,
  	\`ledger_default_remittance_account_id\` integer,
  	\`ledger_default_expense_account_id\` integer,
  	\`metadata\` text,
  	\`tenant_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`classification_jurisdiction_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_default_collection_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_default_remittance_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_default_expense_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`tax_codes_code_idx\` ON \`tax_codes\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_classification_classification_tax_type_idx\` ON \`tax_codes\` (\`classification_tax_type\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_classification_classification_jurisdiction_idx\` ON \`tax_codes\` (\`classification_jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_validity_validity_effective_from_idx\` ON \`tax_codes\` (\`validity_effective_from\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_validity_validity_effective_to_idx\` ON \`tax_codes\` (\`validity_effective_to\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_validity_validity_is_active_idx\` ON \`tax_codes\` (\`validity_is_active\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_ledger_ledger_default_collection_account_idx\` ON \`tax_codes\` (\`ledger_default_collection_account_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_ledger_ledger_default_remittance_account_idx\` ON \`tax_codes\` (\`ledger_default_remittance_account_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_ledger_ledger_default_expense_account_idx\` ON \`tax_codes\` (\`ledger_default_expense_account_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_tenant_idx\` ON \`tax_codes\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_updated_at_idx\` ON \`tax_codes\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_created_at_idx\` ON \`tax_codes\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tax_codes_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tax_codes_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tax_codes_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tax_codes_rels_order_idx\` ON \`tax_codes_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_rels_parent_idx\` ON \`tax_codes_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_rels_path_idx\` ON \`tax_codes_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`tax_codes_rels_tax_codes_id_idx\` ON \`tax_codes_rels\` (\`tax_codes_id\`);`)
  await db.run(sql`CREATE TABLE \`fiscal_periods\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`identity_fiscal_year\` numeric NOT NULL,
  	\`identity_period_number\` numeric NOT NULL,
  	\`identity_period_type\` text DEFAULT 'monthly' NOT NULL,
  	\`dates_start_date\` text NOT NULL,
  	\`dates_end_date\` text NOT NULL,
  	\`lifecycle_status\` text DEFAULT 'open' NOT NULL,
  	\`lifecycle_closed_at\` text,
  	\`lifecycle_closed_by_id\` integer,
  	\`lifecycle_locked_at\` text,
  	\`lifecycle_locked_by_id\` integer,
  	\`lifecycle_reopened_at\` text,
  	\`lifecycle_reopened_by_id\` integer,
  	\`notes_note\` text,
  	\`metadata\` text,
  	\`tenant_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`lifecycle_closed_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`lifecycle_locked_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`lifecycle_reopened_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`fiscal_periods_label_idx\` ON \`fiscal_periods\` (\`label\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_identity_identity_fiscal_year_idx\` ON \`fiscal_periods\` (\`identity_fiscal_year\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_identity_identity_period_number_idx\` ON \`fiscal_periods\` (\`identity_period_number\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_dates_dates_start_date_idx\` ON \`fiscal_periods\` (\`dates_start_date\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_dates_dates_end_date_idx\` ON \`fiscal_periods\` (\`dates_end_date\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_lifecycle_lifecycle_status_idx\` ON \`fiscal_periods\` (\`lifecycle_status\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_lifecycle_lifecycle_closed_by_idx\` ON \`fiscal_periods\` (\`lifecycle_closed_by_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_lifecycle_lifecycle_locked_by_idx\` ON \`fiscal_periods\` (\`lifecycle_locked_by_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_lifecycle_lifecycle_reopened_by_idx\` ON \`fiscal_periods\` (\`lifecycle_reopened_by_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_tenant_idx\` ON \`fiscal_periods\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_updated_at_idx\` ON \`fiscal_periods\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`fiscal_periods_created_at_idx\` ON \`fiscal_periods\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`customers\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`country\` text,
  	\`identity_legal_name\` text,
  	\`identity_customer_type\` text DEFAULT 'company' NOT NULL,
  	\`identity_status\` text DEFAULT 'active' NOT NULL,
  	\`contact_email\` text,
  	\`contact_phone\` text,
  	\`contact_website\` text,
  	\`addresses_billing_address_id\` integer,
  	\`addresses_shipping_address_id\` integer,
  	\`tax_vat_number\` text,
  	\`tax_vat_number_type\` text,
  	\`tax_tax_exempt\` integer DEFAULT false,
  	\`tax_tax_exemption_certificate\` text,
  	\`tax_default_tax_code_id\` integer,
  	\`commercial_payment_terms\` text DEFAULT 'net_30',
  	\`commercial_payment_terms_days\` numeric,
  	\`commercial_credit_limit\` numeric DEFAULT 0,
  	\`commercial_credit_currency\` text DEFAULT 'EUR',
  	\`commercial_default_currency\` text DEFAULT 'EUR' NOT NULL,
  	\`commercial_default_locale\` text DEFAULT 'en',
  	\`commercial_price_list\` text,
  	\`ledger_default_receivable_account_id\` integer,
  	\`ledger_default_revenue_account_id\` integer,
  	\`ledger_default_discount_account_id\` integer,
  	\`notes_note\` text,
  	\`metadata\` text,
  	\`tenant_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`addresses_billing_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`addresses_shipping_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tax_default_tax_code_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_default_receivable_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_default_revenue_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_default_discount_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`customers_code_idx\` ON \`customers\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`customers_name_idx\` ON \`customers\` (\`name\`);`)
  await db.run(sql`CREATE INDEX \`customers_country_idx\` ON \`customers\` (\`country\`);`)
  await db.run(sql`CREATE INDEX \`customers_identity_identity_customer_type_idx\` ON \`customers\` (\`identity_customer_type\`);`)
  await db.run(sql`CREATE INDEX \`customers_identity_identity_status_idx\` ON \`customers\` (\`identity_status\`);`)
  await db.run(sql`CREATE INDEX \`customers_contact_contact_email_idx\` ON \`customers\` (\`contact_email\`);`)
  await db.run(sql`CREATE INDEX \`customers_addresses_addresses_billing_address_idx\` ON \`customers\` (\`addresses_billing_address_id\`);`)
  await db.run(sql`CREATE INDEX \`customers_addresses_addresses_shipping_address_idx\` ON \`customers\` (\`addresses_shipping_address_id\`);`)
  await db.run(sql`CREATE INDEX \`customers_tax_tax_vat_number_idx\` ON \`customers\` (\`tax_vat_number\`);`)
  await db.run(sql`CREATE INDEX \`customers_tax_tax_default_tax_code_idx\` ON \`customers\` (\`tax_default_tax_code_id\`);`)
  await db.run(sql`CREATE INDEX \`customers_ledger_ledger_default_receivable_account_idx\` ON \`customers\` (\`ledger_default_receivable_account_id\`);`)
  await db.run(sql`CREATE INDEX \`customers_ledger_ledger_default_revenue_account_idx\` ON \`customers\` (\`ledger_default_revenue_account_id\`);`)
  await db.run(sql`CREATE INDEX \`customers_ledger_ledger_default_discount_account_idx\` ON \`customers\` (\`ledger_default_discount_account_id\`);`)
  await db.run(sql`CREATE INDEX \`customers_tenant_idx\` ON \`customers\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`customers_updated_at_idx\` ON \`customers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`customers_created_at_idx\` ON \`customers\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`customers_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`addresses_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`customers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`addresses_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`customers_rels_order_idx\` ON \`customers_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`customers_rels_parent_idx\` ON \`customers_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`customers_rels_path_idx\` ON \`customers_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`customers_rels_addresses_id_idx\` ON \`customers_rels\` (\`addresses_id\`);`)
  await db.run(sql`CREATE TABLE \`vendors\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`country\` text,
  	\`identity_legal_name\` text,
  	\`identity_vendor_type\` text DEFAULT 'company' NOT NULL,
  	\`identity_status\` text DEFAULT 'active' NOT NULL,
  	\`contact_email\` text,
  	\`contact_phone\` text,
  	\`contact_website\` text,
  	\`addresses_remit_to_address_id\` integer,
  	\`tax_vat_number\` text,
  	\`tax_vat_number_type\` text,
  	\`tax_tax_exempt\` integer DEFAULT false,
  	\`tax_default_tax_code_id\` integer,
  	\`tax_vendor1099_eligible\` integer DEFAULT false,
  	\`tax_tax1099_form_type\` text,
  	\`tax_tax_id_type\` text,
  	\`tax_withholding_rate\` numeric,
  	\`commercial_payment_terms\` text DEFAULT 'net_30',
  	\`commercial_payment_terms_days\` numeric,
  	\`commercial_preferred_payment_method\` text DEFAULT 'ach',
  	\`commercial_default_currency\` text DEFAULT 'EUR' NOT NULL,
  	\`commercial_default_locale\` text DEFAULT 'en',
  	\`bank_bank_account_name\` text,
  	\`bank_bank_name\` text,
  	\`bank_bank_routing_number\` text,
  	\`bank_bank_account_number\` text,
  	\`bank_bank_iban\` text,
  	\`bank_bank_swift_bic\` text,
  	\`bank_bank_country_code\` text,
  	\`ledger_default_payable_account_id\` integer,
  	\`ledger_default_expense_account_id\` integer,
  	\`ledger_default_withholding_account_id\` integer,
  	\`notes_note\` text,
  	\`metadata\` text,
  	\`tenant_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`addresses_remit_to_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tax_default_tax_code_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_default_payable_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_default_expense_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ledger_default_withholding_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`vendors_code_idx\` ON \`vendors\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`vendors_name_idx\` ON \`vendors\` (\`name\`);`)
  await db.run(sql`CREATE INDEX \`vendors_country_idx\` ON \`vendors\` (\`country\`);`)
  await db.run(sql`CREATE INDEX \`vendors_identity_identity_vendor_type_idx\` ON \`vendors\` (\`identity_vendor_type\`);`)
  await db.run(sql`CREATE INDEX \`vendors_identity_identity_status_idx\` ON \`vendors\` (\`identity_status\`);`)
  await db.run(sql`CREATE INDEX \`vendors_contact_contact_email_idx\` ON \`vendors\` (\`contact_email\`);`)
  await db.run(sql`CREATE INDEX \`vendors_addresses_addresses_remit_to_address_idx\` ON \`vendors\` (\`addresses_remit_to_address_id\`);`)
  await db.run(sql`CREATE INDEX \`vendors_tax_tax_vat_number_idx\` ON \`vendors\` (\`tax_vat_number\`);`)
  await db.run(sql`CREATE INDEX \`vendors_tax_tax_default_tax_code_idx\` ON \`vendors\` (\`tax_default_tax_code_id\`);`)
  await db.run(sql`CREATE INDEX \`vendors_tax_tax_vendor1099_eligible_idx\` ON \`vendors\` (\`tax_vendor1099_eligible\`);`)
  await db.run(sql`CREATE INDEX \`vendors_ledger_ledger_default_payable_account_idx\` ON \`vendors\` (\`ledger_default_payable_account_id\`);`)
  await db.run(sql`CREATE INDEX \`vendors_ledger_ledger_default_expense_account_idx\` ON \`vendors\` (\`ledger_default_expense_account_id\`);`)
  await db.run(sql`CREATE INDEX \`vendors_ledger_ledger_default_withholding_account_idx\` ON \`vendors\` (\`ledger_default_withholding_account_id\`);`)
  await db.run(sql`CREATE INDEX \`vendors_tenant_idx\` ON \`vendors\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`vendors_updated_at_idx\` ON \`vendors\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`vendors_created_at_idx\` ON \`vendors\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`vendors_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`addresses_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`vendors\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`addresses_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`vendors_rels_order_idx\` ON \`vendors_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`vendors_rels_parent_idx\` ON \`vendors_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`vendors_rels_path_idx\` ON \`vendors_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`vendors_rels_addresses_id_idx\` ON \`vendors_rels\` (\`addresses_id\`);`)
  await db.run(sql`CREATE TABLE \`kyc_checks_identity_documents\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`doc_type\` text,
  	\`doc_number\` text,
  	\`issuing_country\` text,
  	\`expires_at\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`kyc_checks\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`kyc_checks_identity_documents_order_idx\` ON \`kyc_checks_identity_documents\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`kyc_checks_identity_documents_parent_id_idx\` ON \`kyc_checks_identity_documents\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`kyc_checks\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`check_id\` text NOT NULL,
  	\`subject_type\` text NOT NULL,
  	\`subject_id\` integer NOT NULL,
  	\`cdd_level\` text NOT NULL,
  	\`sanctions_screening_screened_at\` text,
  	\`sanctions_screening_lists\` text,
  	\`sanctions_screening_match_found\` integer DEFAULT false,
  	\`sanctions_screening_match_details\` text,
  	\`pep_status\` text,
  	\`risk_rating\` text,
  	\`status\` text DEFAULT 'pending',
  	\`completed_at\` text,
  	\`next_review_due\` text,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`subject_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`kyc_checks_tenant_idx\` ON \`kyc_checks\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`kyc_checks_check_id_idx\` ON \`kyc_checks\` (\`check_id\`);`)
  await db.run(sql`CREATE INDEX \`kyc_checks_subject_idx\` ON \`kyc_checks\` (\`subject_id\`);`)
  await db.run(sql`CREATE INDEX \`kyc_checks_created_by_idx\` ON \`kyc_checks\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`kyc_checks_approved_by_idx\` ON \`kyc_checks\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`kyc_checks_updated_at_idx\` ON \`kyc_checks\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`kyc_checks_created_at_idx\` ON \`kyc_checks\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`beneficial_owners\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`entity_id\` integer NOT NULL,
  	\`full_name\` text NOT NULL,
  	\`date_of_birth\` text,
  	\`nationality\` text,
  	\`residence_country\` text,
  	\`residence_address_id\` integer,
  	\`ownership_percent\` numeric,
  	\`control_type\` text NOT NULL,
  	\`pep_status\` text,
  	\`kyc_check_id\` integer,
  	\`status\` text DEFAULT 'active',
  	\`effective_from\` text,
  	\`effective_to\` text,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`entity_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`residence_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`kyc_check_id\`) REFERENCES \`kyc_checks\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`beneficial_owners_tenant_idx\` ON \`beneficial_owners\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`beneficial_owners_entity_idx\` ON \`beneficial_owners\` (\`entity_id\`);`)
  await db.run(sql`CREATE INDEX \`beneficial_owners_residence_address_idx\` ON \`beneficial_owners\` (\`residence_address_id\`);`)
  await db.run(sql`CREATE INDEX \`beneficial_owners_kyc_check_idx\` ON \`beneficial_owners\` (\`kyc_check_id\`);`)
  await db.run(sql`CREATE INDEX \`beneficial_owners_created_by_idx\` ON \`beneficial_owners\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`beneficial_owners_approved_by_idx\` ON \`beneficial_owners\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`beneficial_owners_updated_at_idx\` ON \`beneficial_owners\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`beneficial_owners_created_at_idx\` ON \`beneficial_owners\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`gl_accounts_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`tag\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`gl_accounts_tags_order_idx\` ON \`gl_accounts_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`gl_accounts_tags_parent_id_idx\` ON \`gl_accounts_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`gl_accounts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`account_number\` text NOT NULL,
  	\`account_name\` text NOT NULL,
  	\`account_type\` text NOT NULL,
  	\`role\` text,
  	\`parent_account_id\` integer,
  	\`normal_balance\` text NOT NULL,
  	\`balance\` numeric DEFAULT 0,
  	\`balance_in_base_currency\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'active',
  	\`description\` text,
  	\`is_tax_account\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`gl_accounts_tenant_idx\` ON \`gl_accounts\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`gl_accounts_account_number_idx\` ON \`gl_accounts\` (\`account_number\`);`)
  await db.run(sql`CREATE INDEX \`gl_accounts_parent_account_idx\` ON \`gl_accounts\` (\`parent_account_id\`);`)
  await db.run(sql`CREATE INDEX \`gl_accounts_updated_at_idx\` ON \`gl_accounts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`gl_accounts_created_at_idx\` ON \`gl_accounts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`journal_entries_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`line_number\` numeric DEFAULT 1,
  	\`gl_account_id\` integer NOT NULL,
  	\`account_number\` text,
  	\`account_name\` text,
  	\`description\` text,
  	\`debit\` numeric DEFAULT 0,
  	\`credit\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`exchange_rate\` numeric DEFAULT 1,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`journal_entries_lines_order_idx\` ON \`journal_entries_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`journal_entries_lines_parent_id_idx\` ON \`journal_entries_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`journal_entries_lines_gl_account_idx\` ON \`journal_entries_lines\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`journal_entries\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`entry_number\` text NOT NULL,
  	\`entry_date\` text NOT NULL,
  	\`posted_date\` text,
  	\`description\` text NOT NULL,
  	\`status\` text DEFAULT 'draft',
  	\`debit_total\` numeric DEFAULT 0,
  	\`credit_total\` numeric DEFAULT 0,
  	\`is_balanced\` integer,
  	\`source_type\` text NOT NULL,
  	\`source_id\` text,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`journal_entries_tenant_idx\` ON \`journal_entries\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`journal_entries_entry_number_idx\` ON \`journal_entries\` (\`entry_number\`);`)
  await db.run(sql`CREATE INDEX \`journal_entries_created_by_idx\` ON \`journal_entries\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`journal_entries_approved_by_idx\` ON \`journal_entries\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`journal_entries_updated_at_idx\` ON \`journal_entries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`journal_entries_created_at_idx\` ON \`journal_entries\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`gl_postings_accounts_affected\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`gl_account_id\` integer NOT NULL,
  	\`account_number\` text,
  	\`account_name\` text,
  	\`debit_amount\` numeric DEFAULT 0,
  	\`credit_amount\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`gl_postings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`gl_postings_accounts_affected_order_idx\` ON \`gl_postings_accounts_affected\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`gl_postings_accounts_affected_parent_id_idx\` ON \`gl_postings_accounts_affected\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`gl_postings_accounts_affected_gl_account_idx\` ON \`gl_postings_accounts_affected\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`gl_postings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`posting_id\` text NOT NULL,
  	\`source_type\` text NOT NULL,
  	\`source_id\` text NOT NULL,
  	\`source_date\` text NOT NULL,
  	\`journal_entry_id\` integer NOT NULL,
  	\`status\` text DEFAULT 'pending',
  	\`posted_date\` text,
  	\`total_debits\` numeric DEFAULT 0,
  	\`total_credits\` numeric DEFAULT 0,
  	\`error_message\` text,
  	\`reversal_posting_id\` text,
  	\`metadata\` text,
  	\`created_by_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`gl_postings_tenant_idx\` ON \`gl_postings\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`gl_postings_posting_id_idx\` ON \`gl_postings\` (\`posting_id\`);`)
  await db.run(sql`CREATE INDEX \`gl_postings_journal_entry_idx\` ON \`gl_postings\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`gl_postings_created_by_idx\` ON \`gl_postings\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`gl_postings_updated_at_idx\` ON \`gl_postings\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`gl_postings_created_at_idx\` ON \`gl_postings\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`bank_accounts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`account_name\` text NOT NULL,
  	\`iban\` text,
  	\`bic\` text,
  	\`account_number\` text,
  	\`routing_number\` text,
  	\`institution\` text,
  	\`country\` text,
  	\`currency\` text DEFAULT 'EUR',
  	\`gl_account_id\` integer,
  	\`purpose\` text,
  	\`status\` text DEFAULT 'active',
  	\`opened_at\` text,
  	\`closed_at\` text,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`bank_accounts_tenant_idx\` ON \`bank_accounts\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_accounts_iban_idx\` ON \`bank_accounts\` (\`iban\`);`)
  await db.run(sql`CREATE INDEX \`bank_accounts_country_idx\` ON \`bank_accounts\` (\`country\`);`)
  await db.run(sql`CREATE INDEX \`bank_accounts_gl_account_idx\` ON \`bank_accounts\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_accounts_created_by_idx\` ON \`bank_accounts\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_accounts_approved_by_idx\` ON \`bank_accounts\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_accounts_updated_at_idx\` ON \`bank_accounts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`bank_accounts_created_at_idx\` ON \`bank_accounts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`bank_statements_transactions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`transaction_date\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`description\` text NOT NULL,
  	\`reference\` text,
  	\`balance_after\` numeric,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bank_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bank_statements_transactions_order_idx\` ON \`bank_statements_transactions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`bank_statements_transactions_parent_id_idx\` ON \`bank_statements_transactions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`bank_statements_matched_transactions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`bank_statement_line_index\` numeric NOT NULL,
  	\`journal_entry_id\` integer NOT NULL,
  	\`match_type\` text NOT NULL,
  	\`match_score\` numeric,
  	\`variance_amount\` numeric,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bank_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bank_statements_matched_transactions_order_idx\` ON \`bank_statements_matched_transactions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`bank_statements_matched_transactions_parent_id_idx\` ON \`bank_statements_matched_transactions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_statements_matched_transactions_journal_entry_idx\` ON \`bank_statements_matched_transactions\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`bank_statements\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`statement_id\` text NOT NULL,
  	\`bank_account_id\` integer NOT NULL,
  	\`statement_date\` text NOT NULL,
  	\`statement_period_start\` text NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`opening_balance\` numeric NOT NULL,
  	\`closing_balance\` numeric NOT NULL,
  	\`reconciliation_status\` text DEFAULT 'unreconciled',
  	\`total_matched\` numeric DEFAULT 0,
  	\`total_unmatched\` numeric DEFAULT 0,
  	\`variance\` numeric DEFAULT 0,
  	\`reconciliation_notes\` text,
  	\`reconciliation_date\` text,
  	\`reconcilied_by_id\` integer,
  	\`import_source\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`bank_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reconcilied_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`bank_statements_tenant_idx\` ON \`bank_statements\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`bank_statements_statement_id_idx\` ON \`bank_statements\` (\`statement_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_statements_bank_account_idx\` ON \`bank_statements\` (\`bank_account_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_statements_reconcilied_by_idx\` ON \`bank_statements\` (\`reconcilied_by_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_statements_updated_at_idx\` ON \`bank_statements\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`bank_statements_created_at_idx\` ON \`bank_statements\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`bank_transactions_matched_journal_entries\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`journal_entry_id\` integer NOT NULL,
  	\`matched_amount\` numeric NOT NULL,
  	\`match_score\` numeric,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`bank_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`bank_transactions_matched_journal_entries_order_idx\` ON \`bank_transactions_matched_journal_entries\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`bank_transactions_matched_journal_entries_parent_id_idx\` ON \`bank_transactions_matched_journal_entries\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_transactions_matched_journal_entries_journal_entry_idx\` ON \`bank_transactions_matched_journal_entries\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`bank_transactions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`external_id\` text NOT NULL,
  	\`account_servicer_reference\` text,
  	\`end_to_end_id\` text,
  	\`bank_account_id\` integer NOT NULL,
  	\`statement_id\` integer,
  	\`value_date\` text NOT NULL,
  	\`booking_date\` text,
  	\`amount\` numeric NOT NULL,
  	\`credit_debit_indicator\` text,
  	\`booking_status\` text DEFAULT 'BOOK',
  	\`currency\` text DEFAULT 'EUR',
  	\`description\` text,
  	\`counterparty_name\` text,
  	\`counterparty_iban\` text,
  	\`counterparty_bic\` text,
  	\`reference\` text,
  	\`bank_transaction_domain\` text,
  	\`bank_transaction_family\` text,
  	\`bank_transaction_sub_family\` text,
  	\`transaction_code\` text,
  	\`charge_bearer\` text,
  	\`match_status\` text DEFAULT 'unmatched',
  	\`matched_at\` text,
  	\`matched_by_id\` integer,
  	\`status\` text DEFAULT 'imported',
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`bank_account_id\`) REFERENCES \`bank_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`statement_id\`) REFERENCES \`bank_statements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`matched_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`bank_transactions_tenant_idx\` ON \`bank_transactions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`bank_transactions_external_id_idx\` ON \`bank_transactions\` (\`external_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_transactions_bank_account_idx\` ON \`bank_transactions\` (\`bank_account_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_transactions_statement_idx\` ON \`bank_transactions\` (\`statement_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_transactions_value_date_idx\` ON \`bank_transactions\` (\`value_date\`);`)
  await db.run(sql`CREATE INDEX \`bank_transactions_matched_by_idx\` ON \`bank_transactions\` (\`matched_by_id\`);`)
  await db.run(sql`CREATE INDEX \`bank_transactions_updated_at_idx\` ON \`bank_transactions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`bank_transactions_created_at_idx\` ON \`bank_transactions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`purchase_orders_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`line_number\` numeric DEFAULT 1,
  	\`item_id\` integer,
  	\`description\` text NOT NULL,
  	\`quantity\` numeric NOT NULL,
  	\`unit_price\` numeric NOT NULL,
  	\`line_total\` numeric DEFAULT 0,
  	\`gl_account_id\` integer,
  	\`quantity_received\` numeric DEFAULT 0,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`purchase_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`purchase_orders_lines_order_idx\` ON \`purchase_orders_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_lines_parent_id_idx\` ON \`purchase_orders_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_lines_item_idx\` ON \`purchase_orders_lines\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_lines_gl_account_idx\` ON \`purchase_orders_lines\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`purchase_orders\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`po_number\` text NOT NULL,
  	\`vendor_id\` integer NOT NULL,
  	\`order_date\` text NOT NULL,
  	\`expected_delivery_date\` text,
  	\`subtotal\` numeric DEFAULT 0,
  	\`tax_amount\` numeric DEFAULT 0,
  	\`total_amount\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'draft',
  	\`submitted_at\` text,
  	\`sent_at\` text,
  	\`closed_at\` text,
  	\`invoice_id\` integer,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`vendor_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`purchase_orders_tenant_idx\` ON \`purchase_orders\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`purchase_orders_po_number_idx\` ON \`purchase_orders\` (\`po_number\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_vendor_idx\` ON \`purchase_orders\` (\`vendor_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_invoice_idx\` ON \`purchase_orders\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_created_by_idx\` ON \`purchase_orders\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_approved_by_idx\` ON \`purchase_orders\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_updated_at_idx\` ON \`purchase_orders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`purchase_orders_created_at_idx\` ON \`purchase_orders\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`goods_receipts_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` integer,
  	\`description\` text,
  	\`quantity_received\` numeric NOT NULL,
  	\`quantity_damaged\` numeric DEFAULT 0,
  	\`condition\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`goods_receipts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`goods_receipts_lines_order_idx\` ON \`goods_receipts_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_lines_parent_id_idx\` ON \`goods_receipts_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_lines_item_idx\` ON \`goods_receipts_lines\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`goods_receipts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`receipt_number\` text NOT NULL,
  	\`purchase_order_id\` integer NOT NULL,
  	\`received_date\` text NOT NULL,
  	\`status\` text DEFAULT 'pending',
  	\`inspected_at\` text,
  	\`inspected_by_id\` integer,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`purchase_order_id\`) REFERENCES \`purchase_orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`inspected_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`goods_receipts_tenant_idx\` ON \`goods_receipts\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`goods_receipts_receipt_number_idx\` ON \`goods_receipts\` (\`receipt_number\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_purchase_order_idx\` ON \`goods_receipts\` (\`purchase_order_id\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_inspected_by_idx\` ON \`goods_receipts\` (\`inspected_by_id\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_created_by_idx\` ON \`goods_receipts\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_approved_by_idx\` ON \`goods_receipts\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_updated_at_idx\` ON \`goods_receipts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`goods_receipts_created_at_idx\` ON \`goods_receipts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`quotes_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` integer,
  	\`description\` text NOT NULL,
  	\`quantity\` numeric NOT NULL,
  	\`unit_price\` numeric NOT NULL,
  	\`line_total\` numeric DEFAULT 0,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`quotes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`quotes_lines_order_idx\` ON \`quotes_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`quotes_lines_parent_id_idx\` ON \`quotes_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`quotes_lines_item_idx\` ON \`quotes_lines\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`quotes\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`quote_number\` text NOT NULL,
  	\`customer_id\` integer NOT NULL,
  	\`issued_at\` text,
  	\`expires_at\` text,
  	\`subtotal\` numeric DEFAULT 0,
  	\`tax_amount\` numeric DEFAULT 0,
  	\`total_amount\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'draft',
  	\`sent_at\` text,
  	\`accepted_at\` text,
  	\`converted_to_order_id\` integer,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`converted_to_order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`quotes_tenant_idx\` ON \`quotes\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`quotes_quote_number_idx\` ON \`quotes\` (\`quote_number\`);`)
  await db.run(sql`CREATE INDEX \`quotes_customer_idx\` ON \`quotes\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`quotes_converted_to_order_idx\` ON \`quotes\` (\`converted_to_order_id\`);`)
  await db.run(sql`CREATE INDEX \`quotes_created_by_idx\` ON \`quotes\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`quotes_approved_by_idx\` ON \`quotes\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`quotes_updated_at_idx\` ON \`quotes\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`quotes_created_at_idx\` ON \`quotes\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`contracts_modifications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`modified_at\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`price_impact\` numeric,
  	\`modified_by_id\` integer,
  	FOREIGN KEY (\`modified_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contracts_modifications_order_idx\` ON \`contracts_modifications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`contracts_modifications_parent_id_idx\` ON \`contracts_modifications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contracts_modifications_modified_by_idx\` ON \`contracts_modifications\` (\`modified_by_id\`);`)
  await db.run(sql`CREATE TABLE \`contracts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`contract_number\` text NOT NULL,
  	\`customer_id\` integer NOT NULL,
  	\`title\` text NOT NULL,
  	\`effective_from\` text NOT NULL,
  	\`effective_to\` text,
  	\`total_value\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`transaction_price_fixed\` numeric DEFAULT 0,
  	\`transaction_price_variable\` numeric DEFAULT 0,
  	\`variable_consideration_method\` text,
  	\`financing_component\` numeric DEFAULT 0,
  	\`payment_terms\` text,
  	\`status\` text DEFAULT 'draft',
  	\`activated_at\` text,
  	\`terminated_at\` text,
  	\`subscription_id\` integer,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`subscription_id\`) REFERENCES \`subscriptions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`contracts_tenant_idx\` ON \`contracts\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`contracts_contract_number_idx\` ON \`contracts\` (\`contract_number\`);`)
  await db.run(sql`CREATE INDEX \`contracts_customer_idx\` ON \`contracts\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`contracts_subscription_idx\` ON \`contracts\` (\`subscription_id\`);`)
  await db.run(sql`CREATE INDEX \`contracts_created_by_idx\` ON \`contracts\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`contracts_approved_by_idx\` ON \`contracts\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`contracts_updated_at_idx\` ON \`contracts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`contracts_created_at_idx\` ON \`contracts\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`contracts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`contracts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`contracts_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`contracts_rels_order_idx\` ON \`contracts_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`contracts_rels_parent_idx\` ON \`contracts_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`contracts_rels_path_idx\` ON \`contracts_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`contracts_rels_contracts_id_idx\` ON \`contracts_rels\` (\`contracts_id\`);`)
  await db.run(sql`CREATE TABLE \`performance_obligations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`contract_id\` integer NOT NULL,
  	\`description\` text NOT NULL,
  	\`kind\` text DEFAULT 'distinct' NOT NULL,
  	\`recognition_timing\` text DEFAULT 'point_in_time' NOT NULL,
  	\`over_time_measurement\` text,
  	\`measurement_kind\` text,
  	\`recognition_method\` text,
  	\`standalone_selling_price\` numeric NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`allocated_amount\` numeric DEFAULT 0,
  	\`recognised_to_date\` numeric DEFAULT 0,
  	\`percent_complete\` numeric DEFAULT 0,
  	\`status\` text DEFAULT 'pending',
  	\`satisfied_at\` text,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`performance_obligations_tenant_idx\` ON \`performance_obligations\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`performance_obligations_contract_idx\` ON \`performance_obligations\` (\`contract_id\`);`)
  await db.run(sql`CREATE INDEX \`performance_obligations_created_by_idx\` ON \`performance_obligations\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`performance_obligations_approved_by_idx\` ON \`performance_obligations\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`performance_obligations_updated_at_idx\` ON \`performance_obligations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`performance_obligations_created_at_idx\` ON \`performance_obligations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`shipments_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` integer,
  	\`quantity\` numeric NOT NULL,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`shipments\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`shipments_lines_order_idx\` ON \`shipments_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`shipments_lines_parent_id_idx\` ON \`shipments_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`shipments_lines_item_idx\` ON \`shipments_lines\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`shipments\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`shipment_number\` text NOT NULL,
  	\`order_id\` integer NOT NULL,
  	\`ship_from_address_id\` integer,
  	\`ship_to_address_id\` integer NOT NULL,
  	\`carrier\` text,
  	\`tracking_number\` text,
  	\`tracking_url\` text,
  	\`shipping_cost\` numeric DEFAULT 0,
  	\`status\` text DEFAULT 'pending',
  	\`shipped_at\` text,
  	\`delivered_at\` text,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ship_from_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ship_to_address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`shipments_tenant_idx\` ON \`shipments\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`shipments_shipment_number_idx\` ON \`shipments\` (\`shipment_number\`);`)
  await db.run(sql`CREATE INDEX \`shipments_order_idx\` ON \`shipments\` (\`order_id\`);`)
  await db.run(sql`CREATE INDEX \`shipments_ship_from_address_idx\` ON \`shipments\` (\`ship_from_address_id\`);`)
  await db.run(sql`CREATE INDEX \`shipments_ship_to_address_idx\` ON \`shipments\` (\`ship_to_address_id\`);`)
  await db.run(sql`CREATE INDEX \`shipments_tracking_number_idx\` ON \`shipments\` (\`tracking_number\`);`)
  await db.run(sql`CREATE INDEX \`shipments_created_by_idx\` ON \`shipments\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`shipments_approved_by_idx\` ON \`shipments\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`shipments_updated_at_idx\` ON \`shipments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`shipments_created_at_idx\` ON \`shipments\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`returns_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` integer,
  	\`quantity_returned\` numeric NOT NULL,
  	\`restock\` integer DEFAULT true,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`returns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`returns_lines_order_idx\` ON \`returns_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`returns_lines_parent_id_idx\` ON \`returns_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`returns_lines_item_idx\` ON \`returns_lines\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`returns\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`rma_number\` text NOT NULL,
  	\`order_id\` integer NOT NULL,
  	\`customer_id\` integer,
  	\`reason\` text NOT NULL,
  	\`status\` text DEFAULT 'requested',
  	\`authorised_at\` text,
  	\`received_at\` text,
  	\`restocked_at\` text,
  	\`credit_memo_id\` integer,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`credit_memo_id\`) REFERENCES \`credit_memos\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`returns_tenant_idx\` ON \`returns\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`returns_rma_number_idx\` ON \`returns\` (\`rma_number\`);`)
  await db.run(sql`CREATE INDEX \`returns_order_idx\` ON \`returns\` (\`order_id\`);`)
  await db.run(sql`CREATE INDEX \`returns_customer_idx\` ON \`returns\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`returns_credit_memo_idx\` ON \`returns\` (\`credit_memo_id\`);`)
  await db.run(sql`CREATE INDEX \`returns_created_by_idx\` ON \`returns\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`returns_approved_by_idx\` ON \`returns\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`returns_updated_at_idx\` ON \`returns\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`returns_created_at_idx\` ON \`returns\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`warehouse_locations_bins\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`bin_code\` text NOT NULL,
  	\`description\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`warehouse_locations_bins_order_idx\` ON \`warehouse_locations_bins\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`warehouse_locations_bins_parent_id_idx\` ON \`warehouse_locations_bins\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`warehouse_locations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`code\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`type\` text DEFAULT 'warehouse' NOT NULL,
  	\`address_id\` integer,
  	\`country\` text,
  	\`region\` text,
  	\`gl_account_id\` integer,
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`address_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`warehouse_locations_tenant_idx\` ON \`warehouse_locations\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`warehouse_locations_code_idx\` ON \`warehouse_locations\` (\`code\`);`)
  await db.run(sql`CREATE INDEX \`warehouse_locations_address_idx\` ON \`warehouse_locations\` (\`address_id\`);`)
  await db.run(sql`CREATE INDEX \`warehouse_locations_gl_account_idx\` ON \`warehouse_locations\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE INDEX \`warehouse_locations_created_by_idx\` ON \`warehouse_locations\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`warehouse_locations_approved_by_idx\` ON \`warehouse_locations\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`warehouse_locations_updated_at_idx\` ON \`warehouse_locations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`warehouse_locations_created_at_idx\` ON \`warehouse_locations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`inventory_movements\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`movement_id\` text NOT NULL,
  	\`kind\` text NOT NULL,
  	\`item_id\` integer NOT NULL,
  	\`lot_or_serial\` text,
  	\`quantity\` numeric NOT NULL,
  	\`unit_cost\` numeric DEFAULT 0,
  	\`extended_cost\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`from_location_id\` integer,
  	\`to_location_id\` integer,
  	\`movement_at\` text NOT NULL,
  	\`source_document_type\` text,
  	\`source_document_id\` text,
  	\`journal_entry_id\` integer,
  	\`status\` text DEFAULT 'draft',
  	\`posted_at\` text,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`from_location_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`to_location_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`inventory_movements_tenant_idx\` ON \`inventory_movements\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`inventory_movements_movement_id_idx\` ON \`inventory_movements\` (\`movement_id\`);`)
  await db.run(sql`CREATE INDEX \`inventory_movements_item_idx\` ON \`inventory_movements\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`inventory_movements_from_location_idx\` ON \`inventory_movements\` (\`from_location_id\`);`)
  await db.run(sql`CREATE INDEX \`inventory_movements_to_location_idx\` ON \`inventory_movements\` (\`to_location_id\`);`)
  await db.run(sql`CREATE INDEX \`inventory_movements_movement_at_idx\` ON \`inventory_movements\` (\`movement_at\`);`)
  await db.run(sql`CREATE INDEX \`inventory_movements_journal_entry_idx\` ON \`inventory_movements\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`inventory_movements_created_by_idx\` ON \`inventory_movements\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`inventory_movements_approved_by_idx\` ON \`inventory_movements\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`inventory_movements_updated_at_idx\` ON \`inventory_movements\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`inventory_movements_created_at_idx\` ON \`inventory_movements\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`financial_statements_financial_ratios\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`ratio_name\` text NOT NULL,
  	\`ratio_value\` numeric NOT NULL,
  	\`category\` text NOT NULL,
  	\`interpretation\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`financial_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`financial_statements_financial_ratios_order_idx\` ON \`financial_statements_financial_ratios\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`financial_statements_financial_ratios_parent_id_idx\` ON \`financial_statements_financial_ratios\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`financial_statements_export_formats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`format\` text NOT NULL,
  	\`file_url\` text,
  	\`generated_at\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`financial_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`financial_statements_export_formats_order_idx\` ON \`financial_statements_export_formats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`financial_statements_export_formats_parent_id_idx\` ON \`financial_statements_export_formats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`financial_statements\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`statement_id\` text NOT NULL,
  	\`statement_type\` text NOT NULL,
  	\`language\` text DEFAULT 'en',
  	\`fiscal_period_start\` text NOT NULL,
  	\`fiscal_period_end\` text NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`statement_content\` text NOT NULL,
  	\`comparative_period\` text,
  	\`comparative_data\` text,
  	\`notes\` text,
  	\`status\` text DEFAULT 'draft',
  	\`generated_at\` text NOT NULL,
  	\`generated_by_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`generated_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`financial_statements_tenant_idx\` ON \`financial_statements\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`financial_statements_statement_id_idx\` ON \`financial_statements\` (\`statement_id\`);`)
  await db.run(sql`CREATE INDEX \`financial_statements_generated_by_idx\` ON \`financial_statements\` (\`generated_by_id\`);`)
  await db.run(sql`CREATE INDEX \`financial_statements_updated_at_idx\` ON \`financial_statements\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`financial_statements_created_at_idx\` ON \`financial_statements\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`period_end_adjustments\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`adjustment_id\` text NOT NULL,
  	\`adjustment_type\` text NOT NULL,
  	\`period\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`adjustment_amount\` numeric NOT NULL,
  	\`debit_account_id\` integer NOT NULL,
  	\`credit_account_id\` integer NOT NULL,
  	\`journal_entry_id\` integer,
  	\`status\` text DEFAULT 'draft',
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`debit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`credit_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`period_end_adjustments_tenant_idx\` ON \`period_end_adjustments\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`period_end_adjustments_adjustment_id_idx\` ON \`period_end_adjustments\` (\`adjustment_id\`);`)
  await db.run(sql`CREATE INDEX \`period_end_adjustments_debit_account_idx\` ON \`period_end_adjustments\` (\`debit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`period_end_adjustments_credit_account_idx\` ON \`period_end_adjustments\` (\`credit_account_id\`);`)
  await db.run(sql`CREATE INDEX \`period_end_adjustments_journal_entry_idx\` ON \`period_end_adjustments\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`period_end_adjustments_updated_at_idx\` ON \`period_end_adjustments\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`period_end_adjustments_created_at_idx\` ON \`period_end_adjustments\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`depreciation_schedules\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`schedule_id\` text NOT NULL,
  	\`fixed_asset_id\` integer NOT NULL,
  	\`period_end\` text NOT NULL,
  	\`period_start\` text NOT NULL,
  	\`depreciation_amount\` numeric NOT NULL,
  	\`accumulated_after\` numeric,
  	\`book_value_after\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`method\` text,
  	\`status\` text DEFAULT 'calculated',
  	\`posted_at\` text,
  	\`journal_entry_id\` integer,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`fixed_asset_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`depreciation_schedules_tenant_idx\` ON \`depreciation_schedules\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`depreciation_schedules_schedule_id_idx\` ON \`depreciation_schedules\` (\`schedule_id\`);`)
  await db.run(sql`CREATE INDEX \`depreciation_schedules_fixed_asset_idx\` ON \`depreciation_schedules\` (\`fixed_asset_id\`);`)
  await db.run(sql`CREATE INDEX \`depreciation_schedules_period_end_idx\` ON \`depreciation_schedules\` (\`period_end\`);`)
  await db.run(sql`CREATE INDEX \`depreciation_schedules_journal_entry_idx\` ON \`depreciation_schedules\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`depreciation_schedules_created_by_idx\` ON \`depreciation_schedules\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`depreciation_schedules_approved_by_idx\` ON \`depreciation_schedules\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`depreciation_schedules_updated_at_idx\` ON \`depreciation_schedules\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`depreciation_schedules_created_at_idx\` ON \`depreciation_schedules\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tax_calculations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`calculation_id\` text NOT NULL,
  	\`tax_type\` text NOT NULL,
  	\`jurisdiction\` text NOT NULL,
  	\`period\` text NOT NULL,
  	\`tax_rate\` numeric NOT NULL,
  	\`gross_amount\` numeric NOT NULL,
  	\`taxable_amount\` numeric NOT NULL,
  	\`tax_amount\` numeric NOT NULL,
  	\`net_amount\` numeric NOT NULL,
  	\`tax_payable_account_id\` integer NOT NULL,
  	\`tax_expense_account_id\` integer,
  	\`journal_entry_id\` integer,
  	\`status\` text DEFAULT 'calculated',
  	\`filing_deadline\` text,
  	\`payment_deadline\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tax_payable_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tax_expense_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`tax_calculations_tenant_idx\` ON \`tax_calculations\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tax_calculations_calculation_id_idx\` ON \`tax_calculations\` (\`calculation_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_calculations_tax_payable_account_idx\` ON \`tax_calculations\` (\`tax_payable_account_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_calculations_tax_expense_account_idx\` ON \`tax_calculations\` (\`tax_expense_account_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_calculations_journal_entry_idx\` ON \`tax_calculations\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_calculations_updated_at_idx\` ON \`tax_calculations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tax_calculations_created_at_idx\` ON \`tax_calculations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tax_returns_attachments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`media_id\` integer,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`tax_returns\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tax_returns_attachments_order_idx\` ON \`tax_returns_attachments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_attachments_parent_id_idx\` ON \`tax_returns_attachments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_attachments_media_idx\` ON \`tax_returns_attachments\` (\`media_id\`);`)
  await db.run(sql`CREATE TABLE \`tax_returns\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`return_id\` text NOT NULL,
  	\`return_type\` text NOT NULL,
  	\`jurisdiction_id\` integer NOT NULL,
  	\`period_start\` text NOT NULL,
  	\`period_end\` text NOT NULL,
  	\`taxable_sales\` numeric DEFAULT 0,
  	\`taxable_acquisitions\` numeric DEFAULT 0,
  	\`output_tax\` numeric DEFAULT 0,
  	\`input_tax\` numeric DEFAULT 0,
  	\`net_liability\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'draft',
  	\`filed_at\` text,
  	\`filed_by_id\` integer,
  	\`authority_reference\` text,
  	\`paid_at\` text,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`jurisdiction_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`filed_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`tax_returns_tenant_idx\` ON \`tax_returns\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`tax_returns_return_id_idx\` ON \`tax_returns\` (\`return_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_jurisdiction_idx\` ON \`tax_returns\` (\`jurisdiction_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_period_end_idx\` ON \`tax_returns\` (\`period_end\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_filed_by_idx\` ON \`tax_returns\` (\`filed_by_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_created_by_idx\` ON \`tax_returns\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_approved_by_idx\` ON \`tax_returns\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_updated_at_idx\` ON \`tax_returns\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_created_at_idx\` ON \`tax_returns\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`tax_returns_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tax_calculations_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`tax_returns\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tax_calculations_id\`) REFERENCES \`tax_calculations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`tax_returns_rels_order_idx\` ON \`tax_returns_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_rels_parent_idx\` ON \`tax_returns_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_rels_path_idx\` ON \`tax_returns_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`tax_returns_rels_tax_calculations_id_idx\` ON \`tax_returns_rels\` (\`tax_calculations_id\`);`)
  await db.run(sql`CREATE TABLE \`currency_rates\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`rate_id\` text NOT NULL,
  	\`from_currency\` text DEFAULT 'EUR' NOT NULL,
  	\`to_currency\` text DEFAULT 'EUR' NOT NULL,
  	\`rate\` numeric NOT NULL,
  	\`rate_date\` text NOT NULL,
  	\`source\` text NOT NULL,
  	\`inverse\` numeric,
  	\`mid_market_rate\` numeric,
  	\`bid_rate\` numeric,
  	\`ask_rate\` numeric,
  	\`is_active\` integer DEFAULT true,
  	\`used_in_transactions\` numeric DEFAULT 0,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`currency_rates_tenant_idx\` ON \`currency_rates\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`currency_rates_rate_id_idx\` ON \`currency_rates\` (\`rate_id\`);`)
  await db.run(sql`CREATE INDEX \`currency_rates_updated_at_idx\` ON \`currency_rates\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`currency_rates_created_at_idx\` ON \`currency_rates\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`credit_memos\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`memo_number\` text NOT NULL,
  	\`customer_id\` integer,
  	\`invoice_id\` integer,
  	\`reason\` text NOT NULL,
  	\`reason_detail\` text,
  	\`amount\` numeric NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'draft',
  	\`issued_at\` text,
  	\`applied_at\` text,
  	\`settled_at\` text,
  	\`journal_entry_id\` integer,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`credit_memos_tenant_idx\` ON \`credit_memos\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`credit_memos_memo_number_idx\` ON \`credit_memos\` (\`memo_number\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_customer_idx\` ON \`credit_memos\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_invoice_idx\` ON \`credit_memos\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_journal_entry_idx\` ON \`credit_memos\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_created_by_idx\` ON \`credit_memos\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_approved_by_idx\` ON \`credit_memos\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_updated_at_idx\` ON \`credit_memos\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`credit_memos_created_at_idx\` ON \`credit_memos\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`refunds\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`refund_number\` text NOT NULL,
  	\`credit_memo_id\` integer NOT NULL,
  	\`invoice_id\` integer,
  	\`order_id\` integer,
  	\`amount\` numeric NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`method\` text NOT NULL,
  	\`stripe_refund_id\` text,
  	\`status\` text DEFAULT 'draft',
  	\`refunded_at\` text,
  	\`settled_at\` text,
  	\`failure_reason\` text,
  	\`journal_entry_id\` integer,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`credit_memo_id\`) REFERENCES \`credit_memos\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
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
  await db.run(sql`CREATE TABLE \`fixed_assets\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`asset_number\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`asset_category\` text NOT NULL,
  	\`acquisition_date\` text NOT NULL,
  	\`asset_cost\` numeric NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`supplier_id\` integer,
  	\`purchase_order\` text,
  	\`location\` text,
  	\`serial_number\` text,
  	\`barcode\` text,
  	\`depreciation_method\` text DEFAULT 'straight_line',
  	\`useful_life_years\` numeric NOT NULL,
  	\`residual_value\` numeric DEFAULT 0,
  	\`depreciable_base\` numeric,
  	\`annual_depreciation_amount\` numeric DEFAULT 0,
  	\`accumulated_depreciation\` numeric DEFAULT 0,
  	\`book_value\` numeric DEFAULT 0,
  	\`depreciation_start_date\` text,
  	\`last_depreciation_date\` text,
  	\`total_units_expected\` numeric,
  	\`units_produced_to_date\` numeric DEFAULT 0,
  	\`asset_account_id\` integer NOT NULL,
  	\`accumulated_depreciation_account_id\` integer NOT NULL,
  	\`depreciation_expense_account_id\` integer NOT NULL,
  	\`status\` text DEFAULT 'active',
  	\`disposal_date\` text,
  	\`disposal_proceeds\` numeric,
  	\`gain_on_disposal\` numeric,
  	\`last_maintenance_date\` text,
  	\`next_maintenance_date\` text,
  	\`maintenance_notes\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`supplier_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`asset_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`accumulated_depreciation_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`depreciation_expense_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`fixed_assets_tenant_idx\` ON \`fixed_assets\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`fixed_assets_asset_number_idx\` ON \`fixed_assets\` (\`asset_number\`);`)
  await db.run(sql`CREATE INDEX \`fixed_assets_supplier_idx\` ON \`fixed_assets\` (\`supplier_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`fixed_assets_serial_number_idx\` ON \`fixed_assets\` (\`serial_number\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`fixed_assets_barcode_idx\` ON \`fixed_assets\` (\`barcode\`);`)
  await db.run(sql`CREATE INDEX \`fixed_assets_asset_account_idx\` ON \`fixed_assets\` (\`asset_account_id\`);`)
  await db.run(sql`CREATE INDEX \`fixed_assets_accumulated_depreciation_account_idx\` ON \`fixed_assets\` (\`accumulated_depreciation_account_id\`);`)
  await db.run(sql`CREATE INDEX \`fixed_assets_depreciation_expense_account_idx\` ON \`fixed_assets\` (\`depreciation_expense_account_id\`);`)
  await db.run(sql`CREATE INDEX \`fixed_assets_updated_at_idx\` ON \`fixed_assets\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`fixed_assets_created_at_idx\` ON \`fixed_assets\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`budget_planning_budget_line_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`gl_account_id\` integer NOT NULL,
  	\`account_number\` text,
  	\`account_name\` text,
  	\`account_type\` text,
  	\`budget_amount\` numeric NOT NULL,
  	\`notes\` text,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`budget_planning\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`budget_planning_budget_line_items_order_idx\` ON \`budget_planning_budget_line_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_budget_line_items_parent_id_idx\` ON \`budget_planning_budget_line_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_budget_line_items_gl_account_idx\` ON \`budget_planning_budget_line_items\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`budget_planning\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`budget_id\` text NOT NULL,
  	\`fiscal_year\` numeric NOT NULL,
  	\`department\` text NOT NULL,
  	\`budget_period\` text DEFAULT 'monthly',
  	\`total_budget\` numeric DEFAULT 0,
  	\`currency\` text DEFAULT 'EUR',
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`budget_planning_tenant_idx\` ON \`budget_planning\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`budget_planning_budget_id_idx\` ON \`budget_planning\` (\`budget_id\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_created_by_idx\` ON \`budget_planning\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_approved_by_idx\` ON \`budget_planning\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_updated_at_idx\` ON \`budget_planning\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`budget_planning_created_at_idx\` ON \`budget_planning\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`consent_records\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`consent_id\` text NOT NULL,
  	\`data_subject_id\` integer NOT NULL,
  	\`purpose\` text NOT NULL,
  	\`lawful_basis\` text DEFAULT 'consent',
  	\`consent_text\` text NOT NULL,
  	\`consent_version\` text,
  	\`captured_via\` text,
  	\`ip_address\` text,
  	\`user_agent\` text,
  	\`status\` text DEFAULT 'given',
  	\`given_at\` text,
  	\`withdrawn_at\` text,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`data_subject_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`consent_records_tenant_idx\` ON \`consent_records\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`consent_records_consent_id_idx\` ON \`consent_records\` (\`consent_id\`);`)
  await db.run(sql`CREATE INDEX \`consent_records_data_subject_idx\` ON \`consent_records\` (\`data_subject_id\`);`)
  await db.run(sql`CREATE INDEX \`consent_records_created_by_idx\` ON \`consent_records\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`consent_records_approved_by_idx\` ON \`consent_records\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`consent_records_updated_at_idx\` ON \`consent_records\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`consent_records_created_at_idx\` ON \`consent_records\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`data_subject_requests\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`request_id\` text NOT NULL,
  	\`data_subject_id\` integer NOT NULL,
  	\`request_type\` text NOT NULL,
  	\`request_detail\` text,
  	\`submitted_at\` text NOT NULL,
  	\`due_at\` text,
  	\`status\` text DEFAULT 'submitted',
  	\`completed_at\` text,
  	\`rejection_reason\` text,
  	\`fulfilment_evidence\` text,
  	\`handler_id\` integer,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`data_subject_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`handler_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`data_subject_requests_tenant_idx\` ON \`data_subject_requests\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`data_subject_requests_request_id_idx\` ON \`data_subject_requests\` (\`request_id\`);`)
  await db.run(sql`CREATE INDEX \`data_subject_requests_data_subject_idx\` ON \`data_subject_requests\` (\`data_subject_id\`);`)
  await db.run(sql`CREATE INDEX \`data_subject_requests_handler_idx\` ON \`data_subject_requests\` (\`handler_id\`);`)
  await db.run(sql`CREATE INDEX \`data_subject_requests_created_by_idx\` ON \`data_subject_requests\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`data_subject_requests_approved_by_idx\` ON \`data_subject_requests\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`data_subject_requests_updated_at_idx\` ON \`data_subject_requests\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`data_subject_requests_created_at_idx\` ON \`data_subject_requests\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`data_processing_activities_data_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`special\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`data_processing_activities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`data_processing_activities_data_categories_order_idx\` ON \`data_processing_activities_data_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_data_categories_parent_id_idx\` ON \`data_processing_activities_data_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`data_processing_activities_data_subject_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`data_processing_activities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`data_processing_activities_data_subject_categories_order_idx\` ON \`data_processing_activities_data_subject_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_data_subject_categories_parent_id_idx\` ON \`data_processing_activities_data_subject_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`data_processing_activities_recipient_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`recipient\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`data_processing_activities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`data_processing_activities_recipient_categories_order_idx\` ON \`data_processing_activities_recipient_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_recipient_categories_parent_id_idx\` ON \`data_processing_activities_recipient_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`transfers\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`country\` text NOT NULL,
  	\`safeguard\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`data_processing_activities\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`transfers_order_idx\` ON \`transfers\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`transfers_parent_id_idx\` ON \`transfers\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`data_processing_activities\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`activity_name\` text NOT NULL,
  	\`purpose\` text NOT NULL,
  	\`controller_or_processor\` text NOT NULL,
  	\`lawful_basis\` text NOT NULL,
  	\`retention_period\` text NOT NULL,
  	\`security_measures\` text,
  	\`status\` text DEFAULT 'active',
  	\`review_due_at\` text NOT NULL,
  	\`dpo_id\` integer,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`dpo_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`data_processing_activities_tenant_idx\` ON \`data_processing_activities\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`data_processing_activities_activity_name_idx\` ON \`data_processing_activities\` (\`activity_name\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_dpo_idx\` ON \`data_processing_activities\` (\`dpo_id\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_created_by_idx\` ON \`data_processing_activities\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_approved_by_idx\` ON \`data_processing_activities\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_updated_at_idx\` ON \`data_processing_activities\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`data_processing_activities_created_at_idx\` ON \`data_processing_activities\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`audit_findings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`finding_id\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`severity\` text NOT NULL,
  	\`classification\` text NOT NULL,
  	\`control_test_id\` integer,
  	\`reported_at\` text NOT NULL,
  	\`reported_by_id\` integer,
  	\`remediation_plan\` text,
  	\`remediation_owner_id\` integer,
  	\`target_close_date\` text,
  	\`status\` text DEFAULT 'open',
  	\`closed_at\` text,
  	\`closed_by_id\` integer,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`control_test_id\`) REFERENCES \`control_tests\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reported_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`remediation_owner_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`closed_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`audit_findings_tenant_idx\` ON \`audit_findings\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`audit_findings_finding_id_idx\` ON \`audit_findings\` (\`finding_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_control_test_idx\` ON \`audit_findings\` (\`control_test_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_reported_by_idx\` ON \`audit_findings\` (\`reported_by_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_remediation_owner_idx\` ON \`audit_findings\` (\`remediation_owner_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_closed_by_idx\` ON \`audit_findings\` (\`closed_by_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_created_by_idx\` ON \`audit_findings\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_approved_by_idx\` ON \`audit_findings\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_updated_at_idx\` ON \`audit_findings\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`audit_findings_created_at_idx\` ON \`audit_findings\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`control_tests\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`test_id\` text NOT NULL,
  	\`control_name\` text NOT NULL,
  	\`control_objective\` text NOT NULL,
  	\`control_frequency\` text,
  	\`test_type\` text NOT NULL,
  	\`period_start\` text NOT NULL,
  	\`period_end\` text NOT NULL,
  	\`sample_size\` numeric DEFAULT 0,
  	\`exceptions\` numeric DEFAULT 0,
  	\`result\` text,
  	\`evidence\` text,
  	\`tester_id\` integer,
  	\`reviewer_id\` integer,
  	\`status\` text DEFAULT 'planned',
  	\`signed_off_at\` text,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tester_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reviewer_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`control_tests_tenant_idx\` ON \`control_tests\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`control_tests_test_id_idx\` ON \`control_tests\` (\`test_id\`);`)
  await db.run(sql`CREATE INDEX \`control_tests_tester_idx\` ON \`control_tests\` (\`tester_id\`);`)
  await db.run(sql`CREATE INDEX \`control_tests_reviewer_idx\` ON \`control_tests\` (\`reviewer_id\`);`)
  await db.run(sql`CREATE INDEX \`control_tests_created_by_idx\` ON \`control_tests\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`control_tests_approved_by_idx\` ON \`control_tests\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`control_tests_updated_at_idx\` ON \`control_tests\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`control_tests_created_at_idx\` ON \`control_tests\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`cost_centers_allocation_rules\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`target_cost_center_id\` integer,
  	\`basis\` text,
  	\`percentage\` numeric,
  	FOREIGN KEY (\`target_cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cost_centers_allocation_rules_order_idx\` ON \`cost_centers_allocation_rules\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cost_centers_allocation_rules_parent_id_idx\` ON \`cost_centers_allocation_rules\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`cost_centers_allocation_rules_target_cost_center_idx\` ON \`cost_centers_allocation_rules\` (\`target_cost_center_id\`);`)
  await db.run(sql`CREATE TABLE \`cost_centers\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`cost_center_code\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`kind\` text DEFAULT 'department' NOT NULL,
  	\`parent_id\` integer,
  	\`country\` text,
  	\`manager_id\` integer,
  	\`reportable_segment\` integer DEFAULT false,
  	\`allows_revenue\` integer DEFAULT true,
  	\`allows_expense\` integer DEFAULT true,
  	\`allows_capex\` integer DEFAULT false,
  	\`effective_from\` text NOT NULL,
  	\`effective_to\` text,
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`manager_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`cost_centers_tenant_idx\` ON \`cost_centers\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`cost_centers_cost_center_code_idx\` ON \`cost_centers\` (\`cost_center_code\`);`)
  await db.run(sql`CREATE INDEX \`cost_centers_parent_idx\` ON \`cost_centers\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`cost_centers_manager_idx\` ON \`cost_centers\` (\`manager_id\`);`)
  await db.run(sql`CREATE INDEX \`cost_centers_created_by_idx\` ON \`cost_centers\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`cost_centers_approved_by_idx\` ON \`cost_centers\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`cost_centers_updated_at_idx\` ON \`cost_centers\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`cost_centers_created_at_idx\` ON \`cost_centers\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`leases_modifications\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`effective_date\` text NOT NULL,
  	\`kind\` text NOT NULL,
  	\`new_discount_rate_percent\` numeric,
  	\`new_fixed_payment\` numeric,
  	\`new_end_date\` text,
  	\`notes\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`leases\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`leases_modifications_order_idx\` ON \`leases_modifications\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`leases_modifications_parent_id_idx\` ON \`leases_modifications\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`leases\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`lease_number\` text NOT NULL,
  	\`description\` text,
  	\`lessor_id\` integer,
  	\`classification\` text DEFAULT 'finance' NOT NULL,
  	\`underlying_asset_category\` text,
  	\`commencement_date\` text NOT NULL,
  	\`end_date\` text NOT NULL,
  	\`lease_term_months\` numeric,
  	\`fixed_payment\` numeric NOT NULL,
  	\`payment_frequency\` text DEFAULT 'monthly',
  	\`payment_timing\` text DEFAULT 'in_advance',
  	\`variable_payment_notes\` text,
  	\`residual_value_guarantee\` numeric DEFAULT 0,
  	\`termination_penalty\` numeric DEFAULT 0,
  	\`discount_rate_basis\` text DEFAULT 'incremental_borrowing',
  	\`discount_rate_percent\` numeric NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`initial_lease_liability\` numeric,
  	\`initial_direct_costs\` numeric DEFAULT 0,
  	\`lease_incentives_received\` numeric DEFAULT 0,
  	\`prepaid_rent\` numeric DEFAULT 0,
  	\`initial_rou_asset\` numeric,
  	\`rou_asset_carrying\` numeric,
  	\`liability_carrying\` numeric,
  	\`last_posting_date\` text,
  	\`impairment_reserve\` numeric DEFAULT 0,
  	\`status\` text DEFAULT 'draft',
  	\`termination_date\` text,
  	\`rou_asset_account_id\` integer,
  	\`lease_liability_account_id\` integer,
  	\`rou_amortization_account_id\` integer,
  	\`interest_expense_account_id\` integer,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`lessor_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`rou_asset_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`lease_liability_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`rou_amortization_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`interest_expense_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`leases_tenant_idx\` ON \`leases\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`leases_lease_number_idx\` ON \`leases\` (\`lease_number\`);`)
  await db.run(sql`CREATE INDEX \`leases_lessor_idx\` ON \`leases\` (\`lessor_id\`);`)
  await db.run(sql`CREATE INDEX \`leases_rou_asset_account_idx\` ON \`leases\` (\`rou_asset_account_id\`);`)
  await db.run(sql`CREATE INDEX \`leases_lease_liability_account_idx\` ON \`leases\` (\`lease_liability_account_id\`);`)
  await db.run(sql`CREATE INDEX \`leases_rou_amortization_account_idx\` ON \`leases\` (\`rou_amortization_account_id\`);`)
  await db.run(sql`CREATE INDEX \`leases_interest_expense_account_idx\` ON \`leases\` (\`interest_expense_account_id\`);`)
  await db.run(sql`CREATE INDEX \`leases_created_by_idx\` ON \`leases\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`leases_approved_by_idx\` ON \`leases\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`leases_updated_at_idx\` ON \`leases\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`leases_created_at_idx\` ON \`leases\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`lease_period_postings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`posting_id\` text NOT NULL,
  	\`lease_id\` integer NOT NULL,
  	\`period_start\` text NOT NULL,
  	\`period_end\` text NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`opening_liability_carrying\` numeric NOT NULL,
  	\`opening_rou_carrying\` numeric NOT NULL,
  	\`interest\` numeric NOT NULL,
  	\`principal_repayment\` numeric NOT NULL,
  	\`cash_payment\` numeric NOT NULL,
  	\`rou_amortisation\` numeric NOT NULL,
  	\`closing_liability_carrying\` numeric,
  	\`closing_rou_carrying\` numeric,
  	\`interest_expense_account_id\` integer,
  	\`lease_liability_account_id\` integer,
  	\`rou_amortisation_account_id\` integer,
  	\`accumulated_rou_amortisation_account_id\` integer,
  	\`cash_account_id\` integer,
  	\`cost_center_id\` integer,
  	\`status\` text DEFAULT 'calculated',
  	\`posted_at\` text,
  	\`journal_entry_id\` integer,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`lease_id\`) REFERENCES \`leases\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`interest_expense_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`lease_liability_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`rou_amortisation_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`accumulated_rou_amortisation_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cash_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`lease_period_postings_tenant_idx\` ON \`lease_period_postings\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`lease_period_postings_posting_id_idx\` ON \`lease_period_postings\` (\`posting_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_lease_idx\` ON \`lease_period_postings\` (\`lease_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_period_end_idx\` ON \`lease_period_postings\` (\`period_end\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_interest_expense_account_idx\` ON \`lease_period_postings\` (\`interest_expense_account_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_lease_liability_account_idx\` ON \`lease_period_postings\` (\`lease_liability_account_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_rou_amortisation_account_idx\` ON \`lease_period_postings\` (\`rou_amortisation_account_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_accumulated_rou_amortisation_accou_idx\` ON \`lease_period_postings\` (\`accumulated_rou_amortisation_account_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_cash_account_idx\` ON \`lease_period_postings\` (\`cash_account_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_cost_center_idx\` ON \`lease_period_postings\` (\`cost_center_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_journal_entry_idx\` ON \`lease_period_postings\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_created_by_idx\` ON \`lease_period_postings\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_approved_by_idx\` ON \`lease_period_postings\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_updated_at_idx\` ON \`lease_period_postings\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`lease_period_postings_created_at_idx\` ON \`lease_period_postings\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`sepa_mandates\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`mandate_id\` text NOT NULL,
  	\`local_instrument\` text DEFAULT 'CORE' NOT NULL,
  	\`debtor_name\` text NOT NULL,
  	\`debtor_iban\` text NOT NULL,
  	\`debtor_bic\` text,
  	\`debtor_id\` integer,
  	\`creditor_identifier\` text NOT NULL,
  	\`signature_date\` text NOT NULL,
  	\`mandate_document_id\` integer,
  	\`signature_method\` text DEFAULT 'wet_ink',
  	\`sequence_state\` text DEFAULT 'pending_first',
  	\`last_collection_at\` text,
  	\`expiry_date\` text,
  	\`revoked_at\` text,
  	\`revocation_reason\` text,
  	\`status\` text DEFAULT 'active',
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`debtor_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`mandate_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`sepa_mandates_tenant_idx\` ON \`sepa_mandates\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`sepa_mandates_mandate_id_idx\` ON \`sepa_mandates\` (\`mandate_id\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_debtor_idx\` ON \`sepa_mandates\` (\`debtor_id\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_mandate_document_idx\` ON \`sepa_mandates\` (\`mandate_document_id\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_created_by_idx\` ON \`sepa_mandates\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_approved_by_idx\` ON \`sepa_mandates\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_updated_at_idx\` ON \`sepa_mandates\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`sepa_mandates_created_at_idx\` ON \`sepa_mandates\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payment_runs_transactions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`end_to_end_id\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`counterparty_name\` text NOT NULL,
  	\`counterparty_iban\` text NOT NULL,
  	\`counterparty_bic\` text,
  	\`remittance_reference\` text,
  	\`mandate_id\` text,
  	\`source_bill_id\` integer,
  	\`payment_record_id\` integer,
  	FOREIGN KEY (\`source_bill_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`payment_record_id\`) REFERENCES \`payments\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`payment_runs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payment_runs_transactions_order_idx\` ON \`payment_runs_transactions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`payment_runs_transactions_parent_id_idx\` ON \`payment_runs_transactions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_runs_transactions_source_bill_idx\` ON \`payment_runs_transactions\` (\`source_bill_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_runs_transactions_payment_record_idx\` ON \`payment_runs_transactions\` (\`payment_record_id\`);`)
  await db.run(sql`CREATE TABLE \`payment_runs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`run_id\` text NOT NULL,
  	\`message_type\` text NOT NULL,
  	\`sequence_type\` text,
  	\`local_instrument\` text,
  	\`source_bank_account_id\` integer NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`requested_execution_date\` text NOT NULL,
  	\`number_of_transactions\` numeric,
  	\`control_sum\` numeric,
  	\`prepared_by_id\` integer,
  	\`prepared_at\` text,
  	\`authorised_by_id\` integer,
  	\`authorised_at\` text,
  	\`export_filename\` text,
  	\`exported_at\` text,
  	\`submitted_at\` text,
  	\`settled_at\` text,
  	\`bank_response_status\` text,
  	\`bank_response_reason_code\` text,
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`source_bank_account_id\`) REFERENCES \`bank_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`prepared_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`authorised_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`payment_runs_tenant_idx\` ON \`payment_runs\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`payment_runs_run_id_idx\` ON \`payment_runs\` (\`run_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_runs_source_bank_account_idx\` ON \`payment_runs\` (\`source_bank_account_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_runs_prepared_by_idx\` ON \`payment_runs\` (\`prepared_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_runs_authorised_by_idx\` ON \`payment_runs\` (\`authorised_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_runs_created_by_idx\` ON \`payment_runs\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_runs_approved_by_idx\` ON \`payment_runs\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payment_runs_updated_at_idx\` ON \`payment_runs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payment_runs_created_at_idx\` ON \`payment_runs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`account_reconciliations_external_adjustments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`originated_at\` text NOT NULL,
  	\`aging_bucket\` text,
  	\`bank_transaction_id\` integer,
  	\`journal_entry_id\` integer,
  	FOREIGN KEY (\`bank_transaction_id\`) REFERENCES \`bank_transactions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`account_reconciliations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`account_reconciliations_external_adjustments_order_idx\` ON \`account_reconciliations_external_adjustments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_external_adjustments_parent_id_idx\` ON \`account_reconciliations_external_adjustments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_external_adjustments_bank_transa_idx\` ON \`account_reconciliations_external_adjustments\` (\`bank_transaction_id\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_external_adjustments_journal_ent_idx\` ON \`account_reconciliations_external_adjustments\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`account_reconciliations_gl_adjustments\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`category\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`amount\` numeric NOT NULL,
  	\`originated_at\` text NOT NULL,
  	\`aging_bucket\` text,
  	\`journal_entry_id\` integer,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`account_reconciliations\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`account_reconciliations_gl_adjustments_order_idx\` ON \`account_reconciliations_gl_adjustments\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_gl_adjustments_parent_id_idx\` ON \`account_reconciliations_gl_adjustments\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_gl_adjustments_journal_entry_idx\` ON \`account_reconciliations_gl_adjustments\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE TABLE \`account_reconciliations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`reconciliation_id\` text NOT NULL,
  	\`kind\` text DEFAULT 'bank' NOT NULL,
  	\`gl_account_id\` integer NOT NULL,
  	\`bank_account_id\` integer,
  	\`as_of_date\` text NOT NULL,
  	\`period_start\` text,
  	\`period_end\` text,
  	\`currency\` text DEFAULT 'EUR',
  	\`balance_per_external\` numeric NOT NULL,
  	\`balance_per_g_l\` numeric NOT NULL,
  	\`adjusted_external_balance\` numeric,
  	\`adjusted_g_l_balance\` numeric,
  	\`difference\` numeric,
  	\`prepared_by_id\` integer,
  	\`prepared_at\` text,
  	\`reviewed_by_id\` integer,
  	\`reviewed_at\` text,
  	\`rejection_reason\` text,
  	\`status\` text DEFAULT 'draft',
  	\`source_statement_id\` integer,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`bank_account_id\`) REFERENCES \`bank_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`prepared_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`reviewed_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`source_statement_id\`) REFERENCES \`bank_statements\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`account_reconciliations_tenant_idx\` ON \`account_reconciliations\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`account_reconciliations_reconciliation_id_idx\` ON \`account_reconciliations\` (\`reconciliation_id\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_gl_account_idx\` ON \`account_reconciliations\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_bank_account_idx\` ON \`account_reconciliations\` (\`bank_account_id\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_as_of_date_idx\` ON \`account_reconciliations\` (\`as_of_date\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_prepared_by_idx\` ON \`account_reconciliations\` (\`prepared_by_id\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_reviewed_by_idx\` ON \`account_reconciliations\` (\`reviewed_by_id\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_source_statement_idx\` ON \`account_reconciliations\` (\`source_statement_id\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_created_by_idx\` ON \`account_reconciliations\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_approved_by_idx\` ON \`account_reconciliations\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_updated_at_idx\` ON \`account_reconciliations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`account_reconciliations_created_at_idx\` ON \`account_reconciliations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`dunning_cycles_history\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`stage\` text NOT NULL,
  	\`entered_at\` text NOT NULL,
  	\`amount_overdue_at_entry\` numeric,
  	\`communication_sent\` text,
  	\`communication_reference\` text,
  	\`notes\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`dunning_cycles\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`dunning_cycles_history_order_idx\` ON \`dunning_cycles_history\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_history_parent_id_idx\` ON \`dunning_cycles_history\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`dunning_cycles\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`cycle_id\` text NOT NULL,
  	\`invoice_id\` integer NOT NULL,
  	\`customer_id\` integer,
  	\`currency\` text DEFAULT 'EUR',
  	\`amount_overdue\` numeric NOT NULL,
  	\`invoice_due_date\` text NOT NULL,
  	\`days_past_due\` numeric,
  	\`current_stage\` text DEFAULT 'reminder' NOT NULL,
  	\`current_stage_entered_at\` text,
  	\`next_action_date\` text,
  	\`paused\` integer DEFAULT false,
  	\`pause_reason\` text,
  	\`payment_plan_ref\` text,
  	\`ecl_provision\` numeric,
  	\`write_off_journal_entry_id\` integer,
  	\`status\` text DEFAULT 'active',
  	\`resolved_at\` text,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`write_off_journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`dunning_cycles_tenant_idx\` ON \`dunning_cycles\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`dunning_cycles_cycle_id_idx\` ON \`dunning_cycles\` (\`cycle_id\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_invoice_idx\` ON \`dunning_cycles\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_customer_idx\` ON \`dunning_cycles\` (\`customer_id\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_write_off_journal_entry_idx\` ON \`dunning_cycles\` (\`write_off_journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_created_by_idx\` ON \`dunning_cycles\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_approved_by_idx\` ON \`dunning_cycles\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_updated_at_idx\` ON \`dunning_cycles\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`dunning_cycles_created_at_idx\` ON \`dunning_cycles\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`employees\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`employee_number\` text NOT NULL,
  	\`display_name\` text NOT NULL,
  	\`identity_given_name\` text NOT NULL,
  	\`identity_family_name\` text NOT NULL,
  	\`identity_date_of_birth\` text,
  	\`identity_national_id_ref\` text,
  	\`identity_citizenship_country\` text,
  	\`contact_work_email\` text,
  	\`contact_personal_email\` text,
  	\`contact_phone\` text,
  	\`job_title\` text NOT NULL,
  	\`employment_type\` text DEFAULT 'full_time_indefinite' NOT NULL,
  	\`department_id\` integer,
  	\`manager_id\` integer,
  	\`work_country\` text,
  	\`hire_date\` text NOT NULL,
  	\`probation_end_date\` text,
  	\`contract_end_date\` text,
  	\`termination_date\` text,
  	\`termination_reason\` text,
  	\`currency\` text DEFAULT 'EUR',
  	\`compensation_base_salary_annual\` numeric,
  	\`compensation_fte_ratio\` numeric DEFAULT 1,
  	\`compensation_pay_schedule\` text DEFAULT 'monthly',
  	\`compensation_target_bonus_percent\` numeric,
  	\`compensation_target_bonus_basis\` text,
  	\`benefits_pension_plan\` text,
  	\`benefits_pension_employer_contribution_percent\` numeric,
  	\`benefits_health_insurance\` integer DEFAULT false,
  	\`benefits_life_insurance\` integer DEFAULT false,
  	\`benefits_paid_time_off_days_per_year\` numeric,
  	\`benefits_paid_time_off_balance\` numeric DEFAULT 0,
  	\`payroll_bank_account_iban\` text,
  	\`payroll_bank_account_bic\` text,
  	\`payroll_bank_account_account_holder\` text,
  	\`tax_tax_id_ref\` text,
  	\`tax_social_security_id_ref\` text,
  	\`tax_tax_residence_country\` text,
  	\`status\` text DEFAULT 'pre_hire',
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`department_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`manager_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`employees_tenant_idx\` ON \`employees\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`employees_employee_number_idx\` ON \`employees\` (\`employee_number\`);`)
  await db.run(sql`CREATE INDEX \`employees_department_idx\` ON \`employees\` (\`department_id\`);`)
  await db.run(sql`CREATE INDEX \`employees_manager_idx\` ON \`employees\` (\`manager_id\`);`)
  await db.run(sql`CREATE INDEX \`employees_created_by_idx\` ON \`employees\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`employees_approved_by_idx\` ON \`employees\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`employees_updated_at_idx\` ON \`employees\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`employees_created_at_idx\` ON \`employees\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`time_entries\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`entry_id\` text NOT NULL,
  	\`employee_id\` integer NOT NULL,
  	\`work_date\` text NOT NULL,
  	\`minutes\` numeric NOT NULL,
  	\`kind\` text DEFAULT 'regular' NOT NULL,
  	\`cost_center_id\` integer,
  	\`project\` text,
  	\`task\` text,
  	\`description\` text,
  	\`billable\` integer DEFAULT false,
  	\`billable_rate\` numeric,
  	\`status\` text DEFAULT 'draft',
  	\`submitted_at\` text,
  	\`rejection_reason\` text,
  	\`payroll_run_id\` integer,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`employee_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`payroll_run_id\`) REFERENCES \`payroll_runs\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`time_entries_tenant_idx\` ON \`time_entries\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`time_entries_entry_id_idx\` ON \`time_entries\` (\`entry_id\`);`)
  await db.run(sql`CREATE INDEX \`time_entries_employee_idx\` ON \`time_entries\` (\`employee_id\`);`)
  await db.run(sql`CREATE INDEX \`time_entries_work_date_idx\` ON \`time_entries\` (\`work_date\`);`)
  await db.run(sql`CREATE INDEX \`time_entries_cost_center_idx\` ON \`time_entries\` (\`cost_center_id\`);`)
  await db.run(sql`CREATE INDEX \`time_entries_payroll_run_idx\` ON \`time_entries\` (\`payroll_run_id\`);`)
  await db.run(sql`CREATE INDEX \`time_entries_created_by_idx\` ON \`time_entries\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`time_entries_approved_by_idx\` ON \`time_entries\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`time_entries_updated_at_idx\` ON \`time_entries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`time_entries_created_at_idx\` ON \`time_entries\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payroll_runs_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`employee_id\` integer NOT NULL,
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
  	\`cost_center_id\` integer,
  	\`pay_slip_document_id\` integer,
  	FOREIGN KEY (\`employee_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`pay_slip_document_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`payroll_runs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payroll_runs_lines_order_idx\` ON \`payroll_runs_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_lines_parent_id_idx\` ON \`payroll_runs_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_lines_employee_idx\` ON \`payroll_runs_lines\` (\`employee_id\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_lines_cost_center_idx\` ON \`payroll_runs_lines\` (\`cost_center_id\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_lines_pay_slip_document_idx\` ON \`payroll_runs_lines\` (\`pay_slip_document_id\`);`)
  await db.run(sql`CREATE TABLE \`payroll_runs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`tenant_id\` integer NOT NULL,
  	\`run_id\` text NOT NULL,
  	\`pay_schedule\` text NOT NULL,
  	\`period_start\` text NOT NULL,
  	\`period_end\` text NOT NULL,
  	\`payment_date\` text NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`source_bank_account_id\` integer NOT NULL,
  	\`employee_count\` numeric,
  	\`total_gross\` numeric,
  	\`total_deductions\` numeric,
  	\`total_net\` numeric,
  	\`total_employer_side_accruals\` numeric,
  	\`prepared_by_id\` integer,
  	\`prepared_at\` text,
  	\`authorised_by_id\` integer,
  	\`authorised_at\` text,
  	\`status\` text DEFAULT 'draft',
  	\`journal_entry_id\` integer,
  	\`payment_run_id\` integer,
  	\`created_by_id\` integer,
  	\`approved_by_id\` integer,
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`source_bank_account_id\`) REFERENCES \`bank_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`prepared_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`authorised_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`journal_entry_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`payment_run_id\`) REFERENCES \`payment_runs\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`payroll_runs_tenant_idx\` ON \`payroll_runs\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`payroll_runs_run_id_idx\` ON \`payroll_runs\` (\`run_id\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_period_start_idx\` ON \`payroll_runs\` (\`period_start\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_period_end_idx\` ON \`payroll_runs\` (\`period_end\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_source_bank_account_idx\` ON \`payroll_runs\` (\`source_bank_account_id\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_prepared_by_idx\` ON \`payroll_runs\` (\`prepared_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_authorised_by_idx\` ON \`payroll_runs\` (\`authorised_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_journal_entry_idx\` ON \`payroll_runs\` (\`journal_entry_id\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_payment_run_idx\` ON \`payroll_runs\` (\`payment_run_id\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_created_by_idx\` ON \`payroll_runs\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_approved_by_idx\` ON \`payroll_runs\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_updated_at_idx\` ON \`payroll_runs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payroll_runs_created_at_idx\` ON \`payroll_runs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`redirects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`from\` text NOT NULL,
  	\`to_type\` text DEFAULT 'reference',
  	\`to_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`redirects_from_idx\` ON \`redirects\` (\`from\`);`)
  await db.run(sql`CREATE INDEX \`redirects_updated_at_idx\` ON \`redirects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`redirects_created_at_idx\` ON \`redirects\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`redirects_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	\`products_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`redirects_rels_order_idx\` ON \`redirects_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_parent_idx\` ON \`redirects_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_path_idx\` ON \`redirects_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_pages_id_idx\` ON \`redirects_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_posts_id_idx\` ON \`redirects_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`redirects_rels_products_id_idx\` ON \`redirects_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_checkbox\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
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
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_order_idx\` ON \`forms_blocks_checkbox\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_parent_id_idx\` ON \`forms_blocks_checkbox\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_checkbox_path_idx\` ON \`forms_blocks_checkbox\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_checkbox_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_checkbox\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_checkbox_locales_locale_parent_id_unique\` ON \`forms_blocks_checkbox_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_country\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_order_idx\` ON \`forms_blocks_country\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_parent_id_idx\` ON \`forms_blocks_country\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_country_path_idx\` ON \`forms_blocks_country\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_country_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_country\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_country_locales_locale_parent_id_unique\` ON \`forms_blocks_country_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_email\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_order_idx\` ON \`forms_blocks_email\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_parent_id_idx\` ON \`forms_blocks_email\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_email_path_idx\` ON \`forms_blocks_email\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_email_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_email\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_email_locales_locale_parent_id_unique\` ON \`forms_blocks_email_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_message\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_order_idx\` ON \`forms_blocks_message\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_parent_id_idx\` ON \`forms_blocks_message\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_message_path_idx\` ON \`forms_blocks_message\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_message_locales\` (
  	\`message\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_message\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_message_locales_locale_parent_id_unique\` ON \`forms_blocks_message_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_number\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
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
  await db.run(sql`CREATE INDEX \`forms_blocks_number_order_idx\` ON \`forms_blocks_number\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_parent_id_idx\` ON \`forms_blocks_number\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_number_path_idx\` ON \`forms_blocks_number\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_number_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_number\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_number_locales_locale_parent_id_unique\` ON \`forms_blocks_number_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select_options\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_options_order_idx\` ON \`forms_blocks_select_options\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_options_parent_id_idx\` ON \`forms_blocks_select_options\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select_options_locales\` (
  	\`label\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select_options\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_select_options_locales_locale_parent_id_unique\` ON \`forms_blocks_select_options_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
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
  await db.run(sql`CREATE INDEX \`forms_blocks_select_order_idx\` ON \`forms_blocks_select\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_parent_id_idx\` ON \`forms_blocks_select\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_select_path_idx\` ON \`forms_blocks_select\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_select_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_select\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_select_locales_locale_parent_id_unique\` ON \`forms_blocks_select_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_state\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_order_idx\` ON \`forms_blocks_state\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_parent_id_idx\` ON \`forms_blocks_state\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_state_path_idx\` ON \`forms_blocks_state\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_state_locales\` (
  	\`label\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_state\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_state_locales_locale_parent_id_unique\` ON \`forms_blocks_state_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_text\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_order_idx\` ON \`forms_blocks_text\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_parent_id_idx\` ON \`forms_blocks_text\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_text_path_idx\` ON \`forms_blocks_text\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_text_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_text\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_text_locales_locale_parent_id_unique\` ON \`forms_blocks_text_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_textarea\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`width\` numeric,
  	\`required\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_order_idx\` ON \`forms_blocks_textarea\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_parent_id_idx\` ON \`forms_blocks_textarea\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`forms_blocks_textarea_path_idx\` ON \`forms_blocks_textarea\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`forms_blocks_textarea_locales\` (
  	\`label\` text,
  	\`default_value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_blocks_textarea\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_blocks_textarea_locales_locale_parent_id_unique\` ON \`forms_blocks_textarea_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_emails\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`email_to\` text,
  	\`cc\` text,
  	\`bcc\` text,
  	\`reply_to\` text,
  	\`email_from\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_emails_order_idx\` ON \`forms_emails\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`forms_emails_parent_id_idx\` ON \`forms_emails\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms_emails_locales\` (
  	\`subject\` text DEFAULT 'You''ve received a new message.' NOT NULL,
  	\`message\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms_emails\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_emails_locales_locale_parent_id_unique\` ON \`forms_emails_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`forms\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`confirmation_type\` text DEFAULT 'message',
  	\`redirect_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`forms_updated_at_idx\` ON \`forms\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`forms_created_at_idx\` ON \`forms\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`forms_locales\` (
  	\`submit_button_label\` text,
  	\`confirmation_message\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`forms_locales_locale_parent_id_unique\` ON \`forms_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions_submission_data\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`field\` text NOT NULL,
  	\`value\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_order_idx\` ON \`form_submissions_submission_data\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_submission_data_parent_id_idx\` ON \`form_submissions_submission_data\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`form_submissions\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`form_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`form_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`form_submissions_form_idx\` ON \`form_submissions\` (\`form_id\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_updated_at_idx\` ON \`form_submissions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`form_submissions_created_at_idx\` ON \`form_submissions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`search_categories\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`relation_to\` text,
  	\`category_i_d\` text,
  	\`title\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`search_categories_order_idx\` ON \`search_categories\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`search_categories_parent_id_idx\` ON \`search_categories\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`search\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`priority\` numeric,
  	\`slug\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`search_slug_idx\` ON \`search\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`search_meta_meta_image_idx\` ON \`search\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`search_updated_at_idx\` ON \`search\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`search_created_at_idx\` ON \`search\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`search_locales\` (
  	\`title\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`search_locales_locale_parent_id_unique\` ON \`search_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`search_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	\`products_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`search_rels_order_idx\` ON \`search_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_parent_idx\` ON \`search_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_path_idx\` ON \`search_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_posts_id_idx\` ON \`search_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`search_rels_products_id_idx\` ON \`search_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_mcp_api_keys\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`user_id\` integer NOT NULL,
  	\`label\` text,
  	\`description\` text,
  	\`pages_find\` integer DEFAULT false,
  	\`pages_create\` integer DEFAULT false,
  	\`pages_update\` integer DEFAULT false,
  	\`pages_delete\` integer DEFAULT false,
  	\`posts_find\` integer DEFAULT false,
  	\`posts_create\` integer DEFAULT false,
  	\`posts_update\` integer DEFAULT false,
  	\`posts_delete\` integer DEFAULT false,
  	\`media_find\` integer DEFAULT false,
  	\`media_create\` integer DEFAULT false,
  	\`media_update\` integer DEFAULT false,
  	\`media_delete\` integer DEFAULT false,
  	\`categories_find\` integer DEFAULT false,
  	\`categories_create\` integer DEFAULT false,
  	\`categories_update\` integer DEFAULT false,
  	\`categories_delete\` integer DEFAULT false,
  	\`products_find\` integer DEFAULT false,
  	\`products_create\` integer DEFAULT false,
  	\`products_update\` integer DEFAULT false,
  	\`products_delete\` integer DEFAULT false,
  	\`header_find\` integer DEFAULT false,
  	\`header_update\` integer DEFAULT false,
  	\`footer_find\` integer DEFAULT false,
  	\`footer_update\` integer DEFAULT false,
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
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs_log\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
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
  await db.run(sql`CREATE INDEX \`payload_jobs_log_order_idx\` ON \`payload_jobs_log\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_log_parent_id_idx\` ON \`payload_jobs_log\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_jobs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`input\` text,
  	\`completed_at\` text,
  	\`total_tried\` numeric DEFAULT 0,
  	\`has_error\` integer DEFAULT false,
  	\`error\` text,
  	\`task_slug\` text,
  	\`queue\` text DEFAULT 'default',
  	\`wait_until\` text,
  	\`processing\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_jobs_completed_at_idx\` ON \`payload_jobs\` (\`completed_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_total_tried_idx\` ON \`payload_jobs\` (\`total_tried\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_has_error_idx\` ON \`payload_jobs\` (\`has_error\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_task_slug_idx\` ON \`payload_jobs\` (\`task_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_queue_idx\` ON \`payload_jobs\` (\`queue\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_wait_until_idx\` ON \`payload_jobs\` (\`wait_until\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_processing_idx\` ON \`payload_jobs\` (\`processing\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_updated_at_idx\` ON \`payload_jobs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_jobs_created_at_idx\` ON \`payload_jobs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`tenants_id\` integer,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	\`media_id\` integer,
  	\`categories_id\` integer,
  	\`roles_id\` integer,
  	\`user_roles_id\` integer,
  	\`users_id\` integer,
  	\`subscription_plans_id\` integer,
  	\`subscriptions_id\` integer,
  	\`items_id\` integer,
  	\`invoices_id\` integer,
  	\`invoice_lines_id\` integer,
  	\`payment_methods_id\` integer,
  	\`payments_id\` integer,
  	\`addresses_id\` integer,
  	\`variants_id\` integer,
  	\`variant_types_id\` integer,
  	\`variant_options_id\` integer,
  	\`products_id\` integer,
  	\`carts_id\` integer,
  	\`orders_id\` integer,
  	\`transactions_id\` integer,
  	\`audit_events_id\` integer,
  	\`tax_jurisdictions_id\` integer,
  	\`tax_codes_id\` integer,
  	\`fiscal_periods_id\` integer,
  	\`customers_id\` integer,
  	\`vendors_id\` integer,
  	\`kyc_checks_id\` integer,
  	\`beneficial_owners_id\` integer,
  	\`gl_accounts_id\` integer,
  	\`journal_entries_id\` integer,
  	\`gl_postings_id\` integer,
  	\`bank_accounts_id\` integer,
  	\`bank_statements_id\` integer,
  	\`bank_transactions_id\` integer,
  	\`purchase_orders_id\` integer,
  	\`goods_receipts_id\` integer,
  	\`quotes_id\` integer,
  	\`contracts_id\` integer,
  	\`performance_obligations_id\` integer,
  	\`shipments_id\` integer,
  	\`returns_id\` integer,
  	\`warehouse_locations_id\` integer,
  	\`inventory_movements_id\` integer,
  	\`financial_statements_id\` integer,
  	\`period_end_adjustments_id\` integer,
  	\`depreciation_schedules_id\` integer,
  	\`tax_calculations_id\` integer,
  	\`tax_returns_id\` integer,
  	\`currency_rates_id\` integer,
  	\`credit_memos_id\` integer,
  	\`refunds_id\` integer,
  	\`fixed_assets_id\` integer,
  	\`budget_planning_id\` integer,
  	\`consent_records_id\` integer,
  	\`data_subject_requests_id\` integer,
  	\`data_processing_activities_id\` integer,
  	\`audit_findings_id\` integer,
  	\`control_tests_id\` integer,
  	\`cost_centers_id\` integer,
  	\`leases_id\` integer,
  	\`lease_period_postings_id\` integer,
  	\`sepa_mandates_id\` integer,
  	\`payment_runs_id\` integer,
  	\`account_reconciliations_id\` integer,
  	\`dunning_cycles_id\` integer,
  	\`employees_id\` integer,
  	\`time_entries_id\` integer,
  	\`payroll_runs_id\` integer,
  	\`redirects_id\` integer,
  	\`forms_id\` integer,
  	\`form_submissions_id\` integer,
  	\`search_id\` integer,
  	\`payload_mcp_api_keys_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tenants_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`categories_id\`) REFERENCES \`categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`roles_id\`) REFERENCES \`roles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`user_roles_id\`) REFERENCES \`user_roles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`subscription_plans_id\`) REFERENCES \`subscription_plans\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`subscriptions_id\`) REFERENCES \`subscriptions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`items_id\`) REFERENCES \`items\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`invoices_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`invoice_lines_id\`) REFERENCES \`invoice_lines\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`payment_methods_id\`) REFERENCES \`payment_methods\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`payments_id\`) REFERENCES \`payments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`addresses_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`variants_id\`) REFERENCES \`variants\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`variant_types_id\`) REFERENCES \`variant_types\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`variant_options_id\`) REFERENCES \`variant_options\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`products_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`carts_id\`) REFERENCES \`carts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`orders_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`transactions_id\`) REFERENCES \`transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_events_id\`) REFERENCES \`audit_events\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tax_jurisdictions_id\`) REFERENCES \`tax_jurisdictions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tax_codes_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fiscal_periods_id\`) REFERENCES \`fiscal_periods\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`customers_id\`) REFERENCES \`customers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`vendors_id\`) REFERENCES \`vendors\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`kyc_checks_id\`) REFERENCES \`kyc_checks\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`beneficial_owners_id\`) REFERENCES \`beneficial_owners\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`gl_accounts_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`journal_entries_id\`) REFERENCES \`journal_entries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`gl_postings_id\`) REFERENCES \`gl_postings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`bank_accounts_id\`) REFERENCES \`bank_accounts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`bank_statements_id\`) REFERENCES \`bank_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`bank_transactions_id\`) REFERENCES \`bank_transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`purchase_orders_id\`) REFERENCES \`purchase_orders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`goods_receipts_id\`) REFERENCES \`goods_receipts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`quotes_id\`) REFERENCES \`quotes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`contracts_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`performance_obligations_id\`) REFERENCES \`performance_obligations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`shipments_id\`) REFERENCES \`shipments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`returns_id\`) REFERENCES \`returns\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`warehouse_locations_id\`) REFERENCES \`warehouse_locations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`inventory_movements_id\`) REFERENCES \`inventory_movements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`financial_statements_id\`) REFERENCES \`financial_statements\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`period_end_adjustments_id\`) REFERENCES \`period_end_adjustments\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`depreciation_schedules_id\`) REFERENCES \`depreciation_schedules\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tax_calculations_id\`) REFERENCES \`tax_calculations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`tax_returns_id\`) REFERENCES \`tax_returns\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`currency_rates_id\`) REFERENCES \`currency_rates\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`credit_memos_id\`) REFERENCES \`credit_memos\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`refunds_id\`) REFERENCES \`refunds\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`fixed_assets_id\`) REFERENCES \`fixed_assets\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`budget_planning_id\`) REFERENCES \`budget_planning\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`consent_records_id\`) REFERENCES \`consent_records\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`data_subject_requests_id\`) REFERENCES \`data_subject_requests\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`data_processing_activities_id\`) REFERENCES \`data_processing_activities\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`audit_findings_id\`) REFERENCES \`audit_findings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`control_tests_id\`) REFERENCES \`control_tests\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`cost_centers_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`leases_id\`) REFERENCES \`leases\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`lease_period_postings_id\`) REFERENCES \`lease_period_postings\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`sepa_mandates_id\`) REFERENCES \`sepa_mandates\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`payment_runs_id\`) REFERENCES \`payment_runs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`account_reconciliations_id\`) REFERENCES \`account_reconciliations\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`dunning_cycles_id\`) REFERENCES \`dunning_cycles\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`employees_id\`) REFERENCES \`employees\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`time_entries_id\`) REFERENCES \`time_entries\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`payroll_runs_id\`) REFERENCES \`payroll_runs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`redirects_id\`) REFERENCES \`redirects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`forms_id\`) REFERENCES \`forms\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`form_submissions_id\`) REFERENCES \`form_submissions\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`search_id\`) REFERENCES \`search\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`payload_mcp_api_keys_id\`) REFERENCES \`payload_mcp_api_keys\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tenants_id_idx\` ON \`payload_locked_documents_rels\` (\`tenants_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_roles_id_idx\` ON \`payload_locked_documents_rels\` (\`roles_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_user_roles_id_idx\` ON \`payload_locked_documents_rels\` (\`user_roles_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_subscription_plans_id_idx\` ON \`payload_locked_documents_rels\` (\`subscription_plans_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_subscriptions_id_idx\` ON \`payload_locked_documents_rels\` (\`subscriptions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_items_id_idx\` ON \`payload_locked_documents_rels\` (\`items_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_invoices_id_idx\` ON \`payload_locked_documents_rels\` (\`invoices_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_invoice_lines_id_idx\` ON \`payload_locked_documents_rels\` (\`invoice_lines_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_payment_methods_id_idx\` ON \`payload_locked_documents_rels\` (\`payment_methods_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_payments_id_idx\` ON \`payload_locked_documents_rels\` (\`payments_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_addresses_id_idx\` ON \`payload_locked_documents_rels\` (\`addresses_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_variants_id_idx\` ON \`payload_locked_documents_rels\` (\`variants_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_variant_types_id_idx\` ON \`payload_locked_documents_rels\` (\`variant_types_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_variant_options_id_idx\` ON \`payload_locked_documents_rels\` (\`variant_options_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_products_id_idx\` ON \`payload_locked_documents_rels\` (\`products_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_carts_id_idx\` ON \`payload_locked_documents_rels\` (\`carts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_orders_id_idx\` ON \`payload_locked_documents_rels\` (\`orders_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_transactions_id_idx\` ON \`payload_locked_documents_rels\` (\`transactions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_audit_events_id_idx\` ON \`payload_locked_documents_rels\` (\`audit_events_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tax_jurisdictions_id_idx\` ON \`payload_locked_documents_rels\` (\`tax_jurisdictions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tax_codes_id_idx\` ON \`payload_locked_documents_rels\` (\`tax_codes_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_fiscal_periods_id_idx\` ON \`payload_locked_documents_rels\` (\`fiscal_periods_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_customers_id_idx\` ON \`payload_locked_documents_rels\` (\`customers_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_vendors_id_idx\` ON \`payload_locked_documents_rels\` (\`vendors_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_kyc_checks_id_idx\` ON \`payload_locked_documents_rels\` (\`kyc_checks_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_beneficial_owners_id_idx\` ON \`payload_locked_documents_rels\` (\`beneficial_owners_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_gl_accounts_id_idx\` ON \`payload_locked_documents_rels\` (\`gl_accounts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_journal_entries_id_idx\` ON \`payload_locked_documents_rels\` (\`journal_entries_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_gl_postings_id_idx\` ON \`payload_locked_documents_rels\` (\`gl_postings_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_bank_accounts_id_idx\` ON \`payload_locked_documents_rels\` (\`bank_accounts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_bank_statements_id_idx\` ON \`payload_locked_documents_rels\` (\`bank_statements_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_bank_transactions_id_idx\` ON \`payload_locked_documents_rels\` (\`bank_transactions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_purchase_orders_id_idx\` ON \`payload_locked_documents_rels\` (\`purchase_orders_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_goods_receipts_id_idx\` ON \`payload_locked_documents_rels\` (\`goods_receipts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_quotes_id_idx\` ON \`payload_locked_documents_rels\` (\`quotes_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_contracts_id_idx\` ON \`payload_locked_documents_rels\` (\`contracts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_performance_obligations_id_idx\` ON \`payload_locked_documents_rels\` (\`performance_obligations_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_shipments_id_idx\` ON \`payload_locked_documents_rels\` (\`shipments_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_returns_id_idx\` ON \`payload_locked_documents_rels\` (\`returns_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_warehouse_locations_id_idx\` ON \`payload_locked_documents_rels\` (\`warehouse_locations_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_inventory_movements_id_idx\` ON \`payload_locked_documents_rels\` (\`inventory_movements_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_financial_statements_id_idx\` ON \`payload_locked_documents_rels\` (\`financial_statements_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_period_end_adjustments_id_idx\` ON \`payload_locked_documents_rels\` (\`period_end_adjustments_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_depreciation_schedules_id_idx\` ON \`payload_locked_documents_rels\` (\`depreciation_schedules_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tax_calculations_id_idx\` ON \`payload_locked_documents_rels\` (\`tax_calculations_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_tax_returns_id_idx\` ON \`payload_locked_documents_rels\` (\`tax_returns_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_currency_rates_id_idx\` ON \`payload_locked_documents_rels\` (\`currency_rates_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_credit_memos_id_idx\` ON \`payload_locked_documents_rels\` (\`credit_memos_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_refunds_id_idx\` ON \`payload_locked_documents_rels\` (\`refunds_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_fixed_assets_id_idx\` ON \`payload_locked_documents_rels\` (\`fixed_assets_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_budget_planning_id_idx\` ON \`payload_locked_documents_rels\` (\`budget_planning_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_consent_records_id_idx\` ON \`payload_locked_documents_rels\` (\`consent_records_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_data_subject_requests_id_idx\` ON \`payload_locked_documents_rels\` (\`data_subject_requests_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_data_processing_activities_idx\` ON \`payload_locked_documents_rels\` (\`data_processing_activities_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_audit_findings_id_idx\` ON \`payload_locked_documents_rels\` (\`audit_findings_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_control_tests_id_idx\` ON \`payload_locked_documents_rels\` (\`control_tests_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_cost_centers_id_idx\` ON \`payload_locked_documents_rels\` (\`cost_centers_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_leases_id_idx\` ON \`payload_locked_documents_rels\` (\`leases_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_lease_period_postings_id_idx\` ON \`payload_locked_documents_rels\` (\`lease_period_postings_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_sepa_mandates_id_idx\` ON \`payload_locked_documents_rels\` (\`sepa_mandates_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_payment_runs_id_idx\` ON \`payload_locked_documents_rels\` (\`payment_runs_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_account_reconciliations_id_idx\` ON \`payload_locked_documents_rels\` (\`account_reconciliations_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_dunning_cycles_id_idx\` ON \`payload_locked_documents_rels\` (\`dunning_cycles_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_employees_id_idx\` ON \`payload_locked_documents_rels\` (\`employees_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_time_entries_id_idx\` ON \`payload_locked_documents_rels\` (\`time_entries_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_payroll_runs_id_idx\` ON \`payload_locked_documents_rels\` (\`payroll_runs_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_redirects_id_idx\` ON \`payload_locked_documents_rels\` (\`redirects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_forms_id_idx\` ON \`payload_locked_documents_rels\` (\`forms_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_form_submissions_id_idx\` ON \`payload_locked_documents_rels\` (\`form_submissions_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_search_id_idx\` ON \`payload_locked_documents_rels\` (\`search_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_payload_mcp_api_keys_id_idx\` ON \`payload_locked_documents_rels\` (\`payload_mcp_api_keys_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`payload_mcp_api_keys_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`payload_mcp_api_keys_id\`) REFERENCES \`payload_mcp_api_keys\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_payload_mcp_api_keys_id_idx\` ON \`payload_preferences_rels\` (\`payload_mcp_api_keys_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`header_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_nav_items_order_idx\` ON \`header_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`header_nav_items_parent_id_idx\` ON \`header_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`header_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`header_rels_order_idx\` ON \`header_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_parent_idx\` ON \`header_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_path_idx\` ON \`header_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_pages_id_idx\` ON \`header_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`header_rels_posts_id_idx\` ON \`header_rels\` (\`posts_id\`);`)
  await db.run(sql`CREATE TABLE \`footer_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_nav_items_order_idx\` ON \`footer_nav_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`footer_nav_items_parent_id_idx\` ON \`footer_nav_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`footer\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`footer_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`footer\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`footer_rels_order_idx\` ON \`footer_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_parent_idx\` ON \`footer_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_path_idx\` ON \`footer_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_pages_id_idx\` ON \`footer_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`footer_rels_posts_id_idx\` ON \`footer_rels\` (\`posts_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`tenants\`;`)
  await db.run(sql`DROP TABLE \`pages_hero_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_media_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_archive\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`pages_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages_locales\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_hero_links\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_media_block\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_archive\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_blocks_form_block\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_version_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`_pages_v\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_pages_v_rels\`;`)
  await db.run(sql`DROP TABLE \`posts_populated_authors\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts_locales\`;`)
  await db.run(sql`DROP TABLE \`posts_rels\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_version_populated_authors\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`categories_breadcrumbs\`;`)
  await db.run(sql`DROP TABLE \`categories\`;`)
  await db.run(sql`DROP TABLE \`roles\`;`)
  await db.run(sql`DROP TABLE \`roles_rels\`;`)
  await db.run(sql`DROP TABLE \`user_roles\`;`)
  await db.run(sql`DROP TABLE \`users_roles\`;`)
  await db.run(sql`DROP TABLE \`users_tenants_roles\`;`)
  await db.run(sql`DROP TABLE \`users_tenants\`;`)
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`subscription_plans\`;`)
  await db.run(sql`DROP TABLE \`subscriptions\`;`)
  await db.run(sql`DROP TABLE \`items\`;`)
  await db.run(sql`DROP TABLE \`invoices_vat_breakdown\`;`)
  await db.run(sql`DROP TABLE \`invoices\`;`)
  await db.run(sql`DROP TABLE \`invoice_lines\`;`)
  await db.run(sql`DROP TABLE \`payment_methods\`;`)
  await db.run(sql`DROP TABLE \`payments\`;`)
  await db.run(sql`DROP TABLE \`addresses\`;`)
  await db.run(sql`DROP TABLE \`variants\`;`)
  await db.run(sql`DROP TABLE \`variants_rels\`;`)
  await db.run(sql`DROP TABLE \`_variants_v\`;`)
  await db.run(sql`DROP TABLE \`_variants_v_rels\`;`)
  await db.run(sql`DROP TABLE \`variant_types\`;`)
  await db.run(sql`DROP TABLE \`variant_options\`;`)
  await db.run(sql`DROP TABLE \`products_gallery\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`products_blocks_media_block\`;`)
  await db.run(sql`DROP TABLE \`products\`;`)
  await db.run(sql`DROP TABLE \`products_locales\`;`)
  await db.run(sql`DROP TABLE \`products_rels\`;`)
  await db.run(sql`DROP TABLE \`_products_v_version_gallery\`;`)
  await db.run(sql`DROP TABLE \`_products_v_blocks_cta_links\`;`)
  await db.run(sql`DROP TABLE \`_products_v_blocks_cta\`;`)
  await db.run(sql`DROP TABLE \`_products_v_blocks_content_columns\`;`)
  await db.run(sql`DROP TABLE \`_products_v_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`_products_v_blocks_media_block\`;`)
  await db.run(sql`DROP TABLE \`_products_v\`;`)
  await db.run(sql`DROP TABLE \`_products_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_products_v_rels\`;`)
  await db.run(sql`DROP TABLE \`carts_items\`;`)
  await db.run(sql`DROP TABLE \`carts\`;`)
  await db.run(sql`DROP TABLE \`orders_items\`;`)
  await db.run(sql`DROP TABLE \`orders\`;`)
  await db.run(sql`DROP TABLE \`orders_rels\`;`)
  await db.run(sql`DROP TABLE \`transactions_items\`;`)
  await db.run(sql`DROP TABLE \`transactions\`;`)
  await db.run(sql`DROP TABLE \`exports\`;`)
  await db.run(sql`DROP TABLE \`exports_texts\`;`)
  await db.run(sql`DROP TABLE \`imports\`;`)
  await db.run(sql`DROP TABLE \`audit_events_changes\`;`)
  await db.run(sql`DROP TABLE \`audit_events\`;`)
  await db.run(sql`DROP TABLE \`tax_jurisdictions\`;`)
  await db.run(sql`DROP TABLE \`tax_codes\`;`)
  await db.run(sql`DROP TABLE \`tax_codes_rels\`;`)
  await db.run(sql`DROP TABLE \`fiscal_periods\`;`)
  await db.run(sql`DROP TABLE \`customers\`;`)
  await db.run(sql`DROP TABLE \`customers_rels\`;`)
  await db.run(sql`DROP TABLE \`vendors\`;`)
  await db.run(sql`DROP TABLE \`vendors_rels\`;`)
  await db.run(sql`DROP TABLE \`kyc_checks_identity_documents\`;`)
  await db.run(sql`DROP TABLE \`kyc_checks\`;`)
  await db.run(sql`DROP TABLE \`beneficial_owners\`;`)
  await db.run(sql`DROP TABLE \`gl_accounts_tags\`;`)
  await db.run(sql`DROP TABLE \`gl_accounts\`;`)
  await db.run(sql`DROP TABLE \`journal_entries_lines\`;`)
  await db.run(sql`DROP TABLE \`journal_entries\`;`)
  await db.run(sql`DROP TABLE \`gl_postings_accounts_affected\`;`)
  await db.run(sql`DROP TABLE \`gl_postings\`;`)
  await db.run(sql`DROP TABLE \`bank_accounts\`;`)
  await db.run(sql`DROP TABLE \`bank_statements_transactions\`;`)
  await db.run(sql`DROP TABLE \`bank_statements_matched_transactions\`;`)
  await db.run(sql`DROP TABLE \`bank_statements\`;`)
  await db.run(sql`DROP TABLE \`bank_transactions_matched_journal_entries\`;`)
  await db.run(sql`DROP TABLE \`bank_transactions\`;`)
  await db.run(sql`DROP TABLE \`purchase_orders_lines\`;`)
  await db.run(sql`DROP TABLE \`purchase_orders\`;`)
  await db.run(sql`DROP TABLE \`goods_receipts_lines\`;`)
  await db.run(sql`DROP TABLE \`goods_receipts\`;`)
  await db.run(sql`DROP TABLE \`quotes_lines\`;`)
  await db.run(sql`DROP TABLE \`quotes\`;`)
  await db.run(sql`DROP TABLE \`contracts_modifications\`;`)
  await db.run(sql`DROP TABLE \`contracts\`;`)
  await db.run(sql`DROP TABLE \`contracts_rels\`;`)
  await db.run(sql`DROP TABLE \`performance_obligations\`;`)
  await db.run(sql`DROP TABLE \`shipments_lines\`;`)
  await db.run(sql`DROP TABLE \`shipments\`;`)
  await db.run(sql`DROP TABLE \`returns_lines\`;`)
  await db.run(sql`DROP TABLE \`returns\`;`)
  await db.run(sql`DROP TABLE \`warehouse_locations_bins\`;`)
  await db.run(sql`DROP TABLE \`warehouse_locations\`;`)
  await db.run(sql`DROP TABLE \`inventory_movements\`;`)
  await db.run(sql`DROP TABLE \`financial_statements_financial_ratios\`;`)
  await db.run(sql`DROP TABLE \`financial_statements_export_formats\`;`)
  await db.run(sql`DROP TABLE \`financial_statements\`;`)
  await db.run(sql`DROP TABLE \`period_end_adjustments\`;`)
  await db.run(sql`DROP TABLE \`depreciation_schedules\`;`)
  await db.run(sql`DROP TABLE \`tax_calculations\`;`)
  await db.run(sql`DROP TABLE \`tax_returns_attachments\`;`)
  await db.run(sql`DROP TABLE \`tax_returns\`;`)
  await db.run(sql`DROP TABLE \`tax_returns_rels\`;`)
  await db.run(sql`DROP TABLE \`currency_rates\`;`)
  await db.run(sql`DROP TABLE \`credit_memos\`;`)
  await db.run(sql`DROP TABLE \`refunds\`;`)
  await db.run(sql`DROP TABLE \`fixed_assets\`;`)
  await db.run(sql`DROP TABLE \`budget_planning_budget_line_items\`;`)
  await db.run(sql`DROP TABLE \`budget_planning\`;`)
  await db.run(sql`DROP TABLE \`consent_records\`;`)
  await db.run(sql`DROP TABLE \`data_subject_requests\`;`)
  await db.run(sql`DROP TABLE \`data_processing_activities_data_categories\`;`)
  await db.run(sql`DROP TABLE \`data_processing_activities_data_subject_categories\`;`)
  await db.run(sql`DROP TABLE \`data_processing_activities_recipient_categories\`;`)
  await db.run(sql`DROP TABLE \`transfers\`;`)
  await db.run(sql`DROP TABLE \`data_processing_activities\`;`)
  await db.run(sql`DROP TABLE \`audit_findings\`;`)
  await db.run(sql`DROP TABLE \`control_tests\`;`)
  await db.run(sql`DROP TABLE \`cost_centers_allocation_rules\`;`)
  await db.run(sql`DROP TABLE \`cost_centers\`;`)
  await db.run(sql`DROP TABLE \`leases_modifications\`;`)
  await db.run(sql`DROP TABLE \`leases\`;`)
  await db.run(sql`DROP TABLE \`lease_period_postings\`;`)
  await db.run(sql`DROP TABLE \`sepa_mandates\`;`)
  await db.run(sql`DROP TABLE \`payment_runs_transactions\`;`)
  await db.run(sql`DROP TABLE \`payment_runs\`;`)
  await db.run(sql`DROP TABLE \`account_reconciliations_external_adjustments\`;`)
  await db.run(sql`DROP TABLE \`account_reconciliations_gl_adjustments\`;`)
  await db.run(sql`DROP TABLE \`account_reconciliations\`;`)
  await db.run(sql`DROP TABLE \`dunning_cycles_history\`;`)
  await db.run(sql`DROP TABLE \`dunning_cycles\`;`)
  await db.run(sql`DROP TABLE \`employees\`;`)
  await db.run(sql`DROP TABLE \`time_entries\`;`)
  await db.run(sql`DROP TABLE \`payroll_runs_lines\`;`)
  await db.run(sql`DROP TABLE \`payroll_runs\`;`)
  await db.run(sql`DROP TABLE \`redirects\`;`)
  await db.run(sql`DROP TABLE \`redirects_rels\`;`)
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
  await db.run(sql`DROP TABLE \`forms\`;`)
  await db.run(sql`DROP TABLE \`forms_locales\`;`)
  await db.run(sql`DROP TABLE \`form_submissions_submission_data\`;`)
  await db.run(sql`DROP TABLE \`form_submissions\`;`)
  await db.run(sql`DROP TABLE \`search_categories\`;`)
  await db.run(sql`DROP TABLE \`search\`;`)
  await db.run(sql`DROP TABLE \`search_locales\`;`)
  await db.run(sql`DROP TABLE \`search_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_mcp_api_keys\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs_log\`;`)
  await db.run(sql`DROP TABLE \`payload_jobs\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`DROP TABLE \`header_rels\`;`)
  await db.run(sql`DROP TABLE \`footer_nav_items\`;`)
  await db.run(sql`DROP TABLE \`footer\`;`)
  await db.run(sql`DROP TABLE \`footer_rels\`;`)
}
