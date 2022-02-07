import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
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

export const getProductDetail = createAsyncThunk(
  "productDetail/getProductDetail",
  // thunkAPI包含了一系列的redux功能
  async (touristRouteId: string, thunkAPI) => {
    // thunkAPI.dispatch(ProductDetailSlice.actions.fetchStart())
    // try {
    //   const { data } = await axios.get(
    //     `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
    //   )
    //   thunkAPI.dispatch(ProductDetailSlice.actions.fetchSuccess(data))
    // } catch (error: any) {
    //   thunkAPI.dispatch(ProductDetailSlice.actions.fetchFail(error))
    // }

    //! 上面为原来正常的逻辑，getProductDetail这个函数没有返回值，并没有充分利用它的返回类型
    //! 原框架中createAsyncThunk会return 三个类型
    const { data } = await axios.get(
      `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
    )
    return data
  }
)

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
  },
  extraReducers: {
    [getProductDetail.pending.type]: (state) => {
      state.loading = true
    },
    [getProductDetail.fulfilled.type]: (state, action) => {
      state.data = action.payload
      state.loading = false
      state.error = null
    },
    [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})