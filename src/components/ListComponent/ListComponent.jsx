import React from "react";
import './ListComponent.scss';

const ListComponent = ({img, name, description, onClick}) => {
    return(
        <div className={'ListComponent'} style={{display: 'flex', flexDirection: 'row'}}>
            <img src={img} className={'ListComponent__img'} />
            <div>
                <p>{name}</p>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default ListComponent;
