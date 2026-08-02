// CSS diamond surface hook — Node recognizes .css/.scss as on-ring facets.
//
// @see src/css/SKILL.md — css is the styling diamond; ERR_UNKNOWN_FILE_EXTENSION
// is impurity (loader treats a diamond facet as off-ring escape). Typegen and
// Payload CLI only need the config lattice, not painted pixels — stub returns
// an empty ESM module so the import graph closes without executing styles.
//
// Wired via NODE_OPTIONS --import in package.json `payload` / `build` scripts.
import { registerHooks } from 'node:module'

const STYLE_RE = /\.(css|scss|sass|svg|ttf|woff|woff2|png|jpg|jpeg|gif|webp)(?:\?.*)?$/i

registerHooks({
  load(url, context, nextLoad) {
    if (STYLE_RE.test(url)) {
      return {
        format: 'module',
        shortCircuit: true,
        source: 'export default {}\n',
      }
    }
    // A `node:` builtin can arrive tsx-namespaced (e.g. `node:stream?tsx-namespace=1785635319179`).
    // The default loader then `readFileSync`s that full URL as a path → ENOENT, which crashed
    // `payload generate:types` in the Cloudflare (Node 24) Workers build. Only for a query-tagged
    // node: URL, strip the cache-buster and load the clean builtin. Untagged node: (the common case,
    // and the only form seen locally) is untouched, so behaviour is unchanged everywhere else.
    if (url.startsWith('node:') && url.includes('?')) {
      return nextLoad(url.slice(0, url.indexOf('?')), context)
    }
    return nextLoad(url, context)
  },
})
