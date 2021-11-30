import React from "react";
import { FONTS } from "../assets/theme";

const Select = ({ label, options, disabled, width, name, data, setData }) => {

    const updateValue = (e) => {
        setData({
            ...data,
            [name]: e.target.value
        });
    }

    return (
        <div
            style={{
                width: width,
            }}
        >
            <p
                style={{
                    ...FONTS.label,
                    marginBottom: "5px"
                }}
            >
                {label}
            </p>
            <select
                className="select-css"
                name={name}
                onChange={updateValue}
                defaultValue={data[name]}
                disabled={disabled ? "disabled" : ""}

            >
                <option>Choose</option>
                {
                    options.map((option, i) => (
                        <option key={i} value={option} >{option}</option>
                    ))
                }
            </select>


        </div>

    )
}

export default Select
