import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navigation.module.css'

/**
 * Composant Navigation.
 *
 * Ce composant affiche une barre de navigation permettant aux utilisateurs de
 * naviguer vers différentes sections de l'application. Il fournit des liens pour
 * créer un nouvel employé et pour afficher la liste des employés existants.
 *
 * @returns {JSX.Element} La barre de navigation rendue.
 */
const Navigation = () => {
  return (
    <div>
      {/* Lien pour ajouter un nouvel employé */}
      <Link className={styles.mainNavItem} to="/add-employee">
        <i className="fa fa-pencil"></i>
        <span className={styles.mainNavItemText}>Create</span>
      </Link>

      {/* Lien pour afficher la liste des employés */}
      <Link className={styles.mainNavItem} to="/employees-list">
        <i className="fa fa-search"></i>
        <span className={styles.mainNavItemText}>View</span>
      </Link>
    </div>
  )
}

export default Navigation
