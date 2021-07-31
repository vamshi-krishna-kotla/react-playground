import React, { useEffect } from 'react';

// import the styles (as object) from the SCSS (CSS module) file
import styles from './Clock.module.scss';

export default function AnalogClock() {

	let canvas = null;

	/**
	 * 
	 * @note
	 * the components are parsed on the server to achieve server-side rendering
	 * 
	 * if there are calls for 'document(DOM/client-side code)' they
	 * would cause an error while the server parses the component
	 * 
	 * to avoid such errors, make sure the calls for client-side JS code
	 * are avoided on the server; wrap the statements that use document(DOM/client-side code)
	 * in window check to support server-side rendering
	 * 
	 */
	if (typeof window !== 'undefined') {
		/**
		 * create and store the canvas element
		 */
		canvas = document.createElement('canvas');
		canvas.setAttribute('id', styles.canvas);
		canvas.setAttribute('width', 600);
		canvas.setAttribute('height', 600);
	}

	/**
	 * get and store the canvas context and radius
	 */
	let canvasContext = canvas ? canvas.getContext('2d') : null;
	let radius = canvas ? canvas.height / 2 : 0;

	/**
	 * fucntion to draw the face of the clock
	 * 
	 */
	const drawClockFace = () => {
		// draw the clock base
		canvasContext.beginPath();
		canvasContext.arc(0, 0, radius, 0, 2 * Math.PI);
		canvasContext.fillStyle = 'white';
		canvasContext.fill();

		// prepare a radial gradient for clock border
		let grad = canvasContext.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
		grad.addColorStop(0, '#333');
		grad.addColorStop(0.5, 'gray');
		grad.addColorStop(1, '#333');

		// draw the clock border with radial gradient
		canvasContext.strokeStyle = grad;
		canvasContext.lineWidth = radius * 0.1;
		canvasContext.stroke();

		// draw and fill the center
		canvasContext.beginPath();
		canvasContext.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
		canvasContext.fillStyle = 'gray';
		canvasContext.fill();

		// draw border for the center
		canvasContext.beginPath();
		canvasContext.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
		canvasContext.strokeStyle = 'black';
		canvasContext.lineWidth = 1;
		canvasContext.stroke();
	};

	/**
	 * function to draw the numbers on the clock
	 */
	const drawClockNumbers = () => {
		// variables for angle and counter
		let angle;
		let num;

		/**
		 * set the style config to draw the numbers
		 */
		// font style for the numbers
		canvasContext.font = `${radius * 0.15}px arial`;

		// vertical alignment while drawing
		canvasContext.textBaseline = 'middle';

		// horizontal alignment while drawing
		canvasContext.textAlign = 'center';

		// set the font color
		canvasContext.fillStyle = 'black';

		// loop to draw the numbers onto the clock
		for (num = 1; num <= 12; num++) {
			// set the angle based on the number
			angle = num * Math.PI / 6;

			/**
			 * set the position to draw the number
			 * 
			 * basically rotate the context and adjust the point
			 * where the number needs to be drawn
			 */
			canvasContext.rotate(angle);
			canvasContext.translate(0, -radius * 0.85);
			canvasContext.rotate(-angle);

			// draw the number
			canvasContext.fillText(`${num}`, 0, 0);

			/**
			 * reset the position
			 * 
			 * this needs to be done for the next number to get the
			 * right position
			 */
			canvasContext.rotate(angle);
			canvasContext.translate(0, radius * 0.85);
			canvasContext.rotate(-angle);
		}
	};

	/**
	 * function to place the hands on the clock
	 * and start the movement
	 */
	const drawClockHands = () => {
		let time = new Date();

		let hours = time.getHours();
		let minutes = time.getMinutes();
		let seconds = time.getSeconds();

		hours %= 12;

		hours = (hours * Math.PI / 6) + (minutes * Math.PI / 6 * 60) + (seconds * Math.PI / 6 * 60 * 60);
		drawHand(hours, radius * 0.5, radius * 0.07);
		minutes = (minutes * Math.PI / 30) + (seconds * Math.PI / 30 * 60);
		drawHand(minutes, radius * 0.8, radius * 0.07);
		seconds = seconds * Math.PI / 30;
		drawHand(seconds, radius * 0.9, radius * 0.02);
	};

	/**
	 * function to stroke (draw) the hands of the clock
	 * 
	 * @param {Number} angle : angle with which the context is to be rotated
	 * @param {Number} length : length of the hand to be drawn
	 * @param {Number} width : size of the hand to be drawn
	 */
	const drawHand = (angle, length, width) => {
		canvasContext.beginPath();
		canvasContext.lineWidth = width;
		canvasContext.lineCap = 'round';
		canvasContext.moveTo(0, 0);
		canvasContext.rotate(angle);
		canvasContext.lineTo(0, -length);
		canvasContext.stroke();
		canvasContext.rotate(-angle);
	};

	/**
	 * init method to start the operations on the canvas
	 */
	const init = () => {
		/**
		 * all operations on the canvas go here
		 */
		canvasContext.translate(radius, radius);

		/**
		 * reducing the radius to fit the clock inside the
		 * box without touching the edges
		 */
		radius *= 0.9;

		/**
		 * draw the canvas entirely for every second
		 * to update the time
		 * 
		 * @note
		 * a part of the canvas is unable to be updated
		 * the clock hands are the only part that are changing the position
		 * only the hands cannot be cleared and redrawn
		 * 
		 * hence the entire canvas is redrawn for every second
		 */
		setInterval(() => {
			/**
			 * draw the clock face
			 */
			drawClockFace();

			/**
			 * draw the clock numbers
			 */
			drawClockNumbers();

			/**
			 * draw and move the hands
			 */
			drawClockHands();
		}, 1000);
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