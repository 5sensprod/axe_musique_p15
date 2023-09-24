import React from 'react'
import PropTypes from 'prop-types'
import styles from './EmployeeForm.module.css'
// import DatePicker from '@5sensprod/react-custom-datepicker'
import DatePicker from '../DatePicker/src'

/**
 * Composant représentant un champ d'entrée de date.
 * Il utilise un composant DatePicker pour permettre à l'utilisateur de sélectionner une date
 * et affiche également une erreur si la date est invalide ou manquante.
 *
 * @component
 * @param {string} name - Le nom du champ.
 * @param {string} value - La valeur actuelle du champ.
 * @param {string} label - Le label à afficher au-dessus du champ.
 * @param {Function} onChange - La fonction à appeler lors de la modification de la valeur du champ.
 * @param {string} className - Classes CSS supplémentaires à ajouter au composant.
 * @param {string} error - Message d'erreur à afficher si le champ est invalide.
 * @returns {React.ReactNode} Le champ d'entrée de date rendu.
 */
const DateInputField = ({ name, value, label, onChange, className, error }) => {
  return (
    <div className={`${styles.label} ${className}`}>
      <label htmlFor={`${name}DateInput`}>{label}</label>
      <DatePicker
        // placeholderText=""
        showButton={true}
        id={`${name}DateInput`}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        designType={'default'}
        yearBlockSize={16}
        useIcons={true}
        startOfWeek={0}
        language="fr"
        // dateFormat="ISO"
        manualInputEnabled={true}
        // minYear={'auto-10'}
        maxYear={2030}
        customStyles={{
          backgroundColor: 'transparent',
          borderRadius: '0',
        }}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

DateInputField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  error: PropTypes.string,
}

export default DateInputField
