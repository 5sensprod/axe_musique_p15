import React from 'react'
import styles from './Footer.module.css'

/**
 * Composant représentant le pied de page de l'application.
 * Il affiche un avis de droit d'auteur pour Wealth Health.
 *
 * @component
 * @returns {React.ReactNode} Le pied de page rendu avec l'avis de droit d'auteur.
 */

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>Copyright {currentYear} Wealth Health</p>
    </footer>
  )
}

export default Footer
