import React from 'react';

export class Child2 extends React.Component {
	state = {};

	constructor(props) {
		super(props);
		this.state.text = 'Child2 component';
	}

	render() {
		return(
			<div className="child">
				<h1>{this.state.text}</h1>
				<input type="text" onInput={(event) => {this.props.editParentState(event.target.value)}} />
			</div>
		);
	}

}