import React from 'react';

/**
 * import required components for react client-side routing
 */
import { Route, Switch } from 'react-router-dom';

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
				<Switch>
					<Route path="/projects" exact>
						<h1>Home page</h1>
					</Route>
					<Route path="/projects/quotes" exact>
						<Quotes />
					</Route>
					<Route path="/projects/clock" exact>
						<AnalogClock />
					</Route>
					<Route path="/projects/speech-text">
						<SpeechText />
					</Route>
				</Switch>
			</div>
		);
	};
}
