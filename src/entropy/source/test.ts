import { randomBytes } from 'node:crypto'
import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'
import { classify, manifest, runFrom, verdictHolds, type MeasureRun } from '@/convention/discern'
import { commentsOf } from '@/syntax'

import {
  admit,
  attest,
  CLAIMS,
  deriveFromAdmitted,
  EntropyRefused,
  EVIDENCE,
  memoryRegistry,
  MIN_SEED_BYTES,
  seedAddress,
  SURFACES,
} from './index'

const HW_KEY = Buffer.alloc(32, 0xa1)
const SOFTWARE_KEY = Buffer.alloc(32, 0xb2)
const good = (): Buffer => randomBytes(MIN_SEED_BYTES)

describe('entropy/source — proven at the source, never by inspection', () => {
  it('an attested, unique seed is ADMITTED', () => {
    const reg = memoryRegistry()
    const seed = good()
    const a = admit(seed, 'device-1', attest(seed, HW_KEY), HW_KEY, reg)
    expect(a.deviceId).toBe('device-1')
    expect(a.address).toBe(seedAddress(seed))
    // the registry stores the ADDRESS, never the seed — a registry holding what it guards is worse
    expect(JSON.stringify(a)).not.toContain(seed.toString('hex'))
  })

  it('a software RNG is rejected — not by how its bytes look, but because it lacks the key', () => {
    const reg = memoryRegistry()
    const seed = good() // statistically perfect randomness, and still refused
    const forged = attest(seed, SOFTWARE_KEY)
    expect(() => admit(seed, 'device-1', forged, HW_KEY, reg)).toThrow(EntropyRefused)
    expect(() => admit(seed, 'device-1', forged, HW_KEY, reg)).toThrow(/attestation-invalid/)
  })

  it('THE FLEET MEASUREMENT: the same seed on a second device is a deterministic RNG', () => {
    const reg = memoryRegistry()
    const seed = good()
    const tag = attest(seed, HW_KEY)
    admit(seed, 'device-1', tag, HW_KEY, reg) // fine
    // no single-device test can see this — it only exists across the fleet
    expect(() => admit(seed, 'device-2', tag, HW_KEY, reg)).toThrow(/weak-rng-collision/)
  })

  it('the SAME device re-presenting its own seed is not a collision', () => {
    const reg = memoryRegistry()
    const seed = good()
    const tag = attest(seed, HW_KEY)
    admit(seed, 'device-1', tag, HW_KEY, reg)
    expect(() => admit(seed, 'device-1', tag, HW_KEY, reg)).not.toThrow()
  })

  it('a short seed is refused BEFORE inspection', () => {
    const reg = memoryRegistry()
    const short = randomBytes(MIN_SEED_BYTES - 1)
    expect(() => admit(short, 'd', attest(short, HW_KEY), HW_KEY, reg)).toThrow(/seed-too-short/)
  })

  it('FAIL CLOSED: no key is derived from an un-admitted seed', () => {
    const reg = memoryRegistry()
    expect(() => deriveFromAdmitted(good(), 'signing', reg)).toThrow(/seed-not-admitted/)
  })

  it('an admitted seed derives, and the purpose separates the keys', () => {
    const reg = memoryRegistry()
    const seed = good()
    admit(seed, 'd1', attest(seed, HW_KEY), HW_KEY, reg)
    const a = deriveFromAdmitted(seed, 'signing', reg)
    const b = deriveFromAdmitted(seed, 'sealing', reg)
    expect(a.length).toBe(32)
    expect(a.equals(b)).toBe(false) // one seed, distinct purposes, distinct keys
    expect(deriveFromAdmitted(seed, 'signing', reg).equals(a)).toBe(true) // deterministic
  })

  it('a forged attestation is refused BEFORE the registry learns the address', () => {
    // otherwise an attacker enumerates the fleet by submitting guesses
    const reg = memoryRegistry()
    const seed = good()
    expect(() => admit(seed, 'attacker', attest(seed, SOFTWARE_KEY), HW_KEY, reg)).toThrow()
    expect(reg.find(seedAddress(seed))).toBeUndefined()
  })

  it('NO per-seed statistical test exists here, and that is the design', () => {
    // a CSPRNG on a weak seed is indistinguishable from one on a strong seed. A min-entropy or
    // monobit check over 32 bytes has no power to separate them, and rejects good randomness at
    // the significance level. Shipping one would read as a check while measuring nothing.
    // COMMENTS ARE DATA. The docstring EXPLAINS why these tests are absent, so a raw match on the
    // file flags the prose that argues against them — the exact false positive that cost
    // rules/confine a wrong measurement, caught here by this test on its first run.
    const src = readFileSyncSafe('src/entropy/source/index.ts')
    const comments = commentsOf('src/entropy/source/index.ts', src).join('\n')
    const code = src
      .split('\n')
      .filter((l) => l.trim().length > 0 && !comments.includes(l.trim()))
      .join('\n')
    expect(code).not.toMatch(/monobit|chiSquare|minEntropy\s*\(/i)
    expect(src).toMatch(/never by inspection/) // the ARGUMENT stays, in prose where it belongs
  })
})

function readFileSyncSafe(p: string): string {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require('node:fs').readFileSync(p, 'utf8') as string
}

describe('entropy/source — the claims, typed by discern', () => {
  // the prose is the atom's, exported beside its claims; this supplies only the outcome
  const run: MeasureRun = runFrom(EVIDENCE, () => true)

  it('source and fleet are VERDICTS; hwKeyProvisioning is an honest COMPASS', () => {
    const m = manifest('entropy/source', CLAIMS, SURFACES)
    expect(m.verdicts.map((v) => v.property)).toEqual(['entropy.source', 'entropy.fleet'])
    expect(m.compasses.map((c) => c.property)).toEqual(['entropy.hwKeyProvisioning'])
    // it must STAY a compass: in this process the hardware key is an ordinary buffer, so sealing
    // it would be exactly the over-claim discern exists to catch
    expect(classify(CLAIMS[2]!)).toBe('compass')
    for (const v of m.verdicts) expect(verdictHolds(v, run).holds).toBe(true)
  })

  it('every declared surface is claimed — no silent omission', () => {
    expect(() => manifest('entropy/source', CLAIMS, [...SURFACES, 'entropy.undeclared'])).toThrow(/Silence is not a claim of safety/)
  })
})

describe('entropy/source — judged by the constitution', () => {
  const change: Change = {
    atom: 'entropy/source',
    dualities: [
      { builds: 'attest', breaks: 'a tag from any other key is refused' },
      { builds: 'admit', breaks: 'short seeds, forged tags and cross-device repeats all throw' },
      { builds: 'deriveFromAdmitted', breaks: 'an un-admitted seed yields no key' },
    ],
    anchors: ['NIST SP 800-90B', 'NIST SP 800-108', 'RFC 2104'],
    claims: [
      {
        text: 'this proves the seed came from a hardware RNG',
        boundary:
          'it proves the attester HELD the hardware key — never that the key lives in real ' +
          'hardware. In this process it is an ordinary buffer, which is why provisioning is a ' +
          'compass and not a verdict. And the fleet check catches a REPEATED seed, never a merely ' +
          'predictable one: a weak RNG that never repeats passes',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [3, 3] },
      { name: 'source⊕fleet', ring: [1, 1] },
    ],
    served: [{ result: 'the admission', recompute: 'src/entropy/source/index.ts' }],
    postings: [
      { debit: 'seed/presented', credit: 'seed/admitted', amount: 2 },
      { debit: 'seed/admitted', credit: 'seed/presented', amount: 2 },
    ],
    edges: [
      { from: 'source', to: 'entropy' },
      { from: 'entropy', to: 'source' },
    ],
    quantities: [
      { name: 'minimum seed bytes', value: 32, derivation: 'src/entropy/source/index.ts' },
      { name: 'refusal codes', value: 4, derivation: 'src/entropy/source/index.ts' },
    ],
    keepers: [],
    seed: ['src/entropy/source/index.ts'],
  }

  it('is SEALED under all nine laws', () => {
    const v = judge(change)
    expect(v.verdicts.filter((x) => !x.holds)).toEqual([])
    expect(v.sealed).toBe(true)
  })
})
