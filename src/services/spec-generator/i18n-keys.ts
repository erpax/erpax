/**
 * i18n key derivation — canonical translation-key shape for every
 * spec-derived label (collection, chain, chain step, workflow, workflow
 * step). Pure helpers; zero file I/O.
 *
 * Slice CCCCC-cut2-i18n (2026-05-11): the multimedia + marketing +
 * admin-UI generators were minting captions from `humanise(slug)`,
 * defeating the multilingual surface. This module nails down the key
 * shape so generators + audit + stub-filler all agree on where a label
 * lives, and the existing 30-locale bundle pipeline can serve them.
 *
 * Key shape (BCP 47 namespaces):
 *
 *   collection.<slug>.singular            ← Payload labels.singular
 *   collection.<slug>.plural              ← Payload labels.plural
 *   collection.<slug>.description         ← admin.description
 *
 *   chain.<CHAIN_ID>.title                ← chain registry display name
 *   chain.<CHAIN_ID>.description          ← chain registry description
 *   chain.<CHAIN_ID>.steps.<step-id>      ← per-step label
 *
 *   workflow.<workflow>.title             ← e2e walkthrough display name
 *   workflow.<workflow>.description       ← optional summary
 *   workflow.<workflow>.steps.<step-id>   ← per-step screenshot caption
 *   workflow.<workflow>.video.caption     ← hero video caption
 *
 * Step ids preserve their original kebab-case (`01-quote-create`, etc.)
 * and are used as the leaf segment so bundles read naturally to a
 * translator scrolling top-to-bottom.
 *
 * @standard BCP-47 language-tag
 * @standard W3C i18n key-naming-best-practices
 * @rfc 8259 json
 * @see ../../i18n/index.ts (consumer — `localeRecord`, `nestedMessages`)
 */

/** Convert any slug-ish input to lower kebab-case (safe leaf for keys). */
function kebab(input: string): string {
  return input
    .replace(/[_\s]+/g, '-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9-.]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Convert slug → "Title Case" — used for default-English fallback content. */
export function humaniseSlug(slug: string): string {
  return slug
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim()
}

/** Per-collection label keys (matches existing `archive.singular` shape). */
export interface CollectionKeys {
  readonly singular: string
  readonly plural: string
  readonly description: string
}

export function collectionKeys(slug: string): CollectionKeys {
  const k = kebab(slug)
  return {
    singular:    `collection.${k}.singular`,
    plural:      `collection.${k}.plural`,
    description: `collection.${k}.description`,
  }
}

/** Per-chain label keys. */
export interface ChainKeys {
  readonly title: string
  readonly description: string
}

export function chainKeys(chainId: string): ChainKeys {
  // Chain ids are SCREAMING_SNAKE — lowercase so the bundle stays uniform.
  const k = chainId.toLowerCase()
  return {
    title:       `chain.${k}.title`,
    description: `chain.${k}.description`,
  }
}

/** Per-step label key for a chain. */
export function chainStepKey(chainId: string, stepId: string): string {
  return `chain.${chainId.toLowerCase()}.steps.${kebab(stepId)}`
}

/** Per-workflow label keys (e2e walkthrough surface). */
export interface WorkflowKeys {
  readonly title: string
  readonly description: string
  readonly videoCaption: string
}

export function workflowKeys(workflow: string): WorkflowKeys {
  const k = kebab(workflow)
  return {
    title:        `workflow.${k}.title`,
    description:  `workflow.${k}.description`,
    videoCaption: `workflow.${k}.video.caption`,
  }
}

/** Per-step caption key for a workflow screenshot. */
export function workflowStepKey(workflow: string, stepId: string): string {
  return `workflow.${kebab(workflow)}.steps.${kebab(stepId)}`
}

/** Default-English content derivation when no translation exists. */
export function defaultEnglishFor(key: string): string {
  // Strip the namespace, take the leaf, humanise.
  const leaf = key.split('.').pop() ?? key
  // Special leaves that aren't proper labels
  if (leaf === 'singular' || leaf === 'plural' || leaf === 'description' || leaf === 'caption' || leaf === 'title') {
    const parent = key.split('.').slice(-2, -1)[0] ?? leaf
    return humaniseSlug(parent)
  }
  return humaniseSlug(leaf)
}

/** Marker prefix used by stub-filler so translators can find untranslated rows. */
export const STUB_PREFIX = '[en] '

/** True when a locale value is a stub (untranslated EN passthrough). */
export function isStub(value: string): boolean {
  return value.startsWith(STUB_PREFIX)
}
