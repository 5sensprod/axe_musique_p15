import React, { forwardRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatToMask } from './utils/dateFunctions'

/**
 * Un composant d'entrée masquée pour les dates.
 *
 * @param {Object} props - Propriétés du composant.
 * @param {string} props.value - La valeur actuelle du champ d'entrée.
 * @param {Function} props.onChange - Fonction appelée lors de la modification de la valeur.
 * @param {string} [props.format='DEFAULT'] - Le format de la date à utiliser.
 * @param {Object} ref - Référence pour accéder au nœud DOM du champ d'entrée.
 */
const MaskedInput = forwardRef(
  ({ value, onChange, format = 'DEFAULT', ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState(
      formatToMask(value, format),
    )

    useEffect(() => {
      setDisplayValue(formatToMask(value, format))
    }, [value, format])

    const handleChange = (e) => {
      let newValue = e.target.value

      if (newValue === '') {
        setDisplayValue('')
        onChange && onChange({ target: { value: '' } })
        return
      }

      try {
        newValue = formatToMask(newValue, format)

        setDisplayValue(newValue)

        onChange && onChange({ target: { value: newValue } })
      } catch (error) {}
    }

    return (
      <input
        ref={ref}
        value={displayValue}
        onChange={handleChange}
        {...props}
      />
    )
  },
)

MaskedInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  format: PropTypes.string,
}

export default MaskedInput
