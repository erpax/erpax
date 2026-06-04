/**
 * shadcn/ui composition map — Slice MMMMMM extension.
 *
 * Per user 'and here you can use the whole power of shadcn for
 * anything beyond payload'. Payload owns the data + admin + lexical
 * content; shadcn owns every interactive surface beyond it:
 *
 *   - Live MCP playground (Command palette + Sheet + ScrollArea)
 *   - Conservation-laws dashboard (Card + Badge + Progress + Chart)
 *   - Spec corpus browser (DataTable + DropdownMenu + Combobox)
 *   - Tenant-role activator (Stepper + RadioGroup + Form + Toast)
 *   - Federation explorer (NetworkChart + Sheet + HoverCard)
 *   - Audit-trail viewer (Timeline + Drawer + JsonViewer)
 *   - Cloning UI (Dialog + Progress + Stepper + Receipt card)
 *   - Stripe checkout embed (Form + Skeleton + Toast)
 *
 * shadcn components are COPIED into the repo (not bundled), Radix-
 * based, Tailwind-styled, and theme via CSS variables — same
 * pattern as ERPax's own design tokens, so light/dark mode + i18n +
 * RTL (for `ar` locale) come for free.
 *
 * Conservation: every shadcn component used MUST satisfy WCAG 2.2
 * AA (Radix handles keyboard nav + ARIA; we audit colour contrast
 * via Law 16's tenant-role audit policy).
 *
 * @standard shadcn/ui (Radix UI + Tailwind CSS)
 * @standard W3C WAI-ARIA 1.2 + WCAG 2.2 AA
 * @standard W3C Open Graph + Schema.org (carried by surrounding pages)
 */

export type SiteSurface =
  | 'mcp-playground'           // try any erpax.* tool live
  | 'conservation-dashboard'   // 28 laws live status per tenant
  | 'spec-corpus-browser'      // browseable CollectionSpec / Chain / Agent / Standard
  | 'tenant-role-activator'    // wizard: pick role → activate → boot tenant
  | 'federation-explorer'      // visualize peer ERPax instances + cross-broadcasts
  | 'audit-trail-viewer'       // Merkle leaves + content-uuid verification per row
  | 'cloning-ui'               // publishSelf → bootFromFederation flow
  | 'stripe-checkout-embed'    // commerce.checkout in-page modal
  | 'standards-graph-viz'      // citation/conflict/supersession graph (slice LLLLLL)
  | 'walkthrough-player'       // marketing/*.html storyboard with controls
  | 'i18n-coverage-heatmap'    // 30 locales × N keys live coverage
  | 'cost-carbon-meter'        // Law 15+16 live spending + gCO2e

export interface ShadcnComponentSet {
  readonly surface: SiteSurface
  readonly required: ReadonlyArray<string>      // shadcn component names
  readonly mcpTools: ReadonlyArray<string>      // erpax.* tools the surface invokes
  readonly schemaOrgType: string                // for SEO vortex coupling
  readonly description: string
}

