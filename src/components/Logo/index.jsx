import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo-health.jpg'
import styles from './Logo.module.css'

/**
 * Composant Logo pour Wealth Health. Lorsqu'il est cliqué, il redirige les utilisateurs
 * vers la page d'accueil. Le composant affiche le logo de Wealth Health
 * sous forme d'image et dispose d'un texte caché associé pour l'accessibilité.
 *
 * @component
 * @returns {React.ReactNode} Le logo Wealth Health rendu avec un lien vers la page d'accueil.
 */

const Logo = () => {
  return (
    <Link className={styles.mainNavLogo} to="/">
      <img
        className={styles.mainNavLogoImage}
        src={logo}
        alt="Logo Wealth Health"
      />
      <h1 className={styles.srOnly}>Wealth Health</h1>
    </Link>
  )
}

export default Logo
