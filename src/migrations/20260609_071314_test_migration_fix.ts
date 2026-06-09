import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`bookable_resources\` ADD \`medical_modality\` text;`)
  await db.run(sql`ALTER TABLE \`_bookable_resources_v\` ADD \`version_medical_modality\` text;`)
  await db.run(sql`ALTER TABLE \`chat\` ADD \`emitted_at\` text;`)
  await db.run(sql`ALTER TABLE \`_chat_v\` ADD \`version_emitted_at\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`bookable_resources\` DROP COLUMN \`medical_modality\`;`)
  await db.run(sql`ALTER TABLE \`_bookable_resources_v\` DROP COLUMN \`version_medical_modality\`;`)
  await db.run(sql`ALTER TABLE \`chat\` DROP COLUMN \`emitted_at\`;`)
  await db.run(sql`ALTER TABLE \`_chat_v\` DROP COLUMN \`version_emitted_at\`;`)
}
