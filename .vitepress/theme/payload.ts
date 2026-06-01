// ── The one client: VitePress (frontend) → Payload (backend) ───────────────
// Every backend conversation goes through here, so the wiring is DRY: one base
// resolution, one fetch, one error contract. The base is config-driven
// (VITE_ERPAX_API); empty → same-origin `/api`, the case where the docs ARE
// served by the Payload app (the complete frontend). All calls are client-only
// (invoked from onMounted / on input), so SSR never touches the network.

const base = (): string =>
  ((import.meta as { env?: Record<string, string> }).env?.VITE_ERPAX_API ?? '').replace(/\/$/, '')

export type Paginated<T = Record<string, unknown>> = {
  docs?: T[]
  totalDocs?: number
  total?: number
}

/** GET `${base}/api/${path}` as JSON. Throws on non-2xx so callers can show "offline". */
export async function api<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${base()}/api/${path.replace(/^\//, '')}`, {
    ...init,
    headers: { accept: 'application/json', ...(init?.headers ?? {}) },
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return (await res.json()) as T
}

/** Payload REST `where[field][op]=value` querystring builder (one source of truth). */
export function where(
  field: string,
  op: 'like' | 'equals' | 'contains',
  value: string,
): string {
  return `where[${field}][${op}]=${encodeURIComponent(value)}`
}

/** Find rows of a collection, optional text filter across the given fields (OR). */
export async function find(
  slug: string,
  opts: { limit?: number; q?: string; fields?: string[] } = {},
): Promise<Paginated> {
  const { limit = 5, q, fields = [] } = opts
  const params = [`limit=${limit}`, 'depth=0']
  if (q && fields.length) {
    // OR across the searchable fields: where[or][n][field][like]=q
    fields.forEach((f, i) => params.push(`where[or][${i}][${f}][like]=${encodeURIComponent(q)}`))
  } else if (q && fields.length === 0) {
    params.push(where('title', 'like', q))
  }
  return api<Paginated>(`${slug}?${params.join('&')}`)
}

/** Render any field value to a short cell string (ids for relations, scalars trimmed). */
export function cell(v: unknown): string {
  if (v == null) return '·'
  if (typeof v === 'object') {
    const o = v as Record<string, unknown>
    return String(o.id ?? o.value ?? o.name ?? o.title ?? '{…}')
  }
  return String(v).slice(0, 48)
}
