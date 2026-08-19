// Exact rational arithmetic - no floating point approximations

export interface Rational {
  readonly numerator: bigint
  readonly denominator: bigint
}

export interface Confidence {
  readonly value: Rational
  readonly proof: string
}

export function rational(n: bigint, d: bigint): Rational {
  if (d === 0n) throw new Error('denominator cannot be zero')
  const sign = (n < 0n) !== (d < 0n) ? -1n : 1n
  const absN = n < 0n ? -n : n
  const absD = d < 0n ? -d : d
  const g = gcd(absN, absD)
  return {
    numerator: sign * (absN / g),
    denominator: absD / g,
  }
}

function gcd(a: bigint, b: bigint): bigint {
  return b === 0n ? a : gcd(b, a % b)
}

export function add(a: Rational, b: Rational): Rational {
  const num = a.numerator * b.denominator + b.numerator * a.denominator
  const den = a.denominator * b.denominator
  return rational(num, den)
}

export function multiply(a: Rational, b: Rational): Rational {
  return rational(a.numerator * b.numerator, a.denominator * b.denominator)
}

export function lte(a: Rational, b: Rational): boolean {
  return a.numerator * b.denominator <= b.numerator * a.denominator
}

export function gte(a: Rational, b: Rational): boolean {
  return a.numerator * b.denominator >= b.numerator * a.denominator
}

export function eq(a: Rational, b: Rational): boolean {
  return a.numerator === b.numerator && a.denominator === b.denominator
}

export const CONVERGENCE_THRESHOLD: Rational = rational(19n, 20n)

export function isConverged(confidence: Confidence): boolean {
  return gte(confidence.value, CONVERGENCE_THRESHOLD)
}

export function incrementConfidence(current: Rational): Rational {
  const step = rational(1n, 20n)
  return add(current, step)
}

export const INITIAL_CONFIDENCE: Rational = rational(1n, 10n)

export function proveConfidence(value: Rational): Confidence {
  return {
    value,
    proof: `Confidence ${value.numerator}/${value.denominator} is exact and sound`,
  }
}

export function toString(r: Rational): string {
  return `${r.numerator}/${r.denominator}`
}
