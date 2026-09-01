/**
 * plugins/emit — generate Claude Code plugin manifests for erpax.
 *
 *   pnpm claude:plugin
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { join } from 'node:path'

export function repoUrl(cwd: string = process.cwd()): string {
  const pkg = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8')) as {
    repository?: string | { url?: string }
  }
  const r = pkg.repository
  const fromPkg = typeof r === 'string' ? r : r?.url
  if (fromPkg) return fromPkg.replace(/^git\+/, '').replace(/\.git$/, '')
  try {
    return execSync('git remote get-url origin', { cwd, encoding: 'utf8' })
      .trim()
      .replace(/\.git$/, '')
  } catch {
    return 'https://github.com/erpax/erpax'
  }
}

export function atomCount(cwd: string = process.cwd()): number {
  return readdirSync(join(cwd, 'src'), { withFileTypes: true }).filter(
    (d) => (d.isDirectory() || d.isSymbolicLink()) && existsSync(join(cwd, 'src', d.name, 'SKILL.md')),
  ).length
}

export function emitClaudePlugin(cwd: string = process.cwd(), mcpUrl?: string): {
  version: string
  atoms: number
  mcpUrl: string
} {
  const OUT_DIR = join(cwd, '.claude-plugin')
  const pkg = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8')) as {
    version: string
    description: string
    license?: string
  }
  const repo = repoUrl(cwd)
  const MCP_URL = mcpUrl ?? process.env.ERPAX_MCP_URL ?? 'http://localhost:3000/api/mcp'

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
    skills: './src',
  }

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

  const writeJson = (path: string, obj: unknown): void =>
    writeFileSync(path, JSON.stringify(obj, null, 2) + '\n')

  mkdirSync(OUT_DIR, { recursive: true })
  writeJson(join(OUT_DIR, 'plugin.json'), plugin)
  writeJson(join(OUT_DIR, 'marketplace.json'), marketplace)

  const mcpPath = join(cwd, '.mcp.json')
  const mcpDoc = existsSync(mcpPath)
    ? (JSON.parse(readFileSync(mcpPath, 'utf8')) as { mcpServers?: Record<string, unknown> })
    : {}
  mcpDoc.mcpServers = { ...(mcpDoc.mcpServers ?? {}), erpax: erpaxServer }
  writeJson(mcpPath, mcpDoc)

  const atoms = atomCount(cwd)
  return { version: pkg.version, atoms, mcpUrl: MCP_URL }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { version, atoms, mcpUrl } = emitClaudePlugin()
  console.log(
    `claude-plugin: wrote .claude-plugin/{plugin,marketplace}.json + ./.mcp.json — ` +
      `erpax@${version}, ${atoms} skill atoms (live src/<word>/SKILL.md), ` +
      `MCP gateway → ${mcpUrl}`,
  )
}
