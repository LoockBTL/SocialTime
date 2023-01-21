import { useParams } from 'react-router-dom'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store/slicers/userSlice'
import { groupActions } from '../../store/slicers/groupSlice'
import Group from '../../pages/group/group'
import { postActions } from '../../store/slicers/postSlice'

interface Props {}

const PersonHOC: FC<Props> = () => {
  const { groupId } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userActions.loadUserShortInfo())
    dispatch(groupActions.loadGroupRequest())
    dispatch(postActions.loadPosts())
  })
  return <Group id={groupId} />
}

export default PersonHOC
