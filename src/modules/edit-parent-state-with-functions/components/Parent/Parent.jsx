import React from 'react';

import { Child1 } from '../Child1/Child1.jsx';
import { Child2 } from '../Child2/Child2.jsx';

export class Parent extends React.Component {
	state = {};

	constructor(props) {
		super(props);
		this.state.text = 'Parent Component';
	}

	modifyState = (value) => {
		this.setState({
			text: value
		});
	}

	render() {
		return(
			<div className="parent">
				<h1>{this.state.text}</h1>
				<Child1 modifyParentState={this.modifyState} />
				<Child2 editParentState={this.modifyState}/>
			</div>
		);
	}
}