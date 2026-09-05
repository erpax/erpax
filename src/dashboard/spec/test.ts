/**
 * dashboard/spec — REGRESSION GATE for the composition's two pure decision points:
 * `selectDashboard` (capability → the RIGHT base dashboard, computed from the
 * registry, not a hand-kept grid) and `widgetVisible` (the lattice + the audit ⊥
 * overlay that gates each tile).
 *
 * These are pure functions over `AnyWidgetSpec` / `DashboardSpec` data — no Payload
 * boot, no DB — so they pin the access semantics of the seven dashboards directly:
 *   • admin → Admin Control, sign → Controller/Close, write → Operator,
 *     read → Read-only Overview, a pure-audit actor → Auditor.
 *   • an auditor (read tier + audit grant) sees the audit widgets AND the read
 *     statements, but NOT the write-tier action/cost tile; a read-only actor sees
 *     no write tiles and no audit widget.
 *
 * @see ./index.ts            (selectDashboard / widgetVisible)
 * @see ../dashboards.ts      (the seven composed DashboardSpecs + DASHBOARD_REGISTRY)
 */
import { describe, it, expect } from 'vitest'

import { selectDashboard, widgetVisible } from '@/dashboard/spec'
import {
  DASHBOARD_REGISTRY,
  adminControlDashboard,
  controllerDashboard,
  operatorDashboard,
  readOverviewDashboard,
  auditorDashboard,
} from '../dashboards'

describe('selectDashboard — capability picks the RIGHT base dashboard (computed from the registry)', () => {
  it('admin → Admin Control', () => {
    expect(selectDashboard('admin', DASHBOARD_REGISTRY)).toBe(adminControlDashboard)
  })

  it('sign → Controller / Close', () => {
    expect(selectDashboard('sign', DASHBOARD_REGISTRY)).toBe(controllerDashboard)
  })

  it('write → Operator', () => {
    expect(selectDashboard('write', DASHBOARD_REGISTRY)).toBe(operatorDashboard)
  })

  it('read → Read-only Overview', () => {
    expect(selectDashboard('read', DASHBOARD_REGISTRY)).toBe(readOverviewDashboard)
  })

  it('a pure-audit actor → Auditor', () => {
    expect(selectDashboard('audit', DASHBOARD_REGISTRY)).toBe(auditorDashboard)
  })

  it('null capability (no roles) → null (no dashboard)', () => {
    expect(selectDashboard(null, DASHBOARD_REGISTRY)).toBeNull()
  })

  it('walks DOWN the lattice: sign with no Controller entry falls to Operator', () => {
    // registry missing the 'sign' tier — a sign actor still gets the next-lower board.
    const partial = { write: operatorDashboard, read: readOverviewDashboard } as const
    expect(selectDashboard('sign', partial)).toBe(operatorDashboard)
  })

  it('a pure-audit actor with no Auditor entry falls to the read board (observe-only)', () => {
    const noAudit = { read: readOverviewDashboard } as const
    expect(selectDashboard('audit', noAudit)).toBe(readOverviewDashboard)
  })
})

describe('widgetVisible — the lattice gate + the audit ⊥ overlay', () => {
  // ── The audit ⊥ overlay: an audit widget unlocks IFF the actor holds an audit
  //    grant, independent of the read/write/sign/admin tier they carry. ──
  it('an audit widget unlocks for ANY actor holding an audit grant (overlay, tier-independent)', () => {
    expect(widgetVisible('audit', 'read', true)).toBe(true)
    expect(widgetVisible('audit', 'admin', true)).toBe(true)
    expect(widgetVisible('audit', null, true)).toBe(true)
  })

  it('an audit widget stays hidden for an actor WITHOUT an audit grant, however high their tier', () => {
    expect(widgetVisible('audit', 'admin', false)).toBe(false)
    expect(widgetVisible('audit', 'read', false)).toBe(false)
  })

  // ── An AUDITOR (the cross's auditor = a read tier + an audit grant) sees the
  //    audit widget AND the read statements, but NOT the write-tier action/cost. ──
  it('an auditor (read tier + audit grant) sees audit widgets + read statements, NOT write actions', () => {
    const cap = 'read' as const
    const holdsAudit = true
    expect(widgetVisible('audit', cap, holdsAudit)).toBe(true) // the audit trail
    expect(widgetVisible('read', cap, holdsAudit)).toBe(true) // the read statements
    expect(widgetVisible('write', cap, holdsAudit)).toBe(false) // the write/cost tile
    expect(widgetVisible('sign', cap, holdsAudit)).toBe(false) // the sign/budget tile
  })

  // ── A READ-ONLY actor sees the read statements, NO actions, NO audit widget. ──
  it('a read-only actor sees read statements, but no write/sign actions and no audit widget', () => {
    const cap = 'read' as const
    expect(widgetVisible('read', cap, false)).toBe(true)
    expect(widgetVisible('write', cap, false)).toBe(false)
    expect(widgetVisible('sign', cap, false)).toBe(false)
    expect(widgetVisible('audit', cap, false)).toBe(false)
  })

  // ── A PURE-AUDIT actor (capability 'audit', audit ⊥) is NOT compatible with the
  //    read tier — audit is observation-only — so they see ONLY the audit widget. ──
  it("a pure-audit actor (capability 'audit') sees ONLY audit widgets, not read statements", () => {
    expect(widgetVisible('audit', 'audit', true)).toBe(true)
    expect(widgetVisible('read', 'audit', true)).toBe(false)
    expect(widgetVisible('write', 'audit', true)).toBe(false)
  })

  it('higher tiers satisfy lower-tier widgets (admin sees read/write/sign tiles)', () => {
    expect(widgetVisible('read', 'admin', false)).toBe(true)
    expect(widgetVisible('write', 'admin', false)).toBe(true)
    expect(widgetVisible('sign', 'admin', false)).toBe(true)
  })

  it('null capability sees nothing on the lattice (only the audit overlay can unlock it)', () => {
    expect(widgetVisible('read', null, false)).toBe(false)
    expect(widgetVisible('write', null, false)).toBe(false)
  })
})

describe('the composed registry wires each tier to its named dashboard', () => {
  it('DASHBOARD_REGISTRY maps every lattice tier (+ audit) to the matching audience', () => {
    expect(DASHBOARD_REGISTRY.admin?.audience).toBe('admin')
    expect(DASHBOARD_REGISTRY.sign?.audience).toBe('sign')
    expect(DASHBOARD_REGISTRY.write?.audience).toBe('write')
    expect(DASHBOARD_REGISTRY.read?.audience).toBe('read')
    expect(DASHBOARD_REGISTRY.audit?.audience).toBe('audit')
  })

  it('the auditor dashboard composes the audit widget (the ⊥ overlay tile is present)', () => {
    expect(auditorDashboard.widgets.some((w) => w.minCapability === 'audit')).toBe(true)
  })

  it('the read-only overview composes NO write/sign/admin/audit tile (pure read board)', () => {
    expect(
      readOverviewDashboard.widgets.every((w) => w.minCapability === 'read'),
    ).toBe(true)
  })
})
