import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice';
import employeeRedcer from '../slice/employeeSlice'


const reducer = combineReducers({
    authState:authReducer,
    empState:employeeRedcer,
})

const store = configureStore({
    reducer,
})

export default store;