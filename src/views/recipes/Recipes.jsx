import { MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import './Recipes.scss';

const Recipes = () => {
    const [recipes, setRecipes] = React.useState([]);
    const [filter, setFilter] = React.useState('');
    const isAdmin = JSON.parse(localStorage.getItem('user'));

    React.useEffect(() => {
        getRecipes();
    }, [])

    const getRecipes = async (sort = '-id') => {
        const recipesResponse = await axios.get(`/recipe/all?sort=${sort}`)
        setRecipes(recipesResponse.data.content)
    }

    const deleteRecipe = async id => {
        await axios.delete(`/recipe/${id}`)
        getRecipes();
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
                        <div className={'Recipes__recipeBlock'}>
                            <img src={axios.defaults.baseURL + `file/${recipe.photo.uuid}`} className={'Recipes__image'} />
                            <div style={{position: 'relative', width: '100%'}}>
                                <Link to={`/recipe/${recipe.id}`} style={{textDecoration: 'none', color: 'green'}} className={'Recipes__title'}>{recipe.name}</Link>
                                <p className={'Recipes__option'}>Сложность: {recipe.difficulty}</p>
                                <p className={'Repices__option'}>Срок выращивания: {recipe.days} дней</p>
                                {isAdmin && <Link to={`/recipe/${recipe.id}/edit`}><img style={{position: 'absolute', top: 0, right: 40}} src="https://img.icons8.com/ios/30/000000/edit--v1.png"/></Link>}
                                {isAdmin && <img onClick={() => deleteRecipe(recipe.id)} style={{position: 'absolute', top: 0, right: 0, zIndex: 10}} src="https://img.icons8.com/wired/30/000000/filled-trash.png"/>}
                            </div>
                        </div>);
                }
            })}
        </div>
    )
}

export default Recipes;
