import {
  CommentInterface,
  LikesInterface,
  PostInterface,
} from '../../types/posts-interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface PostSlice {
  posts: null | PostInterface[]
  likes: null | LikesInterface[]
  comments: CommentInterface[]
  postError: string | null
  likeError: string | null
  commentError: string | null
}

const initialState: PostSlice = {
  posts: null,
  likes: null,
  comments: [],
  postError: null,
  likeError: null,
  commentError: null,
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    loadPosts: (state) => {},
    loadLikes: (state) => {},
    loadComments: (state) => {},
    loadPostsSuccess: (state, action: PayloadAction<PostInterface[]>) => {
      state.posts = action.payload
    },
    loadPostsError: (state, action: PayloadAction<string>) => {
      state.postError = action.payload
    },
    loadLikesSuccess: (state, action: PayloadAction<LikesInterface[]>) => {
      state.likes = action.payload
    },
    loadLikesError: (state, action: PayloadAction<string>) => {
      state.likeError = action.payload
    },
    loadCommentsSuccess: (state, action: PayloadAction<CommentInterface[]>) => {
      state.comments = action.payload
    },
    loadCommentsError: (state, action: PayloadAction<string>) => {
      state.commentError = action.payload
    },
    addComment: (state, action: PayloadAction<CommentInterface>) => {
      state.comments = [...state.comments, action.payload]
      state.posts
        ?.find((obj) => obj.id === action.payload.id)
        ?.comments.push(action.payload.id)
    },
    addLike: (state, action: PayloadAction<LikesInterface>) => {
      state.likes?.push(action.payload)
      state.posts
        ?.find((obj) => obj.id === action.payload.id)
        ?.likes.push(action.payload.id)
    },
  },
})
export const { reducer: postSliceReducer, actions: postActions } = postSlice
