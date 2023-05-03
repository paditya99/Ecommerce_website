import axios from "axios";
import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE, REGISTER_REQUEST,REGISTER_SUCCESS,REGISTER_FAILURE, CLEAR_ERRORS,
    LOAD_USER_REQUEST,LOAD_USER_SUCCESS,LOAD_USER_FAILURE, LOGOUT_SUCCESS, LOGOUT_FAILURE
} from "../constants/userConstants";

//Login user
export const login=(email,password)=>async(dispatch)=>{

    try{
        dispatch({type: LOGIN_REQUEST});
        const config={headers:{"Content-Type": "application/json"}};

        const {data} =await axios.post("/api/login",{email,password},config);
        dispatch({type: LOGIN_SUCCESS, payload:data.user});
    }
    catch(error){
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response.data.message
            
        })
    }

}

//Register user
export const register=(userData)=>async(dispatch)=>{

    try{
        dispatch({type: REGISTER_REQUEST});
        const config={headers:{"Content-Type": "multipart/form-data"}};

        const {data} =await axios.post("/api/register",userData,config);
        dispatch({type: REGISTER_SUCCESS, payload:data.user});
    }
    catch(error){
        dispatch({
            type: REGISTER_FAILURE,
            payload: error.response.data.message
            
        })
    }

}

//Load user details
export const loadUser=()=>async(dispatch)=>{

    try{
        dispatch({type: LOAD_USER_REQUEST});

        const {data} =await axios.get("/api/me");
        dispatch({type: LOAD_USER_SUCCESS, payload:data.user});
    }
    catch(error){
        dispatch({
            type: LOAD_USER_FAILURE,
            payload: error.response.data.message
            
        })
    }

}

//Logout user
export const logout=()=>async(dispatch)=>{

    try{
        await axios.get("/api/logout");
        dispatch({type: LOGOUT_SUCCESS});
    }
    catch(error){
        dispatch({
            type: LOGOUT_FAILURE,
            payload: error.response.data.message
            
        })
    }

}

//Clear Errors
export const clearErrors=()=>async(dispatch)=>{
    dispatch({type: CLEAR_ERRORS})
}