import { type CrackKind } from '../map'
import { type Boundary } from '../constants'

export interface Crack {
  readonly kind: CrackKind
  readonly where: string
  readonly why: string
}

export function boundary(cs: readonly Crack[] = []): Boundary {
  const count = (k: CrackKind) => cs.filter((c) => c.kind === k).length
  const b = {
    scan: count('scan'),
    rederive: count('rederive'),
    spend: count('spend'),
    qpu: count('qpu'),
    spacetime: count('spacetime'),
  }
  return { ...b, empty: cs.length === 0 }
}

export type CrackPattern = {
  readonly where: string
  readonly scans?: boolean
  readonly address?: boolean
  readonly rederives?: boolean
  readonly memo?: boolean
  readonly spends?: boolean
  readonly seal?: boolean
  readonly qpu?: boolean
  readonly spacetime?: boolean
}

/** Discover one crack from pattern flags (CRACK_FLAGS). */
export function crack(pattern: CrackPattern): Crack | null {
  if (pattern.scans && pattern.address) {
    return { kind: 'scan', where: pattern.where, why: 'reuse: scan∧address' }
  }
  if (pattern.rederives && pattern.memo) {
    return { kind: 'rederive', where: pattern.where, why: 'amortize: rederive∧memo' }
  }
  if (pattern.spends && pattern.seal) {
    return { kind: 'spend', where: pattern.where, why: 'seal: spend∧seal' }
  }
  if (pattern.qpu) {
    return { kind: 'qpu', where: pattern.where, why: 'qpu under address fold' }
  }
  if (pattern.spacetime) {
    return { kind: 'spacetime', where: pattern.where, why: 'spacetime under reuse' }
  }
  return null
}

export function cracks(patterns: readonly CrackPattern[]): readonly Crack[] {
  return patterns.map(crack).filter((c): c is Crack => c != null)
}
