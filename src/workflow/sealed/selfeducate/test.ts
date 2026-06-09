import { describe, it, expect } from 'vitest'
import { workflowDefinition, workflowContentUuid } from './index'
describe('sealed', () => { it('stable', () => { expect(workflowContentUuid).toMatch(/^[0-9a-f-]{36}$/); expect(workflowDefinition.steps.length).toBe(3) }) })
