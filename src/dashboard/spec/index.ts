/**
 * dashboard/spec — the declarative widget / data-source / composition framework.
 *
 * ONE rule collapses the two ad-hoc widget shapes the corpus grew (pure-prop
 * vs. self-fetching-via-REST): WIDGETS ARE PURE. A widget receives an
 * already-resolved, typed view-model and renders it; a widget NEVER fetches.
 * Fetching is DECLARED, not coded, via a `WidgetSpec` whose `source` is one of
 * three sanctioned `DataSource` variants — never the raw env/REST
 * `AccountingClient` (a Bearer token + a hardcoded `localhost` baseUrl in the
 * browser is the violation this framework supersedes).
 *
 * Composition resolves SERVER-side (the Cloudflare Worker, where the D1 / Local
 * API binding lives — see payload.config getCloudflare()): `resolveDashboard`
 * gets the actor, COMPUTES capability from the access cross (NOT a hand-kept
 * role grid), filters widgets by the `read < write < sign < admin` lattice
 * (audit ⊥ additive overlay), and awaits every surviving `source.load` IN
 * PARALLEL with `overrideAccess:false` so tenant scope + the cross also deny at
 * the data layer (the UI gate hides, the data gate denies — defense in depth).
 * The resolved view-models serialize to the client; the pure widgets paint.
 *
 * @standard NIST INCITS-359 role-based-access-control
 * @standard ISO-27002 §5.15 access-control + §5.3 segregation-of-duties
 * @standard MCP 0.6 tools/list + tools/call (the mcp DataSource)
 * @quality ISO-25010 maintainability shared-vocabulary reusability
 * @see src/cross/index.ts                 (the access cross — capability + lattice)
 * @see src/accounting/reports.service.ts  (the primary localApi DataSource)
 * @see src/agents/mcp/in-process-client.ts (the mcp DataSource — one tool surface)
 * @see src/dashboard/SKILL.md
 */

import type React from 'react'
import type { Payload, PayloadRequest } from 'payload'

import type { AccessRole } from '@/uuid/share'
import { rolesCompatible } from '@/uuid/share'
import { actorCapabilityResolved } from '@/cross'
import { getUserContext } from '@/auth'
import { createInProcessMcpClient } from '@/agents/mcp'
import type { McpClient, ErpaxMcpTool } from '@/agents/mcp'

// Re-export the DTO → view-model projection so the atom's INDEX is the single face
// (`@/dashboard/spec`): the dashboard renderer + the analytics cards import the
// projectors from here, never the deep `./projection` file (the import convention —
// [[tamper]]/import). projection.ts is the ONLY place the reports.service DTO
// vocabulary meets the @/analytics view-model vocabulary.
export {
  projectTrialBalance,
  projectBalanceSheet,
  projectIncomeStatement,
} from './projection'

// ─── The load context every DataSource.load receives ─────────────────
//
// Computed once by the renderer and threaded to every loader. `payload` is the
// Local API; `req` carries the actor (so loads run in the actor's request with
// overrideAccess:false). The date/period fields are the dashboard's point-in-time
// selectors (the reports.service DTOs already carry asOfDate / periodStart-End).

export interface DashboardContext {
  /** The Payload Local API instance (the Worker's D1 binding). */
  readonly payload: Payload
  /** The actor's request — loads run inside it so the cross + tenant scope apply. */
  readonly req: PayloadRequest
  /** Active tenant id (from the actor's User.tenants[0]). */
  readonly tenantId: string
  /** Balance-sheet / trial-balance as-of date (ISO 8601). */
  readonly asOfDate: Date
  /** Income-statement period start (ISO 8601). */
  readonly periodStart: Date
  /** Income-statement period end (ISO 8601, usually === asOfDate). */
  readonly periodEnd: Date
}

// ─── DataSource — the tagged union of the THREE sanctioned sources ───
//
// localApi : the default — calls the Payload Local API (payload.find) or,
//            preferably, the existing pure service functions in
//            src/accounting/reports.service.ts (they ALREADY take payload +
//            tenant + date). The corpus-correct replacement for AccountingClient
//            READS.
// service  : pure compute over the generated uuid-matrix (src/analytics) — reads
//            no DB, so it needs no payload/req, only the ctx selectors.
// mcp      : routes through the MCP gateway via the in-process client — the SAME
//            handler the external Claude connector uses (one tool surface, two
//            callers). For agent-society / governance / share / chain reads that
//            are already exposed as MCP tools (src/agents/mcp/tool/*).

