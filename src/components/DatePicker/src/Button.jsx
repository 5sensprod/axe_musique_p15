import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import styles from './Button.module.css'

/**
 * Un composant bouton personnalisé qui prend en charge un icône et du contenu pour enfants.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {Function} [props.onClick] - La fonction à appeler lors du clic sur le bouton.
 * @param {ReactNode} props.children - Le contenu du bouton.
 * @param {ReactComponent} [props.icon] - Le composant icône à afficher dans le bouton.
 * @param {string} [props.className] - Les classes CSS supplémentaires à ajouter au bouton.
 * @param {Ref} ref - La référence vers l'élément du bouton.
 * @returns {ReactElement} - Le composant bouton.
 */
const Button = forwardRef(
  ({ onClick, children, icon: Icon, className, ...props }, ref) => {
    const handleClick = (e) => {
      e.preventDefault()
      if (onClick) {
        onClick(e)
      }
    }

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={`${styles.button} ${className ? className : ''}`}
        {...props}
      >
        {Icon && <Icon />}
        {children}
      </button>
    )
  },
)

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  icon: PropTypes.elementType,
  className: PropTypes.string,
}

export default Button
