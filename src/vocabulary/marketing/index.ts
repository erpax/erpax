/**
 * vocabulary/marketing — the barrel. The components beside it are server components; this is the
 * one face `@/vocabulary/marketing` offers, so a caller never reaches past it into a file
 * ([[convention]]/import).
 *
 * The atom had matter, a SKILL and a test but no barrel, which made it TRINITY-INCOMPLETE: every
 * importer had to name a file, and a file is free to move. The face is what a refactor may not
 * quietly take away ([[rules]]/face).
 */
export { type MarketingComponentInventory, type MarketingComponentName } from './types'
export { default as CountryShowcase } from './CountryShowcase'
export { default as LiveAuditCounter } from './LiveAuditCounter'
export { default as PricingTable } from './PricingTable'
export { default as StandardsBadges } from './StandardsBadges'
