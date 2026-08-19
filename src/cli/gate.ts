/**
 * cli/gate — authoritative CI/pre-push gate lanes (confirm:full ⊇ gate).
 */
import { spawnSync } from 'node:child_process'
import { recordSampleMs, samplesMsOf, timeoutOf } from '@/timeout'
import { inventoryGateWarnings } from '@/agent/inventory'
import {
  formatPackageApprovalMatrix,
  packageApprovalMatrix,
  runPackageApprovalCli,
} from '@/apply/approval'
import { formatVerdict, rosettaGate } from '@/gate/rosetta'
import { runPayloadApprovalCli } from '@/payload/approval'
import { startProgressHeartbeat } from './progress-heartbeat'
import { runTestWaves, runTypecheckWaves } from './local'

export const GATE_LANES: readonly (readonly [string, string])[] = [
  // LANE ZERO — does the app LOAD? Every lane below is a statement about code that runs; if it does not,
  // they are statements about nothing. It currently FAILS (TDZ at fixed/assets:34, [[run]]/load), which is
  // why it must be first: the twelve gates behind it all report green over a corpus that cannot boot, and
  // the vitest setup SWALLOWS the boot failure so `test:int` cannot say so either. Automation on an
  // unloadable corpus produces green lies at machine speed — this lane is the precondition that stops it.
  ['load', 'pnpm erpax load'],
  ['standards', 'pnpm erpax standards'],
  // The 4-SEAL GATE — computationally impossible for unsigned code to pass: every atom's 4-key bind
  // (uuid⊕parent⊕prev⊕next) must recompute AND the whole matrix must fold to UUID_MATRIX_ROOT, or the
  // gate fails closed. Pure matrix recomputation (fast, no boot); forging past it means inverting the
  // 4-key fold (the 2^128 wall). Was proven only in a vitest test — now a lane that cannot be skipped.
  ['seal', 'pnpm erpax seal'],
  // Security INTEGRITY — every claim erpax makes about its own security, typed as a verdict (measured)
  // or a compass (open, with an owner). Fails closed on a verdict whose own proof is red: that is a
  // false statement about security, and there is no acceptable count of those. The RATIO is reported
  // and never ratcheted — forcing it upward would only push honest compasses into dishonest verdicts.
  ['integrity', 'tsx src/convention/discern/corpus/index.ts'],
  // OUTWARD CONTRACTS — erpax's parsers against FROZEN captures of the twelve external
  // rails it codes against. Offline BY CONSTRUCTION (only *Offline functions are
  // imported), because a correct erpax must never fail its own gate because someone
  // else's server is rebooting — the live halves stay behind `--online`. It also fails
  // closed when the coverage ledger cannot resolve its own contracted endpoints, which
  // is how a working ECB contract marked nothing covered for as long as it existed.
  ['outward', 'pnpm erpax outward gate'],
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
  // test:int runs as receipt-split WAVES (quantum-efficient): only suites whose content changed since their
  // last green receipt re-run, self-bounded per batch — never the monolithic boot-everything run that could
  // not fit the 5-min lane. Special-cased in runGate to call runTestWaves directly (its own batch bounds),
  // bypassing the single-command 5-min ladder. The cmd here is the equivalent CLI for hand runs.
  ['test:int', 'pnpm erpax test waves'],
]

export function runShell(cmd: string, passthrough: readonly string[] = [], heartbeatLabel?: string, samplesMs?: readonly number[]): number {
  const full = passthrough.length ? `${cmd} ${passthrough.map((a) => JSON.stringify(a)).join(' ')}` : cmd
  const stop = heartbeatLabel ? startProgressHeartbeat(heartbeatLabel) : () => {}
  // The reasonable timeout is COMPUTED (@/timeout): rung of the 1·2·3·5-minute ladder from the lane's
  // own persisted history (or explicit samples); no history ⇒ the 5-minute ceiling. Past it the LANE
  // is the defect. A successful run records its wall time, so each lane earns its next rung.
  const history = samplesMs ?? (heartbeatLabel ? samplesMsOf(heartbeatLabel) : [])
  const bound = history.length ? timeoutOf(history) : { ms: 300_000, minutes: 5 as const, exceeds: false }
  const started = Date.now()
  const r = spawnSync(full, { shell: true, stdio: 'inherit', cwd: process.cwd(), timeout: bound.ms, killSignal: 'SIGKILL' })
  stop()
  if (r.signal) {
    console.error(`\n✗ timed out at ${bound.minutes}min (computed rung) — a command past the ladder is split, never the ceiling raised`)
    return 1
  }
  const code = r.status ?? 1
  if (code === 0 && heartbeatLabel) recordSampleMs(heartbeatLabel, Date.now() - started)
  return code
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

  // Lane [0] — the rosetta STRUCTURAL gate (fast first lane). corpusRoot() is the cache: an unchanged
  // corpus root reuses its sealed verdict in O(1); a changed root pays only O(changed). This is fold-first
  // for STRUCTURE (dedup · tamper-evidence) — it does NOT compile TS or run behaviour, so the semantic
  // lanes below (typecheck · test:int) remain the required complement and always run after.
  console.log('\n▶ gate [0] — rosetta structural fold (incremental)')
  const structural = rosettaGate()
  console.log(formatVerdict(structural))
  if (!structural.pass) {
    console.error('\n✗ gate — rosetta structural gate FAILED (new duplication or broken seal chain)')
    return 1
  }

  for (const warn of inventoryGateWarnings()) console.warn(`⚠ ${warn}`)
  const total = GATE_LANES.length
  for (let i = 0; i < total; i++) {
    const [label, cmd] = GATE_LANES[i]!
    console.log(`\n▶ gate [${i + 1}/${total}] — ${label}`)
    // test:int / typecheck are quantumised waves — self-bounded; never under the 5-min shell rung.
    const code =
      label === 'test:int'
        ? runTestWaves([])
        : label === 'typecheck'
          ? runTypecheckWaves([])
          : runShell(cmd, [], `gate — ${label}`)
    if (code !== 0) {
      console.error(`\n✗ gate — failed at lane ${i + 1}/${total}: ${label}`)
      return code
    }
  }
  console.log(`\n✓ gate — all ${total} lanes green`)
  return 0
}
