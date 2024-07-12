import axios from "axios";
import { createFail, createRequest, createSuccess, getAllFail, getAllRequest, getAllSuccess } from "../slice/employeeSlice";


export const createEmp = (userData) => async(dispatch) => {
    const {name,email,phone,avatar} = userData;
    try {
        dispatch(createRequest());

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        const { data } = await axios.post('http://localhost:3003/api/create', userData, config);
        dispatch(createSuccess(data));
        return data
    } catch (error) {
        dispatch(createFail(error.response?.data?.message || 'Something went wrong'));
    }
}

export const getAllEmp = async (dispatch) =>{
    try {
        dispatch(getAllRequest())
        const response = await axios.get('http://localhost:3003/api/getall');
        dispatch(getAllSuccess(response.data))
        console.log(response.data,"rr")
        return response.data;
    } catch (error) {
        dispatch(getAllFail(error))
    }
}