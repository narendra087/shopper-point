import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  userData: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLogin = true
      state.userData = action.payload
    },
    removeUser: (state) => {
      state.isLogin = false
      state.userData = null
    },
  }
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer