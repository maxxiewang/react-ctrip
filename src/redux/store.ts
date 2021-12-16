import { createStore } from "redux";
import languageReducer from "./language/languageReducer";

const store = createStore(languageReducer)
//todo 不会，这块啊！
export type RootState = ReturnType<typeof store.getState>

export default store