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

		// set the (static) default values required for the component
		this.defaults = {
			textInput: "Enter text here and hit the 'Speak' button to listen",
			pitch: 1,
			rate: 1,
			clear: false
		};
	}

	// initiatilze the required settings
	componentDidMount() {
		/**
		 * we are storing the input text element, a SpeechSynthesisUtterance instance and
		 * a list of voices onto the class as they are being used every time we click to
		 * speak and the values never change
		 * 
		 * basically they are utilities and need not be monitored, hence not stored
		 * on the state
		 */
		this.inputTextContainer = document.querySelector(`#${styles["input-text-container"]}`);
		this.speechObj = new SpeechSynthesisUtterance();
		this.voices = [];

		// store the required elements
		const pitchElement = document.querySelector(`input#${styles["pitch"]}`);
		const rateElement = document.querySelector(`input#${styles["rate"]}`);
		const clearInputElement = document.querySelector(`input#${styles["clear-input"]}`);
		const voiceSelection = document.querySelector(`select#${styles["voice-selection"]}`);

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

		// set the "voice" option whenever there is a new voice selected
		voiceSelection.onchange = () => {
			this.setState({
				voice: this.voices[voiceSelection.selectedIndex]
			});
		};

		// set the initial state with defaults
		this.setState({
			text: '',
			pitch: 1,
			rate: 1,
			clear: false,
			enableConversion: false,
		});

		// if the voices list already available then we directly use it
		let voicesAvailable = window.speechSynthesis.getVoices();
		if(voicesAvailable.length > 0) {
			this.voices = voicesAvailable;

			/**
			 * set the state to notify that text to speech conversion can now be used
			 * and set the default voice
			 */
			this.setState({
				enableConversion: true,
				voice: this.voices[0]
			});
		}
		// else we wait for the voices to be available
		else {
			/**
			 * attaching an event listener the window.speechSynthesis.onvoiceschanged event
			 * to get all the list of voices so that we can set the voices options
			 *
			 * @ref https://stackoverflow.com/questions/49506716/speechsynthesis-getvoices-returns-empty-array-on-windows
			 */
			window.speechSynthesis.addEventListener('voiceschanged', () => {
				this.voices = window.speechSynthesis.getVoices();
	
				/**
				 * set the state to notify that text to speech conversion can now be used
				 * and set the default voice
				 */
				this.setState({
					enableConversion: true,
					voice: this.voices[0]
				});
			});
		}

	}

	/**
	 * method to use the stored SpeechSynthesisUtterance instance,
	 * set the required options and speak
	 */
	speak = () => {
		this.speechObj.text = this.state.text;
		this.speechObj.pitch = this.state.pitch;
		this.speechObj.rate = this.state.rate;
		this.speechObj.voice = this.state.voice;
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

	/**
	 * method to make the voice option available for selection
	 * 
	 * @returns array of <option> elements to populate the voice-selection
	 */
	getVoiceOptionElements = () => {
		if(!this.state.enableConversion) return [];
		return this.voices.map(voice => {
			return <option
						value={voice.name}
						data-name={voice.name}
						data-lang={voice.lang}
						key={voice.name + voice.lang}
					>
						{`${voice.name} (${voice.lang})`}
					</option>
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
							cols="45"
							rows="15"
							defaultValue={this.defaults.textInput}
						></textarea>
					</div>
					<div className={styles["settings-container"]}>
						<div className={styles["pitch-setting"]}>
							<label htmlFor={styles["pitch"]}>Pitch : </label>
							<span id="pitch" className={styles["pitch-value"]}>{this.state.pitch}</span>
							<input
								type="range"
								defaultValue={this.defaults.pitch}
								min="0"
								max="2"
								step="0.1"
								name="pitch"
								id={styles["pitch"]}
							/>
						</div>
						<div className={styles["rate-setting"]}>
							<label htmlFor={styles["rate"]}>Rate : </label>
							<span id="rate" className={styles["rate-value"]}>{this.state.rate}</span>
							<input
								type="range"
								defaultValue={this.defaults.rate}
								min="0.5"
								step="0.1"
								max="3"
								name="rate"
								id={styles["rate"]}
							/>
						</div>
						<div className={styles["clear-input-setting"]}>
							<label htmlFor={styles["clear-input"]}>Clear input after speaking : </label>
							<input
								type="checkbox"
								name="clear-input"
								id={styles["clear-input"]}
								defaultChecked={this.defaults.clear}
							/>
						</div>
						<div className={styles["voice-selection-container"]}>
							<select name="voices" id={styles["voice-selection"]}>
								{this.getVoiceOptionElements()}
							</select>
						</div>
					</div>
				</div>
				<div className={styles["speak-btn-container"]}>
					<button
						className={styles["speak-btn"] + " button"}
						onClick={this.initSpeech}
						disabled={!this.state.enableConversion}
					>Speak</button>
				</div>
			</div>
		);
	}
}