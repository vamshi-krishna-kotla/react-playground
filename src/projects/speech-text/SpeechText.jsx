import React from "react";

import SpeechToText from "./components/speech-to-text/SpeechToText.jsx";
import TextToSpeech from "./components/text-to-speech/TextToSpeech.jsx";

/**
 * import required params for routing within the component
 * 
 * @note in this component we are routing within an outer layer of router
 * 
 * Switch: to check and render selective component or template based on path
 * Route: to render the required template or React component based on the path
 * Link: anchor element based component used to navigate to other path
 * useRouterMatch: used to obtain the path from upper level router
 * useParams: used to obtain the route variable from a path
 */
import { Route, Switch, Link, useRouteMatch, useParams } from 'react-router-dom';

export default function SpeechText() {

	// fetch the current path that user is on
	let { path, url } = useRouteMatch();

	return (
		<div className="SpeechTextParent">
			<Switch>
				{/* 
					for '/' path (overall '/projects/speech-text/')
				*/}
				<Route path={path} exact>
					<DefaultComp url={url} />
				</Route>
				{/* 
					for '/<route>' path (overall '/projects/speech-text/<route>')
				*/}
				<Route path={`${path}/:route`} exact>
					{/*
						component to render the required sub-component based on the "route"  variable
					*/}
					<SelectedComponent url={url} />
				</Route>
			</Switch>
		</div>
	);
}

/**
 * 
 * @param {Object} props
 * @returns template for default display of selection for speech-tex feature
 */
function DefaultComp(props) {
	return (
		<div>
			<h1>Select a link</h1>
			<div className="routes">
				<Link to={`${parseUrl(props.url)}/text-to-speech`}>Text &#8594; Speech</Link>
				<Link to={`${parseUrl(props.url)}/speech-to-text`}>Speech &#8594; Text</Link>
			</div>
		</div>
	);
}

/**
 * 
 * @returns React component based on the 'route' param
 */
function SelectedComponent(props) {
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