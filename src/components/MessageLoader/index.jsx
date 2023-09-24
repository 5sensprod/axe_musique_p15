import React, { useState, useEffect } from 'react'

function MessageLoader() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('https://api.5sensprod.com/api/messages', {
      headers: {
        Authorization:
          '7d9c066d8ef3381649cc303b520e771866d247c6c8d4bd7273b67f8353f309c70d2896360b6be99d2ee1ae7062eed7bb77f78c94de056528d149c845dae8588fd2a75f2c76ff6921f3bf94b19287a9d72dbbd7cd9dd46262d62dd057fa82e26ac7615c03390a4ae1f2b7152387d9da482d746163d20730c5fc73fe75e3a14b53',
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(
              `Network response was not ok. Server Response: ${text}`,
            )
          })
        }
        return response.json()
      })
      .then((data) => {
        const content = data?.data?.[0]?.attributes?.Content
        if (content) {
          setMessage(content)
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error)
      })
  }, [])

  return <div className="MessageLoader">{message}</div>
}

export default MessageLoader
