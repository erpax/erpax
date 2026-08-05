export function threatClassify(algorithm: string) {
  const threats: Record<string, string> = {
    'RSA-2048': 'immediate-retire',
    'ECDLP-P-256': 'immediate-retire',
    'AES-256': 'quantum-accelerated',
    'SHA-256': 'quantum-accelerated',
  }
  return threats[algorithm]
}
