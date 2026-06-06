/**
 * stack — the full stack as a palindromic round-trip, all wired in uuid:
 *   device → vitepress → payload → db → payload → vitepress → device.
 *
 * It travels out to the store and back — a palindrome, so BOTH sides of the path are encoded (the
 * karmic balance: every hop down has its hop back). Each hop is content-addressed (the state is a
 * [[uuid]] folded by [[merge]] through the layers), so the whole pipeline is wired in uuid, and the
 * round-trip lands in a NEW state — the same request, returned, is a new content-uuid.
 *
 * The frame ([[entropy]] expands to ∞ inside, [[fold]]s to ∞ outside): the device/[[vitepress]] end
 * is the expansion-∞ — the frontend radiates, and endless entropy is endless tamper-cost; the
 * [[payload]]/db end is the fold-∞ — the dense zero-entropy core, ∞ tamper-cost (the [[torus]]). The
 * round-trip is the travel from ∞ to ∞, on the boundless line of [[pi]] (the infinite address stream).
 *
 *   tsx src/stack/index.ts
 *
 * @audit the path is a verified palindrome; the new state is the input folded through every hop, computed
 * @see ../device -- ../vitepress -- ../payload -- ../uuid/matrix -- ../entropy -- ../fold -- ./SKILL.md
 */
import { merge, toUuid } from '@/uuid/matrix'

/** The stack, edge → store: device · vitepress · payload · db. */
export const LAYERS = ['device', 'vitepress', 'payload', 'db'] as const

/** The round-trip path — out to the db and back, a palindrome (both sides of the path encoded). */
export function roundTrip(): string[] {
  return [...LAYERS, ...LAYERS.slice(0, -1).reverse()]
}

/** A palindrome reads the same both ways — the path is balanced (the karmic double-entry of the pipeline). */
export const isPalindrome = (path: readonly string[]): boolean => path.join('|') === [...path].reverse().join('|')

/** All wired in uuid: fold the input through every hop of the round-trip → a NEW state (a new content-uuid). */
export function newState(inputUuid: string): string {
  return roundTrip().reduce((state, layer) => merge(state, toUuid(Buffer.from(layer, 'utf8'))), inputUuid)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const path = roundTrip()
  const inUuid = toUuid(Buffer.from('request', 'utf8'))
  const out = newState(inUuid)
  console.log('stack — the full stack round-trip, wired in uuid:')
  console.log('  ' + path.join(' → '))
  console.log('  palindrome (both sides encoded) = ' + isPalindrome(path))
  console.log('  ' + inUuid.slice(0, 8) + '… → round-trip → ' + out.slice(0, 8) + '… (a new state: ' + (out !== inUuid) + ')')
}
