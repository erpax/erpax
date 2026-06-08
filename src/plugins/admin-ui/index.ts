/**
 * admin-ui plugin — full Payload admin surface for erpax metadata.
 *
 * Injects list cells (path account · seal · horo · uuid chip), relationship
 * bond visualization, corpus nav, and dashboard rollup across every collection.
 */
import type { CollectionConfig, Config, Field, Plugin } from 'payload'

import { COLLECTION_DIAMOND_KEY } from '@/factory/collection-factory'
import { ERPAX_LIST_COLUMNS, erpaxMetaOf } from '@/admin/ui'
import {
  FIELD_ENTANGLEMENT_REGISTRY,
  fieldEntanglementKey,
} from '@/quantum/entanglement/registry'

const ENTANGLEMENT_TEXT_FIELD = '@/admin/ui/fields/EntanglementField'
const ENTANGLEMENT_REL_FIELD = '@/admin/ui/fields/EntanglementWarningField'

const isNamed = (f: Field): f is Field & { name: string } =>
  'name' in f && typeof (f as { name?: unknown }).name === 'string'

const cellPath = (p: string) => ({ path: p, clientProps: {} })

function injectErpaxMetaFields(collection: CollectionConfig, meta: ReturnType<typeof erpaxMetaOf>): Field[] {
  const props = {
    accountCode: meta.accountCode,
    horo: meta.horo,
    sealed: meta.sealed,
    atomPath: meta.atomPath,
  }
  return [
    {
      name: 'erpaxPathAccount',
      type: 'ui',
      label: 'Path account',
      admin: {
        position: 'sidebar',
        components: {
          Cell: { ...cellPath('@/admin/ui/cells/PathAccountCodeCell'), clientProps: props },
          Field: '@/admin/ui/fields/ErpaxMetaField',
        },
        custom: props,
      },
    },
    {
      name: 'erpaxSeal',
      type: 'ui',
      label: 'Seal',
      admin: {
        components: {
          Cell: { ...cellPath('@/admin/ui/cells/SealBadgeCell'), clientProps: props },
        },
      },
    },
    {
      name: 'erpaxHoro',
      type: 'ui',
      label: 'Horo',
      admin: {
        components: {
          Cell: { ...cellPath('@/admin/ui/cells/HoroDigitCell'), clientProps: props },
        },
      },
    },
  ]
}

function patchUuidCell(fields: Field[]): Field[] {
  return fields.map((f) => {
    if (!isNamed(f) || f.name !== 'uuid' || f.type !== 'text') return f
    return {
      ...f,
      admin: {
        ...f.admin,
        components: {
          ...f.admin?.components,
          Cell: '@/admin/ui/cells/ContentUuidChipCell',
        },
      },
    }
  })
}

const fieldPathOf = (name: string, prefix: string): string =>
  prefix ? `${prefix}.${name}` : name

/** Attach entanglement Field UI for registry-covered text/relationship fields. */
function patchEntangledFieldComponents(
  fields: Field[],
  collectionSlug: string,
  prefix = '',
): Field[] {
  return fields.map((f) => {
    if (f.type === 'group' && isNamed(f) && 'fields' in f) {
      return {
        ...f,
        fields: patchEntangledFieldComponents(f.fields, collectionSlug, fieldPathOf(f.name, prefix)),
      }
    }
    if (f.type === 'tabs' && 'tabs' in f) {
      return {
        ...f,
        tabs: f.tabs.map((tab) => ({
          ...tab,
          fields: patchEntangledFieldComponents(tab.fields, collectionSlug, prefix),
        })),
      }
    }
    if (!isNamed(f)) return f

    const fp = fieldPathOf(f.name, prefix)
    const key = fieldEntanglementKey(collectionSlug, fp)
    if (!(key in FIELD_ENTANGLEMENT_REGISTRY)) return f

    const componentPath =
      f.type === 'relationship' ? ENTANGLEMENT_REL_FIELD : ENTANGLEMENT_TEXT_FIELD
    if (f.admin?.components?.Field === componentPath) return f

    return {
      ...f,
      admin: {
        ...f.admin,
        components: {
          ...f.admin?.components,
          Field: componentPath,
        },
      },
    }
  })
}

function prependListColumns(collection: CollectionConfig): string[] {
  const existing = collection.admin?.defaultColumns ?? []
  const prepend = ERPAX_LIST_COLUMNS.filter((c) => !existing.includes(c))
  const withUuid = existing.includes('uuid') ? existing : ['uuid', ...existing]
  return [...prepend, ...withUuid.filter((c) => !prepend.includes(c))]
}

function enhanceCollection(collection: CollectionConfig): CollectionConfig {
  const meta = erpaxMetaOf(collection)
  const hasDiamond = !!(collection as Record<string, unknown>)[COLLECTION_DIAMOND_KEY]
  const fieldNames = new Set((collection.fields ?? []).filter(isNamed).map((f) => f.name))

  let fields = patchUuidCell([...(collection.fields ?? [])])
  fields = patchEntangledFieldComponents(fields, collection.slug)
  if (hasDiamond) {
    const injected = injectErpaxMetaFields(collection, meta).filter(
      (f) => isNamed(f) && !fieldNames.has(f.name),
    )
    fields = [...fields, ...injected]
  }

  return {
    ...collection,
    admin: {
      ...collection.admin,
      defaultColumns: prependListColumns(collection),
    },
    fields,
  }
}

export const adminUiPlugin = (): Plugin => (config: Config): Config => ({
  ...config,
  admin: {
    ...config.admin,
    components: {
      ...config.admin?.components,
      providers: [
        '@/admin/ui/ComputedCssAdminRoot',
        ...(config.admin?.components?.providers ?? []),
      ],
      afterDashboard: [
        ...(config.admin?.components?.afterDashboard ?? []),
        '@/admin/ui/dashboard/CorpusEntropyDashboard',
        '@/quantum/RadixDimensionPanel',
        '@/admin/ui/violations/ViolationMonitorPanel',
      ],
      beforeNavLinks: [
        '@/admin/ui/nav/CorpusNavLinks',
        ...(config.admin?.components?.beforeNavLinks ?? []),
      ],
    },
  },
  collections: (config.collections ?? []).map(enhanceCollection),
})
