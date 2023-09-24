import { configureStore } from '@reduxjs/toolkit'
import employeeReducer from '../slices/employeeSlice'

/**
 * Tente de récupérer la liste des employés stockés dans le localStorage.
 *
 * @constant
 * @type {string|null}
 */
const savedEmployees = localStorage.getItem('employees')

/**
 * Si des employés sont trouvés dans le localStorage, ils sont parsés.
 * Sinon, utilise un tableau vide comme valeur initiale.
 *
 * @constant
 * @type {Array}
 */
const initialEmployees = savedEmployees ? JSON.parse(savedEmployees) : []

/**
 * État initial du store, basé sur les données récupérées du localStorage ou
 * un tableau vide si aucune donnée n'est trouvée.
 *
 * @constant
 * @type {Object}
 */
const preloadedState = {
  employee: {
    employees: initialEmployees,
  },
}

/**
 * Configuration et création du store Redux.
 *
 * @constant
 * @type {Object}
 */
const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
  preloadedState,
})

export default store
