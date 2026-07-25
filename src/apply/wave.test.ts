import { describe, it, expect, beforeEach, afterAll } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { coordinatedWave, scanWaveAxisDebt, __resetWaveRunnerForTests, __setWaveRunnerActiveForTests, WAVE_SEAL_AXES } from './wave'

// BOUNDED WITNESS (was 194s → 60s timeout): the wave scan is corpus-scale, so scanning
// process.cwd() (the ~19k-file corpus) blew the per-test bound. The LOGIC under test —
// axis count, the single-runner lock, dry-run balance — is corpus-independent, so a
// minimal fixture corpus is a sufficient witness. cwd + force are first-class opts.
const cwd = mkdtempSync(join(tmpdir(), 'wave-'))
mkdirSync(join(cwd, 'src', 'atom'), { recursive: true })
writeFileSync(join(cwd, 'src', 'atom', 'index.ts'), 'export const x = 1\n')

describe('apply/wave', () => {
  beforeEach(() => __resetWaveRunnerForTests())
  afterAll(() => rmSync(cwd, { recursive: true, force: true }))
  it('scan', () => expect(scanWaveAxisDebt(cwd, WAVE_SEAL_AXES).length).toBe(WAVE_SEAL_AXES.length))
  it('single runner', () => { __setWaveRunnerActiveForTests(true); expect(coordinatedWave({ cwd, batch: 3, dryRun: true }).aborted).toBe(true); __resetWaveRunnerForTests() })
  it('dry run', () => expect(coordinatedWave({ cwd, batch: 10, dryRun: true, force: true }).sessionBalanced).toBe(true))
})
