/**
 * component that takes in user's speech as input and gives out converted text
 * as output
 */

import React, { Component } from "react";

export default class TextToSpeech extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div className="TextToSpeechParent">
				<h1>Convert Text to Speech</h1>
			</div>
		);
	}
}