export const SHADCN_SURFACE_MAP: ReadonlyArray<ShadcnComponentSet> = [
  {
    surface: 'mcp-playground',
    required: ['Command', 'Sheet', 'ScrollArea', 'Button', 'Code', 'Toast', 'Tabs', 'Combobox'],
    mcpTools: ['*'],
    schemaOrgType: 'WebApplication',
    description: 'Cmd+K to fuzzy-search any of the 53 erpax.* tools; selected tool opens in a Sheet with parameter inputs + live JSON response.',
  },
  {
    surface: 'conservation-dashboard',
    required: ['Card', 'Badge', 'Progress', 'Chart', 'HoverCard', 'Tabs', 'Skeleton'],
    mcpTools: ['erpax.standards.lawConsistency', 'erpax.standards.lawSupersessions', 'erpax.commerce.lifecycleAudit', 'erpax.accounting.lifecycleAudit', 'erpax.integrity.auditTenant', 'erpax.refs.findDangling'],
    schemaOrgType: 'Dataset',
    description: 'Live status of all 28 conservation laws per tenant; pass=teal, warn=amber, fail=red; click any law to see offenders.',
  },
  {
    surface: 'spec-corpus-browser',
    required: ['DataTable', 'DropdownMenu', 'Combobox', 'Sheet', 'Code', 'Pagination'],
    mcpTools: ['erpax.spec.getCollection', 'erpax.spec.getChainRegistry', 'erpax.agents.list', 'erpax.standards.classify'],
    schemaOrgType: 'Dataset',
    description: 'Faceted table of every CollectionSpec / Chain / Agent / Standard family; row click opens the JSDoc spec + standards citations + try-it-via-MCP CTA.',
  },
  {
    surface: 'tenant-role-activator',
    required: ['Stepper', 'RadioGroup', 'Form', 'Toast', 'Card', 'Sheet'],
    mcpTools: ['erpax.commerce.checkout', 'erpax.commerce.provisionInstance', 'erpax.platform.bootFromFederation'],
    schemaOrgType: 'BuyAction',
    description: '4-step wizard: pick role profile → enter company details → Stripe checkout → CF Worker provisioned + clone booted.',
  },
  {
    surface: 'federation-explorer',
    required: ['NetworkChart', 'Sheet', 'HoverCard', 'Badge', 'Avatar'],
    mcpTools: ['erpax.platform.publishSelf', 'erpax.refs.resolve'],
    schemaOrgType: 'Dataset',
    description: 'Force-directed graph of peer ERPax instances; node click → DID + last broadcast + trust-graph entries; edge thickness = broadcast volume.',
  },
  {
    surface: 'audit-trail-viewer',
    required: ['Timeline', 'Drawer', 'JsonViewer', 'Badge', 'Code', 'Tabs'],
    mcpTools: ['erpax.audit.getEvidence', 'erpax.integrity.verifyObject', 'erpax.anchoring.list'],
    schemaOrgType: 'Action',
    description: 'Reverse-chronological Merkle audit leaves; click a leaf → drawer shows uuid + content + signature + chain anchor.',
  },
  {
    surface: 'cloning-ui',
    required: ['Dialog', 'Progress', 'Stepper', 'Card', 'Code', 'Toast'],
    mcpTools: ['erpax.platform.publishSelf', 'erpax.platform.bootFromFederation'],
    schemaOrgType: 'CreateAction',
    description: 'publishSelf → genome bundle preview → confirm → bootFromFederation on a target instance → live integrity check (Law 24).',
  },
  {
    surface: 'standards-graph-viz',
    required: ['NetworkChart', 'Sheet', 'Badge', 'HoverCard', 'Tabs', 'Combobox'],
    mcpTools: ['erpax.standards.listCitations', 'erpax.standards.listConflicts', 'erpax.standards.traceSupersession', 'erpax.standards.classify'],
    schemaOrgType: 'Dataset',
    description: 'Per the 7 standards-as-vortices families (slice LLLLLL): force-directed graph; nodes coloured by family; edges = citation/conflict/supersession; click → Sheet shows the standard text.',
  },
  {
    surface: 'walkthrough-player',
    required: ['Card', 'AspectRatio', 'Button', 'Tabs', 'Badge', 'ScrollArea'],
    mcpTools: ['erpax.multimedia.render', 'erpax.marketing.transparencyCheck'],
    schemaOrgType: 'VideoObject',
    description: 'Per-locale walkthrough with hero <video> + storyboard cards + UX-gap callouts + downloadable Playwright trace.',
  },
  {
    surface: 'i18n-coverage-heatmap',
    required: ['Chart', 'HoverCard', 'Combobox', 'Badge'],
    mcpTools: ['erpax.i18n.audit', 'erpax.i18n.translate'],
    schemaOrgType: 'Dataset',
    description: '30 locales × N spec-derived keys heatmap; cell colour = native / [en]-stub / missing; click → translate via Workers AI.',
  },
  {
    surface: 'cost-carbon-meter',
    required: ['Card', 'Chart', 'Progress', 'Badge'],
    mcpTools: ['erpax.commerce.lifecycleAudit', 'erpax.accounting.lifecycleAudit'],
    schemaOrgType: 'Dataset',
    description: 'Live tenant cost (Law 15) + carbon (Law 16) — sparkline of last 30 days + budget burn-down + ESRS E1 export.',
  },
  {
    surface: 'stripe-checkout-embed',
    required: ['Dialog', 'Form', 'Skeleton', 'Button', 'Toast', 'Card'],
    mcpTools: ['erpax.commerce.checkout', 'erpax.marketing.buildOnboardingDrip'],
    schemaOrgType: 'BuyAction',
    description: 'In-page Stripe checkout modal; on payment success → fire bootFromFederation + start the 5-email onboarding drip.',
  },
]

/** Look up the shadcn component set for a given surface. */
export function shadcnSurfaceFor(surface: SiteSurface): ShadcnComponentSet | undefined {
  return SHADCN_SURFACE_MAP.find((s) => s.surface === surface)
}

/** Total set of unique shadcn components needed across all surfaces. */
export function allRequiredShadcnComponents(): ReadonlyArray<string> {
  const all = new Set<string>()
  for (const s of SHADCN_SURFACE_MAP) for (const c of s.required) all.add(c)
  return [...all].sort()
}
