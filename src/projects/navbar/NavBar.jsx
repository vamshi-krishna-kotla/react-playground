import React from "react";
import { Link } from 'react-router-dom';

import './NavBar.scss';

export default function () {
	return (
		<div className="navBar">
			<Link to="/projects">Home</Link>
			<Link to="/projects/quotes">Quotes</Link>
			<Link to="/projects/clock">Clock</Link>
			<Link to="/projects/speech-text">Speech &#8652; Text</Link>
		</div>
	);
};
