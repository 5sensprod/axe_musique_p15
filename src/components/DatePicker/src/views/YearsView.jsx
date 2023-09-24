import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import styles from '../Calendar.module.css'
import { handleNavigationKeys } from '../utils/dateNavigations'

/**
 * Vue des années dans le calendrier.
 *
 * @param {Object} props - Propriétés pour YearsView.
 * @param {Function} props.handleYearClick - Fonction appelée lorsqu'une année est sélectionnée.
 * @param {Date} props.selectedDate - La date actuellement sélectionnée.
 * @param {Array} props.yearsBlock - Tableau contenant les années à afficher.
 * @param {number} props.yearBlockSize - Nombre d'années à afficher.
 * @param {number} props.minYear - Année minimale.
 * @param {number} props.maxYear - Année maximale.
 */
function YearsView({
  handleYearClick,
  selectedDate,
  yearsBlock,
  yearBlockSize,
  minYear,
  maxYear,
}) {
  const yearsRefs = useRef([])

  const displayedYears = yearsBlock.slice(0, yearBlockSize)

  const handleYearKeyDown = (e, index) => {
    handleNavigationKeys(
      e,
      index,
      displayedYears.length - 1,
      handleYearClick,
      yearsRefs.current,
      (i) => displayedYears[i],
    )
  }

  return (
    <div className={styles.yearsContainer}>
      {displayedYears.map((year, index) => (
        <div
          key={year || index}
          className={`${styles.year} ${
            index === selectedDate.getYear() ? styles.selectedYear : ''
          }`}
          onClick={(event) => {
            event.stopPropagation()
            handleYearClick(year)
          }}
          onKeyDown={(e) => handleYearKeyDown(e, index)}
          ref={(el) => (yearsRefs.current[index] = el)}
          tabIndex={0}
        >
          {year}
        </div>
      ))}
    </div>
  )
}

YearsView.propTypes = {
  handleYearClick: PropTypes.func.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  yearsBlock: PropTypes.arrayOf(PropTypes.number).isRequired,
  yearBlockSize: PropTypes.number.isRequired,
  minYear: PropTypes.number.isRequired,
  maxYear: PropTypes.number.isRequired,
}

export default YearsView
