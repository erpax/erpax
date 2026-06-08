// CSS diamond surface hook — Node recognizes .css/.scss as on-ring facets.
//
// @see src/css/SKILL.md — css is the styling diamond; ERR_UNKNOWN_FILE_EXTENSION
// is impurity (loader treats a diamond facet as off-ring escape). Typegen and
// Payload CLI only need the config lattice, not painted pixels — stub returns
// an empty ESM module so the import graph closes without executing styles.
//
// Wired via NODE_OPTIONS --import in package.json `payload` / `build` scripts.
import { registerHooks } from 'node:module'

const STYLE_RE = /\.(css|scss|sass)(?:\?.*)?$/i

registerHooks({
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
