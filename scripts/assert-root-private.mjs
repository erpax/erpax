#!/usr/bin/env node
/**
 * assert-root-private — the licensed app is never published.
 *
 * The root package is CC-BY-NC-ND-4.0 and private; only packages/* go to npm. Both
 * publish workflows asserted this inline, in two hand-copied node -e blocks — and a
 * law stated twice is a law nothing can prove is missing from a THIRD place
 * ([[rules]]: duplication is camouflage).
 */
import { readFileSync } from 'node:fs'

const p = JSON.parse(readFileSync('package.json', 'utf8'))
if (p.private !== true) {
  console.error('✖ root package.json must be private — it is the licensed app')
  process.exit(1)
}
if (p.name !== 'erpax') {
  console.error(`✖ unexpected root name "${p.name}" — expected erpax`)
  process.exit(1)
}
console.log('✔ root private — will not publish the licensed app')
