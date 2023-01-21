import { authSLiceReducer } from './authSlice'
import { groupSliceReducer } from './groupSlice'
import { postSliceReducer } from './postSlice'
import { userSliceReducer } from './userSlice'

const reducers = {
  auth: authSLiceReducer,
  user: userSliceReducer,
  post: postSliceReducer,
  group: groupSliceReducer,
}

export default reducers
