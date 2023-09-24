import React from 'react'
import PropTypes from 'prop-types'
import HomeSVG from './assets/home-house.svg'
import CalendarSVG from './assets/calendar-alt.svg'
import ChevronDownSVG from './assets/chevron-down.svg'

/**
 * Icône de la maison.
 *
 * @returns {React.Element} - Renvoie l'icône de la maison.
 */
export function HomeIcon() {
  return <img src={HomeSVG} alt="Icône de la maison" width="18" height="18" />
}

/**
 * Icône du calendrier.
 *
 * @returns {React.Element} - Renvoie l'icône du calendrier.
 */
export function CalendarIcon() {
  return (
    <img src={CalendarSVG} alt="Icône du calendrier" width="18" height="18" />
  )
}

/**
 * Icône de la flèche (chevron).
 *
 * @param {Object} props - Propriétés du composant.
 * @param {string} props.direction - Direction de la flèche (peut être 'up', 'right', 'down' ou 'left').
 * @returns {React.Element} - Renvoie l'icône de la flèche.
 */
export function ChevronIcon({ direction = 'down' }) {
  const rotationMap = {
    up: '0',
    right: '90',
    down: '180',
    left: '270',
  }

  const rotation = rotationMap[direction] || '0'

  return (
    <img
      src={ChevronDownSVG}
      alt="Icône de la flèche"
      width="30"
      height="30"
      style={{ transform: `rotate(${rotation}deg)` }}
    />
  )
}

// PropTypes pour ChevronIcon
ChevronIcon.propTypes = {
  direction: PropTypes.oneOf(['up', 'right', 'down', 'left']),
}
