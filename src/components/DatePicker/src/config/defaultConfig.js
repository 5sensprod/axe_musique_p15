/**
 * Configuration par défaut du composant DatePicker.
 * @constant {Object} DEFAULT_CONFIG
 */
export const DEFAULT_CONFIG = {
  YEAR_BLOCK_SIZE: 16,
  USE_ICONS: true,
  DESIGN_TYPE: 'default',
  LANGUAGE: 'fr',
  DATE_FORMAT: 'DEFAULT',
  CUSTOM_STYLES: {},
  START_OF_WEEK: 0, // 0 pour Dimanche...
  MANUAL_INPUT_ENABLED: true,
  MIN_YEAR: 1930,
  MAX_YEAR: 2025,
  DATE_FORMATS: {
    DEFAULT: 'DD-MM-YYYY',
    US: 'MM-DD-YYYY',
    ISO: 'YYYY-MM-DD',
  },
}

const currentYear = new Date().getFullYear()

/**
 * Règles de validation pour la configuration du DatePicker.
 * @constant {Object} CONFIG_VALIDATION_RULES
 */
export const CONFIG_VALIDATION_RULES = {
  LANGUAGE: ['en', 'fr'],
  START_OF_WEEK: [0, 1, 2, 3, 4, 5, 6],
  DESIGN_TYPE: ['default', 'neuro', 'glass'],
  USE_ICONS: [true, false],
  MANUAL_INPUT_ENABLED: [true, false],
  DATE_FORMAT: Object.keys(DEFAULT_CONFIG.DATE_FORMATS),
  MIN_YEAR: { min: 1900, max: currentYear },
  MAX_YEAR: { min: 1900, max: currentYear + 50 },
}
