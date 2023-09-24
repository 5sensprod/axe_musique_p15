import React, { useState, forwardRef } from 'react'
import styles from './Calendar.module.css'
import NavSelector from './NavSelector'
import DateGrid from './DateGrid'
import getTranslations from './utils/translate'
import useCalendarLogic from './hooks/useCalendarLogic'
import useYearLogic from './hooks/useYearLogic'
import useDesignStyles from './hooks/useDesignStyles'
import { chooseDate } from './utils/dateFunctions'
import alternativeStyles from './AlternativeCalendar.module.css'

/**
 * Composant Calendar pour afficher un calendrier interactif.
 *
 * @component
 * @param {function} selectDate - Fonction pour sélectionner une date.
 * @param {function} closeCalendar - Fonction pour fermer le calendrier.
 * @param {boolean} useIcons - Indique si des icônes doivent être utilisées.
 * @param {string} language - Langue pour les traductions.
 * @param {Array<string>} reorderedDays - Jours réorganisés.
 * @param {number} startOfWeek - Jour de début de la semaine.
 * @param {string} designType - Type de design pour le calendrier.
 * @param {boolean} showButton - Indique si le bouton doit être affiché.
 * @param {Object} dateProps - Autres propriétés relatives à la date.
 * @returns {React.Element} - Renvoie le composant Calendar.
 */
const Calendar = forwardRef(
  (
    {
      selectDate,
      closeCalendar,
      useIcons,
      language,
      reorderedDays,
      startOfWeek,
      designType,
      showButton = true,
      ...dateProps
    },
    ref,
  ) => {
    // Translation utility
    const translations = getTranslations(language)

    // Design Styles
    const { selectedStyles, designClass, rootClass } =
      useDesignStyles(designType)

    // Year Logic
    const { initialMonth, years, yearsBlock, setYearsBlock } = useYearLogic(
      dateProps.minYear,
      dateProps.maxYear,
      dateProps.yearBlockSize,
    )

    // Calendar Logic
    const { viewedDate, setViewedDate, totalSlots } = useCalendarLogic(
      initialMonth,
      dateProps.selectedDate,
      startOfWeek,
      dateProps.yearBlockSize,
    )

    // Date choosing logic
    const handleChooseDate = (day) =>
      chooseDate(selectDate, closeCalendar, viewedDate, day)

    // State Initializations
    const [currentDate, setCurrentDate] = useState(new Date())
    const [view, setView] = useState('days')
    const [animationKey, setAnimationKey] = useState(0)

    return (
      <div
        className={` ${selectedStyles.calendar}  ${rootClass} ${
          designClass ? alternativeStyles[designClass] : ''
        }`}
        ref={ref}
      >
        {/* Navigation Selector */}
        <div className={styles.calendarNav}>
          <NavSelector
            currentMonth={viewedDate}
            setViewedDate={setViewedDate}
            months={translations.shortMonths}
            years={years}
            useIcons={useIcons}
            view={view}
            setView={setView}
            yearsBlock={yearsBlock}
            yearBlockSize={dateProps.yearBlockSize}
            setYearsBlock={setYearsBlock}
            animationKey={animationKey}
            setAnimationKey={setAnimationKey}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            minYear={dateProps.minYear}
            maxYear={dateProps.maxYear}
          />
        </div>

        {/* Date Grid */}
        <DateGrid
          key={`${viewedDate.getMonth()}-${viewedDate.getFullYear()}`}
          totalSlots={totalSlots}
          chooseDate={handleChooseDate}
          translations={translations}
          view={view}
          setView={setView}
          currentMonth={viewedDate}
          setCurrentMonth={setViewedDate}
          yearsBlock={yearsBlock}
          animationKey={animationKey}
          reorderedDays={reorderedDays}
          selectedDate={dateProps.selectedDate}
          viewedDate={viewedDate}
          currentDate={currentDate}
          yearBlockSize={dateProps.yearBlockSize}
          designType={designType}
        />
      </div>
    )
  },
)

export default Calendar
