import { Button, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import './Auth.scss';

const Auth = () => {
    const [openSnackbar, closeSnackbar] = useSnackbar()
    const [userCredentials, setUserCredentials] = React.useState({
        username: '',
        password: '',
    })

    const login = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/user/login', userCredentials);
            const user = await axios.get('/user/current/');
            localStorage.setItem('user', JSON.stringify(user.data));
            window.location.reload();
        } catch (err){
            openSnackbar('Неверный логин или пароль')
        }
    }

    return(
        <div className="Auth">
            <h3>Авторизация</h3>
            <form onSubmit={login}>
                <TextField onChange={e => setUserCredentials({...userCredentials, username: e.target.value})} className="Auth__input" id="outlined-basic" label="Логин" variant="outlined" />
                <TextField type={'password'} onChange={e => setUserCredentials({...userCredentials, password: e.target.value})} className="Auth__input" id="outlined-basic" label="Пароль" variant="outlined" />
                <Button type="submit" onSubmit={login} className="Auth__button" variant="contained">Войти</Button>
                <Link className="Auth__registerLabel" to={'/register'}>Зарегистрироваться</Link>
            </form>
        </div>
    )
}

export default Auth;
