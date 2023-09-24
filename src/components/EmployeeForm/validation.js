/**
 * Valide les données du formulaire d'employé en vérifiant si chaque champ est rempli.
 * Si un champ n'est pas rempli, une erreur est générée pour ce champ.
 *
 * @function
 * @param {Object} formData - Les données du formulaire à valider.
 * @param {Object} formattedFieldNames - Les noms de champs formatés pour l'affichage (par ex. { firstName: 'Prénom' }).
 * @returns {Object} Un objet contenant les erreurs pour chaque champ non rempli.
 */
export const validateEmployeeForm = (formData, formattedFieldNames) => {
  let fieldErrors = {}

  for (let field in formData) {
    if (!formData[field]) {
      let formattedField = formattedFieldNames[field] || field
      fieldErrors[field] = `${formattedField} is required`
    }
  }

  return fieldErrors
}
