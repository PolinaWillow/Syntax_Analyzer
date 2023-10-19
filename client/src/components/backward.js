import React from "react";
import backwardSVG from "../static/svg_img/Backward.svg"

export const Backward = ({link}) => {
    return(
        <img className={"Backward"} src={backwardSVG} onClick={link} alt="backward"></img>
    )
} 