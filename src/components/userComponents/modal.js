import React, { useEffect, useState } from 'react';
import "../../styles/modal.css";
import { Button, Input, Select, TextArea } from '../../basicComponents'
import { COLORS } from '../../assets/theme';
import axios from 'axios';



function Modal({ setOpenModal ,categorie , image, price, post,cart,setCart}) {
  
  const addToBD= (article,demand) => {
    axios.post('http://localhost:8080/api/cakes_demand/add',
    { ...demand }).then(res => {
       axios.get('http://localhost:8080/api/cakes_demand/recentOne').then(ress => {
              article.demand.id_demand=ress.data
              article.posts.id_post=post
              article.categorie=categorie
                axios.post('http://localhost:8080/api/articles/add', {...article}).then(resp => {
                    console.log('added:',article);
                });
           });
    
    });
    //window.location.reload();
  }

  const [demand, setDemand] = useState({
    "nom": "",
    "telephone": "",
    "address": "",
    "ville": "",
    "date_livraison": ""
  });
  const [data, setData] = useState({
    "demand":{"id_demand": ""},
    "posts":{"id_post":""},
    "categorie": "",
    "evenement": "",
    "poid_ou_parts": "",
    "quantite": "",
    "nombre_etages": "",
    "nombre_pieces": "",
    "gout": "",
    "coleur": "",
    "image": "",
    "prix": "300",
    "description": "",
    "pack_ou_unite": "",
    "type_pate": "",
    "decoration":"",

  });
  const addToCart= (article) => {
    let array = cart;
      if (!array.includes(article)) {
        console.log('Already');
        article.categorie=categorie;
        article.image=image;
        article.posts.id_post=post
        setCart([ ...cart, article]);
        var storageDemand =localStorage.getItem('Demand'||'{}')
        if(storageDemand==null){
          localStorage.setItem('Demand', JSON.stringify(demand));
        }
    } else {
        console.log('Already added');
    }
  window.location.reload();
  }
  const optionsVille = ["Fes", "Tanger", "Tetouan", "asfi", "casa", "martil"];
  const optionType = ["poid", "parts"];
  const optionsPate = ["sucre", "créme", "Amande"];
  const optionsEtage = ["1", "2", "3", "4", "5"];
  const optionsForme = ["pack", "unite"]
  const optionsGout = ["vanille", 'chocolat'];
  const optionsDecoration = ["Simple", 'Décoré'];

const calculPrice=(categorie,poid_ou_parts,quantite,nombre_pieces,pack_ou_unite)=>{
    var prix ;
    


    if(categorie=="Cakes"){
    if(poid_ou_parts=="poid"){
        prix=200*quantite;
    }
    else{
        prix=50*quantite;
    }}
    if(categorie=="Cupcakes"){
        if(pack_ou_unite=="unite"){
            prix=15*nombre_pieces;
        }
        if(pack_ou_unite=="pack"){
            if(nombre_pieces==6)
            prix=95;
            if(nombre_pieces==12)
            prix=185;
    }}
    if(categorie=="Magnum"){
        if(pack_ou_unite=="unite"){
            prix=15*nombre_pieces;
        }
        if(pack_ou_unite=="pack"){
            if(nombre_pieces==6)
            prix=95;
            if(nombre_pieces==12)
            prix=185;
    }}
    if(categorie=="Popcakes"){
            prix=9*nombre_pieces;
    }
    if(categorie=="Sable"){
        prix=12*nombre_pieces;
    }
    if(categorie=="Lolipops"){
        prix=5*nombre_pieces;
}

    data.prix=prix;
    
    return(
        < div style={{
            backgroundColor: "#AB7CF7",
            width: "130px",
            textAlign: "center",
            borderRadius: "25px",
            marginTop: "50px",
            color: "white"
            }}>
                PRIX:{prix}
        </div>
    );
}
useEffect(() => {
    calculPrice();
   }, []);

  

  return (
    <div className="modalBackground">
      <div className="modalContainer">

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div className="title">
            <img style={{ width: "350px", height: "530px" }} src={image} />
          </div>
          <div className="title23">
            <div className="titleCloseBtn">
              <button onClick={() => { setOpenModal(false); }} >  X </button>
            </div>
            <h5 style={{ color: "#AB7CF7", marginTop: "3px" }}> Information Personnel</h5>
            <div className="form23" >
              <div style={{ marginRight: "60px" }}>
                <Input label="Nom et prenom" name="nom" data={demand} setData={setDemand} width="170px" />
              </div>
              <Input label="Telephone" name="telephone" data={demand} setData={setDemand} width="170px" />
            </div>
            <div className="form32" >
              <div style={{ marginRight: "40px" }}>
                <Select label="Ville" options={optionsVille} width="190px" name="ville" data={demand} setData={setDemand} />
              </div>
              <Input label="adress" name="address" data={demand} setData={setDemand} width="170px" />
            </div>
            <div className="form3" >
            <div style={{marginRight: "70px"  }}>
              <Input label="Date de livraison" type="date" name="date_livraison" data={demand} setData={setDemand} width="170px" />
            </div>
            {calculPrice(categorie,data.poid_ou_parts,data.quantite,data.nombre_pieces,data.pack_ou_unite)}
   
            </div>
            

            {categorie === "Cakes" && (
              <div  >
                <h5 style={{ color: "#AB7CF7", marginTop: "0px" }}> Information De Cake</h5>
                <div className="form23" >
                  <div style={{ marginRight: "40px", }}>
                    <Select label="Pate" options={optionsPate} width="190px" name="type_pate" data={data} setData={setData} />
                  </div>
                  
                  <Select label="type" options={optionType} width="190px" name="poid_ou_parts" data={data} setData={setData} />
                </div>
                <div className="form32" >
                  <div style={{ marginRight: "40px" }}>
                    <Select label="Nombre des etages" options={optionsEtage} width="190px" name="nombre_etages" data={data} setData={setData} />
                  </div>
                  <Input label="Quantité" name="quantite" data={data} setData={setData} width="170px" />
                </div>

                <div className="form33">
                  <div style={{ marginRight: "40px" }}>
                    <TextArea label="description" name="description" rows="4" width="170px" data={data} setData={setData} />
                  </div>
                  <Input label="Couleur" name="coleur" data={data} setData={setData} width="170px" />
                </div>
                <div style={{ paddingTop: "2px" }}>
                  <Button text="Ajouter au panier" width="170px" bgColor={COLORS.purple} textColor={COLORS.white} />
                  <Button text="envoyer Demande" width="170px" onClick={() => addToBD(data,demand)} bgColor={COLORS.purple} textColor={COLORS.white} />
                </div>
              </div>)}

            {categorie === "Cupcakes" && (
              <div  >
                <h5 style={{ color: "#AB7CF7" }}> Information De Cupcakes</h5>
                <div className="form23" >
                  <div style={{ marginRight: "40px", }}>
                    <Select label="Gout" options={optionsGout} width="190px" name="gout" data={data} setData={setData} />
                  </div>
                  <Input label="Nombre de piece " name="nombre_pieces" data={data} setData={setData} width="170px" />
                </div>
                <div className="form32" >
                  <div style={{ marginRight: "40px" }}>
                    <Select label="forme" options={optionsForme} width="190px" name="pack_ou_unite" data={data} setData={setData} />
                  </div>
                  <Input label="couleur" name="coleur" data={data} setData={setData} width="170px" />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <TextArea label="description" name="description" rows="4" width="170px" data={data} setData={setData} />
                </div>
                <div style={{ paddingTop: "2px", marginLeft: "10px" }}>
                  <Button text="Ajouter au panier" width="170px" onClick={() => addToCart(data)} bgColor={COLORS.purple} textColor={COLORS.white} />
                  <Button text="envoyer Demande" width="170px" onClick={() => addToBD(data,demand)} bgColor={COLORS.purple} textColor={COLORS.white} />
                </div>

              </div>)}



            {categorie === "Magnum" && (
              <div  >
                <h5 style={{ color: "#AB7CF7" }}> Information De Magnum</h5>
                <div className="form23" >
                  <div style={{ marginRight: "40px", }}>
                    <Select label="Décoration" options={optionsDecoration} width="190px" name="gout" data={data} setData={setData} />
                  </div>
                  <Input label="Nombre de piece " name="nombre_pieces" data={data} setData={setData} width="170px" />
                </div>
                <div className="form32" >
                  <div style={{ marginRight: "40px", }}>
                    <Select label="forme" options={optionsForme} width="190px" name="pack_ou_unite" data={data} setData={setData} />
                  </div>
                  <Input label="couleur" name="coleur" data={data} setData={setData} width="170px" />
                </div>
                <TextArea label="description" name="desc" rows="4" width="200px" data={data} setData={setData} />
                <div style={{ paddingTop: "2px" }}>
                  <Button text="Ajouter au panier" width="170px" onClick={() => addToCart(data)} bgColor={COLORS.purple} textColor={COLORS.white} />
                  <Button text="envoyer Demande" width="170px" onClick={() => addToBD(data,demand)} bgColor={COLORS.purple} textColor={COLORS.white} />
                </div>
              </div>)}


            {categorie === "Popcakes" && (
              <div  >
                <h5 style={{ color: "#AB7CF7" }}> Information De Popcakes</h5>
                <div className="form23" >
                  <div style={{ marginRight: "40px", }}>
                    <Select label="Décoration" options={optionsDecoration} width="190px" name="gout" data={data} setData={setData} />
                  </div>
                  <Input label="Nombre de piece " name="nombre_pieces" data={data} setData={setData} width="170px" />
                </div>
                <div className="form32" >
                  <div style={{ marginRight: "40px" }}>
                    <Input label="couleur" name="coleur" data={data} setData={setData} width="170px" />
                  </div>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <TextArea label="description" name="description" rows="4" width="170px" data={data} setData={setData} />
                </div>

                <div style={{ paddingTop: "2px", marginLeft: "10px" }}>
                  <Button text="Ajouter au panier" width="170px" onClick={() => addToCart(data)} bgColor={COLORS.purple} textColor={COLORS.white} />
                  <Button text="envoyer Demande" width="170px" onClick={() => addToBD(data,demand)} bgColor={COLORS.purple} textColor={COLORS.white} />
                </div>
              </div>)}

            {categorie === "Lolipops" && (
              <div  >
                <h5 style={{ color: "#AB7CF7" }}> Information De Lolipops</h5>
                <div className="form23" >
                  <div style={{ marginRight: "40px", }}>
                    <Input label="couleur" name="coleur" data={data} setData={setData} width="170px" />                  </div>
                    <Input label="Nombre de piece " name="nombre_pieces" data={data} setData={setData} width="170px" />
                </div>
                <div className="form32" >
                  <div style={{ marginRight: "26px", }}>
                  <TextArea label="description" name="description" rows="4" width="170px" data={data} setData={setData} />
                  </div>
                  <Select label="Gout" options={optionsGout} width="190px" name="gout" data={data} setData={setData} />

                </div>
                

                <div style={{ paddingTop: "2px", marginLeft: "10px" }}>
                  <Button text="Ajouter au panier" width="170px" onClick={() => addToCart(data)} bgColor={COLORS.purple} textColor={COLORS.white} />
                  <Button text="envoyer Demande" width="170px" onClick={() => addToBD(data,demand)} bgColor={COLORS.purple} textColor={COLORS.white} />
                </div>
              </div>)}



            {categorie === "Sable" && (
              <div  >
                <h5 style={{ color: "#AB7CF7" }}> Information De Sablé</h5>
                <div className="form23" >
                  <div style={{ marginRight: "40px", }}>
                    <Input label="couleur" name="coleur" data={data} setData={setData} width="170px" />
                  </div>
                  <Input label="Nombre de piece " name="nombre_pieces" data={data} setData={setData} width="170px" />
                </div>
                <div className="form32" >
                  <div style={{ marginRight: "40px" }}>
                    <Select label="décoration" options={optionsDecoration} width="190px" name="decoration" data={data} setData={setData} />
                  </div>
                  <Select label="Pate" options={optionsPate} width="190px" name="type_pate" data={data} setData={setData} />
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <TextArea label="description" name="description" rows="4" width="170px" data={data} setData={setData} />
                </div>

                <div style={{ paddingTop: "2px", marginLeft: "10px" }}>
                  <Button text="Ajouter au panier" width="170px" onClick={() => addToCart(data)} bgColor={COLORS.purple} textColor={COLORS.white} />
                  <Button text="envoyer Demande" width="170px" onClick={() => addToBD(data,demand)} bgColor={COLORS.purple} textColor={COLORS.white} />
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
