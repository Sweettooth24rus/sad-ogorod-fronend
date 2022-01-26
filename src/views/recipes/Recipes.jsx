import { MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import './Recipes.scss';

const Recipes = () => {
    const [recipes, setRecipes] = React.useState([]);
    const [filter, setFilter] = React.useState('');

    React.useEffect(() => {
        getRecipes();
    }, [])

    const getRecipes = async (sort = '-id') => {
        const recipesResponse = await axios.get(`/recipe/all?sort=${sort}`)
        setRecipes(recipesResponse.data.content)
    }

    return(
        <div className={'Recipes'}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <TextField style={{marginTop: 20}} label={'Поиск'} onChange={e => setFilter(e.target.value)} />
            <Select defaultValue={'-id'} style={{marginTop: 20, marginLeft: 20}} onChange={e => getRecipes(e.target.value)}>
                <MenuItem value={'-id'}>По умолчанию</MenuItem>
                <MenuItem value={'-name'}>По имени</MenuItem>
                <MenuItem value={'days'}>По сроку выращивания</MenuItem>
                <MenuItem value={'difficulty'}>По сложности</MenuItem>
            </Select>
            </div>
            {recipes.map(recipe => {
                if(recipe.name.toLowerCase().includes(filter.toLowerCase())){
                    return(
                        <Link className={'Recipes__recipeBlock'} to={`/recipe/${recipe.id}`}>
                            <img src={axios.defaults.baseURL + `file/${recipe.photo.uuid}`} className={'Recipes__image'} />
                            <div>
                                <p className={'Recipes__title'}>{recipe.name}</p>
                                <p className={'Recipes__option'}>Сложность: {recipe.difficulty}</p>
                                <p className={'Repices__option'}>Срок выращивания: {recipe.days} дней</p>
                            </div>
                        </Link>);
                }
            })}
        </div>
    )
}

export default Recipes;
