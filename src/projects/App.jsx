import React from 'react';

/**
 * import required components for react client-side routing
 */
import { Route, Routes, useMatch } from 'react-router-dom';

// global styles
import '../common/styles/_common.scss';
import NavBar from '../common/components/navbar/NavBar.jsx';
import routes from './routes.js';
import Home from './home/Home.jsx';

export default function App() {
	// check for home route
	const match = useMatch('/projects');

	return (
		<div className="App">
			{
				!match ?
				// render router outlet if not home page
				<>
					<NavBar links={routes} homePath='/projects' />
					<Routes>
						{
							routes.map((route, index) => {
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
				</>
				:
				// render home page if path matches
				<Home />
			}
		</div>
	);
}
