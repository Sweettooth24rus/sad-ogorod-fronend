import { Button, Input, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import './AddPickle.scss';

const AddPickle = () => {
    const navigate = useNavigate();
    const [open, close] = useSnackbar();
    const [types, setTypes] = React.useState(null);
    const [recipe, setRecipe] = React.useState({
        name: '',
        description: '',
        photo: null,
        days: 0,
        lightType: 1,
        lightTime: 0,
        groundType: 1,
        minTemperature: 0,
        maxTemperature: 0,
        difficulty: 1,
        comment: '',
    })

    React.useEffect(() => {
        getTypes();
    }, []);

    const getTypes = async () => {
        setTypes((await axios.get('/dictionaries/all')).data);
    }

    const saveImage = async (image) => {
        let formdata = new FormData();
        formdata.append('document', image);

        setRecipe({...recipe, photo: (await axios.post('/file/upload', formdata)).data});
    }

    const saveRecipe = async () => {
        try {
            await axios.post('/pickle/', recipe);
            open('Соленье успешно добавлено');
            navigate('/modules/ApiPickle')
        } catch (err) {
            open('Произошла ошибка. Проверьте введенные данные')
        }

    }

    if (types){
        return(
            <div className={'AddRecipe'}>
                <p className={'AddRecipe__title'}>Добавить соленье</p>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                <Input type={'file'} onChange={e => saveImage(e.target.files[0])} />
                <TextField className={'AddRecipe__input'} style={{marginTop: 20}} variant={'outlined'} label={'Название соленья'} onChange={e => setRecipe({...recipe, name: e.target.value})} />
                <TextField className={'AddRecipe__input'} style={{marginTop: 20}}  variant={'outlined'} multiline rows={5} label={'Описание'} onChange={e => setRecipe({...recipe, description: e.target.value})} />
                </div>

                <Button variant={'contained'} onClick={saveRecipe} style={{marginTop: 20}} className={'AddRecipe__input'}>Создать</Button>
            </div>
        )
    }

    return null;
}

export default AddPickle;
