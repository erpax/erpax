import{describe,it,expect,beforeEach,afterEach}from'vitest'
import{existsSync,mkdtempSync,mkdirSync,rmSync,writeFileSync}from'node:fs'
import{join}from'node:path'
import{tmpdir}from'node:os'
import{linearGaps,sealLinearGaps}from'./linear-gap'
describe('linear-gap',()=>{let cwd:string;beforeEach(()=>{cwd=mkdtempSync(join(tmpdir(),'lg-'));mkdirSync(join(cwd,'src'),{recursive:true})});afterEach(()=>rmSync(cwd,{recursive:true,force:true}));it('shape',()=>{expect(linearGaps(cwd).byKind).toHaveProperty('trinity-incomplete')});it('seal',async()=>{mkdirSync(join(cwd,'src/hub/gap'),{recursive:true});writeFileSync(join(cwd,'src/hub/index.ts'),'export const x=1\n');writeFileSync(join(cwd,'src/hub/gap/index.ts'),'export const y=1\n');const b=linearGaps(cwd).gaps.filter(g=>g.atomPath==='hub/gap').length;await sealLinearGaps(cwd,5);expect(linearGaps(cwd).gaps.filter(g=>g.atomPath==='hub/gap').length).toBeLessThan(b);expect(existsSync(join(cwd,'src/hub/gap/test.ts'))).toBe(true)})})
