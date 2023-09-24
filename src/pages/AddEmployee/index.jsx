import React from 'react'
import styles from './AddEmployee.module.css'
import EmployeeForm from '../../components/EmployeeForm'

/**
 * Composant représentant la page d'ajout d'un employé.
 *
 * Ce composant affiche le formulaire permettant d'ajouter un nouvel employé.
 *
 * @function
 * @returns {JSX.Element} - L'élément JSX de la page d'ajout d'employé.
 */
const AddEmployee = () => (
  <main className={styles.homeContainer}>
    <EmployeeForm />
  </main>
)

export default AddEmployee
