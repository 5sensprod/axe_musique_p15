import React, { useEffect, useRef, useState } from 'react'
import Quagga from 'quagga'

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState('')
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState([])
  const [error, setError] = useState('')
  const scannerRef = useRef(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://54.236.61.24:1337/api/categories')
        const data = await response.json()
        setCategories(data.data || [])
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error)
      }
    }

    fetchCategories()
  }, [])

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

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch('http://54.236.61.24:1337/api/produits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            type: 'produits',
            bar_code: barcode, // Suppose que la variable `barcode` contient le code-barres
            nom: name, // Utilisez ici la valeur de l'état correspondant au nom du produit
            categories: categoryId, // Utilisez ici la valeur de l'état `categoryId`
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Produit créé:', data)
    } catch (error) {
      console.error('Erreur lors de la création du produit', error)
    }
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
        <label>
          Nom:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Catégorie:
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.attributes.nom}
              </option>
            ))}
          </select>
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
