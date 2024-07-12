import { signUpRequest, signUpSuccess, signUpFail, viewProfileSuccess, updateProfileSuccess, updateProfileRequest, updateProfileFail } from '../slice/authSlice';
import axios from 'axios';

//signup
export const signUp = (userData) => async (dispatch) => {
    try {
        dispatch(signUpRequest());

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        const { data } = await axios.post('http://localhost:3003/api/register', userData, config);
        localStorage.setItem('token', JSON.stringify(data.token));
        dispatch(signUpSuccess(data));
    } catch (error) {
        dispatch(signUpFail(error.response.data.message));

    }
};



//get profile
export const getUserProfile = () => async (dispatch) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const userId = storedUser?.user?._id; 
      if (!userId) {
        throw new Error('User ID not found in localStorage');
      }
  
      const response = await axios.get(`http://localhost:3003/api/getuser/${userId}`);
      dispatch(viewProfileSuccess(response.data.user));
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };


  //update profile
  export const updateProfile = (userData) => async  (dispatch) => {
    try {
        dispatch(updateProfileRequest())

        const storedUser = JSON.parse(localStorage.getItem('user'));
        const userId = storedUser?.user?._id; 
        if (!userId) {
          throw new Error('User ID not found in localStorage');
        }

        const response = await axios.put(`http://localhost:3003/api//edit/${userId}`,userData)
        dispatch(updateProfileSuccess(response.data.user))

    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message))
    }
}