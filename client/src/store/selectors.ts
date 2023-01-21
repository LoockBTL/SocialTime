import { GroupInterface } from './../types/group-interface'
import { SearchInterface, UserShortInfo } from './../types/user-interfaces'
import { LoginStatus, RegistrationStatus } from '../types/auth-Interfaces'
import { RootState } from './store'

export const loginStatusSelector = (state: RootState): LoginStatus => ({
  user: state.auth.user,
  error: state.auth.errors,
})

export const registrationStatusSelector = (
  state: RootState
): RegistrationStatus => ({
  registrationMessage: state.auth.registrationMessage,
  registrationError: state.auth.registrationError,
})

export const userShortInfoSelector = (state: RootState) => ({
  users: state.user.usersShortInfo,
})

export const usersById = (state: RootState, id: string[]) => {
  const users = state.user.usersShortInfo?.filter((obj: UserShortInfo) =>
    id.includes(obj.id)
  )
  return users
}
export const oneUserById = (state: RootState, id: string) => {
  const user = state.user.usersShortInfo?.find(
    (obj: UserShortInfo) => obj.id === id
  )
  return user
}

export const getUserPostsById = (state: RootState, id: string) => {
  const posts = state.post.posts?.filter((obj) =>
    oneUserById(state, id)?.posts.includes(obj.id)
  )
  return posts
}

export const getUserFriendsById = (state: RootState, id: string) => {
  const friends = state.user.usersShortInfo?.filter((obj: UserShortInfo) =>
    oneUserById(state, id)?.friends.includes(obj.id)
  )
  return friends
}

export const getUserGroupsById = (state: RootState, id: string) => {
  const groups = state.group.groups?.filter((obj) =>
    oneUserById(state, id)?.groups.includes(obj.id)
  )
  return groups
}

export const oneGroupById = (state: RootState, id: string) => {
  const group = state.group.groups?.find((obj: GroupInterface) => obj.id === id)
  return group
}

export const getGroupPostsById = (state: RootState, id: string) => {
  const posts = state.post.posts?.filter((obj) =>
    oneGroupById(state, id)?.groupPost.includes(obj.id)
  )
  return posts
}

export const getPostById = (state: RootState, id: string) => {
  const post = state.post.posts?.find((obj) => obj.id === id)
  return post
}

export const getCommentsOfPostById = (state: RootState, id: string) => {
  const postIdComments = getPostById(state, id)?.comments
  const comments = state.post.comments?.filter((obj) =>
    postIdComments?.includes(obj.id)
  )

  return comments
}

export const getLikesById = (state: RootState, id: string) => {
  const postLikes = getPostById(state, id)?.likes
  const likes = state.post.likes?.filter((obj) => postLikes?.includes(obj.id))
  return likes
}

export const createSearchData = (state: RootState) => {
  const groups = state.group.groups?.map((obj) => ({
    id: obj.id,
    name: obj.name,
    img: obj.img,
    type: 'Group',
  }))
  const users = state.user.usersShortInfo?.map((obj) => ({
    id: obj.id,
    name: `${obj.name} ${obj.surname}`,
    img: obj.img,
    type: 'Person',
  }))
  if (groups !== undefined && users !== undefined) {
    const searchData: SearchInterface[] = [...groups, ...users]
    return searchData
  }
  return []
}

export const watchForLoggin = (state: RootState, id: string) => {
  const logginId = state.auth.user?.id
  const status = logginId === id
  return status
}
