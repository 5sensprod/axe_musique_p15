import { DEFAULT_CONFIG } from '../config/defaultConfig'
// ========== DATE UTILITIES ==========

const DAYS_IN_A_WEEK = 7

/**
 * Ajuste l'index du jour de départ en fonction de la configuration du jour de début de semaine.
 *
 * @function
 * @param {number} dayIndex - Index du jour de la semaine (0 pour Dimanche, 1 pour Lundi, etc.).
 * @param {number} startOfWeek - Index du premier jour de la semaine selon la configuration.
 * @returns {number} - Index ajusté du jour.
 */
const adjustStartOfWeek = (dayIndex, startOfWeek) => {
  const adjustedIndex = dayIndex - startOfWeek
  return adjustedIndex < 0 ? adjustedIndex + DAYS_IN_A_WEEK : adjustedIndex
}

/**
 * Génère une liste de jours.
 *
 * @function
 * @param {number} start - Jour de début.
 * @param {number} end - Jour de fin.
 * @param {boolean} isGrayed - Indique si les jours doivent être grisés.
 * @returns {Array} - Liste des jours.
 */
const generateDays = (start, end, isGrayed = false) =>
  new Array(end - start + 1).fill(null).map((_, index) => ({
    number: start + index,
    isGrayed,
  }))

/**
 * Génère la liste complète des emplacements de jour pour un mois donné.
 *
 * @function
 * @param {Date} currentMonth - Date représentant le mois actuel.
 * @param {number} startOfWeek - Index du premier jour de la semaine.
 * @returns {Array} - Liste des emplacements de jour.
 */
export function generateTotalSlots(currentMonth, startOfWeek = 0) {
  const currentYear = currentMonth.getFullYear()
  const currentMonthIndex = currentMonth.getMonth()

  const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonthIndex)
  const daysInPreviousMonth = getDaysInMonth(currentYear, currentMonthIndex - 1)

  const firstDayOfCurrentMonth = adjustStartOfWeek(
    new Date(currentYear, currentMonthIndex, 1).getDay(),
    startOfWeek,
  )

  const leadingDaysCount = firstDayOfCurrentMonth
  const trailingDaysCount =
    (DAYS_IN_A_WEEK -
      ((leadingDaysCount + daysInCurrentMonth) % DAYS_IN_A_WEEK)) %
    DAYS_IN_A_WEEK

  const leadingDaysFromPreviousMonth = generateDays(
    daysInPreviousMonth - leadingDaysCount + 1,
    daysInPreviousMonth,
    true,
  )
  const daysOfCurrentMonth = generateDays(1, daysInCurrentMonth)
  const trailingDaysForNextMonth = generateDays(1, trailingDaysCount, true)

  return [
    ...leadingDaysFromPreviousMonth,
    ...daysOfCurrentMonth,
    ...trailingDaysForNextMonth,
  ]
}

/**
 * Abbrège le nom du mois si sa longueur dépasse 5 caractères.
 *
 * @function
 * @param {string} month - Nom complet du mois.
 * @returns {string} - Nom du mois abrégé.
 */
export function abbreviateMonth(month) {
  return month.length > 5 ? month.substring(0, 4) + '.' : month
}

/**
 * Obtient le nombre de jours dans un mois donné.
 *
 * @function
 * @param {number} year - L'année.
 * @param {number} month - Le mois (0 pour Janvier, 1 pour Février, etc.).
 * @returns {number} - Nombre de jours dans le mois.
 */
export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

/**
 * Formate une date en fonction du format souhaité.
 *
 * @function
 * @param {Date|string} value - Date à formater.
 * @param {string} dateFormat - Format de date souhaité.
 * @returns {string} - Date formatée.
 */
export function formatDatePickerDate(
  value,
  dateFormat = DEFAULT_CONFIG.DATE_FORMATS.DEFAULT,
) {
  if (!(value instanceof Date)) {
    return value
  }

  const day = value.getDate()
  const month = value.getMonth() + 1
  const year = value.getFullYear()

  switch (dateFormat) {
    case 'YYYY-MM-DD':
      return `${year}/${month.toString().padStart(2, '0')}/${day
        .toString()
        .padStart(2, '0')}`
    case 'MM-DD-YYYY':
      return `${month.toString().padStart(2, '0')}/${day
        .toString()
        .padStart(2, '0')}/${year}`
    case 'DD-MM-YYYY':
      return `${day.toString().padStart(2, '0')}/${month
        .toString()
        .padStart(2, '0')}/${year}`
    default:
      return value
  }
}

/**
 * Convertit une date formatée en chaîne de caractères en un objet Date.
 *
 * @function
 * @param {string} dateString - Date sous forme de chaîne de caractères.
 * @param {string} format - Format de date utilisé.
 * @returns {Date} - Objet Date correspondant.
 */
export function convertFormattedStringToDate(
  dateString,
  format = DEFAULT_CONFIG.DATE_FORMATS.DEFAULT,
) {
  const parts = dateString.split('/')

  switch (format) {
    case 'DD-MM-YYYY':
      return new Date(
        Date.UTC(
          parseInt(parts[2]),
          parseInt(parts[1]) - 1,
          parseInt(parts[0]),
        ),
      )
    case 'MM-DD-YYYY':
      return new Date(
        Date.UTC(
          parseInt(parts[2]),
          parseInt(parts[0]) - 1,
          parseInt(parts[1]),
        ),
      )
    case 'YYYY-MM-DD':
      return new Date(
        Date.UTC(
          parseInt(parts[0]),
          parseInt(parts[1]) - 1,
          parseInt(parts[2]),
        ),
      )
    default:
      throw new Error(`Invalid date format: ${format}`)
  }
}

