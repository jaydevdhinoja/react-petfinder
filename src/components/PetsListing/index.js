import React, { useState } from 'react';
import PetListItem from '../PetsListItem';
import { usePetsListingContext } from '../../Provider/PetsListingProvider';

const PetsListing = () => {
	const { pets, setSearchTerm } = usePetsListingContext();
	const [searchText, setSearchText ] = useState('');

	let listingItems = <div className="app_card-title">No items found!</div>;
	if (pets.length > 0) {
		listingItems = pets.map(animal => {
			return (
			  <PetListItem
				key={animal.id}
				id={animal.id}
				name={animal.name}
				photos={animal.photos}
				primaryBreed={animal.breeds.primary}
				secondaryBreed={animal.breeds.secondary}
				description={animal.description}
			  />
			);
		  })
	}

	const onSearch = (e) => {
		e.preventDefault()
		setSearchTerm(searchText)
	}

	return (
		<form onSubmit={onSearch}>
			<div className="app_container">
				<div>
					Pet Finder
				</div>
				<div className="app_center_heading">
					<div className="app_center_title">
						Search
					</div>
					<div className="app_center_wrap">
						<input type="text" className="app_center_searchTerm" placeholder="What are you looking for?" value={searchText} onChange={e => setSearchText(e.target.value)}/>
					</div>
				</div>
				<div className="app_box">{listingItems}</div>
			</div>
		</form>
	);
};

export default PetsListing;
