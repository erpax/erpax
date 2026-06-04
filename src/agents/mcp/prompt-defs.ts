/**
 * MCP prompts — canned reasoning templates.
 *
 * Slice DDDDD task 11 (2026-05-11). External LLM clients invoke these
 * prompts to get spec-grounded reasoning templates: audit walkthroughs,
 * marketing pitches, compliance gap summaries.
 *
 * @standard MCP 0.6 — Model Context Protocol prompts/list + prompts/get
 */

import { z } from 'zod'

export interface ErpaxMcpPrompt {
  readonly name: string
  readonly title: string
  readonly description: string
  readonly argsSchema: z.ZodRawShape
  handler(args: Record<string, unknown>): Promise<{
    messages: Array<{ role: 'user' | 'assistant'; content: { type: 'text'; text: string } }>
  }>
}

export const ERPAX_MCP_PROMPTS: ReadonlyArray<ErpaxMcpPrompt> = [
  {
    name: 'audit-walkthrough',
    title: 'SOX §404 walk-through narrative',
    description: 'Generate the audit-walk-through narrative for a chain in a locale. Cites the standards on each step.',
    argsSchema: { chainId: z.string(), locale: z.string() },
    async handler(args) {
      return {
        messages: [{
          role: 'user',
          content: {
            type: 'text',
            text: `Produce a SOX §404 walk-through for chain ${String(args.chainId)} in locale ${String(args.locale)}. Cite standards per step (IFRS / IAS / ISO / SOX). Frame each step as: WHO performs WHAT control on WHICH evidence under WHICH standard.`,
          },
        }],
      }
    },
  },
  {
    name: 'marketing-pitch',
    title: 'Sales pitch for a workflow',
    description: 'Generate a sales pitch from the spec + multimedia + standards citations + tenant role.',
    argsSchema: { workflow: z.string(), locale: z.string(), audience: z.string() },
    async handler(args) {
      return {
        messages: [{
          role: 'user',
          content: {
            type: 'text',
            text: `Pitch ERPax's ${String(args.workflow)} workflow to ${String(args.audience)} in ${String(args.locale)}. Cite the standards proven by the workflow. Lead with the audit-trail evidence (Playwright recordings, ISO 19011 §6.4.6, SOX §404) — every claim is provable, not marketing copy.`,
          },
        }],
      }
    },
  },
  {
    name: 'compliance-gap-summary',
    title: 'Compliance posture summary for a tenant role',
    description: 'Summarise which standards a tenant role currently satisfies and which gaps remain.',
    argsSchema: { roleId: z.string(), locale: z.string() },
    async handler(args) {
      return {
        messages: [{
          role: 'user',
          content: {
            type: 'text',
            text: `For tenant role '${String(args.roleId)}', list (a) standards fully cited and (b) standards still missing. For each gap, name the slice that closes it (e.g. LLLLL/MMMMM/NNNNN/OOOOO).`,
          },
        }],
      }
    },
  },
]
