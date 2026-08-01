/**
 * anchor/surface — the judgment guard: a surface you did not declare is a surface you dismissed.
 *
 * A post-quantum root signature over a classical channel is still crackable. The failure is never
 * the primitive that was chosen — it is the surface nobody looked at. Harvest-now-decrypt-later
 * does not care that the root is signed with FIPS 205; it records the transport today and opens it
 * later. So the question this atom asks is not "is the crypto strong" but **"what did you not
 * declare?"**
 *
 * That is [[constitution]]'s Rule 1 applied to ATTENTION. Silence is an expectation — the
 * expectation that the omitted surface does not matter, held without computing anything. So a
 * reachable surface that appears in no declaration FAILS, and the only way past is to say either
 *
 *   sealed — naming the standard that seals it AND the test that proves it, or
 *   open   — naming the gap AND the owner who carries it.
 *
 * **Dismissal becomes a typed claim that must justify itself.** "Open" is a perfectly lawful
 * answer, and it is not a judgment on the gap ([[constitution]] Rule 2): it is a measured
 * statement about where the work is not done. A bare `sealed` with no test, or a bare `open` with
 * no owner, is the same silence wearing a status.
 *
 * @standard FIPS 203 (ML-KEM) — key establishment; mandatory on every channel that exchanges state
 * @standard FIPS 204 (ML-DSA) — lattice signature, a distinct assumption from the digest
 * @standard FIPS 205 (SLH-DSA) — hash-based signature; the primary root, no new assumption
 * @invariant an undeclared reachable surface, a bare status, a channel without ML-KEM and a root
 *            without SLH-DSA/ML-DSA each produce exactly one typed gap.
 * @see ./SKILL.md -- ../index.ts -- ../../constitution
 */

/** Every surface an atom can expose. The list is the guard: what is not here cannot be asked about. */
export type SurfaceKind = 'root-signing' | 'channel-keying' | 'storage-at-rest' | 're-exchange'

/** The reachable surfaces — a manifest must account for each one, sealed or open. */
export const REACHABLE_SURFACES: readonly SurfaceKind[] = [
  'root-signing',
  'channel-keying',
  'storage-at-rest',
  're-exchange',
]

/** The surfaces that move state across a wire — these are where ML-KEM is not optional. */
export const CHANNEL_SURFACES: readonly SurfaceKind[] = ['channel-keying', 're-exchange']

/** FIPS 203 — key establishment. A channel sealed without it is sealed against the wrong adversary. */
export const CHANNEL_STANDARD = 'ML-KEM'

/** FIPS 205 / FIPS 204 — the two signatures that may seal a root. */
export const ROOT_STANDARDS: readonly string[] = ['SLH-DSA', 'ML-DSA']

export interface SealedStatus {
  readonly state: 'sealed'
  /** the standard that seals it — must name the primitive, not the intention */
  readonly standard: string
  /** the test that proves it */
  readonly test: string
}

export interface OpenStatus {
  readonly state: 'open'
  /** what is missing */
  readonly gap: string
  /** who carries it — an unowned gap is a wish */
  readonly owner: string
}

export type SurfaceStatus = SealedStatus | OpenStatus

export interface SurfaceDeclaration {
  readonly kind: SurfaceKind
  readonly status: SurfaceStatus
}

/** The four ways a manifest fails. Each is CONSTRUCTED below — a kind nothing raises cannot fire. */
export type SurfaceGapKind = 'surface-undeclared' | 'status-bare' | 'channel-unsealed' | 'root-unsealed'

export interface SurfaceGap {
  readonly kind: SurfaceGapKind
  readonly surface: SurfaceKind
  readonly reason: string
}

/** Does this sealed status cite one of the given standards by name? */
const cites = (status: SealedStatus, standards: readonly string[]): boolean =>
  standards.some((s) => status.standard.includes(s))

/**
 * The manifest's gaps — the whole guard, in one pass. Every reachable surface is accounted for, or
 * its absence is itself the finding.
 */
