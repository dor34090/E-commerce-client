import axios from "axios";

const setAuthToken = token =>{
    if(token){
        //if there is even a token given
        axios.defaults.headers.common["x-auth-token"] = token;
        //setting the token header like we did in PostMan
    }
    else{
        delete axios.defaults.headers.common("x-atuh-token");
    }
}

export default setAuthToken;