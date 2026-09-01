/**
 * convention — the registry of the corpus's conventions. Each convention is a check-atom exposing a
 * pure `coverage(): number` ∈ [0,1] computed live over the real tree (no default). The [[collider]]
 * composes these into one tamper-cost: the joint coverage is their product, ∞ only when every
 * convention is computed clean. This index is the ONE list the collider reads — add a convention here
 * and it becomes a factor in the product; the gate gaps are exactly the conventions not yet at 1.
 *
 * @audit each coverage is a live computation in its atom; this file only collects them, no logic
 * @see ./import -- ./dry -- ./lawful -- ./link -- ./named -- ./sealed -- ../collider -- ./SKILL.md
 */
import { coverage as addressed } from '@/convention/addressed'
import { coverage as complete } from '@/convention/complete'
import { coverage as dry } from '@/convention/dry'
import { coverage as folded } from '@/convention/folded'
import { coverage as fresh } from '@/convention/fresh'
import { coverage as fronted } from '@/convention/fronted'
import { coverage as honest } from '@/convention/honest'
import { coverage as cImport } from '@/convention/import'
import { coverage as lawful } from '@/convention/lawful'
import { coverage as link } from '@/convention/link'
import { coverage as named } from '@/convention/named'
import { coverage as reciprocal } from '@/convention/reciprocal'
import { coverage as sealed } from '@/convention/sealed'
import { coverage as shallow } from '@/convention/shallow'
import { coverage as sourced } from '@/convention/sourced'
import { coverage as triggered } from '@/convention/triggered'
import { coverage as twinned } from '@/convention/twinned'

/** The corpus's conventions — each a law with a live coverage() over the real tree. */
export const CONVENTIONS: ReadonlyArray<{ readonly law: string; readonly coverage: () => number }> = [
  { law: 'addressed', coverage: addressed },
  { law: 'complete', coverage: complete },
  { law: 'dry', coverage: dry },
  { law: 'folded', coverage: folded },
  { law: 'fresh', coverage: fresh },
  { law: 'fronted', coverage: fronted },
  { law: 'honest', coverage: honest },
  { law: 'import', coverage: cImport },
  { law: 'lawful', coverage: lawful },
  { law: 'link', coverage: link },
  { law: 'named', coverage: named },
  { law: 'reciprocal', coverage: reciprocal },
  { law: 'sealed', coverage: sealed },
  { law: 'shallow', coverage: shallow },
  { law: 'sourced', coverage: sourced },
  { law: 'triggered', coverage: triggered },
  { law: 'twinned', coverage: twinned },
]

/** The live convention checks — each law and its computed coverage. The collider's factors. */
export const conventionChecks = (): { law: string; coverage: number }[] =>
  CONVENTIONS.map((c) => ({ law: c.law, coverage: c.coverage() }))
