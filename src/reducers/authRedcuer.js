import {
  LOGOUT,
  SET_CURRENT_USER,
  SUCCESFUL_REGISTER,
  ERRORS,
  FAILED_REGISTER,
  AUTH_ERROR,
  SUCCESFUL_LOGIN,
  FAILED_LOGIN,
} from "../actions/types";
import { isEmpty } from "lodash";

//setting the default state
const initialState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token"),
  user: {},
  errors: [],
};

//switching the state values with the action payload if valid
export default function (state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case SUCCESFUL_REGISTER:
    case SUCCESFUL_LOGIN:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };
    case FAILED_REGISTER:
    case FAILED_LOGIN:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };

    case ERRORS:
      localStorage.removeItem("token");
      return {
        ...state,
        errors: payload,
        //when there's an error, the payload is the error
      };
    default:
      return state;
  }
}
