import React,{useEffect,useState} from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import BackgroundImg from "../../assets/images/back1.png";
import { COLORS } from "../../assets/theme";
import Logo from "../../assets/images/logo.png";
import Cake from "../../assets/images/cake.jpeg";
import CupCake from "../../assets/images/cupcake.jpeg";
import LollyPop from "../../assets/images/lolypop.jpeg";
import Magnum from "../../assets/images/magnum.jpeg";
import Idk from "../../assets/images/idk.jpeg";
import PopCake from "../../assets/images/popcake.jpeg";
import { ReviewsSection } from "../userComponents/reviewsSection";
import Contact from "./ContactPage";
import Services from "./services";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import UsSection from "./usSection";
import { Button,Marginer,SectionTitle } from '../../basicComponents';
import axios from 'axios';

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
width: 13em;
height: 3em;
display: block;
    margin-left: auto;
    margin-right: auto

`;

const TopContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 0;
  background-image: url(${BackgroundImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
    .icon{
        margin-top: 1rem;
        border: 2px solid var(--border-color);
        border-radius: 100%;
        transition: all .4s ease-in-out;
        cursor: pointer;
        &:hover{
            color: var(--primary-color);
        }
        &:not(:last-child){
            margin-right: 1rem;
        }
        svg{
            margin: .5rem;
        }
    }
    .i-facebook{
        &:hover{
            color: blue;
        }
    }
    .i-instagram{
        &:hover{
            color: purple;
        }
    }
    .i-twitter{
        &:hover{
            color: #00B1FF;
        }
    }
}

`;
const Categorie = styled.div`
  width: 100%;
  padding: 0;
  background-color: '"#F6ECFF"';
  display: flex;
  flex-direction: rows;
  justify-content: space-between;

`;

const BackgroundFilter = styled.div`
  width: 100%;
  height: 86vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

const MotivationalText = styled.h1`
  font-size: 20px;
  font-weight: 200;
  line-height: 2;
  color: #fff;
  width:450px;
  text-align: left;
  padding:15px;
`;


const Diiv = styled.div`

  align-items: center;
  display: flex;
  flex-direction: row;
  padding:15px;

`;
const HorizontalRule = styled.hr`
margin:0;
width:12%;
height: 0.31rem;
border-radius: 0.8rem;
border: none;
background: linear-gradient(to right,#130031 0%, #AB7CF7  90%);
backdrop-filter: blur(25px);

`;

const Home = () => {
    
    const[Offers,setOffers]=useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8080/api/offers')
        .then(res=>{
            setOffers(res.data);
            })
            .catch(err=>{
              console.log(err);
          })
      },[])
    return (
        <>
 {
     Offers.map((DM)=>{
         return (
        <div id="promo-outer">
            <div id="promo-inner">
                
                    <strong style={{color:'white'}}>{DM.description}</strong>
                    <Marginer direction="horizontal" margin="6em" />
                    <h3 style={{color:'#C59BF9',textDecoration:'line-through'}}>{DM.prix_initial} DHs</h3>
                    <Marginer direction="horizontal" margin="1em" />
                    <h2 style={{color:'#C59BF9'}}>{DM.prix_final} DHs</h2>
                    <Marginer direction="horizontal" margin="6em" />
                    <strong style={{color:'white'}}>Du {DM.date_debut} Au {DM.date_fin}</strong>
            </div>
        </div> );
})}
            <TopContainer >
                <BackgroundFilter>
                    <Navbar />
                    <Marginer direction="vertical" margin="6em" />
                    <img src={Logo} style={{ width: '250px', padding: '30px' }} />
                    <MotivationalText>
                        Vous avez besoin d'une cake design ou de faire la livraison
                        de vos cake vous etes dans le bon endroit </MotivationalText>
                    <Diiv>
                        <Button width="250px" textColor="white" bgColor={COLORS.purple} text="Commander une cake" type="button" />
                        <Marginer direction="horizontal" margin="15px" />
                        <Button width="100px" textColor="white" bgColor={COLORS.purple} text="Livraison" type="button" />
                    </Diiv>
                </BackgroundFilter>
                <div className="icons">
                        <a className="icon i-facebook">
                            <FacebookIcon />
                        </a>
                        <a className="icon i-twitter">
                            <TwitterIcon />
                        </a>
                        <a className="icon i-instagram">
                            <InstagramIcon />
                        </a>
                    </div>
            </TopContainer>
            <Marginer direction="vertical" margin="3em" />
            <SectionTitle>Nos services<HorizontalRule /></SectionTitle>
            <Services />
            <Marginer direction="vertical" margin="3em" />
            <SectionTitle>Catégories<HorizontalRule /></SectionTitle>
            <Marginer direction="vertical" margin="3em" />
            <Categorie>

                <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 'BOLD', position: 'absolute', color: "white", fontSize: "26px", padding: "20px" }}>Cakes</p>
                    <img src={Cake} style={{ width: '90%', height: 'auto', borderRadius: '30px' }} />
                </div>

                <div style={{ flex: 1, flexDirection: 'column' }}>
                    <div style={{ flex: 1, flexDirection: 'row' }}>
                        <p style={{ fontWeight: 'BOLD', position: 'absolute', color: "white", fontSize: "20px", padding: "30px" }}>Cup Cakes</p>
                        <img src={CupCake} style={{ width: '90%', height: 'auto', borderRadius: '30px' }} />
                    </div>
                    <div style={{ flex: 1, flexDirection: 'row' }}>
                        <p style={{ fontWeight: 'BOLD', position: 'absolute', color: "white", fontSize: "20px", padding: "30px" }}>Lolly Pop</p>
                        <img src={LollyPop} style={{ width: '90%', height: 'auto', borderRadius: '30px' }} />
                    </div>
                </div>

                <div style={{ flex: 2, flexDirection: 'column' }}>
                    <div style={{ flex: 2 }}>
                        <p style={{ fontWeight: 'BOLD', position: 'absolute', color: "white", fontSize: "26px", padding: "20px" }}>Magnums</p>
                        <img src={Magnum} style={{ width: '60%', height: 'auto', borderRadius: '30px' }} />
                    </div>
                    <div style={{ flex: 2, flexDirection: 'column', padding: '20px' }}>
                        <p style={{ fontWeight: 'BOLD', position: 'absolute', color: "#D97A8C", fontSize: "26px", padding: "20px" }}>Pop Cakes</p>
                        <img src={PopCake} style={{ width: '50%', height: 'auto', borderRadius: '30px' }} />
                        <img src={Idk} style={{ width: '45%', height: 'auto', borderRadius: '30px', marginLeft: '20px' }} />


                    </div>
                </div>
            </Categorie>

            <UsSection/>
            <Marginer direction="vertical" margin="3em" />
            <SectionTitle>Messages de nos clients<HorizontalRule /></SectionTitle>
            <Marginer direction="vertical" margin="3em" />
            <ReviewsSection />

            <SectionTitle>Contactez-nous<HorizontalRule /></SectionTitle>
            <Contact />
            <Marginer direction="vertical" margin="3em" />

            <Box>
                <LogoImg src={Logo} />
                <h2 style={{
                    fontSize:13,
                    color: "white",
                    textAlign: "center"
                }}>
                    SweetCakes @ Copyright 2021
                </h2>
            </Box>
        </>
    );
};
export default Home;