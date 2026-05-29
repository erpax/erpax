/**
 * Multi-tenant boundary integration tests — proves tenant sandboxing +
 * full membership-admin stewardship.
 *
 * Each per-tenant admin can CRUD all tenant-scoped documents for that tenant,
 * and cannot access another tenant's rows (posts, categories, media). Uses
 * Local API + `createLocalReq` (same access stack as imports/jobs with
 * `overrideAccess: false`).
 *
 * @standard ISO/IEC-29119:2022 software-testing integration-test-level
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §8.3 information-access-restriction
 * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.4 §7
 */

import { createLocalReq, getPayload, type Payload } from 'payload'

import config from '@/payload.config'
import type { User } from '@/payload-types'
import { describe, it, beforeAll, afterAll, expect } from 'vitest'

/** Minimal valid PNG (1×1). */
const ONE_PX_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
)

function tenantIdFromDoc(doc: { tenant?: unknown }): string | undefined {
  const t = doc.tenant
  if (typeof t === 'string') return t
  if (t && typeof t === 'object' && 'id' in t && typeof (t as { id: unknown }).id === 'string') {
    return (t as { id: string }).id
  }
  return undefined
}

function asAuthUser(doc: User): User & { collection: 'users' } {
  return { ...doc, collection: 'users' }
}

async function reqAsUser(payload: Payload, userId: string) {
  const doc = await payload.findByID({
    collection: 'users',
    id: userId,
    depth: 1,
    overrideAccess: true,
  })
  return createLocalReq({ user: asAuthUser(doc) }, payload)
}

/** Matches `tests/int/tenant.int.spec.ts` — Lexical import path matches Post editor features. */
function seedPostContent(text: string) {
  return {
    root: {
      type: 'root',
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
      children: [
        {
          type: 'paragraph',
          version: 1,
          children: [{ type: 'text', text, version: 1 }],
        },
      ],
    },
  }
}

/** Swallow a rejected cleanup promise (explicit return type so no implicit-any). */
const swallowCleanupError = (): undefined => undefined

