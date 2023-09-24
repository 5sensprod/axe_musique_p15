import React, { useState } from 'react'
import { departments } from '../../data/departments'
import styles from './EmployeeForm.module.css'
import InputField from './InputField'
import SelectField from './SelectField'
import DateInputField from './DateInputField'
import AddressFields from './AddressFields'
import { validateEmployeeForm } from './validation'
import { formattedFieldNames } from '../../utils/formatFieldNames'
import { initialEmployeeState } from '../../config/initialState'
import useFormErrors from '../../hooks/useFormErrors'
import useFormData from '../../hooks/useFormData'
import { useDispatch } from 'react-redux'
import { addEmployee } from '../../slices/employeeSlice'
import ModalComponent from '../Modal'

/**
 * Composant représentant le formulaire pour créer un nouvel employé.
 * Il comprend des champs d'entrée pour les détails de l'employé, une validation de formulaire
 * et une modal pour confirmer la création de l'employé.
 *
 * @component
 * @returns {React.ReactNode} Le formulaire de création d'employé rendu.
 */
const EmployeeForm = () => {
  const dispatch = useDispatch()

  const [formData, originalHandleChange, resetFormData] =
    useFormData(initialEmployeeState)

  const { errors, setError, clearError } = useFormErrors(
    {},
    formattedFieldNames,
  )

  const handleChange = (event) => {
    originalHandleChange(event)

    const { name } = event.target
    clearError(name)
  }

  const [isModalOpen, setModalOpen] = useState(false)

  const closeModal = () => {
    setModalOpen(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const fieldErrors = validateEmployeeForm(formData, formattedFieldNames)

    // mise à jour de l'état des erreurs
    for (const field in fieldErrors) {
      setError(field, fieldErrors[field])
    }

    // vérifier si l'objet des erreurs est vide
    if (Object.keys(fieldErrors).length === 0) {
      // Conversion de la date en format voulu
      const formattedDateOfBirth = formData.dateOfBirth
      const formattedStartDate = formData.startDate

      const processedData = {
        ...formData,
        dateOfBirth: formattedDateOfBirth,
        startDate: formattedStartDate,
      }

      dispatch(addEmployee(processedData))
      console.log('Employé sauvegardé avec succès!')

      resetFormData()
      setModalOpen(true)
    }
  }

  const handleFormKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Employee</h1>
      <form
        className={styles.formContainer}
        onSubmit={handleSubmit}
        onKeyDown={handleFormKeyDown}
      >
        <InputField
          name="firstName"
          label="First Name"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />

        <InputField
          name="lastName"
          label="Last Name"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />

        <DateInputField
          className={styles.dateInputField}
          name="dateOfBirth"
          label="Date of Birth"
          type="text"
          value={formData.dateOfBirth}
          onChange={handleChange}
          error={errors.dateOfBirth}
        />

        <DateInputField
          className={styles.dateInputField}
          name="startDate"
          label="Start Date"
          type="text"
          value={formData.startDate}
          onChange={handleChange}
          error={errors.startDate}
        />

        <AddressFields
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />

        <SelectField
          name="department"
          label="Department"
          value={formData.department}
          onChange={handleChange}
          options={[
            { value: '', label: 'Please select a department' },
            ...departments.map((department) => ({
              value: department,
              label: department,
            })),
          ]}
        />

        <button className={styles.submitButton} type="submit">
          Save
        </button>
      </form>
      <ModalComponent isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>Employee Created!</h2>
        <button onClick={closeModal}>Close</button>
      </ModalComponent>
    </div>
  )
}

export default EmployeeForm
