import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

export const beforeSyncWithSearch: BeforeSync = async ({ req, originalDoc, searchDoc }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  const { slug, id, categories, title, meta } = originalDoc

  // Every collection now feeds search, but only `posts`-shaped docs carry a
  // `title`/`meta`. Resolve a usable title from the common identity fields so a
  // GL account / invoice / customer indexes under something searchable, not blank.
  const src = originalDoc as Record<string, unknown>
  const firstString = (...keys: string[]): string | undefined => {
    for (const k of keys) {
      const v = src[k]
      if (typeof v === 'string' && v.trim()) return v
      if (typeof v === 'number') return String(v)
    }
    return undefined
  }
  const resolvedTitle =
    (typeof title === 'string' && title) ||
    meta?.title ||
    firstString(
      'name',
      'fullName',
      'displayName',
      'label',
      'accountNumber',
      'accountName',
      'number',
      'invoiceNumber',
      'reference',
      'code',
      'sku',
      'email',
      'description',
    ) ||
    (id != null ? String(id) : undefined)

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    title: (searchDoc as { title?: string }).title || resolvedTitle,
    slug,
    meta: {
      ...meta,
      title: meta?.title || resolvedTitle,
      image: meta?.image?.id || meta?.image,
      description: meta?.description,
    },
    categories: [],
  }

  if (categories && Array.isArray(categories) && categories.length > 0) {
    const populatedCategories: { id: string | number; title: string }[] = []
    for (const category of categories) {
      if (!category) {
        continue
      }

      if (typeof category === 'object') {
        populatedCategories.push(category)
        continue
      }

      const doc = await req.payload.findByID({
        collection: 'categories',
        id: category,
        disableErrors: true,
        depth: 0,
        select: { title: true },
        req,
      })

      if (doc !== null) {
        populatedCategories.push(doc)
      } else {
        console.error(
          `Failed. Category not found when syncing collection '${collection}' with id: '${id}' to search.`,
        )
      }
    }

    modifiedDoc.categories = populatedCategories.map((each) => ({
      relationTo: 'categories',
      categoryID: String(each.id),
      title: each.title,
    }))
  }

  return modifiedDoc
}
