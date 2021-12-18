import { useSelector as useReduxSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "./store1";

//TODO 这个基本就是不会
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
