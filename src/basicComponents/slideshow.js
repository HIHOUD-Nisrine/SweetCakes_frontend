import React from "react";
import Slider from "react-slick";


const Slideshow = ({ imageList, title }) => {

    var settings = {
        arrows: false,
        dots: true,
        autoplaySpeed: 1500,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: dots => <ul>{dots}</ul>,
        customPaging: i => (
            <div className="custom-dot">
                <i className="fas fa-circle"></i>
            </div>
        ),
    };

    return (
        <div
            style={{
                position:"relative",
                maxWidth: "100vw",
                width: "100%",
                overflow:"hidden",
            }}
        >
            <Slider {...settings} >
                {
                    imageList.map((img, i) => (
                        <div
                            key={i}
                            style={{
                                width: "300px",
                                height: "300px"
                            }}
                        >
                            <img  src={URL.createObjectURL(img)} alt={`img${i}`} style={{ width: "100%", height:"300px" }} />
                        </div>

                    ))
                }
            </Slider>
        </div>
    );
}

export default Slideshow;