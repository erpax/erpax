/**
 * Import a Blogger `feed.atom` into Payload: upsert categories from labels, create posts
 * with tenant, localized bg/en fields, blogger:status, hero URL → media hook, remote images in Lexical.
 *
 * Requires local DB (Wrangler / `.wrangler` D1) and env from `.env` / `.env.local`.
 *
 * Usage:
 *   pnpm exec tsx src/services/ingest/blogger-import.ts ./feed.atom --tenant 1 --author-id 2
 *
 * Options:
 *   --tenant <id>          Required. Multi-tenant id on posts/categories/media.
 *   --author-id <id>       Required. Users id for authors[].
 *   --dry-run              Parse only; print counts.
 *   --skip-existing        Skip posts whose slug already exists for this tenant (default true).
 *   --no-skip-existing     Create duplicates if slug exists (usually fails).
 *   Plus all options supported by convertBloggerAtomXml via passthrough:
 *   --reverse --limit --slug-prefix --omit-images --draft --flat ...
 */

import fs from 'node:fs'
import path from 'node:path'

import { createLocalReq, getPayload } from 'payload'

import configPromise from '@payload-config'

import {
  convertBloggerAtomXml,
  slugifyUnicode,
  type ConvertBloggerAtomOptions,
} from '@/ingest/blogger-to-json'

type CliOpts = ConvertBloggerAtomOptions & {
  feed?: string
  tenant?: number
  authorId?: number
  dryRun?: boolean
  skipExisting?: boolean
}

function parseArgs(argv: string[]): CliOpts {
  const positional: string[] = []
  const o: CliOpts = {
    skipExisting: true,
  }

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--tenant') {
      o.tenant = Number(argv[++i])
      continue
    }
    if (a === '--author-id') {
      o.authorId = Number(argv[++i])
      continue
    }
    if (a === '--dry-run') {
      o.dryRun = true
      continue
    }
    if (a === '--skip-existing') {
      o.skipExisting = true
      continue
    }
    if (a === '--no-skip-existing') {
      o.skipExisting = false
      continue
    }
    if (a === '--reverse') {
      o.reverse = true
      continue
    }
    if (a === '--limit') {
      o.limit = Number(argv[++i])
      continue
    }
    if (a === '--slug-prefix') {
      o.slugPrefix = argv[++i]
      continue
    }
    if (a === '--omit-images') {
      o.omitImages = true
      continue
    }
    if (a === '--draft') {
      o.forceDraft = true
      continue
    }
    if (a === '--flat') {
      o.flat = true
      continue
    }
    if (a === '--seo-meta-title') {
      o.seoMetaTitle = true
      continue
    }
    if (a.startsWith('-')) {
      console.error(`Unknown option: ${a}`)
      process.exit(1)
    }
    positional.push(a)
  }

  o.feed = positional[0]
  return o
}

async function getOrCreateCategory(
  payload: Awaited<ReturnType<typeof getPayload>>,
  tenantId: number,
  label: string,
): Promise<number> {
  const slug = slugifyUnicode(label)
  const found = await payload.find({
    collection: 'categories',
    limit: 1,
    overrideAccess: true,
    where: {
      and: [{ tenant: { equals: tenantId } }, { slug: { equals: slug } }],
    },
  })

  const existing = found.docs[0]
  if (existing && typeof existing.id === 'number') {
    return existing.id
  }

  const created = await payload.create({
    collection: 'categories',
    data: {
      slug,
      tenant: tenantId as unknown as string,
      title: label,
    },
    overrideAccess: true,
  })

  return typeof created.id === 'number' ? created.id : Number(created.id)
}

async function postExistsForSlug(
  payload: Awaited<ReturnType<typeof getPayload>>,
  tenantId: number,
  slug: string,
): Promise<boolean> {
  const r = await payload.find({
    collection: 'posts',
    limit: 1,
    overrideAccess: true,
    where: {
      and: [{ tenant: { equals: tenantId } }, { slug: { equals: slug } }],
    },
  })
  return r.docs.length > 0
}

async function main() {
  const opts = parseArgs(process.argv.slice(2))
  const { feed, tenant, authorId, dryRun, skipExisting } = opts

  if (!feed) {
    console.error(`Usage: pnpm exec tsx src/services/ingest/blogger-import.ts <feed.atom> --tenant <id> --author-id <id>

Creates categories from Blogger labels and posts with localized bg/en content (unless --flat).

Environment: load Payload + D1 (same as \`pnpm payload\` / dev server).`)
    process.exit(1)
  }

  if (typeof tenant !== 'number' || Number.isNaN(tenant)) {
    console.error('Missing or invalid --tenant <number>')
    process.exit(1)
  }

  if (typeof authorId !== 'number' || Number.isNaN(authorId)) {
    console.error('Missing or invalid --author-id <number>')
    process.exit(1)
  }

  const feedPath = path.resolve(process.cwd(), feed)
  if (!fs.existsSync(feedPath)) {
    console.error(`File not found: ${feedPath}`)
    process.exit(1)
  }

  const xml = fs.readFileSync(feedPath, 'utf8')

  const {
    posts,
    labelRows,
    heroRows,
  } = convertBloggerAtomXml(xml, {
    ...opts,
    tenant,
    authorId,
    forceDraft: opts.forceDraft,
    respectBloggerStatus: opts.respectBloggerStatus ?? true,
    flat: opts.flat,
    omitImages: opts.omitImages,
    seoMetaTitle: opts.seoMetaTitle,
    slugPrefix: opts.slugPrefix,
    reverse: opts.reverse,
    limit: opts.limit,
  })

  const uniqueLabels = new Set<string>()
  for (const row of labelRows) {
    for (const l of row.labels) uniqueLabels.add(l)
  }

  console.error(
    `Parsed ${posts.length} post(s), ${uniqueLabels.size} unique label(s), ${heroRows.filter((h) => h.url).length} hero URL(s).`,
  )

  if (dryRun) {
    console.error('Dry run — no database writes.')
    process.exit(0)
  }

  const config = await configPromise
  const payload = await getPayload({ config })
  const req = await createLocalReq({}, payload)

  const labelToId = new Map<string, number>()
  for (const label of uniqueLabels) {
    const id = await getOrCreateCategory(payload, tenant, label)
    labelToId.set(label, id)
    console.error(`Category: "${label}" → id ${id}`)
  }

  let created = 0
  let skipped = 0

  for (const post of posts) {
    if (skipExisting && (await postExistsForSlug(payload, tenant, post.slug))) {
      skipped++
      console.error(`Skip existing slug: ${post.slug}`)
      continue
    }

    const slug = post.slug
    const row = labelRows.find((r) => r.slug === slug)
    const categoryIds =
      row?.labels.map((l) => labelToId.get(l)).filter((id): id is number => typeof id === 'number') ?? []

    const data: Record<string, unknown> = {
      ...post,
      categories: categoryIds.length ? categoryIds : undefined,
      tenant,
      authors: [authorId],
    }

    await payload.create({
      collection: 'posts',
      // Localized title/content + hero URL strings are valid at runtime; generated Post type is flattened.
      data: data as never,
      req,
      overrideAccess: true,
    })

    created++
    console.error(`Created post: ${post.slug}`)
  }

  console.error(`Done. Created ${created}, skipped ${skipped}.`)
  if (payload.db?.destroy) {
    await payload.db.destroy()
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
