export interface UserShortInfo {
  id: string
  img: string
  surname: string
  name: string
  about: string
  dateRegistration: string
  friends: string[]
  groups: string[]
  posts: string[]
}

export interface DialogsInterface {
  id: string
  firstUser: string
  secondUser: string
  dialog: DialogMessage[]
}
interface DialogMessage {
  id: string
  name: string
  text: string
}

export interface SearchInterface {
  id: string
  name: string
  img: string
  type: string
}
