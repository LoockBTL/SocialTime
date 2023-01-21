import { LoginSuccess } from '../../types/auth-Interfaces'
import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { authActions } from '../slicers/authSlice'

const callLogin = (action: any) => {
  const { payload } = action
  return axios
    .post('http://localhost:5000/login', payload)
    .then((res) => res.data)
}
function* apiCallWorker(action: any) {
  try {
    const data: LoginSuccess = yield call(callLogin, action)
    yield put(authActions.loginSuccess(data))
  } catch (error: any) {
    yield put(authActions.loginError(error.response.data))
  }
}

export default function* apiCallWatcher(): any {
  yield takeEvery('auth/loginAuth', apiCallWorker)
}
