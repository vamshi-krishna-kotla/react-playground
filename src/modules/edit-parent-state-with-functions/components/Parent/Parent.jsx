import React from 'react';

import { Child1 } from '../Child1/Child1.jsx';
import { Child2 } from '../Child2/Child2.jsx';

import './Parent.scss';

export class Parent extends React.Component {
	state = {};

	constructor(props) {
		super(props);
		this.state.text = 'children editable text';
	}

	modifyState = (value) => {
		this.setState({
			text: value
		});
	}

	render() {
		return(
			<div id="parent">
				<h2>This is the parent component where the text is saved</h2>
				<h3>Enter text in the input boxes below to change the parent state</h3>
				<h3>The following are child components</h3>
				<h1 className="stateTextArea">
					{this.state.text}
				</h1>
				<div className="childrenComponents">
					<Child1 className="childComp" modifyParentState={this.modifyState} />
					<Child2 className="childComp" editParentState={this.modifyState}/>
				</div>
			</div>
		);
	}
}