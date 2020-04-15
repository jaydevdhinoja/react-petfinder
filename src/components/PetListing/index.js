import React from 'react';
import Pet from '../PetDetails';
import { usePetsListingContext } from '../../Provider/PetsListingProvider';
import Filters from '../Filters';

const PetsListing = () => {
	const { petsListing, productCategory, productCategoryCount } = usePetsListingContext();

	let listingItems = <div className="app_card-title">No items found!</div>;
	if (petsListing.length > 0) {
		listingItems = petsListing.map((item) => {
			const price = item.price.find((obj) => obj.usage === 'Display');
			return (
				<Pet
					key={item.uniqueID}
					url={item.thumbnail}
					title={item.name}
					price={`$${price ? price.value : 0}`}
				/>
			);
		});
	}
	return (
		<div className="app_container">
			<div className="app_center_heading">
				<h3 className="app_center_title">{productCategory}</h3>
				<div className="app_center_count">{`${productCategoryCount} items`}</div>
			</div>
			<div className="app_box-filter app_productsContainer">
				<div className="app_filterContainer">
					<Filters />
				</div>
				<div className="app_box app_listingItemContainer">{listingItems}</div>
			</div>
		</div>
	);
};

export default PetsListing;
