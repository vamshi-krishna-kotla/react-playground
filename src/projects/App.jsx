import React from 'react';

/**
 * import required components for react client-side routing
 */
import { Route, Routes } from 'react-router-dom';

// global styles
import '../common/styles/_common.scss';
import NavBar from '../common/components/navbar/NavBar.jsx';

import AnalogClock from './analog-clock/Clock.jsx';
import Quotes from './quotes/Quotes.jsx';
import SpeechText from './speech-text/SpeechText.jsx';
import Skribble from './skribble/Skribble.jsx';

export default class App extends React.Component {
	/**
	 * links and respective fields to be displayed on the /projects part of the application
	 * 
	 * each link has the following fields
	 * titleHTML: HTML text to be displayed in the generic nav bar
	 * location: the route at which the element needs to be displayed
	 * element: the React element which needs to be displayed
	 * showInNavBar: flag to enable or disable showing this option in nav bar (used for parameterized routes)
	 * 
	 * @note
	 * place all the new routes here
	 * if the routes are parameterized and not expected to be shown in nav bar then use the showInNavBar appropriately
	 */
	routes = [
		{ titleHTML: 'Home', location: '/projects', element: <h1>Home page</h1>, showInNavBar: true },
		{ titleHTML: 'Quotes', location: '/projects/quotes', element: <Quotes />, showInNavBar: true },
		{ titleHTML: 'Clock', location: '/projects/clock', element: <AnalogClock />, showInNavBar: true },
		{ titleHTML: 'Speech &#8652; Text', location: '/projects/speech-text', element: <SpeechText />, showInNavBar: true },
		{ titleHTML: 'Skribble', location: '/projects/skribble', element: <Skribble />, showInNavBar: true },
		{ titleHTML: '', location: '/projects/speech-text/:route', element: <SpeechText />, showInNavBar: false },
	];

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="App">
				<NavBar links={this.routes} />
				<Routes>
					{
						this.routes.map((route, index) => {
							return (
								<Route
									key={'route_' + route.titleHTML + '_' + index}
									path={route.location}
									exact
									element={route.element}
								></Route>
							);
						})
					}
				</Routes>
			</div>
		);
	};
}
