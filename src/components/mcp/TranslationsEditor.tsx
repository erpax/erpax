/**
 * MCP Translations Editor — side-by-side locale comparison + inline edit.
 *
 * Slice FFFFFFFFF-cut4 (2026-05-11). Per user "refactor mcp as a payload
 * app with the ui components" and the README's roadmap entry:
 *
 *   > DDDDDDDDD-cut4 — TranslationsEditor wrapping the translations
 *   > collection with side-by-side locale comparison.
 *
 * Surfaces the `translations` collection (Slice AAAAAAAAA) in the
 * shape translators actually need: rows are translation keys, columns
 * are locales, the platform-default snapshot is shown alongside each
 * cell so the human reviewer can see what they're overriding.
 *
 * Wire:
 *   - GET  /api/translations?locale=all&where[scope][equals]=<scope>&limit=100
 *     Payload returns the `value` field as a per-locale object map
 *     ({ en: '…', bg: '…', de: '…' }) when locale=all is set.
 *   - PATCH /api/translations/:id?locale=<locale>
 *     Body { value: '<new>' } updates a single locale's value; other
 *     locales are untouched (Payload merges locale maps).
 *
 * UX:
 *   - Scope filter (mcp-tool / ui-surface / event-label / …).
 *   - Free-text key search (client-side over the loaded page).
 *   - Each row: key + per-locale textareas + per-cell save button
 *     (the row's other locales aren't touched).
 *   - Inline "platform-default" reference line (from `overrides.
 *     platformDefault.<locale>`) shown below an empty cell so the
 *     translator sees what the resolver would currently return.
 *
 * Accessibility:
 *   - role="grid" semantics via a real <table> with column headers.
 *   - aria-busy on the row being saved.
 *   - aria-live="polite" toast region for save success / failure.
 *
 * @standard W3C-WAI-ARIA-1.2 grid pattern
 * @standard WCAG 2.1 AA — focus visible + 4.5:1 text contrast
 * @standard BCP-47 locale codes in column headers
 * @audit Slice SSSSSSSS mediator (every PATCH produces an audit-events row)
 */
'use client'

import * as React from 'react'
import { createOnDemandStore } from './createPollingStore'

/** Per-locale value map for a `localized: true` field. */
type LocaleMap = Record<string, string>

interface TranslationRow {
  readonly id: string
  readonly translationKey?: string
  readonly scope: string
  readonly key: string
  readonly status?: string
  /** When fetched with `?locale=all`, `value` is a LocaleMap. */
  readonly value?: string | LocaleMap
  readonly note?: string | LocaleMap
  readonly overrides?: {
    readonly collection?: string
    readonly docId?: string
    readonly platformDefault?: string | LocaleMap
  }
}

interface ListResponse {
  readonly docs: ReadonlyArray<TranslationRow>
  readonly totalDocs: number
}

const SCOPES: ReadonlyArray<{ value: string; label: string }> = [
  { value: 'mcp-tool',              label: 'MCP tool' },
  { value: 'ui-surface',            label: 'UI surface' },
  { value: 'event-label',           label: 'Event label' },
  { value: 'notification-template', label: 'Notification template' },
  { value: 'standard-citation',     label: 'Standard citation' },
  { value: 'chain-step',            label: 'Chain step' },
  { value: 'other',                 label: 'Other' },
]

const DEFAULT_LOCALES: ReadonlyArray<string> = ['en', 'bg', 'de', 'fr']

/** Extract a per-locale value from either a flat string or a locale map. */
function pickLocale(v: string | LocaleMap | undefined, locale: string): string {
  if (v === undefined || v === null) return ''
  if (typeof v === 'string') return locale === 'en' ? v : ''
  return v[locale] ?? ''
}

/** Scope-keyed on-demand store factory — one store per scope, cached. */
function storeForScope(scope: string) {
  return createOnDemandStore<ListResponse>(`translations:${scope}`, async () => {
    const qs = new URLSearchParams({
      locale: 'all',
      'where[scope][equals]': scope,
      limit: '100',
      depth: '0',
    })
    const res = await fetch(`/api/translations?${qs.toString()}`, { credentials: 'include' })
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
    return (await res.json()) as ListResponse
  })
}

