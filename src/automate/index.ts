import { randomUUID } from 'node:crypto'
import { Rational, INITIAL_CONFIDENCE, incrementConfidence, CONVERGENCE_THRESHOLD, gte, lte } from '@/exact'

export interface LoopState {
  readonly loopId: string
  readonly iteration: number
  readonly hypothesis: string
  readonly evidence: Buffer
  readonly confidence: Rational
  readonly status: 'running' | 'converged' | 'diverged'
}

export interface AutomationLoop {
  readonly problem: string
  readonly initialHypothesis: string
  readonly states: readonly LoopState[]
  readonly currentState: LoopState
}

export function initializeLoop(problem: string, hypothesis: string): AutomationLoop {
  const loopId = randomUUID()
  const initialState: LoopState = {
    loopId,
    iteration: 0,
    hypothesis,
    evidence: Buffer.from(hypothesis, 'utf8'),
    confidence: INITIAL_CONFIDENCE,
    status: 'running',
  }

  return {
    problem,
    initialHypothesis: hypothesis,
    states: [initialState],
    currentState: initialState,
  }
}

export function refineHypothesis(loop: AutomationLoop, evidence: Buffer): LoopState {
  const currentIteration = loop.currentState.iteration + 1
  const newConfidence = incrementConfidence(loop.currentState.confidence)

  const newState: LoopState = {
    loopId: loop.currentState.loopId,
    iteration: currentIteration,
    hypothesis: `${loop.currentState.hypothesis} [iteration ${currentIteration}]`,
    evidence,
    confidence: newConfidence,
    status: gte(newConfidence, CONVERGENCE_THRESHOLD) ? 'converged' : 'running',
  }

  return newState
}

export function detectDivergence(loop: AutomationLoop, _evidence: Buffer): boolean {
  if (loop.states.length < 3) return false

  const recent = loop.states.slice(-3)

  const isDecreasing =
    gt(recent[0]!.confidence, recent[1]!.confidence) &&
    gt(recent[1]!.confidence, recent[2]!.confidence)

  return isDecreasing
}

function gt(a: Rational, b: Rational): boolean {
  return !lte(a, b)
}

export async function runLoop(
  problem: string,
  initialHypothesis: string,
  maxIterations: number = 100,
): Promise<AutomationLoop> {
  const loop = initializeLoop(problem, initialHypothesis)
  const states: LoopState[] = [...loop.states]

  for (let i = 0; i < maxIterations; i++) {
    const evidence = generateEvidence(problem, loop.currentState.hypothesis)
    const newState = refineHypothesis(loop, evidence)

    states.push(newState)

    if (newState.status === 'converged') {
      return {
        problem,
        initialHypothesis,
        states,
        currentState: newState,
      }
    }

    if (detectDivergence({ ...loop, states, currentState: newState }, evidence)) {
      return {
        problem,
        initialHypothesis,
        states,
        currentState: { ...newState, status: 'diverged' },
      }
    }
  }

  return {
    problem,
    initialHypothesis,
    states,
    currentState: states[states.length - 1]!,
  }
}

function generateEvidence(problem: string, hypothesis: string): Buffer {
  const combined = `${problem}:${hypothesis}:${Date.now()}`
  return Buffer.from(combined, 'utf8')
}
