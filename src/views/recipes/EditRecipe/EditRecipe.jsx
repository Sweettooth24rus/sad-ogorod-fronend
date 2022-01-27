import { Button, Input, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import './EditRecipe.scss';

const EditRecipe = () => {
    const {recipeId} = useParams();
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
        const dictionaries = await axios.get('/dictionaries/all');
        setTypes(dictionaries.data);
        const recipe = await axios.get(`/recipe/${recipeId}`);
        const lightType = dictionaries.data.LightType.indexOf(dictionaries.data.LightType.filter(item => item.value === recipe.data.lightType)[0]) + 1;
        const groundType = dictionaries.data.GroundType.indexOf(dictionaries.data.GroundType.filter(item => item.value === recipe.data.groundType)[0]) + 1;
        const difficulty = dictionaries.data.Difficulty.indexOf(dictionaries.data.Difficulty.filter(item => item.value === recipe.data.difficulty)[0]) + 1;
        setRecipe({...recipe.data, lightType, groundType, difficulty})
    }


    const saveImage = async (image) => {
        let formdata = new FormData();
        formdata.append('document', image);

        setRecipe({...recipe, photo: (await axios.post('/file/upload', formdata)).data});
    }

    const saveRecipe = async () => {
        try {
            await axios.put(`/recipe/${recipeId}`, recipe);
            open('Рецепт успешно изменен');
            navigate('/')
        } catch (err) {
            open('Произошла ошибка. Проверьте введенные данные')
        }

    }

    if (types){
        return(
            <div className={'AddRecipe'}>
                <p className={'AddRecipe__title'}>Изменить рецепт</p>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                <Input type={'file'} onChange={e => saveImage(e.target.files[0])} />
                <TextField value={recipe.name} className={'AddRecipe__input'} style={{marginTop: 20}} variant={'outlined'} placeholder={'Название рецепта'} onChange={e => setRecipe({...recipe, name: e.target.value})} />
                <TextField value={recipe.description} className={'AddRecipe__input'} style={{marginTop: 20}}  variant={'outlined'} multiline rows={5} placeholder={'Описание'} onChange={e => setRecipe({...recipe, description: e.target.value})} />
                <TextField value={recipe.comment} className={'AddRecipe__input'} style={{marginTop: 20}}  variant={'outlined'} multiline rows={5} placeholder={'Комментарий'} onChange={e => setRecipe({...recipe, comment: e.target.value})} />
                <TextField value={recipe.maxTemperature} className={'AddRecipe__input'} style={{marginTop: 20}}  type={'number'} variant={'outlined'} placeholder={'Максимальная температура'} onChange={e => setRecipe({...recipe, maxTemperature: e.target.value})} />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', marginLeft: 50}}>
                <TextField value={recipe.minTemperature} className={'AddRecipe__input'} style={{marginTop: 20}}  type={'number'} variant={'outlined'} placeholder={'Минимальная температура'} onChange={e => setRecipe({...recipe, minTemperature: e.target.value})} />
                <TextField value={recipe.lightTime} className={'AddRecipe__input'} style={{marginTop: 20}}  type={'number'} variant={'outlined'} placeholder={'Оптимальное время под солнцем'} onChange={e => setRecipe({...recipe, lightTime: e.target.value})} />
                <TextField value={recipe.days} className={'AddRecipe__input'} style={{marginTop: 20}}  type={'number'} variant={'outlined'} placeholder={'Срок выращивания'} onChange={e => setRecipe({...recipe, days: e.target.value})} />
                <Select className={'AddRecipe__input'} style={{marginTop: 20}}  value={recipe.lightType} onChange={e => setRecipe({...recipe, lightType: e.target.value})}>
                    {types.LightType.map(item => {
                        return <MenuItem key={item.key} value={types.LightType.indexOf(item) + 1}>{item.value}</MenuItem>
                    })}
                </Select>
                <Select className={'AddRecipe__input'} style={{marginTop: 20}}  value={recipe.groundType} onChange={e => setRecipe({...recipe, groundType: e.target.value})}>
                    {types.GroundType.map(item => {
                        return <MenuItem key={item.key} value={types.GroundType.indexOf(item) + 1}>{item.value}</MenuItem>
                    })}
                </Select>
                <Select className={'AddRecipe__input'} style={{marginTop: 20}}  value={recipe.difficulty} onChange={e => setRecipe({...recipe, difficulty: e.target.value})}>
                    {types.Difficulty.map(item => {
                        return <MenuItem key={item.key} value={types.Difficulty.indexOf(item) + 1}>{item.value}</MenuItem>
                    })}
                </Select>
                </div>
                </div>

                <Button variant={'contained'} onClick={saveRecipe} style={{marginTop: 20}} className={'AddRecipe__input'}>Сохранить</Button>
            </div>
        )
    }

    return null;
}

export default EditRecipe;
