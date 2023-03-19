import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAILURE, PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAILURE,
     CLEAR_ERRORS } from "../constants/productConstants";
import axios from 'axios';

export const getproducts=(word="",currentPage=1,price=[0,25000],category,ratings=0)=>async(dispatch)=>{
    try {
        
        dispatch({type: ALL_PRODUCT_REQUEST})
        
        let link=`/api/products?keyword=${word}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if(category){
            if(category=="All"){
                category=""
            }
            link=`/api/products?keyword=${word}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }
        
        if(ratings==null){
            ratings=0;
            link=`/api/products?keyword=${word}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        }

        const {data}=await axios.get(link);
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

export const getProductDetails=(id)=>async(dispatch)=>{
    try {
        
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const {data}=await axios.get(`/api/products/${id}`);
        console.log(data);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        
        dispatch({
            type: PRODUCT_DETAILS_FAILURE,
            payload: error.response.data.message
            
        })
    }
}

export const clearErrors=()=>async(dispatch)=>{
    dispatch({type: CLEAR_ERRORS})
}