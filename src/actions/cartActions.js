import axios from "axios";
import {getServer} from "../util";
import { GET_CART, ERRORS } from "./types";


export const addToCart = (context) => (dispatch)=>{
    const config = { 
        headers: {
            "Content-Type": "application/json" //setting the headers in React like in Postman
        }
    }
    return axios.post(`${getServer()}/api/cart`, context, config).then(res =>{
        dispatch({
            type: GET_CART,
            payload: res.data
        })
    }).catch(error =>{
        dispatch({
            type: ERRORS,
            payload: error
        })
    });
};

export const getCart = () => (dispatch) => {
    axios.get(`${getServer()}/api/cart`).then(res=>{
        dispatch({
            type: GET_CART,
            payload: res.data
        })
    }).catch(error =>{
        dispatch({
            type: ERRORS,
            payload: error
        })
        
    })
}

export const removeFromCart = (context) => (dispatch) =>{
    const config = { 
        headers: {
            "Content-Type": "application/json" //setting the headers in React like in Postman
        }
    }
    const {id} = context;
    return axios.put(`${getServer()}/api/cart/${id}`, context, config)
                .then(res=>{
                    dispatch({
                        type: GET_CART,
                        payload: res.data
                    })
                }).catch(error=>{
                    dispatch({
                        type: ERRORS,
                        payload:error
                    })
                })
}