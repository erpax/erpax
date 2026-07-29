import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(__dirname, '..')

const openNextDir = path.join(projectRoot, '.open-next/server-functions/default/node_modules')
const handlerPath = path.join(projectRoot, '.open-next/server-functions/default/handler.mjs')
const metaPath = path.join(projectRoot, '.open-next/server-functions/default/handler.mjs.meta.json')

// Find all files that import .scss, .svg, etc.
function walkDir(dir) {
  if (!fs.existsSync(dir)) {
    return
  }
  const files = fs.readdirSync(dir, { withFileTypes: true })
  for (const file of files) {
    const fullPath = path.join(dir, file.name)
    if (file.isDirectory()) {
      walkDir(fullPath)
    } else if (file.isFile() && file.name.endsWith('.js')) {
      try {
        let content = fs.readFileSync(fullPath, 'utf-8')
        const hasAsset = /import\s+['"][^'"]*\.(scss|svg|png|jpg|gif)['"];?/.test(content)
        if (hasAsset) {
          content = content.replace(/import\s+['"][^'"]*\.(scss|svg|png|jpg|gif)['"];?/g, '')
          fs.writeFileSync(fullPath, content, 'utf-8')
        }
      } catch {
        // Ignore read/write errors
      }
    }
  }
}

function findVercelOgDirs(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      if (full.endsWith(`${path.sep}compiled${path.sep}@vercel${path.sep}og`)) {
        out.push(full)
        continue
      }
      findVercelOgDirs(full, out)
    }
  }
  return out
}

/**
 * OpenNext/esbuild already inlined @vercel/og into handler.mjs with absolute
 * external imports for wasm/ttf. Deleting those files alone → wrangler ENOENT.
 * Rewrite the handler + meta so the binaries are never collected, then delete.
 */
function neutralizeOgInHandler() {
  if (!fs.existsSync(handlerPath)) return
  let src = fs.readFileSync(handlerPath, 'utf8')
  const before = src
  src = src.replace(
    /import\s+(\w+)\s+from\s*["'][^"']*@vercel\/og\/(?:yoga|resvg)\.wasm\?module["'];?/g,
    'const $1 = new Uint8Array(0);',
  )
  src = src.replace(
    /import\s*\(\s*["'][^"']*@vercel\/og\/Geist-Regular\.ttf\.bin["']\s*\)/g,
    'Promise.resolve({ default: new Uint8Array(0) })',
  )
  // Absolute paths without the package marker (esbuild sometimes emits full abs).
  src = src.replace(
    /import\s+(\w+)\s+from\s*["'][^"']+\/(?:yoga|resvg)\.wasm\?module["'];?/g,
    'const $1 = new Uint8Array(0);',
  )
  src = src.replace(
    /import\s*\(\s*["'][^"']+\/Geist-Regular\.ttf\.bin["']\s*\)/g,
    'Promise.resolve({ default: new Uint8Array(0) })',
  )
  if (src !== before) {
    fs.writeFileSync(handlerPath, src)
    console.log('neutralized OG wasm/ttf imports in handler.mjs')
  }

  if (!fs.existsSync(metaPath)) return
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'))
  let removed = 0
  const isOgAsset = (p) =>
    typeof p === 'string' && /@vercel\/og\/(?:yoga\.wasm|resvg\.wasm|Geist-Regular\.ttf)/.test(p)
  const scrub = (node) => {
    if (!node || typeof node !== 'object') return
    if (Array.isArray(node)) {
      for (let i = node.length - 1; i >= 0; i--) {
        if (node[i] && isOgAsset(node[i].path)) {
          node.splice(i, 1)
          removed++
        } else scrub(node[i])
      }
      return
    }
    for (const [k, v] of Object.entries(node)) {
      if (k === 'imports' && Array.isArray(v)) {
        for (let i = v.length - 1; i >= 0; i--) {
          if (v[i] && isOgAsset(v[i].path)) {
            v.splice(i, 1)
            removed++
          } else scrub(v[i])
        }
      } else scrub(v)
    }
  }
  scrub(meta)
  if (removed) {
    fs.writeFileSync(metaPath, JSON.stringify(meta))
    console.log(`removed ${removed} OG asset entries from handler.mjs.meta.json`)
  }
}

function stripVercelOg() {
  neutralizeOgInHandler()
  const roots = [path.join(projectRoot, '.open-next/server-functions/default/node_modules')]
  const dirs = []
  for (const root of roots) findVercelOgDirs(root, dirs)
  for (const nextOg of [...new Set(dirs)]) {
    for (const name of fs.readdirSync(nextOg)) {
      if (/\.(wasm|ttf|ttf\.bin)$/.test(name)) {
        const p = path.join(nextOg, name)
        fs.rmSync(p, { force: true })
        console.log('stripped', path.relative(projectRoot, p))
      }
    }
    const edge = path.join(nextOg, 'index.edge.js')
    if (fs.existsSync(edge)) {
      fs.writeFileSync(
        edge,
        'export class ImageResponse extends Response {\n' +
          '  constructor(){super("OG disabled",{status:501})}\n}\n' +
          'export default { ImageResponse }\n',
        'utf8',
      )
      console.log('stubbed', path.relative(projectRoot, edge))
    }
  }
}

console.log('Cleaning up @payloadcms/ui asset imports...')
walkDir(openNextDir)
console.log('Stripping unused @vercel/og assets...')
stripVercelOg()
console.log('Done')
