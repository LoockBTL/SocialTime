import { FC } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import { NavLink } from 'react-router-dom'
import { GroupInterface } from '../../../types/group-interface'

interface GroupCardProps {
  groups: GroupInterface[] | undefined
}

const GroupCard: FC<GroupCardProps> = ({ groups }) => {
  return (
    <Container className="d-flex">
      {groups?.map((obj) => (
        <NavLink to={`/group/${obj.id}`} key={obj.id}>
          <Card className="me-3" style={{ width: '15rem' }}>
            <Card.Img variant="top" src={obj.img} />
            <Card.Body>
              <Card.Title>{obj.name}</Card.Title>
            </Card.Body>
          </Card>
        </NavLink>
      ))}
    </Container>
  )
}

export default GroupCard
