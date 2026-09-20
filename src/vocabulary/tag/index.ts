/**
 * vocabulary/tag — the barrel. The matter lives in the children beside it; this is the one face
 * `@/vocabulary/tag` offers, so a caller never reaches past it into a file ([[convention]]/import).
 *
 * The atom had matter, a SKILL and a test but no barrel, which made it TRINITY-INCOMPLETE: every
 * importer had to name a file, and a file is free to move. The face is what a refactor may not
 * quietly take away ([[rules]]/face).
 */
export { DEFAULT_CONTEXT, findOrCreateTags, tagListOn, type TagTarget } from './setTagList'
export { tagListField, type TagListFieldOptions } from './field'
export { taggedWith, type TaggedWithOptions } from './taggedWith'
