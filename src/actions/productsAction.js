import axios from "axios";
import {GET_PRODUCTS,GET_PRODUCT, PRODUCT_ERROR} from "./types";
import {getServer} from "../util";

export const getProducts = () => async dispatch =>{
    try {
        const res = await axios.get(`${getServer()}/api/products`);
        dispatch ({
            type: GET_PRODUCTS,
            payload: res.data
            
        })
    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: {status: err.response.status},
        })
    }
};

export const addProduct = (productData, history) => async (dispatch)=>{
    const config={
        headers:{
            "Content-Type": "application/json"
        },
    };
    try {
        await axios.post(`${getServer()}/api/products`, productData, config)
        .then((res)=> history.push("/dashboard/products"));
        //that way the user will be sent to the products page as soon as the product is created
    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: {status: err.response},
        })

        
    }
};

//getting a specific merchant's products
export const getInstructorProducts=(id)=> async dispatch=>{
    try {
        await axios.get(`${getServer()}/api/products/instructors/${id}`).then(res =>{
            dispatch({
                type: GET_PRODUCTS,
                payload: res.data
            })
        });

    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: {status: err.response},
        })
    }
};


export const getProduct=(id)=> async dispatch=>{
    try {
        await axios.get(`${getServer()}/api/products/${id}`).then(res =>{
            dispatch({
                type: GET_PRODUCT,
                payload: res.data
            })
        });

    } catch (err) {
        dispatch({
            type: PRODUCT_ERROR,
            payload: {status: err.response},
        })
    }
};