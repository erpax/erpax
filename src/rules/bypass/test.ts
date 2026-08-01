import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'

import { assertNoUnauthenticatedBypass, bypassSites, unauthenticatedBypasses } from './index'

const cwd = process.cwd()

describe('rules/bypass — access control is on by default on a request-reachable path', () => {
  it('THE MEASUREMENT: one handler bypasses, and it authenticates first', () => {
    const sites = bypassSites(cwd)
    expect(sites.length).toBeGreaterThan(0) // the pattern is real and in use
    const subs = sites.find((s) => s.file.includes('subscriptions/create'))
    expect(subs).toBeDefined()
    expect(subs!.bypasses).toBeGreaterThan(1)
    expect(subs!.authenticates).toBe(true)
  })

  it('the baseline is a THEOREM at zero, not a ratchet toward it', () => {
    // there is no acceptable number of handlers that disable access control without
    // authenticating, so there is no threshold to raise as the corpus grows
    expect(unauthenticatedBypasses(cwd)).toEqual([])
    expect(() => assertNoUnauthenticatedBypass(cwd)).not.toThrow()
  })

  it('fails CLOSED the moment one appears — the error names the file, not a count', () => {
    expect(() => assertNoUnauthenticatedBypass(cwd, -1)).toThrow(/disable access control without calling payload\.auth/)
  })

  it('only REQUEST-REACHABLE paths are judged — a hook or a seed is not routed', () => {
    // 138 overrideAccess:true sites exist corpus-wide; the vast majority are hooks, seeds and
    // system jobs that genuinely have no user in scope. Counting them would make the gate noise,
    // and a gate that cries wolf is one nobody reads.
    for (const s of bypassSites(cwd)) expect(s.file.startsWith('src/app')).toBe(true)
  })

  it('a bypass named only in a COMMENT is prose, never a use', () => {
    // this atom's own docstring contains the literal pattern. If comments counted, the gate would
    // flag the file that defines it — the false positive that already cost rules/confine a wrong
    // measurement, and prose about a law is not a breach of it.
    expect(bypassSites(cwd).some((s) => s.file.includes('rules/bypass'))).toBe(false)
  })
})

describe('rules/bypass — judged by the constitution', () => {
  const change: Change = {
    atom: 'rules/bypass',
    dualities: [
      { builds: 'bypassSites', breaks: 'a bypass in a comment is not counted' },
      { builds: 'unauthenticatedBypasses', breaks: 'an authenticated handler is not a violation' },
      { builds: 'assertNoUnauthenticatedBypass', breaks: 'fails closed, naming the file' },
    ],
    anchors: ['ISO/IEC 27001 A.5.23', 'ISO/IEC 25010:2023 §5.4'],
    claims: [
      {
        text: 'this proves access control cannot be bypassed',
        boundary:
          'it proves a request-reachable handler that disables access control also CALLS ' +
          'payload.auth somewhere in the same file — never that the auth guards that specific ' +
          'call, and never that the derived scope is correct. It closes the silent case (bypass ' +
          'with no authentication at all); a wrong scope after a real auth is a per-case review',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [3, 3] },
      { name: 'reachable⊕gated', ring: [1, 1] },
    ],
    served: [{ result: 'the unauthenticated-bypass list', recompute: 'src/rules/bypass/index.ts' }],
    postings: [
      { debit: 'route/bypass', credit: 'handler/auth', amount: 1 },
      { debit: 'handler/auth', credit: 'route/bypass', amount: 1 },
    ],
    edges: [
      { from: 'bypass', to: 'rules' },
      { from: 'rules', to: 'bypass' },
    ],
    quantities: [
      { name: 'request-reachable bypass files', value: 1, derivation: 'src/rules/bypass/index.ts' },
      { name: 'unauthenticated bypasses', value: 0, derivation: 'src/rules/bypass/index.ts' },
    ],
    keepers: [],
    seed: ['src/rules/bypass/index.ts'],
  }

  it('is SEALED under all nine laws', () => {
    const v = judge(change)
    expect(v.verdicts.filter((x) => !x.holds)).toEqual([])
    expect(v.sealed).toBe(true)
  })
})
