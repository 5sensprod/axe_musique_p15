import React, { useRef, useState } from 'react'
import Quagga from 'quagga'

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState('')
  const [error, setError] = useState('')
  const scannerRef = useRef(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch('https://api.5sensprod.com/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code_barre: barcode,
          // Autres champs nécessaires pour créer un produit
        }),
      })

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`)

      const data = await response.json()
      console.log('Produit créé:', data)
    } catch (error) {
      console.error('Erreur lors de la création du produit', error)
    }
  }

  const startScanner = () => {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          constraints: {
            width: 640,
            height: 480,
            facingMode: 'environment',
          },
          target: scannerRef.current,
        },
        decoder: {
          readers: ['ean_reader'],
        },
      },
      (err) => {
        if (err) {
          console.error(err)
          setError('Erreur lors de l’initialisation du scanner')
          return
        }
        Quagga.start()
      },
    )

    Quagga.onDetected((data) => {
      setBarcode(data.codeResult.code)
      Quagga.stop()
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Code-Barres:
          <input
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
        </label>
        <button type="submit">Soumettre</button>
      </form>
      <div ref={scannerRef} />
      <button onClick={startScanner}>Démarrer le scanner</button>
      {error && <p>{error}</p>}
    </div>
  )
}

export default BarcodeScanner
