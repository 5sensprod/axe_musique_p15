/**
 * Objet qui associe les noms des champs à leur nom affiché formaté.
 * Ceci est utile pour présenter les champs de manière conviviale
 * (par exemple, dans des tableaux, des formulaires ou d'autres éléments de l'interface utilisateur).
 *
 * @typedef {Object} NomsDeChampsFormates
 * @property {string} firstName - Nom affiché pour le champ du prénom.
 * @property {string} lastName - Nom affiché pour le champ du nom de famille.
 * @property {string} dateOfBirth - Nom affiché pour le champ de la date de naissance.
 * @property {string} startDate - Nom affiché pour le champ de la date de début.
 * @property {string} street - Nom affiché pour le champ de la rue.
 * @property {string} city - Nom affiché pour le champ de la ville.
 * @property {string} state - Nom affiché pour le champ de l'état ou de la région.
 * @property {string} zipCode - Nom affiché pour le champ du code postal.
 * @property {string} department - Nom affiché pour le champ du département.
 */

export const formattedFieldNames = {
  firstName: 'First Name',
  lastName: 'Last Name',
  dateOfBirth: 'Date of Birth',
  startDate: 'Start Date',
  street: 'Street',
  city: 'City',
  state: 'State',
  zipCode: 'Zip Code',
  department: 'Department',
}
