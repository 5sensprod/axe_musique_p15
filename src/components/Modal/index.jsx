import React from 'react'
import Modal from 'react-modal'
import styles from './Modal.module.css'
import PropTypes from 'prop-types'

Modal.setAppElement('#root')

const ModalComponent = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal"
      className={styles.customModal}
      overlayClassName={styles.customOverlay}
    >
      {children}
    </Modal>
  )
}

ModalComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default ModalComponent
