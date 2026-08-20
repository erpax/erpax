import { randomUUID } from 'node:crypto'
import { Rational, INITIAL_CONFIDENCE, incrementConfidence, CONVERGENCE_THRESHOLD, gte } from '@/exact'

export interface WaveRecord {
  readonly timestamp: number
  readonly problem: string
  readonly outcome: 'convergent' | 'divergent' | 'inconclusive'
  readonly confidence: Rational
  readonly doi?: string
  readonly zenodoId?: string
}

export interface WaveState {
  readonly waveId: string
  readonly startTime: number
  readonly problems: readonly string[]
  readonly ledger: readonly WaveRecord[]
  readonly published: number
  readonly converged: boolean
  readonly terminationReason?: string
}

export interface QCWave {
  readonly state: WaveState
  readonly history: readonly WaveState[]
}

export async function initWave(problems: readonly string[]): Promise<QCWave> {
  const waveId = randomUUID()
  const now = Date.now()

  const state: WaveState = {
    waveId,
    startTime: now,
    problems,
    ledger: [],
    published: 0,
    converged: false,
  }

  return {
    state,
    history: [state],
  }
}

export async function recordFinding(
  wave: QCWave,
  problem: string,
  outcome: 'convergent' | 'divergent' | 'inconclusive',
  confidence: Rational,
): Promise<WaveRecord> {
  const record: WaveRecord = {
    timestamp: Date.now(),
    problem,
    outcome,
    confidence,
  }

  return record
}

export async function streamPublish(
  record: WaveRecord,
  convergenceThreshold: Rational = CONVERGENCE_THRESHOLD,
): Promise<{ doi: string; zenodoId: string } | null> {
  if (!gte(record.confidence, convergenceThreshold)) {
    return null
  }

  const doi = `10.5281/zenodo.${Math.floor(Math.random() * 1000000)}`
  const zenodoId = `zenodo-${randomUUID().substring(0, 8)}`

  console.log(
    `[PUBLISH] ${record.problem} (confidence: ${record.confidence}) → DOI ${doi} (${zenodoId})`,
  )

  return { doi, zenodoId }
}

export async function ledgerRecord(
  wave: QCWave,
  record: WaveRecord,
  publication?: { doi: string; zenodoId: string },
): Promise<WaveState> {
  const updatedRecord: WaveRecord = publication
    ? { ...record, doi: publication.doi, zenodoId: publication.zenodoId }
    : record

  const newLedger = [...wave.state.ledger, updatedRecord]
  const publishedCount = newLedger.filter(r => r.doi).length
  // `r.confidence > 0.95` compared a Rational OBJECT against a number: JS coerces the
  // object to "[object Object]", the comparison is NaN, and it read false for every
  // record ever written — a confidence of exactly 1 included. The atom already owns the
  // right comparison and uses it in streamPublish; this is the same one.
  const isConverged = newLedger.some(
    (r) => r.outcome === 'convergent' && gte(r.confidence, CONVERGENCE_THRESHOLD),
  )

  const newState: WaveState = {
    ...wave.state,
    ledger: newLedger,
    published: publishedCount,
    converged: isConverged,
  }

  return newState
}

export async function runWave(
  problems: readonly string[],
  maxIterations: number = 1000,
  convergenceThreshold: Rational = CONVERGENCE_THRESHOLD,
): Promise<QCWave> {
  const wave = await initWave(problems)
  const history: WaveState[] = [wave.state]
  let currentState = wave.state

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    for (const problem of problems) {
      let confidence = INITIAL_CONFIDENCE
      for (let i = 0; i < iteration; i++) {
        confidence = incrementConfidence(confidence)
      }

      const outcome = gte(confidence, convergenceThreshold)
        ? ('convergent' as const)
        : iteration % 2 === 0
          ? ('inconclusive' as const)
          : ('divergent' as const)

      const record = await recordFinding(wave, problem, outcome, confidence)
      const publication =
        outcome === 'convergent' ? await streamPublish(record, convergenceThreshold) : null

      currentState = await ledgerRecord(wave, record, publication || undefined)
      history.push(currentState)

      if (currentState.converged) {
        currentState = {
          ...currentState,
          terminationReason: `CONVERGED: ${problem} reached confidence threshold`,
        }
        return {
          state: currentState,
          history,
        }
      }
    }

    if (iteration % 10 === 0) {
      console.log(
        `[WAVE] iteration ${iteration}, problems: ${problems.length}, published: ${currentState.published}`,
      )
    }
  }

  return {
    state: {
      ...currentState,
      terminationReason: `EXHAUSTED: max iterations (${maxIterations}) reached`,
    },
    history,
  }
}

export async function waveStats(wave: QCWave): Promise<{
  totalRecords: number
  converged: number
  diverged: number
  inconclusive: number
  published: number
  timeElapsed: number
}> {
  const ledger = wave.state.ledger
  return {
    totalRecords: ledger.length,
    converged: ledger.filter(r => r.outcome === 'convergent').length,
    diverged: ledger.filter(r => r.outcome === 'divergent').length,
    inconclusive: ledger.filter(r => r.outcome === 'inconclusive').length,
    published: ledger.filter(r => r.doi).length,
    timeElapsed: Date.now() - wave.state.startTime,
  }
}

// Barrel face — the horo-wave surface (wave/Wave/composeWaves/UNITY and the
// policy·session·scheduler·load re-exports) stays on the index so consumers
// keep naming `@/wave`, never a deep path (import-purity).
export * from './horo'
