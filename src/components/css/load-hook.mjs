// CSS diamond surface hook — Node recognizes .css/.scss as on-ring facets.
//
// @see src/css/SKILL.md — css is the styling diamond; ERR_UNKNOWN_FILE_EXTENSION
// is impurity (loader treats a diamond facet as off-ring escape). Typegen and
// Payload CLI only need the config lattice, not painted pixels — the load hook
// stubs style/asset imports as an empty ESM module so the graph closes.
//
// The RESOLVE hook exists for a second reason: tsx 4.2x (any copy in the tree)
// on Node 24 appends `?tsx-namespace=<ts>` to `node:` builtin specifiers, and
// Node 24's CJS loader then readFileSync's that literal string —
//   ENOENT: open 'node:stream?tsx-namespace=1785650537980'
// — which crashed `payload generate:types` on Cloudflare's Node-24 build image.
// Reproduced on Node 24 with tsx alone (no this hook), so the bug is tsx's, not
// ours. We short-circuit builtins at RESOLVE to a clean `node:<name>` builtin
// resolution BEFORE any tsx resolve runs, so tsx never sees a builtin to mangle;
// `.ts` and `@/` alias specifiers still fall through to tsx untouched.
//
// Wired via NODE_OPTIONS --import in package.json `payload` / `build` scripts.
import { registerHooks, isBuiltin } from 'node:module'

const STYLE_RE = /\.(css|scss|sass|svg|ttf|woff|woff2|png|jpg|jpeg|gif|webp)(?:\?.*)?$/i

registerHooks({
  resolve(specifier, context, nextResolve) {
    const bare = specifier.startsWith('node:') ? specifier.slice(5).split('?')[0] : specifier
    if (specifier.startsWith('node:') || isBuiltin(bare)) {
      return { url: 'node:' + bare, shortCircuit: true, format: 'builtin' }
    }
    return nextResolve(specifier, context)
  },
  load(url, context, nextLoad) {
    if (STYLE_RE.test(url)) {
      return {
        format: 'module',
        shortCircuit: true,
        source: 'export default {}\n',
      }
    }
    return nextLoad(url, context)
  },
})
