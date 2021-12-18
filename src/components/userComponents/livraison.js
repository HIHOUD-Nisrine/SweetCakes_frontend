import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import '../../index.css';
import BackgroundImg from "../../assets/images/livraison.jpg";
import { COLORS } from "../../assets/theme";
import Logo from "../../assets/images/logo.png";
import { ReviewsSection } from "../userComponents/reviewsSection";
import FormLivr from "./formLivr";
import { Button, Marginer, SectionTitle } from '../../basicComponents';



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
const HorizontalRule = styled.hr`
width:12%;
height: 0.31rem;
border-radius: 0.8rem;
border: none;
background: linear-gradient(to right,#130031 0%, #AB7CF7  90%);
backdrop-filter: blur(25px);
margin:0;

`;

const livraison = () => {
  return (
    <>
      <TopContainer >
        <BackgroundFilter>
          <Navbar />
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
      <Marginer direction="vertical" margin="3em" />
      <SectionTitle>Demande de Livraison<HorizontalRule /></SectionTitle>
      <FormLivr />
      <Marginer direction="vertical" margin="3em" />
      <SectionTitle>Messages de nos clients<HorizontalRule /></SectionTitle>
      <Marginer direction="vertical" margin="3em" />
      <ReviewsSection />

      <Marginer direction="vertical" margin="3em" />

      <Box>
        <LogoImg src={Logo} />
        <h2 style={{
          color: "white",
          textAlign: "center"
        }}>
          SweetCakes @ Copyright 2021
        </h2>
      </Box>
    </>
  );
};
export default livraison;