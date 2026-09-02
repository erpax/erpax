/**
 * The empty module — what a server-only leaf resolves to inside the BROWSER bundle.
 *
 * webpack expresses this as `resolve.fallback[builtin] = false`, and its `false` also silences
 * the named imports: `import { readFileSync } from 'fs'` in code the browser never runs still
 * links. Turbopack checks named exports statically, so an ESM stub fails 351 times over
 * readFileSync · existsSync · readdirSync · statSync · execSync — every server call a client
 * component transitively names but never executes.
 *
 * CommonJS is the answer, not a longer list: a CJS module's export surface is unknown at build
 * time, so any named import links, and the Proxy returns a throwing function for whatever is
 * actually reached. webpack returned `undefined` there and failed later, less clearly.
 */
const server = (name) => () => {
  throw new Error(`[erpax] ${String(name)} is server-only and unavailable in the browser bundle`)
}
module.exports = new Proxy(
  {},
  {
    get: (_t, name) => (name === '__esModule' ? false : name === 'default' ? module.exports : server(name)),
  },
)
