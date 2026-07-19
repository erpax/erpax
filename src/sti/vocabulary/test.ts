import{describe,it,expect}from'vitest'
import * as m from '@/sti/vocabulary'
describe('sti/vocabulary',()=>{it('a TYPE-ONLY atom: its exports erase at runtime — the import succeeding IS the test (tsc carries the real proof)',()=>{expect(typeof m).toBe('object')})})
