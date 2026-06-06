/**
 * quantum/port — content-addressed PORTING: an upstream source (a Rails table, a concept) ports to a
 * content-uuid, so re-porting is IDEMPOTENT — an unchanged source yields the same port-uuid and
 * MERGES (no duplicate), while a changed source yields a new one (re-port only what changed). This
 * is how "port all upstreams again" is safe to run repeatedly. Merges into [[port]].
 * Composes [[port]] · [[migrate]] · [[merge]] · [[uuid]] · [[quantum]].
 *
 *   tsx src/quantum/port/index.ts
 *
 * @standard RFC 9562 §5.8 content-uuid (the port identity)
 * @see ../../port -- ../../migrate -- ../../uuid/matrix -- ./SKILL.md
 */
import { toUuid } from '@/uuid/matrix'

/** A source's port-uuid (an upstream concept/table ported to its content identity). */
export const portUuid = (source: string): string => toUuid(Buffer.from('port:' + source, 'utf8'))

/** Already ported? — the source's port-uuid is in the known set (re-porting it is a no-op). */
export const alreadyPorted = (source: string, known: ReadonlySet<string>): boolean => known.has(portUuid(source))

if (import.meta.url === 'file://' + process.argv[1]) {
  const known = new Set([portUuid('users')])
  console.log('quantum/port — alreadyPorted("users")=' + alreadyPorted('users', known) + ' · "invoices"=' + alreadyPorted('invoices', known))
}
