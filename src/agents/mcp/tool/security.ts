/**
 * Security MCP tool family — Slice RRRRRRRRR-cut1 (2026-05-11).
 *
 * Per user 'implement in mcp and erpax in sync'. Surfaces the uuid-
 * family self-protection layer (Conservation Law 58) as MCP tools so
 * external auditors / federation peers / Claude clients can:
 *
 *   - inventory the platform's residual attack surface
 *   - confirm production hardening at any moment
 *   - verify a deployment meets a minimum safety mode
 *
 * Tool family:
 *
 *   erpax.security.attackSurface  — closed escape-hatch enumeration + active mode
 *   erpax.security.assertMode     — verify minimum safety mode is active
 *
 * @standard ISO/IEC 27001 Annex A.14.2.5 secure-systems-engineering
 * @standard NIST SP 800-160 §3.4.2 trustworthy secure design
 * @audit Conservation Law 58 uuid-self-protection
 * @feature security_audit
 * @see /src/services/safety-mode/index.ts
 */
import { z } from 'zod'
import { makeToolI18n, registerToolI18n, type LocalizedString } from '@/agents/mcp/i18n'
import {
  attackSurfaceReport, assertMinimumMode, getSafetyMode,
  type SafetyMode,
} from '@/safety/mode'
import type { ErpaxMcpTool } from '@/agents/mcp/tool-defs'

const text = (s: string) => ({ content: [{ text: s, type: 'text' as const }] })
const json = (v: unknown) => text(JSON.stringify(v, null, 2))

const I18N: Record<string, LocalizedString> = {
  attackSurface: {
    en: 'Return the closed enumeration of uuid-family escape hatches (the residual attack surface after Conservation Laws 8/47/53/54/55/56/57 are wired) + the active SafetyMode. Auditors / federation peers can verify production hardening without source-reading.',
    bg: 'Връща затворения списък с механизми за заобикаляне на uuid-семейството (остатъчната атакувана повърхност след закони 8/47/53/54/55/56/57) + активния SafetyMode.',
    de: 'Liefert die geschlossene Aufzählung der uuid-Family-Escape-Hatches (verbleibende Angriffsfläche nach den Gesetzen 8/47/53/54/55/56/57) + den aktiven SafetyMode.',
    fr: 'Retourne l\'énumération fermée des échappatoires de la famille uuid (surface d\'attaque résiduelle après les lois 8/47/53/54/55/56/57) + le SafetyMode actif.',
  },
  assertMode: {
    en: 'Verify the active SafetyMode meets a minimum hardening floor. Use during deployment / boot to fail fast when env vars accidentally drop production into a less-hardened mode.',
    bg: 'Проверява дали активният SafetyMode покрива минимален праг за втвърдяване. Използвай при деплоймент / boot за бърз отказ.',
    de: 'Prüft, ob der aktive SafetyMode eine Mindesthärtungsschwelle erfüllt. Bei Deployment / Boot zur Fast-Fail-Validierung verwenden.',
    fr: 'Vérifie que le SafetyMode actif satisfait un seuil minimum de durcissement. Utiliser au déploiement / boot pour échouer rapidement.',
  },
}

for (const [k, v] of Object.entries(I18N)) {
  registerToolI18n(`erpax.security.${k}`, v)
}

export function buildSecurityTools(): ReadonlyArray<ErpaxMcpTool> {
  const tSurface = makeToolI18n('erpax.security.attackSurface')
  const tAssert = makeToolI18n('erpax.security.assertMode')

  return [
    {
      name: 'erpax.security.attackSurface',
      description: tSurface.desc(I18N.attackSurface!),
      parameters: {},
      async handler(_args, _req) {
        return json({
          activeMode: getSafetyMode(),
          ...attackSurfaceReport(),
        })
      },
    },
    {
      name: 'erpax.security.assertMode',
      description: tAssert.desc(I18N.assertMode!),
      parameters: {
        minimum: z.enum(['production', 'test', 'dev']).describe('Minimum SafetyMode the deployment must meet.'),
      },
      async handler(args, _req) {
        try {
          assertMinimumMode(args.minimum as SafetyMode)
          return json({ ok: true, activeMode: getSafetyMode(), minimum: args.minimum })
        } catch (err) {
          return json({
            ok: false,
            activeMode: getSafetyMode(),
            minimum: args.minimum,
            error: err instanceof Error ? err.message : String(err),
          })
        }
      },
    },
  ]
}
