import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button'
import { NavLink, useNavigate } from 'react-router-dom'
import { FormEvent, FC, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/slicers/authSlice'
import { connect } from 'react-redux'
import { RootState } from '../../store/store'
import { loginStatusSelector } from '../../store/selectors'
import { LoginStatus } from '../../types/auth-Interfaces'
import { userActions } from '../../store/slicers/userSlice'

interface LoginProps {
  loginStatus: LoginStatus
}

const Loggin: FC<LoginProps> = ({ loginStatus }) => {
  const { user, error } = loginStatus
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const formData = {
      login: login,
      password: password,
    }
    dispatch(authActions.loginAuth(formData))
    if (!error) {
      setTimeout(() => navigate('/'), 0)
    }
  }
  useEffect(() => {
    dispatch(userActions.loadUserShortInfo())
  }, [dispatch])

  return (
    <Container className="d-flex justify-content-center px-auto">
      <Form className="w-50 form-control-lg " onSubmit={handleSubmit}>
        <h1>Login</h1>

        <Form.Group controlId="formLogin" className="mb-3">
          <Form.Label>Login</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter your login, please"
            onChange={(e) => setLogin(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formLoginPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter your password, please"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {error ? <p className="text-danger">{error}</p> : <></>}
        {user ? (
          <p className="text-success">Welcome back {user.name}</p>
        ) : (
          <></>
        )}

        <div>
          <Button variant="outline-primary" type="submit" className="me-3">
            Loggin
          </Button>
          Is not reggistred yet?
          <NavLink className="ms-3" to="/registration">
            Registration
          </NavLink>
        </div>
      </Form>
    </Container>
  )
}

const mapStateToProps = (state: RootState) => ({
  loginStatus: loginStatusSelector(state),
})

export default connect(mapStateToProps)(Loggin)
