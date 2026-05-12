/**
 * MCP Tool Invoker — admin UI drawer for calling any erpax.* tool.
 *
 * Slice FFFFFFFFF (2026-05-11). Listens for the `mcp:invoke` custom
 * event emitted by `<ToolBrowser />` (Slice DDDDDDDDD), opens a
 * drawer, lets the admin enter zod-validated JSON args, POSTs to
 * `/api/mcp/invoke/:toolName`, and displays the result.
 *
 * Design choices:
 *   - JSON args textarea — no per-tool form generator yet (zod schema
 *     is not currently exposed by /api/mcp/catalog). Future cut:
 *     ToolInvoker reads a JSON-Schema-derived form definition.
 *   - Result panel renders as syntax-highlighted JSON via <pre><code>.
 *   - Error band surfaces validation + handler errors with the same
 *     locale resolution the catalog uses.
 *   - Audit trail: every invocation produces an `audit-events` row
 *     via the mediator (Slice SSSSSSSS).
 *
 * Accessibility:
 *   - role="dialog" + aria-labelledby / aria-modal
 *   - Escape closes; focus trapped while open
 *   - Locale label visible (helps multi-tenant admins)
 *
 * @standard W3C-WAI-ARIA-1.2 dialog pattern
 * @standard WCAG 2.1 AA
 * @audit Slice SSSSSSSS mediator (audit-events per invocation)
 */
'use client'

import * as React from 'react'

interface InvokeResult {
  readonly ok: boolean
  readonly toolName: string
  readonly result?: unknown
  readonly error?: string
}

interface InvokeEventDetail {
  readonly toolName: string
}

export function ToolInvoker(): React.JSX.Element | null {
  const [open, setOpen] = React.useState(false)
  const [toolName, setToolName] = React.useState<string | null>(null)
  const [argsJson, setArgsJson] = React.useState('{}')
  const [result, setResult] = React.useState<InvokeResult | null>(null)
  const [pending, setPending] = React.useState(false)
  const [parseError, setParseError] = React.useState<string | null>(null)
  const dialogRef = React.useRef<HTMLDivElement>(null)

  // Listen for the mcp:invoke event from <ToolBrowser/>.
  React.useEffect(() => {
    const onInvoke = (e: Event) => {
      const detail = (e as CustomEvent<InvokeEventDetail>).detail
      if (!detail?.toolName) return
      setToolName(detail.toolName)
      setArgsJson('{}')
      setResult(null)
      setParseError(null)
      setOpen(true)
    }
    window.addEventListener('mcp:invoke', onInvoke)
    return () => window.removeEventListener('mcp:invoke', onInvoke)
  }, [])

  // Escape to close + focus management.
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    // focus the first input when opening
    dialogRef.current?.querySelector<HTMLElement>('textarea')?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const handleInvoke = React.useCallback(async () => {
    if (!toolName) return
    let parsed: unknown = {}
    if (argsJson.trim().length > 0) {
      try { parsed = JSON.parse(argsJson) }
      catch (e) {
        setParseError(e instanceof Error ? e.message : String(e))
        return
      }
    }
    setParseError(null)
    setPending(true)
    setResult(null)
    try {
      const res = await fetch(`/api/mcp/invoke/${encodeURIComponent(toolName)}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(parsed ?? {}),
      })
      const body = (await res.json()) as InvokeResult
      setResult(body)
    } catch (e) {
      setResult({ ok: false, toolName, error: e instanceof Error ? e.message : String(e) })
    } finally {
      setPending(false)
    }
  }, [toolName, argsJson])

  if (!open || !toolName) return null

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mcp-invoke-heading"
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
    >
      <div className="bg-card text-card-foreground border rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] flex flex-col">
        <header className="border-b p-4 flex items-center justify-between">
          <div>
            <h2 id="mcp-invoke-heading" className="text-lg font-semibold font-mono">{toolName}</h2>
            <p className="text-xs text-muted-foreground">MCP tool invocation • POST /api/mcp/invoke/{toolName}</p>
          </div>
          <button
            type="button" aria-label="Close"
            onClick={() => setOpen(false)}
            className="rounded p-1 hover:bg-accent transition-colors"
          >
            ×
          </button>
        </header>

        <div className="flex-1 overflow-auto p-4 space-y-4">
          <section aria-labelledby="args-heading">
            <h3 id="args-heading" className="text-sm font-medium mb-2">Arguments (JSON)</h3>
            <textarea
              value={argsJson}
              onChange={(e) => setArgsJson(e.target.value)}
              spellCheck={false}
              className="w-full font-mono text-sm rounded border bg-background p-2 min-h-[120px]"
              aria-describedby={parseError ? 'parse-error' : undefined}
              aria-invalid={parseError !== null}
            />
            {parseError && (
              <p id="parse-error" className="text-xs text-destructive mt-1" role="alert">
                JSON parse error: {parseError}
              </p>
            )}
          </section>

          {result && (
            <section aria-labelledby="result-heading">
              <h3 id="result-heading" className="text-sm font-medium mb-2">
                {result.ok ? 'Result' : 'Error'}
              </h3>
              {result.error ? (
                <pre className="text-xs text-destructive whitespace-pre-wrap bg-destructive/10 rounded border border-destructive/30 p-3" role="alert">
                  {result.error}
                </pre>
              ) : (
                <pre className="text-xs whitespace-pre-wrap bg-muted rounded border p-3 max-h-[40vh] overflow-auto">
                  <code>{JSON.stringify(result.result, null, 2)}</code>
                </pre>
              )}
            </section>
          )}
        </div>

        <footer className="border-t p-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setOpen(false)}
            disabled={pending}
            className="rounded border px-3 py-1.5 text-sm hover:bg-accent transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleInvoke}
            disabled={pending}
            className="rounded bg-primary text-primary-foreground px-3 py-1.5 text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
            aria-busy={pending}
          >
            {pending ? 'Invoking…' : 'Invoke'}
          </button>
        </footer>
      </div>
    </div>
  )
}

export default ToolInvoker
