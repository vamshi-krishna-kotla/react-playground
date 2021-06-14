import React from 'react';

import Main from './edit-parent-state-with-functions/index.jsx';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="App">
				<Main />
			</div>
		);
	};
}
