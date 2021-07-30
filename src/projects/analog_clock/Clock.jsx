import React, { useState, useEffect } from 'react';

// import the styles (as object) from the SCSS (CSS module) file
import styles from './Clock.module.scss';

export default function AnalogClock() {
	/**
	 * use local state to store the canvas element
	 */
	let [canvas, setCanvas] = useState(null);

	/**
	 * using useEffect hook to store the canvas element
	 * in local state
	 */
	useEffect(() => {
		setCanvas(document.querySelector(`#${styles.canvas}`));
	},
	/**
	 * pass an empty array to execute the useEffect hook
	 * only when component is mouted or unmounted
	 * 
	 * ref: https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
	 * (in the 'Note' section)
	 */
	[]);

	return (
		<div id="analog-clock">
			<canvas id={styles.canvas} width="600" height="600"></canvas>
		</div>
	);
}