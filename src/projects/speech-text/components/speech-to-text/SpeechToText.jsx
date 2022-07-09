/**
 * component that takes in user's speech as input and gives out converted text
 * as output
 */

import React, { Component } from "react";

import styles from './SpeechToText.module.scss';

export default class SpeechToText extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div className="SpeechToTextParent">
				<h1>Convert Speech to Text</h1>
			</div>
		);
	}
}