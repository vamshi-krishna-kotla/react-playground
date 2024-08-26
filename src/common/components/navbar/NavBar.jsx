import React, { useRef } from "react";
import { Link } from 'react-router-dom';

import './NavBar.scss';

export default function ({ links, homePath }) {
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
				{
					links.map((eachLink, index) => {
						return eachLink.showInNavBar ? (
							<Link
								key={'nav_link_' + eachLink.titleHTML + '_' + index}
								className="button"
								to={eachLink.location}
								dangerouslySetInnerHTML={{ __html: eachLink.titleHTML }}
							></Link>
						) : '';
					})
				}
			</div>
			{
				homePath ? 
				<Link to={homePath} className="back-to-home button">
					<i className="fa fa-home"></i>
				</Link>
				: null
			}
		</div>
	);
};
