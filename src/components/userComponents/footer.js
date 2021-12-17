import React from "react";
import styled, { css } from "styled-components";
import '../../index.css';
import Logo from "../../assets/images/logo.png";




function Footer() {

    const Box = styled.div`
padding: 18px 60px;
background: #484646;
position: relative;
bottom: 0;
@media (max-width: 1000px) {
  padding: 16px 30px;
}
`;
const LogoImg = styled.img`
width: 28em;
height: 6em;
display: block;
  margin-left: auto;
  margin-right: auto

`;
    return(

        <Box>
        <LogoImg src={Logo} />
        <h2 style={{
            color: "white",
            textAlign: "center"
        }}>
            SweetCakes @ Copyright 2021
        </h2>
       </Box>
    );
}
export default Footer