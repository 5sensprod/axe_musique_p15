# React Custom DatePicker

Un composant DatePicker personnalisé pour React.

## Installation

npm i @5sensprod/react-custom-datepicker

## Utilisation

Le composant DatePicker de @5sensprod/react-custom-datepicker est conçu pour être intuitif et facile à utiliser. Cependant, quelques configurations initiales sont essentielles pour garantir son bon fonctionnement.

Dans l'exemple ci-dessous, nous montrons comment intégrer le composant DatePicker dans une application React. Nous soulignons l'importance d'initialiser un état pour la date sélectionnée, qui est cruciale pour le bon fonctionnement du composant dès son premier rendu.

La fonction handleDateChange est un exemple basique de gestionnaire d'événements. Vous pouvez la modifier ou la compléter pour s'adapter à la logique de votre formulaire ou de votre application :

```javascript
import React, { useState } from 'react'
import './App.css'
import DatePicker from '@5sensprod/react-custom-datepicker'

function App() {
  // *** Initialisation cruciale Définissez un état pour la date sélectionnée.
  // Il est essentiel d'initialiser l'état avec une valeur (ici, la date du jour) pour que le DatePicker fonctionne correctement dès le départ.

  const [selectedDate, setSelectedDate] = useState(new Date())

  // Cette fonction sera appelée chaque fois que l'utilisateur sélectionne une nouvelle date
  const handleDateChange = (event) => {
    const dateValue = event.target.value
    console.log('Valeur du DatePicker:', dateValue)
    setSelectedDate(dateValue)
  }

  return (
    <div className="App">
      <h1>Test du DatePicker</h1>
      <DatePicker
        name={'name'} // nom de l'input, utile pour la gestion des formulaires
        value={selectedDate} // la date actuellement sélectionnée
        onChange={handleDateChange} // fonction appelée lors de la sélection d'une nouvelle date
      />
    </div>
  )
}

export default App
```

Notes importantes:

Les props name, value et onChange sont essentiels pour récupérer les données.

Si vous souhaitez lier le DatePicker à un <label>, assurez-vous de fournir un attribut id unique au DatePicker et utilisez ce même ID dans l'attribut for du <label>. Ceci améliore l'accessibilité et l'expérience utilisateur :

```javascript
function App() {
  // Note: Assurez-vous d'initialiser vos states `name`, `value` et `onChange` au niveau parent (exemple précédent).

  return (
    <div>
      // Utilisez un label pour améliorer l'accessibilité
      <label htmlFor={`${name}DateInput`}>{label}</label>
      // Instanciez votre DatePicker en lui passant les props essentiels
      <DatePicker
        // L'ID est utilisé pour lier le composant DatePicker à son <label> associé.
        // Cela fournit une meilleure expérience utilisateur et améliore l'accessibilité.
        id={`${name}DateInput`}
        // Le `name` est utilisé pour identifier le champ lors de l'envoi du formulaire.
        name={name}
        // La `value` représente la date actuellement sélectionnée.
        value={value}
        // La fonction `onChange` est appelée chaque fois que l'utilisateur change la date.
        onChange={onChange}
      />
    </div>
  )
}
export default App
```

## Le format de date renvoyé

Le composant DatePicker est conçu pour afficher des dates dans différents formats. Cependant, indépendamment du format d'affichage choisi, la date renvoyée au composant hôte est toujours au format YYYY-MM-DD.

Voici un exemple simplifié d'utilisation du DatePicker dans un composant DateInputField :

```javascript
const DateInputField = ({ name, value, label, onChange, error }) => {
  const handleDateChange = (event) => {
    console.log('Value received in DateInputField:', event.target.value) // Toujours au format YYYY-MM-DD
    onChange(event)
  }

  return (
    <div>
      <label htmlFor={`${name}DateInput`}>{label}</label>
      <DatePicker
        id={`${name}DateInput`}
        name={name}
        value={value}
        onChange={handleDateChange}
        dateFormat="US"
      />
      {error && <span>{error}</span>}
    </div>
  )
}

export default DateInputField
```

Notez que même si le dateFormat est défini sur "US" (MM-DD-YYYY), la valeur renvoyée (accessible via event.target.value dans handleDateChange) est toujours au format YYYY-MM-DD.

## Configurations

Vous pouvez personnaliser le comportement et l'apparence du DatePicker.

### Usage :

```javascript
<DatePicker
  name={name}
  value={value}
  onChange={onChange}
  designType={'neuro'}
  yearBlockSize={32}
  useIcons={true}
  startOfWeek={1}
  language="fr"
  dateFormat="ISO"
  manualInputEnabled={true}
  minYear={'auto-10'}
  maxYear={2030}
/>
```

### Liste des options :

Vous pouvez personnaliser le comportement et l'apparence du DatePicker avec les props suivantes :

- **showButton** (type: Boolean, default: true):

  - Si true, le bouton du calendrier sera affiché.
  - Si false, le bouton sera caché.

- **placeholderText** (type: String, default: null):

  - Si une chaîne de caractères est fournie, celle-ci sera utilisée comme texte de placeholder pour l'entrée de la date.
  - Si la valeur est null ou non fournie, la valeur par défaut de translations.placeholder sera utilisée.
  - Pour avoir un placeholder vide, fournissez une chaîne vide ("").

- **useIcons** (type: Boolean, default: `true`):

  - Si `true`, des icônes (chevrons) seront utilisées pour la navigation du calendrier.
  - Si `false`, du texte sera utilisé à la place.

- **dateFormat** (type: String, default: `'DEFAULT'`):

  - Le format de la date affichée. Les options disponibles sont `'DEFAULT'`, `'US'`, et `'ISO'`, qui correspondent respectivement à `'DD-MM-YYYY'`, `'MM-DD-YYYY'` et `'YYYY-MM-DD'`.

- **customStyles** (type: Object, default: `{}`):

  - Un objet pour surcharger les styles par défaut.

- **startOfWeek** (type: Number, default: `0`):

  - Définit le premier jour de la semaine. `0` pour Dimanche, `1` pour Lundi, etc.

- **manualInputEnabled** (type: Boolean, default: `true`):

  - Si `true`, permet à l'utilisateur d'entrer manuellement une date.
  - Sinon, l'utilisateur doit sélectionner une date à partir du calendrier.

- **minYear** et **maxYear** (type: Number ou String, default: `1930` et `2025` respectivement):

  - Définit l'année minimum et maximum disponibles pour la sélection.
  - Vous pouvez également utiliser des valeurs comme `'auto-10'` pour `minYear`, qui serait l'année actuelle moins 10 ans.

- **language** (type: String, default: `'en'`):

  - Définit la langue du calendrier. Les options disponibles sont `'en'` pour l'anglais et `'fr'` pour le français.

- **yearBlockSize** (type: Number, default: `16`):

  - Nombre d'années à afficher dans le sélecteur d'année.

- **designType** (type: String, default: `'default'`):
  - Change le design du DatePicker. Les valeurs possibles sont :
    - `'default'`: Design standard.
    - `'neuro'`: Design effet neurmorphism.
    - `'glass'`: Design effet glassmorphism.

## Exemple en direct

Pour voir un exemple en direct de l'utilisation du composant react-custom-datepicker, cliquez sur le badge ci-dessous :

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/priceless-rubin-554zjg)

## Contribution

Les contributions sont les bienvenues. Veuillez ouvrir une issue ou soumettre une pull request sur GitHub.

## Licence

MIT

```

```
