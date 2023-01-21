import { configureStore } from '@reduxjs/toolkit'
import reducer from './slicers/index'
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'
import apiCallWatcherLogin from './middleware/loginApiMiddleware'
import apiCallWatcherRegistration from './middleware/registrationMiddleware'
import apiCallWatcherUser from './middleware/userApiMiddleware'
import apiCallWatcherPosts from './middleware/postApiMiddleware'
import apiCallWatcherGroup from './middleware/groupApiMiddleware'

const sagaMiddleware: SagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(apiCallWatcherLogin)
sagaMiddleware.run(apiCallWatcherRegistration)
sagaMiddleware.run(apiCallWatcherUser)
sagaMiddleware.run(apiCallWatcherPosts)
sagaMiddleware.run(apiCallWatcherGroup)

export type RootState = ReturnType<typeof store.getState>
export default store
