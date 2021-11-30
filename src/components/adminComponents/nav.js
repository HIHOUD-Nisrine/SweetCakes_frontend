import React, { useState } from 'react';
import { COLORS, FONTS } from '../../assets/theme'
import styled from 'styled-components';
import Logo from '../../assets/images/logoVertical.png';



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
    position:absolute;
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
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    transition:.3s ease-in-out;
`;

const Line = styled.div`
    width:150px;
    height:5px;
    border-radius:20px;
    background-color:white;
    margin:20px 0;
`;

const MenuItem = styled.div`
    width:100%;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    padding-left:80px;
    cursor:pointer;
    transition: .3s ease-in-out;

    &:hover{
        background-color:${COLORS.purple.primary};
        color:white;
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

    return (
        <>
            <UpMenu>
                <Icon className="fas fa-bars" onClick={() => { setIsOpen(!isOpen) }} />
                <Icon className="fas fa-sign-out-alt" />
            </UpMenu>
            <Menu isOpen={isOpen}>
                <CloseIcon className="fas fa-times-circle" onClick={() => { setIsOpen(!isOpen) }}/>
                <img src={Logo} alt="Logo-vertical" style={{ width: "200px" }} />
                <Line />
                <MenuItem>
                    <i className="fas fa-tachometer-alt" style={{ marginRight: 10 }}></i>
                    <p>Tableau de bord</p>
                </MenuItem>
                <MenuItem>
                    <i className="fas fa-birthday-cake" style={{ marginRight: 10 }}></i>
                    <p>Tartes</p>
                </MenuItem>
                <MenuItem>
                    <i className="fas fa-truck" style={{ marginRight: 10 }}></i>
                    <p>Livraison</p>
                </MenuItem>
                <MenuItem>
                    <i className="fas fa-percentage" style={{ marginRight: 10 }}></i>
                    <p>Offres</p>
                </MenuItem>
                <MenuItem>
                    <i className="fas fa-bookmark" style={{ marginRight: 10 }}></i>
                    <p>Posts</p>
                </MenuItem>
            </Menu>
        </>
    )
}

export default Nav;