export function TranslationsEditor(): React.JSX.Element {
  const [scope, setScope] = React.useState<string>('mcp-tool')
  const [locales, setLocales] = React.useState<ReadonlyArray<string>>(DEFAULT_LOCALES)
  const [search, setSearch] = React.useState('')
  const [toast, setToast] = React.useState<string | null>(null)
  const [savingCell, setSavingCell] = React.useState<string | null>(null) // `${id}:${locale}`
  const [drafts, setDrafts] = React.useState<Record<string, string>>({})  // key = `${id}:${locale}`

  // --- fetch via useSyncExternalStore (canonical React 19 pattern) ----
  const store = React.useMemo(() => storeForScope(scope), [scope])
  const { data, error, refreshing } = React.useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  )
  // Memoise so identity is stable across re-renders when `data` is unchanged.
  const rows = React.useMemo<ReadonlyArray<TranslationRow>>(() => data?.docs ?? [], [data])
  const total = data?.totalDocs ?? rows.length
  const loading = refreshing && data === null
  const fetchPage = React.useCallback(() => store.refetch(), [store])

  // Auto-dismiss toast after 3s.
  React.useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(id)
  }, [toast])

  // --- save -----------------------------------------------------------
  const handleSave = React.useCallback(
    async (id: string, locale: string) => {
      const draftKey = `${id}:${locale}`
      const next = drafts[draftKey]
      if (next === undefined) return
      setSavingCell(draftKey)
      try {
        const res = await fetch(
          `/api/translations/${encodeURIComponent(id)}?locale=${encodeURIComponent(locale)}`,
          {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ value: next }),
          },
        )
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
        // Refetch from the store so the row reflects the canonical
        // server-side value (Payload merges locale maps on PATCH).
        await store.refetch()
        setDrafts((d) => {
          const { [draftKey]: _omit, ...rest } = d
          return rest
        })
        setToast(`Saved ${locale} — ${id.slice(0, 8)}…`)
      } catch (e) {
        setToast(`Save failed: ${e instanceof Error ? e.message : String(e)}`)
      } finally {
        setSavingCell(null)
      }
    },
    [drafts, store],
  )

  // --- derived --------------------------------------------------------
  const filteredRows = React.useMemo(() => {
    if (search.trim().length === 0) return rows
    const q = search.toLowerCase()
    return rows.filter(
      (r) =>
        r.key.toLowerCase().includes(q) ||
        (r.translationKey ?? '').toLowerCase().includes(q),
    )
  }, [rows, search])

  // --- render ---------------------------------------------------------
  return (
    <main className="container mx-auto p-6" aria-labelledby="te-heading">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 id="te-heading" className="text-3xl font-semibold">Translations</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Side-by-side locale editor for the <code className="font-mono">translations</code> collection. Tenant
            overrides above platform defaults. <span className="font-mono">{total}</span> row{total === 1 ? '' : 's'} loaded.
          </p>
        </div>
        <button
          type="button"
          onClick={fetchPage}
          disabled={loading}
          aria-busy={loading}
          className="rounded border px-3 py-1.5 text-sm hover:bg-accent transition-colors disabled:opacity-50"
        >
          {loading ? 'Loading…' : 'Refresh'}
        </button>
      </header>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-muted-foreground">Scope</span>
          <select
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            className="rounded border bg-background px-2 py-1 text-sm"
            aria-label="Scope filter"
          >
            {SCOPES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm flex-1 min-w-[200px]">
          <span className="text-muted-foreground">Search key</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g. erpax.consistency.scan"
            className="rounded border bg-background px-2 py-1 text-sm"
            aria-label="Search by translation key"
          />
        </label>

        <fieldset className="flex flex-col gap-1 text-sm">
          <legend className="text-muted-foreground">Locales</legend>
          <div className="flex flex-wrap items-center gap-2">
            {DEFAULT_LOCALES.map((loc) => {
              const on = locales.includes(loc)
              return (
                <label key={loc} className="flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() => setLocales((prev) =>
                      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc],
                    )}
                    aria-label={`Show ${loc} column`}
                  />
                  <span className="font-mono">{loc}</span>
                </label>
              )
            })}
          </div>
        </fieldset>
      </div>

      {error && (
        <p className="text-sm text-destructive mb-3" role="alert">
          {error}
        </p>
      )}

      {/* Grid */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm" role="grid" aria-label="Translations by locale">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th scope="col" className="px-3 py-2 font-medium">Key</th>
              <th scope="col" className="px-3 py-2 font-medium">Status</th>
              {locales.map((loc) => (
                <th key={loc} scope="col" className="px-3 py-2 font-medium font-mono">{loc}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 && !loading && (
              <tr>
                <td colSpan={2 + locales.length} className="px-3 py-6 text-center text-muted-foreground">
                  No translations match the current filter.
                </td>
              </tr>
            )}
            {filteredRows.map((row) => (
              <tr
                key={row.id}
                className="border-t align-top"
                aria-busy={savingCell?.startsWith(`${row.id}:`) ?? false}
              >
                <td className="px-3 py-3">
                  <p className="font-mono text-xs break-all">{row.key}</p>
                  {row.translationKey && row.translationKey !== row.key && (
                    <p className="text-xs text-muted-foreground mt-1 font-mono">{row.translationKey}</p>
                  )}
                </td>
                <td className="px-3 py-3">
                  <span
                    className={
                      row.status === 'enabled'
                        ? 'text-xs px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700'
                        : row.status === 'pending_approval'
                          ? 'text-xs px-2 py-0.5 rounded bg-amber-500/15 text-amber-700'
                          : 'text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground'
                    }
                  >
                    {row.status ?? '—'}
                  </span>
                </td>
                {locales.map((loc) => {
                  const draftKey = `${row.id}:${loc}`
                  const stored = pickLocale(row.value, loc)
                  const platformDefault = pickLocale(row.overrides?.platformDefault, loc)
                  const draftVal = drafts[draftKey]
                  const value = draftVal ?? stored
                  const dirty = draftVal !== undefined && draftVal !== stored
                  const saving = savingCell === draftKey
                  return (
                    <td key={loc} className="px-3 py-3 min-w-[200px]">
                      <textarea
                        value={value}
                        onChange={(e) => setDrafts((d) => ({ ...d, [draftKey]: e.target.value }))}
                        spellCheck
                        rows={2}
                        className="w-full rounded border bg-background p-2 text-sm font-mono"
                        aria-label={`${loc} value for ${row.key}`}
                      />
                      {!stored && platformDefault && (
                        <p className="text-xs text-muted-foreground mt-1 italic">
                          Platform default: <span className="font-mono">{platformDefault}</span>
                        </p>
                      )}
                      <div className="mt-1 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSave(row.id, loc)}
                          disabled={!dirty || saving}
                          aria-busy={saving}
                          className="rounded bg-primary text-primary-foreground px-2 py-0.5 text-xs hover:bg-primary/90 transition-colors disabled:opacity-40"
                        >
                          {saving ? 'Saving…' : dirty ? 'Save' : 'Saved'}
                        </button>
                        {dirty && (
                          <button
                            type="button"
                            onClick={() => setDrafts((d) => {
                              const { [draftKey]: _o, ...rest } = d
                              return rest
                            })}
                            className="rounded border px-2 py-0.5 text-xs hover:bg-accent transition-colors"
                          >
                            Discard
                          </button>
                        )}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Toast region */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-4 right-4 z-50"
      >
        {toast && (
          <p className="rounded-md border bg-card text-card-foreground shadow-lg px-3 py-2 text-sm">
            {toast}
          </p>
        )}
      </div>
    </main>
  )
}

export default TranslationsEditor
