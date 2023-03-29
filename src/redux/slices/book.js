import { createSlice } from '@reduxjs/toolkit'
import findIndex from 'lodash/findIndex'

const initialState = {
  bids: [],
  asks: []
}

export const { reducer, actions } = createSlice({
  name: 'book',
  initialState,
  reducers: {
    updateBook: (state, { payload }) => {
      state.asks = []
      state.bids = []

      payload.forEach((order) => {
        if (order[2] > 0) {
          state.bids.push(order)
        } else {
          state.asks.push(order)
        }
      })
    },
    updateOrder: (state, { payload }) => {
      const [price, count, amount] = payload
      const asksOrBids = amount > 0 ? 'bids' : 'asks'

      const index = findIndex(state[asksOrBids], { 0: price })

      if (count === 0) {
        state[asksOrBids].splice(index, 1)
      } else if (index >= 0) {
        state[asksOrBids][index] = payload
      } else {
        state[asksOrBids].splice(index, 0, payload)
      }
    }
  }
})
