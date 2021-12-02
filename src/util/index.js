import axios from "axios";
import jwtDecode from "jwt-decode";

//we're checking if the user is accessing the site from a developer's standpoint
const isDevelopment = window.location.hostname.includes("localhost");

const getServer=()=>{
    return isDevelopment ? "http://localhost:8080"
     : "https://e-shop-331108.ew.r.appspot.com";
};

const decodeUser = () =>{
    const token= localStorage.getItem("token")
    return jwtDecode(token);
}

export {getServer, decodeUser};