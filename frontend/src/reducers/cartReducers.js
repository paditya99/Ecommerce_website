import { ADD_TO_CART_SUCCESS,ADD_TO_CART_REQUEST,ADD_TO_CART_FAILURE,CLEAR_ERRORS,
    LOAD_ITEM_REQUEST,LOAD_ITEM_SUCCESS,LOAD_ITEM_FAILURE,REMOVE_CART_ITEM
 } from "../constants/cartConstants";

export const cartReducers=(state={cartItems:[]},action)=>{

    switch(action.type) {
        // case ADD_TO_CART_REQUEST:
        //     case LOAD_ITEM_REQUEST:
        //     return {
        //         loading: true,
        //         isAdded:false,
        //         ...state
        //     }
        

        case ADD_TO_CART_SUCCESS:
            // case LOAD_ITEM_SUCCESS:
            const item=action.payload;

            const isExists=state.cartItems.find(
                (i)=> i.product===item.product
            )

            if(isExists){
                return{
                    ...state,
                    // isAdded:true,
                    // loading: false,
                    cartItems: state.cartItems.map((i)=>
                        i.product===isExists.product ? item: i
                        
                    )
                } 
            }
            else{
                return{
                    ...state,
                    // isAdded:true,
                    // loading: false,
                    cartItems: [...state.cartItems, item]
                }
            }

            case REMOVE_CART_ITEM:
                return{
                    ...state,
                    cartItems: state.cartItems.filter((i)=> i.product !== action.payload)
                }

        

            // case ADD_TO_CART_FAILURE:
            //     case LOAD_ITEM_FAILURE:
            //     return{
            //         loading: false,
            //         isAdded:false,
            //         error: action.payload
            //     }
            
            // case CLEAR_ERRORS: return{
            //         ...state,
            //         error: null
            //     }

        default: return state;
    }


}
