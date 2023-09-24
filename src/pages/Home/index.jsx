import React from 'react'
import styles from './Home.module.css'
import MessageLoader from '../../components/MessageLoader'
import BarcodeScanner from '../../components/BarcodeScanner'

/**
 * Composant représentant la page d'accueil de l'application RHnet.
 *
 * @function
 * @returns {JSX.Element} - L'élément JSX de la page d'accueil.
 */
const Home = () => (
  <main className={styles.homeContainer}>
    <h1>RHnet</h1>
    <MessageLoader />
    <BarcodeScanner />
  </main>
)

export default Home
