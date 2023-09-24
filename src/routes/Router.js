import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Employees from '../pages/ListEmployees'
import NotFound from '../pages/NotFound'
import AddEmployee from '../pages/AddEmployee'

/**
 * Composant principal pour la gestion des routes de l'application.
 *
 * @function
 * @returns {JSX.Element} - L'élément JSX représentant les différentes routes de l'application.
 */
const AppRouter = () => {
  return (
    <Routes>
      {/* Route pour la page d'accueil */}
      <Route path="/" element={<Home />} />
      {/* Route pour la page de la liste des employés */}
      <Route path="/employees-list" element={<Employees />} />
      {/* Route pour la page d'ajout d'un nouvel employé */}
      <Route path="/add-employee" element={<AddEmployee />} />
      {/* Route par défaut pour gérer les erreurs 404 - Page non trouvée */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter
