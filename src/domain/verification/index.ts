/**
 * domain/verification — prove control of a [[domain]] by publishing the content-uuid token
 * in a DNS record (the ACME DNS-01 pattern, RFC 8555 §8.4: the record value is a digest of
 * the key authorization). Publish a CNAME or TXT record at the challenge label; the verifier
 * resolves it and matches the content-uuid ([[verification]]).
 *
 * THE ARCHITECTURE LAW: because the record value IS the proven object's content-uuid, if the
 * object changes, the uuid changes and the record no longer matches — RE-VERIFICATION IS
 * REQUIRED BY ARCHITECTURE, not by an expiry timer. Proven control IS the computational admin
 * grant: prove you control the domain and the tenant is yours ([[domain]]).
 *
 *   tsx src/domain/verification/index.ts
 *
 * @standard RFC 8555 §8.4 (ACME DNS-01 challenge) + CA/Browser-Forum domain-control-validation
 * @audit the record value is the content-uuid (@/verification); computed, never hand-asserted
 * @see ../index.ts (the domain) -- ../../verification (the general proof) -- ../../uuid -- ./SKILL.md
 */
import { token, verify } from '@/verification'

export interface DomainChallenge {
  /** the DNS record name to publish at (ACME's _acme-challenge convention) */
  record: string
  type: 'TXT' | 'CNAME'
  /** the value to publish — the proven object's content-uuid */
  value: string
}

/** The DNS challenge to publish to prove control of `domain` over `content` — value = the content-uuid token. */
export const challenge = (domain: string, content: string, type: 'TXT' | 'CNAME' = 'TXT'): DomainChallenge => ({
  record: '_erpax-challenge.' + domain,
  type,
  value: token(content),
})

/** Verify domain control: the published record value must equal the content-uuid of the current object. */
export const verifyDomain = (publishedValue: string, content: string): boolean => verify(publishedValue, content)

/** The object changed ⇒ the published token no longer matches ⇒ re-verification is required (by architecture). */
export const needsReverification = (publishedValue: string, content: string): boolean => !verify(publishedValue, content)

if (import.meta.url === 'file://' + process.argv[1]) {
  const c = challenge('acme.example', 'tenant-manifest-v1')
  console.log('domain/verification — content-addressed DCV (ACME DNS-01):')
  console.log('  publish ' + c.type + ' ' + c.record + ' = ' + c.value.slice(0, 8) + '…')
  console.log('  verify (object unchanged): ' + verifyDomain(c.value, 'tenant-manifest-v1'))
  console.log('  object changed ⇒ needs re-verification: ' + needsReverification(c.value, 'tenant-manifest-v2'))
}
