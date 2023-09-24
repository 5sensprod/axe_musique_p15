import React from 'react'
import PropTypes from 'prop-types'
import { HomeIcon } from './Icons'
import ChevronButtons from './ChevronSelector'
import styles from './Calendar.module.css'
import Button from './Button'
import useKeyboardAccessibility from './hooks/useKeyboardAccessibility'
import {
  DAYS,
  YEARS,
  switchToMonthView,
  toggleYearView,
  resetToCurrentDate,
} from './utils/viewUtils'

/**
 * Sélecteur de mois.
 *
 * @param {Object} props - Propriétés du composant.
 * @param {Date} props.currentMonth - Mois actuellement affiché.
 * @param {Array<string>} props.months - Liste des mois traduits.
 * @param {string} props.view - Vue actuelle ('days', 'months', 'years').
 * @param {Function} props.setView - Fonction pour changer la vue.
 */
function MonthSelector({ currentMonth, months, view, setView }) {
  const handleMonthSelect = () => {
    setView(switchToMonthView(view))
  }

  const ref = useKeyboardAccessibility(handleMonthSelect)

  if (view === YEARS) return null

  return (
    <Button
      ref={ref}
      onClick={handleMonthSelect}
      className={styles.navButton}
      tabIndex={0}
    >
      {months[currentMonth.getMonth()]}
    </Button>
  )
}

MonthSelector.propTypes = {
  currentMonth: PropTypes.instanceOf(Date).isRequired,
  months: PropTypes.arrayOf(PropTypes.string).isRequired,
  view: PropTypes.string.isRequired,
  setView: PropTypes.func.isRequired,
}

/**
 * Sélecteur d'année.
 *
 * @param {Object} props - Propriétés du composant.
 * @param {Date} props.currentMonth - Mois actuellement affiché.
 * @param {string} props.view - Vue actuelle ('days', 'months', 'years').
 * @param {Function} props.setView - Fonction pour changer la vue.
 * @param {Array<number>} props.yearsBlock - Bloc d'années actuel.
 */
function YearSelector({ currentMonth, view, setView, yearsBlock }) {
  const handleYearSelect = () => {
    setView(toggleYearView(view))
  }

  const ref = useKeyboardAccessibility(handleYearSelect)

  return (
    <Button
      ref={ref}
      onClick={handleYearSelect}
      className={styles.navButton}
      tabIndex={0}
    >
      {view === YEARS
        ? `${yearsBlock[0]}-${yearsBlock[yearsBlock.length - 1]}`
        : currentMonth.getFullYear()}
    </Button>
  )
}

YearSelector.propTypes = {
  currentMonth: PropTypes.instanceOf(Date).isRequired,
  view: PropTypes.string.isRequired,
  setView: PropTypes.func.isRequired,
  yearsBlock: PropTypes.arrayOf(PropTypes.number).isRequired,
}

/**
 * Bouton pour revenir à la date actuelle.
 *
 * @param {Object} props - Propriétés du composant.
 * @param {Function} props.setViewedDate - Fonction pour mettre à jour la date affichée.
 * @param {Function} props.setView - Fonction pour changer la vue.
 * @param {Function} props.setCurrentDate - Fonction pour mettre à jour la date actuelle.
 */
function HomeButton({ setViewedDate, setView, setCurrentDate }) {
  const handleHomeClick = () => {
    const dateToday = resetToCurrentDate()
    setViewedDate(dateToday)
    setCurrentDate(dateToday)
    setView(DAYS)
  }

  const ref = useKeyboardAccessibility(handleHomeClick)

  return (
    <Button
      ref={ref}
      onClick={handleHomeClick}
      icon={HomeIcon}
      className={styles.navButton}
      tabIndex={0}
    />
  )
}

HomeButton.propTypes = {
  setViewedDate: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
  setCurrentDate: PropTypes.func.isRequired,
}

function NavSelector(props) {
  return (
    <>
      <div className={styles.NavSelector}>
        <MonthSelector {...props} />
        <YearSelector {...props} />
      </div>
      <div className={styles.homeSelector}>
        <HomeButton {...props} />
      </div>
      <ChevronButtons {...props} />
    </>
  )
}

export default NavSelector
