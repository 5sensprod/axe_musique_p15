import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import { CalendarIcon } from './Icons'
import styles from './DatePicker.module.css'

/**
 * Composant CalendarButton pour afficher un bouton de calendrier.
 *
 * @component
 * @param {function} onClick - Fonction appelée lors du clic sur le bouton.
 * @param {boolean} showCalendar - Indique si le calendrier est actuellement affiché.
 * @returns {React.Element} - Renvoie le composant CalendarButton.
 */
const CalendarButton = forwardRef(
  ({ onClick, showCalendar, ...props }, ref) => (
    <Button
      type="button"
      onClick={onClick}
      className={styles.calendarButton}
      icon={CalendarIcon}
      ref={ref}
      aria-expanded={showCalendar}
      aria-label="Toggle date picker"
      {...props}
    />
  ),
)

CalendarButton.propTypes = {
  onClick: PropTypes.func,
  showCalendar: PropTypes.bool,
}

export default CalendarButton
