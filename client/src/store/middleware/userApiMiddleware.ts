import { PayloadAction } from '@reduxjs/toolkit'
import { call, fork, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { userActions } from '../slicers/userSlice'
import { DialogsInterface, UserShortInfo } from '../../types/user-interfaces'

const callUser = (action: PayloadAction<null>) => {
  return axios.get('http://localhost:5000/short-users').then((res) => res.data)
}
const callDialogs = (action: PayloadAction<null>) => {
  return axios.get('http://localhost:5000/get-dialogs').then((res) => res.data)
}
function* apiCallWorker(action: PayloadAction<null>) {
  try {
    const data: UserShortInfo[] = yield call(callUser, action)
    yield put(userActions.userShortInfoSuccess(data))
  } catch (error: any) {
    yield put(userActions.userShortInfoError(error.response.data))
  }
}
function* apiCallDialogsWorker(action: PayloadAction<null>) {
  try {
    const data: DialogsInterface = yield call(callDialogs, action)
    yield put(userActions.loadDialogsSuccess(data))
  } catch (error: any) {
    yield put(userActions.loadDialogsError(error.response.data))
  }
}

function* apiCallWatcher(): any {
  yield takeEvery('user/loadUserShortInfo', apiCallWorker)
}
function* apiCallDialogsWatcher(): any {
  yield
  takeEvery('user/loadDialogsReques', apiCallDialogsWorker)
}

export default function* userRootSaga() {
  yield fork(apiCallWatcher)
  yield fork(apiCallDialogsWatcher)
}
