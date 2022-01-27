import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import './Tea.scss';

const Tea = () => {
    const [houses, setHouses] = React.useState([]);
    const isAdmin = JSON.parse(localStorage.getItem('user'));

    React.useEffect(() => {
        getHouses();
    }, [])

    const getHouses = async () => {
        const recipesResponse = await axios.get('/tea/all')
        setHouses(recipesResponse.data.content)
    }

    const deleteTea = async id => {
        await axios.delete(`/tea/${id}`);
        getHouses();
    }

    return(
        <div className={'Recipes'}>
            <p style={{fontSize: 30}}>Чаи</p>
            {JSON.parse(localStorage.getItem('user')).role === 'ADMIN' && <Link style={{textDecoration: 'none', color: 'green'}} to={'/tea/add'}>Добавить чай</Link>}
            {houses.map(recipe => {
                return(
                <div className={'Recipes__recipeBlock'}>
                    <img src={axios.defaults.baseURL + `file/${recipe.photo.uuid}`} className={'Recipes__image'} />
                    <div style={{position: 'relative', width: '60%'}}>
                        <Link to={`/tea/${recipe.id}`} style={{textDecoration: 'none', color: 'green'}} className={'Recipes__title'}>{recipe.name}</Link>
                        {isAdmin && <Link to={`/tea/${recipe.id}/edit`}><img style={{position: 'absolute', top: 0, right: 40}} src="https://img.icons8.com/ios/30/000000/edit--v1.png"/></Link>}
                        {isAdmin && <img onClick={() => deleteTea(recipe.id)} style={{position: 'absolute', top: 0, right: 0, zIndex: 10}} src="https://img.icons8.com/wired/30/000000/filled-trash.png"/>}
                    </div>
                </div>);
            })}
        </div>
    )
}

export default Tea;
