import { ADD_TO_CART_SUCCESS,ADD_TO_CART_REQUEST,ADD_TO_CART_FAILURE,CLEAR_ERRORS,
  LOAD_ITEM_REQUEST,LOAD_ITEM_SUCCESS,LOAD_ITEM_FAILURE,REMOVE_CART_ITEM, SAVE_SHIPPING_INFO
} from "../constants/cartConstants";
import axios from "axios";


//Add to Cart items
export const addToCart = (id, count) => async (dispatch,getState) => {

  try{
    dispatch({type: ADD_TO_CART_REQUEST})
    const { data } = await axios.get(`/api/products/${id}`);
    console.log(data);
      dispatch({
          type: ADD_TO_CART_SUCCESS,   
          payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            count,
          },
          
        });
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
            
  }
  catch (error) {
      
    dispatch({
      type: ADD_TO_CART_FAILURE,
      payload: error.response.data.message
      
  })
  }

};

//Remove items from cart
export const removeFromCart = (id) => async (dispatch,getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,   
    payload: id
  });

localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

};

//Save shipping Info
export const saveShippingInfo = (shipdata) => async (dispatch) => {

  const {data} =await axios.post("/api/order",shipdata);
  
  dispatch({type: SAVE_SHIPPING_INFO, payload:data.shippingInfo});

  localStorage.setItem('shippingInfo', JSON.stringify(data));

}

export const clearErrors=()=>async(dispatch)=>{
  dispatch({type: CLEAR_ERRORS})
}