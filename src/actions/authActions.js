import axios from "axios";
import setAuthToken from "../util/setAuthToken";
import { getServer } from "../util";
import {
  LOGOUT,
  AUTH_ERROR,
  SET_CURRENT_USER,
  SUCCESFUL_REGISTER,
  FAILED_REGISTER,
  ERRORS,
  SUCCESFUL_LOGIN,
  FAILED_LOGIN,
} from "./types";

export const setCurrentUser = (user) => async (dispatch) => {
  //sets the state "user"
  if (localStorage.token) {
    //the token you receive upon login is store in localStorage
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`${getServer()}/api/auth`);
    dispatch({
      type: SET_CURRENT_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
  return {
    type: SET_CURRENT_USER, //gives the user the type
    payload: user, //sets the payload the user contains
  };
};

export const setRole = (user) => async (dispatch) => {
  try {
    const res = await axios.post(`${getServer()}/api/auth/changeRole`);
    dispatch({
      type: SET_CURRENT_USER,
      paylod: res.data,
    });
  } catch (error) {
    dispatch({
      type: ERRORS,
    });
  }
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};

//register a user
export const register = (userData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json", //setting the headers in React like in Postman
    },
  };
  try {
    const res = await axios.post(`${getServer()}/api/users`, userData, config); //sending the data to the route we set in the backend

    dispatch({
      type: SUCCESFUL_REGISTER,
      payload: res.data,
    });
    dispatch(setCurrentUser());
  } catch (error) {
    const err = error.response.data.errors; //grabbing the error from the backend
    if (err) {
      dispatch({
        type: ERRORS,
        payload: err,
      });
    } else {
      dispatch({
        type: FAILED_REGISTER,
      });
    }
  }
};

//login user
export const login = (userData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json", //setting the headers in React like in Postman
    },
  };
  try {
    const res = await axios.post(`${getServer()}/api/auth`, userData, config); //sending the data to the route we set in the backend
    dispatch({
      type: SUCCESFUL_LOGIN,
      payload: res.data,
    });
    dispatch(setCurrentUser);
  } catch (err) {
    const error = err.response.data.errors;
    if (error) {
      await dispatch({
        type: ERRORS,
        payload: error,
      });
    } else {
      dispatch({
        type: FAILED_LOGIN,
      });
    }
  }
};

export const logout = () => (dispatch) => dispatch({ type: LOGOUT });
