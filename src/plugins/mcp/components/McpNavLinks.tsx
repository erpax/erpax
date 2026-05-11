/**
 * MCP nav links injected before the default Payload admin nav.
 *
 * Slice DDDDDDDDD (2026-05-11). Adds an MCP section with links to
 * the four MCP admin surfaces:
 *
 *   - Tool Browser
 *   - Tool Invoker
 *   - Consistency Status
 *   - Translations Editor
 *
 * @standard W3C-WAI-ARIA-1.2 nav landmark
 * @standard WCAG 2.1 AA
 */
import * as React from 'react'
import Link from 'next/link'

export function McpNavLinks(): React.JSX.Element {
  return (
    <nav aria-label="MCP" className="mb-4">
      <h3 className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        MCP
      </h3>
      <ul className="space-y-1">
        <li>
          <Link href="/admin/mcp/tools" className="block px-3 py-1.5 text-sm hover:bg-accent rounded">
            Tools
          </Link>
        </li>
        <li>
          <Link href="/admin/mcp/invoke" className="block px-3 py-1.5 text-sm hover:bg-accent rounded">
            Invoke
          </Link>
        </li>
        <li>
          <Link href="/admin/mcp/status" className="block px-3 py-1.5 text-sm hover:bg-accent rounded">
            Status
          </Link>
        </li>
        <li>
          <Link href="/admin/mcp/translations" className="block px-3 py-1.5 text-sm hover:bg-accent rounded">
            Translations
          </Link>
        </li>
        <li>
          <Link
            href="/admin/collections/translations"
            className="block px-3 py-1 pl-6 text-xs text-muted-foreground hover:text-foreground hover:bg-accent rounded"
          >
            ↳ Raw rows
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default McpNavLinks
