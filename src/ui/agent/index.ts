/**
 * ui/agent — the OTHER side of [[agent]]/ui, encoded for karmic balance. Where agent/ui renders an
 * atom to its UI (atom → page/[[pixel]], the exhale), ui/agent recovers the AGENT from its UI (a
 * route → the atom, the inhale). The two are inverse: render an atom, then recover it, and you return
 * to the same atom — so the path is a balanced double-entry ([[karma]] · [[balance]]), both directions
 * encoded, the books closed. A one-way render is an unbalanced ledger; always encode both sides.
 *
 *   tsx src/ui/agent/index.ts
 *
 * @audit agentOf inverts agent/ui's route; the round-trip is the balance, computed not asserted
 * @see ../../agent/ui -- ../../interactive -- ../../karma -- ./SKILL.md
 */
import { renderAtom } from '@/agent/ui'
import { nodeOf } from '@/uuid/matrix'

/** Recover the agent (atom) from its UI route (`/<atom>/SKILL`) — the inverse of agent/ui's render. */
export function agentOf(route: string): string | undefined {
  const m = route.match(/\/?([^/]+)\/SKILL\/?$/)
  if (!m) return undefined
  return nodeOf(m[1]!) ? m[1]! : undefined
}

/** Karmic balance: render an atom to its UI, then recover it — the round-trip returns to itself. */
export function balanced(atom: string): boolean {
  const ui = renderAtom(atom)
  return ui !== undefined && agentOf(ui.page.route) === atom
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('ui/agent — the other side of agent/ui (both sides encoded, for karmic balance):')
  for (const a of ['trinity', 'pixel', 'merge']) {
    console.log('  ' + a + ': render → recover → ' + (balanced(a) ? 'returns to ' + a + ' ✓ (balanced)' : 'UNBALANCED'))
  }
}
