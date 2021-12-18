import React, { useEffect, useState } from 'react';
import { COLORS, FONTS } from '../../assets/theme';
import styled from 'styled-components';
import { Button } from '../../basicComponents';
import { CakeDemandDetails } from '.';
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

function CakeDemandsTable({ statut, date_livraison }) {
    // console.log(statut)


    const [showDetails, setShowDetails] = useState(false)
    const [idCommande, setIdCommande] = useState("");

    const [data, setData] = useState([])
    const [dataConsulte,setDataConsulte] = useState({});

    const Consulter = (id) => {
        setShowDetails(true)
        setIdCommande(id)
        setDataConsulte(data.find(x => x.id_demand === id));
    }
    useEffect(() => {
        axios.get('http://localhost:8080/api/cakes_demands').then(
            (res) => {
                console.log("resdata => "+res.data);
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
                                {/* <Th></Th> */}
                                <Th>Nom et Prenom</Th>
                                <Th>Téléphone</Th>
                                <Th>Adress</Th>
                                <Th>Ville</Th>
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
                                            {/* <Td> <img src={item.img} style={{
                                                width: "100px",
                                                height: "100px",
                                                resizeMode: "cover",


                                            }} /></Td> */}
                                            <Td> {item.nom} </Td>
                                            <Td> {item.telephone}  </Td>
                                            <Td> {item.address}</Td>
                                            <Td> {item.ville}</Td>
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
                {showDetails && <CakeDemandDetails demand = {dataConsulte} setDemand = {setDataConsulte} />}
            </div>
        </div>
    );
}

export default CakeDemandsTable;