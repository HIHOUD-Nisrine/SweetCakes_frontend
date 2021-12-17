import React, { useRef, useState } from "react";
import { COLORS } from "../assets/theme";

const UploadFile = ({ data, setData, name }) => {



    const inputFile = useRef(null)
    const [imgUrl, setImgUrl] = useState(null);

    const updateValue = (e) => {
        setData({
            ...data,
            [name]: e.target.files[0],
        });

        setImgUrl(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div>
            <div className="file-upload">
                <div className="file-upload-select" onClick={() => inputFile.current.click()}>
                    <div className="file-select-button">Choose File</div>
                    <div className="file-select-name">
                        {
                            imgUrl !== null ?
                                `${data[name].name.slice(0,17)}...`
                                :
                                data[name] !== "" ?
                                    data[name]
                                    :
                                    "No file choosen..."
                        }
                    </div>
                    <input
                        type="file"
                        name={name}
                        ref={inputFile}
                        onChange={updateValue}
                        accept="image/png, image/jpeg"
                    />
                </div>
            </div>

            <div
                style={{
                    width: "200px",
                    // height: "300px",
                    // borderRadius: 25,
                    // boxShadow: "3px 5px 8px rgba(0,0,0,0.2)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                }}
            >
                {imgUrl !== null ?

                    <img src={imgUrl} alt={data[name].name} style={{ width: "100%" }} />
                    :
                    data[name] !== "" ?
                        <img src={`http://localhost:8080/uploads/${data[name]}`} alt={data[name]} style={{ width: "100%" }} />
                        :
                        <i className="fas fa-images" style={{ color: COLORS.purple.primary, fontSize: 100 }}></i>
                }

            </div>
        </div>
    )
}

export default UploadFile;