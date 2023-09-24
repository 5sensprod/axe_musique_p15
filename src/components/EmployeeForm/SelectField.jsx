/**
 * Composant qui représente un champ de sélection (dropdown) pour le formulaire d'employé.
 * Il utilise `react-select` pour créer la liste déroulante.
 *
 * @component
 * @param {string} name - Le nom du champ de sélection.
 * @param {any} value - La valeur actuellement sélectionnée.
 * @param {string} label - Le label à afficher au-dessus du champ de sélection.
 * @param {Array} options - Les options disponibles pour la sélection.
 * @param {Function} onChange - Fonction à appeler lors d'un changement de valeur.
 * @param {string} [error] - Message d'erreur éventuel à afficher.
 * @returns {React.ReactNode} - Le champ de sélection rendu avec les options et éventuellement un message d'erreur.
 */
import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import styles from './EmployeeForm.module.css'

const SelectField = ({ name, value, label, options, onChange, error }) => {
  const customStyles = {
    // Le style ici
  }

  return (
    <div className={styles.label}>
      <label>{label}</label>
      <Select
        aria-label={label}
        name={name}
        value={options.find((option) => option.value === value)}
        onChange={(selectedOption) => {
          onChange({
            target: {
              name: name,
              value: selectedOption ? selectedOption.value : '',
            },
          })
        }}
        options={options}
        styles={customStyles}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
}

export default SelectField
