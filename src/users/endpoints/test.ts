import{describe,it,expect}from'vitest'
import * as m from '@/users/endpoints'
describe('users/endpoints',()=>{it('the atom exports real matter — the stub test asserts existence, the SKILL states the law',()=>{expect(Object.keys(m).length).toBeGreaterThan(0)})})
