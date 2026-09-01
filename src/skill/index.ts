/**
 * skill — the atom's face.
 *
 * DELIBERATELY NARROW: this barrel exposes `./frontmatter` ONLY. It does NOT
 * re-export `./router`, because `skill/router/skills.index.ts` is a ~77MB generated
 * bundle and a barrel that pulled it in would drag the whole corpus into every
 * importer ([[agent]]/skill-context loads it lazily for exactly this reason).
 *
 * Reach the router through its own path — `@/skill/router/...` — never through here.
 */
export * from './frontmatter'

export * from './wire'
