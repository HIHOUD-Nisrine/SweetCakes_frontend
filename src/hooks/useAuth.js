import { useState } from "react";
import axios from 'axios';


export default function useAuth(initialValue) {
    const [isAuth, setIsAuth] = useState(initialValue);

    function login(userCredentials) {
        setTimeout(() => {
            axios.post('http://localhost:8080/api/login', userCredentials).then(res => {
                if (res.data){
                    setIsAuth(true);
                    window.location.href = "/dashboard"
                }
                console.log("sssssssssssssss : ",isAuth)
            })
        }, 1000);
    }

    function logout() {
        setTimeout(() => {
            setIsAuth(false);
            window.location.href = "/login"
        }, 1000);
    }

    return [isAuth, login, logout];
}