import React, { useState } from "react";
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


const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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

          <Menu open={showMobileMenu}>
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
            <MenuItem>
              <MenuItemLink onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <div style={{ fontWeight: 'BOLD' }}>
                  <FaTruck />
                  Livraison
                </div>
              </MenuItemLink>
            </MenuItem>
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
                <a className="icon i-favorite">
                  <FavoriteIcon style={{fontSize:'30px'}} />
                </a>
              </MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <a className="icon i-localMall">
                  <LocalMallIcon style={{fontSize:'30px'}}/>
                </a>
              </MenuItemLink>
            </MenuItem>
          </Menu>
        </IconContext.Provider>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
