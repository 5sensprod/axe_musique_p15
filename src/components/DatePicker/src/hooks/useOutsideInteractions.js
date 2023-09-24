import { useEffect } from 'react'

/**
 * Hook personnalisé pour gérer les interactions en dehors d'un élément référencé.
 *
 * Ce hook ajoute des écouteurs d'événements pour détecter lorsque des interactions
 * se produisent en dehors de l'élément référencé (comme un clic ou une perte de focus).
 * Lorsqu'une telle interaction est détectée, une fonction de rappel spécifiée est exécutée.
 * Ce hook est souvent utilisé pour fermer les modales, les popups ou les menus déroulants
 * lorsque l'utilisateur clique ou met le focus en dehors de ces éléments.
 *
 * @function
 * @param {React.RefObject} ref - La référence à l'élément principal que nous voulons surveiller.
 * @param {React.RefObject} buttonRef - La référence à un élément bouton qui pourrait être associé à l'élément principal (par exemple, un bouton qui déclenche une modale).
 * @param {Function} callback - La fonction de rappel à exécuter lorsque des interactions en dehors de l'élément référencé sont détectées.
 */
function useOutsideInteractions(ref, buttonRef, callback) {
  useEffect(() => {
    let timeoutId
    let isClicking = false

    const handleMouseUpOutside = (event) => {
      if (
        ref.current &&
        event.target !== ref.current &&
        !ref.current.contains(event.target) &&
        (!buttonRef ||
          (buttonRef.current && !buttonRef.current.contains(event.target)))
      ) {
        callback()
      }
    }

    const handleFocusOut = () => {
      timeoutId = setTimeout(() => {
        if (
          !isClicking &&
          ref.current &&
          !ref.current.contains(document.activeElement)
        ) {
          callback()
        }
      }, 0)
    }

    const handleFocusIn = () => {
      clearTimeout(timeoutId)
    }

    const handleClick = (event) => {
      if (event.type === 'mousedown') {
        isClicking = true
      } else if (event.type === 'mouseup') {
        isClicking = false
      }
    }

    document.addEventListener('mouseup', handleMouseUpOutside)
    const currentRef = ref.current
    if (currentRef) {
      currentRef.addEventListener('focusout', handleFocusOut)
      currentRef.addEventListener('focusin', handleFocusIn)
      currentRef.addEventListener('mousedown', handleClick)
      currentRef.addEventListener('mouseup', handleClick)
    }

    return () => {
      document.removeEventListener('mouseup', handleMouseUpOutside)
      if (currentRef) {
        currentRef.removeEventListener('focusout', handleFocusOut)
        currentRef.removeEventListener('focusin', handleFocusIn)
        currentRef.removeEventListener('mousedown', handleClick)
        currentRef.removeEventListener('mouseup', handleClick)
      }
    }
  }, [ref, buttonRef, callback])
}

export default useOutsideInteractions
