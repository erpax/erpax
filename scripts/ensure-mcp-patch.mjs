#!/usr/bin/env node
/**
 * ensure-mcp-patch — pnpm patch only applies to one peer-dep resolution of
 * `@payloadcms/plugin-mcp`. Webpack may resolve a second copy under
 * `.pnpm/@payloadcms+plugin-mcp@…_next@…`. Overlay patched MCP handler files
 * onto every copy so Worker builds get lean schema + Workers-safe Request body.
 */
import { copyFileSync, existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const FILES = [
  { name: 'getMcpHandler.js', marker: '__erpaxMcpSchemaCache' },
  { name: 'createRequest.js', marker: 'spent stream' },
]
const root = process.cwd()
const pnpm = join(root, 'node_modules/.pnpm')

function walk(dir, fileName, out = []) {
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    let st
    try {
      st = statSync(p)
    } catch {
      continue
    }
    if (st.isDirectory()) {
      if (
        name === 'node_modules' ||
        name.startsWith('@') ||
        name.includes('plugin-mcp') ||
        name === 'dist' ||
        name === 'mcp' ||
        name.includes('payloadcms+plugin-mcp')
      ) {
        walk(p, fileName, out)
      }
    } else if (name === fileName && p.includes('plugin-mcp') && p.includes(join('dist', 'mcp'))) {
      out.push(p)
    }
  }
  return out
}

for (const { name, marker } of FILES) {
  const files = walk(pnpm, name)
  const top = join(root, 'node_modules/@payloadcms/plugin-mcp/dist/mcp', name)
  if (existsSync(top)) files.push(top)

  const patched = files.find((f) => {
    try {
      return readFileSync(f, 'utf8').includes(marker)
    } catch {
      return false
    }
  })
  if (!patched) {
    console.warn(`[ensure-mcp-patch] no patched ${name} found`)
    continue
  }
  let fixed = 0
  for (const f of files) {
    if (f === patched) continue
    let body = ''
    try {
      body = readFileSync(f, 'utf8')
    } catch {
      continue
    }
    if (body.includes(marker)) continue
    copyFileSync(patched, f)
    fixed++
    console.log('[ensure-mcp-patch] overlaid', f.replace(root + '/', ''))
  }
  console.log(
    `[ensure-mcp-patch] ${name} source=${patched.replace(root + '/', '')} fixed=${fixed} scanned=${files.length}`,
  )
}
