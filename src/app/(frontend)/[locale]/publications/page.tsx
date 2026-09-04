/**
 * The publications index — every result this corpus can honestly publish, cross-linked.
 *
 * Computed from [[publish]]/registry at render time rather than stored: a derivable artifact is
 * regenerated, never committed ([[convention]]/baked). The JSON-LD is derived from the same
 * results as the visible list, so the structured data cannot disagree with the page.
 *
 * @standard schema.org ScholarlyArticle
 * @standard schema.org CollectionPage
 */
import type { Metadata } from 'next'
import Link from 'next/link'
import { citationGraph, publishableResults, scholarlyArticle } from '@/publish/registry'

export const metadata: Metadata = {
  title: 'erpax — publications',
  description:
    'Every result erpax can honestly publish: a stated law, an honest boundary naming what it does not prove, and an executable gate that fails closed. Cross-linked, kernel-checked where a proof exists, archived with a DOI.',
}

const SITE = 'https://erpax.com'

export default function PublicationsPage() {
  const results = publishableResults()
  const graph = citationGraph(results)
  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE}/publications`,
    name: 'erpax — publications',
    description: metadata.description,
    hasPart: results.map((r) => scholarlyArticle(r, graph.get(r.slug) ?? [], SITE)),
  }

  return (
    <main className="container py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }} />
      <h1 className="text-4xl font-bold">Publications</h1>
      <p className="mt-4 max-w-3xl text-lg">
        {results.length} results. Each states a law, names what it does <em>not</em> prove, and ships a gate that
        fails closed — a claim nothing can contradict is not published here.
      </p>
      <ul className="mt-10 space-y-8">
        {results.map((r) => {
          const cites = graph.get(r.slug) ?? []
          return (
            <li key={r.slug} id={r.slug}>
              <h2 className="text-xl font-semibold">
                <Link href={`/publications/${r.slug}`}>{r.title}</Link>
              </h2>
              <p className="mt-1">{r.claim}</p>
              <p className="mt-1 text-sm opacity-70">
                <strong>Does not prove:</strong> {r.boundary}
              </p>
              <p className="mt-2 text-sm">
                <code>{r.method}</code>
                {r.proof !== null ? ' · kernel-checked proof' : ''}
                {r.standards.length > 0 ? ` · ${r.standards.join(' · ')}` : ''}
                {cites.length > 0 ? ` · cites ${cites.length}` : ''}
              </p>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
