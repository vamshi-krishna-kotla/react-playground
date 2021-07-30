import React from 'react';

import AnalogClock from './analog_clock/Clock.jsx';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="App">
				<AnalogClock />
			</div>
		);
	};
}
