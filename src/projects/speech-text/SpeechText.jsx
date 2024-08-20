import React from "react";

import { DefaultComp, SelectedComponent } from "./components/select-comp/SelectComp.jsx";

/**
 * import required params for routing within the component
 * 
 * @note in this component we are routing within an outer layer of router
 * 
 * Link: anchor element based component used to navigate to other path
 * useMatch: used to obtain the path from upper level router
 */
import { Link, useMatch } from 'react-router-dom';

import styles from './SpeechText.module.scss';

export default function SpeechText() {

	const path = '/projects/speech-text';

	const match = useMatch(path + '/:route');

	return (
		<div className={styles["speech-text-parent"]}>
			{
				!match ? 
				<DefaultComp url={path} /> :
				<>
					<Link className={styles["back-button"] + ' button'} to={path}>&#8249; Back</Link>
					{/*
						component to render the required sub-component based on the "route"  variable
					*/}
					<SelectedComponent url={path} route={match.params.route} />
				</>
			}
		</div>
	);
}
