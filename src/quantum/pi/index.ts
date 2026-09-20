import { exactMax } from '@/algebra'

/** Lower bound on offset digits to locate a string of N decimal digits in π — ~N. */
export function piOffsetLowerBound(dataDigits: number): number {
  return exactMax(0, dataDigits)
}

/** Information conserved — offset scale tracks payload scale (not free compression). */
export function informationConserved(dataDigits: number, offsetDigits: number): boolean {
  return offsetDigits >= piOffsetLowerBound(dataDigits)
}

/** Finite uuid ceiling vs infinite stream address — complementary duality. */
export const FINITE_UUID_BITS = 128

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log(
    'quantum/pi — offset bound for 100 digits=' +
      piOffsetLowerBound(100) +
      ' · conserved=' +
      informationConserved(100, 100),
  )
}

/** @index-cross.foldback child=quantum/pi parent=quantum — this cross folds back into its parent. */
