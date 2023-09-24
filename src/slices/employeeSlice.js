import { createSlice } from '@reduxjs/toolkit'
import employeeMock from '../data/employeeMock'

/**
 * État initial du slice employee, basé sur un mock d'employés.
 *
 * @constant
 * @type {Object}
 */
const initialState = {
  employees: employeeMock,
}

/**
 * Slice Redux pour gérer les actions et réductions des employés.
 *
 * @constant
 * @type {Object}
 */
const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    /**
     * Initialise la liste des employés.
     *
     * @param {Object} state - État actuel.
     * @param {Object} action - Action contenant la nouvelle liste des employés.
     */
    initEmployees: (state, action) => {
      state.employees = action.payload
    },
    /**
     * Ajoute un nouvel employé à la liste et sauvegarde la liste mise à jour dans le localStorage.
     *
     * @param {Object} state - État actuel.
     * @param {Object} action - Action contenant les informations du nouvel employé.
     */
    addEmployee: (state, action) => {
      state.employees.push(action.payload)
      localStorage.setItem('employees', JSON.stringify(state.employees))
    },
    /**
     * Charge la liste des employés à partir du localStorage.
     * Si aucune liste n'est trouvée dans le localStorage, utilise le mock initial.
     *
     * @param {Object} state - État actuel.
     */
    loadFromLocalStorage: (state) => {
      const savedEmployees = JSON.parse(localStorage.getItem('employees'))
      state.employees =
        savedEmployees && savedEmployees.length > 0
          ? savedEmployees
          : employeeMock
    },
  },
})

/**
 * Exporte les actions générées par le slice.
 *
 * @constant
 * @type {Object}
 */
export const { initEmployees, addEmployee, loadFromLocalStorage } =
  employeeSlice.actions

/**
 * Exporte le réducteur généré par le slice.
 *
 * @constant
 * @type {Function}
 */
export default employeeSlice.reducer
