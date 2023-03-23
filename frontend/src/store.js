import { legacy_createStore, applyMiddleware, combineReducers} from 'redux';
//import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import { productReducers } from './reducers/productReducers';
import { productDetailsReducers } from './reducers/productReducers';
import { userReducers } from './reducers/userReducers';

const RootReducer=combineReducers({
    products: productReducers,
    productDetails: productDetailsReducers,
    user: userReducers,
})

let initialState={

}

const middleware=[thunk]

const store=legacy_createStore(RootReducer,initialState, composeWithDevTools(applyMiddleware(...middleware)))                  //Redux store

export default store