import React, { useState, useEffect } from 'react';

import styles from './Clock.module.scss';

export default function AnalogClock() {
	let [canvas, setCanvas] = useState(null);

	useEffect(() => {
		setCanvas(document.querySelector(`#${styles.canvas}`));
	},[]);

	return (
		<div id="analog-clock">
			{console.log(canvas)}
			<canvas id={styles.canvas} width="600" height="600"></canvas>
		</div>
	);
}