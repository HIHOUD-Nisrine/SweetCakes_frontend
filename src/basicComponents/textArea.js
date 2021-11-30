import React from "react";
import { COLORS, FONTS } from "../assets/theme";
import styled from "styled-components";

const TextA = styled.textarea`
    width: ${props => props.width};
    box-shadow: 3px 5px 8px rgba(0,0,0,0.2);
    outline: none;
    border: none;
    border-radius: 15px;
    padding: 10px;
    resize: none;
    font-size:8;
    color:${COLORS.gray};
    font-weight:lighter;
    transition: .3s ease-in-out;

    &:focus{
        background-color: ${COLORS.inputFocus};
        color:black;
    },
`;

const TextArea = ({ label, name, rows, width, data, setData }) => {

    const updateValue = (e) => {
        setData({
            ...data,
            [name]: e.target.value
        });
    }

    return (
        <div>
            <p
                style={{
                    ...FONTS.label,
                    marginBottom: "5px"
                }}
            >
                {label}
            </p>
            <TextA
                rows={rows}
                width={width}
                name={name}
                onChange={updateValue}
                value={data[name]}
            />
        </div>

    )
}

export default TextArea