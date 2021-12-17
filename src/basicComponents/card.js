import { COLORS, FONTS } from "../assets/theme";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import Button from './button';
import '../styles/card.css';
import '../styles/modal.css';
import { useState } from 'react';
import Modal from '../components/userComponents/modal'

const Card = ({ cake, favorites, setFavorites, cart, setCart }) => {

  const IMAGEPATH = "http://localhost:8080/uploads/";

  const [modalOpen, setModalOpen] = useState(false);
  const addToFavorite = (cake) => {
    let array = favorites;
    if (!array.includes(cake)) {
      setFavorites([...favorites, cake]);
      var storage = localStorage.getItem('favCake' || '0')
      if (storage == null) {
        localStorage.setItem('favCake' + (cake.id_post), JSON.stringify(cake.id_post));
      }
      else {
        localStorage.setItem('favCake' + (cake.id_post), JSON.stringify(cake.id_post));
      }

    } else {
      console.log('Already added');
    }
  }
  return (
    <div key={cake.id_post} className="card">
      {modalOpen && <Modal setOpenModal={setModalOpen} cart={cart} setCart={setCart} categorie={cake.categorie} price={cake.prix} image={IMAGEPATH + cake.image} post={cake.id_post} />}
      <img className="photo" src={IMAGEPATH + cake.image} />
      <div className="Titre">
        {localStorage.getItem('favCake' + (cake.id_post)) != null && localStorage.getItem('favCake' + (cake.id_post)).includes(cake.id_post) ?
          (<IoIosHeart style={{ justifyContent: 'center' }} onClick={() => addToFavorite(cake)} color={COLORS.purple.primary} />) :
          (localStorage.getItem('favCake' + (cake.id_post)) == null || !localStorage.getItem('favCake' + (cake.id_post)).includes(cake.id_post) ?
            (<IoIosHeartEmpty style={{ justifyContent: 'center' }} onClick={() => addToFavorite(cake)} color={COLORS.purple.primary} />) :
            (<IoIosHeart style={{ justifyContent: 'center' }} onClick={() => addToFavorite(cake)} color={COLORS.purple.primary} />)
          )
        }
        {cake.evenement}
      </div>
      <div className="info">
        <p className="infor" style={{ ...FONTS.smallTitle }}>
          Categorie : {cake.categorie}
          {
            cake.poids != null ?
              (<p >Poids : {cake.poids} </p>) :
              (<p >Nombre de parts : {cake.nombre_part} </p>)
          }
          {
            cake.dispo == 1 ?
              (<p >Disponible : Oui </p>) :
              (<p >Disponible : Non </p>)
          }
          {
            cake.dispo == 1 ?
              (<p>Nombre unité dsponible : {cake.nombre_unite_dispo} </p>) :
              ("")
          }
          {
            cake.categorie == "Lolipops" || cake.categorie == "Cupcakes" ?
              (<p >Gout : {cake.gout}</p>) :
              ("")
          }
          {
            cake.categorie == "Magnum" || cake.categorie == "Cupcakes" ?
              (<p >Forme : {cake.pack_ou_unite}</p>) :
              ("")
          }
          Prix : {cake.prix} </p>
        <div className="button">
          <Button className="openModalBtn" width="120px" onClick={() => { setModalOpen(true); }} textColor={COLORS.white} bgColor={COLORS.purple} text="Commander" />
        </div>
        <div className="button1">
        </div>
      </div>
    </div>
  );
}
export default Card;
