import { CarouselProvider, DotGroup, Slide, Slider } from "pure-react-carousel";
import React from "react";
import { Element } from "react-scroll";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { ReviewCard,Marginer } from '../../basicComponents';


import "pure-react-carousel/dist/react-carousel.es.css";

import User1Img from "../../assets/images/profiles/Ech-charfi.jpeg";
import User2Img from "../../assets/images/profiles/Anssaien.jpeg";
import User3Img from "../../assets/images/profiles/Mestour.jpeg";
import User4Img from "../../assets/images/profiles/Nissrine.jpeg";
import User5Img from "../../assets/images/profiles/oussama.jpg";


const ReviewsContainer = styled(Element)`
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCarouselProvider = styled(CarouselProvider)`
  width: 70%;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const StyledSlide = styled(Slide)`
  .carousel__inner-slide {
    display: flex;
    justify-content: center;
  }
`;

const StyledDotGroup = styled(DotGroup)`
  margin: auto;
  display: flex;
  justify-content: center;
  button {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: #e4e4e4;
    border: none;
    outline: none;
    &:not(:last-of-type) {
      margin-right: 3px;
    }
  }

  .carousel__dot--selected {
    background-color: #AB7CF7;
  }
`;

export function ReviewsSection(props) {
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });

  return (
    <ReviewsContainer>

      <Marginer direction="vertical" margin="3em" />
      <StyledCarouselProvider
        naturalSlideWidth={200}
        naturalSlideHeight={isMobile ? 250 : 205}
        totalSlides={5}
        visibleSlides={isMobile ? 1 : 2}
        dragEnabled={false}
      >
        <Slider>
        <StyledSlide index={0}>
            <ReviewCard
              reviewText=" I very much enjoyed working with Beema and the team - they have an excellent grasp of their subject, and have created something great for us."
              username="ECH-CHARFI Chaimae"
              userImgUrl={User1Img}
            />
          </StyledSlide>
          <StyledSlide index={1}>
            <ReviewCard
              reviewText=" I very much enjoyed working with Beema and the team - they have an excellent grasp of their subject, and have created something great for us."
              username="ANSSAIEN Ayat"
              userImgUrl={User2Img}
            />
          </StyledSlide>
          
          <StyledSlide index={2}>
            <ReviewCard
              reviewText=" I very much enjoyed working with Beema and the team - they have an excellent grasp of their subject, and have created something great for us."
              username="MESTOUR Chaymae"
              userImgUrl={User3Img}
            />
          </StyledSlide>
          <StyledSlide index={3}>
            <ReviewCard
              reviewText=" I very much enjoyed working with Beema and the team - they have an excellent grasp of their subject, and have created something great for us."
              username="HIHOUD Nisrine"
              userImgUrl={User4Img}
            />
          </StyledSlide>
          <StyledSlide index={4}>
            <ReviewCard
              reviewText=" I very much enjoyed working with Beema and the team - they have an excellent grasp of their subject, and have created something great for us."
              username="AOULAD LAHCENE Oussama"
              userImgUrl={User5Img}
            />
          </StyledSlide>
     
        </Slider>

        <StyledDotGroup />
      </StyledCarouselProvider>
    </ReviewsContainer>
  );
}
