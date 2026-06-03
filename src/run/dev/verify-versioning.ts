#!/usr/bin/env tsx
/**
 * run/dev verify-versioning — prove "all is versioned" BY USAGE on the
 * regenerated schema.
 *
 * Boots Payload (Local API) and confirms the versionsPlugin gave NATIVE Payload
 * versioning to a previously-unversioned business collection (tenants) while the
 * append-only log stayed excluded (audit-events), then exercises the native
 * version lifecycle on a real doc: create → update → list versions. Recording
 * is the substance of "all is versioned" — the history that feeds the
 * akashic/analytics/tamper-cost faces of the versions cross.
 *
 * Restore (`reify`) is reconciled with content-uuid tamper-proofing: the Law-8
 * beforeChange hook detects req.context.isRestoringVersion and re-stamps a uuid
 * from the restored snapshot instead of rejecting the replayed prior uuid — so
 * restoreVersion works on tamper-proof collections, not just Pages/Posts.
 *
 *   pnpm exec tsx src/run/dev/verify-versioning.ts
 */
const { createRequire } = await import('node:module')
;(globalThis as { require?: unknown }).require ??= createRequire(import.meta.url)
const { config: loadEnv } = await import('dotenv')
loadEnv()
process.env.PAYLOAD_DISABLE_ADMIN = 'true'
process.env.PAYLOAD_ENABLE_GRAPHQL ??= 'false'
process.env.PAYLOAD_DEV_PUSH ??= 'false'

const { getPayload } = await import('payload')
const payload = await getPayload({ config: await (await import('@payload-config')).default })

let ok = true
const check = (pass: boolean, msg: string): void => {
  if (!pass) ok = false
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${msg}`)
}

// 1) Config — the plugin versioned a business collection that had none before,
//    and left the append-only log excluded.
const cfg = (slug: string) => payload.config.collections.find((c) => c.slug === slug)
check(Boolean(cfg('tenants')?.versions), 'tenants is natively versioned (versionsPlugin enabled it)')
check(!cfg('audit-events')?.versions, 'audit-events excluded (append-only — no version-of-history)')

// 2) Recording — the native version lifecycle on a real doc (the core of "all
//    is versioned": every change becomes a queryable, content-addressed leaf).
const SLUG = 'versioning-test'
const existing = await payload.find({
  collection: 'tenants',
  where: { slug: { equals: SLUG } },
  limit: 1,
  overrideAccess: true,
})
const tenantId =
  existing.docs[0]?.id ??
  (
    await payload.create({
      collection: 'tenants',
      data: { name: 'Versioning Test', slug: SLUG },
      overrideAccess: true,
    })
  ).id
// An update with changed content creates a fresh native version (re-runnable —
// prior versions accumulate, so the recording assertion holds on every run).
await payload.update({
  collection: 'tenants',
  id: tenantId,
  data: { name: `Versioning Test (rev ${existing.totalDocs})` },
  overrideAccess: true,
})

const versions = await payload.findVersions({
  collection: 'tenants',
  where: { parent: { equals: tenantId } },
  sort: 'createdAt',
  overrideAccess: true,
})
check(versions.totalDocs >= 1, `native version rows recorded for tenants: ${versions.totalDocs}`)
check(
  versions.docs.length > 0 && Boolean((versions.docs[0] as { version?: unknown }).version),
  'each version row carries the full content snapshot (queryable history)',
)

// 3) Restore (`reify`) — now asserted: it works on a tamper-proof collection
//    (the content-uuid↔restore reconciliation), reverting the doc to the
//    chosen snapshot.
const v = versions.docs[0] as { id: string; version?: { name?: string } } | undefined
if (v) {
  const restored = (await payload.restoreVersion({
    collection: 'tenants',
    id: v.id,
    overrideAccess: true,
  })) as { id?: unknown }
  check(Boolean(restored?.id), 'restoreVersion succeeded on a tamper-proof collection (reify, now universal)')
  const after = await payload.findByID({ collection: 'tenants', id: tenantId, overrideAccess: true })
  check(
    after.name === v.version?.name,
    `restore reverted the doc to the chosen snapshot (name="${String(v.version?.name)}", got "${String(after.name)}")`,
  )
  // The deepest guarantee: the restored row is Law-8 CONSISTENT — its stored
  // uuid equals hash(its content). (tenants have no parent tenant ⇒ the stamp
  // resolves tenantId to 'unknown'.)
  const { verifyContentUuid } = await import('../../services/integrity')
  const verdict = verifyContentUuid(
    after as unknown as Record<string, unknown> & { uuid?: string },
    'unknown',
  )
  check(
    verdict.ok,
    verdict.ok
      ? 'restored doc is Law-8 consistent (uuid == hash(content))'
      : `restored doc FAILED Law-8 verify (expected ${verdict.expected}, actual ${String(verdict.actual)})`,
  )
} else {
  check(false, 'expected at least one version row to restore')
}

console.log(
  ok
    ? '\n[verify-versioning] all is versioned — native recording AND restore confirmed by usage'
    : '\n[verify-versioning] FAILED',
)
process.exit(ok ? 0 : 1)
