import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/esm/Container'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FC } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../../store/store'
import { LoginSuccess } from '../../../types/auth-Interfaces'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../../../store/slicers/authSlice'

interface HeaderProps {
  user: null | LoginSuccess
}

const Header: FC<HeaderProps> = ({ user }) => {
  const dispatch = useDispatch()
  let authDefaultFalue: boolean = false
  const [isAuth, setAuth] = useState<boolean>(authDefaultFalue) // eslint-disable-line
  const navigate = useNavigate()
  const buttonClick = () => {
    if (user) {
      dispatch(authActions.exitFromApp())
      return console.log('User exit an app')
    }
    navigate('/login')
  }
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand
          className="text-light"
          onClick={() => {
            navigate('/')
          }}
          style={{ cursor: 'pointer' }}
        >
          SocialTIme
        </Navbar.Brand>
        {user ? (
          <NavLink to={`/person/${user.id}/posts`} className="text-light me-3">
            {user.name}
          </NavLink>
        ) : (
          <></>
        )}
        <NavLink to="/" className="text-light me-3">
          Main
        </NavLink>
        <NavLink to={`/search`} className="text-light me-3">
          Search
        </NavLink>
        <Navbar.Collapse className="justify-content-end">
          <Button variant="primary" onClick={buttonClick}>
            {user ? 'Exit' : 'Login'}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
})

export default connect(mapStateToProps)(Header)
