import React, { useEffect, useState } from "react";
import { COLORS } from "../../../assets/theme";
import { Button, Input, Select, TextArea, UploadFile, UploadFile1 } from "../../../basicComponents";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    width:33%;
    margin:10px 0;

    @media only screen and (max-width: 1200px){
        width:100%;
    }

    @media only screen and (max-width: 768px){
        width:100%;
    }
`;

const AddPosts = () => {

    const URL = "http://localhost:8080/api/";
    let navigate = useNavigate();

    // const saveToLocal = () => {
    //     const reader = new FileReader();
    //     var obj = { ...data }

    //     reader.readAsDataURL(data["image"]);
    //     reader.addEventListener("load", () => {
    //         return obj["image"] = reader.result
    //     });

    //     console.log("obj image : ", obj["image"]);
    //     localStorage.setItem("data", JSON.stringify(obj));
    // }

    // const getFromLocal = () => {
    //     const allData = localStorage.getItem("data");
    //     if (allData !== null) {
    //         console.log("all data : ", JSON.parse(allData));
    //     }
    // }

    const options = {
        "categories": ["Cakes","Cupcakes","Magnum","Popcakes","Sable","Lolipops"],
        "gout": ["Chockolat", "Vanille", "Franboise"],
        "nbPiece": [4, 6, 12],
        "evenement": ["Mariage", "Anniversaire", "Fiancaille"],
        "nombre_etage": [1, 2, 3, 4, 5, 6, 7],
        "methode": ["Box", "Unite"],
        "type_pate": ["Sucre", "Chockolat"],
        "dispo": ["Oui", "Non"],
    }

    const [data, setData] = useState({
        'categorie': 'Cakes',
        'evenement': '',
        'prix': '',
        'poids': 0,
        'nombre_part': 0,
        'image': '',
        'gout': '',
        'pack_ou_unite': '',
        'nombre_unite_dispo': 0,
        'dispo': '',
        'type_pate': '',
        'description': '',
    });

    const addArticles = (e) => {
        e.preventDefault();
        console.log("data : ",data);

        //sendData to server
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
        objectToDataBase.append("dispo", data.dispo === "Oui" ? 1 : 0 );
        objectToDataBase.append("type_pate", data.type_pate);
        objectToDataBase.append("description", data.description);

        console.log("obj to database : ",objectToDataBase)
        axios.post(`${URL}posts/add`, objectToDataBase).then(res => {
            if(res.data.inserted){
                setTimeout(() => {
                    navigate(`/posts`);
                },1000)
            }
            console.log("result : ", res);
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
                        <Input label="Nombre des parts" width="97%" name="nombre_part" data={data} setData={setData} type="number"/>
                        <Input label="Poids" width="97%" name="poids" data={data} setData={setData} type="number" />
                    </FromSections>

                    <FromSections>
                        <Select label="Disponible" options={options.dispo} width="100%" name="dispo" data={data} setData={setData} />
                        <Input label="Prix" width="95%" name="prix" data={data} setData={setData} type="number" />
                        <TextArea label="Description" name="description" rows="7" width="95%" data={data} setData={setData} />
                    </FromSections>

                    <div>
                        <UploadFile data={data} setData={setData} name="image" />
                    </div>

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

                    <div>
                        <UploadFile data={data} setData={setData} name="image" />
                    </div>
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

                    <div>
                        <UploadFile data={data} setData={setData} name="image" />
                    </div>
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

                    <div>
                        <UploadFile data={data} setData={setData} name="image" />
                    </div>
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

                    <div>
                        <UploadFile data={data} setData={setData} name="image" />
                    </div>
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

                    <div>
                        <UploadFile data={data} setData={setData} name="image" />
                    </div>
                </div>
            </>
        );
    }


    return (
        <Container>
            <MainContainer>
                <SectionName>
                    Ajouter Produit
                </SectionName>
                <Select label="Catégorie" options={options.categories} width="220px" name="categorie" data={data} setData={setData} />
                <form onSubmit={(e) => addArticles(e)}>
                    {data.categorie === "Cakes" && (CategorieCake())}
                    {data.categorie === "Cupcakes" && (CategorieCupcake())}
                    {data.categorie === "Magnum" && (CategorieMagnum())}
                    {data.categorie === "Lolipops" && (CategorieLolipops())}
                    {data.categorie === "Popcakes" && (CategoriePopCakes())}
                    {data.categorie === "Sable" && (CategorieSable())}
                    {data.categorie !== "Choose" &&
                        <Button text="Ajouter" width="150px" bgColor={COLORS.purple} textColor={COLORS.white} type="submit" />
                    }
                </form>
            </MainContainer>
        </Container>
    );
}

export default AddPosts