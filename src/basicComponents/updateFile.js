import React, { useRef } from "react";
import { COLORS } from "../assets/theme";
import styled from "styled-components";
import axios from "axios";

const UpdateIcon = styled.i`
    position:absolute;
    top:10px;
    right:10px;
    background-color:${COLORS.purple.primary};
    padding:10px;
    text-align:center;
    color:white;
    border-radius: 50%;
    font-size:13px;
    cursor:pointer;
    transition: .3s ease-in-out;

    &:hover{
        background-color:${COLORS.purple.hover}
    }
`;

const InputFile = styled.input`
    display:none;
`

const UpdateFile = ({ data, setData, name ,url}) => {

    const URL = "http://localhost:8080/api/";
    const IMAGEPATH = "http://localhost:8080/uploads/";
    const inputFile = useRef(null)

    const updateValue = (e) => {
        let imageToU = new FormData();
        imageToU.append("image", e.target.files[0]);
        let id = "id_"+url
        axios.put(`${URL+url}/${data[id]}/update/image`, imageToU).then(res => {
            if (Object.keys(res.data).length > 0){
                console.log("resdara : ",res.data.image )
                setTimeout(() => 
                    setData({
                        ...data,
                        [name]: res.data.image,
                    }),1000
                );
            }
        });
    }

    return (
        <div>
            <div className="file-upload">

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        marginTop: 30
                    }}
                >
                    <div
                        style={{
                            width: "200px",
                            marginTop: 20,
                            position: "relative",
                            marginRight: 30
                        }}
                    >
                        <UpdateIcon className="fas fa-pen" onClick={() => inputFile.current.click()}></UpdateIcon>
                        {data[name] !== "" && <img src={IMAGEPATH+data[name]} alt={data.description} style={{ width: "100%" }} />}

                    </div>
                </div>

                <InputFile
                    type="file"
                    name={name}
                    ref={inputFile}
                    onChange={updateValue}
                    accept="image/png, image/jpeg"
                />
            </div>
        </div>
    )
}

export default UpdateFile;