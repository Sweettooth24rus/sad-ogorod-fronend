import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import './Garden.scss';

const Garden = () => {
    const [houses, setHouses] = React.useState([]);

    React.useEffect(() => {
        getHouses();
    }, [])

    const getHouses = async () => {
        const recipesResponse = await axios.get('/garden/all')
        setHouses(recipesResponse.data.content)
    }

    return(
        <div className={'Recipes'}>
            <p style={{fontSize: 30}}>Сады</p>
            {JSON.parse(localStorage.getItem('user')).role === 'ADMIN' && <Link style={{textDecoration: 'none', color: 'green'}} to={'/garden/add'}>Добавить сад</Link>}
            {houses.map(recipe => {
                return(
                <Link className={'Recipes__recipeBlock'} to={`/garden/${recipe.id}`}>
                    <img src={axios.defaults.baseURL + `file/${recipe.photo.uuid}`} className={'Recipes__image'} />
                    <div>
                        <p className={'Recipes__title'}>{recipe.name}</p>
                    </div>
                </Link>);
            })}
        </div>
    )
}

export default Garden;
