import axios from "axios";
import { setAlert } from "./alert";
import api from "../utils/api.js"
// import { useNavigate } from "react-router-dom";


import{
  GET_PROFILES,
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    ACCOUNT_DELETED
} from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch =>{
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
        
    }
}

//Get all profiles
export const getProfiles = () => async dispatch =>{
  dispatch({type:CLEAR_PROFILE})
  try {
      const res = await axios.get('/api/profile');

      dispatch({
          type: GET_PROFILES,
          payload: res.data
      })
      
  } catch (err) {
      dispatch({
          type:PROFILE_ERROR,
          payload:{msg:err.response.statusText, status:err.response.status}
      })
      
  }
}

//Get  profile by id
export const getProfileById = userId => async dispatch =>{
  try {
      const res = await axios.get(`/api/profile/user/${userId}`);

      dispatch({
          type: GET_PROFILE,
          payload: res.data
      })
      
  } catch (err) {
      dispatch({
          type:PROFILE_ERROR,
          payload:{msg:err.response.statusText, status:err.response.status}
      })
      
  }
}


//create or update profile

export const createProfile = (formData,history,edit = false) => async dispatch =>{
// const navigate = useNavigate()

    try {
        const config={
            header:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile',formData,config);
        console.log(res)
        dispatch({
            type:GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Profile Updated': 'Profile Created','success'))
console.log(edit)
        // if(!edit){
        //     navigate.push('/dashboard')

        // }
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(err)
        

        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
  


        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
        
    }
}

// ADD EXPERIEMCE

export const addExperience = (formData,history) => async (dispatch) => {
    try {
        const config={
            header:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience',formData,config);
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert( 'Experience Added','success'))

            // history.push('/dashboard')

        
    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
  


        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
        
    }
  };

  // ADD EDUCATION

export const addEducation = (formData,history) => async (dispatch) => {
    try {
        const config={
            header:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/education',formData,config);
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert( 'Education Added','success'))

            // history.push('/dashboard')

        
    } catch (err) {

        const errors = err.response.data.errors;

        if (errors) {
          errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }
  


        dispatch({
            type:PROFILE_ERROR,
            payload:{msg:err.response.statusText, status:err.response.status}
        })
        
    }
  };


  // Delete experience
export const deleteExperience = (id) => async (dispatch) => {
    try {
      const res = await api.delete(`/profile/experience/${id}`);
  
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  // Delete education
export const deleteEducation = (id) => async (dispatch) => {
    try {
      const res = await api.delete(`/profile/education/${id}`);
  
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
  
      dispatch(setAlert('Education Removed', 'success'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

  //Delete account and profile
  export const deleteAccount = () => async (dispatch) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      try {
        await api.delete('/profile');
  
        dispatch({ type: CLEAR_PROFILE });
        dispatch({ type: ACCOUNT_DELETED });
  
        dispatch(setAlert('Your account has been permanently deleted'));
      } catch (err) {
        dispatch({
          type: PROFILE_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status }
        });
      }
    }
  };