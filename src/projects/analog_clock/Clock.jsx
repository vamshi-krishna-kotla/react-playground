import React, { useEffect } from 'react';

// import the styles (as object) from the SCSS (CSS module) file
import styles from './Clock.module.scss';

export default function AnalogClock() {
	/**
	 * create and store the canvas element
	 */
	let canvas = document.createElement('canvas');
	canvas.setAttribute('id', styles.canvas);
	canvas.setAttribute('width', 600);
	canvas.setAttribute('height', 600);

	/**
	 * get and store the canvas context and radius
	 */
	let canvasContext = canvas.getContext('2d');
	let radius = canvas.height/2;

	/**
	 * init method to start the operations on the canvas
	 */
	const init = () => {
		/**
		 * all operations on the canvas go here
		 */
	};

	/**
	 * using useEffect hook to start the canvas operations
	 * after the component is mounted
	 */
	useEffect(() => {
		// append the canvas to the DOM
		document.querySelector('#analog-clock').append(canvas);

		// init the canvas operations
		init();
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
		</div>
	);
}