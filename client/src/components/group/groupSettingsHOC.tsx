import { useParams } from 'react-router-dom'
import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store/slicers/userSlice'
import { groupActions } from '../../store/slicers/groupSlice'
import { postActions } from '../../store/slicers/postSlice'
import SettingsGroup from './settings-group'

interface Props {}

const SettingsGroupHOC: FC<Props> = () => {
  const { groupId } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userActions.loadUserShortInfo())
    dispatch(groupActions.loadGroupRequest())
    dispatch(postActions.loadPosts())
  })
  return <SettingsGroup id={groupId} />
}

export default SettingsGroupHOC
