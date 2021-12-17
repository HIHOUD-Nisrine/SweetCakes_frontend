import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS, FONTS } from '../../assets/theme';
import { Button, Input, TextArea, UploadFile, Loader, UpdateFile } from '../../basicComponents';
import axios from 'axios';

const Container = styled.div`
    height:100%;
    margin:30px 100px;
    display:flex;
    justify-content:center;
    align-items:center;

    @media only screen and (max-width: 1024px){
        margin:30px 80px;
    }

    @media only screen and (max-width: 768px){
        margin:30px 20px;
    }
`;

const MainContainer = styled.div`
    width:100%;
`;

const SectionName = styled.div`
    width:100%;
    display:flex;
    justify-content:flex-end;
    font-weight:bold;
    font-size:20px;
`;

const MainContent = styled.div`
    width:100%;
    display:flex;
    justify-content:flex-start;
    align-items:flex-start;

    @media only screen and (max-width: 768px){
        flex-direction:column;
        justify-content:center;
        align-items:flex-start;
    }
`;

const ImgContainer = styled.div`
    width: 300px;
    background-size:cover;

    @media only screen and (max-width: 768px){
        width: 100%;
        height: 300px;
    }
`;

const MainDesc = styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    margin-left:20px;
`;

const Modal = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100vh;
    background-color:rgba(0,0,0,0.3);
    display:flex;
    justify-content:center;
    align-items:center;
    opacity:${props => props.openModal ? "1" : "0"};
    visibility:${props => props.openModal ? "" : "hidden"};
    z-index:10;
    transition:.3s ease-in-out;
`;

const ModalContent = styled.div`
    width:70%;
    height:90vh;
    border-radius:15px;
    background-color:white;
    padding:0px 40px;
    margin:30px;
    overflow-y:scroll;
`;

const FromSections = styled.div`
    width:45%;

    @media only screen and (max-width: 1200px){
        width:100%;
    }

    @media only screen and (max-width: 768px){
        width:100%;
    }
`;

const CloseModal = styled.i`
    color:${COLORS.purple.primary};
    font-size:22px;
    cursor:pointer;
    transition:.3s ease-in-out;

    &:hover{
        color:${COLORS.purple.hover};
    }
`;

const EmptyCard = styled.div`
    width:100%;
    height:400px;
    background-color:rgba(0,0,0,.1);
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    border-radius:15px;
`;

