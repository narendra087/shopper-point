import { createSlice } from "@reduxjs/toolkit";

type FilterType = {
  id?: number,
  keyword: string,
  category: string,
  price: number[]
}

type InitialState = {
  savedFilter: FilterType[]
}

const initialState:InitialState = {
  savedFilter: [],
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addFilter: (state, action) => {
      if (!action.payload?.id) {
        const fiiter = {
          id: Date.now(),
          ...action.payload
        }
        
        if (state.savedFilter.length >= 5) {
          state.savedFilter.pop()
        }
        state.savedFilter.unshift(fiiter)
      }
    },
  }
})

export const { addFilter } = filterSlice.actions

export default filterSlice.reducer