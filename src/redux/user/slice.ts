import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface UserState {
  loading: boolean,
  error: string | null,
  token: string | null
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null
}

//* thunk-action
export const signIn = createAsyncThunk(
  "user/signIn", //! 命名空间(下面那个Name）/action的名称(该方法名)
  async (paramters: { email: string, password: string }, thunkAPI) => {
    const { data } = await axios.post(
      `http://123.56.149.216:8080/auth/login`, {
      email: paramters.email,
      password: paramters.password
    }
    )
    return data.token
  }
)

// 创建并导出
export const userlSlice = createSlice({
  name: 'user',
  initialState,
  //! 这里的reducers实际是把reducr和action捆绑到了一起，是对象不是过程
  reducers: {
    logout: (state) => { // 给登出功能使用
      state.token = null
      state.loading = false
      state.error = null
    },
  },
  extraReducers: {
    [signIn.pending.type]: (state) => {
      state.loading = true
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.token = action.payload
      state.loading = false
      state.error = null
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})