
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signUpRequest(state) {
            return {
                ...state,
                loading: true,
                error: null,
            };
        },
        signUpSuccess(state, action) {
            const user = action.payload;
            localStorage.setItem('user', JSON.stringify(user));
            return {
                ...state,
                loading: false,
                user,
                isAuthenticated: true,
            };
        },
        signUpFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        viewProfileSuccess(state, action) {
            const user = action.payload;
            return {
                ...state,
                loading: false,
                user, 
                isAuthenticated: true,
            };
        },updateProfileRequest(state, action) {
            return {
                ...state,
                loading: true,
                isUpdated: false
            }
        },
        updateProfileSuccess(state, action) {
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                isUpdated: true
            }
        },
        updateProfileFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
       
      
    },
});

export const { signUpRequest, signUpSuccess, signUpFail,viewProfileSuccess,updateProfileRequest, updateProfileSuccess, updateProfileFail } = authSlice.actions;
export default authSlice.reducer;
