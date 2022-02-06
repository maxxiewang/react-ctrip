import { createSlice, PayloadAction } from '@reduxjs/toolkit'
/* 
 !
*/

interface ProductDetailState {
  loading: boolean,
  error: string | null,
  data: any
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null
}

// 创建并导出
export const ProductDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  //! 这里的reducers实际是把reducr和action捆绑到了一起，是对象不是过程
  reducers: {
    fetchStart: (state) => {
      // return { ...state, loading: true }
      state.loading = true
    },
    fetchSuccess: (state, action) => {
      state.data = action.payload
      state.loading = false
      state.error = null
    },
    fetchFail: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})