/**
 * Versions MCP tool family — restore a document to a prior version (the
 * upstream ActiveAdmin `reify` action, ported).
 *
 * Upstream (papertrail) exposed `batch_action :reify { version.reify; save }`
 * — restore a record to a stored version. erpax keeps the write-side audit
 * trail via Payload Versions/Drafts (the `defaultVersionedDrafts` block on the
 * content collections). This tool ports `reify` as one capability: given a
 * versioned collection + the version id, drive `req.payload.restoreVersion` so
 * the restore runs through Payload Versions and fires the collection's
 * afterChange hooks — NEVER a raw write.
 *
 * The versioned-collection set is **computed from the live config** at call
 * time (`req.payload.config.collections[].versions`), never hardcoded — the day
 * another collection enables versions, this tool covers it with no edit
 * (computed-not-hardcoded law).
 *
 * The admin/tenant guard is supplied once by `wrapToolsWithTenantGuard` (this
 * tool is in STATE_MUTATING_TOOLS and carries a `tenantId` param); no in-handler
 * guard (DRY).
 *
 * @standard MCP 0.6 — tools/list + tools/call result shape {content:[{type,text}]}
 * @standard ISO 19011:2018 §6.4.6 audit-evidence (version history is the trail)
 * @compliance SOX §404 internal-controls record-retention
 * @see ../../../../collections/shared/versionedDrafts.ts defaultVersionedDrafts
 * @see ../i18n.ts makeToolI18n + registerToolI18n
 */
import { z } from 'zod'
import { makeToolI18n, registerToolI18n, type LocalizedString } from '../i18n'
import type { ErpaxMcpTool } from '../tool-defs'

const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
const json = (v: unknown) => text(JSON.stringify(v, null, 2))

const I18N: Record<string, LocalizedString> = {
  restore: {
    en: 'Restore a document to a prior version (the upstream ActiveAdmin `reify`). Given a versioned collection + the version id, drives req.payload.restoreVersion so the restore runs through Payload Versions and fires afterChange hooks (no raw write). The versioned-collection set is computed from the live config, not hardcoded. Admin-gated per tenant. ISO 19011:2018 §6.4.6 audit-trail; SOX §404 record-retention.',
    bg: 'Възстановяване на документ до предишна версия (upstream ActiveAdmin `reify`). При версионирана колекция + id на версията извиква req.payload.restoreVersion, така че възстановяването минава през Payload Versions и задейства afterChange hooks (без директен запис). Наборът версионирани колекции се изчислява от живата конфигурация. ISO 19011:2018 §6.4.6; SOX §404.',
    de: 'Stellt ein Dokument auf eine frühere Version wieder her (ActiveAdmin `reify`). Mit einer versionierten Collection + der Versions-ID ruft es req.payload.restoreVersion auf, sodass die Wiederherstellung über Payload Versions läuft und afterChange-Hooks feuern (kein roher Schreibvorgang). Die Menge versionierter Collections wird aus der Live-Konfiguration berechnet. ISO 19011:2018 §6.4.6; SOX §404.',
    fr: "Restaure un document à une version antérieure (le `reify` d'ActiveAdmin). Pour une collection versionnée + l'id de version, appelle req.payload.restoreVersion afin que la restauration passe par Payload Versions et déclenche les hooks afterChange (aucune écriture brute). L'ensemble des collections versionnées est calculé depuis la configuration vivante, non codé en dur. ISO 19011:2018 §6.4.6 ; SOX §404.",
  },
}

for (const [k, v] of Object.entries(I18N)) {
  registerToolI18n(`erpax.versions.${k}`, v)
}

export function buildVersionsTools(): ReadonlyArray<ErpaxMcpTool> {
  const tRestore = makeToolI18n('erpax.versions.restore')
  return [
    {
      name: 'erpax.versions.restore',
      description: tRestore.desc(I18N.restore!),
      parameters: {
        collection: z.string().min(1),
        versionId: z.string().min(1),
        tenantId: z.string().min(1),
      },
      async handler(args, req) {
        const collection = args.collection as string
        const versionId = args.versionId as string

        // Computed (not hardcoded): only collections that actually enable
        // Payload Versions can be reified. Read the live sanitized config.
        const cfg = req.payload.config.collections.find((c) => c.slug === collection)
        if (!cfg?.versions) {
          const versioned = req.payload.config.collections
            .filter((c) => c.versions)
            .map((c) => c.slug)
          return json({
            ok: false,
            collection,
            error: `collection '${collection}' has no versions enabled`,
            versionedCollections: versioned,
          })
        }

        try {
          // restoreVersion's `id` IS the version id (per the Payload Local API).
          // Drive it through the Local API so afterChange hooks fire; access
          // control + transaction preserved via overrideAccess:false + req.
          const restored = await req.payload.restoreVersion({
            collection: collection as never,
            id: versionId,
            overrideAccess: false,
            req,
          })
          return json({
            ok: true,
            collection,
            restoredFromVersion: versionId,
            documentId: (restored as { id?: unknown }).id,
            updatedAt: (restored as { updatedAt?: unknown }).updatedAt,
          })
        } catch (error) {
          return json({
            ok: false,
            collection,
            versionId,
            error: error instanceof Error ? error.message : String(error),
          })
        }
      },
    },
  ]
}
