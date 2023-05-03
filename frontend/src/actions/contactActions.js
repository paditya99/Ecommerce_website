import {CONTACT_FORM} from '../constants/contactConstants';
import axios from "axios";

export const createContact=(contactdata)=>async(dispatch)=>{

    const {data} =await axios.post("/api/contact",contactdata);
    dispatch({type: CONTACT_FORM, payload:data.contact});
}