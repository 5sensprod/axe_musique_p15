import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import styles from './Layout.module.css'

/**
 * Composant Layout servant de structure principale pour les pages de l'application.
 * Il englobe et affiche systématiquement un en-tête (Header) et un pied de page (Footer),
 * tout en permettant l'insertion de contenu spécifique via la prop `children`.
 *
 * @component
 * @param {React.ReactNode} children - Éléments ou composants enfants à afficher entre l'en-tête et le pied de page.
 * @returns {React.ReactNode} Une structure de mise en page avec en-tête, contenu spécifique et pied de page.
 */

const Layout = ({ children }) => (
  <div className={styles.layoutContainer}>
    <Header />
    {children}
    <Footer />
  </div>
)

export default Layout
