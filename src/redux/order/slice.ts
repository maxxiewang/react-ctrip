import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { checkout } from '../shoppingCart/slice'

interface OrderState {
  loading: boolean,
  error: string | null,
  currentOrder: any
}

const initialState: OrderState = {
  loading: false,
  error: null,
  currentOrder: null
}

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  // thunkAPI包含了一系列的redux功能
  async (parameters: { jwt: string, orderId: string }, thunkAPI) => {
    const { data } = await axios.post(
      `http://123.56.149.216:8080/api/orders/${parameters.orderId}/placeOrder`
      , null, {
      headers: {
        Authorization: `bearer ${parameters.jwt}`,
      },
    })
    return data
  }
)

// 创建并导出
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
  },
  extraReducers: {
    [placeOrder.pending.type]: (state) => {
      state.loading = true
    },
    [placeOrder.fulfilled.type]: (state, action) => {
      state.currentOrder = action.payload
      state.loading = false
      state.error = null
    },
    [placeOrder.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    },
    [checkout.pending.type]: (state) => {
      state.loading = true
    },
    [checkout.fulfilled.type]: (state, action) => {
      state.currentOrder = action.payload
      state.loading = false
      state.error = null
    },
    [checkout.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})