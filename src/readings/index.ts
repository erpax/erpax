
import { boundaryCrossHolds, mayReport, readingSnapshotUuid } from '@/quantum/device'

/** Collapsed capture at the device edge — numbers only, raw stream stays local. */
export interface DeviceReading {
  readonly signal: string
  readonly numbers: readonly number[]
  readonly at: string
  readonly unit?: string
  readonly rawStream?: unknown
}

/** Lawful crossing: detectable signal and only numbers cross the boundary. */
export function readingBoundaryHolds(reading: DeviceReading): boolean {
  return (
    mayReport(reading.signal) &&
    boundaryCrossHolds({ numbers: [...reading.numbers], rawStream: reading.rawStream })
  )
}

/** Content-address the collapsed snapshot (device edge). */
export const readingUuid = (reading: DeviceReading): string => readingSnapshotUuid(reading)

if (import.meta.url === 'file://' + process.argv[1]) {
  const r: DeviceReading = { signal: 'rppg', numbers: [72], at: '2026-06-08T12:00:00.000Z' }
  console.log(
    'readings — boundary=' +
      readingBoundaryHolds(r) +
      ' · uuid=' +
      readingUuid(r).slice(0, 8) +
      '…',
  )
}
