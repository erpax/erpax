<script setup lang="ts">
// ── Payload search wired into the VitePress nav ────────────────────────────
// VitePress's local search indexes the STATIC skill text. This box searches the
// LIVE backend — the Payload `search` collection (plugin-search) — so the same
// frontend reaches both the speech (docs) and the data (records). Config-driven,
// SSR-safe (queries only on input), debounced. The two searches sit side by side
// in the nav: one for the corpus, one for the rows.
import { ref } from 'vue'
import { api, where, cell, type Paginated } from './payload'

type Hit = { id: string; title?: string; doc?: { relationTo?: string; value?: unknown } }

const q = ref('')
const open = ref(false)
const state = ref<'idle' | 'loading' | 'ok' | 'offline'>('idle')
const hits = ref<Hit[]>([])
let timer: ReturnType<typeof setTimeout> | null = null

const base = ((import.meta as { env?: Record<string, string> }).env?.VITE_ERPAX_API ?? '').replace(/\/$/, '')
const adminLink = (h: Hit): string | null => {
  const rel = h.doc?.relationTo
  const id = h.doc?.value
  return rel && id != null ? `${base}/admin/collections/${rel}/${cell(id)}` : null
}

async function run(): Promise<void> {
  const term = q.value.trim()
  if (!term) { hits.value = []; state.value = 'idle'; open.value = false; return }
  state.value = 'loading'; open.value = true
  try {
    const data = await api<Paginated<Hit>>(`search?${where('title', 'like', term)}&limit=8&depth=1`)
    hits.value = Array.isArray(data.docs) ? data.docs : []
    state.value = 'ok'
  } catch {
    state.value = 'offline'
  }
}

function onInput(): void {
  if (timer) clearTimeout(timer)
  timer = setTimeout(run, 250) // debounce
}
</script>

<template>
  <div class="payload-search" @focusout="open = false" tabindex="-1">
    <input
      v-model="q"
      class="ps-input"
      type="search"
      placeholder="search backend…"
      aria-label="search the Payload backend"
      @input="onInput"
      @focus="q && (open = true)"
    />
    <div v-if="open" class="ps-results">
      <p v-if="state === 'loading'" class="ps-meta">querying backend…</p>
      <p v-else-if="state === 'offline'" class="ps-meta">backend offline</p>
      <p v-else-if="state === 'ok' && !hits.length" class="ps-meta">no rows match</p>
      <ul v-else-if="state === 'ok'">
        <li v-for="h in hits" :key="h.id">
          <a v-if="adminLink(h)" :href="adminLink(h)!">
            <span class="ps-title">{{ h.title ?? cell(h.doc?.value) }}</span>
            <span class="ps-coll">{{ h.doc?.relationTo }}</span>
          </a>
          <span v-else>
            <span class="ps-title">{{ h.title ?? '—' }}</span>
            <span class="ps-coll">{{ h.doc?.relationTo }}</span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.payload-search { position: relative; display: inline-block; margin-left: 0.5rem; }
.ps-input {
  width: 11rem; max-width: 40vw; padding: 0.35rem 0.6rem; font-size: 0.8rem;
  border: 1px solid var(--vp-c-divider); border-radius: 8px;
  background: var(--vp-c-bg-soft); color: var(--vp-c-text-1);
}
.ps-results {
  position: absolute; right: 0; top: 2.4rem; z-index: 100; width: 22rem; max-width: 90vw;
  background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider);
  border-radius: 8px; box-shadow: var(--vp-shadow-3); padding: 0.4rem;
}
.ps-meta { margin: 0; padding: 0.4rem 0.5rem; font-size: 0.8rem; color: var(--vp-c-text-3); }
.ps-results ul { list-style: none; margin: 0; padding: 0; }
.ps-results li a, .ps-results li > span {
  display: flex; justify-content: space-between; gap: 0.5rem;
  padding: 0.4rem 0.5rem; border-radius: 6px; font-size: 0.82rem;
}
.ps-results li a:hover { background: var(--vp-c-bg-soft); }
.ps-title { color: var(--vp-c-text-1); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ps-coll { color: var(--vp-c-brand-1); flex-shrink: 0; font-size: 0.72rem; }
</style>
