import React from 'react';
import { COLORS, FONTS } from '../../assets/theme'
import { Input, Button } from '../../basicComponents';
import { useState } from 'react';
import axios from 'axios';

function Login({ loginF }) {

    const [login, setLogin] = useState({
        "username": '',
        "password": '',

    });

    const [type, setType] = useState("password")
    const [icon, setIcon] = useState("eye")

    const handleIconClick = () => {
        if (type === "password") {
            setType('text');
            setIcon('eye-slash');
        }
        else {
            setType('password');
            setIcon('eye')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(login)

        axios.post('http://localhost:8080/api/login', login).then(res => {
            if (res.data) {
                localStorage.setItem("loggedIn",true);
                window.location.href = "/dashboard"
            }
        })
    }



    return (
        //
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            justifyItems: 'center',
            backgroundImage: 'linear-gradient(310deg ,rgba(69, 32, 114,1),rgba(233, 228, 239,1))',
            backgroundSize: 'cover',
            backgroundPosition: 'ceter',
            width: '100vw',
            height: '100vh'

        }}>

            <div style={{
                display: 'flex',

                paddingTop: 50,
                flexDirection: 'column',
                alignItems: 'center',
                width: 500,
                height: 500,

            }}>

                <div style={{
                    width: "400px",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginBottom: "40px"

                }}>

                    <img src={require('../../assets/images/logo.png').default} alt="logo" />
                </div>

                <form onSubmit={(e) => handleSubmit(e)}>
                    <Input label="Nom d'utilisateur" labelColor={COLORS.white} width="300px" name="username" data={login} setData={setLogin} />
                    <Input label="Mot de passe" labelColor={COLORS.white} width="300px" name="password" data={login} setData={setLogin} type={type} icon={icon} onClickIcon={() => handleIconClick()} />


                    <div style={{
                        marginTop: 20,
                        width: "300px",
                        display: 'flex',
                        justifyContent: 'center',
                    }}>
                        <Button bgColor={COLORS.purple} width="180px" text="Se connecter" textColor={COLORS.white} type="submit" />
                    </div>
                </form>



            </div>

        </div>
    );
}
export default Login;