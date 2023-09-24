/**
 * Met à jour la valeur d'entrée avec la nouvelle valeur.
 *
 * @function
 * @param {function} setInput - Fonction de mise à jour de la valeur d'entrée.
 * @param {string} newValue - Nouvelle valeur à définir.
 */
export const updateInput = (setInput, newValue) => {
  setInput(newValue)
}

/**
 * Gère un champ d'entrée vide.
 *
 * Cette fonction réinitialise la date sélectionnée et supprime toute erreur.
 *
 * @function
 * @param {string} name - Nom du champ d'entrée.
 * @param {function} onChange - Fonction de changement.
 * @param {function} setError - Fonction de définition de l'erreur.
 * @param {function} setSelectedDate - Fonction de mise à jour de la date sélectionnée.
 */
export const handleEmptyInput = (name, onChange, setError, setSelectedDate) => {
  setError(null)
  onChange({ target: { name, value: '' } })
  setSelectedDate(new Date())
}

/**
 * Gère une date valide.
 *
 * Cette fonction met à jour la date sélectionnée et déclenche un événement onChange avec la date formatée pour l'hôte.
 *
 * @function
 * @param {string} newValue - Nouvelle valeur de la date.
 * @param {string} name - Nom du champ d'entrée.
 * @param {function} onChange - Fonction de changement.
 * @param {function} setError - Fonction de définition de l'erreur.
 * @param {function} setSelectedDate - Fonction de mise à jour de la date sélectionnée.
 * @param {function} convertFormattedStringToDate - Fonction de conversion de la date formatée en objet Date.
 * @param {string} dateFormat - Format de la date.
 */
export const handleValidDate = (
  newValue,
  name,
  onChange,
  setError,
  setSelectedDate,
  convertFormattedStringToDate,
  dateFormat,
) => {
  setError(null)
  const dateObject = convertFormattedStringToDate(newValue, dateFormat)
  setSelectedDate(dateObject)

  // Formater la date pour l'hôte en format 'YYYY-MM-DD'
  const formattedForHost = `${dateObject.getFullYear()}-${String(
    dateObject.getMonth() + 1,
  ).padStart(2, '0')}-${String(dateObject.getDate()).padStart(2, '0')}`

  onChange({ target: { name, value: formattedForHost } }) // nous passons cette valeur à l'hôte
}

/**
 * Gère une date non valide.
 *
 * Cette fonction déclenche un événement onChange avec une valeur vide.
 *
 * @function
 * @param {string} name - Nom du champ d'entrée.
 * @param {function} onChange - Fonction de changement.
 */
export const handleInvalidDate = (name, onChange) => {
  onChange({ target: { name, value: '' } })
}

/**
 * Gère une entrée incomplète.
 *
 * Cette fonction met à jour la valeur d'entrée sans modifier l'état de l'erreur.
 *
 * @function
 * @param {string} newValue - Nouvelle valeur de l'entrée.
 * @param {string} name - Nom du champ d'entrée.
 * @param {function} onChange - Fonction de changement.
 * @param {function} setError - Fonction de définition de l'erreur.
 */
export const handleIncompleteInput = (newValue, name, onChange, setError) => {
  setError(null)
  onChange({ target: { name, value: newValue } })
}

/**
 * Bascule la visibilité du calendrier.
 *
 * @function
 * @param {function} toggleCalendar - Fonction pour basculer l'affichage du calendrier.
 * @returns {function} - Fonction d'événement pour basculer la visibilité du calendrier.
 */
export const toggleCalendarVisibility = (toggleCalendar) => (event) => {
  event.stopPropagation()
  toggleCalendar()
}

/**
 * Gère la sélection d'une date.
 *
 * Lorsqu'une date est sélectionnée, cette fonction met à jour la valeur d'entrée, la date sélectionnée et ferme le calendrier.
 *
 * @function
 * @param {function} setInput - Fonction de mise à jour de la valeur d'entrée.
 * @param {function} setSelectedDate - Fonction de mise à jour de la date sélectionnée.
 * @param {function} closeCalendar - Fonction pour fermer le calendrier.
 * @param {function} validate - Fonction de validation.
 * @param {function} formatDatePickerDate - Fonction pour formater la date.
 * @param {string} dateFormat - Format de la date.
 * @param {function} onChange - Fonction de changement.
 * @param {string} name - Nom du champ d'entrée.
 * @returns {function} - Fonction d'événement pour gérer la sélection d'une date.
 */
export const handleDateSelect =
  (
    setInput,
    setSelectedDate,
    closeCalendar,
    validate,
    formatDatePickerDate,
    dateFormat,
    onChange,
    name,
  ) =>
  (date) => {
    const actualDate = typeof date === 'string' ? new Date(date) : date

    setInput(actualDate)
    setSelectedDate(actualDate)
    closeCalendar()

    const formattedForDisplay = formatDatePickerDate(actualDate, dateFormat)
    validate(formattedForDisplay)

    // Maintenant, nous formaterons toujours la date pour l'hôte en format 'YYYY-MM-DD'
    const formattedForHost = `${actualDate.getFullYear()}-${String(
      actualDate.getMonth() + 1,
    ).padStart(2, '0')}-${String(actualDate.getDate()).padStart(2, '0')}`

    onChange({
      target: {
        name,
        value: formattedForHost, // nous passons cette valeur à l'hôte
      },
    })
  }

/**
 * Crée un gestionnaire pour la touche Échap.
 *
 * Lorsque la touche Échap est enfoncée, cette fonction ferme le calendrier et retire le focus de l'entrée.
 *
 * @function
 * @param {function} closeCalendar - Fonction pour fermer le calendrier.
 * @param {Object} inputRef - Référence à l'élément d'entrée.
 * @returns {function} - Fonction d'événement pour gérer la touche Échap.
 */
export const createEscapeHandler = (closeCalendar, inputRef) => {
  return () => {
    if (inputRef && inputRef.current) {
      inputRef.current.blur()
    }
    closeCalendar()
  }
}
