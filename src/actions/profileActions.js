import axios from "axios";
import {ERRORS, GET_PRODUCTS, GET_PROFILE, PROFILE_ERROR} from "./types";
import {getServer} from "../util";

export const getProfile = (id)=> async (dispatch)=>{
        try {
            const res = await axios.get(`${getServer()}/api/profile/${id}`);
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: error.response.statusType}
                //statusType retreives the status message from the server (500,400 etc)
            });
        }
}

export const createProfile = (profileData, history) => async (dispatch) =>{
        try {
            const config = { 
                headers: {
                    "Content-Type": "application/json" //setting the headers in React like in Postman
                }
            };
            await axios.post(`${getServer()}/api/profile`, profileData, config)
            .then((res)=> history.push("/dashboard/profile"));
            
             
        } catch (error) {
            const err = error.response.data.errors; //grabbing the error from the backend
        if(err){
            dispatch({
                type: ERRORS,
                payload:err
            });
            
        }
        else{
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: error.response.statusType}
            });
        }
        }
        
}

export const deleteAccount = (history) => async (dispatch) =>{
        try {
            await axios.delete(`${getServer()}/api/profile/`)
            .then((_)=>{
                localStorage.removeItem("token");
                history.push("/");
            })
        } catch (error) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: error.response.statusType}
                //statusType retreives the status message from the server (500,400 etc)
            });
        }
}