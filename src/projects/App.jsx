import React from 'react';

/**
 * import required components for react client-side routing
 */
import { Route, Routes } from 'react-router-dom';

// global styles
import './App.scss';

import AnalogClock from './analog-clock/Clock.jsx';
import NavBar from './navbar/NavBar.jsx';
import Quotes from './quotes/Quotes.jsx';
import SpeechText from './speech-text/SpeechText.jsx';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="App">
				<NavBar />
				<Routes>
					<Route
						path="/projects" exact
						element={<h1>Home page</h1>}
					></Route>
					<Route
						path="/projects/quotes" exact
						element={<Quotes />}
					></Route>
					<Route
						path="/projects/clock" exact
						element={<AnalogClock />}
					></Route>
					<Route
						path="/projects/speech-text"
						element={<SpeechText />}
					></Route>
					<Route
						path="/projects/speech-text/:route"
						element={<SpeechText />}
					></Route>
				</Routes>
			</div>
		);
	};
}
