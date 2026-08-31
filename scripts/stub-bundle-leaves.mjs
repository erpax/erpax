/**
 * After `next build`, rewrite leftover `require("typescript")` / OG edge imports
 * in `.next/server` AND `.next/standalone/.next/server` (OpenNext packs from
 * standalone). OpenNext's asset copy drops non-traced files, so we INLINE tiny
 * CJS factories instead of requiring a sibling stub path.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

/** CJS factory matching .stubs/typescript.js — no filesystem resolve for esbuild. */
const TS_INLINE = `(()=>{const ScriptTarget={ESNext:99,Latest:99};const SyntaxKind={};function createSourceFile(fileName="",sourceText=""){return{fileName,text:sourceText,statements:[],getFullText:()=>sourceText,getLineAndCharacterOfPosition:()=>({line:0,character:0})}}function forEachChild(){}const ts={ScriptTarget,SyntaxKind,createSourceFile,forEachChild,sys:{}};ts.default=ts;ts.__esModule=true;return ts})()`

/** CJS factory matching .stubs/next-og.js */
const OG_INLINE = `(()=>{class ImageResponse extends Response{constructor(){super("OG image rendering is disabled in the Cloudflare Worker build",{status:501})}}function experimental_createImageStream(){throw new Error("OG image rendering is disabled in the Cloudflare Worker build")}return{ImageResponse,experimental_createImageStream,__esModule:true,default:{ImageResponse,experimental_createImageStream}}})()`

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      if (ent.name === '_erpax_stubs') continue
      walk(full, out)
    } else if (ent.isFile() && ent.name.endsWith('.js')) out.push(full)
  }
  return out
}

function patchServerTree(serverRoot) {
  if (!fs.existsSync(serverRoot)) return 0
  // Remove any prior on-disk stubs (OpenNext won't copy them anyway).
  const stubDir = path.join(serverRoot, '_erpax_stubs')
  if (fs.existsSync(stubDir)) fs.rmSync(stubDir, { recursive: true, force: true })

  let patched = 0
  for (const file of walk(serverRoot)) {
    let src = fs.readFileSync(file, 'utf8')
    const before = src
    // Undo prior relative-stub rewrites, then inline.
    src = src.replace(
      /require\(["'][^"']*_erpax_stubs\/typescript\.js["']\)/g,
      TS_INLINE,
    )
    src = src.replace(
      /require\(["'][^"']*_erpax_stubs\/next-og\.js["']\)/g,
      OG_INLINE,
    )
    src = src.replace(
      /require\(["'](?:\.\.\/)+stubs\/typescript\.js["']\)/g,
      TS_INLINE,
    )
    src = src.replace(
      /require\(["'](?:\.\.\/)+stubs\/next-og\.js["']\)/g,
      OG_INLINE,
    )
    src = src.replace(/require\(["']typescript["']\)/g, TS_INLINE)
    src = src.replace(
      /require\(["']next\/dist\/compiled\/@vercel\/og\/index\.edge\.js["']\)/g,
      OG_INLINE,
    )
    if (src !== before) {
      fs.writeFileSync(file, src)
      patched++
    }
  }
  return patched
}

const targets = [
  path.join(root, '.next', 'server'),
  path.join(root, '.next', 'standalone', '.next', 'server'),
]

let total = 0
for (const target of targets) {
  const n = patchServerTree(target)
  total += n
  console.log(`stub-bundle-leaves: patched ${n} in ${path.relative(root, target) || target}`)
}
console.log(`stub-bundle-leaves: patched ${total} server chunk(s) total`)