export interface LocalApiSource<TVM> {
  readonly kind: 'localApi'
  readonly load: (ctx: DashboardContext) => Promise<TVM>
}

export interface ServiceSource<TVM> {
  readonly kind: 'service'
  readonly load: (ctx: DashboardContext) => Promise<TVM>
}

export interface McpSource<TVM> {
  readonly kind: 'mcp'
  /** The MCP tool to call (e.g. 'erpax.share.list'). */
  readonly tool: string
  /** Args passed to the tool (defaults to the tenant scope). */
  readonly args?: (ctx: DashboardContext) => Record<string, unknown>
  /** Project the tool's JSON-text result into the widget's view-model. */
  readonly project: (raw: unknown) => TVM
}

export type DataSource<TVM> = LocalApiSource<TVM> | ServiceSource<TVM> | McpSource<TVM>

// ─── Theming lane (both are legitimate; a dashboard composes one set) ─
//
// 'tailwind'      : standalone statement widgets / dashboards (Tailwind classes).
// 'payload-admin' : widgets mounted INSIDE the Payload admin via admin.components
//                   (the `--theme-elevation-*` inline-style lane).

export type ThemeLane = 'tailwind' | 'payload-admin'

// ─── WidgetSpec — a declarative data-source binding for ONE pure widget ─

export interface WidgetSpec<TVM> {
  /** Stable key (also the React key). */
  readonly id: string
  /** An existing PURE widget: receives the resolved view-model, never fetches. */
  readonly Component: React.FC<{ data: TVM | null }>
  /** WHERE the data comes from — the sanctioned union, never raw env/REST. */
  readonly source: DataSource<TVM>
  /**
   * The lattice tier required to SEE this widget. For audit-trail widgets, set
   * `'audit'` — they unlock for any actor holding an audit grant (the additive
   * overlay), orthogonal to the read/write/sign/admin tier.
   */
  readonly minCapability: AccessRole
  /** Display title (i18n-projectable via localeRecord at the render edge). */
  readonly title: string
  /** Two-tier data: cached (default) vs. live (re-requests the same loader). */
  readonly live?: boolean
  /** Which theming lane this widget renders in (so a dashboard stays consistent). */
  readonly lane?: ThemeLane
}

/**
 * Existential wrapper — a heterogeneous list of WidgetSpecs (each with a DIFFERENT
 * TVM) cannot be a `WidgetSpec<TVM>[]` without erasing the per-widget type link.
 * `AnyWidgetSpec` keeps each spec internally well-typed (Component ⟷ source ⟷ TVM
 * agree at the construction site) while allowing a mixed dashboard array.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyWidgetSpec = WidgetSpec<any>

// ─── DashboardSpec — a named composition of widgets for an audience ──

export interface DashboardSpec {
  /** Stable dashboard id (e.g. 'admin-control'). */
  readonly id: string
  /** Human label for the dashboard (i18n-projectable). */
  readonly title: string
  /** The capability tier this dashboard targets (drives selectDashboard). */
  readonly audience: AccessRole
  /** The widgets — heterogeneous TVMs, each spec internally well-typed. */
  readonly widgets: readonly AnyWidgetSpec[]
}

// ─── Visibility — the SAME lattice the access cross uses ─────────────

/**
 * Can an actor with `actorCapability` (+ whether they hold an audit grant) SEE a
 * widget requiring `minCapability`?
 *
 *   • audit widgets (`minCapability === 'audit'`) unlock iff the actor holds an
 *     audit grant — the additive overlay, regardless of their read/write tier.
 *   • every other widget gates on the lattice: rolesCompatible(actorCapability,
 *     minCapability). A pure-audit actor (capability 'audit') is NOT compatible
 *     with 'read' (audit ⊥), so audit-only actors see only audit widgets unless
 *     they ALSO hold a concrete tier — exactly the cross's semantics.
 */
export function widgetVisible(
  minCapability: AccessRole,
  actorCapability: AccessRole | null,
  holdsAudit: boolean,
): boolean {
  if (minCapability === 'audit') return holdsAudit
  if (actorCapability === null) return false
  return rolesCompatible(actorCapability, minCapability)
}

// ─── Loading — resolve ONE DataSource to its view-model ──────────────

