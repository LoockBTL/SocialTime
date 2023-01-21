import { GroupInterface } from './../../types/group-interface'
import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'

interface GroupSlice {
  groups: GroupInterface[] | null
  error: null | string
}

const initialState: GroupSlice = {
  groups: null,
  error: null,
}

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    loadGroupRequest: (state) => {},
    loadGroupsSuccess: (state, action: PayloadAction<GroupInterface[]>) => {
      state.groups = action.payload
    },
    loadGroupError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
})
export const { reducer: groupSliceReducer, actions: groupActions } = groupSlice
