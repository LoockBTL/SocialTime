import { FC } from 'react'
import { PostInterface } from '../../../types/posts-interface'
import { NavLink } from 'react-router-dom'

interface PostCardProps {
  posts: PostInterface[] | undefined
}

const PostCard: FC<PostCardProps> = ({ posts }) => {
  return (
    <>
      {posts?.map((obj) => (
        <NavLink to={`/post/${obj.id}`} key={obj.id}>
          <img src={obj.img} alt={`post ${obj.id}`} className="me-5" />
        </NavLink>
      ))}
    </>
  )
}

export default PostCard
