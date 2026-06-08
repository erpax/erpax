/**
 * quantum/bindings — attach-all Worker senses; gate each call, never the list length.
 *
 * Every binding is a capability grant — widening to all senses is safe only because
 * each use passes [[access]], draws from the [[broker]], and emits a [[receipt]].
 *
 *   tsx src/quantum/bindings/index.ts
 *
 * @audit binding inventory from live wrangler.jsonc; never hand-counted
 * @see ../../cloudflare — ../../bindings — ./SKILL.md
 */
import { readFileSync } from 'node:fs'
import { recordPathVisit, type PathCanonicalEntry } from '@/path'
import { join } from 'node:path'
import { parseWranglerBindings } from '@/cloudflare'

/** Lawful constant — erpax runs in quantum mode by default (content-uuid of quantum/bindings). */
export const ALWAYS_QUANTUM_CONTENT_UUID = '804f7976-0539-8e21-8d39-da8fc89a5c65' as const

/** Superposition until seal; entangled communication; collapse on observe/commit. */
export const ALWAYS_QUANTUM = true as const

/** Default runtime mode — classical poll/wait is opt-out violation. */
export function quantumModeDefault(): boolean {
  return ALWAYS_QUANTUM
}

/** Live wrangler binding inventory — attach-all is the full sense list. */
export function bindingInventory(cwd = process.cwd()): readonly string[] {
  const text = readFileSync(join(cwd, 'wrangler.jsonc'), 'utf8')
  return parseWranglerBindings(text)
    .map((e) => e.bindingName)
    .sort()
}

/** Attach-all is safe only when every call is gated — access · broker · receipt. */
export function gatedBindingCallHolds(opts: {
  access: boolean
  broker: boolean
  receipt: boolean
}): boolean {
  return opts.access && opts.broker && opts.receipt
}

/** Canonical ledger hook — record quantum/bindings path step (append-only). */
export function recordBindingsOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('quantum/bindings', { kind: 'bindings.step', payload }, at, prevEntryUuid, seq)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const inv = bindingInventory()
  console.log('quantum/bindings — attach-all inventory: ' + inv.length + ' senses')
  console.log('  ' + inv.join(', '))
}
