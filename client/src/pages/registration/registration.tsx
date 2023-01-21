import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button'
import { NavLink } from 'react-router-dom'
import { FormEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/slicers/authSlice'
import { registrationStatusSelector } from '../../store/selectors'
import { connect } from 'react-redux'
import { RootState } from '../../store/store'
import { RegistrationStatus } from '../../types/auth-Interfaces'

interface RegistrationProps {
  registerStatus: RegistrationStatus
}

const Registration: FC<RegistrationProps> = ({ registerStatus }) => {
  const { registrationError, registrationMessage } = registerStatus

  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const formData = {
      email,
      login,
      password,
      name,
      surname,
    }
    dispatch(authActions.registerRequest(formData))
  }

  return (
    <Container className="d-flex justify-content-center">
      <Form className="w-50 form-control-lg" onSubmit={handleSubmit}>
        <h1>Registration</h1>
        <Form.Group controlId="formRegistrationEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email, please"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formRegistrationEmail" className="mb-3">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your login, please"
            onChange={(e) => setLogin(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formRegistrationPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password, please"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formRegistrationName" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name, please"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formRegistrationSurname" className="mb-3">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your surname, please"
            onChange={(e) => setSurname(e.target.value)}
          />
        </Form.Group>
        {registrationError ? (
          <p className="text-danger">{registrationError}</p>
        ) : (
          <></>
        )}
        {registrationMessage ? (
          <p className="text-success">{registrationMessage}</p>
        ) : (
          <></>
        )}
        <div>
          <Button variant="outline-success" type="submit" className="me-3">
            Register
          </Button>
          Is registred ?
          <NavLink className="ms-3" to="/login">
            Login
          </NavLink>
        </div>
      </Form>
    </Container>
  )
}
const mapStateToProps = (state: RootState) => ({
  registerStatus: registrationStatusSelector(state),
})
export default connect(mapStateToProps)(Registration)
