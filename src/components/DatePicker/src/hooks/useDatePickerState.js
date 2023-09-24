import { useState } from 'react'
import { formatDatePickerDate } from '../utils/dateFunctions'

/**
 * Hook personnalisé pour gérer l'état et la logique d'un sélecteur de date (DatePicker).
 *
 * Ce hook fournit des fonctions et des états pour gérer l'affichage du calendrier,
 * la valeur saisie, l'obtention et la perte de focus, ainsi que d'autres comportements associés.
 *
 * @function
 * @param {Date} initialValue - La valeur initiale du DatePicker.
 * @param {string} dateFormat - Le format de date souhaité pour l'affichage.
 * @param {Function} onClose - Fonction à appeler lorsque le calendrier est fermé.
 * @param {Function} checkError - Fonction pour vérifier les erreurs.
 * @param {Function} setError - Fonction pour définir une erreur.
 * @returns {Object} Un objet contenant l'état et les fonctions pour gérer le DatePicker.
 */
function useDatePickerState(
  initialValue,
  dateFormat,
  onClose,
  checkError,
  setError,
) {
  // Gestion de l'affichage du calendrier
  const [showCalendar, setShowCalendar] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [lastDateBeforeHomeClick, setLastDateBeforeHomeClick] = useState(null)

  // Gestion de la valeur saisie
  const [inputValue, setInputValue] = useState(
    formatDatePickerDate(initialValue, dateFormat),
  )

  // Fonction pour basculer l'affichage du calendrier
  function toggleCalendar() {
    setShowCalendar((prev) => !prev)
  }

  // Fonction pour fermer le calendrier
  function closeCalendar() {
    const hasError = checkError ? checkError() : false

    if (hasError) {
      setInput('') // Réinitialise la valeur d'entrée en cas d'erreur
      setError(null) // Réinitialise l'état de l'erreur
    }

    if (onClose) {
      onClose(hasError)
    }

    setShowCalendar(false)
  }

  // Fonction pour mettre à jour la valeur saisie
  function setInput(date) {
    if (date === '') {
      setInputValue('') // Autoriser une valeur vide
    } else {
      setInputValue(formatDatePickerDate(date, dateFormat))
    }
  }
  // Fonction pour gérer l'obtention du focus
  function handleFocus() {
    setIsFocused(true)
    setShowCalendar(true) // Afficher le calendrier lorsque l'input obtient le focus
  }

  // Fonction pour gérer la perte du focus
  function handleBlur() {
    setIsFocused(false)
    setShowCalendar(false) // Masquer le calendrier lorsque l'input perd le focus
    if (onClose) {
      onClose()
    }
  }

  function saveLastDateBeforeHomeClick(date) {
    setLastDateBeforeHomeClick(date)
  }

  return {
    showCalendar,
    inputValue,
    isFocused,
    toggleCalendar,
    closeCalendar,
    setInput,
    handleFocus,
    handleBlur,
    lastDateBeforeHomeClick,
    saveLastDateBeforeHomeClick,
  }
}

export default useDatePickerState
