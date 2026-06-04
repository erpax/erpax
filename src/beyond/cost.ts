/**
 * Law 15 — Cost accountability per chain step.
 * Slice ZZZZZ. Every chain step records its compute/storage/network cost.
 */
import type { CostMetric } from '@/beyond/types'

const TENANT_BUDGETS = new Map<string, { spentMicroUsd: number; capMicroUsd: number }>()

export function setBudget(tenantId: string, capMicroUsd: number): void {
  const cur = TENANT_BUDGETS.get(tenantId)
  TENANT_BUDGETS.set(tenantId, { spentMicroUsd: cur?.spentMicroUsd ?? 0, capMicroUsd })
}

export function recordCost(tenantId: string, cost: CostMetric): { ok: boolean; remaining?: number } {
  const cur = TENANT_BUDGETS.get(tenantId) ?? { spentMicroUsd: 0, capMicroUsd: Infinity }
  const next = cur.spentMicroUsd + (cost.microUsd ?? estimateMicroUsd(cost))
  TENANT_BUDGETS.set(tenantId, { ...cur, spentMicroUsd: next })
  if (next > cur.capMicroUsd) return { ok: false }
  return { ok: true, remaining: cur.capMicroUsd - next }
}

/** Cloudflare-Workers-aligned price list (Apr-2026 published rates). */
export function estimateMicroUsd(c: CostMetric): number {
  // CPU: $0.02 / million CPU-ms = $0.00002/CPU-ms = 20 microUSD/sec → 0.02 microUSD/ms
  // Storage (R2/D1 read): negligible at row scale; included in egress
  // Egress: $0.05/GB outbound = 0.05 microUSD/KB ≈ 50 microUSD/MB
  // AI tokens (Workers AI): $0.10/M tokens = 0.0001 microUSD/token
  const cpu = c.cpuMs * 0.02
  const egress = c.egressBytes / 1024 * 0.05
  const ai = ((c.aiTokensIn ?? 0) + (c.aiTokensOut ?? 0)) * 0.0001
  return Math.round((cpu + egress + ai) * 100) / 100
}

export function getBudget(tenantId: string): { spentMicroUsd: number; capMicroUsd: number } | undefined {
  return TENANT_BUDGETS.get(tenantId)
}

export function __resetBudgets(): void { TENANT_BUDGETS.clear() }
