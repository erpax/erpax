/**
 * cli/gate — authoritative CI/pre-push gate lanes (confirm:full ⊇ gate).
 */
import { spawnSync } from 'node:child_process'

/** Label + shell command. Labels are stable for confirm/matter reporting. */
export const GATE_LANES: readonly (readonly [string, string])[] = [
  ['standards', 'pnpm erpax standards'],
  ['readme:check', 'pnpm erpax readme check'],
  ['payload-types', 'bash scripts/payload-verify-types.sh'],
  ['lint', 'pnpm erpax lint'],
  ['lint:src', 'pnpm erpax lint src'],
  ['lint:imports', 'pnpm erpax lint imports'],
  ['lint:folders', 'pnpm erpax lint folders'],
  ['typecheck', 'pnpm erpax lint typecheck'],
  ['test:int', 'pnpm erpax test int'],
]

export function runShell(cmd: string, passthrough: readonly string[] = []): number {
  const full = passthrough.length ? `${cmd} ${passthrough.map((a) => JSON.stringify(a)).join(' ')}` : cmd
  const r = spawnSync(full, { shell: true, stdio: 'inherit', cwd: process.cwd() })
  return r.status ?? 1
}

export function runGate(): number {
  const total = GATE_LANES.length
  for (let i = 0; i < total; i++) {
    const [label, cmd] = GATE_LANES[i]!
    console.log(`\n▶ gate [${i + 1}/${total}] — ${label}`)
    const code = runShell(cmd)
    if (code !== 0) {
      console.error(`\n✗ gate — failed at lane ${i + 1}/${total}: ${label}`)
      return code
    }
  }
  console.log(`\n✓ gate — all ${total} lanes green`)
  return 0
}
