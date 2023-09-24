import { DEFAULT_CONFIG } from '../config/defaultConfig'

/**
 * Traite la configuration de l'année. Si elle est définie comme une chaîne, elle essaie de la résoudre en une valeur numérique.
 *
 * @function
 * @param {(string|number)} yearConfig - La configuration de l'année, qui peut être une chaîne ou un nombre.
 * @param {number} currentYear - L'année actuelle.
 * @returns {(number|null)} - L'année traitée ou `null` si la configuration est invalide.
 */
const processYearConfig = (yearConfig, currentYear) => {
  if (typeof yearConfig === 'number') return yearConfig

  if (typeof yearConfig === 'string') {
    const match = yearConfig.match(/(auto|actual)([+-]\d+)?/)
    if (match) {
      const base = currentYear
      const offset = parseInt(match[2], 10) || 0
      return base + offset
    }
  }

  // retourner null si la configuration de l'année n'est pas valide
  return null
}

const adjustDate = (currentDate, yearAdjustment, monthAdjustment) => {
  const year = currentDate.getFullYear() + yearAdjustment
  const month = (currentDate.getMonth() + monthAdjustment + 12) % 12
  return new Date(year, month)
}

/**
 * Applique la configuration de l'année et la traite.
 *
 * @function
 * @param {(string|number)} yearConfig - La configuration de l'année.
 * @param {number} currentYear - L'année actuelle.
 * @returns {(number|null)} - L'année traitée ou `null`.
 */
export const applyYearConfig = (yearConfig, currentYear) => {
  return processYearConfig(yearConfig, currentYear)
}

/**
 * Navigue vers le mois suivant.
 *
 * @function
 * @param {Date} currentDate - La date actuelle.
 * @param {number} minYear - L'année minimale autorisée.
 * @param {number} maxYear - L'année maximale autorisée.
 * @returns {Date} - La date du mois suivant.
 */
const goToNextMonth = (currentDate, minYear, maxYear) => {
  const nextDate = adjustDate(
    currentDate,
    currentDate.getMonth() === 11 ? 1 : 0,
    1,
  )
  if (nextDate.getFullYear() > applyYearConfig(maxYear)) {
    return new Date(applyYearConfig(maxYear), 11)
  }
  return nextDate
}

const goToPreviousMonth = (currentDate, minYear, maxYear) => {
  const prevDate = adjustDate(
    currentDate,
    currentDate.getMonth() === 0 ? -1 : 0,
    -1,
  )
  if (prevDate.getFullYear() < applyYearConfig(minYear)) {
    return new Date(applyYearConfig(minYear), 0)
  }
  return prevDate
}

const goToNextYear = (currentDate, minYear, maxYear) => {
  const nextDate = adjustDate(currentDate, 1, 0)
  if (nextDate.getFullYear() > applyYearConfig(maxYear)) {
    return new Date(applyYearConfig(maxYear), currentDate.getMonth())
  }
  return nextDate
}

const goToPreviousYear = (currentDate, minYear, maxYear) => {
  const prevDate = adjustDate(currentDate, -1, 0)
  if (prevDate.getFullYear() < applyYearConfig(minYear)) {
    return new Date(applyYearConfig(minYear), currentDate.getMonth())
  }
  return prevDate
}

const goToPreviousYearBlock = (yearsBlock, minYear, maxYear, yearBlockSize) => {
  const blockSize = yearBlockSize || DEFAULT_CONFIG.YEAR_BLOCK_SIZE
  const minProcessedYear = applyYearConfig(minYear, new Date().getFullYear())
  const maxProcessedYear = applyYearConfig(maxYear, new Date().getFullYear())

  let newStartYear = yearsBlock[0] - blockSize

  // Si nous sommes en dessous de minYear
  if (newStartYear < minProcessedYear) {
    // Si le premier élément du bloc actuel est déjà minYear, affichez les deux dernières années avant maxYear
    if (yearsBlock[0] === minProcessedYear) {
      newStartYear = maxProcessedYear - 1 // Affichez les 2 dernières années avant maxYear
    } else {
      newStartYear = maxProcessedYear - blockSize + 1 // Commencez par maxYear - blockSize + 1
    }
  }

  return Array.from({ length: blockSize }, (_, i) => newStartYear + i).filter(
    (year) => year >= minProcessedYear && year <= maxProcessedYear,
  )
}

