import { createStore, combineReducers } from "redux";
import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "../pages/recommendProducts/recommendProductsReducer";

//! 所有reducer的集合体
const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer
})
//todo 不会，这块啊！
export type RootState = ReturnType<typeof store.getState>

const store = createStore(rootReducer)

export default store