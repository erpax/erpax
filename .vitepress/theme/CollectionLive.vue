<script setup lang="ts">
// ── The trinity made live ──────────────────────────────────────────────────
// VitePress is the frontend; this component is where a page TALKS to the Payload
// backend. Its props are not authored — they are COMPUTED by the trinity engine
// from the node's matter (slug) + the backend's generated schema (fields). So
// every collection SKILL.md page gets a live data browser for free, derived, no
// per-page code. SSR renders the schema (the static backend truth); on the
// client it fetches the REAL rows from `/api/{slug}` — the build using the
// backend, now at runtime too. Offline (static host, no API) → schema only.
import { ref, onMounted } from 'vue'
import { find, cell } from './payload'

const props = defineProps<{ slug: string; fields?: string }>()
const fieldList = (props.fields ?? '').split(',').map((f) => f.trim()).filter(Boolean)
const cols = fieldList.filter((f) => !['id', 'uuid', 'updatedAt', 'createdAt'].includes(f)).slice(0, 5)

type State = 'loading' | 'live' | 'offline'
const state = ref<State>('loading')
const total = ref<number | null>(null)
const rows = ref<Record<string, unknown>[]>([])

onMounted(async () => {
  try {
    const data = await find(props.slug, { limit: 5 })
    total.value = data.totalDocs ?? data.total ?? (Array.isArray(data.docs) ? data.docs.length : 0)
    rows.value = Array.isArray(data.docs) ? data.docs.slice(0, 5) : []
    state.value = 'live'
  } catch {
    state.value = 'offline'
  }
})
</script>

<template>
  <div class="collection-live">
    <p class="cl-head">
      <strong>backend</strong> <code>{{ slug }}</code>
      <span class="cl-status" :data-state="state">
        <template v-if="state === 'loading'">· querying backend…</template>
        <template v-else-if="state === 'live'">· <strong>{{ total }}</strong> rows live</template>
        <template v-else>· offline — schema only</template>
      </span>
    </p>
    <!-- schema: always shown (SSR-safe, the generated backend truth) -->
    <p class="cl-schema">
      {{ fieldList.length }} fields:
      <code v-for="f in fieldList" :key="f">{{ f }}</code>
    </p>
    <!-- live rows: only after a successful backend fetch -->
    <table v-if="state === 'live' && rows.length" class="cl-table">
      <thead>
        <tr><th v-for="c in cols" :key="c">{{ c }}</th></tr>
      </thead>
      <tbody>
        <tr v-for="(r, i) in rows" :key="i">
          <td v-for="c in cols" :key="c">{{ cell(r[c]) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.collection-live {
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  font-size: 0.85rem;
}
.cl-head { margin: 0 0 0.4rem; }
.cl-status[data-state='live'] { color: var(--vp-c-brand-1); }
.cl-status[data-state='offline'] { color: var(--vp-c-text-3); }
.cl-schema { margin: 0 0 0.5rem; line-height: 1.9; }
.cl-schema code, .cl-head code { margin-right: 0.25rem; }
.cl-table { display: table; width: 100%; font-size: 0.8rem; border-collapse: collapse; }
.cl-table th, .cl-table td { text-align: left; padding: 0.25rem 0.5rem; border-top: 1px solid var(--vp-c-divider); }
</style>
