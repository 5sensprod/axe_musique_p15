import React from 'react'
import PropTypes from 'prop-types'
import styles from './EmployeeForm.module.css'

/**
 * Composant qui représente un champ d'entrée pour le formulaire d'employé.
 *
 * @component
 * @param {string} name - Le nom du champ d'entrée.
 * @param {any} value - La valeur actuelle du champ.
 * @param {string} label - Le label à afficher au-dessus du champ.
 * @param {string} [type='text'] - Le type du champ d'entrée (par exemple : 'text', 'date', 'number', etc.).
 * @param {Function} onChange - Fonction à appeler lors d'un changement de valeur.
 * @param {string} [error] - Message d'erreur éventuel à afficher.
 * @returns {React.ReactNode} - Le champ d'entrée rendu avec éventuellement un message d'erreur.
 */
const InputField = ({ name, value, label, type = 'text', onChange, error }) => (
  <div className={styles.label}>
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
    {error && <span className={styles.errorMessage}>{error}</span>}
  </div>
)

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
}

export default InputField
