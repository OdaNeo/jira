import { createSlice } from '@reduxjs/toolkit'
import { RootState } from 'store'

interface State {
  projectModelOpen: boolean
}

const initialState: State = {
  projectModelOpen: false
}

export const projectListSlice = createSlice({
  name: 'projectListSlice',
  initialState,
  reducers: {
    openProjectModel(state) {
      state.projectModelOpen = true
    },
    closeProjectModel(state) {
      state.projectModelOpen = false
    }
  }
})

export const projectListAction = projectListSlice.actions

export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModelOpen
