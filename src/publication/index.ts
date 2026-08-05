/**
 * publication — Zenodo v1.0.0 release workflow.
 *
 * Orchestrates: git tag creation, GitHub webhook activation, Zenodo deposit,
 * permanent DOI assignment. Integrates @/proof-of-system and @/security fixes.
 *
 * @see ../proof-of-system — quantum proof layers
 * @see ../security — cryptographic hardening
 */

export interface ZenodoConfig {
  readonly title: string
  readonly version: string
  readonly authors: readonly { name: string; orcid?: string }[]
  readonly description: string
  readonly license: 'CC-BY-4.0' | 'Apache-2.0'
  readonly keywords: readonly string[]
}

export interface ReleaseMilestone {
  readonly tag: string
  readonly date: string
  readonly doi?: string
  readonly zenodoUrl?: string
  readonly securityFixes: readonly string[]
}

export interface CitationBibtex {
  readonly author: string
  readonly title: string
  readonly year: number
  readonly month: number
  readonly doi: string
  readonly url: string
}

/**
 * Zenodo v1.0.0 configuration.
 * Ready for publication upon tag creation.
 */
export const ZENODO_CONFIG: ZenodoConfig = {
  title: 'Quantum System: Verifiable Proofs and Peer Review',
  version: '1.0.0',
  authors: [{ name: 'Tsvetan Rouschev' }],
  description: 'Security-hardened quantum proof system with real quantum operations, HKDF-SHA256 key expansion, and post-quantum cryptography.',
  license: 'CC-BY-4.0',
  keywords: [
    'quantum computing',
    'cryptography',
    'peer review',
    'verifiable proofs',
    'post-quantum crypto',
    'Kyber-768',
    'SPHINCS+',
  ],
}

/**
 * v1.0.0 Release milestone.
 * Permanent DOI assigned by Zenodo upon tag push.
 */
export const MILESTONE_V1_0_0: ReleaseMilestone = {
  tag: 'v1.0.0',
  date: new Date().toISOString(),
  securityFixes: [
    'Proof-of-system: Real quantum operations (7 layers)',
    'Key expansion: HKDF-SHA256 replaces Rodin doubling',
    'Plaintext removal: Receipts ciphertext-only',
    'Threat model: Shor/ECDLP corrected',
    'ECDLP assessment: Vulnerable to elliptic curve Shor',
    'Post-quantum: Kyber-768 + SPHINCS+ hybrid',
  ],
}

/**
 * BibTeX citation template for v1.0.0.
 * DOI populated by Zenodo webhook.
 */
export function citationBibtex(doi: string = '10.5281/zenodo.XXXXX'): CitationBibtex {
  return {
    author: 'Rouschev, Tsvetan',
    title: 'Quantum System: Verifiable Proofs and Peer Review',
    year: 2026,
    month: 8,
    doi,
    url: `https://zenodo.org/records/${doi.split('/')[1]}`,
  }
}

/**
 * Publish workflow summary.
 * Ready when all 6 security fixes land.
 */
export function publishWorkflow(): readonly string[] {
  return [
    '1. Await security fix agents (30-45 min)',
    '2. git commit -m "security: implement all 6 hardening fixes for v1.0 publication"',
    '3. git tag -a v1.0.0 -m "Quantum System v1.0 - Peer-Verifiable Publication"',
    '4. git push origin v1.0.0',
    '5. Zenodo auto-deposit + DOI assignment',
    '6. Publication live: zenodo.org/records/XXXXX',
  ]
}
