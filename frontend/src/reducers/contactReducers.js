import {CONTACT_FORM} from '../constants/contactConstants';

export const contactReducers=(state={contact: {}},action)=>{
    switch(action.type){
        case CONTACT_FORM:
            return{
                ...state,
                contact: action.payload
            }
        
            default: return state;
    }
}

