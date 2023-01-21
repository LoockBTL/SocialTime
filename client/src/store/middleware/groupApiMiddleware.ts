import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { GroupInterface } from '../../types/group-interface'
import { groupActions } from '../slicers/groupSlice'

const callGroups = (action: any) => {
  return axios.get('http://localhost:5000/groups').then((res) => res.data)
}

function* apiCallGroupWorker(action: any) {
  try {
    const data: GroupInterface[] = yield call(callGroups, action)
    yield put(groupActions.loadGroupsSuccess(data))
  } catch (error: any) {
    yield put(groupActions.loadGroupError(error.response.data))
  }
}

export default function* apiCallWatcher(): any {
  yield takeEvery('group/loadGroupRequest', apiCallGroupWorker)
}
