import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import './Pickle.scss';

const Pickles = () => {
    const [pickles, setPickles] = React.useState([]);

    React.useEffect(() => {
        getPickles();
    }, [])

    const getPickles = async () => {
        const recipesResponse = await axios.get('/pickle/all')
        setPickles(recipesResponse.data.content);
        // setWeeds(recipesResponse.data.content)
    }

    return(
        <div className={'Recipes'}>
            <p style={{fontSize: 30}}>Соленья</p>
            {JSON.parse(localStorage.getItem('user')).role === 'ADMIN' && <Link style={{textDecoration: 'none', color: 'green'}} to={'/pickle/add'}>Добавить соленье</Link>}
            {pickles.map(recipe => {
                return(
                <Link className={'Recipes__recipeBlock'} to={`/pickle/${recipe.id}`}>
                    <img src={axios.defaults.baseURL + `file/${recipe.photo.uuid}`} className={'Recipes__image'} />
                    <div>
                        <p className={'Recipes__title'}>{recipe.name}</p>
                    </div>
                </Link>);
            })}
        </div>
    )
}

export default Pickles;
