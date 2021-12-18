import React, { useState } from 'react';
import { COLORS } from '../../assets/theme'
import styled from 'styled-components';
import Logo from '../../assets/images/logoVertical.png';
import { NavLink } from 'react-router-dom';


const UpMenu = styled.div`
    width:100%;
    height:50px;
    background-color:${COLORS.purple.primary};
    display:flex;
    justify-content:space-between;
    align-items:center;
`;

const Icon = styled.i`
    color:white;
    font-size:22px;
    padding:0 20px;
    cursor:pointer;
`;

const Menu = styled.div`
    position:fixed;
    top:0;
    width:300px;
    height:100vh;
    background-color:${COLORS.lightPurple};
    z-index:10;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    overflow:hidden;
    transform: translateX(${props => props.isOpen ? '0' : '-120%'});
    box-shadow: 4px 0px 15px rgba(0,0,0,0.2);
    transition:.3s ease-in-out;
`;

const Line = styled.div`
    width:150px;
    height:5px;
    border-radius:20px;
    background-color:white;
    margin:20px 0;
`;

const MenuItem = styled(NavLink)`
    width:100%;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    padding-left:80px;
    cursor:pointer;
    color:black;
    text-decoration:none;
    transition: .3s ease-in-out;

    &:hover{
        background-color:${COLORS.purple.primary};
        color:white;
    };

    &.active{
        color:white;
        background-color: ${COLORS.purple.primary};
    }
`;

const CloseIcon = styled.i` 
    position:absolute;
    top:10px;
    right:10px;
    font-size:25px;
    color:${COLORS.purple.primary};
    cursor:pointer;
    transition:.3s ease-in-out;

    &:hover{
        color:${COLORS.purple.hover}
    }
`;

const Nav = () => {

    const [isOpen, setIsOpen] = useState(false);
    const logout = () => {
        localStorage.setItem("loggedIn",false);
        window.location.href="/login"
    }

    return (
        <>
            <UpMenu>
                <Icon className="fas fa-bars" onClick={() => { setIsOpen(!isOpen) }} />
                <Icon className="fas fa-sign-out-alt" onClick={logout}/>
            </UpMenu>
            <Menu isOpen={isOpen}>
                <CloseIcon className="fas fa-times-circle" onClick={() => { setIsOpen(!isOpen) }} />
                <img src={Logo} alt="Logo-vertical" style={{ width: "200px" }} />
                <Line />

                <MenuItem to="/dashboard" onClick={() => { setIsOpen(!isOpen) }}>
                    <i className="fas fa-tachometer-alt" style={{ marginRight: 10 }}></i>
                    <p>Tableau de bord</p>
                </MenuItem>

                <MenuItem to="/demand/tarte" onClick={() => { setIsOpen(!isOpen) }}>
                    <i className="fas fa-birthday-cake" style={{ marginRight: 10 }}></i>
                    <p>Tartes</p>
                </MenuItem>

                <MenuItem to="/demand/livraison" onClick={() => { setIsOpen(!isOpen) }}>
                    <i className="fas fa-truck" style={{ marginRight: 10 }}></i>
                    <p>Livraison</p>
                </MenuItem>

                <MenuItem to="/offres" onClick={() => { setIsOpen(!isOpen) }}>
                    <i className="fas fa-percentage" style={{ marginRight: 10 }}></i>
                    <p>Offres</p>
                </MenuItem>

                <MenuItem to="/posts" onClick={() => { setIsOpen(!isOpen) }}>
                    <i className="fas fa-bookmark" style={{ marginRight: 10 }}></i>
                    <p>Posts</p>
                </MenuItem>
            </Menu>
        </>
    )
}

export default Nav;