import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { authReducer, cartReducer } from "./reducers"
import { thunk } from "redux-thunk"

const rootReduser = combineReducers({
     authorization : authReducer,
     cart : cartReducer
})
export const store = legacy_createStore(rootReduser,applyMiddleware(thunk))