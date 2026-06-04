/**
 * link — one accountable object, three coexisting facets:
 * a richText/admin link `field` (Payload), a `linkGroup` array factory,
 * and the frontend `CMSLink` React component. Internal Payload doc
 * reference or external URL, locale-aware.
 *
 * @rfc 3986 uniform-resource-identifier
 * @standard W3C URL Living Standard
 * @standard W3C HTML5 anchor-element
 * @standard W3C HTML5 nav-element
 * @standard BCP-47 language-tag locale-aware-routing
 * @compliance WCAG-2.1 §2.4.4 link-purpose-in-context
 * @compliance WCAG-2.1 §2.4.9 link-purpose-link-only
 * @see docs/STANDARDS.md §3
 */

export { appearanceOptions, link, type LinkAppearances } from '@/link/field'
export { linkGroup } from '@/link/group'

// CMSLink is a client React component ('use client'); re-exported for name
// resolution. Server-only importers should prefer the specific facet files
// (@/link/field, @/link/group) to avoid pulling the client bundle.
export { CMSLink } from '@/link/Component'
