import React from 'react'
import EmployeeTable from '../../components/EmployeeTable'
import styles from './Employees.module.css'
import employeeMock from '../../data/employeeMock'

/**
 * Composant représentant la page des employés actuels.
 *
 * @function
 * @returns {JSX.Element} - L'élément JSX représentant la liste des employés.
 */
const Employees = () => (
  <main className={`${styles.main} ${styles.bgDark}`}>
    {/* Titre de la page */}
    <h1 className={styles.title}>Employés actuels</h1>
    {/* Tableau des employés. Les données proviennent d'un mock. */}
    <EmployeeTable data={employeeMock} />
  </main>
)

export default Employees
