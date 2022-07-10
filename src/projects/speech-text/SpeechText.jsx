import React from "react";

import { DefaultComp, SelectedComponent } from "./components/select-comp/SelectComp.jsx";

/**
 * import required params for routing within the component
 * 
 * @note in this component we are routing within an outer layer of router
 * 
 * Switch: to check and render selective component or template based on path
 * Route: to render the required template or React component based on the path
 * Link: anchor element based component used to navigate to other path
 * useRouterMatch: used to obtain the path from upper level router
 */
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom';

import styles from './SpeechText.module.scss';

export default function SpeechText() {

	// fetch the current path that user is on
	let { path, url } = useRouteMatch();

	return (
		<div className={styles["speech-text-parent"]}>
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
					<Link className={styles["back-button"]} to={path}>&#8249; Back</Link>
					{/*
						component to render the required sub-component based on the "route"  variable
					*/}
					<SelectedComponent url={url} />
				</Route>
			</Switch>
		</div>
	);
}
