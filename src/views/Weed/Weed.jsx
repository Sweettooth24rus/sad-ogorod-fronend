import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import './Weed.scss';

const Weed = () => {
    const [weeds, setWeeds] = React.useState([]);

    React.useEffect(() => {
        getWeeds();
    }, [])

    const getWeeds = async () => {
        const recipesResponse = await axios.get('/weed/all')
        setWeeds(recipesResponse.data.content)
    }

    return(
        <div className={'Recipes'}>
            <p style={{fontSize: 30}}>Сорняки</p>
            {JSON.parse(localStorage.getItem('user')).role === 'ADMIN' && <Link style={{textDecoration: 'none', color: 'green'}} to={'/weed/add'}>Добавить сорняк</Link>}
            {weeds.map(recipe => {
                return(
                <Link className={'Recipes__recipeBlock'} to={`/weed/${recipe.id}`}>
                    <img src={axios.defaults.baseURL + `file/${recipe.photo.uuid}`} className={'Recipes__image'} />
                    <div>
                        <p className={'Recipes__title'}>{recipe.name}</p>
                    </div>
                </Link>);
            })}
        </div>
    )
}

export default Weed;
