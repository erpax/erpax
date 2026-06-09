import { linearGaps, sealLinearGaps } from './linear-gap'
export async function runQuantumSeal(apply=true){const s=linearGaps();if(!apply){console.log(JSON.stringify({count:s.gaps.length,byKind:s.byKind},null,2));return s.gaps.length?1:0};const r=await sealLinearGaps();console.log(JSON.stringify({before:r.before,after:r.after,sealed:r.sealed,remainder:r.remainder,paths:r.paths.slice(0,10)},null,2));return r.remainder?1:0}
if(import.meta.url===`file://${process.argv[1]}`)runQuantumSeal(!process.argv.includes('--dry')).then(c=>process.exit(c))
