import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PetsListingProvider from './Provider/PetsListingProvider';
import PetsListing from './components/PetsListing';
import PetDetails from './components/PetDetails';
import './App.scss';
const App = () => (
	<PetsListingProvider>
		<BrowserRouter>
            <Switch>
                <Route exact path='/' component={PetsListing} />
                <Route path='/:id' component={PetDetails} />
            </Switch>   
        </BrowserRouter>
	</PetsListingProvider>
);

export default App;
