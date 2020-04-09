import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import PetDetails from '.';
import { PetsListingContext } from '../../Provider/PetsListingProvider';
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

afterEach(cleanup);

const InitialState = {
	pets: [
		{
			id: 47782140,
			organization_id: "FL850",
			url: "https://www.petfinder.com/dog/fred-47782140/fl/miami-beach/dachshund-rescue-south-florida-fl850/?referrer_id=b5f7363e-4d07-4756-ab82-d3a8060feccd",
			type: "Dog",
			species: "Dog",
			breeds: {primary: "Dachshund", secondary: null, mixed: false, unknown: false},
			colors: {primary: "Red / Chestnut / Orange", secondary: null, tertiary: null},
			age: "Adult",
			gender: "Male",
			size: "Small",
			name: "Fred",
			coat: "Short",
			description: "Can you say &quot;Personality? This is Fred and he has is in loads!  He is a handsome 9 year old...",
			photos: [
				{
					small: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/47782140/5/?bust=1586432382&width=100",
					medium: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/47782140/5/?bust=1586432382&width=300",
					large: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/47782140/5/?bust=1586432382&width=600",
					full: "https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/47782140/5/?bust=1586432382"
				}
			]
		}
	],
	searchTerm: ''
};

const defaultProps = {
	match: { params: { id: 47782140 }, path:'/:id' }
};

function renderWithContext(node, { value, ...options }) {
	return render(<PetsListingContext.Provider value={value}>{node}</PetsListingContext.Provider>, options);
}

function renderWithRouter(
	ui,
	{
	  route = '/',
	  history = createMemoryHistory({ initialEntries: [route] }),
	} = {}
  ) {
	const Wrapper = ({ children }) => (
	  <Router history={history}>{children}</Router>
	)
	return {
		...renderWithContext(render(ui, { wrapper: Wrapper })),
	  // adding `history` to the returned utilities to allow us
	  // to reference it in our tests (just try to avoid using
	  // this to test implementation details).
	  history,
	}
  }

describe('Pet Details', () => {
	test('renders component', () => {
		const { container } = renderWithContext(<PetDetails />, { value: InitialState, wrapper: MemoryRouter });
		expect(container).toMatchSnapshot();
	});

	test('renders component no pets', () => {
		const { getByText } = renderWithContext(<PetDetails />, {
			value: { pets:[], searchTerm:'' },
			wrapper: MemoryRouter
		});

		expect(getByText(/Loading.../i)).toBeInTheDocument();
	});
});
