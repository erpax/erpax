import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

/**
 * A binding read by a name wrangler does not declare is `undefined` at runtime, and every reader
 * here guards with an early return — so the failure is SILENT. `analyticsWrite` sank every gl / api
 * / jobs data point into `env.ANALYTICS`, which is not declared, and returned. That is the SOX §404
 * monitoring source writing nothing, in production, with no error.
 *
 * `EMAIL_SEND` drifted the same way against the declared `EMAIL_SENDER`, and two `as never` casts
 * are what let it past the compiler.
 *
 * This reads the live wrangler.jsonc, so the next rename fails here instead of in production.
 */
const ROOT = process.cwd()
const WRANGLER = readFileSync(join(ROOT, 'wrangler.jsonc'), 'utf8')
const SOURCE = readFileSync(join(ROOT, 'src/cloudflare/index.ts'), 'utf8')

/** Binding names wrangler declares, from every block that carries a `name` or `binding` key. */
function declaredNames(text: string): Set<string> {
  const out = new Set<string>()
  for (const m of text.matchAll(/"(?:name|binding)"\s*:\s*"([A-Z][A-Z0-9_]*)"/g)) out.add(m[1]!)
  return out
}

describe('cloudflare — every binding READ is a binding wrangler DECLARES', () => {
  const declared = declaredNames(WRANGLER)

  it('the analytics datasets each resolve to a declared binding', () => {
    for (const name of ['ANALYTICS_AI', 'ANALYTICS_GL', 'ANALYTICS_API', 'ANALYTICS_JOBS']) {
      expect(declared.has(name)).toBe(true)
      expect(SOURCE).toContain(`env.${name}`)
    }
  })

  it('the email binding is the declared one — EMAIL_SEND is not a thing', () => {
    expect(declared.has('EMAIL_SENDER')).toBe(true)
    expect(declared.has('EMAIL_SEND')).toBe(false)
    expect(SOURCE).toContain('ctx.env.EMAIL_SENDER')
    expect(SOURCE).not.toMatch(/env\.EMAIL_SEND\b/)
  })

  it('NO binding-name cast hides a name from the compiler', () => {
    // the two casts on 'EMAIL_SEND' are exactly why the drift typechecked for as long as it did.
    // Scoped to the binding argument: an unrelated `as never` elsewhere is not this defect, and a
    // regex that flagged it would be the false positive this corpus keeps paying for.
    expect(SOURCE).not.toMatch(/binding: '[A-Z][A-Z0-9_]*' as never/)
    expect(SOURCE).not.toMatch(/auditBindingCall\(ctx, '[A-Z][A-Z0-9_]*' as never/)
  })

  it('the legacy ANALYTICS alias is the FALLBACK, never the route', () => {
    // it is undeclared, so routing to it is the silent no-op this test exists to prevent
    expect(declared.has('ANALYTICS')).toBe(false)
    expect(SOURCE).toMatch(/ANALYTICS_SINKS\[dataset\]\(ctx\.env\) \?\? ctx\.env\.ANALYTICS/)
  })
})
