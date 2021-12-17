import React from "react";
import styled from "styled-components";
import chaimae from "../../assets/images/profiles/Ech-charfi.jpeg";
import aya from "../../assets/images/profiles/Anssaien.jpeg";
import nisrine from "../../assets/images/profiles/Niss.jpeg";
import chaymae from "../../assets/images/profiles/Mestour.jpeg";
import oussama from "../../assets/images/profiles/oussama.jpg";
import { Marginer,SectionTitle } from '../../basicComponents';


const Container = styled.div`
display: flex;
justify-content: space-around;
@media screen and (max-width:1008px){
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 7rem;
        @media screen and (max-width: 978px){
            grid-template-columns: repeat(1, 1fr);
            .f-button{
                margin-bottom: 9rem;
            }
        }
        .right-content{
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            @media screen and (max-width: 502px){
                width: 70%;
            }
        }
        .contact-title{
            h4{
                color: var(--white-color);
                padding: 1rem 0;
                font-size: 1.8rem;
            }
        }
        .form{
            width: 100%;
            @media screen and (max-width: 502px){
                width: 100%;
            }           
        }
    }
  flex-direction:rows;
  `;

const First = styled.div`
  display: flex;
  max-width:31vh;
  flex-direction:column;
  `;

const Second = styled.div`
  display: flex;
  max-width:33vh;
  flex-direction:column;
`;

const Third = styled.div`
  display: flex;
  max-width:30vh;
  flex-direction:column;
`;
const Fourth = styled.div`
  display: flex;
  max-width:31vh;
  flex-direction:column;
`;

const Fifth = styled.div`
  display: flex;
  max-width:30vh;
  flex-direction:column;
`;
const Chaimae = styled.img`

  border-radius:50%;
`;

const Ayat = styled.img`

  border-radius:50%;
`;
const Nisrine = styled.img`

  border-radius:50%;
`;
const Oussama = styled.img`

  border-radius:50%;
`;
const Chaymae = styled.img`

  border-radius:50%;
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
const UsSection = () => {
    return (
        <>
            <Marginer direction="vertical" margin="3em" />
            <SectionTitle>A propos de nous <HorizontalRule /></SectionTitle>
            <p style={{padding:'22px',fontWeight:'BOLD'}}>Notre projet SweetCakes est une entreprise qui fait la création des cakes design préparées par des experts de ce domaine, facilitant l'opération de commander des tartes via notre plateforme ainsi qu'on facilite la livraison de nos cakes design dans plusieurs endroits et la livraison des cakes design des autres entreprises/pâtisseries localement.</p>
            <Container>
                <First style={{ flex: 1 }}>
                    <Oussama style={{ flex: 1}} src={oussama} />
                    <p style={{ marginTop:'2px',flex: 1,fontWeight:'BOLD',fontSize:'18px',textAlign: 'center'}}>AOULAD LAHCENE Oussama</p>
                    <p style={{ flex: 1 ,textAlign: 'center'}}>Responsable marketing et média</p>
                </First>
                <Second style={{ flex: 1 }}>
                    <Ayat src={aya} />
                    <p style={{ marginTop:'2px', flex: 1,fontWeight:'BOLD',fontSize:'18px',textAlign: 'center'}}>ANSSAIEN Ayat</p>
                    <p style={{ flex: 1,textAlign: 'center' }}>Chef patiserie</p>
                </Second>
                <Third style={{ flex: 1 }}>
                    <Nisrine src={nisrine} />
                    <p style={{  marginTop:'2px',flex: 1,fontWeight:'BOLD',fontSize:'18px',textAlign: 'center'}}>HIHOUD Nisrine</p>
                    <p style={{ flex: 1,textAlign: 'center' }}>Responsable financière</p>
                </Third>
                <Fourth style={{ flex: 1 }}>
                    <Chaimae src={chaimae} />
                    <p style={{ marginTop:'2px', flex: 1,fontWeight:'BOLD',fontSize:'18px',textAlign: 'center'}}>ECH-CHARFI Chaimae</p>
                    <p style={{ flex: 1,textAlign: 'center'}}>Responsable marketing et media</p>
                </Fourth>
                <Fifth style={{ flex: 1 }}>
                    <Chaymae src={chaymae} />
                    <p style={{ marginTop:'2px', flex: 1,fontWeight:'BOLD',fontSize:'18px',textAlign: 'center'}}>MESTOUR Chaymae</p>
                    <p style={{ flex: 1 ,textAlign: 'center'}}>Responsible transport et logistique</p>
                </Fifth>
            </Container>
        </>
    );
}

export default UsSection;
