import React from "react";

export const Button = ({onClick, size = "lg", text}) =>{
    const sizeClases = {
        lg: "btn-Big",
        sm: "btn-Small"
    }

    return(
        <div className={`Button ${sizeClases[size]}`} onClick={onClick}>{text}</div>
    )
}