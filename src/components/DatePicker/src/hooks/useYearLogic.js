import { useState } from 'react'
import { DEFAULT_CONFIG } from '../config/defaultConfig'

/**
 * Hook personnalisé pour gérer la logique des années.
 *
 * Ce hook génère une liste d'années basée sur la plage min-max spécifiée et la taille du bloc d'années.
 * Il est principalement utilisé pour la navigation entre les années dans un sélecteur de date.
 *
 * @function
 * @param {number} minYear - L'année minimale à inclure dans la liste des années. Par défaut, elle est basée sur la configuration par défaut.
 * @param {number} maxYear - L'année maximale à inclure dans la liste des années. Par défaut, elle est basée sur la configuration par défaut.
 * @param {number} yearBlockSize - La taille du bloc d'années à afficher à la fois dans le sélecteur. Par défaut, elle est basée sur la configuration par défaut.
 *
 * @returns {Object} - Renvoie un objet contenant les éléments suivants :
 *   - today : La date actuelle.
 *   - thisYear : L'année actuelle.
 *   - initialMonth : Le mois actuel.
 *   - years : Un tableau contenant toutes les années de minYear à maxYear.
 *   - yearsBlock : Un sous-ensemble d'années basé sur la taille du bloc d'années.
 *   - setYearsBlock : Une fonction pour définir manuellement le bloc d'années.
 *   - yearBlockSize : La taille du bloc d'années spécifiée.
 */
function useYearLogic(
  minYear = DEFAULT_CONFIG.MIN_YEAR,
  maxYear = DEFAULT_CONFIG.MAX_YEAR,
  yearBlockSize = DEFAULT_CONFIG.YEAR_BLOCK_SIZE,
) {
  const today = new Date()
  const thisYear = today.getFullYear()
  const initialMonth = new Date(thisYear, today.getMonth())

  // Bloc actuel basé sur l'année courante
  const calculateYearBlockStart = (currentYear) => {
    const yearsSinceStart = currentYear - minYear
    return currentYear - (yearsSinceStart % yearBlockSize)
  }

  const [yearsBlock, setYearsBlock] = useState(() => {
    const yearBlockStart = calculateYearBlockStart(thisYear)
    return Array.from(
      { length: yearBlockSize },
      (_, i) => yearBlockStart + i,
    ).filter((year) => year >= minYear && year <= maxYear)
  })

  // Génération du tableau des années
  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => minYear + i,
  )

  return {
    today,
    thisYear,
    initialMonth,
    years,
    yearsBlock,
    setYearsBlock,
    yearBlockSize,
  }
}

export default useYearLogic
