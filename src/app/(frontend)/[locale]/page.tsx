/**
 * Locale home page — re-exports the dynamic-slug page template.
 *
 * @standard schema.org WebSite
 * @see ./[slug]/page.tsx
 * @see src/app/README.md
 */

import PageTemplate, { generateMetadata } from './[slug]/page'

export default PageTemplate

export { generateMetadata }
