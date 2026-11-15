import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`messages\` ADD \`email_from\` text;`)
  await db.run(sql`ALTER TABLE \`messages\` ADD \`email_to\` text;`)
  await db.run(sql`ALTER TABLE \`messages\` ADD \`email_message_id\` text;`)
  await db.run(sql`ALTER TABLE \`messages\` ADD \`email_in_reply_to\` text;`)
  await db.run(sql`ALTER TABLE \`messages\` ADD \`email_authenticated\` integer;`)
  await db.run(sql`CREATE INDEX \`messages_email_email_from_idx\` ON \`messages\` (\`email_from\`);`)
  await db.run(sql`CREATE INDEX \`messages_email_email_message_id_idx\` ON \`messages\` (\`email_message_id\`);`)
  await db.run(sql`ALTER TABLE \`tenants\` DROP COLUMN \`resend_api_key\`;`)
  await db.run(sql`ALTER TABLE \`_tenants_v\` DROP COLUMN \`version_resend_api_key\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`messages_email_email_from_idx\`;`)
  await db.run(sql`DROP INDEX \`messages_email_email_message_id_idx\`;`)
  await db.run(sql`ALTER TABLE \`messages\` DROP COLUMN \`email_from\`;`)
  await db.run(sql`ALTER TABLE \`messages\` DROP COLUMN \`email_to\`;`)
  await db.run(sql`ALTER TABLE \`messages\` DROP COLUMN \`email_message_id\`;`)
  await db.run(sql`ALTER TABLE \`messages\` DROP COLUMN \`email_in_reply_to\`;`)
  await db.run(sql`ALTER TABLE \`messages\` DROP COLUMN \`email_authenticated\`;`)
  await db.run(sql`ALTER TABLE \`tenants\` ADD \`resend_api_key\` text;`)
  await db.run(sql`ALTER TABLE \`_tenants_v\` ADD \`version_resend_api_key\` text;`)
}
