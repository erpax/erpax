/**
 * MCP self-presentation as microdata + Open Graph — Slice YYYYYY (2026-05-11).
 *
 * Per user 'let mcp present itself as microdata open graphs'. After
 * VVVVVV (discoverable) + WWWWWW (self-built) + XXXXXX (self-
 * standardized), the MCP layer self-presents: every tool becomes a
 * Schema.org Action + an Open Graph card + a registered SeoVortexFace
 * (slice NNNNNN) — the MCP catalog couples into the SEO graph the
 * exact same way the website pages do (§0h Law 29).
 *
 * The mental model: every MCP tool is a publicly-addressable
 * **action** (in the Schema.org Action vocabulary sense). Search
 * engines index it; social previews carry it; AI training crawlers
 * (ClaudeBot / GPTBot / Google-Extended) ingest it; federation peers
 * (slice AAAAAA) discover it without a custom protocol.
 *
 *   Tool                  → Schema.org Action + OG card + SeoVortexFace
 *   Area (one of 25)      → Schema.org CollectionPage cross-linking its tools
 *   Spec primitives       → already faces (collections + chains + agents + roles)
 *   ↑↑↑ NNNNNN crossLink() now binds tools ↔ specs ↔ standards ↔ chains
 *
 * Concretely: after `registerAllMcpFaces(origin)` runs, calling
 * `erpax.seo.crossLink()` from slice NNNNNN populates incoming edges
 * for tool-faces from spec-corpus faces (each chain's
 * `derivedFrom: erpax.auto.chain.<id>`); for area-faces from tool-
 * faces (each tool's `isPartOf: <area>`); for the root MCP face from
 * area-faces (each area's `isPartOf: erpax.platform.mcp`).
 *
 * **Conservation Law 39** — `checkMcpPresentationCoverage`: every
 * registered MCP tool MUST have a corresponding SeoVortexFace with
 * the correct schemaType (Action) and ≥1 outbound microdata edge.
 *
 * @standard W3C JSON-LD 1.1 + Schema.org Action vocabulary
 * @standard W3C Microdata 1.1 + Open Graph protocol + Twitter Cards
 * @standard MCP 0.6 — tools/list (presentation extension)
 * @audit ISO 19011:2018 §6.4.6 (MCP surface SEO-traceable)
 */

import type { ErpaxMcpTool } from '@/agents/mcp/tool-defs'
import { CANONICAL_AREAS } from '@/agents/mcp/standardization'
import { registerFace, listFaces, type SeoVortexFace } from '@/website'

// ─── Schema.org Action JSON-LD per tool ────────────────────────────

export interface ToolAsAction {
  readonly '@context': 'https://schema.org'
  readonly '@type': 'Action'
  readonly name: string
  readonly description: string
  readonly identifier: string                // tool name
  readonly target: {
    readonly '@type': 'EntryPoint'
    readonly urlTemplate: string             // mcp://{origin}/tools/{toolName}
    readonly contentType: 'application/json'
    readonly httpMethod: 'POST'
  }
  readonly actionStatus: 'PotentialActionStatus'
  readonly category: string                  // canonical area
  readonly potentialAction: ReadonlyArray<{ '@type': 'CreateAction'; name: string }>
}

