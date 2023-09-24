import enTranslations from '../translations/en.json'
import frTranslations from '../translations/fr.json'

/**
 * Récupère les traductions en fonction de la langue spécifiée.
 *
 * Cette fonction retourne un ensemble de chaînes traduites basées sur la langue choisie.
 * Actuellement, seules les traductions en anglais ("en") et en français ("fr") sont disponibles.
 *
 * @function
 * @param {string} [language='en'] - La langue pour laquelle obtenir les traductions. Par défaut, c'est l'anglais.
 * @returns {Object} - Un objet contenant les chaînes traduites pour la langue spécifiée.
 */
function getTranslations(language = 'en') {
  switch (language) {
    case 'fr':
      return frTranslations
    case 'en':
    default:
      return enTranslations
  }
}

export default getTranslations
