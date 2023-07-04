import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savedFilter: [],
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilter: (state, action) => {
      console.log(action.payload)
    },
  }
})

export const { addFilter } = filterSlice.actions

export default filterSlice.reducer