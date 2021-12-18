import React, { useEffect, useState } from "react";
import { COLORS, FONTS } from "../../../assets/theme";
import { Button, Input, Select, TextArea, UploadFile, UpdateFile } from "../../../basicComponents";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import axios from "axios";

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

const FromSections = styled.div`
    width:45%;
    margin:10px 0;

    @media only screen and (max-width: 1200px){
        width:100%;
    }

    @media only screen and (max-width: 768px){
        width:100%;
    }
`;



const EditPosts = () => {

    // const saveToLocal = () => {
    //     const reader = new FileReader();
    //     reader.addEventListener( "load",() => {
    //         localStorage.setItem("image",reader.result);
    //     });
    //     reader.readAsDataURL(data["image"]);
    // }

    // const getFromLocal = () => {
    //     const imgLink = localStorage.getItem("image");
    //     if( imgLink !== null ){
    //         console.log("stored daata : ",imgLink)
    //     }
    // }

    // useEffect( () => {
    //     getFromLocal();
    // }, [])

    const URL = "http://localhost:8080/api/";
    const IMAGEPATH = "http://localhost:8080/uploads/";

    let params = useParams();

    const options = {
        "categories": ["Cakes", "Cupcakes", "Magnum", "Popcakes", "Lolipops", "Sable"],
        "gout": ["Chockolat", "Vanille", "Franboise"],
        "nbPiece": [4, 6, 12],
        "evenement": ["Mariage", "Anniversaire", "Fiancaille"],
        "nombre_etage": [1, 2, 3, 4, 5, 6, 7],
        "methode": ["Box", "Unite"],
        "type_pate": ["Sucre", "Chockolat"],
        "dispo": ["Oui", "Non"],
    }

    const [data, setData] = useState({});

    const fetchPostById = () => {
        axios.get(`${URL}post/${params.id}`).then(res => {
            if (Object.keys(res.data).length > 0) {
                res.data.dispo = res.data.dispo ? "Oui" : "Non"
                setData(res.data)
                console.log(res.data);
            }
        });
    }

    useEffect(() => {
        fetchPostById()
    }, []);

    const editArtcile = (e) => {
        e.preventDefault();
        console.log(data);

        let objectToDataBase = new FormData();

        objectToDataBase.append("categorie", data.categorie);
        objectToDataBase.append("evenement", data.evenement);
        objectToDataBase.append("prix", data.prix);
        objectToDataBase.append("poids", data.poids);
        objectToDataBase.append("nombre_part", data.nombre_part);
        objectToDataBase.append("image", data.image);
        objectToDataBase.append("gout", data.gout);
        objectToDataBase.append("pack_ou_unite", data.pack_ou_unite);
        objectToDataBase.append("nombre_unite_dispo", data.nombre_unite_dispo);
        objectToDataBase.append("dispo", data.dispo === "Oui" ? 1 : 0);
        objectToDataBase.append("type_pate", data.type_pate);
        objectToDataBase.append("description", data.description);

        axios.put(`${URL}post/${params.id}/update`, objectToDataBase).then(res => {
            console.log(res)
        });
    }

    function CategorieCake() {

        return (
            <>
                <h3>Information du Tarte</h3>

                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                    }}
                >
                    <FromSections>
                        <Select label="Evenement" options={options.evenement} width="100%" name="evenement" data={data} setData={setData} />
                        <Select label="Gout" options={options.gout} width="100%" name="gout" data={data} setData={setData} />
                        <Input label="Nombre des parts" width="97%" name="nombre_part" data={data} setData={setData} type="number" />
                        <Input label="Poids" width="97%" name="poids" data={data} setData={setData} type="number" />
                    </FromSections>

                    <FromSections>
                        <Select label="Disponible" options={options.dispo} width="100%" name="dispo" data={data} setData={setData} />
                        <Input label="Prix" width="95%" name="prix" data={data} setData={setData} type="number" />
                        <TextArea label="Description" name="description" rows="7" width="95%" data={data} setData={setData} />
                    </FromSections>
                </div>
            </>
        );
    }

    const CategorieCupcake = () => {

        return (
            <>
                <h3> Information du Cupcake</h3>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                    }}
                >
                    <FromSections>
                        <Select label="Evenement" options={options.evenement} width="100%" name="evenement" data={data} setData={setData} />
                        <Select label="Gout" options={options.gout} width="100%" name="gout" data={data} setData={setData} />
                        <Select label="à l'unité ou en pack" options={options.methode} width="100%" name="pack_ou_unite" data={data} setData={setData} />
                        {data["pack_ou_unite"] === "Box" && <Select label="Nombre de piéce" options={options.nbPiece} width="100%" name="nombre_unite_dispo" data={data} setData={setData} />}
                        {data["pack_ou_unite"] === "Unite" && <Input label="Nombre de piéce" options={options.nbPiece} width="95%" name="nombre_unite_dispo" data={data} setData={setData} />}
                    </FromSections>

                    <FromSections>
                        <Select label="Disponible" options={options.dispo} width="100%" name="dispo" data={data} setData={setData} />
                        <Input label="Prix" width="95%" name="prix" data={data} setData={setData} type="number" />
                        <TextArea label="description" name="description" rows="7" width="95%" data={data} setData={setData} />
                    </FromSections>
                </div>
            </>
        );
    }

    const CategorieMagnum = () => {

        return (
            <>
                <h3> Information du Magnum</h3>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                    }}
                >
                    <FromSections>
                        <Select label="Evenement" options={options.evenement} width="100%" name="evenement" data={data} setData={setData} />
                        <Select label="à l'unité ou en pack" options={options.methode} width="100%" name="pack_ou_unite" data={data} setData={setData} />
                        {data["pack_ou_unite"] === "Box" && <Select label="Nombre de piéce" options={options.nbPiece} width="100%" name="nombre_unite_dispo" data={data} setData={setData} />}
                        {data["pack_ou_unite"] === "Unite" && <Input label="Nombre de piéce" options={options.nbPiece} width="95%" name="nombre_unite_dispo" data={data} setData={setData} />}
                    </FromSections>

                    <FromSections>
                        <Select label="Disponible" options={options.dispo} width="100%" name="dispo" data={data} setData={setData} />
                        <Input label="Prix" width="95%" name="prix" data={data} setData={setData} type="number" />
                        <TextArea label="description" name="description" rows="7" width="95%" data={data} setData={setData} />
                    </FromSections>
                </div>
            </>
        );
    }

    const CategoriePopCakes = () => {

        return (
            <>
                <h3> Information du Lolipop</h3>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                    }}
                >
                    <FromSections>
                        <Select label="Evenement" options={options.evenement} width="100%" name="evenement" data={data} setData={setData} />
                        <Input label="Nombre de piéce" width="95%" name="nombre_unite_dispo" data={data} setData={setData} type="number" />
                    </FromSections>

                    <FromSections>
                        <Select label="Disponible" options={options.dispo} width="100%" name="dispo" data={data} setData={setData} />
                        <Input label="Prix" width="95%" name="prix" data={data} setData={setData} type="number" />
                        <TextArea label="description" name="description" rows="7" width="95%" data={data} setData={setData} />
                    </FromSections>
                </div>
            </>
        );
    }

    const CategorieLolipops = () => {

        return (
            <>
                <h3> Information du Lolipop</h3>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                    }}
                >
                    <FromSections>
                        <Select label="Evenement" options={options.evenement} width="100%" name="evenement" data={data} setData={setData} />
                        <Input label="Nombre de piéce" width="95%" name="nombre_unite_dispo" data={data} setData={setData} type="number" />
                    </FromSections>

                    <FromSections>
                        <Select label="Disponible" options={options.dispo} width="100%" name="dispo" data={data} setData={setData} />
                        <Input label="Prix" width="95%" name="prix" data={data} setData={setData} type="number" />
                        <TextArea label="description" name="description" rows="7" width="95%" data={data} setData={setData} />
                    </FromSections>
                </div>
            </>
        );
    }

    const CategorieSable = () => {

        return (
            <>
                <h3> Information du Sable</h3>
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                    }}
                >
                    <FromSections>
                        <Input label="Nombre de piéce" width="95%" name="nombre_unite_dispo" data={data} setData={setData} type="number" />
                        <Select label="Type de pate" options={options.type_pate} width="100%" name="type_pate" data={data} setData={setData} />
                    </FromSections>

                    <FromSections>
                        <Select label="Disponible" options={options.dispo} width="100%" name="dispo" data={data} setData={setData} />
                        <Input label="Prix" width="95%" name="prix" data={data} setData={setData} type="number" />
                        <TextArea label="description" name="description" rows="7" width="95%" data={data} setData={setData} />
                    </FromSections>
                </div>
            </>
        );
    }

    return (
        <Container>
            <MainContainer>
                <SectionName>
                    Modifier Produit
                </SectionName>
                <div>
                    <span style={{ ...FONTS.label, marginBottom: "5px", marginRight: 25 }} >
                        Catégorie
                    </span>
                    <span style={{ fontWeight: "bold" }}>
                        {data.categorie}
                    </span>
                </div>
                <UpdateFile name="image" data={data} setData={setData} url="post"/>
                <form onSubmit={(e) => editArtcile(e)}>
                    {data.categorie === "Cakes" && (CategorieCake())}
                    {data.categorie === "Cupcakes" && (CategorieCupcake())}
                    {data.categorie === "Magnum" && (CategorieMagnum())}
                    {data.categorie === "Lolipops" && (CategorieLolipops())}
                    {data.categorie === "Popcakes" && (CategoriePopCakes())}
                    {data.categorie === "Sable" && (CategorieSable())}
                    {data.categorie !== "Choose" &&
                        <Button text="Modifier" width="150px" bgColor={COLORS.purple} textColor={COLORS.white} type="submit" />
                    }
                </form>

            </MainContainer>
        </Container>
    );
}

export default EditPosts