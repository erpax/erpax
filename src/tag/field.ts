/**
 * tag/field — `tagListField(context)`: the drop-in REPLACEMENT for a free-text
 * label / category / CSV column. It presents as an ordinary text field ("a, b,
 * c") so existing forms keep working, but it is **virtual** — not stored. On
 * read it is computed from taggings (`tagListOn` → `toTagListString`); on change
 * it reconciles into taggings (`setTagList`). The column of stored string-entropy
 * becomes content-addressed taggings — the gem's `<context>_list` accessor on
 * erpax's content-uuid model.
 *
 * This is the answer to "some text fields may be replaced from computed
 * tags/taggings": swap `{ name: 'labels', type: 'text' }` for
 * `tagListField('labels')` and the value lives in the shared taggings engine —
 * sliceable by `(context, tag)`, deduped by content-uuid, counted by the counter
 * cache, queryable by `taggedWith`. Zero per-collection schema.
 *
 * The target is addressed by the record's content-uuid (`uuid`, falling back to
 * `id`) + the collection slug; tenant is carried through for isolation. Writes
 * are guarded (a tagging slip must not break the host record's save).
 *
 * @standard ISO-25964-1:2011 controlled-vocabulary
 * @see ./list.ts · ./setTagList.ts · ./taggedWith.ts · ../tags
 */
import type { Field } from 'payload'
import { toTagListString } from '@/tag/list'
import { setTagList, tagListOn, DEFAULT_CONTEXT } from '@/tag/setTagList'

export interface TagListFieldOptions {
  /** Field name (default `${context}List`, e.g. context 'skill' → 'skillList'). */
  readonly name?: string
  /** Override the taggable collection slug (default the host collection's slug). */
  readonly taggableType?: string
  /** Admin label. */
  readonly label?: string
}

const relId = (v: unknown): string | number | undefined => {
  if (v == null) return undefined
  if (typeof v === 'object') {
    const o = v as { value?: string | number; id?: string | number }
    return o.value ?? o.id ?? undefined
  }
  return v as string | number
}

const targetOf = (
  data: unknown,
  collectionSlug: string | undefined,
  opts: TagListFieldOptions,
): { taggable: string; taggableType: string; tenantId?: string | number } | null => {
  const d = (data ?? {}) as Record<string, unknown>
  const taggable = d.uuid ?? d.id
  const taggableType = opts.taggableType ?? collectionSlug
  if (taggable == null || !taggableType) return null
  return { taggable: String(taggable), taggableType: String(taggableType), tenantId: relId(d.tenant) }
}

/**
 * A virtual text field whose value IS the record's tag list in `context`,
 * computed from / reconciled into the shared taggings engine.
 */
export function tagListField(context: string = DEFAULT_CONTEXT, opts: TagListFieldOptions = {}): Field {
  const name = opts.name ?? `${context}List`
  return {
    name,
    type: 'text',
    virtual: true,
    label: opts.label,
    admin: {
      description: `Tag list (context '${context}') — computed from taggings, edited as "a, b, c". Backed by the shared tags engine, not a stored column.`,
    },
    hooks: {
      afterRead: [
        async ({ data, req, collection }) => {
          const t = targetOf(data, collection?.slug, opts)
          if (!t || !req?.payload) return undefined
          try {
            const names = await tagListOn(req.payload, { ...t, context })
            return toTagListString(names)
          } catch {
            return undefined
          }
        },
      ],
      afterChange: [
        async ({ value, data, req, collection }) => {
          if (value == null || !req?.payload) return value
          const t = targetOf(data, collection?.slug, opts)
          if (!t) return value
          try {
            await setTagList(req.payload, { ...t, context }, String(value))
          } catch {
            /* guarded — reconcile failure must not break the host write */
          }
          return value
        },
      ],
    },
  }
}
