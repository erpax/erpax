import { describe, it, expect, beforeEach } from 'vitest'
import { coordinatedWave, scanWaveAxisDebt, __resetWaveRunnerForTests, __setWaveRunnerActiveForTests, WAVE_SEAL_AXES } from './wave'
describe('apply/wave', () => {
  beforeEach(() => __resetWaveRunnerForTests())
  it('scan', () => expect(scanWaveAxisDebt(process.cwd(), WAVE_SEAL_AXES).length).toBe(WAVE_SEAL_AXES.length))
  it('single runner', () => { __setWaveRunnerActiveForTests(true); expect(coordinatedWave({ batch: 3, dryRun: true }).aborted).toBe(true); __resetWaveRunnerForTests() })
  it('dry run', () => expect(coordinatedWave({ batch: 10, dryRun: true }).sessionBalanced).toBe(true))
})
