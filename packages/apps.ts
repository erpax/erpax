/**
 * apps — what `src/packages` asks the root `packages/` folder to hold, as JSON on stdout.
 *
 * One line per run: every folder in `src/packages`, and for an app the collections the
 * relationship graph gives it, each with the import that reaches it. `packages/build.mjs` reads
 * this and generates the package: its manifest, its README and the entry that carries the app's
 * collections. Run by the build, never by hand:  tsx packages/apps.ts
 *
 * @see src/packages/engine/index.ts (the rule) · packages/build.mjs (the generator)
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import type { CollectionConfig } from 'payload'
import * as barrel from '@/collections'
import { APPS } from '@/packages'
import { partition } from '@/packages/engine'

export interface Generated {
  /** The folder in `src/packages`, and the package's leaf name: `@erpax/<name>`. */
  name: string
  title: string
  /** What the folder's banner says the package is. */
  about: string
  /** Set for an app: its export in `src/packages/<name>` and the collections it brings. */
  app?: { export: string; collections: Array<{ slug: string; name: string; from: string; isDefault: boolean }> }
}

const root = join(import.meta.dirname, '..')
const source = join(root, 'src', 'packages')

/** Every `export { A, default as B } from '…'` of the collections barrel: export name → where it comes from. */
const origins = new Map<string, { from: string; isDefault: boolean }>()
for (const [, names, from] of readFileSync(join(root, 'src', 'collections', 'index.ts'), 'utf8').matchAll(/^export \{([^}]+)\} from '([^']+)'/gm)) {
  for (const part of names!.split(',').map((s) => s.trim()).filter(Boolean)) {
    const renamed = /^default as (\w+)$/.exec(part)
    origins.set(renamed ? renamed[1]! : part, { from: from!, isDefault: renamed !== null })
  }
}

const collections = Object.entries(barrel).flatMap(([name, value]) => {
  const slug = (value as { slug?: unknown } | undefined)?.slug
  const origin = origins.get(name)
  return typeof slug === 'string' && origin ? [{ name, slug, fields: (value as CollectionConfig).fields, ...origin }] : []
})
const placed = partition(collections, APPS)

/** The banner's first sentence: ` * Title — what it is.` */
const aboutOf = (folder: string): string => {
  const line = /^ \* (.+)$/m.exec(readFileSync(join(source, folder, 'index.ts'), 'utf8'))?.[1] ?? folder
  return line.replace(/^[^—]*— /, '').replace(/\.$/, '')
}

const generated: Generated[] = readdirSync(source)
  .filter((name) => statSync(join(source, name)).isDirectory() && existsSync(join(source, name, 'index.ts')))
  .sort()
  .map((name) => {
    const app = APPS.find((candidate) => candidate.slug === name)
    return {
      name,
      title: app?.title ?? name.replace(/^./, (c) => c.toUpperCase()),
      about: aboutOf(name),
      ...(app
        ? { app: { export: name, collections: collections.filter((c) => placed.get(c.slug) === name).map(({ slug, name: exported, from, isDefault }) => ({ slug, name: exported, from, isDefault })).sort((a, b) => a.slug.localeCompare(b.slug)) } }
        : {}),
    }
  })

console.log(JSON.stringify(generated))
