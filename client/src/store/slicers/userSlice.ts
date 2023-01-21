import { UserShortInfo, DialogsInterface } from './../../types/user-interfaces'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface UserSlice {
  userError: string | null
  usersShortInfo: UserShortInfo[] | null
  personDialogs: null | {}
  dialogs: null | DialogsInterface
  dialogError: null | string
}

const initialState: UserSlice = {
  userError: null,
  usersShortInfo: null,
  personDialogs: null,
  dialogs: null,
  dialogError: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadUserShortInfo: (state) => {},
    loadDialogsReques: (state) => {},
    userShortInfoSuccess: (state, action: PayloadAction<UserShortInfo[]>) => {
      state.usersShortInfo = action.payload
    },
    userShortInfoError: (state, action: PayloadAction<string>) => {
      state.userError = action.payload
    },
    loadDialogsSuccess: (state, action: PayloadAction<DialogsInterface>) => {
      state.dialogs = action.payload
    },
    loadDialogsError: (state, action: PayloadAction<string>) => {
      state.dialogError = action.payload
    },
  },
})
export const { reducer: userSliceReducer, actions: userActions } = userSlice
