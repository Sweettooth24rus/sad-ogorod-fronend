import { Button, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import './Register.scss';

const Register = () => {
    const [openSnackBar] = useSnackbar();
    const navigate = useNavigate();
    const [userCredentials, setUserCredentials] = React.useState({
        username: '',
        password: '',
        lastName: '',
        firstName: '',
        patronymicName: '',
        email: '',
        phone: '',
    })

    const register = async e => {
        e.preventDefault();
        try {
            await axios.post('/user/', userCredentials);
            openSnackBar('На ваш email было отправлено письмо с потдверждением аккаунта');
            navigate('/');
        } catch (err) {
            openSnackBar('Возникла ошибка. Проверьте введенные данные')
        }
    }

    return(
        <div className="Register">
            <h3>Регистрация</h3>
            <form onSubmit={register}>
                <TextField onChange={e => setUserCredentials({...userCredentials, username: e.target.value})} className="Register__input" id="outlined-basic" label="Логин" variant="outlined" />
                <TextField type={'password'} onChange={e => setUserCredentials({...userCredentials, password: e.target.value})} className="Register__input" id="outlined-basic" label="Пароль" variant="outlined" />
                <TextField onChange={e => setUserCredentials({...userCredentials, firstName: e.target.value})} className="Register__input" id="outlined-basic" label="Имя" variant="outlined" />
                <TextField onChange={e => setUserCredentials({...userCredentials, lastName: e.target.value})} className="Register__input" id="outlined-basic" label="Фамилия" variant="outlined" />
                <TextField onChange={e => setUserCredentials({...userCredentials, patronymicName: e.target.value})} className="Register__input" id="outlined-basic" label="Отчество" variant="outlined" />
                <TextField onChange={e => setUserCredentials({...userCredentials, email: e.target.value})} className="Register__input" id="outlined-basic" label="Email" variant="outlined" />
                <TextField onChange={e => setUserCredentials({...userCredentials, phone: e.target.value})} className="Register__input" id="outlined-basic" label="Телефон" variant="outlined" />
                <Button type="submit" onSubmit={register} className="Register__button" variant="contained">Зарегистрироваться</Button>
                <Link className="Register__authLabel" to={'/'}>Войти</Link>
            </form>
        </div>
    )
}

export default Register;
