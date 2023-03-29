import { configureStore } from '@reduxjs/toolkit'
import { reducer as bookReducer } from './slices/book'

export default configureStore({
  reducer: {
    book: bookReducer
  }
})
