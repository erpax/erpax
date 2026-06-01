// ── VitePress as the complete frontend ─────────────────────────────────────
// Extend the default theme with a Layout that wires the live Payload search into
// the nav, and register the backend-bound components globally so the trinity
// engine (and any page) can drop them in by name. Every component talks to the
// backend through the one client in ./payload.ts; the wiring is computational —
// props derive from matter + the generated schema (see ../trinity.mts).
import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import CollectionLive from './CollectionLive.vue'
import PayloadSearch from './PayloadSearch.vue'
import McpTools from './McpTools.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('CollectionLive', CollectionLive)
    app.component('PayloadSearch', PayloadSearch)
    app.component('McpTools', McpTools)
  },
} satisfies Theme
