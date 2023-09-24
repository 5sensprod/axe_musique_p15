import React from 'react'
import DaysView from './views/DaysView'
import MonthsView from './views/MonthsView'
import YearsView from './views/YearsView'

/**
 * Composant DateGrid pour afficher les grilles des jours, mois ou années.
 *
 * @component
 * @param {Array<Object>} totalSlots - Liste de tous les emplacements de jours pour le mois en cours.
 * @param {function} chooseDate - Fonction pour choisir une date.
 * @param {Object} translations - Traductions pour les mois et les jours.
 * @param {string} view - Vue actuelle ("days", "months" ou "years").
 * @param {function} setView - Fonction pour définir la vue.
 * @param {function} setCurrentMonth - Fonction pour définir le mois en cours.
 * @param {Date} currentMonth - Mois actuellement visualisé.
 * @param {Array<number>} yearsBlock - Bloc d'années actuel.
 * @param {number} animationKey - Clé d'animation.
 * @param {Array<string>} reorderedDays - Jours de la semaine réorganisés.
 * @param {function} closeCalendar - Fonction pour fermer le calendrier.
 * @param {Date} selectedDate - Date actuellement sélectionnée.
 * @param {Date} viewedDate - Date actuellement visualisée.
 * @param {Date} currentDate - Date actuelle.
 * @param {number} yearBlockSize - Taille du bloc d'années.
 * @param {number} minYear - Année minimum.
 * @param {number} maxYear - Année maximum.
 * @param {string} designType - Type de design ("default" ou "alternative").
 * @returns {React.Element} - Renvoie le composant DateGrid.
 */
function DateGrid({
  totalSlots,
  chooseDate,
  translations,
  view,
  setView,
  setCurrentMonth,
  currentMonth,
  yearsBlock,
  animationKey,
  reorderedDays,
  closeCalendar,
  selectedDate,
  viewedDate,
  currentDate,
  yearBlockSize,
  minYear,
  maxYear,
  designType,
}) {
  const handleMonthClick = (monthIndex) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex))
    setView('days')
  }

  const handleYearClick = (selectedYear) => {
    setCurrentMonth(new Date(selectedYear, currentMonth.getMonth()))
    setView('months')
  }

  return (
    <>
      {view === 'days' && (
        <DaysView
          totalSlots={totalSlots}
          chooseDate={chooseDate}
          translations={translations}
          reorderedDays={reorderedDays}
          closeCalendar={closeCalendar}
          setCurrentMonth={setCurrentMonth}
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          viewedDate={viewedDate}
          currentDate={currentDate}
          designType={designType}
        />
      )}

      {view === 'months' && (
        <MonthsView
          translations={translations}
          handleMonthClick={handleMonthClick}
          selectedDate={selectedDate}
        />
      )}

      {view === 'years' && (
        <YearsView
          currentMonth={currentMonth}
          yearsBlock={yearsBlock}
          animationKey={animationKey}
          handleYearClick={handleYearClick}
          selectedDate={selectedDate}
          yearBlockSize={yearBlockSize}
          minYear={minYear}
          maxYear={maxYear}
        />
      )}
    </>
  )
}

export default DateGrid
