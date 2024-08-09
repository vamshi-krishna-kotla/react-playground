/**
 * component that takes in user's speech as input and gives out converted text
 * as output
 */

import React, { useEffect, useMemo, useState } from "react";

import styles from './SpeechToText.module.scss';
import { NotificationComponent } from "../../../../common/components/notification/Notification.jsx";

export default function SpeechToText() {
	/**
	 * used memoised storages for font families and speech recognition
	 * objects to avoid multiple initialisations for evey re-render
	 */
	const { availableFontFamilies, speechRecognition } = useMemo(() => ({
		availableFontFamilies: [ 'serif', 'cursive', 'aerial', 'sans'],
		speechRecognition: new (window.SpeechRecognition || window.webkitSpeechRecognition)()
	}), []);

	// set the (static) default values required for the component
	const [state, setState] = useState({
		continuous: false,
		output: 'See output here',
		outputFont: availableFontFamilies[0],
		triggerRecognition: false,
		isUserSpeaking: false,
		notify: false,
		notificationStatement: ''
	});

	/**
	 * attach the event listeners for the speech recognition instance
	 * once the component is mounted
	 * 
	 * @note to be triggered only once
	 */
	useEffect(() => {
		if (speechRecognition) {
			speechRecognition.continuous = false;
			speechRecognition.lang = "en-US";
			speechRecognition.interimResults = false;
			speechRecognition.maxAlternatives = 1;

			/**
			 * handler to retrieve conversion result
			 * 
			 * @param {Event} event object that holds speech conversion result
			 */
			speechRecognition.onresult = (event) => {
				setState((state) => {
					return {
						...state,
						output: event.results[0][0].transcript
					};
				});
			};

			/**
			 * handler to update the UI to indicate speech input is being retrieved
			 */
			speechRecognition.onspeechstart = () => {
				setState((state) => ({
					...state,
					isUserSpeaking: true
				}));
			};

			/**
			 * handler to stop the speech recognition listening function
			 * when the user stops speaking
			 */
			speechRecognition.onspeechend = () => {
				setState((state) => {
					speechRecognition.stop();

					return {
						...state,
						triggerRecognition: false,
						isUserSpeaking: false
					};
				});
			};

			/**
			 * handler to cover error case scenario when no input is received
			 */
			speechRecognition.onerror = () => {
				setState((state) => {
					return {
						...state,
						notify: true,
						notificationStatement: 'Unable to detect any speech input',
						triggerRecognition: false,
						isUserSpeaking: false
					};
				});
			};
		} else {
			/**
			 * @todo this alert can be made better to notify the user
			 * that speech recognition is not available
			 */
			alert('Speech recognition is not working');
		}
	}, []);

	/**
	 * set the output display font family from selected option
	 * 
	 * @param {Event} event object that holds the result of selection
	 */
	function setOutputFontFamily(event) {
		event.stopPropagation();

		setState((state) => {
			return { ...state, outputFont: event.target.value };
		});
	}

	/**
	 * set the flag to enable/disable continuous output generation
	 * 
	 * @param {Event} event object that holds the result of check-box
	 */
	function toggleContinuousOutput(event) {
		event.stopPropagation();

		setState((state) => {
			return { ...state, continuous: !state.continuous };
		});
	}

	/**
	 * start listening to retrieve speech input from the user
	 * 
	 * @param {Event} event object to stop event propagation
	 */
	function startListening(event) {
		event.stopPropagation();

		setState((state) => {
			speechRecognition.start();

			return {
				...state,
				triggerRecognition: true
			};
		});
	}

	return (
		<>
			{state.notify ? <NotificationComponent type='error' statement={state.notificationStatement}/> : null}
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
								defaultChecked={state.continuous}
								onChange={toggleContinuousOutput}
							/>
						</div>
						<div className={styles["output-font-family"]}>
							<label htmlFor={styles["font-selection"]}>Output font style:</label>
							<div className={styles["inner-selection-container"]}>
								<select
									name="fonts"
									id={styles["font-selection"]}
									onChange={setOutputFontFamily}
									defaultValue={availableFontFamilies[0]}
								>
									{
										availableFontFamilies.map((font, index) => {
											return <option
														key={font + '_' + index}
														value={font}
													>
														{font.toLocaleUpperCase()}
													</option>
										})
									}
								</select>
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
							placeholder={state.output}
							style={{fontFamily: state.outputFont}}
						></textarea>
					</div>
				</div>
				<div className={styles["button-container"]}>
					<button
						className={
							styles["click-to-speak"] +
							" button " +
							(state.triggerRecognition ? styles["restrict-speaking"] : "") + " " +
							(state.isUserSpeaking ? styles["user-speaking"] : "")
						}
						disabled={state.triggerRecognition}
						onClick={startListening}
					>&#x1F3A4;</button>
				</div>
			</div>
		</>
	);
}