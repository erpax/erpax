/**
 * One publication — the claim, its boundary, its method, and every cross-link.
 *
 * `generateStaticParams` enumerates the registry, so a result that stops being publishable stops
 * having a page rather than 404-ing from a stale list.
 *
 * @standard schema.org ScholarlyArticle
 */
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { citationGraph, publishableResults, scholarlyArticle } from '@/publish/registry'

const SITE = 'https://erpax.com'

export function generateStaticParams(): { slug: string }[] {
  return publishableResults().map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const r = publishableResults().find((x) => x.slug === slug)
  if (r === undefined) return { title: 'erpax — publication not found' }
  return {
    title: `erpax — ${r.title}`,
    description: r.claim,
    alternates: { canonical: `${SITE}/publications/${r.slug}` },
    openGraph: { title: r.title, description: r.claim, type: 'article', url: `${SITE}/publications/${r.slug}` },
  }
}

export default async function PublicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const results = publishableResults()
  const r = results.find((x) => x.slug === slug)
  if (r === undefined) notFound()
  const cites = citationGraph(results).get(r.slug) ?? []
  const byslug = new Map(results.map((x) => [x.slug, x]))

  return (
    <main className="container py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyArticle(r, cites, SITE)) }}
      />
      <p className="text-sm">
        <Link href="/publications">← all publications</Link>
      </p>
      <h1 className="mt-4 text-3xl font-bold">{r.title}</h1>

      <h2 className="mt-8 text-xl font-semibold">Claim</h2>
      <p className="mt-2">{r.claim}</p>

      <h2 className="mt-8 text-xl font-semibold">What this does not prove</h2>
      <p className="mt-2">{r.boundary}</p>

      <h2 className="mt-8 text-xl font-semibold">Method</h2>
      <p className="mt-2">
        Recompute it: <code>{r.method}</code>
      </p>

      {r.standards.length > 0 ? (
        <>
          <h2 className="mt-8 text-xl font-semibold">Standards</h2>
          <ul className="mt-2 list-disc pl-6">
            {r.standards.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </>
      ) : null}

      {cites.length > 0 ? (
        <>
          <h2 className="mt-8 text-xl font-semibold">Cites</h2>
          <ul className="mt-2 list-disc pl-6">
            {cites.map((c) => (
              <li key={c}>
                <Link href={`/publications/${c}`}>{byslug.get(c)?.title ?? c}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <h2 className="mt-8 text-xl font-semibold">Availability</h2>
      <ul className="mt-2 list-disc pl-6">
        {r.links.map((l) => (
          <li key={l.rel}>
            {l.rel}: <a href={l.url}>{l.url}</a>
          </li>
        ))}
      </ul>
    </main>
  )
}
