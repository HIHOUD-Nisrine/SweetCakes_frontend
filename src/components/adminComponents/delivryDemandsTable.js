import React, { useEffect, useState } from 'react';
import { COLORS, FONTS } from '../../assets/theme';
import styled from 'styled-components';
import { DelivryDemandDetails } from '.';
import { Link } from 'react-scroll';
import axios from 'axios';

const Tr = styled.tr`
width : "100%" ;
height : 40px;
`
const Th = styled.th`
width : 200px;
height : 40px;
background-color : ${COLORS.lightPurple};
color : ${COLORS.white};
`
const Td = styled.td`
font : ${FONTS.smallTitle};
width : 200px;
height : 20px;
text-align : center;
`

function DelivryDemandsTable({ statut, date_livraison }) {
    // console.log(statut)


    const [showDetails, setShowDetails] = useState(false)
    const [idCommande, setIdCommande] = useState("");
    const [dataConsulte,setDataConsulte] = useState({});

    const [data, setData] = useState([])
    const Consulter = (id) => {
        setShowDetails(true)
        setIdCommande(id)
        setDataConsulte(data.find(x => x.id_demand === id));
        console.log("setDataConsulte ====> " + dataConsulte)
    }




    useEffect(() => {
        axios.get('http://localhost:8080/api/delivery_demands').then(
            (res) => {
                console.log(res.data);
                if (res.data.length > 0)
                    setData(res.data);
            }
        )
    }, [])
    return (
        <div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '30px',


            }}>
                <div style={{
                    height: "80vh",
                    marginBottom: "40px",
                    overflowY: "scroll",
                    border: `2px solid ${COLORS.lightPurple}`,
                    borderRadius: "20px"
                }}>
                    <table style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        border: "1px",

                    }}>
                        <thead>
                            <Tr>

                                <Th>Nom et Prénom</Th>
                                <Th>Téléphone d'emiteur</Th>
                                <Th>Adress d'émiteur </Th>
                                <Th>Ville d'émiteur</Th>
                                <Th>Date de livraison</Th>
                                <Th></Th>

                            </Tr>
                        </thead>
                        <tbody>

                            {
                                
                                data.map((item) =>
                                
                                    ((item.statut === statut || statut === "Choose") && (item.date_livraison === date_livraison || date_livraison === "")) && (
                                        <Tr>
                                            {/* {console.log("item === " + item.statut)}
                                            {console.log("statut === " + statut)} */}

                                            <Td> {item.nom_emetteur} </Td>
                                            <Td> {item.telephone_emetteur}  </Td>
                                            <Td> {item.address_emetteur}</Td>
                                            <Td> {item.ville_emetteur}</Td>
                                            <Td> {item.date_livraison}</Td>
                                            <Td>
                                                <div style={{
                                                    marginLeft: "auto",
                                                    marginRight: "10px",
                                                    backgroundColor: COLORS.purple.primary,
                                                    color: COLORS.white,
                                                    padding: "5px 10px",
                                                    width: "80px",
                                                    borderRadius: "20px"
                                                }}> <Link onClick={() => Consulter(item.id_demand)} to="details" spy={true} smooth={true}>Consulter</Link>
                                                </div>
                                            </Td>

                                            {/* <Td><Button bgColor={COLORS.purple} text="Consulter" textColor={COLORS.white} onClick={() => Consulter()} /></Td> */}
                                        </Tr>)
                                )
                            }

                        </tbody>
                    </table>
                </div>



            </div>
            <div id="details">
                {/* myArray.find(x => x.id === '45').foo; */}
                {/* {showDetails && data.filter(data => data.id = idCommande).map(demand => (
                console.log("id =========> "+demand.id)
                // <DelivryDemandDetails demand = {demand} />
            ))} */}
                {showDetails && <DelivryDemandDetails demand={dataConsulte} setDemand={setDataConsulte} />}

            </div>
        </div>
    );
}

export default DelivryDemandsTable;