export function mcpToolAsAction(tool: ErpaxMcpTool, origin: string): ToolAsAction {
  const m = tool.name.match(/^erpax\.([a-z][a-z0-9-]*)\.([a-zA-Z][a-zA-Z0-9-]*)$/)
  const area = m?.[1] ?? 'misc'
  const verb = m?.[2] ?? 'invoke'
  return {
    '@context': 'https://schema.org',
    '@type': 'Action',
    name: tool.name,
    description: tool.description,
    identifier: tool.name,
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${origin}/mcp/tools/${tool.name}`,
      contentType: 'application/json',
      httpMethod: 'POST',
    },
    actionStatus: 'PotentialActionStatus',
    category: area,
    potentialAction: [{ '@type': 'CreateAction', name: verb }],
  }
}

// ─── Open Graph meta per tool ──────────────────────────────────────

export interface ToolOgMeta {
  readonly title: string
  readonly description: string
  readonly url: string
  readonly type: 'article'
  readonly siteName: 'ERPax MCP'
  readonly tags: ReadonlyArray<string>
}

export function mcpToolAsOg(tool: ErpaxMcpTool, origin: string): ToolOgMeta {
  return {
    title: `MCP tool: ${tool.name}`,
    description: tool.description.length > 200 ? tool.description.slice(0, 197) + '...' : tool.description,
    url: `${origin}/mcp/tools/${tool.name}`,
    type: 'article',
    siteName: 'ERPax MCP',
    tags: [
      tool.name.split('.')[1] ?? 'misc',                 // area
      ...Object.keys(tool.parameters).slice(0, 5),       // first 5 param names as tags
    ],
  }
}

/** Render the full <head> snippet (JSON-LD + OG + Twitter) for a tool page. */
export function renderToolHead(tool: ErpaxMcpTool, origin: string): string {
  const action = mcpToolAsAction(tool, origin)
  const og = mcpToolAsOg(tool, origin)
  return [
    `<script type="application/ld+json">${JSON.stringify(action)}</script>`,
    `<meta property="og:title" content="${og.title}" />`,
    `<meta property="og:description" content="${og.description}" />`,
    `<meta property="og:url" content="${og.url}" />`,
    `<meta property="og:type" content="${og.type}" />`,
    `<meta property="og:site_name" content="${og.siteName}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${og.title}" />`,
    `<meta name="twitter:description" content="${og.description}" />`,
    ...og.tags.map((t) => `<meta property="article:tag" content="${t}" />`),
  ].join('\n')
}

// ─── Area as CollectionPage ────────────────────────────────────────

export interface AreaAsCollectionPage {
  readonly '@context': 'https://schema.org'
  readonly '@type': 'CollectionPage'
  readonly name: string
  readonly url: string
  readonly hasPart: ReadonlyArray<{ '@type': 'Action'; name: string; url: string }>
}

export function areaAsCollectionPage(area: string, tools: ReadonlyArray<ErpaxMcpTool>, origin: string): AreaAsCollectionPage {
  const inArea = tools.filter((t) => t.name.split('.')[1] === area)
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `MCP area: ${area}`,
    url: `${origin}/mcp/area/${area}`,
    hasPart: inArea.map((t) => ({
      '@type': 'Action',
      name: t.name,
      url: `${origin}/mcp/tools/${t.name}`,
    })),
  }
}

// ─── Register every tool as an SeoVortexFace (slice NNNNNN) ────────

export interface PresentationRegistrationResult {
  readonly toolFaces: number
  readonly areaFaces: number
  readonly rootFace: 1
  readonly totalFaces: number
}

/**
 * Register the entire MCP catalog as SeoVortexFaces:
 *   1. One face per tool with schemaType 'Action', ogType 'article',
 *      outbound edges to its area face + the root MCP face.
 *   2. One face per canonical area with schemaType 'CollectionPage',
 *      outbound edges to each tool in the area + the root.
 *   3. One root face for /mcp/ with schemaType 'SoftwareApplication',
 *      outbound edges to each area face.
 *
 * After this runs, `crossLink()` from slice NNNNNN populates incoming
 * edges everywhere — the MCP catalog is now a fully-coupled SEO
 * vortex (Law 29 satisfied).
 */
export function registerAllMcpFaces(args: {
  tools: ReadonlyArray<ErpaxMcpTool>
  origin: string
  contentUuidForCatalog: string             // pass via `computeContentUuid` over the catalog snapshot
  hreflang?: ReadonlyArray<{ locale: string; url: string }>
}): PresentationRegistrationResult {
  const ROOT_URL = `${args.origin}/mcp/`
  const now = new Date().toISOString()
  const hreflang = args.hreflang ?? [{ locale: 'en', url: ROOT_URL }]

  // Pass 1: tool faces.
  let toolFaces = 0
  for (const tool of args.tools) {
    const m = tool.name.match(/^erpax\.([a-z][a-z0-9-]*)\.([a-zA-Z][a-zA-Z0-9-]*)$/)
    const area = m?.[1] ?? 'misc'
    const url = `${args.origin}/mcp/tools/${tool.name}`
    const face: SeoVortexFace = {
      url,
      title: `MCP tool: ${tool.name}`,
      description: tool.description.length > 250 ? tool.description.slice(0, 247) + '...' : tool.description,
      schemaType: 'Action',
      ogType: 'article',
      ogUpdatedTime: now,
      contentUuid: args.contentUuidForCatalog,
      previousContentUuids: [],
      hreflang,
      outgoing: [
        { relation: 'isPartOf', targetUrl: `${args.origin}/mcp/area/${area}`, targetType: 'CollectionPage', targetName: `MCP area: ${area}` },
        { relation: 'isPartOf', targetUrl: ROOT_URL, targetType: 'SoftwareApplication', targetName: 'ERPax MCP' },
      ],
      incoming: [],
      axisHint: 'standard',
    }
    registerFace(face)
    toolFaces++
  }

  // Pass 2: per-area CollectionPage faces.
  let areaFaces = 0
  const presentAreas = new Set(args.tools.map((t) => t.name.split('.')[1] ?? 'misc'))
  for (const area of presentAreas) {
    const inArea = args.tools.filter((t) => t.name.split('.')[1] === area)
    const url = `${args.origin}/mcp/area/${area}`
    const face: SeoVortexFace = {
      url,
      title: `MCP area: ${area}`,
      description: `${inArea.length} MCP tool(s) in the '${area}' area — Conservation Law 38 canonical taxonomy. ${CANONICAL_AREAS.includes(area) ? '(canonical area)' : '(non-canonical — see Law 38 violations)'}.`,
      schemaType: 'CollectionPage',
      ogType: 'article',
      ogUpdatedTime: now,
      contentUuid: args.contentUuidForCatalog,
      previousContentUuids: [],
      hreflang,
      outgoing: [
        ...inArea.map((t) => ({
          relation: 'hasPart' as const,
          targetUrl: `${args.origin}/mcp/tools/${t.name}`,
          targetType: 'Action' as const, targetName: t.name,
        })),
        { relation: 'isPartOf', targetUrl: ROOT_URL, targetType: 'SoftwareApplication', targetName: 'ERPax MCP' },
      ],
      incoming: [],
      axisHint: 'standard',
    }
    registerFace(face)
    areaFaces++
  }

  // Pass 3: root MCP face.
  const rootFace: SeoVortexFace = {
    url: ROOT_URL,
    title: 'ERPax MCP',
    description: 'ERPax Model Context Protocol surface — every tool standards-bound (Law 38), discoverable (Law 1), tamper-proof (Law 8), composable as agent blocks (Law 32), streamable (Law 33), storage-independent (Law 35).',
    schemaType: 'SoftwareApplication',
    ogType: 'website',
    ogUpdatedTime: now,
    contentUuid: args.contentUuidForCatalog,
    previousContentUuids: [],
    hreflang,
    outgoing: [...presentAreas].map((area) => ({
      relation: 'hasPart' as const,
      targetUrl: `${args.origin}/mcp/area/${area}`,
      targetType: 'CollectionPage' as const,
      targetName: `MCP area: ${area}`,
    })),
    incoming: [],
    axisHint: 'standard',
  }
  registerFace(rootFace)

  return {
    toolFaces,
    areaFaces,
    rootFace: 1,
    totalFaces: toolFaces + areaFaces + 1,
  }
}

// ─── Conservation Law 39 — presentation coverage ───────────────────

export interface PresentationCoverage {
  readonly ok: boolean
  readonly toolsRegistered: number
  readonly toolsTotal: number
  readonly violations: ReadonlyArray<string>
}

/**
 * Conservation Law 39 — every MCP tool MUST have a registered
 * SeoVortexFace with schemaType Action and ≥1 outbound microdata
 * edge. Run after `registerAllMcpFaces()`.
 */
export function checkMcpPresentationCoverage(tools: ReadonlyArray<ErpaxMcpTool>, origin: string): PresentationCoverage {
  const faces = listFaces()
  const facesByUrl = new Map(faces.map((f) => [f.url, f]))
  const violations: string[] = []
  let registered = 0
  for (const tool of tools) {
    const url = `${origin}/mcp/tools/${tool.name}`
    const face = facesByUrl.get(url)
    if (!face) { violations.push(`${tool.name}: no SeoVortexFace registered at ${url}`); continue }
    if (face.schemaType !== 'Action') { violations.push(`${tool.name}: schemaType is '${face.schemaType}' not 'Action'`); continue }
    if (face.outgoing.length === 0) { violations.push(`${tool.name}: zero outbound microdata edges`); continue }
    registered++
  }
  return { ok: violations.length === 0, toolsRegistered: registered, toolsTotal: tools.length, violations }
}
