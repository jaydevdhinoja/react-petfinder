import React from "react";
import { usePetsListingContext } from '../../Provider/PetsListingProvider';
import { withRouter } from 'react-router-dom';

const PetDetails = (props) => {

  const { pets } = usePetsListingContext();

  const selectedPet = pets.length > 0 ? pets.find(pet => parseInt(pet.id) === parseInt(props.match.params.id)) : undefined;

  const imgSrc = () => {
    if(selectedPet.photos.length > 0) {
      return selectedPet.photos[0].large;
    } else {
      return process.env.PUBLIC_URL + '/DogPlaceholder.svg'
    }
}

  if(!selectedPet) {
    return (
      <div className="app_box app_container">
        Loading...
      </div>
    )
  } else {
    return (
      <div>
        <div className="app_back" onClick={() => props.history.push('/')}>Back to listing</div>
        <div className="app_box app_container">
          <div className="app_card_view">
            <div className="app_card_view_image">
                <img src={imgSrc()} alt={selectedPet.name}/>
            </div>
            <div className="app_card_view-details">
                <h2>{selectedPet.name}</h2>
                <p className='app_card-details'>{selectedPet.contact.email}</p>
                <p className='app_card-details'>{selectedPet.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default withRouter(PetDetails);