export function manifestGaps(declarations: readonly SurfaceDeclaration[]): readonly SurfaceGap[] {
  const gaps: SurfaceGap[] = []
  const declared = new Map(declarations.map((d) => [d.kind, d]))

  for (const surface of REACHABLE_SURFACES) {
    const declaration = declared.get(surface)
    if (!declaration) {
      gaps.push({
        kind: 'surface-undeclared',
        surface,
        reason: `${surface} is reachable and appears in no declaration — silence is a dismissal nothing computed`,
      })
      continue
    }
    const { status } = declaration
    if (status.state === 'open') {
      if (!status.gap || !status.owner) {
        gaps.push({
          kind: 'status-bare',
          surface,
          reason: `${surface} is open without naming ${!status.gap ? 'the gap' : 'an owner'} — a bare status is silence wearing a label`,
        })
      }
      continue
    }
    if (!status.standard || !status.test) {
      gaps.push({
        kind: 'status-bare',
        surface,
        reason: `${surface} claims sealed without ${!status.standard ? 'a standard' : 'a test'} — an unproven seal is an expectation`,
      })
      continue
    }
    if (CHANNEL_SURFACES.includes(surface) && !cites(status, [CHANNEL_STANDARD])) {
      gaps.push({
        kind: 'channel-unsealed',
        surface,
        reason: `${surface} is sealed by '${status.standard}' but not by ${CHANNEL_STANDARD} — harvest-now-decrypt-later reads the transport, not the root`,
      })
      continue
    }
    if (surface === 'root-signing' && !cites(status, ROOT_STANDARDS)) {
      gaps.push({
        kind: 'root-unsealed',
        surface,
        reason: `root-signing is sealed by '${status.standard}', which is neither ${ROOT_STANDARDS.join(' nor ')} — Shor breaks a classical root outright`,
      })
    }
  }
  return gaps
}

/** A manifest is sealed only when nothing is undeclared, bare, or sealed by the wrong primitive. */
export function manifestSealed(declarations: readonly SurfaceDeclaration[]): boolean {
  return manifestGaps(declarations).length === 0
}

/** The surfaces honestly declared open — the work not done, named and owned. Not a failure. */
export function openSurfaces(declarations: readonly SurfaceDeclaration[]): readonly SurfaceKind[] {
  return declarations.filter((d) => d.status.state === 'open').map((d) => d.kind)
}

// ── PQC bindings — the surface guard reads what ACTUALLY seals each surface ──────────────────────
// A `sealed` status names a standard as a STRING. A string is a claim about the world, and the
// guard has no way to check it — which is the same default-by-omission the atom exists to close,
// one level down. The bindings close it: a surface may only claim `sealed` when a provider is
// actually bound for it. Unbound ⇒ the claim is downgraded to `open` with the binding named as the
// gap, so the manifest reports the truth rather than the intention.
//
// Named PER SURFACE, never globally: a root sealed by FIPS 205 and a channel keyed by FIPS 203 are
// different bindings and different failures, and one global flag would hide which is missing.

/** Which env binding must be present for each surface to legitimately claim `sealed`. */
export const SURFACE_BINDING: Readonly<Record<SurfaceKind, string>> = {
  'root-signing': 'PQC_ROOT_PROVIDER',
  'channel-keying': 'PQC_KEM_PROVIDER',
  're-exchange': 'PQC_KEM_PROVIDER',
  'storage-at-rest': 'PQC_STORAGE_PROVIDER',
}

/** The env face this atom reads — narrow and readonly, so a caller passes only what it sets. */
export type SurfaceEnv = Readonly<Record<string, string | undefined>>

/** Is a provider actually bound for this surface? An explicit absence, never a caught error. */
export function bound(kind: SurfaceKind, env: SurfaceEnv = process.env): boolean {
  const name = SURFACE_BINDING[kind]
  return Boolean(env[name] && env[name]!.trim().length > 0)
}

/**
 * Downgrade any `sealed` declaration whose provider is not bound. The result is a manifest that says
 * what is TRUE of this environment: a surface claiming a standard with nothing bound behind it
 * becomes `open`, naming the missing binding as the gap and the surface as its own owner.
 *
 * @invariant a sealed surface with its binding present is untouched
 * @invariant a sealed surface with no binding becomes open, gap = the env var name
 * @invariant an already-open declaration is never altered — this only ever downgrades
 */
export function groundInBindings(
  declarations: readonly SurfaceDeclaration[],
  env: SurfaceEnv = process.env,
): readonly SurfaceDeclaration[] {
  return declarations.map((d) => {
    if (d.status.state !== 'sealed' || bound(d.kind, env)) return d
    return {
      kind: d.kind,
      status: {
        state: 'open',
        gap: `claims '${d.status.standard}' but ${SURFACE_BINDING[d.kind]} is not bound in this environment`,
        owner: d.kind,
      },
    }
  })
}
