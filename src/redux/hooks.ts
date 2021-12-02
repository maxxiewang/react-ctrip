import { useSelector as useReduxSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "./stroe";

export const useSelector:TypedUseSelectorHook<RootState> = useReduxSelector