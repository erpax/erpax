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
  // A list item carries its key behind a dash — `  - family-names: Rouschev`. Reading
  // only the un-dashed form returned '' for it, and an empty read compares equal to
  // nothing rather than failing: the check would have passed over a missing author.
  const line = cff
    .split('\n')
    .find((l) => l.trimStart().replace(/^-\s*/, '').startsWith(`${key}:`))
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

// npm carries the same identity the DOI record will. An author named in two of three
// faces and absent from the third is the drift this gate exists to refuse.
if (!String(pkg.author?.url ?? '').endsWith(ORCID)) {
  fail(`package.json author.url ${pkg.author?.url ?? '(none)'} does not carry ORCID ${ORCID}`)
}
const given = cffField('given-names')
const family = cffField('family-names')
const cffName = `${given} ${family}`.trim()
if (cffName && pkg.author?.name && cffName !== pkg.author.name) {
  fail(`CITATION.cff author "${cffName}" ≠ package.json author "${pkg.author.name}"`)
}

if (!process.exitCode) {
  console.log(
    `✔ citation consistent — v${pkg.version} · ${pkg.license} · ${pkg.author.name} · ORCID ${ORCID}`,
  )
}
