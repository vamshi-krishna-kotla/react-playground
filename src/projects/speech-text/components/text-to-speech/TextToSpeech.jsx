/**
 * component that takes in user's text as input and gives out converted speech
 * as output
 */

import React, { Component } from "react";

/**
 * @note whenever we use CSS modules, the JS gives the corresponding className or ID (selector) to the element
 * if that selector is found in the module.stylesheet file
 * 
 * if the selector is not found appropriately in the module.stylesheet file then there is no
 * selector attribute given accordingly and hence that value cannot be used
 * 
 * JS <-> module CSS
 * the value need to be present in the CSS file for sure
 * for it to be assigned to the component and used
 */
import styles from './TextToSpeech.module.scss';

export default class TextToSpeech extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	// initiatilze the required settings
	componentDidMount() {
		/**
		 * we are storing the input text element and a SpeechSynthesisUtterance instance
		 * onto the class as they are being used every time we click to speak and the
		 * values never change
		 * 
		 * basically they are utilities and need not be monitored, hence not stored
		 * on the state
		 */
		this.inputTextContainer = document.querySelector(`#${styles["input-text-container"]}`);
		this.speechObj = new SpeechSynthesisUtterance();

		// store the required elements
		const pitchElement = document.querySelector(`input#${styles["pitch"]}`);
		const rateElement = document.querySelector(`input#${styles["rate"]}`);
		const clearInputElement = document.querySelector(`input#${styles["clear-input"]}`);

		// set the "pitch" value everytime it changes
		pitchElement.onchange = () => {
			this.setState({
				pitch: pitchElement.value
			});
		};

		// set the "rate" value everytime it changes
		rateElement.onchange = () => {
			this.setState({
				rate: rateElement.value
			});
		};

		// set the "clear" flag everytime it changes
		clearInputElement.onchange = () => {
			this.setState({
				clear: clearInputElement.checked
			});
		};

		// set the initial state with defaults
		this.setState({
			text: '',
			pitch: 1,
			rate: 1,
			clear: false
		});
	}

	/**
	 * method to use the stored SpeechSynthesisUtterance instance,
	 * set the required options and speak
	 */
	speak = () => {
		this.speechObj.text = this.state.text;
		this.speechObj.pitch = this.state.pitch;
		this.speechObj.rate = this.state.rate;
		window.speechSynthesis.speak(this.speechObj);
	};

	/**
	 * method to clear the input text container based on the user setting
	 * 
	 * @returns returns without execution if the "clear" flag is false
	 */
	clearInput = () => {
		if(!this.state.clear) return;
		this.inputTextContainer.value = '';
	};

	/**
	 * method called when the user hits the "Speak" button
	 * sets the state with latest input
	 * triggers the speak() and clearInput() methods
	 */
	initSpeech = () => {
		this.setState({
			text: this.inputTextContainer.value
		}, () => {
			this.speak();
			this.clearInput();
		});
	};

	render() {
		return (
			<div id={styles["text-to-speech"]}>
				<h1 className={styles.title}>Convert Text to Speech</h1>
				<div className={styles["main-container"]}>
					<div className={styles["input-container"]}>
						<textarea
							name="text"
							id={styles["input-text-container"]}
							cols="30"
							rows="10"
							defaultValue="this is a test"
						></textarea>
					</div>
					<div className={styles["settings-container"]}>
						<div className={styles["pitch-setting"]}>
							<label htmlFor="pitch">Pitch</label>
							<span className={styles["pitch-value"]}>{this.state.pitch}</span>
							<input
								type="range"
								defaultValue="1"
								min="0"
								max="2"
								step="0.1"
								name="pitch"
								id={styles["pitch"]}
							/>
						</div>
						<div className={styles["rate-setting"]}>
							<label htmlFor="rate">Rate</label>
							<span className={styles["rate-value"]}>{this.state.rate}</span>
							<input
								type="range"
								defaultValue="1"
								min="0.5"
								step="0.1"
								max="3"
								name="rate"
								id={styles["rate"]}
							/>
						</div>
						<div className={styles["clear-input-setting"]}>
							<label htmlFor="clear-input">Clear input after speaking</label>
							<input
								type="checkbox"
								name="clear-input"
								id={styles["clear-input"]}
								defaultChecked={this.state.clear}
							/>
						</div>
					</div>
				</div>
				<div className={styles["speak-btn-container"]}>
					<button className={styles["speak-btn"] + " button"} onClick={this.initSpeech}>Speak</button>
				</div>
			</div>
		);
	}
}