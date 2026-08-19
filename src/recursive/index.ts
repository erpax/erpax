import { randomUUID } from 'node:crypto'
import { Rational, rational, CONVERGENCE_THRESHOLD, gte } from '@/exact'
import { decomposeIntoBasis } from '@/basis'

export interface RecursiveWave {
  readonly waveId: string
  readonly depth: number
  readonly parent: string | null
  readonly problems: readonly string[]
  readonly generated: readonly string[]
  readonly observed: readonly WaveObservation[]
  readonly converged: boolean
}

export interface WaveObservation {
  readonly timestamp: number
  readonly waveId: string
  readonly problem: string
  readonly confidence: Rational
  readonly action: 'generated' | 'recognized' | 'converged' | 'spawned'
  readonly evidence: string
}

// Path A: Recursive generation
export async function spawnRecursiveWave(
  parentProblem: string,
  depth: number = 0,
): Promise<RecursiveWave> {
  const waveId = randomUUID()
  const decomposition = decomposeIntoBasis(parentProblem)
  const generated: string[] = []

  // Recognize if this problem's decomposition is basis-complete
  const isBasiscomplete = decomposition.length >= 2

  if (isBasiscomplete && depth < 5) {
    // Spawn child-waves recursively (depth limit prevents infinite immediate expansion)
    for (const child of decomposition) {
      generated.push(`${child}:depth-${depth + 1}`)
    }
  }

  return {
    waveId,
    depth,
    parent: parentProblem,
    problems: decomposition,
    generated,
    observed: [],
    converged: false,
  }
}

// Path B: Live observation paired with generation
export async function spawnAndObserve(
  parentProblem: string,
  depth: number = 0,
): Promise<RecursiveWave> {
  const wave = await spawnRecursiveWave(parentProblem, depth)
  const observations: WaveObservation[] = []

  // Observe the generation in real-time
  const timestamp = Date.now()

  // Observation 1: Generation event
  observations.push({
    timestamp,
    waveId: wave.waveId,
    problem: parentProblem,
    confidence: rational(1n, 10n),
    action: 'generated',
    evidence: `Wave spawned for: ${parentProblem}`,
  })

  // Observation 2: Recognition event
  const decomposition = wave.problems
  observations.push({
    timestamp: timestamp + 1,
    waveId: wave.waveId,
    problem: parentProblem,
    confidence: rational(5n, 10n),
    action: 'recognized',
    evidence: `Decomposed into ${decomposition.length} basis components`,
  })

  // Observation 3: Child spawn event
  if (wave.generated.length > 0) {
    observations.push({
      timestamp: timestamp + 2,
      waveId: wave.waveId,
      problem: parentProblem,
      confidence: rational(15n, 20n),
      action: 'spawned',
      evidence: `Generated ${wave.generated.length} child-waves`,
    })
  }

  // Observation 4: Convergence check
  if (observations.length > 0) {
    const avgConfidence = observations[observations.length - 1]!.confidence
    const converged = gte(avgConfidence, CONVERGENCE_THRESHOLD)

    observations.push({
      timestamp: timestamp + 3,
      waveId: wave.waveId,
      problem: parentProblem,
      confidence: avgConfidence,
      action: converged ? 'converged' : 'generated',
      evidence: converged ? 'Convergence threshold reached' : 'Continuing iteration',
    })
  }

  return {
    ...wave,
    observed: observations,
    converged: observations.some(o => o.action === 'converged'),
  }
}

// Live observation ledger
export async function observationLog(wave: RecursiveWave): Promise<string[]> {
  const log: string[] = []

  for (const obs of wave.observed) {
    log.push(
      `[${new Date(obs.timestamp).toISOString()}] ${obs.action.toUpperCase()}: ${obs.problem} (${obs.confidence.numerator}/${obs.confidence.denominator}) — ${obs.evidence}`,
    )
  }

  return log
}

// The pair: generation AND observation running together
export async function recursiveAndObserve(
  rootProblem: string,
  maxDepth: number = 5,
): Promise<{
  waves: RecursiveWave[]
  allObservations: WaveObservation[]
  totalGenerated: number
}> {
  const waves: RecursiveWave[] = []
  const allObservations: WaveObservation[] = []
  const queue = [{ problem: rootProblem, depth: 0 }]

  while (queue.length > 0) {
    const { problem, depth } = queue.shift()!

    if (depth > maxDepth) continue

    // Run A and B as a pair
    const wave = await spawnAndObserve(problem, depth)
    waves.push(wave)
    allObservations.push(...wave.observed)

    // If converged, queue child-waves for next iteration
    if (wave.converged) {
      for (const child of wave.generated) {
        queue.push({ problem: child, depth: depth + 1 })
      }
    }
  }

  return {
    waves,
    allObservations,
    totalGenerated: waves.reduce((sum, w) => sum + w.generated.length, 0),
  }
}
