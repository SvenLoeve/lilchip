import React from "react";
import "./Button.css";

const Button = ({ onClick, label, variant }) => {
    return (
        <button className={`custom-button ${variant === "1" ? "button-variant-1" : variant === "2" ? "button-variant-2" : "button-variant-3"
            }`} onClick={onClick}>
            {label}
        </button>
    )
}

export default Button;