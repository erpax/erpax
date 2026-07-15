/**
 * cli/gate — authoritative CI/pre-push gate lanes (confirm:full ⊇ gate).
 */
import { spawnSync } from 'node:child_process'
import { inventoryGateWarnings } from '@/agent/inventory'
import {
  formatPackageApprovalMatrix,
  packageApprovalMatrix,
  runPackageApprovalCli,
} from '@/apply/approval'
import { runPayloadApprovalCli } from '@/payload/approval'
import { startProgressHeartbeat } from './progress-heartbeat'

export const GATE_LANES: readonly (readonly [string, string])[] = [
  ['standards', 'pnpm erpax standards'],
  ['readme:check', 'pnpm erpax readme check'],
  ['payload-types', 'bash scripts/payload-verify-types.sh'],
  ['lint', 'pnpm erpax lint'],
  ['lint:src', 'pnpm erpax lint src'],
  ['lint:imports', 'pnpm erpax lint imports'],
  ['lint:folders', 'pnpm erpax lint folders'],
  ['typecheck', 'pnpm erpax lint typecheck'],
  // Rosetta enforcement — doctor corpus exits 1 on basis growth past ROSETTA_BASELINE
  // (the enforcement debt named in src/rules/SKILL.md: a law is obeyed only when a gate
  // blocks its violation). Makes the shape ratchet + off-ring check fail-closed in CI.
  ['corpus', 'pnpm erpax doctor corpus'],
  ['test:int', 'pnpm erpax test int'],
]

export function runShell(cmd: string, passthrough: readonly string[] = [], heartbeatLabel?: string): number {
  const full = passthrough.length ? `${cmd} ${passthrough.map((a) => JSON.stringify(a)).join(' ')}` : cmd
  const stop = heartbeatLabel ? startProgressHeartbeat(heartbeatLabel) : () => {}
  const r = spawnSync(full, { shell: true, stdio: 'inherit', cwd: process.cwd() })
  stop()
  return r.status ?? 1
}

export function runPayloadApproval(): number {
  return runPayloadApprovalCli()
}

export function runGatePackages(argv: readonly string[] = process.argv.slice(2)): number {
  return runPackageApprovalCli(argv)
}

export { agentWorkApproved, packageApprovalMatrix, formatPackageApprovalMatrix } from '@/apply/approval'

export function runGate(argv: readonly string[] = process.argv.slice(2)): number {
  if (argv[0] === 'packages') return runGatePackages(argv.slice(1))
  if (argv[0] === 'payload') return runPayloadApproval()

  console.log('\n▶ gate [0] — package approval matrix (payload commands first)')
  const packageResult = packageApprovalMatrix({ execute: true, smoke: false })
  if (!packageResult.approved) {
    console.error(formatPackageApprovalMatrix(packageResult, 15))
    return 1
  }
  console.log('✓ package approval matrix')

  for (const warn of inventoryGateWarnings()) console.warn(`⚠ ${warn}`)
  const total = GATE_LANES.length
  for (let i = 0; i < total; i++) {
    const [label, cmd] = GATE_LANES[i]!
    console.log(`\n▶ gate [${i + 1}/${total}] — ${label}`)
    const code = runShell(cmd, [], `gate — ${label}`)
    if (code !== 0) {
      console.error(`\n✗ gate — failed at lane ${i + 1}/${total}: ${label}`)
      return code
    }
  }
  console.log(`\n✓ gate — all ${total} lanes green`)
  return 0
}
