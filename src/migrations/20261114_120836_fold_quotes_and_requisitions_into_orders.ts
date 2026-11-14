import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
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
  await db.run(sql`DROP TABLE \`pr_lines\`;`)
  await db.run(sql`DROP TABLE \`pr_lines_locales\`;`)
  await db.run(sql`DROP TABLE \`pr_approval\`;`)
  await db.run(sql`DROP TABLE \`pr_approval_locales\`;`)
  await db.run(sql`DROP TABLE \`purchase_requisitions\`;`)
  await db.run(sql`DROP TABLE \`_pr_lines_v\`;`)
  await db.run(sql`DROP TABLE \`_pr_lines_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_pr_approval_v\`;`)
  await db.run(sql`DROP TABLE \`_pr_approval_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_purchase_requisitions_v\`;`)
  await db.run(sql`DROP TABLE \`vq_lines\`;`)
  await db.run(sql`DROP TABLE \`vq_lines_locales\`;`)
  await db.run(sql`DROP TABLE \`vendor_quotes\`;`)
  await db.run(sql`DROP TABLE \`_vq_lines_v\`;`)
  await db.run(sql`DROP TABLE \`_vq_lines_v_locales\`;`)
  await db.run(sql`DROP TABLE \`_vendor_quotes_v\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_orders\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
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
  	\`customer_id\` text(36),
  	\`customer_email\` text,
  	\`status\` text DEFAULT 'processing',
  	\`amount\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`access_token\` text,
  	\`side\` text DEFAULT 'sale',
  	\`document_type\` text DEFAULT 'order',
  	\`order_number\` text,
  	\`customer_order_reference\` text,
  	\`contract_id\` text(36),
  	\`sent_at\` text,
  	\`expires_at\` text,
  	\`accepted_at\` text,
  	\`order_date\` text,
  	\`requested_delivery_date\` text,
  	\`promised_delivery_date\` text,
  	\`ship_to_id\` text(36),
  	\`bill_to_id\` text(36),
  	\`sub_total_amount\` numeric DEFAULT 0,
  	\`tax_amount\` numeric DEFAULT 0,
  	\`total_amount\` numeric DEFAULT 0,
  	\`project_id\` text(36),
  	\`delivery_terms\` text,
  	\`incoterms_location\` text,
  	\`submitted_at\` text,
  	\`closed_at\` text,
  	\`invoice_id\` text(36),
  	\`requisition_id\` text(36),
  	\`rfq_issued_date\` text,
  	\`quote_received_date\` text,
  	\`shipping_amount\` numeric,
  	\`discount_amount\` numeric,
  	\`payment_terms\` text,
  	\`incoterms\` text,
  	\`is_awarded\` integer DEFAULT false,
  	\`awarded_date\` text,
  	\`awarded_by_id\` text(36),
  	\`award_rationale\` text,
  	\`quality_assessment\` text,
  	\`created_purchase_order_id\` text(36),
  	\`requisitioner_id\` text(36),
  	\`department\` text,
  	\`cost_center_id\` text(36),
  	\`business_justification\` text,
  	\`priority\` text,
  	\`requires_quotes\` integer DEFAULT false,
  	\`minimum_quotes_required\` numeric DEFAULT 0,
  	\`awarded_quote_id\` text(36),
  	\`notes\` text,
  	\`fulfilled_quantity\` numeric DEFAULT 0,
  	\`invoiced_amount\` numeric DEFAULT 0,
  	\`cancellation_date\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ship_to_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`bill_to_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`requisition_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`awarded_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_purchase_order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`requisitioner_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`awarded_quote_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_orders\`("id", "uuid", "tenant_id", "shipping_address_title", "shipping_address_first_name", "shipping_address_last_name", "shipping_address_company", "shipping_address_address_line1", "shipping_address_address_line2", "shipping_address_city", "shipping_address_state", "shipping_address_postal_code", "shipping_address_country", "shipping_address_phone", "customer_id", "customer_email", "status", "amount", "currency", "access_token", "side", "document_type", "order_number", "customer_order_reference", "contract_id", "sent_at", "expires_at", "accepted_at", "order_date", "requested_delivery_date", "promised_delivery_date", "ship_to_id", "bill_to_id", "sub_total_amount", "tax_amount", "total_amount", "project_id", "delivery_terms", "incoterms_location", "submitted_at", "closed_at", "invoice_id", "requisition_id", "rfq_issued_date", "quote_received_date", "shipping_amount", "discount_amount", "payment_terms", "incoterms", "is_awarded", "awarded_date", "awarded_by_id", "award_rationale", "quality_assessment", "created_purchase_order_id", "requisitioner_id", "department", "cost_center_id", "business_justification", "priority", "requires_quotes", "minimum_quotes_required", "awarded_quote_id", "notes", "fulfilled_quantity", "invoiced_amount", "cancellation_date", "created_by_id", "approved_by_id", "approved_at", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "shipping_address_title", "shipping_address_first_name", "shipping_address_last_name", "shipping_address_company", "shipping_address_address_line1", "shipping_address_address_line2", "shipping_address_city", "shipping_address_state", "shipping_address_postal_code", "shipping_address_country", "shipping_address_phone", "customer_id", "customer_email", "status", "amount", "currency", "access_token", "side", "document_type", "order_number", "customer_order_reference", "contract_id", "sent_at", "expires_at", "accepted_at", "order_date", "requested_delivery_date", "promised_delivery_date", "ship_to_id", "bill_to_id", "sub_total_amount", "tax_amount", "total_amount", "project_id", "delivery_terms", "incoterms_location", "submitted_at", "closed_at", "invoice_id", "requisition_id", "rfq_issued_date", "quote_received_date", "shipping_amount", "discount_amount", "payment_terms", "incoterms", "is_awarded", "awarded_date", "awarded_by_id", "award_rationale", "quality_assessment", "created_purchase_order_id", "requisitioner_id", "department", "cost_center_id", "business_justification", "priority", "requires_quotes", "minimum_quotes_required", "awarded_quote_id", "notes", "fulfilled_quantity", "invoiced_amount", "cancellation_date", "created_by_id", "approved_by_id", "approved_at", "updated_at", "created_at" FROM \`orders\`;`)
  await db.run(sql`DROP TABLE \`orders\`;`)
  await db.run(sql`ALTER TABLE \`__new_orders\` RENAME TO \`orders\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_uuid_idx\` ON \`orders\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`orders_tenant_idx\` ON \`orders\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_customer_idx\` ON \`orders\` (\`customer_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_access_token_idx\` ON \`orders\` (\`access_token\`);`)
  await db.run(sql`CREATE INDEX \`orders_side_idx\` ON \`orders\` (\`side\`);`)
  await db.run(sql`CREATE INDEX \`orders_document_type_idx\` ON \`orders\` (\`document_type\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_order_number_idx\` ON \`orders\` (\`order_number\`);`)
  await db.run(sql`CREATE INDEX \`orders_contract_idx\` ON \`orders\` (\`contract_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_ship_to_idx\` ON \`orders\` (\`ship_to_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_bill_to_idx\` ON \`orders\` (\`bill_to_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_project_idx\` ON \`orders\` (\`project_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_invoice_idx\` ON \`orders\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_requisition_idx\` ON \`orders\` (\`requisition_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_is_awarded_idx\` ON \`orders\` (\`is_awarded\`);`)
  await db.run(sql`CREATE INDEX \`orders_awarded_by_idx\` ON \`orders\` (\`awarded_by_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_created_purchase_order_idx\` ON \`orders\` (\`created_purchase_order_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_requisitioner_idx\` ON \`orders\` (\`requisitioner_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_cost_center_idx\` ON \`orders\` (\`cost_center_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_awarded_quote_idx\` ON \`orders\` (\`awarded_quote_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_created_by_idx\` ON \`orders\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_approved_by_idx\` ON \`orders\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_updated_at_idx\` ON \`orders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`orders_created_at_idx\` ON \`orders\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__orders_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_shipping_address_title\` text,
  	\`version_shipping_address_first_name\` text,
  	\`version_shipping_address_last_name\` text,
  	\`version_shipping_address_company\` text,
  	\`version_shipping_address_address_line1\` text,
  	\`version_shipping_address_address_line2\` text,
  	\`version_shipping_address_city\` text,
  	\`version_shipping_address_state\` text,
  	\`version_shipping_address_postal_code\` text,
  	\`version_shipping_address_country\` text,
  	\`version_shipping_address_phone\` text,
  	\`version_customer_id\` text(36),
  	\`version_customer_email\` text,
  	\`version_status\` text DEFAULT 'processing',
  	\`version_amount\` numeric,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_access_token\` text,
  	\`version_side\` text DEFAULT 'sale',
  	\`version_document_type\` text DEFAULT 'order',
  	\`version_order_number\` text,
  	\`version_customer_order_reference\` text,
  	\`version_contract_id\` text(36),
  	\`version_sent_at\` text,
  	\`version_expires_at\` text,
  	\`version_accepted_at\` text,
  	\`version_order_date\` text,
  	\`version_requested_delivery_date\` text,
  	\`version_promised_delivery_date\` text,
  	\`version_ship_to_id\` text(36),
  	\`version_bill_to_id\` text(36),
  	\`version_sub_total_amount\` numeric DEFAULT 0,
  	\`version_tax_amount\` numeric DEFAULT 0,
  	\`version_total_amount\` numeric DEFAULT 0,
  	\`version_project_id\` text(36),
  	\`version_delivery_terms\` text,
  	\`version_incoterms_location\` text,
  	\`version_submitted_at\` text,
  	\`version_closed_at\` text,
  	\`version_invoice_id\` text(36),
  	\`version_requisition_id\` text(36),
  	\`version_rfq_issued_date\` text,
  	\`version_quote_received_date\` text,
  	\`version_shipping_amount\` numeric,
  	\`version_discount_amount\` numeric,
  	\`version_payment_terms\` text,
  	\`version_incoterms\` text,
  	\`version_is_awarded\` integer DEFAULT false,
  	\`version_awarded_date\` text,
  	\`version_awarded_by_id\` text(36),
  	\`version_award_rationale\` text,
  	\`version_quality_assessment\` text,
  	\`version_created_purchase_order_id\` text(36),
  	\`version_requisitioner_id\` text(36),
  	\`version_department\` text,
  	\`version_cost_center_id\` text(36),
  	\`version_business_justification\` text,
  	\`version_priority\` text,
  	\`version_requires_quotes\` integer DEFAULT false,
  	\`version_minimum_quotes_required\` numeric DEFAULT 0,
  	\`version_awarded_quote_id\` text(36),
  	\`version_notes\` text,
  	\`version_fulfilled_quantity\` numeric DEFAULT 0,
  	\`version_invoiced_amount\` numeric DEFAULT 0,
  	\`version_cancellation_date\` text,
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_customer_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_ship_to_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_bill_to_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_requisition_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_awarded_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_purchase_order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_requisitioner_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_awarded_quote_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__orders_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_shipping_address_title", "version_shipping_address_first_name", "version_shipping_address_last_name", "version_shipping_address_company", "version_shipping_address_address_line1", "version_shipping_address_address_line2", "version_shipping_address_city", "version_shipping_address_state", "version_shipping_address_postal_code", "version_shipping_address_country", "version_shipping_address_phone", "version_customer_id", "version_customer_email", "version_status", "version_amount", "version_currency", "version_access_token", "version_side", "version_document_type", "version_order_number", "version_customer_order_reference", "version_contract_id", "version_sent_at", "version_expires_at", "version_accepted_at", "version_order_date", "version_requested_delivery_date", "version_promised_delivery_date", "version_ship_to_id", "version_bill_to_id", "version_sub_total_amount", "version_tax_amount", "version_total_amount", "version_project_id", "version_delivery_terms", "version_incoterms_location", "version_submitted_at", "version_closed_at", "version_invoice_id", "version_requisition_id", "version_rfq_issued_date", "version_quote_received_date", "version_shipping_amount", "version_discount_amount", "version_payment_terms", "version_incoterms", "version_is_awarded", "version_awarded_date", "version_awarded_by_id", "version_award_rationale", "version_quality_assessment", "version_created_purchase_order_id", "version_requisitioner_id", "version_department", "version_cost_center_id", "version_business_justification", "version_priority", "version_requires_quotes", "version_minimum_quotes_required", "version_awarded_quote_id", "version_notes", "version_fulfilled_quantity", "version_invoiced_amount", "version_cancellation_date", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_shipping_address_title", "version_shipping_address_first_name", "version_shipping_address_last_name", "version_shipping_address_company", "version_shipping_address_address_line1", "version_shipping_address_address_line2", "version_shipping_address_city", "version_shipping_address_state", "version_shipping_address_postal_code", "version_shipping_address_country", "version_shipping_address_phone", "version_customer_id", "version_customer_email", "version_status", "version_amount", "version_currency", "version_access_token", "version_side", "version_document_type", "version_order_number", "version_customer_order_reference", "version_contract_id", "version_sent_at", "version_expires_at", "version_accepted_at", "version_order_date", "version_requested_delivery_date", "version_promised_delivery_date", "version_ship_to_id", "version_bill_to_id", "version_sub_total_amount", "version_tax_amount", "version_total_amount", "version_project_id", "version_delivery_terms", "version_incoterms_location", "version_submitted_at", "version_closed_at", "version_invoice_id", "version_requisition_id", "version_rfq_issued_date", "version_quote_received_date", "version_shipping_amount", "version_discount_amount", "version_payment_terms", "version_incoterms", "version_is_awarded", "version_awarded_date", "version_awarded_by_id", "version_award_rationale", "version_quality_assessment", "version_created_purchase_order_id", "version_requisitioner_id", "version_department", "version_cost_center_id", "version_business_justification", "version_priority", "version_requires_quotes", "version_minimum_quotes_required", "version_awarded_quote_id", "version_notes", "version_fulfilled_quantity", "version_invoiced_amount", "version_cancellation_date", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_orders_v\`;`)
  await db.run(sql`DROP TABLE \`_orders_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__orders_v\` RENAME TO \`_orders_v\`;`)
  await db.run(sql`CREATE INDEX \`_orders_v_parent_idx\` ON \`_orders_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_uuid_idx\` ON \`_orders_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_tenant_idx\` ON \`_orders_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_customer_idx\` ON \`_orders_v\` (\`version_customer_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_access_token_idx\` ON \`_orders_v\` (\`version_access_token\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_side_idx\` ON \`_orders_v\` (\`version_side\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_document_type_idx\` ON \`_orders_v\` (\`version_document_type\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_order_number_idx\` ON \`_orders_v\` (\`version_order_number\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_contract_idx\` ON \`_orders_v\` (\`version_contract_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_ship_to_idx\` ON \`_orders_v\` (\`version_ship_to_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_bill_to_idx\` ON \`_orders_v\` (\`version_bill_to_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_project_idx\` ON \`_orders_v\` (\`version_project_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_invoice_idx\` ON \`_orders_v\` (\`version_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_requisition_idx\` ON \`_orders_v\` (\`version_requisition_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_is_awarded_idx\` ON \`_orders_v\` (\`version_is_awarded\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_awarded_by_idx\` ON \`_orders_v\` (\`version_awarded_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_created_purchase_order_idx\` ON \`_orders_v\` (\`version_created_purchase_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_requisitioner_idx\` ON \`_orders_v\` (\`version_requisitioner_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_cost_center_idx\` ON \`_orders_v\` (\`version_cost_center_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_awarded_quote_idx\` ON \`_orders_v\` (\`version_awarded_quote_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_created_by_idx\` ON \`_orders_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_approved_by_idx\` ON \`_orders_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_updated_at_idx\` ON \`_orders_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_created_at_idx\` ON \`_orders_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_created_at_idx\` ON \`_orders_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_updated_at_idx\` ON \`_orders_v\` (\`updated_at\`);`)
  await db.run(sql`ALTER TABLE \`e801d0467ac3d8adb9473d14e41225f76\` ADD \`lead_time_days\` numeric;`)
  await db.run(sql`ALTER TABLE \`e801d0467ac3d8adb9473d14e41225f76\` ADD \`preferred_vendor_id\` text(36) REFERENCES parties(id);`)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_preferred_vendor_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`preferred_vendor_id\`);`)
  await db.run(sql`ALTER TABLE \`orders_rels\` ADD \`parties_id\` text(36) REFERENCES parties(id);`)
  await db.run(sql`ALTER TABLE \`orders_rels\` ADD \`addresses_id\` text(36) REFERENCES addresses(id);`)
  await db.run(sql`ALTER TABLE \`orders_rels\` ADD \`tenants_id\` text(36) REFERENCES tenants(id);`)
  await db.run(sql`CREATE INDEX \`orders_rels_parties_id_idx\` ON \`orders_rels\` (\`parties_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_rels_addresses_id_idx\` ON \`orders_rels\` (\`addresses_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_rels_tenants_id_idx\` ON \`orders_rels\` (\`tenants_id\`);`)
  await db.run(sql`ALTER TABLE \`_e801d0467ac3d8adb9473d14e41225f76_v\` ADD \`lead_time_days\` numeric;`)
  await db.run(sql`ALTER TABLE \`_e801d0467ac3d8adb9473d14e41225f76_v\` ADD \`preferred_vendor_id\` text(36) REFERENCES parties(id);`)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_preferred_vendor_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`preferred_vendor_id\`);`)
  await db.run(sql`ALTER TABLE \`_orders_v_rels\` ADD \`parties_id\` text(36) REFERENCES parties(id);`)
  await db.run(sql`ALTER TABLE \`_orders_v_rels\` ADD \`addresses_id\` text(36) REFERENCES addresses(id);`)
  await db.run(sql`ALTER TABLE \`_orders_v_rels\` ADD \`tenants_id\` text(36) REFERENCES tenants(id);`)
  await db.run(sql`CREATE INDEX \`_orders_v_rels_parties_id_idx\` ON \`_orders_v_rels\` (\`parties_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_rels_addresses_id_idx\` ON \`_orders_v_rels\` (\`addresses_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_rels_tenants_id_idx\` ON \`_orders_v_rels\` (\`tenants_id\`);`)
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'orders', entity: 'collection', fieldPath: 'approvalChain.comment', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'purchase-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'purchase-requisitions', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'purchase-requisitions', entity: 'collection', fieldPath: 'approvalChain.comment', defaultLocale: 'en', req })
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'vendor-quotes', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`pr_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`uom\` text DEFAULT 'EA',
  	\`estimated_unit_price\` numeric NOT NULL,
  	\`estimated_amount\` numeric NOT NULL,
  	\`gl_account_id\` text,
  	\`preferred_vendor_id\` text(36),
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`preferred_vendor_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`purchase_requisitions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pr_lines_order_idx\` ON \`pr_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pr_lines_parent_id_idx\` ON \`pr_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pr_lines_item_idx\` ON \`pr_lines\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`pr_lines_gl_account_idx\` ON \`pr_lines\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE INDEX \`pr_lines_preferred_vendor_idx\` ON \`pr_lines\` (\`preferred_vendor_id\`);`)
  await db.run(sql`CREATE TABLE \`pr_lines_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pr_lines\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pr_lines_locales_locale_parent_id_unique\` ON \`pr_lines_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`pr_approval\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`step\` numeric NOT NULL,
  	\`approver_id\` text(36) NOT NULL,
  	\`role\` text,
  	\`decision\` text DEFAULT 'pending',
  	\`decided_at\` text,
  	FOREIGN KEY (\`approver_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`purchase_requisitions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pr_approval_order_idx\` ON \`pr_approval\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pr_approval_parent_id_idx\` ON \`pr_approval\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pr_approval_approver_idx\` ON \`pr_approval\` (\`approver_id\`);`)
  await db.run(sql`CREATE TABLE \`pr_approval_locales\` (
  	\`comment\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pr_approval\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`pr_approval_locales_locale_parent_id_unique\` ON \`pr_approval_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`purchase_requisitions\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`requisition_number\` text NOT NULL,
  	\`requisitioner_id\` text(36) NOT NULL,
  	\`department\` text,
  	\`cost_center_id\` text(36),
  	\`project_id\` text(36),
  	\`requested_date\` text NOT NULL,
  	\`required_by_date\` text,
  	\`business_justification\` text NOT NULL,
  	\`currency\` text DEFAULT 'EUR',
  	\`estimated_total\` numeric NOT NULL,
  	\`priority\` text DEFAULT 'normal',
  	\`requires_quotes\` integer DEFAULT false,
  	\`minimum_quotes_required\` numeric DEFAULT 0,
  	\`created_purchase_order_id\` text(36),
  	\`awarded_quote_id\` text(36),
  	\`status\` text DEFAULT 'draft',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`requisitioner_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_purchase_order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`awarded_quote_id\`) REFERENCES \`vendor_quotes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`purchase_requisitions_uuid_idx\` ON \`purchase_requisitions\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`purchase_requisitions_tenant_idx\` ON \`purchase_requisitions\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`purchase_requisitions_requisition_number_idx\` ON \`purchase_requisitions\` (\`requisition_number\`);`)
  await db.run(sql`CREATE INDEX \`purchase_requisitions_requisitioner_idx\` ON \`purchase_requisitions\` (\`requisitioner_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_requisitions_cost_center_idx\` ON \`purchase_requisitions\` (\`cost_center_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_requisitions_project_idx\` ON \`purchase_requisitions\` (\`project_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_requisitions_created_purchase_order_idx\` ON \`purchase_requisitions\` (\`created_purchase_order_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_requisitions_awarded_quote_idx\` ON \`purchase_requisitions\` (\`awarded_quote_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_requisitions_created_by_idx\` ON \`purchase_requisitions\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_requisitions_approved_by_idx\` ON \`purchase_requisitions\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`purchase_requisitions_updated_at_idx\` ON \`purchase_requisitions\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`purchase_requisitions_created_at_idx\` ON \`purchase_requisitions\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_pr_lines_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`uom\` text DEFAULT 'EA',
  	\`estimated_unit_price\` numeric NOT NULL,
  	\`estimated_amount\` numeric NOT NULL,
  	\`gl_account_id\` text,
  	\`preferred_vendor_id\` text(36),
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`preferred_vendor_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_purchase_requisitions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pr_lines_v_order_idx\` ON \`_pr_lines_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pr_lines_v_parent_id_idx\` ON \`_pr_lines_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pr_lines_v_item_idx\` ON \`_pr_lines_v\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`_pr_lines_v_gl_account_idx\` ON \`_pr_lines_v\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE INDEX \`_pr_lines_v_preferred_vendor_idx\` ON \`_pr_lines_v\` (\`preferred_vendor_id\`);`)
  await db.run(sql`CREATE TABLE \`_pr_lines_v_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pr_lines_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pr_lines_v_locales_locale_parent_id_unique\` ON \`_pr_lines_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_pr_approval_v\` (
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
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_purchase_requisitions_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_pr_approval_v_order_idx\` ON \`_pr_approval_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_pr_approval_v_parent_id_idx\` ON \`_pr_approval_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_pr_approval_v_approver_idx\` ON \`_pr_approval_v\` (\`approver_id\`);`)
  await db.run(sql`CREATE TABLE \`_pr_approval_v_locales\` (
  	\`comment\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_pr_approval_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_pr_approval_v_locales_locale_parent_id_unique\` ON \`_pr_approval_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_purchase_requisitions_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_requisition_number\` text NOT NULL,
  	\`version_requisitioner_id\` text(36) NOT NULL,
  	\`version_department\` text,
  	\`version_cost_center_id\` text(36),
  	\`version_project_id\` text(36),
  	\`version_requested_date\` text NOT NULL,
  	\`version_required_by_date\` text,
  	\`version_business_justification\` text NOT NULL,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_estimated_total\` numeric NOT NULL,
  	\`version_priority\` text DEFAULT 'normal',
  	\`version_requires_quotes\` integer DEFAULT false,
  	\`version_minimum_quotes_required\` numeric DEFAULT 0,
  	\`version_created_purchase_order_id\` text(36),
  	\`version_awarded_quote_id\` text(36),
  	\`version_status\` text DEFAULT 'draft',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`purchase_requisitions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_requisitioner_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_cost_center_id\`) REFERENCES \`cost_centers\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_purchase_order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_awarded_quote_id\`) REFERENCES \`vendor_quotes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_parent_idx\` ON \`_purchase_requisitions_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_uuid_idx\` ON \`_purchase_requisitions_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_tenant_idx\` ON \`_purchase_requisitions_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_requisition_num_idx\` ON \`_purchase_requisitions_v\` (\`version_requisition_number\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_requisitioner_idx\` ON \`_purchase_requisitions_v\` (\`version_requisitioner_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_cost_center_idx\` ON \`_purchase_requisitions_v\` (\`version_cost_center_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_project_idx\` ON \`_purchase_requisitions_v\` (\`version_project_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_created_purchas_idx\` ON \`_purchase_requisitions_v\` (\`version_created_purchase_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_awarded_quote_idx\` ON \`_purchase_requisitions_v\` (\`version_awarded_quote_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_created_by_idx\` ON \`_purchase_requisitions_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_approved_by_idx\` ON \`_purchase_requisitions_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_updated_at_idx\` ON \`_purchase_requisitions_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_version_version_created_at_idx\` ON \`_purchase_requisitions_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_created_at_idx\` ON \`_purchase_requisitions_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_purchase_requisitions_v_updated_at_idx\` ON \`_purchase_requisitions_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`vq_lines\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`uom\` text DEFAULT 'EA',
  	\`unit_price\` numeric NOT NULL,
  	\`line_total\` numeric NOT NULL,
  	\`lead_time_days\` numeric,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`vendor_quotes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`vq_lines_order_idx\` ON \`vq_lines\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`vq_lines_parent_id_idx\` ON \`vq_lines\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`vq_lines_item_idx\` ON \`vq_lines\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`vq_lines_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`vq_lines\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`vq_lines_locales_locale_parent_id_unique\` ON \`vq_lines_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`vendor_quotes\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
  	\`quote_number\` text NOT NULL,
  	\`vendor_id\` text(36) NOT NULL,
  	\`requisition_id\` text(36),
  	\`rfq_issued_date\` text,
  	\`quote_received_date\` text NOT NULL,
  	\`valid_until\` text,
  	\`currency\` text DEFAULT 'EUR',
  	\`subtotal\` numeric,
  	\`tax_amount\` numeric,
  	\`shipping_amount\` numeric,
  	\`discount_amount\` numeric,
  	\`total_amount\` numeric NOT NULL,
  	\`payment_terms\` text,
  	\`incoterms\` text,
  	\`delivery_date\` text,
  	\`is_awarded\` integer DEFAULT false,
  	\`awarded_date\` text,
  	\`awarded_by_id\` text(36),
  	\`award_rationale\` text,
  	\`created_purchase_order_id\` text(36),
  	\`quality_assessment\` text,
  	\`status\` text DEFAULT 'received',
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`vendor_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`requisition_id\`) REFERENCES \`purchase_requisitions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`awarded_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_purchase_order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`vendor_quotes_uuid_idx\` ON \`vendor_quotes\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`vendor_quotes_tenant_idx\` ON \`vendor_quotes\` (\`tenant_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`vendor_quotes_quote_number_idx\` ON \`vendor_quotes\` (\`quote_number\`);`)
  await db.run(sql`CREATE INDEX \`vendor_quotes_vendor_idx\` ON \`vendor_quotes\` (\`vendor_id\`);`)
  await db.run(sql`CREATE INDEX \`vendor_quotes_requisition_idx\` ON \`vendor_quotes\` (\`requisition_id\`);`)
  await db.run(sql`CREATE INDEX \`vendor_quotes_is_awarded_idx\` ON \`vendor_quotes\` (\`is_awarded\`);`)
  await db.run(sql`CREATE INDEX \`vendor_quotes_awarded_by_idx\` ON \`vendor_quotes\` (\`awarded_by_id\`);`)
  await db.run(sql`CREATE INDEX \`vendor_quotes_created_purchase_order_idx\` ON \`vendor_quotes\` (\`created_purchase_order_id\`);`)
  await db.run(sql`CREATE INDEX \`vendor_quotes_created_by_idx\` ON \`vendor_quotes\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`vendor_quotes_approved_by_idx\` ON \`vendor_quotes\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`vendor_quotes_updated_at_idx\` ON \`vendor_quotes\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`vendor_quotes_created_at_idx\` ON \`vendor_quotes\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`_vq_lines_v\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`item_id\` text(36),
  	\`quantity\` numeric NOT NULL,
  	\`uom\` text DEFAULT 'EA',
  	\`unit_price\` numeric NOT NULL,
  	\`line_total\` numeric NOT NULL,
  	\`lead_time_days\` numeric,
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_vendor_quotes_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_vq_lines_v_order_idx\` ON \`_vq_lines_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_vq_lines_v_parent_id_idx\` ON \`_vq_lines_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_vq_lines_v_item_idx\` ON \`_vq_lines_v\` (\`item_id\`);`)
  await db.run(sql`CREATE TABLE \`_vq_lines_v_locales\` (
  	\`description\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text(36) NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_vq_lines_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`_vq_lines_v_locales_locale_parent_id_unique\` ON \`_vq_lines_v_locales\` (\`_locale\`,\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_vendor_quotes_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_quote_number\` text NOT NULL,
  	\`version_vendor_id\` text(36) NOT NULL,
  	\`version_requisition_id\` text(36),
  	\`version_rfq_issued_date\` text,
  	\`version_quote_received_date\` text NOT NULL,
  	\`version_valid_until\` text,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_subtotal\` numeric,
  	\`version_tax_amount\` numeric,
  	\`version_shipping_amount\` numeric,
  	\`version_discount_amount\` numeric,
  	\`version_total_amount\` numeric NOT NULL,
  	\`version_payment_terms\` text,
  	\`version_incoterms\` text,
  	\`version_delivery_date\` text,
  	\`version_is_awarded\` integer DEFAULT false,
  	\`version_awarded_date\` text,
  	\`version_awarded_by_id\` text(36),
  	\`version_award_rationale\` text,
  	\`version_created_purchase_order_id\` text(36),
  	\`version_quality_assessment\` text,
  	\`version_status\` text DEFAULT 'received',
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_notes\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`vendor_quotes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_vendor_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_requisition_id\`) REFERENCES \`purchase_requisitions\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_awarded_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_purchase_order_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_parent_idx\` ON \`_vendor_quotes_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_uuid_idx\` ON \`_vendor_quotes_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_tenant_idx\` ON \`_vendor_quotes_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_quote_number_idx\` ON \`_vendor_quotes_v\` (\`version_quote_number\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_vendor_idx\` ON \`_vendor_quotes_v\` (\`version_vendor_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_requisition_idx\` ON \`_vendor_quotes_v\` (\`version_requisition_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_is_awarded_idx\` ON \`_vendor_quotes_v\` (\`version_is_awarded\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_awarded_by_idx\` ON \`_vendor_quotes_v\` (\`version_awarded_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_created_purchase_order_idx\` ON \`_vendor_quotes_v\` (\`version_created_purchase_order_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_created_by_idx\` ON \`_vendor_quotes_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_approved_by_idx\` ON \`_vendor_quotes_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_updated_at_idx\` ON \`_vendor_quotes_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_version_version_created_at_idx\` ON \`_vendor_quotes_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_created_at_idx\` ON \`_vendor_quotes_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_vendor_quotes_v_updated_at_idx\` ON \`_vendor_quotes_v\` (\`updated_at\`);`)
  await db.run(sql`DROP TABLE \`e39e594dd68848a429847c4ee70016372\`;`)
  await db.run(sql`DROP TABLE \`e39e594dd68848a429847c4ee70016372_locales\`;`)
  await db.run(sql`DROP TABLE \`_e39e594dd68848a429847c4ee70016372_v\`;`)
  await db.run(sql`DROP TABLE \`_e39e594dd68848a429847c4ee70016372_v_locales\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_e801d0467ac3d8adb9473d14e41225f76\` (
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
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tax_category_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_e801d0467ac3d8adb9473d14e41225f76\`("_order", "_parent_id", "id", "line_number", "item_id", "quantity", "unit_of_measure", "unit_price", "line_net", "tax_category_id", "discount", "requested_delivery_date", "gl_account_id", "quantity_received") SELECT "_order", "_parent_id", "id", "line_number", "item_id", "quantity", "unit_of_measure", "unit_price", "line_net", "tax_category_id", "discount", "requested_delivery_date", "gl_account_id", "quantity_received" FROM \`e801d0467ac3d8adb9473d14e41225f76\`;`)
  await db.run(sql`DROP TABLE \`e801d0467ac3d8adb9473d14e41225f76\`;`)
  await db.run(sql`ALTER TABLE \`__new_e801d0467ac3d8adb9473d14e41225f76\` RENAME TO \`e801d0467ac3d8adb9473d14e41225f76\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_order_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_parent_id_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_item_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_tax_category_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`tax_category_id\`);`)
  await db.run(sql`CREATE INDEX \`e801d0467ac3d8adb9473d14e41225f76_gl_account_idx\` ON \`e801d0467ac3d8adb9473d14e41225f76\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`__new_orders\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`uuid\` text,
  	\`tenant_id\` text(36),
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
  	\`customer_id\` text(36),
  	\`customer_email\` text,
  	\`status\` text DEFAULT 'processing',
  	\`amount\` numeric,
  	\`currency\` text DEFAULT 'EUR',
  	\`access_token\` text,
  	\`side\` text DEFAULT 'sale',
  	\`order_number\` text,
  	\`party_id\` text(36),
  	\`customer_order_reference\` text,
  	\`contract_id\` text(36),
  	\`sent_at\` text,
  	\`expires_at\` text,
  	\`accepted_at\` text,
  	\`order_date\` text,
  	\`requested_delivery_date\` text,
  	\`promised_delivery_date\` text,
  	\`ship_to_id\` text(36),
  	\`bill_to_id\` text(36),
  	\`sub_total_amount\` numeric DEFAULT 0,
  	\`tax_amount\` numeric DEFAULT 0,
  	\`total_amount\` numeric DEFAULT 0,
  	\`vendor_id\` text(36),
  	\`project_id\` text(36),
  	\`delivery_terms\` text,
  	\`incoterms_location\` text,
  	\`submitted_at\` text,
  	\`closed_at\` text,
  	\`invoice_id\` text(36),
  	\`notes\` text,
  	\`fulfilled_quantity\` numeric DEFAULT 0,
  	\`invoiced_amount\` numeric DEFAULT 0,
  	\`cancellation_date\` text,
  	\`created_by_id\` text(36),
  	\`approved_by_id\` text(36),
  	\`approved_at\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`customer_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`party_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`ship_to_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`bill_to_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`vendor_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_orders\`("id", "uuid", "tenant_id", "shipping_address_title", "shipping_address_first_name", "shipping_address_last_name", "shipping_address_company", "shipping_address_address_line1", "shipping_address_address_line2", "shipping_address_city", "shipping_address_state", "shipping_address_postal_code", "shipping_address_country", "shipping_address_phone", "customer_id", "customer_email", "status", "amount", "currency", "access_token", "side", "order_number", "party_id", "customer_order_reference", "contract_id", "sent_at", "expires_at", "accepted_at", "order_date", "requested_delivery_date", "promised_delivery_date", "ship_to_id", "bill_to_id", "sub_total_amount", "tax_amount", "total_amount", "vendor_id", "project_id", "delivery_terms", "incoterms_location", "submitted_at", "closed_at", "invoice_id", "notes", "fulfilled_quantity", "invoiced_amount", "cancellation_date", "created_by_id", "approved_by_id", "approved_at", "updated_at", "created_at") SELECT "id", "uuid", "tenant_id", "shipping_address_title", "shipping_address_first_name", "shipping_address_last_name", "shipping_address_company", "shipping_address_address_line1", "shipping_address_address_line2", "shipping_address_city", "shipping_address_state", "shipping_address_postal_code", "shipping_address_country", "shipping_address_phone", "customer_id", "customer_email", "status", "amount", "currency", "access_token", "side", "order_number", "party_id", "customer_order_reference", "contract_id", "sent_at", "expires_at", "accepted_at", "order_date", "requested_delivery_date", "promised_delivery_date", "ship_to_id", "bill_to_id", "sub_total_amount", "tax_amount", "total_amount", "vendor_id", "project_id", "delivery_terms", "incoterms_location", "submitted_at", "closed_at", "invoice_id", "notes", "fulfilled_quantity", "invoiced_amount", "cancellation_date", "created_by_id", "approved_by_id", "approved_at", "updated_at", "created_at" FROM \`orders\`;`)
  await db.run(sql`DROP TABLE \`orders\`;`)
  await db.run(sql`ALTER TABLE \`__new_orders\` RENAME TO \`orders\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_uuid_idx\` ON \`orders\` (\`uuid\`);`)
  await db.run(sql`CREATE INDEX \`orders_tenant_idx\` ON \`orders\` (\`tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_customer_idx\` ON \`orders\` (\`customer_id\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_access_token_idx\` ON \`orders\` (\`access_token\`);`)
  await db.run(sql`CREATE INDEX \`orders_side_idx\` ON \`orders\` (\`side\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`orders_order_number_idx\` ON \`orders\` (\`order_number\`);`)
  await db.run(sql`CREATE INDEX \`orders_party_idx\` ON \`orders\` (\`party_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_contract_idx\` ON \`orders\` (\`contract_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_ship_to_idx\` ON \`orders\` (\`ship_to_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_bill_to_idx\` ON \`orders\` (\`bill_to_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_vendor_idx\` ON \`orders\` (\`vendor_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_project_idx\` ON \`orders\` (\`project_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_invoice_idx\` ON \`orders\` (\`invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_created_by_idx\` ON \`orders\` (\`created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_approved_by_idx\` ON \`orders\` (\`approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_updated_at_idx\` ON \`orders\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`orders_created_at_idx\` ON \`orders\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`__new_orders_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`transactions_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`transactions_id\`) REFERENCES \`transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_orders_rels\`("id", "order", "parent_id", "path", "transactions_id") SELECT "id", "order", "parent_id", "path", "transactions_id" FROM \`orders_rels\`;`)
  await db.run(sql`DROP TABLE \`orders_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_orders_rels\` RENAME TO \`orders_rels\`;`)
  await db.run(sql`CREATE INDEX \`orders_rels_order_idx\` ON \`orders_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`orders_rels_parent_idx\` ON \`orders_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`orders_rels_path_idx\` ON \`orders_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`orders_rels_transactions_id_idx\` ON \`orders_rels\` (\`transactions_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__e801d0467ac3d8adb9473d14e41225f76_v\` (
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
  	\`_uuid\` text,
  	FOREIGN KEY (\`item_id\`) REFERENCES \`products\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`tax_category_id\`) REFERENCES \`tax_codes\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`gl_account_id\`) REFERENCES \`gl_accounts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__e801d0467ac3d8adb9473d14e41225f76_v\`("_order", "_parent_id", "id", "line_number", "item_id", "quantity", "unit_of_measure", "unit_price", "line_net", "tax_category_id", "discount", "requested_delivery_date", "gl_account_id", "quantity_received", "_uuid") SELECT "_order", "_parent_id", "id", "line_number", "item_id", "quantity", "unit_of_measure", "unit_price", "line_net", "tax_category_id", "discount", "requested_delivery_date", "gl_account_id", "quantity_received", "_uuid" FROM \`_e801d0467ac3d8adb9473d14e41225f76_v\`;`)
  await db.run(sql`DROP TABLE \`_e801d0467ac3d8adb9473d14e41225f76_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__e801d0467ac3d8adb9473d14e41225f76_v\` RENAME TO \`_e801d0467ac3d8adb9473d14e41225f76_v\`;`)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_order_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_parent_id_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_item_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`item_id\`);`)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_tax_category_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`tax_category_id\`);`)
  await db.run(sql`CREATE INDEX \`_e801d0467ac3d8adb9473d14e41225f76_v_gl_account_idx\` ON \`_e801d0467ac3d8adb9473d14e41225f76_v\` (\`gl_account_id\`);`)
  await db.run(sql`CREATE TABLE \`__new__orders_v\` (
  	\`id\` text(36) PRIMARY KEY NOT NULL,
  	\`parent_id\` text(36),
  	\`version_uuid\` text,
  	\`version_tenant_id\` text(36),
  	\`version_shipping_address_title\` text,
  	\`version_shipping_address_first_name\` text,
  	\`version_shipping_address_last_name\` text,
  	\`version_shipping_address_company\` text,
  	\`version_shipping_address_address_line1\` text,
  	\`version_shipping_address_address_line2\` text,
  	\`version_shipping_address_city\` text,
  	\`version_shipping_address_state\` text,
  	\`version_shipping_address_postal_code\` text,
  	\`version_shipping_address_country\` text,
  	\`version_shipping_address_phone\` text,
  	\`version_customer_id\` text(36),
  	\`version_customer_email\` text,
  	\`version_status\` text DEFAULT 'processing',
  	\`version_amount\` numeric,
  	\`version_currency\` text DEFAULT 'EUR',
  	\`version_access_token\` text,
  	\`version_side\` text DEFAULT 'sale',
  	\`version_order_number\` text,
  	\`version_party_id\` text(36),
  	\`version_customer_order_reference\` text,
  	\`version_contract_id\` text(36),
  	\`version_sent_at\` text,
  	\`version_expires_at\` text,
  	\`version_accepted_at\` text,
  	\`version_order_date\` text,
  	\`version_requested_delivery_date\` text,
  	\`version_promised_delivery_date\` text,
  	\`version_ship_to_id\` text(36),
  	\`version_bill_to_id\` text(36),
  	\`version_sub_total_amount\` numeric DEFAULT 0,
  	\`version_tax_amount\` numeric DEFAULT 0,
  	\`version_total_amount\` numeric DEFAULT 0,
  	\`version_vendor_id\` text(36),
  	\`version_project_id\` text(36),
  	\`version_delivery_terms\` text,
  	\`version_incoterms_location\` text,
  	\`version_submitted_at\` text,
  	\`version_closed_at\` text,
  	\`version_invoice_id\` text(36),
  	\`version_notes\` text,
  	\`version_fulfilled_quantity\` numeric DEFAULT 0,
  	\`version_invoiced_amount\` numeric DEFAULT 0,
  	\`version_cancellation_date\` text,
  	\`version_created_by_id\` text(36),
  	\`version_approved_by_id\` text(36),
  	\`version_approved_at\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`orders\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_tenant_id\`) REFERENCES \`tenants\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_customer_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_party_id\`) REFERENCES \`parties\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_contract_id\`) REFERENCES \`contracts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_ship_to_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_bill_to_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_vendor_id\`) REFERENCES \`addresses\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_project_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_invoice_id\`) REFERENCES \`invoices\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_created_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_approved_by_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new__orders_v\`("id", "parent_id", "version_uuid", "version_tenant_id", "version_shipping_address_title", "version_shipping_address_first_name", "version_shipping_address_last_name", "version_shipping_address_company", "version_shipping_address_address_line1", "version_shipping_address_address_line2", "version_shipping_address_city", "version_shipping_address_state", "version_shipping_address_postal_code", "version_shipping_address_country", "version_shipping_address_phone", "version_customer_id", "version_customer_email", "version_status", "version_amount", "version_currency", "version_access_token", "version_side", "version_order_number", "version_party_id", "version_customer_order_reference", "version_contract_id", "version_sent_at", "version_expires_at", "version_accepted_at", "version_order_date", "version_requested_delivery_date", "version_promised_delivery_date", "version_ship_to_id", "version_bill_to_id", "version_sub_total_amount", "version_tax_amount", "version_total_amount", "version_vendor_id", "version_project_id", "version_delivery_terms", "version_incoterms_location", "version_submitted_at", "version_closed_at", "version_invoice_id", "version_notes", "version_fulfilled_quantity", "version_invoiced_amount", "version_cancellation_date", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_updated_at", "version_created_at", "created_at", "updated_at") SELECT "id", "parent_id", "version_uuid", "version_tenant_id", "version_shipping_address_title", "version_shipping_address_first_name", "version_shipping_address_last_name", "version_shipping_address_company", "version_shipping_address_address_line1", "version_shipping_address_address_line2", "version_shipping_address_city", "version_shipping_address_state", "version_shipping_address_postal_code", "version_shipping_address_country", "version_shipping_address_phone", "version_customer_id", "version_customer_email", "version_status", "version_amount", "version_currency", "version_access_token", "version_side", "version_order_number", "version_party_id", "version_customer_order_reference", "version_contract_id", "version_sent_at", "version_expires_at", "version_accepted_at", "version_order_date", "version_requested_delivery_date", "version_promised_delivery_date", "version_ship_to_id", "version_bill_to_id", "version_sub_total_amount", "version_tax_amount", "version_total_amount", "version_vendor_id", "version_project_id", "version_delivery_terms", "version_incoterms_location", "version_submitted_at", "version_closed_at", "version_invoice_id", "version_notes", "version_fulfilled_quantity", "version_invoiced_amount", "version_cancellation_date", "version_created_by_id", "version_approved_by_id", "version_approved_at", "version_updated_at", "version_created_at", "created_at", "updated_at" FROM \`_orders_v\`;`)
  await db.run(sql`DROP TABLE \`_orders_v\`;`)
  await db.run(sql`ALTER TABLE \`__new__orders_v\` RENAME TO \`_orders_v\`;`)
  await db.run(sql`CREATE INDEX \`_orders_v_parent_idx\` ON \`_orders_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_uuid_idx\` ON \`_orders_v\` (\`version_uuid\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_tenant_idx\` ON \`_orders_v\` (\`version_tenant_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_customer_idx\` ON \`_orders_v\` (\`version_customer_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_access_token_idx\` ON \`_orders_v\` (\`version_access_token\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_side_idx\` ON \`_orders_v\` (\`version_side\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_order_number_idx\` ON \`_orders_v\` (\`version_order_number\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_party_idx\` ON \`_orders_v\` (\`version_party_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_contract_idx\` ON \`_orders_v\` (\`version_contract_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_ship_to_idx\` ON \`_orders_v\` (\`version_ship_to_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_bill_to_idx\` ON \`_orders_v\` (\`version_bill_to_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_vendor_idx\` ON \`_orders_v\` (\`version_vendor_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_project_idx\` ON \`_orders_v\` (\`version_project_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_invoice_idx\` ON \`_orders_v\` (\`version_invoice_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_created_by_idx\` ON \`_orders_v\` (\`version_created_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_approved_by_idx\` ON \`_orders_v\` (\`version_approved_by_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_updated_at_idx\` ON \`_orders_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_version_version_created_at_idx\` ON \`_orders_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_created_at_idx\` ON \`_orders_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_updated_at_idx\` ON \`_orders_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`__new__orders_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` text(36) NOT NULL,
  	\`path\` text NOT NULL,
  	\`transactions_id\` text(36),
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_orders_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`transactions_id\`) REFERENCES \`transactions\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new__orders_v_rels\`("id", "order", "parent_id", "path", "transactions_id") SELECT "id", "order", "parent_id", "path", "transactions_id" FROM \`_orders_v_rels\`;`)
  await db.run(sql`DROP TABLE \`_orders_v_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new__orders_v_rels\` RENAME TO \`_orders_v_rels\`;`)
  await db.run(sql`CREATE INDEX \`_orders_v_rels_order_idx\` ON \`_orders_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_rels_parent_idx\` ON \`_orders_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_rels_path_idx\` ON \`_orders_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_orders_v_rels_transactions_id_idx\` ON \`_orders_v_rels\` (\`transactions_id\`);`)
    if (payload.db.migrateFieldDelocalized) await payload.db.migrateFieldDelocalized({ slug: 'orders', entity: 'collection', fieldPath: 'approvalChain.comment', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'purchase-orders', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'purchase-requisitions', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'purchase-requisitions', entity: 'collection', fieldPath: 'approvalChain.comment', defaultLocale: 'en', req })
    if (payload.db.migrateFieldLocalized) await payload.db.migrateFieldLocalized({ slug: 'vendor-quotes', entity: 'collection', fieldPath: 'lines.description', defaultLocale: 'en', req })
}
