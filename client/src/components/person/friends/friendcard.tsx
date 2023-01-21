import Container from 'react-bootstrap/esm/Container'
import Card from 'react-bootstrap/Card'
import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { UserShortInfo } from '../../../types/user-interfaces'

interface FriendCardProps {
  friends: UserShortInfo[] | undefined
}

const FriendCard: FC<FriendCardProps> = ({ friends }) => {
  return (
    <Container className="d-flex">
      {friends?.map((obj) => (
        <NavLink to={`/person/${obj.id}`} key={obj.id}>
          <Card className="me-3" style={{ width: '15rem' }}>
            <Card.Img variant="top" src={obj.img} />
            <Card.Body>
              <Card.Title>{`${obj.name} ${obj.surname}`}</Card.Title>
            </Card.Body>
          </Card>
        </NavLink>
      ))}
    </Container>
  )
}

export default FriendCard