const Offers = () => {
    const URL = "http://localhost:8080/api/";
    const IMAGEPATH = "http://localhost:8080/uploads/";

    const offerObj = {
        'id_offer': 0,
        'prix_initial': '',
        'prix_final': '',
        'description': '',
        'date_debut': '',
        'date_fin': '',
        'image': ''
    }

    const [offer, setOffer] = useState(offerObj);

    const [isEmpty, setIsEmpty] = useState(true)
    const [openModal, setOpenModal] = useState(false);
    const [actionBtn, setActionBtn] = useState("");
    const [loading, setLoading] = useState(true);
    const [offerModify, setOfferModify] = useState(offerObj);

    const fetchOffers = async () => {
        axios.get(`${URL}offers`).then(res => {
            if (res.data.length > 0) {
                setCustomOffer(res.data[0], "add");
                setCustomOffer(res.data[0], "modify");
                setIsEmpty(false);
            }
        });
    }

    const setCustomOffer = (data, type) => {
        data.date_debut = data.date_debut.slice(0, 10);
        data.date_fin = data.date_fin.slice(0, 10);

        type === "add" ? setOffer(data) : setOfferModify(data);
    }

    useEffect(() => {
        fetchOffers()
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, []);

    const addOffer = (e) => {
        e.preventDefault();
        setOpenModal(false);

        //sendData to server
        let objectToDataBase = new FormData();

        objectToDataBase.append("prix_initial", offer.prix_initial);
        objectToDataBase.append("prix_final", offer.prix_final);
        objectToDataBase.append("description", offer.description);
        objectToDataBase.append("date_debut", offer.date_debut);
        objectToDataBase.append("date_fin", offer.date_fin);
        objectToDataBase.append("image", offer.image);

        axios.post(`${URL}offers/add`, objectToDataBase).then(res => {
            console.log("res : ", res);
            if (Object.keys(res.data).length > 0) {
                setTimeout(() => {
                    // setOffer(res.data);
                    setCustomOffer(res.data, "add")
                    setIsEmpty(false)
                    setActionBtn("none")
                },1000)
            };
        });
    }

    const updateOffer = (e) => {
        e.preventDefault();
        setOpenModal(false);

        //sendData to server
        let objectToDataBase = new FormData();

        objectToDataBase.append("prix_initial", offerModify.prix_initial);
        objectToDataBase.append("prix_final", offerModify.prix_final);
        objectToDataBase.append("description", offerModify.description);
        objectToDataBase.append("date_debut", offerModify.date_debut);
        objectToDataBase.append("date_fin", offerModify.date_fin);

        axios.put(`${URL}offers/update/${offer.id_offer}`, objectToDataBase).then(res => {
            if (Object.keys(res.data).length > 0)
                setCustomOffer(res.data, "add");
            console.log("res : ", res);
        });
    }

    const deleteOffer = (id) => {
        axios.delete(`${URL}offers/delete/${id}`).then(res => {
            if (res.data.deleted) {
                setOffer(offerObj);
                setIsEmpty(true);
            }
        });
    }

    const ModalContainerAddOffer = () => {
        return (
            <Modal openModal={openModal}>
                <ModalContent>
                    <form onSubmit={(e) => addOffer(e)}>
                        <p style={{ ...FONTS.mediumTitle, color: COLORS.gray, display: "flex", justifyContent: "space-between" }}>
                            Description d'offre
                            <CloseModal className="fas fa-times-circle" onClick={() => { setOpenModal(false); setActionBtn("") }} />
                        </p>
                        <div
                            style={{
                                height: "100%",
                                width: "100%",
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "space-around",
                                alignItems: "flex-start",
                                marginBottom: 10
                            }}
                        >
                            <FromSections>
                                <Input label="Prix initial (Dh)" name="prix_initial" data={offer} setData={setOffer} width="100%" type="number" />
                                <Input label="Prix finale (Dh)" name="prix_final" data={offer} setData={setOffer} width="100%" type="number" />
                                <Input label="Date debut" name="date_debut" data={offer} setData={setOffer} width="100%" type="date" />
                                <Input label="Date fin" name="date_fin" data={offer} setData={setOffer} width="100%" type="date" />
                                <TextArea label="Description" width="100%" rows="7" name="description" data={offer} setData={setOffer} />
                            </FromSections>

                            <div
                                style={{

                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >

                                <UploadFile name="image" data={offer} setData={setOffer} />

                                <div
                                    style={{
                                        marginTop: "40px"
                                    }}
                                >
                                    <Button text={actionBtn} textColor="white" bgColor={COLORS.purple} width="200px" type="submit" />
                                </div>


                            </div>

                        </div>


                    </form>
                </ModalContent>
            </Modal>
        );
    }

    const ModalContainerUpdateOffer = () => {
        return (
            <Modal openModal={openModal}>
                <ModalContent>
                    <form onSubmit={(e) => updateOffer(e)}>
                        <p style={{ ...FONTS.mediumTitle, color: COLORS.gray, display: "flex", justifyContent: "space-between" }}>
                            Description d'offre
                            <CloseModal className="fas fa-times-circle" onClick={() => { setOpenModal(false); setActionBtn("") }} />
                        </p>
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                marginBottom: 10
                            }}
                        >
                            <FromSections>
                                <Input label="Prix initial (Dh)" name="prix_initial" data={offerModify} setData={setOfferModify} width="100%" type="number" />
                                <Input label="Prix finale (Dh)" name="prix_final" data={offerModify} setData={setOfferModify} width="100%" type="number" />
                                <Input label="Date debut" name="date_debut" data={offerModify} setData={setOfferModify} width="100%" type="date" />
                                <Input label="Date fin" name="date_fin" data={offerModify} setData={setOfferModify} width="100%" type="date" />
                                <TextArea label="Description" width="95%" rows="10" name="description" data={offerModify} setData={setOfferModify} />
                            </FromSections>

                            <FromSections>

                                <UpdateFile name="image" data={offer} setData={setOffer} url="offer" />
                            </FromSections>
                        </div>

                        <Button text={actionBtn} textColor="white" bgColor={COLORS.purple} width="200px" type="submit" />
                    </form>
                </ModalContent>
            </Modal>
        );
    }

    return (
        <Container>
            {
                loading ?
                    <Loader />
                    :
                    <>
                        {actionBtn === "Ajouter" && ModalContainerAddOffer()}
                        {actionBtn === "Modifier" && ModalContainerUpdateOffer()}
                        < MainContainer >
                            <SectionName>Offres</SectionName>
                            <MainContent>
                                {
                                    isEmpty ?
                                        <EmptyCard>
                                            <i className="fas fa-box-open" style={{ fontSize: "80px", color: "gray" }}></i>
                                            <span style={{ marginBottom: 40 }}>Il n ya pas des offres actuallement</span>
                                            <Button text="Ajouter" textColor="white" bgColor={COLORS.purple} width="300px" onClick={() => { setOpenModal(true); setActionBtn("Ajouter") }} />
                                        </EmptyCard>
                                        :
                                        <>
                                            <ImgContainer>
                                                <img src={IMAGEPATH + offer.image} alt={offer.description} style={{ width: "100%" }} />
                                            </ImgContainer>

                                            <MainDesc>
                                                <div>
                                                    <span>Description</span>
                                                    <span style={{ ...FONTS.mediumTitle, marginLeft: 20 }}>{offer.description}</span>
                                                </div>
                                                <div>
                                                    <span>Prix intiale</span>
                                                    <span style={{ ...FONTS.mediumTitle, marginLeft: 20 }}>{offer.prix_initial}</span>
                                                </div>
                                                <div>
                                                    <span>Prix fianle</span>
                                                    <span style={{ ...FONTS.mediumTitle, marginLeft: 20 }}>{offer.prix_final}</span>
                                                </div>
                                                <div>
                                                    <span>date debut</span>
                                                    <span style={{ ...FONTS.mediumTitle, marginLeft: 20 }}>{offer.date_debut}</span>
                                                </div>
                                                <div>
                                                    <span>date fin</span>
                                                    <span style={{ ...FONTS.mediumTitle, marginLeft: 20 }}>{offer.date_fin}</span>
                                                </div>

                                                <div style={{ marginTop: "20px" }}></div>
                                                <Button text="Modifier" textColor="white" bgColor={COLORS.purple} width="130px" onClick={() => { setOpenModal(true); setActionBtn("Modifier") }} />
                                                <Button text="Supprimer" textColor="white" bgColor={COLORS.red} width="130px" onClick={() => deleteOffer(offer.id_offer)} />
                                            </MainDesc>
                                        </>
                                }
                            </MainContent>
                        </MainContainer>
                    </>
            }

        </Container >
    )
}

export default Offers;
