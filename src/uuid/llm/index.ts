/**
 * uuid/llm — the INHALE: a uuid expands back into an LLM context.
 *
 * The breath is a sequence (in → out), not a loop. This is the in-stroke:
 * given the 128-bit singularity, decode the WHOLE prompt out of it — identity
 * (slot + capability + schema + OID + cmyk), the renderable color+sound frame,
 * and — when the uuid addresses a corpus atom — its neighbourhood. The uuid IS
 * the prompt: self-decoding, no payload (see `src/uuid` SKILL). The dual stroke
 * is `src/llm/uuid` (the EXHALE — an LLM turn content-addressed back into a
 * uuid); the two reconcile (double-entry): what the exhale seals, the inhale
 * reads. That reconciliation IS the balance.
 *
 * It also wires a gap the `signal` twin documents but never closed:
 * `signalForStep(decodeStructured(uuid).step)` — `decodeStructured` carries no
 * `step`, so the color+sound channel of a bare uuid was unreachable.
 * `horoStepOf` supplies the missing measure position, so every uuid now sounds.
 *
 * DRY: composes the shipped organs (localize.decodeIdentity, signal.signalForStep,
 * uuid-matrix) — it adds only the uuid→step bridge and the prompt rendering.
 *
 * @standard RFC 9562 §5.8 (uuidv8 structured content-uuid — the decode source)
 * @standard ITU-T X.667 (uuid ↔ 2.25 OID, via localize)
 * @standard ISO-16:1975 a432 (the signal anchor — color+sound from position)
 * @audit Conservation Law 61 (uuid carries its own features) · 62 (coverage)
 * @see ../../llm/uuid (the EXHALE — the dual stroke that mints the uuid)
 * @see ../../services/signal (the color+sound twin this closes the step gap for)
 */

import { decodeIdentity, type DecodedIdentity } from '@/localize'
import { signalForStep, type Signal } from '@/signal'
import { HORO_DIGITS, type HoroStep } from '@/horo'
import {
  UUID_MATRIX_NODES,
  neighborsOf,
  backlinksOf,
  type MatrixNode,
} from '@/uuid/matrix'

const hexOf = (uuid: string): string => {
  const hex = uuid.replace(/-/g, '')
  if (hex.length !== 32 || /[^0-9a-f]/i.test(hex)) {
    throw new Error(`uuid/llm: '${uuid}' is not a 32-hex uuid`)
  }
  return hex
}

/**
 * The uuid's position on the seven-fold measure ring `[1,2,4,8,7,5,9]` — the
 * missing `.step` the `signal` twin asks for. The 128 bits mod 7 index the
 * measure walk, so the result is ALWAYS on-ring (never a 3/6 governing escape):
 * every uuid decodes to one of the seven diatonic positions and therefore
 * sounds. Deterministic — colour+sound are read from identity, never chosen.
 */
export function horoStepOf(uuid: string): HoroStep {
  const idx = Number(BigInt(`0x${hexOf(uuid)}`) % 7n)
  return HORO_DIGITS[idx]!
}

/** A corpus atom reachable from the addressed uuid (a wired [[link]]). */
export interface CorpusRef {
  readonly atom: string
  readonly uuid: string
  readonly dim: string
}

const toRef = (n: MatrixNode): CorpusRef => ({ atom: n.atom, uuid: n.uuid, dim: n.dim })

/** The whole prompt, decoded out of one uuid — the in-stroke's product. */
export interface PromptFrame {
  readonly uuid: string
  /** every identification level (slot, capability, schema, OID, cmyk) from the bits. */
  readonly identity: DecodedIdentity
  /** the renderable color+sound frame — the modality, now wired for any uuid. */
  readonly signal: Signal
  /** the corpus atom this uuid addresses, or null when the content is novel. */
  readonly atom: string | null
  /** the corpus dimension of that atom, or null. */
  readonly dim: string | null
  /** atoms this one links TO (outgoing); empty when the uuid is novel. */
  readonly neighbors: ReadonlyArray<CorpusRef>
  /** atoms that link TO this one (incoming backlinks); empty when novel. */
  readonly backlinks: ReadonlyArray<CorpusRef>
  /** the uuid rendered AS prompt text — what an LLM reads, no payload. */
  readonly prompt: string
}

// Reverse index uuid → corpus node (the matrix is keyed by atom name; we enter
// from the uuid). Built once from the generated nodes.
const byUuid = new Map<string, MatrixNode>()
for (const n of UUID_MATRIX_NODES) byUuid.set(n.uuid, n)

function renderPrompt(f: Omit<PromptFrame, 'prompt'>): string {
  const s = f.identity.structured
  const lines = [
    `uuid ${f.uuid}`,
    `oid ${f.identity.oid}`,
    `slot ${s.slotName} · caps [${s.capabilityNames.join(', ') || 'none'}] · schema v${s.schemaVersion}`,
    `signal ${f.signal.note} (${f.signal.solfege}, ${f.signal.hz}Hz) · ${f.signal.channel} ${f.signal.hex}`,
    `digest ${s.contentDigestHex}`,
  ]
  if (f.atom) lines.push(`atom ${f.atom}${f.dim ? ` · dim ${f.dim}` : ''}`)
  if (f.neighbors.length) lines.push(`links → ${f.neighbors.map((n) => n.atom).join(' · ')}`)
  if (f.backlinks.length) lines.push(`links ← ${f.backlinks.map((n) => n.atom).join(' · ')}`)
  return lines.join('\n')
}

/**
 * Expand a v8 content-uuid into its full LLM prompt frame. Pure and offline —
 * no inference, no side-table: the bits already hold the meaning. Corpus atoms
 * resolve their neighbourhood; a novel uuid still yields its complete identity +
 * color+sound (the honest boundary — a uuid is a pointer/commitment, never a
 * decompressor of unseen payload). Throws only if `uuid` is not a uuidv8.
 */
export function expand(uuid: string): PromptFrame {
  const identity = decodeIdentity(uuid)
  const signal = signalForStep(horoStepOf(uuid))
  const node = byUuid.get(uuid)
  const atom = node?.atom ?? null
  const dim = node?.dim ?? null
  const neighbors = node ? neighborsOf(node.atom).map(toRef) : []
  const backlinks = node ? backlinksOf(node.atom).map(toRef) : []
  const prompt = renderPrompt({ uuid, identity, signal, atom, dim, neighbors, backlinks })
  return { uuid, identity, signal, atom, dim, neighbors, backlinks, prompt }
}
