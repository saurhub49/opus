import { AnyAction, ReducersMapObject } from "@reduxjs/toolkit"
import authSlice from "../../components/features/login/reducer/authSlice.slice"

type ReducerType = ReducersMapObject<any, AnyAction>

const rootReducer: ReducerType = {
    auth: authSlice,
}

export default rootReducer;