import React, { useEffect, useState } from 'react';
import '../../styles/App.css'
import CategorieCake from './categorieCake';
import CategorieMagnum from './categorieMagnum';
import CategorieLolipops from './categorieLolipops';
import CategorieCupcakes from './categorieCupcakes';
import CategorieSable from './categorieSable';
import CategoriePopCakes from './categoriePopcakes';
import axios from 'axios';
import { Card,Input, Select} from '../../basicComponents';
import ReactPaginate from "react-paginate";
import '../../styles/cake.css';
import '../../styles/card.css';
import Footer from './footer';
import TopSection from './topSection';

function Cakes() {
    const optionsCategory = ["Cakes","Cupcakes","Magnum","Popcakes","Sable","Lolipops"];
    const optionsEvent = ["Tarte du Mariage","Fiancaille","Anniversaire"];
    const optionsDispo = ["Oui","Non"];
    const [search, setSearch] = useState({"category":"","event":"","disponibility":""});
    //Pagination : max cakes per page
    const [pageNumber, setPageNumber] = useState(0);
    const cakesPerPage = 15;
    const pagesVisited = pageNumber * cakesPerPage;

    //Count Pagination
    const [cakes, setCakes] = useState([]);
    //Posts  From API 
    useEffect(()=>{
        axios.get('http://localhost:8080/api/posts')
        .then(res=>{
                setCakes(res.data);
                console.log('UP:',res.data)
            })
        .catch(err=>{
            console.log(err);
        })
    },[])
    const pageCount = Math.ceil(cakes.length/ cakesPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    
    const [favorites, setFavorites] = useState([]);
    //Part Favorites
    const saveWatchListLocal=()=>{
        localStorage.setItem('favoritesCakes', JSON.stringify(favorites));
    }

    useEffect( () => {
    getFromLocal()
    },[])

    useEffect(() => {
     saveWatchListLocal()
    }, [favorites]);

    const getFromLocal = () => {
    if((JSON.parse(localStorage.getItem('favoritesCakes'))) !== null)
        setFavorites( [...(JSON.parse(localStorage.getItem('favoritesCakes')))] )
    }

    const [cart, setCart] = useState([]);
    //Part cart
    const saveCartListLocal=()=>{
        localStorage.setItem('cartCakes', JSON.stringify(cart));
    }
    useEffect( () => {
    FromLocal()
    },[])
    useEffect(() => {
     saveCartListLocal()
    }, [cart]);
    const FromLocal = () => {
    if((JSON.parse(localStorage.getItem('cartCakes'))) !== null)
        setCart( [...(JSON.parse(localStorage.getItem('cartCakes')))] )
    }

    
    
    //Send Demand
    const [article, setArticle] = useState({
        "demand":{"id_demand": ""},
        "categorie": "",
        "evenement": "",
        "poid_ou_parts": "",
        "quantite": "",
        "nombre_etages": "",
        "nombre_pieces": "",
        "gout": "",
        "coleur": "",
        "image": "",
        "prix": "",
        "description": "",
        "pack_ou_unite": "",
        "type_pate": "",
        "decoration":""

    });
    const [demand, setDemand] = useState({
        "nom": "",
        "telephone": "",
        "address": "",
        "ville": "",
        "date_livraison": "",
        "prix":"550"

    });
    const optionsVille = ["Fes","Tanger","Tetouan","asfi","casa","martil"];
    
    const calculPrice=(categorie,poid_ou_parts,quantite,nombre_pieces,pack_ou_unite)=>{
        var prix;

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

        article.prix=prix;
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
      <div  > 
          <TopSection cart={cart} setCart={setCart}/>
        <div  className="CakesPagination">    
        <form className="searchAdvanced">
            <div  className="Search">
                <Select label="Categorie" options={optionsCategory} width="380px"  name="category" data={search} setData={setSearch}  />
                <Select label="Evenement" options={optionsEvent}  width="380px"  name="event" data={search} setData={setSearch}  />
                <Select label="Disponible pour aujourd'hui" options={optionsDispo}  width="380px"  name="disponibility" data={search} setData={setSearch}  />
            </div> 
        </form>
        <div className="wrapper">
        {cakes.filter((val)=>{
            if(search.category==="Choose"||search.event==="Choose" || search.disponibility==="Choose"){
                return val}
            //Case no select no search
            if(search.category===""&&search.event==="" && search.disponibility===""){
                return val}
            //Case  just 1 select 
            if(search.category!="" && search.event===""&&search.disponibility===""){
                if((val.categorie.toLowerCase()===(search.category).toLocaleLowerCase())){
                return val}}

            if(search.category==="" && search.event!=""&&search.disponibility===""){
                if((val.evenement.toLowerCase()===(search.event).toLocaleLowerCase())){
                    return val}}
            
            if(search.category==="" && search.event===""&&search.disponibility!=""){
                if(val.dispo===(search.disponibility==='Oui'?'1':'0')){
                    return val}}
            //Case  2 select 
            if(search.category!="" && search.event!=""&&search.disponibility===""){
                if((val.categorie.toLowerCase()===(search.category).toLocaleLowerCase()) && (val.evenement.toLowerCase()===((search.event).toLocaleLowerCase()))){
                return val}}
            if(search.category!="" && search.event===""&&search.disponibility!=""){
                if((val.categorie.toLowerCase()===(search.category).toLocaleLowerCase()) &&(val.dispo===(search.disponibility==='Oui'?'1':'0'))){
                 return val}}
            if(search.category==="" && search.event!=""&&search.disponibility!=""){
                if((val.dispo===(search.disponibility==='Oui'?'1':'0')) && (val.evenement.toLowerCase()===((search.event).toLocaleLowerCase()))){
                    return val}}
            //Case  3 select 
            if(search.category!="" && search.event!=""&&search.disponibility!=""){
                if((val.categorie.toLowerCase()===(search.category).toLocaleLowerCase()) &&(val.dispo===(search.disponibility==='Oui'?'1':'0')) && (val.evenement.toLowerCase().includes((search.event).toLocaleLowerCase()))){
                return val}}
            
        } ).slice(pagesVisited, pagesVisited + cakesPerPage).map((val,key)=>{
            return (
                <Card 
                cake={val}
                favorites={favorites}
                setFavorites={setFavorites}
                cart={cart}
                setCart={setCart}
               />
            );
        })}   
        </div>
        <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"} /> 
      
    </div>
    
<div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "flex-start",
                flexWrap: "wrap"
            }}>
                <div className="send" >
                    <h5> Demande Personalisé</h5>
                    <hr className="hr" />

                    <div style={{
                        display: "flex",
                        marginLeft: "130px",
                        flexWrap: "wrap"
                    }}>
                        <div className="form" >

                            <div style={{ marginRight: "60px" }}>
                                <Select label="Catégorie" options={optionsCategory} width="220px" name="categorie" data={article} setData={setArticle} />
                            </div>
                            <div style={{ marginRight: "60px" }}>
                                <Input label="Date de livraison" type="date" name="date_livraison" data={demand} setData={setDemand} width="200px" />
                            </div>

                            
                            {calculPrice(article.categorie,article.poid_ou_parts,article.quantite,article.nombre_pieces,article.pack_ou_unite)}
                           

                        </div>

                    </div>


                    <div style={{ marginLeft: "130px", marginTop: "-9px" }}>
                        <h5> Information Personnel</h5>
                    </div>

                    <div className="form22" >
                        <div style={{ marginRight: "60px" }}>
                            <Input label="Nom et prenom" name="nom" data={demand} setData={setDemand} width="200px" />
                        </div>
                        <div style={{ marginRight: "60px" }}>
                            <Input label="Telephone" name="telephone" data={demand} setData={setDemand} width="200px" />
                        </div>
                        <div style={{ marginRight: "60px" }}>
                            <Input label="Adress" name="address" data={demand} setData={setDemand} width="200px" />
                        </div>
                        <Select label="Ville" options={optionsVille} width="220px" name="ville" data={demand} setData={setDemand} />
                    </div>
                    <div style={{marginLeft: "130px",marginTop: "-9px"}}>
                        {article.categorie === "Cakes" && (<CategorieCake data={article} setData={setArticle} cart={cart} setCart={setCart} demand={demand}/>)}
                        {article.categorie === "Magnum" && (<CategorieMagnum data={article} setData={setArticle} cart={cart} setCart={setCart} demand={demand}  />)}
                        {article.categorie === "Cupcakes" && (<CategorieCupcakes data={article} setData={setArticle}cart={cart} setCart={setCart} demand={demand} />)}
                        {article.categorie === "Lolipops" && (<CategorieLolipops data={article} setData={setArticle} cart={cart} setCart={setCart} demand={demand} />)}
                        {article.categorie === "Popcakes" && (<CategoriePopCakes data={article} setData={setArticle} cart={cart} setCart={setCart} demand={demand} />)}
                        {article.categorie === "Sable" && (<CategorieSable data={article} setData={setArticle} cart={cart} setCart={setCart} demand={demand} />)}
                    </div>
                </div>

                
            </div>
            <Footer />
</div>

    );
  }
  
  export default Cakes;