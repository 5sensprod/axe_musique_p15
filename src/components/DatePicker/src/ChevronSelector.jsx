import React from 'react'
import styles from './Calendar.module.css'
import { ChevronIcon } from './Icons'
import Button from './Button'
import { calculateNewDate } from './utils/dateNavigations'
import useKeyboardAccessibility from './hooks/useKeyboardAccessibility'

/**
 * Composant ChevronButton pour afficher un bouton avec une icône de chevron.
 *
 * @component
 * @param {string} direction - Direction du chevron ("up" ou "down").
 * @param {function} onClick - Fonction appelée lors du clic sur le bouton.
 * @param {boolean} useIcons - Détermine si l'icône doit être utilisée ou non.
 * @param {string} label - Texte alternatif à afficher si useIcons est false.
 * @returns {React.Element} - Renvoie le composant ChevronButton.
 */
const ChevronButton = React.forwardRef(
  ({ direction, onClick, useIcons, label, ...props }, ref) => (
    <Button
      ref={ref}
      onClick={onClick}
      onMouseDown={(e) => e.preventDefault()}
      className={styles.chevronButton}
      icon={() => useIcons && <ChevronIcon direction={direction} />}
      {...props}
    >
      {!useIcons && label}
    </Button>
  ),
)

/**
 * Composant ChevronButtons pour afficher les boutons de navigation (précédent/suivant).
 *
 * @component
 * @param {function} setViewedDate - Fonction pour définir la date actuellement affichée.
 * @param {boolean} useIcons - Détermine si les icônes doivent être utilisées pour les boutons.
 * @param {string} view - Vue actuelle ("days", "months" ou "years").
 * @param {function} setYearsBlock - Fonction pour définir le bloc d'années.
 * @param {Array<number>} yearsBlock - Bloc d'années actuel.
 * @param {function} setAnimationKey - Fonction pour définir la clé d'animation.
 * @param {number} minYear - Année minimum.
 * @param {number} maxYear - Année maximum.
 * @param {number} yearBlockSize - Taille du bloc d'années.
 * @returns {React.Element} - Renvoie le composant ChevronButtons.
 */
function ChevronButtons({
  setViewedDate,
  useIcons,
  view,
  setYearsBlock,
  yearsBlock,
  setAnimationKey,
  minYear,
  maxYear,
  yearBlockSize,
}) {
  const handleDateChange = (direction) => {
    setViewedDate((prev) => {
      const { newDate, newYearBlock } = calculateNewDate(
        view,
        direction,
        yearsBlock,
        prev,
        minYear,
        maxYear,
        yearBlockSize,
      )
      if (newYearBlock) {
        setYearsBlock(newYearBlock)
      }

      if (newDate) {
        setAnimationKey((prevKey) => prevKey + 1)
        return newDate
      }
      setYearsBlock(newYearBlock)
      setAnimationKey((prevKey) => prevKey + 1)
      return newDate
    })
  }

  const prevButtonRef = useKeyboardAccessibility((direction) => {
    handleDateChange(direction === 'down' ? 'prev' : 'next')
  })

  const nextButtonRef = useKeyboardAccessibility((direction) => {
    handleDateChange(direction === 'down' ? 'prev' : 'next')
  })

  return (
    <div className={styles.chevronContainer}>
      <ChevronButton
        direction="down"
        onClick={() => handleDateChange('prev')}
        useIcons={useIcons}
        label="Previous"
        ref={prevButtonRef}
        tabIndex={0}
      />
      <ChevronButton
        direction="up"
        onClick={() => handleDateChange('next')}
        useIcons={useIcons}
        label="Next"
        ref={nextButtonRef}
        tabIndex={0}
      />
    </div>
  )
}

export default ChevronButtons
