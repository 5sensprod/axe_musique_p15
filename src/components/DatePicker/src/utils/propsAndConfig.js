import {
  DEFAULT_CONFIG,
  CONFIG_VALIDATION_RULES,
} from '../config/defaultConfig'
import { applyYearConfig } from './dateNavigations'

/**
 * Valide et renvoie le format de date fourni.
 *
 * Cette fonction vérifie si le format de date fourni est valide.
 * Si le format de date n'est pas valide, elle utilise le format par défaut.
 *
 * @function
 * @param {string} dateFormat - Le format de date à valider.
 * @returns {string} - Un format de date valide.
 */
function validateDateFormat(dateFormat) {
  const validFormat = DEFAULT_CONFIG.DATE_FORMATS[dateFormat]

  if (!validFormat) {
    console.info(
      `Invalid format key: ${dateFormat}. Defaulting to DEFAULT format.`,
    )
    return DEFAULT_CONFIG.DATE_FORMATS[DEFAULT_CONFIG.DATE_FORMAT]
  }

  return validFormat
}

/**
 * Traite et valide les propriétés de configuration pour le calendrier.
 *
 * @function
 * @param {object} configProps - Les propriétés de configuration fournies pour le calendrier.
 * @param {boolean} configProps.useIcons - Indique si des icônes doivent être utilisées.
 * @param {string} configProps.dateFormat - Format de date à utiliser.
 * @param {object} configProps.customStyles - Styles personnalisés à appliquer.
 * @param {number} configProps.startOfWeek - Le jour de début de la semaine.
 * @param {boolean} configProps.manualInputEnabled - Indique si l'entrée manuelle est activée.
 * @param {number} configProps.minYear - L'année minimale à afficher.
 * @param {number} configProps.maxYear - L'année maximale à afficher.
 * @param {string} configProps.language - Langue à utiliser pour le calendrier.
 * @param {number} configProps.yearBlockSize - Taille du bloc d'années.
 * @param {string} configProps.designType - Type de design à utiliser.
 */
export const handlePropsAndConfig = (configProps) => {
  const {
    useIcons,
    dateFormat,
    customStyles,
    startOfWeek,
    manualInputEnabled,
    minYear,
    maxYear,
    language,
    yearBlockSize,
    designType,
  } = {
    ...DEFAULT_CONFIG,
    ...configProps,
  }

  const currentYear = new Date().getFullYear()

  const getProcessedValue = (
    originalValue,
    defaultValue,
    processingFunc,
    configKey,
    currentYear,
  ) => {
    if (originalValue !== undefined) {
      let processedValue = processingFunc
        ? processingFunc(originalValue, currentYear)
        : originalValue

      const rule = CONFIG_VALIDATION_RULES[configKey]

      if (Array.isArray(rule) && !rule.includes(processedValue)) {
        console.info(
          `Invalid value "${processedValue}" for ${configKey}. Defaulting to "${defaultValue}".`,
        )
        return defaultValue
      }

      // Si la valeur est null (indicateur d'erreur de processYearConfig)
      if (processedValue === null) {
        console.info(
          `Invalid format for "${originalValue}" in ${configKey}. Defaulting to "${defaultValue}".`,
        )
        return defaultValue
      }

      // Si aucune des validations ci-dessus n'a échoué
      return processedValue
    }
    return defaultValue
  }

  return {
    language: getProcessedValue(
      language,
      DEFAULT_CONFIG.LANGUAGE,
      null,
      'LANGUAGE',
    ),
    startOfWeek: getProcessedValue(
      startOfWeek,
      DEFAULT_CONFIG.START_OF_WEEK,
      null,
      'START_OF_WEEK',
    ),
    designType: getProcessedValue(
      designType,
      DEFAULT_CONFIG.DESIGN_TYPE,
      null,
      'DESIGN_TYPE',
    ),

    customStyles,

    manualInputEnabled: getProcessedValue(
      manualInputEnabled,
      DEFAULT_CONFIG.MANUAL_INPUT_ENABLED,
      null,
      'MANUAL_INPUT_ENABLED',
    ),

    minYear: getProcessedValue(
      minYear,
      DEFAULT_CONFIG.MIN_YEAR,
      applyYearConfig,
      'MIN_YEAR',
      currentYear,
    ),
    maxYear: getProcessedValue(
      maxYear,
      DEFAULT_CONFIG.MAX_YEAR,
      applyYearConfig,
      'MAX_YEAR',
      currentYear,
    ),

    yearBlockSize: getProcessedValue(
      yearBlockSize,
      DEFAULT_CONFIG.YEAR_BLOCK_SIZE,
    ),
    useIcons: getProcessedValue(
      useIcons,
      DEFAULT_CONFIG.USE_ICONS,
      null,
      'USE_ICONS',
    ),

    dateFormat: getProcessedValue(
      dateFormat,
      DEFAULT_CONFIG.DATE_FORMATS[DEFAULT_CONFIG.DATE_FORMAT],
      validateDateFormat,
    ),
  }
}
