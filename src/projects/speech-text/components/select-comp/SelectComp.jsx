import React from "react";

/**
 * import required params for routing within the component
 * 
 * Link: anchor element based component used to navigate to other path
 * useParams: used to obtain the route variable from a path
 */
import { Link, useParams } from "react-router-dom";


import SpeechToText from "../speech-to-text/SpeechToText.jsx";
import TextToSpeech from "../text-to-speech/TextToSpeech.jsx";

import styles from './SelectComp.module.scss';

/**
 * 
 * @param {Object} props
 * @returns template for default display of selection for speech-tex feature
 */
export function DefaultComp (props) {
   return (
       <div className={styles["default-container"]}>
           <h1 className={styles["title"]}>Select a feature</h1>
           <div className={styles["routes"]}>
               <Link
			   		className={styles["link-card"]}
					to={`${parseUrl(props.url)}/text-to-speech`}
				>
					<span className={styles["link-title"]}>Text &#8594; Speech</span>
					<br />
					Input: <span className={styles["description-icon"]}>&lt;....&gt;</span>
					<br />
					Output: <span className={styles["description-icon"]}>&#x1F50A;</span>
				</Link>
               <Link
			   		className={styles["link-card"]}
					to={`${parseUrl(props.url)}/speech-to-text`}
				>
					<span className={styles["link-title"]}>Speech &#8594; Text</span>
					<br />
					Input: <span className={styles["description-icon"]}>&#x1F3A4;</span>
					<br />
					Output: <span className={styles["description-icon"]}>&lt;....&gt;</span>
				</Link>
           </div>
       </div>
   );
}

/**
 * 
 * @returns React component based on the 'route' param
 */
export function SelectedComponent(props) {
	/**
	 * @note "route" is not a default return value from the useParams() function
	 * any name can be used but the same name should be used in the <Route /> instance
	 * 
	 * e.g.
	 * ----- instance of Route where the variable name is used
	 * <Route path={`${path}/:someRandomName`} exact>
	 * 	<SomeComponent />
	 * </Route>
	 * 
	 * ----- using the same variable name for the route via useParams()
	 * let { someRandomName } = useParams();
	 * 
	 * "someRandomName" is the var for the actual route on the browser
	 */
	let { route } = useParams();
	if (route === 'speech-to-text') {
		return <SpeechToText />;
	}
	else if (route === 'text-to-speech') {
		return <TextToSpeech />;
	}
	return (
		<div>
			<DefaultComp url={props.url}/>
		</div>
	);
}

// function to remove the '/' at the end of the path for routing
const parseUrl = function (url) {
	let length = url.length;
	return (url.charAt(length - 1) === '/') ? url.slice(0, length - 1) : url;
}
