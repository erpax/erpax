/**
 * Seed endpoint — populates a fresh tenant with example pages, posts, media.
 *
 * Per-seed data files (`home.ts`, `image-1.ts`, etc.) are static fixtures and
 * inherit standards from this barrel.
 *
 * @rfc 9110 http-semantics seed-endpoint
 * @standard ISO-8601-1:2019 date-time
 * @standard BCP-47 language-tag locale-bundled-fixtures
 * @audit ISO-19011:2018 audit-trail seed-runs
 * @see docs/STANDARDS.md §3
 */

import type { CollectionSlug, Payload, PayloadRequest, File } from 'payload'

import { codedFromRegistry, ERR } from '@/utilities/error'
import { contactForm as contactFormData } from './contact/form'
import { contact as contactPageData } from './contact/page'
import { home } from './home'
export { homeStatic } from './home-static'
export { SEED_COLLECTION_SLUGS, SEED_GLOBAL_SLUGS } from './slugs'
import { SEED_COLLECTION_SLUGS, SEED_GLOBAL_SLUGS } from './slugs'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { post1 } from './post/1'
import { post2 } from './post/2'
import { post3 } from './post/3'

const collections = [...SEED_COLLECTION_SLUGS]
const globals = [...SEED_GLOBAL_SLUGS]

const categories = ['Technology', 'News', 'Finance', 'Design', 'Software', 'Engineering']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // erpax is multi-tenant: the demo content belongs to one tenant, found or created here, and every
  // tenant-scoped document the seed writes is placed in it. Clearing touches that tenant only.
  const tenant = await demoTenant(payload, req)
  const scoped = (collection: CollectionSlug): boolean =>
    payload.collections[collection].config.fields.some((field) => 'name' in field && field.name === 'tenant')
  /** payload.create, with the demo tenant on every tenant-scoped document. */
  const create = ((args: { collection: CollectionSlug; data?: Record<string, unknown> }) =>
    payload.create({ ...args, data: scoped(args.collection) ? { ...args.data, tenant: tenant.id } : args.data } as never)) as typeof payload.create

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not
  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all(
    globals.map((global) =>
      payload.updateGlobal({
        slug: global,
        data: {
          navItems: [],
        },
        depth: 0,
        context: {
          disableRevalidate: true,
        },
        overrideAccess: true,
      }),
    ),
  )

  // the demo tenant's documents only: another tenant's content, and the shared search index, are untouched
  await Promise.all(
    collections.filter(scoped).map((collection) => payload.db.deleteMany({ collection, req, where: { tenant: { equals: tenant.id } } })),
  )

  await Promise.all(
    collections
      .filter((collection) => scoped(collection) && Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: { 'version.tenant': { equals: tenant.id } } })),
  )

  // the posts are credited to the super-admin running the seed: no demo account, no known password
  const author = req.user as never

  payload.logger.info(`— Seeding media...`)

  const [image1Buffer, image2Buffer, image3Buffer, hero1Buffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post1.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post3.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
    ),
  ])

  const [image1Doc, image2Doc, image3Doc, imageHomeDoc] = await Promise.all([
    create({
      collection: 'media',
      data: image1,
      file: image1Buffer,
      overrideAccess: true,
    }),
    create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
      overrideAccess: true,
    }),
    create({
      collection: 'media',
      data: image2,
      file: image3Buffer,
      overrideAccess: true,
    }),
    create({
      collection: 'media',
      data: imageHero1,
      file: hero1Buffer,
      overrideAccess: true,
    }),
    ...categories.map((category) =>
      create({
        collection: 'categories',
        data: {
          title: category,
          slug: category,
        },
        overrideAccess: true,
      }),
    ),
  ])

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const post1Doc = await create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post1({ heroImage: image1Doc, blockImage: image2Doc, author }),
    overrideAccess: true,
  })

  const post2Doc = await create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post2({ heroImage: image2Doc, blockImage: image3Doc, author }),
    overrideAccess: true,
  })

  const post3Doc = await create({
    collection: 'posts',
    depth: 0,
    context: {
      disableRevalidate: true,
    },
    data: post3({ heroImage: image3Doc, blockImage: image1Doc, author }),
    overrideAccess: true,
  })

  // update each post with related posts
  await payload.update({
    id: post1Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post2Doc.id, post3Doc.id],
    },
    overrideAccess: true,
  })
  await payload.update({
    id: post2Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post3Doc.id],
    },
    overrideAccess: true,
  })
  await payload.update({
    id: post3Doc.id,
    collection: 'posts',
    data: {
      relatedPosts: [post1Doc.id, post2Doc.id],
    },
    overrideAccess: true,
  })

  payload.logger.info(`— Seeding contact form...`)

  const contactForm = await create({
    collection: 'forms',
    depth: 0,
    data: contactFormData,
    overrideAccess: true,
  })

  payload.logger.info(`— Seeding pages...`)

  const [_, contactPage] = await Promise.all([
    create({
      collection: 'pages',
      depth: 0,
      data: home({ heroImage: imageHomeDoc, metaImage: image2Doc }),
      overrideAccess: true,
    }),
    create({
      collection: 'pages',
      depth: 0,
      data: contactPageData({ contactForm: contactForm }),
      overrideAccess: true,
    }),
  ])

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Posts',
              url: '/posts',
            },
          },
          {
            link: {
              type: 'reference',
              label: 'Contact',
              reference: {
                relationTo: 'pages',
                value: contactPage.id,
              },
            },
          },
        ],
      },
      overrideAccess: true,
    }),
    payload.updateGlobal({
      slug: 'footer',
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Admin',
              url: '/admin',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Source Code',
              newTab: true,
              url: 'https://github.com/payloadcms/payload/tree/main/templates/website',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Payload',
              newTab: true,
              url: 'https://payloadcms.com/',
            },
          },
        ],
      },
      overrideAccess: true,
    }),
  ])

  payload.logger.info('Seeded database successfully!')
}

/** The demo tenant: found by its slug, or created. */
async function demoTenant(payload: Payload, req: PayloadRequest): Promise<{ id: string | number }> {
  const found = await payload.find({ collection: 'tenants', where: { slug: { equals: 'demo' } }, limit: 1, depth: 0, overrideAccess: true, req })
  if (found.docs[0]) return found.docs[0] as { id: string | number }
  return (await payload.create({ collection: 'tenants', data: { name: 'Demo', slug: 'demo' } as never, overrideAccess: true, req })) as { id: string | number }
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw codedFromRegistry(ERR.INTERNAL_SEED_REMOTE_FETCH, new Error(`status ${res.status}`))
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}

export * from './erpax-product-pages'
