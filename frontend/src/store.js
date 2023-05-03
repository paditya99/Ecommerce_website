import { legacy_createStore, applyMiddleware, combineReducers} from 'redux';
//import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import { productReducers } from './reducers/productReducers';
import { productDetailsReducers } from './reducers/productReducers';
import { userReducers } from './reducers/userReducers';
import { cartReducers } from './reducers/cartReducers';
import { contactReducers } from './reducers/contactReducers';

const RootReducer=combineReducers({
    products: productReducers,
    productDetails: productDetailsReducers,
    user: userReducers,
    cart: cartReducers,
    contact: contactReducers
})
 
let initialState={
    cart:{
        cartItems: JSON.parse(localStorage.getItem('cartItems')),
        shippingInfo: JSON.parse(localStorage.getItem('shippingInfo'))
    }
}

const middleware=[thunk]

const store=legacy_createStore(RootReducer,initialState, composeWithDevTools(applyMiddleware(...middleware)));                  //Redux store

export default store;