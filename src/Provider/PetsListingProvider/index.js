import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client } from "@petfinder/petfinder-js";

const defaultState = {
	pets: [],
	searchTerm: ''
};

export const PetsListingContext = createContext(defaultState);

const client = new Client({apiKey: 'lZrY2wFLzhyEUefSPPn4JjEwIUBMP0gppdb1EEI9CXRRT629HL', secret: 'PgC6ma6wEX2Ll79BbODrGTX6IcKvwMnj7zVuAlOu'});

const PetsListingProvider = ({ children }) => {
	const InitialState = () => defaultState;

	const [ initialState, setInitialState ] = useState(InitialState());

	useEffect(
		() => {
			const loadPetsData = async () => {
				try {
					const animalType = {type: 'Dog' }
					const breed = initialState.searchTerm !== '' && initialState.searchTerm ? { breed: initialState.searchTerm } : {} 
					client.animal.search({...animalType, ...breed})
					.then(function (response) {
						let petfinderData = response.data;
						console.log(petfinderData)
						setInitialState({
							...initialState,
							pets: petfinderData.animals
						});
					})
					.catch(function (error) {
						console.log(error)
						setInitialState({
							...initialState, pets: []
						})
					});
				} catch (e) {
					console.error(e);
				}
			};
			loadPetsData();
		},
		[ initialState.searchTerm ]
	);

	return (
		<PetsListingContext.Provider
			value={{
				...initialState,
				setSearchTerm: (item) => {
					setInitialState({ ...initialState, searchTerm: item });
				}
			}}
		>
			{children}
		</PetsListingContext.Provider>
	);
};

export default PetsListingProvider;

export const usePetsListingContext = () => {
	return useContext(PetsListingContext);
};
