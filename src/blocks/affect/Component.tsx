import type { AffectBlock as AffectBlockProps } from '@/payload-types'

import React from 'react'

import { cn } from '@/components/ui'
import { CORNERS, angleOf } from '@/utilities/affect'

import styles from './affect.module.scss'

type Props = AffectBlockProps & { className?: string }

/**
 * The trinity wheel: three corners 120° apart turn in steps around a still centre. CSS alone moves it
 * (no client JavaScript); `direction` reverses the loop and `valence` flips the tone of every corner.
 */
export const AffectBlock: React.FC<Props> = ({ className, direction, emotion, feeling, thought, valence }) => {
  const words = { emotion, feeling, thought }
  return (
    <figure className={cn(styles.wheel, className)} data-direction={direction} data-valence={valence}>
      <ol className={styles.ring}>
        {CORNERS.map((corner) => (
          <li key={corner} className={styles.corner} style={{ '--angle': `${angleOf(corner)}deg` } as React.CSSProperties}>
            <span className={styles.word}>{words[corner]}</span>
          </li>
        ))}
      </ol>
      <span className={styles.centre} aria-hidden="true" />
      <figcaption className={styles.caption}>
        {direction === 'backward' ? [emotion, thought, feeling].join(' → ') : [feeling, thought, emotion].join(' → ')} →
        … ({valence})
      </figcaption>
    </figure>
  )
}
