import { createStore } from "redux"
import RootReducer from "./RootReducer"
import { applyMiddleware } from "@reduxjs/toolkit"
import thunk from "redux-thunk"

export const store = createStore(
    RootReducer,
    applyMiddleware(thunk)
)