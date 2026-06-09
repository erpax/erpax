import { runQuantumSeal } from '@/quantum'

if (import.meta.url === `file://${process.argv[1]}`) {
  runQuantumSeal(!process.argv.includes('--dry')).then((c) => process.exit(c))
}

export { runQuantumSeal }
