import { FC, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/esm/Image'
import { ReactComponent as Heart } from '../../template/heart-svgrepo-com.svg'
import {
  CommentInterface,
  LikesInterface,
  PostInterface,
} from '../../types/posts-interface'
import { RootState } from '../../store/store'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { postActions } from '../../store/slicers/postSlice'
import { LoginSuccess } from '../../types/auth-Interfaces'
import {
  getCommentsOfPostById,
  getLikesById,
  getPostById,
} from '../../store/selectors'
import ModalWindow from '../../components/modal/modal'
import Loading from '../../components/loader'

interface PostType {
  id: string
  post: PostInterface | undefined
  comments: undefined | CommentInterface[]
  likes: LikesInterface[] | undefined
  user: null | LoginSuccess
}

const Post: FC<PostType> = ({ id, post, comments, user, likes }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState<string>('')
  const [activeModal, setActiveModal] = useState<boolean>(false)

  const addCommentButton = (): void => {
    const name = user ? `${user.name} ${user.surname}` : 'Anonim'
    dispatch(
      postActions.addComment({
        id,
        name,
        text: comment,
      })
    )
  }
  const like = likes?.find((obj) => obj.idPerson === user?.id)
  const haveLike = like ? true : false
  const [isLiked, setLike] = useState<boolean>(haveLike) // eslint-disable-line
  const addLike = () => {
    if (user && !isLiked) {
      dispatch(
        postActions.addLike({
          id,
          idPerson: user.id,
        })
      )
      setLike(true)
    } else if (user && isLiked) {
      setLike(false)
    } else if (!user) {
      setActiveModal(true)
    }
  }
  if (!post || !comments) return <Loading />

  return (
    <Container>
      <ModalWindow
        active={activeModal}
        setActive={setActiveModal}
        text="You should loggin to like posts"
      />
      <div key={id}>
        <div className="d-flex mb-5">
          <Image
            thumbnail
            src={post.img}
            style={{ width: '40%' }}
            className="mt-5 ms-5"
          />
          <div className="mt-5 ms-5">
            <h2>{post.title}</h2>
            {post.date}
            <p>{post.text}</p>
            <p>
              Likes: {post.likes.length}
              <button style={{ background: 'none', border: 'none' }}>
                <Heart
                  height={20}
                  width={20}
                  style={{ fill: isLiked ? 'red' : 'black' }}
                  onClick={() => {
                    addLike()
                  }}
                />
              </button>
            </p>
          </div>
        </div>
        {/* Comment Input */}
        <InputGroup size="lg" className="mb-5">
          <Button
            variant="outline-primary"
            type="submit"
            onClick={addCommentButton}
          >
            Leave Comment
          </Button>
          <Form.Control
            value={comment}
            id="comment-text"
            aria-label="Large"
            placeholder="Write youre comment"
            onChange={(e) => {
              setComment(e.target.value)
            }}
          />
        </InputGroup>
        {/* Old comments */}
        <ListGroup as="ol">
          {comments?.map((obj) => (
            <ListGroup.Item as="li" className="align-items-start" key={obj.id}>
              <div className="ms-2 me-auto">
                <div className="fw-bold">{obj.name}</div>
                {obj.text}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </Container>
  )
}
const mapStateToProps = (state: RootState, { id }: any) => ({
  comments: getCommentsOfPostById(state, id),
  post: getPostById(state, id),
  likes: getLikesById(state, id),
  user: state.auth.user,
})

export default connect(mapStateToProps)(Post)
