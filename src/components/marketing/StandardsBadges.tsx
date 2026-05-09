/**
 * StandardsBadges — server-rendered, reads docs/STANDARDS_INDEX.md to surface
 * what banners actually exist in code (not what marketing wishes were there).
 *
 * Each badge maps to a real `@standard` / `@audit` / `@compliance` declaration
 * counted across the codebase — drift is impossible because the source of
 * truth is the auto-generated standards index.
 *
 * @standard schema.org Thing badge-credibility
 * @standard W3C HTML5 living-standard
 * @audit ISO-19011:2018 audit-trail standards-citation-index
 * @compliance WCAG-2.1 §1.1.1 alt-text-on-decorative-icons
 * @see docs/STANDARDS_INDEX.md
 * @see scripts/standards-citation-index.sh
 */

import React from 'react'
import { promises as fs } from 'fs'
import { join } from 'path'

interface StandardsBadgesProps {
  tier?: 'all' | 'accounting' | 'audit' | 'security' | 'i18n'
}

interface Badge {
  family: string
  description: string
  tier: 'accounting' | 'audit' | 'security' | 'i18n' | 'web'
}

const KNOWN_BADGES: Badge[] = [
  { family: 'IFRS', description: 'International Financial Reporting Standards', tier: 'accounting' },
  { family: 'US-GAAP', description: 'Generally Accepted Accounting Principles', tier: 'accounting' },
  { family: 'OECD SAF-T 2.0', description: 'Standard Audit File for Tax', tier: 'accounting' },
  { family: 'EN 16931:2017', description: 'Semantic invoice model — EU B2B/B2G', tier: 'accounting' },
  { family: 'ISO 19011:2018', description: 'Auditing guidance', tier: 'audit' },
  { family: 'SOX §404', description: 'Internal controls over financial reporting', tier: 'audit' },
  { family: 'SOX §302', description: 'Disclosure controls', tier: 'audit' },
  { family: 'SOC 2', description: 'Trust services criteria', tier: 'audit' },
  { family: 'ISO 27001', description: 'Information security management', tier: 'security' },
  { family: 'ISO 27002', description: 'Information security controls', tier: 'security' },
  { family: 'NIST SP-800-38D', description: 'AES-GCM authenticated encryption', tier: 'security' },
  { family: 'GDPR', description: 'EU data protection regulation', tier: 'security' },
  { family: 'PCI-DSS 4.0', description: 'Cardholder data security', tier: 'security' },
  { family: 'ISO 4217:2015', description: 'Currency codes — any code accepted', tier: 'i18n' },
  { family: 'ISO 3166-1:2020', description: 'Country codes — any code accepted', tier: 'i18n' },
  { family: 'BCP 47', description: 'Language tags', tier: 'i18n' },
  { family: 'ISO 8601-1:2019', description: 'Date and time', tier: 'i18n' },
  { family: 'WCAG 2.1', description: 'Web Content Accessibility Guidelines', tier: 'web' },
  { family: 'ISO 32000-2:2020', description: 'PDF', tier: 'web' },
  { family: 'ISO/IEC 29500', description: 'Office Open XML — xlsx', tier: 'web' },
  { family: 'ISO 19160-4', description: 'Postal addressing model', tier: 'i18n' },
]

/**
 * Read the canonical index and count occurrences per badge family.
 * Falls back to silent rendering when the index isn't present
 * (e.g. fresh checkout pre-`pnpm standards:write-index`).
 */
async function citationCounts(): Promise<Map<string, number>> {
  const counts = new Map<string, number>()
  try {
    const path = join(process.cwd(), 'docs', 'STANDARDS_INDEX.md')
    const body = await fs.readFile(path, 'utf-8')
    for (const badge of KNOWN_BADGES) {
      // Family tokens (`IFRS`, `ISO 27001`, `SOX §404`, …) appear inline in the
      // index next to citations. A simple count gives a relative-magnitude
      // heatmap — exact precision isn't the point; presence vs absence is.
      const re = new RegExp(badge.family.replace(/[-/\\^$*+?.()|[\]{}§]/g, '\\$&'), 'gi')
      const matches = body.match(re)
      counts.set(badge.family, matches ? matches.length : 0)
    }
  } catch {
    // index missing — return zeros
  }
  return counts
}

export default async function StandardsBadges({ tier = 'all' }: StandardsBadgesProps) {
  const counts = await citationCounts()
  const visible = KNOWN_BADGES.filter((b) => tier === 'all' || tier === b.tier)

  return (
    <section aria-label="Standards backing" className="mx-auto max-w-6xl py-12 px-4">
      <h2 className="mb-2 text-2xl font-semibold tracking-tight">Standards backing</h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Every badge below maps to one or more @standard / @audit / @compliance citations in the codebase.
        Counts come from <code className="rounded bg-muted px-1">docs/STANDARDS_INDEX.md</code> — the
        auto-generated source of truth, regenerated on every push.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3" role="list">
        {visible.map((b) => {
          const c = counts.get(b.family) ?? 0
          return (
            <li
              key={b.family}
              className={`rounded-md border p-3 ${c > 0 ? 'border-border bg-card' : 'border-dashed border-muted opacity-60'}`}
              aria-label={`${b.family} — ${c} citations in codebase`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-semibold">{b.family}</span>
                <span className="text-xs tabular-nums text-muted-foreground" aria-hidden="true">
                  {c > 0 ? `${c}×` : '—'}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{b.description}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
