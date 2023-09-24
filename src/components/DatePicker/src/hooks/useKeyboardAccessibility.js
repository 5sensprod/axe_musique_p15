import { useRef, useEffect } from 'react'

/**
 * Hook personnalisé pour faciliter l'accessibilité au clavier.
 *
 * Ce hook ajoute des écouteurs d'événements pour les touches "Enter" et "Space"
 * à un élément référencé. Lorsque l'une de ces touches est pressée,
 * une fonction de rappel spécifiée est exécutée. Cela facilite l'interaction
 * avec des éléments tels que les boutons ou d'autres éléments interactifs pour les
 * utilisateurs qui naviguent principalement au clavier.
 *
 * @function
 * @param {Function} onAction - La fonction de rappel à exécuter lorsque les touches "Enter" ou "Space" sont pressées.
 * @returns {React.RefObject} - Une référence à l'élément sur lequel les écouteurs d'événements ont été ajoutés.
 */
function useKeyboardAccessibility(onAction) {
  const ref = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        onAction()
      }
    }

    const handleKeyUp = (e) => {
      if (e.key === 'Space') {
        onAction()
      }
    }

    const currentRef = ref.current
    if (currentRef) {
      currentRef.addEventListener('keydown', handleKeyDown)
      currentRef.addEventListener('keyup', handleKeyUp)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('keydown', handleKeyDown)
        currentRef.removeEventListener('keyup', handleKeyUp)
      }
    }
  }, [onAction])

  return ref
}

export default useKeyboardAccessibility
