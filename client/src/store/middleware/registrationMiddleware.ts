import { PayloadAction } from '@reduxjs/toolkit'
import { RegisterSuccess, RegisterRequest } from '../../types/auth-Interfaces'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { authActions } from '../slicers/authSlice'

const callLogin = (action: PayloadAction<RegisterRequest>) => {
  const { payload } = action
  return axios
    .post('http://localhost:5000/registration', payload)
    .then((res) => res.data)
}
function* apiCallWorker(action: PayloadAction<RegisterRequest>) {
  try {
    const data: RegisterSuccess = yield call(callLogin, action)
    yield put(authActions.registerSuccess(data))
  } catch (error: any) {
    yield put(authActions.registerError(error.response.data))
  }
}

export default function* apiCallWatcher(): any {
  yield takeEvery('auth/registerRequest', apiCallWorker)
}
