import React from 'react'
import Logo from '../Logo'
import Navigation from '../Navigation'
import styles from './Header.module.css'

/**
 * Composant représentant l'en-tête principal de l'application.
 * Il intègre le logo de l'application ainsi que la navigation principale.
 *
 * @component
 * @returns {React.ReactNode} L'en-tête rendu contenant le logo et la navigation principale.
 */

const Header = () => {
  return (
    <nav className={styles.mainNav}>
      <Logo />
      <Navigation />
    </nav>
  )
}

export default Header
