import React from 'react';
import { withRouter } from 'react-router-dom';

const PetsListItem = (props) => {

    const changeRoute = () => {
        const { history, id } = props;
        history.push(`/${id}`);
    }

    const imgSrc = () => {
        const {photos} = props;
        return photos.length > 0 ?
            photos[0].medium.substring(0, photos[0].medium.indexOf('?') + 1) + "width=200" :
            process.env.PUBLIC_URL + '/DogPlaceholder.svg';
    }

    return (
        <div className="app_card" onClick={changeRoute}>
            <div className="app_card-image" style={{backgroundImage: `url(${imgSrc()})`}}>
                <img src={imgSrc()} style={{display: "none"}} alt={props.name} />
            </div>
            <div className="app_card-details">
                <h3>{props.name}</h3>
                <p>{`Primary Breed: ${props.primaryBreed}`}</p>
                <p>{`Secondary Breed: ${props.secondaryBreed === null ? '' : props.secondaryBreed }`}</p>
            </div>
        </div>
    );
}

export default withRouter(PetsListItem);