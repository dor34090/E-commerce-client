//the input is a widely used component
//this file will give it a general structure to be used wherever we need
import React from "react";
import propTypes from "prop-types";

const Input = ({type, name, placeholder, value, onChange, style}) =>{
    return (
        <div className="form-group">
            <input type= {type}
            placeholder={placeholder}
            name= {name}
            value= {value}
            onChange={onChange}
            style={style}/>
        </div>
    )
}

Input.propTypes={
    name: propTypes.string,
    placeholder: propTypes.string,
    value: propTypes.string.isRequired,
    type: propTypes.string,
    onChange: propTypes.func.isRequired,
};

export default Input;