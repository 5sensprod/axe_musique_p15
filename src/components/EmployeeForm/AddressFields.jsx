import React from 'react'
import PropTypes from 'prop-types'
import InputField from './InputField'
import SelectField from './SelectField'
import { states } from '../../data/states'
import styles from './EmployeeForm.module.css'

/**
 * Composant représentant un ensemble de champs pour saisir une adresse.
 * Il contient des champs pour la rue, la ville, l'état et le code postal.
 *
 * @component
 * @param {Object} formData - Les données du formulaire contenant les informations de l'adresse.
 * @param {Function} handleChange - La fonction à appeler lors de la modification de la valeur d'un champ.
 * @param {Object} errors - Les erreurs associées à chaque champ.
 * @returns {React.ReactNode} Les champs d'adresse rendus.
 */
const AddressFields = ({ formData, handleChange, errors }) => {
  return (
    <fieldset className={styles.fieldsetContainer}>
      <legend>Address</legend>

      <InputField
        name="street"
        label="Street"
        type="text"
        value={formData.street}
        onChange={handleChange}
        error={errors.street}
      />

      <InputField
        name="city"
        label="City"
        type="text"
        value={formData.city}
        onChange={handleChange}
        error={errors.city}
      />

      <SelectField
        name="state"
        label="State"
        value={formData.state}
        onChange={handleChange}
        options={[
          { value: '', label: 'Please select a state' }, // Option de placeholder
          ...states.map((state) => ({
            value: state.abbreviation,
            label: state.name,
          })),
        ]}
      />

      <InputField
        name="zipCode"
        label="Zip Code"
        type="number"
        value={formData.zipCode}
        onChange={handleChange}
        error={errors.zipCode}
      />
    </fieldset>
  )
}

AddressFields.propTypes = {
  formData: PropTypes.shape({
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
  }),
}

export default AddressFields
