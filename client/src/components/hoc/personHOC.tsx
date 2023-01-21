import { useParams } from 'react-router-dom'
import Person from '../../pages/person/person'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store/slicers/userSlice'
import { groupActions } from '../../store/slicers/groupSlice'
import { postActions } from '../../store/slicers/postSlice'

interface Props {}

const PersonHOC: FC<Props> = () => {
  const { personId } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userActions.loadUserShortInfo())
    dispatch(groupActions.loadGroupRequest())
    dispatch(postActions.loadPosts())
  })
  return <Person id={personId} />
}

export default PersonHOC
