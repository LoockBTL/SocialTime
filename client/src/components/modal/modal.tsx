import { FC } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

interface ModalProps {
  active: boolean
  setActive: any
  text: string
}

const ModalWindow: FC<ModalProps> = ({ active, setActive, text }) => {
  return (
    <Modal show={active} fullscreen="sm-down">
      <Modal.Header>
        <Modal.Title>Warning</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{text}</p>
        <Button
          variant="secondary"
          onClick={() => {
            setActive(false)
          }}
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  )
}

export default ModalWindow
