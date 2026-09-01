#!/usr/bin/env node
/**
 * citation-consistent — the DOI metadata must agree with the repo it describes.
 *
 * Zenodo mints a DOI from `.zenodo.json`; GitHub renders `CITATION.cff`; npm reads
 * `package.json`. Three faces of ONE identity, so they may not drift: a release whose
 * citation names a different author, licence or version publishes a false record that
 * is permanent — a DOI cannot be recalled, only superseded.
 *
 * Fails closed. Run: node scripts/citation-consistent.mjs
 */
import { readFileSync } from 'node:fs'

const ORCID = '0009-0000-7312-9778'
const fail = (msg) => {
  console.error(`✖ ${msg}`)
  process.exitCode = 1
}

const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
const zen = JSON.parse(readFileSync('.zenodo.json', 'utf8'))
const cff = readFileSync('CITATION.cff', 'utf8')

// CFF is read by line, not parsed: js-yaml is not a root dependency, and a gate that
// needs an install is a gate that gets skipped ([[rules]]: a gate that can be skipped
// is prose). The fields checked are single-line scalars, so a line read is exact.
const cffField = (key) => {
  const line = cff.split('\n').find((l) => l.trimStart().startsWith(`${key}:`))
  return line ? line.slice(line.indexOf(':') + 1).trim().replace(/^["']|["']$/g, '') : ''
}

if (cffField('version') !== pkg.version) {
  fail(`CITATION.cff version ${cffField('version')} ≠ package.json ${pkg.version}`)
}
if (cffField('license') !== pkg.license) {
  fail(`CITATION.cff license ${cffField('license')} ≠ package.json ${pkg.license}`)
}
if (zen.license.toUpperCase() !== pkg.license.toUpperCase()) {
  fail(`.zenodo.json license ${zen.license} ≠ package.json ${pkg.license}`)
}
if (zen.creators?.[0]?.orcid !== ORCID) {
  fail(`.zenodo.json ORCID ${zen.creators?.[0]?.orcid} ≠ ${ORCID}`)
}
if (!cffField('orcid').endsWith(ORCID)) {
  fail(`CITATION.cff ORCID ${cffField('orcid')} ≠ ${ORCID}`)
}
if (zen.upload_type !== 'software') fail(`.zenodo.json upload_type must be "software"`)

if (!process.exitCode) {
  console.log(`✔ citation consistent — v${pkg.version} · ${pkg.license} · ORCID ${ORCID}`)
}
