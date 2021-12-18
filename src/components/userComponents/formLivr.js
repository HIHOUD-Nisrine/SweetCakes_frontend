import React, { useState } from "react";
import styled from "styled-components";
import { Input, Button, Select, Marginer, TextArea } from '../../basicComponents';
import { COLORS } from "../../assets/theme";
import axios from 'axios';


const MainContainer = styled.div`
 
  background-color: white;
  border-radius: 15px;
  margin: 13px;
  padding: 2px 10px;
  box-shadow: 8px 8px 15px rgba(150,150,150,0.38);
    @media only screen and (max-width: 320px) {
      width: 80vw;
      height: 90vh;
      hr {
        margin-bottom: 0.3rem;
      }
      h4 {
        font-size: small;
      }
    }
    @media only screen and (min-width: 360px) {
      width: 80vw;
      height: 90vh;
      h4 {
        font-size: small;
      }
    }

    @media only screen and (min-width: 411px) {
      width: 80vw;
      height: 90vh;
    }

    @media only screen and (min-width: 768px) {
      width: 80vw;
      height: 80vh;
    }
    @media only screen and (min-width: 1024px) {
      width:97vw;
      height: auto;
    }
  `;

const ContainerGlobal = styled.div`
    width:100%;
    height:100vh;
  `;

const InputsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 70%;
  flex-direction:column;
`;

const Up = styled.div`
display: flex;
flex-direction:rows;
padding:20px;
justify-content: space-around;
`;

const Middle = styled.div`
display: flex;
flex-direction:rows;
padding:20px;
justify-content: space-around;
`;
const Down = styled.div`
display: flex;
flex-direction:rows;
padding:20px;
justify-content: space-around;

`;

const Left = styled.div`
display: flex;
padding:20px;
flex-direction:column;
`;
const Right = styled.div`
display: flex;
padding:20px;
`;

export default function FormLivr(props) {

  const Option = ['Tétouan', 'Tanger', 'Chefchaoun', 'Larache'];

  const [data, setData] = useState({
    "notes": "null",
    "statut": 'non traité',
    "prix": 40
  });


  function AddDeliveryDemand(e) {
    e.preventDefault();
    axios.post("http://localhost:8080/api/delivery_demands/add", data).then(res => {
      console.log(res);
    });
  }

  return (
    <>
      <ContainerGlobal>
        <form onSubmit={AddDeliveryDemand}>
          <MainContainer style={{ flex: 2 }}>
            <InputsContainer style={{ flex: 1 }}>
              <h3>Informations de l'emmeteur</h3>
              <Up style={{ flex: 1 }}>
                <Input label="Nom Complet" width="250px" name="nom_emetteur" setData={setData} data={data} />
                <Input label="Téléphone" width="250px" name="telephone_emetteur" setData={setData} data={data} />
                <Input label="Adresse" width="250px" name="address_emetteur" setData={setData} data={data} />
                <Select options={Option} label="Ville" width="250px" name="ville_emetteur" setData={setData} data={data} />
              </Up>
              <h3>Informations du destinataire</h3>
              <Middle style={{ flex: 1 }}>
                <Input label="Nom Complet" width="250px" name="nom_destinataire" setData={setData} data={data} />
                <Input label="Téléphone" width="250px" name="telephone_destinataire" setData={setData} data={data} />
                <Input label="Adresse" width="250px" name="address_destinataire" setData={setData} data={data} />
                <Select options={Option} label="Ville" width="250px" name="ville_destinataire" setData={setData} data={data} />
                <Marginer direction="vertical" margin="2em" />
              </Middle>
              <h3>Informations de livraison</h3>
              <Down style={{ flex: 1 }}>
                <Left>
                  <Input type="date" label="Date" width="300px" name="date_livraison" data={data} setData={setData} />
                  <Input type="time" step="2" label="Time" width="300px" name="heure_livraison" setData={setData} data={data} />
                  <Input type="time" step="2" label="Marge" width="300px" name="marge" setData={setData} data={data} />

                </Left>
                <Right>
                  <TextArea label="Message" name="description" width="300px" rows="10" setData={setData} data={data} />

                </Right>
              </Down>
            </InputsContainer>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
              <Button text="Envoyer" textColor="white" bgColor={COLORS.purple} width="150px" type="submit" />
            </div>
          </MainContainer>
        </form>
      </ContainerGlobal>

    </>

  );
}