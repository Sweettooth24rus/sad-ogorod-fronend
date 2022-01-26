import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import './Recipe.scss';

const Recipe = () => {
    const {recipeId} = useParams();
    const [recipe, setRecipe] = React.useState(null)

    React.useEffect(() => {
        getRecipeInfo()
    }, [])

    const getRecipeInfo = async () => {
        setRecipe((await axios.get(`/recipe/${recipeId}`)).data);
    };

    if (recipe){
        return(
            <div className={'Recipe'}>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <img src={axios.defaults.baseURL + `file/${recipe.photo.uuid}`} className={'Recipe__image'} />
                    <div>
                        <p className={'Recipe__title'}>{recipe.name}</p>
                        <p>Сложность: {recipe.difficulty}</p>
                        <p>Срок выращивания: {recipe.days} дней</p>
                        <p>Тип земли: {recipe.groundType}</p>
                        <p>Тип света: {recipe.lightType}</p>
                        <p>Необходимая длительность солнца: {recipe.lightTime} часов(а)</p>
                        <p>Максимальная температура: {recipe.maxTemperature}</p>
                        <p>Минимальная температура: {recipe.minTemperature}</p>
                    </div>
                </div>
                <p className={'Recipe__title'} style={{marginLeft: 30}}>Описание:</p>
                <p>{recipe.description}</p>
                <p className={'Recipe__title'} style={{marginLeft: 30}}>Комментарий:</p>
                <p>{recipe.comment}</p>
            </div>
        )
    }

    return null;
}

export default Recipe;
