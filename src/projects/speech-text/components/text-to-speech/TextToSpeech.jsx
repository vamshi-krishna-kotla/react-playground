/**
 * component that takes in user's speech as input and gives out converted text
 * as output
 */

import React, { Component } from "react";

import styles from './TextToSpeech.module.scss';


export default class TextToSpeech extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		this.setState({
			text: '',
			inputElement: document.getElementById('input-text-container')
		});
	}

	speak = () => {
		let msg = new SpeechSynthesisUtterance(this.state.text);
		window.speechSynthesis.speak(msg);
	};

	clearInput = () => {
		this.state.inputElement.value = '';
	};

	initSpeech = () => {
		this.setState((prevState) => ({
			text: prevState.inputElement.value
		}), () => {
			this.speak();
			this.clearInput();
		});
	};

	render() {
		return (
			<div className={styles["text-to-speech-container"]}>
				<h1 className={styles.title}>Convert Text to Speech</h1>
				<textarea name="text" id="input-text-container" cols="30" rows="10"></textarea>
				<button className="button" onClick={this.initSpeech}>Speak</button>
			</div>
		);
	}
}