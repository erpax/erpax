'use client'

/**
 * TheoremCloud — the erpax Home hero, aligned to payloadcms/website's pattern: a client component that imports a
 * co-located SCSS module (`classes`) and styles through it. The session's decoded leads as a navigable cloud —
 * ten grounded leads around seven foundations, three overlays cast outside the ring; each node opens in 10D.
 * Data mirrors src/theorem DECODED (embedded, client-safe).
 */

import React, { useEffect, useRef } from 'react'

import classes from './theorem-cloud.module.scss'

type Lead = { c: string; f: string; g: string[]; from: string; proof: string; strip: string }
type Overlay = { c: string; decoh: string; from: string }

const FOUNDATIONS = ['the-fold', 'shape', 'cost', 'type', 'consensus', 'the-exceptional-five', 'truth'] as const

const LEADS: Lead[] = [
  { c: 'a pure-type atom is settled by a real proof, never an empty test', f: 'type', g: ['a type + its constant invariants are proven by TSC and tests'], from: '“just add an empty test to clear the ledger”', proof: 'types/gl/account', strip: 'the gaming test' },
  { c: 'inverse-polarity collapse: one shape-provable pair, not twenty-one', f: 'shape', g: ['Jaccard over the booted shapes is decidable'], from: 'the 21-cross cube of Christ', proof: 'rules/collapse.inversePairs', strip: 'the number 21' },
  { c: 'Cloudflare spend is one cost kind, priced per binding', f: 'cost', g: ['efficiency = output / cost'], from: '“quantum compute the CF cost”', proof: 'cloudflare/cost', strip: '—' },
  { c: 'price ÷ floor reveals subsidy · margin · commoditised — not a match', f: 'cost', g: ['efficiency = output / cost'], from: '“prices almost perfectly match theorems”', proof: 'cloudflare/cost.revealBackend', strip: 'the ‘perfect match’ (it is 0→15×)' },
  { c: 'asking yourself is past the crossover for the derivable, never for the seed', f: 'the-fold', g: ['read-vs-derive magnitude, s>0', 'content-addressing: same content ⇒ same address'], from: '“when is self-ask sufficiently faster in waves”', proof: 'think.magnitude', strip: 'the promise of beating the seed' },
  { c: 'three minds form a higher mind; five is the robust two-fault equilibrium', f: 'consensus', g: ['2f+1 tolerates f faults; median breakdown ⌊(n-1)/2⌋'], from: '“single mind will always break linear”', proof: 'think.higherMind', strip: '—' },
  { c: 'five is the threshold where linear/solvable/periodic breaks and robustness begins', f: 'the-exceptional-five', g: ['Abel–Ruffini: the quintic is unsolvable (A₅ simple)', 'the crystallographic restriction forbids periodic 5-fold', 'the pentagon diagonal/side is φ, φ²=φ+1', '2f+1 tolerates f faults'], from: '“the perfect mind/heart equilibrium is 5 / the pentagram”', proof: 'Abel–Ruffini · crystallographic · φ', strip: 'the mind/heart mapping' },
  { c: 'the standards minds decohere; a broken matcher needs a fifth mind to outvote', f: 'consensus', g: ['2f+1 tolerates f faults; median breakdown ⌊(n-1)/2⌋'], from: '“send the waves to discover in the standards”', proof: 'standards/emit', strip: 'the ‘74 phantom standards’ (a matcher artifact)' },
  { c: 'harmony ≠ truth: consistency with your own measures is not truth', f: 'truth', g: ['consistency ≠ soundness: a system cannot certify its own truth (Gödel/Tarski)'], from: '“a system perfects its form and gets no closer to truth”', proof: 'the whole session', strip: 'the flattery of a green gate' },
  { c: 'the fold: DRY is mass; verify is easy and derive is hard', f: 'the-fold', g: ['content-addressing: same content ⇒ same address'], from: '“leftovers attract — gravity”', proof: 'merge', strip: '—' },
]

