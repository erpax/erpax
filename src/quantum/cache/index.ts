/**
 * quantum/cache — the content-addressed cache: the content IS its own key (its content-uuid), so the
 * same content is ALWAYS a hit and there is no cache-invalidation bug — a changed input is simply a
 * different key. Dedup by design ([[merge]]). Merges into [[cache]].
 * Composes [[cache]] · [[quantum]] · [[uuid]] · [[merge]].
 *
 *   tsx src/quantum/cache/index.ts
 *
 * @standard RFC 9562 §5.8 content-uuid (the cache key)
 * @see ../../cache -- ../../uuid/matrix -- ./SKILL.md
 */
import { toUuid } from '@/uuid/matrix'

/** The content-addressed cache key: the content's uuid (same content ⇒ same key ⇒ always a hit). */
export const key = (content: string): string => toUuid(Buffer.from('cache:' + content, 'utf8'))

/** Same content ⇒ same key (dedup by design; different content ⇒ different key, auto-invalidation). */
export const sameKey = (a: string, b: string): boolean => key(a) === key(b)

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/cache — same content ⇒ same key: ' + sameKey('x', 'x') + ' · "x" vs "y": ' + sameKey('x', 'y'))
}
