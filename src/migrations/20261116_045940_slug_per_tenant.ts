import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`categories_slug_idx\`;`)
  await db.run(sql`CREATE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`DROP INDEX \`pages_slug_idx\`;`)
  await db.run(sql`CREATE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`DROP INDEX \`posts_slug_idx\`;`)
  await db.run(sql`CREATE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`categories_slug_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`categories_slug_idx\` ON \`categories\` (\`slug\`);`)
  await db.run(sql`DROP INDEX \`pages_slug_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`pages_slug_idx\` ON \`pages\` (\`slug\`);`)
  await db.run(sql`DROP INDEX \`posts_slug_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
}
