import {
  LoginData,
  LoginSuccess,
  LoginError,
  RegisterRequest,
  RegisterError,
  RegisterSuccess,
} from '../../types/auth-Interfaces'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface AuthSlice {
  user: null | LoginSuccess
  loginData: LoginData | null
  errors: boolean | string
  registrationMessage: null | string
  registrationError: null | string
}

const initialState: AuthSlice = {
  user: null,
  loginData: null,
  errors: false,
  registrationMessage: null,
  registrationError: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAuth: (state, action: PayloadAction<LoginData>) => {
      state.loginData = action.payload
    },
    loginSuccess: (state, action: PayloadAction<LoginSuccess>) => {
      state.user = action.payload
    },
    loginError: (state, action: PayloadAction<LoginError>) => {
      state.errors = action.payload
    },
    exitFromApp: (state) => {
      state.user = null
    },
    registerRequest: (state, action: PayloadAction<RegisterRequest>) => {
      state.registrationMessage = action.payload.email
    },
    registerSuccess: (state, action: PayloadAction<RegisterSuccess>) => {
      state.registrationMessage = action.payload
    },
    registerError: (state, action: PayloadAction<RegisterError>) => {
      state.registrationError = action.payload
    },
  },
})

export const { reducer: authSLiceReducer, actions: authActions } = authSlice
