
export interface SecurityFinding {
  readonly control: string
  readonly blueHolds: boolean
  readonly forgeCostLog2: number
}

/** A finding is balanced — both blue verdict and red price are present. */
export function balancedFinding(f: SecurityFinding): boolean {
  return f.control.length > 0 && Number.isFinite(f.forgeCostLog2) && f.forgeCostLog2 >= 0
}

/** Bidirectional read — verify ⊕ price (double-entry pair). */
export function bidirectionalVerdict(f: SecurityFinding): { verify: boolean; priceLog2: number } {
  return { verify: f.blueHolds, priceLog2: f.forgeCostLog2 }
}

/** Conjugate law — deeper compression ⇒ higher forging temperature. */
export function conjugateHolds(compressionBits: number, forgeCostLog2: number): boolean {
  return forgeCostLog2 >= compressionBits
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const f: SecurityFinding = { control: 'uuid-seal', blueHolds: true, forgeCostLog2: 128 }
  console.log('quantum/security — balanced=' + balancedFinding(f) + ' · conjugate=' + conjugateHolds(128, 128))
}

/** @index-cross.foldback child=quantum/security parent=quantum — this cross folds back into its parent. */
