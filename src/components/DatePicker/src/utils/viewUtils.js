import { getDaysInMonth } from './dateFunctions'

/**
 * Constantes représentant les différentes vues du sélecteur de date.
 */
export const DAYS = 'days'
export const MONTHS = 'months'
export const YEARS = 'years'

/**
 * Passe à la vue du mois.
 *
 * @function
 * @param {string} view - La vue actuelle (jours, mois ou années).
 * @returns {string} - Retourne la vue "mois" si la vue actuelle est "jours", sinon retourne la vue actuelle.
 */
export function switchToMonthView(view) {
  return view === DAYS ? MONTHS : view
}

/**
 * Basculer entre la vue des années et la vue des mois.
 *
 * @function
 * @param {string} view - La vue actuelle (mois ou années).
 * @returns {string} - Retourne la vue "années" si la vue actuelle est "mois", sinon retourne la vue "mois".
 */
export function toggleYearView(view) {
  return view === YEARS ? MONTHS : YEARS
}

/**
 * Réinitialise la date à la date actuelle.
 *
 * @function
 * @returns {Date} - La date actuelle sans l'heure, les minutes et les secondes.
 */
export function resetToCurrentDate() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

/**
 * Réorganise les jours de la semaine en fonction de l'index du jour de départ.
 *
 * @function
 * @param {string[]} days - Tableau des jours de la semaine.
 * @param {number} startDayIndex - Index du jour de départ (0 pour dimanche, 6 pour samedi).
 * @returns {string[]} - Tableau des jours de la semaine réorganisé.
 */
export function reorderDays(days, startDayIndex) {
  if (startDayIndex < 0 || startDayIndex > 6) return days
  return [...days.slice(startDayIndex), ...days.slice(0, startDayIndex)]
}

/**
 * Constantes représentant les directions pour naviguer entre les mois.
 */
export const FORWARD = 'forward'
export const BACKWARD = 'backward'

/**
 * Met à jour le mois actuel en fonction de la direction spécifiée.
 *
 * @function
 * @param {Date} currentMonth - Le mois actuel.
 * @param {string} direction - Direction pour la mise à jour ("forward" ou "backward").
 * @returns {Date} - Nouveau mois après mise à jour.
 */
export const updateMonth = (currentMonth, direction) => {
  const newMonth = new Date(currentMonth)
  const increment = direction === FORWARD ? 1 : -1
  newMonth.setMonth(currentMonth.getMonth() + increment)
  return newMonth
}

/**
 * Gère la navigation entre les jours en utilisant la touche Tab.
 *
 * @function
 * @param {Event} e - L'événement de pression de touche.
 * @param {Object} day - L'objet jour actuel.
 * @param {number} index - Index du jour actuel.
 * @param {Date} currentMonth - Le mois actuel.
 * @returns {Object} - Un objet contenant la direction pour la navigation, s'il y en a une.
 */
export const handleTabKey = (e, day, index, currentMonth) => {
  const daysInCurrentMonth = getDaysInMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
  )
  const isLastDayOfCurrentMonth =
    day.number === daysInCurrentMonth && !day.isGrayed
  const isFirstDayOfCurrentMonth = day.number === 1 && !day.isGrayed

  if (!e.shiftKey && isLastDayOfCurrentMonth) {
    e.preventDefault()
    return { direction: FORWARD }
  } else if (e.shiftKey && isFirstDayOfCurrentMonth) {
    e.preventDefault()
    return { direction: BACKWARD }
  }

  return {}
}
