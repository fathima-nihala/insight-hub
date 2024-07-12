import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    employee: [],
    loading: false,
    error: null,
    singleEmployee: null,
    // searchQuery: '',
};

const employeeeState = createSlice({
    name: 'emp',
    initialState,

    reducers: {
        createRequest(state) {
            return {
                ...state,
                loading: true,
                error: null,
            };
        },
        createSuccess(state, action) {
            return {
                ...state,
                loading: false,
                employee: action.payload,
            };
        },
        createFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        getAllRequest(state) {
            return {
                ...state,
                loading: true,
                error: null,
            };
        },
        getAllSuccess(state, action) {
            return {
                ...state,
                loading: false,
                employee: action.payload,
            }
        },
        getAllFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        },
        getSingleRequest(state) {
            return {
                ...state,
                loading: true,
                error: null,
            };
        },
        getSingleSuccess(state, action) {
            return {
                ...state,
                loading: false,
                singleEmployee: action.payload,
            };
        },
        getSingleFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
        setSearchQuery(state, action) {
           return{
            ...state,
            employee:action.payload
           }
        },
        

    }
});

export const { createRequest, createSuccess, createFail, getAllRequest, getAllSuccess, getAllFail, getSingleRequest, getSingleSuccess, getSingleFail, setSearchQuery } = employeeeState.actions;
export default employeeeState.reducer;
