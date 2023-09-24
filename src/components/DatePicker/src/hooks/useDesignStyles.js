import styles from '../Calendar.module.css'
import alternativeStyles from '../AlternativeCalendar.module.css'

/**
 * Hook personnalisé pour obtenir les styles en fonction du type de design spécifié.
 *
 * Ce hook fournit un ensemble de styles basé sur le type de design choisi pour le calendrier.
 * Il prend en charge les designs 'default', 'neuro', et 'glass' et retourne
 * un objet contenant les styles et classes CSS associés à ce design.
 *
 * @function
 * @param {string} designType - Le type de design à utiliser (par défaut : 'default').
 * @returns {Object} Un objet contenant les styles et classes CSS associés au design choisi.
 */
const useDesignStyles = (designType = 'default') => {
  let selectedStyles = styles
  let designClass = ''

  if (designType === 'neuro') {
    selectedStyles = { ...styles, ...alternativeStyles }
    designClass = 'neuro'
  } else if (designType === 'glass') {
    selectedStyles = { ...styles, ...alternativeStyles }
    designClass = 'glass'
  }

  const dayClass = alternativeStyles[`${designClass}Day`]
  const grayedDayClass = alternativeStyles[`${designClass}GrayedDay`]
  const daysContainerClass = alternativeStyles[`${designClass}DaysContainer`]
  const activeClass = alternativeStyles[`${designClass}Active`]
  const headerClass = alternativeStyles[`${designClass}Header`]
  const todayClass = alternativeStyles[`${designClass}Today`]

  return {
    selectedStyles,
    designClass,
    dayClass,
    grayedDayClass,
    daysContainerClass,
    activeClass,
    todayClass,
    headerClass,
  }
}

export default useDesignStyles
