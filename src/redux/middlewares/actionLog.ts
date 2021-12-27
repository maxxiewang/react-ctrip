import { Middleware } from "redux"

export const actionLog: Middleware = (store) => (next) => (action) => {
  // 在这里面进行业务逻辑
  console.log('当前的state', store.getState())
  console.log('fisrt action', action)
  next(action)
  console.log('更新后的state', store.getState())
}