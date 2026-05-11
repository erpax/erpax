/**
 * Law 16 — Carbon-aware execution. Slice ZZZZZ.
 * gCO2e per chain step → ESRS E1 / CSRD reporting.
 *
 * @standard ESRS E1 climate-change-disclosures
 * @standard EU CSRD 2022/2464 sustainability-reporting-directive
 * @standard GHG Protocol Scope-2 location-based
 */
import type { CarbonEstimate } from './types'

/** gCO2e per kWh — Cloudflare worldwide grid average (2025 published). */
const GRID_INTENSITY_GCO2_PER_KWH = 380
/** kWh per CPU-hour at the edge (conservative) */
const KWH_PER_CPU_HOUR = 0.000003

const TENANT_CARBON = new Map<string, number>()  // tenantId → cumulative gCO2e

export function estimateCarbon(args: { cpuMs: number; egressBytes: number; region?: string }): CarbonEstimate {
  // CPU energy: Watts × hours = kWh
  const cpuHours = args.cpuMs / 3_600_000
  const cpuKwh = cpuHours * KWH_PER_CPU_HOUR
  // Network: 0.06 kWh per GB (industry estimate, IEA 2023)
  const networkKwh = (args.egressBytes / 1_073_741_824) * 0.06
  const totalKwh = cpuKwh + networkKwh
  return {
    gramsCO2e: Math.round(totalKwh * GRID_INTENSITY_GCO2_PER_KWH * 1000) / 1000,
    factorSource: 'Cloudflare grid avg 2025 + IEA network factor',
    region: args.region,
  }
}

export function recordCarbon(tenantId: string, est: CarbonEstimate): { totalGramsCO2e: number } {
  const prev = TENANT_CARBON.get(tenantId) ?? 0
  const next = prev + est.gramsCO2e
  TENANT_CARBON.set(tenantId, next)
  return { totalGramsCO2e: next }
}

export function getTenantCarbon(tenantId: string): number { return TENANT_CARBON.get(tenantId) ?? 0 }
export function __resetCarbon(): void { TENANT_CARBON.clear() }