async function loadSource<TVM>(
  source: DataSource<TVM>,
  ctx: DashboardContext,
  mcp: McpClient,
): Promise<TVM> {
  switch (source.kind) {
    case 'localApi':
    case 'service':
      return source.load(ctx)
    case 'mcp': {
      const text = await mcp.callTool(source.tool, source.args ? source.args(ctx) : { tenantId: ctx.tenantId })
      // MCP tool handlers return JSON text; parse before projecting. A
      // non-JSON payload is surfaced as the raw string to project().
      let raw: unknown = text
      try {
        raw = JSON.parse(text)
      } catch {
        /* leave as string — project() decides */
      }
      return source.project(raw)
    }
  }
}

/** A widget paired with its resolved view-model (null if its load failed). */
export interface ResolvedWidget {
  readonly spec: AnyWidgetSpec
  /** The resolved view-model, or null when the load rejected (widget renders its empty state). */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly data: any | null
  /** Present only when the load rejected — for server-side logging, not the client. */
  readonly error?: string
}

/**
 * resolveDashboard — the SERVER-side resolver every dashboard slice builds on.
 *
 *   (a) resolve the actor (getUserContext) + COMPUTE capability from the live
 *       Role entities via the access cross (actorCapabilityResolved — a Role-row
 *       `capability` edit re-tunes the dashboard with NO code change).
 *   (b) filter `spec.widgets` by the lattice (widgetVisible) — audit ⊥ overlay.
 *   (c) await every surviving `source.load(ctx)` IN PARALLEL; each runs in the
 *       actor's request so overrideAccess:false enforces row-level access too.
 *   (d) return the resolved view-models; the caller serializes them to the
 *       pure widgets. A single load failing yields `{ data: null }` for that
 *       widget (it renders its empty/loading state) — one widget never sinks the
 *       page.
 *
 * `mcpTools` is the set of MCP tools the `mcp` DataSources may call — the SAME
 * descriptors the external connector exposes (governance/share/chain). Empty by
 * default (dashboards with no mcp widgets need none).
 */
export async function resolveDashboard(
  spec: DashboardSpec,
  ctx: DashboardContext,
  mcpTools: ReadonlyArray<ErpaxMcpTool> = [],
): Promise<readonly ResolvedWidget[]> {
  const actorCapability = await actorCapabilityResolved(ctx.req)
  const holdsAudit = (getUserContext(ctx.req)?.roles ?? []).some(
    (r) => r === 'auditor' || r === 'audit-staff',
  )

  const visible = spec.widgets.filter((w) => widgetVisible(w.minCapability, actorCapability, holdsAudit))
  const mcp = createInProcessMcpClient(mcpTools, ctx.req)

  return Promise.all(
    visible.map(async (s): Promise<ResolvedWidget> => {
      try {
        const data = await loadSource(s.source, ctx, mcp)
        return { spec: s, data }
      } catch (err) {
        return { spec: s, data: null, error: err instanceof Error ? err.message : String(err) }
      }
    }),
  )
}

// ─── selectDashboard — capability → base dashboard (computed, not a grid) ─
//
// The actor's capability (already merged over their roles by the access cross)
// maps to a base dashboard; audit ⊥ is an additive overlay handled at the
// widget level (audit widgets unlock independently). Mirrors DEFAULT_ROLE_CAPABILITY:
//   admin → Admin Control · sign → Controller/Close · write → Operator ·
//   read → Read-only Overview · (audit, alone) → Auditor.

/**
 * Pick the base DashboardSpec for an actor's capability from a registry keyed by
 * tier. A pure-audit actor (capability 'audit', no concrete tier) falls to the
 * 'audit' entry if present, else the 'read' entry (observe-only). Null capability
 * (no roles) → null (no dashboard).
 */
export function selectDashboard(
  capability: AccessRole | null,
  registry: Readonly<Partial<Record<AccessRole, DashboardSpec>>>,
): DashboardSpec | null {
  if (capability === null) return null
  if (capability === 'audit') return registry.audit ?? registry.read ?? null
  // Walk DOWN the lattice from the actor's tier to the first registered dashboard
  // (a 'sign' actor with no Controller dashboard still gets Operator, etc.).
  const ladder: readonly AccessRole[] = ['admin', 'sign', 'write', 'read']
  const start = ladder.indexOf(capability)
  for (let i = start < 0 ? 0 : start; i < ladder.length; i++) {
    const d = registry[ladder[i]]
    if (d) return d
  }
  return null
}
