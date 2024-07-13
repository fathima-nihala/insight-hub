import axios from "axios";
import { createFail, createRequest, createSuccess, deleteEmpFail, deleteEmpRequest, deleteEmpSuccess, getAllFail, getAllRequest, getAllSuccess, getSingleFail, getSingleRequest, getSingleSuccess } from "../slice/employeeSlice";

//create employee
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
        return data;
    } catch (error) {
        dispatch(createFail(error.response?.data?.message || 'Something went wrong'));
        throw error;
    }
}

//get all employee & search
export const getAllEmp = (query = {}) => async (dispatch) => {
    try {
        dispatch(getAllRequest());
        const response = await axios.get('http://localhost:3003/api/getall', {
            params: query,
        });
        dispatch(getAllSuccess(response.data));
        console.log(response.data, "response data");
        return response.data;
    } catch (error) {
        dispatch(getAllFail(error));
    }
};

//get employee by id
export const getEmployee = (id) => async (dispatch) => {
    try {
      dispatch(getSingleRequest());
      const response = await axios.get(`http://localhost:3003/api/getall/${id}`);
      dispatch(getSingleSuccess(response.data));
      console.log(response.data, 'hhhhh');
      return response.data;     
    } catch (error) {
      dispatch(getSingleFail(error.message));
    }
  };

  //edit employee
  export const EditEmployee =  async (formData,id) =>{
    try {
        const response = await axios.put(`http://localhost:3003/api/employee/${id}`,formData)
        return response.data
    } catch (error) {
        console.log(error);
        throw error;
    }
  }



  //delete employee
//   export const deleteEmployee = async (id) => {
//     try {
//         const response = await axios.delete(`http://localhost:3003/api/delete/${id}`);
//         console.log(response, 'successfully completed');
//     } catch (error) {
//         console.log(error);
//     }
// };

export const deleteEmployee = (id) => async (dispatch) => {
    try {
      dispatch(deleteEmpRequest());
      const response = await axios.delete(`http://localhost:3003/api/delete/${id}`);
      console.log(response, 'successfully completed');
      dispatch(deleteEmpSuccess(response.data));
    } catch (error) {
      console.log(error);
      dispatch(deleteEmpFail(error.response?.data?.message || error.message));
    }
  };