describe('Multi-tenant: membership admin sandbox & full tenant stewardship', () => {
  let payload: Payload
  const suffix = Date.now()

  let tenantAId: string
  let tenantBId: string
  let userAId: string
  let userBId: string

  let categoryAId: string
  let categoryBId: string
  let postAId: string
  let postBId: string
  let mediaAId: string
  let mediaBId: string

  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })

    const slugA = `mt-sandbox-a-${suffix}`
    const slugB = `mt-sandbox-b-${suffix}`

    const tenantA = await payload.create({
      collection: 'tenants',
      data: { name: 'Sandbox Tenant A', slug: slugA },
      overrideAccess: true,
    })
    const tenantB = await payload.create({
      collection: 'tenants',
      data: { name: 'Sandbox Tenant B', slug: slugB },
      overrideAccess: true,
    })
    tenantAId = tenantA.id
    tenantBId = tenantB.id

    const userA = await payload.create({
      collection: 'users',
      data: {
        email: `mt-admin-a-${suffix}@sandbox.test`,
        password: 'test',
        name: 'Tenant Admin A',
        roles: ['user'],
        tenants: [{ tenant: tenantAId, roles: ['admin'] }],
      },
      overrideAccess: true,
    })
    const userB = await payload.create({
      collection: 'users',
      data: {
        email: `mt-admin-b-${suffix}@sandbox.test`,
        password: 'test',
        name: 'Tenant Admin B',
        roles: ['user'],
        tenants: [{ tenant: tenantBId, roles: ['admin'] }],
      },
      overrideAccess: true,
    })
    userAId = userA.id
    userBId = userB.id

    const catA = await payload.create({
      collection: 'categories',
      data: {
        title: `Cat A ${suffix}`,
        slug: `cat-a-${suffix}`,
        tenant: tenantAId,
      },
      overrideAccess: true,
    })
    const catB = await payload.create({
      collection: 'categories',
      data: {
        title: `Cat B ${suffix}`,
        slug: `cat-b-${suffix}`,
        tenant: tenantBId,
      },
      overrideAccess: true,
    })
    categoryAId = catA.id
    categoryBId = catB.id

    const mediaA = await payload.create({
      collection: 'media',
      data: { alt: `media-a-${suffix}`, tenant: tenantAId },
      file: {
        data: ONE_PX_PNG,
        mimetype: 'image/png',
        name: `a-${suffix}.png`,
        size: ONE_PX_PNG.length,
      },
      overrideAccess: true,
    })
    const mediaB = await payload.create({
      collection: 'media',
      data: { alt: `media-b-${suffix}`, tenant: tenantBId },
      file: {
        data: ONE_PX_PNG,
        mimetype: 'image/png',
        name: `b-${suffix}.png`,
        size: ONE_PX_PNG.length,
      },
      overrideAccess: true,
    })
    mediaAId = mediaA.id
    mediaBId = mediaB.id

    const postA = await payload.create({
      collection: 'posts',
      data: {
        title: `Post A ${suffix}`,
        slug: `post-a-${suffix}`,
        _status: 'published',
        tenant: tenantAId,
        categories: [categoryAId],
        content: seedPostContent('A'),
      },
      overrideAccess: true,
    })
    const postB = await payload.create({
      collection: 'posts',
      data: {
        title: `Post B ${suffix}`,
        slug: `post-b-${suffix}`,
        _status: 'published',
        tenant: tenantBId,
        categories: [categoryBId],
        content: seedPostContent('B'),
      },
      overrideAccess: true,
    })
    postAId = postA.id
    postBId = postB.id
  })

  afterAll(async () => {
    const orphanWrong = await payload.find({
      collection: 'posts',
      where: { slug: { equals: `wrong-${suffix}` } },
      limit: 1,
      overrideAccess: true,
    })
    if (orphanWrong.docs[0]?.id) {
      await payload
        .delete({
          collection: 'posts',
          id: orphanWrong.docs[0].id,
          overrideAccess: true,
        })
        .catch(swallowCleanupError)
    }

    for (const id of [postAId, postBId]) {
      await payload.delete({ collection: 'posts', id, overrideAccess: true }).catch(swallowCleanupError)
    }
    for (const id of [categoryAId, categoryBId]) {
      await payload
        .delete({ collection: 'categories', id, overrideAccess: true })
        .catch(swallowCleanupError)
    }
    for (const id of [mediaAId, mediaBId]) {
      await payload.delete({ collection: 'media', id, overrideAccess: true }).catch(swallowCleanupError)
    }
    for (const id of [userAId, userBId]) {
      await payload.delete({ collection: 'users', id, overrideAccess: true }).catch(swallowCleanupError)
    }
    for (const id of [tenantAId, tenantBId]) {
      await payload.delete({ collection: 'tenants', id, overrideAccess: true }).catch(swallowCleanupError)
    }

    if (payload?.db?.destroy) {
      await payload.db.destroy()
    }
  })

  it('membership admin A sees and manages only tenant A posts', async () => {
    const req = await reqAsUser(payload, userAId)

    const list = await payload.find({
      collection: 'posts',
      req,
      limit: 100,
      overrideAccess: false,
    })
    const tenantsSeen = new Set(
      list.docs.map((d) => tenantIdFromDoc(d)).filter((x): x is string => typeof x === 'string'),
    )
    expect(tenantsSeen.has(tenantAId)).toBe(true)
    expect(tenantsSeen.has(tenantBId)).toBe(false)
    expect(list.docs.some((d) => d.id === postAId)).toBe(true)
    expect(list.docs.some((d) => d.id === postBId)).toBe(false)

    const mine = await payload.findByID({
      collection: 'posts',
      id: postAId,
      req,
      overrideAccess: false,
    })
    expect(mine.id).toBe(postAId)

    await expect(
      payload.findByID({
        collection: 'posts',
        id: postBId,
        req,
        overrideAccess: false,
      }),
    ).rejects.toThrow()

    const updated = await payload.update({
      collection: 'posts',
      id: postAId,
      req,
      overrideAccess: false,
      data: {
        title: `Post A updated ${suffix}`,
      },
    })
    expect(updated.title).toBeDefined()

    await expect(
      payload.update({
        collection: 'posts',
        id: postBId,
        req,
        overrideAccess: false,
        data: { title: 'hack' },
      }),
    ).rejects.toThrow()
  })

  it('membership admin A can create posts only for their tenant (explicit tenant)', async () => {
    const req = await reqAsUser(payload, userAId)
    const slug = `post-new-a-${suffix}`

    const created = await payload.create({
      collection: 'posts',
      req,
      overrideAccess: false,
      data: {
        title: `New ${suffix}`,
        slug,
        _status: 'published',
        tenant: tenantAId,
        content: seedPostContent('new'),
      },
    })

    expect(tenantIdFromDoc(created)).toBe(tenantAId)

    await payload.delete({
      collection: 'posts',
      id: created.id,
      req,
      overrideAccess: false,
    })
  })

  it('membership admin A cannot create posts assigned to another tenant', async () => {
    const req = await reqAsUser(payload, userAId)
    await expect(
      payload.create({
        collection: 'posts',
        req,
        overrideAccess: false,
        data: {
          title: 'wrong tenant',
          slug: `wrong-${suffix}`,
          _status: 'published',
          tenant: tenantBId,
          content: seedPostContent('x'),
        },
      }),
    ).rejects.toThrow()
  })

  it('membership admin A sees only tenant A categories and can update them', async () => {
    const req = await reqAsUser(payload, userAId)

    const list = await payload.find({
      collection: 'categories',
      req,
      limit: 100,
      overrideAccess: false,
    })
    expect(list.docs.some((d) => d.id === categoryAId)).toBe(true)
    expect(list.docs.some((d) => d.id === categoryBId)).toBe(false)

    await payload.update({
      collection: 'categories',
      id: categoryAId,
      req,
      overrideAccess: false,
      data: { title: `Cat A updated ${suffix}` },
    })

    await expect(
      payload.update({
        collection: 'categories',
        id: categoryBId,
        req,
        overrideAccess: false,
        data: { title: 'hack' },
      }),
    ).rejects.toThrow()
  })

  it('membership admin A sees only tenant A media', async () => {
    const req = await reqAsUser(payload, userAId)

    const list = await payload.find({
      collection: 'media',
      req,
      limit: 100,
      overrideAccess: false,
    })
    expect(list.docs.some((d) => d.id === mediaAId)).toBe(true)
    expect(list.docs.some((d) => d.id === mediaBId)).toBe(false)

    await expect(
      payload.findByID({
        collection: 'media',
        id: mediaBId,
        req,
        overrideAccess: false,
      }),
    ).rejects.toThrow()
  })

  it('membership admin B is sandboxed to tenant B (mirror)', async () => {
    const req = await reqAsUser(payload, userBId)

    const posts = await payload.find({
      collection: 'posts',
      req,
      limit: 100,
      overrideAccess: false,
    })
    expect(posts.docs.some((d) => d.id === postBId)).toBe(true)
    expect(posts.docs.some((d) => d.id === postAId)).toBe(false)

    await expect(
      payload.findByID({ collection: 'posts', id: postAId, req, overrideAccess: false }),
    ).rejects.toThrow()
  })
})
