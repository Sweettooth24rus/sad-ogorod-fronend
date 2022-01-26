import { Button, Input, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import './AddRecipe.scss';

const AddRecipe = () => {
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
            await axios.post('/recipe/', recipe);
            open('Рецепт успешно добавлен');
            navigate('/')
        } catch (err) {
            open('Произошла ошибка. Проверьте введенные данные')
        }

    }

    if (types){
        return(
            <div className={'AddRecipe'}>
                <p className={'AddRecipe__title'}>Добавить рецепт</p>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                <Input type={'file'} onChange={e => saveImage(e.target.files[0])} />
                <TextField className={'AddRecipe__input'} style={{marginTop: 20}} variant={'outlined'} label={'Название рецепта'} onChange={e => setRecipe({...recipe, name: e.target.value})} />
                <TextField className={'AddRecipe__input'} style={{marginTop: 20}}  variant={'outlined'} multiline rows={5} label={'Описание'} onChange={e => setRecipe({...recipe, description: e.target.value})} />
                <TextField className={'AddRecipe__input'} style={{marginTop: 20}}  variant={'outlined'} multiline rows={5} label={'Комментарий'} onChange={e => setRecipe({...recipe, comment: e.target.value})} />
                <TextField className={'AddRecipe__input'} style={{marginTop: 20}}  type={'number'} variant={'outlined'} label={'Максимальная температура'} onChange={e => setRecipe({...recipe, maxTemperature: e.target.value})} />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50}}>
                <TextField className={'AddRecipe__input'} style={{marginTop: 20}}  type={'number'} variant={'outlined'} label={'Минимальная температура'} onChange={e => setRecipe({...recipe, minTemperature: e.target.value})} />
                <TextField className={'AddRecipe__input'} style={{marginTop: 20}}  type={'number'} variant={'outlined'} label={'Оптимальное время под солнцем'} onChange={e => setRecipe({...recipe, lightTime: e.target.value})} />
                <TextField className={'AddRecipe__input'} style={{marginTop: 20}}  type={'number'} variant={'outlined'} label={'Срок выращивания'} onChange={e => setRecipe({...recipe, days: e.target.value})} />
                <Select className={'AddRecipe__input'} style={{marginTop: 20}}  value={recipe.lightType} onChange={e => setRecipe({...recipe, lightType: e.target.value})}>
                    {types.LightType.map(item => {
                        return <MenuItem key={item.key} value={types.LightType.indexOf(item) + 1}>{item.value}</MenuItem>
                    })}
                </Select>
                <Select className={'AddRecipe__input'} style={{marginTop: 20}}  value={recipe.groundType}>
                    {types.GroundType.map(item => {
                        return <MenuItem key={item.key} value={types.GroundType.indexOf(item) + 1}>{item.value}</MenuItem>
                    })}
                </Select>
                <Select className={'AddRecipe__input'} style={{marginTop: 20}}  value={recipe.difficulty}>
                    {types.Difficulty.map(item => {
                        return <MenuItem key={item.key} value={types.Difficulty.indexOf(item) + 1}>{item.value}</MenuItem>
                    })}
                </Select>
                </div>
                </div>

                <Button variant={'contained'} onClick={saveRecipe} style={{marginTop: 20}} className={'AddRecipe__input'}>Создать</Button>
            </div>
        )
    }

    return null;
}

export default AddRecipe;
