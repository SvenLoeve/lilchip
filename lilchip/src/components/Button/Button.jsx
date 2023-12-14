import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

const Button = ({ onClick, label, variant, route }) => {

    //conditional rendering based on whether you want the button to navigate or not
    if (route) {
        return (
            <Link to={route}>
                <button className={`custom-button ${variant === "1" ? "button-variant-1" : variant === "2" ? "button-variant-2" : variant === "3" ? "button-variant-3" : "button-variant-4"
                    }`} onClick={onClick}>
                    {label}
                </button>
            </Link>
        )
    } else {
        return (
            <button className={`custom-button ${variant === "1" ? "button-variant-1" : variant === "2" ? "button-variant-2" : variant === "3" ? "button-variant-3" : "button-variant-4"
                }`} onClick={onClick}>
                {label}
            </button>
        )
    }

}

export default Button;