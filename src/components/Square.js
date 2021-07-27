import React from "react";
import "./index.css"

export const Square = (props) => {
    return (
        <button
            id="square"
            className="square"
            onClick={() => {
                props.onClick();
            }}
        >
            {props.value}
        </button>
    );
};