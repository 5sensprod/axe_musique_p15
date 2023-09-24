import React from 'react'
import styles from './NotFound.module.css'
import { Link } from 'react-router-dom'

/**
 * Composant représentant une page d'erreur 404.
 *
 * @function
 * @returns {JSX.Element} - L'élément JSX représentant une page d'erreur 404.
 */
const NotFound = () => (
  <main className={`${styles.main} ${styles.bgDark}`}>
    <div className={styles.container}>
      {/* Titre de la page */}
      <h1 className={styles.title}>404 - Page non trouvée</h1>
      {/* Message informatif */}
      <p className={styles.message}>
        Oups! La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <br />
      {/* Lien pour revenir à la page d'accueil */}
      <Link to="/" className={styles.homeLink}>
        Retourner à l'accueil
      </Link>
    </div>
  </main>
)

export default NotFound
