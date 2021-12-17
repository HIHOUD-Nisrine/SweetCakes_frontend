import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import { Button, Marginer } from '../../basicComponents';
import BackgroundImg from "../../assets/images/back1.png";
import { COLORS } from "../../assets/theme";
import Logo from "../../assets/images/logo.png";


function TopSection({ cart, setCart }) {

    const TopContainer = styled.div`
        width: 100%;
        height: 100vh;
        padding: 0;
        background-image: url(${BackgroundImg});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    `;


    const BackgroundFilter = styled.div`
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
    `;

    const MotivationalText = styled.h1`
        font-size: 20px;
        font-weight: 200;
        line-height: 1.8;
        color: #fff;
        width:450px;
        text-align: left;
        padding:20px;
    `;

    const Diiv = styled.div`
        align-items: center;
        display: flex;
        flex-direction: row;
        padding:20px;
    `;
    
    return (
        <TopContainer >
            <BackgroundFilter>
                <Navbar cart={cart} setCart={setCart} />
                <Marginer direction="vertical" margin="8em" />
                <img src={Logo} style={{ width: '250px', padding: '30px' }} />
                <MotivationalText>
                    Vous avez besoin de livrer vos tartes pour vos évenements ? Nous sommes
                    là pour vous aidez à etre toujours à temps</MotivationalText>
                <Diiv>
                    <Button width="250px" textColor="white" bgColor={COLORS.purple} text="Livrer vos commandes" type="button" />

                </Diiv>
            </BackgroundFilter>

        </TopContainer>
    );

}
export default TopSection


