import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client } from "@petfinder/petfinder-js";

const defaultState = {
	pets: [],
	searchTerm: ''
};

export const PetsListingContext = createContext(defaultState);

const client = new Client({apiKey: process.env.API_KEY, secret: process.env.SECRET_KEY});

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
