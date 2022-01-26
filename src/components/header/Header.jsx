import React from "react";
import { Link } from "react-router-dom";
import './Header.scss';

const Header = () => {
    return(
        <div className={'Header'}>
            <Link to={'/'} className={'Header__title'}>Sad Ogorod</Link>
            <div>
            <Link to={'/recipe/add'} className="Header__modules">Добавить рецепт</Link>
            <Link to={'/modules'} className={'Header__modules'}>Модули</Link>
            </div>
        </div>
    )
}

export default Header;
