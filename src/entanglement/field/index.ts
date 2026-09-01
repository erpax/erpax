/**
 * entanglement/field — party-field entanglement warnings for admin UI.
 *
 * Detects when multiple invoice party relationships collapse to the same
 * address id (merge at relationship scale) — the EN 16931 seller/buyer
 * independence gate.
 *
 * @see ../entanglement — ../invoices — ../admin/ui
 */

export type EntanglementSeverity = 'info' | 'warning' | 'error'

export interface FieldEntanglementWarning {
  readonly field: string
  readonly entangledWith: readonly string[]
  readonly message: string
  readonly severity: EntanglementSeverity
}

const relId = (value: unknown): string | null => {
  if (value == null) return null
  if (typeof value === 'string') return value
  if (typeof value === 'object' && value !== null && 'id' in value) {
    const id = (value as { id?: unknown }).id
    return typeof id === 'string' ? id : null
  }
  return null
}

const PARTY_FIELDS = [
  'seller',
  'sellerAgent',
  'buyer',
  'buyerAgent',
  'supplier',
  'consignee',
] as const

/**
 * N-way party entanglement — same address id bound to multiple roles.
 * Pure, deterministic; safe for admin `admin.condition` + field UI.
 */
export function fieldEntanglementOf(
  parties: Record<string, unknown> | null | undefined,
  focusField?: string,
): readonly FieldEntanglementWarning[] {
  if (!parties || typeof parties !== 'object') return []

  const byId = new Map<string, string[]>()
  for (const name of PARTY_FIELDS) {
    const id = relId(parties[name])
    if (!id) continue
    const roles = byId.get(id) ?? []
    roles.push(name)
    byId.set(id, roles)
  }

  const warnings: FieldEntanglementWarning[] = []
  for (const [id, roles] of byId) {
    if (roles.length < 2) continue
    const hasSellerBuyer =
      roles.includes('seller') && roles.includes('buyer')
    const severity: EntanglementSeverity = hasSellerBuyer
      ? 'error'
      : roles.includes('seller') || roles.includes('buyer')
        ? 'warning'
        : 'info'
    const message = hasSellerBuyer
      ? `Seller and buyer entangled at address ${id.slice(0, 8)}… — EN 16931 party independence violated`
      : `Roles ${roles.join(', ')} share address ${id.slice(0, 8)}…`

    for (const field of roles) {
      if (focusField && field !== focusField) continue
      warnings.push({
        field,
        entangledWith: roles.filter((r) => r !== field),
        message,
        severity,
      })
    }
  }

  return warnings
}
