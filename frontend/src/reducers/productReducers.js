import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAILURE, CLEAR_ERRORS } from "../constants/productConstants";

export const productReducers=(state={allproducts:[]},action)=>{
    switch(action.type) {
        case ALL_PRODUCT_REQUEST: return{
            loading: true,
            allproducts: []
        }

        case ALL_PRODUCT_SUCCESS: return{
            loading: false,
            allproducts: action.payload.allproducts,
            productsCount: action.payload.productsCount
        }

        case ALL_PRODUCT_FAILURE: return{
            loading: false,
            error: action.payload
        }

        case CLEAR_ERRORS: return{
            ...state,
            error: null
        }

        default: return state;
    }
}