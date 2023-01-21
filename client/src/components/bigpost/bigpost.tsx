import { FC } from 'react'
import { PostInterface } from '../../types/posts-interface'
import { Card } from 'react-bootstrap'

interface BigPostProps {
  post: PostInterface
}

const BigPost: FC<BigPostProps> = ({ post }) => {
  return (
    <Card className="m-3">
      <Card.Img src={`${post.img}`} alt="bigphoto" />
      <Card.Body className="d-flex">
        <Card.Text className="me-2">
          Likes: {post.likes.length} Comments: {post.comments.length}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default BigPost
