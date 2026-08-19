import { randomUUID } from 'node:crypto'

export interface ProblemBasis {
  readonly problems: readonly string[]
  readonly dimensions: readonly string[]
  readonly complete: boolean
  readonly spansCoverage: Map<string, number>
}

export interface AutoWave {
  readonly waveId: string
  readonly basedOn: string
  readonly decomposition: readonly string[]
  readonly generated: boolean
}

// The 7 Millennium Problems as basis vectors
const BASIS_PROBLEMS = [
  'P vs NP',
  'Riemann Hypothesis',
  'Yang-Mills',
  'Navier-Stokes',
  'Hodge Conjecture',
  'BSD Conjecture',
  'Collatz Conjecture',
] as const

// Dimensional coverage each problem addresses
const BASIS_DIMENSIONS: Record<string, readonly string[]> = {
  'P vs NP': ['complexity', 'decidability', 'algorithms'],
  'Riemann Hypothesis': ['distribution', 'patterns', 'transcendental'],
  'Yang-Mills': ['fields', 'symmetry', 'quantization'],
  'Navier-Stokes': ['flow', 'dynamics', 'continuity'],
  'Hodge Conjecture': ['geometry', 'topology', 'cohomology'],
  'BSD Conjecture': ['algebra', 'number-theory', 'L-functions'],
  'Collatz Conjecture': ['sequences', 'iteration', 'divergence'],
}

export function recognizeBasis(): ProblemBasis {
  const dimensions = new Set<string>()
  const spansCoverage = new Map<string, number>()

  for (const problem of BASIS_PROBLEMS) {
    const dims = BASIS_DIMENSIONS[problem]
    if (dims) {
      dims.forEach(d => dimensions.add(d))
      spansCoverage.set(problem, dims.length)
    }
  }

  return {
    problems: [...BASIS_PROBLEMS],
    dimensions: Array.from(dimensions),
    complete: computeCompleteness(dimensions),
    spansCoverage,
  }
}

function computeCompleteness(dimensions: Set<string>): boolean {
  const required = ['complexity', 'distribution', 'fields', 'flow', 'geometry', 'algebra', 'sequences']
  return required.every(d => dimensions.has(d))
}

export function isBasisComplete(basis: ProblemBasis): boolean {
  return basis.complete && basis.problems.length === 7
}

export function computeBasisSpan(basis: ProblemBasis): number {
  let span = 0
  for (const coverage of basis.spansCoverage.values()) {
    span += coverage
  }
  return span
}

export function decomposeIntoBasis(problem: string): readonly string[] {
  const decomposition: string[] = []

  if (problem.includes('complexity') || problem.includes('algorithm')) {
    decomposition.push('P vs NP')
  }
  if (problem.includes('pattern') || problem.includes('distribution')) {
    decomposition.push('Riemann Hypothesis')
  }
  if (problem.includes('field') || problem.includes('symmetry')) {
    decomposition.push('Yang-Mills')
  }
  if (problem.includes('flow') || problem.includes('dynamics')) {
    decomposition.push('Navier-Stokes')
  }
  if (problem.includes('geometry') || problem.includes('space')) {
    decomposition.push('Hodge Conjecture')
  }
  if (problem.includes('algebra') || problem.includes('number')) {
    decomposition.push('BSD Conjecture')
  }
  if (problem.includes('sequence') || problem.includes('iterate')) {
    decomposition.push('Collatz Conjecture')
  }

  return decomposition.length > 0 ? decomposition : ['P vs NP']
}

export async function autoWaveGenerator(basis: ProblemBasis): Promise<AutoWave[]> {
  if (!isBasisComplete(basis)) {
    return []
  }

  const waves: AutoWave[] = []

  const classicalProblems = [
    'Fermat Last Theorem',
    'Four Color Theorem',
    'Cantor Continuum Hypothesis',
    'Twin Prime Conjecture',
    'Goldbach Conjecture',
    'Polya Conjecture',
  ]

  for (const problem of classicalProblems) {
    const decomposition = decomposeIntoBasis(problem)

    waves.push({
      waveId: randomUUID(),
      basedOn: problem,
      decomposition,
      generated: true,
    })
  }

  return waves
}

export function recognizeCompleteness(): {
  complete: boolean
  reason: string
  nextAction: string
} {
  const basis = recognizeBasis()
  const span = computeBasisSpan(basis)
  const complete = isBasisComplete(basis)

  return {
    complete,
    reason: complete
      ? `7 Millennium Problems span ${span} dimensions covering all mathematics`
      : 'Basis incomplete',
    nextAction: complete
      ? 'Auto-generate waves for classical problems via basis decomposition'
      : 'Continue solving base problems',
  }
}

export async function spawnAutoWaves(): Promise<AutoWave[]> {
  const awareness = recognizeCompleteness()

  if (!awareness.complete) {
    return []
  }

  const basis = recognizeBasis()
  return autoWaveGenerator(basis)
}
