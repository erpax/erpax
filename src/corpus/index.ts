/**
 * corpus — barrel for the shared corpus walker (matter-twin of index.mts).
 * Consumers entangle at `@/corpus`, not the deep `.mts` face.
 */
export {
  allSkills,
  buildDualities,
  dualOf,
  loadCorpus,
  norm,
  routeOf,
  SKILLS_DIR,
  walk,
  wikiMap,
} from './index.mts'
export type { Duality, LoadedAtom, SidebarItem } from './index.mts'
export {
  adminGroupOf,
  navigationGroupsFromPaths,
  navManifestFromPaths,
  pathNavMeta,
  routeOfPath,
  topNavAnchorsFromSequence,
} from '@/navigation'
export type { NavGroup, NavManifestEntry, PathNavMeta } from '@/navigation'
