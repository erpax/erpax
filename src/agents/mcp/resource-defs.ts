/**
 * MCP resources — read-only data exposed to clients via uri.
 *
 * Slice DDDDD task 11 (2026-05-11). Resources are addressable read-
 * only artefacts; tools are imperative actions. The MCP plugin
 * surfaces both.
 *
 * @standard MCP 0.6 — Model Context Protocol resources/list + resources/read
 */

import { extractCorpus } from '@/spec/generator'
import { BUSINESS_CHAINS } from '@/business/chain/registry'

export interface ErpaxMcpResource {
  readonly name: string
  readonly title: string
  readonly description: string
  readonly mimeType: string
  readonly uri: string
  handler(): Promise<{ contents: Array<{ text: string; uri: string }> }>
}

export const ERPAX_MCP_RESOURCES: ReadonlyArray<ErpaxMcpResource> = [
  {
    name: 'spec-corpus',
    title: 'Spec corpus',
    description: 'Full SpecCorpus extracted from JSDoc — every collection / chain / standard / feature / role / emit / subscribe / example / invariant / use case / summary / slice / cron / see.',
    mimeType: 'application/json',
    uri: 'erpax://spec/corpus',
    async handler() {
      return {
        contents: [{
          text: JSON.stringify(extractCorpus(process.cwd())),
          uri: 'erpax://spec/corpus',
        }],
      }
    },
  },
  {
    name: 'chain-registry',
    title: 'BUSINESS_CHAINS registry',
    description: 'Every business chain id + steps + emits + standards.',
    mimeType: 'application/json',
    uri: 'erpax://chains/registry',
    async handler() {
      return {
        contents: [{
          text: JSON.stringify(Object.values(BUSINESS_CHAINS)),
          uri: 'erpax://chains/registry',
        }],
      }
    },
  },
]
