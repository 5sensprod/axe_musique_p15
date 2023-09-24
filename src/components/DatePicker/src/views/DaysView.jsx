import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from '../Calendar.module.css'
import { handleNavigationKeys } from '../utils/dateNavigations'
import { updateMonth, handleTabKey, BACKWARD } from '../utils/viewUtils.js'
import useDesignStyles from '../hooks/useDesignStyles'
import alternativeStyles from '../AlternativeCalendar.module.css'

/**
 * Vue des jours dans le calendrier.
 *
 * @param {Object} props - Propriétés pour DaysView.
 * @param {string} props.designType - Type de design utilisé pour le calendrier.
 * @param {Array} props.totalSlots - Liste des jours dans le mois actuel.
 * @param {Function} props.chooseDate - Fonction appelée lorsqu'une date est sélectionnée.
 * @param {Array} props.reorderedDays - Liste des jours de la semaine réordonnés en fonction de la configuration.
 * @param {Function} props.setCurrentMonth - Fonction pour définir le mois actuellement visualisé.
 * @param {Date} props.currentMonth - Le mois actuellement visualisé.
 * @param {Date} props.selectedDate - La date actuellement sélectionnée.
 */
function DaysView({
  designType,
  totalSlots,
  chooseDate,
  reorderedDays,
  setCurrentMonth,
  currentMonth,
  selectedDate,
  // viewedDate = null,
}) {
  const daysRefs = useRef([])
  const [hasBeenHovered, setHasBeenHovered] = useState(false)
  const [changedMonth, setChangedMonth] = useState(null)

  const {
    selectedStyles,
    designClass,
    dayClass,
    grayedDayClass,
    // daysContainerClass,
    activeClass,
    todayClass,
    headerClass,
  } = useDesignStyles(designType)

  const resetHoveredState = () => setHasBeenHovered(false)

  const handleDayHover = () => setHasBeenHovered(true)

  const today = new Date()

  useEffect(() => {
    if (changedMonth === 'next') {
      daysRefs.current[0]?.focus()
    } else if (changedMonth === 'prev') {
      daysRefs.current[daysRefs.current.length - 1]?.focus()
    }
  }, [changedMonth])

  const handleDayKeyDown = (e, index) => {
    if (e.key === 'Tab') {
      let direction
      if (e.shiftKey && index === 0) {
        e.preventDefault()
        direction = BACKWARD
        setCurrentMonth(updateMonth(currentMonth, direction))
        setChangedMonth('prev')
        return
      }

      if (!e.shiftKey && index === totalSlots.length - 1) {
        direction = 'forward'
        setCurrentMonth(updateMonth(currentMonth, direction))
        setChangedMonth('next')
        return
      }

      const result = handleTabKey(e, totalSlots[index], index, currentMonth)
      if (result.direction) {
        e.preventDefault()
        setCurrentMonth(updateMonth(currentMonth, result.direction))
      }
    } else {
      handleNavigationKeys(
        e,
        index,
        totalSlots.length - 1,
        (selectedIndex) => chooseDate(totalSlots[selectedIndex].number),
        daysRefs.current,
      )
    }
  }

  return (
    <div
      className={`${selectedStyles.daysContainer} ${
        designClass ? alternativeStyles[designClass] : ''
      }`}
      onMouseLeave={resetHoveredState}
    >
      {reorderedDays.map((day) => (
        <div className={`${selectedStyles.header} ${headerClass}`} key={day}>
          {day}
        </div>
      ))}
      {totalSlots.map((day, index) => {
        const todayIsThisDay =
          !day.isGrayed &&
          today.getDate() === day.number &&
          today.getMonth() === currentMonth.getMonth() &&
          today.getFullYear() === currentMonth.getFullYear()

        const isSelectedDate =
          !day.isGrayed &&
          selectedDate.getDate() === day.number &&
          selectedDate.getMonth() === currentMonth.getMonth() &&
          selectedDate.getFullYear() === currentMonth.getFullYear()

        let highlightedClass = ''
        if (isSelectedDate && !hasBeenHovered) {
          highlightedClass = activeClass || styles.active
        } else if (todayIsThisDay && !hasBeenHovered) {
          highlightedClass = todayClass || styles.today
        }

        const dayClassname = day.isGrayed
          ? `${styles.grayedDay} ${grayedDayClass}`
          : `${styles.day} ${dayClass}`

        return (
          <div
            key={index}
            className={`${dayClassname} ${highlightedClass}`}
            onClick={(event) => {
              event.stopPropagation()
              if (!day.isGrayed) chooseDate(day.number)
            }}
            onKeyDown={(e) => handleDayKeyDown(e, index)}
            onMouseEnter={handleDayHover}
            ref={(el) => (daysRefs.current[index] = el)}
            tabIndex={day.isGrayed ? -1 : 0}
          >
            {day.number}
          </div>
        )
      })}
    </div>
  )
}

DaysView.propTypes = {
  designType: PropTypes.string.isRequired,
  totalSlots: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number,
      isGrayed: PropTypes.bool,
    }),
  ).isRequired,
  chooseDate: PropTypes.func.isRequired,
  reorderedDays: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCurrentMonth: PropTypes.func.isRequired,
  currentMonth: PropTypes.instanceOf(Date).isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
}

export default DaysView
