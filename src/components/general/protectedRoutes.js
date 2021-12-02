
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoutes = ({component:Component, auth, ...rest}) =>{
    return(
     <Route
{...rest}
  render={(props) => auth.isAuthenticated ? <Component {...props}/> : <Redirect to={`/login${rest.location.search}`}/>}
    />
    
    )}

const mapStateToProps = (state) =>({
    auth: state.auth,
})
export default connect(mapStateToProps) (ProtectedRoutes);