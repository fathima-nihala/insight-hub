import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice';
import employeeRedcer from '../slice/employeeSlice'
import {thunk} from 'redux-thunk'



const reducer = combineReducers({
    authState:authReducer,
    empState:employeeRedcer,
})

const store = configureStore({
    reducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(thunk)
    
})

export default store;