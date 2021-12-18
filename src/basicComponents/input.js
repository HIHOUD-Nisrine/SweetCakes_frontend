import React from "react";
import { COLORS, FONTS } from "../assets/theme";
import styled from "styled-components";


const InputS = styled.input`
    width: 100%;
    box-shadow: 3px 5px 8px rgba(0,0,0,0.2);
    outline: none;
    border: none;
    border-radius: 25px;
    padding : 10px;
    transition: .3s ease-in-out;
    font-size:20;
    color:black;

    &:focus{
        background-color: ${COLORS.inputFocus};
        color:black;
    },

    ::placeholder,
    ::-webkit-input-placeholder {
        font-size:8;
        color:${COLORS.gray};
        font-weight:lighter;
    }
    ::-ms-input-placeholder {
        font-size:8;
        color:${COLORS.gray};
        font-weight:lighter;
    }
`;


const Input = ({ label, type = "text", name, data, setData, disabled = false, width, step,icon = "", placeholder = "", onClickIcon,labelColor=COLORS.gray }) => {

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
                position: "relative",
            }}
        >
            <p
                style={{
                    ...FONTS.label,
                    color:labelColor,
                    marginBottom: "5px"
                }}
            >
                {label}
            </p>

            <InputS
                value={data[name]}
                type={type}
                onChange={updateValue}
                name={name}
                disabled={disabled ? "disabled" : ""}
                placeholder={placeholder}
                step={step}
                min="0"/>

            {icon !== "" ?

                <i
                    onClick={onClickIcon}
                    style={{
                        position: "absolute",
                        right: "10px",
                        bottom: "8px",
                        color: COLORS.purple.primary,
                        fontSize: 20,
                        cursor: "pointer",

                    }}

                    className={`fas fa-${icon}`}></i>

                : <> </>
            }
            
            {
                type === "color" && (
                    <div
                        style={{
                            position: "absolute",
                            right: "-30px",
                            bottom: "0px",
                            width:"22px",
                            height:"22px",
                            borderRadius:"50%",
                            backgroundColor:data[name],
                            boxShadow:"3px 5px 8px rgba(0,0,0,0.2)"
                        }}
                    >
                    </div>
                )
            }
        </div>
    )
}

export default Input;