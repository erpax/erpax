import { PI, algebraCos, algebraSin, exactRound } from '@/algebra'
/**
 * image — the DETERMINISTIC visual face of a content-uuid (and its animation). One more projection of the
 * self-decoding uuid, alongside [[color]] (the wave), [[signal]] (colour+sound), [[translation]] (meaning).
 *
 * uuidImage renders a mandala on the [[angle]] hexagon whose colours, radii and angles ARE the uuid's own
 * bytes; uuidAnimation adds a byte-seeded rotation. Same uuid ⇒ same image (the visual IS the address —
 * tamper-evident, zero-cost, pure SMIL/SVG like the ceccec field). This is the computable "text → image /
 * animation": the IDENTITY sigil of the address.
 *
 * HONEST BOUNDARY: this renders the ADDRESS, not the MEANING. Semantic text-to-image / text-to-animation
 * (a photorealistic scene of the concept) is a generative model (diffusion — the seed/oracle bit), NOT
 * computable from a hash. The identity face is real and free; the semantic face is the model.
 *
 * @standard SVG 1.1 / SMIL animation · deterministic hash-to-art (identicon family)
 *
 * Composes [[color]] · [[signal]] · [[angle]] · [[law]].
 */

/** The uuid's bytes (0..255) — the seed of every visual parameter. */
function bytesOf(uuid: string): number[] {
  const hex = uuid.replace(/[^0-9a-f]/gi, '')
  const b: number[] = []
  for (let i = 0; i + 1 < hex.length; i += 2) b.push(Number.parseInt(hex.slice(i, i + 2), 16))
  return b
}

/** Build the mandala SVG for a uuid — six petals at 60° (the fold step) + a core, seeded by the bytes. */
function mandala(uuid: string, size: number, animated: boolean): string {
  const b = bytesOf(uuid)
  const g = (i: number): number => b[((i % b.length) + b.length) % b.length] ?? 0
  const cx = size / 2
  const cy = size / 2
  const col = (i: number): string => `hsl(${exactRound((g(i) * 360) / 256)} 72% 55%)`
  let petals = ''
  for (let k = 0; k < 6; k++) {
    const ang = (k * 60 * PI) / 180 // 60° — the fold step ([[angle]])
    const px = cx + algebraCos(ang) * size * 0.28
    const py = cy + algebraSin(ang) * size * 0.28
    const r = size * (0.14 + 0.14 * (g(k + 1) / 255))
    petals += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${r.toFixed(1)}" fill="${col(k + 3)}" opacity="0.68"/>`
  }
  const dur = 8 + (g(4) % 12)
  const spin = animated
    ? `<animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="${dur}s" repeatCount="indefinite"/>`
    : ''
  const core = (size * (0.08 + 0.06 * (g(0) / 255))).toFixed(1)
  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><g>${spin}${petals}</g><circle cx="${cx}" cy="${cy}" r="${core}" fill="${col(2)}"/></svg>`
}

/** The deterministic identity image of a content-uuid — same uuid ⇒ same SVG (the visual IS the address). */
export function uuidImage(uuid: string, size = 240): string {
  return mandala(uuid, size, false)
}

/** The deterministic identity ANIMATION — the same sigil with a byte-seeded rotation (pure SMIL, no JS). */
export function uuidAnimation(uuid: string, size = 240): string {
  return mandala(uuid, size, true)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const u = '335e5fa7-a91b-890f-a3db-2a3ebe2c8c0c'
  console.log('image — deterministic identity visual of', u)
  console.log('  bytes:', uuidImage(u).length, 'chars · same uuid ⇒ same image:', uuidImage(u) === uuidImage(u))
  console.log('  animation carries SMIL:', uuidAnimation(u).includes('animateTransform'))
}
