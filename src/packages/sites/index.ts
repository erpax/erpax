/**
 * Sites — what is published: pages, posts, media, forms.
 *
 * One erpax app, delivered as one Payload plugin. It names only its anchors; the collections it
 * brings are computed from the relationship graph (see ../engine).
 *
 * @see src/packages/index.ts (the apps in order) · src/packages/engine/index.ts (the rule)
 */
import type { App } from '@/packages/engine'

export const sites: App = {
  slug: 'sites',
  title: 'Sites',
  anchors: ['pages', 'posts', 'media', 'categories', 'forms', 'form-submissions', 'redirects', 'search'],
}