const goToNextYearBlock = (yearsBlock, minYear, maxYear, yearBlockSize) => {
  const blockSize = yearBlockSize || DEFAULT_CONFIG.YEAR_BLOCK_SIZE
  const minProcessedYear = applyYearConfig(minYear, new Date().getFullYear())
  const maxProcessedYear = applyYearConfig(maxYear, new Date().getFullYear())

  let newStartYear = yearsBlock[0] + blockSize

  if (newStartYear > maxProcessedYear) {
    newStartYear = minProcessedYear
  }

  return Array.from({ length: blockSize }, (_, i) => newStartYear + i).filter(
    (year) => year >= minProcessedYear && year <= maxProcessedYear,
  )
}

/**
 * Calcule la nouvelle date basée sur la vue et la direction actuelles.
 *
 * @function
 * @param {string} view - La vue actuelle (jours, mois ou années).
 * @param {string} direction - La direction de navigation (précédente ou suivante).
 * @param {Array<number>} yearsBlock - Le bloc d'années actuel.
 * @param {Date} prev - La date précédente.
 * @param {number} minYear - L'année minimale autorisée.
 * @param {number} maxYear - L'année maximale autorisée.
 * @param {number} yearBlockSize - La taille du bloc d'années.
 * @returns {object} - Un objet contenant la nouvelle date et le nouveau bloc d'années.
 */
export const calculateNewDate = (
  view,
  direction,
  yearsBlock,
  prev,
  minYear,
  maxYear,
  yearBlockSize,
) => {
  const currentYear = new Date().getFullYear()
  const minProcessedYear = applyYearConfig(minYear, currentYear)
  const maxProcessedYear = applyYearConfig(maxYear, currentYear)

  let newDate = prev
  let newYearBlock = yearsBlock

  switch (view) {
    case 'months':
      newDate =
        direction === 'prev'
          ? goToPreviousYear(prev, minProcessedYear, maxProcessedYear)
          : goToNextYear(prev, minProcessedYear, maxProcessedYear)
      break
    case 'days':
      newDate =
        direction === 'prev'
          ? goToPreviousMonth(prev, minProcessedYear, maxProcessedYear)
          : goToNextMonth(prev, minProcessedYear, maxProcessedYear)
      break
    case 'years':
      newYearBlock =
        direction === 'prev'
          ? goToPreviousYearBlock(
              yearsBlock,
              minProcessedYear,
              maxProcessedYear,
              yearBlockSize,
            )
          : goToNextYearBlock(
              yearsBlock,
              minProcessedYear,
              maxProcessedYear,
              yearBlockSize,
            )
      break
    default:
      break
  }

  return { newDate, newYearBlock }
}

/**
 * Gère les touches de navigation pour faciliter la navigation dans le calendrier.
 *
 * @function
 * @param {Event} e - L'événement clavier.
 * @param {number} index - L'index actuel.
 * @param {number} maxIndex - L'index maximum.
 * @param {function} action - L'action à exécuter lors de la sélection d'un élément.
 * @param {Array<HTMLElement>} refsArray - Le tableau de références des éléments interactifs.
 * @param {function} getItem - Une fonction pour obtenir un élément basé sur un index.
 * @param {function} closeCalendar - Une fonction pour fermer le calendrier.
 */
export function handleNavigationKeys(
  e,
  index,
  maxIndex,
  action,
  refsArray,
  getItem,
  closeCalendar,
) {
  switch (e.key) {
    case 'ArrowRight':
      if (index < maxIndex) {
        refsArray[index + 1].focus()
      }
      break
    case 'ArrowLeft':
      if (index > 0) {
        refsArray[index - 1].focus()
      }
      break
    case 'Escape':
      if (typeof closeCalendar === 'function') {
        closeCalendar()
      }
      break
    case 'Enter':
    case 'Space':
      const item = getItem ? getItem(index) : index
      action(item)
      e.preventDefault()
      break

    case 'Tab':
      if (index < maxIndex) {
        refsArray[index + 1].focus()
      }
      break
    default:
      break
  }
}
