import { Container } from 'react-bootstrap'
import { FC, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { GroupInterface } from '../../types/group-interface'
import { connect } from 'react-redux'
import { PostInterface } from '../../types/posts-interface'
import { getGroupPostsById, oneGroupById } from '../../store/selectors'
import { RootState } from '../../store/store'
import BigPost from '../../components/bigpost/bigpost'
import { NavLink, useNavigate } from 'react-router-dom'
import { LoginSuccess } from '../../types/auth-Interfaces'
import Loading from '../../components/loader'
import ModalWindow from '../../components/modal/modal'

interface GroupPageProps {
  id: string
  group: GroupInterface | undefined
  posts: PostInterface[] | undefined
  user: LoginSuccess | null
}

const Group: FC<GroupPageProps> = ({ id, group, posts, user }) => {
  const navigate = useNavigate()
  const [activeModal, setActiveModal] = useState(false)
  const buttonAction = () => {
    setActiveModal(true)
  }
  if (!group || !posts) return <Loading />
  return (
    <Container className="d-flex">
      <ModalWindow
        active={activeModal}
        setActive={setActiveModal}
        text={
          group?.creator === user?.id
            ? 'Deleted'
            : user?.groups.includes(id)
            ? 'You are unsubscribed'
            : 'You are subscribed'
        }
      />
      <div>
        {posts?.map((obj) => (
          <NavLink to={`/post/${obj.id}`} key={obj.id}>
            <BigPost post={obj} />
          </NavLink>
        ))}
      </div>
      <Card className="sticky-top">
        <Card.Img variant="top" src={group?.img} />
        <Card.Body>
          <Card.Title>{group?.name}</Card.Title>
          {null || <Card.Text>{`Members: ${group?.members.length}`}</Card.Text>}
          <div className="d-flex flex-column">
            <Button
              variant="primary"
              className="mb-3"
              onClick={() => {
                buttonAction()
              }}
            >
              {group?.creator === user?.id
                ? 'Delete'
                : user?.groups.includes(id)
                ? 'Unsubscribe'
                : 'Subscribe'}
            </Button>
            {group?.creator === user?.id ? (
              <Button
                onClick={() => {
                  navigate(`/group/${id}/settings`)
                }}
              >
                Settings
              </Button>
            ) : (
              <></>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

const mapStateToProps = (state: RootState, { id }: any) => ({
  group: oneGroupById(state, id),
  posts: getGroupPostsById(state, id),
  user: state.auth.user,
})

export default connect(mapStateToProps)(Group)
