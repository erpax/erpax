/**
 * verification — prove a claim by CONTENT-UUID match. A claimant publishes a token (the
 * content's uuid); the verifier re-derives the uuid from the actual content and matches.
 *
 * Because the token IS the content's identity, ANY change to the content yields a new uuid,
 * so the old token no longer matches — RE-VERIFICATION IS REQUIRED BY ARCHITECTURE. There is
 * no expiry to set and no revocation to push: tamper-evidence is structural (the content-
 * addressed dual of ACME's digest-valued challenge, RFC 8555 §8.4). The domain application —
 * publish the token in a DNS CNAME/TXT record — lives in ../domain/verification.
 *
 *   tsx src/verification/index.ts
 *
 * @standard RFC 8555 §8.4 (ACME DNS-01: the record value is a digest of the key authorization)
 * @audit the token is the content-uuid; computed, never hand-asserted
 * @see ../domain/verification (the DNS application) -- ../proof -- ../anchor -- ../tamper -- ./SKILL.md
 */
import { toUuid } from '@/uuid/matrix'

/** The verification token for a content: its content-uuid (what a claimant publishes). */
export const token = (content: string): string => toUuid(Buffer.from('verify:' + content, 'utf8'))

/** Verify: the published token matches the actual content (true ONLY if the content is unchanged). */
export const verify = (publishedToken: string, content: string): boolean => publishedToken === token(content)

/** Re-verification needed? — the content changed, so its token no longer matches (by architecture). */
export const needsReverification = (publishedToken: string, content: string): boolean => !verify(publishedToken, content)

if (import.meta.url === 'file://' + process.argv[1]) {
  const t = token('hello world')
  console.log('verification — content-addressed proof:')
  console.log('  token("hello world") = ' + t.slice(0, 8) + '… · verify(token, same) = ' + verify(t, 'hello world'))
  console.log('  object changed ⇒ needs re-verification: ' + needsReverification(t, 'hello world!'))
}
