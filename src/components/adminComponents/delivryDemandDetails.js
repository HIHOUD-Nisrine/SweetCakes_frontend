import React, { useEffect, useState } from 'react';
import { COLORS, FONTS } from '../../assets/theme';
import styled from 'styled-components';
import { Button, Select, TextArea } from '../../basicComponents';
import axios from 'axios';
const Div = styled.div`
width: 300px;
    box-shadow: 3px 5px 8px rgba(0,0,0,0.2);
    outline: none;
    border: none;
    border-radius: 25px;
    padding : 10px;
    font-size:20;
    color:black;
    background-color : ${COLORS.white};

   
`
function DelivryDemandDetails({ demand, setDemand }) {
    const options = ["traité", "non traité"]


    const save = () =>{
         axios.post("http://localhost:8080/api/delivery_demands/" + demand.id_demand + "/update", demand)

    }

    useEffect(() => {

        console.log("notes = " + demand.notes)
        console.log("statut = " + demand.statut)
    }, [demand])
    return (

        <div>

            {
                <div style={{
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: 10,
                    width: "100%",
                    borderRadius: "20px",
                    boxShadow: "1px 1px 1px 1px #eee",
                    minHeight: "400px",
                    backgroundColor: COLORS.lightPurple,

                }}>

                    <div style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "95%",
                        height: "60px",
                        alignItems: "center",
                    }}>

                        <div style={{
                            backgroundColor: COLORS.purple.primary,
                            color: COLORS.white,
                            padding: "5px 20px",
                            borderRadius: "20px",
                        }}>
                            Prix :  {demand.prix} MAD
                        </div>
                    </div>

                    <div style={{
                        width: "95%",
                        alignItems: "center",
                    }}>
                        <div>
                            <Select label="Statut" options={options} name="statut" width="300px" data={demand} setData={setDemand} />
                        </div>

                        <p style={{ ...FONTS.mediumTitle }}>Information de l'émetteur </p>

                        <div style={{
                            display: "flex",
                            justifyContent: "space-around",
                            flexWrap: "wrap",

                        }}>
                            <div><span>Nom et prénom</span>
                                <Div>
                                    {demand.nom_emetteur}
                                </Div>
                            </div>
                            <div><span>Address</span>
                                <Div>
                                    {demand.address_emetteur}, {demand.ville_emetteur}
                                </Div>
                            </div>
                            <div><span>Téléphone</span>
                                <Div>
                                    {demand.telephone_emetteur}
                                </Div>
                            </div>
                        </div>
                    </div>


                    <div style={{
                        width: "95%",
                        alignItems: "center",
                    }}>

                        <p style={{ ...FONTS.mediumTitle }}>Information de destinataire </p>

                        <div style={{
                            display: "flex",
                            justifyContent: "space-around",
                            flexWrap: "wrap",

                        }}>
                            <div><span>Nom et prénom</span>
                                <Div>
                                    {demand.telephone_destinataire}
                                </Div>
                            </div>
                            <div><span>Address</span>
                                <Div>
                                    {demand.address_destinataire}, {demand.ville_destinataire}
                                </Div>
                            </div>
                            <div><span>Téléphone</span>
                                <Div>
                                    {demand.telephone_destinataire}
                                </Div>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        width: "95%",
                        alignItems: "center",
                        marginBottom: "50px"
                    }}>

                        <p style={{ ...FONTS.mediumTitle }}>Information de livraison </p>

                        <div style={{
                            display: "flex",
                            justifyContent: "space-around",
                            flexWrap: "wrap",

                        }}>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-around",
                                flexDirection: "column"
                            }}>
                                <div><span>Date</span>
                                    <Div>
                                        {demand.date_livraison}

                                    </Div>

                                </div>
                                <div><span>Heure</span>
                                    <Div>
                                        {demand.heure_livraison}

                                    </Div>
                                </div>
                                <div><span>Marge</span>
                                    <Div>
                                        {demand.marge}

                                    </Div>

                                </div>
                            </div>

                            <div>
                                <div><span>Description</span>
                                    <Div style={{ width: "450px", padding: "10", minHeight: "50px", borderRadius: "15px" }}>
                                        {demand.description}
                                    </Div>
                                </div>
                                <TextArea label="Vos notes" name="notes" rows="4" width="450px" data={demand} setData={setDemand} />
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end'
                                }}>
                                    <Button width='100px' bgColor={COLORS.purple} text="save" textColor={COLORS.white} onClick={save}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>

    );
}

export default DelivryDemandDetails;