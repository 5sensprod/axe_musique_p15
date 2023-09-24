import { useState } from 'react'
import { generateTotalSlots } from '../utils/dateFunctions'

/**
 * Hook personnalisé pour gérer la logique du calendrier.
 *
 * Ce hook renvoie les informations relatives à la date affichée, les créneaux disponibles,
 * la date sélectionnée et fournit une fonction pour mettre à jour la date affichée.
 *
 * @function
 * @param {Date} initialMonth - Le mois initial à afficher.
 * @param {Date} selectedDate - La date actuellement sélectionnée.
 * @param {number} [startOfWeek=0] - Le premier jour de la semaine (0 pour Dimanche, 1 pour Lundi, etc.).
 * @returns {Object} Un objet contenant les propriétés viewedDate, setViewedDate, totalSlots et selectedDate.
 */
function useCalendarLogic(initialMonth, selectedDate, startOfWeek = 0) {
  const [viewedDate, setViewedDate] = useState(selectedDate || initialMonth)

  const totalSlots = generateTotalSlots(viewedDate, startOfWeek)

  return {
    viewedDate,
    setViewedDate,
    totalSlots,
    selectedDate,
  }
}

export default useCalendarLogic
