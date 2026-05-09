/**
 * `anyone` access predicate — public/unauthenticated read.
 *
 * @security ISO-27002 §5.15 access-control intentional-public-read
 * @see docs/STANDARDS.md §4.4
 */

import type { Access } from 'payload'

export const anyone: Access = () => true
