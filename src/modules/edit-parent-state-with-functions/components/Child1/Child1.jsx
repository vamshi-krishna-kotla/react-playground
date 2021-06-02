import React from 'react';

export class Child1 extends React.Component {
	state = {};

	constructor(props) {
		super(props);
		this.state.text = 'Child1 component';
	}

	render() {
		return(
			<div className="child">
				<h1>{this.state.text}</h1>
				<input type="text" onInput={(event) => {this.props.modifyParentState(event.target.value)}} />
			</div>
		);
	}

}