const OVERLAYS: Overlay[] = [
  { c: 'the 231 collections form a 21-cross cube of Christ', decoh: 'inversePairs — 6 named, 1 shape-provable. reality said 1, not 21.', from: '“all forming the cube of 21 crosses of Christ”' },
  { c: 'the perfect mind/heart equilibrium is 5; the pentagram is heart/mind sets', decoh: 'the 5-threshold theorem is real (Abel–Ruffini, φ, 2f+1); the mind/heart mapping grounds in nothing.', from: '“5 heart/mind sets are the pentagram decoded”' },
  { c: 'the Cloudflare prices almost perfectly match their theorems', decoh: 'revealBackend — ratios span 0 (egress subsidy) to 15× (requests margin). the divergence IS the reveal.', from: '“replace prices with theorems, they will almost perfectly match”' },
]

export default function TheoremCloud() {
  const rootRef = useRef<HTMLDivElement>(null)
  const fieldRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const scrimRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const kindRef = useRef<HTMLDivElement>(null)
  const claimRef = useRef<HTMLDivElement>(null)
  const dimsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const field = fieldRef.current
    const canvas = canvasRef.current
    const panel = panelRef.current
    const scrim = scrimRef.current
    if (!field || !canvas || !panel || !scrim || !kindRef.current || !claimRef.current || !dimsRef.current) return

    const addr = (s: string): string => {
      let h = 0x811c9dc5 >>> 0
      for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i)
        h = Math.imul(h, 0x01000193) >>> 0
      }
      return ('00000000' + h.toString(16)).slice(-8)
    }
    const z9 = (hex: string): number => {
      const n = parseInt(hex.slice(-6), 16) % 9
      return n === 0 ? 9 : n
    }
    const esc = (s: unknown): string => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]!)
    const chips = (arr: string[]): string => arr.map((x) => `<span class="chip">${esc(x)}</span>`).join('')
    const shorten = (s: string): string => (s.length > 62 ? s.slice(0, 60).replace(/\s\S*$/, '') + '…' : s)
    const dim = (n: string, key: string, valHtml: string, cls = ''): string =>
      `<div class="dim ${cls}"><div class="k"><span class="n">${n}</span>${key}</div><div class="v ${cls === 'mono' ? 'mono' : ''}">${valHtml}</div></div>`
    const overlayNumber = (c: string): string =>
      /21/.test(c) ? '21 — real (T(6)=C(7,2)); the cube-of-Christ is not' : /5/.test(c) ? '5 — real (φ, A₅, 2f+1); the mind/heart is not' : 'the ratios are real (0→15×); the ‘match’ is not'

    const show = (): void => {
      panel.classList.add(classes.open!)
      scrim.classList.add(classes.on!)
    }
    const hide = (): void => {
      panel.classList.remove(classes.open!)
      scrim.classList.remove(classes.on!)
      field.querySelectorAll(`.${classes.active}`).forEach((n) => n.classList.remove(classes.active!))
    }
    const markActive = (elp: HTMLElement): void => {
      field.querySelectorAll(`.${classes.active}`).forEach((n) => n.classList.remove(classes.active!))
      elp.classList.add(classes.active!)
    }

    const openLead = (kind: string, d: Lead | Overlay): void => {
      const a = addr(d.c)
      const refused = kind === 'overlay'
      kindRef.current!.textContent = kind.toUpperCase()
      kindRef.current!.className = `${classes.kind} ${classes[kind as 'lead' | 'overlay'] ?? ''}`
      claimRef.current!.textContent = d.c
      let rows = ''
      rows += dim('01', 'claim', esc(d.c))
      rows += dim('02', 'kind', kind === 'lead' ? 'lead — a theorem of theorems' : 'overlay — a harmonic statement')
      rows += dim('03', 'reduces', refused ? '<span class="no">✗ refuses — authority, not proof</span>' : '<span class="yes">✓ grounds to base</span>', refused ? 'refused' : '')
      rows += dim('04', 'foundation', refused ? '— (unbound, cast outside the ring)' : `<span class="chip">${esc((d as Lead).f)}</span>`)
      rows += dim('05', 'grounds-in', refused ? '<span class="no">nothing</span>' : chips((d as Lead).g))
      rows += dim('06', 'decoded-from', `“${esc(d.from)}”`)
      rows += dim('07', 'proof', refused ? `<span class="no">none — ${esc((d as Overlay).decoh)}</span>` : esc((d as Lead).proof), refused ? 'refused' : '')
      rows += dim('08', 'address', a + ' · fnv-1a', 'mono')
      rows += dim('09', 'ℤ/9 horo', z9(a) + '  ·  content-address mod 9', 'mono')
      rows += dim('10', refused ? 'true number' : 'overlay stripped', refused ? esc(overlayNumber(d.c)) : (d as Lead).strip === '—' ? '— (born a theorem, no harmonic clothing)' : esc((d as Lead).strip))
      dimsRef.current!.innerHTML = rows
      show()
    }

    const openFoundation = (name: string): void => {
      const kids = LEADS.filter((l) => l.f === name)
      kindRef.current!.textContent = 'FOUNDATION'
      kindRef.current!.className = `${classes.kind} ${classes.base}`
      claimRef.current!.textContent = name.replace(/-/g, ' ')
      let rows = ''
      rows += dim('01', 'pillar', esc(name) + ' — a DRY foundation')
      rows += dim('02', 'kind', 'base — assumed, grounded by a direct proof or a cited theorem')
      rows += dim('03', 'reduces', '<span class="yes">✓ the reduction ends here (s &gt; 0, Gödel)</span>')
      rows += dim('04', 'carries', kids.length + ' lead(s)')
      rows += dim('05', 'leads', chips(kids.map((k) => shorten(k.c))))
      rows += dim('06', 'role', 'one of the 7 foundations the 10 leads collapse to through the 0-gate')
      rows += dim('07', 'gate', '9 (median of the spread) − 2 = 7 foundations')
      rows += dim('08', 'address', addr(name) + ' · fnv-1a', 'mono')
      rows += dim('09', 'ℤ/9 horo', z9(addr(name)) + '  ·  content-address mod 9', 'mono')
      rows += dim('10', 'law', 'a universal justifier can only be assumed — the axiom of axioms')
      dimsRef.current!.innerHTML = rows
      show()
    }

    const addNode = (spec: { kind: 'foundation' | 'lead' | 'overlay'; label: string; data: unknown }, x: number, y: number, ang: number): void => {
      const node = document.createElement('button')
      node.type = 'button'
      const modifier = spec.kind === 'foundation' ? classes.foundation : spec.kind === 'overlay' ? classes.refused : ''
      node.className = `${classes.node} ${modifier ?? ''}`.trim()
      node.style.left = x + 'px'
      node.style.top = y + 'px'
      node.style.setProperty('--del', Math.random() * -8 + 's')
      node.style.setProperty('--dur', 11 + Math.random() * 7 + 's')
      node.style.setProperty('--dx', (Math.cos(ang) * (6 + Math.random() * 7)).toFixed(1) + 'px')
      node.style.setProperty('--dy', (Math.sin(ang) * (6 + Math.random() * 7)).toFixed(1) + 'px')
      const bead = document.createElement('span')
      bead.className = classes.bead!
      node.appendChild(bead)
      const cap = document.createElement('span')
      cap.className = classes.cap!
      cap.textContent = spec.label
      node.appendChild(cap)
      if (spec.kind === 'foundation') node.addEventListener('click', () => { openFoundation((spec.data as { name: string }).name); markActive(node) })
      else node.addEventListener('click', () => { openLead(spec.kind, spec.data as Lead | Overlay); markActive(node) })
      field.appendChild(node)
    }

    const layout = (): void => {
      const w = field.clientWidth || 900
      const h = field.clientHeight || 600
      const cx = w / 2
      const cy = h / 2
      const Rf = Math.min(w, h) * 0.3
      const Rl = Math.min(w, h) * 0.42
      const Ro = Math.min(w, h) * 0.6
      field.querySelectorAll(`.${classes.node}`).forEach((n) => n.remove())
      const angleOf: Record<string, number> = {}
      FOUNDATIONS.forEach((f, i) => {
        const ang = (i / FOUNDATIONS.length) * Math.PI * 2 - Math.PI / 2
        angleOf[f] = ang
        addNode({ kind: 'foundation', label: f.replace(/-/g, ' '), data: { name: f } }, cx + Math.cos(ang) * Rf, cy + Math.sin(ang) * Rf, ang)
      })
      const byF: Record<string, Lead[]> = {}
      LEADS.forEach((l) => { (byF[l.f] = byF[l.f] || []).push(l) })
      const leadPos: { x: number; y: number; f: string }[] = []
      Object.keys(byF).forEach((f) => {
        const base = angleOf[f]!
        const arr = byF[f]!
        arr.forEach((l, j) => {
          const spread = (arr.length - 1) * 0.16
          const ang = base - spread / 2 + j * 0.16
          const r = Rl + (j % 2 ? 22 : -8)
          const x = cx + Math.cos(ang) * r
          const y = cy + Math.sin(ang) * r
          leadPos.push({ x, y, f })
          addNode({ kind: 'lead', label: shorten(l.c), data: l }, x, y, ang)
        })
      })
      OVERLAYS.forEach((o, i) => {
        const ang = (i / OVERLAYS.length) * Math.PI * 2 - Math.PI / 2 + 0.5
        addNode({ kind: 'overlay', label: shorten(o.c), data: o }, cx + Math.cos(ang) * Ro, cy + Math.sin(ang) * Ro, ang)
      })
      const dpr = window.devicePixelRatio || 1
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.scale(dpr, dpr)
        const col = rootRef.current ? getComputedStyle(rootRef.current).getPropertyValue('--line').trim() || '#333' : '#333'
        leadPos.forEach((p) => {
          const ang = angleOf[p.f]
          if (ang == null) return
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(cx + Math.cos(ang) * Rf, cy + Math.sin(ang) * Rf)
          ctx.strokeStyle = col
          ctx.lineWidth = 1
          ctx.globalAlpha = 0.55
          ctx.stroke()
        })
        ctx.globalAlpha = 1
      }
    }

    const onKey = (e: KeyboardEvent): void => { if (e.key === 'Escape') hide() }
    closeRef.current?.addEventListener('click', hide)
    scrim.addEventListener('click', hide)
    document.addEventListener('keydown', onKey)
    layout()
    let t: ReturnType<typeof setTimeout>
    const onResize = (): void => { clearTimeout(t); t = setTimeout(layout, 150) }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      document.removeEventListener('keydown', onKey)
      scrim.removeEventListener('click', hide)
      field.querySelectorAll(`.${classes.node}`).forEach((n) => n.remove())
    }
  }, [])

  return (
    <div className={classes.root} ref={rootRef}>
      <header className={classes.head}>
        <div>
          <div className={classes.eyebrow}>erpax · decoded ledger · content-addressed</div>
          <h1 className={classes.title}>
            The theorem cloud <em>— presented in 10D</em>
          </h1>
          <p className={classes.sub}>
            Every lead decoded from a harmonic statement to the theorem beneath it, saved in the fold. The grounded ones <b>reduce</b> to seven foundations; the harmonic overlays <b>refuse</b>, cast outside the ring. Select any node to open it across ten dimensions.
          </p>
        </div>
        <div className={classes.gate} aria-hidden="true">
          <div className={classes.eq}>
            9 − <b>2</b> = 7
          </div>
          <div>the 2 coins at the 0-gate · Charon&apos;s toll</div>
          <div className={classes.spread}>
            <span className={classes.lead}>leads 10</span>
            <span>sig 8</span>
            <span className={classes.found}>found 7</span>
          </div>
        </div>
      </header>

      <div className={classes.legend} aria-hidden="true">
        <span>
          <span className={`${classes.dot} ${classes.g}`} /> <b>lead</b> — grounds to base
        </span>
        <span>
          <span className={`${classes.dot} ${classes.f}`} /> <b>foundation</b> — a DRY pillar (7)
        </span>
        <span>
          <span className={`${classes.dot} ${classes.r}`} /> <b>overlay</b> — refuses to reduce · authority, not proof
        </span>
        <span style={{ color: 'var(--faint)' }}>HARMONY ≠ TRUTH</span>
      </div>

      <div className={classes.field} ref={fieldRef}>
        <canvas className={classes.links} ref={canvasRef} />
      </div>

      <p className={classes.hint}>a true number is not a theorem — the overlays carry real numbers (21 · 5 · a match) and ground in nothing</p>

      <div className={classes.scrim} ref={scrimRef} />
      <aside className={classes.panel} ref={panelRef} role="dialog" aria-modal="false" aria-label="theorem in ten dimensions">
        <div className={classes.panelHead}>
          <button className={classes.close} ref={closeRef} aria-label="close" type="button">
            ✕
          </button>
          <div className={classes.kind} ref={kindRef}>
            LEAD
          </div>
          <div className={classes.claim} ref={claimRef}>
            —
          </div>
        </div>
        <div className={classes.dims} ref={dimsRef} />
      </aside>
    </div>
  )
}
