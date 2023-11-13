import React, { useRef, useEffect } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'

const QrCodeScanner = ({ onDecodedData }) => {
  const qrRef = useRef(null) // Vous utilisez useRef pour créer une référence à l'élément du DOM.

  useEffect(() => {
    // Assurez-vous que l'élément du DOM est monté avant de tenter d'initialiser le scanner.
    if (qrRef.current) {
      const html5QrCode = new Html5QrcodeScanner(
        'qr-reader', // Utilisez un ID de chaîne ici.
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false,
      )
      const onScanSuccess = (decodedText, decodedResult) => {
        // Appel de la fonction callback avec les données décodées.
        onDecodedData(decodedText, decodedResult)
      }
      const onScanFailure = (error) => {
        console.warn(`Code scan error = ${error}`)
      }

      // Démarrer le scanner.
      html5QrCode.render(onScanSuccess, onScanFailure)

      // Nettoyage en cas de démontage du composant.
      return () => {
        html5QrCode.clear().catch((err) => console.log('Dispose error', err))
      }
    }
  }, [onDecodedData])

  // Assignez l'ID à l'élément div pour le faire correspondre avec l'ID attendu par Html5QrcodeScanner.
  return <div id="qr-reader" ref={qrRef} />
}

export default QrCodeScanner
