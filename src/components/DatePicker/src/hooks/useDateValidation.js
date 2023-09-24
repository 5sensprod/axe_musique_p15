import { useState } from 'react'
import { isValidDate } from '../utils/dateFunctions'
import { DEFAULT_CONFIG } from '../config/defaultConfig'
import getTranslations from '../utils/translate'

/**
 * Hook personnalisé pour valider une date en fonction de divers critères.
 *
 * Ce hook fournit des fonctions et un état pour valider une date en fonction d'un format spécifié,
 * d'une plage de dates valide, et d'une langue spécifiée pour les messages d'erreur.
 *
 * @function
 * @param {string} dateFormat - Le format de date à utiliser pour la validation (par défaut : format par défaut du config).
 * @param {number} minYear - L'année minimale autorisée pour la validation (par défaut : 1930).
 * @param {number} maxYear - L'année maximale autorisée pour la validation (par défaut : 2025).
 * @param {string} language - La langue à utiliser pour les messages d'erreur (par défaut : 'fr').
 * @returns {Array} Un tableau contenant l'état d'erreur, la fonction de validation et la fonction de définition d'erreur.
 */
function useDateValidation(
  dateFormat = DEFAULT_CONFIG.DATE_FORMAT,
  minYear = DEFAULT_CONFIG.MIN_YEAR,
  maxYear = DEFAULT_CONFIG.MAX_YEAR,
  language = DEFAULT_CONFIG.LANGUAGE,
) {
  const [error, setError] = useState(null)
  const translations = getTranslations(language)

  function validate(value) {
    const formatKey = Object.values(DEFAULT_CONFIG.DATE_FORMATS).includes(
      dateFormat,
    )
      ? Object.keys(DEFAULT_CONFIG.DATE_FORMATS).find(
          (key) => DEFAULT_CONFIG.DATE_FORMATS[key] === dateFormat,
        )
      : DEFAULT_CONFIG.DATE_FORMAT

    let formattedError = translations.errors.unknownError
    const validationResponse = isValidDate(value, formatKey, minYear, maxYear)

    if (validationResponse.isValid) {
      setError(null)
      return true
    } else {
      const errorType = validationResponse.errorType
      if (errorType === 'outOfRange') {
        formattedError = translations.errors.invalidDateRange
          .replace('{minYear}', minYear ? minYear.toString() : 'N/A')
          .replace('{maxYear}', maxYear ? maxYear.toString() : 'N/A')
      } else if (errorType === 'invalidDate') {
        formattedError = translations.errors.invalidDate
      }
      setError(formattedError)
      return false
    }
  }

  return [error, validate, setError]
}

export default useDateValidation
