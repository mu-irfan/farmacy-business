import { useDispatch, useSelector, useStore } from "react-redux";
import { AppDispatch, AppStore, RootState } from "../store";

export const useFarmacyDispatch = useDispatch.withTypes<AppDispatch>();
export const useFarmacySelector = useSelector.withTypes<RootState>();
export const useFarmacyStore = useStore.withTypes<AppStore>();
