export interface PostInterface {
  id: string
  img: string
  title: string
  text: string
  date: string
  likes: string[]
  comments: string[]
}

export interface LikesInterface {
  id: string
  idPerson: string
}

export interface CommentInterface {
  id: string
  name: string
  text: string
}
