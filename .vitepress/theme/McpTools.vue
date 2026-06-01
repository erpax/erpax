<script setup lang="ts">
// ── MCP wired into the frontend ────────────────────────────────────────────
// The backend auto-generates an MCP tool per capability and registers each in
// the `mcp-tool-metadata` collection (presented at /mcp/tools/{name}). This
// component lists them live, so the docs site is also the MCP console — drop
// <McpTools/> on any page. Optional `area` prop filters to one capability area.
import { ref, onMounted } from 'vue'
import { api, type Paginated } from './payload'

type Tool = { id: string; name?: string; title?: string; area?: string; description?: string }

const props = defineProps<{ area?: string }>()
const state = ref<'loading' | 'ok' | 'offline'>('loading')
const tools = ref<Tool[]>([])
const base = ((import.meta as { env?: Record<string, string> }).env?.VITE_ERPAX_API ?? '').replace(/\/$/, '')
const toolUrl = (t: Tool): string => `${base}/mcp/tools/${t.name ?? t.id}`

onMounted(async () => {
  try {
    const qs = props.area
      ? `where[area][equals]=${encodeURIComponent(props.area)}&limit=200&depth=0`
      : 'limit=200&depth=0'
    const data = await api<Paginated<Tool>>(`mcp-tool-metadata?${qs}`)
    tools.value = Array.isArray(data.docs) ? data.docs : []
    state.value = 'ok'
  } catch {
    state.value = 'offline'
  }
})
</script>

<template>
  <div class="mcp-tools">
    <p class="mt-head">
      <strong>MCP tools</strong>
      <span v-if="state === 'ok'">· {{ tools.length }} registered</span>
      <span v-else-if="state === 'loading'">· loading…</span>
      <span v-else>· backend offline</span>
    </p>
    <ul v-if="state === 'ok' && tools.length">
      <li v-for="t in tools" :key="t.id">
        <a :href="toolUrl(t)"><code>{{ t.name ?? t.title ?? t.id }}</code></a>
        <span v-if="t.area" class="mt-area">{{ t.area }}</span>
        <span v-if="t.description" class="mt-desc">{{ t.description }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.mcp-tools {
  margin: 1rem 0; padding: 0.75rem 1rem; font-size: 0.85rem;
  border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft);
}
.mt-head { margin: 0 0 0.5rem; }
.mcp-tools ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.3rem; }
.mcp-tools li { display: flex; align-items: baseline; gap: 0.5rem; }
.mt-area { color: var(--vp-c-brand-1); font-size: 0.72rem; flex-shrink: 0; }
.mt-desc { color: var(--vp-c-text-3); font-size: 0.78rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
