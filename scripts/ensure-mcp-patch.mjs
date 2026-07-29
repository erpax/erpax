#!/usr/bin/env node
/**
 * ensure-mcp-patch — pnpm patch only applies to one peer-dep resolution of
 * `@payloadcms/plugin-mcp`. Webpack may resolve a second copy under
 * `.pnpm/@payloadcms+plugin-mcp@…_next@…`. Overlay patched MCP files onto
 * every copy so Worker builds get lean schema + Workers-safe body capture.
 */
import { copyFileSync, existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const FILES = [
  { name: 'getMcpHandler.js', marker: '__erpaxMcpSchemaCache', dir: join('dist', 'mcp') },
  { name: 'createRequest.js', marker: 'bodyOverride', dir: join('dist', 'mcp') },
  { name: 'mcp.js', marker: 'captureBodyText', dir: join('dist', 'endpoints') },
]
const root = process.cwd()
const pnpm = join(root, 'node_modules/.pnpm')

function walk(dir, fileName, dirMarker, out = []) {
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
        name === 'endpoints' ||
        name.includes('payloadcms+plugin-mcp')
      ) {
        walk(p, fileName, dirMarker, out)
      }
    } else if (name === fileName && p.includes('plugin-mcp') && p.includes(dirMarker)) {
      out.push(p)
    }
  }
  return out
}

for (const { name, marker, dir } of FILES) {
  const files = walk(pnpm, name, dir)
  const top = join(root, 'node_modules/@payloadcms/plugin-mcp', dir, name)
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
