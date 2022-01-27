import { Button, Input, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import './EditTea.scss';

const EditTea = () => {
    const {teaId} = useParams();
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
        time: 0,
    })

    React.useEffect(() => {
        getTypes();
    }, []);

    const getTypes = async () => {
        setTypes((await axios.get('/dictionaries/all')).data);
        setRecipe((await axios.get(`/tea/${teaId}`)).data)
    }

    const saveImage = async (image) => {
        let formdata = new FormData();
        formdata.append('document', image);

        setRecipe({...recipe, photo: (await axios.post('/file/upload', formdata)).data});
    }

    const saveRecipe = async () => {
        try {
            await axios.put(`/tea/${teaId}`, recipe);
            open('Чай успешно изменен');
            navigate('/modules/ApiTea')
        } catch (err) {
            open('Произошла ошибка. Проверьте введенные данные')
        }

    }

    if (types){
        return(
            <div className={'AddRecipe'}>
                <p className={'AddRecipe__title'}>Изменить чай</p>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                <Input type={'file'} onChange={e => saveImage(e.target.files[0])} />
                <TextField value={recipe.name} className={'AddRecipe__input'} style={{marginTop: 20}} variant={'outlined'} label={'Название Чая'} onChange={e => setRecipe({...recipe, name: e.target.value})} />
                <TextField value={recipe.description} className={'AddRecipe__input'} style={{marginTop: 20}}  variant={'outlined'} multiline rows={5} label={'Описание'} onChange={e => setRecipe({...recipe, description: e.target.value})} />
                <TextField value={recipe.time} className={'AddRecipe__input'} style={{marginTop: 20}}  type={'number'} variant={'outlined'} label={'Время заварки'} onChange={e => setRecipe({...recipe, time: e.target.value})} />
                </div>

                <Button variant={'contained'} onClick={saveRecipe} style={{marginTop: 20}} className={'AddRecipe__input'}>Сохранить</Button>
            </div>
        )
    }

    return null;
}

export default EditTea;
