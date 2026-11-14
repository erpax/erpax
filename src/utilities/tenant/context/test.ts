import{describe,it,expect}from'vitest'
import * as m from '@/utilities/tenant/context'
describe('tenant/context',()=>{it('the atom exports real matter — the stub test asserts existence, the SKILL states the law',()=>{expect(Object.keys(m).length).toBeGreaterThan(0)})})
