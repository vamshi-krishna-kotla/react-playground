import React, { useRef } from "react";
import { Link } from 'react-router-dom';

import './NavBar.scss';

export default function () {
	const navBarElement = useRef();

	const toggleNavBar = () => {
		navBarElement.current.classList.toggle('hide');
		navBarElement.current.classList.toggle('show');
	};

	return (
		<div className="nav-bar">
			<div className="nav-bar-toggle-button button" onClick={toggleNavBar}>
				<span>&#9776;</span>
			</div>
			<div className="nav-bar-options show" ref={navBarElement}>
				<Link className="button" to="/projects">Home</Link>
				<Link className="button" to="/projects/quotes">Quotes</Link>
				<Link className="button" to="/projects/clock">Clock</Link>
				<Link className="button" to="/projects/speech-text">Speech &#8652; Text</Link>
				<Link className="button" to="/projects/shop">Shop</Link>
			</div>
		</div>
	);
};
