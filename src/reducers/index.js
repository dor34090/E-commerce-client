import {combineReducers} from "redux";
import authRedcuer from "./authRedcuer";
import productReducer from "./productReducer";
import profileReducer from "./profileReducer";
import cartReducer from "./cartReducer";

//the master construct for all reducers
export default combineReducers({
    auth: authRedcuer,
    products: productReducer,
    profile: profileReducer,
    cart: cartReducer,
});