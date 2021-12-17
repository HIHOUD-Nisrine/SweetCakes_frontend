import React from 'react';
import '../../styles/App.css'
import { Button, Input, Select, TextArea, UploadFile } from '../../basicComponents'
import { COLORS } from '../../assets/theme';
import axios from 'axios';


function CategorieSable({ data, setData ,cart,setCart,demand }) {
    const addToCart= (data) => {
        let array = cart;
        var obj={...data};
        const reader = new FileReader();
        reader.addEventListener( "load",() => {
          obj.image=reader.result;
          if (!array.includes(data)) {
            setCart([ ...cart, obj ]);
            var storageDemand =localStorage.getItem('Demand'||'0')
            if(storageDemand==null){
              localStorage.setItem('Demand', JSON.stringify(demand));
            }
        } else {
            console.log('Already added');
        }
      });
      reader.readAsDataURL(data.image)
      window.location.reload();
      }
      const addToBD= (article,demand) => {
        axios.post('http://localhost:8080/api/cakes_demand/add',
        { ...demand }).then(res => {
           axios.get('http://localhost:8080/api/cakes_demand/recentOne').then(ress => {
                    article.demand.id_demand=ress.data
                    const reader = new FileReader();
                    reader.addEventListener( "load",() => {
                    article.image=reader.result;
                    axios.post('http://localhost:8080/api/articles/add', {...article}).then(resp => {
                        console.log('added:',article);
                    });
                    });
                    reader.readAsDataURL(article.image);
               });
        });
        window.location.reload();
      } 
    const optionsEvent = ["Tarte du Mariage", "Fiancaille", "Anniversaire"];
    const optionsForme = ["pack", "unite"]
    const optionsDecoration = ["Simple", 'Décoré'];
    const optionstype = ["a sucre", "créme", "Amande"];
    return (
        <div >
            <div >
                <h5> Information du Sablé</h5>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    width: "100%",
                    flexDirection: "row",
                    marginTop: "-30px"
                }} >

                <div
                    className="localisation_info" >
                    <Select label="Evenement" options={optionsEvent} width="220px" name="evenement" data={data} setData={setData} />
                    <Input label="Nombre de piéce" name="nombre_pieces" data={data} setData={setData} width="200px" />
                    <Select label="Pate" options={optionstype} width="220px" name="pack_ou_unite" data={data} setData={setData} />
                    <Input label="couleur" name="coleur" data={data} setData={setData} width="200px" />
                </div>
                <div
                    className="localisation_info" >
                    <Select label="Décoration" options={optionsDecoration} width="220px" name="evenement" data={data} setData={setData} />
                    <TextArea label="description" name="description" rows="7" width="220px" data={data} setData={setData} />

                </div>
                <div
                    className="localisation_info" >
                    <UploadFile data={data} setData={setData} name="image" />

                </div>
            </div>
            <div style={{ paddingTop: "2px", }}>
                <Button text="Ajouter au panier" onClick={() => addToCart(data)} width="170px" bgColor={COLORS.purple} textColor={COLORS.white} />
                <Button text="envoyer Demande" onClick={() => addToBD(data,demand)} width="170px" bgColor={COLORS.purple} textColor={COLORS.white} /> 
            </div>
        </div>
    );
}
export default CategorieSable;