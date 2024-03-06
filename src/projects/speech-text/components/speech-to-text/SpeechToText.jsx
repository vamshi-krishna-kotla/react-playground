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

		// set the (static) default values required for the component
		this.defaults = {
			continuous: false,
			outputTranscript: 'See output here',
		};

		this.availableFontFamilies = ['Aerial', 'sans'];
	}

	/**
	 * method to make the font option available for selection
	 * 
	 * @returns array of <option> elements to populate the font-selection
	 */
	getFontFamilyOptions() {
		return this.availableFontFamilies.map(font => {
			return <option
						key={font}
					>
						{font}
					</option>
		});
	}

	render() {
		return (
			<div className={styles["speech-to-text"]}>
				<h1 className={styles["title"]}>Convert Speech to Text</h1>
				<div className={styles["main-container"]}>
					<div className={styles["settings-container"]}>
						<div className={styles["continuos-output-setting"]}>
							<label htmlFor={styles["continuos-output"]}>Continuous output:</label>
							<input
								type="checkbox"
								name="continuos-output"
								id={styles["continuos-output"]}
								defaultChecked={this.defaults.continuous}
							/>
						</div>
						<div className={styles["output-font-family"]}>
							<label htmlFor={styles["font-selection"]}>Output font style : </label>
							<div className={styles["inner-selection-container"]}>
								<select name="fonts" id={styles["font-selection"]}>
									{this.getFontFamilyOptions()}
								</select>
								<section className={styles["underline-highlighter"]}></section>
							</div>
						</div>
					</div>
					<div className={styles["output-container"]}>
						<textarea
							name="output-transcript"
							id={styles["output-transcript"]}
							cols="45"
							rows="15"
							disabled
							placeholder={this.defaults.outputTranscript}
						></textarea>
						<p className={styles["output-confidence"]}>
							Confidence:
						</p>
					</div>
				</div>
				<div className={styles["button-container"]}>
					<button
						className={styles["click-to-speak"] + " button"}
						disabled={this.state.isUserSpeaking}
					>&#x1F3A4;</button>
				</div>
			</div>
		);
	}
}