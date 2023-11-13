import React from 'react'
import styles from './Home.module.css'
import MessageLoader from '../../components/MessageLoader'
import BarcodeScanner from '../../components/BarcodeScanner'
import QrCodeScanner from '../../components/qrcode/QrCodeScanner'

/**
 * Composant représentant la page d'accueil de l'application RHnet.
 *
 * @function
 * @returns {JSX.Element} - L'élément JSX de la page d'accueil.
 */
const Home = () => {
  // Vous pouvez ajouter une fonction ici si vous voulez gérer les données décodées par QrCodeScanner.
  const handleDecodedData = (decodedData) => {
    console.log('QR Code decoded:', decodedData)
    // Ajoutez toute logique de gestion de données décodées ici.
  }

  return (
    <main className={styles.homeContainer}>
      <h1>RHnet</h1>
      <MessageLoader />
      <BarcodeScanner />
      {/* 
        Si vous voulez gérer les données décodées dans ce composant, vous devez passer la fonction
        handleDecodedData comme une prop à QrCodeScanner. Si QrCodeScanner n'a pas été modifié pour
        prendre une prop de callback, cela n'est pas nécessaire et vous pouvez laisser le
        <QrCodeScanner /> tel quel.
      */}
      <QrCodeScanner onDecodedData={handleDecodedData} />
    </main>
  )
}

export default Home
