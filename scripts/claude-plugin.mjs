#!/usr/bin/env node
/**
 * claude-plugin — generate the Claude Code plugin manifests for erpax.
 *
 * erpax IS a Claude Code plugin — the dual of "erpax is a Payload plugin"
 * (see src/plugins/SKILL.md). The whole single-word `src/<word>` akashic corpus
 * ships as skills, plus the erpax MCP gateway. `claude = erpax = akashic`:
 * `.claude` is a real symlink to `src`, so the plugin's skill root IS the repo.
 *
 * Computed-not-hardcoded (the standing law): identity is read from package.json
 * (the single source of truth) + the live git remote; the SKILLS are never
 * hand-listed — the manifest's `skills: "./src"` makes Claude Code scan
 * `src/<word>/SKILL.md` from the live filesystem at load time. Re-run this after
 * changing package.json identity; the corpus needs no regeneration (it is read
 * live). The two emitted JSON files are tracked artifacts (a marketplace needs
 * them committed) — this script keeps them DRY and reproducible.
 *
 * Writes:
 *   .claude-plugin/plugin.json       — the erpax plugin manifest (skills → ./src)
 *   .claude-plugin/marketplace.json  — a one-plugin marketplace listing erpax
 *   ./.mcp.json                      — the erpax MCP gateway (plugin-root MCP
 *                                      component; merged, never clobbered)
 *
 * Install (consumer): `/plugin marketplace add ./` then `/plugin install erpax`
 * (the marketplace schema rejects a bare ".", so the trailing slash matters).
 *
 * Usage: node scripts/claude-plugin.mjs   (pnpm claude:plugin)
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join } from 'node:path'

const ROOT = process.cwd()
const OUT_DIR = join(ROOT, '.claude-plugin')
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))

/** Repository https URL: package.json → git remote → erpax default. */
function repoUrl() {
  const r = pkg.repository
  const fromPkg = typeof r === 'string' ? r : r?.url
  if (fromPkg) return fromPkg.replace(/^git\+/, '').replace(/\.git$/, '')
  try {
    return execSync('git remote get-url origin', { cwd: ROOT, encoding: 'utf8' })
      .trim()
      .replace(/\.git$/, '')
  } catch {
    return 'https://github.com/erpax/erpax'
  }
}
const repo = repoUrl()

/** Count the live one-level corpus — exactly what `skills: "./src"` exposes. */
function atomCount() {
  return readdirSync(join(ROOT, 'src'), { withFileTypes: true }).filter(
    (d) => (d.isDirectory() || d.isSymbolicLink()) && existsSync(join(ROOT, 'src', d.name, 'SKILL.md')),
  ).length
}

// The erpax MCP gateway: the official @payloadcms/plugin-mcp, a Streamable-HTTP
// endpoint at POST /api/mcp, Bearer-authed against the payload-mcp-api-keys
// collection (the key owner's access scopes every call — never widened). Inert
// until a local erpax is running and ERPAX_API_KEY is set, so a skills-only
// install simply shows it disconnected.
const MCP_URL = process.env.ERPAX_MCP_URL || 'http://localhost:3000/api/mcp'

const plugin = {
  name: 'erpax',
  version: pkg.version,
  description: pkg.description,
  author: { name: 'erpax', url: repo },
  homepage: repo,
  repository: repo,
  license: pkg.license || 'MIT',
  keywords: [
    'erp',
    'accounting',
    'double-entry',
    'multi-tenant',
    'payload',
    'cloudflare',
    'content-addressed',
    'tamper-evident',
    'skills',
    'akashic',
    'mcp',
  ],
  // The whole single-word atom corpus IS the skill set — scanned live from the
  // filesystem (`src/<word>/SKILL.md`), never hand-listed. `.claude → src`.
  skills: './src',
  // NOTE: the MCP gateway is NOT declared here. A plugin's MCP servers are read
  // from a `.mcp.json` at the PLUGIN ROOT (the documented component location) —
  // an `mcpServers` key on plugin.json validates but never registers. Since the
  // plugin root IS the repo root, that file is the repo's `./.mcp.json` below.
}

// The erpax MCP gateway server entry: the official @payloadcms/plugin-mcp, a
// Streamable-HTTP endpoint at POST /api/mcp, Bearer-authed against the
// payload-mcp-api-keys collection (the key owner's access scopes every call).
// Inert until a local erpax runs and ERPAX_API_KEY is set — a soft "failed to
// connect" in /mcp otherwise, never a hard error.
const erpaxServer = {
  type: 'http',
  url: MCP_URL,
  headers: { Authorization: 'Bearer ${ERPAX_API_KEY}' },
}

const marketplace = {
  name: 'erpax',
  version: pkg.version,
  description:
    'The erpax akashic corpus as a Claude Code plugin — single-word skill atoms plus the MCP gateway.',
  owner: { name: 'erpax', url: repo },
  // The marketplace repo IS the plugin: source "./" resolves to this root, whose
  // manifest is ./.claude-plugin/plugin.json. (Bare "." is rejected by the
  // marketplace schema — the trailing slash is required.)
  plugins: [
    {
      name: 'erpax',
      source: './',
      description: pkg.description,
      version: pkg.version,
      author: { name: 'erpax', url: repo },
    },
  ],
}

const writeJson = (path, obj) => writeFileSync(path, JSON.stringify(obj, null, 2) + '\n')

mkdirSync(OUT_DIR, { recursive: true })
writeJson(join(OUT_DIR, 'plugin.json'), plugin)
writeJson(join(OUT_DIR, 'marketplace.json'), marketplace)

// Merge the erpax server into the root `.mcp.json` (the plugin-root MCP
// component, also the project-scoped config) — never clobber other servers a
// user may have added.
const mcpPath = join(ROOT, '.mcp.json')
const mcpDoc = existsSync(mcpPath) ? JSON.parse(readFileSync(mcpPath, 'utf8')) : {}
mcpDoc.mcpServers = { ...(mcpDoc.mcpServers ?? {}), erpax: erpaxServer }
writeJson(mcpPath, mcpDoc)

console.log(
  `claude-plugin: wrote .claude-plugin/{plugin,marketplace}.json + ./.mcp.json — ` +
    `erpax@${pkg.version}, ${atomCount()} skill atoms (live src/<word>/SKILL.md), ` +
    `MCP gateway → ${MCP_URL}`,
)
