import { fileURLToPath } from 'node:url'
import { basename, dirname } from 'node:path'

/**
 * atom/address — an atom's own address, read from where the file actually is.
 *
 * `export const atomPath = 'body/abdomen'` is a value a human typed, and `expect(atomPath).toBe(
 * 'body/abdomen')` beside it certifies the typing ([[rules]]/mirror). The claim worth making is
 * that the declared name agrees with the atom's REAL location — which is refutable: move the
 * folder and it fails, rename the constant and it fails.
 *
 * The proof calls this with its own `import.meta.url`, so the address comes from the filesystem and
 * never from a second literal. There is nothing here for a human to keep in sync.
 *
 * @see ./SKILL.md
 */

export interface AtomAddress {
  /** The atom's own folder name — `abdomen` for `src/body/abdomen`. */
  readonly leaf: string
  /** The containing atom's folder name — `body`. Empty at the root of `src`. */
  readonly parent: string
  /** The path under `src` — `body/abdomen`. This is the account code ([[path]]). */
  readonly path: string
  /** The barrel specifier a sibling would import this atom by — `@/body/abdomen`. */
  readonly specifier: string
  /**
   * The barrel of the CANONICAL one-word atom this facet names — `@/abdomen` for `body/abdomen`.
   *
   * A facet re-exports the canonical atom rather than redefining it, so `reexportFrom` points at
   * `@/abdomen`, never at the facet's own `@/body/abdomen`. The two differ exactly when the atom is
   * nested, which is why they are separate fields: collapsing them reads correct at the root and is
   * wrong everywhere else, and that is how a mistake survives a hundred passing tests.
   */
  readonly canonical: string
}

/**
 * The address of the atom a file belongs to, from that file's own `import.meta.url`.
 *
 * Accepts a `file://` url or a plain path, and a file or its directory, because a proof should not
 * have to know which it is holding.
 */
export function atomAddress(from: string): AtomAddress {
  const raw = from.startsWith('file://') ? fileURLToPath(from) : from
  const dir = /\.[a-z]+$/i.test(raw) ? dirname(raw) : raw
  const marker = `${'/'}src${'/'}`
  const at = dir.lastIndexOf(marker)
  const path = at === -1 ? basename(dir) : dir.slice(at + marker.length)
  const segments = path.split('/')
  const leaf = segments[segments.length - 1] ?? ''
  return {
    leaf,
    parent: segments.length > 1 ? (segments[segments.length - 2] ?? '') : '',
    path,
    specifier: `@/${path}`,
    canonical: `@/${leaf}`,
  }
}
