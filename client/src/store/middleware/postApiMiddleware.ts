import { call, fork, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { postActions } from '../slicers/postSlice'
import {
  CommentInterface,
  LikesInterface,
  PostInterface,
} from '../../types/posts-interface'
import { getType } from '@reduxjs/toolkit'

const callPosts = (action: any) => {
  return axios.get('http://localhost:5000/posts').then((res) => res.data)
}
const callLikes = (action: any) => {
  return axios.get('http://localhost:5000/post-likes').then((res) => res.data)
}
const callComments = (action: any) => {
  return axios.get('http://localhost:5000/post-comment').then((res) => res.data)
}
function* apiCallPostsWorker(action: any) {
  try {
    const data: PostInterface[] = yield call(callPosts, action)
    yield put(postActions.loadPostsSuccess(data))
  } catch (error: any) {
    yield put(postActions.loadPostsError(error.response.data))
  }
}

function* apiCallLikes(action: any) {
  try {
    const data: LikesInterface[] = yield call(callLikes, action)
    yield put(postActions.loadLikesSuccess(data))
  } catch (error: any) {
    yield put(postActions.loadLikesError(error.response.data))
  }
}
function* apiCallComments(action: any) {
  try {
    const data: CommentInterface[] = yield call(callComments, action)
    yield put(postActions.loadCommentsSuccess(data))
  } catch (error: any) {
    yield put(postActions.loadCommentsError(error.response.data))
  }
}

function* apiCallWatcher(): any {
  yield takeEvery(getType(postActions.loadPosts), apiCallPostsWorker)
}

function* apiCallLikesWatcher(): any {
  yield takeEvery(getType(postActions.loadLikes), apiCallLikes)
}

function* apiCallCommentsWatcher(): any {
  yield takeEvery(getType(postActions.loadComments), apiCallComments)
}

export default function* postRootSaga() {
  yield fork(apiCallWatcher)
  yield fork(apiCallLikesWatcher)
  yield fork(apiCallCommentsWatcher)
}
