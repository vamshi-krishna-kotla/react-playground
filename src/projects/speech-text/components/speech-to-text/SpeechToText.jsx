/**
 * component that takes in user's speech as input and gives out converted text
 * as output
 */

import React, { useEffect, useMemo, useRef, useState } from "react";

import fontFamilies from './assets/font-family.json';
import languages from './assets/languages.json';

import styles from './SpeechToText.module.scss';
import { NotificationComponent } from "../../../../common/components/notification/Notification.jsx";

export default function SpeechToText() {
	/**
	 * using reference to persist the value of speech recognition instance
	 * over multiple renders
	 */
	const speechRecognitionRef = useRef(null);
	let speechRecognition = speechRecognitionRef.current;

	/**
	 * used memoised storages for font families and speech recognition
	 * objects to avoid multiple initialisations for evey re-render
	 */
	const { availableFontFamilies, availableLanguages } = useMemo(() => ({
		availableFontFamilies: fontFamilies,
		availableLanguages: languages
	}), []);

	// set the (static) default values required for the component
	const [state, setState] = useState({
		continuous: false,
		output: 'See output here',
		outputFont: availableFontFamilies[0].code,
		outputLanguage: availableLanguages[0].code,
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
		if (window.SpeechRecognition || window.webkitSpeechRecognition) {
			/**
			 * initialize the reference and assign the speech recognition
			 * instance on component mount (single time)
			 */
			speechRecognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
			speechRecognition = speechRecognitionRef.current;

			speechRecognition.continuous = state.continuous;
			speechRecognition.lang = state.outputLanguage;
			speechRecognition.interimResults = false;
			speechRecognition.maxAlternatives = 1;

			/**
			 * handler to retrieve conversion result
			 * 
			 * @param {Event} event object that holds speech conversion result
			 */
			speechRecognition.onresult = (event) => {
				const outputTranscript = event?.results[event.resultIndex][0]?.transcript?.trim();

				setState((state) => {
					return {
						...state,
						output: state.continuous ? (outputTranscript + '\n' + state.output) : outputTranscript
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
	 * set the output display language from selected option
	 * 
	 * @param {Event} event object that holds the result of selection
	 */
	function setOutputLanguage(event) {
		event.stopPropagation();

		setState((state) => {
			speechRecognition.lang = event.target.value;
			return { ...state, outputLanguage: event.target.value };
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
			speechRecognition.continuous = !state.continuous;
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

	/**
	 * stop listening to speech input from the user
	 * 
	 * @param {Event} event object to stop event propagation
	 */
	function stopListening(event) {
		event.stopPropagation();

		setState((state) => {
			speechRecognition.stop();

			return {
				...state,
				triggerRecognition: false,
				isUserSpeaking: false
			};
		});
	}

	/**
	 * clear the text area
	 * 
	 * @param {Event} event object to stop event propagation
	 */
	function clearTextArea(event) {
		event?.stopPropagation();

		setState((state) => {
			return {
				...state,
				output: ''
			};
		});
	}

	/**
	 * copy the output transcript to clipboard
	 * 
	 * @param {Event} event object to stop event propagation
	 */
	function copyTextArea(event) {
		event?.stopPropagation();

		// copy the output transcript
		navigator.clipboard.writeText(state.output);
	}

	/**
	 * copy the output transcript to clipboard and clear the text area
	 * 
	 * @param {Event} event object to stop event propagation
	 */
	function cutTextArea(event) {
		event?.stopPropagation();

		// copy the output transcript to clipboard
		copyTextArea();

		// clear the text area
		clearTextArea();
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
								disabled={state.triggerRecognition}
							/>
						</div>
						<div className={styles["output-font-family"]}>
							<label htmlFor={styles["font-selection"]}>Font:</label>
							<div className={styles["inner-selection-container"]}>
								<select
									name="fonts"
									id={styles["font-selection"]}
									onChange={setOutputFontFamily}
									defaultValue={availableFontFamilies[0].code}
								>
									{
										availableFontFamilies.map((font, index) => {
											return <option
														key={font.code + '_' + index}
														value={font.code}
													>
														{font.title.toLocaleUpperCase()}
													</option>
										})
									}
								</select>
							</div>
						</div>
						<div className={styles["output-language"]}>
							<label htmlFor={styles["language-selection"]}>Language:</label>
							<div className={styles["inner-selection-container"]}>
								<select
									name="languages"
									id={styles["language-selection"]}
									onChange={setOutputLanguage}
									defaultValue={availableLanguages[0].code}
									disabled={state.continuous}
								>
									{
										availableLanguages.map((lang, index) => {
											return <option
														key={lang.code + '_' + index}
														value={lang.code}
													>
														{lang.title}
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
						<div className={styles["actions-container"]}>
							<button
								className={styles["clear-button"] + " button"}
								onClick={clearTextArea}
							>
								<i className="fa fa-eraser"></i>
							</button>
							<button
								className={styles["copy-button"] + " button"}
								onClick={copyTextArea}
							>
								<i className="fa fa-copy"></i>
							</button>
							<button
								className={styles["cut-button"] + " button"}
								onClick={cutTextArea}
							>
								<i className="fa fa-cut"></i>
							</button>
						</div>
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
					>
						<i className="fa fa-microphone"></i>
					</button>
					<button
						className={
							styles["click-to-stop"] +
							" button " +
							(state.continuous ? styles["enable-stop-icon"] : styles["disable-stop-icon"])
						}
						onClick={stopListening}
						disabled={!state.isUserSpeaking}
					>
						<i className="fa fa-power-off"></i>
					</button>
				</div>
			</div>
		</>
	);
}