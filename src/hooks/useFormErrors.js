import { useState } from 'react'

/**
 * Hook personnalisé pour gérer les erreurs de formulaire.
 *
 * @param {Object} initialErrors - Erreurs initiales du formulaire.
 * @param {Object} formattedFieldNames - Noms de champs formatés pour l'affichage (par ex. { firstName: 'Prénom' }).
 * @returns {Object} - Retourne un objet contenant des méthodes pour gérer les erreurs.
 */
const useFormErrors = (initialErrors = {}, formattedFieldNames = {}) => {
  const [errors, setErrors] = useState(initialErrors)

  /**
   * Valide un champ de formulaire donné.
   *
   * @param {string} name - Nom du champ à valider.
   * @param {any} value - Valeur du champ à valider.
   * @returns {string|null} - Retourne un message d'erreur si une erreur est trouvée, sinon retourne null.
   */
  const validateField = (name, value) => {
    if (!value) {
      return `${formattedFieldNames[name] || name} est requis`
    }
    // Ajout de validations supplémentaires si nécessaire
    return null
  }

  /**
   * Définit une erreur pour un champ spécifique.
   *
   * @param {string} field - Nom du champ.
   * @param {string} message - Message d'erreur.
   */
  const setError = (field, message) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: message,
    }))
  }

  /**
   * Efface l'erreur d'un champ spécifique.
   *
   * @param {string} field - Nom du champ.
   */
  const clearError = (field) => {
    if (errors[field]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  /**
   * Vérifie s'il y a des erreurs.
   *
   * @returns {boolean} - Retourne true s'il y a des erreurs, sinon retourne false.
   */
  const hasErrors = () => Object.keys(errors).length > 0

  return { errors, setError, clearError, hasErrors, validateField }
}

export default useFormErrors
