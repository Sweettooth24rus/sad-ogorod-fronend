import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import './Weed.scss';

const Weed = () => {
    const [weeds, setWeeds] = React.useState([]);
    const isAdmin = JSON.parse(localStorage.getItem('user'));

    React.useEffect(() => {
        getWeeds();
    }, [])

    const getWeeds = async () => {
        const recipesResponse = await axios.get('/weed/all')
        setWeeds(recipesResponse.data.content)
    }

    const deleteWeed = async id => {
        await axios.delete(`/weed/${id}`);
        getWeeds();
    }

    return(
        <div className={'Recipes'}>
            <p style={{fontSize: 30}}>Сорняки</p>
            {JSON.parse(localStorage.getItem('user')).role === 'ADMIN' && <Link style={{textDecoration: 'none', color: 'green'}} to={'/weed/add'}>Добавить сорняк</Link>}
            {weeds.map(recipe => {
                return(
                <div className={'Recipes__recipeBlock'} >
                    <img src={axios.defaults.baseURL + `file/${recipe.photo.uuid}`} className={'Recipes__image'} />
                    <div style={{position: 'relative', width: '60%'}}>
                        <Link to={`/weed/${recipe.id}`} style={{textDecoration: 'none', color: 'green'}} className={'Recipes__title'}>{recipe.name}</Link>
                        {isAdmin && <Link to={`/weed/${recipe.id}/edit`}><img style={{position: 'absolute', top: 0, right: 40}} src="https://img.icons8.com/ios/30/000000/edit--v1.png"/></Link>}
                        {isAdmin && <img onClick={() => deleteWeed(recipe.id)} style={{position: 'absolute', top: 0, right: 0, zIndex: 10}} src="https://img.icons8.com/wired/30/000000/filled-trash.png"/>}
                    </div>
                </div>);
            })}
        </div>
    )
}

export default Weed;
