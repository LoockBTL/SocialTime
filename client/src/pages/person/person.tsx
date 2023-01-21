import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import { FC } from 'react'
import { RootState } from '../../store/store'
import { connect } from 'react-redux'
import {
  getUserFriendsById,
  getUserGroupsById,
  getUserPostsById,
  oneUserById,
  watchForLoggin,
} from '../../store/selectors'
import { UserShortInfo } from '../../types/user-interfaces'
import { PostInterface } from '../../types/posts-interface'
import { GroupInterface } from '../../types/group-interface'
import PostCard from '../../components/person/posts/postcard'
import FriendCard from '../../components/person/friends/friendcard'
import GroupCard from '../../components/person/groups/groupscard'
import { Button } from 'react-bootstrap'

interface PersonProps {
  id: string
  user: UserShortInfo | undefined
  posts: PostInterface[] | undefined
  friends: UserShortInfo[] | undefined
  groups: GroupInterface[] | undefined
  logginCheck: boolean
}

const Person: FC<PersonProps> = ({
  id,
  user,
  posts,
  friends,
  groups,
  logginCheck,
}) => {
  const navigate = useNavigate()
  return (
    <Container>
      <div className="d-flex mt-5">
        <Image
          thumbnail
          fluid
          roundedCircle
          src={user?.img}
          className="me-5"
          style={{ maxWidth: '20%' }}
        />
        <div>
          <h1>{user?.name}</h1>
          <div className="d-flex">
            <p className="me-2">Friends: {user?.friends.length}</p>
            <p className="me-2">Posts: {user?.posts.length}</p>
            <p>Groups: {user?.groups.length}</p>
          </div>
          <p>About me: {user?.about}</p>
        </div>
        {logginCheck ? (
          <Button
            style={{ height: '50px' }}
            className="ms-5"
            onClick={() => navigate(`/person/${id}/settings`)}
          >
            Settings
          </Button>
        ) : (
          <></>
        )}
      </div>
      <Nav variant="tabs" className="justify-content-center">
        <Nav.Link>
          <NavLink style={{ textDecoration: 'none' }} to="posts">
            Posts
          </NavLink>
        </Nav.Link>
        <Nav.Link>
          <NavLink style={{ textDecoration: 'none' }} to="friends">
            Friends
          </NavLink>
        </Nav.Link>
        <Nav.Link>
          <NavLink style={{ textDecoration: 'none' }} to="groups">
            Groups
          </NavLink>
        </Nav.Link>
      </Nav>
      <div>
        <Routes>
          <Route path="posts" element={<PostCard posts={posts} />} />
          <Route path="friends" element={<FriendCard friends={friends} />} />
          <Route path="groups" element={<GroupCard groups={groups} />} />
        </Routes>
      </div>
    </Container>
  )
}

const mapStateToProps = (state: RootState, { id }: any) => ({
  user: oneUserById(state, id),
  posts: getUserPostsById(state, id),
  friends: getUserFriendsById(state, id),
  groups: getUserGroupsById(state, id),
  logginCheck: watchForLoggin(state, id),
})

export default connect(mapStateToProps)(Person)
