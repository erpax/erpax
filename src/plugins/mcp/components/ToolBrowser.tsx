/**
 * MCP Tool Browser — admin UI surface.
 *
 * Slice DDDDDDDDD (2026-05-11). Fetches the localized catalog from
 * `/api/mcp/catalog`, groups tools by area, and renders a searchable
 * list with description preview. Click → opens ToolInvoker.
 *
 * Conventions:
 *   - Server-fetched on initial render via the Payload session cookie
 *   - Accept-Language passed through so the catalog is locale-aware
 *   - shadcn primitives (Card, Input, Tabs) for consistent admin look
 *
 * @standard W3C-WAI-ARIA-1.2 accessibility (landmarks + keyboard nav)
 * @standard WCAG 2.1 AA
 */
'use client'

import * as React from 'react'

interface CatalogTool {
  readonly name: string
  readonly area: string
  readonly description: string
  readonly parameters: ReadonlyArray<string>
}

interface CatalogResponse {
  readonly locale: string
  readonly tenantId: string
  readonly count: number
  readonly tools: ReadonlyArray<CatalogTool>
}

export function ToolBrowser(): React.JSX.Element {
  const [data, setData] = React.useState<CatalogResponse | null>(null)
  const [search, setSearch] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [selectedArea, setSelectedArea] = React.useState<string>('all')

  React.useEffect(() => {
    let cancelled = false
    fetch('/api/mcp/catalog', { credentials: 'include' })
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`)
        return r.json() as Promise<CatalogResponse>
      })
      .then((d) => { if (!cancelled) setData(d) })
      .catch((e) => { if (!cancelled) setError(e instanceof Error ? e.message : String(e)) })
    return () => { cancelled = true }
  }, [])

  const grouped = React.useMemo(() => {
    if (!data) return new Map<string, ReadonlyArray<CatalogTool>>()
    const filtered = data.tools.filter((t) => {
      if (selectedArea !== 'all' && t.area !== selectedArea) return false
      if (search.length === 0) return true
      const q = search.toLowerCase()
      return t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    })
    const byArea = new Map<string, CatalogTool[]>()
    for (const t of filtered) {
      const list = byArea.get(t.area) ?? []
      list.push(t)
      byArea.set(t.area, list)
    }
    return byArea
  }, [data, search, selectedArea])

  const allAreas = React.useMemo(() => {
    if (!data) return []
    return Array.from(new Set(data.tools.map((t) => t.area))).sort()
  }, [data])

  if (error) {
    return (
      <main className="container mx-auto p-6" aria-labelledby="mcp-error-heading">
        <h1 id="mcp-error-heading" className="text-2xl font-semibold text-destructive">
          MCP catalog unavailable
        </h1>
        <p className="text-sm text-muted-foreground mt-2">{error}</p>
      </main>
    )
  }
  if (!data) {
    return (
      <main className="container mx-auto p-6" aria-busy="true">
        <p className="text-sm text-muted-foreground">Loading MCP catalog…</p>
      </main>
    )
  }

  return (
    <main className="container mx-auto p-6" aria-labelledby="mcp-browser-heading">
      <header className="mb-6">
        <h1 id="mcp-browser-heading" className="text-3xl font-semibold">MCP Tools</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {data.count} tools available • locale <code>{data.locale}</code> • tenant <code>{data.tenantId}</code>
        </p>
      </header>

      <div className="flex flex-col gap-4 mb-6 md:flex-row">
        <input
          type="search"
          aria-label="Search tools"
          placeholder="Search by name or description…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded border bg-background px-3 py-2 text-sm"
        />
        <select
          aria-label="Filter by area"
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="rounded border bg-background px-3 py-2 text-sm"
        >
          <option value="all">All areas</option>
          {allAreas.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      <section aria-label="Tool list" className="space-y-6">
        {Array.from(grouped.entries()).sort().map(([area, tools]) => (
          <article key={area} aria-labelledby={`area-${area}-heading`}>
            <h2 id={`area-${area}-heading`} className="text-xl font-medium mb-3">
              erpax.{area} <span className="text-sm text-muted-foreground">({tools.length})</span>
            </h2>
            <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {tools.map((t) => (
                <li
                  key={t.name}
                  className="rounded-lg border bg-card text-card-foreground p-4 hover:border-foreground/40 transition-colors"
                >
                  <h3 className="font-mono text-sm font-medium mb-2">{t.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{t.description}</p>
                  {t.parameters.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Params: {t.parameters.join(', ')}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      // Slice DDDDDDDDD-cont — ToolInvoker drawer opens here.
                      window.dispatchEvent(new CustomEvent('mcp:invoke', { detail: { toolName: t.name } }))
                    }}
                    className="mt-3 rounded border px-2 py-1 text-xs hover:bg-accent transition-colors"
                  >
                    Invoke →
                  </button>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      {grouped.size === 0 && (
        <p className="text-sm text-muted-foreground">No tools match the current filter.</p>
      )}
    </main>
  )
}

export default ToolBrowser
