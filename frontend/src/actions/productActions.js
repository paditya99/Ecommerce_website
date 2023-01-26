import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAILURE, CLEAR_ERRORS } from "../constants/productConstants";
import axios from 'axios';

export const getproducts=()=>async(dispatch)=>{
    try {
        
        dispatch({type: ALL_PRODUCT_REQUEST})

        const {data}=await axios.get('/api/products');

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        
        dispatch({
            type: ALL_PRODUCT_FAILURE,
            payload: error.response.data.message
            
        })
    }
}

export const clearErrors=()=>async(dispatch)=>{
    dispatch({type: CLEAR_ERRORS})
}