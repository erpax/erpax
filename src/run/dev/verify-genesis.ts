#!/usr/bin/env tsx
/**
 * run/dev verify-genesis — prove the computed super-admin derivation BY USAGE,
 * by exercising isSuperAdmin directly (pure fn + getUserTenantIDs; no DB boot).
 * "If tenant is empty and role admin, it is super-admin by architecture."
 *
 *   pnpm exec tsx src/run/dev/verify-genesis.ts
 */
export {} // module marker — enables top-level `await` under tsc (TS1375)
const { isSuperAdmin } = await import('@/access/isSuperAdmin')

const cases = [
  { label: 'admin + empty tenant scope (genesis / platform owner)', user: { roles: ['admin'], tenants: [] }, expect: true },
  { label: 'admin + bound to a tenant (tenant-admin, not super)', user: { roles: ['admin'], tenants: [{ tenant: 't1', roles: ['admin'] }] }, expect: false },
  { label: 'plain user + empty scope (not admin)', user: { roles: ['user'], tenants: [] }, expect: false },
  { label: 'legacy super-admin role only (no admin role) — must NOT count', user: { roles: ['super-admin'], tenants: [] }, expect: false },
  { label: 'no roles', user: { roles: [], tenants: [] }, expect: false },
]

let ok = true
for (const c of cases) {
  const got = isSuperAdmin(c.user)
  const pass = got === c.expect
  if (!pass) ok = false
  console.log(`${pass ? 'PASS' : 'FAIL'}  isSuperAdmin=${String(got).padEnd(5)} (expect ${c.expect})  ${c.label}`)
}
console.log(ok ? '\n[verify-genesis] derivation OK — super-admin = admin + empty tenant scope' : '\n[verify-genesis] derivation FAILED')
process.exit(ok ? 0 : 1)
