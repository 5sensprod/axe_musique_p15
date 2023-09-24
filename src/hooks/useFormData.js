import { useState } from 'react'

/**
 * Hook personnalisé pour gérer les données de formulaire.
 *
 * @param {Object} initialState - État initial des données du formulaire.
 * @returns {Array} - Retourne un tableau contenant les données, la fonction de gestion des changements et la fonction de réinitialisation.
 */
const useFormData = (initialState) => {
  const [data, setData] = useState(initialState)

  /**
   * Gère les changements dans les champs de formulaire.
   *
   * @param {Event} event - Événement déclenché lors d'un changement dans un champ de formulaire.
   */
  const handleChange = (event) => {
    const { name, value } = event.target
    setData((prevData) => ({ ...prevData, [name]: value }))
  }

  /**
   * Réinitialise les données du formulaire à leur état initial.
   */
  const resetFormData = () => {
    setData(initialState)
  }

  return [data, handleChange, resetFormData]
}

export default useFormData
