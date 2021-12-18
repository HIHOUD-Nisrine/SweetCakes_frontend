import React, { useState } from "react";
import Avatar from '@mui/material/Avatar'; import { createMuiTheme } from '@material-ui/core';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '../../basicComponents';
import { COLORS } from '../../assets/theme';
import Menu1 from '@mui/material/Menu';
import MenuItem1 from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Modal from './modal';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import {
  Container,
  LogoContainer,
  Wrapper,
  Menu,
  MenuItem,
  MenuItemLink,
  MobileIcon,
} from "./Narbar.elements";
import {
  FaPhoneAlt,
  FaBars,
  FaTimes,
  FaHome,
  FaUserAlt,
  FaBirthdayCake,
  FaTruck,
} from "react-icons/fa";
import { IconContext } from "react-icons";
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Logo from "../../assets/images/logo.png";

const Navbar = ({ cart, setCart }) => {
  const [imgCake, setImgCake] = useState("");
  const [category, setCategory] = useState("");
  const [post, setPost] = useState("");
  const [price, setPrice] = useState("");

  /*Favoris */
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      }
    }
  });
  const theme1 = createMuiTheme({
    typography: {
      fontSize: 18,
      fontWeight: "bold",
    },
  });
  /*Cart */
  const [anchorElCart, setAnchorElCart] = React.useState(null);
  const openCart = Boolean(anchorElCart);
  const handleClickCart = (event) => {
    setAnchorElCart(event.currentTarget);
  };
  const handleCloseCart = () => {
    setAnchorElCart(null);
  };
  const addToBD = (article, demand) => {
    axios.post('http://localhost:8080/api/cakes_demand/add',
      { ...demand }).then(res => {
        axios.get('http://localhost:8080/api/cakes_demand/recentOne').then(ress => {
          console.log("articles :", article)
          for (var i = 0; i < article.length; i++) {
            article[i].demand.id_demand = ress.data;
            console.log('One article:', article[i])
            axios.post('http://localhost:8080/api/articles/add', { ...article[i] }).then(resp => {
              console.log('added:', article[i]);
              localStorage.removeItem("cartCakes");
              localStorage.removeItem("Demand");
              setCart([]);
            });
          }
        });
      });
  }
  //Remove All Cart
  const RemoveCart = () => {
    const articles = JSON.parse(localStorage.getItem('cartCakes' || '[]'));
    const demand = JSON.parse(localStorage.getItem('Demand' || '[]'));
    addToBD(articles, demand);
  };
  //Remove one item from a cart 
  function remove(Telephone) {
    var cart1 = localStorage.getItem('cartCakes') ? JSON.parse(localStorage.getItem('cartCakes')) : [];
    var index;
    for (var i = 0; i < cart1.length; i++) {
      if (cart1[i].Telephone === Telephone) {
        index = i;
        break;
      }
    }
    if (index === undefined) return
    cart1.splice(index, 1);
    localStorage.setItem('cartCakes', JSON.stringify(cart1));
  }
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Container>
      <Wrapper>
        <IconContext.Provider value={{ style: { fontSize: "2em" } }}>
          <LogoContainer>
            <img src={Logo} style={{ width: '150px' }} />
          </LogoContainer>

          <MobileIcon onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <FaTimes /> : <FaBars />}
          </MobileIcon>

          <Menu style={{ margin: 0, padding: 0, boxSizing: "border-box" }} open={showMobileMenu}>

            <MenuItem>
              <MenuItemLink onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <div style={{ fontWeight: 'BOLD' }}>
                  <FaHome />
                  Home
                </div>
              </MenuItemLink>
            </MenuItem>

            <MenuItem>
              <MenuItemLink onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <div style={{ fontWeight: 'BOLD' }}>
                  <FaUserAlt />
                  Services
                </div>
              </MenuItemLink>
            </MenuItem>

            <MenuItem>
              <MenuItemLink onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <div style={{ fontWeight: 'BOLD' }}>
                  <FaUserAlt />
                  Catégorie
                </div>
              </MenuItemLink>
            </MenuItem>

            <MenuItem>
              <MenuItemLink onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <div style={{ fontWeight: 'BOLD' }}>
                  <FaBirthdayCake />
                  Produit
                </div>
              </MenuItemLink>
            </MenuItem>

            <NavLink to="/livraison">
              <MenuItem>
                <MenuItemLink onClick={() => setShowMobileMenu(!showMobileMenu)}>
                  <div style={{ fontWeight: 'BOLD' }}>
                    <FaTruck />
                    Livraison
                  </div>
                </MenuItemLink>
              </MenuItem>
            </NavLink>

            <MenuItem>
              <MenuItemLink onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <div style={{ fontWeight: 'BOLD' }}>
                  <FaBirthdayCake />
                  A propos
                </div>
              </MenuItemLink>
            </MenuItem>

            <MenuItem>
              <MenuItemLink onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <div style={{ fontWeight: 'BOLD' }}>
                  <FaPhoneAlt />
                  Contact
                </div>
              </MenuItemLink>
            </MenuItem>

            <MenuItem>
              <MenuItemLink onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <a className="icon i-favorite" onClick={handleClick}>
                  <FavoriteIcon style={{ fontSize: '30px' }} />
                </a>
              </MenuItemLink>
            </MenuItem>

            <MenuItem>
              <MenuItemLink onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <a className="icon i-localMall" onClick={handleClickCart}>
                  <LocalMallIcon style={{ fontSize: '30px' }} />
                </a>
              </MenuItemLink>
            </MenuItem>
            
          </Menu>
          <Menu1
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              style: {
                maxHeight: '800px',
                width: '35ch',
                Height: '200px',
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >

            {
              JSON.parse(localStorage.getItem('favoritesCakes')) != null ?
                (JSON.parse(localStorage.getItem('favoritesCakes')).map((listItem) => {
                  return (
                    <MenuItem1>
                      <div style={{ height: '60px' }}>
                        <ThemeProvider theme={theme1}>
                          <CardHeader
                            sx={{ mt: -1, ml: -2 }}
                            avatar={
                              <Avatar sx={{ height: '50px', width: '50px' }} alt={listItem.categorie} src={listItem.image} />
                            }
                            title={listItem.evenement}
                            subheader={listItem.prix}
                          />
                        </ThemeProvider>
                        <CardActions sx={{ ml: 25, mt: -7 }}>
                          <ThemeProvider theme={theme}>
                            <Button width="120px" textColor={COLORS.white} onClick={() => { setCategory(listItem.categorie); setImgCake(listItem.image); setPost(listItem.id_post); setPrice(listItem.prix); setModalOpen(true) }} bgColor={COLORS.purple} text="Commander" />                            </ThemeProvider>
                        </CardActions>
                      </div>
                    </MenuItem1>

                  )
                })) : ''
            }

          </Menu1>
          {modalOpen && <Modal cart={cart} setCart={setCart} setOpenModal={setModalOpen} price={price} post={post} categorie={category} image={imgCake} />
          }
          <Menu1
            anchorEl={anchorElCart}
            open={openCart}
            onClose={handleCloseCart}
            onClick={handleCloseCart}
            PaperProps={{
              style: {
                maxHeight: '800px',
                width: '35ch',
                Height: '200px',
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {
              JSON.parse(localStorage.getItem('cartCakes')) != null ?
                (JSON.parse(localStorage.getItem('cartCakes')).map((listItem) => {
                  return (
                    <MenuItem1>
                      <div style={{ height: '60px' }}>
                        <ThemeProvider theme={theme1}>
                          <CardHeader
                            sx={{ mt: -1, ml: -2 }}
                            avatar={
                              <Avatar sx={{ height: '50px', width: '50px' }} alt={listItem.categorie} src={listItem.image} />
                            }
                            title={listItem.Evenement}
                            subheader={listItem.categorie}
                          />
                        </ThemeProvider>
                        <CardActions sx={{ ml: 34, mt: -8 }}>
                          <Button width="50px" textColor={COLORS.red.primary} onClick={() => remove(listItem.Telephone)} bgColor="white" icon="trash-alt" />
                        </CardActions>
                      </div>
                    </MenuItem1>
                  )
                })) : ''
            }  <Divider />
            <MenuItem1>
              <CardActions sx={{ ml: 25 }}>
                <Button width="120px" textColor={COLORS.white} onClick={() => RemoveCart()} bgColor={COLORS.purple} text="Commander" />
              </CardActions>
            </MenuItem1>
          </Menu1>
        </IconContext.Provider>
      </Wrapper>
    </Container>
  );
};
export default Navbar;