/**
 * Détermine si une année donnée est une année bissextile ou non.
 *
 * @function
 * @param {number} year - L'année à vérifier.
 * @returns {boolean} - Retourne `true` si l'année est bissextile, sinon `false`.
 */
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

function generateRegex(formatKey, separator) {
  const formatMapping = {
    DEFAULT: `^(\\d{2})${separator}(\\d{2})${separator}(\\d{4})$`,
    US: `^(\\d{2})${separator}(\\d{2})${separator}(\\d{4})$`,
    ISO: `^(\\d{4})${separator}(\\d{2})${separator}(\\d{2})$`,
  }
  return formatMapping[formatKey]
}

/**
 * Vérifie si une date est valide.
 *
 * @function
 * @param {string} dateString - Date sous forme de chaîne de caractères.
 * @param {string} formatKey - Clé de format de date à utiliser.
 * @param {number} minYear - Année minimale autorisée.
 * @param {number} maxYear - Année maximale autorisée.
 * @returns {object} - Un objet avec `isValid` indiquant si la date est valide et `errorType` indiquant le type d'erreur.
 */
export function isValidDate(
  dateString,
  formatKey = DEFAULT_CONFIG.DATE_FORMAT,
  minYear = DEFAULT_CONFIG.MIN_YEAR,
  maxYear = DEFAULT_CONFIG.MAX_YEAR,
) {
  let day, month, year
  const separator = dateString.includes('/') ? '/' : '-'
  const format = DEFAULT_CONFIG.DATE_FORMATS[formatKey]

  const regex = generateRegex(formatKey, separator)
  if (!new RegExp(regex).test(dateString))
    return { isValid: false, errorType: 'invalidDate' }

  switch (format) {
    case DEFAULT_CONFIG.DATE_FORMATS.DEFAULT:
      ;[day, month, year] = dateString.split(separator).map(Number)
      break
    case DEFAULT_CONFIG.DATE_FORMATS.US:
      ;[month, day, year] = dateString.split(separator).map(Number)
      break
    case DEFAULT_CONFIG.DATE_FORMATS.ISO:
      ;[year, month, day] = dateString.split(separator).map(Number)
      break
    default:
      return { isValid: false, errorType: 'unsupportedFormat' }
  }

  if (isNaN(day) || isNaN(month) || isNaN(year))
    return { isValid: false, errorType: 'invalidDate' }
  if (day < 1 || day > 31 || month < 1 || month > 12)
    return { isValid: false, errorType: 'invalidDate' }
  if (year < minYear || year > maxYear)
    return { isValid: false, errorType: 'outOfRange' }

  if (month === 2) {
    if (isLeapYear(year) && day > 29)
      return { isValid: false, errorType: 'invalidDate' }
    if (!isLeapYear(year) && day > 28)
      return { isValid: false, errorType: 'invalidDate' }
  } else {
    const daysInMonth = new Date(year, month, 0).getDate()
    if (day > daysInMonth) return { isValid: false, errorType: 'invalidDate' }
  }

  return { isValid: true, errorType: null }
}

const MASK_FORMATS = {
  [DEFAULT_CONFIG.DATE_FORMATS.DEFAULT]: [2, 5],
  [DEFAULT_CONFIG.DATE_FORMATS.US]: [2, 5],
  [DEFAULT_CONFIG.DATE_FORMATS.ISO]: [4, 7],
}

/**
 * Formate une date pour correspondre à un masque donné.
 *
 * @function
 * @param {string} value - Date sous forme de chaîne de caractères.
 * @param {string} format - Format souhaité pour le masque.
 * @param {string} separator - Séparateur à utiliser dans la date (par défaut '/').
 * @returns {string} - Date formatée selon le masque.
 */
export function formatToMask(
  value,
  format = DEFAULT_CONFIG.DATE_FORMATS.DEFAULT,
  separator = '/',
) {
  if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const [year, month, day] = value.split('-')
    switch (format) {
      case DEFAULT_CONFIG.DATE_FORMATS.US:
        value = `${month}${day}${year}`
        break
      case DEFAULT_CONFIG.DATE_FORMATS.DEFAULT:
        value = `${day}${month}${year}`
        break
      case DEFAULT_CONFIG.DATE_FORMATS.ISO:
        // Do nothing as the format is already correct.
        break
      default:
        throw new Error(`Invalid format: ${format}`)
    }
  }

  const positions = MASK_FORMATS[format] || []
  if (!positions.length) {
    throw new Error(`Invalid format: ${format}`)
  }

  let maskedValue = value.replace(/\D/g, '')

  positions.forEach((position) => {
    if (maskedValue.length > position) {
      maskedValue = `${maskedValue.substring(
        0,
        position,
      )}${separator}${maskedValue.substring(position)}`
    }
  })

  return maskedValue
}

/**
 * Sélectionne une date.
 *
 * Cette fonction met à jour la date sélectionnée et ferme le calendrier.
 *
 * @function
 * @param {function} selectDate - Fonction pour sélectionner une date.
 * @param {function} closeCalendar - Fonction pour fermer le calendrier.
 * @param {Date} currentMonth - Mois actuellement affiché.
 * @param {object} day - Jour sélectionné.
 */
export function chooseDate(selectDate, closeCalendar, currentMonth, day) {
  selectDate(
    `${currentMonth.getFullYear()}-${String(
      currentMonth.getMonth() + 1,
    ).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
  )
  closeCalendar()
}
