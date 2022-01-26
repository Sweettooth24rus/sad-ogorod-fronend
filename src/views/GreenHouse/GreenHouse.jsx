import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import './GreenHouse.scss';

const GreenHouse = () => {
    const [houses, setHouses] = React.useState([]);

    React.useEffect(() => {
        getHouses();
    }, [])

    const getHouses = async () => {
        const recipesResponse = await axios.get('/greenhouse/all')
        setHouses(recipesResponse.data.content)
    }

    return(
        <div className={'Recipes'}>
            <p style={{fontSize: 30}}>Теплицы</p>
            {JSON.parse(localStorage.getItem('user')).role === 'ADMIN' && <Link style={{textDecoration: 'none', color: 'green'}} to={'/greenhouse/add'}>Добавить теплицу</Link>}
            {houses.map(recipe => {
                return(
                <Link className={'Recipes__recipeBlock'} to={`/house/${recipe.id}`}>
                    <img src={axios.defaults.baseURL + `file/${recipe.photo.uuid}`} className={'Recipes__image'} />
                    <div>
                        <p className={'Recipes__title'}>{recipe.name}</p>
                    </div>
                </Link>);
            })}
        </div>
    )
}

export default GreenHouse;
