import React from 'react';
import styled from 'styled-components';


function ContactItem({title, icon, cont1, cont2}) {
    return (
        <ContactItemStyled>
            <div className="left-content">
                {
                    icon
                }
            </div>
            <div className="right-content">
                <h6>{title}</h6>
                <p>{cont1}</p>
                <p>{cont2}</p>
            </div>
        </ContactItemStyled>
    )
}

const ContactItemStyled = styled.div`
    padding:0rem 10rem;
    background-color: "#C59BF9";
    display: flex;
    

    align-items: center;
    &:not(:last-child){
        margin-bottom: 0;
    }
    .left-content{
        box-shadow: 1px 1px 15px rgba(150,150,150,0.38);
        padding: 1.5rem;
        border: 1px solid #C59BF9;
        border-radius:100%;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1.5rem;
        svg{
            font-size: 2rem;
        }
    }

    .right-content{
        h6{
            color: var(--white-color);
            font-size: 1rem;
        }
    }
`;

export default ContactItem;
