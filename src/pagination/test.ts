import{describe,it,expect}from'vitest'
import{atomPath,spreadOf}from'@/pagination'
describe('pagination',()=>{it('ok',()=>{expect(atomPath).toBe('pagination');expect(spreadOf().debit).toBeGreaterThanOrEqual(0)})})
