import React, { useState,useRef } from 'react';
import styled from 'styled-components';
import { COLORS } from "../../assets/theme";
import emailjs,{ init } from "emailjs-com";
import { Input, Button,TextArea,SectionTitle,ContactItem } from '../../basicComponents';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';


function ContactPage() {

    const form = useRef();

    function sendEmail(e){
      e.preventDefault();
      emailjs.sendForm('service_y2p7rbd', 'template_b8l4d3t', form.current, 'user_GTzN8jtT2yuI9TLnWK8Ko')
        .then((result) => 
        {
          alert("Message envoyé avec succès", result.text);
          },
          (error) => {
          alert("Erreur ! Veuillez réessayer", error.text);
          });
        }

    const phone = <PhoneIcon style={{ color: "#C59BF9" }} />
    const email = <EmailIcon style={{ color: "#C59BF9" }} />
    const location = <LocationOnIcon style={{ color: "#C59BF9" }} />
    const [data, setData] = useState({
    }); 
    return (
        <MainLayout >
            <SectionTitle title={'Contact'} span={'Contact'} />
            <ContactPageStyled >
                <InnerLayout className={'contact-section'}>
                    <div className="right-content">
                        <ContactItem title={'Phone'} icon={phone} cont1={'+66-789675637'} cont2={'07663520283'} />
                        <ContactItem title={'Email'} icon={email} cont1={'loremipsum@gmail.com'} cont2={'info.lorem.ipsum@gmail.com'} />
                        <ContactItem title={'Address'} icon={location} cont1={'27 Aldrich Road, London, England'} cont2={'United Kingdom'} />

                    </div>
                    <div className="left-content">
                        <form className="form" id="form" ref={form} onSubmit={sendEmail}>
                            <div className="form-field">
                                <Input label="Full Name" width="400px" name="Name" setData={setData} data={data} />
                            </div>
                        
                            <div className="form-field">
                                <Input label="Phone" width="400px" name="Phone" setData={setData} data={data} />
                            </div>
                            <div className="form-field">
                                <TextArea label="Message" name="Message" rows="7" setData={setData} data={data} />
                            </div>
                            <div className="form-field f-button">
                                <Button width="150px" bgColor={COLORS.purple} text="Envoyer" type="submit" />
                            </div>
                        </form>
                    </div>

                </InnerLayout>
            </ContactPageStyled>
        </MainLayout>
    )
}


const MainLayout = styled.div`
    
`;

const InnerLayout = styled.div`
`;

const ContactPageStyled = styled.section`


display: flex;
    .contact-section{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        @media screen and (max-width: 978px){
            grid-template-columns: repeat(1, 1fr);
            .f-button{
                margin-bottom: 3rem;
            }
        }
        .right-content{
            grid-template-columns: repeat(1, 1fr);
            @media screen and (max-width: 502px){
                width: 70%;
            }
        }
        .contact-title{
            h4{
                color: var(--white-color);
            }
        }
        .form{
            width: 100%;
            @media screen and (max-width: 502px){
                width: 100%;
            }
            .form-field{
                margin-top: 2rem;
                position: relative;
                width: 100%;
                label{
                    position: absolute;
                    left: 20px;
                    top: -19px;
                    display: inline-block;
                    background-color: var(--background-dark-color);
                    padding:0 .5rem;
                    color: inherit;
                }
                input{
                    border: 1px solid var(--border-color);
                    outline: none;
                    background: transparent;
                    height: 50px;
                    padding:0 15px;
                    width: 100%;
                    color: inherit;
                }
                textarea{
                    background-color: transparent;
                    border: 1px solid var(--border-color);
                    outline: none;
                    color: inherit;
                    width: 60%;
                    padding: .8rem 1rem;
                }
            }

            
        }
    }
`;


export default ContactPage
