import { useEffect } from 'react'

/**
 * Hook personnalisé pour exécuter une fonction de rappel lorsque la touche "Escape" est pressée.
 *
 * Ce hook ajoute un écouteur d'événement au document qui déclenche une fonction de rappel
 * spécifiée chaque fois que la touche "Escape" est pressée. L'écouteur est nettoyé
 * lors du démontage du composant pour éviter des effets secondaires indésirables.
 *
 * @function
 * @param {Function} callback - La fonction de rappel à exécuter lorsque la touche "Escape" est pressée.
 */
function useEscapeKey(callback) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        callback()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [callback])
}

export default useEscapeKey
