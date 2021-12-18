import React, { useEffect, useState } from 'react';
import { COLORS, FONTS } from '../../assets/theme';
import styled from 'styled-components';
import { Button, Select, TextArea } from '../../basicComponents';
import axios from 'axios';
const P = styled.p`

font-size: 13px;
font-weight: 100;
margin-bottom: -10px;
`;
const Span = styled.span`
font-weight: 500;
`;
const Line = styled.div`
    width:200px;
    height:5px;
    border-radius:20px;
    background-color:${COLORS.lightPurple};
    margin: 5px 0;
`;

function CakeDemandDetails({ demand, setDemand }) {

    useEffect(() => {

        console.log("notes = " + demand.notes)
        console.log("statut = " + demand.statut)
    }, [demand])

    const [data, setData] = useState([])
    const options = ["traité", "non traité"]



    useEffect(() => {
        axios.get("http://localhost:8080/api/cakes_demands/" + demand.id_demand + "/articles").then(
            res => {
                console.log(res.data)
                if (res.data.length > 0)
                    setData(res.data);

            })
    }, [])

    const save = () => {
        axios.post("http://localhost:8080/api/cakes_demands/" + demand.id_demand + "/update", demand)

    }
    return (
        <div style={{
            backgroundColor: "#eee",
            paddingTop: "20px",
            borderTopLeftRadius: "30px",
            borderTopRightRadius: "30px",
        }}>
            <div style={{
                margin: "30px",

            }}>
                {/* Informations generales */}

                <span style={{ ...FONTS.mediumTitle }}> Informations générales</span>
                <Line />
            </div>

            <div style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <div >
                    <div style={{

                        display: 'flex',
                        width: "1000px",
                        borderRadius: "20px",
                        boxShadow: "1px 1px 1px 1px #eee",
                        minHeight: "100px",
                        backgroundColor: COLORS.lightPurple,
                        padding: "10px",
                        paddingLeft: "50px",
                    }}>

                        <div style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: 'center',

                        }}>
                            <P> <Span> Nom : </Span> {demand.nom}</P>
                            <P> <Span> Téléphone : </Span> {demand.telephone}</P>
                            <P> <Span> Ville : </Span> {demand.ville}</P>
                            <P> <Span> Adresse : </Span> {demand.address}</P>
                            <P> <Span> Date de livraison : </Span> {demand.date_livraison}</P>
                            {/* <P> <Span> heure de livraison : </Span> {demand.heur_livraison}</P> */}
                        </div>

                        <div style={{ flex: 1.5 }}>
                            <div>

                                <Select label="Statut" options={options} name="statut" width="300px" data={demand} setData={setDemand} />
                            </div>
                            <TextArea label="Vos notes" name="notes" rows="4" width="90%" data={demand} setData={setDemand} />

                            <Button width='100px' bgColor={COLORS.purple} text="save" textColor={COLORS.white} onClick={save} />

                        </div>




                    </div>
                    <div style={{
                        backgroundColor: COLORS.purple.primary,
                        color: COLORS.white,
                        margin: 12,
                        padding: "5px 20px",
                        borderRadius: "20px",
                        width: "200px"
                    }}>
                        Prix total: {demand.prix}  MAD
                    </div>
                </div>

            </div>
            {/* Informations des articles */}
            <div style={{ margin: "30px" }}>
                <span style={{ ...FONTS.mediumTitle }}> Informations des articles </span>
                <Line />
            </div>
            <div>

            </div>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>

                {
                    data.map((article) => (

                        <div key={article.id_article} style={{
                            marginLeft: 10,
                            marginTop: 10,
                            display: 'flex',
                            width: "500px",
                            borderRadius: "20px",
                            boxShadow: "1px 1px 1px 1px #eee",
                            minHeight: "200px",
                            backgroundColor: COLORS.lightPurple,
                        }}>
                            {/* Image et voir post */}
                            <div style={{
                                flex: 0.3,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: 'center',
                                padding: "20px",
                            }} >
                                {/* <img src={article.image} alt="image"
                                    style={{
                                        width: "150px",
                                        borderRadius: "20px",
                                    }} /> */}
                                {article.posts !== null && (

                                    <a href="" style={{
                                        ...FONTS.smallTitle,
                                        textDecoration: "none",

                                    }}> voir post</a>
                                )}
                            </div>
                            {/* details d'article */}
                            <div style={{
                                flex: 0.7,
                                paddingTop: 12,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-around"
                            }}>

                                {/* Affichage des details de cake */}
                                {article.categorie === "Cakes" && (
                                    <div>

                                        <P> <Span> Categorie : </Span> Cake design</P>

                                        {article.evenement !== null && (
                                            <P> <Span> Évènement  : </Span> {article.evenement} </P>
                                        )}
                                        {article.quantite !== null && (
                                            <P> <Span> Quantité  : </Span> {article.quantite} </P>
                                        )}
                                        {article.nombre_etages !== null && (
                                            <P> <Span> Nombre des étages  : </Span> {article.nombre_etages} </P>
                                        )}
                                        {/* {article.nom_1 !== null && (
                                            <P> <Span> Nom 1  : </Span> {article.nom_1} </P>
                                        )}
                                        {article.nom_2 !== null && (
                                            <P> <Span> Nom 2  : </Span> {article.nom_2} </P>
                                        )}
                                        {article.age !== null && (
                                            <P> <Span> Age  : </Span> {article.age} </P>
                                        )} */}
                                        {article.coleur !== null && (
                                            <P> <Span> Coleur  : </Span> {article.coleur} </P>
                                        )}
                                        {article.description !== null && (
                                            <P> <Span> Description  : </Span> {article.description} </P>
                                        )}

                                    </div>
                                )}

                                {/* Affichage des details de Magnnums */}
                                {article.categorie === "Magnum" && (
                                    <div>
                                        <P> <Span> Categorie : </Span> Magnums</P>

                                        {article.evenement !== null && (
                                            <P> <Span> Évènement  : </Span> {article.evenement} </P>
                                        )}
                                        {article.nombre_pieces !== null && (
                                            <P> <Span> Nombre des piéces  : </Span> {article.nombre_pieces} </P>
                                        )}

                                        {article.pack_ou_unite !== null && (
                                            <P> <Span> à l'unité ou en pack : </Span> {article.pack_ou_unite} </P>
                                        )}

                                        {article.decoration !== null && (
                                            <P> <Span> Décoration  : </Span> {article.decoration} </P>
                                        )}
                                        {article.coleur !== null && (
                                            <P> <Span> Coleur  : </Span> {article.coleur} </P>
                                        )}
                                        {article.description !== null && (
                                            <P> <Span> Description  : </Span> {article.description} </P>
                                        )}

                                    </div>
                                )}
                                {/* Affichage des details de Cake Pops */}

                                {article.categorie === "Popcakes" && (
                                    <div>
                                        <P> <Span> Categorie : </Span> Cake Pops</P>

                                        {article.evenement !== null && (
                                            <P> <Span> Évènement  : </Span> {article.evenement} </P>
                                        )}
                                        {article.nombre_pieces !== null && (
                                            <P> <Span> Nombre des piéces  : </Span> {article.nombre_pieces} </P>
                                        )}

                                        {article.decoration !== null && (
                                            <P> <Span> Décoration  : </Span> {article.decoration} </P>
                                        )}

                                        {article.coleur !== null && (
                                            <P> <Span> Coleur  : </Span> {article.coleur} </P>
                                        )}
                                        {article.description !== null && (
                                            <P> <Span> Description  : </Span> {article.description} </P>
                                        )}

                                    </div>
                                )}
                                {/* Affichage des details de Cup cakes */}
                                {article.categorie === "Cupcakes" && (
                                    <div>
                                        <P> <Span> Categorie : </Span> CupCakes</P>

                                        {article.evenement !== null && (
                                            <P> <Span> Évènement  : </Span> {article.evenement} </P>
                                        )}

                                        {article.pack_ou_unite !== null && (
                                            <P> <Span> à l'unité ou en pack : </Span> {article.pack_ou_unite} </P>
                                        )}

                                        {article.nombre_pieces !== null && (
                                            <P> <Span> Nombre des piéces  : </Span> {article.nombre_pieces} </P>
                                        )}

                                        {article.gout !== null && (
                                            <P> <Span> Gôut  : </Span> {article.gout} </P>
                                        )}

                                        {article.coleur !== null && (
                                            <P> <Span> Coleur  : </Span> {article.coleur} </P>
                                        )}
                                        {article.description !== null && (
                                            <P> <Span> Description  : </Span> {article.description} </P>
                                        )}

                                    </div>
                                )}
                                {/* Affichage des details de Sablé */}
                                {article.categorie === "Sable" && (
                                    <div>
                                        <P> <Span> Categorie : </Span> Sablé</P>

                                        {article.evenement !== null && (
                                            <P> <Span> Évènement  : </Span> {article.evenement} </P>
                                        )}
                                        {article.nombre_pieces !== null && (
                                            <P> <Span> Nombre des piéces  : </Span> {article.nombre_pieces} </P>
                                        )}

                                        {article.decoration !== null && (
                                            <P> <Span> Décoration  : </Span> {article.decoration} </P>
                                        )}

                                        {article.pate !== null && (
                                            <P> <Span> Pate  : </Span> {article.pate} </P>
                                        )}

                                        {article.coleur !== null && (
                                            <P> <Span> Coleur  : </Span> {article.coleur} </P>
                                        )}

                                        {article.description !== null && (
                                            <P> <Span> Description  : </Span> {article.description} </P>
                                        )}

                                    </div>
                                )}

                                {/* Affichage des details de Lolipop */}
                                {article.categorie === "Lolipops" && (
                                    <div>
                                        <P> <Span> Categorie : </Span> Meringues lolipop</P>


                                        {article.nombre_pieces !== null && (
                                            <P> <Span> Nombre des piéces  : </Span> {article.nombre_pieces} </P>
                                        )}

                                        {article.coleur !== null && (
                                            <P> <Span> Coleur  : </Span> {article.coleur} </P>
                                        )}

                                        {article.gout !== null && (
                                            <P> <Span> Gôut  : </Span> {article.gout} </P>
                                        )}


                                        {article.description !== null && (
                                            <P> <Span> Description  : </Span> {article.description} </P>
                                        )}

                                    </div>
                                )}

                                {/* prix */}
                                <div style={{
                                    display: "flex",
                                    justifyContent: "flex-end",

                                }} >
                                    <div style={{
                                        backgroundColor: COLORS.purple.primary,
                                        color: COLORS.white,
                                        margin: 12,
                                        padding: "5px 20px",
                                        borderRadius: "20px",
                                    }}>
                                        Prix :  {article.prix} MAD
                                    </div>

                                </div>


                            </div>

                        </div>

                    ))
                }
            </div>
        </div>
    );
}

export default CakeDemandDetails;