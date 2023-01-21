import { useParams } from 'react-router-dom'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store/slicers/userSlice'
import { groupActions } from '../../store/slicers/groupSlice'
import { postActions } from '../../store/slicers/postSlice'
import Post from '../../pages/posts/post'

interface Props {}

const PersonHOC: FC<Props> = () => {
  const { postId } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userActions.loadUserShortInfo())
    dispatch(groupActions.loadGroupRequest())
    dispatch(postActions.loadPosts())
    dispatch(postActions.loadComments())
    dispatch(postActions.loadLikes())
  })

  return <Post id={postId} />
}

export default PersonHOC
