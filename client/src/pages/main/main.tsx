import { Card, Container } from 'react-bootstrap'
import { FC, useEffect, useState } from 'react'
import { LoginSuccess } from '../../types/auth-Interfaces'
import { connect } from 'react-redux'
import { RootState } from '../../store/store'
import { NavLink } from 'react-router-dom'
import { PostInterface } from '../../types/posts-interface'
import BigPost from '../../components/bigpost/bigpost'
import { useDispatch } from 'react-redux'
import { postActions } from '../../store/slicers/postSlice'
import ModalWindow from '../../components/modal/modal'
import Loading from '../../components/loader'
import Image from 'react-bootstrap/Image'

interface MainPageProps {
  user: null | LoginSuccess
  posts: null | PostInterface[]
}

const MainPage: FC<MainPageProps> = ({ user, posts }) => {
  const [activeModal, setActiveModal] = useState<boolean>(true)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(postActions.loadPosts())
  }, []) // eslint-disable-line
  if (!posts) return <Loading />
  return (
    <Container className="d-flex">
      {activeModal ? (
        <ModalWindow
          setActive={setActiveModal}
          active={activeModal}
          text="This app is test version.
        Don't work comments, likes or any other functions which are connected
        to server"
        />
      ) : (
        <></>
      )}
      {user ? (
        <NavLink to={`/person/${user.id}/posts`}>
          <Card className="col-auto sticky-top mt-3">
            <Card.Body className="text-center">
              <Image
                thumbnail
                fluid
                roundedCircle
                src={user?.img}
                className=" text-center"
                style={{ maxWidth: '100%' }}
              />

              <Card.Title>{user.name}</Card.Title>
              <Card.Text className="d-flex flex-column">
                <NavLink to={`/person/${user.id}/friends`}>
                  Friends: {user.friends.length}
                </NavLink>
                <NavLink to={`/person/${user.id}/groups`}>
                  Groups: {user.groups.length}
                </NavLink>
              </Card.Text>
            </Card.Body>
          </Card>
        </NavLink>
      ) : (
        <Card style={{ height: '60px' }} className="mt-3">
          <Card.Body>
            <NavLink to="/login">Please login</NavLink>
          </Card.Body>
        </Card>
      )}

      <div>
        {posts.map((obj) => (
          <NavLink to={`/post/${obj.id}`} key={obj.id}>
            <BigPost post={obj} />
          </NavLink>
        ))}
      </div>
    </Container>
  )
}

const mapStateToProps = (state: RootState) => ({
  user: state.auth.user,
  posts: state.post.posts,
})
export default connect(mapStateToProps)(MainPage)
